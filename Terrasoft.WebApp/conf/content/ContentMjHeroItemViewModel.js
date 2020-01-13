Terrasoft.configuration.Structures["ContentMjHeroItemViewModel"] = {innerHierarchyStack: ["ContentMjHeroItemViewModel"]};
/**
 * View model for content mjml hero item in container list.
 */
define("ContentMjHeroItemViewModel", ["ContentMjHeroItemViewModelResources",
		"BaseContentStructureItemViewModel"],
	function(resources) {
		/**
		 * @class Terrasoft.configuration.ContentMjHeroItemViewModel
		 */
		Ext.define("Terrasoft.configuration.ContentMjHeroItemViewModel", {
			extend: "Terrasoft.BaseContentStructureItemViewModel",
			alternateClassName: "Terrasoft.ContentMjHeroItemViewModel",
			/**
			 * @inheritdoc BaseContentStructureItemViewModel#markerValuePrefix
			 * @override
			 */
			markerValuePrefix: "mjhero-item",
			/**
			 * @inheritdoc BaseContentStructureItemViewModel#markerValuePostfix
			 * @override
			 */
			markerValuePostfix: "mjhero-item-container",

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

		});
	}
);


