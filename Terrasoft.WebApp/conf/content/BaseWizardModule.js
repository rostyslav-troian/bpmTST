Terrasoft.configuration.Structures["BaseWizardModule"] = {innerHierarchyStack: ["BaseWizardModule"]};
define("BaseWizardModule", ["ext-base", "terrasoft", "BaseWizardModuleResources", "BaseViewModule",
	"css!BaseWizardModule"
], function(Ext, Terrasoft, resources) {

	/**
	 * Base class of wizard module
	 */
	Ext.define("Terrasoft.configuration.BaseWizardModule", {
		extend: "Terrasoft.configuration.BaseViewModule",
		alternateClassName: "Terrasoft.BaseWizardModule",

		//region Properties: Protected

		/**
		 * Sign of asynchronous module
		 * @protected
		 * @type {Boolean}
		 */
		isAsync: true,

		/**
		 * Current step
		 * @protected
		 * @type {String}
		 */
		currentStep: null,

		/**
		 * Saving status of wizard
		 * @protected
		 * @type {Boolean}
		 */
		isSavingWizard: false,

		/**
		 * Save wizard config.
		 * @protected
		 * @type {Object}
		 */
		saveWizardConfig: null,

		// endregion

		//region Properties: Public

		/**
		 * @inheritdoc Terrasoft.BaseViewModule#diff
		 * @override
		 */
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "wizardContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["wizard-container"],
					"id": "wizardContainer",
					"selectors": {"wrapEl": "#wizardContainer"},
					"markerValue": "Wizard",
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "wizardHeaderContainer",
				"parentName": "wizardContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["wizard-header-container", "fixed"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "wizardHeader",
				"parentName": "wizardHeaderContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE,
					"moduleName": "WizardHeaderModule",
					"classes": {
						"wrapClassName": ["wizard-header", "fixed"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "centerPanelContainer",
				"parentName": "wizardContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["center-panel"],
					"id": "centerPanelContainer",
					"selectors": {"wrapEl": "#centerPanelContainer"},
					"items": []
				}
			},
			{
				"operation": "move",
				"name": "centerPanel",
				"parentName": "centerPanelContainer",
				"propertyName": "items",
				"index": 0
			}
		]/**SCHEMA_DIFF*/,

		//endregion

		//region Methods: Protected

		/**
		 * Returns object of configuration
		 * @protected
		 * @type {Function}
		 */
		onGetConfig: Terrasoft.abstractFn,

		/**
		 * @inheritdoc Terrasoft.BaseViewModule#initHomePage
		 * @override
		 */
		initHomePage: function(callback, scope) {
			Ext.callback(callback, scope);
		},

		/**
		 * Publishes current step of change
		 * @protected
		 * @type {Function}
		 */
		onCurrentStepChange: Terrasoft.abstractFn,

		/**
		 * Returns object of messages
		 * @protected
		 * @return {Object}
		 */
		getMessages: function() {
			return {
				"GetConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"CurrentStepChange": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"SaveWizard": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"CancelWizard": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"UpdateConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			};
		},

		/**
		 * Registers messages
		 * @protected
		 */
		registerMessages: function() {
			this.sandbox.registerMessages(this.getMessages());
		},

		/**
		 * Close window which had been opened by it
		 * @protected
		 */
		closeWindow: function() {
			window.close();
		},

		/**
		 * Returns localizable string from resources.
		 * @protected
		 * @param {String} key Key of resource string.
		 * @return {String}
		 */
		getLocalizableString: function(key) {
			return resources.localizableStrings[key] || "";
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModule#subscribeMessages
		 * @override
		 */
		subscribeMessages: function() {
			this.callParent(arguments);
			const sandbox = this.sandbox;
			const headerId = this.getWizardHeaderId();
			sandbox.subscribe("GetConfig", this.onGetConfig, this, [headerId]);
			sandbox.subscribe("CurrentStepChange", this.onCurrentStepChange, this, [headerId]);
			sandbox.subscribe("SaveWizard", this.onSaveWizard, this, [headerId]);
			sandbox.subscribe("CancelWizard", this.onCancelWizard, this, [headerId]);
		},

		/**
		 * Handler on save wizard
		 * @protected
		 */
		onSaveWizard: function(saveWizardConfig) {
			if (this.isSavingWizard) {
				return;
			}
			this.saveWizardConfig = saveWizardConfig || {};
			this.isSavingWizard = true;
			this.onCurrentStepChange();
		},

		/**
		 * Handler on cancel wizard
		 * @protected
		 */
		onCancelWizard: function() {
			const message = resources.localizableStrings.CancelButtonClickCaption;
			Terrasoft.showConfirmation(message, this.onCancellationWindowButtonClick, ["yes", "no"], this);
		},

		/**
		 * Handler click by cancellation button
		 * @protected
		 * @param {String} returnCode Buttons code
		 */
		onCancellationWindowButtonClick: function(returnCode) {
			if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
				this.closeWindow();
			}
		},

		/**
		 * Return wizard header id
		 * @protected
		 * @return {String}
		 */
		getWizardHeaderId: function() {
			return "ViewModule_WizardHeaderModule";
		},

		/**
		 * Shows wizard error
		 * @protected
		 * @param {String} message Text of message
		 */
		showWizardError: function(message) {
			Terrasoft.showInformation(message, this.closeWindow, this);
		},

		/**
		 * Shows WizardHeader shadow while scrolling.
		 * @protected
		 */
		showScrollShadow: function() {
			const wizardHeader = Ext.get("wizardHeader");
			if (!wizardHeader) {
				return;
			}
			const body = Ext.getBody();
			const scrollTop = body.getScrollTop();
			if (scrollTop > 0) {
				wizardHeader.addCls("wizard-header-shadow");
			} else {
				wizardHeader.removeCls("wizard-header-shadow");
			}
		},

		//endregion

		//region Methods: Public

		/**
		 * @inheritdoc Terrasoft.BaseViewModule#init
		 * @override
		 */
		init: function() {
			this.registerMessages();
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModule#render
		 * @override
		 */
		render: function(renderTo) {
			renderTo.addCls("section-designer-shown");
			this.callParent(arguments);
			window.onscroll = this.showScrollShadow;
		},

		/**
		 * @inheritdoc Terrasoft.BaseObject#destroy
		 * @override
		 */
		destroy: function() {
			const messages = this.getMessages();
			const messageKeys = Terrasoft.keys(messages);
			this.sandbox.unRegisterMessages(messageKeys);
			this.callParent(arguments);
		}

		//endregion

	});

	return Terrasoft.BaseWizardModule;
});


