Terrasoft.configuration.Structures["BaseFolderManager"] = {innerHierarchyStack: ["BaseFolderManager"]};
define("BaseFolderManager", ["ext-base", "terrasoft", "sandbox", "BaseFolderManagerResources",
	"BaseFolderManagerViewModel", "FolderManagerViewModelConfigGenerator", "css!BaseFolderManager"
], function(Ext, Terrasoft, sandbox, resources) {

	return Ext.define("Terrasoft.BaseFolderManager", {
		extend: "Terrasoft.BaseModule",
		sandbox: sandbox,
		Ext: Ext,
		Terrasoft: Terrasoft,

		_config: null,
		_renderTo: null,
		viewModel: null,
		view: null,

		constructor: function() {
			this.callParent(arguments);
			this._config = this._config || {};
		},

		init: function() {
			this._config = this.sandbox.publish("FolderInfo", null, [this.sandbox.id]);
			this._config.enableMultiSelect = true;
			if (this._config.currentFilter) {
				this._config.selectedFolders = [this._config.currentFilter];
				this._config.currentFilter = null;
				this._config.multiSelect = true;
			}
			this._config.allFoldersRecordItem = {
				value: Terrasoft.GUID_EMPTY,
				displayValue: resources.localizableStrings.AllFoldersCaption
			};
			this._config.favoriteRootRecordItem = {
				value: Terrasoft.generateGUID(),
				displayValue: resources.localizableStrings.FavoriteFoldersCaption
			};
		},

		render: function(renderTo) {
			var self = this;
			self._renderTo = renderTo;
			if (self._config.entitySchema) {
				self.initializeModule();
			} else {
				self.loadEntitySchema();
			}
		},

		loadEntitySchema: function(callback, scope) {
			var self = this;
			self.sandbox.requireModuleDescriptors([self._config.entitySchemaName], function() {
				require([self._config.entitySchemaName], function(schema) {
					self._config.entitySchema = schema;
					self.initializeModule();
					Ext.callback(callback, scope);
				});
			});
		},

		/**
		 * Cleans up all captured resources.
		 */
		destroy: function() {
			if (this.viewModel && !this.viewModel.destroyed) {
				this.viewModel.destroy();
				this.viewModel = null;
			}
		},

		initializeModule: function(callback, scope) {
			// TODO: #CRM-34792 should be refactored
			var self = this;
			require([self._config.folderFilterViewId, self._config.folderFilterViewModelId], function(FilterView,
					FolderManagerViewModel) {
				var folderManagerViewConfigGenerator = Ext.isObject(FilterView) ? FilterView : new FilterView();
				folderManagerViewConfigGenerator.sandbox = self.sandbox;
				var folderManagerViewModelConfigGenerator = Ext.isObject(FolderManagerViewModel)
						? FolderManagerViewModel
						: new FolderManagerViewModel();
				folderManagerViewModelConfigGenerator.sandbox = self.sandbox;
				folderManagerViewModelConfigGenerator.renderTo = self._renderTo;
				if (!self.viewModel) {
					var viewModelClassName = self._config.folderManagerViewModelClassName;
					var viewModelConfig = folderManagerViewModelConfigGenerator.generate(self.sandbox, self._config);
					self.viewModel = Ext.create(viewModelClassName, viewModelConfig);
					var sectionFilterModuleId = self.sandbox.publish("GetSectionFilterModuleId");
					self.sandbox.publish("UpdateCustomFilterMenu", {
						"isExtendedModeHidden": true,
						"isFoldersHidden": false,
						"clearActiveFolder": true
					}, [sectionFilterModuleId]);
					self.viewModel.init();
				}
				var viewConfig = folderManagerViewConfigGenerator.generate(self.sandbox);
				self.view = Ext.create("Terrasoft.Container", viewConfig);
				self.view.bind(self.viewModel);
				var sectionSchema = self._config.sectionEntitySchema;
				if (sectionSchema) {
					var currentModule = Terrasoft.configuration.ModuleStructure[sectionSchema.name];
					if (currentModule) {
						var headerName = Ext.String.format("{0} {1}",
								resources.localizableStrings.StaticCaptionPartHeaderGroup, currentModule.moduleCaption);
						self.viewModel.set("groupPageCaption", headerName);
					}
				}
				self.view.render(self._renderTo);
				self.sandbox.subscribe("AddFolderActionFired", function(config) {
					if (config.type === "generalFolder") {
						self.viewModel.addGeneralFolderButton();
					} else if (config.type === "searchFolder") {
						self.viewModel.addSearchFolderButton();
					}
				});
				Ext.callback(callback, scope);
			});
		}
	});
});


