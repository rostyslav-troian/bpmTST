Terrasoft.configuration.Structures["BpmonlineCloudServiceApi"] = {innerHierarchyStack: ["BpmonlineCloudServiceApi"]};
define("BpmonlineCloudServiceApi", ["ServiceHelper", "BpmonlineCloudServiceApiResources",
		"BpmonlineCloudIntegrationEnums"],
	function(ServiceHelper, resources) {
		Ext.define("Terrasoft.configuration.BpmonlineCloudServiceApi", {
			alternateClassName: "Terrasoft.BpmonlineCloudServiceApi",
			singleton: true,

			/**
			 * Calls the "UpdateUserSettings" method of the BpmonlineCloudService.
			 * @public
			 * @param {Object} data Parameters.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			updateUserSettings: function(data, callback, scope) {
				this.callService("UpdateUserSettings", data, callback, scope);
			},

			/**
			 * Calls the "AccountInfo" method of the BpmonlineCloudService.
			 * @public
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			accountInfo: function(callback, scope) {
				this.callService("AccountInfo", null, callback, scope);
			},

			/**
			 * Calls the "SenderDomainsInfo" method of the BpmonlineCloudService.
			 * @public
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			senderDomainsInfo: function(callback, scope) {
				this.callService("SenderDomainsInfo", null, callback, scope);
			},

			/**
			 * Calls the "AddSenderDomain" method of the BpmonlineCloudService.
			 * @public
			 * @param {Object} data Parameters.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			addSenderDomain: function(data, callback, scope) {
				this.callService("AddSenderDomain", data, callback, scope);
			},

			/**
			 * Validates status of the sender domain.
			 * @public
			 * @param {String} domain.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			validateSenderDomain: function(domain, callback, scope) {
				this.senderDomainsInfo(function(response) {
					var domainsInfo = response.DomainsInfo || {};
					var domains = domainsInfo.Domains || [];
					var domainInfo = Ext.Array.findBy(domains, function(item) {
						return item.Domain === domain;
					});
					var domainStatus = Terrasoft.BpmonlineCloudIntegration.enums.SenderDomainStatus;
					var isValid = (!Ext.isEmpty(domainInfo) && domainInfo.Status === domainStatus.ACTIVE);
					Ext.callback(callback, scope, [isValid]);
				}, this);
			},

			/**
			 * Calls the "GetCheckedEmails" method of the BpmonlineCloudService.
			 * @public
			 * @param {Array} emails Emails to check.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			getCheckedEmails: function(emails, callback, scope) {
				this.callService("GetCheckedEmails", emails, callback, scope);
			},

			/**
			 * Calls the "ValidateSender" method of the BpmonlineCloudService.
			 * @public
			 * @param {Array} emails Emails to check.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			validateSender: function(emails, callback, scope) {
				this.callService("ValidateSender", emails, callback, scope);
			},

			/**
			 * Calls the web method of the BpmonlineCloudService.
			 * @private
			 * @param {String} methodName Name of the web method.
			 * @param {Object} data Parameters.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			callService: function(methodName, data, callback, scope) {
				var config = {
					serviceName: "BpmonlineCloudService",
					methodName: methodName,
					data: data,
					callback: callback,
					scope: scope
				};
				ServiceHelper.callService(config);
			},

			/**
			 * Return message by code.
			 * @public
			 * @param {Number} code Api response code.
			 * @returns {String} Message.
			 */
			getMessageByResponseCode: function(code) {
				var responseCode = Terrasoft.BpmonlineCloudIntegration.enums.ResponseCode;
				var lczStrings = resources.localizableStrings;
				switch (code) {
					case responseCode.SUCCESS:
						return lczStrings.Success;
					case responseCode.INVALID_API_KEY:
						return lczStrings.WrongApiKey;
					case responseCode.UNREACHABLE_RESOURCE:
						return lczStrings.UnreachableResource;
					case responseCode.INVALID_AUTH_KEY:
						return lczStrings.WrongAuthKey;
					case responseCode.SERVICE_UNAVAILABLE:
						return lczStrings.ServiceIsUnavailable;
					case responseCode.GETTING_DOMAINS_ERROR:
						return lczStrings.GettingDomainsError;
					case responseCode.ADDING_DOMAIN_ERROR:
						return lczStrings.AddingDomainError;
					default:
						return Ext.String.format(lczStrings.UnhandledErrorMessage, code);
				}
			}
		});
	});


