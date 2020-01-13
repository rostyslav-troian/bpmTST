Terrasoft.configuration.Structures["CampaignEventPage"] = {innerHierarchyStack: ["CampaignEventPage"], structureParent: "EntityCampaignSchemaElementPage"};
define('CampaignEventPageStructure', ['CampaignEventPageResources'], function(resources) {return {schemaUId:'d6ad5dda-bfe6-4367-9186-93f959d244eb',schemaCaption: "CampaignEventPage", parentSchemaName: "EntityCampaignSchemaElementPage", schemaName:'CampaignEventPage',parentSchemaUId:'649bfa24-3354-4d40-b638-b8ec5477e3cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Schema of campaign Event element page
 * Parent: EntityCampaignSchemaElementPage
 */
define("CampaignEventPage", [],
	function() {
		return {
			attributes: {

				/**
				 * Start time of the selected event.
				 * @type {Terrasoft.dataValueType.DATE}
				 */
				"StartTime": {
					"dataValueType": this.Terrasoft.DataValueType.DATE,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * End time of the selected event.
				 * @type {Terrasoft.dataValueType.DATE}
				 */
				"EndTime": {
					"dataValueType": this.Terrasoft.DataValueType.DATE,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Type of the selected event.
				 * @type {Terrasoft.dataValueType.TEXT}
				 */
				"EventType": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Owner of the selected event.
				 * @type {Terrasoft.dataValueType.TEXT}
				 */
				"Owner": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {

				/**
				 * @inheritdoc EntityCampaignSchemaElementPage#getColumnsForEntitySelect
				 * @overridden
				 */
				getColumnsForEntitySelect: function() {
					return ["Id", "Name", "StartDate", "EndDate", "Type", "Owner"];
				},

				/**
				 * @inheritdoc EntityCampaignSchemaElementPage#getEntityRecordIdFromElement
				 * @overridden
				 */
				getEntityRecordIdFromElement: function(element) {
					return element.eventId;
				},

				/**
				 * @inheritdoc EntityCampaignSchemaElementPage#setRecordIdToElement
				 * @overridden
				 */
				setRecordIdToElement: function(element, recordId) {
					element.eventId = recordId;
				},

				/**
				 * @inheritdoc EntityCampaignSchemaElementPage#getEntityLookupCaption
				 * @overridden
				 */
				getEntityLookupCaption: function() {
					return this.get("Resources.Strings.CampaignEventText");
				},

				/**
				 * @inheritdoc EntityCampaignSchemaElementPage#getEntitySchemaName
				 * @overridden
				 */
				getEntitySchemaName: function() {
					return "Event";
				},

				/**
				 * @inheritdoc EntityCampaignSchemaElementPage#setPageParameters
				 * @overridden
				 */
				setPageParameters: function(eventEntity) {
					this.callParent(arguments);
					this.set("StartTime", eventEntity.get("StartDate"));
					this.set("EndTime", eventEntity.get("EndDate"));
					this.set("EventType", eventEntity.get("Type").displayValue);
					this.set("Owner", eventEntity.get("Owner").displayValue);
				},

				/**
				 * @inheritdoc EntityCampaignSchemaElementPage#clearPageParameters
				 * @overridden
				 */
				clearPageParameters: function() {
					this.callParent(arguments);
					this.set("StartTime", null);
					this.set("EndTime", null);
					this.set("EventType", null);
					this.set("Owner", null);
				},

				/**
				 * @inheritdoc EntityCampaignSchemaElementPage#getEntityLookupFilters
				 * @overridden
				 */
				getEntityLookupFilters: function() {
					var filters = this.Terrasoft.createFilterGroup();
					var schema = this.sandbox.publish("GetSchema");
					var selectedEventIds = [];
					var currentElement = this.get("ProcessElement");
					schema.flowElements.collection.each(function(el) {
						if (el.eventId && el.uId !== currentElement.uId) {
							var rightExpression = Ext.create("Terrasoft.ParameterExpression", {
								parameterDataType: Terrasoft.DataValueType.GUID,
								parameterValue: el.eventId
							});
							selectedEventIds.push(rightExpression);
						}
					});
					var leftExpression = Ext.create("Terrasoft.ColumnExpression", {
						columnPath: "Id"
					});
					var notInFilter = this.Terrasoft.createInFilter(leftExpression, selectedEventIds);
					notInFilter.comparisonType = this.Terrasoft.ComparisonType.NOT_EQUAL;
					filters.addItem(notInFilter);
					return filters;
				},

				/**
				 * @inheritdoc BaseCampaignSchemaElementPage#getContextHelpCode
				 * @overridden
				 */
				getContextHelpCode: function() {
					return "CampaignEventElement";
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "StartTimeLabel",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.StartTimeCaption"
						},
						"classes": {
							"labelClass": ["label-small"]
						},
						"visible": {
							"bindTo": "isEntitySelected"
						}
					}
				},
				{
					"operation": "insert",
					"name": "StartTime",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"labelConfig": {
							"visible": false
						},
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 24
						},
						"classes": {
							"labelClass": ["feature-item-label"]
						},
						"enabled": false,
						"visible": {
							"bindTo": "isEntitySelected"
						},
						"controlConfig": {"tag": "StartTime"}
					}
				},
				{
					"operation": "insert",
					"name": "EndTimeLabel",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 24
						},
						"classes": {
							"labelClass": ["label-small"]
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.EndTimeCaption"
						},
						"visible": {
							"bindTo": "isEntitySelected"
						}
					}
				},
				{
					"operation": "insert",
					"name": "EndTime",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"labelConfig": {
							"visible": false
						},
						"layout": {
							"column": 0,
							"row": 5,
							"colSpan": 24
						},
						"classes": {
							"labelClass": ["feature-item-label"]
						},
						"enabled": false,
						"visible": {
							"bindTo": "isEntitySelected"
						},
						"controlConfig": {"tag": "EndTime"}
					}
				},
				{
					"operation": "insert",
					"name": "EventTypeLabel",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 6,
							"colSpan": 24
						},
						"value": {
							"bindTo": "EventType"
						},
						"classes": {
							"labelClass": ["label-small"]
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.EventTypeCaption"
						},
						"visible": {
							"bindTo": "isEntitySelected"
						}
					}
				},
				{
					"operation": "insert",
					"name": "EventType",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"labelConfig": {
							"visible": false
						},
						"layout": {
							"column": 0,
							"row": 7,
							"colSpan": 24
						},
						"classes": {
							"labelClass": ["feature-item-label"]
						},
						"itemType": this.Terrasoft.ViewItemType.TEXT,
						"enabled": false,
						"visible": {
							"bindTo": "isEntitySelected"
						},
						"controlConfig": {"tag": "EventType"}
					}
				},
				{
					"operation": "insert",
					"name": "OwnerLabel",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 8,
							"colSpan": 24
						},
						"value": {
							"bindTo": "Owner"
						},
						"classes": {
							"labelClass": ["label-small"]
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.OwnerCaption"
						},
						"visible": {
							"bindTo": "isEntitySelected"
						}
					}
				},
				{
					"operation": "insert",
					"name": "Owner",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"labelConfig": {
							"visible": false
						},
						"layout": {
							"column": 0,
							"row": 9,
							"colSpan": 24
						},
						"classes": {
							"labelClass": ["feature-item-label"]
						},
						"itemType": this.Terrasoft.ViewItemType.TEXT,
						"enabled": false,
						"visible": {
							"bindTo": "isEntitySelected"
						},
						"controlConfig": {"tag": "Owner"}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


