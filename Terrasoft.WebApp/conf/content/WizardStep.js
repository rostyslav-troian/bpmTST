Terrasoft.configuration.Structures["WizardStep"] = {innerHierarchyStack: ["WizardStep"]};
define('WizardStepStructure', ['WizardStepResources'], function(resources) {return {schemaUId:'4f1b2572-87ac-48bb-9f57-102769f3f9be',schemaCaption: "Wizard step view model", parentSchemaName: "", schemaName:'WizardStep',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("WizardStep", ["terrasoft", "WizardUtilities"], function(Terrasoft) {
	/**
	 * @class Terrasoft.configuration.WizardStep
	 * ##### ###### ############# ####.
	 */
	Ext.define("Terrasoft.configuration.WizardStep", {
		extend: "Terrasoft.BaseViewModel",
		alternateClassName: "Terrasoft.WizardStep",

		mixins: {
			WizardUtilities: "Terrasoft.WizardUtilities"
		},

		/**
		 * ### ######## ########### ####.
		 * @type {String}
		 */
		selectedPropertyName: "Selected",

		/**
		 * Name of the attribute that determines whether can use a step.
		 * @type {String}
		 */
		canUseStepPropertyName: "CanUseStep",

		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
				"click",
				"select"
			);
			this.set(this.selectedPropertyName, false);
		},

		/**
		 * Initializes section wizard step.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		init: function(callback, scope) {
			this.initCanUseStep(callback, scope);
		},

		/**
		 * Init user permissions.
		 * @protected
		 * @param {Function} callback Callback method.
		 * @param {Object} scope Callback method context.
		 */
		initCanUseStep: function(callback, scope) {
			this.canUseWizard(function(allow) {
				this.set(this.canUseStepPropertyName, allow);
				Ext.callback(callback, scope);
			}, this);
		},

		/**
		 * ############ ####### ## ###.
		 */
		click: function(tag) {
			var stepCollection = this.get("StepCollection");
			var stepName;
			if (tag && !stepCollection.isEmpty()) {
				var item = stepCollection.get(tag);
				stepName = item.get("name");
				this.fireEvent("click", stepName);
			} else if (!stepCollection || stepCollection.isEmpty()) {
				stepName = this.get("name");
				this.fireEvent("click", stepName);
			} else {
				return false;
			}
		},

		/**
		 * ############ ######### ####.
		 */
		select: function() {
			if (!this.get(this.selectedPropertyName)) {
				this.set(this.selectedPropertyName, true);
				var stepName = this.get("name");
				this.fireEvent("select", stepName);
			}
		},

		/**
		 * ############ ###### ######### ####.
		 */
		unSelect: function() {
			this.set(this.selectedPropertyName, false);
		},

		/**
		 * ########## ####### ####### ## ####.
		 * @return ########## ####### ####### ## ####.
		 */
		isSelected: function() {
			return this.get(this.selectedPropertyName);
		},

		/**
		 * Returns flag that indicates whether can use step.
		 * @return {Boolean}
		 */
		canUseStep: function() {
			return this.get(this.canUseStepPropertyName);
		}

	});

	return Terrasoft.DcmWizardStep;
});



