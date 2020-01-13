Terrasoft.configuration.Structures["SupplyPaymentGridButtonsUtility"] = {innerHierarchyStack: ["SupplyPaymentGridButtonsUtility"]};
define("SupplyPaymentGridButtonsUtility", ["SupplyPaymentElement", "SupplyPaymentGridButtonsUtilityResources",
		"OrderConfigurationConstants"],
		function(SupplyPaymentElementSchema, resources, OrderConfigurationConstants) {

	/**
	 * ######### ###### ### ###### ###### # ####### ###### "###### ######## # #####".
	 */
	Ext.define("Terrasoft.configuration.SupplyPaymentGridButtonsUtility", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.SupplyPaymentGridButtonsUtility",

		Ext: null,
		Terrasoft: null,

		/**
		 * ########## ######### ###### ####### ### ####### "########".
		 * @return {Object} ######### ###### ####### ### ####### "########".
		 */
		getProductColumnConfig: function() {
			var productsColumn = SupplyPaymentElementSchema.getColumnByName("Products");
			var buttonName = productsColumn.name + "Button";
			var productButtonClickMethodName = "onProductsButtonClick";
			var clearProductButtonClickMethodName = "onClearProductsButtonClick";
			var editProductsButtonConfig = this.getButtonConfig({
				buttonName: buttonName,
				columnName: productsColumn.name,
				columnCaption: productsColumn.caption,
				clickMethodName: productButtonClickMethodName
			});
			var clearProductsButtonConfig = this.getClearProductsButtonsConfig(productsColumn.name,
					clearProductButtonClickMethodName);
			var productColumnConfig = {
				prepareResponseRow: function(row) {
					var productCount = row.get(this.detailColumn.name) || 0;
					var columnValueFormat = "";
					var productCountModulo = productCount % 10;
					var isNotTenthNumber = (((productCount % 100) - (productCount % 10)) / 10) !== 1;
					if (productCount === 0) {
						columnValueFormat = resources.localizableStrings.GridButtonAdd;
					} else if (productCountModulo === 1 && isNotTenthNumber) {
						columnValueFormat = resources.localizableStrings.GridButtonOneProduct;
					} else if (productCountModulo < 5 && isNotTenthNumber) {
						columnValueFormat = resources.localizableStrings.GridButtonLessThanFiveProducts;
					} else {
						columnValueFormat = resources.localizableStrings.GridButtonFiveAndMoreProducts;
					}
					row.set(productsColumn.name, Ext.String.format(columnValueFormat, productCount));
				},
				detailColumn: {
					name: "ProductsCount",
					modifyQuery: function(esq) {
						esq.addAggregationSchemaColumn("[SupplyPaymentProduct:SupplyPaymentElement].Id",
								Terrasoft.AggregationType.COUNT, this.name);
					}
				},
				clickMethodNames: [productButtonClickMethodName, clearProductButtonClickMethodName],
				controlConfig: {
					"name": "ProductsButtonsContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["product-buttons-container"],
					"items": [editProductsButtonConfig, clearProductsButtonConfig]
				}
			};
			return {
				name: productsColumn.name,
				config: productColumnConfig
			};
		},

		/**
		 * ########## ############ ############# ###### ####### #########.
		 * @param {String} columnName ######## ####### # #######.
		 * @param {String} clickMethodName ######## ###### ########### ####### ## ######.
		 * @return {Object} ############ ############# ###### ####### #########.
		 */
		getClearProductsButtonsConfig: function(columnName, clickMethodName) {
			var buttonName = columnName + "ClearButton";
			return {
				"name": buttonName + "Container",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"wrapClass": ["editable-grid-button", "clear-products"],
				"items": [
					{
						"name": buttonName,
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"click": {"bindTo": clickMethodName},
						"visible": {
							"bindTo": "ProductsCount",
							"bindConfig": {
								"converter": function(value) {
									return Boolean(value);
								}
							}
						},
						"hint": resources.localizableStrings.ClearProductsButtonHint,
						"markerValue": columnName + "ClearProductsButton",
						"imageConfig": resources.localizableImages.CloseIcon,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
					}
				]
			};
		},

		/**
		 * ######## #### ######.
		 * @private
		 * @param {Object} item ####### # ######## ########## ######### ###.
		 * @returns {Boolean}
		 */
		getIsPayment: function(item) {
			var type = item.get("Type");
			return (type && type.value) === OrderConfigurationConstants.SupplyPaymentElement.Type.Payment;
		},

		/**
		 * ######### ######## ####### "####" ###### ####### # ########### ## ####.
		 * @param {Terrasoft.BaseModel} supplyPaymentRow ###### #######.
		 */
		updateInvoiceValue: function(supplyPaymentRow) {
			var invoiceColumnName = "Invoice";
			var invoice = supplyPaymentRow.get(invoiceColumnName);
			if (!this.getIsPayment(supplyPaymentRow)) {
				if (invoice) {
					supplyPaymentRow.set(invoiceColumnName, null);
				}
				return;
			}
			if (!invoice && !this.getIsFeatureEnabled("UseLookupInvoiceForSupplyPaymentDetail")) {
				supplyPaymentRow.set(invoiceColumnName, {
					value: 1,
					displayValue: resources.localizableStrings.GridButtonCreateInvoice
				});
			}
		},

		/**
		 * ########## ######### ###### ####### ### ####### "####".
		 * @return {Object} ######### ###### ####### ### ####### "####".
		 */
		getInvoiceColumnConfig: function() {
			var invoiceColumn = SupplyPaymentElementSchema.getColumnByName("Invoice");
			var buttonName = invoiceColumn.name + "Button";
			var clickMethodName = "onInvoiceButtonClick";
			var invoiceColumnConfig = {
				prepareResponseRow: this.updateInvoiceValue.bind(this),
				clickMethodNames: [clickMethodName],
				controlConfig: this.getButtonConfig({
					buttonName: buttonName,
					columnName: invoiceColumn.name,
					captionConverter: this.getDisplayValue,
					columnCaption: invoiceColumn.caption,
					clickMethodName: clickMethodName
				})
			};
			return {
				name: invoiceColumn.name,
				config: invoiceColumnConfig
			};
		},

		/**
		 * ########## ######## ### ########### ### ########### ########.
		 * @param {Object} value ########### ########.
		 * @returns {String} ######## ### ###########.
		 */
		getDisplayValue: function(value) {
			return value && (value.displayValue || value);
		},

		/**
		 * ########## ############ ############# ###### # #######.
		 * @param {Object} config ######### ######.
		 * @param {String} config.buttonName ######## ######.
		 * @param {String} config.columnName ######## #######.
		 * @param {String} config.columnCaption ######### #######.
		 * @param {String} config.clickMethodName ######## ########### ####### ## ######.
		 * @param {Function} [config.captionConverter] ####### ### ############## ######## # ####### # ######### ######.
		 * @returns {Object} ############ ############# ###### # #######.
		 */
		getButtonConfig: function(config) {
			var captionConfig = {
				bindTo: config.columnName
			};
			if (config.captionConverter) {
				captionConfig.bindConfig = {
					"converter": config.captionConverter
				};
			}
			return {
				"name": config.buttonName + "Container",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"wrapClass": ["editable-grid-button"],
				"items": [
					{
						"name": config.buttonName,
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": captionConfig,
						"click": {"bindTo": config.clickMethodName},
						"visible": {
							"bindTo": config.columnName,
							"bindConfig": {
								"converter": function(value) {
									return Boolean(value);
								}
							}
						},
						"markerValue": this.Ext.String.format("{0} {1}", config.columnName, config.columnCaption),
						"tag": config.columnName,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
					}
				]
			};
		},

		/**
		 * ########## ######### ########## ######### ###### #######.
		 * @return {Terrasoft.Collection} ######### ########## ######### ###### #######.
		 */
		getCustomLinkColumns: function() {
			if (this.customLinkColumns) {
				return this.customLinkColumns;
			}
			var config = this.customLinkColumns = Ext.create("Terrasoft.Collection");
			var productColumnConfig = this.getProductColumnConfig();
			if (!this.getIsFeatureEnabled("UseLookupInvoiceForSupplyPaymentDetail")) {
				var invoiceColumnConfig = this.getInvoiceColumnConfig();
				config.add(invoiceColumnConfig.name, invoiceColumnConfig.config);
			}
			config.add(productColumnConfig.name, productColumnConfig.config);
			return config;
		},

		/**
		 * ######### ####### # ######### #######, ########### ### ########## ######### ###### #######.
		 * @param {Terrasoft.EntitySchemaQuery} esq ######, # ####### ##### ######### #######.
		 */
		addGridDataColumns: function(esq) {
			var customColumns = this.getCustomLinkColumns();
			if (customColumns) {
				customColumns.each(function(customColumn) {
					if (customColumn.detailColumn && this.Ext.isFunction(customColumn.detailColumn.modifyQuery)) {
						customColumn.detailColumn.modifyQuery(esq);
					}
				}, this);
			}
		},

		/**
		 * ############ ###### ###### ##### ######### # ######. ########## ######### ###### # #######
		 * # ######### ########## ##### ## ######.
		 * @param {Terrasoft.BaseViewModel} item  ####### #######.
		 * @param {Terrasoft.BaseViewModel} detailViewModel  ###### ############# ######.
		 */
		prepareResponseCollectionItem: function(item, detailViewModel) {
			var customColumnButtons = this.getCustomLinkColumns();
			if (customColumnButtons) {
				customColumnButtons.each(function(customColumnButton) {
					if (customColumnButton.clickMethodNames) {
						this.Terrasoft.each(customColumnButton.clickMethodNames, function(clickMethodName) {
							var detailHandler = detailViewModel[clickMethodName];
							if (this.Ext.isFunction(detailHandler)) {
								item[clickMethodName] = function() {
									detailHandler.call(detailViewModel, item);
								};
							}
						}, this);
					}
					if (this.Ext.isFunction(customColumnButton.prepareResponseRow)) {
						customColumnButton.prepareResponseRow(item, detailViewModel);
					}
					item.parentDetailViewModel = detailViewModel;
					this.decorateItemLoadEntity(item, detailViewModel);
				}, this);
			}
		},

		/**
		 * ########## ##### loadEntity ###### ############# ###### #######.
		 * ######### ##### prepareResponseCollectionItem ##### ########.
		 * @param {Terrasoft.BaseViewModel} item  ####### #######.
		 * @param {Terrasoft.BaseViewModel} detailViewModel  ###### ############# ######.
		 */
		decorateItemLoadEntity: function(item, detailViewModel) {
			if (item.get("IsLoadEntityMethodDecorated")) {
				return;
			}
			var util = this;
			var itemLoadEntity = item.loadEntity;
			item.loadEntity = function(primaryColumnValue, callback, scope) {
				itemLoadEntity.call(item, primaryColumnValue, function(loadedItem) {
					util.prepareResponseCollectionItem(loadedItem, detailViewModel);
					if (callback) {
						callback.call(scope || this);
					}
				}, this);
			};
			item.set("IsLoadEntityMethodDecorated", true);
		},

		/**
		 * ########## ############ ############# ######### ### ###### #######.
		 * @param {Terrasoft.EntitySchemaColumn} entitySchemaColumn ####### ###### #######.
		 * @return {Object} ############ ############# ######### ######.
		 */
		getCellControlsConfig: function(entitySchemaColumn) {
			var columnName = entitySchemaColumn.name;
			var customColumnButtons = this.getCustomLinkColumns();
			var customColumnConfig = customColumnButtons.find(columnName);
			return (customColumnConfig && customColumnConfig.controlConfig) || null;
		},

		/**
		 * Returns feature enabled state.
		 * @param {String} code Feature code.
		 * @return {Boolean} Is feature enabled.
		 */
		getIsFeatureEnabled: function(code) {
			return this.Terrasoft.Features.getIsEnabled(code);
		}
	});

	var privateClassName = "Terrasoft.SupplyPaymentGridButtonsUtility";
	var instance = null;
	var initialized = false;
	var instanceConfig = {};
	var util = {
		init: function(config, className) {
			if (initialized) {
				return;
			}
			if (config) {
				instanceConfig = config;
			}
			if (className) {
				privateClassName = className;
			}
		}
	};
	Object.defineProperty(util, "instance", {
		get: function() {
			if (initialized === false) {
				instance = Ext.create(privateClassName, instanceConfig);
				initialized = true;
			}
			return instance;
		}
	});
	return util;
});


