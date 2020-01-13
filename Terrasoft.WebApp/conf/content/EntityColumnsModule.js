Terrasoft.configuration.Structures["EntityColumnsModule"] = {innerHierarchyStack: ["EntityColumnsModule"]};
define("EntityColumnsModule", ["ModalBox", "BaseSchemaModuleV2"], function() {
	/**
	 * EntityColumnsModule
	 */
	Ext.define("Terrasoft.configuration.EntityColumnsModule", {
		extend: "Terrasoft.configuration.BaseSchemaModule",
		alternateClassName: "Terrasoft.EntityColumnsModule",

		/**
		 * @inheritdoc Terrasoft.BaseModule#showMask
		 * @override
		 */
		showMask: true,

		/**
		 * Columns lookup info.
		 * @type []
		 */
		lookupInfo: null,

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#initHistoryState
		 * @override
		 */
		initHistoryState: Ext.emptyFn,

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#init
		 * @override
		 */
		init: function() {
			this.showLoadingMask();
			this.lookupInfo = this.sandbox.publish("GetColumnsLookupInfo", null, [this.sandbox.id]) || {};
			this.callParent(arguments);
		},

		/**
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "EntityColumnLookupPage";
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#getSchemaBuilderConfig
		 * @override
		 */
		getSchemaBuilderConfig: function() {
			const result = this.callParent(arguments);
			result.useCache = false;
			return result;
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#generateSchemaStructure
		 * @override
		 */
		generateSchemaStructure: function(callback, scope) {
			const config = this.getSchemaBuilderConfig();
			this.schemaBuilder.build(config, function(viewModelClass, viewConfig) {
				callback.call(scope, viewModelClass, viewConfig);
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#getViewModelConfig
		 * @override
		 */
		getViewModelConfig: function() {
			const viewModelConfig = this.callParent(arguments);
			let values = {
				modalBoxCaption: this.lookupInfo.modalBoxCaption
			};
			const originalValues = viewModelConfig ? viewModelConfig.values : null;
			values = Ext.apply(values, this.lookupInfo.values, originalValues);
			Ext.apply(viewModelConfig, {
				values: values
			});
			return viewModelConfig;
		},

		/**
		 * @inheritdoc Terrasoft.BaseObject#render
		 * @override
		 */
		render: function() {
			this.callParent(arguments);
			this.hideLoadingMask();
		},

		/**
		 * @inheritdoc Terrasoft.BaseObject#onDestroy
		 * @override
		 */
		onDestroy: function() {
			this.hideLoadingMask();
			this.callParent(arguments);
		}
	});

	return Terrasoft.EntityColumnsModule;
});


