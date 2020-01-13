Terrasoft.configuration.Structures["BaseProductDetailPageV2"] = {innerHierarchyStack: ["BaseProductDetailPageV2UIv2", "BaseProductDetailPageV2"], structureParent: "BasePageV2"};
define('BaseProductDetailPageV2UIv2Structure', ['BaseProductDetailPageV2UIv2Resources'], function(resources) {return {schemaUId:'b906bd19-865d-474e-a613-f0506ca21e4b',schemaCaption: "Base edit page - Products detail", parentSchemaName: "BasePageV2", schemaName:'BaseProductDetailPageV2UIv2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseProductDetailPageV2Structure', ['BaseProductDetailPageV2Resources'], function(resources) {return {schemaUId:'7267ddc4-d101-431f-bcae-bab831543173',schemaCaption: "Base edit page - Products detail", parentSchemaName: "BaseProductDetailPageV2UIv2", schemaName:'BaseProductDetailPageV2',parentSchemaUId:'b906bd19-865d-474e-a613-f0506ca21e4b',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseProductDetailPageV2UIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseProductDetailPageV2UIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseProductDetailPageV2UIv2", ["BusinessRuleModule", "MoneyModule", "DiscountUtils", "MoneyUtilsMixin"],
	function(BusinessRuleModule, MoneyModule, DiscountUtils) {
		return {
			entitySchemaName: "BaseProductEntry",
			attributes: {
				/**
				 * Product
				 * @type {Terrasoft.DataValueType.LOOKUP}
				 */
				"Product": {
					lookupListConfig: {
						columns: ["Currency", "Currency.Division", "Price", "Unit", "Tax", "Tax.Percent"]
					},
					dependencies: [
						{
							columns: ["Product"],
							methodName: "setProductPriceEnabled"
						}
					]
				},

				/**
				 * Tax
				 * @type {Terrasoft.DataValueType.LOOKUP}
				 */
				"Tax": {
					lookupListConfig: {
						columns: ["Percent"]
					}
				},

				/**
				 * Discount tax
				 * @type {Terrasoft.DataValueType.FLOAT}
				 */
				"DiscountTax": {
					name: "DiscountTax",
					dataValueType: Terrasoft.DataValueType.FLOAT,
					dependencies: [
						{
							columns: ["Tax"],
							methodName: "onTaxChange"
						}
					]
				},

				/**
				 * Tax amount
				 * @type {Terrasoft.DataValueType.FLOAT}
				 */
				"TaxAmount": {
					name: "TaxAmount",
					dataValueType: Terrasoft.DataValueType.FLOAT,
					dependencies: [
						{
							columns: ["Amount", "DiscountTax"],
							methodName: "setTaxAmount"
						}
					]
				},

				/**
				 * Price
				 * @type {Terrasoft.DataValueType.FLOAT}
				 */
				"Price": {
					name: "Price",
					dataValueType: Terrasoft.DataValueType.FLOAT,
					dependencies: [
						{
							columns: ["Product"],
							methodName: "onProductSelect"
						}
					]
				},

				/**
				 * Amount
				 * @type {Terrasoft.DataValueType.FLOAT}
				 */
				"Amount": {
					name: "Amount",
					dataValueType: Terrasoft.DataValueType.FLOAT,
					dependencies: [
						{
							columns: ["Price", "Quantity"],
							methodName: "calcAmount"
						}
					]
				},

				/**
				 * Discount percent
				 * @type {Terrasoft.DataValueType.FLOAT}
				 */
				"DiscountPercent": {
					name: "DiscountPercent",
					dataValueType: Terrasoft.DataValueType.FLOAT,
					dependencies: [
						{
							columns: ["DiscountAmount"],
							methodName: "calcDiscountPercent"
						}
					]
				},

				/**
				 * Discount amount
				 * @type {Terrasoft.DataValueType.FLOAT}
				 */
				"DiscountAmount": {
					name: "DiscountAmount",
					dataValueType: Terrasoft.DataValueType.FLOAT,
					dependencies: [
						{
							columns: ["Amount", "DiscountPercent"],
							methodName: "calcDiscountAmount"
						}
					]
				},

				/**
				 * Total amount
				 * @type {Terrasoft.DataValueType.FLOAT}
				 */
				"TotalAmount": {
					name: "TotalAmount",
					dataValueType: Terrasoft.DataValueType.FLOAT,
					dependencies: [
						{
							columns: ["Amount", "TaxAmount", "DiscountAmount"],
							methodName: "setTotalAmount"
						}
					]
				},

				/**
				 * Name
				 * @type {String}
				 */
				"Name": {
					name: "Name",
					dataValueType: Terrasoft.DataValueType.TEXT,
					dependencies: [
						{
							columns: ["CustomProduct", "Product"],
							methodName: "changeProductName"
						}
					]
				},

				/**
				 * Sign that product price is enabled.
				 * @type {Boolean}
				 */
				"IsProductPriceEnabled": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},

				/**
				 * Master entity column name.
				 * @type {Terrasoft.DataValueType.TEXT}
				 */
				"MasterEntityColumnName": {
					dataValueType: this.Terrasoft.DataValueType.TEXT
				}
			},
			mixins: {
				MoneyUtilities: "Terrasoft.MoneyUtilsMixin"
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.BasePageV2#constructor.
				 * @overridden
				 */
				init: function() {
					Terrasoft.SysSettings.querySysSettingsItem("PriceWithTaxes", function(value) {
						if (value) {
							this.set("PriceWithTaxes", value);
						}
					}, this);
					this.callParent(arguments);
				},

				/**
				 * MoneyModule getter.
				 * @private
				 * @return {Terrasoft.MoneyModule}
				 */
				getMoneyModule: function() {
					return MoneyModule;
				},

				/**
				 * Changes product name.
				 * @protected
				 */
				changeProductName: function() {
					var product = this.get("Product");
					var customProduct = this.get("CustomProduct");
					var caption = product && product.displayValue ? product.displayValue : customProduct;
					this.set("ShowSaveButton", true);
					this.set("Name", caption);
				},

				/**
				 * @inheritdoc Terrasoft.BaseEntityPage#constructor.
				 * @overridden
				 */
				getDefaultValues: function() {
					var defValues = this.callParent(arguments);
					if (this.Ext.isEmpty(this.get("Quantity"))) {
						defValues.push({
							name: "Quantity",
							value: 1
						});
					}
					if (this.Ext.isEmpty(this.get("DiscountPercent"))) {
						defValues.push({
							name: "DiscountPercent",
							value: 0
						});
					}
					this.set("DefaultValues", this.Terrasoft.deepClone(defValues));
					return defValues;
				},

				/**
				 * Handles tax change.
				 * @protected
				 */
				onTaxChange: function() {
					var tax = this.get("Tax");
					var taxPercent = (!this.Ext.isEmpty(tax)) ? tax.Percent : null;
					this.set("DiscountTax", taxPercent);
				},

				/**
				 * Handles product selection.
				 * @protected
				 * @virtual
				 */
				onProductSelect: function() {
					if (!this.changedValues.IsChanged) {
						return;
					}
					var product = this.get("Product");
					this.set("Tax", null);
					this.set("Unit", null);
					if (this.Ext.isEmpty(product)) {
						this.set("Price", 0);
						return;
					}
					if (!this.Ext.isEmpty(product.Tax)) {
						product.Tax.Percent = product["Tax.Percent"];
						this.set("Tax", product.Tax);
					}
					if (!this.Ext.isEmpty(product.Unit)) {
						this.set("Unit", product.Unit);
					}
					if (product.Currency) {
						var moneyModule = this.getMoneyModule();
						moneyModule.onLoadCurrencyRate.call(this, product.Currency.value, null, function(item) {
							var master = this.get("ProductEntryMasterRecord");
							var price = 0.0;
							if (!master) {
								return;
							}
							if (product.Currency.value !== master.Currency.value) {
								var calculator = this.getMoneyCalculator();
								price = calculator.evaluate({
									divide: [
										{multiply: [product.Price, master.CurrencyRate, item.Division]},
										{multiply: [item.Rate, master["Currency.Division"]]}
									]
								});
							} else {
								price = product.Price;
							}
							this.set("Price", price);
						});
					}
				},

				/**
				 * Calculates amount.
				 * @protected
				 */
				calcAmount: function() {
					var price = this.get("Price");
					var quantity = this.get("Quantity");
					if (!this.Ext.isEmpty(price) && !this.Ext.isEmpty(quantity)) {
						var calculator = this.getMoneyCalculator();
						this.set("Amount", calculator.multiply(price, quantity));
					}
				},

				/**
				 * Calculates discount percent.
				 * @protected
				 */
				calcDiscountPercent: function() {
					var amount = this.get("Amount");
					var discountAmount = this.get("DiscountAmount");
					var discountPercent = DiscountUtils.calcDiscountPercent(amount, discountAmount);
					this.set("DiscountPercent", discountPercent);
				},

				/**
				 * Calculates discount amount.
				 * @protected
				 */
				calcDiscountAmount: function() {
					var amount = this.get("Amount");
					var discountPercent = this.get("DiscountPercent");
					var newDiscountAmount = DiscountUtils.calcDiscountAmount(amount, discountPercent);
					if (this.get("DiscountAmount") !== newDiscountAmount) {
						this.set("DiscountAmount", newDiscountAmount);
					}
					var taxAmount = this.calcTaxAmount();
					if (this.get("TaxAmount") !== taxAmount) {
						this.set("TaxAmount", taxAmount);
					}
				},

				/**
				 * Calculates total amount.
				 * @protected
				 * @returns {number} total amount.
				 */
				calcTotalAmount: function() {
					var amount = this.get("Amount");
					if (this.Ext.isEmpty(amount)) {
						amount = 0;
					}
					var discountAmount = this.get("DiscountAmount");
					if (this.Ext.isEmpty(discountAmount)) {
						discountAmount = 0;
					}
					if (discountAmount > amount) {
						discountAmount = amount;
					}
					var calculator = this.getMoneyCalculator();
					return calculator.subtract(amount, discountAmount);
				},

				/**
				 * Calculates tax amount.
				 * @protected
				 * @returns {number} tax amount.
				 */
				calcTaxAmount: function() {
					var totalAmount = this.calcTotalAmount();
					var discountTax = this.get("DiscountTax");
					if (this.Ext.isEmpty(discountTax)) {
						discountTax = 0;
					}
					if (discountTax > 100) {
						discountTax = 100;
					}
					var taxAmount = 0;
					if (this.get("PriceWithTaxes")) {
						taxAmount = this.getIncludedPercentagePart(totalAmount, discountTax);
					} else {
						taxAmount = this.getPercentagePart(totalAmount, discountTax);
					}
					return taxAmount;
				},

				/**
				 * Calculates tax amount.
				 * @protected
				 */
				setTaxAmount: function() {
					var taxAmount = this.calcTaxAmount();
					if (this.get("TaxAmount") !== taxAmount) {
						this.set("TaxAmount", taxAmount);
					}
				},

				/**
				 * Calculates total amount.
				 * @protected
				 */
				setTotalAmount: function() {
					var totalAmount = this.calcTotalAmount();
					if (!this.get("PriceWithTaxes")) {
						var taxAmount = this.calcTaxAmount();
						var calculator = this.getMoneyCalculator();
						totalAmount = calculator.add(totalAmount, taxAmount);
					}
					if (this.get("TotalAmount") !== totalAmount) {
						this.set("TotalAmount", totalAmount);
					}
				},

				/**
				 * @inheritDoc Terrasoft.configuration.BaseViewModel#validate
				 * @overridden
				 */
				validate: function() {
					var product = this.get("Product");
					var customProduct = this.get("CustomProduct");
					if (this.Ext.isEmpty(product) && this.Ext.isEmpty(customProduct)) {
						this.showInformationDialog(this.get("Resources.Strings.WarningProductCustomProductRequire"));
						return false;
					}
					//TODO: this solution is temporary, may be reviewed in future, if hints are available
					var quantity = this.get("Quantity");
					if (quantity < 0) {
						this.showInformationDialog(this.get("Resources.Strings.FieldMustBeGreaterOrEqualZeroMessage"));
						return false;
					}
					var date = this.get("DeliveryDate");
					if (this.Ext.isEmpty(date)) {
						this.set("DeliveryDate", null);
					}
					return this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
				 * @override
				 */
				onEntityInitialized: function() {
					this.setProductPriceEnabled();
					this.callParent();
				},

				/**
				 * Sets that product price is enabled.
				 */
				setProductPriceEnabled: function() {
					var customProduct = this.get("CustomProduct");
					var isChangeProductPrice = this.Terrasoft.Features.getIsEnabled("ChangeProductPrice");
					if (this.isNotEmpty(customProduct) || isChangeProductPrice) {
						this.set("IsProductPriceEnabled", true);
					}
				},


				/**
				 * @obsolete
				 */
				getColumnData: function(table, column, scope) {
					return this._getColumnData(table, column, scope);
				},

				/**
				 * Returns value from specified object attribute name.
				 * @private
				 * @param {String} attributeName Attribute name.
				 * @param {String} column Object's field name.
				 * @param {Object} [scope] Context.
				 * @return {Object} Object's value.
				 */
				_getColumnData: function(attributeName, column, scope) {
					scope = scope || this;
					const attrPropName = this.Ext.String.format("{0}.{1}", attributeName, column);
					if (scope.get(attributeName) && scope.get(attributeName)[column]) {
						scope.set(attrPropName, scope.get(attributeName)[column]);
					}
					return scope.get(attrPropName);
				},

				/**
				 * Sets product price.
				 * @param {String} priceListPrice Price
				 * @param {Number} division Division.
				 * @param {Number} rate Rate.
				 */
				setPrice: function(priceListPrice, division, rate) {
					const productCurrencyRate = this.get("CurrencyRate");
					const productDivision = this.getColumnData("Currency", "Division") || 1;
					const divisionNew = (division === 0) ? 1 : division;
					const rateNew = (rate === 0) ? 1 : rate;
					const calculator = this.getMoneyCalculator();
					let price = calculator.evaluate({
						divide: [
							{multiply: [priceListPrice, productCurrencyRate, divisionNew]},
							{multiply: [rateNew, productDivision]}
						]
					});
					price = this.roundValue(price, {
						"decimalPlaces": 2
					});
					this.set("Price", price);
				},

				/**
				 * Calculates primary InvoiceProduct values.
				 * @virtual
				 * @protected
				 */
				calculatePrimaryValues: function() {
					const columnName = arguments[arguments.length - 1];
					const moneyModule = this.getMoneyModule();
					moneyModule.RecalcBaseValue.call(this, "CurrencyRate", columnName, "Primary" + columnName,
						this.getCurrencyDivision());
				},

				/**
				 * Sets product price.
				 * @protected
				 */
				setPriceAsync: function() {
					const masterEntityName = this.get("MasterEntityColumnName");
					const masterEntity = this.get(masterEntityName);
					const priceList = this.get("PriceList") || {};
					const productCurrency = this.get("Currency") || masterEntity.Currency || {};
					const productCurrencyId = productCurrency.value;
					const priceListCurrencyId = priceList["Currency.Id"] || productCurrencyId;
					if (priceListCurrencyId === productCurrencyId) {
						this.set("Price", priceList.Price || 0);
						return;
					}
					const product = this.get("Product");
					if (product) {
						const priceListPrice = priceList.Price || product.Price || 0;
						const moneyModule = this.getMoneyModule();
						moneyModule.onLoadCurrencyRate.call(
							this, priceList["Currency.Id"], null,
							function(item) {
								this.setPrice(priceListPrice, item.Division, item.Rate);
							},
							function() {
								this.setPrice(priceListPrice, 1, 1);
							}
						);
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "actions"
				},
				{
					"operation": "insert",
					"name": "BaseProductPageGeneralTabContainer",
					"parentName": "CardContentContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "BaseGeneralInfoGroup",
					"parentName": "BaseProductPageGeneralTabContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"controlConfig": {
							"collapsed": false
						}
					}
				},
				{
					"operation": "insert",
					"name": "BaseGeneralInfoBlock",
					"parentName": "BaseGeneralInfoGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "Product",
					"parentName": "BaseGeneralInfoBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "Product",
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 12
						}
					}
				},
				{
					"operation": "insert",
					"name": "CustomProduct",
					"parentName": "BaseGeneralInfoBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "CustomProduct",
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24
						}
					}
				},
				{
					"operation": "insert",
					"name": "Quantity",
					"parentName": "BaseGeneralInfoBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "Quantity",
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 12
						}
					}
				},
				{
					"operation": "insert",
					"name": "Unit",
					"parentName": "BaseGeneralInfoBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "Unit",
						"enabled": false,
						"layout": {
							"column": 12,
							"row": 3,
							"colSpan": 12
						}
					}
				},
				{
					"operation": "insert",
					"name": "DeliveryDate",
					"parentName": "BaseGeneralInfoBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "DeliveryDate",
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 12
						}
					}
				},
				{
					"operation": "insert",
					"name": "AmountControlGroup",
					"parentName": "BaseProductPageGeneralTabContainer",
					"propertyName": "items",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.AmountGroupCaption"
						},
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"controlConfig": {
							"collapsed": false
						}
					}
				},
				{
					"operation": "insert",
					"name": "AmountBlock",
					"parentName": "AmountControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "Price",
					"parentName": "AmountBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "Price",
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12
						}
					}
				},
				{
					"operation": "insert",
					"name": "Amount",
					"parentName": "AmountBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "Amount",
						"enabled": false,
						"layout": {
							"column": 12,
							"row": 0,
							"colSpan": 12
						}
					}
				},
				{
					"operation": "insert",
					"name": "DiscountPercent",
					"parentName": "AmountBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "DiscountPercent",
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 12
						}
					}
				},
				{
					"operation": "insert",
					"name": "DiscountAmount",
					"parentName": "AmountBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "DiscountAmount",
						"layout": {
							"column": 12,
							"row": 1,
							"colSpan": 12
						}
					}
				},
				{
					"operation": "insert",
					"name": "Tax",
					"parentName": "AmountBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "Tax",
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 12
						},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"name": "TaxAmount",
					"parentName": "AmountBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "TaxAmount",
						"enabled": false,
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 12
						}
					}
				},
				{
					"operation": "insert",
					"name": "DiscountTax",
					"parentName": "AmountBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "DiscountTax",
						"enabled": false,
						"layout": {
							"column": 12,
							"row": 3,
							"colSpan": 12
						}
					}
				},
				{
					"operation": "insert",
					"name": "TotalAmount",
					"parentName": "AmountBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "TotalAmount",
						"enabled": false,
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 12
						}
					}
				}
			]/**SCHEMA_DIFF*/,
			rules: {
				"Product": {
					"BindParameterEnabledProductToCustomProduct": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "CustomProduct"
								},
								"comparisonType": Terrasoft.ComparisonType.IS_NULL
							}
						]
					}
				},
				"CustomProduct": {
					"BindParameterEnabledCustomProductToProduct": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "Product"
								},
								"comparisonType": Terrasoft.ComparisonType.IS_NULL
							}
						]
					}
				},
				"Price": {
					"BindParameterEnabledCustomProductToProduct": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "IsProductPriceEnabled"
								},
								"comparisonType": Terrasoft.ComparisonType.EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": true
								}
							}
						]
					}
				}
			}
		};
	});

define("BaseProductDetailPageV2", ["BusinessRuleModule", "MoneyModule"], function(BusinessRuleModule) {
	return {
		entitySchemaName: "BaseProductEntry",
		attributes: {
			/**
			 * Measure unit
			 * @type {Terrasoft.DataValueType.LOOKUP}
			 */
			"Unit": {
				lookupListConfig: {
					filter: function() {
						if (this.get("Product")) {
							return this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
								"[ProductUnit:Unit:Id].Product.Id", this.get("Product").value);
						}
						return null;
					}
				}
			},

			/**
			 * Products base units list
			 * @type {Terrasoft.DataValueType.COLLECTION}
			 */
			"BaseUnits": {
				dataValueType: this.Terrasoft.DataValueType.COLLECTION,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Product
			 * @type {Terrasoft.DataValueType.LOOKUP}
			 */
			"Product": {
				lookupListConfig: {
					columns: ["[ProductUnit:Product:Id].NumberOfBaseUnits", "Unit"],
					filter: function() {
						return this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
							"IsArchive", 0);
					}
				},
				isRequired: true
			},

			/**
			 * Ammount
			 * @type {Terrasoft.DataValueType.FLOAT}
			 */
			"Amount": {
				dependencies: [{
					columns: ["BaseQuantity"],
					methodName: "onBaseQuantityOrUnitChange"
				}]
			},

			/**
			 * Quantity in base measure unit
			 * @type {Terrasoft.DataValueType.FLOAT}
			 */
			"BaseQuantity": {
				name: "BaseQuantity",
				dataValueType: this.Terrasoft.DataValueType.FLOAT,
				dependencies: [{
					columns: ["Quantity", "Unit"],
					methodName: "onQuantityOrUnitChange"
				}]
			},

			/**
			 * PriceList
			 * @type {Terrasoft.DataValueType.LOOKUP}
			 */
			"PriceList": {
				lookupListConfig: {
					filter: function() {
						if (this.get("Product")) {
							return this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
								"[ProductPrice:PriceList:Id].Product.Id", this.get("Product").value);
						}
						return null;
					}
				},
				dependencies: [{
					columns: ["Product"],
					methodName: "onProductChange"
				}]
			},

			/**
			 * Product price
			 * @type {Terrasoft.DataValueType.FLOAT}
			 */
			"Price": {
				name: "Price",
				dataValueType: this.Terrasoft.DataValueType.FLOAT,
				dependencies: [{
					columns: ["PriceList"],
					methodName: "onPriceListChange"
				}]
			},

			/**
			 * Is initialized
			 * @type {Terrasoft.DataValueType.BOOLEAN}
			 */
			"IsInitialized": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN
			}
		},
		methods: {
			/**
			 * Entity initialization event
			 * @protected
			 * @virtual
			 */
			initEntity: function(callback, scope) {
				this.callParent([function() {
					if (!this.get("IsInitialized")) {
						this.Terrasoft.chain(
							this._setQuerySysSettings,
							this._loadDiscountTax,
							this._loadProductBaseUnits,
							function() {
								this.set("IsInitialized", true);
								this.set("IsEntityInitialized", true);
								callback.call(scope || this);
							}, this
						)
					} else {
						callback.call(scope || this);
					}
				}, this]);
			},

			/**
			 * Sets query system settings.
			 * @param callback {Function} Callback function.
			 * @param scope {Object} Callback scope.
			 * @private
			 */
			_setQuerySysSettings: function(callback, scope) {
				Terrasoft.SysSettings.querySysSettings(["BasePriceList", "DefaultTax", "PriceWithTaxes"], function(values) {
					if (values.DefaultTax) {
						this.set("DefaultTax", values.DefaultTax);
					}
					if (values.BasePriceList) {
						this.set("BasePriceList", values.BasePriceList);
					}
					if (values.PriceWithTaxes) {
						this.set("PriceWithTaxes", values.PriceWithTaxes);
					}
					this.Ext.callback(callback, scope || this);
				}, this);
			},

			/**
			 * Loads discount tax.
			 * @param callback {Function} Callback function.
			 * @param scope {Object} Callback scope.
			 * @private
			 */
			_loadDiscountTax: function(callback, scope) {
				if (this.isAddMode() && this.$DefaultTax) {
					const select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "Tax"
					});
					select.addColumn("Id");
					select.addColumn("Name");
					select.addColumn("Percent");
					select.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Id", this.$DefaultTax.value));
					select.execute(function(response) {
						response.collection.each(function(item) {
							this.set("Tax", this.$DefaultTax);
							this.set("DiscountTax", item.get("Percent"));
						}, this);
						this.Ext.callback(callback, scope || this);
					}, this);
				} else {
					this.Ext.callback(callback, scope || this);
				}
			},

			/**
			 * Set quantity.
			 * On change field "Measure unit"
			 */
			onQuantityOrUnitChange: function() {
				const unit = this.get("Unit");
				const baseUnits = this.get("BaseUnits");
				if (this.isEmpty(unit)) {
					this.set("BaseQuantity", 0);
					return;
				}
				if (this.isEmpty(baseUnits)) {
					this._loadProductBaseUnits(this.onQuantityOrUnitChange, this);
					return;
				}
				const quantity = this.get("Quantity");
				const productUnit = baseUnits.findByAttr("UnitId", unit.value);
				const numberOfBaseUnits = productUnit ? productUnit.get("NumberOfBaseUnits") : 1;
				this.set("BaseQuantity", quantity * (numberOfBaseUnits || 1));
			},

			/**
			 * Loads products base units.
			 * @param callback {Function} Callback function.
			 * @param scope {Object} Callback scope.
			 * @private
			 */
			_loadProductBaseUnits: function(callback, scope) {
				const product = this.get("Product");
				if (this.isEmpty(product)) {
					this.Ext.callback(callback, scope || this);
					return;
				}
				var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "ProductUnit"});
				select.addColumn("NumberOfBaseUnits");
				select.addColumn("Unit.Id", "UnitId");
				select.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Product.Id", product.value));
				select.execute(function(response) {
					this.set("BaseUnits", response.collection);
					this.Ext.callback(callback, scope || this);
				}, this);
			},

			/**
			 * Set quantity
			 * On change field "Quantity"
			 * @protected
			 */
			onBaseQuantityOrUnitChange: function() {
				this.calcAmount();
			},

			/**
			 * Calculate amount
			 * @protected
			 */
			calcAmount: function() {
				var price = this.get("Price") || 0;
				var quantity = this.get("BaseQuantity") || this.get("Quantity") || 0;
				this.set("Amount", (price * quantity));
			},

			/**
			 * On product change event
			 * @protected
			 */
			onProductChange: function() {
				var basePriceList = this.get("BasePriceList");
				var product = this.get("Product");
				this.set("PriceList", null);
				if (!product || !basePriceList) {
					return;
				}
				this.set("PriceList", basePriceList);
				this.set("Unit", product.Unit);
			},

			/**
			 * Get additional pricelist data
			 * @protected
			 * @returns {boolean}
			 */
			requirePriceListData: function() {
				var priceList = this.get("PriceList");
				var product = this.get("Product");
				if (!priceList || !product) {
					this.set("PriceList", null);
					this.set("Price", 0);
					this.set("Tax", null);
					this.set("DiscountTax", 0);
					return false;
				}
				var select = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "ProductPrice"
				});
				select.addColumn("Price");
				select.addColumn("Currency.Id");
				select.addColumn("Tax");
				select.addColumn("Tax.Percent");
				select.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "PriceList", priceList.value));
				select.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Product", this.get("Product").value));
				select.execute(function(response) {
					response.collection.each(function(item) {
						priceList.Price = item.get("Price");
						priceList["Currency.Id"] = item.get("Currency.Id");
						priceList.Tax = item.get("Tax");
						priceList["Tax.Percent"] = item.get("Tax.Percent");
					}, this);
					if (priceList && priceList.hasOwnProperty("Tax")) {
						this.set("Tax", priceList.Tax);
						this.set("DiscountTax", priceList["Tax.Percent"]);
					}
					this.onPriceListChange(true);
				}, this);
				return false;
			},

			/**
			 * On PriceList change event
			 * @protected
			 * @returns {boolean}
			 */
			onPriceListChange: function() {
				var product = this.get("Product");
				if (product && product.Unit) {
					this.set("Unit", product.Unit);
				}
				return this.requirePriceListData();
			}
		},
		rules: {
			/**
			 * Business rule of PriceList
			 */
			"PriceList": {
				"EnabledPriceList": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.ENABLED,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "Product"
						},
						comparisonType: this.Terrasoft.ComparisonType.IS_NOT_NULL
					}]
				}
			},
			"Name": {
				"BindParameterEnabledName": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.ENABLED,
					"conditions": [{
						"leftExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": true
						},
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"rightExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": false
						}
					}]
				}
			},
			"TotalAmount": {
				"BindParameterEnabledTotalAmount": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.ENABLED,
					"conditions": [{
						"leftExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": true
						},
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"rightExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": false
						}
					}]
				}
			},
			"PrimaryTotalAmount": {
				"BindParameterEnabledPrimaryTotalAmount": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.ENABLED,
					"conditions": [{
						"leftExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": true
						},
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"rightExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": false
						}
					}]
				}
			},
			"DiscountTax": {
				"BindParameterEnabledDiscountTax": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.ENABLED,
					"conditions": [{
						"leftExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": true
						},
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"rightExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": false
						}
					}]
				}
			},
			"TaxAmount": {
				"BindParameterEnabledTaxAmount": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.ENABLED,
					"conditions": [{
						"leftExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": true
						},
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"rightExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": false
						}
					}]
				}
			},
			"PrimaryTaxAmount": {
				"BindParameterEnabledPrymaryTaxAmount": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.ENABLED,
					"conditions": [{
						"leftExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": true
						},
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"rightExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": false
						}
					}]
				}
			},
			"Amount": {
				"BindParameterEnabledAmount": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.ENABLED,
					"conditions": [{
						"leftExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": true
						},
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"rightExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": false
						}
					}]
				}
			},
			"PrimaryAmount": {
				"BindParameterEnabledPrimaryAmount": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.ENABLED,
					"conditions": [{
						"leftExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": true
						},
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"rightExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": false
						}
					}]
				}
			}
		},
		diff: /**SCHEMA_DIFF*/ [{
			"operation": "remove",
			"name": "CustomProduct",
			"parentName": "BaseGeneralInfoBlock",
			"propertyName": "items",
			"values": {
				"bindTo": "CustomProduct",
				"layout": {
					"column": 0,
					"row": 2,
					"colSpan": 24
				}
			}
		},
			{
				"operation": "move",
				"name": "Quantity",
				"parentName": "BaseGeneralInfoBlock",
				"propertyName": "items",
				"values": {
					"bindTo": "Quantity",
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "move",
				"name": "Unit",
				"parentName": "BaseGeneralInfoBlock",
				"propertyName": "items",
				"values": {
					"bindTo": "Unit",
					//"enabled": true,
					"layout": {"column": 12, "row": 2, "colSpan": 12},
					"contentType": this.Terrasoft.ContentType.ENUM
				}
			},
			{
				"operation": "move",
				"name": "DeliveryDate",
				"parentName": "BaseGeneralInfoBlock",
				"propertyName": "items",
				"values": {
					"bindTo": "DeliveryDate",
					"layout": {
						"column": 0,
						"row": 3,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "merge",
				"name": "AmountControlGroup",
				"parentName": "BaseProductPageGeneralTabContainer",
				"propertyName": "items",
				"values": {
					"controlConfig": {
						"collapsed": false
					}
				}
			},
			{
				"operation": "insert",
				"name": "PriceList",
				"parentName": "AmountBlock",
				"propertyName": "items",
				"values": {
					"bindTo": "PriceList",
					"layout": {"column": 0, "row": 0, "colSpan": 12},
					"contentType": this.Terrasoft.ContentType.ENUM
				}
			},
			{
				"operation": "move",
				"name": "Price",
				"parentName": "AmountBlock",
				"propertyName": "items",
				"values": {
					"bindTo": "Price",
					"layout": {"column": 0, "row": 1, "colSpan": 12}
				}
			},
			{
				"operation": "move",
				"name": "Amount",
				"parentName": "AmountBlock",
				"propertyName": "items",
				"values": {
					"bindTo": "Amount",
					"layout": {"column": 12, "row": 1, "colSpan": 12}
				}
			},
			{
				"operation": "move",
				"name": "DiscountPercent",
				"parentName": "AmountBlock",
				"propertyName": "items",
				"values": {
					"bindTo": "DiscountPercent",
					"layout": {"column": 0, "row": 2, "colSpan": 12}
				}
			},
			{
				"operation": "move",
				"name": "DiscountAmount",
				"parentName": "AmountBlock",
				"propertyName": "items",
				"values": {
					"bindTo": "DiscountAmount",
					"layout": {"column": 12, "row": 2, "colSpan": 12}
				}
			},
			{
				"operation": "move",
				"name": "Tax",
				"parentName": "AmountBlock",
				"propertyName": "items",
				"values": {
					"bindTo": "Tax",
					"layout": {"column": 0, "row": 3, "colSpan": 12},
					"contentType": this.Terrasoft.ContentType.ENUM
				}
			},
			{
				"operation": "move",
				"name": "TaxAmount",
				"parentName": "AmountBlock",
				"propertyName": "items",
				"values": {
					"bindTo": "TaxAmount",
					"layout": {"column": 0, "row": 4, "colSpan": 12}
				}
			},
			{
				"operation": "move",
				"name": "DiscountTax",
				"parentName": "AmountBlock",
				"propertyName": "items",
				"values": {
					"bindTo": "DiscountTax",
					"layout": {"column": 12, "row": 4, "colSpan": 12}
				}
			},
			{
				"operation": "move",
				"name": "TotalAmount",
				"parentName": "AmountBlock",
				"propertyName": "items",
				"values": {
					"bindTo": "TotalAmount",
					"layout": {"column": 0, "row": 5, "colSpan": 12}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


