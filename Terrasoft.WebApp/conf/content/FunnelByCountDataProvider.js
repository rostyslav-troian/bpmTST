Terrasoft.configuration.Structures["FunnelByCountDataProvider"] = {innerHierarchyStack: ["FunnelByCountDataProvider"]};
define('FunnelByCountDataProviderStructure', ['FunnelByCountDataProviderResources'], function(resources) {return {schemaUId:'379add8e-70c4-4986-8abb-ecd3f14508dc',schemaCaption: "FunnelByCountDataProvider", parentSchemaName: "", schemaName:'FunnelByCountDataProvider',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FunnelByCountDataProvider", ["ext-base", "terrasoft", "FunnelBaseDataProvider"],
		function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.configuration.FunnelByCountDataProvider
	 * Class to prepare filter for funnel by count.
	 */
	Ext.define("Terrasoft.configuration.FunnelByCountDataProvider", {
		extend: "Terrasoft.FunnelBaseDataProvider",
		alternateClassName: "Terrasoft.FunnelByCountDataProvider",

		/**
		 * Symbol for current primary currency.
		 * @protected
		 */
		primaryCurrencySymbol: "",

		/**
		 * @inheritdoc Terrasoft.FunnelBaseDataProvider#addQueryColumns
		 * @protected
		 * @overridden
		 */
		addQueryColumns: function(entitySchemaQuery) {
			this.callParent(arguments);
			entitySchemaQuery.addAggregationSchemaColumn("Budget", Terrasoft.AggregationType.SUM, "Amount");
		},

		/**
		 * @inheritdoc Terrasoft.FunnelBaseDataProvider#addFunnelPeriodFilters
		 * @protected
		 * @overridden
		 */
		applyFunnelPeriodFilters: function(filterGroup) {
			this.callParent(arguments);
			var endStageFilterGroup = Terrasoft.createFilterGroup();
			endStageFilterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
			endStageFilterGroup.addItem(
				Terrasoft.createColumnIsNullFilter(this.getDetailColumnPath("DueDate"))
			);
			endStageFilterGroup.addItem(
				Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					this.getDetailColumnPath("Stage.End"), true, Terrasoft.DataValueType.BOOLEAN)
			);
			filterGroup.addItem(endStageFilterGroup);
		},

		/**
		 * @inheritdoc Terrasoft.FunnelBaseDataProvider#addGridDataColumns
		 * @overridden
		 */
		addGridDataColumns: function(esq) {
			//to form query with where condition instead of exists condition.
			esq.addColumn(this.getDetailColumnPath("Id"), "JoinStage");
		},

		/**
		 * @inheritdoc Terrasoft.FunnelBaseDataProvider#initAdditionalData
		 * @protected
		 * @overridden
		 */
		initAdditionalData: function(callback, scope) {
			this.callParent([function() {
				this.initPrimaryCurrencySymbol(callback, scope);
			}, this]);
		},

		/**
		 * Returns query for currency symbol.
		 * @protected
		 * @return {Terrasoft.EntitySchemaQuery}
		 */
		getCurrencyEntitySchemaQuery: function() {
			var currentCultureId = Terrasoft.SysValue.CURRENT_USER_CULTURE.value;
			var entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "Currency",
				serverESQCacheParameters: {
					cacheLevel: Terrasoft.ESQServerCacheLevels.APPLICATION,
					cacheGroup: "Currency",
					cacheItemName: "CurrencySymbolForOpportunityFunnel" + currentCultureId
				}
			});
			entitySchemaQuery.addColumn("Symbol");
			return entitySchemaQuery;
		},

		/**
		 * Initialize primary currency symbol by current settings.
		 * @private
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Scope.
		 */
		initPrimaryCurrencySymbol: function(callback, scope) {
			if (this.primaryCurrencySymbol) {
				callback.call(scope);
				return;
			}
			var initSymbolCallback = this.initPrimaryCurrencySymbolById.bind(this, callback, scope);
			Terrasoft.SysSettings.querySysSettingsItem("PrimaryCurrency", initSymbolCallback, this);
		},

		/**
		 * Initialize primary currency symbol by currency id.
		 * @private
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Scope.
		 * @param {Object} value Currency id.
		 */
		initPrimaryCurrencySymbolById: function(callback, scope, value) {
			if (!value) {
				callback.call(scope);
				return;
			}
			var entitySchemaQuery = this.getCurrencyEntitySchemaQuery();
			var primaryCurrencyId = value.value;
			entitySchemaQuery.getEntity(primaryCurrencyId, function(response) {
				if (response && response.success) {
					var row = response.entity;
					var symbol = row && row.get("Symbol");
					this.primaryCurrencySymbol = symbol;
					if (Ext.isEmpty(symbol)) {
						var warnMessage = Ext.String.format("Can't find symbol for currency: {0}", primaryCurrencyId);
						this.log(warnMessage, Terrasoft.LogMessageType.WARNING);
					}
					callback.call(scope);
				}
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.FunnelBaseDataProvider#getSeriesDataConfigByItem
		 * @overridden
		 */
		getSeriesDataConfigByItem: function(responseItem) {
			var lcz = Terrasoft.FunnelBaseDataProvider.Resources.Strings;
			var config = this.callParent(arguments);
			var name = Ext.String.format("{0}<br/>{1}: {2}", config.menuHeaderValue, lcz.CntOpportunity, config.y);
			var budget = responseItem.get("Amount");
			budget = Ext.isNumber(budget) ? budget : 0;
			budget = Terrasoft.getFormattedNumberValue(budget, {decimalPrecision: 2});
			var primaryCurrencySymbol = this.primaryCurrencySymbol || Ext.emptyString;
			var displayValue = Ext.String.format("<br/>{0} {1} {2}", lcz.Amount, budget, primaryCurrencySymbol);
			return Ext.apply(config, {
				name: name,
				displayValue: displayValue
			});
		}

	});

});


