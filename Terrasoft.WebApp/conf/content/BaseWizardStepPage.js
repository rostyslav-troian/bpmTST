Terrasoft.configuration.Structures["BaseWizardStepPage"] = {innerHierarchyStack: ["BaseWizardStepPage"]};
define('BaseWizardStepPageStructure', ['BaseWizardStepPageResources'], function(resources) {return {schemaUId:'213cef19-18b6-4b2d-97ab-2e076665e2fc',schemaCaption: "BaseWizardStepPage", parentSchemaName: "", schemaName:'BaseWizardStepPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseWizardStepPage", [], function() {
	return {
		messages: {
			"Validate": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"ValidationResult": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			"Save": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"SavingResult": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * Gets saving result and publishes it.
			 * @private
			 * @param {Object} wizardInfo Wizard information.
			 */
			saveStep: function(wizardInfo) {
				var savingResult = this.getSavingResult(wizardInfo);
				this.sandbox.publish("SavingResult", savingResult, [this.sandbox.id]);
			},

			/**
			 * Gets validation result and publishes it.
			 * @private
			 * @param {Object} wizardInfo Wizard information.
			 */
			validateStep: function(wizardInfo) {
				var validationResult = this.getValidationResult(wizardInfo);
				this.sandbox.publish("ValidationResult", validationResult, [this.sandbox.id]);
			},

			//endregion

			//region Methods: Protected

			/**
			 * Gets subscribers tags.
			 * @protected
			 * @virtual
			 * @return {String[]}
			 */
			getSubscribersTags: function() {
				return [this.sandbox.id];
			},

			/**
			 * Subscribes messages.
			 * @protected
			 * @virtual
			 */
			subscribeMessages: function() {
				var subscribersTags = this.getSubscribersTags();
				this.sandbox.subscribe("Save", this.saveStep, this, subscribersTags);
				this.sandbox.subscribe("Validate", this.validateStep, this, subscribersTags);
			},

			/**
			 * Returns saving result.
			 * @abstract
			 */
			getSavingResult: Terrasoft.abstractFn,

			/**
			 * Returns validation result.
			 * @abstract
			 */
			getValidationResult: Terrasoft.abstractFn,

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.subscribeMessages();
					callback.call(scope);
				}, this]);
			}

			//endregion

		}
	};
});


