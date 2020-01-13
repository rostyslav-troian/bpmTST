Terrasoft.configuration.Structures["SspPageDetailsManager"] = {innerHierarchyStack: ["SspPageDetailsManager"]};
define("SspPageDetailsManager", ["SspPageDetailsManagerItem", "AnalyticsManager"
], function() {

	/**
	 * @class Terrasoft.SspPageDetailsManager
	 * SSP section edit page details registration.
	 */
	Ext.define("Terrasoft.manager.SspPageDetailsManager", {
		extend: "Terrasoft.manager.AnalyticsManager",
		alternateClassName: "Terrasoft.SspPageDetailsManager",
		singleton: true,

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.ObjectManager#itemClassName
		 * @overridden
		 */
		itemClassName: "Terrasoft.SspPageDetailsManagerItem",

		/**
		 * @inheritdoc Terrasoft.ObjectManager#entitySchemaName
		 * @overridden
		 */
		entitySchemaName: "SspPageDetail",

		/**
		 * @inheritdoc Terrasoft.ObjectManager#propertyColumnNames
		 * @overridden
		 */
		propertyColumnNames: {
			cardSchemaUId: "CardSchemaUId",
			entitySchemaUId: "EntitySchemaUId",
			sysDetail: "SysDetail"
		}

		// endregion

	});

	return Terrasoft.SspPageDetailsManager;
});


