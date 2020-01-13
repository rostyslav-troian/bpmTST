Terrasoft.configuration.Structures["BaseWizardStepSchemaMixin"] = {innerHierarchyStack: ["BaseWizardStepSchemaMixin"]};
define("BaseWizardStepSchemaMixin", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	Ext.define("Terrasoft.configuration.mixins.BaseWizardStepSchemaMixin", {
		alternateClassName: "Terrasoft.BaseWizardStepSchemaMixin",

		//region Methods: Private

		/**
		 * Returns wizard step messages.
		 * @private
		 * @return {Object} Messages.
		 */
		getWizardStepMessages: function() {
			return {
				/**
				 * @message GetModuleConfig
				 * Publishing message for section parameters request.
				 */
				"GetModuleConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetModuleConfigResult
				 * Subscribing on message for section parameters request.
				 */
				"GetModuleConfigResult": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message Validate
				 * Subscribing on message for section parameters validation request.
				 */
				"Validate": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message ValidationResult
				 * Publishing message for section parameters validation sending.
				 */
				"ValidationResult": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message Save
				 * Subscribing on message for section saving request.
				 */
				"Save": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message SavingResult
				 * Publishing message for sending section saved results.
				 */
				"SavingResult": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			};
		},

		/**
		 * Subscribes sandbox messages.
		 * @private
		 */
		subscribeWizardStepMessages: function() {
			var sandboxId = this.sandbox.id;
			this.sandbox.subscribe("Save", this.onSave, this, [sandboxId]);
			this.sandbox.subscribe("Validate", this.onValidate, this, [sandboxId]);
		},

		//endregion

		//region Methods: Protected

		/**
		 * Processes saving on save/left wizard action.
		 * @abstract
		 * @protected
		 * @virtual
		 */
		onSave: function() {
			this.publishSavingResult();
		},

		/**
		 * Processes validation on save/left wizard action.
		 * @abstract
		 * @protected
		 * @virtual
		 */
		onValidate: function() {
			this.publishValidationResult();
		},

		/**
		 * Processes getting section configuration.
		 * @abstract
		 * @protected
		 * @virtual
		 * @param {Object} config Section configuration.
		 * @param {String} config.packageUId Package uId.
		 * @param {Object} config.applicationStructureItem Designed section structure item.
		 * @param {Function} next The callback function.
		 * @param {object} scope The context of callback function.
		 */
		onGetModuleConfigResult: Terrasoft.abstractFn,

		//endregion

		//region Methods: Public

		/**
		 * Initialize subscribe/publish base wizard step messages.
		 */
		init: function(next, scope) {
			this.sandbox.registerMessages(this.getWizardStepMessages());
			this.subscribeWizardStepMessages();
			this.sandbox.subscribe("GetModuleConfigResult", function(config) {
				this.onGetModuleConfigResult(config, next, scope);
			}, this, [this.sandbox.id]);
			this.sandbox.publish("GetModuleConfig", null, [this.sandbox.id]);
		},

		/**
		 * Publishes validation result.
		 * @param {Boolean} isValid Is valid view model.
		 */
		publishValidationResult: function(isValid) {
			isValid = Ext.isDefined(isValid) ? isValid : false;
			this.sandbox.publish("ValidationResult", isValid, [this.sandbox.id]);
		},

		/**
		 * Publishes saveing result.
		 * @param {Boolean} saveResult Saving result value.
		 */
		publishSavingResult: function(saveResult) {
			saveResult = Ext.isDefined(saveResult) ? saveResult : null;
			this.sandbox.publish("SavingResult", saveResult, [this.sandbox.id]);
		}

		//endregion

	});
	return Ext.create("Terrasoft.BaseWizardStepSchemaMixin");
});


