Terrasoft.configuration.Structures["OpportunityDepartmentPage"] = {innerHierarchyStack: ["OpportunityDepartmentPage"], structureParent: "BasePageV2"};
define('OpportunityDepartmentPageStructure', ['OpportunityDepartmentPageResources'], function(resources) {return {schemaUId:'25f51197-ed87-4fea-8153-d35360ce3741',schemaCaption: "Sales division edit card", parentSchemaName: "BasePageV2", schemaName:'OpportunityDepartmentPage',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OpportunityDepartmentPage", ["BusinessRuleModule"],
		function(BusinessRuleModule) {
			return {
				entitySchemaName: "OpportunityDepartment",
				attributes:{
					"SalesDirector": {
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						lookupListConfig: {
							filter: function() {
								return Terrasoft.createColumnIsNotNullFilter("[SysAdminUnit:Contact].Id");
							}
						}
					},
					"SysAdminUnit": {
						lookupListConfig: {
							filter: function() {
								return Terrasoft.createColumnFilterWithParameter(
										Terrasoft.ComparisonType.LESS, "SysAdminUnitTypeValue", 4);
							}
						}
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "Name",
						"values": {
							"bindTo": "Name",
							"layout": { "column": 0, "row": 0, "colSpan": 24 }
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "SysAdminUnit",
						"values": {
							"bindTo": "SysAdminUnit",
							"layout": { "column": 0, "row": 1, "colSpan": 12 }
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "SalesDirector",
						"values": {
							"bindTo": "SalesDirector",
							"layout": { "column": 0, "row": 2, "colSpan": 12 }
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


