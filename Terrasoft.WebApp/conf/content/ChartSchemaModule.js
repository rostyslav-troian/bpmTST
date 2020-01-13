Terrasoft.configuration.Structures["ChartSchemaModule"] = {innerHierarchyStack: ["ChartSchemaModule"]};
define("ChartSchemaModule", ["ext-base", "ChartModule", "SchemaBuilderV2", "ViewModelGeneratorV2"],
	function(Ext) {
		/**
		 * @class Terrasoft.configuration.ChartSchemaModule
		 * Base module for chart generated from schema.
		 */
		Ext.define("Terrasoft.configuration.ChartSchemaModule", {
			extend: "Terrasoft.ChartModule",
			alternateClassName: "Terrasoft.ChartSchemaModule",

			/**
			 * Instance of {Terrasoft.SchemaBuilder} for view and view model generation.
			 * @private
			 * @type {Terrasoft.SchemaBuilder}
			 */
			schemaBuilder: null,

			/**
			 * Class of schema builder used for build module.
			 * @virtual
			 * @type {String}
			 */
			schemaBuilderClassName: "Terrasoft.SchemaBuilder",

			/**
			 * Schema name.
			 * @virtual
			 * @type {String}
			 */
			schemaName: null,

			/**
			 * Creates {Terrasoft.SchemaBuilder} instance for generation view and viewModel.
			 * @protected
			 * @virtual
			 * @return {Terrasoft.SchemaBuilder} Instance of hierarchy view and viewModel generator.
			 */
			getSchemaBuilder: function() {
				return this.schemaBuilder || (this.schemaBuilder = this.Ext.create(this.schemaBuilderClassName));
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#initViewModelClass
			 * @overridden
			 */
			initViewModelClass: function(callback, scope) {
				if (this.viewModelClass) {
					callback.call(scope);
					return;
				}
				var config = {
					schemaName: this.schemaName
				};
				var schemaBuilder = this.getSchemaBuilder();
				schemaBuilder.build(config, function(viewModelClass) {
					this.viewModelClass = viewModelClass;
					callback.call(scope);
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#initViewConfig
			 * @overridden
			 */
			initViewConfig: function() {
				var viewModel = this.viewModel || this.createViewModel();
				if (this.Ext.isFunction(viewModel.getViewConfigClassName)) {
					var customViewConfigClassName = viewModel.getViewConfigClassName();
					if (!this.Ext.isEmpty(customViewConfigClassName)) {
						this.viewConfigClassName = customViewConfigClassName;
					}
				}
				this.callParent(arguments);
			}
		});
	});


