Terrasoft.configuration.Structures["FormatUtils"] = {innerHierarchyStack: ["FormatUtils"]};
define("FormatUtils", ["ext-base", "terrasoft", "FormatUtilsResources"],
	function(Ext, Terrasoft, resources) {

		/**
		 * Returns date diff in days.
		 */
		function dateDiffDays(startDate, endDate) {
			return Terrasoft.dateDiffDays(startDate, endDate);
		}

		/**
		 * Smart format of date as word.
		 * @param {Object | Date} dateConfig Date configuration information or date value.
		 * @param {Date} dateConfig.dateValue Date value.
		 * @param {Boolean} dateConfig.hasTimezoneOffset Is true if date has timezone offset.
		 */
		function smartFormatDate(dateConfig) {
			var cultureSetting = Terrasoft.Resources.CultureSettings;
			var dateValue = Ext.isObject(dateConfig) ? dateConfig.dateValue : dateConfig;
			if (dateValue) {
				var datePart = "";
				var dateDiff = 0;
				if (dateConfig && dateConfig.hasTimezoneOffset) {
					var dateValueWithOffset = new Date();
					var timezoneOffset = dateValue.getTimezoneOffset() * Terrasoft.DateRate.MILLISECONDS_IN_MINUTE;
					dateValueWithOffset.setTime(dateValue.getTime() - timezoneOffset);
					var currentDateValueWithOffset = new Date();
					currentDateValueWithOffset.setTime(currentDateValueWithOffset.getTime() - timezoneOffset);
					dateDiff = dateDiffDays(dateValueWithOffset, currentDateValueWithOffset);
				} else {
					dateDiff = dateDiffDays(dateValue, new Date());
				}
				switch (dateDiff) {
					case -1:
						datePart = resources.localizableStrings.Tomorrow;
						break;
					case 0:
						datePart = resources.localizableStrings.Today;
						break;
					case 1:
						datePart = resources.localizableStrings.Yesterday;
						break;
					case 2:
						datePart = resources.localizableStrings.BeforeYesterday;
						break;
					default:
						datePart = Ext.Date.dateFormat(dateValue, cultureSetting.dateFormat);
						break;
				}
				var timePart = Ext.Date.dateFormat(dateValue, cultureSetting.timeFormat);
				return Ext.String.format("{0} {2} {1}", datePart, timePart, resources.localizableStrings.In);
			}
			return null;
		}

		/**
		 * Returns created on caption.
		 * @returns {String}
		 */
		function getDateCaption(prefix, day, minutes) {
			return prefix + " " + day + ":" + minutes;
		}

		return {
			dateDiffDays: dateDiffDays,
			smartFormatDate: smartFormatDate,
			getDateCaption: getDateCaption
		};
	});


