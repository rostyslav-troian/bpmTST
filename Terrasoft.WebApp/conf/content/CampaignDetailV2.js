Terrasoft.configuration.Structures["CampaignDetailV2"] = {innerHierarchyStack: ["CampaignDetailV2"], structureParent: "BaseGridDetailV2"};
define('CampaignDetailV2Structure', ['CampaignDetailV2Resources'], function(resources) {return {schemaUId:'7036dfcb-d430-4bb8-a4bc-db1abf627b51',schemaCaption: "\"Campaigns\" section detail schema", parentSchemaName: "BaseGridDetailV2", schemaName:'CampaignDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignDetailV2", ["terrasoft"], function() {
	return {
		entitySchemaName: "Campaign",
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
		]/**SCHEMA_DIFF*/
	};
});


