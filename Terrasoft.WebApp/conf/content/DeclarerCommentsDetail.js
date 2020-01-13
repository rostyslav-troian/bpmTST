Terrasoft.configuration.Structures["DeclarerCommentsDetail"] = {innerHierarchyStack: ["DeclarerCommentsDetail"], structureParent: "BaseGridDetailV2"};
define('DeclarerCommentsDetailStructure', ['DeclarerCommentsDetailResources'], function(resources) {return {schemaUId:'21c6620d-11cf-4d2a-a29e-ce22aa637c27',schemaCaption: "Declarer comments detail", parentSchemaName: "BaseGridDetailV2", schemaName:'DeclarerCommentsDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DeclarerCommentsDetail", [], function() {
	return {
		entitySchemaName: "VwDeclarerComments",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		methods: {
			/**
			 * @inheritdoc BaseGridDetailV2#addRecordOperationsMenuItems
			 * @overridden
			 */
			addRecordOperationsMenuItems: this.Terrasoft.emptyFn
		}
	};
});


