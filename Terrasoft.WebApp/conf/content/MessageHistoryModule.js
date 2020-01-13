Terrasoft.configuration.Structures["MessageHistoryModule"] = {innerHierarchyStack: ["MessageHistoryModule"]};
define("MessageHistoryModule", ["css!MessageHistoryStyle"],
	function() {
		/**
		 * @class Terrasoft.configuration.MessageHistoryModule
		 * Message history module.
		 */
		Ext.define("Terrasoft.configuration.MessageHistoryModule", {
			extend: "Terrasoft.BaseSchemaModule",
			alternateClassName: "Terrasoft.MessageHistoryModule",

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#generateViewContainerId
			 * @overridden
			 */
			generateViewContainerId: false,

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#initSchemaName
			 * @overridden
			 */
			initSchemaName: function() {
				this.schemaName = "MessageHistoryPage";
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#initHistoryState
			 * @overridden
			 */
			initHistoryState: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.initMessages();
			},

			/**
			 * Initialize subscription on module messages.
			 * @private
			 */
			initMessages: function() {
				this.sandbox.subscribe("RerenderModule", function(config) {
					if (this.viewModel) {
						this.render(this.Ext.get(config.renderTo));
						return true;
					}
				}, this, [this.sandbox.id]);
			}
		});
		return this.Terrasoft.MessageHistoryModule;
	}
);


