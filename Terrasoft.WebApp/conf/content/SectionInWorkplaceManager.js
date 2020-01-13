Terrasoft.configuration.Structures["SectionInWorkplaceManager"] = {innerHierarchyStack: ["SectionInWorkplaceManager"]};
define("SectionInWorkplaceManager", ["SectionInWorkplaceManagerItem"], function() {
	/**
	 * @class Terrasoft.SectionInWorkplaceManager
	 * Class of section in workplace manager.
	 */
	Ext.define("Terrasoft.SectionInWorkplaceManager", {
		extend: "Terrasoft.ObjectManager",
		alternateClassName: "Terrasoft.SectionInWorkplaceManager",
		singleton: true,

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.ObjectManager#itemClassName
		 * @overridden
		 */
		itemClassName: "Terrasoft.SectionInWorkplaceManagerItem",

		/**
		 * @inheritdoc Terrasoft.ObjectManager#entitySchemaName
		 * @overridden
		 */
		entitySchemaName: "SysModuleInWorkplace",

		/**
		 * @inheritdoc Terrasoft.ObjectManager#propertyColumnNames
		 * @overridden
		 */
		propertyColumnNames: {
			position: "Position",
			workplace: "SysWorkplace",
			section: "SysModule"
		}

		// endregion

	});

	return Terrasoft.SectionInWorkplaceManager;
});


