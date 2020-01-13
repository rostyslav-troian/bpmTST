Terrasoft.configuration.Structures["PortalColumnAccessListManager"] = {innerHierarchyStack: ["PortalColumnAccessListManager"]};
define("PortalColumnAccessListManager", ["PortalColumnAccessListManagerItem", "AnalyticsManager" ], function() {

	/**
	 * @class Terrasoft.PortalColumnAccessListManager
	 */
	Ext.define("Terrasoft.manager.PortalColumnAccessListManager", {
		extend: "Terrasoft.manager.AnalyticsManager",
		alternateClassName: "Terrasoft.PortalColumnAccessListManager",
		singleton: true,

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.ObjectManager#itemClassName
		 * @overridden
		 */
		itemClassName: "Terrasoft.PortalColumnAccessListManagerItem",

		/**
		 * @inheritdoc Terrasoft.ObjectManager#entitySchemaName
		 * @overridden
		 */
		entitySchemaName: "PortalColumnAccessList",

		/**
		 * @inheritdoc Terrasoft.ObjectManager#propertyColumnNames
		 * @overridden
		 */
		propertyColumnNames: {
			columnUId: "ColumnUId",
			portalSchemaList: "PortalSchemaList"
		}

		// endregion

	});

	return Terrasoft.PortalColumnAccessListManager;
});


