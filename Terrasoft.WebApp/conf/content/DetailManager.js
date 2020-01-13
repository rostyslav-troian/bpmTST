Terrasoft.configuration.Structures["DetailManager"] = {innerHierarchyStack: ["DetailManager"]};
define("DetailManager", ["DetailManagerItem"], function() {
	/**
	 * @class Terrasoft.DetailManager
	 * Class of detail manager.
	 */
	Ext.define("Terrasoft.DetailManager", {
		extend: "Terrasoft.ObjectManager",
		alternateClassName: "Terrasoft.DetailManager",
		singleton: true,

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.ObjectManager#itemClassName
		 * @overridden
		 */
		itemClassName: "Terrasoft.DetailManagerItem",

		/**
		 * @inheritdoc Terrasoft.ObjectManager#entitySchemaName
		 * @overridden
		 */
		entitySchemaName: "SysDetail",

		/**
		 * @inheritdoc Terrasoft.ObjectManager#propertyColumnNames
		 * @overridden
		 */
		propertyColumnNames: {
			caption: "Caption",
			detailSchemaUId: "DetailSchemaUId",
			entitySchemaUId: "EntitySchemaUId",
			detailSchemaName: "[SysSchema:UId:DetailSchemaUId].Name",
			entitySchemaName: "[SysSchema:UId:EntitySchemaUId].Name"
		}

		// endregion

	});
	return Terrasoft.DetailManager;
});


