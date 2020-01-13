Terrasoft.configuration.Structures["NotificationCountersServiceRequest"] = {innerHierarchyStack: ["NotificationCountersServiceRequest"]};
define("NotificationCountersServiceRequest", ["ext-base", "terrasoft", "ConfigurationServiceRequest"],
	function(Ext, Terrasoft) {
		/**
		 * @class Terrasoft.configuration.NotificationCountersServiceRequest
		 * Requests notification counters.
		 */
		Ext.define("Terrasoft.configuration.NotificationCountersServiceRequest", {
			extend: "Terrasoft.ConfigurationServiceRequest",
			alternateClassName: "Terrasoft.NotificationCountersServiceRequest",

			/**
			 * @inheritDoc Terrasoft.configuration.ConfigurationServiceRequest#serviceName
			 * @overridden
			 */
			serviceName: "NotificationInfoService",

			/**
			 * Gets counter value from dictionary object.
			 * @private
			 * @param {String} counterName Counter name.
			 * @param {Object} counters Counters dictionary.
			 * @return {Number} Counter value.
			 */
			_getCounterValue: function(counterName, counters) {
				var counter = Terrasoft.findWhere(counters, { Key: counterName }) || {};
				var counterValue = counter.Value || 0;
				return counterValue;
			},

			/**
			 * Gets notification counters from service.
			 * @param {Function} callback Callback function.
			 * @param {Terrasoft.BaseViewModel} scope Callback scope.
			 */
			getCounters: function(callback, scope) {
				this.contractName = "GetCounters";
				this.execute(function(response) {
					var countersInfo = {};
					if (response.success) {
						var counters = response.NotificationCounters;
						countersInfo = {
							remindingsCount: this._getCounterValue("Reminding", counters),
							visaCount: this._getCounterValue("Visa", counters),
							esnNotificationsCount: this._getCounterValue("ESNNotification", counters),
							notificationsCount: this._getCounterValue("Notification", counters),
							anniversariesCount: this._getCounterValue("Anniversary", counters),
							resetCounters: true
						};
					} else {
						this.log(response.errorInfo.message, Terrasoft.LogMessageType.ERROR);
					}
					Ext.callback(callback, scope, [countersInfo]);
				}, this);
			}
		});

		return Terrasoft.NotificationCountersServiceRequest;

	});


