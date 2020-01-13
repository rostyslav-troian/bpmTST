Terrasoft.configuration.Structures["BasePageRightContainerProcessTemplate"] = {innerHierarchyStack: ["BasePageRightContainerProcessTemplate"], structureParent: "BasePageLeftContainerProcessTemplate"};
define('BasePageRightContainerProcessTemplateStructure', ['BasePageRightContainerProcessTemplateResources'], function(resources) {return {schemaUId:'476a99c1-0d73-4443-93ea-a0fcce318bf0',schemaCaption: "Tabbed page with right area", parentSchemaName: "BasePageLeftContainerProcessTemplate", schemaName:'BasePageRightContainerProcessTemplate',parentSchemaUId:'0fc280ad-cec2-41a2-94f6-bf153a37291f',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Base page template with right container with process as source of data for page designer.
 * Parent: BasePageLeftContainerProcessTemplate
 */
define("BasePageRightContainerProcessTemplate", ["css!BasePageRightContainerProcessTemplateCSS"], function() {
	return {
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "CardContentWrapper",
				"values": {
					"wrapClass": ["card-content-container", "right-container-template"]
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


