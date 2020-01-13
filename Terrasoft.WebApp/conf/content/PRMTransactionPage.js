Terrasoft.configuration.Structures["PRMTransactionPage"] = {innerHierarchyStack: ["PRMTransactionPage"], structureParent: "BasePageV2"};
define('PRMTransactionPageStructure', ['PRMTransactionPageResources'], function(resources) {return {schemaUId:'5ac4e533-90e8-482d-a887-b7448d14dab6',schemaCaption: "PRMTransactionPage", parentSchemaName: "BasePageV2", schemaName:'PRMTransactionPage',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PRMTransactionPage", ["BusinessRuleModule"], function(BusinessRuleModule) {
	return {
		entitySchemaName: "PRMTransaction",
		attributes: {},
		methods: {},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "TransactionType",
				"values": {
					"contentType": Terrasoft.ContentType.ENUM,
					"layout": {"column": 0, "row": 0},
					"enabled": {
						"bindTo": "isNewMode"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Fund",
				"values": {
					"contentType": Terrasoft.ContentType.ENUM,
					"layout": {"column": 0, "row": 1},
					"enabled": {
						"bindTo": "isNewMode"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Amount",
				"values": {
					"layout": {"column": 0, "row": 2},
					"enabled": {
						"bindTo": "isNewMode"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Description",
				"values": {
					"layout": {"column": 0, "row": 4, "rowSpan": 3},
					"contentType": Terrasoft.ContentType.LONG_TEXT
				}
			}
		],/**SCHEMA_DIFF*/
		rules: {
			"Fund": {
				"FilteringFundByPartnership": {
					ruleType: BusinessRuleModule.enums.RuleType.FILTRATION,
					baseAttributePatch: "Partnership.Id",
					comparisonType: Terrasoft.ComparisonType.EQUAL,
					type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					attribute: "Partnership"
				}
			}
		}
	};
});


