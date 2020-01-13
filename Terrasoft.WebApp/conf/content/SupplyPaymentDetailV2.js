Terrasoft.configuration.Structures["SupplyPaymentDetailV2"] = {innerHierarchyStack: ["SupplyPaymentDetailV2Passport", "SupplyPaymentDetailV2"], structureParent: "BaseGridDetailV2"};
define('SupplyPaymentDetailV2PassportStructure', ['SupplyPaymentDetailV2PassportResources'], function(resources) {return {schemaUId:'efa63fa5-d3d2-404a-840e-62b884827a87',schemaCaption: "Installment plan detail", parentSchemaName: "BaseGridDetailV2", schemaName:'SupplyPaymentDetailV2Passport',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SupplyPaymentDetailV2Structure', ['SupplyPaymentDetailV2Resources'], function(resources) {return {schemaUId:'a8680480-6b02-43bb-b781-ea366ff7b698',schemaCaption: "Installment plan detail", parentSchemaName: "SupplyPaymentDetailV2Passport", schemaName:'SupplyPaymentDetailV2',parentSchemaUId:'efa63fa5-d3d2-404a-840e-62b884827a87',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SupplyPaymentDetailV2Passport",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SupplyPaymentDetailV2PassportResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SupplyPaymentDetailV2Passport", ["ConfigurationConstants", "OrderConfigurationConstants", "ConfigurationEnums",
			"SupplyPaymentGridButtonsUtility", "Order", "SupplyPaymentDetailV2Resources", "InvoiceProduct",
			"ProductUtilitiesV2", "ConfigurationGrid", "ConfigurationGridGenerator", "ConfigurationGridUtilities",
			"css!SupplyPaymentGridButtonsUtility", "OrderUtilities", "MoneyUtilsMixin"],
		function(ConfigurationConstants, OrderConfigurationConstants, enums, GridButtonsUtil, Order, resources,
				InvoiceProductSchema, ProductUtilities) {
			/**
			 * Result type.
			 * @enum
			 */
			var result = {
				NoError: 0,
				NoItems: 1,
				TypeNotMatch: 2,
				ExistInvoice: 3
			};
			/**
			 * Object name for generation.
			 * @enum
			 */
			var entityName = {
				Invoice: "Invoice",
				Contract: "Contract"
			};
			return {
				entitySchemaName: "SupplyPaymentElement",
				attributes: {
					"IsEditable": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: true
					},
					"ActiveRow": {
						dataValueType: Terrasoft.DataValueType.GUID,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					"State": {
						dataValueType: Terrasoft.DataValueType.LOOKUP
					},
					"NeedReloadGridData": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: false
					}
				},
				messages: {

					/**
					 * @message ReloadSupplyPaymentGridData
					 * Reload supply payment data.
					 */
					"ReloadSupplyPaymentGridData": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message CreateSupplyPaymentInvoice
					 * Create invoice for supply payment.
					 */
					"CreateSupplyPaymentInvoice": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.BIDIRECTIONAL
					},

					/**
					 * @message GetModuleInfo
					 * Returns module information.
					 */
					"GetModuleInfo": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GetOrderAmount
					 * Returns order amount.
					 */
					"GetOrderAmount": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					}
				},

				/**
				 * ######-#######, ########### ################ ####### #####.
				 */
				mixins: {
					ConfigurationGridUtilites: "Terrasoft.ConfigurationGridUtilities",
					OrderUtilities: "Terrasoft.OrderUtilities",
					MoneyUtilities: "Terrasoft.MoneyUtilsMixin"
				},
				methods: {
					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#subscribeSandboxEvents
					 */
					subscribeSandboxEvents: function() {
						this.callParent(arguments);
						this.sandbox.subscribe("ReloadSupplyPaymentGridData", function() {
							this.set("ActiveRow", null);
							this.set("OldActiveRow", null);
							this.reloadGridData();
						}, this);
						this.sandbox.subscribe("GetModuleInfo", function() {
							var activeRowId = this.get("CurrentRowId");
							if (activeRowId) {
								return {
									schemaName: "SupplyPaymentProductDetailModalBox",
									supplyPaymentElementId: activeRowId
								};
							}
						}, this, [this.getModalBoxProductDetailId()]);
						this.sandbox.subscribe("RerenderDetail", function(config) {
							if (this.viewModel) {
								var renderTo = this.Ext.get(config.renderTo);
								if (renderTo) {
									if (this.view) {
										this.view.destroyed = true;
									}
									this.render(renderTo);
									return true;
								}
							}
						}, this, [this.sandbox.id]);
						if (this.getIsFeatureEnabled("UseLookupInvoiceForSupplyPaymentDetail")) {
							this.sandbox.subscribe("CreateSupplyPaymentInvoice", function() {
								var row = this.getActiveRow();
								this.asyncGenerateInvoices([row]);
							}, this, [this.sandbox.id]);
						}
					},

					/**
					 * ########## ############# sandbox ### ###### "########" ######## # ######### ####.
					 * @return {String}
					 */
					getModalBoxProductDetailId: function() {
						return this.sandbox.id + "_SupplyPaymentProductDetailModalBox";
					},

					/**
					 * ######### # ###### #######, ####### ########## ######### ### ########### ## #######.
					 * @protected
					 * @param {Terrasoft.EntitySchemaQuery} esq ###### ## ######## ###### #######.
					 */
					addRequiredColumns: function(esq) {
						esq.addColumn("State");
						esq.addColumn("Order");
						var orderColumns = Order.columns;
						var requiredOrderColumns = ["Contract", "Contact", "Account", "Currency", "CurrencyRate",
							"Opportunity"];
						this.Terrasoft.each(requiredOrderColumns, function(columnName) {
							if (orderColumns[columnName]) {
								esq.addColumn("Order." + columnName);
								if (columnName === "Currency") {
									esq.addColumn("Order.Currency.Division");
								}
							}
						}, this);
						esq.addColumn("AmountPlan");
						esq.addColumn("Contract");
						esq.addColumn("Invoice");
						esq.addColumn("Invoice.PaymentStatus");
						esq.addColumn("Order.Amount", "OrderAmount");
						esq.addColumn("PreviousElement.DatePlan", "PreviousElement.DatePlan");
						esq.addColumn("PreviousElement.DateFact", "PreviousElement.DateFact");
						esq.addColumn("PreviousElement.State", "PreviousElement.State");
					},

					/**
					 * @inheritDoc Terrasoft.configuration.mixins.GridUtilities#getGridDataColumns
					 * @protected
					 * @overridden
					 */
					getGridDataColumns: function() {
						var baseGridDataColumns = this.callParent(arguments);
						var gridDataColumns = {
							"DatePlan": {
								path: "DatePlan",
								orderPosition: 0,
								orderDirection: this.Terrasoft.OrderDirection.ASC
							},
							"DateFact": {
								path: "DateFact",
								orderPosition: 1,
								orderDirection: this.Terrasoft.OrderDirection.ASC
							},
							"CreatedOn": {
								path: "CreatedOn",
								orderPosition: 2,
								orderDirection: this.Terrasoft.OrderDirection.ASC
							}
						};
						return Ext.apply(baseGridDataColumns, gridDataColumns);
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#addGridDataColumns
					 * @overridden
					 */
					addGridDataColumns: function(esq) {
						this.callParent(arguments);
						this.addRequiredColumns(esq);
						GridButtonsUtil.instance.addGridDataColumns(esq);
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#prepareResponseCollectionItem
					 * @overridden
					 */
					prepareResponseCollectionItem: function(item) {
						this.mixins.GridUtilities.prepareResponseCollectionItem.apply(this, arguments);
						GridButtonsUtil.instance.prepareResponseCollectionItem(item, this);
						if (item.isNewMode()) {
							var amount = this.sandbox.publish("GetOrderAmount", null, [this.sandbox.id]);
							item.set("OrderAmount", amount);
						}
						item.initSupplyPaymentData();
					},

					/**
					 * @inheritdoc Terrasoft.ConfigurationGridUtilites#getCellControlsConfig
					 * @overridden
					 */
					getCellControlsConfig: function(entitySchemaColumn) {
						var controlsConfig = GridButtonsUtil.instance.getCellControlsConfig(entitySchemaColumn);
						if (!controlsConfig) {
							controlsConfig =
									this.mixins.ConfigurationGridUtilites.getCellControlsConfig.apply(this, arguments);
							if (entitySchemaColumn.name === "Percentage") {
								controlsConfig.controlConfig = {
									tips: [{
										tip: {
											content: {"bindTo": "getPercentageHint"},
											displayMode: this.Terrasoft.TipDisplayMode.NARROW,
											markerValue: {"bindTo": "getPercentageHint"}
										},
										settings: {
											alignEl: "disabledElIconEl"
										}
									}]
								};
							}
						}
						return controlsConfig;
					},

					/**
					 * @inheritdoc Terrasoft.ConfigurationGridUtilites#onGridClick
					 * @overridden
					 */
					onGridClick: function() {
						if (this.get("IsButtonClicked")) {
							this.set("IsButtonClicked", false);
						} else {
							this.mixins.ConfigurationGridUtilites.onGridClick.apply(this, arguments);
						}
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#linkClicked
					 * @overridden
					 */
					linkClicked: function(recordId, columnName) {
						var eventResult = false;
						try {
							this.set("CurrentRowId", recordId);
							if (columnName === "Products") {
								this.openProductsWindow();
							} else if (columnName === "Invoice") {
								var data = this.getGridData();
								var row = data.get(recordId);
								this.onInvoiceButtonClick(row);
							}
						} catch (exception) {
							this.log(exception, this.Terrasoft.LogMessageType.ERROR);
						}
						this.set("IsButtonClicked", true);
						return eventResult;
					},

					/**
					 * ############ #### ## ###### ####### "########" # ####### ###### (# ###### ############## ######).
					 * @protected
					 * @param {Terrasoft.BasePageV2ViewModel} item ###### ############# ######## ###### #######.
					 */
					onProductsButtonClick: function(item) {
						this.set("CurrentRowId", this.get("ActiveRow"));
						this.saveIfNeedAndProceed(item, this.openProductsWindow, this);
					},

					/**
					 * ############ ####### ## ###### #######.
					 * @param {Terrasoft.BasePageV2ViewModel} item ###### ############# ######## ###### #######.
					 */
					onClearProductsButtonClick: function(item) {
						this.saveIfNeedAndProceed(item, this.clearSupplyPaymentElementProducts, this);
					},

					/**
					 * #########, ### #############, ########## ######  # ######## ##### ######### ######.
					 * @param {Terrasoft.BasePageV2ViewModel} item ###### ############# ######## ###### #######.
					 * @param {Function} callback ####### ######### ######.
					 * @param {Object} scope ######## ##########.
					 */
					saveIfNeedAndProceed: function(item, callback, scope) {
						if (!item) {
							return;
						}
						if (item.isChanged()) {
							item.save({
								isSilent: true,
								scope: this,
								callback: function() {
									callback.call(scope, item);
								}
							});
						} else {
							callback.call(scope, item);
						}
					},

					/**
					 * ####### ######## #### ####### ######## # #####.
					 * @param {Terrasoft.BaseModel} row  ###### ############# ###### #######.
					 */
					clearSupplyPaymentElementProducts: function(row) {
						var rowId = row.get("Id");
						this.callService({
							serviceName: "OrderPassportService",
							methodName: "ClearSupplyPaymentProducts",
							data: {
								"supplyPaymentElementId": rowId
							}
						}, function(response) {
							var result = response.ClearSupplyPaymentProductsResult || {};
							if (!result.success) {
								if (result.errorInfo) {
									this.showInformationDialog(result.errorInfo.message);
								} else {
									throw new Terrasoft.UnknownException();
								}
							}
							this.reloadGridData();
						}, this);
					},

					/**
					 * ############ #### ## ###### ####### "####" # ####### ###### (# ###### ############## ######).
					 * @protected
					 * param {Object} row ###### ############# ###### #######.
					 */
					onInvoiceButtonClick: function(row) {
						var invoice = row.get("Invoice");
						if (invoice && this.Terrasoft.isGUID(invoice.value)) {
							this.openInvoicePage(invoice.value);
							return;
						}
						if (!this.getIsFeatureEnabled("UseLookupInvoiceForSupplyPaymentDetail")) {
							if (row.isChanged()) {
								row.save({
									isSilent: true,
									scope: this,
									callback: this.asyncGenerateInvoices.bind(this, [row])
								});
							} else {
								this.asyncGenerateInvoices([row]);
							}
						}
					},

					/**
					 * ######### ######## ############## #####.
					 * @param {Guid} invoiceId Id #####.
					 */
					openInvoicePage: function(invoiceId) {
						var config = {
							schemaName: "InvoicePageV2",
							operation: enums.CardStateV2.EDIT,
							id: invoiceId,
							moduleId: this.getInviocePageSandboxId()
						};
						this.sandbox.publish("OpenCard", config, [this.sandbox.id]);
					},

					/**
					 * ########## ### ######## #####.
					 * @return {String}
					 */
					getInviocePageSandboxId: function() {
						return this.sandbox.id + "_InvoicePageV2";
					},

					/**
					 * ######### #### ############## ######### ####.
					 * @protected
					 */
					openProductsWindow: function() {
						this.sandbox.loadModule("ModalBoxSchemaModule", {id: this.getModalBoxProductDetailId()});
					},

					/**
					 * @inheritdoc Terrasoft.BaseDetailV2#init
					 * @overridden
					 */
					init: function(callback, scope) {
						GridButtonsUtil.init({
							Ext: this.Ext,
							Terrasoft: this.Terrasoft
						});
						this.callParent([
							function() {
								this.initProductUtilities(callback, scope);
							}, this
						]);
						this.set("isCollapsed", false);
						this.Terrasoft.chain(this.initDefTemplate, this.initItemTemplates, this);
						this.initValidateActions();
					},

					/**
					 * ############# #######.
					 * @protected
					 */
					initValidateActions: function() {
						var config = {
							getId: function() {
								return this.get("ActiveRow");
							},
							name: "Id"
						};
						this.deleteRecords = this.needToChangeInvoice(config, this.deleteRecords, this);
						this.editRecord = this.needToChangeInvoice(config, this.editRecord, this);
						this.addRecord = this.needToChangeInvoice(config, this.addRecord, this);
						this.copyRecord = this.needToChangeInvoice(config, this.copyRecord, this);
						this.openProductsWindow = this.needToChangeInvoice({
							getId: function() {
								return this.get("CurrentRowId");
							},
							name: "Id"
						}, this.openProductsWindow, this);
					},

					/**
					 * inheritdoc Terrasoft.GridUtilitiesV2#createViewModel
					 * @overridden
					 */
					createViewModel: function(config) {
						this.callParent(arguments);
						this.updateViewModel(config.viewModel);
					},

					/**
					 * ########### ###### ############# ### ############## #######.
					 * @param {Object} viewModel ##### ###### #############.
					 */
					updateViewModel: function(viewModel) {
						viewModel.save = this.needToChangeInvoice({
							getId: function() {
								return this.get("Id");
							},
							name: "Id",
							validateColumns: ["AmountPlan"]
						}, viewModel.save.bind(viewModel), this);
					},

					/**
					 * ####### ######### ####### ### ######## ######## #######.
					 * @protected
					 * @return {Terrasoft.EntitySchemaQuery} ######### ####### ### ######## ######## #######.
					 */
					getTemplateNamesEsq: function() {
						var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "SupplyPaymentTemplate"
						});
						esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
						var nameColumn = esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name");
						nameColumn.orderDirection = Terrasoft.core.enums.OrderDirection.ASC;
						nameColumn.orderPosition = 1;
						return esq;
					},

					/**
					 * Returns new record menu item.
					 * @private
					 * @return {Terrasoft.BaseViewModel}
					 */
					getNewRecordMenuItem: function() {
						var newRecordMenuItem = this.getButtonMenuItem({
							Caption: this.get("Resources.Strings.NewStageButtonCaption"),
							Click: {"bindTo": "addTemplateItemRecord"}
						});
						return newRecordMenuItem;
					},

					/**
					 * ############## ######### ######### #### ###### ######### ## #######.
					 * @protected
					 */
					initItemTemplates: function() {
						var templateCollection = Ext.create("Terrasoft.BaseViewModelCollection");
						templateCollection.add(this.getNewRecordMenuItem());
						templateCollection.add(this.getButtonMenuSeparator({
							Caption: this.get("Resources.Strings.SetTemplateButtonCaption")
						}));
						var esq = this.getTemplateNamesEsq();
						esq.getEntityCollection(function(response) {
							if (response.success) {
								response.collection.each(function(template) {
									var id = template.get("Id");
									templateCollection.add(id, this.getButtonMenuItem({
										Id: id,
										Caption: template.get("Name"),
										Click: {bindTo: "setTemplate"},
										Tag: id
									}));
								}, this);
								this.set("TemplatesExists", response.collection.getCount() > 0);
							}
							this.set("ItemTemplates", templateCollection);
						}, this);
					},

					/**
					 * ############## ######## ######### ######### "###### ######## ###### ## #########".
					 * @param {Function} next ####### ######### ######.
					 */
					initDefTemplate: function(next) {
						this.Terrasoft.SysSettings.querySysSettingsItem("OrderPassportTemplateDef", function(value) {
									this.set("OrderPassportTemplateDef", value);
									next();
								},
								this);
					},

					/**
					 * ######### ### ############# ##### # ######### ######### ###### #######.
					 * @protected
					 * @param {String} tag Id #######.
					 */
					setTemplate: function(tag) {
						var isNewRecord = this.getIsNewMasterRecord();
						if (!isNewRecord) {
							this.setTemplateWithCheck(tag);
						} else {
							this.set("SetTemplateRecordId", tag);
							var args = {
								isSilent: true,
								messageTags: [this.sandbox.id]
							};
							this.turnDefPassportTemplateOff(function() {
								this.sandbox.publish("SaveRecord", args, [this.sandbox.id]);
							}.bind(this));
						}
					},

					/**
					 * @inheritdoc Terrasoft.BaseDetailV2#onCardSaved
					 * @overridden
					 */
					onCardSaved: function() {
						var setTemplateRecordId = this.get("SetTemplateRecordId");
						if (setTemplateRecordId) {
							this.set("SetTemplateRecordId", null);
							this.setTemplateWithCheck(setTemplateRecordId);
						} else {
							var needRefresh = this.get("NeedRefreshAfterPageSaved");
							if (needRefresh) {
								this.set("NeedRefreshAfterPageSaved", false);
								this.set("AddRowOnDataChangedConfig", {callback: this.onCardSaved, scope: this});
								this.reloadGridData();
							} else {
								this.callParent(arguments);
							}
						}
					},

					/**
					 * @inheritdoc Terrasoft.BaseDetailV2#onGridDataLoaded
					 * @overridden
					 */
					onGridDataLoaded: function() {
						this.callParent(arguments);
						var addRowConfig = this.get("AddRowOnDataChangedConfig");
						if (addRowConfig) {
							this.set("AddRowOnDataChangedConfig", null);
							if (this.Ext.isFunction(addRowConfig.callback)) {
								addRowConfig.callback.call(addRowConfig.scope || this);
							}
						}
					},

					/**
					 * ######## ##### ######### ####### ####### ### ####### OrderPassportService.
					 * @protected
					 * @param {String} tag Id #######.
					 */
					setTemplateWithCheck: function(tag) {
						var orderId = this.get("MasterRecordId");
						this.Terrasoft.chain(
								function(next) {
									var data = this.getGridData();
									if (data.getCount() === 0) {
										next();
									} else {
										this.showConfirmationDialog(this.get("Resources.Strings.SetTemplateActionWarning"),
												function(returnCode) {
													if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
														this.set("IsGridLoading", true);
														next();
													}
												},
												[this.Terrasoft.MessageBoxButtons.YES.returnCode, this.Terrasoft.MessageBoxButtons.NO.returnCode],
												null);
									}
								},
								function() {
									this.callService({
										serviceName: "OrderPassportService",
										methodName: "ChangeTemplate",
										data: {
											"orderId": orderId,
											"templateId": tag
										}
									}, this.onTemplateChanged, this);
								},
								this);
					},

					/**
					 * ########## ####### ####, ### ######, ######## # ######## ##############, ### ## #### #########.
					 * @protected
					 * @returns {Boolean} ####### ####, ### ######, ######## # ######## ##############, ### ## #### #########.
					 */
					getIsNewMasterRecord: function() {
						var cardState = this.sandbox.publish("GetCardState", null, [this.sandbox.id]);
						var isNew = (cardState.state === enums.CardStateV2.ADD || cardState.state === enums.CardStateV2.COPY);
						return isNew;
					},

					/**
					 * ######### ###### ## ######. #### ######, # ####### ######### ###### ## #########, #########
					 * ##########.
					 * @protected
					 */
					addTemplateItemRecord: function() {
						var args = arguments;
						var isNew = this.getIsNewMasterRecord();
						var isDefTemplateExists = Boolean(this.get("OrderPassportTemplateDef"));
						if (!isNew || !isDefTemplateExists) {
							this.addRecord(args);
						} else {
							this.Terrasoft.chain(
									function(next) {
										this.showConfirmationDialog(this.get("Resources.Strings.ThereIsDefTemplateWarning"),
												function(returnCode) {
													if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
														this.turnDefPassportTemplateOff(next);
													} else {
														this.set("NeedRefreshAfterPageSaved", true);
														next();
													}
												}, [this.Terrasoft.MessageBoxButtons.YES.returnCode,
													this.Terrasoft.MessageBoxButtons.NO.returnCode],
												null);
									},
									function() {
										this.addRecord(args);
									},
									this
							);
						}
					},

					/**
					 * @inheritdoc Terrasoft.ConfigurationGridUtilities#getAddItemsToGridDataOptions
					 * @overridden
					 */
					getAddItemsToGridDataOptions: function() {
						return {
							mode: "bottom"
						};
					},

					/**
					 * ######### ######## ######### ####### ######## # ##### ## ####### ## ######### #########.
					 * @param {Function} next ####### ######### ######.
					 */
					turnDefPassportTemplateOff: function(next) {
						var orderId = this.get("MasterRecordId");
						this.callService({
							serviceName: "OrderPassportService",
							methodName: "TurnDefPassportTemplateOff",
							data: {
								"orderId": orderId
							}
						}, function() {
							next();
						}, this);
					},

					/**
					 * ############ ##### ## ####### ## ######### #######.
					 * ######### ###### ## ###### # ###### ######, #### ####### ######### # #######.
					 * @protected
					 * @param {Object} response ##### ## #######.
					 */
					onTemplateChanged: function(response) {
						this.set("IsGridLoading", false);
						if (response && response.ChangeTemplateResult) {
							var result = response.ChangeTemplateResult;
							if (result.success) {
								this.set("ActiveRow", null);
								this.fireDetailChanged(null);
								this.reloadGridData();
							} else if (result.errorInfo) {
								var errorData = {
									IsDbOperationException: result.errorInfo.errorCode === "DbOperationException",
									ExceptionMessage: result.errorInfo.message
								};
								this.showDeleteExceptionMessage(errorData);
							}
						}
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetail#fireDetailChanged
					 * @override
					 */
					fireDetailChanged: function() {
						if (this.get("SaveOnClosePage") !== true) {
							this.callParent(arguments);
						}
					},

					/**
					 * Returns availability sign for the tools button menu items.
					 * @protected
					 * @return {Boolean} Availability sign.
					 */
					getEnableMenuActions: function() {
						if (this.getEditRecordButtonEnabled()) {
							var notAllowed = ConfigurationConstants.SupplyPayment.StateFinished;
							var record = this.getActiveRow();
							var status = record.get("State");
							return (status.value !== notAllowed);
						}
						return false;
					},

					/**
					 * @inheritDoc Terrasoft.Configuration.BaseDetailV2#updateDetail
					 * @overridden
					 */
					updateDetail: function(config) {
						if (!config.reloadAll) {
							this.fireDetailChanged(null);
							config.reloadAll = true;
						}
						this.callParent([config]);
					},

					/**
					 * ######## ######### ###### #### ### ######### #####, # ########### ## ######## #### #######.
					 * @protected
					 * @return {Boolean}
					 */
					getGenerateButtonsVisible: function() {
						return !this.get("MultiSelect");
					},

					/**
					 * Generate button handler.
					 * @private
					 */
					generateButtonClick: function() {
						var entity = arguments[arguments.length - 1]; // ### ########## ######### ##########
						this.showConfirmationDialog(this.get("Resources.Strings.Create" + entity),
								function(dialogResult) {
									if (dialogResult === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
										var collection = this.getGridData();
										var selectedRows;
										if (this.get("MultiSelect")) {
											selectedRows = this.get("SelectedRows") ? this.get("SelectedRows") : [];
										} else {
											selectedRows = this.get("ActiveRow") ? [this.get("ActiveRow")] : [];
										}

										if (!selectedRows.length) {
											this.validateResult({error: result.NoItems});
											return;
										}

										var filteredCollection = [];
										Terrasoft.each(selectedRows, function(row) {
											var item = collection.get(row);
											if (this.checkSupplyPaymentType(item, entity)) {
												filteredCollection.push(item);
											}
										}, this);

										if (!filteredCollection.length) {
											this.validateResult({error: result.TypeNotMatch, entity: entity});
											return;
										}

										this.asyncGenerateInvoices(filteredCollection);
									}
								},
								["yes", "no"]
						);
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#sortColumn
					 * @overridden
					 */
					sortColumn: this.Terrasoft.emptyFn,

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getGridSortMenuItem
					 * @overridden
					 */
					getGridSortMenuItem: this.Terrasoft.emptyFn,

					/**
					 * Async invoice generation.
					 * @private
					 * @param {Array} collection Supply payment elements.
					 */
					asyncGenerateInvoices: function(collection) {
						collection = collection || [];
						this.index = 0;
						this.existInvoiceCount = 0;
						collection.forEach(function(item) {
							var methods = [];
							methods.push(function(next) {
								this.generateInvoice(next, item);
							});
							methods.push(this.hideBodyMask);
							methods.push(this);
							this.showBodyMask();
							Terrasoft.chain.apply(this, methods);
						}, this);
					},

					/**
					 * Generates invoice.
					 * @protected
					 * @virtual
					 * @param {Function} next Next chain f-n.
					 * @param {Terrasoft.BaseViewModel} item Row item.
					 */
					generateInvoice: function(next, item) {
						var invoice = item.get("Invoice");
						if ((invoice === null && this.getIsFeatureEnabled("UseLookupInvoiceForSupplyPaymentDetail")) ||
							(invoice && this.Terrasoft.isGUID(invoice.value))) {
							this.existInvoiceCount++;
							this.validateResult({
								error: result.ExistInvoice,
								existInvoiceCount: this.existInvoiceCount
							});
							next();
						} else {
							this.setAdditionAttributes(next, item);
						}
					},

					/**
					 * Sets additional attributes to row item.
					 * @protected
					 * @virtual
					 * @param {Function} next Next chain f-n.
					 * @param {Terrasoft.BaseViewModel} item Row item.
					 */
					setAdditionAttributes: function(next, item) {
						this.getIncrementCode(function(result) {
							item.set("Number", result);
							item.set("StartDate", new Date());
							var esq = this.getSupplyPaymentProductEntitySchemaQuery(item.get("Id"));
							esq.getEntityCollection(function(response) {
								if (response.success) {
									item.set("ProductCollection", response.collection);
									this.insertInvoice(next, item);
								}
							}, this);
						}, this);
					},

					/**
					 * Inserts invoice products.
					 * @protected
					 * @virtual
					 * @param {Function} nextParrent Next chain f-n.
					 * @param {Object} config Row item config.
					 */
					insertInvoiceProducts: function(nextParrent, config) {
						var productsMethods = [];
						Terrasoft.each(config.products.getItems(), function() {
							productsMethods.push(function(next, i) {
								if (!i) {
									i = 0;
								}
								var insert = this.getInvoiceProductInsertQuery(config, i);
								insert.execute(function(response) {
									if (response.success) {
										i++;
										next(i);
									}
								}, this);
							});
						}, this);
						productsMethods.push(function() {
							this.updateSupplyPaymentElement(nextParrent, config);
						});
						productsMethods.push(this);
						Terrasoft.chain.apply(this, productsMethods);
					},

					/**
					 * Updates supply payment row element.
					 * @protected
					 * @virtual
					 * @param {Function} next Next chain f-n.
					 * @param {Object} config Row item config.
					 */
					updateSupplyPaymentElement: function(next, config) {
						var update = this.getSupplyPaymentElementUpdateQuery(config);
						update.execute(function(response) {
							if (response.success) {
								this.updateDetail({primaryColumnValue: config.id});
								this.openInvoicePage(config.invoiceId);
								next();
							}
						}, this);
					},

					/**
					 * Inserts invoice.
					 * @protected
					 * @virtual
					 * @param {Function} next Next chain f-n.
					 * @param {Terrasoft.BaseViewModel} item Row item.
					 */
					insertInvoice: function(next, item) {
						var insert = this.getInvoiceInsertQuery(item);
						insert.execute(function(response) {
							if (response.success) {
								var config = {
									invoiceId: response.id,
									id: item.get("Id"),
									amount: item.get("AmountPlan"),
									number: item.get("Number"),
									startDate: item.get("StartDate"),
									products: item.get("ProductCollection")
								};
								var invoice = {
									displayValue: item.get("Number"),
									value: response.id
								};
								item.set("Invoice", invoice);
								if (config.products.getCount() === 0) {
									this.updateSupplyPaymentElement(next, config);
								} else {
									this.insertInvoiceProducts(next, config);
								}
							} else {
								var message = this.generateInvoiceErrorMessage(response);
								this.showErrorMessage(message);
							}
						}, this);
					},

					/**
					 * Generates invoice creation error message.
					 * @param response
					 * @param callback
					 * @param scope
					 */
					generateInvoiceErrorMessage: function(response) {
						var message = response.errorInfo && response.errorInfo.message;
						message = this.Ext.String.format(this.get("Resources.Strings.InvoiceInsertError"),
								message, this.getInvoiceErrorUrl());
						return message;
					},

					/**
					 * Returns invoice error article url.
					 * @return {String} Academy article url.
					 */
					getInvoiceErrorUrl: function() {
						return resources.localizableStrings.InvoiceErrorArticleUrl;
					},

					/**
					 * Show error message in dialog window.
					 * @protected
					 * @param {String} message Error message.
					 */
					showErrorMessage: function(message) {
						var messageConfig = {
							caption: message,
							buttons: ["ok"],
							defaultButton: 0,
							style: Terrasoft.MessageBoxStyles.BLUE,
							useHtmlContent: true
						};
						this.Terrasoft.utils.showMessage(messageConfig);
						this.hideBodyMask();
					},

					/**
					 * ######### # ######### ####### #######.
					 * @private
					 * @param {Guid} id ############# #### ####### ######## # #####.
					 * @return {Terrasoft.EntitySchemaQuery} esq ###### ######### ######### ## #### ######.
					 */
					getSupplyPaymentProductEntitySchemaQuery: function(id) {
						var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "SupplyPaymentProduct"
						});
						esq.addColumn("Product.Product", "Product");
						esq.addColumn("Product.Name", "Name");
						esq.addColumn("Product.Price", "Price");
						esq.addColumn("Product.DiscountPercent", "DiscountPercent");
						esq.addColumn("Product.Tax", "Tax");
						esq.addColumn("Product.DiscountTax", "DiscountTax");
						esq.addColumn("Product.Amount", "Amount");
						esq.addColumn("Product.DiscountAmount", "DiscountAmount");
						esq.addColumn("Product.TaxAmount", "TaxAmount");
						esq.addColumn("Product.Unit", "Unit");
						esq.addColumn("Quantity");
						esq.addColumn("BaseQuantity");
						esq.addColumn("Amount", "TotalAmount");
						esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "SupplyPaymentElement", id));
						return esq;
					},

					/**
					 * ######### # ######### ####### #######.
					 * @private
					 * @param {Object} config.
					 * @return {Terrasoft.UpdateQuery} update ###### ######### #### ######.
					 */
					getSupplyPaymentElementUpdateQuery: function(config) {
						var update = this.Ext.create("Terrasoft.UpdateQuery", {
							rootSchemaName: "SupplyPaymentElement"
						});
						update.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "Id", config.id));
						update.setParameterValue("Invoice", config.invoiceId, this.Terrasoft.DataValueType.GUID);
						return update;
					},

					/**
					 * @inheritDoc Terrasoft.GridUtilitiesV2#onDeleted
					 * @overridden
					 */
					onDeleted: function() {
						this.updateDetail({});
						this.mixins.GridUtilities.onDeleted.apply(this, arguments);
					},

					/**
					 * @inheritDoc Terrasoft.BaseGridDetailV2#getUpdateDetailSandboxTags
					 * @overridden
					 */
					getUpdateDetailSandboxTags: function() {
						var tags = this.callParent(arguments);
						return tags.concat(this.getInviocePageSandboxId());
					},

					/**
					 * @inheritDoc Terrasoft.ConfigurationGridUtilities#activeRowSaved
					 * @overridden
					 */
					activeRowSaved: function(activeRow, callback, scope) {
						callback = callback || this.Ext.emptyFn;
						scope = scope || this;
						var newArguments = [activeRow, this.checkAndDivideProducts.bind(this, activeRow, callback, scope), this];
						this.mixins.ConfigurationGridUtilites.activeRowSaved.apply(this, newArguments);
					},

					/**
					 * ######### ############# ########## #########.
					 * @param {Object} row ###### #######.
					 * @param {Function} callback ####### ######### ######.
					 * @param {Object} scope ######## ##########.
					 */
					checkAndDivideProducts: function(row, callback, scope) {
						var contract;
						if (row) {
							contract = row.get("Contract");
						}
						if (!row || !contract || !contract.value) {
							callback.call(scope);
							return;
						}
						var divideProductData = {
							supplyPaymentProductId: row.get("Id"),
							contractId: contract.value
						};
						var config = {
							serviceName: "SupplyPaymentService",
							methodName: "NeedDivideProduct",
							data: divideProductData
						};
						this.callService(config, function(response) {
							if (response && response.NeedDivideProductResult) {
								this.onDivideProductNecessary(divideProductData, callback, scope);
							} else {
								callback.call(scope);
							}
						}, this);
					},

					/**
					 * ###### ############# ############ ## ########## ######### ## ###### #########.
					 * @param {Object} divideProductData ######### ######## ####.
					 * @param {Guid} divideProductData.supplyPaymentProductId Id ######## ####.
					 * @param {Guid} divideProductData.contractId Id ######## ######## ####.
					 * @param {Function} callback ####### ######### ######.
					 * @param {Object} scope ######## ##########.
					 */
					onDivideProductNecessary: function(divideProductData, callback, scope) {
						this.showConfirmation(
								this.get("Resources.Strings.DivideProduct"),
								function(buttonCode) {
									if (buttonCode === "ok") {
										this.onDivideProductsAccepted(divideProductData, callback, scope);
									} else {
										callback.call(scope);
									}
								},
								["ok", "cancel"],
								this
						);
					},

					/**
					 * ######### ######## ## #########.
					 * @param {Object} divideProductData ######### ######## ####.
					 * @param {Guid} divideProductData.supplyPaymentProductId Id ######## ####.
					 * @param {Guid} divideProductData.contractId Id ######## ######## ####.
					 * @param {Function} callback ####### ######### ######.
					 * @param {Object} scope ######## ##########.
					 */
					onDivideProductsAccepted: function(divideProductData, callback, scope) {
						var config = {
							serviceName: "SupplyPaymentService",
							methodName: "DivideProduct",
							data: divideProductData
						};
						this.callService(config, function() {
							this.fireDetailChanged(null);
							callback.call(scope);
						}, this);
					},

					/**
					 * ############# ###########.
					 * @private
					 * @param {Object} config ###### ### #########.
					 */
					validateResult: function(config) {
						var resultText = "";
						switch (config.error) {
							case result.NoError:
								resultText = Ext.String.format(this.get("Resources.Strings.InvoicesCreated"),
										"\n\t", config.invoicesCount);
								if (config.existInvoiceCount) {
									resultText += this.get("Resources.Strings.ExistInvoice");
								}
								break;
							case result.NoItems:
								resultText = this.get("Resources.Strings.NoItems");
								break;
							case result.TypeNotMatch:
								resultText = Ext.String.format(this.get("Resources.Strings.TypeNotMatch"),
										this.get("Resources.Strings." + config.entity),
										config.entity === entityName.Invoice
												? this.get("Resources.Strings.Payment")
												: this.get("Resources.Strings.Delivery"));
								break;
							case result.ExistInvoice:
								resultText = this.get("Resources.Strings.ExistInvoice");
								break;
						}
						if (resultText) {
							this.showInformationDialog(resultText);
						}
					},

					/**
					 * ######## #### ######.
					 * @private
					 * @param {Object} item #######, # ######## ########## ######### ###.
					 * @param {Enum} entity ### #######.
					 * @return {Boolean}
					 */
					checkSupplyPaymentType: function(item, entity) {
						var result = GridButtonsUtil.instance.getIsPayment(item);
						return (entity === entityName.Invoice) ? result : !result;
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
					 * Creates Invoice insert request.
					 * @private
					 * @param {Terrasoft.BaseViewModel} item ViewModel with Invoice request generation properties.
					 * @return {Terrasoft.InsertQuery}
					 */
					getInvoiceInsertQuery: function(item) {
						var insert = this.Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: "Invoice"
						});
						insert.setParameterValue("Number", item.get("Number"), this.Terrasoft.DataValueType.TEXT);
						insert.setParameterValue("Order", item.get("Order").value, this.Terrasoft.DataValueType.GUID);
						var opportunity = this.getColumnData("Order", "Opportunity", item);
						if (opportunity) {
							insert.setParameterValue("Opportunity", opportunity.value,
									this.Terrasoft.DataValueType.GUID);
						}
						var contact = this.getColumnData("Order", "Contact", item);
						if (contact) {
							insert.setParameterValue("Contact", contact.value,
									this.Terrasoft.DataValueType.GUID);
						}
						var account = this.getColumnData("Order", "Account", item);
						if (account) {
							insert.setParameterValue("Account", account.value,
									this.Terrasoft.DataValueType.GUID);
						}
						var currency = this.getColumnData("Order", "Currency", item);
						if (currency) {
							insert.setParameterValue("Currency", currency.value,
									this.Terrasoft.DataValueType.GUID);
						}
						var currencyRate = this.getColumnData("Order", "CurrencyRate", item);
						if (currency) {
							insert.setParameterValue("CurrencyRate", currencyRate,
									this.Terrasoft.DataValueType.FLOAT);
						}
						insert.setParameterValue("Owner", Terrasoft.SysValue.CURRENT_USER_CONTACT.value,
								this.Terrasoft.DataValueType.GUID);
						var supplier = this.Terrasoft.SysValue.CURRENT_USER_ACCOUNT.value;
						if (!this.Terrasoft.isEmptyGUID(supplier)) {
							insert.setParameterValue("Supplier", supplier,
									this.Terrasoft.DataValueType.GUID);
						}
						insert.setParameterValue("StartDate", item.get("StartDate"), this.Terrasoft.DataValueType.DATE);
						if (item.get("ProductCollection").getCount() === 0) {
							this.recalculatePrimaryValue("AmountPlan", {
								modelInstance: item,
								primaryValueAttribute: "PrimaryAmount"
							});
							var primaryAmount = item.get("PrimaryAmount");
							insert.setParameterValue("PrimaryAmount", primaryAmount,
									this.Terrasoft.DataValueType.FLOAT);
							insert.setParameterValue("Amount", item.get("AmountPlan"),
									this.Terrasoft.DataValueType.FLOAT);
						}
						return insert;
					},

					/**
					 * ######### ###### #####.
					 * @private
					 * @param {Function} callback ####### ######### ######.
					 * @param {Object} scope ######## ####### ######### ######.
					 */
					getIncrementCode: function(callback, scope) {
						var config = {
							serviceName: "SysSettingsService",
							methodName: "GetIncrementValueVsMask",
							data: {
								sysSettingName: "InvoiceLastNumber",
								sysSettingMaskName: "InvoiceCodeMask"
							}
						};
						this.callService(config, function(response) {
							callback.call(this, response.GetIncrementValueVsMaskResult);
						}, scope || this);
					},

					/**
					 * Initialize product utilities.
					 * @param {Function} callback Callback function.
					 * @param {Object} [scope] Execution context.
					 * @protected
					 */
					initProductUtilities: function(callback, scope) {
						this.Terrasoft.SysSettings.querySysSettingsItem("PriceWithTaxes",
								function(signOfPriceWithTaxes) {
									this._defineProductUtilities(InvoiceProductSchema, signOfPriceWithTaxes);
									this.Ext.callback(callback, scope || this);
								}, this);
					},

					/**
					 * Returns ProductUtilities.
					 * @protected
					 * @return {Terrasoft.ProductUtilities} ProductUtilities.
					 */
					getProductUtilities: function() {
						return this.productUtils;
					},

					/**
					 * Defines ProductUtilities.
					 * @param {Terrasoft.EntitySchema} schema Entity Schema.
					 * @param {Boolean} signOfPriceWithTaxes Sing of includes taxes in price.
					 * @private
					 */
					_defineProductUtilities: function(schema, signOfPriceWithTaxes) {
						this.productUtils = ProductUtilities;
						this.productUtils.columns = schema.columns;
						this.productUtils.PriceWithTaxes = signOfPriceWithTaxes;
					},

					/**
					 * Creates InvoiceProduct insert request.
					 * @private
					 * @param {Object} config Request config object.
					 * @param {int} i product index in step.
					 * @return {Terrasoft.InsertQuery}
					 */
					getInvoiceProductInsertQuery: function(config, i) {
						var product = config.products.getByIndex(i);
						var productUtilities = this.getProductUtilities();
						productUtilities.calculateProduct(product);
						var insert = this.Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: "InvoiceProduct"
						});
						insert.setParameterValue("SupplyPaymentProduct", product.get("Id"),
								this.Terrasoft.DataValueType.GUID);
						insert.setParameterValue("Name", product.get("Name"), this.Terrasoft.DataValueType.TEXT);
						insert.setParameterValue("Product", product.get("Product").value,
								this.Terrasoft.DataValueType.GUID);
						var price = product.get("Price");
						insert.setParameterValue("Price", price, this.Terrasoft.DataValueType.FLOAT);
						var discountPercent = product.get("DiscountPercent");
						insert.setParameterValue("DiscountPercent", discountPercent, this.Terrasoft.DataValueType.FLOAT);
						insert.setParameterValue("Tax", product.get("Tax").value,
								this.Terrasoft.DataValueType.GUID);
						var discountTax = product.get("DiscountTax");
						insert.setParameterValue("DiscountTax", discountTax, this.Terrasoft.DataValueType.FLOAT);
						insert.setParameterValue("TotalAmount", product.get("TotalAmount"),
								this.Terrasoft.DataValueType.FLOAT);
						var quantity = product.get("Quantity");
						insert.setParameterValue("Quantity", quantity, this.Terrasoft.DataValueType.FLOAT);
						var baseQuantity = product.get("BaseQuantity");
						insert.setParameterValue("BaseQuantity", baseQuantity, this.Terrasoft.DataValueType.FLOAT);
						insert.setParameterValue("Amount", product.get("Amount"), this.Terrasoft.DataValueType.FLOAT);
						insert.setParameterValue("DiscountAmount", product.get("DiscountAmount"), this.Terrasoft.DataValueType.FLOAT);
						insert.setParameterValue("TaxAmount", product.get("TaxAmount"), this.Terrasoft.DataValueType.FLOAT);
						insert.setParameterValue("Unit", product.get("Unit").value,
								this.Terrasoft.DataValueType.GUID);
						insert.setParameterValue("Invoice", config.invoiceId, this.Terrasoft.DataValueType.GUID);
						return insert;
					},

					/**
					 * @inheritDoc Terrasoft.mixins.ConfigurationGridUtilites#saveRowChanges
					 * @overridden
					 */
					saveRowChanges: function(row, callback, scope) {
						this.mixins.ConfigurationGridUtilites.saveRowChanges.call(this, row, function() {
							if (this.get("NeedReloadGridData")) {
								this.set("NeedReloadGridData", false);
								this.set("AddRowOnDataChangedConfig", {callback: callback, scope: scope});
								this.fireDetailChanged(null);
								this.reloadGridData();
							} else if (callback) {
								callback.call(scope || this);
							}
						}, this);
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#editRecord
					 * @overridden
					 **/
					editRecord: function() {
						var activeRow = this.getActiveRow();
						var typeColumnValue = this.getTypeColumnValue(activeRow);
						this.saveIfNeedAndProceed(activeRow, function() {
							this.openCard(enums.CardStateV2.EDIT, typeColumnValue, activeRow.get("Id"));
						}, this);
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilterDefaultColumnName
					 * @overridden
					 */
					getFilterDefaultColumnName: function() {
						return "Type";
					},

					/**
					 * Event handler New button click.
					 * @private
					 * @return {Boolean}
					 */
					onAddButtonClick: function() {
						var templateExist = this.get("TemplatesExists");
						if (!templateExist) {
							this.addRecord();
						} else {
							return false;
						}
					},
					
					/**
					 * @inheritdoc Terrasoft.BaseGridDetail#getAddTypedRecordButtonVisible
					 */
					getAddTypedRecordButtonVisible: function() {
						return this.get("IsEnabled");
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "DeleteRecordMenu",
						"parentName": "ActionsButton",
						"propertyName": "menu",
						"index": 1,
						"values": {"enabled": {"bindTo": "getEnableMenuActions"}}
					},
					{
						"operation": "remove",
						"name": "DataGridActiveRowOpenAction"
					},
					{
						"operation": "remove",
						"name": "DataGridActiveRowCopyAction"
					},
					{
						"operation": "remove",
						"name": "DataGridActiveRowDeleteAction"
					},
					{
						"operation": "insert",
						"name": "activeRowActionSave",
						"parentName": "DataGrid",
						"propertyName": "activeRowActions",
						"values": {
							"className": "Terrasoft.Button",
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "save",
							"markerValue": "save",
							"imageConfig": {"bindTo": "Resources.Images.SaveIcon"}
						}
					},
					{
						"operation": "insert",
						"name": "activeRowActionOpenCard",
						"parentName": "DataGrid",
						"propertyName": "activeRowActions",
						"values": {
							"className": "Terrasoft.Button",
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "card",
							"markerValue": "card",
							"imageConfig": {"bindTo": "Resources.Images.CardIcon"}
						}
					},
					{
						"operation": "insert",
						"name": "activeRowActionCancel",
						"parentName": "DataGrid",
						"propertyName": "activeRowActions",
						"values": {
							"className": "Terrasoft.Button",
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "cancel",
							"markerValue": "cancel",
							"imageConfig": {"bindTo": "Resources.Images.CancelIcon"}
						}
					},
					{
						"operation": "insert",
						"name": "activeRowActionRemove",
						"parentName": "DataGrid",
						"propertyName": "activeRowActions",
						"values": {
							"className": "Terrasoft.Button",
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "remove",
							"markerValue": "remove",
							"imageConfig": {"bindTo": "Resources.Images.RemoveIcon"}
						}
					},
					{
						"operation": "merge",
						"name": "DataGrid",
						"values": {
							"className": "Terrasoft.ConfigurationGrid",
							"generator": "ConfigurationGridGenerator.generatePartial",
							"type": "listed",
							"generateControlsConfig": {"bindTo": "generateActiveRowControlsConfig"},
							"changeRow": {"bindTo": "changeRow"},
							"unSelectRow": {"bindTo": "unSelectRow"},
							"onGridClick": {"bindTo": "onGridClick"},
							"sortColumnIndex": null,
							"listedZebra": true,
							"useLinks": true,
							"collection": {"bindTo": "Collection"},
							"activeRow": {"bindTo": "ActiveRow"},
							"selectedRows": {"bindTo": "SelectedRows"},
							"primaryColumnName": "Id",
							"initActiveRowKeyMap": {"bindTo": "initActiveRowKeyMap"},
							"activeRowAction": {"bindTo": "onActiveRowAction"},
							"activeRowActions": []
						}
					},
					{
						"operation": "remove",
						"name": "AddRecordButton"
					},
					{
						"operation": "merge",
						"name": "AddTypedRecordButton",
						"values": {
							"caption": "",
							"click": {"bindTo": "onAddButtonClick"},
							"controlConfig": {"menu": {"items": {"bindTo": "ItemTemplates"}}}
						}
					},
					{
						"operation": "merge",
						"name": "ToolsButton",
						"values": {
							"generateId": false
						}
					}
				]/**SCHEMA_DIFF*/
			};
		}
);

define("SupplyPaymentDetailV2", [],
	function() {
		return {
			entitySchemaName: "SupplyPaymentElement",
			methods: {
				getInvoiceProductInsertQuery: function(config, i) {
					var insert = this.callParent(arguments);
					var product = config.products.getByIndex(i);
					insert.setParameterValue("PriceList", product.get("PriceList").value,
						this.Terrasoft.DataValueType.GUID);
					return insert;
				},

				getSupplyPaymentProductEntitySchemaQuery: function() {
					var esq = this.callParent(arguments);
					esq.addColumn("Product.PriceList", "PriceList");
					return esq;
				}
			}
		};
	}
);


