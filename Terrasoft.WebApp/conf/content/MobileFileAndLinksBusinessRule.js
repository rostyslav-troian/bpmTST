Terrasoft.configuration.Structures["MobileFileAndLinksBusinessRule"] = {innerHierarchyStack: ["MobileFileAndLinksBusinessRule"]};
/**
 * @class Terrasoft.configuration.FileAndLinksBusinessRule
 * Provides business rule for file details.
 */
Ext.define("Terrasoft.configuration.FileAndLinksBusinessRule", {
	alternateClassName: "Terrasoft.FileAndLinksBusinessRule",
	extend: "Terrasoft.BaseRule",

	config: {

		/**
		 * @inheritdoc
		 */
		ruleType: "Terrasoft.FileAndLinksBusinessRule",

		/**
		 * @inheritdoc
		 */
		triggeredByColumns: ["Type", "Name"],

		/**
		 * @inheritdoc
		 */
		events: [Terrasoft.BusinessRuleEvents.Load, Terrasoft.BusinessRuleEvents.ValueChanged]

	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	execute: function(record, column, customData, callbackConfig) {
		var type = record.get("Type");
		var typeId = type.getId();
		var isKnowledgeBaseLink = (typeId === Terrasoft.Configuration.FileTypeGUID.KnowledgeBaseLink);
		var isFile = (typeId === Terrasoft.Configuration.FileTypeGUID.File) || isKnowledgeBaseLink;
		record.changeProperty("Name", {
			hidden: isFile,
			required: !isFile,
			disabled: isKnowledgeBaseLink
		});
		record.changeProperty("Data", {
			hidden: !isFile
		});
		if (isKnowledgeBaseLink) {
			record.changeProperty("Data", {
				label: Terrasoft.LocalizableStrings.EditPageKnowledgeBaseLinkCaption
			});
		}
		Ext.callback(callbackConfig.success, callbackConfig.scope, [true]);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getRequiredColumns: function() {
		return this.getTriggeredByColumns();
	}

});


