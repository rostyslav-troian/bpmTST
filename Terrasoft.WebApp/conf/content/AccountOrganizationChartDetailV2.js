Terrasoft.configuration.Structures["AccountOrganizationChartDetailV2"] = {innerHierarchyStack: ["AccountOrganizationChartDetailV2"], structureParent: "BaseGridDetailV2"};
define('AccountOrganizationChartDetailV2Structure', ['AccountOrganizationChartDetailV2Resources'], function(resources) {return {schemaUId:'214d6175-0b3f-4bd7-8801-5a2d7b27a524',schemaCaption: "Detail - Organizational structure of account", parentSchemaName: "BaseGridDetailV2", schemaName:'AccountOrganizationChartDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AccountOrganizationChartDetailV2", ["terrasoft"],
	function(Terrasoft) {
		return {
			entitySchemaName: "AccountOrganizationChart",
			methods: {

				/**
				 * ######### ######## ########## ######
				 * @protected
				 * @overridden
				 * @param {String} editPageUId ######## ####### ####
				 * @param {Boolean} keepParentId (optional) ## ####### ## DefaultValues ####### # ###### Parent
				 */
				addRecord: function(editPageUId, keepParentId) {
					if (!keepParentId) {
						var defaultValues = this.get("DefaultValues");
						var result = this.Ext.Array.filter(defaultValues, function(item) {
							return (item.name !== "Parent");
						}, this);
						this.set("DefaultValues", result);
					}
					this.callParent(editPageUId);
				},

				/**
				 *######## #######, ####### ###### ########## ########
				 *@protected
				 *@overridden
				 *@return {Object} ########## #######, ####### ###### ########## ########
				 */
				getGridDataColumns: function() {
					var gridDataColumns = this.callParent(arguments);
					if (!gridDataColumns.Parent) {
						gridDataColumns.Parent = {
							path: "Parent"
						};
					}
					return gridDataColumns;
				},

				/**
				 * ########### ######### ###### ##### ######### # ######
				 * @protected
				 * @overridden
				 * @param {Terrasoft.collection} collection ######### ######### #######
				 */
				prepareResponseCollection: function(collection) {
					collection.each(function(item) {
						var parent = item.get("Parent");
						var parentId = parent && parent.value;
						if (parentId) {
							item.set("ParentId", parentId);
						}
						Terrasoft.each(item.columns, function(column) {
							this.addColumnLink(item, column);
							this.applyColumnDefaults(column);
						}, this);
					}, this);
				},

				/**
				 * @inheritDoc Terrasoft.BaseGridDetail#hideQuickFilterButton
				 * @overridden
				 */
				getHideQuickFilterButton: function() {
					return false;
				},

				/**
				 * @inheritDoc Terrasoft.BaseGridDetail#getQuickFilterButton
				 * @overridden
				 */
				getShowQuickFilterButton: function() {
					return false;
				},

				/**
				 * ######### ###### ######## ########## ##########
				 * @protected
				 * @overridden
				 * @param {Object} config ############ ########## ######
				 */
				updateDetail: function(config) {
					config.reloadAll = true;
					this.callParent([config]);

				},

				/**
				 * ######## ########### ###### "######## ########### #######"
				 * @protected
				 * @returns {Boolean} ########## true, #### ####### ####### ######### ###########
				 */
				getAddChildElementButtonEnabled: function() {
					return !this.Ext.isEmpty(this.getSelectedItems());
				},

				/**
				 * ######### # ######### DefaultValues ####### Parent # ######## ####### addRecord
				 * @protected
				 */
				addChildElementRecord: function() {
					var selectedItems = this.getSelectedItems();
					if (this.Ext.isEmpty(selectedItems)) {
						return;
					}
					var parentId = selectedItems[0];
					var defaultValues = this.get("DefaultValues");
					var result = this.Ext.Array.filter(defaultValues, function(item) {
						return (item.name !== "Parent");
					}, this);
					result.push({
							name: "Parent",
							value: parentId
						});
					this.set("DefaultValues", result);
					this.addRecord(null, true);
				},

				/**
				 * ####### #########
				 * @protected
				 */
				clearSelection: function() {
					this.set("activeRow", null);
					this.set("selectedRows", null);
				},

				/**
				 * ########## ####### ############# ########. ####### ######### ######## ############
				 * @protected
				 * @overridden
				 */
				onDeleteAccept: function() {
					var selectedRows = this.getSelectedItems();
					var batch = this.Ext.create("Terrasoft.BatchQuery");
					Terrasoft.each(selectedRows, function(recordId) {
						this.deleteItem(recordId, batch, this);
					}, this);
					if (batch.queries.length > 0) {
						batch.execute(this.onDeleted, this);
					}
				},

				/**
				 * ########## ########## ######### ####### ## ########
				 * @protected
				 * @param {Object} response (optional) - ##### # #######
				 */
				onDeleted: function(response) {
					if (response && response.success) {
						this.clearSelection();
					} else {
						this.showConfirmationDialog(
							this.get("Resources.Strings.OnDeleteError"));
					}
				},

				/**
				 * ######### # ######## ######, ###### ## ######## ########### ########
				 * @protected
				 * @param {Guid} recordId - ############# ######
				 * @param {Terrasoft.BatchQuery} batch - ######## ######, ####### ##############
				 * @param {Object} scope ######## #######, # ####### ### ##### #######
				 */
				deleteItem: function(recordId, batch, scope) {
					var grid = scope.getGridData();
					var toDelete = new Terrasoft.Collection();
					grid.each(function(item) {
						var parent = item.get("Parent");
						if (parent && parent.value === recordId) {
							toDelete.add(item);
						}
					}, grid);

					Terrasoft.each(toDelete.getItems(), function(item) {
						this.deleteItem(item.get("Id"), batch, this);
					}, scope);
					if (grid.find(recordId)) {
						var selfDelete = grid.get(recordId);
						grid.remove(selfDelete);
						var query = this.Ext.create("Terrasoft.DeleteQuery", {
							rootSchema: scope.entitySchema
						});
						var filter = Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "Id", recordId);
						query.filters.addItem(filter);
						batch.add(query);
					}
				},

				/**
				 * @inheritDoc Terrasoft.BaseDetailV2#getToolsVisible
				 */
				getToolsVisible: function() {
					return this.callParent(arguments) && this.get("CanEditMasterRecord");
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
									"name": "CustomDepartmentNameListedGridColumn",
									"bindTo": "CustomDepartmentName",
									"position": {
										"column": 0,
										"colSpan": 24
									},
									"type": Terrasoft.GridCellType.TITLE
								}
							]
						},
						"tiledConfig": {
							"name": "DataGridTiledConfig",
							"grid": {
								"columns": 24,
								"rows": 3
							},
							"items": [
								{
									"name": "CustomDepartmentNameTiledGridColumn",
									"bindTo": "CustomDepartmentName",
									"position": {
										"row": 0,
										"column": 0,
										"colSpan": 24
									},
									"type": Terrasoft.GridCellType.TITLE
								},
								{
									"name": "DepartmentTiledGridColumn",
									"bindTo": "Department",
									"position": {
										"row": 1,
										"column": 0,
										"colSpan": 12
									}
								},
								{
									"name": "ManagerTiledGridColumn",
									"bindTo": "Manager",
									"position": {
										"row": 1,
										"column": 12,
										"colSpan": 12
									}
								}
							]
						},
						"hierarchical": true,
						"hierarchicalColumnName": "ParentId"
					}
				},
				{
					"operation": "merge",
					"name": "AddRecordButton",
					"values": {
						visible: false
					}
				},
				{
					"operation": "insert",
					"name": "AddRecord",
					"parentName": "Detail",
					"propertyName": "tools",
					"index": 1,
					"values": {
						itemType: Terrasoft.ViewItemType.BUTTON,
						menu: [],
						"imageConfig": {"bindTo": "Resources.Images.AddButtonImage"},
						"visible": {"bindTo": "getToolsVisible"}
					}
				},
				{
					"operation": "insert",
					"name": "AddParentRecordButton",
					"parentName": "AddRecord",
					"propertyName": "menu",
					"values": {
						"caption": {"bindTo": "Resources.Strings.AddRootElementButtonCaption"},
						"click": {"bindTo": "addRecord"}
					}
				},
				{
					"operation": "insert",
					"name": "AddChildElementButton",
					"parentName": "AddRecord",
					"propertyName": "menu",
					"values": {
						"caption": {"bindTo": "Resources.Strings.AddChildElementButtonCaption"},
						"click": {"bindTo": "addChildElementRecord"},
						"enabled": {"bindTo": "getAddChildElementButtonEnabled"}
					}
				},
				{
					"operation": "remove",
					"name": "FiltersContainer"
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


