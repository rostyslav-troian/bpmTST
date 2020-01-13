Terrasoft.configuration.Structures["FullPipelineViewConfig"] = {innerHierarchyStack: ["FullPipelineViewConfig"]};
define("FullPipelineViewConfig", ["FullPipelineModuleResources", "FullPipelineChart", "ChartModule",
			"css!FullPipelineViewConfig", "css!ChartModule"], function(resources) {

			/**
			 * @class Terrasoft.configuration.FullPipelineViewConfig
			 * The class generates chart view module configuration
			 */
			Ext.define("Terrasoft.configuration.FullPipelineViewConfig", {
				extend: "Terrasoft.ChartViewConfig",
				alternateClassName: "Terrasoft.FullPipelineViewConfig",

				/**
				 * Chart id.
				 * @type {String}
				 */
				chartId: null,

				/**
				 * Generates fullpipeline fixed filters by period view configuration.
				 * @protected
				 * @virtual
				 * @param {Object} filterConfig Filter config.
				 * @param {String} filterConfig.name Filter name.
				 * @return {Object} Funnel filter container view config.
				 */
				getFilterFunnelViewConfig: function(filterConfig) {
					var config = {
						"className": "Terrasoft.Container",
						"id": "fullpipelineFixedFilter" + filterConfig.name + "Container" + this.chartId,
						"selectors": {
							"el": "#fullpipelineFixedFilter" + filterConfig.name + "Container" + this.chartId,
							"wrapEl": "#fullpipelineFixedFilter" + filterConfig.name + "Container" + this.chartId
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
				 * Returns period menu item config.
				 * @protected
				 * @virtual
				 * @param {String} filterName Filter name.
				 * @param {String} caption Filter caption.
				 * @param {Object} periodConfig Period config.
				 * @return {Object} Period menu item config.
				 */
				getPeriodMenuItemConfig: function(filterName, caption, periodConfig) {
					return {
						"className": "Terrasoft.MenuItem",
						"caption": caption,
						"click": {"bindTo": "setPeriod"},
						"tag": {
							"filterName": filterName,
							"periodConfig": periodConfig
						}
					};
				},

				/**
				 * Returns period fixed buttons view config.
				 * @protected
				 * @virtual
				 * @param {String} filterName Filter name.
				 * @param {Object} periodConfig Period config.
				 * @return {Object} Period fixed buttons view config.
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
							this.getPeriodMenuItemConfig(filterName + "_Yesterday",
								localizableStrings.YesterdayCaption, periodConfig),
							this.getPeriodMenuItemConfig(filterName + "_Today",
								localizableStrings.TodayCaption, periodConfig),
							this.getPeriodMenuItemConfig(filterName + "_PastWeek",
								localizableStrings.PastWeekCaption, periodConfig),
							this.getPeriodMenuItemConfig(filterName + "_CurrentWeek",
								localizableStrings.CurrentWeekCaption, periodConfig),
							{
								className: "Terrasoft.MenuSeparator"
							},
							this.getPeriodMenuItemConfig(filterName + "_PastMonth",
								localizableStrings.PastMonthCaption, periodConfig),
							this.getPeriodMenuItemConfig(filterName + "_CurrentMonth",
								localizableStrings.CurrentMonthCaption, periodConfig)
						]
					};
					Terrasoft.each(monthButton.menu.items, function(menuItem) {
						menuItem.markerValue = menuItem.caption;
					}, this);
					return monthButton;
				},

				/**
				 * Returns base fixed button config.
				 * @protected
				 * @virtual
				 * @return {Object} Button config.
				 */
				getFixedButtonBaseConfig: function() {
					return {
						"className": "Terrasoft.Button",
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
					};
				},

				/**
				 * Returns period filter values config.
				 * @protected
				 * @virtual
				 * @param {Object} filterConfig Period config.
				 * @return {Object} Period filter values config.
				 */
				getPeriodFilterValuesConfig: function(filterConfig) {
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
				 * Returns clear filter button config.
				 * @protected
				 * @virtual
				 * @param {Object} periodConfig Period config.
				 * @return {Object} Clear button config.
				 */
				getClearFilterButtonConfig: function(periodConfig) {
					return {
						"className": "Terrasoft.Button",
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"imageConfig": resources.localizableImages.RemoveButtonImage,
						"classes": {"wrapperClass": "fullpipeline-filter-remove-button"},
						"hint": resources.localizableStrings.RemoveButtonHint,
						"click": {"bindTo": "clearPeriodFilter"},
						"tag": {"periodConfig": periodConfig},
						"markerValue": "ClearPeriodFilter"
					};
				},

				/**
				 * Returns period filters container view config.
				 * @protected
				 * @virtual
				 * @param {String} filterConfig Filter config.
				 * @param {String} filterConfig.name Filter name.
				 * @return {Object[]} Period filters container config.
				 */
				getPeriodFilterViewConfig: function(filterConfig) {
					var periodConfig = this.getPeriodFilterValuesConfig(filterConfig);
					return [
						{
							"className": "Terrasoft.Container",
							"id": "fullpipelineFixedFilter" + filterConfig.name + "ButtonContainer" + this.chartId,
							"selectors": {
								"el": "#fullpipelineFixedFilter" + filterConfig.name + "ButtonContainer" + this.chartId,
								"wrapEl": "#fullpipelineFixedFilter" + filterConfig.name + "ButtonContainer" + this.chartId
							},
							"items": [
								this.getPeriodFixedButtonsViewConfig(filterConfig.name, periodConfig),
								this.getDateFilterValueLabelConfig(periodConfig, "startDateColumnName",
										resources.localizableStrings.StartDatePlaceholder),
								{
									"className": "Terrasoft.Label",
									"classes": {
										"labelClass": [
											"fullpipeline-filter-inner-container label", "filter-caption-label",
											"filter-element-with-right-space"
										]
									},
									"caption": resources.localizableStrings.PeriodToLabelCaption
								},
								this.getDateFilterValueLabelConfig(periodConfig, "dueDateColumnName",
										resources.localizableStrings.DueDatePlaceholder),
								this.getClearFilterButtonConfig(periodConfig)
							],
							"classes": {"wrapClassName": "fullpipeline-filter-inner-container filter-cell-filter-container"}
						}
					];
				},

				/**
				 * Returns date filter label value config.
				 * @protected
				 * @virtual
				 * @param {String} periodConfig Period values config.
				 * @param {String} currentColumnName Current filter column name.
				 * @param {String} placeholder Placeholder text.
				 * @return {Object} Date filter label value config.
				 */
				getDateFilterValueLabelConfig: function(periodConfig, currentColumnName, placeholder) {
					var columnName = periodConfig[currentColumnName];
					return {
						"id": "fullpipelineFixedFilter" + columnName + "View" + this.chartId,
						"className": "Terrasoft.LabelDateEdit",
						"classes": {
							"labelClass": [
								"fullpipeline-filter-inner-container label", "filter-value-label",
								"filter-element-with-right-space"
							]
						},
						"value": {"bindTo": columnName},
						"tag": columnName,
						"markerValue": columnName,
						"placeholder": placeholder
					};
				},

				/**
				 * Returns base fullpipeline slice button config.
				 * @protected
				 * @virtual
				 * @param {String} tag Button tag.
				 * @param {String} caption Button caption.
				 * @return {Object} Funnel slice button config.
				 */
				getSliceButtonConfig: function(tag, caption) {
					return {
						"name": [this.chartId, tag].join("_"),
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": caption,
						"click": {"bindTo": "updatePipelineSliceTypeHandler"},
						"controlConfig": {"style": Terrasoft.controls.ButtonEnums.style.DEFAULT},
						"visible": {
							"bindTo": "isDrilledDown",
							"bindConfig": {"converter": "invertBooleanValue"}
						},
						"classes": {"textClass": "fullpipeline-buttons-settings"},
						"groupName": "settingsButtonGroup",
						"pressed": {"bindTo": "getIsPressedButtonSetting"},
						"tag": tag
					};
				},

				/**
				 * Returns fullpipeline slice buttons container config.
				 * @protected
				 * @virtual
				 * @return {Object} Slice buttons container config.
				 */
				getCalcButtonsContainerConfig: function() {
					return {
						"name": "grid-wrapper-calcButtonsId" + this.chartId,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"visible": {
							"bindTo": "isDrilledDown",
							"bindConfig": {"converter": "invertBooleanValue"}
						},
						"classes": {"wrapClassName": ["fullpipeline-buttons-settings-container"]},
						"items": [
							this.getSliceButtonConfig("byNumberConversion",
								resources.localizableStrings.ConversionByCountCaption),
							this.getSliceButtonConfig("stageConversion",
								resources.localizableStrings.StageConversionCaption),
							this.getSliceButtonConfig("toFirstConversion",
								resources.localizableStrings.ToFirstStageConversionCaption)
						]
					};
				},

				/**
				 * @inheritDoc Terrasoft.ChartViewConfig#getChartControlConfig
				 * @override
				 */
				getChartControlConfig: function(chartId) {
					var config = this.callParent(arguments);
					return Ext.merge(config, {
						"className": "Terrasoft.FullPipelineChart",
						"drillDownMode": {
							"bindTo" : "DrillDownMode"
						},
						"expanded": {
							"bindTo": "onExpanded"
						}
					});
				},

				/**
				 * Returns date period filter config.
				 * @protected
				 * @virtual
				 * @return {Object} Date period filter.
				 */
				getDatePeriodFilterConfig: function() {
					return {
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
				},

				/**
				 * Returns filter container config.
				 * @protected
				 * @virtual
				 * @param {String} chartId Chart id.
				 * @return {Object} Filter container config.
				 */
				getFilterContainerConfig: function(chartId) {
					var filterFunnelConfig = this.getDatePeriodFilterConfig();
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
						]
					};
					return {
						"name": "grid-wrapper-chartFixedAdditionalFilterId" + chartId,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["main-filter-container"],
						"id": "grid-wrapper-chartFixedAdditionalFilterId" + chartId + "Container",
						"items": [viewMainFunnelFilterConfig]
					};
				},

				/**
				 * @inheritDoc Terrasoft.ChartViewConfig#generate
				 * @override
				 */
				generate: function(config) {
					var chartId = this.chartId = "Chart_" + config.sandboxId;
					var chartViewConfig = this.callParent(arguments);
					var filterContainerConfig = this.getFilterContainerConfig(chartId);
					var calcButtonsContainerConfig = this.getCalcButtonsContainerConfig();
					var chartViewConfigItems = chartViewConfig[0].items;
					chartViewConfigItems.splice(2, 0, filterContainerConfig, calcButtonsContainerConfig);
					chartViewConfigItems[chartViewConfigItems.length - 1].wrapClass.push("fullpipeline-chart-grid-wrapper");
					return [
						{
							"name": "chart-module-wrapper-" + chartId,
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"classes": {"wrapClassName": ["fullpipeline-main-container"]},
							"items": chartViewConfig
						}
					];
				}
			});
		}
);


