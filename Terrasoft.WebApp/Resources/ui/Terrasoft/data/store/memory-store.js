/**
 * Key-value store at the JavaScript level
 */
Ext.define("Terrasoft.data.store.MemoryStore", {
	extend: "Terrasoft.core.BaseObject",
	alternateClassName: "Terrasoft.MemoryStore",

	/**
	 * Repository name
	 * @protected
	 * @type {String}
	 */
	storeName: "",

	/**
	 * Indicates the type of the repository. If true - cache type, else store type
	 * @private
	 * @type {Boolean}
	 */
	isCache: null,

	/**
	 * Data store
	 * @private
	 * @type {Object}
	 */
	storage: null,

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 */
	constructor: function() {
		this.callParent(arguments);
		this.storage = {};
	},

	/**
	 * Saves key data in the storage
	 * @param {String} key
	 * @param {String/Array/Object} value
	 */
	setItem: function(key, value) {
		Terrasoft.checkArguments(arguments, "key");
		this.storage[key] = value;
	},

	/**
	 * Gets data from the store by key
	 * @param {String} key
	 * @return {String/Array/Object}
	 */
	getItem: function(key) {
		var keyExists = this.storage.hasOwnProperty(key);
		return (keyExists) ? this.storage[key] : undefined;
	},

	/**
	 * Removes data from the store by key
	 * @param {String} key
	 */
	removeItem: function(key) {
		delete this.storage[key];
	}

});