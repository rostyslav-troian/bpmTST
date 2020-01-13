Terrasoft.configuration.Structures["EventPageV2"] = {innerHierarchyStack: ["EventPageV2"], structureParent: "BaseModulePageV2"};
define('EventPageV2Structure', ['EventPageV2Resources'], function(resources) {return {schemaUId:'a8c45fc2-f8be-4725-be24-81805372157d',schemaCaption: "Section edit page schema - \"Event\"", parentSchemaName: "BaseModulePageV2", schemaName:'EventPageV2',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EventPageV2", ["terrasoft", "BaseFiltersGenerateModule", "ConfigurationConstants"],
function(Terrasoft, BaseFiltersGenerateModule) {
	return {
		entitySchemaName: "Event",
		attributes: {
			"Owner": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				lookupListConfig: {filter: BaseFiltersGenerateModule.OwnerFilter},
				isRequired: true
			},
			"StartDate": {
				dataValueType: Terrasoft.DataValueType.DATE
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BasePageV2#getHeader
			 * @overridden
			 */
			getHeader: function() {
				return this.entitySchema.caption;
			},

			/**
			 * ########## ######## ###### #############.
			 * @protected
			 * @overridden
			 * @return {Boolean} ########## ######### #########.
			 */
			validate: function() {
				var isValid = this.callParent(arguments);
				var startDate  = this.get("StartDate");
				var endDate = this.get("EndDate");
				if (!Ext.isEmpty(startDate) && !Ext.isEmpty(endDate) && (startDate > endDate)) {
					this.showInformationDialog(this.get("Resources.Strings.WarningWrongDate"));
					return false;
				} else {
					return isValid;
				}
			},
			/**
			 * ####### ######## ######## ###### email.
			 * @protected
			 * @return {createFilterGroup}
			 */
			emailDetailFilter: function() {
				var recordId = this.get("Id");
				var filterGroup = new Terrasoft.createFilterGroup();
				filterGroup.add("Event", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Event", recordId));
				var emailType = this.get("ConfigurationConstants.Activity.Type.Email");
				filterGroup.add("ActivityType", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Type", emailType));
				return filterGroup;
			}
		},
		details: /**SCHEMA_DETAILS*/{
			Files: {
				schemaName: "FileDetailV2",
				entitySchemaName: "EventFile",
				filter: {
					masterColumn: "Id",
					detailColumn: "Event"
				}
			},
			EventTarget: {
				schemaName: "EventTargetDetailV2",
				filter: {
					masterColumn: "Id",
					detailColumn: "Event"
				},
				defaultValues: {
					Event: {
						masterColumn: "Id"
					}
				}
			},
			Activities: {
				schemaName: "ActivityDetailV2",
				filter: {
					masterColumn: "Id",
					detailColumn: "Event"
				},
				defaultValues: {
					Interaction: {
						masterColumn: "Id"
					}
				}
			},
			EventProduct: {
				schemaName: "EventProductDetailV2",
				filter: {
					masterColumn: "Id",
					detailColumn: "Event"
				},
				defaultValues: {
					Event: {
						masterColumn: "Id"
					}
				}
			},
			EventTeam: {
				schemaName: "EventTeamDetailV2",
				filter: {
					masterColumn: "Id",
					detailColumn: "Event"
				},
				defaultValues: {
					Event: {
						masterColumn: "Id"
					}
				}
			},
			Email: {
				schemaName: "EmailDetailV2",
				filter: {
					masterColumn: "Id",
					detailColumn: "Event"
				},
				defaultValues: {
					Event: {
						masterColumn: "Id"
					}
				},
				filterMethod: "emailDetailFilter"
			},
			EventCampaign: {
				schemaName: "CampaignWithEventDetail",
				filter: {
					masterColumn: "Id",
					detailColumn: "Event"
				}
			}
		}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Name",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24,
						"rowSpan": 1
					}
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Type",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "Type",
					"caption": {
						"bindTo": "Resources.Strings.EventTypeCaption"
					},
					"textSize": 0,
					"contentType": 3,
					"labelConfig": {
						"visible": true
					}
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Owner",
				"values": {
					"layout": {
						"column": 12,
						"row": 1,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "Owner",
					"caption": {
						"bindTo": "Resources.Strings.OwnerCaption"
					},
					"textSize": 0,
					"contentType": 5,
					"labelConfig": {
						"visible": true
					}
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Status",
				"values": {
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "Status",
					"caption": {
						"bindTo": "Resources.Strings.EventStatusCaption"
					},
					"textSize": 0,
					"contentType": 3,
					"labelConfig": {
						"visible": true
					}
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabCaption"
					},
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "group",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.groupCaption"
					},
					"items": [],
					"controlConfig": {
						"collapsed": false
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "group_gridLayout",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "group",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "EndDate",
				"values": {
					"layout": {
						"column": 12,
						"row": 0,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "EndDate",
					"caption": {
						"bindTo": "Resources.Strings.EndDateCaption"
					},
					"textSize": 0,
					"labelConfig": {
						"visible": true
					}
				},
				"parentName": "group_gridLayout",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Goal",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "Goal",
					"caption": {
						"bindTo": "Resources.Strings.GoalCaption"
					},
					"textSize": 0,
					"contentType": 1,
					"labelConfig": {
						"visible": true
					}
				},
				"parentName": "group_gridLayout",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Territory",
				"values": {
					"layout": {
						"column": 12,
						"row": 1,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "Territory",
					"caption": {
						"bindTo": "Resources.Strings.TerritoryCaption"
					},
					"textSize": 0,
					"contentType": 5,
					"labelConfig": {
						"visible": true
					}
				},
				"parentName": "group_gridLayout",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "StartDate",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "StartDate",
					"caption": {
						"bindTo": "Resources.Strings.StartDateCaption"
					}
				},
				"parentName": "group_gridLayout",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Industry",
				"values": {
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "Industry",
					"caption": {
						"bindTo": "Resources.Strings.IndustryCaption"
					},
					"textSize": 0,
					"contentType": 5,
					"labelConfig": {
						"visible": true
					}
				},
				"parentName": "group_gridLayout",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "ActualResponse",
				"values": {
					"layout": {
						"column": 12,
						"row": 2,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "ActualResponse",
					"caption": {
						"bindTo": "Resources.Strings.ActualResponseCaption"
					},
					"textSize": 0,
					"contentType": 1,
					"labelConfig": {
						"visible": true
					}
				},
				"parentName": "group_gridLayout",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "group1",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.group1Caption"
					},
					"items": [],
					"controlConfig": {
						"collapsed": false
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "group1_gridLayout",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "group1",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "PrimaryBudgetedCost",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "PrimaryBudgetedCost",
					"caption": {
						"bindTo": "Resources.Strings.PrimaryBudgetedCostCaption"
					},
					"textSize": 0,
					"labelConfig": {
						"visible": true
					}
				},
				"parentName": "group1_gridLayout",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "PrimaryExpectedRevenue",
				"values": {
					"layout": {
						"column": 12,
						"row": 0,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "PrimaryExpectedRevenue",
					"caption": {
						"bindTo": "Resources.Strings.PrimaryExpectedRevenueCaption"
					},
					"textSize": 0,
					"labelConfig": {
						"visible": true
					}
				},
				"parentName": "group1_gridLayout",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "PrimaryActualCost",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "PrimaryActualCost",
					"caption": {
						"bindTo": "Resources.Strings.PrimaryActualCostCaption"
					},
					"textSize": 0,
					"labelConfig": {
						"visible": true
					}
				},
				"parentName": "group1_gridLayout",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "PrimaryActualRevenue",
				"values": {
					"layout": {
						"column": 12,
						"row": 1,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "PrimaryActualRevenue",
					"caption": {
						"bindTo": "Resources.Strings.PrimaryActualRevenueCaption"
					},
					"enabled": true,
					"textSize": 0,
					"labelConfig": {
						"visible": true
					}
				},
				"parentName": "group1_gridLayout",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "EventPage3Tab",
				"values": {
					"items": [],
					"caption": {
						"bindTo": "Resources.Strings.EventPage3TabCaption"
					}
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "EventPage4Tab",
				"values": {
					"items": [],
					"caption": {
						"bindTo": "Resources.Strings.EventPage4TabCaption"
					}
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "EventPage5Tab",
				"values": {
					"items": [],
					"caption": {
						"bindTo": "Resources.Strings.EventPage5TabCaption"
					}
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 3
			},
			{
				"operation": "insert",
				"parentName": "EventPage5Tab",
				"propertyName": "items",
				"name": "Files",
				"values": {
					itemType: Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"parentName": "EventPage5Tab",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": {"bindTo": "Resources.Strings.NotesGroupCaption"}
				}
			},
			{
				"operation": "insert",
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"name": "Notes",
				"values": {
					contentType: Terrasoft.ContentType.RICH_TEXT,
					layout: {column: 0, row: 0, colSpan: 24},
					labelConfig: {
						visible: false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "EventPage3Tab",
				"propertyName": "items",
				"name": "EventTarget",
				"values": {
					itemType: this.Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"parentName": "EventPage4Tab",
				"propertyName": "items",
				"name": "Activities",
				"values": {
					itemType: Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"parentName": "EventPage4Tab",
				"propertyName": "items",
				"name": "EventProduct",
				"values": {
					itemType: this.Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"parentName": "EventPage4Tab",
				"propertyName": "items",
				"name": "Email",
				"values": {
					itemType: this.Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"parentName": "EventPage4Tab",
				"propertyName": "items",
				"name": "EventCampaign",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"name": "EventTeam",
				"values": {
					itemType: Terrasoft.ViewItemType.DETAIL
				}
			}
		]/**SCHEMA_DIFF*/,
		userCode: {}
	};
});


