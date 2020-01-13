Terrasoft.configuration.Structures["BaseAddressPageV2"] = {innerHierarchyStack: ["BaseAddressPageV2"], structureParent: "BasePageV2"};
define('BaseAddressPageV2Structure', ['BaseAddressPageV2Resources'], function(resources) {return {schemaUId:'81234854-097b-4248-bf1c-826717e7467d',schemaCaption: "Base address page", parentSchemaName: "BasePageV2", schemaName:'BaseAddressPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseAddressPageV2", ["BusinessRuleModule"], function(BusinessRuleModule) {
	return {
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "Tabs",
				"values": {
					visible: false
				}
			},
			{
				"operation": "merge",
				"name": "actions",
				"values": {
					visible: false
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Country",
				"values": {
					bindTo: "Country",
					layout: { column: 0, row: 0, colSpan: 12 }
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "AddressType",
				"values": {
					bindTo: "AddressType",
					contentType: Terrasoft.ContentType.ENUM,
					layout: { column: 12, row: 0, colSpan: 12 }
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Region",
				"values": {
					bindTo: "Region",
					layout: { column: 0, row: 1, colSpan: 12 },
					tip: {
						content: { bindTo: "Resources.Strings.RegionFilterRuleTip" }
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Zip",
				"values": {
					bindTo: "Zip",
					layout: { column: 12, row: 1, colSpan: 12 }
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "City",
				"values": {
					bindTo: "City",
					layout: { column: 0, row: 2, colSpan: 12 },
					tip: {
						content: { bindTo: "Resources.Strings.CityFilterRuleTip" }
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Primary",
				"values": {
					bindTo: "Primary",
					layout: { column: 12, row: 2, colSpan: 12 }
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Address",
				"values": {
					bindTo: "Address",
					layout: { column: 0, row: 3, colSpan: 12 }
				}
			}
		]/**SCHEMA_DIFF*/,
		rules: {
			"Region": {
				"FiltrationRegionByCountry": {
					ruleType: BusinessRuleModule.enums.RuleType.FILTRATION,
					autocomplete: true,
					autoClean: true,
					baseAttributePatch: "Country",
					comparisonType: Terrasoft.ComparisonType.EQUAL,
					type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					attribute: "Country"
				}
			},
			"City": {
				"FiltrationCityByCountry": {
					ruleType: BusinessRuleModule.enums.RuleType.FILTRATION,
					autocomplete: true,
					autoClean: true,
					baseAttributePatch: "Country",
					comparisonType: Terrasoft.ComparisonType.EQUAL,
					type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					attribute: "Country"
				},
				"FiltrationCityByRegion": {
					ruleType: BusinessRuleModule.enums.RuleType.FILTRATION,
					autocomplete: true,
					autoClean: true,
					baseAttributePatch: "Region",
					comparisonType: Terrasoft.ComparisonType.EQUAL,
					type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					attribute: "Region"
				}
			}
		}
	};
});


