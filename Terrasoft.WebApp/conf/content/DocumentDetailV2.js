Terrasoft.configuration.Structures["DocumentDetailV2"] = {innerHierarchyStack: ["DocumentDetailV2"], structureParent: "BaseGridDetailV2"};
define('DocumentDetailV2Structure', ['DocumentDetailV2Resources'], function(resources) {return {schemaUId:'d8fc6feb-5731-4ca2-8268-4ef0f104bc68',schemaCaption: "DocumentDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'DocumentDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DocumentDetailV2", ["terrasoft"],
	function(Terrasoft) {
		return {
			entitySchemaName: "Document",
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
									"name": "NumberListedGridColumn",
									"bindTo": "Number",
									"position": {
										"column": 1,
										"colSpan": 12
									},
									"type": Terrasoft.GridCellType.TITLE
								},
								{
									"name": "TypeListedGridColumn",
									"bindTo": "Type",
									"position": {
										"column": 13,
										"colSpan": 12
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
									"name": "NumberTiledGridColumn",
									"bindTo": "Number",
									"position": {
										"row": 1,
										"column": 1,
										"colSpan": 12
									},
									"type": Terrasoft.GridCellType.TITLE
								},
								{
									"name": "TypeTiledGridColumn",
									"bindTo": "Type",
									"position": {
										"row": 1,
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


