Terrasoft.configuration.Structures["GoogleIntegrationUtilitiesV2"] = {innerHierarchyStack: ["GoogleIntegrationUtilitiesV2"]};
define("GoogleIntegrationUtilitiesV2", ["GoogleIntegrationUtilitiesV2Resources", "RightUtilities",
		"ConfigurationConstants", "SocialAccountAuthUtilities", "GoogleIntegrationEnums"],
	function(resources, RightUtilities, ConfigurationConstants, AuthUtilities) {
		/**
		 * @class Terrasoft.configuration.mixins.GoogleIntegrationUtilities
		 * Mixin, which implements the functionality to work with google integration.
		 */
		Ext.define("Terrasoft.configuration.mixins.GoogleIntegrationUtilities", {
			alternateClassName: "Terrasoft.GoogleIntegrationUtilities",

			//region Properties: Protected

			/**
			 * Google contacts integration mode.
			 * @type {this.Terrasoft.GoogleIntegrationEnums.IntegrationMode}
			 */
			googleContactsIntegrationMode: null,

			/**
			 * Google calendar integration mode.
			 * @type {this.Terrasoft.GoogleIntegrationEnums.IntegrationMode}
			 */
			googleCalendarIntegrationMode: null,

			//endregion

			/**
			 * Initializes mixin.
			 * @protected
			 */
			init: function() {
				this.initGoogleContactsIntegrationMode();
				this.initGoogleSyncExists();
			},

			/**
			 * Initializes flag "GoogleSyncExists".
			 * @protected
			 */
			initGoogleSyncExists: function(callback, scope) {
				var select = this.getGoogleSocialAccountSelect();
				select.getEntityCollection(function(response) {
					if (response.success) {
						this.set("GoogleSyncExists", !response.collection.isEmpty());
						if (Ext.isFunction(callback)) {
							callback.call(scope || this);
						}
					}
				}, this);
			},

			/**
			 * Validates google contact integration rights.
			 * @protected
			 */
			validateGoogleContactsIntegrationRights: function() {
				var canExport = this.getCanExportGoogleContacts();
				var canImport = this.getCanImportGoogleContacts();
				if (canExport && !canImport) {
					this.showInformationDialog(resources.localizableStrings.ImportRightsNotSet);
				} else if (canImport && !canExport) {
					this.showInformationDialog(resources.localizableStrings.ExportRightsNotSet);
				}
			},

			/**
			 * Checks current user can use google contacts synchronization.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			checkCanUseGoogleContactsSync: function(callback, scope) {
				if (this.googleContactsIntegrationMode ===
					this.Terrasoft.GoogleIntegrationEnums.IntegrationMode.NOTHING) {
					this.showInformationDialog(resources.localizableStrings.GoogleSyncRightsNotSet);
				} else {
					callback.call(scope);
				}
			},

			/**
			 * Returns google settings page sandbox id.
			 * @protected
			 * @return {String} Sandbox id.
			 */
			getGoogleSettingsPageSandboxId: function() {
				return this.sandbox.id + "_GoogleIntegrationSettingsPageV2";
			},

			/**
			 * Action "Set up Google synchronization".
			 * @protected
			 */
			openGoogleSettingsPage: function() {
				this.checkCanUseGoogleContactsSync(function() {
					this.openCardInChain({
						schemaName: "GoogleIntegrationSettingsPageV2",
						entitySchemaName: this.entitySchemaName,
						moduleId: this.getGoogleSettingsPageSandboxId()
					});
				}, this);
			},

			/**
			 * Integration process execution callback.
			 * @protected
			 * @param {Object} response Server response.
			 */
			googleIntegrationExecutionCallback: function(response) {
				if (response && response.IntegrationResponse) {
					var result = response.IntegrationResponse;
					var localizableStrings = resources.localizableStrings;
					var isShowDialogs = (!this.get("IsExchangeContactSyncExist") && !this.get("IsExchangeSyncExist"));
					this.hideBodyMask();
					if (result.success) {
						if (isShowDialogs) {
							this.showInformationDialog(localizableStrings.SyncSuccessfullyStartedMessage);
						}
					} else {
						switch (result.errorInfo.errorCode) {
							case this.Terrasoft.GoogleIntegrationEnums.IntegrationResponseCode.AUTHENTICATION_ERROR:
								this.showGoogleAuthenticationWindow(function() {
									this.showInformationDialog(localizableStrings.SettingSavedNeedRestart);
								}, this);
								break;
							case this.Terrasoft.GoogleIntegrationEnums.IntegrationResponseCode.CONDITION_ERROR:
								if (isShowDialogs) {
									this.showOpenGoogleSettingsPageMessage(result.errorInfo.message);
								}
								break;
							default:
								this.logRequestError(result.errorInfo);
								if (isShowDialogs) {
									this.showInformationDialog(localizableStrings.InternalErrorResultMessage);
								}
								break;
						}
					}
				}
			},

			/**
			 * Logs error message.
			 * @private
			 * @param {Object} errorInfo Error information.
			 * @param {Terrasoft.LogMessageType} [type=Terrasoft.LogMessageType.ERROR] Log message type.
			 */
			logRequestError: function(errorInfo, type) {
				var message = this.getRequestErrorMessage(errorInfo);
				this.log(message, type || this.Terrasoft.LogMessageType.ERROR);
			},

			/**
			 * Gets error message.
			 * @private
			 * @param {Object} errorInfo Error information.
			 * @return Error message.
			 */
			getRequestErrorMessage: function(errorInfo) {
				var template = "{0}: {1}\n{2}";
				return this.Ext.String.format(template, errorInfo.errorCode, errorInfo.message, errorInfo.stackTrace);
			},

			/**
			 * Gets social account entity schema query.
			 * @return {this.Terrasoft.EntitySchemaQuery} Social account entity schema query.
			 */
			getGoogleSocialAccountSelect: function() {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "SocialAccount"
				});
				esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
				esq.addColumn("Login");
				esq.filters.add("UserFilter", esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"User", this.Terrasoft.SysValue.CURRENT_USER.value));
				esq.filters.add("TypeFilter", esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"Type", ConfigurationConstants.CommunicationTypes.Google));
				return esq;
			},

			/**
			 * Initializes google contacts integration mode due to user rights.
			 * @private
			 */
			initGoogleContactsIntegrationMode: function(callback, scope) {
				var operations = ["CanExportContactsToGoogle", "CanImportContactsFromGoogle"];
				RightUtilities.checkCanExecuteOperations(operations, function(result) {
					if (result.CanExportContactsToGoogle && result.CanImportContactsFromGoogle) {
						this.googleContactsIntegrationMode = this.Terrasoft.GoogleIntegrationEnums.IntegrationMode.ALL;
					} else if (!result.CanExportContactsToGoogle && result.CanImportContactsFromGoogle) {
						this.googleContactsIntegrationMode =
							this.Terrasoft.GoogleIntegrationEnums.IntegrationMode.IMPORT;
					} else if (result.CanExportContactsToGoogle && !result.CanImportContactsFromGoogle) {
						this.googleContactsIntegrationMode =
							this.Terrasoft.GoogleIntegrationEnums.IntegrationMode.EXPORT;
					} else {
						this.googleContactsIntegrationMode =
							this.Terrasoft.GoogleIntegrationEnums.IntegrationMode.NOTHING;
					}
					if (Ext.isFunction(callback)) {
						callback.call(scope || this);
					}
				}, this);
			},

			/**
			 * Returns can import google contacts.
			 * @private
			 * @return {Boolean} Import availability.
			 */
			getCanImportGoogleContacts: function() {
				return this.googleContactsIntegrationMode ===
					this.Terrasoft.GoogleIntegrationEnums.IntegrationMode.IMPORT;
			},

			/**
			 * Returns can export google contacts.
			 * @private
			 * @return {Boolean} Export availability.
			 */
			getCanExportGoogleContacts: function() {
				return this.googleContactsIntegrationMode ===
					this.Terrasoft.GoogleIntegrationEnums.IntegrationMode.EXPORT;
			},

			/**
			 * Shows dialog for setting up Google sync settings if they are not set.
			 * @param {String} message Message to show.
			 */
			showOpenGoogleSettingsPageMessage: function(message) {
				this.showConfirmationDialog(message, function(result) {
					if (result === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
						this.openGoogleSettingsPage();
					}
				}, ["yes", "no"]);
			},

			/**
			 * Initializes Google synchronization process before start sync.
			 */
			startGoogleSynchronization: function() {
				var config = {
					serviceName: "GoogleIntegrationService",
					methodName: "StartGoogleIntegration",
					data: {
						entitySchemaName: this.entitySchemaName
					}
				};
				this.callService(config, this.googleIntegrationExecutionCallback, this);
			},

			/**
			 * Open google authentication window.
			 * @param {Function} callback (optional) Callback function.
			 * @param {Object} scope Callback function context.
			 * @public
			 */
			showGoogleAuthenticationWindow: function(callback, scope) {
				var socialNetwork = "Google";
				var consumerKeySetting = "GoogleConsumerKey";
				var consumerSecretSetting = "GoogleConsumerSecret";
				var useSharedApplicationSetting = "UseGoogleSharedApplication";
				var arrayToQuery = [consumerKeySetting, consumerSecretSetting, useSharedApplicationSetting];
				this.Terrasoft.SysSettings.querySysSettings(arrayToQuery, function(values) {
					var socialAccountOptions = {
						consumerKey: values[consumerKeySetting],
						consumerSecret: values[consumerSecretSetting],
						useSharedApplication: values[useSharedApplicationSetting],
						socialNetwork: socialNetwork,
						callAfter: function(data, login, socialNetworkId, socialAccountId) {
							this.updatePreviousGoogleSocialAccounts(socialAccountId, callback, scope);
						}.bind(this)
					};
					AuthUtilities.checkSettingsAndOpenWindow(socialAccountOptions);
				}, this);
			},

			/**
			 * Update data for previous google account.
			 * @param {String} socialAccountId New google account Id.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 * @private
			 */
			updatePreviousGoogleSocialAccounts: function(socialAccountId, callback, scope) {
				var config = {
					serviceName: "GoogleIntegrationService",
					methodName: "UpdateGoogleSocialAccount",
					data: {
						socialAccountId: socialAccountId
					}
				};
				this.callService(config, callback, scope);
			}

		});
		return Terrasoft.GoogleIntegrationUtilities;
	});


