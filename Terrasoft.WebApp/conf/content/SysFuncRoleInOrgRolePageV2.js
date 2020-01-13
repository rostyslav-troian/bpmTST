Terrasoft.configuration.Structures["SysFuncRoleInOrgRolePageV2"] = {innerHierarchyStack: ["SysFuncRoleInOrgRolePageV2"], structureParent: "BasePageV2"};
define('SysFuncRoleInOrgRolePageV2Structure', ['SysFuncRoleInOrgRolePageV2Resources'], function(resources) {return {schemaUId:'10d8792e-16e6-48b8-ac8c-399957aee61d',schemaCaption: "List card schema - Functional roles", parentSchemaName: "BasePageV2", schemaName:'SysFuncRoleInOrgRolePageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysFuncRoleInOrgRolePageV2", ["ConfigurationConstants", "SysFuncRoleInOrgRole", "BusinessRuleModule"],
	function(ConfigurationConstants, SysFuncRoleInOrgRole, BusinessRuleModule) {
		return {
			entitySchemaName: "SysFuncRoleInOrgRole",
			messages: {
				/**
				 * ######## ####### # ############# ###### ######### ## ############ #####.
				 */
				"NeedActualizeRoles": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			methods: {

				/**
				 * ######### ######### # ############# ######### ############ #####.
				 */
				publishNeedActualizeRolesMessage: function() {
					this.sandbox.publish("NeedActualizeRoles");
				},

				/**
				 * @inheritDoc Terrasoft.BasePageV2#onSaved
				 * @overridden
				 */
				onSaved: function() {
					this.callParent(arguments);
					this.publishNeedActualizeRolesMessage();
				},

				/**
				 * ######### #######, ###### ######### ########## ############ ####### # ######,
				 * # ########## ###### #### ############ #### (############## ### ###############)
				 * @private
				 * @param {String} columnName ######## #######, ####### ##### ##########.
				 * @return {Terrasoft.FilterGroup} ########## ###### ########.
				 */
				getRoleLookupFilter: function(columnName) {
					var filters = this.Terrasoft.createFilterGroup();
					if (!(columnName === "FuncRole" || columnName === "OrgRole"))
					{
						return filters;
					}
					var fixedColumnName = "";
					switch (columnName) {
						case "FuncRole":
							fixedColumnName = "OrgRole";
							break;
						case "OrgRole":
							fixedColumnName = "FuncRole";
							break;
						default:
							break;
					}
					var role = this.get(fixedColumnName);
					if (this.Ext.isEmpty(role)) {
						return filters;
					}
					var roleFilter =  this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL,
						fixedColumnName,
						role.value);

					var sysAdminUnitTypes = [];
					switch (columnName) {
						case "FuncRole":
							sysAdminUnitTypes = [ConfigurationConstants.SysAdminUnit.Type.FuncRole];
							break;
						case "OrgRole":
							sysAdminUnitTypes = [
								ConfigurationConstants.SysAdminUnit.Type.Organisation,
								ConfigurationConstants.SysAdminUnit.Type.Department,
								ConfigurationConstants.SysAdminUnit.Type.Team
							];
							break;
						default:
							break;
					}
					var typeFilter = this.Terrasoft.createColumnInFilterWithParameters("SysAdminUnitTypeValue",
						sysAdminUnitTypes);
					var notExistsFilter = this.Terrasoft.createNotExistsFilter(
						"[SysFuncRoleInOrgRole:" + columnName + ":Id].Id");
					notExistsFilter.subFilters.addItem(roleFilter);
					filters.addItem(notExistsFilter);
					filters.addItem(typeFilter);
					return filters;
				},

				/**
				 * ######### ###### ### ####### FuncRole.
				 * @inheritDoc Terrasoft.BasePageV2#getLookupPageConfig
				 * @overridden
				 */
				getLookupPageConfig: function(args, columnName) {
					var entityColumn = this.entitySchema.getColumnByName(columnName);
					var filters = this.Terrasoft.createFilterGroup();
					filters.addItem(this.getLookupQueryFilters(columnName));
					filters.addItem(this.getRoleLookupFilter(columnName));
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
				}
			},
			rules: {
				"OrgRole": {
					"BindParameterEnabledOrgRole": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "FixedColumnName"
								},
								"comparisonType":  this.Terrasoft.core.enums.ComparisonType.EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": "FuncRole"
								}
							}
						]
					}
				},
				"FuncRole": {
					"BindParameterEnabledFuncRole": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "FixedColumnName"
								},
								"comparisonType":  this.Terrasoft.core.enums.ComparisonType.EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": "OrgRole"
								}
							}
						]
					}
				}
			}
		};
	});


