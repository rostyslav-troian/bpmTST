Terrasoft.configuration.Structures["SysProcessLogSectionV2"] = {innerHierarchyStack: ["SysProcessLogSectionV2"], structureParent: "BaseSectionV2"};
define('SysProcessLogSectionV2Structure', ['SysProcessLogSectionV2Resources'], function(resources) {return {schemaUId:'4a7e35ba-cd9e-4f94-ac5d-4aa2f92d00b2',schemaCaption: "SysProcessLogSectionV2", parentSchemaName: "BaseSectionV2", schemaName:'SysProcessLogSectionV2',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysProcessLogSectionV2", ["BaseFiltersGenerateModule", "ConfigurationConstants", "ProcessModuleUtilities",
			"SysProcessLogSectionV2GridRowViewModel", "DcmSchemaManager", "css!BaseProcessLogSectionCSS",
			"ProcessLogActions"],
	function(BaseFiltersGenerateModule, ConfigurationConstants, ProcessModuleUtilities) {
		return {
			entitySchemaName: "VwSysProcessLog",
			mixins: {
				ProcessLogActions: "Terrasoft.ProcessLogActions"
			},
			attributes: {
				/**
				 * ######## ######## ###### ## ####### ###### #### # ############ ### ############# ######
				 */
				SecurityOperationName: {
					dataValueType: Terrasoft.DataValueType.STRING,
					value: "CanManageProcessLogSection"
				},

				/**
				 * Tag for opening process diagram event.
				 */
				ShowProcessDiagramTag: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: ""
				},

				/**
				 * Flag for showing archived records.
				 */
				ShowArchivedRecords: {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				}
			},
			methods: {

				/**
				 * Adds filter for archived records.
				 * @private
				 * @param {Terrasoft.FilterGroup} filters Data grid filters.
				 */
				_addArchivedFilter: function(filters) {
					if (!this.get("ShowArchivedRecords")) {
						filters.add("ArchivedFilter", Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "Archived", false));
					}
				},

				/**
				 * Adds to section filters a filter, that hides DCM records.
				 * @private
				 * @param {Terrasoft.FilterGroup} filters
				 */
				addHideDcmFilter: function(filters) {
					var filterName = "HideDcm";
					filters.removeByKey(filterName);
					var shouldHideDcm = !Terrasoft.isDebug && !this.getIsFeatureEnabled("ShowDcmInProcessLog");
					if (shouldHideDcm) {
						var managerName = Terrasoft.manager.DcmSchemaManager.managerName;
						filters.add(filterName, Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.NOT_EQUAL, "SysSchema.ManagerName", managerName));
					}
				},

				/**
				 * ####### ##### ######## ####### ####### ## #### ###### "###".
				 * @overridden
				 */
				addSectionDesignerViewOptions: Terrasoft.emptyFn,

				/**
				 * ############## ####### ### ###### ###### #######
				 * @overridden
				 */
				getGridRowViewModelClassName: function() {
					return "Terrasoft.SysProcessLogSectionV2GridRowViewModel";
				},

				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#getDefaultGridDataViewCaption
				 * @protected
				 * @overridden
				 */
				getDefaultGridDataViewCaption: function() {
					return this.get("Resources.Strings.ActiveViewCaption");
				},

				/**
				 * ########## ######### ######## ####### # ###### ########### #######
				 * @protected
				 * @overridden
				 * @return {Terrasoft.BaseViewModelCollection} ########## ######### ######## ####### # ######
				 * ########### #######
				 */
				getSectionActions: function() {
					var actionMenuItems = this.callParent(arguments);
					var newActionMenuItems = new Terrasoft.BaseViewModelCollection();
					Terrasoft.each(actionMenuItems, function(item) {
						const caption = item.values.Caption;
						if (caption && caption.bindTo === "Resources.Strings.DeleteRecordButtonCaption") {
							return;
						}
						newActionMenuItems.addItem(item);
					}, this);
					newActionMenuItems.addItem(this.getButtonMenuItem({
						Type: "Terrasoft.MenuSeparator",
						Caption: ""
					}));
					newActionMenuItems.addItem(this.getButtonMenuItem({
						Caption: {"bindTo": "Resources.Strings.CancelExecutionButtonCaption"},
						Click: {"bindTo": "cancelExecutionConfirmation"},
						Visible: {"bindTo": "getShowCancelExecutionMenuVisible"},
						IsEnabledForSelectedAll: true
					}));
					return newActionMenuItems;
				},

				/**
				 *
				 * @overridden
				 */
				unSetMultiSelect: function() {
					this.callParent(arguments);
					if (this.get("HasCanceledItems")) {
						this.reloadGridData();
						this.set("HasCanceledItems", false);
					}
				},

				/**
				 * @overridden
				 */
				getGridDataColumns: function() {
					return Ext.apply(this.callParent(arguments), {
						"SysSchema": {path: "SysSchema"},
						"StartDate": {path: "StartDate"},
						"Parent": {path: "Parent"},
						"Status": {path: "Status"}
					});
				},

				/**
				 * ############## ######## ######## ########### #######.
				 * @overridden
				 */
				initContextHelp: function() {
					this.set("ContextHelpId", 7001);
					this.callParent(arguments);
				},

				/**
				 * @overridden
				 */
				init: function(callback, scope) {
					this.set("UseTagModule", false);
					this.set("UseStaticFolders", true);
					this.set("TagButtonVisible", false);
					this.callParent([function() {
						this.mixins.ProcessLogActions.init.call(this, callback, scope);
					}, this]);
				},

				/**
				 * #### # ###### ######## ## ## ##### #######, ######### #### ##########
				 * ############ ##### SysProcessEntity.
				 */
				updateFiltersByObjectPath: function(filter, entitySchema, updateFiltersByObjectPath) {
					if (!entitySchema) {
						return;
					}
					if (!Ext.isEmpty(filter.leftExpression) && entitySchema !== "VwSysProcessLog") {
						filter.leftExpression.columnPath =
							"[VwSysProcessEntity:SysProcess].[" + entitySchema + ":Id:EntityId]." +
								filter.leftExpression.columnPath;
					} else if (filter.getItems) {
						Terrasoft.each(filter.getItems(), function(item) {
							updateFiltersByObjectPath(item, item.rootSchemaName || entitySchema,
									updateFiltersByObjectPath);
						});
					}
				},

				/**
				 * @overridden
				 */
				initFixedFiltersConfig: function() {
					var fixedFilterConfig = {
						entitySchema: this.entitySchema,
						filters: [
							{
								name: "PeriodFilter",
								caption: this.get("Resources.Strings.PeriodFilterCaption"),
								dataValueType: Terrasoft.DataValueType.DATE,
								startDate: {
									columnName: "StartDate"
								},
								dueDate: {
									columnName: "StartDate"
								}
							},
							{
								name: "Owner",
								caption: this.get("Resources.Strings.OwnerFilterCaption"),
								columnName: "Owner",
								dataValueType: Terrasoft.DataValueType.LOOKUP,
								filter: BaseFiltersGenerateModule.OwnerFilter
							}
						]
					};
					this.set("FixedFilterConfig", fixedFilterConfig);
				},

				/**
				 * @overridden
				 */
				getFilters: function() {
					var filters = this.callParent(arguments);
					var filterName = "WorkspaceFilter";
					if (!filters.contains(filterName)) {
						filters.add(filterName, Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "SysWorkspace",
							Terrasoft.SysValue.CURRENT_WORKSPACE.value));
					}
					this._addArchivedFilter(filters);
					this.addHideDcmFilter(filters);
					return filters;
				},

				/**
				 * @inheritdoc GridUtilitiesV2#onActiveRowAction
				 * @protected
				 * @overridden
				 */
				onActiveRowAction: function(buttonTag, primaryColumnValue) {
					switch (buttonTag) {
						case "processDiagram":
							this.showProcessDiagram(primaryColumnValue);
							this.set("ShowProcessDiagramTag", "OpenProcessDiagram");
							this.sendGoogleTagManagerData();
							break;
						case "cancelExecution":
							this.cancelExecutionConfirmation();
							break;
						case "processDesigner":
							this.showProcessDesigner();
							break;
						default:
							this.callParent(arguments);
							break;
					}
				},

				/**
				 * Shows process schema designer
				 */
				showProcessDesigner: function() {
					var id = this.getActiveRow().$SysSchema.value;
					ProcessModuleUtilities.showProcessSchemaDesignerById(id);
				},

				/**
				 * Performs opening chart the selected process.
				 */
				processDiagram: function() {
					var schemaUId = this.getActiveRow().get(this.primaryColumnName);
					ProcessModuleUtilities.showProcessDiagram(schemaUId);
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#prepareResponseCollection
				 * @overriden
				 */
				prepareResponseCollection: function(collection) {
					this.mixins.GridUtilities.prepareResponseCollection.call(this, collection);
					this.initCancelExecution(collection);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#getGoogleTagManagerData.
				 * @overridden
				 */
				getGoogleTagManagerData: function() {
					var data = this.callParent(arguments);
					var showProcessDiagramTag = this.get("ShowProcessDiagramTag");
					if (!this.Ext.isEmpty(showProcessDiagramTag)) {
						this.Ext.apply(data, {
							action: showProcessDiagramTag
						});
					}
					return data;
				},

				/**
				 * On show archived filter checkbox state change handler.
				 * @param {Boolean} value New checkbox state.
				 */
				onShowArchivedRecordsChecked: function(value) {
					this.set("ShowArchivedRecords", value);
					var filterConfig = this.get("FixedFilterConfig");
					var filterSandbox = filterConfig.sandbox;
					filterSandbox.publish("UpdateFilter", {}, [filterSandbox.id]);
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#getInFolderEntityName
				 * @overridden
				 */
				getInFolderEntityName: function() {
					return "SysProcessLogInFolder";
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#getFolderEntityName
				 * @overridden
				 */
				getFolderEntityName: function() {
					return "SysProcessLogFolder";
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#getEntityColumnNameInFolderEntity
				 * @overridden
				 */
				getEntityColumnNameInFolderEntity: function() {
					return "SysProcessLog";
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#getSectionCode
				 * @override
				 */
				getSectionCode: function() {
					return "SysProcessLog";
				},

				_openProcessLibButtonClick: function() {
					this.sandbox.publish("PushHistoryState", { hash: "SectionModuleV2/VwProcessLibSection/" });
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "CombinedModeActionButtonsCardLeftContainer",
					"propertyName": "items",
					"name": "ShowProcessDesignerButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.ProcessDesignerButton"},
						"click": {"bindTo": "showProcessDesigner"}
					}
				},
				{
					"operation": "insert",
					"name": "SeparateModeOpenProcessLibButton",
					"parentName": "SeparateModeActionButtonsLeftContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.ProcessLibButtonCaption"},
						"click": {"bindTo": "_openProcessLibButtonClick"},
						"classes": {"textClass": ["actions-button-margin-right"]}
					}
				},
				{
					"operation": "insert",
					"name": "DataGridActiveRowProcessDesigner",
					"parentName": "DataGrid",
					"propertyName": "activeRowActions",
					"values": {
						"className": "Terrasoft.Button",
						"style": Terrasoft.controls.ButtonEnums.style.GREY,
						"caption": {"bindTo": "Resources.Strings.ProcessDesignerButtonCaption"},
						"tag": "processDesigner"
					}
				},
				{
					"operation": "insert",
					"name": "DataGridActiveRowProcessDiagram",
					"parentName": "DataGrid",
					"propertyName": "activeRowActions",
					"values": {
						"className": "Terrasoft.Button",
						"style": Terrasoft.controls.ButtonEnums.style.GREY,
						"caption": {"bindTo": "Resources.Strings.ProcessDiagramButtonCaption"},
						"tag": "processDiagram"
					}
				},
				{
					"operation": "insert",
					"name": "DataGridActiveRowCancelExecution",
					"parentName": "DataGrid",
					"propertyName": "activeRowActions",
					"values": {
						"className": "Terrasoft.Button",
						"style": Terrasoft.controls.ButtonEnums.style.GREY,
						"caption": {"bindTo": "Resources.Strings.CancelExecutionButtonCaption"},
						"tag": "cancelExecution",
						"visible": {"bindTo": "canCancelProcessExecution"}
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
					"name": "DeleteRecordMenuItem",
					"values": {
						"visible": false
					}
				},
				{
					"operation": "merge",
					"name": "DataGridActiveRowDeleteAction",
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
					"operation": "remove",
					"name": "DataGridActiveRowDeleteAction"
				},
				{
					"operation": "merge",
					"name": "CardContainer",
					"values": {
						"wrapClass": ["card", "right-el", "sys-process-card-container"]
					}
				},
				{
					"operation": "merge",
					"name": "CombinedModeViewOptionsButton",
					"values": {
						"visible": {"bindTo": "IsSectionVisible"}
					}
				},
				{
					"operation": "insert",
					"name": "HasArchivedFilterContainer",
					"parentName": "FiltersContainer",
					"propertyName": "items",
					"index": 0,
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["archived-process-filter-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "HasArchivedFilterContainer",
					"propertyName": "items",
					"name": "ShowArchivedRecords",
					"values": {
						"caption": {"bindTo": "Resources.Strings.HasArchivedFilterCaption"},
						"controlConfig": {
							"className": "Terrasoft.CheckBoxEdit",
							"checkedchanged": {"bindTo": "onShowArchivedRecordsChecked"}
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


