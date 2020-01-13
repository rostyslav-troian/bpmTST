Terrasoft.configuration.Structures["ProductSelectionQueryUtilitiesMixin"] = {innerHierarchyStack: ["ProductSelectionQueryUtilitiesMixin"]};
define("ProductSelectionQueryUtilitiesMixin", ["ConfigurationConstants", "GridUtilitiesV2"],
	function(ConfigurationConstants) {
		/**
		 * @class Terrasoft.configuration.mixins.ProductSelectionQueryUtilitiesMixin
		 * Mixin with query utilities for product selection.
		 */
		Ext.define("Terrasoft.configuration.mixins.ProductSelectionQueryUtilitiesMixin", {
			alternateClassName: "Terrasoft.ProductSelectionQueryUtilitiesMixin",

			/**
			 * Get base query for product selection.
			 * @protected
			 */
			getBaseESQ: function(rootSchemaName) {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: rootSchemaName
				});
				esq.addColumn("Id");
				esq.addColumn("Name", "Name", {
					orderDirection: this.Terrasoft.OrderDirection.ASC,
					orderPosition: 0
				});
				return esq;
			},

			/**
			 * Add columns to main query.
			 * @protected
			 */
			addMainQueryColumns: function(esq) {
				this._addAvailableQuantityColumn(esq);
				esq.addColumn("Unit");
				esq.addColumn("Price");
				esq.addColumn("Currency");
				esq.addColumn("Tax");
				esq.addColumn("Code");
				esq.addColumn("IsArchive");
				this.addProductColumnsToEsq(esq);
			},

			/**
			 * Init filters for main products data ESQ.
			 * @protected
			 */
			initMainDataEsqFilters: function(esq) {
				esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"IsArchive", false));
			},

			/**
			 * Initialize pagination options for main data esq.
			 * @protected
			 * @param {Terrasoft.EntitySchemaQuery} select - main data esq.
			 */
			initializePageableOptions: function(select) {
				var sortColumnLastValue = this.get("sortColumnLastValue");
				if (sortColumnLastValue && !this.getGridData().isEmpty()) {
					select.filters.add("LastValueFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.GREATER,
						"Name", sortColumnLastValue));
				}
			},

			/**
			 * Adds Product columns from profile to query.
			 * @protected
			 */
			addProductColumnsToEsq: function(esq) {
				var profileColumns = this.getProductSelectionProfileColumns();
				this.Terrasoft.each(profileColumns, function(column, columnName) {
					if (this._isProductColumn(column.path)) {
						var queryColumn = this.Ext.apply({}, column);
						queryColumn.path = this._normalizeProductColumnName(queryColumn.path);
						this.addColumnToEsq(esq, queryColumn, columnName);
					}
				}, this);
			},

			/**
			 * Adds columns from profile to query.
			 * @protected
			 */
			addProfileColumnsToEsq: function(esq) {
				var profileColumns = this.getProductSelectionProfileColumns();
				this.Terrasoft.each(profileColumns, function(column, columnName) {
					var queryColumn = this.Ext.apply({}, column);
					queryColumn.path = this.Ext.String.format("[{0}:Product:Id].{1}",
						this.entitySchemaName,
						queryColumn.path);
					this.addColumnToEsq(esq, queryColumn, columnName);
				}, this);
			},

			/**
			 * Returns product selection profile columns.
			 * @return {Object} Profile columns.
			 */
			getProductSelectionProfileColumns: function() {
				var profileColumns = this.getProfileColumns();
				this.Terrasoft.each(profileColumns, function(column) {
					if (column.path.indexOf(ConfigurationConstants.EntitySchemaQuery.ColumnKeySplitter) !== -1) {
						var columnConfig = this.getColumnConfig(column);
						column.path = columnConfig.columnPath;
					}
				}, this);
				return profileColumns;
			},

			/**
			 * Get ESQ for main product data.
			 * @return {Terrasoft.EntitySchemaQuery} main products data ESQ.
			 */
			getMainDataEsq: function() {
				var esq = this.getBaseESQ("Product");
				esq.rowCount = 30;
				this.addMainQueryColumns(esq);
				this.applyAdditionalFilters(esq);
				this.initializePageableOptions(esq);
				this.initMainDataEsqFilters(esq);
				return esq;
			},

			/**
			 * Returns columns collection to select.
			 * @protected
			 * @virtual
			 * @return {Array} Columns collection to select.
			 */
			getEntityColumnsToSelect: function() {
				return ["Unit", "Price", "Quantity", "PrimaryPrice", "PrimaryAmount", "Amount",
					"PrimaryDiscountAmount", "DiscountAmount", "Tax", "PrimaryTaxAmount", "TaxAmount",
					"PrimaryTaxAmount", "TotalAmount", "PrimaryTotalAmount", "DiscountTax", "BaseQuantity", "PriceList",
					"Currency", "CurrencyRate", "DiscountPercent"];
			},

			/**
			 * Get ESQ for connected to master entity products.
			 * @return {Terrasoft.EntitySchemaQuery} connected to master entity products ESQ.
			 */
			getMasterEntityProductsEsq: function(masterEntity) {
				var esqEntitySchemaName = this.getMasterEntityProductSchemaName();
				var columnPrefix = this.Ext.String.format("[{0}:Product:Id].", esqEntitySchemaName);
				var sumCountColumnName = columnPrefix + "Quantity";
				var productInCountEsq = this.getBaseESQ("Product");
				var columnsName = this.getEntityColumnsToSelect();
				this.Terrasoft.each(columnsName, function(columnName) {
					this.addColumnToQuery({
						esq: productInCountEsq,
						columnName: columnPrefix + columnName,
						columnAlias: columnName
					});
				}, this);
				productInCountEsq.addColumn(columnPrefix + "Id", esqEntitySchemaName + "Id");
				productInCountEsq.addColumn(columnPrefix + "Product.Code", "Code");
				productInCountEsq.addColumn(columnPrefix + "Product.IsArchive", "IsArchive");
				productInCountEsq.addColumn(columnPrefix + "Tax.Percent", "TaxPercent");
				this._addAvailableQuantityColumn(productInCountEsq);
				productInCountEsq.filters.addItem(
					this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						this.Ext.String.format(columnPrefix + "{0}.Id", this.get("MasterEntitySchemaName")),
						masterEntity.get("Id")));
				productInCountEsq.filters.addItem(this.Terrasoft.createColumnIsNotNullFilter(sumCountColumnName));
				this.applyAdditionalFilters(productInCountEsq);
				this.addProfileColumnsToEsq(productInCountEsq);
				return productInCountEsq;
			},

			/**
			 * Get ESQ for products in base price list.
			 * @return {Terrasoft.EntitySchemaQuery} products in base price list ESQ.
			 */
			getProductInBasePriceListEsq: function(basePriceList) {
				var basePriceListProductEsq = this.getBaseESQ("Product");
				var productPricePrefix = "[ProductPrice:Product:Id].";
				basePriceListProductEsq.rowCount = 40;
				basePriceListProductEsq.addColumn("Price", "ProductPrice");
				basePriceListProductEsq.addColumn(productPricePrefix + "Price", "Price");
				basePriceListProductEsq.addColumn(productPricePrefix + "Currency", "Currency");
				basePriceListProductEsq.addColumn(productPricePrefix + "Tax", "Tax");
				basePriceListProductEsq.addColumn(productPricePrefix + "Tax.Percent", "DiscountTax");
				basePriceListProductEsq.filters.addItem(this.Terrasoft.createFilter(this.Terrasoft.ComparisonType.EQUAL,
					productPricePrefix + "Product.Id", "Id"));
				basePriceListProductEsq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL,
					productPricePrefix + "PriceList.Id",
					basePriceList.value)
				);
				this.applyAdditionalFilters(basePriceListProductEsq);
				this.initializePageableOptions(basePriceListProductEsq);
				basePriceListProductEsq.filters.addItem(
					this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"IsArchive", false));
				return basePriceListProductEsq;
			},

			/**
			 * Loads master entity data.
			 * @param {Function} callback Callback function.
			 * @param {Terrasoft.BaseViewModel} scope Callback's scope.
			 */
			requestMasterEntityData: function(callback, scope) {
				if (!this.get("MasterRecordId")) {
					this.Ext.callback(callback, scope || this);
				}
				var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: this.get("MasterEntitySchemaName")
				});
				select.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
				select.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name");
				select.addColumn("Currency");
				select.addColumn("Currency.Symbol");
				select.addColumn("Currency.ShortName");
				select.addColumn("CurrencyRate");
				select.addColumn("Currency.Division");
				select.getEntity(this.get("MasterRecordId"), function(result) {
					this.requestMasterEntityDataHandler(result, callback, scope);
				}, this);
			},

			/**
			 * Loads master entity data handler.
			 * @param {Object} result Response data.
			 * @param {Function} callback Callback function.
			 * @param {Terrasoft.BaseViewModel} scope Callback's scope.
			 */
			requestMasterEntityDataHandler: function(result, callback, scope) {
				if (!result.success) {
					return;
				}
				var entity = result.entity;
				this.set("MasterEntity", entity);
				var currencySymbol = this.Ext.isEmpty(entity.get("Currency.Symbol"))
					? entity.get("Currency.ShortName") || ""
					: entity.get("Currency.Symbol");
				this.setSummaryCurrencySymbol(currencySymbol);
				this.Ext.callback(callback, scope || this);
			},

			/**
			 * Sets currency symbol.
			 * @protected
			 * @param {String} symbol Currency symbol.
			 */
			setSummaryCurrencySymbol: function(symbol) {
				this.set("CurrencySymbol", symbol);
			},

			/**
			 * Applies additional filters.
			 * @protected
			 * @param {Terrasoft.EntitySchemaQuery} esq
			 */
			applyAdditionalFilters: function(esq) {
				var catalogueFilters = this.get("CatalogueFilters");
				var quickSearchFilters = this.get("QuickSearchFilters");
				if (catalogueFilters) {
					esq.filters.add("CatalogueFilters", catalogueFilters);
				}
				if (quickSearchFilters) {
					esq.filters.add("QuickSearchFilters", quickSearchFilters);
				}
			},

			/**
			 * Forms products insert query.
			 * @virtual
			 * @param {String} rootSchemaName Schema name to save.
			 * @param {Terrasoft.BaseViewModel} item Product item.
			 * @return {Terrasoft.InsertQuery} Products insert query.
			 */
			formInsertQuery: function(rootSchemaName, item) {
				var insert = this.Ext.create("Terrasoft.InsertQuery", {
					rootSchemaName: rootSchemaName
				});
				var columnsName = this.getSaveColumnsCollection();
				this._setColumnValueToQuery(insert, item, this.get("MasterEntitySchemaName"), this.get("MasterRecordId"));
				this._setColumnValueToQuery(insert, item, "Product", item.get("Id"));
				this.Terrasoft.each(columnsName, function(columnName) {
					this._setColumnValueToQuery(insert, item, columnName);
				}, this);
				if (item.get("PriceList")) {
					this._setColumnValueToQuery(insert, item, "PriceList");
				} else if (this.get("BasePriceList")) {
					this._setColumnValueToQuery(insert, item, "PriceList", this.get("BasePriceList"));
				}
				return insert;
			},

			/**
			 * Forms products update query.
			 * @virtual
			 * @param {String} rootSchemaName Schema name to save.
			 * @param {Terrasoft.BaseViewModel} item Product item.
			 * @return {Terrasoft.UpdateQuery} Products update query.
			 */
			formUpdateQuery: function(rootSchemaName, item) {
				var update = this.Ext.create("Terrasoft.UpdateQuery", {
					rootSchemaName: rootSchemaName
				});
				var columnsName = this.getSaveColumnsCollection();
				this.Terrasoft.each(columnsName, function(columnName) {
					this._setColumnValueToQuery(update, item, columnName);
				}, this);
				var filters = update.filters;
				filters.add("IdFilter", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Id", item.get(rootSchemaName + "Id")));
				return update;
			},

			/**
			 * Forms products delete query.
			 * @virtual
			 * @param {String} rootSchemaName Schema name from to delete.
			 * @param {Terrasoft.BaseViewModel} item Product item.
			 * @return {Terrasoft.DeleteQuery} Products insert query.
			 */
			formDeleteQuery: function(rootSchemaName, item) {
				var deleteQuery = this.Ext.create("Terrasoft.DeleteQuery", {
					rootSchemaName: rootSchemaName
				});
				var entityIdFilter = this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Id", item.get(rootSchemaName + "Id"));
				deleteQuery.filters.add("entityIdFilter", entityIdFilter);
				return deleteQuery;
			},

			/**
			 * Adds column to query.
			 * @param {Object} config - column config.
			 * @protected
			 */
			addColumnToQuery: function(config) {
				config = config || {};
				var columnAlias = config.columnAlias || config.columnName;
				var queryColumnName = config.columnName;
				var esq = config.esq;
				if (esq.columns.contains(columnAlias)) {
					return;
				}
				esq.addColumn(queryColumnName, columnAlias);
			},

			/**
			 * Get unit items select Esq.
			 * @param {Terrasoft.EntitySchemaQuery} esq  Unit items select Esq.
			 * @return {Terrasoft.EntitySchemaQuery} Decorated unit items select Esq.
			 */
			applyUnitItemsEsq: function(esq) {
				var productUnitPrefix = "[ProductUnit:Unit:Id].";
				esq.addColumn(productUnitPrefix + "NumberOfBaseUnits", "NumberOfBaseUnits");
				esq.addColumn(productUnitPrefix + "IsBase", "IsBase");
				var productKey = this.get("RealRecordId") || this.get("Id");
				esq.filters.addItem(
					this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						productUnitPrefix + "Product.Id", productKey));
				return esq;
			},

			/**
			 * Get ESQ for products prices.
			 * @param {Terrasoft.EntitySchemaQuery} esq Product prices ESQ.
			 * @return {Terrasoft.EntitySchemaQuery} Decorated product prices ESQ.
			 */
			applyProductPriceItemsEsq: function(esq) {
				const columnPrefix = "[ProductPrice:PriceList:Id].";
				esq.addColumn(columnPrefix + "Price", "Price");
				esq.addColumn(columnPrefix + "Currency", "Currency");
				esq.addColumn(columnPrefix + "Tax", "Tax");
				esq.addColumn(columnPrefix + "Tax.Percent", "DiscountTax");
				const productKey = this.get("RealRecordId") || this.get("Id");
				esq.filters.addItem(
					this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						columnPrefix + "Product.Id", productKey));
				return esq;
			},

			/**
			 * @obsolete
			 */
			getUnitItemsSelectEsq: function() {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "Unit"
				});
				esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
				esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name", {
					orderDirection: this.Terrasoft.OrderDirection.ASC,
					orderPosition: 0
				});
				esq = this.applyUnitItemsEsq(esq);
				return esq;
			},

			/**
			 * @obsolete
			 */
			getProductPriceItemsSelectEsq: function() {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "Pricelist"
				});
				esq.addColumn("Id");
				esq.addColumn("Name");
				esq = this.applyProductPriceItemsEsq(esq);
				return esq;
			},

			/**
			 * Normalize Product column name.
			 * @private
			 * @return {String} - normalized column value.
			 */
			_normalizeProductColumnName: function(columnName) {
				return columnName.replace("Product.", "");
			},

			/**
			 * Determines, is column in Product entity.
			 * @param {String} columnName - column name.
			 * @private
			 * @return {Boolean} is column in Product entity flag.
			 */
			_isProductColumn: function(columnName) {
				return columnName.indexOf("Product.") === 0;
			},

			/**
			 * Sets column value to query.
			 * @private
			 * @param {Terrasoft.BaseQuery} query Query.
			 * @param {Terrasoft.BaseViewModel} item Product item.
			 * @param {String} columnName Column name.
			 * @param {*} [value] Column value.
			 */
			_setColumnValueToQuery: function(query, item, columnName, value) {
				var columnValue = value || item.get(columnName);
				if (this.Ext.isEmpty(columnValue)) {
					return;
				}
				var column = this.columns[columnName];
				if (column && !query.columnValues.contains(columnName)) {
					query.setParameterValue(columnName, columnValue, column.dataValueType);
				}
			},

			/**
			 * Adds column with available quantity in stock.
			 * @param esq Entity schema query.
			 * @private
			 */
			_addAvailableQuantityColumn: function(esq) {
				esq.addAggregationSchemaColumn("[ProductStockBalance:Product:Id].AvailableQuantity",
					this.Terrasoft.AggregationType.SUM, "Available");
			},

			/**
			 * Returns column names for save.
			 * @protected
			 * @virtual
			 * @return {Array} Save column names collection.
			 */
			getSaveColumnsCollection: function() {
				var columns = this.entitySchema.columns;
				var names = [];
				Terrasoft.each(columns, function(item) {
					if (item.name !== "Id") {
						names.push(item.name);
					}
				});
				return names;
			}

		});
	}
);


