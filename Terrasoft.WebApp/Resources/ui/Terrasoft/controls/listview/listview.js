/**
 * Class "Drop-down list"
 */
Ext.define("Terrasoft.controls.ListView", {

	extend: "Terrasoft.Component",

	alternateClassName: "Terrasoft.ListView",

	/**
	 * Data to display in the menu.
	 * @protected
	 */
	listItems: [],

	/**
	 * Elements of DOM list of menu elements Ext.dom.CompositeElement
	 * @protected
	 */
	listEls: [],

	/**
	 * Link to a focused list item.
	 * @type {Ext.CompositeElementLite/Ext.CompositeElement}
	 * @protected
	 */
	selectedItem: null,

	/**
	 * CSS style class of the selected menu item.
	 * @protected
	 * @property {String} selectedCssClass
	 */
	selectedCssClass: "listview-selected",

	/**
	 * Download display control.
	 * @protected
	 * @type {Terrasoft.BaseSpinner}
	 */
	progressSpinner: null,

	/**
	 * A parameter indicating the need to display the download indicator.
	 * @property {Boolean} selectedCssClass
	 */
	showProgressSpinner: false,

	/**
	 * Text signature to the download indicator.
	 * @property {String} progressSpinnerCaption
	 */
	progressSpinnerCaption: Terrasoft.Resources.Controls.ProgressSpinner.Caption,

	/**
	 * Parameter indicating that the list will be displayed with icons.
	 * @protected
	 * @property {Boolean} hasIcons
	 */
	hasIcons: false,

	/**
	 * The height of one menu item from the list.
	 * @protected
	 * @property {String} rowHeight
	 */
	rowHeight: "40px",

	/**
	 * The value of adjusting the height of the list display relative to the parent container.
	 * @protected
	 * @property {Number} correctTopPosition
	 */
	correctTopPosition: 1,

	/**
	 * Index of last item in the list before request to get new data.
	 * @private
	 * @property {Number} indexOfLastLoadedItem
	 */
	indexOfLastLoadedItem: null,

	/**
	 * Schema of the ratio of data keys between external and internal formats.
	 * We assume that external data will be submitted in a certain format, and the configuration of the structure bypass will be made through the correspondence schema.
	 *
	 * If the external data schema has following a structure..
	 *     var externalData = [
	 *         {
	 *             Id: 1,
	 *             City: "Washington"
	 *         },
	 *         {
	 *             Id: 2,
	 *             City: "Paris",
	 *             IconSprite: "od-icon-16#16"
	 *         },
	 *         {
	 *             Id: 3,
	 *             City: "London",
	 *             imageConfig: {
	 *                 source: Terrasoft.ImageSources.URL,
	 *                 url: "http://goo.gl/776gtdOur"
	 *             }
	 *         }
	 *     ];
	 * then the relationship schema will look as follows:
	 *     listview.map = {
	 *         // specify the key, in external data, which stores data for the value of the drop-down list item
	 *         value: "Id",
	 *         // specify the key, in external data, which stores data for display in the drop-down list and correlates with its value
	 *         displayValue: "City",
	 *         // key, in external data, indicating the stored value of the CSS class
	 *         imageClass: "IconSprite",
	 *         // key, in external data indicating the stored value of the image configuration
	 *         imageConfig: "imageConfig"
	 *     };
	 *
	 * @cfg map
	 * @cfg map.value Value key.
	 * @cfg map.displayValue Display value key.
	 * @cfg map.imageClass Image CSS class value key.
	 * @cfg map.imageConfig Image configuration information key.
	 * @cfg map.markerValue Data item marker key.
	 * @cfg map.isSeparatorItem Separator item flag.
	 */
	map: {
		value: "value",
		displayValue: "displayValue",
		imageClass: "imageClass",
		imageConfig: "imageConfig",
		customHtml: "customHtml",
		markerValue: "markerValue",
		isSeparatorItem: "isSeparatorItem",
		direction: "direction"
	},

	/**
	 * The reference to the Ext.dom.Element element relative to which the visual positioning will occur
	 * @type {Ext.dom.Element}
	 */
	alignEl: null,

	/**
	 * Offset from the {@link #alignEl} element.
	 * @private
	 * @type {Array}
	 */
	offset: null,

	/**
	 * A flag of automatic selection of the first element of the drop-down list.
	 * @type {Boolean}
	 */
	useDefSelection: false,

	/**
	 * The offset from the {@link #alignEl} element by default.
	 * @private
	 * @type {Array}
	 */
	defaultOffset: null,

	/**
	 * Parameter indicating the maximum visible number of menu items in the list
	 * @property {Number} maxItems
	 */
	maxItems: 15,

	/**
	 * Parameter indicating the minimum visible number of menu items in the list
	 * @property {Number} minItems
	 */
	minItems: 3,

	/**
	 * The minimum width of the drop-down list
	 * @property {String} minWidth
	 */
	minWidth: "0px",

	/**
	 * Maximum width of the drop-down list
	 * @property {String} maxWidth
	 */
	maxWidth: "0px",

	/**
	 * @inheritdoc Terrasoft.Component#styles
	 * @protected
	 * @override
	 */
	styles: {
		wrapStyle: {}
	},

	/**
	 * Is images from PrimaryImageColumn visible.
	 * @protected
	 */
	iconsVisible: false,

	/**
	 * Indicates that the body scroll must be disabled.
	 * @type {Boolean}
	 */
	bodyScrollLock: false,

	/**
	 * Body scroll top value.
	 * @type {Number}
	 */
	bodyScrollTop: 0,

	/**
	 * @inheritdoc Terrasoft.Component#constructor
	 * @protected
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event listPressDown
			 * The expected event on the drop-down list that indicates that you want to select the next item in the list relative to the current one.
			 * The handler of the {@link #onPressDown} event
			 */
			"listPressDown",

			/**
			 * @event listPressUp
			 * The expected event on the drop-down list that indicates that you want to select the previous list item relative to the current item.
			 */
			"listPressUp",

			/**
			 * @event listPressEnter
			 * The expected event on the drop-down list that indicates that the "Enter" key was pressed.
			 */
			"listPressEnter",

			/**
			 * @event listViewItemRender
			 * Element Generation Event.
			 */
			"listViewItemRender",

			/**
			 * @event loadNextPage
			 * Event that fires when new group of list items need to be loaded.
			 */
			"loadNextPage"
		);
	},

	/**
	 * @inheritdoc Terrasoft.Component#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.defaultOffset = [1, 1];
	},

	/**
	 * @inheritdoc Terrasoft.Component#initDomEvents
	 * @override
	 */
	initDomEvents: function() {
		if (Ext.isEmpty(this.listItems)) {
			return;
		}
		var wrapEl = this.getWrapEl();
		var listview = Ext.get(this.id);
		var list = this.listEls = listview.select("li, div");
		wrapEl.on("mousedown", this.onWrapElMouseDown, this);
		wrapEl.on("scroll", this.onWrapElScroll, this);
		list.on("click", this.onSelected, this);
		list.on("mouseover", this.onMouseOver, this);
		list.on("mouseout", this.onMouseOut, this);
		this.on("listPressDown", this.onPressDown, this);
		this.on("listPressUp", this.onPressUp, this);
		this.on("listPressEnter", this.onPressEnter, this);
		var document = Ext.getDoc();
		document.on("scroll", this.onDocumentScroll, this);
		var body = Ext.getBody();
		body.on("wheel", this.onBodyMouseWheel, this);
		this.bodyScrollTop = body.getScrollTop();
	},

	/**
	 * Clear DOM events listeners.
	 * @inheritdoc Terrasoft.controls.component#clearDomListeners
	 * @override
	 */
	clearDomListeners: function() {
		this.callParent(arguments);
		this.unSubscribeDocEvents();
	},

	/**
	 * Clears document DOM events listeners.
	 * @private
	 */
	unSubscribeDocEvents: function() {
		var doc = Ext.getDoc();
		doc.un("scroll", this.onDocumentScroll, this);
		var body = Ext.getBody();
		body.un("wheel", this.onBodyMouseWheel, this);
	},

	/**
	 * Handler for document mouse wheel event. Hides listView.
	 * @protected
	 * @param {Ext.EventObjectImpl} event Event object.
	 */
	onBodyMouseWheel: function(event) {
		if (!this.isEventWithin(event)) {
			this.hide();
			this.unSubscribeDocEvents();
		}
	},

	/**
	 * Handler for scroll event on document. Set body scroll.
	 * @protected
	 */
	onDocumentScroll: function() {
		var body = Ext.getBody();
		if (this.bodyScrollLock) {
			body.setScrollTop(this.bodyScrollTop);
		}
		this.bodyScrollTop = body.getScrollTop();
	},

	/**
	 * Processes list scrolling.
	 * @param {Ext.EventObject} event Event object.
	 */
	onWrapElScroll: function(event) {
		var element = event.currentTarget;
		if (this.getIsScrolledToBottom(element)) {
			this.loadMoreElements();
		}
	},

	/**
	 * Checks if list scrolled to the bottom.
	 * @protected
	 * @param {Ext.dom.Element} element Scrolled element.
	 * @return {Boolean} Returns true if element scrolled to the bottom, otherwise - false.
	 */
	getIsScrolledToBottom: function(element) {
		return element.clientHeight + element.scrollTop >= element.scrollHeight;
	},

	/**
	 * Fires event to load more elements to the list with required amount of elements.
	 * @protected
	 */
	loadMoreElements: function() {
		this.indexOfLastLoadedItem = this.listEls.elements.length - 1;
		this.fireEvent("loadNextPage");
	},

	/**
	 * Processes click on the main list element.
	 * @protected
	 * @param {Object} event Event object.
	 */
	onWrapElMouseDown: function(event) {
		event.stopEvent();
	},

	/**
	 * Returns listView LI element.
	 * @protected
	 * @param {Object} element
	 */
	getTargetElement: function(element) {
		return element.tagName === "LI" ? element : element.parentNode;
	},

	/**
	 * Fires selection event with the value of selected item.
	 * @protected
	 * @param  {Ext.EventObject} event Event object.
	 * @param  {Ext.dom.Element} target Link to the element of event.
	 */
	onSelected: function(event, target) {
		event.stopEvent();
		var element = this.getTargetElement(target);
		var value = element.getAttribute("data-value");
		var listItems = this.listItems;
		var listValue;
		for (var i = 0, length = listItems.length; i < length; i++) {
			listValue = listItems[i];
			/*jshint eqeqeq:false */
			if (listValue.value == value) {
				/*jshint eqeqeq:true */
				this.fireEvent("select", listValue);
				break;
			}
		}
	},

	/**
	 * Processes focused list item selection.
	 * @protected
	 * @param {Ext.EventObject} event Event object.
	 * @param {Ext.dom.Element} target Link to the element of event.
	 */
	onMouseOver: function(event, target) {
		event.stopEvent();
		var selected = this.selectedItem;
		var item = Ext.get(this.getTargetElement(target));
		if (selected) {
			selected.removeCls("listview-selected");
		}
		item.addCls("listview-selected");
		this.selectedItem = item;
	},

	/**
	 * The event handler for canceling the focus of a list item.
	 * @protected
	 * @param {Ext.EventObject} event Event object
	 */
	onMouseOut: function(event) {
		event.stopEvent();
		if (this.selectedItem && this.selectedItem.hasCls("listview-selected")) {
			this.selectedItem.removeCls("listview-selected");
		}
		this.selectedItem = null;
	},

	/**
	 * The {@link #listPressDown} event handler.
	 * @protected
	 */
	onPressDown: function() {
		this.changeSelected("down");
	},

	/**
	 * The {@link #listPressUp} event handler.
	 * @protected
	 */
	onPressUp: function() {
		this.changeSelected("up");
	},

	/**
	 * Event Handler of list item selection.
	 * @protected
	 */
	onPressEnter: function() {
		var listItems = this.getListItemsData();
		if (listItems.length === 1) {
			this.selectElement();
		}
		var selected = Ext.getDom(this.selectedItem);
		var result = null;
		if (selected) {
			var value = selected.getAttribute("data-value");
			var listValue;
			for (var i = 0, length = listItems.length; i < length; i++) {
				listValue = listItems[i];
				/*jshint eqeqeq:false */
				if (listValue.value == value) {
					/*jshint eqeqeq:true */
					result = listValue;
					break;
				}
			}
		}
		this.fireEvent("select", result);
		return true;
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterRender
	 * @protected
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.adjustMaxHeight();
		this._showAnimation();
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterReRender
	 * @protected
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.adjustMaxHeight();
		this._showAnimation();
	},

	/**
	 * @private
	 */
	_showAnimation: function() {
		var wrapEl = this.getWrapEl();
		wrapEl.setStyle("opacity", 1);
	},

	/**
	 * @inheritdoc Terrasoft.Component#tpl
	 * @protected
	 * @override
	 * @type {String[]}
	 */
	tpl: [
		"<div id=\"{id}\" class=\"{wrapClass}\" style=\"{wrapStyle}\">",
		"<tpl if=\"listItems\">",
		"<ul>",
		"<tpl for=\"listItems\">",
		"<tpl if=\"values.isSeparatorItem\">",
		"<div data-value=\"{value}\" data-item-marker=\"{markerValue}\">{customHtml}</div>",
		"<tpl elseif=\"values.primaryImageVisible\">",
		"<li data-value=\"{value}\" data-item-marker=\"{markerValue}\" dir=\"{direction}\">",
		"<div class=\"listview-left-icon-container\">",
		"<tpl if=\"values.primaryImage\">",
		"<img class=\"listview-left-icon\" src={imageUrl}>",
		"</tpl>",
		"</div>",
		"<div class=\"listview-text-container\">{customHtml}</div>",
		"</li>",
		"<tpl else>",
		"<li",
		"<tpl if=\"values.imageConfig\">",
		" class=\"listview-icon\"",
		"</tpl>",
		"<tpl if=\"values.imageConfig\">",
		" style=\"background-image: url('",
		"{[Terrasoft.ImageUrlBuilder.getUrl(values.imageConfig)]}",
		"'); \"",
		"</tpl>",
		" data-value=\"{value}\" data-item-marker=\"{markerValue}\" dir=\"{direction}\"",
		">",
		"<tpl if=\"values.customHtml\">",
		"{customHtml}",
		"<tpl else>",
		"{[Terrasoft.Resources.Core.NotFilledIn]}",
		"</tpl>",
		"</li>",
		"</tpl>",
		"</tpl>",
		"</ul>",
		"</tpl>",
		"<tpl if=\"showProgressSpinner\">",
		"<div class=\"listview-progress\">",
		"<div class=\"listview-progress-spinner\">{progressSpinner}</div>",
		"<div class=\"listview-progress-caption\">{progressSpinnerCaption}</div>",
		"</div>",
		"</tpl>",
		"</div>"
	],

	/**
	 * @inheritdoc Terrasoft.Component#getTplData
	 * @protected
	 * @override
	 * @return {Object}
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		this.combineCssStyles();
		var listviewTplData = {
			listItems: this.getListItems(),
			showProgressSpinner: this.showProgressSpinner,
			progressSpinner: this.getProgressSpinner(),
			progressSpinnerCaption: Terrasoft.encodeHtml(this.progressSpinnerCaption),
			wrapClass: this.combineCssClasses()
		};
		Ext.apply(listviewTplData, tplData, {});
		this.getSelectors();
		this.selectedItem = null;
		return listviewTplData;
	},

	/**
	 * Collect and configure CSS classes for the template.
	 * @protected
	 */
	combineCssClasses: function() {
		var classes = ["listview", "listview-scroll"];
		if (this.hasIcons) {
			classes.push("listview-with-icons");
		}
		if (this.indexOfLastLoadedItem) {
			classes.push("no-transition");
		}
		return classes;
	},

	/**
	 * Collect and configure CSS styles for the template.
	 * @protected
	 */
	combineCssStyles: function() {
		var wrapStyle = this.styles.wrapStyle;
		var minWidth = parseInt(this.minWidth, 10) - 2;
		var maxWidth = parseInt(this.maxWidth, 10) - 2;
		var wrapBox = (this.alignEl) ? this.alignEl.getBox() : {};
		if (minWidth > 0) {
			wrapStyle["min-width"] = this.minWidth + "px";
		} else if (wrapBox.width) {
			wrapStyle["min-width"] = wrapBox.width - 2 + "px";
		}
		if (maxWidth > 0) {
			wrapStyle["max-width"] = this.maxWidth - 2 + "px";
		}
		if (this.maxItems) {
			wrapStyle["max-height"] = this.adjustHeight() + "px";
		}
		this.styles.wrapStyle = wrapStyle;
	},

	/**
	 * Creating selectors for Terrasoft.Component
	 * @protected
	 * @return {Object}
	 */
	getSelectors: function() {
		this.selectors = {
			wrapEl: "#" + this.id,
			el: "#" + this.id
		};
		return this.selectors;
	},

	/**
	 * Getting list items.
	 * @protected
	 * @return {Object}
	 */
	getListItems: function() {
		var items = this.listItems;
		Terrasoft.each(this.listItems, function(item) {
			this.fireEvent("listViewItemRender", item);
			var customHtml = item.customHtml;
			item.customHtml = customHtml ? customHtml : Terrasoft.encodeHtml(item.displayValue);
			if (item.imageConfig) {
				this.hasIcons = true;
			}
			if (Ext.isEmpty(item.markerValue)) {
				item.markerValue = item.displayValue;
			}
			if (Terrasoft.getIsRtlMode()) {
				item.direction = Terrasoft.getTextDirection(item.customHtml);
			}
		}, this);
		return items;
	},

	/**
	 * Returns list items data.
	 * @returns {Object[]} List items data.
	 */
	getListItemsData: function() {
		return this.listItems;
	},

	/**
	 * Generate a link to the item object of the download indicator.
	 * @protected
	 * @return {Terrasoft.BaseSpinner}
	 */
	getProgressSpinner: function() {
		var progressSpinner = this.progressSpinner;
		if (!progressSpinner) {
			progressSpinner = this.progressSpinner = Terrasoft.getSpinner("listview-progress-container");
		}
		return progressSpinner.generateHtml();
	},

	/**
	 * Positioning the menu relative to the parent element.
	 * @protected
	 */
	adjustPosition: function() {
		var alignEl = this.alignEl;
		var wrapEl = this.getWrapEl();
		if (!alignEl || !wrapEl || !alignEl.dom || !wrapEl.dom) {
			return;
		}
		var self = this;
		var correctFn = function() {
			self.correctListTopPosition.call(self);
		};
		var offset = this.offset || this.defaultOffset;
		wrapEl.anchorTo(alignEl, "tl-bl?", offset, false, false, correctFn);
		wrapEl.removeAnchor();
		this.scrollToSelectedItem();
	},

	/**
	 * Adjusts the position of the sheet to 1px up / down relative to alignEl
	 * @private
	 */
	correctListTopPosition: function() {
		var wrap = this.getWrapEl();
		var wrapDom = wrap.dom;
		var listTop = wrapDom.offsetTop;
		var listHeight = wrapDom.offsetHeight;
		var elDom = this.alignEl.dom;
		var elTop = elDom.offsetTop;
		var elHeight = elDom.offsetHeight;
		var wrapTopStyle = wrap.getStyle("top");
		var listBox = Ext.util.Format.parseBox(wrapTopStyle);
		var top = listBox.top;
		if (listTop === elTop + elHeight) {
			top += this.correctTopPosition;
			wrap.setStyle("top", top + "px");
		} else if (listTop + listHeight === elTop) {
			top -= this.correctTopPosition;
			wrap.setStyle("top", top + "px");
		}
	},

	/**
	 * Set the maximum number of visible elements relative to the set value and other parameters of the drop-down list.
	 * @protected
	 * @return {Number} The adjusted maximum number of visible list items.
	 */
	adjustMaxItems: function() {
		var listItemsLength = this.listItems.length;
		var maxItems = this.maxItems - 1;
		var max = (listItemsLength < maxItems) ? listItemsLength : maxItems;
		if (this.showProgressSpinner) {
			maxItems += (max < maxItems) ? 1 : -1;
		}
		return maxItems;
	},

	/**
	 * Adjust the maximum height of the menu after rendering or re-rendering
	 * @protected
	 */
	adjustMaxHeight: function() {
		var alignEl = this.alignEl;
		if (!alignEl) {
			return;
		}
		this.adjustPosition();
		var alignRegion = alignEl.getViewRegion();
		var wrapRegion = this.getWrapEl().getViewRegion();
		var viewRegion = Ext.getBody().getViewRegion();
		if (wrapRegion.top > viewRegion.top && wrapRegion.bottom < viewRegion.bottom &&
			wrapRegion.left > viewRegion.left && wrapRegion.right < viewRegion.right) {
			this.adjustPosition();
			return;
		}
		var listHeight = wrapRegion.bottom - wrapRegion.top;
		var spaceTop = alignRegion.top - viewRegion.top || 0;
		var spaceBottom = viewRegion.bottom - alignRegion.bottom || 0;
		var space = (spaceTop > spaceBottom) ? spaceTop : spaceBottom;
		var rowHeight = parseInt(this.rowHeight, 10);
		if (listHeight < space) {
			space = listHeight;
		}
		var newRows = Math.floor(space / rowHeight);
		if (listHeight > space) {
			newRows -= 1;
		}
		var newHeight = newRows * rowHeight;
		this.wrapEl.setHeight(newHeight);
		this.adjustPosition();
	},

	/**
	 * Calculate the total height of the menu, taking into account the height of each element and their number
	 * @protected
	 * @return {Number} Menu height
	 */
	adjustHeight: function() {
		var maxItems = this.adjustMaxItems();
		var rowHeight = parseInt(this.rowHeight, 10);
		return (maxItems * rowHeight);
	},

	/**
	 * Select and scroll to list element by selected value.
	 */
	selectElement: function() {
		var selectedValue = this.selectedValue;
		if (!selectedValue) {
			this.changeSelected("down");
			return;
		}
		var wrapEl = this.getWrapEl();
		var list = Ext.select("li", true, wrapEl.dom);
		var listElements = list.elements;
		var listLength = listElements.length;
		var elementValue;
		for (var i = 0; i < listLength; i++) {
			elementValue = listElements[i].dom.getAttribute("data-value");
			/*jshint eqeqeq:false */
			if (elementValue == selectedValue.value) {
				/*jshint eqeqeq:true */
				listElements[i].addCls("listview-selected");
				this.selectedItem = listElements[i];
				break;
			}
		}
		this.scrollToSelectedItem();
	},

	/**
	 * Focus function of the list item
	 * @protected
	 * @param  {String} direction = ["up"|"down"] direction indicator of the focus shift
	 */
	changeSelected: function(direction) {
		if (this.listItems.length < 1) {
			return;
		}
		var wrapEl = this.getWrapEl();
		var list = Ext.select("li", false, wrapEl.dom);
		var listLength = list.getCount();
		var selectedItem = Ext.select("." + this.selectedCssClass, false, wrapEl.dom).first();
		if (!selectedItem) {
			if (direction === "up") {
				selectedItem = list.last();
			} else if (direction === "down") {
				selectedItem = list.first();
			}
			selectedItem.addCls(this.selectedCssClass);
			this.selectedItem = selectedItem;
			this.scrollToSelectedItem();
			return;
		}
		selectedItem.removeCls(this.selectedCssClass);
		var selectedItemIndex = list.indexOf(selectedItem);
		selectedItemIndex += (direction === "down") ? 1 : -1;
		selectedItemIndex = (selectedItemIndex + listLength) % listLength;
		selectedItem = list.item(selectedItemIndex);
		selectedItem.addCls(this.selectedCssClass);
		this.selectedItem = selectedItem;
		this.scrollToSelectedItem();
	},

	/**
	 * Scrolling to a focused item in the list
	 * @protected
	 */
	scrollToSelectedItem: function() {
		var indexOfLastLoadedItem = this.listEls.item && this.listEls.item(this.indexOfLastLoadedItem);
		var selectedItem = this.selectedItem || indexOfLastLoadedItem;
		this.indexOfLastLoadedItem = null;
		if (!selectedItem) {
			return;
		}
		var wrapEl = this.getWrapEl();
		var scrollVector = wrapEl.getConstrainVector(selectedItem);
		var scrollHeight = 0;
		if (scrollVector) {
			scrollHeight = scrollVector[1];
		}
		wrapEl.scroll("bottom", scrollHeight, false);
	},

	/**
	 * Load a collection for list data
	 * @param  {Terrasoft.Collection} collection Data Collection
	 */
	loadList: function(collection) {
		if (Ext.isEmpty(this.map)) {
			return;
		}
		this.collection = collection;
		var list = collection.getItems();
		var listItems = [];
		for (var row in list) {
			var item = this.convertItemToMapConfig(list[row]);
			listItems.push(item);
		}
		this.listItems = listItems;
	},

	convertItemToMapConfig: function(item) {
		var newItem = {};
		var map = this.map;
		var key, mapKey;
		for (key in item) {
			if (!item.hasOwnProperty(key)) {
				continue;
			}
			for (mapKey in map) {
				if (!map.hasOwnProperty(mapKey)) {
					continue;
				}
				if (key === map[mapKey]) {
					newItem[mapKey] = item[key];
					break;
				}
			}
			if (key !== map[mapKey]) {
				newItem[key] = item[key];
			}
			this.convertImageConfig(item, newItem);
		}
		return newItem;
	},

	/**
	 * Converts image config from query to listView image config.
	 * @protected
	 * @param  {Object} item Config from query
	 * @param  {Object} newItem Config for listview
	 */
	convertImageConfig: function(item, newItem) {
		if (item.imageConfig) {
			return;
		}
		newItem.primaryImageVisible = this.iconsVisible && !item.customHtml;
		if (!newItem.primaryImageVisible) {
			return;
		}
		newItem.primaryImage = item.Image && item.Image.value;
		newItem.imageConfig = {
			"source": Terrasoft.ImageSources.SYS_IMAGE,
			"params": {
				"primaryColumnValue": item.Image && item.Image.value ? item.Image.value : ""
			}
		};
		newItem.imageUrl = Terrasoft.ImageUrlBuilder.getUrl(newItem.imageConfig);
	},

	convertItemToInitialConfig: function(item) {
		var newItem = {};
		var map = this.map;
		var key, mapKey;
		for (key in item) {
			if (!item.hasOwnProperty(key)) {
				continue;
			}
			for (mapKey in map) {
				if (!map.hasOwnProperty(mapKey)) {
					continue;
				}
				if (key === mapKey) {
					newItem[map[mapKey]] = item[key];
					break;
				}
			}
			if (key !== mapKey) {
				newItem[key] = item[key];
			}
		}
		return newItem;
	},

	/**
	 * Displaying a drop-down list
	 * @param {Object} options Enumeration of public parameters of this class with the required values
	 */
	show: function(options) {
		for (var propertyName in options) {
			if (!options.hasOwnProperty(propertyName) || typeof this[propertyName] === undefined) {
				continue;
			}
			this[propertyName] = options[propertyName];
		}
		if (this.listItems.length < 1 && this.showProgressSpinner === false) {
			return;
		}
		this.selectedItem = null;
		this.visible = true;
		if (this.rendered) {
			this.reRender();
		} else {
			this.render(this.renderTo || Ext.getBody());
		}
		if (this.useDefSelection) {
			this.selectElement();
		}
		this.bodyScrollLock = true;
		if (this.showProgressSpinner) {
			this.progressSpinner.show();
		}
		this.fireEvent("show");
	},

	/**
	 * Hides dropdown list.
	 */
	hide: function() {
		this.indexOfLastLoadedItem = null;
		this.selectedItem = null;
		this.selectedValue = null;
		this.bodyScrollLock = false;
		this.setVisible(false);
		this.fireEvent("hide");
	},

	/**
	 * @inheritdoc Terrasoft.Component#destroy
	 * @protected
	 * @override
	 */
	onDestroy: function() {
		if (this.progressSpinner) {
			this.progressSpinner.destroy();
			delete this.progressSpinner;
		}
		if (!Ext.isEmpty(this.listEls)) {
			this.listEls.each(function(el) {
				el.removeAllListeners();
				el.destroy();
			}, this);
		}
		this.callParent(arguments);
	}

});
