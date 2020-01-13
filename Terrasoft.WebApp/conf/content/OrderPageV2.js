Terrasoft.configuration.Structures["OrderPageV2"] = {innerHierarchyStack: ["OrderPageV2Order", "OrderPageV2OrderInvoice", "OrderPageV2DocumentInOrder", "OrderPageV2ContractInOrder", "OrderPageV2Passport", "OrderPageV2OrderLead", "OrderPageV2"], structureParent: "BaseOrderPage"};
define('OrderPageV2OrderStructure', ['OrderPageV2OrderResources'], function(resources) {return {schemaUId:'23d86ac4-1d23-4314-a5e3-5da5e61b495a',schemaCaption: "Order edit page", parentSchemaName: "BaseOrderPage", schemaName:'OrderPageV2Order',parentSchemaUId:'041fd481-1807-46f4-ac35-6c99c34ae552',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OrderPageV2OrderInvoiceStructure', ['OrderPageV2OrderInvoiceResources'], function(resources) {return {schemaUId:'3d0ac951-dac8-4fc5-8cae-6c77abb4bf64',schemaCaption: "Order edit page", parentSchemaName: "OrderPageV2Order", schemaName:'OrderPageV2OrderInvoice',parentSchemaUId:'23d86ac4-1d23-4314-a5e3-5da5e61b495a',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OrderPageV2Order",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OrderPageV2DocumentInOrderStructure', ['OrderPageV2DocumentInOrderResources'], function(resources) {return {schemaUId:'c8574e9d-13d7-4476-9b73-c80cf862a585',schemaCaption: "Order edit page", parentSchemaName: "OrderPageV2OrderInvoice", schemaName:'OrderPageV2DocumentInOrder',parentSchemaUId:'3d0ac951-dac8-4fc5-8cae-6c77abb4bf64',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OrderPageV2OrderInvoice",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OrderPageV2ContractInOrderStructure', ['OrderPageV2ContractInOrderResources'], function(resources) {return {schemaUId:'236581d8-86e3-4255-8f0f-c2f43cc60158',schemaCaption: "Order edit page", parentSchemaName: "OrderPageV2DocumentInOrder", schemaName:'OrderPageV2ContractInOrder',parentSchemaUId:'c8574e9d-13d7-4476-9b73-c80cf862a585',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OrderPageV2DocumentInOrder",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OrderPageV2PassportStructure', ['OrderPageV2PassportResources'], function(resources) {return {schemaUId:'d22d8b4c-926e-42ab-8e9a-684b6fc2d886',schemaCaption: "Order edit page", parentSchemaName: "OrderPageV2ContractInOrder", schemaName:'OrderPageV2Passport',parentSchemaUId:'236581d8-86e3-4255-8f0f-c2f43cc60158',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OrderPageV2ContractInOrder",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OrderPageV2OrderLeadStructure', ['OrderPageV2OrderLeadResources'], function(resources) {return {schemaUId:'9243b2ea-cf94-411f-a764-c4086638566b',schemaCaption: "Order edit page", parentSchemaName: "OrderPageV2Passport", schemaName:'OrderPageV2OrderLead',parentSchemaUId:'d22d8b4c-926e-42ab-8e9a-684b6fc2d886',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OrderPageV2Passport",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OrderPageV2Structure', ['OrderPageV2Resources'], function(resources) {return {schemaUId:'3c101be1-782f-4bc4-be1f-0c6933d21cb1',schemaCaption: "Order edit page", parentSchemaName: "OrderPageV2OrderLead", schemaName:'OrderPageV2',parentSchemaUId:'9243b2ea-cf94-411f-a764-c4086638566b',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OrderPageV2OrderLead",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OrderPageV2OrderResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OrderPageV2Order", ["VisaHelper", "ConfigurationConstants", "css!VisaHelper"],
	function(VisaHelper, ConfigurationConstants) {
		return {
			entitySchemaName: "Order",
			messages: {},
			attributes: {},
			details: /**SCHEMA_DETAILS*/{
				Activities: {
					schemaName: "ActivityDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Order"
					},
					defaultValues: {
						Account: {masterColumn: "Account"},
						Contact: {masterColumn: "Contact"}
					}
				},
				Calls: {
					schemaName: "CallDetail",
					filter: {
						masterColumn: "Id",
						detailColumn: "Order"
					}
				},
				Invoice: {
					schemaName: "InvoiceDetailV2",
					entitySchemaName: "Invoice",
					filter: {
						masterColumn: "Id",
						detailColumn: "Order"
					},
					defaultValues: {
						Account: {masterColumn: "Account"},
						Contact: {masterColumn: "Contact"}
					}
				},
				EmailDetailV2: {
					schemaName: "EmailDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Order"
					},
					filterMethod: "emailDetailFilter"
				},
				Visa: {
					schemaName: "VisaDetailV2",
					entitySchemaName: "OrderVisa",
					filter: {
						masterColumn: "Id",
						detailColumn: "Order"
					}
				}
			}/**SCHEMA_DETAILS*/,
			mixins: {},
			methods: {

				/**
				 * @inheritdoc Terrasoft.BasePageV2#getActions
				 * @override
				 */
				getActions: function() {
					var actionMenuItems = this.callParent(arguments);
					actionMenuItems.add("SendToVisaSeparator", this.getButtonMenuItem({
						Type: "Terrasoft.MenuSeparator",
						Caption: ""
					}));
					actionMenuItems.add("SendToVisa", this.getButtonMenuItem({
						"Caption": VisaHelper.resources.localizableStrings.SendToVisaCaption,
						"Tag": VisaHelper.SendToVisaMenuItem.methodName,
						"Enabled": {"bindTo": "canEntityBeOperated"}
					}));
					return actionMenuItems;
				},

				/**
				* Action "Send to visa".
				*/
				sendToVisa: VisaHelper.SendToVisaMethod,

				/**
				 * Creates filter for detail Email.
				 * @protected
				 * @return {Terrasoft.FilterGroup} Group filters.
				 */
				emailDetailFilter: function() {
					var recordId = this.get("Id");
					var filterGroup = new this.Terrasoft.createFilterGroup();
					filterGroup.add("OrderNotNull", this.Terrasoft.createColumnIsNotNullFilter("Order"));
					filterGroup.add("OrderConnection", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Order", recordId));
					filterGroup.add("ActivityType", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Type", ConfigurationConstants.Activity.Type.Email));
					return filterGroup;
				},
			},

			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "OrderPageVisaTabContainer",
					"propertyName": "items",
					"name": "OrderPageVisaBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "OrderVisaTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 6,
					"values": {
						"caption": {"bindTo": "Resources.Strings.OrderVisaTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderVisaTab",
					"name": "OrderPageVisaTabContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderVisaTab",
					"propertyName": "items",
					"name": "Visa",
					"lableConfig": {"visible": false},
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "OrderHistoryTab",
					"propertyName": "items",
					"name": "Activities",
					"values": {"itemType": Terrasoft.ViewItemType.DETAIL},
					"index": 2
				},
				{
					"operation": "insert",
					"parentName": "OrderHistoryTab",
					"propertyName": "items",
					"name": "Calls",
					"values": {"itemType": Terrasoft.ViewItemType.DETAIL},
					"index": 3
				},
				{
					"operation": "insert",
					"parentName": "OrderHistoryTab",
					"propertyName": "items",
					"name": "EmailDetailV2",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					},
					"index": 4
				},
				{
					"operation": "move",
					"parentName": "OrderHistoryTab",
					"propertyName": "items",
					"name": "Document",
					"values": {"itemType": Terrasoft.ViewItemType.DETAIL},
					"index": 5
				},
				{
					"operation": "insert",
					"parentName": "OrderHistoryTab",
					"propertyName": "items",
					"name": "Invoice",
					"values": {"itemType": Terrasoft.ViewItemType.DETAIL},
					"index": 6
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('OrderPageV2OrderInvoiceResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OrderPageV2OrderInvoice", ["ProcessModuleUtilities"],
		function(ProcessModuleUtilities) {
			return {
				entitySchemaName: "Order",
				methods: {
					/**
					 * @inheritdoc Terrasoft.BasePageV2#getActions
					 * @overridden
					 */
					getActions: function() {
						var actionMenuItems = this.callParent(arguments);
						actionMenuItems.add("CreateInvoice", this.getButtonMenuItem({
							"Caption": this.get("Resources.Strings.CreateInvoiceByOrderCaption"),
							"Tag": "onCreateInvoiceClick",
							"Enabled": {"bindTo": "canEntityBeOperated"}
						}));
						return actionMenuItems;
					},

					/**
					 * Event handler "CreateInvoice" button click.
					 * @protected
					 */
					onCreateInvoiceClick: function() {
						if (this.isChanged()) {
							this.save({
								isSilent: true,
								scope: this,
								callback: this.createInvoice
							});
						} else {
							this.createInvoice();
						}
					},

					/**
					 * Returns ProcessModuleUtilities.
					 * @protected
					 * @return {Terrasoft.ProcessModuleUtilities} ProcessModuleUtilities
					 */
					getProcessModuleUtilities: function() {
						return ProcessModuleUtilities;
					},

					/**
					 * Queries create invoice from order process id.
					 * @protected
					 * @param {Function} callback Callback f-n.
					 * @param {Object} scope Callback scope.
					 */
					queryProcessId: function(callback, scope) {
						this.Terrasoft.SysSettings.querySysSettingsItem("CreateInvoiceFromOrderProcess",
								function(createInvoiceFromOrderProcessValue) {
									var sysProcessId;
									if (createInvoiceFromOrderProcessValue &&
										createInvoiceFromOrderProcessValue.value) {
										sysProcessId = createInvoiceFromOrderProcessValue.value;
									}
									this.Ext.callback(callback, scope, [sysProcessId]);
								}, this);
					},

					/**
					 * Starts create invoice from order process.
					 * @protected
					 */
					createInvoice: function() {
						this._updateHistoryState();
						this.queryProcessId(function(sysProcessId) {
							if (!sysProcessId) {
								throw Terrasoft.ItemNotFoundException(
										this.get("Resources.Strings.CreateInvoiceFromOrderProcessNotSet")
								);
							}
							this.getProcessModuleUtilities().executeProcess({
								sysProcessId: sysProcessId,
								parameters: {
									CurrentOrder: this.get("Id")
								}
							});
						}, this);
					},

					/**
					 * Updates current history state object.
					 * @private
					 */
					_updateHistoryState: function() {
						var historyState = this.sandbox.publish("GetHistoryState");
						var state = historyState.state || {};
						var cardOperation = this.get("Operation");
						var isNewModeInHistoryState = this.getIsNewMode(state.operation);
						var isNewModeInCardOperation =  this.getIsNewMode(cardOperation);
						if (isNewModeInHistoryState && !isNewModeInCardOperation) {
							state.operation = cardOperation;
							state.primaryColumnValue = this.getPrimaryColumnValue();
							this.sandbox.publish("ReplaceHistoryState", {
								stateObj: state,
								hash: historyState.hash.historyState,
								silent: true
							});
						}
					},

					/**
					 * Returns whether the page state in append or copy mode.
					 * @param {String} operation Card operation.
					 * @return {Boolean} Page state in append or copy mode.
					 */
					getIsNewMode: function(operation) {
						return operation === this.Terrasoft.ConfigurationEnums.CardOperation.ADD ||
								operation === this.Terrasoft.ConfigurationEnums.CardOperation.COPY;
					}
				},
				details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
				diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
			};
		});

define('OrderPageV2DocumentInOrderResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OrderPageV2DocumentInOrder", ["ProductEntryPageUtils", "css!VisaHelper"],
	function() {
		return {
				entitySchemaName: "Order",
				details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
				attributes: {},
				methods: {},
				rules: {},
				userCode: {},
				diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
			};
	});

define('OrderPageV2ContractInOrderResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OrderPageV2ContractInOrder", ["ConfigurationEnums"],
	function(ConfigurationEnums) {
		return {
			entitySchemaName: "Order",
			methods: {
				/**
				 * @inheritdoc Terrasoft.BasePageV2#getActions
				 */
				getActions: function() {
					var actionMenuItems = this.callParent(arguments);
					actionMenuItems.add("CreateContract", this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.CreateContract"},
						"Tag": "createContract",
						"Enabled": {"bindTo": "canEntityBeOperated"}
					}));
					return actionMenuItems;
				},

				/**
				 * ########## ###### ######## ####### ### ######## ########.
				 * @return {Array}
				 */
				getContractColumnValues: function() {
					var columnValues = [{name: "Order", value: this.get("Id")}];
					var account = this.get("Account");
					if (account) {
						columnValues.push({
							name: "Account",
							value: account.value
						});
					}
					var owner = this.get("Owner");
					if (owner) {
						columnValues.push({
							name: "Owner",
							value: owner.value
						});
					}
					var currency = this.get("Currency");
					if (currency) {
						columnValues.push({
							name: "Currency",
							value: currency.value
						});
					}
					var currencyRate = this.get("CurrencyRate");
					if (currencyRate) {
						columnValues.push({
							name: "CurrencyRate",
							value: currencyRate,
							dataValueType: this.Terrasoft.DataValueType.FLOAT
						});
					}
					var currentUserAccount = this.Terrasoft.SysValue.CURRENT_USER_ACCOUNT.value;
					if (currentUserAccount && !this.Terrasoft.isEmptyGUID(currentUserAccount)) {
						columnValues.push({
							name: "OurCompany",
							value: currentUserAccount
						});
					}
					return columnValues;
				},

				/**
				 * ######## ######### ## ######### ######.
				 * @private
				 */
				createContract: function() {
					var columnValues = this.getContractColumnValues();
					var columnValuesContainsColumn = function(columnName) {
						return Boolean(this.Terrasoft.findItem(columnValues, {name: columnName}));
					}.bind(this);
					if (!columnValuesContainsColumn("Account") || !columnValuesContainsColumn("OurCompany")) {
						this.openContractPage({
							id: this.Terrasoft.GUID_EMPTY,
							operation: ConfigurationEnums.CardStateV2.ADD,
							defaultValues: columnValues
						});
						return;
					}
					this.showBodyMask();
					this.insertContract(columnValues, function(response) {
						this.hideBodyMask();
						if (response.id) {
							this.onContractInserted(response.id);
						}
					}, this.hideBodyMask, this);
				},

				/**
				 * ####### ####### # ##.
				 * @protected
				 * @param {Array} columnValues ######## ####### ########.
				 * @param {Function} successCallback ##### ######### ######. ########### # ###### ######.
				 * @param {Function} errorCallback ##### ######### ######. ########### # ###### ######.
				 * @param {Object} scope ######## ##########.
				 */
				insertContract: function(columnValues, successCallback, errorCallback, scope) {
					var data = {
						sysSettingName: "Contract" + this.get("Resources.Strings.IncrementNumberSuffix"),
						sysSettingMaskName: "Contract" + this.get("Resources.Strings.IncrementMaskSuffix")
					};
					this.callServiceMethod("SysSettingsService", "GetIncrementValueVsMask", function(response) {
						var number = response ? response.GetIncrementValueVsMaskResult : null;
						var insertQuery = Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: "Contract"
						});
						var guidType = this.Terrasoft.DataValueType.GUID;
						insertQuery.setParameterValue("Id", this.Terrasoft.generateGUID(), guidType);
						insertQuery.setParameterValue("Number", number, this.Terrasoft.DataValueType.TEXT);
						this.Terrasoft.each(columnValues, function(columnValue) {
							insertQuery.setParameterValue(columnValue.name, columnValue.value,
									columnValue.dataValueType || guidType);
						}, this);
						insertQuery.execute(function(response) {
							if (response.success) {
								successCallback.call(scope, response);
							} else {
								errorCallback.call(scope, response);
							}
						}, this);
					}, data, this);
				},

				/**
				 * ######### ####### ######### # ######, ### ## ########## ######### ######## ######## ### ####
				 * # ########## ########### #########.
				 * @private
				 * @param {GUID} contractId Id ######### ########.
				 */
				onContractInserted: function(contractId) {
					this.getIsOrderHasUnlinkedProducts(function(show) {
						if (!show) {
							this.openContractPage({
								id: contractId,
								operation: ConfigurationEnums.CardStateV2.EDIT
							});
							return;
						}
						this.showProductsConfirmation(function(buttonCode) {
							if (buttonCode === "ButtonAll") {
								this.connectProducts(contractId);
							} else if (buttonCode === "ButtonChoice") {
								this.openProductLookupToLink(contractId);
							} else {
								this.openContractPage({
									id: contractId,
									operation: ConfigurationEnums.CardStateV2.EDIT
								});
							}
						});
					});
				},

				/**
				 * ########## ########## #### # ########## ########### ######### # #######.
				 * @private
				 * @param {Function} handler ##### ######### ######.
				 */
				showProductsConfirmation: function(handler) {
					this.Terrasoft.showConfirmation(
						this.get("Resources.Strings.LinkProductCaption"),
						handler,
						[{
							className: "Terrasoft.Button",
							returnCode: "ButtonAll",
							style: this.Terrasoft.controls.ButtonEnums.style.BLUE,
							caption: this.get("Resources.Strings.QuestionAllCaption"),
							markerValue: this.get("Resources.Strings.QuestionAllCaption")
						},
						{
							className: "Terrasoft.Button",
							returnCode: "ButtonChoice",
							style: this.Terrasoft.controls.ButtonEnums.style.GREY,
							caption: this.get("Resources.Strings.QuestionChoiceCaption"),
							markerValue: this.get("Resources.Strings.QuestionChoiceCaption")
						},
						"cancel"],
						this,
						{defaultButton: 0}
					);
				},

				/**
				 * ######### ######## ############## ########.
				 * @private
				 * @param {Object} config ######### ######## ########.
				 * @param {String} config.operation ### ######## ######## ##############.
				 * @param {GUID} config.id ############# ########.
				 * @param {Array} [config.defaultValues] ######## ## ######### ### ########### ######.
				 */
				openContractPage: function(config) {
					this.showBodyMask();
					this.openCardInChain({
						schemaName: "ContractPageV2",
						operation: config.operation,
						id: config.id,
						defaultValues: config.defaultValues,
						moduleId: this.sandbox.id + "_ContractEditByOrderPage"
					});
				},

				/**
				 * ######### ########## ######### ###### ### ###### #######,
				 * ####### ########## ####### # ####### #########.
				 * @private
				 * @param {String} id ############# ########.
				 */
				openProductLookupToLink: function(id) {
					var config = {
						entitySchemaName: "OrderProduct",
						multiSelect: true,
						columns: ["Name"]
					};
					var orderId = this.get("Id");
					var filters = this.Terrasoft.createFilterGroup();
					var idFilter = this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"Order", orderId);
					var contractIsNull = this.Terrasoft.createColumnIsNullFilter("Contract");
					filters.addItem(idFilter);
					filters.addItem(contractIsNull);
					config.filters = filters;
					this.openLookup(config, function(response) {
						this.linkSelectedRecords(response, id);
					}, this);
				},

				/**
				 * ######### ##### ### ######### ######### # ####### #########.
				 * @private
				 * @param {Object} items ###### #### {columnName: string, selectedRows: []}.
				 * ######## ###### ######### ####### ## ###########.
				 * @param {String} id ############# ########.
				 */
				linkSelectedRecords: function(items, id) {
					this.showBodyMask();
					var selectedRows = items.selectedRows.getKeys();
					if (items.selectedRows.getCount() > 0) {
						var update = this.Ext.create("Terrasoft.UpdateQuery", {
							rootSchemaName: "OrderProduct"
						});
						update.setParameterValue("Contract", id, this.Terrasoft.DataValueType.GUID);
						update.filters.addItem(this.Terrasoft.createColumnInFilterWithParameters("Id", selectedRows));
						update.execute(function() {
							this.updateContractAmount(id);
						}, this);
					} else {
						this.openContractPage({
							id: id,
							operation: ConfigurationEnums.CardStateV2.EDIT
						});
					}
				},

				/**
				 * ########## ######## # ####### #########.
				 * @private
				 * @param {String} id ############# ########.
				 */
				connectProducts: function(id) {
					this.showBodyMask();
					var orderId = this.get("Id");
					var update = this.Ext.create("Terrasoft.UpdateQuery", {
						rootSchemaName: "OrderProduct"
					});
					update.setParameterValue("Contract", id, this.Terrasoft.DataValueType.GUID);
					update.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Order",  orderId));
					update.filters.addItem(this.Terrasoft.createColumnIsNullFilter("Contract"));
					update.execute(function() {
						this.updateContractAmount(id);
					}, this);
				},

				/**
				 * ######### ####### ############# ######### # #########.
				 * @private
				 * @param {Function} callback ####### ######### ######.
				 */
				getIsOrderHasUnlinkedProducts: function(callback) {
					var orderId = this.get("Id");
					var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "OrderProduct"
					});
					select.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Order",  orderId));
					select.filters.addItem(this.Terrasoft.createColumnIsNullFilter("Contract"));
					select.execute(function(response) {
						callback.call(this, Boolean(response && response.success && response.collection.getCount()));
					}, this);
				},

				/**
				 * ############ ##### ######### # ######## # ######### ##.
				 * @private
				 * @param {String} id ############# ########.
				 */
				updateContractAmount: function(id) {
					var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "OrderProduct"
					});
					select.addAggregationSchemaColumn("TotalAmount", this.Terrasoft.AggregationType.SUM, "TotalAmountSum");
					select.addAggregationSchemaColumn("PrimaryTotalAmount", this.Terrasoft.AggregationType.SUM,
						"PrimaryTotalAmountSum");
					var orderId =  this.get("Id");
					var filterGroup = new this.Terrasoft.createFilterGroup();
					filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
					filterGroup.add("OrderFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Order", orderId));
					filterGroup.add("ContractFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Contract", id));
					select.filters = filterGroup;
					select.getEntityCollection(function(response) {
						if (response.success && response.collection) {
							var items = response.collection.getItems();
							if (items.length > 0) {
								var update = this.Ext.create("Terrasoft.UpdateQuery", {
									rootSchemaName: "Contract"
								});
								update.setParameterValue("Amount", items[0].get("TotalAmountSum"),
									this.Terrasoft.DataValueType.MONEY);
								update.setParameterValue("PrimaryAmount", items[0].get("PrimaryTotalAmountSum"),
									this.Terrasoft.DataValueType.MONEY);
								update.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
									this.Terrasoft.ComparisonType.EQUAL, "Id", id));
								update.execute(function() {
									this.openContractPage({
										id: id,
										operation: ConfigurationEnums.CardStateV2.EDIT
									});
								}, this);
							}
						}
					}, this);
				}
			},
			details: /**SCHEMA_DETAILS*/{
				Contract: {
					schemaName: "ContractDetailV2",
					entitySchemaName: "Contract",
					filter: {
						masterColumn: "Id",
						detailColumn: "Order"
					},
					defaultValues: {
						Account: {masterColumn: "Account"},
						Contact: {masterColumn: "Contact"},
						Currency: {masterColumn: "Currency"},
						CurrencyRate: {masterColumn: "CurrencyRate"}
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "OrderHistoryTab",
					"propertyName": "items",
					"name": "Contract",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					},
					"index": 1
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('OrderPageV2PassportResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OrderPageV2Passport", [],
	function() {
		return {
			entitySchemaName: "Order",
			messages: {},
			mixins: {},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
			methods: {}
		};
	});

define('OrderPageV2OrderLeadResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OrderPageV2OrderLead", [],
	function() {
		return {
			entitySchemaName: "Order",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			mixins: {},
			methods: {},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
			rules: {},
			userCode: {}
		};
	});

define("OrderPageV2", [],
	function() {
		return {
			entitySchemaName: "Order",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			methods: {},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
			rules: {}
		};
	});


