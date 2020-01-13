Terrasoft.configuration.Structures["ContentSectionItemViewModel"] = {innerHierarchyStack: ["ContentSectionItemViewModel"]};
/**
 * View model for content section item in container list.
 */
define("ContentSectionItemViewModel", ["ContentSectionItemViewModelResources",
		"BaseContentStructureItemViewModel"],
	function(resources) {
		/**
		 * @class Terrasoft.configuration.ContentSectionItemViewModel
		 */
		Ext.define("Terrasoft.configuration.ContentSectionItemViewModel", {
			extend: "Terrasoft.BaseContentStructureItemViewModel",
			alternateClassName: "Terrasoft.ContentSectionItemViewModel",
			/**
			 * @inheritdoc BaseContentStructureItemViewModel#markerValuePrefix
			 * @override
			 */
			markerValuePrefix: "section-item",
			/**
			 * @inheritdoc BaseContentStructureItemViewModel#markerValuePostfix
			 * @override
			 */
			markerValuePostfix: "section-item-container",

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#constructor
			 * @override
			 */
			constructor: function() {
				this.callParent(arguments);
				this.initResourcesValues(resources);
			},

			/**
			 * @inheritdoc BaseContentStructureItemViewModel#setCaption
			 * @override
			 */
			setCaption: function(index) {
				var title = resources.localizableStrings.BaseStructureItemTitle;
				this.callParent([index, title]);
			}

			// #endregion

		});
	}
);


