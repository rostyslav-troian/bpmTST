Terrasoft.configuration.Structures["JsonRequestBuilder"] = {innerHierarchyStack: ["JsonRequestBuilder"], structureParent: "ServiceMethodBuilder"};
define('JsonRequestBuilderStructure', ['JsonRequestBuilderResources'], function(resources) {return {schemaUId:'9ac37385-fe9b-4ad3-bcb1-9b5995b9976d',schemaCaption: "JsonRequestBuilder", parentSchemaName: "ServiceMethodBuilder", schemaName:'JsonRequestBuilder',parentSchemaUId:'a311dcdd-f42a-4a9e-97fa-45e6cc325747',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("JsonRequestBuilder", ["JsonServiceMetaDataConverter"], function() {
	return {
		attributes: {
			SetupResponseParameters: { value: false }
		},
		methods: {

			//region Methods: Protected

			/**
			 * Returns method json structure.
			 * @returns {Object} Json structure.
			 * @protected
			 */
			prepareMethodJsonStructure: function(body) {
				return { request: { body: body } };
			},

			/**
			 * @inheritdoc Terrasoft.ServiceMethodBuilder#parseMethod
			 * @override
			 */
			parseMethod: function() {
				var result;
				var body = Ext.JSON.decode(this.$InputData, true);
				if (body) {
					var parsedJson = this.prepareMethodJsonStructure(body);
					var jsonToParametersConverter = this.Ext.create("Terrasoft.JsonServiceMetaDataConverter", {
						codePrefix: Terrasoft.ServiceSchemaManager.schemaNamePrefix
					});
					result = jsonToParametersConverter.convert(parsedJson);
				}
				return result;
			},

			/**
			 * @inheritdoc Terrasoft.ServiceMethodBuilder#getMergeOptions
			 * @override
			 */
			getMergeOptions: function() {
				return {
					skipUri: true,
					skipHttpMethodType: false
				};
			}

			//endregion

		}
	};
});


