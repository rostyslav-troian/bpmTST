Terrasoft.configuration.Structures["FunnelChartSchema"] = {innerHierarchyStack: ["FunnelChartSchema"]};
define('FunnelChartSchemaStructure', ['FunnelChartSchemaResources'], function(resources) {return {schemaUId:'e50dc00b-3f66-4272-a87d-a5be6a03e6a3',schemaCaption: "FunnelChartSchema", parentSchemaName: "", schemaName:'FunnelChartSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FunnelChartSchema", ["MaskHelper", "GoogleTagManagerUtilities", "FunnelByCountDataProvider",
	"FunnelToPreviousStageDataProvider", "FunnelToFirstStageDataProvider"],
		function(MaskHelperUtil, GoogleTagManagerUtilities) {
	return {
		entitySchemaName: "Opportunity",
		parentClassName: "Terrasoft.ChartViewModel",
		attributes: {
			"PressedButtonSetting": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: "byNumberConversion"
			},
			"StartDate": {
				dataValueType: this.Terrasoft.DataValueType.DATE,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"DueDate": {
				dataValueType: this.Terrasoft.DataValueType.DATE,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"IsPeriodChanged": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		methods: {

			/**
			 * Create instance of providers.
			 * @private
			 */
			initProvidersCollection: function() {
				var providersCollection = this.providersCollection = this.Ext.create("Terrasoft.Collection");
				var providerProperties = {
					Ext: this.Ext,
					sandbox: this.sandbox,
					serializedFilterData: this.get("SerializedFilterData"),
					filterMessageTag: this.filterMessageTag
				};
				var providersCollectionConfig = this.getProvidersCollectionConfig();
				this.Terrasoft.each(providersCollectionConfig, function(item) {
					var provider = Ext.create(item.className, providerProperties);
					this.initProvider(provider);
					providersCollection.add(item.type, provider);
				}, this);
			},

			/**
			 * Inits default values.
			 * @private
			 */
			initDefaultValues: function() {
				this.set("schemaName", "Opportunity");
				this.set("type", "funnel");
				this.set("orderBy", this.Terrasoft.DashboardEnums.ChartOrderBy.GROUP_BY_FIELD);
				this.set("func", "Count");
				this.set("xAxisColumn", "Stage");
				this.set("yAxisColumn", "Id");
			},

			/**
			 * Triggers IsPeriodChanged.
			 * @private
			 * @param {Function} callback Callback function.
			 */
			executeInPeriodChangeMode: function(callback) {
				if (this.get("IsPeriodChanged")) {
					return;
				}
				this.set("IsPeriodChanged", true);
				callback.call(this);
				this.set("IsPeriodChanged", false);
			},

			/**
			 * Changes current funnel type by tag.
			 * @private
			 * @param {String} tag New funnel type tag.
			 */
			changeFunnelTypeSettings: function(tag) {
				this.sendTagManagerData({
					"action": "displayFunnel",
					"chartType": "OpportunityFunnel_" + tag
				});
				this.set("PressedButtonSetting", tag);
			},

			/**
			 * Checks if period is valid.
			 * @private
			 * @param {String} changedColumnName Period column name.
			 */
			checkDatePeriod: function(changedColumnName) {
				this.executeInPeriodChangeMode(function() {
					var value = this.get(changedColumnName);
					var startDate = this.get("StartDate");
					var dueDate = this.get("DueDate");
					if (changedColumnName === "StartDate") {
						if ((value && dueDate) && (value >= dueDate)) {
							this.set("DueDate", this.Terrasoft.deepClone(value));
						}
					} else if ((value && startDate) && (value <= startDate)) {
						this.set("StartDate", this.Terrasoft.deepClone(value));
					}
					this.saveDatePeriodToProfile({
						startDate: this.get("StartDate"),
						dueDate: this.get("DueDate")
					});
					this.filterChanged();
					this.refreshData();
				});
			},

			/**
			 * Saves funnel filter date values in schema profile.
			 * @protected
			 * @param {Object} periodConfig Date period config.
			 * @param {DateTime} [periodConfig.startDate] Filter start date.
			 * @param {DateTime} [periodConfig.dueDate] Filter due date.
			 */
			saveDatePeriodToProfile: function(periodConfig) {
				var profile = this.getProfile();
				var profileKey = this.getProfileKey();
				profile.Period = periodConfig;
				this.Terrasoft.saveUserProfile(profileKey, profile, false);
			},

			/**
			 * Returns schema profile.
			 * @protected
			 * @returns {Object} Schema profile data.
			 */
			getProfile: function() {
				return this.get("Profile");
			},

			/**
			 * Refresh grid data.
			 * @private
			 */
			refreshData: function() {
				this.clearGridActiveRow();
				this.refresh();
			},

			/**
			 * Update period value.
			 * @private
			 * @param {Object} tag Period config.
			 */
			updatePeriodValue: function(tag) {
				var periodName = tag.filterName;
				var periodValues = {
					startDate: null,
					dueDate: null
				};
				if (periodName) {
					periodName = periodName.substring(periodName.lastIndexOf("_") + 1);
					periodValues = this.getPeriodByName(periodName);
				}
				var periodFilterConfig = tag.periodConfig;
				this.executeInPeriodChangeMode(function() {
					this.set(periodFilterConfig.startDateColumnName, periodValues.startDate);
					this.set(periodFilterConfig.dueDateColumnName, periodValues.dueDate);
					this.saveDatePeriodToProfile(periodName && { periodName: periodName });
				});
			},

			/**
			 * Return configuration of drill down providers.
			 * @protected
			 * @virtual
			 * @return {Array} Array of providers config.
			 */
			getProvidersCollectionConfig: function() {
				return [
					{
						type: this.Terrasoft.DashboardFunnelEnums.FunnelType.BY_NUMBER,
						className: "Terrasoft.FunnelByCountDataProvider",
						tag: "byNumberConversion",
						default: true
					},
					{
						type: this.Terrasoft.DashboardFunnelEnums.FunnelType.STAGE_CONVERSION,
						className: "Terrasoft.FunnelToPreviousStageDataProvider",
						tag: "stageConversion"
					},
					{
						type: this.Terrasoft.DashboardFunnelEnums.FunnelType.TO_FIRST_STAGE,
						className: "Terrasoft.FunnelToFirstStageDataProvider",
						tag: "toFirstConversion"
					}
				];
			},

			/**
			 * Inits period filter.
			 * @protected
			 */
			initializePeriod: function() {
				var periodProfile = this.getProfile() || {};
				var periodConfig = periodProfile.Period || {};
				if (this.drillDownProvider && this.drillDownProvider.isDrilledDown()) {
					this.setPeriodValuesFromHistory();
				} else if (periodConfig.startDate || periodConfig.dueDate) {
					this.executeInPeriodChangeMode(function() {
						this.set("StartDate", periodConfig.startDate ? new Date(periodConfig.startDate) : null);
						this.set("DueDate", periodConfig.dueDate ? new Date(periodConfig.dueDate) : null);
					});
					this.filterChanged();
				} else {
					var period = periodConfig.periodName || this.get("defPeriod");
					this.onDefFunnelPeriodChanged(period);
				}
			},

			/**
			 * Sets new period date from history.
			 * @protected
			 * @param {String} columnName Date column name.
			 */
			setDateValuesFromHistory: function() {
				var history = this.drillDownProvider.drillDownHistory;
				if (history.length === 0) {
					return;
				}
				var currentHistory = history[history.length - 1];
				this.set("StartDate", currentHistory.startDate);
				this.set("DueDate", currentHistory.dueDate);
			},

			/**
			 * Sets period values from history.
			 * @protected
			 */
			setPeriodValuesFromHistory: function() {
				this.setDateValuesFromHistory();
				this.filterChanged();
			},

			/**
			 * Clears info about active grid row.
			 * @private
			 */
			clearGridActiveRow: function() {
				var grid = this.getCurrentGrid();
				if (grid && grid.activeRow) {
					grid.activeRow = null;
				}
			},

			/**
			 * Sends data to google tag manager.
			 * @private
			 * @param {Object} data Extra data to send.
			 */
			sendTagManagerData: function(data) {
				var tagManagerUtils = this.getTagManagerUtils();
				var tagManagerData = this.getGoogleTagManagerData();
				this.Ext.apply(tagManagerData, data);
				tagManagerUtils.actionModule(tagManagerData);
			},

			/**
			 * Returns util object for work with google tag manager.
			 * @return {Object}
			 */
			getTagManagerUtils: function() {
				return GoogleTagManagerUtilities;
			},

			/**
			 * Event handler change start date.
			 * @protected
			 */
			onStartDateChange: function() {
				this.checkDatePeriod("StartDate");
			},

			/**
			 * Event handler change due date.
			 * @protected
			 */
			onDueDateChange: function() {
				this.checkDatePeriod("DueDate");
			},

			/**
			 * Saves period changes to drilldown provider history.
			 * @protected
			 */
			filterChanged: function() {
				var startDate = this.get("StartDate");
				var dueDate = this.get("DueDate");
				this.providersCollection.each(function(provider) {
					provider.changeCurrentHistory({
						startDate: startDate,
						dueDate: dueDate
					});
				});
			},

			/**
			 * @inheritdoc Terrasoft.ChartModule#showChartData
			 * @protected
			 * @overridden
			 */
			showChartData: function() {
				this.callParent(arguments);
				this.clearGridActiveRow();
				this.filterChanged();
			},

			/**
			 * @inheritdoc Terrasoft.ChartModule#showDrillDownData
			 * @protected
			 * @overridden
			 */
			showDrillDownData: function() {
				this.callParent(arguments);
				this.clearGridActiveRow();
				this.filterChanged();
			},

			/**
			 * @inheritdoc Terrasoft.ChartModule#changeChartType
			 * @protected
			 * @overridden
			 */
			changeChartType: function() {
				this.callParent(arguments);
				this.refresh();
			},

			/**
			 * @inheritdoc Terrasoft.ChartModule#drillDownChart
			 * @protected
			 * @overridden
			 */
			drillDownChart: function() {
				this.callParent(arguments);
				this.refresh();
				this.filterChanged();
			},

			/**
			 * @inheritdoc Terrasoft.ChartModule#drillUp
			 * @protected
			 * @overridden
			 */
			drillUp: function() {
				this.setPeriodValuesFromHistory();
				this.callParent(arguments);
				this.updateFunnelType(this.$PressedButtonSetting);
			},

			/**
			 * Returns start and end of period by its name.
			 * @protected
			 * @param {String} periodName Period name.
			 * @return {Object} Start and end of period.
			 */
			getPeriodByName: function(periodName) {
				var startDate = new Date();
				var dueDate;
				var ext = this.Ext;
				switch (periodName) {
					case "Yesterday":
						startDate = this.Terrasoft.startOfDay(ext.Date.add(startDate, "d", -1));
						dueDate = this.Terrasoft.endOfDay(startDate);
						break;
					case "Today":
						startDate = this.Terrasoft.startOfDay(startDate);
						dueDate = this.Terrasoft.endOfDay(startDate);
						break;
					case "Tomorrow":
						startDate = this.Terrasoft.startOfDay(ext.Date.add(startDate, "d", 1));
						dueDate = this.Terrasoft.endOfDay(startDate);
						break;
					case "PastWeek":
						startDate = this.Terrasoft.startOfWeek(ext.Date.add(startDate, "d", -7));
						dueDate = this.Terrasoft.endOfWeek(startDate);
						break;
					case "CurrentWeek":
						startDate = this.Terrasoft.startOfWeek(startDate);
						dueDate = this.Terrasoft.endOfWeek(startDate);
						break;
					case "NextWeek":
						startDate = this.Terrasoft.startOfWeek(ext.Date.add(startDate, "d", 7));
						dueDate = this.Terrasoft.endOfWeek(startDate);
						break;
					case "PastMonth":
						startDate = this.Terrasoft.startOfMonth(ext.Date.add(startDate, "mo", -1));
						dueDate = this.Terrasoft.endOfMonth(startDate);
						break;
					case "CurrentMonth":
						startDate = this.Terrasoft.startOfMonth(startDate);
						dueDate = this.Terrasoft.endOfMonth(startDate);
						break;
					case "NextMonth":
						startDate = this.Terrasoft.startOfMonth(ext.Date.add(startDate, "mo", 1));
						dueDate = this.Terrasoft.endOfMonth(startDate);
						break;
					default:
						startDate = this.Terrasoft.startOfMonth(startDate);
						dueDate = this.Terrasoft.endOfMonth(startDate);
						break;
				}
				return {
					startDate: startDate,
					dueDate: dueDate
				};
			},

			/**
			 * Sets period in fulter when default is changed.
			 * @protected
			 * @param {String} defPeriod Default period name.
			 */
			onDefFunnelPeriodChanged: function(defPeriod) {
				this.updatePeriodValue({
					filterName: defPeriod,
					periodConfig: {
						startDateColumnName: "StartDate",
						dueDateColumnName: "DueDate"
					}
				});
				this.filterChanged();
			},

			/**
			 * Clears period filters.
			 * @protected
			 */
			clearPeriodFilter: function() {
				var tag = arguments[arguments.length - 1];
				this.setPeriod(tag);
			},

			/**
			 * @inheritdoc Terrasoft.ChartViewModel#initDrillDownProvider
			 * @protected
			 * @overridden
			 */
			initDrillDownProvider: function(callback, scope) {
				if (!this.get("EntitySchemaName") || !this.get("OrderByAxis")) {
					this.drillDownProvider = null;
					callback.call(scope);
					return;
				}
				this.initProvidersCollection();
				var funnelType = this.Terrasoft.DashboardFunnelEnums.FunnelType.BY_NUMBER;
				this.changeDrillDownProvider(funnelType);
				var funnelTag = this.mapFunnelTypeToTag(funnelType, true);
				this.changeFunnelTypeSettings(funnelTag);
				this.filterChanged();
				this.drillDownProvider.getEntitySchema(this.get("EntitySchemaName"), function(entitySchema) {
					this.drillDownProvider.entitySchema = entitySchema;
					callback.call(scope);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.ChartViewModel#onProfileInitialized
			 * @protected
			 * @overridden
			 */
			onProfileInitialized: function() {
				this.initializePeriod();
				this.callParent(arguments);
			},

			/**
			 * Returns MaskHelper
			 * @protected
			 * @virtual
			 * @returns {Terrasoft.MaskHelper} MaskHelperUtil
			 */
			getMaskHelper: function() {
				return MaskHelperUtil;
			},

			/**
			 * Changes funnel display type.
			 * @protected
			 * @param {Terrasoft.DashboardFunnelEnums.FunnelType} funnelType Funnel display type.
			 */
			changeFunnelType: function(funnelType) {
				var displayMode = this.drillDownProvider.getDisplayMode();
				this.set("displayMode", displayMode);
				this.drillDownProvider.funnelType = funnelType;
				this.set("SeriesKind", this.drillDownProvider.getSeriesKind());
				this.getChartSeriesData(function() {
					this.updateChartSize();
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.ChartModule#getChartSeriesData
			 * @override
			 */
			getChartSeriesData: function(callback, scope) {
				this.callParent([function() {
					this.set("DrillDownMode", this.drillDownProvider.isDrilledDown());
					this.Ext.callback(callback, scope || this);
				}, this]);
			},

			/**
			 * Returns true if current pressed button tag equals to passed tag.
			 * @protected
			 * @param {String} tag Button tag to check.
			 * @return {Boolean} Check result.
			 */
			getIsPressedButtonSetting: function(tag) {
				return (this.get("PressedButtonSetting") === tag);
			},

			/**
			 * Defines funnel display type by clicked button tag or tag by type if returnTag is defined as true.
			 * @protected
			 * @param {String|Number} tag Button tag.
			 * @param {Boolean} [returnTag] If defined as true, corresponding button tag will be returned.
			 * @return {String}.
			 */
			mapFunnelTypeToTag: function(tag, returnTag) {
				var compareProp = returnTag ? "type" : "tag";
				var returnProp = returnTag ? "tag" : "type";
				var map = this.getProvidersCollectionConfig();
				var result;
				this.Terrasoft.each(map, function(item) {
					var itemFound = (item[compareProp] === tag);
					if (itemFound || item.default === true) {
						result = item[returnProp];
						if (itemFound) {
							return false;
						}
					}
				}, this);
				return result;
			},

			/**
			 * @inheritdoc Terrasoft.DashboardGridModule#getProfileColumns
			 * @protected
			 * @overridden
			 */
			getProfileColumns: function() {
				var profileColumns = this.callParent(arguments);
				return this.Ext.apply(profileColumns, {
					"Title": {
						aggregationType: this.Terrasoft.AggregationType.NONE,
						dataValueType: this.Terrasoft.DataValueType.GUID,
						path: "Title",
						type: this.Terrasoft.GridCellType.TEXT
					},
					"Stage": {
						aggregationType: this.Terrasoft.AggregationType.NONE,
						dataValueType: this.Terrasoft.DataValueType.LOOKUP,
						path: "Stage",
						type: this.Terrasoft.GridCellType.TEXT
					}
				});
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#addGridDataColumns
			 * @protected
			 * @overridden
			 */
			addGridDataColumns: function(esq) {
				this.drillDownProvider.addGridDataColumns(esq);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.ChartModule#getGoogleTagManagerData
			 * @protected
			 * @overridden
			 */
			getGoogleTagManagerData: function() {
				var data = this.callParent(arguments);
				return this.Ext.apply(data, {
					"chartType": "OpportunityFunnel"
				});
			},

			/**
			 * @inheritdoc Terrasoft.ChartModule#getDrillDownMenuCaption
			 * @protected
			 * @overridden
			 */
			getDrillDownMenuCaption: function(currentPoint) {
				if (currentPoint && currentPoint.menuHeaderValue) {
					var drillDownCaption = this.get("Resources.Strings.DrillDownCaption");
					return Ext.String.format("{0} '{1}'", drillDownCaption, currentPoint.menuHeaderValue);
				}
				return this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.configuration.ChartViewModel#init
			 * @overridden
			 */
			init: function() {
				this.Terrasoft.EntitySchemaQuery.clearCache("OpportunityStagesFunnelData");
				this.sandbox.subscribe("FiltersChanged", this.onDefFunnelPeriodChanged, this);
				this.initDefaultValues();
				this.callParent(arguments);
				this.on("change:StartDate", this.onStartDateChange, this);
				this.on("change:DueDate", this.onDueDateChange, this);
			},

			/**
			 * Init provider.
			 * @param {Terrasoft.OpportunityFunnelDrillDownProvider} provider.
			 */
			initProvider: function(provider) {
				provider.initState({
					entitySchemaName: this.get("EntitySchemaName"),
					moduleSchemaName: this.get("ModuleSchemaName"),
					sectionBindingColumn: this.get("sectionBindingColumn"),
					dateTimeFormat: this.get("DateTimeFormat") || "Year;Month",
					xAxisColumn: this.get("XAxisColumn"),
					orderBy: this.get("OrderByAxis"),
					orderDirection: this.get("OrderDirection"),
					func: this.get("Func"),
					seriesKind: this.get("SeriesKind"),
					yAxisColumn: this.get("YAxisColumn"),
					displayMode: this.get("displayMode"),
					seriesConfig: this.get("SeriesConfig"),
					yAxis: this.get("yAxis"),
					YAxisCaption: this.get("YAxisCaption"),
					yAxisConfig: this.get("yAxisConfig"),
					styleColor: this.get("styleColor"),
					startDate: this.get("StartDate"),
					dueDate: this.get("DueDate"),
					sectionEntitySchemaName: this.get("sectionEntitySchemaName")
				});
			},

			/**
			 * Set drill down provider based on funnel type.
			 * @param {Terrasoft.DashboardFunnelEnums.FunnelType} funnelType Type of funnel.
			 */
			changeDrillDownProvider: function(funnelType) {
				if (this.drillDownProvider) {
					this.drillDownProvider.un("historyChanged", this.historyChanged, this);
				}
				this.drillDownProvider = this.providersCollection.get(funnelType);
				this.drillDownProvider.on("historyChanged", this.historyChanged, this);
				this.historyChanged();
			},

			/**
			 * @inheritDoc Terrasoft.ChartModule#historyChanged
			 * @override
			 */
			historyChanged: function() {
				this.callParent(arguments);
				this.set("SeriesKind", this.drillDownProvider.getSeriesKind());
			},

			/**
			 * Change funnel type button handler.
			 */
			updateFunnelType: function() {
				var tag = arguments[arguments.length - 1]; // tag is the last arg
				this.changeFunnelTypeSettings(tag);
				var funnelType = this.mapFunnelTypeToTag(tag);
				this.changeDrillDownProvider(funnelType);
				this.changeFunnelType(funnelType);
			},

			/**
			 * Sets chosen period date to filter configuration.
			 * @param {Object} tag Element tag from periods menu.
			 */
			setPeriod: function(tag) {
				if (!tag) {
					return;
				}
				this.updatePeriodValue(tag);
				this.filterChanged();
				this.refreshData();
			},

			/**
			 * Returns name of class used to get chart view. See {@link Terrasoft.ChartModule.viewConfigClassName} for
			 * details.
			 * @return {String}
			 */
			getViewConfigClassName: function() {
				return "Terrasoft.OpportunityFunnelViewConfig";
			},

			/**
			 * @inheritDoc Terrasoft.BaseObject#onDestroy
			 * @overridden
			 */
			destroy: function() {
				if (this.drillDownProvider) {
					if (this.Ext.isFunction(this.drillDownProvider.destroy)) {
						this.drillDownProvider.destroy();
					}
					var maskHelper = this.getMaskHelper();
					maskHelper.HideBodyMask();
				}
				this.callParent(arguments);
			}
		}
	};
});


