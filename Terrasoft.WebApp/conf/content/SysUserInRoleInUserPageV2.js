Terrasoft.configuration.Structures["SysUserInRoleInUserPageV2"] = {innerHierarchyStack: ["SysUserInRoleInUserPageV2"], structureParent: "BasePageV2"};
define('SysUserInRoleInUserPageV2Structure', ['SysUserInRoleInUserPageV2Resources'], function(resources) {return {schemaUId:'8633209e-1497-4b5d-8bd8-0687d4558db3',schemaCaption: "Card schema of user \"Roles\" detail list", parentSchemaName: "BasePageV2", schemaName:'SysUserInRoleInUserPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysUserInRoleInUserPageV2", ["ConfigurationConstants"],
	function(ConfigurationConstants) {
		return {
			entitySchemaName: "SysUserInRole",
			messages: {
				/**
				 * ######## ####### # ############# ###### ######### ## ############ #####.
				 */
				"NeedActualizeRoles": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {
				"SysRole": {
					isRequired: true
				}
			},
			methods: {

				/**
				 * ######### ###### ### ####### SysRole.
				 * @inheritDoc Terrasoft.BasePageV2#getLookupPageConfig
				 * @overridden
				 */
				getLookupPageConfig: function(args, columnName) {
					var entityColumn = this.entitySchema.getColumnByName(columnName);
					var filters = this.Terrasoft.createFilterGroup();
					if (columnName === "SysRole") {
						filters.addItem(this.getRoleLookupFilter());
						filters.addItem(this.getLookupQueryFilters(columnName));
					}
					var config = {
						entitySchemaName: args.schemaName || entityColumn.referenceSchemaName,
						multiSelect: false,
						columnName: columnName,
						columnValue: this.get(columnName),
						searchValue: args.searchValue,
						filters: filters,
						hideActions: true
					};
					this.Ext.apply(config, this.getLookupListConfig(columnName));
					return config;
				},

				/**
				 * @inheritDoc Terrasoft.BasePageV2#getLookupQuery
				 * @overridden
				 */
				getLookupQuery: function(filterValue, columnName) {
					var esq = this.callParent(arguments);
					esq.filters.addItem(this.getRoleLookupFilter(columnName));
					return esq;
				},

				/**
				 * ######### ###### ### ###### #######.
				 * @private
				 * @return {Object} ########## ###### # ####### ### #######.
				 */
				getSaveServiceDataSend: function() {
					var sysRoleId = !this.Ext.isEmpty(this.get("SysRole")) ? this.get("SysRole").value : null;
					var userId = !this.Ext.isEmpty(this.get("SysUser")) ? this.get("SysUser").value : null;
					var recordId = !this.isNew ? this.get("Id") : null;
					var dataSend = {
						recordId: recordId,
						roleId: sysRoleId,
						userId: userId
					};
					return dataSend;
				},

				/**
				 * ######### ######### ### ###### #######
				 * @private
				 * @return {Object} ########## ###### # ########### ### #######.
				 */
				getSaveServiceConfig: function(dataSend) {
					var config = {
						serviceName: "AdministrationService",
						methodName: "SaveUsersInRole",
						data: dataSend
					};
					return config;
				},

				/**
				 * ######### ######### # ############# ######### ############ #####.
				 */
				publishNeedActualizeRolesMessage: function() {
					this.sandbox.publish("NeedActualizeRoles");
				},

				/**
				 * Callback - ####### ###### ########## ######.
				 * @private
				 * @param {Object} response ##### ###### #######.
				 */
				saveServiceCallback: function(response) {
					if (response) {
						this.publishNeedActualizeRolesMessage();
						response.success = this.Ext.isEmpty(response.SaveUsersInRoleResult);
						response.id = response.SaveUsersInRoleResult;
						response.rowsAffected = 1;
						response.nextPrcElReady = false;
						this.isNew = false;
						this.changedValues = null;
						if (!this.Ext.isEmpty(response.SaveUsersInRoleResult)) {
							this.showInformationDialog(response.SaveUsersInRoleResult);
						}
					}
				},

				/**
				 * ######### ######## ## #######. #### ######## ### ########## ##### ######### ########## ######, ##### -
				 * ########## ##### ########.
				 * @param {Function} callback #######, ####### ##### ####### ### ######### ###### ## #######.
				 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
				 * @inheritDoc Terrasoft.BaseViewModel#saveEntity
				 * @overridden
				 */
				saveEntity: function(callback, scope) {
					var dataSend = this.getSaveServiceDataSend();
					var config = this.getSaveServiceConfig(dataSend);
					this.showBodyMask();
					this.callService(config, function(response) {
						this.saveServiceCallback(response);
						callback.call(scope || this, response);
					}, scope || this);
				},

				/**
				 * ######## ####### # ###### SysUser ## ####### ######## ##-#########,
				 * #### ####### SysUser ### ## ######### # ######.
				 * @return {Object} ###### # ###### SysUser # ######### Id ######## ############.
				 */
				getUser: function() {
					var user = this.get("SysUser");
					if (this.Ext.isEmpty(user)) {
						var defaultValues = this.get("DefaultValues");
						defaultValues.forEach(function(item) {
							if (item.name === "SysUser") {
								user = item;
							}
						});
					}
					return user;
				},

				/**
				 * ######### #######, ### ########### ##### ############ #### (############## ### ###############)
				 * # ########### ## #### ######
				 * @private
				 * @return {Terrasoft.data.filters.FilterGroup} ########## ###### ########.
				 */
				getRoleLookupFilter: function() {
					var filters = this.Terrasoft.createFilterGroup();
					var sysAdminUnitTypes = [];
					var callChain = this.Ext.id.split("_");
					switch (callChain.pop()) {
						case "SysFuncRoleInUserDetailV2":
							sysAdminUnitTypes = [
								ConfigurationConstants.SysAdminUnit.Type.FuncRole
							];
							break;
						case "SysOrgRoleInUserDetailV2":
							sysAdminUnitTypes = [
								ConfigurationConstants.SysAdminUnit.Type.Organisation,
								ConfigurationConstants.SysAdminUnit.Type.Department,
								ConfigurationConstants.SysAdminUnit.Type.Manager,
								ConfigurationConstants.SysAdminUnit.Type.Team
							];
							break;
						default :
							break;
					}
					var typeFilter = this.Terrasoft.createColumnInFilterWithParameters("SysAdminUnitTypeValue",
						sysAdminUnitTypes);
					var notExistsFilter = this.Terrasoft.createNotExistsFilter(
						"[SysUserInRole:SysRole:Id].Id");
					var subFilter = this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL,
						"SysUser",
						this.getUser().value);
					notExistsFilter.subFilters.addItem(subFilter);
					filters.addItem(notExistsFilter);
					filters.addItem(typeFilter);
					return filters;
				}
			},
			rules: {
			}
		};
	});


