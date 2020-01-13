Terrasoft.configuration.Structures["IntroPageUtilities"] = {innerHierarchyStack: ["IntroPageUtilities"]};
define("IntroPageUtilities", ["terrasoft"], function(Terrasoft) {

	/**
	 * Intro page utilities.
	 */
	Ext.define("Terrasoft.configuration.IntroPageUtilities", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.IntroPageUtilities",

		singleton: true,

		// region Methods: Public

		/**
		 * Returns the name of the main page by default.
		 * @param {String} defaultIntroPageId The Id value for the master page by default.
		 * @param {Function} callback The callback function
		 * @param {Object} scope The scope of callback function.
		 */
		getDefaultIntroPageName: function(defaultIntroPageId, callback, scope) {
			callback.call(scope, Terrasoft.configuration.defaultIntroPageName);
		}

		// endregion

	});

	return Terrasoft.IntroPageUtilities;
});


