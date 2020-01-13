Terrasoft.configuration.Structures["CredentialsSyncSettingsMixin"] = {innerHierarchyStack: ["CredentialsSyncSettingsMixin"]};
define("CredentialsSyncSettingsMixin", ["ModalBox", "CredentialsSyncSettingsMixinResources"],
	function(ModalBox, resources) {

		/**
		 * @class Terrasoft.configuration.mixins.CredentialsSyncSettingsMixin
		 * The mixin to work with synchronization credentials settings page.
		 */
		Ext.define("Terrasoft.configuration.mixins.CredentialsSyncSettingsMixin", {
			alternateClassName: "Terrasoft.CredentialsSyncSettingsMixin",

			//region Methods: Private

			/**
			 * Returns decoded json value from OAuthAuthenticate cookie.
			 * @private
			 * @return {Object|null} Decoded json value from OAuthAuthenticate cookie.
			 */
			_getOAuthCookie: function() {
				var cookie = this.Ext.util.Cookies.get("OAuthAuthenticate");
				if (cookie) {
					return this.Terrasoft.decode(cookie);
				}
				return null;
			},

			/**
			 * Removes OAuthAuthenticate cookie.
			 * @private
			 */
			_clearOAuthCookie: function() {
				this.Ext.util.Cookies.clear("OAuthAuthenticate");
			},

			/**
			 * Loads CredentialsSyncSettingsEdit module to modalbox.
			 * @protected
			 * @param {Array} defaultValues CredentialsSyncSettingsEdit module default model values.
			 */
			_loadCredentialsModule: function(defaultValues) {
				var modalBoxSize = {
					minHeight: "1",
					minWidth: "1",
					maxHeight: "100",
					maxWidth: "100"
				};
				var modalBoxContainer = ModalBox.show(modalBoxSize);
				this.sandbox.loadModule("CredentialsSyncSettingsEdit", {
					renderTo: modalBoxContainer,
					instanceConfig: {
						schemaName: "BaseSyncSettingsEdit",
						isSchemaConfigInitialized: true,
						useHistoryState: false,
						defaultValues: defaultValues
					}
				});
			},

			//endregion

			//region Methods: Protected

			/**
			 * Creates default values for CredentialsSyncSettingsEdit module after success AOuth authorization flow.
			 * @protected
			 * @param {Object} values OAuth authorization flow result values.
			 * @return {Array} Default values for CredentialsSyncSettingsEdit module.
			 */
			getOAuthDefaultValues: function(values) {
				var defaultValues = [{
						name: "ShowCreateSyncJob",
						value: true
					}, {
						name: "SenderEmailAddress",
						value: values.SenderEmailAddress
					}, {
						name: "MailBoxServerId",
						value: values.MailBoxServerId
					}, {
						name: "MailboxSyncSettingsId",
						value: values.MailboxSyncSettingsId
					}, {
						name: "MailboxSyncInterval",
						value: values.MailboxSyncInterval
					}, {
						name: "AutomaticallyAddNewEmails",
						value: values.AutomaticallyAddNewEmails
					}, {
						name: "AllowEmailDownloading",
						value: values.AllowEmailDownloading
					}
				];
				return defaultValues;
			},

			//endregion

			//region Methods: Public

			/**
			 * Open credentials synchronization settings modal box.
			 * @param {Object} mailbox Mailbox configuration object.
			 * @param {String} mailbox.id Mailbox identifier.
			 * @param {String} mailbox.senderEmailAddress Mailbox sender email address.
			 * @param {String} mailbox.mailServerId Mailbox mail server identifier.
			 * @param {String} mailbox.mailServerName Mailbox mail server name.
			 * @param {String} mailbox.userName Mailbox user name.
			 * @param {Boolean} mailbox.useLogin Mailbox use login sign.
			 * @param {Boolean} mailbox.useEmailAddressAsLogin Mailbox use email address as login sign.
			 * @param {Boolean} mailbox.useUserNameAsLogin Mailbox use user name as login sign.
			 * @param {Boolean} mailbox.sendEmailsViaThisAccount Mailbox send emails via this account sign.
			 * @param {Boolean} [mailbox.enableMailSynhronization] Mailbox option subscription. True by default.
			 */
			openCredentialsSyncSettingsEdit: function(mailbox) {
				var defaultValues = [
					{
						name: "IsEnterEmailPanelVisible",
						value: false
					},
					{
						name: "IsServerListVisible",
						value: false
					},
					{
						name: "IsServerCredentialsVisible",
						value: true
					},
					{
						name: "SenderEmailAddress",
						value: mailbox.senderEmailAddress
					},
					{
						name: "AutomaticallyAddNewEmails",
						value: mailbox.automaticallyAddNewEmails
					},
					{
						name: "UserName",
						value: mailbox.userName
					},
					{
						name: "ServerName",
						value: mailbox.mailServerName
					},
					{
						name: "MailboxSyncSettingsId",
						value: mailbox.id
					},
					{
						name: "MailBoxServerId",
						value: mailbox.mailServerId
					},
					{
						name: "IsBackToServerListButtonVisible",
						value: false
					},
					{
						name: "UseLogin",
						value: mailbox.useLogin
					},
					{
						name: "UseEmailAddressAsLogin",
						value: mailbox.useEmailAddressAsLogin
					},
					{
						name: "UseUserNameAsLogin",
						value: mailbox.useUserNameAsLogin
					},
					{
						name: "SendEmailsViaThisAccount",
						value: mailbox.sendEmailsViaThisAccount
					},
					{
						name: "EnableMailSynhronization",
						value: this.isEmpty(mailbox.enableMailSynhronization) ? true : mailbox.enableMailSynhronization
					}
				];
				this._loadCredentialsModule(defaultValues);
			},

			/**
			 * Returns user error message for caught error.
			 * @param {Object} values Cought OAuth error description.
			 * @param {String} values.message Cought OAuth exception message.
			 * @param {String} values.errorType Cought OAuth exception type name.
			 * @param {String} values.exception Full cought OAuth exception text.
			 * @return {String} User error message for caught error.
			 */
			getOAuthErrorMessage: function(values) {
				var searchString = (values && values.message) ? values.message.toLowerCase() : "";
				if (this.Terrasoft.includes(searchString, "forbid") ||
						this.Terrasoft.includes(searchString, "bad request")) {
					return this.getLocalizableStringValue("ForbiddenError");
				}
				if (this.Terrasoft.includes(searchString, "already exists")) {
					return this.getLocalizableStringValue("AlreadyExistsError");
				}
				return this.getLocalizableStringValue("GeneralError");
			},

			/**
			 * Checks if OAuth authorization flow finished and starts required actions if any.
			 */
			tryProcessSettingsAddAction: function() {
				var cookie = this._getOAuthCookie();
				if (cookie) {
					var oauthFlowResult = cookie.values;
					if (cookie.success) {
						this.onSuccessOAuthFlow(oauthFlowResult);
					} else {
						this.onOAuthFlowError(oauthFlowResult);
					}
					this._clearOAuthCookie();
				}
			},

			/**
			 * Success OAuth authorization flow action handler.
			 * @param {Object} values OAuth authorization flow result values.
			 */
			onSuccessOAuthFlow: function(values) {
				var defaultValues = this.getOAuthDefaultValues(values);
				this._loadCredentialsModule(defaultValues);
			},

			/**
			 * Failed OAuth authorization flow action handler.
			 * @param {Object} values OAuth authorization flow result values.
			 * @param {String} values.message Cought OAuth exception message.
			 * @param {String} values.errorType Cought OAuth exception type name.
			 * @param {String} values.exception Full cought OAuth exception text.
			 */
			onOAuthFlowError: function(values) {
				var userErrorMessage = this.getOAuthErrorMessage(values);
				this.showInformationDialog(userErrorMessage);
				this.log(values.exception, this.Terrasoft.LogMessageType.ERROR);
			},

			/**
			 * Gets localizable string value by name.
			 * @param {String} name Localizable string name.
			 * @return {String} Localizable string value.
			 */
			getLocalizableStringValue: function(name) {
				return resources.localizableStrings[name];
			},

			//endregion

		});
		return Terrasoft.CredentialsSyncSettingsMixin;
	}
);


