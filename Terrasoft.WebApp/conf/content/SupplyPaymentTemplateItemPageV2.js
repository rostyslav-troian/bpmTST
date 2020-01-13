Terrasoft.configuration.Structures["SupplyPaymentTemplateItemPageV2"] = {innerHierarchyStack: ["SupplyPaymentTemplateItemPageV2"], structureParent: "BaseSupplyPaymentItemPageV2"};
define('SupplyPaymentTemplateItemPageV2Structure', ['SupplyPaymentTemplateItemPageV2Resources'], function(resources) {return {schemaUId:'7d9196d6-e8ad-40bb-afd6-9f09f136c00d',schemaCaption: "Template item card - Installment plan", parentSchemaName: "BaseSupplyPaymentItemPageV2", schemaName:'SupplyPaymentTemplateItemPageV2',parentSchemaUId:'66bb5893-cb1c-4fc6-aa60-2f0536b33df4',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SupplyPaymentTemplateItemPageV2", ["terrasoft", "BusinessRuleModule", "ConfigurationConstants"],
	function(Terrasoft, BusinessRuleModule, ConfigurationConstants) {
		return {
			entitySchemaName: "SupplyPaymentTemplateItem",
			attributes: {
				/**
				 * ########
				 */
				"Name": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					isRequired: true,
					dependencies: [
						{
							columns: ["Type"],
							methodName: "onTypeChanged"
						}
					]
				},

				"PreviousElement": {
					lookupListConfig: {
						hideActions: true,
						filters: [
							function() {
								var Id = this.get("Id");
								var filterGroup = Ext.create("Terrasoft.FilterGroup");
								filterGroup.add("prevElement", this.Terrasoft.createColumnFilterWithParameter(
									this.Terrasoft.ComparisonType.NOT_EQUAL, "Id", Id));
								return filterGroup;
							}
						]
					}
				},

				/**
				 * ### ####
				 */
				"Type": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					isRequired: true
				}
			},
			methods: {
				/**
				 * ############# ####### ### ###### #########, ########## ### ############## ####### ### ##########
				 * ##### ######.
				 * @inheritdoc Terrasoft.BaseViewModel#setDefaultValues
				 * @protected
				 * @overridden
				 */
				setDefaultValues: function() {
					this.callParent(arguments);
					this.set("IsEntityInitialized", true);
				}
			},
			rules: {
				"PreviousElement": {
					"BindParameterRequiredPreviousElement": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.REQUIRED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "DelayType"
								},
								"comparisonType": Terrasoft.ComparisonType.NOT_EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": ConfigurationConstants.SupplyPayment.Fixed
								}
							}
						]
					},
					"FiltrationPreviousElementByTemplate": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"baseAttributePatch": "SupplyPaymentTemplate",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "SupplyPaymentTemplate"
					}
				}
			}
		};
	}
);



