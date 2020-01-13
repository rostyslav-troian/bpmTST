Terrasoft.configuration.Structures["CheckModuleDestroyMixin"] = {innerHierarchyStack: ["CheckModuleDestroyMixin"]};
/**
 * @class Terrasoft.configuration.CheckModuleDestroyMixin
 * Mixin checking the possibility destroy module and displays confirm message if necessary.
 */
define("CheckModuleDestroyMixin", ["CheckModuleDestroyMixinResources"], function (resources) {
	Ext.define("Terrasoft.configuration.CheckModuleDestroyMixin", {
		alternateClassName: "Terrasoft.CheckModuleDestroyMixin",
		extend: "Terrasoft.BaseObject",

		/**
		 * @private
		 * @type {Boolean|null}
		 */
		_canBeDestroyedCache: null,

		/**
		 * Result object of a survey of all the modules and their possible destroyed.
		 * @private
		 * @type {Object}
		 * @param {Boolean} canBeDestroyedConfig.canBeDestroyed Can be removed.
		 * @param {Object} canBeDestroyedConfig.errorInfo Error message info.
		 */
		canBeDestroyedConfig: null,

		/**
		 * @private
		 */
		_clearCanBeDestroyedCacheOnNextTic: function() {
			Terrasoft.defer(function () {
				if (this.Ext.isBoolean(this._canBeDestroyedCache)) {
					this._canBeDestroyedCache = null;
				}
			}, this);
		},

		/**
		 * Showing confirm window if data on the page may be lost.
		 * @param {Object} resumeConfig
		 * @param {Function} resumeConfig.method Resume function.
		 * @param {Array} resumeConfig.args Resume function arguments.
		 * @param {Object} resumeConfig.scope Resume function scope.
		 * @return {Boolean} True if allowed to continue execute check method.
		 */
		canBeDestroyed: function(resumeConfig) {
			const canBeDestroyed = this._canBeDestroyedCache;
			if (this.Ext.isBoolean(canBeDestroyed)) {
				return canBeDestroyed;
			}
			this.updateCanBeDestroyedConfig();
			if (this.canBeDestroyedConfig.canBeDestroyed) {
				return true;
			}
			this.showCanBeDestroyed(resumeConfig);
			return false;
		},

		/**
		 * Update information about the possibility of removing the pages contexts.
		 * Publish system message of the need to destroy the open pages in the chain.
		 * @protected
		 */
		updateCanBeDestroyedConfig: function() {
			const cacheKey = this.Ext.String.format("{0}-cache", this.sandbox.id);
			this.Terrasoft.ClientPageSessionCache.setItem(cacheKey, {canBeDestroyed: true});
			this.sandbox.publish("CanBeDestroyed", cacheKey);
			this.canBeDestroyedConfig = this.Terrasoft.ClientPageSessionCache.getItem(cacheKey);
		},

		/**
		 * Showing can be destroyed message in Terrasoft confirm window.
		 * @protected
		 * @param {Object} resumeConfig
		 * @param {Function} resumeConfig.method Resume function.
		 * @param {Array} resumeConfig.args Resume function arguments.
		 * @param {Object} resumeConfig.scope Resume function scope.
		 */
		showCanBeDestroyed: function(resumeConfig) {
			const message = this.getDestroyedMessage();
			this.Terrasoft.showConfirmation(message, function(returnCode) {
				const canBeDestroyed = returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode;
				this._canBeDestroyedCache = canBeDestroyed;
				this._clearCanBeDestroyedCacheOnNextTic();
				if (canBeDestroyed) {
					this.sandbox.publish("BeforeDestroying");
					this.Ext.callback(resumeConfig.method, resumeConfig.scope || this, resumeConfig.args);
				}
			}, ["yes", "no"], this);
		},

		/**
		 * Returns can be destroy message.
		 * @protected
		 * @return {String} Can be destroy message.
		 */
		getDestroyedMessage: function() {
			const config = this.canBeDestroyedConfig;
			const moduleCanNotBeRemoved = resources.localizableStrings.ModuleCanNotBeRemoved;
			const errorInfo = config && config.errorInfo;
			return errorInfo && errorInfo.message ? errorInfo.message : moduleCanNotBeRemoved;
		}
	});
});


