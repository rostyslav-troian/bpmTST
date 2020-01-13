Terrasoft.configuration.Structures["PortalUserInvitationModule"] = {innerHierarchyStack: ["PortalUserInvitationModule"]};
define("PortalUserInvitationModule", ["BaseSchemaModuleV2"], function() {
	Ext.define("Terrasoft.configuration.PortalUserInvitationModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.PortalUserInvitationModule",

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#generateViewContainerId
		 * @overridden
		 */
		generateViewContainerId: false,

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "PortalUserInvitationModuleSchema";
		},

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initHistoryState
		 * @overridden
		 */
		initHistoryState: Ext.emptyFn,

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#createViewModel
		 * @protected
		 * @overridden
		 */
		createViewModel: function() {
			var viewModel = this.callParent(arguments);
			var parameters = this.parameters;
			if (parameters) {
				viewModel.$PortalAccountId = parameters.PortalAccountId;
			}
			return viewModel;
		},

		/**
		 * @inheritDoc BaseSchemaModuleV2#render
		 * @override
		 */
		render: function() {
			this.callParent(arguments);
			this.centerInviteContainerPosition();
		},

		/**
		 * Centres alignable invitation container.
		 * @protected
		 */
		centerInviteContainerPosition: function () {
			var alignContainerEl = Ext.get("AlignableInviteContainer");
			if (alignContainerEl) {
				alignContainerEl.center(Ext.getBody());
				alignContainerEl.addCls("invite-alignable-container-background");
			}
		}
	});
	return Terrasoft.PortalUserInvitationModule;
});


