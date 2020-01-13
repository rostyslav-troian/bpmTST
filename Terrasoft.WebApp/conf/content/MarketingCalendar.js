Terrasoft.configuration.Structures["MarketingCalendar"] = {innerHierarchyStack: ["MarketingCalendar"]};
define("MarketingCalendar", ["MarketingCalendarItem", "css!MarketingCalendar"],
	function() {
		Ext.define("Terrasoft.controls.MarketingCalendar", {
			alternateClassName: "Terrasoft.MarketingCalendar",

			extend: "Terrasoft.GridLayoutTableEdit",

			/**
			 * @overridden
			 */
			selectionType: Terrasoft.GridLayoutEditSelectionType.HORIZONTAL,

			/**
			 * Diagram item class name
			 * @overridden
			 * @type {String}
			 */
			itemClassName: "Terrasoft.MarketingCalendarItem",

			/**
			 * Class that draw data grid
			 * @protected
			 */
			dataGridClassName: "Terrasoft.MarketingCalendarGrid",

			/**
			 * Vertical Scroll
			 * @protected
			 */
			scrollTop: null,

			/**
			 * @inheritdoc Terrasoft.GridLayoutTableEdit#cellHeingt
			 * @overridden
			 */
			cellHeight: 2.5,

			/**
			 * @inheritdoc Terrasoft.GridLayoutTableEdit#generateRow
			 * @overridden
			 * @returns {String} - HTML
			 */
			generateRow: function(rowIndex, tplData, config) {
				var item = this.items && (this.items.getCount() > rowIndex) ? this.items.getByIndex(rowIndex) : null;
				var isCategory = (item && item.values.IsCategory) ? "1" : "0";
				var rowCells = [];
				if (isCategory === "0") {
					rowCells = this.generateRowCells(rowIndex, tplData, config);
				}
				return config.rowTemplate.apply({
					id: this.id,
					rowIndex: rowIndex,
					rowWidth: config.rowWidth,
					isHasRowsCaptions: config.isHasRowsCaptions,
					isHasColumnsCaptions: config.isHasColumnsCaptions,
					isCategory: isCategory,
					rowCells: rowCells.join("")
				});
			},

			/**
			 * @inheritdoc Terrasoft.GridLayoutEdit#getItemsMaxRow
			 * @overridden
			 */
			getItemsMaxRow: function() {
				return this.gridLayoutEditItemsCollection.getCount() || 1;
			},

			/**
			 * @inheritDoc Terrasoft.Component#init
			 * @ovverride
			 */
			init: function() {
				this.callParent(arguments);
				this.addEvents(
						/**
						 * @event
						 * Event on changing vertical scroll
						 */
						"scrollTopChanged",
						/**
						 * @event
						 * Event on get permission changing position of item
						 */
						"getPermissionChangeItem"
				);
			},

			/**
			 * Merges current object tpl config with the base tpl config.
			 * Designed for construction of the tpl configs inheritance.
			 * For detatils, see Ext.Object#merge
			 * @protected
			 * @param selfTplConfig {Object}
			 */
			mergeTplConfigs: function(selfTplConfig) {
				this.tplConfig = Ext.merge(this.tplConfig, selfTplConfig);
			},

			/**
			 * Handles grid scrolling
			 * @protected
			 */
			onGridScroll: function() {
				this.callParent(arguments);
				var gridEl = this.gridEl;
				this.fireEvent("scrollTopChanged", gridEl.getScrollTop());
			},

			/**
			 * @inheritdoc Terrasoft.component#getBindConfig
			 * @overridden
			 */
			getBindConfig: function() {
				return Ext.apply(this.callParent(arguments), {
					scrollTop: {
						changeMethod: "setScrollTop"
					}
				});
			},

			/**
			 * Sets vertical scroll
			 * @param {Object} config
			 */
			setScrollTop: function(config) {
				var gridEl = this.gridEl;
				if (gridEl) {
					gridEl.setScrollTop(config);
				}
			},

			/**
			 * @inheritdoc Terrasoft.GridLayoutEdit#onItemsLoad
			 * @overridden
			 */
			onItemsLoad: function(collection) {
				var itemsCount = collection.getCount();
				collection.eachKey(function(key, item, index) {
					this.onItemAdd(item, index, key);
					if (itemsCount === index + 1) {
						var rowsCount = this.gridLayoutEditItemsCollection.getCount();
						this.rows = rowsCount;
						if (this.rendered) {
							this.reRender();
						}
					}
				}, this);
			},

			/**
			 * ########## ####### "add" ######### Terrasoft.BaseViewModelCollection.
			 * @overridden
			 * @inheritdoc Terrasoft.GridLayoutEditItem#onItemAdd
			 * @param {Terrasoft.BaseViewModel} item ####### #########.
			 * @param {Number} index ###### ######## #########.
			 * @param {String} key #### ######## #########.
			 */
			onItemAdd: function(item, index, key) {
				if (this.gridLayoutEditItemsCollection.contains(key)) {
					return;
				}
				if (!item.values.IsCategory) {
					var itemConfig = Ext.apply(this.itemConfig || {}, {gridLayoutEditId: this.id});
					var itemBindingConfig = Ext.apply(itemConfig, this.itemBindingConfig);
					if (this.itemActions) {
						itemBindingConfig.items = Terrasoft.deepClone(this.itemActions);
					}
					var gridLayoutEditItem = Ext.create(this.itemClassName, itemBindingConfig);
					this.gridLayoutEditItemsCollection.add(key, gridLayoutEditItem);
					gridLayoutEditItem.bind(item);
					gridLayoutEditItem.on("afterColumnChange", this.onAfterItemColumnChange, this);
					gridLayoutEditItem.on("afterColSpanChange", this.onAfterItemColumnChange, this);
					if (!this.allowItemsIntersection) {
						if (!this.isItemIntersected(gridLayoutEditItem)) {
							this.updateSize(gridLayoutEditItem, true);
							this.setSelection();
						} else {
							item.parentCollection.removeByKey(key);
						}
					}
				}
			},

			updateSize: function(item, skipIntersection) {
				var updated = false;
				if (!this.allowItemsIntersection && !skipIntersection && item && this.isItemIntersected(item)) {
					if (this.columns === 1 && this.changePositionForIntersectedItems) {
						this.changeItemsPositions(item);
					} else {
						item.revertPositionChanges();
					}
					this.showItem(item);
				} else {
					this.updateHeight();
					this.updateWidth();
					if (item && !item.destroyed) {
						this.showItem(item);
					}
				}
				return updated;
			},

			/**
			 * ########## ####### "afterColumnChange" # "afterColSpanChange" ### MarketingCalendarItem.
			 * @param {String} value ######## ########.
			 * @param {Terrasoft.BaseViewModel} item ####### #########.
			 */
			onAfterItemColumnChange: function(value, item) {
				if (item) {
					var itemValues = {
						content: item.content,
						itemId: item.itemId,
						column: item.column,
						colSpan: item.colSpan,
						oldColumn: item.oldPosition.column,
						oldColSpan: item.oldPosition.colSpan
					};
					this.fireEvent("getPermissionChangeItem", itemValues, function(result) {
						if (!result) {
							item.column = itemValues.oldColumn;
							item.colSpan = itemValues.oldColSpan;
							item.reRender();
						}
					});
				}
			}
		});
	});


