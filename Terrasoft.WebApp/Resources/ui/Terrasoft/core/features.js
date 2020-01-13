Ext.ns("Terrasoft.core");

/**
 * Features class.
 * @alias Terrasoft.Features
 */
Ext.define("Terrasoft.core.Features", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.Features",
	singleton: true,

	/**
	 * Preloaded features list.
	 * @private
	 * @type {Object}
	 */
	cachedFeatures: null,

	/**
	 * Initializes object for work with features.
	 */
	constructor: function() {
		this.callParent(arguments);
		this.cachedFeatures = {};
		Ext.apply(this.cachedFeatures, Terrasoft.preLoadedFeatures);
	},

	/**
	 * Returns feature enabled state.
	 * @param {String} code Feature code.
	 * @return {Boolean} Is feature enabled.
	 */
	getIsEnabled: function(code) {
		var feature = this.cachedFeatures[code];
		if (feature) {
			return feature.state === Terrasoft.FeatureState.ENABLED;
		}
		return false;
	},

	/**
	 * Returns feature disabled state.
	 * @param {String} code Feature code.
	 * @return {Boolean} True if feature is disabled.
	 */
	getIsDisabled: function(code) {
		return !this.getIsEnabled(code);
	}
});
