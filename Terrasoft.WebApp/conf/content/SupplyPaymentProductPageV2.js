Terrasoft.configuration.Structures["SupplyPaymentProductPageV2"] = {innerHierarchyStack: ["SupplyPaymentProductPageV2"], structureParent: "BaseModulePageV2"};
define('SupplyPaymentProductPageV2Structure', ['SupplyPaymentProductPageV2Resources'], function(resources) {return {schemaUId:'f84557a9-a476-4e78-bd2c-a4d8e5e5b242',schemaCaption: "Page - Installment plan products", parentSchemaName: "BaseModulePageV2", schemaName:'SupplyPaymentProductPageV2',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SupplyPaymentProductPageV2", ["BusinessRuleModule"],
	function(BusinessRuleModule) {
		return {
			entitySchemaName: "VwSupplyPaymentProduct",
			attributes: {
				/**
				* ##### ## ########.
				*/
				UsedAmount: {
					dependencies: [
						{
							columns: ["UsedQuantity"],
							methodName: "onUsedQuantityChanged"
						}
					]
				}
			},
			methods: {
				/**
				 * @inheritDoc Terrasoft.BasePageV2#onSaved
				 * @overridden
				 */
				onSaved: function() {
					this.callParent(arguments);
					this.validateUsedQuantity(this.get("UsedQuantity"));
				},

				/**
				 * ########## ######### ##########.
				 * @private
				 */
				onUsedQuantityChanged: function() {
					this.recalculateQuantityValues();
				},

				/**
				 * ######## ##### ## ##########.
				 * @private
				 */
				recalculateQuantityValues: function() {
					if (!this.validationConfig.UsedQuantity) {
						this.setValidationConfig();
					}
					var productPrice = this.get("Price");
					var discountPercent = this.get("DiscountPercent") || 0;
					var value = this.get("UsedQuantity");
					if (productPrice) {
						var newValue = value * productPrice * (1 - discountPercent / 100);
						this.set("UsedAmount", newValue);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2ViewModel#setValidationConfig
				 * @overridden
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("UsedQuantity", this.validateUsedQuantity);
				},

				/**
				 * ######### ############ #### ### ##########.
				 * @param {String} value
				 * @return {Object} ########## ###### # ######## ###### ######### ####.
				 */
				validateUsedQuantity: function(value) {
					var invalidMessage = "";
					var maxQuantity = this.get("MaxQuantity");
					if (value > maxQuantity) {
						invalidMessage = this.get("Resources.Strings.ValidateUsedQuantity");
					} else
					if (value < 0) {
						invalidMessage = this.get("Resources.Strings.ValidateUsedQuantityMoreZero");
					}
					return {
						invalidMessage: invalidMessage
					};
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
			rules: {
				"OrderProduct": {
					"BindParameterEnabledOrderProduct": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": true
							},
							"comparisonType": this.Terrasoft.core.enums.ComparisonType.NOT_EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": true
							}
						}]
					}
				},
				"MaxQuantity": {
					"BindParameterEnabledMaxQuantity": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": true
							},
							"comparisonType": this.Terrasoft.core.enums.ComparisonType.NOT_EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": true
							}
						}]
					}
				},
				"UsedAmount": {
					"BindParameterEnabledUsedAmount": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": true
							},
							"comparisonType": this.Terrasoft.core.enums.ComparisonType.NOT_EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": true
							}
						}]
					}
				}
			}
		};
	}
);


