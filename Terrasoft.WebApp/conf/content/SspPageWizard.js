Terrasoft.configuration.Structures["SspPageWizard"] = {innerHierarchyStack: ["SspPageWizard"]};
define("SspPageWizard", ["PageWizard", "BaseWizardModule", "PortalSchemaAccessListManager",
		"PortalColumnAccessListManager", "css!PageWizard"], function() {

	Ext.define("Terrasoft.configuration.SspPageWizard", {
		extend: "Terrasoft.configuration.PageWizard",
		alternateClassName: "Terrasoft.SspPageWizard",

		/**
		 * @inheritDoc Terrasoft.configuration.PageWizard#getPageDesignerModuleName
		 * @override
		 */
		getPageDesignerModuleName: function() {
			return "SspPageDesignerModule";
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

		/**
		 * @inheritDoc Terrasoft.ApplicationStructureItemWizard#getInitChain
		 * @override
		 */
		getInitChain: function() {
			const chain = this.callParent(arguments);
			chain.push(this._initPortalSchemaAccessListManager);
			chain.push(this._initPortalColumnAccessListManager);
			return chain;
		},

		/**
		 * @inheritDoc Terrasoft.ApplicationStructureItemWizard#getRegistrationDataSteps
		 * @override
		 */
		getRegistrationDataSteps: function() {
			const steps = this.callParent(arguments);
			steps.push({
					manager: Terrasoft.PortalSchemaAccessListManager,
					updateSchemaDataAction: true
				},
				{
					manager: Terrasoft.PortalColumnAccessListManager,
					updateSchemaDataAction: true
				},
				{
					manager: Terrasoft.SspPageDetailsManager,
					processMessage: this.getLocalizableString("DetailRegistrationMessage"),
					updateSchemaDataAction: true
				});
			return steps;
		},

		/**
		 * @inheritdoc Terrasoft.ApplicationStructureItemWizard#getSteps
		 * @override
		 */
		getSteps: function () {
			const steps = this.callParent(arguments);
			let businessRuleSectionStep = _.findWhere(steps, {"schemaName": "BusinessRuleSection"});
			if (this.Ext.isEmpty(businessRuleSectionStep)) {
				return steps;
			}
			businessRuleSectionStep.schemaName = "SspBusinessRuleSection";
			return steps;
		}
	});

	return Terrasoft.SspPageWizard;
});


