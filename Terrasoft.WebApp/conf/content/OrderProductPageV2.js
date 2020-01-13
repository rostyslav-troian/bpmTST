Terrasoft.configuration.Structures["OrderProductPageV2"] = {innerHierarchyStack: ["OrderProductPageV2Order", "OrderProductPageV2"], structureParent: "BaseProductDetailPageV2"};
define('OrderProductPageV2OrderStructure', ['OrderProductPageV2OrderResources'], function(resources) {return {schemaUId:'d5657b35-7aba-4326-8bb2-4dcf1cf24145',schemaCaption: "Edit card - Product in order", parentSchemaName: "BaseProductDetailPageV2", schemaName:'OrderProductPageV2Order',parentSchemaUId:'b906bd19-865d-474e-a613-f0506ca21e4b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OrderProductPageV2Structure', ['OrderProductPageV2Resources'], function(resources) {return {schemaUId:'3fb1467f-d42e-4525-9536-5b82047b1c4b',schemaCaption: "Edit card - Product in order", parentSchemaName: "OrderProductPageV2Order", schemaName:'OrderProductPageV2',parentSchemaUId:'d5657b35-7aba-4326-8bb2-4dcf1cf24145',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OrderProductPageV2Order",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OrderProductPageV2OrderResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OrderProductPageV2Order", ["MoneyModule", "MoneyUtilsMixin"],
		function(MoneyModule) {
			return {
				entitySchemaName: "OrderProduct",
				attributes: {
					/**
					 * Product currency.
					 */
					"Currency": {
						dataValueType: Terrasoft.DataValueType.FLOAT,
						lookupListConfig: {
							columns: ["Division"]
						}
					},
					"Order": {
						lookupListConfig: {
							columns: ["CurrencyRate", "Currency", "Currency.Division"]
						}
					},
					"PrimaryPrice": {
						dependencies: [
							{
								columns: ["Price", "Amount", "DiscountAmount", "TaxAmount", "TotalAmount"],
								methodName: "calculatePrimaryValues"
							}
						]
					},
					"MasterEntityColumnName": {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						value: "Order"
					}
				},
				mixins: {
					MoneyUtilities: "Terrasoft.MoneyUtilsMixin"
				},
				methods: {
					/**
					 * @inheritdoc BasePageV2#onEntityInitialized
					 * @override
					 */
					onEntityInitialized: function() {
						this.callParent(arguments);
						this.set("ProductEntryMasterRecord", this.get("Order"));
					},

					/**
					 * Returns currency division.
					 * @protected
					 */
					getCurrencyDivision: function() {
						const currency = this.get("Currency");
						const division = this.get("Currency.Division");
						return (currency && currency.Division) || division;
					},

					/**
					 * Loads order's currency.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Callback scope.
					 */
					loadCurrencyOrder: function(callback, scope) {
						const order = this.get("Order");
						if (order && !order.CurrencyRate) {
							const select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
								rootSchemaName: "Order"
							});
							select.addColumn("Currency.Division");
							select.addColumn("CurrencyRate");
							select.addColumn("Currency");
							select.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
									this.Terrasoft.ComparisonType.EQUAL, "Id", order.value));
							select.execute(function(response) {
								response.collection.each(function(item) {
									order["Currency.Division"] = item.get("Currency.Division");
									order.CurrencyRate = item.get("CurrencyRate");
									order.Currency = item.get("Currency");
									callback.call(scope || this);
								}, this);
							}, this);
						}
					},

					/**
					 * Handles product select.
					 * @protected
					 */
					onProductSelect: this.Ext.emptyFn,

					/**
					 * Handles price list change.
					 * @protected
					 * @param {Boolean} isNotNeedCallParent Do not invoke callParent function flag.
					 */
					onPriceListChange: function(isNotNeedCallParent) {
						let result = true;
						const order = this.get("Order");
						if (!order) {
							return;
						}
						if (!isNotNeedCallParent) {
							result = this.callParent(arguments);
						}
						if (result) {
							if (order && !order.CurrencyRate) {
								this.loadCurrencyOrder(this.setPriceAsync, this);
							} else {
								this.setPriceAsync();
							}
						}
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"name": "Order",
						"parentName": "BaseGeneralInfoBlock",
						"propertyName": "items",
						"values": {
							"bindTo": "Order",
							"enabled": false,
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 12
							}
						}
					}, {
						"operation": "remove",
						"name": "DeliveryDate"
					}
				]/**SCHEMA_DIFF*/
			};
		});

define("OrderProductPageV2", ["BusinessRuleModule", "OrderUtilities"],
	function(BusinessRuleModule) {
		return {
			entitySchemaName: "OrderProduct",
			mixins: {
				OrderUtilities: "Terrasoft.OrderUtilities"
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BasePageV2#asyncValidate
				 * @protected
				 * @overridden
				 */
				asyncValidate: function(callback, scope) {
					this.callParent([function(response) {
						if (response.success && this.needValidateQuantity()) {
							this.validateQuantity(callback);
						} else {
							callback.call(scope, response);
						}
					}, this]);
				},

				/**
				 * ########## ############ ######### ##########.
				 * @return {Boolean} true, #### ########## #########.
				 */
				needValidateQuantity: function() {
					return this.changedValues && this.changedValues.hasOwnProperty("Quantity");
				},

				/**
				 * ######### ######## ########## # ########.
				 * @param {Function} callback ##### ######### ######.
				 */
				validateQuantity: function(callback) {
					this.callService({
						serviceName: "OrderPassportService",
						methodName: "ValidateOrderProductQuantity",
						data: {
							"orderProductId": this.get("Id"),
							"newQuantity": this.get("Quantity")
						}
					}, function(response) {
						var responseResult = response.ValidateOrderProductQuantityResult || {};
						callback.call(this, {
							success: responseResult.success,
							message: (responseResult.errorInfo && responseResult.errorInfo.message) || ""
						});
					}, this);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "AmountBlock",
					"propertyName": "items",
					"name": "Currency",
					"values": {
						"layout": {"column": 0, "row": 6, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "AmountBlock",
					"propertyName": "items",
					"name": "CurrencyRate",
					"values": {
						"layout": {"column": 12, "row": 6, "colSpan": 12}
					}
				}
			]/**SCHEMA_DIFF*/,
			rules: {
				"Currency": {
					"BindParameterEnabledCurrency": {
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
				"CurrencyRate": {
					"BindParameterEnabledCurrencyRate": {
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


