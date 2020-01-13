Terrasoft.configuration.Structures["ProductsInInvoiceDetailV2"] = {innerHierarchyStack: ["ProductsInInvoiceDetailV2"], structureParent: "BaseGridDetailV2"};
define('ProductsInInvoiceDetailV2Structure', ['ProductsInInvoiceDetailV2Resources'], function(resources) {return {schemaUId:'49cb000f-c622-4759-9b8b-b47d937bb73a',schemaCaption: "ProductsInInvoiceDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'ProductsInInvoiceDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProductsInInvoiceDetailV2", ["terrasoft"],
	function(Terrasoft) {
		return {
			entitySchemaName: "VwInvoiceProduct",
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

							]
						},
						"tiledConfig": {
							"name": "DataGridTiledConfig",
							"grid": {
								"columns": 24,
								"rows": 3
							},
							"items": [

							]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


