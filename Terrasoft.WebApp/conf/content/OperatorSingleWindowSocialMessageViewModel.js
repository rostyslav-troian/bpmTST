Terrasoft.configuration.Structures["OperatorSingleWindowSocialMessageViewModel"] = {innerHierarchyStack: ["OperatorSingleWindowSocialMessageViewModel"]};
define("OperatorSingleWindowSocialMessageViewModel", ["SocialMessageViewModel"], function() {

		/**
		 * @class Terrasoft.configuration.OperatorSingleWindowSocialMessageViewModel
		 */
		Ext.define("Terrasoft.model.OperatorSingleWindowSocialMessageViewModel", {

			extend: "Terrasoft.SocialMessageViewModel",
			alternateClassName: "Terrasoft.OperatorSingleWindowSocialMessageViewModel",

			/**
			 * Operator Single WindoW sandbox id.
			 */
			esnOperatorSingleWindowSandboxId: "OperatorSingleWindowModule_SingleWindow_ESNFeedModule",

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.SocialFeedUtilities#getIsRightPanel
			 */
			getIsRightPanel: function() {
				return (this.callParent(arguments) || this.sandbox.id === this.esnOperatorSingleWindowSandboxId);
			}

			//endregion

		});
	});


