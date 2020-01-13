Terrasoft.configuration.Structures["ChangeAdminRightsUserTaskDeleteRightsViewModel"] = {innerHierarchyStack: ["ChangeAdminRightsUserTaskDeleteRightsViewModel"]};
define("ChangeAdminRightsUserTaskDeleteRightsViewModel", ["ChangeAdminRightsUserTaskBaseItemViewModel"],
	function() {
		/**
		 * @class Terrasoft.model.ChangeAdminRightsUserTaskDeleteRightsViewModel
		 * Model delete rights for the change admin rights user task.
		 */
		Ext.define("Terrasoft.model.ChangeAdminRightsUserTaskDeleteRightsViewModel", {
			extend: "Terrasoft.ChangeAdminRightsUserTaskBaseItemViewModel",
			alternateClassName: "Terrasoft.ChangeAdminRightsUserTaskDeleteRightsViewModel",

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.ProcessMiniEditPageMixin#getActiveItemEditName
			 * @overridden
			 */
			getActiveItemEditName: function() {
				return "ProcessDeleteRightsEditName";
			},

			/**
			 * @inheritdoc Terrasoft.ProcessMiniEditPageMixin#getProcessMiniEditPageId
			 * @overridden
			 */
			getProcessMiniEditPageId: function() {
				return this.sandbox.id + "deleterightsedit";
			},

			/**
			 * @inheritdoc Terrasoft.ProcessMiniEditPageMixin#getAddButtonEnabledProperyName
			 * @overridden
			 */
			getAddButtonEnabledProperyName: function() {
				return "IsDeleteRightsToolsButtonEnabled";
			},

			/**
			 * @inheritdoc Terrasoft.ProcessMiniEditPageMixin#getBlockName
			 * @overridden
			 */
			getBlockName: function() {
				return "DeleteRights";
			}

			//endregion
		});

		return Terrasoft.ChangeAdminRightsUserTaskDeleteRightsViewModel;
	});


