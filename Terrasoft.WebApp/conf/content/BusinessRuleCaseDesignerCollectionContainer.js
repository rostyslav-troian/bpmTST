Terrasoft.configuration.Structures["BusinessRuleCaseDesignerCollectionContainer"] = {innerHierarchyStack: ["BusinessRuleCaseDesignerCollectionContainer"]};
define("BusinessRuleCaseDesignerCollectionContainer", ["BusinessRuleCaseDesignerCollectionContainerResources",
	"BusinessRuleCaseDesignerContainer", "BusinessRuleConditionGroupDesignerContainer",
	"BusinessRuleActionDesignerCollectionContainer"], function(resources) {

		/**
		 * @class Terrasoft.controls.BusinessRuleCaseDesignerCollectionContainer
		 */
		Ext.define("Terrasoft.controls.BusinessRuleCaseDesignerCollectionContainer", {
			alternateClassName: "Terrasoft.BusinessRuleCaseDesignerCollectionContainer",
			extend: "Terrasoft.ReorderableContainer",

			//region: Properties: Protected

			/**
			 * @inheritdoc Terrasoft.core.mixins.ReorderableContainer#itemClassName
			 * @overridden
			 */
			itemClassName: "Terrasoft.BusinessRuleCaseDesignerContainer",

			//endregion

			//region Methods: Private

			/**
			 * Returns condition group config.
			 * @private
			 * @return {Object} Condition group config.
			 */
			getConditionGroup: function() {
				return {
					"className": "Terrasoft.BusinessRuleConditionGroupDesignerContainer",
					"items": {"bindTo": "Items"},
					"operationType": {"bindTo": "OperationType"},
					"visible": {"bindTo": "Visible"},
					"itemActions": [{
						"className": "Terrasoft.Button",
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"tag": "remove",
						"classes": {"wrapperClass": ["case-condition-remove-button"]},
						"imageConfig": resources.localizableImages.RemoveConditionIcon
					}],
					"itemActionClick": {"bindTo": "onItemActionClick"},
					"bindingContext": "ConditionGroup"
				};
			},

			/**
			 * Returns actions config.
			 * @private
			 * @return {Object} Actions config.
			 */
			getActions: function() {
				return {
					"className": "Terrasoft.BusinessRuleActionDesignerCollectionContainer",
					"viewModelItems": {"bindTo": "ActionCollection"}
				};
			},

			/**
			 * Returns add condition button config.
			 * @private
			 * @return {Object} Add condition button config.
			 */
			getAddConditionButton: function() {
				return {
					"className": "Terrasoft.Button",
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"caption": {"bindTo": "AddConditionButtonCaption"},
					"imageConfig": {"bindTo": "getConditionIcon"},
					"iconAlign": Terrasoft.controls.ButtonEnums.iconAlign.RIGHT,
					"click": {"bindTo": "addCondition"},
					"markerValue": "AddCondition",
					"enabled": {"bindTo": "CanAddCondition"}
				};
			},

			/**
			 * Returns add action button config.
			 * @private
			 * @return {Object} Add action button config.
			 */
			getAddActionButton: function() {
				return {
					"className": "Terrasoft.Button",
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"caption": {"bindTo": "AddActionButtonCaption"},
					"imageConfig": {"bindTo": "getActionIcon"},
					"iconAlign": Terrasoft.controls.ButtonEnums.iconAlign.RIGHT,
					"canUseRightAlignImageWithMenu": true,
					"menu": {"items": {"bindTo": "ActionMenuItems"}},
					"markerValue": "AddAction",
					"enabled": {"bindTo": "CanAddAction"}
				};
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.core.mixins.Reorderable#getItemConfig
			 * @overridden
			 */
			getItemConfig: function(itemViewModel) {
				var config = this.callParent(arguments);
				return Ext.apply(config, {
					"id": itemViewModel.get("Id"),
					"conditionGroup": this.getConditionGroup(),
					"actions": this.getActions(),
					"addConditionButton": this.getAddConditionButton(),
					"addActionButton": this.getAddActionButton()
				});
			}

			//endregion

		});
	});


