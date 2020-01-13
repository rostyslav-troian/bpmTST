Terrasoft.configuration.Structures["MobileKnowledgeBaseFileModelConfig"] = {innerHierarchyStack: ["MobileKnowledgeBaseFileModelConfig"]};
/* globals FileType: false */
Terrasoft.sdk.Model.setDefaultValuesFunc("KnowledgeBaseFile", function(model, record) {
	FileType.load(Terrasoft.Configuration.FileTypeGUID.File, {
		success: function(loadedRecord) {
			record.set("Type", loadedRecord);
		}
	});
});
Terrasoft.sdk.Model.addBusinessRule("KnowledgeBaseFile", {
	ruleType: Terrasoft.RuleTypes.Visibility,
	name: "KnowledgeBaseFileVisibleFileRule",
	conditionalColumns: [
		{name: "Type", value: Terrasoft.Configuration.FileTypeGUID.File}
	],
	events: [Terrasoft.BusinessRuleEvents.Load],
	dependentColumnNames: ["Data"]
});
Terrasoft.sdk.Model.addBusinessRule("KnowledgeBaseFile", {
	ruleType: Terrasoft.RuleTypes.Visibility,
	name: "KnowledgeBaseFileVisibleLinkRule",
	conditionalColumns: [
		{name: "Type", value: Terrasoft.Configuration.FileTypeGUID.Link}
	],
	events: [Terrasoft.BusinessRuleEvents.Load],
	dependentColumnNames: ["Name"]
});
Terrasoft.sdk.Model.addBusinessRule("KnowledgeBaseFile", {
	ruleType: Terrasoft.RuleTypes.Visibility,
	name: "KnowledgeBaseFileVisibleKnowledgeBaseLinkRule",
	conditionalColumns: [
		{name: "Type", value: Terrasoft.Configuration.FileTypeGUID.KnowledgeBaseLink}
	],
	events: [Terrasoft.BusinessRuleEvents.Load],
	dependentColumnNames: ["Name"]
});


