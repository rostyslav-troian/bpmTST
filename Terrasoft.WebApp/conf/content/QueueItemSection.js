Terrasoft.configuration.Structures["QueueItemSection"] = {innerHierarchyStack: ["QueueItemSection"], structureParent: "BaseSectionV2"};
define('QueueItemSectionStructure', ['QueueItemSectionResources'], function(resources) {return {schemaUId:'89482e4c-e232-4895-b0ad-28eef7d0044d',schemaCaption: "Queue Item Section", parentSchemaName: "BaseDataView", schemaName:'QueueItemSection',parentSchemaUId:'22e2cf10-98b4-4c3c-bc28-346238e15c21',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("QueueItemSection", ["OperatorSingleWindowConstants", "QueueClientNotificationUtilities",
		"QueueItemSectionResources", "QueueItemSectionViewHelper", "QueueSortUtilities", "QueueItemSectionRowViewModel",
		"QueueProcessUtilities", "css!QueueSectionStyle"],
	function(OperatorSingleWindowConstants, QueueClientNotificationUtilities, resources) {
		return {
			entitySchemaName: "VwQueueItem",
			mixins: {

				/**
				 * @class Terrasoft.QueueSortUtilities implements queue sorting features.
				 */
				QueueSortUtilities: "Terrasoft.QueueSortUtilities",

				/**
				 * @class QueueProcessUtilities implements queue process features.
				 */
				QueueProcessUtilities: "Terrasoft.QueueProcessUtilities"
			},
			messages: {

				/**
				 * @message GetModuleSchema
				 * Returns quick filter entity information.
				 */
				"GetModuleSchema": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			attributes: {

				/**
				 * Indicates that processed queue items are displayed in the section list.
				 * @type {Boolean}
				 */
				"ShowProcessedQueueItem": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},

				/**
				 * Indicates that section list has the same sorting as the agent desktop's one.
				 * @type {Boolean}
				 */
				"UseAgentViewSorting": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},

				/**
				 * Queues settings section module name.
				 * @type {String}
				 */
				"QueuesSettingsModuleName": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"value": "SupervisorSingleWindowSectionV2"
				},

				/**
				 * Queues settings view name.
				 * @type {String}
				 */
				"QueuesSettingsDataViewName": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"value": "QueuesSettingsDataView"
				},

				/**
				 * Queues columns sort config.
				 * @type {Object[]}
				 */
				"QueueColumnsSortConfig": {
					"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
					"value": []
				}

			},
			methods: {

				//region Methods: Protected

				loadProfileFilters: function() {
					this.loadCheckboxAttributeFromProfile("ShowProcessedQueueItem");
					this.loadCheckboxAttributeFromProfile("UseAgentViewSorting");
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#init
				 * @overridden
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						QueueClientNotificationUtilities.subscribeForQueuesNotifications();
						this.initQueueSortingConfig(function() {
							callback.call(scope);
						});
						this.subscribeEvents();
					}, this]);
					this.setActiveViewFromHistoryState();
					this.initQuickFilters();
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getGridRowViewModelClassName
				 * @overridden
				 */
				getGridRowViewModelClassName: function() {
					return "Terrasoft.QueueItemSectionRowViewModel";
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#initFixedFiltersConfig
				 * @overridden
				 */
				initFixedFiltersConfig: function() {
					var fixedFilterConfig = {
						entitySchema: this.entitySchema,
						filters: this.getFixedFiltersConfig()
					};
					this.set("FixedFilterConfig", fixedFilterConfig);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getFilters
				 * @overridden
				 */
				getFilters: function() {
					var filters = this.callParent(arguments);
					var showProcessedQueueItem = this.get("ShowProcessedQueueItem");
					filters.removeByKey("ShowProcessedQueueItemFilter");
					if (!showProcessedQueueItem) {
						filters.add("ShowProcessedQueueItemFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Status.IsFinal", false));
					}
					return filters;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getDefaultGridDataViewCaption
				 * @overridden
				 */
				getDefaultGridDataViewCaption: function() {
					return this.get("Resources.Strings.GridDataViewCaption");
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getDefaultAnalyticsDataViewCaption
				 * @overridden
				 */
				getDefaultAnalyticsDataViewCaption: function() {
					return this.get("Resources.Strings.AnalyticsDataViewCaption");
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getDefaultDataViews
				 * @overridden
				 */
				getDefaultDataViews: function() {
					var gridDataViews = this.callParent();
					var defaultGridDataViewCaption = this.getDefaultGridDataViewCaption();
					Ext.apply(gridDataViews.GridDataView, {
						"index": 0,
						"hint": defaultGridDataViewCaption,
						"markerValue": defaultGridDataViewCaption
					});
					var queuesSettingsDataViewCaption = this.get("Resources.Strings.QueuesSettingsDataViewCaption");
					gridDataViews.QueuesSettingsDataView = {
						"index": 1,
						"name": this.get("QueuesSettingsDataViewName"),
						"icon": this.get("Resources.Images.QueuesSettingsDataViewIcon"),
						"hint": queuesSettingsDataViewCaption,
						"markerValue": queuesSettingsDataViewCaption
					};
					Ext.apply(gridDataViews.AnalyticsDataView, {
						"index": 2
					});
					return gridDataViews;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getFolderEntitiesNames
				 * @overridden
				 */
				getFolderEntitiesNames: function() {
					var config = this.callParent(arguments);
					config.folderSchemaName = "QueueItemFolder";
					config.inFolderSchemaName = "BaseItemInFolder";
					return config;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getFolderManagerConfig
				 * @overridden
				 */
				getFolderManagerConfig: function() {
					var config = this.callParent(arguments);
					config.entitySchemaName = "QueueItemFolder";
					config.inFolderEntitySchemaName = "BaseItemInFolder";
					return config;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getActiveViewName
				 * @overridden
				 */
				getActiveViewName: function() {
					return this.get("ActiveViewName") || this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getSectionActions
				 * @overridden
				 */
				getSectionActions: function() {
					var actionMenuItems = this.callParent(arguments);
					actionMenuItems.addItem(this.getButtonMenuItem({
						Type: "Terrasoft.MenuSeparator"
					}));
					actionMenuItems.addItem(this.getButtonMenuItem({
						Caption: {bindTo: "Resources.Strings.AssignOperatorActionCaption"},
						Click: {bindTo: "onAssignOperatorMenuItemClick"},
						Enabled: {bindTo: "isAnySelected"}
					}));
					actionMenuItems.addItem(this.getButtonMenuItem({
						Caption: {bindTo: "Resources.Strings.ClearOperatorActionCaption"},
						Click: {bindTo: "onClearOperatorMenuItemClick"},
						Enabled: {bindTo: "isAnySelected"}
					}));
					actionMenuItems.addItem(this.getButtonMenuItem({
						Caption: {bindTo: "Resources.Strings.ChangeStatusMenuItemCaption"},
						Click: {bindTo: "onChangeStatusMenuItemClick"},
						Enabled: {bindTo: "isAnySelected"}
					}));
					return actionMenuItems;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#changeDataView
				 * @overridden
				 */
				changeDataView: function(view) {
					if (view.tag === this.get("QueuesSettingsDataViewName")) {
						this.loadQueuesSettingsDataView();
					} else {
						this.callParent(arguments);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#onActiveRowAction
				 * @overridden
				 */
				onActiveRowAction: function(buttonTag, primaryColumnValue) {
					if (buttonTag === "runProcess") {
						this.mixins.QueueProcessUtilities.executeQueueItemProcess.call(this, primaryColumnValue, true,
							function(canRunQueueItemProcess) {
								if (!canRunQueueItemProcess) {
									this.set("ActiveRow", null);
									this.reloadGridData();
								}
							}.bind(this)
						);
					} else {
						this.callParent(arguments);
					}
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#initQueryColumns
				 * @overridden
				 */
				initQueryColumns: function(esq) {
					this.mixins.GridUtilities.initQueryColumns.apply(this, arguments);
					if (this.get("UseAgentViewSorting")) {
						this.addQueueSortColumns(esq, this.get("QueueColumnsSortConfig"));
					}
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#initQuerySorting
				 * @overridden
				 */
				initQuerySorting: function(esq) {
					this.mixins.GridUtilities.initQuerySorting.apply(this, arguments);
					if (this.get("UseAgentViewSorting")) {
						this.initQueueQuerySorting(esq, this.get("QueueColumnsSortConfig"));
					}
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#sortColumn
				 * @overridden
				 */
				sortColumn: function() {
					if (!this.get("UseAgentViewSorting")) {
						this.mixins.GridUtilities.sortColumn.apply(this, arguments);
					}
				},

				/*
				 * @inheritdoc Terrasoft.GridUtilities#addGridDataColumns
				 * @overridden
				 */
				addGridDataColumns: function(esq) {
					this.callParent(arguments);
					esq.addColumn("Status.IsFinal");
				},

				/**
				 * @inheritdoc Terrasoft.WizardUtilities#canUseWizard
				 * @overridden
				 */
				canUseWizard: function(callback, scope) {
					callback.call(scope, false);
				},

				/**
				 * @inheritdoc Terrasoft.QueueSortUtilities#getInitialQueueSortConfig
				 * @overridden
				 */
				getInitialQueueSortConfig: function() {
					var sortConfig = this.mixins.QueueSortUtilities.getInitialQueueSortConfig.apply(this, arguments);
					sortConfig.push({
						"name": "Queue.QueueEntitySchema.Name",
						"orderPosition": 4,
						"orderDirection": Terrasoft.OrderDirection.ASC
					});
					return sortConfig;
				},

				/**
				 * Subscribes on model events.
				 * @protected
				 */
				subscribeEvents: function() {
					this.on("change:UseAgentViewSorting", this.onUseAgentViewChanged.bind(this));
					this.on("change:ShowProcessedQueueItem", this.onShowProcessedQueueItemChanged.bind(this));
				},

				/**
				 * Initiates quick filters config.
				 * @protected
				 */
				initQuickFilters: function() {
					this.sandbox.subscribe("GetModuleSchema", function() {
						return {
							entitySchema: this.entitySchema,
							filterDefaultColumnName: "Contact",
							isShortFilterVisible: false
						};
					}, this, [this.getQuickFilterModuleId()]);
				},

				/**
				 * Initializes sorting options.
				 * @param {Function} callback The callback function.
				 * @protected
				 */
				initQueueSortingConfig: function(callback) {
					this.queryColumnsSortConfig({
						callback: function(sortConfig) {
							this.set("QueueColumnsSortConfig", sortConfig);
							callback();
						}.bind(this)
					});
				},

				/**
				 * Loads queues settings view.
				 * @protected
				 */
				loadQueuesSettingsDataView: function() {
					var viewName = this.get("QueuesSettingsDataViewName");
					this.saveActiveViewNameToProfile(viewName);
					var queuesSettingsModuleName = this.get("QueuesSettingsModuleName");
					this.sandbox.publish("PushHistoryState", {
						hash: this.Terrasoft.combinePath("SectionModuleV2", queuesSettingsModuleName),
						stateObj: {
							module: "SectionModuleV2",
							schemas: [queuesSettingsModuleName]
						}
					});
				},

				/**
				 * Sets active view from history state.
				 * @protected
				 */
				setActiveViewFromHistoryState: function() {
					var state = this.sandbox.publish("GetHistoryState").state;
					this.set("ActiveViewName", state.ActiveViewName);
				},

				/**
				 * Loads checkbox checked attribute from profile.
				 * @param {String} attributeName Checkbox checked attribute name.
				 * @protected
				 */
				loadCheckboxAttributeFromProfile: function(attributeName) {
					var profile = this.get("ActiveViewSettingsProfile");
					if (this.Ext.isEmpty(profile)) {
						return;
					}
					var attributeProfile = profile[attributeName];
					if (attributeProfile && this.Ext.isBoolean(attributeProfile.checked)) {
						this.set(attributeName, attributeProfile.checked);
					}
				},

				/**
				 * Saves checkbox checked attribute in profile.
				 * @param {String} attributeName Checkbox checked attribute name.
				 * @param {Boolean} checked Is checkbox checked.
				 * @protected
				 */
				saveCheckboxAttributeInProfile: function(attributeName, checked) {
					var profileKey = this.getActiveViewSettingsProfileKey();
					var profile = this.get("ActiveViewSettingsProfile") || {};
					var attributeProfile = profile[attributeName] || {};
					if (attributeProfile.checked === checked) {
						return;
					}
					attributeProfile.checked  = checked;
					profile[attributeName] = attributeProfile;
					this.set("ActiveViewSettingsProfile", profile);
					this.Terrasoft.utils.saveUserProfile(profileKey, profile, false);
				},

				/**
				 * Returns an array of fixed filters configurations.
				 * @protected
				 * @return {Object[]} Array of fixed filters configurations.
				 *
				 */
				getFixedFiltersConfig: function() {
					return [
						this.getOperatorFixedFiltersConfig(),
						this.getQueueFixedFiltersConfig()
					];
				},

				/**
				 * Returns a fixed filter configuration for operator column.
				 * @protected
				 * @return {Object} Fixed filter configuration.
				 */
				getOperatorFixedFiltersConfig: function() {
					return {
						name: "Operator",
						markerValue: "OperatorFixedFilter",
						caption: this.get("Resources.Strings.OperatorFixedFilterCaption"),
						addNewFilterCaption: this.get("Resources.Strings.AddOperatorFixedFilterCaption"),
						columnName: "Operator",
						appendCurrentContactMenuItem: false,
						dataValueType: this.Terrasoft.DataValueType.LOOKUP,
						hint: null,
						filter: function() {
							return Terrasoft.createColumnIsNotNullFilter("[SysAdminUnit:Contact].Id");
						}
					};
				},

				/**
				 * Returns a fixed filter configuration for queue column.
				 * @protected
				 * @return {Object} Fixed queue configuration.
				 */
				getQueueFixedFiltersConfig: function() {
					return {
						name: "Queue",
						markerValue: "QueueFixedFilter",
						caption: this.get("Resources.Strings.QueueFixedFilterCaption"),
						addNewFilterCaption: this.get("Resources.Strings.AddQueueFixedFilterCaption"),
						columnName: "Queue",
						buttonImageConfig: this.get("Resources.Images.QueueItemsSectionSmallIcon"),
						appendCurrentContactMenuItem: false,
						dataValueType: this.Terrasoft.DataValueType.LOOKUP,
						hint: null
					};
				},

				/**
				 * Callback-function that is called after operator is selected in lookup window.
				 * @protected
				 * @param {Object} response Arguments that contains selected operator identifiers.
				 */
				assignOperatorCallback: function(response) {
					if (!response || !response.selectedRows || response.selectedRows.isEmpty()) {
						return;
					}
					var operator = response.selectedRows.getByIndex(0);
					this.assignOperator(operator.value);
				},

				/**
				 * Assigns operator for selected queue items.
				 * @protected
				 * @param {String} operatorId Operator identifier.
				 */
				assignOperator: function(operatorId) {
					var items = this.getSelectedItems();
					var mask = this.Terrasoft.Mask;
					var maskId = mask.show();
					this.changeQueueItemsOperators(items, operatorId, function(rowsAffected) {
						mask.hide(maskId);
						if (Ext.isEmpty(rowsAffected)) {
							return;
						}
						items.forEach(function(id) {
							this.loadGridDataRecord(id);
						}, this);
						var message = Ext.String.format(
							this.get("Resources.Strings.QueueItemsUpdatedMessage"), rowsAffected);
						this.showInformationDialog(message);
					}.bind(this));
				},

				/**
				 * Executes the change queue items status action.
				 * @protected
				 */
				executeChangeQueueItemsStatusAction: function() {
					var items = this.getSelectedItems();
					if (!items || !items.length) {
						return;
					}
					this.openQueueItemStatusesLookup(function(response) {
						if (!response || !response.selectedRows || response.selectedRows.isEmpty()) {
							return;
						}
						var queueStatus = response.selectedRows.getByIndex(0);
						var maskId = this.Terrasoft.Mask.show();
						this.changeQueueItemsStatus(items, queueStatus.value, function(rowsAffected) {
							this.Terrasoft.Mask.hide(maskId);
							if (Ext.isEmpty(rowsAffected)) {
								return;
							}
							items.forEach(function(id) {
								this.loadGridDataRecord(id);
							}, this);
							var message = Ext.String.format(
								this.get("Resources.Strings.QueueItemsUpdatedMessage"), rowsAffected);
							this.showInformationDialog(message);
						}.bind(this));
					}.bind(this));
				},

				/**
				 * Opens the queue items statuses lookup.
				 * @param {Function} callback The callback function.
				 */
				openQueueItemStatusesLookup: function(callback) {
					var config = {
						entitySchemaName: "QueueItemStatus"
					};
					var filters = this.Terrasoft.createFilterGroup();
					filters.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
					filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL,
						"Id",
						OperatorSingleWindowConstants.QueueItemStatuses.NOT_PROCESSED,
						this.Terrasoft.DataValueType.LOOKUP));
					filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "IsFinal", true, this.Terrasoft.DataValueType.BOOLEAN));
					config.filters = filters;
					this.openLookup(config, callback, this);
				},

				/**
				 * Changes the queue items operator.
				 * @param {String[]} queueItemIds Queue item identifiers.
				 * @param {String} operatorId Operator identifier.
				 * @param {Function} callback The callback function to call when the update completed.
				 * @param {Number} [callback.rowsAffected] Rows count affected by update. Empty if the operation is
				 * cancelled.
				 */
				changeQueueItemsOperators: function(queueItemIds, operatorId, callback) {
					var update = this.Ext.create("Terrasoft.UpdateQuery", {rootSchemaName: "QueueItem"});
					var filters = update.filters;
					filters.add("IdFilter", update.createColumnInFilterWithParameters("Id", queueItemIds));
					var terrasoft = this.Terrasoft;
					var dataValueType = terrasoft.DataValueType;
					if (operatorId) {
						var filterGroup = terrasoft.createFilterGroup();
						filterGroup.logicalOperation = terrasoft.LogicalOperatorType.OR;
						filterGroup.add("EmptyOperatorFilter", update.createColumnIsNullFilter("Operator"));
						filterGroup.add("AnotherOperatorFilter", update.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.NOT_EQUAL, "Operator", operatorId));
						filters.add("AnotherOperatorFilters", filterGroup);
					} else {
						filters.add("NotEmptyOperatorFilter", update.createColumnIsNotNullFilter("Operator"));
					}
					update.setParameterValue("Operator", operatorId ? operatorId : null, dataValueType.LOOKUP);
					update.execute(function(result) {
						if (!result.success) {
							callback();
							return;
						}
						callback(result.rowsAffected);
					}, this);
				},

				/**
				 * Changes the queue items status.
				 * @param {String[]} queueItemIds Queue item identifiers.
				 * @param {String} status New status.
				 * @param {Function} callback The callback function to call when the update completed.
				 * @param {Number} [callback.rowsAffected] Rows count affected by update. Empty if the operation is
				 * cancelled.
				 */
				changeQueueItemsStatus: function(queueItemIds, status, callback) {
					if (queueItemIds.length === 0) {
						callback();
						return;
					}
					var update = this.Ext.create("Terrasoft.UpdateQuery", {rootSchemaName: "QueueItem"});
					var filters = update.filters;
					filters.add("IdFilter", update.createColumnInFilterWithParameters("Id", queueItemIds));
					var dataValueType = this.Terrasoft.DataValueType;
					filters.add("NotNewStatusFilter", update.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.NOT_EQUAL, "Status", status, dataValueType.LOOKUP));
					update.setParameterValue("Status", status, dataValueType.LOOKUP);
					if (status === OperatorSingleWindowConstants.QueueItemStatuses.NOT_PROCESSED) {
						update.setParameterValue("SysProcessDataId", null, dataValueType.GUID);
					}
					update.execute(function(result) {
						if (!result.success) {
							callback();
							return;
						}
						callback(result.rowsAffected);
					}, this);
				},

				/**
				 * Indicates checkbox fixed filters are visible.
				 * @protected
				 * @return {Boolean}
				 */
				getAreFixedFilterCheckboxesVisible: function() {
					return (this.getActiveViewName() !== this.get("AnalyticsDataViewName"));
				},

				/**
				 * Handles Show Processed Label 'click' event.
				 * @protected
				 */
				onShowProcessedQueueItemFilterClick: function() {
					this.set("ShowProcessedQueueItem", !this.get("ShowProcessedQueueItem"));
				},

				/**
				 * Handles ShowProcessedQueueItem attribute value changed.
				 * @protected
				 * @param {Backbone.Model} model The model.
				 * @param {Boolean} showProcessedQueueItem The new attribute value.
				 */
				onShowProcessedQueueItemChanged: function(model, showProcessedQueueItem) {
					this.set("IsClearGridData", true);
					this.deselectRows();
					this.afterFiltersUpdated();
					this.saveCheckboxAttributeInProfile("ShowProcessedQueueItem", showProcessedQueueItem);
				},

				/**
				 * Handles Agent view Label 'click' event.
				 * @protected
				 */
				onUseAgentViewLabelButtonClick: function() {
					this.set("UseAgentViewSorting", !this.get("UseAgentViewSorting"));
				},

				/**
				 * Handles UseAgentView attribute value changed.
				 * @param {Backbone.Model} model The model.
				 * @param {Boolean} useAgentView The new attribute value.
				 */
				onUseAgentViewChanged: function(model, useAgentView) {
					if (useAgentView) {
						this.set("SortColumnIndex", -1);
						this.reloadGridData();
					}
					this.set("IsSortMenuVisible", !useAgentView);
					this.saveCheckboxAttributeInProfile("UseAgentViewSorting", useAgentView);
				},

				/**
				 * Handles Assign operator menu item 'click' event.
				 * @protected
				 */
				onAssignOperatorMenuItemClick: function() {
					var config = {
						entitySchemaName: "Contact",
						columns: ["Name"]
					};
					var filters = this.Ext.create("Terrasoft.FilterGroup");
					filters.addItem(this.Terrasoft.createColumnIsNotNullFilter("[SysAdminUnit:Contact].Id"));
					config.filters = filters;
					this.openLookup(config, this.assignOperatorCallback, this);
				},

				/**
				 * Handles Clear operator menu item 'click' event.
				 * @protected
				 */
				onClearOperatorMenuItemClick: function() {
					this.assignOperator();
				},

				/**
				 * Handles Change status menu item 'click' event.
				 * @protected
				 */
				onChangeStatusMenuItemClick: function() {
					this.executeChangeQueueItemsStatusAction();
				}

				//endregion

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "AgentViewMode",
					"parentName": "LeftGridUtilsContainer",
					"index": 0,
					"propertyName": "items",
					"values": {
						"checked": {"bindTo": "UseAgentViewSorting"},
						"visible": {"bindTo": "getAreFixedFilterCheckboxesVisible"},
						"caption": {"bindTo": "Resources.Strings.AgentViewCheckboxCaption"},
						"labelButtonClick": {"bindTo": "onUseAgentViewLabelButtonClick"},
						"generator": "QueueItemSectionViewHelper.getFixedFilterCheckboxGenerator"
					}
				},
				{
					"operation": "insert",
					"name": "ShowProcessedQueueItemFilter",
					"parentName": "LeftGridUtilsContainer",
					"index": 1,
					"propertyName": "items",
					"values": {
						"checked": {"bindTo": "ShowProcessedQueueItem"},
						"visible": {"bindTo": "getAreFixedFilterCheckboxesVisible"},
						"caption": {"bindTo": "Resources.Strings.ShowProcessedCheckboxCaption"},
						"labelButtonClick": {"bindTo": "onShowProcessedQueueItemFilterClick"},
						"generator": "QueueItemSectionViewHelper.getFixedFilterCheckboxGenerator"
					}
				},
				{
					"operation": "merge",
					"name": "SeparateModeAddRecordButton",
					"values": {
						"visible": false
					}
				},

				{
					"operation": "merge",
					"name": "CombinedModeAddRecordButton",
					"values": {
						"visible": false
					}
				},
				{
					"operation": "merge",
					"name": "DataGridActiveRowOpenAction",
					"values": {
						"visible": false
					}
				},
				{
					"operation": "merge",
					"name": "DataGridActiveRowCopyAction",
					"values": {
						"visible": false
					}
				},
				{
					"operation": "insert",
					"name": "ProcessRunButton",
					"parentName": "DataGrid",
					"propertyName": "activeRowActions",
					"index": 0,
					"values": {
						"className": "Terrasoft.Button",
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"caption": resources.localizableStrings.RunProcessButtonCaption,
						"tag": "runProcess",
						"visible": {
							"bindTo": "getRunProcessButtonVisible"
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


