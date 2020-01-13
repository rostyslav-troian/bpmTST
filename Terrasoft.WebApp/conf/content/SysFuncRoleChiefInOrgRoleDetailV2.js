Terrasoft.configuration.Structures["SysFuncRoleChiefInOrgRoleDetailV2"] = {innerHierarchyStack: ["SysFuncRoleChiefInOrgRoleDetailV2UIv2", "SysFuncRoleChiefInOrgRoleDetailV2"], structureParent: "BaseGridDetailV2"};
define('SysFuncRoleChiefInOrgRoleDetailV2UIv2Structure', ['SysFuncRoleChiefInOrgRoleDetailV2UIv2Resources'], function(resources) {return {schemaUId:'4fae0f4a-0189-4ce6-8bdc-1e0ce3f02e86',schemaCaption: "Detail schema - Functional roles of managers", parentSchemaName: "BaseGridDetailV2", schemaName:'SysFuncRoleChiefInOrgRoleDetailV2UIv2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SysFuncRoleChiefInOrgRoleDetailV2Structure', ['SysFuncRoleChiefInOrgRoleDetailV2Resources'], function(resources) {return {schemaUId:'05d5d8a9-6e22-4e97-8f85-e166c71afdb0',schemaCaption: "Detail schema - Functional roles of managers", parentSchemaName: "SysFuncRoleChiefInOrgRoleDetailV2UIv2", schemaName:'SysFuncRoleChiefInOrgRoleDetailV2',parentSchemaUId:'4fae0f4a-0189-4ce6-8bdc-1e0ce3f02e86',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SysFuncRoleChiefInOrgRoleDetailV2UIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SysFuncRoleChiefInOrgRoleDetailV2UIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SysFuncRoleChiefInOrgRoleDetailV2UIv2", ["terrasoft", "SysFuncRoleChiefInOrgRoleDetailV2Resources",
		"ConfigurationConstants", "ConfigurationEnums"],
	function(Terrasoft, resources, ConfigurationConstants, enums) {
		return {
			messages: {
				/**
				 * ######## ####### # ############# ###### ######### ## ############ #####.
				 */
				"NeedActualizeRoles": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			entitySchemaName: "SysFuncRoleInOrgRole",
			diff: /**SCHEMA_DIFF*/[
			]/**SCHEMA_DIFF*/,
			methods: {
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
				 * ########### ########## ###### ####### ## ####### ###. #### ############ ### ####### ####.
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getAddRecordButtonEnabled
				 * @overridden
				 */

				/**
				 * ######### ######### # ############# ######### ############ #####.
				 */
				publishNeedActualizeRolesMessage: function() {
					this.sandbox.publish("NeedActualizeRoles");
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#onDeleted
				 * @overridden
				 */
				onDeleted: function() {
					this.callParent(arguments);
					this.publishNeedActualizeRolesMessage();
				},

				getAddRecordButtonEnabled: function() {
					return this.get("IsChiefRoleExists");
				},

				/**
				 * @inheritdoc GridUtilitiesV2#getGridDataColumns
				 * @overridden
				 * @return {Object} ########## ###### ########-############ #######.
				 */
				getGridDataColumns: function() {
					var config = this.callParent(arguments);
					config["OrgRole.Id"] = {path: "OrgRole.Id"};
					config["OrgRole.Name"] = {path: "OrgRole.Name"};
					config["FuncRole.Name"] = {path: "FuncRole.Name"};
					return config;
				},

				/**
				 * @protected
				 * @inheritdoc GridUtilitiesV2#loadGridData
				 * @overridden
				 */
				loadGridData: function() {
					if (this.get("ChiefOrgRoleIdLoaded")) {
						this.callParent(arguments);
						this.set("ChiefOrgRoleIdLoaded", false);
						return;
					}
					this.getChiefOrgRoleId(this.loadGridData);
				},

				/**
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
					deserializedFilters.addItem(this.Terrasoft.createColumnInFilterWithParameters(
						"OrgRole.Id", [this.get("ChiefOrgRoleId")]));
					return deserializedFilters;
				},

				/**
				 * ######### ######, ####### ########## ############# ############### #### #############
				 * ### ######### ############### ####.
				 * @protected
				 * @param {Function} callback ####### ######### ######, ####### ########## ##### ####, ### ####### #############.
				 */
				getChiefOrgRoleId: function(callback) {
					var parentId = this.get("MasterRecordId");
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "SysAdminUnit"
					});
					esq.addColumn("Id");
					esq.filters.addItem(this.Terrasoft.createColumnInFilterWithParameters(
						"ParentRole.Id", [parentId]));
					esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "SysAdminUnitTypeValue",
						ConfigurationConstants.SysAdminUnit.Type.Manager));

					esq.getEntityCollection(function(response) {
						if (response && response.success) {
							var collection = response.collection;
							if (collection.getCount() > 0) {
								var chiefOrgRoleId = collection.getByIndex(0).get("Id");
								var defaultValue = {
									name: "OrgRole",
									value: chiefOrgRoleId
								};
								this.set("DefaultValues", [defaultValue]);
								this.set("ChiefOrgRoleId", chiefOrgRoleId);
								this.set("ChiefOrgRoleIdLoaded", true);
								if (this.Ext.isFunction(callback)) {
									callback.call(this);
								}
								this.set("IsChiefRoleExists", true);
							} else {
								this.set("IsChiefRoleExists", false);
								var gridData = this.getGridData();
								if (gridData.getCount() > 0) {
									gridData.clear();
								}
								this.set("LastRecord", null);
								this.set("IsGridEmpty", true);
							}
						}
					}, this);
				},

				/**
				 * @inheritdoc GridUtilitiesV2#createViewModel
				 * @overridden
				 */
				createViewModel: function(config) {
					this.callParent(arguments);
					var dataMarkerColumnName = "FuncRole";
					if (this.isOrgRolesDetail()) {
						dataMarkerColumnName = "OrgRole";
					}
					config.viewModel.primaryDisplayColumnName = dataMarkerColumnName;
				},

				/**
				 * ########## config ### lookupPage.
				 * @private
				 * @return {Object} config ### lookupPage.
				 */
				getLookupPageConfig: function() {
					var filters = this.Terrasoft.createFilterGroup();
					filters.addItem(this.getRoleLookupFilter());
					var config = {
						entitySchemaName: "SysAdminUnit",
						multiSelect: true,
						columns: ["Name"],
						filters: filters,
						hideActions: true
					};
					return config;
				},

				/**
				 * ######### #######, ### ########### #####.
				 * @private
				 * @return {Terrasoft.data.filters.FilterGroup} ########## ###### ########.
				 */
				getRoleLookupFilter: function() {
					var filters = this.Terrasoft.createFilterGroup();
					var typeFilter = this.Terrasoft.createColumnInFilterWithParameters("SysAdminUnitTypeValue",
							this.getFilterRoleType());
					var notExistsFilter = this.Terrasoft.createNotExistsFilter(
						"[SysFuncRoleInOrgRole:FuncRole:Id].Id");
					var subFilter = this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL,
						"OrgRole",
						this.get("ChiefOrgRoleId"));
					notExistsFilter.subFilters.addItem(subFilter);
					filters.addItem(notExistsFilter);
					filters.addItem(typeFilter);
					return filters;
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#addRecord
				 * @overridden
				 */
				addRecord: function() {
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
					var config = this.getLookupPageConfig();
					this.openLookup(config, this.addCallback, this);
				},

				/**
				 * ########## ####### ########### ###### "############### ####".
				 * @private
				 * @return {Boolean} ########## ####### ########### ###### "############### ####".
				 */
				isOrgRolesDetail: function() {
					var detailColumnName = this.get("DetailColumnName");
					return (detailColumnName && detailColumnName === "FuncRole");
				},

				/**
				 * ########## ###### ##### ### ####### ######.
				 * @private
				 * @return {Array} ###### #####.
				 */
				getFilterRoleType: function() {
					if (this.isOrgRolesDetail()) {
						return [
							ConfigurationConstants.SysAdminUnit.Type.Organisation,
							ConfigurationConstants.SysAdminUnit.Type.Department,
							ConfigurationConstants.SysAdminUnit.Type.Manager,
							ConfigurationConstants.SysAdminUnit.Type.Team
						];
					}
					return [ConfigurationConstants.SysAdminUnit.Type.FuncRole];
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#onCardSaved
				 * @overridden
				 */
				onCardSaved: function() {
					var config = this.getLookupPageConfig();
					this.openLookup(config, this.addCallback, this);
				},

				/**
				 * ######### ######## ###### #######.
				 * @protected
				 * @virtual
				 * @param {Object} response ##### ####### AdministrationService.
				 */
				validateResponse: function(response) {
					var isSuccess = response && response.success;
					if (!isSuccess) {
						this.hideBodyMask();
						var errorMessage = response.message;
						if (errorMessage) {
							this.showInformationDialog(errorMessage);
						}
					}
					return isSuccess;
				},

				/**
				 * Callback-#######, ####### ########## ##### ######## #### ###### ## ########### #############.
				 * @virtual
				 * @param {Object} args ######, ########## ######### ######### #######.
				 */
				addCallback: function(args) {
					var dataSend = {
						orgRoleId: this.get("ChiefOrgRoleId"),
						funcRoleIds: this.Ext.encode(args.selectedRows.getKeys())
					};
					var config = {
						serviceName: "AdministrationService",
						methodName: "AddFuncRolesInOrgRole",
						data: dataSend
					};
					this.showBodyMask();
					this.callService(config, function(response) {
						response.message = response.AddFuncRolesInOrgRoleResult;
						response.success = this.Ext.isEmpty(response.message);
						if (this.validateResponse(response)) {
							this.hideBodyMask();
							this.reloadGridData();
							this.publishNeedActualizeRolesMessage();
						}
					}, this);
				},

				/**
				* @overridden
				* @return {String}
				*/
				getFilterDefaultColumnName: function() {
					return "FuncRole";
				}
			}
		};
	});

define("SysFuncRoleChiefInOrgRoleDetailV2", [],
	function() {
		return {
			entitySchemaName: "SysFuncRoleInOrgRole",
			methods: {

				/**
				 * Returns values of the ViewModel.
				 * @protected
				 * @virtual
				 * @returns {Object} ViewModel column values.
				 */
				getCardColumnValues: function() {
					return this.sandbox.publish("GetColumnsValues", ["ConnectionType"], [this.sandbox.id]);
				},

				/**
				 * Adds filter by connection type column to the existing filter.
				 * @protected
				 * @virtual
				 */
				addConnectionTypeFilter: function(filters) {
					var columnValues = this.getCardColumnValues();
					if (columnValues && columnValues.hasOwnProperty("ConnectionType")) {
						var connectionTypeFilter =  this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL,
							"ConnectionType",
							columnValues.ConnectionType);
						filters.addItem(connectionTypeFilter);
					}
				},

				/**
				 * @inheritdoc Terrasoft.SysFuncRoleChiefInOrgRoleDetailV2#getRoleLookupFilter
				 * @overridden
				 */
				getRoleLookupFilter: function() {
					var filters = this.callParent(arguments);
					if (this.getIsFeatureEnabled("PortalUserManagementV2")) {
						this.addConnectionTypeFilter(filters);
					}
					return filters;
				}
			}
		};
	});


