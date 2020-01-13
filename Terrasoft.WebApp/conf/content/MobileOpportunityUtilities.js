Terrasoft.configuration.Structures["MobileOpportunityUtilities"] = {innerHierarchyStack: ["MobileOpportunityUtilities"]};
/* Hides SysDashboard module - if mobile application in online mode */
if (!Terrasoft.Features.getIsEnabled("ShowMobileDashboards") && Terrasoft.ApplicationUtils.isOnlineMode()) {
	Terrasoft.ApplicationConfig.moduleGroups.get("sales").modules.splice(0, 1);
}


