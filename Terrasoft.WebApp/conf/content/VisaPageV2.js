Terrasoft.configuration.Structures["VisaPageV2"] = {innerHierarchyStack: ["VisaPageV2"], structureParent: "BasePageV2"};
define('VisaPageV2Structure', ['VisaPageV2Resources'], function(resources) {return {schemaUId:'66e3a5b3-f004-4335-a4e9-5ba255c8a319',schemaCaption: "VisaPageV2", parentSchemaName: "BasePageV2", schemaName:'VisaPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("VisaPageV2", ["VisaPageV2Resources", "BusinessRuleModule"], function(resources) {
	return {
		entitySchemaName: "BaseVisa",
		columns: {},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "GeneralInfoTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"values": {
					"caption": resources.localizableStrings.GeneralInfoTabCaption ||
					resources.localizableStrings.BaseGeneralInfoTabCaption,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"name": "VisaGridLayout",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "VisaGridLayout",
				"propertyName": "items",
				"name": "VisaOwner",
				"values": {
					"bindTo": "VisaOwner",
					"layout": {"column": 0, "row": 0, "colSpan": 12},
					"enabled": false
				}
			},
			{
				"operation": "insert",
				"parentName": "VisaGridLayout",
				"propertyName": "items",
				"name": "IsAllowedToDelegate",
				"values": {
					"bindTo": "IsAllowedToDelegate",
					"layout": {"column": 12, "row": 0, "colSpan": 12},
					"enabled": false
				}
			},
			{
				"operation": "insert",
				"parentName": "VisaGridLayout",
				"propertyName": "items",
				"name": "Status",
				"values": {
					"bindTo": "Status",
					"layout": {"column": 0, "row": 1, "colSpan": 12},
					"enabled": false
				}
			},
			{
				"operation": "insert",
				"parentName": "VisaGridLayout",
				"propertyName": "items",
				"name": "IsCanceled",
				"values": {
					"bindTo": "IsCanceled",
					"layout": {"column": 12, "row": 1, "colSpan": 12},
					"enabled": false
				}
			},
			{
				"operation": "insert",
				"parentName": "VisaGridLayout",
				"propertyName": "items",
				"name": "SetBy",
				"values": {
					"bindTo": "SetBy",
					"layout": {"column": 0, "row": 2, "colSpan": 12},
					"enabled": false
				}
			},
			{
				"operation": "insert",
				"parentName": "VisaGridLayout",
				"propertyName": "items",
				"name": "SetDate",
				"values": {
					"bindTo": "SetDate",
					"layout": {"column": 12, "row": 2, "colSpan": 12},
					"enabled": false
				}
			},
			{
				"operation": "insert",
				"parentName": "VisaGridLayout",
				"propertyName": "items",
				"name": "Comment",
				"values": {
					"bindTo": "Comment",
					"layout": {"column": 0, "row": 3, "colSpan": 24},
					"enabled": false
				}
			}
		]/**SCHEMA_DIFF*/,
		rules: {},
		userCode: {}
	};
});


