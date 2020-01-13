Terrasoft.configuration.Structures["SyncSettingsEditMixin"] = {innerHierarchyStack: ["SyncSettingsEditMixin"]};
define("SyncSettingsEditMixin", ["SyncSettingsEditMixinResources", "ExchangeNUIConstants",
			"SocialAccountAuthUtilities", "ConfigurationConstants"],
		function(Resources, ExchangeConstants, SocialAccountAuthUtilities, ConfigurationConstants) {
			Ext.define("Terrasoft.configuration.mixins.SyncSettingsEditMixin", {
				alternateClassName: "Terrasoft.SyncSettingsEditMixin",

				//region Properties: Protected

				/**
				 * Setting of sync to mail box.
				 * @type {Terrasoft.Collection}
				 */
				mailboxSyncSettings: null,

				//endregion

				//region Methods: Protected

				/**
				 * Sets clear values to setting of sync.
				 */
				clearValueSyncSetting: function() {
					var emptyString = this.Ext.emptyString;
					this.set("SenderEmailAddress", emptyString);
					this.set("UserLogin", emptyString);
					this.set("ServerName", emptyString);
				},

				/**
				 * Add columns to entity schema query for getting server list for sync.
				 * @protected
				 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query for getting server list for sync.
				 */
				addFiltersToServerListEsq: function(esq) {
					var filterGroup = new this.Terrasoft.createFilterGroup();
					filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
					filterGroup.add("Exchange", this.Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "Type", ExchangeConstants.MailServer.Type.Exchange));
					filterGroup.add("Gmail", this.Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "Id", ExchangeConstants.MailServer.Gmail));
					esq.filters.add("IsWithSyncContactOrActivity", filterGroup);
				},

				/**
				 * Creates entity sync settings insert query.
				 * @return {Terrasoft.InsertQuery} Entity sync settings insert query.
				 */
				getEntitySyncSettingInsert: function() {
					var insert = this.getInsertEntitySyncSetting();
					this.setParametersToInsertEntitySyncSetting(insert);
					return insert;
				},

				/**
				 * Returns prompted to insert records of entity sync setting.
				 * @protected
				 * @return {Terrasoft.InsertQuery}
				 */
				getInsertEntitySyncSetting: function() {
					var entitySchemaName = this.getEntitySchemaName();
					var insert = this.Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: entitySchemaName
					});
					return insert;
				},

				/**
				 * Add contact communication.
				 * @protected
				 * @param {Object} parameters Configuration object.
				 * @param {String} parameters.communicationTypeId Communication type.
				 * @param {String} parameters.number User number in external resource.
				 * @param {String} parameters.socialMediaId User Id in external resource.
				 * @param {Function} parameters.callback Callback function.
				 * @param {Object} parameters.scope Callback function context.
				 */
				addContactCommunication: function(parameters) {
					var callback = parameters.callback,
							scope = parameters.scope || this;
					var insert = this.getContactCommunicationInsert(parameters);
					insert.execute(callback, scope);
				},

				/**
				 * Creates contact communication insert query.
				 * @protected
				 * @param {Object} parameters Configuration object.
				 * @param {String} parameters.communicationTypeId Communication type.
				 * @param {String} parameters.number User number in external resource.
				 * @param {String} parameters.socialMediaId User Id in external resource.
				 */
				getContactCommunicationInsert: function(parameters) {
					var communicationTypeId = parameters.communicationTypeId,
							number = parameters.number,
							socialMediaId = parameters.socialMediaId;
					var insert = this.Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: "ContactCommunication"
					});
					var id = this.Terrasoft.utils.generateGUID();
					insert.setParameterValue("Id", id, this.Terrasoft.DataValueType.GUID);
					insert.setParameterValue("CommunicationType", communicationTypeId,
							this.Terrasoft.DataValueType.GUID);
					insert.setParameterValue("Contact", this.Terrasoft.SysValue.CURRENT_USER_CONTACT.value,
							this.Terrasoft.DataValueType.GUID);
					insert.setParameterValue("Number", number, this.Terrasoft.DataValueType.TEXT);
					insert.setParameterValue("SocialMediaId", socialMediaId, this.Terrasoft.DataValueType.TEXT);
					return insert;
				},

				//endregion

				//region Methods: Public

				/**
				 * Check contact communication exists.
				 * @param {Object} parameters Configuration object.
				 * @param {String} parameters.communicationTypeId Communication type.
				 * @param {String} parameters.number User number in external resource.
				 * @param {Function} parameters.callbackSuccess Callback function on success.
				 * @param {Function} parameters.callbackFail Callback function on fail.
				 * @param {Object} parameters.scope Callback function context.
				 */
				checkContactCommunicationExists: function(parameters) {
					var communicationTypeId = parameters.communicationTypeId,
							number = parameters.number,
							callbackSuccess = parameters.callbackSuccess,
							callbackFail = parameters.callback,
							scope = parameters.scope || this;
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "ContactCommunication"
					});
					esq.addColumn("CommunicationType");
					esq.addColumn("Number");
					esq.addColumn("Contact");
					esq.filters.add("TypeFilter", esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
							"CommunicationType", communicationTypeId));
					esq.filters.add("ValueFilter", esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
							"Number", number));
					esq.filters.add("UserFilter", esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
							"Contact", this.Terrasoft.SysValue.CURRENT_USER_CONTACT.value));
					esq.getEntityCollection(function(result) {
						if (result.success) {
							if (result.collection.isEmpty()) {
								callbackSuccess.call(scope || this, parameters);
							} else {
								callbackFail.call(scope || this);
							}
						}
					}, this);
				},

				/**
				 * Publish that sync settings is set.
				 */
				publishSyncSettingsIsSet: function() {
					var itemId = this.get("MailboxSyncSettingsId");
					this.sandbox.publish("ShowSyncSettingsSetTip", itemId);
				},

				/**
				 * Gets google account exists.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function scope.
				 * @protected
				 */
				getGoogleAccountExists: function(callback, scope) {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "SocialAccount"
					});
					esq.filters.add("UserFilter", esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"User", this.Terrasoft.SysValue.CURRENT_USER.value));
					esq.filters.add("TypeFilter", esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"Type", ConfigurationConstants.CommunicationTypes.Google));
					esq.getEntityCollection(function(result) {
						if (result.success) {
							var response = {
								isValid: true,
								errorMessage: null
							};
							if (result.collection.getCount() > 0) {
								response.isValid = false;
								response.errorMessage = Resources.localizableStrings.OnlyOneGoogleAccountAllowedCaption;
							}
							if (callback) {
								callback.call(scope || this, response);
							}
						}
					}, this);
				},

				/**
				 * Start google authorization.
				 */
				startGoogleAuth: function() {
					this.getGoogleAccountExists(function(response) {
						if (response && !response.isValid) {
							this.showInformationDialog(response.errorMessage);
							return;
						}
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
								sandbox: this.sandbox,
								callAfter: function(data, login, socialNetworkId) {
									var communicationTypeId = socialNetworkId;
									var socialMediaId = data.socialId;
									if (socialNetwork === "Google") {
										communicationTypeId = ConfigurationConstants.CommunicationTypes.Email;
									}
									if (communicationTypeId && !Ext.isEmpty(login) && !Ext.isEmpty(socialMediaId)) {
										var config = {
											communicationTypeId: communicationTypeId,
											number: login,
											socialMediaId: socialMediaId,
											callbackSuccess: this.addContactCommunication,
											callback: this.publishSyncSettingsIsSet,
											scope: this
										};
										this.checkContactCommunicationExists(config);
									}
								}.bind(this)
							};
							var isValid = SocialAccountAuthUtilities.checkSettingsAndOpenWindow(socialAccountOptions);
							if (!isValid) {
								var message = Resources.localizableStrings.MailboxGmailNotHaveSettings;
								this.Terrasoft.showInformation(message);
							}
						}, this);
					}, this);
				},

				/**
				 * Add value parameters to insert query of entity sync setting.
				 * @param {Terrasoft.InsertQuery} insert Insert query.
				 */
				setParametersToInsertEntitySyncSetting: this.Terrasoft.emptyFn,

				/**
				 * Returns name of entity.
				 * @return {String} A name of entity.
				 */
				getEntitySchemaName: this.Terrasoft.emptyFn

				//endregion

			});
			return Terrasoft.SyncSettingsEditMixin;
		});


