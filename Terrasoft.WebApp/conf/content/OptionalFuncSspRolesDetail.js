Terrasoft.configuration.Structures["OptionalFuncSspRolesDetail"] = {innerHierarchyStack: ["OptionalFuncSspRolesDetail"], structureParent: "BaseGridDetailV2"};
define('OptionalFuncSspRolesDetailStructure', ['OptionalFuncSspRolesDetailResources'], function(resources) {return {schemaUId:'afa35a9d-5e14-4d61-a1fb-6631947505f1',schemaCaption: "Roles for portal organization", parentSchemaName: "BaseGridDetailV2", schemaName:'OptionalFuncSspRolesDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OptionalFuncSspRolesDetail", [],
	function() {
		return {
			entitySchemaName: "OptionalFuncSspRole",
			attributes: {
				"UseGeneratedProfile": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},
				"IsDetailCollapsed": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				}
			},
			methods: {

				/**
				 * @inheritDoc Terrasoft.BaseGridDetailV2#getAddRecordButtonVisible
				 * @override
				 */
				getAddRecordButtonVisible: function() {
					return true;
				},

				/**
				 * @inheritDoc BaseGridDetailV2#addRecord
				 * @protected
				 * @override
				 */
				addRecord: function() {
					const lookupConfig = {
						entitySchemaName: "SysAdminUnit",
						hideActions: true
					};
					lookupConfig.multiSelect = true;
					const filterGroup = Terrasoft.createFilterGroup();
					filterGroup.add("isPortalRole", Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "ConnectionType", 1));
					filterGroup.add("isFunctionalRole", Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "SysAdminUnitTypeValue", 6));
					filterGroup.add("isActive", Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "Active", 1));
					const notExistsFilter = Terrasoft.createNotExistsFilter(
						"[OptionalFuncSspRole:FuncRole:Id].Id");
					const subFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"OrgRole", this.get("MasterRecordId"));
					notExistsFilter.subFilters.addItem(subFilter);
					filterGroup.add("notAlreadyAdded", notExistsFilter);
					lookupConfig.filters = filterGroup;
					this.openLookup(lookupConfig, this._addFuncRole, this);
				},

				/**
				 * @inheritDoc Terrasoft.GridUtilitiesV2#getGridDataColumns
				 * @override
				 */
				getGridDataColumns: function() {
					const gridDataColumns = this.callParent(arguments);
					gridDataColumns.FuncRole = {
						path: "FuncRole"
					};
					return gridDataColumns;
				},

				/**
				 * @inheritDoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
				 * @override
				 */
				getCopyRecordMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritDoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
				 * @override
				 */
				getEditRecordMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritDoc Terrasoft.BaseGridDetailV2#addDetailWizardMenuItems
				 * @override
				 */
				addDetailWizardMenuItems: this.Terrasoft.emptyFn,

				/**
				 * @inheritDoc Terrasoft.BaseGridDetailV2#getDataImportMenuItem
				 * @override
				 */
				getDataImportMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritDoc Terrasoft.BaseGridDetailV2#getSwitchGridModeMenuItem
				 * @override
				 */
				getSwitchGridModeMenuItem: this.Terrasoft.emptyFn,

				_addFuncRole: function(selectedItems) {
					const insertBatch = Ext.create("Terrasoft.BatchQuery");
					selectedItems.selectedRows.getItems().forEach(function(item) {
						insertBatch.add(this._getInsertRecordQuery(item));
					}, this);
					if (insertBatch.queries.length > 0) {
						insertBatch.execute(this.reloadGridData, this);
					}
				},

				_getInsertRecordQuery: function(item) {
					const insertQuery = Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: this.entitySchemaName
					});
					insertQuery.setParameterValue("OrgRole", this.$MasterRecordId,
						Terrasoft.DataValueType.GUID);
					insertQuery.setParameterValue("FuncRole", item.Id, Terrasoft.DataValueType.GUID);
					return insertQuery;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"type": "listed",
						"listedConfig": {
							"name": "DataGridListedConfig",
							"items": [
								{
									"name": "FuncRoleColumn",
									"bindTo": "FuncRole",
									"position": {
										"column": 0,
										"colSpan": 24
									}
								}
							]
						},
						"tiledConfig": {
							"name": "DataGridTiledConfig",
							"grid": {
								"columns": 24,
								"rows": 1
							},
							"items": [
								{
									"name": "FuncRole",
									"bindTo": "FuncRole",
									"position": {
										"row": 0,
										"column": 0,
										"colSpan": 24
									}
								}
							]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


