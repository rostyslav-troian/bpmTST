Terrasoft.configuration.Structures["LeadSpecificationDetailV2"] = {innerHierarchyStack: ["LeadSpecificationDetailV2"], structureParent: "SpecificationDetailV2"};
define('LeadSpecificationDetailV2Structure', ['LeadSpecificationDetailV2Resources'], function(resources) {return {schemaUId:'dca87fab-b050-4832-8dab-573d978562c4',schemaCaption: "Detail schema - \"Need features\"", parentSchemaName: "SpecificationDetailV2", schemaName:'LeadSpecificationDetailV2',parentSchemaUId:'a11d688b-21ce-4e22-8d01-281545aa00c9',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LeadSpecificationDetailV2", [],
	function() {
		return {
			entitySchemaName: "SpecificationInLead",
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
	}
);


