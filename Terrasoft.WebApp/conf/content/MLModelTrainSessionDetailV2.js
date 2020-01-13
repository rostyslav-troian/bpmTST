Terrasoft.configuration.Structures["MLModelTrainSessionDetailV2"] = {innerHierarchyStack: ["MLModelTrainSessionDetailV2"], structureParent: "BaseGridDetailV2"};
define('MLModelTrainSessionDetailV2Structure', ['MLModelTrainSessionDetailV2Resources'], function(resources) {return {schemaUId:'4deefdad-f4c1-4c09-bda4-d39004ad75e2',schemaCaption: "MLModelTrainSessionDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'MLModelTrainSessionDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MLModelTrainSessionDetailV2", function() {
	return {
		entitySchemaName: "MLTrainSession",
		diff: /**SCHEMA_DIFF*/[
		]/**SCHEMA_DIFF*/,
		methods: {
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


