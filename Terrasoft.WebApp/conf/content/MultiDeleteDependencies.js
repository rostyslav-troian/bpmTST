Terrasoft.configuration.Structures["MultiDeleteDependencies"] = {innerHierarchyStack: ["MultiDeleteDependencies"]};
define("MultiDeleteDependencies", ["BaseSchemaModuleV2"], function() {
	Ext.define("Terrasoft.configuration.MultiDeleteDependencies", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.MultiDeleteDependencies",

		deletedRecordId: null,

		itemId: null,

		deletedEntitySchemaName: null,

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#useHistoryState
		 * @overridden
		 */
		useHistoryState: false,

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "MultiDeleteDependenciesSchema";
		},

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#getViewModelConfig
		 * @overridden
		 */
		getViewModelConfig: function() {
			var viewModelConfig = this.callParent(arguments);
			Ext.apply(viewModelConfig, {
				values: {
					DeletedEntitySchemaName: this.deletedEntitySchemaName,
					DeletedRecordId: this.deletedRecordId,
					ItemId: this.itemId
				}
			});
			return viewModelConfig;
		}
	});

	return Terrasoft.MultiDeleteDependencies;
});


