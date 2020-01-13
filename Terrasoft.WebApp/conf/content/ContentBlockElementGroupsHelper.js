Terrasoft.configuration.Structures["ContentBlockElementGroupsHelper"] = {innerHierarchyStack: ["ContentBlockElementGroupsHelper"]};
define("ContentBlockElementGroupsHelper", [], function() {

	Ext.define("Terrasoft.ContentBlockElementGroupsHelper", {
		extend: "Terrasoft.BaseObject",

		//region Properties: Private

		/**
		 * @private
		 */
		_elementGroupSelectorTpl: ".grid-layout-edit-table [data-group-name={0}]{background-color:{1};}",

		/**
		 * @private
		 */
		_groups: null,

		//endregion

		//region Methods: Private

		/**
		 * @private
		 */
		_generateColor: function() {
			var letters = 'ABCDE';
			var color = '#';
			for (var i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 5)];
			}
			return color;
		},

		/**
		 * @private
		 */
		_generateGroupStyle: function(groupName) {
			if(!this._groups[groupName]) {
				this._groups[groupName] = this._generateColor();
				Terrasoft.createStyleSheet(
					Ext.String.format(this._elementGroupSelectorTpl, groupName, this._groups[groupName]),
					groupName
				);
			}
		},

		/**
		 * @private
		 */
		_initGroup: function() {
			const groupName = this.generateGroupName();
			this.initElementGroup(groupName);
			return groupName;
		},

		/**
		 * @private
		 */
		_removeGroup: function(groupName) {
			if(this._groups[groupName]) {
				Terrasoft.removeStyleSheet(groupName);
				delete this._groups[groupName];
			}
		},

		/**
		 * @private
		 */
		_getItemMaxColumn: function(item) {
			return item.$Column + item.$ColSpan - 1;
		},

		/**
		 * @private
		 */
		_getItemMaxRow: function(item) {
			return item.$Row + item.$RowSpan - 1;
		},

		/**
		 * Returns bounds of group formed by items.
		 * @private
		 */
		_getGroupBounds: function(items) {
			const columns = items.map(function(item) {
				return item.$Column;
			});
			const rows = items.map(function(item) {
				return item.$Row;
			});
			const maxColumns = items.map(function(item) {
				return this._getItemMaxColumn(item);
			}, this);
			const maxRows = items.map(function(item) {
				return this._getItemMaxRow(item);
			}, this);
			return {
				minColumn: Math.min.apply(null, columns),
				maxColumn: Math.max.apply(null, maxColumns),
				minRow: Math.min.apply(null, rows),
				maxRow: Math.max.apply(null, maxRows)
			};
		},

		/**
		 * @private
		 */
		_isItemIntersectsGroup: function(item, groupBounds) {
			if (item.$Column > groupBounds.maxColumn || this._getItemMaxColumn(item) < groupBounds.minColumn) {
				return false;
			}
			if (item.$Row > groupBounds.maxRow || this._getItemMaxRow(item) < groupBounds.minRow) {
				return false;
			}
			return true;
		},

		/**
		 * Return items that fits bounds.
		 * @private
		 */
		_getItemsInBounds: function(groupBounds, items) {
			return items.filter(function(item) {
				return this._isItemIntersectsGroup(item, groupBounds);
			}, this);
		},

		/**
		 * Creates additional groups to conplement created group.
		 * @private
		 */
		_columnifyGroup: function(groupItems, elements) {
			const groupBounds = this._getGroupBounds(groupItems);
			const leftGroupBounds = {
				minColumn: 0,
				maxColumn: groupBounds.minColumn,
				minRow: groupBounds.minRow,
				maxRow: groupBounds.maxRow
			};
			const elementsArray = elements.getItems();
			const leftGroupItems = this._getItemsInBounds(leftGroupBounds, elementsArray).filter(function(item) {
				return !item.$GroupName;
			});
			this._createGroup(leftGroupItems.map(function(item){
				return item.$Id;
			}), elements);
			const rightGroupBounds = {
				minColumn: groupBounds.maxColumn + 1,
				maxColumn: 24,
				minRow: groupBounds.minRow,
				maxRow: groupBounds.maxRow
			};
			const rightGroupItems = this._getItemsInBounds(rightGroupBounds, elementsArray).filter(function(item) {
				return !item.$GroupName;
			});
			this._createGroup(rightGroupItems.map(function(item){
				return item.$Id;
			}), elements);
		},

		/**
		 * Creates group by selected items.
		 * @return {String} Created group name.
		 * @private
		 */
		_createGroup: function(selectedElements, elements) {
			const group = this._initGroup();
			const selectedItems = elements.filterByFn(function(item) {
				return Terrasoft.contains(selectedElements, item.$Id);
			}, this);
			const groupItems = this.calculateGroupItems(selectedItems.getItems(), elements.getItems());
			this.ungroupElements(groupItems.map(function(item) {
				return item.$Id;
			}), elements);
			groupItems.forEach(function(item) {
				item.$GroupName = group;
			}, this);
			return group;
		},

		/**
		 * @private
		 */
		_findGroupItems: function(groupName, elements) {
			return elements.filter(function(item){
				return item.$GroupName === groupName;
			});
		},

		/**
		 * @private
		 */
		_countItemsInGroup: function(groupName, elements) {
			const items = this._findGroupItems(groupName, elements.getItems());
			return items.length;
		},

		/**
		 * @private
		 */
		_countItemsInGroups: function(elements) {
			const itemsCountBeforePositionChange = {};
			const groupNames = _.keys(this._groups);
			groupNames.forEach(function(group) {
				itemsCountBeforePositionChange[group] = this._countItemsInGroup(group, elements);
			}, this);
			return itemsCountBeforePositionChange;
		},

		//endregion

		//region Methods: Protected

		/**
		 * Return name for new group.
		 * @return {String} Unique group name.
		 * @protected
		 */
		generateGroupName: function() {
			const groupName = new Date() - 1;
			return "G" + groupName;
		},

		//endregion

		//region Methods: Public

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this._groups = {};
		},

		/**
		 * Finds items in group defined by selected items.
		 * @param {Array} selectedItems Selected items.
		 * @param {Array} items All items.
		 * @return {Array} Items in group.
		 */
		calculateGroupItems: function(selectedItems, items) {
			let groupBounds = this._getGroupBounds(selectedItems);
			let groupItems = this._getItemsInBounds(groupBounds, items);
			let addedItems = groupItems;
			while (addedItems.length) {
				groupBounds = this._getGroupBounds(groupItems);
				const newGroupItems = this._getItemsInBounds(groupBounds, items);
				addedItems = _.difference(newGroupItems, groupItems);
				groupItems = newGroupItems;
			}
			return groupItems;
		},

		/**
		 * Initializes element group.
		 * @param {String} groupName Element group name.
		 */
		initElementGroup: function(groupName) {
			this._generateGroupStyle(groupName);
		},

		/**
		 * Groups elements.
		 * @param {Array} selectedElements Elements to group.
		 * @param {Terrasoft.Collection} elements Elements collection.
		 */
		groupElements: function(selectedElements, elements) {
			const groupName = this._createGroup(selectedElements, elements);
			const groupItems = this._findGroupItems(groupName, elements.getItems());
			this._columnifyGroup(groupItems, elements);
		},

		/**
		 * Ungroups elements.
		 * @param {Array} selectedElements Elements to ungroup.
		 * @param {Terrasoft.Collection} elements Elements collection.
		 */
		ungroupElements: function(selectedElements, elements) {
			const selectedElementsGroups = [];
			elements.filterByFn(function(item) {
				return Terrasoft.contains(selectedElements, item.$Id);
			}, this).each(function(item) {
				if (item.$GroupName) {
					selectedElementsGroups.push(item.$GroupName);
				}
			}, this);
			Terrasoft.each(selectedElementsGroups, function(groupName) {
				this._removeGroup(groupName);
			}, this);
			elements.filterByFn(function(item) {
				return Terrasoft.contains(selectedElementsGroups, item.$GroupName);
			}, this).each(function(item) {
				item.$GroupName = null;
			}, this);
		},

		/**
		 * Handles group and item intersect.
		 * @param {String} id Moved element id.
		 * @param {Object} oldPosition Element position before move.
		 * @param {Terrasoft.Collection} elements Elements collection.
		 */
		validateGroupIntersection: Terrasoft.throttle(function(id, elements, callback, scope) {
			if (!Terrasoft.isEmptyObject(this._groups)) {
				const itemsCountBeforePositionChange = this._countItemsInGroups(elements);
				Terrasoft.defer(function() {
					const groupNames = _.keys(this._groups);
					let isValid = true;
					groupNames.forEach(function(group) {
						const groupItems = this._findGroupItems(group, elements);
						const itemsCount = this.calculateGroupItems(groupItems.getItems(), elements.getItems()).length;
						if(itemsCountBeforePositionChange[group] !== itemsCount) {
							isValid = false;
						}
					}, this);
					Ext.callback(callback, scope, [isValid]);
				}, this);
			} else {
				Ext.callback(callback, scope, [true]);
			}
		}, 1, {trailing: false})

		//endregion

	});

});


