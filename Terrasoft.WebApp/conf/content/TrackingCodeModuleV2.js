Terrasoft.configuration.Structures["TrackingCodeModuleV2"] = {innerHierarchyStack: ["TrackingCodeModuleV2"]};
define("TrackingCodeModuleV2", ["BaseNestedModule", "TrackingCodeViewConfigV2", "TrackingCodeViewModelV2"
], function() {
	Ext.define("Terrasoft.configuration.TrackingCodeModule", {
		extend: "Terrasoft.BaseNestedModule",
		alternateClassName: "Terrasoft.TrackingCodeModule",
		Ext: null,
		sandbox: null,
		Terrasoft: null,
		showMask: true,
		parameters: {
			config: null
		},

		/**
		 * The class name of the view model.
		 * @type {String}
		 */
		viewModelClassName: "Terrasoft.TrackingCodeViewModel",

		/**
		 * The class name of the generator of view configuration.
		 * @type {String}
		 */
		viewConfigClassName: "Terrasoft.TrackingCodeViewConfig",

		/**
		 * The class name of the generator of view.
		 * @type {String}
		 */
		viewGeneratorClass: "Terrasoft.ViewGenerator",

		/**
		 * Create instance of Terrasoft.ViewGenerator class.
		 * @return {Terrasoft.ViewGenerator} Returns object Terrasoft.ViewGenerator.
		 */
		createViewGenerator: function() {
			return this.Ext.create(this.viewGeneratorClass);
		},

		/**
		 * @inheritdoc Terrasoft.configuration.BaseNestedModule#initViewConfig
		 * @override
		 */
		initViewConfig: function(callback, scope) {
			var generatorConfig = Terrasoft.deepClone(this.parameters.config) || {};
			generatorConfig.viewModelClass = this.viewModelClass;
			this.buildView(generatorConfig, function(view) {
				this.viewConfig = view[0];
				callback.call(scope);
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.configuration.BaseNestedModule#getViewModelConfig
		 * @override
		 */
		getViewModelConfig: function() {
			var config = this.callParent(arguments);
			config.values = Ext.apply({}, this.parameters.config);
			return config;
		},

		/**
		 * @inheritdoc Terrasoft.configuration.BaseNestedModule#initViewModelClass
		 * @override
		 */
		initViewModelClass: function(callback, scope) {
			this.viewModelClass = this.Ext.ClassManager.get(this.viewModelClassName);
			callback.call(scope);
		},

		/**
		 * Creates the view configuration of the module.
		 * @protected
		 * @virtual
		 * @param {Object} config Configuration object.
		 * @param {Function} callback Callback function.
		 * @param {Terrasoft.BaseModel} scope Execution context of callback.
		 * @return {Object[]} Returns the view configuration of the module.
		 */
		buildView: function(config, callback, scope) {
			var viewGenerator = this.createViewGenerator();
			var viewClass = this.Ext.create(this.viewConfigClassName);
			var schema = {
				viewConfig: viewClass.generate(config)
			};
			var viewConfig = Ext.apply({
				schema: schema
			}, config);
			viewConfig.schemaName = "";
			viewGenerator.generate(viewConfig, callback, scope);
		}
	});

	return Terrasoft.TrackingCodeModule;
});


