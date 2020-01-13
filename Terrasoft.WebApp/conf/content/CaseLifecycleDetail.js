Terrasoft.configuration.Structures["CaseLifecycleDetail"] = {innerHierarchyStack: ["CaseLifecycleDetail"], structureParent: "BaseGridDetailV2"};
define('CaseLifecycleDetailStructure', ['CaseLifecycleDetailResources'], function(resources) {return {schemaUId:'ec034524-d9a4-4cf6-b896-745b2841f112',schemaCaption: "Case lifecycle detail", parentSchemaName: "BaseGridDetailV2", schemaName:'CaseLifecycleDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CaseLifecycleDetail", [],
	function() {
		return {
			entitySchemaName: "CaseLifecycle",
			attributes: {},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
			methods: {
				addRecordOperationsMenuItems: Terrasoft.emptyFn
			},
			messages: {}
		};
	}
);


