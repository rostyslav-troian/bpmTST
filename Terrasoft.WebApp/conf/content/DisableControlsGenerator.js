Terrasoft.configuration.Structures["DisableControlsGenerator"] = {innerHierarchyStack: ["DisableControlsGenerator"]};
define("DisableControlsGenerator", ["ViewGeneratorV2"], function() {
	/**
	 * @class Terrasoft.configuration.DisableControlsGenerator
	 * Generator class for disable or enable schema model items. Provides additional binding for generating controls.
	 */
	Ext.define("Terrasoft.configuration.DisableControlsGenerator", {
		extend: "Terrasoft.ViewGenerator",
		alternateClassName: "Terrasoft.DisableControlsGenerator",

		/**
		 * The name of bind method to get model item enabled attribute value.
		 * @private
		 * @type {String}
		 */
		_defaultIsModelItemEnabledMethodName: "isModelItemEnabled",

		/**
		 * Determines, if generator should skip enabled attribute binding.
		 * @private
		 * @param {Object} config - control config.
		 * @returns {Boolean} Check that should skip binding.
		 */
		_shouldSkipBinding: function(config) {
			var viewModelClass = this.getViewModel();
			if (!viewModelClass[this._defaultIsModelItemEnabledMethodName]) {
				return true;
			}
			var enabled = config.enabled;
			var controlConfig = config.controlConfig;
			var isAlreadyDisabled = enabled === false ||
				(controlConfig && controlConfig.enabled === false);
			var alreadyHasBinding =  enabled && enabled.bindTo ||
				(controlConfig && controlConfig.enabled && controlConfig.enabled.bindTo);
			return isAlreadyDisabled || alreadyHasBinding;
		},

		/**
		 * Binds to enabled attribute.
		 * @param {Object} config Control config.
		 * @private
		 */
		_bindToEnabled: function(config) {
			Ext.merge(config, {
				enabled: {
					bindTo: this._defaultIsModelItemEnabledMethodName
				}
			});
		},

		/**
		 * Binds to control config enabled attribute.
		 * @param {Object} config Control config.
		 * @private
		 */
		_bindToControlConfigEnabled: function(config) {
			Ext.merge(config, {
				controlConfig: {
					enabled: {
						bindTo: this._defaultIsModelItemEnabledMethodName
					}
				}
			});
		},

		/**
		 * Sets item enabled binding.
		 * @private
		 * @param {Object} config Item config.
		 */
		_setItemEnabled: function(config) {
			if (this._shouldSkipBinding(config)) {
				return;
			}
			if (config.controlConfig) {
				this._bindToControlConfigEnabled(config);
			}
			this._bindToEnabled(config);
		},

		/**
		 * @inheritdoc Terrasoft.ViewGenerator#generateModelItem
		 * @override
		 */
		generateModelItem: function(config) {
			if (Terrasoft.Features.getIsEnabled("CompleteCardLockout")) {
				config.tag = config.tag || this.getItemBindTo(config);
				this._setItemEnabled(config);
			}
			var generateModelItem = this.callParent(arguments);
			return generateModelItem;
		}
	});

	return Ext.create("Terrasoft.DisableControlsGenerator");
});


