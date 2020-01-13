Terrasoft.configuration.Structures["PortalMainPageModule"] = {innerHierarchyStack: ["PortalMainPageModule"]};
define("PortalMainPageModule", [ "PortalClientConstants", "MainHeaderSchema", "DashboardsModule",
	"PortalMainPageBuilder"],
	function(PortalClientConstants) {
		/**
		 * @class Terrasoft.configuration.PortalMainPageModule
		 * Portal main page module.
		 */
		Ext.define("Terrasoft.configuration.PortalMainPageModule", {
			extend: "Terrasoft.DashboardsModule",
			alternateClassName: "Terrasoft.PortalMainPageModule",

			/**
			 * Base portal main page view model class name.
			 * @type {String}
			 */
			viewModelClassName: "Terrasoft.BasePortalMainPageViewModel",

			/**
			 * Portal main page builder class name.
			 * @type {String}
			 */
			builderClassName: "Terrasoft.PortalMainPageBuilder",

			/**
			 * Portal main page view generator class name.
			 * @type {String}
			 */
			viewConfigClass: "Terrasoft.PortalMainPageViewConfig",

			/**
			 * @inheritDoc Terrasoft.configuration.BaseSchemaModule#getProfileKey
			 * @overridden
			 */
			getProfileKey: function() {
				return "PortalMainPageId";
			},

			/**
			 * @inheritDoc Terrasoft.configuration.DashboardsModule#getDashboardSectionId
			 * @override
			 */
			getDashboardSectionId: function() {
				return PortalClientConstants.SysModule.PortalMainPageSectionId;
			}
		});
		return Terrasoft.PortalMainPageModule;
	}
);


