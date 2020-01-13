﻿Terrasoft.configuration.Structures["CityPageV2"] = {innerHierarchyStack: ["CityPageV2"], structureParent: "BaseLookupPage"};
define('CityPageV2Structure', ['CityPageV2Resources'], function(resources) {return {schemaUId:'e8c917cf-4187-4ce2-bc89-ae826f6a9aae',schemaCaption: "CityPageV2", parentSchemaName: "BaseLookupPage", schemaName:'CityPageV2',parentSchemaUId:'0a254ad1-c2fb-43ae-ac4d-63932be0835b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CityPageV2", ["terrasoft", "BusinessRuleModule", "ext-base", "sandbox"],
		function(Terrasoft, BusinessRuleModule, Ext, sandbox) {
			return {
				entitySchemaName: "City",
				attributes: {
					"Region": {
						name: "Region",
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						dependencies: [
							{
								columns: ["Country"],
								methodName: "CountryOnChange"
							}
						]
					}
				},
				details: /**SCHEMA_DETAILS*/{
				}/**SCHEMA_DETAILS*/,
				methods: {
					CountryOnChange: function() {
						var country = this.get("Country");
						if (Ext.isEmpty(country)) {
							this.set("Region", null);
						}
					}
				},
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
						"operation": "insert",
						"parentName": "GeneralInfoBlock",
						"propertyName": "items",
						"name": "Region",
						"values": {
							"bindTo": "Region",
							"layout": {"column": 0, "row": 2, "colSpan": 12}
						}
					}, {
						"operation": "insert",
						"parentName": "GeneralInfoBlock",
						"propertyName": "items",
						"name": "TimeZone",
						"values": {
							"bindTo": "TimeZone",
							"layout": {"column": 0, "row": 3, "colSpan": 12}
						}
					}, {
						"operation": "merge",
						"name": "Description",
						"values": {
							"bindTo": "Description",
							"layout": {"column": 0, "row": 4, "colSpan": 24}
						}
					}
				]/**SCHEMA_DIFF*/,
				rules: {
					"Region": {
						"FilteringCityByCounty": {
							ruleType: BusinessRuleModule.enums.RuleType.FILTRATION,
							autocomplete: true,
							baseAttributePatch: "Country",
							comparisonType: Terrasoft.ComparisonType.EQUAL,
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "Country",
							attributePath: "",
							value: ""
						}
					}
				},
				userCode: {}
			};
		});


