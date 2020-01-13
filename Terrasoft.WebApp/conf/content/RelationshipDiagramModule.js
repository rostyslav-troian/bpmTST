Terrasoft.configuration.Structures["RelationshipDiagramModule"] = {innerHierarchyStack: ["RelationshipDiagramModule"]};
define("RelationshipDiagramModule", ["terrasoft", "ext-base", "ej-diagram", "RelationshipDiagramModuleResources",
		"BaseNestedModule", "RelationshipDiagramViewModel", "RelationshipDiagram"
	],
	function(Terrasoft, Ext) {

		/**
		 * @class Terrasoft.configuration.RelationshipDiagramViewConfig
		 * ##### ############ ############ ############# ###### ############.
		 */
		Ext.define("Terrasoft.configuration.RelationshipDiagramViewConfig", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.RelationshipDiagramViewConfig",

			/**
			 * ########## ############ ############# ###### ############.
			 * @protected
			 * @virtual
			 * @return {Object} ########## ############ ############# ###### ############.
			 */
			generate: function() {
				return {
					className: "Terrasoft.RelationshipDiagram",
					id: "relationship-diagram",
					itemType: Terrasoft.ViewItemType.MODULE,
					classes: {
						wrapClassName: ["diagram"]
					},
					items: {
						bindTo: "Nodes"
					}
				};
			}
		});

		/**
		 * @class Terrasoft.configuration.RelationshipDiagramModule
		 * ##### ########### ###### ############.
		 */
		Ext.define("Terrasoft.configuration.RelationshipDiagramModule", {
			extend: "Terrasoft.BaseNestedModule",
			alternateClassName: "Terrasoft.RelationshipDiagramModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,
			showMask: true,
			/**
			 * ### ###### ###### ############# ### ######.
			 * @type {String}
			 */
			viewModelClassName: "Terrasoft.RelationshipDiagramViewModel",

			/**
			 * ### ##### ########## ############ ############# ######.
			 * @type {String}
			 */
			viewConfigClassName: "Terrasoft.RelationshipDiagramViewConfig",

			/**
			 * ### ##### ########## #############.
			 * @type {String}
			 */
			viewGeneratorClass: "Terrasoft.ViewGenerator",

			/**
			 * ####### ########## ###### ############.
			 * @protected
			 * @virtual
			 * param {Object} config ############ ######## ### ########## ###### ############.
			 * @param {String} config.renderTo ### ########## ### ##########.
			 * @return {boolean} ########## true.
			 */
			onReloadRelationshipDiagram: function(config) {
				var viewModel = this.viewModel;
				if (viewModel) {
					var renderTo = config.renderTo ? Ext.get(config.renderTo) : this.renderToId;
					var view = this.view;
					if (view && !view.destroyed) {
						view.destroy();
					}
					this.view = view = null;
					this.initConfig();
					if (viewModel && !viewModel.destroyed) {
						viewModel.destroy();
					}
					this.viewModel = viewModel = null;
					this.initViewModelClass(function() {
						if (this.destroyed) {
							return;
						}
						this.initViewConfig(function() {
							if (this.destroyed) {
								return;
							}
							viewModel = this.viewModel = this.createViewModel();
							viewModel.init(function() {
								if (!this.destroyed && renderTo) {
									this.render(renderTo);
								}
							}, this);
						}, this);
					}, this);

					return true;
				}
			},

			/**
			 * @inheritDoc Terrasoft.BaseNestedModule#initViewConfig
			 * @overridden
			 */
			initViewConfig: function(callback, scope) {
				var generatorConfig = Terrasoft.deepClone(this.moduleConfig);
				generatorConfig.viewModelClass = this.viewModelClass;
				this.buildView(generatorConfig, function(view) {
					view[0].items = {
						bindTo: "Nodes"
					};
					this.viewConfig = view[0];
					callback.call(scope);
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.BaseNestedModule#init
			 * @overridden
			 */
			init: function() {
				if (!this.viewModel) {
					this.initConfig();
					this.subscribeMessages();
				}
				this.callParent(arguments);
			},

			/**
			 * @inheritDoc Terrasoft.BaseNestedModule#initViewModelClass
			 * @overridden
			 */
			initViewModelClass: function(callback, scope) {
				this.viewModelClass = Ext.ClassManager.get(this.viewModelClassName);
				callback.call(scope);
			},

			/**
			 * ####### ######### ###### Terrasoft.ViewGenerator.
			 * @protected
			 * @virtual
			 * @return {Terrasoft.ViewGenerator} ########## ###### Terrasoft.ViewGenerator.
			 */
			createViewGenerator: function() {
				return this.Ext.create(this.viewGeneratorClass);
			},

			/**
			 * @inheritdoc Terrasoft.BaseNestedModule#createViewModel
			 * @overridden
			 */
			createViewModel: function() {
				var viewModel = this.callParent(arguments);
				viewModel.set("AccountId", this.moduleConfig.accountId);
				return viewModel;
			},

			/**
			 * ####### ############ ############# ########## ######.
			 * @protected
			 * @virtual
			 * param {Object} config ###### ############.
			 * param {Function} callback ####### ######### ######.
			 * param {Terrasoft.BaseModel} scope ######## ########## ####### ######### ######.
			 * @return {Object[]} ########## ############ ############# ########## ######.
			 */
			buildView: function(config, callback, scope) {
				var viewGenerator = this.createViewGenerator();
				var viewClass = this.Ext.create(this.viewConfigClassName);
				var schema = {
					viewConfig: [viewClass.generate(config)]
				};
				var viewConfig = Ext.apply({
					schema: schema
				}, config);
				viewGenerator.generate(viewConfig, callback, scope);
			},

			/**
			 * ############## ###### ############ ######.
			 * @protected
			 * @virtual
			 */
			initConfig: function() {
				this.moduleConfig = {};
				var sandbox = this.sandbox;
				var moduleConfig = sandbox.publish("GetRelationshipDiagramInfo", null, [sandbox.id]);
				if (!this.Ext.isEmpty(moduleConfig)) {
					this.moduleConfig = moduleConfig;
				}
			},

			/**
			 * ############# ## #########.
			 * @protected
			 * @virtual
			 */
			subscribeMessages: function() {
				var sandbox = this.sandbox;
				sandbox.subscribe("ReloadRelationshipDiagram", this.onReloadRelationshipDiagram, this, [sandbox.id]);
			}

		});

		return Terrasoft.RelationshipDiagramModule;
	}
);


