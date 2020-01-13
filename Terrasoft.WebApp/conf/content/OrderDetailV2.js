Terrasoft.configuration.Structures["OrderDetailV2"] = {innerHierarchyStack: ["OrderDetailV2"], structureParent: "BaseGridDetailV2"};
define('OrderDetailV2Structure', ['OrderDetailV2Resources'], function(resources) {return {schemaUId:'933e9192-bdc0-4b4c-9607-aee7c556f787',schemaCaption: "Order detail schema", parentSchemaName: "BaseGridDetailV2", schemaName:'OrderDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OrderDetailV2", ["terrasoft"],
	function(Terrasoft) {
		return {
			entitySchemaName: "Order",
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
										"colSpan": 8
									},
									"type": Terrasoft.GridCellType.TITLE
								},
								{
									"name": "PrimaryAmountListedGridColumn",
									"bindTo": "PrimaryAmount",
									"position": {
										"column": 9,
										"colSpan": 8
									}
								},
								{
									"name": "StatusListedGridColumn",
									"bindTo": "Status",
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
									"name": "NumberTiledGridColumn",
									"bindTo": "Number",
									"position": {
										"row": 1,
										"column": 1,
										"colSpan": 8
									},
									"type": Terrasoft.GridCellType.TITLE
								},
								{
									"name": "PrimaryAmountTiledGridColumn",
									"bindTo": "PrimaryAmount",
									"position": {
										"row": 1,
										"column": 9,
										"colSpan": 8
									}
								},
								{
									"name": "StatusTiledGridColumn",
									"bindTo": "Status",
									"position": {
										"row": 1,
										"column": 17,
										"colSpan": 8
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


