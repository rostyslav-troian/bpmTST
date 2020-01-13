/**
 * Class of storage management
 */
Ext.define("Terrasoft.data.store.StoreManager", {

	extend: "Terrasoft.BaseObject",

	alternateClassName: "Terrasoft.StoreManager",

	singleton: true,

	/**
  * Storage of all created cache levels
  * @private
  * @type {Object[]}
  */
	stores: {},

	/**
  * Registers storage
  * @param {Object} storeConfig Storage Configuration
  */
	registerStore: function(storeConfig) {
		if (!storeConfig) {
			throw new Terrasoft.ArgumentNullOrEmptyException({
				argumentName: "storeConfig"
			});
		}
		if (!storeConfig.type) {
			throw new Terrasoft.ArgumentNullOrEmptyException({
				argumentName: "storeConfig.type"
			});
		}
		var type = storeConfig.type;
		var storeName = this.getStoreName(storeConfig);
		var store = Ext.create(type, {
			storeName: storeName,
			isCache: storeConfig.isCache
		});
		Terrasoft[storeName] = store;
		this.stores[storeName] = store;
		return store;
	},

	/**
  * Forms the name of the repository
  * @private
  * @param {Object} storeConfig
  * @return {String}
  */
	getStoreName: function(storeConfig) {
		if (!storeConfig.levelName) {
			throw new Terrasoft.ArgumentNullOrEmptyException({
				argumentName: "storeConfig.levelName"
			});
		}
		var storeNameSuffix = (storeConfig.isCache) ? "Cache" : "Store";
		return storeConfig.levelName + storeNameSuffix;
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 */
	constructor: function() {
		this.callParent(arguments);
		if (Terrasoft.storesConfig) {
			this.registerStores(Terrasoft.storesConfig);
		}
	},

	/**
  * It registers several repositories
  * @param {Object[]} storesConfig List of storage configurations
  */
	registerStores: function(storesConfig) {
		var configLength = storesConfig.length;
		for (var i = 0; i < configLength; i += 1) {
			var storeConfig = storesConfig[i];
			this.registerStore(storeConfig);
		}
	}

}, function() {
	var storeConfig = {
		levelName: "ClientCore",
		type: "Terrasoft.MemoryStore",
		isCache: true
	};
	Terrasoft.StoreManager.registerStore(storeConfig);
});