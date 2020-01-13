Terrasoft.configuration.Structures["VwProcessLibPageV2"] = {innerHierarchyStack: ["VwProcessLibPageV2"], structureParent: "BaseVwProcessLibPageV2"};
define('VwProcessLibPageV2Structure', ['VwProcessLibPageV2Resources'], function(resources) {return {schemaUId:'59c6b110-4c31-401a-9f67-465ca116dfa8',schemaCaption: "\"Process library\" section edit page schema", parentSchemaName: "BaseVwProcessLibPageV2", schemaName:'VwProcessLibPageV2',parentSchemaUId:'90bd89d6-a40d-400a-bcbc-2e51ded3d928',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseVwProcessLibPageV2
 */
define("VwProcessLibPageV2", [], function() {
	return {
		entitySchemaName: "VwProcessLib",
		messages: {

			/**
			 * @message ActiveProcessSchemaVersionChanged
			 * Subscribed on modification event of the active version schema.
			 * @param {Object} Change data object.
			 */
			"ActiveProcessSchemaVersionChanged": {
				mode: this.Terrasoft.MessageMode.BROADCAST,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		details: /**SCHEMA_DETAILS*/{
			ProcessVersions: {
				schemaName: "ProcessVersionsDetail",
				filterMethod: "processVersionsDetailFilterMethod"
			}
		}/**SCHEMA_DETAILS*/,
		methods: {

			/**
			 * Creates filters for process versions detail.
			 * @private
			 */
			processVersionsDetailFilterMethod: function() {
				var masterRecordId = this.get("Parent").value || this.get("SysSchemaId");
				return Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"VersionParentId", masterRecordId, Terrasoft.DataValueType.GUID);
			},

			/**
			 * @inheritdoc Terrasoft.BasePagev2#subscribeDetailsEvents
			 * @overridden
			 */
			subscribeDetailsEvents: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("ActiveProcessSchemaVersionChanged", this.onActiveVersionChanged, this);
			},

			/**
			 * Handles modification event of the setting active process version.
			 * @protected
			 * @param {Object} changeData Change data object.
			 * @param {String} changeData.activeVersionId Identifier of the active version schema.
			 */
			onActiveVersionChanged: function(changeData) {
				this.set("PrimaryColumnValue", changeData.activeVersionId);
				this.reloadEntity();
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "Caption",
				"values": {
					"enabled": false
				}
			},
			{
				"operation": "merge",
				"name": "Name",
				"values": {
					"enabled": false
				}
			},
			{
				"operation": "merge",
				"name": "Enabled",
				"values": {
					"enabled": false
				}
			},
			{
				"operation": "merge",
				"name": "SysPackage",
				"values": {
					"enabled": false
				}
			},
			{
				"operation": "insert",
				"name": "Version",
				"values": {
					"layout": {
						"column": 12,
						"row": 1,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "Version",
					"textSize": "Default",
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "AddToRunButton",
				"values": {
					"layout": {
						"column": 0,
						"row": 3,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "AddToRunButton",
					"textSize": "Default"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "VersionsTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0,
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.VersionsTabCaption"
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ProcessVersions",
				"parentName": "VersionsTab",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL
				}
			}
		]/**SCHEMA_DIFF*/,
		rules: {},
		userCode: {}
	};
});


