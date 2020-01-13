/**
 * @class Terrasoft.services.AuthInfo
 */
Ext.define("Terrasoft.services.AuthInfo", {
	extend: "Terrasoft.ServiceMetaItem",
	alternateClassName: "Terrasoft.AuthInfo",

	//region Properties: Public

	/**
	 * Auth type.
	 * @type {String}
	 */
	authType: Terrasoft.services.enums.AuthType.None,

	/**
	 * Auth values.
	 * @type {Terrasoft.ObjectCollection}
	 */
	values: null,

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	_getValuesConfigItems: function(config) {
		return config && config.values && (config.values.items || config.values.Items);
	},

	/**
	 * @private
	 */
	_initValues: function(config) {
		this.values = this.values || new Terrasoft.ObjectCollection();
		var items = this._getValuesConfigItems(config);
		if (items && !Terrasoft.isInstanceOfClass(config.values, "Terrasoft.ObjectCollection")) {
			this.values = new Terrasoft.ObjectCollection();
			Terrasoft.each(items, function(valueConfig, key) {
				valueConfig._serviceSchema = this.getServiceSchema();
				this.values.add(key, Ext.create("Terrasoft.ServiceParameterValue", valueConfig));
			}, this);
		}
		this.values.on("changed", this._onValuesChange, this);
	},

	/**
	 * @private
	 */
	_onValuesChange: function() {
		this.fireEvent("changed", {authInfoValues: this.values}, this);
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.serializable#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		return ["authType", "values"];
	},

	/**
	 * @inheritdoc Terrasoft.serializable#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.values = this.getSerializableProperty(this.values);
	},

	/**
	 * @inheritdoc Terrasoft.MetaItem#restorePropertyValue.
	 * @overridden
	 */
	restorePropertyValue: function(propertyName, propertyValue) {
		if (propertyName === "values") {
			this.values.clear();
			Terrasoft.each(propertyValue.items, function(value, key) {
				value._serviceSchema = this.getServiceSchema();
				this.values.add(key, Ext.create("Terrasoft.ServiceParameterValue", value));
			}, this);
		} else {
			this.callParent(arguments);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.values.un("changed", this._onValuesChange, this);
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function(config) {
		this.callParent(arguments);
		this._initValues(config);
	}

	//endregion

});
