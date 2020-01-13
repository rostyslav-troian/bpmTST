Terrasoft.configuration.Structures["ContextHelpPage"] = {innerHierarchyStack: ["ContextHelpPage"], structureParent: "BaseModulePageV2"};
define('ContextHelpPageStructure', ['ContextHelpPageResources'], function(resources) {return {schemaUId:'d55be761-78aa-40e2-8852-fa0975b1eb0b',schemaCaption: "Web help page", parentSchemaName: "BaseModulePageV2", schemaName:'ContextHelpPage',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContextHelpPage", [], function() {
	return {
		entitySchemaName: "ContextHelp",
		attributes: {
			"ContextHelpId": {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Name",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "Name",
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 8
					}
				}
			},
			{
				"operation": "insert",
				"name": "Description",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "Description",
					"layout": {
						"column": 8,
						"row": 0,
						"colSpan": 16
					}
				}
			},
			{
				"operation": "insert",
				"name": "LMSUrl",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "LMSUrl",
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 8
					}
				}
			},
			{
				"operation": "insert",
				"name": "ProductEdition",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "ProductEdition",
					"layout": {
						"column": 8,
						"row": 1,
						"colSpan": 8
					}
				}
			},
			{
				"operation": "insert",
				"name": "ConfigurationVersion",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "ConfigurationVersion",
					"layout": {
						"column": 16,
						"row": 1,
						"colSpan": 8
					}
				}
			},
			{
				"operation": "insert",
				"name": "Code",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "Code",
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"name": "ContextHelpId",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "ContextHelpId",
					"layout": {
						"column": 12,
						"row": 2,
						"colSpan": 12
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


