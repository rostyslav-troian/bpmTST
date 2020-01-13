Terrasoft.configuration.Structures["BaseOrderPage"] = {innerHierarchyStack: ["BaseOrderPageOrder", "BaseOrderPageDocumentInOrder", "BaseOrderPagePassport", "BaseOrderPageOrderLead", "BaseOrderPage"], structureParent: "BaseModulePageV2"};
define('BaseOrderPageOrderStructure', ['BaseOrderPageOrderResources'], function(resources) {return {schemaUId:'041fd481-1807-46f4-ac35-6c99c34ae552',schemaCaption: "Base Order page", parentSchemaName: "BaseModulePageV2", schemaName:'BaseOrderPageOrder',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseOrderPageDocumentInOrderStructure', ['BaseOrderPageDocumentInOrderResources'], function(resources) {return {schemaUId:'3a3ee830-1f0d-4674-ae97-6110c9431781',schemaCaption: "Base Order page", parentSchemaName: "BaseOrderPageOrder", schemaName:'BaseOrderPageDocumentInOrder',parentSchemaUId:'041fd481-1807-46f4-ac35-6c99c34ae552',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseOrderPageOrder",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseOrderPagePassportStructure', ['BaseOrderPagePassportResources'], function(resources) {return {schemaUId:'2d8f6fa0-4040-46d5-b10f-d9163711520d',schemaCaption: "Base Order page", parentSchemaName: "BaseOrderPageDocumentInOrder", schemaName:'BaseOrderPagePassport',parentSchemaUId:'3a3ee830-1f0d-4674-ae97-6110c9431781',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseOrderPageDocumentInOrder",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseOrderPageOrderLeadStructure', ['BaseOrderPageOrderLeadResources'], function(resources) {return {schemaUId:'1a9a983f-78b9-43a3-aa7b-42d92da42bc0',schemaCaption: "Base Order page", parentSchemaName: "BaseOrderPagePassport", schemaName:'BaseOrderPageOrderLead',parentSchemaUId:'2d8f6fa0-4040-46d5-b10f-d9163711520d',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseOrderPagePassport",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseOrderPageStructure', ['BaseOrderPageResources'], function(resources) {return {schemaUId:'052c6cf4-d1d4-4b90-b1c8-803e3f6d2044',schemaCaption: "Base Order page", parentSchemaName: "BaseOrderPageOrderLead", schemaName:'BaseOrderPage',parentSchemaUId:'1a9a983f-78b9-43a3-aa7b-42d92da42bc0',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseOrderPageOrderLead",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseOrderPageOrderResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseOrderPageOrder", ["ProductSalesUtils", "OrderConfigurationConstants", "BusinessRuleModule", "MoneyModule", 
		"ProductEntryPageUtils", "MultiCurrencyEdit", "MultiCurrencyEditUtilities", "EntityProductCountMixin"],
	function(ProductSalesUtils, OrderConfigurationConstants, BusinessRuleModule, MoneyModule) {
		return {
			entitySchemaName: "Order",
			messages: {
				/**
				 * @message GetOrderProductSummary
				 * ########### ########## ### ###### ###### "########".
				 */
				"GetOrderProductSummary": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message UpdateOrderProductSummary
				 * ########## ###### ###### "########".
				 */
				"UpdateOrderProductSummary": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetIsDeliveryAddressDetailVisible
				 * ########### ######### ###### "##### ########".
				 */
				"GetIsDeliveryAddressDetailVisible": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message SetActiveAddress
				 * ############ ### ######### ######### ###### # #######.
				 */
				"SetActiveAddress": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message UpdateOrderAddress
				 * ############ ### ########## ######### ###### ### ###### ######## # ######.
				 */
				"UpdateOrderAddress": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message OnCurrencyChanged
				 * Message on currency changed.
				 */
				"OnCurrencyChanged": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {
				"Status": {
					"lookupListConfig": {
						"orders": [{columnPath: "Position"}]
					},
					"dependencies": [
						{
							"columns": ["Status"],
							"methodName": "onOrderStatusChanged"
						}
					]
				},

				"PaymentStatus": {
					"lookupListConfig": {
						orders: [{columnPath: "Position"}]
					}
				},

				"DeliveryStatus": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					"lookupListConfig": {
						orders: [{columnPath: "Position"}]
					}
				},

				"DeliveryType": {
					dependencies: [
						{
							columns: ["DeliveryType"],
							methodName: "updateDeliveryAddresses"
						}
					]
				},

				"SourceOrder": {
					"lookupListConfig": {
						orders: [{columnPath: "Name"}]
					}
				},

				/**
				 * ######
				 */
				"Currency": {
					dataValueType: Terrasoft.DataValueType.ENUM,
					lookupListConfig: {
						columns: ["Division", "ShortName", "Symbol"]
					}
				},

				"CurrencyRate": {
					dataValueType: Terrasoft.DataValueType.FLOAT,
					onChange: "onCurrencyRateChange",
					dependencies: [
						{
							columns: ["Currency"],
							methodName: "onCurrencyChanged"
						}
					]
				},

				/**
				 * Currency rate list.
				 */
				"CurrencyRateList": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION,
					value: this.Ext.create("Terrasoft.Collection")
				},

				/**
				 * Currency button menu list.
				 */
				"CurrencyButtonMenuList": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION,
					value: this.Ext.create("Terrasoft.BaseViewModelCollection")
				},

				/**
				 * Payment amount in primary currency.
				 */
				"PrimaryPaymentAmount": {
					dataValueType: Terrasoft.DataValueType.FLOAT
				},

				"ActualDate": {
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					dependencies: [
						{
							columns: ["PaymentStatus", "DeliveryStatus", "Date"],
							methodName: "setClosedOrder"
						}
					]
				},

				/**
				 * Execution date.
				 */
				"Date": {
					dataValueType: Terrasoft.DataValueType.DATE_TIME
				},

				"ClientUpdateDeliveryAddresses": {
					dependencies: [
						{
							columns: ["Account", "Contact"],
							methodName: "updateDeliveryAddresses"
						}
					]
				},

				"AmountAndCurrency": {
					dependencies: [
						{
							columns: ["Amount", "Currency"],
							methodName: "updateOrderProductSummary"
						}
					]
				},

				"Client": {
					"caption": {"bindTo": "Resources.Strings.Client"},
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"multiLookupColumns": ["Contact", "Account"],
					"isRequired": true
				},

				/**
				 * Flag of payment amount is larger than
				 * planned amount.
				 */
				"IsPaymentAmountLargerThanAmount": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false,
					dependencies: [
						{
							columns: ["PaymentAmount", "Amount"],
							methodName: "setIsPaymentAmountLargerThanAmount"
						}
					]
				}
			},
			properties: {
				moneyModule: null
			},
			details: /**SCHEMA_DETAILS*/{
				Files: {
					schemaName: "FileDetailV2",
					entitySchemaName: "OrderFile",
					filter: {
						masterColumn: "Id",
						detailColumn: "Order"
					}
				},
				ProductInProductsTab: {
					schemaName: "OrderProductDetailV2",
					entitySchemaName: "OrderProduct",
					filter: {
						masterColumn: "Id",
						detailColumn: "Order"
					},
					subscriber: {methodName: "refreshAmount"},
					defaultValues: {
						Currency: {masterColumn: "Currency"},
						CurrencyRate: {masterColumn: "CurrencyRate"}
					}
				},
				ProductInResultsTab: {
					schemaName: "OrderProductDetailV2",
					entitySchemaName: "OrderProduct",
					filter: {
						masterColumn: "Id",
						detailColumn: "Order"
					},
					subscriber: {methodName: "refreshAmount"},
					defaultValues: {
						Currency: {masterColumn: "Currency"},
						CurrencyRate: {masterColumn: "CurrencyRate"}
					}
				},
				DeliveryAddressDetail: {
					schemaName: "AddressSelectionDetailV2",
					defaultValues: {
						"ContactId": {masterColumn: "Contact"},
						"AccountId": {masterColumn: "Account"},
						"DeliveryAddress": {masterColumn: "DeliveryAddress"}
					}
				},
				AddressSelectionDetailResultsTab: {
					schemaName: "AddressSelectionResultDetailV2",
					defaultValues: {
						"ContactId": {masterColumn: "Contact"},
						"AccountId": {masterColumn: "Account"},
						"DeliveryAddress": {masterColumn: "DeliveryAddress"}
					}
				}
			}/**SCHEMA_DETAILS*/,
			mixins: {
				ProductEntryPageUtils: "Terrasoft.ProductEntryPageUtils",

				/**
				 * ###### ########## ################# # ######## ##############.
				 */
				MultiCurrencyEditUtilities: "Terrasoft.MultiCurrencyEditUtilities",

				/**
				 * Mixin for products count by entity.
				 */
				EntityProductCountMixin: "Terrasoft.EntityProductCountMixin"
			},
			methods: {
				init: function() {
					this.callParent(arguments);
					this.moneyModule = MoneyModule;
				},

				/**
				 * ############ ######## #### ## ##.
				 */
				refreshAmount: function() {
					this.updateAmount(function() {
						this.updateOrderProductSummary();
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#activeTabChange
				 * @overridden
				 */
				activeTabChange: function(activeTab) {
					this.callParent(arguments);
					var tabName = activeTab.get("Name");
					if (tabName === "OrderProductTab") {
						this.updateDetail({detail: "ProductInProductsTab"});
					} else if (tabName === "OrderResultsTab") {
						this.updateDetail({detail: "ProductInResultsTab"});
					}
				},

				/**
				 * # ########### ## #### ######## ##########/######## ###### ###### ########.
				 * @private
				 */
				getDeliveryAddressVisible: function() {
					var deliveryType = this.get("DeliveryType");
					return deliveryType &&
						(deliveryType.value === OrderConfigurationConstants.Order.DeliveryType.Courier);
				},

				/**
				 * ############# ############# ########### #######.
				 * @protected
				 */
				initContextHelp: function() {
					this.set("ContextHelpId", 1055);
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
				 * @overridden
				 */
				onEntityInitialized: function() {
					this.setIncrementCode();
					this.callParent(arguments);
					this.mixins.MultiCurrencyEditUtilities.init.call(this);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#getIncrementColumn
				 * @overridden
				 */
				getIncrementColumn: function() {
					return "Number";
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#asyncValidate
				 * @overridden
				 */
				asyncValidate: function(callback, scope) {
					this.callParent([function(response) {
						if (!this.validateResponse(response)) {
							return;
						}
						this.Terrasoft.chain(
							function(next) {
								this.validateAccountOrContactFilling(function(response) {
									if (this.validateResponse(response)) {
										next();
									}
								}, this);
							},
							this.validatePaymentStatus,
							function(next) {
								callback.call(scope, response);
								next();
							}, this);
					}, this]);
				},

				/**
				 * ######### ##########
				 * @inheritdoc Terrasoft.BasePageV2ViewModel#setValidationConfig
				 * @overridden
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("ActualDate", this.validateDate);
					this.addColumnValidator("DueDate", this.validateDate);
					this.addColumnValidator("Date", this.validateDate);
				},

				/**
				 * ####### ######### ####### "####", "#### ##########", "######## #### ##########".
				 * #### ########## # ######## #### ## ##### #### ###### #### ######
				 * @return {{fullInvalidMessage: string, invalidMessage: string}}
				 */
				validateDate: function() {
					var actualDate = Terrasoft.deepClone(this.get("ActualDate"));
					var dueDate = Terrasoft.deepClone(this.get("DueDate"));
					var date = Terrasoft.deepClone(this.get("Date"));
					var invalidMessage = "";
					if (dueDate && date && dueDate.setHours(0, 0, 0, 0) < date.setHours(0, 0, 0, 0)) {
						invalidMessage = this.get("Resources.Strings.DateLessDueDate");
					}
					if (actualDate && date && actualDate.setHours(0, 0, 0, 0) < date.setHours(0, 0, 0, 0)) {
						invalidMessage = this.get("Resources.Strings.DateLessActualDate");
					}
					return {
						fullInvalidMessage: invalidMessage,
						invalidMessage: invalidMessage
					};
				},

				/**
				 * ####### ######### ####### "##### ######".
				 * ##### ###### ###### ## ##### #### ###### ##### ######.
				 * @return {{fullInvalidMessage: string, invalidMessage: string}}
				 */
				validatePaymentAmount: function() {
					var paymentAmount = this.get("PaymentAmount");
					var amount = this.get("Amount");
					var invalidMessage = "";
					if (paymentAmount < 0) {
						invalidMessage = this.get("Resources.Strings.ValidatePaymentAmountNegative");
					} else if ((!amount && (paymentAmount > 0)) || (paymentAmount > amount)) {
						invalidMessage = this.get("Resources.Strings.ValidatePaymentAmount");
					}
					return {
						fullInvalidMessage: invalidMessage,
						invalidMessage: invalidMessage
					};
				},

				/**
				 * ######### ############ ##### "#######" ### "##########" ##########
				 * @param {Function} callback ####### ######### ######
				 * @param {Object} scope ########
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
				 * Handler for currency change. Updates currency rate value.
				 * @protected
				 */
				onCurrencyChanged: function() {
					this.set("ShowSaveButton", true);
					this.set("ShowDiscardButton", true);
					this.set("IsChanged", true, {silent: true});
					this.moneyModule.LoadCurrencyRate.call(this, "Currency", "CurrencyRate", this.get("StartDate"),
						this.recalculateAmountValues);
					this.sandbox.publish("OnCurrencyChanged");
				},

				/**
				 * Handler for currency rate change.
				 * @protected
				 * @virtual
				 */
				onCurrencyRateChange: function() {
					if (this.get("IsEntityInitialized")) {
						this.recalculateAmountValues();
					}
				},

				/**
				 * Updates amount and payment amount values using new currency rate value.
				 * @protected
				 */
				recalculateAmountValues: function() {
					var division = this.getCurrencyDivision();
					this.moneyModule.RecalcCurrencyValue.call(this, "CurrencyRate", "Amount", "PrimaryAmount", division);
					this.moneyModule.RecalcCurrencyValue.call(this, "CurrencyRate", "PaymentAmount",
						"PrimaryPaymentAmount", division);
				},

				/**
				 * Returns the division ratio.
				 * @protected
				 */
				getCurrencyDivision: function() {
					var currency = this.get("Currency");
					return currency && currency.Division;
				},

				/**
				 * Sets the order is close and checks the dates of the logic.
				 * @protected
				 */
				setClosedOrder: function() {
					if (!this.get("IsEntityInitialized")) {
						return;
					}
					var paymentStatus = this.get("PaymentStatus");
					var deliveryStatus = this.get("DeliveryStatus");
					if (paymentStatus && deliveryStatus &&
						(paymentStatus.value === OrderConfigurationConstants.Order.PaymentStatus.Paid) &&
						(deliveryStatus.value === OrderConfigurationConstants.Order.DeliveryStatus.Delivery)) {
						this.loadLookupDisplayValue("Status", OrderConfigurationConstants.Order.OrderStatus.Closed);
					}
				},

				/**
				 * Handles order status change.
				 * @protected
				 */
				onOrderStatusChanged: function() {
					var status = this.get("Status");
					if (status && (status.value === OrderConfigurationConstants.Order.OrderStatus.Closed)) {
						this.setActualDate();
					}
				},

				/**
				 * Sets actual date.
				 * @protected
				 */
				setActualDate: function() {
					var actualDate = this.get("ActualDate");
					var currentDateTime = this.getSysDefaultValue(Terrasoft.SystemValueType.CURRENT_DATE_TIME);
					if (this.Ext.isEmpty(actualDate)) {
						this.set("ActualDate", currentDateTime);
					}
				},

				/**
				 * Validates payment status and change if valid.
				 * @protected
				 * @param {Function} callback The callback function.
				 * @param {Object} scope Environment object callback function.
				 */
				validatePaymentStatus: function(callback, scope) {
					if (this.validate()) {
						var parameters = {
							columnNames: ["PaymentStatus"],
							callback: this.handleColumnRightsAvailability.bind(this, callback, scope)
						};
						this.checkColumnsEditRight.call(this, parameters);
					} else {
						callback.call(scope || this);
					}
				},

				/**
				 * Handles column rights availability.
				 * @private
				 * @param {Function} callback The callback function.
				 * @param {Object} scope Environment object callback function.
				 * @param {Object} columnRights Rights of column.
				 */
				handleColumnRightsAvailability: function(callback, scope, columnRights) {
					if (columnRights.PaymentStatus) {
						this.changePaymentStatus(callback, scope || this);
					} else {
						callback.call(scope || this);
					}
				},

				/**
				 * Changes payment status.
				 * @protected
				 * @param {Function} callback The callback function.
				 * @param {Object} scope Environment object callback function.
				 */
				changePaymentStatus: function(callback, scope) {
					var amount = this.get("Amount");
					var paymentAmount = this.get("PaymentAmount");
					if (amount && (amount > 0) && (amount === paymentAmount)) {
						this.loadLookupDisplayValue("PaymentStatus",
							OrderConfigurationConstants.Order.PaymentStatus.Paid, callback, scope);
					} else if (paymentAmount > 0) {
						this.loadLookupDisplayValue("PaymentStatus",
							OrderConfigurationConstants.Order.PaymentStatus.PartiallyPaid, callback, scope);
					} else {
						callback.call(scope || this);
					}
				},

				/**
				 * Set flag of payment amount is larger than amount.
				 * @protected
				 */
				setIsPaymentAmountLargerThanAmount: function() {
					var paymentAmount = this.get("PaymentAmount");
					var amount = this.get("Amount");
					var isLarger =
						this.isNotEmpty(paymentAmount) &&
						this.isNotEmpty(amount) &&
						(paymentAmount > amount);
					this.set("IsPaymentAmountLargerThanAmount", isLarger);
				},

				/**
				 * Postprocessing record is saved.
				 * @protected
				 * @virtual
				 */
				onSaved: function() {
					this.callParent(arguments);
					var config = arguments[arguments.length - 1];
					if (config && config.isSilent) {
						return;
					}
					this.updateAmountAfterSave("ProductInProductsTab",
						function() {
							this.updateDetail({detail: "ProductInResultsTab"});
							this.updateOrderProductSummary();
						},
						this
					);
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#loadEntity
				 * @overriden
				 */
				loadEntity: function(primaryColumnValue, callback, scope) {
					scope = scope || this;
					this.callParent([primaryColumnValue, function() {
						this.setIsPaymentAmountLargerThanAmount();
						this.setProductCount(primaryColumnValue, callback, scope);
					}, scope]);
				},

				/**
				 * @inheritdoc Terrasoft.EntityProductCountMixin#getProductCountInEntityColumnName
				 * @overriden
				 */
				getProductCountInEntityColumnName: function() {
					return "ProductCount";
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#setColumnValues
				 * @overridden
				 */
				setColumnValues: function(entity) {
					this.callParent(arguments);
					this.updateProductsCount(entity);
				},

				/**
				 * @inheritdoc Terrasoft.ProductEntryPageUtils#modifyAmountESQ
				 * @overridden
				 */
				modifyAmountESQ: function(esq) {
					this.mixins.ProductEntryPageUtils.modifyAmountESQ.apply(this, arguments);
					this.addProductsCountColumn(esq);
				},

				/**
				 * @inheritdoc Terrasoft.ProductEntryPageUtils#updateAmountColumnValues
				 * @overridden
				 */
				updateAmountColumnValues: function(entity) {
					this.mixins.ProductEntryPageUtils.updateAmountColumnValues.apply(this, arguments);
					this.updateProductsCount(entity);
				},

				/**
				 * ######### ####### # ########## ######### ###### # ######.
				 * @param {Terrasoft.EntitySchemaQuery} esq ###### # ####### ######.
				 */
				addProductsCountColumn: function(esq) {
					esq.addAggregationSchemaColumn("[OrderProduct:Order].Id",
						this.Terrasoft.AggregationType.COUNT, "ProductCount");
				},

				/**
				 * ######### ########## ######### # ######.
				 * @param {Terrasoft.BaseModel} entity ##### # ########## ###########.
				 */
				updateProductsCount: function(entity) {
					var countColumn = "ProductCount";
					this.setColumnValue(countColumn, entity.get(countColumn), {preventValidation: true});
				},

				/**
				 * ######### ############ ### ###### ## ###### "########".
				 * @return {Object} ############ ### ########## ###### ######.
				 */
				getProductSummaryConfig: function() {
					var currency = this.get("Currency") || {};
					return {
						count: this.get("ProductCount"),
						currency: currency.Symbol,
						amount: this.get("Amount")
					};
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					this.sandbox.subscribe("GetOrderProductSummary", this.getProductSummaryConfig, this,
						[this.getDetailId("ProductInProductsTab"), this.getDetailId("ProductInResultsTab")]);
					this.sandbox.subscribe("GetIsDeliveryAddressDetailVisible", this.getDeliveryAddressVisible, this,
						[this.getDetailId("DeliveryAddressDetail"),
							this.getDetailId("AddressSelectionDetailResultsTab")]);
					this.sandbox.subscribe("UpdateOrderAddress", this.onUpdateAddress, this,
						[this.getDetailId("DeliveryAddressDetail"),
							this.getDetailId("AddressSelectionDetailResultsTab")]);
				},

				/**
				 * Updates summaries on product detail.
				 */
				updateOrderProductSummary: function() {
					this.sandbox.publish("UpdateOrderProductSummary", null,
						[this.getDetailId("ProductInProductsTab"), this.getDetailId("ProductInResultsTab")]);
				},

				/**
				 * Updates address details.
				 */
				updateDeliveryAddresses: function() {
					this.updateDetail({detail: "DeliveryAddressDetail"});
					this.updateDetail({detail: "AddressSelectionDetailResultsTab"});
				},

				/**
				 * ############# ##### ######## ######.
				 * @private
				 * @param {Object} config ########## ### ########## ###### ########. ######## ######### #########:
				 * @param {String} config.senderId ############# ###### ####### ######## #########.
				 * @param {String} config.deliveryAddress ##### ########.
				 */
				onUpdateAddress: function(config) {
					var detailIds = [
						this.getDetailId("DeliveryAddressDetail"),
						this.getDetailId("AddressSelectionDetailResultsTab")
					];
					var position = detailIds.indexOf(config.senderId);
					detailIds.splice(position, 1);
					this.set("DeliveryAddress", config.deliveryAddress);
					this.sandbox.publish("SetActiveAddress", config.deliveryAddress, detailIds);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#openCardInChain
				 * @overridden
				 */
				openCardInChain: function(config) {
					if (config && !config.hasOwnProperty("OpenProductSelectionModule")) {
						return this.callParent(arguments);
					}
					return ProductSalesUtils.openProductSelectionModuleInChain(config, this.sandbox);
				},

				/**
				 * ######## ###### ######## #######.
				 * @overridden
				 * @return {[String]} ###### ######## #######.
				 */
				getDefQuickAddColumnNames: function() {
					var columns = this.callParent(arguments);
					columns.push("Account");
					return columns;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "TabsContainer",
					"values": {
						"wrapClass": ["order-tabs-container"]
					}
				},
				{
					"operation": "insert",
					"name": "OrderProductTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 0,
					"values": {
						"caption": {"bindTo": "Resources.Strings.OrderProduct"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "OrderDeliveryTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 2,
					"values": {
						"caption": {"bindTo": "Resources.Strings.OrderDelivery"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "OrderResultsTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 3,
					"values": {
						"caption": {"bindTo": "Resources.Strings.OrderResults"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderResultsTab",
					"propertyName": "items",
					"name": "ProductInResultsTab",
					"index": 0,
					"values": {"itemType": Terrasoft.ViewItemType.DETAIL}
				},
				{
					"operation": "insert",
					"parentName": "OrderResultsTab",
					"name": "OrderResultsDeliveryAndPaymentControlBlock",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": {"bindTo": "Resources.Strings.DeliveryAndPaymentGroupCaption"},
						"controlConfig": {"collapsed": false}
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderResultsDeliveryAndPaymentControlBlock",
					"propertyName": "items",
					"name": "OrderPageDeliveryAndPaymentBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderPageDeliveryAndPaymentBlock",
					"propertyName": "items",
					"name": "DeliveryTypeResult",
					"values": {
						"bindTo": "DeliveryType",
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"layout": {"column": 0, "row": 0, "colSpan": 12, "rowSpan": 1}
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderPageDeliveryAndPaymentBlock",
					"propertyName": "items",
					"name": "PaymentTypeResult",
					"values": {
						"bindTo": "PaymentType",
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"layout": {"column": 12, "row": 0, "colSpan": 12, "rowSpan": 1}
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderResultsTab",
					"propertyName": "items",
					"name": "AddressSelectionDetailResultsTab",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL,
						"visible": {"bindTo": "getDeliveryAddressVisible"}
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderResultsTab",
					"name": "OrderReceiverInformationResultsControlBlock",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {"bindTo": "Resources.Strings.OrderReceiverInformationGroupCaption"},
						"items": [],
						"controlConfig": {"collapsed": false}
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderReceiverInformationResultsControlBlock",
					"propertyName": "items",
					"name": "OrderReceiverInformationResultsBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderReceiverInformationResultsBlock",
					"propertyName": "items",
					"name": "ContactNumberResultsBlock",
					"values": {
						"bindTo": "ContactNumber",
						"layout": {"column": 0, "row": 0, "colSpan": 12, "rowSpan": 1}
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderReceiverInformationResultsBlock",
					"propertyName": "items",
					"name": "ReceiverNameResultsBlock",
					"values": {
						"bindTo": "ReceiverName",
						"layout": {"column": 0, "row": 1, "colSpan": 12, "rowSpan": 1}
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderReceiverInformationResultsBlock",
					"propertyName": "items",
					"name": "CommentResultsBlock",
					"values": {
						"bindTo": "Comment",
						"layout": {"column": 0, "row": 2, "colSpan": 12, "rowSpan": 1}
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderGeneralInformationTab",
					"propertyName": "items",
					"name": "OrderPageGeneralInformationBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": [],
						"collapseEmptyRow": true
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderPageGeneralInformationBlock",
					"propertyName": "items",
					"name": "Number",
					"values": {
						"bindTo": "Number",
						"layout": {"column": 0, "row": 0, "colSpan": 12, "rowSpan": 1},
						"enabled": false
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderPageGeneralInformationBlock",
					"propertyName": "items",
					"name": "Date",
					"values": {
						"bindTo": "Date",
						"layout": {"column": 12, "row": 0, "colSpan": 12, "rowSpan": 1},
						"dataValueType": Terrasoft.DataValueType.DATE
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderPageGeneralInformationBlock",
					"propertyName": "items",
					"name": "SourceOrder",
					"values": {
						"bindTo": "SourceOrder",
						"layout": {"column": 12, "row": 1, "colSpan": 12, "rowSpan": 1},
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
						"layout": {"column": 12, "row": 0, "colSpan": 11, "rowSpan": 1},
						"primaryAmount": "PrimaryAmount",
						"currency": "Currency",
						"rate": "CurrencyRate",
						"primaryAmountEnabled": false,
						"enabled": false,
						"generator": "MultiCurrencyEditViewGenerator.generate",
						"tip": {
							"content": {"bindTo": "Resources.Strings.AmountTip"}
						}
					},
					"index": 0
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "PaymentAmount",
					"values": {
						"bindTo": "PaymentAmount",
						"layout": {"column": 12, "row": 1, "colSpan": 11, "rowSpan": 1},
						"primaryAmount": "PrimaryPaymentAmount",
						"currency": "Currency",
						"rate": "CurrencyRate",
						"primaryAmountEnabled": false,
						"enabled": false,
						"tip": {
							"content": {"bindTo": "Resources.Strings.PaymentAmountTip"}
						},
						"generator": "MultiCurrencyEditViewGenerator.generate"
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "PaymentAmountInfoButton",
					"values": {
						"layout": { "column": 23, "row": 1, "colSpan": 1, "rowSpan": 1},
						"itemType": this.Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": {
							"bindTo": "Resources.Strings.ValidatePaymentAmount"
						},
						"controlConfig": {
							"visible": {"bindTo": "IsPaymentAmountLargerThanAmount"}
						},
						"style": Terrasoft.controls.ButtonEnums.style.RED
					},
					"index": 2
				},
				{
					"operation": "insert",
					"parentName": "OrderPageGeneralInformationBlock",
					"propertyName": "items",
					"name": "DueDate",
					"values": {
						"bindTo": "DueDate",
						"layout": {"column": 0, "row": 2, "colSpan": 12, "rowSpan": 1},
						"dataValueType": Terrasoft.DataValueType.DATE
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderPageGeneralInformationBlock",
					"propertyName": "items",
					"name": "ActualDate",
					"values": {
						"bindTo": "ActualDate",
						"layout": {"column": 12, "row": 2, "colSpan": 12, "rowSpan": 1},
						"dataValueType": Terrasoft.DataValueType.DATE
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderPageGeneralInformationBlock",
					"propertyName": "items",
					"name": "PaymentStatus",
					"values": {
						"bindTo": "PaymentStatus",
						"layout": {"column": 0, "row": 3, "colSpan": 12, "rowSpan": 1},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderPageGeneralInformationBlock",
					"propertyName": "items",
					"name": "DeliveryStatus",
					"values": {
						"bindTo": "DeliveryStatus",
						"layout": {"column": 12, "row": 3, "colSpan": 12, "rowSpan": 1},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderPageGeneralInformationBlock",
					"propertyName": "items",
					"name": "Owner",
					"values": {
						"bindTo": "Owner",
						"layout": {"column": 0, "row": 4, "colSpan": 12, "rowSpan": 1},
						"tip": {
							"content": {"bindTo": "Resources.Strings.OwnerTip"}
						}
					}
				},
				{
					"operation": "insert",
					"name": "OrderHistoryTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 4,
					"values": {
						"caption": {"bindTo": "Resources.Strings.OrderHistoryTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "OrderGeneralInformationTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 5,
					"values": {
						"caption": {"bindTo": "Resources.Strings.OrderGeneralInformationTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "FileNotesTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 7,
					"values": {
						"caption": {"bindTo": "Resources.Strings.FileNotes"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderHistoryTab",
					"name": "OrderPageHistoryTabContainer",
					"alias": {
						"name": "OrderHistoryTab"
					},
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderHistoryTab",
					"propertyName": "items",
					"name": "Document",
					"values": {"itemType": Terrasoft.ViewItemType.DETAIL}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Client",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 12, "rowSpan": 1},
						"tip": {
							"content": {"bindTo": "Resources.Strings.ClientTip"}
						},
						"controlConfig": {
							"enableLeftIcon": true,
							"leftIconConfig": {"bindTo": "getMultiLookupIconConfig"}
						}
					},
					"index": 1
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Status",
					"values": {
						"bindTo": "Status",
						"layout": {"column": 0, "row": 1, "colSpan": 12, "rowSpan": 1},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderProductTab",
					"propertyName": "items",
					"name": "ProductInProductsTab",
					"values": {"itemType": Terrasoft.ViewItemType.DETAIL}
				},
				{
					"operation": "insert",
					"parentName": "FileNotesTab",
					"propertyName": "items",
					"name": "Files",
					"values": {"itemType": Terrasoft.ViewItemType.DETAIL}
				},
				{
					"operation": "insert",
					"name": "NotesControlGroup",
					"parentName": "FileNotesTab",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": {"bindTo": "Resources.Strings.NotesGroupCaption"},
						"controlConfig": {"collapsed": false}
					}
				},
				{
					"operation": "insert",
					"parentName": "NotesControlGroup",
					"propertyName": "items",
					"name": "Notes",
					"values": {
						"contentType": Terrasoft.ContentType.RICH_TEXT,
						"layout": {"column": 0, "row": 0, "colSpan": 24, "rowSpan": 1},
						"labelConfig": {"visible": false},
						"controlConfig": {
							"imageLoaded": {"bindTo": "insertImagesToNotes"},
							"images": {"bindTo": "NotesImagesCollection"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderDeliveryTab",
					"name": "OrderDeliveryInformationControlBlock",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"controlConfig": {"collapsed": false}
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderDeliveryInformationControlBlock",
					"propertyName": "items",
					"name": "OrderDeliveryInformationBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderDeliveryInformationBlock",
					"propertyName": "items",
					"name": "DeliveryType",
					"values": {
						"bindTo": "DeliveryType",
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"layout": {"column": 0, "row": 0, "colSpan": 12, "rowSpan": 1}
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderDeliveryInformationBlock",
					"propertyName": "items",
					"name": "PaymentType",
					"values": {
						"bindTo": "PaymentType",
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"layout": {"column": 12, "row": 0, "colSpan": 12, "rowSpan": 1}
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderDeliveryTab",
					"propertyName": "items",
					"name": "DeliveryAddressDetail",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL,
						"visible": {"bindTo": "getDeliveryAddressVisible"}
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderDeliveryTab",
					"name": "OrderReceiverInformationControlBlock",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {"bindTo": "Resources.Strings.OrderReceiverInformationGroupCaption"},
						"items": [],
						"controlConfig": {"collapsed": false}
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderReceiverInformationControlBlock",
					"propertyName": "items",
					"name": "OrderReceiverInformationBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderReceiverInformationBlock",
					"propertyName": "items",
					"name": "ContactNumber",
					"values": {
						"bindTo": "ContactNumber",
						"layout": {"column": 0, "row": 0, "colSpan": 12, "rowSpan": 1}
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderReceiverInformationBlock",
					"propertyName": "items",
					"name": "ReceiverName",
					"values": {
						"bindTo": "ReceiverName",
						"layout": {"column": 0, "row": 1, "colSpan": 12, "rowSpan": 1}
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderReceiverInformationBlock",
					"propertyName": "items",
					"name": "Comment",
					"values": {
						"bindTo": "Comment",
						"layout": {"column": 0, "row": 2, "colSpan": 12, "rowSpan": 1}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('BaseOrderPageDocumentInOrderResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseOrderPageDocumentInOrder", ["ProductEntryPageUtils", "css!VisaHelper"],
	function() {
		return {
			entitySchemaName: "Order",
			details: /**SCHEMA_DETAILS*/{
				Document: {
					schemaName: "DocumentDetailV2",
					entitySchemaName: "Document",
					filter: {
						masterColumn: "Id",
						detailColumn: "Order"
					},
					defaultValues: {
						Account: {masterColumn: "Account"},
						Contact: {masterColumn: "Contact"}
					}
				}
			}/**SCHEMA_DETAILS*/,
			attributes: {},
			methods: {},
			rules: {},
			userCode: {},
			diff: /**SCHEMA_DIFF*/[
			]/**SCHEMA_DIFF*/
		};
	});

define('BaseOrderPagePassportResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseOrderPagePassport", ["OrderConfigurationConstants", "ConfigurationEnums", "OrderUtilities"],
	function(OrderConfigurationConstants, ConfigurationEnums) {
		return {
			entitySchemaName: "Order",
			messages: {

				/**
				 * ############ ### ######### ##### ######.
				 */
				"GetOrderAmount": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			mixins: {
				OrderUtilities: "Terrasoft.OrderUtilities"
			},
			details: /**SCHEMA_DETAILS*/{
				SupplyPayment: {
					schemaName: "SupplyPaymentDetailV2",
					entitySchemaName: "SupplyPaymentElement",
					filter: {
						masterColumn: "Id",
						detailColumn: "Order"
					},
					defaultValues: {
						Currency: {
							masterColumn: "Currency"
						},
						CurrencyRate: {
							masterColumn: "CurrencyRate"
						}
					},
					subscriber: {methodName: "refreshAmount"}
				},
				SupplyPaymentResults: {
					schemaName: "SupplyPaymentDetailV2",
					entitySchemaName: "SupplyPaymentElement",
					filter: {
						masterColumn: "Id",
						detailColumn: "Order"
					},
					defaultValues: {
						Currency: {
							masterColumn: "Currency"
						},
						CurrencyRate: {
							masterColumn: "CurrencyRate"
						}
					},
					subscriber: {methodName: "refreshAmount"}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "OrderPassportTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 1,
					"values": {
						"caption": {"bindTo": "Resources.Strings.OrderPassport"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderPassportTab",
					"propertyName": "items",
					"name": "SupplyPayment",
					"values": {"itemType": Terrasoft.ViewItemType.DETAIL}
				},
				{
					"operation": "insert",
					"parentName": "OrderResultsTab",
					"propertyName": "items",
					"name": "SupplyPaymentResults",
					"index": 1,
					"values": {"itemType": Terrasoft.ViewItemType.DETAIL}
				}
			]/**SCHEMA_DIFF*/,
			methods: {
				/**
				 * @inheritdoc Terrasoft.Configuration.BasePageV2#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.initValidateActions();
				},

				/**
				 * ############# #######.
				 * @protected
				 */
				initValidateActions: function() {
					this.save = this.needToChangeInvoice({
						getId: function() {
							return this.get("Id");
						},
						name: "Order",
						validateColumns: ["Currency"]
					}, this.save, this);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#activeTabChange
				 * @overridden
				 */
				activeTabChange: function(activeTab) {
					this.callParent(arguments);
					var tabName = activeTab.get("Name");
					if (tabName === "OrderPassportTab") {
						this.updateDetail({detail: "SupplyPayment"});
					} else if (tabName === "OrderResultsTab") {
						this.updateDetail({detail: "SupplyPaymentResults"});
					}
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					var detailIds = [this.getDetailId("SupplyPayment"), this.getDetailId("SupplyPaymentResults")];
					this.sandbox.subscribe("GetOrderAmount", this.onGetOrderAmount, this, detailIds);
				},

				/**
				 * ############ ######### GetOrderAmount.
				 * @public
				 */
				onGetOrderAmount: function() {
					return this.get("Amount");
				},

				/**
				 * @inheritdoc Terrasoft.OrderPageV2#modifyAmountESQ
				 * @overridden
				 */
				modifyAmountESQ: function(esq) {
					this.callParent(arguments);
					esq.addColumn("PaymentAmount");
					esq.addColumn("PrimaryPaymentAmount");
				},

				/**
				 * @inheritdoc Terrasoft.OrderPageV2#updateAmountColumnValues
				 * @overridden
				 */
				updateAmountColumnValues: function(entity) {
					this.callParent(arguments);
					var updatedPaymentAmount = entity.get("PaymentAmount");
					var updatedPrimaryPaymentAmount = entity.get("PrimaryPaymentAmount");
					if (updatedPaymentAmount !== this.get("PaymentAmount") ||
						updatedPrimaryPaymentAmount !== this.get("PrimaryPaymentAmount")) {
						this.set("PaymentAmount", updatedPaymentAmount);
						this.set("PrimaryPaymentAmount", updatedPrimaryPaymentAmount);
					}
				},

				/**
				 * ######### ####### "######".
				 * @obsolete
				 */
				validateOrderStatus: function(callback, scope) {
					this.log(this.Ext.String.format(this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
						"validateOrderStatus", "asyncValidate"));
					callback.call(scope || this, {success: true});
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onSaved
				 * @overriden
				 */
				onSaved: function() {
					var operation = this.get("Operation");
					if (operation === ConfigurationEnums.CardStateV2.EDIT) {
						this.updateDetail({detail: "SupplyPayment"});
						this.updateDetail({detail: "SupplyPaymentResults"});
					}
					this.callParent(arguments);
				}
			}
		};
	});

define('BaseOrderPageOrderLeadResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseOrderPageOrderLead", ["BaseOrderPageResources", "LeadConfigurationConst", "OrderConfigurationConstants",
		"CreateLeadForEntityUtilities"],
	function(response, LeadConfigurationConst, OrderConfigurationConstants) {
		return {
			entitySchemaName: "Order",
			details: /**SCHEMA_DETAILS*/{
				"Lead": {
					"schemaName": "LeadDetailV2",
					"entitySchemaName": "Lead",
					"filter": {
						"detailColumn": "Order",
						"masterColumn": "Id"
					},
					defaultValues: {
						QualifiedAccount: {masterColumn: "Account"},
						QualifiedContact: {masterColumn: "Contact"}
					}
				}
			}/**SCHEMA_DETAILS*/,
			mixins: {
				CreateLeadForEntityUtilities: "Terrasoft.CreateLeadForEntityUtilities"
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @overridden
				 */
				init: function() {
					this.mixins.CreateLeadForEntityUtilities.init.call(this);
					this.callParent(arguments);
				},

				/**
				 * @inheritDoc Terrasoft.CreateLeadForEntityUtilities#addQueryColumns
				 * @overridden
				 */
				addQueryColumns: function(insert) {
					var account = this.get("Account");
					if (account) {
						var accountId = account.value;
						insert.setParameterValue("QualifiedAccount",
							accountId, Terrasoft.DataValueType.GUID);
					}
					var contact = this.get("Contact");
					if (contact) {
						var contactId = contact.value;
						insert.setParameterValue("QualifiedContact",
							contactId, Terrasoft.DataValueType.GUID);
					}
					insert.setParameterValue("QualifyStatus",
						LeadConfigurationConst.LeadConst.QualifyStatus.WaitingForSale,
						Terrasoft.DataValueType.GUID);
					insert.setParameterValue("LeadTypeStatus",
						LeadConfigurationConst.LeadConst.LeadTypeStatus.ReadyToSale,
						Terrasoft.DataValueType.GUID);
					insert.setParameterValue("RegisterMethod",
						LeadConfigurationConst.LeadConst.LeadRegisterMethod.AddedManual,
						Terrasoft.DataValueType.GUID);
				},

				/**
				 * @inheritDoc Terrasoft.BasePageV2#saveEntityInChain
				 * @overridden
				 */
				saveEntityInChain: function(next) {
					var callback =  next;
					var opportunity = this.get("Opportunity");
					if (this.Ext.isEmpty(opportunity)) {
						callback = this.createLeadAfterSave.bind(this, next);
					}
					this.callParent([callback]);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onSaved
				 * @overridden
				 */
				onSaved: function(response) {
					var isSuccess = this.validateResponse(response);
					this.callParent(arguments);
					if (isSuccess) {
						this.updateLeadsStatus();
					}
				},

				/**
				 * Updates status of leads.
				 */
				updateLeadsStatus: function() {
					var update = this.Ext.create("Terrasoft.UpdateQuery", {
						rootSchemaName: "Lead"
					});
					this.setParametersLeadStatus(update);
					update.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Order", this.get("Id")));
					update.execute(function(response) {
						this.validateResponse(response);
					}, this);
				},

				/**
				 * Sets parameters for update query.
				 * @param {Terrasoft.UpdateQuery} update "Lead" schema update query.
				 */
				setParametersLeadStatus: function(update) {
					var state = this.get("Status");
					switch (state.value) {
						case OrderConfigurationConstants.Order.OrderStatus.Canceled:
							update.setParameterValue("QualifyStatus",
								LeadConfigurationConst.LeadConst.QualifyStatus.Distribution,
								this.Terrasoft.DataValueType.GUID);
							break;
						case OrderConfigurationConstants.Order.OrderStatus.Closed:
							update.setParameterValue("QualifyStatus",
								LeadConfigurationConst.LeadConst.QualifyStatus.Satisfied,
								this.Terrasoft.DataValueType.GUID);
							update.setParameterValue("LeadTypeStatus",
								LeadConfigurationConst.LeadConst.LeadTypeStatus.Satisfied,
								this.Terrasoft.DataValueType.GUID);
							break;
					}
				}

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "Lead",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					},
					"parentName": "OrderHistoryTab",
					"propertyName": "items",
					"index": 0
				}
			]/**SCHEMA_DIFF*/,
			rules: {},
			userCode: {}
		};
	});

define("BaseOrderPage", ["BusinessRuleModule"],
	function(BusinessRuleModule) {
		return {
			entitySchemaName: "Order",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
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
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "OrderPageGeneralInformationBlock",
					"propertyName": "items",
					"name": "Opportunity",
					"values": {
						"bindTo": "Opportunity",
						"layout": {"column": 0, "row": 1, "colSpan": 12, "rowSpan": 1},
						"tip": {
							"content": {"bindTo": "Resources.Strings.OpportunityTip"}
						}
					},
					"index": 2
				}
			]/**SCHEMA_DIFF*/,
			rules: {
				"Opportunity": {
					"FiltrationOpportunityByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"baseAttributePatch": "Account",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					},
					"FiltrationOpportunityByContact": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"baseAttributePatch": "Contact",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Contact"
					}
				}
			}
		};
	});


