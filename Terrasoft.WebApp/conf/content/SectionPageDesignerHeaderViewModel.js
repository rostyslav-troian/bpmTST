Terrasoft.configuration.Structures["SectionPageDesignerHeaderViewModel"] = {innerHierarchyStack: ["SectionPageDesignerHeaderViewModel"]};
define('SectionPageDesignerHeaderViewModelStructure', ['SectionPageDesignerHeaderViewModelResources'], function(resources) {return {schemaUId:'a30e6c17-7c31-48eb-b5bd-2c95ba258330',schemaCaption: "SectionPageDesignerHeaderViewModel", parentSchemaName: "", schemaName:'SectionPageDesignerHeaderViewModel',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SectionPageDesignerHeaderViewModel", ["MaskHelper", "PageDesignerHeaderViewModel"], function() {

	/**
	 * Class for SectionPageDesignerHeaderViewModel.
	 */
	Ext.define("Terrasoft.configuration.SectionPageDesignerHeaderViewModel", {
		extend: "Terrasoft.configuration.PageDesignerHeaderViewModel",
		alternateClassName: "Terrasoft.SectionPageDesignerHeaderViewModel",

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.WizardHeaderViewModel#saveButtonClick
		 * @override
		 */
		saveButtonClick: function() {
			this.sandbox.publish("CurrentStepChange", null, [this.sandbox.id]);
		},

		/**
		 * @inheritdoc Terrasoft.WizardHeaderViewModel#isCancelButtonVisible
		 * @override
		 */
		isCancelButtonVisible: function() {
			return false;
		}

		//endregion

	});

	return Terrasoft.SectionPageDesignerHeaderViewModel;
});


