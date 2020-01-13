Terrasoft.configuration.Structures["MainMenuUtilities"] = {innerHierarchyStack: ["MainMenuUtilities"]};
define("MainMenuUtilities", ["ConfigurationServiceProvider"], function() {

	/**
	 * Main menu utilities.
	 */
	Ext.define("Terrasoft.configuration.MainMenuUtilities", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.MainMenuUtilities",

		singleton: true,

		// region Methods: Private

		/**
		 * @private
		 */
		_replaceWindowLocation: function(location) {
			window.location.replace(location);
		},

		/**
		 * @private
		 */
		_logoutServiceCallback: function(response) {
			let loginUrl = Terrasoft.loaderBaseUrl + "?simpleLogin";
			if ((response && response.RedirectLocation)) {
				loginUrl =  response.RedirectLocation
			} else {
				window.logout = true;
			}
			this._replaceWindowLocation(loginUrl);
		},

		// endregion

		// region Methods: Public

		/**
		 * Perform logout with redirection to login page.
		 */
		logout: function() {
			const config = {
				serviceName: "MainMenuService",
				methodName: "Logout"
			};
			Terrasoft.ConfigurationServiceProvider.callService(config, this._logoutServiceCallback, this);
		}

		// endregion

	});

	return Terrasoft.MainMenuUtilities;
});


