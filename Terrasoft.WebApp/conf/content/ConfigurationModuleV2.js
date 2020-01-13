Terrasoft.configuration.Structures["ConfigurationModuleV2"] = {innerHierarchyStack: ["ConfigurationModuleV2"]};
define("ConfigurationModuleV2", ["BusinessRulesApplierV2", "BaseSchemaModuleV2"], function(BusinessRulesApplier) {

	/**
	 * @class Terrasoft.configuration.ConfigurationModule
	 * ##### ###### ######### ######### #####.
	 */
	Ext.define("Terrasoft.configuration.ConfigurationModule", {
		alternateClassName: "Terrasoft.ConfigurationModule",
		extend: "Terrasoft.BaseSchemaModule",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#createViewModel
		 * ##### ### #### ########, ######### ########### #######
		 * (##. {@link Terrasoft.BusinessRulesApplier.applyDependencies}).
		 * @protected
		 * @overridden
		 * @param {Object} viewModelClass ##### ###### ############# #####.
		 * @return {Object} ########## ######### ###### ############# #####.
		 */
		createViewModel: function() {
			var viewModel = this.callParent(arguments);
			BusinessRulesApplier.applyDependencies(viewModel);
			return viewModel;
		},


		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#prepareHistoryState
		 * @protected
		 * @overridden
		 */
		prepareHistoryState: function() {
			var newState = this.callParent(arguments);
			this.schemaName = newState.designerSchemaName;
			delete newState.designerSchemaName;
			return newState;
		},

		/**
		 * ############## ######## #####.
		 * @protected
		 * @overridden
		 */
		initSchemaName: function() {
			var historyState = this.sandbox.publish("GetHistoryState");
			var hash = historyState.hash;
			var state = historyState.state;
			this.schemaName = this.schemaName || hash.entityName || "";
		}

	});
	return Terrasoft.ConfigurationModule;

});


