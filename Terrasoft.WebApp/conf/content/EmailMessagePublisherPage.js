Terrasoft.configuration.Structures["EmailMessagePublisherPage"] = {innerHierarchyStack: ["EmailMessagePublisherPageEmailMessagePublisher", "EmailMessagePublisherPageEmailsSearch", "EmailMessagePublisherPage"], structureParent: "BaseMessagePublisherPage"};
define('EmailMessagePublisherPageEmailMessagePublisherStructure', ['EmailMessagePublisherPageEmailMessagePublisherResources'], function(resources) {return {schemaUId:'1d748212-ebbc-4c65-9481-1f96bf4ce95c',schemaCaption: "Email Message Publisher Page", parentSchemaName: "BaseMessagePublisherPage", schemaName:'EmailMessagePublisherPageEmailMessagePublisher',parentSchemaUId:'6b7d0022-f128-4c6e-8372-ce9d8819fbfa',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailMessagePublisherPageEmailsSearchStructure', ['EmailMessagePublisherPageEmailsSearchResources'], function(resources) {return {schemaUId:'3134857c-0a8c-42b0-b34a-8f17d989ec68',schemaCaption: "Email Message Publisher Page", parentSchemaName: "EmailMessagePublisherPageEmailMessagePublisher", schemaName:'EmailMessagePublisherPageEmailsSearch',parentSchemaUId:'1d748212-ebbc-4c65-9481-1f96bf4ce95c',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"EmailMessagePublisherPageEmailMessagePublisher",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailMessagePublisherPageStructure', ['EmailMessagePublisherPageResources'], function(resources) {return {schemaUId:'a49116d8-dc57-4552-b3fb-9846b33fd959',schemaCaption: "Email Message Publisher Page", parentSchemaName: "EmailMessagePublisherPageEmailsSearch", schemaName:'EmailMessagePublisherPage',parentSchemaUId:'3134857c-0a8c-42b0-b34a-8f17d989ec68',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"EmailMessagePublisherPageEmailsSearch",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailMessagePublisherPageEmailMessagePublisherResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("EmailMessagePublisherPageEmailMessagePublisher", ["EmailMessagePublisherPageResources", "LookupUtilities", "EmailImageMixin",
			"ConfigurationConstants", "MaskHelper", "ExchangeNUIConstants", "EmailActionsMixin", "MacrosUtilities",
			"ExtendedHtmlEditModuleUtilities", "ExtendedHtmlEditModule", "MessagePublisherAttachmentUtilities",
			"MacrosHelperServiceRequest", "EntityResponseValidationMixin", "css!HtmlEditModule",
			"css!EmailMessagePublisherModule"],
		function(resources, LookupUtilities, EmailImageMixin, ConfigurationConstants, MaskHelper, ExchangeNUIConstants) {
			return {
				entitySchemaName: "Activity",
				mixins: {
					MacrosUtilities: "Terrasoft.MacrosUtilities",
					ExtendedHtmlEditModuleUtilities: "Terrasoft.ExtendedHtmlEditModuleUtilities",
					MessagePublisherAttachmentUtilities: "Terrasoft.MessagePublisherAttachmentUtilities",
					EntityResponseValidationMixin: "Terrasoft.EntityResponseValidationMixin",

					/**
					 * @class Terrasoft.EmailImageMixin
					 * Mixin for inserting email images.
					 */
					EmailImageMixin: "Terrasoft.EmailImageMixin",
					/**
					 * @class Terrasoft.EmailActionsMixin
					 * Mixin for actions with email.
					 */
					EmailActionsMixin: "Terrasoft.EmailActionsMixin"
				},
				messages: {
					/**
					 * Email signature.
					 */
					"Signature": {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						value: ""
					},
					/**
					 * Flag that indicates email signature is being used.
					 */
					"UseSignature": {
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
						value: false
					},
					/**
					 * @message LaunchLoadEmailData
					 *  Message that launches loading email data.
					 */
					"LaunchLoadEmailData": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message SendListenerEmailData
					 * Returns email data.
					 */
					"SendListenerEmailData": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message PushHistoryState
					 * Returns history state.
					 */
					"PushHistoryState": {
						"mode": Terrasoft.MessageMode.BROADCAST,
						"direction": Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message GetPropertiesByName
					 * Returns values of target columns.
					 */
					"GetPropertiesByName": {
						"mode": Terrasoft.MessageMode.PTP,
						"direction": Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message SendMacrosData
					 * Informs publisher that loaded EmailTemplate from history page
					 */
					"SendMacrosData": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message EmailMessagePageLoaded
					 * Informs section that tab was loaded
					 */
					"EmailMessagePageLoaded": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message MacroSelected
					 */
					"MacroSelected": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					}

				},
				attributes: {
					/**
					 * Shows whether Title field is enabled.
					 */
					IsTitleEnabled: {
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
						value: true
					},

					/**
					 * Email body from reply message.
					 */
					InReplyToEmailBody: {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						value: ""
					},

					/**
					 * Expandable entities list.
					 */
					entitiesList: {
						"dataValueType": this.Terrasoft.DataValueType.COLLECTION,
						"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Senders list.
					 */
					"SenderEnum": {
						dataValueType: this.Terrasoft.DataValueType.ENUM,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						caption: {
							"bindTo": "Resources.Strings.SenderCaption"
						},
						"isRequired": true
					},

					/**
					 * Senders list which is displayed when lookup is opened.
					 */
					"SenderEnumList": {
						dataValueType: this.Terrasoft.DataValueType.ENUM,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						isCollection: true
					},

					/**
					 * Recepient.
					 */
					"Recepient": {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						dependencies: [
							{
								columns: ["Contact"],
								methodName: "onContactChange"
							}
						]
					},

					/**
					 * Visibility of Copy button.
					 */
					"isCopyRecipientVisible": {
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN
					},

					/**
					 * Visibility of Blind copy button.
					 */
					"isBlindCopyRecipientVisible": {
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN
					}
				},
				methods: {
					/**
					 * Reverses the visibility of the field.
					 * @private
					 */
					fieldVisibleToggleClick: function() {
						if (arguments && arguments.length) {
							var tag = arguments[arguments.length - 1];
							this.set(tag, !this.get(tag));
						}
					},

					/**
					 * Initializes collection.
					 * @private
					 */
					initCollection: function() {
						var collectionName = "FilesList";
						var collection = this.get(collectionName);
						if (!collection) {
							collection = this.Ext.create("Terrasoft.Collection");
							this.set(collectionName, collection);
						} else {
							collection.clear();
						}
					},

					/**
					 * Initializes attachments view data (viewModelClass and viewConfig).
					 * @private
					 */
					initAttachmentsViewData: function() {
						var schemaName = "EmailPublisherAttachmentPage";
						var builderConfig = {
							schemaName: schemaName,
							entitySchemaName: null,
							profileKey: schemaName
						};
						var schemaBuilder = this.Ext.create("Terrasoft.SchemaBuilder");
						schemaBuilder.build(builderConfig, function(viewModelClass, viewConfig) {
							this.set("AttachmentViewModelClass", viewModelClass);
							this.set("AttachmentViewConfig", viewConfig);
						}, this);
					},

					/**
					 * @inheritdoc Terrasoft.BaseMessagePublisherPage#getPublishData
					 * @overridden
					 */
					getPublishData: function() {
						var publishData = [];
						var config = this.getListenerRecordData();
						var relationSchemaRecordId = config.relationSchemaRecordId;
						publishData.push({"Key": config.relationColumnName + "Id", "Value": relationSchemaRecordId});
						var body = this.get("Body");
						var title = this.get("Title");
						if (config && config.additionalInfo.title) {
							title = config.additionalInfo.title;
						}
						var sender = this.get("Sender");
						var recepient = this.get("Recepient");
						var copyRecepient = this.get("CopyRecepient");
						var blindCopyRecepient = this.get("BlindCopyRecepient");
						publishData.push(
								{"Key": "Body", "Value": body},
								{"Key": "Title", "Value": title},
								{"Key": "Sender", "Value": sender},
								{"Key": "Recepient", "Value": recepient},
								{"Key": "CopyRecepient", "Value": copyRecepient},
								{"Key": "BlindCopyRecepient", "Value": blindCopyRecepient},
								{"Key": "Id", "Value": this.get("PrimaryColumnValue")}
						);
						return publishData;
					},

					/**
					 * Returns email data for Recipient.
					 * @private
					 * @return {Object} Current email.
					 */
					loadEmailData: function() {
						return this.sandbox.publish("LaunchLoadEmailData", null, [this.sandbox.id]);
					},

					/**
					 * @inheritdoc BasePageV2#onRender
					 * @overridden
					 */
					onRender: function() {
						this.callParent(arguments);
						this.loadEmailData();
					},

					/**
					 * @inheritdoc Terrasoft.BaseMessagePublisherPage#onPublishButtonClick
					 * @overridden
					 */
					onPublishButtonClick: function() {
						if (this.checkSenderBeforeSend()) {
							MaskHelper.ShowBodyMask();
							this.callParent(arguments);
						}
					},

					/**
					 * @inheritdoc Terrasoft.MessagePublisherAttachmentUtilities#onComplete
					 * @overridden
					 */
					onComplete: function() {
						this.mixins.MessagePublisherAttachmentUtilities.onComplete.call(this);
						this.onDropzoneHover(false);
					},

					/**
					 * @inheritdoc Terrasoft.BaseMessagePublisherPage#onPublished
					 * @overridden
					 */
					onPublished: function() {
						this.callParent(arguments);
						var body = "";
						body = this.getItemWithSignature(body, this);
						this.set("Body", body);
						this.set("Title", "");
						this.set("Recepient", "");
						this.set("CopyRecepient", "");
						this.set("BlindCopyRecepient", "");
						var listItems = this.get("FilesList");
						listItems.clear();
						MaskHelper.HideBodyMask();
					},

					/**
					 * @inheritdoc Terrasoft.BaseMessagePublisherPage#getPublishMaskCaption
					 * @overridden
					 */
					getPublishMaskCaption: function() {
						return this.get("Resources.Strings.EmailMaskCaption");
					},

					/**
					 * Validates fields before E-mail is sent.
					 * @protected
					 * @return {Boolean} Validate result.
					 */
					checkSenderBeforeSend: function() {
						var ext = this.Ext;
						var sender = this.get("Sender");
						var recipient = this.get("Recepient");
						var copyRecipient = this.get("CopyRecepient");
						var blindCopyRecipient = this.get("BlindCopyRecepient");
						var subject = this.get("Title");
						if (ext.isEmpty(sender)) {
							this.showConfirmationDialog(this.get("Resources.Strings.SendEmailForUserQuestion"));
							return false;
						}
						if (ext.isEmpty(recipient) && ext.isEmpty(copyRecipient) && ext.isEmpty(blindCopyRecipient)) {
							this.showConfirmationDialog(this.get("Resources.Strings.RecepientEmailForUserQuestion"));
							return false;
						}
						if (ext.isEmpty(subject)) {
							this.showInformationDialog(this.get("Resources.Strings.SubjectIsEmptyMessageToUser"));
							return false;
						}
						return true;
					},

					/**
					 * @inheritdoc Terrasoft.BaseMessagePublisherPage#init
					 * @overridden
					 */
					init: function() {
						this.mixins.MessagePublisherAttachmentUtilities.init.call(this);
						this.set("entitiesList", this.Ext.create("Terrasoft.Collection"));
						this.initImageUrlTpl();
						this.callParent(arguments);
						this.on("change:SenderEnum", this.setSenderFromSenderEnum, this);
						this.initDefaultControlsValues();
						this.setDefaultSenderEnum();
						this.initAttachmentsViewData();
						this.initCollection();
						this.sandbox.subscribe("SendListenerEmailData", this.setListenerEmailData, this, [this.sandbox.id]);
						this.setSectionProperties();
						this.subscribeMessages();
						this.sandbox.publish("EmailMessagePageLoaded", null, [this.sandbox.id]);
					},

					/**
					 * Sets properties from current section.
					 * @protected
					 */
					setSectionProperties: function() {
						var columns = ["entitySchemaName"];
						var columnValues = this.sandbox.publish("GetPropertiesByName", columns, [this.sandbox.id]);
						this.set("SectionEntitySchemaName", columnValues.entitySchemaName);
					},

					/**
					 * Initialize default recipient values.
					 * @protected
					 */
					setDefaultRecepient: function() {
						var config = this.getListenerRecordData();
						if (!config) {
							return;
						}
						if (config.additionalInfo && config.additionalInfo.recepient) {
							this.set("Recepient", config.additionalInfo.recepient);
						} else {
							this.set("Recepient", null);
						}
					},

					/**
					 * Initialize default controls values.
					 * @protected
					 */
					initDefaultControlsValues: function() {
						this.set("SenderEnumList", this.Ext.create("Terrasoft.Collection"));
						this.set("CopyRecepient", "");
						this.set("BlindCopyRecepient", "");
						this.setDefaultRecepient();
						if (!this.get("Images")) {
							this.set("Images", this.Ext.create("Terrasoft.BaseViewModelCollection"));
						}
					},

					/**
					 * @inheritdoc Terrasoft.BaseMessagePublisherPage#onDashboardRealoaded
					 * @override
					 */
					onDashboardRealoaded: function() {
						this.setDefaultRecepient();
						this.setDefaultSubject();
					},

					/**
					 * Initialize default email subject.
					 * @protected
					 */
					setDefaultSubject: function() {
						let config = this.getListenerRecordData();
						if (!config) {
							return;
						}
						if (config.additionalInfo && config.additionalInfo.title) {
							this.set("Title", config.additionalInfo.title);
						} else {
							this.set("Title", null);
						}
					},

					/**
					 * Fill e-mail senders list.
					 * @protected
					 */
					loadSenders: function() {
						var list = arguments[1];
						if (list === null) {
							return;
						}
						list.clear();
						var selectMailboxSyncSettings = this.getSenderQuery();
						selectMailboxSyncSettings.getEntityCollection(function(result) {
							var columns = {};
							if (result.success) {
								result.collection.collection.each(function(item) {
									var lookupValue = this.getLookupValue(item);
									lookupValue = this.getItemWithSignature(lookupValue, item);
									var itemId = item.get("Id");
									if (!list.contains(itemId)) {
										columns[itemId] = lookupValue;
									}
								}, this);
								list.loadAll(columns);
							}
						}, this);
					},

					/**
					 * Gets column display value of given mailbox sync settings item.
					 * @protected
					 * @param {Terrasoft.Entity} item Mailbox sync settings item.
					 * @return {String} Column display value.
					 */
					getColumnDisplayValue: function(item) {
						var senderDisplayValue = item.get("SenderDisplayValue");
						var ownerName = this.isNotEmpty(senderDisplayValue) ||
							item.get("MailServer.Type.Id") === ExchangeNUIConstants.MailServer.Type.Exchange
								? senderDisplayValue
								: item.get("SysAdminUnit.Contact.Name");
						return this.Ext.String.format(
								this.get("Resources.Strings.EmailFormatString"),
								ownerName,
								item.get("SenderEmailAddress")).trim();
					},

					/**
					 * @inheritdoc Terrasoft.BaseMessagePublisherPage#getServiceConfig
					 * @overridden
					 */
					getServiceConfig: function() {
						return {
							className: "Terrasoft.Configuration.ActivityEmailMessagePublisher"
						};
					},

					/**
					 * Opens e-mail's recepients lookup page.
					 * @protected
					 */
					openRecepientLookupEmail: function() {
						var lookup = this.getLookupConfig("Recepient");
						lookup.config.actionsButtonVisible = false;
						var searchValue = this.get("RecepientLookupSearchValue");
						if (searchValue) {
							lookup.config.searchValue = searchValue;
						}
						LookupUtilities.Open(this.sandbox, lookup.config, lookup.callback, this, null, false, false);
					},

					/**
					 * Opens e-mail's copy recepients lookup page.
					 * @protected
					 */
					openCopyRecepientLookupEmail: function() {
						var lookup = this.getLookupConfig("CopyRecepient");
						lookup.config.actionsButtonVisible = false;
						LookupUtilities.Open(this.sandbox, lookup.config, lookup.callback, this, null, false, false);
					},

					/**
					 * Opens e-mail's blind copy recepients lookup page.
					 * @protected
					 */
					openBlindCopyRecepientLookupEmail: function() {
						var lookup = this.getLookupConfig("BlindCopyRecepient");
						LookupUtilities.Open(this.sandbox, lookup.config, lookup.callback, this, null, false, false);
					},

					/**
					 * Sets email data by default.
					 * @protected
					 * @param {Object} data Email data from Listener.
					 */
					setListenerEmailData: function(data) {
						var recipient = this.get("Recepient");
						if (data && data.emailTitle) {
							if (this.Ext.isEmpty(this.get("Title"))) {
								this.set("Title", data.emailTitle);
							}
							this.set("IsTitleEnabled", false);
						}
						if (recipient) {
							return;
						}
						this.setRecipientValue(data);
					},

					/**
					 * Sets Recepient data by default.
					 * @param {Object} data Email data from Listener.
					 */
					setRecipientValue: function(data) {
						if (data && data.email) {
							this.set("Recepient", data.email);
						} else if (data && data.searchValue) {
							this.set("Recepient", "");
							this.set("RecepientLookupSearchValue", data.searchValue);
						} else {
							this.set("Recepient", "");
						}
					},

					/**
					 * Set default sender.
					 * @param {Object} Mailbox query result.
					 * @protected
					 */
					setDefaultSenderMailbox: function(result) {
						result.collection.collection.each(function(item) {
							var lookupValue = this.getLookupValue(item);
							lookupValue = this.getItemWithSignature(lookupValue, item);
							var senderEnum = this.get("SenderEnum");
							if (item.get("SendEmailsViaThisAccount") &&
									this.isEmpty(senderEnum) && item.get("IsDefault")) {
								this.set("SenderEnum", lookupValue);
							}
						}, this);
					},

					/**
					 * Gets lookup value.
					 * @protected
					 * @param {Terrasoft.Entity} item Mailbox sync settings item.
					 * @returns {Object} Lookup value.
					 */
					getLookupValue: function (item) {
						var columnDisplayValue = this.getColumnDisplayValue(item);
						var lookupValue = {
							displayValue: columnDisplayValue,
							value: item.get("Id")
						};
						return lookupValue;
					},

					/**
					 * Sets sender list with default values.
					 * @protected
					 */
					setDefaultSenderEnum: function() {
						var selectMailboxSyncSettings = this.getSenderQuery();
						selectMailboxSyncSettings.getEntityCollection(function(result) {
							if (result.success) {
								this.setDefaultSenderMailbox(result);
							} else {
								var buttonsConfig = {
									buttons: [this.Terrasoft.MessageBoxButtons.YES.returnCode,
										this.Terrasoft.MessageBoxButtons.NO.returnCode],
									defaultButton: 0,
									caption: this.get("Resources.Strings.AddEmailForUserQuestion")
								};
								var buildType = ConfigurationConstants.BuildType.Public;
								this.Terrasoft.SysSettings.querySysSettingsItem("BuildType", function(sysSettingValue) {
									if (sysSettingValue && sysSettingValue.value === buildType) {
										this.showInformationDialog(this.get("Resources.Strings.MailboxDoesntExist"));
									} else {
										this.showInformationDialog(
												this.get("Resources.Strings.AddEmailForUserQuestion"),
												this.addEmailForUser, buttonsConfig, this);
									}
								}, this);
							}
						}, this);
					},

					/**
					 *Allows user specify email box.
					 * @protected
					 * @param {String} result Dialog window bitton code.
					 */
					addEmailForUser: function(result) {
						if (result === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
							this.sandbox.publish("PushHistoryState", {hash: "MailboxSynchronizationSettingsModule"});
						}
					},

					/**
					 * Generates settings required to display lookup page.
					 * @protected
					 * @param {String} columnName Column name for which lookup value needed to be selected.
					 * @return {Object} Settings configuration.
					 */
					getLookupConfig: function(columnName) {
						var scope = this;
						var callback = function(args) {
							scope.onLookupSelected(args);
						};
						return {
							config: {
								entitySchemaName: "VwRecepientEmail",
								columnName: columnName,
								columns: ["ContactId"],
								filters: this.Terrasoft.createColumnIsNotNullFilter("ContactId"),
								multiSelect: true
							},
							callback: callback
						};
					},

					/**
					 * Triggered when lookup values is selected.
					 * @param {Object} args Selected lookup value.
					 */
					onLookupSelected: function(args) {
						var ext = this.Ext;
						var columnName = args.columnName;
						var isContactEmpty = ext.isEmpty(this.get("Contact"));
						var items = args.selectedRows.collection.items;
						this.recepientCollection = this.recepientCollection || [];
						var collection = this.recepientCollection;
						var columnValue = this.get(columnName);
						if (ext.isEmpty(columnValue)) {
							columnValue = "";
						} else {
							columnValue = columnValue.trim();
							var addSymbol = "";
							var symbol = columnValue[columnValue.length - 1];
							if (symbol === ";") {
								addSymbol = " ";
							} else {
								addSymbol = "; ";
							}
							columnValue = columnValue + addSymbol;
						}
						this.Terrasoft.each(items, function(item) {
							var contactId = item.ContactId;
							if (isContactEmpty && ext.isEmpty(columnValue) && columnName === "Recepient") {
								isContactEmpty = false;
							}
							var displayValue = item.displayValue;
							if (collection.indexOf(contactId) < 0) {
								collection.push(contactId);
							}
							var idx = columnValue.indexOf(displayValue + ";");
							if (idx !== 0 && idx < 0) {
								columnValue += displayValue + "; ";
							}
						}, this);
						this.set(columnName, columnValue);
					},

					/**
					 * Create inserts parameters for entity.
					 * @private
					 */
					createInsertQueryWithParameters: function() {
						var insert = this.Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: this.entitySchemaName
						});
						insert.setParameterValue("Id", this.get("PrimaryColumnValue"),
								this.Terrasoft.DataValueType.GUID);
						insert.setParameterValue("Title", this.get("Resources.Strings.DraftBodyMessage"),
								this.Terrasoft.DataValueType.TEXT);
						insert.setParameterValue("Type", ConfigurationConstants.Activity.Type.Email,
								this.Terrasoft.DataValueType.GUID);
						insert.setParameterValue("EmailSendStatus", ConfigurationConstants.Activity.EmailSendStatus.NotSended,
								this.Terrasoft.DataValueType.GUID);
						return insert;
					},

					/**
					 * Inserts entity.
					 * @private
					 */
					insertEntity: function() {
						var insert = this.createInsertQueryWithParameters();
						insert.execute(function(response) {
							if (response && response.success) {
								this.set("IsInserted", response.success);
								this.uploadFile();
							}
						}, this);
					},

					/**
					 * Returns attachment view config.
					 * @protected
					 * @virtual
					 * @param {Object} itemConfig Attachment config.
					 */
					getItemViewConfig: function(itemConfig) {
						var fullViewConfig = this.get("AttachmentViewConfig");
						if (fullViewConfig.length > 0) {
							var attachmentWrapContainerIndex = 0;
							for (var i = 0; i < fullViewConfig.length; i++) {
								if (fullViewConfig[i].id === "AttachmentWrapContainer") {
									attachmentWrapContainerIndex = i;
									break;
								}
							}
							itemConfig.config = fullViewConfig[attachmentWrapContainerIndex];
						}
						var activityFile = arguments[1];
						if (activityFile) {
							var fileName = activityFile.get("Name");
							var fileTypes = this.get("FileTypes");
							if (!fileTypes) {
								return;
							}
							var imageType = /^image/;
							var fileType = fileTypes[fileName];
							if (fileType && fileType.match(imageType)) {
								var fileId = activityFile.get("Id");
								var activityFileSchemaUId = ConfigurationConstants.SysSchema.ActivityFile;
								var image = this.Ext.create("Terrasoft.BaseViewModel", {
									values: {
										fileName: fileName,
										url: "../rest/FileService/GetFile/" + activityFileSchemaUId + "/" + fileId
									}
								});
								var imagesCollection = this.get("Images");
								if (imagesCollection) {
									imagesCollection.add(imagesCollection.getUniqueKey(), image);
								}
							}
						}
					},

					/**
					 * Template button click event handler.
					 * @protected
					 */
					onTemplateButtonClick: function() {
						this.saveMasterEntity(this.onOpenEmailTemplate, this);
					},

					/**
					 * Processes response with text template.
					 * @protected
					 * @virtual
					 * @param {Object} response Response with text template.
					 */
					processResponse: function(response) {
						this.hideBodyMask();
						if (this.validateResponse(response)) {
							if (this._isEmailTemplateMultiLanguage()) {
								var emailBody = response.textTemplate + this.get("InReplyToEmailBody");
								this.applyTemplate(emailBody);
								this.applySubjectTemplate(response.subjectTemplate);
								this.set("InReplyToEmailBody", this.Ext.emptyString);
							} else {
								this.applyTemplate(response.textTemplate);
							}
						}
					},

					/**
					 * Applies text template.
					 * @protected
					 * @virtual
					 * @param {String} textTemplate Text template.
					 */
					applyTemplate: function(textTemplate) {
						var signature = this.get("Signature");
						var useSignature = this.get("UseSignature");
						var body = textTemplate;
						if (this.isSignatureExist(useSignature, signature)) {
							body = body.concat(signature);
						}
						this.set("Body", body);
					},

					/**
					 * Applies template subject.
					 * @protected
					 * @virtual
					 * @param {String} subjectTemplate Subject template.
					 */
					applySubjectTemplate: function(subjectTemplate) {
						if (this.Ext.isEmpty(this.get("Title"))) {
							this.set("Title", subjectTemplate);
						}
					},

					/**
					 * @inheritDoc Terrasoft.ExtendedHtmlEditModuleUtilities#addCallBack
					 * @overridden
					 */
					addCallBack: function(args) {
						var selectedItems = args.selectedRows.getItems();
						var selectedItem = selectedItems.length && selectedItems[0];
						if (!this.Ext.isEmpty(selectedItem)) {
							if (!this.Ext.isEmpty(selectedItem.Subject) && this.get("IsTitleEnabled") &&
									!this._isEmailTemplateMultiLanguage()) {
								this.set("Title", selectedItem.Subject);
							}
							if (!this.Ext.isEmpty(selectedItem.Body)) {
								var requestParams = {
									id: selectedItem.Id,
									body: selectedItem.Body
								};
								this.callMacrosHelperServiceRequest(requestParams);
							}
						}
					},

					/**
					 * Calls service for getting template text with replaced macroses.
					 * @protected
					 * @param {String} textTemplate Config for service.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Callback function's scope.
					 */
					executeMacrosHelperServiceRequest: function(textTemplate, callback, scope) {
						this.showBodyMask();
						var data = this.getListenerRecordData();
						var serviceRequest = this.Ext.create("Terrasoft.MacrosHelperServiceRequest", {
							contractName: "GetTemplate",
							entityId: data.relationSchemaRecordId,
							entityName: data.relationSchemaName,
							textTemplate: textTemplate
						});
						serviceRequest.execute(function(response) {
							callback.call(scope || this, response);
						});
					},

					/**
					 * @inheritdoc Terrasoft.EmailMessagePublisherPage#subscribeMessages
					 * @override
					 */
					subscribeMessages: function() {
						this.callParent(arguments);
						var macrosModuleId = this.getMacrosModuleId();
						this.sandbox.subscribe("MacroSelected", this.onGetMacros, this, [macrosModuleId]);
						this.sandbox.subscribe("SendMacrosData", this.onGetMacrosData, this,
								[this.actionDashboarModuleId()]);
						this.sandbox.subscribe("GetPublisherPageState", this.onGetPublisherPageState, this);
					},

					/**
					 * Get action dashboard module id.
					 * @return {String} module id.
					 */
					actionDashboarModuleId: function() {
						var moduleId = this.sandbox.id;
						return moduleId.replace("_EmailMessagePublisherModule", "");
					},

					/**
					 * Set`s recipient data from history page.
					 * @protected
					 * @virtual
					 * @param {string} recipient data.
					 */
					setRecipientFromHistoryPage: function(historyRecipient) {
						var recipient = !this.Ext.isEmpty(historyRecipient) ? historyRecipient : null;
						this.set("Recepient", recipient);

					},

					/**
					 * Porcesses macros data from history page.
					 * @protected
					 * @virtual
					 * @param {object} macros data.
					 */
					onGetMacrosData: function(args) {
						if (!this.Ext.isEmpty(args)) {
							if (!this.Ext.isEmpty(args.title)) {
								this.set("Title", args.title);
							}
							if (!this.Ext.isEmpty(args.body) || !this.Ext.isEmpty(args.Id)) {
								this.set("InReplyToEmailBody", args.body);
								this.callMacrosHelperServiceRequest(args);
							}
							this.setRecipientFromHistoryPage(args.recepient);
							if (!this.Ext.isEmpty(args.copyRecepient)) {
								this.set("isCopyRecipientVisible", true);
								this.set("CopyRecepient", args.copyRecepient);
							}
						}
					},

					/**
					 * Calls service for getting template text with replaced macroses.
					 * @protected
					 * @virtual
					 * @param {Object} args Macros data.
					 */
					callMacrosHelperServiceRequest: function(args) {
						if (this._isEmailTemplateMultiLanguage()) {
							this.executeMultiLanguageMacrosHelperServiceRequest(args, this.processResponse, this);
						} else {
							this.executeMacrosHelperServiceRequest(args.body, this.processResponse, this);
						}
					},

					/**
					 * Calls service for getting multilanguage template with replaced macroses.
					 * @protected
					 * @param {Object} args object with params for service.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Callback function's scope.
					 */
					executeMultiLanguageMacrosHelperServiceRequest: function(args, callback, scope) {
						this.showBodyMask();
						var data = this.getListenerRecordData();
						var serviceRequest = this.Ext.create("Terrasoft.MacrosHelperServiceRequest", {
							contractName: "GetMultiLanguageTextTemplate",
							entityId: data.relationSchemaRecordId,
							entityName: data.relationSchemaName,
							templateId: args.id
						});
						serviceRequest.execute(function(response) {
							callback.call(scope || this, response);
						});
					},

					/**
					 * Check feature status.
					 * @private
					 * @return {Boolean} feature state.
					 */
					_isEmailTemplateMultiLanguage: function() {
						return this.getIsFeatureEnabled("EmailTemplateMultiLanguageInActionDashBoard");
					},

					/**
					 * Image pasted event handler. Pasts to email body image pasted from buffer.
					 * @private
					 * @param {Object} item Pasted from buffer file config object.
					 */
					onImagePasted: function(item) {
						var file = null;
						if (item && typeof item.getAsFile === "function") {
							file = item.getAsFile();
						}
						var callback = this.onComplete.bind(this);
						var args = [file, this.get("PrimaryColumnValue"), callback, this];
						if (this.get("IsInserted")) {
							this.insertImageFromBuffer(args);
							return;
						}
						var insert = this.createInsertQueryWithParameters();
						insert.execute(function(response) {
							if (response && response.success) {
								this.set("IsInserted", true);
								this.insertImageFromBuffer(args);
							}
						}, this);
					},

					/**
					 * Processes adding macros event.
					 * @protect
					 * @virtual
					 * @param {String} macrosType Macros type.
					 */
					onMacroButtonClicked: function(macrosType) {
						switch (macrosType) {
							case "macros":
								this.saveMasterEntity(this.openMacrosPage, this);
								break;
							case "column":
								this.saveMasterEntity(this.openMacrosColumnsPage, this);
								break;
							default:
								throw this.Ext.create("Terrasoft.UnsupportedTypeException " + macrosType);
						}
					},

					/**
					 * Opens entity structure explorer module for select column macros.
					 * @protected
					 * @virtual
					 */
					openMacrosColumnsPage: function() {
						var data = this.getListenerRecordData();
						this.Terrasoft.StructureExplorerUtilities.open({
							scope: this,
							handlerMethod: this.onMacrosColumnSelected,
							moduleConfig: {
								useBackwards: false,
								schemaName: data.relationSchemaName
							}
						});
					},

					/**
					 * It processes the macros.
					 * @protected
					 * @virtual
					 * @param {String} macros Macros.
					 */
					onGetMacros: function(macros) {
						this.set("SelectedText", macros);
						this.executeMacrosHelperServiceRequest(this.get("Body"), this.processResponse, this);
					},

					/**
					 * @inheritdoc Terrasoft.BaseMessagePublisherPage#isNeedToBePublished
					 * @overridden
					 */
					isNeedToBePublished: function() {
						return Boolean(this.get("Body"));
					},

					/**
					 * Returns need sanitize html in html editor.
					 * @return {Boolean} Need sanitize html in html editor.
					 */
					getNeedSanitizeHtml: function() {
						return this.getIsFeatureEnabled("SanitizeHtmlInActionDashboard");
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "PublishButton",
						"values": {
							"caption": {
								"bindTo": "Resources.Strings.SendButtonCaption"
							}
						}
					},
					{
						"operation": "insert",
						"name": "EmailSyncErrors",
						"propertyName": "items",
						"parentName": "ModulePageContainer",
						"index": 1,
						"values": {
							"itemType": Terrasoft.ViewItemType.MODULE,
							"classes": {"wrapClassName": ["sync-settings-errors","email-publisher-sync-errors"]},
							"moduleName": "BaseSchemaModuleV2",
							"instanceConfig": {
								"isSchemaConfigInitialized": true,
								"schemaName": "SyncSettingsErrors",
								"useHistoryState": false
							}
						}
					},
					{
						"operation": "insert",
						"propertyName": "items",
						"parentName": "LayoutContainer",
						"name": "MainGridLayout",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": []
						},
						"index": 0
					},
					{
						"operation": "insert",
						"parentName": "MainGridLayout",
						"propertyName": "items",
						"name": "SenderEnum",
						"values": {
							"layout": {
								"column": 15,
								"row": 0,
								"colSpan": 9
							},
							"bindTo": "SenderEnum",
							"controlConfig": {
								"className": "Terrasoft.ComboBoxEdit",
								"list": {
									"bindTo": "SenderEnumList"
								},
								"prepareList": {
									"bindTo": "loadSenders"
								}
							},
							"markerValue": "From"
						}
					},
					{
						"operation": "insert",
						"parentName": "MainGridLayout",
						"propertyName": "items",
						"name": "Recepient",
						"values": {
							"bindTo": "Recepient",
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 11
							},
							"controlConfig": {
								"className": "Terrasoft.TextEdit",
								"rightIconClasses": ["custom-right-item", "lookup-edit-right-icon"],
								"rightIconClick": {
									"bindTo": "openRecepientLookupEmail"
								}
							},
							"markerValue": "To"
						}
					},
					{
						"operation": "insert",
						"parentName": "MainGridLayout",
						"propertyName": "items",
						"name": "ToggleCopyRecipientVisible",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.BUTTON,
							"caption": {
								"bindTo": "Resources.Strings.CC"
							},
							"layout": {
								"column": 11,
								"row": 0,
								"colSpan": 1
							},
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"click": {
								"bindTo": "fieldVisibleToggleClick"
							},
							"tag": "isCopyRecipientVisible",
							"markerValue": "CC"
						}
					},
					{
						"operation": "insert",
						"parentName": "MainGridLayout",
						"propertyName": "items",
						"name": "ToggleBlindCopyRecipientVisible",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.BUTTON,
							"classes": {
								"textClass": ["bcc-button-text"]
							},
							"caption": {
								"bindTo": "Resources.Strings.BCC"
							},
							"layout": {
								"column": 12,
								"row": 0,
								"colSpan": 2
							},
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"click": {
								"bindTo": "fieldVisibleToggleClick"
							},
							"tag": "isBlindCopyRecipientVisible",
							"markerValue": "BCC"
						}
					},
					{
						"operation": "insert",
						"parentName": "LayoutContainer",
						"propertyName": "items",
						"name": "CopyRecepient",
						"values": {
							"bindTo": "CopyRecepient",
							"controlConfig": {
								"className": "Terrasoft.TextEdit",
								"rightIconClasses": ["custom-right-item", "lookup-edit-right-icon"],
								"rightIconClick": {
									"bindTo": "openCopyRecepientLookupEmail"
								}
							},
							"visible": {
								"bindTo": "isCopyRecipientVisible"
							}
						},
						"index": 1
					},
					{
						"operation": "insert",
						"parentName": "LayoutContainer",
						"propertyName": "items",
						"name": "BlindCopyRecepient",
						"values": {
							"bindTo": "BlindCopyRecepient",
							"controlConfig": {
								"className": "Terrasoft.TextEdit",
								"rightIconClasses": ["custom-right-item", "lookup-edit-right-icon"],
								"rightIconClick": {
									"bindTo": "openBlindCopyRecepientLookupEmail"
								}
							},
							"visible": {
								"bindTo": "isBlindCopyRecipientVisible"
							}
						},
						"index": 2
					},
					{
						"operation": "insert",
						"parentName": "LayoutContainer",
						"propertyName": "items",
						"name": "Title",
						"values": {
							"bindTo": "Title",
							"caption": {
								"bindTo": "Resources.Strings.EmailTitleCaption"
							},
							"controlConfig": {
								"className": "Terrasoft.TextEdit"
							},
							"markerValue": "Title",
							"enabled": {
								"bindTo": "IsTitleEnabled"
							}
						},
						"index": 3
					},
					{
						"operation": "insert",
						"name": "Body",
						"values": {
							"contentType": this.Terrasoft.ContentType.RICH_TEXT,
							"generator": "InlineTextEditViewGenerator.generate",
							"labelConfig": {
								"visible": true
							},
							"markerValue": "Body",
							"placeholder": {
								"bindTo": "Resources.Strings.WriteEmailPostHint"
							},
							"selectedText": {
								"bindTo": "SelectedText"
							},
							"controlConfig": {
								"macrobuttonclicked": {
									"bindTo": "onMacroButtonClicked"
								},
								"inlineTextControlConfig": {
									"ckeditorDefaultConfig": {
										"allowedContent": true,
										"removeButtons": "bpmonlinemacros,bpmonlineemailtemplatelink",
										"keystrokes": [
											[CKEDITOR.CTRL + 75, "link"] // CTRL + K
										]
									}
								},
								"showEmailTemplateLinkButton": false,
								"hasFullScreen": true,
								"hasTableEdit": Terrasoft.Features.getIsEnabled("CKeditorTableEdit"),
								"images": {
									"bindTo": "Images"
								},
								"imagePasted": {
									"bindTo": "onImagePasted"
								},
								"sanitizeHtml": {
									"bindTo": "getNeedSanitizeHtml"
								}
							}
						},
						"parentName": "BodyContainer",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "AttachFileButton",
						"propertyName": "items",
						"parentName": "PublisherBottomContainer",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.BUTTON,
							"style": this.Terrasoft.controls.ButtonEnums.style.DEFAULT,
							"iconAlign": this.Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
							"imageConfig": {
								"bindTo": "getAttachFileButtonImageConfig"
							},
							"tag": "attachFileButton",
							"fileUpload": true,
							"filesSelected": {"bindTo": "onAttachFileSelected"},
							"enabled": {
								"bindTo": "IsPublishButtonEnabled"
							},
							"click": {
								"bindTo": "onAttachFileButtonClick"
							},
							"classes": {
								"imageClass": ["attachFileButtonImage"]
							},
							"markerValue": "AttachFileButton"
						}
					},
					{
						"operation": "insert",
						"name": "TemplateButton",
						"propertyName": "items",
						"parentName": "PublisherBottomContainer",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.BUTTON,
							"imageConfig": {
								"bindTo": "Resources.Images.TemplateButtonImage"
							},
							"hint": {
								"bindTo": "Resources.Strings.TemplateButtonCaption"
							},
							"enabled": {
								"bindTo": "IsPublishButtonEnabled"
							},
							"click": {
								"bindTo": "onTemplateButtonClick"
							}
						}
					},
					{
						"operation": "insert",
						"name": "FilesList",
						"parentName": "ModulePageContainer",
						"propertyName": "items",
						"values": {
							"generateId": false,
							"generator": "ConfigurationItemGenerator.generateContainerList",
							"idProperty": "Id",
							"collection": "FilesList",
							"onGetItemConfig": "getItemViewConfig",
							"isAsync": true
						}
					}
				]/**SCHEMA_DIFF*/
			};
		});

define('EmailMessagePublisherPageEmailsSearchResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("EmailMessagePublisherPageEmailsSearch", ["EmailsSearchMixin", "RecipientsSearchLookupEdit"],
		function() {
			return {
				entitySchemaName: "Activity",
				mixins: {
					/**
					 * Mixin using to Elasticsearch for seacrh emails.
					 */
					EmailsSearchMixin: "Terrasoft.EmailsSearchMixin"
				},
				attributes: {
					/**
					 * Copy recipient lookup.
					 */
					"CopyRecipient": {
						"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
						"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"referenceSchemaName": "VwRecepientEmail"
					},

					/**
					 * Blind copy recipient lookup.
					 */
					"BlindCopyRecipient": {
						"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
						"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"referenceSchemaName": "VwRecepientEmail"
					},

					/**
					 * Recipient lookup.
					 */
					"Recipient": {
						"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
						"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"referenceSchemaName": "VwRecepientEmail"
					}
				},
				methods: {

					// region Method: Protected

					/**
					 * Set recipient from string.
					 * @protected
					 * @param {String} emails
					 * @param lookupName
					 */
					setRecipient: function(emails, lookupName) {
						if(Ext.isEmpty(emails)){
							return;
						}
						emails.split(this.emailSeparate).forEach(function(email){
							if (!Ext.isEmpty(email)) {
								var lookupValue = this.createLookupValue(email, email);
								this.saveLookupValues(lookupValue, lookupName);
								this.setLookupValues(lookupValue, lookupName);
							}
						}, this);
					},

					/**
					 * @inheritdoc Terrasoft.EmailMessagePublisherPage#init
					 * @overridden
					 */
					init: function() {
						this.callParent(arguments);
						this.set("To", "To");
						this.set("Cc", "Cc");
						this.set("Bcc", "Bcc");
					},

					/**
					 * @inheritdoc Terrasoft.BaseMessagePublisherPage#onPublished
					 * @overridden
					 */
					onPublished: function() {
						this.callParent(arguments);
						if (this.isFeatureEmailsSearchDisabled()) {
							return;
						}
						Terrasoft.each(["Recipient", "CopyRecipient", "BlindCopyRecipient"], this.clearLookup, this);
					},

					/**
					 * @inheritdoc Terrasoft.EmailMessagePublisherPage#setDefaultRecepient
					 * @overridden
					 */
					setDefaultRecepient: function() {
						if (this.isFeatureEmailsSearchDisabled()) {
							this.callParent(arguments);
							return;
						}
						var config = this.getListenerRecordData();
						if (!config) {
							return;
						}
						var lookupName = "Recipient";
						var info = config.additionalInfo;
						var lookupValue = null;
						if (info && info.recepient) {
							var recipient = info.recepient;
							var email = this.getEmailFromText(recipient);
							var emailWitName = this.getPreparedEmailWithName(recipient);
							if (email) {
								lookupValue = this.createLookupValue(emailWitName, emailWitName);
								this.saveLookupValues(lookupValue, lookupName);
							}
						}
						this.setLookupValues(lookupValue, lookupName);
					},

					/**
					 * @inheritdoc Terrasoft.EmailMessagePublisherPage#setRecipientValue
					 * @overridden
					 */
					setRecipientValue: function(data) {
						this.callParent(arguments);
						if (this.isFeatureEmailsSearchDisabled()) {
							return;
						}
						var email =  data && (data.email || data.searchValue);
						this.setRecipient(email, "Recipient");
					},

					/**
					 * @inheritdoc Terrasoft.EmailMessagePublisherPage#onGetMacrosData
					 * @overridden
					 */
					onGetMacrosData: function(args) {
						this.callParent(arguments);
						if (this.isFeatureEmailsSearchDisabled()) {
							return;
						}
						this.setRecipient(args.recepient, "Recipient");
						this.setRecipient(args.copyRecepient, "CopyRecipient");
					},

					/**
					 * @inheritdoc Terrasoft.BaseSchemaViewModel#onLookupResult
					 * @override
					 */
					onLookupResult: function(args) {
						if (this.isFeatureEmailsSearchDisabled()) {
							this.callParent(arguments);
							return;
						}
						if (args && args.selectedRows && args.columnName) {
							var columnName = args.columnName;
							var currentLookup = this.getCurrentLookupConfig(columnName);
							var oldValues = currentLookup.oldValues;
							var displayValues = args.selectedRows.getItems().map(function(item) {
								var email = item.Email;
								if (!oldValues.contains(email)) {
									oldValues.add(email, email);
								}
								return email;
							});
							var lookupItem = {
								value: displayValues.pop(),
								displayValue: this.getActualDisplayValue(columnName)
							};
							currentLookup.lookupValue = lookupItem;
							this.setLookupValues(lookupItem, columnName);
						}
					},

					/**
					 * @inheritdoc Terrasoft.LookupQuickAddMixin#getLookupPageConfig
					 * @override
					 */
					getLookupPageConfig: function() {
						var config = this.callParent(arguments);
						if (this.isFeatureEmailsSearchEnabled()) {
							config.multiSelect = true;
						}
						return config;
					}

					// endregion

				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"propertyName": "items",
						"parentName": "MainGridLayout",
						"name": "ToContainer",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.CONTAINER,
							"items": [],
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 11
							}
						}
					},
					{
						"operation": "remove",
						"name": "Recepient"
					},
					{
						"operation": "insert",
						"parentName": "ToContainer",
						"propertyName": "items",
						"name": "Recepient",
						"values": {
							"bindTo": "Recepient",
							"controlConfig": {
								"className": "Terrasoft.TextEdit",
								"rightIconClasses": ["custom-right-item", "lookup-edit-right-icon"],
								"rightIconClick": {
									"bindTo": "openRecepientLookupEmail"
								}
							},
							"visible": {
								"bindTo": "isFeatureEmailsSearchDisabled"
							},
							"markerValue": "To"
						}
					},
					{
						"operation": "insert",
						"propertyName": "items",
						"parentName": "ToContainer",
						"name": "Recipient",
						"values": {
							"controlConfig": {
								"className": "Terrasoft.RecipientsSearchLookupEdit",
								"prepareList": {
									"bindTo": "callSearchService"
								},
								"href": "",
								"change": {
									"bindTo": "saveLookupValues"
								},
								"value": {
									"bindConfig": {
										"converter": "convertLookupValue"
									}
								},
								"blur": {
									"bindTo": "onLookupBlur"
								},
								"cleariconclick": {
									"bindTo": "clearLookup"
								}
							},
							"labelConfig": {
								"caption": {"bindTo": "Resources.Strings.RecipientCaption"},
							},
							"markerValue": {
								"bindTo": "To"
							},
							"visible": {
								"bindTo": "isFeatureEmailsSearchEnabled"
							}
						}
					},
					{
						"operation": "insert",
						"propertyName": "items",
						"parentName": "LayoutContainer",
						"name": "CopyRecipientContainer",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.CONTAINER,
							"items": [],
							"visible": {
								"bindTo": "isCopyRecipientVisible"
							}
						},
						"index": 1
					},
					{
						"operation": "move",
						"parentName": "CopyRecipientContainer",
						"propertyName": "items",
						"name": "CopyRecepient"
					},
					{
						"operation": "merge",
						"parentName": "CopyRecipientContainer",
						"name": "CopyRecepient",
						"values": {
							"visible": {
								"bindTo": "isFeatureEmailsSearchDisabled"
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "CopyRecipientContainer",
						"name": "CopyRecipient",
						"propertyName": "items",
						"values": {
							"controlConfig": {
								"className": "Terrasoft.RecipientsSearchLookupEdit",
								"prepareList": {
									"bindTo": "callSearchService"
								},
								"href": "",
								"change": {
									"bindTo": "saveLookupValues"
								},
								"value": {
									"bindConfig": {
										"converter": "convertLookupValue"
									}
								},
								"blur": {
									"bindTo": "onLookupBlur"
								},
								"cleariconclick": {
									"bindTo": "clearLookup"
								}
							},
							"labelConfig": {
								"caption": {"bindTo": "Resources.Strings.CopyRecepientCaption"},
							},
							"visible": {
								"bindTo": "isFeatureEmailsSearchEnabled"
							},
							"markerValue": {
								"bindTo": "Cc"
							}
						}
					},
					{
						"operation": "insert",
						"propertyName": "items",
						"parentName": "LayoutContainer",
						"name": "BlindCopyRecipientContainer",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.CONTAINER,
							"items": [],
							"visible": {
								"bindTo": "isBlindCopyRecipientVisible"
							}
						},
						"index": 2
					},
					{
						"operation": "move",
						"parentName": "BlindCopyRecipientContainer",
						"propertyName": "items",
						"name": "BlindCopyRecepient"
					},
					{
						"operation": "merge",
						"name": "BlindCopyRecepient",
						"values": {
							"visible": {
								"bindTo": "isFeatureEmailsSearchDisabled"
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "BlindCopyRecipientContainer",
						"name": "BlindCopyRecipient",
						"propertyName": "items",
						"values": {
							"controlConfig": {
								"className": "Terrasoft.RecipientsSearchLookupEdit",
								"prepareList": {
									"bindTo": "callSearchService"
								},
								"href": "",
								"change": {
									"bindTo": "saveLookupValues"
								},
								"value": {
									"bindConfig": {
										"converter": "convertLookupValue"
									}
								},
								"blur": {
									"bindTo": "onLookupBlur"
								},
								"cleariconclick": {
									"bindTo": "clearLookup"
								}
							},
							"labelConfig": {
								"caption": {"bindTo": "Resources.Strings.BlindCopyRecepientCaption"},
							},
							"visible": {
								"bindTo": "isFeatureEmailsSearchEnabled"
							},
							"markerValue":  {
								"bindTo": "Bcc"
							}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		});
define("EmailMessagePublisherPage", [],
	function() {
		return {
			entitySchemaName: "Activity",
			messages: {
				/**
				 * @message GetColumnsValues
				 * Returns requested column values.
				 */
				"GetColumnsValues": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message UpdateEmailSender
				 * Tells that email sender has to be updated.
				 */
				"UpdateEmailSender": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.EmailMessagePublisherPage#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					if (this._isCaseSchema()) {
						this.loadRecipients(this.setSenderMailbox, this);
					}
				},

				/**
				 * Loads case parent activity recipients.
				 * @private
				 * @param {Function} callback Callback.
				 * @param {Object} scope Scope.
				 */
				loadRecipients: function(callback, scope) {
					var recipients = "";
					var esq = this.createRecipientsEsq();
					esq.getEntityCollection(function(response) {
						if (response.success && response.collection.getCount()) {
							var caseItem = response.collection.getItems()[0];
							var array = [caseItem.get("Recipient"), caseItem.get("CC"), caseItem.get("BCC")];
							recipients = array.join(";");
						}
						this.set("Recipients", recipients);
						if (this.Ext.isFunction(callback)) {
							callback.call(scope || this);
						}
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.EmailMessagePublisherPage#setRecipientFromHistoryPage
				 * @overridden
				 */
				setRecipientFromHistoryPage: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.EmailMessagePublisherPage#onGetMacrosData
				 * @overridden
				 */
				onGetMacrosData: function() {
					this.callParent(arguments);
					var recipient = arguments[0].recepient;
					if(!this.Ext.isEmpty(recipient)) {
						this.executeSupportEmailsFilterServiceRequest(recipient,
							this.supportEmailsResponse, this);
					}
				},

				/**
				 * Processes response without support emails.
				 * @protected
				 * @virtual
				 * @param {Object} response Response with filtered emails.
				 */
				supportEmailsResponse: function(response) {
					this.hideBodyMask();
					var emailsWithoutSupportResult = response.GetEmailsWithoutSupportResult;
					if (this.validateResponse(emailsWithoutSupportResult)) {
						var resultEmails = emailsWithoutSupportResult.resultEmails;
						if (this.isFeatureEmailsSearchDisabled()) {
							this.set("Recepient", resultEmails);
						} else {
							this.clearLookup("Recipient");
							this.setRecipient(resultEmails, "Recipient");
						}
					}
				},

				/**
				 * Creates a query to receive case parent activity recipients.
				 * @protected
				 * @virtual
				 * @return {Terrasoft.EntitySchemaQuery} Entity schema query.
				 */
				createRecipientsEsq: function() {
					var caseId = this.getListenerRecordData().relationSchemaRecordId;
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "Case"
					});
					esq.addColumn("ParentActivity.Recepient", "Recipient");
					esq.addColumn("ParentActivity.CopyRecepient", "CC");
					esq.addColumn("ParentActivity.BlindCopyRecepient", "BCC");
					esq.filters.add(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Id", caseId));
					return esq;
				},

				/**
				 * @inheritdoc Terrasoft.EmailMessagePublisherPage#subscribeMessages
				 * @overridden
				 */
				subscribeMessages: function() {
					this.callParent(arguments);
					this.sandbox.subscribe("UpdateEmailSender", this.onUpdateEmailSender, this, [this.sandbox.id]);
				},

				/**
				 * @inheritdoc Terrasoft.EmailMessagePublisherPage#createInsertQueryWithParameters
				 * @overridden
				 */
				createInsertQueryWithParameters: function() {
					var insert = this.callParent(arguments);
					insert.setParameterValue("IsNotPublished", true, Terrasoft.DataValueType.BOOLEAN);
					return insert;
				},

				/**
				 * @inheritdoc Terrasoft.EmailMessagePublisherPage#setDefaultSenderMailbox
				 * @overridden
				 * @remarks This logic doesn't correspond business requirements anymore.
				 */
				setDefaultSenderMailbox: function(result) {
					if (!this._isCaseSchema()) {
						this.callParent([result]);
					}
				},

				/**
				 * Email sender updating message handler.
				 * @private
				 * @param {Object} config
				 * @param {Guid} config.contactId Case contact identifier.
				 * @param {Guid} config.categoryId Case category identifier.
				 */
				onUpdateEmailSender: function(config) {
					this.obtainMailboxSender(this.get("Recipients"), config.contactId, config.categoryId);
				},

				/**
				 * Sets sender mailbox.
				 * @private
				 */
				setSenderMailbox: function() {
					var recipients = this.get("Recipients");
					var contact = this.getMasterEntityParameterValue("Contact");
					var contactId = contact && contact.value;
					var category = this.getMasterEntityParameterValue("Category");
					var categoryId = category && category.value;
					this.obtainMailboxSender(recipients, contactId, categoryId);
				},

				/**
				 * Returns value of the ViewModel parameter.
				 * @private
				 * @param {String} parameterName Name of the ViewModel parameter.
				 * @return {Object} Value.
				 */
				getMasterEntityParameterValue: function(parameterName) {
					var moduleId = this.getDcmActionsDashboardModuleId();
					var result = this.sandbox.publish("GetColumnsValues", [parameterName], [moduleId]);
					return result[parameterName];
				},

				/**
				 * Gets DCM actions dashboard module identifier.
				 * @private
				 * @return {String} Module identifier.
				 */
				getDcmActionsDashboardModuleId: function() {
					return this.sandbox.id.replace("_" + this.sandbox.moduleName, "");
				},

				/**
				 * Obtains sender mailbox.
				 * @private
				 * @param {String} recipients Email recipients, separated by semicolon.
				 * @param {Guid} contactId Case contact entity identifier.
				 * @param {Guid} categoryId Case category entity identifier.
				 */
				obtainMailboxSender: function(recipients, contactId, categoryId) {
					var config = {
						serviceName: "SenderObtainingService",
						methodName: "ObtainSenderMailbox"
					};
					var data = {
						recipients: recipients
					};
					if (contactId) {
						data.contactId = contactId;
					}
					if (categoryId) {
						data.categoryId = categoryId;
					}
					config.data = data;
					this.callService(config, this.setObtainedSenderMailbox, this);
				},

				/**
				 * Sets obtained sender mailbox as an email sender.
				 * @private
				 * @param {Object} response Sender obtaining service response.
				 */
				setObtainedSenderMailbox: function(response) {
					var result = response.ObtainSenderMailboxResult;
					if (result.success) {
						this._getMailboxByName(result.MailboxName);
					}
				},

				/**
				 * Gets mailbox by name.
				 * @private
				 * @param {String} mailboxName Mailbox name.
				 */
				_getMailboxByName: function(mailboxName) {
					var esq = this.getSenderQuery();
					esq.addColumn("MailboxName");
					var nameFilter = esq.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "MailboxName", mailboxName);
					esq.filters.add(nameFilter);
					esq.getEntityCollection(this._handleMailboxByName, this);
				},

				/**
				 * Checks if relation schema name is Case.
				 * @returns {Boolean} True, if relation schema is Case.
				 * @private
				 */
				_isCaseSchema: function() {
					var recordData = this.getListenerRecordData();
					return recordData && recordData.relationSchemaName === "Case";
				},

				/**
				 * Handles entity schema query response with mailboxes filtered by name.
				 * @private
				 * @param {Object} response Entity schema query response.
				 */
				_handleMailboxByName: function(response) {
					if (response && response.success && response.collection.getCount() === 1) {
						var mailbox = response.collection.getItems()[0];
						this.setSenderEnum(mailbox);
					}
				},

				/**
				 * Sets sender mailbox to sender enum.
				 * @private
				 * @param {Terrasoft.Entity} mailbox Mailbox entity.
				 */
				setSenderEnum: function(mailbox) {
					var lookupValue = this.getLookupValue(mailbox);
					lookupValue = this.getItemWithSignature(lookupValue, mailbox);
					this.set("SenderEnum", lookupValue);
				},

				/**
				 * @inheritdoc Terrasoft.EmailMessagePublisherPage#executeMacrosHelperServiceRequest
				 * @overridden
				 */
				executeMacrosHelperServiceRequest: function(textTemplate, callback, scope) {
					this.showBodyMask();
					var recordData = this.getListenerRecordData();
					var config = {
						serviceName: "InvokableMacrosHelperService",
						methodName: "GetTextTemplate",
						data: {
							entitySchemaName: recordData.relationSchemaName,
							recordId: recordData.relationSchemaRecordId,
							textTemplate: textTemplate
						}
					};
					this.callService(config, callback, scope || this);
				},

				/**
				 * @inheritdoc Terrasoft.EmailMessagePublisherPage#executeMultiLanguageMacrosHelperServiceRequest
				 * @overridden
				 */
				executeMultiLanguageMacrosHelperServiceRequest: function(args, callback, scope) {
					this.showBodyMask();
					var data = this.getListenerRecordData();
					var serviceRequest = this.Ext.create("Terrasoft.MacrosHelperServiceRequest", {
						contractName: "GetMultiLanguageTextTemplate",
						entityId: data.relationSchemaRecordId,
						entityName: data.relationSchemaName,
						templateId: args.id
					});
					serviceRequest.serviceName = "InvokableMacrosHelperService";
					serviceRequest.execute(function(response) {
						callback.call(scope || this, response);
					});
				},

				/**
				 * Calls service for getting emails from recipients without support emails.
				 * @protected
				 * @param {String} emails for service.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function's scope.
				 */
				executeSupportEmailsFilterServiceRequest: function(emails, callback, scope) {
					this.showBodyMask();
					var config = {
						serviceName: "SupportEmailsFilterService",
						methodName: "GetEmailsWithoutSupport",
						data: {
							emails: emails
						}
					};
					this.callService(config, callback, scope || this);
				},

				/**
				 * @inheritdoc Terrasoft.EmailMessagePublisherPage#processResponse
				 * @overridden
				 */
				processResponse: function(response) {
					if(this.getIsFeatureEnabled("EmailTemplateMultiLanguageInActionDashBoard")) {
						if(response.GetTextTemplateResult) {
							this.callParent([response.GetTextTemplateResult]);
						} else {
							this.callParent(arguments);
						}
					} else {
						this.callParent([response.GetTextTemplateResult]);
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	}
);


