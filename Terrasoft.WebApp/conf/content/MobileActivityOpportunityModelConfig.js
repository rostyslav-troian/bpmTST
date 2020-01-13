Terrasoft.configuration.Structures["MobileActivityOpportunityModelConfig"] = {innerHierarchyStack: ["MobileActivityOpportunityModelConfig"]};
Terrasoft.sdk.Model.addBusinessRule("Activity", {
	name: "ActivityAccountOpportunityFiltrationRule",
	ruleType: Terrasoft.RuleTypes.Filtration,
	events: [Terrasoft.BusinessRuleEvents.Load, Terrasoft.BusinessRuleEvents.ValueChanged],
	triggeredByColumns: ["Account"],
	filteredColumn: "Opportunity",
	filters: Ext.create("Terrasoft.Filter", {
		property: "Account"
	})
});

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	name: "ActivityAccountByOpportunityRule",
	ruleType: Terrasoft.RuleTypes.Custom,
	triggeredByColumns: ["Opportunity"],
	events: [Terrasoft.BusinessRuleEvents.ValueChanged, Terrasoft.BusinessRuleEvents.Save,
		Terrasoft.BusinessRuleEvents.Load],
	executeFn: function(record, rule, column, customData, callbackConfig) {
		var opportunityRecord = record.get("Opportunity");
		if (opportunityRecord) {
			var accountRecord = record.get("Account");
			if (!accountRecord) {
				var opportunityModel = Ext.ModelManager.getModel("Opportunity");
				opportunityModel.load(opportunityRecord.getId(), {
					isCancelable: false,
					queryConfig: Ext.create("Terrasoft.QueryConfig", {
						columns: ["Account"],
						modelName: "Opportunity"
					}),
					success: function(loadedRecord) {
						if (loadedRecord) {
							record.set("Account", loadedRecord.get("Account"), true);
						}
						Ext.callback(callbackConfig.success, callbackConfig.scope);
					},
					failure: function(record, operation) {
						var exception = operation.getError();
						Ext.callback(callbackConfig.failure, callbackConfig.scope, [exception]);
					},
					scope: this
				});
				return;
			}
		}
		Ext.callback(callbackConfig.success, callbackConfig.scope);
	},
	position: 1
});


