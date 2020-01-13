Terrasoft.configuration.Structures["MobileCaseModelConfig"] = {innerHierarchyStack: ["MobileCaseModelConfig"]};
Terrasoft.sdk.Model.addBusinessRule("Case", {
	name: "CaseContactAccountRequirementRule",
	ruleType: Terrasoft.RuleTypes.Requirement,
	requireType: Terrasoft.RequirementTypes.OneOf,
	triggeredByColumns: ["Contact", "Account"]
});

Terrasoft.sdk.Model.setDefaultValuesFunc("Case", function(config) {
	config.record.set("RegisteredOn", new Date());
	config.record.set("Origin", Terrasoft.SysSettings.MobileDefaultCaseOrigin);
	Ext.callback(config.success, config.scope);
});

Terrasoft.sdk.Model.addBusinessRule("Case", {
	name: "CaseContactAccountMutualFiltrationRule",
	ruleType: Terrasoft.RuleTypes.MutualFiltration,
	triggeredByColumns: ["Account", "Contact"],
	connections: [{
		parent: "Account",
		child: "Contact"
	}]
});

Terrasoft.sdk.Model.addBusinessRule("Case", {
	name: "CaseOwnerFiltrationRule",
	ruleType: Terrasoft.RuleTypes.Filtration,
	events: [Terrasoft.BusinessRuleEvents.Load],
	triggeredByColumns: ["Owner"],
	filters: Ext.create("Terrasoft.Filter", {
		property: "ConnectionType",
		modelName: "SysAdminUnit",
		assocProperty: "Contact",
		operation: Terrasoft.FilterOperations.Any,
		name: "CaseOwner_SysAdminUnit_Filtration",
		value: Terrasoft.SysAdminUnitConnectionType.AllEmployees
	})
});


