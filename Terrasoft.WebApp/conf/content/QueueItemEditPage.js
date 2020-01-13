Terrasoft.configuration.Structures["QueueItemEditPage"] = {innerHierarchyStack: ["QueueItemEditPage"]};
define('QueueItemEditPageStructure', ['QueueItemEditPageResources'], function(resources) {return {schemaUId:'e9a81893-69c3-4d2d-b86b-e99f468dfa3c',schemaCaption: "Edit page - Queue item data", parentSchemaName: "", schemaName:'QueueItemEditPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("QueueItemEditPage", ["terrasoft", "css!QueueItemEditPageCSS"], function(Terrasoft) {
	return {
		messages: {
			/**
			 * @message QueueItemPostponed
			 * ########### ##### ######### ######## ########## ## ######### ######## #######.
			 */
			"QueueItemPostponed": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message CloseQueueItemEdit
			 * ########### ### ######## ######## ###### ######## #######.
			 */
			"CloseQueueItemEdit": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		mixins: {},
		attributes: {
			"Id": {
				"isRequired": false
			},
			"NextProcessingDate": {
				"isRequired": true
			}
		},
		methods: {

			updateQueueItemData: function(callback) {
				var primaryColumnValue = this.get("PrimaryColumnValue");
				var updateQuery = this.Ext.create("Terrasoft.UpdateQuery", {
					rootSchemaName: this.entitySchemaName
				});
				updateQuery.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, this.primaryColumnName, primaryColumnValue));
				updateQuery.setParameterValue("NextProcessingDate", this.get("NextProcessingDate"),
					this.Terrasoft.DataValueType.DATE_TIME);
				updateQuery.execute(callback);
			},

			init: function(callback, scope) {
				this.callParent([function() {
					var primaryColumnValue = this.get("PrimaryColumnValue");
					this.loadEntity(primaryColumnValue, callback.bind(scope || this));
				}, this]);
			},

			onRender: function() {
				this.callParent(arguments);
				this.hideBodyMask();
			},

			onSaveButtonClick: function() {
				if (this.validate()) {
					this.updateQueueItemData(function() {
						var sandbox = this.sandbox;
						//sandbox.publish("BackHistoryState");
						sandbox.publish("QueueItemPostponed");
					}.bind(this));
				}
			},

			onCancelButtonClick: function() {
				this.sandbox.publish("CloseQueueItemEdit", null, [this.sandbox.id]);
			}
		},
		diff:  /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "QueueItemDataContainer",
				"propertyName": "items",
				"values": {
					"id": "QueueItemDataContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"selectors": {
						"wrapEl": "#QueueItemDataContainer"
					},
					"classes": {
						"wrapClassName": ["QueueItemDataContainer"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "NextProcessingDate",
				"parentName": "QueueItemDataContainer",
				"propertyName": "items",
				"values": {
					"bindTo": "NextProcessingDate",
					"layout": {"column": 0, "row": 1, "colSpan": 24}
				}
			},
			{
				"operation": "insert",
				"name": "QueueItemButtonsContainer",
				"propertyName": "items",
				"values": {
					"id": "QueueItemDataButtons",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"selectors": {
						"wrapEl": "#QueueItemDataButtons"
					},
					"classes": {
						"wrapClassName": ["queue-item-edit-buttons"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "QueueItemButtonsContainer",
				"propertyName": "items",
				"name": "SaveButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
					"click": {"bindTo": "onSaveButtonClick"},
					"visible": true
				}
			},
			{
				"operation": "insert",
				"parentName": "QueueItemButtonsContainer",
				"propertyName": "items",
				"name": "CancelButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
					"click": {"bindTo": "onCancelButtonClick"},
					"visible": true
				}
			}
		]
	}
});


