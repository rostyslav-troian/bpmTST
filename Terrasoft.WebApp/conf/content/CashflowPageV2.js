Terrasoft.configuration.Structures["CashflowPageV2"] = {innerHierarchyStack: ["CashflowPageV2"], structureParent: "BasePageV2"};
define('CashflowPageV2Structure', ['CashflowPageV2Resources'], function(resources) {return {schemaUId:'69f5a766-7752-4e79-98a7-fdc2b2f09013',schemaCaption: "CashflowPageV2", parentSchemaName: "BasePageV2", schemaName:'CashflowPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CashflowPageV2", ["MoneyModule", "XRMConstants", "ConfigurationEnums", "BusinessRuleModule",
		"MultiCurrencyEdit", "MultiCurrencyEditUtilities"],
	function(MoneyModule, XRMConstants, ConfigurationEnums) {
		return {
			entitySchemaName: "Cashflow",
			mixins: {

				/**
				 * Multi currency mixin.
				 */
				MultiCurrencyEditUtilities: "Terrasoft.MultiCurrencyEditUtilities"
			},
			attributes: {
				"Details": {
					"dependencies": [
						{
							"columns": ["Category"],
							"methodName": "onChangeCategory"
						}
					]
				},
				"PrimaryAmount": {
					"dependencies": [
						{
							"columns": ["CurrencyRate", "Amount"],
							"methodName": "recalculatePrimaryAmount"
						}
					]
				},
				"CurrencyRate": {
					"dependencies": [
						{
							"columns": ["Currency"],
							"methodName": "setCurrencyRate"
						}
					]
				},
				"Category": {
					"dependencies": [
						{
							"columns": ["Type"],
							"methodName": "onChangeType"
						}
					]
				},
				"Currency": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					lookupListConfig: {
						columns: ["Division", "Symbol"]
					}
				},
				/**
				 * Currency button menu list.
				 */
				"CurrencyButtonMenuList": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION,
					value: this.Ext.create("Terrasoft.BaseViewModelCollection")
				},
				/**
				 * Currency rate list.
				 */
				"CurrencyRateList": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION,
					value: this.Ext.create("Terrasoft.Collection")
				}
			},
			methods: {
				/**
				 * Handles Category change.
				 * @private
				 */
				onChangeCategory: function() {
					if (!this.changedValues.hasOwnProperty("Details") &&
							(this.get("Operation") === ConfigurationEnums.CardState.Add)) {
						var category = this.get("Category");
						if (category) {
							this.set("Details", category.displayValue);
						}
					}
				},

				/**
				 * Handles Type change.
				 * @private
				 */
				onChangeType: function() {
					this.set("Category", null);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					if (this.get("Operation") === ConfigurationEnums.CardState.Add ||
							this.get("Operation") === ConfigurationEnums.CardState.Copy) {
						this.getIncrementCode(function(responce) {
							this.set("Number", responce);
						}, this);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
				 * @overridden
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					this.mixins.MultiCurrencyEditUtilities.init.call(this);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#save
				 * @overridden
				 */
				save: function() {
					if (!this.validate()) {
						return;
					}
					var type = this.get("Type");
					var amount = this.get("Amount");
					if (type.value === XRMConstants.Cashflow.Type.Inflow && amount < 0 ||
						type.value === XRMConstants.Cashflow.Type.Outflow && amount > 0) {
						this.set("Amount", amount * -1);
					}
					this.callParent(arguments);
				},

				/**
				 * Sets currency rate according to operation date.
				 * @private
				 */
				setCurrencyRate: function() {
					MoneyModule.LoadCurrencyRate.call(this, "Currency", "CurrencyRate", this.get("StartDate"));
				},

				/**
				 * Performs amount recalculation.
				 * @private
				 */
				recalculatePrimaryAmount: function() {
					var currency = this.get("Currency");
					var division = currency ? currency.Division : 1;
					MoneyModule.RecalcBaseValue.call(this, "CurrencyRate", "Amount", "PrimaryAmount", division);
				},

				/**
				 * @inheritdoc BaseSchemaViewModel#setValidationConfig
				 * @overridden
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("CurrencyRate", function(value) {
						var invalidMessage = "";
						var isValid = true;
						if (value <= 0) {
							isValid = false;
							invalidMessage = this.get("Resources.Strings.WarningDefaultValidate");
							this.showInformationDialog(this.get("Resources.Strings.WarningCurrencyRate"));
						}
						return {
							invalidMessage: invalidMessage,
							isValid: isValid
						};
					});
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "CashflowPageGeneralTabContainer",
					"parentName": "CardContentContainer",
					"propertyName": "items",
					"values": {
						"itemType": 7,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "CashflowPageGeneralTabContainer",
					"propertyName": "items",
					"name": "CashflowPageGeneralBlock",
					"values": {
						"itemType": 0,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName":  "Header",
					"propertyName": "items",
					"name": "Number",
					"values": {
						"bindTo": "Number",
						"layout": {
							"column": 0,
							"row": 0
						},
						"controlConfig": {"enabled": false}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Project",
					"values": {
						"bindTo": "Project",
						"layout": {
							"column": 12,
							"row": 0
						},
						"controlConfig": {"enabled": false}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Details",
					"values": {
						"bindTo": "Details",
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Date",
					"values": {
						"bindTo": "Date",
						"layout": {
							"column": 0,
							"row": 2
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Status",
					"values": {
						"bindTo": "Status",
						"layout": {
							"column": 12,
							"row": 2
						},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Type",
					"values": {
						"bindTo": "Type",
						"layout": {
							"column": 0,
							"row": 3
						},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Category",
					"values": {
						"bindTo": "Category",
						"layout": {
							"column": 12,
							"row": 3
						},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},

				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Amount",
					"values": {
						"bindTo": "Amount",
						"layout": {"column": 0, "row": 4},
						"primaryAmount": "PrimaryAmount",
						"currency": "Currency",
						"rate": "CurrencyRate",
						"primaryAmountEnabled": false,
						"generator": "MultiCurrencyEditViewGenerator.generate"
					}
				},
				{
					"operation": "remove",
					"name": "actions"
				}
			]/**SCHEMA_DIFF*/,
			rules: {
				"Category": {
					"FiltrationCategoryByCashflowType": {
						"ruleType": 1,
						"baseAttributePatch": "CashflowType",
						"comparisonType": 3,
						"type": 1,
						"attribute": "Type"
					}
				}
			}
		};
	});


