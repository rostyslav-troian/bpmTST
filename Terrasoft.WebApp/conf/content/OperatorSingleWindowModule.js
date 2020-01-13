Terrasoft.configuration.Structures["OperatorSingleWindowModule"] = {innerHierarchyStack: ["OperatorSingleWindowModule"]};
define("OperatorSingleWindowModule", ["BaseSchemaModuleV2"], function() {
	/**
	 * @class Terrasoft.configuration.OperatorSingleWindowModule
	 * ##### ####### #### #########.
	 */
	Ext.define("Terrasoft.configuration.OperatorSingleWindowModule", {
		alternateClassName: "Terrasoft.OperatorSingleWindowModule",
		extend: "Terrasoft.BaseSchemaModule",

		Ext: null,
		Terrasoft: null,
		sandbox: null,

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModuleV2#initSchemaName.
		 * @overridden
		 */
		initSchemaName: function() {
			this.callParent(arguments);
			this.schemaName = "OperatorSingleWindowPage";
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModuleV2#prepareHistorySate.
		 * @overridden
		 */
		prepareHistorySate: function() {
			var newState = this.callParent(arguments);
			delete newState.isSeparateMode;
			delete newState.schemaName;
			delete newState.entitySchemaName;
			delete newState.operation;
			delete newState.primaryColumnValue;
			delete newState.isInChain;
			return newState;
		}

	});
	return Terrasoft.OperatorSingleWindowModule;
});


