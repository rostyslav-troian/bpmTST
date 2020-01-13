/**
 * @class Terrasoft.services.ServiceSchemaManager
 */
Ext.define("Terrasoft.services.ServiceSchemaManager", {
	extend: "Terrasoft.BaseSchemaManager",
	alternateClassName: "Terrasoft.ServiceSchemaManager",

	singleton: true,

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#itemClassName
	 * @overridden
	 */
	itemClassName: "Terrasoft.ServiceSchemaManagerItem",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#managerName
	 * @overridden
	 */
	managerName: "ServiceSchemaManager",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#itemInstanceClassName
	 * @overridden
	 */
	itemInstanceClassName: "ServiceSchema",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#outdatedEventName
	 * @override
	 */
	outdatedEventName: "ServiceSchema_Outdated",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#useNotification
	 * @override
	 */
	useNotification: true,

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#entitySchemaName
	 * @overridden
	 */
	entitySchemaName: "VwWebServiceV2",

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	_getNamePrefix:function (metaData){
		var usr = this.schemaNamePrefix;
		return Ext.String.startsWith(metaData.name, usr)
			? metaData.name
			: usr + metaData.name;
	},

	/**
	 * @private
	 */
	_applyParameterNamePrefix: function(parameter) {
		parameter.name = this._getNamePrefix(parameter);
		this._applyParametersNamePrefix(parameter.itemProperties.items);
	},

	/**
	 * @private
	 */
	_applyParametersNamePrefix: function(parameters) {
		Terrasoft.each(parameters, function(parameter) {
			this._applyParameterNamePrefix(parameter);
		}, this);
	},

	/**
	 * @private
	 */
	_applySchemaNamePrefix: function(metaData) {
		Terrasoft.each(metaData.methods.items, function(method) {
			method.name = this._getNamePrefix(method);
			this._applyParametersNamePrefix(method.request.parameters.items);
			this._applyParametersNamePrefix(method.response.parameters.items);
		}, this);
	},

	/**
	 * @private
	 */
	_findParameterByProperty: function(propertyName, propertyValue, collection) {
		var result;
		collection.each(function(paramater) {
			if (paramater.getPropertyValue(propertyName) === propertyValue) {
				result = paramater;
			} else {
				result = this._findParameterByProperty(propertyName, propertyValue, paramater.itemProperties);
			}
			if (result) {
				return false;
			}
		}, this);
		return result;
	},

	/**
	 * @private
	 */
	_findParameterByPath: function(parameters, config) {
		if (config && config.startParameterUId) {
			const startParameter =  this._findParameterByProperty("uId", config.startParameterUId, parameters);
			if (startParameter) {
				parameters = startParameter.itemProperties;
			}
		}
		if (config && config.type) {
			parameters = parameters.filterByPath("type", config.type);
		}
		return config && config.method
			? this._findParameterByProperty("path", config.path, parameters)
			: null;
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#getDesignSchemaRequestParameters
	 * @overridden
	 */
	getDesignSchemaRequestParameters: function() {
		return {
			contractName: "DesignServiceSchemaRequest",
			responseClassName: "Terrasoft.ServiceSchemaResponse"
		};
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#copySchema
	 * @overridden
	 */
	copySchema: function(sourceSchema) {
		var schemaUId = Terrasoft.generateGUID();
		var metaData = JSON.parse(sourceSchema.serialize());
		var propertiesToReplace = ["createdInSchemaUId", "modifiedInSchemaUId"];
		metaData = this.replaceObjectProperty(metaData, propertiesToReplace, sourceSchema.uId, schemaUId);
		metaData.uId = schemaUId;
		metaData.realUId = schemaUId;
		var namePrefix = this._getNamePrefix(metaData);
		metaData.name = this.generateItemUniqueName(namePrefix);
		metaData.caption = sourceSchema.caption + " - Copy";
		this._applySchemaNamePrefix(metaData);
		var schema = Ext.create(this.itemInstanceClassName, metaData);
		return this.addSchema(schema);
	},

	/**
	 * Searches method by uid.
	 * @param {Object} config Search config.
	 * @param {String} config.serviceUId Service uid.
	 * @param {String} config.methodUId Method uid.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Scope of callback function.
	 * @return {Terrasoft.ServiceMethod} Found method.
	 */
	findMethodByUId: function(config, callback, scope) {
		Terrasoft.chain(
			function(next) {
				this.initialize(next, this);
			},
			function(next) {
				this.findInstanceByUId(config.serviceUId, next, this);
			},
			function(next, schema) {
				var method;
				if (schema) {
					method = schema.methods.findByPath("uId", config.methodUId);
				}
				Ext.callback(callback, scope, [method]);
			},
			this
		);
	},

	/**
	 * Searches request parameter by uid.
	 * @param {Object} config Search config.
	 * @param {String} config.serviceUId Service uid.
	 * @param {String} config.methodUId Method uid.
	 * @param {String} config.parameter Parameter uid.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Scope of callback function.
	 * @return {Terrasoft.ServiceParameter} Found parameter.
	 */
	findRequestParameterByUId: function(config, callback, scope) {
		Terrasoft.chain(
			function(next) {
				this.initialize(next, this);
			},
			function(next) {
				this.findMethodByUId(config, next, this);
			},
			function(next, method) {
				var parameter;
				if (method) {
					parameter = this._findParameterByProperty("uId", config.parameterUId,
						method.request.parameters);
				}
				Ext.callback(callback, scope, [parameter]);
			},
			this
		);
	},

	/**
	 * Searches response parameter by uid.
	 * @param {Object} config Search config.
	 * @param {String} config.serviceUId Service uid.
	 * @param {String} config.methodUId Method uid.
	 * @param {String} config.parameter Parameter uid.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Scope of callback function.
	 * @return {Terrasoft.ServiceParameter} Found parameter.
	 */
	findResponseParameterByUId: function(config, callback, scope) {
		Terrasoft.chain(
			function(next) {
				this.initialize(next, this);
			},
			function(next) {
				this.findMethodByUId(config, next, this);
			},
			function(next, method) {
				var parameter;
				if (method) {
					parameter = this._findParameterByProperty("uId", config.parameterUId,
						method.response.parameters);
				}
				Ext.callback(callback, scope, [parameter]);
			},
			this
		);
	},

	/**
	 * Searches request parameter by type.
	 * @param {Object} config Search config.
	 * @param {String} config.serviceUId Service uid.
	 * @param {String} config.methodUId Method uid.
	 * @param {Number} config.type Parameter type from Terrasoft.services.enums.ServiceParameterType.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Scope of callback function.
	 * @return {Terrasoft.ServiceParameter} Found parameter.
	 */
	findRequestParameterByType: function(config, callback, scope) {
		Terrasoft.chain(
			function(next) {
				this.initialize(next, this);
			},
			function(next) {
				this.findMethodByUId(config, next, this);
			},
			function(next, method) {
				var parameter;
				if (method) {
					parameter = this._findParameterByProperty("type", config.type,
						method.request.parameters);
				}
				Ext.callback(callback, scope, [parameter]);
			},
			this
		);
	},

	/**
	 * Searches request parameter by path.
	 * @param {Object} config Search config.
	 * @param {String} config.method Service method.
	 * @param {String} config.path Parameter path .
	 * @param {String} config.type Parameter type.
	 * @param {String} config.startParameterUId UId of parameter to start find.
	 * @return {Terrasoft.ServiceParameter} Found parameter.
	 */
	findRequestParameterByPath: function(config) {
		const parameters = config.method.request.parameters;
		return this._findParameterByPath(parameters, config);
	},

	/**
	 * Searches response parameter by path.
	 * @param {Object} config Search config.
	 * @param {String} config.method Service method.
	 * @param {String} config.path Parameter path.
	 * @param {String} config.type Parameter type.
	 * @param {String} config.startParameterUId UId of parameter to start find.
	 * @return {Terrasoft.ServiceParameter} Found parameter.
	 */
	findResponseParameterByPath: function(config) {
		const parameters = config.method.response.parameters;
		return this._findParameterByPath(parameters, config);
	}

	//endregion

});
