/**
 * Implements functions for rendering and work with SideBar panel.
 * Example:
 *
 *      var sideBar = Ext.create("Terrasoft.SideBar", {
 *          items: [
 *              {
 *                  caption: "some caption",
 *                  tag: 'someTag',
 *                  imageUrl: "http://website.com/image.png",
 *                  href: "http://google.com"
 *              }
 *          ],
 *          selectedItemIndex: 0,
 *          collapsed: {
 *              bindTo: "Collapsed"
 *          },
 *          itemSelected: {
 *              bindTo: "someFunction
 *          },
 *          tips: [
 *              {
 *                  tip: {
 *                      content: "some content",
 *                      displayMode: "narrow",
 *                      tag: "someTag",
 *                      markerValue: "some marker value"
 *                  },
 *                  settings: {
 *                      alignEl: "getItemImageEl"
 *                  }
 *              }
 *          ]
 *      });
 *
 */
Ext.define("Terrasoft.controls.SideBar", {
	alternateClassName: "Terrasoft.SideBar",
	extend: "Terrasoft.Component",

	statics: {
		/**
		 * Stylesheet id.
		 * @type {String}
		 */
		styleSheetId: null,

		/**
		 * Default css values.
		 * @type {Object}
		 */
		css: {
			bgColor: "#4d5a75",
			fontColor: "#ffffff",
			selectedFontColor: "#ffffff",
			selectedBgColor: "#f49d57"
		},

		/**
		 * Default styles.
		 * @type {Array}
		 */
		styles: [
			".ts-sidebar-list > li, .ts-sidebar-item-text-hint {color: @SectionPanelFontColor;}",
			".ts-sidebar-list > li.ts-sidebar-selected-item,.ts-sidebar-item-text-hint",
			" {color: @SectionPanelSelectedFontColor;}",
			".ts-sidebar-list > li .ts-sidebar-spacer,.ts-sidebar-list,.left-panel",
			" {background-color: @SectionPanelBackgroundColor;}",
			".sectionPanelBackgroundColor > * {background-color: @SectionPanelBackgroundColor;}",
			".ts-sidebar-list > li.ts-sidebar-selected-item .vertical-strip,",
			".ts-sidebar-list > li.ts-sidebar-selected-item .ts-sidebar-spacer,",
			".ts-sidebar-item-text-hint",
			" {background-color: @SectionPanelSelectedBackgroundColor;}",
			".ts-sidebar-list[collapsed='false'] > li.ts-sidebar-selected-item,",
			".ts-sidebar-list[collapsed='false'] .ts-sidebar-item-wrapper:hover",
			" {background-color: @SelectedOpacityBgColor;}",
			".ts-sidebar-list[collapsed='true'] > li.ts-sidebar-selected-item",
			" {background-color: @SectionPanelSelectedBackgroundColor;}",
			".ts-sidebar-list[collapsed='true'] li:not(.ts-sidebar-selected-item) .ts-sidebar-item-wrapper:hover",
			" {background-color: rgba(@CollapsedHoverBgColor, 0.5);}",
		],

		/**
		 * Generates style sheets. Background and text color.
		 */
		generateStyleSheet: function() {
			if (Terrasoft.controls.SideBar.styleSheetId) {
				Terrasoft.removeStyleSheet(Terrasoft.controls.SideBar.styleSheetId);
			}
			const rules = this._getStyleSheetRule();
			Terrasoft.controls.SideBar.styleSheetId = Terrasoft.randomString();
			Terrasoft.createStyleSheet(rules, Terrasoft.controls.SideBar.styleSheetId);
		},

		/**
		 * @private
		 * @return {String}
		 */
		_getStyleSheetRule: function() {
			const css = Terrasoft.controls.SideBar.css;
			const less = Terrasoft.Resources.LessConstants;
			const fontColor = this._getAvailableColor(less.SectionPanelFontColor, css.fontColor);
			const selectedFontColor = this._getAvailableColor(less.SectionPanelSelectedFontColor, css.selectedFontColor);
			const selectedBgColor =
				this._getAvailableColor(less.SectionPanelSelectedBackgroundColor, css.selectedBgColor);
			const bgColor = this._getAvailableColor(less.SectionPanelBackgroundColor, css.bgColor);
			const selectedOpacityBgColor = Terrasoft.getColorHue(bgColor, -18);
			const collapsedHoverBgColor = Terrasoft.hex2rgb(selectedBgColor);
			let styles = Terrasoft.controls.SideBar.styles.join("");
			styles = styles.replace(/@SectionPanelFontColor/g, fontColor);
			styles = styles.replace(/@SectionPanelSelectedFontColor/g, selectedFontColor);
			styles = styles.replace(/@SectionPanelBackgroundColor/g, bgColor);
			styles = styles.replace(/@SectionPanelSelectedBackgroundColor/g, selectedBgColor);
			styles = styles.replace(/@SelectedOpacityBgColor/g, selectedOpacityBgColor);
			styles = styles.replace(/@CollapsedHoverBgColor/g, collapsedHoverBgColor);
			return styles;
		},

		/**
		 * @private
		 * @return {String} Available color.
		 */
		_getAvailableColor: function(mainColor, defaultColor) {
			return Terrasoft.isHexValue(mainColor) ? mainColor : defaultColor;
		}
	},

	itemTplMap: [
		"caption",
		"imageUrl",
		"href",
		"domAttributes"
	],

	/**
	 * @inheritdoc Terrasoft.controls.Component#tpl
	 */
	tpl: [
		"<ul id=\"{id}-wrap\" class=\"ts-sidebar-list ts-box-sizing\"" +
		" style=\"{wrapStyle}\">",
		"{%this.renderItems(out, values)%}",
		"</ul>"
	],

	/**
	 * Template for side bar item.
	 * @protected
	 * @type {String[]}
	 */
	itemTpl: [
		"<tpl if=\"visible != false\">",
		"<li data-item-index=\"{itemIndex}\"",
		"<tpl if=\"isSelected == true\">",
		"class=\"ts-sidebar-selected-item\"",
		"</tpl>",
		">",
		"<span class=\"vertical-strip\"></span>",
		"<tpl if=\"href\"><a target=\"_self\" class=\"sidebar-item-link\" href=\"{href}\"></tpl>",
		"<div id=\"sidebar-item-wrapper-{itemIndex}\" class=\"ts-sidebar-item-wrapper\">",
		"<div id=\"sidebar-item-image-{itemIndex}\" class=\"ts-sidebar-item-image\" data-item-marker=\"{caption}\" " +
		"style=\"background-image:url({imageUrl})\" <tpl foreach=\"domAttributes\">{$}=\"{.}\"</tpl>></div>",
		"<div id=\"sidebar-item-text-{itemIndex}\" class=\"ts-sidebar-item-text\"> {caption} ",
		"</div>",
		"</div>",
		"<tpl if=\"href\"></a></tpl>",
		"</li>",
		"</tpl>"
	],

	/**
	 * Template for side bar item content.
	 * @protected
	 * @type {String[]}
	 */
	itemContextTpl: [
		"<tpl if=\"visible != false\">",
		"{caption}",
		"</tpl>"
	],

	/**
	 * Template for hint item.
	 * @protected
	 * @type {String[]}
	 */
	captionHintTpl: [
		"<div id=\"sidebar-item-text-{itemIndex}-hint\" class=\"ts-sidebar-item-text-hint\"> {caption}",
		" </div>"
	],

	/**
	 * List of side bar items.
	 * @private
	 * @param {String} items.caption Caption of side bar item.
	 * @param {String} items.tag Item tag.
	 * @param {Boolean} items.visible Is item visible flag.
	 * @type {Array}
	 */
	items: null,

	/**
	 * Selected side bar item. Number of menu item is equals to index of {@link #items}.
	 * The numbering starts with zero.
	 * @private
	 * @type {Number}
	 */
	selectedItemIndex: -1,

	/**
	 * Max width of element.
	 * @type {String}
	 */
	maxWidth: "",

	/**
	 * Min width of element.
	 * @type {String}
	 */
	minWidth: "",

	/**
	 * Side bar state.
	 * @type {Boolean}
	 */
	collapsed: false,

	/**
	 * Css-class name for collapsed item hint.
	 * @protected
	 * @type {String}
	 */
	hintOpacityClass: "ts-sidebar-item-text-hint-opacity",

	/**
	 * @inheritdoc Terrasoft.controls.Component#init
	 * @override
	 */
	init: function() {
		Terrasoft.controls.SideBar.generateStyleSheet();
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event
			 * Event to change the selection of a new menu item.
			 * Called when you click on a new menu item.
			 * @param {Number} selectedItemIndex The number of the selected item.
			 * @param {String} tag
			 */
			"itemSelected"
		);
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#getTplData
	 * @override
	 */
	getTplData: function() {
		const tplData = this.callParent(arguments);
		tplData.renderItems = this.renderItems;
		tplData.collapsed = this.collapsed;
		this.styles = this.getStyles();
		this.selectors = {
			wrapEl: "#" + this.id + "-wrap"
		};
		return tplData;
	},

	/**
	 * Returns styles for building element template.
	 * @protected
	 * @return {Object} Config object with css-styles.
	 */
	getStyles: function() {
		var styles = {};
		var wrapStyle = styles.wrapStyle = {};
		var maxWidth = this.maxWidth;
		var minWidth = this.minWidth;
		if (maxWidth) {
			wrapStyle.maxWidth = maxWidth;
		}
		if (minWidth) {
			wrapStyle.minWidth = minWidth;
		}
		return styles;
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#initDomEvents
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		var wrapEl = this.getWrapEl();
		wrapEl.on("click", this.onMenuClick, this);
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#clearDomListeners
	 * @override
	 */
	clearDomListeners: function() {
		this.wrapEl.un("click", this.onMenuClick, this);
		this.callParent(arguments);
	},

	/**
	 * Subscribes for mouse events on each item in sidebar.
	 * @private
	 * @param {Object} item Sidebar item.
	 * @param {Number} itemIndex Index of item.
	 */
	initItemEvents: function(item, itemIndex) {
		var itemImageElSelector = Ext.String.format("#sidebar-item-wrapper-{0}", itemIndex);
		var wrapEl = this.getWrapEl();
		var itemImageEl = wrapEl.down(itemImageElSelector);
		if (itemImageEl) {
			itemImageEl.on("mouseenter", this.onMouseEnter, this);
			itemImageEl.on("mouseleave", this.onMouseLeave, this);
		}
	},

	/**
	 * Unsubscribes for mouse events on each item in sidebar.
	 * @private
	 * @param {Object} item Sidebar item.
	 * @param {Number} itemIndex Index of item.
	 */
	clearItemEvents: function(item, itemIndex) {
		var itemImageElSelector = Ext.String.format("#sidebar-item-wrapper-{0}", itemIndex);
		var wrapEl = this.getWrapEl();
		var itemImageEl = wrapEl.down(itemImageElSelector);
		if (itemImageEl) {
			itemImageEl.un("mouseenter", this.onMouseEnter, this);
			itemImageEl.un("mouseleave", this.onMouseLeave, this);
		}
	},

	/**
	 * Handler for menu item click.
	 * If selected new item, changes it's style and fires event {@link #itemSelected}.
	 * @protected
	 * @param {Object} e Menu item click event.
	 * @param {HTMLElement} el Menu item click element.
	 */
	onMenuClick: function(e, el) {
		if (e.ctrlKey) {
			return;
		}
		var element = this.getParentElement("LI", el);
		if (element) {
			var canExecute = this.canExecute({
				method: this.onMenuClick,
				args: arguments
			});
			if (canExecute === false) {
				return;
			}
			var selectedItemIndex = element.getAttribute("data-item-index");
			selectedItemIndex = parseInt(selectedItemIndex, 10);
			if (this.selectedItemIndex !== selectedItemIndex) {
				this.setSelectedItem(selectedItemIndex);
			}
			var tag = this.items[selectedItemIndex].tag;
			this.fireEvent("itemSelected", selectedItemIndex, tag);
		}
	},

	/**
	 * Handler for 'mouseenter' event on sidebar image element.
	 * When {@link #collapsed} is collapsed, renders item hint text element near the current item.
	 * @protected
	 * @param {Event} e Mouseenter event.
	 */
	onMouseEnter: function(e) {
		if (!this.collapsed) {
			return;
		}
		this.showCaptionHint(e);
	},

	/**
	 * Handler for 'mouseleave' event on sidebar image element.
	 * When {@link #collapsed} is collapsed, removes rendered item hint text element.
	 * @protected
	 * @param {Event} e Mouseleave event.
	 */
	onMouseLeave: function(e) {
		if (!this.collapsed) {
			return;
		}
		this.hideCaptionHint(e);
	},

	/**
	 * Returns parent dom element.
	 * @private
	 * @param {String} selector Selector for find.
	 * @param {HTMLElement} target Target element where to find.
	 * @return {HTMLElement} Founded element.
	 */
	getParentElement: function(selector, target) {
		var element = Ext.get(target);
		var wrapEl = this.getWrapEl();
		return element.findParent(selector, wrapEl, true);
	},

	/**
	 * Shows sidebar item hint element.
	 * @protected
	 * @param {Event} e Browser event.
	 */
	showCaptionHint: function(e) {
		var element = this.getParentElement("LI", e.target);
		if (!element) {
			return;
		}
		var hoverItemIndex = element.getAttribute("data-item-index");
		hoverItemIndex = parseInt(hoverItemIndex, 10);
		var item = this.getItemConfig(hoverItemIndex);
		var tplData = {
			caption: item.caption,
			itemIndex: hoverItemIndex
		};
		var html = this.generateItemHtml(tplData, this.captionHintTpl);
		var body = Ext.getBody();
		var appendEl = Ext.DomHelper.append(body, html);
		this.setElPosition(e, appendEl);
	},

	/**
	 * Sets position for sidebar item hint element.
	 * @private
	 * @param {Event} e Browser event.
	 * @param {HTMLElement} element Element for positioning.
	 */
	setElPosition: function(e, element) {
		var targetEl = Ext.get(e.target);
		var el = Ext.get(element);
		var targetElBox = targetEl.getBox();
		el.setStyle({
			left: targetElBox.left + targetElBox.right + "px",
			top: targetElBox.top + "px"
		});
		el.addCls(this.hintOpacityClass);
	},

	/**
	 * Removes sidebar item hint element.
	 * @protected
	 * @param {Event} e Browser event.
	 */
	hideCaptionHint: function(e) {
		var element = this.getParentElement("LI", e.target);
		if (!element) {
			return;
		}
		var hoverItemIndex = element.getAttribute("data-item-index");
		hoverItemIndex = parseInt(hoverItemIndex, 10);
		this.removeHintEl(hoverItemIndex);
	},

	/**
	 * Removes hint element.
	 * @private
	 * @param {Number} index Index of element.
	 */
	removeHintEl: function(index) {
		var elTpl = Ext.String.format("#sidebar-item-text-{0}-hint", index);
		var el = Ext.get(Ext.DomQuery.selectNode(elTpl));
		if (el) {
			el.remove();
		}
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.items.forEach(function(item, index) {
			this.removeHintEl(index);
		}, this);
		this.callParent(arguments);
	},

	/**
	 * Generates HTML-markup for all items, when renders by default tpl.
	 * @protected
	 * @return {String[]} HTML-markup.
	 */
	getItemsRenderTemplateTree: function() {
		var items = this.items;
		var itemsTree = [];
		var selectedItemIndex = this.selectedItemIndex;
		var item, itemTplConfig, html, isSelected;
		for (var i = 0, length = items.length; i < length; i++) {
			item = items[i];
			isSelected = (selectedItemIndex === i);
			itemTplConfig = this.generateItemTplConfig(item, i, isSelected);
			html = this.generateItemHtml(itemTplConfig);
			itemsTree.push(html);
		}
		return itemsTree;
	},

	/**
	 * Creates config for building HTML-markup of the menu item.
	 * @protected
	 * @param {Object} itemConfig Menu item config.
	 * @param {Number} itemIndex  Menu item index.
	 * @param {Boolean} isSelected Is menu item selected flag.
	 * @return {Object} Config object for building HTML-markup.
	 */
	generateItemTplConfig: function(itemConfig, itemIndex, isSelected) {
		var itemTplData = this._getItemTplData(itemConfig);
		itemTplData.visible = itemConfig.visible;
		itemTplData.itemIndex = itemIndex;
		itemTplData.isSelected = isSelected;
		return itemTplData;
	},

	/**
	 * Gets tpl data of the menu item.
	 * @private
	 * @param {Object} itemConfig Menu item config.
	 * @return {Object} Tpl data of the menu item.
	 */
	_getItemTplData: function(itemConfig) {
		var itemTplData = {};
		var itemTplMap = this.itemTplMap;
		for (var i = 0, length = itemTplMap.length; i < length; i++) {
			var property = itemTplMap[i];
			var propertyValue = itemConfig[property];
			propertyValue = Ext.isObject(propertyValue)
				? Terrasoft.encodeHtmlObjectValues(propertyValue)
				: Terrasoft.encodeHtml(propertyValue);
			itemTplData[property] = propertyValue;
		}
		return itemTplData;
	},

	/**
	 * Renders side bar items. Uses in {@link #tpl}.
	 * @protected
	 * @param {String[]} buffer Buffer for generating HTML.
	 * @param {Object} renderData Config object for building tpl.
	 */
	renderItems: function(buffer, renderData) {
		var self = renderData.self;
		var itemsTree = self.getItemsRenderTemplateTree();
		Ext.DomHelper.generateMarkup(itemsTree, buffer);
	},

	/**
	 * Generates HTML-markup for side bar item.
	 * @protected
	 * @param {Object} tplData Config for building HTML-markup.
	 * @param {String[]} [itemTpl] Template for building HTML-markup, by defaults equals to {@link #itemTpl}.
	 */
	generateItemHtml: function(tplData, itemTpl) {
		itemTpl = itemTpl || this.itemTpl;
		var tpl = new Ext.XTemplate(itemTpl);
		return tpl.apply(tplData);
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		const wrapEl = this.getWrapEl();
		wrapEl.unselectable();
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		var wrapEl = this.getWrapEl();
		wrapEl.unselectable();
	},

	/**
	 * Updates side bar items config.
	 * @param  {Object[]} items Array of new side bar items.
	 */
	updateItems: function(items) {
		this.items = Ext.Object.merge([], items);
		this.safeRerender();
	},

	/**
	 * Updates side bar menu item.
	 * @param  {Number} itemIndex  Index of the item.
	 * @param  {Object} itemConfig Config object for item.
	 */
	updateItem: function(itemIndex, itemConfig) {
		var items = this.items;
		var length = items.length;
		if ((itemIndex > length) || (itemIndex < 0)) {
			return;
		}
		Ext.Object.merge(items[itemIndex], itemConfig);
		this.safeRerender();
	},

	/**
	 * Sets selected side bar item.
	 * @param {Number} itemIndex Index of new selected item.
	 */
	setSelectedItem: function(itemIndex) {
		var maxIndex = this.items.length;
		if (this.selectedItemIndex === itemIndex || itemIndex < 0 || itemIndex > maxIndex) {
			return;
		}
		this.selectedItemIndex = itemIndex;
		var oldSelectedItemIndex = Ext.query(".ts-sidebar-selected-item")[0];
		var newSelectedItemIndex = Ext.query("li[data-item-index='" + itemIndex + "']")[0];
		var domUtils = Terrasoft.utils.dom;
		if (oldSelectedItemIndex) {
			domUtils.removeClassName(oldSelectedItemIndex, "ts-sidebar-selected-item");
		}
		if (newSelectedItemIndex) {
			domUtils.addClassName(newSelectedItemIndex, "ts-sidebar-selected-item");
		}
	},

	/**
	 * Sets min or max width of the element.
	 * @param {String} width  New width.
	 * @param {String} prefix Prefix which equals 'min' for min width and 'max' for max width.
	 */
	setMinMaxWidth: function(width, prefix) {
		var suffix = "Width";
		var widthName = prefix + suffix;
		var currentWidth = this[widthName];
		if (currentWidth === undefined || currentWidth === width) {
			return;
		}
		this[widthName] = width;
		if (this.rendered) {
			var el = this.getWrapEl();
			el.dom.style[widthName] = width;
		}
	},

	/**
	 * Returns index of the selected item.
	 * @return {Number} Index of the selected item.
	 */
	getSelectedItemIndex: function() {
		return this.selectedItemIndex;
	},

	/**
	 * Returns object config of the element with itemIndex.
	 * @param {Number} itemIndex Index of the element.
	 * @return {Object} Config object with index itemIndex.
	 */
	getItemConfig: function(itemIndex) {
		if (itemIndex < 0) {
			return null;
		}
		return this.items[itemIndex];
	},

	/**
	 * Returns list of objects with sidebar item configs.
	 * @return {Array} List of objects.
	 */
	getItems: function() {
		return Terrasoft.deepClone(this.items);
	},

	/**
	 * Returns Ext.Element for menu item by tag.
	 * @param {String} tag Tag of the menu item.
	 * @return {Ext.dom.Element} Menu item element.
	 */
	getItemImageEl: function(tag) {
		var items = this.items;
		var itemIndex;
		for (var i in items) {
			var item = items[i];
			if (item.tag === tag) {
				itemIndex = i;
				break;
			}
		}
		var itemImageEl = null;
		if (Ext.isDefined(itemIndex)) {
			var itemImageElSelector = Ext.String.format("#sidebar-item-image-{0}", itemIndex);
			var wrapEl = this.getWrapEl();
			itemImageEl = wrapEl.down(itemImageElSelector);
		}
		return itemImageEl;
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		var binding = this.callParent(arguments);
		var sideBarBindings = {
			collapsed: {
				changeMethod: "setCollapsed"
			}
		};
		Ext.apply(sideBarBindings, binding);
		return sideBarBindings;
	},

	/**
	 * Collapsed change handler.
	 * @param {Boolean} collapsed Property value.
	 */
	setCollapsed: function(collapsed) {
		if (this.collapsed === collapsed) {
			return;
		}
		this.collapsed = collapsed;
	}
});
