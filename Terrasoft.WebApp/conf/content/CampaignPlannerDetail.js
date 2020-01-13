Terrasoft.configuration.Structures["CampaignPlannerDetail"] = {innerHierarchyStack: ["CampaignPlannerDetail"], structureParent: "BaseGridDetailV2"};
define('CampaignPlannerDetailStructure', ['CampaignPlannerDetailResources'], function(resources) {return {schemaUId:'073a9e31-a9d8-430a-8e6b-d1e22c0e6d62',schemaCaption: "CampaignPlannerDetail", parentSchemaName: "BaseGridDetailV2", schemaName:'CampaignPlannerDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignPlannerDetail", [],
	function() {
		return {
			entitySchemaName: "CampaignPlanner",
			attributes: {},
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
									"type": "text",
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
									"name": "NameTiledGridColumn",
									"bindTo": "Name",
									"type": "text",
									"position": {
										"row": 1,
										"column": 0,
										"colSpan": 24
									},
									"captionConfig": {
										"visible": false
									}
								}
							]
						}
					}
				}
			]/**SCHEMA_DIFF*/,
			methods: {},
			messages: {}
		};
	});


