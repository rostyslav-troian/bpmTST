Terrasoft.configuration.Structures["EventProductDetailV2"] = {innerHierarchyStack: ["EventProductDetailV2"], structureParent: "BaseGridDetailV2"};
define('EventProductDetailV2Structure', ['EventProductDetailV2Resources'], function(resources) {return {schemaUId:'e704d1f4-a020-4cfa-ab73-30ea88b807b8',schemaCaption: "EventProductDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'EventProductDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EventProductDetailV2", ["terrasoft"],
		function(Terrasoft) {
			return {
				entitySchemaName: "EventProduct",
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
										"name": "ProductListedGridColumn",
										"bindTo": "Product",
										"position": {
											"column": 1,
											"colSpan": 12
										},
										"type": Terrasoft.GridCellType.TITLE
									},
									{
										"name": "NoteListedGridColumn",
										"bindTo": "Note",
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
										"name": "ProductTiledGridColumn",
										"bindTo": "Product",
										"position": {
											"row": 1,
											"column": 1,
											"colSpan": 24
										},
										"type": Terrasoft.GridCellType.TITLE
									},
									{
										"name": "NoteTiledGridColumn",
										"bindTo": "Note",
										"position": {
											"row": 2,
											"column": 1,
											"colSpan": 24
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


