/**
 * @abstract
 * The base class of the collection of elements.
 * Elements can be of any type, elements can be accessed either by key or by index.
 */
Ext.define("Terrasoft.core.collections.BaseCollection", {
	extend: "Terrasoft.core.BaseObject",
	alternateClassName: "Terrasoft.BaseCollection",

	/**
	 * Checks if there is an element with such a key before adding an element.
	 * @private
	 * @throws Throws an exception {@link Terrasoft.ItemAlreadyExistsException} when adding an element with a key,
	 * which already exists
	 * @param {String} key
	 */
	checkDuplicates: function(key) {
		if (this.contains(key)) {
			throw new Terrasoft.ItemAlreadyExistsException({
				message: Terrasoft.Resources.Collection.ItemWithKey + " \"" + key + "\" " +
					Terrasoft.Resources.Collection.AlreadyExists
			});
		}
	},

	/**
	 * Checks whether the collection is empty
	 * @abstract
	 * @return {Boolean} Returns true if there are no elements in the collection,
	 * otherwise returns false
	 */
	isEmpty: Terrasoft.abstractFn,

	/**
	 * Returns the number of items in the collection
	 * @abstract
	 * @return {Number} The number of items in the collection
	 */
	getCount: Terrasoft.abstractFn,

	/**
	 * Returns an item by key
	 * @abstract
	 * @param {String} key
	 * @return {Mixed} Collection item
	 */
	get: Terrasoft.abstractFn,

	/**
	 * Returns an element by index
	 * @abstract
	 * @param {Number} index
	 * @return {Mixed} Element
	 */
	getByIndex: Terrasoft.abstractFn,

	/**
	 * Returns the index of an element
	 * @abstract
	 * @param {Mixed} obj Element
	 * @return {Number} Index
	 */
	indexOf: Terrasoft.abstractFn,

	/**
	 * Returns an item by key
	 * @abstract
	 * @param {String} key
	 * @return {Mixed} item
	 */
	find: Terrasoft.abstractFn,

	/**
	 * Adds an item to the collection
	 * @abstract
	 * @param {String} key
	 * @param {Mixed} item
	 */
	add: function(key) {
		this.checkDuplicates(key);
	},

	/**
	 * Removes an item from the collection
	 * @abstract
	 * @param {Mixed} item
	 * @return {Mixed} Returns the deleted item or false if nothing is removed
	 */
	remove: Terrasoft.abstractFn,

	/**
	 * Removes an element by key
	 * @abstract
	 * @param {String} key
	 * @return {Mixed} Returns the deleted item or false if nothing is removed
	 */
	removeByKey: Terrasoft.abstractFn,

	/**
	 * Removes an item by index
	 * @abstract
	 * @param {Number} index
	 * @return {Mixed} Returns the deleted item or false if nothing is deleted
	 */
	removeByIndex: Terrasoft.abstractFn,

	/**
	 * Checks if the specified key is in the collection
	 * @abstract
	 * @param {String} key
	 * @return {Boolean} Returns true if such an element exists, otherwise false
	 */
	contains: Terrasoft.abstractFn,

	/**
	 * Executes the function Fn for each element in the collection one by one. The function Fn must return true.
	 * Returning false from the function will stop iteration.
	 * @abstract
	 * @param {Function} fn Function for execution
	 * @param {Mixed} fn.item Element of the collection
	 * @param {Number} fn.index Element index
	 * @param {Number} fn.len Number of items in the collection
	 * @param {Object} scope (optional) Context of the function Fn
	 */
	each: Terrasoft.abstractFn,

	/**
	 * Executes the function Fn for each key in the collection. The function Fn must return true
	 * Returning false from the function will stop iteration.
	 * @abstract
	 * @param {Function} fn Function for execution
	 * @param {String} fn.key Item key
	 * @param {Mixed} fn.item Item
	 * @param {Number} fn.index Item index
	 * @param {Number} fn.len Number of items in the collection
	 * @param {Object} scope (optional) Context of the function Fn
	 */
	eachKey: Terrasoft.abstractFn,

	/**
	 * Clears the collection
	 * @abstract
	 */
	clear: Terrasoft.abstractFn,

	/**
	 * Clears collection and deletes it
	 */
	onDestroy: function() {
		this.clear();
		this.callParent(arguments);
	}

});
