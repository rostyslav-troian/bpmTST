Terrasoft.configuration.Structures["MarketingCalendarCampaignsModule"] = {innerHierarchyStack: ["MarketingCalendarCampaignsModule"]};
define("MarketingCalendarCampaignsModule", ["BaseSchemaModuleV2", "ViewGeneratorV2", "MarketingCalendarCampaignsPage"],
	function() {
		Ext.define("Terrasoft.configuration.MarketingCalendarCampaignsModule", {
			extend: "Terrasoft.BaseSchemaModule",
			alternateClassName: "Terrasoft.MarketingCalendarCampaignsModule",

			/**
			 * @inheritdoc BaseSchemaModuleV2#initSchemaName
			 * @overridden
			 */
			initSchemaName: function() {
				this.schemaName = "MarketingCalendarCampaignsPage";
				this.entitySchemaName = "CampaignPlanner";
			},

			/**
			 * @inheritdoc BaseSchemaModuleV2#initHistoryState
			 * @overridden
			 */
			initHistoryState: Terrasoft.emptyFn,

			getProfileKey: function() {
				//return "MarketingCalendar" + this.entitySchemaName + "_GridSettings";
				return "CampaignPlannerSectionGridSettingsGridDataView";
			}
		});
		return Terrasoft.MarketingCalendarCampaignsModule;
	});


