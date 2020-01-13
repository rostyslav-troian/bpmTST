Terrasoft.configuration.Structures["EventSectionV2"] = {innerHierarchyStack: ["EventSectionV2"], structureParent: "BaseSectionV2"};
define('EventSectionV2Structure', ['EventSectionV2Resources'], function(resources) {return {schemaUId:'f7b9e8df-07c1-431b-ac59-140fbe397949',schemaCaption: "\"Event\" section page schema", parentSchemaName: "BaseSectionV2", schemaName:'EventSectionV2',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EventSectionV2", ["SegmentsStatusUtils"],
function(SegmentsStatusUtils) {
	return {
		entitySchemaName: "Event",
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		messages: {},
		methods: {
			/**
			 * ##### ######## "######## ###### #####".
			 * @protected
			 */
			updateContactList: function() {
				var activeRow = this.getActiveRow();
				var eventId = activeRow.get("Id");
				this.callService({
					serviceName: "MandrillService",
					methodName: "UpdateTargetAudience",
					data: {schemaName: "Event", recordId: eventId}
				}, this.onUpdateContactListLaunched, this);
			},

			/*
			 * ########## ######## # #########.
			 * @protected
			 */
			onUpdateContactListLaunched: function() {
				var scope = this;
				setTimeout(function() {
					var activeRow = scope.getActiveRow();
					var eventId = activeRow.get("Id");
					if (scope.get("IsCardVisible")) {
						scope.editRecord(eventId);
					}
				}, SegmentsStatusUtils.timeoutBeforeUpdate);
			}
		}
	};
});


