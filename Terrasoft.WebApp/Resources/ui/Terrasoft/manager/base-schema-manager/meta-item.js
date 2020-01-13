/**
 * @abstract
 */
Ext.define("Terrasoft.manager.MetaItem", {
	extend: "Terrasoft.core.BaseObject",
	alternateClassName: "Terrasoft.MetaItem",

	statics: {

		/**
		 * Validates meta item name.
 		 * @param {String} name Name to validate.
		 * @returns {Object} Validation config.
		 */
		nameValidator: function(name) {
			var result = { isValid: true };
			var reqExp = /^[a-zA-Z]{1}[a-zA-Z0-9_]*$/;
			if (!reqExp.test(name)) {
				result.isValid = false;
				result.invalidMessage = Terrasoft.Resources.MetaItem.WrongNameMessage;
			}
			return result;
		}

	},

	mixins: {
		serializable: "Terrasoft.Serializable"
	},

	// region Properties: Protected

	/**
	 * Serializable properties list.
	 * @protected
	 * @type {String[]}
	 */
	serializableProperties: ["uId", "realUId", "name", "createdInSchemaUId",
		"modifiedInSchemaUId", "createdInPackageId"],

	// endregion

	// region Properties: Public

	/**
	 * Schema identifier.
	 * @type {String}
	 */
	uId: null,

	/**
	 * Schema name.
	 * @type {String}
	 */
	name: null,

	/**
	 * Real schema identifier.
	 * @type {String}
	 */
	realUId: null,

	/**
	 * Created in schema identifier.
	 * @type {String}
	 */
	createdInSchemaUId: null,

	/**
	 * Modified in schema identifier.
	 * @type {String}
	 */
	modifiedInSchemaUId: null,

	/**
	 * Created in package identifier.
	 * @type {String}
	 */
	createdInPackageId: null,

	// endregion

	// region Constructors: Protected

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function(config) {
		this.checkNullOrEmptyArguments(config);
		this.callParent(arguments);
	},

	// endregion

	// region Methods: Private

	/**
	 * Checks object for null or empty arguments.
	 * @private
	 * @param {Object} config Object that is checking.
	 */
	checkNullOrEmptyArguments: function(config) {
		var requiredAttributes = this.getRequiredAttributes();
		var items = [];
		Terrasoft.each(requiredAttributes, function(item) {
			if (!Ext.isObject(config) || config[item] === undefined || config[item] === null) {
				items.push(item);
			}
		}, this);
		var message = "argumentNames: " + items.join(", ");
		if (!Ext.isEmpty(items)) {
			throw new Terrasoft.ArgumentNullOrEmptyException({
				message: message
			});
		}
	},

	// endregion

	// region Methods: Protected

	/**
	 * Copies the properties to serialize an object to be serialized. Implements interface of mixin.
	 * {@link Terrasoft.Serializable}
	 * @protected
	 * @param {Object} serializableObject Serialized object.
	 */
	getSerializableObject: function(serializableObject) {
		var serializableProperties = this.getSerializableProperties();
		serializableProperties.forEach(function(propertyName) {
			this.setSerializableProperty(serializableObject, propertyName);
		}, this);
	},

	/**
	 * Returns list of serializable properties.
	 * @protected
	 * @return {String[]}
	 */
	getSerializableProperties: function() {
		return Terrasoft.deepClone(this.serializableProperties);
	},

	/**
	 * Sets serializableObject property with collection items.
	 * @protected
	 * @param {Object} serializableObject Serializable object.
	 * @param {String} propertyName Property name.
	 */
	setSerializableCollectionProperty: function(serializableObject, propertyName) {
		var collection = this[propertyName];
		serializableObject[propertyName] = this.getSerializableProperty(collection.getItems());
	},

	/**
	 * Returns ordered properties.
	 * @protected
	 * @param {Array} Properties Array of meta item properties.
	 * @return {Object} Ordered array of meta item properties.
	 */
	getRestoreOrder: function (properties) {
		return properties;
	},

	// endregion

	// region Methods: Public

	/**
	 * Returns property value.
	 * @param {String} propertyName Property name.
	 */
	getPropertyValue: function(propertyName) {
		return this[propertyName];
	},

	/**
	 * Sets property value.
	 * @param {String} propertyName Property name.
	 * @param {Object} propertyValue Property value.
	 * @param {Object} (options) Options.
	 * @param {Boolean} (options.silent=true) Optional flag that indicates when to fire 'changed' event.
	 */
	setPropertyValue: function(propertyName, propertyValue, options) {
		var silent = options && options.silent;
		var oldPropertyValue = this[propertyName];
		if (oldPropertyValue && Terrasoft.instanceOfClass(oldPropertyValue, "Terrasoft.LocalizableString") &&
			propertyValue && !Terrasoft.instanceOfClass(propertyValue, oldPropertyValue.alternateClassName)) {
			throw new Terrasoft.UnsupportedTypeException({
				message: Terrasoft.Resources.Managers.Exceptions.UsingInvalidSetMethod
			});
		}
		if (!Terrasoft.isEqual(oldPropertyValue, propertyValue)) {
			this[propertyName] = propertyValue;
			if (!silent) {
				var changes = {};
				changes[propertyName] = propertyValue;
				this.fireEvent("changed", changes, this);
			}
		}
	},

	/**
	 * Initializes localizable string values.
	 * @param {String} propertyName Property name.
	 * @param {Terrasoft.LocalizableString} value Property value.
	 */
	initLocalizableStringValue: function(propertyName, value) {
		value = value || {};
		if (!Terrasoft.isInstanceOfClass(value, "Terrasoft.LocalizableString")) {
			value = Ext.create("Terrasoft.LocalizableString", {
				cultureValues: value
			});
		}
		this[propertyName] = value;
	},

	/**
	 * Returns required attributes for creating an instance of a class.
	 * @protected
	 * @returns {Array}
	 */
	getRequiredAttributes: function() {
		return [];
	},

	/**
	 * Saves serialized state of object.
	 */
	saveState: function () {
		this._state = this.serialize();
	},

	/**
	 * Performs restore of value depends on type.
	 * @param propertyName {String}
	 * @param propertyValue {Object}
	 */
	restorePropertyValue: function (propertyName, propertyValue) {
		if (this.getPropertyValue(propertyName) instanceof Terrasoft.MetaItem) {
			this.getPropertyValue(propertyName).restoreState(propertyValue);
		} else if (this.getPropertyValue(propertyName) instanceof Terrasoft.LocalizableString) {
			Terrasoft.each(propertyValue, function(localizableValue, culture) {
				this.setLocalizableStringPropertyValue(propertyName, localizableValue, culture);
			}, this);
		} else {
			this.setPropertyValue(propertyName, propertyValue);
		}
	},

	/**
	 * Restores state of object.
	 * @param {Object} [stateObj]
	 */
	restoreState: function (stateObj) {
		if (!stateObj) {
			if (!this._state) {
				return;
			}
			stateObj = JSON.parse(this._state);
		}
		var properties = this.getRestoreOrder(_.keys(stateObj));
		properties.map(function(propertyName) {
			this.restorePropertyValue(propertyName, stateObj[propertyName]);
		}.bind(this));
	},

	/**
	 * Sets item uId.
	 * @param {String} name Name.
	 */
	setUId: function(name) {
		this.setPropertyValue("uId", name);
	},

	/**
	 * Returns item uId.
	 * @return {String}.
	 */
	getUId: function() {
		return this.uId;
	},

	/**
	 * Sets item name.
	 * @param {String} name Name.
	 */
	setName: function(name) {
		this.setPropertyValue("name", name);
	},

	/**
	 * Returns item name.
	 * @return {String}.
	 */
	getName: function() {
		return this.name;
	}

	// endregion

});
