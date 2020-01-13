Terrasoft.configuration.Structures["PortalMessagePublisherExtensions"] = {innerHierarchyStack: ["PortalMessagePublisherExtensions"]};
define("PortalMessagePublisherExtensions", [], function() {
	/**
	 * @class Terrasoft.configuration.mixins.PortalMessagePublisherExtensions
	 * Mixin, that extends tabs and publishers configs.
	 */
	Ext.define("Terrasoft.configuration.mixins.PortalMessagePublisherExtensions", {
		alternateClassName: "Terrasoft.PortalMessagePublisherExtensions",

		/**
		 * Extends tabs config with Portal tab.
		 * @public
		 * @param {Object} config Tabs config.
		 * @return {Object} Extended tabs config.
		 */
		extendTabsConfig: function(config) {
			var tabImage = this.get("Resources.Images.PortalMessageTabImage");
			config.PortalMessageTab = {
				"ImageSrc": this.Terrasoft.ImageUrlBuilder.getUrl(tabImage),
				"MarkerValue": "portal-message-tab",
				"Align": this.Terrasoft.Align.RIGHT,
				"Tag": "Portal"
			};
			return config;
		},

		/**
		 * Extends publishers collection with Portal publisher.
		 * @public
		 * @param {Array} publishers Publishers collection.
		 * @return {Array} Extended publishers collection.
		 */
		extendSectionPublishers: function(publishers) {
			publishers.push("Portal");
			return publishers;
		}
	});
});


