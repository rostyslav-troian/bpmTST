Terrasoft.configuration.Structures["PlanningLoadModule"] = {innerHierarchyStack: ["PlanningLoadModule"]};
define("PlanningLoadModule", ["BaseSchemaModuleV2", "css!DetailModuleV2"], function() {
	Ext.define("Terrasoft.configuration.PlanningLoadModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.PlanningLoadModule",

		/**
		 * Entity schema name.
		 */
		entitySchemaName: null,

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#useHistoryState
		 * @overridden
		 */
		useHistoryState: false,

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#getViewContainerId
		 * @overridden
		 */
		getViewContainerId: function() {
			var id = this.callParent(arguments);
			return this.entitySchemaName + id;
		}

	});

	return Terrasoft.PlanningLoadModule;
});


