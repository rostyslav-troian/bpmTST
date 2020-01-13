/**
 * Base Browser Plug-in Class
 */
Ext.define("Terrasoft.mobile.BaseBrowserPlugin", {
	extend: "Terrasoft.mobile.BasePlugin",
	alternateClassName: "Terrasoft.BaseBrowserPlugin",

	inheritableStatics: {

		//region Methods: Public

		/**
		 * @inheritdoc
		 */
		execute: function(config) {
			Ext.callback(config.success, config.scope);
		}

		//endregion

	}

});