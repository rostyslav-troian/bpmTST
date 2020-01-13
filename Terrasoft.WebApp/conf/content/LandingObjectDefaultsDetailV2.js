Terrasoft.configuration.Structures["LandingObjectDefaultsDetailV2"] = {innerHierarchyStack: ["LandingObjectDefaultsDetailV2"], structureParent: "BaseGridDetailV2"};
define('LandingObjectDefaultsDetailV2Structure', ['LandingObjectDefaultsDetailV2Resources'], function(resources) {return {schemaUId:'e1077c59-7fe3-4e2f-86c9-48eb35e29598',schemaCaption: "LandingObjectDefaultsDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'LandingObjectDefaultsDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LandingObjectDefaultsDetailV2", function() {
	return {
		entitySchemaName: "LandingObjectDefaults",
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
	};
});


