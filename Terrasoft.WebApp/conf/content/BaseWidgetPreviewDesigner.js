Terrasoft.configuration.Structures["BaseWidgetPreviewDesigner"] = {innerHierarchyStack: ["BaseWidgetPreviewDesigner"]};
define('BaseWidgetPreviewDesignerStructure', ['BaseWidgetPreviewDesignerResources'], function(resources) {return {schemaUId:'cbe89c2d-78ba-4edf-9293-f13e4de50fea',schemaCaption: "Base widget preview designer", parentSchemaName: "", schemaName:'BaseWidgetPreviewDesigner',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseWidgetPreviewDesigner", ["BaseWidgetPreviewDesignerResources"], function(resources) {
	var localizeStrings = resources.localizableStrings;
	return {
		messages: {

			/**
			 * @message RerenderModule
			 * Message of re-render module indicator.
			 */
			"RerenderModule": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message GetModuleConfig
			 * Publishing message for section parameters request.
			 */
			"GetModuleConfig": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message PostModuleConfig
			 * Returns card widget parameters which was designed.
			 */
			"PostModuleConfig": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message ChangeHeaderCaption
			 * Changes current page header.
			 */
			"ChangeHeaderCaption": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message BackHistoryState
			 * Notification that state was returned to previous.
			 */
			"BackHistoryState": {
				mode: this.Terrasoft.MessageMode.BROADCAST,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {

			/**
			 * Widget header.
			 */
			"caption": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isRequired": true,
				"value": localizeStrings.NewWidget
			},

			/**
			 * Widget init config.
			 */
			"WidgetInitConfig": {
				"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT
			}
		},
		methods: {

			/**
			 * Returns widget module name.
			 * @protected
			 * @return {String} Returns widget module name.
			 */
			getWidgetModuleName: this.Ext.emptyFn,

			/**
			 * Returns message name for widget configuration.
			 * @protected
			 * @return {String} Returns message name for widget configuration.
			 */
			getWidgetConfigMessage: this.Ext.emptyFn,

			/**
			 * Returns message name for widget updating.
			 * @protected
			 * @virtual
			 * @return {String} Returns message name for widget updating.
			 */
			getWidgetRefreshMessage: this.Ext.emptyFn,

			/**
			 * Informs that state must be rolled back.
			 * @protected
			 */
			backHistoryState: function() {
				this.sandbox.publish("BackHistoryState");
			},

			/**
			 * Returns the object of the correlation properties of the module and the widget module settings.
			 * @protected
			 * @return {Object} Object of the correlation properties of the module and the widget module settings.
			 */
			getWidgetModulePropertiesTranslator: function() {
				return {"caption": "caption"};
			},

			/**
			 * Saves widget option changes.
			 */
			save: function() {
				if (this.validate()) {
					this.sandbox.publish("PostModuleConfig", this.getWidgetConfig(), [this.sandbox.id]);
					this.backHistoryState();
				}
			},

			/**
			 * Cancels widget option changes.
			 */
			cancel: function() {
				this.backHistoryState();
			},

			/**
			 * Returns can refresh widget tag.
			 * @protected
			 * @return {Boolean} #an refresh widget tag.
			 */
			canRefreshWidget: function() {
				var canRefresh = this.get("moduleLoaded") && this.validate();
				return Boolean(canRefresh);
			},

			/**
			 * Renews widget.
			 * @protected
			 */
			refreshWidget: function() {
				var canRefresh = this.canRefreshWidget();
				if (canRefresh) {
					var widgetRefreshMessage = this.getWidgetRefreshMessage();
					if (widgetRefreshMessage) {
						this.sandbox.publish(widgetRefreshMessage, this.getDesignWidgetConfig(),
							[this.getWidgetPreviewModuleId()]);
					}
				}
			},

			/**
			 * Returns object with actual widget options.
			 * @protected
			 * @return {Object} Returns object with actual widget options.
			 */
			getWidgetConfig: function() {
				var widgetConfig = {};
				var widgetModulePropertiesTranslator = this.getWidgetModulePropertiesTranslator();
				Terrasoft.each(this.columns, function(propertyValue, propertyName) {
					var widgetPropertyName = widgetModulePropertiesTranslator[propertyName];
					if (widgetPropertyName) {
						var value = this.get(propertyName);
						widgetConfig[widgetPropertyName] = (value && (value.Name || value.value)) || value;
					}
				}, this);
				return widgetConfig;
			},

			/**
			 * Returns the current settings of the widget in the design mode.
			 * @protected
			 * @return {Object} The current settings of the widget in the design mode.
			 */
			getDesignWidgetConfig: function() {
				var widgetConfig = this.getWidgetConfig();
				widgetConfig.ShowSettingsButton = false;
				widgetConfig.ShowContextMenu = false;
				return widgetConfig;
			},

			/**
			 * Returns module identifier.
			 * @protected
			 * @return {String} The module identifier.
			 */
			getWidgetPreviewModuleId: function() {
				return this.sandbox.id + this.name;
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([
					function() {
						this.initWidgetDesigner(function() {
							this.refreshWidget();
							var getWidgetConfigMessage = this.getWidgetConfigMessage();
							if (getWidgetConfigMessage) {
								this.sandbox.subscribe(getWidgetConfigMessage, function() {
									return this.getDesignWidgetConfig();
								}, this, [this.getWidgetPreviewModuleId()]);
							}
							this.sandbox.publish("ChangeHeaderCaption", {
								caption: this.get("Resources.Strings.WidgetDesignerCaption"),
								moduleName: this.name
							});
							callback.call(scope);
						}, this);
					}, this
				]);
			},

			/**
			 * Initialization of the designer.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			initWidgetDesigner: function(callback, scope) {
				var widgetConfig = this.getWidgetInitConfig();
				if (!widgetConfig) {
					this.set("moduleLoaded", true);
					callback.call(scope);
					return;
				}
				this.setWidgetModuleProperties(widgetConfig, callback, scope);
			},

			/**
			 * Sets widget module properties.
			 * @protected
			 * @param {Object} widgetConfig Widget config for initialization.
			 * @param {Function} callback Callback function.
			 * * @param {Object} scope Callback scope.
			 */
			setWidgetModuleProperties: function(widgetConfig, callback, scope) {
				var widgetModulePropertiesTranslator = this.getWidgetModulePropertiesTranslator();
				Terrasoft.each(this.columns, function(columnConfig, columnName) {
					var widgetPropertyName = widgetModulePropertiesTranslator[columnName];
					if (widgetPropertyName && !Ext.isEmpty(widgetConfig[widgetPropertyName])) {
						var propertyValue = widgetConfig[widgetPropertyName];
						if (Terrasoft.isLookupDataValueType(columnConfig.dataValueType)) {
							this.setAttributeDisplayValue(columnName, propertyValue);
						} else {
							this.set(columnName, propertyValue);
						}
					}
				}, this);
				this.Ext.callback(callback, scope || this);
			},

			/**
			 * Returns widget config for initialization.
			 * @protected
			 * @return {Object} Widget config for initialization.
			 */
			getWidgetInitConfig: function() {
				return this.get("WidgetInitConfig") ||
					this.sandbox.publish("GetModuleConfig", null, [this.sandbox.id]);
			},

			/**
			 * Sets properties value.
			 * @protected
			 * @param {String} propertyName Property name.
			 * @param {Object} propertyValue Value.
			 */
			setAttributeDisplayValue: function(propertyName, propertyValue) {
				this.set(propertyName, propertyValue);
			},

			/**
			 * @inheritDoc Terrasoft.BaseModel#onDataChange
			 * @override
			 */
			onDataChange: function(model) {
				this.callParent(arguments);
				if (this.hasChanges(model && model.changed)) {
					this.refreshWidget();
				}
			},

			/**
			 * Returns true - when changed contain one or more available properties, false - otherwise.
			 * @protected
			 * @param {Object} changed Changed properties.
			 * @return {Boolean} True - when changed contain one or more available properties, false - otherwise.
			 */
			hasChanges: function(changed) {
				var changedKeys = this.Ext.Object.getKeys(changed);
				var availableProperties = this.getWidgetModulePropertiesTranslator();
				var availablePropertiesKeys = this.Ext.Object.getKeys(availableProperties);
				var diff = this.Ext.Array.difference(changedKeys, availablePropertiesKeys);
				return diff.length !== changedKeys.length;
			},

			/**
			 * Loads widget module.
			 */
			loadWidgetModule: function() {
				var widgetModuleName = this.getWidgetModuleName();
				if (widgetModuleName) {
					var moduleId = this.getWidgetPreviewModuleId();
					var rendered = this.sandbox.publish("RerenderModule", {
						renderTo: widgetModuleName
					}, [moduleId]);
					if (!rendered) {
						this.sandbox.loadModule(widgetModuleName, {
							renderTo: "WidgetModule",
							id: moduleId
						});
					}
				}
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "WidgetDesignerContainer",
				"values": {
					"id": "WidgetDesignerContainer",
					"selectors": {
						"wrapEl": "#WidgetDesignerContainer"
					},
					"classes": {
						"textClass": "center-panel",
						"wrapClassName": ["widget-designer-container"]
					},
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "HeaderContainer",
				"parentName": "WidgetDesignerContainer",
				"propertyName": "items",
				"values": {
					"id": "HeaderContainer",
					"selectors": {
						"wrapEl": "#HeaderContainer"
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"name": "SaveButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {
						"bindTo": "Resources.Strings.SaveButtonCaption"
					},
					"classes": {
						"textClass": "actions-button-margin-right"
					},
					"click": {
						"bindTo": "save"
					},
					"style": "green",
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 2
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"name": "CancelButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {
						"bindTo": "Resources.Strings.CancelButtonCaption"
					},
					"classes": {
						"textClass": "actions-button-margin-right"
					},
					"click": {
						"bindTo": "cancel"
					},
					"style": "default",
					"layout": {
						"column": 4,
						"row": 0,
						"colSpan": 2
					}
				}
			},
			{
				"operation": "insert",
				"name": "FooterContainer",
				"parentName": "WidgetDesignerContainer",
				"propertyName": "items",
				"values": {
					"id": "FooterContainer",
					"selectors": {
						"wrapEl": "#FooterContainer"
					},
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "WidgetModule",
				"parentName": "FooterContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 11,
						"row": 0,
						"colSpan": 13,
						"rowSpan": 5
					},
					"itemType": Terrasoft.ViewItemType.MODULE,
					"afterrender": {
						"bindTo": "loadWidgetModule"
					},
					"afterrerender": {
						"bindTo": "loadWidgetModule"
					}
				}
			},
			{
				"operation": "insert",
				"name": "WidgetProperties",
				"parentName": "FooterContainer",
				"propertyName": "items",
				"values": {
					"id": "WidgetProperties",
					"selectors": {
						"wrapEl": "#WidgetProperties"
					},
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 10
					},
					"controlConfig": {
						"collapsed": false
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Caption",
				"parentName": "WidgetProperties",
				"propertyName": "items",
				"values": {
					"bindTo": "caption",
					"labelConfig": {
						"visible": true,
						"caption": {
							"bindTo": "Resources.Strings.CaptionLabel"
						}
					}
				}
			}
		]
	};
});


