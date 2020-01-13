Terrasoft.configuration.Structures["SocialAccountAuthUtilities"] = {innerHierarchyStack: ["SocialAccountAuthUtilities"]};
// jscs:disable
/* jshint ignore:start */
function returnAccessTokens(accessToken, accessSecretToken, socialId, userId) {
	var SocialAccountAuthUtilities = require("SocialAccountAuthUtilities");
	SocialAccountAuthUtilities.createSocialAccount(accessToken, accessSecretToken, socialId, userId);
}

function returnAuthErrorMessage(message) {
	var SocialAccountAuthUtilities = require("SocialAccountAuthUtilities");
	if (message == null || message === "") {
		message = SocialAccountAuthUtilities.localizableStrings.SocialNetworkAuthError;
	}
	Terrasoft.showInformation(Ext.String.htmlDecode(message), function() {}, this);
}
// jscs:enable
/* jshint ignore:end */
define("SocialAccountAuthUtilities", ["SocialAccountAuthUtilitiesResources", "ConfigurationConstants"],
	function(resources, ConfigurationConstants) {

		var socialNetworkName = "";
		var consumerKey = "";
		var afterAuthFunction;
		var localizableStrings = resources.localizableStrings;

		function getKeysSysSettingsValues(itemValues, socialNetwork) {
			consumerKey = itemValues[socialNetwork + "ConsumerKey"];
			var consumerSecret = itemValues[socialNetwork + "ConsumerSecret"];
			if (!Ext.isEmpty(consumerKey) && !Ext.isEmpty(consumerSecret)) {
				gotoOldOAuthAuthenticationUrl(socialNetwork);
			} else {
				showFailedConnectionError(socialNetwork);
			}
		}

		/**
		 * Checks application settings and opens old OAuth page.
		 * @private
		 * @param {Object} socialAccountOptions Social account options.
		 */
		function checkSettingsAndOpenWindow(socialAccountOptions) {
			var consumerKey = socialAccountOptions.consumerKey;
			var consumerSecret = socialAccountOptions.consumerSecret;
			var useSharedApplication = socialAccountOptions.useSharedApplication;
			var socialNetwork = socialAccountOptions.socialNetwork;
			var sandbox = socialAccountOptions.sandbox;
			var callAfter = socialAccountOptions.callAfter;
			if (useSharedApplication && socialNetwork === "Google") {
				checkSharedSettingsAndOpenWindow(socialNetwork, sandbox, callAfter);
				return true;
			} else if (consumerKey !== "" && consumerSecret !== "") {
				checkSysSettingsAndOpenWindow(socialNetwork, sandbox, callAfter);
				return true;
			}
			return false;
		}

		/**
		 * Checks application system settings and opens old OAuth page.
		 * @private
		 * @param {String} socialNetwork Social network name.
		 * @param {Object} sandbox Sandbox.
		 * @param {Function} callAfter Callback function.
		 */
		function checkSysSettingsAndOpenWindow(socialNetwork, sandbox, callAfter) {
			if (callAfter) {
				afterAuthFunction = callAfter;
			}
			socialNetworkName = socialNetwork;
			var settingsProvider = Terrasoft.SysSettings;
			var arrayToQuery = [socialNetwork + "ConsumerKey", socialNetwork + "ConsumerSecret"];
			var funcCallBack = function(itemValues) {
				getKeysSysSettingsValues(itemValues, socialNetwork, sandbox);
			};
			settingsProvider.querySysSettings(arrayToQuery, funcCallBack);
		}

		/**
		 * Checks shared application settings and opens old OAuth page.
		 * @private
		 * @param {String} socialNetwork Social network name.
		 * @param {Object} sandbox Sandbox.
		 * @param {Function} callAfter Callback function.
		 */
		function checkSharedSettingsAndOpenWindow(socialNetwork, sandbox, callAfter) {
			if (callAfter) {
				afterAuthFunction = callAfter;
			}
			socialNetworkName = socialNetwork;
			var schemaName = socialNetwork + "ClientConnector";
			this.Terrasoft.require([schemaName], function() {
				var connectorClassName = "Terrasoft." + schemaName;
				var socialId = ConfigurationConstants.CommunicationTypes[socialNetwork];
				var userId = this.Terrasoft.SysValue.CURRENT_USER.value;
				var connector = this.Ext.create(connectorClassName, {
					type: socialId,
					user: userId
				});
				connector.doRequest(function(response) {
					if (response.success && response.consumerInfo) {
						var responseInfo = response.consumerInfo;
						var consumerInfo = {};
						consumerInfo[socialNetwork + "ConsumerKey"] = responseInfo.Key;
						consumerInfo[socialNetwork + "ConsumerSecret"] = responseInfo.Secret;
						getKeysSysSettingsValues(consumerInfo, socialNetwork, sandbox);
					} else {
						showFailedConnectionError(socialNetwork);
					}
				}.bind(this));
			}, this);
		}

		/**
		 * Shows unsuccessful connection error.
		 * @private
		 * @param {String} socialNetwork Social network name.
		 */
		function showFailedConnectionError(socialNetwork) {
			Terrasoft.showInformation(resources.localizableStrings.QueryAdministrator +
			socialNetwork, function() {}, this);
		}

		function gotoOldOAuthAuthenticationUrl(socialNetworkName, callAfter) {
			if (callAfter) {
				afterAuthFunction = callAfter;
			}
			var data = {
				socialNetworkName: socialNetworkName
			};
			var requestUrl = Terrasoft.workspaceBaseUrl +
				"/rest/SocialNetworksUtilitiesService/GetOldOAuthAuthenticationUrl";
			Terrasoft.AjaxProvider.request({
				url: requestUrl,
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				method: "POST",
				jsonData: data,
				success: function(response, opts) {
					var url = Terrasoft.decode(response.responseText);
					url += "&socialNetwork=" + opts.jsonData.socialNetworkName;
					window.open(url);
				},
				scope: this
			});
		}

		function createSocialAccount(accessToken, accessSecretToken, socialId, userId) {
			var data = {
				socialNetworkName: socialNetworkName,
				socialId: socialId,
				accessToken: accessToken,
				accessSecretToken: accessSecretToken,
				userId: userId
			};
			var requestUrl = Terrasoft.workspaceBaseUrl + "/rest/SocialNetworksUtilitiesService/GetSocialNetworkLogin";
			Terrasoft.AjaxProvider.request({
				url: requestUrl,
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				method: "POST",
				jsonData: data,
				success: function(response, opts) {
					var login = Terrasoft.decode(response.responseText);
					setSocialNetworkIdAndLogin(opts.jsonData, login, socialNetworkName);
				},
				failure: Terrasoft.emptyFn,
				scope: this
			});
		}

		function insertSocialAccount(data, login, socialNetworkId, isPublic, id, callback, scope) {
			var insert = Ext.create("Terrasoft.InsertQuery", {
				rootSchemaName: "SocialAccount"
			});
			insert.setParameterValue("Id", id, Terrasoft.DataValueType.GUID);
			insert.setParameterValue("User", data.userId, Terrasoft.DataValueType.GUID);
			insert.setParameterValue("Login", login, Terrasoft.DataValueType.TEXT);
			insert.setParameterValue("AccessToken", data.accessToken, Terrasoft.DataValueType.TEXT);
			insert.setParameterValue("AccessSecretToken", data.accessSecretToken, Terrasoft.DataValueType.TEXT);
			insert.setParameterValue("SocialId", data.socialId, Terrasoft.DataValueType.TEXT);
			insert.setParameterValue("Type", socialNetworkId, Terrasoft.DataValueType.GUID);
			insert.setParameterValue("ConsumerKey", consumerKey, Terrasoft.DataValueType.TEXT);
			insert.setParameterValue("Public", isPublic, Terrasoft.DataValueType.BOOLEAN);
			insert.execute(function(response) {
				if (!response.success) {
					return;
				}
				if (callback) {
					callback.call(scope || this);
				}
			}, this);
		}

		function getSocialNetworkIdBySocialNetworkName(socialNetworkName) {
			var socialNetworkId;
			switch (socialNetworkName.toLowerCase()) {
				case "facebook":
					socialNetworkId = ConfigurationConstants.CommunicationTypes.Facebook;
					break;
				case "twitter":
					socialNetworkId = ConfigurationConstants.CommunicationTypes.Twitter;
					break;
				default:
					socialNetworkId = ConfigurationConstants.CommunicationTypes.Google;
					break;
			}
			return socialNetworkId;
		}

		function setSocialNetworkIdAndLogin(data, login, socialNetworkName) {
			var socialNetworkId = getSocialNetworkIdBySocialNetworkName(socialNetworkName);
			var socialAccountId = Terrasoft.utils.generateGUID();
			insertSocialAccount(data, login, socialNetworkId, false, socialAccountId, function() {
				if (afterAuthFunction) {
					afterAuthFunction.call(this, data, login, socialNetworkId, socialAccountId);
				}
				deletExpiredSocialAccounts();
			}, this);
		}

		function deletExpiredSocialAccounts() {
			var deleteQuery = Ext.create("Terrasoft.DeleteQuery", {
				rootSchemaName: "SocialAccount"
			});
			deleteQuery.filters.add("UserIdFilter", deleteQuery.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, "User", Terrasoft.SysValue.CURRENT_USER.value));
			deleteQuery.filters.add("IsExpiredFilter", deleteQuery.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, "IsExpired", true));
			deleteQuery.execute(function() {}, this);
		}

		function renewConsumerKey(consumerkey) {
			consumerKey = consumerkey;
		}

		return {
			checkSettingsAndOpenWindow: function(socialAccountOptions) {
				return checkSettingsAndOpenWindow(socialAccountOptions);
			},
			checkSysSettingsAndOpenWindow: function(socialNetwork, sandbox, afterAuthFunction) {
				return checkSysSettingsAndOpenWindow(socialNetwork, sandbox, afterAuthFunction);
			},
			gotoOldOAuthAuthenticationUrl: function(socialNetworkName, callback) {
				return gotoOldOAuthAuthenticationUrl(socialNetworkName, callback);
			},
			createSocialAccount: function(accessToken, accessSecretToken, socialId, userId) {
				return createSocialAccount(accessToken, accessSecretToken, socialId, userId);
			},
			afterAuthFunction: afterAuthFunction,
			localizableStrings: localizableStrings,
			renewConsumerKey: function(consumerKey) {
				return renewConsumerKey(consumerKey);
			}
		};
	});


