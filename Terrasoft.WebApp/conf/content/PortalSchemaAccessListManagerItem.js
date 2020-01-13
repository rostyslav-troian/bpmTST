Terrasoft.configuration.Structures["PortalSchemaAccessListManagerItem"] = {innerHierarchyStack: ["PortalSchemaAccessListManagerItem"]};
define("PortalSchemaAccessListManagerItem", [], function() {

	/**
	 * @class Terrasoft.PortalSchemaAccessListManagerItem
	 */

	Ext.define("Terrasoft.PortalSchemaAccessListManagerItem", {
		extend: "Terrasoft.ObjectManagerItem",
		alternateClassName: "Terrasoft.PortalSchemaAccessListManagerItem",

		// region Properties: Public

		/**
		 * Entity schema unique identifier.
		 * @type {String}
		 */
		entitySchemaUId: null,

		/**
		 *  Entity schema name.
		 * @type {String}
		 */
		entitySchemaName: null

		// endregion

	});

	return Terrasoft.PortalSchemaAccessListManagerItem;
});


