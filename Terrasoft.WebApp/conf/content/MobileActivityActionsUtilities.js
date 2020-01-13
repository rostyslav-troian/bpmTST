Terrasoft.configuration.Structures["MobileActivityActionsUtilities"] = {innerHierarchyStack: ["MobileActivityActionsUtilities"]};
Ext.define("Terrasoft.Configuration.MobileActivityActionsUtilities", {
	alternateClassName: "Terrasoft.MobileActivityActionsUtilities",

	singleton: true,

	/**
	 * @private
	 */
	addExcludeFilterForColumn: function(parentFilter, columnRecord) {
		parentFilter.addFilter(Ext.create("Terrasoft.Filter", {
			isNot: true,
			property: "Participant",
			value: columnRecord.getId()
		}));
	},

	/**
	 * @private
	 */
	doCopyParticipants: function(config) {
		var records = config.records;
		var count = records.length;
		if (count <= 0) {
			Ext.callback(config.callback, config.scope);
			return;
		}
		var copiedRecords = 0;
		var success = function() {
			copiedRecords++;
			if (copiedRecords === count) {
				Ext.callback(config.callback, config.scope);
			}
		};
		var failure = function() {
			Terrasoft.Mask.hide();
		};
		for (var i = 0; i < count; i++) {
			var record = records[i];
			var copyRecord = record.copy();
			copyRecord.phantom = true;
			copyRecord.setProxyType(config.proxyType);
			copyRecord.set("Activity", config.newActivityId);
			copyRecord.save({
				queryConfig: config.queryConfig,
				success: success,
				failure: failure
			}, this);
		}
	},

	/**
	 * @private
	 */
	updateNonEmptyColumns: function(sourceRecord, targetRecord, columns) {
		for (var i = 0, ln = columns.length; i < ln; i++) {
			var columnName = columns[i];
			var sourceColumnValue = sourceRecord.get(columnName);
			if (sourceColumnValue) {
				targetRecord.set(columnName, sourceColumnValue);
			}
		}
	},

	getIntersectionActivityColumns: function() {
		return ["StartDate", "DueDate", "Type", "Status", "Title", "Owner", "Account", "Contact", "ShowInScheduler",
			"ActivityCategory", "Priority"];
	},

	/**
	 * @private
	 */
	saveCopyRecord: function(copyRecord, record, copyQueryConfig, callback, scope, proxyType) {
		var newActivityId = copyRecord.getId();
		copyRecord.setProxyType(proxyType);
		copyRecord.save({
			isCancelable: false,
			queryConfig: copyQueryConfig,
			success: function() {
				this.copyParticipants(newActivityId, record, callback, scope, proxyType);
			},
			failure: function() {
				Terrasoft.Mask.hide();
			}
		}, this);
	},

	doCopyActivityAction: function(config) {
		if (!Terrasoft.Object.isSimple(config)) {
			config = {
				record: arguments[0],
				callback: arguments[1],
				scope: arguments[2]
			};
		}
		if (!config.record) {
			Terrasoft.MessageBox.showMessage(Terrasoft.LocalizableStrings.MobileActivityActionsUtilitiesChooseAction);
			return;
		}
		Terrasoft.Mask.show();
		var columns = this.getIntersectionActivityColumns();
		var copyQueryConfig = Ext.create("Terrasoft.QueryConfig", {
			columns: columns,
			modelName: "Activity"
		});
		if (!Terrasoft.ModelCache.isEnabled()) {
			var copyRecord = config.record.copy();
			copyRecord.phantom = true;
			this.saveCopyRecord(copyRecord, config.record, copyQueryConfig, config.callback, config.scope, config.proxyType);
		} else {
			var selectedRecordModel = config.record.self;
			selectedRecordModel.createWithDefaultValues(
				function(copyRecord) {
					copyRecord.phantom = true;
					this.updateNonEmptyColumns(config.record, copyRecord, columns);
					this.saveCopyRecord(copyRecord, config.record, copyQueryConfig, config.callback, config.scope, config.proxyType);
				},
				function(exception) {
					Terrasoft.Mask.hide();
					Terrasoft.MessageBox.showException(exception);
				},
				this
			);
		}
	},

	copyParticipants: function(newActivityId, selectedRecord, callback, scope, proxyType) {
		var contact = selectedRecord.get("Contact");
		var owner = selectedRecord.get("Owner");
		var parentRecordFilter = Ext.create("Terrasoft.Filter", {
			type: Terrasoft.FilterTypes.Group,
			logicalOperation: Terrasoft.FilterLogicalOperations.And,
			subfilters: [{
				property: "Activity",
				value: selectedRecord.getId()
			}]
		});
		if (contact) {
			this.addExcludeFilterForColumn(parentRecordFilter, contact);
		}
		if (owner) {
			this.addExcludeFilterForColumn(parentRecordFilter, owner);
		}
		var participants = Ext.create("Terrasoft.store.BaseStore", {
			model: "ActivityParticipant"
		});
		var participantsQueryConfig = Ext.create("Terrasoft.QueryConfig", {
			columns: ["Activity", "Participant"],
			modelName: "ActivityParticipant"
		});
		participants.setPageSize(Terrasoft.AllRecords);
		participants.setProxyType(proxyType);
		participants.loadPage(1, {
			isCancelable: false,
			queryConfig: participantsQueryConfig,
			filters: parentRecordFilter,
			callback: function(records) {
				this.doCopyParticipants({
					records: records,
					newActivityId: newActivityId,
					queryConfig: participantsQueryConfig,
					callback: callback,
					scope: scope,
					proxyType: proxyType
				});
			},
			scope: this
		});
	},

	doDeleteActivityAction: function(config) {
		if (!Terrasoft.Object.isSimple(config)) {
			config = {
				record: arguments[0],
				callback: arguments[1],
				scope: arguments[2]
			};
		}
		if (!config.record) {
			Terrasoft.MessageBox.showMessage(Terrasoft.LocalizableStrings.MobileActivityActionsUtilitiesChooseAction);
			return;
		}
		var actionManager = Ext.create("Terrasoft.ActionManager");
		actionManager.add({
			name: "ActivityActionDelete",
			actionClassName: "Terrasoft.ActionDelete"
		});
		actionManager.on("executionend", config.callback, config.scope);
		actionManager.execute("ActivityActionDelete", config.record, {
			pageType: Terrasoft.PageTypes.Grid,
			proxyType: config.proxyType
		});
	}

});

Ext.define("Terrasoft.Configuration.ActionEmployeeEfficiency", {

	execute: function(config) {
		Terrasoft.Mask.show();
		var store = Ext.create("Terrasoft.store.BaseStore", {
			model: "Activity"
		});
		var queryConfig = Ext.create("Terrasoft.QueryConfig", {
			modelName: "Activity",
			expandLookupColumns: false,
			columns: ["Status", "Status.Finish", "DurationInMinutes"]
		});
		store.setPageSize(Terrasoft.AllRecords);
		store.setFilters(config.filters);
		store.load({
			queryConfig: queryConfig,
			callback: function(records, operation, success) {
				if (success) {
					var finishedActivities = Ext.Array.filter(records, function(record) {
						return record.get("Status.Finish") === true;
					});
					var totalDuration = 0;
					Ext.Array.each(finishedActivities, function(finishedActivity) {
						totalDuration += finishedActivity.get("DurationInMinutes");
					});
					var totalHours = parseInt(totalDuration / 60, 10);
					var minutesLeft = totalDuration - totalHours * 60;
					Terrasoft.Mask.hide();
					var message = Ext.String.format(Terrasoft.LocalizableStrings.ActionEmployeeEfficiencyMessageFormat,
						totalHours, minutesLeft);
					Terrasoft.MessageBox.showMessage(message);
				} else {
					Terrasoft.Mask.hide();
					Terrasoft.MessageBox.showException(operation.getError());
				}
			}
		});
	}

});


