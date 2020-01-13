Terrasoft.configuration.Structures["MobileSocialMessageModelConfig"] = {innerHierarchyStack: ["MobileSocialMessageModelConfig"]};
/* globals VwSocialSubscription: false */
Terrasoft.sdk.Model.addBusinessRule("SocialMessage", {
	name: "SocialMessageMessageRequirementRule",
	ruleType: Terrasoft.RuleTypes.Requirement,
	triggeredByColumns: ["Message"],
	position: 0
});

Terrasoft.Configuration.updateSocialSubscription = function(config) {
	var socialMessageId = this.getId();
	var entityId = this.get("EntityId");
	var successFn = config.success;
	var failureFn = config.failure;
	var callbackScope = config.scope;
	var vwSocialSubscriptionRecord = VwSocialSubscription.create({
		SocialMessage: socialMessageId,
		SysAdminUnit: Terrasoft.CurrentUserInfo.userId,
		EntityId: entityId
	});
	vwSocialSubscriptionRecord.save({
		queryConfig: Ext.create("Terrasoft.QueryConfig", {
			modelName: "VwSocialSubscription",
			columns: ["SocialMessage", "SysAdminUnit", "EntityId"],
			isLogged: false
		}),
		success: function() {
			Ext.callback(successFn, callbackScope);
		},
		failure: function(exception) {
			Ext.callback(failureFn, callbackScope, [exception]);
		}
	}, this);
};

if (!Terrasoft.ApplicationUtils.isOnlineMode()) {
	Terrasoft.sdk.Model.setModelEventHandler("SocialMessage",
		Terrasoft.ModelEvents[Terrasoft.ModelEventKinds.After].insert,
		Terrasoft.Configuration.updateSocialSubscription);
}


