/**
 * Class for plugin Manager
 */
Ext.define("Terrasoft.mobile.PluginExecutionManager", {
	extend: "Terrasoft.BaseObject",
	singleton: true,
	alternateClassName: "Terrasoft.PluginExecutionManager",

	//region Properties: Private

	/**
	 * Callback function id counter from the native plugin.
	 * @type {Number}
	 */
	callbackId: 0,

	/**
	 * List of callback functions from the native plugin
	 * @type {Object}
	 */
	callbacks: {},

	//endregion

	//region Methods: Public

	/**
	 * Calls the native plugin.
	 * @param {Object} config Plugin call configuration
	 */
	execute: function(config) {
		var args = config.args || {};
		var callbackId = this.callbackId++;
		if (config.success || config.failure) {
			this.callbacks[callbackId] = {success: config.success, failure: config.failure, scope: config.scope};
		}
		location.href = Ext.String.format("hybrid:?&plugin={0}&action={1}&args={2}&callbackId={3}", config.plugin,
			config.action, JSON.stringify(args), callbackId);
	},

	//endregion

	//region Methods: Private

	/**
	 * Processes a successful result of plug-in executing
	 * @param {String} callbackId The identifier of the callback function from the native plugin
	 * @param {Object} data Data returned from the native plugin
	 */
	callbackSuccess: function(callbackId, data) {
		var callback = this.callbacks[callbackId];
		Ext.callback(callback.success, callback.scope, [data.result]);
		delete this.callbacks[callbackId];
	},

	/**
	 * Handles the unsuccessful result of the plugin
	 * @param {String} callbackId The identifier of the callback function from the native plugin
	 * @param {Object} data Data returned from the native plugin
	 */
	callbackFailure: function(callbackId, data) {
		var callback = this.callbacks[callbackId];
		Ext.callback(callback.failure, callback.scope, [data.status, data.result]);
		delete this.callbacks[callbackId];
	}

	//endregion

});