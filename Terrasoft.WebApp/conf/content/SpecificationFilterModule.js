Terrasoft.configuration.Structures["SpecificationFilterModule"] = {innerHierarchyStack: ["SpecificationFilterModule"], structureParent: "BaseSchemaModuleV2"};
define("SpecificationFilterModule", ["SpecificationFilterModuleResources", "BaseSchemaModuleV2"],
	function() {
		/**
		 * @class Terrasoft.configuration.SpecificationFilterModule
		 * ##### SpecificationFilterModule ############ ### ######## ###### ########### ########## #############
		 */
		Ext.define("Terrasoft.configuration.SpecificationFilterModule", {
			alternateClassName: "Terrasoft.SpecificationFilterModule",
			extend: "Terrasoft.BaseSchemaModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * ######### ### ###### ########### ########## #############
			 * @private
			 * @type {Object}
			 */
			config: {},

			/**
			 * ######## ######### ### #########
			 * @private
			 * @type {Object}
			 */
			container: null,

			/**
			 * ###### ############# ###### ########### ########## #############
			 * @private
			 * @type {Object}
			 */
			viewModel: null,

			/**
			 * ############# ###### ###### ########### ########## #############
			 * @private
			 * @type {Object}
			 */
			view: null,

			/**
			 * ############ ############# ###### ########### ########## #############
			 * @private
			 * @type {Object}
			 */
			SpecificationFilterView: null,

			/**
			 * ############ ###### ############# ###### ########### ########## #############
			 * @private
			 * @type {Object}
			 */
			SpecificationFilterViewModel: null,

			/**
			 * ######### ######
			 */
			messages: {
				/**
				 * @message GetExtendCatalogueFilterInfo
				 * ######## ############ ######
				 * @return {Object} ############ ### ############# ######
				 */
				"GetExtendCatalogueFilterInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message CloseExtendCatalogueFilter
				 * ######## # ######## ###### ########### ########## #########
				 */
				"CloseExtendCatalogueFilter": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message UpdateExtendCatalogueFilter
				 * ######## # ######### #######
				 * @param {Object} ########## # ##### #######
				 */
				"UpdateExtendCatalogueFilter": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},

			/**
			 * ########### #########
			 * @protected
			 */
			registerMessages: function() {
				this.sandbox.registerMessages(this.messages);
			},

			/**
			 * ############## ###### ########### ########## #############
			 * @param {Function} callback
			 * @param {Object} scope
			 */
			init: function(callback, scope) {
				callback = callback || function() {};
				this.registerMessages();
				this.config = this.sandbox.publish("GetExtendCatalogueFilterInfo", null, [this.sandbox.id]);
				if (this.viewModel) {
					this.viewModel.set("Restored", true);
					callback.call(scope);
					return;
				}
				if (!this.config.specificationFilterViewId) {
					this.config.specificationFilterViewId = "SpecificationFilterView";
				}
				if (!this.config.specificationFilterViewModelId) {
					this.config.specificationFilterViewModelId = "SpecificationFilterViewModel";
				}
				if (!this.config.specificationFilterSchemaName) {
					this.config.specificationFilterSchemaName = "Product";
				}
				this.Terrasoft.require([this.config.specificationFilterViewId,
					this.config.specificationFilterViewModelId, this.config.specificationFilterSchemaName],
					function(filterView, filterViewModel, productSchema) {
						this.config.ProductSchema = productSchema;
						this.SpecificationFilterView = filterView;
						this.SpecificationFilterView.sandbox = this.sandbox;
						this.SpecificationFilterViewModel = filterViewModel;
						this.SpecificationFilterViewModel.sandbox = this.sandbox;
						this.SpecificationFilterViewModel.renderTo = this.container;
						if (!this.viewModel) {
							var viewModelConfig = this.SpecificationFilterViewModel.generate(this.sandbox, this.config);
							this.viewModel = this.Ext.create("Terrasoft.BaseViewModel", viewModelConfig);
							this.viewModel.SpecificationFilterView = this.SpecificationFilterView;
							this.viewModel.init(this.config, function() {
								if (!this.destroyed) {
									callback.call(scope);
								}
							}, this);
						}
					}, this);
			},

			/**
			 * ############ ############# ###### ########### ########## #############
			 * @param {Object} renderTo
			 */
			render: function(renderTo) {
				this.container = renderTo;
				var viewModel = this.viewModel;
				var view = this.view;
				if (!view || view.destroyed) {
					view = this.view = this.SpecificationFilterView.generate();
					view.bind(viewModel);
					view.render(renderTo);
				} else {
					view.reRender(0, renderTo);
				}
				viewModel.renderTo = renderTo.id;
				if (!viewModel.get("Restored")) {
					viewModel.renderFilterElements();
				}
			},

			/**
			 * ####### ### ######## ## ####### # ########## ######.
			 * @overridden
			 * @param {Object} config ######### ########### ######
			 */
			destroy: function(config) {
				if (config.keepAlive !== true) {
					if (this.viewModel) {
						this.viewModel = null;
					}
					this.callParent(arguments);
				}
			}
		});
		return Terrasoft.SpecificationFilterModule;
	});


