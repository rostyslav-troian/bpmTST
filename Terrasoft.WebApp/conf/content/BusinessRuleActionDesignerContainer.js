Terrasoft.configuration.Structures["BusinessRuleActionDesignerContainer"] = {innerHierarchyStack: ["BusinessRuleActionDesignerContainer"]};
define("BusinessRuleActionDesignerContainer", ["BusinessRuleActionDesignerContainerResources",
		"css!BusinessRuleActionDesignerContainer"], function(resources) {

		/**
		 * @class Terrasoft.controls.BusinessRuleActionDesignerContainer
		 */
		Ext.define("Terrasoft.controls.BusinessRuleActionDesignerContainer", {
			extend: "Terrasoft.Container",
			alternateClassName: "Terrasoft.BusinessRuleActionDesignerContainer",

			//region Properties: Private

			/**
			 * Title items.
			 * @private
			 * @type {Array/Ext.util.MixedCollection}
			 */
			titleItems: null,

			/**
			 * Wrap css class name.
			 * @private
			 * @type {String}
			 */
			wrapClass: null,

			/**
			 * Header container css class name.
			 * @private
			 * @type {String}
			 */
			headerWrapClass: null,

			/**
			 * Header block container css class name.
			 * @private
			 * @type {String}
			 */
			blockHeaderClass: null,

			/**
			 * Content container css class name.
			 * @private
			 * @type {String}
			 */
			contentWrapClass: null,

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.AbstractContainer#getTpl
			 * @protected
			 * @overridden
			 */
			getTpl: function() {
				return [
					"<div id=\"{id}-case-action-wrap\" class=\"{wrapClass}\" style=\"{wrapStyle}\">",
					"<div id=\"{id}-case-action-header-wrap\" class=\"{headerWrapClass}\">",
					this.getBlocksHeaderTpl(),
					"</div>",
					"<div id=\"{id}-case-action-content-wrap\" class=\"{contentWrapClass}\">",
					this.getBlocksTpl(),
					"</div>",
					"</div>"
				];
			},

			/**
			 * Return content blocks tpl.
			 * @protected
			 * @return {String} Content blocks tpl.
			 */
			getBlocksHeaderTpl: function() {
				var blockList = this.getBlockNameList();
				var tpl = "";
				Terrasoft.each(blockList, function(blockName) {
					tpl += this.getBlockHeaderTpl(blockName);
				}, this);
				return tpl;
			},

			/**
			 * Return content block tpl
			 * @protected
			 * @param  {String} blockName Content block name.
			 * @return {String} content block tpl.
			 */
			getBlockHeaderTpl: function(blockName) {
				var tpl = "<div id=\"{id}-{0}-header\" class=\"{blockHeaderClass} {{0}BlockHeaderClass}\">" +
					"<label>{{0}Title}</label>" +
					"</div>";
				return Ext.String.format(tpl, blockName);
			},

			/**
			 * Return content blocks tpl.
			 * @protected
			 * @return {String} Content blocks tpl.
			 */
			getBlocksTpl: function() {
				var blockList = this.getBlockNameList();
				var tpl = "";
				Terrasoft.each(blockList, function(blockName) {
					tpl += this.getBlockTpl(blockName);
				}, this);
				return tpl;
			},

			/**
			 * Return content block tpl
			 * @protected
			 * @param  {String} blockName Content block name.
			 * @return {String} content block tpl.
			 */
			getBlockTpl: function(blockName) {
				var tpl = "<div id=\"{id}-{0}\" class=\"{blockContentClass} {{0}BlockContentClass}\">" +
					"{%this.renderViewItemsProperty(out, values, '{0}')%}" +
					"</div>";
				return Ext.String.format(tpl, blockName);
			},

			/**
			 * Return content block name list.
			 * @protected
			 * @return {Array} Content block name list.
			 */
			getBlockNameList: function() {
				return ["titleItems"];
			},

			/**
			 * Return content block title.
			 * @protected
			 * @param  {String} blockName Content block name.
			 * @return {String} Content block title.
			 */
			getBlockTitle: function(blockName) {
				return (blockName === "titleItems")
					? resources.localizableStrings.ActionGroupCaption
					: null;
			},

			/**
			 * @inheritdoc Terrasoft.AbstractContainer#getViewItemsPropertyNames
			 * @overridden
			 */
			getViewItemsPropertyNames: function() {
				var viewItemsPropertyNames = this.callParent(arguments);
				Terrasoft.each(this.getBlockNameList(), function(blockName) {
					viewItemsPropertyNames.push(blockName);
				}, this);
				return viewItemsPropertyNames;
			},

			/**
			 * Returns a selectors of the control.
			 * @protected
			 * @return {Object} Selectors of the control.
			 */
			getSelectors: function() {
				return {
					wrapEl: "#" + this.id + "-case-action-wrap"
				};
			},

			/**
			 * @inheritdoc Terrasoft.Component#getTplData
			 * @overridden
			 */
			getTplData: function() {
				var tplData = this.callParent(arguments);
				var actionTplData = {};
				var wrapClasses = ["business-rule-case-action"];
				var headerWrapClasses = ["business-rule-case-action-header-container"];
				var blockHeaderClasses = ["business-rule-case-action-header-item"];
				var contentWrapClasses = ["business-rule-case-action-content-container"];
				if (this.wrapClass) {
					wrapClasses.push(this.wrapClass);
				}
				if (this.headerWrapClass) {
					headerWrapClasses.push(this.headerWrapClass);
				}
				if (this.contentWrapClass) {
					contentWrapClasses.push(this.contentWrapClass);
				}
				if (this.blockHeaderClass) {
					blockHeaderClasses.push(this.blockHeaderClass);
				}
				actionTplData.wrapClass = wrapClasses;
				actionTplData.headerWrapClass = headerWrapClasses;
				actionTplData.blockHeaderClass = blockHeaderClasses;
				actionTplData.contentWrapClass = contentWrapClasses;
				Terrasoft.each(this.getBlockNameList(), function(blockName) {
					actionTplData[Ext.String.format("{0}Title", blockName)] = this.getBlockTitle(blockName);
					actionTplData[Ext.String.format("{0}BlockHeaderClass", blockName)] =
						Ext.String.format("business-rule-case-action-{0}-header-container", blockName.toLowerCase());
					actionTplData[Ext.String.format("{0}BlockContentClass", blockName)] =
						Ext.String.format("business-rule-case-action-{0}-content-container", blockName.toLowerCase());
				}, this);
				Ext.apply(actionTplData, tplData, {});
				this.selectors = this.getSelectors();
				return actionTplData;
			}

			//endregion

		});
	});


