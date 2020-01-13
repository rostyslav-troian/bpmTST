Terrasoft.configuration.Structures["TimezoneUtils"] = {innerHierarchyStack: ["TimezoneUtils"]};
define("TimezoneUtils", ["ServiceHelper", "BaseModule"], function(ServiceHelper) {
	/**
	 * @class Terrasoft.configuration.TimezoneUtils
	 */
	Ext.define("Terrasoft.configuration.TimezoneUtils", {
		alternateClassName: "Terrasoft.TimezoneUtils",
		extend: "Terrasoft.BaseModule",

		Ext: Ext,
		sandbox: null,
		Terrasoft: Terrasoft,

		/**
		 * Returns config object for the service.
		 * @param {Object} config Object configuration.
		 * @param {String} config.methodName The name of the service method.
		 * @param {Object} config.data The data of the method.
		 * @param {Function} config.callback The handler of the response.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Scope for the callback function.
		 * @return {Object} Config object for the service.
		 * @private
		 */
		getServiceConfig: function(config, callback, scope) {
			var serviceConfig = {
				serviceName: "TimezoneService",
				scope: this
			};
			serviceConfig.methodName = config.methodName;
			serviceConfig.data = config.data;
			serviceConfig.callback = function(response) {
				var result = config.callback.call(this, response);
				callback.call(scope || this, result);
			};
			return serviceConfig;
		},

		/**
		 * Called time zone service.
		 * @param {Object} serviceConfig Object configuration.
		 * @param {String} serviceConfig.methodName The name of the service method.
		 * @param {Object} serviceConfig.data The data of the method.
		 * @param {Function} serviceConfig.callback The handler of the response.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Scope for the callback function.
		 * @private
		 */
		callTimezoneService: function(serviceConfig, callback, scope) {
			var config = this.getServiceConfig(serviceConfig, callback, scope);
			ServiceHelper.callService(config);
		},

		/**
		 * Returns data response of the contact current time.
		 * @param {Object} response Data of the response.
		 * @return {Object} Contact current time.
		 * @private
		 */
		getContactCurrentTimeResposeHandler: function(response) {
			var contactTimeInfo = {};
			if (response && response.GetContactCurrentTimeResult) {
				contactTimeInfo = this.getPreparedContactTimeInfo(response.GetContactCurrentTimeResult);
			}
			return contactTimeInfo;
		},

		/**
		 * Returns data response of the adjustment rule.
		 * @param {Object} response Data of the response.
		 * @return {Object} Adjustment rule.
		 * @private
		 */
		getAdjustmentRuleResposeHandler: function(response) {
			var adjustmentRule = {};
			if (response && response.GetAdjustmentRuleResult) {
				adjustmentRule = Terrasoft.decode(response.GetAdjustmentRuleResult);
			}
			return adjustmentRule;
		},

		/**
		 * Returns prepared contact time information.
		 * @param {String} contactTimeInfo Contact time information from the response.
		 * @return {Object} Prepared contact time information.
		 * @private
		 */
		getPreparedContactTimeInfo: function(contactTimeInfo) {
			contactTimeInfo = contactTimeInfo === "" ? "{}" : contactTimeInfo;
			var result = Terrasoft.decode(contactTimeInfo);
			if (result.time) {
				result.time = Terrasoft.parseDate(result.time);
			}
			result.equals = (-1 * result.minutesOffset === new Date().getTimezoneOffset());
			return result;
		},

		/**
		 * Returns contact time information.
		 * @param {Guid} contactId Contact id.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Scope for the callback function.
		 * @return {Object} Contact time information.
		 * @public
		 */
		getContactCurrentTime: function(contactId, callback, scope) {
			var serviceConfig = {
				methodName: "GetContactCurrentTime",
				data: {contactId: contactId},
				callback: this.getContactCurrentTimeResposeHandler
			};
			this.callTimezoneService(serviceConfig, callback, scope);
		},

		/**
		 * Returns adjustment rule information.
		 * @param {String} timezoneCode Code of the time zone.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Scope for the callback function.
		 * @return {Object} Contact time information.
		 * @public
		 */
		getAdjustmentRule: function(timezoneCode, callback, scope) {
			var serviceConfig = {
				methodName: "GetAdjustmentRule",
				data: {timezoneCode: timezoneCode},
				callback: this.getAdjustmentRuleResposeHandler
			};
			this.callTimezoneService(serviceConfig, callback, scope);
		}

	});

	return Ext.create("Terrasoft.TimezoneUtils");
});


