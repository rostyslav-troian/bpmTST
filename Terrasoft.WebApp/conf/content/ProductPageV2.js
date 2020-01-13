Terrasoft.configuration.Structures["ProductPageV2"] = {innerHierarchyStack: ["ProductPageV2ProductBase", "ProductPageV2"], structureParent: "BaseModulePageV2"};
define('ProductPageV2ProductBaseStructure', ['ProductPageV2ProductBaseResources'], function(resources) {return {schemaUId:'0daec87e-a84d-44bc-9dd0-c90b8d1baa33',schemaCaption: "Edit page - Product", parentSchemaName: "BaseModulePageV2", schemaName:'ProductPageV2ProductBase',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ProductPageV2Structure', ['ProductPageV2Resources'], function(resources) {return {schemaUId:'1455735b-891c-44cc-85fe-3b521d2463df',schemaCaption: "Edit page - Product", parentSchemaName: "ProductPageV2ProductBase", schemaName:'ProductPageV2',parentSchemaUId:'0daec87e-a84d-44bc-9dd0-c90b8d1baa33',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ProductPageV2ProductBase",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ProductPageV2ProductBaseResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ProductPageV2ProductBase", ["MoneyModule", "MultiCurrencyEdit", "MultiCurrencyEditUtilities",
		"css!ProductManagementBaseCss"],
	function(MoneyModule) {
		return {
			entitySchemaName: "Product",
			attributes: {
				/**
				 * Owner of the product.
				 */
				"Owner": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					lookupListConfig: {
						filter: function() {
							return Terrasoft.createColumnIsNotNullFilter("[SysAdminUnit:Contact].Id");
						}
					}
				},
				/**
				 * Unit of the product.
				 */
				"Unit": {
					"isRequired": true
				},
				/**
				 * Price in base currency.
				 * @private
				 */
				"PrimaryPrice": {
					"dataValueType": Terrasoft.DataValueType.FLOAT,
					"dependencies": [
						{
							"columns": ["CurrencyRate", "Price"],
							"methodName": "recalculatePrimaryPrice"
						}
					]
				},
				/**
				 * Currency rate.
				 * @private
				 */
				"CurrencyRate": {
					"dataValueType": Terrasoft.DataValueType.FLOAT,
					"dependencies": [
						{
							"columns": ["Currency"],
							"methodName": "setCurrencyRate"
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
				}
			},
			properties: {
				moneyModule: null
			},
			details: /**SCHEMA_DETAILS*/{
				Files: {
					schemaName: "FileDetailV2",
					entitySchemaName: "ProductFile",
					filter: {
						masterColumn: "Id",
						detailColumn: "Product"
					}
				}
			}/**SCHEMA_DETAILS*/,
			mixins: {
				/**
				 * Mixin multi-currency management in the entity page.
				 */
				MultiCurrencyEditUtilities: "Terrasoft.MultiCurrencyEditUtilities"
			},
			methods: {
				/**
				 * @inheritDoc Terrasoft.BasePageV2#init
				 * @override
				 */
				init: function() {
					this.moneyModule = MoneyModule;
					this.callParent(arguments);
				},
				
				/**
				 * @inheritDoc Terrasoft.BasePageV2#onEntityInitialized
				 * @override
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					this.mixins.MultiCurrencyEditUtilities.init.call(this);
					this.recalculatePrimaryPrice();
					this.setCurrencyRate();
				},

				/**
				 * @inheritDoc Terrasoft.ContextHelpMixin#initContextHelp
				 * @override
				 */
				initContextHelp: function() {
					this.set("ContextHelpId", 1056);
					this.callParent(arguments);
				},

				/**
				 * Handlers the file selection dialog.
				 * @return {Boolean}
				 */
				beforePhotoFileSelected: function() {
					return true;
				},

				/**
				 * Returns photo link.
				 * @protected
				 * @return {String}
				 */
				getPhotoSrcMethod: function() {
					var primaryImageColumnValue = this.get(this.primaryImageColumnName);
					if (primaryImageColumnValue) {
						return this.getSchemaImageUrl(primaryImageColumnValue);
					}
					return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.DefaultPhoto"));
				},

				/**
				 * Handlers changed and upload an image.
				 * @param {Object} photo
				 */
				onPhotoChange: function(photo) {
					if (!photo) {
						this.set(this.primaryImageColumnName, null);
						return;
					}
					this.Terrasoft.ImageApi.upload({
						file: photo,
						onComplete: this.onPhotoUploaded,
						onError: this.Terrasoft.emptyFn,
						scope: this
					});
				},

				/**
				 * Handlers uploaded an image.
				 * @param {String} imageId
				 */
				onPhotoUploaded: function(imageId) {
					var imageData = {
						value: imageId,
						displayValue: "Picture"
					};
					this.set(this.primaryImageColumnName, imageData);
				},

				/**
				 * Returns currency division.
				 * @protected
				 * @return {Number} Currency division.
				 */
				getCurrencyDivision: function() {
					var currency = this.get("Currency");
					return currency && currency.Division;
				},

				/**
				 * Recalculates price in base currency.
				 * @protected
				 */
				recalculatePrimaryPrice: function() {
					var price = this.get("Price");
					if (this.Ext.isEmpty(price)) {
						this.set("PrimaryPrice", null);
						return;
					}
					var division = this.getCurrencyDivision();
					this.moneyModule.RecalcBaseValue.call(this, "CurrencyRate", "Price", "PrimaryPrice", division);
				},

				/**
				 * Sets currency rate.
				 * @protected
				 */
				setCurrencyRate: function() {
					this.moneyModule.LoadCurrencyRate.call(this, "Currency", "CurrencyRate", new Date());
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "PhotoContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["image-edit-container"],
						"layout": {"column": 0, "row": 0, "rowSpan": 2, "colSpan": 3},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "PhotoContainer",
					"propertyName": "items",
					"name": "Photo",
					"values": {
						"getSrcMethod": "getPhotoSrcMethod",
						"onPhotoChange": "onPhotoChange",
						"beforeFileSelected": "beforePhotoFileSelected",
						"readonly": false,
						"generator": "ImageCustomGeneratorV2.generateCustomImageControl"
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Name",
					"values": {
						"layout": {"column": 3, "row": 0, "colSpan": 20},
						"labelWrapConfig": {"classes": {"wrapClassName": ["page-header-label-wrap"]}}
					}
				},
				{
					"operation": "insert",
					"name": "CommonControlGroup",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"layout": {"column": 3, "row": 1, "colSpan": 20, "rowSpan": 1},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ProductGeneralInfoBlock",
					"parentName": "CommonControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "Type",
					"parentName": "ProductGeneralInfoBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "Type",
						"layout": {"column": 0, "row": 0, "colSpan": 12},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"name": "Unit",
					"parentName": "ProductGeneralInfoBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "Unit",
						"layout": {"column": 12, "row": 0, "colSpan": 12},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"name": "Code",
					"parentName": "ProductGeneralInfoBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "Code",
						"layout": {"column": 0, "row": 1, "colSpan": 12},
						"tip": {
							"content": {"bindTo": "Resources.Strings.CodeTip"}
						}
					}
				},
				{
					"operation": "insert",
					"name": "Owner",
					"parentName": "ProductGeneralInfoBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "Owner",
						"layout": {"column": 12, "row": 1, "colSpan": 12},
						"tip": {
							"content": {"bindTo": "Resources.Strings.OwnerTip"}
						}
					}
				},
				{
					"operation": "insert",
					"name": "URL",
					"parentName": "ProductGeneralInfoBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "URL",
						"layout": {"column": 0, "row": 2, "colSpan": 12},
						"tip": {
							"content": {"bindTo": "Resources.Strings.UrlTip"}
						}
					}
				},
				{
					"operation": "insert",
					"name": "IsArchive",
					"parentName": "ProductGeneralInfoBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "IsArchive",
						"layout": {"column": 12, "row": 2, "colSpan": 12},
						"tip": {
							"content": {"bindTo": "Resources.Strings.IsArchiveTip"}
						}
					}
				},
				{
					"operation": "insert",
					"name": "ProductGeneralInfoTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 1,
					"values": {
						"caption": {"bindTo": "Resources.Strings.GeneralInfoTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ProductFilesTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.FilesTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "PriceControlGroup",
					"parentName": "ProductGeneralInfoTab",
					"propertyName": "items",
					"index": 2,
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {"bindTo": "Resources.Strings.PriceGroupCaption"},
						"items": [],
						"controlConfig": {
							"collapsed": false
						},
						"markerValue": "GroupPrices"
					}
				},
				{
					"operation": "insert",
					"name": "NotesControlGroup",
					"parentName": "ProductFilesTab",
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
					"name": "ProductPriceBlock",
					"parentName": "PriceControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
// Columns and details
				{
					"operation": "insert",
					"name": "Price",
					"parentName": "ProductPriceBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "Price",
						"layout": {"column": 0, "row": 0, "colSpan": 12},
						"primaryAmount": "PrimaryPrice",
						"currency": "Currency",
						"rate": "CurrencyRate",
						"primaryAmountEnabled": false,
						"rateEnabled": false,
						"generator": "MultiCurrencyEditViewGenerator.generate"
					}
				},
				{
					"operation": "insert",
					"name": "Tax",
					"parentName": "ProductPriceBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "Tax",
						"layout": {"column": 12, "row": 0, "colSpan": 12},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "ProductFilesTab",
					"propertyName": "items",
					"index": 0,
					"name": "Files",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "NotesControlGroup",
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

define("ProductPageV2", ["BusinessRuleModule"],
		function(BusinessRuleModule) {
			return {
				entitySchemaName: "Product",
				attributes: {
					/**
					 * Unit changed flag.
					 * @type {Boolean}
					 */
					"IsUnitChanged": {"dataValueType": Terrasoft.DataValueType.BOOLEAN},

					/**
					 * Unit of measure.
					 * @type {Object}
					 */
					"Unit": {
						"dependencies": [{
							"columns": ["Unit"],
							"methodName": "unitChanged"
						}]
					},

					/**
					 * Product base currency.
					 */
					"Currency": {
						"lookupListConfig": {
							"columns": ["Symbol"]
						}
					},

					/**
					 * Type.
					 * @type {Object}
					 */
					"Type": {
						"dependencies": [{
							"columns": ["Category"],
							"methodName": "categoryChanged"
						}]
					},

					/**
					 * Base price list.
					 * @type {Object}
					 */
					"BasePriceList": {
						"dataValueType": Terrasoft.DataValueType.LOOKUP,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					}
				},
				details: /**SCHEMA_DETAILS*/{
					/**
					 * Stock balance detail.
					 */
					"ProductStockBalance": {
						"schemaName": "ProductStockBalanceDetailV2",
						"filter": {
							"masterColumn": "Id",
							"detailColumn": "Product"
						}
					},

					/**
					 * Unit of measure detail.
					 */
					"ProductUnitDetail": {
						"schemaName": "ProductUnitDetailV2",
						"filter": {
							"masterColumn": "Id",
							"detailColumn": "Product"
						},
						"subscriber": function(args) {
							args.detailName = "ProductUnitDetail";
							this.onDetailChange(args);
						}
					},

					/**
					 * Price detail.
					 */
					"ProductPriceDetail": {
						"schemaName": "ProductPriceDetailV2",
						"filter": {
							"masterColumn": "Id",
							"detailColumn": "Product"
						},
						"subscriber": function(args) {
							args.detailName = "ProductPriceDetail";
							this.onDetailChange(args);
						}
					},

					/**
					 * Specification detail.
					 */

					"ProductSpecificationDetail": {
						"schemaName": "ProductSpecificationDetailV2",
						"filter": {
							masterColumn: "Id",
							detailColumn: "Product"
						}
					}

				}/**SCHEMA_DETAILS*/,
				rules: {
					/**
					 * Business rule filtering and autocomplete fields Type and Category.
					 */
					"Type": {
						"FiltrationCategoryByType": {
							"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
							"autocomplete": true,
							"autoClean": true,
							"baseAttributePatch": "Category",
							"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
							"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							"attribute": "Category"
						}
					}
				},
				methods: {

					/**
					 * @inheritdoc Terrasoft.BasePageV2#init
					 * @overriden
					 */
					init: function() {
						this.Terrasoft.SysSettings.querySysSettingsItem("BasePriceList", function(value) {
							this.set("BasePriceList", value);
						}, this);
						this.callParent(arguments);
					},

					/**
					 * Updates ProductUnitDetail detail.
					 * @protected
					 */
					updateProductUnitDetail: function() {
						this.updateDetail({detail: "ProductUnitDetail", reloadAll: true});
					},

					/**
					 * Updates ProductPriceDetail detail.
					 * @protected
					 */
					updateProductPriceDetail: function() {
						this.updateDetail({detail: "ProductPriceDetail", reloadAll: true});
					},

					/**
					 * Crated ProductUnit entity schema query.
					 * @private
					 * @return {Terrasoft.EntitySchemaQuery} ProductUnit entity schema query.
					 */
					createProductUnitEsq: function() {
						return this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "ProductUnit"
						});
					},

					/**
					 * Updates product unit on detail changed.
					 * @protected
					 * @param {Guid} unitId Unit Id.
					 */
					updateProductUnit: function(unitId) {
						var esq = this.createProductUnitEsq();
						esq.addColumn("IsBase");
						esq.addColumn("Unit");
						esq.getEntity(unitId, function(response) {
							if (response.success) {
								var item = response.entity;
								if (item.get("IsBase")) {
									this.set("Unit", item.get("Unit"));
								}
							}
						}, this);
					},

					/**
					 * Adds columns to select query.
					 * @protected
					 * @param {Terrasoft.EntitySchemaQuery} esq Price of product query.
					 */
					addColumnsProductPrice: function(esq) {
						esq.addColumn("Price");
						esq.addColumn("Tax");
						esq.addColumn("PriceList");
						esq.addColumn("Currency");
					},

					/**
					 * Updates product price on detail changed.
					 * @protected
					 * @param {Guid} priceId Price Id.
					 */
					updateProductPrice: function(priceId) {
						var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "ProductPrice"
						});
						this.addColumnsProductPrice(esq);
						esq.getEntity(priceId, function(response) {
							if (response.success) {
								this.updateProductPriceHandle(response);
							}
						}, this);
					},

					/**
					 * Updates product price.
					 * @protected
					 * @param {Object} response Server response.
					 */
					updateProductPriceHandle: function(response) {
						var item = response.entity;
						var basePriceList = this.get("BasePriceList");
						var priceList = item.get("PriceList");
						if (basePriceList && priceList &&
								(item.get("PriceList").value === basePriceList.value)) {
							if (item.get("Price")) {
								this.set("Price", item.get("Price"));
							}
							if (item.get("Tax")) {
								this.set("Tax", item.get("Tax"));
							}
							if (item.get("Currency")) {
								this.set("Currency", item.get("Currency"));
							}
						}
					},

					/**
					 * Handles detail change event.
					 * @protected
					 * @param {Object} args Arguments.
					 */
					onDetailChange: function(args) {
						if (args.action !== "edit") {
							return;
						}
						var handleUpdateAction = this.getDetailChangeHandleAction(args.detailName);
						this.Terrasoft.each(args.rows, function(itemKey) {
							if (!itemKey) {
								return;
							}
							handleUpdateAction(itemKey);
						}, this);
					},

					/**
					 * Returns detail change handle action.
					 * @protected
					 * @param {String} detailName Detail name.
					 * @return {Function} Handler function.
					 */
					getDetailChangeHandleAction: function(detailName) {
						var action = this.Terrasoft.emptyFn;
						if (detailName === "ProductUnitDetail") {
							action = this.updateProductUnit;
						} else if (detailName === "ProductPriceDetail") {
							action = this.updateProductPrice;
						}
						return action.bind(this);
					},

					/**
					 * Handles unit of measure changing.
					 * @protected
					 */
					unitChanged: function() {
						this.set("IsUnitChanged", true);
					},

					/**
					 * Handles category changing.
					 * @protected
					 */
					categoryChanged: function() {
						this.set("Type", null);
					},

					/**
					 * Returns unit of measure insert query with Base flag.
					 * @protected
					 * @return {Terrasoft.InsertQuery} Unit of measure insert query.
					 */
					getInsertNewUnit: function() {
						var insert = this.Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: "ProductUnit"
						});
						insert.setParameterValue("Product", this.get("Id"), this.Terrasoft.DataValueType.GUID);
						insert.setParameterValue("Unit", this.get("Unit").value, this.Terrasoft.DataValueType.GUID);
						insert.setParameterValue("IsBase", true, this.Terrasoft.DataValueType.BOOLEAN);
						insert.setParameterValue("NumberOfBaseUnits", 1, this.Terrasoft.DataValueType.FLOAT);
						return insert;
					},

					/**
					 * Updates unit of measure.
					 * @protected
					 * @param {Object} callback Callback function.
					 */
					updateUnit: function(callback) {
						var unit = this.get("Unit");
						if (this.get("IsUnitChanged") && !this.Ext.isEmpty(unit) || this.isNewMode()) {
							var update = this.getUnitUpdateQuery(unit);
							update.execute(function(response) {
								this.set("IsUnitChanged", false);
								if (response.rowsAffected === 0) {
									this.getInsertNewUnit().execute(callback, this);
								} else {
									callback.call(this);
								}
							}, this);
						} else if (callback) {
							callback.call(this);
						}
					},

					/**
					 * Return unit of measure update query.
					 * @protected
					 * @virtual
					 * @param {Object} unit Unit of measure.
					 * @return {Terrasoft.UpdateQuery} Unit update query.
					 */
					getUnitUpdateQuery: function(unit) {
						var update = this.Ext.create("Terrasoft.UpdateQuery", {
							rootSchemaName: "ProductUnit"
						});
						var filters = update.filters;
						var idProduct = this.get("Id");
						var idFilter = this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "Product", idProduct);
						filters.add("IdFilter", idFilter);
						var isBaseFilter = this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "IsBase", true);
						filters.add("isBaseFilter", isBaseFilter);
						update.setParameterValue("Unit", unit.value, this.Terrasoft.DataValueType.GUID);
						return update;
					},

					/**
					 * Returns unit of measure update query with base flag.
					 * @protected
					 * @virtual
					 * @param {Object} config Configuration object.
					 * @return {Terrasoft.UpdateQuery} Update query.
					 */
					getProductUnitUpdateQuery: function(config) {
						var update = this.Ext.create("Terrasoft.UpdateQuery", {
							rootSchemaName: "ProductUnit"
						});
						var oldNumberOfBaseUnits =
								(this.Ext.isEmpty(config.oldNumberOfBaseUnits) ||
								config.oldNumberOfBaseUnits === 0) ? 1 : config.oldNumberOfBaseUnits;
						var newNumberOfBaseUnits = config.numberOfBaseUnits / oldNumberOfBaseUnits;
						var filters = update.filters;
						filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "Product", this.get("Id")));
						filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "Id", config.id));
						update.setParameterValue("IsBase", config.isBase, this.Terrasoft.DataValueType.BOOLEAN);
						update.setParameterValue("NumberOfBaseUnits", newNumberOfBaseUnits,
								this.Terrasoft.DataValueType.FLOAT);
						return update;
					},

					/**
					 * Return unit of measure collection query.
					 * @protected
					 * @virtual
					 * @return {Terrasoft.EntitySchemaQuery} Units of measure query.
					 */
					getProductUnitCollectionEsq: function() {
						var esq = this.createProductUnitEsq();
						esq.addColumn("Id");
						esq.addColumn("Product");
						esq.addColumn("Unit");
						esq.addColumn("IsBase");
						esq.addColumn("NumberOfBaseUnits");
						esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "Product.Id", this.get("Id")));
						return esq;
					},

					/**
					 * Returns unit of measure query.
					 * @protected
					 * @virtual
					 * @return {Terrasoft.EntitySchemaQuery} Unit of measure query.
					 */
					getProductUnitEsq: function() {
						var esq = this.getProductUnitCollectionEsq();
						var unit = this.get("Unit");
						esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "Unit.Id", unit.value));
						return esq;
					},

					/**
					 * Recalculates product units of measure on "Unit" changed.
					 * @protected
					 * @param {Object} productUnit Product config.
					 * @param {Object} callback Callback function.
					 */
					reCalculateUnits: function(productUnit, callback) {
						var esq = this.getProductUnitEsq();
						esq.getEntityCollection(function(response) {
							if (response.success) {
								var batch = this.formProductUnitUpdateBatch(response.collection, productUnit);
								batch.execute(function() {
									callback.call(this);
								}, this);
							} else {
								callback.call(this);
							}
						}, this);
					},

					/**
					 * Forms product units update batch query.
					 * @param {Terrasoft.BaseViewModelCollection} productUnitCollection Units collection.
					 * @param {Object} oldUnit Old unit.
					 * @return {Terrasoft.BatchQuery} Product units update batch query.
					 */
					formProductUnitUpdateBatch: function(productUnitCollection, oldUnit) {
						var batch = this.Ext.create("Terrasoft.BatchQuery");
						productUnitCollection.each(function(item) {
							var update;
							if (this.get("Unit").value !== item.get("Unit").value) {
								update = this.getProductUnitUpdateQuery({
									id: item.get("Id"),
									numberOfBaseUnits: item.get("NumberOfBaseUnits"),
									oldNumberOfBaseUnits: oldUnit.NumberOfBaseUnits,
									isBase: false
								});
							} else {
								update = this.getProductUnitUpdateQuery({
									id: item.get("Id"),
									numberOfBaseUnits: 1,
									oldNumberOfBaseUnits: 1,
									isBase: true
								});
							}
							batch.add(update, function() {}, this);
						}, this);
						return batch;
					},

					/**
					 * Synchronizes Unit field with Unit detail.
					 * @protected
					 * @param {Object} response Service response.
					 */
					synchronizeUnit: function(response) {
						if (response.success && response.collection.getCount() > 0) {
							this.set("NeedRecalculateUnits", {
								resultCollection: response.collection.getItems()[0]
							});
						} else {
							this.set("NeedRecalculateUnits", false);
						}
					},

					/**
					 * Performs base price list record insert on new product save.
					 * @protected
					 * @param {Object} callback Callback function.
					 */
					insertBasePrice: function(callback) {
						var basePriceList = this.get("BasePriceList");
						if (basePriceList) {
							var insert = this.getProductPriceInsertQuery(basePriceList.value);
							insert.execute(callback, this);
						} else {
							callback.call(this);
						}
					},

					/**
					 * Returns product price insert query.
					 * @param {Guid} priceListId Price list Id.
					 * @return {Terrasoft.InsertQuery} Product price insert query.
					 */
					getProductPriceInsertQuery: function(priceListId) {
						var insert = this.Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: "ProductPrice"
						});
						insert.setParameterValue("Product", this.get("Id"), this.Terrasoft.DataValueType.GUID);
						var currency = this.get("Currency");
						if (this.Ext.isEmpty(currency)) {
							currency = {value: null};
						}
						insert.setParameterValue("Currency", currency.value, this.Terrasoft.DataValueType.GUID);
						var tax = this.get("Tax");
						if (this.Ext.isEmpty(tax)) {
							tax = {value: null};
						}
						insert.setParameterValue("Tax", tax.value, this.Terrasoft.DataValueType.GUID);
						insert.setParameterValue("PriceList", priceListId, this.Terrasoft.DataValueType.GUID);
						insert.setParameterValue("Price", this.get("Price"), this.Terrasoft.DataValueType.FLOAT);
						return insert;
					},

					/**
					 * Synchronizes fields with price detail record, that corresonds to base price list.
					 * @protected
					 * @param {Object} response Server response.
					 * @param {Object} config Configuration object.
					 */
					synchronizePrice: function(response, config) {
						if (!response) {
							this.insertBasePrice(function() {
								this.updateProductPriceDetail();
								this.updateProductUnitDetail();
								this.onSaved(false, config);
							});
						} else {
							this.updateProductPriceDetail();
							this.updateProductUnitDetail();
							this.onSaved(false, config);
						}
					},

					/**
					 * Returns base price update query.
					 * @protected
					 * @virtual
					 * @return {Terrasoft.UpdateQuery} Base price update query.
					 */
					getUpdateBasePrice: function() {
						var update = this.Ext.create("Terrasoft.UpdateQuery", {
							rootSchemaName: "ProductPrice"
						});
						var filters = update.filters;
						var idProduct = this.get("Id");
						var idFilter = this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "Product", idProduct);
						filters.add("IdFilter", idFilter);
						var basePriceList = this.get("BasePriceList");
						var isBaseFilter = this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "PriceList", basePriceList.value);
						filters.add("isBaseFilter", isBaseFilter);
						update.setParameterValue("Price", this.get("Price"), this.Terrasoft.DataValueType.FLOAT);
						var currency = this.get("Currency");
						if (this.Ext.isEmpty(currency)) {
							currency = {value: null};
						}
						update.setParameterValue("Currency", currency.value, this.Terrasoft.DataValueType.GUID);
						var tax = this.get("Tax");
						if (this.Ext.isEmpty(tax)) {
							tax = {value: null};
						}
						update.setParameterValue("Tax", tax.value, this.Terrasoft.DataValueType.GUID);
						return update;
					},

					/**
					 * Processes record saved.
					 * @protected
					 * @overriden
					 * @param {Boolean} needSynchronize Need synchronize flag.
					 * @param {Object} config Configuration object.
					 * @return {Boolean} Save success.
					 */
					onSaved: function(needSynchronize, config) {
						if (needSynchronize !== false && this.validate()) {
							this.handleOnSavedEvent(config);
							return false;
						}
						this.callParent(arguments);
					},

					/**
					 * Handles onSaved event.
					 * @protected
					 * @virtual
					 * @param {Object} config Configuration object.
					 */
					handleOnSavedEvent: function(config) {
						var basePriceList = this.get("BasePriceList");
						var batchQuery = this.formOnSavedQuery();
						batchQuery.execute(function(response) {
							if (response.success) {
								var resultUnitSync = response.queryResults[0];
								var resultUpdateBasePriceSync =
										(basePriceList) ? response.queryResults[1].rowsAffected : 0;
								if (resultUnitSync.rows.length) {
									this.reCalculateUnits(resultUnitSync.rows[0], function() {
										this.synchronizePrice(resultUpdateBasePriceSync, config);
									});
								} else {
									this.updateUnit(function() {
										this.synchronizePrice(resultUpdateBasePriceSync, config);
									});
								}
							}
							if (response.errorInfo) {
								this.showInformationDialog(response.errorInfo.message);
							}
						}, this);
					},

					/**
					 * Forms onSaved event update query.
					 * @protected
					 * @virtual
					 * @return {Terrasoft.BatchQuery} Returns formed batch query.
					 */
					formOnSavedQuery: function() {
						var basePriceList = this.get("BasePriceList");
						var batchQuery = Ext.create("Terrasoft.BatchQuery");
						batchQuery.add(this.getProductUnitEsq());
						if (basePriceList) {
							batchQuery.add(this.getUpdateBasePrice());
						}
						return batchQuery;
					}
				},
				diff: /**SCHEMA_DIFF*/[
// Tabs and groups
					{
						"operation": "insert",
						"name": "ProductPricesTab",
						"index": 2,
						"parentName": "Tabs",
						"propertyName": "tabs",
						"values": {
							"caption": {"bindTo": "Resources.Strings.PricesTabCaption"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "ProductSpecificationTab",
						"index": 3,
						"parentName": "Tabs",
						"propertyName": "tabs",
						"values": {
							"caption": {"bindTo": "Resources.Strings.SpecificationTabCaption"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "ProductCategoryControlGroup",
						"parentName": "ProductGeneralInfoTab",
						"propertyName": "items",
						"index": 0,
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"caption": {"bindTo": "Resources.Strings.CategoryGroupCaption"},
							"items": [],
							"controlConfig": {
								"collapsed": false
							}
						}
					},
					{
						"operation": "insert",
						"name": "ProductCategoryBlock",
						"parentName": "ProductCategoryControlGroup",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": []
						}
					},
					{
						"operation": "merge",
						"name": "PriceControlGroup",
						"parentName": "ProductGeneralInfoTab",
						"propertyName": "items",
						"index": 2,
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"caption": {"bindTo": "Resources.Strings.BasePriceGroupCaption"},
							"markerValue": {"bindTo": "Resources.Strings.BasePriceGroupCaption"}
						}
					},
// Columns and details
					{
						"operation": "insert",
						"parentName": "ProductPricesTab",
						"propertyName": "items",
						"name": "ProductPriceDetail",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					},
					{
						"operation": "insert",
						"parentName": "ProductPricesTab",
						"propertyName": "items",
						"name": "ProductStockBalance",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					},
					{
						"operation": "insert",
						"parentName": "ProductSpecificationTab",
						"propertyName": "items",
						"name": "ProductSpecificationDetail",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					},
					{
						"operation": "insert",
						"parentName": "ProductGeneralInfoTab",
						"propertyName": "items",
						"name": "ProductUnitDetail",
						"index": 3,
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					},
					{
						"operation": "merge",
						"name": "Code",
						"parentName": "ProductGeneralInfoBlock",
						"propertyName": "items",
						"values": {
							"bindTo": "Code",
							"layout": {"column": 0, "row": 0, "colSpan": 12}
						}
					},
					{
						"operation": "merge",
						"name": "Owner",
						"parentName": "ProductGeneralInfoBlock",
						"propertyName": "items",
						"values": {
							"bindTo": "Owner",
							"layout": {"column": 12, "row": 0, "colSpan": 12}
						}
					},
					{
						"operation": "merge",
						"name": "URL",
						"parentName": "ProductGeneralInfoBlock",
						"propertyName": "items",
						"values": {
							"bindTo": "URL",
							"layout": {"column": 0, "row": 1, "colSpan": 12}
						}
					},
					{
						"operation": "merge",
						"name": "IsArchive",
						"parentName": "ProductGeneralInfoBlock",
						"propertyName": "items",
						"values": {
							"bindTo": "IsArchive",
							"layout": {"column": 12, "row": 1, "colSpan": 12}
						}
					},
					{
						"operation": "move",
						"name": "Unit",
						"parentName": "ProductPriceBlock",
						"propertyName": "items",
						"values": {
							"bindTo": "Unit",
							"layout": {"column": 12, "row": 1, "colSpan": 12},
							"contentType": Terrasoft.ContentType.ENUM
						}
					},
					{
						"operation": "insert",
						"name": "Category",
						"parentName": "ProductCategoryBlock",
						"propertyName": "items",
						"values": {
							"bindTo": "Category",
							"layout": {"column": 0, "row": 0, "colSpan": 12},
							"contentType": Terrasoft.ContentType.ENUM
						}
					},
					{
						"operation": "move",
						"name": "Type",
						"parentName": "ProductCategoryBlock",
						"propertyName": "items",
						"values": {
							"bindTo": "Type",
							"layout": {"column": 0, "row": 1, "colSpan": 12},
							"contentType": Terrasoft.ContentType.ENUM
						}
					},
					{
						"operation": "insert",
						"name": "TradeMark",
						"parentName": "ProductCategoryBlock",
						"propertyName": "items",
						"values": {
							"bindTo": "TradeMark",
							"layout": {"column": 12, "row": 0, "colSpan": 12}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		});


