Terrasoft.configuration.Structures["CalendarSyncSettingsErrors"] = {innerHierarchyStack: ["CalendarSyncSettingsErrors"], structureParent: "SyncSettingsErrors"};
define('CalendarSyncSettingsErrorsStructure', ['CalendarSyncSettingsErrorsResources'], function(resources) {return {schemaUId:'5660b75d-4b9c-4cdd-8619-5907a736fcd8',schemaCaption: "CalendarSyncSettingsErrors", parentSchemaName: "SyncSettingsErrors", schemaName:'CalendarSyncSettingsErrors',parentSchemaUId:'8819dacd-40a4-4336-a58e-ed3a9cb773b7',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CalendarSyncSettingsErrors", ["SyncSettingsErrors"], function() {
	return {
		methods: {

			//region methods: protected

			addSyncFilters: function(esq) {
				let syncronizationFilters = esq.createFilterGroup();
				syncronizationFilters.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
				const activitySyncColumnPathTpl = "[ActivitySyncSettings:MailboxSyncSettings:Id].{0}";
				syncronizationFilters.add("calendarFilter", esq.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL,
					Ext.String.format(activitySyncColumnPathTpl,"ImportAppointments"),
					true));
				syncronizationFilters.add("tasksFilter", esq.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL,
					Ext.String.format(activitySyncColumnPathTpl,"ImportTasks"),
					true));
				syncronizationFilters.add("activitiesFilter", esq.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL,
					Ext.String.format(activitySyncColumnPathTpl,"ExportActivities"),
					true));
				esq.filters.add("HasActivitySync", syncronizationFilters);
			}

			//endregion
		}
	};
});


