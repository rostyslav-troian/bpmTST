Terrasoft.configuration.Structures["ServiceItemPage"] = {innerHierarchyStack: ["ServiceItemPage"], structureParent: "BaseModulePageV2"};
define('ServiceItemPageStructure', ['ServiceItemPageResources'], function(resources) {return {schemaUId:'f14c93b3-06c4-48ae-bb2a-2092645614ad',schemaCaption: "Edit page schema - \"Services\" section", parentSchemaName: "BaseModulePageV2", schemaName:'ServiceItemPage',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ServiceItemPage", ["CaseServiceUtility"],
	function() {
		return {
			entitySchemaName: "ServiceItem",
			details: /**SCHEMA_DETAILS*/{
				"Files": {
					"schemaName": "FileDetailV2",
					"entitySchemaName": "ServiceItemFile",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "ServiceItem"
					}
				},
				"Cases": {
					"schemaName": "CaseInServiceItemDetail",
					"entitySchemaName": "Case",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "ServiceItem"
					}
				}
			}/**SCHEMA_DETAILS*/,
			mixins: {
				/**
				 * @class CaseServiceUtility implements work with service item on page.
				 */
				CaseServiceUtility: "Terrasoft.CaseServiceUtility"
			},
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
					"name": "Status",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "Status",
						"contentType": this.Terrasoft.ContentType.ENUM
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 4
				},
				{
					"operation": "insert",
					"name": "HistoryTab",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.HistoryTabCaption"
						},
						"items": []
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 2
				},
				{
					"operation": "insert",
					"name": "ReactionTimeValue",
					"values": {
						"layout": {
							"column": 22,
							"row": 1,
							"colSpan": 2,
							"rowSpan": 1
						},
						"bindTo": "ReactionTimeValue",
						"labelConfig": {
							"visible": false
						}
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 3
				},
				{
					"operation": "insert",
					"name": "ReactionTimeUnit",
					"values": {
						"layout": {
							"column": 12,
							"row": 1,
							"colSpan": 9,
							"rowSpan": 1
						},
						"bindTo": "ReactionTimeUnit",
						"contentType": this.Terrasoft.ContentType.ENUM
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 2
				},
				{
					"operation": "insert",
					"name": "SolutionTimeValue",
					"values": {
						"layout": {
							"column": 22,
							"row": 2,
							"colSpan": 2,
							"rowSpan": 1
						},
						"bindTo": "SolutionTimeValue",
						"labelConfig": {
							"visible": false
						}
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 4
				},
				{
					"operation": "insert",
					"name": "SolutionTimeUnit",
					"values": {
						"layout": {
							"column": 12,
							"row": 2,
							"colSpan": 9,
							"rowSpan": 1
						},
						"bindTo": "SolutionTimeUnit",
						"contentType": this.Terrasoft.ContentType.ENUM
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 5
				},
				{
					"operation": "insert",
					"name": "CaseCategory",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "CaseCategory",
						"contentType": this.Terrasoft.ContentType.ENUM
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 6
				},
				{
					"operation": "insert",
					"name": "NotesFilesTab",
					"values": {
						"items": [],
						"caption": {
							"bindTo": "Resources.Strings.NotesFilesTabCaption"
						}
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 4
				},
				{
					"operation": "insert",
					"name": "Files",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					},
					"parentName": "NotesFilesTab",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "Cases",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					},
					"parentName": "HistoryTab",
					"propertyName": "items",
					"index": 0
				},

				{
					"operation": "insert",
					"name": "NotesControlGroup",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": {
							"bindTo": "Resources.Strings.NotesGroupCaption"
						}
					},
					"parentName": "NotesFilesTab",
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "Notes",
					"values": {
						"contentType": this.Terrasoft.ContentType.RICH_TEXT,
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"labelConfig": {
							"visible": false
						},
						"controlConfig": {
							"imageLoaded": {
								"bindTo": "insertImagesToNotes"
							},
							"images": {
								"bindTo": "NotesImagesCollection"
							}
						}
					},
					"parentName": "NotesControlGroup",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "Calendar",
					"values": {
						"layout": {
							"column": 12,
							"row": 3,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "Calendar",
						"caption": {
							"bindTo": "Resources.Strings.CalendarCaption"
						},
						"contentType": this.Terrasoft.ContentType.ENUM,
						"labelConfig": {
							"visible": true
						}
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 7
				}
			]/**SCHEMA_DIFF*/,
			attributes: {
				"ReactionTimeUnit": {
					"lookupListConfig": {
						orders: [
							{columnPath: "Position"}
						]
					}
				},
				"SolutionTimeUnit": {
					"lookupListConfig": {
						orders: [
							{columnPath: "Position"}
						]
					}
				},
				"Calendar": {
					lookupListConfig: {
						hideActions: true
					}
				}

			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BasePageV2#initContextHelp
				 * @overridden
				 */
				initContextHelp: function() {
					this.set("ContextHelpId", 1061);
					this.callParent(arguments);
				},
				/**
				 * @inheritdoc Terrasoft.BasePageV2#save
				 * @overridden
				 */
				save: function() {
					this.setAbsoluteValue("ReactionTimeValue");
					this.setAbsoluteValue("SolutionTimeValue");
					this.callParent(arguments);
				}
			},
			rules: {},
			userCode: {}
		};
	});


