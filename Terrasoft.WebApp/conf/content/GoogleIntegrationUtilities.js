Terrasoft.configuration.Structures["GoogleIntegrationUtilities"] = {innerHierarchyStack: ["GoogleIntegrationUtilities"]};
define("GoogleIntegrationUtilities", ["ConfigurationConstants", "GoogleIntegrationUtilitiesResources",
		"SocialAccountAuthUtilities"],
	function(ConfigurationConstants, resources, AuthUtilities) {

		var localizableStrings = resources.localizableStrings;

		/**
		 * Update data for previous google account.
		 * @param {String} socialAccountId New google account Id.
		 * @param {Function} callback Callback function.
		 * @private
		 */
		function updatePreviousGoogleSocialAccounts(socialAccountId, callback) {
			getPreviousSocialAccountId(socialAccountId, function(prevSocialAccountId) {
				deleteCurrentGoogleSocialAccount(socialAccountId, function() {
					updateContactAndActivityCorrespondence(socialAccountId, prevSocialAccountId, function() {
						getSocialAccountLogin(function(login) {
							addContactCommunicationForCurrentUser(login, callback);
						});
					});
				});
			});
		}

		/**
		 * Removes old google account.
		 * @param {String} newSocialAccountId New google account Id.
		 * @param {Function} callback Callback function.
		 * @private
		 */
		function deleteCurrentGoogleSocialAccount(newSocialAccountId, callback) {
			var deleteQuery = Ext.create("Terrasoft.DeleteQuery", {
				rootSchemaName: "SocialAccount"
			});
			deleteQuery.filters.add("IdFilter",
				deleteQuery.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL, "Id",
					newSocialAccountId));
			deleteQuery.filters.add("userFilter",
				deleteQuery.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,	"User",
					Terrasoft.SysValue.CURRENT_USER.value));
			deleteQuery.filters.add("TypeIdFilter",
				deleteQuery.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Type",
					ConfigurationConstants.CommunicationType.Google));
			deleteQuery.execute(function() {
				if (Ext.isFunction(callback)) {
					callback();
				}
			});
		}

		/**
		 * Updates contact and accounts correspondence entity with new google account.
		 * @param {String} socialAccountId Google account Id.
		 * @param {String} prevSocialAccountId Previous google account Id.
		 * @param {Function} callback Callback function.
		 * @private
		 */
		function updateContactAndActivityCorrespondence(socialAccountId, prevSocialAccountId, callback) {
			if (Ext.isEmpty(prevSocialAccountId)) {
				return;
			}
			updateContactCorrespondence(socialAccountId, prevSocialAccountId, function() {
				updateActivityCorrespondence(socialAccountId, prevSocialAccountId, callback);
			});
		}

		/**
		 * Updates contact correspondence entity with new google account.
		 * @param {String} socialAccountId Google account Id.
		 * @param {String} prevSocialAccountId Previous google account Id.
		 * @param {Function} callback Callback function.
		 * @private
		 */
		function updateContactCorrespondence(socialAccountId, prevSocialAccountId, callback) {
			var updateQuery = Ext.create("Terrasoft.UpdateQuery", {
				rootSchemaName: "ContactCorrespondence"
			});
			var filters = updateQuery.filters;
			var sourceAccountFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
				"SourceAccount", prevSocialAccountId);
			filters.add("IdFilter", sourceAccountFilter);
			updateQuery.setParameterValue("SourceAccount", socialAccountId, Terrasoft.DataValueType.LOOKUP);
			updateQuery.execute(function() {
				if (Ext.isFunction(callback)) {
					callback();
				}
			});
		}

		/**
		 * Updates activity correspondence entity with new google account.
		 * @param {String} socialAccountId Google account Id.
		 * @param {String} prevSocialAccountId Previous google account Id.
		 * @param {Function} callback Callback function.
		 * @private
		 */
		function updateActivityCorrespondence(socialAccountId, prevSocialAccountId, callback) {
			var updateQuery = Ext.create("Terrasoft.UpdateQuery", {
				rootSchemaName: "ActivityCorrespondence"
			});
			var filters = updateQuery.filters;
			var sourceAccountFilter = Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL,	"SourceAccount", prevSocialAccountId);
			filters.add("IdFilter", sourceAccountFilter);
			updateQuery.setParameterValue("SourceAccount", socialAccountId,	Terrasoft.DataValueType.GUID);
			updateQuery.execute(function() {
				if (Ext.isFunction(callback)) {
					callback();
				}
			});
		}

		/**
		 * Gets previous social account Id.
		 * @param {String} socialAccountId Social account Id.
		 * @param {Function} callback Callback function.
		 * @private
		 */
		function getPreviousSocialAccountId(socialAccountId, callback) {
			var selectQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "SocialAccount"
			});
			selectQuery.addColumn("Id");
			selectQuery.filters.add("NotIdFilter",
				selectQuery.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL,
				"Id", socialAccountId));
			selectQuery.filters.add("userFilter",
				selectQuery.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"User", Terrasoft.SysValue.CURRENT_USER.value));
			selectQuery.filters.add("TypeIdFilter",
				selectQuery.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Type",
					ConfigurationConstants.CommunicationType.Google));
			selectQuery.getEntityCollection(function(response) {
				var prevSocialAccountId = "";
				var entities = response.collection;
				if (entities.getCount() > 0) {
					prevSocialAccountId = entities.getByIndex(0).get("Id");
				}
				if (Ext.isFunction(callback)) {
					callback(prevSocialAccountId);
				}
			}, this);
		}

		/**
		 * Gets google account login.
		 * @param {Function} callback Callback function.
		 * @private
		 */
		function getSocialAccountLogin(callback) {
			var select = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "SocialAccount"
			});
			select.addColumn("Login");
			select.filters.add("UserIdFilter", select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
				"User", Terrasoft.SysValue.CURRENT_USER.value));
			select.filters.add("TypeIdFilter", select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
				"Type", ConfigurationConstants.CommunicationType.Google));
			select.getEntityCollection(function(response) {
				var login;
				if (response.success) {
					var entities = response.collection;
					if (entities.getCount() > 0) {
						login = entities.getByIndex(0).get("Login");
					}
				}
				if (Ext.isFunction(callback)) {
					callback(login);
				}
			});
		}

		/**
		 * Adds email communication for current user.
		 * @param {String} login Google account name.
		 * @param {Function} callback Callback function.
		 * @private
		 */
		function addContactCommunicationForCurrentUser(login, callback) {
			if (Ext.isEmpty(login)) {
				return;
			}
			var select = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "ContactCommunication"
			});
			select.addColumn("Id");
			select.filters.add("NumberFilter",
				select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Number", login));
			select.filters.add("CurrentUserFilter",
				select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Contact",
					Terrasoft.SysValue.CURRENT_USER_CONTACT.value));
			select.getEntityCollection(function(response) {
				if (response.collection.getCount() === 0) {
					var insert = Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: "ContactCommunication"
					});
					var id = Terrasoft.utils.generateGUID();
					insert.setParameterValue("Id", id, Terrasoft.DataValueType.GUID);
					insert.setParameterValue("Contact", Terrasoft.SysValue.CURRENT_USER_CONTACT.value,
						Terrasoft.DataValueType.GUID);
					insert.setParameterValue("Number", login, Terrasoft.DataValueType.TEXT);
					insert.setParameterValue("CommunicationType", ConfigurationConstants.CommunicationType.Email,
						Terrasoft.DataValueType.GUID);
					insert.execute(function() {
						if (Ext.isFunction(callback)) {
							callback(login);
						}
					});
				} else {
					if (Ext.isFunction(callback)) {
						callback(login);
					}
				}
			});
		}

		/**
		 * Open google authentication window.
		 * @param {Function} callback (optional) Callback function.
		 * @public
		 */
		function showGoogleAuthenticationWindow(callback) {
			var socialNetwork = "Google";
			var consumerKeySetting = "GoogleConsumerKey";
			var consumerSecretSetting = "GoogleConsumerSecret";
			var useSharedApplicationSetting = "UseGoogleSharedApplication";
			var arrayToQuery = [consumerKeySetting, consumerSecretSetting, useSharedApplicationSetting];
			Terrasoft.SysSettings.querySysSettings(arrayToQuery, function(values) {
				var socialAccountOptions = {
					consumerKey: values[consumerKeySetting],
					consumerSecret: values[consumerSecretSetting],
					useSharedApplication: values[useSharedApplicationSetting],
					socialNetwork: socialNetwork,
					callAfter: function(data, login, socialNetworkId, socialAccountId) {
						updatePreviousGoogleSocialAccounts(socialAccountId, callback);
					}.bind(this)
				};
				AuthUtilities.checkSettingsAndOpenWindow(socialAccountOptions);
			}, this);
		}

		return {
			showGoogleAuthenticationWindow: function(callback) {
				return showGoogleAuthenticationWindow(callback);
			},
			localizableStrings: localizableStrings
		};
	});


