/**
 * Plugin for getting information about the mobile application
 */
Ext.define("Terrasoft.mobile.ApplicationInfoPlugin", {
	extend: "Terrasoft.BaseBrowserPlugin",
	alternateClassName: "Terrasoft.ApplicationInfoPlugin",

	statics: {
		/**
		 * Method for obtaining the version of the application.
		 * @param {Object} config The configuration of obtaining the version of the application:
		 * @param {Function} config.success Callback function on successful execution of the method.
		 * @param {Function} config.failure Callback function when the method fails.
		 * @param {Object} config.scope The context of the callback functions.
		 */
		getVersion: function(config) {
			Ext.callback(config.success, config.scope, ["7.5"]);
		}
	}

});