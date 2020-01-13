Terrasoft.configuration.Structures["SectionManager"] = {innerHierarchyStack: ["SectionManager"]};
define("SectionManager", ["SectionManagerItem"], function() {

	/**
	 * Class of section manager.
	 */
	Ext.define("Terrasoft.manager.SectionManager", {
		extend: "Terrasoft.manager.ObjectManager",
		alternateClassName: "Terrasoft.SectionManager",
		singleton: true,

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.ObjectManager#itemClassName
		 * @overridden
		 */
		itemClassName: "Terrasoft.SectionManagerItem",

		/**
		 * @inheritdoc Terrasoft.ObjectManager#entitySchemaName
		 * @overridden
		 */
		entitySchemaName: "SysModule",

		/**
		 * @inheritdoc Terrasoft.ObjectManager#propertyColumnNames
		 * @overridden
		 */
		propertyColumnNames: {
			caption: "Caption",
			code: "Code",
			sysModuleEntity: "SysModuleEntity",
			schemaUId: "SectionSchemaUId",
			moduleSchemaUId: "SectionModuleSchemaUId",
			globalSearchAvailable: "GlobalSearchAvailable",
			leftPanelLogo: "Image32",
			folderMode: "FolderMode",
			attribute: "Attribute",
			sysModuleVisa: "SysModuleVisa",
			isSystem: "IsSystem",
			type: "Type",
			modifiedOn: "ModifiedOn"
		}

		// endregion

	});

	return Terrasoft.SectionManager;
});


