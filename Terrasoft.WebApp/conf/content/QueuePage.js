Terrasoft.configuration.Structures["QueuePage"] = {innerHierarchyStack: ["QueuePage"]};
define('QueuePageStructure', ['QueuePageResources'], function(resources) {return {schemaUId:'bf70911e-077b-4cbf-9663-8c1535b3abb4',schemaCaption: "Agent desktop - Queue schema", parentSchemaName: "", schemaName:'QueuePage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("QueuePage", ["terrasoft", "ConfigurationEnums", "ProcessModuleUtilities", "OperatorSingleWindowConstants",
		"QueueClientNotificationUtilities", "QueuePageResources", "QueueGridUtilities", "QueuePageProfileUtilities",
		"QueueFillingUtilities", "QueueSortUtilities", "QueueProcessUtilities", "css!DetailModuleV2"],
	function(Terrasoft, ConfigurationEnums, ProcessModuleUtilities, OperatorSingleWindowConstants,
			QueueClientNotificationUtilities, resources) {
		return {
			/**
			 * ### #####.
			 * @type {String}
			 */
			entitySchemaName: "QueueItem",
			mixins: {

				/**
				 * @class QueueGridUtilities ########### ###### ###### # ######## #######.
				 */
				GridUtilities: "Terrasoft.QueueGridUtilities",

				/**
				 * @class QueuePageProfileUtilities ########### ###### ###### # ######## ## ######## #######.
				 */
				QueuePageProfileUtilities: "Terrasoft.QueuePageProfileUtilities",

				/**
				 * @class QueueFillingUtilities ########### ###### ########## ########.
				 */
				QueueFillingUtilities: "Terrasoft.QueueFillingUtilities",

				/**
				 * @class QueueSortUtilities implements queue sorting features.
				 */
				QueueSortUtilities: "Terrasoft.QueueSortUtilities",

				/**
				 * @class QueueProcessUtilities implements queue process features.
				 */
				QueueProcessUtilities: "Terrasoft.QueueProcessUtilities"

			},
			messages: {

				/**
				 * ########## ######### ### ######### #########.
				 */
				"GetHistoryState": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * ########## ######### ######### #########.
				 */
				"PushHistoryState": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * ######## ## ######### ### ######### ########## ###### ######### ####### ######.
				 */
				"SaveGridSettings": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * ######## ## ######### ######### ######### #######.
				 */
				"GridSettingsChanged": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * ######## ## ######### ### ########## ########## ###### ######### ####### ######.
				 */
				"GetGridSettingsInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * ######## ## ######### ### ########## ########## ###### ######### ####### ######.
				 */
				"GetEntitySchema": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GetCardState
				 * ########## ######### ############ ######## ### ######### #########.
				 */
				"GetCardState": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message SaveRecord
				 * ########## ######### ############ ######## # ############# ###########.
				 */
				"SaveRecord": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message FillingKindChanged
				 * ######## ## ######### # ######### #### ########## #######.
				 */
				"FillingKindChanged": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message UpdateData
				 * ######## ## ######### # ############# ######## ######.
				 */
				"UpdateData": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			attributes: {

				/**
				 * ############# ####### #######.
				 * @type {String}
				 */
				EntitySchemaUId: {dataValueType: Terrasoft.DataValueType.GUID},

				/**
				 * ######## ##### ####### #######.
				 * @type {String}
				 */
				EntitySchemaName: {dataValueType: Terrasoft.DataValueType.STRING},

				/**
				 * ######### ####### #######.
				 * @type {String}
				 */
				EntitySchemaCaption: {dataValueType: Terrasoft.DataValueType.STRING},

				/**
				 * ######### ####### #######.
				 * @type {String}
				 */
				EntitySchemaPrimaryDisplayColumnName: {dataValueType: Terrasoft.DataValueType.STRING},

				/**
				 * ######## ######### ####### ######## ###### #######.
				 * @type {String}
				 */
				ActiveRow: {dataValueType: Terrasoft.DataValueType.GUID},

				/**
				 * ######### ######.
				 * @type {Terrasoft.BaseViewModelCollection}
				 */
				Collection: {dataValueType: Terrasoft.DataValueType.COLLECTION},

				/**
				 * ####### "#### ######".
				 * @type {Boolean}
				 */
				IsGridEmpty: {dataValueType: Terrasoft.DataValueType.BOOLEAN},

				/**
				 * ####### "#### # ######## ########".
				 * @type {Boolean}
				 */
				IsGridLoading: {dataValueType: Terrasoft.DataValueType.BOOLEAN},

				/**
				 * ######## ############# #####.
				 * @type {Boolean}
				 */
				MultiSelect: {dataValueType: Terrasoft.DataValueType.BOOLEAN},

				/**
				 * ###### ######### #####.
				 * @type {Array}
				 */
				SelectedRows: {dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT},

				/**
				 * ########## #####.
				 * @type {Number}
				 */
				RowCount: {dataValueType: Terrasoft.DataValueType.INTEGER},

				/**
				 * ############ ########.
				 * @type {Boolean}
				 */
				IsPageable: {dataValueType: Terrasoft.DataValueType.BOOLEAN},

				/**
				 * ####### "###### #########".
				 * @type {Boolean}
				 */
				IsGridDataLoaded: {dataValueType: Terrasoft.DataValueType.BOOLEAN},

				/**
				 * ###### ########## # ############# ######### ############ ####### ######## #######.
				 * @type {Boolean}
				 */
				GridSettingsChanged: {dataValueType: Terrasoft.DataValueType.BOOLEAN},

				/**
				 * ######### ########### ###### ############## ######.
				 * @type {Terrasoft.BaseViewModelCollection}
				 */
				ToolsButtonMenu: {dataValueType: Terrasoft.DataValueType.COLLECTION},

				/**
				 * ############ ########## ####### ####### #######.
				 * @type {Object[]}
				 */
				QueueColumnsSortConfig: {
					"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
					"value": []
				},

				/**
				 * ####### ######### ###### "######### ######".
				 * @type {Boolean}
				 */
				IsNextRecordButtonVisible: {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},

				/**
				 * ####### ########## #######.
				 * @type {Boolean}
				 */
				IsClosedQueue: {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},

				/**
				 * #### #######.
				 * @type {String}
				 */
				ProfileKey: {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"value": ""
				},

				/**
				 * ####### ###### ###########.
				 * @type {Boolean}
				 */
				IsSupervisorMode: {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},

				/**
				 * ####### ###### ######.
				 * @type {Boolean}
				 */
				IsDetailMode: {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},

				/**
				 * ############# #######.
				 * @type {String}
				 */
				QueueId: {"dataValueType": Terrasoft.DataValueType.GUID},

				/**
				 * ########### ##########.
				 * @type {Number}
				 */
				GridSortDirection: {dataValueType: Terrasoft.DataValueType.INTEGER},

				/**
				 * ####### ##########.
				 * @type {Number}
				 */
				SortColumnIndex: {dataValueType: Terrasoft.DataValueType.INTEGER},

				/**
				 * ####### ########## ####### #######.
				 * @type {Boolean}
				 */
				IsManuallyFilling: {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN
				},

				/**
				 * ####### ############# ##### ####### #######.
				 * @type {Boolean}
				 */
				IsEntityFolderExists: {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN
				}
			},
			methods: {

				//region Methods: Private

				/**
				 * ######### # ##### ####### ##### ####### # ######## #######.
				 * @private
				 */
				addQueueEntityColumn: function() {
					var referenceSchemaName = this.get("EntitySchemaName");
					var queueEntityColumnCaption = this.get("EntitySchemaCaption");
					var queueLookupColumnName = "EntityRecord";
					var queueColumnName = queueLookupColumnName + "Id";
					this.entitySchema.columns[queueColumnName] = {
						uId: Terrasoft.generateGUID(),
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						referenceSchemaName: referenceSchemaName,
						isLookup: true,
						lookupType: "Exist",
						name: queueLookupColumnName,
						caption: queueEntityColumnCaption,
						usageType: ConfigurationEnums.EntitySchemaColumnUsageType.General
					};
					this.sandbox.subscribe("GetEntitySchema", this.onGetEntitySchema.bind(this),
						[this.sandbox.id + "_QueuePage"]);
				},

				/**
				 * ########## ####### ######### ###### "##### # ######".
				 * @private
				 * @return {Boolean} ####### #########.
				 */
				getIsProcessRunButtonVisible: function() {
					return !this.get("IsSupervisorMode");
				},

				/**
				 * ############## ########## ###### ############## ######.
				 * @private
				 */
				initToolsButtonMenu: function() {
					var toolsButtonMenu = this.get("ToolsButtonMenu");
					if (!toolsButtonMenu) {
						toolsButtonMenu = this.Ext.create("Terrasoft.BaseViewModelCollection");
					}
					this.addToolsButtonMenuItems(toolsButtonMenu);
					this.set("ToolsButtonMenu", toolsButtonMenu);
				},

				/**
				 * ############## ######### ###### "######### ######".
				 * @private
				 */
				setNextRecordButtonVisibility: function() {
					var isClosedQueue = this.get("IsClosedQueue");
					if (!isClosedQueue) {
						return;
					}
					this.Terrasoft.SysSettings.querySysSettings(["MaxCloseQueueProgressRecordsCount"],
						function(sysSettings) {
							var gridData = this.getGridData();
							this.set("IsNextRecordButtonVisible",
								sysSettings.MaxCloseQueueProgressRecordsCount > gridData.getCount());
						},
						this);
				},

				/**
				 * ############ ####### ####### #####.
				 * @private
				 * @param {String} schemaName ### #####.
				 * @return {Terrasoft.EntitySchemaQuery} #### ##### ## ####### - ########## #####, ##### - null.
				 */
				onGetEntitySchema: function(schemaName) {
					if (this.entitySchemaName === schemaName) {
						return this.entitySchema;
					}
					return null;
				},

				/**
				 * ############ ######### # ######### #### ########## #######.
				 * @private
				 * @param {Boolean} isManuallyFilling ####### ########## ####### #######..
				 */
				onFillingKindChanged: function(isManuallyFilling) {
					this.set("IsManuallyFilling", isManuallyFilling);
				},

				/**
				 * ############ ######### ## ############# ########## ######.
				 * @private
				 */
				onUpdateData: function(parameters) {
					this.applyParameters(parameters);
					var gridData = this.getGridData();
					if (!gridData) {
						return;
					}
					gridData.clear();
					Terrasoft.require(["profile!" + this.getProfileKey()], function(profile) {
						var profileColumnName = this.getProfileColumnName();
						this.set(profileColumnName, profile);
						this.set("GridSettingsChanged", true);
						this.queryColumnsSortConfig({
							entitySchemaUId: this.get("EntitySchemaUId"),
							callback: function(sortConfig) {
								this.set("QueueColumnsSortConfig", sortConfig);
								this.addQueueEntityColumn();
								this.loadGridData();
							}.bind(this)
						});
					}, this);
				},

				/**
				 * ########## ####### ######### ######### ######.
				 * @private
				 * @return {Boolean} ####### ######### ######### ######.
				 */
				getIsHeaderVisible: function() {
					return this.get("IsDetailMode");
				},

				/**
				 * ########## ####### ######### ###### ######### ####### # ###### "########".
				 * @private
				 * @return {Boolean} ####### #########.
				 */
				getIsPageToolsButtonVisible: function() {
					return !this.get("IsDetailMode");
				},

				/**
				 * ########## ####### ######### ###### ######### ####### # ###### "######".
				 * @return {Boolean} ####### #########.
				 */
				getIsDetailToolsButtonVisible: function() {
					return this.get("IsDetailMode");
				},

				/**
				 * ########## ######### ###### "########".
				 * @return {Boolean} ######### ######.
				 */
				getIsAddQueueItemsVisible: function() {
					return this.get("IsDetailMode") && this.get("IsManuallyFilling");
				},

				/**
				 * ########## ######### ###### ########.
				 * @private
				 * @return {String} ######### ###### ########.
				 */
				getQueuePageGroupCaption: function() {
					return this.get("IsDetailMode") ? this.get("Resources.Strings.QueuePageGroupCaption") : "";
				},

				/**
				 * ######### ############# ###### ####### #######.
				 * @private
				 * @param {Function} callback ####### ######### ######.
				 */
				getIsEntityFolderExist: function(callback) {
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "SysSchema",
						rowCount: 1
					});
					esq.addColumn("Name");
					esq.filters.add("Name", Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "Name", this.get("EntitySchemaName") + "Folder"));
					esq.getEntityCollection(function(response) {
						this.set("IsEntityFolderExists", (response.success && !response.collection.isEmpty()));
						callback();
					}.bind(this));
				},

				//endregion

				//region Methods: Protected

				/**
				 * @inheritdoc BasePageV2#onRender
				 * @overridden
				 */
				onRender: function() {
					this.switchActiveRowActions();
					if (this.get("GridSettingsChanged")) {
						this.reloadGridData();
					} else {
						var gridData = this.getGridData();
						this.reloadGridColumnsConfig(true);
						if (gridData && gridData.getCount() > 0) {
							var tempCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
							var items = gridData.getItems();
							Terrasoft.each(items, function(item) {
								tempCollection.add(item.get("Id"), item);
							});
							gridData.clear();
							gridData.loadAll(tempCollection);
						}
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#init
				 * @overridden
				 */
				init: function(callback, scope) {
					this.subscribeEvents();
					this.callParent([function() {
						QueueClientNotificationUtilities.subscribeForQueuesNotifications();
						this.queryColumnsSortConfig({
							entitySchemaUId: this.get("EntitySchemaUId"),
							callback: function(sortConfig) {
								this.set("QueueColumnsSortConfig", sortConfig);
								this.addQueueEntityColumn();
								this.initData();
								if (this.get("IsDetailMode")) {
									this.getIsEntityFolderExist(function() {
										callback.call(scope);
									});
								} else {
									callback.call(scope);
								}
							}.bind(this)
						});
					}, this]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getGridData
				 * @overridden
				 */
				getGridData: function() {
					return this.get("Collection");
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getProfileKey
				 * @overridden
				 */
				getProfileKey: function() {
					var entitySchemaName = this.get("EntitySchemaName");
					var profileKey = this.get("ProfileKey");
					var defaultProfileKey = this.getPageProfileKey(entitySchemaName);
					return Ext.isEmpty(profileKey) ? defaultProfileKey : profileKey;
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#initQueryColumns
				 * @overridden
				 */
				initQueryColumns: function(esq) {
					this.mixins.GridUtilities.initQueryColumns.apply(this, arguments);
					if (this.get("IsSupervisorMode")) {
						return;
					}
					this.addQueueSortColumns(esq, this.get("QueueColumnsSortConfig"));
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#initQuerySorting
				 * @overridden
				 */
				initQuerySorting: function(esq) {
					this.mixins.GridUtilities.initQuerySorting.apply(this, arguments);
					if (this.get("IsSupervisorMode")) {
						return;
					}
					this.initQueueQuerySorting(esq, this.get("QueueColumnsSortConfig"));
				},

				/**
				 * @inheritDoc Terrasoft.GridUtilitiesV2#deleteRecords
				 * @overridden
				 */
				deleteRecords: function() {
					var activeRowId = this.get("ActiveRow");
					this.checkCanDelete([activeRowId], this.checkCanDeleteCallback, this);
				},

				/**
				 * @inheritDoc Terrasoft.BaseGridDetailV2#getActiveRow
				 * @overridden
				 */
				getActiveRow: function() {
					var primaryColumnValue = this.get("ActiveRow");
					if (primaryColumnValue) {
						var gridData = this.getGridData();
						return gridData.get(primaryColumnValue);
					}
				},

				/**
				 * @inheritdoc Terrasoft.QueueSortUtilities#getQueueEntityColumnPath
				 */
				getQueueEntityColumnPath: function(entitySchemaName, columnName) {
					return Ext.String.format("[{0}:Id:EntityRecordId].{1}", entitySchemaName, columnName);
				},

				/**
				 * ############## ######### ###### ############# #######.
				 * @protected
				 */
				initData: function() {
					this.initGridRowViewModel(function() {
						this.initGridData();
						this.initSortActionItems();
						this.reloadGridColumnsConfig();
						this.loadGridData();
						this.initToolsButtonMenu();
						this.mixins.GridUtilities.init.call(this);
					}, this);
				},

				/**
				 * ######### ############# ######## ## ######### ### ###### ## #######.
				 * @protected
				 */
				initGridData: function() {
					this.set("Collection", Ext.create("Terrasoft.BaseViewModelCollection"));
					this.set("ActiveRow", "");
					if (Ext.isEmpty(this.get("MultiSelect"))) {
						this.set("MultiSelect", false);
					}
					if (Ext.isEmpty(this.get("IsPageable"))) {
						this.set("IsPageable", true);
					}
					this.set("IsClearGridData", false);
					if (!Ext.isNumber(this.get("RowCount"))) {
						this.set("RowCount", 15);
					}
				},

				/**
				 * ######### ######## ## #########.
				 * @protected
				 */
				subscribeEvents: function() {
					this.sandbox.subscribe("FillingKindChanged", this.onFillingKindChanged, this, [this.sandbox.id]);
					this.sandbox.subscribe("UpdateData", this.onUpdateData, this, [this.sandbox.id]);
				},

				/**
				 * ########## ####### ########### ###### ############## ######, ########## ## ######### #######.
				 * @protected
				 * @return {BaseViewModel} ####### ########### ###### ############## ######, ########## ## #########
				 * #######.
				 */
				getGridSettingsMenuItem: function() {
					return this.getButtonMenuItem({
						Caption: {"bindTo": "Resources.Strings.SetupQueueGridMenuCaption"},
						Click: {"bindTo": "openGridSettings"}
					});
				},

				/**
				 * ######### ######## # ######### ########### ###### ############## ######.
				 * @protected
				 * @param {Terrasoft.BaseViewModelCollection} toolsButtonMenu ######### ###########
				 * ###### ############## ######.
				 */
				addToolsButtonMenuItems: function(toolsButtonMenu) {
					if (this.get("IsDetailMode")) {
						toolsButtonMenu.addItem(this.getButtonMenuItem({
							Caption: {"bindTo": "Resources.Strings.DeleteMenuCaption"},
							Click: {"bindTo": "deleteRecords"},
							Enabled: {bindTo: "isAnySelected"}
						}));
						toolsButtonMenu.addItem(this.getButtonMenuItem({
							Type: "Terrasoft.MenuSeparator"
						}));
						toolsButtonMenu.addItem(this.getButtonMenuItem({
							Caption: {"bindTo": "Resources.Strings.SortMenuCaption"},
							Items: this.get("SortColumns")
						}));
					}
					var gridSettingsMenuItem = this.getGridSettingsMenuItem();
					if (gridSettingsMenuItem) {
						toolsButtonMenu.addItem(gridSettingsMenuItem);
					}
				},

				/**
				 * ############ ####### ###### # ###### ######## ######## ######.
				 * @protected
				 * @param {String} buttonTag ### ######.
				 * @param {String} primaryColumnValue ########## ############# ######.
				 */
				onActiveRowAction: function(buttonTag, primaryColumnValue) {
					if (buttonTag === "runProcess") {
						this.mixins.QueueProcessUtilities.executeQueueItemProcess.call(this, primaryColumnValue, false,
							function(canRunQueueItemProcess) {
								if (!canRunQueueItemProcess) {
									this.set("ActiveRow", null);
									this.reloadGridData();
								}
							}.bind(this)
						);
					}
				},

				/**
				 * ########## ####### ############# ########## ############ ########.
				 * @protected
				 */
				onNeedLoadData: function() {
					if (!this.get("CanLoadMoreData")) {
						return;
					}
					this.loadGridData();
				},

				/**
				 * ######### ######### ###### ######## #######.
				 * @protected
				 */
				nextRecordButtonClick: function() {
					var esq = this.getGridDataESQ();
					esq.rowCount = 1;
					this.initQueryColumns(esq);
					this.initQuerySorting(esq);
					this.addPrimaryColumnQuerySorting(esq);
					var filters = esq.filters;
					this.addQueueFilters(filters, {
						"skipOperatorFilter": true
					});
					filters.addItem(this.Terrasoft.createIsNullFilter(
						this.Ext.create("Terrasoft.ColumnExpression", {columnPath: "Operator"})
					));
					esq.getEntityCollection(function(response) {
						if (!response.success || response.collection.isEmpty()) {
							return;
						}
						var item = response.collection.getByIndex(0);
						this.mixins.QueueProcessUtilities.executeQueueItemProcess.call(this, item.get("Id"), false,
							function(canRunQueueItemProcess) {
								if (!canRunQueueItemProcess) {
									this.set("ActiveRow", null);
									this.reloadGridData();
								}
							}.bind(this)
						);
					}, this);
				},

				/**
				 * ######### ########## ## ######### #######.
				 * @protected
				 * @param {Terrasoft.EntitySchemaQuery} esq ######, # ####### ##### ################### #######.
				 */
				addPrimaryColumnQuerySorting: function(esq) {
					var queueSortColumns = this.get("QueueColumnsSortConfig");
					var idColumn = esq.columns.get("Id");
					if (idColumn) {
						idColumn.orderPosition = queueSortColumns.length + 1;
						idColumn.orderDirection = this.Terrasoft.OrderDirection.ASC;
					}
				},

				//endregion

				//region Methods: Public

				/**
				 * ######### ######### ######.
				 * @param {Object} parameters ######, ########### #########.
				 */
				applyParameters: function(parameters) {
					for (var parameterName in parameters) {
						if (!parameters.hasOwnProperty(parameterName)) {
							continue;
						}
						this.set(parameterName, parameters[parameterName]);
					}
				},

				/**
				 * @inheritdoc Terrasoft.configuration.mixins.GridUtilities#getGridSettingsModuleConfig
				 * @override
				 */
				getGridSettingsModuleConfig: function(gridSettingsId) {
					return {
						renderTo: "centerPanel",
						id: gridSettingsId,
						keepAlive: true,
						instanceConfig: {
							schemaName: "QueuePageGridSettingsPage",
							isSchemaConfigInitialized: true
						}
					};
				}

				//endregion

			},
			diff: [
				{
					"operation": "insert",
					"name": "pageToolsButton",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": {"bindTo": "Resources.Images.PageToolsButton"},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"menu": {
							"items": {"bindTo": "ToolsButtonMenu"}
						},
						"classes": {"wrapperClass": ["page-tools-button"]},
						"selectors": {"wrapEl": "#pageToolsButton"},
						"visible": {"bindTo": "getIsPageToolsButtonVisible"},
						"markerValue": "queueTools"
					}
				},
				{
					"operation": "insert",
					"name": "QueuePageGroup",
					"propertyName": "items",
					"values": {
						"id": "QueuePageGroup",
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"controlConfig": {
							"collapsed": false,
							"caption": {"bindTo": "getQueuePageGroupCaption"}
						},
						"classes": {"wrapClass": ["detail"]},
						"markerValue": "QueuePageGroup",
						"isHeaderVisible": {"bindTo": "getIsHeaderVisible"},
						"items": [],
						"tools": []
					}
				},
				{
					"operation": "insert",
					"name": "AddQueueItemsButton",
					"parentName": "QueuePageGroup",
					"propertyName": "tools",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"markerValue": "AddTypedRecordButton",
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"visible": {"bindTo": "getIsAddQueueItemsVisible"},
						"imageConfig": {"bindTo": "Resources.Images.AddQueueItemButtonImage"},
						"menu": []
					}
				},
				{
					"operation": "insert",
					"name": "AddEntityRecord",
					"parentName": "AddQueueItemsButton",
					"propertyName": "menu",
					"values": {
						"itemType": Terrasoft.ViewItemType.MENU_ITEM,
						"caption": {"bindTo": "Resources.Strings.AddEntityRecordCaption"},
						"click": {"bindTo": "onAddEntityRecordClick"},
						"markerValue": {"bindTo": "Resources.Strings.AddEntityRecordCaption"}
					}
				},
				{
					"operation": "insert",
					"name": "AddEntityFolderRecord",
					"parentName": "AddQueueItemsButton",
					"propertyName": "menu",
					"values": {
						"itemType": Terrasoft.ViewItemType.MENU_ITEM,
						"caption": {"bindTo": "Resources.Strings.AddEntityFolderRecordCaption"},
						"click": {"bindTo": "onAddEntityFolderRecordClick"},
						"visible": {"bindTo": "IsEntityFolderExists"},
						"markerValue": {"bindTo": "Resources.Strings.AddEntityFolderRecordCaption"}
					}
				},
				{
					"operation": "insert",
					"name": "detailToolsButton",
					"parentName": "QueuePageGroup",
					"propertyName": "tools",
					"values": {
						"id": "detailToolsButton",
						"markerValue": "ToolsButton",
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": {"bindTo": "Resources.Images.DetailToolsButton"},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"menu": {
							"items": {"bindTo": "ToolsButtonMenu"}
						},
						"classes": {
							"wrapperClass": ["detail-tools-button-wrapper"],
							"menuClass": ["detail-tools-button-menu"]
						},
						"selectors": {"wrapEl": "#detailToolsButton"},
						"visible": {"bindTo": "getIsDetailToolsButtonVisible"}
					}
				},
				{
					"operation": "insert",
					"name": "queueContainer",
					"parentName": "QueuePageGroup",
					"propertyName": "items",
					"values": {
						"id": "queueContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"markerValue": {"bindTo": "EntitySchemaName"}
					}
				},
				{
					"operation": "insert",
					"name": "DataGrid",
					"parentName": "queueContainer",
					"propertyName": "items",
					"values": {
						"type": ConfigurationEnums.GridType.LISTED,
						"itemType": Terrasoft.ViewItemType.GRID,
						"listedZebra": true,
						"collection": {"bindTo": "Collection"},
						"activeRow": {"bindTo": "ActiveRow"},
						"primaryColumnName": "Id",
						"isEmpty": {"bindTo": "IsGridEmpty"},
						"isLoading": {"bindTo": "IsGridLoading"},
						"multiSelect": {"bindTo": "MultiSelect"},
						"selectedRows": {"bindTo": "SelectedRows"},
						"linkClick": {"bindTo": "linkClicked"},
						"sortColumn": {"bindTo": "sortColumn"},
						"sortColumnDirection": {"bindTo": "GridSortDirection"},
						"sortColumnIndex": {"bindTo": "SortColumnIndex"},
						"needLoadData": {"bindTo": "onNeedLoadData"},
						"activeRowAction": {"bindTo": "onActiveRowAction"},
						"canChangeMultiSelectWithGridClick": false,
						"activeRowActions": []
					}
				},
				{
					"operation": "insert",
					"name": "ProcessRunButton",
					"parentName": "DataGrid",
					"propertyName": "activeRowActions",
					"values": {
						"className": "Terrasoft.Button",
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"caption": resources.localizableStrings.RunProcessButtonCaption,
						"tag": "runProcess",
						"visible": {"bindTo": "getIsProcessRunButtonVisible"}
					}
				},
				{
					"operation": "insert",
					"name": "nextRecordButton",
					"parentName": "queueContainer",
					"propertyName": "items",
					"values": {
						"id": "nextRecordButton",
						"selectors": {"wrapEl": "#nextRecordButton"},
						"classes": {"textClass": "next-record-button"},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"caption": {"bindTo": "Resources.Strings.NextRecordButtonCaption"},
						"click": {"bindTo": "nextRecordButtonClick"},
						"visible": {"bindTo": "IsNextRecordButtonVisible"}
					}
				}
			]
		};
	}
);


