Terrasoft.configuration.Structures["ActivityTimezoneMixin"] = {innerHierarchyStack: ["ActivityTimezoneMixin"]};
define("ActivityTimezoneMixin", ["TimezoneUtils", "ActivityTimezoneMixinResources", "ModalBox"],
		function(TimezoneUtils, resources) {
			/**
			 * @class Terrasoft.configuration.mixins.ActivityTimezoneMixin
			 * Activity time zone mixin.
			 */
			Ext.define("Terrasoft.configuration.mixins.ActivityTimezoneMixin", {
				alternateClassName: "Terrasoft.ActivityTimezoneMixin",

				//region Fileds: Private

				/**
				 * The temporary data.
				 * @private
				 * @type {Object}
				 */
				temporaryData: {
					startDate: null,
					dueDate: null,
					timezone: null
				},

				/**
				 * Returns true if setted offset dates.
				 * @private
				 * @type {Boolean}
				 */
				isSetsOffsetDates: false,

				//endregion

				//region Methods: Private

				/**
				 * Changes visible of the container handler.
				 * @private
				 * @param {Object} model Model of the item.
				 * @param {Object} value Value of the item.
				 */
				onChangeContainerVisible: function(model, value) {
					this.isUseDefaultDateTimeColumnsConfig = !value;
					if (!this.isUseDefaultDateTimeColumnsConfig) {
						this.dateTimeColumnsConfig = {
							startDate: "OffsetStartDate",
							dueDate: "OffsetDueDate"
						};
					}
				},

				/**
				 * Loads current user time zone info.
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function context.
				 */
				_loadCurrentUserTimezone: function(callback, scope) {
					var code = Terrasoft.SysValue.CURRENT_USER_TIMEZONE_CODE;
					this._loadTimezoneAdjustmentRule(code, function(adjustmentRuleConfig) {
						if (this.isEmpty(adjustmentRuleConfig)) {
							return this.Ext.callback(callback, scope || this);
						}
						this.set("CurrentUserTimezone", {
							"Offset": adjustmentRuleConfig.timezoneOffsetInMinutes,
							"DaylightDelta": adjustmentRuleConfig.daylightDeltaInMinutes,
							"TransitionStart": Terrasoft.parseDate(adjustmentRuleConfig.transitionStart),
							"TransitionEnd": Terrasoft.parseDate(adjustmentRuleConfig.transitionEnd)
						});
						this.Ext.callback(callback, scope || this);
					}, this);
				},

				/**
				 * Load adjustment rule of the current destination time zone.
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Scope for the callback function.
				 */
				loadTimezoneAdjustmentRule: function(callback, scope) {
					var timezone = this.get("TimeZone");
					this._loadTimezoneAdjustmentRule(timezone && timezone.Code, function(adjustmentRuleConfig) {
						this.setAdjustmentRule(adjustmentRuleConfig, callback, scope);
					}, this);
				},

				/**
				 * Loads time zone info by code.
				 * @private
				 * @param {String} timezoneCode Time zone code.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function context.
				 */
				_loadTimezoneAdjustmentRule: function(timezoneCode, callback, scope) {
					if (this.Ext.isEmpty(timezoneCode)) {
						return this.Ext.callback(callback, scope || this);
					}
					TimezoneUtils.getAdjustmentRule(timezoneCode, function(adjustmentRuleConfig) {
						this.Ext.callback(callback, scope || this, [adjustmentRuleConfig]);
					}, this);
				},

				/**
				 * Sets adjustment rule.
				 * @private
				 * @param {Object} adjustmentRuleConfig Object of the adjustment rule.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Scope for the callback function.
				 */
				setAdjustmentRule: function(adjustmentRuleConfig, callback, scope) {
					if (this.Ext.isEmpty(adjustmentRuleConfig)) {
						return this.Ext.callback(callback, scope || this);
					}
					this.set("Offset", adjustmentRuleConfig.timezoneOffsetInMinutes);
					this.set("DaylightDelta", adjustmentRuleConfig.daylightDeltaInMinutes);
					this.set("TransitionStart", Terrasoft.parseDate(adjustmentRuleConfig.transitionStart));
					this.set("TransitionEnd", Terrasoft.parseDate(adjustmentRuleConfig.transitionEnd));
					this.Ext.callback(callback, scope || this);
				},

				/**
				 * Returns current destination time zone object.
				 * @private
				 * @param {int} offset Timzone UTC offset in minutes.
				 * @return {Object} Current destination time zone object.
				 */
				_getDestinationTimezone: function(offset) {
					return {
						"Offset": offset || this.get("Offset"),
						"DaylightDelta": this.get("DaylightDelta"),
						"TransitionStart": this.get("TransitionStart"),
						"TransitionEnd": this.get("TransitionEnd")
					}
				},

				/**
				 * Sets offset dates.
				 * @private
				 */
				setOffsetDates: function() {
					this.setOffsetDate("StartDate");
					this.setOffsetDate("DueDate");
				},

				/**
				 * Sets offset date by primary property name.
				 * @private
				 * @param {String} name Property name.
				 */
				setOffsetDate: function(name) {
					var offset = this.get("Offset");
					var offsetDateName = "Offset" + name;
					var timeZone = this.get("TimeZone");
					if (!this.Ext.isNumber(offset) || !timeZone) {
						this.set(offsetDateName, null);
						return;
					}
					var date = this.getDeepCloneValue(name);
					var utc = this.getUtcDate(date);
					var offsetDate = this.getDateByOffset(utc, offset);
					if (!this.Ext.Date.isEqual(this.get(offsetDateName), offsetDate)) {
						this.set(offsetDateName, offsetDate);
					}
				},

				/**
				 * Sets date with a difference of time zone.
				 * @private
				 * @param {String} name Property name.
				 */
				setDateWithDiff: function(name) {
					var offset = this.get("Offset");
					var offsetDateName = "Offset" + name;
					var date = this.getDeepCloneValue(name);
					var offsetDate = this.getDeepCloneValue(offsetDateName);
					if (!this.isSetsOffsetDates || !this.Ext.isNumber(offset) || !date || !offsetDate) {
						return;
					}
					var toUtc = true;
					var utcDate = this.getUtcDate(date);
					var utcOffsetDate = this.getDateByOffset(offsetDate, offset, toUtc);
					var timeDiff = utcDate.getTime() - utcOffsetDate.getTime();
					date.setTime(date.getTime() - timeDiff);
					if (!this.Ext.Date.isEqual(this.get(name), date)) {
						this.set(name, date);
					}
				},

				/**
				 * Returns deep clone of the property value.
				 * @private
				 * @param {String} name Property name.
				 * @return {Object} Deep clone of the ptoperty value.
				 */
				getDeepCloneValue: function(name) {
					return this.Terrasoft.deepClone(this.get(name));
				},

				/**
				 * Sets offset to date.
				 * @private
				 * @param {Date} date Date.
				 * @param {Number} offset Offset.
				 * @return {Date} Return date with offset.
				 */
				setOffset: function(date, offset) {
					if (!this.Ext.isNumber(offset) || !this.Ext.isDate(date)) {
						return null;
					}
					return new Date(date.getTime() + (offset * 60000));
				},

				/**
				 * Calculates date to UTC offset in minutes in passed timezone.
				 * @private
				 * @param {Object} timezone Passed date time zone.
				 * @param {Date} date Date to calculate UTC offset.
				 * @return {Integer} Date to UTC offset in minutes.
				 */
				_getToUtcOffset: function(timezone, date) {
					var daylightDelta = timezone.DaylightDelta;
					var offset = timezone.Offset;
					if (this._isDateInDSTPeriod(timezone, date)) {
						offset += daylightDelta;
					}
					offset = offset * -1;
					return offset;
				},

				/**
				 * Checks is date in DST period in passed timezone.
				 * @private
				 * @param {Object} timezone Passed date time zone.
				 * @param {Date} date Date to calculate UTC offset.
				 * @return {Boolean} True when date in DST period in passed timezone.
				 * Otherwise returns false.
				 */
				_isDateInDSTPeriod: function(timezone, date) {
					var daylightDelta = timezone.DaylightDelta;
					if(this.Ext.isEmpty(daylightDelta) || daylightDelta === 0) {
						return false;
					}
					var transitionStart = timezone.TransitionStart;
					var transitionEnd = timezone.TransitionEnd;
					return transitionStart < transitionEnd 
						? (date > transitionStart && date < transitionEnd)
						: !(date > transitionEnd && date < transitionStart);
				},

				/**
				 * Returns date with offset.
				 * @private
				 * @param {Date} date Date.
				 * @param {Number} offset Offset time zone.
				 * @param {Boolean} toUtc Convert date to utc.
				 * @return {Date} Date whit offset.
				 */
				getDateByOffset: function(date, offset, toUtc) {
					var destinationTimeZone = this._getDestinationTimezone(offset);
					var toUtcOffset = this._getToUtcOffset(destinationTimeZone, date);
					if (!toUtc) {
						toUtcOffset = toUtcOffset * -1;
					}
					return this.setOffset(date, toUtcOffset);
				},

				/**
				 * Hides time zone container.
				 * @private
				 */
				hideTimezoneContainer: function() {
					this.set("TimezoneContainerVisible", false);
				},

				//endregion

				//region Methods: Protected

				/**
				 * @inheritDoc Terrasoft.BaseSchemaModule#init
				 * @protected
				 * @overridden
				 */
				init: function(callback, scope) {
					this.initTimezoneEvent();
					Terrasoft.chain(
						this._loadCurrentUserTimezone,
						this.loadTimezoneAdjustmentRule,
						function() {
							this.setOffsetDates();
							this.isSetsOffsetDates = true;
							this.Ext.callback(callback, scope || this);
						}, this);
				},

				/**
				 * Initialize event.
				 * @protected
				 */
				initTimezoneEvent: function() {
					this.on("change:TimezoneContainerVisible", this.onChangeContainerVisible, this);
				},

				/**
				 * Handles search button click event.
				 * @protected
				 */
				onTimezoneChanged: function() {
					this.loadTimezoneAdjustmentRule(this.setOffsetDates, this);
				},

				/**
				 * Handles start date offset change event.
				 * @protected
				 */
				onStartDateOffsetChanged: function() {
					this.setDateWithDiff("StartDate");
				},

				/**
				 * Handles due date offset change event.
				 * @protected
				 */
				onDueDateOffsetChanged: function() {
					this.setDateWithDiff("DueDate");
				},

				/**
				 * Creates TimeZone entity schema query.
				 * @protected
				 * @return {Terrasoft.EntitySchemaQuery}
				 */
				createTimeZoneQuery: function() {
					var esq = this.Ext.create(Terrasoft.EntitySchemaQuery, {rootSchemaName: "TimeZone"});
					this.initTimeZoneQueryColumns(esq);
					return esq;
				},

				/**
				 * Initializes time zone query columns.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
				 */
				initTimeZoneQueryColumns: function(esq) {
					esq.addColumn("Id");
					esq.addColumn("Name");
					esq.addColumn("Code");
				},

				/**
				 * Prepares time zone item of the list.
				 * @protected
				 * @virtual
				 * @param {Object} item Item of the time zone list.
				 * @return {Object} Item of the list.
				 */
				prepareTimeZoneListItem: function(item) {
					return {
						value: item.get("Id"),
						displayValue: item.get("Name"),
						Code: item.get("Code")
					};
				},

				//endregion

				//region Methods: Public

				/**
				 * Returns utc of date in current user time zone.
				 * @param {Date} date Date.
				 * @return {Date} Utc of date.
				 */
				getUtcDate: function(date) {
					if (!this.Ext.isDate(date)) {
						return null;
					}
					var offset = this._getToUtcOffset(this.get("CurrentUserTimezone"), date);
					var utc = this.setOffset(date, offset);
					return utc;
				},

				/**
				 * Handles time zone button click event.
				 */
				onShowTimezone: function() {
					this.set("TimezoneContainerVisible", true);
					this.temporaryData.startDate = this.getDeepCloneValue("StartDate");
					this.temporaryData.dueDate = this.getDeepCloneValue("DueDate");
					this.temporaryData.timeZone = this.getDeepCloneValue("TimeZone");
				},

				/**
				 * Handles save button click event.
				 */
				onTimezoneSave: function() {
					this.hideTimezoneContainer();
				},

				/**
				 * Handles cancel button click event.
				 */
				onTimezoneCancel: function() {
					var temporaryData = this.temporaryData;
					this.set("StartDate", temporaryData.startDate);
					this.set("DueDate", temporaryData.dueDate);
					this.set("TimeZone", temporaryData.timeZone);
					this.hideTimezoneContainer();
				},

				/**
				 * Validates offset due date column value.
				 * @param {Object} column Offset due date column value.
				 */
				validateOffsetDueDate: function(column) {
					var invalidMessage = "";
					if (!this.Ext.isEmpty(column) &&
							this.get("OffsetStartDate") > column &&
							this.get("TimezoneContainerVisible")) {
						invalidMessage = resources.localizableStrings.DueDateLowerStartDate;
					}
					return {
						fullInvalidMessage: invalidMessage,
						invalidMessage: invalidMessage
					};
				},

				/**
				 * Returns true if timezone selected.
				 */
				isTimezoneSelected: function() {
					var timezone = this.get("TimeZone");
					return !this.Ext.isEmpty(timezone);
				},

				/**
				 * Event handler for prepare list event of time zone lookup.
				 */
				onPrepareTimeZoneList: function() {
					var esq = this.createTimeZoneQuery();
					esq.getEntityCollection(function(response) {
						if (!(response && response.success && response.collection)) {
							return;
						}
						var list = this.get("TimeZoneList");
						var columnList = {};
						var collection = response.collection.getItems();
						this.Terrasoft.each(collection, function(item) {
							columnList[item.get("Id")] = this.prepareTimeZoneListItem(item);
						}, this);
						list.clear();
						list.loadAll(columnList);
					}, this);
				}

				//endregion

			});

		});


