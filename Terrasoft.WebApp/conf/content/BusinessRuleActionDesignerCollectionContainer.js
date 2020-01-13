Terrasoft.configuration.Structures["BusinessRuleActionDesignerCollectionContainer"] = {innerHierarchyStack: ["BusinessRuleActionDesignerCollectionContainer"]};
define("BusinessRuleActionDesignerCollectionContainer", ["BusinessRuleActionDesignerContainer",
		"BusinessRuleFilterActionDesignerContainer"], function() {

		/**
		 * @class Terrasoft.controls.BusinessRuleActionDesignerCollectionContainer
		 */
		Ext.define("Terrasoft.controls.BusinessRuleActionDesignerCollectionContainer", {
			extend: "Terrasoft.ReorderableContainer",
			alternateClassName: "Terrasoft.BusinessRuleActionDesignerCollectionContainer",

			/**
			 * Title block items.
			 * @type {Array}
			 */
			titleItems: [],

			/**
			 * @inheritdoc Terrasoft.core.mixins.ReorderableContainer#itemClassName
			 * @overridden
			 */
			itemClassName: "Terrasoft.BusinessRuleActionDesignerContainer",

			/**
			 * @inheritdoc Terrasoft.core.mixins.Reorderable#getItemConfig
			 * @overridden
			 */
			getItemConfig: function(itemViewModel) {
				var config = this.callParent(arguments);
				Ext.apply(config, {
					"id": itemViewModel.get("Id")
				});
				itemViewModel.enrichViewConfig(config);
				return config;
			}
		});
	});


