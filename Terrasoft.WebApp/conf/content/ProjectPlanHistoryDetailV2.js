Terrasoft.configuration.Structures["ProjectPlanHistoryDetailV2"] = {innerHierarchyStack: ["ProjectPlanHistoryDetailV2"], structureParent: "BaseGridDetailV2"};
define('ProjectPlanHistoryDetailV2Structure', ['ProjectPlanHistoryDetailV2Resources'], function(resources) {return {schemaUId:'7747050e-876c-4f44-bf1f-c611a3b07c3a',schemaCaption: "ProjectPlanHistoryDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'ProjectPlanHistoryDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProjectPlanHistoryDetailV2", ["terrasoft"],
	function(Terrasoft) {
		return {
			entitySchemaName: "ProjectPlanHistoryItem",
			attributes: {},
			methods: {},
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
									"name": "RoleListedGridColumn",
									"bindTo": "Role",
									"position": {
										"column": 1,
										"colSpan": 6
									}
								},
								{
									"name": "PlanningWorkListedGridColumn",
									"bindTo": "PlanningWork",
									"position": {
										"column": 7,
										"colSpan": 4
									}
								},
								{
									"name": "EndDateListedGridColumn",
									"bindTo": "EndDate",
									"position": {
										"column": 11,
										"colSpan": 6
									}
								},
								{
									"name": "PlanningCompletionListedGridColumn",
									"bindTo": "PlanningCompletion",
									"position": {
										"column": 17,
										"colSpan": 4
									}
								},
								{
									"name": "ActualCompletionListedGridColumn",
									"bindTo": "ActualCompletion",
									"position": {
										"column": 21,
										"colSpan": 4
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
									"name": "RoleTiledGridColumn",
									"bindTo": "Role",
									"position": {
										"row": 1,
										"column": 1,
										"colSpan": 6
									}
								},
								{
									"name": "PlanningWorkTiledGridColumn",
									"bindTo": "PlanningWork",
									"position": {
										"row": 1,
										"column": 7,
										"colSpan": 4
									}
								},
								{
									"name": "EndDateTiledGridColumn",
									"bindTo": "EndDate",
									"position": {
										"row": 1,
										"column": 11,
										"colSpan": 6
									}
								},
								{
									"name": "PlanningCompletionTiledGridColumn",
									"bindTo": "PlanningCompletion",
									"position": {
										"row": 1,
										"column": 17,
										"colSpan": 4
									}
								},
								{
									"name": "ActualCompletionTiledGridColumn",
									"bindTo": "ActualCompletion",
									"position": {
										"row": 1,
										"column": 21,
										"colSpan": 4
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


