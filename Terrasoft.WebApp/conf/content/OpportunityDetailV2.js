Terrasoft.configuration.Structures["OpportunityDetailV2"] = {innerHierarchyStack: ["OpportunityDetailV2"], structureParent: "BaseGridDetailV2"};
define('OpportunityDetailV2Structure', ['OpportunityDetailV2Resources'], function(resources) {return {schemaUId:'83bd60f4-c7e8-4ee8-9029-0abbaaf1677e',schemaCaption: "OpportunityDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'OpportunityDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OpportunityDetailV2", [],
	function() {
		return {
			entitySchemaName: "Opportunity",
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
									"name": "TitleListedGridColumn",
									"bindTo": "Title",
									"position": {
										"column": 1,
										"colSpan": 10
									},
									"type": Terrasoft.GridCellType.TITLE
								},
								{
									"name": "StageListedGridColumn",
									"bindTo": "Stage",
									"position": {
										"column": 11,
										"colSpan": 8
									}
								},
								{
									"name": "RevenueListedGridColumn",
									"bindTo": "Amount",
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
									"name": "TitleTiledGridColumn",
									"bindTo": "Title",
									"position": {
										"row": 1,
										"column": 1,
										"colSpan": 10
									},
									"type": Terrasoft.GridCellType.TITLE
								},
								{
									"name": "StageTiledGridColumn",
									"bindTo": "Stage",
									"position": {
										"row": 1,
										"column": 11,
										"colSpan": 8
									}
								},
								{
									"name": "RevenueTiledGridColumn",
									"bindTo": "Amount",
									"position": {
										"row": 1,
										"column": 19,
										"colSpan": 6
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


