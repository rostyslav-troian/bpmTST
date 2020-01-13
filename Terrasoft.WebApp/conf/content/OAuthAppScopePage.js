Terrasoft.configuration.Structures["OAuthAppScopePage"] = {innerHierarchyStack: ["OAuthAppScopePage"], structureParent: "BasePageV2"};
define('OAuthAppScopePageStructure', ['OAuthAppScopePageResources'], function(resources) {return {schemaUId:'ca9c1aed-5767-454a-b70d-bdd5ac8a3835',schemaCaption: "Schema card: \"scopes\"", parentSchemaName: "BasePageV2", schemaName:'OAuthAppScopePage',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OAuthAppScopePage", [], function() {
	return {
		entitySchemaName: "OAuthAppScope",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Scope7201bae3-af68-456d-8caf-dced37527e25",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Scope"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			}
		]/**SCHEMA_DIFF*/
	};
});


