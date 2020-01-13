Terrasoft.configuration.Structures["SiteEventTypeDetail"] = {innerHierarchyStack: ["SiteEventTypeDetail"], structureParent: "BaseGridDetailV2"};
define('SiteEventTypeDetailStructure', ['SiteEventTypeDetailResources'], function(resources) {return {schemaUId:'04e2904a-b1a4-4083-b1f7-7fa8d55afa45',schemaCaption: "Detail - Website event type", parentSchemaName: "BaseGridDetailV2", schemaName:'SiteEventTypeDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SiteEventTypeDetail", ["terrasoft"],
function(Terrasoft) {
	return {
		entitySchemaName: "SiteEventType",
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


