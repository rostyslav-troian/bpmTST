Terrasoft.configuration.Structures["MultiCurrencyEditUtilities"] = {innerHierarchyStack: ["MultiCurrencyEditUtilities"]};
define("MultiCurrencyEditUtilities", ["MultiCurrencyEditUtilitiesResources"], function(resources) {
	/**
	 * @class Terrasoft.configuration.mixins.MultiCurrencyEditUtilities
	 * Multicurrency control mixin.
	 */
	Ext.define("Terrasoft.configuration.mixins.MultiCurrencyEditUtilities", {
		alternateClassName: "Terrasoft.MultiCurrencyEditUtilities",

		//region Methods: Private

		/**
		 * Fills currencies list.
		 * @private
		 */
		fillCurrencyRateList: function(collection) {
			var currencyRateList = this.get("CurrencyRateList");
			currencyRateList.clear();
			var list = this.Ext.create("Terrasoft.Collection");
			collection.each(function(item) {
				var id = item.get("CurrencyId");
				var name = item.get("Name");
				if (list.contains(id)) {
					var msgTemplate = resources.localizableStrings.CurrencyRatesOverlappingMessage;
					var msg = this.Ext.String.format(msgTemplate, name);
					this.log(msg, Terrasoft.LogMessageType.WARNING);
					return;
				}
				list.add(id, {
					value: id,
					displayValue: name,
					ShortName: item.get("ShortName"),
					Symbol: item.get("Symbol"),
					Rate: item.get("Rate"),
					Division: item.get("Division")
				});
			}, this);
			currencyRateList.loadAll(list);
			this.prepareCurrencyMenu();
		},

		/**
		 * Generates currency button menu items.
		 * @private
		 */
		prepareCurrencyMenu: function() {
			var menu = this.get("CurrencyButtonMenuList");
			var currencyRateList = this.get("CurrencyRateList");
			if (!currencyRateList) {
				return;
			}
			menu.clear();
			if (currencyRateList.getCount() <= 1) {
				return;
			}
			currencyRateList.each(function(item) {
				var menuItem = Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Id: item.value,
						Caption: item.Symbol || item.displayValue,
						MarkerValue: item.Symbol || item.displayValue,
						Tag: item.value,
						Click: {"bindTo": "onCurrencyMenuItemClick"}
					}
				});
				menu.addItem(menuItem);
			}, this);
			this.set("CurrencyButtonMenuList", menu);
		},

		/**
		 * Set selected currency.
		 * @private
		 * @param {Object} menuItem Selected currency.
		 */
		onCurrencyMenuItemClick: function(menuItem) {
			var currency = this.get("CurrencyRateList").find(menuItem);
			this.set("Currency", currency);
		},

		//endregion

		//region Methods: Protected

		/**
		 * Creates currency rate entity scheme query.
		 * @protected
		 * @return {Terrasoft.EntitySchemaQuery} Currency rate entity scheme query.
		 */
		createCurrencyRateEsq: function() {
			return this.Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "CurrencyRate",
				serverESQCacheParameters: {
					cacheLevel: Terrasoft.ESQServerCacheLevels.SESSION,
					cacheGroup: "Currency",
					cacheItemName: "CurrencyRateListItem"
				}
			});
		},

		/**
		 * Forms entity schema query for currency rates.
		 * @protected
		 * @return {Terrasoft.EntitySchemaQuery} Entity schema query for currency rates.
		 */
		formCurrencyRateQuery: function() {
			var currencyRateDate = new Date();
			var esq = this.createCurrencyRateEsq();
			var columnName = esq.addColumn("Currency.Name", "Name");
			columnName.orderDirection = Terrasoft.OrderDirection.ASC;
			columnName.orderPosition = 0;
			var columnStartDate = esq.addColumn("StartDate");
			columnStartDate.orderDirection = Terrasoft.OrderDirection.DESC;
			columnStartDate.orderPosition = 1;
			var createdOnColumn = esq.addColumn("CreatedOn");
			createdOnColumn.orderDirection = Terrasoft.OrderDirection.DESC;
			createdOnColumn.orderPosition = 2;
			esq.addColumn("Currency.Id", "CurrencyId");
			esq.addColumn("Currency.Symbol", "Symbol");
			esq.addColumn("Currency.ShortName", "ShortName");
			esq.addColumn("Currency.Division", "Division");
			esq.addColumn("Rate");
			var filters = esq.filters;
			filters.addItem(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.LESS_OR_EQUAL, "StartDate", currencyRateDate));
			var endDateFilterGroup = this.Ext.create("Terrasoft.FilterGroup");
			endDateFilterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
			endDateFilterGroup.addItem(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.GREATER_OR_EQUAL, "EndDate", currencyRateDate));
			endDateFilterGroup.addItem(Terrasoft.createIsNullFilter(
					this.Ext.create("Terrasoft.ColumnExpression", {columnPath: "EndDate"})));
			filters.addItem(endDateFilterGroup);
			return esq;
		},

		/**
		 * Initialize currencies collection.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope Callback execution scope.
		 * @protected
		 */
		initCurrencyRateList: function(callback, scope) {
			var currencyRateList = this.get("CurrencyRateList");
			if (!this.Ext.isDefined(currencyRateList)) {
				this.set("CurrencyRateList", this.Ext.create("Terrasoft.Collection"));
			}
			var esq = this.formCurrencyRateQuery();
			esq.getEntityCollection(function(result) {
				if (result.success) {
					var collection = result.collection;
					if (collection.isEmpty()) {
						var msg = resources.localizableStrings.NoCurrenciesMessage;
						this.log(msg, Terrasoft.LogMessageType.ERROR);
						return;
					}
					this.fillCurrencyRateList(collection);
					this.Ext.callback(callback, scope);
				}
			}, this);
		},

		/**
		 * Converts multi currency edit caption with selected currency.
		 * @protected
		 * @param {String} columnCaption Column caption.
		 * @param {Object} currency Selected currency.
		 * @return {String} Multi currency caption.
		 */
		multiCurrencyCaptionConverter: function(columnCaption, currency) {
			var currencyRateList = this.get("CurrencyRateList");
			if (!columnCaption || !currency) {
				return columnCaption;
			}
			var foundCurrency = !Ext.isEmpty(currencyRateList) && currencyRateList.find(currency.value);
			if (foundCurrency) {
				return this.getCurrencyFullCaption(foundCurrency, columnCaption);
			}
			return this.getCurrencyFullCaption(currency, columnCaption);
		},

		/**
		 * Gets caption with currency symbol.
		 * @protected
		 * @param {Object} currency Selected currency.
		 * @param {String} columnCaption Column caption.
		 * @return {String} Returns full currency caption.
		 */
		getCurrencyFullCaption: function(currency, columnCaption) {
			var currencySymbol = currency.Symbol || currency.ShortName || currency.displayValue;
			return Ext.String.format("{0}, {1}", columnCaption, currencySymbol);
		},

		/**
		 * Initializes base currency.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope Callback execution scope.
		 * @protected
		 */
		initPrimaryCurrency: function(callback, scope) {
			this.Terrasoft.SysSettings.querySysSettingsItem("PrimaryCurrency",
				function(value) {
					this.set("PrimaryCurrency", value);
					this.Ext.callback(callback, scope);
				}, this);
		},

		/**
		 * Initializes currency rate on entity creation.
		 * @protected
		 */
		initCurrencyRate: function() {
			if (!this.isNewMode()) {
				return;
			}
			var currencyId = this.get("Currency").value;
			var currencyRateList = this.get("CurrencyRateList");
			var rate = currencyRateList.find(currencyId);
			this.set("CurrencyRate", rate.Rate);
		},

		/**
		 * Initializes collections.
		 * @protected
		 */
		initCollections: function() {
			var currencyButtonMenuList = this.get("CurrencyButtonMenuList");
			if (this.Ext.isDefined(currencyButtonMenuList)) {
				return;
			}
			this.set("CurrencyButtonMenuList", this.Ext.create(this.Terrasoft.BaseViewModelCollection));
		},

		//endregion

		//region Methods: Public

		/**
		 * Initializes multi currency edit mixin.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope Callback execution scope.
		 */
		init: function(callback, scope) {
			this.initCollections();
			this.Terrasoft.chain(
				this.initCurrencyRateList,
				this.initPrimaryCurrency,
				function() {
					this.initCurrencyRate();
					this.Ext.callback(callback, scope || this);
				},
				this
			);
		}

		//endregion

	});

	return Terrasoft.MultiCurrencyEditUtilities;
});


