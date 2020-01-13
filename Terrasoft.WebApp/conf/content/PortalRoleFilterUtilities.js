Terrasoft.configuration.Structures["PortalRoleFilterUtilities"] = {innerHierarchyStack: ["PortalRoleFilterUtilities"]};
define("PortalRoleFilterUtilities", ["terrasoft", "ConfigurationConstants"],
	function(Terrasoft, ConfigurationConstants) {
		var portalRoleFilterUtilitiesClass = Ext.define("Terrasoft.configuration.mixins.PortalRoleFilterUtilities", {

				alternateClassName: "Terrasoft.PortalRoleFilterUtilities",

				/**
				 * ########## ###### ######## ### ######### ##### ### #### ############ #######.
				 * @param  {Array} sysAdminUnitTypeList ###### ##### ##### ### ##########.
				 * @return {Terrasoft.FilterGroup} ###### ########.
				 */
				getSysAdminUnitWithoutPortalFilterGroup: function(sysAdminUnitTypeList) {
					var orgRolesFilterGroup = Terrasoft.createFilterGroup();
					orgRolesFilterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
					orgRolesFilterGroup.addItem(Terrasoft.createColumnInFilterWithParameters(
						"SysAdminUnitTypeValue", sysAdminUnitTypeList));
					orgRolesFilterGroup.addItem(Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.NOT_EQUAL,
						"Id",
						ConfigurationConstants.SysAdminUnit.Id.PortalUsers));
					return orgRolesFilterGroup;
				},

				/**
				 * ########## ###### ######## ### ######### #### ############ #######, #### ### #######.
				 * @return {Terrasoft.FilterGroup} ###### ########.
				 */
				getPortalFilterGroup: function() {
					var portalFilterGroup = Terrasoft.createFilterGroup();
					portalFilterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
					portalFilterGroup.addItem(Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "Active", true));
					portalFilterGroup.addItem(Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL,
						"Id",
						ConfigurationConstants.SysAdminUnit.Id.PortalUsers));
					return portalFilterGroup;
				},

				/**
				 * ########## ###### ######## ### ######### #####.
				 * @param  {Array} sysAdminUnitTypeList ###### ##### ##### ### ##########.
				 * @return {Terrasoft.FilterGroup} ###### ########.
				 */
				getSysAdminUnitFilterGroup: function(sysAdminUnitTypeList) {
					var orgRolesFilterGroup = this.getSysAdminUnitWithoutPortalFilterGroup(sysAdminUnitTypeList);
					var portalFilterGroup = this.getPortalFilterGroup();
					var filterGroup = Terrasoft.createFilterGroup();
					filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
					filterGroup.addItem(portalFilterGroup);
					filterGroup.addItem(orgRolesFilterGroup);
					return filterGroup;
				}
			});
		return Ext.create(portalRoleFilterUtilitiesClass);
	});


