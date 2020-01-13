Terrasoft.configuration.Structures["CalendarWorkingTimeUtility"] = {innerHierarchyStack: ["CalendarWorkingTimeUtility"]};
define("CalendarWorkingTimeUtility", [],
	function() {
		/**
		 * @class This.terrasoft.tconfiguration.mixins.CalendarWorkingTimeUtility
		 * Mixin, that implements work with working interval on detail.
		 */
		Ext.define("Terrasoft.configuration.mixins.CalendarWorkingTimeUtility", {
			alternateClassName: "Terrasoft.CalendarWorkingTimeUtility",

			/**
			 * @inheritdoc Terrasoft.ConfigurationGridUtiliteso#generateActiveRowControlsConfig
			 * @overridden
			 */
			loadGridDataRecord: function(primaryColumnValue, callback, scope) {
				this.clearDayIntervalConfig(primaryColumnValue);
				var esq = this.getWorkingIntervalsQuery();
				if (!esq) {
					return;
				}
				this.addWorkingIntervalsQueryFilters(esq, primaryColumnValue);
				esq.getEntityCollection(function(response) {
					if (!response.success) {
						return;
					}
					this.performIntervals(response.collection);
					if (this.Ext.isFunction(callback)) {
						callback.call(scope || this);
					}
				}, this);
			},

			/**
			 * Adds workings interval query filters.
			 * @protected
			 * @param {Terrasfot.EntitySchemaQuery} esq Query.
			 * @param {String} primaryColumnValue Primary column value.
			 */
			addWorkingIntervalsQueryFilters: function(esq, primaryColumnValue) {
				esq.filters.add("primaryColumnValueFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, this.entitySchemaName, primaryColumnValue));
			},

			/**
			 * Clears day interval config.
			 * @protected
			 * @param {Object} dayId Day identifier.
			 */
			clearDayIntervalConfig: function(dayId) {
				var intervalsConfig = this.get("IntervalsConfig");
				if (this.Ext.isEmpty(intervalsConfig)) {
					return;
				}
				intervalsConfig[dayId] = this.generateDayConfig();
			},

			/**
			 * Generates day config.
			 * @protected
			 * @return {Object} Day config.
			*/
			generateDayConfig: function() {
				return {
					displayValue: "",
					intervals: []
				};
			},

			/**
			 * Returns entity schema query for working time intervals.
			 * @protected
			 * @return {EntitySchemaQuery}
			 */
			getWorkingIntervalsQuery: this.Terrasoft.emptyFn,

			/**
			 * Applies virtual columns config.
			 * @protected
			 * @param {String} columnName Column name.
			 * @param {Object} cellConfig Cell config.
			 */
			applyVirtualColumnsConfig: function(columnName, cellConfig) {
				cellConfig.caption = columnName;
				cellConfig.name = columnName;
				cellConfig.enabled = false;
				cellConfig.dataValueType = this.Terrasoft.DataValueType.TEXT;
				cellConfig.labelConfig = {
					visible: false
				};
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#prepareResponseCollectionItem:
			 * @overridden
			 */
			prepareResponseCollectionItem: function(item, emptyColumnCaption) {
				var value = emptyColumnCaption;
				if(!item.get("DayType.NonWorking")) {
					var intervals = this.get("IntervalsConfig");
					if (!this.Ext.isEmpty(intervals)) {
						var id = item.get("Id").toLowerCase();
						var config = intervals[id];
						if (!this.Ext.isEmpty(config) && config.intervals.length > 0) {
							value = config.displayValue;
						}
					}
				} else {
					value = "";
				}
				item.set("WorkingIntervals", value);
			},

			/**
			 * Returns two digits strings for initial number.
			 * @protected
			 * @param {Number} number Initial number.
			 * @return {String}
			 */
			addZero: function(number) {
				return number < 10 ? "0" + number : "" + number;
			},

			/**
			 * Performs and saves received working intervals into strings.
			 * @protected
			 * @param {Collection} collection Initial number.
			 */
			performIntervals: function(collection) {
				collection.each(this.fillDayIntervals, this);
			},

			/**
			 * Fills day intervals.
			 * @protected
			 * @param {Object} item Day interval.
			 */
			fillDayIntervals: function(item) {
				var dayInCalendar = item.get(this.entitySchemaName);
				if (!dayInCalendar) {
					return;
				}
				var key = dayInCalendar.value;
				var intervalsConfig = this.get("IntervalsConfig");
				if (this.Ext.isEmpty(intervalsConfig)) {
					return;
				}
				var dayConfig = intervalsConfig[key];
				if (dayConfig == null) {
					dayConfig = this.generateDayConfig();
				}
				var intervalConfig = this.createIntervalConfig(item);
				dayConfig.intervals.push(intervalConfig);
				dayConfig.displayValue = this.fillDayWorkingTimeDisplayValue(dayConfig.intervals);
				intervalsConfig[key] = dayConfig;
			},

			/**
			 * Creates day interval config.
			 * @protected
			 * @param {Object} item Day interval.
			 * @return {Object} Day interval config.
			 */
			createIntervalConfig: function(item) {
				var from = item.get("From");
				var to = item.get("To");
				return {
					id: item.get("Id"),
					from: from,
					to: to
				};
			},

			/**
			 * Fills day working time display value.
			 * @protected
			 * @param {Array} intervals Day intervals.
			 * @return {String} Day working time display value.
			 */
			fillDayWorkingTimeDisplayValue: function(intervals) {
				var workingTimeDisplayValue = "";
				this.Terrasoft.each(intervals, function(item) {
					workingTimeDisplayValue += this.formWorkingTimeDisplayValue(item);
				}, this);
				return workingTimeDisplayValue;
			},

			/**
			 * Forms interval working time display value.
			 * @protected
			 * @param {Array} item Day interval.
			 * @return {String} Interval working time display value.
			 */
			formWorkingTimeDisplayValue: function(item) {
				var timeFormat = Terrasoft.Resources.CultureSettings.timeFormat;
				var from = Ext.Date.format(item.from, timeFormat);
				var to = Ext.Date.format(item.to, timeFormat);
				return from + "-" + to + ";";
			},

			/**
			 * Returns mini page schema name.
			 * @return {String} Mini page schema name.
			 * @protected
			 */
			getMiniPageSchemaName: function() {
				return "";
			},

			/**
			 * Returns working interval mini page config.
			 * @protected
			 * @param {Object} dayOfWeek
			 * @return {Object} Working interval mini page config
			 */
			getWorkingIntervalMiniPageConfig: function(dayOfWeek) {
				var dayId = this.get("ActiveRow");
				var intervalsConfig = this.get("IntervalsConfig");
				var intervals = [];
				if (!this.Ext.isEmpty(intervalsConfig)) {
					var dayIntervals = intervalsConfig[dayId];
					if (!this.Ext.isEmpty(dayIntervals)) {
						intervals = dayIntervals;
					}
				}
				if (!dayId) {
					return null;
				}
				var activeRow = this.getActiveRow();
				var valuePairs = [];
				valuePairs.push(activeRow.get("DayType"));
				valuePairs.push(this.Ext.isEmpty(intervals) ? [] : intervals);
				valuePairs.push(dayOfWeek);
				var typeColumnValue = this.getTypeColumnValue(activeRow);
				return {
					columnName: "Id",
					rowId: dayId,
					entitySchemaName: this.entitySchemaName,
					miniPageSchemaName: this.getMiniPageSchemaName(),
					moduleId: this.getMiniPageSandboxId(typeColumnValue),
					isFixed: true,
					showDelay: 0,
					operation: Terrasoft.ConfigurationEnums.CardOperation.EDIT,
					valuePairs: valuePairs
				};
			}
		});
	});


