Terrasoft.configuration.Structures["DashboardGridModule"] = {innerHierarchyStack: ["DashboardGridModule"]};
define("DashboardGridModule", ["terrasoft", "ext-base", "DashboardGridModuleResources", "BaseWidgetModule",
	"GridUtilitiesV2", "ContainerListGenerator",
	"ContainerList", "MiniPageUtilities", "ModuleUtils", "DashboardGridViewModel", "DashboardGridViewConfig",
	"DashboardListedGridViewModel", "DashboardListedGridViewConfig"],
	function(Terrasoft, Ext, resources) {

		/**
		 * @class Terrasoft.configuration.DashboardGridModule
		 * Class of dashboard grid module.
		 */
		Ext.define("Terrasoft.configuration.DashboardGridModule", {
			extend: "Terrasoft.BaseWidgetModule",
			alternateClassName: "Terrasoft.DashboardGridModule",

			/**
			 * Entity schema.
			 * @type {Terrasoft.BaseEntitySchema}
			 */
			entitySchema: null,

			/**
			 * Class name of the DashboardGrid module view model.
			 * @type {String}
			 */
			viewModelClassName: "Terrasoft.DashboardListedGridViewModel",

			/**
			 * Class name of the DashboardGrid module view configuration.
			 * @type {String}
			 */
			viewConfigClassName: "Terrasoft.DashboardListedGridViewConfig",

			/**
			 * @inheritDoc Terrasoft.configuration.BaseWidgetModule#initViewConfig
			 * @overridden
			 */
			initViewConfig: function(callback, scope) {
				var generatorConfig = Terrasoft.deepClone(this.moduleConfig);
				generatorConfig.viewModelClass = this.viewModelClass;
				generatorConfig.entitySchema = this.entitySchema;
				this.buildView(generatorConfig, function(view) {
					this.viewConfig = view[0];
					callback.call(scope);
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseWidgetModule#initViewModelClass
			 * @overridden
			 */
			initViewModelClass: function(callback, scope) {
				var moduleConfig = this.moduleConfig;
				Terrasoft.require([moduleConfig.entitySchemaName], function(entitySchema) {
					this.entitySchema = entitySchema;
					this.viewModelClass = Ext.ClassManager.get(this.viewModelClassName);
					callback.call(scope);
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseWidgetModule#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				if (!this.viewModel) {
					this.initConfig();
					this.subscribeMessages();
				}
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#getViewModelConfig
			 * @overridden
			 */
			getViewModelConfig: function() {
				var config = this.callParent(arguments);
				config.entitySchema = this.entitySchema;
				config.resources = resources;
				return config;
			},

			/**
			 * Initializes module configuration.
			 * @protected
			 * @virtual
			 */
			initConfig: function() {
				this.callParent(["GetDashboardGridConfig", this.sandbox]);
			},

			/**
			 * Subscribes to the specific module posts.
			 * @protected
			 * @virtual
			 */
			subscribeMessages: function() {
				this.callParent(arguments);
				this.subscribeMessagesInternal("GenerateDashboardGrid");
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseWidgetModule#onGenerateWidget
			 * @overridden
			 */
			onGenerateWidget: function() {
				this.onGenerateDashboardGrid();
			},

			/**
			 * GenerateDashboardGrid handler.
			 * @protected
			 * @virtual
			 */
			onGenerateDashboardGrid: function() {
				if (this.view && !this.view.destroyed) {
					this.view.destroy();
				}
				this.view = null;
				if (!this.viewModel) {
					return true;
				}
				var renderTo = Ext.get(this.viewModel.renderTo);
				if (this.viewModel && !this.viewModel.destroyed) {
					this.viewModel.destroy();
				}
				this.viewModel = null;
				this.moduleConfig = null;
				this.initConfig();
				this.initViewModelClass(function() {
					if (this.destroyed) {
						return;
					}
					this.initViewConfig(function() {
						if (this.destroyed) {
							return;
						}
						var viewModel = this.viewModel = this.createViewModel();
						viewModel.init(function() {
							if (!this.destroyed && renderTo) {
								this.render(renderTo);
							}
						}, this);
					}, this);
				}, this);
				return true;
			}
		});

		return Terrasoft.DashboardGridModule;
	});


