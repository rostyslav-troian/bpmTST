Terrasoft.configuration.Structures["ContentSectionViewModel"] = {innerHierarchyStack: ["ContentSectionViewModel"]};
define("ContentSectionViewModel", ["ContentSectionViewModelResources", "ContentBuilderConstants",
			"BaseContentBlockViewModel", "ContentMjColumnViewModel", "ContentMjGroupViewModel"], function(resources) {
	/**
	 * Class for ContentSectionViewModel.
	 */
	Ext.define("Terrasoft.controls.ContentSectionViewModel", {
		extend: "Terrasoft.controls.BaseContentBlockViewModel",
		alternateClassName: "Terrasoft.ContentSectionViewModel",

		/**
		 * Name of the view class.
		 * @protected
		 * @type {String}
		 */
		className: "Terrasoft.ContentSection",

		/**
		 * @inheritdoc BaseContentSerializableViewModelMixin#serializableSlicePropertiesCollection
		 * @override
		 */
		serializableSlicePropertiesCollection: ["ItemType", "Styles"],

		attributes: {
			"ReverseColumnOrder": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		},

		/**
		 * @inheritdoc BaseContentSerializableViewModelMixin#childItemTypes
		 */
		childItemTypes: {
			column: "Terrasoft.ContentMjColumnViewModel",
			mjgroup: "Terrasoft.ContentMjGroupViewModel"
		},

		/**
		 * @private
		 */
		_applyUngroupColumnCondition: function(elementId) {
			var group = this.getGroupWithColumn(elementId);
			if (group && group.$ItemType === "mjgroup" && group.$Items.getCount() === 2) {
				var groupIndex = this.$Items.indexOfKey(group.$Id);
				this.replaceGroupWithColumns(group, groupIndex, this.$ReverseColumnOrder);
			}
		},

		/**
		 * @private
		 */
		_getUngroupingCode: function(group, leftColumn, rightColumn) {
			var code = 0;
			code |= group.$Items.first() === leftColumn ? 1 : 0;
			code |= group.$Items.last() === rightColumn ? 2 : 0;
			return code;
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function(config) {
			this.callParent(arguments);
			this.initResourcesValues(resources);
			if (config && config.values && config.values.Styles) {
				this.set("ReverseColumnOrder", config.values.Styles.direction === "rtl");
			}
		},

		/**
		 * @inheritDoc BaseContentItemViewModel#getPreparedConfigBeforeCreate
		 */
		getPreparedConfigBeforeCreate: function(config) {
			var changedConfig = this.callParent(arguments);
			changedConfig.Styles = changedConfig.Styles || {};
			var items = changedConfig.Items;
			if (Ext.isEmpty(items)) {
				items = [{
					ItemType: "column",
					Width: 100
				}];
			}
			changedConfig.Items = items;
			return changedConfig;
		},

		/**
		 * @inheritdoc Terrasoft.BaseContentBlockViewModel#getViewConfig
		 * @override
		 */
		getViewConfig: function() {
			var config = this.callParent(arguments);
			Ext.apply(config, {
				"selected": "$Selected",
				"isSelectable": true,
				"reverseColumnOrder": "$ReverseColumnOrder"
			});
			return config;
		},

		/**
		 * Returns config object of section item edit.
		 * @protected
		 * @returns {Object} Section item edit config.
		 */
		getItemEditConfig: function(item) {
			var itemConfig = {
				Id: item.$Id,
				ItemType: item.$ItemType,
				Width: item.$Width
			};
			if (item.$ItemType === Terrasoft.ContentBuilderBodyItemType.mjgroup.value) {
				itemConfig.Items = [];
				Terrasoft.each(item.$Items, function(subItem) {
					itemConfig.Items.push(this.getItemEditConfig(subItem));
				}, this);
			}
			return itemConfig;
		},

		/**
		 * Returns config object of view model edit page.
		 * @protected
		 * @virtual
		 * @returns {Object} Full edit page config.
		 */
		getEditConfig: function() {
			var config = {
				ItemType: this.$ItemType,
				Items: [],
				Styles: this.$Styles,
				ElementInfo: {
					Type: this.$ItemType,
					DesignTimeConfig: {
						Caption: resources.localizableStrings.PropertiesPageCaption
					},
					Settings: {
						schemaName: "ContentSectionPropertiesPage",
						panelIcon: resources.localizableImages.PropertiesPageIcon,
						contextHelpText: resources.localizableStrings.PropertiesPageContextHelp,
						useBackgroundImage: false,
						isStylesVisible: true
					}
				}
			};
			Terrasoft.each(this.$Items, function(item) {
				config.Items.push(this.getItemEditConfig(item));
			}, this);
			return config;
		},

		/**
		 * @inheritdoc BaseContentSerializableViewModelMixin#removeChildItem
		 * @override
		 */
		removeChildItem: function(itemId) {
			this._applyUngroupColumnCondition(itemId);
			var isRemoved = this.mixins.SerializableMixin.removeChildItem.call(this, itemId);
			if (!isRemoved) {
				Terrasoft.each(this.$Items, function(item) {
					isRemoved = item.removeChildItem(itemId);
					return !isRemoved;
				}, this);
			}
		},

		/**
		 * Handler of event 'itemChanged' of Terrasoft.Collection.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} item Changed collection item.
		 * @param {Object} config Event parameters.
		 */
		onItemChanged: function(item, config) {
			if (config.event) {
				switch (config.event) {
					case "groupcolumns":
						this.onGroupColumns(config.arguments.id);
						break;
					case "ungroupcolumns":
						this.onUngroupColumns(config.arguments.id);
						break;
					default:
						this.callParent(arguments);
						break;
				}
			}
		},

		/**
		 * Updates structure elements position, styles etc.
		 * @protected
		 * @param {Array} itemsToUpdate
		 */
		updateStructureItems: function(itemsToUpdate) {
			Terrasoft.each(itemsToUpdate, function(item) {
				var itemToUpdate = this.$Items.find(item.Id) || this.getGroupWithColumn(item.Id);
				if (!itemToUpdate) {
					return true;
				}
				if (itemToUpdate.$Id !== item.Id) {
					itemToUpdate = itemToUpdate.$Items.find(item.Id);
				}
				itemToUpdate.set("Width", item.Width);
				if (itemToUpdate.$RelativeWidth) {
					itemToUpdate.set("RelativeWidth", item.RelativeWidth);
				}
				var wrapperStyles = itemToUpdate.$WrapperStyles;
				if (wrapperStyles) {
					wrapperStyles.width = (item.RelativeWidth || item.Width) + "%";
				}
				if (!Terrasoft.isEmpty(item.Items)) {
					this.updateStructureItems(item.Items);
				}
			}, this);
		},

		/**
		 * Changes items order.
		 * @protected
		 * @param {Terrasoft.BaseViewModelCollection} items Items to reverse order.
		 */
		applyReverseItemsOrder: function(items) {
			var maxIndex = items.getCount() - 1;
			for (var i = 0; i < maxIndex; i++) {
				items.move(maxIndex, i);
			}
			items.fireEvent("dataLoaded", items);
		},

		/**
		 * Makes reverse order of structure items.
		 * @param {Object} styles Content item styles.
		 */
		reverseItemsOrder: function(styles) {
			this.$ReverseColumnOrder = styles.direction === "rtl";
			this.set("ReverseColumnOrder", this.$ReverseColumnOrder);
			this.applyReverseItemsOrder(this.$Items);
			var itemStyles = Terrasoft.deepClone(this.$Styles);
			Ext.apply(itemStyles, styles);
			this.$Styles = itemStyles;
			this.fireEvent("change", this, {
				event: "onitemconfigchanged",
				arguments: ["ContentItemConfigChanged", ["ItemPanel"]]
			});
		},

		/**
		 * Returns parent group for specified column id.
		 * @param {Terrasoft.ContentSectionViewModel} selectedItem Selected section.
		 * @param {String} columnId Unique identifier of column.
		 * @returns {Terrasoft.ContentMjGroupViewModel} Group view model.
		 */
		getGroupWithColumn: function(columnId) {
			var group;
			Terrasoft.each(this.$Items, function(item) {
				var column = item.$Items.find(columnId);
				if (column) {
					group = item;
					return false;
				}
			}, this);
			return group;
		},

		/**
		 * Handler on column's grouping action.
		 * @protected
		 * @param {String} columnId Unique identifier of column which provide grouping action.
		 */
		onGroupColumns: function(columnId) {
			var elementToGroup = this.$Items.find(columnId)
				|| this.getGroupWithColumn(columnId);
			var elementIndex = this.$Items.indexOfKey(elementToGroup.$Id);
			var nextElementToGroup = this.$Items.getByIndex(elementIndex + 1);
			if (elementToGroup && nextElementToGroup) {
				this.applyGroupingAction(elementToGroup, nextElementToGroup, elementIndex,
					this.$ReverseColumnOrder);
			}
		},

		/**
		 * Handler on column's ungrouping action.
		 * @protected
		 * @param {String} columnId Unique identifier of column which provide ungrouping action.
		 */
		onUngroupColumns: function(columnId) {
			var group = this.$Items.find(columnId)
				|| this.getGroupWithColumn(columnId);
			if (!group) {
				return;
			}
			var groupIndex = this.$Items.indexOfKey(group.$Id);
			var sourceColumn = group.$Items.get(columnId);
			var columnIndex = group.$Items.indexOfKey(columnId);
			var nextColumn = group.$Items.getByIndex(columnIndex + 1);
			if (sourceColumn && nextColumn) {
				this.applyUngroupingAction(group, sourceColumn, nextColumn, groupIndex,
					this.$ReverseColumnOrder);
			}
		},

		/**
		 * Adds column to existing mjgroup.
		 * @protected
		 * @param {Terrasoft.ContentMjGroupViewModel} group Group to add item.
		 * @param {Terrasoft.ContentColumnViewModel} column Column to add.
		 * @param {Boolean} isToStart Direction of add action.
		 */
		addColumnToGroup: function(group, column, isToStart) {
			var itemConfig = column.serializeViewModel();
			this.$Items.removeByKey(column.$Id);
			var insertIndex = isToStart ? 0 : group.$Items.length - 1;
			group.addChildItem(itemConfig, insertIndex);
		},

		/**
		 * Returns new mjgroup item.
		 * @protected
		 * @param {Array} columns List of inner columns.
		 * @returns {Terrasoft.ContentMjGroupViewModel} New group.
		 */
		createColumnGroup: function(columns) {
			var items = columns.map(
				function(column) {
					return column.serializeViewModel();
				});
			var groupConfig = {
				ItemType: "mjgroup",
				Items: items
			};
			return this.createItemViewModel(groupConfig);
		},

		/**
		 * Adds mjgroup to section with specified inner columns.
		 * @protected
		 * @param {Array} columns List of group inner columns.
		 * @param {Number} index Collection index to insert.
		 */
		addColumnGroup: function(columns, index) {
			if (Terrasoft.isEmpty(columns)) {
				return;
			}
			var group = this.createColumnGroup(columns);
			Terrasoft.each(columns, function(column) {
				this.$Items.removeByKey(column.$Id);
			}, this);
			this.$Items.insert(index, group.$Id, group);
		},

		/**
		 * Replaces columns of all groups to master group.
		 * @protected
		 * @param {Array} groups List of groups to merge.
		 */
		mergeColumnGroups: function(groups, index) {
			var columns = [];
			Terrasoft.each(groups, function(group) {
				group.$Items.each(function(col) {
					delete col.$WrapperStyles.width;
					columns.push(col);
				});
				this.$Items.removeByKey(group.$Id);
			}, this);
			var newGroup = this.createColumnGroup(columns);
			this.$Items.insert(index, newGroup.$Id, newGroup);
		},

		/**
		 * Splits group on specified inner column.
		 * @protected
		 * @param {Terrasoft.ContentMjGroupViewModel} group Group to split.
		 * @param {Terrasoft.ContentColumnViewModel} rightColumn Column which provides split action.
		 * @param {Number} index Collection index to insert action.
		 * @param {Boolean} isReverse Flag to indicate reverse items order for parent section viewModel.
		 */
		splitGroup: function(group, rightColumn, index, isReverse) {
			var startIndex = group.$Items.indexOf(rightColumn);
			var leftGroupColumnRange = group.$Items
				.getRange(0, startIndex)
				.mapArray(function(el) {
					return el;
				});
			var rightGroupColumnRange = group.$Items
				.getRange(startIndex, group.$Items.getCount())
				.mapArray(function(el) {
					return el;
				});
			var leftGroup = this.createColumnGroup(isReverse ? rightGroupColumnRange : leftGroupColumnRange);
			var rightGroup = this.createColumnGroup(isReverse ? leftGroupColumnRange : rightGroupColumnRange);
			this.$Items.removeByKey(group.$Id);
			this.$Items.insert(index, leftGroup.$Id, leftGroup);
			this.$Items.insert(index + 1, rightGroup.$Id, rightGroup);
		},

		/**
		 * Replaces column from group to section.
		 * @protected
		 * @param {Terrasoft.ContentMjGroupViewModel} group Column's parent group.
		 * @param {Terrasoft.ContentColumnViewModel} rightColumn Column to replace.
		 * @param {Number} index Collection index to insert action.
		 */
		moveColumnFromGroup: function(group, columnToMove, index) {
			var itemConfig = columnToMove.serializeViewModel();
			group.$Items.removeByKey(columnToMove.$Id);
			delete itemConfig.WrapperStyles.width;
			this.addChildItem(itemConfig, index);
		},

		/**
		 * Replaces group inner columns to section with group remove action.
		 * @protected
		 * @param {Terrasoft.ContentMjGroupViewModel} group Group to remove.
		 * @param {Number} index Collection index of group.
		 * @param {Boolean} isReverse Flag to indicate reverse items order for parent section viewModel.
		 * @returns {Object} Replaced columns' mapping.
		 */
		replaceGroupWithColumns: function(group, index, isReverse) {
			Terrasoft.each(group.$Items, function(column) {
				var id = column.$Id;
				var itemConfig = column.serializeViewModel();
				delete itemConfig.WrapperStyles.width;
				var vm = this.createItemViewModel(itemConfig);
				vm.$Id = id;
				this.$Items.insert(index, id, vm);
				if (!isReverse) {
					index++;
				}
			}, this);
			this.$Items.removeByKey(group.$Id);
		},

		/**
		 * Applies specific grouping logic for current action.
		 * @protected
		 * @param {Terrasoft.ContentMjGroupViewModel | Terrasoft.ContentColumnViewModel} elementToGroup
		 * Left element to group.
		 * @param {Terrasoft.ContentMjGroupViewModel | Terrasoft.ContentColumnViewModel} nextElementToGroup
		 * Right element to group.
		 * @param {Number} index Collection index for insert action.
		 * @param {Boolean} isReverse Flag to indicate reverse items order for parent section viewModel.
		 */
		applyGroupingAction: function(elementToGroup, nextElementToGroup, index, isReverse) {
			var groupingCode = Ext.String.format("{0}-{1}",
				elementToGroup.$ItemType, nextElementToGroup.$ItemType);
			switch (groupingCode) {
				case Terrasoft.ContentBuilderGroupingCode.COLUMN_COLUMN:
					var columns = [elementToGroup, nextElementToGroup];
					if (isReverse) {
						columns.reverse();
					}
					this.addColumnGroup(columns, index);
					break;
				case Terrasoft.ContentBuilderGroupingCode.COLUMN_GROUP:
					this.addColumnToGroup(nextElementToGroup, elementToGroup, !isReverse);
					break;
				case Terrasoft.ContentBuilderGroupingCode.GROUP_COLUMN:
					this.addColumnToGroup(elementToGroup, nextElementToGroup, isReverse);
					break;
				case Terrasoft.ContentBuilderGroupingCode.GROUP_GROUP:
					var groups = [elementToGroup, nextElementToGroup];
					if (isReverse) {
						groups.reverse();
					}
					this.mergeColumnGroups(groups, index);
					break;
				default:
					break;
			}
			this.fireEvent("change", this, {
				event: "onitemconfigchanged",
				arguments: ["ContentItemConfigChanged", ["PropertiesPage"]]
			});
		},

		/**
		 * Applies specific ungrouping logic for current action.
		 * @protected
		 * @param {Terrasoft.ContentMjGroupViewModel} group Current group.
		 * @param {Terrasoft.ContentColumnViewModel} leftColumn Left column to ungroup.
		 * @param {Terrasoft.ContentColumnViewModel} rightColumn Right column to ungroup.
		 * @param {Number} index Collection index for insert action.
		 * @param {Boolean} isReverse Flag to indicate reverse items order for parent section viewModel.
		 */
		applyUngroupingAction: function(group, leftColumn, rightColumn, index, isReverse) {
			var columnIndex = isReverse ? index + 1 : index;
			var ungroupingCode = this._getUngroupingCode(group, leftColumn, rightColumn);
			switch (ungroupingCode) {
				case Terrasoft.ContentBuilderUngroupingCode.SPLIT:
					this.splitGroup(group, rightColumn, index, isReverse);
					break;
				case Terrasoft.ContentBuilderUngroupingCode.FIRST:
					this.moveColumnFromGroup(group, leftColumn, columnIndex);
					break;
				case Terrasoft.ContentBuilderUngroupingCode.LAST:
					columnIndex = isReverse ? index : index + 1;
					this.moveColumnFromGroup(group, rightColumn, columnIndex);
					break;
				case Terrasoft.ContentBuilderUngroupingCode.ALL:
					this.replaceGroupWithColumns(group, index, isReverse);
					break;
				default:
					break;
			}
			this.fireEvent("change", this, {
				event: "onitemconfigchanged",
				arguments: ["ContentItemConfigChanged", ["PropertiesPage"]]
			});
		}

	});
	return Terrasoft.ContentSectionViewModel;
});


