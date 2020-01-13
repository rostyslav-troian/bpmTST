Terrasoft.configuration.Structures["OperatorQueuesModule"] = {innerHierarchyStack: ["OperatorQueuesModule"]};
define("OperatorQueuesModule", [], function() {

		/**
		 * @class Terrasoft.configuration.OperatorQueuesModule
		 * ##### ###### ######## #########.
		 */
		Ext.define("Terrasoft.configuration.OperatorQueuesModule", {
			alternateClassName: "Terrasoft.OperatorQueuesModule",
			extend: "Terrasoft.BaseSchemaModule",

			/**
			 * ############## ######## #####.
			 * @protected
			 * @overridden
			 */
			initSchemaName: function() {
				this.schemaName = "OperatorQueues";
			},

			/**
			 * ######## ######### ####### # ####### #########, #### ### ############# ###### ########## ## ########.
			 * @protected
			 * @overridden
			 */
			initHistoryState: Ext.emptyFn
		});

		return Terrasoft.OperatorQueuesModule;
	}
);


