/**
 * Class of localizable strings.
 */
Ext.define("Terrasoft.core.LocalizableString", {
	extend: "Terrasoft.core.LocalizableValue",
	alternateClassName: "Terrasoft.LocalizableString",

	mixins: {
		serializable: "Terrasoft.Serializable"
	},

	//region Methods: Protected

	/**
	 * Copies the properties to serialize an object to be serialized. Implements interface of mixin.
	 * {@link Terrasoft.Serializable}
	 * @protected
	 * @override
	 * @param {Object} serializableObject Serialized object.
	 */
	getSerializableObject: function(serializableObject) {
		Terrasoft.each(this.cultureValues, function(value, culture) {
			serializableObject[culture] = value;
		}, this);
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 * @param {Object|String} config Init config or string value for current culture.
	 */
	constructor: function(config) {
		if (config || config === "") {
			var cultureValue;
			if (Ext.isObject(config)) {
				cultureValue = config.cultureValues;
			} else {
				cultureValue = config;
				config = {};
			}
			if (Ext.isString(cultureValue)) {
				var cultureValues = config.cultureValues = {};
				var userCulture = Terrasoft.SysValue.CURRENT_USER_CULTURE.displayValue;
				cultureValues[userCulture] = cultureValue;
			}
		}
		this.cultureValues = {};
		this.callParent(arguments);
	},

	/**
	 * Returns string value. For work with LocalizableString like a regular String.
	 * @return {String}
	 */
	toString: function() {
		return this.getValue() || "";
	}

	// endregion

});
