/**
 * The transport layer for querying the server.
 */
Ext.define("Terrasoft.core.BaseServiceProvider", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.BaseServiceProvider",

	statics: {
		/**
		 * Query timeout in milliseconds. The default is 30 seconds.
		 * @private
		 * @type {Number}
		 */
		requestTimeout: 30000,

		/**
		 * Gets system setting value from {@link Terrasoft.SysSettings#cachedSettings cache}.
		 * @private
		 * @static
		 * @param {String} key Key of the system settings.
		 * @return {String|null} Cached system setting value.
		 */
		_getCachedSetting: function(key) {
			if (!Terrasoft.SysSettings || !Terrasoft.SysSettings.getCachedSysSetting) {
				return null;
			}
			return Terrasoft.SysSettings.getCachedSysSetting(key);
		},

		/**
		 * Returns client request timeout in ms.
		 * @static
		 * @param {Object} config Request config.
		 * @param {Object} config.data Query options.
		 * @param {Number} [config.data.requestTimeout] Timeout of the request in ms.
		 * @param {Number} [defaultTimeout] Default timeout of the request in ms.
		 * @return {Number} Request timeout.
		 */
		getRequestTimeout: function(config, defaultTimeout) {
			const sysSettingsTimeout = this._getCachedSetting("DataServiceQueryTimeout");
			const data = config.data;
			const configTimeout = data && data.requestTimeout;
			const serviceDefaultTimeout = this.requestTimeout;
			return configTimeout || defaultTimeout || sysSettingsTimeout || serviceDefaultTimeout;
		}
	},

	//region Properties: Private

	/**
	 * Web request method.
	 * @private
	 * @type {String}
	 */
	requestMethod: "POST",

	/**
	 * Query timeout in milliseconds.
	 * @private
	 * @type {Number}
	 */
	requestTimeout: null,

	//endregion

	//region Properties: Protected

	/**
	 * Url of the service method.
	 * @protected
	 * @type {String}
	 */
	serviceUrl: "",

	/**
	 * Provider for query execution.
	 * @protected
	 * @type {Terrasoft.AjaxProvider}
	 */
	requestProvider: Terrasoft.AjaxProvider,

	//endregion

	//region Methods: Private

	/**
	 * Generates object params of the ajax query.
	 * @private
	 * @param {Object} config Params of the query.
	 * @param {String} config.url URL for the request to the Web service.
	 * @param {String} config.serverMethod Service method name on the server for query.
	 * @param {Object} config.data Query options.
	 * @param {Number} [config.data.requestTimeout] Timeout of the request in ms.
	 * @param {String} [config.data.instanceId] Instance id of the requester.
	 * @param {Function} [callback] (optional) The function to be called when a response is received from the server.
	 * @param {Object} [scope] (optional) Context of the callback function.
	 * @return {Object} The configuration object that describes the parameters of AJAX-request.
	 */
	buildRequest: function(config, callback, scope) {
		const data = config.data;
		const instanceId = data && data.instanceId;
		const jsonData = this.getJsonData(data);
		let cacheLevel = "";
		let cacheKey = "";
		if (scope) {
			cacheLevel = scope.cacheLevel;
			cacheKey = scope.cacheKey;
		}
		const headers = {
			"Content-Type": "application/json"
		};
		if (Terrasoft.findValueByPath(config, "data.useTimeStampHeader")) {
			this._addTimestampToHeaders(headers);
		}
		return {
			url: config.url || this.getRequestUrl(config.serverMethod),
			headers: headers,
			method: this.requestMethod,
			jsonData: jsonData,
			timeout: this.getRequestTimeout(config),
			scope: this,
			callback: function(options, success, response) {
				scope = scope || this;
				if (Ext.isFunction(callback) && scope.destroyed !== true) {
					const result = this.parseResponse(response, success);
					callback.call(scope, result);
				}
			},
			cacheLevel: cacheLevel,
			cacheKey: cacheKey,
			instanceId: instanceId
		};
	},

	/**
	 * Adds timestamp to request headers.
	 * @private
	 * @param {Object} headers collection
	 */
	_addTimestampToHeaders: function(headers) {
		headers.Timestamp = new Date(Date.now()).toISOString();
	},

	/**
	 * Returns data that conforms to the JSON standard.
	 * @private
	 * @param {String|Object} data The data.
	 * @return {string} Data that conforms to the JSON standard.
	 */
	getJsonData: function(data) {
		let jsonData = "";
		if (Ext.isString(data)) {
			jsonData = data;
		} else if (Ext.isFunction(data.serialize)) {
			jsonData = data.serialize();
		} else {
			jsonData = Terrasoft.encode(data);
		}
		return jsonData;
	},

	/**
	 * Converts the text of the server response to the object.
	 * @private
	 * @param {Object} response The response from the server.
	 * @param {Boolean} [response.timedout=false] Flag which represents whether request timed out.
	 * @param {String} [response.responseText=""] The response string from the server.
	 * @param {Boolean} success Indicates whether response is successful or not.
	 * @return {Object} The object of the response from the server.
	 */
	getResponseObject: function(response, success) {
		const responseText = (response) ? response.responseText : "";
		if (response && response.timedout) {
			throw new Terrasoft.QueryExecutionException({
				message: Terrasoft.Resources.DataProvider.timeoutResponseExceptionMessage
			});
		}
		if (Ext.isEmpty(responseText)) {
			throw new Terrasoft.QueryExecutionException({
				message: Terrasoft.Resources.DataProvider.emptyResponseExceptionMessage
			});
		}
		try {
			return Terrasoft.decode(responseText);
		} catch (e) {
			throw new Terrasoft.QueryExecutionException({
				message: success ? e.message : response.statusText
			});
		}
	},

	/**
	 * Processes the server response and returns the query results object.
	 * @private
	 * @param {Object} response The server response object.
	 * @param {Boolean} response.success Indicates whether the request was successful.
	 * @param {Boolean} response.timedout Flag which represents whether request timed out.
	 * @param {String} response.responseText The response string from the server.
	 * @param {Boolean} success Response success.
	 * @return {Object} Object of query results.
	 */
	parseResponse: function(response, success) {
		let errorInfo;
		let parsedResponse;
		let responseStatus;
		const featureState = Terrasoft.Features.getIsEnabled("DoNotProcessErrorInfoFromResponse");
		try {
			parsedResponse = this.getResponseObject(response, featureState || success);
		} catch (e) {
			errorInfo = {
				message: e.message,
				response: response
			};
		}
		//TODO rename responseStatus or ResponseStatus to errorInfo on server side
		if (parsedResponse) {
			responseStatus = parsedResponse.ResponseStatus || parsedResponse.responseStatus;
		}
		if (!featureState && parsedResponse && parsedResponse.errorInfo) {
			errorInfo = parsedResponse.errorInfo;
		}
		if (!errorInfo && responseStatus) {
			errorInfo = {
				errorCode: responseStatus.ErrorCode,
				message: responseStatus.Message,
				stackTrace: responseStatus.StackTrace,
				errors: responseStatus.Errors
			};
		}
		if (errorInfo) {
			return {
				success: false,
				errorInfo: errorInfo
			};
		}
		parsedResponse.success = featureState || success;
		return parsedResponse;
	},

	//endregion

	//region Methods: Protected

	/**
	 * Returns client request timeout in ms.
	 * @protected
	 * @param {Object} config Request config.
	 * @param {Object} config.data Query options.
	 * @param {Number} [config.data.requestTimeout] Timeout of the request in ms.
	 * @return {Number} Request timeout.
	 */
	getRequestTimeout: function(config) {
		return Terrasoft.BaseServiceProvider.getRequestTimeout(config, this.requestTimeout);
	},

	/**
	 * Gets the URL for the request to the web service.
	 * @protected
	 * @param {String} serverMethod The name of the service method on the server for the query.
	 * @return {String} Relative Url method of processing the request on the server.
	 */
	getRequestUrl: Terrasoft.abstractFn,

	/**
	 * Returns the processed result of the query.
	 * @protected
	 * @param {Object} requestConfig Query configuration.
	 * @param {Object} response The result of the query.
	 * @return {Object} Processed result of query execution.
	 */
	prepareResponse: function(requestConfig, response) {
		const responseClassName = requestConfig.responseClassName;
		if (responseClassName) {
			const responseInstance = Ext.create(responseClassName, response);
			if (Ext.isFunction(responseInstance.setRequestConfig)) {
				responseInstance.setRequestConfig(requestConfig);
			}
			return responseInstance;
		}

		return response;
	},

	//endregion

	//region Methods: Public

	/**
	 * Sands request to server.
	 * @param {Object} config
	 * @param {String} config.url URL for request.
	 * @param {String} config.serverMethod Method name on the server.
	 * @param {Object} config.data Data for request.
	 * @param {Function} callback Callback method.
	 * @param {Object} scope Callback method context.
	 * @return {Object} Returns instance of the request.
	 */
	executeRequest: function(config, callback, scope) {
		const requestConfig = this.buildRequest(config, callback, scope);
		return this.requestProvider.request(requestConfig);
	},

	/**
	 * Executes the request to the server, after receiving a response from the server,
	 * calls the callback function in the scope context.
	 * @param {Object} config The query parameter object.
	 * @param {String} config.url URL for requesting a web service.
	 * @param {String} config.serverMethod The name of the service method on the server for the query.
	 * @param {Object} config.data The data for the query.
	 * @param {String} config.responseClassName Name of the query response class.
	 * @param {Function} callback Function that will be called when a response from the server is received.
	 * @param {Object} scope The context in which the callback function will be called.
	 */
	execute: function(config, callback, scope) {
		this.executeRequest(config, function(response) {
			const result = this.prepareResponse(config, response);
			Ext.callback(callback, scope, [result]);
		}, this);
	},

	/**
	 * Asynchronously executes the request to the server, after receiving a response from the server
	 * calls Promise.resolve.
	 * @param {Object} config The query parameter object.
	 * @param {String} config.url URL for requesting a web service.
	 * @param {String} config.serverMethod The name of the service method on the server for the query.
	 * @param {Object} config.data The data for the query.
	 * @param {String} config.responseClassName Name of the query response class.
	 * @return {Promise<Object>} Processed result of query execution.
	 */
	executeAsync: function(config) {
		return new Promise((resolve) => {
			this.executeRequest(config, (response) => {
				const result = this.prepareResponse(config, response);
				resolve(result);
			}, this);
		});
	}

	//endregion

});
