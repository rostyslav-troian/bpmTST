Terrasoft.configuration.Structures["MobileGridDesignerModule"] = {innerHierarchyStack: ["MobileGridDesignerModule"], structureParent: "MobileBaseDesignerModule"};
define("MobileGridDesignerModule", ["ext-base", "MobileGridDesignerModuleResources", "MobileBaseDesignerModule",
		"MobileGridDesignerSettings"],
	function(Ext, resources) {

		/**
		 * @class Terrasoft.configuration.MobileGridDesignerViewConfig
		 * #####, ############ ############ ############# ### ###### ######### #######.
		 */
		Ext.define("Terrasoft.configuration.MobileGridDesignerViewConfig", {
			extend: "Terrasoft.MobileBaseDesignerViewConfig",
			alternateClassName: "Terrasoft.MobileGridDesignerViewConfig",

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewConfig#getDesignerItemsView
			 * @overridden
			 */
			getDesignerItemsView: function() {
				var primaryColumnConfig = this.getGridPrimaryColumnViewConfig();
				var subtitleColumnsConfig = this.getGridSubtitleColumnsViewConfig();
				var groupColumnsConfig = this.getGridGroupColumnsViewConfig();
				return [primaryColumnConfig, subtitleColumnsConfig, groupColumnsConfig];
			},

			/**
			 * Returns view config for grid primary column.
			 * @protected
			 * @virtual
			 * @returns {Object} Configuration.
			 */
			getGridPrimaryColumnViewConfig: function() {
				var designerSettings = this.designerSettings;
				var itemsViewConfig = this.getGridLayoutEditItemsViewConfig({
					name: designerSettings.name,
					maxRows: 1
				});
				var config = {
					caption: { "bindTo": "Resources.Strings.GridColumnsLabelCaption" },
					disableTools: true,
					name: designerSettings.name,
					itemType: Terrasoft.ViewItemType.CONTROL_GROUP,
					items: itemsViewConfig
				};
				return config;
			},

			/**
			 * Returns view config for grid subtitle columns.
			 * @protected
			 * @virtual
			 * @returns {Object} Configuration.
			 */
			getGridSubtitleColumnsViewConfig: function() {
				var name = "SubtitleColumns";
				var itemsViewConfig = this.getGridLayoutEditItemsViewConfig({
					name: name
				});
				var config = {
					caption: { "bindTo": "Resources.Strings.GridSubtitleColumnsLabelCaption" },
					disableTools: true,
					name: name,
					itemType: Terrasoft.ViewItemType.CONTROL_GROUP,
					items: itemsViewConfig
				};
				return config;
			},

			/**
			 * Returns view config for grid group columns.
			 * @protected
			 * @virtual
			 * @returns {Object} Configuration.
			 */
			getGridGroupColumnsViewConfig: function() {
				var name = "GroupColumns";
				var itemsViewConfig = this.getGridLayoutEditItemsViewConfig({
					name: name
				});
				var config = {
					caption: { "bindTo": "Resources.Strings.GridGroupColumnsLabelCaption" },
					disableTools: true,
					name: name,
					itemType: Terrasoft.ViewItemType.CONTROL_GROUP,
					items: itemsViewConfig
				};
				return config;
			}

		});

		/**
		 * @class Terrasoft.configuration.MobileGridDesignerViewModel
		 * ##### ###### ############# ###### ######### #######.
		 */
		Ext.define("Terrasoft.configuration.MobileGridDesignerViewModel", {
			extend: "Terrasoft.MobileBaseDesignerViewModel",
			alternateClassName: "Terrasoft.MobileGridDesignerViewModel",

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#constructor
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this.initResourcesValues(resources);
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#init
			 * @overridden
			 */
			init: function() {
				var designerSettings = this.designerSettings;
				var name = designerSettings.name;
				this.generateGridLayoutEditViewBindingData(name, designerSettings.items);
				this.generateControlGroupBindingData(name);
				this.generateGridLayoutEditViewBindingData("SubtitleColumns", designerSettings.subtitleItems);
				this.generateControlGroupBindingData("SubtitleColumns");
				this.generateGridLayoutEditViewBindingData("GroupColumns", designerSettings.groupItems);
				this.generateControlGroupBindingData("GroupColumns");
				this.callParent(arguments);
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#onAddGridLayoutItemButtonClick
			 * @overridden
			 */
			onAddGridLayoutItemButtonClick: function() {
				var tag = arguments[3];
				this.openStructureExplorer({
					entitySchemaName: this.designerSettings.entitySchemaName,
					callback: Ext.bind(this.gridLayoutItemAddedCallback, this, [tag], true)
				});
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#onRemoveGridLayoutItemButtonClick
			 * @overridden
			 */
			onRemoveGridLayoutItemButtonClick: function() {
				var collectionName = arguments[3];
				this.removeSelectedItemsFromCollection(collectionName);
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#onCollectionChange
			 * @overridden
			 */
			onCollectionChange: function(collection, name) {
				this.callParent(arguments);
				if (name === this.designerSettings.name) {
					var enableAddPropertyName = this.getEnableAddPropertyName(name);
					var enableAdd = collection.getCount() === 0;
					this.set(enableAddPropertyName, enableAdd);
				}
			},

			/**
			 * ############ ######### ###### ## #### ######### #######.
			 * @protected
			 * @virtual
			 * @param {Object} explorerColumnConfig ############ #######.
			 */
			gridLayoutItemAddedCallback: function(explorerColumnConfig, collectionName) {
				var columnConfig = this.getColumnConfigFromStructureExplorer(explorerColumnConfig);
				var designerSettings = this.designerSettings;
				var columnItem = designerSettings.createColumnItem(columnConfig);
				this.addColumnItemToGridLayoutCollection(collectionName, columnItem);
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#generateDesignerSettingsConfig
			 * @overridden
			 */
			generateDesignerSettingsConfig: function() {
				var designerSettingsConfig = this.callParent(arguments);
				var name = this.designerSettings.name;
				var itemsCollection = this.getItemsCollectionByName(name);
				designerSettingsConfig.items = this.generateSettingsConfigCollectionItems(itemsCollection);
				itemsCollection = this.getItemsCollectionByName("SubtitleColumns");
				designerSettingsConfig.subtitleItems = this.generateSettingsConfigCollectionItems(itemsCollection);
				itemsCollection = this.getItemsCollectionByName("GroupColumns");
				designerSettingsConfig.groupItems = this.generateSettingsConfigCollectionItems(itemsCollection);
				return designerSettingsConfig;
			}

		});

		/**
		 * @class Terrasoft.configuration.MobileGridDesignerModule
		 * ##### ###### ######### ####### ########## ##########.
		 */
		var designerModule = Ext.define("Terrasoft.configuration.MobileGridDesignerModule", {
			extend: "Terrasoft.MobileBaseDesignerModule",
			alternateClassName: "Terrasoft.MobileGridDesignerModule",

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerModule#viewModelClassName
			 * @overridden
			 */
			viewModelClassName: "Terrasoft.MobileGridDesignerViewModel",

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerModule#viewModelConfigClassName
			 * @overridden
			 */
			viewModelConfigClassName: "Terrasoft.MobileGridDesignerViewConfig",

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerModule#designerSettingsClassName
			 * @overridden
			 */
			designerSettingsClassName: "Terrasoft.MobileGridDesignerSettings"

		});
		return designerModule;

	});


