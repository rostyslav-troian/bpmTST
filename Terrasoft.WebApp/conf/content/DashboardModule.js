Terrasoft.configuration.Structures["DashboardModule"] = {innerHierarchyStack: ["DashboardModule"]};
define("DashboardModule", ["ext-base", "DashboardModuleResources", "BaseNestedModule", "DashboardEnums"],
	function(ext, resources) {

		/**
		 * @class Terrasoft.configuration.BaseDashboardViewModel
		 * Class of view model of dashboard module.
		 */
		Ext.define("Terrasoft.configuration.BaseDashboardViewModel", {
			extend: "Terrasoft.BaseModel",
			alternateClassName: "Terrasoft.BaseDashboardViewModel",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * @inheritdoc Terrasoft.BaseModel#constructor
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this.initResourcesValues(resources);
			},

			/**
			 * Initialize view model by values of resources.
			 * @protected
			 * @virtual
			 * @param {Object} resourcesObj Object of resources.
			 */
			initResourcesValues: function(resourcesObj) {
				var resourcesSuffix = "Resources";
				Terrasoft.each(resourcesObj, function(resourceGroup, resourceGroupName) {
					resourceGroupName = resourceGroupName.replace("localizable", "");
					Terrasoft.each(resourceGroup, function(resourceValue, resourceName) {
						var viewModelResourceName = [resourcesSuffix, resourceGroupName, resourceName].join(".");
						this.set(viewModelResourceName, resourceValue);
					}, this);
				}, this);
			},

			/**
			 * Loads the dashboards.
			 * @protected
			 * @virtual
			 */
			loadNestedModule: function() {
				this.iterateDashboardModules(function(moduleId, moduleConfig) {
					var renderTo = moduleConfig.renderTo;
					var moduleName = moduleConfig.moduleName;
					this.sandbox.loadModule(moduleName, {
						renderTo: renderTo,
						id: moduleId
					});
				}, this);
			},

			/**
			 * Calls the iterator function for dashboards items.
			 * @param {Function} iterateFunction Iterator function.
			 * @param {Object} scope The context of the function.
			 */
			iterateDashboardModules: function(iterateFunction, scope) {
				if (!this.Ext.isFunction(iterateFunction)) {
					return;
				}
				var dashboards = this.getDashboards();
				dashboards.each(function(dashboard) {
					var modulesConfig = dashboard.getVisibleItems();
					this.Terrasoft.each(modulesConfig, function(moduleConfig, renderTo) {
						var config = this.getNestedModuleConfig(moduleConfig);
						var moduleId = this.getModuleId(renderTo, config);
						config.renderTo = renderTo;
						iterateFunction.call(scope, moduleId, config);
					}, this);
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.BaseObject#onDestroy
			 * @overridden
			 */
			onDestroy: function() {
				this.iterateDashboardModules(function(moduleId) {
					this.sandbox.unloadModule(moduleId);
				}, this);
				this.callParent(arguments);
			},

			/**
			 * Returns widget configuration.
			 * @protected
			 * @overridden
			 * @param {String} config.widgetType Type of widget.
			 * @return {Object} View of widget.
			 */
			getWidgetConfig: function(config) {
				var widgetConfig = Terrasoft.DashboardEnums.WidgetType[config.widgetType];
				return widgetConfig.view;
			},

			/**
			 * Generates unique identifier for dashboard module.
			 * @protected
			 * @virtual
			 * @param {String} itemName Name of dashboard item.
			 * @param {Object} moduleConfig Configuration of dashboard item.
			 * @return {String} Unique identifier for dashboard module.
			 */
			getModuleId: function(itemName, moduleConfig) {
				var moduleName = "";
				if (moduleConfig && moduleConfig.moduleName) {
					moduleName = moduleConfig.moduleName;
				}
				var sandboxId = this.sandbox.id;
				return this.Ext.String.format("{0}{1}{2}", sandboxId, itemName, moduleName);
			},

			/**
			 * Returns configuration of nested module.
			 * @protected
			 * @virtual
			 * @param {Object} moduleConfig Configuration of dashboard item.
			 * @return {Object} Configuration of nested module.
			 */
			getNestedModuleConfig: function(moduleConfig) {
				var config = Ext.apply({}, this.getWidgetConfig(moduleConfig), moduleConfig);
				config.moduleName = config.moduleName || (config.parameters && config.parameters.moduleName);
				return config;
			},

			/**
			 * Registrated messages for nested modules.
			 * @protected
			 * @virtual
			 * @param {String} itemName Nested module name.
			 * @param {String} moduleConfig Configuration of dashboard item.
			 */
			registerModuleMessages: function(itemName, moduleConfig) {
				var messages = {};
				var config = this.getNestedModuleConfig(moduleConfig);
				var configurationMessage = config.configurationMessage || config.parameters.configurationMessage;
				messages[configurationMessage] = {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				};
				this.sandbox.registerMessages(messages);
			},

			/**
			 * Subscribe for require config message for nested module.
			 * @protected
			 * @virtual
			 * @param {String} itemName Nested module name.
			 * @param {Object} moduleConfig Configuration of dashboard item.
			 */
			subscribeNestedModulesMessage: function(itemName, moduleConfig) {
				var config = this.getNestedModuleConfig(moduleConfig);
				var moduleId = this.getModuleId(itemName, config);
				this.registerModuleMessages(itemName, config);
				var configurationMessage = config.configurationMessage || config.parameters.configurationMessage;
				var parameters = config.parameters.parameters || config.parameters;
				this.sandbox.subscribe(configurationMessage, function() {
					return parameters;
				}, [moduleId]);
			},

			/**
			 * Initializes model.
			 * @protected
			 * @virtual
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			init: function(callback, scope) {
				this.subscribeModuleMessages();
				this.initModulesCaptions();
				callback.call(scope);
			},

			/**
			 * Subscribes on the messages.
			 * @protected
			 * @virtual
			 */
			subscribeModuleMessages: function() {
				var dashboards = this.getDashboards();
				dashboards.each(function(dashboard) {
					var modulesConfig = dashboard.getItems();
					Terrasoft.each(modulesConfig, function(moduleConfig, name) {
						this.subscribeNestedModulesMessage(name, moduleConfig);
					}, this);
				}, this);
			},

			/**
			 * Do actions that required after page had been rendered.
			 * @protected
			 * @virtual
			 */
			onRender: function() {
				if (!this.get("Restored")) {
					this.loadNestedModule();
				}
			},

			/**
			 * Generate property name for module container caption.
			 * @protected
			 * @virtual
			 * @param {String} itemName Nested module name.
			 * @returns {String} Poperty name of module caption.
			 */
			getModuleCaptionPropertyName: function(itemName) {
				return itemName + "ModuleContainer";
			},

			/**
			 * Initialize caption property for nested modules.
			 * @protected
			 * @virtual
			 */
			initModulesCaptions: function() {
				var dashboards = this.getDashboards();
				dashboards.each(function(dashboard) {
					var modulesConfig = dashboard.getItems();
					Terrasoft.each(modulesConfig, function(itemConfig, name) {
						var defaultModuleCaption =
							this.get("Resources.Strings.ModulePrefix") +
								(itemConfig.moduleName || itemConfig.parameters.moduleName);
						var moduleCaption = itemConfig.caption ||
							itemConfig.parameters.caption ||
							defaultModuleCaption;
						this.set(this.getModuleCaptionPropertyName(name), moduleCaption);
					}, this);
				}, this);
			},

			/**
			 * Returns collection of dashboards.
			 * @protected
			 * @virtual
			 * @return {Terrasoft.Collection} Collection of dashboards.
			 */
			getDashboards: function() {
				return this.get("Dashboards");
			},

			/**
			 * Method for subscribe by default for afterrender and afterrerender.
			 */
			loadModule: this.Terrasoft.emptyFn
		});

		/**
		 * @class Terrasoft.configuration.DashboardViewsConfig
		 * Class of view dashboard module.
		 */
		Ext.define("Terrasoft.configuration.DashboardViewConfig", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.DashboardViewConfig",

			/**
			 * Row height.
			 * @type {String}
			 */
			rowHeight: "69px",

			/**
			 * Generate collection of dashboard view.
			 * @param {Terrasoft.Collection} items Dashboard collection.
			 * @returns {Object[]} Collection of dashboard view.
			 */
			generate: function(items) {
				var itemsConfig = [];
				items.each(function(item) {
					var itemId = "DashboardItem" + item.getId();
					itemsConfig.push({
						"name": itemId + "GridLayout",
						"rowHeight": this.rowHeight,
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": item.getVisibleViewConfig()
					});
				}, this);
				return itemsConfig;
			}
		});

		/**
		 * @class Terrasoft.configuration.DashboardModule
		 * Class of dashboard module.
		 */
		Ext.define("Terrasoft.configuration.DashboardModule", {
			extend: "Terrasoft.BaseNestedModule",
			alternateClassName: "Terrasoft.DashboardModule",

			/**
			 * Ext framework.
			 * @type {Object}.
			 */
			Ext: null,

			/**
			 * Sandbox.
			 * @type {Object}.
			 */
			sandbox: null,

			/**
			 * Terrasoft framework.
			 * @type {Object}.
			 */
			Terrasoft: null,

			/**
			 * Show mask flag.
			 * @type {Boolean}.
			 */
			showMask: true,

			/**
			 * Root element of view.
			 * @private
			 * @type {Ext.Element}
			 */
			renderContainer: null,

			/**
			 * Module configuration.
			 * @type {Object}
			 */
			moduleConfig: null,

			/**
			 * Name of nested viewModel class.
			 * @type {String}
			 */
			viewModelClassName: "Terrasoft.BaseDashboardViewModel",

			/**
			 * Name of nested view class.
			 * @type {String}
			 */
			viewConfigClassName: "Terrasoft.DashboardViewConfig",

			/**
			 * Name of view generator.
			 * @type {String}
			 */
			viewGeneratorClass: "Terrasoft.ViewGenerator",

			/**
			 * ReloadDashboard handler.
			 * @protected
			 * @virtual
			 * @return {boolean} Return true.
			 */
			onReloadDashboard: function() {
				if (this.view && !this.view.destroyed) {
					this.view.destroy();
				}
				this.view = null;
				if (this.viewModel && !this.viewModel.destroyed) {
					this.viewModel.destroy();
				}
				this.viewModel = null;
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
							if (!this.destroyed && this.renderContainer) {
								this.render(this.renderContainer);
							}
						}, this);
					}, this);
				}, this);

				return true;
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseSchemaModule#render
			 * @overridden
			 */
			render: function(renderTo) {
				this.callParent(arguments);
				this.renderContainer = renderTo;
			},

			/**
			 * Create instance of Terrasoft.ViewGenerator.
			 * @return {Terrasoft.ViewGenerator} Return instance of Terrasoft.ViewGenerator.
			 */
			createViewGenerator: function() {
				return this.Ext.create(this.viewGeneratorClass);
			},

			/**
			 * Create nested module view configuration.
			 * @protected
			 * @virtual
			 * param {Object} config Configuration object.
			 * param {Function} callback Callback function.
			 * param {Terrasoft.BaseModel} scope Callback function context.
			 * @return {Object[]} Return nested module view configuration.
			 */
			buildView: function(config, callback, scope) {
				var viewGenerator = this.createViewGenerator();
				var viewClass = this.Ext.create(this.viewConfigClassName);
				var schema = {
					viewConfig: viewClass.generate(config.dashboards)
				};
				var viewConfig = Ext.apply({
					schema: schema
				}, config);
				viewGenerator.generate(viewConfig, callback, scope);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#initViewConfig
			 * @overridden
			 */
			initViewConfig: function(callback, scope) {
				var generatorConfig = Terrasoft.deepClone(this.moduleConfig);
				generatorConfig.viewModelClass = this.viewModelClass;
				generatorConfig.dashboards = this.dashboards;
				this.buildView(generatorConfig, function(view) {
					this.viewConfig = view[0];
					callback.call(scope);
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#initViewModelClass
			 * @overridden
			 */
			initViewModelClass: function(callback, scope) {
				this.requireDashboards(this.moduleConfig, function(dashboards) {
					this.dashboards = dashboards;
					this.viewModelClass = Ext.ClassManager.get(this.viewModelClassName);
					callback.call(scope);
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#getViewModelConfig
			 * @overridden
			 */
			getViewModelConfig: function() {
				var config = this.callParent(arguments);
				config.values = Ext.apply({}, this.moduleConfig, {Dashboards: this.dashboards});
				return config;
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#init
			 * @overridden
			 */
			init: function() {
				if (!this.viewModel) {
					this.subscribeMessages();
					this.initConfig();
				}
				this.callParent(arguments);
			},

			/**
			 * Initialize configuration of module.
			 * @protected
			 * @virtual
			 */
			initConfig: function() {
				var sandbox = this.sandbox;
				this.moduleConfig = sandbox.publish("GetDashboardInfo", null, [sandbox.id]);
			},

			/**
			 * Subscribe for pearent messages.
			 * @protected
			 * @virtual
			 */
			subscribeMessages: function() {
				var sandbox = this.sandbox;
				sandbox.subscribe("ReloadDashboard", this.onReloadDashboard, this, [sandbox.id]);
			},

			/**
			 * Require dashboard items from manager.
			 * @protected
			 * @virtual
			 * param {Object} config Configuration object.
			 * param {String} config.dashboardId Dashboard uniqueidentifier.
			 * param {Function} callback Callback function.
			 * param {Terrasoft.BaseModel} scope Callback function context.
			 * @return {Terrasoft.Collection} Collection of dashboard items.
			 */
			requireDashboards: function(config, callback, scope) {
				Terrasoft.DashboardManager.initialize({}, function() {
					var dashboardCollection = Ext.create("Terrasoft.Collection");
					if (config && config.dashboardId) {
						var dashboard = Terrasoft.DashboardManager.getItem(config.dashboardId);
						dashboard.loadLazyPropertiesData(function() {
							dashboardCollection.add(dashboard.getId(), dashboard);
							callback.call(scope, dashboardCollection);
						}, this);
						return;
					}
					Terrasoft.DashboardManager.createItem(null, function(dashboard) {
						dashboardCollection.add(dashboard.getId(), dashboard);
						callback.call(scope, dashboardCollection);
					}, this);
				}, this);
			}
		});
		return Terrasoft.DashboardModule;
	});


