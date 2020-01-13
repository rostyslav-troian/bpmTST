Terrasoft.configuration.Structures["ContactAddressPageV2"] = {innerHierarchyStack: ["ContactAddressPageV2"], structureParent: "BaseAddressPageV2"};
define('ContactAddressPageV2Structure', ['ContactAddressPageV2Resources'], function(resources) {return {schemaUId:'2149f737-09ae-4fba-845f-81c480709e06',schemaCaption: "Contact address page", parentSchemaName: "BaseAddressPageV2", schemaName:'ContactAddressPageV2',parentSchemaUId:'81234854-097b-4248-bf1c-826717e7467d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContactAddressPageV2", ["BusinessRuleModule"], function(BusinessRuleModule) {
	return {
		entitySchemaName: "ContactAddress",
		details: /**SCHEMA_DETAILS*/{
		}/**SCHEMA_DETAILS*/,
		rules: {
			"AddressType": {
				"FiltrationAddressTypeByOwner": {
					ruleType: BusinessRuleModule.enums.RuleType.FILTRATION,
					autocomplete: true,
					baseAttributePatch: "ForContact",
					comparisonType: Terrasoft.ComparisonType.EQUAL,
					type: BusinessRuleModule.enums.ValueType.CONSTANT,
					value: true
				}
			}
		},
		diff: /**SCHEMA_DIFF*/[
		]/**SCHEMA_DIFF*/
	};
});


