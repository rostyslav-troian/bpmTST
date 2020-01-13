Terrasoft.configuration.Structures["MobileActivityModelConfig"] = {innerHierarchyStack: ["MobileActivityModelConfig"]};
/* globals ActivityParticipant: false */

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	ruleType: Terrasoft.RuleTypes.Requirement,
	triggeredByColumns: ["Title"]
});

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	ruleType: Terrasoft.RuleTypes.Requirement,
	triggeredByColumns: ["StartDate"]
});

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	ruleType: Terrasoft.RuleTypes.Requirement,
	triggeredByColumns: ["DueDate"]
});

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	ruleType: Terrasoft.RuleTypes.Requirement,
	triggeredByColumns: ["Status"]
});

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	name: "ActivityCategoryRequirement",
	ruleType: Terrasoft.RuleTypes.Requirement,
	triggeredByColumns: ["ActivityCategory"]
});

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	name: "PriorityRequirement",
	ruleType: Terrasoft.RuleTypes.Requirement,
	triggeredByColumns: ["Priority"]
});

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	name: "OwnerRequirement",
	ruleType: Terrasoft.RuleTypes.Requirement,
	triggeredByColumns: ["Owner"]
});

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	ruleType: Terrasoft.RuleTypes.Activation,
	triggeredByColumns: ["Status"],
	conditionalColumns: [
		{name: "Status.Finish", value: true}
	],
	dependentColumnNames: ["Result", "DetailedResult"]
});

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	name: "ActivityCategoryAndTypeMutualFiltrationRule",
	ruleType: Terrasoft.RuleTypes.MutualFiltration,
	triggeredByColumns: ["Type", "ActivityCategory"],
	connections: [
		{
			parent: "Type",
			child: "ActivityCategory",
			connectedBy: "ActivityType"
		}
	]
});

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	ruleType: Terrasoft.RuleTypes.MutualFiltration,
	triggeredByColumns: ["Account", "Contact"],
	connections: [
		{
			parent: "Account",
			child: "Contact"
		}
	]
});

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	name: "ActivityCategoryFilterRule",
	ruleType: Terrasoft.RuleTypes.Filtration,
	triggeredByColumns: ["ActivityCategory"],
	filters: Ext.create("Terrasoft.Filter", {
		compareType: Terrasoft.ComparisonTypes.NotEqual,
		property: "ActivityType",
		value: Terrasoft.GUID.ActivityTypeEmail,
		name: "81d05412-d90c-440a-831a-03fc52489fa5"
	})
});

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	name: "ActivityResultByActivityCategoryFilter",
	position: 0,
	ruleType: Terrasoft.RuleTypes.Filtration,
	triggeredByColumns: ["ActivityCategory"],
	filteredColumn: "Result",
	filters: Ext.create("Terrasoft.Filter", {
		property: "ActivityCategory",
		modelName: "ActivityCategoryResultEntry",
		assocProperty: "ActivityResult",
		operation: Terrasoft.FilterOperations.Any,
		name: "0c685faa-26ca-4a55-a6fa-3147b9b5009e"
	})
});

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	ruleType: Terrasoft.RuleTypes.Filtration,
	events: [Terrasoft.BusinessRuleEvents.Load],
	triggeredByColumns: ["Owner"],
	filters: Ext.create("Terrasoft.Filter", {
		property: "Active",
		modelName: "SysAdminUnit",
		assocProperty: "Contact",
		operation: Terrasoft.FilterOperations.Any,
		name: "ActivityContact_SysAdminUnit_Filtration",
		value: true
	})
});

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	ruleType: Terrasoft.RuleTypes.Comparison,
	triggeredByColumns: ["StartDate"],
	leftColumn: "DueDate",
	comparisonOperation: Terrasoft.ComparisonTypes.GreaterOrEqual,
	rightColumn: "StartDate"
});

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	ruleType: Terrasoft.RuleTypes.Comparison,
	triggeredByColumns: ["DueDate"],
	leftColumn: "StartDate",
	comparisonOperation: Terrasoft.ComparisonTypes.LessOrEqual,
	rightColumn: "DueDate"
});

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	name: "ActivityResultByAllowedResultFilterRule",
	position: 1,
	ruleType: Terrasoft.RuleTypes.Custom,
	triggeredByColumns: ["Result"],
	events: [Terrasoft.BusinessRuleEvents.ValueChanged, Terrasoft.BusinessRuleEvents.Load],
	executeFn: function(record, rule, column, customData, callbackConfig) {
		var allowedResult = record.get("AllowedResult");
		var filterName = "ActivityResultByAllowedResultFilter";
		if (!Ext.isEmpty(allowedResult)) {
			var allowedResultIds =  Ext.JSON.decode(allowedResult, true);
			var resultIdsAreCorrect = true;
			for (var i = 0, ln = allowedResultIds.length; i < ln; i++) {
				var item = allowedResultIds[i];
				if (!Terrasoft.util.isGuid(item)) {
					resultIdsAreCorrect = false;
					break;
				}
			}
			if (resultIdsAreCorrect) {
				var filter = Ext.create("Terrasoft.Filter", {
					name: filterName,
					property: "Id",
					funcType: Terrasoft.FilterFunctions.In,
					funcArgs: allowedResultIds
				});
				record.changeProperty("Result", {
					addFilter: filter
				});
			} else {
				record.changeProperty("Result", {
					removeFilter: filterName
				});
			}
		} else {
			record.changeProperty("Result", {
				removeFilter: filterName
			});
		}
		Ext.callback(callbackConfig.success, callbackConfig.scope, [true]);
	}
});

Terrasoft.sdk.Model.addBusinessRule("Activity", {
	name: "ActivityResultRequiredByStatusFinishedAndProcessElementId",
	ruleType: Terrasoft.RuleTypes.Custom,
	triggeredByColumns: ["Status", "Result"],
	events: [Terrasoft.BusinessRuleEvents.ValueChanged, Terrasoft.BusinessRuleEvents.Save],
	executeFn: function(record, rule, column, customData, callbackConfig) {
		var isValid = true;
		var processElementId = record.get("ProcessElementId");
		if (processElementId && processElementId !== Terrasoft.GUID_EMPTY) {
			isValid = !(record.get("Status.Id") === Terrasoft.Configuration.ActivityStatus.Finished &&
				Ext.isEmpty(record.get("Result")));
		}
		record.changeProperty("Result", {
			isValid: {
				value: isValid,
				message: Terrasoft.LS["Sys.RequirementRule.message"]
			}
		});
		Ext.callback(callbackConfig.success, callbackConfig.scope, [isValid]);
	}
});

Terrasoft.sdk.Model.setDefaultValuesFunc("Activity", function(config) {
	var coeff = 1000 * 60 * 5;
	var currentDate = new Date();
	var startDate = new Date(Math.round(currentDate.getTime() / coeff) * coeff);
	var dueDate = new Date(startDate.getTime() + 30 * 60000);
	config.record.set("StartDate", startDate);
	config.record.set("DueDate", dueDate);
	config.record.set("ShowInScheduler", true);
	Ext.callback(config.success, config.scope);
});

Terrasoft.updateParticipant = function(changedColumnName, oldValue, newValue, record, config, mode, toCallback) {
	var successFn = config.success;
	var callbackScope = config.scope;
	var proxyType = record.getProxyType();
	var filter = Ext.create("Terrasoft.Filter", {
		type: "Terrasoft.FilterTypes.Group",
		logicalOperation: "Terrasoft.FilterLogicalOperations.And",
		subfilters: [
			{
				compareType: Terrasoft.ComparisonTypes.Equal,
				property: "Activity",
				value: record.get("Id")
			},
			{
				compareType: Terrasoft.ComparisonTypes.Equal,
				property: "Participant",
				value: oldValue
			}
		]
	});
	var queryConfig = Ext.create("Terrasoft.QueryConfig", {
		columns: ["Activity", "Participant"],
		modelName: "ActivityParticipant"
	});
	if (mode === "insert") {
		var newRecord = ActivityParticipant.create({
			"Activity": record,
			"Participant": newValue
		});
		newRecord.setProxyType(proxyType);
		newRecord.save({
			isCancelable: false,
			queryConfig: queryConfig
		});
		if (toCallback) {
			Ext.callback(successFn, callbackScope);
		}
	} else {
		var store = Ext.create("Terrasoft.BaseStore", {
			model: "ActivityParticipant"
		});
		store.setProxyType(proxyType);
		store.loadPage(1, {
			filters: filter,
			callback: function(data, operation, success) {
				if (success === true && data.length > 0) {
					var participant = data[0];
					participant.setProxyType(proxyType);
					var operationConfig = {
						isCancelable: false,
						queryConfig: queryConfig
					};
					if (mode === "delete") {
						participant.erase(operationConfig);
					} else {
						participant.set("Participant", newValue, true);
						participant.save(operationConfig);
					}
				} else if (success === true && data.length === 0) {
					var newRecord = ActivityParticipant.create({
						"Activity": record,
						"Participant": newValue
					});
					newRecord.setProxyType(proxyType);
					newRecord.save({
						isCancelable: false,
						queryConfig: queryConfig
					});
				}
				if (toCallback) {
					Ext.callback(successFn, callbackScope);
				}
			},
			queryConfig: queryConfig
		});
	}
};

Terrasoft.processActivityColumnForUpdateActivityParticipantDetail = function(config, record, columnName, toCallback) {
	var successFn = config.success;
	var callbackScope = config.scope;
	var mode = "";
	var oldValue = record.modified[columnName];
	var newValue = record.get(columnName);
	if ((record.phantom && !Ext.isEmpty(newValue)) || (oldValue === null && !Ext.isEmpty(newValue))) {
		mode = "insert";
	} else if (Ext.isEmpty(newValue) && !Ext.isEmpty(oldValue)) {
		mode = "delete";
	} else if (!Ext.isEmpty(newValue) && !Ext.isEmpty(oldValue) && (oldValue !== newValue)) {
		mode = "update";
	}
	if (!Ext.isEmpty(mode)) {
		Terrasoft.updateParticipant(columnName, oldValue, newValue, record, config, mode, toCallback);
	} else {
		if (toCallback) {
			Ext.callback(successFn, callbackScope);
		}
	}
};

Terrasoft.updateActivityParticipant = function(config) {
	var contact = this.get("Contact");
	var owner = this.get("Owner");
	if (contact && owner && (contact.getId() === owner.getId())) {
		Terrasoft.processActivityColumnForUpdateActivityParticipantDetail(config, this, "Contact", true);
	} else {
		Terrasoft.processActivityColumnForUpdateActivityParticipantDetail(config, this, "Contact", false);
		Terrasoft.processActivityColumnForUpdateActivityParticipantDetail(config, this, "Owner", true);
	}
};

(function() {
	var onActivityAfterInsertFn = function(config) {
		var record = this;
		if (record.get("ShowInScheduler")) {
			Terrasoft.configuration.ActivityGridCachedOperation.add([record]);
		}
		Ext.callback(config.success, config.scope);
	};
	var onActivityAfterUpdateFn = function(config) {
		var record = this;
		Terrasoft.configuration.ActivityGridCachedOperation.remove([record]);
		Terrasoft.configuration.ActivityGridCachedOperation.add([record]);
		Ext.callback(config.success, config.scope);
	};
	if (!Terrasoft.ApplicationUtils.isOnlineMode() || Terrasoft.ModelCache.isEnabledForModel("Activity")) {
		Terrasoft.sdk.Model.setModelEventHandler("Activity",
			Terrasoft.ModelEvents[Terrasoft.ModelEventKinds.After].insert, Terrasoft.updateActivityParticipant);
		Terrasoft.sdk.Model.setModelEventHandler("Activity",
			Terrasoft.ModelEvents[Terrasoft.ModelEventKinds.Before].update, Terrasoft.updateActivityParticipant);
	} else {
		Terrasoft.sdk.Model.setModelEventHandler("Activity",
			Terrasoft.ModelEvents[Terrasoft.ModelEventKinds.After].insert, onActivityAfterInsertFn);
		Terrasoft.sdk.Model.setModelEventHandler("Activity",
			Terrasoft.ModelEvents[Terrasoft.ModelEventKinds.After].update, onActivityAfterUpdateFn);
	}
}());


