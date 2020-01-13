Terrasoft.configuration.Structures["AnalyticsManagerItem"] = {innerHierarchyStack: ["AnalyticsManagerItem"]};
define("AnalyticsManagerItem", ["SspPageDetailsManagerItemResources", "GoogleTagManagerMixin"], function() {

	/**
	 * @class Terrasoft.AnalyticsManagerItem
	 */

	Ext.define("Terrasoft.AnalyticsManagerItem", {
		extend: "Terrasoft.ObjectManagerItem",
		alternateClassName: "Terrasoft.AnalyticsManagerItem",

		// region Methods: Protected

		/**
		 * Gets modified item name.
		 * @abstract
		 * @return {String} Modified item name.
		 */
		getModifiedString: Terrasoft.abstractFn

		// endregion

	});

	return Terrasoft.SspPageDetailsManagerItem;
});


