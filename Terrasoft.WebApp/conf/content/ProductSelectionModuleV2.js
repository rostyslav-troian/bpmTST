Terrasoft.configuration.Structures["ProductSelectionModuleV2"] = {innerHierarchyStack: ["ProductSelectionModuleV2"]};
define("ProductSelectionModuleV2", ["BaseSchemaModuleV2", "css!ProductSelectionModuleV2"],
	function() {
		/**
		 * @class Terrasoft.configuration.ProductSelectionModule
		 */
		Ext.define("Terrasoft.configuration.ProductSelectionModuleV2", {
			alternateClassName: "Terrasoft.ProductSelectionModuleV2",
			extend: "Terrasoft.BaseSchemaModule",
			schemaName: "ProductSelectionSchema",
			Ext: null,
			sandbox: null,
			Terrasoft: null,
			useHistoryState: true,
			messages: null,

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#init
			 * @overridden
			 */
			init: function() {
				this.registerMessages();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#initSchemaName
			 * @overridden
			 */
			initSchemaName: function() {
				this.config = this.sandbox.publish("ProductSelectionInfo", null, [this.sandbox.id]) || {};
				this.entitySchemaName = this.config.masterProductEntitySchemaName;
				this.parameters = {
					viewModelConfig: {}
				};
				var viewModelConfig = this.parameters.viewModelConfig;
				viewModelConfig.MasterEntitySchemaName = this.config.masterEntitySchemaName;
				viewModelConfig.MasterRecordId = this.config.masterRecordId;
				viewModelConfig.MasterCurrency = this.config.masterCurrency;
			},

			/**
			 * Registers module messages.
			 * @protected
			 */
			registerMessages: function() {
				var messages = {
					"ProductSelectionInfo": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					"BackHistoryState": {
						mode: Terrasoft.MessageMode.BROADCAST,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					"GetHistoryState": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					"PushHistoryState": {
						mode: Terrasoft.MessageMode.BROADCAST,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					"ReplaceHistoryState": {
						"direction": Terrasoft.MessageDirectionType.PUBLISH,
						"mode": Terrasoft.MessageMode.BROADCAST
					}
				};
				this.sandbox.registerMessages(messages);
			}
		});
		return Terrasoft.ProductSelectionModuleV2;
	});


