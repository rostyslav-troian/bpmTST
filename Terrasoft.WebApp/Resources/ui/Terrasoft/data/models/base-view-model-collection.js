Ext.ns("Terrasoft.data.model");

/**
 * @abstract
 * The base class of the collection of models. A collection is a collection of models (data rows).
 */
Ext.define("Terrasoft.data.model.BaseViewModelCollection", {
	extend: "Terrasoft.core.collections.ObjectCollection",
	alternateClassName: "Terrasoft.BaseViewModelCollection",

	/**
	 * Deletion request object
	 * @private
	 * @type {Terrasoft.DeleteQuery}
	 */
	deleteQuery: null,

	/**
	 * Element column configuration, used to instantiate elements
	 * @protected
	 * @type {Object}
	 */
	rowConfig: null,

	/**
	 * Reference to the object diagram of the object
	 * @type {BaseEntitySchema}
	 */
	entitySchema: null,

	/**
	 * @inheritdoc Terrasoft.core.collections.ObjectCollection#itemClass
	 * @override
	 */
	itemClass: "Terrasoft.BaseViewModel",

	/**
	 * Creates an instance of the collection
	 * @param {Object} config Configuration object
	 * @return {Terrasoft.BaseViewModelCollection} Returns the generated collection instance
	 */
	constructor: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event itemChanged
			 * Triggers after a collection item changes
			 * @param {Terrasoft.BaseViewModel} item collection item
			 */
			"itemChanged"
		);
	},

	/**
	 * Generates an onItemChanged event when a collection item changes
	 * @param {Terrasoft.model.BaseViewModel} item is a collection item
	 * @param {Object} config The additional parameter object with which the data modification method was called
	 * @private
	 */
	onItemChanged: function(item, config) {
		this.fireEvent("itemChanged", item, config);
	},

	/**
	 * Signs a change event for a collection item
	 * @param {Terrasoft.model.BaseViewModel} item collection item
	 */
	subscribeItemEvent: function(item) {
		item.on("change", this.onItemChanged, this);
	},

	/**
	 * Describes the change event for a collection item
	 * @param {Terrasoft.model.BaseViewModel} item collection item
	 */
	unsubscribeItemEvent: function(item) {
		item.un("change", this.onItemChanged, this);
	},

	/**
	 * The event handler for adding an item to a collection
	 * @protected
	 * @override
	 * @param {Number} index Index
	 * @param {Mixed} item Added item
	 * @param {String} [key] Key
	 */
	onCollectionAdd: function(index, item) {
		this.callParent(arguments);
		this.subscribeItemEvent(item);
	},

	/**
	 * The event handler for removing an item from the collection
	 * @protected
	 * @override
	 * @param {Mixed} item Deleted item
	 * @param {String} [key] Key
	 */
	onCollectionRemove: function(item) {
		this.callParent(arguments);
		this.unsubscribeItemEvent(item);
	},

	/**
	 * Removes item from collection and DB by primary column value.
	 * @param {String} primaryColumnValue Primary column value.
	 * @param {Function} callback Callback function, that will be called on server response.
	 * @param {Object} callback.result Server response.
	 * @param {Object} scope Callback function call context.
	 */
	deleteItem: function(primaryColumnValue, callback, scope) {
		var item = this.get(primaryColumnValue);
		item.deleteEntity(function(result) {
			if (result.rowsAffected > 0) {
				this.removeByKey(primaryColumnValue);
			}
			if (Ext.isFunction(callback)) {
				callback.call(scope || this, result);
			}
		}, this);
	},

	/**
	 * Creates new collection item according to rowConfig and fills it with values.
	 * @param {Object} columnValues New item column values.
	 * @return {Terrasoft.model.BaseViewModel} Created item.
	 */
	createItem: function(columnValues) {
		return Ext.create(this.itemClass, {
			values: columnValues,
			rowConfig: this.rowConfig
		});
	},

	/**
	 * Generates unique index for property value. Method checks all items in collection to contain property with value
	 * defaultValue1, defaultValue2, defaultValue3, etc. If no one item hasn't property with that value,
	 * returns index.
	 * @param {String} propertyName Item property name.
	 * @param {String} defaultValue Default item property value.
	 * @return {Number} Generated unique index.
	 */
	generateItemPropertyValueIndex: function(propertyName, defaultValue) {
		var items = this.getItems();
		var itemsPropertiesValues = items.map(function(item) {
			return item.get(propertyName);
		});
		var index = 1;
		while (itemsPropertiesValues.indexOf(defaultValue + index) > -1) {
			index++;
		}
		return index;
	},

	/**
	 * Loads data from array to collection. Array items must be an objects where property name - is column name
	 * and property value - is column value.
	 * @param {Array} columnValuesArray Array with values.
	 */
	loadFromColumnValues: function(columnValuesArray) {
		var primaryColumnName = this.entitySchema.primaryColumnName;
		this.clear();
		columnValuesArray.forEach(function(rawItem) {
			var keyValue = rawItem[primaryColumnName];
			if (keyValue) {
				var item = new Terrasoft.BaseViewModel({
					values: rawItem
				});
				this.add(keyValue, item);
			} else {
				throw new Terrasoft.ItemNotFoundException({
					message: Terrasoft.Resources.BaseViewModelCollection.PrimaryColumnValueNotFound
				});
			}
		}, this);
	}

});
