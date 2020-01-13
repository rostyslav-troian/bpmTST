Terrasoft.configuration.Structures["WidgetDashboardManager"] = {innerHierarchyStack: ["WidgetDashboardManager"], structureParent: "BaseDashboardManager"};
define("WidgetDashboardManager", ["BaseDashboardManager"], function() {

	/**
	 * @class Terrasoft.WidgetDashboardManager
	 * @public
	 *Widget dashboard manager class.
	 */
	Ext.define("Terrasoft.WidgetDashboardManager", {
		extend: "Terrasoft.BaseDashboardManager",
		alternateClassName: "Terrasoft.WidgetDashboardManager",
		singleton: true,

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.manager.ObjectManager#entitySchemaName
		 * @overridden
		 */
		entitySchemaName: "SysWidgetDashboard",

		/**
		 * @inheritdoc Terrasoft.manager.ObjectManager#propertyColumnNames
		 * @overridden
		 */
		propertyColumnNames: {items: "Items"},

		/**
		 * @inheritdoc Terrasoft.manager.ObjectManager#lazyLoadingProperties
		 * @overridden
		 */
		lazyLoadingProperties: ["items"],

		/**
		 * @inheritdoc Terrasoft.OutdatedSchemaNotificationMixin#outdatedEventName
		 * @override
		 */
		outdatedEventName: "WidgetDashboardItem_Outdated",

		/**
		 * @inheritdoc Terrasoft.OutdatedSchemaNotificationMixin#useNotification
		 * @override
		 */
		useNotification: true

		// endregion

	});
	return Terrasoft.WidgetDashboardManager;
});


