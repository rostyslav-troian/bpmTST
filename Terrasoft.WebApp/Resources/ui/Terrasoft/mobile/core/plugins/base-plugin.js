/**
 * Base plug-in class
 */
Ext.define("Terrasoft.mobile.BasePlugin", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.BasePlugin",

	inheritableStatics: {

		//region Methods: Public

		/**
		 * The method of starting the plugin.
		 * @param {Object} config Configuring the call of the plugin:
		 * @param {Function} config.success Callback function on successful execution of the method.
		 * @param {Function} config.failure Callback function when the method fails.
		 * @param {Object} config.scope The context of the callback functions.
		 */
		execute: function() {
		}

		//endregion

	}

});