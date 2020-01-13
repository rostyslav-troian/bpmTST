Terrasoft.configuration.Structures["BaseLookupPage"] = {innerHierarchyStack: ["BaseLookupPage"], structureParent: "BasePageV2"};
define('BaseLookupPageStructure', ['BaseLookupPageResources'], function(resources) {return {schemaUId:'0a254ad1-c2fb-43ae-ac4d-63932be0835b',schemaCaption: "Base lookup page", parentSchemaName: "BasePageV2", schemaName:'BaseLookupPage',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseLookupPage", ["terrasoft", "BusinessRuleModule", "ext-base", "sandbox", "BaseLookupPageResources"],
	function(Terrasoft, BusinessRuleModule, Ext, sandbox, resources) {
		return {
			entitySchemaName: "BaseLookup",
			attributes: {},
			details: /**SCHEMA_DETAILS*/{}, /**SCHEMA_DETAILS*/
			methods: {},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "GeneralInfoTabContainer",
					"parentName": "CardContentContainer",
					"propertyName": "items",
					"values": {
						itemType: Terrasoft.ViewItemType.CONTAINER,
						items: []
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoTabContainer",
					"name": "GeneralInfoControlGroup",
					"propertyName": "items",
					"values": {
						itemType: Terrasoft.ViewItemType.CONTROL_GROUP,
						caption: "",
						items: [],
						controlConfig: {
							collapsed: false
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoControlGroup",
					"propertyName": "items",
					"name": "GeneralInfoBlock",
					"values": {
						itemType: Terrasoft.ViewItemType.GRID_LAYOUT,
						items: []
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoBlock",
					"propertyName": "items",
					"name": "Name",
					"values": {
						"bindTo": "Name",
						"layout": {"column": 0, "row": 0, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoBlock",
					"propertyName": "items",
					"name": "Description",
					"values": {
						"bindTo": "Description",
						"layout": {"column": 0, "row": 1, "colSpan": 12}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


