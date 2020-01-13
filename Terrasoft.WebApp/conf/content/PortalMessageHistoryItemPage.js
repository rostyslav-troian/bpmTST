Terrasoft.configuration.Structures["PortalMessageHistoryItemPage"] = {innerHierarchyStack: ["PortalMessageHistoryItemPagePortalMessage", "PortalMessageHistoryItemPage"], structureParent: "BaseMessageHistoryItemPage"};
define('PortalMessageHistoryItemPagePortalMessageStructure', ['PortalMessageHistoryItemPagePortalMessageResources'], function(resources) {return {schemaUId:'3bebbf32-491a-4614-9235-66d642fc0e1c',schemaCaption: "Portal message history item page", parentSchemaName: "BaseMessageHistoryItemPage", schemaName:'PortalMessageHistoryItemPagePortalMessage',parentSchemaUId:'0ef50616-3207-40b1-a55e-03efde67d8d1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('PortalMessageHistoryItemPageStructure', ['PortalMessageHistoryItemPageResources'], function(resources) {return {schemaUId:'2622a98f-f07b-460a-9ab1-2143a58cd191',schemaCaption: "Portal message history item page", parentSchemaName: "PortalMessageHistoryItemPagePortalMessage", schemaName:'PortalMessageHistoryItemPage',parentSchemaUId:'3bebbf32-491a-4614-9235-66d642fc0e1c',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"PortalMessageHistoryItemPagePortalMessage",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('PortalMessageHistoryItemPagePortalMessageResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("PortalMessageHistoryItemPagePortalMessage", ["PortalMessageConstants", "PortalMessageMixin",
	"css!PortalMessageHistoryItemStyle"],
	function(PortalMessageConstants) {
		return {
			entitySchemaName: "BaseMessageHistory",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			attributes: {
				/**
				 * SSP connection type flag.
				 */
				"IsSSP": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN
				},

				/**
				 * HideOnPortal value.
				 */
				"HideOnPortalValue": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"value": true
				},

				/**
				 * File attachment status.
				 */
				"IsFilesAttached": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},

				/**
				 * Portal message type.
				 */
				"Type": {
					"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT
				},

				/**
				 * Flag, indicates direction of portal message.
				 */
				"IsFromPortal": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN
				}
			},
			mixins: {
				PortalMessageMixin: "Terrasoft.PortalMessageMixin"
			},
			methods: {

				/**
				 * @inheritdoc BasePageV2#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					var isSSP = Terrasoft.isCurrentUserSsp();
					this.set("IsSSP", isSSP);
					if (Terrasoft.Features.getIsEnabled("SecurePortalMessage") && isSSP) {
						this.setPortalMessageAttributes(this.initPortalMessageAttributes, this);
					} else {
						this.$HideOnPortalValue = this.get("[PortalMessage:Id:RecordId].HideOnPortal");
						this.$IsFromPortal = this.get("[PortalMessage:Id:RecordId].FromPortal");
					}
				},

				/**
				 * @protected
				 * @param {Object} response Response from portal message service.
				 */
				initPortalMessageAttributes: function(response) {
					if (response && response.GetPortalMessageAttributesResult) {
						const result = response.GetPortalMessageAttributesResult;
						this.$HideOnPortalValue = result.hideOnPortal;
						this.$IsFromPortal = result.fromPortal;
						this.$Type = {
							"value": result.messageType,
							"displayValue": result.messageTypeCaption
						};
					}
				},

				/**
				 * @inheritDoc Terrasoft.BaseMessageHistoryPage#getHistoryFiles
				 * @overridden
				 */
				getHistoryFiles: function(callback, scope) {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "PortalMessageFile"
					});
					esq.addColumn("Name");
					esq.addColumn("Id");
					esq.filters.addItem(esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"PortalMessage", this.get("RecordId")));
					esq.getEntityCollection(function(result) {
						var collection = result.collection;
						if (collection && collection.collection.length > 0) {
							this.set("IsFilesAttached", true);
							var filesConfigs = [];
							this.Terrasoft.each(collection.collection.items, function(item) {
								filesConfigs.push({
									Name: item.get("Name"),
									Id: item.get("Id"),
									SchemaUId: PortalMessageConstants.SysSchemaUId.PortalMessageFile
								});
							}, this);
							callback.call(scope || this, filesConfigs);
						}
					}, this);
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
				 * @inheritDoc Terrasoft.BaseMessageHistoryPage#historyMessageEsqApply
				 * @overridden
				 */
				historyMessageEsqApply: function(esq) {
					var isSSP = Terrasoft.isCurrentUserSsp();
					esq.addColumn("Message");
					if (!isSSP || Terrasoft.Features.getIsDisabled("SecurePortalMessage")) {
						var columns = ["[PortalMessage:Id:RecordId].FromPortal",
							"[PortalMessage:Id:RecordId].HideOnPortal"];
						this.Terrasoft.each(columns, function(column) {
							if (!esq.columns.collection.containsKey(column)) {
								esq.addColumn(column);
							}
						});
						esq.addColumn("[PortalMessage:Id:RecordId].Type", "Type");
						var filterGroup = esq.createFilterGroup();
						filterGroup.name = "PortalNotifierFilter";
						filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
						var filterInnerGroup = esq.createFilterGroup();
						filterInnerGroup.name = "PortalNotifierInnerFilter";
						filterInnerGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
						filterInnerGroup.add("PortalMessageExists",
							esq.createExistsFilter("[PortalMessage:Id:RecordId].Id"));
						if (isSSP) {
							filterInnerGroup.add("PortalMessageHideOnPortal", esq.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL,
								"[PortalMessage:Id:RecordId].HideOnPortal", false));
						}
						filterGroup.add(filterInnerGroup);
						filterGroup.add("NotPortalNotifier", esq.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.NOT_EQUAL, "MessageNotifier",
							PortalMessageConstants.MessageNotifier.Portal));
						esq.filters.addItem(filterGroup);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseMessageHistoryPage#historyMessageEsqApply
				 * @overridden
				 */
				getCreatedByUrl: function() {
					if (this.get("IsSSP")) {
						return "";
					} else {
						return this.callParent(arguments);
					}
				},

				/**
				 * @inheritDoc Terrasoft.BaseMessageHistoryPage#openCreatedByPage
				 * @overridden
				 */
				openCreatedByPage: Terrasoft.emptyFn,

				/**
				 * Returns wrap container marker value.
				 * @private
				 * @return {String} Wrap container marker value.
				 */
				getWrapContainerMarkerValue: function() {
					var fromPortal = this.$IsFromPortal;
					var isSSP = this.get("IsSSP");
					if ((fromPortal && isSSP) || (!fromPortal && !isSSP)) {
						return "OutgoingPortalHistoryMessageWrapContainer";
					} else {
						return "IncomingPortalHistoryMessageWrapContainer";
					}
				},

				/**
				 * Checks rights for manage portal message visibility.
				 * @private
				 * @returns {Boolean} Can manage portal message visibility flag.
				 */
				canManagePortalMessageVisibility: function() {
					var fromPortal = this.$IsFromPortal;
					var isSSP = this.get("IsSSP");
					return !fromPortal && !isSSP;
				},

				/**
				 * Returns "Hide on portal" label visibility.
				 * @public
				 * @returns {Boolean} "Hide on portal" label visibility.
				 */
				isHideOnPortalLabelVisible: function() {
					return this.canManagePortalMessageVisibility() && !this.get("HideOnPortalValue");
				},

				/**
				 * Returns "Show on portal" label visibility.
				 * @public
				 * @returns {Boolean} "Show on portal" label visibility.
				 */
				isShowOnPortalLabelVisible: function() {
					return this.canManagePortalMessageVisibility() && this.get("HideOnPortalValue");
				},

				/**
				 * Hides message on portal.
				 * @public
				 */
				hideMessageOnPortal: function() {
					this._showPortalMessageButtonDialog(this.get("Resources.Strings.HideConfirmationMessage"), true);
				},

				/**
				 * Shows message on portal.
				 * @public
				 */
				showMessageOnPortal: function() {
					this._showPortalMessageButtonDialog(this.get("Resources.Strings.ShowConfirmationMessage"), false);
				},

				_showPortalMessageButtonDialog: function(message, state) {
					this.showConfirmationDialog(message,
						function(result) {
							if (result === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
								this.updatePortalMessage(state);
							}
						},
					["yes", "no"]);
				},

				/**
				 * Updates portal message.
				 * @private
				 * @param {Object} value The new value for HideOnPortal.
				 */
				updatePortalMessage: function(value) {
					var update = Ext.create("Terrasoft.UpdateQuery", {
						rootSchemaName: "PortalMessage"
					});
					update.filters.add("PortalMessageIdFilter",
						update.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Id", this.get("RecordId")));
					update.setParameterValue("HideOnPortal", value, this.Terrasoft.DataValueType.BOOLEAN);
					update.execute();
					this.set("HideOnPortalValue", value);
				},

				/**
				 * Returns a localizable caption for "Type" field.
				 * @returns {String}
				 */
				getMessageTypeLabelText: function() {
					if (this.get("Type")) {
						var typeCaption = this.get("Resources.Strings.TypeCaption");
						return this.Ext.String.format(typeCaption, this.get("Type").displayValue);
					}
				},

				/**
				 * Returns "Type" caption visibility.
				 * @returns {boolean}
				 */
				getMessageTypeIsVisible: function() {
					return	this.get("Type")
						? this.get("Type").value === PortalMessageConstants.PortalMessageType.Complain : false;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "HistoryMessageWrapContainer",
					"values": {
						"wrapClass": ["historyMessageWrap", "historyPortalMessageWrap"],
						"markerValue": {
							"bindTo": "getWrapContainerMarkerValue"
						},
						"visible": {
							"bindTo": "HideOnPortalValue",
							"bindConfig": {
								converter: function(value) {
									return Terrasoft.isCurrentUserSsp() ? !value: true;
								}
							}
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
					"operation": "insert",
					"name": "CreatedByLink",
					"parentName": "MessageHeaderContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.HYPERLINK,
						"classes": {
							"hyperlinkClass": ["link", "createdByLink", "label-url", "label-link"]
						},
						"caption": {
							"bindTo": "getCreatedByName"
						},
						"href": {
							"bindTo": "getCreatedByUrl"
						},
						"markerValue": "CreatedByLink",
						"target": this.Terrasoft.controls.HyperlinkEnums.target.SELF,
						"visible": {
							"bindTo": "IsSSP",
							"bindConfig": {
								converter: function(value) {
									return !value;
								}
							}
						}
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "CreatedByLabel",
					"parentName": "MessageHeaderContainer",
					"propertyName": "items",
					"values": {
						"id": "CreatedByLabel",
						"labelClass": ["createdByLink"],
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getCreatedByName"
						},
						"markerValue": "CreatedByLabel",
						"visible": {
							"bindTo": "IsSSP"
						}
					},
					"index": 2
				},
				{
					"operation": "insert",
					"name": "CreationInfo",
					"parentName": "MessageHeaderContainer",
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
				{
					"operation": "insert",
					"name": "FileAttachmentsImage",
					"parentName": "MessageHeaderContainer",
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
					"index": 4
				},				{
					"operation": "insert",
					"name": "PortalMessageVisibilityContainer",
					"parentName": "MessageContentContainer",
					"propertyName": "items",
					"values": {
						"id": "PortalMessageVisibilityContainer",
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24,
							"rowSpan": 1
						},
						"markerValue": "PortalMessageVisibilityContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["portalMessageVisibilityContainer"],
						"items": []
					},
					"index": 3
				},
				{
					"operation": "insert",
					"name": "HideOnPortalLabel",
					"parentName": "PortalMessageVisibilityContainer",
					"propertyName": "items",
					"values": {
						"id": "HideOnPortalLabel",
						"labelClass": ["portalMessageVisibilityLabel"],
						"markerValue": "HideOnPortalLabel",
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.HideOnPortalString"
						},
						"visible": {
							"bindTo": "isHideOnPortalLabelVisible"
						},
						"click": {
							"bindTo": "hideMessageOnPortal"
						}
					}
				},
				{
					"operation": "insert",
					"name": "ShowOnPortalLabel",
					"parentName": "PortalMessageVisibilityContainer",
					"propertyName": "items",
					"values": {
						"id": "ShowOnPortalLabel",
						"labelClass": ["portalMessageVisibilityLabel"],
						"markerValue": "ShowOnPortalLabel",
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.ShowOnPortalString"
						},
						"visible": {
							"bindTo": "isShowOnPortalLabelVisible"
						},
						"click": {
							"bindTo": "showMessageOnPortal"
						}
					}
				},
				{
					"operation": "insert",
					"name": "MessageType",
					"parentName": "MessageBodyContainer",
					"propertyName": "items",
					"values": {
						"generator": function() {
							return {
								"id": "MessageType",
								"markerValue": "MessageType",
								"className": "Terrasoft.Label",
								"classes": {
									"multilineLabelClass": ["messageText"]
								},
								"caption": {
									"bindTo": "getMessageTypeLabelText"
								},
								"visible": {
									"bindTo": "getMessageTypeIsVisible"
								}
							};
						}
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "CommentLabelCaption",
					"parentName": "MessageBodyContainer",
					"propertyName": "items",
					"values": {
						"generator": function() {
							return {
								"id": "CommentLabelCaption",
								"className": "Terrasoft.Label",
								"classes": {
									"multilineLabelClass": ["messageText"]
								},
								"caption": {
									"bindTo": "Resources.Strings.CommentLabelCaption"
								},
								"visible": {
									"bindTo": "getMessageTypeIsVisible"
								}
							};
						}
					},
					"index": 1
				}
			]/**SCHEMA_DIFF*/
		};
	}
);

define("PortalMessageHistoryItemPage", ["ServiceDeskConstants", "PortalMessageConstants",
		"css!PortalMessageHistoryItemStyle"],
	function(ServiceDeskConstants, PortalMessageConstants) {
		return {
			entitySchemaName: "BaseMessageHistory",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			attributes: {

				/**
				 * Case origin.
				 */
				"CaseOrigin": {
					dataValueType: Terrasoft.DataValueType.GUID,
					value: ServiceDeskConstants.CaseOrigin.Portal
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
						message = this.get("Message");
					}
					return message;
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
				 * @inheritDoc Terrasoft.BaseMessageHistoryItemPage#getHistoryData
				 * @overridden
				 */
				getHistoryData: function() {
					var historyData = this.callParent(arguments);
					historyData.recordId = this.get("RecordId");
					return historyData;
				},

				/**
				 * Creates depended CaseMessageHistory entity, which used when new case created.
				 * @private
				 * @param data Data for portal message.
				 * @returns {Array} Array of portal message column values.
				 */
				_getCaseMessageHistoryEntity: function(data) {
					return {
						entitySchemaName: "CaseMessageHistory",
						columnValues: [
							{
								name: "Message",
								value: this.get("Message"),
								dataValueType: this.Terrasoft.DataValueType.TEXT
							},
							{
								name: "RecordId",
								value: data.recordId,
								dataValueType: this.Terrasoft.DataValueType.GUID
							},
							{
								name: "MessageNotifier",
								value: PortalMessageConstants.MessageNotifier.Portal,
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
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "move",
					"name": "EmailAction",
					"parentName": "MessageHeaderContainer",
					"propertyName": "items",
					"index": 3
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
									"bindTo": "Message"
								},
								"showLinks": true,
								"selectedTextChanged": {"bindTo": "onSelectedTextChanged"},
								"selectedTextHandlerButtonClick": {"bindTo": "onSelectedTextButtonClick"},
								"showFloatButton": {"bindTo": "CreateCaseFromHistoryFeatureState"}
							};
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


