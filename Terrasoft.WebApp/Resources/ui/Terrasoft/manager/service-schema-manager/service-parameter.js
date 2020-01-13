/**
 * @class Terrasoft.services.ServiceParameter
 */
Ext.define("Terrasoft.services.ServiceParameter", {
	extend: "Terrasoft.ServiceMetaItem",
	alternateClassName: "Terrasoft.ServiceParameter",

	//region Properties: Public

	/**
	 * Caption
	 * @type {Terrasoft.LocalizableString}
	 */
	caption: null,

	/**
	 * Description
	 * @type {Terrasoft.LocalizableString}
	 */
	description: null,

	/**
	 * Path
	 * @type {String}
	 */
	path: null,

	/**
	 * Path
	 * @type {Terrasoft.ServiceParameterValue}
	 */
	defValue: null,

	/**
	 * DataValueTypeName
	 * @type {String}
	 */
	dataValueTypeName: Terrasoft.services.enums.DataValueTypeName.Text,

	/**
	 * Is array
	 * @type {Boolean}
	 */
	isArray: false,

	/**
	 * Is required.
	 * @type {Boolean}
	 */
	isRequired: false,

	/**
	 * Item properties
	 * @type {Terrasoft.ObjectCollection}
	 */
	itemProperties: null,

	/**
	 * Type
	 * @type {Terrasoft.services.enums.ServiceParameterType}
	 */
	type: Terrasoft.services.enums.ServiceParameterType.UNDEFINED,

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	_getItemPropertiesConfigItems: function(config) {
		return config && config.itemProperties && (config.itemProperties.items || config.itemProperties.Items);
	},

	/**
	 * @private
	 */
	_initItemProperties: function(config) {
		this.itemProperties = this.itemProperties || new Terrasoft.ObjectCollection();
		var items = this._getItemPropertiesConfigItems(config);
		if (items && !Terrasoft.isInstanceOfClass(config.itemProperties, "Terrasoft.ObjectCollection")) {
			this.itemProperties = new Terrasoft.ObjectCollection();
			Terrasoft.each(items, function(parameterConfig, parameterUId) {
				parameterConfig._serviceSchema = this.getServiceSchema();
				this.itemProperties.add(parameterUId, Ext.create("Terrasoft.ServiceParameter",
					parameterConfig));
			}, this);
		}
	},

	/**
	 * @private
	 */
	_initDefValue: function(config) {
		this.defValue = config && config.defValue || this.defValue;
		if (this.defValue && !Terrasoft.isInstanceOfClass(this.defValue, "Terrasoft.ServiceParameterValue")) {
			this.defValue._serviceSchema = this.getServiceSchema();
			this.defValue = Ext.create("Terrasoft.ServiceParameterValue", this.defValue);
		}
		if (!this.defValue) {
			this.defValue = Ext.create("Terrasoft.ServiceParameterValue");
		}
	},

	/**
	 * @private
	 */
	_initCaption: function() {
		this.caption = this.caption
			? Ext.create("Terrasoft.LocalizableString", {cultureValues: this.caption})
			: Ext.create("Terrasoft.LocalizableString");
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.MetaItem#getRestoreOrder
	 * @override
	 */
	getRestoreOrder: function (properties) {
		return properties.sort();
	},

	/**
	 * @inheritdoc Terrasoft.ServiceMetaItem#getPropertyPath
	 * @override
	 */
	getPropertyPath: function() {
		return "parameter";
	},

	/**
	 * @inheritdoc Terrasoft.serializable#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		return ["uId", "name", "caption", "description", "path", "defValueSource", "defValue", "dataValueTypeName",
			"isArray", "isRequired", "type", "itemProperties"];
	},

	/**
	 * @inheritdoc Terrasoft.serializable#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.parameters = this.getSerializableProperty(this.itemProperties);
	},

	/**
	 * @inheritdoc Terrasoft.MetaItem#restorePropertyValue.
	 * @overridden
	 */
	restorePropertyValue: function(propertyName, propertyValue) {
		if (propertyName === "itemProperties") {
			this.itemProperties.clear();
			Terrasoft.each(propertyValue.items, function(parameterConfig, parameterUId) {
				parameterConfig._serviceSchema = this.getServiceSchema();
				this.itemProperties.add(parameterUId, Ext.create("Terrasoft.ServiceParameter",
						parameterConfig));
			}, this);
		} else {
			this.callParent(arguments);
		}
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function(config) {
		//TODO: fix parameter serialization
		if (config && config.parameters) { delete config.parameters; }
		this.callParent(arguments);
		this._initCaption();
		this._initDefValue(config);
		this._initItemProperties(config);
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
	 * Copies current instance of parameter.
	 * @param {Object} config Copy parameters.
	 * @returns {Terrasoft.ServiceParameter}
	 */
	copy: function(config) {
		var newParameter = Ext.create("Terrasoft.ServiceParameter",
				Ext.merge(JSON.parse(this.serialize()), {_serviceSchema: this._serviceSchema}));
		newParameter.uId = Terrasoft.generateGUID();
		newParameter.name += "Copy";
		if (newParameter.name.indexOf(Terrasoft.ServiceSchemaManager.schemaNamePrefix) !== 0) {
			newParameter.name = Terrasoft.ServiceSchemaManager.schemaNamePrefix + newParameter.name;
		}
		newParameter.setLocalizableStringPropertyValue("caption", newParameter.caption.getValue() +
			config.copyCaptionSufix);
		if (newParameter.itemProperties) {
			newParameter.itemProperties.each(function(nestedParameter) {
				var nestedParameterCopy = nestedParameter.copy(config);
				newParameter.itemProperties.replace(nestedParameter, nestedParameterCopy,
						nestedParameterCopy.getPropertyValue("uId"));
			}, this);
		}
		return newParameter;
	},

	/**
	 * Returns is parameter has default value.
	 * @returns {Boolean}
	 */
	hasDefaultValue: function() {
		return this.defValue && this.defValue.value;
	}

	//endregion

});
