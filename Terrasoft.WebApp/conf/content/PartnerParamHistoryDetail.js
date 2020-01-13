Terrasoft.configuration.Structures["PartnerParamHistoryDetail"] = {innerHierarchyStack: ["PartnerParamHistoryDetail"], structureParent: "BaseGridDetailV2"};
define('PartnerParamHistoryDetailStructure', ['PartnerParamHistoryDetailResources'], function(resources) {return {schemaUId:'2349e381-2d92-4cbc-8ab9-02e1242420e3',schemaCaption: "Detail schema: \"History of partnership parameter\"", parentSchemaName: "BaseGridDetailV2", schemaName:'PartnerParamHistoryDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PartnerParamHistoryDetail", [], function() {
	return {
		entitySchemaName: "PartnerParamHistory",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "AddRecordButton"
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			getCopyRecordMenuItem: Terrasoft.emptyFn,
			getEditRecordMenuItem: Terrasoft.emptyFn,
			getDeleteRecordMenuItem: Terrasoft.emptyFn,
			getGridSettingsMenuItem: Terrasoft.emptyFn,
			addDetailWizardMenuItems: Terrasoft.emptyFn
		}
	};
});


