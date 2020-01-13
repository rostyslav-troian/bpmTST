Terrasoft.configuration.Structures["ProductSelectionModule"] = {innerHierarchyStack: ["ProductSelectionModule"]};
define("ProductSelectionModule", ["ProductSelectionModuleResources", "ProductSelectionView",
	"ProductSelectionViewModel", "MaskHelper", "BaseSchemaModuleV2"],
	function(resources, moduleView, moduleViewModel, MaskHelper) {
		/**
		 * @class Terrasoft.configuration.ProductSelectionModule
		 * ##### ProductSelectionModule ############ ### ######## ###### ###### #########
		 */
		Ext.define("Terrasoft.configuration.ProductSelectionModule", {
			alternateClassName: "Terrasoft.ProductSelectionModule",
			extend: "Terrasoft.BaseSchemaModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * ######### ### ######### #####
			 * @private
			 * @type {Object}
			 */
			config: null,

			/**
			 * ######## ######### ### #########
			 * @private
			 * @type {Object}
			 */
			container: null,

			/**
			 * ######## ###### ######### ######
			 * @protected
			 * @type {Object}
			 */
			messages: null,

			/**
			 * ###### ############# ######### #####
			 * @private
			 * @type {Object}
			 */
			viewModel: null,

			/**
			 * ############# ###### ######### #####
			 * @private
			 * @type {Object}
			 */
			view: null,

			/**
			 * ############# ######.
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ####### ###### ####### ######### ######.
			 */
			init: function(callback, scope) {
				MaskHelper.ShowBodyMask();
				this.registerMessages();
				this.config = this.sandbox.publish("ProductSelectionInfo", null, [this.sandbox.id]) || {};
				this.sandbox.requireModuleDescriptors(["Product"], function() {
					this.Terrasoft.require(["Product"], function(schema) {
						this.config.EntitySchema = schema;
						Terrasoft.SysSettings.querySysSettingsItem("BasePriceList",
							function(value) {
								this.config.BasePriceList = value;
								if (callback) {
									callback.call(scope || this);
								}
							}, this);
					}, this);
				}, this);
			},

			/**
			 * ######### ############ ######### ######
			 * @protected
			 */
			registerMessages: function() {
				var messages = {
					"ProductSelectionSave": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					"ProductSelectionInfo": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					"BackHistoryState": {
						mode: Terrasoft.MessageMode.BROADCAST,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					"FolderInfo": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					"ShowFolderManager": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					"ResultFolderFilter": {
						mode: Terrasoft.MessageMode.BROADCAST,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					"UpdateCatalogueFilter": {
						mode: Terrasoft.MessageMode.BROADCAST,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					"QuickSearchFilterInfo": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					"UpdateQuickSearchFilter": {
						mode: Terrasoft.MessageMode.BROADCAST,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					"UpdateQuickSearchFilterString": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					"ChangeDataView": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				};
				this.sandbox.registerMessages(messages);
			},

			/**
			 * ############ ############# ###### ######### #####.
			 * @param {Ext.Element} renderTo.
			 */
			render: function(renderTo) {
				this.container = renderTo;
				this.initializeModule();
			},

			/**
			 * ############## ###### ############# ###### ###### #########
			 * @protected
			 */
			initializeModule: function() {
				MaskHelper.ShowBodyMask();
				if (!this.viewModel) {
					var viewModelConfig = moduleViewModel.generate(this.sandbox, this.Terrasoft, this.Ext, this.config);
					var classConfig = {
						extend: "Terrasoft.BaseViewModel",
						alternateClassName: "Terrasoft.ProductSelectionViewModel",
						mixins: viewModelConfig.mixins,
						properties: viewModelConfig.properties
					};
					this.Ext.merge(classConfig, viewModelConfig.properties);
					delete viewModelConfig.mixins;
					this.Ext.define("Terrasoft.configuration.ProductSelectionViewModel", classConfig);
					this.viewModel = this.Ext.create("Terrasoft.configuration.ProductSelectionViewModel",
						viewModelConfig);
					this.viewModel.init(this.config);
				}
				var viewConfig = moduleView.generate();
				this.view = this.Ext.create("Terrasoft.Container", viewConfig);
				this.view.bind(this.viewModel);
				this.view.render(this.container);
				this.loadModules();
			},

			/**
			 * ######### ######
			 * @protected
			 */
			loadModules: function() {
				this.viewModel.loadFolderManager("foldersContainer");
				this.viewModel.loadQuickSearchModule("searchContainer");
			},

			/**
			 * ####### ### ######## ## ####### # ########## ######.
			 * @overridden
			 * @param {Object} config ######### ########### ######
			 */
			destroy: function(config) {
				if (config.keepAlive !== true) {
					if (this.viewModel) {
						this.viewModel.unRegisterMessages();
						this.viewModel = null;
					}
					this.callParent(arguments);
				}
			}
		});
		return Terrasoft.ProductSelectionModule;
	});


