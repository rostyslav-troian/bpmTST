Terrasoft.configuration.Structures["MobileBaseDesignerModule"] = {innerHierarchyStack: ["MobileBaseDesignerModule"]};
define("MobileBaseDesignerModule", ["ext-base", "MobileBaseDesignerModuleResources", "SectionDesignDataModule",
		"StructureExplorerUtilities", "BaseSchemaModuleV2", "css!MobileBaseDesignerModule", "css!DetailModuleV2"],
	function(Ext, resources, SectionDesignDataModule, StructureExplorerUtilities) {

		/**
		 * @class Terrasoft.configuration.MobileDesignerGridLayoutItemViewModel
		 * ##### ###### ######## ##### ### #########.
		 */
		Ext.define("Terrasoft.configuration.MobileDesignerGridLayoutItemViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.MobileDesignerGridLayoutItemViewModel",

			/**
			 * @private
			 */
			designerColumns: ["row", "name", "content", "columnName", "dataValueType", "displayColumn", "label",
				"placeHolder", "viewType", "hidden"],

			/**
			 * @private
			 */
			applyValues: function(values) {
				var defaultValues = this.getDefaultValues();
				values.markerValue = values.content;
				Ext.applyIf(values, defaultValues);
			},

			/**
			 * @private
			 */
			getDefaultValues: function() {
				var itemId = Terrasoft.generateGUID();
				return {
					itemId: itemId,
					colSpan: 1,
					column: 0,
					rowSpan: 1,
					dragActionsCode: 1
				};
			},

			/**
			 * @inheritDoc Terrasoft.BaseViewModel#constructor
			 * @overridden
			 */
			constructor: function(config) {
				this.applyValues(config.values);
				this.callParent(arguments);
			},

			/**
			 * ######## ############ ######## #########.
			 * @virtual
			 * @returns {Object} ############ ######## #########.
			 */
			getDesignerValues: function() {
				var designerValues = {};
				var designerColumns = this.designerColumns;
				for (var i = 0, ln = designerColumns.length; i < ln; i++) {
					var designerColum = designerColumns[i];
					var value = this.get(designerColum);
					if (Ext.isDefined(value)) {
						designerValues[designerColum] = value;
					}
				}
				return designerValues;
			}

		});

		/**
		 * @class Terrasoft.configuration.MobileBaseDesignerViewConfig
		 * ####### #####, ############ ############ ############# ### ###### #########.
		 */
		Ext.define("Terrasoft.configuration.MobileBaseDesignerViewConfig", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.MobileBaseDesignerViewConfig",

			/**
			 * ########## ############ ############# ######.
			 * @protected
			 * @virtual
			 * @param {Object} designerSettings ######### ###### ######### #########.
			 * @returns {Object[]} ########## ############ ############# ######.
			 */
			generate: function(designerSettings) {
				this.designerSettings = designerSettings;
				var viewConfig = [
					{
						"name": "MobileDesignerView",
						"generator": "MobileDesignerViewGenerator.generatePartial",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": this.getDesignerItemsView()
					}
				];
				return viewConfig;
			},

			/**
			 * ########## ############ ############# ######### ######.
			 * @protected
			 * @virtual
			 * @returns {Object[]} ############ ############# ######### ######.
			 */
			getDesignerItemsView: function() {
				return [];
			},

			/**
			 * ########## ############ ############# ######### ######### # #####.
			 * @protected
			 * @virtual
			 * @param {Object} config ################ ######.
			 * @returns {Object} ############ ############# ######### ######### # #####.
			 */
			getGridLayoutEditItemsViewConfig: function(config) {
				return [
					{
						name: config.name,
						itemType: Terrasoft.ViewItemType.GRID_LAYOUT,
						maxRows: config.maxRows
					},
					{
						name: config.name + "GridLayoutTools",
						itemType: Terrasoft.ViewItemType.CONTAINER,
						visible: { bindTo: config.name + "VisibleTools" },
						items: [
							{
								name: config.name + "GridLayoutAddItem",
								caption: { "bindTo": "Resources.Strings.AddGridLayoutItemButtonCaption" },
								itemType: Terrasoft.ViewItemType.BUTTON,
								style: Terrasoft.controls.ButtonEnums.style.BLUE,
								tag: config.name,
								click: { bindTo: "onAddGridLayoutItemButtonClick" },
								enabled: { bindTo: config.name + "EnableAdd" },
								classes: {
									textClass: "actions-button-margin-right"
								}
							},
							{
								name: config.name + "GridLayoutRemoveItem",
								caption: { "bindTo": "Resources.Strings.RemoveGridLayoutItemButtonCaption" },
								itemType: Terrasoft.ViewItemType.BUTTON,
								tag: config.name,
								click: { bindTo: "onRemoveGridLayoutItemButtonClick" },
								enabled: { bindTo: config.name + "EnableRemove" }
							}
						]
					}
				];
			},

			/**
			 * ########## #########.
			 * @protected
			 * @virtual
			 * @param {String} name ### ################ ######.
			 * @returns {String} #########.
			 */
			getCaptionByName: function(name) {
				return this.designerSettings.getLocalizableStringByKey(name);
			}

		});

		/**
		 * @class Terrasoft.configuration.MobileBaseDesignerViewModel
		 * ####### ##### ###### ############# ###### #########.
		 */
		Ext.define("Terrasoft.configuration.MobileBaseDesignerViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.MobileBaseDesignerViewModel",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * ######### ###### ######### #########
			 * @protected
			 * @type {Terrasoft.MobileBaseDesignerSettings}
			 */
			designerSettings: null,

			/**
			 * @inheritDoc Terrasoft.BaseViewModel#constructor
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this.initResourcesValues(resources);
			},

			/**
			 * ############## ######### ######## ######.
			 * @protected
			 * @virtual
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ####### ######### ######.
			 */
			init: function(callback, scope) {
				Ext.callback(callback, scope);
			},

			/**
			 * ######### ########### ######## ##### ########### #############.
			 * @protected
			 * @virtual
			 */
			onRender: function() {
			},

			/**
			 * ############## ###### ########## ######## ## ####### ########.
			 * @protected
			 * @virtual
			 * @param {Object} resourcesObj ###### ########.
			 */
			initResourcesValues: function(resourcesObj) {
				var resourcesSuffix = "Resources";
				Terrasoft.each(resourcesObj, function(resourceGroup, resourceGroupName) {
					resourceGroupName = resourceGroupName.replace("localizable", "");
					Terrasoft.each(resourceGroup, function(resourceValue, resourceName) {
						var viewModelResourceName = [resourcesSuffix, resourceGroupName, resourceName].join(".");
						this.set(viewModelResourceName, resourceValue);
					}, this);
				}, this);
			},

			/**
			 * ############ ####### ###### ########## ######### {Terrasoft.GridLayoutEdit}
			 * @protected
			 * @virtual
			 */
			onAddGridLayoutItemButtonClick: function() {
			},

			/**
			 * ############ ####### ###### ######## ######### {Terrasoft.GridLayoutEdit}
			 * @protected
			 * @virtual
			 */
			onRemoveGridLayoutItemButtonClick: function() {
			},

			/**
			 * ############ ######## ######### ###### #######.
			 * @protected
			 * @virtual
			 */
			onConfigureControlGroup: function() {
			},

			/**
			 * ############ ######## ######## ###### #######.
			 * @protected
			 * @virtual
			 */
			onRemoveControlGroup: function() {
			},

			/**
			 * ############ ######### ######### #####.
			 * @protected
			 * @virtual
			 * @param {Array} selectedItems ###### ############### ########## #########.
			 * @param {String} name ### ########.
			 */
			onSelectedItemsChange: function(selectedItems, name) {
				var propertyName = this.getSelectedItemsPropertyName(name);
				this.set(propertyName, selectedItems);
				var enableRemove = (selectedItems.length > 0);
				var enableRemovePropertyName = this.getEnableRemovePropertyName(name);
				this.set(enableRemovePropertyName, enableRemove);
			},

			/**
			 * ############ ######### ######### #########.
			 * @protected
			 * @virtual
			 * @param {Object} selection ######## #########.
			 * @param {String} name ### ########.
			 */
			onSelectionChanged: function(selection, name) {
				var propertyName = this.getSelectionPropertyName(name);
				this.set(propertyName, selection);
			},

			/**
			 * ############ ######### ########## ##### #########.
			 * @protected
			 * @virtual
			 * @param {Terrasoft.BaseViewModelCollection} collection ######### #########.
			 * @param {String} name ### ########.
			 */
			onCollectionChange: function(collection, name) {
				var rowsPropertyName = this.getRowsPropertyName(name);
				var count = collection.getCount();
				this.set(rowsPropertyName, count + 1);
			},

			/**
			 * ############ ######### #######, ########### ## ########### ######## {Terrasoft.ControlGroup}.
			 * @protected
			 * @virtual
			 * @param {Boolean} isCollapsed ######## ########.
			 * @param {String} name ### ########.
			 */
			onControlGroupCollapseChange: function(isCollapsed, name) {
				var visiblePropertyName = this.getVisiblePropertyName(name);
				this.set(visiblePropertyName, !isCollapsed);
			},

			/**
			 * ########## ######## # ###### ###### ### ############# {Terrasoft.GridLayoutEdit}.
			 * @protected
			 * @virtual
			 * @param {String} name ### #########.
			 * @param {Object[]} items ######## #########.
			 */
			generateGridLayoutEditViewBindingData: function(name, items) {
				items = items || [];
				var collection = this.createGridLayoutItemsViewModelCollection();
				for (var i = 0, ln = items.length; i < ln; i++) {
					var item = this.createGridLayoutItemViewModel(items[i]);
					collection.add(item.get("itemId"), item);
				}
				collection.on("add", Ext.bind(this.onCollectionChange, this, [collection, name]));
				collection.on("remove", Ext.bind(this.onCollectionChange, this, [collection, name]));
				var visibleToolsPropertyName = this.getVisibleToolsPropertyName(name);
				this.set(visibleToolsPropertyName, true);
				var enableAddPropertyName = this.getEnableAddPropertyName(name);
				this.set(enableAddPropertyName, true);
				var enableRemovePropertyName = this.getEnableRemovePropertyName(name);
				this.set(enableRemovePropertyName, false);
				this.onCollectionChange(collection, name);
				this[name + "SelectedItemsChange"] = Ext.bind(this.onSelectedItemsChange, this, [name], true);
				this[name + "SelectionChanged"] = Ext.bind(this.onSelectionChanged, this, [name], true);
				var collectionPropertyName = this.getItemCollectionPropertyName(name);
				this.set(collectionPropertyName, collection);
			},

			/**
			 * ########## ######## # ###### ###### ### ############# {Terrasoft.ControlGroup}.
			 * @protected
			 * @virtual
			 * @param {String} name ### #########.
			 */
			generateControlGroupBindingData: function(name) {
				var isCollapsed = false;
				this.set(name + "Collapsed", isCollapsed);
				var visiblePropertyName = this.getVisiblePropertyName(name);
				this.set(visiblePropertyName, !isCollapsed);
				this[name + "CollapseChange"] = Ext.bind(this.onControlGroupCollapseChange, this, [name],
					true);
			},

			/**
			 * ####### ######### ###### ############# ######## {Terrasoft.GridLayoutEdit}.
			 * @protected
			 * @virtual
			 * @param {Object} values ######## ###### #############.
			 * @returns {Terrasoft.BaseViewModel} ######### ###### #############.
			 */
			createGridLayoutItemViewModel: function(values) {
				return Ext.create("Terrasoft.MobileDesignerGridLayoutItemViewModel", {
					values: values
				});
			},

			/**
			 * ####### ######### ######### ### {Terrasoft.GridLayoutEdit}.
			 * @protected
			 * @virtual
			 * @returns {Terrasoft.BaseViewModelCollection} ######### #########.
			 */
			createGridLayoutItemsViewModelCollection: function() {
				return Ext.create("Terrasoft.BaseViewModelCollection");
			},

			/**
			 * ####### ######### ######### ### {Terrasoft.GridLayoutEdit}.
			 * @protected
			 * @virtual
			 * @param {String} name ### #########.
			 */
			removeGridLayoutItemsCollection: function(name) {
				var collectionAttributeName = this.getItemCollectionPropertyName(name);
				this.set(collectionAttributeName, null);
			},

			/**
			 * ########## ######### ######### ### {Terrasoft.GridLayoutEdit}.
			 * @protected
			 * @virtual
			 * @param {String} name ### #########.
			 * @returns {Terrasoft.BaseViewModelCollection} ######### #########.
			 */
			getItemsCollectionByName: function(name) {
				var collectionAttributeName = this.getItemCollectionPropertyName(name);
				return this.get(collectionAttributeName);
			},

			/**
			 * ########## ### ######## ######### ######### ### {Terrasoft.GridLayoutEdit}.
			 * @protected
			 * @virtual
			 * @param {String} name ### #########.
			 * @returns {String} ### ######## #########.
			 */
			getItemCollectionPropertyName: function(name) {
				return name + "ItemsCollection";
			},

			/**
			 * ########## ### ######## ######### #########.
			 * @protected
			 * @virtual
			 * @param {String} name ### ########.
			 * @returns {String} ### ######## ######### #########.
			 */
			getSelectedItemsPropertyName: function(name) {
				return name + "SelectedItems";
			},

			/**
			 * ########## ######### ########.
			 * @protected
			 * @virtual
			 * @param {String} name ### ########.
			 * @returns {String} ######### ########.
			 */
			getSelectedItemsByName: function(name) {
				var propertyName = this.getSelectedItemsPropertyName(name);
				return this.get(propertyName) || [];
			},

			/**
			 * ########## ### ######## ######### #########.
			 * @protected
			 * @virtual
			 * @param {String} name ### ########.
			 * @returns {String} ### ######## ######### #########.
			 */
			getSelectionPropertyName: function(name) {
				return name + "Selection";
			},

			/**
			 * ########## ######## #########.
			 * @protected
			 * @virtual
			 * @param {String} name ### ########.
			 * @returns {String} ######## #########.
			 */
			getSelectionByName: function(name) {
				var propertyName = this.getSelectionPropertyName(name);
				return this.get(propertyName);
			},

			/**
			 * ########## ### ######## ########## #####.
			 * @protected
			 * @virtual
			 * @param {String} name ### ########.
			 * @returns {String} ### ######## ########## #####.
			 */
			getRowsPropertyName: function(name) {
				return name + "Rows";
			},

			/**
			 * ########## ########## #####.
			 * @protected
			 * @virtual
			 * @param {String} name ### ########.
			 * @returns {String} ########## #####.
			 */
			getRowsByName: function(name) {
				var propertyName = this.getRowsPropertyName(name);
				return this.get(propertyName);
			},

			/**
			 * ########## ### ########, ########### ## ########### ######### ######## # #########.
			 * @protected
			 * @virtual
			 * @param {String} name ### ########.
			 * @returns {String} ### ########.
			 */
			getEnableAddPropertyName: function(name) {
				return name + "EnableAdd";
			},

			/**
			 * ########## ### ########, ########### ## ########### ####### ######## ## #########.
			 * @protected
			 * @virtual
			 * @param {String} name ### ########.
			 * @returns {String} ### ########.
			 */
			getEnableRemovePropertyName: function(name) {
				return name + "EnableRemove";
			},

			/**
			 * Returns property name that indicates visibility of tools panel.
			 * @protected
			 * @virtual
			 * @param {String} name Element name.
			 * @returns {String} Property name.
			 */
			getVisibleToolsPropertyName: function(name) {
				return name + "VisibleTools";
			},

			/**
			 * ########## ### ########, ########### ## ######### ########## {Terrasoft.GridLayoutEdit}.
			 * @protected
			 * @virtual
			 * @param {String} name ### ########.
			 * @returns {String} ### ########.
			 */
			getVisiblePropertyName: function(name) {
				return name + "Visible";
			},

			/**
			 * ########## ############ ######### ######### ######### ## ######### ########## ######.
			 * @protected
			 * @virtual
			 * @returns {Object} ############ ######### ######### #########.
			 */
			generateSettingsConfigCollectionItems: function(collection) {
				var items = [];
				collection.each(function(item) {
					var itemConfig = item.getDesignerValues();
					items.push(itemConfig);
				});
				return items;
			},

			/**
			 * ####### ######### ######## ## #########.
			 * @protected
			 * @virtual
			 * @param {String} name ### #########.
			 */
			removeSelectedItemsFromCollection: function(name) {
				var collection = this.getItemsCollectionByName(name);
				var selectedItems = this.getSelectedItemsByName(name);
				var selectedItemsLength = selectedItems.length;
				if (selectedItemsLength === 0) {
					return;
				}
				for (var i = 0; i < selectedItemsLength; i++) {
					var item = selectedItems[i];
					collection.removeByKey(item);
				}
				this.reRender();
			},

			/**
			 * ######### ############ ####### # #########.
			 * @protected
			 * @virtual
			 * @param {String} name ### #########.
			 * @param {Object} columnItem ############ #######.
			 */
			addColumnItemToGridLayoutCollection: function(name, columnItem) {
				var selection = this.getSelectionByName(name);
				if (Ext.isObject(selection) && Ext.isNumber(selection.row)) {
					columnItem.row = selection.row;
				} else {
					columnItem.row = this.getRowsByName(name) - 1;
				}
				var collection = this.getItemsCollectionByName(name);
				var gridLayoutItemViewModel = this.createGridLayoutItemViewModel(columnItem);
				collection.add(gridLayoutItemViewModel.get("itemId"), gridLayoutItemViewModel);
			},

			/**
			 * ########## ############ ####### ## ######### ############ ## #### ######### #######.
			 * @param {Object} config ############ ## #### ######### #######.
			 * @returns {Object} ############ #######.
			 */
			getColumnConfigFromStructureExplorer: function(config) {
				var caption = config.caption.join(".");
				return {
					caption: caption,
					columnName: config.leftExpressionColumnPath,
					dataValueType: config.dataValueType
				};
			},

			/**
			 * ######### #### ###### #######.
			 * @param config ############ ###### #######.
			 * @param {String} config.callback ### ######-########### ########## ######.
			 * @param {String} config.entitySchemaName ######## #####.
			 */
			openStructureExplorer: function(config) {
				var structureExplorerConfig = {
					schemaName: config.entitySchemaName,
					excludeDataValueTypes: [Terrasoft.DataValueType.IMAGELOOKUP],
					useBackwards: false
				};
				StructureExplorerUtilities.Open(this.sandbox, structureExplorerConfig, config.callback,
					this.renderTo, this);
			},

			/**
			 * ############## # ############## ############# #####.
			 */
			reRender: function() {
			},

			/**
			 * ########## ############ ######### ## ######### ########## ######.
			 * @returns {Object} ############ #########.
			 */
			generateDesignerSettingsConfig: function() {
				return this.designerSettings.getSettingsConfig();
			}

		});

		/**
		 * @class Terrasoft.configuration.MobileDesignerBuilder
		 * ####### ##### ## ###### # ############## #########.
		 */
		Ext.define("Terrasoft.configuration.MobileDesignerBuilder", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.MobileDesignerBuilder",

			/**
			 * ### ##### ###### #############.
			 * @type {String}
			 */
			viewModelClassName: null,

			/**
			 * ### ##### ######### ############ #############.
			 * @type {String}
			 */
			viewModelConfigClassName: null,

			/**
			 * ### ##### ########## #############.
			 * @type {String}
			 */
			viewGeneratorClass: "Terrasoft.ViewGenerator",

			/**
			 * ####### ######### ###### ########## #############.
			 * @private
			 * @returns {Terrasoft.ViewGenerator} ######### ###### ########## #############.
			 */
			createViewGenerator: function() {
				return Ext.create(this.viewGeneratorClass);
			},

			/**
			 * ########## #############.
			 * @private
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ####### ######### ######.
			 */
			buildView: function(callback, scope) {
				var viewGenerator = this.createViewGenerator();
				var schema = {
					viewConfig: this.getViewConfig()
				};
				var viewConfig = {
					schema: schema,
					viewModelClass: this.viewModelClassName
				};
				viewGenerator.generate(viewConfig, callback, scope);
			},

			/**
			 * ########## ############### ############ #############.
			 * @private
			 * @returns {Object[]} ############### ############ #############.
			 */
			getViewConfig: function() {
				var designerSettings = this.designerSettings;
				var viewConfig = Ext.create(this.viewModelConfigClassName);
				return viewConfig.generate(designerSettings);
			},

			/**
			 * ######### ######### #############.
			 * @param {Object} designerSettings ######### ###### ######### #########.
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ####### ######### ######.
			 */
			build: function(designerSettings, callback, scope) {
				this.designerSettings = designerSettings;
				var viewModelClass = this.viewModelClassName;
				this.buildView(function(view) {
					Ext.callback(callback, scope, [viewModelClass, view]);
				}, this);
			},

			/**
			 * ######### ############# #############.
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ####### ######### ######.
			 */
			reBuildView: function(callback, scope) {
				this.buildView(callback, scope);
			}

		});

		/**
		 * @class Terrasoft.configuration.MobileBaseDesignerModule
		 * ####### ##### ###### ######### ########## ##########.
		 */
		var designerModule = Ext.define("Terrasoft.configuration.MobileBaseDesignerModule", {
			extend: "Terrasoft.BaseSchemaModule",
			alternateClassName: "Terrasoft.MobileBaseDesignerModule",

			/**
			 * ### ##### ###### #############.
			 * @type {String}
			 */
			viewModelClassName: null,

			/**
			 * ### ##### ######### ############ #############.
			 * @type {String}
			 */
			viewModelConfigClassName: null,

			/**
			 * ### ###### #########.
			 * @type {String}
			 */
			designerSettingsClassName: null,

			mixins: {
				HistoryStateUtilities: "Terrasoft.HistoryStateUtilities"
			},

			/**
			 * ####### ######### ###### ## ###### # ##############.
			 * @private
			 * @returns {Terrasoft.MobileDesignerBuilder} ######### ###### ## ###### # ##############.
			 */
			createBuilder: function() {
				this.builder = Ext.create("Terrasoft.MobileDesignerBuilder", {
					viewModelClassName: this.viewModelClassName,
					viewModelConfigClassName: this.viewModelConfigClassName
				});
				return this.builder;
			},

			/**
			 * ######### ######### #############.
			 * @private
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ####### ######### ######.
			 */
			build: function(callback, scope) {
				var builder = this.createBuilder();
				var designerSettings = this.getDesignerSettings();
				builder.build(designerSettings, function(viewModelClass, view) {
					callback.call(scope, viewModelClass, view);
				}, this);
			},

			/**
			 * @private
			 */
			getDesignerSettings: function() {
				if (!this.designerSettings) {
					var settingsConfig = this.getSettingsConfig();
					this.designerSettings = this.createDesignerSettings(settingsConfig);
				}
				return this.designerSettings;
			},

			/**
			 * ############## #############.
			 * @private
			 * @param {Object} viewConfig ################## ############ #############.
			 */
			reRender: function(viewConfig) {
				this.viewConfig = viewConfig;
				var view = this.view;
				if (view) {
					view.destroy();
				}
				var renderTo = Ext.get(this.renderToId);
				this.render(renderTo);
			},

			/**
			 * @inheritDoc Terrasoft.BaseSchemaModule#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("PostDesignerSettings", function() {
					return this.viewModel.generateDesignerSettingsConfig();
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.BaseSchemaModule#generateSchemaStructure
			 * @overridden
			 */
			generateSchemaStructure: function(callback, scope) {
				var designerSettings = this.getDesignerSettings();
				designerSettings.initialize(function() {
					var buildBoundFn = Ext.bind(this.build, this, [callback, scope]);
					SectionDesignDataModule.init(this.sandbox, buildBoundFn);
				}, this);
			},

			/**
			 * ####### ######### ###### ######### #########.
			 * @protected
			 * @virtual
			 * @param {Object} settingsConfig ############ ######### #########.
			 * @returns {Terrasoft.MobileBaseDesignerSettings} ######### ###### ######### #########.
			 */
			createDesignerSettings: function(settingsConfig) {
				return Ext.create(this.designerSettingsClassName, {
					sandbox: this.sandbox,
					settingsConfig: settingsConfig
				});
			},

			/**
			 * ########## ################ ###### ###### #############.
			 * @protected
			 * @virtual
			 * @returns {Object} ################ ###### ###### #############.
			 */
			getViewModelConfig: function() {
				var designerSettings = this.getDesignerSettings();
				var schema = {
					entitySchema: designerSettings.entitySchema,
					entitySchemaName: designerSettings.entitySchemaName
				};
				return {
					values: {
						schema: schema
					},
					designerSettings: designerSettings,
					sandbox: this.sandbox,
					reRender: Ext.bind(function() {
						this.builder.reBuildView(this.reRender, this);
					}, this)
				};
			},

			/**
			 * ########## ############ ######### #########.
			 * @protected
			 * @virtual
			 * @returns {Object} ############ ######### #########.
			 */
			getSettingsConfig: function() {
				var settingsConfig = this.sandbox.publish("GetDesignerSettings");
				return settingsConfig;
			}
		});
		return designerModule;

	});


