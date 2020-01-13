Terrasoft.configuration.Structures["OpportunityStagePageV2"] = {innerHierarchyStack: ["OpportunityStagePageV2"], structureParent: "BaseLookupEditPage"};
define('OpportunityStagePageV2Structure', ['OpportunityStagePageV2Resources'], function(resources) {return {schemaUId:'115b96d9-95bf-4811-a63f-bcaf54cb85c4',schemaCaption: "Opportunity stage lookup edit page", parentSchemaName: "BaseLookupEditPage", schemaName:'OpportunityStagePageV2',parentSchemaUId:'a8479d18-f601-4d5b-8f75-ec1f6bf2c15d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OpportunityStagePageV2", [],
	function() {
		return {
			entitySchemaName: "OpportunityStage",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			attributes: {},
			methods: {},
			rules: {},
			userCode: {},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "ShowInFunnel",
					"values": {
						"bindTo": "ShowInFunnel",
						"layout": {"column": 0, "row": 1, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "ShowInProgressBar",
					"values": {
						"bindTo": "ShowInProgressBar",
						"layout": {"column": 0, "row": 2, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "End",
					"values": {
						"bindTo": "End",
						"layout": {"column": 0, "row": 3, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Successful",
					"values": {
						"bindTo": "Successful",
						"layout": {"column": 0, "row": 4, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Number",
					"values": {
						"bindTo": "Number",
						"layout": {"column": 12, "row": 1, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "MaxProbability",
					"values": {
						"bindTo": "MaxProbability",
						"layout": {"column": 12, "row": 2, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "NextStepTerm",
					"values": {
						"bindTo": "NextStepTerm",
						"layout": {"column": 12, "row": 3, "colSpan": 12}
					}
				},
				{
					"operation": "merge",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Description",
					"values": {
						"bindTo": "Description",
						"layout": {"column": 0, "row": 5, "colSpan": 24}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


