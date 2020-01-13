Terrasoft.configuration.Structures["BasePageSimpleProcessTemplate"] = {innerHierarchyStack: ["BasePageSimpleProcessTemplate"], structureParent: "BasePageProcessTemplate"};
define('BasePageSimpleProcessTemplateStructure', ['BasePageSimpleProcessTemplateResources'], function(resources) {return {schemaUId:'5826ff24-46c6-4169-9223-2aaad9ec2e18',schemaCaption: "Grid page", parentSchemaName: "BasePageProcessTemplate", schemaName:'BasePageSimpleProcessTemplate',parentSchemaUId:'21620f25-166f-42f1-8b4d-224a959040a3',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Simple base page template with process as source of data for page designer.
 * Parent: BasePageProcessTemplate
 */
define("BasePageSimpleProcessTemplate", [], function() {
	return {
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "Tabs"
			}
		]/**SCHEMA_DIFF*/
	};
});


