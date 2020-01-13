Terrasoft.configuration.Structures["BaseMessagePublisherModule"] = {innerHierarchyStack: ["BaseMessagePublisherModule"]};
define("BaseMessagePublisherModule", ["BaseSchemaModuleV2"],
	function() {
		Ext.define("Terrasoft.configuration.BaseMessagePublisherModule", {
			extend: "Terrasoft.BaseSchemaModule",
			alternateClassName: "Terrasoft.BaseMessagePublisherModule",

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
				this.schemaName = "BaseMessagePublisherPage";
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#initHistoryState
			 * @overridden
			 */
			initHistoryState: Terrasoft.emptyFn,

			/**
			 * @inheritdoc
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.initMessages();
			},

			/**
			 * Subscribes to messages of the module.
			 * @private
			 */
			initMessages: function() {
				this.sandbox.subscribe("RerenderPublisherModule", function(config) {
					if (this.viewModel) {
						this.render(this.Ext.get(config.renderTo));
						return true;
					}
				}, this, [this.sandbox.id]);
			}
		});
		return this.Terrasoft.BaseMessagePublisherModule;
	});


