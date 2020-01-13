Terrasoft.configuration.Structures["SortableGridViewModelMixin"] = {innerHierarchyStack: ["SortableGridViewModelMixin"]};
define("SortableGridViewModelMixin", ["SortableGridViewModelMixinResources"], function(resources) {
	Ext.define("Terrasoft.core.mixins.SortableGridViewModelMixin", {
		alternateClassName: "Terrasoft.SortableGridViewModelMixin",

		//region Properties: Private

		/**
		 * Columns to sort.
		 * @private
		 * @type {Array}
		 */
		_sortingValues: null,

		/**
		 * Profile key.
		 * @private
		 * @type {String}
		 */
		_profileKey: null,

		//endregion

		//region Methods: Private

		/**
		 * Applies sorting in direction to column by index.
		 * @private
		 */
		_applySorting: function(index, direction) {
			this._sortDataCollection(index, direction);
			var dataCollection = this.getDataCollection();
			var data = dataCollection.clone();
			dataCollection.reloadAll(data);
			this.set("SortColumnIndex", index);
			this.set("GridSortDirection", direction);
			this._saveSortingSettings.apply(this, arguments);
		},

		/**
		 * Sorts collection.
		 * @private
		 */
		_sortDataCollection: function(index, direction) {
			var columnName = this._getSortingValues()[index].name;
			var columnGetter = this.getColumnGetter(columnName);
			var dataCollection = this.getDataCollection();
			dataCollection.sortDirection = direction;
			dataCollection.sort(null, direction, this._sortHandler.bind(this, columnGetter));
		},

		/**
		 * Comparison function for sorting.
		 * @private
		 */
		_sortHandler: function(columnGetter, item1, item2) {
			var value1 = columnGetter(item1);
			var value2 = columnGetter(item2);
			if (value1 < value2) {
				return -1;
			}
			if (value1 > value2) {
				return 1;
			}
			return 0;
		},

		/**
		 * Initializes and loads sorting settings from profile.
		 * @private
		 */
		_getDefaultSortProfile: function() {
			return [{}, {orderDirection: Terrasoft.OrderDirection.ASC}];
		},

		/**
		 * Provides key for loading sorting settings from profile.
		 * @private
		 */
		_getProfileKey: function() {
			return this._profileKey;
		},

		/**
		 * Saves sorting settings in profile.
		 * @private
		 */
		_saveSortingSettings: function(index, direction) {
			var columns = this._getSortingValues();
			var sortedColumnName = columns[index].name;
			for (var i = 0; i < columns.length; i++) {
				var column = columns[i];
				var columnName = column.name;
				if (sortedColumnName === columnName) {
					column.orderDirection = direction;
					column.orderPosition = 1;
				} else {
					column.orderDirection = "";
					column.orderPosition = "";
				}
				var caption = this._getColumnCaption(caption, column.orderDirection);
				this.set(this.name + columnName + "_SortedColumnCaption", caption);
			}
			Terrasoft.utils.saveUserProfile(this._getProfileKey(), columns, false);
		},

		/**
		 * Provides attributes names to sort on.
		 * @private
		 */
		_getSortingValues: function() {
			var sortingValuesObjects = [];
			this._sortingValues.forEach(function(record) {
				sortingValuesObjects.push({
					name: record
				});
			});
			return sortingValuesObjects;
		},

		/**
		 * Provides caption for column depending on sort direction.
		 * @private
		 */
		_getColumnCaption: function(caption, orderDirection) {
			var gridResources = this._getGridUtilitiesResources();
			if (!orderDirection) {
				return caption;
			}
			if (orderDirection === Terrasoft.OrderDirection.ASC) {
				caption += " (" + gridResources.localizableStrings.AscendingDirectionCaption + ")";
			} else {
				caption += " (" + gridResources.localizableStrings.DescendingDirectionCaption + ")";
			}
			return caption;
		},

		/**
		 * Provides grid utilities resources.
		 * @private
		 */
		_getGridUtilitiesResources: function() {
			return resources;
		},

		/**
		 * Gets sort direction depending on type.
		 * @private
		 * @param {Object} orderDirection Initial sort direction.
		 * @param {Object} dataValueType Data value type.
		 * @return {Object} Sort direction.
		 */
		_getColumnSortDirection: function(orderDirection, dataValueType) {
			if (orderDirection) {
				orderDirection = (orderDirection === Terrasoft.OrderDirection.ASC) ?
						Terrasoft.OrderDirection.DESC : Terrasoft.OrderDirection.ASC;
			} else {
				orderDirection = Terrasoft.OrderDirection.ASC;
				if (dataValueType !== Terrasoft.DataValueType.TEXT &&
						dataValueType !== Terrasoft.DataValueType.LOOKUP) {
					orderDirection = Terrasoft.OrderDirection.DESC;
				}
			}
			return orderDirection;
		},

		//endregion

		//region Methods: Protected

		/**
		 * Provides handler for getting column name from item.
		 * @param {String} column name.
		 * @protected
		 * @return {Function} Function to get column value.
		 */
		getColumnGetter: function(column) {
			return function(item) {
				var value = item.get(column);
				if (Ext.isString(value)) {
					value = value.toLowerCase();
				}
				return value;
			};
		},

		/**
		 * Provides collection to sort.
		 * @protected
		 * @return {Collection} Collecdtion to sort.
		 */
		getDataCollection: function() {
			return this.$GridData;
		},

		/**
		 * Sorts grid by column index.
		 * @protected
		 * @param {Object} index Column index.
		 */
		sortByColumn: function(index) {
			var dataCollection = this.getDataCollection();
			var direction = this._getColumnSortDirection(dataCollection.sortDirection);
			this._applySorting(index, direction);
		},

		/**
		 * Sorts grid by column index.
		 * @protected
		 * @deprecated 7.13.0 Use {@link Terrasoft.SortableGridViewModelMixin#sortByColumn} instead.
		 * @param {Object} index Column index.
		 */
		sortColumn: function(index) {
			this.sortByColumn(index);
		},

		/**
		 * Initializes and loads sorting settings from profile.
		 * @protected
		 */
		initSortingSettings: function(config, callback, scope) {
			this._sortingValues = config.columnsToSort;
			this._profileKey = config.profileKey;
			Terrasoft.ProfileUtilities.getProfile({profileKey: this._getProfileKey()}, function(profile) {
				if (!profile) {
					profile = this._getDefaultSortProfile();
				}
				var column = Ext.Array.findBy(profile, function(el) {
					return !!el.orderDirection;
				}, this);
				if (column) {
					this._applySorting(profile.indexOf(column), column.orderDirection);
				}
				Ext.callback(callback, scope);
			}, this);
		}

		//endregion

	});
});


