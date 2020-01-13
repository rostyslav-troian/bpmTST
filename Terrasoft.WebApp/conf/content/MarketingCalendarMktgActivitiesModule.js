Terrasoft.configuration.Structures["MarketingCalendarMktgActivitiesModule"] = {innerHierarchyStack: ["MarketingCalendarMktgActivitiesModule"]};
define("MarketingCalendarMktgActivitiesModule", ["BaseSchemaModuleV2", "ViewGeneratorV2",
		"MarketingCalendarMktgActivitiesPage"],
	function() {
		Ext.define("Terrasoft.configuration.MarketingCalendarMktgActivitiesModule", {
			extend: "Terrasoft.BaseSchemaModule",
			alternateClassName: "Terrasoft.MarketingCalendarMktgActivitiesModule",

			/**
			 * @inheritdoc BaseSchemaModuleV2#initSchemaName
			 * @overridden
			 */
			initSchemaName: function() {
				this.schemaName = "MarketingCalendarMktgActivitiesPage";
				this.entitySchemaName = "MktgActivity";
			},

			/**
			 * @inheritdoc BaseSchemaModuleV2#initHistoryState
			 * @overridden
			 */
			initHistoryState: Terrasoft.emptyFn,

			getProfileKey: function() {
				//return "MarketingCalendar" + this.entitySchemaName + "_GridSettings";
				return "MktgActivitySectionGridSettingsGridDataView";
			}
		});
		return Terrasoft.MarketingCalendarMktgActivitiesModule;
	});


