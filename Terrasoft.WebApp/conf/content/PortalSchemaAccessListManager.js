Terrasoft.configuration.Structures["PortalSchemaAccessListManager"] = {innerHierarchyStack: ["PortalSchemaAccessListManager"]};
define("PortalSchemaAccessListManager", ["PortalSchemaAccessListManagerItem"], function() {

	/**
	 * @class Terrasoft.PortalSchemaAccessListManager
	 */
	Ext.define("Terrasoft.manager.PortalSchemaAccessListManager", {
		extend: "Terrasoft.manager.ObjectManager",
		alternateClassName: "Terrasoft.PortalSchemaAccessListManager",
		singleton: true,

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.ObjectManager#itemClassName
		 * @overridden
		 */
		itemClassName: "Terrasoft.PortalSchemaAccessListManagerItem",

		/**
		 * @inheritdoc Terrasoft.ObjectManager#entitySchemaName
		 * @overridden
		 */
		entitySchemaName: "PortalSchemaAccessList",

		/**
		 * @inheritdoc Terrasoft.ObjectManager#propertyColumnNames
		 * @overridden
		 */
		propertyColumnNames: {
			entitySchemaUId: "SchemaUId",
			entitySchemaName: "AccessEntitySchemaName"
		}

		// endregion

	});

	return Terrasoft.PortalSchemaAccessListManager;
});


