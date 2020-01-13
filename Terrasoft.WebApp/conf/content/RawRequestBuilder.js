Terrasoft.configuration.Structures["RawRequestBuilder"] = {innerHierarchyStack: ["RawRequestBuilder"], structureParent: "CurlRequestBuilder"};
define('RawRequestBuilderStructure', ['RawRequestBuilderResources'], function(resources) {return {schemaUId:'b82370ab-0496-4880-b48b-711e3f027d94',schemaCaption: "RawRequestBuilder", parentSchemaName: "CurlRequestBuilder", schemaName:'RawRequestBuilder',parentSchemaUId:'2f6d6029-86db-40d6-ba61-5b5d35b64cc1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("RawRequestBuilder", ["RawJsonConverter", "JsonServiceMetaDataConverter"], function() {
	return {
		methods: {

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.ServiceMethodBuilder#parseMethod
			 * @override
			 */
			parseMethod: function() {
				var result;
				if (this.$InputData) {
					var rawToJsonConverter = this.Ext.create("Terrasoft.RawJsonConverter");
					var json = rawToJsonConverter.convert(this.$InputData);
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

			// endregion

		}
	};
});


