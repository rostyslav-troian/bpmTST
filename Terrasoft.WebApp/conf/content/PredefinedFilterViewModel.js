Terrasoft.configuration.Structures["PredefinedFilterViewModel"] = {innerHierarchyStack: ["PredefinedFilterViewModel"]};
define("PredefinedFilterViewModel", ["ext-base", "terrasoft", "BaseSchemaViewModel", "css!PredefinedFilterViewModel",
		"PredefinedFilterItemViewModel"], function(Ext, Terrasoft) {
	Ext.define("Terrasoft.model.PredefinedFilter", {
		extend: "Terrasoft.BaseSchemaViewModel",
		alternateClassName: "Terrasoft.PredefinedFilter",

		//region Properties: Protected

		Ext: null,
		Terrasoft: null,
		sandbox: null,

		/**
		 * Instance.
		 * @protected
		 * @type {Object}
		 */
		instance: null,

		/**
		 * Comparison type.
		 * @protected
		 * @type {Number}
		 */
		comparisonType: -1,

		/**
		 * Right expression parameter value.
		 * @protected
		 * @type {Object}
		 */
		rightExpressionParameterValue: null,

		/**
		 * Key.
		 * @protected
		 * @type {String}
		 */
		key: "",

		/**
		 * Caption.
		 * @protected
		 * @type {String}
		 */
		caption: "",

		/**
		 * Image config.
		 * @protected
		 * @type {Object}
		 */
		imageConfig: null,

		//endregion

		//region Properties: Public

		/**
		 * @inheritdoc
		 * @overridden
		 */
		columns: {
			"FilterItemsList": {
				dataValueType: Terrasoft.DataValueType.ENTITY_COLLECTION
			}
		},

		//endregion

		//region Methods: Private

		/**
		 * Removes filter.
		 * @private
		 * @param {String} columnPath Column path.
		 */
		removeFilter: function(columnPath) {
			var filters = this.getFilters();
			filters.removeByKey(columnPath);
		},

		/**
		 * Deletes filter from collection.
		 * @private
		 * @param {Terrasoft.PredefinedFilterItemViewModel} item Filter.
		 */
		removeFilterItem: function(item) {
			var key = item.get("ColumnPath");
			this.removeFilter(key);
			this.removeFilterItemByKey(key);
		},

		/**
		 * Deletes filter item from collection.
		 * @private
		 * @param {String} key Filter key.
		 */
		removeFilterItemByKey: function(key) {
			var filterItems = this.get("FilterItemsList");
			filterItems.removeByKey(key);
		},

		/**
		 * Adds filter item to collection.
		 * @private
		 * @param {Object} config Filter configuration.
		 * @param {String} config.columnPath Filter column path.
		 * @param {String} config.caption Filter caption.
		 */
		addFilterItem: function(config) {
			var filterItems = this.get("FilterItemsList");
			var filterItem = this.createFilterItem(config);
			filterItems.add(config.columnPath, filterItem);
		},

		/**
		 * Creates filter item view model.
		 * @private
		 * @param {Object} config Column configuration.
		 * @param {String} config.columnPath Filter column path.
		 * @param {String} config.caption Filter caption.
		 * @return {Terrasoft.PredefinedFilterItemViewModel}
		 */
		createFilterItem: function(config) {
			var values = {
				id: config.columnPath,
				ColumnPath: config.columnPath,
				Caption: config.caption
			};
			var filterItem = this.Ext.create("Terrasoft.PredefinedFilterItemViewModel", {
				values: values,
				sandbox: this.sandbox
			});
			return filterItem;
		},

		/**
		 * Gets filters.
		 * @private
		 * @return {Terrasoft.FilterGroup}
		 */
		getFilters: function() {
			if (this.instance) {
				return this.instance;
			}
			var instance = this.instance = this.Terrasoft.createFilterGroup();
			instance.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
			this.initInstanceEvents(instance);
			return instance;
		},

		/**
		 * Updates filters.
		 * @private
		 * @param {String} key Filters key.
		 */
		updateFilters: function(key) {
			var filters = this.getFilters();
			this.sandbox.publish("UpdateFilter", {
				key: key,
				filters: filters,
				filtersValue: filters
			}, [this.sandbox.id]);
		},

		/**
		 * Handles collection "add" event.
		 * @private
		 * @param {Terrasoft.PredefinedFilterItemViewModel} item Filter item.
		 */
		onFilterItemAdd: function(item) {
			item.on("delete", this.removeFilterItem, this);
			this.updateFilters(this.key);
		},

		/**
		 * Handles collection "remove" event.
		 * @private
		 * @param {Terrasoft.PredefinedFilterItemViewModel} item Filter item.
		 */
		onFilterItemRemove: function(item) {
			item.un("delete", this.removeFilterItem, this);
			this.updateFilters(this.key);
		},

		/**
		 * Initializes filters collection.
		 * @private
		 */
		initColumnsList: function() {
			var columnsList = this.Ext.create(Terrasoft.BaseViewModelCollection);
			this.set("ColumnsList", columnsList);
			this.Terrasoft.each(this.columns, function(column) {
				columnsList.add(column.name, this.getButtonMenuItem({
					Id: column.name,
					Caption: column.caption,
					Click: {
						bindTo: "toggleFilter"
					},
					Tag: column
				}));
			}, this);
		},

		/**
		 * Initialises filter items collection.
		 * @private
		 */
		initFilterItemsCollection: function() {
			var filterItems = this.Ext.create(this.Terrasoft.BaseViewModelCollection);
			this.set("FilterItemsList", filterItems);
			filterItems.on("add", this.onFilterItemAdd, this);
			filterItems.on("remove", this.onFilterItemRemove, this);
		},

		/**
		 * Destroys filter items collection.
		 * @private
		 */
		destroyFilterItemsCollection: function() {
			var filterItems = this.get("FilterItemsList");
			if (filterItems) {
				filterItems.un("add", this.onFilterItemAdd, this);
				filterItems.un("remove", this.onFilterItemRemove, this);
			}
		},

		//endregion

		//region Methods: Protected

		/**
		 * Adds filter.
		 * @protected
		 * @param {String} columnPath Column path.
		 */
		addFilter: function(columnPath) {
			var filters = this.getFilters();
			var filter = this.createFilter(columnPath);
			filters.add(columnPath, filter);
		},

		//endregion

		//region Methods: Public

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initColumnsList();
			this.initFilterItemsCollection();
		},

		/**
		 * Initializes instance events.
		 * @param {Object} [instance] Instance.
		 */
		initInstanceEvents: function(instance) {
			if (instance) {
				instance.on("add", this.updateColumnListItemState, this);
				instance.on("remove", this.updateColumnListItemState, this);
			}
		},

		/**
		 * Destroys instance events.
		 * @param {Object} [instance] Instance.
		 */
		destroyInstanceEvents: function(instance) {
			if (instance) {
				instance.un("add", this.updateColumnListItemState, this);
				instance.un("remove", this.updateColumnListItemState, this);
			}
		},

		/**
		 * Gets columns list button caption.
		 * @return {String}
		 */
		getColumnsListButtonCaption: function() {
			return this.caption;
		},

		/**
		 * Updates column list item state.
		 * @param {Object} item Item.
		 */
		updateColumnListItemState: function(item) {
			var filterKey = item.key;
			var filters = this.getFilters();
			var enabled = !filters.contains(filterKey);
			var columnsList = this.get("ColumnsList");
			var column = columnsList.get(filterKey);
			column.set("Enabled", enabled);
		},

		/**
		 * Creates filter.
		 * @param {String} columnPath Column path.
		 * @return {Object}
		 */
		createFilter: function(columnPath) {
			switch (this.comparisonType) {
				case this.Terrasoft.ComparisonType.IS_NULL:
					return this.Terrasoft.createColumnIsNullFilter(columnPath);
				case this.Terrasoft.ComparisonType.IS_NOT_NULL:
					return this.Terrasoft.createColumnIsNotNullFilter(columnPath);
				default:
					throw new this.Terrasoft.UnsupportedTypeException();
			}
		},

		/**
		 * Adds filter if it is not exists, otherwise deletes him.
		 * @param {Object} column Column.
		 */
		toggleFilter: function(column) {
			var key = column.columnPath;
			var filters = this.getFilters();
			if (filters.contains(key)) {
				this.removeFilter(key);
				this.removeFilterItemByKey(key);
			} else {
				this.addFilter(key);
				this.addFilterItem(column);
			}
		},

		/**
		 * Sets the value.
		 * @param {Array} value Section filter items.
		 */
		setValue: function(value) {
			this.Terrasoft.each(value, this.prepareValue, this);
		},

		/**
		 * Prepares value.
		 * @param {Object} [item] Section filter item.
		 */
		prepareValue: function(item) {
			if (!item || !item.filter) {
				return;
			}
			var filter = this.Terrasoft.deserialize(item.filter);
			if (this.instance === filter) {
				return;
			}
			this.initInstanceEvents(filter);
			this.instance = filter;
			var columnsList = this.get("ColumnsList");
			filter.eachKey(function(key, filterItem) {
				this.updateColumnListItemState(filterItem);
				var column = columnsList.get(key);
				var config = {
					columnPath: column.get("Id"),
					caption: column.get("Caption")
				};
				this.addFilterItem(config);
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#destroy
		 * @overridden
		 */
		destroy: function() {
			this.destroyInstanceEvents(this.instance);
			this.destroyFilterItemsCollection();
			this.callParent(arguments);
		}

		//endregion

	});
});


