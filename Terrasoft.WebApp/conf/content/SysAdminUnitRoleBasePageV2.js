Terrasoft.configuration.Structures["SysAdminUnitRoleBasePageV2"] = {innerHierarchyStack: ["SysAdminUnitRoleBasePageV2"], structureParent: "BaseModulePageV2"};
define('SysAdminUnitRoleBasePageV2Structure', ['SysAdminUnitRoleBasePageV2Resources'], function(resources) {return {schemaUId:'c98b8faa-d678-4c2c-a043-efe41d5e1ddf',schemaCaption: "Base edit schema - \"Roles\" section page", parentSchemaName: "BaseModulePageV2", schemaName:'SysAdminUnitRoleBasePageV2',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysAdminUnitRoleBasePageV2", ["ConfigurationConstants", "SysAdminUnitRoleBasePageV2Resources"],
	function(ConfigurationConstants, resources) {
		return {
			entitySchemaName: "VwSysAdminUnit",
			details: /**SCHEMA_DETAILS*/{
				UsersDetailV2: {
					schemaName: "UsersDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "[SysUserInRole:SysUser:Id].[SysAdminUnit:Id:SysRole].Id"
					},
					defaultValues: {
						ConnectionType: {
							masterColumn: "ConnectionType"
						},
						IsParentRoleExist: {
							masterColumn: "IsParentRoleExist"
						}
					}
				},
				SysAdminUnitIPRangeDetailV2: {
					schemaName: "SysAdminUnitIPRangeDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "SysAdminUnit"
					}
				},
				SysFuncRoleInOrgRoleDetailV2: {
					schemaName: "SysFuncRoleInOrgRoleDetailV2",
					filter: {
						masterColumn: "Id"
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Name",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 24}
					}
				},
				{
					"operation": "remove",
					"name": "ESNTab"
				}
			]/**SCHEMA_DIFF*/,
			attributes: {

				/**
				 * ####### ####, ### ############ #### ##########.
				 */
				"IsParentRoleExist": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN
				},

				/**
				 * ######## ######## ###### ## ####### ###### #### # ############ ### ############# ########.
				 */
				"SecurityOperationName": {
					"dataValueType": this.Terrasoft.DataValueType.STRING,
					"value": "CanManageUsers"
				},

				/**
				 * ######## #### ConnectionType ######, ####### ######## ######### ##
				 * ######### # #######.
				 */
				"ParentRoleConnectionType": {
					"dataValueType": this.Terrasoft.DataValueType.INTEGER,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {
				/**
				 * @inheritDoc Terrasoft.BaseModulePageV2#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					if (this.isAddMode()) {
						var result = this.sandbox.publish("SetRecordInformation", {},
							[this.sandbox.id]);
						this.set("ParentRole", {value: result.parent});
						this.set("SysAdminUnitType", {value: result.type});
						this.set("ParentRoleConnectionType", result.connectionType);
						this.set("ConnectionType", result.connectionType);
					}
					var deleteButtonEnable = this.checkOpportunityForDelete();
					this.set("DeleteButtonEnable", deleteButtonEnable);
				},

				/**
				 * @inheritDoc BasePageV2#onEntityInitialized
				 * @overridden
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					var parentRole = this.get("ParentRole");
					this.set("IsParentRoleExist", !this.Ext.isEmpty(parentRole));
				},

				/**
				 * ######### ######## ## #######. #### ######## ### ########## ##### ######### ########## ######,
				 * ##### - ########## ##### ########.
				 * @param {Function} callback #######, ####### ##### ####### ### ######### ###### ## #######
				 * @param {Object} scope ########, # ####### ##### ####### ####### callback
				 * @inheritDoc Terrasoft.BaseViewModel#saveEntity
				 * @overridden
				 */
				saveEntity: function(callback, scope) {
					var changedColumns = {};
					var systemColumns = ["CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy"];
					this.Terrasoft.each(this.entitySchema.columns,
						function(column) {
							if (this.changedValues.hasOwnProperty(column.name) && systemColumns.indexOf(column.name) < 0) {
								var columnValue = this.get(column.name);
								changedColumns[column.name] =  this.Ext.isEmpty(columnValue) ?
									null:
									columnValue.value || columnValue;
							}
						}, this);
					if (this.Terrasoft.isEmptyObject(changedColumns)) {
						this.cardSaveResponse = {success: true};
						callback.call(scope || this, {success: true});
					} else {
						if (this.Ext.isEmpty(changedColumns.Id)) {
							changedColumns.Id = this.get("Id");
						}
						if (this.Ext.isEmpty(changedColumns.SysAdminUnitType)) {
							changedColumns.SysAdminUnitType = this.get("SysAdminUnitType").value;
						}
						if (this.isAddMode()) {
							changedColumns.ConnectionType = this.get("ConnectionType");
						}
						var dataSend = {
							jsonObject: this.Ext.encode(changedColumns)
						};
						var config = {
							serviceName: "AdministrationService",
							methodName: "SaveRole",
							data: dataSend
						};
						this.callService(config, this.onSaveRoleResponse.bind(scope, callback), this);
					}
				},

				/**
				 * ######### ########### ######## ####### ###### (###### ## ######## ###### "#######" # #### ######
				 * "########").
				 * @return {boolean} ########## true, #### ##### ####### ###### ########.
				 */
				checkOpportunityForDelete: function() {
					var id = this.get("Id");
					if (this.Ext.isEmpty(id)) {
						return false;
					}
					var parent = this.get("ParentRole");
					return !this.Ext.isEmpty(parent) && id !== ConfigurationConstants.SysAdminUnit.Id.SysAdministrators;
				},

				/**
				 * ######## ########## ###### ## ####### # ######## ########## ####### ######### ######.
				 * @private
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} response ##### ## #######.
				 */
				onSaveRoleResponse: function(callback, response) {
					this.validateSaveRoleResponse(response);
					callback.call(this, response);
				},

				/**
				 * ######### ######### # ############# ######### ############ #####.
				 */
				publishNeedActualizeRolesMessage: function() {
					this.sandbox.publish("NeedActualizeRoles");
				},

				/**
				 * ######### ######### ###### ## #######.
				 * @private
				 * @param {Object} response ##### ## #######.
				 */
				validateSaveRoleResponse: function(response) {
					if (response && response.SaveRoleResult) {
						var result = this.Ext.decode(response.SaveRoleResult);
						response.success = result.success;
						if (result.success) {
							this.publishNeedActualizeRolesMessage();
							response.id = result.roleId;
							response.rowsAffected = 1;
							response.nextPrcElReady = false;
							this.isNew = false;
							this.changedValues = null;
						} else {
							this.showInformationDialog(result.message);
						}
					}
				},

				/**
				 * @inheritDoc Terrasoft.BaseViewModel#onSilentSaved
				 * @overridden
				 */
				onSilentSaved: function() {
					this.callParent(arguments);
					var deleteButtonEnable = this.checkOpportunityForDelete();
					this.set("DeleteButtonEnable", deleteButtonEnable);
				},

				/**
				 * ######### ######## ########### ######## ####### ######. #### ######## ######### ########,
				 * ## ######## #######, ####### ## SysAdminUnitSectionV2 ############## ####### ######## ######
				 * #######.
				 */
				canRemoveRecord: function() {
					var dataSend = {
						parentRoleId: this.get("Id")
					};
					var config = {
						serviceName: "AdministrationService",
						methodName: "GetChildAdminUnitsAndUsersCount",
						data: dataSend
					};
					this.callService(config, this.onGetChildAdminUnitsAndUsersCountResponse, this);
				},

				/**
				 * ############ ###### # GetChildAdminUnitsAndUsersCount # ########## ##### ## ######### ########
				 * ###### ### ######## ######### ############ # ############# ########.
				 * @param response {Object} ######, ########## ########.
				 */
				onGetChildAdminUnitsAndUsersCountResponse: function(response) {
					if (response && response.GetChildAdminUnitsAndUsersCountResult) {
						var result = {};
						response.GetChildAdminUnitsAndUsersCountResult.forEach(function(item) {
							result[item.Key] = item.Value;
						});
						if (result.userCount === 0) {
							this.showConfirmationDialog(this.get("Resources.Strings.DeleteConfirmationMessage"),
								function(returnCode) {
									if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
										if (this.get("IsInChain")) {
											this.onCloseClick();
										}
										this.sandbox.publish("RemoveRecordAndGoToParent", {
												deletedItems: result.deletedItems,
												parent: this.get("ParentRole").value,
												IsConfirmedDelete: true
											},
											[this.sandbox.id]);
									}
								},
								[
									this.Terrasoft.MessageBoxButtons.YES.returnCode,
									this.Terrasoft.MessageBoxButtons.NO.returnCode
								],
								null);

						} else {
							this.showInformationDialog(this.get("Resources.Strings.DeletionErrorMessage"));
						}
						this.set("ServiceDataLoaded", true);
					}
				},

				/**
				 * #### # ###### ######### ###### ######## #### ###### ### ######## ## #####, ## ####### ## ## ######.
				 * @param {Object} actionMenuItems ###### ######### ###### ########.
				 * @protected
				 */
				removeSubscribeButton: function(actionMenuItems) {
					var subscribeButtonIndex;
					actionMenuItems.each(function(item, index) {
						if (item.values.Tag === "subscribeUser") {
							subscribeButtonIndex = index;
						}
					});
					if (subscribeButtonIndex) {
						actionMenuItems.removeByIndex(subscribeButtonIndex);
					}
				},

				/**
				 * @inheritdoc BaseModulePageV2#getActions
				 * @overridden
				 */
				getActions: function() {
					var actionMenuItems = this.callParent(arguments);
					this.removeSubscribeButton(actionMenuItems);
					actionMenuItems.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.RemoveButtonCaption"},
						"Enabled": { "bindTo": "DeleteButtonEnable" },
						"Tag": "canRemoveRecord"
					}));
					return actionMenuItems;
				}
			},
			messages: {

				/**
				 * ######## ########## # ######## # #### ### ######.
				 */
				"SetRecordInformation": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * ######## # ############# ####### ######## ## ####### # ####### # ############# ########.
				 */
				"RemoveRecordAndGoToParent": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * ######## ####### # ############# ###### ######### ## ############ #####.
				 */
				"NeedActualizeRoles": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}
			}
		};
	});


