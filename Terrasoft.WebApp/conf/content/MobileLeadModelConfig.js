Terrasoft.configuration.Structures["MobileLeadModelConfig"] = {innerHierarchyStack: ["MobileLeadModelConfig"]};
Terrasoft.sdk.Model.addBusinessRule("Lead", {
	name: "LeadTypeRequirementRule",
	ruleType: Terrasoft.RuleTypes.Requirement,
	triggeredByColumns: ["LeadType"]
});

Terrasoft.sdk.Model.addBusinessRule("Lead", {
	name: "LeadCountryRegionCityMutualFiltrationRule",
	ruleType: Terrasoft.RuleTypes.MutualFiltration,
	triggeredByColumns: ["Country", "Region", "City"],
	events: [Terrasoft.BusinessRuleEvents.Load, Terrasoft.BusinessRuleEvents.ValueChanged],
	connections: [
		{
			parent: "Country",
			child: "City"
		},
		{
			parent: "Country",
			child: "Region"
		},
		{
			parent: "Region",
			child: "City"
		}
	]
});

(function() {
	function getLeadType(record) {
		return new Promise(function(resolve) {
			var leadType = record.get("LeadType");
			if (!(leadType instanceof Terrasoft.model.BaseModel)) {
				Terrasoft.DataUtils.loadRecords({
					modelName: "LeadType",
					proxyType: Terrasoft.ProxyType.Offline,
					columns: ["Name"],
					filters: Ext.create("Terrasoft.Filter", {
						property: "Id",
						value: leadType
					}),
					success: function(records) {
						if (!Ext.isEmpty(records)) {
							resolve(records[0]);
						} else {
							resolve(null);
						}
					},
					failure: function(exception) {
						resolve(null);
					},
					scope: this
				});
			} else {
				resolve(leadType);
			}
		});
	}

	function calculateLeadName(config) {
		var record = this;
		var values = [];
		var account = record.get("Account");
		var contact = record.get("Contact");
		var contacts = [];
		if (!Ext.isEmpty(contact)) {
			contacts.push(contact);
		}
		if (!Ext.isEmpty(account)) {
			contacts.push(account);
		}
		contacts = contacts.join(", ");
		values.push(contacts);
		getLeadType(record).then(function(leadTypeRecord) {
			if (leadTypeRecord) {
				values.unshift(leadTypeRecord.getPrimaryDisplayColumnValue());
			}
			var newLeadName = values.join(" / ");
			if (record.get("LeadName") !== newLeadName) {
				record.set("LeadName", newLeadName);
			}
			Ext.callback(config.success, config.scope);
		}.bind(this));
	}

	Terrasoft.sdk.Model.setModelEventHandler("Lead", Terrasoft.ModelEvents[Terrasoft.ModelEventKinds.Before].insert,
		calculateLeadName
	);
	Terrasoft.sdk.Model.setModelEventHandler("Lead", Terrasoft.ModelEvents[Terrasoft.ModelEventKinds.Before].update,
		calculateLeadName
	);
})();


