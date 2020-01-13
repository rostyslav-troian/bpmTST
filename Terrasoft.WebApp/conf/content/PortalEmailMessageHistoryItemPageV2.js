Terrasoft.configuration.Structures["PortalEmailMessageHistoryItemPageV2"] = {innerHierarchyStack: ["PortalEmailMessageHistoryItemPageV2"], structureParent: "BaseEmailMessageHistoryItemPage"};
define('PortalEmailMessageHistoryItemPageV2Structure', ['PortalEmailMessageHistoryItemPageV2Resources'], function(resources) {return {schemaUId:'d601a276-d161-4cee-8a27-0a0999ae89ea',schemaCaption: "PortalEmailMessageHistoryItemPageV2", parentSchemaName: "BaseEmailMessageHistoryItemPage", schemaName:'PortalEmailMessageHistoryItemPageV2',parentSchemaUId:'0727ef67-319a-4668-b4f6-3c87cd87442c',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalEmailMessageHistoryItemPageV2", ["PortalEmailMessageHistoryItemPageV2Resources", "PortalMessageConstants",
		"PortalEmailMessageMixin", "css!EmailMessageHistoryItemStyleV2"],
	function(resources, PortalMessageConstants) {
		return {
			entitySchemaName: "BaseMessageHistory",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			attributes: {
				/**
				 * @inheritdoc Terrasoft.BaseEmailMessageHistoryPage#ConnectionColumnsPath
				 * @override
				 */
				"ConnectionColumnsPath": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"value": undefined
				},
				/**
				 * Recipients in portal email message.
				 */
				"EmailRecipients": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT
				},
				/**
				 * Message type - incoming or outgoing.
				 */
				"MessageType": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT
				},
				/**
				 * Email sender.
				 */
				"EmailSender": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT
				},
				/**
				 * Indicates visibility of message history item.
				 */
				"IsMessageItemVisible": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"value": false
				}
			},
			properties: {
				/**
				 * Files preview button link template.
				 */
				hrefTplFormat: "<a href='" + Terrasoft.getConfigurationWebServiceBaseUrl() +
					"/rest/PortalFileService/GetActivityFile/{0}/{1}' vngrop='{2}'>{3}</a>"
			},
			mixins: {
				PortalEmailMessageMixin: "Terrasoft.PortalEmailMessageMixin"
			},
			methods: {
				/**
				 * @inheritDoc Terrasoft.BaseMessageHistoryPage#openCreatedByPage
				 * @override
				 */
				openCreatedByPage: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc BaseMessageHistoryItemPage#init
				 * @overridden
				 */
				init: function(callback) {
					this.callParent([function() {
						this.setPortalEmailMessageAttributes(callback);
					}, this]);
					this.replaceFileServiceWithPortalFileService();
				},

				/**
				 * Replace links to FileService with PortalFileService
				 * @protected
				 */
				replaceFileServiceWithPortalFileService: function() {
					var message = this.get("Message");
					var stringToReplace = this.Ext.String.format(
						PortalMessageConstants.SystemServicePath.systemServicePath,
						PortalMessageConstants.ActivityFileSchemaUid.activityFileSchemaUid);
					var replacementString = this.Ext.String.format(
						PortalMessageConstants.PortalServicePath.portalServicePath, this.get("Id"));
					var processedMessage = message.replace(new RegExp(stringToReplace, 'gi'), replacementString);
					this.set("Message", processedMessage);
				},

				/**
				 * @inheritdoc Terrasoft.BaseEmailMessageHistoryPage#getNotifierGroup
				 * @override
				 */
				getNotifierGroup: function(esq) {
					return esq.createColumnIsNotNullFilter("Id");
				},

				/**
				 * @inheritdoc BaseMessageHistoryItemPage#getHistoryFiles
				 * @overridden
				 */
				getHistoryFiles: function(callback, scope) {
					var caseMessageHistoryId = this.get("Id");
					var config = {
						serviceName: "PortalFileService",
						methodName: "GetActivityFiles",
						scope: this,
						data: {
							caseMessageHistoryId: caseMessageHistoryId
						}
					};
					this.callService(config, function(result) {
						this.getActivityFilesCallback(result, callback, scope);
					}, this);
				},

				/**
				 * Filled collection received from callback getHistoryFiles
				 * @param {Object} result Result object with files collection.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function's scope.
				 * @protected
				 */
				getActivityFilesCallback: function(result, callback, scope) {
					if (result && result.GetActivityFilesResult) {
						var collection = result.GetActivityFilesResult.activityFiles;
						if (collection && collection.length > 0) {
							this.set("IsFilesAttached", true);
							var filesConfigs = [];
							this.Terrasoft.each(collection, function (item) {
								filesConfigs.push({
									Name: item.Name,
									Id: item.Id
								});
							}, this);
							callback.call(scope || this, filesConfigs);
						}
					}
				},

				/**
				 * @inheritdoc BaseMessageHistoryItemPage#getFileItemUrl
				 * @overridden
				 */
				getFileItemUrl: function (config) {
					return this.Ext.String.format(PortalMessageConstants.UrlPortalTemplate.FileUrlTemplate,
						this.get("Id"), config.Id, config.Name);
				},

				/**
				 * @inheritdoc BaseMessageHistoryItemPage#getImageFileItemUrl
				 * @overridden
				 */
				getImageFileItemUrl: function(config) {
					return this.Ext.String.format(this.hrefTplFormat,
						this.get("Id"), config.Id, this._getMessageFilesGroupId(), config.Name);
				},

				/**
				 * @inheritdoc Terrasoft.BaseEmailMessageHistoryPage#getHistoryMessageColumns
				 * @override
				 */
				getHistoryMessageColumns: function() {
					return ["Message"];
				},

				getChannelIcon: function () {
					return Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.EmailChannelIcon"));
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "HistoryV1Container"
				},
				{
					"operation": "merge",
					"name": "HistoryV2Container",
					"propertyName": "items",
					"values": {
						"visible": {
							"bindTo": "IsMessageItemVisible"
						}
					}
				},
				{
					"operation": "merge",
					"name": "HistoryV2EmailRecepient",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.ToString"
						}
					}
				},
				{
					"operation": "merge",
					"name": "HistoryV2CreatedByLink",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getCreatedByName"
						},
						"markerValue": "CreatedByLink"
					}
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
								"showFloatButton": false,
								"frameBodyStyle": {
									"overflow": "hidden",
									"margin": 0,
									"font-family": "Calibri",
									"font-size": "15px",
									"lineHeight": "18px",
									"color": "#444444"
								}
							};
						}
					},
					"index": 2
				},
				{
					"operation": "insert",
					"name": "HistoryV2DraftLabel",
					"parentName": "HistoryV2MessageContentContainer",
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
					"parentName": "HistoryV2MessageContentContainer",
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
					"name": "HistoryV2MessageContentContainer",
					"parentName": "HistoryV2Container",
					"propertyName": "items",
					"values": {
						"afterrerender": {
							"bindTo": "applyVanillaLogic"
						},
						"afterrender": {
							"bindTo": "applyVanillaLogic"
						}
					}
				},
				{
					"operation": "insert",
					"name": "MessageFiles",
					"parentName": "HistoryV2MessageContentContainer",
					"propertyName": "items",
					"values": {
						"generator": function() {
							return {
								"id": "FilesText",
								"markerValue": "FilesText",
								"className": "Terrasoft.MultilineFileLabel",
								"classes": {
									"multilineLabelClass": ["inline-message-history-files"]
								},
								"caption": {
									"bindTo": "FilesText"
								},
								"filesCount": {
									"bindTo": "FilesCount"
								},
								"showLinks": true
							};
						}
					}
				},
				{
					"operation": "remove",
					"name": "HistoryV2FileDetailContainer"
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


