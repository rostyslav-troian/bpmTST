Terrasoft.configuration.Structures["NotificationsSettingsSchema"] = {innerHierarchyStack: ["NotificationsSettingsSchema"]};
define('NotificationsSettingsSchemaStructure', ['NotificationsSettingsSchemaResources'], function(resources) {return {schemaUId:'8163ce73-4f31-4223-a32a-02aeaa4287e7',schemaCaption: "Schema of notifications settings", parentSchemaName: "", schemaName:'NotificationsSettingsSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("NotificationsSettingsSchema", ["DesktopPopupNotification"],
	function(DesktopPopupNotification) {
		return {
			entitySchemaName: "NotificationsSettings",
			attributes: {
				/**
				 * State of popups.
				 * @type {Boolean}
				 */
				"PopupsStateFlag": {
					name: "PopupsStateFlag",
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {
				/**
				 * @inheritDoc Terrasoft.BaseViewModel#init
				 * @overridden
				 */
				init: function() {
					this.initPopupsState();
					this.initHeader();
					this.callParent(arguments);
				},

				/**
				 * Initialize header of page.
				 */
				initHeader: function() {
					var headerCaption = this.get("Resources.Strings.PageTitle");
					this.sandbox.publish("ChangeHeaderCaption", {
						caption: headerCaption,
						dataViews: new this.Terrasoft.Collection()
					});
					this.sandbox.subscribe("NeedHeaderCaption", function() {
						this.sandbox.publish("InitDataViews", {caption: headerCaption});
					}, this);
				},

				/**
				 * Save all notifications settings.
				 */
				saveSettings: function() {
					this.savePopupsState();
				},

				/**
				 * Discards changes.
				 */
				cancelChanges: function() {
					this.goBack();
				},

				/**
				 * Returns to previous state of history.
				 * @private
				 */
				goBack: function() {
					this.sandbox.publish("BackHistoryState");
				},

				/**
				 * Save state of popups.
				 * @private
				 */
				savePopupsState: function() {
					if (DesktopPopupNotification.getPermissionLevel() !== DesktopPopupNotification.PermissionType.GRANTED) {
						DesktopPopupNotification.requestPermission(this.setPopupsState, this);
					} else {
						this.setPopupsState();
					}
				},

				/**
				 * Sets state of popups.
				 * @private
				 */
				setPopupsState: function() {
					var state = this.get("PopupsStateFlag");
					DesktopPopupNotification.setNotificationsState(state, this.goBack.bind(this));
				},

				/**
				 * Initialize state of popups.
				 * @private
				 */
				initPopupsState: function() {
					DesktopPopupNotification.getNotificationsState(function(enabled) {
						this.set("PopupsStateFlag", enabled);
					}, this);
				}
			},
			diff: [{
				"operation": "insert",
				"name": "NotificationsSettingsContainer",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			}, {
				"operation": "insert",
				"name": "topSettings",
				"parentName": "NotificationsSettingsContainer",
				"propertyName": "items",
				"values": {
					"id": "topSettings",
					"selectors": {"wrapEl": "#topSettings"},
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["top-settings-container"],
					"items": []
				}
			}, {
				"operation": "insert",
				"name": "SaveButton",
				"parentName": "topSettings",
				"propertyName": "items",
				"values": {
					"id": "SaveButton",
					"markerValue": "SaveButton",
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"click": {"bindTo": "saveSettings"},
					"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
					"selectors": {"wrapEl": "#rightPanelCloseButton"},
					"style": this.Terrasoft.controls.ButtonEnums.style.GREEN,
					"tag": "save"
				}
			}, {
				"operation": "insert",
				"name": "CancelButton",
				"parentName": "topSettings",
				"propertyName": "items",
				"values": {
					"id": "CancelButton",
					"markerValue": "CancelButton",
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"click": {"bindTo": "cancelChanges"},
					"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
					"classes": {"textClass": ["cancel-button"]},
					"selectors": {"wrapEl": "#rightPanelCloseButton"},
					"style": this.Terrasoft.controls.ButtonEnums.style.DEFAULT,
					"tag": "cancel"
				}
			}, {
				"operation": "insert",
				"name": "PopupsStateCheckBoxContainer",
				"parentName": "NotificationsSettingsContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["check-box-container", "stateflag-container"],
					"items": []
				}
			}, {
				"operation": "insert",
				"parentName": "PopupsStateCheckBoxContainer",
				"propertyName": "items",
				"name": "PopupsStateCheckBox",
				"classes": ["t-checkboxedit"],
				"wrapClass": ["t-checkboxedit"],
				"values": {
					"bindTo": "PopupsStateFlag",
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.PopupsState"}
					}
				}
			}]
		};
	});


