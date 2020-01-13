Terrasoft.configuration.Structures["BusinessRuleBindParameterActionDesignerContainer"] = {innerHierarchyStack: ["BusinessRuleBindParameterActionDesignerContainer"]};
define("BusinessRuleBindParameterActionDesignerContainer",["BusinessRuleActionDesignerContainer",
	"css!BusinessRuleBindParameterActionDesignerContainer", "ExpressionEdit"], function() {

		/**
		 * @class Terrasoft.controls.BusinessRuleBindParameterActionDesignerContainer
		 */
		Ext.define("Terrasoft.controls.BusinessRuleBindParameterActionDesignerContainer", {
			extend: "Terrasoft.BusinessRuleActionDesignerContainer",
			alternateClassName: "Terrasoft.BusinessRuleBindParameterActionDesignerContainer",

			//region Properties: Private

			/**
			 * Right expression items.
			 * @type {Array/Ext.util.MixedCollection}
			 */
			expressionItem: null,

			/**
			 * Expression hint.
			 * @type {String}
			 */
			expressionItemHint: null,

			//endregion

			//region Methods: Protected

			/**
			 * Return content block tpl
			 * @param  {String} blockName Content block name.
			 * @return {String} content block tpl.
			 */
			getBlockHeaderTpl: function(blockName) {
				var tpl;
				if (blockName === "expressionItem") {
					tpl = "<div id=\"{id}-{0}-header\" class=\"{blockHeaderClass} {{0}BlockHeaderClass}\">" +
						"<label>{expressionItemHint}</label>" +
						"</div>";
				} else {
					tpl = this.callParent(arguments);
				}
				return Ext.String.format(tpl, blockName);
			},

			/**
			* @inheritdoc Terrasoft.controls.Component#getBindConfig
			* @overridden
			*/
			getBindConfig: function() {
				var bindConfig = this.callParent(arguments);
				var actionBindConfig = {
					"expressionItemHint": {
						changeMethod: "onChangeExpressionItemHint"
					}
				};
				Ext.apply(actionBindConfig, bindConfig);
				return actionBindConfig;
			},

			/**
			 * Handler of change expression items hint.
			 * @param {String} value Expression item hint.
			 */
			onChangeExpressionItemHint: function(value) {
				if (this.expressionItemHint === value) {
					return;
				}
				this.expressionItemHint = value;
			},

			/**
			 * @inheritdoc Terrasoft.BusinessRuleActionDesignerContainer#getBlockNameList
			 * @overridden
			 */
			getBlockNameList: function() {
				var blockNameList = this.callParent(arguments);
				blockNameList.push("expressionItem");
				return blockNameList;
			},

			/**
			 * @inheritdoc Terrasoft.Component#getTplData
			 * @overridden
			 */
			getTplData: function() {
				var tplData = this.callParent(arguments);
				var actionTplData = {};
				var wrapClasses = ["bindable-action-wrap"];
				if (tplData.wrapClass) {
					wrapClasses.push(tplData.wrapClass);
				}
				actionTplData.expressionItemHint = this.expressionItemHint;
				actionTplData.wrapClass = wrapClasses;
				Ext.apply(tplData, actionTplData, {});
				return tplData;
			}

			//endregion

		});
	});


