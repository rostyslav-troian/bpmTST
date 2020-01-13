Terrasoft.configuration.Structures["PortalCasePage"] = {innerHierarchyStack: ["PortalCasePagePortal", "PortalCasePage"], structureParent: "BaseModulePageV2"};
define('PortalCasePagePortalStructure', ['PortalCasePagePortalResources'], function(resources) {return {schemaUId:'b5f26c3c-a60f-4218-8bb8-b1e38a1071e2',schemaCaption: "Edit page schema - \"Cases\" section on Portal", parentSchemaName: "BaseModulePageV2", schemaName:'PortalCasePagePortal',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('PortalCasePageStructure', ['PortalCasePageResources'], function(resources) {return {schemaUId:'62b49448-dbb9-468c-9223-7fee32834ee5',schemaCaption: "Edit page schema - \"Cases\" section on Portal", parentSchemaName: "PortalCasePagePortal", schemaName:'PortalCasePage',parentSchemaUId:'b5f26c3c-a60f-4218-8bb8-b1e38a1071e2',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"PortalCasePagePortal",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('PortalCasePagePortalResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("PortalCasePagePortal", [
			"ModalBox", "FormatUtils", "PortalCasePageResources", "BusinessRuleModule",
			"ConfigurationEnums", "ServiceDeskConstants", "PortalMessageConstants", "TimezoneUtils",
			"RightUtilities", "CaseTermUtilities", "CaseMessageHistoryUtility", "CaseServiceUtility",
	"PortalCaseSectionActionsDashboard", "ESNHtmlEditModule", "css!CasesEstimateLabel", "css!PortalModulesCSS",
			"css!CasePageCSS"
		],
		function(ModalBox, FormatUtils, resources, BusinessRuleModule, Enums, Constant, portalMessageConstants,
				TimezoneUtils, RightUtilities) {
			return {
				messages: {
					/**
					 * @message SavePublishers
					 * Inform publishers its need to be saved
					 */
					"SavePublishers": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message SendListenerEmailData
					 * Returns email data.
					 */
					"SendListenerEmailData": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message RerenderModule
					 *  Message of rerender for message history module.
					 */
					"RerenderModule": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message InitModuleViewModel
					 * Initialize message of message history view model.
					 */
					"InitModuleViewModel": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message LaunchLoadEmailData
					 * Message that launches loading email data.
					 */
					"LaunchLoadEmailData": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message GetListenerRecordInfo
					 *  Message of getting the listener record information.
					 */
					"GetListenerRecordInfo": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message OnComplainButtonClick
					 * Event Complain button clicked.
					 */
					"OnComplainButtonClick": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message ChangeComplainButtonVisibility
					 * Message for hide complain button.
					 */
					"ChangeComplainButtonVisibility": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				entitySchemaName: "Case",
				mixins: {
					/**
					 * @class CaseTermUtilities implements work with terms on page.
					 */
					CaseTermUtilities: "Terrasoft.CaseTermUtilities",
					/**
					 * @class CaseMessageHistoryUtility implements work case message history.
					 */
					CaseMessageHistoryUtility: "Terrasoft.CaseMessageHistoryUtility",
					/**
					 * @class CaseServiceUtility implements work with service item on page.
					 */
					CaseServiceUtility: "Terrasoft.CaseServiceUtility"
				},
				attributes: {
					"ServiceItem": {
						dependencies: [
							{
								"columns": ["ServiceItem"],
								"methodName": "onServiceItemChanged"
							}
						]
					},
					/**
					 * True, if need show system messages.
					 */
					"NeedShowSystemMessages": {
						"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
						"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": false
					},
					/**
					 * True, if message history group collapsed.
					 */
					"IsMessageHistoryGroupCollapsed": {
						"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
						"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": false
					},
					/**
					 * True, if message history exists.
					 */
					"IsMessageHistoryExists": {
						"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
						"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * IsSolutionOverdue column flag.
					 */
					"IsSolutionOverdue": {
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN
					},
					/**
					 * IsResponseOverdue column flag.
					 */
					"IsResponseOverdue": {
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN
					},
					/**
					 * Status column value.
					 */
					"Status": {
						lookupListConfig: {
							columns: ["IsFinal", "IsResolved", "IsPaused"]
						}
					},
					/**
					 * SatisfactionLevel column value.
					 */
					"SatisfactionLevel": {
						lookupListConfig: {
							filter: function() {
								return Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
										"IsActive", "1");
							}
						}
					},
					/**
					 * SolutionDate column caption value.
					 */
					"SolutionDateCaption": {
						dataValueType: this.Terrasoft.DataValueType.COLLECTION,
						dependencies: [
							{
								columns: ["SolutionDate", "ServiceItem", "Status", "ResponseDate"],
								methodName: "onPlanedDateChanged"
							}
						]
					},
					/**
					 * ResponseDate column caption value.
					 */
					"ResponseDateCaption": {
						dataValueType: this.Terrasoft.DataValueType.COLLECTION
					},
					"CurrentUserDate": {
						dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
					},

					/**
					 * RegisteredOn column value.
					 */
					"RegisteredOn": {
						"dependencies": [
							{
								"columns": ["RegisteredOn"],
								"methodName": "onRegisteredOnChanged"
							}
						]
					},

					/**
					 * CanChangeCaseSatisfactionLevel enable flag.
					 */
					"CanChangeCaseSatisfactionLevel": {
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN
					},

					/**
					 * EnableComplainFunction SysSettings value.
					 */
					"EnableComplainFunction": {
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN
					},

					/**
					 * EnableCancelAction Is cancellation menu item enabled.
					 */
					"EnableCancelAction": {
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN
					},

					/**
					 * EnableReopenAction Is reopened menu item enabled.
					 */
					"EnableReopenAction": {
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN
					}
				},
				details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"name": "ActionsDashboardModule",
						"parentName": "ActionDashboardContainer",
						"propertyName": "items",
						"values": {
							"classes": {
								"wrapClassName": ["actions-dashboard-module"]
							},
							"itemType": this.Terrasoft.ViewItemType.MODULE
						}
					},
					{
						"operation": "insert",
						"name": "ResponseContainer",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.CONTAINER,
							"items": [],
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 24,
								"rowSpan": 1
							}
						},
						"parentName": "ProfileContainer",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "ResponseGridLayout",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
							"id": "ResponseGridLayout",
							"selectors": {"wrapEl": "#ResponseGridLayout"},
							"classes": {
								"wrapClassName": ["response-gridlayout"]
							},
							"items": [],
							"markerValue": "ResponseGridLayout",
							"collapseEmptyRow": true
						},
						"parentName": "ResponseContainer",
						"propertyName": "items",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "ResponseDateProfile",
						"values": {
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 16,
								"rowSpan": 1
							},
							"bindTo": "ResponseDate",
							"enabled": false
						},
						"parentName": "ResponseGridLayout",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "ResponseCaptionProfile",
						"values": {
							"layout": {
								"column": 16,
								"row": 0,
								"colSpan": 8,
								"rowSpan": 1
							},
							"markerValue": "ResponseCaptionContainerProfile",
							"itemType": this.Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["profile-estimate-caption-container"],
							"items": []
						},
						"parentName": "ResponseGridLayout",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "ResponseCaptionValueMinutesDelimiterProfile",
						"parentName": "ResponseCaptionProfile",
						"propertyName": "items",
						"values": {
							"labelClass": ["estimate-caption-label blink"],
							"itemType": this.Terrasoft.ViewItemType.LABEL,
							"caption": ":",
							"markerValue": "ResponseCaptionValueMinutesDelimiterProfile",
							"visible": {
								"bindTo": "isResponseHourVisible"
							}
						},
						"index": 1
					},
					{
						"operation": "insert",
						"name": "ResponseCaptionValueMinutesProfile",
						"parentName": "ResponseCaptionProfile",
						"propertyName": "items",
						"values": {
							"labelClass": ["estimate-caption-label"],
							"itemType": this.Terrasoft.ViewItemType.LABEL,
							"caption": {
								"bindTo": "getResponseDateMinute"
							},
							"markerValue": "ResponseCaptionValueMinutesProfile",
							"visible": {
								"bindTo": "isResponseHourVisible"
							}
						},
						"index": 0
					},
					{
						"operation": "insert",
						"name": "ResponseCaptionValueProfile",
						"parentName": "ResponseCaptionProfile",
						"propertyName": "items",
						"values": {
							"labelClass": ["estimate-caption-label"],
							"itemType": this.Terrasoft.ViewItemType.LABEL,
							"caption": {
								"bindTo": "getResponseDateDay"
							},
							"markerValue": "ResponseCaptionValueProfile",
							"visible": {
								"bindTo": "isResponseCaptionVisible"
							}
						},
						"index": 2
					},
					{
						"operation": "insert",
						"name": "SolutionContainer",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.CONTAINER,
							"items": [],
							"layout": {
								"column": 0,
								"row": 1,
								"colSpan": 24,
								"rowSpan": 1
							}
						},
						"parentName": "ProfileContainer",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "SolutionGridLayout",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
							"id": "SolutionGridLayout",
							"selectors": {"wrapEl": "#SolutionGridLayout"},
							"classes": {
								"wrapClassName": ["solution-gridlayout"]
							},
							"items": [],
							"markerValue": "SolutionGridLayout",
							"collapseEmptyRow": true
						},
						"parentName": "SolutionContainer",
						"propertyName": "items",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "SolutionDateProfile",
						"values": {
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 16,
								"rowSpan": 1
							},
							"bindTo": "SolutionDate",
							"enabled": false
						},
						"parentName": "SolutionGridLayout",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "SolutionCaptionProfile",
						"values": {
							"layout": {
								"column": 16,
								"row": 0,
								"colSpan": 8,
								"rowSpan": 1
							},
							"markerValue": "SolutionCaptionContainerProfile",
							"itemType": this.Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["profile-estimate-caption-container"],
							"items": []
						},
						"parentName": "SolutionGridLayout",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "SolutionCaptionValueMinutesProfile",
						"parentName": "SolutionCaptionProfile",
						"propertyName": "items",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.LABEL,
							"caption": {
								"bindTo": "getSolutionDateMinute"
							},
							"markerValue": "SolutionCaptionValueMinutesProfile",
							"visible": {
								"bindTo": "isSolutionHourVisible"
							},
							"labelClass": ["estimate-caption-label"]
						}
					},
					{
						"operation": "insert",
						"name": "SolutionCaptionValueMinutesDelimiterProfile",
						"parentName": "SolutionCaptionProfile",
						"propertyName": "items",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.LABEL,
							"caption": ":",
							"markerValue": "SolutionCaptionValueMinutesDelimiterProfile",
							"visible": {
								"bindTo": "isSolutionHourVisible"
							},
							"labelClass": ["estimate-caption-label blink"]
						}
					},
					{
						"operation": "insert",
						"name": "SolutionCaptionValueProfile",
						"parentName": "SolutionCaptionProfile",
						"propertyName": "items",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.LABEL,
							"caption": {
								"bindTo": "getSolutionDateDay"
							},
							"markerValue": "SolutionCaptionValueProfile",
							"visible": {
								"bindTo": "isSolutionCaptionVisible"
							},
							"labelClass": ["estimate-caption-label"],
							"hint": {
								"bindTo": "getSolutionCaptionHint"
							}
						}
					},
					{
						"operation": "insert",
						"name": "CaseCategory",
						"values": {
							"layout": {
								"column": 0,
								"row": 2,
								"colSpan": 24,
								"rowSpan": 1
							},
							"bindTo": "Category",
							"isRequired": true,
							"contentType": this.Terrasoft.ContentType.ENUM
						},
						"alias": {
							"name": "Category",
							"excludeProperties": ["layout"],
							"excludeOperations": ["remove", "move"]
						},
						"parentName": "ProfileContainer",
						"propertyName": "items",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "ServiceItem",
						"values": {
							"layout": {
								"column": 0,
								"row": 3,
								"colSpan": 24,
								"rowSpan": 1
							},
							"bindTo": "ServiceItem",
							"contentType": this.Terrasoft.ContentType.ENUM
						},
						"parentName": "ProfileContainer",
						"propertyName": "items",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "ProcessingTab",
						"values": {
							"caption": {"bindTo": "Resources.Strings.ProcessingTabCaption"},
							"items": []
						},
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "FeedbackGroup",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
							"caption": {"bindTo": "Resources.Strings.FeedbackGroupCaption"},
							"items": [],
							"controlConfig": {
								"visible": {"bindTo": "getFeedbackGroupVisible"}
							}
						},
						"parentName": "ProcessingTab",
						"propertyName": "items",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "FeedbackControlGroup_GridLayout",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": []
						},
						"parentName": "FeedbackGroup",
						"propertyName": "items",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "SatisfactionLevel",
						"values": {
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 12,
								"rowSpan": 1
							},
							"tip": {
								"content": {"bindTo": "Resources.Strings.SatisfactionLevelTip"},
								"displayMode": Terrasoft.controls.TipEnums.displayMode.WIDE
							},
							"enabled": {"bindTo": "CanChangeCaseSatisfactionLevel"},
							"bindTo": "SatisfactionLevel",
							"contentType": this.Terrasoft.ContentType.ENUM
						},
						"parentName": "FeedbackControlGroup_GridLayout",
						"propertyName": "items",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "SatisfactionLevelComment",
						"parentName": "FeedbackControlGroup_GridLayout",
						"propertyName": "items",
						"values": {
							"className": "Terrasoft.ESNHtmlEdit",
							"itemType": this.Terrasoft.ViewItemType.MODEL_ITEM,
							"dataValueType": this.Terrasoft.DataValueType.TEXT,
							"contentType": this.Terrasoft.ContentType.RICH_TEXT,
							"layout": {
								"column": 0,
								"row": 1,
								"colSpan": 24
							},
							"value": {
								"bindTo": "SatisfactionLevelComment"
							},
							"tip": {
								"content": {
									"bindTo": "Resources.Strings.SatisfactionLevelCommentTip"
								},
								"displayMode": this.Terrasoft.controls.TipEnums.displayMode.WIDE
							},
							"enabled": {"bindTo": "CanChangeCaseSatisfactionLevel"},
							"markerValue": "satisfaction-level-comment",
							"controlConfig": {
								"height": "102px"
							}
						}
					},
					{
						"operation": "insert",
						"name": "MessageHistoryGroup",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
							"caption": {
								"bindTo": "Resources.Strings.MessageHistoryGroupCaption"
							},
							"items": [],
							"tools": [],
							"isHeaderVisible": {
								"bindTo": "getIsMessageHistoryV2FeatureDisabled"
							},
							"controlConfig": {
								"collapsedchanged": {
									"bindTo": "onMessageHistoryGroupCollapsedChanged"
								}
							}
						},
						"parentName": "ProcessingTab",
						"propertyName": "items",
						"index": 2
					},
					{
						"operation": "insert",
						"parentName": "MessageHistoryGroup",
						"name": "MessageHistoryContainer",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.CONTAINER,
							"items": []
						},
						"propertyName": "items",
						"index": 0
					},
					{
						"operation": "insert",
						"parentName": "MessageHistoryContainer",
						"propertyName": "items",
						"name": "MessageHistory",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.MODULE,
							"moduleName": "MessageHistoryModule",
							"afterrender": {"bindTo": "loadMessage"},
							"afterrerender": {"bindTo": "loadMessage"}
						}
					},
					{
						"operation": "remove",
						"name": "ESNTab"
					},
					{
						"operation": "remove",
						"name": "NotesFilesTab"
					},
					{
						"operation": "insert",
						"name": "ComplainButton",
						"parentName": "LeftContainer",
						"propertyName": "items",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.BUTTON,
							"imageConfig": {"bindTo": "Resources.Images.Complain"},
							"caption": {
								"bindTo": "Resources.Strings.ComplainButtonCaption"
							},
							"classes": {
								"wrapperClass": ["complain-button"]
							},
							"click": {"bindTo": "onComplainButtonClick"},
							"visible": {
								"bindTo": "getIsComplainButtonVisible"
							}
						},
						"index": 10
					}
				]/**SCHEMA_DIFF*/,
				modules: {
					ActionsDashboardModule: {
						"config": {
							"isSchemaConfigInitialized": true,
							"schemaName": "PortalCaseSectionActionsDashboard",
							"useHistoryState": false,
							"parameters": {
								"viewModelConfig": {
									"entitySchemaName": "Case",
									"UseDashboard": false,
									"actionsConfig": {
										"schemaName": "CaseStatus",
										"columnName": "Status",
										"colorColumnName": "Color",
										"filterColumnName": "IsDisplayed",
										"orderColumnName": "StageNumber"
									},
									"DashboardConfig": {
										"Activity": {
											"masterColumnName": "Id",
											"referenceColumnName": "Case"
										}
									}
								}
							}
						}
					}
				},
				methods: {

					/**
					 * The action which will be invoked after case terms recalculated.
					 * @protected
					 */
					onCaseTermsRecalculated: Terrasoft.emptyFn,

					/**
					 *  Checks if new history of messages enabled.
					 *  @public
					 */
					getIsMessageHistoryV2FeatureDisabled: function() {
						return !this.getIsFeatureEnabled("MessageHistoryV2");
					},

					/**
					 * @inheritdoc BasePageV2#initEntity
					 * @overridden
					 */
					initEntity: function(callback, scope) {
						this.initSysSettings();
						this.callParent([
							function() {
								this.initEntityCallback(callback, scope);
							}, scope
						]);
					},

					/**
					 * @inheritDoc BasePageV2#onEntityInitialized
					 * @overridden
					 */
					onEntityInitialized: function() {
						this.callParent(arguments);
						this.setPortalColumnValues();
						this.setDateDiff();
						this.renderCaptionStyle();
						this.setAccount();
						this.setRegisteredDate();
						this.getUserSettingsOperationRight();
						this.setStatusActionEnabled();
					},

					/**
					 * Sets RegisteredOn date for New Case.
					 * @protected
					 */
					setRegisteredDate: function() {
						if (this.isNewMode()) {
							var currentUserDateTime = this.get("CurrentUserDate");
							if (!this.Ext.isEmpty(currentUserDateTime)) {
								this.set("RegisteredOn", currentUserDateTime);
							} else {
								this.showTimeZoneSetupDialog();
							}
						}
					},

					/**
					 * Shows dialog to set up Time zone.
					 * @private
					 */
					showTimeZoneSetupDialog: function() {
						var modalBoxContainer = ModalBox.show(this.modalBoxSize);
						ModalBox.setSize(400, 255);
						var casePageModuleConfig = {
							renderTo: modalBoxContainer,
							id: this.sandbox.id + "_CasePageTimeZoneModule"
						};
						this.sandbox.loadModule("CasePageTimeZoneModule", casePageModuleConfig);
					},

					/**
					 * Opens user profile settings page.
					 * @private
					 */
					openUserProfilePage: function() {
						this.sandbox.publish("PushHistoryState", {hash: "UserProfile"});
					},

					/**
					 * Get Current User Time
					 * @protected
					 * @param {Guid} contactId contact id
					 * @param {Function} callback function that use CurrentTime
					 */
					getContactTimeAsync: function(contactId, callback) {
						var config = {
							serviceName: "CaseTimezoneService",
							methodName: "GetContactTimezone",
							scope: this,
							data: {
								contactId: contactId
							}
						};
						this.callService(config, callback, this);
					},

					/**
					 * @inheritDoc BasePageV2#save
					 * @overridden
					 */
					save: function() {
						var canContinueSaving = this.setSubject();
						if (canContinueSaving) {
							this.callParent(arguments);
						}
					},

					/**
					 * Reload case entity and set action item state.
					 * @private
					 */
					reloadCasePortalEntity: function() {
						this.reloadEntity(this.setStatusActionEnabled, this);
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#onSaved
					 * @overridden
					 */
					onSaved: function(cardSaveResponse, config) {
						const childCardState = this.isNewMode();
						if (this.isEmpty(config)) {
							this.saveUnsavedMessages();
						}
						this.callParent(arguments);
						if (!childCardState) {
							this.reloadCasePortalEntity();
						}
					},

					/**
					 * Returns identifier of message publisher module.
					 * @protected
					 * @obsolete
					 * @virtual
					 * @return {string}
					 */
					getMessagePublisherModuleId: function() {
						var warningMessage = this.Ext.String.format(
								this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
								"getMessagePublisherModuleId", "");
						this.log(warningMessage, this.Terrasoft.LogMessageType.WARNING);
						if(this.get("HasActiveDcm")) {
							return  this.getModuleId("DcmActionsDashboardModule") + "_PortalMessagePublisherModule";
						} else {
							return  this.getModuleId("ActionsDashboardModule") + "_PortalMessagePublisherModule";
						}
					},

					/**
					 * Saves local message in new mode.
					 * @protected
					 * @virtual
					 */
					saveUnsavedMessages: function() {
						if (!this.isNewMode()) {
							return;
						}
						this.sandbox.publish("SavePublishers", null);
					},

					/**
					 * Sets subject field value by template.
					 * @protected
					 */
					setSubject: function() {
						if(!this.isNewMode()) {
							return true;
						}
						var subject = this.generateSubject();
						if (!subject) {
							return false;
						}
						this.set("Subject", subject);
						return true;
					},

					/**
					 * Generates subject for portal case page.
					 * @protected
					 * @return {String} Subject.
					 */
					generateSubject: function() {
						var category = this.get("Category");
						var service = this.get("ServiceItem");
						if (!this.validateSaving()) {
							return null;
						}
						var template = this.getSubjectTemplateByCategory(category);
						if (!template) {
							return null;
						}
						return !service ? category.displayValue :
								this.Ext.String.format(template, category.displayValue, service.displayValue);
					},

					/**
					 * Returns is requered fields filled in.
					 * @protected
					 * @return {Boolean}
					 */
					validateSaving: function() {
						var category = this.get("Category");
						var service = this.get("ServiceItem");
						if (!service && !category) {
							this.showInformationDialog(this.get("Resources.Strings.CategoryIsEmptyMessageToUser"));
							return false;
						}
						return true;
					},

					/**
					 * Returns subject template by case category.
					 * @param {Object} category Case category identifier.
					 * @protected
					 * @return {String} Subject template.
					 */
					getSubjectTemplateByCategory: function(category) {
						return category.value === Constant.CaseCategory.ServiceRequest ?
								this.get("Resources.Strings.ServiceRequestSubjectTemplate") :
								this.get("Resources.Strings.IncidentSubjectTemplate");
					},

					/**
					 * @inheritDoc BasePageV2#getPageHeaderCaption
					 * @overridden
					 */
					getPageHeaderCaption: function() {
						var template = this.getPageHeaderTemplate();
						if (this.isNewMode()) {
							return template;
						}
						var number = this.get("Number");
						var subject = this.get("Subject");
						return this.Ext.String.format(template, number, subject);
					},

					/**
					 * Returns page header template.
					 * @return {string} Page header template.
					 */
					getPageHeaderTemplate: function() {
						return this.isNewMode() ?
								this.get("Resources.Strings.DefaultHeader") :
								this.get("Resources.Strings.HeaderTemplate");
					},

					/**
					 * Sets account field value by Contact.
					 * @protected
					 */
					setAccount: function() {
						var contact = this.get("Contact");
						if (contact && !this.get("Account")) {
							var account = contact.Account;
							if (account) {
								this.set("Account", account);
							}
						}
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#subscribeSandboxEvents
					 * @overridden
					 */
					subscribeSandboxEvents: function() {
						this.callParent(arguments);
						var id = this.get("PrimaryColumnValue");
						var tags = id ? [id] : null;
						this.sandbox.subscribe("ReloadCard", this.onReloadCard, this, tags);
						this.sandbox.subscribe("GetRecordInfo", this.onGetRecordInfoForHistory,
								this, [this.getMessageHistorySandboxId()]);
						this.sandbox.subscribe("OnComplainButtonClick", function() {
							this.onComplainButtonClick();
						}, this, [this.sandbox.id]);
					},

					/**
					 * Sets case default values.
					 * @protected
					 */
					setPortalColumnValues: function() {
						if (this.isAddMode() || this.isCopyMode()) {
							if (this.Terrasoft.SysValue.CURRENT_USER_ACCOUNT.value !== this.Terrasoft.GUID_EMPTY) {
								this.set("Account", this.Terrasoft.SysValue.CURRENT_USER_ACCOUNT);
							}
							this.set("Contact", this.Terrasoft.SysValue.CURRENT_USER_CONTACT);
							this.Terrasoft.SysSettings.querySysSettingsItem("PortalCaseOriginDef", function(value) {
								this.set("Origin", value);
							}, this);
							this.set("Owner", null);
						}
					},

					/**
					 * @inheritDoc BasePageV2#getActions
					 * @overridden
					 */
					getActions: function() {
						var actionMenuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
						actionMenuItems.addItem(this.getButtonMenuItem({
							"Caption": {"bindTo": "Resources.Strings.CancelCaseActionCaption"},
							"Tag": "cancelCase",
							"Enabled": {"bindTo": "EnableCancelAction"}
						}));
						actionMenuItems.addItem(this.getButtonMenuItem({
							"Caption": {"bindTo": "Resources.Strings.CloseCaseActionCaption"},
							"Tag": "closeCase",
							"Enabled": {"bindTo": "EnableCancelAction"}
						}));
						actionMenuItems.addItem(this.getButtonMenuItem({
							"Caption": {"bindTo": "Resources.Strings.ReopenCaseActionCaption"},
							"Tag": "reopenCase",
							"Enabled": {"bindTo": "EnableReopenAction"}
						}));
						return actionMenuItems;
					},

					/**
					 * @inheritDoc BasePageV2#initActionButtonMenu
					 * @overridden
					 */
					initActionButtonMenu: function() {
						this.callParent(arguments);
						this.set("ActionsButtonVisible", this.getIsFeatureEnabled("PortalUserAction"));
					},

					/**
					 * Returns cancel action menu item enable.
					 * @protected
					 * @return {Boolean} Cancel action menu item enable.
					 */
					getCancelActionEnabled: function() {
						var status = this.get("Status");
						if (!status) {
							return false;
						}
						return !status.IsFinal && !this.isNewMode();
					},

					/**
					 * Returns reopen action menu item enable.
					 * @protected
					 * @return {Boolean} Reopen action menu item enable.
					 */
					getReopenActionEnabled: function() {
						var status = this.get("Status");
						if (!status) {
							return false;
						}
						return (status.IsPaused || status.IsResolved) && status.value !== Constant.CaseState.Reopened;
					},

					/**
					 * Set status actions menu item enable.
					 * @protected
					 */
					setStatusActionEnabled: function() {
						this.setActionItemStatus(this.getCancelActionEnabled(), this.getReopenActionEnabled());
					},

					/**
					 * Set action items status.
					 * @param {Boolean} cancelStatus status for cancel button.
					 * @param {Boolean} reopenStatus status for reopen button.
					 * @private
					 */
					setActionItemStatus: function(cancelStatus, reopenStatus) {
						this.set("EnableCancelAction", cancelStatus);
						this.set("EnableReopenAction", reopenStatus);
						this.publishPropertyValueToSection("EnableCancelAction", cancelStatus);
						this.publishPropertyValueToSection("EnableReopenAction", reopenStatus);
					},

					/**
					 * Call service for canceling case.
					 * @protected
					 */
					cancelCase: function() {
						var config = this.getServiceConfig("CancelCase");
						var cancelCase = this.get("Resources.Strings.CancelCaseActionCaption");
						this.showBodyMask({caption: cancelCase});
						this.callService(config, this.onCancelCaseResult, this);
					},

					/**
					 * Call service for closing case.
					 * @protected
					 */
					closeCase: function() {
						var config = this.getServiceConfig("CloseCase");
						var closeCase = this.get("Resources.Strings.CloseCaseActionCaption");
						this.showBodyMask({caption: closeCase});
						this.callService(config, this.onCloseCaseResult, this);
					},

					/**
					 * Call service for reopen case.
					 * @protected
					 */
					reopenCase: function() {
						var config = this.getServiceConfig("ReopenCase");
						var reopenCase = this.get("Resources.Strings.ReopenCaseActionCaption");
						this.showBodyMask({caption: reopenCase});
						this.callService(config, this.onReopenCaseResult, this);
					},

					/**
					 * Cancellation service response handler.
					 * @protected
					 * @param {Object} response Query response.
					 */
					onCancelCaseResult: function(response) {
						this.hideBodyMask();
						if (response && response.CancelCaseResult) {
							if (response.CancelCaseResult.success) {
								this.reloadCasePortalEntity();
							} else {
								this.showInformationDialog(response.CancelCaseResult.errorInfo.message);
							}
						}
					},

					/**
					 * Close service response handler.
					 * @protected
					 * @param {Object} response Query response.
					 */
					onCloseCaseResult: function(response) {
						this.hideBodyMask();
						if (response && response.CloseCaseResult) {
							if (response.CloseCaseResult.success) {
								this.reloadCasePortalEntity();
							} else {
								this.showInformationDialog(response.CloseCaseResult.errorInfo.message);
							}
						}
					},

					/**
					 * Reopen service response handler.
					 * @protected
					 * @param {Object} response Query response.
					 */
					onReopenCaseResult: function(response) {
						this.hideBodyMask();
						if (response && response.ReopenCaseResult) {
							if (response.ReopenCaseResult.success) {
								this.reloadCasePortalEntity();
							} else {
								this.showInformationDialog(response.ReopenCaseResult.errorInfo.message);
							}
						}
					},

					/**
					 * Get service config.
					 * @protected
					 * @param {String} methodName Service method name.
					 */
					getServiceConfig: function(methodName) {
						return {
							serviceName: "CasePortalService",
							methodName: methodName,
							scope: this,
							data: {
								recordId: this.get("Id")
							}
						};
					},

					/**
					 * Returns feedback control group visible.
					 * @protected
					 * @return {boolean} Feedback control group visible.
					 */
					getFeedbackGroupVisible: function() {
						var status = this.get("Status");
						if (!status) {
							return false;
						}
						return status.IsFinal || status.IsResolved;
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#updateDetails
					 * @overridden
					 */
					updateDetails: function() {
						this.callParent(arguments);
						this.sandbox.publish("InitModuleViewModel", null, [this.getMessageHistorySandboxId()]);
					},

					/**
					 * Sets context help identifier.
					 * @overridden
					 * @protected
					 */
					initContextHelp: function() {
						this.enableContextHelp = false;
					},

					/**
					 * Get user Operation Right and set RegisteredOnTipContent.
					 * @protected
					 */
					getUserSettingsOperationRight: function() {
						var operationsToRequest = [];
						operationsToRequest.push("CanChangeCaseSatisfactionLevel");
						RightUtilities.checkCanExecuteOperations(operationsToRequest, function(result) {
							if (result) {
								this.set("CanChangeCaseSatisfactionLevel", result.CanChangeCaseSatisfactionLevel);
							}
						}, this);
					},

					/**
					 * Complain button click handler.
					 */
					onComplainButtonClick: function() {
						this.showComplainDialog();
					},

					/**
					 * Shows Complain dialog.
					 * @private
					 */
					showComplainDialog: function() {
						var config = {
							messageType: portalMessageConstants.PortalMessageType.Complain,
							buttonsConfig: {
								publishButton: {
									caption: this.get("Resources.Strings.ComplainButtonCaption")
								}
							}
						};
						this.showMessagePublishDialog(config);
					},

					/**
					 * Shows MessagePublisher dialog with options
					 * @param {Object} config Module config to pass through.
					 */
					showMessagePublishDialog: function(config) {
						var modalBoxContainer = ModalBox.show(this.modalBoxSize);
						ModalBox.setSize(600, 300);
						var moduleConfig = {
							renderTo: modalBoxContainer,
							id: this.sandbox.id + "_PortalMessageModalBoxModule",
							parameters: config
						};
						this.sandbox.loadModule("PortalMessageModalBoxModule", moduleConfig);
					},

					/**
					 * Returns complain button visibility.
					 * @returns {boolean}
					 */
					getIsComplainButtonVisible: function() {
						var complainButtonVisibility = this.get("EnableComplainFunction")
								&& this.getCancelActionEnabled();
						if (!this.get("IsSeparateMode")){
							this.sandbox.publish("ChangeComplainButtonVisibility", complainButtonVisibility,
									[this.sandbox.id]);
						}
						return complainButtonVisibility;
					},

					/**
					 * Initializes required system settings.
					 */
					initSysSettings: function() {
						Terrasoft.SysSettings.querySysSettingsItem("EnableComplainFunction", function(value) {
							this.set("EnableComplainFunction", value);
						}, this);
					}
				},
				rules: {
					"Category": {
						"DisabledOnEdit": {
							ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
							property: BusinessRuleModule.enums.Property.ENABLED,
							conditions: [
								{
									leftExpression: {
										type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
										attribute: "Operation"
									},
									comparisonType: this.Terrasoft.ComparisonType.NOT_EQUAL,
									rightExpression: {
										type: BusinessRuleModule.enums.ValueType.CONSTANT,
										value: Enums.CardStateV2.EDIT
									}
								}
							]
						}
					},
					"ServiceItem": {
						"DisabledOnEdit": {
							ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
							property: BusinessRuleModule.enums.Property.ENABLED,
							conditions: [
								{
									leftExpression: {
										type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
										attribute: "Operation"
									},
									comparisonType: this.Terrasoft.ComparisonType.NOT_EQUAL,
									rightExpression: {
										type: BusinessRuleModule.enums.ValueType.CONSTANT,
										value: Enums.CardStateV2.EDIT
									}
								}
							]
						}
					}
				}
			};
		});

define("PortalCasePage", [], function() {
	return {
		entitySchemaName: "Case",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


