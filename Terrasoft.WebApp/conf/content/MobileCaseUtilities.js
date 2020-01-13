Terrasoft.configuration.Structures["MobileCaseUtilities"] = {innerHierarchyStack: ["MobileCaseUtilities"]};
/**
 * @class Terrasoft.configuration.CaseUtilities
 */
Ext.define("Terrasoft.configuration.CaseUtilities", {
	alternateClassName: "Terrasoft.CaseUtilities",
	singleton: true,

	/**
	 * Checks if action should be displayed in pages.
	 * @param {Object} action Action config.
	 * @return {Boolean} True, if action should be displayed.
	 */
	isActionVisible: function(action) {
		if (action.name === "OpenPortalMessagePublisherPageAction" && !Terrasoft.ApplicationUtils.isOnlineMode()) {
			return false;
		}
		return true;
	}

});


