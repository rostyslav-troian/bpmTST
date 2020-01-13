Terrasoft.configuration.Structures["OpportunityFunnelModule"] = {innerHierarchyStack: ["OpportunityFunnelModule"], structureParent: "ChartModule"};
define("OpportunityFunnelModule", ["OpportunityFunnelModuleResources", "MaskHelper", "OpportunityFunnelChart",
			"OpportunityFunnelDrillDownProvider", "LabelDateEdit", "DashboardFunnelEnums",
			"ChartModule", "css!OpportunityFunnelModule"],
		function(resources, MaskHelper) {

			/**
			 * @class Terrasoft.configuration.ChartViewModel
			 * ##### ###### ############# ###### #######.
			 */
			Ext.define("Terrasoft.configuration.OpportunityFunnelViewModel", {
				extend: "Terrasoft.ChartViewModel",
				alternateClassName: "Terrasoft.OpportunityFunnelViewModel",

				/**
				 * ### ###### ##########.
				 * @protected
				 * @type {String}
				 */
				drillDownProviderClassName: "Terrasoft.OpportunityFunnelDrillDownProvider",

				columns: {
					"PressedButtonSetting": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: "byNumberConversion"
					},
					"StartDate": {
						dataValueType: Terrasoft.DataValueType.DATE,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					"DueDate": {
						dataValueType: Terrasoft.DataValueType.DATE,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					"IsPeriodChanged": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					}
				},

				constructor: function() {
					this.callParent(arguments);
					this.addEvents(
							"filtersChanged"
					);
				},

				/**
				 * ############## ######## ## #########.
				 * @private
				 */
				initDefaultValues: function() {
					this.set("schemaName", "Opportunity");
					this.set("type", "funnel");
					this.set("orderBy", Terrasoft.DashboardEnums.ChartOrderBy.GROUP_BY_FIELD);
					this.set("func", "Count");
					this.set("xAxisColumn", "Stage");
					this.set("yAxisColumn", "Id");
				},

				/**
				 * @inheritdoc Terrasoft.configuration.ChartViewModel#init
				 * @overridden
				 */
				init: function() {
					this.sandbox.subscribe("FiltersChanged", this.onDefFunnelPeriodChanged, this);
					this.initDefaultValues();
					var chartId = this.get("ChartId");
					if (chartId) {
						this.loadEntity(this.get("ChartId"), function() {
							if (this.destroyed) {
								return;
							}
							this.callParent(arguments);
						});
					} else {
						this.callParent(arguments);
					}
				},

				/*
				 * ############# ##### ######## ### ####### ########## ### ######### #### ###### ### #### ##########.
				 * @protected
				 * @param {Date} value ##### ######## #### #######.
				 * @param {String} currentColumnName ######## #######, # ####### ########## ######## ####.
				 */
				setDateValue: function(value, currentColumnName) {
					this.set(currentColumnName, value);
					var startDate = this.get("StartDate");
					var dueDate = this.get("DueDate");
					if (currentColumnName === "StartDate") {
						if ((value && dueDate) && (value >= dueDate)) {
							this.set("DueDate", Terrasoft.deepClone(value));
						}
					} else {
						if ((value && startDate) && (value <= startDate)) {
							this.set("StartDate", Terrasoft.deepClone(value));
						}
					}
					var isPeriodChanged = this.get("IsPeriodChanged");
					var isModuleInitializing = this.get("IsModuleInitializing");
					if (!isPeriodChanged && !isModuleInitializing) {
						this.filterChanged(true);
					}
				},

				/*
				 * ############# ##### ######## # #### #### ####### ## #######.
				 * @protected
				 * @param {String} columnName ######## ####### ####.
				 */
				setDateValueFromHistory: function(columnName) {
					var history = this.drillDownProvider.drillDownHistory;
					if (history.length === 0) {
						return;
					}
					var currentHistory = history[history.length - 1];
					var dateValueFromHistory = (columnName === "StartDate")
							? currentHistory.startDate
							: currentHistory.dueDate;
					this.setDateValue(dateValueFromHistory, columnName);
				},

				/**
				 * ############# ######## ####### ## #######.
				 * @protected
				 */
				setPeriodValuesFromHistory: function() {
					this.set("IsPeriodChanged", true);
					this.setDateValueFromHistory("StartDate");
					this.setDateValueFromHistory("DueDate");
					this.filterChanged(false);
					this.set("IsPeriodChanged", false);
					this.refresh();
				},

				/**
				 * ####### ########## # ########## ###### #######.
				 * @private
				 */
				clearGridActiveRow: function() {
					var grid = this.getCurrentGrid();
					if (grid && grid.activeRow) {
						grid.activeRow = null;
					}
				},

				/**
				 * ######### # ####### drill-down-########## ###### ## ######### ######## ## ####.
				 * @protected
				 * @param {Boolean} refresh ####### ############# ############ ###### #######.
				 */
				filterChanged: function(refresh) {
					var startDate = this.get("StartDate");
					var dueDate = this.get("DueDate");
					this.drillDownProvider.changeCurrentHistory({
						startDate: startDate,
						dueDate: dueDate
					});
					if (refresh) {
						this.clearGridActiveRow();
						this.refresh();
					}
				},

				/**
				 * @inheritdoc Terrasoft.ChartModule#showChartData
				 * @protected
				 * @overridden
				 */
				showChartData: function() {
					this.callParent(arguments);
					this.clearGridActiveRow();
					this.filterChanged(false);
				},

				/**
				 * @inheritdoc Terrasoft.ChartModule#showDrillDownData
				 * @protected
				 * @overridden
				 */
				showDrillDownData: function() {
					this.callParent(arguments);
					this.clearGridActiveRow();
					this.filterChanged(false);
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
					this.filterChanged(false);
				},

				/**
				 * @inheritdoc Terrasoft.ChartModule#drillUp
				 * @protected
				 * @overridden
				 */
				drillUp: function() {
					this.callParent(arguments);
					this.setPeriodValuesFromHistory();
				},

				/**
				 * ########## #### ###### # ########## ####### ## ### ########.
				 * @protected
				 * @param {String} periodName ######## #######.
				 * @return {Object} ###### # ########## #######.
				 */
				getPeriodByName: function(periodName) {
					var startDate = new Date();
					var dueDate;
					var ext = this.Ext;
					switch (periodName) {
						case "Yesterday":
							startDate = Terrasoft.startOfDay(ext.Date.add(startDate, "d", -1));
							dueDate = Terrasoft.endOfDay(startDate);
							break;
						case "Today":
							startDate = Terrasoft.startOfDay(startDate);
							dueDate = Terrasoft.endOfDay(startDate);
							break;
						case "Tomorrow":
							startDate = Terrasoft.startOfDay(ext.Date.add(startDate, "d", 1));
							dueDate = Terrasoft.endOfDay(startDate);
							break;
						case "PastWeek":
							startDate = Terrasoft.startOfWeek(ext.Date.add(startDate, "d", -7));
							dueDate = Terrasoft.endOfWeek(startDate);
							break;
						case "CurrentWeek":
							startDate = Terrasoft.startOfWeek(startDate);
							dueDate = Terrasoft.endOfWeek(startDate);
							break;
						case "NextWeek":
							startDate = Terrasoft.startOfWeek(ext.Date.add(startDate, "d", 7));
							dueDate = Terrasoft.endOfWeek(startDate);
							break;
						case "PastMonth":
							startDate = Terrasoft.startOfMonth(ext.Date.add(startDate, "mo", -1));
							dueDate = Terrasoft.endOfMonth(startDate);
							break;
						case "CurrentMonth":
							startDate = Terrasoft.startOfMonth(startDate);
							dueDate = Terrasoft.endOfMonth(startDate);
							break;
						case "NextMonth":
							startDate = Terrasoft.startOfMonth(ext.Date.add(startDate, "mo", 1));
							dueDate = Terrasoft.endOfMonth(startDate);
							break;
						default:
							startDate = Terrasoft.startOfMonth(startDate);
							dueDate = Terrasoft.endOfMonth(startDate);
							break;
					}
					return {
						startDate: startDate,
						dueDate: dueDate
					};
				},

				/**
				 * ############# ######## ### ########## ## ####### ### ######### ####### ## #########.
				 * @protected
				 * @param {String} defPeriod ######## ####### ## #########.
				 */
				onDefFunnelPeriodChanged: function(defPeriod) {
					this.setPeriod({
						filterName: defPeriod,
						periodConfig: {
							startDateColumnName: "StartDate",
							dueDateColumnName: "DueDate"
						}
					});
				},

				/**
				 * ############## ######### ###### ####### ## #######.
				 * @protected
				 */
				initialize: function() {
					if (this.drillDownProvider && this.drillDownProvider.isDrilledDown()) {
						this.setPeriodValuesFromHistory();
					} else {
						var defPeriod = this.get("defPeriod");
						this.onDefFunnelPeriodChanged(defPeriod);
					}
				},

				/**
				 * ############# ######## ### ########## ####### # ############ ####### #######.
				 * @protected
				 * @param {Object} tag ### ########## ######## ## #### ########.
				 */
				setPeriod: function(tag) {
					if (!tag) {
						return;
					}
					var periodName = tag.filterName;
					var periodValues = {
						startDate: null,
						dueDate: null
					};
					if (periodName) {
						periodName = periodName.substring(periodName.lastIndexOf("_") + 1);
						periodValues = this.getPeriodByName(periodName);
					}
					this.set("IsPeriodChanged", true);
					var periodFilterConfig = tag.periodConfig;
					this.set(periodFilterConfig.startDateColumnName, periodValues.startDate);
					this.set(periodFilterConfig.dueDateColumnName, periodValues.dueDate);
					this.filterChanged(false);
					this.set("IsPeriodChanged", false);
					this.refresh();
				},

				/**
				 * ####### ####### ## #######.
				 * @protected
				 */
				clearPeriodFilter: function() {
					var tag = arguments[arguments.length - 1]; // ### ########## ######### ##########
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
					this.drillDownProvider = this.Ext.create(this.drillDownProviderClassName, {
						Ext: this.Ext,
						sandbox: this.sandbox,
						serializedFilterData: this.get("SerializedFilterData"),
						filterMessageTag: this.filterMessageTag
					});
					this.drillDownProvider.pushHistory({
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
						dueDate: this.get("DueDate")
					});
					this.filterChanged();
					this.drillDownProvider.on("historyChanged", this.historyChanged, this);
					this.drillDownProvider.getEntitySchema(this.get("EntitySchemaName"), function(entitySchema) {
						this.drillDownProvider.entitySchema = entitySchema;
						callback.call(scope);
					}, this);
				},

				/**
				 * ######## ### ########### ####### ######.
				 * @protected
				 * param {Terrasoft.DashboardFunnelEnums.FunnelType} funnelType ### ########### ####### ######.
				 */
				changeFunnelType: function(funnelType) {
					Terrasoft.utils.saveUserProfile("Chart_OpportunityStage", {
						funnelType: funnelType
					}, false);
					this.get("Profile").funnelType = funnelType;
					var self = this;
					var displayMode = this.drillDownProvider.getDisplayMode();
					self.set("displayMode", displayMode);
					this.drillDownProvider.funnelType = funnelType;
					this.getChartSeriesData(function() {
						MaskHelper.ShowBodyMask();
						self.set("SeriesKind", this.drillDownProvider.getSeriesKind());
						self.updateChartSize();
						MaskHelper.HideBodyMask();
					}, this);
				},

				/**
				 * #########, ############# ## ###### # ######### ##### ######## ########### ####### ######.
				 * @protected
				 * param {String} tag ### ######.
				 * @return {Boolean} ######### ########.
				 */
				getIsPressedButtonSetting: function(tag) {
					return (this.get("PressedButtonSetting") === tag);
				},

				/**
				 * ########## ### ########### ####### ###### ## #### ####### ######.
				 * @protected
				 * param {String} tag ### ######.
				 * @return {Terrasoft.DashboardFunnelEnums.FunnelType} ### ########### ####### ######.
				 */
				getFunnelTypeByTag: function(tag) {
					switch (tag) {
						case "stageConversion":
							return Terrasoft.DashboardFunnelEnums.FunnelType.STAGE_CONVERSION;
						case "toFirstConversion":
							return Terrasoft.DashboardFunnelEnums.FunnelType.TO_FIRST_STAGE;
						case "byNumberConversion":
							return Terrasoft.DashboardFunnelEnums.FunnelType.BY_NUMBER;
						default:
							return Terrasoft.DashboardFunnelEnums.FunnelType.BY_NUMBER;
					}
				},

				/**
				 * ########## ####### ###### ######### #### ########## #######.
				 * @protected
				 */
				updateFunnelType: function() {
					var tag = arguments[arguments.length - 1]; // ### ########## ######### ##########
					var funnelType = this.getFunnelTypeByTag(tag);
					this.filterChanged();
					this.changeFunnelType(funnelType);
					this.set("PressedButtonSetting", tag);
				},

				/**
				 * @inheritDoc Terrasoft.configuration.mixins.GridUtilities#getGridDataESQ
				 * @overridden
				 */
				getGridDataESQ: function() {
					var drillDownProvider = this.drillDownProvider;
					var entitySchemaQuery = this.callParent(arguments);
					entitySchemaQuery.isDistinct = true;
					drillDownProvider.addFilters(entitySchemaQuery);
					return entitySchemaQuery;
				},

				/**
				 * @inheritdoc Terrasoft.DashboardGridModule#getProfileColumns
				 * @protected
				 * @overridden
				 */
				getProfileColumns: function() {
					var profileColumns = this.callParent(arguments);
					profileColumns["[VwOpportFunnelData:Id].Opportunity.Title"] = {
						aggregationType: Terrasoft.AggregationType.NONE,
						dataValueType: Terrasoft.DataValueType.GUID,
						path: "[VwOpportFunnelData:Id].Opportunity.Title",
						type: Terrasoft.GridCellType.TEXT
					};
					return profileColumns;
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
				}
			});

			/**
			 * @class Terrasoft.configuration.ChartViewConfig
			 * ##### ############ ############ ############# ###### #######.
			 */
			Ext.define("Terrasoft.configuration.OpportunityFunnelViewConfig", {
				extend: "Terrasoft.ChartViewConfig",
				alternateClassName: "Terrasoft.OpportunityFunnelViewConfig",

				chartId: null,

				/**
				 * ######### ############ ############# ############# ######## ####### ###### ## #######.
				 * @protected
				 * param {Object} filterConfig ############ #######, ########## ######## #######.
				 * @return {Object} ############ ############# ######## ## #######.
				 */
				getFilterFunnelViewConfig: function(filterConfig) {
					var config = {
						"className": "Terrasoft.Container",
						"id": "funnelFixedFilter" + filterConfig.name + "Container" + this.chartId,
						"selectors": {
							"el": "#funnelFixedFilter" + filterConfig.name + "Container" + this.chartId,
							"wrapEl": "#funnelFixedFilter" + filterConfig.name + "Container" + this.chartId
						},
						"classes": {"wrapClassName": ["row-filter-container"]},
						"tpl": [
							"<span id=\"{id}\" style=\"{wrapStyles}\" class=\"{wrapClassName}\">",
							"{%this.renderItems(out, values)%}",
							"</span>"
						],
						"items": []
					};
					config.items = this.getPeriodFilterViewConfig(filterConfig);
					return config;
				},

				/**
				 * ######### ############ ############# ###### ######## ## ####### # ########## ####.
				 * @protected
				 * param {String} filterName ######## #######.
				 * param {Object} periodConfig ############ ####### ## #######.
				 * @return {Object} ############ ############# ###### ######## ## #######.
				 */
				getPeriodFixedButtonsViewConfig: function(filterName, periodConfig) {
					var localizableStrings = resources.localizableStrings;
					var localizableImages = resources.localizableImages;

					var monthButton = this.getFixedButtonBaseConfig();
					monthButton.imageConfig = localizableImages.MonthPeriodButtonImage;
					monthButton.markerValue = "PeriodButton";
					monthButton.hint = localizableStrings.SelectPeriodHint;
					monthButton.classes = {"imageClass": ["period-fixed-filter-image-class"]};
					monthButton.menu = {
						"items": [
							{
								"className": "Terrasoft.MenuItem",
								"caption": localizableStrings.YesterdayCaption,
								"click": {"bindTo": "setPeriod"},
								"tag": {
									"filterName": filterName + "_Yesterday",
									"periodConfig": periodConfig
								}
							},
							{
								"className": "Terrasoft.MenuItem",
								"caption": localizableStrings.TodayCaption,
								"click": {"bindTo": "setPeriod"},
								"tag": {
									"filterName": filterName + "_Today",
									"periodConfig": periodConfig
								}
							},
							{
								"className": "Terrasoft.MenuItem",
								"caption": localizableStrings.TomorrowCaption,
								"click": {"bindTo": "setPeriod"},
								"tag": {
									"filterName": filterName + "_Tomorrow",
									"periodConfig": periodConfig
								}
							},
							{"className": "Terrasoft.MenuSeparator"},
							{
								"className": "Terrasoft.MenuItem",
								"caption": localizableStrings.PastWeekCaption,
								"click": {"bindTo": "setPeriod"},
								"tag": {
									"filterName": filterName + "_PastWeek",
									"periodConfig": periodConfig
								}
							},
							{
								"className": "Terrasoft.MenuItem",
								"caption": localizableStrings.CurrentWeekCaption,
								"click": {"bindTo": "setPeriod"},
								"tag": {
									"filterName": filterName + "_CurrentWeek",
									"periodConfig": periodConfig
								}
							},
							{
								"className": "Terrasoft.MenuItem",
								"caption": localizableStrings.NextWeekCaption,
								"click": {"bindTo": "setPeriod"},
								"tag": {
									"filterName": filterName + "_NextWeek",
									"periodConfig": periodConfig
								}
							},
							{className: "Terrasoft.MenuSeparator"},
							{
								"className": "Terrasoft.MenuItem",
								"caption": localizableStrings.PastMonthCaption,
								"click": {"bindTo": "setPeriod"},
								"tag": {
									"filterName": filterName + "_PastMonth",
									"periodConfig": periodConfig
								}
							},
							{
								"className": "Terrasoft.MenuItem",
								"caption": localizableStrings.CurrentMonthCaption,
								"click": {"bindTo": "setPeriod"},
								"tag": {
									"filterName": filterName + "_CurrentMonth",
									"periodConfig": periodConfig
								}
							},
							{
								"className": "Terrasoft.MenuItem",
								"caption": localizableStrings.NextMonthCaption,
								"click": {"bindTo": "setPeriod"},
								"tag": {
									"filterName": filterName + "_NextMonth",
									"periodConfig": periodConfig
								}
							}
						]
					};
					Terrasoft.each(monthButton.menu.items, function(menuItem) {
						menuItem.markerValue = menuItem.caption;
					}, this);
					return monthButton;
				},

				/**
				 * ######### ############ ############# ######.
				 * @protected
				 * @return {Object} ############ ############# ######.
				 */
				getFixedButtonBaseConfig: function() {
					return {
						"className": "Terrasoft.Button",
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
					};
				},

				/**
				 * ######### ############ ######## ####### ###### ## #######.
				 * @protected
				 * param {Object} filterConfig ############ #######, ########## ######## # ######## ##### ##########.
				 * @return {Object} ############ ######## ## #######.
				 */
				getPeriodFilterConfig: function(filterConfig) {
					var resultConfig = {};
					var startDateColumnName = filterConfig.columnName;
					var startDateDefValue = filterConfig.defValue || new Date();
					var dueDateColumnName = filterConfig.columnName;
					var dueDateDefValue = filterConfig.defValue || new Date();
					if (filterConfig.startDate) {
						startDateColumnName = filterConfig.startDate.columnName || startDateColumnName;
						startDateDefValue = filterConfig.startDate.defValue || startDateDefValue;
						if (filterConfig.dueDate) {
							dueDateColumnName = filterConfig.dueDate.columnName || startDateColumnName || dueDateColumnName;
							dueDateDefValue = filterConfig.dueDate.defValue || startDateDefValue || dueDateDefValue;
						} else {
							dueDateColumnName = startDateColumnName;
							dueDateDefValue = startDateDefValue;
						}
					}
					if (startDateColumnName === dueDateColumnName) {
						dueDateColumnName = startDateColumnName + "Due";
						resultConfig.singleColumn = true;
					}
					resultConfig.startDateColumnName = startDateColumnName;
					resultConfig.startDateDefValue = startDateDefValue;
					resultConfig.dueDateColumnName = dueDateColumnName;
					resultConfig.dueDateDefValue = dueDateDefValue;
					return resultConfig;
				},

				/**
				 * ######### ######## ############ ############# ######## ## #######.
				 * @protected
				 * param {Object} filterConfig ############ #######.
				 * @return {Object} ######## ############ ############# ######## ## #######.
				 */
				getPeriodFilterViewConfig: function(filterConfig) {
					var periodConfig = this.getPeriodFilterConfig(filterConfig);
					return [
						{
							"className": "Terrasoft.Container",
							"id": "funnelFixedFilter" + filterConfig.name + "ButtonContainer" + this.chartId,
							"selectors": {
								"el": "#funnelFixedFilter" + filterConfig.name + "ButtonContainer" + this.chartId,
								"wrapEl": "#funnelFixedFilter" + filterConfig.name + "ButtonContainer" + this.chartId
							},
							"items": [
								this.getPeriodFixedButtonsViewConfig(filterConfig.name, periodConfig),
								this.getDateFilterValueLabel(periodConfig, "startDateColumnName",
										resources.localizableStrings.StartDatePlaceholder),
								{
									"className": "Terrasoft.Label",
									"classes": {
										"labelClass": ["funnel-filter-inner-container label", "filter-caption-label",
											"filter-element-with-right-space"]
									},
									"caption": resources.localizableStrings.PeriodToLabelCaption
								},
								this.getDateFilterValueLabel(periodConfig, "dueDateColumnName",
										resources.localizableStrings.DueDatePlaceholder),
								{
									"className": "Terrasoft.Button",
									"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
									"imageConfig": resources.localizableImages.RemoveButtonImage,
									"classes": {"wrapperClass": "funnel-filter-remove-button"},
									"hint": resources.localizableStrings.RemoveButtonHint,
									"click": {"bindTo": "clearPeriodFilter"},
									"tag": {"periodConfig": periodConfig}
								}
							],
							"classes": {"wrapClassName": "funnel-filter-inner-container filter-cell-filter-container"}
						}
					];
				},

				/**
				 * ######### ############ ############# ####### ## ####### ####.
				 * @protected
				 * param {Object} periodConfig ############ #######.
				 * param {String} currentColumnName ######## ####### ####### ####.
				 * param {String} placeholder ######### ####### #### #######
				 * @return {Object} ############ ############# ####### ## ####### ####.
				 */
				getDateFilterValueLabel: function(periodConfig, currentColumnName, placeholder) {
					var columnName = periodConfig[currentColumnName];
					return {
						"id": "funnelFixedFilter" + columnName + "View" + this.chartId,
						"className": "Terrasoft.LabelDateEdit",
						"classes": {
							"labelClass": ["funnel-filter-inner-container label", "filter-value-label",
								"filter-element-with-right-space"]
						},
						"value": {"bindTo": columnName},
						"change": {"bindTo": "setDateValue"},
						"tag": columnName,
						"placeholder": placeholder
					};
				},

				/**
				 * ######### ############ ############# ###### ######### #### ########### ####### ######.
				 * @protected
				 * @return {Object} ############ ############# ###### ######### ####.
				 */
				getCalcButtonsContainerConfig: function() {
					return {
						"name": "grid-wrapper-calcButtonsId" + this.chartId,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"visible": {
							"bindTo": "displayMode",
							"bindConfig": {"converter": "isChartDisplayMode"}
						},
						"classes": {"wrapClassName": ["funnel-buttons-settings-container"]},
						"items": [
							{
								"name": this.chartId + "_thirdType",
								"itemType": Terrasoft.ViewItemType.BUTTON,
								"caption": resources.localizableStrings.ConversionByCountCaption,
								"click": {"bindTo": "updateFunnelType"},
								"controlConfig": {"style": Terrasoft.controls.ButtonEnums.style.DEFAULT},
								"visible": {
									"bindTo": "displayMode",
									"bindConfig": {"converter": "isChartDisplayMode"}
								},
								"classes": {"textClass": "funnel-buttons-settings"},
								groupName: "settingsButtonGroup",
								"pressed": {"bindTo": "getIsPressedButtonSetting"},
								"tag": "byNumberConversion"
							},
							{
								"name": this.chartId + "_firstType",
								"itemType": Terrasoft.ViewItemType.BUTTON,
								"caption": resources.localizableStrings.StageConversionCaption,
								"click": {"bindTo": "updateFunnelType"},
								"controlConfig": {"style": Terrasoft.controls.ButtonEnums.style.DEFAULT},
								"visible": {
									"bindTo": "displayMode",
									"bindConfig": {"converter": "isChartDisplayMode"}
								},
								"classes": {"textClass": "funnel-buttons-settings"},
								"groupName": "settingsButtonGroup",
								"pressed": {"bindTo": "getIsPressedButtonSetting"},
								"tag": "stageConversion"
							},
							{
								"name": this.chartId + "_secondType",
								"itemType": Terrasoft.ViewItemType.BUTTON,
								"caption": resources.localizableStrings.ToFirstStageConversionCaption,
								"click": {"bindTo": "updateFunnelType"},
								"controlConfig": {"style": Terrasoft.controls.ButtonEnums.style.DEFAULT},
								"visible": {
									"bindTo": "displayMode",
									"bindConfig": {"converter": "isChartDisplayMode"}
								},
								"classes": {"textClass": "funnel-buttons-settings"},
								"groupName": "settingsButtonGroup",
								"pressed": {"bindTo": "getIsPressedButtonSetting"},
								"tag": "toFirstConversion"
							}
						]
					};
				},

				/**
				 * @inheritdoc Terrasoft.ChartModule#applyDrillDownMenuConfig
				 * @overridden
				 */
				applyDrillDownMenuConfig: function(chartId, viewConfig) {
					var drillDownConfig = {
						"items": [{
							"caption": {"bindTo": "Resources.Strings.ShowDataCaption"},
							"markerValue": "ShowDataButton",
							"click": {"bindTo": "showDrillDownData"}
						}]
					};
					var drillDownMenuUpdateOperation = [{
						operation: "merge",
						name: chartId + "-drilldownMenu",
						values: {
							drilldownMenu: drillDownConfig
						}
					}];
					viewConfig = Terrasoft.JsonApplier.applyDiff(viewConfig, drillDownMenuUpdateOperation);
					return viewConfig;
				},

				/**
				 * ########## ############ ############# #######.
				 * @param {Object} config ######### ######## ######.
				 * @return {Object[]} ########## ############ ############# #######.
				 */
				generate: function(config) {
					var chartId = this.chartId = "Chart_" + config.sandboxId;
					var filterFunnelConfig = {
						"name": "PeriodFilter",
						"caption": "Period",
						"dataValueType": Terrasoft.DataValueType.DATE,
						"startDate": {
							"columnName": "StartDate",
							"defValue": Terrasoft.startOfMonth(new Date())
						},
						"dueDate": {
							"columnName": "DueDate",
							"defValue": Terrasoft.endOfMonth(new Date())
						}
					};
					var viewMainFunnelFilterViewConfig = this.getFilterFunnelViewConfig(filterFunnelConfig);
					var viewMainFunnelFilterConfig = {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"className": "Terrasoft.Container",
						"id": "viewMainFunnelFilterContainer" + chartId,
						"selectors": {
							"el": "#viewMainFunnelFilterContainer" + chartId,
							"wrapEl": "#viewMainFunnelFilterContainer" + chartId
						},
						"classes": {"wrapClassName": ["main-filter-container"]},
						"controlConfig": {"items": [viewMainFunnelFilterViewConfig]},
						"tpl": [
							"<span id=\"{id}\" style=\"{wrapStyles}\" class=\"{wrapClassName}\">",
							"{%this.renderItems(out, values)%}",
							"</span>"
						],
						"afterrender": {"bindTo": "initialize"}
					};
					var filterContainerConfig = {
						"name": "grid-wrapper-chartFixedAdditionalFilterId" + chartId,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["main-filter-container"],
						"id": "grid-wrapper-chartFixedAdditionalFilterId" + chartId + "Container",
						"items": [viewMainFunnelFilterConfig]
					};
					var calcButtonsContainerConfig = this.getCalcButtonsContainerConfig();
					var chartViewConfig = this.callParent(arguments);
					var chartViewConfigItems = chartViewConfig[0].items;
					// ######## ### ########## #######
					chartViewConfigItems[2].className = "Terrasoft.OpportunityFunnelChart";
					// ######### ##### ########## # ######## ############ ############# ######## ## #######
					// # ###### ######### #### #######
					chartViewConfigItems.splice(2, 0, filterContainerConfig, calcButtonsContainerConfig);
					// ######## wrapClass ########## ####### (######### #######)
					chartViewConfigItems[chartViewConfigItems.length - 1].wrapClass.push("funnel-chart-grid-wrapper");
					return [
						{
							"name": "chart-module-wrapper-" + chartId,
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"classes": {"wrapClassName": ["funnel-main-container"]},
							"items": chartViewConfig
						}
					];
				}
			});

			/**
			 * @class Terrasoft.configuration.OpportunityFunnelModule
			 * ##### ###### ####### ######.
			 */
			Ext.define("Terrasoft.configuration.OpportunityFunnelModule", {
				alternateClassName: "Terrasoft.OpportunityFunnelModule",
				extend: "Terrasoft.ChartModule",

				/**
				 * ### ###### ###### ############# ### ########## ######.
				 * @type {String}
				 */
				viewModelClassName: "Terrasoft.OpportunityFunnelViewModel",

				/**
				 * ### ##### ########## ############ ############# ########## ######.
				 * @type {String}
				 */
				viewConfigClassName: "Terrasoft.OpportunityFunnelViewConfig",

				/**
				 * @inheritDoc Terrasoft.ChartModule#init
				 * @overridden
				 */
				init: function() {
					if (this.viewModel) {
						this.viewModel.set("IsModuleInitializing", true);
					}
					this.callParent(arguments);
					if (this.viewModel) {
						this.viewModel.set("IsModuleInitializing", false);
					}
				}
			});
			return Terrasoft.OpportunityFunnelModule;
		});


