Terrasoft.configuration.Structures["DetailWizard"] = {innerHierarchyStack: ["DetailWizard"]};
define("DetailWizard", ["ext-base", "terrasoft", "DetailWizardResources", "SectionDesignerEnums",
	"ApplicationStructureItemWizard", "SysModuleEntityManager", "SysModuleEditManager", "DetailManager",
	"WizardUtilities", "PackageUtilities", "LookupManager", "ProcessEntryPointUtilities"
], function(Ext, Terrasoft, resources, SectionDesignerEnums) {

	/**
	 * @class Terrasoft.configuration.ViewModule
	 * Class of visual module of representation for the detail wizard
	 */
	Ext.define("Terrasoft.configuration.DetailWizard", {
		extend: "Terrasoft.ApplicationStructureItemWizard",
		alternateClassName: "Terrasoft.DetailWizard",

		applicationStructureManager: Terrasoft.DetailManager,

		//region Methods: Protected

		/**
		 * Subscribes to message.
		 * @protected
		 */
		subscribeMessages: function() {
			this.callParent(arguments);
			const sandbox = this.sandbox;
			const mainPageHeaderId = this.getModuleIdByStepName("MainSettings");
			sandbox.subscribe("UpdateWizardConfig", this.onUpdateWizardConfig, this, [mainPageHeaderId]);
		},

		/**
		 * @inheritdoc Terrasoft.BaseWizardModule#getLocalizableString
		 * @override
		 */
		getLocalizableString: function(key) {
			return resources.localizableStrings[key] || this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#getEntitySchemasToCheck
		 * @override
		 */
		getEntitySchemasToCheck: function() {
			const errorTypes = SectionDesignerEnums.WizardValidationErrorType;
			return this.callParent(arguments)
				.then(function(schemas) {
					return new Promise(function(resolve, reject) {
						schemas.push(Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_LOOKUP);
						if (this.applicationStructureItem.getIsNew()) {
							resolve(schemas);
						} else {
							this.getSysModuleEntityManagerItem(function(item) {
								if (!item) {
									const error = {type: errorTypes.SYS_MODULE_ENTITY_MISSING};
									reject(error);
								}
								const detailEntitySchemaUId = item.getEntitySchemaUId();
								if (detailEntitySchemaUId) {
									schemas.push(detailEntitySchemaUId);
								}
								resolve(schemas);
							}, this);
						}
					}.bind(this));
				}.bind(this));
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#onNavigateToAllowedStep
		 * @override
		 */
		onNavigateToAllowedStep: function() {
			if (this.applicationStructureItem.getIsNew()) {
				this.callParent(arguments);
				return;
			}
			if (!Terrasoft.contains(this.getErrorFreeSteps(), this.currentStep)) {
				const hash = "BusinessProcesses/" + this.applicationStructureItem.getId();
				this.sandbox.publish("PushHistoryState", {hash: hash});
			}
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#getErrorFreeSteps
		 * @override
		 */
		getErrorFreeSteps: function() {
			const errorFreeSteps = this.callParent();
			errorFreeSteps.push("BusinessProcesses");
			return errorFreeSteps;
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#getClientUnitSchemasToCheck
		 * @override
		 */
		getClientUnitSchemasToCheck: function() {
			const errorTypes = SectionDesignerEnums.WizardValidationErrorType;
			return this.callParent(arguments)
				.then(function(schemas) {
					return new Promise(function(resolve, reject) {
						if (this.applicationStructureItem.getIsNew()) {
							schemas.push(
								Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_PAGE,
								Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_GRID_DETAIL
							);
							resolve(schemas);
						} else {
							this.getSysModuleEntityManagerItem(function(entityManagerItem) {
								if (!entityManagerItem) {
									const error = {type: errorTypes.SYS_MODULE_ENTITY_MISSING};
									reject(error);
								}
								entityManagerItem.getSysModuleEditManagerItems(function(items) {
									const detailSchemaUId = this.applicationStructureItem.getDetailSchemaUId();
									if (detailSchemaUId) {
										schemas.push(detailSchemaUId);
									}
									if (!items) {
										resolve(schemas);
									}
									resolve(schemas);
								}, this);
							}, this);
						}
					}.bind(this));
				}.bind(this));
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#getSteps
		 * @override
		 */
		getSteps: function() {
			const parentSteps = this.callParent(arguments);
			let steps = [
				{
					name: "MainSettings",
					caption: this.getLocalizableString("MainSettingsStepCaption"),
					imageConfig: null,
					moduleName: "ConfigurationModuleV2",
					schemaName: "DetailMainSettings"
				},
				{
					name: "PageDesigner",
					caption: this.getLocalizableString("PageDesignerStepCaption"),
					imageConfig: null,
					moduleName: "ViewModelSchemaDesignerModule"
				},
				{
					name: "BusinessRules",
					caption: this.getLocalizableString("BusinessRulesStepCaption"),
					imageConfig: null,
					moduleName: "ConfigurationModuleV2",
					schemaName: "BusinessRuleSection"
				}
			];
			if (Terrasoft.ProcessEntryPointUtilities.getCanRunProcessFromSection()) {
				steps.push(this.getBusinessProcessesStepConfig());
			}
			steps = steps.concat(parentSteps);
			return steps.concat(this.pagesSteps || []);
		},

		/**
		 * Returns config for BusinessProcesses step.
		 * @private
		 * @return {Object} config.
		 */
		getBusinessProcessesStepConfig: function() {
			return {
				name: "BusinessProcesses",
				caption: this.getLocalizableString("BusinessProcessesCaption"),
				imageConfig: null,
				moduleName: "ConfigurationModuleV2",
				schemaName: "DetailProcessSettings"
			};
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#getNewApplicationStructureItemWizardCaption
		 * @override
		 */
		getNewApplicationStructureItemWizardCaption: function() {
			return this.getLocalizableString("NewDetailWizardCaption");
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#generateStepCaption
		 * @override
		 */
		generateStepCaption: function() {
			const currentStep = this.operationType || this.currentStep;
			const currentStepConfig = this.getStepConfigByName(currentStep);
			if (currentStepConfig) {
				if (currentStepConfig.groupName === "PageDesigner") {
					return this.getPageDesignerStepCaption(currentStepConfig);
				} else {
					switch (currentStep) {
						case "MainSettings":
							return this.getMainSettingsStepCaption();
						case "PageDesigner":
							return this.getPageDesignerStepCaption(currentStepConfig);
						case "BusinessRules":
							return this.getLocalizableString("BusinessRulesStepCaption");
						case "BusinessProcesses":
							return this.getLocalizableString("BusinessProcessesCaption");
						default:
							return "";
					}
				}
			}
			return "";
		},

		/**
		 * Get MainSettings step caption.
		 * @protected
		 * @return {String} step caption.
		 */
		getMainSettingsStepCaption: function() {
			return this.getLocalizableString("MainSettingsStepCaption");
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#onGetModuleConfig
		 * @override
		 */
		onGetModuleConfig: function() {
			switch (this.currentStep) {
				case "MainSettings":
					this.prepareMainSettingsConfig(this.publishModuleConfig, this);
					break;
				case "PageDesigner":
					this.preparePageDesignerConfig(this.publishModuleConfig, this);
					break;
				case "BusinessRules":
					this.prepareBusinessRuleSectionConfig(this.publishModuleConfig, this);
					break;
				case "BusinessProcesses":
					this.prepareBusinessProcessSettingsConfig(this.publishModuleConfig, this);
					break;
				default:
					break;
			}
			const currentStep = this.getStepConfigByName(this.currentStep);
			if (currentStep.groupName === "PageDesigner") {
				this.preparePageDesignerConfig(this.publishModuleConfig, this);
			}
		},

		/**
		 * Prepare process settings configuration.
		 * @protected
		 * @param {Function} callback The function will be called at the end.
		 * @param {Object} callback.result Case settings configuration.
		 * @param {Object} scope The context in which the callback function is called.
		 */
		prepareBusinessProcessSettingsConfig: function(callback, scope) {
			const result = {
				"packageUId": this.packageUId,
				"applicationStructureItem": this.applicationStructureItem
			};
			callback.call(scope, result);
		},

		/**
		 * Prepare main settings configuration.
		 * @protected
		 * @param {Function} callback The function will be called at the end.
		 * @param {Object} scope The context in which the callback function is called.
		 */
		prepareMainSettingsConfig: function(callback, scope) {
			const result = {
				"packageUId": this.packageUId,
				"applicationStructureItem": this.applicationStructureItem
			};
			callback.call(scope, result);
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#getDefaultStepName
		 * @override
		 */
		getDefaultStepName: function() {
			return "MainSettings";
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#getRegistrationDataSteps
		 * @override
		 */
		getRegistrationDataSteps: function() {
			const steps = this.callParent(arguments);
			steps.push({
				manager: Terrasoft.DetailManager,
				processMessage: this.getLocalizableString("DetailRegistrationMessage"),
				updateSchemaDataAction: true
			});
			return steps;
		},

		/**
		 * @inheritdoc ApplicationStructureItemWizard#onManagersSave
		 * @override
		 */
		onManagersSave: function(callback, scope) {
			const manager = Terrasoft.DetailProcessSettingsManager;
			if (manager) {
				manager.saveAndUpdateSchemaData(this.packageUId, callback, scope);
			} else {
				callback.call(scope);
			}
		},

		/**
		 * @inheritdoc ApplicationStructureItemWizard#getApplicationStructureItemSchemaUId
		 * @override
		 */
		getApplicationStructureItemSchemaUId: function() {
			return this.applicationStructureItem.getDetailSchemaUId();
		},

		/**
		 * @inheritdoc ApplicationStructureItemWizard#publishModuleConfig
		 * @override
		 */
		publishModuleConfig: function(config) {
			config.wizardType = "detail";
			config.wizardManagerName = "DetailManager";
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc ApplicationStructureItemWizard#getSysModuleEntityAbsentMessage
		 * @override
		 */
		getSysModuleEntityAbsentMessage: function() {
			const messageTemplate =
				this.getLocalizableString("DetailSysModuleEntityAbsentMessage");
			const sectionCode = this.applicationStructureItem.getEntitySchemaUId();
			return Ext.String.format(messageTemplate, sectionCode);
		}

		//endregion

	});

	return Terrasoft.DetailWizard;
});


