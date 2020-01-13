Terrasoft.configuration.Structures["DashboardManager"] = {innerHierarchyStack: ["DashboardManager"], structureParent: "BaseDashboardManager"};
define("DashboardManager", ["BaseDashboardManager"], function() {

	/**
	 * @class Terrasoft.DashboardManager
	 * @public
	 * Dashboard manager class.
	 */
	Ext.define("Terrasoft.DashboardManager", {
		extend: "Terrasoft.BaseDashboardManager",
		alternateClassName: "Terrasoft.DashboardManager",
		singleton: true,

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.manager.ObjectManager#entitySchemaName
		 * @overridden
		 */
		entitySchemaName: "SysDashboard",

		/**
		 * @inheritdoc Terrasoft.manager.ObjectManager#propertyColumnNames
		 * @overridden
		 */
		propertyColumnNames: {
			caption: "Caption",
			position: "Position",
			viewConfig: "ViewConfig",
			items: "Items",
			sectionId: "Section"
		},

		/**
		 * @inheritdoc Terrasoft.manager.ObjectManager#lazyLoadingProperties
		 * @overridden
		 */
		lazyLoadingProperties: ["viewConfig", "items"]

		// endregion

	});
	return Terrasoft.DashboardManager;
});


