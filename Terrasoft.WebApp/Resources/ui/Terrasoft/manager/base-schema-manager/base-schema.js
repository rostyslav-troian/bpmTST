/**
 * @abstract
 */
Ext.define("Terrasoft.manager.BaseSchema", {
	extend: "Terrasoft.manager.MetaItem",
	alternateClassName: "Terrasoft.BaseSchema",

	/**
	 * Serializable properties list.
	 * @protected
	 * @type {String[]}
	 */
	serializableProperties: ["uId", "realUId", "name", "description", "extendParent", "packageUId",
		"createdInSchemaUId", "modifiedInSchemaUId", "createdInPackageId"],

	/**
	 * Service contract name.
	 * @protected
	 * @type {String}
	 */
	contractName: "BaseSchema",

	/**
	 * Schema caption.
	 * @protected
	 * @type {Terrasoft.LocalizableString}
	 */
	caption: null,

	/**
	 * Schema description.
	 * @protected
	 * @type {Terrasoft.LocalizableString}
	 */
	description: null,

	/**
	 * Flag that indicates parent expansion.
	 * @protected
	 * @type {Boolean}
	 */
	extendParent: false,

	/**
	 * Schema package identifier.
	 * @protected
	 * @type {String}
	 */
	packageUId: null,

	/**
	 * Flag that indicates that this schema has lazy load parameters.
	 * @protected
	 */
	hasLazyParameters: false,

	/**
	 * Definnes the schema.
	 * @protected
	 */
	define: Terrasoft.emptyFn,

	/**
	 * Sets localizable property value
	 * @param {String} propertyName Property name.
	 * @param {String} propertyValue Property value.
	 * @param {String} culture Culture name.
	 */
	setLocalizableStringPropertyValue: function(propertyName, propertyValue, culture) {
		var property = this[propertyName];
		Terrasoft.validateObjectClass(property, "Terrasoft.LocalizableString");
		var oldValue = "";
		if (culture) {
			oldValue = property.getCultureValue(culture);
			property.setCultureValue(culture, propertyValue);
		} else {
			oldValue = property.getValue();
			property.setValue(propertyValue);
		}
		if (oldValue !== propertyValue) {
			var changes = {};
			changes[propertyName] = property;
			this.fireEvent("changed", changes, this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function(config) {
		this.callParent(arguments);
		var caption = (config && config.caption) || this.caption;
		this.initLocalizableStringValue("caption", caption);
		var description = config && config.description;
		this.initLocalizableStringValue("description", description);
		this.addEvents(
			"changed"
		);
		this.initEvents();
	},

	/**
	 * Init item events
	 * @protected
	 */
	initEvents: Terrasoft.emptyFn,

	/**
	 * Returns caption value.
	 * @return {String|null}
	 */
	getCaption: function() {
		var caption = this.caption;
		return caption ? caption.getValue() : null;
	},

	/**
	 * Returns item display value
	 * @return {String} Display value.
	 */
	getDisplayValue: function() {
		return this.getCaption() || this.getName();
	},

	/**
	 * Returns unique identifier of package.
	 * @return {String}
	 */
	getPackageUId: function() {
		return this.packageUId;
	},

	/**
	 * Initializes collection from meta data.
	 * @protected
	 * @param {String} propertyName Collection property name.
	 * @param {String} itemClassName Collection item instance class name.
	 * @param {Terrasoft.manager.BaseSchema} parentSchema Collection item parentSchema.
	 * Example:
	 *
	 *      constructor: function() {
	 *      	this.callParent(arguments);
	 *      	this.initCollection("stages", "Terrasoft.DcmSchemaStage", this);
	 *      }
	 *
	 */
	initCollection: function(propertyName, itemClassName, parentSchema) {
		var metaData = this[propertyName];
		var collection = Ext.create("Terrasoft.Collection");
		Terrasoft.each(metaData, function(itemConfig) {
			var copyItemConfig = Terrasoft.deepClone(itemConfig);
			copyItemConfig.parentSchema = parentSchema;
			var item = Ext.create(itemClassName, copyItemConfig);
			collection.add(item.uId, item);
		}, this);
		this[propertyName] = collection;
	},

	/**
	 * Loads localizable resources of schema.
	 * @protected
	 * @param {Object} localizableValues Localizable object resources.
	 */
	loadLocalizableValues: function(localizableValues) {
		if (!localizableValues) {
			return;
		}
		Terrasoft.each(["Caption", "Description"], function(serverPropertyName) {
			var clientPropertyName = Terrasoft.toLowerCamelCase(serverPropertyName);
			this[clientPropertyName] = Ext.create("Terrasoft.LocalizableString", {
				cultureValues: localizableValues[serverPropertyName]
			});
		}, this);
	},

	/**
	 * Loads schema localizable values by UIds.
	 * @protected
	 * @param {Object} localizableValues Localizable object resources.
	 */
	loadLocalizableValuesByUIds: function(localizableValues) {
		if (!localizableValues) {
			return;
		}
		Terrasoft.each(["caption", "description"], function(propertyName) {
			this[propertyName] = Ext.create("Terrasoft.LocalizableString", {
				cultureValues: localizableValues[this.uId + "." + propertyName]
			});
		}, this);
	},

	/**
	 * Returns object with localizable resources of schema.
	 * @protected
	 * @param {Object} localizableValues Object in which saves localizable resources.
	 */
	getLocalizableValues: function(localizableValues) {
		Terrasoft.each(["caption", "description"], function(propertyName) {
			localizableValues[this.uId + "." + propertyName] = this.getSerializableProperty(this[propertyName]);
		}, this);
	},

	/**
	 * Returns flag that indicates if schema new or not.
	 * @return {Boolean}
	 */
	isNew: Terrasoft.abstractFn,

	/**
	 * Returns flag that indicates if schema could be designed.
	 * @return {Boolean}
	 */
	canDesignSchema: function() {
		return true;
	}

});
