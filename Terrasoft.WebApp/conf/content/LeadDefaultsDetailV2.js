Terrasoft.configuration.Structures["LeadDefaultsDetailV2"] = {innerHierarchyStack: ["LeadDefaultsDetailV2"], structureParent: "BaseGridDetailV2"};
define('LeadDefaultsDetailV2Structure', ['LeadDefaultsDetailV2Resources'], function(resources) {return {schemaUId:'66ab9657-9cac-4f8a-b3bb-65580616cb3a',schemaCaption: "Values detail - Lead fields by default", parentSchemaName: "BaseGridDetailV2", schemaName:'LeadDefaultsDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LeadDefaultsDetailV2", function() {
		return {
			entitySchemaName: "LandingLeadDefaults",
			diff: /**SCHEMA_DIFF*/[
			]/**SCHEMA_DIFF*/,
			methods: {
				/**
				 * @inheritdoc Terrasoft.BasePageV2#getGridSettingsMenuItem
				 * @overridden
				 */
				getGridSettingsMenuItem: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BasePageV2#addDetailWizardMenuItems
				 * @overridden
				 */
				addDetailWizardMenuItems: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BasePageV2#getCopyRecordMenuItem
				 * @overridden
				 */
				getCopyRecordMenuItem: Terrasoft.emptyFn
			}
		}
	});


