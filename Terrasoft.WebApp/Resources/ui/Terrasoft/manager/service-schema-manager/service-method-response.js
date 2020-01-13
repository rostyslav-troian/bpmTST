/**
 * @class Terrasoft.services.ServiceMethodResponse
 */
Ext.define("Terrasoft.services.ServiceMethodResponse", {
	extend: "Terrasoft.ServiceMetaItem",
	alternateClassName: "Terrasoft.ServiceMethodResponse",

	//region Properties: Public

	/**
	 * Service Content Type
	 * @type {Terrasoft.services.enums.ServiceContentType}
	 */
	contentType: Terrasoft.services.enums.ServiceContentType.JSON,


	/**
	 * Parameters
	 * @type {Terrasoft.ObjectCollection}
	 */
	parameters: null,

	//endregion

	//region Methods: Private

	_getParametersConfigItems: function(config) {
		return config && config.parameters && (config.parameters.items || config.parameters.Items);
	},

	/**
	 * @param parameters {Object}
	 * @private
	 */
	_addParameters: function(parameters) {
		var newParameters = new Terrasoft.ObjectCollection();
		Terrasoft.each(parameters, function(parameterConfig, parameterUId) {
			parameterConfig._serviceSchema = this.getServiceSchema();
			newParameters.add(parameterUId, Ext.create("Terrasoft.ServiceParameter", parameterConfig));
		}, this);
		this.parameters.reloadAll(newParameters);
	},

	/**
	 * @private
	 */
	_onParametersChange: function() {
		this.fireEvent("changed", {parameters: this.parameters}, this);
	},

	/**
	 * @private
	 */
	_initParameters: function(config) {
		this.parameters = this.parameters || new Terrasoft.ObjectCollection();
		var items = this._getParametersConfigItems(config);
		if (items && !Terrasoft.isInstanceOfClass(config.parameters, "Terrasoft.ObjectCollection")) {
			this.parameters = new Terrasoft.ObjectCollection();
			this._addParameters(items);
		}
		this.parameters.on("changed", this._onParametersChange, this);
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableProperties.
	 * @overridden
	 */
	getSerializableProperties: function() {
		return ["parameters", "contentType"];
	},

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableObject.
	 * @overridden
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.parameters = this.getSerializableProperty(this.parameters);
	},

	/**
	 * @inheritdoc Terrasoft.MetaUtem#restorePropertyValue.
	 * @overridden
	 */
	restorePropertyValue: function(propertyName, propertyValue) {
		if (propertyName === "parameters") {
			this.parameters.clear();
			this._addParameters(propertyValue.items);
		} else {
			this.callParent(arguments);
		}
	},
	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor.
	 * @overridden
	 */
	constructor: function(config) {
		this.callParent(arguments);
		this._initParameters(config);
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#onDestroy.
	 * @overridden
	 */
	onDestroy: function() {
		this.parameters.un("changed", this._onParametersChange, this);
		this.callParent(arguments);
	}

	//endregion
});
