Terrasoft.configuration.Structures["PrmPortalFunnelBaseDataProvider"] = {innerHierarchyStack: ["PrmPortalFunnelBaseDataProvider"]};
define("PrmPortalFunnelBaseDataProvider", ["FunnelBaseDataProvider"],
	function() {

		/**
		 * @class Terrasoft.configuration.PrmPortalFunnelBaseDataProvider
		 * Base class to build funnel chart.
		 */
		Ext.define("Terrasoft.configuration.PrmPortalFunnelBaseDataProvider", {
			override :  "Terrasoft.FunnelBaseDataProvider",
			alternateClassName: "Terrasoft.PrmPortalFunnelBaseDataProvider",
			
			rootSchemaName: "VwPortalOpportunity"
		});
	});



