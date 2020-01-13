Terrasoft.configuration.Structures["ProductStockBalanceDetailV2"] = {innerHierarchyStack: ["ProductStockBalanceDetailV2"], structureParent: "BaseGridDetailV2"};
define('ProductStockBalanceDetailV2Structure', ['ProductStockBalanceDetailV2Resources'], function(resources) {return {schemaUId:'2c25cf74-1c6e-48c3-91a2-66c081d4cb9b',schemaCaption: "Product in stock detail", parentSchemaName: "BaseGridDetailV2", schemaName:'ProductStockBalanceDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProductStockBalanceDetailV2", [],
	function() {
		return {
			entitySchemaName: "ProductStockBalance",
			methods: {
				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilterDefaultColumnName
				 * @overridden
				 */
				getFilterDefaultColumnName: function() {
					return "Warehouse";
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"primaryDisplayColumnName": "Warehouse",
						"type": "listed",
						"listedConfig": {
							"name": "DataGridListedConfig",
							"items": [
								{
									"name": "WarehouseListedGridColumn",
									"bindTo": "Warehouse",
									"position": {"column": 0, "colSpan": 12}
								},
								{
									"name": "TotalQuantityListedGridColumn",
									"bindTo": "TotalQuantity",
									"position": {"column": 12, "colSpan": 4}
								},
								{
									"name": "ReserveQuantityListedGridColumn",
									"bindTo": "ReserveQuantity",
									"position": {"column": 16, "colSpan": 4}
								},
								{
									"name": "AvailableQuantityListedGridColumn",
									"bindTo": "AvailableQuantity",
									"position": {"column": 20, "colSpan": 4}
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
									"name": "WarehouseTiledGridColumn",
									"bindTo": "Warehouse",
									"position": {"row": 0, "column": 0, "colSpan": 12}
								},
								{
									"name": "TotalQuantityTiledGridColumn",
									"bindTo": "TotalQuantity",
									"position": {"row": 0, "column": 12, "colSpan": 4}
								},
								{
									"name": "ReserveQuantityTiledGridColumn",
									"bindTo": "ReserveQuantity",
									"position": {"row": 0, "column": 16, "colSpan": 4}
								},
								{
									"name": "AvailableQuantityTiledGridColumn",
									"bindTo": "AvailableQuantity",
									"position": {"row": 0, "column": 20, "colSpan": 4}
								}
							]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


