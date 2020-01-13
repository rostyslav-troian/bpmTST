Terrasoft.configuration.Structures["BaseSyncSettingsEdit"] = {innerHierarchyStack: ["BaseSyncSettingsEditUIv2", "BaseSyncSettingsEdit"]};
define('BaseSyncSettingsEditUIv2Structure', ['BaseSyncSettingsEditUIv2Resources'], function(resources) {return {schemaUId:'0513fbe7-77bb-4531-8d76-e550d21317d3',schemaCaption: "BaseSyncSettingsEdit", parentSchemaName: "", schemaName:'BaseSyncSettingsEditUIv2',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseSyncSettingsEditStructure', ['BaseSyncSettingsEditResources'], function(resources) {return {schemaUId:'9d4ad9ea-6590-4072-8b19-5257ab867c93',schemaCaption: "BaseSyncSettingsEdit", parentSchemaName: "BaseSyncSettingsEditUIv2", schemaName:'BaseSyncSettingsEdit',parentSchemaUId:'0513fbe7-77bb-4531-8d76-e550d21317d3',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseSyncSettingsEditUIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseSyncSettingsEditUIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseSyncSettingsEditUIv2", ["ModalBox", "ConfigurationConstants", "ExchangeNUIConstants", "RightUtilities",
		"MailServerViewModel", "OAuthAuthenticationMixin"],
	function(ModalBox, ConfigurationConstants, ExchangeNUIConstants, RightUtilities) {
		return {
			messages: {
				/**
				 * Notifes that new email sync settings has been added.
				 * @message EmailboxSyncSettingsInserted
				 */
				"EmailboxSyncSettingsInserted": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message ReloadSettings
				 * Reloads settings.
				 */
				"ReloadSettings": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message AddMailBoxEvent
				 * Reloads mailbox list.
				 */
				"AddMailBoxEvent": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message PushHistoryState
				 * Post changes in the chain of states.
				 */
				"PushHistoryState": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {
				/**
				 * Servers collection.
				 * @type {Terrasoft.BaseViewModelCollection}
				 */
				"ServerListCollection": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Default visibility for server list container.
				 */
				"IsServerListVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},
				/**
				 * Existing mail synchronization for current user.
				 */
				"IsMailSyncExists": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},
				/**
				 * Mailbox synchronization interval.
				 */
				"MailboxSyncInterval": {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					value: 1
				},
				/**
				 * Default visibility for credentials container.
				 */
				"IsServerCredentialsVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},
				/**
				 * Is login input focused flag.
				 */
				"IsLoginEditFocused": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},
				/**
				 * Sender email.
				 */
				"SenderEmailAddress": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					isRequired: true
				},
				/**
				 * User login.
				 */
				"UserName": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					dependencies: [
						{
							columns: ["SenderEmailAddress"],
							methodName: "setUserLogin"
						}
					]
				},
				/**
				 * User password.
				 */
				"UserPassword": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					isRequired: true
				},
				/**
				 * Server name label value.
				 */
				"ServerName": {
					dataValueType: this.Terrasoft.DataValueType.TEXT
				},
				/**
				 * Identifier of mailbox synchronization settings.
				 */
				"MailboxSyncSettingsId": {
					dataValueType: this.Terrasoft.DataValueType.GUID
				},
				/**
				 * Selected server for new settings creation.
				 * @type {Terrasoft.BaseViewModel}
				 */
				"SelectedServer": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
				},
				/**
				 * Visibility for "Back to server List" button.
				 */
				"IsBackToServerListButtonVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				},
				/**
				 * Visibility for credentials login input.
				 */
				"UseLogin": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				},
				/**
				 * Default start panel visibility.
				 */
				"IsEnterEmailPanelVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				},
				/**
				 * Server domain collection. Used for automatic mail server detection.
				 * @type {Terrasoft.BaseViewModelCollection}
				 */
				"DomainCollection": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * When this flag set to true, new synchronization settings flow will start from scheduler job creating
				 * step. Server select and user credential edit steps will be skipped. Note that SenderEmailAddress,
				 * MailBoxServerId, MailboxSyncSettingsId, MailboxSyncInterval, AutomaticallyAddNewEmails properties
				 * are required for this state.
				 */
				"ShowCreateSyncJob": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},
				/**
				 * Selected mail server unique identifier.
				 */
				"MailBoxServerId": {
					dataValueType: Terrasoft.DataValueType.GUID
				},
				/**
				 * Selected mail server UseUserNameAsLogin column value.
				 */
				"UseUserNameAsLogin": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN
				},
				/**
				 * Selected mail server UseEmailAddressAsLogin column value.
				 */
				"UseEmailAddressAsLogin": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN
				},
				/**
				 * Selected mail server AllowEmailDownloading column value.
				 */
				"AllowEmailDownloading": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				},
				/**
				 * Can manage mail server list flag.
				 * @type {Boolean}
				 */
				"CanManageMailServers": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				}
			},
			mixins: {
				/**
				 * @class OAuthAuthenticationMixin The mixin to work with OAuth authentication.
				 */
				OAuthAuthenticationMixin: "Terrasoft.OAuthAuthenticationMixin"
			},
			methods: {

				//region Methods: Private

				/**
				 * Updates mailbox synchronization settings.
				 * @private
				 */
				updateMailboxSyncSettings: function() {
					this.sandbox.publish("ReloadSettings", {
						recordId: this.get("MailboxSyncSettingsId")
					});
				},

				/**
				 * Save button handler.
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function context.
				 */
				onSave: function(callback, scope) {
					this.showBodyMask({
						selector: ".credantials-modal-box"
					});
					this.setUserLogin();
					Terrasoft.chain(
						this.asyncValidate,
						this.checkContactEmail,
						this.save,
						this.createOrDeleteSyncJob,
						function() {
							if (callback) {
								callback.call(scope || this);
							}
						}, this);
				},

				/**
				 * Executes insert or update queries.
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function context.
				 */
				save: function(callback, scope) {
					var itemId = this.get("MailboxSyncSettingsId");
					var query;
					var requestCallback;
					if (itemId) {
						query = this.getUpdateQuery();
						requestCallback = this.onUpdated;
					} else {
						query = this.getInsertQuery();
						requestCallback = this.onSaved;
					}
					query.execute(function(response) {
						if (response.success) {
							requestCallback.call(this, callback, scope);
						}
					}, this);
				},

				/**
				 * Loads server domains list from database.
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function scope.
				 */
				_initDomainList: function(callback, scope) {
					this.set("DomainCollection", this.Ext.create("Terrasoft.BaseViewModelCollection"));
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "MailServerDomain"
					});
					this.addDomainCacheParameters(esq);
					this.addDomainEsqColumns(esq);
					esq.getEntityCollection(function(response) {
						if (response.success) {
							var collection = response.collection;
							var domainCollection = this.get("DomainCollection");
							domainCollection.loadAll(collection);
						}
						this.Ext.callback(callback, scope);
					}, this);
				},

				/**
				 * Initializes can manage mail servers list flag.
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function scope.
				 */
				_initCanManageMailServers: function(callback, scope) {
					RightUtilities.checkCanExecuteOperation({
						"operation": "CanManageMailServers"
					}, function(permission) {
						this.$CanManageMailServers = permission;
						Ext.callback(callback, scope || this);
					}, this);
				},

				//endregion

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @protected
				 * @overridden
				 */
				init: function(callback, scope) {
					this.setWrapMarkerValue(false);
					this.callParent([function() {
						Terrasoft.chain(
							this._initCanManageMailServers,
							this.initCollection,
							this.initServersList,
							this.setMailSyncExist,
							this.setSyncInterval,
							this._initDomainList,
							function() {
								this.initEventsSubscription();
								if (callback) {
									callback.call(scope || this);
									ModalBox.updateSizeByContent();
								}
							},
							this
						);
					}, this]);
				},

				/**
				 * Sets wrap container marker value.
				 * @protected
				 * @param {Boolean} isReady Is module loaded and ready.
				 */
				setWrapMarkerValue: function(isReady) {
					var markerValue = isReady ? "AddSyncSettingsModule" : "Loading";
					this.set("WrapMarkerValue", markerValue);
				},

				/**
				 * Initializes servers list collection.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function context.
				 */
				initCollection: function(callback, scope) {
					var collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
					this.set("ServerListCollection", collection);
					if (callback) {
						callback.call(scope || this);
					}
				},

				/**
				 * Initializes servers list.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function context.
				 */
				initServersList: function(callback, scope) {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "MailServer",
						rowViewModelClassName: "Terrasoft.MailServerViewModel"
					});
					this.setServerSelectColumns(esq);
					this.setFiltersToServerListEsq(esq);
					esq.getEntityCollection(function(response) {
						if (response.success) {
							var collection = response.collection;
							collection.each(function(item) {
								item.Id = item.get("Id");
							});
							var serverListCollection = this.get("ServerListCollection");
							serverListCollection.loadAll(collection);
						}
						if (callback) {
							callback.call(scope || this);
						}
					}, this);
				},

				/**
				 * Display credential container.
				 * @protected
				 * @virtual
				 */
				showServerCredentials: function() {
					this.set("IsEnterEmailPanelVisible", false);
					this.set("IsServerListVisible", false);
					this.set("IsServerCredentialsVisible", true);
				},

				/**
				 * Display server list container.
				 * @protected
				 * @virtual
				 */
				showServerList: function() {
					this.set("IsEnterEmailPanelVisible", false);
					this.set("IsServerListVisible", true);
					this.set("IsServerCredentialsVisible", false);
					ModalBox.updateSizeByContent();
				},

				/**
				 * Calls window.open function with parameters.
				 * @protected
				 * @param {String} url Url to open.
				 * @param {String} target Target to open url.
				 * @param {String} parameters Open parameters.
				 */
				openWindow: function(url, target, parameters) {
					window.open(url, target, parameters);
				},

				/**
				 * Async validate mail settings.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback execution scope.
				 */
				asyncValidate: function(callback, scope) {
					if (!this.validate()) {
						this.hideBodyMask();
						return;
					}
					this.set("ValidateInfo", {
						success: true
					});
					Terrasoft.chain(
						this.checkMailAccountExist,
						function(next, success) {
							this.checkLoginPasswordCorrect(success, next);
						},
						function() {
							var validateInfo = this.get("ValidateInfo");
							if (validateInfo && validateInfo.success) {
								if (callback) {
									callback.call(scope || this);
								}
							} else {
								this.showErrorInfo();
							}
						},
						this
					);
				},

				/**
				 * Shows error information.
				 * @protected
				 */
				showErrorInfo: function() {
					this.hideBodyMask();
					var validateInfo = this.get("ValidateInfo");
					this.showInformationDialog(validateInfo.errorType);
				},

				/**
				 * Sets mailbox synchronization interval.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback execution scope.
				 */
				setSyncInterval: function(callback, scope) {
					this.Terrasoft.SysSettings.querySysSettingsItem("MailboxSyncInterval", function(value) {
							this.set("MailboxSyncInterval", value);
							this.Ext.callback(callback, scope || this);
						},
						this);
				},

				/**
				 * Sets existence email synchronization for current account.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback execution scope.
				 */
				setMailSyncExist: function(callback, scope) {
					var sysAdminUnitId = this.Terrasoft.SysValue.CURRENT_USER.value;
					var selectMailboxSyncSettings = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "MailboxSyncSettings"
					});
					selectMailboxSyncSettings.addColumn("Id");
					selectMailboxSyncSettings.filters.add(selectMailboxSyncSettings.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "SysAdminUnit", sysAdminUnitId));
					selectMailboxSyncSettings.getEntityCollection(function(response) {
						var isMailSyncExists = response.success && response.collection.getCount() > 0;
						this.set("IsMailSyncExists", isMailSyncExists);
						callback.call(scope || this);
					}, this);
				},

				/**
				 * Checks mail account exist.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback execution scope.
				 */
				checkMailAccountExist: function(callback, scope) {
					var itemId = this.get("MailboxSyncSettingsId");
					if (itemId) {
						if (callback) {
							callback.call(scope || this, true);
						}
						return;
					}
					var config = {
						serviceName: "MailboxSettingsService",
						methodName: "GetMailboxOwners",
						data: {
							senderEmailAddress: this.getSenderEmailAddress()
						}
					};
					this.callService(config, function(response) {
						let isValid = true;
						if (this.isEmpty(response)) {
							this.set("ValidateInfo", {
								success: false,
								errorType: this.get("Resources.Strings.Other")
							});
							isValid = false;
						}
						var owners =  response && response.GetMailboxOwnersResult;
						if (!this.isEmpty(owners)) {
							var messageTpl = this.get("Resources.Strings.MailboxExist");
							this.set("ValidateInfo", {
								success: false,
								errorType: this.Ext.String.format(messageTpl, owners.join(", "))
							});
							isValid = false;
						}
						Ext.callback(callback, scope || this, [isValid]);
					}, this);
				},

				/**
				 * Checks login and password correct.
				 * @protected
				 * @param {Boolean} success Previous validation result.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback execution scope.
				 */
				checkLoginPasswordCorrect: function(success, callback, scope) {
					if (!success) {
						if (callback) {
							callback.call(scope || this, success);
						}
						return;
					}
					var config = {
						serviceName: "MailboxSettingsService",
						methodName: "IsServerValid",
						data: {
							id: this.get("MailBoxServerId"),
							userName: this.get("UserName"),
							userPassword: this.get("UserPassword"),
							enableSync: true,
							sendEmail: true,
							senderEmailAddress: this.getSenderEmailAddress(),
							isAnonymousAuthentication: false
						}
					};
					this.callService(config, function(response) {
						if (response && response.IsServerValidResult) {
							var result = response.IsServerValidResult;
							var mailboxName = "";
							if (!result.IsValid) {
								this.set("ValidateInfo", {
									success: false,
									errorType: this.getLoginErrorMessage(),
									errorMessage: result.Message
								});
							} else if (this.isNotEmpty(result.Data)) {
								var json = JSON.parse(result.Data);
								mailboxName = json.MailboxName;
							}
							this.set("SenderDisplayValue", mailboxName);
						} else {
							this.set("ValidateInfo", {
								success: false,
								errorType: this.get("Resources.Strings.Other")
							});
						}
						callback.call(scope || this);
					}, this);
				},

				/**
				 * Gets login error message.
				 * @protected
				 * @return {String} Incorrect login error message.
				 */
				getLoginErrorMessage: function() {
					var resultMessage = this.get("Resources.Strings.LoginError");
					var mailBoxServerId = this.get("MailBoxServerId");
					if (mailBoxServerId === ExchangeNUIConstants.MailServer.Gmail) {
						var googleSettingsCaption = this.get("Resources.Strings.CheckGoogleSettingsMessage");
						resultMessage = this.Ext.String.format("{0} {1}", resultMessage, googleSettingsCaption);
					}
					return resultMessage;
				},

				/**
				 * Returns current sender email address.
				 * @protected
				 * @return {String} Current sender email address.
				 */
				getSenderEmailAddress: function() {
					let senderEmailAddress = this.$SenderEmailAddress;
					return this.isEmpty(senderEmailAddress)
						? senderEmailAddress
						: this.Ext.String.trim(senderEmailAddress);
				},

				/**
				 * Generates MailboxSyncSettings insert query.
				 * @protected
				 * @virtual
				 * @return {Terrasoft.InsertQuery} MailboxSyncSettings insert query.
				 */
				getMailboxInsert: function() {
					let insert = this.Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: "MailboxSyncSettings"
					});
					const id = Terrasoft.utils.generateGUID();
					const senderEmailAddress = this.getSenderEmailAddress();
					const dataValueType = Terrasoft.DataValueType;
					const textDataValue = dataValueType.TEXT;
					const guidDataValue = dataValueType.GUID;
					const booleanDataValue = dataValueType.BOOLEAN;
					this.set("MailboxSyncSettingsId", id);
					insert.setParameterValue("Id", id, guidDataValue);
					insert.setParameterValue("MailServer", this.$MailBoxServerId, guidDataValue);
					insert.setParameterValue("UserName", this.$UserName, textDataValue);
					insert.setParameterValue("UserPassword", this.$UserPassword, textDataValue);
					insert.setParameterValue("SenderEmailAddress", senderEmailAddress, textDataValue);
					insert.setParameterValue("MailboxName", senderEmailAddress, textDataValue);
					insert.setParameterValue("SenderDisplayValue", this.$SenderDisplayValue, textDataValue);
					insert.setParameterValue("AutomaticallyAddNewEmails", true, booleanDataValue);
					insert.setParameterValue("EnableMailSynhronization", this.$AllowEmailDownloading, booleanDataValue);
					insert.setParameterValue("LoadAllEmailsFromMailBox", true, booleanDataValue);
					insert.setParameterValue("SendEmailsViaThisAccount", true, booleanDataValue);
					insert.setParameterValue("LoadEmailsFromDate", this.getMailSyncPeriodDefault(), dataValueType.DATE);
					insert.setParameterValue("MailSyncPeriod", ExchangeNUIConstants.MailSyncPeriod.Week, guidDataValue);
					insert.setParameterValue("IsDefault", !this.$IsMailSyncExists, booleanDataValue);
					return insert;
				},

				/**
				 * Edits existing email account synchronization settings.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function context.
				 */
				editEmailAccount: function(callback, scope) {
					var itemId = this.get("MailboxSyncSettingsId");
					var historyState = this.sandbox.publish("GetHistoryState");
					var prevHash = historyState.hash;
					var newState = {
						recordId: itemId
					};
					var hash = "BaseSchemaModuleV2/SyncSettings";
					if (prevHash && prevHash.historyState === hash) {
						this.sandbox.publish("ReloadSettings", newState);
					} else {
						this.sandbox.publish("PushHistoryState", {
							hash: hash,
							stateObj: newState
						});
					}
					this.Ext.callback(callback, scope || this);
				},

				/**
				 * Creates auto synchronization jobs.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function context.
				 */
				createOrDeleteSyncJob: function(callback, scope) {
					if (!this.$IsBackToServerListButtonVisible) {
						return this.Ext.callback(this.updateSyncJobs, this, [callback, scope]);
					}
					if (!this.$AllowEmailDownloading || !this.$EnableMailSynhronization) {
						this.Ext.callback(callback, scope || this);
						return;
					}
					var interval = this.get("MailboxSyncInterval");
					var data = {
						create: true,
						mailboxName: this.getSenderEmailAddress(),
						serverId: this.get("MailBoxServerId"),
						interval: interval,
						senderEmailAddress: this.getSenderEmailAddress(),
						createContactJob: false,
						createActivityJob: false,
						contactActivityInterval: interval
					};
					var changeSettingsButtonCaption = this.get("Resources.Strings.ChangeSettingsButtonCaption");
					var changeSettingsButton = {
						className: "Terrasoft.Button",
						caption: changeSettingsButtonCaption,
						markerValue: changeSettingsButtonCaption,
						returnCode: "no"
					};
					const messageTpl = this.get("Resources.Strings.ChangeSettingsMessage");
					const changeSettingsMessage = this.Ext.String.format(messageTpl, this.$SenderEmailAddress);
					this.Terrasoft.utils.showConfirmation(changeSettingsMessage,
						function(returnCode) {
							if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
								this.callCreateOrDeleteSyncJob(callback, scope, data);
							} else {
								this.editEmailAccount(callback, scope);
							}
						}, ["yes", changeSettingsButton], this);
				},

				/**
				 * Calls service for create or delete synchronization job.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function context.
				 * @param {Object} data Configuration for synchronization job.
				 */
				callCreateOrDeleteSyncJob: function(callback, scope, data) {
					var automaticallyAddNewEmails = this.get("AutomaticallyAddNewEmails");
					var isAutoSynchronization = this.isEmpty(automaticallyAddNewEmails) ||
						automaticallyAddNewEmails;
					if (isAutoSynchronization) {
						this.setAutomaticallyAddNewEmails(true);
						this.callService({
							serviceName: "MailboxSettingsService",
							methodName: "CreateDeleteSyncJob",
							data: data
						}, function(response) {
							if (!this.Ext.isEmpty(response.CreateDeleteSyncJobResult)) {
								this.showInformationDialog(response.CreateDeleteSyncJobResult);
							} else {
								this.Ext.callback(callback, scope || this);
							}
						});
					} else {
						this.Ext.callback(callback, scope || this);
					}
				},

				/**
				 * Calls update synchronization jobs for current mailbox.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function context.
				 */
				updateSyncJobs: function(callback, scope) {
					this.callService({
						serviceName: "MailboxSettingsService",
						methodName: "UpdateSyncJobs",
						data: {
							"senderEmailAddress": this.$SenderEmailAddress
						}
					}, function(response) {
						if (!this.Ext.isEmpty(response.UpdateSyncJobsResult)) {
							this.showInformationDialog(response.UpdateSyncJobsResult);
						} else {
							this.Ext.callback(callback, scope || this);
						}
					});
				},

				/**
				 * Saves AutomaticallyAddNewEmails column value to current mailbox record.
				 * @protected
				 * @param {Boolean} value AutomaticallyAddNewEmails column value.
				 */
				setAutomaticallyAddNewEmails: function(value) {
					var itemId = this.get("MailboxSyncSettingsId");
					var update = this.Ext.create("Terrasoft.UpdateQuery", {
						rootSchemaName: "MailboxSyncSettings"
					});
					var filters = update.filters;
					var idFilter = update.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"Id", itemId);
					filters.add("IdFilter", idFilter);
					update.setParameterValue("AutomaticallyAddNewEmails", value,
						this.Terrasoft.DataValueType.BOOLEAN);
					update.execute(this.updateMailboxSyncSettings, this);
				},

				/**
				 * Send message to show tooltip on email communication panel for new settings.
				 * @protected
				 */
				showTooltip: function() {
					var config = {
						userEmail: this.getSenderEmailAddress(),
						mailboxSyncSettingsId: this.get("MailboxSyncSettingsId")
					};
					this.sandbox.publish("EmailboxSyncSettingsInserted", config);
				},

				/**
				 * Returns mails server domain.
				 * @protected
				 * @param {String} domain Domain name.
				 * @return {Object} Mail server lookup value.
				 */
				getServerByDomain: function(domain) {
					var domainList = this.get("DomainCollection");
					var filteredDomains = domainList.filterByFn(function(item) {
						return domain === item.get("Domain");
					}, this);
					if (!filteredDomains.isEmpty()) {
						return filteredDomains.first();
					}
					return null;
				},

				/**
				 * Returns sender email address domain.
				 * @protected
				 * @return {String} Sender email address domain.
				 */
				getEmailDomain: function() {
					var email = this.getSenderEmailAddress();
					return email.split("@")[1];
				},

				/**
				 * Adds columns to mail server domain query.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.EntitySchemaQuery} esq Mail server domain query instance.
				 */
				addDomainEsqColumns: function(esq) {
					esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
					esq.addColumn("Domain");
					esq.addColumn("MailServer");
				},

				/**
				 * Adds query cache parameters to mail server domain query.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.EntitySchemaQuery} esq Mail server domain query instance.
				 */
				addDomainCacheParameters: function(esq) {
					this.Ext.apply(esq, {
						clientESQCacheParameters: {
							cacheItemName: "MailServerDomain"
						}
					});
				},

				/**
				 * Switches window to scheduler job creaton mode.
				 * @protected
				 * @return {Boolean} True when window switched to scheduler job creaton mode, false otherwise.
				 */
				switchToNonVisualState: function() {
					var result = this.get("ShowCreateSyncJob");
					if(result) {
						this.createOrDeleteSyncJob(this.Terrasoft.emptyFn, this);
						this.onSaved();
					}
					return result;
				},


				/**
				 * Add new item on the ServerListCollection.
				 * @protected
				 * @virtual
				 * @param {Object} response from server.
				 */
				addNewMailServerToList: function(response) {
					var collection = this.get("ServerListCollection");
					var newEntity = response.entity;
					var newEntityId = newEntity.get("Id");
					collection.add(newEntityId, newEntity);
				},

				//endregion

				//region Methods: Public

				/**
				 * Processes enter key down event. Calls {@link #onSave } method.
				 */
				onKeyDown: function() {
					this.onSave();
				},

				/**
				 * Subscribes for server messages and view model events.
				 */
				initEventsSubscription: function() {
					this.Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, this.onMailServersListChanged,
							this);
					this.on("change:SenderEmailAddress", function() {
						this.setUserLogin();
					}, this);
				},

				/**
				 * Actualizes mail servers list on change.
				 * @param {Object} scope Scope.
				 * @param {Object} message Changes info.
				 */
				onMailServersListChanged: function(scope, message) {
					var collection = this.get("ServerListCollection");
					var serverInfo;
					switch (message.Header.Sender) {
						case "MailServerAdded":
						case "MailServerEdited":
							serverInfo = this.Ext.decode(message.Body);
							var serverId = serverInfo.Id;
							var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
								rootSchemaName: "MailServer",
								rowViewModelClassName: "Terrasoft.MailServerViewModel"
							});
							this.setServerSelectColumns(esq);
							esq.getEntity(serverId, function(response) {
								var existedEntity = collection.find(serverId);
								var newEntity = response.entity;
								if (this.isNotEmpty(existedEntity)) {
									this.Terrasoft.each(existedEntity.columns, function(column, columnName) {
										existedEntity.set(columnName, newEntity.get(columnName));
									});
								} else {
									this.addNewMailServerToList(response);
								}
							}, this);
							break;
						case "MailServerDeleted":
							serverInfo = this.Ext.decode(message.Body);
							var existedEntity = collection.find(serverInfo.Id);
							if (!this.Ext.isEmpty(existedEntity)) {
								collection.remove(existedEntity);
							}
							break;
						default:
							break;
					}
					ModalBox.updateSizeByContent();
				},

				/**
				 * @inheritdoc Terrasoft.configuration.BaseSchemaViewModel#onRender
				 * @overridden
				 */
				onRender: function() {
					this.callParent(arguments);
					if(this.switchToNonVisualState()) {
						return;
					}
					ModalBox.updateSizeByContent();
					this.setWrapMarkerValue(true);
				},

				/**
				 * Add filters to servers query.
				 * @virtual
				 */
				setFiltersToServerListEsq: this.Terrasoft.emptyFn,

				/**
				 * Generates view configuration of item.
				 * @param {Object} itemConfig ContainerList item config.
				 * @param {Terrasoft.BaseViewModel} item ContainerList item.
				 */
				getMailItemViewConfig: function(itemConfig, item) {
					var itemId = item.get("Id");
					var viewConfig = {
						"id": "mailServer",
						"className": "Terrasoft.Container",
						"classes": {"wrapClassName": ["server-list-item"]},
						"items": [
							{
								"className": "Terrasoft.Button",
								"imageConfig": {
									"bindTo": "getMailServerImage"
								},
								"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
								"classes": {
									"wrapperClass": ["mail-server-button"],
									"imageClass": ["mail-server-icon"]
								},
								"markerValue": "MailServerIcon"
							},
							{
								"className": "Terrasoft.Container",
								"classes": {
									"wrapClassName": ["server-list-item-container"]
								},
								"items": [{
									"id": "mail-button-item-" + itemId,
									"className": "Terrasoft.Label",
									"classes": {"labelClass": ["server-list-item-label"]},
									"caption": {"bindTo": "Name"},
									"markerValue": {"bindTo": "Name"}
								}]
							}
						]
					};
					itemConfig.config = viewConfig;
				},

				/**
				 * Display credential container and set name for server name.
				 * @param {Guid} itemId Collection item id.
				 */
				onServerListItemClick: function(itemId) {
					var serverListCollection = this.$ServerListCollection;
					var item = serverListCollection.get(itemId);
					this.$ServerName = item.$Name;
					this.$MailBoxServerId = itemId;
					this.$SelectedServer = item;
					this.$UseLogin = item.$UseLogin;
					this.$UseUserNameAsLogin = item.$UseUserNameAsLogin;
					this.$UseEmailAddressAsLogin = item.$UseEmailAddressAsLogin;
					this.$AllowEmailDownloading = item.$AllowEmailDownloading;
					this.$IsLoginEditFocused = true;
					if (item.$OAuthApplication.value !== undefined) {
						this.useOAuthAuthentication(this.$SenderEmailAddress, 
							item.get("OAuthApplication.AppClassName"), itemId);
					} else {
						this.showServerCredentials();
						ModalBox.updateSizeByContent();
					}
				},

				/**
				 * Close modal window.
				 * @virtual
				 */
				onCancel: function() {
					ModalBox.close();
				},

				/**
				 * Adds new server item to server list button handler.
				 */
				onAddMailServer: function() {
					var parameterString = ["editMode=true", "Id=e24018bf-4ef6-49ef-a331-4fdb6b742e4c"];
					var url = this.Terrasoft.workspaceBaseUrl + "/ViewPage.aspx?" + parameterString.join("&");
					var width = 600;
					var height = 400;
					var left = screen.availLeft + (screen.availWidth - width) / 2;
					var top = screen.availTop + (screen.availHeight - height) / 2;
					var windowParams = Ext.String.format("resizable,width={0},height={1},left={2},top={3}",
						width, height, left, top);
					this.openWindow(url, "_blank", windowParams);
				},

				/**
				 * Set user login if user login empty.
				 */
				setUserLogin: function() {
					var userLogin,
						userEmail = this.getSenderEmailAddress(),
						useUserNameAsLogin = this.get("UseUserNameAsLogin"),
						useLogin = this.get("UseLogin");
					if (!this.Ext.isEmpty(userEmail)) {
						if (useUserNameAsLogin) {
							var index = userEmail.indexOf("@");
							userLogin = userEmail.substring(0, index !== -1 ? index : index.length);
							this.set("UserName", userLogin);
						} else if (!useLogin) {
							this.set("UserName", userEmail);
						}
					} else {
						this.set("UserName", userEmail);
					}
				},

				/**
				 * Generates mailbox settings insert batch query.
				 * @return {Terrasoft.BatchQuery} Batch query.
				 */
				getInsertQuery: function() {
					var createSettingsBQ = this.Ext.create("Terrasoft.BatchQuery");
					var insert = this.getMailboxInsert();
					createSettingsBQ.add(insert);
					var server = this.get("SelectedServer");
					var type = server.get("Type");
					var exchangeType = ExchangeNUIConstants.MailServer.Type.Exchange;
					if (type.value === exchangeType) {
						var contactSettingsInsert = this.getContactSyncSettingsInsert();
						var activitySettingsInsert = this.getActivitySyncSettingsInsert();
						createSettingsBQ.add(contactSettingsInsert);
						createSettingsBQ.add(activitySettingsInsert);
					}
					return createSettingsBQ;
				},

				/**
				 * Generates ContactSyncSettings insert query.
				 * @virtual
				 * @return {Terrasoft.InsertQuery} ContactSyncSettings insert query.
				 */
				getContactSyncSettingsInsert: function() {
					var insert = this.Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: "ContactSyncSettings"
					});
					insert.setParameterValue("MailboxSyncSettings", this.get("MailboxSyncSettingsId"),
						Terrasoft.DataValueType.GUID);
					insert.setParameterValue("ExportContactsAll", true,
						Terrasoft.DataValueType.BOOLEAN);
					insert.setParameterValue("ImportContactsAll", true,
						Terrasoft.DataValueType.BOOLEAN);
					return insert;
				},

				/**
				 * Generates ActivitySyncSettings insert query.
				 * @virtual
				 * @return {Terrasoft.InsertQuery} ActivitySyncSettings insert query.
				 */
				getActivitySyncSettingsInsert: function() {
					var insert = this.Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: "ActivitySyncSettings"
					});
					insert.setParameterValue("MailboxSyncSettings", this.get("MailboxSyncSettingsId"),
						Terrasoft.DataValueType.GUID);
					insert.setParameterValue("ImportAppointmentsAll", true,
						Terrasoft.DataValueType.BOOLEAN);
					insert.setParameterValue("ImportTasksAll", true,
						Terrasoft.DataValueType.BOOLEAN);
					insert.setParameterValue("ExportActivitiesAll", true,
						Terrasoft.DataValueType.BOOLEAN);
					return insert;
				},

				/**
				 * Checks is contact communication with entered email exists.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function context.
				 */
				checkContactEmail: function(callback, scope) {
					var userEmailAddress = this.getSenderEmailAddress();
					if (userEmailAddress.indexOf("@") === -1) {
						callback.call(scope || this);
					} else {
						this.checkEditContactRights(function(result) {
							if (!this.Ext.isEmpty(result)) {
								callback.call(scope || this);
								return;
							}
							var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
								rootSchemaName: "ContactCommunication"
							});
							select.addColumn("Id");
							this.contactEmailFilters(select, userEmailAddress);
							select.getEntityCollection(function(response) {
								var collection = response.success ? response.collection : null;
								if (collection && collection.getCount() === 0) {
									this.addEmailToContactCommunications(callback, scope);
								} else {
									if (callback) {
										callback.call(scope || this);
									}
								}
							}, this);
						}, this);
					}
				},

				/**
				 * Adds filters for contact communication select.
				 * @param {Terrasoft.EntitySchemaQuery} select Select contact communication query.
				 * @param {String} userEmailAddress Entered email address.
				 */
				contactEmailFilters: function(select, userEmailAddress) {
					select.filters.add("CommunicationType", Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "CommunicationType",
						ConfigurationConstants.CommunicationType.Email));
					select.filters.add("Number", Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "Number", userEmailAddress));
					select.filters.add("Contact", Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "Contact",
						Terrasoft.SysValue.CURRENT_USER_CONTACT.value));
				},

				/**
				 * Checks if current user can edit contact.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function context.
				 */
				checkEditContactRights: function(callback, scope) {
					RightUtilities.checkCanEdit({
						schemaName: "Contact",
						primaryColumnValue: Terrasoft.SysValue.CURRENT_USER_CONTACT.value,
						isNew: false
					}, function(result) {
						if (callback) {
							callback.call(scope, result);
						}
					}, this);
				},

				/**
				 * Inserts contact communication.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function context.
				 */
				insertContactCommunication: function(callback, scope) {
					var insert = this.Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: "ContactCommunication"
					});
					var id = this.Terrasoft.utils.generateGUID();
					this.contactCommunicationInsertParameters(insert, id);
					insert.execute(callback, scope || this);
				},

				/**
				 * Creates contact communication.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function context.
				 */
				addEmailToContactCommunications: function(callback, scope) {
					this.insertContactCommunication(callback, scope);
				},

				/**
				 * Sets new contact communication parameters.
				 * @param {Terrasoft.InsertQuery} insert Contact communication insert query.
				 * @param {Guid} id New contact communication id.
				 */
				contactCommunicationInsertParameters: function(insert, id) {
					insert.setParameterValue("Id", id, Terrasoft.DataValueType.GUID);
					insert.setParameterValue("CommunicationType",
						ConfigurationConstants.CommunicationType.Email,
						Terrasoft.DataValueType.GUID);
					insert.setParameterValue("Contact",
						Terrasoft.SysValue.CURRENT_USER_CONTACT.value,
						Terrasoft.DataValueType.GUID);
					insert.setParameterValue("Number", this.getSenderEmailAddress(),
						Terrasoft.DataValueType.TEXT);
				},

				/**
				 * Returns MailboxSyncSettings update query.
				 * @virtual
				 * @return {Terrasoft.UpdateQuery} MailboxSyncSettings update query.
				 */
				getUpdateQuery: function() {
					const itemId = this.$MailboxSyncSettingsId;
					let update = this.Ext.create("Terrasoft.UpdateQuery", {
						rootSchemaName: "MailboxSyncSettings"
					});
					let filters = update.filters;
					let idFilter = update.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"Id", itemId);
					const senderEmailAddress = this.getSenderEmailAddress();
					const dataValueType = Terrasoft.DataValueType;
					const textDataValue = dataValueType.TEXT;
					const guidDataValue = dataValueType.GUID;
					const booleanDataValue = dataValueType.BOOLEAN;
					filters.add("IdFilter", idFilter);
					update.setParameterValue("Id", itemId, guidDataValue);
					update.setParameterValue("MailServer", this.$MailBoxServerId, guidDataValue);
					update.setParameterValue("UserName", this.$UserName, textDataValue);
					update.setParameterValue("UserPassword", this.$UserPassword, textDataValue);
					update.setParameterValue("SenderEmailAddress", senderEmailAddress, textDataValue);
					update.setParameterValue("MailboxName", senderEmailAddress, textDataValue);
					update.setParameterValue("SendEmailsViaThisAccount", this.$SendEmailsViaThisAccount,
						booleanDataValue);
					update.setParameterValue("ErrorCode", this.$ErrorCode, guidDataValue);
					update.setParameterValue("SynchronizationStopped", this.$SynchronizationStopped, booleanDataValue);
					return update;
				},

				/**
				 * Gets default mail synchronization date.
				 * @return {Date} Default mail synchronization date.
				 */
				getMailSyncPeriodDefault: function() {
					var currentDate = this.Ext.Date.clearTime(new Date());
					return this.Ext.Date.add(currentDate, Ext.Date.DAY, -7);
				},

				/**
				 * Shows tips and closes modal box after save.
				 * @virtual
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function context.
				 */
				onSaved: function(callback, scope) {
					this.sandbox.publish("AddMailBoxEvent");
					this.showTooltip();
					this.onCancel();
					this.hideBodyMask();
					if (callback) {
						callback.call(scope || this);
					}
				},

				/**
				 * Closes modal box after save.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function context.
				 */
				onUpdated: function(callback, scope) {
					this.updateMailboxSyncSettings();
					this.onCancel();
					this.hideBodyMask();
					if (callback) {
						callback.call(scope || this);
					}
				},

				/**
				 * Set columns for query select
				 * @virtual
				 * @param {Terrasoft.EntitySchemaQuery} esq Select list query.
				 */
				setServerSelectColumns: function(esq) {
					esq.addColumn("Id");
					esq.addColumn("Type");
					esq.addColumn("UseLogin");
					esq.addColumn("UseUserNameAsLogin");
					esq.addColumn("UseEmailAddressAsLogin");
					esq.addColumn("Logo");
					esq.addColumn("OAuthApplication");
					esq.addColumn("OAuthApplication.AppClassName");
					esq.addColumn("AllowEmailDownloading");
					esq.addColumn("Name");
				},

				/**
				 * Gets authorization label value. This value used for credentials frame header.
				 * @return {String} Authorization label value.
				 */
				getAuthorizationLabel: function() {
					return this.get("ServerName");
				},

				/**
				 * Unsubscribes events handlers.
				 */
				destroy: function() {
					this.Terrasoft.ServerChannel.un(Terrasoft.EventName.ON_MESSAGE, this.onMailServersListChanged,
							this);
					this.un("change:SenderEmailAddress", function() {
						this.setUserLogin();
					}, this);
					this.callParent(arguments);
				},

				/**
				 * Calls next authorization step for the entered email address.
				 * When the sender email address is empty method will do nothing.
				 * If mail server was found by the domain, credentials step will be shown
				 * using {@link #onServerListItemClick} method.
				 * Mail servers list will be shown otherwise.
				 */
				goToAuthorization: function() {
					if (!this.validateColumn("SenderEmailAddress")) {
						return;
					}
					var emailDomain = this.getEmailDomain();
					var server = this.getServerByDomain(emailDomain);
					var mailServer = server && server.get("MailServer");
					if (this.isNotEmpty(mailServer)) {
						this.onServerListItemClick(mailServer.value);
					} else {
						this.showServerList();
					}
				}

				//endregion

			},
			diff: /**SCHEMA_DIFF*/ [
			{
				"operation": "insert",
				"name": "WrapContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"markerValue": {"bindTo": "WrapMarkerValue"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "MailBoxEditSettings",
				"parentName": "WrapContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["email-settings-main-container"]
					},
					"items": [],
					"visible": {
						"bindTo": "IsServerListVisible"
					},
					"markerValue": "ServerListContainer"
				}
			}, {
				"operation": "insert",
				"name": "EmailSettingsCancelTop",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"imageConfig": {"bindTo": "Resources.Images.CloseModal"},
					"click": {
						"bindTo": "onCancel"
					},
					"classes": {
						"textClass": ["cancel-button-top"],
						"wrapperClass": ["cancel-button-top"]
					},
					"items": [],
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
				},
				"index": 0
			}, {
				"operation": "insert",
				"name": "EmailSettingsTabHeader",
				"parentName": "MailBoxEditSettings",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.SelectMailService"},
					"classes": {
						"labelClass": ["emails-header-caption"]
					},
					"items": []
				},
				"index": 1
			}, {
				"operation": "insert",
				"name": "ServerList",
				"parentName": "MailBoxEditSettings",
				"propertyName": "items",
				"values": {
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "Id",
					"classes": {
						"wrapClassName": ["server-container-list"]
					},
					"dataItemIdPrefix": "entity-mailbox-item",
					"collection": "ServerListCollection",
					"itemPrefix": "_Servers_ContainerList",
					"onGetItemConfig": "getMailItemViewConfig",
					"selectedItemCssClass": "selected-item-class",
					"rowCssSelector": ".server-list-item",
					"onItemClick": {
						"bindTo": "onServerListItemClick"
					}
				},
				"index": 2
			}, {
				"operation": "insert",
				"name": "AddNewServer",
				"parentName": "MailBoxEditSettings",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.AddNewServer"},
					"click": {
						"bindTo": "onAddMailServer"
					},
					"classes": {
						"labelClass": ["add-new-server-button"]
					},
					"visible": {
						"bindTo": "CanManageMailServers"
					},
					"items": []
				},
				"index": 3
			}, {
				"operation": "insert",
				"name": "EmailSettingsCancel",
				"parentName": "MailBoxEditSettings",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.Cancel"},
					"click": {
						"bindTo": "onCancel"
					},
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"classes": {
						"textClass": ["cancel-button"],
						"wrapperClass": ["cancel-button"]
					},
					"items": []
				},
				"index": 4
			}, {
				"operation": "insert",
				"name": "SetupCredentials",
				"parentName": "WrapContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["email-credentials-main-container"]
					},
					"items": [],
					"visible": {
						"bindTo": "IsServerCredentialsVisible"
					},
					"markerValue": "SetupCredentials"
				}
			}, {
				"operation": "insert",
				"name": "CredentialsCaption",
				"parentName": "SetupCredentials",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "getAuthorizationLabel"
					},
					"classes": {
						"labelClass": ["autorization-label", "label-credentials"]
					},
					"items": []
				}
			}, {
				"operation": "insert",
				"name": "SenderEmailAddress",
				"parentName": "SetupCredentials",
				"propertyName": "items",
				"values": {
					"id": "new-mailbox",
					"selectors": {
						"wrapEl": "#email"
					},
					"value": {
						"bindTo": "SenderEmailAddress"
					},
					"enabled": {
						"bindTo": "IsBackToServerListButtonVisible"
					},
					"controlConfig": {
						"placeholder": {"bindTo": "Resources.Strings.TypeEmailAddress"},
						"classes": ["placeholderOpacity"],
						"enterkeypressed": {
							"bindTo": "onKeyDown"
						}
					},
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"focused": {
						"bindTo": "IsLoginEditFocused"
					}
				}
			}, {
				"operation": "insert",
				"name": "UserName",
				"parentName": "SetupCredentials",
				"propertyName": "items",
				"values": {
					"id": "new-login",
					"selectors": {
						"wrapEl": "#login"
					},
					"value": {
						"bindTo": "UserName"
					},
					"placeholder": "Something",
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"placeholder": {"bindTo": "Resources.Strings.TypeUserName"},
						"classes": ["placeholderOpacity"],
						"enterkeypressed": {
							"bindTo": "onKeyDown"
						}
					},
					"isRequired": {
						"bindTo": "isRequiredFieldsVisible"
					},
					"visible": {
						"bindTo": "UseLogin"
					}
				}
			}, {
				"operation": "insert",
				"name": "UserPassword",
				"parentName": "SetupCredentials",
				"propertyName": "items",
				"values": {
					"id": "new-password",
					"selectors": {
						"wrapEl": "#password"
					},
					"value": {
						"bindTo": "UserPassword"
					},
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 12
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"placeholder": {"bindTo": "Resources.Strings.TypePassword"},
						"classes": ["placeholderOpacity"],
						"protect": true,
						"enterkeypressed": {
							"bindTo": "onKeyDown"
						}
					},
					"isRequired": {
						"bindTo": "isRequiredFieldsVisible"
					}
				}
			}, {
				"operation": "insert",
				"name": "Save",
				"parentName": "SetupCredentials",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.SignIn"},
					"click": {
						"bindTo": "onSave"
					},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"classes": {
						"textClass": ["login-button"],
						"wrapperClass": ["login-button "]
					},
					"markerValue": "SignIn",
					"items": []
				}
			}, {
				"operation": "insert",
				"name": "ShowServerListButton",
				"parentName": "SetupCredentials",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.BackToServerList"},
					"click": {
						"bindTo": "showServerList"
					},
					"classes": {
						"textClass": ["back-to-list-button"],
						"wrapperClass": ["cancel-button"]
					},
					"visible": {
						"bindTo": "IsBackToServerListButtonVisible"
					},
					"items": []
				}
			}, {
				"operation": "insert",
				"name": "EnterEmail",
				"parentName": "WrapContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["email-credentials-first-container"]
					},
					"items": [],
					"visible": {"bindTo": "IsEnterEmailPanelVisible"},
					"markerValue": "EnterEmail"
				}
			}, {
				"operation": "insert",
				"name": "EnterEmailCaption",
				"parentName": "EnterEmail",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.EnterEmail"},
					"classes": {
						"labelClass": ["autorization-label", "label-credentials"]
					},
					"items": []
				},
				"index": 1
			}, {
				"operation": "insert",
				"name": "StartSenderEmailAddress",
				"parentName": "EnterEmail",
				"propertyName": "items",
				"values": {
					"bindTo": "SenderEmailAddress",
					"controlConfig": {
						"placeholder": {"bindTo": "Resources.Strings.TypeEmailAddress"},
						"classes": ["placeholderOpacity"],
						"enterkeypressed": {"bindTo": "goToAuthorization"}
					},
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"labelConfig": {"visible": false}
				},
				"index": 2
			}, {
				"operation": "insert",
				"name": "NextStepButton",
				"parentName": "EnterEmail",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.Next"},
					"click": {"bindTo": "goToAuthorization"},
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"classes": {
						"textClass": ["login-button"],
						"wrapperClass": ["login-button"]
					},
					"markerValue": "NextStep",
					"items": []
				},
				"index": 3
			}, {
				"operation": "insert",
				"name": "NewEmailSettingsCancel",
				"parentName": "EnterEmail",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.Cancel"},
					"click": {
						"bindTo": "onCancel"
					},
					"classes": {
						"textClass": ["back-to-list-button"],
						"wrapperClass": ["cancel-button"]
					},
					"items": []
				},
				"index": 4
			}]/**SCHEMA_DIFF*/
		};
	});

define("BaseSyncSettingsEdit", ["ExchangeNUIConstants"],
		function(ExchangeNUIConstants) {
	return {
		attributes: {
			/**
			 * EnableMailSynhronization column attribute.
			 * @private
			 */
			"EnableMailSynhronization": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: true
			}
		},
		methods: {

			//region Methods: Protected

			/**
			 * Returns mail server type.
			 * @protected
			 * @return {String} Mail server type.
			 */
			getMailServerType: function() {
				var servers = this.$ServerListCollection;
				var server = servers.get(this.$MailBoxServerId);
				return server.$Type.value;
			},

			/**
			 * Recreates exchange server subscriptions.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			recreateListener: function(callback, scope) {
				if (!this.getIsFeatureEnabled("ExchangeListenerEnabled") ||
						this.getMailServerType() !== ExchangeNUIConstants.MailServer.Type.Exchange ||
						!this.$EnableMailSynhronization || !this.$AllowEmailDownloading) {
					this.Ext.callback(callback, scope || this);
					return;
				}
				this.callService({
					serviceName: "ExchangeEventsService",
					methodName: this.$EnableMailSynhronization ? "RecreateListener" : "StopListener",
					data: {
						"mailboxId": this.$MailboxSyncSettingsId
					}
				}, callback, scope || this);
			},

			/**
			 * Creates email synchronization job.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			createEmailSyncJob: function(callback, scope) {
				if (!this.getIsFeatureEnabled("ExchangeListenerEnabled") ||
						this.getMailServerType() !== ExchangeNUIConstants.MailServer.Type.Exchange ||
						!this.$EnableMailSynhronization) {
					this.Ext.callback(callback, scope || this);
					return;
				}
				this.callService({
					serviceName: "MailboxSettingsService",
					methodName: "CreateEmailSyncJob",
					data: {
						create: true,
						interval: 0,
						serverId: this.$MailBoxServerId,
						senderEmailAddress: this.$SenderEmailAddress
					}
				}, callback, scope || this);
			},

			/**
			 * @inheritdoc BaseSyncSettingsEdit#callCreateOrDeleteSyncJob
			 * @protected
			 */
			callCreateOrDeleteSyncJob: function(callback, scope, data) {
				if (this.getIsFeatureEnabled("ExchangeListenerEnabled") &&
						this.getMailServerType() === ExchangeNUIConstants.MailServer.Type.Exchange) {
					this.set("AutomaticallyAddNewEmails", false);
				}
				this.callParent([function() {
					this.createEmailSyncJob(callback || this.Terrasoft.emptyFn, scope || this);
				}, this, data]);
			},

			/**
			 * @inheritdoc BaseSyncSettingsEdit#updateSyncJobs
			 * @protected
			 */
			updateSyncJobs: function(callback, scope) {
				this.callParent([function() {
					this.createEmailSyncJob(callback || this.Terrasoft.emptyFn, scope || this);
				}, this]);
			},

			/**
			 * @inheritdoc BaseSyncSettingsEdit#onSave
			 * @protected
			 */
			onSave: function(callback, scope) {
				this.callParent([function() {
					this.recreateListener(callback || this.Terrasoft.emptyFn, scope || this);
				}, this]);
			}

			//endregion

		},
		diff: []
	};
});


