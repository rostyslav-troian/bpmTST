Terrasoft.configuration.Structures["SysFuncRoleInUserDetailV2"] = {innerHierarchyStack: ["SysFuncRoleInUserDetailV2"], structureParent: "BaseSysUserInRoleDetailV2"};
define('SysFuncRoleInUserDetailV2Structure', ['SysFuncRoleInUserDetailV2Resources'], function(resources) {return {schemaUId:'12fe709c-be11-4513-9c0b-a131c998a65e',schemaCaption: "Detail schema - Functional roles", parentSchemaName: "BaseSysUserInRoleDetailV2", schemaName:'SysFuncRoleInUserDetailV2',parentSchemaUId:'bd4177f0-9b99-4999-bc2a-e1c8d8f2fdbc',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysFuncRoleInUserDetailV2", ["terrasoft", "ConfigurationConstants"],
	function(Terrasoft, ConfigurationConstants) {
		return {
			entitySchemaName: "SysUserInRole",
			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseSysUserInRoleDetailV2#getSysAdminUnitTypeList
				 * @overridden
				 */
				getSysAdminUnitTypeList: function() {
					return [ConfigurationConstants.SysAdminUnit.Type.FuncRole];
				},

				/**
				 * @inheritdoc Terrasoft.BaseSysUserInRoleDetailV2#getFilters
				 * @overridden
				 */
				getFilters: function() {
					var filters = this.callParent(arguments);
					filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL,
					"SysRole.SysAdminUnitTypeValue",
					ConfigurationConstants.SysAdminUnit.Type.FuncRole));
					return filters;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSysUserInRoleDetailV2#getRoleLookupFilter
				 * @overridden
				 */
				getRoleLookupFilter: function() {
					var filters = this.callParent(arguments);
					var connectionType = this.sandbox.publish("GetColumnsValues", ["ConnectionType"],
							[this.sandbox.id]);
					filters.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
							"ConnectionType", connectionType.ConnectionType));
					return filters;
				},

				/**
				 * @overridden
				 * @return {String} Column name.
				 */
				getFilterDefaultColumnName: function() {
					return "SysRole";
				}
			}
		};
	});


