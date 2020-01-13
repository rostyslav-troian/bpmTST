Terrasoft.configuration.Structures["ProductDetailV2"] = {innerHierarchyStack: ["ProductDetailV2UIv2", "ProductDetailV2ProductCatalogue", "ProductDetailV2ProductCatalogueInOrder", "ProductDetailV2"], structureParent: "BaseGridDetailV2"};
define('ProductDetailV2UIv2Structure', ['ProductDetailV2UIv2Resources'], function(resources) {return {schemaUId:'956729e3-33ef-4895-9d70-9e252958b63c',schemaCaption: "Base detail - Products", parentSchemaName: "BaseGridDetailV2", schemaName:'ProductDetailV2UIv2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ProductDetailV2ProductCatalogueStructure', ['ProductDetailV2ProductCatalogueResources'], function(resources) {return {schemaUId:'a57fe5ad-739d-460a-973b-589bd1e7f54b',schemaCaption: "Base detail - Products", parentSchemaName: "ProductDetailV2UIv2", schemaName:'ProductDetailV2ProductCatalogue',parentSchemaUId:'956729e3-33ef-4895-9d70-9e252958b63c',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ProductDetailV2UIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ProductDetailV2ProductCatalogueInOrderStructure', ['ProductDetailV2ProductCatalogueInOrderResources'], function(resources) {return {schemaUId:'f9b3bace-03a0-47cf-b9bf-c3da8088f0ce',schemaCaption: "Base detail - Products", parentSchemaName: "ProductDetailV2ProductCatalogue", schemaName:'ProductDetailV2ProductCatalogueInOrder',parentSchemaUId:'a57fe5ad-739d-460a-973b-589bd1e7f54b',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ProductDetailV2ProductCatalogue",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ProductDetailV2Structure', ['ProductDetailV2Resources'], function(resources) {return {schemaUId:'e2e9ea18-2178-42b0-a233-ffa5e29794db',schemaCaption: "Base detail - Products", parentSchemaName: "ProductDetailV2ProductCatalogueInOrder", schemaName:'ProductDetailV2',parentSchemaUId:'f9b3bace-03a0-47cf-b9bf-c3da8088f0ce',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ProductDetailV2ProductCatalogueInOrder",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ProductDetailV2UIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ProductDetailV2UIv2", ["terrasoft"],
		function(Terrasoft) {
			return {
				entitySchemaName: "BaseProductEntry",
				attributes: {},
				methods: {},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "DataGrid",
						"values": {
							"type": "listed",
							"listedConfig": {
								"name": "DataGridListedConfig",
								"items": [
									{
										"name": "NameListedGridColumn",
										"bindTo": "Name",
										"position": {
											"column": 1,
											"colSpan": 12
										},
										"type": Terrasoft.GridCellType.TITLE
									},
									{
										"name": "QuantityListedGridColumn",
										"bindTo": "Quantity",
										"position": {
											"column": 13,
											"colSpan": 6
										}
									},
									{
										"name": "TotalAmountListedGridColumn",
										"bindTo": "TotalAmount",
										"position": {
											"column": 19,
											"colSpan": 6
										}
									}
								]
							},
							"tiledConfig": {
								"name": "DataGridTiledConfig",
								"grid": {
									"columns": 24,
									"rows": 3
								},
								"items": [
									{
										"name": "NameTiledGridColumn",
										"bindTo": "Name",
										"position": {
											"row": 1,
											"column": 1,
											"colSpan": 16
										},
										"type": Terrasoft.GridCellType.TITLE
									},
									{
										"name": "QuantityTiledGridColumn",
										"bindTo": "Quantity",
										"position": {
											"row": 1,
											"column": 17,
											"colSpan": 8
										}
									},
									{
										"name": "PriceTiledGridColumn",
										"bindTo": "Price",
										"position": {
											"row": 2,
											"column": 1,
											"colSpan": 8
										}
									},
									{
										"name": "DiscountPercentTiledGridColumn",
										"bindTo": "DiscountPercent",
										"position": {
											"row": 2,
											"column": 9,
											"colSpan": 8
										}
									},
									{
										"name": "TotalAmountTiledGridColumn",
										"bindTo": "TotalAmount",
										"position": {
											"row": 2,
											"column": 17,
											"colSpan": 8
										}
									}
								]
							}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		}
);

define('ProductDetailV2ProductCatalogueResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ProductDetailV2ProductCatalogue", ["terrasoft", "ConfigurationEnums", "MaskHelper", "ConfigurationGrid",
		"ConfigurationGridGenerator", "ConfigurationGridUtilities"],
	function(Terrasoft, enums, MaskHelper) {
		return {
			mixins: {
				ConfigurationGridUtilites: "Terrasoft.ConfigurationGridUtilities"
			},
			attributes: {
				IsEditable: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: true
				}
			},
			messages: {
				/**
				 * @message ProductSelectionInfo
				 * ########### ######### ###### ####### ########
				 * @return {Object}
				 */
				"ProductSelectionInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message ProductSelectionSave
				 * ############ ####### ######## ###### ####### #########
				 */
				"ProductSelectionSave": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			methods: {
				/**
				 * Detail initialization
				 * @protected
				 * @overriden
				 */
				init: function() {
					this.callParent(arguments);
					this.subscribeOnProductSelectionInfo();
					this.set("MultiSelect", false);
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
					}, this);
				},

				/**
				 * Subscribing for product selection module events
				 * @protected
				 */
				subscribeOnProductSelectionInfo: function() {
					this.sandbox.subscribe("ProductSelectionSave", this.onProductsSelected,
						this, [this.sandbox.id + "_ProductSelectionModule"]);
					this.sandbox.subscribe("ProductSelectionInfo", function() {
						return {
							masterRecordId: this.get("MasterRecordId"),
							masterEntitySchemaName: this.get("DetailColumnName"),
							masterProductEntitySchemaName: this.entitySchemaName,
							masterCurrency: this.get("Currency")
						};
					}, this, [this.sandbox.id + "_ProductSelectionModule"]);
				},

				/**
				 * Calls on "ProductSelectionSave" event
				 * @protected
				 * @virtual
				 */
				onProductsSelected: function() {
					this.reloadGridData();
					this.fireDetailChanged();
				},

				/**
				 * Returns is card changed.
				 * @protected
				 * @return {boolean}
				 */
				isCardChanged: function() {
					return this.sandbox.publish("IsCardChanged", null, [this.sandbox.id]);
				},

				/**
				 * "Add product" button handler.
				 * Saves card if it changed and opens product selection page.
				 * @protected
				 */
				onProductSelectionButtonClick: function() {
					var isCardChanged = this.isCardChanged();
					if (isCardChanged) {
						var args = {
							isSilent: true,
							messageTags: [this.sandbox.id]
						};
						this.set("OpenProductSelectionModule", true);
						this.sandbox.publish("SaveRecord", args, [this.sandbox.id]);
					} else {
						this.loadProductSelectionModule();
					}
				},

				/**
				 * ############ ######### # ########## ######
				 * @protected
				 */
				onCardSaved: function() {
					if (this.get("OpenProductSelectionModule")) {
						this.loadProductSelectionModule();
						this.set("OpenProductSelectionModule", false);
						return;
					}
					this.callParent(arguments);
				},

				/**
				 * ######### ###### ####### #########
				 * @protected
				 * @virtual
				 */
				loadProductSelectionModule: function() {
					var openCardConfig = {
						moduleId: this.sandbox.id,
						OpenProductSelectionModule: true,
						operation: enums.CardStateV2.EDIT
					};
					this.sandbox.publish("OpenCard", openCardConfig, [this.sandbox.id]);
				},

				/**
				 * Sets default grid row view model configuration.
				 * @return {Object} Grid row view model configuration.
				 */
				getGridRowViewModelConfig: function() {
					var rowConfig = this.callParent(arguments);
					if (this.getIsEditable()) {
						var defaultTax = this.get("DefaultTax");
						if (defaultTax) {
							rowConfig.values.DefaultTax = defaultTax;
						}
						var basePriceList = this.get("BasePriceList");
						if (basePriceList) {
							rowConfig.values.BasePriceList = basePriceList;
						}
						var priceWithTaxes = this.get("PriceWithTaxes");
						if (priceWithTaxes) {
							rowConfig.values.PriceWithTaxes = priceWithTaxes;
						}
						rowConfig.methods = rowConfig.methods || {};
						var scope = this;
						rowConfig.methods.onSaved = function(response, config) {
							scope.onProductSaved.call(scope);
							if (config && config.isSilent) {
								this.onSilentSaved(response, config);
							}
						};
					}
					return rowConfig;
				},

				/**
				 * Sends message with information about detail changes to the page.
				 */
				onProductSaved: function() {
					this.fireDetailChanged({});
					MaskHelper.HideBodyMask();
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
				 * @inheritdoc Terrasoft.BaseGridDetailV2#addRecordOperationsMenuItems
				 * @override
				 */
				addRecordOperationsMenuItems: function(toolsButtonMenu) {
					toolsButtonMenu.addItem(this.getButtonMenuItem({
						Caption: {"bindTo": "Resources.Strings.AddButtonCaption"},
						Click: {"bindTo": "addRecord"},
						Enabled: {"bindTo": "getAddRecordButtonEnabled"}
					}));
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#onDataChanged
				 * @override
				 */
				onDataChanged: function() {
					this.callParent(arguments);
					var gridData = this.getGridData();
					this.Terrasoft.each(gridData.getItems(), function(item) {
						item.setProductPriceEnabled();
					}, this);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"className": "Terrasoft.ConfigurationGrid",
						"generator": "ConfigurationGridGenerator.generatePartial",
						"generateControlsConfig": {bindTo: "generateActiveRowControlsConfig"},
						"multiSelect": {"bindTo": "MultiSelect"},
						"changeRow": {"bindTo": "changeRow"},
						"selectRow": {"bindTo": "createEditRow"},
						"unSelectRow": {"bindTo": "unSelectRow"},
						"onGridClick": {"bindTo": "onGridClick"},
						"activeRowActions": [
							{
								"className": "Terrasoft.Button",
								"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
								"tag": "save",
								"markerValue": "save",
								"imageConfig": {"bindTo": "Resources.Images.SaveIcon"}
							},
							{
								"className": "Terrasoft.Button",
								"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
								"tag": "cancel",
								"markerValue": "cancel",
								"imageConfig": {"bindTo": "Resources.Images.CancelIcon"}
							},
							{
								"className": "Terrasoft.Button",
								"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
								"tag": "remove",
								"markerValue": "remove",
								"imageConfig": {"bindTo": "Resources.Images.RemoveIcon"}
							}
						],
						"listedZebra": true,
						"initActiveRowKeyMap": {"bindTo": "initActiveRowKeyMap"},
						"activeRowAction": {"bindTo": "onActiveRowAction"}
					}
				},
				{
					"operation": "merge",
					"name": "AddRecordButton",
					"values": {
						"click": {"bindTo": "onProductSelectionButtonClick"}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('ProductDetailV2ProductCatalogueInOrderResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ProductDetailV2ProductCatalogueInOrder", [], function() {
		return {
			methods: {
				/**
				 * @inheritdoc Terrasoft.ProductDetailV2#productSelectionHandler
				 * @overridden
				 */
				onProductsSelected: function() {
					this.callParent();
					this.updateOrderProductCurrency();
				},

				/**
				 * Setups order currency for products that has empty order currency
				 * @virtual
				 */
				updateOrderProductCurrency: function() {
					var orderId = this.get("MasterRecordId");
					if (!orderId) {
						return;
					}
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "Order"
					});
					esq.addColumn("Currency");
					esq.addColumn("CurrencyRate");
					esq.getEntity(orderId, function(result) {
						var entity = result.entity;
						if (!entity) {
							return;
						}
						var currency = entity.get("Currency");
						var currencyRate = entity.get("CurrencyRate");
						var update = this.Ext.create("Terrasoft.UpdateQuery", {
							rootSchemaName: "OrderProduct"
						});
						update.setParameterValue("Currency", currency.value, this.Terrasoft.DataValueType.GUID);
						update.setParameterValue("CurrencyRate", currencyRate, this.Terrasoft.DataValueType.FLOAT);
						update.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Order", orderId));
						update.filters.addItem(this.Terrasoft.createIsNullFilter(
							this.Ext.create("Terrasoft.ColumnExpression", {columnPath: "Currency"})));
						update.execute();
					}, this);
				}
			}
		};
	}
);

define("ProductDetailV2", ["terrasoft", "OrderUtilities"], function() {
		return {
			mixins: {
				OrderUtilities: "Terrasoft.OrderUtilities"
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#createViewModel
				 * @param {Object} config
				 * @overridden
				 */
				createViewModel: function(config) {
					this.callParent(arguments);
					this.updateViewModel(config.viewModel);
				},

				/**
				 * Modifies view model for editable section
				 * Wraps save method for OrderProductDetailV2
				 * @param {Terrasoft.BasePageV2} viewModel
				 * @private
				 */
				updateViewModel: function(viewModel) {
					if (this.entitySchemaName !== "OrderProduct") {
						return;
					}
					viewModel.save = this.needToChangeInvoice({
						getId: function() {
							return this.get("Order") && this.get("Order").value;
						},
						name: "Order",
						validateColumns: ["TotalAmount"]
					}, viewModel.save.bind(viewModel), this);
				}
			}
		};
	}
);


