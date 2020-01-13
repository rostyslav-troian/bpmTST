Terrasoft.configuration.Structures["ExternalAccessRequestLogDetail"] = {innerHierarchyStack: ["ExternalAccessRequestLogDetail"], structureParent: "BaseGridDetailV2"};
define('ExternalAccessRequestLogDetailStructure', ['ExternalAccessRequestLogDetailResources'], function(resources) {return {schemaUId:'3c74dc56-ab80-45e1-ab1b-ca4a5bdd734e',schemaCaption: "ExternalAccessRequestLogDetail", parentSchemaName: "BaseGridDetailV2", schemaName:'ExternalAccessRequestLogDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ExternalAccessRequestLogDetail", [], function() {
	return {
		entitySchemaName: "ExternalAccessRequestLog",
		attributes: {
		},
		properties: {
		},
		methods: {
			/**
			 * @inheritdoc BaseDetailV2#init
			 * @override
			 */
			init: function() {
				this.$IsEnabled = false;
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc BaseDetailV2#getDetailInfo
			 * @override
			 */
			getDetailInfo: function() {
				const detailInfo = this.callParent(arguments);
				detailInfo.isEnabled = false;
				return detailInfo;
			}
		},

		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


