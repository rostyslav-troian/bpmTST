Terrasoft.configuration.Structures["BaseProcessParametersEditModule"] = {innerHierarchyStack: ["BaseProcessParametersEditModule"]};
define("BaseProcessParametersEditModule", ["ModalBox", "BaseSchemaModuleV2"], function() {
	/**
	 * BaseProcessParametersEditModule
	 */
	Ext.define("Terrasoft.configuration.BaseProcessParametersEditModule", {
		extend: "Terrasoft.configuration.BaseSchemaModule",
		alternateClassName: "Terrasoft.BaseProcessParametersEditModule",

		/**
		 * @inheritdoc Terrasoft.BaseModule#render
		 * @override
		 */
		showMask: true,

		/**
		 * Parameters info.
		 * @type []
		 */
		parametersInfo: null,

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#initHistoryState
		 * @override
		 */
		initHistoryState: Ext.emptyFn,

		/**
		 * Initialize parameters info.
		 * @protected
		 */
		initParametersInfo: function() {
			this.parametersInfo = {};
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#init
		 * @override
		 */
		init: function() {
			this.showLoadingMask();
			this.initParametersInfo();
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#getViewModelConfig
		 * @override
		 */
		getViewModelConfig: function() {
			var viewModelConfig = this.callParent(arguments);
			var values = {
				modalBoxCaption: this.parametersInfo.modalBoxCaption
			};
			var originalValues = viewModelConfig ? viewModelConfig.values : null;
			values = Ext.apply(values, this.parametersInfo.parameters, originalValues);
			Ext.apply(viewModelConfig, {
				values: values,
				methods: this.parametersInfo.methods
			});
			return viewModelConfig;
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#getSchemaBuilderConfig
		 * @override
		 */
		getSchemaBuilderConfig: function() {
			var result = this.callParent(arguments);
			result.useCache = false;
			return result;
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#generateSchemaStructure
		 * @override
		 */
		generateSchemaStructure: function(callback, scope) {
			var config = this.getSchemaBuilderConfig();
			this.schemaBuilder.build(config, function(viewModelClass, viewConfig) {
				callback.call(scope, viewModelClass, viewConfig);
			}, this);
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

	return Terrasoft.BaseProcessParametersEditModule;
});


