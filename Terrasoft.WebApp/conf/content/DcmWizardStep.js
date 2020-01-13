Terrasoft.configuration.Structures["DcmWizardStep"] = {innerHierarchyStack: ["DcmWizardStep"]};
define('DcmWizardStepStructure', ['DcmWizardStepResources'], function(resources) {return {schemaUId:'ba355680-14e3-482c-a8cd-caf41205a9a6',schemaCaption: "DcmWizardStep", parentSchemaName: "", schemaName:'DcmWizardStep',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DcmWizardStep", ["terrasoft", "ext-base", "WizardStep", "DcmUtilities"], function(Terrasoft, Ext) {
	/**
	 * @class Terrasoft.configuration.DcmWizardStep
	 * DCM wizard step view model.
	 */
	Ext.define("Terrasoft.configuration.DcmWizardStep", {
		extend: "Terrasoft.WizardStep",
		alternateClassName: "Terrasoft.DcmWizardStep",

		/**
		 * @inheritdoc WizardStep#initCanUseStep
		 * @overridden
		 */
		initCanUseStep: function(callback, scope) {
			Terrasoft.DcmUtilities.checkCanManageDcmRights(function(allow) {
				this.set(this.canUseStepPropertyName, allow);
				Ext.callback(callback, scope);
			}, this);
		}

	});

	return Terrasoft.DcmWizardStep;
});


