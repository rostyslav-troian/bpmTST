Terrasoft.configuration.Structures["CronExpressionPageMixin"] = {innerHierarchyStack: ["CronExpressionPageMixin"]};
define("CronExpressionPageMixin", [], function() {

	/**
	 * @class Terrasoft.configuration.mixins.CronExpressionPageMixin
	 * Profile mixin.
	 */
	Ext.define("Terrasoft.configuration.mixins.CronExpressionPageMixin", {

		alternateClassName: "Terrasoft.CronExpressionPageMixin",

		/**
		 * Returns default date time value.
		 * @private
		 * @return {Date}
		 */
		_getDefaultDateTime: function() {
			return new Date(0, 0, 0, 0, 0);
		},

		/**
		 * Returns collection of lookup items.
		 * @private
		 * @param {Array} array Display value collection.
		 * @return {Terrasoft.Collection} Lookup items collection.
		 */
		_getLookupItemsCollection: function(array) {
			var result = Ext.create("Terrasoft.Collection");
			array.forEach(function(itemCaption, index) {
				var value = index + 1;
				result.add(value, {
					"value": value,
					"displayValue": itemCaption
				});
			}, this);
			return result;
		},

		/**
		 * Returns valid date time from given date time.
		 * @param {Date} dateTime time to validate.
		 * @return {Date} Valid date time.
		 */
		getValidDateTime: function(dateTime) {
			return this.getIsDateTimeValid(dateTime) ? dateTime : this._getDefaultDateTime();
		},

		/**
		 * Returns week day buttons caption according to tag.
		 * @param {Number} tag Invoker button tag.
		 * @return {String} Week day button caption.
		 */
		getWeekDayButtonCaption: function(tag) {
			var names = Terrasoft.Resources.CultureSettings.shortDayNames;
			return names[tag - 1];
		},

		/**
		 * Day of month validator.
		 * @param {String} value Day of month value.
		 * @return {Object} Validation info.
		 */
		dayOfMonthValidator: function(value) {
			var dayOfMonth = parseInt(value, 10);
			var maxDayInMonth = 31;
			var minDayInMonth = 1;
			return Terrasoft.validateNumberRange(minDayInMonth, maxDayInMonth, dayOfMonth);
		},

		/**
		 * Validates date time value.
		 * @param {Object} value Date time to validate.
		 * @return {Boolean} Validation result.
		 */
		getIsDateTimeValid: function(value) {
			return Ext.isDate(value) && !isNaN(value.getTime());
		},

		/**
		 * Prepares weekday names list.
		 * @param {Object} filter Filter object.
		 * @param {Terrasoft.Collection} list Weekday names list.
		 */
		getWeekDayNamesList: function(filter, list) {
			if (!Ext.isEmpty(list)) {
				list.reloadAll(this.getDayOfWeekCollection());
			}
		},

		/**
		 * Returns collection of weekday names abbreviations.
		 * @return {Terrasoft.Collection}
		 */
		getDayOfWeekCollection: function() {
			return this._getLookupItemsCollection(Terrasoft.Resources.CultureSettings.shortDayNames);
		}

	});
	return Terrasoft.CronExpressionPageMixin;
});


