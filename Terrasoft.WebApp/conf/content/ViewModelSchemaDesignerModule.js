Terrasoft.configuration.Structures["ViewModelSchemaDesignerModule"] = {innerHierarchyStack: ["ViewModelSchemaDesignerModule"]};
define("ViewModelSchemaDesignerModule", [
	"MaskHelper",
	"BaseSchemaModuleV2",
	"ViewModelSchemaDesignerBuilder",
	"AdditionalDiffUtilities"
], function() {
	/**
	 * Class of module of clients schema designer.
	 */
	Ext.define("Terrasoft.configuration.ViewModelSchemaDesignerModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.ViewModelSchemaDesignerModule",

		mixins: {
			AdditionalDiffUtilities: "Terrasoft.AdditionalDiffUtilities"
		},

		/**
		 * Custom View.
		 * @type {Terrasoft.Component}
		 */
		designerView: null,

		/**
		 * Object module configuration.
		 * @type {Object}
		 */
		moduleConfig: null,

		/**
		 * Render status of module.
		 * @private
		 * @type {Boolean}
		 */
		isRendered: false,

		/**
		 * Mask element selector.
		 * @type {String}
		 */
		maskSelector: null,

		messages: {
			/**
			 * @message GetPackageUId
			 * Gets current package UId.
			 */
			"GetPackageUId": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},
			"GetHistoryState": {
				direction: this.Terrasoft.MessageDirectionType.PUBLISH,
				mode: this.Terrasoft.MessageMode.PTP
			},
			"ReplaceHistoryState": {
				direction: this.Terrasoft.MessageDirectionType.PUBLISH,
				mode: this.Terrasoft.MessageMode.BROADCAST
			},
			"LookupInfo": {
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE,
				mode: this.Terrasoft.MessageMode.PTP
			},
			"ResultSelectedRows": {
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE,
				mode: this.Terrasoft.MessageMode.PTP
			},
			"BackHistoryState": {
				direction: this.Terrasoft.MessageDirectionType.PUBLISH,
				mode: this.Terrasoft.MessageMode.BROADCAST
			},
			"GetDetailInfo": {
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE,
				mode: this.Terrasoft.MessageMode.PTP
			},
			"InitDataViews": {
				direction: this.Terrasoft.MessageDirectionType.PUBLISH,
				mode: this.Terrasoft.MessageMode.PTP
			},
			"InitContextHelp": {
				direction: this.Terrasoft.MessageDirectionType.PUBLISH,
				mode: this.Terrasoft.MessageMode.PTP
			},
			"getCardInfo": {
				direction: this.Terrasoft.MessageDirectionType.PUBLISH,
				mode: this.Terrasoft.MessageMode.PTP
			},
			"RerenderDetail": {
				direction: this.Terrasoft.MessageDirectionType.PUBLISH,
				mode: this.Terrasoft.MessageMode.PTP
			},
			"CardModuleResponse": {
				direction: this.Terrasoft.MessageDirectionType.PUBLISH,
				mode: this.Terrasoft.MessageMode.PTP
			},
			"PushHistoryState": {
				direction: this.Terrasoft.MessageDirectionType.PUBLISH,
				mode: this.Terrasoft.MessageMode.BROADCAST
			},
			"GetModuleConfigResult": {
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE,
				mode: this.Terrasoft.MessageMode.PTP
			},
			"GetModuleConfig": {
				direction: this.Terrasoft.MessageDirectionType.PUBLISH,
				mode: this.Terrasoft.MessageMode.PTP
			},
			"UpdatePageHeaderCaption": {
				direction: this.Terrasoft.MessageDirectionType.PUBLISH,
				mode: this.Terrasoft.MessageMode.PTP
			}
		},

		/**
		 * Initialize configuration of client schema module and schema entity.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 */
		initModuleConfig: function(callback, scope) {
			Terrasoft.MaskHelper.showBodyMask({
				selector: this.maskSelector,
				timeout: 0
			});
			var sandbox = this.sandbox;
			sandbox.subscribe("GetModuleConfigResult", function(moduleConfig) {
				this.moduleConfig = moduleConfig;
				var clientUnitSchema = moduleConfig.clientUnitSchema;
				var clientUnitSchemaName = clientUnitSchema.name;
				Terrasoft.require([clientUnitSchemaName], function() {
					callback.call(scope);
				}, this);
			}, this, [sandbox.id]);
			sandbox.publish("GetModuleConfig", null, [sandbox.id]);
		},

		/**
		 * Initialize the state, name of schema, generate the class of view model and view.
		 * After that creates and initialize copy of view.
		 * @override
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 */
		init: function(callback, scope) {
			this.isRendered = false;
			this.registerMessages();
			if (!this.moduleConfig) {
				this.initModuleConfig(function() {
					this.init(callback, scope);
				}, this);
				return;
			}
			this.callParent([
				function() {
					this.viewModel.on("schemaChanged", this.updateView, this);
					callback.call(scope);
				},
				this
			]);
		},

		/**
		 * Registers sandbox messages.
		 * @protected
		 */
		registerMessages: function() {
			this.sandbox.registerMessages(this.messages);
		},

		/**
		 * Un-registers sandbox messages.
		 * @protected
		 */
		unRegisterMessages: function() {
			this.sandbox.unRegisterMessages(this.messages);
		},

		/**
		 * Initialize schemas name.
		 * @protected
		 */
		initSchemaName: function() {
			if (this.moduleConfig && this.moduleConfig.clientUnitSchema) {
				this.schemaName = this.moduleConfig.clientUnitSchema.getSchemaDefinitionName();
			} else {
				this.callParent(arguments);
			}
		},

		/**
		 * Validate client schema which was initialized with module.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 */
		validateClientUnitSchema: function(callback, scope) {
			var result = {success: true};
			var clientUnitSchema = this.moduleConfig && this.moduleConfig.clientUnitSchema;
			if (clientUnitSchema) {
				result = clientUnitSchema.validateSchema(callback, scope);
				return;
			}
			callback.call(scope, result);
		},

		/**
		 * Create schema builder.
		 * @protected
		 * @return {Terrasoft.ViewModelSchemaDesignerBuilder}
		 */
		createSchemaBuilder: function() {
			return new Terrasoft.ViewModelSchemaDesignerBuilder();
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#getSchemaBuilderConfig
		 * @override
		 */
		getSchemaBuilderConfig: function() {
			var result = this.callParent(arguments);
			var packageUId = this.sandbox.publish("GetPackageUId", null, [this.sandbox.id]);
			return Ext.apply(result, {
				useCache: false,
				packageUId: packageUId
			});
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#generateSchemaStructure
		 * @protected
		 * @override
		 */
		generateSchemaStructure: function(callback, scope) {
			this.schemaBuilder = this.createSchemaBuilder();
			var config = this.getSchemaBuilderConfig();
			this.validateClientUnitSchema(function(validationResult) {
				if (!validationResult.success) {
					Ext.apply(config, {
						isValid: validationResult.success,
						message: validationResult.message
					});
				}
				this.schemaBuilder.build(config, function(viewModelClass, viewConfig) {
					callback.call(scope, viewModelClass, viewConfig);
				}, this);
			}, this);
		},

		/**
		 * Returns root schema item name.
		 * @protected
		 * @return {String}
		 */
		getRootSchemaItem: function() {
			return "CardContentWrapper";
		},

		/**
		 * Updates the SchemaView in accordance with a set of operations.
		 * @param {Object[]} operation Set of operations.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope The context in which the callback function is called.
		 */
		updateSchemaViewConfig: function(operation, callback, scope) {
			this.schemaBuilder = this.createSchemaBuilder();
			var schema = this.viewModel.get("SchemaView");
			if (!Ext.isEmpty(operation)) {
				var diff = Ext.isArray(operation) ? operation : [operation];
				schema = this.schemaBuilder.applyViewDiff(schema, diff);
				this.viewModel.set("SchemaView", schema);
			}
			var rootSchemaItem = this.getRootSchemaItem();
			schema = schema.filter(function(x) {
				return x.name === rootSchemaItem;
			});
			var config = {
				schema: {viewConfig: schema},
				viewModelClass: this.viewModelClass
			};
			this.schemaBuilder.viewGenerator = this.schemaBuilder.createDesignViewGenerator();
			this.schemaBuilder.generateView(config, function(viewConfig) {
				if (callback) {
					callback.call(scope, viewConfig);
				}
			}, this);
		},

		/**
		 * Updates the current view in accordance with a set of operations.
		 * @param {Object[]} operation Set of operations.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope The context in which the callback function is called.
		 */
		updateView: function(operation, callback, scope) {
			this.Terrasoft.chain(
				function(next) {
					this.viewModel.set("ViewScrollTop", this.Terrasoft.getTopScroll());
					this.updateSchemaViewConfig(operation, next, this);
				},
				function(next, viewConfig) {
					if (Ext.isEmpty(this.getRenderTo()) || !this.isRendered) {
						next();
					} else {
						if (this.designerView && !this.designerView.destroyed) {
							this.designerView.destroy();
							this.designerView = null;
						}
						const rootItem = viewConfig[0];
						const className = rootItem.className || "Terrasoft.Container";
						this.designerView = this.Ext.create(className, rootItem);
						this.designerView.bind(this.viewModel);
						this.renderView(this.designerView);
						this.Terrasoft.setTopScroll(this.viewModel.get("ViewScrollTop"));
						next();
					}
				},
				function() {
					if (callback) {
						callback.call(scope);
					}
				},
				this
			);
		},

		/**
		 * Render view.
		 * @param {Terrasoft.Container} view.
		 */
		renderView: function(view) {
			var renderTo = this.getRenderTo();
			view.render(renderTo);
		},

		/**
		 * Returns schemaViewContainer object.
		 * @return {Object} Schema view container.
		 */
		getRenderTo: function() {
			var schemaViewContainer = this.viewModel.get("SchemaViewContainer");
			return Ext.get(schemaViewContainer);
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#render
		 * @override
		 */
		render: function() {
			this.isRendered = true;
			this.callParent(arguments);
			Terrasoft.MaskHelper.hideBodyMask({selector: this.maskSelector});
			this.updateView();
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#getAdditionalDiff
		 * @override
		 */
		getAdditionalDiff: function() {
			return this.mixins.AdditionalDiffUtilities.getAdditionalDiff.apply(this, arguments);
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#destroy
		 * @protected
		 * @override
		 */
		destroy: function() {
			if (this.viewModel) {
				this.viewModel.un("schemaChanged", this.updateView, this);
			}
			this.unRegisterMessages();
			this.callParent(arguments);
		}
	});
	return Terrasoft.ViewModelSchemaDesignerModule;
});


