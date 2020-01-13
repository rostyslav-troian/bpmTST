Terrasoft.configuration.Structures["ProductSpecificationDetailV2"] = {innerHierarchyStack: ["ProductSpecificationDetailV2"], structureParent: "SpecificationDetailV2"};
define('ProductSpecificationDetailV2Structure', ['ProductSpecificationDetailV2Resources'], function(resources) {return {schemaUId:'a9957ab1-cb42-40c9-81fc-30ffa35c8089',schemaCaption: "Product specification detail", parentSchemaName: "SpecificationDetailV2", schemaName:'ProductSpecificationDetailV2',parentSchemaUId:'a11d688b-21ce-4e22-8d01-281545aa00c9',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProductSpecificationDetailV2", function() {
		return {
			entitySchemaName: "SpecificationInProduct",
			methods: {
				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilterDefaultColumnName
				 * @overridden
				 */
				getFilterDefaultColumnName: function() {
					return "Specification";
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"rowDataItemMarkerColumnName": "Specification"
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


