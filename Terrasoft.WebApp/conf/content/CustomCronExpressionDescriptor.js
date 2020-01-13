Terrasoft.configuration.Structures["CustomCronExpressionDescriptor"] = {innerHierarchyStack: ["CustomCronExpressionDescriptor"]};
/**
 * @inheritdoc Terrasoft.CronExpressionDescriptor
 */
Ext.define("Terrasoft.manager.CustomCronExpressionDescriptor", {
	extend: "Terrasoft.manager.CronExpressionDescriptor",
	alternateClassName: "Terrasoft.CustomCronExpressionDescriptor",
	statics: {
		/**
		 * Describes given cron expression object in human readable text.
		 * @param {Terrasoft.CronExpression} cron Cron expression to describe.
		 * @param {Object} config Describe config.
		 * @param {Boolean} config.use24HourTimeFormat Enables 24 hours format description. Uses 12 hours format
		 * by default.
		 * @returns {String|null} Human readable cron description.
		 */
		describe: function(cron, config) {
			var result = null;
			if (cron.isValid()) {
				var descriptor = Ext.create("Terrasoft.CustomCronExpressionDescriptor", {
					parameters: cron.toArray(),
					use24HourTimeFormat: config && config.use24HourTimeFormat
				});
				result = descriptor.tryGetFullDescription();
			}
			return result;
		}
	},

	/**
	 * @inheritdoc Terrasoft.CronExpressionDescriptor#getTimeOfDayDescription
	 * @override
	 */
	getTimeOfDayDescription: function() {
		return "";
	}
});


