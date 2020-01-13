Terrasoft.configuration.Structures["OpportunityParticipantPageV2"] = {innerHierarchyStack: ["OpportunityParticipantPageV2Opportunity", "OpportunityParticipantPageV2"], structureParent: "BasePageV2"};
define('OpportunityParticipantPageV2OpportunityStructure', ['OpportunityParticipantPageV2OpportunityResources'], function(resources) {return {schemaUId:'38b9e577-152c-4eac-8a68-c296183b690f',schemaCaption: "OpportunityParticipantPageV2", parentSchemaName: "BasePageV2", schemaName:'OpportunityParticipantPageV2Opportunity',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityParticipantPageV2Structure', ['OpportunityParticipantPageV2Resources'], function(resources) {return {schemaUId:'49cbddb2-e190-433e-9975-6863e21d8be7',schemaCaption: "OpportunityParticipantPageV2", parentSchemaName: "OpportunityParticipantPageV2Opportunity", schemaName:'OpportunityParticipantPageV2',parentSchemaUId:'38b9e577-152c-4eac-8a68-c296183b690f',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OpportunityParticipantPageV2Opportunity",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityParticipantPageV2OpportunityResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OpportunityParticipantPageV2Opportunity", ["BusinessRuleModule"],
	function(BusinessRuleModule) {
		return {
			entitySchemaName: "OpportunityParticipant",
			details: /**SCHEMA_DETAILS*/{
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Opportunity",
					"values": {
						"bindTo": "Opportunity",
						"layout": { "column": 0, "row": 0, "colSpan": 24 },
						"enabled": false,
						"controlConfig": {
							"enableRightIcon": false
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Account",
					"values": {
						"bindTo": "Account",
						"layout": { "column": 0, "row": 1, "colSpan": 12 }
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Contact",
					"values": {
						"bindTo": "Contact",
						"layout": { "column": 0, "row": 2, "colSpan": 12 }
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Role",
					"values": {
						"bindTo": "Role",
						"layout": { "column": 0, "row": 3, "colSpan": 12 },
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Notes",
					"values": {
						"bindTo": "Notes",
						"layout": { "column": 0, "row": 4, "colSpan": 24 },
						"contentType": Terrasoft.ContentType.LONG_TEXT
					}
				},
				{
					"operation": "merge",
					"name": "Tabs",
					"parentName": "CardContentContainer",
					"propertyName": "items",
					"values": {
						"visible": false
					}
				}
			]/**SCHEMA_DIFF*/,
			rules: {
				"Contact": {
					"FiltrationContactByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Account",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					}
				}
			}
		};
	});

define("OpportunityParticipantPageV2", function() {
	return {
		entitySchemaName: 'OpportunityParticipant',
		columns: {},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		rules: {}
	};
});


