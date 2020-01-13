/**
 * Class of the "menu" control
 * Example:
 *
 *      var menu = Ext.create('Terrasoft.Menu', {
 *      items: [
 *          {
 *              caption: "some caption",
 *              className: 'Terrasoft.MenuSeparator'
 *          },{
 *              imageConfig: {
 *                  source: Terrasoft.ImageSources.URL,
 *                  url: 'fooImageUrl'
 *              },
 *              caption: "menu item 1"
 *          }
 *       ]
 *      });
 *
 */
Ext.define("Terrasoft.controls.Menu", {
	extend: "Terrasoft.Component",
	alternateClassName: "Terrasoft.Menu",

	/**
	 * An array of key codes whose processing of pressing processes only the menu.
	 * For example: [38, 39, 40, 37]
	 * @private
	 * @type {Array}
	 */
	preventDefaultsKeys: [
		Ext.EventObject.UP,
		Ext.EventObject.RIGHT,
		Ext.EventObject.DOWN,
		Ext.EventObject.LEFT
	],

	/**
	 * If the menu is root
	 * @private
	 * @type {Boolean}
	 */
	isRootMenu: true,

	/**
	 * Root menu
	 * @private
	 * @type {Boolean}
	 */
	rootMenu: null,

	/**
	 *  Scroll step with a mouse click, in pixels
	 * @private
	 * @type {Number}
	 */
	scrollStep: 64,

	/**
	 * Menu indent from the top and bottom edges of the document, in pixels
	 * @private
	 * @type {Number}
	 */
	menuDocumentOffset: 10,

	/**
	 * Download display control
	 * @private
	 * @type {Terrasoft.BaseSpinner}
	 */
	progressSpinner: null,

	/**
	 * CSS class of scroll button in visible state
	 * @private
	 * @type {String}
	 */
	scrollBarVisibleClass: "menu-scrollbar-visible",

	/**
	 * Whether to show the menu loading( is used in the template).
	 * @private
	 * @type {Boolean}
	 */
	isMenuLoading: false,

	/**
	 * Indentation for adjusting menus when rendering.
	 * @private
	 * @type {Number}
	 */
	outSideOffset: 40,

	/**
	 * Indentation correction for IE
	 * @private
	 * @type {Number}
	 */
	outSideOffsetIE: 1,

	/**
	 * Default menu align type position over element
	 * @private
	 */
	defaultAlignType: "tl-bl?",

	/**
	 * The default value for linking the 'id' property with the ViewModel column.
	 * @protected
	 */
	defaultPrimaryColumnName: "Id",

	/**
	 * The default value for linking the 'caption' property to the ViewModel column.
	 * @protected
	 * @property {String} defaultCaptionName
	 */
	defaultCaptionName: "Caption",

	/**
	 * The default value for linking the 'imageConfig' property to the ViewModel column.
	 * @protected
	 * @property {String} defaultImageConfigName
	 */
	defaultImageConfigName: "ImageConfig",

	/**
	 * The default value for linking the 'className' property to the ViewModel column
	 * @protected
	 * @property {String} defaultTypeName
	 */
	defaultTypeName: "Type",

	/**
	 * The default value for linking the 'tag' property to the ViewModel column.
	 * @protected
	 * @property {String} defaultTagName
	 */
	defaultTagName: "Tag",

	/**
	 * The default value for linking the 'markerValue' property to the ViewModel column.
	 * @protected
	 * @property {String} defaultMarkerValueName
	 */
	defaultMarkerValueName: "MarkerValue",

	/**
	 * The default value for linking the 'visible' property to the ViewModel column.
	 * @protected
	 * @property {String} defaultVisibleName
	 */
	defaultVisibleName: "Visible",

	/**
	 * The default value for linking the 'enabled' property to the ViewModel column.
	 * @protected
	 * @property {String} defaultEnabledName
	 */
	defaultEnabledName: "Enabled",

	/**
	 * The default value for linking submenu elements to the ViewModel column.
	 * @protected
	 * @property {String} defaultItemsName
	 */
	defaultItemsName: "Items",

	/**
	 * The default value for linking the 'click' event handler to the ViewModel column.
	 * @protected
	 * @property {String} defaultClickEventName
	 */
	defaultClickEventName: "Click",

	/**
	 * Default bind name of the canExecute event.
	 * @private
	 * @type {String}
	 */
	defaultCanExecuteName: "canExecute",

	/**
	 * The 'element scroll' wrapper class  by default.
	 * @protected
	 * @type {String}
	 */
	defaultScrollWrapperClass: "menu-scroll-wrap menu",

	/**
	 * The default content wrapper element class.
	 * @protected
	 * @type {String}
	 */
	defaultUlClass: "menu-wrap menu",

	/**
	 * Default direction property name.
	 * @protected
	 * @type {String}
	 */
	defaultDirectionName: "direction",

	/**
	 * Common control template, contains markup of the scrolling elements and a method for rendering the content.
	 * @override
	 * @type {Array}
	 */
	tpl: [
		"<tpl if=\"hasScrolling\">",
		"<div id=\"{id}-scroll-wrap\" class=\"{scrollWrapperClass}\" style=\"{scrollWrapperStyle}\">",
		"</tpl>",
		"<tpl if=\"needContent\">",
		"{%this.renderContent(out, values)%}",
		"</tpl>",
		"<tpl if=\"hasScrolling\">",
		"<div id=\"{id}-scroll-up\" class=\"menu-scrollbar menu-scrollbar-top\">",
		"<span class=\"menu-scroll-marker menu-scroll-marker-top\"></span>",
		"</div>",
		"<div id=\"{id}-scroll-down\" class=\"menu-scrollbar menu-scrollbar-bottom menu-scrollbar-visible\">",
		"<span class=\"menu-scroll-marker menu-scroll-marker-bottom\"></span>",
		"</div>",
		"</div>",
		"</tpl>"
	],

	/**
	 * A template for marking the content of the menu.
	 * @type {Array}
	 */
	contentTpl: [
		"<ul id=\"{id}-list\" class=\"{ulClass}\" style=\"{ulStyle}\">",
		"<tpl if=\"isRootMenu\">",
		"<input id=\"{id}-focusEl\" class=\"menu-focus-el\">",
		"</tpl>",
		"<tpl if=\"isMenuLoading && isRootMenu\">",
		"<li class=\"menu-loading\">",
		"{%this.renderProgressSpinner(out, values)%}",
		"{loadingCaption}",
		"</li>",
		"<tpl else>",
		"{%this.renderItems(out, values)%}",
		"</tpl>",
		"</ul>"
	],

	/**
	 * The object for specifying the inline styles of the component specified in the template.
	 * If the {@link #tpl template} specifies the name of the style, then the style object must have a property with the same name.
	 * If a property with styles is not found, the attribute with styles will be removed from the template.
	 * You can specify the component styles in either of the two methods {@link #getTpl getTpl ()} and {@link #getTplData getTplData ()}.
	 * @override
	 * @type {Object}
	 */
	styles: {
		ulStyle: {},
		scrollWrapperStyle: {}
	},

	/**
	 * A collection of menu items
	 * @type {Terrasoft.Collection}
	 */
	items: null,

	/**
	 * The wrapper element class of the item scroll.
	 * @type {String}
	 */
	scrollWrapperClass: "",

	/**
	 * The wrapper element class of the menu content.
	 * @type {String}
	 */
	ulClass: "",

	/**
	 * The currently selected menu item, an instance of the class that is not the next Terrasoft.BaseMenuItem
	 * @type {Terrasoft.BaseMenuItem}
	 */
	selectedItem: null,

	/**
	 * Menu align type over element
	 * @type {String}
	 */
	alignType: null,

	/**
	 * Array of coordinates X and Y to align menu from element
	 * @type {Array}
	 */
	offset: null,

	/**
	 * Generate content markup into a template
	 * @private
	 * @param  {Array} buffer buffer for markup
	 * @param  {Object} renderData data object for rendering
	 */
	renderContent: function(buffer, renderData) {
		var self = renderData.self;
		var contentTpl = new Ext.XTemplate(self.contentTpl);
		contentTpl.renderItems = self.renderItems;
		contentTpl.renderProgressSpinner = self.renderProgressSpinner;
		contentTpl.html = self.processTemplate(self.contentTpl, renderData);
		contentTpl.applyOut(renderData, buffer);
	},

	/**
	 * Generate the markup of the menu items in the template
	 * @private
	 * @param  {Array} buffer buffer for markup
	 * @param  {Object} renderData data object for rendering
	 */
	renderItems: function(buffer, renderData) {
		var self = renderData.self;
		var itemsHtml = self.getItemsHtml();
		Ext.DomHelper.generateMarkup(itemsHtml, buffer);
	},

	/**
	 * Generate the markup of the progress of loading the menu into the template
	 * @private
	 * @param  {Array} buffer buffer for markup
	 * @param  {Object} renderData data object for rendering
	 */
	renderProgressSpinner: function(buffer, renderData) {
		var self = renderData.self;
		var progressSpinner = self.getProgressSpinner();
		var progressSpinnerHtml = progressSpinner.generateHtml();
		Ext.DomHelper.generateMarkup(progressSpinnerHtml, buffer);
	},

	/**
	 * Return the current active menu, the deepest in the nesting level of the rendered menu
	 * @private
	 * @return {Terrasoft.Menu}
	 */
	getActiveMenu: function() {
		var selectedItem = this.selectedItem;
		if (selectedItem && selectedItem.menu && selectedItem.menu.rendered) {
			return selectedItem.menu.getActiveMenu();
		}
		return this;
	},

	/**
	 * Is the item in the tree branch of the current menu
	 * @private
	 * @param  {Object}  element  Element of Ext.Element type or element DOM
	 * @return {Boolean}
	 */
	isElementInMenuTreeBranch: function(element) {
		var el = element.dom ? element : Ext.get(element);
		if (this.wrapEl.contains(el)) {
			return true;
		}
		var selectedItem = this.selectedItem;
		if (!selectedItem) {
			return false;
		}
		var subMenu = selectedItem.menu;
		if (subMenu && subMenu.rendered) {
			return subMenu.isElementInMenuTreeBranch(el);
		}
		return false;
	},

	/**
	 * Navigate in the menu by typing a key
	 * @private
	 * @param  {Number} keyCode Key code
	 */
	navigate: function(keyCode) {
		var selectedItem = this.selectedItem;
		switch (keyCode) {
			case Ext.EventObject.SPACE:
			case Ext.EventObject.ENTER:
				if (selectedItem) {
					selectedItem.process();
				}
				break;
			case Ext.EventObject.ESC:
			case Ext.EventObject.LEFT:
				this.hide();
				break;
			case Ext.EventObject.RIGHT:
				if (selectedItem && selectedItem.menu) {
					selectedItem.showMenu();
				} else {
					this.setSelectedItemByIndex(0);
				}
				break;
			case Ext.EventObject.UP:
				this.selectNextMenuItem(true);
				break;
			case Ext.EventObject.DOWN:
				this.selectNextMenuItem(false);
				break;
			default:
		}
	},

	/**
	 * Select the next menu item that supports selection if one is present.
	 * @private
	 * @param  {Boolean} isUpDirection Search direction if true - up, if false - down.
	 */
	selectNextMenuItem: function(isUpDirection) {
		var nextItem = this.getNextSelectableItem(isUpDirection);
		if (nextItem) {
			this.scrollToItem(nextItem);
			this.setSelectedItem(nextItem);
		}
	},

	/**
	 * Find the next menu item that supports selection.
	 * @private
	 * @param  {Boolean} isUpDirection Search direction if true - up, if false - down.
	 */
	getNextSelectableItem: function(isUpDirection) {
		var selectedItem = this.selectedItem;
		var count = this.items.getCount();
		if (count === 0) {
			return null;
		}
		if (!selectedItem) {
			selectedItem = isUpDirection ? this.getItemByIndex(0) : this.getItemByIndex(count - 1);
		}
		var index = selectedItem.getIndex();
		for (var i = 0; i <= count; i++) {
			if (isUpDirection) {
				index = index === 0 ? count - 1 : index - 1;
			} else {
				index = index === count - 1 ? 0 : index + 1;
			}
			var nextItem = this.getItemByIndex(index);
			if (nextItem.isInteractive && nextItem.enabled !== false && nextItem.visible) {
				return nextItem;
			}
		}
		return null;
	},

	/**
	 *  Processing of the click on the document, used to close the menu, the method is used only in the root menu
	 * @private
	 * @param  {Ext.EventObjectImpl} event event object
	 * @param  {HTMLElement} dom DOM element
	 */
	onDocumentMouseDown: function(event, dom) {
		var rootMenu = this.getRootMenu();
		if (rootMenu.isElementInMenuTreeBranch(dom)) {
			return;
		}
		rootMenu.hide();
	},

	/**
	 * Processing of pressing the scroll buttons
	 * @private
	 * @param  {Object} event event object
	 * @param  {HTMLElement} dom DOM element
	 */
	onScrollButtonClick: function(event, dom) {
		event.stopPropagation();
		var buttonDom = dom.className.indexOf("menu-scroll-marker") >= 0 ? dom.parentNode : dom;
		if (!Ext.get(buttonDom).hasCls(this.scrollBarVisibleClass)) {
			return;
		}
		var isUpDirection = (buttonDom.id.indexOf("up") !== -1);
		var scrollStep = this.scrollStep;
		var scrollDelta = isUpDirection ? scrollStep : (-1 * scrollStep);
		this.scroll(scrollDelta);
	},

	/**
	 * Scrolling the mouse wheel
	 * @private
	 * @param  {Object} event event object
	 */
	onMouseWheel: function(event) {
		event.stopPropagation();
		event.preventDefault();
		this.scroll(event.browserEvent.wheelDelta);
	},

	/**
	 * Can we scroll up
	 * @private
	 * @return {Boolean} can we scroll up
	 */
	canScrollUp: function() {
		return this.ulEl.getTop() < (this.scrollWrapEl.getTop());
	},

	/**
	 * Can we scroll down
	 * @private
	 * @return {Boolean} Can we scroll down
	 */
	canScrollDown: function() {
		return this.ulEl.getBottom() > (this.scrollWrapEl.getBottom());
	},

	/**
	 * Add scroll bars in the menu - add a wrapper and the scrolling buttons
	 * @private
	 */
	addScrollBars: function() {
		var html = [];
		this.tplData.hasScrolling = true;
		this.tplData.needContent = false;
		var tpl = new Ext.XTemplate(this.tpl);
		tpl.applyOut(this.tplData, html);
		Ext.DomHelper.insertHtml("beforeend", Ext.getBody().dom, html.join(""));
		this.updateSelectors(this.tplData);
		var scrollWrapEl = Ext.get(Ext.DomQuery.selectNode(this.selectors.scrollWrapEl));
		var ulEl = Ext.get(Ext.DomQuery.selectNode(this.selectors.ulEl));
		var scrollUpEl = Ext.get(Ext.DomQuery.selectNode(this.selectors.scrollUpEl));
		ulEl.removeCls("menu");
		ulEl.setStyle({
			left: "0px",
			top: 0 + scrollUpEl.getHeight() + "px"
		});
		scrollWrapEl.insertFirst(ulEl);
		this.applySelectors();
	},

	/**
	 * Change the visibility of the scroll button
	 * @private
	 * @param {Ext.dom.Element} scrollButton the element of the scrolling button - this.scrollUpEl or this.scrollDownEl
	 * @param {Boolean} show show if true, hide if false
	 */
	setScrollButtonVisibility: function(scrollButton, show) {
		var visibleClass = this.scrollBarVisibleClass;
		if (show) {
			scrollButton.addCls(visibleClass);
		} else {
			scrollButton.removeCls(visibleClass);
		}
	},

	/**
	 * Adjust the height and position of the menu after drawing
	 * @private
	 */
	fixRendering: function() {
		var wrapEl = this.wrapEl;
		var sizes = {};
		var body = Ext.getBody();
		sizes.bodyScroll = body.getScroll();
		sizes.buttonBox = this.buttonBox || {width: 0, height: 0, x: 0, y: 0, right: 0, bottom: 0};
		sizes.viewSize = body.getViewSize();
		sizes.viewSize.bottom = sizes.bodyScroll.top + sizes.viewSize.height;
		sizes.viewSize.right = sizes.bodyScroll.left + sizes.viewSize.width;
		sizes.menuSize = wrapEl.getBox();
		sizes.position = {x: sizes.buttonBox.x, y: sizes.buttonBox.bottom};
		var position = sizes.position;
		this.fixX(sizes);
		this.fixY(sizes);
		var cssDeltaX = Terrasoft.getIsRtlMode() ? -3 : 3;
		var cssDeltaY = 2;
		this.wrapEl.moveTo(position.x + cssDeltaX, position.y + cssDeltaY);
	},

	/**
	 * Recalculate the position horizontally, the value will be written in sizes.position.x
	 * @private
	 * @param  {Object} sizes object containing all necessary coordinates and result data of the position.
	 */
	fixX: function(sizes) {
		var position = sizes.position;
		var buttonBox = sizes.buttonBox;
		var menuSize = sizes.menuSize;
		var fitRight;
		var isRootMenu = this.isRootMenu;
		var scrollBarSize = Ext.getScrollbarSize();
		var isRtl = Terrasoft.getIsRtlMode();
		var buttonBoxDirectionOffset = isRtl ? buttonBox.left : buttonBox.right;
		if (isRootMenu) {
			var menuSizeDirectionOffset = isRtl ? menuSize.left : menuSize.right;
			fitRight = (menuSizeDirectionOffset < sizes.viewSize.width);
		} else {
			fitRight = (buttonBoxDirectionOffset + menuSize.width + scrollBarSize.width) < sizes.viewSize.width;
		}
		var fitLeft = (menuSize.width < buttonBox.x);
		if (fitRight || !fitLeft) {
			var subMenuPositionX = (isRtl && fitLeft ? buttonBox.left - menuSize.width : buttonBox.right);
			position.x = isRootMenu ? position.x : subMenuPositionX;
		} else {
			position.x = isRootMenu ? (buttonBoxDirectionOffset - menuSize.width) : (buttonBox.x - menuSize.width);
		}
	},

	/**
	 * Recalculate the position vertically, the value is written in sizes.position.y and the height is updated.
	 * @private
	 * @param  {Object} sizes object containing all necessary coordinates and result data of the position.
	 */
	fixY: function(sizes) {
		var menuDocumentOffset = this.menuDocumentOffset;
		var position = sizes.position;
		var buttonBox = sizes.buttonBox;
		var viewSize = sizes.viewSize;
		var bodyScroll = sizes.bodyScroll;
		var menuSize = sizes.menuSize;
		var canFitAbove = (menuSize.height < (buttonBox.y - bodyScroll.top));
		var canFitUnder = ((viewSize.height - (buttonBox.y + buttonBox.height - bodyScroll.top)) > menuSize.height);
		var spaceAbove = viewSize.bottom - buttonBox.bottom;
		var hasMoreSpaceAbove = ((buttonBox.y - bodyScroll.top) > spaceAbove);
		var isBottomMenu = true;
		var hasScrolling = false;
		var height = 0;
		if (!canFitUnder) {
			if (canFitAbove) {
				position.y = sizes.buttonBox.y - sizes.menuSize.height;
				isBottomMenu = false;
			} else {
				this.addScrollBars();
				hasScrolling = true;
				if (hasMoreSpaceAbove) {
					position.y = sizes.bodyScroll.top + menuDocumentOffset;
					height = sizes.buttonBox.y - sizes.bodyScroll.top - menuDocumentOffset;
					isBottomMenu = false;
				} else {
					height = sizes.viewSize.bottom - sizes.buttonBox.bottom - menuDocumentOffset;
				}
			}
		}
		var outSideOffset = this.outSideOffset;
		if (Ext.isIE) {
			outSideOffset += this.outSideOffsetIE;
		}
		if (!this.isRootMenu) {
			if (isBottomMenu) {
				position.y -= outSideOffset;
			}
			height += outSideOffset;
		}
		if (height && hasScrolling) {
			this.wrapEl.setHeight(height);
		}
	},

	/**
	 * Focus on the focus element with a delay of 50 ms.
	 * This element is only at the root menu and, accordingly, the method is intended to be called only on the root menu.
	 * @private
	 */
	focus: function() {
		Terrasoft.delay(function() {
			if (this.visible && this.rendered && this.isRootMenu) {
				this.focusEl.focus();
			}
		}, 50, this);
	},

	/**
	 * Display menu loading
	 * @private
	 */
	renderLoading: function() {
		if (!this.isRootMenu) {
			return;
		}
		if (this.isMenuLoading) {
			this.forceRender();
		}
	},

	/**
	 * Load menu items
	 * @param {Array} items array of initialized and uninitialized menu items.
	 */
	loadData: function(items) {
		if (!this.isMenuLoading) {
			return;
		}
		this.isMenuLoading = false;
		items.forEach(function(item) {
			this.addItem(item, null, true);
		}, this);
		this.forceRender();
	},

	/**
	 * Display the menu if it was not displayed or redraw if it was drawn
	 * @private
	 */
	forceRender: function() {
		if (this.rendered) {
			this.reRender(null);
			this.afterRenderOrRerender();
		} else {
			this.render(Ext.getBody());
		}
	},

	/**
	 * Initializing the menu component
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event
			 * Event of adding a menu item
			 * @param {Terrasoft.Menu} this
			 */
			"add",
			/**
			 * @event
			 * Event of deleting the menu item
			 * @param {Terrasoft.BaseMenuItem} this
			 */
			"remove",
			/**
			 * @event
			 * Menu preparation event
			 * @param {Terrasoft.Menu} this
			 * @param {Terrasoft.BaseMenuItem} menuItem menu element
			 */
			"prepareMenu",
			/**
			 * @event
			 * Event of hiding the parent menu
			 * @param {Terrasoft.BaseMenuItem} this
			 */
			"hide"
		);
		this.initItems();
	},

	/**
	 * Initializing menu items
	 * @protected
	 * @throws {Terrasoft.NullOrEmptyException}
	 * When the control is initialized if the items property is not an array, an error is generated
	 */
	initItems: function() {
		var items = this.items || [];
		if (!Ext.isArray(items)) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.Controls.Menu.MenuItemsPropertyShouldBeAnArray
			});
		}
		this.items = new Terrasoft.Collection();
		for (var i = 0, length = items.length; i < length; i++) {
			var item = items[i];
			this.addItem(item);
		}
	},

	/**
	 * Initializing the menu item
	 * @param  {Terrasoft.BaseMenuItem} item menu item - heir of class
	 * @protected
	 * @return {Terrasoft.BaseMenuItem}
	 */
	initItem: function(item) {
		var isItemInitialized = item instanceof Terrasoft.BaseMenuItem;
		item.parentMenu = this;
		if (!isItemInitialized) {
			var itemName = item.alternateClassName || item.className || "Terrasoft.MenuItem";
			item = Ext.create(itemName, item);
		}
		return item;
	},

	/**
	 * Initializing Scrolling Events
	 * @protected
	 */
	initScrollEvents: function() {
		if (this.scrollWrapEl) {
			this.scrollUpEl.on("click", this.onScrollButtonClick, this);
			this.scrollDownEl.on("click", this.onScrollButtonClick, this);
			this.wrapEl.on("mousewheel", this.onMouseWheel, this);
		}
	},

	/**
	 * Initializing DOM Events
	 * @override
	 */
	initDomEvents: function() {
		if (this.isRootMenu) {
			var document = Ext.getDoc();
			var focusEl = this.focusEl;
			document.on("mousedown", this.onDocumentMouseDown, this);
			focusEl.on("keydown", this.onKeyDown, this);
			focusEl.on("focus", function(event) {
				event.preventDefault();
			}, this);
		}
	},

	/**
	 * Clear the subscription to DOM events
	 * @override
	 */
	clearDomListeners: function() {
		this.wrapEl.un("keydown", this.onKeyDown, this);
		if (this.isRootMenu) {
			var focusEl = this.focusEl;
			Ext.getDoc().un("mousedown", this.onDocumentMouseDown, this);
			Ext.getDoc().un("keydown", this.onKeyDown, this);
			Ext.EventManager.removeAll(focusEl);
		}
		if (this.scrollWrapEl) {
			this.scrollUpEl.un("click", this.onScrollButtonClick, this);
			this.scrollDownEl.un("click", this.onScrollButtonClick, this);
			this.wrapEl.un("mousewheel", this.onMouseWheel, this);
		}
	},

	/**
	 * The handler of the keystroke, it signs the focus element, which is only in the root menu,
	 * correspondingly this method is signed only in the root menu.
	 * @protected
	 * @param  {Ext.EventObjectImpl} event event object
	 */
	onKeyDown: function(event) {
		var keyCode = event.keyCode;
		if (this.preventDefaultsKeys.indexOf(keyCode) !== -1) {
			event.preventDefault();
		}
		var activeMenu = this.getActiveMenu();
		activeMenu.navigate(keyCode);
	},

	/**
	 * Calculate the data for the template and update the selectors.
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		tplData.hasScrolling = false;
		tplData.loadingCaption = Terrasoft.Resources.Controls.Menu.Loading;
		tplData.isMenuLoading = this.isMenuLoading;
		tplData.items = this.items;
		tplData.needContent = true;
		tplData.isRootMenu = this.isRootMenu;
		tplData.renderContent = this.renderContent;
		var scrollWrapperClass = this.scrollWrapperClass
			? this.defaultScrollWrapperClass + " " + this.scrollWrapperClass
			: this.defaultScrollWrapperClass;
		var ulClass = this.ulClass ? this.defaultUlClass + " " + this.ulClass : this.defaultUlClass;
		tplData.scrollWrapperClass = scrollWrapperClass;
		tplData.ulClass = ulClass;
		this.updateSelectors(tplData);
		this.tplData = tplData;
		return tplData;
	},

	/**
	 * Update selectors based on the data generated to create the markup
	 * @protected
	 * @param {Object} tplData data object for the template, on which the markup will be built
	 */
	updateSelectors: function(tplData) {
		var selectors = this.selectors = this.selectors || {};
		selectors.ulEl = "#" + this.id + "-list";
		if (tplData.hasScrolling) {
			selectors.scrollWrapEl = "#" + this.id + "-scroll-wrap";
			selectors.scrollUpEl = "#" + this.id + "-scroll-up";
			selectors.scrollDownEl = "#" + this.id + "-scroll-down";
		} else {
			delete selectors.scrollWrapEl;
			delete selectors.scrollUpEl;
			delete selectors.scrollDownEl;
		}
		selectors.wrapEl = selectors.scrollWrapEl || selectors.ulEl;
		selectors.el = selectors.wrapEl;
		if (this.isRootMenu) {
			selectors.focusEl = "#" + this.id + "-focusEl";
		} else {
			delete selectors.focusEl;
		}
		return selectors;
	},

	/**
	 * Get the load display control.
	 * @protected
	 * @return {Terrasoft.BaseSpinner}
	 */
	getProgressSpinner: function() {
		if (Ext.isEmpty(this.progressSpinner)) {
			this.progressSpinner = Terrasoft.getSpinner("menu-progress");
		}
		return this.progressSpinner;
	},

	/**
	 * Generate the markup of menu items
	 * @protected
	 * @return {Array} markup of menu items
	 */
	getItemsHtml: function() {
		var items = this.items;
		var itemsHtml = [];
		items.each(function(item) {
			var html = item.generateHtml();
			itemsHtml.push(html);
		}, this);
		return itemsHtml;
	},

	/**
	 * Positioning the menu relative to the parent element.
	 * @protected
	 */
	adjustPosition: function() {
		var alignEl = this.parentEl;
		if (!alignEl) {
			return;
		}
		var wrapEl = this.getWrapEl();
		var alignElBox = alignEl.getBox();
		var wrapElBox = wrapEl.getBox();
		var body = Ext.getBody();
		var bodyViewSize = body.getViewSize();
		var scrollBarSize = Ext.getScrollbarSize();
		var wrapElRightBorderPosition = alignElBox.x + wrapElBox.width + scrollBarSize.width;
		var alignType = this.alignType;
		var offsetX = 0;
		if (Ext.isEmpty(alignType)) {
			alignType = this.defaultAlignType;
			if (wrapElRightBorderPosition > bodyViewSize.width) {
				offsetX = bodyViewSize.width - wrapElRightBorderPosition;
			}
		}
		var offset = this.offset || [offsetX, 3];
		wrapEl.alignTo(alignEl, alignType, offset, false, false);
	},

	/**
	 * @private
	 */
	_showAnimation: function() {
		var wrapEl = this.getWrapEl();
		wrapEl.setStyle("opacity", 1);
		if (Ext.isEmpty(this.progressSpinner)) {
			return;
		}
		this.progressSpinner.show();
	},

	/**
	 * After render event handler.
	 * @protected
	 * @param  {Terrasoft.Menu} component menu component
	 * @param  {HTMLElement} containerEl element of the DOM container
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.afterRenderOrRerender();
		this.adjustPosition();
		this.removeUnnecessarySeparators();
		this._showAnimation();
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.afterRenderOrRerender();
		this.adjustPosition();
		this.removeUnnecessarySeparators();
		this._showAnimation();
	},

	/**
	 * General logic after rendering and re-rendering
	 * @protected
	 */
	afterRenderOrRerender: function() {
		this.fixRendering();
		this.initScrollEvents();
		if (!this.isMenuLoading) {
			this.items.each(function(item) {
				if (item.visible) {
					item.fireEvent("afterrender", this, this.wrapEl);
				}
			}, this);
		}
		if (this.isRootMenu) {
			this.focusMenuTree();
		}
	},

	/**
	 * Method of removing unnecessary spacers after the rendering of the menu.
	 * @private
	 */
	removeUnnecessarySeparators: function() {
		var menuWrapEl = Ext.get(this.id + "-list");
		var listItemEls = menuWrapEl.select("li");
		var listItemElsCount = listItemEls.getCount();
		var removeItemEls = [];
		for (var i = 0; i < listItemElsCount; i += 1) {
			var currentItemEl = Ext.get(listItemEls.elements[i]);
			if (!currentItemEl || !currentItemEl.hasCls("menu-separator")) {
				continue;
			}
			var nextItemEl = Ext.get(listItemEls.elements[i + 1]);
			if (!nextItemEl) {
				removeItemEls.push(currentItemEl);
			} else if (!nextItemEl.hasCls("menu-separator")) {
				continue;
			}
			removeItemEls.push(currentItemEl);
		}
		listItemEls.removeElement(removeItemEls, true);
		var firstEl = menuWrapEl.child("li");
		if (firstEl && firstEl.hasCls("menu-separator")) {
			var firstElCaption = firstEl.dom.innerText || firstEl.dom.textContent;
			firstElCaption = Ext.String.trim(firstElCaption);
			if (firstElCaption.length) {
				firstEl.setHTML(firstElCaption);
				firstEl.addCls("menu-separator-first");
			} else {
				listItemEls.removeElement(firstEl, true);
			}
		}
	},

	/**
	 * Show menu - this builds a menu
	 * The box parameter contains the dimensions of the page area around which
	 * the menu should appear. An example of the object is {width: 0, height: 0, x: 0, y: 0, right: 0, bottom: 0}.
	 * This an object can be obtained from Ext.Element - a, someEl.getBox ();
	 * @param {Object} [box] Button box config.
	 * @param {Number} box.width is the width of the section around which the menu is displayed
	 * @param {Number} box.height -the height of the section around which the menu is displayed
	 * @param {Number} box.x - x coordinate of the upper left point of the section around which the menu is displayed
	 * @param {Number} box.y - y coordinate of the upper left point of the section around which the menu is displayed
	 * @param {Number} box.right - x coordinate of the bottom right of the section around which the menu is displayed
	 * @param {Number} box.bottom - y coordinate of the lower-right point of the section around which the menu is displayed
	 */
	show: function(box, isSubMenu, parentEl) {
		if (this.rendered === true && this.visible) {
			return;
		}
		if (isSubMenu) {
			this.isRootMenu = false;
		}
		this.setSelectedItem(null);
		this.isMenuLoading = false;
		this.buttonBox = box || this.buttonBox;
		this.parentEl = parentEl;
		if (this.fireEvent("prepareMenu", this) === false) {
			this.isMenuLoading = true;
			Ext.Function.defer(this.renderLoading, 300, this);
			return;
		}
		this.forceRender();
	},

	/**
	 * Hide the menu by deleting from the DOM
	 */
	hide: function() {
		if (this.rendered === false) {
			return;
		}
		var wrap = this.getWrapEl();
		Ext.EventManager.purgeElement(wrap);
		this.clearDomListeners();
		this.removeElementsBySelectors();
		this.rendered = false;
		this.fireEvent("hide", this);
		var selectedItem = this.selectedItem;
		if (!selectedItem) {
			return;
		}
		var subMenu = selectedItem.menu;
		if (subMenu) {
			subMenu.hide();
		}
	},

	/**
	 * Focus on the menu tree i.e. on the focus element of the root menu, in order to be able to receive input from the keyboard.

	 */
	focusMenuTree: function() {
		this.getRootMenu().focus();
	},

	/**
	 * Add menu item
	 * @param {Object} itemToAdd the heir of the Terrasoft.BaseMenuItem class, initialized or not
	 * @param {Number} index The index to insert, if not specified, inserts to the end
	 * @return {Terrasoft.BaseMenuItem} added menu item
	 */
	addItem: function(itemToAdd, index, preventRender) {
		var items = this.items;
		itemToAdd = this.initItem(itemToAdd);
		if (index || index === 0) {
			items.collection.insert(index, itemToAdd.id, itemToAdd);
		} else {
			items.add(itemToAdd.id, itemToAdd);
		}
		if (this.rendered && !preventRender) {
			itemToAdd.render(this.ulEl, index);
		}
		this.fireEvent("add", this, itemToAdd);
		itemToAdd.added();
		if (this.model) {
			this.bindItem(itemToAdd, this.model);
		}
		return itemToAdd;
	},

	/**
	 * Delete the menu item
	 * @param  {Terrasoft.BaseMenuItem} item menu item
	 */
	removeItem: function(item) {
		// TODO If we delete the 1st item, and the 2nd is the title, then the title should also be rebuilt. (Rare case)
		this.items.remove(item);
		item.destroy();
		this.fireEvent("remove", this, item);
	},

	/**
	 * Delete the menu item
	 * @param  {Number} index index of the menu item
	 */
	removeByIndex: function(index) {
		// TODO If we delete the 1st item, and the 2nd is the title, then the title should also be rebuilt. (Rare case)
		var item = this.getItemByIndex(index);
		this.removeItem(item);
	},

	/**
	 * Move menu item
	 * @param {Terrasoft.BaseMenuItem} item menu item
	 * @param {Number} index new index
	 * @throws Terrasoft.NullOrEmptyException
	 * The index is too large or too small
	 */
	moveItem: function(item, index) {
		var items = this.items;
		var count = items.getCount();
		if (index >= count || index < 0) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.Controls.Menu.IndexOutOfRange
			});
		}
		items.remove(item);
		items.add(item.id, item, index);
		if (this.rendered && this.visible) {
			this.reRender();
		}
	},

	/**
	 * Move the menu item upward
	 * @param {Terrasoft.BaseMenuItem} item menu item
	 * @throws Terrasoft.NullOrEmptyException
	 * The index is too large or too small
	 */
	moveUp: function(item) {
		var currentIndex = this.items.indexOf(item);
		var newIndex = currentIndex - 1;
		this.moveItem(item, newIndex);
	},

	/**
	 * Move the menu item downward
	 * @param {Terrasoft.BaseMenuItem} item menu item
	 * @throws Terrasoft.NullOrEmptyException
	 * The index is too large or too small
	 */
	moveDown: function(item) {
		var currentIndex = this.items.indexOf(item);
		var newIndex = currentIndex + 1;
		this.moveItem(item, newIndex);
	},

	/**
	 * Get the root menu, in the currently displayed menu
	 * @return {Terrasoft.Menu}
	 */
	getRootMenu: function() {
		return this.rootMenu || this;
	},

	/**
	 * Get menu item by index
	 * @param {Number} index index
	 * @throws {Terrasoft.NullOrEmptyException}
	 * There are no items in the menu
	 * @throws {Terrasoft.ItemNotFoundException}
	 * The menu does not contain an item with a given index
	 * @return {Terrasoft.BaseMenuItem} menu item
	 */
	getItemByIndex: function(index) {
		var items = this.items;
		if (!items) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.Controls.Menu.MenuHasNoItems
			});
		}
		if (index < 0 || index >= items.getCount()) {
			throw new Terrasoft.ItemNotFoundException({
				message: Terrasoft.Resources.Controls.Menu.IndexOutOfRange
			});
		}
		return items.getByIndex(index);
	},

	/**
	 * Select menu item
	 * @param {Terrasoft.BaseMenuItem} item menu item
	 */
	setSelectedItem: function(item) {
		var oldSelectedItem = this.selectedItem;
		if (oldSelectedItem === item) {
			return;
		}
		var selectedItem = this.selectedItem = item;
		if (selectedItem) {
			this.selectedItem.applyMenuSelection(this);
		}
		if (oldSelectedItem) {
			var oldSubMenu = oldSelectedItem.menu;
			if (selectedItem && oldSelectedItem.menu) {
				oldSubMenu.hide();
			}
			oldSelectedItem.applyMenuDeselection(this);
		}
	},

	/**
	 * Select menu item
	 * @param {Number} index  Menu item index
	 */
	setSelectedItemByIndex: function(index) {
		var item = this.getItemByIndex(index);
		this.setSelectedItem(item);

	},

	/**
	 * Scroll the menu
	 * @param  {Number} delta the offset value of the scrolling.
	 * If it is positive, then the direction of the scrolling up.
	 */
	scroll: function(delta) {
		var ulEl = this.ulEl;
		var scrollWrapEl = this.scrollWrapEl;
		var currentTop = Number(ulEl.dom.style.top.replace("px", ""));
		var isUpDirection = delta > 0;
		var yDelta = Math.abs(delta);
		var maxTop = 0 + this.scrollUpEl.getHeight();
		var maxBottom = -1 * ((ulEl.getHeight() - scrollWrapEl.getHeight()) + this.scrollDownEl.getHeight());
		var newTopValue = isUpDirection ? currentTop + yDelta : currentTop - yDelta;
		if (isUpDirection && newTopValue > maxTop) {
			newTopValue = maxTop;
		} else if (!isUpDirection && newTopValue < maxBottom) {
			newTopValue = maxBottom;
		}
		if (newTopValue !== currentTop) {
			ulEl.setStyle({
				top: newTopValue + "px"
			});
		}
		this.setScrollButtonVisibility(this.scrollUpEl, this.canScrollUp());
		this.setScrollButtonVisibility(this.scrollDownEl, this.canScrollDown());
	},

	/**
	 * Scroll the menu till the menu item
	 * @param {Terrasoft.BaseMenuItem} item menu item
	 */
	scrollToItem: function(item) {
		var scrollWrapEl = this.scrollWrapEl;
		if (!scrollWrapEl) {
			return false;
		}
		var scrollUpEl = this.scrollUpEl;
		var scrollDownEl = this.scrollDownEl;
		var itemWrapEl = item.wrapEl;
		var upBorder = scrollUpEl.getBottom();
		var downBorder = scrollDownEl.getTop();
		var itemTop = itemWrapEl.getTop();
		var itemBottom = itemWrapEl.getBottom();
		var needScrollUp = (itemBottom > downBorder && itemTop > upBorder);
		var needScrollDown = (itemTop < upBorder && itemBottom < downBorder);
		if ((needScrollUp || needScrollDown)) {
			this.scroll(needScrollUp ? (downBorder - itemBottom) : (upBorder - itemTop));
		}
	},

	/**
	 * Delete the menu and release all resources.
	 * @override
	 */
	onDestroy: function() {
		var progressSpinner = this.progressSpinner;
		if (progressSpinner) {
			progressSpinner.destroy();
		}
		var items = this.items;
		if (items) {
			items.each(function(item) {
				item.destroy();
			}, this);
			items.destroy();
			delete this.items;
		}
		this.callParent(arguments);
	},

	/**
	 * Bind all the elements to the model
	 * @override
	 * @param {Terrasoft.data.modules.BaseViewModel} model Data model
	 */
	bind: function() {
		this.callParent(arguments);
		this.items.each(function(item) {
			this.bindItem(item, this.model);
		}, this);
	},

	/**
	 * Bind all the elements to the model
	 * @private
	 * @param {Terrasoft.BaseMenuItem} item menu item
	 * @param {Terrasoft.data.modules.BaseViewModel} model Data model
	 */
	bindItem: function(item, model) {
		if (!item.model) {
			item.bind(model);
		}
	},

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 * @protected
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var menuBindConfig = {
			items: {
				changeMethod: "onCollectionDataLoaded"
			}
		};
		Ext.apply(menuBindConfig, bindConfig);
		return menuBindConfig;
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
	 * @protected
	 */
	subscribeForCollectionEvents: function(binding, property, model) {
		var collection = model.get(binding.modelItem);
		this.subscribeCollection(collection);
	},

	/**
	 * Subscription to events for a collection of menu items
	 * @private
	 * @param {Terrasoft.data.model.BaseViewModelCollection} collection collection of elements
	 */
	subscribeCollection: function(collection) {
		collection.on("dataLoaded", this.onCollectionDataLoaded, this);
		collection.on("itemChanged", this.onUpdateItem, this);
		collection.on("add", this.onAddItem, this);
		collection.on("remove", this.onDeleteItem, this);
		collection.on("clear", this.clearItems, this);
		collection.each(function(item) {
			var itemsCollection = item.get(this.defaultItemsName);
			if (itemsCollection instanceof Terrasoft.BaseViewModelCollection) {
				this.subscribeCollection(itemsCollection);
			}
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
	 * @protected
	 */
	unSubscribeForCollectionEvents: function(binding, property, model) {
		if (!model) {
			return;
		}
		var collection = model.get(binding.modelItem);
		this.unSubscribeCollection(collection);
	},

	/**
	 * Unsubscribe from events for a collection of menu items
	 * @private
	 * @param {Terrasoft.data.model.BaseViewModelCollection} collection collection of elements
	 */
	unSubscribeCollection: function(collection) {
		collection.un("dataLoaded", this.onCollectionDataLoaded, this);
		collection.un("itemChanged", this.onUpdateItem, this);
		collection.un("add", this.onAddItem, this);
		collection.un("remove", this.onDeleteItem, this);
		collection.un("clear", this.clearItems, this);
		collection.each(function(item) {
			var itemsCollection = item.get(this.defaultItemsName);
			if (itemsCollection instanceof Terrasoft.BaseViewModelCollection) {
				this.unSubscribeCollection(itemsCollection);
			}
		}, this);
	},

	/**
	 * The 'dataLoaded' event handler for the Terrasoft.Collection
	 * @protected
	 * @param {Terrasoft.Collection} collection
	 */
	onCollectionDataLoaded: function(collection) {
		this.clearItems();
		if (collection) {
			collection.each(function(itemModel) {
				this.onAddItem(itemModel);
			}, this);
		}
	},

	/**
	 * The 'itemChanged' event handler for the Terrasoft.Collection
	 * @protected
	 * @param {Terrasoft.BaseViewModel} itemModel
	 */
	onUpdateItem: function(itemModel) {
		var id = itemModel.get(this.defaultPrimaryColumnName);
		var menuItem = this.items.get(id);
		var index = this.items.indexOf(menuItem);
		this.removeItem(menuItem);
		var newItemConfig = this.getMenuItemConfig(itemModel);
		this.addItem(newItemConfig, index);
	},

	/**
	 * The 'add' event handler for the Terrasoft.Collection
	 * @protected
	 * @param {Terrasoft.BaseViewModel} itemModel
	 */
	onAddItem: function(itemModel) {
		var newItemConfig = this.getMenuItemConfig(itemModel);
		this.addItem(newItemConfig);
	},

	/**
	 * The 'remove' event handler of the Terrasoft.Collection
	 * @protected
	 * @param {Terrasoft.model.BaseViewModel} itemModel
	 */
	onDeleteItem: function(itemModel) {
		var id = itemModel.get(this.defaultPrimaryColumnName);
		var menuItem = this.items.get(id);
		this.removeItem(menuItem);
	},

	/**
	 * The 'clear' event handler for the Terrasoft.Collection
	 * @protected
	 */
	clearItems: function() {
		if (this.items) {
			this.items.each(function(menuItem) {
				this.removeItem(menuItem);
			}, this);
		}
	},

	/**
	 * Getting the config menu item by its model
	 * @protected
	 * @param {Terrasoft.model.BaseViewModel} itemModel
	 */
	getMenuItemConfig: function(itemModel) {
		var itemId = itemModel.get(this.defaultPrimaryColumnName);
		if (Ext.isEmpty(itemId)) {
			this.log(Terrasoft.Resources.Controls.Menu.MenuPrimaryColumnIsEmpty, Terrasoft.LogMessageType.WARNING);
		}
		var visible = itemModel.get(this.defaultVisibleName);
		var enabled = itemModel.get(this.defaultEnabledName);
		var menuItemConfig = {
			id: itemId,
			caption: itemModel.get(this.defaultCaptionName),
			imageConfig: itemModel.get(this.defaultImageConfigName),
			className: itemModel.get(this.defaultTypeName),
			tag: itemModel.get(this.defaultTagName),
			visible: Ext.isEmpty(visible) ? true : visible,
			enabled: Ext.isEmpty(enabled) ? true : enabled,
			markerValue: itemModel.get(this.defaultMarkerValueName),
			direction: itemModel.get(this.defaultDirectionName)
		};
		var clickHandler = itemModel.get(this.defaultClickEventName);
		var canExecuteHandler = itemModel.get(this.defaultCanExecuteName);
		if (clickHandler) {
			menuItemConfig.click = clickHandler;
		}
		if (canExecuteHandler) {
			menuItemConfig[this.defaultCanExecuteName] = canExecuteHandler;
		}
		var menuItems = itemModel.get(this.defaultItemsName);
		if (menuItems) {
			var bindConfig = this.getBindConfig();
			var binding = this.initBinding("items", menuItems, bindConfig);
			if (binding && binding.modelItem) {
				menuItemConfig.menu = {
					items: menuItems
				};
			} else {
				menuItemConfig.menu = {
					items: this.getMenuConfig(menuItems)
				};
			}
		}
		return menuItemConfig;
	},

	/**
	 * Getting the config submenu from the collection of elements
	 * @protected
	 * @param {Terrasoft.data.model.BaseViewModelCollection} items
	 */
	getMenuConfig: function(items) {
		var menuConfig = [];
		items.each(function(item) {
			menuConfig.push(this.getMenuItemConfig(item));
		}, this);
		return menuConfig;
	}

});
