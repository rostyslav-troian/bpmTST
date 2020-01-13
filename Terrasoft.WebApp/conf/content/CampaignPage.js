Terrasoft.configuration.Structures["CampaignPage"] = {innerHierarchyStack: ["CampaignPage"], structureParent: "BaseCampaignPage"};
define('CampaignPageStructure', ['CampaignPageResources'], function(resources) {return {schemaUId:'62bc347b-cf89-4121-b335-7eae870c1e05',schemaCaption: "Campaign edit page schema", parentSchemaName: "BaseCampaignPage", schemaName:'CampaignPage',parentSchemaUId:'c768f3eb-5567-4b3e-8d22-9f1955880c61',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignPage", ["CampaignPageResources", "MarketingEnums", "SegmentsStatusUtils", "MaskHelper", "CampaignEnums",
		"CampaignMessageBoxUtilities", "CampaignSchemaViewerFilters", "css!CampaignPageCSS"],
	function(resources, MarketingEnums, SegmentsStatusUtils, MaskHelper, CampaignEnums) {
		return {
			entitySchemaName: "Campaign",

			/**
			 * Has true when there is no need to change loading mask state.
			 */
			disableBodyMaskActions: false,

			messages: {
				/**
				 * @message GetSchemaViewerConfig
				 * Returns settings for the viewer module.
				 */
				"GetSchemaViewerConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message AnalyticsFiltersChange
				 * Sends config when time filters changed in CampaignSchemaViewerFilters.
				 */
				"AnalyticsFiltersChange": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message ShowBadgesChange
				 * Sends config when badges config changed in CampaignSchemaViewerFilters.
				 */
				"ShowBadgesChange": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message GetAnalyticsConfig
				 * Returns config with full analytics from CampaignSchemaViewerFilters.
				 */
				"GetAnalyticsConfig": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message AnalyticsFiltersChangeForViewer
				 * Sends analytics filters changes to the schema viewer.
				 */
				"AnalyticsFiltersChangeForViewer": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message ShowBadgesChangeForViewer
				 * Sends badges visibility changes to the schema viewer.
				 */
				"ShowBadgesChangeForViewer": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message GetAnalyticsConfigForViewer
				 * Returns analytics settings for the schema viewer.
				 */
				"GetAnalyticsConfigForViewer": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			attributes: {
				/**
				 * Caption for start process button. It changes depending on start mode.
				 */
				"CampaignStartProcessButtonCaption": {
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: this.Terrasoft.DataValueType.STRING
				},
				/**
				 * Identifier of default image for not designed diagram.
				 */
				"DefaultIconId": {
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: this.Terrasoft.DataValueType.STRING,
					value: "9F60D134-1233-4CCA-BEB6-3F2DA0135D45"
				},
				/**
				 * Pattern of url to campaign designer
				 * {0}: workspaceBaseUrl, {1}: "schemaUId", {2}: "entityId", {3}: "entitySchemaUId".
				 */
				"CampaignDesignerUrlPattern": {
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					value: "{0}/Nui/ViewModule.aspx?vm=CampaignDesigner#campaign/{1}/{2}/{3}/"
				},
				/**
				 * Defines mode for start campaign.
				 */
				"ScheduledStartMode": {
					isRequired: true
				},
				/**
				 * Defines mode for stop campaign.
				 */
				"ScheduledStopMode": {
					isRequired: true
				},
				/**
				 * Defines flag that indicates about scheduled campaign start at the specified time.
				 */
				"IsScheduledStartEnabled": {
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN
				},
				/**
				 * Defines flag that indicates about scheduled campaign stop at the specified time.
				 */
				"IsScheduledStopEnabled": {
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN
				},
				/**
				 * Defines flag that indicates enabling start campaign based on campaign status.
				 */
				"IsScheduledStartModeControlsEnabled": {
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN
				},
				/**
				 * Visibility of CmapaignStartProcessButton.
				 */
				"IsCampaignStartProcessButtonVisible": {
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN
				},
				/**
				 * Visibility of CampaignStopProcessButton.
				 */
				"IsCampaignStopProcessButtonVisible": {
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN
				},
				/**
				 * Defines flag that indicates about schema viewer module loaded.
				 */
				"IsSchemaViewerLoaded": {
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN
				},
				/**
				 * Defines flag that indicates about schema viewer filters module loaded.
				 */
				"IsAnalyticsFiltersLoaded": {
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN
				}
			},
			details: /**SCHEMA_DETAILS*/{
				CampaignParticipant: {
					schemaName: "CampaignParticipantDetail",
					filter: {
						masterColumn: "Id",
						detailColumn: "Campaign"
					}
				},
				BulkEmailInCampaignDetail: {
					schemaName: "BulkEmailInCampaignDetail",
					filter: {
						masterColumn: "Id",
						detailColumn: "Campaign"
					}
				},
				FolderInCampaignDetail: {
					schemaName: "FolderInCampaignDetail",
					filter: {
						masterColumn: "Id",
						detailColumn: "Campaign"
					}
				},
				LandingInCampaignDetail: {
					schemaName: "LandingInCampaignDetail",
					filter: {
						masterColumn: "Id",
						detailColumn: "Campaign"
					}
				},
				EventInCampaignDetail: {
					schemaName: "EventInCampaignDetail",
					filter: {
						masterColumn: "Id",
						detailColumn: "Campaign"
					}
				}
			}/**SCHEMA_DETAILS*/,
			modules: /**SCHEMA_MODULES*/ {
				"CampaignSchemaViewerFilters": {
					"config": {
						"schemaName": "CampaignSchemaViewerFilters",
						"isSchemaConfigInitialized": true,
						"useHistoryState": false,
						"parameters": {
							"viewModelConfig": {
								"CardSchemaName": {
									"propertyValue": "name"
								},
								"CampaignId": {
									"attributeValue": "Id"
								}
							}
						}
					}
				},
				"IndicatorParticipants": {
					"moduleId": "IndicatorParticipants",
					"moduleName": "CardWidgetModule",
					"config": {
						"parameters": {
							"viewModelConfig": {
								"widgetKey": "IndicatorParticipants",
								"recordId": "4a11ce70-d351-4833-825f-5261f313d4f4"
							}
						}
					}
				},
				"IndicatorReachedTheGoal": {
					"moduleId": "IndicatorReachedTheGoal",
					"moduleName": "CardWidgetModule",
					"config": {
						"parameters": {
							"viewModelConfig": {
								"widgetKey": "IndicatorReachedTheGoal",
								"recordId": "4a11ce70-d351-4833-825f-5261f313d4f4"
							}
						}
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[

				//region Left modules container

				{
					"operation": "insert",
					"name": "Name",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24,
							"rowSpan": 1
						},
						"contentType": this.Terrasoft.ContentType.LONG_TEXT
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "CampaignStatus",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24,
							"rowSpan": 1
						},
						"contentType": this.Terrasoft.ContentType.ENUM,
						"enabled": false
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "IndicatorParticipants",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"colSpan": 24,
							"rowSpan": 3,
							"column": 0,
							"row": 2,
							"layoutName": "ProfileContainer",
							"useFixedColumnHeight": true
						},
						"itemType": 4,
						"classes": {
							"wrapClassName": [
								"card-widget-grid-layout-item"
							]
						},
						"visible": "$_isWidgetIndicatorsVisible"
					},
					"index": 2
				},
				{
					"operation": "insert",
					"name": "IndicatorReachedTheGoal",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"colSpan": 24,
							"rowSpan": 3,
							"column": 0,
							"row": 5,
							"layoutName": "ProfileContainer",
							"useFixedColumnHeight": true
						},
						"itemType": 4,
						"classes": {
							"wrapClassName": [
								"card-widget-grid-layout-item"
							]
						},
						"visible": "$_isWidgetIndicatorsVisible"
					},
					"index": 3
				},
				{
					"operation": "insert",
					"parentName": "LeftModulesContainer",
					"propertyName": "items",
					"name": "StartEndModeBlock",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["island-block-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "StartEndModeContainer",
					"parentName": "StartEndModeBlock",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ScheduledStartMode",
					"parentName": "StartEndModeContainer",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.ENUM,
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24,
							"rowSpan": 1,
							"layoutName": "StartEndModeContainer"
						},
						"markerValue": {
							bindTo: "Resources.Strings.ScheduledStartModeCaption"
						},
						"enabled": {
							bindTo: "IsScheduledStartModeControlsEnabled"
						}
					}
				},
				{
					"operation": "insert",
					"name": "ScheduledStartDate",
					"parentName": "StartEndModeContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24,
							"rowSpan": 1,
							"layoutName": "StartEndModeContainer"
						},
						"enabled": {
							bindTo: "IsScheduledStartModeControlsEnabled"
						},
						"isRequired": true,
						"visible": { bindTo: "IsScheduledStartEnabled" }
					}
				},
				{
					"operation": "insert",
					"name": "ScheduledStopMode",
					"parentName": "StartEndModeContainer",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.ENUM,
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24,
							"rowSpan": 1,
							"layoutName": "StartEndModeContainer"
						},
						"markerValue": {
							bindTo: "Resources.Strings.ScheduledStopModeCaption"
						}
					}
				},
				{
					"operation": "insert",
					"name": "ScheduledStopDate",
					"parentName": "StartEndModeContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 24,
							"rowSpan": 1,
							"layoutName": "StartEndModeContainer"
						},
						"isRequired": true,
						"visible": { bindTo: "IsScheduledStopEnabled" }
					}
				},
				{
					"operation": "insert",
					"name": "PropertiesBlock",
					"parentName": "LeftModulesContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["island-block-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "PropertiesContainer",
					"parentName": "PropertiesBlock",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "StartDate",
					"parentName": "PropertiesContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"colSpan": 24,
							"rowSpan": 1,
							"column": 0,
							"row": 0,
							"layoutName": "PropertiesContainer"
						},
						"enabled": false
					}
				},
				{
					"operation": "insert",
					"name": "NextFireTime",
					"parentName": "PropertiesContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"colSpan": 24,
							"rowSpan": 1,
							"column": 0,
							"row": 1,
							"layoutName": "PropertiesContainer"
						},
						"enabled": false
					}
				},
				{
					"operation": "insert",
					"name": "EndDate",
					"parentName": "PropertiesContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"colSpan": 24,
							"rowSpan": 1,
							"column": 0,
							"row": 2,
							"layoutName": "PropertiesContainer"
						},
						"enabled": false
					}
				},
				{
					"operation": "insert",
					"name": "Owner",
					"parentName": "PropertiesContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"colSpan": 24,
							"rowSpan": 1,
							"column": 0,
							"row": 3,
							"layoutName": "PropertiesContainer"
						},
						"controlConfig": {
							"enabled": {bindTo: "IsStatusEnabled"}
						}
					}
				},
				{
					"operation": "insert",
					"name": "UtmCampaign",
					"parentName": "PropertiesContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"colSpan": 24,
							"rowSpan": 1,
							"column": 0,
							"row": 4,
							"layoutName": "PropertiesContainer"
						}
					}
				},

				//endregion

				//region Header: Left container

				{
					"operation": "insert",
					"parentName": "LeftContainer",
					"propertyName": "items",
					"name": "CampaignStartProcessButton",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"caption": { bindTo: "CampaignStartProcessButtonCaption" },
						"classes": { textClass: "actions-button-margin-right" },
						"click": { bindTo: "onLaunchCampaign" },
						"style": this.Terrasoft.controls.ButtonEnums.style.GREEN,
						"layout": {
							"column": 6,
							"row": 5,
							"colSpan": 2
						},
						"visible": { bindTo: "IsCampaignStartProcessButtonVisible" },
						"enabled": { bindTo: "getCampaignStartButtonEnabled" }
					}
				},
				{
					"operation": "insert",
					"parentName": "LeftContainer",
					"propertyName": "items",
					"name": "CampaignStopProcessButton",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"caption": { bindTo: "Resources.Strings.StopCampaignButtonCaption" },
						"classes": { textClass: "actions-button-margin-right" },
						"click": { bindTo: "onCompleteCampaign" },
						"style": this.Terrasoft.controls.ButtonEnums.style.GREEN,
						"layout": {
							"column": 6,
							"row": 5,
							"colSpan": 2
						},
						"visible": { bindTo: "IsCampaignStopProcessButtonVisible" }
					}
				},

				//endregion

				//region Tabs: Campaign Analytics

				{
					"operation": "insert",
					"name": "CampaignAnalyticsTab",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.CampaignAnalyticsTabCaption"
						},
						"items": []
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "AnalyticsHeaderContainer",
					"parentName": "CampaignAnalyticsTab",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "CampaignOpenDesignerButton",
					"parentName": "AnalyticsHeaderContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"colSpan": 2,
							"rowSpan": 1,
							"column": 22,
							"row": 0,
							"layoutName": "PropertiesContainer"
						},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": "$_getCampaignDesignerButtonStyle",
						"classes": { textClass: "open-designer-button" },
						"caption": "$_getCampaignDesignerButtonCaption",
						"click": { bindTo: "openCampaignDesigner" },
						"markerValue": "Open campaign designer"
					}
				},
				{
					"operation": "insert",
					"name": "CampaignSchemaViewerFilters",
					"parentName": "AnalyticsHeaderContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"colSpan": 22,
							"rowSpan": 1,
							"column": 0,
							"row": 0,
							"layoutName": "PropertiesContainer"
						},
						"itemType": this.Terrasoft.ViewItemType.MODULE,
						"visible": "$_isDiagramDesigned"
					}
				},
				{
					"operation": "insert",
					"name": "CampaignAnalyticsContainer",
					"parentName": "CampaignAnalyticsTab",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"afterrender": {"bindTo": "loadCampaignViewerModule"},
						"afterrerender": {"bindTo": "loadCampaignViewerModule"},
						"items": [],
						"visible": "$_isDiagramDesigned"
					}
				},
				{
					"operation": "insert",
					"name": "CampaignViewer",
					"parentName": "CampaignAnalyticsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE
					}
				},
				{
					"operation": "insert",
					"name": "NotSelectedImage",
					"parentName": "CampaignAnalyticsTab",
					"propertyName": "items",
					"values": {
						"markerValue": "NotSelectedImage",
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"onPhotoChange": Terrasoft.emptyFn,
						"getSrcMethod": "_getNotSelectedImage",
						"classes": {
							"wrapClass": ["not-selected-image"]
						},
						"visible": "$_isDiagramNotDesigned",
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "NotSelectedLabel",
					"parentName": "CampaignAnalyticsTab",
					"propertyName": "items",
					"values": {
						"markerValue": "NotSelectedLabel",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["description-container"],
						"visible": "$_isDiagramNotDesigned",
						"items": [
							{
								"itemType": Terrasoft.ViewItemType.LABEL,
								"classes": {
									"labelClass": [
										"description-label"
									],
									"wrapClass": [
										"description-wrap"
									]
								},
								"caption": { bindTo: "Resources.Strings.EmptyPageCaption" }
							}
						]
					}
				},

				//endregion

				//region Tabs: Participants

				{
					"operation": "insert",
					"name": "CampaignParticipantTab",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.CampaignParticipantTabCaption"
						},
						"items": []
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 1
				},
				{
					"operation": "insert",
					"parentName": "CampaignParticipantTab",
					"propertyName": "items",
					"name": "CampaignParticipant",
					"values": {
						itemType: this.Terrasoft.ViewItemType.DETAIL
					}
				},

				//endregion

				//region Tabs: Relationships

				{
					"operation": "insert",
					"name": "CampaignLinkedEntitiesTab",
					"values": {
						"caption": {
							bindTo: "Resources.Strings.CampaignLinkedEntitiesTabCaption"
						},
						"items": []
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 2
				},
				{
					"operation": "insert",
					"parentName": "CampaignLinkedEntitiesTab",
					"propertyName": "items",
					"name": "FolderInCampaignDetail",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "CampaignLinkedEntitiesTab",
					"propertyName": "items",
					"name": "BulkEmailInCampaignDetail",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "CampaignLinkedEntitiesTab",
					"propertyName": "items",
					"name": "LandingInCampaignDetail",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "CampaignLinkedEntitiesTab",
					"propertyName": "items",
					"name": "EventInCampaignDetail",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}

				//endregion

			]/**SCHEMA_DIFF*/,
			methods: {
				_getCampaignDesignerButtonCaption: function() {
					return !this.$CampaignSchemaUId
						? this.get("Resources.Strings.CreateCampaignFlowButtonCaption")
						: this.get("Resources.Strings.EditCampaignFlowButtonCaption");
				},

				_getCampaignDesignerButtonStyle: function() {
					return !this.$CampaignSchemaUId
						? Terrasoft.controls.ButtonEnums.style.GREEN
						: Terrasoft.controls.ButtonEnums.style.BLUE;
				},

				_isDiagramDesigned: function() {
					return !!this.$CampaignSchemaUId;
				},

				_isDiagramNotDesigned: function() {
					return !this.$CampaignSchemaUId;
				},

				_getNotSelectedImage: function() {
					return this._getSysImageUrl(this.$DefaultIconId);
				},

				_isWidgetIndicatorsVisible: function() {
					return this.isEditMode() && this.$Id === this.$PrimaryColumnValue;
				},

				_getSysImageUrl: function(sysImageId) {
					var imageConfig = {
						source: Terrasoft.ImageSources.SYS_IMAGE,
						params: {
							primaryColumnValue: sysImageId
						}
					};
					return Terrasoft.ImageUrlBuilder.getUrl(imageConfig);
				},

				/**
				 * Determines if the page in new or edit mode.
				 * @private
				 * @return {Boolean} True if edit mode; otherwise, false.
				 */
				_isNewModeInverted: function() {
					return !this.isNewMode();
				},

				/**
				 * Gets new empty object represent custom filters for campaign log section.
				 * @private
				 * @returns {Object} Returns object which contained custom filters.
				 */
				_getEmptyCampaignLogSectionCustomQuickFilter: function() {
					var storage = this.Terrasoft.configuration.Storage.Filters =
							this.Terrasoft.configuration.Storage.Filters || {};
					var campaignLogStr = this.Terrasoft.ModuleUtils.getModuleStructureByName("CampaignLog");
					var campaignLogSectionFilter = storage[campaignLogStr.sectionSchema] = {};
					var customFilters = campaignLogSectionFilter.CustomFilters = {};
					return customFilters;
				},

				/**
				 * Returns serialized filter by column 'Campaign' with current campaign value.
				 * @private
				 * @returns {String} Serialized filter.
				 */
				_getCampaignLogSectionSerializedFilter: function() {
					var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
					var campaignColumnFilter = this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Campaign", this.$PrimaryColumnValue);
					filterGroup.addItem(campaignColumnFilter);
					var serializationInfo = filterGroup.getDefSerializationInfo();
					serializationInfo.serializeFilterManagerInfo = true;
					return filterGroup.serialize(serializationInfo);
				},

				/**
				 * Creates new quick filter config for campaign log section.
				 * @private
				 * @returns {Object} Returns quick filter config.
				 */
				_createCampaignLogSectionQuickCustomFilter: function() {
					var filter = {
						"Campaign": {
							"displayValue": this.getPrimaryDisplayColumnValue(),
							"value": this.$PrimaryColumnValue,
							"primaryDisplayColumnName": this.entitySchema.primaryDisplayColumnName,
							"filter": this._getCampaignLogSectionSerializedFilter()
						}
					};
					return filter;
				},

				/**
				 * Updates quick filter in campaign log section of current campaign.
				 * @private
				*/
				_updateCampaignLogSectionQuickFilter: function() {
					var emptyCampaignLogFilter = this._getEmptyCampaignLogSectionCustomQuickFilter();
					var campaignLogFilter = this._createCampaignLogSectionQuickCustomFilter();
					Ext.apply(emptyCampaignLogFilter, campaignLogFilter);
				},

				/**
				 * Clears custom filter for campaign log section saved in profile.
				 * @private
				 * @param {Object} callback Callback function for validation chain.
				 * @param {Object} scope Callback scope.
				 */
				_clearCampaignLogSectionV2GridDataViewFilters: function(callback, scope) {
					var campaignLogStr = this.Terrasoft.ModuleUtils.getModuleStructureByName("CampaignLog");
					var profileKey = campaignLogStr.sectionSchema + "GridDataViewFilters";
					this.Terrasoft.require(["profile!" + profileKey], function(profile) {
						if (profile && !this.Ext.isEmpty(profile.CustomFilters)) {
							profile.CustomFilters = {};
							this.Terrasoft.utils.saveUserProfile(profileKey, profile, false, function() {
								callback.call(scope || this);
							}, this);
						} else {
							callback.call(scope || this);
						}
					}, this);
				},

				/**
				 * Opens campaign log section.
				 * @private
				 */
				_openCampaignLogSection: function() {
					var campaignLogStr = this.Terrasoft.ModuleUtils.getModuleStructureByName("CampaignLog");
					var token = this.Terrasoft.combinePath(campaignLogStr.sectionModule, campaignLogStr.sectionSchema);
					this.sandbox.publish("PushHistoryState", {hash: token });
				},

				/**
				* Handles "Go to campaign log" button click.
				* Sets quick filter with current campaign in 'CampaignLogSectionV2' and open section.
				* @protected
				*/
				goToCampaignLogAction: function() {
					this._updateCampaignLogSectionQuickFilter();
					this._clearCampaignLogSectionV2GridDataViewFilters(this._openCampaignLogSection, this);
				},

				/**
				 * Returns a collection of section actions in the vertical register and cards display mode.
				 * @protected
				 * @overridden
				 * @return {Terrasoft.BaseViewModelCollection} Returns a collection of section actions in the
				 * vertical register and cards display mode.
				 */
				getActions: function() {
					var actionMenuItems = this.callParent(arguments);
					actionMenuItems.addItem(this.getButtonMenuSeparator());
					actionMenuItems.addItem(this.getButtonMenuItem({
						"Tag": "goToCampaignLogAction",
						"Caption": { bindTo:
								"Resources.Strings.GoToCampaignLogButtonCaption"
						},
						"Visible": {
							"bindTo": "_isNewModeInverted"
						}
					}));
					return actionMenuItems;
				},

				/**
				 * Returns enabled flag for start mode combo box. When campaign status is planned or stopped
				 * we can change start mode.
				 * @private
				 * @param campaignStatus Campaign status identifier.
				 * @returns {Array} Returns config with IsScheduledStartModeControlsEnabled value 'true'
				 * when can edit start mode, and 'false' in otherwise.
				 */
				_getStartModeControlEnabledConfig: function(campaignStatus) {
					var config = [];
					if (campaignStatus === MarketingEnums.CampaignStatus.PLANNED ||
						campaignStatus === MarketingEnums.CampaignStatus.STOPPED) {
						config.push({
							attributeName: "IsScheduledStartModeControlsEnabled",
							value: true
						});
					} else {
						config.push({
							attributeName: "IsScheduledStartModeControlsEnabled",
							value: false
						});
					}
					return config;
				},

				/**
				 * Returns config that includes changes after campaign start mode change.
				 * @private
				 * @returns {Array} Returns array with configurated items when start mode is defines,
				 * and empty array when ScheduledStartMode is undefined.
				 */
				_getStartModeChangedConfig: function() {
					var config = [];
					var campaignStartMode = this._tryGetLookupValue("ScheduledStartMode");
					var campaignScheduledModes = CampaignEnums.CampaignScheduledMode;
					switch (campaignStartMode) {
						case campaignScheduledModes.RUN_MANUALLY:
							config.push(
								{
									attributeName: "IsScheduledStartEnabled",
									value: false
								},
								{
									attributeName: "ScheduledStartDate",
									value: null
								}
							);
							break;
						case campaignScheduledModes.AT_THE_SPECIFIED_TIME:
							config.push(
								{
									attributeName: "IsScheduledStartEnabled",
									value: true
								}
							);
							break;
						default:
							break;
					}
					return config;
				},

				/**
				 * Returns config that includes changes after campaign stop mode change.
				 * @private
				 * @returns {Array} Returns array with configurated items when stop mode is defines,
				 * and empty array when ScheduledStopMode is undefined.
				 */
				_getStopModeChangedConfig: function() {
					var config = [];
					var campaignStopMode = this._tryGetLookupValue("ScheduledStopMode");
					var campaignScheduledModes = CampaignEnums.CampaignScheduledMode;
					switch (campaignStopMode) {
						case campaignScheduledModes.RUN_MANUALLY:
							config.push(
								{
									attributeName: "IsScheduledStopEnabled",
									value: false
								},
								{
									attributeName: "ScheduledStopDate",
									value: null
								}
							);
							break;
						case campaignScheduledModes.AT_THE_SPECIFIED_TIME:
							config.push(
								{
									attributeName: "IsScheduledStopEnabled",
									value: true
								}
							);
							break;
						default:
							break;
					}
					return config;
				},

				/**
				 * Returns config that includes CampaignStartProcessButton caption.
				 * @private
				 * @returns {Array} Returns CampaignStartProcessButton caption from resources.
				 */
				_getStartProcessButtonCaptionConfig: function() {
					var config = [];
					var result = this.get("Resources.Strings.StartCampaignButtonCaption");
					var campaignStatus = this._tryGetLookupValue("CampaignStatus");
					var campaignStartMode = this._tryGetLookupValue("ScheduledStartMode");
					if (campaignStartMode === CampaignEnums.CampaignScheduledMode.AT_THE_SPECIFIED_TIME &&
						(campaignStatus === MarketingEnums.CampaignStatus.PLANNED ||
							campaignStatus === MarketingEnums.CampaignStatus.STOPPED)) {
						result = this.get("Resources.Strings.ScheduledStartCampaignButtonCaption");
					}
					config.push({
						attributeName: "CampaignStartProcessButtonCaption",
						value: result
					});
					return config;
				},

				/**
				 * Returns visibility for start and stop buttons based on campaign status.
				 * @private
				 * @param {Guid} campaignStatus Campaign status identifier.
				 * @returns {Array} Returns process buttons visibility config.
				 */
				_getProcessButtonsVisibilityConfig: function(campaignStatus) {
					var campaignStatuses = MarketingEnums.CampaignStatus;
					switch (campaignStatus) {
						case campaignStatuses.PLANNED:
						case campaignStatuses.STOPPED:
							return this._createProcessButtonsVisibilityConfig(true, false);
						case campaignStatuses.SCHEDULED:
						case campaignStatuses.STARTED:
							return this._createProcessButtonsVisibilityConfig(false, true);
						case campaignStatuses.STOPPING:
							return this._createProcessButtonsVisibilityConfig(false, false);
						default:
							return [];
					}
				},

				/**
				 * Returns visibility config for start and stop buttons.
				 * @private
				 * @param {Boolean} isStartButtonVisible Start process button visibility.
				 * @param {Boolean} isStopButtonVisible Stop process button visibility.
				 * @returns {Array} Returns process buttons visibility config.
				 */
				_createProcessButtonsVisibilityConfig: function(isStartButtonVisible, isStopButtonVisible) {
					return [{
						attributeName: "IsCampaignStartProcessButtonVisible",
						value: isStartButtonVisible
					}, {
						attributeName: "IsCampaignStopProcessButtonVisible",
						value: isStopButtonVisible
					}];
				},

				/**
				 * Validates scheduled start date when start mode is specified time.
				 * Sets error message when ScheduledStartMode is AT_THE_SPECIFIED_TIME
				 * and ScheduledStartDate is empty.
				 * @private
				 * @param {Object} callback Callback function for validation chain.
				 * @param {Object} scope Callback scope.
				 */
				_validateScheduledStartDate: function(callback, scope) {
					var result = {
						success: true
					};
					var startMode = this.get("ScheduledStartMode");
					var scheduledStartDate = this.get("ScheduledStartDate");
					if (startMode.value === CampaignEnums.CampaignScheduledMode.AT_THE_SPECIFIED_TIME) {
						if (this.Ext.isEmpty(scheduledStartDate)) {
							result.message = this.get("Resources.Strings.ScheduledStartDateValidationMessage");
							result.success = false;
						} else if (scheduledStartDate.getTime() < new Date().getTime()) {
							result.message = this.get("Resources.Strings.ScheduledStartLessNowValidationMessage");
							result.success = false;
						} else {
							result.success = true;
						}
					}
					callback.call(scope || this, result);
				},

				/**
				 * Validates scheduled stop date when stop mode is specified time.
				 * Sets error message when:
				 * 1. ScheduledStopMode is AT_THE_SPECIFIED_TIME and ScheduledStopDate is empty.
				 * 2. ScheduledStartDate is greater than ScheduledStopDate.
				 * @private
				 * @param {Object} callback Callback function for validation chain.
				 * @param {Object} scope Callback scope.
				 */
				_validateScheduledStopDateRelativelyStart: function(callback, scope) {
					var result = {
						success: true
					};
					var stopMode = this.get("ScheduledStopMode");
					var scheduledStartDate = this.get("ScheduledStartDate");
					var scheduledStopDate = this.get("ScheduledStopDate");
					if (stopMode.value === CampaignEnums.CampaignScheduledMode.AT_THE_SPECIFIED_TIME) {
						if (this.Ext.isEmpty(scheduledStopDate)) {
							result.message = this.get("Resources.Strings.ScheduledStopDateValidationMessage");
							result.success = false;
						}
						if (!this.Ext.isEmpty(scheduledStopDate) && (scheduledStopDate <= scheduledStartDate)) {
							result.message = this.get("Resources.Strings.ScheduledStopLessStartValidationMessage");
							result.success = false;
						}
					}
					callback.call(scope || this, result);
				},

				/**
				 * Validates scheduled stop date when stop mode is specified time relatively campaign next frie time.
				 * Sets error message when:
				 * 1. ScheduledStopDate in Active campaign is less then next fire time.
				 * @private
				 * @param {Object} callback Callback function for validation chain.
				 * @param {Object} scope Callback scope.
				 */
				_validateScheduledStopDateRelativelyNextFireTime: function(callback, scope) {
					var result = {
						success: true
					};
					if (!this._needCheckScheduledStopRelativelyNextFireTime()) {
						callback.call(scope || this, result);
						return;
					}
					this._getCampaignNextFireTime("GetCampaignNextFireTime", function(response) {
						var nextFireTime = new Date(response.GetCampaignNextFireTimeResult.nextFireTime);
						var scheduledStopDate = this.get("ScheduledStopDate");
						if (nextFireTime > scheduledStopDate) {
							result.success = false;
							result.message = this.get("Resources.Strings.ScheduledStopLessNextFireTimeValidationMessage");
						}
						callback.call(scope || this, result);
					});
				},

				/**
				 * Checks necessity make validation for ScheduledStopDate and campaign next fire time.
				 * @returns {Boolean} Returns true when we should validate ScheduledStopDate
				 * and false in otherwise.
				 */
				_needCheckScheduledStopRelativelyNextFireTime: function() {
					var campaignStatus = this._tryGetLookupValue("CampaignStatus");
					var scheduledStopMode = this._tryGetLookupValue("ScheduledStopMode");
					var campaignSchemaUId = this.get("CampaignSchemaUId");
					if (scheduledStopMode === CampaignEnums.CampaignScheduledMode.AT_THE_SPECIFIED_TIME &&
							campaignStatus === MarketingEnums.CampaignStatus.STARTED &&
							!Ext.isEmpty(campaignSchemaUId)) {
						return true;
					}
					return false;
				},

				/**
				 * Calls service which calculates campaign next fire time starting from now.
				 * @param {String} serviceMethodName Name of the service.
				 * @param {Object} callback Callback function for processing response from.
				 */
				_getCampaignNextFireTime: function(serviceMethodName, callback) {
					var dataSend = {
						campaignId: this.get("Id"),
						includeTimezoneOffset: true
					};
					var config = {
						serviceName: "CampaignService",
						methodName: serviceMethodName,
						data: dataSend
					};
					this.callService(config, callback);
				},

				/**
				 * Applies config to page attributes.
				 * @param {Array} config Array of the configuration items.
				 * Item must includes fields:
				 * - attributeName - contains attribute name of the page
				 * - value - value of the attribute that defines in attributeName
				 * @private
				 */
				_applyAttributesValueConfig: function(config) {
					this.Terrasoft.each(config, function(item) {
						this.set(item.attributeName, item.value);
					}, this);
				},

				/**
				 * Returns value of lookup attribute.
				 * @private
				 * @param attributeName Name of the attribute.
				 * @returns {Object} Returns value of the attribute when it is defined,
				 * and null when attribut is undefined.
				 */
				_tryGetLookupValue: function(attributeName) {
					var attributeObject = this.get(attributeName);
					var attributeValue = !this.Ext.isEmpty(attributeObject) ? attributeObject.value : null;
					return attributeValue;
				},

				/**
				 * Subscribes handlers
				 * @private
				 */
				_subscribeHandlers: function() {
					var sandbox = this.sandbox;
					var schemaViewerFiltersModuleId = this._getSchemaViewerFiltersModuleId();
					sandbox.subscribe("AnalyticsFiltersChange",
						this.onAnalyticsFiltersChange, this, [schemaViewerFiltersModuleId]);
					sandbox.subscribe("ShowBadgesChange",
						this.onShowBadgesChange, this, [schemaViewerFiltersModuleId]);
					this.on("change:ScheduledStartMode", this.onCampaignStartModeChanged, this);
					this.on("change:ScheduledStopMode", this.onCampaignStopModeChanged, this);
				},

				/**
				 * Loads campaign schema viewer.
				 * @private
				 */
				_loadCampaignSchemaViewerModule: function() {
					this.sandbox.loadModule("CampaignSchemaViewerModule", {
						renderTo: "CampaignViewer",
						id: this._getCampaignViewerModuleId()
					});
				},

				/**
				 * Updates campaign schema.
				 * @private
				 */
				_updateCampaignSchema: function() {
					if (!this.$CampaignSchemaUId) {
						this.refreshColumns(["CampaignSchemaUId"], this.Terrasoft.emptyFn, this, {silent: false});
					} else if (this.$ActiveTabName === "CampaignAnalyticsTab" && this.$IsSchemaViewerLoaded) {
						this._loadCampaignSchemaViewerModule();
					} else {
						return;
					}
				},

				/**
				 * @private
				 */
				_saveCampaignCard: function(next) {
					var config = {
						isSilent: true,
						callback: next
					};
					this.disableBodyMaskActions = true;
					this.save(config, false);
				},
				/**
				 * @private
				 */
				_reloadCampaignCard: function(next) {
					var fields = ["CampaignStatus", "StartDate", "EndDate", "PrevExecutedOn", "NextFireTime"];
					this.reloadFields(fields, function() {
						this.disableBodyMaskActions = false;
						this.hideBodyMask();
						next();
					}, this);
				},

				/**
				 * Handles the message from server communications channel.
				 * @protected
				 * @param {Terrasoft.ServerChannel} channel BPMonline server communication channel.
				 * @param {Object} message Message object.
				 */
				onChannelMessage: function(channel, message) {
					if (!this.Ext.isObject(message)) {
						return;
					}
					var header = message.Header;
					var schemaName = this.getEntitySchemaName();
					if (header.Sender !== schemaName) {
						return;
					}
					var messageObject = this.Terrasoft.decode(message.Body || "{}");
					var primaryColumnValue = this.getPrimaryColumnValue();
					if (messageObject.campaignId !== primaryColumnValue) {
						return;
					}
					if (messageObject.operation === CampaignEnums.CampaignPageOperations.UPDATE_SCHEMA) {
						this._updateCampaignSchema();
					}
				},

				/**
				 * Returns identifier of the CampaignViewerModule module.
				 * @private
				 * @returns {String}
				 */
				_getCampaignViewerModuleId: function() {
					return this.sandbox.id + "_CampaignViewerModule";
				},

				/**
				 * Returns identifier of the CampaignSchemaViewerFilters module.
				 * @private
				 * @returns {String} Module identifier.
				 */
				_getSchemaViewerFiltersModuleId: function() {
					return this.getModuleId("CampaignSchemaViewerFilters");
				},

				/**
				 * @inheritdoc BasePageV2#onEntityInitialized
				 * @override
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					this.onCampaignStartModeChanged();
					this.onCampaignStopModeChanged();
					this._subscribeHandlers();
					this.Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, this.onChannelMessage, this);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#destroy
				 * @override
				 */
				destroy: function() {
					this.callParent(arguments);
					this.Terrasoft.ServerChannel.un(Terrasoft.EventName.ON_MESSAGE, this.onChannelMessage, this);
				},

				/**
				 * @inheritdoc BaseCampaignPage#activeTabChange
				 * @override
				 */
				activeTabChange: function(activeTab) {
					if (activeTab.get("Name") !== "CampaignAnalyticsTab") {
						this.$IsAnalyticsFiltersLoaded = false;
						this.$IsSchemaViewerLoaded = false;
					}
					this.callParent(arguments);
				},

				/**
				 * Open designer page.
				 * @private
				 */
				openCampaignDesigner: function() {
					if (this.isNewMode()) {
						var config = {
							callback: this.refreshColumns.bind(
								this, ["CampaignSchemaUId"], this.openCampaignDesignerModule, null, null),
							isSilent: true,
							callBaseSilentSavedActions: true
						};
						this.save(config, false);
					} else {
						this.refreshColumns(["CampaignSchemaUId"], this.openCampaignDesignerModule);
					}
				},

				/**
				 * Loads the diagram module.
				 * @protected
				 */
				loadCampaignViewerModule: function() {
					if (this.$ActiveTabName !== "CampaignAnalyticsTab") {
						return;
					}
					var sandbox = this.sandbox;
					var moduleId = this._getCampaignViewerModuleId();
					sandbox.subscribe("GetSchemaViewerConfig",
						this.onGetSchemaViewerConfig, this, [moduleId]);
					sandbox.subscribe("GetAnalyticsConfigForViewer",
						this.onGetAnalyticsConfig, this, [moduleId]);
					this._loadCampaignSchemaViewerModule();
				},

				/**
				 * Returns CampaignViewerModuleConfig to load diagram.
				 * @protected
				 * @return {Object} Campaign viewer module config.
				 */
				onGetSchemaViewerConfig: function() {
					return {
						schemaUId: this.$CampaignSchemaUId,
						entityId: this.$Id,
						entitySchemaUId: this.entitySchema.uId
					};
				},

				/**
				 * Handles filter's changes message from CampaignSchemaViewerFilters
				 * and publishes to CampaignSchemaViewer.
				 * @protected
				 * @param {Object} filtersConfig New filter's config.
				 */
				onAnalyticsFiltersChange: function(filtersConfig) {
					this.$IsAnalyticsFiltersLoaded = true;
					if (this.$IsSchemaViewerLoaded) {
						var schemaViewerModuleId = this._getCampaignViewerModuleId();
						this.sandbox.publish("AnalyticsFiltersChangeForViewer", filtersConfig, [schemaViewerModuleId]);
					}
				},

				/**
				 * Handles badges changes message from CampaignSchemaViewerFilters
				 * and publishes to CampaignSchemaViewer.
				 * @protected
				 * @param {Object} badgesConfig New badge's config object.
				 */
				onShowBadgesChange: function(badgesConfig) {
					this.$IsAnalyticsFiltersLoaded = true;
					if (this.$IsSchemaViewerLoaded) {
						var schemaViewerModuleId = this._getCampaignViewerModuleId();
						this.sandbox.publish("ShowBadgesChangeForViewer", badgesConfig, [schemaViewerModuleId]);
					}
				},

				/**
				 * Returns analytics filters config to loaded diagram.
				 * @protected
				 * @return {Object} Campaign analytics filters config.
				 */
				onGetAnalyticsConfig: function() {
					this.$IsSchemaViewerLoaded = true;
					var filtersModuleId = this._getSchemaViewerFiltersModuleId();
					return this.$IsAnalyticsFiltersLoaded
						? this.sandbox.publish("GetAnalyticsConfig", null, [filtersModuleId])
						: null;
				},

				/**
				 * Load designer module.
				 * @private
				 */
				openCampaignDesignerModule: function() {
					var schemaUId = this.get("CampaignSchemaUId") || "add";
					var url = Ext.String.format(this.get("CampaignDesignerUrlPattern"),
							Terrasoft.workspaceBaseUrl, schemaUId, this.get("Id"), this.entitySchema.uId);
					window.open(url);
				},

				/**
				 * @inheritdoc BaseEntityPageV2#asyncValidate
				 * @overriden
				 */
				asyncValidate: function(callback, scope) {
					this.callParent([
						function(response) {
							if (!this.validateResponse(response)) {
								return;
							}
							this.Terrasoft.chain(
								function(next) {
									this._validateScheduledStartDate(function(validationResult) {
										if (this.validateResponse(validationResult)) {
											next();
										}
									}, this);
								},
								function(next) {
									this._validateScheduledStopDateRelativelyStart(function(validationResult) {
										if (this.validateResponse(validationResult)) {
											next();
										}
									}, this);
								},
								function(next) {
									this._validateScheduledStopDateRelativelyNextFireTime(function(validationResult) {
										if (this.validateResponse(validationResult)) {
											next();
										}
									}, this);
								},
								function(next) {
									callback.call(scope, response);
									next();
								}, this);
						}, this
					]);
				},

				/**
				 * When response is not success then sets disableBodyMaskActions to false.
				 * Calls parent in all cases.
				 * @inheritdoc Terrasoft.EntityResponseValidationMixin#validateResponse.
				 * @protected
				 * @param {Object} response Response object for validation.
				 * @overriden
				 */
				validateResponse: function(response) {
					if (response.success === false) {
						this.disableBodyMaskActions = false;
					}
					return this.callParent(arguments);
				},

				/**
				 * Initializes subscription on card properties.
				 * @protected
				 * @overridden
				 */
				initCardActionHandler: function() {
					this.callParent(arguments);
					this.on("change:CampaignProcessButtonCaption", function(model, value) {
						this.sandbox.publish("CardChanged", {
							key: "CampaignProcessButtonCaption",
							value: value
						}, [this.sandbox.id]);
					}, this);
				},

				/**
				 * Handles changes of ScheduledStartMode attribute.
				 * @protected
				 */
				onCampaignStartModeChanged: function() {
					var captionConfig = this._getStartProcessButtonCaptionConfig();
					this._applyAttributesValueConfig(captionConfig);
					var changedModeConfig = this._getStartModeChangedConfig();
					this._applyAttributesValueConfig(changedModeConfig);
				},

				/**
				 * Handles changes of ScheduledStopMode attribute.
				 * @protected
				 */
				onCampaignStopModeChanged: function() {
					var changedModeConfig = this._getStopModeChangedConfig();
					this._applyAttributesValueConfig(changedModeConfig);
				},

				/**
				 * @inheritdoc BaseCampaignPage#onCampaignStatusChanged
				 * @overriden
				 */
				onCampaignStatusChanged: function() {
					this.callParent(arguments);
					var captionConfig = this._getStartProcessButtonCaptionConfig();
					this._applyAttributesValueConfig(captionConfig);
					var campaignStatus = this._tryGetLookupValue("CampaignStatus");
					var processButtonsVisibilityConfig = this._getProcessButtonsVisibilityConfig(campaignStatus);
					this._applyAttributesValueConfig(processButtonsVisibilityConfig);
					var startModeControlEnabledConfig = this._getStartModeControlEnabledConfig(campaignStatus);
					this._applyAttributesValueConfig(startModeControlEnabledConfig);
				},

				/**
				 * Calls campaign service to launch/stop campaign.
				 * @protected
				 * @param {String} serviceMethodName Campaign service method name.
				 * @param {Function} callback Callback function.
				 * @param {Boolean} ignoreWarnings Flag that indicates ignore warnings or not on campaign service action.
				 */
				processCampaign: function(serviceMethodName, callback, ignoreWarnings) {
					var dataSend = {
						campaignId: this.get("Id"),
						ignoreWarnings: ignoreWarnings
					};
					var config = {
						serviceName: "CampaignService/v2",
						methodName: serviceMethodName,
						data: dataSend
					};
					this.callService(config, callback);
				},

				/**
				 * Launch campaign click handler.
				 * @protected
				 */
				onLaunchCampaign: function() {
					var config = {
						style: Terrasoft.MessageBoxStyles.BLUE
					};
					var launchFn = function(next) {
						this.launchCampaign(false, next);
					};
					var confirmationCallbackFn = function(returnCode) {
						if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
							Terrasoft.chain(this._saveCampaignCard, launchFn, this._reloadCampaignCard, this);
						}
					};
					var message = this._getLaunchCampaignConfirmationMessage();
					this.showConfirmationDialog(message, confirmationCallbackFn, ["yes", "cancel"], config);
				},

				/**
				 * Returns confirmation message to resolve or reject launch campaign user action.
				 * @private
				 * @return {String} Confirmation message for user.
				 */
				_getLaunchCampaignConfirmationMessage: function() {
					var scheduledStartMode = this._tryGetLookupValue("ScheduledStartMode");
					if (scheduledStartMode === CampaignEnums.CampaignScheduledMode.AT_THE_SPECIFIED_TIME) {
						return resources.localizableStrings.CampaignScheduleConfirmationMessage;
					}
					return resources.localizableStrings.CampaignStartConfirmationMessage;
				},

				/**
				 * Validates scheduled stop date on campaign start.
				 * @private
				 * @param {Array} Array of validation messages.
				 */
				_validateScheduledStopDateOnStart: function(masseges) {
					var scheduledStopMode = this._tryGetLookupValue("ScheduledStopMode");
					var dateNow = new Date();
					if (scheduledStopMode === CampaignEnums.CampaignScheduledMode.AT_THE_SPECIFIED_TIME &&
							this.$ScheduledStopDate <= dateNow) {
						masseges.push(this.get("Resources.Strings.ScheduledStopDateLessThenNowErrorMessage"));
					}
				},

				/**
				 * Validates campaign before start.
				 * @protected
				 * @return {Object} Validation result.
				 */
				validateCampaignOnStart: function() {
					var result = {
						errorInfo: {}
					};
					var masseges = [];
					this._validateScheduledStopDateOnStart(masseges);
					result.errorInfo.message = masseges.filter(Boolean).join("\r\n");
					result.success = !masseges.length;
					return result;
				},

				/**
				 * Launches campaign with handling validation response.
				 * @protected
				 * @param {Boolean} ignoreWarnings Flag that indicates ignore warnings or not.
				 * @param {Function} next The next function in chain to be called.
				 */
				launchCampaign: function(ignoreWarnings, next) {
					var validationResult = this.validateCampaignOnStart();
					if (!validationResult.success) {
						this.showValidationResultDialog(validationResult, next);
						return;
					}
					this.processCampaign("LaunchCampaign", function(response) {
						validationResult = response.LaunchCampaignV2Result || {};
						if (validationResult.success) {
							next();
						} else {
							this.showValidationResultDialog(validationResult, next);
						}
					}, ignoreWarnings);
				},

				/**
				 * Displays dialog with warnings or errors info.
				 * @protected
				 * @param {object} validationResult Campaign action response's validation result.
				 * @param {Function} next The next function in chain to be called.
				 */
				showValidationResultDialog: function(validationResult, next) {
					this.disableBodyMaskActions = false;
					this.hideBodyMask();
					var messageBoxConfig = this.getValidationMessageBoxConfig(validationResult, next);
					Terrasoft.CampaignMessageBoxUtilities.showMessageBox(messageBoxConfig);
				},

				/**
				 * Returns configuration object for message box to show.
				 * @protected
				 * @param {object} errorInfo Object that contains information about detected errors.
				 * @param {Function} next The next function in chain to be called.
				 * @returns {object} Configuration for message box to show.
				 */
				getValidationMessageBoxConfig: function(validationResult, next) {
					var hasErrors = validationResult.errorInfo && !Ext.isEmpty(validationResult.errorInfo.message);
					var callback = function() {
						var maskConfig = {
							timeout: 0
						};
						MaskHelper.ShowBodyMask(maskConfig);
						this.disableBodyMaskActions = true;
						this.launchCampaign(true, next);
					};
					return {
						buttons: this.getValidationMessageBoxButtons(hasErrors),
						caption: this.getValidationMessageBoxCaption(hasErrors),
						message: this.getStartValidationMessage(validationResult),
						handler: function(returnCode) {
							if (returnCode === "continue") {
								callback.call(this);
							}
						},
						scope: this
					};
				},

				/**
				 * Returns caption for validation message box.
				 * @protected
				 * @param {Boolean} hasErrors Validation response contains errors or not.
				 * @returns {String} Caption of validation message box.
				 */
				getValidationMessageBoxCaption: function(hasErrors) {
					return hasErrors ?
						this.get("Resources.Strings.CampaignErrorMessageboxCaption") :
						this.get("Resources.Strings.CampaignWarningMessageboxCaption");
				},

				/**
				 * Returns collection of buttons to be displayed on messagebox.
				 * By default array contains only cancel button.
				 * @protected
				 * @param {Boolean} hasErrors Validation response contains errors or not.
				 * @returns {Array} Buttons for messagebox.
				 */
				getValidationMessageBoxButtons: function(hasErrors) {
					var buttons = [Terrasoft.MessageBoxButtons.CANCEL];
					if (!hasErrors) {
						var returnCode = Terrasoft.CampaignMessageBoxUtilities.buttonReturnCodes.CONTINUE;
						var btnConfig = {
							returnCode: returnCode,
							caption: this.get("Resources.Strings.StartCampaignButtonCaption"),
							style: Terrasoft.controls.ButtonEnums.style.GREEN
						};
						var continueBtn = Terrasoft.CampaignMessageBoxUtilities.getButton(btnConfig);
						buttons.unshift(continueBtn);
					}
					return buttons;
				},

				/**
				 * Returns text of message to be displayed in messagebox error description section.
				 * @protected
				 * @param {object} validationResult Campaign action response's validation result.
				 * @returns {String} Validation message.
				 */
				getStartValidationMessage: function(validationResult) {
					var message = "";
					var warningTitle = resources.localizableStrings.CampaignWarningMessageTitleCaption;
					var errorTitle = resources.localizableStrings.CampaignErrorMessageTitleCaption;
					var hasErrors = validationResult.errorInfo && !Ext.isEmpty(validationResult.errorInfo.message);
					var hasWarnings = validationResult.warningInfo && !Ext.isEmpty(validationResult.warningInfo.message);
					if (hasErrors) {
						message += hasErrors && hasWarnings ? errorTitle + "\r\n" : "";
						message += validationResult.errorInfo.message + "\r\n\n";
					}
					if (hasWarnings) {
						message += hasErrors && hasWarnings ? warningTitle + "\r\n" : "";
						message += validationResult.warningInfo.message;
					}
					return this._clearLineBreak(message);
				},

				/**
				 * Removes line break at the end of validation message.
				 * @private
				 * @param {String} validationMessage Validation message to process.
				 * @returns {String} Correct validation message.
				 */
				_clearLineBreak: function(validationMessage) {
					var regexp = /(\r\n\n)$/;
					var matchResult = validationMessage.match(regexp);
					if (matchResult) {
						return validationMessage.substring(0, matchResult.index);
					}
					return validationMessage;
				},

				/**
				 * Complete campaign click handler.
				 * @protected
				 */
				onCompleteCampaign: function() {
					var config = {
						style: Terrasoft.MessageBoxStyles.BLUE
					};
					var completeFn = function(next) {
						this.processCampaign("CompleteCampaign", function(response) {
							if (response) {
								next();
							}
						});
					};
					var confirmationCallbackFn = function(returnCode) {
						if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
							Terrasoft.chain(completeFn, this._reloadCampaignCard, this);
						}
					};
					var message = resources.localizableStrings.CampaignCompleteConfirmationMessage;
					this.showConfirmationDialog(message, confirmationCallbackFn, ["yes", "cancel"], config);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#hideBodyMask
				 * @overridden
				 */
				hideBodyMask: function() {
					if (typeof this.disableBodyMaskActions === "undefined" || !this.disableBodyMaskActions) {
						MaskHelper.HideBodyMask();
					}
				},

				/**
				 * Gets enabling state of campaign start process button by not empty campaign name.
				 * @protected
				 * @returns {boolean} Returns 'true' when attribute Name is not empty and 'false' in otherwise.
				 */
				getCampaignStartButtonEnabled: function() {
					var campaignName = this.get("Name");
					var regexp = /\S/;
					return campaignName && regexp.test(campaignName) && !!this.$CampaignSchemaUId;
				}
			}
		};
	});


