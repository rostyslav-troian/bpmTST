Terrasoft.configuration.Structures["CtiPanelModule"] = {innerHierarchyStack: ["CtiPanelModule"]};
define("CtiPanelModule", ["BaseSchemaModuleV2"], function() {
	/**
	 * @class Terrasoft.configuration.CtiPanelModule
	 * CTI panel page class to work with calls.
	 */
	Ext.define("Terrasoft.configuration.CtiPanelModule", {
		alternateClassName: "Terrasoft.CtiPanelModule",
		extend: "Terrasoft.BaseSchemaModule",

		/**
		 * Initializes the name of the scheme.
		 * @protected
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "CtiPanel";
		},

		/**
		 * Creates view model. Extends model {@link Terrasoft.CtiModel} by current class model.
		 * @protected
		 * @overridden
		 */
		createViewModel: function() {
			var viewModel = this.callParent(arguments);
			var model = Ext.merge(Terrasoft.CtiModel.model, viewModel.model);
			Ext.merge(viewModel, Terrasoft.CtiModel, {
				init: viewModel.init
			});
			viewModel.model = model;
			Terrasoft.CtiModel = Terrasoft.integration.telephony.CtiModel = viewModel;
			return viewModel;
		},

		/**
		 * Replaces the last element in the chain of states, if the identifier module is different from the current.
		 * @protected
		 * @overridden
		 */
		initHistoryState: Ext.emptyFn

	});
	return Terrasoft.CtiPanelModule;
});


