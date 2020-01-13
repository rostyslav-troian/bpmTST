Terrasoft.configuration.Structures["InvoicePageV2"] = {innerHierarchyStack: ["InvoicePageV2Invoice", "InvoicePageV2Order", "InvoicePageV2ContractInInvoice", "InvoicePageV2Passport", "InvoicePageV2"], structureParent: "BaseModulePageV2"};
define('InvoicePageV2InvoiceStructure', ['InvoicePageV2InvoiceResources'], function(resources) {return {schemaUId:'b8a98131-367e-4bc0-88b7-06bea6a143de',schemaCaption: "Invoice edit page", parentSchemaName: "BaseModulePageV2", schemaName:'InvoicePageV2Invoice',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('InvoicePageV2OrderStructure', ['InvoicePageV2OrderResources'], function(resources) {return {schemaUId:'5e462a78-b3ee-40cb-a5c8-31350276fe7d',schemaCaption: "Invoice edit page", parentSchemaName: "InvoicePageV2Invoice", schemaName:'InvoicePageV2Order',parentSchemaUId:'b8a98131-367e-4bc0-88b7-06bea6a143de',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"InvoicePageV2Invoice",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('InvoicePageV2ContractInInvoiceStructure', ['InvoicePageV2ContractInInvoiceResources'], function(resources) {return {schemaUId:'e9202bad-ee21-4b33-9236-47308bf647f2',schemaCaption: "Invoice edit page", parentSchemaName: "InvoicePageV2Order", schemaName:'InvoicePageV2ContractInInvoice',parentSchemaUId:'5e462a78-b3ee-40cb-a5c8-31350276fe7d',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"InvoicePageV2Order",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('InvoicePageV2PassportStructure', ['InvoicePageV2PassportResources'], function(resources) {return {schemaUId:'2a2b7a91-3a08-4a5c-a7c0-a2a5722e6a02',schemaCaption: "Invoice edit page", parentSchemaName: "InvoicePageV2ContractInInvoice", schemaName:'InvoicePageV2Passport',parentSchemaUId:'e9202bad-ee21-4b33-9236-47308bf647f2',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"InvoicePageV2ContractInInvoice",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('InvoicePageV2Structure', ['InvoicePageV2Resources'], function(resources) {return {schemaUId:'3a5e46f8-51e1-46bc-bb7b-de8be7211e22',schemaCaption: "Invoice edit page", parentSchemaName: "InvoicePageV2Passport", schemaName:'InvoicePageV2',parentSchemaUId:'2a2b7a91-3a08-4a5c-a7c0-a2a5722e6a02',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"InvoicePageV2Passport",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('InvoicePageV2InvoiceResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("InvoicePageV2Invoice", ["ProductSalesUtils", "BaseFiltersGenerateModule", "BusinessRuleModule",
		"ConfigurationConstants", "InvoiceConfigurationConstants", "MoneyModule", "VisaHelper", "VwInvoiceProduct",
		"css!VisaHelper", "MultiCurrencyEdit", "MultiCurrencyEditUtilities", "ProductEntryPageUtils"],
	function(ProductSalesUtils, BaseFiltersGenerateModule, BusinessRuleModule, ConfigurationConstants,
			InvoiceConfigurationConstants, MoneyModule, VisaHelper, VwInvoiceProduct) {
		return {
			entitySchemaName: "Invoice",
			mixins: {
				ProductEntryPageUtils: "Terrasoft.ProductEntryPageUtils",

				/**
				 * Used to deal with multi currency values.
				 */
				MultiCurrencyEditUtilities: "Terrasoft.MultiCurrencyEditUtilities"
			},
			messages: {
				"GetCardCurrencyRate": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			attributes: {

				/**
				 * Flag of Order field enabled status.
				 */
				"OrderEnabled": {
					"value": false
				},

				/**
				* Customer billing info.
				*/
				"CustomerBillingInfo": {
					dependencies: [
						{
							columns: ["Account"],
							methodName: "updateCustomerBillingInfo"
						}
					]
				},

				/**
				* Supplier billing info.
				*/
				"SupplierBillingInfo": {
					dependencies: [
						{
							columns: ["Supplier"],
							methodName: "updateSupplierBillingInfo"
						}
					]
				},

				/*
				* Invoice payment amount.
				**/
				"PaymentAmount": {
					dataValueType: Terrasoft.DataValueType.FLOAT,
				},

				/*
				* Invoice payment amount in primary currency.
				**/
				"PrimaryPaymentAmount": {
					dataValueType: Terrasoft.DataValueType.FLOAT,
					dependencies: [
						{
							columns: ["PaymentAmount"],
							methodName: "recalculatePrimaryPaymentAmount"
						}
					]
				},

				/**
				 * Currency.
				 */
				"Currency": {
					lookupListConfig: {
						columns: ["Division", "Symbol"]
					}
				},

				/**
				* Currency rate.
				*/
				"CurrencyRate": {
					dataValueType: Terrasoft.DataValueType.FLOAT,
					onChange: "onCurrencyRateChange",
					dependencies: [
						{
							columns: ["Currency"],
							methodName: "setCurrencyRate"
						}
					]
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
				},

				/**
				* Amount.
				*/
				"Amount": {
					dataValueType: Terrasoft.DataValueType.FLOAT,
					dependencies: [
						{
							columns: ["Amount"],
							methodName: "recalculatePrimaryAmount"
						}
					]
				},

				/**
				* Remind owner date.
				*/
				"RemindToOwnerDate": {
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					dependencies: [
						{
							columns: ["RemindToOwner"],
							methodName: "remindToOwnerDateOnChange"
						}
					]
				},

				/**
				* Withdraw date.
				*/
				"StartDate": {
					dataValueType: Terrasoft.DataValueType.DATE,
					dependencies: [
						{
							columns: ["StartDate"],
							methodName: "onStartDateAttributeChange"
						}
					]
				},

				/**
				* Payment date.
				*/
				"DueDate": {
					dataValueType: Terrasoft.DataValueType.DATE,
					dependencies: [
						{
							columns: ["PaymentStatus"],
							methodName: "setDueDate"
						}
					]
				},
				
				/**
				 * Owner.
				 */
				"Owner": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					lookupListConfig: {filter: BaseFiltersGenerateModule.OwnerFilter}
				},

				/**
				 * Flag of Amount and PrimaryAmount fields availability.
				 */
				"AmountEnabled": {
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},
				
				/**
				 * Client.
				 */
				"Client": {
					"caption": {"bindTo": "Resources.Strings.Client"},
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"multiLookupColumns": ["Contact", "Account"],
					"isRequired": true
				}
			},
			details: /**SCHEMA_DETAILS*/{
				Activities: {
					schemaName: "ActivityDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Invoice"
					},
					defaultValues: {
						Account: {masterColumn: "Account"},
						Contact: {masterColumn: "Contact"}
					}
				},
				InvoiceProduct: {
					schemaName: "InvoiceProductDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Invoice"
					},
					subscriber: function() {
						this.updateAmount();
						this.setAmountEnabled();
					}
				},
				Visa: {
					schemaName: "VisaDetailV2",
					entitySchemaName: "InvoiceVisa",
					filter: {
						masterColumn: "Id",
						detailColumn: "Invoice"
					}
				},
				Files: {
					schemaName: "FileDetailV2",
					entitySchemaName: "InvoiceFile",
					filter: {
						masterColumn: "Id",
						detailColumn: "Invoice"
					}
				},
				EntityConnections: {
					schemaName: "EntityConnectionsDetailV2",
					entitySchemaName: "EntityConnection",
					filter: {
						masterColumn: "Id",
						detailColumn: "SysModuleEntity"
					}
				},
				EmailDetailV2: {
					schemaName: "EmailDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Invoice"
					},
					filterMethod: "emailDetailFilter"
				}
			}/**SCHEMA_DETAILS*/,
			properties: {
				moneyModule: null
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onGetPageTips
				 * @overridden
				 */
				onGetPageTips: function() {
					return {
						"Contract": this.get("Resources.Strings.ContractTip"),
						"Opportunity": this.get("Resources.Strings.OpportunityTip")
					};
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#init
				 * @overridden
				 */
				init: function() {
					this.moneyModule = MoneyModule;
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					this.sandbox.subscribe("GetCardCurrencyRate", this.getCurrencyRate, this, ["InvoicePageV2"]);
				},

				/**
				 * ######### ###### ### ######## # #######
				 * @param {Object} config
				 * @overridden
				 * @return {Boolean}
				 */
				openCardInChain: function(config) {
					if (config && !config.hasOwnProperty("OpenProductSelectionModule")) {
						return this.callParent(arguments);
					}
					return ProductSalesUtils.openProductSelectionModuleInChain(config, this.sandbox);
				},

				/**
				 * ########## ######### ######## ########.
				 * @protected
				 * @overridden
				 * @return {Terrasoft.BaseViewModelCollection} ########## ######### ######## ########
				 */
				getActions: function() {
					var actionMenuItems = this.callParent(arguments);
					actionMenuItems.addItem(this.getButtonMenuItem({
						Type: "Terrasoft.MenuSeparator",
						Caption: ""
					}));
					actionMenuItems.addItem(this.getButtonMenuItem({
						"Caption": VisaHelper.resources.localizableStrings.SendToVisaCaption,
						"Tag": VisaHelper.SendToVisaMenuItem.methodName,
						"Enabled": {"bindTo": "canEntityBeOperated"}
					}));
					return actionMenuItems;
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
				 * @overridden
				 */
				onEntityInitialized: function() {
					this.setIncrementCode();
					this.updateSupplierBillingInfo(true);
					this.callParent(arguments);
					this.mixins.MultiCurrencyEditUtilities.init.call(this);
					this.setAmountEnabled();
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#getIncrementColumn
				 * @overridden
				 */
				getIncrementColumn: function() {
					return "Number";
				},

				/**
				 * ##### #### ### ######.
				 * @private
				 */
				setAmountEnabled: function() {
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "InvoiceProduct"
					});
					esq.addAggregationSchemaColumn("Id",
						Terrasoft.AggregationType.COUNT, "ProductsCount");
					esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Invoice",  this.get("Id")));
					esq.getEntityCollection(function(response) {
						if (response.success) {
							var collection = response.collection;
							if (collection && collection.getByIndex(0)) {
								this.set("AmountEnabled", (collection.getByIndex(0).get("ProductsCount") === 0));
							}
						}
					}, this);
				},

				/**
				* ###########, ##### ########## #### ###########
				* @private
				*/
				onStartDateAttributeChange: function() {
					var currency = this.get("Currency");
					this.Terrasoft.SysSettings.querySysSettingsItem("PrimaryCurrency", function(primaryCurrency) {
						if (!currency) {
							return;
						}
						if (currency.value !== primaryCurrency.value && !this.Ext.isEmpty(this.get("StartDate")) &&
								!this.Ext.isEmpty(currency.value)) {
							this.showConfirmationDialog(this.get("Resources.Strings.CurrencyRateDateQuestion"),
								function(returnCode) {
									if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
										this.setCurrencyRate();
									}
								}, ["yes", "no"]);
						} else {
							this.setCurrencyRate();
						}
					}, this);
				},

				/**
				 * ############# #### ######.
				 * ############# ######## "Amount" ## ######### ######## "PrimaryAmount".
				 * @protected
				 */
				setCurrencyRate: function() {
					this.set("ShowSaveButton", true);
					this.set("ShowDiscardButton", true);
					this.set("IsChanged", true, {silent: true});
					this.moneyModule.LoadCurrencyRate.call(this, "Currency", "CurrencyRate", this.get("StartDate"), 
						function() {
							this.recalculateAmount();
							this.recalculatePrimaryPaymentAmount();
						});
				},

				/**
				 * ########## ########### #######.
				 * @protected
				 */
				getCurrencyDivision: function() {
					var currency = this.get("Currency");
					return currency && currency.Division;
				},

				/**
				 * Handler for currency rate change.
				 * @protected
				 * @virtual
				 */
				onCurrencyRateChange: function() {
					var amount = this.get("Amount");
					var primaryAmount = this.get("PrimaryAmount");
					if (amount && this.isEmpty(primaryAmount)) {
						this.recalculatePrimaryAmount();
					}
					this.recalculateAmount();
					var paymentAmount = this.get("PaymentAmount");
					if (paymentAmount) {
						this.recalculatePrimaryPaymentAmount();
					}
				},

				/**
				 * Returns currency rate.
				 * @protected
				 * @return {Number} Currency rate.
				 */
				getCurrencyRate: function() {
					return this.get("CurrencyRate");
				},

				/**
				 * Recalculates invoice's amount.
				 * @protected
				 */
				recalculateAmount: function() {
					var division = this.getCurrencyDivision();
					this.set("IsAmountCalculated", true);
					this.moneyModule.RecalcCurrencyValue.call(this, "CurrencyRate", "Amount", "PrimaryAmount", division);
					this.set("IsAmountCalculated", false);
				},

				/**
				 * Recalculates amount in base currency.
				 * @protected
				 */
				recalculatePrimaryAmount: function() {
					var isAutoCalculated = this.get("IsAmountCalculated");
					if (!isAutoCalculated) {
						var division = this.getCurrencyDivision();
						this.moneyModule.RecalcBaseValue.call(this, "CurrencyRate", "Amount", "PrimaryAmount", division);
					}
				},

				/**
				 * Recalculates payment amount.
				 * @protected
				 */
				recalculatePaymentAmount: function() {
					var division = this.getCurrencyDivision();
					this.set("IsPaymentAmountCalculated", true);
					this.moneyModule.RecalcCurrencyValue.call(this, "CurrencyRate", "PaymentAmount", "PrimaryPaymentAmount",
						division);
					this.set("IsPaymentAmountCalculated", false);
				},

				/**
				 * Recalculates payment amount in base currency.
				 * @protected
				 */
				recalculatePrimaryPaymentAmount: function() {
					var division = this.getCurrencyDivision();
					this.moneyModule.RecalcBaseValue.call(this, "CurrencyRate", "PaymentAmount", "PrimaryPaymentAmount",
						division);
				},

				/**
				* ###########, ##### ########## #### ########### ##############
				* @protected
				*/
				remindToOwnerDateOnChange: function() {
					if (this.get("RemindToOwner")) {
						var currentDateTime = this.getSysDefaultValue(Terrasoft.SystemValueType.CURRENT_DATE_TIME);
						currentDateTime.setDate(currentDateTime.getDate() + 1);
						var startDateTime = this.get("StartDate");
						if (!this.Ext.isEmpty(startDateTime) && startDateTime > currentDateTime) {
							this.set("RemindToOwnerDate", startDateTime);
						} else {
							this.set("RemindToOwnerDate", currentDateTime);
						}
					} else {
						this.set("RemindToOwnerDate", null);
					}
				},

				/**
				* Sets payment date.
				* @protected
				*/
				setDueDate: function() {
					var paymentStatus = this.get("PaymentStatus");
					if (this.Ext.isEmpty(paymentStatus) ||
						(paymentStatus.value !== InvoiceConfigurationConstants.Invoice.PaymentStatus.PartiallyPaid &&
							paymentStatus.value !== InvoiceConfigurationConstants.Invoice.PaymentStatus.Paid)) {
						this.set("DueDate", null);
					} else {
						this.set("DueDate", this.getSysDefaultValue(Terrasoft.SystemValueType.CURRENT_DATE_TIME));
					}
					if (paymentStatus && paymentStatus.value === InvoiceConfigurationConstants.Invoice.PaymentStatus.Paid) {
						this.set("PaymentAmount", this.get("Amount"));
					}
				},

				/**
				* Checks if "Contact" or "Account" isn't empty.
				* @param {Function} callback
				* @param {Object} scope
				*/
				validateAccountOrContactFilling: function(callback, scope) {
					var account = this.get("Account");
					var contact = this.get("Contact");
					var result = {
						success: true
					};
					if (this.Ext.isEmpty(account) && this.Ext.isEmpty(contact)) {
						result.message = this.get("Resources.Strings.RequiredFieldsMessage");
						result.success = false;
					}
					callback.call(scope || this, result);
				},

				/**
				 * Checks if "CurrencyRate" isn't empty.
				 * @param {Function} callback
				 * @param {Object} scope
				 */
				validateCurrencyRateFilling: function(callback, scope) {
					var result = {
						success: true
					};
					var currencyRate = this.get("CurrencyRate");
					if (this.Ext.isEmpty(currencyRate) || currencyRate <= 0) {
						result.message = this.get("Resources.Strings.RequiredCurrencyRateMessage");
						result.success = false;
					}
					callback.call(scope || this, result);
				},

				/**
				 * Validates viewModel values.
				 * Shows message to refill incorrect values.
				 * @protected
				 * @overridden
				 * @param {Function} callback
				 * @param {Terrasoft.BaseSchemaViewModel} scope - callback's context.
				 */
				asyncValidate: function(callback, scope) {
					this.callParent([function(response) {
						var checkResponse = function(context) {
							if (!context.response.success) {
								context.callback.call(context.scope, context.response);
							} else {
								context.next();
							}
						};
						var validationChain = [
							checkResponse,
							function(context) {
								context.scope.validateAccountOrContactFilling(function(response) {
									context.response = response;
									context.next();
								}, context.scope);
							},
							checkResponse,
							function(context) {
								context.scope.validateCurrencyRateFilling(function(response) {
									context.response = response;
									context.next();
								}, context.scope);
							},
							function(context) {
								context.callback.call(context.scope, context.response);
							}
						];
						Terrasoft.chain({
							scope: scope || this,
							response: response,
							callback: callback
						}, validationChain);
					}, this]);
				},

				/**
				 * ######## "######### ## ###########"
				 */
				sendToVisa: VisaHelper.SendToVisaMethod,

				/**
				 * Creates EntitySchemaQuery entity.
				 * @param {string} relatedToBillingInfoPropertyName - "Account" or "Supplier".
				 * @return {Terrasoft.EntitySchemaQuery} EntitySchemaQuery entity.
				 * @protected
				 */
				getBillingInfoEsq: function(relatedToBillingInfoPropertyName) {
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "AccountBillingInfo"
					});
					esq.addColumn("Name");
					var filter = this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"Account", this.get(relatedToBillingInfoPropertyName).value);
					esq.filters.add(relatedToBillingInfoPropertyName + "Filter", filter);
					esq.rowCount = 2;
					return esq;
				},

				/**
				 * Gets billing info from DB and call callback with result or null.
				 * @param {string} relatedToBillingInfoPropertyName - "Account" or "Supplier".
				 * @param {Function} callback.
				 * @param isSilent {Boolean} - flag of value should set silently. 
				 * @protected
				 */
				setBillingInfo: function(relatedToBillingInfoPropertyName, callback, isSilent) {
					var esq = this.getBillingInfoEsq(relatedToBillingInfoPropertyName);
					esq.getEntityCollection(function(response) {
						if (response && response.success) {
							var collection = response.collection;
							if (collection.getCount() === 1) {
								var billingInfoRecord = collection.getByIndex(0);
								callback({
									value: billingInfoRecord.get("Id"),
									displayValue: billingInfoRecord.get("Name")
								}, isSilent);
							} else {
								callback(null, isSilent);
							}
						} else {
							callback(null, isSilent);
						}
					}, this);
				},

				/**
				 * Sets billing info to target property.
				 * @param {Object} value - BillingInfo.
				 * @param {string} billingInfoPropertyName - "CustomerBillingInfo" or "SupplierBillingInfo".
				 * @param isSilent {Boolean} - flag of value should set silently.
				 * @private
				 */
				setBillingInfoCallback: function(billingInfoPropertyName, value, isSilent) {
					this.set(billingInfoPropertyName, value, {silent: isSilent});
				},

				/**
				 * Updates customer and supplier billing info.
				 * @obsolete
				 * @protected
				 */
				clearBillingInfo: function() {
					this.log(this.Ext.String.format(this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
						"clearBillingInfo", "updateCustomerBillingInfo or updateSupplierBillingInfo"));
					this.updateCustomerBillingInfo();
					this.updateSupplierBillingInfo();
				},

				/**
				 * Updates property billing of specified related billing info property.
				 * @param {string} relatedToBillingInfoPropertyName - "Account" or "Supplier".
				 * @param {string} billingInfoPropertyName - "CustomerBillingInfo" or "SupplierBillingInfo".
				 * @param isSilent {Boolean} - flag of value should set silently.
				 * @protected
				 */
				updateBillingInfo: function(relatedToBillingInfoPropertyName, billingInfoPropertyName, isSilent) {
					var billingInfoOwner = this.get(relatedToBillingInfoPropertyName);
					var billingInfo = this.get(billingInfoPropertyName);
					var billingInfoAccount = billingInfo
						? billingInfo.Account
						: null;
					if (Terrasoft.utils.object.isEqual(billingInfoOwner, billingInfoAccount)) {
						return;
					}
					if (this.Ext.isEmpty(billingInfoOwner)) {
						this.set(billingInfoPropertyName, null, {silent: isSilent});
					} else {
						this.setBillingInfo(relatedToBillingInfoPropertyName,
							this.setBillingInfoCallback.bind(this, billingInfoPropertyName),
							isSilent
						);
					}
				},

				/**
				 * Updates customer billing info.
				 * @protected
				 */
				updateCustomerBillingInfo: function() {
					this.updateBillingInfo("Account", "CustomerBillingInfo");
				},

				/**
				 * Updates supplier billing info.
				 * @protected
				 */
				updateSupplierBillingInfo: function(isSilent) {
					this.updateBillingInfo("Supplier", "SupplierBillingInfo", isSilent);
				},

				/**
				 * ########### #########
				 * @private
				 * @param {Terrasoft.Collection} sourceEntityItems ######## ### ###########.
				 * @param {Function} callback ##### ######### ######.
				 */
				copyInvoiceProducts: function(sourceEntityItems, callback) {
					var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
					sourceEntityItems.each(function(entity) {
						var insertQuery = this.Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: "InvoiceProduct"
						});
						delete entity.columns.Id;
						this.Terrasoft.each(entity.columns, function(column) {
							if (column.columnPath === "Invoice") {
								insertQuery.setParameterValue(column.columnPath, this.get("Id"),
									column.dataValueType);
							} else {
								if (!this.Ext.isEmpty(entity.get(column.columnPath))) {
									insertQuery.setParameterValue(column.columnPath,
										entity.get(column.columnPath), column.dataValueType);
								}
							}
						}, this);
						batchQuery.add(insertQuery);
					}, this);
					batchQuery.execute(callback, this);
				},

				/**
				 * ########## ####### ### ########### ##### # ########### #########
				 * @private
				 */
				setCopyColumnValues: function(entity) {
					this.callParent(arguments);
					var parentId = entity.get("Id");
					this.set("ParentInvoiceId", parentId);
					var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "InvoiceProduct"
					});
					select.rowCount = 1;
					select.filters.add("InvoiceId", Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "Invoice", parentId));
					select.getEntityCollection(function(responce) {
						if (responce.collection.getCount() !== 0) {
							this.showConfirmationDialog(this.get("Resources.Strings.CopyProductsQuestion"),
								function(returnCode) {
									if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
										this.saveEntity(this.prepareProductCopy, this);
									} else {
										this.set("Amount", 0);
										this.set("PrimaryAmount", 0);
										this.set("PaymentAmount", 0);
										this.set("PrimaryPaymentAmount", 0);
									}
								}, ["yes", "no"]);
						}
					}, this);
				},

				/**
				 * callback - #######, ######### ####### ########### ##### ########## #####
				 * @private
				 */
				prepareProductCopy: function() {
					var parentId = this.get("ParentInvoiceId");
					var schema = VwInvoiceProduct;
					var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchema: schema
					});
					select.filters.add("InvoiceId", Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Invoice", parentId));
					this.Terrasoft.each(schema.columns, function(item) {
						if (item.isValueCloneable) {
							select.addColumn(item.name);
						}
					});
					select.getEntityCollection(function(responce) {
						var entityCollection = responce.collection;
						if (entityCollection.getCount() === 0) {
							return;
						}
						this.copyInvoiceProducts(entityCollection, this.onProductsCopied);
					}, this);
				},

				/**
				 * ######### ########### ####### ## ########### #########
				 * @private
				 */
				onProductsCopied: function(responce) {
					if (responce.ResponseStatus) {
						this.showInformationDialog(this.Ext.String.format(
							this.get("Resources.Strings.CopyProductsError"), responce.ResponseStatus.Message));
						return;
					}
					this.sendSaveCardModuleResponse(responce.success);
				},

				/**
				 * @inheritDoc Terrasoft.BasePageV2#saveEntityInChain
				 * @overridden
				 */
				saveEntityInChain: function(next) {
					var callback = this.updateAmountAfterSave.bind(this, "InvoiceProduct", next);
					this.callParent([callback]);
				},

				/**
				 * Creates filter for detail Email.
				 * @protected
				 * @return {Terrasoft.FilterGroup} Group filters.
				 */
				emailDetailFilter: function() {
					var recordId = this.get("Id");
					var filterGroup = new this.Terrasoft.createFilterGroup();
					filterGroup.add("InvoiceNotNull", this.Terrasoft.createColumnIsNotNullFilter("Invoice"));
					filterGroup.add("InvoiceConnection", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Invoice", recordId));
					filterGroup.add("ActivityType", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Type", ConfigurationConstants.Activity.Type.Email));
					return filterGroup;
				}
			},
			rules: {
				"CustomerBillingInfo": {
					"FiltrationCustomerBillingInfoByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"baseAttributePatch": "Account",
						"autocomplete": true,
						"autoClean": true,
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					},
					"BindParameterEnabledCustomerBillingInfoToAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "Account"
								},
								"comparisonType": Terrasoft.ComparisonType.IS_NOT_NULL
							}
						]
					}
				},
				"SupplierBillingInfo": {
					"FiltrationSupplierBillingInfoByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"baseAttributePatch": "Account",
						"autocomplete": true,
						"autoClean": true,
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Supplier"
					},
					"BindParameterEnabledSupplierBillingInfoToSupplier": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "Supplier"
								},
								"comparisonType": Terrasoft.ComparisonType.IS_NOT_NULL
							}
						]
					}
				},
				"Order": {
					"EnableOrderByOrderEnabled": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "OrderEnabled"
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
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "InvoicePageGeneralTabContainer",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"alias": {"name": "GeneralInfoTab"},
					"values": {
						"caption": {"bindTo": "Resources.Strings.GeneralInfoTabCaption"},
						"items": []
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "InvoiceProductsTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.InvoiceProductsTabCaption"},
						"items": []
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "InvoiceVisaTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.InvoiceVisaTabCaption"},
						"items": []
					},
					"index": 2
				},
				{
					"operation": "insert",
					"name": "InvoiceHistoryTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.InvoiceHistoryTabCaption"},
						"items": []
					},
					"index": 3
				},
				{
					"operation": "insert",
					"name": "InvoiceFileNotesTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.InvoiceFileNotesTabCaption"},
						"items": []
					},
					"index": 4
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Number",
					"values": {
						"bindTo": "Number",
						"layout": {"column": 0, "row": 0, "colSpan": 12},
						"enabled": false,
						"tip": {
							"content": {"bindTo": "Resources.Strings.NumberTip"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "StartDate",
					"values": {
						"bindTo": "StartDate",
						"caption": {"bindTo": "Resources.Strings.StartDateCaption"},
						"layout": {"column": 12, "row": 0, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Owner",
					"values": {
						"bindTo": "Owner",
						"layout": {"column": 0, "row": 1, "colSpan": 12},
						"tip": {
							"content": {"bindTo": "Resources.Strings.OwnerTip"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoiceProductsTab",
					"name": "InvoicePageProductsTabContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoiceVisaTab",
					"name": "InvoicePageVisaTabContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoiceVisaTab",
					"propertyName": "items",
					"name": "Visa",
					"lableConfig": {"visible": false},
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "ESNFeedContainer",
					"name": "InvoiceLineTab",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoiceLineTab",
					"name": "InvoicePageLineTabContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoiceHistoryTab",
					"name": "InvoicePageHistoryTabContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePageHistoryTabContainer",
					"propertyName": "items",
					"name": "Activities",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePageHistoryTabContainer",
					"propertyName": "items",
					"name": "EmailDetailV2",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoiceProductsTab",
					"propertyName": "items",
					"name": "InvoiceProduct",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoiceFileNotesTab",
					"name": "InvoicePageFileNotesTabContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},

				{
					"operation": "insert",
					"parentName": "InvoicePageGeneralTabContainer",
					"name": "GeneralInfoControlGroup",
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
					"parentName": "InvoicePageGeneralTabContainer",
					"name": "SumControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {"bindTo": "Resources.Strings.SumGroupCaption"},
						"items": [],
						"controlConfig": {
							"collapsed": false
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePageGeneralTabContainer",
					"name": "PaymentControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {"bindTo": "Resources.Strings.PaymentGroupCaption"},
						"items": [],
						"controlConfig": {
							"collapsed": false
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePageGeneralTabContainer",
					"propertyName": "items",
					"name": "EntityConnections",
					"values": {
						itemType: Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePageGeneralTabContainer",
					"name": "RemindControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {"bindTo": "Resources.Strings.RemindControlGroupCaption"},
						"controlConfig": {
							"collapsed": false
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoControlGroup",
					"propertyName": "items",
					"name": "InvoicePageGeneralBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "SumControlGroup",
					"propertyName": "items",
					"name": "InvoicePageSumBlock",

					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "PaymentControlGroup",
					"propertyName": "items",
					"name": "InvoicePagePaymentBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "RemindControlGroup",
					"propertyName": "items",
					"name": "InvoicePageRemindControlBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePageProductsTabContainer",
					"propertyName": "items",
					"name": "InvoicePageProductsBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePageVisaTabContainer",
					"propertyName": "items",
					"name": "InvoicePageVisaBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePageLineTabContainer",
					"propertyName": "items",
					"name": "InvoicePageLineBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePageHistoryTabContainer",
					"propertyName": "items",
					"name": "InvoicePageHistoryBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePageGeneralBlock",
					"propertyName": "items",
					"name": "Client",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 12},
						"tip": {
							"content": {"bindTo": "Resources.Strings.ClientTip"}
						},
						"controlConfig": {
							"enableLeftIcon": true,
							"leftIconConfig": {"bindTo": "getMultiLookupIconConfig"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePageGeneralBlock",
					"propertyName": "items",
					"name": "Supplier",
					"values": {
						"bindTo": "Supplier",
						"layout": {"column": 0, "row": 1, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePageGeneralBlock",
					"propertyName": "items",
					"name": "CustomerBillingInfo",
					"values": {
						"bindTo": "CustomerBillingInfo",
						"layout": {"column": 12, "row": 0, "colSpan": 12},
						"tip": {
							"content": {"bindTo": "Resources.Strings.CustomerBillingInfoTip"}
						},
						"caption": {"bindTo": "Resources.Strings.ClientDetails"},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePageGeneralBlock",
					"propertyName": "items",
					"name": "SupplierBillingInfo",
					"values": {
						"bindTo": "SupplierBillingInfo",
						"layout": {"column": 12, "row": 1, "colSpan": 12},
						"tip": {
							"content": {"bindTo": "Resources.Strings.SupplierBillingInfoTip"}
						},
						"caption": {"bindTo": "Resources.Strings.SupplierDetails"},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePageSumBlock",
					"name": "Amount",
					"propertyName": "items",
					"values": {
						"bindTo": "Amount",
						"layout": {"column": 0, "row": 0, "colSpan": 12},
						"primaryAmount": "PrimaryAmount",
						"currency": "Currency",
						"rate": "CurrencyRate",
						"enabled": {"bindTo": "AmountEnabled"},
						//"rateChange": {"bindTo": "setCurrencyRate"},
						"primaryAmountEnabled": false,
						"generator": "MultiCurrencyEditViewGenerator.generate",
						"tip": {
							"content": {"bindTo": "Resources.Strings.AmountTip"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePagePaymentBlock",
					"name": "PaymentStatus",
					"propertyName": "items",
					"values": {
						"bindTo": "PaymentStatus",
						"layout": {"column": 0, "row": 0, "colSpan": 12},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePagePaymentBlock",
					"propertyName": "items",
					"name": "DueDate",
					"values": {
						"bindTo": "DueDate",
						"layout": {"column": 12, "row": 0, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePagePaymentBlock",
					"propertyName": "items",
					"name": "PaymentAmount",
					"values": {
						"bindTo": "PaymentAmount",
						"layout": {"column": 0, "row": 1, "colSpan": 12},
						"primaryAmount": "PrimaryPaymentAmount",
						"currency": "Currency",
						"rate": "CurrencyRate",
						"primaryAmountEnabled": false,
						"generator": "MultiCurrencyEditViewGenerator.generate"
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePageRemindControlBlock",
					"propertyName": "items",
					"name": "RemindToOwner",
					"values": {
						"bindTo": "RemindToOwner",
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12
						},
						"labelConfig": {
							"caption": {"bindTo": "Resources.Strings.RemindToOwnerCaption"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoicePageRemindControlBlock",
					"propertyName": "items",
					"name": "RemindToOwnerDate",
					"values": {
						"bindTo": "RemindToOwnerDate",
						"layout": {
							"column": 12,
							"row": 0,
							"colSpan": 12
						},
						"labelConfig": {
							"caption": {"bindTo": "Resources.Strings.RemindDateCaption"}
						},
						"controlConfig": {
							"enabled": {"bindTo": "RemindToOwner"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoiceFileNotesTab",
					"propertyName": "items",
					"name": "Files",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"name": "InvoiceNotesControlGroup",
					"parentName": "InvoiceFileNotesTab",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": {"bindTo": "Resources.Strings.NotesGroupCaption"},
						"controlConfig": {
							"collapsed": false
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "InvoiceNotesControlGroup",
					"propertyName": "items",
					"name": "Notes",
					"values": {
						"contentType": Terrasoft.ContentType.RICH_TEXT,
						"layout": {"column": 0, "row": 0, "colSpan": 24},
						"labelConfig": {
							"visible": false
						},
						"controlConfig": {
							"imageLoaded": {
								"bindTo": "insertImagesToNotes"
							},
							"images": {
								"bindTo": "NotesImagesCollection"
							}
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('InvoicePageV2OrderResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("InvoicePageV2Order", [],
	function() {
		return {
				entitySchemaName: "Invoice",
				details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "Order",
						"values": {
							"bindTo": "Order",
							"layout": {"column": 12, "row": 1, "colSpan": 12},
							"tip": {
								"content": {"bindTo": "Resources.Strings.OrderTip"}
							}
						}
					}
				]/**SCHEMA_DIFF*/
			};
	});

define('InvoicePageV2ContractInInvoiceResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("InvoicePageV2ContractInInvoice", ["BusinessRuleModule"],
		function(BusinessRuleModule) {
			return {
				entitySchemaName: "Invoice",
				attributes: {
					"Client": {
						dependencies: [
							{
								columns: ["Contract"],
								methodName: "initMultiLookup"
							}
						]
					}
				},
				details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
				methods: {},
				rules: {
					"Contract": {
						"FiltrationContractByAccount": {
							"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
							"autocomplete": true,
							"autoClean": true,
							"baseAttributePatch": "Account",
							"comparisonType": Terrasoft.ComparisonType.EQUAL,
							"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							"attribute": "Account"
						},
						"FiltrationContractByContact": {
							"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
							"autoClean": true,
							"baseAttributePatch": "Contact",
							"comparisonType": Terrasoft.ComparisonType.EQUAL,
							"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							"attribute": "Contact"
						}
					}
				},
				diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
			};
		});

define('InvoicePageV2PassportResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("InvoicePageV2Passport", ["BusinessRuleModule", "InvoiceConfigurationConstants"],
	function(BusinessRuleModule, InvoiceConfigurationConstants) {
		return {
			entitySchemaName: "Invoice",
			methods: {
				/**
				 * @inheritDoc Terrasoft.BasePageV2#onEntityInitialized
				 * @overridden
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					this.readSupplyPaymentElement();
				},

				/**
				 * ##### #### ### ####### ######## # #####, ######### # ####### ######.
				 * @param {Function} callback ##### ######### ######.
				 * @param {Object} scope ######## ##########.
				 * @private
				 */
				readSupplyPaymentElement: function(callback, scope) {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "SupplyPaymentElement",
						rowCount: 1
					});
					esq.addColumn("Id");
					esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Invoice", this.get("Id")));
					esq.getEntityCollection(function(response) {
						var element = null;
						var collection = response.collection;
						if (collection && collection.getCount()) {
							var item = collection.getByIndex(0);
							element = {value: item.get("Id")};
						}
						this.set("SupplyPaymentElement", element);
						if (callback) {
							callback.call(scope || this);
						}
					}, this);
				},

				/**
				 * @inheritDoc Terrasoft.BasePageV2#save
				 * @overridden
				 */
				save: function(config) {
					if (!this.get("IsCancel")) {
						this.needToCancelInvoice(function(result) {
							if (result) {
								this.set("IsCancel", true);
								this.save(config);
							}
						}, this);
					} else {
						this.set("IsCancel", false);
						this.callParent(arguments);
					}

				},

				/**
				 * ########## #### # ######## # ####### ##### ## #### ####.
				 * @protected
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} scope ######## ######### ######.
				 */
				needToCancelInvoice: function(callback, scope) {
					var supplyPaymentElement = this.get("SupplyPaymentElement");
					var paymentStatus = this.get("PaymentStatus") || {};
					var isCancel = this.get("IsCancel");
					if (paymentStatus.value === InvoiceConfigurationConstants.Invoice.PaymentStatus.Canceled &&
							supplyPaymentElement && !isCancel) {
						this.showConfirmationDialog(this.get("Resources.Strings.CleanupSupplyPaymentElement"),
							function(dialogResult) {
								if (dialogResult === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
									callback.call(scope, true);
								} else {
									callback.call(scope, false);
								}
							},
							["yes", "no"]
						);
					} else {
						callback.call(scope, true);
					}
				},

				/**
				 * @inheritDoc Terrasoft.BasePageV2#saveEntityInChain
				 * @overridden
				 */
				saveEntityInChain: function(next) {
					var callback = next;
					if (this.get("SupplyPaymentElement")) {
						callback = this.readSupplyPaymentElement.bind(this, next);
					}
					this.callParent([callback]);
				}
			},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	}
);

define("InvoicePageV2", ["BusinessRuleModule"],
	function(BusinessRuleModule) {
		return {
			entitySchemaName: "Invoice",
			methods: {
				/**
				 * @inheritdoc Terrasoft.BasePageV2#init
				 * @overridden
				 */
				init: function() {
					this.on("change:Opportunity", this.initMultiLookup, this);
					this.callParent(arguments);
				}
			},
			rules: {
				"Opportunity": {
					"FiltrationOpportunityByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Account",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					},
					"FiltrationOpportunityByContact": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Contact",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Contact"
					}
				}
			},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});


