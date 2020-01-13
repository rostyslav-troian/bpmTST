Terrasoft.configuration.Structures["BaseEmailMessageHistoryItemPage"] = {innerHierarchyStack: ["BaseEmailMessageHistoryItemPage"], structureParent: "BaseMessageHistoryItemPage"};
define('BaseEmailMessageHistoryItemPageStructure', ['BaseEmailMessageHistoryItemPageResources'], function(resources) {return {schemaUId:'0727ef67-319a-4668-b4f6-3c87cd87442c',schemaCaption: "BaseEmailMessageHistoryItemPage", parentSchemaName: "BaseMessageHistoryItemPage", schemaName:'BaseEmailMessageHistoryItemPage',parentSchemaUId:'0ef50616-3207-40b1-a55e-03efde67d8d1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseEmailMessageHistoryItemPage", ["ConfigurationConstants", "css!EmailMessageHistoryItemStyle"],
	function(ConfigurationConstants) {
		return {
			entitySchemaName: "BaseMessageHistory",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			attributes: {
				/**
				 * String, that is used for connection message history, activity or another entity.
				 */
				"ConnectionColumnsPath": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT
				}
			},
			messages: {},
			methods: {
				/*
				 * Returns columns array for case message history esq.
				 * @protected
				 * @virtual
				 * @return {Array} Array of columns.
				 */
				getHistoryMessageColumns: this.Terrasoft.emptyFn,

				/*
				 * Returns filter by message notifiers.
				 * @protected
				 * @virtual
				 * @param {Object} Esq object.
				 * @return {Object} Esq filter.
				 */
				getNotifierGroup: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseMessageHistoryPage#historyMessageEsqApply
				 * @override
				 */
				historyMessageEsqApply: function(esq) {
					var columns = this.getHistoryMessageColumns();
					this.Terrasoft.each(columns, function(column) {
						if (!esq.columns.collection.containsKey(column)) {
							esq.addColumn(column);
						}
					});
					var filterGroup = this.getNotifierGroup(esq);
					esq.filters.addItem(filterGroup);
				},

				/**
				 * Returns wrap container marker value.
				 * @protected
				 * @virtual
				 * @return {String} Wrap container marker value.
				 */
				getWrapContainerMarkerValue: function() {
					var messageType = this.get(this.$ConnectionColumnsPath + ".MessageType");
					if (messageType.value === ConfigurationConstants.Activity.MessageType.Incoming) {
						return "IncomingEmailHistoryMessageWrapContainer";
					} else {
						return "OutgoingEmailHistoryMessageWrapContainer";
					}
				},

				/**
				 * Message pre-processing.
				 * @protected
				 * @param value Bound message.
				 * @returns {String} Processed message.
				 */
				prepareMessage: function(value) {
					value = this.validateMessage(value);
					return this._changeLinksTargeting(value);
				},

				/**
				 * Validates content.
				 * @protected
				 * @param {String} message Source string.
				 * @return {String} Modified string.
				 */
				validateMessage: function(message) {
					if (message && this.Ext.isString(message)) {
						var bodyPattern = /(<style[^>]*>[^>]*)(\bbody\b[^}]*\})([^]*<\/style>)/gmi;
						message = message.replace(bodyPattern,
							function(fullMessage, leftExpression, expressionToReplace, rightExpression) {
								return String(String(leftExpression) + String(rightExpression));
							});
						return message.replace(/<base[^>]*>/gi, "");
					}
					return message;
				},

				/**
				 * Replace targets in links to blank page.
				 * @private
				 * @param messageText Source message text.
				 * @returns {String} Text with targeted to blank page links.
				 */
				_changeLinksTargeting: function(messageText) {
					var linkPattern = /<a\b[^>]+?>/gi;
					var links = messageText.match(linkPattern);
					if (!links) {
						return messageText;
					}
					var targetBlankPattern = /\btarget\s*=\s*"_blank"/i;
					var targetBlankSubstitute = "target=\"_blank\"";
					for (var i = 0; i < links.length; i++) {
						if (!links[i].match(targetBlankPattern)) {
							var targetedLink = links[i].replace(/\btarget\s*=\s*".*?"/gi, targetBlankSubstitute);
							if (targetedLink !== links[i]) {
								messageText = messageText.replace(links[i], targetedLink);
							} else {
								targetedLink = links[i].replace(">", " " + targetBlankSubstitute + ">");
								messageText = messageText.replace(links[i], targetedLink);
							}
						}
					}
					return messageText;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "HistoryMessageWrapContainer",
					"values": {
						"wrapClass": ["historyMessageWrap", "historyEmailMessageWrap"],
						"markerValue": {
							"bindTo": "getWrapContainerMarkerValue"
						}
					}
				},
				{
					"operation": "merge",
					"name": "MessageContentContainer",
					"values": {
						"wrapClass": ["messageContent", "speech-bubble"]
					}
				},
				{
					"operation": "insert",
					"name": "CreatedByLink",
					"parentName": "CreatedByLinkWrapContainer",
					"propertyName": "items",
					"values": {
						"classes": {
							"hyperlinkClass": ["link", "createdByLink", "label-url", "label-link"]
						},
						"caption": {
							"bindTo": "getCreatedByName"
						},
						"markerValue": "CreatedByLink"
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "CreatedByLinkWrapContainer",
					"parentName": "EmailRecepientWrapContainer",
					"propertyName": "items",
					"values": {
						"id": "CreatedByLinkWrapContainer",
						"markerValue": "CreatedByLinkWrapContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["createdByLinkWrap"],
						"items": []
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "EmailRecepientWrapContainer",
					"parentName": "MessageHeaderContainer",
					"propertyName": "items",
					"values": {
						"id": "EmailRecepientWrapContainer",
						"markerValue": "EmailRecepientWrapContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["emailRecepientWrap"],
						"items": []
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "EmailRecepientLabel",
					"parentName": "EmailRecepientWrapContainer",
					"propertyName": "items",
					"values": {
						"id": "EmailRecepientLabel",
						"labelClass": ["emailRecepientLabel"],
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.ToString"
						}
					},
					"index": 2
				},
				{
					"operation": "insert",
					"name": "EmailRecepient",
					"parentName": "EmailRecepientWrapContainer",
					"propertyName": "items",
					"values": {
						"id": "EmailRecepient",
						"labelClass": ["emailRecepient"],
						"itemType": this.Terrasoft.ViewItemType.LABEL
					},
					"index": 3
				},
				{
					"operation": "insert",
					"name": "EmailSenderWrapContainer",
					"parentName": "MessageHeaderContainer",
					"propertyName": "items",
					"values": {
						"id": "EmailSenderWrapContainer",
						"markerValue": "EmailSenderWrapContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["emailSenderWrap"],
						"items": []
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "EmailSenderLabel",
					"parentName": "EmailSenderWrapContainer",
					"propertyName": "items",
					"values": {
						"id": "EmailSenderLabel",
						"labelClass": ["emailSenderLabel"],
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.FromString"
						}
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "EmailSender",
					"parentName": "EmailSenderWrapContainer",
					"propertyName": "items",
					"values": {
						"id": "EmailSender",
						"labelClass": ["emailSender"],
						"itemType": this.Terrasoft.ViewItemType.LABEL
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "AdditionalInfoWrapContainer",
					"parentName": "MessageHeaderContainer",
					"propertyName": "items",
					"values": {
						"id": "AdditionalInfoWrapContainer",
						"markerValue": "AdditionalInfoWrapContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["additionalInfoWrap"],
						"items": []
					},
					"index": 2
				},
				{
					"operation": "insert",
					"name": "CreationInfoWrapContainer",
					"parentName": "AdditionalInfoWrapContainer",
					"propertyName": "items",
					"values": {
						"id": "CreationInfoWrapContainer",
						"markerValue": "CreationInfoWrapContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["creationInfoWrap"],
						"items": []
					},
					"index": 3
				},
				{
					"operation": "insert",
					"name": "CreationInfo",
					"parentName": "CreationInfoWrapContainer",
					"propertyName": "items",
					"values": {
						"id": "CreationInfo",
						"labelClass": ["creationInfoLabel"],
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getCreationInfo"
						}
					},
					"index": 3
				},

				//NEW DIFF

				{
					"operation": "insert",
					"itemType": this.Terrasoft.ViewItemType.HYPERLINK,
					"name": "HistoryV2CreatedByLink",
					"parentName": "HistoryV2MessageHeaderCenterContainer",
					"propertyName": "items",
					"values": {
						"classes": {
							"hyperlinkClass": ["link", "createdByLink", "label-url", "label-link"]
						},
						"caption": {
							"bindTo": "getCreatedByName"
						},
						"markerValue": "CreatedByLink"
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "HistoryV2EmailRecepientInfo",
					"parentName": "HistoryV2MessageHeaderCenterContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["inline-container"],
						"items": []
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "HistoryV2EmailRecepientsContainer",
					"parentName": "HistoryV2EmailRecepientInfo",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["emailRecepients-container"],
						"items": []
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "HistoryV2EmailRecepientLabel",
					"parentName": "HistoryV2EmailRecepientInfo",
					"propertyName": "items",
					"values": {
						"id": "EmailRecepientLabel",
						"labelClass": ["emailRecepientLabel header-text"],
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.ToString"
						}
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "HistoryV2EmailRecepient",
					"parentName": "HistoryV2EmailRecepientsContainer",
					"propertyName": "items",
					"values": {
						"id": "EmailRecepient",
						"labelClass": ["emailRecepient header-text"],
						"itemType": this.Terrasoft.ViewItemType.LABEL
					},
					"index": 1
				}

			]/**SCHEMA_DIFF*/
		};
	}
);


