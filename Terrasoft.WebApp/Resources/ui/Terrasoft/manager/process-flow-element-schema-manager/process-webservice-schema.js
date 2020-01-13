/**
 */
Ext.define("Terrasoft.manager.ProcessWebServiceSchema", {
	extend: "Terrasoft.manager.ProcessActivitySchema",
	alternateClassName: "Terrasoft.ProcessWebServiceSchema",

	//region Properties: Private

	/**
	 * @private
	 * @type {Array}
	 */
	_resultParametersMetaData: null,

	//endregion

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "652B598D-CDD5-49D5-A86D-AAFAC88213F3",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.WebServiceCaption,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 */
	group: Terrasoft.FlowElementGroup.ServiceTask,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#name
	 */
	name: "WebService",

	/**
	 * Is user task option.
	 * @protected
	 * @type {Boolean}
	 */
	isUserTask: false,

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaWebService",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 */
	smallImageName: "webService_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 */
	largeImageName: "webService_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "webService_title.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#color
	 * @override
	 */
	color: "#839DC3",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#editPageSchemaName
	 * @override
	 */
	editPageSchemaName: "WebServiceUserTaskPropertiesPage",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#portsSet
	 * @override
	 */
	portsSet: Terrasoft.diagram.enums.PortsSet.All,

	/**
	 * Service schema identifier.
	 * @protected
	 * @type {String}
	 */
	serviceSchemaUId: Terrasoft.GUID_EMPTY,

	/**
	 * Service method name.
	 * @protected
	 * @type {String}
	 */
	methodName: null,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#serializeToDB
	 * @override
	 */
	serializeToDB: true,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#isLogging
	 * @override
	 */
	isLogging: true,

	/**
	 * Response timeout.
	 * @type {Number}
	 */
	timeout: 0,

	//endregion

	//region Constructors: Public

	constructor: function() {
		this._initResultParametersMetaData();
		this.parameters = this._resultParametersMetaData;
		this.callParent(arguments);
	},

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	_initResultParametersMetaData: function() {
		var resources = Terrasoft.Resources.ProcessSchemaDesigner.Parameters;
		var direction = Terrasoft.process.enums.ProcessSchemaParameterDirection;
		this._resultParametersMetaData = [
			{
				uId: Terrasoft.generateGUID(),
				name: "Success",
				caption: new Terrasoft.LocalizableString(resources.Success),
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				direction: direction.OUT
			},
			{
				uId: Terrasoft.generateGUID(),
				name: "Response",
				caption: new Terrasoft.LocalizableString(resources.Response),
				dataValueType: Terrasoft.DataValueType.TEXT,
				direction: direction.OUT
			},
			{
				uId: Terrasoft.generateGUID(),
				name: "StatusCode",
				caption: new Terrasoft.LocalizableString(resources.StatusCode),
				dataValueType: Terrasoft.DataValueType.INTEGER,
				direction: direction.OUT
			}
		];
	},

	/**
	 * @private
	 */
	_getParameterName: function(parameter, direction) {
		return parameter.name + (direction === Terrasoft.ProcessSchemaParameterDirection.IN ? "_In" : "_Out");
	},

	/**
	 * @private
	 */
	_filterMethodParametersByCaption: function(method, caption) {
		var collection = new Terrasoft.Collection();
		collection.loadAll(method.request.parameters);
		collection.loadAll(method.response.parameters);
		return collection.filterByFn(function(parameter) {
			return parameter.caption.toString() === caption;
		});
	},

	/**
	 * @private
	 */
	_getParameterCaption: function(serviceParameter, direction, method) {
		var caption = serviceParameter.caption.clone();
		var resources = Terrasoft.Resources.ProcessSchemaDesigner.Parameters;
		var filteredParameters = this._filterMethodParametersByCaption(method, caption.toString());
		var directionPrefix = direction === Terrasoft.ProcessSchemaParameterDirection.IN
			? " - " + resources.Input
			: " - " + resources.Output;
		if (filteredParameters.getCount() > 1) {
			Terrasoft.each(caption.cultureValues, function(value, key) {
				caption.setCultureValue(key, value + directionPrefix);
			});
		}
		return caption;
	},

	/**
	 * @private
	 */
	_getParameterDataValueType: function(serviceParameter) {
		var dataValueType = Terrasoft.ServerDataValueTypeName[serviceParameter.dataValueTypeName];
		if (Ext.isEmpty(dataValueType) || dataValueType === Terrasoft.DataValueType.TEXT) {
			dataValueType = Terrasoft.DataValueType.MAXSIZE_TEXT;
		}
		if (serviceParameter.isArray) {
			dataValueType = (serviceParameter.dataValueTypeName !== Terrasoft.services.enums.DataValueTypeName.Object)
				? Terrasoft.DataValueType.OBJECT_LIST
				: Terrasoft.DataValueType.COMPOSITE_OBJECT_LIST;
		}
		return dataValueType;
	},

	/**
	 * @private
	 */
	_isParameterRequired: function(serviceParameter, direction) {
		return serviceParameter.isArray && serviceParameter.dataValueTypeName !== "Object"
			? false
			: serviceParameter.isRequired && direction === Terrasoft.ProcessSchemaParameterDirection.IN;
	},

	/**
	 * @private
	 */
	_getItemProperties: function(serviceParameter, serviceSchemaUId, direction, method) {
		var itemProperties = [];
		if (Terrasoft.Features.getIsEnabled("ProcessParameterCollections") || Terrasoft.isDebug) {
			if (serviceParameter.isArray &&
					serviceParameter.dataValueTypeName !== Terrasoft.services.enums.DataValueTypeName.Object) {
				const parameter = Ext.merge({}, serviceParameter, {
					isArray: false,
					name: serviceParameter.name + "ItemValue",
					//TODO: #CRM-39357
					caption: new Terrasoft.LocalizableString(
						Terrasoft.Resources.ProcessSchemaDesigner.Parameters.DefaultNestedParameterCaption)
				});
				itemProperties.push(this._getParameterConfig(serviceSchemaUId, parameter, direction, method));
			} else if (serviceParameter.itemProperties) {
				serviceParameter.itemProperties.each(function(parameter) {
					itemProperties.push(this._getParameterConfig(serviceSchemaUId, parameter, direction, method));
				}, this);
			}
		}
		return itemProperties;
	},

	/**
	 * @private
	 */
	_getParameterConfig: function(serviceSchemaUId, serviceParameter, direction, method) {
		return {
			uId: Terrasoft.generateGUID(),
			createdInSchemaUId: this.createdInSchemaUId,
			modifiedInSchemaUId: this.createdInSchemaUId,
			containerUId: this.uId,
			tag: serviceParameter.name,
			itemProperties: this._getItemProperties(serviceParameter, serviceSchemaUId, direction, method),
			dataValueType: this._getParameterDataValueType(serviceParameter),
			sourceValue: {source: Terrasoft.ProcessSchemaParameterValueSource.None},
			processFlowElementSchema: this,
			isRequired: this._isParameterRequired(serviceParameter, direction),
			name: this._getParameterName(serviceParameter, direction),
			direction: direction,
			caption: this._getParameterCaption(serviceParameter, direction, method)
		};
	},

	/**
	 * @private
	 */
	_findNestedParameterByName: function(parameterCollection, name) {
		return parameterCollection.findByFn(function(parameter) {
			return parameter.name === name;
		}, this);
	},

	/**
	 * @private
	 */
	_synchronizeNestedParameters: function(oldParameters, newParameters, direction) {
		var synchronizedParameters = [];
		newParameters.each(function(nestedParameter) {
			var oldNestedParameter = this._findNestedParameterByName(oldParameters, nestedParameter.name);
			if (oldNestedParameter) {
				this._updateOldParameter(oldNestedParameter, nestedParameter, synchronizedParameters, direction);
			} else {
				oldParameters.add(nestedParameter.uId, nestedParameter);
				synchronizedParameters.push(nestedParameter.uId);
			}
		}, this);
		this._removeNotActualParameters(oldParameters, synchronizedParameters);
	},

	/**
	 * @private
	 */
	_updateOldParameter: function(oldParameter, newParameter, synchronizedParameters, direction) {
		this._synchronizeNestedParameters(oldParameter.itemProperties, newParameter.itemProperties, direction);
		synchronizedParameters.push(oldParameter.uId);
		oldParameter.dataValueType = newParameter.dataValueType;
		oldParameter.isRequired = newParameter.isRequired;
		oldParameter.caption = newParameter.caption;
	},

	/**
	 * @private
	 */
	_synchronizeParameters: function(serviceSchemaUId, parameters, direction, method, synchronizedParameters) {
		parameters.each(function(serviceParameter) {
			var oldParameter = this.findParameterByName(this._getParameterName(serviceParameter, direction));
			var parameterMetaData = this._getParameterConfig(serviceSchemaUId, serviceParameter, direction, method);
			var newParameter = new Terrasoft.ProcessSchemaParameter(parameterMetaData);
			if (oldParameter) {
				this._updateOldParameter(oldParameter, newParameter, synchronizedParameters, direction);
			} else {
				this.parameters.add(newParameter.uId, newParameter);
				synchronizedParameters.push(newParameter.uId);
			}
		}, this);
	},

	/**
	 * @private
	 */
	_synchronizeResultParameters: function() {
		_.each(this._resultParametersMetaData, function(metaData) {
			var parameter = new Terrasoft.DynamicProcessSchemaParameter(metaData);
			this.synchronizeDynamicParameter(parameter);
		}, this);
	},

	/**
	 * @private
	 */
	_removeNotActualParameters: function(parameters, synchronizedParameters) {
		var parametersIterate = Terrasoft.isInstanceOfClass(parameters, "Terrasoft.ProcessSchemaParameterCollection")
				? parameters.getRoots()
				: parameters;
		parametersIterate.each(function(parameter) {
			if (Boolean(parameter.tag) && !Ext.Array.contains(synchronizedParameters, parameter.uId)) {
				parameters.remove(parameter);
			}
		}, this);
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		return Ext.Array.push(baseSerializableProperties, ["serviceSchemaUId", "methodName", "timeout"]);
	},

	/**
	 * Synchronizes element instance parameters with element schema parameters.
	 * @param {Terrasoft.ServiceSchema} serviceSchema Service schema.
	 * @protected
	 */
	synchronizeParameters: function(serviceSchema) {
		if (!this.getCanSynchronizeParameters(serviceSchema)) {
			return;
		}
		var method = this.methodName && serviceSchema.findMethodByName(this.methodName);
		if (Ext.isEmpty(method)) {
			this.clearParameters();
			return;
		}
		var actualParameters = [];
		this._synchronizeParameters(serviceSchema.uId, method.request.parameters,
			Terrasoft.ProcessSchemaParameterDirection.IN, method, actualParameters);
		this._synchronizeParameters(serviceSchema.uId, method.response.parameters,
			Terrasoft.ProcessSchemaParameterDirection.OUT, method, actualParameters);
		this._removeNotActualParameters(this.parameters, actualParameters);
		this._synchronizeResultParameters();
	}

	//endregion

});

Terrasoft.each(["methodName", "serviceSchemaUId"], function(fieldName) {
	var propName = Ext.String.capitalize(fieldName);
	Object.defineProperty(Terrasoft.ProcessWebServiceSchema.prototype, propName, {
		get: function() {
			return this.getPropertyValue(fieldName);
		},
		set: function(value) {
			this.setPropertyValue(fieldName, value);
		}
	});
}, null);
