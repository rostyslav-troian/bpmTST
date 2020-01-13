Terrasoft.configuration.Structures["InvoiceVisaPage"] = {innerHierarchyStack: ["InvoiceVisaPage"]};
define('InvoiceVisaPageStructure', ['InvoiceVisaPageResources'], function(resources) {return {schemaUId:'6e3944e9-798c-4563-b3cd-82858c872769',schemaCaption: "InvoiceVisaPage", parentSchemaName: "", schemaName:'InvoiceVisaPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("InvoiceVisaPage", ["InvoiceVisaPageStructure", 'InvoiceVisaPageResources', 'InvoiceVisa'],
	function(structure, resources, InvoiceVisa) {
		structure.userCode = function() {
			var filterSchemaName = 'Invoice';
			this.entitySchema = InvoiceVisa;
			this.name = 'InvoiceVisaCardViewModel';
			this.extend = 'VisaPage';

		};
		structure.extend = 'VisaPage';

		return structure;
	})





//define('InvoiceVisaPage', ['InvoiceVisaPageStructure', 'InvoiceVisaPageResources', 'InvoiceVisa'],
//	function(structure, resources, InvoiceVisa) {
//		structure.userCode = function() {
//			this.entitySchema = InvoiceVisa;
//			this.name = 'InvoiceVisaCardViewModel';
////					filterSchemaName = 'Invoice';
//		};
//		structure.extend = 'VisaPage';
//
//		return structure;
//	})


