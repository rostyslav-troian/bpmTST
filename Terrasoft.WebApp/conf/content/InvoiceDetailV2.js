Terrasoft.configuration.Structures["InvoiceDetailV2"] = {innerHierarchyStack: ["InvoiceDetailV2"], structureParent: "BaseGridDetailV2"};
define('InvoiceDetailV2Structure', ['InvoiceDetailV2Resources'], function(resources) {return {schemaUId:'567ec105-b8d7-4b86-b038-c29fdd054b65',schemaCaption: "Detail schema - Invoice", parentSchemaName: "BaseGridDetailV2", schemaName:'InvoiceDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("InvoiceDetailV2", ["terrasoft"],
	function(Terrasoft) {
		return {
			entitySchemaName: "Invoice",
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
									"name": "PaymentStatusListedGridColumn",
									"bindTo": "PaymentStatus",
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
									"name": "PaymentStatusTiledGridColumn",
									"bindTo": "PaymentStatus",
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


