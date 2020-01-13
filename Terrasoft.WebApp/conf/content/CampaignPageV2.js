Terrasoft.configuration.Structures["CampaignPageV2"] = {innerHierarchyStack: ["CampaignPageV2"], structureParent: "BaseCampaignPage"};
define('CampaignPageV2Structure', ['CampaignPageV2Resources'], function(resources) {return {schemaUId:'56f217a1-0ce9-4149-92ad-1175fd41e3d8',schemaCaption: "\"Campaigns\" section edit page schema", parentSchemaName: "BaseCampaignPage", schemaName:'CampaignPageV2',parentSchemaUId:'c768f3eb-5567-4b3e-8d22-9f1955880c61',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignPageV2", ["CampaignPageV2Resources", "CampaignDiagramPropertyEnums", "CampaignLocalizableHelper",
			"GeneralDetails", "ProcessModuleUtilities", "ProcessLibraryConstants", "ServiceHelper", "CampaignEnums",
			"MarketingEnums", "SegmentsStatusUtils", "MarketingCommonUtilities", "CampaignAnalytics",
			"css!CampaignDetailV2CSS", "CampaignDraggableContainer", "CampaignDroppableContainer",
			"css!CampaignPageV2CSS", "CampaignDiagramValidator", "TagUtilitiesV2", "ConfigurationDiagramGenerator",
			"CampaignDiagram"],
		/*jshint maxparams: 11 */
		function(resources, PropertyEnums, CampaignLocalizableHelper, GeneralDetails, ProcessModuleUtilities,
				ProcessLibraryConstants, ServiceHelper, CampaignEnums, MarketingEnums, SegmentsStatusUtils,
				MarketingCommonUtilities) {
			return {
				entitySchemaName: "Campaign",
				mixins: {
					Analytics: "Terrasoft.CampaignAnalytics",
					TagUtilities: "Terrasoft.TagUtilities"
				},
				messages: {
					/**
					 * @message RerenderCampaignDiagramModule
					 * It signals the need to generate chart elements..
					 */
					"RerenderCampaignDiagramModule": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message GetDiagramState
					 * Gets the current state of the chart.
					 */
					"GetDiagramState": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message GetIndicatorConfig
					 * Transmits the configuration of the current indicator to the indicator module.
					 */
					"GetIndicatorConfig": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message GenerateIndicator
					 * Initiate the generation and display of the metric by the indicator module.
					 */
					"GenerateIndicator": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message DiagramElementChanged
					 * Indicates that the active item on the chart has changed.
					 */
					"DiagramElementChanged": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message CampaignStatusChanged
					 * Indicates a change in the status of the Campaign.
					 */
					"CampaignStatusChanged": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message CreateDiagramElement
					 * Passes the config of the element that you want to create on the diagram.
					 */
					"CreateDiagramElement": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message FindConnectorTargetNode
					 * Searches the end node of the connector on the diagram.
					 */
					"FindConnectorTargetNode": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message GetCampaignStatus
					 * Transmits the status of the campaign.
					 */
					"GetCampaignStatus": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message ToolIconDropped
					 * From the toolbar moved an element.
					 */
					"ToolIconDropped": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message AudienceEditabileStatusChange
					 * Indicates an attribute change IsAudienceEditabile.
					 */
					"AudienceEditabileStatusChange": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message GetAudienceEditabileStatus
					 * Pass the attribute IsAudienceEditabile.
					 */
					"GetAudienceEditabileStatus": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message TagChanged
					 * Updates the number of tags in the button.
					 */
					"TagChanged": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message UpdateDiagramElement
					 * Updates an item in a campaign diagram.
					 */
					"UpdateDiagramElement": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message GetDiagramItems
					 * Returns diagram items.
					 */
					"GetDiagramItems": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				},
				details: /**SCHEMA_DETAILS*/{
					CampaignTarget: {
						schemaName: "CampaignTargetDetailV2",
						entitySchemaName: "CampaignTarget",
						filter: {
							masterColumn: "Id",
							detailColumn: "Campaign"
						},
						subscriber: function() {
							this.refreshIndicators();
						}
					}
				}/**SCHEMA_DETAILS*/,
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"parentName": "LeftContainer",
						"propertyName": "items",
						"name": "CampaignProcessButton",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"caption": {bindTo: "changeCampaignProcessButtonCaption"},
							"classes": {textClass: "actions-button-margin-right"},
							"click": {bindTo: "campaignProcessHandler"},
							"style": Terrasoft.controls.ButtonEnums.style.GREEN,
							"layout": {"column": 6, "row": 5, "colSpan": 2},
							"visible": {
								"bindTo": "IsStatusFinal",
								"bindConfig": {
									"converter": "invertBooleanValue"
								}
							}
						}
					},

					//region Header

					{
						"operation": "insert",
						"name": "Name",
						"values": {
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 24,
								"rowSpan": 1
							},
							"labelConfig": {
								"visible": false
							},
							"controlConfig": {
								"classes": ["campaign-name-enlarged"]
							}
						},
						"parentName": "Header",
						"propertyName": "items",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "CampaignStatus",
						"values": {
							"layout": {
								"column": 0,
								"row": 1,
								"colSpan": 24,
								"rowSpan": 1
							},
							"contentType": Terrasoft.ContentType.ENUM,
							"labelConfig": {
								"labelClass": ["campaign-target-left"]
							},
							"wrapClass": ["campaign-status-left"],
							"enabled": false
						},
						"parentName": "Header",
						"propertyName": "items",
						"index": 1
					},
					{
						"operation": "insert",
						"name": "TargetDescriptionContainer",
						"parentName": "Header",
						"propertyName": "items",
						"values": {
							"layout": {
								"column": 0,
								"row": 2,
								"colSpan": 24
							},
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							classes: {
							},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "TargetPercentCaption",
						"values": {
							"itemType": Terrasoft.ViewItemType.LABEL,
							"caption": {"bindTo": "Resources.Strings.TargetPercentCaption"},
							"classes": {
								"labelClass": ["campaign-target-left"]
							}
						},
						"parentName": "TargetDescriptionContainer",
						"propertyName": "items",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "TargetPercent",
						"values": {
							"bindTo": "TargetPercent",
							"labelConfig": {
								"visible": false
							},
							"controlConfig": {
								"enabled": {bindTo: "IsStatusEnabled"}
							}
						},
						"parentName": "TargetDescriptionContainer",
						"propertyName": "items",
						"index": 1
					},
					{
						"operation": "insert",
						"name": "TargetDescriptionCaption",
						"values": {
							"itemType": Terrasoft.ViewItemType.LABEL,
							"caption": {"bindTo": "Resources.Strings.TargetDescriptionCaption"},
							"classes": {
								"labelClass": ["campaign-target-center"]
							}
						},
						"parentName": "TargetDescriptionContainer",
						"propertyName": "items",
						"index": 2
					},
					{
						"operation": "insert",
						"name": "TargetDescription",
						"values": {
							"bindTo": "TargetDescription",
							"labelConfig": {
								"visible": false
							},
							"controlConfig": {
								"enabled": {bindTo: "IsStatusEnabled"}
							}
						},
						"parentName": "TargetDescriptionContainer",
						"propertyName": "items",
						"index": 3
					},
					{
						"operation": "insert",
						"name": "AnalyticsDiagramContainer",
						"parentName": "Header",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"id": "AnalyticsDiagramContainer",
							"selectors": {
								"el": "#AnalyticsDiagramContainer",
								"wrapEl": "#AnalyticsDiagramContainer"
							},
							layout: {
								"column": 12,
								"row": 0,
								"colSpan": 12,
								"rowSpan": 3
							},
							"items": [],
							"afterrender": {"bindTo": "loadIndicatorsContent"},
							"afterrerender": {"bindTo": "loadIndicatorsContent"}

						}
					},
					{
						"operation": "insert",
						"parentName": "AnalyticsDiagramContainer",
						"propertyName": "items",
						"name": "CampaignIndicatorTargetTotal",
						"values": {
							"markerValue": "TargetTotal",
							"itemType": Terrasoft.ViewItemType.MODULE,
							"classes": {
								"wrapClassName": ["campaign-indicator-container"]
							}
						},
						"index": 0
					},
					{
						"operation": "insert",
						"parentName": "AnalyticsDiagramContainer",
						"propertyName": "items",
						"name": "CampaignIndicatorTargetAchieve",
						"values": {
							"markerValue": "TargetAchive",
							"itemType": Terrasoft.ViewItemType.MODULE,
							"classes": {
								"wrapClassName": ["campaign-indicator-container"]
							}
						},
						"index": 1
					},
					{
						"operation": "insert",
						"parentName": "AnalyticsDiagramContainer",
						"propertyName": "items",
						"name": "CampaignIndicatorTargetRemain",
						"values": {
							"markerValue": "TargetRemain",
							"itemType": Terrasoft.ViewItemType.MODULE,
							"classes": {
								"wrapClassName": ["campaign-indicator-container"]
							}
						},
						"index": 2
					},

					//endregion

					{
						"operation": "merge",
						"name": "TabsContainer",
						"values": {
							"className": "Terrasoft.Container"
						}
					},
					{
						"operation": "insert",
						"name": "CampaignSchemaTab",
						"values": {
							"caption": {
								"bindTo": "Resources.Strings.CampaignSchemaTabCaption"
							},
							"items": []
						},
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "CampaignTargetTab",
						"values": {
							"caption": {
								"bindTo": "Resources.Strings.CampaignTargetTabCaption"
							},
							"items": []
						},
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 1
					},
					{
						"operation": "insert",
						"name": "CampaignSchemaBlock",
						"parentName": "CampaignSchemaTab",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["campaign-schema-block"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "Column-1",
						"parentName": "CampaignSchemaBlock",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["column-1"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "CampaignDiagramToolsModule",
						"parentName": "Column-1",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.MODULE,
							"afterrender": {"bindTo": "loadCampaignDiagramToolsModule"},
							"afterrerender": {"bindTo": "loadCampaignDiagramToolsModule"},
							"enabled": {"bindTo": "IsStatusEnabled"}
						}
					},
					{
						"operation": "insert",
						"name": "CampaignGridLayout",
						"parentName": "CampaignSchemaBlock",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "Column-2",
						"parentName": "CampaignGridLayout",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"className": "Terrasoft.CampaignDroppableContainer",
							"wrapClass": ["column-2"],
							"items": [],
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 24,
								"rowSpan": 8
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "Column-2",
						"propertyName": "items",
						"name": "CampaignDiagramDesigner",
						"values": {
							"generator": "ConfigurationDiagramGenerator.generateDiagram",
							"className": "Terrasoft.CampaignDiagram",
							"id": "CampaignDiagramDesigner",
							"classes": {
								"wrapClassName": ["diagram"]
							},
							"isItemsInitialized": {"bindTo": "IsDiagramItemsInitialized"},
							"items": "DiagramItems",
							"click": {
								"bindTo": "onDiagramElementClick"
							},
							"changed": {
								"bindTo": "onDiagramChanged"
							},
							"nodesCollectionChange": {
								"bindTo": "onNodesCollectionChange"
							},
							"selectionChange": {
								"bindTo": "onDiagramSelectionChange"
							},
							"connectorsNodesChange": {
								"bindTo": "onCampaignDiagramConnectionChange"
							},
							"diagramInitialized": {
								"bindTo": "onCampaignDiagramInitialized"
							},
							"afterrerender": {
								"bindTo": "initializeDiagramItems"
							},
							"enabled": {
								"bindTo": "IsStatusEnabled"
							}
						}
					},
					{
						"operation": "insert",
						"name": "Column-3",
						"parentName": "CampaignSchemaBlock",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["column-3"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "CampaignDiagramPropertyModule",
						"parentName": "Column-3",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.MODULE,
							"afterrender": {"bindTo": "loadCampaignDiagramPropertyModule"},
							"afterrerender": {"bindTo": "loadCampaignDiagramPropertyModule"}
						}
					},
					{
						"operation": "insert",
						"parentName": "CampaignTargetTab",
						"propertyName": "items",
						"name": "CampaignTarget",
						"values": {
							itemType: this.Terrasoft.ViewItemType.DETAIL
						}
					},

					//region Tabs: Campaign Properties

					{
						"operation": "insert",
						"name": "CampaignPropertiesTab",
						"values": {
							"caption": {
								"bindTo": "Resources.Strings.CampaignPropertiesTabCaption"
							},
							"items": []
						},
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 2
					},
					{
						"operation": "insert",
						"name": "CampaignPropertiesContainer",
						"parentName": "CampaignPropertiesTab",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "Owner",
						"values": {
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 12,
								"rowSpan": 1
							},
							"controlConfig": {
								"enabled": {bindTo: "IsStatusEnabled"}
							}
						},
						"parentName": "CampaignPropertiesContainer",
						"propertyName": "items",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "UtmCampaign",
						"values": {
							"layout": {
								"column": 0,
								"row": 2,
								"colSpan": 12,
								"rowSpan": 1
							},
							"bindTo": "UtmCampaign"
						},
						"parentName": "CampaignPropertiesContainer",
						"propertyName": "items",
						"index": 1
					},
					{
						"operation": "insert",
						"name": "CreatedOn",
						"values": {
							"layout": {
								"column": 0,
								"row": 1,
								"colSpan": 12,
								"rowSpan": 1
							},
							"bindTo": "CreatedOn",
							"caption": {
								"bindTo": "Resources.Strings.CreatedDateCaption"
							},
							"enabled": false
						},
						"parentName": "CampaignPropertiesContainer",
						"propertyName": "items",
						"index": 1
					},
					{
						"operation": "insert",
						"name": "StartDate",
						"values": {
							"layout": {
								"column": 12,
								"row": 0,
								"colSpan": 12,
								"rowSpan": 1
							},
							"bindTo": "StartDate",
							"caption": {
								"bindTo": "Resources.Strings.StartDateCaption"
							},
							"enabled": false
						},
						"parentName": "CampaignPropertiesContainer",
						"propertyName": "items",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "EndDate",
						"values": {
							"layout": {
								"column": 12,
								"row": 1,
								"colSpan": 12,
								"rowSpan": 1
							},
							"bindTo": "EndDate",
							"caption": {
								"bindTo": "Resources.Strings.EndDateCaption"
							},
							"enabled": false
						},
						"parentName": "CampaignPropertiesContainer",
						"propertyName": "items",
						"index": 0
					}

					//endregion

				]/**SCHEMA_DIFF*/,
				attributes: {
					"CampaignDiagram": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
					},
					"IsCampaignPageRendered": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						dependencies: [{
							methodName: "onRender"
						}]
					},
					"CampaignProcessButtonCaption": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.STRING,
						dependencies: [{
							methodName: "changeCampaignProcessButtonCaption"
						}]
					},
					"TargetRemain": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.STRING,
						dependencies: [{
							methodName: "getTargetRemainValue"
						}]
					},
					"IsAudienceEditabile": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN
					},
					/**
					 * A symptom is whether this is a public demo version.
					 */
					"IsPublicDemoBuild": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						value: false
					},
					/**
					 * Link to registration trial version.
					 */
					"TrialUrl": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.TEXT,
						value: ""
					},
					/**
					 * Collection of diagram elements.
					 */
					"DiagramItems": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.COLLECTION,
						isCollection: true,
						dependencies: [{
							columns: ["CampaignDiagram"],
							methodName: "onCampaignDiagramChanged"
						}]
					},
					/**
					 * Symptom, completion of initialization of diagram elements.
					 */
					"IsDiagramItemsInitialized": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						value: false
					}
				},
				methods: {
					/**
					 * Campaign diagram validator.
					 */
					campaignDiagramValidator: Ext.create("Terrasoft.CampaignDiagramValidator"),

					/**
					 * Getting an instance of a chart after initialization
					 * @overridden
					 * @param {Object} diagram A diagram instance.
					 */
					onCampaignDiagramInitialized: function(diagram) {
						this.diagram = diagram;
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#init
					 * @overridden
					 */
					init: function(callback) {
						var items = this.get("DiagramItems");
						if (Ext.isEmpty(items)) {
							items = Ext.create("Terrasoft.Collection");
							this.set("DiagramItems", items);
						}
						items.clear();
						this.indicators = {};
						this.callParent([
							function() {
								var campaignTargetId = this.getDetailId("CampaignTarget");
								var campaignDiagramToolsModuleId = this.getCampaignDiagramToolsModuleId();
								this.sandbox.subscribe("ToolIconDropped",
										this.onCampaignDiagramElementAdd, this, [campaignDiagramToolsModuleId]);
								this.getTargetRemainValue();
								this.on("change:TargetPercent", this.onTargetPercentChanged, this);
								this.sandbox.subscribe("FindConnectorTargetNode", this.findConnectorTargetNode,
										this, [this.getCampaignDiagramPropertyModuleId()]);
								this.sandbox.subscribe("GetCampaignStatus", this.onGetCampaignStatus,
										this, [campaignTargetId]);
								this.sandbox.subscribe("GetAudienceEditabileStatus",
										this.onGetAudienceEditabileStatus, this, [campaignTargetId]);
								this.sandbox.subscribe("TagChanged",
										this.reloadTagCount, this, [this.sandbox.id + "_TagModule"]);
								this.sandbox.subscribe("UpdateDiagramElement", this.onUpdateDiagramElement, this);
								this.sandbox.subscribe("GetDiagramItems", this.getDiagramItems, this);
								callback.call(this);
							}, this
						]);
						this.loadSysSettings();
					},

					/**
					 * Loads system settings.
					 * @protected
					 */
					loadSysSettings: function() {
						var sysSettings = ["BuildType", "TrialUrl"];
						Terrasoft.SysSettings.querySysSettings(sysSettings, function(settings) {
							var isPublicDemo = (settings.BuildType.value === MarketingEnums.BuildType.DEMO_PUBLIC);
							this.set("IsPublicDemoBuild", isPublicDemo);
							this.set("TrialUrl", settings.TrialUrl);
						}, this);
					},

					/**
					 * Sets diagram connectors and nodes.
					 * @private
					 * @param {Object} config Campaign diagram config.
					 */
					getDiagramItems: function(config) {
						var diagram = this.get("CampaignDiagram");
						if (!diagram) {
							return;
						}
						config.connectors = diagram.connectors || [];
						config.nodes = diagram.nodes || [];
					},

					/**
					 * Updates an item in a campaign diagram.
					 * @param {Object} config Configuration object.
					 * @private
					 */
					onUpdateDiagramElement: function(config) {
						var node = this.getDiagramElement(config.elementId);
						if (!node || typeof node.set !== "function") {
							return;
						}
						if ("labelText" in config) {
							node.set("Text", config.labelText);
						}
						if ("addInfo" in config) {
							var currentInfo = node.get("AddInfo");
							var addInfo = Ext.merge({}, currentInfo, config.addInfo);
							node.set("AddInfo", addInfo);
						}
					},

					/**
					 * Updates the value of the attribute IsAudienceEditabile.
					 * @private
					 */
					updateIsAudienceEditabile: function() {
						var diagram = this.get("CampaignDiagram");
						var nodes = null;
						if (!diagram) {
							var flowElements = this.get("FlowElements");
							nodes = flowElements.nodes;
						} else {
							nodes = diagram.nodes;
						}
						var isAudienceElementExist = this.isDiagramContainsAudienceElement(nodes, "", null);
						this.setIsAudienceEditabile(isAudienceElementExist);
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2ViewModel#setValidationConfig.
					 * @overridden
					 */
					setValidationConfig: function() {
						this.callParent(arguments);
						this.addColumnValidator("TargetPercent", this.targetPercentValidator);
					},

					/**
					 * Validates value of the  TargetPercent.
					 * @private
					 */
					targetPercentValidator: function() {
						var invalidMessage = "";
						var targetPercent = this.get("TargetPercent");
						if (targetPercent == null || targetPercent < 0 || targetPercent > 100) {
							invalidMessage = this.get("Resources.Strings.TargetPercentValidationErrorMessage");
						}
						return {
							fullInvalidMessage: invalidMessage,
							invalidMessage: invalidMessage
						};
					},

					/**
					 * The TargetPercent change event handler.
					 * @private
					 */
					onTargetPercentChanged: function() {
						this.getTargetRemainValue();
						this.loadIndicatorsContent();
					},

					/**
					 * Returns a flag indicating the ability to change the audience of a campaign.
					 * @returns {Object} Flag indicating the ability to change the audience of a campaign.
					 */
					onGetAudienceEditabileStatus: function() {
						var IsAudienceEditabile = this.get("IsAudienceEditabile");
						return {
							isAudienceEditabile: IsAudienceEditabile
						};
					},

					/**
					 * Initializes diagram item collection.
					 */
					initializeDiagramItems: function() {
						this.set("IsDiagramItemsInitialized", false);
						var diagram = this.get("CampaignDiagram");
						var flowElements = {};
						if (diagram) {
							flowElements.nodes = diagram.nodes;
							flowElements.connectors = diagram.connectors;
						} else {
							flowElements = this.get("FlowElements");
							if (this.isNewMode() && !this.isCopyMode() && !flowElements) {
								flowElements = CampaignEnums.GetDefaultCampaign();
							}
							flowElements = this.getUpdatedFlowElementsConfig(flowElements);
						}
						flowElements = Ext.isEmpty(flowElements.nodes) ? {nodes: [], connectors: []} : flowElements;
						var items = this.get("DiagramItems");
						items.clear();
						this.Terrasoft.each(flowElements.nodes, this.addDiagramItem, this);
						this.Terrasoft.each(flowElements.connectors, this.addDiagramItem, this);
						this.set("IsDiagramItemsInitialized", true);
					},

					/**
					 * Entity initialization handler.
					 * @overridden
					 */
					onEntityInitialized: function() {
						this.callParent(arguments);
						this.initializeDiagramItems();
						this.updateIsAudienceEditabile();
						this.set("CampaignDiagram", null);
						this.getTargetRemainValue();
						if (this.get("IsCampaignPageRendered")) {
							this.loadIndicatorsContent();
						}
						var primaryColumnValue = this.getPrimaryColumnValue();
						this.initTagButtonCaption(primaryColumnValue);
					},

					/**
					 * Page render handler.
					 * @overridden
					 */
					onRender: function() {
						this.callParent(arguments);
						this.set("IsCampaignPageRendered", true);
					},

					/**
					 * CampaignDiagram change handler.
					 */
					onCampaignDiagramChanged: function() {
						var diagram = this.get("CampaignDiagram");
						if (!diagram) {
							return;
						}
						Terrasoft.each(diagram.nodes || [], this.updateDiagramItem, this);
						Terrasoft.each(diagram.connectors || [], this.updateDiagramItem, this);
					},

					/**
					 * Diagram change event handler.
					 * @param {Object} event Diagram event object.
					 * @private
					 */
					onDiagramChanged: function(event) {
						if (this.get("IsDiagramItemsInitialized") === false) {
							return;
						}
						var diagram = event.diagramState;
						if (!diagram) {
							return;
						}
						var eventElement = event.element;
						if (eventElement) {
							var elementType = event.elementType;
							var changeType = event.changeType;
							var elementName = event.element.name;
							if (!this.get("IsStatusEnabled")) {
								event.cancel = true;
								this.showInformationDialog(resources.localizableStrings.DiagramDisabledMessage);
							} else if (elementType === "node" && changeType === "insert") {
								diagram.nodes.push(eventElement);
							} else if (elementType === "node" && changeType === "remove") {
								this.deleteFromArray(diagram.nodes, "name", elementName);
							} else if (elementType === "connector" && changeType === "insert") {
								diagram.connectors.push(eventElement);
							} else if (elementType === "connector" && changeType === "remove") {
								this.deleteFromArray(diagram.connectors, "name", elementName);
							}
						}
						this.set("CampaignDiagram", diagram);
						if (this.isNew || !this.get("IsEntityInitialized")) {
							return;
						}
						this.onItemFocused();
					},

					/**
					 * Checks whether page object fields are changed.
					 * @overridden
					 * @return {Boolean} Returns true if page object fields are chaged, otherwise returns false.
					 */
					isChanged: function() {
						var changed = this.callParent(arguments);
						if (changed) {
							return true;
						}
						if (this.get("Initialized") && this.changedValues.hasOwnProperty("CampaignDiagram")) {
							changed = this.isDiagramChanged();
						}
						return changed;
					},

					/**
					 * Checks whether diagram is changed.
					 * @overridden
					 * @return {Boolean} Returns true if diagram is changed. Otherwise returns false
					 */
					isDiagramChanged: function() {
						return (this.get("CampaignDiagram") !== null);
					},

					/**
					 * Deletes from array by property value.
					 * @private
					 * @param {Array} items Object array.
					 * @param {String} searchProperty Property name.
					 * @param {String} searchValue Value name.
					 */
					deleteFromArray: function(items, searchProperty, searchValue) {
						var itemToDelete = Ext.Array.findBy(items, function(i) {
							return i[searchProperty] === searchValue;
						}, this);
						Ext.Array.remove(items, itemToDelete);
						this.resetDiagramProperty();
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#discardDetailChange
					 * @overridden
					 */
					discardDetailChange: function() {
						this.callParent(arguments);
						if (this.isDiagramChanged()) {
							this.set("CampaignDiagram", null);
							this.loadSchema(function() {
								this.initializeDiagramItems();
								this.resetDiagramProperty();
							});
						}
					},

					/**
					 * Returns identifier of the CampaignDiagramPropertyModule module.
					 * @private
					 * @returns {String}
					 */
					getCampaignDiagramPropertyModuleId: function() {
						return this.sandbox.id + "_CampaignDiagramPropertyModule";
					},

					/**
					 * Returns identifier of the CampaignDiagramToolsModule module.
					 * @private
					 * @returns {String}
					 */
					getCampaignDiagramToolsModuleId: function() {
						return this.sandbox.id + "_CampaignDiagramToolsModule";
					},

					/**
					 * The event handler for the item selection on the diagram.
					 * @param {Object} event Chart event object.
					 * @private
					 */
					onDiagramSelectionChange: function(event) {
						if (this.get("IsDiagramItemsInitialized") === false) {
							return;
						}
						if (event && event.elementType) {
							event.sourceNode = this.getDiagramElement(event.element.sourceNode) || {};
							event.targetNode = this.getDiagramElement(event.element.targetNode) || {};
							event.inEdges = this.getDiagramElements(event.element.inEdges) || [];
							event.outEdges = this.getDiagramElements(event.element.outEdges) || [];
							event.isStatusEnabled = this.get("IsStatusEnabled");
							this.sandbox.publish("DiagramElementChanged", event,
									[this.getCampaignDiagramPropertyModuleId()]);
						}
					},

					/**
					 * Searches for an element in the diagram by ID.
					 * @param {String} elemntId Item ID on the diagram.
					 * @returns {Object} Diagram element.
					 */
					getDiagramElement: function(elemntId) {
						if (!elemntId) {
							return {};
						}
						var items = this.get("DiagramItems");
						var filteredItems = items.filter("name", elemntId);
						return (filteredItems.getCount() > 0) ? filteredItems.getByIndex(0) : null;
					},

					/**
					 * Returns diagram elements by id.
					 * @param {Array} elementIds Diagram element unique identifiers.
					 * @returns {Array} Diagram elements.
					 */
					getDiagramElements: function(elementIds) {
						if (!elementIds) {
							return [];
						}
						return elementIds.map(this.getDiagramElement, this);
					},

					/**
					 * Event handler changing the collection of items on the diagram.
					 * @param {Object} event Diagram event object.
					 * @private
					 */
					onNodesCollectionChange: function(event) {
						var nodes = event.model.nodes;
						var changeType = event.changeType;
						var element = event.element;
						var isAudienceElementExist = this.isDiagramContainsAudienceElement(nodes, changeType, element);
						this.setIsAudienceEditabile(isAudienceElementExist);
						this.onDiagramChanged(event);
					},

					/**
					 * Setting an IsAudienceEditabile attribute .
					 * @param {Object} value Attribute value.
					 * @private
					 */
					setIsAudienceEditabile: function(value) {
						this.set("IsAudienceEditabile", value);
						var detailId = this.getDetailId("CampaignTarget");
						this.sandbox.publish("AudienceEditabileStatusChange", value, [detailId]);
					},

					/**
					 * Checks if the chart contains an Audience object.
					 * @param {Object} nodes Collection of objects.
					 * @param {Object} changeType Type of operation.
					 * @param {Object} element The object that has changed.
					 * @returns {Boolean}
					 */
					isDiagramContainsAudienceElement: function(nodes, changeType, element) {
						var result = false;
						for (var i = 0; i < nodes.length; i++) {
							// Skipping a remote object
							if (changeType === "remove" && nodes[i].name === element.name) {
								continue;
							}
							if (nodes[i].stepType === CampaignEnums.StepType.CAMPAIGN_AUDIENCE) {
								result = true;
								break;
							}
						}
						if (changeType === "insert" && element.stepType === CampaignEnums.StepType.CAMPAIGN_AUDIENCE) {
							result = true;
						}
						return result;
					},

					/**
					 * Click event handler for the element in the diagram.
					 * @param {Object} event Diagram event object.
					 * @private
					 */
					onDiagramElementClick: function(event) {
						if (event.elementType === null && event.element.activeTool.name === "select") {
							this.resetDiagramProperty();
						}
					},

					/**
					 * The event handler reconnecting arrows
					 * @param {Object} event Diagram event object.
					 * @private
					 */
					onCampaignDiagramConnectionChange: function(event) {
						var element = Terrasoft.deepClone(event.element);
						if (element) {
							element.addInfo = element.addInfo || {};
							element.labels = element.labels || [{text: ""}];
							element.addInfo.Filters = [];
							var config = {
								elementType: PropertyEnums.DiagramElementCategory.CONNECTOR,
								element: element
							};
							this.onDiagramSelectionChange(config);
						}
					},

					/**
					 * The event handler adding element.
					 * @param {Object} event Diagram event object.
					 * @private
					 */
					onCampaignDiagramElementAdd: function(event) {
						this.getUpdatedFlowElementsConfig(event);
						var nodeConfig = event.nodes[0];
						if	(!this.get("IsStatusEnabled")) {
							this.showInformationDialog(resources.localizableStrings.DiagramDisabledMessage);
							return;
						}
						if (!this.canAddDigramElement(nodeConfig)) {
							this.onDiagramElementNotAdded();
							return;
						}
						this.addDiagramItem(nodeConfig);
					},

					/**
					 * Adds a new diagram element to the collection.
					 * @param {Object} config Configuration object.
					 */
					addDiagramItem: function(config) {
						var item = this.createDiagramItem(config);
						var items = this.get("DiagramItems");
						var keys = items.getKeys();
						var itemName = config.name;
						if (Ext.Array.contains(keys, itemName) === false) {
							items.add(itemName, item);
						}
					},

					/**
					 * Updates the collection item DiagramItems.
					 */
					updateDiagramItem: function(config) {
						var items = this.get("DiagramItems");
						var item = items.find(config.name);
						if (item) {
							item.config = config;
						}
					},

					/**
					 * Returns a new diagram element.
					 * @param {Object} config Configuration object.
					 * @returns {Terrasoft.CampaignDiagramItem}
					 */
					createDiagramItem: function(config) {
						//Fixing an element configuration for version diagrams 7.6.
						if (Ext.isString(config.portsSet)) {
							config.portsSet = Terrasoft.diagram.PortsSet[config.portsSet];
						}
						var item = Ext.create("Terrasoft.CampaignDiagramItem", {
							name: config.name,
							config: config
						});
						item.set("AddInfo", config.addInfo);
						var label = config.labels[0];
						var labelText = "";
						if (label) {
							labelText = label.text || "";
						}
						item.set("Text", labelText);
						return item;
					},

					/**
					 * Checks whether you can add an object to the chart.
					 * @param {Object} config Configuration object.
					 * @returns {Boolean} Returns true if the object can be added, otherwise false.
					 */
					canAddDigramElement: function(config) {
						return (!CampaignEnums.IsSingletonStepType(config.stepType) ||
						!this.isDiagramContainsSingletonElement());
					},

					/**
					 * Checks whether the chart contains an object that can be present in a single instance.
					 * @param {Object} items Diagram.
					 * @returns {Boolean}
					 */
					isDiagramContainsSingletonElement: function() {
						var result = false;
						var items = this.get("DiagramItems");
						items.each(function(item) {
							if (CampaignEnums.IsSingletonStepType(item.config.stepType)) {
								result = true;
							}
						}, this);
						return result;
					},

					/**
					 * Sets the default mapping in the property module.
					 * @private
					 */
					resetDiagramProperty: function() {
						this.sandbox.publish("DiagramElementChanged", null,
								[this.getCampaignDiagramPropertyModuleId()]);
					},

					/**
					 * Loads the diagram property module.
					 * @protected
					 */
					loadCampaignDiagramPropertyModule: function() {
						if (this.get("ActiveTabName") !== "CampaignSchemaTab") {
							return;
						}
						var moduleId = this.getCampaignDiagramPropertyModuleId();
						this.sandbox.loadModule("CampaignDiagramPropertyModule", {
							renderTo: "CampaignDiagramPropertyModule",
							id: moduleId
						});
					},

					/**
					 * Download module diagram tools.
					 * @protected
					 */
					loadCampaignDiagramToolsModule: function() {
						if (this.get("ActiveTabName") !== "CampaignSchemaTab") {
							return;
						}
						var moduleId = this.getCampaignDiagramToolsModuleId();
						this.sandbox.loadModule("CampaignDiagramToolsModule", {
							renderTo: "CampaignDiagramToolsModule",
							id: moduleId
						});
					},

					/**
					 * Complement the configuration of process steps.
					 * @protected
					 * @param {Array} flowElements List of process steps.
					 * @returns {Array}
					 */
					getUpdatedFlowElementsConfig: function(flowElements) {
						flowElements = flowElements || [];
						Terrasoft.each(flowElements.nodes, function(item) {
							Ext.apply(item, CampaignEnums.GetStepTypeConfig(item.stepType));
							item.sysImage = CampaignLocalizableHelper.localizableImages[item.sysImage];
						}, this);
						return flowElements;
					},

					/**
					 * Initializes the values of the opened entity.
					 * @overridden
					 * @param {Function} callback
					 * @param {Object} scope
					 */
					initEntity: function(callback, scope) {
						this.callParent([
							function() {
								this.loadSchema(function() {
									callback.call(this);
								});
							}, scope
						]);
					},

					/**
					 * Converts an existing campaign schema to a new one
					 * @private
					 */
					copySchemaData: function(schemaData) {
						var modifiedSchemaData = Terrasoft.deepClone(schemaData);
						Terrasoft.each(modifiedSchemaData.nodes, function(item) {
							var oldNodeName = item.name;
							var newNodeName = Terrasoft.generateGUID();
							item.name = newNodeName;
							if (item.hasOwnProperty("addInfo") && item.addInfo.hasOwnProperty("RecordId")) {
								delete item.addInfo.RecordId;
							}
							Terrasoft.each(modifiedSchemaData.connectors, function(item) {
								item.name = Terrasoft.generateGUID();
								if (item.sourceNode === oldNodeName) {
									item.sourceNode = newNodeName;
								}
								if (item.targetNode === oldNodeName) {
									item.targetNode = newNodeName;
								}
							}, this);
						}, this);
						return modifiedSchemaData;
					},

					/**
					 * Download the campaign chart.
					 * @private
					 */
					loadSchema: function(callback) {
						var rawSchemaData = this.get("SchemaData");
						if (this.isNewMode() || this.isCopyMode()) {
							if (this.isCopyMode() && rawSchemaData) {
								var sourceSchemaData = JSON.parse(rawSchemaData);
								var modifiedSchemaData = this.copySchemaData(sourceSchemaData);
								this.set("FlowElements", modifiedSchemaData);
							} else {
								this.set("FlowElements", CampaignEnums.GetDefaultCampaign());
							}
							if (callback) {
								callback.call(this);
							}
							return;
						}
						var clearEmptyParameters = function(sourceObject) {
							for (var parameterName in sourceObject) {
								var value = sourceObject[parameterName];
								if (Ext.isEmpty(value)) {
									delete sourceObject[parameterName];
									continue;
								}
								var valueType = typeof (value);
								if (valueType === "object") {
									clearEmptyParameters(value);
								}
							}
						};
						var schemaData = JSON.parse(rawSchemaData || "{ \"nodes\": [], \"connectors\": [] }");
						clearEmptyParameters(schemaData);
						this.set("FlowElements", schemaData);
						if (callback) {
							callback.call(this);
						}
					},

					/**
					 * Returns the value for the "Goal remaining" metric
					 * @private
					 */
					getTargetRemainValue: function() {
						var targetTotal = this.get("TargetTotal");
						var targetAchieve = this.get("TargetAchieve");
						var targetPercent = this.get("TargetPercent");
						var targetRemain = Math.floor(targetTotal * targetPercent * 0.01 - targetAchieve);
						this.set("TargetRemain", targetRemain);
					},

					/**
					 * Saves the presentation of the campaign in the database.
					 * @private
					 */
					saveDiagram: function(diagram) {
						//TODO: Remove the check after correcting the error associated with the unloading
						// schema of the campaign after the page is restored from history state
						var json = null;
						if (typeof diagram.save === "function") {
							json = diagram.save();
						} else {
							json = this.get("CampaignDiagram");
						}
						if (Ext.isEmpty(json) === false) {
							this.set("SchemaData", JSON.stringify(json));
						}
					},

					/**
					 * Returns campaign diagram.
					 * @returns {Object} Diagram.
					 */
					getDiagramData: function() {
						var diagram = this.get("CampaignDiagram");
						if (Ext.isEmpty(diagram)) {
							diagram = this.diagram.model;
						}
						if (Ext.isEmpty(diagram)) {
							var diagramData = this.get("SchemaData");
							if (diagramData) {
								diagram = JSON.parse(diagramData);
							}
						}
						return diagram;
					},

					/**
					 * Searches for connector to final diagram element
					 * ignoring element with type Terrasoft.CampaignEnums#StepType.CREATE_LEAD.
					 * @param {Object} nextTargetNode Diagram element.
					 * @returns {Object} Diagram element.
					 */
					findConnectorTargetNode: function(nextTargetNode) {
						if (typeof nextTargetNode === "string") {
							nextTargetNode = this.getDiagramElement(nextTargetNode);
						}
						if (this.Ext.isEmpty(nextTargetNode.config) || this.Ext.isEmpty(nextTargetNode.config.stepType)) {
							return null;
						}
						if (nextTargetNode.config.stepType !== CampaignEnums.StepType.CREATE_LEAD) {
							return nextTargetNode;
						}
						var nodeName = nextTargetNode.name;
						var connectors = this.findDiagramConnectors(function(connector) {
							return (connector.sourceNode === nodeName);
						});
						if (connectors.length === 1) {
							var tagetNodeId = connectors[0].targetNode;
							nextTargetNode = this.getDiagramElement(tagetNodeId);
							return this.findConnectorTargetNode(nextTargetNode);
						}
						return nextTargetNode;
					},

					/**
					 * Performs save post processing.
					 * @overridden
					 */
					onSaved: function() {
						this.callParent(arguments);
						this.set("CampaignDiagram", null);
						this.loadSchema();
						this.getTargetRemainValue();
						this.refreshIndicators();
					},

					/**
					 * Refreshes indicators.
					 */
					refreshIndicators: function() {
						if (this.get("IsCampaignPageRendered")) {
							this.refreshColumns(["TargetTotal", "TargetAchieve", "TargetPercent"],
									this.loadIndicatorsContent);
						}
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#save
					 * @overridden
					 * @param {Object} config
					 * @param {Boolean} validateDiagram A symptom is whether you need to validate the
					 * campaign schema before saving.
					 */
					save: function(config, validateDiagram) {
						if ((validateDiagram === null) || (typeof validateDiagram === "undefined")) {
							validateDiagram = true;
						}
						if (validateDiagram) {
							this.campaignDiagramValidator.validateDiagram(this.getDiagramData(), function(errors) {
								var scope = this;
								if (errors) {
									var message = resources.localizableStrings.SaveCampaignDiagramErrorConfirmationMessage;
									this.showConfirmationDialog(message,
											function(returnCode) {
												if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
													scope.save(config, false);
												}
											}, ["yes", "cancel"]);
								} else {
									scope.save(config, false);
								}
							}, this);
						} else {
							this.saveDiagram(this.diagram);
							this.callParent(arguments);
						}
					},

					/*
					 * Campaign diagram.
					 */
					diagram: null,

					/**
					 * Performs element search on diagram.
					 * @param {Function} filter Filter function.
					 * @returns {Array} Found elements collection.
					 */
					findDiagramConnectors: function(filter) {
						var connectors = this.diagram.connectors();
						if (filter) {
							return connectors.filter(filter);
						}
						return connectors;
					},

					/**
					 * Starts/stops campaign.
					 * @protected
					 */
					campaignProcessHandler: function() {
						var status = this.get("CampaignStatus").value;
						var campaignStatus = MarketingEnums.CampaignStatus;
						switch (status) {
							case campaignStatus.PLANNED:
								this.onLaunchCampaign();
								break;
							case campaignStatus.STARTED:
								this.onCompleteCampaign();
								break;
						}
					},

					/**
					 * Launch campaign click handler.
					 */
					onLaunchCampaign: function() {
						if (this.get("IsPublicDemoBuild")) {
							MarketingCommonUtilities.ShowConfirmationDialogWithGoButton(
									this.get("Resources.Strings.DemoDataMessage"),
									this.get("TrialUrl"),
									this.get("Resources.Strings.TryTrialButtonCaption"),
									this
							);
							return;
						}
						var config = {
							style: Terrasoft.MessageBoxStyles.BLUE
						};
						var message = resources.localizableStrings.CampaignStartConfirmationMessage;
						this.showConfirmationDialog(message,
								function(returnCode) {
									if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
										Terrasoft.chain(
												function(next) {
													this.campaignDiagramValidator.validateDiagram(this.getDiagramData(),
															function(errors) {
																if (errors) {
																	var message = errors[0].message;
																	this.showInformationDialog(message);
																} else {
																	next();
																}
															}, this);
												},
												function(next) {
													var config = {
														isSilent: true,
														callback: next
													};
													this.save(config, false);
												},
												function(next) {
													this.showBodyMask();
													this.launchCampaign(function(response) {
														var validationResult = response.LaunchCampaignResult || {};
														if (validationResult.success) {
															next();
														} else {
															this.hideBodyMask();
															this.showInformationDialog(validationResult.errorInfo.message);
														}
													});
												},
												function(next) {
													this.reloadFields(["CampaignStatus", "StartDate"], function() {
														this.hideBodyMask();
														next();
													}, this);
												},
												function() {
													var scope = this;
													setTimeout(function() {
														scope.updateDetail({detail: "CampaignTarget"});
													}, SegmentsStatusUtils.timeoutBeforeUpdate);
												},
												this
										);
									}
								}, ["yes", "cancel"],
								config);
					},

					/**
					 * Stop campaign click handler.
					 */
					onCompleteCampaign: function() {
						var config = {
							style: Terrasoft.MessageBoxStyles.BLUE
						};
						var message = resources.localizableStrings.CampaignCompleteConfirmationMessage;
						this.showConfirmationDialog(message,
								function(returnCode) {
									if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
										Terrasoft.chain(
												function(next) {
													var saveConfig = {
														isSilent: true,
														callback: next
													};
													this.save(saveConfig, false);
												},
												function(next) {
													this.showBodyMask();
													this.completeCampaign(function(response) {
														if (response) {
															next();
														}
													});
												},
												function(next) {
													this.reloadFields(["CampaignStatus", "EndDate"], function() {
														this.hideBodyMask();
														next();
													}, this);
												},
												function() {
													var scope = this;
													setTimeout(function() {
														scope.updateDetail({detail: "CampaignTarget"});
													}, SegmentsStatusUtils.timeoutBeforeUpdate);
												},
												this
										);
									}
								}, ["yes", "cancel"], config);
					},

					/**
					 * Launches campaign.
					 * @protected
					 * @param {Function} callback Callback function.
					 */
					launchCampaign: function(callback) {
						var dataSend = {
							campaignId: this.get("Id")
						};
						var config = {
							serviceName: "CampaignService",
							methodName: "LaunchCampaign",
							data: dataSend
						};
						this.callService(config, callback);
					},

					/**
					 * Complete campaign.
					 * @protected
					 * @param {Function} callback Callback function.
					 */
					completeCampaign: function(callback) {
						var dataSend = {
							campaignId: this.get("Id")
						};
						var config = {
							serviceName: "CampaignService",
							methodName: "CompleteCampaign",
							data: dataSend
						};
						this.callService(config, callback, this);
					},

					/**
					 * Chagnes campaign status button caption.
					 * @protected
					 */
					changeCampaignProcessButtonCaption: function() {
						var result = this.get("Resources.Strings.StartCampaignButtonCaption");
						var status = this.get("CampaignStatus");
						var campaignStatus = !this.Ext.isEmpty(status) ? status.value : null;
						if (campaignStatus !== MarketingEnums.CampaignStatus.PLANNED) {
							result = this.get("Resources.Strings.StopCampaignButtonCaption");
						}
						this.set("CampaignProcessButtonCaption", result);
						return result;
					},

					/**
					 * Initializes subscription on card properties.
					 * @protected
					 * @overridden
					 */
					initCardActionHandler: function() {
						this.callParent(arguments);
						this.on("change:IsStatusEnabled", function(model, value) {
							this.sandbox.publish("CardChanged", {
								key: "IsStatusEnabled",
								value: value
							}, [this.sandbox.id]);
							this.sandbox.publish("CardChanged", {
								key: "IsStatusEnabled",
								value: value
							}, [this.getCampaignDiagramPropertyModuleId()]);
						}, this);
						this.on("change:CampaignProcessButtonCaption", function(model, value) {
							this.sandbox.publish("CardChanged", {
								key: "CampaignProcessButtonCaption",
								value: value
							}, [this.sandbox.id]);
						}, this);
					},

					/**
					 * DiagramElementNotAdded event handler.
					 * @private
					 */
					onDiagramElementNotAdded: function() {
						this.showInformationDialog(resources.localizableStrings.DiagramElementNotAddedMessage);
					}
				}
			};
		});


