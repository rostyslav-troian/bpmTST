Terrasoft.configuration.Structures["ContainerListPaginationGenerator"] = {innerHierarchyStack: ["ContainerListPaginationGenerator"]};
define("ContainerListPaginationGenerator", ["ContainerListGenerator", "ContainerListPagination"],
	function() {
		Ext.define("Terrasoft.configuration.ContainerListPaginationGenerator", {
			extend: "Terrasoft.ContainerListGenerator",
			alternateClassName: "Terrasoft.ContainerListPaginationGenerator",
			/**
			 * @inheritdoc
			 * @overridden Terrasoft.configuration.ContainerListGenerator#itemClassName
			 */
			itemClassName: "Terrasoft.ContainerListPagination"
		});
		return Ext.create("Terrasoft.ContainerListPaginationGenerator");
	});



