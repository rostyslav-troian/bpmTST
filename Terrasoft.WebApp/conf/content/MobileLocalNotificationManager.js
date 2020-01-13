Terrasoft.configuration.Structures["MobileLocalNotificationManager"] = {innerHierarchyStack: ["MobileLocalNotificationManager"]};
Terrasoft.Configuration.SysSchemasUIds = Terrasoft.Configuration.SysSchemasUIds || {};
Terrasoft.Configuration.SysSchemasUIds.Activity = "c449d832-a4cc-4b01-b9d5-8a12c42a9f89";
Terrasoft.Configuration.ActivityEntitySchemaUId = Terrasoft.Configuration.SysSchemasUIds.Activity;

/**
 * @class Terrasoft.MobileLocalNotificationManager
 * ##### ######### ## ###### # ############# ########## ##########.
 */
Ext.define("Terrasoft.Configuration.MobileLocalNotificationManager", {
	extend: "Terrasoft.BaseLocalNotificationManager",
	alternateClassName: "Terrasoft.MobileLocalNotificationManager",

	/**
	 * @private
	 */
	notificationRecords: null,

	/**
	 * @private
	 */
	isNotificationClicked: false,

	/**
	 * @private
	 */
	getProcessingRemindings: function(scheduledItems, remindingRecords) {
		var scheduledItemsStr = JSON.stringify(scheduledItems);
		return Ext.Array.filter(remindingRecords, function(filterRecord) {
			var activityId = filterRecord.get("SubjectId");
			if (scheduledItemsStr.indexOf(activityId) === -1) {
				return filterRecord;
			}
		}, this);
	},

	/**
	 * ######## ###### ####### ###########.
	 * @protected
	 * @virtual
	 */
	getNotifications: function(callback) {
		this.callParent(arguments);
		var modelName = "VwRemindings";
		var store = Ext.create("Terrasoft.store.BaseStore", {
			model: modelName
		});
		var queryConfig = Ext.create("Terrasoft.QueryConfig", {
			columns: ["RemindTime", "SubjectId", "SubjectCaption"],
			modelName: modelName
		});
		store.setPageSize(Terrasoft.AllRecords);
		store.loadPage(1, {
			queryConfig: queryConfig,
			filters: Ext.create("Terrasoft.Filter", {
				type: Terrasoft.FilterTypes.Group,
				logicalOperation: Terrasoft.FilterLogicalOperations.And,
				subfilters: [
					{
						property: "Contact",
						valueIsMacros: true,
						value: Terrasoft.ValueMacros.CurrentUserContact
					},
					{
						property: "SysEntitySchemaId",
						value: Terrasoft.Configuration.SysSchemasUIds.Activity
					}
				]
			}),
			callback: function(records, operation, success) {
				this.notificationRecords = records;
				if (success !== true) {
					this.failureHandler(operation.getError());
				}
				Ext.callback(callback, this);
			},
			scope: this
		});
	},

	/**
	 * ####### ########### ## ###### ###### ####### ###########.
	 * @protected
	 * @virtual
	 */
	createNotifications: function(callback) {
		this.callParent(arguments);
		var records = this.notificationRecords;
		Terrasoft.LocalNotification.getAllScheduledItems({
			callback: function(scheduledItems) {
				var toProcessRecords = this.getProcessingRemindings(scheduledItems, records);
				var options = [];
				for (var i = 0, ln = toProcessRecords.length; i < ln; i++) {
					var record = toProcessRecords[i];
					var notificationId = Math.floor(Math.random() * 999999);
					var remindingId = record.getId();
					var addConfig = {
						id: notificationId,
						message: record.get("SubjectCaption"),
						data: JSON.stringify({
							remindingId: remindingId,
							activityId: record.get("SubjectId")
						}),
						sound: null,
						autoCancel: true
					};
					if (Ext.os.is.Android) {
						addConfig.title = "Creatio";
						addConfig.smallIcon = "res://icon_notification";
					}
					var fireDate = record.get("RemindTime");
					var now = new Date();
					if (now < fireDate) {
						addConfig.date = fireDate;
					}
					options.push(addConfig);
				}
				if (options.length > 0) {
					Terrasoft.LocalNotification.add({
						options: options,
						callback: callback
					});
				}
			},
			scope: this
		});
	},

	/**
	 * ########## ####### ## ###########.
	 * @protected
	 * @virtual
	 */
	onNotificationClick: function(notification) {
		var data = notification.data;
		if (Ext.isEmpty(data)) {
			return;
		}
		this.isNotificationClicked = true;
		var dataObj = JSON.parse(data);
		var activityId = dataObj.activityId;
		var remindingId = dataObj.remindingId;
		var modelName = "Activity";
		var self = this;
		this.checkIfRecordExists({
			recordId: activityId,
			modelName: modelName,
			callback: function(exists) {
				if (!exists) {
					return;
				}
				Terrasoft.util.getMainController().selectModule(modelName);
				setTimeout(function() {
					self.deleteRemindingRecord(remindingId, function() {
						Terrasoft.util.openPreviewPage(modelName, {
							recordId: activityId,
							isStartRecord: true
						});
					});
				}, 2000);
			}
		});
		Terrasoft.LocalNotification.cancel({
			id: notification.id
		});
	},

	/**
	 * ########## ###### ###########.
	 * @protected
	 * @virtual
	 */
	onNotificationClear: function(notification) {
		var data = notification.data;
		if (Ext.isEmpty(data)) {
			return;
		}
		var dataObj = JSON.parse(data);
		var remindingId = dataObj.remindingId;
		this.deleteRemindingRecord(remindingId);
	},

	/**
	 * ########## ########### ##########, ##### ## ####### ######.
	 * @protected
	 * @virtual
	 */
	onResume: function() {
		if (!this.isNotificationClicked) {
			this.callParent(arguments);
		}
		this.isNotificationClicked = false;
	},

	/**
	 * @private
	 */
	deleteRemindingRecord: function(remindingId, callback) {
		var modelName = "VwRemindings";
		var queryConfig = Ext.create("Terrasoft.QueryConfig", {
			modelName: modelName
		});
		var record = Ext.create(modelName, {Id: remindingId});
		record.erase({
			queryConfig: queryConfig,
			success: callback,
			failure: this.failureHandler,
			scope: this
		}, this);
	},

	/**
	 * @private
	 */
	failureHandler: function(exception) {
		Terrasoft.Logger.logException(Terrasoft.LogSeverityLevel.Error, exception);
	},

	/**
	 * @private
	 */
	checkIfRecordExists: function(config) {
		var modelName = config.modelName;
		var queryConfig = Ext.create("Terrasoft.QueryConfig", {
			modelName: modelName,
			columns: ["Id"]
		});
		var model = Ext.ClassManager.get(modelName);
		model.load(config.recordId, {
			queryConfig: queryConfig,
			success: function(record) {
				Ext.callback(config.callback, this, [!Ext.isEmpty(record)]);
			},
			failure: function(record, operation) {
				this.failureHandler(operation.getError());
				Ext.callback(config.callback, this, [false]);
			},
			scope: this
		});
	}

});

(function() {
	var localNotificationManager = Ext.create("Terrasoft.MobileLocalNotificationManager");
	localNotificationManager.processNotifications();
})();


