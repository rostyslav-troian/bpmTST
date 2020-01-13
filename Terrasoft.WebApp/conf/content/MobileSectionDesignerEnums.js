Terrasoft.configuration.Structures["MobileSectionDesignerEnums"] = {innerHierarchyStack: ["MobileSectionDesignerEnums"]};
define("MobileSectionDesignerEnums", ["MobileSectionDesignerEnumsResources"], function() {

	Ext.ns("Terrasoft.MobileSectionDesignerEnums");

	/**
	 * Mobile base grid settings schema UId.
	 * @enum
	 */
	Terrasoft.MobileSectionDesignerEnums.BaseMobileGridPageSettingsUId = "d95270f5-6b67-444d-83ac-5a1555857650";

	/**
	 * Default modules for new workplace.
	 * @Array
	 */
	Terrasoft.MobileSectionDesignerEnums.DefaultManifestModules = ["Contact", "Account", "Activity", "SocialMessage"];

	/**
	 * List of modules that are not configurable.
	 * @Array
	 */
	Terrasoft.MobileSectionDesignerEnums.NotConfigurableModules = ["SocialMessage", "SysDashboard"];

	/**
	 * List of non-standard modules.
	 * @enum
	 * Key: module name
	 * Value: module code (from SysModule table)
	 */
	Terrasoft.MobileSectionDesignerEnums.ModuleWithoutSysModuleEntity = {
		SysDashboard: "Dashboard"
	};

});


