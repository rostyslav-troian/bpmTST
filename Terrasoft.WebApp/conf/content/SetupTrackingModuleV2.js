Terrasoft.configuration.Structures["SetupTrackingModuleV2"] = {innerHierarchyStack: ["SetupTrackingModuleV2"]};
define("SetupTrackingModuleV2", ["BaseNestedModule", "SetupTrackingViewConfigV2", "SetupTrackingViewModelV2"],
    function() {
        Ext.define("Terrasoft.configuration.SetupTrackingModule", {
            extend: "Terrasoft.BaseNestedModule",
            alternateClassName: "Terrasoft.SetupTrackingModule",
            Ext: null,
            sandbox: null,
            Terrasoft: null,
            showMask: true,
            parameters: {
                config: null
            },

            /**
             * The class name of the viewmodel.
             * @type {String}
             */
            viewModelClassName: "Terrasoft.SetupTrackingViewModel",

            /**
             * The class name of the generator of view configuration.
             * @type {String}
             */
            viewConfigClassName: "Terrasoft.SetupTrackingViewConfig",

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
             * @inheritDoc Terrasoft.configuration.BaseNestedModule#initViewConfig
             * @overridden
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
             * @inheritDoc Terrasoft.configuration.BaseNestedModule#getViewModelConfig
             * @overridden
             */
            getViewModelConfig: function() {
                var config = this.callParent(arguments);
                config.values = Ext.apply({}, this.parameters.config);
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
                this.callParent(arguments);
            }
        });

        return Terrasoft.SetupTrackingModule;
    });


