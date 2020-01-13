Terrasoft.configuration.Structures["FileImportWizard"] = {innerHierarchyStack: ["FileImportWizard"], structureParent: "BaseWizardModule"};
define("FileImportWizard", [
	"ext-base", "terrasoft", "FileImportWizardBundle", "BaseWizardModule", "FileImportModule",
	"FileImportWizardHeaderModule", "HistoryStateUtilities", "FileImportWizardStep"
], function(Ext, Terrasoft) {
	Ext.define("Terrasoft.configuration.FileImportWizard", {
		extend: "Terrasoft.BaseWizardModule",
		alternateClassName: "Terrasoft.FileImportWizard",

		/**
		 * Import session identifier.
		 * @private
		 * @type {String}
		 */
		importSessionId: "",

		/**
		 * Steps.
		 * @private
		 * @type {Array}
		 */
		steps: null,

		/**
		 * Bundle resources.
		 * @private
		 * @type {Object}
		 */
		fileImportWizardBundleResources: null,

		mixins: {
			HistoryStateUtilities: "Terrasoft.HistoryStateUtilities"
		},

		/**
		 * @inheritdoc
		 * @overridden
		 */
		init: function(callback, scope) {
			this.callParent([
				function() {
					this.initResources(callback, scope);
				}, this
			]);
		},

		/**
		 * Initialises bundle resources.
		 * @private
		 * @param {Function} callback Callback.
		 * @param {Object} scope Callback execution scope.
		 */
		initResources: function(callback, scope) {
			this.Terrasoft.require(["FileImportWizardBundleResources"], function(FileImportWizardBundleResources) {
				this.fileImportWizardBundleResources = FileImportWizardBundleResources;
				callback.call(scope);
			}, this);
		},

		/**
		 * @inheritdoc
		 * @overridden
		 */
		initHomePage: function(callback, scope) {
			callback.call(scope);
		},

		/**
		 * @inheritdoc
		 * @overridden
		 */
		onGetConfig: function() {
			const header = this.getHeader();
			return {
				caption: header,
				steps: this.getSteps(),
				currentStep: this.currentStep
			};
		},

		/**
		 * Gets wizard header.
		 * @private
		 * @return {String}
		 */
		getHeader: function() {
			const stepCaption = this.getStepCaption(this.currentStep);
			return this.Ext.String.format("{0}: {1}", this.fileImportWizardBundleResources.localizableStrings.Header,
					stepCaption);
		},

		/**
		 * @inheritdoc
		 * @overridden
		 */
		getWizardHeaderId: function() {
			return "ViewModule_FileImportWizardHeaderModule";
		},

		/**
		 * @inheritdoc
		 * @overridden
		 */
		loadHomePage: Terrasoft.emptyFn,

		/**
		 * @inheritdoc
		 * @overridden
		 */
		getSteps: function() {
			if (!this.steps) {
				const localizableStrings = this.fileImportWizardBundleResources.localizableStrings;
				this.steps = [
					{
						name: "FileImportStartPage",
						caption: localizableStrings.Step1,
						moduleName: "FileImportModule",
						schemaName: "FileImportStartPage",
						groupName: "",
						config: {
							viewModelClassName: "Terrasoft.FileImportWizardStep"
						}
					},
					{
						name: "FileImportColumnsMappingPage",
						caption: localizableStrings.Step2,
						moduleName: "FileImportModule",
						schemaName: "FileImportColumnsMappingPage",
						groupName: "",
						config: {
							viewModelClassName: "Terrasoft.FileImportWizardStep"
						}
					},
					{
						name: "FileImportDuplicateManagementPage",
						caption: localizableStrings.Step3,
						moduleName: "FileImportModule",
						schemaName: "FileImportDuplicateManagementPage",
						groupName: "",
						config: {
							viewModelClassName: "Terrasoft.FileImportWizardStep"
						}
					},
					{
						name: "FileImportProcessingPage",
						caption: localizableStrings.Step4,
						moduleName: "FileImportModule",
						schemaName: "FileImportProcessingPage",
						groupName: "",
						config: {
							viewModelClassName: "Terrasoft.FileImportWizardStep"
						}
					},
					{
						name: "FileImportResultPage",
						caption: localizableStrings.Step5,
						moduleName: "FileImportModule",
						schemaName: "FileImportResultPage",
						groupName: "",
						config: {
							viewModelClassName: "Terrasoft.FileImportWizardStep"
						}
					}
				];
			}
			return this.steps;
		},

		/**
		 * @inheritdoc
		 * @overridden
		 */
		onCurrentStepChange: function(newStepName) {
			this.clickedStep = newStepName;
			this.validateStep(this.currentStep);
		},

		/**
		 * Loads step.
		 * @private
		 * @param {String} stepName Step name.
		 */
		loadStep: function(stepName) {
			const step = this.getStep(stepName);
			this.sandbox.publish("PushHistoryState", {
				hash: this.Terrasoft.combinePath(step.moduleName, step.schemaName, this.importSessionId,
						this.entitySchemaName)
			});
		},

		/**
		 * Gets step information.
		 * @private
		 * @param {String} stepName Step name.
		 * @return {Object}
		 */
		getStep: function(stepName) {
			let step;
			const steps = this.getSteps();
			steps.forEach(function(item) {
				if (item.name === stepName) {
					step = item;
				}
			}, this);
			if (step) {
				return step;
			}
			throw new Terrasoft.UnknownException();
		},

		/**
		 * Validates step.
		 * @private
		 * @param {String} stepName Step name.
		 */
		validateStep: function(stepName) {
			const moduleId = this.getStepModuleId(stepName);
			const wizardInfo = this.getWizardInfo();
			this.sandbox.publish("Validate", wizardInfo, [moduleId]);
		},

		/**
		 * Gets wizard information.
		 * @private
		 * @return {Object} Wizard information.
		 */
		getWizardInfo: function() {
			const steps = this.getSteps();
			const currentStep = this.getStep(this.currentStep);
			const newStep = this.getStep(this.clickedStep);
			return {
				currentStepIndex: steps.indexOf(currentStep),
				newStepIndex: steps.indexOf(newStep)
			};
		},

		/**
		 * Gets step module identifier.
		 * @private
		 * @param {String} stepName Step name.
		 * @return {String}
		 */
		getStepModuleId: function(stepName) {
			const step = this.getStep(stepName);
			if (this.entitySchemaName) {
				return Ext.String.format("{0}_{1}_{2}", step.moduleName, this.entitySchemaName, step.schemaName);
			}
			return Ext.String.format("{0}_{1}", step.moduleName, step.schemaName);
		},

		/**
		 * @inheritdoc
		 * @overridden
		 */
		getMessages: function() {
			const parentMessages = this.callParent(arguments);
			return this.Ext.apply(parentMessages, {
				"Validate": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				"ValidationResult": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"Save": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				"SavingResult": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"GetHistoryState": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			});
		},

		/**
		 * @inheritdoc
		 * @overridden
		 */
		loadModuleFromHistoryState: function(token) {
			this.callParent(arguments);
			this.setHistoryStateInfo(token);
			this.subscribeModuleMessages();
			this.updateHeader();
		},

		/**
		 * @inheritdoc
		 * @protected
		 * @overridden
		 */
		onCancelWizard: function() {
			if (this.currentStep !== "FileImportProcessingPage") {
				return this.callParent(arguments);
			}
			this.closeWindow();
		},

		/**
		 * Subscribes module messages.
		 * @private
		 */
		subscribeModuleMessages: function() {
			const moduleId = this.getStepModuleId(this.currentStep);
			this.sandbox.subscribe("SavingResult", this.onSavingResult, this, [moduleId]);
			this.sandbox.subscribe("ValidationResult", this.onValidationResult, this, [moduleId]);
		},

		/**
		 * Processes step validation result.
		 * @private
		 * @param {Boolean} result Validation result.
		 */
		onValidationResult: function(result) {
			if (!result) {
				return;
			}
			const moduleId = this.getStepModuleId(this.currentStep);
			const wizardInfo = this.getWizardInfo();
			this.sandbox.publish("Save", wizardInfo, [moduleId]);
		},

		/**
		 * Processes step saving result.
		 * @private
		 * @param {Boolean} result Validation result.
		 */
		onSavingResult: function(result) {
			if (!result) {
				return;
			}
			this.loadStep(this.clickedStep);
		},

		/**
		 * Sets history state info.
		 * @private
		 * @param {Object} token History state token.
		 */
		setHistoryStateInfo: function(token) {
			const currentStateHash = token.hash;
			const moduleName = currentStateHash.moduleName;
			if (!moduleName) {
				return;
			}
			const schemaName = currentStateHash.entityName;
			if (!schemaName) {
				return;
			}
			const importSessionId = currentStateHash.operationType;
			if (!importSessionId) {
				return;
			}
			this.entitySchemaName = currentStateHash.recordId;
			this.currentStep = schemaName;
			this.importSessionId = importSessionId;
		},

		/**
		 * Gets step caption.
		 * @private
		 * @param {String} stepName Step name.
		 * @return {String}
		 */
		getStepCaption: function(stepName) {
			const step = this.getStep(stepName);
			const caption = step.caption;
			if (caption) {
				return caption;
			}
			throw new Terrasoft.UnknownException();
		},

		/**
		 * Updates header.
		 * @private
		 */
		updateHeader: function() {
			const config = {
				currentStep: this.currentStep,
				caption: this.getHeader()
			};
			this.sandbox.publish("UpdateConfig", config, [this.getWizardHeaderId()]);
		},

		/**
		 * @inheritdoc
		 * @overridden
		 */
		diff: [
			{
				"operation": "merge",
				"name": "wizardContainer",
				"values": {
					"generateId": false,
					"id": undefined,
					"selectors": undefined,
					"wrapClass": ["wizard-container", "file-import-wizard-wrap"]
				}
			},
			{
				"operation": "merge",
				"name": "wizardHeader",
				"values": {
					"moduleName": "FileImportWizardHeaderModule"
				}
			}
		]
	});
	return Terrasoft.FileImportWizard;
});


