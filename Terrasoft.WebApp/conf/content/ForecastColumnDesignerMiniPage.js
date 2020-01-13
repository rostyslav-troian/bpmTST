Terrasoft.configuration.Structures["ForecastColumnDesignerMiniPage"] = {innerHierarchyStack: ["ForecastColumnDesignerMiniPage"], structureParent: "BaseMiniPage"};
define('ForecastColumnDesignerMiniPageStructure', ['ForecastColumnDesignerMiniPageResources'], function(resources) {return {schemaUId:'d7f6fd96-04ba-4ec8-8a87-551d9c2a5b9f',schemaCaption: "Forecast column designer page", parentSchemaName: "BaseMiniPage", schemaName:'ForecastColumnDesignerMiniPage',parentSchemaUId:'8e06a577-08e4-424e-bd89-798a34e1b928',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ForecastColumnDesignerMiniPage", ["ForecastConstants", "css!ForecastColumnDesignerMiniPage"],
	function(ForecastConstants) {
		return {
			entitySchemaName: "ForecastColumn",
			properties: {
				loadedModuleId: "",
				forecastServiceName: "forecast.api"
			},
			messages: {
				/**
				 * Gets column config from loaded module.
				 */
				"GetColumnConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * Sign forecast column saved.
				 */
				"ForecastColumnSaved": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {
				/**
				 * @inheritDoc BaseMiniPage#MiniPageModes
				 * @override
				 */
				"MiniPageModes": {
					"value": [
						this.Terrasoft.ConfigurationEnums.CardOperation.ADD,
						this.Terrasoft.ConfigurationEnums.CardOperation.EDIT
					]
				},

				/**
				 * Column title.
				 */
				"Title": {
					"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					"isRequired": true,
					"value": ""
				},

				/**
				 * Column type.
				 */
				"Type": {
					"isRequired": true,
					"onChange": "switchColumnEditor"
				},

				/**
				 * Sign of showing checkbox.
				 */
				"ShowHidingCheckbox": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				}
			},
			methods: {

				/**
				 * @inheritDoc BaseMiniPage#onEntityInitialized
				 * @protected
				 * @override
				 */
				onEntityInitialized: function() {
					this.$OldType = this.$Type;
					this.callParent(arguments);
				},

				/**
				 * @inheritDoc BaseMiniPage#getMiniPageHeader
				 * @protected
				 * @override
				 */
				getMiniPageHeader: function() {
					return this.Ext.String.format(
						this.get("Resources.Strings.HeaderCaption"), this.$Title || "");
				},

				/**
				 * Switches type of editor.
				 * @param {Backbone.Model} model View model.
				 * @param {Object} selectedItem Selected item.
				 * @protected
				 * @virtual
				 */
				switchColumnEditor: function(model, selectedItem) {
					switch (selectedItem.value) {
						case ForecastConstants.ColumnType.ObjectValue:
							this._loadColumnDesignerSchema("ValueFromObjectColumnDesigner", {
								forecastSourceItemName: this.$forecastSourceItemName
							});
							break;
						case ForecastConstants.ColumnType.Editable:
							this._loadColumnDesignerSchema("");
							break;
						case ForecastConstants.ColumnType.Formula:
							this._loadColumnDesignerSchema("FormulaColumnDesigner", {
								ForecastSheetId: this.$Sheet.value
							});
							break;
						default:
							break;
					}
					this.$ShowHidingCheckbox = selectedItem.value !== ForecastConstants.ColumnType.Editable;
				},

				/**
				 * @private
				 */
				_getModuleId: function(schemaName) {
					return this.sandbox.id + "_" + schemaName;
				},

				/**
				 * @private
				 */
				_loadColumnDesignerSchema: function(schemaName, viewModelInitialValues) {
					if (this.loadedModuleId) {
						this.sandbox.unloadModule(this.loadedModuleId);
					}
					if (!schemaName) {
						return;
					}
					this.loadedModuleId = this._getModuleId(schemaName);
					const viewModelConfig = {
						ColumnSettings: this.isNotEmpty(this.$Settings)
							? this.Terrasoft.decode(this.$Settings)
							: {}
					};
					this.Ext.apply(viewModelConfig, viewModelInitialValues);
					this.sandbox.loadModule("BaseSchemaModuleV2", {
						id: this.loadedModuleId,
						renderTo: "ColumnEditorWrapContainer",
						instanceConfig: {
							generateViewContainerId: false,
							useHistoryState: false,
							schemaName: schemaName,
							isSchemaConfigInitialized: true,
							parameters: {
								viewModelConfig: viewModelConfig
							}
						},
						keepAlive: true
					});
				},

				/**
				 * @private
				 */
				_handleEditableColumnType: function() {
					if (this.$Type.value === ForecastConstants.ColumnType.Editable) {
						this.$IsHide = false;
						if (this._isTypeChanged() && this.isEditMode()) {
							this.$Settings = null;
						}
					}
				},

				/**
				 * @inheritDoc Terrasoft.BaseMiniPage#save
				 * @override
				 */
				save: function() {
					const columnConfig = this.sandbox.publish("GetColumnConfig", null, [this.loadedModuleId], this);
					if (this._isPreventSaving(columnConfig)) {
						this.validate();
						return;
					}
					if (this.isNotEmpty(columnConfig)) {
						this.$Settings = this.Terrasoft.encode(columnConfig);
					}
					this._handleEditableColumnType();
					const parentMethod = this.getParentMethod(this, arguments);
					this._validateColumn(function () {
						if (this._isTypeChanged() && this.isEditMode()) {
							this._deleteOldCells(parentMethod);
						} else {
							this.Ext.callback(parentMethod, this);
						}
					}, this);

				},

				/**
				 * @private
				 */
				_isPreventSaving: function(columnConfig) {
					return this.isEmpty(this.$Type) || (this.isEmpty(columnConfig) &&
						this.$Type.value !== ForecastConstants.ColumnType.Editable);
				},

				/**
				 * @private
				 */
				_isTypeChanged: function() {
					const newTypeValue = this.$Type && this.$Type.value;
					const oldTypeValue = this.$OldType && this.$OldType.value;
					return newTypeValue !== oldTypeValue;
				},

				/**
				 * @private
				 */
				_deleteOldCells: function(callback) {
					const config = {
						serviceName: this.forecastServiceName,
						methodName: "forecast/cells/delete",
						data: {
							forecastId: this.$Sheet.value,
							columnId: this.$Id
						}
					};
					this.callService(config, callback, this);
				},

				/**
				 * @private
				 */
				_validateColumn: function(callback) {
					const config = {
						serviceName: this.forecastServiceName,
						methodName: "forecast/column/validate",
						data: {
							columnTypeId: this.$Type.value,
							settings: this.$Settings
						}
					};
					this.callService(config, function(response) {
						response = response.GetIsValidColumnResult;
						if (response && response.success) {
							this.Ext.callback(callback, this);
							return;
						}
						this.showInformationDialog(response.errorInfo.message);
					}, this);
				},

				/**
				 * @inheritDoc Terrasoft.BaseMiniPage#onSaved
				 * @override
				 */
				onSaved: function() {
					this.sandbox.publish("ForecastColumnSaved", null, [this.sandbox.id], this);
					this.callParent(arguments);
				},

				/**
				 * Returns sign of new mode.
				 * @return {Boolean} True if is not new mode.
				 */
				isNotNewMode: function() {
					return !this.isNewMode();
				},

				/**
				 * Deletes column.
				 */
				deleteColumn: function() {
					const config = {
						serviceName: this.forecastServiceName,
						methodName: "forecast/column/delete",
						data: {
							columnId: this.$Id,
							sheetId: this.$Sheet.value
						}
					};
					this.callService(config, function(response) {
						response = response.DeleteColumnResult;
						if (response && response.success) {
							this.sandbox.publish("ForecastColumnSaved", null, [this.sandbox.id], this);
							this.close();
							return;
						}
						this.showInformationDialog(response.errorInfo.message);
					}, this);
				},

				/**
				 * @inheritDoc Terrasoft.BaseSchemaViewModel#destroy
				 * @override
				 */
				destroy: function() {
					this.sandbox.unloadModule(this.loadedModuleId);
					this.callParent(arguments);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "AlignableMiniPageContainer",
					"values": {
						"wrapClass": [
							"minipage-alignable-container",
							"forecast-column-designer-alignable-container"
						]
					}
				},
				{
					"operation": "merge",
					"name": "MiniPageContentContainer",
					"values": {
						"wrapClass": [
							"minipage-content-container",
							"forecast-column-designer-container"
						]
					}
				},
				{
					"operation": "merge",
					"name": "EditButtonsContainer",
					"values": {
						"wrapClass": [
							"base-minipage-edit-button-container",
							"forecast-column-designer-button-container"
						]
					}
				},
				{
					"operation": "remove",
					"name": "EditButtonsContainer",
				},
				{
					"operation": "insert",
					"name": "DesignerButtonsContainer",
					"parentName": "AlignableMiniPageContainer",
					"propertyName": "items",
					"values": {
						"id": "MiniPageEditButtonsContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["base-minipage-edit-button-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "CancelEditButton",
					"parentName": "DesignerButtonsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.CancelEditButtonCaption"},
						"classes": {
							"textClass": ["base-minipage-cancel-button"],
							"wrapperClass": ["base-minipage-cancel-button-wrapper"],
							"imageClass": ["base-minipage-action-button-image"]
						},
						"click": {"bindTo": "close"},
						"visible": {"bindTo": "isNotViewMode"}
					}
				},
				{
					"operation": "insert",
					"name": "DeleteButton",
					"parentName": "DesignerButtonsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.DeleteButtonCaption"},
						"classes": {
							"textClass": ["delete-button"]
						},
						"enabled": {
							"bindTo": "isNotNewMode"
						},
						"click": {"bindTo": "deleteColumn"}
					},
				},
				{
					"operation": "insert",
					"name": "SaveEditButton",
					"parentName": "DesignerButtonsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"caption": {"bindTo": "Resources.Strings.SaveEditButtonCaption"},
						"classes": {
							"textClass": ["base-minipage-save-button"],
							"wrapperClass": ["base-minipage-save-button-wrapper"],
							"imageClass": ["base-minipage-action-button-image"]
						},
						"click": {"bindTo": "save"},
						"visible": {"bindTo": "isNotViewMode"},
						"hint": {"bindTo": "Resources.Strings.SaveEditButtonHint"}
					}
				},
				{
					"operation": "merge",
					"name": "MiniPageHeaderCaption",
					"values": {
						"visible": true
					}
				},
				{
					"operation": "merge",
					"name": "OpenCurrentEntityPage",
					"values": {
						"visible": false
					}
				},
				{
					"name": "Title",
					"parentName": "MiniPage",
					"operation": "insert",
					"propertyName": "items",
					"index": 0,
					"values": {
						"labelConfig": {
							"visible": true
						},
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						}
					}
				},
				{
					"name": "Type",
					"parentName": "MiniPage",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"contentType": Terrasoft.ContentType.ENUM,
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24
						}
					}
				},
				{
					"name": "IsHide",
					"parentName": "MiniPage",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"visible": {"bindTo": "ShowHidingCheckbox"},
						"wrapClass": [
							"hide-column-checkbox-container"
						],
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24
						}
					}
				},
				{
					"name": "ColumnEditor",
					"parentName": "MiniPage",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"id": "ColumnEditorWrapContainer",
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 24
						}
					}
				}
			] /**SCHEMA_DIFF*/
		};
	});


