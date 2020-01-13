Terrasoft.configuration.Structures["CurrencyRateServiceRequest"] = {innerHierarchyStack: ["CurrencyRateServiceRequest"]};
define("CurrencyRateServiceRequest", ["ext-base", "terrasoft", "ConfigurationServiceRequest"],
	function(Ext, Terrasoft) {
		/**
		 * @class Terrasoft.configuration.CurrencyRateServiceRequest
		 * Class used to interact with currency rate web service.
		 */
		Ext.define("Terrasoft.configuration.CurrencyRateServiceRequest", {
			extend: "Terrasoft.ConfigurationServiceRequest",
			alternateClassName: "Terrasoft.CurrencyRateServiceRequest",

			/**
			 * Currency Id.
			 * @type {String}
			 */
			currencyId: null,

			/**
			 * @inheritdoc Terrasoft.configuration.ConfigurationServiceRequest#serviceName
			 * @overridden
			 */
			serviceName: "CurrencyRateService",

			/**
			 * @inheritdoc Terrasoft.core.BaseRequest#getSerializableObject
			 * @overridden
			 */
			getSerializableObject: function(serializableObject) {
				this.callParent(arguments);
				serializableObject.currencyId = this.currencyId;
			},

			/**
			 * Gets actual currency rates from service.
			 * @param {Function} callback Callback
			 * @param {Terrasoft.BaseViewModel} scope Callback scope.
			 */
			getActualCurrencyRates: function(callback, scope) {
				this.contractName = "GetActualCurrencyRates";
				this.execute(function(response) {
					response = response || {};
					var result = this.currencyId ? response[0] : response;
					callback.call(scope, result);
				}, this);
			}
		});

		return Terrasoft.CurrencyRateServiceRequest;

	});


