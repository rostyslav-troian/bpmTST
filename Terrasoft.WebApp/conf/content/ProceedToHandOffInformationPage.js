Terrasoft.configuration.Structures["ProceedToHandOffInformationPage"] = {innerHierarchyStack: ["ProceedToHandOffInformationPageCoreLead", "ProceedToHandOffInformationPage"], structureParent: "BasePageSimpleProcessTemplate"};
define('ProceedToHandOffInformationPageCoreLeadStructure', ['ProceedToHandOffInformationPageCoreLeadResources'], function(resources) {return {schemaUId:'067c50a0-c32f-4029-b05b-7eb828899354',schemaCaption: "Proceed to handoff: Information", parentSchemaName: "BasePageSimpleProcessTemplate", schemaName:'ProceedToHandOffInformationPageCoreLead',parentSchemaUId:'5826ff24-46c6-4169-9223-2aaad9ec2e18',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ProceedToHandOffInformationPageStructure', ['ProceedToHandOffInformationPageResources'], function(resources) {return {schemaUId:'98b0cbde-7375-4e82-b2a7-0417ebddfbdb',schemaCaption: "Proceed to handoff: Information", parentSchemaName: "ProceedToHandOffInformationPageCoreLead", schemaName:'ProceedToHandOffInformationPage',parentSchemaUId:'067c50a0-c32f-4029-b05b-7eb828899354',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ProceedToHandOffInformationPageCoreLead",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ProceedToHandOffInformationPageCoreLeadResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ProceedToHandOffInformationPageCoreLead", [], function() {
	return {
		entitySchemaName: "",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "LeadType",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "LeadType",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Budget",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "Budget",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "OpportunityResponsible",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "OpportunityResponsible",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "OpportunityDepartment",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "OpportunityDepartment",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "MeetingTime",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "Header"
					},
					"bindTo": "MeetingTime",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "DecisionDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "Header"
					},
					"bindTo": "DecisionDate",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "Comment",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "Header"
					},
					"bindTo": "Comment",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 6
			}
		]/**SCHEMA_DIFF*/
	};
});

define("ProceedToHandOffInformationPage", [], function() {
	return {
		entitySchemaName: "",
		attributes: {
			"IsSSPMode": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"value": Terrasoft.isCurrentUserSsp()
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "SystemUserUIContainer",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"visible": {
						"bindTo": "IsSSPMode",
						"bindConfig": {"converter": "invertBooleanValue"}
					}
				}
			},
			{
				"operation": "move",
				"name": "Header",
				"parentName": "SystemUserUIContainer",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "SSPUserUIContainer",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"visible": {
						"bindTo": "IsSSPMode"
					}
				}
			},
			{
				"operation": "insert",
				"name": "SSPUserUIContainer_GridLayout",
				"parentName": "SSPUserUIContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": [],
					"collapseEmptyRow": true
				}
			},
			{
				"operation": "insert",
				"name": "LeadType",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "LeadType",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "SSPUserUIContainer_GridLayout",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Budget",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "Budget",
					"enabled": true
				},
				"parentName": "SSPUserUIContainer_GridLayout",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "OpportunityResponsible",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "OpportunityResponsible",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "SSPUserUIContainer_GridLayout",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MeetingTime",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "Header"
					},
					"bindTo": "MeetingTime",
					"enabled": true
				},
				"parentName": "SSPUserUIContainer_GridLayout",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "DecisionDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "Header"
					},
					"bindTo": "DecisionDate",
					"enabled": true
				},
				"parentName": "SSPUserUIContainer_GridLayout",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "Comment",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "Header"
					},
					"bindTo": "Comment",
					"enabled": true
				},
				"parentName": "SSPUserUIContainer_GridLayout",
				"propertyName": "items",
				"index": 6
			}
		]/**SCHEMA_DIFF*/,
		rules: {}
	};
});


