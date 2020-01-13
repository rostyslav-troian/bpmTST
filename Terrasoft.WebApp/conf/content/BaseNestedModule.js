Terrasoft.configuration.Structures["BaseNestedModule"] = {innerHierarchyStack: ["BaseNestedModule"]};
define("BaseNestedModule", ["terrasoft", "ext-base", "BaseModule"],
	function(Terrasoft, Ext) {

		/**
		 * Basic visual class of the nested module.
		 */
		Ext.define("Terrasoft.configuration.BaseNestedModule", {
			extend: "Terrasoft.BaseModule",
			alternateClassName: "Terrasoft.BaseNestedModule",

			/**
			 * ####### ############# ######.
			 * @type {Boolean}
			 */
			isAsync: true,

			/**
			 * ###### ############# ######.
			 * @type {Terrasoft.Component}
			 */
			view: null,

			/**
			 * ##### ###### #############.
			 * @type {String}
			 */
			viewModelClass: null,

			/**
			 * ###### ###### ############# ######.
			 * @type {Terrasoft.BaseModel}
			 */
			viewModel: null,

			/**
			 * ###### ############ ############# ######.
			 * @type {Object}
			 */
			viewConfig: null,

			/**
			 * ####### ############# ### ########## ######.
			 * @protected
			 * @virtual
			 * @return {Terrasoft.Component} ########## ######### ############# ### ########## ######.
			 */
			createView: function() {
				var viewConfig = Terrasoft.deepClone(this.viewConfig);
				var containerClassName = viewConfig.className || "Terrasoft.Container";
				return this.Ext.create(containerClassName, viewConfig);
			},

			/**
			 * ####### ###### ############# ### ########## ######.
			 * @protected
			 * @virtual
			 * @return {Terrasoft.BaseModel} ########## ######### ###### ############# ### ########## ######.
			 */
			createViewModel: function() {
				return this.Ext.create(this.viewModelClass, this.getViewModelConfig());
			},

			/**
			 * ########## ######### ### ######## ###### ############# ######.
			 * @protected
			 * @virtual
			 * @return {Object} ########## ######### ### ######## ###### ############# ######.
			 */
			getViewModelConfig: function() {
				return {
					Ext: this.Ext,
					sandbox: this.sandbox,
					Terrasoft: this.Terrasoft
				};
			},

			/**
			 * ############## ###### ############ ############# ######.
			 * @protected
			 * @abstract
			 * @param {Function} callback #######, ####### ##### ####### ## ##########.
			 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
			 */
			initViewConfig: Terrasoft.abstractFn,

			/**
			 * ############## ##### ###### ############# ######.
			 * @protected
			 * @abstract
			 * @param {Function} callback #######, ####### ##### ####### ## ##########.
			 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
			 */
			initViewModelClass: Terrasoft.abstractFn,

			/**
			 * ############## ######### ######## ######.
			 * @protected
			 * @virtual
			 * @param {Function} callback #######, ####### ##### ####### ## ##########.
			 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
			 */
			init: function(callback, scope) {
				this.callParent(arguments);
				callback = callback || Ext.emptyFn;
				if (this.viewModel) {
					this.viewModel.set("Restored", true);
					callback.call(scope);
					return;
				}
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
							if (!this.destroyed) {
								callback.call(scope);
							}
						}, this);
					}, this);
				}, this);
			},

			/**
			 * ######### ######### ######.
			 * @protected
			 * @virtual
			 * @param {Object} renderTo ######### ###### ## Ext.Element # ####### ##### ########### ####### ##########.
			 */
			render: function(renderTo) {
				this.callParent(arguments);
				var viewModel = this.viewModel;
				var view = this.view;
				if (!view || view.destroyed) {
					view = this.view = this.createView();
					view.bind(viewModel);
					view.render(renderTo);
				} else {
					view.reRender(0, renderTo);
				}
				viewModel.renderTo = renderTo.id;
				viewModel.onRender();
			},

			/**
			 * ####### ### ######## ## ####### # ########## ######.
			 * @overridden
			 * @param {Object} config ######### ########### ######
			 */
			destroy: function(config) {
				const keepAlive = config && config.keepAlive === true;
				if (!keepAlive) {
					Terrasoft.clearProperty(this, "viewModel");
					this.callParent(arguments);
				}
			}
		});
	});


