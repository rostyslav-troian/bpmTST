Terrasoft.configuration.Structures["ServiceItemDetail"] = {innerHierarchyStack: ["ServiceItemDetail"], structureParent: "BaseGridDetailV2"};
define('ServiceItemDetailStructure', ['ServiceItemDetailResources'], function(resources) {return {schemaUId:'ec0e98c0-7ba4-4753-8158-79a1a8c1105b',schemaCaption: "Detail schema - \"Services\" section", parentSchemaName: "BaseGridDetailV2", schemaName:'ServiceItemDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ServiceItemDetail", [],
function() {
	return {
		entitySchemaName: "ServiceItem",
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


