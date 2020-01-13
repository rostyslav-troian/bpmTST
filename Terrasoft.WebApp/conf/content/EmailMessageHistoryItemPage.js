Terrasoft.configuration.Structures["EmailMessageHistoryItemPage"] = {innerHierarchyStack: ["EmailMessageHistoryItemPageEmailMessage", "EmailMessageHistoryItemPageEmailMessageMining", "EmailMessageHistoryItemPageCaseService", "EmailMessageHistoryItemPage"], structureParent: "BaseEmailMessageHistoryItemPage"};
define('EmailMessageHistoryItemPageEmailMessageStructure', ['EmailMessageHistoryItemPageEmailMessageResources'], function(resources) {return {schemaUId:'3416cf8a-440c-427b-abb5-3d20c6aebb5e',schemaCaption: "EmailMessageHistoryItemPage", parentSchemaName: "BaseEmailMessageHistoryItemPage", schemaName:'EmailMessageHistoryItemPageEmailMessage',parentSchemaUId:'0727ef67-319a-4668-b4f6-3c87cd87442c',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailMessageHistoryItemPageEmailMessageMiningStructure', ['EmailMessageHistoryItemPageEmailMessageMiningResources'], function(resources) {return {schemaUId:'9edb7802-5992-4021-9896-d82301983c01',schemaCaption: "EmailMessageHistoryItemPage", parentSchemaName: "EmailMessageHistoryItemPageEmailMessage", schemaName:'EmailMessageHistoryItemPageEmailMessageMining',parentSchemaUId:'3416cf8a-440c-427b-abb5-3d20c6aebb5e',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"EmailMessageHistoryItemPageEmailMessage",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailMessageHistoryItemPageCaseServiceStructure', ['EmailMessageHistoryItemPageCaseServiceResources'], function(resources) {return {schemaUId:'be27170b-b002-470e-a06b-30938e05f0ea',schemaCaption: "EmailMessageHistoryItemPage", parentSchemaName: "EmailMessageHistoryItemPageEmailMessageMining", schemaName:'EmailMessageHistoryItemPageCaseService',parentSchemaUId:'9edb7802-5992-4021-9896-d82301983c01',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"EmailMessageHistoryItemPageEmailMessageMining",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailMessageHistoryItemPageStructure', ['EmailMessageHistoryItemPageResources'], function(resources) {return {schemaUId:'f7b08d29-05fc-48f8-a368-c9f2a77e9737',schemaCaption: "EmailMessageHistoryItemPage", parentSchemaName: "EmailMessageHistoryItemPageCaseService", schemaName:'EmailMessageHistoryItemPage',parentSchemaUId:'be27170b-b002-470e-a06b-30938e05f0ea',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"EmailMessageHistoryItemPageCaseService",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailMessageHistoryItemPageEmailMessageResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("EmailMessageHistoryItemPageEmailMessage", ["ConfigurationConstants", "EmailMessageConstants",
	"NetworkUtilities", "MaskHelper", "EmailHelper", "EmailMessageHistoryItemPageResources",
		"css!EmailMessageHistoryItemStyle"],
		function(ConfigurationConstants, EmailMessageConstants, NetworkUtilities, MaskHelper, EmailHelper, resources) {
			return {
				entitySchemaName: "BaseMessageHistory",
				details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
				attributes: {
					/**
					 * File attachment status.
					 */
					"IsFilesAttached": {
						"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
						"value": false
					},

					/**
					 * @inheritdoc Terrasoft.BaseEmailMessageHistoryPage#ConnectionColumnsPath
					 * @overridden
					 */
					"ConnectionColumnsPath": {
						"dataValueType": this.Terrasoft.DataValueType.TEXT,
						"value": "[Activity:Id:RecordId]"
					}
				},
				messages: {
					/**
					 * @message EmailTemplateLoaded
					 * Informs publisher that loaded EmailTemplate from history page
					 */
					"EmailTemplateLoaded": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				methods: {

					/**
					 * Check feature status.
					 * @private
					 * @return {Boolean} feature state.
					 */
					_isEmailTemplateMultiLanguage: function() {
						return this.getIsFeatureEnabled("EmailTemplateMultiLanguageInActionDashBoard");
					},

					/**
					 * Returns marker for email link image.
					 * @private
					 * @return {String} Marker for email link image.
					 */
					getEmailLinkImageMarker: function() {
						return "EmailLinkImage" + this.get("RecordId");
					},

					/**
					 * Returns an image of the file attachment.
					 * @private
					 * @return {String} Image of the file attachment.
					 */
					getFileAttachmentsImage: function() {
						return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.FileAttachmentsImage"));
					},

					/**
					 * Added columns and filters to collection
					 * @protected
					 */
					getActivityFileEsq: function() {
						var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "ActivityFile"
						});
						esq.addColumn("Name");
						esq.addColumn("Id");
						esq.filters.addItem(esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
								"Activity", this.get("RecordId")));
						esq.filters.addItem(esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
								"Inline", 0));
						return esq;
					},

					/**
					 * Filled collection received from callback getHistoryFiles
					 * @protected
					 */
					getHistoryFilesCallback: function(result, callback, scope) {
						var collection = result.collection;
						if (collection && collection.getCount() > 0) {
							this.set("IsFilesAttached", true);
							var filesConfigs = [];
							this.Terrasoft.each(collection.getItems(), function(item) {
								filesConfigs.push({
									Name: item.get("Name"),
									Id: item.get("Id"),
									SchemaUId: ConfigurationConstants.SysSchema.ActivityFile
								});
							}, this);
							callback.call(scope || this, filesConfigs);
						}
					},

					/**
					 * Get full link for current email edit page.
					 * @protected
					 * @returns {String} url of edit page.
					 */
					getEmailPageHref: function() {
						var urlRelativePart = NetworkUtilities.getEntityUrl("Activity", this.get("RecordId"),
								ConfigurationConstants.Activity.Type.Email);
						return this.Terrasoft.combinePath(this.Terrasoft.workspaceBaseUrl, "Nui", "ViewModule.aspx#" +
								urlRelativePart);
					},

					/**
					 * @inheritdoc Terrasoft.BaseEmailMessageHistoryPage#getNotifierGroup
					 * @overridden
					 */
					getNotifierGroup: function(esq) {
						var filterGroup = esq.createFilterGroup();
						filterGroup.name = "EmailNotifierFilter";
						filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
						filterGroup.add("EmailExists", esq.createExistsFilter(this.$ConnectionColumnsPath + ".Id"));
						filterGroup.add("NotEmailNotifier", esq.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.NOT_EQUAL, "MessageNotifier",
								EmailMessageConstants.MessageNotifier.Email));
						return filterGroup;
					},

					/**
					 * @inheritdoc Terrasoft.BaseEmailMessageHistoryPage#getHistoryMessageColumns
					 * @overridden
					 */
					getHistoryMessageColumns: function() {
						return [this.$ConnectionColumnsPath + ".Body", this.$ConnectionColumnsPath + ".Recepient",
							this.$ConnectionColumnsPath + ".Sender", this.$ConnectionColumnsPath + ".CopyRecepient",
							this.$ConnectionColumnsPath + ".StartDate", this.$ConnectionColumnsPath + ".IsHtmlBody",
							this.$ConnectionColumnsPath + ".MessageType", this.$ConnectionColumnsPath + ".EmailSendStatus",
							this.$ConnectionColumnsPath + ".Title", this.$ConnectionColumnsPath + ".SendDate",
							this.$ConnectionColumnsPath + ".IsAutoSubmitted",
							this.$ConnectionColumnsPath + ".SenderContact"];
					},

					/**
					 * @inheritDoc Terrasoft.BaseMessageHistoryItemPage#getCreatedByName
					 * @overridden
					 */
					getCreatedByName: function() {
						if (this.get(this.$ConnectionColumnsPath + ".IsAutoSubmitted") &&
							this.getIsFeatureEnabled("OpenEmailSyncSettingsPage")) {
							var emails = EmailHelper.getEmailAddresses(this.get(this.$ConnectionColumnsPath + ".Sender"));
							return emails ? emails[0] : this.callParent(arguments);
						}
						var senderContact = this.getSenderContact();
						if(!this.Ext.isEmpty(senderContact) && senderContact.displayValue) {
							 return senderContact.displayValue;
						}
						return this.callParent(arguments);
					},

					/**
					 * @inheritDoc Terrasoft.BaseMessageHistoryItemPage#getCreatedByUrl
					 * @overridden
					 */
					getCreatedByUrl: function() {
						var senderContact = this.getSenderContact();
						if(!this.Ext.isEmpty(senderContact) && senderContact.value) {
							var hash = NetworkUtilities.getEntityUrl("Contact", senderContact.value);
							return this.get("Resources.Strings.ViewModuleUrl") + hash;
						}
						return this.callParent(arguments);
					},

					/**
					 * @inheritDoc Terrasoft.BaseMessageHistoryItemPage#getCreatedByImage
					 * @override
					 */
					getCreatedByImage: function() {
						const senderContact = this.getSenderContact();
						return this.getImageUrlByEntity(senderContact);
					},

					/**
					 * Gets sender contact from the email.
					 * @returns {Object} Returns sender contact.
					 */
					getSenderContact: function() {
						return this.get(this.$ConnectionColumnsPath + ".SenderContact");
					},

					/**
					 * Returns draft label visibility.
					 * @returns {Boolean} Draft label visibility.
					 */
					isDraftLabelVisible: function() {
						var emailSendStatus = this.get(this.$ConnectionColumnsPath + ".EmailSendStatus");
						return emailSendStatus.value === EmailMessageConstants.Activity.EmailSendStatus.NotSend ||
								emailSendStatus.value === EmailMessageConstants.Activity.EmailSendStatus.Opened ||
								emailSendStatus.value === EmailMessageConstants.Activity.EmailSendStatus.ErrorOnSend ||
								emailSendStatus.value === EmailMessageConstants.Activity.EmailSendStatus.Awaiting;
					},

					/**
					 * @inheritdoc Terrasoft.BaseMessageHistoryPage#initEmailActionsMenuCollection
					 * @overridden
					 */
					initEmailActionsMenuCollection: function() {
						var collection = this.get("EmailActionsMenuCollection") ||
								this.Ext.create("Terrasoft.BaseViewModelCollection");
						var replyToAllUsingTemplateItem = this.getButtonMenuItem({
							"Caption": {
								bindTo: "Resources.Strings.ReplyToAllUsingTemplate"
							},
							"MarkerValue": "ReplyToAllUsingTemplate",
							"Click": {"bindTo": "replyToAllWithTemplate"}
						});
						collection.addItem(replyToAllUsingTemplateItem);
						this.set("EmailActionsMenuCollection", collection);
						this.callParent(arguments);
					},

					/**
					 * Handler for ReplyToAllUsingTemplate button click.
					 */
					replyToAllWithTemplate: function() {
						var config = {
							entitySchemaName: "EmailTemplate",
							multiSelect: false,
							columns: ["Body"]
						};
						this.openLookup(config, this.fillEmailWithTemplate, this);
					},

					/**
					 * Form data for email publisher page.
					 * @param {object} arguments from lookup.
					 */
					fillEmailWithTemplate: function(args) {
						var recepient = this.get(this.$ConnectionColumnsPath + ".Sender") + ";" +
								this.get(this.$ConnectionColumnsPath + ".Recepient");
						var copyRecepient = this.get(this.$ConnectionColumnsPath + ".CopyRecepient");
						var selectedItems = args.selectedRows.getItems();
						var selectedItem = selectedItems.length && selectedItems[0];
						var body = this.generateReplyBody();
						if (selectedItem && selectedItem.Body) {
							body = this._isEmailTemplateMultiLanguage() ? body : selectedItem.Body + body;
						}
						var title = this.get(this.$ConnectionColumnsPath + ".Title");
						title = title.toUpperCase().indexOf("RE: ") === 0 ? title : "RE: " + title;
						var data = {
							"body": body,
							"title": title,
							"recepient": recepient,
							"copyRecepient": copyRecepient,
							"id": selectedItem.Id
						};
						this.sandbox.publish("EmailTemplateLoaded", data, [this.sandbox.id]);
					},

					/**
					 * Generates reply body.
					 * @return {String} result Body
					 */
					generateReplyBody: function() {
						var body = this.get(this.$ConnectionColumnsPath + ".IsHtmlBody")
							? this.get(this.$ConnectionColumnsPath + ".Body")
							: this.Ext.htmlEncode(this.get(this.$ConnectionColumnsPath + ".Body"));
						var sender = this.get(this.$ConnectionColumnsPath + ".Sender");
						var recipient = this.get(this.$ConnectionColumnsPath + ".Recepient");
						var copyRecipient = this.get(this.$ConnectionColumnsPath + ".CopyRecepient");
						var startDate = this.Terrasoft.utils.string.getTypedStringValue(
								this.get(this.$ConnectionColumnsPath + ".StartDate"), this.Terrasoft.DataValueType.DATE_TIME);
						var title = this.get(this.$ConnectionColumnsPath + ".Title");
						var template = this.get("Resources.Strings.ReplyBodyHtmlTemplate");
						body = this.Ext.String.format(template, sender, startDate, recipient, copyRecipient, title, body,
								this.get("Resources.Strings.SenderCaption"),
								this.get("Resources.Strings.SendDateCaption"),
								this.get("Resources.Strings.RecepientCaption"),
								this.get("Resources.Strings.CopyRecepientCaption"),
								this.get("Resources.Strings.TitleCaption"));
						body = this.validateMessage(body);
						return body;
					},

					/**
					 * @inheritdoc Terrasoft.BaseMessageHistoryPage#getHistoryFiles
					 * @overridden
					 */
					getHistoryFiles: function(callback, scope) {
						var esq = this.getActivityFileEsq();
						esq.getEntityCollection(function(result) {
							this.getHistoryFilesCallback(result, callback, scope);
						}, this);
					},

					/**
					 * @inheritdoc Terrasoft.BaseMessageHistoryPage#addAdditionalFilters
					 * @overridden
					 */
					addAdditionalFilters: function(esq, config) {
						if (!config.needToShowSystemMessages) {
							var filterGroup = esq.createFilterGroup();
							filterGroup.name = "EmailSystemMessages";
							filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
							filterGroup.add("IsAutoSubmitted", esq.createColumnFilterWithParameter(
									this.Terrasoft.ComparisonType.EQUAL, this.$ConnectionColumnsPath + ".IsAutoSubmitted",
									false));
							filterGroup.add("NotEmailNotifier", esq.createColumnFilterWithParameter(
									this.Terrasoft.ComparisonType.NOT_EQUAL, "MessageNotifier",
									EmailMessageConstants.MessageNotifier.Email));
							esq.filters.addItem(filterGroup);
						}
					}
				},

				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"name": "EmailLinkImage",
						"parentName": "MessageHeaderContainer",
						"propertyName": "items",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.HYPERLINK,
							"tpl": [
								/* eslint-disable quotes */
								'<a id="{id}" name="{name}" href="{href}" target="_self"' +
								' class="{hyperlinkClass}" style="{hyperlinkStyle}" title="{hint}" type="{type}">',
								'<img src="{imageSrc}">',
								'</a>'
								/* eslint-enable quotes */
							],
							"tplData": {
								"imageSrc": this.Terrasoft.ImageUrlBuilder
										.getUrl(resources.localizableImages.EmailLinkImage)
							},
							"href": {"bindTo": "getEmailPageHref"},
							"classes": {
								"hyperlinkClass": ["emailLinkImage"]
							},
							"markerValue": {
								"bindTo": "getEmailLinkImageMarker"
							}
						},
						"index": 5
					},
					{
						"operation": "merge",
						"name": "MessageFiles",
						"parentName": "MessageBodyContainer",
						"propertyName": "items",
						"values": {
							"generator": function() {
								return {
									"id": "FilesText",
									"markerValue": "FilesText",
									"className": "Terrasoft.MultilineFileLabel",
									"classes": {
										"multilineLabelClass": ["inlineEmailMessageHistoryFiles"]
									},
									"caption": {
										"bindTo": "FilesText"
									},
									"showReadMoreButton": false
								};
							}
						}
					},
					{
						"operation": "merge",
						"name": "MessageText",
						"values": {
							"generator": function() {
								return {
									"id": "MessageText",
									"markerValue": "MessageText",
									"className": "Terrasoft.SelectionHandlerMultilineLabel",
									"classes": {
										"multilineLabelClass": ["messageText"]
									},
									"caption": {
										"bindTo": "Message",
										"bindConfig": {"converter": "prepareMessage"}
									},
									"showLinks": true,
									"isHtmlBody": true,
									"selectedTextChanged": {"bindTo": "onSelectedTextChanged"},
									"selectedTextHandlerButtonClick": {"bindTo": "onSelectedTextButtonClick"},
									"showFloatButton": {"bindTo": "CreateCaseFromHistoryFeatureState"}
								};
							}
						}
					},
					{
						"operation": "merge",
						"name": "CreatedByLink",
						"parentName": "CreatedByLinkWrapContainer",
						"propertyName": "items",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.HYPERLINK,
							"href": {
								"bindTo": "getCreatedByUrl"
							},
							"target": this.Terrasoft.controls.HyperlinkEnums.target.SELF
						}
					},
					{
						"operation": "insert",
						"name": "MessageDraftContainer",
						"parentName": "MessageContentContainer",
						"propertyName": "items",
						"values": {
							"id": "MessageDraftContainer",
							"layout": {
								"column": 0,
								"row": 2,
								"colSpan": 24,
								"rowSpan": 1
							},
							"markerValue": "MessageDraftContainer",
							"itemType": this.Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["messageDraftContainer"],
							"items": []
						},
						"index": 3
					},
					{
						"operation": "insert",
						"name": "DraftLabel",
						"parentName": "MessageDraftContainer",
						"propertyName": "items",
						"values": {
							"id": "DraftLabel",
							"labelClass": ["draftLabel"],
							"markerValue": "DraftLabel",
							"itemType": this.Terrasoft.ViewItemType.LABEL,
							"caption": {
								"bindTo": "Resources.Strings.DraftString"
							},
							"visible": {
								"bindTo": "isDraftLabelVisible"
							}
						}
					},
					{
						"operation": "insert",
						"name": "FileAttachmentsImage",
						"parentName": "AdditionalInfoWrapContainer",
						"propertyName": "items",
						"values": {
							"getSrcMethod": "getFileAttachmentsImage",
							"onPhotoChange": this.Terrasoft.emptyFn,
							"readonly": true,
							"classes": {
								"wrapClass": ["fileAttachmentsImage"]
							},
							"markerValue": "FileAttachmentsImage",
							"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
							"visible": {
								"bindTo": "IsFilesAttached"
							}
						},
						"index": 3
					},
					{
						"operation": "merge",
						"name": "EmailRecepient",
						"parentName": "EmailRecepientWrapContainer",
						"propertyName": "items",
						"values": {
							"caption": {
								"bindTo": "[Activity:Id:RecordId].Recepient"
							}
						},
						"index": 3
					},
					{
						"operation": "merge",
						"name": "EmailSender",
						"parentName": "EmailSenderWrapContainer",
						"propertyName": "items",
						"values": {
							"caption": {
								"bindTo": "[Activity:Id:RecordId].Sender"
							}
						},
						"index": 1
					}
				]/**SCHEMA_DIFF*/
			};
		}
);

define('EmailMessageHistoryItemPageEmailMessageMiningResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("EmailMessageHistoryItemPageEmailMessageMining", ["EmailMessageEnrichmentMixin", "css!EmailMessageEnrichmentHistoryItemStyle"],
	function() {
		return {
			messages: {

				/**
				 * Update contact enrichment page visibility.
				 */
				"ContactEnrichmentPageVisibilityChanged": {
					"mode": Terrasoft.MessageMode.PTP,
					"direction": Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * Message to get contact page response after saving.
				 */
				"ContactPageV2OnSavedResponse": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GetHistoryState
				 * Message asks current history state.
				 */
				"GetHistoryState": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * Update case contact.
				 */
				"CaseContactUpdate": {
					"mode": Terrasoft.MessageMode.PTP,
					"direction": Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			mixins: {

				/**
				 * @class Terrasoft.EmailEnrichmentMixin
				 * Email enrichment mixin.
				 */
				EmailMessageEnrichmentMixin: "Terrasoft.EmailMessageEnrichmentMixin"
			},
			methods: {

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @overridden
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this.getContactsFromServer(function(response) {
							var result = response && response.CloudStateResponse;
							this.set("Response", result);
							this.loadSenderData();
							this.initEnrichmentCollection();
							this.Ext.callback(callback, scope);
						}, this);
					}, this]);
				},

				/**
				 * Returns actions button icon.
				 * @param {Boolean} isCloudVisible Is cloud icon visible.
				 * @return {Object} Actions button icon.
				 */
				getActionsButtonImage: function(isCloudVisible) {
					if (isCloudVisible) {
						return this.get("Resources.Images.ContactEnrichmentIcon");
					}
					return this.callParent(arguments);
				},

				/**
				 * Returns actions button marker value.
				 * @param {Boolean} isCloudVisible Is cloud icon visible.
				 * @return {String} Actions button marker value.
				 */
				getActionsButtonMarkerValue: function(isCloudVisible) {
					var markerValue = isCloudVisible ? "ShowCloud " : "HideCloud ";
					return markerValue + this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BaseMessageHistoryPage#historyMessageEsqApply
				 * @overridden
				 */
				historyMessageEsqApply: function(esq) {
					this.callParent(arguments);
					esq.addColumn("Case.Contact", "CaseContact");
				}

				//endregion

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "EmailAction",
					"values": {
						"imageConfig": {
							"bindTo": "isCloudVisible",
							"bindConfig": {
								"converter": "getActionsButtonImage"
							}
						},
						"markerValue": {
							"bindTo": "isCloudVisible",
							"bindConfig": {
								"converter": "getActionsButtonMarkerValue"
							}
						}
					}
				},
				{
					"operation": "merge",
					"name": "EmailSender",
					"values": {
						"visible": {
							"bindTo": "showSenderLabel"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "EmailSenderWrapContainer",
					"propertyName": "items",
					"name": "EmailSenderContact",
					"values": {
						"itemType": Terrasoft.ViewItemType.HYPERLINK,
						"caption": {bindTo: "SenderName"},
						"classes": {
							"hyperlinkClass": ["t-label", "label-link", "label-url", "email-sender-contact"]
						},
						"click": {bindTo: "openContactPage"},
						"markerValue": {bindTo: "ContactSenderName"},
						"visible": {bindTo: "showSenderLink"}
					},
					"index": 2
				}
			]/**SCHEMA_DIFF*/
		};
	}
);

define('EmailMessageHistoryItemPageCaseServiceResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("EmailMessageHistoryItemPageCaseService", ["ServiceDeskConstants", "ConfigurationConstants", "EmailMessageConstants",
		"NetworkUtilities",	"MaskHelper", "css!EmailMessageHistoryItemStyle"],
	function(ServiceDeskConstants, ConfigurationConstants, EmailMessageConstants) {
		return {
			entitySchemaName: "BaseMessageHistory",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			attributes: {

				/**
				 * Case origin.
				 */
				"CaseOrigin": {
					dataValueType: Terrasoft.DataValueType.GUID,
					value: ServiceDeskConstants.CaseOrigin.Email
				}
			},
			methods: {

				/**
				 * @inheritDoc Terrasoft.BaseMessageHistoryItemPage#getMessageFromHistory
				 * @overridden
				 */
				getMessageFromHistory: function() {
					var message = this.get("HighlightedHistoryMessage");
					if (this.isHistoryMessageEmpty(message)) {
						message = this.get("[Activity:Id:RecordId].Body");
					}
					return message;
				},

				/**
				 * @inheritDoc Terrasoft.BaseMessageHistoryItemPage#getHistoryData
				 * @overridden
				 */
				getHistoryData: function() {
					var historyData = this.callParent(arguments);
					historyData.activityId = this.get("RecordId");
					return historyData;
				},

				/**
				 * @inheritDoc Terrasoft.BaseMessageHistoryItemPage#getDependentEntities
				 * @overridden
				 */
				getDependentEntities: function(data) {
					var caseMessageHistoryEntity = this._getCaseMessageHistoryEntity(data);
					return [caseMessageHistoryEntity];
				},

				/**
				 * Creates dependent CaseMessageHistory entity, which used when new case created.
				 * @private
				 * @param {Object} data Data for email message.
				 * @returns {Array} Array of case message history column values.
				 */
				_getCaseMessageHistoryEntity: function(data) {
					return {
						entitySchemaName: "CaseMessageHistory",
						columnValues: [
							{
								name: "Message",
								value: this.get("[Activity:Id:RecordId].Body"),
								dataValueType: this.Terrasoft.DataValueType.TEXT
							},
							{
								name: "RecordId",
								value: data.activityId,
								dataValueType: this.Terrasoft.DataValueType.GUID
							},
							{
								name: "MessageNotifier",
								value: EmailMessageConstants.MessageNotifier.Email,
								dataValueType: this.Terrasoft.DataValueType.GUID
							},
							{
								name: "Case",
								value: data.newCaseId,
								dataValueType: this.Terrasoft.DataValueType.GUID
							},
							{
								name: "CreatedOn",
								value: this.get("CreatedOn"),
								dataValueType: this.Terrasoft.DataValueType.DATE_TIME
							}
						]
					};
				},

				/**
				 * @inheritdoc Terrasoft.BaseMessageHistoryItemPage#isHistoryActionVisible
				 * @overridden
				 */
				isHistoryActionVisible: function() {
					return true;
				}
			},
			diff: /**SCHEMA_DIFF*/[

			]/**SCHEMA_DIFF*/
		};
	}
);

define("EmailMessageHistoryItemPage", ["css!EmailMessageHistoryItemPageCSS"],
	function() {
		return {
			entitySchemaName: "BaseMessageHistory",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			attributes: {

				/**
				 * Is message visible on portal value.
				 */
				"IsMessageVisibleOnPortal": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN
				}
			},
			methods: {

				/**
				 * @inheritdoc BasePageV2#init
				 * @override
				 */
				init: function() {
					this.callParent(arguments);
					this.set("IsMessageVisibleOnPortal",
							!this.Ext.isEmpty(this.get("[PortalEmailMessage:CaseMessageHistory:Id].Id")));
				},

				/**
				 * Returns "Hide email on portal" label visibility.
				 * @public
				 * @returns {Boolean} "Hide email on portal" label visibility.
				 */
				isHideEmailOnPortalLabelVisible: function() {
					if (!this.isShowEmailOnPortalEnabled()) {
						return false;
					}
					return this.get("IsMessageVisibleOnPortal");
				},

				/**
				 * Returns "Show email on portal" label visibility.
				 * @public
				 * @returns {Boolean} "Show email on portal" label visibility.
				 */
				isShowEmailOnPortalLabelVisible: function() {
					if (!this.isShowEmailOnPortalEnabled()) {
						return false;
					}
					return !this.get("IsMessageVisibleOnPortal");
				},

				/**
				 * Hides email message on portal.
				 * @public
				 */
				hideEmailMessageOnPortal: function() {
					this._showPortalEmailMessageButtonDialog(this.get("Resources.Strings.HideEmailConfirmationMessage"),
							false);
				},

				/**
				 * Shows email message on portal.
				 * @public
				 */
				showEmailMessageOnPortal: function() {
					this._showPortalEmailMessageButtonDialog(this.get("Resources.Strings.ShowEmailConfirmationMessage"),
							true);
				},

				/**
				 * Shows confirmation dialog before.
				 * @param {String} message Dialog message.
				 * @param {Boolean} showEmailOnPortal Sets message visibility.
				 * @private
				 */
				_showPortalEmailMessageButtonDialog: function(message, showEmailOnPortal) {
					this.showConfirmationDialog(message,
							function(result) {
								if (result === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
									this.updatePortalEmailMessage(showEmailOnPortal);
								}
							},
							["yes", "no"]);
				},

				/**
				 * Updates portal email message.
				 * @public
				 * @param {Boolean} showEmailOnPortal Sets message visibility.
				 */
				updatePortalEmailMessage: function(showEmailOnPortal) {
					if (showEmailOnPortal) {
						this._addPortalEmailMessage();
					} else {
						this._deletePortalEmailMessage();
					}
					this.set("IsMessageVisibleOnPortal", showEmailOnPortal);
				},

				/**
				 * Deletes portal email message from messages available on the portal.
				 * @private
				 */
				_deletePortalEmailMessage: function() {
					var deleteQuery = Ext.create("Terrasoft.DeleteQuery", {
						rootSchemaName: "PortalEmailMessage"
					});
					deleteQuery.filters.add(deleteQuery.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "CaseMessageHistory", this.get("Id")));
					deleteQuery.execute(function(response) {
						if(!response.success) {
							this.showConfirmationDialog(this.get("Resources.Strings.HideMessageError"));
						}
					}, this);
				},

				/**
				 * Adds portal email message to messages available on the portal.
				 * @private
				 */
				_addPortalEmailMessage: function() {
					var insert = Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: "PortalEmailMessage"
					});
					insert.setParameterValue("CaseMessageHistory", this.get("Id"),
							Terrasoft.DataValueType.GUID);
					insert.setParameterValue("Recipient", this.get(this.$ConnectionColumnsPath + ".Recepient"),
							Terrasoft.DataValueType.TEXT);
					insert.setParameterValue("Sender", this.get(this.$ConnectionColumnsPath + ".Sender"),
							Terrasoft.DataValueType.TEXT);
					insert.setParameterValue("SendDate", this.get(this.$ConnectionColumnsPath + ".SendDate"),
							Terrasoft.DataValueType.DATE_TIME);
					insert.setParameterValue("IsHtmlBody", this.get(this.$ConnectionColumnsPath + ".IsHtmlBody"),
							Terrasoft.DataValueType.BOOLEAN);
					insert.setParameterValue("MessageTypeId",
						this.get(this.$ConnectionColumnsPath + ".MessageType").value, Terrasoft.DataValueType.GUID);
					insert.execute(function(response){
						if(!response.success){
							this.showConfirmationDialog(this.get("Resources.Strings.ShowMessageError"));
						}
					}, this);
				},

				/**
				 * Checks if ShowEmailOnPortal feature enabled.
				 * @protected
				 * @virtual
				 * @returns {Boolean} Is feature enabled.
				 */
				isShowEmailOnPortalEnabled: function() {
					return this.getIsFeatureEnabled("ShowEmailOnPortal");
				},

				/**
				 * @inheritdoc Terrasoft.BaseMessageHistoryPage#historyMessageEsqApply
				 * @override
				 */
				historyMessageEsqApply: function(esq) {
					this.callParent(arguments);
					esq.addColumn("[PortalEmailMessage:CaseMessageHistory:Id].Id");
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "PortalEmailMessageVisibilityContainer",
					"parentName": "MessageContentContainer",
					"propertyName": "items",
					"values": {
						"id": "PortalEmailMessageVisibilityContainer",
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24,
							"rowSpan": 1
						},
						"markerValue": "PortalEmailMessageVisibilityContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["PortalEmailMessageVisibilityContainer"],
						"items": []
					},
					"index": 3
				},
				{
					"operation": "insert",
					"name": "HideEmailOnPortalLabel",
					"parentName": "PortalEmailMessageVisibilityContainer",
					"propertyName": "items",
					"values": {
						"id": "HideEmailOnPortalLabel",
						"labelClass": ["portalEmailMessageVisibilityLabel"],
						"markerValue": "HideEmailOnPortalLabel",
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.HideEmailOnPortalString"
						},
						"visible": {
							"bindTo": "isHideEmailOnPortalLabelVisible"
						},
						"click": {
							"bindTo": "hideEmailMessageOnPortal"
						}
					}
				},
				{
					"operation": "insert",
					"name": "ShowEmailOnPortalLabel",
					"parentName": "PortalEmailMessageVisibilityContainer",
					"propertyName": "items",
					"values": {
						"id": "ShowEmailOnPortalLabel",
						"labelClass": ["portalEmailMessageVisibilityLabel"],
						"markerValue": "ShowEmailOnPortalLabel",
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.ShowEmailOnPortalString"
						},
						"visible": {
							"bindTo": "isShowEmailOnPortalLabelVisible"
						},
						"click": {
							"bindTo": "showEmailMessageOnPortal"
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


