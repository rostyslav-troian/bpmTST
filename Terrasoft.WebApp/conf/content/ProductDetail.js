Terrasoft.configuration.Structures["ProductDetail"] = {innerHierarchyStack: ["ProductDetail"]};
define('ProductDetailStructure', ['ProductDetailResources'], function(resources) {return {schemaUId:'39e42bc8-0c8a-45f4-aeae-e029207fdc3c',schemaCaption: "Detail - Products", parentSchemaName: "", schemaName:'ProductDetail',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProductDetail", ["ProductDetailStructure",
	'ProductDetailResources'],
	function(structure, resources) {
	structure.userCode = function() {
		this.name = 'ProductDetailViewModel';
		this.utilsConfig = {
			hiddenAdd: true,
			useAdditionalAddButton: true
		};
		this.columnsConfig = [
			[{
				cols: 16,
				key: [{
					name: {
						bindTo: 'Name'
					},
					type: 'title'
				}]
			}, {
				cols: 3,
				key: [{
					name: {
						bindTo: 'Quantity'
					}
				}]
			}, {
				cols: 5,
				key: [{
					name: {
						bindTo: 'TotalAmount'
					}
				}]
			}]
		];
		this.loadedColumns = [{
			columnPath: 'Name'
		}, {
			columnPath: 'Quantity'
		}, {
			columnPath: 'TotalAmount'
		}];
	};
	return structure;
});


