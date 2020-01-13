Terrasoft.configuration.Structures["MarketingCalendarCampaignsPage"] = {innerHierarchyStack: ["MarketingCalendarCampaignsPage"], structureParent: "BaseMarketingCalendarPage"};
define('MarketingCalendarCampaignsPageStructure', ['MarketingCalendarCampaignsPageResources'], function(resources) {return {schemaUId:'134c6edd-9810-4f09-b28c-2f971610aa6b',schemaCaption: "MarketingCalendarCampaignsPage", parentSchemaName: "BaseMarketingCalendarPage", schemaName:'MarketingCalendarCampaignsPage',parentSchemaUId:'1c6cdb56-f417-440e-b836-d07b69e8b8a3',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MarketingCalendarCampaignsPage", ["terrasoft"],
	function(Terrasoft) {
		return {
			entitySchemaName: "CampaignPlanner",
			messages: {},
			attributes: {},
			methods: {
				/*
				 * @inheritdoc BaseMarketingCalendarPage#getSchemaName
				 * @overridden
				 */
				getSchemaName: function() {
					return "CampaignPlannerPage";
				},

				getProfileKey: function() {
					return "CampaignPlannerSectionGridSettingsGridDataView";
				},

				/*
				 * Recanculates column rows.
				 * @overridden
				 * @protected
				 */
				reCalcColumnRow: function() {
					var collection = this.get("GridData");
					collection.each(function(item) {
						item.set("Column", this.convertDateToColumn(item.get("StartDate")) - 1);
						item.set("Duration", this.convertDatesToDuration(item.get("StartDate"), item.get("DueDate")));
					}, this);
				},

				addTypeColumns: function(esq) {
					var esqColumns = esq.columns;
					var requiredColumns = ["StartDate", "DueDate", "Name"];
					this.Terrasoft.each(requiredColumns, function(column) {
						if (!esqColumns.contains(column)) {
							esq.addColumn(column);
						}
					});
				}
			},
			diff: [
				{
					"operation": "merge",
					"name": "MarketingCalendar",
					"values": {
						"itemConfig": {
							"rowSpan": 1,
							itemId: Terrasoft.generateGUID(),
							content: "Content"
						}
					}
				}
			]
		};
	}
);


