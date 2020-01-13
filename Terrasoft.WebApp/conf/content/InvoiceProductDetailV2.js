Terrasoft.configuration.Structures["InvoiceProductDetailV2"] = {innerHierarchyStack: ["InvoiceProductDetailV2Invoice", "InvoiceProductDetailV2"], structureParent: "ProductDetailV2"};
define('InvoiceProductDetailV2InvoiceStructure', ['InvoiceProductDetailV2InvoiceResources'], function(resources) {return {schemaUId:'9ffd62f9-d28f-47b1-a1fa-ebedf86e417c',schemaCaption: "Detail - Product in invoice", parentSchemaName: "ProductDetailV2", schemaName:'InvoiceProductDetailV2Invoice',parentSchemaUId:'956729e3-33ef-4895-9d70-9e252958b63c',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('InvoiceProductDetailV2Structure', ['InvoiceProductDetailV2Resources'], function(resources) {return {schemaUId:'1c43ea4d-712c-460c-b954-32729d50df57',schemaCaption: "Detail - Product in invoice", parentSchemaName: "InvoiceProductDetailV2Invoice", schemaName:'InvoiceProductDetailV2',parentSchemaUId:'9ffd62f9-d28f-47b1-a1fa-ebedf86e417c',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"InvoiceProductDetailV2Invoice",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('InvoiceProductDetailV2InvoiceResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("InvoiceProductDetailV2Invoice", [], function() {
	return {
		entitySchemaName: "InvoiceProduct",
		attributes: {},
		methods: {},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});

define("InvoiceProductDetailV2", [], function() {
	return {
		entitySchemaName: "InvoiceProduct",
		attributes: {},
		methods: {
			init: function() {
				this.callParent(arguments);
				this.set("MultiSelect", false);
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


