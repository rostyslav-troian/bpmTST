Terrasoft.configuration.Structures["ActivityDatesMixin"] = {innerHierarchyStack: ["ActivityDatesMixin"]};
define("ActivityDatesMixin", [],
	function() {
		/**
		 * @class Terrasoft.configuration.mixins.ActivityDatesMixin
		 * Activity dates mixin.
		 */
		Ext.define("Terrasoft.configuration.mixins.ActivityDatesMixin", {
			alternateClassName: "Terrasoft.ActivityDatesMixin",

			/**
			 * The date time columns config.
			 * @protected
			 * @type {Object}
			 */
			dateTimeColumnsConfig: {
				startDate: "",
				dueDate: ""
			},

			/**
			 * Returns true if need use default date time columns config.
			 * @protected
			 * @type {Boolean}
			 */
			isUseDefaultDateTimeColumnsConfig: true,

			/**
			 * Returns default value of the date time columns config.
			 * @return {Object} Default value of the date time columns config.
			 */
			getDefaultDateTimeColumnsConfig: function() {
				var config = this.dateTimeColumnsConfig;
				config.startDate = "StartDate";
				config.dueDate = "DueDate";
				return config;
			},

			/**
			 * Returns DueDate default values list.
			 * @protected
			 * @return {Terrasoft.Collection} DueDate default values list.
			 */
			getDueDateDefaultList: function() {
				return this.get("TimeEditDefaultList");
			},

			/**
			 * Sets DueDate list values.
			 * @protected
			 * @param {Terrasoft.Collection} data DueDate default values collection.
			 * @return {Terrasoft.Collection} DueDate default values list copy.
			 */
			setDueDateDefaultList: function(data) {
				var defaultList = this.Terrasoft.deepClone(data.getItems());
				this.set("TimeEditDefaultList", defaultList);
				return defaultList;
			},

			/**
			 * Fills DueDate enum list.
			 * @protected
			 * @param {String} filterText Field inputed text.
			 * @param {Terrasoft.Collection} dataList DueDate default values collection.
			 */
			loadDueDateList: function(filterText, dataList) {
				var ext = this.Ext;
				var dueDateList = this.getDueDateDefaultList();
				if (!dueDateList) {
					dueDateList = this.setDueDateDefaultList(dataList);
				}
				var colunmsConfig = this.dateTimeColumnsConfig;
				if (this.isUseDefaultDateTimeColumnsConfig) {
					colunmsConfig = this.getDefaultDateTimeColumnsConfig();
				}
				var startDateColumnName = colunmsConfig.startDate;
				var dueDateColumnName = colunmsConfig.dueDate;
				if (ext.isEmpty(startDateColumnName) ||	ext.isEmpty(dueDateColumnName)) {
					return;
				}
				var startDate = this.Terrasoft.deepClone(this.get(startDateColumnName));
				var dueDate = this.Terrasoft.deepClone(this.get(dueDateColumnName));
				if (!ext.isDate(startDate) || !ext.isDate(dueDate)) {
					return;
				}
				if (startDate.getDate() === dueDate.getDate()) {
					var startTime = startDate.getTime();
					var timeFormat = this.Terrasoft.Resources.CultureSettings.timeFormat;
					dueDateList = dueDateList.filter(function(item) {
						var dueDate = ext.Date.parse(item.displayValue, timeFormat, true);
						var hours = dueDate.getHours();
						var minutes = dueDate.getMinutes();
						return (startTime <= startDate.setHours(hours, minutes));
					});
				}
				this.reloadDueDateList(dueDateList, dataList);
			},

			/**
			 * Returns default interval value in 180000 ms.
			 * @protected
			 * @return {Number} Default interval value in 180000 ms.
			 */
			getDefaultTimeInterval: function() {
				return this.Terrasoft.TimeScale.THIRTY_MINUTES * this.Terrasoft.DateRate.MILLISECONDS_IN_MINUTE;
			},

			/**
			 * Sets default activity date.
			 * @protected
			 */
			setDefaultActivityDateInterval: function() {
				var startDate = this.get("StartDate");
				var dueDate = this.get("DueDate");
				if (!this.isValidDates([startDate])) {
					return;
				}
				var millisecondsInMinute = this.Terrasoft.core.enums.DateRate.MILLISECONDS_IN_MINUTE;
				var defaultTimeInterval = this.getDefaultTimeInterval();
				if (!dueDate || this.Ext.Date.getElapsed(startDate, dueDate) < 4 * millisecondsInMinute) {
					var defaultDueDate = this.Ext.Date.add(startDate, this.Ext.Date.MILLI, defaultTimeInterval);
					this.set("DueDate", defaultDueDate);
				} else {
					this.setDifferStartDueDate(startDate, dueDate);
				}
			},

			/**
			 * Sets date interval.
			 * @param {Date} startDate Start date.
			 * @param {Date} dueDate Due Date.
			 */
			setDifferStartDueDate: function(startDate, dueDate) {
				if (!this.isValidDates([startDate, dueDate])) {
					return;
				}
				var difference = {};
				if (startDate.getTime() < dueDate.getTime()) {
					difference = dueDate.getTime() - startDate.getTime();
				} else {
					difference = this.getDefaultTimeInterval();
				}
				this.set("DifferStartDueDate", difference);
			},

			/**
			 * Start date on change event handler.
			 * @protected
			 */
			onStartDateChanged: function() {
				var startDate = this.get("StartDate");
				if (!this.Ext.isDate(startDate)) {
					return;
				}
				var differStartDueDate = this.get("DifferStartDueDate");
				if (!differStartDueDate) {
					differStartDueDate = this.getDefaultTimeInterval();
				}
				this.set("DueDate", new Date(startDate.getTime() + differStartDueDate));
			},

			/**
			 * Due date on change event handler.
			 * @protected
			 */
			onDueDateChanged: function() {
				var startDate = this.Terrasoft.deepClone(this.get("StartDate"));
				var dueDate = this.Terrasoft.deepClone(this.get("DueDate"));
				if (!this.Ext.isDate(startDate) || !this.Ext.isDate(dueDate)) {
					return;
				}
				this.setDifferStartDueDate(startDate, dueDate);
			},

			/**
			 * Copies currentList parameter values into DueDate values list.
			 * @param {Array} currentList DueDate data array.
			 * @param {Terrasoft.Collection} dataList DueDate current values collection.
			 * @protected
			 */
			reloadDueDateList: function(currentList, dataList) {
				var newList = {};
				currentList.forEach(function(element) {
					newList[element.value] = element;
				});
				dataList.clear();
				dataList.loadAll(newList);
			},

			/**
			 * Checks all the dates on instanceof the Date class.
			 * @private
			 * @param {Mixed[]} dates Array of validating dates.
			 * @return {Boolean} True if all dates is instanceof Date.
			 */
			isValidDates: function(dates) {
				if (Ext.isEmpty(dates)) {
					return false;
				}
				var hasInvalid = dates.some(function(date) {
					return !Ext.isDate(date);
				}, this);
				return !hasInvalid;
			},
			
			/**
			 * RemindToAuthor change event handler.
			 * @protected
			 */
			onRemindToAuthorChanged: function() {
				const remindToOwner = this.get("RemindToAuthor");
				if (remindToOwner) {
					let dueDate = this.Terrasoft.deepClone(this.get("DueDate"));
					if (!this.Ext.isDate(dueDate)) {
						return;
					}
					dueDate = this.Terrasoft.clearSeconds(dueDate);
					this.set("RemindToAuthorDate", dueDate);
					this.set("RemindToAuthorDateEnabled", true);
				} else {
					this.set("RemindToAuthorDate", null);
					this.set("RemindToAuthorDateEnabled", false);
				}
			},
			
			/**
			 * RemindToOwner change event handler.
			 * @protected
			 */
			onRemindToOwnerChanged: function() {
				const remindToOwner = this.get("RemindToOwner");
				if (remindToOwner) {
					let startDate = this.Terrasoft.deepClone(this.get("StartDate"));
					if (!Ext.isDate(startDate)) {
						return;
					}
					startDate = this.Terrasoft.clearSeconds(startDate);
					this.set("RemindToOwnerDate", startDate);
					this.set("RemindToOwnerDateEnabled", true);
				} else {
					this.set("RemindToOwnerDate", null);
					this.set("RemindToOwnerDateEnabled", false);
				}
			},
		});
	});


