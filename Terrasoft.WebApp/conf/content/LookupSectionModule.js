Terrasoft.configuration.Structures["LookupSectionModule"] = {innerHierarchyStack: ["LookupSectionModule"]};
define("LookupSectionModule", ["SectionModuleV2","css!SectionModuleV2"], function() {
	/**
	 * SectionModule class is intended to create an instance lookup section.
	 */
	Ext.define("Terrasoft.configuration.LookupSectionModule", {
		alternateClassName: "Terrasoft.LookupSectionModule",
		extend: "Terrasoft.SectionModule",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#getProfileKey
		 * @override
		 */
		getProfileKey: function() {
			return this.schemaName + this.entitySchemaName + "GridSettingsGridDataView";
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#initHistoryState
		 * @override
		 */
		initHistoryState: function() {
			var sandbox = this.sandbox;
			var state = sandbox.publish("GetHistoryState");
			var currentState = state.state || {};
			this.entitySchemaName = currentState.entitySchemaName || state.hash.operationType;
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.SectionModule#prepareHistoryState
		 * @override
		 */
		prepareHistoryState: function() {
			var newState = this.callParent(arguments);
			newState.entitySchemaName = this.entitySchemaName;
			return newState;
		},

		/**
		 * @inheritDoc Terrasoft.configuration.SectionModule#getViewModelConfig
		 * @override
		 */
		getViewModelConfig: function() {
			var viewModelConfig = this.callParent(arguments);
			Ext.apply(viewModelConfig, {
				values: {
					IsLookupSection: true
				}
			});
			return viewModelConfig;
		}

	});
	return Terrasoft.LookupSectionModule;
});


