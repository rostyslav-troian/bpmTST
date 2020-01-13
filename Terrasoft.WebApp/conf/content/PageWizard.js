Terrasoft.configuration.Structures["PageWizard"] = {innerHierarchyStack: ["PageWizard"], structureParent: "BaseWizardModule"};
define("PageWizard", [
	"PageWizardResources",
	"ProcessModuleUtilities",
	"ApplicationStructureItemWizard",
	"SectionManager",
	"DetailManager",
	"WizardUtilities",
	"PackageUtilities",
	"DesignTimeEnums",
	"ProcessEntryPointUtilities",
	"PageDesignerHeaderModule",
	"SourceCodeDesigner",
	"SspPageDetailsManager"
], function(resources) {

	/**
	 * Class of visual module of representation for the page wizard
	 */
	Ext.define("Terrasoft.configuration.PageWizard", {
		extend: "Terrasoft.configuration.ApplicationStructureItemWizard",
		alternateClassName: "Terrasoft.PageWizard",

		// region Properties: Protected

		/**
		 * Operation type
		 * @protected
		 * @type {String}
		 */
		operationType: null,

		/**
		 * Page manager item.
		 * @protected
		 * @type {Object}
		 */
		pageItem: null,

		/**
		 * @inheritdoc Terrasoft.BaseViewModule#diff
		 * @override
		 */
		diff: [
			{
				"operation": "merge",
				"name": "wizardContainer",
				"values": {
					"wrapClass": ["wizard-container", "page-wizard"]
				}
			},
			{
				"operation": "merge",
				"name": "wizardHeader",
				"values": {
					"moduleName": "PageDesignerHeaderModule"
				}
			},
			{
				"operation": "insert",
				"name": "WizardMask",
				"parentName": "wizardContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["wizard-mask-container"]
					},
					"items": []
				}
			}
		],

		// endregion

		// region Methods: Private

		/**
		 * @private
		 */
		_createAndDefinePageItem: function(config, callback, scope) {
			var schemaType = Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA;
			Terrasoft.chain(
				function(next) {
					Terrasoft.ClientUnitSchemaManager.getUniqueNameAndCaption({
						captionPrefix: this.getLocalizableString("NewPageWizardCaption")
					}, next, this);
				},
				function(next, name, caption, errorMessage) {
					if (errorMessage) {
						Terrasoft.showErrorMessage(errorMessage, function() {
							window.close();
						}, this);
						return;
					}
					var schemaConfig = {
						uId: Terrasoft.generateGUID(),
						packageUId: this.packageUId,
						parentSchemaUId: this._getTemplatePageIdFromHistoryState(),
						schemaType: schemaType,
						caption: caption,
						name: name
					};
					Terrasoft.ClientUnitSchemaManager.createSchemaInstance(schemaConfig, next, this);
				},
				function(next, pageSchema, pageItem) {
					pageSchema.setDefaultSchemaBody(schemaType, {"entitySchemaName": ""});
					pageSchema.define(function() {
						Ext.callback(callback, scope, [pageItem]);
					}, this);
				}, this
			);
		},

		/**
		 * @private
		 * @param {String} step Wizard step name.
		 * @param {String} pageItemId Page item identifier.
		 */
		_redirectToStep: function(step, pageItemId) {
			this.sandbox.publish("ReplaceHistoryState", {
				hash: Terrasoft.combinePath(step, pageItemId),
				state: {
					moduleId: this.getModuleIdByStepName(step)
				}
			});
		},

		/**
		 * @private
		 */
		_initDetailManager: function(callback) {
			Terrasoft.DetailManager.initialize(callback, this);
		},

		/**
		 * @private
		 */
		_initSspPageDetailsManager: function(callback) {
			Terrasoft.SspPageDetailsManager.initialize(callback, this);
		},

		/**
		 * @private
		 */
		_setPageItem: function(id) {
			var pageItem = Terrasoft.ClientUnitSchemaManager.findItem(id);
			this.pageItem = pageItem;
		},

		/**
		 * @protected
		 * @param {Object} event Event object.
		 * @return {Boolean}
		 */
		onKeyDown: function(event) {
			this.callParent(arguments);
			if (event.ctrlKey && event.keyCode === event.M) {
				event.preventDefault();
				Terrasoft.BaseSchemaDesignerUtilities.openMetaData(this.pageItem.instance);
				return false;
			}
			if (event.ctrlKey && event.keyCode === event.K) {
				event.preventDefault();
				Terrasoft.ProcessModuleUtilities.showClientUnitSchemaDesigner(this.pageItem.instance);
				return false;
			}
		},

		/**
		 * @private
		 */
		_getTemplatePageIdFromHistoryState: function() {
			var state = this.sandbox.publish("GetHistoryState") || {};
			var stateHash = state.hash || {};
			return stateHash.entityName;
		},

		/**
		 * @private
		 */
		_getPackageUId: function() {
			const pagePackageUId = this.pageItem && this.pageItem.packageUId;
			return pagePackageUId || this.packageUId;
		},

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#getInitChain
		 * @override
		 */
		getInitChain: function() {
			var chain = this.callParent(arguments);
			chain.push(this._initDetailManager);
			chain.push(this._initSspPageDetailsManager);
			return chain;
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#getEntitySchemasToCheck
		 * @override
		 */
		getEntitySchemasToCheck: function() {
			return this.callParent(arguments)
				.then(function(schemas) {
					return new Promise(function(resolve) {
						schemas.push(
							Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_LOOKUP
						);
						resolve(schemas);
					});
				});
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#getClientUnitSchemasToCheck
		 * @override
		 */
		getClientUnitSchemasToCheck: function() {
			return this.callParent(arguments)
				.then(function(schemas) {
					return new Promise(function(resolve) {
						schemas.push(
							Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_PAGE_PROCESS_TEMPLATE
						);
						resolve(schemas);
					});
				});
		},

		/**
		 * @inheritdoc Terrasoft.BaseWizardModule#getLocalizableString
		 * @override
		 */
		getLocalizableString: function(key) {
			return resources.localizableStrings[key] || this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#getSteps
		 * @override
		 */
		getSteps: function() {
			var parentSteps = this.callParent(arguments);
			var steps = [
				{
					name: "PageDesigner",
					caption: this.getLocalizableString("PageDesignerStepCaption"),
					moduleName: this.getPageDesignerModuleName()
				},
				{
					name: "BusinessRules",
					caption: this.getLocalizableString("BusinessRulesStepCaption"),
					moduleName: "ConfigurationModuleV2",
					schemaName: "BusinessRuleSection"
				}
			];
			if (Terrasoft.Features.getIsEnabled("PageDesignerSourceCode")) {
				steps.push({
					name: "SourceCode",
					caption: this.getLocalizableString("SourceCodeStepCaption"),
					moduleName: "ConfigurationModuleV2",
					schemaName: "SourceCodeDesigner"
				});
			}
			steps = steps.concat(parentSteps);
			return steps.concat(this.pagesSteps);
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#preparePageDesignerConfig
		 * @override
		 */
		preparePageDesignerConfig: function(callback, scope) {
			const result = {};
			Terrasoft.chain(
				function(next) {
					Terrasoft.ClientUnitSchemaManager.designPageSchema({
						schemaUId: this.pageItem.uId,
						packageUId: this.packageUId
					}, next, this);
				},
				function(next, clientUnitSchema) {
					result.clientUnitSchema = clientUnitSchema;
					if (this.applicationStructureItem) {
						this.getSysModuleEntityManagerItem(next, this);
					} else {
						callback.call(scope, result);
					}
				},
				function(next, moduleEntity) {
					const config = {
						packageUId: this.packageUId,
						schemaUId: moduleEntity.getEntitySchemaUId()
					};
					Terrasoft.EntitySchemaManager.forceGetPackageSchema(config, next, this);
				},
				function(next, entitySchema) {
					this.preparePageDesignerEntitySchema(entitySchema);
					result.entitySchema = entitySchema;
					Ext.callback(callback, scope, [result]);
				}, this
			);
		},

		/**
		 * Opens new page wizard.
		 * @protected
		 */
		openNewPageWizard: function() {
			this.sandbox.publish("ReplaceHistoryState", {hash: "PageTemplateModule"});
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#setStep
		 * @override
		 */
		setStep: function(state, callback, scope) {
			if (!state) {
				Ext.callback(callback, scope);
				return;
			}
			this.checkRequirements().then(function() {
				const moduleName = state.hash.moduleName;
				const entityName = state.hash.entityName || "";
				const operationType = state.hash.operationType;
				let id;
				if (operationType) {
					const moduleId = entityName.toLowerCase();
					this.applicationStructureItemId = moduleId;
					this.applicationStructureItem = this.applicationStructureManager.findItem(moduleId);
					id = operationType.toLowerCase();
				} else {
					id = entityName.toLowerCase();
				}
				if (moduleName && this.isStepName(moduleName) && Terrasoft.isGUID(id)) {
					if (!Terrasoft.ClientUnitSchemaManager.contains(id)) {
						this.warning(Ext.String.format("{0}: {1} ({2})", "ClientUnitSchemaManager",
							Terrasoft.Resources.Exception.ItemNotFoundException, id));
						this.openNewPageWizard();
						return;
					}
					this.currentStep = moduleName;
					this.operationType = null;
					this._setPageItem(id);
					const caption = this.getCaption();
					this.updateHeader({
						currentStep: this.currentStep,
						caption: caption,
						pageUId: this.pageItem.uId
					});
				}
				Ext.callback(callback, scope);
			}.bind(this));
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#onGetModuleConfig
		 * @override
		 */
		onGetModuleConfig: function() {
			if (this.currentStep === "PageDesigner" || this.currentStep === "SourceCode") {
				this.preparePageDesignerConfig(this.publishModuleConfig, this);
			}
			if (this.currentStep === "BusinessRules") {
				const config = {
					packageUId: this.packageUId,
					clientUnitSchemaUId: this.pageItem.uId
				};
				if (this.applicationStructureItem) {
					config.applicationStructureItem = this.applicationStructureItem;
				}
				this.publishModuleConfig(config);
			}
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#getDefaultStepName
		 * @override
		 */
		getDefaultStepName: function() {
			return "PageDesigner";
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#getRegistrationDataSteps
		 * @override
		 */
		getRegistrationDataSteps: function() {
			var steps = this.callParent(arguments);
			steps.push({
				manager: Terrasoft.DetailManager,
				processMessage: this.getLocalizableString("DetailRegistrationMessage"),
				updateSchemaDataAction: true
			});
			return steps;
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#getCaption
		 * @override
		 */
		getCaption: function() {
			var pageCaption = this.pageItem && this.pageItem.getCaption();
			var wizardCaption = pageCaption || "";
			var stepCaption = this.generateStepCaption();
			return Ext.String.format("{0}: {1}", wizardCaption, stepCaption);
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#generateStepCaption
		 * @override
		 */
		generateStepCaption: function() {
			var currentStep = this.operationType || this.currentStep;
			var currentStepConfig = this.getStepConfigByName(currentStep);
			var caption = "";
			switch (currentStep) {
				case "PageDesigner":
					caption = this.getPageDesignerStepCaption(currentStepConfig);
					break;
				case "BusinessRules":
					caption = this.getLocalizableString("BusinessRulesStepCaption");
					break;
				case "SourceCode":
					caption = this.getLocalizableString("SourceCodeStepCaption");
					break;
				default:
					break;
			}
			return caption;
		},

		/**
		 * @inheritdoc Terrasoft.BaseWizardModule#onStepChanged
		 * @override
		 */
		onStepChanged: function(step) {
			this.currentStep = step;
			this.operationType = null;
			var pathList = [this.currentStep, this.pageItem.uId];
			var newHash = this.Terrasoft.combinePath.apply(this, pathList);
			this.sandbox.publish("PushHistoryState", {
				hash: newHash,
				state: {
					moduleId: this.getModuleIdByStepName(step)
				}
			});
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#modifyUrl
		 * @override
		 */
		modifyUrl: function() {
			this._createAndDefinePageItem({}, function(newPageItem) {
				var currentStep = this.getStepFromHistoryState();
				this._redirectToStep(currentStep, newPageItem.uId);
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#processSaveWizardResponse
		 * @override
		 */
		processSaveWizardResponse: function(response, callback, scope) {
			if (response && response.success) {
				callback.call(scope, response);
			} else {
				var failedItem = response.failedItem;
				if (failedItem instanceof Terrasoft.ClientUnitSchemaManagerItem) {
					failedItem.logInstanceBody();
				}
				var errorMessage = failedItem
					? this.getSaveSchemaManagerErrorMessage(response)
					: response.errorInfo.toString();
				Terrasoft.showErrorMessage(errorMessage);
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseWizardModule#getWizardHeaderId
		 * @override
		 */
		getWizardHeaderId: function() {
			return "ViewModule_PageDesignerHeaderModule";
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#onGetConfig
		 * @override
		 */
		onGetConfig: function() {
			var config = this.callParent();
			return Ext.apply(config, {
				pageUId: this.pageItem && this.pageItem.uId,
				pageName: this.pageItem && this.pageItem.name,
				pagePackageUId: this._getPackageUId()
			});
		},

		/**
		 * Return module name for PageDesigner step.
		 * @protected
		 * @return {String}
		 */
		getPageDesignerModuleName: function() {
			return "PageDesignerModule";
		}

		// endregion

	});

	return Terrasoft.PageWizard;
});


