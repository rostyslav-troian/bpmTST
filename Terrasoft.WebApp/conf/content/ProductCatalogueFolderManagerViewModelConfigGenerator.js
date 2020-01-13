Terrasoft.configuration.Structures["ProductCatalogueFolderManagerViewModelConfigGenerator"] = {innerHierarchyStack: ["ProductCatalogueFolderManagerViewModelConfigGenerator"]};
define('ProductCatalogueFolderManagerViewModelConfigGeneratorStructure', ['ProductCatalogueFolderManagerViewModelConfigGeneratorResources'], function(resources) {return {schemaUId:'139bc7d0-97c7-4632-860e-fc9e2a840538',schemaCaption: "View model config generator for product catalogue FolderManager", parentSchemaName: "", schemaName:'ProductCatalogueFolderManagerViewModelConfigGenerator',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProductCatalogueFolderManagerViewModelConfigGenerator", ["FolderManagerViewModelConfigGenerator"],
	function() {
		return Ext.define("Terrasoft.ProductCatalogueFolderManagerViewModelConfigGenerator", {
			extend: "Terrasoft.FolderManagerViewModelConfigGenerator",

			/**
			 * @inheritdoc Terrasoft.FolderManagerViewModelConfigGenerator#generate
			 * @override
			 */
			generate: function() {
				var viewModelConfig = this.callParent(arguments);
				Ext.merge(viewModelConfig, {
					values: {
						IsProductSelectMode: true,
						IsCloseButtonVisible: false,
						IsFoldersContainerVisible: true,
						IsExtendCatalogueFilterContainerVisible: false
					}
				});
				return viewModelConfig;
			}
		});
	}
);


