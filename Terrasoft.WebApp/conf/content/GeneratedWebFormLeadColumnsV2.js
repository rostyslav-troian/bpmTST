Terrasoft.configuration.Structures["GeneratedWebFormLeadColumnsV2"] = {innerHierarchyStack: ["GeneratedWebFormLeadColumnsV2"], structureParent: "BasePageV2"};
define('GeneratedWebFormLeadColumnsV2Structure', ['GeneratedWebFormLeadColumnsV2Resources'], function(resources) {return {schemaUId:'7b254626-c465-4b66-aace-8901899a9794',schemaCaption: "GeneratedWebFormLeadColumnsV2", parentSchemaName: "BasePageV2", schemaName:'GeneratedWebFormLeadColumnsV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("GeneratedWebFormLeadColumnsV2", ["terrasoft", "BusinessRuleModule", "ext-base", "sandbox"],
function(Terrasoft, BusinessRuleModule, Ext, sandbox) {
	return {
		entitySchemaName: "Lead",
		columns: {},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"values": {
					"itemType": 7,
					"name": "GeneratedWebFormLeadColumnsGeneralTabContainer",
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "GeneratedWebFormLeadColumnsGeneralTabContainer",
				"propertyName": "items",
				"values": {
					"name": "GeneratedWebFormLeadColumnsGeneralBlock",
					"itemType": 0,
					"items": []
				}
			}
		]/**SCHEMA_DIFF*/,
		rules: {},
		userCode: {}
	};
});


