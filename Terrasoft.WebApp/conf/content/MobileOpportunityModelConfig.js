Terrasoft.configuration.Structures["MobileOpportunityModelConfig"] = {innerHierarchyStack: ["MobileOpportunityModelConfig"]};
Terrasoft.Configuration.OpportunityStage = {
	RejectedByUs: "736f54fd-e240-46f8-8c7c-9066c30aff59",
	TranslationIntoAnotherProcess: "9abf243c-fc00-45cf-8e28-cdb66c9208b0",
	FinishedWithLoss: "a9aafdfe-2242-4f42-8cd5-2ae3b9556d79",
	FinishedWithVictory: "60d5310c-5be6-df11-971b-001d60e938c6"
};

Terrasoft.sdk.Model.addBusinessRule("Opportunity", {
	name: "OpportunityTitleRequirementRule",
	ruleType: Terrasoft.RuleTypes.Requirement,
	triggeredByColumns: ["Title"]
});

Terrasoft.sdk.Model.addBusinessRule("Opportunity", {
	name: "OpportunityStageRequirementRule",
	ruleType: Terrasoft.RuleTypes.Requirement,
	triggeredByColumns: ["Stage"]
});

Terrasoft.sdk.Model.addBusinessRule("Opportunity", {
	name: "OpportunityLeadTypeRequirementRule",
	ruleType: Terrasoft.RuleTypes.Requirement,
	triggeredByColumns: ["LeadType"]
});

Terrasoft.sdk.Model.addBusinessRule("Opportunity", {
	name: "OpportunityAccountContactRequirementRule",
	ruleType: Terrasoft.RuleTypes.Requirement,
	requireType: Terrasoft.RequirementTypes.OneOf,
	events: [Terrasoft.BusinessRuleEvents.Save, Terrasoft.BusinessRuleEvents.ValueChanged],
	triggeredByColumns: ["Account", "Contact"]
});

Terrasoft.sdk.Model.addBusinessRule("Opportunity", {
	ruleType: Terrasoft.RuleTypes.MutualFiltration,
	triggeredByColumns: ["Account", "Contact"],
	connections: [
		{
			parent: "Account",
			child: "Contact"
		}
	]
});

Terrasoft.sdk.Model.addBusinessRule("Opportunity", {
	name: "OpportunityAmountValidatorRule",
	ruleType: Terrasoft.RuleTypes.Custom,
	triggeredByColumns: ["Amount"],
	events: [Terrasoft.BusinessRuleEvents.ValueChanged, Terrasoft.BusinessRuleEvents.Save],
	executeFn: function(model, rule, column, customData, callbackConfig) {
		var revenue = model.get("Amount");
		if ((revenue < 0) || Ext.isEmpty(revenue)) {
			model.set("Amount", 0, true);
		}
		Ext.callback(callbackConfig.success, callbackConfig.scope);
	}
});

Terrasoft.sdk.Model.addBusinessRule("Opportunity", {
	name: "OpportunityStageProbabilityDependencyRule",
	ruleType: Terrasoft.RuleTypes.Custom,
	triggeredByColumns: ["Stage"],
	events: [Terrasoft.BusinessRuleEvents.ValueChanged, Terrasoft.BusinessRuleEvents.Save],
	executeFn: function(model, rule, column, customData, callbackConfig) {
		var stage = model.get("Stage");
		var stageId;
		if (stage) {
			stageId = stage.getId();
		} else {
			Ext.callback(callbackConfig.success, callbackConfig.scope);
			return;
		}
		if (stageId === Terrasoft.Configuration.OpportunityStage.RejectedByUs ||
			stageId === Terrasoft.Configuration.OpportunityStage.TranslationIntoAnotherProcess ||
			stageId === Terrasoft.Configuration.OpportunityStage.FinishedWithLoss) {
			model.set("Probability", 0, true);
		} else if (stageId === Terrasoft.Configuration.OpportunityStage.FinishedWithVictory) {
			model.set("Probability", 100, true);
		}
		Ext.callback(callbackConfig.success, callbackConfig.scope);
	}
});

Terrasoft.sdk.Model.addBusinessRule("Opportunity", {
	name: "OpportunityProbabilityValidatorRule",
	ruleType: Terrasoft.RuleTypes.Custom,
	triggeredByColumns: ["Probability"],
	events: [Terrasoft.BusinessRuleEvents.ValueChanged, Terrasoft.BusinessRuleEvents.Save],
	executeFn: function(model, rule, column, customData, callbackConfig) {
		var invalidMessage = "";
		var probability = model.get("Probability");
		if (probability < 0) {
			probability = 0;
		} else if (probability > 100) {
			probability = 100;
		}
		model.set("Probability", probability, true);
		var isValid = true;
		var stage = model.get("Stage");
		var maxProbability = -1;
		if (stage) {
			maxProbability = model.get("Stage.MaxProbability");
		}
		if (probability && probability > maxProbability && maxProbability >= 0) {
			isValid = false;
			invalidMessage = Terrasoft.LocalizableStrings.ProbabilityIsGreaterThenMaxProbabilityByStageMessageCaption +
				maxProbability;
			model.changeProperty("Probability", {
				isValid: {
					value: isValid,
					message: invalidMessage
				}
			});
		} else {
			model.changeProperty("Probability", {
				isValid: {
					value: isValid
				}
			});
		}
		Ext.callback(callbackConfig.success, callbackConfig.scope, [isValid]);
	}
});


