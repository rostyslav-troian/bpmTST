Terrasoft.configuration.Structures["ChartDrillDownProviderUtils"] = {innerHierarchyStack: ["ChartDrillDownProviderUtils"]};
define("ChartDrillDownProviderUtils", [], function() {
	Ext.define("Terrasoft.configuration.ChartDrillDownProviderUtils", {
		alternateClassName: "Terrasoft.ChartDrillDownProviderUtils",

		/**
		 * Returns fixed period number.
		 * @param {String} periodPart Period part name.
		 * @return {Number|null} Fixed period number.
		 */
		getFixedPeriodLimit: function(periodPart) {
			var result;
			switch (periodPart) {
				case "Month":
					result = 12;
					break;
				case "Week":
					result = 53;
					break;
				case "Day":
					result = 31;
					break;
				case "Hour":
					result = 24;
					break;
				default:
					result = null;
					break;
			}
			return result;
		},

		/**
		 * Returns period list.
		 * @param {String} periodPart Date time format values.
		 * @return {Array} Period list.
		 */
		getPeriodList: function(periodPart) {
			var periodLimit = this.getFixedPeriodLimit(periodPart);
			var list = [];
			if (periodLimit) {
				var dx = (periodPart === "Hour") ? -1 : 0;
				for (var i = 1 + dx; i <= periodLimit + dx; i++) {
					list.push(i);
				}
			}
			return list;
		},

		/**
		 * Returns timestamp value.
		 * @param {Number} timeStamp Timestamp value.
		 * @param {Array} dateTimeFormat Date time format values.
		 * @return {Number} Timestamp value.
		 */
		getNextDateStepByDateTimeFormat: function(timeStamp, dateTimeFormat) {
			var step = dateTimeFormat[0];
			var date = new Date(timeStamp);
			switch (step) {
				case "Year":
					date = Ext.Date.add(date, Ext.Date.YEAR, 1);
					break;
				case "Month":
					date = Ext.Date.add(date, Ext.Date.MONTH, 1);
					break;
				case "Week":
					date = Ext.Date.add(date, Ext.Date.DAY, 7);
					break;
				case "Day":
					date = Ext.Date.add(date, Ext.Date.DAY, 1);
					break;
				case "Hour":
					date = Ext.Date.add(date, Ext.Date.HOUR, 1);
					break;
				default:
					break;
			}
			return date.getTime();
		},

		/**
		 * Returns object with date values.
		 * @param {Number} timeStamp Timestamp value.
		 * @param {Array} dateTimeFormat Date time format values.
		 * @return {Object} Object with date values.
		 */
		getDatePartsFromDate: function(timeStamp, dateTimeFormat) {
			var date = new Date(timeStamp);
			var result = {};
			if (Terrasoft.contains(dateTimeFormat, "Year")) {
				result.Year = date.getFullYear();
			}
			if (Terrasoft.contains(dateTimeFormat, "Month")) {
				result.Month = date.getMonth() + 1;
			}
			if (Terrasoft.contains(dateTimeFormat, "Week")) {
				result.Week = Ext.Date.getWeekOfYear(date);
			}
			if (Terrasoft.contains(dateTimeFormat, "Day")) {
				result.Day = date.getDate();
			}
			if (Terrasoft.contains(dateTimeFormat, "Hour")) {
				result.Hour = date.getHours();
			}
			return result;
		}
	});
});


