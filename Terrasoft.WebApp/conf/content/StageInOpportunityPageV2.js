Terrasoft.configuration.Structures["StageInOpportunityPageV2"] = {innerHierarchyStack: ["StageInOpportunityPageV2"], structureParent: "BasePageV2"};
define('StageInOpportunityPageV2Structure', ['StageInOpportunityPageV2Resources'], function(resources) {return {schemaUId:'b0e022ae-8b8b-43c7-9c0e-29a23e0a8270',schemaCaption: "StageInOpportunityPageV2", parentSchemaName: "BasePageV2", schemaName:'StageInOpportunityPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("StageInOpportunityPageV2", ["BaseFiltersGenerateModule"],
	function(BaseFiltersGenerateModule) {
		return {
			entitySchemaName: "OpportunityInStage",
			attributes: {
				"Owner": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					lookupListConfig: {filter: BaseFiltersGenerateModule.OwnerFilter}
				}
			},
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
					"name": "Stage",
					"values": {
						"bindTo": "Stage",
						"layout": { "column": 0, "row": 1, "colSpan": 12 },
						"enabled": false
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Owner",
					"values": {
						"bindTo": "Owner",
						"layout": { "column": 0, "row": 4, "colSpan": 12 }
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "StartDate",
					"values": {
						"bindTo": "StartDate",
						"layout": { "column": 0, "row": 2, "colSpan": 12 },
						"enabled": false
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "DueDate",
					"values": {
						"bindTo": "DueDate",
						"layout": { "column": 0, "row": 3, "colSpan": 12 },
						"enabled": false
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Comments",
					"values": {
						"bindTo": "Comments",
						"layout": { "column": 0, "row": 5, "colSpan": 12 },
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
			]/**SCHEMA_DIFF*/
		};
	});


