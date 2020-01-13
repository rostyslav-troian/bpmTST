Terrasoft.configuration.Structures["FixedFilterViewV2"] = {innerHierarchyStack: ["FixedFilterViewV2"]};
define("FixedFilterViewV2", ["ext-base", "terrasoft", "FixedFilterViewV2Resources"],
	function(Ext, Terrasoft, resources) {

		/**
		 * ######### ############ ############ ######## ## #######.
		 * @param {Object} filterConfig ############ ############ ########.
		 * @return {Object} ############ ############ ######## ## #######.
		 */
		function getPeriodFilterConfig(filterConfig) {
			var resultConfig = {};
			var startDateColumnName = filterConfig.columnName;
			var startDateDefValue = filterConfig.defValue || null;
			var dueDateColumnName = filterConfig.columnName;
			var dueDateDefValue = filterConfig.defValue || null;
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
		}

		var filterChangedDefined;

		function getFixedButtonBaseConfig(config) {
			return this.Ext.apply({}, config, {
				className: "Terrasoft.Button",
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				hint: resources.localizableStrings.SelectOwnerCaption
			});
		}

		function getPeriodFilterViewConfig(filterConfig) {
			var periodConfig = getPeriodFilterConfig(filterConfig);
			var items = [
				{
					className: "Terrasoft.Container",
					id: "fixedFilter" + filterConfig.name + "ButtonContainer",
					selectors: {
						el: "#fixedFilter" + filterConfig.name + "ButtonContainer",
						wrapEl: "#fixedFilter" + filterConfig.name + "ButtonContainer"
					},
					items: getPeriodFixedButtonsViewConfig(filterConfig.name),
					classes: {
						wrapClassName: "filter-inner-container fixed-filter-element-container-wrap " +
							"fixed-period-filter-element-container-wrap"
					}
				},
				{
					className: "Terrasoft.Container",
					id: "fixedFilter" + filterConfig.name + "ValuesContainer",
					selectors: {
						el: "#fixedFilter" + filterConfig.name + "ValuesContainer",
						wrapEl: "#fixedFilter" + filterConfig.name + "ValuesContainer"
					},
					items: [
						getDateFilterValueLabel(periodConfig, "startDateColumnName",
							resources.localizableStrings.StartDatePlaceholder),
						{
							className: "Terrasoft.Label",
							classes: {
								labelClass: ["filter-caption-label", "filter-element-with-right-space"]
							},
							caption: resources.localizableStrings.PeriodToLabelCaption
						},
						getDateFilterValueLabel(periodConfig, "dueDateColumnName",
							resources.localizableStrings.DueDatePlaceholder),
						{
							className: "Terrasoft.Button",
							style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							hint: resources.localizableStrings.RemoveButtonHint,
							imageConfig: resources.localizableImages.RemoveButtonImage,
							classes: {
								wrapperClass: "filter-remove-button"
							},
							markerValue: "clearPeriodFilter",
							click: {bindTo: "clearPeriodFilter"},
							tag: periodConfig
						}
					],
					classes: {
						wrapClassName: "filter-inner-container fixed-filter-element-container-wrap"
					}
				}
			];
			return items;
		}

		function getDateFilterValueLabel(periodConfig, currentColumnName, placeholder) {
			var columnName = periodConfig[currentColumnName];
			var config = {
				id: "fixedFilter" + columnName + "View",
				className: "Terrasoft.LabelDateEdit",
				classes: {
					labelClass: ["filter-value-label", "filter-element-with-right-space"]
				},
				value: {
					bindTo: columnName
				},
				tag: {
					currentColumnName: columnName,
					periodConfig: periodConfig
				},
				placeholder: placeholder
			};
			if (filterChangedDefined) {
				config.change = {
					bindTo: "periodChanged"
				};
			}
			return config;
		}

		/**
		 * ########## ###### ######### ### ########## ## #######.
		 * @param {String} filterName ######## #######, ### ######## ############.
		 * @return {Array} ###### ######### ### ########## ## #######.
		 */
		function getPeriodFixedButtonsViewConfig(filterName) {
			var localizableStrings = resources.localizableStrings;
			var localizableImages = resources.localizableImages;
			var dayButton = getFixedButtonBaseConfig({
				click: {bindTo: "setCurrentDayPeriod"},
				hint: localizableStrings.TodayCaption,
				imageConfig: localizableImages.DayPeriodButtonImage,
				markerValue: "day",
				classes: {
					wrapperClass: ["day-period-fixed-filter-wrapper-class"],
					imageClass: ["period-fixed-filter-image-class"]
				},
				visible: {bindTo: "dayButtonVisible"}
			});
			var weekButton = getFixedButtonBaseConfig({
				click: {bindTo: "setCurrentWeekPeriod"},
				hint: localizableStrings.CurrentWeekCaption,
				imageConfig: localizableImages.WeekPeriodButtonImage,
				markerValue: "week",
				classes: {
					wrapperClass: ["day-period-fixed-filter-wrapper-class"],
					imageClass: ["period-fixed-filter-image-class"]
				},
				visible: {bindTo: "weekButtonVisible"}
			});
			var monthButton = getFixedButtonBaseConfig({
				imageConfig: localizableImages.MonthPeriodButtonImage,
				hint: localizableStrings.SelectPeriodCaption,
				markerValue: "month",
				classes: {
					imageClass: ["period-fixed-filter-image-class"]
				},
				visible: {bindTo: "monthButtonVisible"}
			});
			monthButton.menu = {
				items: [{
					className: "Terrasoft.MenuItem",
					caption: localizableStrings.YesterdayCaption,
					click: {bindTo: "setPeriod"},
					tag: filterName + "_Yesterday"
				}, {
					className: "Terrasoft.MenuItem",
					caption: localizableStrings.TodayCaption,
					click: {bindTo: "setPeriod"},
					tag: filterName + "_Today"
				}, {
					className: "Terrasoft.MenuItem",
					caption: localizableStrings.TomorrowCaption,
					click: {bindTo: "setPeriod"},
					tag: filterName + "_Tomorrow"
				}, {
					className: "Terrasoft.MenuSeparator"
				}, {
					className: "Terrasoft.MenuItem",
					caption: localizableStrings.PastWeekCaption,
					click: {bindTo: "setPeriod"},
					tag: filterName + "_PastWeek"
				}, {
					className: "Terrasoft.MenuItem",
					caption: localizableStrings.CurrentWeekCaption,
					click: {bindTo: "setPeriod"},
					tag: filterName + "_CurrentWeek"
				}, {
					className: "Terrasoft.MenuItem",
					caption: localizableStrings.NextWeekCaption,
					click: {bindTo: "setPeriod"},
					tag: filterName + "_NextWeek"
				}, {
					className: "Terrasoft.MenuSeparator"
				}, {
					className: "Terrasoft.MenuItem",
					caption: localizableStrings.PastMonthCaption,
					click: {bindTo: "setPeriod"},
					tag: filterName + "_PastMonth"
				}, {
					className: "Terrasoft.MenuItem",
					caption: localizableStrings.CurrentMonthCaption,
					click: {bindTo: "setPeriod"},
					tag: filterName + "_CurrentMonth"
				}, {
					className: "Terrasoft.MenuItem",
					caption: localizableStrings.NextMonthCaption,
					click: {bindTo: "setPeriod"},
					tag: filterName + "_NextMonth"
				}]
			};
			return [dayButton, weekButton, monthButton];
		}

		/**
		 * Returns view config for custom filter button.
		 * @protected
		 * @param {Object} filterConfig Initial filter button config.
		 * @return {Object[]}
		 */
		function getCustomFixedButtonConfig(filterConfig) {
			var config = getFixedButtonBaseConfig();
			config.caption = {
				bindTo: filterConfig.name + "ButtonCaption"
			};
			config.markerValue = filterConfig.markerValue || "OwnerFixedFilterBtn";
			config.imageConfig = filterConfig.buttonImageConfig || resources.localizableImages.LookupButtonImage;
			config.menu = {items: getMenuButtonItems(filterConfig)};
			config.hint = Ext.isDefined(filterConfig.hint) ? filterConfig.hint : config.hint;
			return [config];
		}

		/**
		 * Returns an array of menu items for custom fixed filter button.
		 * @protected
		 * @param {Object} filterConfig Filter configuration.
		 * @return {Object[]} Menu items.
		 */
		function getMenuButtonItems(filterConfig) {
			var items = [];
			if (filterConfig.appendCurrentContactMenuItem !== false) {
				items.push(
					{
						className: "Terrasoft.MenuItem",
						caption: Terrasoft.SysValue.CURRENT_USER_CONTACT.displayValue,
						click: {
							bindTo: "setCurrentContact"
						},
						markerValue: "SetCurrentUserOwnerFixedFilterMenuItem",
						tag: filterConfig.name
					},
					{
						className: "Terrasoft.MenuSeparator"
					}
				);
			}
			var addNewFilterCaptionConfig = filterConfig.addNewFilterCaption
				? filterConfig.addNewFilterCaption
				: {bindTo: "addOwnerCaption"};
			var addNewFilterMarkerValue = filterConfig.addNewFilterCaption
				? filterConfig.addNewFilterCaption
				: "AddOwnerFixedFilterMenuItem";
			items.push(
				{
					className: "Terrasoft.MenuItem",
					caption: addNewFilterCaptionConfig,
					click: {
						bindTo: "addLookupFilter"
					},
					markerValue: addNewFilterMarkerValue,
					tag: filterConfig.name
				},
				{
					className: "Terrasoft.MenuItem",
					caption: resources.localizableStrings.ClearCaption,
					click: {
						bindTo: "clearLookupFilter"
					},
					markerValue: "ClearOwnerFixedFilterMenuItem",
					tag: filterConfig.name
				}
			);
			return items;
		}

		function generate(schema) {
			filterChangedDefined = schema.filterChangedDefined;
			var fixedFilterContainerName = schema.fixedFilterContainerName;
			/*jshint quotmark: false */
			var viewConfig = {
				id: fixedFilterContainerName,
				selectors: {
					el: "#" + fixedFilterContainerName,
					wrapEl: "#" + fixedFilterContainerName
				},
				classes: {
					wrapClassName: "fixed-filter-container"
				},
				items: [
				],
				tpl: [
					"<span id=\"{id}\" style=\"{wrapStyles}\" class=\"{wrapClassName}\">",
					"{%this.renderItems(out, values)%}",
					"</span>"
				]
			};
			/*jshint quotmark: true */
			Terrasoft.each(schema.filters, function(filterConfig) {
				if (!filterConfig.moduleName) {
					var filterViewConfig = getFilterViewConfig(filterConfig);
					viewConfig.items.push(filterViewConfig);
				}
			}, this);
			return viewConfig;
		}

		function getFilterViewConfig(filterConfig) {
			/*jshint quotmark: false */
			var config = {
				className: "Terrasoft.Container",
				id: "fixedFilter" + filterConfig.name + "Container",
				selectors: {
					el: "#fixedFilter" + filterConfig.name + "Container",
					wrapEl: "#fixedFilter" + filterConfig.name + "Container"
				},
				tpl: [
					"<span id=\"{id}\" style=\"{wrapStyles}\" class=\"{wrapClassName}\">",
					"{%this.renderItems(out, values)%}",
					"</span>"
				],
				items: [
				]
			};
			/*jshint quotmark: true */
			if (filterConfig.dataValueType === Terrasoft.DataValueType.DATE) {
				config.items = getPeriodFilterViewConfig(filterConfig);
			} else {
				var buttonContainer = {
					className: "Terrasoft.Container",
					id: "fixedFilter" + filterConfig.name + "ButtonContainer",
					selectors: {
						el: "#fixedFilter" + filterConfig.name + "ButtonContainer",
						wrapEl: "#fixedFilter" + filterConfig.name + "ButtonContainer"
					},
					items: getCustomFixedButtonConfig(filterConfig),
					classes: {
						wrapClassName: "filter-inner-container fixed-filter-element-container-wrap " +
							"owner-fixed-filter-container-class"
					}
				};
				config.items.push(buttonContainer);
			}
			return config;
		}

		function generateSimpleEditFilterConfig(filterName, simpleFilterEditContainerName) {
			var viewConfig = {
				id: simpleFilterEditContainerName,
				selectors: {
					el: "#" + simpleFilterEditContainerName,
					wrapEl: "#" + simpleFilterEditContainerName
				},
				classes: {
					wrapClassName: "filter-inner-container"
				},
				items: [
					{
						className: "Terrasoft.LookupEdit",
						classes: {
							wrapClass: "filter-simple-filter-edit"
						},
						value: {
							bindTo: filterName
						},
						list: {
							bindTo: filterName + "List"
						}
					},
					{
						className: "Terrasoft.Button",
						imageConfig: resources.localizableImages.ApplyButtonImage,
						style: Terrasoft.controls.ButtonEnums.style.BLUE,
						classes: {
							wrapperClass: ["filter-element-with-right-space"]
						},
						click: {
							bindTo: "applyFilter"
						},
						tag: filterName
					},
					{
						className: "Terrasoft.Button",
						imageConfig: resources.localizableImages.CancelButtonImage,
						click: {
							bindTo: "destroySimpleFilterEdit"
						},
						tag: filterName
					}
				],
				destroy: {
					bindTo: "clearSimpleFilterProperties"
				},
				tag: filterName
			};
			return viewConfig;
		}

		return {
			generate: generate,
			generateSimpleEditFilterConfig: generateSimpleEditFilterConfig
		};

	});


