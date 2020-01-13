Terrasoft.configuration.Structures["ProjectResourceElementDetailV2"] = {innerHierarchyStack: ["ProjectResourceElementDetailV2"], structureParent: "BaseGridDetailV2"};
define('ProjectResourceElementDetailV2Structure', ['ProjectResourceElementDetailV2Resources'], function(resources) {return {schemaUId:'6a00494d-4b91-49b3-bbca-adf003466799',schemaCaption: "ProjectResourceElementDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'ProjectResourceElementDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProjectResourceElementDetailV2", ["terrasoft", "ProjectResourceElementServiceHelper"],
	function(Terrasoft, ProjectResourceElementServiceHelper) {
		return {
			entitySchemaName: "ProjectResourceElement",
			methods: {
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
								self.deleteRecords();
							}
						};
						ProjectResourceElementServiceHelper.getCanDelete(records, callback, this);
					}
				},
				deleteRecords: function() {
					if (this.get("canDelete")) {
						this.callParent(arguments);
						this.set("canDelete", false);
					} else {
						this.checkIfDeleteRecords();
					}
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
									"name": "NameListedGridColumn",
									"bindTo": "Name",
									"position": {
										"column": 1,
										"colSpan": 8
									}
								},
								{
									"name": "PlanningWorkListedGridColumn",
									"bindTo": "PlanningWork",
									"position": {
										"column": 9,
										"colSpan": 8
									}
								},
								{
									"name": "ActualWorkListedGridColumn",
									"bindTo": "ActualWork",
									"position": {
										"column": 17,
										"colSpan": 8
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
									"name": "NameTiledGridColumn",
									"bindTo": "Name",
									"position": {
										"row": 1,
										"column": 1,
										"colSpan": 8
									}
								},
								{
									"name": "PlanningWorkTiledGridColumn",
									"bindTo": "PlanningWork",
									"position": {
										"row": 1,
										"column": 9,
										"colSpan": 8
									}
								},
								{
									"name": "ActualWorkTiledGridColumn",
									"bindTo": "ActualWork",
									"position": {
										"row": 1,
										"column": 17,
										"colSpan": 8
									}
								},
								{
									"name": "PlanningWorkTiledGridColumn",
									"bindTo": "InternalRate",
									"position": {
										"row": 2,
										"column": 1,
										"colSpan": 12
									}
								},
								{
									"name": "ActualWorkTiledGridColumn",
									"bindTo": "ExternalRate",
									"position": {
										"row": 2,
										"column": 13,
										"colSpan": 12
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


