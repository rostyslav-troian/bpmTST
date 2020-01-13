Terrasoft.configuration.Structures["BaseLookupEditPage"] = {innerHierarchyStack: ["BaseLookupEditPage"], structureParent: "BasePageV2"};
define('BaseLookupEditPageStructure', ['BaseLookupEditPageResources'], function(resources) {return {schemaUId:'a8479d18-f601-4d5b-8f75-ec1f6bf2c15d',schemaCaption: "Base edit page - Lookup", parentSchemaName: "BasePageV2", schemaName:'BaseLookupEditPage',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseLookupEditPage", [],
	function() {
		return {
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			attributes: {},
			methods: {},
			rules: {},
			userCode: {},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "Name",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"layout": {
							"colSpan": 24,
							"column": 0,
							"row": 0
						}
					}
				},
				{
					"operation": "insert",
					"name": "Description",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"contentType": Terrasoft.ContentType.LONG_TEXT,
						"layout": {
							"colSpan": 24,
							"column": 0,
							"row": 1
						}
					}
				}
			]/**SCHEMA_DIFF*/

		};
	});


