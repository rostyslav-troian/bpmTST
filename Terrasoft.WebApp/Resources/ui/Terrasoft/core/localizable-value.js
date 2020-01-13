/**
 */
Ext.define("Terrasoft.core.LocalizableValue", {
	extend: "Terrasoft.core.BaseObject",
	alternateClassName: "Terrasoft.LocalizableValue",

	//region Properties: Protected

	/**
	 * Object of localized values.
	 * @protected
	 * @type {Object}
	 */
	cultureValues: null,

	// endregion

	//region Methods: Protected

	/**
	 * Returns value of user culture or primary culture value.
	 * @private
	 * @param {String} culture Culture name.
	 * @return {String} Value.
	 */
	getCultureValue: function(culture) {
		if (this.cultureValues) {
			return this.cultureValues.hasOwnProperty(culture)
				? this.cultureValues[culture]
				: this.cultureValues[Terrasoft.SysValue.PRIMARY_CULTURE.displayValue];
		}
		return null;
	},

	//endregion

	//region Methods: Public

	/**
	 * Returns value for culture.
	 * @return {Object} Value.
	 */
	getValue: function() {
		var cultureValue = Terrasoft.SysValue.CURRENT_USER_CULTURE.displayValue;
		return this.getCultureValue(cultureValue);
	},

	/**
	 * Gets a flag indicating whether the current object has not empty value in user culture
	 * @return {Boolean}
	 */
	hasValue: function() {
		return !Ext.isEmpty(this.getValue());
	},

	/**
	 * Sets the value for culture.
	 * @param {String} culture Culture.
	 * @param {Object} value Value.
	 */
	setCultureValue: function(culture, value) {
		this.cultureValues[culture] = value;
	},

	/**
	 * Sets value for current user culture.
	 * Clear primary culture value if value empty and current culture is not the same as primary culture.
	 * @param {Object} value Value.
	 */
	setValue: function(value) {
		var currentCulture = Terrasoft.SysValue.CURRENT_USER_CULTURE.displayValue;
		var primaryCulture = Terrasoft.SysValue.PRIMARY_CULTURE.displayValue;
		this.setCultureValue(currentCulture, value);
		if (Ext.isEmpty(value) && currentCulture !== primaryCulture) {
			this.setCultureValue(primaryCulture, value);
		}
	},

	/**
	 * Clones the current object of a localized value.
	 * @return {Terrasoft.core.LocalizableValue}
	 */
	clone: function() {
		return Ext.create(this.$className, {
			cultureValues: Terrasoft.deepClone(this.cultureValues)
		});
	},

	/**
	 * Merge the current localized value with given vale.
	 * @param {Terrasoft.LocalizableValue} localizableValue Given value.
	 */
	merge: function(localizableValue) {
		var cultureValues = this.cultureValues;
		Terrasoft.each(localizableValue.cultureValues, function(cultureValue, cultureName) {
			cultureValues[cultureName] = cultureValues[cultureName] || cultureValue;
		}, this);
	},

	/**
	 * Clears culture Values.
	 */
	clear: function() {
		this.cultureValues = {};
	}

	// endregion

});
