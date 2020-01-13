Terrasoft.configuration.Structures["SectionPageWizard"] = {innerHierarchyStack: ["SectionPageWizard"], structureParent: "PageWizard"};
define("SectionPageWizard", [
	"PageWizard",
	"SectionPageDesignerModule",
	"SectionPageDesignerHeaderModule",
	"PortalSchemaAccessListManager",
	"PortalColumnAccessListManager",
	"css!PageWizard"
], function() {

	/**
	 * Class of visual module of representation for the page wizard
	 */
	Ext.define("Terrasoft.configuration.SectionPageWizard", {
		extend: "Terrasoft.configuration.PageWizard",
		alternateClassName: "Terrasoft.SectionPageWizard",

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#applicationStructureManager
		 * @override
		 */
		applicationStructureManager: Terrasoft.SectionManager,

		/**
		 * @inheritdoc Terrasoft.BaseViewModule#diff
		 * @override
		 */
		diff: [
			{
				"operation": "merge",
				"name": "wizardContainer",
				"values": {
					"wrapClass": ["wizard-container", "page-wizard", "section-page-wizard"]
				}
			},
			{
				"operation": "merge",
				"name": "wizardHeader",
				"values": {
					"moduleName": "SectionPageDesignerHeaderModule"
				}
			}
		],

		/**
		 * @protected
		 */
		pageWizardUrl: Terrasoft.DesignTimeEnums.WizardUrl.SECTION_PAGE_WIZARD_URL,

		//endregion

		//region Methods: Private

		/**
		 * @private
		 */
		_getSysModuleEdit: function(moduleEditId, moduleId, callback, scope) {
			if (Terrasoft.isGUID(moduleEditId) && !Terrasoft.isEmpty(moduleEditId)) {
				const moduleEdit = Terrasoft.SysModuleEditManager.getItem(moduleEditId);
				return Ext.callback(callback, scope, [moduleEdit]);
			}
			Terrasoft.chain(
				function(next) {
					const applicationStructureItem = this.applicationStructureManager.getItem(moduleId);
					applicationStructureItem.getSysModuleEntityManagerItem(next, this);
				},
				function(next, moduleEntity) {
					moduleEntity.getSysModuleEditManagerItems(next, this);
				},
				function(next, moduleEdits) {
					const moduleEdit = moduleEdits.first();
					Ext.callback(callback, scope, [moduleEdit]);
				}, this
			);
		},

		/**
		 * Processing response with section types.
		 * @private
		 * @param {String} result Section enum serialization string.
		 *
		 */
		_processSectionTypes: function(result) {
			if (result.GetSectionTypesResult) {
				this.sectionTypes = JSON.parse(result.GetSectionTypesResult);
			}
		},

		/**
		 * Returns is section type SSP.
		 * @private
		 * @param {Terrasoft.SectionManagerItem} section Section item instance.
		 * @return {Boolean} Is section type SSP.
		 */
		_getIsSspSection: function(section) {
			if (Terrasoft.Features.getIsDisabled("SspSectionWizard")) {
				return false;
			}
			var types = this.sectionTypes || {};
			return section.type === types.SSP;
		},

		/**
		 * Initialize PortalSchemaAccessListManager.
		 * @private
		 * @param {Function} callback Callback function.
		 */
		_initPortalSchemaAccessListManager: function(callback) {
			Terrasoft.PortalSchemaAccessListManager.initialize(null, callback, this);
		},

		/**
		 * Initialize PortalColumnAccessListManager.
		 * @private
		 * @param {Function} callback Callback function.
		 */
		_initPortalColumnAccessListManager: function(callback) {
			Terrasoft.PortalColumnAccessListManager.initialize(null, callback, this);
		},

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseViewModule#init
		 * @override
		 */
		init: function() {
			this.currentHash.historyState = "";
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#getInitChain
		 * @override
		 */
		getInitChain: function() {
			var chain = this.callParent(arguments);
			chain.push(this.initSectionTypes);
			chain.push(this._initPortalSchemaAccessListManager);
			chain.push(this._initPortalColumnAccessListManager);
			return chain;
		},

		/**
		 * Section types initialization.
		 * @protected
		 * @param {Function} callback Callback function.
		 */
		initSectionTypes: function(callback) {
			if (Terrasoft.Features.getIsDisabled("SspSectionWizard") ) {
				Ext.callback(callback, this);
				return;
			}
			var config = {
				serviceName: "SectionService",
				methodName: "GetSectionTypes"
			};
			Terrasoft.ConfigurationServiceProvider.callService(config, function(result) {
				this._processSectionTypes.call(this, result);
				Ext.callback(callback, this);
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.configuration.PageWizard#getPageDesignerModuleName
		 * @override
		 */
		getPageDesignerModuleName: function() {
			return "SectionPageDesignerModule";
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#getMessages
		 * @override
		 */
		getMessages: function() {
			const messages = this.callParent(arguments);
			return Ext.apply(messages, {
				"BackHistoryState": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			});
		},

		/**
		 * @inheritdoc Terrasoft.configuration.PageWizard#openNewPageWizard
		 * @override
		 */
		openNewPageWizard: function() {
			this.sandbox.publish("BackHistoryState");
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#onSavingResult
		 * @override
		 */
		onSavingResult: function() {
			if (this.activeStep) {
				this.callParent(arguments);
			} else {
				this.sandbox.publish("BackHistoryState");
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseWizardModule#getWizardHeaderId
		 * @override
		 */
		getWizardHeaderId: function() {
			return "ViewModule_SectionPageDesignerHeaderModule";
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#onStepChanged
		 * @override
		 */
		onStepChanged: function(step) {
			this.currentStep = step;
			this.operationType = null;
			const moduleId = this.getModuleIdByStepName(step);
			this.sandbox.publish("ReplaceHistoryState", {
				hash: [step, this.applicationStructureItemId, this.pageItem.uId].join("/"),
				state: {moduleId: moduleId}
			});
		},

		/**
		 * @inheritdoc ApplicationStructureItemWizard#loadModuleFromHistoryState
		 * @override
		 */
		loadModuleFromHistoryState: function(token, isInitialized) {
			const state = token.hash.historyState;
			const params = state.split("/");
			const moduleId = params[0];
			if (isInitialized || !Terrasoft.isGUID(moduleId)) {
				return this.callParent(arguments);
			}
			const moduleEditId = params[1];
			const sectionWizardUrl = [
				Terrasoft.workspaceBaseUrl,
				Terrasoft.DesignTimeEnums.WizardUrl.SECTION_WIZARD_URL,
				moduleId
			].join("");
			this.sandbox.publish("ReplaceHistoryState", {hash: sectionWizardUrl, silent: true});
			this._getSysModuleEdit(moduleEditId, moduleId, function(moduleEdit) {
				const hash = [Terrasoft.SectionWizardEnums.PageName.PAGE_DESIGNER, moduleId, moduleEdit.cardSchemaUId]
					.join("/");
				const pageWizardUrl = [Terrasoft.workspaceBaseUrl, this.pageWizardUrl, hash].join("");
				this.sandbox.publish("PushHistoryState", {hash: pageWizardUrl, silent: true});
				const historyState = this.sandbox.publish("GetHistoryState");
				this.loadModuleFromHistoryState(historyState);
			}, this);
		},

		/**
		 * @inheritdoc ApplicationStructureItemWizard#publishModuleConfig
		 * @override
		 */
		publishModuleConfig: function(config) {
			config.wizardType = "section";
			config.wizardManagerName = "SectionManager";
			if (this.applicationStructureItem) {
				config.isSspSection = this._getIsSspSection(this.applicationStructureItem);
			}
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc ApplicationStructureItemWizard#getSysModuleEntityAbsentMessage
		 * @override
		 */
		getSysModuleEntityAbsentMessage: function() {
			const messageTemplate = this.getLocalizableString("WizardSysModuleEntityAbsentMessage");
			const sectionCode = this.applicationStructureItem.getCode();
			return Ext.String.format(messageTemplate, sectionCode);
		},

		/**
		 * @inheritdoc ApplicationStructureItemWizard#getSysModuleEditAbsentMessage
		 * @override
		 */
		getSysModuleEditAbsentMessage: function() {
			return this.getLocalizableString("WizardSysModuleEditAbsentMessage");
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#preparePageDesignerConfig
		 * @override
		 */
		preparePageDesignerConfig: function(callback, scope) {
			const result = {};
			Terrasoft.chain(
				function(next) {
					this.getSysModuleEntityManagerItem(next, this);
				},
				function(next, moduleEntity) {
					const config = {
						packageUId: this.packageUId,
						schemaUId: moduleEntity.getEntitySchemaUId()
					};
					Terrasoft.EntitySchemaManager.forceGetPackageSchema(config, next, this);
				},
				function(next, entitySchema) {
					result.entitySchema = entitySchema;
					this.preparePageDesignerEntitySchema(entitySchema);
					Terrasoft.ClientUnitSchemaManager.designPageSchema({
						schemaUId: this.pageItem.uId,
						packageUId: this.packageUId,
						entityName: entitySchema.name
					}, next, this);
				},
				function(next, clientUnitSchema) {
					result.clientUnitSchema = clientUnitSchema;
					Ext.callback(callback, scope, [result]);
				}, this
			);
		}

		//endregion
	});

	return Terrasoft.SectionPageWizard;
});


