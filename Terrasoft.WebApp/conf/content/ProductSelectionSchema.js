Terrasoft.configuration.Structures["ProductSelectionSchema"] = {innerHierarchyStack: ["ProductSelectionSchema"]};
define('ProductSelectionSchemaStructure', ['ProductSelectionSchemaResources'], function(resources) {return {schemaUId:'ac5d3b29-fe62-4b61-a32e-ba01de918eb7',schemaCaption: "Product selection page schema", parentSchemaName: "", schemaName:'ProductSelectionSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProductSelectionSchema", ["ViewGeneratorV2", "ProductManagementDistributionConstants",
		"MoneyModule", "GridUtilitiesV2", "ConfigurationGridUtilities", "ConfigurationItemGenerator",
		"MoneyUtilsMixin", "ProductUtilitiesV2", "ProductSelectionQueryUtilitiesMixin", "CurrencyRateServiceRequest"],
	function(ViewGenerator, DistributionConstants, MoneyModule) {
		return {
			mixins: {
				GridUtilities: "Terrasoft.GridUtilities",
				ConfigurationGridUtilities: "Terrasoft.ConfigurationGridUtilities",
				MoneyUtilsMixin: "Terrasoft.MoneyUtilsMixin",
				ProductSelectionQueryUtilitiesMixin: "Terrasoft.ProductSelectionQueryUtilitiesMixin"
			},
			messages: {
				"ProductSelectionSave": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message ChangeHeaderCaption
				 * Changes current page header.
				 */
				"ChangeHeaderCaption": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message InitDataViews
				 * Sends header parameters on request.
				 */
				"InitDataViews": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message NeedHeaderCaption
				 * Gets header parameters request.
				 */
				"NeedHeaderCaption": {
					"mode": Terrasoft.MessageMode.BROADCAST,
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"FolderInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"ShowFolderManager": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"ResultFolderFilter": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"UpdateCatalogueFilter": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"QuickSearchFilterInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"UpdateQuickSearchFilter": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"UpdateQuickSearchFilterString": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				"ChangeDataView": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"GetGridSettingsInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"GridSettingsChanged": {
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
					mode: Terrasoft.MessageMode.PTP
				},
				"SaveGridSettings": {
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
					mode: Terrasoft.MessageMode.PTP
				}
			},
			attributes: {
				"ViewOptionsButtonMenuItems": {
					"dataValueType": Terrasoft.DataValueType.COLLECTION,
					"value": Ext.create("Terrasoft.BaseViewModelCollection")
				},
				"GridData": {
					"dataValueType": Terrasoft.DataValueType.COLLECTION
				},
				"DataViewGridCollection": {
					"dataValueType": Terrasoft.DataValueType.COLLECTION
				},
				"BasketViewGridCollection": {
					"dataValueType": Terrasoft.DataValueType.COLLECTION
				}
			},
			properties: {
				gridCaptionsContainer: null,
				/**
				 * Defines folder manager view model class name
				 */
				folderManagerViewModelClassName: "Terrasoft.ProductCatalogueFolderManagerViewModel",
				/**
				 * Defines folder manager view config generator module name
				 */
				folderManagerViewConfigGenerator: "ProductCatalogueFolderManagerViewConfigGenerator",
				/**
				 * Defines folder manager view model config generator module name
				 */
				folderManagerViewModelConfigGenerator: "ProductCatalogueFolderManagerViewModelConfigGenerator",
				/**
				 * Defines folder manager module name
				 */
				folderManagerModuleName: "ProductCatalogueFolderManager",

				/**
				 * Attribute for silent save.
				 */
				silentAttr: {silent: true},

				/**
				 * Money module entity.
				 * @type {Terrasoft.MoneyModule}
				 */
				moneyModule: null
			},
			methods: {

				/**
				 * Init view model.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope  Execution context.
				 */
				init: function(callback, scope) {
					this._initViewActionItems();
					this.set("CurrentDataView", "GridDataView");
					this.moneyModule = MoneyModule;
					this.initAttributeDefaultValues();
					this.callParent([function() {
						this.Terrasoft.chain(
							this.initEntitySchema,
							this.initProfile,
							this.requestMasterEntityData,
							this.loadCurrencyRates,
							this.initCurrencies,
							function() {
								this.loadGridData();
								this.subscribeSandboxEvents();
								this.Ext.callback(callback, scope);
							},
							this
						);
					}, this]);
				},

				/**
				 * Initiates attribute default values.
				 * @protected
				 * @virtual
				 */
				initAttributeDefaultValues: function() {
					this.set("GridData", this.Ext.create("Terrasoft.Collection"));
					this.set("DataViewGridCollection", this.Ext.create("Terrasoft.Collection"));
					this.set("BasketViewGridCollection", this.Ext.create("Terrasoft.Collection"));
				},

				/**
				 * Returns profile key.
				 * @return {String} Profile key.
				 */
				getProfileKey: function() {
					return this.getMasterEntityProductSchemaName() + "ProductSelectionModuleView";
				},

				/**
				 * Initializes page view actions.
				 * @private
				 */
				_initViewActionItems: function() {
					var viewActions = this.get("ViewOptionsButtonMenuItems");
					var menuItems = this.getViewMenuItems();
					viewActions.reloadAll(menuItems);
				},

				/**
				 * Returns view menu items collection.
				 * @protected
				 * @virtual
				 * @return {Terrasoft.BaseViewModelCollection} View menu items collection.
				 */
				getViewMenuItems: function() {
					var actionMenuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
					actionMenuItems.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.ColumnSettingsActionCaption"},
						"Click": {"bindTo": "openGridSettings"}
					}));
					return actionMenuItems;
				},

				/**
				 * Initialize columns list of product selection catalogue.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution context.
				 */
				initProfile: function(callback, scope) {
					this.requireProfile(function(profile) {
						this._setProfileData(profile);
						this.Ext.callback(callback, scope || this);
					}, this);
				},

				/**
				 * Sets profile data from config
				 * @private
				 * @param {Object} profile - profile config
				 */
				_setProfileData: function(profile) {
					var gridProfile = profile.DataGrid;
					if (gridProfile) {
						var listedConfig = JSON.parse(gridProfile.listedConfig);
						gridProfile.isTiled = false;
						listedConfig.captionsConfig = ViewGenerator.generateGridCaptionsConfig(listedConfig.items);
						listedConfig.columnsConfig = ViewGenerator.generateGridRowConfig(profile, listedConfig.items);
						gridProfile.listedConfig = JSON.stringify(listedConfig);
					}
					this.set("Profile", profile);
					this._applyGridRecordColumns();
				},

				/**
				 * Formats column name.
				 * @return {String} columnName Formatted column name.
				 * @private
				 */
				_formatColumnName: function(columnName) {
					return columnName.replace(/\./g, "_")
						.replace("[", "_")
						.replace("]", "_")
						.replace(":", "_")
						.replace("#", "_");
				},

				/**
				 * Returns array of grid header control configs.
				 * @protected
				 * @return {Array} Array of grid header configs.
				 */
				getGridHeaderConfigs: function() {
					var columns = this.getHeaderColumns();
					var columnsConfig = [];
					this.Terrasoft.each(columns, function(column) {
						var columnConfig = this.getCaptionControlConfig(column);
						columnsConfig.push(columnConfig);
					}, this);
					return columnsConfig;
				},

				/**
				 * Returns collection of grid header columns.
				 * @protected
				 * @return {Array} Collection of grid header columns.
				 */
				getHeaderColumns: function() {
					var profileColumns = this.getProductSelectionProfileColumns();
					var columns = [];
					this.Terrasoft.each(profileColumns, function(column, columnName) {
						var columnName = this._formatColumnName(columnName);
						var columnConfig = this.getColumnLabelConfigInfo(columnName, column.colSpan, column.caption);
						columns.push(columnConfig);
					}, this);
					return columns;
				},

				/**
				 * Returns config of caption column.
				 * @protected
				 * @param {String} columnName Column name.
				 * @param {Number} columnsCount Column size.
				 * @param {String} caption Column caption.
				 * @return {Object} Column config.
				 */
				getColumnLabelConfigInfo: function(columnName, columnsCount, caption) {
					var column = this.columns[columnName] || {};
					caption = caption || column.caption;
					caption = this.getCustomColumnCaption(columnName, caption);
					return {
						name: columnName,
						caption: caption,
						colSpan: columnsCount
					};
				},

				/**
				 * Returns custom column caption.
				 * @protected
				 * @param {String} columnName Column name.
				 * @param {String} caption Column caption.
				 * @return {String} Custom column caption.
				 */
				getCustomColumnCaption: function(columnName, caption) {
					if (columnName === "Price") {
						var symbol = this.get("CurrencySymbol");
						if (!this.Ext.isEmpty(symbol)) {
							caption = this.Ext.String.format("{0}, {1}", caption, symbol);
						}
					}
					return caption;
				},

				/**
				 * Returns config on caption column.
				 * @protected
				 * @param {Object} columnInfo
				 * @param {String} columnInfo.name Column name.
				 * @param {Number} columnInfo.colSpan Column size.
				 * @param {String} columnInfo.caption Column caption.
				 * @return {Object} Column control config.
				 */
				getCaptionControlConfig: function(columnInfo) {
					var className = "Label";
					var id = ["caption", this._formatColumnName(columnInfo.name), className.toLowerCase()].join("-");
					var config = {
						className: "Terrasoft." + className,
						id: id,
						selectors: {wrapEl: "#" + id},
						markerValue: columnInfo.name
					};
					config.caption = columnInfo.caption;
					config.classes = {
						labelClass: ["grid-cols-" + columnInfo.colSpan,
							"gridRow" + columnInfo.name + "LabelCaption"]
					};
					return config;
				},

				/**
				 * Initializes entity schema.
				 * @param {Function} callback Callback function.
				 * @param {Object} [scope] Callback scope.
				 * @protected
				 */
				initEntitySchema: function(callback, scope) {
					var entitySchemaName = this.getMasterEntityProductSchemaName();
					this.getEntitySchemaByName(entitySchemaName, function(schema) {
						this.entitySchema = schema;
						this.Ext.callback(callback, scope);
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.BaseObject#onDestroy
				 * @override
				 */
				destroy: function() {
					this.sandbox.unloadModule(this.sandbox.id + "_FolderManagerModule");
					this.sandbox.unloadModule(this.sandbox.id + "_QuickSearchModule");
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
				 * @override
				 */
				onRender: function() {
					if (this.get("GridSettingsChanged") === true) {
						this.loadGridData();
						this.set("GridSettingsChanged", false);
					}
					this.initDataViews(false);
					this.reRenderGridHeader();
					this.callParent(arguments);
					this.loadFolderManager("foldersContainer");
				},

				/**
				 * Rerenders grid header.
				 * @protected
				 */
				reRenderGridHeader: function() {
					var captionContainer = this.Ext.getCmp("gridCaptionContainer");
					var columnsConfigs = this.getGridHeaderConfigs();
					captionContainer.items.clear();
					this.Terrasoft.each(columnsConfigs, function(columnConfig) {
						var label = this.Ext.create("Terrasoft.Label", columnConfig);
						captionContainer.items.add(columnConfig.id, label);
					}, this);
					captionContainer.reRender();
				},

				/**
				 * ProductUtilities getter.
				 * @protected
				 * @return {Terrasoft.ProductUtilities}
				 */
				getProductUtilities: function() {
					return this.productUtils;
				},

				/**
				 * Defines ProductUtilities.
				 * @param {Terrasoft.EntitySchema} schema Entity Schema.
				 * @private
				 */
				defineProductUtilities: function(schema) {
					this.productUtils = this.Ext.create("Terrasoft.configuration.ProductUtilities", {
						columns: schema.columns
					});
				},

				/**
				 * Initializes currencies info.
				 * @param {Function} callback Callback function.
				 * @param {Terrasoft.BaseViewModel} scope callback scope.
				 * @protected
				 */
				initCurrencies: function(callback, scope) {
					this.initProductUtilities(function() {
						this.Terrasoft.SysSettings.querySysSettings(["PriceWithTaxes", "PrimaryCurrency",
							"BasePriceList", "DefaultTax"], function(values) {
							var primaryCurrency = values.PrimaryCurrency;
							this.set("PrimaryCurrency", primaryCurrency);
							this.set("BasePriceList", values.BasePriceList);
							var productUtilities = this.getProductUtilities();
							productUtilities.PriceWithTaxes = values.PriceWithTaxes;
							var currencyInfo = this.getCurrencyInfoById(primaryCurrency.value);
							this.set("PrimaryCurrencyRate", currencyInfo.Rate);
							var currency = this._getMasterEntityColumnValue("Currency");
							this.set("MasterCurrency", currency);
							this.Ext.callback(callback, scope);
						}, this);
					}, this);
				},

				/**
				 * Initializes ProductUtilities.
				 * @private
				 * @param callback Calls when ProductUtilities was initialized.
				 * @param scope Callback's scope.
				 */
				initProductUtilities: function(callback, scope) {
					var entitySchemaName = "Product";
					this.Terrasoft.require([entitySchemaName], function(schema) {
						this.defineProductUtilities(schema);
						this.Ext.callback(callback, scope);
					}, this);
				},

				/**
				 * Retrieves current grid data.
				 * @protected
				 */
				getGridData: function() {
					var gridData = this.get("GridData");
					if (!gridData) {
						gridData = this.Ext.create("Terrasoft.Collection");
						this.set("GridData", gridData);
					}
					return gridData;
				},

				/**
				 * Post processing, after grid data was loaded.
				 * @param {Object} response Grid data query response.
				 * @protected
				 */
				onGridDataLoaded: function(response) {
					if (!response.success || response.queryResults.length === 0) {
						return;
					}
					var dataCollection = this.Ext.create("Terrasoft.Collection");
					this.prepareResponseCollection(dataCollection, response);
					var lastValue = null;
					var gridData = this.getGridData();
					var canLoadData = false;
					if (dataCollection.getCount()) {
						var lastItemIndex = dataCollection.getCount() - 1;
						var lastItem = dataCollection.getByIndex(lastItemIndex);
						var products = gridData.collection.filterBy(
							function(res) {
								var resId = res.get("RealRecordId");
								return resId === lastItem.get("RealRecordId");
							}
						);
						if ((products.length <= 0)) {
							lastValue = lastItem.get("Name");
							canLoadData = true;
						}
					}
					this.set("sortColumnLastValue", lastValue);
					if (canLoadData) {
						gridData.loadAll(dataCollection);
					}
					this.set("GridData", gridData);
				},

				/**
				 * Get grid data record from config with row values.
				 * @param {Object} rowValues Record values.
				 * @param {String} entitySchema Entity schema name.
				 * @return {Terrasoft.BaseSchemaViewModel}
				 * @protected
				 * @virtual
				 */
				getGridRecordByItemValues: function(rowValues, entitySchema) {
					var gridColumns = this.columns;
					this.processGridItemColumns(gridColumns);
					var gridRecord = this.Ext.create("Terrasoft.BaseSchemaViewModel", {
						entitySchema: entitySchema,
						sandbox: this.sandbox,
						Ext: this.Ext,
						Terrasoft: this.Terrasoft,
						columns: gridColumns,
						values: rowValues,
						isNew: false,
						isDeleted: false,
						methods: {
							applyUnitItemsEsq: this.applyUnitItemsEsq,
							applyProductPriceItemsEsq: this.applyProductPriceItemsEsq,
							getLookupQuery: this.getLookupQuery,
							getLookupColumnHandlers: this.getLookupColumnHandlers
						}
					});
					this._prepareDateTimeValues(gridRecord);
					this._prepareIdValue(gridRecord);
					return gridRecord;
				},

				/**
				 * Prepares Id value of product.
				 * @param {Terrasoft.BaseViewModel} item Product item.
				 * @private
				 */
				_prepareIdValue: function(item) {
					var id = item.get("Id");
					if (this.isEmpty(id)) {
						item.set("Id", item.get("Product.Id"));
					}
				},

				/**
				 * Applies grid record columns.
				 * @private
				 */
				_applyGridRecordColumns: function() {
					var profileColumns = this.getProductSelectionProfileColumns();
					this.Terrasoft.each(profileColumns, function(item) {
						var name = item.path;
						if (!this.columns.hasOwnProperty(name)) {
							this.columns[name] = {
								name: name,
								dataValueType: item.dataValueType
							};
						}
					}, this);
				},

				/**
				 * Process grid columns.
				 * @param {Object} columns Columns configs.
				 * @protected
				 */
				processGridItemColumns: function(columns) {
					this.Terrasoft.each(columns, function(column) {
						if (column.dataValueType === this.Terrasoft.DataValueType.LOOKUP) {
							this._addLookupListColumn(columns, column.name);
						}
					}, this);
				},

				/**
				 * Add lookup column to grid.
				 * @param {Object} columnsConfig Columns config.
				 * @param {String} name Column name.
				 * @private
				 */
				_addLookupListColumn: function(columnsConfig, name) {
					var lookupColumnName = name + "List";
					columnsConfig[lookupColumnName] = {
						name: lookupColumnName,
						dataValueType: this.Terrasoft.DataValueType.COLLECTION,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: new this.Terrasoft.Collection()
					};
				},

				/**
				 * Prepare product row item.
				 * @param {Terrasoft.BaseViewModel} item - row view model.
				 * @private
				 */
				_prepareItem: function(item) {
					item.sandbox = this.sandbox;
					if (!item.get("RealRecordId")) {
						item.set("RealRecordId", item.get("Id"));
					}
					item.set("MasterEntitySchemaName", this.get("MasterEntitySchemaName"));
					item.set("MasterRecordId", this.get("MasterRecordId"));
					item.set("UnitEnumList", this.Ext.create("Terrasoft.Collection"));
					var price = item.get("Price") || 0;
					item.set("Price", this.roundMoney(price));
					var productUtilities = this.getProductUtilities();
					item.set("PriceDisplayValue", productUtilities.getFormattedNumberValue(price));
					item.set("CurrencyDivision", this._getMasterEntityColumnValue("Currency.Division"));
					var currentCurrencyRate = item.get("CurrencyRate");
					if (this.Ext.isEmpty(currentCurrencyRate)) {
						var currencyRate = this._getMasterEntityColumnValue("CurrencyRate");
						item.set("CurrencyRate", currencyRate);
					}
				},

				/**
				 * Prepare date time values.
				 * @param {Terrasoft.BaseViewModel} item - row view model.
				 * @private
				 */
				_prepareDateTimeValues: function(item) {
					var columns = item.columns;
					this.Terrasoft.each(columns, function(column) {
						if (this.Terrasoft.isDateDataValueType(column.dataValueType)) {
							var name = column.name;
							var value = item.get(name);
							if (this.Ext.isString(value)) {
								item.set(name, this.Ext.isEmpty(value) ? null : this.Terrasoft.parseDate(value));
							}
						}
					}, this);
				},

				/**
				 * Returns master entity currency rate.
				 * @private
				 * @param {String} columnName Master entity column name.
				 * @return {*} Column value.
				 */
				_getMasterEntityColumnValue: function(columnName) {
					var masterEntity = this.get("MasterEntity");
					return masterEntity && masterEntity.get(columnName);
				},

				/**
				 * Forms basket collection.
				 * @param {Object} response Product query response.
				 * @param {string} masterEntityColumnIdName Name of master entity id column.
				 * @returns {Terrasoft.BaseViewModelCollection} Basket collection.
				 */
				formBasketCollection: function(response, masterEntityColumnIdName) {
					var basket = this.getBasketData();
					var productInEntityResponse = response.queryResults[response.queryResults.length - 1];
					this.Terrasoft.each(productInEntityResponse.rows, function(row) {
						var item = this.getGridRecordByItemValues(row, this.entitySchema);
						var itemId = item.get("Id");
						var customKey = this.Ext.String.format("{0}_{1}", itemId, item.get(masterEntityColumnIdName));
						this._prepareItem(item);
						item.set("Id", customKey);
						if (!basket.contains(customKey)) {
							basket.add(customKey, item);
						} else {
							this._replaceBasketItem(basket, customKey, item);
						}
					}, this);
					return basket;
				},

				/**
				 * Replaces basket collection item.
				 * @param {Terrasoft.Collection} basket Basket collection.
				 * @param {String} key Item key.
				 * @param {Object) newItem New item for replacement.
				 * @private
				 */
				_replaceBasketItem: function(basket, key, newItem) {
					var oldItem = basket.get(key);
					this.Terrasoft.each(oldItem.changedValues, function(value, columnName) {
						newItem.set(columnName, value);
					}, this);
					basket.replace(oldItem, newItem, key);
				},

				/**
				 * Forms product object.
				 * @param {Object} originProduct Query product object.
				 * @param {Terrasoft.BaseViewModel} item Basket product model.
				 * @param {Guid} detailRecordId Product in master entity id.
				 * @return {Terrasoft.BaseViewModel} Formed product object.
				 * @private
				 */
				_formProduct: function(originProduct, item, detailRecordId) {
					var masterEntity = this.get("MasterEntity");
					originProduct.Id = originProduct.Id || originProduct["Product.Id"];
					var product = this.Terrasoft.deepClone(originProduct);
					var productId = product.RealRecordId || product.Id;
					var customKey = detailRecordId ? productId + "_" + detailRecordId : productId;
					this.Terrasoft.each(item.values, function(value, column) {
						product[column] = value;
					});
					product.RealRecordId = productId;
					product.Id = customKey;
					product.Currency = masterEntity.get("Currency");
					var profileColumns = this.getProductSelectionProfileColumns();
					this.Terrasoft.each(profileColumns, function(column, columnName) {
						product[columnName] = item.get(columnName);
					});
					return product;
				},

				/**
				 * Forms products collection for main view.
				 * @param {Object} response Product query response.
				 * @param {Terrasoft.BaseViewModelCollection} basket Basket collection.
				 * @param {String} masterEntityColumnIdName Name of master entity id column.
				 * @return {Array} Products rows.
				 */
				formMainViewProducts: function(response, basket, masterEntityColumnIdName) {
					var productSelectResponse = response.queryResults[0];
					var productRows = this.isNotEmpty(productSelectResponse) ? productSelectResponse.rows : [];
					basket.each(function(item) {
						var products = this.Terrasoft.filter(productRows, function(product) {
								var productId = product.RealRecordId || product.Id || product["Product.Id"];
								return productId === item.get("RealRecordId");
							}
						);
						var detailRecordId = item.get(masterEntityColumnIdName);
						this.Terrasoft.each(products, function(pr) {
							var product = this._formProduct(pr, item, detailRecordId);
							var productId = product.RealRecordId || product.Id;
							if (productId === pr.Id) {
								this.Ext.Array.replace(productRows,
									this.Ext.Array.indexOf(productRows, pr), 1, [product]);
							} else {
								this.Ext.Array.insert(productRows,
									this.Ext.Array.indexOf(productRows, pr, 0), [product]);
							}
						}, this);
					}, this);
					return productRows;
				},

				/**
				 * Sets tax for product item.
				 * @param {Object} response Product query response.
				 * @param {Terrasoft.BaseViewModel} item Product model.
				 * @private
				 */
				_setProductTax: function(response, item) {
					this.setProductPriceListInfo(response, item);
				},

				/**
				 * Sets price list info for product item.
				 * @param {Object} response Product query response.
				 * @param {Terrasoft.BaseViewModel} item Product model.
				 * @protected
				 * @virtual
				 */
				setProductPriceListInfo: function(response, item) {
					var itemId = item.get("Id");
					var queryResult = response.queryResults[1];
					var productPricesRows = (queryResult && queryResult.rows) || [];
					var basePriceListProduct = this.Terrasoft.filter(productPricesRows, function(res) {
						return res.Id === itemId;
					});
					if (basePriceListProduct && basePriceListProduct.length > 0) {
						item.set("PriceList", this.get("BasePriceList"));
						var tax = basePriceListProduct[0].Tax;
						var taxPercent = basePriceListProduct[0].DiscountTax;
						if (tax) {
							item.set("Tax", tax);
							item.set("DiscountTax", taxPercent);
						}
					}
				},

				/**
				 * Sets price for product from basket item.
				 * @param {Terrasoft.BaseViewModel} existingItem Basket product model.
				 * @param {Terrasoft.BaseViewModel} item Product model.
				 * @private
				 */
				_setProductPrice: function(existingItem, item) {
					var priceItem = existingItem.get("Price") || 0;
					item.set("Price", this.roundMoney(priceItem));
					item.set("Unit", existingItem.get("Unit"));
					item.set("Count", existingItem.get("Count"));
					item.set("PriceList", existingItem.get("PriceList"));
				},

				/**
				 * Loads price for product.
				 * @param {Terrasoft.BaseViewModel} item Product model.
				 * @private
				 */
				_loadPrice: function(item) {
					var masterCurrency = this._getMasterEntityColumnValue("Currency");
					var masterCurrencyId = masterCurrency ? masterCurrency.value : null;
					var currencyId = this._getProductCurrencyId(item);
					if (currencyId && (masterCurrencyId !== currencyId)) {
						var price = item.get("Price");
						var currencyInfo = this.getCurrencyInfoById(currencyId);
						var division = currencyInfo.Division || 1;
						var rate = currencyInfo.Rate || 1;
						this.setPrice(item, price, division, rate);
						item.set("Currency", masterCurrency);
					}
				},

				/**
				 * Returns currency identifier of product.
				 * @param {Terrasoft.BaseViewModel} product Product model.
				 * @return {Guid|null} Currency identifier.
				 * @private
				 */
				_getProductCurrencyId: function(product) {
					return product.get("Currency") ? product.get("Currency").value : null;
				},

				/**
				 * Loads currency rates.
				 * @param {Function} callback Callback function.
				 * @param {Terrasoft.BaseViewModel} scope Callback's scope.
				 * @protected
				 */
				loadCurrencyRates: function(callback, scope) {
					var request = this.getCurrencyRateServiceRequest();
					request.getActualCurrencyRates(function(result) {
						this.set("CurrencyRates", result);
						this.Ext.callback(callback, scope || this);
					}, this);
				},

				/**
				 * Returns currency info by identifier.
				 * @param currencyId Currency identifier.
				 * @protected
				 * @virtual
				 * @return {Object} Currency info.
				 */
				getCurrencyInfoById: function(currencyId) {
					var result = {};
					var rates = this.get("CurrencyRates") || [];
					this.Terrasoft.each(rates, function(rate) {
						var currencyRateId = rate.CurrencyId;
						if (currencyId === currencyRateId) {
							result = rate;
						}
					}, this);
					return result;
				},

				/**
				 * Returns initialized CurrencyRateServiceRequest object.
				 * @protected
				 * @return {Terrasoft.CurrencyRateServiceRequest} Initialized CurrencyRateServiceRequest object.
				 */
				getCurrencyRateServiceRequest: function() {
					return this.Ext.create("Terrasoft.CurrencyRateServiceRequest");
				},

				/**
				 * Prepares query response collection.
				 * @param {Terraosoft.BaseViewModelCollection} collection Collection to fill with products.
				 * @param {Object} response Product query response.
				 * @protected
				 */
				prepareResponseCollection: function(collection, response) {
					var masterEntityColumnIdName = this.getMasterEntityProductSchemaName() + "Id";
					var basket = this.formBasketCollection(response, masterEntityColumnIdName);
					var productRows = this.formMainViewProducts(response, basket, masterEntityColumnIdName);
					var gridData = this.getGridData();
					this.Terrasoft.each(productRows, function(row) {
						var item = this.getGridRecordByItemValues(row, this.entitySchema);
						var itemId = item.get("Id");
						this._prepareItem(item);
						this._loadPrice(item);
						this._setProductTax(response, item);
						var existingItem = basket.find(itemId);
						if (this.isNotEmpty(existingItem)) {
							this._setProductPrice(existingItem, item);
						}
						this.setColumnHandlers(item);
						if (!collection.contains(row.Id) && !gridData.contains(row.Id)) {
							collection.add(row.Id, item);
						}
					}, this);
					this.calcSummary();
				},

				/**
				 * Calculates and sets product price.
				 * @protected
				 * @param {Terrasoft.BaseModel} item Product.
				 * @param {Number} productPrice Product price.
				 * @param {Number} division Currency division.
				 * @param {Number} rate Currency rate.
				 */
				setPrice: function(item, productPrice, division, rate) {
					var entity = this.get("MasterEntity");
					var currencyRate = (entity && entity.get("CurrencyRate")) ? entity.get("CurrencyRate") : 1;
					var divisionResult = (division === 0) ? 1 : division;
					var rateResult = (rate === 0) ? 1 : rate;
					var moneyCalculator = this.getMoneyCalculator();
					var price = moneyCalculator.evaluate({
						divide: [{
							multiply: [productPrice, currencyRate, divisionResult]
						}, {
							multiply: [rateResult, entity.get("Currency.Division")]
						}]
					});
					price = this.roundValue(price);
					item.set("Price", price);
					var productUtilities = this.getProductUtilities();
					item.set("PriceDisplayValue", productUtilities.getFormattedNumberValue(price));
				},

				/**
				 * Calculates total amount for selected products.
				 * @protected
				 */
				calcSummary: function() {
					let totalAmount = 0;
					let lineItemsCount = 0;
					const basket = this.getBasketData();
					const calculator = this.getMoneyCalculator();
					basket.each(function(item) {
						totalAmount = calculator.add(totalAmount, item.get("TotalAmount") || 0);
						lineItemsCount += (item.get("Quantity") > 0) ? 1 : 0;
					}, this);
					this.set("TotalAmount", totalAmount);
					this.set("LineItemsCount", lineItemsCount);
				},

				/**
				 * Calculates and sets amount.
				 * @protected
				 */
				calcAmount: function() {
					var price = this.get("Price");
					var quantity = this.get("BaseQuantity");
					if (!Ext.isEmpty(price) && !Ext.isEmpty(quantity)) {
						var moneyCalculator = this.getMoneyCalculator();
						var amount = moneyCalculator.multiply(price, quantity);
						this.set("Amount", amount);
					}
				},

				/**
				 * Handles product values change.
				 * @param {Terrasoft.BaseViewModel} item Changed product model.
				 * @protected
				 */
				onDataGridItemChanged: function(item) {
					var basket = this.getBasketData();
					var itemId = item.get("Id");
					var quantity = item.get("Quantity") || 0;
					if (quantity < 0) {
						quantity = 0;
						item.set("Quantity", quantity, this.silentAttr);
					}
					this._calculateProductFields(item);
					var existingItem = basket.find(itemId);
					if (quantity > 0 && !existingItem) {
						basket.add(itemId, item);
					} else {
						basket.replace(existingItem, item, itemId);
					}
					this.calcSummary();
				},

				/**
				 * Calculates product fields.
				 * @param {Terrasoft.BaseViewModel} product Changed product model.
				 * @private
				 */
				_calculateProductFields: function(product) {
					var productUtilities = this.getProductUtilities();
					productUtilities.calculateProduct(product, true);
				},

				/**
				 * Checks if product is in master entity.
				 * @param {Terrasoft.BaseViewModel} item Product model.
				 * @returns {Boolean} Is product in master entity flag.
				 * @private
				 */
				_isProductInMasterEntity: function(item) {
					var masterEntityProductIdColumnName = this.getMasterEntityProductSchemaName() + "Id";
					return this.isNotEmpty(item.get(masterEntityProductIdColumnName));
				},

				/**
				 * Handles measure unit change.
				 * @protected
				 * @param {Terrasoft.BaseViewModel} item Changed model.
				 * @param {Number|Object} value Changed value.
				 */
				recalculateQuantity: function(item, value) {
					this.set("NeedRecalc", true);
					var count = item.get("Quantity");
					item.validate = this.validate;
					if (this.isEmpty(count) || (count < 0)) {
						count = 0;
						item.set("Quantity", parseFloat(count), this.silentAttr);
					}
					if (this.isNotEmpty(value) && value.NumberOfBaseUnits) {
						item.set("BaseQuantity", count * value.NumberOfBaseUnits);
						this.set("NeedRecalc", false);
					} else if (count === 0) {
						item.set("BaseQuantity", 0);
						this.set("NeedRecalc", false);
					} else {
						var productUtilities = this.getProductUtilities();
						productUtilities.setNumberOfBaseUnitsAndBaseQuantity(item, function() {
							this.set("NeedRecalc", false);
							if (this.get("NeedSave") === true) {
								this.saveSelectedProducts();
							}
						}, this);
					}
				},

				/**
				 * Returns basket data.
				 * @protected
				 * @return {Terrasoft.Collection} Basket data collection.
				 */
				getBasketData: function() {
					var baskedData = this.get("BasketData");
					if (!baskedData) {
						baskedData = new this.Terrasoft.Collection();
						this.set("BasketData", baskedData);
					}
					return baskedData;
				},

				/**
				 * Loads product selection grid data.
				 * @protected
				 * @virtual
				 */
				loadGridData: function(callback, scope) {
					var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
					var mainEsq = this.getMainDataEsq();
					batchQuery.add(mainEsq);
					var basePriceList = this.get("BasePriceList");
					if (basePriceList) {
						var basePriceListProductEsq = this.getProductInBasePriceListEsq(basePriceList);
						batchQuery.add(basePriceListProductEsq);
					}
					var masterEntity = this.get("MasterEntity");
					if (masterEntity) {
						var masterEntityEsq = this.getMasterEntityProductsEsq(masterEntity);
						batchQuery.add(masterEntityEsq);
					}
					this.set("sortColumnLastValue", null);
					this.showBodyMask();
					batchQuery.execute(function(response) {
						this.onGridDataLoaded(response);
						this.hideBodyMask();
						this.Ext.callback(callback, scope);
					}, this);
				},

				/**
				 * @inheritDoc Terrasoft.BaseViewModel#getLookupQuery
				 */
				getLookupQuery: function(filterValue, columnName) {
					var esq = this.callParent(arguments);
					var handlers = this.getLookupColumnHandlers();
					var handler = handlers[columnName];
					if (this.Ext.isFunction(handler)) {
						handler.apply(this, [esq, filterValue]);
					}
					return esq;
				},

				/**
				 * Returns lookup columns handlers.
				 * @protected
				 * @virtual
				 * @return {Object} Lookup handlers config.
				 */
				getLookupColumnHandlers: function() {
					return {
						"Unit":  this.applyUnitItemsEsq,
						"PriceList": this.applyProductPriceItemsEsq
					};
				},

				/**
				 * @obsolete
				 */
				fillLookupItems: function(filter, list, getEsqFn, fillFn) {
					if (this.isEmpty(list)) {
						return;
					}
					list.clear();
					const esq = getEsqFn.call(this, filter);
					esq.getEntityCollection(function(response) {
						var collection = response.collection;
						var columns = {};
						if (collection && collection.isEmpty()) {
							return;
						}
						this.Terrasoft.each(collection.getItems(), function(item) {
							const id = item.get("Id");
							const lookupValue = fillFn.call(this, item);
							if (!list.contains(id)) {
								columns[id] = lookupValue;
							}
						}, this);
						list.loadAll(columns);
					}, this);
				},

				/**
				 * @obsolete
				 */
				fillPriceListItems: function(filter, list) {
					this.fillLookupItems(filter, list, this.getProductPriceItemsSelectEsq, function(item) {
						const id = item.get("Id");
						return {
							displayValue: item.get("Name"),
							value: id,
							Price: item.get("Price"),
							Currency: item.get("Currency"),
							Tax: item.get("Tax"),
							DiscountTax: item.get("DiscountTax"),
						};
					});
				},

				/**
				 * @obsolete
				 */
				fillUnitItems: function(filter, list) {
					this.fillLookupItems(filter, list, this.getUnitItemsSelectEsq, function(item) {
						const id = item.get("Id");
						return {
							displayValue: item.get("Name"),
							value: id,
							NumberOfBaseUnits: item.get("NumberOfBaseUnits"),
							IsBase: item.get("IsBase")
						};
					});
				},

				/**
				 * @inheritdoc Terrasoft.BaseModel#getModelColumns
				 * @override
				 */
				getModelColumns: function() {
					var baseColumns = this.callParent(arguments);
					this.Terrasoft.each(baseColumns, function(column) {
						if (column && column.dataValueType === this.Terrasoft.DataValueType.LOOKUP) {
							column.isSimpleLookup = true;
						}
					}, this);
					return baseColumns;
				},

				/**
				 * Generates configuration of the element view.
				 * @param {Object} rowConfig Link to the configuration element of ContainerList.
				 */
				onGetItemConfig: function(rowConfig) {
					var rowItemsConfig = [];
					var columnsConfig = this.getProductSelectionProfileColumns();
					this.Terrasoft.each(columnsConfig, function(column, columnName) {
						column.columnName = columnName;
					});
					this.generateActiveRowControlsConfig(null, columnsConfig, rowItemsConfig);
					var defaultRowConfig = {
						className: "Terrasoft.Container",
						id: "gridRow-container",
						selectors: {wrapEl: "#gridRow-container"},
						classes: {wrapClassName: ["rowContainer", "grid-listed-row", "grid-active-selectable"]},
						markerValue: {"bindTo": "Name"},
						items: rowItemsConfig
					};
					rowConfig.config = defaultRowConfig;
				},

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#getActiveRowCellConfig
				 * @override
				 */
				getActiveRowCellConfig: function(columnConfig, currentColumnIndex) {
					var columnName = columnConfig.columnName;
					var isEditable = this.isColumnEditable(columnName);
					var column = this.columns[columnName];
					var config = {
						dataValueType: columnConfig.dataValueType,
						precision: column && column.precision
					};
					var cellConfig = isEditable && column
						? this.getCellControlsConfig(column)
						: this.getCellLabelConfig(columnName, config);
					cellConfig = this.Ext.apply({
						layout: {
							colSpan: columnConfig.colSpan,
							column: currentColumnIndex,
							row: 0,
							rowSpan: 1
						}
					}, cellConfig);
					return cellConfig;
				},

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#applyBusinessRulesForActiveRow
				 * @override
				 */
				applyBusinessRulesForActiveRow: function() {
					return;
				},

				/**
				 * Returns column editable flag.
				 * @protected
				 * @virtual
				 * @param {String} columnName Column name.
				 * @return {Boolean} Column editable flag.
				 */
				isColumnEditable: function(columnName) {
					var editableColumns = this.getEditableColumns();
					return this.Terrasoft.contains(editableColumns, columnName);
				},

				/**
				 * Returns editable columns.
				 * @protected
				 * @virtual
				 * @return {Array} Editable columns array.
				 */
				getEditableColumns: function() {
					return ["Quantity", "Unit", "Price", "PriceList"];
				},

				/**
				 * Returns label config.
				 * @protected
				 * @param {String} columnName Name of not found column .
				 * @return {Object} columnconfig Controls config for not found column cell.
				 */
				getCellLabelConfig: function(columnName, columnconfig) {
					var id = this.getCellControlId(columnName, "Label");
					var config = {
						itemType: this.Terrasoft.ViewItemType.LABEL,
						name: columnName,
						caption: {
							bindTo: columnName,
							bindConfig: {
								converter: this.getFormattedLabelValue.bind(this, columnconfig)
							}
						},
						generateId: false,
						id: id,
						markerValue: columnName,
						selectors: {wrapEl: "#" + id}
					};
					return config;
				},

				/**
				 * Returns formatted grid column label value.
				 * @param {Object} config Column config.
				 * @param {Terrasoft.DataValueType} config.dataValueType Column type.
				 * @param {Number} config.precision Column precision.
				 * @param {String} value Column value to format.
				 * @return {String} Formatted label value.
				 * @protected
				 */
				getFormattedLabelValue: function(config, value) {
					if (this.isEmpty(value) || this.isEmpty(config)) {
						return value;
					}
					return this.Terrasoft.getTypedStringValue(value, config.dataValueType, {
						decimalPrecision: config.precision
					});
				},

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#getDefaultCellControlsConfig
				 * @override
				 */
				getDefaultCellControlsConfig: function(columnName, params) {
					var id = this.getCellControlId(columnName, "Control");
					var config = {
						generateId: false,
						id: id,
						wrapId: id + "-wrap",
						markerValue: columnName
					};
					params = this.Ext.apply(params, config);
					return this.mixins.ConfigurationGridUtilities.getDefaultCellControlsConfig.call(this, columnName, params);
				},

				/**
				 * Returns cell control identifier.
				 * @protected
				 * @param {String} columnName
				 * @param {String} controlType
				 * @return {String}
				 */
				getCellControlId: function(columnName, controlType) {
					return [this._formatColumnName(columnName), controlType, this.Terrasoft.generateGUID()]
						.join("-");
				},

				/**
				 * Loads FolderManager module.
				 * @protected
				 * @param {String} renderTo Render container name.
				 */
				loadFolderManager: function(renderTo) {
					var folderManagerModuleId = this.sandbox.id + "_FolderManagerModule";
					this.sandbox.subscribe("FolderInfo", function() {
						return this.getFolderManagerConfig(this.entitySchema);
					}, this, [folderManagerModuleId]);
					var folderManagerName = this.Terrasoft.Features.getIsEnabled("NewProductCatalogueFolderManager")
						? this.folderManagerModuleName
						: "FolderManager";
					this.sandbox.loadModule(folderManagerName, {
						renderTo: renderTo,
						id: folderManagerModuleId
					});
				},

				/**
				 * Returns section folder manager settings.
				 * @protected
				 * @virtual
				 * @return {Object}
				 */
				getFolderManagerConfig: function(schema) {
					if (this.Terrasoft.Features.getIsEnabled("NewProductCatalogueFolderManager")) {
						return {
							entitySchemaName: this.getFolderEntityName(),
							inFolderEntitySchemaName: this.getInFolderEntityName(),
							entityColumnNameInFolderEntity: this.getEntityColumnNameInFolderEntity(),
							sectionEntitySchema: schema,
							activeFolderId: null,
							useStaticFolders: false,
							folderManagerViewModelClassName: this.folderManagerViewModelClassName,
							folderFilterViewId: this.folderManagerViewConfigGenerator,
							folderFilterViewModelId: this.folderManagerViewModelConfigGenerator
						};
					} else {
						var filterValues = [{
							columnPath: "IsArchive",
							value: false
						}];
						var config = {
							entitySchemaName: "ProductFolder",
							sectionEntitySchema: schema,
							activeFolderId: null,
							catalogueRootRecordItem: {
								value: DistributionConstants.ProductFolder.RootCatalogueFolder.RootId,
								displayValue: this.get("Resources.Strings.ProductCatalogueRootCaption")
							},
							catalogAdditionalFiltersValues: filterValues,
							isProductSelectMode: true,
							closeVisible: false
						};
						return config;
					}
				},

				/**
				 * Gets entity-if-folder schema name.
				 * @return {String} entity-in-folder schema name.
				 */
				getInFolderEntityName: function() {
					return "ProductInFolder";
				},

				/**
				 * Gets main entity column name from entity-in-folder.
				 * @return {String} main entity column name.
				 */
				getEntityColumnNameInFolderEntity: function() {
					return "Product";
				},

				/**
				 * Gets folder entity schema name.
				 * @return {String} folder entity schema name.
				 */
				getFolderEntityName: function() {
					return "ProductFolder";
				},

				/**
				 * Handles filter update.
				 * @param {String} filterKey Filter key.
				 * @param {Terrasoft.FilterGroup} filterItem Filter item.
				 */
				onFilterUpdate: function(filterKey, filterItem) {
					if (this.isGridDataView(this.get("CurrentDataView"))) {
						this.set("CatalogueFilters", filterItem);
						var grid = this.getGridData();
						grid.clear();
						this.loadGridData();
					}
				},

				/**
				 * Subscribes for sandbox events.
				 * @protected
				 * @virtual
				 */
				subscribeSandboxEvents: function() {
					this.sandbox.subscribe("ChangeDataView", this.changeDataView, this,
						["ViewModule_MainHeaderModule_" + this.sandbox.moduleName]);
					this.sandbox.subscribe("NeedHeaderCaption", function() {
						this.initDataViews();
					}, this);
					this.sandbox.subscribe("QuickSearchFilterInfo", function() {
						return this.getQuickSearchFilterConfig();
					}, this);
					this.sandbox.subscribe("UpdateQuickSearchFilter", function(filterItem) {
						this.onQuickSearchFilterUpdate(filterItem.key, filterItem.filters, filterItem.filtersValue);
					}, this);
					var gridSettingsChangedId = this.sandbox.id + "_CardModuleV2_GridSettingsPage";
					this.sandbox.subscribe("GetGridSettingsInfo", this.getGridSettingsInfo, this, [gridSettingsChangedId]);
					this.sandbox.subscribe("SaveGridSettings", this._setProfileData, this, [gridSettingsChangedId]);
					this.sandbox.subscribe("UpdateCatalogueFilter", function(filterItem) {
						this.onFilterUpdate(filterItem.key, filterItem.filters, filterItem.filtersValue);
					}, this);
				},

				/**
				 * Get grid settings.
				 * @return {Object} - grid settings config.
				 * @protected
				 */
				getGridSettingsInfo: function() {
					return {
						entitySchema: this.entitySchema,
						entitySchemaName: this.entitySchemaName,
						baseGridType: this.Terrasoft.GridType.LISTED,
						useBackwards: true,
						isSingleTypeMode: true,
						profileKey: this.getProfileKey(),
						propertyName: "DataGrid"
					};
				},

				/**
				 * Init data view.
				 * @protected
				 * @param {Boolean} isCommandLineVisible Command line visibility flag.
				 */
				initDataViews: function(isCommandLineVisible) {
					this.sandbox.publish("InitDataViews", {
						caption: this.getModuleCaption(),
						dataViews: this.getDataViews(),
						isCommandLineVisible: isCommandLineVisible,
						moduleName: this.sandbox.moduleName,
						hidePageCaption: true
					});
				},

				/**
				 * Returns data views.
				 * @protected
				 * @virtual
				 * @return {Terrasoft.Collection} Data views collection.
				 */
				getDataViews: function() {
					var moduleCaption = this.getModuleCaption();
					var gridDataView = {
						name: "GridDataView",
						active: true,
						caption: moduleCaption,
						hint: this.get("Resources.Strings.ProductsListDataViewHint"),
						icon: this.get("Resources.Images.GridDataViewIcon")
					};
					var basketDataView = {
						name: "BasketDataView",
						caption: moduleCaption,
						hint: this.get("Resources.Strings.CartDataViewHint"),
						icon: this.get("Resources.Images.BasketDataViewIcon")
					};
					var dataViews = Ext.create("Terrasoft.Collection");
					dataViews.add(gridDataView.name, gridDataView, 0);
					dataViews.add(basketDataView.name, basketDataView, 1);
					this.set("DataViews", dataViews);
					return dataViews;
				},

				/**
				 * Returns page's caption.
				 * @protected
				 * @virtual
				 * @return {String} Page's caption.
				 */
				getModuleCaption: function() {
					var entity = this.get("MasterEntity");
					var entityCaption = this.getEntityCaption();
					return this.Ext.String.format(
						this.get("Resources.Strings.ModuleCaption"), entityCaption, entity.get("Name")
					);
				},

				/**
				 * Returns entity's caption.
				 * @protected
				 * @virtual
				 * @returns {String} Entity's caption.
				 */
				getEntityCaption: function() {
					var entityCaption = Terrasoft.ModuleUtils.getModuleStructureByName(this.get("MasterEntitySchemaName"));
					return entityCaption.moduleCaption.substr(0, entityCaption.moduleCaption.length - 1);
				},

				/**
				 * Changes current data view.
				 * @protected
				 * @param {Object} viewConfig Data view config.
				 */
				changeDataView: function(viewConfig) {
					if (this.get("CurrentDataView") === viewConfig.tag) {
						return;
					}
					var newSearchStringValue = "";
					var wAC = Ext.get("workingAreaContainer");
					if (this.isBasketDataView(viewConfig.tag)) {
						wAC.addCls("no-folders");
						this.saveDataViewGridCollection();
						this.loadBasketGridData();
					} else {
						wAC.removeCls("no-folders");
						newSearchStringValue = this.get("QuickSearchFilterString");
						this.reloadDataViewGridCollection();
					}
					this.sandbox.publish("UpdateQuickSearchFilterString", {
						newSearchStringValue: newSearchStringValue,
						autoApply: false
					});
					this.set("CurrentDataView", viewConfig.tag);
				},

				/**
				 * Saves products for current data view.
				 * @protected
				 */
				saveDataViewGridCollection: function() {
					var gridData = this.getGridData();
					var dataCollection = new this.Terrasoft.Collection();
					gridData.each(function(item) {
						dataCollection.add(item.get("Id"), item);
					}, this);
					this.set("DataViewGridCollection", dataCollection);
				},

				/**
				 * Reloads product collection for current data view.
				 * @protected
				 */
				reloadDataViewGridCollection: function() {
					const collection = this.get("DataViewGridCollection");
					const basket = this.getBasketData();
					basket.each(function(basketItem) {
						const editableColumns = this.getEditableColumns();
						this.Terrasoft.each(editableColumns, function(columnName) {
							const item = collection.find(basketItem.get("Id"));
							if (!item) {
								return;
							}
							this._setValueFromBasket(basketItem, item, columnName);
						}, this);
					}, this);
					const gridData = this.getGridData();
					gridData.reloadAll(collection);
				},

				/**
				 * @private
				 */
				_setValueFromBasket: function(basketItem, item, columnName) {
					let comparableBasketValue;
					let comparableValue;
					const basketValue = comparableBasketValue = basketItem.get(columnName);
					const itemValue = comparableValue = item.get(columnName);
					if (this.Ext.isObject(basketValue)) {
						comparableBasketValue = basketValue.value;
						comparableValue = itemValue.value;
					}
					if (comparableBasketValue !== comparableValue) {
						item.set(columnName, basketValue);
					}
				},

				/**
				 * Loads products in basket to show up on page.
				 * @protected
				 */
				loadBasketGridData: function() {
					var dataCollection = new Terrasoft.Collection();
					var basket = this.getBasketData();
					basket.each(function(item) {
						if (item.get("Quantity") > 0) {
							var cloneItem = this.cloneProduct(item);
							this._prepareItem(cloneItem);
							this.setColumnHandlers(cloneItem);
							dataCollection.add(cloneItem.get("Id"), cloneItem);
						}
					}, this);
					var gridData = this.getGridData();
					gridData.reloadAll(dataCollection);
					this.set("BasketViewGridCollection", dataCollection);
				},

				/**
				 * Set column change handlers.
				 * @protected
				 * @param {Object} item Product model.
				 */
				setColumnHandlers: function(item) {
					item.on("change", this.onDataGridItemChanged, this);
					item.on("change:Unit", this.recalculateQuantity, this);
					item.on("change:Quantity", this.recalculateQuantity, this);
					item.on("change:Price", this.recalculateQuantity, this);
					item.on("change:PriceList", this.onPriceListChange, this);
				},

				/**
				 * Handles product price list change.
				 * @protected
				 * @param {Terrasoft.BaseViewModel} item Changed model.
				 * @param {Number|Object} value Changed value.
				 */
				onPriceListChange: function(item, value) {
					if (this.isEmpty(value)) {
						const basePriceList = this.get("BasePriceList");
						const productPrices = item.get("PriceListList");
						value = productPrices.get(basePriceList.value);
					}
					const productUtilities = this.getProductUtilities();
					const selectedListCurrency = value.Currency;
					const priceListCurrencyId = selectedListCurrency.value;
					const masterCurrency = this._getMasterEntityColumnValue("Currency");
					const masterCurrencyId = masterCurrency.value;
					item.set("Currency", selectedListCurrency);
					const priceListPrice = value.Price;
					item.set("Price", priceListPrice);
					item.set("PriceDisplayValue", productUtilities.getFormattedNumberValue(priceListPrice));
					item.set("Tax", value.Tax);
					item.set("DiscountTax", value.DiscountTax);
					if (masterCurrencyId !== priceListCurrencyId) {
						this._loadPrice(item);
					}
				},

				/**
				 * Get product clone.
				 * @protected
				 * @param {Object} product - product row values.
				 * @return {Terrasoft.BaseSchemaViewModel} Cloned product.
				 */
				cloneProduct: function(product) {
					var values = this.Ext.apply(product.values, product.changedValues);
					return this.getGridRecordByItemValues(values, this.entitySchema);
				},

				/**
				 * Returns config for QuickSearch module.
				 * @protected
				 * @virtual
				 * @return {Object} QuickSearch config.
				 */
				getQuickSearchFilterConfig: function() {
					return {
						InitSearchString: "",
						SearchStringPlaceHolder: this.get("Resources.Strings.SearchStringPlaceHolder"),
						FilterColumns: [
							{
								Column: "Name",
								ComparisonType: Terrasoft.ComparisonType.START_WITH
							},
							{
								Column: "Code",
								ComparisonType: Terrasoft.ComparisonType.START_WITH
							}
						]
					};
				},

				/**
				 * Handles QuickSearch module filter update.
				 * @protected
				 * @param {String} filterKey Filter Key.
				 * @param {Terrasoft.FilterGroup} filterItem Filter group.
				 * @param {String} filtersValue Filter value.
				 */
				onQuickSearchFilterUpdate: function(filterKey, filterItem, filtersValue) {
					this.showBodyMask();
					var currentDataView = this.get("CurrentDataView");
					if (this.isGridDataView(currentDataView)) {
						this.handleFilterForGridDataView(filterItem, filtersValue);
					}
					if (this.isBasketDataView(currentDataView)) {
						this.handleFilterForBasketView(filtersValue);
					}
					this.hideBodyMask();
				},

				/**
				 * Handles QuickSearch module filter update for basket view.
				 * @protected
				 * @param {String} filtersValue Filter value.
				 */
				handleFilterForBasketView: function(filtersValue) {
					var collection = this.get("BasketViewGridCollection");
					var filteredCollection = Ext.isEmpty(filtersValue) ?
						collection :
						collection.filterByFn(
							function(item) {
								return this._productFilterPredicate(item, filtersValue);
							}, this
						);
					var gridData = this.getGridData();
					gridData.reloadAll(filteredCollection);
				},

				/**
				 * Handle filter for data grid views.
				 * @protected
				 * @param {Object} filterItem - filter config.
				 * @param {String} filtersValue - filter value.
				 */
				handleFilterForGridDataView: function(filterItem, filtersValue) {
					this.set("QuickSearchFilterString", filtersValue);
					this.set("QuickSearchFilters", filterItem);
					var grid = this.getGridData();
					grid.clear();
					this.loadGridData();
				},

				/**
				 * Product filter predicate.
				 * @param {Terrasoft.BaseViewModel} item Product item.
				 * @return {Boolean}
				 * @private
				 */
				_productFilterPredicate: function(item, filtersValue) {
					var code = item.get("Code") || "";
					var name = item.get("Name") || "";
					return (name.toLowerCase()
							.indexOf(filtersValue.toLowerCase()) !== -1 ||
						code.toLowerCase()
							.indexOf(filtersValue.toLowerCase()) !== -1);
				},

				/**
				 * Additional processing after products saving.
				 * @protected
				 */
				afterSave: function() {
					this.sandbox.publish("ProductSelectionSave", this.findSelectedProducts(), [this.sandbox.id]);
					this.sandbox.publish("BackHistoryState");
					this.hideBodyMask();
				},

				/**
				 * Handles save button click.
				 */
				onSaveButtonClick: function() {
					this.saveSelectedProducts();
				},

				/**
				 * Handles cancel button click.
				 */
				onCancelButtonClick: function() {
					this.sandbox.publish("BackHistoryState");
				},

				/**
				 * Performs product insert and update.
				 * @protected
				 */
				saveSelectedProducts: function() {
					if (this.get("NeedRecalc") === true) {
						this.set("NeedSave", true);
						return;
					}
					this.showBodyMask({timeout: 0});
					var selectedProducts = this.getBasketData();
					if (this.Ext.isEmpty(this.get("MasterEntitySchemaName")) ||
						this.Ext.isEmpty(this.get("MasterRecordId")) ||
						(selectedProducts.getCount() < 1)) {
						this.afterSave();
						return;
					}
					var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
					var rootSchemaName = this.getMasterEntityProductSchemaName();
					selectedProducts.each(function(item) {
						this._processItemToSave(batchQuery, rootSchemaName, item);
					}, this);
					batchQuery.execute(this.afterSave, this);
				},

				/**
				 * Processes product item for saving.
				 * @private
				 * @param {Terrasoft.BatchQuery} batchQuery Batch query for saving.
				 * @param {String} rootSchemaName Schema name for saving.
				 * @param {Terrasoft.BaseViewModel} item Product item.
				 */
				_processItemToSave: function(batchQuery, rootSchemaName, item) {
					var productUtilities = this.getProductUtilities();
					productUtilities.calculateProduct(item, true);
					var query;
					var quantity = item.get("Quantity");
					if (this._isProductInMasterEntity(item)) {
						if (quantity === 0) {
							query = this.formDeleteQuery(rootSchemaName, item);
						} else {
							query = this.formUpdateQuery(rootSchemaName, item);
						}
					} else {
						if (quantity === 0) {
							return;
						}
						query = this.formInsertQuery(rootSchemaName, item);
					}
					batchQuery.add(query);
				},

				/**
				 * Returns Master entity product EntitySchema name.
				 * @protected
				 * @return {String} Master entity product EntitySchema name.
				 */
				getMasterEntityProductSchemaName: function() {
					return this.entitySchemaName;
				},

				/**
				 * Returns selected products.
				 * @protected
				 * @return {Collection} Returns selected products collection.
				 */
				findSelectedProducts: function() {
					var grid = this.getGridData();
					var resultCollection = grid.filterByFn(function(item) {
						var quantity = parseFloat(item.get("Quantity"));
						return quantity > 0;
					});
					return resultCollection;
				},

				/**
				 * Determines, is provided data view - grid data view.
				 * @param dataViewName - provided data view name.
				 * @return {Boolean} flag of provided data view - grid data view.
				 */
				isGridDataView: function(dataViewName) {
					return dataViewName === "GridDataView";
				},

				/**
				 * Determines, is provided data view - basket data view.
				 * @param dataViewName - provided data view name.
				 * @return {Boolean} flag of provided data view - basket data view.
				 */
				isBasketDataView: function(dataViewName) {
					return dataViewName === "BasketDataView";
				},

				/**
				 * Loads next items.
				 */
				onLoadNext: function() {
					var currentDataView = this.get("CurrentDataView");
					if (this.isGridDataView(currentDataView)) {
						this.loadGridData();
					}
				}

			},
			diff: [
				{
					"operation": "insert",
					"name": "productSelectionContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["productSelectionContainer-class"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "actionButtonsContainer",
					"parentName": "productSelectionContainer",
					"propertyName": "items",
					"values": {
						"id": "actionButtonsContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["actionButtonsContainer-class", "left-container"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "workingAreaContainer",
					"parentName": "productSelectionContainer",
					"propertyName": "items",
					"values": {
						"id": "workingAreaContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["workingAreaContainer-class"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "utilsContainer",
					"parentName": "rightModulesContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["utilsContainer-class", "utilsContainer-width-class"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SaveButton",
					"parentName": "actionButtonsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
						"tag": "save",
						"markerValue": "SaveButton",
						"click": {"bindTo": "onSaveButtonClick"}
					}
				},
				{
					"operation": "insert",
					"name": "CancelButton",
					"parentName": "actionButtonsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.DEFAULT,
						"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
						"tag": "cancel",
						"markerValue": "CancelButton",
						"click": {"bindTo": "onCancelButtonClick"}
					}
				},
				{
					"operation": "insert",
					"name": "utilsButtomContainer",
					"parentName": "utilsContainer",
					"propertyName": "items",
					"values": {
						"id": "utilsButtomContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": []},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "searchContainer",
					"parentName": "actionButtonsContainer",
					"propertyName": "items",
					"values": {
						"id": "searchContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["searchContainer-class"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "quickSearchModule",
					"parentName": "searchContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE,
						"moduleName": "QuickSearchModule"
					}
				},
				{
					"operation": "insert",
					"name": "summaryContainer",
					"parentName": "utilsButtomContainer",
					"propertyName": "items",
					"values": {
						"id": "summaryContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["summaryContainer-class"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "summaryStringContainer",
					"parentName": "summaryContainer",
					"propertyName": "items",
					"values": {
						"id": "summaryStringContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["summaryStringContainer-class"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "viewOptionsContainer",
					"parentName": "actionButtonsContainer",
					"propertyName": "items",
					"values": {
						"id": "viewOptionsContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["viewActionsContainer-class"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ViewOptionsButton",
					"parentName": "viewOptionsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.ViewOptionsButtonCaption"},
						"menu": {"items": {"bindTo": "ViewOptionsButtonMenuItems"}}
					}
				},
				{
					"operation": "insert",
					"name": "lineItemsCaptionContainer",
					"parentName": "summaryStringContainer",
					"propertyName": "items",
					"values": {
						"id": "lineItemsCaptionContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["lineItemsCaptionContainer-class", "summary-label-container-class"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "lineItemsCaptionLabel",
					"parentName": "lineItemsCaptionContainer",
					"propertyName": "items",
					"values": {
						"id": "lineItemsCaptionLabel",
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.LineItemsCaption"},
						"markerValue": "LineItemsCaption",
						"classes": {"labelClass": "summary-label-class"}
					}
				},
				{
					"operation": "insert",
					"name": "lineItemsCountContainer",
					"parentName": "summaryStringContainer",
					"propertyName": "items",
					"values": {
						"id": "lineItemsCountContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["lineItemsCountContainer-class", "summary-label-container-class"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "lineItemsCountLabel",
					"parentName": "lineItemsCountContainer",
					"propertyName": "items",
					"values": {
						"id": "lineItemsCountLabel",
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "LineItemsCount"},
						"markerValue": "LineItemsCount",
						"classes": {"labelClass": "summary-highlight-label-class"}
					}
				},
				{
					"operation": "insert",
					"name": "totalAmountCaptionContainer",
					"parentName": "summaryStringContainer",
					"propertyName": "items",
					"values": {
						"id": "totalAmountCaptionContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["totalAmountCaptionContainer-class", "summary-label-container-class"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "totalAmountCaptionLabel",
					"parentName": "totalAmountCaptionContainer",
					"propertyName": "items",
					"values": {
						"id": "totalAmountCaptionLabel",
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.TotalAmountCaption"},
						"markerValue": "TotalAmountCaption",
						"classes": {"labelClass": "summary-label-class"}
					}
				},
				{
					"operation": "insert",
					"name": "currencySymbolContainer",
					"parentName": "summaryStringContainer",
					"propertyName": "items",
					"values": {
						"id": "currencySymbolContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["currencySymbolContainer-class", "summary-label-container-class"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "currencySymbolLabel",
					"parentName": "currencySymbolContainer",
					"propertyName": "items",
					"values": {
						"id": "currencySymbolLabel",
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "CurrencySymbol"},
						"markerValue": "CurrencySymbol",
						"classes": {"labelClass": "summary-highlight-label-class"}
					}
				},
				{
					"operation": "insert",
					"name": "totalAmountContainer",
					"parentName": "summaryStringContainer",
					"propertyName": "items",
					"values": {
						"id": "totalAmountContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["totalAmountContainer-class", "summary-label-container-class"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "totalAmountLabel",
					"parentName": "totalAmountContainer",
					"propertyName": "items",
					"values": {
						"id": "totalAmountLabel",
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "TotalAmount",
							"bindConfig": {"converter": Terrasoft.getFormattedMoneyValue}
						},
						"markerValue": "TotalAmount",
						"classes": {"labelClass": "summary-highlight-label-class"}
					}
				},
				{
					"operation": "insert",
					"name": "leftModulesContainer",
					"parentName": "workingAreaContainer",
					"propertyName": "items",
					"values": {
						"id": "ProductSelectionLeftModuleContainer",
						"resizable": !Terrasoft.getIsRtlMode(),
						"resizeActionsCode": Terrasoft.ResizeAction.RESIZE_RIGHT.code,
						"resizerConfig": {
							"minWidth": 320,
							"maxWidth": 950
						},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["leftModulesContainer-class"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "rightModulesContainer",
					"parentName": "workingAreaContainer",
					"propertyName": "items",
					"values": {
						"id": "ProductSelectionRightModuleContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["rightModulesContainer-class"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "foldersContainer",
					"parentName": "leftModulesContainer",
					"propertyName": "items",
					"values": {
						"id": "foldersContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["foldersContainer-class"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "filtersContainer",
					"parentName": "leftModulesContainer",
					"propertyName": "items",
					"values": {
						"id": "filtersContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["filtersContainer-class"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "gridWrapContainer",
					"parentName": "rightModulesContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["gridContainer-class"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "gridContainer",
					"parentName": "gridWrapContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["grid", "grid-listed"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "gridCaptionContainer",
					"parentName": "gridContainer",
					"propertyName": "items",
					"values": {
						"id": "gridCaptionContainer",
						"tag": "GridCaptionContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["grid-captions", "gridCaptionContainer"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "DataGrid",
					"parentName": "gridContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"className": "Terrasoft.ContainerList",
						"collection": {"bindTo": "GridData"},
						"onGetItemConfig": {"bindTo": "onGetItemConfig"},
						"observableRowNumber": 1,
						"observableRowVisible": {"bindTo": "onLoadNext"},
						"defaultItemConfig": {},
						"idProperty": "Id",
						"classes": {"wrapClassName": ["productsList"]},
						"markerValue": "DataGrid"
					}
				}
			]
		};
	});


