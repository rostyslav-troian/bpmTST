Terrasoft.configuration.Structures["BulkEmailSenderValidator"] = {innerHierarchyStack: ["BulkEmailSenderValidator"]};
/**
 * Class to validate bulk email sender.
 */
define("BulkEmailSenderValidator", ["BpmonlineCloudServiceApi", "BpmonlineCloudIntegrationEnums"],
	function() {
		/**
		 * @class Terrasoft.configuration.BulkEmailSenderValidator
		 */
		Ext.define("Terrasoft.configuration.BulkEmailSenderValidator", {
			alternateClassName: "Terrasoft.BulkEmailSenderValidator",

			_getInactiveDomains: function(allDomains, senderDomains) {
				var result = [];
				Terrasoft.each(senderDomains, function(domain) {
					var domainInfo = Ext.Array.findBy(allDomains, function(item) {
						return item.Domain === domain;
					});
					var domainStatus = Terrasoft.BpmonlineCloudIntegration.enums.SenderDomainStatus;
					if ((Ext.isEmpty(domainInfo) || domainInfo.Status !== domainStatus.ACTIVE)){
						result.push(domain);
					}
				}, this);
				return result;
			},

			/**
			 * Validates domains whether its in active status.
			 * @param {Object} validationContract Validation contract with domains to validate as { SenderDomains: String[] }.
			 * @param {Function} callback Callback function
			 * @param {Object} scope Callback scope receives validation result - { InactiveDomains: String[] }.
			 */
			validateDomains: function(validationContract, callback, scope) {
				Terrasoft.BpmonlineCloudServiceApi.senderDomainsInfo(function(response) {
					var domainsInfo = response.DomainsInfo || {};
					var allDomains = domainsInfo.Domains || [];
					var inactiveDomains = this._getInactiveDomains(allDomains, validationContract.SenderDomains);
					var result = {
						InactiveDomains: inactiveDomains
					};
					callback.call(scope, result);
				}, this);
			}
		});

		return Ext.create("Terrasoft.configuration.BulkEmailSenderValidator");
	});

