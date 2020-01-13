/**
 * Class collection of items. The elements may be of any type, the elements can be accessed by a key or index.
 */
Ext.define("Terrasoft.core.collections.Collection", {
	extend: "Terrasoft.core.collections.BaseCollection",
	alternateClassName: "Terrasoft.Collection",

	mixins: {
		sortable: "Terrasoft.Sortable",
		filterable: "Terrasoft.Filterable"
	},

	/**
	 * Composite collection object
	 * @private
	 * @type {Ext.util.MixedCollection}
	 */
	collection: null,

	/**
	 * Observable events.
	 * @private
	 * @type {String[]}
	 */
	observableEvents: [
		/**
		 * @event add
		 * Fires after adding an element to the collection, when called {@link #add}.
		 * @param {Object} item Inserted item.
		 * @param {Number} index Index.
		 * @param {String} key Key.
		 */
		"add",
		/**
		 * @event remove
		 * Fires after removing an item from the collection, when called {@link #remove}.
		 * @param {Object} item Removed item.
		 * @param {String} key Key.
		 */
		"remove",
		/**
		 * @event dataLoaded
		 * Fires after the collection is filled with data, when called {@link #loadAll}.
		 * @param {Terrasoft.Collection} collection
		 * @param {Array/Object/Terrasoft.Collection} items Added items
		 */
		"dataLoaded",
		/**
		 * @event clear
		 * Fires after the collection is cleaned, when called {@link #clear}.
		 */
		"clear",
		/**
		 * @event move
		 * Fires on move.
		 * @param {Number} fromIndex Moving element index.
		 * @param {Number} toIndex Destination index.
		 * @param {String} fromKey Moving element key.
		 */
		"move",
		/**
		 * @event replace
		 * Fires when item is replaced by another item.
		 * @param {Object} removedItem Removed item.
		 * @param {String} removedItemKey Removed item key.
		 * @param {Object} insertedItem Inserted item.
		 * @param {String} insertedItemKey Inserted item key.
		 * @param {Number} index Item index.
		 */
		"replace",
		/**
		 * @event changed
		 * Fires when any item was added or removed, when called {@link #add}, {@link #remove} or {@link #loadAll}.
		 * @param {Object} item Collection item.
		 * @param {String} key Item key.
		 */
		"changed",
		/**
		 * @event sorted
		 * Fires when items sorted
		 */
		"sorted"
	],

	/**
	 * Creates a shallow copy of this collection
	 * @return {Terrasoft.Collection} Copy of collection.
	 */
	clone: function() {
		var result = new this.self();
		result.collection = this.collection.clone();
		return result;
	},

	/**
	 * Extracts the key from an object.
	 * @param {Object} o The object to get the key from.
	 * @return {String} The key to use.
	 */
	getKey: null,

	/**
	 * Sorts the collection by the comparator function, sorts the same instance of the collection
	 * @param {Function} sortFn A comparator function that compares two elements. If the first element is greater,
	 * the function should return 1 if the first element is less than -1, and if the elements are equal then 0.
	 * @param {Mixed} sortFn.item1 First item.
	 * @param {Mixed} sortFn.item2 Second item.
	 * @param {Object} scope The scope of sortFn function.
	 */
	sortByFn: function(sortFn, scope) {
		this.collection.sortBy(sortFn.bind(scope || window));
		this.collection.each((item) => {
			delete item.$extCollectionIndex;
		});
	},

	/**
	 * Filter the collection by the filter function, return a new collection instance with the filtered elements.
	 * The source collection does not change.
	 * @param {Function} filterFn A filter function that checks the element and if the element satisfies the conditions
	 * returns true otherwise false.
	 * @param {Mixed} filterFn.item Item.
	 * @param {String} filterFn.key Item key.
	 * @param {Object} scope (optional) The scope of filterFn function.
	 * @return {Terrasoft.Collection} Returns a new instance of the filtered collection.
	 */
	filterByFn: function(filterFn, scope) {
		var result = new this.self();
		result.collection = this.collection.filterBy(filterFn, scope);
		return result;
	},

	/**
	 * Returns the first item which passes a truth test.
	 * @param {Function} fn Test function.
	 * @param {Object} scope The scope of Fn function.
	 */
	findByFn: function(fn, scope) {
		var items = this.getItems();
		var result = _.find(items, fn, scope);
		return result;
	},

	/**
	 * Returns a new collection with each element being the result of the Fn function.
	 * @param {Function} fn Converter function.
	 * @param {Object} scope The scope of Fn function.
	 * @return {Terrasoft.Collection}
	 */
	map: function(fn, scope) {
		var items = this.getItems();
		var result = new this.self();
		Terrasoft.each(items, function(item, key) {
			var newItem = fn.call(scope, item, key);
			result.add(key, newItem);
		}, this);
		return result;
	},

	/**
	 * Returns array with each element being the result of the Fn function.
	 * @param {Function} fn Converter function.
	 * @param {Object} scope The scope of Fn function.
	 * @return {Array}
	 */
	mapArray: function(fn, scope) {
		var items = this.getItems();
		var result = [];
		Terrasoft.each(items, function(item, key) {
			var newItem = fn.call(scope, item, key);
			result.push(newItem);
		}, this);
		return result;
	},

	/**
	 * Returns array with each element being the result of the findValueByPath function.
	 * @return {Array}
	 */
	mapArrayByPath: function(path) {
		return this.mapArray(function(item) {
			return Terrasoft.findValueByPath(item, path);
		}, this);
	},

	/**
	 * Returns array with each element being the result of the view model "get" function.
	 * @return {Array}
	 */
	mapArrayByAttr: function(attr) {
		return this.mapArray(function(item) {
			return item.get(attr);
		}, this);
	},

	/**
	 * Returns array with each element being the result of the methodName function.
	 * @return {Array}
	 */
	mapArrayByItemFn: function(methodName) {
		return this.mapArray(function(item) {
			return item[methodName]();
		}, this);
	},

	/**
	 * Checks index.
	 * @private
	 * @param {Number} index Index.
	 * @throws {Terrasoft.ItemNotFoundException} If collection does not have items with index throws exception.
	 */
	checkIndex: function(index) {
		if (index < 0 || index >= this.getCount()) {
			var message = Ext.String.format(
				"{0} [{1}] {2}",
				Terrasoft.Resources.Collection.ItemWithIndex,
				index,
				Terrasoft.Resources.Collection.DoesNotExists
			);
			throw new Terrasoft.ItemNotFoundException({message: message});
		}
	},

	/**
	 * Handles replacement event of the current item.
	 * @private
	 * @param {Object} config Replace information.
	 * @param {Mixed} config.removedItem Removed item.
	 * @param {String} config.removedItemKey Removed item key.
	 * @param {Mixed} config.insertedItem Inserted item.
	 * @param {String} config.insertedItemKey Inserted item key.
	 * @param {Number} config.index Item index.
	 */
	onReplaceItem: function(config) {
		if (this.fireEvent("replace", config) === false) {
			return;
		}
		this.onCollectionRemove(config.removedItem, config.removedItemKey);
		this.onCollectionAdd(config.index, config.insertedItem, config.insertedItemKey);
	},

	/**
	 * Creates an instance of the collection
	 * @param {Object} config Configuration object
	 * @return {Terrasoft.Collection} Returns the created collection instance
	 */
	constructor: function() {
		this.callParent(arguments);
		this.addEvents.apply(this, this.observableEvents);
		var collection = this.collection = Ext.create("Ext.util.MixedCollection");
		collection.on("add", this.onCollectionAdd, this);
		collection.on("remove", this.onCollectionRemove, this);
		if (Ext.isFunction(this.getKey)) {
			this.collection.getKey = this.getKey;
		}
	},

	/**
	 * The event handler for adding an item to the collection
	 * @protected
	 * @param {Number} index
	 * @param {Mixed} item Added item
	 * @param {String} key
	 */
	onCollectionAdd: function(index, item, key) {
		this.fireEvent("add", item, index, key);
		this.fireEvent("changed");
	},

	/**
	 * The event handler for removing an item from the collection
	 * @protected
	 * @param {Mixed} item Deleted item
	 * @param {String} key
	 */
	onCollectionRemove: function(item, key) {
		this.fireEvent("remove", item, key);
		this.fireEvent("changed");
	},

	/**
	 * Cleanup event handler
	 * @protected
	 * @param {Terrasoft.Collection} clearedItems Items that where cleared.
	 */
	onCollectionClear: function(clearedItems) {
		this.fireEvent("clear", this, clearedItems);
		this.fireEvent("changed");
	},

	/**
	 * Move event handler.
	 * @protected
	 * @param {Number} fromIndex Moving element index.
	 * @param {Number} toIndex Destination index.
	 * @param {String} fromKey Moving element name.
	 */
	onCollectionMove: function(fromIndex, toIndex, fromKey) {
		this.fireEvent("move", fromIndex, toIndex, fromKey);
	},

	/**
	 * Checks whether the collection is empty
	 * @override
	 * @return {Boolean} Returns true if there is no element in the collection
	 * false otherwise
	 */
	isEmpty: function() {
		return this.getCount() === 0;
	},

	/**
	 * Returns number of items in the collection.
	 * @override
	 * @return {Number} Number of items in the collection.
	 */
	getCount: function() {
		return this.collection.getCount();
	},

	/**
	 * Returns collection keys.
	 * @return {Array} Returns collection keys array.
	 */
	getKeys: function() {
		return this.collection.keys;
	},

	/**
	 * Returns collection elements.
	 * @return {Array} Returns collection elements array.
	 */
	getItems: function() {
		return this.collection.items;
	},

	/**
	 * @inheritdoc Terrasoft.core.collections.BaseCollection#get
	 * @override
	 * @throws {Terrasoft.ItemNotFoundException}
	 * Throws an exception{@link Terrasoft.ItemNotFoundException} if element with such key not found.
	 * For a safe receiving the item, use method {@link Terrasoft.Collection#find} or check with method {@link #contains}
	 */
	get: function(key) {
		if (!this.contains(key)) {
			throw new Terrasoft.ItemNotFoundException({
				message: Terrasoft.Resources.Collection.ItemWithKey + " " + key + " " +
				Terrasoft.Resources.Collection.DoesNotExists
			});
		}
		return this.collection.getByKey(key);
	},

	/**
	 * @inheritdoc Terrasoft.core.collections.BaseCollection#getByIndex
	 * @override
	 * @throws {Terrasoft.ItemNotFoundException}
	 * Throws an exception {@link Terrasoft.ItemNotFoundException} if an element is not found for such an index.
	 * To securely retrieve an item, use the {@link #find} method or check with
	 * the {@link #contains} method
	 */
	getByIndex: function(index) {
		var item = this.findByIndex(index);
		if (!item) {
			var resources = Terrasoft.Resources.Collection;
			var message = resources.ItemWithIndex + " [" + index + "] " + resources.DoesNotExists;
			var error = new Terrasoft.ItemNotFoundException({message: message});
			if (index === this.getCount()) {
				this.warning(error.toString());
			} else {
				throw error;
			}
		}
		return item;
	},

	/**
	 * Returns an element by index or null if the item is not found.
	 * @param {Number} index Collection index.
	 * @return {Mixed|null}
	 */
	findByIndex: function(index) {
		if (index < 0 || index >= this.getCount()) {
			return null;
		}
		return this.collection.getAt(index);
	},

	/**
	 * @inheritdoc Terrasoft.core.collections.BaseCollection#find
	 * @override
	 */
	find: function(key) {
		return this.collection.getByKey(key);
	},

	/**
	 * Returns an item by nested property value.
	 * See also {@link Terrasoft.utils.object#findValueByPath}
	 * @param {String} path Item properties name path delimited with dot.
	 * @param {Object} value Value.
	 * @return {Object} Item.
	 */
	findByPath: function(path, value) {
		return this.findByFn(function(item) {
			var itemValue = Terrasoft.findValueByPath(item, path);
			return _.isEqual(itemValue, value);
		}, this);
	},

	/**
	 * Returns an items by nested property value.
	 * @param {String} path Item properties name path delimited with dot.
	 * @param {Object} value Value.
	 * @return {Terrasoft.Collection}
	 */
	filterByPath: function(path, value) {
		return this.filterByFn(function(item) {
			var itemValue = Terrasoft.findValueByPath(item, path);
			return _.isEqual(itemValue, value);
		}, this);
	},

	/**
	 * Returns an item by attribute value.
	 * @param {String} attr Item attribute name.
	 * @param {Object} value Value.
	 * @return {Object} Item.
	 */
	findByAttr: function(attr, value) {
		return this.filterByFn(function(item) {
			return _.isEqual(item.get(attr), value);
		}, this).first();
	},

	/**
	 * Adds an item to the collection
	 * @override
	 * @param {String} key Key
	 * @param {Object} item Item
	 * @param {Number} [index] index for insertion, if not specified, it is ignored
	 * @return {Object} Returns the added item
	 */
	add: function(key, item, index) {
		this.callParent(arguments);
		var collection = this.collection;
		var addedItem = Ext.isNumber(index) ? collection.insert(index, key, item) : collection.add(key, item);
		return addedItem;
	},

	/**
	 * Adds item to the collection if it not exists by the specified key.
	 * @param {String} key Item key.
	 * @param {Mixed} item Item.
	 * @param {Number} [index] Optional, collection order index.
	 * @return {Mixed} if item exists returns null, otherwise returns added item
	 */
	addIfNotExists: function(key, item, index) {
		if (this.contains(key)) {
			return null;
		}
		return this.add(key, item, index);
	},

	/**
	 * Inserts the obj element at the specified index into the "index" collection
	 * @param {Number} index
	 * @param {String} key
	 * @param {Mixed} obj Inserted element
	 */
	insert: function(index, key, obj) {
		return this.collection.insert(index, key, obj);
	},

	/**
	 * Returns the index of an item
	 * @override
	 * @param {Mixed} obj Item
	 * @return {Number} Index
	 */
	indexOf: function(obj) {
		return this.collection.indexOf(obj);
	},

	/**
	 * Returns the index of an item by key.
	 * @param {String} key
	 * @return {Number} Index
	 */
	indexOfKey: function(key) {
		return this.collection.indexOfKey(key);
	},

	/**
	 * Removes an item from the collection
	 * @override
	 * @param {Mixed} item
	 * @return {Mixed} Returns the deleted item or false if nothing is deleted
	 */
	remove: function(item) {
		return this.removeByIndex(this.collection.indexOf(item));
	},

	/**
	 * Deletes an item by key
	 * @override
	 * @param {String} key
	 * @return {Mixed} Returns the deleted item or false if nothing is deleted
	 */
	removeByKey: function(key) {
		return this.removeByIndex(this.collection.indexOfKey(key));
	},

	/**
	 * Deletes an item by index
	 * @override
	 * @param {Number} index
	 * @return {Mixed} Returns the deleted item or false if nothing is deleted
	 */
	removeByIndex: function(index) {
		return this.collection.removeAt(index);
	},

	/**
	 * Checks if the specified key is in the collection
	 * @override
	 * @param {String} key
	 * @return {Boolean} Returns true if such key exists, otherwise false
	 */
	contains: function(key) {
		return this.collection.containsKey(key);
	},

	/**
	 * Goes through the collection keys and executes Fn function for each key. Fn function should return true.
	 * Returning False value from the function will stop executing the iteration.
	 * @override
	 * @param {Function} fn Function to execute.
	 * @param {Mixed} fn.item Collection element.
	 * @param {Number} fn.index Element index.
	 * @param {Number} fn.len Number of elements in collection
	 * @param {Object} scope (optional) Fn function execution context.
	 */
	each: function(fn, scope) {
		this.collection.each(fn, scope);
	},

	/**
	 * Goes async through the collection items and executes Fn function for each item.
	 * @param {Function} fn Function to execute. Call in scope context.
	 * @param {Function} callback Callback function, invoke after Fn function should be executed over each
	 * collection item.
	 * @param {Object} scope Callback function call context.
	 */
	eachAsync: function(fn, callback, scope) {
		var items = this.getItems();
		Terrasoft.eachAsync(items, fn, callback, scope);
	},

	/**
	 * Goes through the collection keys and executes Fn function for each key. Fn function should return true.
	 * Returning False value from the function will stop executing the iteration.
	 * @override
	 * @param {Function} fn Function to execute.
	 * @param {String} fn.key Element key.
	 * @param {Mixed} fn.item Element.
	 * @param {Number} fn.index Element index.
	 * @param {Number} fn.len Number of elements in collection.
	 * @param {Object} scope (optional) Fn function execution context.
	 */
	eachKey: function(fn, scope) {
		this.collection.eachKey(fn, scope);
	},

	/**
	 * Clears collection.
	 * @override
	 */
	clear: function() {
		var items = this.clone();
		var onClear = function () {
			this.onCollectionClear(items);
			this.collection.un("clear", onClear, this);
		};
		this.collection.on("clear", onClear, this);
		this.collection.clear();
	},

	/**
	 * Initiates filling data collection. When calling event is generated {@link #event-dataLoaded}.
	 * @throws {Terrasoft.UnsupportedTypeException} If items is array.
	 * @param {Terrasoft.core.collections.Collection} items Elements that will be initialized collection.
	 * @param {Object} [options] Extra options.
	 */
	loadAll: function(items, options) {
		if (Ext.isArray(items)) {
			throw new Terrasoft.UnsupportedTypeException({
				message: Terrasoft.Resources.Collection.ArrayUnsupportedInputType
			});
		}
		var collection = this.collection;
		this.suspendEvents(false);
		try {
			if (items instanceof Terrasoft.Collection) {
				items.eachKey(function(key, item) {
					if (options && options.mode === "top") {
						collection.insert(0, key, item);
					} else {
						collection.add(key, item);
					}
				}, this);
			} else {
				var newCollection = Ext.create("Terrasoft.Collection");
				Terrasoft.each(items, function(item, key) {
					newCollection.add(key, item);
				}, this);
				this.resumeEvents();
				this.loadAll(newCollection, options);
				return;
			}
		} finally {
			this.resumeEvents();
		}
		this.fireEvent("dataLoaded", this, items, options);
		this.fireEvent("changed");
	},

	/**
	 * Moves elements in collection.
	 * @param {Number} fromIndex Moved element index.
	 * @param {Number} toIndex Destination index.
	 */
	move: function(fromIndex, toIndex) {
		this.checkIndex(fromIndex);
		this.checkIndex(toIndex);
		var collection = this.collection;
		var removedItem = collection.getAt(fromIndex);
		var keys = this.getKeys();
		var removedItemKey = keys[fromIndex];
		collection.suspendEvents();
		collection.removeAt(fromIndex);
		collection.insert(toIndex, removedItemKey, removedItem);
		collection.resumeEvents();
		this.onCollectionMove(fromIndex, toIndex, removedItemKey);
	},

	/**
	 * Replaces item if it exists with another one.
	 * @param {Mixed} itemToReplace Item that will be removed from collection.
	 * @param {Mixed} newItem Item that will be inserted instead.
	 * @param {String} [newItemKey] Key, if not defined the key will not be changed.
	 */
	replace: function(itemToReplace, newItem, newItemKey) {
		var collection = this.collection;
		var index = collection.indexOf(itemToReplace);
		if (index === -1) {
			return;
		}
		var keys = this.getKeys();
		var removedItemKey = keys[index];
		var newKey = newItemKey || removedItemKey;
		collection.suspendEvents();
		collection.removeAt(index);
		collection.insert(index, newKey, newItem);
		collection.resumeEvents();
		var itemReplaceData = {
			removedItem: itemToReplace,
			removedItemKey: removedItemKey,
			insertedItem: newItem,
			insertedItemKey: newKey,
			index: index
		};
		this.onReplaceItem(itemReplaceData);
	},

	/**
	 * Returns first element from search result. If no such element found or no search function passed - returns null.
	 * @param {Function} filterFn Search function.
	 * @param {Object} scope Filter function scope.
	 * @returns {Mixed} Collection element.
	 */
	firstOrDefault: function(filterFn, scope) {
		return filterFn ? this.filterByFn(filterFn, scope).first() : this.first();
	},

	/**
	 * Produces the set difference of two collections by using the defaultEqualityFn to compare items
	 * if no equalityFn passed.
	 * @param collection {Terrasoft.core.collections.Collection} Collection whose elements that also occur
	 * in the first collection will cause those elements to be removed from the returned sequence.
	 * @param equalityFn {Function} Equality function.
	 * @param equalityFn.value1 {Object} First object to compare.
	 * @param equalityFn.value2 {Object} Second object to compare.
	 * @param equalityFn.key1 {Object} First key to compare.
	 * @param equalityFn.key2 {Object} Second key to compare.
	 * @param scope {Object} Equality function scope.
	 * @returns {Terrasoft.core.collections.Collection} A sequence that contains the set difference of the elements
	 * of two sequences.
	 */
	except: function(collection, equalityFn, scope) {
		equalityFn = equalityFn || this.defaultEqualityFn;
		var result = Ext.create("Terrasoft.Collection");
		var keys = this.getKeys();
		var items = this.getItems();
		items.forEach(function(value, index) {
			var currentKey = keys[index];
			var currentItem = items[index];
			var containsInExceptedCollection = collection.any(function(value, key) {
				return equalityFn.call(scope, currentItem, value, currentKey, key);
			}, this);
			if (!containsInExceptedCollection) {
				result.add(currentKey, currentItem);
			}
		}, this);
		return result;
	},

	/**
	 * Default items equality function.
	 * @private
	 * @param value1 {Object} First object to compare.
	 * @param value2 {Object} Second object to compare.
	 * @param key1 {Object} First key to compare.
	 * @param key2 {Object} Second key to compare.
	 * @returns {boolean}
	 */
	defaultEqualityFn: function(value1, value2, key1, key2) {
		return key1 === key2 || value1 === value2;
	},

	/**
	 * Determines whether any element of a collection satisfies a condition.
	 * @param predicate
	 * @param scope
	 * @returns {boolean}
	 */
	any: function(predicate, scope) {
		var keys = this.getKeys();
		var items = this.getItems();
		var result = items.some(function(value, index) {
			var key = keys[index];
			return predicate.call(scope, value, key);
		}, this);
		return result;
	},

	/**
	 * Projects each element of a collection into a new form.
	 * @param selectFn {Function} Selection function.
	 * @param selectFn.item {Object} Item value.
	 * @param scope {Object} Selection fn scope.
	 * @returns {Terrasoft.Collection} Collection selected.data
	 */
	select: function(selectFn, scope) {
		return this.selectKeyValue(function(value, key) {
			return {
				key: key,
				value: selectFn.call(scope, value)
			};
		}, scope);
	},

	/**
	 * Projects each key value pair of a collection into a new form.
	 * @param selectFn {Function} Selection function.
	 * @param selectFn.value {Object} Item value.
	 * @param selectFn.key {Object} Item key.
	 * @param scope {Object} Selection fn scope.
	 * @returns {Terrasoft.Collection} Collection selected.
	 */
	selectKeyValue: function(selectFn, scope) {
		var result = Ext.create("Terrasoft.Collection");
		var keys = this.getKeys();
		var items = this.getItems();
		items.forEach(function(value, index) {
			var key = keys[index];
			var newItem = selectFn.call(scope, value, key);
			if (newItem.value) {
				result.add(newItem.key, newItem.value);
			}
		}, this);
		return result;
	},

	/**
	 * Returns a specified number of contiguous elements from the start of a collection.
	 * @param takeCount {Number} Number of items to take.
	 * @returns {Terrasoft.Collection} Collection taken.
	 */
	take: function(takeCount) {
		return this.getRange(0, takeCount);
	},

	/**
	 * Returns a specified number of elements from the start index of a collection.
	 * @param startIndex {Number} Index at which range starts.
	 * @param count {Number} The number of elements in the range.
	 * @returns {Terrasoft.Collection} Collection with given range.
	 */
	getRange: function(startIndex, count) {
		var result = Ext.create("Terrasoft.Collection");
		var collectionCount = this.getCount();
		var endIndex = startIndex + count;
		if (endIndex > collectionCount) {
			endIndex = collectionCount;
		}
		var keys = this.getKeys();
		var items = this.getItems();
		for (var i = startIndex; i < endIndex; i++) {
			result.add(keys[i], items[i]);
		}
		return result;
	},

	/**
	 * Returns first element.
	 * @return {Mixed} Collection element.
	 */
	first: function() {
		return this.collection.first();
	},

	/**
	 * Returns last element.
	 * @return {Mixed} Collection element.
	 */
	last: function() {
		return this.collection.last();
	},

	/**
	 * Reload collection data.
	 * @param {Object/Terrasoft.Collection} items Elements that will be initialized collection.
	 */
	reloadAll: function(items) {
		this.clear();
		this.loadAll(items);
	}

});
