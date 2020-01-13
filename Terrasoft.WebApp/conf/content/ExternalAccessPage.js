Terrasoft.configuration.Structures["ExternalAccessPage"] = {innerHierarchyStack: ["ExternalAccessPage"], structureParent: "BaseModulePageV2"};
define('ExternalAccessPageStructure', ['ExternalAccessPageResources'], function(resources) {return {schemaUId:'5bcce60d-3a49-4172-adf1-043d592ca907',schemaCaption: "Edit page: \"External access\"", parentSchemaName: "BaseModulePageV2", schemaName:'ExternalAccessPage',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ExternalAccessPage", [
	"ExternalAccessUtilities"
], function() {
	return {
		entitySchemaName: "ExternalAccess",
		attributes: {
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"IsolatedRecordsDetail": {
				"schemaName": "IsolatedRecordDetail",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "ExternalAccess"
				}
			},
			"SessionDetail": {
				"schemaName": "SessionDetailV2",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "ExternalAccess"
				}
			},
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "ExternalAccessFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "ExternalAccess"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		mixins: {
			ExternalAccessUtilities: "Terrasoft.ExternalAccessUtilities"
		},
		methods: {

			/**
			 * @param {Object} responseObject Response of service that deactivates external accesses.
			 * @private
			 */
			_processDeactivationResponse: function(responseObject) {
				if (!Terrasoft.isEmptyObject(responseObject)) {
					this.reloadEntity();
				}
			},

			/**
			 * @override
			 * @inheritdoc
			 */
			getActions: function() {
				const actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuItem({
					Type: "Terrasoft.MenuSeparator",
					Caption: Terrasoft.emptyString
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": {"bindTo": "getDeactivationActionCaption"},
					"Tag": this.deactivateExternalAccessRecord.name,
					"Enabled": {"bindTo": "getIsDeactivationActionEnabled"}
				}));
				return actionMenuItems;
			},

			/**
			 * Returns whether deactivation action should be active
			 * @return {Boolean} Whether deactivation action should be active.
			 */
			getIsDeactivationActionEnabled: function() {
				return this.$IsActive;
			},

			/**
			 * Deactivates current access record.
			 */
			deactivateExternalAccessRecord: function() {
				const accessIds = [this.get(this.primaryColumnName)];
				this.deactivateAccesses(accessIds, this._processDeactivationResponse, this);
			}

		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "AccessReason",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "StartDate",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "DueDate",
				"values": {
					"layout": {
						"column": 12,
						"row": 1,
						"layoutName": "Header"
					},
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Grantor",
				"values": {
					"layout": {
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "IsDataIsolationEnabled",
				"values": {
					"layout": {
						"column": 0,
						"row": 3,
						"layoutName": "Header"
					},
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "IsActive",
				"values": {
					"layout": {
						"column": 12,
						"row": 2,
						"layoutName": "Header"
					},
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "IsSystemOperationsRestricted",
				"values": {
					"layout": {
						"column": 12,
						"row": 3,
						"layoutName": "Header"
					},
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "SessionsTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.SessionsTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs"
			},
			{
				"operation": "insert",
				"name": "SessionDetail",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL,
					"markerValue": "sessions-detail"
				},
				"parentName": "SessionsTab",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "IsolatedRecordsTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.IsolatedRecordsTabCaption"
					},
					"items": [],
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs"
			},
			{
				"operation": "insert",
				"name": "IsolatedRecordsDetail",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL,
					"markerValue": "isolated-records-detail"
				},
				"parentName": "IsolatedRecordsTab",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 2
				},
				"parentName": "Tabs",
				"propertyName": "tabs"
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "Notes",
					"dataValueType": 1,
					"contentType": 4,
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
			}
		]/**SCHEMA_DIFF*/
	};
});


