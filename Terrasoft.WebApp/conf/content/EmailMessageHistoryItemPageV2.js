Terrasoft.configuration.Structures["EmailMessageHistoryItemPageV2"] = {innerHierarchyStack: ["EmailMessageHistoryItemPageV2EmailMessage", "EmailMessageHistoryItemPageV2"], structureParent: "EmailMessageHistoryItemPage"};
define('EmailMessageHistoryItemPageV2EmailMessageStructure', ['EmailMessageHistoryItemPageV2EmailMessageResources'], function(resources) {return {schemaUId:'a2a5da55-e80c-4dd9-a38e-e267c5c8232a',schemaCaption: "EmailMessageHistoryItemPageV2", parentSchemaName: "EmailMessageHistoryItemPage", schemaName:'EmailMessageHistoryItemPageV2EmailMessage',parentSchemaUId:'3416cf8a-440c-427b-abb5-3d20c6aebb5e',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailMessageHistoryItemPageV2Structure', ['EmailMessageHistoryItemPageV2Resources'], function(resources) {return {schemaUId:'82627aa2-e224-4105-aa78-eb6d0487db73',schemaCaption: "EmailMessageHistoryItemPageV2", parentSchemaName: "EmailMessageHistoryItemPageV2EmailMessage", schemaName:'EmailMessageHistoryItemPageV2',parentSchemaUId:'a2a5da55-e80c-4dd9-a38e-e267c5c8232a',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"EmailMessageHistoryItemPageV2EmailMessage",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailMessageHistoryItemPageV2EmailMessageResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("EmailMessageHistoryItemPageV2EmailMessage", ["EmailMessageHistoryItemPageV2Resources",
		"css!EmailMessageHistoryItemStyleV2"],
	function(resources) {
		return {
			entitySchemaName: "BaseMessageHistory",
			details: /**SCHEMA_DETAILS*/{
				"EmailFiles": {
					"schemaName": "HistoryMessageFilesDetail",
					"entitySchemaName": "ActivityFile",
					"filter": {
						"masterColumn": "RecordId",
						"detailColumn": "Activity"
					},
					"additionalFileFilters": [{
						"filterColumnName": "Inline",
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"filterColumnValue": 0
					}]
				}
			}/**SCHEMA_DETAILS*/,
			attributes: {
			},
			messages: {
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BasePageV2#init
				 * @override
				 */
				init: function() {
					this.callParent(arguments);
					this.subscribeDetailsEvents();
				},

				/**
				 * @inheritdoc Terrasoft.BaseMessageHistoryPage#getHistoryMessageFilesContainer
				 * @override
				 */
				getHistoryMessageFilesContainer: function() {
					return this.Ext.String.format("EmailMessageHistoryItemPageV2EmailFilesContainer-" +
						"{0}-{1}", this.get("Id"), this.sandbox.id);
				},

				/**
				 * @inheritdoc Terrasoft.BaseMessageHistoryPage#getHistoryMessageFilesDetailId
				 * @override
				 */
				getHistoryMessageFilesDetailId: function() {
					return this.getDetailId("EmailFiles");
				},

				/**
				 * @inheritDoc BaseMessageHistoryItemPage#getChannelIcon
				 * @override
				 */
				getChannelIcon: function () {
					return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.EmailChannelIcon"));
				},

				/**
				 * Return email subject for page.
				 * @return {String} Subject.
				 */
				getSubject: function() {
					return this.get(this.$ConnectionColumnsPath + ".Title");
				},

				/**
				 * Execute actions for email.
				 */
				emailAction: function () {
					var action = arguments[3];
					var emailId = this.get("RecordId");
					var emailConfig = this.getModuleStructure("Activity");
					var actionLink = emailConfig.cardModule + "/EmailPageV2/add/Type/Email/" + action + "/" + emailId;
					this.sandbox.publish("PushHistoryState", {hash: actionLink});
				},

				/**
				 * @inheritdoc BaseMessageHistoryItemPage#getOpacityMode
				 * @override
				 */
				getOpacityMode: function() {
					if (this.isDraftLabelVisible() || this.get(this.$ConnectionColumnsPath + ".IsAutoSubmitted")
						&& !this.get("IsMessageVisibleOnPortal")) {
						return Terrasoft.controls.opacityMode.Translucent;
					} else {
						return Terrasoft.controls.opacityMode.Opaque;
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseMessageHistoryPage#isFileDetailContainerVisible
				 * @override
				 */
				isFileDetailContainerVisible: function () {
					return true;
				},

				/**
				 * Get text for recipients hint.
				 * @return {string} Text for hint.
				 */
				getRecipientsHintContent: function() {
					var template = this.get("Resources.Strings.RecipientsHintTemplate");
					var hintText = this.Ext.String.format(template, this.get("Resources.Strings.RecepientCaption"),
						this._getEmailStringWithBreaks(this.get("[Activity:Id:RecordId].Recepient"), 100),
						this.get("Resources.Strings.CopyRecepientCaption"),
						this._getEmailStringWithBreaks(this.get("[Activity:Id:RecordId].CopyRecepient"), 100));
					return hintText;
				},

				_getEmailStringWithBreaks: function(source, symbolsCountPerLine) {
					var lines = source.replace(/\s*;\s*/g, "; ")
						.match(new RegExp(".{1," + symbolsCountPerLine + "}(; |$)", "g"));
					return lines && lines.join("<br/>&nbsp;&nbsp;&nbsp;&nbsp;") || source;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "HistoryV1Container"
				},
				{
					"operation": "merge",
					"name": "HistoryV2EmailRecepient",
					"values": {
						"caption": {
							"bindTo": "[Activity:Id:RecordId].Recepient"
						},
						"hint": {"bindTo": "getRecipientsHintContent"}
					}
				},
				{
					"operation": "merge",
					"name": "HistoryV2CreatedByLink",
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
					"name": "HistoryV2EmailLinkImage",
					"parentName": "HistoryV2MessageHeaderContainer",
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
								.getUrl(resources.localizableImages.GoToEmailPage)
						},
						"href": {"bindTo": "getEmailPageHref"},
						"classes": {
							"hyperlinkClass": ["email-link-image"]
						},
						"markerValue": {
							"bindTo": "getEmailLinkImageMarker"
						}
					},
					"index": 3
				},
				{
					"operation": "insert",
					"name": "EmailAction",
					"parentName": "HistoryV2MessageHeaderContainer",
					"propertyName": "items",
					"values": {
						"id": "EmailAction",
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"imageConfig": {
							"bindTo": "isCloudVisible",
							"bindConfig": {
								"converter": "getActionsButtonImage"
							}
						},
						"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"items": [],
						"markerValue": {
							"bindTo": "getActionsButtonMarkerValue"
						},
						"visible": {
							"bindTo": "isHistoryActionVisible"
						},
						"controlConfig": {
							"menu": {
								"items": {"bindTo": "EmailActionsMenuCollection"}
							}
						},
						"classes": {
							"wrapperClass": ["email-message-actions-button-wrapper"],
							"menuClass": ["email-message-actions-button-menu"]
						}
					},
					"index": 4
				},
				{
					"operation": "merge",
					"name": "HistoryV2MessageText",
					"values": {
						"generator": function() {
							return {
								"id": "MessageText",
								"markerValue": "MessageText",
								"className": "Terrasoft.MessageHistorySelectionHandler",
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
								"showFloatButton": {"bindTo": "CreateCaseFromHistoryFeatureState"},
								"changeOpacity": {"bindTo": "getOpacityMode"},
								"frameBodyStyle": {
									"overflow": "hidden",
									"margin": 0,
									"font-family": "Calibri",
									"font-size": "15px",
									"lineHeight": "18px",
									"color": "#444444"
								},
								"visible": {
									"bindTo": "Message",
									"bindConfig": {
										"converter": "isMessageTextNotEmptyConverter"
									}
								}
							};
						}
					},
					"index": 2
				},
				{
					"operation": "insert",
					"name": "HistoryV2DraftContentContainer",
					"parentName": "HistoryV2MessageContentContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["draft-content-container"],
						"items": [],
						"visible": {
							"bindTo": "isDraftLabelVisible"
						}
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "HistoryV2DraftLabel",
					"parentName": "HistoryV2DraftContentContainer",
					"propertyName": "items",
					"values": {
						"id": "DraftLabel",
						"labelClass": ["draft-label"],
						"markerValue": "DraftLabel",
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.DraftStringColon"
						},
						"visible": {
							"bindTo": "isDraftLabelVisible"
						}
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "HistoryV2MessageSubject",
					"parentName": "HistoryV2DraftContentContainer",
					"propertyName": "items",
					"values": {
						"labelClass": ["email-subject"],
						"markerValue": "HistoryV2MessageSubject",
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getSubject"
						},
						"visible": {
							"bindTo": "isDraftLabelVisible"
						}
					},
					"index": 1
				},
				{
					"operation": "merge",
					"name": "HistoryV2CreationInfo",
					"parentName": "HistoryV2MessageHeaderRightContainer",
					"values": {
						"id": "CreationInfo",
						"labelClass": ["creationInfoLabel"],
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getCreatedOn"
						}
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "HistoryV2EmailActionsContainer",
					"parentName": "HistoryV2MessageHeaderRightContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["email-actions-container"],
						"items": []
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "ReplyEmailAction",
					"parentName": "HistoryV2EmailActionsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"imageConfig": {"bindTo": "Resources.Images.ReplyEmailActionIcon"},
						"classes": {"imageClass": ["email-action-button"]},
						"click": {"bindTo": "emailAction"},
						"tag": "Reply"
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "ReplyToAllEmailAction",
					"parentName": "HistoryV2EmailActionsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"imageConfig": {"bindTo": "Resources.Images.ReplyToAllEmailActionIcon"},
						"classes": {"imageClass": ["email-action-button"]},
						"click": {"bindTo": "emailAction"},
						"tag": "ReplyAll"
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "ReplyUsingTemplateEmailAction",
					"parentName": "HistoryV2EmailActionsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"imageConfig": {"bindTo": "Resources.Images.ReplyUsingTemplateEmailActionIcon"},
						"classes": {"imageClass": ["email-action-button"]},
						"click": {"bindTo": "replyToAllWithTemplate"}
					},
					"index": 2
				},
				{
					"operation": "insert",
					"name": "ForwardEmailAction",
					"parentName": "HistoryV2EmailActionsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"imageConfig": {"bindTo": "Resources.Images.ForwardEmailActionIcon"},
						"classes": {"imageClass": ["email-action-button"]},
						"click": {"bindTo": "emailAction"},
						"tag": "Forward"
					},
					"index": 3
				},
				{
					"operation": "merge",
					"name": "HistoryV2FileDetailContainer",
					"parentName": "HistoryV2MessageFooterContainer",
					"propertyName": "items",
					"values": {
						"afterrender": {"bindTo": "loadDetailModule"},
						"afterrerender": {"bindTo": "loadDetailModule"},
						"visible": {
							"bindTo": "FilesDetailVisible"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "HistoryV2FileDetailContainer",
					"propertyName": "items",
					"name": "EmailFiles",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL,
						"markerValue": "FileDetail"
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);

define("EmailMessageHistoryItemPageV2", ["ConfigurationConstants", "css!EmailMessageHistoryItemPageV2CSS"],
	function(ConfigurationConstants) {
		return {
			entitySchemaName: "BaseMessageHistory",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			attributes: {},
			messages: {
				/**
				 * @message DeleteMessageFromHistory
				 * Informs that need to delete message from the loaded history.
				 */
				"DeleteMessageFromHistory": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.BIDIRECTIONAL
				},

				/**
				 * @message MultiDeleteFinished
				 * Notification that the delete process has been finished.
				 */
				"MultiDeleteFinished": {
					"mode": this.Terrasoft.MessageMode.BROADCAST,
					"direction": this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message MultiDeleteStart
				 * Notification that the delete process has been started.
				 */
				"MultiDeleteStart": {
					"mode": this.Terrasoft.MessageMode.BROADCAST,
					"direction": this.Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			methods: {
				/**
				 * Return url of actual visibility icon link.
				 * @return {String} Url of current actual icon.
				 * @protected
				 */
				getVisibilityIcon: function() {
					if(this.isDraftLabelVisible()) {
						return this.Terrasoft.ImageUrlBuilder.getUrl(this.get(
							"Resources.Images.ShowOnPortal")
						);
					}
					return this.Terrasoft.ImageUrlBuilder.getUrl(this.get(
						"Resources.Images." +
						(this.isHideEmailOnPortalLabelVisible() ? "HideOnPortal" : "ShowOnPortal")
					));
				},

				/**
				 * Return url of delete email icon link.
				 * @return {String} Url of delete email icon.
				 * @protected
				 */
				getDeleteEmailIcon: function() {
					return this.Terrasoft.ImageUrlBuilder.getUrl(this.get(
						"Resources.Images.DeleteEmailButtonImage"));
				},

				/**
				 * @inheritdoc Terrasoft.EmailMessageHistoryItemPage#isShowEmailOnPortalLabelVisible
				 * @overridden
				 */
				isShowEmailOnPortalLabelVisible: function() {
					return this.callParent(arguments) && !this.isDraftLabelVisible();
				},

				/**
				 * @inheritdoc Terrasoft.EmailMessageHistoryItemPage#isHideEmailOnPortalLabelVisible
				 * @overridden
				 */
				isHideEmailOnPortalLabelVisible: function() {
					return this.callParent(arguments) && !this.isDraftLabelVisible();
				},

				/**
				 * Returns config for GridUtilitiesService service.
				 * @param {Array} primaryColumnValues Collection of the primary values to be delete.
				 * @param {Object} paramsJSON Extra parameters to the service.
				 * @returns {Object} Service config.
				 */
				getDeleteServiceConfig: function(primaryColumnValues, paramsJSON) {
					return {
						serviceName: "GridUtilitiesService",
						methodName: "DeleteRecordsAsync",
						data: {
							primaryColumnValues: primaryColumnValues,
							rootSchema: "Activity",
							parameters: paramsJSON,
							filtersConfig: null
						}
					};
				},

				/**
				 * Handles delete button click.
				 * public
				 */
				onDeleteEmail: function() {
					this.showConfirmationDialog(this.get("Resources.Strings.DeleteEmailMessage"),
						function(result) {
							if(result === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
								this.deleteActivity();
							}
						},
						["yes", "no"]);
				},

				/**
				 * Deletes activity.
				 * @protected
				 */
				deleteActivity: function() {
					var operationKey = Terrasoft.generateGUID();
					var params = {
						operationKey: operationKey
					};
					var primaryColumnValues = [this.get("RecordId")];
					this.beforeDeleteHandler(operationKey);
					var paramsJSON = Ext.JSON.encode(params);
					var config = this.getDeleteServiceConfig(primaryColumnValues, paramsJSON);
					this.callService(config, this.deleteActivityCallback, this);
				},

				/**
				 * Configs delete process.
				 * @protected
				 * @param {String} [operationKey] Delete operation key
				 */
				beforeDeleteHandler: function(operationKey) {
					localStorage.setItem(ConfigurationConstants.MultiDelete.MultiDeleteLocalStorageKey,
						operationKey);
					this.sandbox.subscribe("MultiDeleteFinished", this.afterDeleteHandler, this);
					this._loadMultiDeleteResultModule();
					this.sandbox.publish("MultiDeleteStart", {operationKey: operationKey});
				},

				/**
				 * Calls when delete process is finished
				 * @protected
				 * @param {Object} [result] Callback parameter.
				 */
				afterDeleteHandler: function(result) {
					if(result.success) {
						this.deleteMessageFromHistory();
						this.sandbox.unRegisterMessages(["MultiDeleteFinished"]);
						this._registerMultiDeleteMessages();
					}
				},

				/**
				 * Callback for deleteActivity method.
				 * @protected
				 * @param {Object} [responseObject] Service response.
				 */
				deleteActivityCallback: function(responseObject) {
					if(!responseObject || !responseObject.DeleteRecordsAsyncResult) {
						this.hideBodyMask();
						throw new Terrasoft.UnknownException();
					}
					var result = this.Terrasoft.decode(responseObject.DeleteRecordsAsyncResult);
					var success = result.Success;
					if(!success) {
						this.hideBodyMask();
						this.showInformationDialog(this.get("Resources.Strings.DeleteEmailErrorMessage"));
					}
				},

				/**
				 * Registers multidelete messages
				 * @private
				 */
				_registerMultiDeleteMessages: function() {
					var messages = {
						"MultiDeleteStart": {
							"mode": Terrasoft.MessageMode.BROADCAST,
							"direction": Terrasoft.MessageDirectionType.PUBLISH
						},
						"MultiDeleteFinished": {
							"mode": Terrasoft.MessageMode.BROADCAST,
							"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
						}
					};
					this.sandbox.registerMessages(messages);
				},

				/**
				 * Loads multidelete result module.
				 * @private
				 */
				_loadMultiDeleteResultModule: function() {
					if(Terrasoft.MultiDeleteResultSchemaViewModel) {
						this.sandbox.loadModule("BaseSchemaModuleV2", {
							id: this.sandbox.id + "_multiDeleteResultModule",
							instanceConfig: {
								generateViewContainerId: false,
								useHistoryState: false,
								schemaName: "MultiDeleteResultSchema",
								isSchemaConfigInitialized: true
							},
							keepAlive: true
						});
					}
				},

				/**
				 * Deletes message form the history.
				 * @protected
				 */
				deleteMessageFromHistory: function() {
					var recordInfo = this.getRecordInfo();
					var deleteQuery = Ext.create("Terrasoft.DeleteQuery", {
						rootSchemaName: recordInfo.historySchemaName
					});
					deleteQuery.filters.add(deleteQuery.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Id", this.get("Id")));
					deleteQuery.execute(function(response) {
						if(response && response.success) {
							this.sandbox.publish("DeleteMessageFromHistory", this.get("Id"));
						}
					}, this);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "HistoryV2PortalEmailMessageVisibilityContainer",
					"parentName": "HistoryV2MessageFooterContainer",
					"propertyName": "items",
					"values": {
						"id": "PortalEmailMessageVisibilityContainer",
						"markerValue": "HistoryV2PortalEmailMessageVisibilityContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["visibilityContainer"],
						"items": []
					},
					"index": 1
				},
				{
					"operation": "insert",
					"parentName": "HistoryV2PortalEmailMessageVisibilityContainer",
					"propertyName": "items",
					"name": "VisibilityIcon",
					"values": {
						"getSrcMethod": "getVisibilityIcon",
						"readonly": true,
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"classes": {"wrapClass": ["visibilityIcon"]}
					},
					"index": 0
				},
				{
					"operation": "insert",
					"parentName": "HistoryV2PortalEmailMessageVisibilityContainer",
					"propertyName": "items",
					"name": "DeleteEmailImageButton",
					"values": {
						"getSrcMethod": "getDeleteEmailIcon",
						"readonly": true,
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"classes": {"wrapClass": ["delete-email-icon"]},
						"markerValue": "DeleteDraftEmail",
						"onImageClick": {
							"bindTo": "onDeleteEmail"
						},
						"visible": {
							"bindTo": "isDraftLabelVisible"
						}
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "HistoryV2HideEmailOnPortalLabel",
					"parentName": "HistoryV2PortalEmailMessageVisibilityContainer",
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
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "ShowEmailOnPortalLabel",
					"parentName": "HistoryV2PortalEmailMessageVisibilityContainer",
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
					},
					"index": 2
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


