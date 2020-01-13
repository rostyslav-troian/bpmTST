Terrasoft.configuration.Structures["SectionPageDesignerHeaderViewConfig"] = {innerHierarchyStack: ["SectionPageDesignerHeaderViewConfig"]};
define('SectionPageDesignerHeaderViewConfigStructure', ['SectionPageDesignerHeaderViewConfigResources'], function(resources) {return {schemaUId:'eef40689-34c7-48a5-8e23-79f896cf7c9b',schemaCaption: "SectionPageDesignerHeaderViewConfig", parentSchemaName: "", schemaName:'SectionPageDesignerHeaderViewConfig',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SectionPageDesignerHeaderViewConfig", [
	"SectionPageDesignerHeaderViewConfigResources",
	"SectionPageDesignerHeaderModule",
	"PageDesignerHeaderViewConfig"
], function(resources) {

	/**
	 * Class for SectionPageDesignerHeaderViewConfig.
	 */
	Ext.define("Terrasoft.configuration.SectionPageDesignerHeaderViewConfig", {
		extend: "Terrasoft.configuration.PageDesignerHeaderViewConfig",
		alternateClassName: "Terrasoft.SectionPageDesignerHeaderViewConfig",

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.PageDesignerHeaderViewConfig#getUtilsLeftContainerViewConfig
		 * @override
		 */
		getUtilsLeftContainerViewConfig: function() {
			const config = this.callParent();
			const saveButtonConfig = _.find(config.items, {name: "SaveButton"});
			saveButtonConfig.caption = resources.localizableStrings.SaveButtonCaption;
			saveButtonConfig.style = Terrasoft.controls.ButtonEnums.style.GREEN;
			saveButtonConfig.imageConfig = resources.localizableImages.SaveButtonImage;
			saveButtonConfig.tips[0].content = resources.localizableStrings.SaveButtonHint;
			return config;
		}

		//endregion
	});

});


