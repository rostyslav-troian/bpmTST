Terrasoft.configuration.Structures["SupplyPaymentPageV2"] = {innerHierarchyStack: ["SupplyPaymentPageV2Passport", "SupplyPaymentPageV2"], structureParent: "BaseSupplyPaymentItemPageV2"};
define('SupplyPaymentPageV2PassportStructure', ['SupplyPaymentPageV2PassportResources'], function(resources) {return {schemaUId:'23bdc7ad-2987-497c-882d-5001c596c686',schemaCaption: "Installment plan page", parentSchemaName: "BaseSupplyPaymentItemPageV2", schemaName:'SupplyPaymentPageV2Passport',parentSchemaUId:'66bb5893-cb1c-4fc6-aa60-2f0536b33df4',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SupplyPaymentPageV2Structure', ['SupplyPaymentPageV2Resources'], function(resources) {return {schemaUId:'0264b3f2-3367-49f8-b40e-627be3a736cd',schemaCaption: "Installment plan page", parentSchemaName: "SupplyPaymentPageV2Passport", schemaName:'SupplyPaymentPageV2',parentSchemaUId:'23bdc7ad-2987-497c-882d-5001c596c686',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SupplyPaymentPageV2Passport",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SupplyPaymentPageV2PassportResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SupplyPaymentPageV2Passport", ["terrasoft", "BusinessRuleModule", "ConfigurationConstants",
		"SupplyPaymentGridButtonsUtility", "ConfigurationEnums", "LookupUtilities",
		"SupplyPaymentProductDetailModalBox", "OrderUtilities", "MoneyUtilsMixin"],
	function(Terrasoft, BusinessRuleModule, ConfigurationConstants, GridButtonsUtil) {
		return {
			entitySchemaName: "SupplyPaymentElement",
			messages: {
				/**
				 * ########## ######## ##### ##### ######### ###### ## ###### ########.
				 */
				"UpdateAmountPlan": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message CreateSupplyPaymentInvoice
				 * Create invoice for supply payment.
				 */
				"CreateSupplyPaymentInvoice": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.BIDIRECTIONAL
				}
			},
			mixins: {
				OrderUtilities: "Terrasoft.OrderUtilities",
				MoneyUtilities: "Terrasoft.MoneyUtilsMixin"
			},
			attributes: {
				/**
				 * ######### ######.
				 */
				"Currency": {
					caption: {"bindTo": "Resources.Strings.Currency"},
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					referenceSchemaName: "Currency"
				},

				/**
				 * ####.
				 */
				"CurrencyRate": {
					caption: {"bindTo": "Resources.Strings.CurrencyRate"},
					dataValueType: this.Terrasoft.DataValueType.FLOAT
				},

				/**
				 * ##### #### # #.#.
				 */
				"PrimaryAmountPlan": {
					dependencies: [{
						columns: ["AmountPlan", "CurrencyRate"],
						methodName: "recalculatePrimaryAmountPlan"
					}]
				},

				/**
				 * ##### #### # #.#.
				 */
				"PrimaryAmountFact": {
					dependencies: [{
						columns: ["AmountFact", "CurrencyRate"],
						methodName: "recalculatePrimaryAmountFact"
					}]
				},

				/**
				 * ########### ##### AmountPlan # Percentage.
				 */
				"AmountPlanEnabled": {
					type: this.Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					value: true
				},

				/**
				 * Availability of Invoice field.
				 */
				"InvoiceEnabled": {
					type: this.Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					value: true
				},

				/**
				 * ########.
				 */
				"Name": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					dependencies: [
						{
							columns: ["Type"],
							methodName: "onTypeChanged"
						}
					]
				},

				/**
				 * ########, ####.
				 */
				"Delay": {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					dependencies: [
						{
							columns: ["DatePlan"],
							methodName: "onDatePlanChanged"
						}
					]
				},

				/**
				 * ######## ####.
				 */
				"DatePlan": {
					dependencies: [
						{
							columns: ["DelayType"],
							methodName: "onDelayTypeChanged"
						},
						{
							columns: ["Delay"],
							methodName: "onDelayChanged"
						}
					]
				},

				/**
				 * ########### ####.
				 */
				"DateFact": {
					dependencies: [
						{
							columns: ["State"],
							methodName: "onStateChanged"
						}
					]
				},

				/**
				 * ### ####.
				 */
				"Type": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					isRequired: true
				},

				/**
				 * #########.
				 */
				"State": {
					dependencies: [
						{
							columns: ["DateFact"],
							methodName: "onDateFactChanged"
						}
					]
				},

				/**
				 * ######## #####.
				 */
				"AmountPlan": {
					dependencies: [
						{
							columns: ["Type"],
							methodName: "onTypeChanged"
						},
						{
							columns: ["Percentage"],
							methodName: "onPercentageChanged"
						}
					]
				},

				/**
				 * ####, %.
				 */
				"Percentage": {
					dependencies: [
						{
							columns: ["AmountPlan"],
							methodName: "onAmountPlanChanged"
						}
					]
				},

				/**
				 * ###### ## ######### #######.
				 */
				"PreviousElement": {
					lookupListConfig: {
						hideActions: true,
						columns: ["DatePlan", "DateFact", "State"],
						filters: [
							function() {
								return this.Terrasoft.createColumnFilterWithParameter(
									this.Terrasoft.ComparisonType.NOT_EQUAL, "Id", this.get("Id"));
							}
						]
					},
					dependencies: [
						{
							columns: ["PreviousElement"],
							methodName: "onPreviousElementChanged"
						}
					]
				},

				/**
				 * ##### ##### ##### # ##### "########".
				 */
				"SupplyAmount": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.FLOAT
				},

				/**
				 * ##### ##### ##### # ##### "######".
				 */
				"PaymentAmount": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.FLOAT
				},

				/**
				 * ######## #### ########## ####.
				 */
				"LinkedDatePlan": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.DATE
				},

				/**
				 * ########### #### ########## ####.
				 */
				"LinkedDateFact": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.DATE
				},

				/**
				 * ######### ########## ####.
				 */
				"LinkedState": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.ENUM
				},

				/**
				 * ########## ######### # ####### ####.
				 */
				"ProductsCount": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					dataValueType: Terrasoft.DataValueType.INTEGER
				},

				/**
				 * ##### # ####### ######.
				 */
				"OrderAmount": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					dataValueType: Terrasoft.DataValueType.FLOAT
				},

				/**
				 * #### ###### # ######.
				 */
				"Order": {
					lookupListConfig: {
						columns: ["Currency", "CurrencyRate", "Currency.Division", "Contact", "Account", "Amount"]
					}
				},

				/**
				 * ####.
				 */
				"Invoice": {
					lookupListConfig: {
						columns: ["PaymentStatus"],
						filter: function() {
							return this.getInvoiceLookupFilter();
						},
						updateViewModel: function() {
							if (!this.Terrasoft.Features.getIsEnabled("UseLookupInvoiceForSupplyPaymentDetail")) {
								return;
							}
							this.defaultModeActionButtonClickOld = this.defaultModeActionButtonClick.bind(this);
							this.defaultModeActionButtonClick = function(tag) {
								if (tag === "add") {
									Terrasoft.LookupUtilities.HideModalBox();
									var info = this.getLookupInfo();
									info._publishGenerateInvoice();
								} else {
									this.defaultModeActionButtonClickOld(tag);
								}
							};
							this.initCanEdit = function() {
								this.set("canEdit", false);
							};
						}
					}
				}
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.LookupQuickAddMixin#getPreventQuickAddSchemaNames
				 * @overridden
				 */
				getPreventQuickAddSchemaNames: function() {
					var values = this.callParent(arguments);
					values.push("Invoice");
					return values;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#getLookupPageConfig
				 * @overridden
				 */
				getLookupPageConfig: function() {
					var config = this.callParent(arguments);
					this.Ext.apply(config, {_publishGenerateInvoice: this._publishGenerateInvoice.bind(this)});
					return config;
				},

				/**
				 * Sends a message to create an invoice.
				 * @private
				 */
				_publishGenerateInvoice: function() {
					this.sandbox.publish("CreateSupplyPaymentInvoice", null, [this.sandbox.id]);
				},

				/**
				 * Generates filters for displaying invoices.
				 * @protected
				 * @return {Terrasoft.data.filters.FilterGroup} Returns group of filters.
				 */
				getInvoiceLookupFilter: function() {
					var filters = this.Terrasoft.createFilterGroup();
					var order = this.get("Order");
					if (this.isNotEmpty(order)) {
						var orderFilter = this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Order", order.value);
						filters.add("Order", orderFilter);
						var invoiceIds = this._getSupplyPaymentInvoiceIds();
						if (invoiceIds.length > 0){
							var invoiceFilter = this.Terrasoft.createColumnInFilterWithParameters("Id", invoiceIds);
							invoiceFilter.comparisonType = this.Terrasoft.ComparisonType.NOT_EQUAL;
							filters.add("Id", invoiceFilter);
						}
					}
					return filters;
				},

				/**
				 * Returns array of invoice identifier.
				 * @private
				 * @return {Array} Array of invoice identifier.
				 */
				_getSupplyPaymentInvoiceIds: function() {
					var supplyPaymentElements = this.parentCollection.getItems();
					var invoiceIds = [];
					this.Terrasoft.each(supplyPaymentElements, function(s) {
						var invoice = s.get("Invoice");
						if (this.isNotEmpty(invoice)) {
							invoiceIds.push(invoice.value);
						}
					}, this);
					return invoiceIds;
				},

				/**
				 * @inheritDoc Terrasoft.Configuration.BasePageV2#save
				 * @overridden
				 */
				save: function() {
					this.setReloadDetailFlag();
					this.callParent(arguments);
				},

				/**
				 * ############# ### ############# #### ############ ####### ######.
				 * @private
				 */
				setReloadDetailFlag: function() {
					if (this.parentDetailViewModel && !this.Ext.isEmpty(this.changedValues)) {
						var columnsToCheck = this.getColumnsForGridReload();
						this.Terrasoft.each(columnsToCheck, function(column) {
							if (this.changedValues.hasOwnProperty(column)) {
								this.parentDetailViewModel.set("NeedReloadGridData", true);
								return false;
							}
						}, this);
					}
				},

				/**
				 * ########## ##### ######## #######, ### ######### #######, ##### ########## ####
				 * ########## ############# ###### ######.
				 * @return {String[]} ###### ######## #######.
				 */
				getColumnsForGridReload: function() {
					return ["Delay", "DatePlan", "DateFact", "Name", "AmountFact", "Invoice"];
				},

				/**
				 * ########## ######## #### # ####### ########## # ######## #### # ######.
				 * @private
				 * @param {String} table ### #######.
				 * @param {String} column ### #######.
				 * @param {Object} scope ########.
				 * @return {Object} ########## ####### ######.
				 */
				getColumnData: function(table, column, scope) {
					scope = scope || this;
					var path = this.Ext.String.format("{0}.{1}", table, column);
					var tableValue = scope.get(table);
					if (tableValue && tableValue[column]) {
						scope.set(path, tableValue[column]);
					}
					return scope.get(path);
				},

				/**
				 * @inheritDoc Terrasoft.Configuration.BasePageV2#init
				 * @overridden
				 */
				init: function() {
					GridButtonsUtil.init({
						Ext: this.Ext,
						Terrasoft: this.Terrasoft
					});
					this.callParent(arguments);
				},

				/**
				 * @inheritDoc Terrasoft.Configuration.BasePageV2#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					this.sandbox.subscribe("UpdateAmountPlan", function() {
						this.updateAmountPlan();
					}, this, [this.sandbox.id + "_detail_SupplyPaymentProductSupplyPaymentProduct"]);
				},

				/**
				 * @inheritDoc Terrasoft.Configuration.BaseViewModel#getEntitySchemaQuery
				 * @overridden
				 */
				getEntitySchemaQuery: function() {
					var esq = this.callParent(arguments);
					this.addRequiredEsqColumns(esq);
					if (esq.columns.contains("ProductsCount")) {
						esq.columns.removeByKey("ProductsCount");
					}
					esq.addAggregationSchemaColumn("[SupplyPaymentProduct:SupplyPaymentElement].Id",
						Terrasoft.AggregationType.COUNT, "ProductsCount");
					return esq;
				},

				/**
				 * @inheritdoc Terrasoft.BaseModel#onDataChange
				 * @overridden
				 */
				onDataChange: function() {
					this.callParent(arguments);
					if (this.changedValues) {
						delete this.changedValues.Products;
						if (!this.getIsFeatureEnabled("UseLookupInvoiceForSupplyPaymentDetail")) {
							delete this.changedValues.Invoice;
						}
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#onDataChange
				 * @overridden
				 */
				validateColumn: function(columnName) {
					if (["Products", "Invoice"].indexOf(columnName) > -1) {
						return true;
					}
					return this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#loadEntity
				 * @overridden
				 */
				loadEntity: function(primaryColumnValue, callback, scope) {
					this.callParent([primaryColumnValue, function() {
						this.initSupplyPaymentData();
						if (callback) {
							callback.call(scope, this);
						}
					}, this]);
				},

				/**
				 * ######### # ###### #######, ############ ### ########.
				 * @param {Terrasoft.EntitySchemaQuery} esq ######.
				 */
				addRequiredEsqColumns: function(esq) {
					if (!esq.columns.contains("OrderAmount")) {
						esq.addColumn("Order.Amount", "OrderAmount");
					}
				},

				/**
				 * ######### ######## ##### ## ######### # ####.
				 * @private
				 */
				updateAmountPlan: function() {
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "SupplyPaymentProduct"
					});
					esq.addAggregationSchemaColumn("Amount", Terrasoft.AggregationType.SUM, "AmountSum");
					var filters = Terrasoft.createFilterGroup();
					filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"SupplyPaymentElement", this.get("Id")));
					esq.filters = filters;
					esq.getEntityCollection(function(response) {
						if (response.success) {
							var collection = response.collection;
							if (collection.getCount() > 0) {
								var amountSum = collection.getByIndex(0).get("AmountSum");
								this.set("AmountPlan", amountSum);
								this.recalculatePrimaryAmountPlan();
								this.save({isSilent: true});
							}
						}
					}, this);
				},

				/**
				 * ########## ######### ######## ####.
				 */
				onDatePlanChanged: function() {
					var delayType = this.get("DelayType");
					if (this.get("isWorking") || this.get("isElementChanged") ||
						(delayType.value === ConfigurationConstants.SupplyPayment.Fixed)) {
						return;
					}
					var delayDiff = 0;
					var datePlan = this.get("DatePlan");
					var linkedDatePlan = this.get("LinkedDatePlan");
					var linkedDateFact = this.get("LinkedDateFact");
					var linkedState = this.get("LinkedState");
					if (!this.Ext.isDate(datePlan)) {
						return;
					}
					switch (delayType.value) {
						case ConfigurationConstants.SupplyPayment.FromPlan:
							delayDiff = this.getDaysDifference(datePlan, linkedDatePlan);
							break;
						case ConfigurationConstants.SupplyPayment.FromFact:
							if (this.Ext.isDate(linkedDateFact) &&
								(linkedState.value === ConfigurationConstants.SupplyPayment.StateFinished)) {
								delayDiff = this.getDaysDifference(datePlan, linkedDateFact);
							} else {
								delayDiff = this.getDaysDifference(datePlan, linkedDatePlan);
							}
							break;
					}
					this.set("isWorking", true);
					this.set("Delay", delayDiff > 0 ? delayDiff : 0);
					this.set("isWorking", false);
				},

				/**
				 * ######### ####### # #### ##### ##### ######.
				 * @param {Date} lastDate ######## ####.
				 * @param {Date} firstDate ######### ####.
				 * @return {Number} ########## ####.
				 */
				getDaysDifference: function(lastDate, firstDate) {
					if (this.Ext.isDate(lastDate) && this.Ext.isDate(firstDate)) {
						return Math.round((lastDate.getTime() - firstDate.getTime()) / 86400000);
					}
					return 0;
				},

				/**
				 * ########## ######### ########.
				 */
				onDelayChanged: function() {
					var delayType = this.get("DelayType");
					if (this.get("isWorking") || delayType.value === ConfigurationConstants.SupplyPayment.Fixed) {
						return;
					}
					var newDatePlan = 0;
					this.set("isWorking", true);
					var delay = this.get("Delay");
					var linkedDateFact = this.get("LinkedDateFact");
					var linkedDatePlan = this.get("LinkedDatePlan");
					var linkedState = this.get("LinkedState");
					var datePlan = this.get("DatePlan");
					if (!this.Ext.isDate(datePlan)) {
						this.set("isWorking", false);
						return;
					}
					switch (delayType.value) {
						case ConfigurationConstants.SupplyPayment.FromPlan:
							newDatePlan = this.safeCallOnDate(this.Terrasoft.addDays, linkedDatePlan, delay);
							break;
						case ConfigurationConstants.SupplyPayment.FromFact:
							if (this.Ext.isDate(linkedDateFact) &&
								(linkedState.value === ConfigurationConstants.SupplyPayment.StateFinished)) {
								newDatePlan = this.safeCallOnDate(this.Terrasoft.addDays, linkedDateFact, delay);
							} else {
								newDatePlan = this.safeCallOnDate(this.Terrasoft.addDays, linkedDatePlan, delay);
							}
							break;
					}
					this.set("DatePlan", this.safeCallOnDate(this.Terrasoft.addMinutes, newDatePlan, 1));
					this.set("isWorking", false);
				},

				/**
				 * ########## ######### ########## ####### # ##########, #### ###### ######## ######## #####, ### null.
				 * @param {Function} func ####### ### ######.
				 * @param {Date} date ####.
				 * @return {Date}
				 */
				safeCallOnDate: function(func, date) {
					if (this.Ext.isDate(date)) {
						return func.apply(this, Array.prototype.slice.call(arguments, 1));
					} else {
						return null;
					}
				},

				/**
				 * ########## ######### #########.
				 */
				onStateChanged: function() {
					var state = this.get("State");
					if ((state.value === ConfigurationConstants.SupplyPayment.StateFinished) &&
						(!this.get("DateFact"))) {
						var currentDate = new Date(Ext.Date.now());
						this.set("DateFact", currentDate);
					}
				},

				/**
				 * ########## ######### ########### ####.
				 */
				onDateFactChanged: function() {
					var state = this.get("State");
					if (state.value !== ConfigurationConstants.SupplyPayment.StateFinished) {
						this.loadLookupDisplayValue("State", ConfigurationConstants.SupplyPayment.StateFinished);
					}
				},

				/**
				 * ########## ########## #### ########.
				 */
				onDelayTypeChanged: function() {
					if (!this.get("PreviousElement")) {
						return;
					}
					var linkedDatePlan = 0;
					var delay = this.get("Delay");
					var delayType = this.get("DelayType");
					switch (delayType.value) {
						case ConfigurationConstants.SupplyPayment.FromPlan:
							linkedDatePlan = Terrasoft.addMinutes(this.get("LinkedDatePlan"), 1);
							if (linkedDatePlan) {
								this.set("DatePlan", Terrasoft.addDays(linkedDatePlan, delay));
							}
							break;
						case ConfigurationConstants.SupplyPayment.FromFact:
							var state = this.get("LinkedState");
							linkedDatePlan = this.get("LinkedDatePlan");
							var linkedDateFact = this.get("LinkedDateFact");
							if (state.value === ConfigurationConstants.SupplyPayment.StateFinished) {
								if (linkedDateFact) {
									this.set("DatePlan", Terrasoft.addDays(linkedDateFact, delay));
								}
							} else {
								if (linkedDatePlan) {
									this.set("DatePlan", Terrasoft.addDays(linkedDatePlan, delay));
								}
							}
							break;
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#initTypeColumnName
				 * @protected
				 * @overridden
				 */
				initTypeColumnName: function() {
					this.set("TypeColumnName", "Type");
				},

				/**
				 * ########## ######### #### ####.
				 */
				onTypeChanged: function() {
					this.callParent(arguments);
					if (this.get("IsSeparateMode")) {
						var entityCaption = this.getHeader();
						this.sandbox.publish("InitDataViews", {caption: entityCaption});
					}
					GridButtonsUtil.instance.updateInvoiceValue(this);
					this.setAmountPlanEnabled();
					this._setInvoiceEnabled();
					if (!this.isNewMode()) {
						return;
					}
					var elementType = this.get("Type");
					if (elementType) {
						this.recalcTypedAmountPlan(function() {
							var orderAmount = this.getOrderAmount();
							var totalAmount = elementType.value === ConfigurationConstants.SupplyPayment.TypeSupply
								? this.get("SupplyAmount")
								: this.get("PaymentAmount");
							var amount = Math.max(orderAmount - totalAmount, 0);
							amount =  this.roundValue(amount, {targetColumnName: "AmountPlan"});
							this.set("AmountPlan", amount);
						}, this);
					}
				},

				/**
				 * ########## ######### ####.
				 */
				onPercentageChanged: function() {
					if (this.get("isWorking")) {
						return;
					}
					var orderAmount = this.getOrderAmount();
					var percentage = this.get("Percentage") || 0;
					var amountPlan = this.getPercentagePart(orderAmount, percentage);
					this.set("isWorking", true);
					this.set("AmountPlan", amountPlan);
					this.set("isWorking", false);
					this.recalculatePrimaryAmountPlan();
				},

				/**
				 * ########## ######### ######## #####.
				 */
				onAmountPlanChanged: function() {
					var orderAmount = this.getOrderAmount();
					if (this.get("isWorking") || (orderAmount === 0)) {
						return;
					}
					var amountPlan = this.get("AmountPlan") || 0;
					var percentage = this.roundValue(this.getPercentage(orderAmount, amountPlan),
						{targetColumnName: "Percentage"});
					this.set("isWorking", true);
					this.set("Percentage", percentage);
					this.set("isWorking", false);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#asyncValidate
				 * @protected
				 * @overridden
				 */
				asyncValidate: function(callback, scope) {
					this.callParent([function(response) {
						if (!this.validateResponse(response)) {
							return;
						}
						this.Terrasoft.chain(
							function(next) {
								this.callWithValidation(next, this.validateAmount);
							},
							function(next) {
								this.callWithValidation(next, this._validateInvoice);
							},
							function() {
								callback.call(scope, response);
							}, this);
					}, this]);
				},

				/**
				 * @inheritdoc BasePageV2#initActionButtonMenu
				 * @overridden
				 */
				initActionButtonMenu: function() {
					return null;
				},

				/**
				 * ########## ##### ########## ########.
				 * @protected
				 * @virtual
				 */
				onPreviousElementChanged: function() {
					this.updatePreviousElementData();
					this.set("isElementChanged", true);
					this.onDelayTypeChanged();
					this.set("isElementChanged", false);
				},

				/**
				 * ######### ######## LinkedDatePlan, LinkedDateFact, LinkedState
				 * ## ######## # ########### ### # ######### ########### ########.
				 */
				updatePreviousElementData: function() {
					var previousElement = this.get("PreviousElement") || {};
					var datePlan = previousElement.DatePlan || this.get("PreviousElement.DatePlan");
					var dateFact = previousElement.DateFact || this.get("PreviousElement.DateFact");
					var state = previousElement.State || this.get("PreviousElement.State");
					this.set("LinkedDatePlan", datePlan, {silent: true});
					this.set("LinkedDateFact", dateFact, {silent: true});
					this.set("LinkedState", state, {silent: true});
				},

				/**
				 * ####### Entity Schema Query ### ########## ####.
				 */
				createLinkedESQ: function() {
					var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this.entitySchemaName
					});
					select.addColumn("Id");
					select.addColumn("Name");
					select.addColumn("State");
					select.addColumn("DateFact");
					select.addColumn("AmountPlan");
					select.addColumn("Type");
					var datePlanColumn = select.addColumn("DatePlan");
					datePlanColumn.orderPosition = 0;
					datePlanColumn.orderDirection = this.Terrasoft.OrderDirection.DESC;
					var order = this.get("Order");
					select.filters.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
							"Order", order.value));
					select.filters.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.NOT_EQUAL,
							"Id", this.get("Id")));
					return select;
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#initEntity
				 * @overridden
				 */
				initEntity: function(callback, scope) {
					this.callParent([function() {
						this.set("IsEntityInitialized", true);
						this.initSupplyPaymentData();
						callback.call(scope || this);
					}, this]);
				},

				/**
				 * ######### ######### ###.
				 * @protected
				 * @param {Function} callback ##### ######### ######.
				 * @param {Object} scope ######## ##########.
				 */
				findPreviousElement: function(callback, scope) {
					var select = this.createLinkedESQ();
					select.getEntityCollection(function(response) {
						if (response.success) {
							if (response.collection.getCount() === 0) {
								this.loadLookupDisplayValue("DelayType", ConfigurationConstants.SupplyPayment.Fixed);
								this.set("IsFirstItem", true);
								return;
							}
							var item = response.collection.getByIndex(0);
							this.set("PreviousElement", {
								value: item.get("Id"),
								displayValue: item.get("Name"),
								DatePlan: item.get("DatePlan"),
								DateFact: item.get("DateFact"),
								State: item.get("State")
							});
							this.calcTypedAmountPlan(response.collection);
							callback.call(scope, {success: true});
						}
					}, this);
				},

				/**
				 * ######### ##### ######## ##### ##### ##### #####.
				 * @param {Object} collection entity-##########.
				 */
				calcTypedAmountPlan: function(collection) {
					var supplyAmount = 0;
					var paymentAmount = 0;
					collection.each(function(item) {
						var itemType = item.get("Type") || {};
						if (itemType.value === ConfigurationConstants.SupplyPayment.TypeSupply) {
							supplyAmount += item.get("AmountPlan");
						} else if (itemType.value) {
							paymentAmount += item.get("AmountPlan");
						}
					}, this);
					this.set("SupplyAmount", supplyAmount);
					this.set("PaymentAmount", paymentAmount);
				},

				/**
				 * ############# ##### ##### # ######## # ######.
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} scope ######## ##########.
				 */
				recalcTypedAmountPlan: function(callback, scope) {
					this.set("SupplyAmount", 0);
					this.set("PaymentAmount", 0);
					var select = this.createLinkedESQ();
					select.getEntityCollection(function(response) {
						if (response.success) {
							this.calcTypedAmountPlan(response.collection);
						}
						if (callback) {
							callback.call(scope);
						}
					}, this);
				},

				/**
				 * ############## ###### ####### ######## # #####.
				 * @private
				 */
				initSupplyPaymentData: function() {
					this.setAmountPlanEnabled();
					this._setInvoiceEnabled();
					this.setCurrency();
					if (this.isNewMode()) {
						this.set("SupplyAmount", 0, {silent: true});
						this.set("PaymentAmount", 0, {silent: true});
						this.callWithValidation(this.Ext.emptyFn, this.findPreviousElement);
					} else {
						this.updatePreviousElementData();
					}
					this.set("OldDelay", this.get("Delay"), {silent: true});
					this.set("OldDatePlan", this.get("DatePlan"), {silent: true});
				},

				/**
				 * ########## ##### ######.
				 */
				getOrderAmount: function() {
					return this.get("OrderAmount") || 0;
				},

				/**
				 * ########### # ############# ######## ## #########.
				 */
				setElementDefaultValues: function() {
					this.set("IsFirstItem", false);
					this.Terrasoft.chain(
						function() {
							this.callWithValidation(this.Ext.emptyFn, this.findPreviousElement);
						}, this
					);
				},

				/**
				 * ############# ###### # #########.
				 * @private
				 */
				setCurrency: function() {
					var order = this.get("Order") || {};
					var currency = order.Currency || this.get("Order.Currency") || {};
					currency.Division = order["Currency.Division"] || this.get("Order.Currency.Division");
					var currencyRate = order.CurrencyRate || this.get("Order.CurrencyRate");
					this.set("Currency", currency ? currency : null, {silent: true});
					this.set("CurrencyRate", this.Ext.isEmpty(currencyRate) ? 0 : currencyRate, {silent: true});
				},

				/**
				 * ############# ######## ######### ### #### Percentage.
				 * @private
				 * @return {String} ###### ######### ### ####.
				 */
				getPercentageHint: function() {
					var isSupply = !GridButtonsUtil.instance.getIsPayment(this) && this.get("Type");
					var productsCount = this.get("ProductsCount") || 0;
					var percentageHint = "";
					if (isSupply) {
						percentageHint = this.get("Resources.Strings.PercentageForSupplyIsNotEditableHint");
					} else if (productsCount > 0) {
						percentageHint = this.get("Resources.Strings.PercentageForPaymentsWithProductIsNotEditableHint");
					}
					return percentageHint;
				},

				/**
				 * ############# ####### ############ ##### AmountPlan # Percentage.
				 * @private
				 */
				setAmountPlanEnabled: function() {
					var isNotSupply = this._getIsNotSupply();
					var notIncludedProducts = (this.get("ProductsCount") || 0) === 0;
					this.set("AmountPlanEnabled", isNotSupply && notIncludedProducts);
				},

				/**
				 * Sets Invoice field state.
				 * @private
				 */
				_setInvoiceEnabled: function() {
					var isNotSupply = this._getIsNotSupply();
					this.set("InvoiceEnabled", isNotSupply);
				},

				/**
				 * Returns true if not supply.
				 * @private
				 * @return {Boolean}
				 */
				_getIsNotSupply: function() {
					return GridButtonsUtil.instance.getIsPayment(this) || !this.get("Type");
				},

				/**
				 * ########## ########### #######.
				 * @private
				 */
				getCurrencyDivision: function() {
					var currency = this.get("Currency");
					return currency && currency.Division;
				},

				/**
				 * ########## ##### ######, #.#.
				 * @private
				 */
				recalculatePrimaryAmountPlan: function() {
					if (this.get("isWorking")) {
						return;
					}
					this.recalculatePrimaryValue("AmountPlan");
				},

				/**
				 * ########## ##### ######, #.#.
				 * @private
				 */
				recalculatePrimaryAmountFact: function() {
					this.recalculatePrimaryValue("AmountFact");
				},

				/**
				 * ######### #####.
				 * @private
				 */
				validateAmount: function(callback, scope) {
					var amountPlan = this.get("AmountPlan");
					var amountFact = this.get("AmountFact");
					var result = {
						success: true
					};
					if (amountPlan < 0) {
						result.message = this.get("Resources.Strings.AmountPlanNegative");
						result.success = false;
					}
					if (amountFact < 0) {
						result.message = this.get("Resources.Strings.AmountFactNegative");
						result.success = false;
					}
					callback.call(scope || this, result);
				},

				/**
				 * Invoice validation.
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback scope.
				 */
				_validateInvoice: function(callback, scope) {
					if (!this._getIsSupplyPaymentInvoiceChanged()) {
						this.Ext.callback(callback, scope || this, [{
							success: true
						}]);
					} else {
						var yesCode = this.Terrasoft.MessageBoxButtons.YES.returnCode;
						var noCode = this.Terrasoft.MessageBoxButtons.NO.returnCode;
						this.showConfirmationDialog(this.get("Resources.Strings.ChangeInvoiceStatusWarning"),
							function(dialogResult) {
								this.Ext.callback(callback, scope || this, [{
									success: dialogResult === yesCode
								}]);
							},
							[yesCode, noCode]
						);
					}
				},

				/**
				 * Returns true if invoice has changed.
				 * @private
				 */
				_getIsSupplyPaymentInvoiceChanged: function() {
					var invoiceOld = this.getInitialValue("Invoice");
					var invoiceNew = this.changedValues.Invoice;
					return this.isNotEmpty(invoiceOld) && (invoiceNew === null || (this.isNotEmpty(invoiceNew) &&
						invoiceOld.value !== invoiceNew.value));
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onSaved
				 * @overridden
				 */
				onSaved: function() {
					this.callParent(arguments);
					this.updateInvoiceCurrency();
				},

				/**
				 * ######### ###### # #####.
				 * @protected
				 * @virtual
				 */
				updateInvoiceCurrency: function() {
					var invoice = this.get("Invoice");
					invoice = invoice && invoice.value;
					if (!this.Terrasoft.isGUID(invoice)) {
						return;
					}
					var currency = this.get("Currency");
					var currencyRate = this.get("CurrencyRate");
					if (!currency || !currencyRate) {
						return;
					}
					var update = this.Ext.create("Terrasoft.UpdateQuery", {
						rootSchemaName: "Invoice"
					});
					update.setParameterValue("Currency", currency.value, this.Terrasoft.DataValueType.GUID);
					update.setParameterValue("CurrencyRate", currencyRate, this.Terrasoft.DataValueType.FLOAT);
					update.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Id", invoice));
					update.execute();
				},

				/**
				 * ########## ####### ############ ## ######### ### ########### ####### # #### ######.
				 * @param {Terrasoft.EntitySchemaColumn} column ####### entity #####.
				 * @return {Object} ############ ### ########### ####### # #### ######.
				 */
				getLinkColumnConfig: function(column) {
					var columnPath = column.columnPath;
					var value = this.get(columnPath);
					if (!value) {
						return null;
					}
					var config = {
						target: "_self",
						url: ""
					};
					if (columnPath === "Products") {
						config.title = value;
						config.caption = value;
					} else if (columnPath === "Invoice") {
						config.title = value.displayValue;
						config.caption = value.displayValue;
						if (value && value.value) {
							var urlConfig = this.getLinkUrl(column.name);
							config.url = urlConfig.url;
						}
					}
					return config.caption ? config : null;
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#setColumnValues
				 * @protected
				 * @overridden
				 */
				setColumnValues: function(entity) {
					if (entity) {
						entity.set("Products", entity.get("ProductsCount") || "0");
					}
					this.callParent(arguments);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "TabsContainer"
				},
				{
					"operation": "insert",
					"name": "SupplyPaymentPageGeneralTabContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "SupplyPaymentPageGeneralTabContainer",
					"propertyName": "items",
					"name": "SupplyPaymentPageGeneralBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Name",
					"values": {
						"bindTo": "Name",
						"layout": {"column": 0, "row": 0, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "PreviousElement",
					"values": {
						"bindTo": "PreviousElement",
						"layout": {"column": 12, "row": 0, "colSpan": 12},
						"tip": {
							"content": {"bindTo": "Resources.Strings.PreviousElementTip"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "ElementType",
					"values": {
						"bindTo": "Type",
						"contentType": Terrasoft.ContentType.ENUM,
						"layout": {"column": 0, "row": 1, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Delay",
					"values": {
						"bindTo": "Delay",
						"layout": {"column": 12, "row": 1, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "DatePlan",
					"values": {
						"bindTo": "DatePlan",
						"layout": {"column": 0, "row": 2, "colSpan": 12},
						"tip": {
							"content": {"bindTo": "Resources.Strings.DatePlanTip"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "DateFact",
					"values": {
						"bindTo": "DateFact",
						"layout": {"column": 12, "row": 2, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Percentage",
					"values": {
						"bindTo": "Percentage",
						"layout": {"column": 0, "row": 3, "colSpan": 12},
						"tip": {
							"content": {"bindTo": "Resources.Strings.PercentageTip"}
						},
						"enabled": {"bindTo": "AmountPlanEnabled"},
						"controlConfig": {
							"tips": [{
								"tip": {
									"content": {"bindTo": "getPercentageHint"},
									"displayMode": this.Terrasoft.TipDisplayMode.NARROW
								},
								"settings": {
									"alignEl": "disabledElIconEl"
								}
							}]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "State",
					"values": {
						"bindTo": "State",
						"contentType": Terrasoft.ContentType.ENUM,
						"layout": {"column": 12, "row": 3, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Currency",
					"values": {
						"layout": {"column": 0, "row": 4, "colSpan": 12},
						"contentType": Terrasoft.ContentType.ENUM,
						"enabled": false
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "CurrencyRate",
					"values": {
						"layout": {"column": 12, "row": 4, "colSpan": 12},
						"enabled": false
					}
				},
				{
					"operation": "insert",
					"name": "AmountPlan",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 5, "colSpan": 12},
						"tip": {
							"content": {"bindTo": "Resources.Strings.AmountPlanTip"}
						},
						"enabled": {"bindTo": "AmountPlanEnabled"}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "PrimaryAmountPlan",
					"values": {
						"layout": {"column": 12, "row": 5, "colSpan": 12},
						"enabled": false
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "DelayType",
					"values": {
						"bindTo": "DelayType",
						"contentType": Terrasoft.ContentType.ENUM,
						"layout": {"column": 0, "row": 6, "colSpan": 12},
						"tip": {
							"content": {"bindTo": "Resources.Strings.DelayTypeTip"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "AmountFact",
					"values": {
						"bindTo": "AmountFact",
						"layout": {"column": 0, "row": 7, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "PrimaryAmountFact",
					"values": {
						"layout": {"column": 12, "row": 7, "colSpan": 12},
						"enabled": false
					}
				}
			]/**SCHEMA_DIFF*/,
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
					"FiltrationPreviousElementByOrder": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Order",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Order"
					}
				},
				"Percentage": {
					"BindParameterEnabledPercentage": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "AmountPlanEnabled"
							},
							"comparisonType": this.Terrasoft.core.enums.ComparisonType.EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": true
							}
						}]
					}
				},
				"AmountPlan": {
					"BindParameterEnabledAmountPlan": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "AmountPlanEnabled"
							},
							"comparisonType": this.Terrasoft.core.enums.ComparisonType.EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": true
							}
						}]
					}
				},
				"Invoice": {
					"BindParameterEnabledInvoice": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "InvoiceEnabled"
							},
							"comparisonType": this.Terrasoft.core.enums.ComparisonType.EQUAL,
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

define("SupplyPaymentPageV2", [],
	function() {
		return {
			entitySchemaName: "SupplyPaymentElement",
			attributes: {
				/**
				 * #### ###### # ######.
				 */
				"Order": {
					lookupListConfig: {
						columns: ["Currency", "CurrencyRate", "Currency.Division", "Contact", "Account", "Opportunity"]
					}
				}
			}
		};
	}
);


