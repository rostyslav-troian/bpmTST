Terrasoft.configuration.Structures["ContainerList"] = {innerHierarchyStack: ["ContainerList"]};

define("ContainerList", [], function() {
	/**
	 * Implements view of the collection of items by container config.
	 */
	return Ext.define("Terrasoft.controls.ContainerList", {
		extend: "Terrasoft.Container",
		alternateClassName: "Terrasoft.ContainerList",

		/**
		 * A flag indicating whether the collection is loaded asynchronously.
		 */
		isAsync: true,

		/**
		 * Link to the collection of items.
		 * @type {Terrasoft.Collection}
		 */
		collection: null,

		/**
		 * Identifier's property name.
		 * @type {String}
		 */
		idProperty: null,

		/**
		 * Container element's CSS class.
		 * @type {String}
		 */
		selectableRowCss: "selectable",

		/**
		 * An array of element IDs for which has already been generated, the event falling into the visible part
		 * @protected
		 * @type {Array}
		 */
		observableRowHistory: [],

		/**
		 * Default item configuration
		 *        defaultItemConfig: {
		 *			className: "Terrasoft.Container",
		 *			id: "item",
		 *			selectors: {
		 *				wrapEl: "#item"
		 *			},
		 *			classes: {
		 *				wrapClassName: ["post-class"]
		 *			},
		 *			items:[
		 *				{
		 *					className: "Terrasoft.Label",
		 *					caption: {
		 *						bindTo: "CreatedByName"
		 *					},
		 *					classes: {
		 *						labelClass: ["createdBy-name"]
		 *					}
		 *				},
		 *				{
		 *					className: "Terrasoft.Label",
		 *					caption: {
		 *						bindTo: "CreatedOn"
		 *					},
		 *					classes: {
		 *						labelClass: ["createdBy-date", "unimportant-color"]
		 *					}
		 *				}
		 *			]
		 *		}
		 * @protected
		 * @type {Object}
		 */
		defaultItemConfig: null,

		/**
		 * A function that returns a configuration element representing a configuration different from the default
		 * @protected
		 * @type {Function}
		 */
		getCustomItemConfig: null,

		/**
		 * The line number in registry with the end, the appearance of which in the visible part of the browser need to track
		 */
		observableRowNumber: 0,

		/**
		 * @deprecated
		 */
		stillRendering: false,

		/**
		 * Delayed observable row ID.
		 */
		delayedObservableRowId: null,

		/**
		 * CSS selector recording control.
		 */
		rowCssSelector: ".esn-notification-container.selectable",

		/**
		 * The prefix DOM record ID.
		 */
		dataItemIdPrefix: "esn-notification-item",

		/**
		 * CSS class of selected record.
		 */
		selectedItemCssClass: "selected",

		/**
		 * CSS class of animation selected record.
		 */
		animationSelectCssClass: "animation-select-item",

		/**
		 * The ID value of the active record list
		 */
		activeItem: null,

		/**
		 * Collection with the IDs of the view models, as keys used by IDs submissions.
		 * @type {Terrasoft.Collection}
		 */
		rowIds: null,

		/**
		 * A unique prefix to change the IDs submissions. If the property is undefined
		 * it is a property of the sandbox.id of the view model.
		 * @type { String}
		 */
		itemPrefix: null,

		/**
		 * A flag indicating whether the scrolling to active item will be center it to the browser window.
		 */
		centerItemOnScroll: false,

		/**
		 * Indicates the presence of entries in the list.
		 * @protected
		 * @type { Boolean}
		 */
		isEmpty: false,

		/**
		 * Time of item fading out in milliseconds
		 * @protected
		 * @type {Number}
		 */
		itemFadeOutDuration: 0,

		/**
		 * A flag indicating whether scrollbar should stay in position after deletement
		 * @protected
		 * @type {Boolean}
		 */
		keepScrollOnItemsChanged: false,

		/**
		 * Indicates need decorate container list inner items.
		 * @type {Boolean}
		 */
		decorateInnerItems: false,

		/**
		 * @inheritdoc Terrasoft.Component#init
		 * @protected
		 */
		init: function() {
			this.callParent(arguments);
			this.rowIds = Ext.create("Terrasoft.Collection");
			this.addEvents(
				/**
				 * @event observableRowVisible
				 * The event of the occurrence of traceable lines in the visible part
				 */
				"observableRowVisible",
				/**
				 * @event onGetItemConfig
				 * The event of receiving the configuration for the element
				 */
				"onGetItemConfig",
				/**
				 * @event onItemClick
				 * The click event on the list element
				 */
				"onItemClick",
				/**
				 * @event onItemDblClick
				 * Handler for element double click.
				 */
				"onItemDblClick",
				/**
				 * @event getEmptyMessageConfig
				 * Event check configuration for custom message on empty list.
				 */
				"getEmptyMessageConfig",
				/**
				 * @event renderFinished
				 * Fires after element of container has been rendered.
				 */
				"renderFinished",
				/**
				 * @event itemsRendered
				 * Fires after all loaded collection elements will be rendered into container.
				 */
				"itemsRendered"
			);
		},

		/**
		 * Bind's all elements to the model.
		 * @param {Terrasoft.data.modules.BaseViewModel} model Data model.
		 */
		bind: function(model) {
			this.mixins.bindable.bind.call(this, model);
		},

		/**
		 * @inheritdoc Terrasoft.Bindable#getBindConfig
		 * @override
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var gridBindConfig = {
				collection: {
					changeMethod: "onCollectionDataLoaded"
				},
				isAsync: {
					changeMethod: "setIsAsync"
				},
				activeItem: {
					changeMethod: "scrollToItem"
				},
				isEmpty: {
					changeMethod: "setIsEmpty"
				},
				blankSlateModel: {
					changeMethod: "setBlankSlateModel"
				},
				itemsRendered: {
					changeEvent: "itemsRendered"
				}
			};
			return Ext.apply(gridBindConfig, bindConfig);
		},

		/**
		 * @inheritdoc Terrasoft.Component#initDomEvents
		 * @override
		 */
		initDomEvents: function() {
			this.callParent(arguments);
			this.debounceWindowScroll = this.debounceWindowScroll || Terrasoft.debounce(this.onWindowScroll, 10);
			Ext.EventManager.addListener(window, "scroll", this.debounceWindowScroll, this);
			Ext.EventManager.addListener(this.getWrapEl(), "scroll", this.debounceWindowScroll, this);
			if (Ext.isIE11 || Ext.isChrome || Ext.isSafari || Ext.isOpera) {
				Ext.EventManager.addListener(window, "mousewheel", this.debounceWindowScroll, this);
			} else if (Ext.isGecko) {
				Ext.EventManager.addListener(window, "DOMMouseScroll", this.debounceWindowScroll, this);
			} else {
				Ext.EventManager.addListener(window, "onmousewheel", this.debounceWindowScroll, this);
			}
			var wrapEl = this.getWrapEl();
			if (wrapEl) {
				wrapEl.on("click", this.onClick, this);
				wrapEl.on("dblclick", this.onDblClick, this);
			}
		},

		/**
		 * @private
		 */
		_getSelectedRowId: function(event) {
			var targetEl = Ext.get(event.target);
			var wrapEl = this.getWrapEl();
			var listItemEl = targetEl.findParent(this.rowCssSelector, wrapEl, true);
			return listItemEl && this.rowIds.get(listItemEl.id);
		},

		/**
		 * Handles click event on the control.
		 * @param {Object} event Event object.
		 */
		onClick: function(event) {
			var itemId = this._getSelectedRowId(event);
			if (itemId) {
				event.stopEvent();
				this.onItemClick(itemId);
				this.fireEvent("onItemClick", itemId);
			}
		},

		/**
		 * Handles a click on the record control.
		 * @param {String} itemId The entry identifier in the collection.
		 */
		onItemClick: function(itemId) {
			this.setItemSelected(itemId);
		},

		/**
		 * Handles double click event on the control.
		 * @param {Object} event Event object.
		 */
		onDblClick: function(event) {
			var itemId = this._getSelectedRowId(event);
			if (itemId) {
				event.stopEvent();
				this.fireEvent("onItemDblClick", itemId);
			}
		},

		/**
		 * Processes change of state record control.
		 * @param {String} itemId  Identification of record in collection.
		 * @param {Boolean} animate Is animated selection.
		 */
		setItemSelected: function(itemId, animate) {
			var wrapEl = this.getWrapEl();
			if (!wrapEl) {
				return;
			}
			var selectedItemCssClass = this.selectedItemCssClass;
			var classes = [selectedItemCssClass];
			for (var i = 0; i < classes.length; i++) {
				var prevSelectedItemSelection = wrapEl.select(this.rowCssSelector + "." + classes[i]);
				var prevSelectedItemEl = prevSelectedItemSelection.first();
				if (!Ext.isEmpty(prevSelectedItemEl)) {
					prevSelectedItemEl.removeCls(classes[i]);
				}
			}
			var markerValue = this.dataItemIdPrefix + "-" + itemId;
			var itemElSelection = wrapEl.select("[data-item-marker='" + markerValue + "']");
			var itemEl = itemElSelection.first();
			if (Ext.isEmpty(itemEl)) {
				return;
			}
			var animationSelectCssClass = this.animationSelectCssClass;
			if (animate) {
				classes.push(animationSelectCssClass);
			}
			for (var i = 0; i < classes.length; i++) {
				if (!itemEl.hasCls(classes[i])) {
					itemEl.addCls(classes[i]);
				}
			}
		},

		/**
		 * Windows scroll event handler.
		 * @protected
		 */
		onWindowScroll: function() {
			if (this.observableRowNumber > 0 && this.isVisible()) {
				this.checkObservableRow();
			}
		},

		/**
		 * The method of obtaining references to all of the registry strings in DOM.
		 * @return {Array|selectableRows}
		 */
		getDomRows: function() {
			var root = null;
			var wrapEl = this.getWrapEl();
			if (wrapEl && wrapEl.dom) {
				root = wrapEl.dom;
			}
			if ((!this.selectableRows || !this.selectableRows.length) && root) {
				this.selectableRows =
					Ext.dom.Query.select("[class*=\"" + this.selectableRowCss + "\"]", root);
			}
			return this.selectableRows;
		},

		/**
		 * Gets a reference to the element list entry to DOM.
		 * @private
		 * @param {String} id The entry identifier of the list.
		 * @return {Object} Returns the element of list entries in DOM.
		 */
		getDomItem: function(id) {
			if (!this.rendered || !id) {
				return null;
			}
			var wrapEl = this.getWrapEl();
			var root = (wrapEl && wrapEl.dom) ? wrapEl.dom : null;
			if (root) {
				return Ext.dom.Query.select("> [class*=" + id + "]", root)[0];
			}
			return null;
		},

		/**
		 * Positions the active record to center of the visible area in the browser window.
		 * @private
		 * @param {Object} activeItemDom DOM object of active item.
		 */
		_scrollToItemAtCenter: function(activeItemDom) {
			var activeItemExtElem = Ext.get(activeItemDom);
			if (!this.isElementFullyVisible(activeItemExtElem)) {
				var absoluteItemCenter = activeItemExtElem.getTop() + (activeItemExtElem.getHeight() / 2);
				window.scrollTo(0, absoluteItemCenter - (window.innerHeight / 2));
			}
		},

		/**
		 * Positions the active record to nearest edge of the visible area in the browser window.
		 * @private
		 * @param {Object} activeItemDom DOM object of active item.
		 */
		_scrollToItemAtNearestEdge: function(activeItemDom) {
			if (activeItemDom.scrollIntoViewIfNeeded) {
				activeItemDom.scrollIntoViewIfNeeded(false);
			} else {
				activeItemDom.scrollIntoView(false);
			}
		},

		/**
		 * Sets the property value to indicate whether the asynchronously loaded collection.
		 * @private
		 * @param {Boolean} value The value of the property.
		 */
		setIsAsync: function(value) {
			if (this.isAsync === value) {
				return;
			}
			this.isAsync = value;
		},

		/**
		 * Destroys element.
		 * @private
		 * @param {Object} element Element of Container list to be destroyed.
		 */
		_destroyElement: function(element) {
			element.destroy();
			this.setIsEmpty(this.items.length === 0);
			if (this.observableRowNumber > 0) {
				this.checkObservableRow();
			}
		},

		/**
		 * Positions the active record in the visible area of the browser window.
		 * @protected
		 * @param {String} value The entry identifier of the list.
		 */
		scrollToItem: function(value) {
			if (this.activeItem === value) {
				return;
			}
			var activeItem = this.activeItem = value;
			if (activeItem) {
				var activeItemDom = this.getDomItem(activeItem);
				if (activeItemDom) {
					if (this.centerItemOnScroll) {
						this._scrollToItemAtCenter(activeItemDom);
					} else {
						this._scrollToItemAtNearestEdge(activeItemDom);
					}
					this.setItemSelected(activeItem, true);
				}
			}
		},

		/**
		 * Check for visibility of monitored element in the visible part of the browser window.
		 * @protected
		 */
		checkObservableRow: function() {
			var rows = this.getDomRows();
			if (!rows || !rows.length) {
				return;
			}
			var observableRowNumber = rows.length - this.observableRowNumber;
			if (observableRowNumber < 0) {
				return;
			}
			var observableRow = Ext.get(rows[observableRowNumber]);
			var observableRowId = observableRow.dom.id;
			if (this.isElementVisible(observableRow)) {
				if (Ext.Array.indexOf(this.observableRowHistory, observableRowId) >= 0) {
					return;
				}
				this.observableRowHistory.push(observableRowId);
				if (!this.rendered) {
					this.delayedObservableRowId = observableRowId;
				} else {
					this.fireEvent("observableRowVisible", observableRowId);
				}
			}
		},

		/**
		 * Checks that element is fully visible in the visible part of the browser window.
		 * @protected
		 * @param {Object} el Element to check.
		 * @return {Boolean}
		 */
		isElementFullyVisible: function(el) {
			if (!el) {
				return false;
			}
			var body = Ext.getBody();
			var bodyViewRegion = body.getViewRegion();
			var elViewRegion = el.getViewRegion();
			return elViewRegion.top >= bodyViewRegion.top &&
				elViewRegion.bottom <= bodyViewRegion.bottom;
		},

		/**
		 * Checks the visibility of the element in the visible part of the browser window.
		 * @protected
		 * @param {Object} el Element to check.
		 * @return {Boolean}
		 */
		isElementVisible: function(el) {
			if (!el) {
				return false;
			}
			var body = Ext.getBody();
			var bodyViewRegion = body.getViewRegion();
			var elViewRegion = el.getViewRegion();
			return (elViewRegion.x <= bodyViewRegion.right &&
				elViewRegion.y <= bodyViewRegion.bottom);
		},

		/**
		 * Create the view elements and add them to the container.
		 * @protected
		 */
		addItems: function(items, index) {
			this.observableRowHistory = [];
			this.selectableRows = null;

			var rendered = this.rendered;
			this.rendered = false;
			var rowIds = this.rowIds;
			var views = [];
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var id = item.get(this.idProperty);
				var view = this.getItemView(item);
				view.bind(item);
				views.push(view);
				rowIds.add(view.id, id);
			}
			if (Ext.isEmpty(index)) {
				this.add(views);
			} else {
				this.insert(views, index);
			}
			this.rendered = rendered;
			var me = this;
			if (this.rendered && !this.destroyed) {
				var renderIndex = this.items.indexOfKey(views[0].id);
				var renderView = function(viewItem, viewItemIndex) {
					if (viewItem.rendered || viewItem.destroyed) {
						return;
					}
					var renderEl = me.getRenderToEl();
					viewItem.render(renderEl, viewItemIndex);
					me.fireEvent("renderFinished");
				};
				if (views.length === 1) {
					renderView(views[0], renderIndex);
				} else {
					var viewIndex = 0;
					var renderNext = function() {
						if (viewIndex < views.length) {
							var renderNextView = function() {
								renderView(views[viewIndex], renderIndex + viewIndex);
								viewIndex++;
								renderNext();
							};
							if (me.isAsync) {
								setTimeout(renderNextView, 0);
							} else {
								renderNextView();
							}
						} else if (me.delayedObservableRowId) {
							var delayedObservableRowId = me.delayedObservableRowId;
							me.delayedObservableRowId = null;
							me.fireEvent("observableRowVisible", delayedObservableRowId);
						}
					};
					renderNext();
				}
				this.fireEvent("itemsRendered");
			}
		},

		/**
		 * Decorates container list inner items.
		 * @private
		 * @param {Object[]} innerItems Inner items view config.
		 * @param {String} id Item id.
		 * @param {String} prefix Item prefix.
		 */
		_decorateInnerItems: function(innerItems, id, prefix) {
			if (this.decorateInnerItems) {
				this.decorateView(innerItems, id, prefix);
			}
		},

		/**
		 * Decorating nested containers, adding ID.
		 * @protected
		 */
		decorateView: function(items, id, prefix) {
			var itemSuffix = "-" + id + "-" + prefix;
			Terrasoft.each(items, function(item) {
				if (item.id) {
					item.id += itemSuffix;
				}
				if (item.inputId) {
					item.inputId += itemSuffix + "-el";
				}
				if (!item.markerValue) {
					item.markerValue = this.dataItemIdPrefix + "-" + id;
				}
				var innerItem = item.item;
				if (innerItem && innerItem.id) {
					innerItem.id += itemSuffix;
				}
				var selectors = item.selectors;
				if (selectors && selectors.wrapEl) {
					selectors.wrapEl += itemSuffix;
				}
				var innerItemSelectors = innerItem && innerItem.selectors;
				if (innerItemSelectors && innerItemSelectors.wrapEl) {
					innerItemSelectors.wrapEl += itemSuffix;
				}
				var classes = item.classes;
				if (classes) {
					classes.wrapClassName = classes.wrapClassName || [];
					if (item.id) {
						classes.wrapClassName.push(item.id);
					}
				}
				this.decorateView(item.items, id, prefix);
				this._decorateInnerItems(innerItem && innerItem.items, id, prefix);
			}, this);
		},

		/**
		 * Create view item config.
		 * @protected
		 */
		getItemViewConfig: function(item) {
			var itemConfig = this.defaultItemConfig;
			var itemCfg = {};
			this.fireEvent("onGetItemConfig", itemCfg, item);
			if (itemCfg.config) {
				itemConfig = itemCfg.config;
				this.defaultItemConfig = itemCfg.config;
			}
			if (Ext.isFunction(this.getCustomItemConfig)) {
				itemConfig = this.getCustomItemConfig(item) || itemConfig;
			}
			itemConfig = Terrasoft.deepClone(itemConfig);
			var classes = itemConfig.classes || {};
			classes.wrapClassName = classes.wrapClassName || [];
			classes.wrapClassName.push(this.selectableRowCss);
			itemConfig.classes = classes;
			return itemConfig;
		},

		/**
		 * Create view item.
		 * @protected
		 */
		getItemView: function(item) {
			var prefix = this.itemPrefix || item.sandbox.id;
			var id = item.get(this.idProperty);
			var itemConfig = this.getItemViewConfig(item);
			this.decorateView([itemConfig], id, prefix);
			var className = itemConfig && itemConfig.className ? itemConfig.className : "Terrasoft.Container";
			return Ext.create(className, itemConfig);
		},

		/**
		 * Forms a unique identifier of the interface element.
		 * @protected
		 * @param {Object} item The element of the collection panels.
		 * @return {String} The unique identifier of the interface element.
		 */
		getItemElementId: function(item) {
			var id = item.get(this.idProperty);
			var prefix = this.itemPrefix || item.sandbox.id;
			return this.defaultItemConfig.id + "-" + id + "-" + prefix;
		},

		/**
		 * The event handler for the "data Loaded" collection {@link Terrasoft.Collection}
		 * @protected
		 * @param {Terrasoft.Collection} items
		 * @param {Terrasoft.Collection} newItems
		 */
		onCollectionDataLoaded: function(items, newItems) {
			this.observableRowHistory = [];
			this.selectableRows = null;
			items = newItems || items;
			if (items && items.getCount() > 0) {
				this.setIsEmpty(false);
				this.addItems(items.getItems());
			}
		},

		/**
		 * "add" event handler for collection Terrasoft.Collection
		 * @protected
		 * @param {Terrasoft.BaseViewModel} item Collection element.
		 * @param {Number} index Element index.
		 */
		onAddItem: function(item, index) {
			this.observableRowHistory = [];
			this.selectableRows = null;
			this.setIsEmpty(false);
			this.addItems([item], index);
		},

		/**
		 * "remove" event handler for collection Terrasoft.Collection
		 * @protected
		 * @param {Object} item Collection element
		 */
		onDeleteItem: function(item) {
			this.selectableRows = null;
			this.observableRowHistory = [];
			var elementId = this.getItemElementId(item);
			var itemId = item.get(this.idProperty);
			var element = this.items.getByKey(elementId);
			this.rowIds.remove(itemId);
			if (this.itemFadeOutDuration === 0) {
				this._destroyElement(element);
			} else {
				element.getWrapEl().fadeOut({
					duration: this.itemFadeOutDuration,
					callback: function() {
						this._destroyElement(element);
					},
					scope: this
				});
			}
		},
		/**
		 * Container cleaning method.
		 */
		clear: function() {
			this.observableRowHistory = [];
			this.selectableRows = null;
			var items = this.items;
			this.rowIds.clear();
			if (items) {
				items.un("add", this.onItemAdd, this);
				items.un("remove", this.onItemRemove, this);
				items.each(function(item) {
					item.removed(this);
					item.destroy();
				}, this);
				items.clear();
				items.on("add", this.onItemAdd, this);
				items.on("remove", this.onItemRemove, this);
			}
			this.setIsEmpty(true);
		},

		/**
		 * @inheritdoc Terrasoft.Component#reRender
		 * @override
		 */
		reRender: function(index, container) {
			var wrapEl = this.getWrapEl();
			var scrollTop = wrapEl.dom.scrollTop;
			this.callParent(index, container);
			if (this.keepScrollOnItemsChanged) {
				wrapEl.dom.scrollTop = scrollTop;
			}
		},

		/**
		 * @inheritdoc Terrasoft.Component#getMaskConfig
		 * @override
		 */
		getMaskConfig: function() {
			var maskConfig = this.callParent(arguments);
			if (Ext.isNumber(this.maskTimeout)) {
				maskConfig.timeout = this.maskTimeout;
			}
			return maskConfig;
		},

		/**
		 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
		 * @override
		 */
		subscribeForCollectionEvents: function(binding, property, model) {
			this.callParent(arguments);
			var collection = model.get(binding.modelItem);
			collection.on("dataLoaded", this.onCollectionDataLoaded, this);
			collection.on("add", this.onAddItem, this);
			collection.on("remove", this.onDeleteItem, this);
			collection.on("clear", this.clear, this);
		},

		/**
		 * @inheritdoc Terrasoft.Bindable#unSubscribeForCollectionEvents
		 * @override
		 */
		unSubscribeForCollectionEvents: function(binding, property, model) {
			if (!model) {
				return;
			}
			var collection = model.get(binding.modelItem);
			collection.un("dataLoaded", this.onCollectionDataLoaded, this);
			collection.un("add", this.onAddItem, this);
			collection.un("remove", this.onDeleteItem, this);
			collection.un("clear", this.clear, this);
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.Component#onDestroy
		 */
		onDestroy: function() {
			var wrapEl = this.getWrapEl();
			if (wrapEl) {
				wrapEl.un("click", this.onClick, this);
			}
			this.blankSlateModel = null;
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.Component#onAfterRender
		 * @protected
		 */
		onAfterRender: function() {
			this.callParent(arguments);
			var emptyMessageConfig = this.getEmptyMessageConfig();
			if (!Ext.isEmpty(emptyMessageConfig)) {
				this.isEmpty = this.items.length === 0;
				this.showEmptyMessage(emptyMessageConfig);
			}
			this.fireEvent("renderFinished");
		},

		/**
		 * Returns the configuration for custom message on empty list.
		 * @private
		 * @return {Object}
		 */
		getEmptyMessageConfig: function() {
			var emptyMessageConfig = {};
			this.fireEvent("getEmptyMessageConfig", emptyMessageConfig);
			if (emptyMessageConfig && emptyMessageConfig.className) {
				return Terrasoft.deepClone(emptyMessageConfig);
			}
			return null;
		},

		/**
		 * Sets list state attribute.
		 * @param {Boolean} value Set the value.
		 */
		setIsEmpty: function(value) {
			if (this.isEmpty === value || this.destroyed) {
				return;
			}
			this.isEmpty = value;
			if (value === true) {
				this.clear();
			}
			this.showEmptyMessage();
		},

		/**
		 * Sets empty message model property.
		 * @param {Object} value Empty message model.
		 */
		setBlankSlateModel: function(value) {
			this.blankSlateModel = value;
		},

		/**
		 * Shows message for empty list.
		 * @protected
		 * @param {Object} emptyMessageConfig Params for empty message control creation.
		 */
		showEmptyMessage: function(emptyMessageConfig) {
			if (!this.rendered) {
				return;
			}
			var emptyMessageControl = this.emptyMessageControl;
			var isEmptyCls = "container-list-empty";
			var wrapEl = this.getWrapEl();
			if (Ext.isEmpty(emptyMessageConfig)) {
				emptyMessageConfig = this.getEmptyMessageConfig();
			}
			if (this.isEmpty) {
				if (wrapEl) {
					wrapEl.addCls(isEmptyCls);
				}
				if (!Ext.isEmpty(emptyMessageConfig) && Ext.isEmpty(emptyMessageControl)) {
					Ext.apply(emptyMessageConfig, {
						renderTo: wrapEl
					});
					this.emptyMessageControl = Ext.create(emptyMessageConfig.className, emptyMessageConfig);
					if (this.blankSlateModel) {
						this.emptyMessageControl.bind(this.blankSlateModel);
					}
				}
			} else {
				if (wrapEl) {
					wrapEl.removeCls(isEmptyCls);
				}
				if (!Ext.isEmpty(emptyMessageControl)) {
					emptyMessageControl.destroy();
					this.emptyMessageControl = null;
				}
			}
		}
	});
});


