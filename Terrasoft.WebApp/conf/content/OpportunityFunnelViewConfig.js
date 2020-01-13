Terrasoft.configuration.Structures["OpportunityFunnelViewConfig"] = {innerHierarchyStack: ["OpportunityFunnelViewConfig"]};
define("OpportunityFunnelViewConfig", ["OpportunityFunnelModuleV2Resources", "OpportunityFunnelChart", "ChartModule",
			"css!OpportunityFunnelViewConfig", "css!ChartModule"], function(resources) {

			/**
			 * @class Terrasoft.configuration.OpportunityFunnelViewConfig
			 * The class generates chart view module configuration
			 */
			Ext.define("Terrasoft.configuration.OpportunityFunnelViewConfig", {
				extend: "Terrasoft.ChartViewConfig",
				alternateClassName: "Terrasoft.OpportunityFunnelViewConfig",

				chartId: null,

				/**
				 * Generates funnel fixed filters by period view configuration
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
										"labelClass": [
											"funnel-filter-inner-container label", "filter-caption-label",
											"filter-element-with-right-space"
										]
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
									"tag": {"periodConfig": periodConfig},
									"markerValue": "ClearPeriodFilter"
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
							"labelClass": [
								"funnel-filter-inner-container label", "filter-value-label",
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
				 * ######### ############ ############# ###### ######### #### ########### ####### ######.
				 * @protected
				 * @return {Object} ############ ############# ###### ######### ####.
				 */
				getCalcButtonsContainerConfig: function() {
					return {
						"name": "grid-wrapper-calcButtonsId" + this.chartId,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"visible": {
							"bindTo": "isDrilledDown",
							"bindConfig": {"converter": "invertBooleanValue"}
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
									"bindTo": "isDrilledDown",
									"bindConfig": {"converter": "invertBooleanValue"}
								},
								"classes": {"textClass": "funnel-buttons-settings"},
								"groupName": "settingsButtonGroup",
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
									"bindTo": "isDrilledDown",
									"bindConfig": {"converter": "invertBooleanValue"}
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
									"bindTo": "isDrilledDown",
									"bindConfig": {"converter": "invertBooleanValue"}
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
						]
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
					var chartConfig = chartViewConfigItems[2];
					chartConfig.className = "Terrasoft.OpportunityFunnelChart";
					chartConfig.drillDownMode = {
						"bindTo" : "DrillDownMode"
					};
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
		}
);


