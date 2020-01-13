Terrasoft.configuration.Structures["MobileOpportunityProductInterestModelConfig"] = {innerHierarchyStack: ["MobileOpportunityProductInterestModelConfig"]};
Terrasoft.sdk.Model.addBusinessRule("OpportunityProductInterest", {
	ruleType: Terrasoft.RuleTypes.Requirement,
	triggeredByColumns: ["Product"]
});

Terrasoft.sdk.Model.addBusinessRule("OpportunityProductInterest", {
	name: "OpportunityProductInterestQuantityBelowZeroRule",
	ruleType: Terrasoft.RuleTypes.Custom,
	triggeredByColumns: ["Quantity"],
	events: [Terrasoft.BusinessRuleEvents.ValueChanged, Terrasoft.BusinessRuleEvents.Save],
	executeFn: function(model, rule, column, customData, callbackConfig) {
		if (model.get("Quantity") < 0) {
			model.set("Quantity", 1, true);
		}
		Ext.callback(callbackConfig.success, callbackConfig.scope);
	}
});

Terrasoft.sdk.Model.addBusinessRule("OpportunityProductInterest", {
	name: "OpportunityProductInterestQuantityValidateRule",
	ruleType: Terrasoft.RuleTypes.Custom,
	triggeredByColumns: ["Quantity"],
	events: [Terrasoft.BusinessRuleEvents.ValueChanged, Terrasoft.BusinessRuleEvents.Save],
	executeFn: function(model, rule, column, customData, callbackConfig) {
		var isValid = true;
		var value = model.get("Quantity");
		if (value === 0) {
			isValid = false;
			model.changeProperty("Quantity", {
				isValid: {
					value: isValid,
					message: Terrasoft.LocalizableStrings["Sys.Warning.QuantityCantBeLessZero.message"]
				}
			});
		} else {
			var valueStr = value + "";
			valueStr = valueStr.replace(",", ".");
			valueStr = valueStr.replace(/[^0-9\\.]/g, "").replace(/^(\d*\.\d*)\..*$/, "$1") * 1.0;
			valueStr = Math.round(valueStr * 100) / 100;
			model.set("Quantity", valueStr, true);
			model.changeProperty("Quantity", {
				isValid: {
					value: isValid
				}
			});
		}
		Ext.callback(callbackConfig.success, callbackConfig.scope, [isValid]);
	}
});


