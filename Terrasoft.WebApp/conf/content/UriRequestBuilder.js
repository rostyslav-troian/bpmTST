Terrasoft.configuration.Structures["UriRequestBuilder"] = {innerHierarchyStack: ["UriRequestBuilder"], structureParent: "ParametrizedServiceMethodBuilder"};
define('UriRequestBuilderStructure', ['UriRequestBuilderResources'], function(resources) {return {schemaUId:'f9d31ee2-d8d7-412f-98e2-3f8d582ca88b',schemaCaption: "UriRequestBuilder", parentSchemaName: "ParametrizedServiceMethodBuilder", schemaName:'UriRequestBuilder',parentSchemaUId:'e5aa3ba0-cb18-4c42-983a-5be26426176d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("UriRequestBuilder", ["UriJsonConverter"], function() {
	return {
		attributes: {

			/**
			 * Request URI.
			 */
			Uri: {
				dataValueType: Terrasoft.DataValueType.TEXT
			},

			/**
			 * Indicates if response parameters can be set up.
			 */
			SetupMethodType: { value: false }

		},
		methods: {

			//region Methods: Private

			/**
			 * @private
			 */
			_getUriParametersJson: function() {
				const uriConverter = new Terrasoft.UriJsonConverter();
				return uriConverter.convert(this.$Uri);
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.ServiceMethodBuilder#getMergeOptions
			 * @override
			 */
			getMergeOptions: function() {
				return {
					skipUri: false,
					skipHttpMethodType: true
				};
			},

			/**
			 * @inheritdoc Terrasoft.ServiceMethodBuilder#parseMethod
			 * @override
			 */
			parseMethod: function() {
				var method;
				const metaDataConverter = this.Ext.create("Terrasoft.JsonServiceMetaDataConverter", {
					codePrefix: Terrasoft.ServiceSchemaManager.schemaNamePrefix
				});
				method = metaDataConverter.convert(this._getUriParametersJson());
				this.prepareUri(method);
				return method;
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritDoc Terrasoft.ModalBoxSchemaModule#init.
			 * @overridden
			 */
			init: function(callback, scope) {
				this.callParent([
					function() {
						var moduleInfo = this.get("moduleInfo") || {};
						this.$Uri = moduleInfo.uri;
						this.parse();
						Ext.callback(callback, scope);
					}, this
				]);
			}

			//endregion
		}
	};
});


