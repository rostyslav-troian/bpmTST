Terrasoft.configuration.Structures["QueueModule"] = {innerHierarchyStack: ["QueueModule"]};
define("QueueModule", ["BaseSchemaModuleV2"], function() {
	/**
	 * @class Terrasoft.configuration.QueueModule
	 * ##### ###### ### ###### # ########.
	 */
	Ext.define("Terrasoft.configuration.QueueModule", {
		alternateClassName: "Terrasoft.QueueModule",
		extend: "Terrasoft.BaseSchemaModule",

		//region Methods: Private

		/**
		 * ############# ######## ###### ############# ########### ######.
		 * @private
		 * @param {Terrasoft.BaseViewModel} viewModel ###### #############.
		 */
		initViewModelAttributes: function(viewModel) {
			var parameters = this.parameters;
			viewModel.applyParameters(parameters);
			if (!Ext.isEmpty(parameters)) {
				var entitySchemaName = parameters.EntitySchemaName;
				require([entitySchemaName], function(entitySchema) {
					viewModel.set("EntitySchemaCaption", entitySchema.caption);
					viewModel.set("EntitySchemaPrimaryDisplayColumnName", entitySchema.primaryDisplayColumnName);
				}.bind(this));
			}
		},

		//endregion

		//region Methods: Protected

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @protected
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "QueuePage";
		},

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#createViewModel
		 * @protected
		 * @overridden
		 */
		createViewModel: function() {
			var viewModel = this.callParent(arguments);
			this.initViewModelAttributes(viewModel);
			return viewModel;
		},

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initHistoryState
		 * @protected
		 * @overridden
		 */
		initHistoryState: Ext.emptyFn

		//endregion

	});
	return Terrasoft.QueueModule;
});


