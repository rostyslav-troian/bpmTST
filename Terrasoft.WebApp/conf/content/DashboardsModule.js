Terrasoft.configuration.Structures["DashboardsModule"] = {innerHierarchyStack: ["DashboardsModule"]};
define("DashboardsModule", ["BaseSchemaModuleV2", "DashboardBuilder"],
	function() {

		/**
		 * @class Terrasoft.configuration.DashboardModule
		 * ##### ########### ###### ######.
		 */
		return Ext.define("Terrasoft.configuration.DashboardsModule", {
			extend: "Terrasoft.BaseSchemaModule",
			alternateClassName: "Terrasoft.DashboardsModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			messages: {
				/**
				 * @message NeedHeaderCaption
				 * Gets header parameters request.
				 */
				"NeedHeaderCaption": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.BIDIRECTIONAL
				},

				/**
				 * @message ContextHelpModuleLoaded
				 * Notify about the ContextHelpModule is loaded.
				 */
				"ContextHelpModuleLoaded": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},

			viewModelClassName: "Terrasoft.BaseDashboardsViewModel",

			builderClassName: "Terrasoft.DashboardBuilder",

			viewConfigClass: "Terrasoft.DashboardsViewConfig",

			/**
			 * ########## #### ####### ### ###### ######.
			 * @overridden
			 * @protected
			 * @return {String} ######### #### ####### ### ###### ######.
			 */
			getProfileKey: function() {
				return "DashboardId";
			},

			/**
			 * ####### ############# ##### ##### ######.
			 * @overridden
			 * @protected
			 */
			initSchemaName: Terrasoft.emptyFn,

			/**
			 * @private
			 */
			createDashboardProfileKey: function() {
				const historyState = this.sandbox.publish("GetHistoryState");
				const keyTpl = "Dashboards_{0}_{1}";
				const key = Ext.String.format(keyTpl, historyState.hash.moduleName, historyState.hash.entityName);
				return key;
			},

			/**
			 * Returns dashboard section id.
			 * @protected
			 * @virtual
			 * @return {String} Dashboard section id.
			 */
			getDashboardSectionId: function() {
				return Terrasoft.configuration.ModuleStructure.Dashboard.moduleId;
			},

			/**
			 * @private
			 */
			getDashboardSchemaBuilderConfig: function() {
				return {
					sectionId: this.getDashboardSectionId(),
					dashboardProfileKey: this.createDashboardProfileKey()
				};
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseSchemaModule#generateSchemaStructure
			 * @overridden
			 */
			generateSchemaStructure: function(callback, scope) {
				const builder = Ext.create(this.builderClassName, {
					viewModelClass: this.viewModelClassName,
					viewConfigClass: this.viewConfigClass
				});
				const config = this.getDashboardSchemaBuilderConfig();
				builder.build(config, function(viewModelClass, view) {
					callback.call(scope, viewModelClass, view);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#destroy
			 * @overridden
			 */
			destroy: function() {
				this.callParent(arguments);
				this.sandbox.unRegisterMessages(this.messages);
				this.renderContainer = null;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.sandbox.registerMessages(this.messages);
				this.sandbox.subscribe("NeedHeaderCaption", function() {
					if (this.viewModel && this.viewModel.initHeader) {
						this.viewModel.initHeader();
					}
				}, this);
			}

		});

	});


