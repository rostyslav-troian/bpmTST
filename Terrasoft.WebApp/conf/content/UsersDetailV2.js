Terrasoft.configuration.Structures["UsersDetailV2"] = {innerHierarchyStack: ["UsersDetailV2"], structureParent: "BaseGridDetailV2"};
define('UsersDetailV2Structure', ['UsersDetailV2Resources'], function(resources) {return {schemaUId:'d64934cd-24ff-4a9c-ae27-cccac7f17052',schemaCaption: "\"Users\" detail schema in the \"Organizational roles\" section", parentSchemaName: "BaseGridDetailV2", schemaName:'UsersDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("UsersDetailV2", ["ConfigurationConstants", "ConfigurationEnums"],
	function(ConfigurationConstants, enums) {
		return {
			entitySchemaName: "VwSysAdminUnit",
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"type": "listed",
						"openRecord": {"bindTo": "onGridDoubleClick"},
						"listedConfig": {
							"name": "DataGridListedConfig",
							"items": [
								{
									"name": "ContactNameListedGridColumn",
									"caption": {"bindTo": "Resources.Strings.ContactNameColumnCaption"},
									"bindTo": "Contact.Name",
									"type": "text",
									"position": {
										"column": 0,
										"colSpan": 6
									}
								},
								{
									"name": "JobTitleListedGridColumn",
									"caption": {"bindTo": "Resources.Strings.JobTitleColumnCaption"},
									"bindTo": "Contact.JobTitle",
									"type": "text",
									"position": {
										"column": 0,
										"colSpan": 6
									}
								},
								{
									"name": "MobilePhoneListedGridColumn",
									"caption": {"bindTo": "Resources.Strings.MobilePhoneColumnCaption"},
									"bindTo": "Contact.MobilePhone",
									"type": "text",
									"position": {
										"column": 0,
										"colSpan": 6
									}
								},
								{
									"name": "NameListedGridColumn",
									"caption": {"bindTo": "Resources.Strings.NameColumnCaption"},
									"bindTo": "Name",
									"type": "text",
									"position": {
										"column": 0,
										"colSpan": 6
									}
								}
							]
						},
						"tiledConfig": {
							"name": "DataGridTiledConfig",
							"grid": {
								"columns": 24,
								"rows": 1
							},
							"items": [
								{
									"name": "NameTiledGridColumn",
									"bindTo": "Name",
									"caption": {"bindTo": "Resources.Strings.NameColumnCaption"},
									"type": "text",
									"position": {
										"row": 1,
										"column": 0,
										"colSpan": 12
									},
									"captionConfig": {
										"visible": false
									}
								}
							]
						}
					}
				},
				{
					"operation": "merge",
					"name": "AddRecordButton",
					"values": {
						"click": {"bindTo": "onAddButtonClick"},
						"menu": []
					}
				},
				{
					"operation": "insert",
					"name": "AddExistingRecordButton",
					"parentName": "AddRecordButton",
					"propertyName": "menu",
					"values": {
						"caption": {"bindTo": "Resources.Strings.AddExistingUserButtonCaption"},
						"click": {"bindTo": "onAddExistingUser"}
					}
				},
				{
					"operation": "insert",
					"name": "AddNewRecordButton",
					"parentName": "AddRecordButton",
					"propertyName": "menu",
					"values": {
						"caption": {"bindTo": "Resources.Strings.AddNewUserButtonCaption"},
						"click": {"bindTo": "addRecord"}
					}
				}
			]/**SCHEMA_DIFF*/,
			messages: {
				/**
				 * ######## ########## # ######## # #### ### ######.
				 */
				"SetRecordInformation": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * ######## ####### # ############# ###### ######### ## ############ #####.
				 */
				"NeedActualizeRoles": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}

			},
			attributes: {
				/**
				 * ####### ####, ######### ## ## ########## ############# ############.
				 */
				"IsAddExistingUser": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN
				}
			},
			methods: {
				/**
				 * ########## ######## ##### ## ###### # ####### ######.
				 * @protected
				 */
				onGridDoubleClick: function() {
					this.editRecord();
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getAddRecordButtonEnabled
				 * @overridden
				*/
				getAddRecordButtonEnabled: function() {
					return true;
				},

				/**
				 * ########## ##### ## ###### "########".
				 * @returns {boolean} ###### ########## false, #.#. ### ###### ############ ### ######## ####.
				 */
				onAddButtonClick: function() {
					return false;
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#addDetailWizardMenuItems
				 * @overridden
				 */
				addDetailWizardMenuItems: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
				 * @overridden
				 */
				getCopyRecordMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritDoc BaseSchemaViewModel#initEditPages
				 * @protected
				 * @overridden
				 */
				initEditPages: function() {
					this.callParent(arguments);
					var editPages = this.get("EditPages");
					var typeUId = this.Terrasoft.GUID_EMPTY;
					if (this.Ext.isEmpty(editPages.find(typeUId))) {
						editPages.add(typeUId, this.Ext.create("Terrasoft.BaseViewModel", {
							values: {
								Id: typeUId,
								Caption: this.get("Resources.Strings.EditPageCaption"),
								Click: {bindTo: "addRecord"},
								Tag: typeUId,
								SchemaName: "UserPageV2"
							}
						}));
					}
				},

				/**
				 * ########## #######, ####### ###### ########## ########.
				 * @inheritdoc GridUtilitiesV2#getGridDataColumns
				 * @overridden
				 * @return {Object} ########## ###### ########-############ #######.
				 */
				getGridDataColumns: function() {
					var config = this.callParent(arguments);
					config["Contact.Name"] = {path: "Contact.Name"};
					config["Contact.JobTitle"] = {path: "Contact.JobTitle"};
					config["Contact.MobilePhone"] = {path: "Contact.MobilePhone"};
					return config;
				},

				/**
				 * ######### #### ###### ############ #############.
				 * @protected
				 */
				getUsersList: function() {
					var config = this.prepareLookupConfig();
					this.openLookup(config, this.addCallback, this);
				},

				/**
				 * Creates users lookup config. Only users that do not belong to current role will be shown.
				 * @return {Object} Users lookup config.
				 */
				prepareLookupConfig: function() {
					var config = {
						entitySchemaName: "SysAdminUnit",
						multiSelect: true,
						columns: ["Contact", "Name"],
						hideActions: true,
						lookupPostfix: "_UsersDetail"
					};
					var filters = this.Ext.create("Terrasoft.FilterGroup");
					var currentRoleId = this.getTargetRoleId();
					var currentRoleFilter = this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "SysRole", currentRoleId);
					var usersNotInCurrentRoleFilter = this.Terrasoft.createNotExistsFilter(
						"[SysUserInRole:SysUser:Id].Id", currentRoleFilter);
					filters.addItem(usersNotInCurrentRoleFilter);
					var connectionType = this.getConnectionType();
					var connectionFilter;
					if (!this.Ext.isEmpty(connectionType)) {
						connectionFilter = this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL,
							"ConnectionType",
							connectionType.value
						);
					} else {
						connectionFilter = this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL,
							"ConnectionType",
							ConfigurationConstants.UserType.GENERAL
						);
					}
					filters.addItem(connectionFilter);
					filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "SysAdminUnitTypeValue",
						ConfigurationConstants.SysAdminUnit.Type.User));
					config.filters = filters;
					return config;
				},

				/**
				 * ## ####### ######## ## ######### ########## ######## # ###### "ConnectionType" ### null.
				 * @return {Object} ### ############ ### null, #### ### ############ ## ###### ##### ########
				 * ## #########.
				 */
				getConnectionType: function() {
					var result = null;
					this.Terrasoft.each(this.get("DefaultValues"), function(value) {
						if (value.name === "ConnectionType") {
							result = value;
						}
					});
					return result;
				},

				/**
				 * ########## ####### ## ###### ######## ######.
				 * @inheritdoc BaseGridDetailV2#addRecord
				 * @overridden
				 */
				addRecord: function() {
					this.set("IsAddExistingUser", false);
					this.callParent([this.Terrasoft.GUID_EMPTY]);
				},

				/**
				 * ########## ####### ## ###### ######## #############.
				 */
				onAddExistingUser: function() {
					this.set("IsAddExistingUser", true);
					var cardState = this.sandbox.publish("GetCardState", null, [this.sandbox.id]);
					var isNew = (cardState.state === enums.CardStateV2.ADD ||
					cardState.state === enums.CardStateV2.COPY);
					if (isNew) {
						var args = {
							isSilent: true,
							messageTags: [this.sandbox.id]
						};
						this.sandbox.publish("SaveRecord", args, [this.sandbox.id]);
						return;
					}
					this.getUsersList();
				},

				/**
				 * @overridden
				 */
				onCardSaved: function() {
					if (this.get("IsAddExistingUser")) {
						this.getUsersList();
					} else {
						this.callParent(arguments);
					}
				},

				/**
				 * ########## id ### ######## UserPageV2, ########## ## ###### UsersDetailV2.
				 * @return {string} ############### id
				 */
				getUsersDetailSandboxId: function() {
					return this.sandbox.id + "UserPageV2" + this.Terrasoft.GUID_EMPTY;
				},

				/**
				 * @inheritDoc BaseGridDetail#getDeleteRecordMenuItem
				 * @overridden
				 */
				getDeleteRecordMenuItem: function() {
					return this.getButtonMenuItem({
						Caption: {"bindTo": "Resources.Strings.DeleteButtonCaption"},
						Click: {"bindTo": "deleteRecords"},
						Enabled: {"bindTo": "canDeleteUserInRole"}
					});
				},

				/**
				 * #########, ##### ## ######### ############ ## ####.
				 * @return {Boolean} True, #### ############ ###### # ## ###### # ######## #### ### ########
				 * ############# #######, ##### False.
				 */
				canDeleteUserInRole: function() {
					var defaultValues = this.get("DefaultValues");
					return this.isAnySelected() && this.getIsParentRoleExist(defaultValues);
				},

				/**
				 * ########## ####### ## ###### #### #######.
				 * @inheritdoc GridUtilitiesV2#deleteRecords
				 * @overridden
				 */
				deleteRecords: function() {
					this.showConfirmationDialog(this.get("Resources.Strings.DeleteConfirmationMessage"),
						function(returnCode) {
							if (returnCode !== this.Terrasoft.MessageBoxButtons.YES.returnCode) {
								return;
							}
							this.onDeleteRecords();
						},
						[this.Terrasoft.MessageBoxButtons.YES.returnCode,
							this.Terrasoft.MessageBoxButtons.NO.returnCode],
						null);
				},

				/**
				 * ######### ######## ###### #######.
				 * @protected
				 * @virtual
				 * @param {Object} response
				 */
				validateResponse: function(response) {
					this.hideBodyMask();
					var isSuccess = response && response.success;
					if (!isSuccess) {
						var errorMessage = response.message;
						if (errorMessage) {
							this.showInformationDialog(errorMessage);
						}
					}
					return isSuccess;
				},

				/**
				 * ######## ####### # ######### ############# ## ####### SysUserInRole,
				 * ### ####### # #### ########### #####.
				 * @protected
				 */
				onDeleteRecords: function() {
					var selectedRows = this.getSelectedItems();
					var dataSend = {
						roleIds: this.Ext.encode(this.get("SelectedNodesPrimaryColumnValues")),
						userIds: this.Ext.encode(selectedRows),
						recordIds: ""
					};
					var config = {
						serviceName: "AdministrationService",
						methodName: "RemoveUsersInRoles",
						data: dataSend
					};
					this.showBodyMask();
					this.callService(config, this.afterDeleteRecords, this);
				},

				/**
				 * ######### ############# ######## #############.
				 * @private
				 * @param {object} response ##### #######.
				 */
				afterDeleteRecords: function(response) {
					var result = this.Ext.decode(response.RemoveUsersInRolesResult);
					response.message = result.ExceptionMessage;
					response.success = result.Success;
					var deletedItems = result.DeletedItems;
					this.removeGridRecords(deletedItems);
					this.validateResponse(response);
				},

				/**
				 * ######## ############# ### ####, # ############## ####### ##### ####### ######.
				 * @returns {String} ############# ####.
				 */
				getTargetRoleId: function() {
					return this.get("MasterRecordId");
				},

				/**
				 * ######### ######### # ############# ######### ############ #####.
				 */
				publishNeedActualizeRolesMessage: function() {
					this.sandbox.publish("NeedActualizeRoles");
				},

				/**
				 * Callback-#######, ####### ########## ##### ######## #### ###### ## ########### #############.
				 * @virtual
				 * @param {Object} args ######, ########## ######### ######### #######.
				 */
				addCallback: function(args) {
					var dataSend = {
						roleId: this.getTargetRoleId(),
						userIds: this.Ext.encode(args.selectedRows.getKeys())
					};
					var config = {
						serviceName: "AdministrationService",
						methodName: "AddUsersInRole",
						data: dataSend
					};
					this.showBodyMask();
					this.callService(config, function(response) {
						response.message = response.AddUsersInRoleResult;
						response.success = this.Ext.isEmpty(response.message);
						if (this.validateResponse(response)) {
							this.reloadGridData();
						}
					}, this);
				},

				/**
				 * ######### ###### # ###### ######.
				 * @protected
				 * @inheritdoc GridUtilitiesV2#loadGridData
				 * @overridden
				 */
				loadGridData: function() {
					if (this.get("ServiceDataLoaded")) {
						this.callParent(arguments);
						this.set("ServiceDataLoaded", false);
						return;
					}
					this.selectChildUnits(this.loadGridData);
				},

				/**
				 * ########## #######, #### ### ### # ######, ######### # ############ #######,
				 * ############ ####.
				 * @param {Array} defaultValues ######## ## ######### ########.
				 * @return {boolean} True, #### # ######### ###### # ############ ####### #### ########,
				 * ##### False.
				 */
				getIsParentRoleExist: function(defaultValues) {
					var result = null;
					this.Terrasoft.each(defaultValues, function(value) {
						if (value.name === "IsParentRoleExist") {
							result = value;
						}
					});
					return this.Ext.isEmpty(result) ? false : result.value;
				},

				/**
				 * @inheritdoc BaseGridDetailV2#initData
				 * @overridden
				 */
				initData: function() {
					this.callParent(arguments);
					this.sandbox.subscribe("SetRecordInformation", function() {
						return {
							parent:  this.get("MasterRecordId"),
							defaultValues: this.get("DefaultValues"),
							type: ConfigurationConstants.SysAdminUnit.TypeGuid.User
						};
					}, this, [this.getUsersDetailSandboxId()]);
				},

				/**
				 * ##### ######## ######, ####### ########## ############## ########, ## ######### # ##########,
				 * #############.
				 * @protected
				 * @param {Function} callback ####### ######### ######, ####### ########## ##### ####, ### ######## ######.
				 */
				selectChildUnits: function(callback) {
					var dataSend = {
						parentRoleId: this.get("MasterRecordId")
					};
					var config = {
						serviceName: "AdministrationService",
						methodName: "GetChildAdminUnits",
						data: dataSend
					};
					this.callService(config, function(response) {
						if (response && response.GetChildAdminUnitsResult) {
							this.set("SelectedNodesPrimaryColumnValues", response.GetChildAdminUnitsResult);
							this.set("ServiceDataLoaded", true);
							if (this.Ext.isFunction(callback)) {
								callback.call(this);
							}
						}
					}, this);
				},

				/**
				 * ########## ###### ### ########## #######.
				 * @protected
				 * @inheritdoc BaseGridDetailV2#getFilters
				 * @overridden
				 * @return {Terrasoft.FilterGroup} ###### ######## filters.
				 **/
				getFilters: function() {
					var filters = this.get("DetailFilters");
					var serializationInfo = filters.getDefSerializationInfo();
					serializationInfo.serializeFilterManagerInfo = true;
					var deserializedFilters = Terrasoft.deserialize(filters.serialize(serializationInfo));
					var items = this.get("SelectedNodesPrimaryColumnValues");
					deserializedFilters.addItem(this.Terrasoft.createColumnInFilterWithParameters(
						"[SysUserInRole:SysUser:Id].[SysAdminUnit:Id:SysRole].Id", items));
					deserializedFilters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "SysAdminUnitType.Value",
						ConfigurationConstants.SysAdminUnit.Type.User));
					deserializedFilters.add("Filter", this.get("Filter"));
					return deserializedFilters;
				},

				/**
				 * @overridden
				 * @return {String} ### #######.
				 */
				getFilterDefaultColumnName: function() {
					return "Contact";
				}
			}
		};
	});


