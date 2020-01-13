Terrasoft.configuration.Structures["PortalFolderManagerViewModel"] = {innerHierarchyStack: ["PortalFolderManagerViewModel"]};
define("PortalFolderManagerViewModel", ["terrasoft", "BaseFolderManagerViewModel"],
	function() {
		/**
		 * @class Terrasoft.data.filters.PortalFolderManagerViewModel
		 */
		Ext.define("Terrasoft.data.filters.PortalFolderManagerViewModel", {
			extend: "Terrasoft.BaseFolderManagerViewModel",
			alternateClassName: "Terrasoft.PortalFolderManagerViewModel",

			/**
			 * @inheritdoc Terrasoft.BaseFolderManagerViewModel#getIsAdministratedByRecordsVisible
			 * @overridden
			 */
			getIsAdministratedByRecordsVisible: function() {
				if (Terrasoft.isCurrentUserSsp()) {
					return false;
				}
				return this.callParent(arguments);
			}
		});
	}
);


