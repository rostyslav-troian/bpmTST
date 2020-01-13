/**
 * @class Terrasoft.services.ServiceMethod
 */
Ext.define("Terrasoft.services.ServiceMethod", {
	extend: "Terrasoft.ServiceMetaItem",
	alternateClassName: "Terrasoft.ServiceMethod",

	//region Properties: Private

	/**
	 * Request timeout, milliseconds.
	 * @private
	 * @type {Number}
	 */
	_maxRetryTimeout: 64000,

	//endregion

	//region Properties: Public

	/**
	 * @type {Terrasoft.ServiceMethodRequest}
	 */
	request: null,

	/**
	 * @type {Terrasoft.ServiceMethodResponse}
	 */
	response: null,

	/**
	 * @type {Terrasoft.LocalizableString}
	 */
	caption: null,

	/**
	 * Request timeout, milliseconds.
	 * @type {Number}
	 */
	requestTimeout: 5000,

	/**
	 * Use service authentification info.
	 * @type {Boolean}
	 */
	useAuthInfo: false,

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	_initRequest: function(config) {
		this.request = config && config.request || this.request || {};
		if (this.request && !Terrasoft.isInstanceOfClass(this.request, "Terrasoft.ServiceMethodRequest")) {
			this.request._serviceSchema = this.getServiceSchema();
			this.request = Ext.create("Terrasoft.ServiceMethodRequest", this.request);
		}
	},

	/**
	 * @private
	 */
	_initResponse: function(config) {
		this.response = config && config.response || this.response || {};
		if (this.response && !Terrasoft.isInstanceOfClass(this.response, "Terrasoft.ServiceMethodResponse")) {
			this.response._serviceSchema = this.getServiceSchema();
			this.response = Ext.create("Terrasoft.ServiceMethodResponse", this.response);
		}
	},

	/**
	 * @private
	 */
	_initCaption: function(config) {
		this.caption = config && config.caption || this.caption;
		if (!Terrasoft.isInstanceOfClass(this.caption, "Terrasoft.LocalizableString")) {
			this.caption = this.caption
				? Ext.create("Terrasoft.LocalizableString", { cultureValues: this.caption })
				: Ext.create("Terrasoft.LocalizableString");
		}
	},

	/**
	 * @private
	 */
	_getRetryTimeoutAttempt: function(retryAttempt) {
		return retryAttempt > 6 ? this._maxRetryTimeout : Math.pow(2, retryAttempt) * 1000;
	},

	/**
	 * @private
	 */
	_mergeAuthInfo: function(method) {
		this.setPropertyValue("useAuthInfo", method.useAuthInfo);
		const currentAuthType = this._serviceSchema.authInfo.authType;
		if (currentAuthType === Terrasoft.services.enums.AuthType.None) {
			const serviceSchema = method.getServiceSchema();
			this._serviceSchema.authInfo.setPropertyValue("authType", serviceSchema.authInfo.authType);
			this._serviceSchema.authInfo.values.clear();
		}
	},

	/**
	 * @private
	 */
	_mergeParameters: function(source, target, findFn) {
		target.suspendEvents();
		this._mergeParametersCollection(source, target, findFn);
		target.resumeEvents();
		target.fireEvent("dataLoaded");
	},

	/**
	 * Merge parameters collection.
	 * @param {Terrasoft.ObjectCollection} source Source collection.
	 * @param {Terrasoft.ObjectCollection} target Target collection.
	 * @param {Function} findFn Function to find parameter by path.
	 * @private
	 */
	_mergeParametersCollection: function(source, target, findFn) {
		Terrasoft.each(source, function(value) {
			var existedItem = findFn({
				method: this,
				path: value.path,
				type: value.type
			});
			if (!existedItem) {
				target.add(value.uId, this._createParameterInstance(value));
			} else if (existedItem.dataValueTypeName === Terrasoft.services.enums.DataValueTypeName.Object) {
				this._mergeParametersCollection(value.itemProperties, existedItem.itemProperties, findFn);
			}
		}, this);
	},

	/**
	 * @private
	 */
	_createParameterInstance: function(parameter) {
		const instance = new Terrasoft.ServiceParameter(Ext.merge({_serviceSchema: this._serviceSchema}, {
				defValue: {
					source: parameter.defValue.source,
					value: parameter.defValue.value
				},
				description: parameter.description,
				isArray: parameter.isArray,
				isRequired: parameter.isRequired,
				path: parameter.path,
				name: parameter.name,
				uId: parameter.uId,
				type: parameter.type,
				dataValueTypeName: parameter.dataValueTypeName
			}));
		instance.setLocalizableStringPropertyValue("caption", parameter.caption.getValue());
		parameter.itemProperties.each(function(value, key) {
			instance.itemProperties.add(key, this._createParameterInstance(value));
		}, this);
		return instance;
	},

	/**
	 * @private
	 */
	_needMergeUri: function(config) {
		return Ext.isEmpty(this.request.uri) || (config && config.options && !config.options.skipUri);
	},

	/**
	 * @private
	 */
	_needMergeHttpMethodType: function(config) {
		const skipHttpMethodType = config && config.options && !config.options.skipHttpMethodType;
		const bodyParametersAreEmpty = this.request.parameters
			.filterByPath("type", Terrasoft.services.enums.ServiceParameterType.BODY).isEmpty();
		const isNewHttpMethodTypeSupportBody = config.method.request.httpMethodType !==
			Terrasoft.services.enums.HttpMethodType.GET;
		return skipHttpMethodType && (isNewHttpMethodTypeSupportBody || bodyParametersAreEmpty);
	},

	//endregion

	//region Methods: Protected

	/**
	 * @returns {Array}
	 */
	getSerializableProperties: function() {
		return ["uId", "name", "caption", "requestTimeout", "request", "response", "useAuthInfo"];
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor.
	 * @overridden
	 */
	constructor: function(config) {
		this.callParent(arguments);
		this._initRequest(config);
		this._initResponse(config);
		this._initCaption(config);
	},

	/**
	 * Sets the value of the localized property of the method.
	 * @param {String} propertyName Property name.
	 * @param {String} propertyValue Value.
	 * @param {String} culture The name of the culture.
	 */
	setLocalizableStringPropertyValue: function(propertyName, propertyValue, culture) {
		Terrasoft.validateObjectClass(this[propertyName], "Terrasoft.LocalizableString");
		if (culture) {
			this[propertyName].setCultureValue(culture, propertyValue);
		} else {
			this[propertyName].setValue(propertyValue);
		}
		var changes = {};
		changes[propertyName] = this[propertyName];
		this.fireEvent("changed", changes, this);
	},

	/**
	 * Returns retry request timeout, milliseconds.
	 * @param {Number} retryCount Retry count.
	 * @returns {Number} Milliseconds.
	 */
	getRetryRequestTimeout: function(retryCount) {
		var retryTimeout = this.requestTimeout;
		for (var i = 0; i < retryCount; i++) {
			retryTimeout += this.requestTimeout + this._getRetryTimeoutAttempt(i);
		}
		return retryTimeout;
	},

	/**
	 * Merges method with one from argument.
	 * @param {Object} config Merge config.
	 * @param {Terrasoft.ServiceMethod} config.method Method to merge.
	 * @param {Terrasoft.ServiceMethod} config.options Method options.
	 */
	merge: function(config) {
		if (config) {
			if (config.method.request) {
				if (config.method.request.parameters) {
					this._mergeParameters(config.method.request.parameters, this.request.parameters,
						Terrasoft.ServiceSchemaManager.findRequestParameterByPath.bind(Terrasoft.ServiceSchemaManager));
				}
				if (this._needMergeHttpMethodType(config)) {
					this.request.setPropertyValue("httpMethodType", config.method.request.httpMethodType);
				}
				if (this._needMergeUri(config)) {
					this.request.setPropertyValue("uri", config.method.request.uri);
				}
			}
			if (config.options && config.options.useAuth) {
				this._mergeAuthInfo(config.method);
			}
			if (config.method.response && config.method.response.parameters) {
				this._mergeParameters(config.method.response.parameters, this.response.parameters,
					Terrasoft.ServiceSchemaManager.findResponseParameterByPath.bind(Terrasoft.ServiceSchemaManager));
			}
		}
	}

	//endregion

});
