Terrasoft.configuration.Structures["CasePageTimeZoneModuleSchema"] = {innerHierarchyStack: ["CasePageTimeZoneModuleSchema"]};
define('CasePageTimeZoneModuleSchemaStructure', ['CasePageTimeZoneModuleSchemaResources'], function(resources) {return {schemaUId:'0cf60a90-4548-49a5-9df4-e42152f464b2',schemaCaption: "CasePageTimeZoneModuleSchema", parentSchemaName: "", schemaName:'CasePageTimeZoneModuleSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CasePageTimeZoneModuleSchema", ["CasePageTimeZoneModuleSchemaResources", "ModalBox", "ServiceHelper",
		"css!CasePageTimeZoneModuleSchemaCSS"],
	function(resources, ModalBox, ServiceHelper) {
		return {
			attributes: {
				"SelectedTimeZone": {
					"dataValueType": Terrasoft.DataValueType.LOOKUP,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isLookup": true
				},
				"TimeZoneList": {
					"dataValueType": Terrasoft.DataValueType.COLLECTION
				}
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.set("TimeZoneList", this.Ext.create(Terrasoft.Collection));
				},

				/**
				 * Event handler clicking on the "Save" button.
				 * @private
				 */
				onOkButtonClick: function() {
					var selectedTimeZone = this.get("SelectedTimeZone");
					if (selectedTimeZone != null) {
						this.setTimeZone(selectedTimeZone);
						ModalBox.close();
					}
				},

				/**
				 * Event handler clicking on the "Cancel" button.
				 * @private
				 */
				onCancelClick: function() {
					ModalBox.close();
					this.sandbox.publish("BackHistoryState");
				},

				/**
				 * Call service for changing time zone.
				 * @private
				 * @param {Object} timeZone
				 */
				setTimeZone: function(timeZone) {
					var columns = {};
					columns.Id = this.Terrasoft.SysValue.CURRENT_USER.value;
					columns.TimeZone = timeZone && timeZone.value;
					var config = this.prepareTimeZoneConfig(columns);
					ServiceHelper.callService(config);
				},

				/**
				 * Save callback.
				 * @private
				 * @param {Object} response Response.
				 */
				saveCallback: function(response) {
					response.message = response.UpdateUserProfileResult || response.UpdateOrCreateUserResult;
					response.success = this.Ext.isEmpty(response.message);
					if (response.success) {
						this.showInformationDialog(
								this.get("Resources.Strings.NeedRestartMessage")
						);
					} else {
						this.showInformationDialog(this.get("Resources.Strings.SaveExceptionMessage"));
						throw new Terrasoft.InvalidOperationException({message: response.message});
					}
				},

				/**
				 * Prepares configuration for update user profile.
				 * @protected
				 * @param {Object} changedColumns Changed columns.
				 * @return {Object}
				 */
				prepareTimeZoneConfig: function(changedColumns) {
					return {
						serviceName: "UserProfileEditService",
						methodName: "UpdateUserProfile",
						scope: this,
						data: {
							jsonObject: this.Ext.encode(changedColumns)
						},
						callback: function() {
							this.saveCallback.call(this, arguments);
						}
					};
				},

				/**
				 * Creates TimeZone entity schema query.
				 * @protected
				 * @return {Terrasoft.EntitySchemaQuery}
				 */
				createTimeZoneQuery: function() {
					var esq = this.Ext.create(Terrasoft.EntitySchemaQuery, {rootSchemaName: "TimeZone"});
					this.initTimeZoneQueryColumns(esq);
					return esq;
				},

				/**
				 * Initializes time zone query columns.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
				 */
				initTimeZoneQueryColumns: function(esq) {
					esq.addColumn("Id");
					esq.addColumn("Name");
					esq.addColumn("Code");
				},

				/**
				 * Event handler for prepare list event of time zone lookup.
				 * @private
				 */
				onPrepareTimeZoneList: function() {
					var esq = this.createTimeZoneQuery();
					esq.getEntityCollection(function(response) {
						if (!response || !response.success) {
							return;
						}
						var list = this.get("TimeZoneList");
						var columnList = {};
						response.collection.each(function(item) {
							columnList[item.get("Id")] = this.prepareTimeZoneListItem(item);
						}, this);
						list.clear();
						list.loadAll(columnList);
					}, this);
				},

				/**
				 * Prepares time zone list item.
				 * @protected
				 * @virtual
				 * @param {Object} item Time zone list item.
				 * @return {Object}
				 */
				prepareTimeZoneListItem: function(item) {
					return {
						value: item.get("Id"),
						displayValue: item.get("Name"),
						code: item.get("Code")
					};
				}
			},
			diff: [
				{
					"operation": "insert",
					"name": "CasePageTimeZoneContainer",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["case-general-timezone-content-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "TimeZoneCaption",
					"parentName": "CasePageTimeZoneContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.TimeZoneModalBoxCaption"
						},
						"classes": {
							"labelClass": ["case-time-zone-control-caption"]
						},
						"markerValue": "case-time-zone-caption-value"
					}
				},
				{
					"operation": "insert",
					"name": "TimeZoneMessage",
					"parentName": "CasePageTimeZoneContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.TimeZoneModalBoxMessage"
						},
						"classes": {
							"labelClass": ["case-time-zone-control-caption-message"]
						},
						"markerValue": "case-time-zone-message-value"
					}
				},

				{
					"operation": "insert",
					"name": "CasePageTimeZoneComboBox",
					"parentName": "CasePageTimeZoneContainer",
					"propertyName": "items",
					"values": {
						"contentType": Terrasoft.ContentType.ENUM,
						"bindTo": "SelectedTimeZone",
						"labelConfig": {"visible": false},
						"controlConfig": {
							"className": "Terrasoft.ComboBoxEdit",
							"prepareList": {
								"bindTo": "onPrepareTimeZoneList"
							},
							"list": {
								"bindTo": "TimeZoneList"
							},
							"classes": ["case-timezone-combo-box-container"]
						}

					}
				},
				{
					"operation": "insert",
					"name": "CasePageTimeZoneButtonContainer",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["case-timezone-button-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SaveButton",
					"parentName": "CasePageTimeZoneButtonContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {
							"bindTo": "Resources.Strings.ButtonOkCaption"
						},
						"click": {"bindTo": "onOkButtonClick"},
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"classes": {"textClass": "case-time-zone-button-group"}
					}
				},
				{
					"operation": "insert",
					"name": "CancelButton",
					"parentName": "CasePageTimeZoneButtonContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {
							"bindTo": "Resources.Strings.CancelButtonCaption"
						},
						"click": {"bindTo": "onCancelClick"},
						"style": Terrasoft.controls.ButtonEnums.style.GRAY,
						"classes": {"textClass": "case-time-zone-button-group"}
					}
				}
			]
		};
	});


