Terrasoft.configuration.Structures["QuickFilterModuleV2"] = {innerHierarchyStack: ["QuickFilterModuleV2"]};
define("QuickFilterModuleV2", ["LabelDateEdit", "performancecountermanager", "ConfigurationConstants",
		"BaseNestedModule", "ViewGeneratorV2", "QuickFilterViewV2", "BaseFilterViewModel", "FiltersContainerViewModel"],
	function(LabelDateEdit, performanceManager, ConfigurationConstants) {
		/**
		 * @class Terrasoft.configuration.QuickFilterModule
		 * Quick filter module class.
		 */
		Ext.define("Terrasoft.configuration.QuickFilterModule", {
			alternateClassName: "Terrasoft.QuickFilterModule",
			extend: "Terrasoft.BaseNestedModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * ####### ########### ##### ## ##### ######, #### ## ## ##### ########.
			 * @type {Boolean}
			 */
			showMask: true,

			/**
			 * ###### ############ ######.
			 * @type {Object}
			 */
			moduleConfig: null,

			/**
			 * Name of the class presentation model for the embedded module.
			 * @type {String}
			 */
			viewModelClassName: "Terrasoft.FiltersContainerViewModel",

			/**
			 * View generator class name.
			 * @type {String}
			 */
			viewGeneratorClass: "Terrasoft.ViewGenerator",

			/**
			 * ### ########## # ####### ########.
			 * @Type {Terrasoft.ComparisonType}
			 */
			stringColumnSearchComparisonType: Terrasoft.ComparisonType.START_WITH,

			/**
			 * ##### # ####### ######## ####### ######.
			 * @Type {Object}
			 */
			entitySchema: null,

			/**
			 * ######## ##### # ####### ######## ####### ######.
			 * @Type {String}
			 */
			entitySchemaName: null,

			/**
			 * Flag indicates folders tree filter.
			 * @Type {Boolean}
			 */
			useFolderFilter: null,

			/**
			 * ##### ##### # ####### ######## ####### ######.
			 * @Type {Object}
			 */
			folderEntitySchema: null,

			/**
			 * ##### ####### ############## ####### # ###### # ####### ######## ####### ######.
			 * @Type {Object}
			 */
			inFolderEntitySchema: null,

			/**
			 * #### ########### ####### #####.
			 * @Type {Boolean}
			 */
			useTagModule: true,

			/**
			 * ##### ####### ##### # ####### ######## ####### ######.
			 * @Type {Object}
			 */
			tagEntitySchema: null,

			/**
			 * ##### ####### ############## ####### # ##### # ####### ######## ####### ######.
			 * @Type {Object}
			 */
			inTagEntitySchema: null,

			/**
			 * ### ####### ####### # ##### ############## ####### # ######.
			 * @Type {String}
			 */
			entityColumnNameInFolderEntity: null,

			/**
			 * Default filter column name.
			 * @Type {String}
			 */
			filterDefaultColumnName: null,

			/**
			 * #### ########### ####### ### ########### ####.
			 * @Type {Boolean}
			 */
			isShortFilterVisible: false,

			/**
			 * Module messages.
			 * @type {Object}
			 */
			messages: {
				/**
				 * @message RerenderQuickFilterModule
				 * ########### ######
				 * @param {String|Object} ######### ### #########.
				 */
				"RerenderQuickFilterModule": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message GetFolderEntitiesNames
				 * ########### ##### #### #####.
				 */
				"GetFolderEntitiesNames": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message CloseCard
				 * Closes card.
				 */
				"CloseCard": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetShortFilterFieldsVisible
				 * ########### ####### ########### ##### ##### ###### ### #######.
				 */
				"GetShortFilterFieldsVisible": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message LoadedFiltersFromStorage
				 * Filters loaded from storage.
				 */
				"LoadedFiltersFromStorage": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message InitFilterFromStorage
				 * Init filters loaded from storage.
				 */
				"InitFilterFromStorage": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message UpdateExtendedFilterValues
				 * Updates extended filter values.
				 */
				"UpdateExtendedFilterValues": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message SetFolderFilter
				 * Sets current folder value to folder filter.
				 */
				"SetFolderFilter": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},

			/**
			 * ###### # ################ ###########.
			 * @type {Object}
			 */
			filtersViewItemsNames: null,

			/**
			 * Filters configuration.
			 * @type {Object}
			 */
			filtersConfig: null,

			/**
			 * Filters common configuration.
			 * @type {Object}
			 */
			filtersCommonConfig: null,

			/**
			 * Flag that indicates whether module is initialized.
			 * @type {Boolean}
			 */
			isInitialized: false,

			/**
			 * ############## ######### ######### ######## # ######.
			 * @protected
			 * @virtual
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ########.
			 */
			initSysSettingsValues: function(callback, scope) {
				this.Terrasoft.SysSettings.querySysSettings(["StringColumnSearchComparisonType"],
					function(sysSettings) {
						var value = sysSettings.StringColumnSearchComparisonType;
						if (!this.Ext.isEmpty(value)) {
							this.stringColumnSearchComparisonType = value;
						}
						callback.call(scope);
					}, this);
			},

			/**
			 * ########## ## ##### ########### ### ######### ######. ###### ###### #### ##### ###########.
			 * @param {String} moduleName ### ######.
			 * @return {Object} ######.
			 */
			getModule: function(moduleName) {
				var module = require(moduleName);
				if (this.Ext.isFunction(module)) {
					module = this.Ext.create(module);
				}
				return module;
			},

			/**
			 * ######### ### ########### ### ######### ###### ########.
			 * @protected
			 * @virtual
			 * @param {Function} callback #######, ####### ##### ####### ## ##########.
			 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
			 */
			initFiltersModules: function(callback, scope) {
				var modulesNames = [];
				Terrasoft.each(this.moduleConfig, function(typeConfig) {
					modulesNames.push(typeConfig.viewConfigModuleName, typeConfig.viewModelConfigModuleName);
				}, this);
				Terrasoft.require(modulesNames, callback, scope);
			},

			/**
			 * ########## ############ ############# ########.
			 * @protected
			 * @virtual
			 * @param {Object} config ############ ########.
			 * @return {Object} ############ ############# ########.
			 */
			generateViewConfig: function(config) {
				var viewConfig = {};
				Terrasoft.each(this.moduleConfig, function(typeConfig, typeName) {
					var configPropertyName = typeConfig.configPropertyName;
					var configPropertyValue = config[configPropertyName];
					if (configPropertyValue) {
						var module = this.getModule(typeConfig.viewConfigModuleName);
						viewConfig[typeName] = module.generate(configPropertyValue);
					}
				}, this);
				return viewConfig;
			},

			/**
			 * ########## ############ ####### ############# ########.
			 * @protected
			 * @virtual
			 * @param {Object} config ############ ########.
			 * @return {Object} ############ ####### ############# ########.
			 */
			generateFiltersViewModelsConfig: function(config) {
				var viewModelConfig = {};
				Terrasoft.each(this.moduleConfig, function(typeConfig, typeName) {
					var configPropertyName = typeConfig.configPropertyName;
					var configPropertyValue = config[configPropertyName];
					if (configPropertyValue) {
						var module = this.getModule(typeConfig.viewModelConfigModuleName);
						viewModelConfig[typeName] = module.generate(configPropertyValue);
					}
				}, this);
				return viewModelConfig;
			},

			/**
			 * Initializes filters configuration.
			 * @protected
			 * @virtual
			 */
			initFiltersConfig: function() {
				this.initFiltersBaseConfig();
				this.initFiltersCommonConfig();
				this.initFixedFilterConfig();
				this.initCustomFilterConfig();
				this.initFolderFilterConfig();
				this.initTagFilterConfig();
			},

			/**
			 * Initializes filters base configuration.
			 * @private
			 */
			initFiltersBaseConfig: function() {
				var filtersViewItemsNames = this.filtersViewItemsNames;
				this.filtersConfig = {
					quickFilterViewContainerName: filtersViewItemsNames
						? filtersViewItemsNames.quickFilterViewContainerName
						: null,
					fixedFilterConfig: this.sandbox.publish("GetFixedFilterConfig", null, [this.sandbox.id]) || {},
					folderFilterConfig: this.checkFolderFilterVisibility()
						? this.sandbox.publish("GetFolderFilterConfig", null, [this.sandbox.id]) || {}
						: null,
					customFilterConfig: this.sandbox.publish("GetExtendedFilterConfig", null, [this.sandbox.id]) || {},
					tagFilterConfig: this.checkTagFilterVisibility() ? {} : null
				};
			},

			/**
			 * Initializes filters common configuration.
			 * @private
			 */
			initFiltersCommonConfig: function() {
				var isFolderFilterVisible = this.checkFolderFilterVisibility();
				this.filtersCommonConfig = Ext.apply({
					Ext: this.Ext,
					sandbox: this.sandbox,
					entitySchema: this.entitySchema,
					folderEntitySchema: isFolderFilterVisible ? this.folderEntitySchema : null,
					inFolderEntitySchema: isFolderFilterVisible ? this.inFolderEntitySchema : null,
					entityColumnNameInFolderEntity: this.entityColumnNameInFolderEntity
				}, this.filtersViewItemsNames);
			},

			/**
			 * Initializes fixed filter configuration.
			 * @private
			 */
			initFixedFilterConfig: function() {
				if (this.filtersConfig && this.filtersCommonConfig) {
					var fixedFilterConfig = this.filtersConfig.fixedFilterConfig;
					if (fixedFilterConfig) {
						Ext.apply(fixedFilterConfig, this.filtersCommonConfig);
						Ext.apply(fixedFilterConfig, {
							filterChangedDefined: true
						});
					}
				}
			},

			/**
			 * Initializes custom filter configuration.
			 * @private
			 */
			initCustomFilterConfig: function() {
				if (this.filtersConfig && this.filtersCommonConfig) {
					var customFilterConfig = this.filtersConfig.customFilterConfig;
					if (customFilterConfig) {
						Ext.apply(customFilterConfig, this.filtersCommonConfig);
						if (customFilterConfig.replaceQuickFilterViewContainerName) {
							this.filtersConfig.quickFilterViewContainerName = customFilterConfig.quickFilterViewContainerName;
						}
						Ext.apply(customFilterConfig, {
							quickFilterKey: "_" + this.entitySchema.name,
							StringColumnSearchComparisonType: this.stringColumnSearchComparisonType,
							filterDefaultColumnName: this.filterDefaultColumnName,
							isShortFilterVisible: this.isShortFilterVisible
						});
					}
				}
			},

			/**
			 * Initializes folder filter configuration.
			 * @private
			 */
			initFolderFilterConfig: function() {
				if (this.filtersConfig && this.filtersCommonConfig) {
					var folderFilterConfig = this.filtersConfig.folderFilterConfig;
					if (folderFilterConfig) {
						Ext.apply(folderFilterConfig, this.filtersCommonConfig);
					}
				}
			},

			/**
			 * Initializes tag filter configuration.
			 * @private
			 */
			initTagFilterConfig: function() {
				if (this.filtersConfig && this.filtersCommonConfig) {
					var tagFilterConfig = this.filtersConfig.tagFilterConfig;
					if (tagFilterConfig) {
						Ext.apply(tagFilterConfig, this.filtersCommonConfig);
						Ext.apply(tagFilterConfig, {
							isShortFilterVisible: this.isShortFilterVisible,
							values: {
								TagEntitySchemaName: this.tagEntitySchema.name,
								InTagEntitySchemaName: this.inTagEntitySchema.name
							}
						});
					}
				}
			},

			/**
			 * Checks folder filter visibility.
			 * @private
			 * @return {Boolean} Folders tree filter visibility.
			 */
			checkFolderFilterVisibility: function() {
				return this.useFolderFilter && this.folderEntitySchema && this.inFolderEntitySchema;
			},

			/**
			 * Checks tag filter visibility.
			 * @private
			 * @return {Boolean} Tag filter visibility.
			 */
			checkTagFilterVisibility: function() {
				return this.useTagModule && this.tagEntitySchema && this.inTagEntitySchema;
			},

			/**
			 * ############## ##### ########, ########### ### ##########.
			 * @protected
			 * @virtual
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ########.
			 */
			initFiltersEntitySchemas: function(callback, scope) {
				var entitySchema = this.getEntitySchema();
				this.entitySchema = entitySchema;
				this.initFoldersSchemas(function() {
					this.initFiltersConfig();
					callback.call(scope);
				}, this);
			},

			/**
			 * Initializes object group schemas neccesary for filtering.
			 * @protected
			 * @virtual
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Context.
			 */
			initFoldersSchemas: function(callback, scope) {
				performanceManager.start("QuickFilterModuleV2_Init_requireSchemaFolder");
				var config = this.sandbox.publish("GetFolderEntitiesNames", null, [this.sandbox.id]) || {};
				var entitiesNames = this.getFolderEntitiesNames(config);
				this.entityColumnNameInFolderEntity = entitiesNames.entityColumnNameInFolderEntity;
				var folderSchemaName = entitiesNames.folderSchemaName;
				var inFolderSchemaName = entitiesNames.inFolderSchemaName;
				var tagSchemaName = entitiesNames.tagSchemaName;
				var inTagSchemaName = entitiesNames.inTagSchemaName;
				var requireConfig = {
					descriptorNames: ["find!" + folderSchemaName, "find!" + inFolderSchemaName, "find!" + tagSchemaName,
						"find!" + inTagSchemaName],
					schemaNames: [folderSchemaName, inFolderSchemaName, tagSchemaName, inTagSchemaName],
					callback: callback,
					scope: scope
				};
				this.initFiltersAvailability(config);
				this.requireFoldersSchemas(requireConfig);
			},

			/**
			 * Returns folder entities names.
			 * @private
			 * @param {Object} config Entity schema names config.
			 * @return {Object} Folder entities names.
			 */
			getFolderEntitiesNames: function(config) {
				var entitySchemaName = this.getSchemaName();
				return {
					entityColumnNameInFolderEntity: config.entityColumnNameInFolderEntity || entitySchemaName,
					folderSchemaName: config.folderSchemaName || (entitySchemaName + "Folder"),
					inFolderSchemaName: config.inFolderSchemaName || (entitySchemaName + "InFolder"),
					tagSchemaName: config.tagSchemaName || (entitySchemaName + "Tag"),
					inTagSchemaName: config.inTagSchemaName || (entitySchemaName + "InTag")
				};
			},

			/**
			 * Initializes filters availability.
			 * @private
			 * @param {Object} config Config.
			 */
			initFiltersAvailability: function(config) {
				if (config) {
					this.useTagModule = config.useTagModule;
					this.useFolderFilter = config.useFolderFilter;
				}
			},

			/**
			 * Requires object group schemas neccesary for filtering.
			 * @private
			 * @param {Object} config Require config.
			 */
			requireFoldersSchemas: function(config) {
				this.sandbox.requireModuleDescriptors(config.descriptorNames, function() {
					this.Terrasoft.require(config.schemaNames,
						function(folderEntitySchema, inFolderEntitySchema, tagEntitySchema, inTagEntitySchema) {
							performanceManager.stop("QuickFilterModuleV2_Init_requireSchemaFolder");
							this.folderEntitySchema = folderEntitySchema;
							this.inFolderEntitySchema = inFolderEntitySchema;
							this.tagEntitySchema = tagEntitySchema;
							this.inTagEntitySchema = inTagEntitySchema;
							config.callback.call(config.scope);
						}, this);
				}, this);
			},

			/**
			 * Hides folders and custom filter extended mode.
			 * @private
			 */
			hideCustomFiltersExtendedModeAndFolders: function() {
				var customFilterViewModel = this.viewModel.getFilterViewModel("CustomFilters");
				if (!Ext.isEmpty(customFilterViewModel)) {
					customFilterViewModel.set("isExtendedModeHidden", true);
					customFilterViewModel.set("isFoldersHidden", true);
					customFilterViewModel.set("ActiveFolder", null);
				}
			},

			/**
			 * ########### ###### ## ######### sandbox c ##### ######## ######.
			 * @protected
			 * @virtual
			 * @param {String} messageName ######## #########.
			 * @param {Function} handler ########## #########.
			 */
			internalSubscribe: function(messageName, handler) {
				var sandbox = this.sandbox;
				var sandboxId = sandbox.id;
				sandbox.subscribe(messageName, handler, this, [sandboxId]);
			},

			/**
			 * Subscribes on sandbox events.
			 * @protected
			 * @virtual
			 */
			subscribeSandboxEvents: function() {
				this.internalSubscribe("GetQuickFilter", function() {
					return this.viewModel.getFilters();
				});
				this.internalSubscribe("UpdateExtendedFilter", function(filter) {
					this.viewModel.clearFilterValue("CustomFilters", filter);
				});
				this.internalSubscribe("SetCustomFilters", function(filters) {
					var customFilterViewModel = this.viewModel.getFilterViewModel("CustomFilters");
					customFilterViewModel.setCustomFilters(filters);
				});
				this.internalSubscribe("UpdateExtendedFilterValues", function(values) {
					if (!this.viewModel) {
						return;
					}
					var customFilterViewModel = this.viewModel.getFilterViewModel("CustomFilters");
					this.Terrasoft.each(values, function(value, property) {
						customFilterViewModel.set(property, value);
					});
				});
				this.internalSubscribe("GetFixedFilter", function(config) {
					var filterName = (config && config.filterName) || "";
					return this.viewModel.getFilterValue("FixedFilters", filterName);
				});
				this.internalSubscribe("UpdateFolderFilter", function(filter) {
					this.viewModel.clearFilterValue("FolderFilters", filter);
				});
				this.internalSubscribe("GetTagFilter", function(config) {
					var tagFilterViewModel = this.viewModel.getFilterViewModel("TagFilters");
					return tagFilterViewModel.createTagFilters(config.inTagSchemaName, config.tags);
				});
				this.internalSubscribe("UpdateFavoritesMenu", function() {
					var customFilterViewModel = this.viewModel.getFilterViewModel("CustomFilters");
					customFilterViewModel.initFavouriteFolders();
				});
				this.internalSubscribe("IsSeparateMode", function(isSeparateMode) {
					var fixedFilterViewModel = this.viewModel.getFilterViewModel("FixedFilters");
					var customFilterViewModel = this.viewModel.getFilterViewModel("CustomFilters");
					var tagFilterViewModel = this.viewModel.getFilterViewModel("TagFilters");
					if (!Ext.isEmpty(fixedFilterViewModel)) {
						fixedFilterViewModel.set("IsSeparateMode", isSeparateMode);
						fixedFilterViewModel.updateButtonCaption("Owner");
					}
					if (!Ext.isEmpty(customFilterViewModel)) {
						customFilterViewModel.set("IsSeparateMode", isSeparateMode);
						customFilterViewModel.updateButtonCaption();
					}
					if (!Ext.isEmpty(tagFilterViewModel)) {
						tagFilterViewModel.set("IsSeparateMode", isSeparateMode);
						tagFilterViewModel.updateButtonCaption();
					}
				});
				this.internalSubscribe("CustomFilterExtendedModeClose", this.hideCustomFiltersExtendedModeAndFolders);
				this.internalSubscribe("HideFolderTree", this.hideCustomFiltersExtendedModeAndFolders);
				this.internalSubscribe("UpdateCustomFilterMenu", function(config) {
					if (!this.viewModel) {
						return;
					}
					var customFilterViewModel = this.viewModel.getFilterViewModel("CustomFilters");
					var sandbox = this.sandbox;
					if (config && customFilterViewModel) {
						if (config.folder) {
							if (config.folder.wasNew &&
								config.folderType.value === ConfigurationConstants.Folder.Type.Search) {
								config.folder.wasNew = false;
								sandbox.publish("CustomFilterExtendedMode", config, [sandbox.id]);
							}
							customFilterViewModel.set("ActiveFolder", config);
						}
						if (config.hasOwnProperty("isExtendedModeHidden")) {
							customFilterViewModel.set("isExtendedModeHidden", config.isExtendedModeHidden);
						}
						if (config.hasOwnProperty("isFoldersHidden")) {
							customFilterViewModel.set("isFoldersHidden", config.isFoldersHidden);
						}
						if (config.clearActiveFolder) {
							customFilterViewModel.set("ActiveFolder", null);
						}
					} else {
						customFilterViewModel.set("ActiveFolder", config);
					}
				});
				this.internalSubscribe("RerenderQuickFilterModule", this.reRender);
			},

			/**
			 * ############## ###### # ################ ###########.
			 * @protected
			 * @virtual
			 */
			initFiltersViewItemsNames: function() {
				var sanboxId = this.sandbox.id;
				var filtersViewItemsNames = {
					customFilterContainerName: "customFilterContainer",
					folderFilterContainerName: "folderFilterContainer",
					fixedFilterContainerName: "fixedFilterContainer",
					quickFilterViewContainerName: "quickFilterViewContainer",
					simpleFilterEditContainerName: "simpleFilterEditContainer",
					folderFilterButtonContainerName: "folderFilterButtonContainer",
					customFilterButtonContainerName: "customFilterButtonContainer"
				};
				Terrasoft.each(filtersViewItemsNames, function(parameterValue, parameterName) {
					filtersViewItemsNames[parameterName] = parameterValue + "_" + sanboxId;
				});
				this.filtersViewItemsNames = filtersViewItemsNames;
			},

			/**
			 * ######### ############ ######### ######.
			 * @protected
			 * @virtual
			 */
			registerMessages: function() {
				this.sandbox.registerMessages(this.messages);
			},

			/**
			 * ######### ########### ### ########### ###### ########.
			 * @protected
			 * @param {Object} config ###### # ########## ### #########.
			 * @param {String} config.renderTo Id ########## #### ##### ######## ######.
			 */
			reRender: function(config) {
				var customFilterViewModel = this.viewModel && this.viewModel.getFilterViewModel("CustomFilters");
				if (customFilterViewModel) {
					var simpleFilterEditContainerName = customFilterViewModel.get("simpleFilterEditContainerName");
					var addConditionView = Ext.getCmp(simpleFilterEditContainerName);
					if (addConditionView) {
						addConditionView.destroy();
					}
				}
				if (this.view) {
					this.view.destroy();
				}
				var container = this.Ext.get(config.renderTo);
				var rendered = this.canRender(container);
				this.render(container);
				return rendered;
			},

			/**
			 * ####### ######### ###### Terrasoft.ViewGenerator.
			 * @return {Terrasoft.ViewGenerator} ########## ###### Terrasoft.ViewGenerator.
			 */
			createViewGenerator: function() {
				return this.Ext.create(this.viewGeneratorClass);
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
				var schema = {
					viewConfig: [{
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"name": this.filtersViewItemsNames.quickFilterViewContainerName
					}]
				};
				var viewConfig = Ext.apply({
					schema: schema
				}, config);
				viewConfig.schemaName = "";
				viewGenerator.generate(viewConfig, callback, scope);
			},

			/**
			 * ########## ######## ##### # ####### ######## #######.
			 * @protected
			 * @virtual
			 * @return {String} ######## ##### # ####### ######## #######.
			 */
			getSchemaName: function() {
				return this.entitySchema.name;
			},

			/**
			 * @inheritdoc Terrasoft.configuration.BaseNestedModule#initViewConfig
			 * @overridden
			 */
			initViewConfig: function(callback, scope) {
				var generatorConfig = Terrasoft.deepClone(this.moduleConfig) || {};
				generatorConfig.viewModelClass = this.viewModelClass;
				this.buildView(generatorConfig, function(view) {
					this.viewConfig = view[0];
					callback.call(scope);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.configuration.BaseNestedModule#initViewModelClass
			 * @overridden
			 */
			initViewModelClass: function(callback, scope) {
				this.viewModelClass = this.Ext.ClassManager.get(this.viewModelClassName);
				callback.call(scope);
			},

			/**
			 * @inheritdoc Terrasoft.configuration.BaseNestedModule#getViewModelConfig
			 * @overridden
			 */
			getViewModelConfig: function() {
				var config = this.callParent(arguments);
				Ext.apply(config, {
					entitySchema: this.entitySchema,
					folderEntitySchema: this.folderEntitySchema,
					inFolderEntitySchema: this.inFolderEntitySchema,
					viewModelConfig: this.viewModelConfig,
					stringColumnSearchComparisonType: this.stringColumnSearchComparisonType
				});
				return config;
			},

			/**
			 * Initializes module.
			 * @overridden
			 * @param {Function} callback Callback-function.
			 * @param {Object} scope Context of the callback.
			 */
			init: function(callback, scope) {
				performanceManager.stop("QuickFilterModuleV2_BeforeLoad");
				performanceManager.start("QuickFilterModuleV2_Init");
				if (this.isInitialized) {
					Ext.callback(callback, scope);
					return;
				}
				this.initConfig();
				this.registerMessages();
				this.subscribeSandboxEvents();
				this.initFiltersViewItemsNames();
				var afterParentInitFn = this._afterParentInit.bind(this, callback, scope);
				var parentInitFn = this.getParentMethod(this, [afterParentInitFn, this]);
				Terrasoft.chain(
					this.initSysSettingsValues,
					this.initFiltersEntitySchemas,
					this.initFiltersModules,
					this._initConfigs,
					parentInitFn,
					this
				);
			},

			/**
			 * Initialize module configs.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			_initConfigs: function(callback, scope) {
				var config = this.filtersConfig;
				this.viewModelConfig = this.generateFiltersViewModelsConfig(config);
				this.filtersViewConfigs = this.generateViewConfig(config);
				Ext.callback(callback, scope);
			},

			/**
			 * Handler of after parent init method.
			 * Sets initialized flag.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			_afterParentInit: function(callback, scope) {
				performanceManager.stop("QuickFilterModuleV2_Init");
				this._updateFilter();
				this.isInitialized = true;
				Ext.callback(callback, scope);
			},

			/**
			 * Updates filter if section filters is empty and default filters is not empty.
			 * By example ActivitySectionV2, OpportunitySectionV2.
			 * @private
			 */
			_updateFilter: function() {
				var sandbox = this.sandbox;
				sandbox.publish("UpdateFilter", {
					filters: this.viewModel.getFilters()
				}, [sandbox.id]);
			},

			/**
			 * Gets is empty section filters.
			 * @private
			 * @return {Boolean} True if section filters is empty.
			 */
			_isEmptySectionFilters: function() {
				var sectionFilters = this.viewModel.sectionFilters;
				if (!sectionFilters) {
					return true;
				}
				if (sectionFilters.isEmpty()) {
					return true;
				}
				var emptyFilters = sectionFilters.filterByFn(function(item) {
					var isObjectOrArray = Ext.isObject(item) || Ext.isArray(item);
					return isObjectOrArray && Terrasoft.isEmptyObject(item);
				});
				return Boolean(emptyFilters.getCount() === sectionFilters.getCount());
			},

			/**
			 * ######### ########### ######### ######.
			 * @private
			 * @param {String|Object} renderTo #########, # ####### ############## ######.
			 * @return {Boolean} ########### ######### ######  # ######### ########.
			 */
			canRender: function(renderTo) {
				return !(this.destroyed || (this.Ext.isObject(renderTo) && !renderTo.dom) ||
					(this.view && this.view.rendered));
			},

			/**
			 * @inheritdoc Terrasoft.BaseModule#render
			 * @overridden
			 */
			render: function(renderTo) {
				performanceManager.start("QuickFilterModuleV2_Render");
				if (!this.canRender(renderTo)) {
					this.hideLoadingMask();
					return;
				}
				performanceManager.start("QuickFilterModuleV2_FiltersChanged");
				performanceManager.start("QuickFilterModuleV2_Render_createViewModel");
				var filtersViewConfigs = this.filtersViewConfigs;
				var viewModel = this.viewModel;
				var quickFilterViewConfig = Terrasoft.deepClone(this.viewConfig);
				var view = this.view = this.Ext.create("Terrasoft.Container", quickFilterViewConfig);
				var filtersViewModels = viewModel.getFiltersViewModels();
				filtersViewModels.eachKey(function(filterName, filterViewModel) {
					var filterViewConfig = filtersViewConfigs[filterName];
					if (filterViewConfig) {
						var filterView = this.Ext.create("Terrasoft.Container",
							Terrasoft.deepClone(filterViewConfig));
						filterViewModel.suspendUpdate = true;
						filterView.bind(filterViewModel);
						filterViewModel.suspendUpdate = false;
						view.items.add(filterView.id, filterView);
					}
				}, this);
				view.render(renderTo);
				this.hideLoadingMask();
				var customFilterViewModel = this.viewModel.getFilterViewModel("CustomFilters");
				if (customFilterViewModel) {
					customFilterViewModel.updateFiltersOnReturn();
				}
				var fixedFilterViewModel = this.viewModel.getFilterViewModel("FixedFilters");
				if (fixedFilterViewModel) {
					fixedFilterViewModel.updateFiltersOnReturn();
				}
				performanceManager.stop("QuickFilterModuleV2_Render_createViewModel");
				performanceManager.stop("QuickFilterModuleV2_Render");
				performanceManager.setTimeStamp("loadAdditionalModulesComplete");
				this.showCustomFilterEdit();
				this.initFolderFilters();
			},

			/**
			 * Shows quick filter fields in detail.
			 */
			showQuickFilter: function() {
				var filterViewModel = this.viewModel.getFilterViewModel("CustomFilters");
				if (filterViewModel !== null) {
					filterViewModel.addSimpleFilter();
				}
			},

			/**
			 * Checks for loaded filter module and shows filter edit field.
			 */
			showCustomFilterEdit: function() {
				var isShortFilterFieldsVisible = this.getShortFilterFieldsVisible();
				if (isShortFilterFieldsVisible) {
					this.showQuickFilter();
				}
			},

			/**
			 * Initializes module configuration.
			 * @protected
			 * @virtual
			 */
			initConfig: function() {
				this.moduleConfig = this.moduleConfig || this.getDefaultModuleConfig();
			},

			/**
			 * Returns default module config.
			 * @protected
			 * @return {Object}
			 */
			getDefaultModuleConfig: function() {
				return {
					FixedFilters: {
						viewConfigModuleName: "FixedFilterViewV2",
						viewModelConfigModuleName: "FixedFilterViewModelV2",
						configPropertyName: "fixedFilterConfig"
					},
					CustomFilters: {
						viewConfigModuleName: "CustomFilterViewV2",
						viewModelConfigModuleName: "CustomFilterViewModelV2",
						configPropertyName: "customFilterConfig"
					},
					FolderFilters: {
						viewConfigModuleName: "FolderFilterViewV2",
						viewModelConfigModuleName: "FolderFilterViewModelV2",
						configPropertyName: "folderFilterConfig"
					},
					TagFilters: {
						viewConfigModuleName: "TagFilterViewGeneratorV2",
						viewModelConfigModuleName: "TagFilterViewModelGeneratorV2",
						configPropertyName: "tagFilterConfig"
					}
				};
			},

			/**
			 * Returns entity schema.
			 * @protected
			 */
			getEntitySchema: function() {
				var entitySchema;
				var sandbox = this.sandbox;
				var entitySchemaConfig = sandbox.publish("GetModuleSchema", null, [sandbox.id]);
				if (Ext.isEmpty(entitySchemaConfig)) {
					entitySchema = sandbox.publish("GetSectionEntitySchema", null);
				} else {
					if (entitySchemaConfig.hasOwnProperty("isShortFilterVisible") &&
						entitySchemaConfig.hasOwnProperty("filterDefaultColumnName")) {
						this.isShortFilterVisible = entitySchemaConfig.isShortFilterVisible;
						this.filterDefaultColumnName = entitySchemaConfig.filterDefaultColumnName;
						entitySchema = entitySchemaConfig.entitySchema;
					} else {
						entitySchema = entitySchemaConfig;
					}
				}
				return entitySchema;
			},

			/**
			 * Returns the value of visibility for short filter fields.
			 * @protected
			 * @return {Boolean}
			 */
			getShortFilterFieldsVisible: function() {
				var sandbox = this.sandbox;
				var isShortFilterVisible = sandbox.publish("GetShortFilterFieldsVisible", null, [sandbox.id]);
				if (Ext.isEmpty(isShortFilterVisible)) {
					isShortFilterVisible = false;
				}
				return isShortFilterVisible;
			},

			/**
			 * Initializes folder value of folder filter.
			 * @protected
			 */
			initFolderFilters: function() {
				var folderFilterViewModel = this.viewModel.getFilterViewModel("FolderFilters");
				if (folderFilterViewModel) {
					var sandbox = this.sandbox;
					sandbox.publish("SetFolderFilter", folderFilterViewModel.get("folderValue"), [sandbox.id]);
				}
			}
		});
		return Terrasoft.QuickFilterModule;
	});


