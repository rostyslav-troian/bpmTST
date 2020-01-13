Terrasoft.configuration.Structures["CurlRequestBuilder"] = {innerHierarchyStack: ["CurlRequestBuilder"], structureParent: "ParametrizedServiceMethodBuilder"};
define('CurlRequestBuilderStructure', ['CurlRequestBuilderResources'], function(resources) {return {schemaUId:'2f6d6029-86db-40d6-ba61-5b5d35b64cc1',schemaCaption: "CurlRequestBuilder", parentSchemaName: "ParametrizedServiceMethodBuilder", schemaName:'CurlRequestBuilder',parentSchemaUId:'e5aa3ba0-cb18-4c42-983a-5be26426176d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CurlRequestBuilder", ["CurlJsonConverter"], function() {
	return {
		methods: {

			//region Methods: Private

			/**
			 * @private
			 */
			_prepareMethodType: function(method) {
				this.$ParsedMethodType = {
					displayValue: method.request.findHttpMethodTypeName(),
					value: method.request.httpMethodType
				};
				delete this.changedValues.ParsedMethodType;
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.ServiceMethodBuilder#getMergeOptions
			 * @override
			 */
			getMergeOptions: function() {
				return {
					skipUri: !this.changedValues.ParsedMethodUri,
					skipHttpMethodType: false,
					useAuth: this.$ParsedMethod.useAuthInfo
				};
			},

			/**
			 * @inheritdoc Terrasoft.ServiceMethodBuilder#parseMethod
			 * @override
			 */
			parseMethod: function() {
				var result;
				if (this.$InputData) {
					var curlToJsonConverter = this.Ext.create("Terrasoft.CurlJsonConverter");
					var json = curlToJsonConverter.convert(this.$InputData);
					if (json) {
						var jsonToParametersConverter = this.Ext.create("Terrasoft.JsonServiceMetaDataConverter", {
							codePrefix: Terrasoft.ServiceSchemaManager.schemaNamePrefix
						});
						result = jsonToParametersConverter.convert(json);
						this.prepareUri(result);
						this._prepareMethodType(result);
					}
				}
				return result;
			}

			//endregion

		}
	};
});


