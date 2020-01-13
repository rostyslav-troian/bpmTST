Terrasoft.configuration.Structures["ActivitySyncSettingsTab"] = {innerHierarchyStack: ["ActivitySyncSettingsTab"], structureParent: "BaseSyncSettingsTab"};
define('ActivitySyncSettingsTabStructure', ['ActivitySyncSettingsTabResources'], function(resources) {return {schemaUId:'b6dbe7de-8d7d-45a4-bba1-e7710fa8d2da',schemaCaption: "Activity sync settings", parentSchemaName: "BaseSyncSettingsTab", schemaName:'ActivitySyncSettingsTab',parentSchemaUId:'b3e983b4-31c2-4f86-b53e-bd7d71ce32b8',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
Ext.ns("Terrasoft.enums.SyncSettings");
define("ActivitySyncSettingsTab", ["ActivitySyncSettingsTabResources", "ExchangeNUIConstants"],
	function(resources, ExchangeNuiConstants) {
	return {
		entitySchemaName: "ActivitySyncSettings",
		attributes: {
			/**
			 * Automation synchronization.
			 */
			"ExchangeAutoSyncActivity": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Value of radio group "Import appointments and meetings".
			 */
			"ImportAppointmentsRadioGroup": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Value of radio group "Import tasks".
			 */
			"ImportTasksRadioGroup": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Value of radio group "Export tasks and meetings".
			 */
			"ExportActivitiesRadioGroup": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Id of reference MailboxSyncSettings.
			 */
			"MailboxSyncSettingsId": {
				"dataValueType": this.Terrasoft.DataValueType.GUID,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Name of mailbox.
			 */
			"MailboxName": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Type of server.
			 */
			"ServerTypeId": {
				"dataValueType": this.Terrasoft.DataValueType.GUID,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"IsRecurringAppointmentsAllowed": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"value": Terrasoft.Features.getIsEnabled("ExchangeRecurringAppointments")
			}
		},
		methods: {
			/**
			 * @inheritDoc Terrasoft.BaseSyncSettingsTab#initDefaultValues
			 * @overridden
			 */
			initDefaultValues: function(callback, scope) {
				this.initMailboxSyncSettingValues();
				this.initEntity(function() {
					if (callback) {
						callback.call(scope || this);
					}
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.BaseSyncSettingsTab#loadFolders
			 * @overridden
			 */
			loadFolders: function(config, callback, scope) {
				if (config.folderClass === ExchangeNuiConstants.ExchangeFolder.BPMActivity) {
					this.getDynamicGroups(config, callback, scope || this);
				} else {
					this.callParent(arguments);
				}
			},

			/**
			 * @inheritDoc Terrasoft.BaseSyncSettingsTab#selectFolders
			 * @overridden
			 */
			selectFolders: function(config, callback, scope) {
				var folders = [];
				if (callback) {
					var parameterValue = this.get(config.nameOfFolders);
					if (parameterValue) {
						folders = this.Ext.decode(parameterValue);
					}
					callback.call(scope || this, folders);
				}
			},

			/**
			 * @inheritDoc Terrasoft.BaseSyncSettingsTab#getDefValuesConfig
			 * @overridden
			 */
			getDefValuesConfig: function() {
				return {
					columns: ["ImportTasks", "ImportTasksAll", "ImportTasksFromFolders", "ImportAppointments",
						"ImportAppointmentsAll", "ImpAppointmentsFromCalendars", "ExportActivities",
						"ExportActivitiesAll", "ExportActivitiesFromGroups",
						"ImportActivitiesFrom", "ImportAppointmentsCalendars", "ExportActivitiesGroups",
						"ImportTasksFolders", "ExchangeAutoSyncActivity"]
				};
			},

			/**
			 * @inheritDoc Terrasoft.BaseSyncSettingsTab#saveSettings
			 * @overridden
			 */
			saveSettings: function(callback, scope) {
				var folderParameters  = this.getFolderParameters();
				this.Terrasoft.each(folderParameters, function(folderParameter) {
					this.prepareChosenFoldersList(folderParameter);
				}, this);
				var update = this.getUpdateQuery();
				update.execute(function(result) {
					if (!(result && result.success)) {
						throw new Terrasoft.UnknownException({
							message: result.errorInfo.message
						});
					}
					callback.call(scope || this);
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.BaseSyncSettingsTab#onSaved
			 * @overridden
			 */
			onSaved: function() {
				var config = {
					tabName: this.get("TabName"),
					values: {
						isSaved: true,
						exchangeAutoSynchronizationActivity: this.get("ExchangeAutoSyncActivity"),
						importAppointments: this.get("ImportAppointments"),
						importTasks: this.get("ImportTasks"),
						exportActivities: this.get("ExportActivities")
					}
				};
				this.set("TabSavedValuesConfig", config);
				this.callParent(arguments);
			},

			/**
			 * @inheritDoc Terrasoft.BaseSyncSettingsTab#getUpdateQuery
			 * @overridden
			 */
			getUpdateQuery: function() {
				var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
				var updateActivitySettings = this.getUpdateQueryActivitySettings();
				var updateMailbox = this.getUpdateQueryMailbox();
				batchQuery.add(updateActivitySettings);
				batchQuery.add(updateMailbox);
				return batchQuery;
			},

			/**
			 * @inheritDoc Terrasoft.BaseSyncSettingsTab#getUpdateQueryMailbox
			 * @return {Terrasoft.UpdateQuery}
			 */
			getUpdateQueryMailbox: function() {
				var update = this.Ext.create("Terrasoft.UpdateQuery", {
					rootSchemaName: "MailboxSyncSettings"
				});
				var filters = update.filters;
				var mailboxSettingsId = this.get("MailboxSyncSettingsId");
				var idFilter = update.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"Id", mailboxSettingsId);
				filters.add("IdFilter", idFilter);
				update.setParameterValue("ExchangeAutoSyncActivity",
						this.get("ExchangeAutoSyncActivity"), this.Terrasoft.DataValueType.BOOLEAN);
				return update;
			},

			/**
			 * Generates update query for settings.
			 * @return {Terrasoft.UpdateQuery} Update query for settings.
			 */
			getUpdateQueryActivitySettings: function() {
				var update = this.Ext.create("Terrasoft.UpdateQuery", {
					rootSchemaName: this.entitySchemaName
				});
				var filters = update.filters;
				var settingsId = this.get("Id");
				var idFilter = update.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"Id", settingsId);
				filters.add("IdFilter", idFilter);
				update.setParameterValue("ImportTasks",
					this.get("ImportTasks"), this.Terrasoft.DataValueType.BOOLEAN);
				update.setParameterValue("ImportTasksAll",
					this.get("ImportTasksAll"), this.Terrasoft.DataValueType.BOOLEAN);
				update.setParameterValue("ImportTasksFromFolders",
					this.get("ImportTasksFromFolders"), this.Terrasoft.DataValueType.BOOLEAN);
				update.setParameterValue("ImportTasksFolders",
					this.getSelectedFolders("ImportTasksFolders", "ImportTasksFromFolders"),
					this.Terrasoft.DataValueType.TEXT);
				update.setParameterValue("ImportAppointments",
					this.get("ImportAppointments"), this.Terrasoft.DataValueType.BOOLEAN);
				update.setParameterValue("ImportAppointmentsAll",
					this.get("ImportAppointmentsAll"), this.Terrasoft.DataValueType.BOOLEAN);
				update.setParameterValue("ImpAppointmentsFromCalendars",
					this.get("ImpAppointmentsFromCalendars"), this.Terrasoft.DataValueType.BOOLEAN);
				update.setParameterValue("ImportAppointmentsCalendars",
					this.getSelectedFolders("ImportAppointmentsCalendars", "ImpAppointmentsFromCalendars"),
					this.Terrasoft.DataValueType.TEXT);
				update.setParameterValue("ExportActivities",
					this.get("ExportActivities"), this.Terrasoft.DataValueType.BOOLEAN);
				update.setParameterValue("ExportActivitiesAll",
					this.get("ExportActivitiesAll"), this.Terrasoft.DataValueType.BOOLEAN);
				update.setParameterValue("ExportActivitiesFromGroups",
					this.get("ExportActivitiesFromGroups"), this.Terrasoft.DataValueType.BOOLEAN);
				update.setParameterValue("ImportActivitiesFrom",
					this.get("ImportActivitiesFrom"), this.Terrasoft.DataValueType.DATE);
				update.setParameterValue("ExportActivitiesGroups",
					this.getSelectedFolders("ExportActivitiesGroups", "ExportActivitiesFromGroups"),
					this.Terrasoft.DataValueType.TEXT);
				if(this.$IsRecurringAppointmentsAllowed) {
					update.setParameterValue("AppointmentLastSyncDate", null, this.Terrasoft.DataValueType.DATE);
					update.setParameterValue("ActivitySyncPeriod", this.$ActivitySyncPeriod.value , this.Terrasoft.DataValueType.GUID);
				}
				return update;
			},

			/**
			 * Changes state of appointment radio group.
			 * @param {Boolean} value Flag import appointment.
			 */
			changeStateImportAppointmentRadioButtons: function(value) {
				if (!value) {
					this.set("ImportAppointmentsAll", true);
				}
				this.set("ImportAppointments", value);
			},

			/**
			 * Changes state of tasks radio group.
			 * @param {Boolean} value Flag import task.
			 */
			changeStateImportTasksRadioButtons: function(value) {
				if (!value) {
					this.set("ImportTasksAll", true);
				}
				this.set("ImportTasks", value);
			},

			/**
			 * Changes state of export activities radio group.
			 * @param {Boolean} value Flag export activity.
			 */
			changeStateExportActivitiesRadioButtons: function(value) {
				if (!value) {
					this.set("ExportActivitiesAll", true);
				}
				this.set("ExportActivities", value);
			},

			/**
			 * @inheritDoc Terrasoft.BaseSyncSettingsTab#setDefaultValues
			 * @overridden
			 */
			setDefaultValues: function() {
				this.callParent(arguments);
				this.subscribeViewModelEvents();
			},

			/**
			 * Subscribes for the events.
			 */
			subscribeViewModelEvents: function() {
				this.on("change:ImportAppointmentsAll", this.onActivitySyncParametersChanged, this);
				this.on("change:ImportTasksAll", this.onActivitySyncParametersChanged, this);
				this.on("change:ExportActivitiesAll", this.onActivitySyncParametersChanged, this);
			},

			/**
			 * Unsubscribes for the events.
			 */
			unsubscribeViewModelEvents: function() {
				this.un("change:ImportAppointmentsAll", this.onActivitySyncParametersChanged, this);
				this.un("change:ImportTasksAll", this.onActivitySyncParametersChanged, this);
				this.un("change:ExportActivitiesAll", this.onActivitySyncParametersChanged, this);
			},

			/**
			 * Set import or export parameters if activity synhronization parameters was changed.
			 * @param {Object} model Backbone model.
			 * @param {Boolean} value Value element flag.
			 */
			onActivitySyncParametersChanged: function(model, value) {
				var changedProperties = Object.getOwnPropertyNames(model.changed);
				if (!this.Ext.isEmpty(changedProperties)) {
					var changeProperty = changedProperties[0];
					switch (changeProperty) {
						case "ImportAppointmentsAll":
							this.set("ImpAppointmentsFromCalendars", !value);
							break;
						case "ImportTasksAll":
							this.set("ImportTasksFromFolders", !value);
							break;
						case "ExportActivitiesAll":
							this.set("ExportActivitiesFromGroups", !value);
							break;
						default :
							break;
					}
				}
			},

			/**
			 * @inheritDoc Terrasoft.BaseSyncSettingsTab#getFolderParameters
			 * @overridden
			 */
			getFolderParameters: function() {
				return [
					{
						foldersCollectionName: "FoldersGridData",
						folderClassName: ExchangeNuiConstants.ExchangeFolder.AppointmentClass.Name,
						nameOfFolders: "ImportAppointmentsCalendars",
						selectedRows: "SelectedRows"
					},
					{
						foldersCollectionName: "TasksFoldersGridData",
						folderClassName: ExchangeNuiConstants.ExchangeFolder.TaskClass.Name,
						nameOfFolders: "ImportTasksFolders",
						selectedRows: "TasksSelectedRows"
					},
					{
						foldersCollectionName: "ExportFoldersGridData",
						folderClass: ExchangeNuiConstants.ExchangeFolder.BPMActivity,
						nameOfFolders: "ExportActivitiesGroups",
						selectedRows: "ExportSelectedRows"
					}
				];
			},

			/**
			 * @inheritDoc Terrasoft.BaseSyncSettingsTab#onReloadTab
			 * @overridden
			 */
			onReloadTab: function() {
				var newType = this.sandbox.publish("GetMailboxSyncSettingValues", {columns: ["ServerTypeId"]});
				if (newType.ServerTypeId === ExchangeNuiConstants.MailServer.Type.Exchange) {
					this.callParent(arguments);
				}
			},

			/**
			 * @inheritDoc Terrasoft.BaseSchemaModule#destroy
			 * @overridden
			 */
			destroy: function() {
				this.unsubscribeViewModelEvents();
				this.callParent(arguments);
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "SyncContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ExchangeAutoSynchronization",
				"parentName": "SyncContainer",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.ExchangeAutoSynchronization"},
					"bindTo": "ExchangeAutoSyncActivity",
					"controlConfig": {
						"className": "Terrasoft.ToggleEdit"
					},
					"wrapClass": ["settings-page-reverse-toggle-edit"]
				}
			},
			{
				"operation": "insert",
				"name": "ImportActivitiesFrom",
				"parentName": "SyncContainer",
				"propertyName": "items",
				"values": {
					"bindTo": "ImportActivitiesFrom",
					"wrapClass": ["settings-page-import-from-date"],
					"styles": {
						"margin-left": "45px"
					},
					"visible": {
						"bindTo": "IsRecurringAppointmentsAllowed",
						"bindConfig": {"converter": "invertBooleanValue"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "ActivitySyncPeriod",
				"parentName": "SyncContainer",
				"propertyName": "items",
				"values": {
					"className": "Terrasoft.ComboBoxEdit",
					"dataValueType": Terrasoft.DataValueType.ENUM,
					"bindTo": "ActivitySyncPeriod",
					"wrapClass": ["settings-page-import-from-period"],
					"styles": {
						"margin-left": "45px"
					},
					"visible": {
						"bindTo": "IsRecurringAppointmentsAllowed"
					}
				}
			},
			{
				"operation": "insert",
				"name": "ImportContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ImportAppointments",
				"parentName": "ImportContainer",
				"propertyName": "items",
				"index": 0,
				"values": {
					"bindTo": "ImportAppointments",
					"controlConfig": {
						"checkedchanged": {"bindTo": "changeStateImportAppointmentRadioButtons"},
						"className": "Terrasoft.ToggleEdit"
					},
					"wrapClass": ["settings-page-reverse-toggle-edit"]
				}
			},
			{
				"operation": "insert",
				"name": "ImportAppointmentsRadioGroup",
				"parentName": "ImportContainer",
				"propertyName": "items",
				"index": 1,
				"values": {
					"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
					"value": {"bindTo": "ImportAppointmentsAll"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ImportAppointmentsAll",
				"parentName": "ImportAppointmentsRadioGroup",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.LoadAllAppointments"},
					"enabled": {"bindTo": "ImportAppointments"},
					"value": true
				}
			},
			{
				"operation": "insert",
				"name": "ImpAppointmentsFromCalendars",
				"parentName": "ImportAppointmentsRadioGroup",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.LoadAppointmentsFromCalendars"},
					"enabled": {"bindTo": "ImportAppointments"},
					"value": false
				}
			},
			{
				"operation": "insert",
				"parentName": "ImportContainer",
				"propertyName": "items",
				"name": "ImportAppointmentsGridContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"visible": {"bindTo": "ImpAppointmentsFromCalendars"},
					"items": []
				}
			},
			{
				"operation": "move",
				"parentName": "ImportAppointmentsGridContainer",
				"propertyName": "items",
				"name": "FoldersGrid",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ImportTasks",
				"parentName": "ImportContainer",
				"propertyName": "items",
				"values": {
					"bindTo": "ImportTasks",
					"controlConfig": {
						"checkedchanged": {"bindTo": "changeStateImportTasksRadioButtons"},
						"className": "Terrasoft.ToggleEdit"
					},
					"wrapClass": ["settings-page-reverse-toggle-edit"]
				}
			},
			{
				"operation": "insert",
				"name": "ImportTasksRadioGroup",
				"parentName": "ImportContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
					"value": {"bindTo": "ImportTasksAll"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ImportTasksAll",
				"parentName": "ImportTasksRadioGroup",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.LoadAllTasks"},
					"enabled": {"bindTo": "ImportTasks"},
					"value": true
				}
			},
			{
				"operation": "insert",
				"name": "ImportTasksFromFolders",
				"parentName": "ImportTasksRadioGroup",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.LoadTasksFromFolders"},
					"enabled": {"bindTo": "ImportTasks"},
					"value": false
				}
			},
			{
				"operation": "insert",
				"parentName": "ImportContainer",
				"propertyName": "items",
				"name": "ImportGridContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"visible": {"bindTo": "ImportTasksFromFolders"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "ImportGridContainer",
				"propertyName": "items",
				"name": "TasksFoldersGrid",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID,
					"hierarchical": true,
					"multiSelect": {"bindTo": "IsMultiSelect"},
					"primaryColumnName": "Id",
					"collection": {"bindTo": "TasksFoldersGridData"},
					"hierarchicalColumnName": "ParentId",
					"expandHierarchyLevels": {"bindTo": "ExpandHierarchyFrom"},
					"activeRow": {bindTo: "ActiveRow"},
					"selectedRows": {bindTo: "TasksSelectedRows"},
					"selectRow": {"bindTo": "onItemFocused"},
					"type": "listed",
					"listedConfig": {
						"name": "TasksFoldersGridListedConfig",
						"items": [
							{
								name: "TasksFolderNameListedGridColumn",
								bindTo: "Name",
								position: {column: 1, colSpan: 24}
							}
						]
					},
					tiledConfig: {
						name: "TasksFoldersGridTiledConfig",
						grid: {
							columns: 24,
							rows: 1
						},
						items: [
							{
								name: "TasksFolderNameTiledGridColumn",
								bindTo: "Name",
								position: {row: 1, column: 1, colSpan: 24}
							}
						]
					}
				}
			},
			{
				"operation": "insert",
				"name": "ExportContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ExportActivities",
				"parentName": "ExportContainer",
				"propertyName": "items",
				"index": 0,
				"values": {
					"bindTo": "ExportActivities",
					"controlConfig": {
						"checkedchanged": {"bindTo": "changeStateExportActivitiesRadioButtons"},
						"className": "Terrasoft.ToggleEdit"
					},
					"wrapClass": ["settings-page-reverse-toggle-edit"]
				}
			},
			{
				"operation": "insert",
				"name": "ExportActivitiesRadioGroup",
				"parentName": "ExportContainer",
				"propertyName": "items",
				"index": 1,
				"values": {
					"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
					"value": {"bindTo": "ExportActivitiesAll"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ExportActivitiesAll",
				"parentName": "ExportActivitiesRadioGroup",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.ExportActivitiesAllCaption"},
					"enabled": {"bindTo": "ExportActivities"},
					"value": true
				}
			},
			{
				"operation": "insert",
				"name": "ExportActivitiesFromGroups",
				"parentName": "ExportActivitiesRadioGroup",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.ExportActivitiesFromGroupsCaption"},
					"enabled": {"bindTo": "ExportActivities"},
					"value": false
				}
			},
			{
				"operation": "insert",
				"parentName": "ExportContainer",
				"propertyName": "items",
				"name": "ExportGridContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"visible": {"bindTo": "ExportActivitiesFromGroups"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ExportFoldersGrid",
				"parentName": "ExportGridContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID,
					"hierarchical": true,
					"multiSelect": {"bindTo": "IsMultiSelect"},
					"primaryColumnName": "Id",
					"collection": {"bindTo": "ExportFoldersGridData"},
					"hierarchicalColumnName": "ParentId",
					"expandHierarchyLevels": {"bindTo": "ExportExpandHierarchyFrom"},
					"activeRow": {bindTo: "ActiveRow"},
					"selectedRows": {bindTo: "ExportSelectedRows"},
					"selectRow": {"bindTo": "onItemFocused"},
					"type": "listed",
					"listedConfig": {
						"name": "ExportFoldersGridListedConfig",
						"items": [
							{
								name: "ExportFolderNameListedGridColumn",
								bindTo: "Name",
								position: {column: 1, colSpan: 24}
							}
						]
					},
					tiledConfig: {
						name: "ExportFoldersGridTiledConfig",
						grid: {
							columns: 24,
							rows: 1
						},
						items: [
							{
								name: "ExportFolderNameTiledGridColumn",
								bindTo: "Name",
								position: {row: 1, column: 1, colSpan: 24}
							}
						]
					}
				}
			}
		]
	};
});


