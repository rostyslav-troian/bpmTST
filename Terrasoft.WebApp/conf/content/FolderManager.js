Terrasoft.configuration.Structures["FolderManager"] = {innerHierarchyStack: ["FolderManager"]};
define("FolderManager", [
	"FolderManagerResources", "ConfigurationConstants", "MaskHelper", "BaseSchemaModuleV2",
	"ProductCatalogueFolderManagerViewModel"
], function(resources, ConfigurationConstants, MaskHelper) {
	/**
	 * ##### FolderManager ############ ### ######## ###### #####
	 */
	Ext.define("Terrasoft.configuration.FolderManager", {
		alternateClassName: "Terrasoft.FolderManager",
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
		 * ############ ############# ######### #####
		 * @private
		 * @type {Object}
		 */
		FolderManagerView: null,

		/**
		 * ############ ###### ############# ######### #####
		 * @private
		 * @type {Object}
		 */
		FolderManagerViewModel: null,

		/**
		 * ######### ######
		 */
		messages: {
			/**
			 * @message FolderInfo
			 * ########### ############ ### ############# ###### #####
			 */
			"FolderInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message AddFolderActionFired
			 * ######### ########## ##### ######
			 */

			"AddFolderActionFired": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message UpdateFavoritesMenu
			 * ######### ########## #### #########
			 */
			"UpdateFavoritesMenu": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message ResultSelectedFolders
			 * ######### ###### ## ######### ######
			 */
			"ResultSelectedFolders": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message BackHistoryState
			 * ######### ######## ## ####### #########
			 */
			"BackHistoryState": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message PushHistoryState
			 * ######### ######### # ####### #########
			 */
			"PushHistoryState": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message CustomFilterExtendedMode
			 * ######### ############ #### ################ ##########
			 */
			"CustomFilterExtendedMode": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message UpdateCustomFilterMenu
			 * ######### ########## #### ################ ##########
			 */
			"UpdateCustomFilterMenu": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message GetRecordInfo
			 * ######### ########### ############ ######
			 */
			"GetRecordInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetHistoryState
			 * ######### ########### ####### ############ ####### ######### ######
			 */
			"GetHistoryState": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message HideFolderTree
			 * ######### ######## ###### #####
			 */
			"HideFolderTree": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message ResultFolderFilter
			 * ######### ########### ############## ######### ########
			 */
			"ResultFolderFilter": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message UpdateFilter
			 * ######### ######### ####### #####
			 */
			"UpdateFilter": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message LookupInfo
			 * ### ###### LookupUtilities
			 */
			"LookupInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message ResultSelectedRows
			 * ######### ########## ######### ######
			 */
			"ResultSelectedRows": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message UpdateCatalogueFilter
			 * ######### ######### ####### ########
			 */
			"UpdateCatalogueFilter": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message CloseExtendCatalogueFilter
			 * ######### ######## ###### ########### ########## #########
			 */
			"CloseExtendCatalogueFilter": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetExtendCatalogueFilterInfo
			 * ######### ########## ############ ### ###### ########### ########## #########
			 */
			"GetExtendCatalogueFilterInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message UpdateExtendCatalogueFilter
			 * ######### ######### ####### ###### ########### ########## #########
			 */
			"UpdateExtendCatalogueFilter": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},

		/**
		 * @private
		 */
		_setGroupPageCaption: function(sectionSchema) {
			if (sectionSchema) {
				var currentModule = this.Terrasoft.configuration.ModuleStructure[sectionSchema.name];
				if (currentModule) {
					var headerName = this.Ext.String.format("{0} {1}",
							resources.localizableStrings.StaticCaptionPartHeaderGroupV2, currentModule.moduleCaption);
					this.viewModel.set("GroupPageCaption", headerName);
				}
			}
		},

		/**
		 * @private
		 */
		_initViewModel: function() {
			if (!this.viewModel) {
				var viewModelConfig = this.FolderManagerViewModel.generate(this.sandbox, this.config);
				var className = this.config.folderManagerViewModelClassName ||
						"Terrasoft.BaseViewModel";
				this.viewModel = this.Ext.create(className, viewModelConfig);
				this.viewModel.init(this.config);
			} else {
				this.viewModel.resetFolderView();
			}
		},

		/**
		 * Registers mmessages in sandbox.
		 * @protected
		 */
		registerMessages: function() {
			this.sandbox.registerMessages(this.messages);
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#init
		 * @override
		 */
		init: function(callback, scope) {
			this.registerMessages();
			this.config = this.sandbox.publish("FolderInfo", null, [this.sandbox.id]);
			this.config.enableMultiSelect = true;
			if (this.config.currentFilter) {
				this.config.enableMultiSelect = true;
				this.config.selectedFolders = [this.config.currentFilter];
				this.config.currentFilter = null;
				this.config.multiSelect = true;
			}
			if (!this.config.folderFilterViewId) {
				this.config.folderFilterViewId = "FolderManagerView";
			}
			if (!this.config.folderFilterViewModelId) {
				this.config.folderFilterViewModelId = "FolderManagerViewModel";
			}
			this.config.allFoldersRecordItem = {
				value: Terrasoft.GUID_EMPTY,
				displayValue: resources.localizableStrings.AllFoldersCaptionV2
			};
			this.config.favoriteRootRecordItem = {
				value: Terrasoft.generateGUID(),
				displayValue: resources.localizableStrings.FavoriteFoldersCaptionV2
			};
			if (callback) {
				callback.call(scope || this);
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#render
		 * @override
		 */
		render: function(renderTo) {
			this.container = renderTo;
			if (this.config.entitySchema) {
				this.initializeModule();
			} else {
				this.sandbox.requireModuleDescriptors([this.config.entitySchemaName], function() {
					this.Terrasoft.require([this.config.entitySchemaName], function(schema) {
						this.config.entitySchema = schema;
						this.initializeModule();
					}, this);
				}, this);
			}
		},

		/**
		 * Initializes folder manager view model.
		 * @protected
		 */
		initializeModule: function() {
			this.Terrasoft.require([this.config.folderFilterViewId, this.config.folderFilterViewModelId],
					function(filterView, filterViewModel) {
						this.FolderManagerView = filterView;
						this.FolderManagerView.sandbox = this.sandbox;
						this.FolderManagerViewModel = filterViewModel;
						this.FolderManagerViewModel.sandbox = this.sandbox;
						this.FolderManagerViewModel.renderTo = this.container;
						this._initViewModel();
						var viewConfig = this.FolderManagerView.generate(this.sandbox);
						this.view = this.Ext.create("Terrasoft.Container", viewConfig);
						this.view.bind(this.viewModel);
						var sectionSchema = this.config.sectionEntitySchema;
						this._setGroupPageCaption(sectionSchema);
						this.view.render(this.container);
						MaskHelper.HideBodyMask();
						var activeRow = this.config.activeFolderId;
						this.viewModel.setActiveRow(activeRow);
						this.sandbox.subscribe("AddFolderActionFired", function(config) {
							if (config.type === "generalFolder") {
								this.viewModel.addGeneralFolderButton();
							} else if (config.type === "searchFolder") {
								this.viewModel.addSearchFolderButton();
							} else {
								this.warn("Not implemented");
							}
						}, this);
					}, this);
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#destroy
		 * @override
		 */
		destroy: function(config) {
			if (config.keepAlive !== true) {
				if (this.viewModel) {
					this.viewModel.destroy();
					this.viewModel = null;
				}
				this.callParent(arguments);
			}
		}
	});
	return Terrasoft.FolderManager;
});


