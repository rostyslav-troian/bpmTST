Terrasoft.configuration.Structures["SysOrgRoleInUserDetailV2"] = {innerHierarchyStack: ["SysOrgRoleInUserDetailV2UIv2", "SysOrgRoleInUserDetailV2"], structureParent: "BaseSysUserInRoleDetailV2"};
define('SysOrgRoleInUserDetailV2UIv2Structure', ['SysOrgRoleInUserDetailV2UIv2Resources'], function(resources) {return {schemaUId:'dff66a01-80d4-4d9a-a84c-e846bac0f49f',schemaCaption: "Detail schema - Organizational roles", parentSchemaName: "BaseSysUserInRoleDetailV2", schemaName:'SysOrgRoleInUserDetailV2UIv2',parentSchemaUId:'bd4177f0-9b99-4999-bc2a-e1c8d8f2fdbc',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SysOrgRoleInUserDetailV2Structure', ['SysOrgRoleInUserDetailV2Resources'], function(resources) {return {schemaUId:'1b370055-f857-4312-ae2a-10a2f0035ce2',schemaCaption: "Detail schema - Organizational roles", parentSchemaName: "SysOrgRoleInUserDetailV2UIv2", schemaName:'SysOrgRoleInUserDetailV2',parentSchemaUId:'dff66a01-80d4-4d9a-a84c-e846bac0f49f',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SysOrgRoleInUserDetailV2UIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SysOrgRoleInUserDetailV2UIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SysOrgRoleInUserDetailV2UIv2", ["terrasoft", "ConfigurationConstants"],
	function(Terrasoft, ConfigurationConstants) {
		return {
			entitySchemaName: "SysUserInRole",
			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseSysUserInRoleDetailV2#getSysAdminUnitTypeList
				 * @overridden
				 */
				getSysAdminUnitTypeList: function() {
					return [
						ConfigurationConstants.SysAdminUnit.Type.Organisation,
						ConfigurationConstants.SysAdminUnit.Type.Department,
						ConfigurationConstants.SysAdminUnit.Type.Manager,
						ConfigurationConstants.SysAdminUnit.Type.Team
					];
				},

				/**
				 * @inheritdoc Terrasoft.BaseSysUserInRoleDetailV2#getFilters
				 * @overridden
				 */
				getFilters: function() {
					var filters = this.callParent(arguments);
					filters.addItem(this.Terrasoft.createColumnInFilterWithParameters(
						"SysRole.SysAdminUnitTypeValue",
						this.getSysAdminUnitTypeList()));
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
					filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "ConnectionType", connectionType.ConnectionType));
					return filters;
				},

				/**
				 * @overridden
				 * @return {String}  Column name.
				 */
				getFilterDefaultColumnName: function() {
					return "SysRole";
				}
			}
		};
	});

define("SysOrgRoleInUserDetailV2", [],
	function() {
		return {
			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseSysUserInRoleDetailV2#getRoleLookupFilter
				 * @overridden
				 */
				getRoleLookupFilter: function() {
					let filters = this.callParent(arguments);
					filters.addItem(this.Terrasoft.createColumnIsNullFilter("PortalAccount"));
					return filters;
				}

			}
		};
	});


