/**
 * Group of filters. Groups of filters can be nested into each other,
 * i.e. The collection itself can be an element of another collection.
 *
 * See {@link Terrasoft.ObjectCollection}.
 */
Ext.define("Terrasoft.data.filters.FilterGroup", {
	extend: "Terrasoft.ObjectCollection",
	alternateClassName: "Terrasoft.FilterGroup",

	/**
	 * Element key template for automatic naming
	 * @protected
	 * @override
	 * @type {String}
	 */
	itemKeyTemplate: "filter",

	/**
	 * The type of the logical operation for a combination of filters in the collection
	 * @type {Terrasoft.LogicalOperatorType}
	 */
	logicalOperation: Terrasoft.LogicalOperatorType.AND,

	/**
	 * A sign that the filter group is active and will be taken into account when building the query
	 * @type {Boolean}
	 */
	isEnabled: true,

	/**
	 * Type of filter
	 * @type {Terrasoft.FilterType}
	 */
	filterType: Terrasoft.FilterType.FILTER_GROUP,

	/**
	 * The filter key in the filter collection {@link Terrasoft.FilterGroup}
	 * @type {String}
	 */
	key: "",

	/**
	 * Root object diagram
	 * @type {String}
	 */
	rootSchemaName: "",

	/**
	 * Creates an instance of the collection
	 * @return {Terrasoft.Collection} Returns the generated collection instance
	 */
	constructor: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event changeItem
			 * Triggers when the filter element changes
			 * @param {Terrasoft.BaseFilter} filter Modified filter element
			 */
			"changeItem",
			/**
			 * @event logicalOperationChanged
			 * Triggers when a logical group changes
			 * @param {Terrasoft.FilterGroup} filterGroup Modified filter group
			 */
			"logicalOperationChanged"
		);
	},

	/**
	 * Returns the item's unique key when automatically added.
	 * @protected
	 * @override
	 * @return {String} Returns the generated unique key for the added object
	 */
	getUniqueKey: function() {
		return Terrasoft.generateFilterKey();
	},

	/**
	 * Subscribe to item events
	 * @private
	 * @param {Terrasoft.BaseFilter/Terrasoft.FilterGroup} filter
	 */
	subscribeForItemEvents: function(filter) {
		const filterType = filter.filterType;
		if (filterType === Terrasoft.FilterType.FILTER_GROUP) {
			filter.on("logicalOperationChanged", this.filterChanged, this);
		} else {
			filter.on("leftExpressionChange", this.filterChanged, this);
			filter.on("comparisonTypeChange", this.filterChanged, this);
			if (filterType === Terrasoft.FilterType.COMPARE) {
				filter.on("rightExpressionChange", this.filterChanged, this);
			} else if (filterType === Terrasoft.FilterType.IN) {
				filter.on("rightExpressionsChange", this.filterChanged, this);
			}
		}
	},

	/**
	 * Unsubscribes from element events
	 * @private
	 * @param {Terrasoft.BaseFilter/Terrasoft.FilterGroup} filter
	 */
	unSubscribeForItemEvents: function(filter) {
		const filterType = filter.filterType;
		if (filterType === Terrasoft.FilterType.FILTER_GROUP) {
			filter.un("logicalOperationChanged", this.filterChanged, this);
		} else {
			filter.un("leftExpressionChange", this.filterChanged, this);
			filter.un("comparisonTypeChange", this.filterChanged, this);
			if (filterType === Terrasoft.FilterType.COMPARE) {
				filter.un("rightExpressionChange", this.filterChanged, this);
			} else if (filterType === Terrasoft.FilterType.IN) {
				filter.un("rightExpressionsChange", this.filterChanged, this);
			}
		}
	},

	/**
	 * Generates a filter change event
	 * @param {Terrasoft.BaseFilter} filter Modified filter
	 */
	filterChanged: function(filter) {
		this.fireEvent("changeItem", filter, this);
	},

	/**
	 * The event handler for adding an item to the collection.
	 * @protected
	 * @override
	 * @param {Number} index
	 * @param {Terrasoft.BaseFilter|Terrasoft.FilterGroup} item Added item.
	 * @param {String} key
	 */
	onCollectionAdd: function(index, item, key) {
		item.key = key;
		this.callParent(arguments);
		this.subscribeForItemEvents(item);
	},

	/**
	 * The event handler for removing an item from the collection.
	 * @protected
	 * @override
	 * @param {Terrasoft.BaseFilter|Terrasoft.FilterGroup} item Deleted item.
	 */
	onCollectionRemove: function(item) {
		this.callParent(arguments);
		this.unSubscribeForItemEvents(item);
		item.key = "";
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
		this.callParent(arguments);
		serializableObject.logicalOperation = this.logicalOperation;
		serializableObject.isEnabled = this.isEnabled;
		serializableObject.filterType = this.filterType;
		const rootSchemaName = this.rootSchemaName;
		if (!Ext.isEmpty(rootSchemaName)) {
			serializableObject.rootSchemaName = rootSchemaName;
		}
		if (serializationInfo.serializeFilterManagerInfo) {
			serializableObject.key = this.key;
		}
	},

	/**
	 * Specifies for each element of the collection whether it is necessary to serialize it when serializing the collection.
	 * @protected
	 * @param {String} key The key of the item in the collection.
	 * @param {Object} item Element of the collection.
	 * @param {Object} serializationInfo Serialization options.
	 * @return {Boolean} Returns true if the element is serialized, otherwise false.
	 */
	needSerializeItem: function(key, item, serializationInfo) {
		return (!serializationInfo.serializeFilterManagerInfo ? item.getIsCompleted() : true);
	},

	/**
	 * Checks if the group of filters is valid and ready for use
	 * @protected
	 * @return {Boolean} Returns true
	 */
	getIsCompleted: function() {
		return true;
	},

	/**
	 * Sets the type of the logical operation for the filter group
	 * @param {Terrasoft.LogicalOperatorType} logicalOperation Type of logical operation
	 */
	setLogicalOperation: function(logicalOperation) {
		if (this.logicalOperation === logicalOperation) {
			return;
		}
		this.logicalOperation = logicalOperation;
		this.fireEvent("logicalOperationChanged", this, this);
	},

	/**
	 * Returns a reference to the parent filter collection
	 * @return {Terrasoft.FilterGroup} A collection of parent filters
	 */
	getParentFilters: function() {
		return this.parentCollection;
	},

	/**
	 * Clears collection
	 * @override
	 */
	clear: function() {
		this.each(function(item) {
			item.key = "";
			this.unSubscribeForItemEvents(item);
		}, this);
		this.callParent(arguments);
	},

	/**
	 * Checks whether the filter group is empty.
	 * @override
	 * @param {Boolean} deep Indicates whether to check collection recursively for empty collections.
	 * @return {Boolean} Returns true if collection is empty, false otherwise.
	 */
	isEmpty: function(deep = false) {
		if (!deep) {
			return this.callParent(arguments);
		}
		let result = true;
		this.each(function(filterItem) {
			result = filterItem instanceof Terrasoft.FilterGroup
				? filterItem.isEmpty(true)
				: false;
			return result;
		}, this);
		return result;
	},

	/**
	 * Checks whether the group contains at least one enabled filter.
	 * @return {Boolean} Returns true if group contains at least one not empty and enabled filter, false otherwise.
	 */
	getIsEnabled: function() {
		if (!this.isEnabled) {
			return false;
		}
		const filterItems = this.getItems();
		return filterItems.some((filterItem) => filterItem.getIsEnabled());
	}
});
