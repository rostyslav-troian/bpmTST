Terrasoft.configuration.Structures["BusinessRuleFilterActionDesignerContainer"] = {innerHierarchyStack: ["BusinessRuleFilterActionDesignerContainer"]};
define("BusinessRuleFilterActionDesignerContainer", ["BusinessRuleActionDesignerContainer",
	"css!BusinessRuleFilterActionDesignerContainer"], function() {

		/**
		 * @class Terrasoft.controls.BusinessRuleFilterActionDesignerContainer
		 */
		Ext.define("Terrasoft.controls.BusinessRuleFilterActionDesignerContainer", {
			extend: "Terrasoft.BusinessRuleActionDesignerContainer",
			alternateClassName: "Terrasoft.BusinessRuleFilterActionDesignerContainer",

			//region Properties: Private

			/**
			 * Condition items.
			 * @type {Array/Ext.util.MixedCollection}
			 */
			conditionItems: null,

			/**
			 * Condition title items.
			 * @type {Array/Ext.util.MixedCollection}
			 */
			conditionTitleItems: null,

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BusinessRuleActionDesignerContainer#getBlockNameList
			 * @overridden
			 */
			getBlockNameList: function() {
				var blockNameList = this.callParent(arguments);
				blockNameList.push("conditionItems");
				return blockNameList;
			},

			/**
			 * @inheritdoc Terrasoft.AbstractContainer#getViewItemsPropertyNames
			 * @overridden
			 */
			getViewItemsPropertyNames: function() {
				var viewItemsPropertyNames = this.callParent(arguments);
				viewItemsPropertyNames.push("conditionTitleItems");
				return viewItemsPropertyNames;
			},

			/**
			 * @inheritdoc Terrasoft.BusinessRuleActionDesignerContainer#getBlockHeaderTpl
			 * @overridden
			 */
			getBlockHeaderTpl: function(blockName) {
				var tpl;
				if (blockName === "conditionItems") {
					tpl = Ext.String.format("<div id=\"{id}-{0}-header\" class=\"{{0}BlockHeaderClass}\">" +
					"{%this.renderViewItemsProperty(out, values, 'conditionTitleItems')%}" +
					"</div>", blockName);
				} else {
					tpl = this.callParent(arguments);
				}
				return tpl;
			},

			/**
			 * @inheritdoc Terrasoft.Component#getTplData
			 * @overridden
			 */
			getTplData: function() {
				var testData = this.callParent(arguments);
				testData.wrapClass.push("business-rule-case-filter-action");
				return testData;
			}

			//endregion

		});
	});


