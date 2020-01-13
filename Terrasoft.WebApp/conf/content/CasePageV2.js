Terrasoft.configuration.Structures["CasePageV2"] = {innerHierarchyStack: ["CasePageV2Case", "CasePageV2CaseService", "CasePageV2"], structureParent: "BaseModulePageWithRightDetailContainer"};
define('CasePageV2CaseStructure', ['CasePageV2CaseResources'], function(resources) {return {schemaUId:'ca49777f-a40d-416d-8a74-6fac2f8bcf1e',schemaCaption: "Page schema - Case", parentSchemaName: "BaseModulePageWithRightDetailContainer", schemaName:'CasePageV2Case',parentSchemaUId:'eeb774dd-d572-4587-9506-acc9d8124fe1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('CasePageV2CaseServiceStructure', ['CasePageV2CaseServiceResources'], function(resources) {return {schemaUId:'abe0dd96-9d3c-45e5-8b23-62bdfa5a9adc',schemaCaption: "Page schema - Case", parentSchemaName: "CasePageV2Case", schemaName:'CasePageV2CaseService',parentSchemaUId:'ca49777f-a40d-416d-8a74-6fac2f8bcf1e',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"CasePageV2Case",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('CasePageV2Structure', ['CasePageV2Resources'], function(resources) {return {schemaUId:'4e582f7c-9789-46fb-a4f6-dc13bcb5b426',schemaCaption: "Page schema - Case", parentSchemaName: "CasePageV2CaseService", schemaName:'CasePageV2',parentSchemaUId:'abe0dd96-9d3c-45e5-8b23-62bdfa5a9adc',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"CasePageV2CaseService",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('CasePageV2CaseResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("CasePageV2Case", ["FormatUtils", "NetworkUtilities", "BusinessRuleModule",
		"ConfigurationEnums", "CasesEstimateLabel", "ServiceDeskConstants", "CasePageUtilitiesV2",
		"css!CasePageV2CSS", "css!CasesEstimateLabel", "css!MiniPageViewGeneratorCSS"],
	function(FormatUtils, NetworkUtilities, BusinessRuleModule, Enums, CasesEstimateLabel, ServiceDeskConstants) {
		return {
			entitySchemaName: "Case",
			mixins: {
				/**
				 * @class CasePageUtilitiesV2 implements quick save cards in one click.
				 */
				CasePageUtilitiesV2: "Terrasoft.CasePageUtilitiesV2"
			},
			messages: {
				/**
				 * @message UpdateResolvedButtonMenu
				 * It is need to update the collection of menu items quick save button after changing status.
				 * @param {Object} config menu
				 */
				"UpdateResolvedButtonMenu": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message OnResolvedButtonMenuClick
				 * Event menu selection buttons quick save.
				 * @param {Object} config menu
				 */
				"OnResolvedButtonMenuClick": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message UpdateOpenCaseDetail
				 * Update changes about contact and account.
				 */
				"UpdateOpenCaseDetail": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetCaseIdOpenCaseDetail
				 * Informs identifier of current case.
				 */
				"GetCaseIdOpenCaseDetail": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message CallCustomer
				 * Make a call for customer.
				 */
				"CallCustomer": {
					"mode": Terrasoft.MessageMode.PTP,
					"direction": Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {
				/**
				 * Reason closure code default.
				 */
				"DefCaseClosureCode": {
					dataValueType: this.Terrasoft.DataValueType.GUID,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Close card after save
				 */
				"IsCloseOnSave": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},
				/**
				 * Caption for ResolvedMenu button.
				 */
				"ResolvedButtonMenuCaption": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Collection name drop-down menu function button is empty.
				 */
				"IsResolvedButtonMenuEmpty": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},
				/**
				 *  Collection name drop-down menu in the function button.
				 */
				"ResolvedButtonMenuItems": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION
				},
				/**
				 * Informs the name of active tab of open cases.
				 */
				"ActiveOpenCasesTabName": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Contact column value.
				 */
				"Contact": {
					dependencies: [
						{
							columns: ["Contact"],
							methodName: "onContactColumnChanged"
						}
					]
				},
				/**
				 * Account column value.
				 */
				"Account": {
					dependencies: [
						{
							columns: ["Account"],
							methodName: "onAccountColumnChanged"
						}
					]
				},
				/**
				 * SolutionDate column caption value.
				 */
				"SolutionDateCaption": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION,
					dependencies: [
						{
							columns: ["SolutionDate"],
							methodName: "onPlanedDateChanged"
						},
						{
							columns: ["Status"],
							methodName: "onPlanedDateChanged"
						}
					]
				},
				/**
				 * IsSolutionOverdue column flag.
				 */
				"IsSolutionOverdue": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN
				},
				/**
				 * Status column value.
				 */
				"Status": {
					lookupListConfig: {
						columns: ["IsFinal", "IsResolved", "IsPaused"],
						filter: function() {
							var status = this.get("OriginalStatus");
							var filterGroup = new this.Terrasoft.createFilterGroup();
							if (!status || status.IsFinal) {
								filterGroup.add("emptyFilter", this.Terrasoft.createColumnIsNullFilter("Id"));
								return filterGroup;
							}
							filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
							filterGroup.add("StatusFilter", this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL,
								"[CaseNextStatus:NextStatus].Status", this.get("OriginalStatus").value));
							filterGroup.add("StatusFilterCurrent", this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL,
								"Id", this.get("OriginalStatus").value));
							return filterGroup;

						}
					}
				},
				/**
				 * SatisfactionLevel column value.
				 */
				"SatisfactionLevel": {
					lookupListConfig: {
						columns: ["Point"],
						orders: [
							{
								columnPath: "Point",
								direction: this.Terrasoft.OrderDirection.DESC
							}
						]
					}
				},
				/**
				 * RespondedOn column value.
				 */
				"RespondedOn": {
					dependencies: [
						{
							columns: ["Status"],
							methodName: "onStatusChanged"
						}
					]
				},
				/**
				 * Priority column value.
				 */
				"Priority": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					lookupListConfig: {
						orders: [
							{
								columnPath: "Priority"
							}
						]
					}
				}

			},
			details: /**SCHEMA_DETAILS*/{
				"ContactCasesDetail": {
					"schemaName": "ContactOpenCasesDetail",
					"entitySchemaName": "Case",
					"filter": {
						"masterColumn": "Contact",
						"detailColumn": "Contact"
					}
				},
				"AccountCasesDetail": {
					"schemaName": "AccountOpenCasesDetail",
					"entitySchemaName": "Case",
					"filter": {
						"masterColumn": "Account",
						"detailColumn": "Account"
					}
				},
				"Files": {
					"schemaName": "FileDetailV2",
					"entitySchemaName": "CaseFile",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "Case"
					}
				},
				"ContactCommunication": {
					"schemaName": "CommunicationInCaseDetail",
					"filter": {
						"masterColumn": "Contact",
						"detailColumn": "Contact"
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "HeaderContainer"
				},
				{
					"operation": "insert",
					"name": "ResolvedButton",
					"parentName": "LeftContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"caption": {
							"bindTo": "ResolvedButtonMenuCaption"
						},
						"style": this.Terrasoft.controls.ButtonEnums.style.GREEN,
						"classes": {
							"textClass": ["actions-button-margin-right"],
							"wrapperClass": ["actions-button-margin-right"]
						},
						"click": {"bindTo": "onResolvedButtonMenuClick"},
						"menu": {
							"items": {"bindTo": "ResolvedButtonMenuItems"}
						},
						"visible": {
							"bindTo": "IsResolvedButtonMenuEmpty",
							"bindConfig": {
								"converter": function(value) {
									return !value;
								}
							}
						}
					}
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
					"name": "ParametersTab",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.ParametersTabCaption"
						},
						"items": []
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "FilesTab",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.FilesTabCaption"
						},
						"items": []
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 2
				},
				{
					"operation": "insert",
					"name": "Files",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					},
					"parentName": "FilesTab",
					"propertyName": "items"
				},
				//ProcessingTab
				{
					"operation": "insert",
					"name": "CaseProcessing_gridLayout",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					},
					"parentName": "ProcessingTab",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "Subject",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "Subject"
					},
					"parentName": "CaseProcessing_gridLayout",
					"propertyName": "items"
				},
				//RightContainerTab
				{
					"operation": "insert",
					"name": "RightContainerTab",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.RightContainerTabCaption"
						},
						"items": []
					},
					"parentName": "RightTabs",
					"propertyName": "tabs",
					"index": 0
				},
				//ParametersTab
				{
					"operation": "insert",
					"name": "CaseParameters_gridLayout",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					},
					"parentName": "ParametersTab",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "RegisteredOn",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "RegisteredOn",
						"enabled": false
					},
					"parentName": "CaseParameters_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "ResponseDate",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "ResponseDate",
						"labelConfig": {
							"visible": true
						}
					},
					"parentName": "CaseParameters_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "SolutionDateParameters",
					"values": {
						"layout": {
							"column": 12,
							"row": 1,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "SolutionDate",
						"enabled": false
					},
					"parentName": "CaseParameters_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "FirstSolutionProvidedOn",
					"values": {
						"layout": {
							"column": 12,
							"row": 2,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "FirstSolutionProvidedOn",
						"enabled": false
					},
					"parentName": "CaseParameters_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "SolutionProvidedOn",
					"values": {
						"layout": {
							"column": 12,
							"row": 3,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "SolutionProvidedOn",
						"enabled": false
					},
					"parentName": "CaseParameters_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "ClosureDate",
					"values": {
						"layout": {
							"column": 0,
							"row": 5,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "ClosureDate",
						"enabled": false
					},
					"parentName": "CaseParameters_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "ClosureCode",
					"values": {
						"layout": {
							"column": 0,
							"row": 6,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "ClosureCode",
						"contentType": this.Terrasoft.ContentType.ENUM
					},
					"parentName": "CaseParameters_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "Origin",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12,
							"rowSpan": 1
						},
						"contentType": this.Terrasoft.ContentType.ENUM,
						"bindTo": "Origin"
					},
					"parentName": "CaseParameters_gridLayout",
					"propertyName": "items"
				},
				// Feedback control group
				{
					"operation": "insert",
					"name": "FeedbackControlGroup",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": {
							"bindTo": "Resources.Strings.FeedbackGroupCaption"
						}
					},
					"parentName": "ParametersTab",
					"propertyName": "items",
					"index": 2
				},
				{
					"operation": "insert",
					"name": "FeedbackControlGroup_gridLayout",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					},
					"parentName": "FeedbackControlGroup",
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
						"bindTo": "SatisfactionLevel",
						"contentType": this.Terrasoft.ContentType.ENUM
					},
					"parentName": "FeedbackControlGroup_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "SatisfactionLevelComment",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "SatisfactionLevelComment",
						"contentType": this.Terrasoft.ContentType.LONG_TEXT
					},
					"parentName": "FeedbackControlGroup_gridLayout",
					"propertyName": "items"
				},
				// SolutionLabel
				{
					"operation": "insert",
					"name": "SolutionCaptionContainer",
					"propertyName": "items",
					"values": {
						"id": "SolutionCaptionContainer",
						"selectors": {"wrapEl": "#SolutionCaptionContainer"},
						"layout": {
							"column": 16,
							"row": 4,
							"colSpan": 6,
							"rowSpan": 1
						},
						"markerValue": "SolutionCaptionContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["estimate-caption-container"],
						"items": []
					},
					"parentName": "CaseParameters_gridLayout"
				},
				{
					"operation": "insert",
					"name": "SolutionTimerImageContainer",
					"parentName": "SolutionCaptionContainer",
					"propertyName": "items",
					"values": {
						"id": "TimerImageContainer",
						"selectors": {"wrapEl": "#TimerImageContainer"},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["timer-image-container"],
						"visible": {
							"bindTo": "isSolutionTimerImageVisible"
						},
						"markerValue": "SolutionTimerImageContainer",
						"afterrerender": {
							"bindTo": "renderCaptionStyle"
						},
						"afterrender": {
							"bindTo": "renderCaptionStyle"
						},
						"items": []
					},
					"index": 10
				},
				{
					"operation": "insert",
					"name": "SolutionMinutesCaption",
					"parentName": "SolutionCaptionContainer",
					"propertyName": "items",
					"values": {
						"id": "SolutionMinutesCaption",
						"labelClass": ["estimate-caption-label"],
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getSolutionDateMinute"
						},
						"visible": {
							"bindTo": "isSolutionHourVisible"
						}
					},
					"index": 3
				},
				{
					"operation": "insert",
					"name": "SolutionEstimateSeconds",
					"parentName": "SolutionCaptionContainer",
					"propertyName": "items",
					"values": {
						"id": "SolutionEstimateSeconds",
						"labelClass": ["estimate-caption-label blink"],
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": ":",
						"visible": {
							"bindTo": "isSolutionHourVisible"
						}
					},
					"index": 2
				},
				{
					"operation": "insert",
					"name": "SolutionCaptionLabel",
					"parentName": "SolutionCaptionContainer",
					"propertyName": "items",
					"values": {
						"id": "SolutionCaptionLabel",
						"labelClass": ["estimate-caption-label day"],
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getSolutionDateDay"
						},
						"visible": {
							"bindTo": "isSolutionCaptionVisible"
						},
						"afterrerender": {"bindTo": "renderCaptionStyle"},
						"afterrender": {"bindTo": "renderCaptionStyle"}
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "SolutionCaptionPrefix",
					"parentName": "SolutionCaptionContainer",
					"propertyName": "items",
					"values": {
						"id": "SolutionCaptionPrefix",
						"labelClass": ["estimate-caption-label prefix"],
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getSolutionCaptionPrefix"
						},
						"visible": {
							"bindTo": "isSolutionCaptionVisible"
						}
					},
					"index": 0
				},
				//Profile container
				{
					"operation": "insert",
					"name": "Priority",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 5,
							"rowSpan": 1
						},
						"bindTo": "Priority",
						"contentType": this.Terrasoft.ContentType.ENUM,
						"labelConfig": {
							"visible": false
						},
						"change": {
							bindTo: "setPriorityField"
						},
						"iconsVisible": true,
						"wrapClass": ["priority-edit-class"]
					},
					"parentName": "CaseProfile_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "StatusContainer",
					"values": {
						"layout": {
							"column": 5,
							"row": 0,
							"colSpan": 9,
							"rowSpan": 1
						},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["caseStatusContainer"]
						},
						"items": []
					},
					"parentName": "CaseProfile_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "StatusValue",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getStatusValue"},
						"markerValue": "StatusValue"
					},
					"parentName": "StatusContainer",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "NumberContainer",
					"values": {
						"layout": {
							"column": 14,
							"row": 0,
							"colSpan": 10,
							"rowSpan": 1
						},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["caseNumberContainer"]
						},
						"items": []
					},
					"parentName": "CaseProfile_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "NumberValue",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getNumberValue"},
						"markerValue": "NumberValue"
					},
					"parentName": "NumberContainer",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "SolutionDate",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 16,
							"rowSpan": 1
						},
						"bindTo": "SolutionDate",
						"labelConfig": {
							"visible": true
						},
						"enabled": false
					},
					"parentName": "CaseProfile_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "Contact",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "Contact"
					},
					"parentName": "CaseProfile_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "Account",
					"values": {
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "Account"
					},
					"parentName": "CaseProfile_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "Category",
					"values": {
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "Category",
						"enabled": {
							"bindTo": "IsCategoryEnabled"
						},
						"contentType": this.Terrasoft.ContentType.ENUM
					},
					"parentName": "CaseProfile_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "CreatedOnContainer",
					"values": {
						"layout": {
							"column": 0,
							"row": 9,
							"colSpan": 24,
							"rowSpan": 1
						},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["caseCreatedOnContainer"]
						},
						"items": []
					},
					"parentName": "CaseProfile_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "CreatedOnValue",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getCreatedOnDate"},
						"markerValue": {"bindTo": "CreatedOnValue"},
						"visible": {"bindTo": "isEditMode"}
					},
					"parentName": "CreatedOnContainer",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "CaseProfile_gridLayout",
					"values": {
						"generator": "MiniPageViewGenerator.generatePartial",
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"classes": {
							"wrapClassName": ["profileContainer"]
						},
						"items": []
					},
					"parentName": "RightContainerTab",
					"propertyName": "items",
					"index": 9
				},
				/*SolutionLabel*/
				{
					"operation": "insert",
					"name": "SolutionCaptionProfile",
					"parentName": "CaseProfile_gridLayout",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 16,
							"row": 1,
							"colSpan": 8,
							"rowSpan": 1
						},
						"markerValue": "SolutionCaptionContainerProfile",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["profile-estimate-caption-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SolutionCaptionValueProfile",
					"parentName": "SolutionCaptionProfile",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getSolutionCaptionValue"},
						"markerValue": "SolutionCaptionValueProfile",
						"visible": {"bindTo": "isSolutionHourVisible"},
						"labelClass": ["estimate-caption-label"],
						"hint": {
							"bindTo": "getSolutionCaptionHint"
						}
					}
				},
				//Right container contact communication detail
				{
					"operation": "insert",
					"parentName": "RightContainerTab",
					"propertyName": "items",
					"name": "ContactCommunication",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL,
						"visible": false
					},
					"index": 9
				},
				//Right container open cases detail
				{
					"operation": "insert",
					"name": "OpenCasesControlGroup",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": {
							"bindTo": "Resources.Strings.OpenCasesControlGroupCaption"
						},
						"visible": false
					},
					"parentName": "RightContainerTab",
					"propertyName": "items",
					"index": 10
				},
				{
					"operation": "insert",
					"name": "OpenCasesDetail",
					"parentName": "OpenCasesControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"visible": {"bindTo": "getRightTabsContainerVisible"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "OpenCasesTabs",
					"parentName": "OpenCasesDetail",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.TAB_PANEL,
						"activeTabChange": {"bindTo": "activeOpenCasesTabChange"},
						"activeTabName": {"bindTo": "ActiveOpenCasesTabName"},
						"classes": {"wrapClass": ["tab-panel-margin-bottom"]},
						"collection": {"bindTo": "OpenCasesTabsCollection"},
						"tabs": []
					}
				},
				{
					"operation": "insert",
					"name": "ContactCasesTab",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.ContactTabCaption"
						},
						"visible": {
							"bindTo": "ContactOpenCasesTabVisibility"
						},
						"items": []
					},
					"parentName": "OpenCasesTabs",
					"propertyName": "tabs",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "ContactCasesDetail",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					},
					"parentName": "ContactCasesTab",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "AccountCasesTab",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.AccountTabCaption"
						},
						"items": []
					},
					"parentName": "OpenCasesTabs",
					"propertyName": "tabs",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "AccountCasesDetail",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					},
					"parentName": "AccountCasesTab",
					"propertyName": "items",
					"index": 0
				}
			]/**SCHEMA_DIFF*/,
			methods: {
				/**
				 * Returns Case created on hint.
				 * @protected
				 * @returns {String}
				 */
				getSolutionCaptionHint: function() {
					var prefix = this.getSolutionCaptionPrefix();
					return prefix ? prefix.replace(":", "") : "";
				},

				/**
				 * Returns Case created on caption.
				 * @protected
				 * @returns {String}
				 */
				getSolutionCaptionValue: function() {
					var prefix = "";
					var day = this.getSolutionDateDay();
					var minutes = this.getSolutionDateMinute();
					return FormatUtils.getDateCaption(prefix, day, minutes);
				},

				/**
				 * Returns Case status.
				 * @protected
				 * @returns {String}
				 */
				getStatusValue: function() {
					var status = this.get("Status");
					return status ? status.displayValue : "";
				},

				/**
				 * Returns Case number.
				 * @protected
				 * @returns {String}
				 */
				getNumberValue: function() {
					var number = this.get("Number");
					return number ? number.replace("-", "") : "";
				},

				/**
				 * @inheritDoc BasePageV2#onCloseCardButtonClick
				 * @overridden
				 */
				onCloseCardButtonClick: function() {
					this.hideBodyMask({
						uniqueMaskId: "case"
					});
					this.callParent(arguments);
				},

				/**
				 * Checks need to change the owner and if so replace
				 * @param {Object} status The new status
				 */
				changeOwner: function(status) {
					var isPortalUser = this.Terrasoft.CurrentUser.userType === this.Terrasoft.UserType.SSP;
					if (status.value === ServiceDeskConstants.CaseState.InProgress && !isPortalUser) {
						var owner = this.get("Owner");
						var contact = this.Terrasoft.SysValue.CURRENT_USER_CONTACT;
						if ((!owner) || (contact && owner && (owner.value !== contact.value))) {
							this.set("Owner", contact);
						}
					}
					if (status.value === ServiceDeskConstants.CaseState.Reopened) {
						this.set("Owner", null);
					}
				},

				/**
				 * Processing saving case after selecting menu item quick save button.
				 * @protected
				 * @param {Object} config Config menu
				 */
				saveCard: function(config) {
					if (config.IsSetClosureCode && config.ClosureCode && !this.get("ClosureCode")) {
						this.set("ClosureCode", config.ClosureCode);
					}
					var status = config.Status;
					this.set("Status", status);
					this.changeOwner(status);
					this.set("IsCloseOnSave", config.IsCloseOnSave);
					if (config.IsCloseOnSave) {
						this.save();
					} else {
						this.save({
							callback: this.Ext.emptyFn,
							isSilent: true,
							callBaseSilentSavedActions: true
						});
					}
				},

				/**
				 * Processing selecting menu item quick save button
				 * @protected
				 * @param {Object} config Config menu
				 */
				onResolvedButtonMenuClick: function(config) {
					if (!config) {
						var resolvedButtonMenuItems = this.get("ResolvedButtonMenuItems");
						if (!resolvedButtonMenuItems.isEmpty()) {
							config = resolvedButtonMenuItems.collection.items[0].values.Tag;
						} else {
							return;
						}
					}
					var status = config.Status;
					if (!status) {
						return;
					}
					this.showBodyMask({
						uniqueMaskId: "case"
					});
					this.asyncValidate(function(result) {
						if (result.success) {
							this.saveCard.call(this, config);
						} else {
							this.hideBodyMask({
								uniqueMaskId: "case"
							});
							this.showInformationDialog(result.message);
						}
					}, this);
				},

				/**
				 * Initializes of initial values of model.
				 * @overridden
				 */
				init: function() {
					this.statusDefSysSettingsName = "CaseStatusDef";
					this.callParent(arguments);
					this.initCollection();
					this.set("ResolvedButtonMenuCaption", this.get("Resources.Strings.ResolvedButtonCaption"));
				},

				/**
				 * @inheritdoc BasePageV2#onDestroy
				 * @overridden
				 */
				onDestroy: function() {
					this.hideBodyMask({
						uniqueMaskId: "case"
					});
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc BasePageV2#onRender
				 * @overridden
				 */
				onRender: function() {
					this.callParent(arguments);
					this.renderCaptionStyle();
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#initTabs
				 * @overridden
				 */
				initTabs: function() {
					this.callParent(arguments);
					var defaultRightTabName = this.getDefaultOpenCasesTabName();
					if (!defaultRightTabName) {
						return;
					}
					this.setActiveOpenCasesTab(defaultRightTabName);
					this.set(defaultRightTabName, true);
					this.initCasePageMessages();
				},

				/**
				 * Initializes messages on page.
				 * @protected
				 */
				initCasePageMessages: function() {
					var contactSubscriberId = this.sandbox.id + "_detail_ContactCasesDetailCase";
					this.sandbox.subscribe("GetCaseIdOpenCaseDetail", function() {
						return this.get("Id");
					}, this, [contactSubscriberId]);
					var accountSubscriberId = this.sandbox.id + "_detail_AccountCasesDetailCase";
					this.sandbox.subscribe("GetCaseIdOpenCaseDetail", function() {
						return this.get("Id");
					}, this, [accountSubscriberId]);
				},

				/**
				 * Returns the first tab name of open cases.
				 * @protected
				 * @virtual
				 * @return {String} Name of first tab of open cases.
				 */
				getDefaultOpenCasesTabName: function() {
					var tabsCollection = this.get("OpenCasesTabsCollection");
					if (tabsCollection.isEmpty()) {
						return "";
					}
					var firstTab = tabsCollection.getByIndex(0);
					var defaultTabName = firstTab.get("Name");
					return defaultTabName;
				},

				/**
				 * Sets open cases active tab.
				 * @protected
				 * @virtual
				 * @param {String} tabName Tab name.
				 */
				setActiveOpenCasesTab: function(tabName) {
					this.set("ActiveOpenCasesTabName", tabName);
				},

				/**
				 * Open cases tab change event handler.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.BaseViewModel} activeTab Active bab.
				 */
				activeOpenCasesTabChange: function(activeTab) {
					var activeTabName = activeTab.get("Name");
					var tabsCollection = this.get("OpenCasesTabsCollection");
					tabsCollection.eachKey(function(tabName, tab) {
						var tabContainerVisibleBinding = tab.get("Name");
						this.set(tabContainerVisibleBinding, false);
					}, this);
					this.set(activeTabName, true);
				},

				/**
				 * @inheritdoc Terrasoft.LookupQuickAddMixin#checkRightsCallback
				 * @overridden
				 */
				extractValuePairsFromFilters: function(entitySchema, columnName, lookupFilters) {
					if (columnName === "Contact") {
						lookupFilters = this.Ext.create("Terrasoft.Collection");
						this.set("Account", null);
					}
					this.callParent(arguments);
				},

				/**
				 * Contact change event handler.
				 * @protected
				 */
				onContactColumnChanged: function() {
					var contact = this.get("Contact");
					var subscriberId = this.sandbox.id + "_detail_ContactCasesDetailCase";
					var updateConfig = {
						masterRecordId: contact ? contact.value : this.Terrasoft.GUID_EMPTY,
						reloadAll: true
					};
					this.sandbox.publish("UpdateOpenCaseDetail", updateConfig, [subscriberId]);
					this.updateDetail({
						detail: "ContactCommunication"
					});
				},

				/**
				 * Account change event handler.
				 * @protected
				 */
				onAccountColumnChanged: function() {
					var account = this.get("Account");
					var subscriberId = this.sandbox.id + "_detail_AccountCasesDetailCase";
					var updateConfig = {
						masterRecordId: account,
						reloadAll: true
					};
					this.sandbox.publish("UpdateOpenCaseDetail", updateConfig, [subscriberId]);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onSaved
				 * @overridden
				 */
				onSaved: function() {
					this.callParent(arguments);
					var response = arguments[0];
					this.hideBodyMask({
						uniqueMaskId: "case"
					});
					if (response.success) {
						if (this.get("IsCloseOnSave")&& !this.get("NextPrcElReady")) {
							this.onCloseCardButtonClick();
						} else {
							var statusId = this.get("Status").value;
							if (this.get("IsInChain") || this.sandbox.moduleName === "ProcessCardModuleV2") {
								this.getResolvedButtonMenu.call(this, statusId);
							} else {
								this.sandbox.publish("UpdateResolvedButtonMenu", statusId,
									[this.sandbox.id]);
							}
						}
					}
				},

				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					var resolvedClickSubscriberId = this.sandbox.id;
					this.sandbox.subscribe("OnResolvedButtonMenuClick", function() {
						var tagMenuItem = arguments[0];
						this.onResolvedButtonMenuClick(tagMenuItem);
					}, this, [resolvedClickSubscriberId]);
				},

				/**
				 * @inheritDoc BasePageV2#onEntityInitialized
				 * @overridden
				 */
				onEntityInitialized: function() {
					if (this.isAddMode() || this.isCopyMode()) {
						this.setCaseNumber();
						this.setPriorityImage();
					}
					this.Terrasoft.SysSettings.querySysSettingsItem(this.statusDefSysSettingsName, function(value) {
						this.set("StatusDefSysSettingsValue", value);
					}, this);
					this.Terrasoft.SysSettings.querySysSettingsItem("CaseClosureCodeDef", function(value) {
						this.set("DefCaseClosureCode", value);
					}, this);
					this.updateOriginals();
					var contact = this.get("Contact");
					if (contact && !this.get("Account")) {
						var account = contact.Account;
						if (account) {
							this.set("Account", account);
						}
					}
					this.set("PreviousStatus", this.get("Status"));
					this.set("IsCategoryEnabled", this.isNew || !this.get("Category"));
					this.callParent(arguments);
					this.setDateDiff();
					this.renderCaptionStyle();
					var status = this.get("Status");
					var statusId = status ? status.value : this.get("StatusDefSysSettingsValue");
					this.getResolvedButtonMenu(statusId);
					if (!this.isNewMode()) {
						this.setControlsValue();
					}
				},

				setPriorityImage: function() {
					var priority = this.get("Priority");
					if (!priority) {
						return;
					}
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "CasePriority"
					});
					esq.addColumn("Image");
					esq.filters.add("defaultPriorityFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Id", priority.value));
					esq.getEntityCollection(function(result) {
						if (!result.success) {
							return;
						}
						var item = result.collection.getItems()[0];
						if (!item) {
							return;
						}
						var image = item.get("Image");
						var updatedValue = {};
						updatedValue.value = item.get("Id");
						updatedValue.primaryImageValue = image.value;
						this.set("Priority", updatedValue);
					}, this);
				},

				/**
				 * Application and updating css-styles after rerendering component.
				 * @protected
				 * @virtual
				 */
				renderCaptionStyle: function() {
					if (CasesEstimateLabel.isCaptionVisible(this)) {
						CasesEstimateLabel.setCaptionStyle(this);
					}
				},

				/**
				 * Solution Date change event handler.
				 * @protected
				 * @virtual
				 */
				onPlanedDateChanged: function() {
					if (!this.get("Status")) {
						return;
					}
					this.setDateDiff();
					this.renderCaptionStyle();
				},

				/**
				 * Calculation the date difference for Response date and solution date.
				 * @protected
				 * @virtual
				 */
				setDateDiff: function() {
					if (!CasesEstimateLabel.isCaptionVisible(this)) {
						return;
					}
					CasesEstimateLabel.calculateDateDiff("SolutionDate", "SolutionDateCaption",
						"IsSolutionOverdue", this);
				},

				/**
				 * Sets the date and time for Solution Date.
				 * @protected
				 * @returns {string} String line with the days and hours
				 */
				getSolutionDateDay: function() {
					var isOverdue = this.get("IsSolutionOverdue");
					return CasesEstimateLabel.setDayDiff("SolutionDateCaption", isOverdue, this);
				},

				/**
				 * Sets the minutes for Solution Date.
				 * @protected
				 * @returns {string} String line with the minutes
				 */
				getSolutionDateMinute: function() {
					return CasesEstimateLabel.getDateMinute("SolutionDateCaption", this);
				},

				/**
				 * Display hours for Solution Date.
				 * @protected
				 * @returns {Boolean} Hours visibility flag
				 */
				isSolutionHourVisible: function() {
					return (CasesEstimateLabel.isHourVisible("SolutionDateCaption", this) && this.isSolutionCaptionVisible());
				},

				/**
				 * Displays image from Solution Date.
				 * @protected
				 * @returns {Boolean} Timer image and solution caption visibility flag
				 */
				isSolutionTimerImageVisible: function() {
					return (this.isTimerImageVisible() && this.isSolutionCaptionVisible());
				},

				/**
				 * Displays clock container.
				 * @protected
				 * @returns {Boolean} Timer image visibility flag
				 */
				isTimerImageVisible: function() {
					var status = this.get("Status");
					if (!status) {
						return false;
					}
					return !(status.IsPaused || status.IsFinal || status.IsResolved);
				},

				/**
				 * Flag of Solution caption.
				 * @protected
				 * @returns {Boolean} Solution caption visibility flag
				 */
				isSolutionCaptionVisible: function() {
					var CaseStatus = this.get("Status");
					var solutionDate = CasesEstimateLabel.isSolutionDate(this);
					return ((CasesEstimateLabel.isCaptionVisible(this) && solutionDate && CaseStatus &&
					(!CaseStatus.IsFinal && !CaseStatus.IsResolved && !CaseStatus.IsPaused)) ||
					(this.get("IsSolutionOverdue") && CasesEstimateLabel.isCaptionVisible(this) && solutionDate));
				},
				/**
				 * Gets prefix for Solution Date.
				 * @protected
				 * @returns {string} Solution caption
				 */
				getSolutionCaptionPrefix: function() {
					return this.get("IsSolutionOverdue") ?
						this.get("Resources.Strings.DelayHeaderCaptionSuffix") :
						this.get("Resources.Strings.LeftHeaderCaptionSuffix");
				},

				/**
				 * @inheritDoc CasePageV2#getLookupQueryFilters
				 * @overridden
				 */
				getLookupQueryFilters: function(columnName) {
					var parentColumnName = this.get("ParentColumnName");
					var parentFilters = this.get(parentColumnName + "Filters");
					var filterGroup = this.callParent([columnName]);
					if (columnName === parentColumnName && parentFilters) {
						filterGroup.add(parentFilters);
					}
					return filterGroup;
				},

				/**
				 * @inheritDoc CasePageV2#getLookupQuery
				 * @overridden
				 */
				getLookupQuery: function(filterValue, columnName, isLookup) {
					var parentColumnName = this.get("ParentColumnName");
					var parentFilters = this.get(parentColumnName + "Filters");
					var prepareListColumnName = this.get("PrepareListColumnName");
					var prepareListFilters = this.get(prepareListColumnName + "Filters");
					var entitySchemaQuery = this.callParent([filterValue, columnName, isLookup]);
					if (columnName === prepareListColumnName && prepareListFilters) {
						entitySchemaQuery.filters.add(prepareListColumnName + "Filter", prepareListFilters);
					}
					if (columnName === parentColumnName && parentFilters) {
						entitySchemaQuery.filters.add(parentColumnName + "Filter", parentFilters);
					}
					return entitySchemaQuery;
				},

				/**
				 * Updates information about initial object data.
				 * @protected
				 * @param {Boolean} isNull Cleaning flag of initial data
				 */
				updateOriginals: function(isNull) {
					var status = isNull ? null : this.get("Status");
					this.set("OriginalStatus", status);
					if (status) {
						this.set("IsOriginalStatusPaused", status.IsPaused);
					}
					this.set("OriginalSolutionProvidedOn", isNull ? null : this.get("SolutionProvidedOn"));
				},

				/**
				 * Sets the Number of Case.
				 * @protected
				 */
				setCaseNumber: function() {
					this.getIncrementCode(function(response) {
						this.set("Number", response);
					});
				},

				/**
				 * Non-empty field check for "Contact" and "Account".
				 * @param {Function} callback
				 * @param {Terrasoft.BaseSchemaViewModel} scope Execution context of callback-function
				 */
				validateAccountOrContactFilling: function(callback, scope) {
					var account = this.get("Account");
					var contact = this.get("Contact");
					var result = {
						success: true
					};
					if (this.Ext.isEmpty(account) && this.Ext.isEmpty(contact)) {
						result.message = this.get("Resources.Strings.RequiredContactOrAccountMessage");
						result.success = false;
					}
					callback.call(scope || this, result);
				},

				/**
				 * The handler that checks whether the status is resolved.
				 * @protected
				 * @virtual
				 * @param {Object} status Case status
				 */
				handleResolvedStatus: function(status) {
					if (status.IsResolved) {
						if (!this.get("SolutionProvidedOn")) {
							this.set("SolutionProvidedOn", new Date());
						}
						if (!this.get("FirstSolutionProvidedOn")) {
							this.set("FirstSolutionProvidedOn", new Date());
						}
					}
				},

				/**
				 * Clears "SolutionProvidedOn" if the status has been changes from "IsResolved" to not "IsFinal".
				 * @param {Object} status Case status
				 */
				clearSolutionProvidedOn: function(status) {
					var previousStatus = this.get("PreviousStatus");
					if (!status.IsFinal && previousStatus.IsResolved && this.get("SolutionProvidedOn")) {
						this.set("SolutionProvidedOn", 0);
					}
				},

				/**
				 * The handler that checks whether the status "IsFinal".
				 * If the status is final, sets "ClosureDate" and "ClosureCode".
				 * @param {Object} status Case status
				 */
				handleFinalStatus: function(status) {
					if (status.IsFinal && !this.get("ClosureDate")) {
						this.set("ClosureDate", new Date());
						if (this.get("OriginalSolutionProvidedOn")) {
							this.set("SolutionProvidedOn", this.get("OriginalSolutionProvidedOn"));
						}
						if (!this.get("ClosureCode")) {
							this.set("ClosureCode", this.get("DefCaseClosureCode"));
						}
					} else {
						this.set("ClosureDate", null);
						this.set("ClosureCode", null);
					}
				},

				/**
				 * "Status" change event handler.
				 * Changing the status from initial status to any other, sets the "RespondedOn" field by current date and time.
				 * @protected
				 */
				onStatusChanged: function() {
					var status = this.get("Status");
					if (!status) {
						return;
					}
					if (this.isStatusDef() === false && !this.get("RespondedOn")) {
						this.set("RespondedOn", new Date());
					}
					var originalStatus = this.get("OriginalStatus");
					if (!originalStatus) {
						return;
					}
					if (this.isNew || originalStatus !== status) {
						this.handleFinalStatus(status);
						this.handleResolvedStatus(status);
						this.handlePausedStatus(status);
					}
					this.clearSolutionProvidedOn(status);
					this.set("PreviousStatus", status);
				},

				/**
				 * The handler that checks whether the status is equal to "IsPaused".
				 * If the is "IsPaused", status is cleared
				 * @param {Object} status Case status
				 */
				handlePausedStatus: this.Terrasoft.emptyFn,

				/**
				 * Checks whether the field "RespondedOn" is not empty or it has been changed.
				 * @protected
				 * @returns {Boolean} RespondedOn updating flag
				 */
				needUpdateRespondedOn: function() {
					return this.get("RespondedOn") && this.changedValues && this.changedValues.RespondedOn;
				},

				/**
				 * Checks whether the field "SolutionProvidedOn" is not empty or it has been changed.
				 * @protected
				 * @returns {Boolean} SolutionProvidedOn updating flag
				 */
				needUpdateSolutionProvidedOn: function() {
					return this.get("SolutionProvidedOn") && this.changedValues && this.changedValues.SolutionProvidedOn;
				},

				/**
				 * Checks whether the field "FirstSolutionProvidedOn" is not empty or it has been changed.
				 * @protected
				 * @returns {Boolean} FirstSolutionProvidedOn updating flag
				 */
				needUpdateFirstSolutionProvidedOn: function() {
					return this.get("FirstSolutionProvidedOn") && this.changedValues && this.changedValues.FirstSolutionProvidedOn;
				},

				/**
				 * Checks whether "Status" column value and system settings "StatusDefSysSettingsValue" value are equal.
				 * @protected
				 * @returns {Boolean} Default status flag
				 */
				isStatusDef: function() {
					var status = this.get("Status");
					var statusDefSysSettingsValue = this.get("StatusDefSysSettingsValue");
					if (!status || !statusDefSysSettingsValue) {
						return;
					}
					return statusDefSysSettingsValue.value === status.value;
				},

				/**
				 * Fills the field of duplicate controls.
				 * @protected
				 */
				setControlsValue: function() {
					var category = this.get("Category");
					var origin = this.get("Origin");
					var priority = this.get("Priority");
					if (category) {
						this.set("ParametersCategory", category);
					}
					if (origin) {
						this.set("ParametersOrigin", origin);
					}
					if (priority) {
						this.set("ParametersPriority", priority);
					}
				},

				/**
				 * Forms the case date of creation.
				 * @protected
				 * @virtual
				 * @return {String} Case date of creation.
				 */
				getCreatedOnDate: function() {
					var createdOn = this.get("CreatedOn");
					var caption = this.get("Resources.Strings.CreatedOnCaption") + " ";
					return createdOn ? caption + FormatUtils.smartFormatDate(createdOn) : "";
				},

				/**
				 * Checks the rights, validates values, saves values
				 * If necessary, recalculates the value of the "RespondedOn" before saving
				 * @protected
				 * @virtual
				 */
				save: function() {
					if (this.needUpdateRespondedOn()) {
						this.set("RespondedOn", new Date());
					}
					if (this.needUpdateSolutionProvidedOn()) {
						this.set("SolutionProvidedOn", new Date());
					}
					if (this.needUpdateFirstSolutionProvidedOn()) {
						this.set("FirstSolutionProvidedOn", new Date());
					}
					var solutionRemainsSetter = this.get("SolutionRemainsSetter");
					if (solutionRemainsSetter) {
						this.set("SolutionRemains", solutionRemainsSetter);
					} else {
						this.set("SolutionRemains", 0);
					}
					this.set("IsCategoryEnabled", this.isNew || !this.get("Category"));
					this.updateOriginals();
					this.callParent(arguments);
				},

				/**
				 * @inheritDoc CasePageV2#asyncValidate
				 * @overridden
				 */
				asyncValidate: function(callback, scope) {
					this.callParent([function(response) {
						var chainCheckResponse = function(next) {
							if (!this.response.success) {
								this.callback.call(this.scope, this.response);
							} else {
								next();
							}
						};
						var chainValidateAccountOrContact = function(next) {
							var self = this;
							this.scope.validateAccountOrContactFilling(function(response) {
								self.response = response;
								next();
							}, this.scope);
						};
						var chainInvokeCallback = function() {
							this.callback.call(this.scope, this.response);
						};
						var chainScope = {
							scope: scope || this,
							response: response,
							callback: callback
						};
						this.Terrasoft.chain(chainCheckResponse, chainValidateAccountOrContact, chainInvokeCallback, chainScope);
					}, this]);
				},

				/**
				 * @inheritDoc CasePageV2#onGridRowChanged
				 * @overridden
				 */
				onGridRowChanged: function() {
					var result = this.callParent(arguments);
					this.updateOriginals(true);
					return result;
				},

				/**
				 * Sets context help identifier.
				 * @protected
				 */
				initContextHelp: function() {
					this.set("ContextHelpId", 1063);
					this.callParent(arguments);
				},

				/**
				 * Sets priority field caption.
				 * @protected
				 * @param {Object} item Selected list
				 */
				setPriorityField: function(item) {
					item.displayValue = "";
				}
			},
			rules: {
				"Contact": {
					"FiltrationContactByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Account",
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					}
				},
				"ClosureCode": {
					"EnableClosureCodeOnFinalState": {
						ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						property: BusinessRuleModule.enums.Property.ENABLED,
						conditions: [
							{
								leftExpression: {
									type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									attribute: "Status",
									attributePath: "IsFinal"
								},
								comparisonType: this.Terrasoft.ComparisonType.EQUAL,
								rightExpression: {
									type: BusinessRuleModule.enums.ValueType.CONSTANT,
									value: true
								}
							},
							{
								leftExpression: {
									type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									attribute: "Status",
									attributePath: "IsResolved"
								},
								comparisonType: this.Terrasoft.ComparisonType.EQUAL,
								rightExpression: {
									type: BusinessRuleModule.enums.ValueType.CONSTANT,
									value: true
								}
							}
						]
					},
					"RequireClosureCodeOnFinalState": {
						ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						property: BusinessRuleModule.enums.Property.REQUIRED,
						conditions: [{
							leftExpression: {
								type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								attribute: "Status",
								attributePath: "IsFinal"
							},
							comparisonType: this.Terrasoft.ComparisonType.EQUAL,
							rightExpression: {
								type: BusinessRuleModule.enums.ValueType.CONSTANT,
								value: true
							}
						}]
					}
				},
				"ClosureDate": {
					"EnableClosureDateOnFinalState": {
						ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						property: BusinessRuleModule.enums.Property.ENABLED,
						conditions: [{
							leftExpression: {
								type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								attribute: "Status",
								attributePath: "IsFinal"
							},
							comparisonType: this.Terrasoft.ComparisonType.EQUAL,
							rightExpression: {
								type: BusinessRuleModule.enums.ValueType.CONSTANT,
								value: true
							}
						}]
					}
				}
			}
		};
	});

define('CasePageV2CaseServiceResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("CasePageV2CaseService", ["BaseFiltersGenerateModule", "ServiceDeskConstants", "CasesEstimateLabel",
	"ConfigurationConstants", "EmailMessageConstants", "BusinessRuleModule", "LocalMessageConstants", "EmailHelper",
		"css!CaseProcessingCSS"],
	function(BaseFiltersGenerateModule, ServiceDeskConstants, CasesEstimateLabel, ConfigurationConstants,
		EmailMessageConstants, BusinessRuleModule, LocalMessageConstants, EmailHelper) {
		return {
			entitySchemaName: "Case",
			messages: {
				/**
				 * @message SavePublishers
				 * Inform publishers its need to be saved
				 */
				"SavePublishers": {
					mode: this.Terrasoft.MessageMode.PTP,
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
				 * @message GetListenerRecordInfo
				 *  Message of getting the listener record information.
				 */
				"GetListenerRecordInfo": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message LaunchLoadEmailData
				 *  Message that launches loading email data.
				 */
				"LaunchLoadEmailData": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message ShowSystemMessages
				 * Inform message history its need show system messages.
				 */
				"ShowSystemMessages": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message HideSystemMessages
				 * Inform message history its need hide system messages.
				 */
				"HideSystemMessages": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {
				/**
				 * Owner column value.
				 */
				"Owner": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					lookupListConfig: {filter: BaseFiltersGenerateModule.OwnerFilter}
				},
				/**
				 * Group column value.
				 */
				"Group": {
					lookupListConfig: {
						filter: function() {
							return Terrasoft.createColumnInFilterWithParameters("SysAdminUnitTypeValue", [
								ServiceDeskConstants.SysAdminUnitType.Organization.Value,
								ServiceDeskConstants.SysAdminUnitType.Division.Value,
								ServiceDeskConstants.SysAdminUnitType.Managers.Value,
								ServiceDeskConstants.SysAdminUnitType.Team.Value
							]);
						}
					}
				},
				/**
				 * ResponseDate column caption.
				 */
				"ResponseDateCaption": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION,
					dependencies: [
						{
							columns: ["ResponseDate"],
							methodName: "onPlanedDateChanged"
						},
						{
							columns: ["Status"],
							methodName: "onPlanedDateChanged"
						}
					]
				},
				/**
				 * Subject column.
				 */
				"Subject": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"dependencies": [
						{
							"columns": ["Subject"],
							"methodName": "onSubjectChanged"
						}
					]
				},
				/**
				 * IsResponseOverdue column flag.
				 */
				"IsResponseOverdue": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN
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
				}
			},
			details: /**SCHEMA_DETAILS*/{
				"EmailDetailV2": {
					"schemaName": "EmailDetailV2",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "Case"
					},
					"filterMethod": "emailDetailFilter",
					"defaultValues": {
						"Title": {
							"masterColumn": "detailEmailTitle"
						}
					}

				},
				"Activity": {
					"schemaName": "CaseActivityDetail",
					"entitySchemaName": "Activity",
					"filter": {
						"detailColumn": "Case",
						"masterColumn": "Id"
					}
				},
				"Calls": {
					"schemaName": "CallDetail",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "Case"
					}
				},
				"KnowledgeBaseCase": {
					"schemaName": "KnowledgeBaseInCaseDetail",
					"entitySchemaName": "KnowledgeBaseInCase",
					"filter": {
						"detailColumn": "Case",
						"masterColumn": "Id"
					}
				},
				"NextSteps": {
					"schemaName": "NextStepsDetail",
					"entitySchemaName": "Activity",
					"filterMethod": "getNextStepsDetailFilter",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "Case"
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				// Publishers
				{
					"operation": "insert",
					"parentName": "ProcessingTab",
					"name": "MessagePublishersContainer",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": []
					},
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "insert",
					"parentName": "MessagePublishersContainer",
					"propertyName": "items",
					"name": "MessagePublishers",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.MODULE,
						"moduleName": "MessagePublishersModule",
						"afterrender": {
							"bindTo": "loadPublishers"
						},
						"afterrerender": {
							"bindTo": "loadPublishers"
						}
					}
				},
				// History
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
						"controlConfig": {
							"collapsed": false,
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
					"name": "ShowSystemMessagesLabel",
					"parentName": "MessageHistoryGroup",
					"propertyName": "tools",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.ShowSystemMessagesString"
						},
						"labelClass": ["systemMessageVisibilityLabel"],
						"visible": {
							"bindTo": "getShowSystemMessagesLabelVisible"
						},
						"click": {
							"bindTo": "showSystemMessages"
						}
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "HideSystemMessagesLabel",
					"parentName": "MessageHistoryGroup",
					"propertyName": "tools",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.HideSystemMessagesString"
						},
						"labelClass": ["systemMessageVisibilityLabel"],
						"visible": {
							"bindTo": "getHideSystemMessagesLabelVisible"
						},
						"click": {
							"bindTo": "hideSystemMessages"
						}
					},
					"index": 1
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
					"operation": "insert",
					"name": "Activity",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					},
					"parentName": "ParametersTab",
					"propertyName": "items",
					"index": 3
				},
				{
					"operation": "insert",
					"name": "Calls",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					},
					"parentName": "ParametersTab",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "KnowledgeBaseCase",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					},
					"parentName": "ParametersTab",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "EmailDetailV2",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					},
					"parentName": "ParametersTab",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "NextSteps",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					},
					"parentName": "ProcessingTab",
					"propertyName": "items",
					"index": 2
				},
				{
					"operation": "insert",
					"name": "RespondedOn",
					"values": {
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "RespondedOn",
						"enabled": false
					},
					"parentName": "CaseParameters_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "Group",
					"values": {
						"layout": {
							"column": 0,
							"row": 6,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "Group",
						"controlConfig": {
							"prepareList": {"bindTo": "onPrepareGroup"}
						}
					},
					"parentName": "CaseProfile_gridLayout",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "Owner",
					"values": {
						"layout": {
							"column": 0,
							"row": 7,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "Owner",
						"contentType": Terrasoft.ContentType.LOOKUP,
						"controlConfig": {
							"prepareList": {
								"bindTo": "onPrepareOwner"
							}
						}
					},
					"parentName": "CaseProfile_gridLayout",
					"propertyName": "items"

				},
				{
					"operation": "insert",
					"name": "AssignToMeButton",
					"values": {
						"layout": {
							"column": 0,
							"row": 8,
							"colSpan": 24,
							"rowSpan": 1
						},
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"caption": {
							"bindTo": "Resources.Strings.AssignToMeCaption"
						},
						"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"classes": {
							"textClass": ["caseLinkButton", "assignToButton"]
						},
						"click": {"bindTo": "onAssignToMeClick"}
					},
					"parentName": "CaseProfile_gridLayout",
					"propertyName": "items"
				},
				// ResponseLabel
				{
					"operation": "insert",
					"name": "ResponseCaptionContainer",
					"propertyName": "items",
					"values": {
						"id": "ResponseCaptionContainer",
						"selectors": {"wrapEl": "#ResponseCaptionContainer"},
						"layout": {
							"column": 4,
							"row": 4,
							"colSpan": 6,
							"rowSpan": 1
						},
						"markerValue": "ResponseCaptionContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["estimate-caption-container"],
						"items": []
					},
					"parentName": "CaseParameters_gridLayout"
				},
				{
					"operation": "insert",
					"name": "ResponseTimerImageContainer",
					"parentName": "ResponseCaptionContainer",
					"propertyName": "items",
					"values": {
						"id": "ResponseTimerImageContainer",
						"selectors": {"wrapEl": "#ResponseTimerImageContainer"},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["timer-image-container"],
						"visible": {
							"bindTo": "isResponseTimerImageVisible"
						},
						"markerValue": "ResponseTimerImageContainer",
						"afterrerender": {
							"bindTo": "renderCaptionStyle"
						},
						"afterrender": {
							"bindTo": "renderCaptionStyle"
						},
						"items": []
					},
					"index": 10
				},
				{
					"operation": "insert",
					"name": "MinutesCaption",
					"parentName": "ResponseCaptionContainer",
					"propertyName": "items",
					"values": {
						"id": "ResponseMinutesCaption",
						"labelClass": ["estimate-caption-label"],
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getResponseDateMinute"
						},
						"visible": {
							"bindTo": "isResponseHourVisible"
						}
					},
					"index": 3
				},
				{
					"operation": "insert",
					"name": "EstimateSeconds",
					"parentName": "ResponseCaptionContainer",
					"propertyName": "items",
					"values": {
						"id": "ResponseEstimateSeconds",
						"labelClass": ["estimate-caption-label blink"],
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": ":",
						"visible": {
							"bindTo": "isResponseHourVisible"
						}
					},
					"index": 2
				},
				{
					"operation": "insert",
					"name": "ResponseCaptionLabel",
					"parentName": "ResponseCaptionContainer",
					"propertyName": "items",
					"values": {
						"id": "ResponseCaptionLabel",
						"labelClass": ["estimate-caption-label day"],
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getResponseDateDay"
						},
						"visible": {
							"bindTo": "isResponseCaptionVisible"
						},
						"afterrerender": {"bindTo": "renderCaptionStyle"},
						"afterrender": {"bindTo": "renderCaptionStyle"}
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "ResponseCaptionPrefix",
					"parentName": "ResponseCaptionContainer",
					"propertyName": "items",
					"values": {
						"id": "ResponseCaptionPrefix",
						"labelClass": ["estimate-caption-label prefix"],
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getResponseCaptionPrefix"
						},
						"visible": {
							"bindTo": "isResponseCaptionVisible"
						}
					},
					"index": 0
				}
			]/**SCHEMA_DIFF*/,
			methods: {
				/**
				 * Forms Owner's collection.
				 * @private
				 * @param {String} filter
				 */
				onPrepareOwner: function(filter) {
					this.getUsersInGroups(function(usersInGroupsCollection, scope) {
						var prepareListColumnName = "Owner";
						scope.set("PrepareListColumnName", prepareListColumnName);
						var esq = scope.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "SysAdminUnit"
						});
						esq.addColumn("Contact");
						var group = scope.get("Group");
						if (!group || group.value === scope.Terrasoft.GUID_EMPTY) {
							var filterGroup = new scope.Terrasoft.createFilterGroup();
							var ownerDependeceFilters = scope.getOwnerDependenceFilters(scope);
							if (ownerDependeceFilters) {
								filterGroup.add(scope.getOwnerDependenceFilters(scope));
							}
							filterGroup.add("ContactExistsFilter", scope.Terrasoft.createColumnIsNotNullFilter("Contact"));
							esq.filters.add(filterGroup);
						}
						esq.filters.logicalOperation = scope.Terrasoft.LogicalOperatorType.OR;
						if (usersInGroupsCollection.length > 0) {
							esq.filters.add("OwnerCollectionFilter",
								scope.Terrasoft.createColumnInFilterWithParameters("Id", usersInGroupsCollection));
						}
						esq.getEntityCollection(function(result) {
							var existsCollection = [];
							if (result.success) {
								result.collection.each(function(item) {
									existsCollection.push(item.get("Contact").value);
								});
							}
							var filtersCollection = scope.Terrasoft.createFilterGroup();
							if (existsCollection.length > 0) {
								filtersCollection.add("existsFilter",
									scope.Terrasoft.createColumnInFilterWithParameters("Id", existsCollection));
							} else {
								filtersCollection.add("emptyFilter", scope.Terrasoft.createColumnIsNullFilter("Id"));
							}
							scope.set(prepareListColumnName + "Filters", filtersCollection);
							scope.loadLookupData(filter, scope.get(prepareListColumnName + "List"),
								prepareListColumnName, true);
						}, scope);
					}, this);
				},

				/**
				 * Forms Group's collection.
				 * @private
				 * @param {String} filter
				 */
				onPrepareGroup: function(filter) {
					var prepareListColumnName = "Group";
					this.set("PrepareListColumnName", prepareListColumnName);
					this.getGroupEsq(function(esq, scope) {
						esq.getEntityCollection(function(result) {
							var existsCollection = [];
							if (result.success) {
								result.collection.each(function(item) {
									existsCollection.push(item.get("Id"));
								});
							}
							var filtersCollection = scope.Terrasoft.createFilterGroup();
							if (existsCollection.length > 0) {
								filtersCollection.add("existsFilter", scope.Terrasoft.createColumnInFilterWithParameters(
									"Id", existsCollection));
							} else {
								filtersCollection.add("emptyFilter", scope.Terrasoft.createColumnIsNullFilter("Id"));
							}
							scope.set(prepareListColumnName + "Filters", filtersCollection);
							scope.loadLookupData(filter, scope.get(prepareListColumnName + "List"),
								prepareListColumnName, true);
						}, scope);
					}, this);
				},

				/**
				 * Forms an instance of EntitySchemaQuery "Object" to select suitable group
				 * @private
				 * @param {Function} callback Function that forms the collection of "Group"
				 * @param {Terrasoft.BaseSchemaViewModel} scope Execution context of callback function
				 */
				getGroupEsq: function(callback, scope) {
					var esq = scope.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "SysAdminUnit"
					});
					esq.addColumn("Id");
					var ownerDependeceFilters = scope.getOwnerDependenceFilters(scope);
					if (ownerDependeceFilters) {
						esq.filters.add(scope.getOwnerDependenceFilters(scope));
					}
					esq.filters.add("ContactNotExistsFilter", scope.Terrasoft.createColumnIsNullFilter("Contact"));
					callback(esq, scope);
				},

				/**
				 * Returns filters for fields "Owner" and "Group".
				 * @protected
				 * @virtual
				 */
				getOwnerDependenceFilters: this.Terrasoft.emptyFn,

				/**
				 * Forms collection of "Owner"'s within the group "Service Engineer".
				 * @private
				 * @param {Function} callback  Function of Owner's collection for list
				 * @param {Terrasoft.BaseSchemaViewModel} scope Context of callback-function
				 */
				getUsersInGroups: function(callback, scope) {
					scope.getGroupListCollection(function(groupCollection) {
						var prepareListColumnName = "Group";
						scope.set("PrepareListColumnName", prepareListColumnName);
						var esq = scope.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "SysAdminUnit"
						});
						esq.addColumn("Id");
						var group = scope.get("Group");
						if (group && group.value !== scope.Terrasoft.GUID_EMPTY) {
							groupCollection = [group.value];
						}
						if (groupCollection.length > 0) {
							esq.filters.add("GroupCollectionFilter", scope.Terrasoft.createColumnInFilterWithParameters(
								"[SysUserInRole:SysUser].SysRole", groupCollection));
						} else {
							esq.filters.add("emptyFilter", scope.Terrasoft.createColumnIsNullFilter("Id"));
						}
						esq.getEntityCollection(function(result) {
							var existsCollection = [];
							if (result.success) {
								result.collection.each(function(item) {
									existsCollection.push(item.get("Id"));
								});
							}
							callback(existsCollection, scope);
						}, scope);
					}, scope);
				},

				/**
				 * Get list of administrative groups.
				 * @private
                 * @param {Function} callback  Function of Owner's collection for list.
                 * @param {Terrasoft.BaseSchemaViewModel} scope Context of callback-function.
				 */
				getGroupListCollection: function(callback, scope) {
					scope.getGroupEsq(function(esq, scope) {
						esq.getEntityCollection(function(result) {
							var existsCollection = [];
							if (result.success) {
								result.collection.each(function(item) {
									existsCollection.push(item.get("Id"));
								});
							}
							callback(existsCollection);
						}, scope);
					}, scope);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#init
				 * @protected
				 * @overridden
				 */
				init: function() {
					if (this.isEditMode()) {
						this.callParent(arguments);
						return;
					}
					if (this.get("CallParentInit")) {
						this.set("CallParentInit", false);
						this.callParent(arguments);
						return;
					}
					this.set("ParentInitArguments", arguments);
					this.initPublishersCollection(true);
				},

				/**
				 * Entity initialization end event.
				 * @protected
				 * @overriden
				 */
				onEntityInitialized: function() {
					this.onLoadEmailData();
					this.checkMessageHistoryExists();
					this.callParent(arguments);
				},

				/**
				 * Calculation of date difference for ResponseDate.
				 * @protected
				 * @overidden
				 */
				setDateDiff: function() {
					this.callParent(arguments);
					if (!CasesEstimateLabel.isCaptionVisible(this)) {
						return;
					}
					CasesEstimateLabel.calculateDateDiff("ResponseDate", "ResponseDateCaption",
						"IsResponseOverdue", this);
				},

				/**
				 * Sets number of days and time for response date.
				 * @returns {string}
				 */
				getResponseDateDay: function() {
					var isOverdue = this.get("IsResponseOverdue");
					return CasesEstimateLabel.setDayDiff("ResponseDateCaption", isOverdue, this);
				},

				/**
				 * Sets value of remaining minutes for response date.
				 * @returns {string}
				 */
				getResponseDateMinute: function() {
					return CasesEstimateLabel.getDateMinute("ResponseDateCaption", this);
				},

				/**
				 * Displays time.
				 * @returns {boolean|*|*}
				 */
				isResponseHourVisible: function() {
					return (CasesEstimateLabel.isHourVisible("ResponseDateCaption", this) &&
					this.isResponseCaptionVisible());
				},

				/**
				 * Displays image.
				 * @returns {*|boolean}
				 */
				isResponseTimerImageVisible: function() {
					return (this.isTimerImageVisible() && this.isResponseCaptionVisible() &&
					CasesEstimateLabel.isNewRequest(this));
				},

				/**
				 * Gets the value of prefix of response date caption.
				 * @returns {string}
				 */
				getResponseCaptionPrefix: function() {
					return this.get("IsResponseOverdue") ?
						this.get("Resources.Strings.DelayHeaderCaptionSuffix") :
						this.get("Resources.Strings.LeftHeaderCaptionSuffix");
				},

				/**
				 * Displays the value of response date label.
				 * @returns {boolean|*|*}
				 */
				isResponseCaptionVisible: function() {
					var CaseStatus = this.get("Status");
					var responseDate = CasesEstimateLabel.isResponseDate(this);
					return ((CasesEstimateLabel.isCaptionVisible(this) && responseDate && CaseStatus &&
					CasesEstimateLabel.isNewRequest(this)) ||
					(CasesEstimateLabel.isCaptionVisible(this) && this.get("IsResponseOverdue") && responseDate));
				},

				/**
				 * Returns module ID of message publishers.
				 * @private
				 * @return {String} Sandbox identifier for message publishers.
				 */
				getMessagePublishersSandboxId: function() {
					return this.sandbox.id + "_MessagePublishersModule";
				},

				/**
				 * Returns module ID of message history.
				 * @private
				 * @return {String} Sandbox identifier for message history.
				 */
				getMessageHistorySandboxId: function() {
					return this.sandbox.id + "_MessageHistoryModule";
				},

				/**
				 * Returns module ID of email message history.
				 * @private
				 * @return {String} Sandbox identifier for email message history.
				 */
				getEmailMessageHistorySandboxId: function() {
					return this.sandbox.id + "_MessagePublishersModule_EmailMessagePublisherModule";
				},

				/**
				 * Rerenders module of message publishers.
				 * @protected
				 * @virtual
				 */
				loadPublishers: function() {
					var moduleId = this.getMessagePublishersSandboxId();
					var rendered = this.sandbox.publish("RerenderModule", {
						renderTo: "MessagePublishers"
					}, [moduleId]);
					if (!rendered) {
						var messagePublishersModuleConfig = {
							renderTo: "MessagePublishers",
							id: moduleId
						};
						this.sandbox.loadModule("MessagePublishersModule", messagePublishersModuleConfig);
					}
				},

				/**
				 * Rerenders module of history message.
				 * @protected
				 * @virtual
				 */
				loadMessage: function() {
					var moduleId = this.getMessageHistorySandboxId();
					var rendered = this.sandbox.publish("RerenderModule", {
						renderTo: "MessageHistory"
					}, [moduleId]);
					if (!rendered) {
						var messageHistoryModuleConfig = {
							renderTo: "MessageHistory",
							id: moduleId
						};
						this.sandbox.loadModule("MessageHistoryModule", messageHistoryModuleConfig);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#updateDetails
				 * @overridden
				 */
				updateDetails: function() {
					this.callParent(arguments);
					this.sandbox.publish("InitModuleViewModel", null, [this.getMessageHistorySandboxId()]);
					this.sandbox.publish("InitModuleViewModel", null, [this.getMessagePublishersSandboxId()]);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					var id = this.get("PrimaryColumnValue");
					var tags = id ? [id] : null;
					this.sandbox.subscribe("ReloadCard", this.onReloadCard, this, tags);
					this.sandbox.subscribe("GetRecordInfo", this.onGetRecordInfoForHistory,
						this, [this.getMessageHistorySandboxId()]);
					this.sandbox.subscribe("GetRecordInfo", this.getSectionId,
						this, [this.getMessagePublishersSandboxId()]);
					this.sandbox.subscribe("GetListenerRecordInfo", this.onGetRecordInfoForPublisher, this);
					this.sandbox.subscribe("LaunchLoadEmailData", this.onLoadEmailData,
						this, [this.getEmailMessageHistorySandboxId()]);
					this.callParent(arguments);
				},

				/**
				 * Returns information about record for message modules.
				 * @protected
				 * @virtual
				 * @return {Object} Record information.
				 */
				getSectionId: function() {
					var moduleConfig = this.Terrasoft.configuration.ModuleStructure[this.entitySchemaName];
					return {
						sectionId: moduleConfig ? moduleConfig.moduleId : null
					};
				},

				/**
				 * Returns information about message history record.
				 * @protected
				 * @virtual
				 * @return {Object} Record information.
				 */
				onGetRecordInfoForHistory: function() {
					var entitySchemaName = this.entitySchema.name;
					var historySchemaName = entitySchemaName + "MessageHistory";
					var primaryColumnValue = this.get("PrimaryColumnValue") || this.get(this.entitySchema.primaryColumnName);
					if (this.isCopyMode()) {
						primaryColumnValue = null;
					}
					var moduleConfig = this.Terrasoft.configuration.ModuleStructure[this.entitySchemaName];
					return {
						relationEntityId: primaryColumnValue,
						historySchemaName: historySchemaName,
						historyRelationColumn: entitySchemaName,
						sectionId: moduleConfig.moduleId
					};
				},

				/**
				 * Sets the message publishers for the current section.
				 * @private
				 */
				initPublishersCollection: function(isNeed) {
					var messagePublishers = [];
					var section = this.getSectionId();
					if (section == null) {
						return;
					}
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "MessagePublisherBySection"
					});
					esq.addColumn("MessagePublisher.ClassName", "ModuleName");
					esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"Section", section.sectionId));
					esq.getEntityCollection(function(result) {
						if (!result.success) {
							return;
						}
						var items = result.collection.getItems();
						this.Terrasoft.each(items, function(item) {
							messagePublishers.push(item.get("ModuleName"));
						}, this);
						this.set("MessagePublishers", messagePublishers);
						if (isNeed) {
							this.set("CallParentInit", true);
							this.init.apply(this, this.get("ParentInitArguments"));
						}

					}, this);
				},

				/**
				 * Returns ID of message publisher module.
				 * @protected
				 * @virtual
				 * @return {Array} IDs of message publishers module.
				 */
				getMessagePublishersModuleIds: function() {
					var publishers = this.get("MessagePublishers");
					var messagePublishersSandboxIds = [];
					var sandboxId = this.sandbox.id + "_MessagePublishersModule_";
					this.Terrasoft.each(publishers, function(item) {
						messagePublishersSandboxIds.push(sandboxId + item);
					}, this);
					return messagePublishersSandboxIds;
				},

				/**
				 * @inheritDoc BaseModulePageV2#getSaveRecordMessagePublishers
				 * @overridden
				 */
				getSaveRecordMessagePublishers: function() {
					var publishers = this.callParent(arguments);
					return publishers.concat(this.getMessagePublishersModuleIds());
				},

				/**
				 * Publishes email data.
				 * @private
				 */
				publishListenerEmailData: function() {
					var moduleId = this.getEmailMessageHistorySandboxId();
					this.sandbox.publish("SendListenerEmailData", this.get("EmailData"), [moduleId]);
				},

				/**
				 * Starts process of getting email data
				 * @private
				 */
				onLoadEmailData: function() {
					this.set("detailEmailTitle", this.getEmailTitle());
					this.getEmailData.call(this, this.publishListenerEmailData);
				},

				/**
				 * Returns title for an email to be sent from case section
				 * @returns {String} Email title
				 */
				getEmailTitle: function() {
					var emailTitleMessage = this.get("Resources.Strings.EmailTitleCaption");
					var title = this.get("Subject");
					var number = this.get("Number");
					return this.Ext.String.format(emailTitleMessage, number, title);
				},

				/**
				 * Returns information about record for subscriber message module.
				 * @protected
				 * @virtual
				 * @return {Object} Record information.
				 */
				onGetRecordInfoForPublisher: function() {
					var relationSchemaName = this.entitySchema.name;
					var relationSchemaUId = this.entitySchema.uId;
					var relationSchemaRecordId = this.get(this.primaryColumnName);
					var title = this.getEmailTitle();
					return {
						relationSchemaName: relationSchemaName,
						relationSchemaUId: relationSchemaUId,
						relationSchemaRecordId: relationSchemaRecordId,
						additionalInfo: {
							title: title
						}
					};
				},

				/**
				 * In case of email existence in the history fills email data from history.
				 * Otherwise, finds email from contact and account
				 * @virtual
				 * @param {Function} callback Callback function
				 */
				getEmailData: function(callback) {
					this.getHistoryEmailResponse.call(this, function(response) {
						if (response && response.success) {
							var items = response.collection.getItems();
							if (items.length) {
								this.setEmailDataFromHistory(items[0]);
								callback.call(this);
							} else {
								this.setEmailDataFromProfile(callback);
							}
						}
					}, this);
				},

				/**
				 * Sets email data from contact or account.
				 * @protected
				 * @param {Object} callback The callback function
				 */
				setEmailDataFromProfile: function(callback) {
					this.getProfileEmailResponse.call(this, function(searchValue, response) {
						var data = {};
						if (response && response.success) {
							var items = response.collection.getItems();
							var email = items.length >= 1
									? EmailHelper.getEmailWithName(items[0].get("Email"), searchValue)
									: "";
							data = { email: email};
						}
						this.set("EmailData", data);
						callback.call(this);
					}, this);
				},

				/**
				 * Sets email data from the last history email message.
				 * @private
				 * @param {Object} item History message item
				 */
				setEmailDataFromHistory: function(item) {
					var data = {
						email: item.get("Email"),
						searchValue: ""
					};
					this.set("EmailData", data);
				},

				/**
				 * Returns response from database about email of the last history email message.
				 * @virtual
				 * @param {Function} callback Callback function.
				 */
				getHistoryEmailResponse: function(callback) {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this.entitySchemaName + "MessageHistory",
						rowCount: 1
					});
					var createdOnColumn = esq.addColumn("CreatedOn");
					createdOnColumn.orderPosition = 0;
					createdOnColumn.orderDirection = this.Terrasoft.OrderDirection.DESC;
					esq.addColumn("[Activity:Id:RecordId].Sender", "Email");
					esq.filters.add("CaseFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, this.entitySchemaName, this.get("Id")));
					esq.filters.add("CommunicationFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "MessageNotifier", EmailMessageConstants.MessageNotifier.Email));
					esq.filters.add("EmailTypeFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "[Activity:Id:RecordId].MessageType",
						ConfigurationConstants.Activity.MessageType.Incoming));
					esq.getEntityCollection(function(response) {
						callback.call(this, response);
					}, this);
				},

				/**
				 * Calls email from database from contact or account.
				 * @virtual
				 * @param {Function} callback Callback function.
				 */
				getProfileEmailResponse: function(callback) {
					var contact = this.get("Contact");
					var account = this.get("Account");
					if (!contact && !account) {
						callback.call(this);
						return;
					}
					var esq = "";
					var searchValue = "";
					if (contact) {
						esq = this.getEmailQuery(contact.value, "Contact");
						searchValue = contact.displayValue;
					}
					if (!contact && account) {
						esq = this.getEmailQuery(account.value, "Account");
						searchValue = account.displayValue;
					}
					esq.getEntityCollection(function(response) {
						callback.call(this, searchValue, response);
					}, this);
				},

				/**
				 * Returns email query.
				 * @protected
				 * @param {String} filterValue Filter key.
				 * @param {String} filterFieldName Filter search column.
				 * @return {Terrasoft.EntitySchemaQuery}
				 */
				getEmailQuery: function(filterValue, filterFieldName) {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: filterFieldName + "Communication"
					});
					esq.addColumn("Number", "Email");
					esq.filters.add(filterFieldName + "Filter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, filterFieldName, filterValue));
					esq.filters.add("CommunicationFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "CommunicationType", ConfigurationConstants.CommunicationType.Email));
					return esq;
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#getEntityInitializedSubscribers
				 * @overridden
				 */
				getEntityInitializedSubscribers: function() {
					var subscribers = this.callParent(arguments);
					subscribers.push(this.getMessageHistorySandboxId());
					subscribers.push(this.getMessagePublishersSandboxId());
					return subscribers;
				},

				/**
				 * "Assign to me" button handler.
				 * Set owner by current user contact.
				 * @protected
				 */
				onAssignToMeClick: function() {
					this.set("Owner", this.Terrasoft.SysValue.CURRENT_USER_CONTACT);
				},

				/**
				 * Get filter for next steps detail.
				 * @protected
				 */
				getNextStepsDetailFilter: function() {
					var filterGroup = new this.Terrasoft.createFilterGroup();
					filterGroup.add("CaseFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Case", this.get("Id")));
					filterGroup.add("TypeFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Type", ConfigurationConstants.Activity.Type.Task));
					filterGroup.add("StatusFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Status.Finish", 0));
					return filterGroup;
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onSaved
				 * @overridden
				 */
				onSaved: function() {
					if (this.get("CallParentOnSaved")) {
						this.set("CallParentOnSaved", false);
						this.callParent(arguments);
						return;
					}
					var config = arguments[1];
					if (this.isNewMode() && !(config && config.isSilent)) {
						this.saveUnsavedMessages();
					}
					this.set("ParentOnSavedArguments", arguments);
					this.checkMessageHistoryExists(true);
				},

				/**
				 * Returns ID of social message publisher module.
				 * @protected
				 * @virtual
				 * @return {String} ID of social message publishers module.
				 */
				getSocialMessagePublisherModuleId: function() {
					return this.sandbox.id + "_MessagePublishersModule_SocialMessagePublisherModule";
				},

				/**
				 * Saves local message in new mode.
				 * @protected
				 * @virtual
				 */
				saveUnsavedMessages: function() {
					var socialMessagePublisherModuleId = this.getSocialMessagePublisherModuleId();
					this.sandbox.publish("SavePublishers", null, [socialMessagePublisherModuleId]);
				},

				/**
				 * The function of creating filters details email.
				 * @protected
				 * @returns {Terrasoft.FilterGroup} Filters details email.
				 */
				emailDetailFilter: function() {
					var filterGroup = new this.Terrasoft.createFilterGroup();
					filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
					filterGroup.add("CaseFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Case", this.get("Id")));
					filterGroup.add("EmailFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Type", ConfigurationConstants.Activity.Type.Email));
					return filterGroup;
				},

				/**
				 * Checks the number of MessageHistory records.
				 * @private
				 */
				checkMessageHistoryExists: function(isNeed) {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this.entitySchemaName + "MessageHistory"
					});
					esq.addColumn("Id");
					esq.filters.add("EntitySchemaFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, this.entitySchemaName, this.get("Id")));
					esq.filters.add("CommunicationFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "MessageNotifier", LocalMessageConstants.MessageNotifier.Local));

					esq.getEntityCollection(function(response) {
						if (response.success) {
							var rowsCount = response.collection.getCount();
							this.set("IsMessageHistoryExists", rowsCount > 0);
						}
						if (isNeed) {
							this.set("CallParentOnSaved", true);
							this.onSaved.apply(this, this.get("ParentOnSavedArguments"));
						}
					}, this);
				},

				/**
				 * Returns visibility of show system message button.
				 * @private
				 * @return {Boolean} Visibility of hide system message button.
				 */
				getShowSystemMessagesLabelVisible: function() {
					return !this.get("IsMessageHistoryGroupCollapsed") && !this.get("NeedShowSystemMessages") &&
						this.get("IsMessageHistoryExists");
				},

				/**
				 * Returns visibility of hide system message button.
				 * @private
				 * @return {Boolean} Visibility of hide system message button.
				 */
				getHideSystemMessagesLabelVisible: function() {
					return !this.get("IsMessageHistoryGroupCollapsed") && this.get("NeedShowSystemMessages") &&
						this.get("IsMessageHistoryExists");
				},

				/**
				 * Handle collapsed of message history group.
				 * @private
				 * @param {Boolean} isCollapsed Collapsed of message history group.
				 */
				onMessageHistoryGroupCollapsedChanged: function(isCollapsed) {
					return this.set("IsMessageHistoryGroupCollapsed", isCollapsed);
				},

				/**
				 * Hides system message.
				 * @private
				 */
				hideSystemMessages: function() {
					this.set("NeedShowSystemMessages", false);
					this.sandbox.publish("HideSystemMessages", null, [this.getMessageHistorySandboxId()]);
				},

				/**
				 * Shows system message.
				 * @private
				 */
				showSystemMessages: function() {
					this.set("NeedShowSystemMessages", true);
					this.sandbox.publish("ShowSystemMessages", null, [this.getMessageHistorySandboxId()]);
				},

				/**
				 * Fires when subject is changed.
				 * @protected
				 */
				onSubjectChanged: function() {
					this.set("detailEmailTitle", this.getEmailTitle());
				}
			},
			rules: {
				"Category": {
					"CategoryRequired": {
						ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						property: BusinessRuleModule.enums.Property.REQUIRED,
						conditions: [{
							leftExpression: {
								type: BusinessRuleModule.enums.ValueType.CONSTANT,
								value: true
							},
							comparisonType: this.Terrasoft.ComparisonType.EQUAL,
							rightExpression: {
								type: BusinessRuleModule.enums.ValueType.CONSTANT,
								value: true
							}
						}]
					}
				}
			}
		};
	});

define("CasePageV2", ["BusinessRuleModule"],
	function(BusinessRuleModule) {
		return {
			entitySchemaName: "Case",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "ServiceItem",
					"values": {
						"layout": {
							"column": 0,
							"row": 5,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "ServiceItem"
					},
					"parentName": "CaseProfile_gridLayout",
					"propertyName": "items"
				}
			]/**SCHEMA_DIFF*/,
			mixins: {},
			attributes: {
				/**
				 * ServiceItem column value.
				 */
				"ServiceItem": {
					lookupListConfig: {
						filter: function() {
							return this.getServiceItemFilter();
						}
					},
					dependencies: [
						{
							columns: ["ServiceItem"],
							methodName: "onServiceItemChanged"
						}
					]
				}
			},
			methods: {
				/**
				 * Sets CaseCategory column value for "ServiceItem".
				 * @protected
				 * @virtual
				 */
				setTypeByServiceItem: function() {
					var serviceItem = this.get("ServiceItem");
					if (!serviceItem) {
						return;
					}
					var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "ServiceItem"
					});
					select.addColumn("CaseCategory");
					select.filters.add("ServiceItemIdFilter",
						select.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Id", serviceItem.value));
					select.getEntityCollection(function(result) {
						if (result.success && result.collection.getCount()) {
							var entity = result.collection.getByIndex(0);
							if (!this.get("Category")) {
								this.set("Category", entity.values.CaseCategory);
							}
						}
					}, this);
				},

				/**
				 * "ServiceItem" change event handler.
				 * @protected
				 * @virtual
				 */
				onServiceItemChanged: function() {
					if (this.changedValues.ServiceItem || !this.get("OriginalServiceItem")) {
						this.recalculateServiceTerms();
						this.setTypeByServiceItem();
					}
				},

				/**
				 * Updates information about initial object data.
				 * @param {Boolean} isNull Cleaning flag of initial data.
				 */
				updateOriginals: function(isNull) {
					this.set("OriginalServiceItem", isNull ? null : this.get("ServiceItem"));
					this.callParent(arguments);
				},

				/**
				 * Starts recalculating scheduled dates for "ServiceItem".
				 */
				recalculateServiceTerms: function() {
					var config = this.getCallTermCalculationServiceConfig();
					if (config) {
						this.callService(config, this.onRecalculateServiceTerms, this);
					} else if (this.get("ResponseDate")) {
						this.set("ResponseDate", null);
						this.set("SolutionDate", null);
					}
				},

				/**
				 * Returns service startup config for calculation term for "ServiceItem".
				 * @returns {Object} Service startup config.
				 */
				getCallTermCalculationServiceConfig: function() {
					var serviceItem = this.get("ServiceItem");
					var registrationTime = this.get("RegisteredOn");
					if (!serviceItem || !registrationTime) {
						return null;
					}
					var config = {
						serviceName: "TermCalculationCSService",
						methodName: "GetServiceTerm",
						data: {
							request: {
								ServiceItemId: serviceItem.value,
								PriorityId: this.Terrasoft.GUID_EMPTY,
								RegistrationTime: JSON.parse(this.Terrasoft.encodeDate(registrationTime))
							}
						}
					};
					return config;
				},

				/**
				 * @oritdoc Terrasoft.CasePageV2#handlePausedStatus
				 * @overridden
				 */
				handlePausedStatus: function(status) {
					if (status.IsPaused) {
						this.set("SolutionDateGetter", this.get("SolutionDate"));
						this.set("SolutionDate", null);
						if (this.get("IsOriginalStatusPaused") === false && this.get("SolutionDateGetter")) {
							this.calculateRemains(true);
						}
					} else {
						if (this.get("IsOriginalStatusPaused")) {
							this.calculateDateAfterPause(status.IsResolved);
						}
					}
				},

				/**
				 * Sets "ResponseDate" and "SolutionDate".
				 * @param {Object} responseObject Service response of scheduled dates for "ServiceItem".
				 */
				onRecalculateServiceTerms: function(responseObject) {
					this.hideBodyMask();
					var result = responseObject.GetServiceTermResult;
					this.set("ResponseDate", new Date(parseInt(result.ReactionTime.substr(6), 10)));
					this.set("SolutionDate", new Date(parseInt(result.SolutionTime.substr(6), 10)));
				},

				/**
				 * Starts recalculation "SolutionDate" after pause state.
				 * @protected
				 * @virtual
				 * @param {Boolean} isResolution "SolutionDate" flag.
				 */
				calculateDateAfterPause: function(isResolution) {
					var CaseId = this.get("Id");
					var remainsTicks = isResolution ? this.get("SolutionRemains") : this.get("ResponseRemains");
					var config = {
						serviceName: "TermCalculationCSService",
						methodName: "GetDateAfterPause",
						data: {
							request: {
								RemainsTicks: remainsTicks,
								IsResolution: isResolution,
								CaseId: CaseId
							}
						}
					};
					if (isResolution) {
						this.callService(config, this.onDateAfterPauseCalculated, this);
					}
				},

				/**
				 * @inheritdoc Terrasoft.CasePageV2#onStatusChanged
				 * @overridden
				 */
				onStatusChanged: function() {
					this.callParent(arguments);
					var status = this.get("Status");
					if (!status) {
						return;
					}
					var originalStatus = this.get("OriginalStatus");
					if (!originalStatus) {
						return;
					}
					var isActiveStatus = !status.IsFinal && !status.IsPaused && !status.IsResolved;
					var isActiveOriginalStatus = !originalStatus.IsFinal && !originalStatus.IsPaused &&
						!originalStatus.IsResolved;
					if (isActiveOriginalStatus && !isActiveStatus) {
						this.recalculateServiceTerms();
					}
				},

				/**
				 * Sets "SolutionDate" and reset "SolutionRemainsSetter".
				 * @param {Object} responseObject Service response  of "SolutionDate" calculation.
				 */
				onDateAfterPauseCalculated: function(responseObject) {
					this.set("SolutionDate", new Date(parseInt(responseObject.GetDateAfterPauseResult.substr(6), 10)));
					this.set("SolutionRemainsSetter", null);
				},

				/**
				 * Starts remains calculation.
				 * @protected
				 * @virtual
				 * @param {Boolean} isResolution Flag of "SolutionDate" calculation.
				 */
				calculateRemains: function(isResolution) {
					var sourceDateTime;
					var CaseId = this.get("Id");
					if (isResolution) {
						sourceDateTime = this.get("SolutionDateGetter");
					} else {
						sourceDateTime = this.get("ResponseDateGetter");
					}
					var config = {
						serviceName: "TermCalculationCSService",
						methodName: "GetRemainsTicks",
						data: {
							request: {
								SourceDateTime: JSON.parse(Terrasoft.encodeDate(sourceDateTime)),
								IsResolution: isResolution,
								CaseId: CaseId
							}
						}
					};
					if (isResolution) {
						this.callService(config, this.onRemainsCalculated, this);
					}
				},

				/**
				 * Sets "SolutionRemainsSetter" column value.
				 * @param {Object} responseObject Service response of calculation of "Remains".
				 */
				onRemainsCalculated: function(responseObject) {
					this.set("SolutionRemainsSetter", responseObject.GetRemainsTicksResult);
				},

				/**
				 * Returns filter for "ServiceItem" with "Status" = "Active".
				 * @protected
				 * @virtual
				 * @returns {Terrasoft.BaseFilter} "ServiceItem" column filter
				 */
				getServiceItemFilter: function() {
					var serviceItemFilter = this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Status.Active", true);
					return serviceItemFilter;
				}
			},
			rules: {
				"ServiceItem": {
					"EnableServiceItem": {
						ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						property: BusinessRuleModule.enums.Property.ENABLED,
						conditions: [{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "OriginalServiceItem"
							},
							"comparisonType": this.Terrasoft.ComparisonType.IS_NULL
						}]
					}
				}
			},
			userCode: {}
		};
	});


