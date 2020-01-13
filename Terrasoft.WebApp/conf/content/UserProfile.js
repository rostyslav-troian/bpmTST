Terrasoft.configuration.Structures["UserProfile"] = {innerHierarchyStack: ["UserProfile"]};
define("UserProfile", ["BaseSchemaModuleV2"],
	function() {
		/**
		 * @class Terrasoft.configuration.UserProfile
		 */
		Ext.define("Terrasoft.configuration.UserProfile", {
			extend: "Terrasoft.BaseSchemaModule",
			alternateClassName: "Terrasoft.UserProfile",

			//region Methods: Protected

			/**
			 * @inheritdoc
			 * @overridden
			 */
			initSchemaName: function() {
				this.callParent(arguments);
				if (this.Ext.isEmpty(this.schemaName)) {
					this.schemaName = "UserProfilePage";
				}
			}

			//endregion

		});
		return Terrasoft.UserProfile;
	}
);


