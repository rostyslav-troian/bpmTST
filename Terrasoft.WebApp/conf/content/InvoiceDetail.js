Terrasoft.configuration.Structures["InvoiceDetail"] = {innerHierarchyStack: ["InvoiceDetail"]};
define('InvoiceDetailStructure', ['InvoiceDetailResources'], function(resources) {return {schemaUId:'4fd0659f-b551-4f1a-9212-2915ee9ae286',schemaCaption: "Detail schema - Invoice (Old version)", parentSchemaName: "", schemaName:'InvoiceDetail',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("InvoiceDetail", ['ext-base', 'terrasoft', 'Invoice', "InvoiceDetailStructure", 'InvoiceDetailResources'],
	function(Ext, Terrasoft, Invoice,  structure, resources) {

	structure.userCode = function() {
		this.entitySchema = Invoice;
		this.name = 'InvoiceDetailViewModel';
		this.editPageName = 'InvoicePage';
		this.columnsConfig = [
			{
				cols: 8,
				key: [
					{
						name: {
							bindTo: 'Number'
						},
						type: 'title'
					}
				]
			},
			{
				cols: 8,
				key: [
					{
						name: {
							bindTo: 'PrimaryAmount'
						}
					}
				]
			},
			{
				cols: 8,
				key: [
					{
						name: {
							bindTo: 'PaymentStatus'
						}
					}
				]
			}
		];
		this.loadedColumns = [
			{
				columnPath: 'Number'
			}, {
				columnPath: 'PrimaryAmount'
			}, {
				columnPath: 'PaymentStatus'
			}
		];
		this.methods.setEntitySchema = function() {
			this.entitySchema = Invoice;
		};
	};
	return structure;
});


