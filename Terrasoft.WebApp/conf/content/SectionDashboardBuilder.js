Terrasoft.configuration.Structures["SectionDashboardBuilder"] = {innerHierarchyStack: ["SectionDashboardBuilder"]};
define("SectionDashboardBuilder", ["ext-base", "SectionDashboardBuilderResources", "DashboardBuilder"],
function(Ext) {

	/**
	 * @class Terrasoft.configuration.DashboardBuilder
	 * ##### ############### # #### ###### ######### ############# # ###### ###### ############# ### ###### ######.
	 */
	Ext.define("Terrasoft.configuration.SectionDashboardBuilder", {
		extend: "Terrasoft.DashboardBuilder",
		alternateClassName: "Terrasoft.SectionDashboardBuilder",

		/**
		 * ### ####### ###### ############# ### ###### ######.
		 * @type {String}
		 */
		viewModelClass: "Terrasoft.SectionDashboardsViewModel",

		/**
		 * ### ######## ##### ########## ############ ############# ######.
		 * @type {String}
		 */
		viewConfigClass: "Terrasoft.DashboardViewConfig"

	});

	return Terrasoft.SectionDashboardBuilder;

});


