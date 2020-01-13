Terrasoft.configuration.Structures["BulkEmailSubscriptionDetailV2"] = {innerHierarchyStack: ["BulkEmailSubscriptionDetailV2"], structureParent: "BaseGridDetailV2"};
define('BulkEmailSubscriptionDetailV2Structure', ['BulkEmailSubscriptionDetailV2Resources'], function(resources) {return {schemaUId:'9279bf51-0e88-42e9-92e7-021f04278f84',schemaCaption: "Contact subscription detail schema", parentSchemaName: "BaseGridDetailV2", schemaName:'BulkEmailSubscriptionDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BulkEmailSubscriptionDetailV2", [], function() {
	return {
		entitySchemaName: "BulkEmailSubscription",
		methods: {
			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
			 * @overridden
			 */
			getCopyRecordMenuItem: Terrasoft.emptyFn
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


