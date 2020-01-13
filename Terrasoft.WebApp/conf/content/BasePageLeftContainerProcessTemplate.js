Terrasoft.configuration.Structures["BasePageLeftContainerProcessTemplate"] = {innerHierarchyStack: ["BasePageLeftContainerProcessTemplate"], structureParent: "BasePageProcessTemplate"};
define('BasePageLeftContainerProcessTemplateStructure', ['BasePageLeftContainerProcessTemplateResources'], function(resources) {return {schemaUId:'0fc280ad-cec2-41a2-94f6-bf153a37291f',schemaCaption: "Tabbed page with left area", parentSchemaName: "BasePageProcessTemplate", schemaName:'BasePageLeftContainerProcessTemplate',parentSchemaUId:'21620f25-166f-42f1-8b4d-224a959040a3',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Base page template with left container with process as source of data for page designer.
 * Parent: BasePageProcessTemplate
 */
define("BasePageLeftContainerProcessTemplate", [], function() {
	return {
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "LeftModulesContainer",
				"values": {
					"visible": true
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftModulesContainer",
				"propertyName": "items",
				"index": 0,
				"name": "LeftTopContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"classes": {
						"wrapClassName": ["profile-container", "autofill-layout"]
					},
					"collapseEmptyRow": true,
					"items": []
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


