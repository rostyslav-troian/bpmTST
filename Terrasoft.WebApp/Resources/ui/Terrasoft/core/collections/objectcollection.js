/**
 * Class collection of objects
 *
 * It is assumed that each element of the collection is an object.
 * When a member is placed in a collection, the parentCollection property is set,
 * so the elements are aware of their collection. This collection can be built into another (parent) collection,
 * so you can create hierarchical structures of any nesting.
 *
 * See also: {@link Terrasoft.ObjectCollectionItem}.
 */
Ext.define("Terrasoft.core.collections.ObjectCollection", {
	extend: "Terrasoft.core.collections.Collection",
	alternateClassName: "Terrasoft.ObjectCollection",

	mixins: {
		serializable: "Terrasoft.Serializable"
	},

	/**
	 * Initiating Collection
	 * @private
	 * @type {Object}
	 */
	items: null,

	/**
	 * Element key template for automatic naming
	 * @protected
	 * @type {String}
	 */
	itemKeyTemplate: "Item",

	/**
	 * Counter of items for automatic creation
	 * @protected
	 * @type {Number}
	 */
	itemKeyCounter: 0,

	/**
	 * Item class
	 * @protected
	 * @type {String}
	 */
	itemClass: "Terrasoft.ObjectCollectionItem",

	/**
	 * Link to the parent collection
	 * @type {Terrasoft.ObjectCollection}
	 */
	parentCollection: null,

	/**
	 * Creates an instance of the object
	 * @param {Object} config Configuration object
	 */
	constructor: function() {
		this.callParent(arguments);
		var items = this.items;
		if (items) {
			for (var itemName in items) {
				if (items.hasOwnProperty(itemName)) {
					this.add(itemName, items[itemName]);
				}
			}
		}
		this.items = null;
	},

	/**
	 * Copies the properties for serialization to the serialized object. Implements the mixin interface
	 * {@link Terrasoft.Serializable}
	 * @protected
	 * @override
	 * @param {Object} serializableObject Serialized object
	 * @param {Object} serializationInfo Serialization Options
	 */
	getSerializableObject: function(serializableObject, serializationInfo) {
		if (serializationInfo.serializeFilterManagerInfo) {
			serializableObject.className = this.alternateClassName;
		}
		var items = serializableObject.items = {};
		this.eachKey(function(key, item) {
			if (this.needSerializeItem(key, item, serializationInfo)) {
				items[key] = this.getSerializableProperty(item);
			}
		}, this);
	},

	/**
	 * Defines for each element of the collection whether it is necessary to serialize it when serializing the collection.
	 * @protected
	 * @param {String} key Collection item key
	 * @param {Object} item Collection item
	 * @param {Object} serializationInfo Serialization Options
	 * @return {Boolean} Returns true if the element should be serialized, otherwise false.
	 */
	needSerializeItem: function() {
		return true;
	},

	/**
	 * Returns the item's unique key when auto-added. Uses a template {@link #itemKeyTemplate}
	 * and the {@link #itemKeyCounter} counter
	 * @protected
	 * @return {String} Returns the generated unique key for the added object
	 */
	getUniqueKey: function() {
		var key;
		do {
			key = this.itemKeyTemplate + this.itemKeyCounter;
			this.itemKeyCounter++;
		} while (this.contains(key));
		return key;
	},

	/**
	 * The event handler for adding an item to the collection
	 * @protected
	 * @override
	 * @param {Number} index
	 * @param {Mixed} item The added item
	 * @param {String} key
	 */
	onCollectionAdd: function(index, item) {
		this.setItemParentCollection(item, this);
		this.callParent(arguments);
	},

	/**
	 * The event handler for deleting an item from the collection
	 * @protected
	 * @override
	 * @param {Mixed} item The item to delete
	 * @param {String} key
	 */
	onCollectionRemove: function(item) {
		this.callParent(arguments);
		this.setItemParentCollection(item, null);
	},

	/**
	 * Set the parent collection for the current collection instance. Used if this collection
	 * is added as an item to some parent collection.
	 * @protected
	 * @param {Terrasoft.ObjectCollection} collection parent collection
	 */
	setParentCollection: function(collection) {
		this.parentCollection = collection;
	},

	/**
	 * Sets the element to the parent collection
	 * @protected
	 * @param {Object} item Element of the collection
	 * @param {Terrasoft.ObjectCollection} collection
	 */
	setItemParentCollection: function(item, collection) {
		if (item.setParentCollection) {
			item.setParentCollection(collection);
		} else {
			item.parentCollection = collection;
		}
	},

	/**
	 * Creates a new collection item
	 * @param {Object} config A configuration object for creating an item
	 * @return {Object} Returns the created element of type {@link #itemClass}.
	 * The element is not added to the collection automatically.
	 */
	createItem: function(config) {
		return Ext.create(this.itemClass, config);
	},

	/**
	 * Adds an element with automatic key generation. When generating a key, properties are used
	 * {@link #itemKeyTemplate} and {@link #itemKeyCounter}.
	 * @param {Object} item The item to add
	 * @param {Number} [index] Index for insertion
	 * @return {Object} Returns the added item
	 */
	addItem: function(item, index) {
		return this.add(this.getUniqueKey(), item, index);
	},

	/**
	 * Initiates filling data collection. When calling event is generated {@link #event-dataLoaded}.
	 * @param {Object/Terrasoft.Collection/Array} items Elements that will be initialized collection.
	 * @override
	 */
	loadAll: function(items, options) {
		if (Ext.isArray(items)) {
			var itemsObject = {};
			Terrasoft.each(items, function(item) {
				itemsObject[this.getUniqueKey()] = item;
			}, this);
			this.loadAll(itemsObject, options);
		} else {
			this.callParent(arguments);
		}
	},

	/**
	 * Clears the collection. When you clear all elements, the parentCollection property is set to null.
	 * @override
	 */
	clear: function() {
		var collection = this.collection;
		collection.each(function(item) {
			this.setItemParentCollection(item, null);
		}, this);
		this.callParent(arguments);
	}

});
