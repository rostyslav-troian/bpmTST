/**
 * @abstract
 */
Ext.define("Terrasoft.manager.BaseManager", {
	extend: "Terrasoft.core.BaseObject",
	alternateClassName: "Terrasoft.BaseManager",

	mixins: {
		outdatedSchemaNotificationMixin: "Terrasoft.OutdatedSchemaNotificationMixin"
	},

	//region Properties: Public

	/**
	 * Function of filtering the elements of the manager.
	 * @property {Function} filterFn
	 */
	filterFn: null,

	// endregion

	//region Properties: Protected

	/**
	 * Name of the manager item class.
	 * @protected
	 * @property {String} itemClassName
	 */
	itemClassName: "Terrasoft.BaseManagerItem",

	/**
	 * Collection of elements
	 * @protected
	 * @property {Terrasoft.Collection} items
	 */
	items: null,

	// endregion

	// region Methods: Protected

	/**
	 * Remove manager item handler.
	 * @protected
	 * @param {Object} item Manager item.
	 */
	onRemoveManagerItem: function(item) {
		this.fireEvent("removeManagerItem", item, this);
	},

	// endregion

	//region Methods: Private

	/**
	 * Lets the collection of the manager elements be deleted, removing the items marked for deletion from it.
	 * @private
	 * @return {Terrasoft.Collection} Deleted elements.
	 */
	refreshItemsCollection: function() {
		var deletedItems = this.items.filterByFn(function(item) {
			return item.isDeleted;
		});
		deletedItems.each(function(item) {
			this.items.remove(item);
		}, this);
		return deletedItems;
	},

	//endregion

	//region Methods: Public

	/**
	 *Creates an instance of the object.
	 */
	constructor: function() {
		this.callParent(arguments);
		this.items = new Terrasoft.Collection();
		this.addEvents(
			/**
			 * Remove manager item event.
			 * @event
			 */
			"removeManagerItem"
		);
		this.subscribeOnServerChannelMessage();
	},

	/**
	 * Filters the collection by the filter function, returns a new collection instance with the filtered elements.
	 * The source collection does not change.
	 * @param {Function} filterFn A filter function that checks the element and if the element satisfies conditions
	 * returns true otherwise false
	 * @param {Mixed} filterFn.item Element.
	 * @param {String} filterFn.key The item's key.
	 * @param {Object} scope (optional) Context for the filterFn function.
	 * @return {Terrasoft.Collection} Returns a new instance of the filtered collection.
	 */
	filterByFn: function(filterFn, scope) {
		return this.items.filterByFn(filterFn, scope);
	},

	/**
	 * Returns the first item which passes a truth test.
	 * @param {Function} fn Test function.
	 * @param {Object} scope The scope of Fn function.
	 * @return {Terrasoft.manager.BaseManagerItem}
	 */
	findByFn: function(fn, scope) {
		return this.items.findByFn(fn, scope);
	},

	/**
	 * Checks if the specified key is in the collection.
	 * @param {String} key Key.
	 * @return {Boolean} Returns true if such an element exists, otherwise false.
	 */
	contains: function(key) {
		return this.items.contains(key);
	},

	/**
	 * Searches for items by ID.
	 * @param {String} id The identifier of the element.
	 * @return {Terrasoft.BaseManagerItem} Element.
	 */
	findItem: function(id) {
		return this.items.find(id);
	},

	/**
	 * Returns an element by an identifier.
	 * @throws {Terrasoft.ItemNotFoundException}
	 * throws an exception {@link Terrasoft.ItemNotFoundException} if an element with such an identifier is not found.
	 * @param {String} id Item ID
	 * @return {Terrasoft.BaseManagerItem} Element.
	 */
	getItem: function(id) {
		return this.items.get(id);
	},

	/**
	 * Alias for {@link Terrasoft.manager.BaseManager#getItem}
	 * @inheritdoc Terrasoft.manager.BaseManager#getItem
	 */
	get: function(id) {
		return this.getItem(id);
	},

	/**
	 * Element creation function.
	 * @param {Object} config The item settings object.
	 * @return {Terrasoft.BaseManagerItem} Created item.
	 */
	createManagerItem: function(config) {
		return Ext.create(this.itemClassName, config);
	},

	/**
	 * The function of adding an element.
	 * @throws {Terrasoft.NullOrEmptyException}
	 * throws an exception {@link Terrasoft.NullOrEmptyException} if the parameter is empty.
	 * @throws {Terrasoft.UnsupportedTypeException}
	 * throws an exception {@link Terrasoft.UnsupportedTypeException} if not of the appropriate type.
	 * @param {Terrasoft.BaseManagerItem} item Element.
	 * @return {Terrasoft.BaseManagerItem} The item was added.
	 */
	addItem: function(item) {
		if (!item) {
			throw new Terrasoft.NullOrEmptyException();
		}
		if (item.alternateClassName !== this.itemClassName) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		item.on("remove", this.onRemoveManagerItem, this);
		return this.items.add(item.id, item);
	},

	/**
	 * Returns a copy of the item.
	 * @param {String} id of the selected tab.
	 * @return {Object} Element.
	 */
	copyItem: function(id) {
		var item = this.getItem(id);
		return item.copy();
	},

	//endregion

	//region Methods: Protected

	/**
	 * Deletes element by Id.
	 * @param {String} id Element Id.
	 */
	remove: function(id) {
		var item = this.getItem(id);
		item.remove();
	},

	/**
	 * Removes item if if exists.
	 * @param {String} id Item identifier.
	 */
	removeIfExists: function(id) {
		var item = this.findItem(id);
		if (item) {
			item.remove();
			return true;
		}
		return false;
	},

	/**
	 * Returns a collection of items.
	 * @override
	 * @throws {Terrasoft.InvalidObjectState}
	 * Throws an exception {@link Terrasoft.InvalidObjectState} The filter function is not set.
	 * @param {Object} [config] The object of the function parameters.
	 * @param {Boolean} config.useFilterFn A sign of using the filter function.
	 * @return {Terrasoft.Collection} A collection of items.
	 */
	getItems: function(config) {
		config = config || {};
		var resultCollection;
		var useFilterFn = config.useFilterFn;
		if (useFilterFn) {
			if (!Ext.isFunction(this.filterFn)) {
				throw new Terrasoft.InvalidObjectState({
					message: Terrasoft.Resources.Managers.Exceptions.FilterFunctionIsNotInitialized
				});
			}
			resultCollection = this.items.filterByFn(this.filterFn);
		} else {
			resultCollection = this.items;
		}
		return resultCollection;
	},

	/**
	 * Saves the changes to the manager items.
	 * @protected
	 * @return {Terrasoft.Collection} Deleted items.
	 */
	save: function() {
		return this.refreshItemsCollection();
	},

	/**
	 * Removes all items from the collection
	 * @protected
	 */
	clear: function() {
		this.items.each(function(item) {
			Terrasoft.safeDestroy(item);
		});
		this.items.clear();
	}

	// endregion

});
