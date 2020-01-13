/**
 * Base Native Plug-in Class
 */
Ext.define("Terrasoft.mobile.BaseNativePlugin", {
	extend: "Terrasoft.mobile.BasePlugin",
	alternateClassName: "Terrasoft.BaseNativePlugin",

	inheritableStatics: {

		//region Methods: Protected

		/**
		 * The method of starting the plugin.
		 * @param {Object} config Configuring the call of the plugin:
		 * @param {String} config.plugin The name of the plugin.
		 * @param {String} config.action The name of the action\operation to be performed.
		 * @param {Object} config.args A configuration description of the additional parameters.
		 * @param {Function} config.success Callback function on successful execution of the method.
		 * @param {Function} config.failure Callback function when the method fails.
		 * @param {Object} config.scope The context of the callback functions.
		 * @protected
		 */
		executeInternal: function(config) {
			Terrasoft.PluginExecutionManager.execute(config);
		}

		//endregion

	}

});