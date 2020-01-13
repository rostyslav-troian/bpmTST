Terrasoft.configuration.Structures["MobileContactAnniversaryModelConfig"] = {innerHierarchyStack: ["MobileContactAnniversaryModelConfig"]};
Terrasoft.sdk.Model.addBusinessRule('ContactAnniversary', {
	ruleType: Terrasoft.RuleTypes.Requirement,
	triggeredByColumns: ['AnniversaryType']
});

Terrasoft.sdk.Model.addBusinessRule('ContactAnniversary', {
	ruleType: Terrasoft.RuleTypes.Requirement,
	triggeredByColumns: ['Date']
});

Terrasoft.sdk.Model.setAlternativePrimaryDisplayColumnValueFunc('ContactAnniversary', function(record) {
	return record.get('Date');
});


