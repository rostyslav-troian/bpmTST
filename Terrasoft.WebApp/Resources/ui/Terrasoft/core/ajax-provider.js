/**
  * The transport layer for querying the server
 */
Ext.define("Terrasoft.core.AjaxProvider", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.AjaxProvider",
	singleton: true,

	/**
	 * @private
	 */
	_deferredExecutionDispatcher: null,

	/**
  * Provider for execution of Ajax-requests
  * @private
  * @type {Object}
  */
	extAjax: Ext.Ajax,

	/**
  * The maximum length of a string of data output to the log when the query error is logged.
  * @private
  * @type {Number}
  */
	maxDataLogSize: 150,

	/**
	 * Request store.
	 * @private
	 * @type {Object}
	 */
	requests: {},

	/**
	 * Array of active requests.
	 * @private
	 * @type {Array}
	 */
	_activeRequests: null,

	/**
	 * CSRF cookie name.
	 * @private
	 * @type {String}
	 */
	csrfCookieName: "BPMCSRF",

	_markRequestAsNotActive: function(requestObj) {
		const index = this._activeRequests.indexOf(requestObj);
		if (index > -1) {
			this._activeRequests.splice(index, 1);
		}
	},

	/**
	 * Constructor.
	 */
	constructor: function() {
		this.callParent(arguments);
		this.addEvents("requestaborted");
		this._activeRequests = [];
		this._deferredExecutionDispatcher = Ext.create("Terrasoft.DeferredExecution.Dispatcher", {
			allowExecutionPredicate: () => this._activeRequests.length === 0
		});
	},

	/**
	 * Cancels the request if the request is not specified, cancels the last request.
	 * @param {Object} request The request object.
	 */
	abortRequest: function(request) {
		this._markRequestAsNotActive(request);
		this._deferredExecutionDispatcher.notify();
		this.extAjax.abort(request);
		/* jshint ignore:start */
		if (typeof performanceManager !== "undefined") {
			performanceManager.stop(request.url);
		}
		/* jshint ignore:end */
		request.terminated = true;
		this.fireEvent("requestaborted", request);
	},

	/**
	 * Cancels execution of the request by the ID of the object requester.
	 * @param {String} instanceId Object instance id.
	 */
	abortRequestByInstanceId: function(instanceId) {
		var request = this.requests[instanceId];
		if (request) {
			this.abortRequest(request);
		}
	},

	/**
	 * Sends an HTTP request to a remote server.
	 * @param {Object} config The configuration object that describes the parameters of AJAX-request.
	 * @param {Object} [config.instanceId] ID of the object requester.
	 * @return {Object} Returns instance of the request.
	 */
	request: function(config) {
		var callback = config.callback;
		var scope = config.scope || {};
		var headers = config.headers = config.headers || {};
		var instanceId = config.instanceId;
		var requestObj;
		var cachedResponse = this.getResponseFromCache(config);
		if (cachedResponse) {
			callback.apply(scope, [config, true, cachedResponse]);
			/* jshint ignore:start */
			performanceManager.stop(config.url);
			/* jshint ignore:end */
			return requestObj;
		}
		config.scope = this;
		config.callback = function(options, success, response) {
			this._markRequestAsNotActive(requestObj);
			this._deferredExecutionDispatcher.notify();
			/* jshint ignore:start */
			performanceManager.stop(options.url);
			/* jshint ignore:end */
			if (requestObj.aborted || requestObj.terminated) {
				return;
			}
			var serverChannel = Terrasoft.ServerChannel;
			if (success && serverChannel.getConnectionState() === Terrasoft.SocketConnectionState.CLOSED) {
				serverChannel.init();
			}
			success = this.validateResponse(options, success, response);
			if (!scope.destroyed && Ext.isFunction(callback)) {
				callback.call(scope, options, success, response);
				this.setResponseToCache(options, response);
			} else {
				Terrasoft.Mask.clearAllMasks();
			}
			requestObj.completed = true;
			if (instanceId) {
				delete this.requests[instanceId];
			}
		};
		if (config.useDefaultHeaders === false) {
			Ext.Ajax.useDefaultXhrHeader = false;
		} else {
			headers["X-Request-Source"] = "ajax-provider";
		}
		this.addCsrfTokenToHeaders(headers);
		try {
			/* jshint ignore:start */
			performanceManager.start(config.url);
			/* jshint ignore:end */
			requestObj = this.extAjax.request(config);
		}
		finally {
			Ext.Ajax.useDefaultXhrHeader = true;
		}
		if (instanceId) {
			this.requests[instanceId] = requestObj;
		}
		this._activeRequests.push(requestObj);
		return requestObj;
	},

	/**
  * Generates and logs a query execution error message.
  * @private
  * @param {Object} response Server response.
  * @param {String} errorText The query result error text.
  */
	logResponseError: function(response, errorText) {
		var logMessage = Terrasoft.Resources.AjaxProvider.RequestErrorTemplate;
		logMessage = logMessage.replace("{errorText}", errorText);
		logMessage = logMessage.replace("{errorStatus}", response.status);
		logMessage = logMessage.replace("{errorStatusText}", response.statusText);
		var requestOptions = response.request.options;
		logMessage = logMessage.replace("{requestUrl}", requestOptions.url);
		logMessage = logMessage.replace("{requestMethod}", requestOptions.method);
		var requestDataText, requestData;
		requestData  = requestOptions.jsonData || requestOptions.xmlData || requestOptions.binaryData;
		if (requestData) {
			if (Ext.isObject(requestData) || Ext.isArray(requestData)) {
				var securitySensitiveFields = requestOptions.securitySensitiveFields || [];
				Terrasoft.each(securitySensitiveFields, function(securitySensitiveField) {
						if (requestData[securitySensitiveField]) {
							requestData[securitySensitiveField] = "*******";
						}
				});
				requestDataText = Ext.encode(requestData);
			} else {
				requestDataText = requestData;
			}
		}
		if (requestDataText && (requestDataText.length > this.maxDataLogSize)) {
			requestDataText = requestDataText.substring(0, this.maxDataLogSize) + "...";
		}
		logMessage = logMessage.replace("{requestData}", requestDataText);
		this.error(logMessage);
	},

	/**
  * Performs the validation of the response from the transport server.
  * @private
  * @param {Object} request Request instance.
  * @param {Boolean} success Indicates a successful server response.
  * @param {Object} response Server response.
  * @return {Boolean} true - the response is correct, else - false.
  */
	validateResponse: function(request, success, response) {
		if (success) {
			return true;
		}
		var errorText = "";
		if (response.status === 401) {
			window.location = Terrasoft.loaderBaseUrl;
		} else if (response.status === 0) {
			this.extAjax.abort(request);
			if (response.timedout) {
				errorText = Terrasoft.Resources.AjaxProvider.RequestTimeout;
			} else {
				errorText = Terrasoft.Resources.AjaxProvider.ServerUnavailable;
			}
		}
		this.logResponseError(response, errorText);
		return false;
	},

	/**
  * Saves the result of the AJAX request to the cache
  * @private
  * @param {Object} options A configuration object that describes the parameters of the AJAX request
  * @param {Object} options.cacheLevel Caching Level
  * @param {Object} options.cacheKey Caching level key
  * @param {Object} response AJAX Request Response Object
  */
	setResponseToCache: function(options, response) {
		if (options.cacheLevel && options.cacheKey) {
			var cache = Terrasoft[options.cacheLevel];
			cache.setItem(options.cacheKey, response);
		}
	},

	/**
  * Gets the result of an AJAX request from the cache
  * @private
  * @param {Object} options A configuration object that describes the parameters of the AJAX request
  * @param {Object} options.cacheLevel Caching Level
  * @param {Object} options.cacheKey Caching level key
  * @return {Object} AJAX Request Response Object
  */
	getResponseFromCache: function(options) {
		var response = null;
		if (options.cacheLevel && options.cacheKey) {
			var cache = Terrasoft[options.cacheLevel];
			response = cache.getItem(options.cacheKey);
		}
		return response;
	},

	/**
	 * Adds CSRF token to header if exist.
	 * @private
	 * @param {Object} headers Request headers.
	 */
	addCsrfTokenToHeaders: function(headers) {
		var csrfToken = Ext.util.Cookies.get(this.csrfCookieName);
		if (csrfToken !== null) {
			headers[this.csrfCookieName] = csrfToken;
		}
	},

	/**
	 * Returns Terrasoft.DeferredExecution.Dispatcher instance that executes callbacks only when there is no active
	 * AJAX request.
	 * @returns {Terrasoft.DeferredExecution.Dispatcher}
	 */
	getDeferredExecutionDispatcher: function() {
		return this._deferredExecutionDispatcher;
	}
});
