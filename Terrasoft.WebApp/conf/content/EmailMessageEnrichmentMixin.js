Terrasoft.configuration.Structures["EmailMessageEnrichmentMixin"] = {innerHierarchyStack: ["EmailMessageEnrichmentMixin"]};
define("EmailMessageEnrichmentMixin", ["EmailMessageEnrichmentMixinResources", "ConfigurationEnums",
	"ConfigurationConstants", "NetworkUtilities", "EmailHelper", "EmailEnrichmentMixin"],
		function(resources, ConfigurationEnums, ConfigurationConstants, NetworkUtilities) {
			/**
			 * @class Terrasoft.configuration.mixins.EmailEnrichmentMixin
			 * The mixin which can add menu items for contact enrichment from email.
			 */
			Ext.define("Terrasoft.configuration.mixins.EmailMessageEnrichmentMixin", {
				extend: "Terrasoft.EmailEnrichmentMixin",
				alternateClassName: "Terrasoft.EmailMessageEnrichmentMixin",

				//region Methods: Private

				/**
				 * Returns "UpdateEmailByContact" query.
				 * @private
				 * @param {String} contactId Sender contact identifier.
				 * @return {Object} "UpdateEmailByContact" query.
				 */
				_getUpdateEmailByContactQuery: function(contactId) {
					var activityId = this.get("RecordId");
					var update = this.Ext.create("Terrasoft.UpdateQuery", {
						rootSchemaName: "Activity"
					});
					update.enablePrimaryColumnFilter(activityId);
					update.setParameterValue("Contact", contactId, this.Terrasoft.DataValueType.LOOKUP);
					return update;
				},

				//endregion

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.EmailEnrichmentMixin#getEnrichmentButtonMenuItem
				 * @overridden
				 */
				getEnrichmentButtonMenuItem: function() {
					var item = this.callParent(arguments);
					item.set("MarkerValue", "CaseEmailActionsButton " + item.get("MarkerValue"));
					return item;
				},

				/**
				 * Loads sender data in case message.
				 * @protected
				 */
				loadSenderData: function() {
					this.set("SenderId", "");
					this.set("SenderName", "");
					this.set("SenderLoaded", false);
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "ActivityParticipant"
					});
					esq.addColumn("Participant");
					esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Activity", this.get("RecordId")));
					var roleIds = [ConfigurationConstants.Activity.ParticipantRole.From,
						ConfigurationConstants.Activity.ParticipantRole.DraftFrom];
					esq.filters.addItem(this.Terrasoft.createColumnInFilterWithParameters("Role", roleIds));
					esq.getEntityCollection(function(response) {
						if (response.success) {
							var collection = response.collection;
							if (collection.getCount() > 0) {
								var participant = collection.getByIndex(0).get("Participant");
								this.set("SenderId", participant.value);
								this.set("SenderName", participant.displayValue);
							}
						}
						this.set("SenderLoaded", true);
					}, this);
				},

				/**
				 * Checks if case message has sendr contact.
				 * @protected
				 */
				showSenderLink: function() {
					return this.isNotEmpty(this.get("SenderName")) && this.get("SenderLoaded");
				},

				/**
				 * Checks if case message does not have sender contact.
				 * @protected
				 */
				showSenderLabel: function() {
					return this.isEmpty(this.get("SenderName")) && this.get("SenderLoaded");
				},

				/**
				 * Opens contact page for new participant.
				 * @protected
				 */
				openContactPage: function() {
					var hash = NetworkUtilities.getEntityUrl("Contact", this.get("SenderId"));
					this.sandbox.publish("PushHistoryState", {hash: hash});
					return false;
				},

				/**
				 * Fills menu items collection with contact enrichment menu items.
				 * @protected
				 */
				initEnrichmentCollection: function() {
					var result = this.get("Response");
					if (result == null) {
						return;
					}
					var baseActions = this.get("EmailActionsMenuCollection");
					var collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
					var contacts = result.data.slice(0, 4);
					if (contacts.length > 0) {
						collection.addItem(this.getEnrichmentButtonMenuItem({
							"Type": "Terrasoft.MenuSeparator",
							"Caption": resources.localizableStrings.EnrichContactMenuSeparator
						}));
						this.Terrasoft.each(contacts, function(contact) {
							this.addEnrichContactAction(collection, contact);
						}, this);
						collection.addItem(this.getEnrichmentButtonMenuItem({
							"Type": "Terrasoft.MenuSeparator"
						}));
					} else {
						this.initContactLinkingCollection(collection);
					}
					baseActions.each(function(item) {
						collection.add(item);
					});
					baseActions.clear();
					baseActions.loadAll(collection);
				},

				/**
				 * Fills menu items collection with contact linking menu items.
				 * @param {Terrasoft.BaseViewModelCollection} collection Actions collection.
				 * @protected
				 */
				initContactLinkingCollection: function(collection) {
					collection.addItem(this.getEnrichmentButtonMenuItem({
							"Caption": resources.localizableStrings.CreateNewContactMenuItemCaption,
							"Click": {bindTo: "onCreateNewContactMenuItemClick"},
							"Visible": {bindTo: "showSenderLabel"}
						})
					);
					collection.addItem(this.getEnrichmentButtonMenuItem({
							"Caption": resources.localizableStrings.AddToExistingContactMenuItemCaption,
							"Click": {bindTo: "onLinkContactClick"},
							"Visible": {bindTo: "showSenderLabel"}
						})
					);
					collection.addItem(this.getEnrichmentButtonMenuItem({
						"Type": "Terrasoft.MenuSeparator",
						"Visible": {bindTo: "showSenderLabel"}
					}));
				},

				/**
				 * Opens contact page with new sender data.
				 * @protected
				 */
				onCreateNewContactMenuItemClick: function() {
					var moduleId = this.Terrasoft.generateGUID();
					this.sandbox.subscribe("ContactPageV2OnSavedResponse", function(savedRecordConfig) {
						this.sandbox.unsubscribePtp("ContactPageV2OnSavedResponse", [moduleId]);
						this.connectActivityParticipantItem(savedRecordConfig);
					}, this, [moduleId]);
					var historyState = this.sandbox.publish("GetHistoryState");
					var senderInfo = this.getSenderInfo();
					this.sandbox.publish("PushHistoryState", {
						hash: historyState.hash.historyState,
						stateObj: {
							isSeparateMode: true,
							schemaName: "ContactPageV2",
							entitySchemaName: "Contact",
							operation: ConfigurationEnums.CardStateV2.ADD,
							valuePairs: senderInfo,
							isInChain: true
						}
					});
					this.sandbox.loadModule("CardModuleV2", {
						renderTo: "centerPanel",
						keepAlive: true,
						id: moduleId
					});
				},

				/**
				 * Returns sender alias and email.
				 * @protected
				 */
				getSenderInfo: function() {
					var sender = this.get("[Activity:Id:RecordId].Sender");
					var senderInfoRegExp = this.Terrasoft.EmailHelper.emailPattern;
					var regExp = new RegExp(senderInfoRegExp);
					var senderInfo = sender.match(regExp);
					var input = senderInfo.input;
					if (this.isEmpty(input)) {
						return [];
					}
					input = input.trim();
					if (input.indexOf(";") === input.length - 1) {
						input = input.slice(0, -1);
					}
					var senderAlias = senderInfo ? input.replace(" <" + senderInfo[0] + ">", "") : "";
					var senderEmail = senderInfo ? senderInfo[0] : "";
					var valuePairs = [];
					if (senderAlias && senderAlias !== senderInfo.input.trim()) {
						valuePairs.push({
							name: "Name",
							value: senderAlias
						});
					}
					if (senderEmail) {
						valuePairs.push({
							name: "Email",
							value: senderEmail
						});
					}
					return valuePairs;
				},


				/**
				 * Opens contact lookup page for existing sender selecting.
				 * @protected
				 */
				onLinkContactClick: function() {
					var config = {
						entitySchemaName: "Contact",
						multiSelect: false,
						columns: ["Name", "Email"]
					};
					this.openLookup(config, this.onExistingContactSelected, this);
				},

				/**
				 * Handles lookup module response after selecting existing contact.
				 * @param {Object} args Arguments that contain information about selected record.
				 * @protected
				 */
				onExistingContactSelected: function(args) {
					if (!args || !args.selectedRows || args.selectedRows.isEmpty()) {
						return;
					}
					var senderInfo = this.getSenderInfo();
					var senderEmail = this.Ext.Array.findBy(senderInfo, function(item) {
						return item.name === "Email";
					}, this);
					var selectedRow = args.selectedRows.getByIndex(0);
					var connectedRecordConfig = {
						contactId: selectedRow.value,
						contactName: selectedRow.displayValue,
						senderEmail: senderEmail.value
					};
					this.checkIfContactHasCommunication(connectedRecordConfig);
				},

				/**
				 * Checks if selected contact has communication from case message.
				 * @param {Object} config Arguments that contain information about selected record and sender email.
				 * @param {String} config.contactId Sender contact identifier.
 				 * @param {String} config.senderEmail Sender email.
				 * @protected
				 */
				checkIfContactHasCommunication: function(config) {
					var typeId = ConfigurationConstants.CommunicationType.Email;
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "ContactCommunication"
					});
					esq.addAggregationSchemaColumn("Id", this.Terrasoft.AggregationType.COUNT, "Count");
					esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Number", config.senderEmail));
					esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Contact", config.contactId));
					esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "CommunicationType", typeId));
					esq.getEntityCollection(function(response) {
						if (response.success) {
							if (response.collection.getItems()[0].get("Count") > 0) {
								this.connectActivityParticipantItem(config);
							} else {
								this.connectContactCommunicationItem(config,
									this.connectActivityParticipantItem.bind(this, config), this);
							}
						}
					}, this);
				},

				/**
				 * Connect case message to selected contact.
				 * @param {Object} config Arguments that contain information about sender contact.
				 * @param {String} config.contactId Sender contact identifier.
 				 * @param {String} config.senderEmail Sender email.
				 * @param {Function} callback The function to be called after setting the value to the model.
				 * @param {Object} scope The context in which callback function is called.
				 * @protected
				 */
				connectContactCommunicationItem: function(config, callback, scope) {
					var typeId = ConfigurationConstants.CommunicationType.Email;
					var insert = this.Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: "ContactCommunication"
					});
					insert.setParameterValue("Number", config.senderEmail, this.Terrasoft.DataValueType.TEXT);
					insert.setParameterValue("Contact", config.contactId, this.Terrasoft.DataValueType.GUID);
					insert.setParameterValue("CommunicationType", typeId, this.Terrasoft.DataValueType.GUID);
					insert.execute(callback, scope || this);
				},

				/**
				 * Connect activity participant to case message.
				 * @param {Object} config Arguments that contain information about sender contact.
				 * @param {String} config.contactId Sender contact identifier.
 				 * @param {String} config.senderEmail Sender email.
				 * @protected
				 */
				connectActivityParticipantItem: function(config) {
					var roleId = ConfigurationConstants.Activity.ParticipantRole.From;
					var activityId = this.get("RecordId");
					var contactId = config.contactId;
					var insert = this.Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: "ActivityParticipant"
					});
					insert.setParameterValue("Activity", activityId, this.Terrasoft.DataValueType.GUID);
					insert.setParameterValue("Participant", contactId, this.Terrasoft.DataValueType.GUID);
					insert.setParameterValue("Role", roleId, this.Terrasoft.DataValueType.GUID);
					insert.execute(this.updateEmailByContact.bind(this, config), this);
				},

				/**
				 * Connect selected contact to email activity.
				 * @param {Object} config Arguments that contain information about sender contact.
				 * @param {String} config.contactId Sender contact identifier.
				 * @protected
				 */
				updateEmailByContact: function(config) {
					var activityId = this.get("RecordId");
					if (this.isEmpty(activityId) || this.isEmpty(config) || this.isEmpty(config.contactId)) {
						this.loadSenderData();
					}
					var update = this._getUpdateEmailByContactQuery(config.contactId);
					update.execute(this.updateCaseByContact.bind(this, config), this);
				},

				/**
				 * Connect selected contact to case if current case contact is null.
				 * @param {Object} config Arguments that contain information about sender contact.
				 * @param {String} config.contactId Sender contact identifier.
				 * @param {String} config.contactName Sender contact name.
				 * @protected
				 */
				updateCaseByContact: function(config) {
					if (this.isEmpty(this.get("CaseContact"))) {
						var message = this.Ext.String.format(resources.localizableStrings.SetCaseContactMessage,
							config.contactName);
						this.showConfirmationDialog(message, function (returnCode) {
							if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
								this.sandbox.publish("CaseContactUpdate", config.contactId);
							} else {
								this.loadSenderData();
							}
						}, ["yes", "no"]);
					} else {
						this.loadSenderData();
					}
				},

				/**
				 * Returns additional enrich actions request config.
				 * @protected
				 * @return {Object} Additional enrich actions request config.
				 */
				getAdditionalActionsRequestConfig: function() {
					return {
						methodName: "GetCloudStateForEmail",
						data: {
							activityId: this.get("RecordId")
						}
					};
				}

				//endregion

			});
		});


