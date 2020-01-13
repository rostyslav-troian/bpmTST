Terrasoft.configuration.Structures["ImportNotifierClientModule"] = {innerHierarchyStack: ["ImportNotifierClientModule"]};
define("ImportNotifierClientModule", ["ModuleUtils", "sandbox"], function(ModuleUtils, sandbox) {
	return {
		/**
		 * Initialize import notifier client module.
		 */
		init: function() {
			Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, this.onChannelMessage, this);
		},
		/**
		 * On channel message event handler.
		 * @private
		 * @param {Object} channel Channel.
		 * @param {Object} message Channel message.
		 */
		onChannelMessage: function(channel, message) {
			if (Ext.isEmpty(message)) {
				return;
			}
			var header = message.Header;
			var body = message.Body;
			if (Ext.isEmpty(header) || Ext.isEmpty(body) || header.Sender !== "TagImport") {
				return;
			}
			body = JSON.parse(body);
			var tags = body.tags;
			var rootSchemaName = body.rootSchemaName;
			if (tags && rootSchemaName) {
				var moduleStructure = ModuleUtils.getModuleStructureByName(rootSchemaName);
				var sectionSchema =  moduleStructure.sectionSchema;
				var storage = Terrasoft.configuration.Storage.Filters = Terrasoft.configuration.Storage.Filters || {};
				var sessionFilters = storage[sectionSchema] = storage[sectionSchema] || {};
				sessionFilters.TagFilters = [{ "tags": tags }];
				sandbox.publish("PushHistoryState", {
					hash: Terrasoft.combinePath(moduleStructure.sectionModule, sectionSchema)
				});
			}
		}
	};
});


