Terrasoft.configuration.Structures["RawResponseBuilder"] = {innerHierarchyStack: ["RawResponseBuilder"], structureParent: "ServiceMethodBuilder"};
define('RawResponseBuilderStructure', ['RawResponseBuilderResources'], function(resources) {return {schemaUId:'407a6125-9c37-4c09-a859-6089486323d4',schemaCaption: "RawResponseBuilder", parentSchemaName: "ServiceMethodBuilder", schemaName:'RawResponseBuilder',parentSchemaUId:'a311dcdd-f42a-4a9e-97fa-45e6cc325747',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("RawResponseBuilder", ["JsonServiceMetaDataConverter", "RawResponseJsonConverter"], function() {
	return {
		attributes: {
			SetupRequestParameters: {value: false},
			SetupResponseParameters: {value: true}
		},
		methods: {

			// region Methods: Protected

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
			 * @inheritdoc Terrasoft.ServiceMethodBuilder#parseMethod
			 * @override
			 */
			parseMethod: function() {
				var result;
				if (this.$InputData) {
					var rawToJsonConverter = this.Ext.create("Terrasoft.RawResponseJsonConverter");
					var json = rawToJsonConverter.convert(this.$InputData);
					if (json) {
						var jsonToParametersConverter = this.Ext.create("Terrasoft.JsonServiceMetaDataConverter", {
							codePrefix: Terrasoft.ServiceSchemaManager.schemaNamePrefix
						});
						result = jsonToParametersConverter.convert(json);
					}
				}
				return result;
			},

			/**
			 * @inheritdoc Terrasoft.ServiceMethodBuilder#getServiceBuilderTags
			 * @override
			 */
			getServiceBuilderTags: function() {
				return ["ServiceResponseMethodBuilder"];
			}

			// endregion

		}
	};
});


