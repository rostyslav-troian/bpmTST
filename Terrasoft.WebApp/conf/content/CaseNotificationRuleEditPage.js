Terrasoft.configuration.Structures["CaseNotificationRuleEditPage"] = {innerHierarchyStack: ["CaseNotificationRuleEditPage"], structureParent: "BaseModulePageV2"};
define('CaseNotificationRuleEditPageStructure', ['CaseNotificationRuleEditPageResources'], function(resources) {return {schemaUId:'880d9af6-30f6-401f-9745-fe33901b6afb',schemaCaption: "Page schema - Case notification rule", parentSchemaName: "BaseModulePageV2", schemaName:'CaseNotificationRuleEditPage',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CaseNotificationRuleEditPage", [],
	function() {
		return {
			entitySchemaName: "CaseNotificationRule",
			messages: {},
			diff: [
				{
					"operation": "remove",
					"name": "ESNTab"
				},
				{
					"operation": "remove",
					"name": "ESNFeedContainer"
				},
				{
					"operation": "remove",
					"name": "ESNFeed"
				},
				{
					"operation": "insert",
					"name": "CaseStatus",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 12,
							"rowSpan": 1
						}
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "CaseCategory",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12,
							"rowSpan": 1
						}
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "EmailTemplate",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "EmailTemplate"
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 3
				}
			],
			methods: {}
		};
	});


