Terrasoft.configuration.Structures["GridSettingsDesignerContainer"] = {innerHierarchyStack: ["GridSettingsDesignerContainer"]};
define('GridSettingsDesignerContainerStructure', ['GridSettingsDesignerContainerResources'], function(resources) {return {schemaUId:'c8ad7d19-78b2-488a-96d6-7663e5b09354',schemaCaption: "GridSettingsDesignerContainer", parentSchemaName: "", schemaName:'GridSettingsDesignerContainer',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("GridSettingsDesignerContainer", ["GridSettingsDesignerContainerResources", "GridSettingsDesignerItem"
], function(resources) {
	Ext.define("Terrasoft.controls.GridSettingsDesignerContainer", {
		alternateClassName: "Terrasoft.GridSettingsDesignerContainer",
		extend: "Terrasoft.GridLayoutTableEdit",

		/**
		 * The name of the grid elements class.
		 * @protected
		 * @type {String}
		 */
		itemClassName: "Terrasoft.GridSettingsDesignerItem",

		/**
		 * @inheritdoc Terrasoft.GridLayoutEdit#rows
		 * @overridden
		 */
		rows: 1,

		/**
		 * @inheritdoc Terrasoft.GridLayoutEdit#maxRows
		 * @overridden
		 */
		minRows: 1,

		/**
		 * @inheritdoc Terrasoft.GridLayoutEdit#maxRows
		 * @overridden
		 */
		maxRows: 100,

		/**
		 * @inheritdoc Terrasoft.GridLayoutEdit#columns
		 * @overridden
		 */
		columns: 24,

		/**
		 * @inheritdoc Terrasoft.GridLayoutEdit#minColumns
		 * @overridden
		 */
		minColumns: 24,

		/**
		 * @inheritdoc Terrasoft.GridLayoutEdit#maxColumns
		 * @overridden
		 */
		maxColumns: 24,

		/**
		 * Max columns in tiled mode.
		 */
		maxColumnsTiled: 24,

		/**
		 * Scroll position.
		 */
		scrollValue: 0,

		/**
		 * Count of columns that visible in same time.
		 */
		visibleColumns: 24,

		/**
		 * Grid type.
		 */
		gridType: false,

		/**
		 * @inheritdoc Terrasoft.GridLayoutEdit#itemActions
		 * @overridden
		 */
		itemActions: [
			{
				className: "Terrasoft.Button",
				imageConfig: resources.localizableImages.ChangeIcon,
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				tag: "editItem",
				markerValue: "editItem"
			},
			{
				className: "Terrasoft.Button",
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				imageConfig: resources.localizableImages.DeleteIcon,
				tag: "deleteItem",
				markerValue: "deleteItem"
			},
			{
				className: "Terrasoft.Button",
				imageConfig: resources.localizableImages.AddIcon,
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				tag: "addLeft",
				markerValue: "addLeftItem"
			},
			{
				className: "Terrasoft.Button",
				imageConfig: resources.localizableImages.AddIcon,
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				tag: "addRight",
				markerValue: "addRightItem"
			}
		],

		/**
		 * @inheritdoc Terrasoft.GridLayoutEdit#fixedCellWidth
		 * @overridden
		 */
		fixedCellWidth: false,

		/**
		 * @inheritdoc Terrasoft.GridLayoutEdit#cellWidth
		 * @overridden
		 */
		cellWidth: 100 / 24,

		/**
		 * @inheritdoc Terrasoft.GridLayoutEdit#cellHeight
		 * @overridden
		 */
		cellHeight: 2.8,

		/**
		 * Default width of new cell.
		 * @private
		 */
		defaultNewCellWidth: 4,

		/**
		 * A sign of loading data in a collection.
		 * @protected
		 * @type {Boolean}
		 */
		isCollectionLoading: false,

		/**
		 * Handler of the horizontal scroll value changed.
		 * @type {Function}
		 * @private
		 */
		_debounceOnScrollValueChanged: null,

		//region Methods: Private

		/**
		 * Returns item by target column.
		 * @private
		 * @param {Number} column Target column.
		 * @param {Number} row Target row.
		 * @return {Terrasoft.BaseViewModel} Target item.
		 */
		_getItemByColumn: function(column, row) {
			var item = this.items.findByFn(function(viewModelItem) {
				var itemColumn = viewModelItem.get("column");
				var itemColSpan = viewModelItem.get("colSpan");
				var itemRow = viewModelItem.get("row");
				return itemColumn <= column && itemColumn + itemColSpan > column && itemRow === row;
			}, this);
			return item;
		},

		/**
		 * Returns nearest neighbour from right in row.
		 * @private
		 * @param {Number} column Column index.
		 * @param {Number} row Row index.
		 * @return {Terrasoft.BaseViewModel} Nearest neighbour from right.
		 */
		_getNearestFromRightByColumn: function(column, row) {
			var rightNeignbour;
			this.items.each(function(item) {
				var itemColumn = item.get("column");
				var itemRow = item.get("row");
				var existNearestNeighbour = (rightNeignbour && itemColumn < rightNeignbour.get("column")
					|| !rightNeignbour);
				if (itemRow === row && itemColumn > column && existNearestNeighbour) {
					rightNeignbour = item;
				}
			}, this);
			return rightNeignbour;
		},

		/**
		 * Handles drag&drop event to left.
		 * @private
		 * @param {Terrasoft.BaseViewModel} targetItem Drop zone item view model.
		 * @param {Terrasoft.GridSettingsDesignerItem} eventItem Drag&drop element.
		 */
		_handleLeftDragAndDrop: function(targetItem, eventItem) {
			var targetColumn = targetItem.get("column");
			var rightBorder = eventItem.oldPosition.column + eventItem.oldPosition.colSpan;
			this._shiftRow(targetColumn - 1, rightBorder, eventItem.colSpan, eventItem.row, this.items);
			var eventViewModel = this.items.get(eventItem.itemId);
			eventViewModel.set("column", targetColumn);
		},

		/**
		 * Handles drag&drop event to right.
		 * @private
		 * @param {Terrasoft.BaseViewModel} targetItem Drop zone item view model.
		 * @param {Terrasoft.GridSettingsDesignerItem} eventItem Drag&drop element.
		 */
		_handleRightDragAndDrop: function(targetItem, eventItem) {
			var targetColumn = targetItem.get("column");
			var targetColSpan = targetItem.get("colSpan");
			var leftBorder = eventItem.oldPosition.column - 1;
			var rightBorder = targetColumn + targetColSpan;
			this._shiftRow(leftBorder, rightBorder, -eventItem.colSpan, eventItem.row, this.items);
			var eventViewModel = this.items.get(eventItem.itemId);
			eventViewModel.set("column", targetColumn + targetColSpan - eventItem.colSpan);
		},

		/**
		 * Inserts source cell into destination column with single width.
		 * @private
		 * @param {Terrasoft.BaseViewModel} destinationCellViewModel Destination column view model.
		 * @param {Terrasoft.BaseViewModel} sourceCellViewModel Source column view model.
		 */
		_insertIntoCell: function(destinationCellViewModel, sourceCellViewModel) {
			var destinationColSpan = destinationCellViewModel.get("colSpan");
			var destinationColumn = destinationCellViewModel.get("column");
			var destinationRow = destinationCellViewModel.get("row");
			sourceCellViewModel.set("setColSpanSilent", true);
			sourceCellViewModel.set("colSpan", 1);
			sourceCellViewModel.set("column", destinationColumn);
			sourceCellViewModel.set("row", destinationRow);
			destinationCellViewModel.set("setColSpanSilent", true);
			destinationCellViewModel.set("colSpan", destinationColSpan - 1);
			destinationCellViewModel.set("column", destinationColumn + 1);
		},

		/**
		 * Inserts source cell into row by destination cell view model.
		 * @private
		 * @param {Terrasoft.BaseViewModel} destinationCellViewModel Destination cell view model.
		 * @param {Terrasoft.BaseViewModel} sourceCellViewModel Source column view model.
		 */
		_insertIntoRow: function(destinationCellViewModel, sourceCellViewModel) {
			var column = destinationCellViewModel.get("column");
			var row = destinationCellViewModel.get("row");
			var sourceColSpan = sourceCellViewModel.get("colSpan");
			this._shiftRow(column - 1, this._getMaxColumns(), sourceColSpan, row, this.items);
			sourceCellViewModel.set("column", column);
			sourceCellViewModel.set("row", row);
		},

		/**
		 * Deletes gaps from row.
		 * @private
		 * @param {Number} row Row index.
		 * @param {Terrasoft.BaseViewModelCollection} collection Items.
		 */
		_deleteGapsFromRow: function(row, collection) {
			collection.eachKey(function(key, item) {
				item.id = key;
			});
			collection.sortByFn(function(item1, item2) {
				var item1Row = item1.get("row");
				var item2Row = item2.get("row");
				if (item1Row === row && item2Row === row) {
					return item1.get("column") > item2.get("column") ? 1 : -1;
				} else {
					return item1Row === row
						? 1
						: item2Row === row
							? -1
							: 0;
				}
			}, this);
			var currentDiff = 0;
			var currentColNumber = 0;
			collection.each(function(item) {
				var itemRow = item.get("row");
				if (itemRow === row) {
					var itemColumn = item.get("column");
					var itemColSpan = item.get("colSpan");
					if (itemColumn !== currentColNumber) {
						currentDiff = itemColumn - currentColNumber;
					}
					currentColNumber += itemColSpan;
					if (currentDiff) {
						item.set("column", itemColumn - currentDiff);
					}
				}
			}, this);
		},

		/**
		 * Shifts entire collection below given rowIndex.
		 * @private
		 * @param {Number} rowIndex Row index.
		 * @param {Terrasoft.BaseViewModelCollection} collection Items.
		 */
		_shiftUp: function(rowIndex, collection) {
			collection.each(function(item) {
				var itemRow = item.get("row");
				if (item.get("row") > rowIndex) {
					item.set("row", itemRow - 1);
				}
			}, this);
		},

		/**
		 * Handle vertical drag&drop event.
		 * @private
		 * @param {Terrasoft.BaseViewModel} targetItem Drop zone item view model.
		 * @param {Terrasoft.GridSettingsDesignerItem} eventItem Drag&drop element.
		 */
		_handleVerticalDragAndDrop: function(targetItem, eventItem) {
			var oldRow = eventItem.oldPosition.row;
			var targetRow = targetItem.get("row");
			var targetRowWidth = this._getRowWidth(targetRow, this.items);
			var eventModel = this.items.get(eventItem.itemId);
			if (targetRowWidth === this._getMaxColumns()) {
				if (targetItem.get("colSpan") > 1) {
					this._insertIntoCell(targetItem, eventModel);
				}
			} else {
				if (targetRowWidth + eventItem.colSpan > this._getMaxColumns()) {
					eventItem.setColSpan(this._getMaxColumns() - targetRowWidth);
				}
				this._insertIntoRow(targetItem, eventModel);
			}
			this._purifyRow(oldRow, this.items);
		},

		/**
		 * Clears row.
		 * @private
		 * @param {Number} rowId Row index.
		 * @param {Terrasoft.BaseViewModelCollection} collection Items.
		 */
		_purifyRow: function(rowId, collection) {
			this._deleteGapsFromRow(rowId, collection);
			if (this._getRowWidth(rowId, collection) === 0 && this.rows > 1) {
				this._shiftUp(rowId, collection);
				this.setRows(this.rows - 1);
			}
		},

		/**
		 * Method for sort collection by initial item position.
		 * Items without initial position will be placed in the end.
		 * @private
		 * @param {Terrasoft.BaseViewModel} item1 Collection item.
		 * @param {Terrasoft.BaseViewModel} item2 Collection item.
		 * @returns {Number} Sort item position.
		 */
		_sortByInitialPosition: function(item1, item2) {
			var item1Row = item1.get("row");
			var item2Row = item2.get("row");
			if (!Ext.isDefined(item1Row) && Ext.isDefined(item2Row)) {
				return 1;
			}
			if (Ext.isDefined(item1Row) && !Ext.isDefined(item2Row)) {
				return -1;
			}
			return 0;
		},

		/**
		 * Clears grid items collection.
		 * @private
		 * @param {Terrasoft.BaseViewModelCollection} collection Items.
		 */
		_purifyGrid: function(collection) {
			var rowIndex = 0;
			var rowsCount = 1;
			collection.eachKey(function(key, item) {
				if (item.get("row") + 1 > rowsCount) {
					rowsCount = item.get("row") + 1;
				}
			}, this);
			this.rows = rowsCount;
			var currentRows = this.rows;
			while (rowIndex < this.rows) {
				this._purifyRow(rowIndex, collection);
				if (currentRows === this.rows) {
					rowIndex++;
				} else {
					currentRows--;
				}
			}
			collection.sortByFn(this._sortByInitialPosition);
		},

		/**
		 * Handles remove item from collection by Id.
		 * @private
		 * @param {String} itemId ViewModel item id.
		 */
		_removeItemById: function(itemId) {
			var targetItem = this.items.get(itemId);
			var targetItemRow = targetItem.get("row");
			this.items.removeByKey(itemId);
			this.isCollectionLoading = true;
			this._purifyRow(targetItemRow, this.items);
			this.fireEvent("afterColspanChanged", this._getRowWidth(0, this.items), this._getMaxColumns());
			if (this.gridType === Terrasoft.GridType.LISTED) {
				this.setColumns(this._getRowWidth(0, this.items));
			}
			this.isCollectionLoading = false;
			this.safeRerender();
		},

		/**
		 * Returns right element view model in row.
		 * @private
		 * @param {Number} row Row index.
		 */
		_getRightElementInRow: function(row) {
			var maxColumn = 0;
			var maxColumnItem;
			this.items.each(function(item) {
				var itemColumn = item.get("column");
				if (itemColumn >= maxColumn && item.get("row") === row) {
					maxColumn = itemColumn;
					maxColumnItem = item;
				}
			}, this);
			return maxColumnItem;
		},

		/**
		 * Returns actual width of row elements.
		 * @private
		 * @param {Number} row Row index.
		 * @param {Terrasoft.BaseViewModelCollection} collection Items.
		 * @return {Number} Actual width of row elements.
		 */
		_getRowWidth: function(row, collection) {
			var width = 0;
			collection.each(function(item) {
				if (item.get("row") === row) {
					var itemColSpan = item.get("colSpan");
					if (!Ext.isEmpty(itemColSpan)) {
						width += itemColSpan;
					}
				}
			}, this);
			return width;
		},

		/**
		 * Returns position of new element.
		 * @private
		 * @param {Terrasoft.BaseViewModelCollection} collection Items.
		 * @return {Object} New element position.
		 */
		_getNewElementPosition: function(collection) {
			var emptySpace;
			var newRow;
			var newColumn;
			if (this.gridType === Terrasoft.GridType.LISTED) {
				newRow = 0;
				newColumn = this._getRowWidth(0, collection);
				emptySpace = this._getMaxColumns() - this._getRowWidth(0, collection);
			} else {
				emptySpace = this._getMaxColumns() - this._getRowWidth(this.rows - 2, collection);
				if (this.rows === 1) {
					newRow = 0;
				} else {
					newRow = emptySpace ? this.rows - 2 : this.rows - 1;
				}
				newColumn = emptySpace ? this._getRowWidth(this.rows - 2, collection) : 0;
			}
			var newColSpan = emptySpace
				? emptySpace > this.defaultNewCellWidth
					? this.defaultNewCellWidth
					: emptySpace
				: this.defaultNewCellWidth;
			return {
				row: newRow,
				column: newColumn,
				colSpan: newColSpan
			};
		},

		/**
		 * Insert new element after inside click.
		 * @private
		 * @param {Terrasoft.BaseViewModel} item Item viewModel.
		 * @param {Terrasoft.BaseViewModelCollection} collection Items collection.
		 */
		_insertNewElement: function(item, collection) {
			var emptySpace;
			var itemRow = item.get("row");
			var itemColumn = item.get("column");
			emptySpace = this._getMaxColumns() - this._getRowWidth(itemRow, collection);
			var newColSpan = emptySpace > this.defaultNewCellWidth
				? this.defaultNewCellWidth
				: emptySpace;
			this._shiftRow(itemColumn - 1, this._getMaxColumns(), newColSpan, itemRow, collection);
			item.set("column", itemColumn);
			item.set("colSpan", newColSpan);
		},

		/**
		 * Returns true if new row is needed.
		 * @private
		 * @param {Terrasoft.BaseViewModelCollection} collection Items.
		 * @return {Boolean}
		 */
		_isNewRowNeeded: function(collection) {
			if (this.gridType === Terrasoft.GridType.LISTED) {
				return false;
			} else {
				return this._getRowWidth(this.rows - 1, collection) !== 0;
			}
		},

		/**
		 * Shifts row to the right.
		 * @private
		 * @param {Number} startPosition Start position.
		 * @param {Number} endPosition End position.
		 * @param {Number} offset Offset.
		 * @param {Number} row Row index.
		 * @param {Terrasoft.BaseViewModelCollection} collection Items.
		 */
		_shiftRow: function(startPosition, endPosition, offset, row, collection) {
			collection.each(function(item) {
				var itemColumn = item.get("column");
				if (startPosition < itemColumn && endPosition > itemColumn && row === item.get("row")) {
					var itemColumnValue = item.get("column");
					itemColumnValue += offset;
					item.set("column", itemColumnValue);
				}
			});
		},

		/**
		 * Puts element to the right of the row.
		 * @private
		 * @param {Object} intersectionPosition Intersection position.
		 * @param {Terrasoft.GridSettingsDesignerItem} eventItem Drag&drop element.
		 */
		_pullRightElement: function(intersectionPosition, eventItem) {
			var oldRow = eventItem.oldPosition.row;
			var newRow = intersectionPosition.row;
			var newRowWidth = this._getRowWidth(newRow, this.items);
			var newElementColSpan = this._getMaxColumns() - newRowWidth > eventItem.colSpan
				? eventItem.colSpan
				: this._getMaxColumns() - newRowWidth;
			var eventViewModel = this.items.get(eventItem.itemId);
			eventViewModel.set("column", newRowWidth);
			eventViewModel.set("row", newRow);
			eventViewModel.set("colSpan", newElementColSpan);
			this._purifyRow(oldRow, this.items);
		},

		/**
		 * Returns left neighbour for left add click.
		 * @private
		 * @param shouldShift
		 * @param itemRow
		 * @param itemColumn
		 * @returns {*}
		 */
		_getLeftElementForAddLeft: function(shouldShift, itemRow, itemColumn) {
			var leftNeighbour = shouldShift
				? this._getItemByColumn(itemColumn - 1, itemRow)
				: null;
			if (!leftNeighbour && shouldShift) {
				leftNeighbour = this._getItemByColumn(0, itemRow);
			}
			return leftNeighbour;
		},

		/**
		 * @private
		 */
		_showColumlLimitExceededMessage: function() {
			var maxCount = this._getMaxColumns();
			var message = Ext.String.format(resources.localizableStrings.ColumlLimitExceededMessage, maxCount);
			Terrasoft.showInformation(message);
		},

		/**
		 * @private
		 */
		_findResizableItem: function(itemId, position) {
			const items = this.items.clone().sort("$column");
			const startIndex = items.indexOfKey(itemId);
			if (position === "left") {
				for (let i = startIndex; i >= 0; i--) {
					let item = items.getByIndex(i);
					if (item.get("colSpan") > 1) {
						return item;
					}
				}
			} else {
				const count = items.getCount();
				for (let i = startIndex; i < count; i++) {
					let item = items.getByIndex(i);
					if (item.get("colSpan") > 1) {
						return item;
					}
				}
			}
			return null;
		},

		/**
		 * Handles add left click.
		 * @private
		 * @param {GUID} itemId itemId.
		 */
		_onAddLeftClick: function(itemId) {
			var itemRow = this.items.get(itemId).get("row");
			var itemColumn = this.items.get(itemId).get("column");
			var shouldShift = this._getRowWidth(itemRow, this.items) === this._getMaxColumns();
			var neighbourItem = this._getLeftElementForAddLeft(shouldShift, itemRow, itemColumn);
			var canFire = true;
			if (shouldShift && neighbourItem && neighbourItem.get("colSpan") <= 1) {
				neighbourItem = this._findResizableItem(itemId, "left") || this._findResizableItem(itemId, "right");
				canFire = neighbourItem;
			}
			if (canFire) {
				this.fireEvent("leftAddButtonClicked", itemId, neighbourItem);
			} else {
				this._showColumlLimitExceededMessage();
			}
		},

		/**
		 * Returns left neighbour for left add click.
		 * @private
		 * @param shouldShift
		 * @param itemRow
		 * @param itemColumn
		 * @returns {*}
		 */
		_getRightElementForAddLeft: function(shouldShift, itemRow, itemColumn) {
			var rightNeighbour = shouldShift
				? this._getNearestFromRightByColumn(itemColumn, itemRow)
				: null;
			if (!rightNeighbour && shouldShift) {
				rightNeighbour = this._getRightElementInRow(itemRow);
			}
			return rightNeighbour;
		},

		/**
		 * Handles add right click.
		 * @private
		 * @param {GUID} itemId itemId.
		 */
		_onAddRightClick: function(itemId) {
			var itemRow = this.items.get(itemId).get("row");
			var itemColumn = this.items.get(itemId).get("column");
			var shouldShift = this._getRowWidth(itemRow, this.items) === this._getMaxColumns();
			var neighbourItem = this._getRightElementForAddLeft(shouldShift, itemRow, itemColumn);
			var canFire = true;
			if (shouldShift && neighbourItem && neighbourItem.get("colSpan") === 1) {
				neighbourItem = this._findResizableItem(itemId, "right") || this._findResizableItem(itemId, "left");
				canFire = neighbourItem;
			}
			if (canFire) {
				this.fireEvent("rightAddButtonClicked", itemId, neighbourItem);
			} else {
				this._showColumlLimitExceededMessage();
			}
		},

		/**
		 * Puts element to the new row.
		 * @param {Terrasoft.BaseViewModel} elementViewModel Element viewmodel.
		 * @param {Number} newRow New row index.
		 * @param {Number} oldRow Old row index.
		 * @private
		 */
		_putElementToNewRow: function(elementViewModel, newRow, oldRow) {
			elementViewModel.set("column", 0);
			elementViewModel.set("row", newRow);
			this._purifyRow(oldRow, this.items);
			this.setRows(this.rows + 1);
		},

		/**
		 * Returns max columns value.
		 * @private
		 */
		_getMaxColumns: function() {
			return this.gridType === Terrasoft.GridType.TILED ? this.maxColumnsTiled : this.maxColumns;
		},

		/**
		 * Returns flag, should revert item position after drop.
		 * @private
		 * @param {Terrasoft.BaseViewModel} targetItem Drop item view model.
		 * @param {Terrasoft.GridSettingsDesignerItem} eventItem Item, that fired event.
		 * @param {Object} intersectionPosition Item position after drop.
		 * @return {boolean} Flag, should revert item position after drop.
		 */
		_getDropRevertConditions: function(targetItem, eventItem, intersectionPosition) {
			var targetColumn = targetItem.get("column");
			var oldRow = eventItem.oldPosition.row;
			var oldColumn = eventItem.oldPosition.column;
			var newRow = intersectionPosition.row;
			var newColumn = intersectionPosition.column;
			var shouldRevert = targetItem.get("colSpan") === 1 && oldRow !== newRow &&
				this._getRowWidth(newRow, this.items) === this._getMaxColumns();
			shouldRevert = shouldRevert || (targetColumn === oldColumn
				|| newColumn === oldColumn) && newRow === oldRow;
			return shouldRevert;
		},

		/**
		 * Changes items position after drop.
		 * @private
		 * @param {Terrasoft.BaseViewModel} targetItem Drop item view model.
		 * @param {Terrasoft.GridSettingsDesignerItem} eventItem Item, that fired event.
		 * @param {Object} intersectionPosition Item position after drop.
		 */
		_changeItemsPositionAfterDrop: function(targetItem, eventItem, intersectionPosition) {
			var newColumn = intersectionPosition.column;
			var newRow = intersectionPosition.row;
			var oldRow = eventItem.oldPosition.row;
			var oldColumn = eventItem.oldPosition.column;
			if (newRow === oldRow) {
				if (newColumn < oldColumn) {
					this._handleLeftDragAndDrop(targetItem, eventItem);
				} else {
					this._handleRightDragAndDrop(targetItem, eventItem);
				}
			} else {
				this._handleVerticalDragAndDrop(targetItem, eventItem);
			}
		},

		/**
		 * Returns appropriate value from the interval.
		 * @private
		 * @param value {Number} Value to be changed.
		 * @param min {Number} Interval left border.
		 * @param max {Number} Interval right border.
		 * @return {Number} Appropriate value form the interval.
		 */
		_getValueInsideRange: function(value, min, max) {
			if (value < min) {
				return min;
			}
			if (value > max) {
				return max;
			}
			return value;
		},

		/**
		 * Reverts item position.
		 * @private
		 * @param {Terrasoft.GridSettingsDesignerItem} eventItem Item, that fired event.
		 */
		_revertPosition: function(eventItem) {
			var eventViewModel = this.items.get(eventItem.itemId);
			eventViewModel.set("column", eventItem.oldPosition.column);
			eventViewModel.set("row", eventItem.oldPosition.row);
			this.updateSize(eventItem);
		},

		/**
		 * Handles resize to the right on full row.
		 * @private
		 * @param {Terrasoft.GridSettingsDesignerItem} eventItem Item, that fired event.
		 * @param {Number} shift Shift value.
		 */
		_handleRightResizeOnFullRow: function(eventItem, shift) {
			var oldItem = this.items.get(eventItem.itemId);
			var rightElement = this._getNearestFromRightByColumn(eventItem.column, eventItem.row);
			if (!rightElement) {
				oldItem.set("setColSpanSilent", true);
				eventItem.setColSpan(eventItem.oldPosition.colSpan, true);
			} else {
				var rightElementColSpan = rightElement.get("colSpan");
				var rightElementColumn = rightElement.get("column");
				if (rightElementColSpan > shift) {
					rightElement.set("column", rightElementColumn + shift);
					rightElement.set("setColSpanSilent", true);
					rightElement.set("colSpan", rightElementColSpan - shift);
				} else {
					oldItem.set("setColSpanSilent", true);
					eventItem.setColSpan(eventItem.oldPosition.colSpan, true);
				}
			}
		},

		/**
		 * Sets position for new item. Returns true if position has been setted.
		 * @private
		 * @param {Terrasoft.BaseViewModel} item Column setting item view model.
		 * @return {Bollean}
		 */
		_setNewItemPosition: function(item) {
			if (!Ext.isEmpty(item.get("column")) && Ext.isEmpty(item.get("colSpan"))
				&& !Ext.isEmpty(item.get("row"))) {
				this._insertNewElement(item, this.items);
				return true;
			}
			if (Ext.isEmpty(item.get("column")) && Ext.isEmpty(item.get("colSpan"))
				&& Ext.isEmpty(item.get("row"))) {
				item.set(this._getNewElementPosition(this.items));
				return true;
			}
		},

		/**
		 * Returns width in px of one cell.
		 * @private
		 * @return {Number} Width in px of one cell.
		 */
		_getCellWidthInPx: function() {
			return this.getGridEl().getWidth() / this.visibleColumns;
		},

		/**
		 * Returns borders of visible area.
		 * @private
		 * @return {Object} Borders of visible area.
		 * @return {Number} return.left Left border in cells.
		 * @return {Number} return.right Right border in cells.
		 */
		_getVisibleBorders: function() {
			const cellWidthInPx = this._getCellWidthInPx();
			const leftBorder = this.getGridEl().getScroll().left / cellWidthInPx;
			const rightBorder = leftBorder + this.visibleColumns;
			const borders = {
				left: leftBorder,
				right: rightBorder
			};
			return borders;
		},

		/**
		 * Returns condition for scrolling after adding element.
		 * @private
		 * @param {Terrasoft.BaseViewModel} item Added item view model.
		 * @return {Boolean} Condition for scrolling after adding element
		 */
		_isShouldScroll: function(item) {
			if (Terrasoft.getIsRtlMode()) {
				return true;
			}
			const visibleBorders = this._getVisibleBorders();
			let isShouldScroll = item.get("column") <= visibleBorders.left + 1;
			isShouldScroll = isShouldScroll || item.get("column") + item.get("colSpan") >= visibleBorders.right - 1;
			return isShouldScroll;
		},

		/**
		 * Gets column scroll distance.
		 * @private
		 * @param {Terrasoft.BaseViewModel} item Item view model.
		 * @return {Number} Column position by scroll.
		 */
		_getColumnScrollDistance: function(item) {
			const gridEl = this.getGridEl();
			const scrollWidth = gridEl.dom.scrollWidth - gridEl.dom.clientWidth;
			const itemColumn = item.get("column");
			const itemColSpan = item.get("colSpan");
			const rowWidth = this._getRowWidth(0, this.items);
			const oneColWidth = scrollWidth / rowWidth;
			let columnScrollDistance = oneColWidth * itemColumn + oneColWidth * itemColSpan / 2;
			if (itemColumn === 0) {
				columnScrollDistance = 0;
			}
			if (rowWidth - itemColSpan === itemColumn) {
				columnScrollDistance = rowWidth * itemColumn;
			}
			return columnScrollDistance;
		},

		//endregion

		//region Methods: Protected

		/**
		 * Scroll value changed event handler.
		 * @protected
		 */
		onScrollValueChanged: function() {
			this.fireEvent("scrollValueChanged", this.getGridEl().getScroll());
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEdit#getCellWidth
		 * @overridden
		 */
		getCellWidth: function() {
			return this.cellWidth;
		},

		init: function() {
			this.callParent(arguments);
			this.on("itemActionClick", this.onItemActionClick);
			this.tplConfig.classes.controlWrapClasses.push("listed-grid-layout-table-edit-wrap");
			this._debounceOnScrollValueChanged = Terrasoft.debounce(this.onScrollValueChanged, 100);
			this.addEvents(
				/**
				 * @event editItemClicked
				 * Fires after edit action button clicked.
				 */
				"editItemClicked",
				/**
				 * @event editItemClicked
				 * Fires after colspan item changed.
				 */
				"afterColspanChanged",
				/**
				 * @event leftAddButtonClicked
				 * Fires after left add button on element clicked.
				 */
				"leftAddButtonClicked",
				/**
				 * @event rightAddButtonClicked
				 * Fires after right add button on element clicked.
				 */
				"rightAddButtonClicked",
				/**
				 * @event scrollValueChanged
				 * Fires after scroll value changed.
				 */
				"scrollValueChanged"
			);
		},

		/**
		 * @inheritdoc Terrasoft.Component#initDomEvents
		 * @protected
		 */
		initDomEvents: function() {
			var scrollEl = this.getGridEl();
			Ext.EventManager.addListener(scrollEl, "scroll", this._debounceOnScrollValueChanged, this);
		},

		/**
		 * @inheritdoc Terrasoft.Bindable#getBindConfig
		 * @overridden
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var gridSettingsDesignerContainerBindConfig = {
				gridType: {
					changeMethod: "setGridType"
				},
				maxColumns: {
					changeMethod: "setMaxColumns"
				},
				maxColumnsTiled: {
					changeMethod: "setMaxColumnsTiled"
				}
			};
			Ext.apply(gridSettingsDesignerContainerBindConfig, bindConfig);
			return gridSettingsDesignerContainerBindConfig;
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEdit#onItemsLoad
		 * @overridden
		 */
		onItemsLoad: function(collection) {
			this.isCollectionLoading = true;
			this._purifyGrid(collection);
			this.items = collection;
			var collectionColumnWidth = 0;
			var rowsCount = 1;
			collection.eachKey(function(key, item, index) {
				this.onItemAdd(item, index, key);
				collectionColumnWidth += item.get("colSpan");
				if (item.get("row") + 1 > rowsCount) {
					rowsCount = item.get("row") + 1;
				}
			}, this);
			if (this.gridType === Terrasoft.GridType.TILED) {
				rowsCount = collectionColumnWidth > 0 ? rowsCount + 1 : rowsCount;
				this.setRows(rowsCount);
				this.setColumns(this.visibleColumns);
			} else {
				this.setColumns(collectionColumnWidth);
				this.setRows(1);
			}
			this.isCollectionLoading = false;
			this.safeRerender();
		},

		/**
		 * Set max columns.
		 * @param {Number} maxColumns Max listed columns.
		 */
		setMaxColumns: function(maxColumns) {
			if (!maxColumns) {
				return;
			}
			this.maxColumns = maxColumns;
		},

		/**
		 * Set max columns.
		 * @param {Number} maxColumnsTiled Max tiled columns.
		 */
		setMaxColumnsTiled: function(maxColumnsTiled) {
			if (!maxColumnsTiled) {
				return;
			}
			this.maxColumnsTiled = maxColumnsTiled;
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEdit#onItemAdd
		 * @overridden
		 */
		onItemAdd: function(item, index, key) {
			var isNewItem = this._setNewItemPosition(item);
			var itemConfig = Ext.apply(this.itemConfig || {}, {gridLayoutEditId: this.id});
			var itemBindingConfig = Ext.apply(itemConfig, this.itemBindingConfig);
			if (this.itemActions) {
				itemBindingConfig.items = Terrasoft.deepClone(this.itemActions);
			}
			var gridLayoutEditItemContainer = Ext.create(this.itemClassName, itemBindingConfig);
			gridLayoutEditItemContainer.on("afterColSpanChange", this.onAfterItemColSpanChange, this);
			gridLayoutEditItemContainer.on("afterPositionChange", this.onAfterItemPositionChange, this);
			gridLayoutEditItemContainer.on("itemActionClick", this.onItemActionClick, this);
			gridLayoutEditItemContainer.bind(item);
			this.gridLayoutEditItemsCollection.add(key, gridLayoutEditItemContainer);
			if (isNewItem) {
				this.itemToScroll = item;
			}
			this.safeRerender();
			if (this._isNewRowNeeded(this.items)) {
				this.setRows(this.rows + 1);
			}
			this.fireEvent("afterColspanChanged", this._getRowWidth(0, this.items), this._getMaxColumns());
			if (this.gridType === Terrasoft.GridType.LISTED) {
				this.setColumns(this._getRowWidth(0, this.items));
			}
		},

		/**
		 * Handles item right resize event.
		 * @protected
		 * @param {Number} newColSpan Item col span after resize.
		 * @param {Object} eventItem Item, that fired event.
		 */
		onAfterItemColSpanChange: function(newColSpan, eventItem) {
			if (!this.items) {
				return;
			}
			var colSpanDiff = newColSpan - eventItem.oldPosition.colSpan;
			if (!colSpanDiff) {
				return;
			}
			var oldItem = this.items.get(eventItem.itemId);
			if (oldItem.get("setColSpanSilent")) {
				oldItem.set("setColSpanSilent", false);
				return;
			}
			var newColumnsCount = this._getRowWidth(eventItem.row, this.items) + colSpanDiff;
			if (newColumnsCount <= this._getMaxColumns()) {
				this._shiftRow(eventItem.column, this._getMaxColumns(), colSpanDiff, eventItem.row, this.items);
			} else {
				if (this._getRowWidth(eventItem.row, this.items) < this._getMaxColumns()) {
					var maxColSpan = eventItem.oldPosition.colSpan + this._getMaxColumns()
						- this._getRowWidth(eventItem.row, this.items);
					eventItem.colSpan = eventItem.oldPosition.colSpan;
					eventItem.setColSpan(maxColSpan);
				} else {
					this._handleRightResizeOnFullRow(eventItem, colSpanDiff);
				}
			}
			if (this.gridType === Terrasoft.GridType.LISTED) {
				this.setColumns(newColumnsCount);
			}
			this.fireEvent("afterColspanChanged", newColumnsCount, this._getMaxColumns());
		},

		/**
		 * @inheritdoc Terrasoft.component#onAfterReRender
		 * @overridden
		 */
		onAfterReRender: function() {
			this.callParent(arguments);
			if (this.itemToScroll && this._isShouldScroll(this.itemToScroll)) {
				this.scrollToItem(this.itemToScroll);
				this.itemToScroll = null;
			}
		},

		/**
		 * Scrolls so item will be in the visible area.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} item Item view model.
		 */
		scrollToItem: function(item) {
			const visibleBorders = this._getVisibleBorders();
			let scrollPosition;
			const itemColumn = item.get("column");
			if (itemColumn <= visibleBorders.left + 1) {
				scrollPosition = this._getCellWidthInPx() * itemColumn;
			} else {
				scrollPosition = this._getCellWidthInPx() * (itemColumn - this.visibleColumns
					+ this.defaultNewCellWidth);
			}
			const gridEl = this.getGridEl();
			if (Terrasoft.getIsRtlMode()) {
				const scrollTypeInRtl = Terrasoft.getScrollTypeInRtl();
				const scrollWidth = gridEl.dom.scrollWidth - gridEl.dom.clientWidth;
				const columnDistance = this._getColumnScrollDistance(item);
				if (scrollTypeInRtl === Terrasoft.ScrollTypeInRtl.DEFAULT) {
					scrollPosition = scrollWidth - columnDistance;
				}
				if (scrollTypeInRtl === Terrasoft.ScrollTypeInRtl.REVERSE) {
					scrollPosition = columnDistance;
				}
				if (scrollTypeInRtl === Terrasoft.ScrollTypeInRtl.NEGATIVE) {
					scrollPosition = -columnDistance;
				}
			}
			gridEl.scrollTo("left", scrollPosition);
		},

		/**
		 * Gets real width all container with scroll.
		 * @protected
		 * @return {Number} Real width all container with scroll.
		 */
		getWrapDomWidth: function() {
			const rowEls = this.tableEl.select(Ext.String.format(".{0}", this.tplConfig.selectorSuffixes.row));
			const rowEl = rowEls.first();
			return rowEl && rowEl.getWidth() || 0;
		},

		/**
		 * Returns current grid Ext element.
		 * @protected
		 * @return {Ext.core.Element} Grid element.
		 */
		getGridEl: function() {
			return this.gridEl;
		},

		/**
		 * Handles drag&drop event.
		 * @protected
		 * @param {Number} intersectionPosition Item col span after resize.
		 * @param {Terrasoft.GridSettingsDesignerItem} eventItem Item, that fired event.
		 */
		onAfterItemPositionChange: function(intersectionPosition, eventItem) {
			if (!this.items) {
				return;
			}
			var newColumn = intersectionPosition.column;
			var newRow = intersectionPosition.row;
			var oldRow = eventItem.oldPosition.row;
			var eventViewModel = this.items.get(eventItem.itemId);
			if (newRow === this.rows - 1 && newRow > oldRow) {
				this._putElementToNewRow(eventViewModel, newRow, oldRow);
			} else {
				var targetItem = this._getItemByColumn(newColumn, newRow);
				if (!targetItem && oldRow === newRow) {
					targetItem = this._getRightElementInRow(newRow);
				}
				if (targetItem) {
					if (this._getDropRevertConditions(targetItem, eventItem, intersectionPosition)) {
						this._revertPosition(eventItem);
					} else {
						this._changeItemsPositionAfterDrop(targetItem, eventItem, intersectionPosition);
					}
				} else {
					this._pullRightElement(intersectionPosition, eventItem);
				}
			}
		},

		//endregion

		//region Methods: Public

		/**
		 * Handles action item click.
		 * @param {String} actionName Action tag.
		 * @param {String} itemId View model item id.
		 */
		onItemActionClick: function(actionName, itemId) {
			switch (actionName) {
				case "deleteItem":
					this._removeItemById(itemId);
					break;
				case "editItem":
					this.fireEvent("editItemClicked", itemId);
					break;
				case "addLeft":
					this._onAddLeftClick(itemId);
					break;
				case "addRight":
					this._onAddRightClick(itemId);
					break;
				default:
					break;
			}
		},

		/**
		 * Sets grid type property.
		 * @param {Terrasoft.GridType} gridType Grid type.
		 */
		setGridType: function(gridType) {
			this.gridType = gridType;
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEdit#setColumns
		 * @overridden
		 */
		setColumns: function(value) {
			if (!value || this.columns === value) {
				this.safeRerender();
				return;
			}
			var intValue = parseInt(value, 10);
			this.columns = this._getValueInsideRange(intValue, this.minColumns, this.maxColumns);
			this.fireEvent("columnsChanged", this.columns);
			this.safeRerender();
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEdit#setColumns
		 * @overridden
		 */
		setRows: function(value) {
			if (!value || this.rows === value) {
				this.safeRerender();
				return;
			}
			var intValue = parseInt(value, 10);
			this.rows = this._getValueInsideRange(intValue, this.minRows, this.maxRows);
			this.fireEvent("rowsChanged", this.rows);
			this.safeRerender();
		},

		/**
		 * Sets container items drop hint value.
		 * @param {Object} intersection Intersection of container and drag element.
		 * @param {Number} intersection.row Intersection row of container and drag element.
		 * @param {Number} intersection.column Intersection column of container and drag element.
		 * @param {String} position Item drop hint position. Left of right.
		 * @param {Boolean} changeRowPosition Change row position tag.
		 */
		setItemsDropHint: function(intersection, position, changeRowPosition) {
			this.clearItemsDropHint();
			var item = this._getItemByColumn(intersection.column, intersection.row);
			if (!item) {
				return;
			}
			if (item.get("colSpan") === 1 && changeRowPosition &&
				this._getRowWidth(intersection.row, this.items) === this._getMaxColumns()) {
				return;
			}
			item.set("itemDropHint", {visible: true, position: position}, {reloadData: false});
		},

		/**
		 * Clears container items drop hint value.
		 */
		clearItemsDropHint: function() {
			this.items.each(function(item) {
				item.set("itemDropHint", {visible: false}, {reloadData: false});
			});
		},

		/**
		 * Returns resize item constraints.
		 * @param {Number} row Resize item row.
		 * @param {Number} column Resize item column.
		 * @param {Number} colSpan Resize item colSpan.
		 * @param {Number} cellWidth Cell width.
		 * @return {Object} Left and right resize item constraints.
		 */
		getResizeConstraint: function(row, column, colSpan, cellWidth) {
			var gridLayoutEditWrap = this.getWrapEl();
			if (!gridLayoutEditWrap) {
				return null;
			}
			var emptyColsCount = this._getMaxColumns() - this._getRowWidth(row, this.items);
			var nearestRight = this._getNearestFromRightByColumn(column, row);
			var nearestColSpan = nearestRight ? nearestRight.get("colSpan") : 1;
			var leftConstraint = cellWidth * (colSpan - 1);
			var emptyColsExistConstraint = emptyColsCount > 0;
			var rightConstraint = emptyColsExistConstraint ?
				emptyColsCount * cellWidth : (nearestColSpan - 1) * cellWidth;
			return {
				leftConstraint: leftConstraint,
				rightConstraint: rightConstraint,
				emptyColsExistConstraint: emptyColsExistConstraint
			};
		},

		/**
		 * Changes neighbour items position on resize item.
		 * @param {Terrasoft.GridLayoutTableEditItem} resizeItem Resize item.
		 * @param  {String} changePositionEventName Change position item name.
		 * @param {Boolean} allItems Need change all neighbour items tag.
		 * @param {Number} position New x axis position.
		 */
		changeNeighbourItemsPositionOnResize: function(resizeItem, changePositionEventName, allItems, position) {
			var gridLayoutEditWrap = this.getWrapEl();
			var cellWidth = gridLayoutEditWrap.getWidth() / 100 * this.cellWidth;
			var column = resizeItem.column + resizeItem.colSpan;
			var item = this._getItemByColumn(column, resizeItem.row);
			while (item) {
				item.set("resizeItemPosition", {
					event: changePositionEventName,
					position: position
				}, {reloadData: false});
				if (!allItems) {
					return;
				}
				if (Terrasoft.getIsRtlMode()) {
					position -= item.get("colSpan") * cellWidth;
				} else {
					position += item.get("colSpan") * cellWidth;
				}
				column += item.get("colSpan");
				item = this._getItemByColumn(column, resizeItem.row);
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseObject#onDestroy
		 * @overridden
		 */
		onDestroy: function() {
			var scrollEl = this.getGridEl();
			Ext.EventManager.removeListener(scrollEl, "scroll", this._debounceOnScrollValueChanged, this);
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.Component#onDestroy
		 * @overridden
		 */
		safeRerender: function() {
			if (this.isCollectionLoading) {
				return;
			}
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEdit#updateSize
		 * @overridden
		 */
		updateSize: function() {
			if (this.isCollectionLoading) {
				return;
			}
			this.callParent(arguments);
		}

		//endregion
	});
});


