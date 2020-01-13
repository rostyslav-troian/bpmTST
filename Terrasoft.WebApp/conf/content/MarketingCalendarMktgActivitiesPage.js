Terrasoft.configuration.Structures["MarketingCalendarMktgActivitiesPage"] = {innerHierarchyStack: ["MarketingCalendarMktgActivitiesPage"], structureParent: "BaseMarketingCalendarPage"};
define('MarketingCalendarMktgActivitiesPageStructure', ['MarketingCalendarMktgActivitiesPageResources'], function(resources) {return {schemaUId:'c8bdc96b-2c3f-40af-936a-e88a69211e25',schemaCaption: "MarketingCalendarMktgActivitiesPage", parentSchemaName: "BaseMarketingCalendarPage", schemaName:'MarketingCalendarMktgActivitiesPage',parentSchemaUId:'1c6cdb56-f417-440e-b836-d07b69e8b8a3',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MarketingCalendarMktgActivitiesPage", [],
	function() {
		return {
			entitySchemaName: "MktgActivity",
			messages: {},
			attributes: {},
			methods: {
				/*
				* @inheritdoc BaseMarketingCalendarPage#getSchemaName
				* @overridden
				*/
				getSchemaName: function() {
					return "MktgActivityPage";
				},

				getProfileKey: function() {
					return "MktgActivitySectionGridSettingsGridDataView";
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

				getSectionModuleId: function() {
					return "SectionModuleV2_MktgActivitySection";
				},

				/**
				 * Generates quick filter module id.
				 * @protected
				 * @return {String} Module id.
				 */
				getQuickFilterModuleId: function() {
					return "SectionModuleV2_MktgActivitySection_QuickFilterModuleV2";
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
			diff: []
		};
	}
);


