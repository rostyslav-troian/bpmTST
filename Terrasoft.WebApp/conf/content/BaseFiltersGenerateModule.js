Terrasoft.configuration.Structures["BaseFiltersGenerateModule"] = {innerHierarchyStack: ["BaseFiltersGenerateModule"]};
define("BaseFiltersGenerateModule", ["BaseFiltersGenerateModuleResources", "ConfigurationConstants"], 
	function(resources, ConfigurationConstants) {
		function getIsNotNullFilterGroup(refSchema) {
			const userFilter = Terrasoft.createColumnIsNotNullFilter(refSchema + ".Id");
			const filters = Ext.create("Terrasoft.FilterGroup");
			filters.addItem(userFilter);
			return filters;
		}

		function employeesFilter() {
			const sysAdminUnitRef = "[SysAdminUnit:Contact]";
			const employeesFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					sysAdminUnitRef + ".ConnectionType",
					ConfigurationConstants.SysAdminUnit.ConnectionType.AllEmployees);
			const filters = getIsNotNullFilterGroup(sysAdminUnitRef);
			filters.addItem(employeesFilter);
			return filters;
		}

		function allUsersFilter() {
			return getIsNotNullFilterGroup("[VwSystemUsers:Contact]");
		}

		function selfFilter() {
			let primaryColumnName = "Id";
			if (this.entitySchema && this.entitySchema.primaryColumnName) {
				primaryColumnName = this.entitySchema.primaryColumnName;
			}
			const primaryColumnValue = this.get(primaryColumnName);
			return Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.NOT_EQUAL, primaryColumnName, primaryColumnValue);
		}

		return {
			OwnerFilter: employeesFilter,
			SelfFilter: selfFilter,
			AllUsersFilter: allUsersFilter
		};
	});


