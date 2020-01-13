Terrasoft.configuration.Structures["WorkResourceElementDetailV2"] = {innerHierarchyStack: ["WorkResourceElementDetailV2"], structureParent: "BaseGridDetailV2"};
define('WorkResourceElementDetailV2Structure', ['WorkResourceElementDetailV2Resources'], function(resources) {return {schemaUId:'c025788a-1532-44d7-8e93-9fdc4e099fc0',schemaCaption: "WorkResourceElementDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'WorkResourceElementDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("WorkResourceElementDetailV2", ["terrasoft", "ProjectServiceHelper", "ProjectResourceElementServiceHelper"],
		function(Terrasoft, ProjectServiceHelper, ProjectResourceElementServiceHelper) {
			return {
				entitySchemaName: "WorkResourceElement",
				attributes: {},
				methods: {

					/**
					 * ######## ## ########### ######## ######
					 * @protected
					 */
					checkIfDeleteRecords: function() {
						var records = this.getSelectedItems();
						if (!records || !records.length) {
							return;
						}
						if (records && records.length) {
							var self = this;
							var callback = function(response) {
								if (!response.Success) {
									var message;
									switch (response.Code) {
										case 200:
											message = this.get("Resources.Strings.ChildProjectExistsWarning");
											break;
										case 300:
											message = this.get("Resources.Strings.ChildActivityExistsWarning");
											break;
										default:
											message = this.get("Resources.Strings.DefaultWarning");
									}
									self.showInformationDialog(message);
								} else {
									this.set("canDelete", true);
									var canDelete = this.get("canDelete");
									self.deleteRecords(canDelete);
								}
							};
							ProjectResourceElementServiceHelper.getCanDelete(records, callback, this);
						}
					},

					/**
					 * ######## ######
					 * @overridden
					 */
					deleteRecords: function(needDelete) {
						if (needDelete) {
							this.callParent(arguments);
							this.set("canDelete", false);
						} else {
							this.checkIfDeleteRecords();
						}
					},

					/**
					 * ######### ############
					 * @protected
					 */
					calculateProjectActualWork: function() {
						var gridData = this.getGridData();
						if (!gridData.getCount()) {
							return;
						}
						var projectId = this.get("MasterRecordId");
						var primaryColumnValues = gridData.getKeys();
						var workResourceElement = gridData.getByIndex(0);
						ProjectServiceHelper.CalculateProjectActualWork([projectId], function() {
							this.sandbox.publish("DetailChanged", [this.sandbox.id]);
							var esq = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "WorkResourceElement"});
							Terrasoft.each(workResourceElement.columns, function(column) {
								if (column.type === 0) { esq.addColumn(column.columnPath); }
							});
							var filter = Terrasoft.createColumnInFilterWithParameters("Id", primaryColumnValues);
							esq.filters.add("filter", filter);
							esq.getEntityCollection(function(response) {
								if (response && response.success) {
									var result = response.collection;
									Terrasoft.each(primaryColumnValues, function(item) {
										var newItem = result.get(item);
										var oldItem = gridData.get(item);
										Terrasoft.each(workResourceElement.columns, function(column) {
											oldItem.set(column.columnPath, newItem.get(column.columnPath));
										});
									});
								}
							}, this);
						}, this);
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
										"name": "ProjectResourceElementListedGridColumn",
										"bindTo": "ProjectResourceElement",
										"position": {
											"column": 1,
											"colSpan": 12
										}
									},
									{
										"name": "PlanningWorkListedGridColumn",
										"bindTo": "PlanningWork",
										"position": {
											"column": 13,
											"colSpan": 6
										}
									},
									{
										"name": "ActualWorkListedGridColumn",
										"bindTo": "ActualWork",
										"position": {
											"column": 19,
											"colSpan": 6
										}
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
										"name": "ProjectResourceElementTiledGridColumn",
										"bindTo": "ProjectResourceElement",
										"position": {
											"row": 1,
											"column": 1,
											"colSpan": 12
										}
									},
									{
										"name": "PlanningWorkTiledGridColumn",
										"bindTo": "PlanningWork",
										"position": {
											"row": 1,
											"column": 13,
											"colSpan": 6
										}
									},
									{
										"name": "ActualWorkTiledGridColumn",
										"bindTo": "ActualWork",
										"position": {
											"row": 1,
											"column": 19,
											"colSpan": 6
										}
									}
								]
							}

						}
					},
					{
						"operation": "insert",
						"name": "ActionSeparatorMenu",
						"parentName": "ActionsButton",
						"propertyName": "menu",
						"index": 1,
						"values": {
							className: "Terrasoft.MenuSeparator"
						}
					},
					{
						"operation": "insert",
						"name": "CalculateButton",
						"parentName": "ActionsButton",
						"propertyName": "menu",
						"index": 0,
						"values": {
							caption: { bindTo: "Resources.Strings.CalculateMenuItemCaption" },
							click: { bindTo: "calculateProjectActualWork" }
						}
					}
				]/**SCHEMA_DIFF*/
			};
		}
)
;


