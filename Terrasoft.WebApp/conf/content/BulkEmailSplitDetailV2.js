Terrasoft.configuration.Structures["BulkEmailSplitDetailV2"] = {innerHierarchyStack: ["BulkEmailSplitDetailV2"], structureParent: "BaseGridDetailV2"};
define('BulkEmailSplitDetailV2Structure', ['BulkEmailSplitDetailV2Resources'], function(resources) {return {schemaUId:'7f9eeb11-07b8-4247-b3a5-60801f53b6ca',schemaCaption: "Section detail schema - \"Email: split tests\"", parentSchemaName: "BaseGridDetailV2", schemaName:'BulkEmailSplitDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BulkEmailSplitDetailV2", [],
function() {
	return {
		entitySchemaName: "BulkEmailSplit",
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


