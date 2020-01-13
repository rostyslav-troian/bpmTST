/**
 */
Ext.define("Terrasoft.manager.EntitySchemaColumn", {
	extend: "Terrasoft.core.BaseObject",
	alternateClassName: "Terrasoft.EntitySchemaColumn",

	mixins: {
		serializable: "Terrasoft.Serializable"
	},

	//region Properties: Protected

	/**
	 * List of serializable parameters.
	 * @protected
	 * @type {String[]}
	 */
	serializableProperties: ["uId", "name", "caption", "description", "dataValueType", "isInherited",
		"isOverride", "referenceSchemaUId", "isRequired", "isVirtual", "isValueCloneable", "isMultilineText",
		"isSimpleLookup", "isCascade", "status"],

	/**
	 * Column Id.
	 * @protected
	 * @type {String}
	 */
	uId: null,

	/**
	 * Columne name.
	 * @protected
	 * @type {String}
	 */
	name: null,

	/**
	 * Column header.
	 * @protected
	 * @type {Terrasoft.LocalizableString}
	 */
	caption: null,

	/**
	 * Column description.
	 * @protected
	 * @type {Terrasoft.LocalizableString}
	 */
	description: null,

	/**
	 * A flag that the column is inherited.
	 * @protected
	 * @type {Boolean}
	 */
	isInherited: false,

	/**
	 * A flag that the column is redefined.
	 * @protected
	 * @type {Boolean}
	 */
	isOverride: false,

	/**
	 * The schema identifier.
	 * @protected
	 * @type {String}
	 */
	referenceSchemaUId: null,

	/**
	 * A flag that the column is required.
	 * @protected
	 * @type {Boolean}
	 */
	isRequired: false,

	/**
	 * A flag that the column is virtual.
	 * @protected
	 * @type {Boolean}
	 */
	isVirtual: false,

	/**
	 * A flag that the value of the column can be copied.
	 * @protected
	 * @type {Boolean}
	 */
	isValueCloneable: false,

	/**
	 * A flag that the column type is a multi-line text.
	 * @protected
	 * @type {Boolean}
	 */
	isMultilineText: false,

	/**
	 * A flag that the type of column is a simple reference.
	 * @protected
	 * @type {Boolean}
	 */
	isSimpleLookup: false,

	/**
	 * A flag of a cascade connection.
	 * @protected
	 * @type {Boolean}
	 */
	isCascade: false,

	/**
	 * The status of the column.
	 * @protected
	 * @type {String}
	 */
	status: Terrasoft.ModificationStatus.NOT_MODIFIED,

	//endregion

	//region Properties: Public

	/**
	 * Column data types.
	 * @type {Terrasoft.DataValueType}
	 */
	dataValueType: null,

	/**
	 * Mode of using the column.
	 * @type {Terrasoft.EntitySchemaColumnUsageType}
	 */
	usageType: Terrasoft.EntitySchemaColumnUsageType.General,

	/**
	 * Design tool item class name.
	 * @type {String}
	 */
	designToolClassName: "Terrasoft.SchemaColumnDesignToolItem",

	//endregion

	//region Methods: Public

	/**
	 * Initializes the value of the localized property.
	 * @param {String} propertyName Property name.
	 * @param {Terrasoft.LocalizableString} value Value.
	 */
	initLocalizableStringValue: function(propertyName, value) {
		value = value || {};
		if (!Terrasoft.instanceOfClass(value, "Terrasoft.LocalizableString")) {
			value = Ext.create("Terrasoft.LocalizableString", {
				cultureValues: value
			});
		}
		this[propertyName] = value;
	},

	/**
	 * Adds an event and subscribes to it.
	 */
	constructor: function(config) {
		this.callParent(arguments);
		var caption = config && config.caption;
		this.initLocalizableStringValue("caption", caption);
		var description = config && config.description;
		this.initLocalizableStringValue("description", description);
		this.addEvents(
			"changed"
		);
	},

	/**
	 * Reads the value of the property.
	 * @param {String} propertyName Property name.
	 */
	getPropertyValue: function(propertyName) {
		return this[propertyName];
	},

	/**
	 * Sets the value of the localized property of the element.
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
		this.onColumnChanged(changes);
		this.fireEvent("changed", changes, this);
	},

	/**
	 * Sets the value of the item.
	 * @param {String} propertyName Property name.
	 * @param {Mixed} propertyValue Value.
	 */
	setPropertyValue: function(propertyName, propertyValue) {
		var property = this[propertyName];
		if (property && Terrasoft.instanceOfClass(property, "Terrasoft.LocalizableString") && propertyValue &&
			!Terrasoft.instanceOfClass(propertyValue, property.alternateClassName)) {
			throw new Terrasoft.UnsupportedTypeException({
				message: Terrasoft.Resources.Managers.Exceptions.UsingInvalidSetMethod
			});
		}
		this[propertyName] = propertyValue;
		var changes = {};
		changes[propertyName] = propertyValue;
		this.onColumnChanged(changes);
		this.fireEvent("changed", changes, this);
	},

	/**
	 * The method returns the column status.
	 * @return {String}
	 */
	getStatus: function() {
		return this.status;
	},

	/**
	 * The method sets the state of the schema.
	 * @param {Terrasoft.ModificationStatus} status Schema condition.
	 */
	setStatus: function(status) {
		this.setPropertyValue("status", status);
	},

	/**
	 * Sets the flag of adding a column
	 */
	setNew: function() {
		this.setStatus(Terrasoft.ModificationStatus.NEW);
	},

	/**
	 * Sets the column deletion flag.
	 */
	setRemoved: function() {
		this.setStatus(Terrasoft.ModificationStatus.REMOVED);
	},

	// endregion

	//region Methods: Protected

	/**
	 * Processes a column change.
	 * @protected
	 */
	onColumnChanged: function() {
		if (this.status === Terrasoft.ModificationStatus.NOT_MODIFIED) {
			this.status = Terrasoft.ModificationStatus.UPDATED;
		}
	},

	/**
	 * Copies the properties for serialization to the serialized object. Implements the mixin interface.
	 * {@link Terrasoft.Serializable}
	 * @protected
	 * @override
	 * @param {Object} serializableObject Serialized object.
	 */
	getSerializableObject: function(serializableObject) {
		Terrasoft.each(this, function(value, name) {
			if (!Ext.isEmpty(value) && !Ext.isFunction(value) &&
				Ext.Array.contains(this.serializableProperties, name)) {
				serializableObject[name] = this.getSerializableProperty(value);
			}
		}, this);
	}

	// endregion
});