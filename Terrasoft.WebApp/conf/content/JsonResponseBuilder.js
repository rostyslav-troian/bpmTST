Terrasoft.configuration.Structures["JsonResponseBuilder"] = {innerHierarchyStack: ["JsonResponseBuilder"], structureParent: "JsonRequestBuilder"};
define('JsonResponseBuilderStructure', ['JsonResponseBuilderResources'], function(resources) {return {schemaUId:'59766a00-441c-4c57-b562-26fc270d7e63',schemaCaption: "JsonResponseBuilder", parentSchemaName: "JsonRequestBuilder", schemaName:'JsonResponseBuilder',parentSchemaUId:'9ac37385-fe9b-4ad3-bcb1-9b5995b9976d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("JsonResponseBuilder", [], function() {
	return {
		attributes: {
			SetupRequestParameters: { value: false },
			SetupResponseParameters: { value: true }
		},
		methods: {

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.JsonRequestBuilder#prepareMethodJsonStructure
			 * @override
			 */
			prepareMethodJsonStructure: function(body) {
				return { response: { body: body } };
			},

			/**
			 * @inheritdoc Terrasoft.ServiceMethodBuilder#getMergeOptions
			 * @override
			 */
			getMergeOptions: function() {
				return {
					skipUri: true,
					skipHttpMethodType: true
				};
			},

			/**
			 * @inheritdoc Terrasoft.ServiceMethodBuilder#getServiceBuilderTags
			 * @override
			 */
			getServiceBuilderTags: function() {
				return ["ServiceResponseMethodBuilder"];
			}

			//endregion

		}
	};
});


