Terrasoft.configuration.Structures["RegionPageV2"] = {innerHierarchyStack: ["RegionPageV2"], structureParent: "BaseLookupPage"};
define('RegionPageV2Structure', ['RegionPageV2Resources'], function(resources) {return {schemaUId:'bd08a0d6-86f0-4988-8595-e04e6ecb6ebe',schemaCaption: "RegionPageV2", parentSchemaName: "BaseLookupPage", schemaName:'RegionPageV2',parentSchemaUId:'0a254ad1-c2fb-43ae-ac4d-63932be0835b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("RegionPageV2", ["terrasoft", "BusinessRuleModule", "ext-base", "sandbox"],
		function(Terrasoft, BusinessRuleModule, Ext, sandbox) {
			return {
				entitySchemaName: "Region",
				attributes: {},
				details: /**SCHEMA_DETAILS*/{
				}/**SCHEMA_DETAILS*/,
				methods: {},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"parentName": "GeneralInfoBlock",
						"propertyName": "items",
						"name": "Country",
						"values": {
							"bindTo": "Country",
							"layout": {"column": 0, "row": 1, "colSpan": 12}
						}
					}, {
						"operation": "merge",
						"name": "Description",
						"values": {
							"bindTo": "Description",
							"layout": {"column": 0, "row": 2, "colSpan": 12}
						}
					}
				]/**SCHEMA_DIFF*/,
				rules: {},
				userCode: {}
			};
		});


