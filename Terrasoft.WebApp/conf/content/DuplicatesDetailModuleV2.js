Terrasoft.configuration.Structures["DuplicatesDetailModuleV2"] = {innerHierarchyStack: ["DuplicatesDetailModuleV2"]};
define("DuplicatesDetailModuleV2", ["BaseNestedModule", "DuplicatesDetailViewConfigV2", "DuplicatesDetailViewModelV2"],
	function() {
		Ext.define("Terrasoft.configuration.DuplicatesDetailModule", {
			extend: "Terrasoft.BaseNestedModule",
			alternateClassName: "Terrasoft.DuplicatesDetailModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,
			showMask: true,

			/**
			 * Module configuration object.
			 * @type {Object}
			 */
			moduleConfig: null,

			/**
			 * The class name of the viewmodel.
			 * @type {String}
			 */
			viewModelClassName: "Terrasoft.DuplicatesDetailViewModel",

			/**
			 * The class name of the generator of view configuration.
			 * @type {String}
			 */
			viewConfigClassName: "Terrasoft.DuplicatesDetailViewConfig",

			/**
			 * The class name of the generator of view.
			 * @type {String}
			 */
			viewGeneratorClass: "Terrasoft.ViewGenerator",

			initConfig: function() {
				var sandbox = this.sandbox;
				this.moduleConfig = sandbox.publish("GetConfig", sandbox.id, [sandbox.id]) || {};
			},

			/**
			 * Create instance of Terrasoft.ViewGenerator class.
			 * @return {Terrasoft.ViewGenerator} Returns object Terrasoft.ViewGenerator.
			 */
			createViewGenerator: function() {
				return this.Ext.create(this.viewGeneratorClass);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#initViewConfig
			 * @overridden
			 */
			initViewConfig: function(callback, scope) {
				var generatorConfig = Terrasoft.deepClone(this.moduleConfig) || {};
				generatorConfig.viewModelClass = this.viewModelClass;
				this.buildView(generatorConfig, function(view) {
					this.viewConfig = view[0];
					callback.call(scope);
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#getViewModelConfig
			 * @overridden
			 */
			getViewModelConfig: function() {
				var config = this.callParent(arguments);
				config.values = Ext.apply({}, this.moduleConfig);
				return config;
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#initViewModelClass
			 * @overridden
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
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#init
			 * @overridden
			 */
			init: function() {
				if (!this.viewModel) {
					this.initConfig();
				}
				this.callParent(arguments);
			}
		});

		return Terrasoft.DuplicatesDetailModule;
	});


