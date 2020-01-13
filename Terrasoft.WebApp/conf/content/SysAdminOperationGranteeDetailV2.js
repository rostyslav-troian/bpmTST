Terrasoft.configuration.Structures["SysAdminOperationGranteeDetailV2"] = {innerHierarchyStack: ["SysAdminOperationGranteeDetailV2"], structureParent: "BaseGridDetailV2"};
define('SysAdminOperationGranteeDetailV2Structure', ['SysAdminOperationGranteeDetailV2Resources'], function(resources) {return {schemaUId:'4317930c-b7cb-49d5-9182-b7de84ce1833',schemaCaption: "Section list detail schema - \"Operations permissions\"", parentSchemaName: "BaseGridDetailV2", schemaName:'SysAdminOperationGranteeDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysAdminOperationGranteeDetailV2",
	["LocalizableHelper", "ConfigurationEnums", "SysAdminOperationGranteeDetailV2Resources",
		"ConfigurationGrid", "ConfigurationGridGenerator", "ConfigurationGridUtilities"],
	function(LocalizableHelper, enums) {
		return {
			entitySchemaName: "SysAdminOperationGrantee",
			attributes: {
				IsEditable: {
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": true,
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN
				}
			},
			properties: {
				disableCachedActiveRow: false
			},
			mixins: {
				ConfigurationGridUtilites: "Terrasoft.ConfigurationGridUtilities"
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "MoveUpButton",
					"index": 0,
					"parentName": "Detail",
					"propertyName": "tools",
					"values": {
						"tag": "up",
						"click": {"bindTo": "onUpDownButtonClick"},
						"visible": {"bindTo": "getToolsVisible"},
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"className": this.Terrasoft.controls.Button,
						"markerValue": "buttonUp",
						"imageConfig": LocalizableHelper.localizableImages.ButtonUp
					}
				},
				{
					"operation": "insert",
					"name": "MoveDownButton",
					"index": 1,
					"parentName": "Detail",
					"propertyName": "tools",
					"values": {
						"tag": "down",
						"click": {"bindTo": "onUpDownButtonClick"},
						"visible": {"bindTo": "getToolsVisible"},
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"className": this.Terrasoft.controls.Button,
						"markerValue": "buttonDown",
						"imageConfig": LocalizableHelper.localizableImages.ButtonDown
					}
				},
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"type": "listed",
						"className": "Terrasoft.ConfigurationGrid",
						"generator": "ConfigurationGridGenerator.generatePartial",
						"generateControlsConfig": {"bindTo": "generateActiveRowControlsConfig"},
						"changeRow": {"bindTo": "changeRow"},
						"unSelectRow": {"bindTo": "unSelectRow"},
						"onGridClick": {"bindTo": "onGridClick"},
						"listedZebra": true,
						"activeRowAction": {"bindTo": "onActiveRowAction"},
						"activeRowActions": [
							{
								"tag": "save",
								"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
								"className": this.Terrasoft.controls.Button,
								"markerValue": "buttonSave",
								"imageConfig": {"bindTo": "Resources.Images.SaveIcon"}
							},
							{
								"tag": "cancel",
								"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
								"className": this.Terrasoft.controls.Button,
								"markerValue": "buttonCancel",
								"imageConfig": {"bindTo": "Resources.Images.CancelIcon"}
							},
							{
								"tag": "remove",
								"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
								"className": this.Terrasoft.controls.Button,
								"markerValue": "buttonRemove",
								"imageConfig": {"bindTo": "Resources.Images.RemoveIcon"}
							}
						],
						"initActiveRowKeyMap": {"bindTo": "initActiveRowKeyMap"}
					}
				}
			]/**SCHEMA_DIFF*/,
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getGridSettingsMenuItem
				 * @overridden
				 */
				getGridSettingsMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#sortColumn
				 * @overridden
				 */
				sortColumn: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getGridSortMenuItem
				 * @overridden
				 */
				getGridSortMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
				 * @overridden
				 */
				getCopyRecordMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
				 * @overridden
				 */
				getEditRecordMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getSwitchGridModeMenuItem
				 * @overridden
				 */
				getSwitchGridModeMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#addDetailWizardMenuItems
				 * @overridden
				 */
				addDetailWizardMenuItems: this.Terrasoft.emptyFn,

				/**
				 * ########## ######### ####### #######.
				 * ############# ########### ########## ### ####### #######.
				 * @inheritdoc GridUtilitiesV2#getGridDataColumns
				 * @overridden
				 */
				getGridDataColumns: function() {
					var configs = this.callParent(arguments);
					if (!configs.Position) {
						configs.Position = {
							"path": "Position",
							"orderPosition": 0,
							"orderDirection": this.Terrasoft.OrderDirection.ASC
						};
					}
					return configs;
				},

				/**
				 * ########## ####### ######### ########## # ####### ######.
				 * @inheritdoc BaseGridDetailV2#onCardSaved
				 * @overridden
				 */
				onCardSaved: function() {
					this.openAdminUnitLookup(null);
				},

				/**
				 * #########, ######### ## ######## ##############, # ###### ######## ########.
				 * @return {Boolean} ######### ########.
				 * @private
				 */
				isPageInAddState: function() {
					var state = this.sandbox.publish("GetCardState", null, [this.sandbox.id]);
					return state.state === enums.CardStateV2.ADD;
				},

				/**
				 * ######### ##### ######## # ####### ######.
				 * @private
				 */
				silentSaveOperation: function() {
					var args = {
						"isSilent": true,
						"messageTags": [this.sandbox.id]
					};
					this.sandbox.publish("SaveRecord", args, [this.sandbox.id]);
				},

				/**
				 * ########## ####### ###### #####/####.
				 * @param {Object} a1 ignore
				 * @param {Object} a2 ignore
				 * @param {Object} a3 ignore
				 * @param {String} tag Tag ####### ######.
				 * @private
				 */
				onUpDownButtonClick: function(a1, a2, a3, tag) {
					var count = this.getGridData().getCount();
					if (count < 2) {
						return;
					}
					var activeRow = this.getActiveRow();
					if (activeRow) {
						var position = activeRow.get("Position");
						switch (tag) {
							case "up":
								if (position === 0) {
									return;
								}
								position--;
								break;
							case "down":
								position++;
								break;
						}
						this.setAdminOperationGranteePosition(activeRow.get("Id"), position);
					}
				},

				/**
				 * ########## ######### ###### ########.
				 * @inheritdoc BaseGridDetailV2#getAddRecordButtonVisible
				 * @overridden
				 */
				getAddRecordButtonVisible: function() {
					return this.getToolsVisible();
				},

				/**
				 * ########## ######.
				 * @inheritdoc BaseGridDetailV2#addRecord
				 * @overridden
				 */
				addRecord: function() {
					this.checkCanChangeGrantee(function() {
						if (this.isPageInAddState()) {
							this.showConfirmSaveOperationDialog(function() {
									this.silentSaveOperation();
								});
						} else {
							this.openAdminUnitLookup(null);
						}
					}, null);
				},

				/**
				 * ######## #######.
				 * @inheritdoc GridUtilitiesV2#deleteRecords
				 * @overridden
				 */
				deleteRecords: function() {
					var items = this.getSelectedItems();
					if (items && items.length > 0) {
						this.showConfirmationDialog(this.get("Resources.Strings.DeleteConfirmationMessage"),
							function(result) {
								if (result === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
									this.deleteGrantees(items);
								}
							}, [this.Terrasoft.MessageBoxButtons.YES.returnCode,
								this.Terrasoft.MessageBoxButtons.NO.returnCode], null);
					}
				},

				/**
				 * ######### ########## ############/####.
				 * @param {Object} config ######### ###########.
				 * #### ######### ###########, ##### ######### ########### ######### (##. getAdminUnitLookupConfig).
				 * @private
				 */
				openAdminUnitLookup: function(config) {
					this.showBodyMask();
					if (!config) {
						config = this.getAdminUnitLookupConfig();
					}
					this.openLookup(config, this.onAdminUnitLookupClosed, this);
				},

				/**
				 * ############# ######## #### ####### # ##.
				 * @param {String} itemId ############# ##### #######.
				 * @param {Number} position ##### ######## #### #######.
				 * @private
				 */
				setAdminOperationGranteePosition: function(itemId, position) {
					var config = {
						"serviceName": "RightsService",
						"methodName": "SetAdminOperationGranteePosition",
						"data": {
							"granteeId": itemId,
							"position": position
						}
					};
					this.callService(config, function(response) {
						if (response && response.SetAdminOperationGranteePositionResult) {
							var result = this.Ext.decode(response.SetAdminOperationGranteePositionResult);
							if (result && !this.Ext.isEmpty(result)) {
								if (result.Success) {
									this.reloadGridData();
								} else {
									this.showInformationDialog(result.ExMessage);
								}
							}
						}
					}, this);
				},

				/**
				 * ####### ### ######## ##### ####### # ######## # ##
				 * ### ########## ############ ### ###### #############.
				 * @param {Array} itemIds ###### ############### #############/#####.
				 * @param {Boolean} canExecute ######## ## ###### ############ # ########.
				 * ## ######### — true.
				 * @private
				 */
				insertGrantees: function(itemIds, canExecute) {
					var config = {
						"serviceName": "RightsService",
						"methodName": "SetAdminOperationGrantee",
						"data": {
							"adminOperationId": this.get("MasterRecordId"),
							"adminUnitIds": itemIds,
							"canExecute": this.Ext.isEmpty(canExecute) ? true : canExecute
						}
					};
					this.callService(config, function(response) {
						if (response && response.SetAdminOperationGranteeResult) {
							var result = this.Ext.decode(response.SetAdminOperationGranteeResult);
							if (result && !this.Ext.isEmpty(result)) {
								if (result.Success) {
									this.onInsertComplete();
								} else {
									this.showInformationDialog(result.ExMessage);
								}
							}
						}
					}, this);
				},

				/**
				 * ####### ##### ####### # ######## # ##.
				 * @param {Array} itemIds ###### ############### #### #######.
				 * @private
				 */
				deleteGrantees: function(itemIds) {
					var config = {
						"serviceName": "RightsService",
						"methodName": "DeleteAdminOperationGrantee",
						"data": {
							"recordIds": itemIds
						}
					};
					this.callService(config, function(response) {
						if (response && response.DeleteAdminOperationGranteeResult) {
							var result = this.Ext.decode(response.DeleteAdminOperationGranteeResult);
							if (result && !this.Ext.isEmpty(result)) {
								if (result.Success) {
									this.onDeleteComplete(itemIds);
								} else {
									this.showInformationDialog(result.ExMessage);
								}
							}
						}
					}, this);
				},

				/**
				 * ######### ###### #######.
				 * ########### ##### ########## ####### # ##.
				 * @private
				 */
				onInsertComplete: function() {
					this.hideBodyMask();
					this.reloadGridData();
				},

				/**
				 * ####### ###### ## #######.
				 * ########### ##### ######## ####### ## ##.
				 * @private
				 */
				onDeleteComplete: function() {
					this.hideBodyMask();
					this.reloadGridData();
				},

				/**
				 * ########### ##### ######## ########### ############/####.
				 * @param {Object} args ######## ######### ####### ######### # ########### ############/####.
				 * @private
				 */
				onAdminUnitLookupClosed: function(args) {
					this.hideBodyMask();
					if (args) {
						var items = args.selectedRows.getItems();
						if (items.length > 0) {
							var itemIds = [];
							this.Terrasoft.each(items, function(item) {
								itemIds.push(item.value);
							}, this);
							this.insertGrantees(itemIds);
						}
					}
				},

				/**
				 * ########## ######### ### ########### ############/####.
				 * @param {Boolean} multi ######### ## ############# #####. ## ######### — ##.
				 * @param {Boolean} actions ########## ## ###### ########. ## ######### — ###.
				 * @param {Terrasoft.FilterGroup} filtersGroup ######### ########.
				 * #### ######### ###########, ##### ######## ########### ###### (##. getAdminUnitLookupFilters).
				 * @return {Object} ######### ########### ############/####.
				 * @private
				 */
				getAdminUnitLookupConfig: function(multi, actions, filtersGroup) {
					return {
						"multiSelect": this.Ext.isEmpty(multi) ? true : multi,
						"hideActions": this.Ext.isEmpty(actions) ? true : actions,
						"filters": !filtersGroup ? this.getAdminUnitLookupFilters() : filtersGroup,
						"entitySchemaName": "SysAdminUnit"
					};
				},

				/**
				 * ########## ###### ### ########### ############/####.
				 * @return {Terrasoft.FilterGroup} ######### ########.
				 * @private
				 */
				getAdminUnitLookupFilters: function() {
					var filtersGroup = this.Terrasoft.createFilterGroup();
					var operationFilter = this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "SysAdminOperation", this.get("MasterRecordId"));
					var notExistsFilter = this.Terrasoft.createNotExistsFilter("[SysAdminOperationGrantee:SysAdminUnit:Id].Id");
					notExistsFilter.subFilters.addItem(operationFilter);
					return filtersGroup.addItem(notExistsFilter);
				},

				/**
				 * #########, ### ######## ############,
				 * ########### ######### #### ####### # ########.
				 * @param {Function} callbackAllow ####### ######### ######.
				 * ###########, #### ########### ######### #### #########.
				 * @param {Function} callbackDenied ####### ######### ######.
				 * ###########, #### ########### ######### #### #########.
				 * @private
				 */
				checkCanChangeGrantee: function(callbackAllow, callbackDenied) {
					var config = {
						"serviceName": "RightsService",
						"methodName": "CheckCanChangeAdminOperationGrantee"
					};
					this.callService(config, function(response) {
						if (response && response.CheckCanChangeAdminOperationGranteeResult) {
							var result = this.Ext.decode(response.CheckCanChangeAdminOperationGranteeResult);
							if (result && !this.Ext.isEmpty(result)) {
								if (result.Success) {
									if (this.Ext.isFunction(callbackAllow)) {
										callbackAllow.call(this);
									}
								} else {
									this.showInformationDialog(result.ExMessage, function() {
										if (this.Ext.isFunction(callbackDenied)) {
											callbackDenied.call(this);
										}
									});
								}
							}
						}
					}, this);
				},

				/**
				 * ########## ########## #### # ############ ######### ########.
				 * @param {Function} callback ####### ######### ######.
				 * ###########, #### ###### ###### ##.
				 * @private
				 */
				showConfirmSaveOperationDialog: function(callback) {
					var caption = this.get("Resources.Strings.SaveConfirmationMessage");
					var configs = {
						"buttons":
							[this.Terrasoft.MessageBoxButtons.YES.returnCode,
								this.Terrasoft.MessageBoxButtons.NO.returnCode],
						"defaultButton": 0
					};
					this.showInformationDialog(caption, function(result) {
						if (result === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
							if (this.Ext.isFunction(callback)) {
								callback.call(this);
							}
						}
					}, configs);
				}
			}
		};
	});


