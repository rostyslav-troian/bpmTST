Terrasoft.configuration.Structures["BusinessRuleCaseDesignerContainer"] = {innerHierarchyStack: ["BusinessRuleCaseDesignerContainer"]};
define("BusinessRuleCaseDesignerContainer", ["BusinessRuleCaseDesignerContainerResources"], function(resources) {

		/**
		 * @class Terrasoft.controls.BusinessRuleCaseDesignerContainer
		 */
		Ext.define("Terrasoft.controls.BusinessRuleCaseDesignerContainer", {
			extend: "Terrasoft.Container",
			alternateClassName: "Terrasoft.BusinessRuleCaseDesignerContainer",

			//region Properties: Private

			/**
			 * @var {String} Condition header class name.
			 */
			conditionHeaderClass: "business-rule-case-condition-header",

			/**
			 * @var {String} Condition header icon class name.
			 */
			conditionHeaderIconClass: "business-rule-case-condition-header-icon",

			/**
			 * @var {String} Condition container class name.
			 */
			conditionContainerClass: "business-rule-case-condition-container",

			/**
			 * @var {String} Action header class name.
			 */
			actionHeaderClass: "business-rule-case-action-header",

			/**
			 * @var {String} Action header icon class name.
			 */
			actionHeaderIconClass: "business-rule-case-action-header-icon",

			/**
			 * @var {String} Ation container class name.
			 */
			actionContainerClass: "business-rule-case-action-container",

			/**
			 * @var {String} Add condition button container class name.
			 */
			caseAddConditionClass: "business-rule-case-add-condition-button-wrapper",

			/**
			 * @var {String} Add action button container class name.
			 */
			caseAddActionClass: "business-rule-case-add-action-button-wrapper",

			/**
			 * @var {String} Tagger container class name.
			 */
			caseElementTagger: "business-rule-case-element-tagger",

			//endregion

			//region Properties: Public

			/**
			 * @var {Array} Condition group view item.
			 */
			conditionGroup: null,

			/**
			 * @var {Array} Action view items.
			 */
			actions: null,

			/**
			 * @var {Object} Add condition button.
			 */
			addConditionButton: null,

			/**
			 * @var {Object} Add action button.
			 */
			addActionButton: null,

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.AbstractContainer#getTpl
			 * @overridden
			 */
			getTpl: function() {
				return [
					"<div id=\"{id}-wrap\" class=\"{wrapClass}\" style=\"{wrapStyle}\">",
						"<div>",
							"<div id=\"{id}-condition-header\" class=\"{conditionHeaderClass}\">",
								"<span>",
									"<img src=\"{conditionHeaderIconPath}\" class=\"{conditionHeaderIconClass}\"/>",
								"</span>",
								"<label>" + resources.localizableStrings.IfCaption + "</label>",
							"</div>",
							"<div id=\"{id}-conditionGroup\" class=\"{conditionContainerClass}\">",
								"{%this.renderViewItemsProperty(out, values, 'conditionGroup')%}",
								"<div id=\"{id}-addConditionButton\" class=\"{caseAddConditionClass}\">",
									"<label class=\"{caseElementTagger}\">",
										"{%this.renderViewItemsProperty(out, values, 'addConditionButton')%}",
									"</label>",
								"</div>",
							"</div>",
							"<div id=\"{id}-action-header\" class=\"{actionHeaderClass}\">",
								"<span>",
									"<img src=\"{actionHeaderIconPath}\" class=\"{actionHeaderIconClass}\"/>",
								"</span>",
								"<label>" + resources.localizableStrings.ThenCaption + "</label>",
							"</div>",
							"<div id=\"{id}-actions\" class=\"{actionContainerClass}\">",
								"{%this.renderViewItemsProperty(out, values, 'actions')%}",
								"<div id=\"{id}-addActionButton\" class=\"{caseAddActionClass}\">",
									"<label class=\"{caseElementTagger}\">",
										"{%this.renderViewItemsProperty(out, values, 'addActionButton')%}",
									"</label>",
								"</div>",
							"</div>",
						"</div>",
					"</div>"
				];
			},

			/**
			 * @inheritdoc Terrasoft.AbstractContainer#getViewItemsPropertyNames
			 * @overridden
			 */
			getViewItemsPropertyNames: function() {
				var viewItemsPropertyNames = this.callParent(arguments);
				viewItemsPropertyNames.push("conditionGroup", "actions", "addConditionButton", "addActionButton");
				return viewItemsPropertyNames;
			},

			/**
			 * Returns a selectors of the control.
			 * @protected
			 * @return {Object} Selectors of the control.
			 */
			getSelectors: function() {
				return {
					wrapEl: "#" + this.id + "-wrap",
					conditionHeader: "#" + this.id + "-condition-header",
					actionHeader: "#" + this.id + "-action-header"
				};
			},

			/**
			 * @inheritdoc Terrasoft.Component#getTplData
			 * @overridden
			 */
			getTplData: function() {
				var tplData = this.callParent(arguments);
				var caseTplData = {
					itemsLength: this.items.length
				};
				var wrapClasses = ["business-rule-case"];
				if (this.wrapClass) {
					wrapClasses.push(this.wrapClass);
				}
				caseTplData.wrapClass = wrapClasses;
				caseTplData.conditionHeaderClass = this.conditionHeaderClass;
				caseTplData.conditionHeaderIconClass = this.conditionHeaderIconClass;
				caseTplData.conditionContainerClass = this.conditionContainerClass;
				caseTplData.actionHeaderClass = this.actionHeaderClass;
				caseTplData.actionHeaderIconClass = this.actionHeaderIconClass;
				caseTplData.actionContainerClass = this.actionContainerClass;
				caseTplData.caseAddConditionClass = this.caseAddConditionClass;
				caseTplData.caseAddActionClass = this.caseAddActionClass;
				caseTplData.caseElementTagger = this.caseElementTagger;
				caseTplData.conditionHeaderIconPath =
					Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.IfIcon);
				caseTplData.actionHeaderIconPath =
					Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.ThenIcon);
				Ext.apply(caseTplData, tplData, {});
				this.selectors = this.getSelectors();
				return caseTplData;
			}

			//endregion

		});
	});


