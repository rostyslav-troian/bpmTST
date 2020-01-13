/**
 */
Ext.define("BaseSchemaDesignerStorageMixin", {
	alternateClassName: "Terrasoft.BaseSchemaDesignerStorageMixin",

	//region Constants: Public

	/**
	 * Schema metadata template.
	 * @type {String}
	 */
	SCHEMA_METADATA_TEMPLATE: "{\"metaData\": {\"schema\": {0}}}",

	//endregion

	//region Properties: Private

	/**
	 * Instance of the LocalStore.
	 * @type {Terrasoft.LocalStore}
	 */
	localStore: null,

	//endregion

	//region Methods: Private

	/**
	 * Returns schema identifier for local storage.
	 * @private
	 * @return {String}
	 */
	getStorageLocationHref: function() {
		return window.location.href;
	},

	/**
	 * Saves schema identifier for local storage.
	 * @private
	 */
	saveLocationHrefToStorage: function() {
		var storageLocationHref = this.getStorageLocationHref();
		this.localStore.setItem(this.storageLocationHref, storageLocationHref);
	},

	/**
	 * Saves schema meta data to local storage.
	 * @private
	 */
	saveSchemaMetaDataToStorage: function() {
		var schema = this.get("Schema");
		var serializedSchema = schema.serialize();
		var metaData = Ext.String.format(this.SCHEMA_METADATA_TEMPLATE, serializedSchema);
		this.localStore.setItem(this.storageSchemaMetadata, metaData);
	},

	/**
	 * Saves schema resources to local storage.
	 * @private
	 */
	saveSchemaResourcesToStorage: function() {
		var schema = this.get("Schema");
		var resources = {};
		schema.getLocalizableValues(resources);
		this.localStore.setItem(this.storageSchemaResources, resources);
	},

	/**
	 * Saves current selected item name to local storage.
	 * @private
	 */
	saveSelectedItemNameToStorage: function() {
		var loadedPropertiesItemName = this.get("LoadedPropertiesItemName");
		this.localStore.setItem(this.storageLoadedPropertiesItemName, loadedPropertiesItemName);
	},

	/**
	 * Restores schema by metadata and resources.
	 * @private
	 * @return {Terrasoft.BaseProcessSchema|null}
	 */
	getSchemaFromStorage: function() {
		var managerItem = this.get("SchemaManagerItem");
		var metaData = this.localStore.getItem(this.storageSchemaMetadata);
		var resources = this.localStore.getItem(this.storageSchemaResources);
		if (!metaData || !resources) {
			return null;
		}
		var storageSchema = Terrasoft.SchemaDesignerUtilities.createInstanceByMetaData({
			metaData: metaData,
			schemaClassName: managerItem.instanceClassName
		});
		storageSchema.loadLocalizableValuesByUIds(resources);
		return storageSchema;
	},

	/**
	 * Unload currently loaded item property page.
	 * @private
	 */
	unloadCurrentPropertyPage: function() {
		var elementName = this.get("LoadedPropertiesItemName");
		if (elementName) {
			var moduleId = this.getPropertiesModuleId(elementName);
			this.set("LoadedPropertiesItemName", null);
			this.sandbox.unloadModule(moduleId);
		}
	},

	/**
	 * Returns flag indicating that the schema has been stored in storage.
	 * @private
	 * @return {Boolean}
	 */
	getIsSchemaStored: function() {
		var locationHref = this.getStorageLocationHref();
		var storageLocationHref = this.localStore.getItem(this.storageLocationHref);
		return locationHref === storageLocationHref;
	},

	//endregion

	//region Methods: Public

	/**
	 * Init storage mixin.
	 */
	init: function() {
		if (!Terrasoft.DomainCache) {
			var domainCacheConfig = {
				levelName: "Domain",
				type: "Terrasoft.LocalStore",
				isCache: true
			};
			Terrasoft.StoreManager.registerStores([domainCacheConfig]);
		}
		this.localStore = Terrasoft.DomainCache;
	},

	/**
	 * Initializes local storage schema.
	 */
	initLocalStorageSchema: function() {
		this.set("IsLoadStoragePanelVisible", this.getIsLoadStoragePanelVisible());
	},

	/**
	 * Returns flag indicating that the storage panel is visible.
	 * @return {Boolean}
	 */
	getIsLoadStoragePanelVisible: function() {
		return this.getIsSchemaStored();
	},

	/**
	 * Saves schema to local storage.
	 */
	//TODO CRM-30829
	saveSchemaToStorage: function() {
		this.set("IsLoadStoragePanelVisible", false);
		if (!this.get("IsSchemaChanged")) {
			return;
		}
		this.saveLocationHrefToStorage();
		this.saveSchemaMetaDataToStorage();
		this.saveSchemaResourcesToStorage();
		this.saveSelectedItemNameToStorage();
	},

	/**
	 * Loads schema from local storage.
	 */
	//TODO CRM-30829
	loadSchemaFromStorage: function(callback, scope) {
		this.unloadCurrentPropertyPage();
		var managerItem = this.get("SchemaManagerItem");
		var isNewSchema = managerItem.isNew();
		managerItem.clearInstance();
		this.clearSchemaItems();
		var storageSchema = this.getSchemaFromStorage();
		if (!storageSchema) {
			return;
		}
		if (isNewSchema) {
			var manager = this.schemaManager;
			manager.items.remove(managerItem);
			managerItem = manager.createManagerItem({uId: storageSchema.uId});
			manager.addItem(managerItem);
			this.set("SchemaUId", storageSchema.uId);
			this.set("SchemaManagerItem", managerItem);
		}
		managerItem.setInstance(storageSchema);
		var newStatus = isNewSchema ? Terrasoft.ModificationStatus.NEW : Terrasoft.ModificationStatus.UPDATED;
		managerItem.setStatus(newStatus);
		this.set("IsSchemaChanged", true);
		this.initSchema(storageSchema, function() {
			this.onAfterGetSchemaInstance(storageSchema, function() {
				this.loadItems(storageSchema);
				var lastSelectedItemName = this.localStore.getItem(this.storageLoadedPropertiesItemName);
				var element = this.findItemByKey(lastSelectedItemName);
				if (element) {
					this.set("LastSelectedItemUId", null);
					this.selectItem(lastSelectedItemName);
					this.loadPropertiesPage(lastSelectedItemName);
				} else {
					this.clearSelection();
					this.loadSchemaPropertiesPage();
				}
				Ext.callback(callback, scope || this);
			}, this);
		}, this);
	},

	/**
	 * Initializes schema.
	 * @param {Terrasoft.BaseProcessSchema} schema Schema instance.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	initSchema: function(schema, callback, scope) {
		callback.call(scope);
	},

	/**
	 * Clears schema from local storage.
	 */
	clearSchemaStorageInfo: function() {
		this.set("IsLoadStoragePanelVisible", false);
		var store = this.localStore;
		store.removeItem(this.storageLocationHref);
		store.removeItem(this.storageSchemaMetadata);
		store.removeItem(this.storageSchemaResources);
		store.removeItem(this.storageLoadedPropertiesItemName);

	}

	//endregion

});
