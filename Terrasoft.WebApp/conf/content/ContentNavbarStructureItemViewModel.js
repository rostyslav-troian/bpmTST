Terrasoft.configuration.Structures["ContentNavbarStructureItemViewModel"] = {innerHierarchyStack: ["ContentNavbarStructureItemViewModel"]};
define("ContentNavbarStructureItemViewModel", ["ContentNavbarStructureItemViewModelResources",
		"BaseContentStructureItemViewModel"],
	function(resources) {
		/**
		 * @class Terrasoft.configuration.ContentNavbarStructureItemViewModel
		 */
		Ext.define("Terrasoft.configuration.ContentNavbarStructureItemViewModel", {
			extend: "Terrasoft.BaseContentStructureItemViewModel",
			alternateClassName: "Terrasoft.ContentNavbarStructureItemViewModel",
			/**
			 * @inheritdoc BaseContentStructureItemViewModel#markerValuePrefix
			 * @override
			 */
			markerValuePrefix: "link-item",
			/**
			 * @inheritdoc BaseContentStructureItemViewModel#markerValuePostfix
			 * @override
			 */
			markerValuePostfix: "link-item-container",
			/**
			 * @inheritdoc BaseContentStructureItemViewModel#itemType
			 * @override
			 */
			itemType: "navbarlink",
			/**
			 * @inheritdoc BaseContentStructureItemViewModel#wrapClassNames
			 * @override
			 */
			wrapClassNames: {
				container: "navbar-link-item-container",
				item: "navbar-link-item",
				caption: "navbar-link-caption"
			},

			/**
			 * @inheritDoc Terrasoft.BaseViewModel#constructor
			 * @override
			 */
			constructor: function() {
				this.callParent(arguments);
				this.initResourcesValues(resources);
			},

			/**
			 * @inheritDoc BaseContentStructureItemViewModel#setCaption
			 * @override
			 */
			setCaption: function(index) {
				var title = resources.localizableStrings.BaseStructureItemTitle;
				this.callParent([index, title]);
			}

		});
	}
);


