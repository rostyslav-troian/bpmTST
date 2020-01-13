/**
 *  Class for working with tabs.
 */
Ext.define("Terrasoft.controls.TabPanel", {
	alternateClassName: "Terrasoft.TabPanel",
	extend: "Terrasoft.Container",

	// region Properties: Private

	/**
	 * Resize observer of the wrap items dom element.
	 * @private
	 * @type {ResizeObserver}
	 */
	_itemsElResizeObserver: null,

	/**
	 * @private
	 */
	_styleSheetId: null,

	/**
	 * Tab displacement index
	 * @private
	 * @type {Number}
	 */
	scrollIndex: 0,

	/**
	 * Initial margin left of the first tab.
	 * @protected
	 * @type {Number}
	 */
	_initialMarginLeft: 0,

	// endregion

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.component#tpl
	 * @override
	 */
	tpl: [
		"<div id=\"{id}-wrap\" class=\"{wrapClass}\">",
		"<div id=\"{id}-items-wrap\" class=\"ts-tabpanel-wrap\">",
		"<tpl if=\"isScrollVisible\">",
		"<div id=\"{id}-scroll-left\" class=\"{scrollLeftClass}\"></div>",
		"</tpl>",
		"<ul id=\"{id}-tabpanel-items\"  style=\"{ulCustomStyle}\" " +
		"class=\"ts-tabpanel-items {scrollAnimationClass} {ulCustomClass}\">",
		"{%this.renderTabs(out, values)%}",
		"</ul>",
		"<tpl if=\"isScrollVisible\">",
		"<div id=\"{id}-scroll-right\" class=\"{scrollRightClass}\"></div>",
		"</tpl>",
		"</div>",
		"<div id=\"{id}-tools\" class=\"ts-tabpanel-tools\">",
		"{%this.renderItems(out, values)%}",
		"</div>",
		"<tpl if=\"isCollapseButtonVisible\">",
		"<div id=\"{id}-collapse-button\" class=\"ts-tabpanel-collapse-button\"></div>",
		"</tpl>",
		"</div>"
	],

	/**
	 * {@link Ext.XTemplate Template} for drawing the tab.
	 * @protected
	 * @type {String[]}
	 */
	tabTpl: [
		"<tpl if=\"visible\">",
		"<li data-item-index=\"{index}\" class=\"ts-box-sizing {wrapClass}\" style=\"{customItemStyle}\"",
		"<tpl if=\"markerValue\">",
		" data-item-marker=\"{markerValue}\"",
		"</tpl>",
		"<tpl if=\"direction\"> dir=\"{direction}\"</tpl>",
		">{caption}</li>",
		"</tpl>"
	],

	/**
	 * Align left class name.
	 * @protected
	 * @type {String}
	 */
	alignLeftClassName: "ts-tab-align-left",

	/**
	 * Align right class name.
	 * @protected
	 * @type {String}
	 */
	alignRightClassName: "ts-tab-align-right",

	/**
	 * Scroll left button class.
	 * @protected
	 * @type {String}
	 */
	scrollLeftClass: "ts-tabpanel-scroll-left",

	/**
	 * Scroll right button class.
	 * @protected
	 * @type {String}
	 */
	scrollRightClass: "ts-tabpanel-scroll-right",

	/**
	 * Class name of scroll animation tabs.
	 * @protected
	 * @type {String}
	 */
	scrollAnimationClass: "scroll-animation",

	/**
	 * Name of the tag tab element.
	 * @protected
	 * @type {String}
	 */
	tabTagName: "li",

	/**
	 * Selector of the tab index element.
	 * @protected
	 * @type {String}
	 */
	tabIndexElementSelector: "li[data-item-index='{0}']",

	// endregion

	// region Properties: Public

	/**
	 * Name of the active tab.
	 * @type {String}
	 */
	activeTabName: null,

	/**
	 * Collection of tabs.
	 * @type {Terrasoft.BaseViewModelCollection}
	 */
	tabs: null,

	/**
	 * Show Scroll-elements.
	 * @type {Boolean}
	 */
	isScrollVisible: true,

	/**
	 * Collapsed state of tabpanel.
	 * @type {Boolean}
	 */
	collapsed: false,

	/**
	 * Is collapse button visible.
	 * @type {Boolean}
	 */
	isCollapseButtonVisible: false,

	/**
	 * Name of the CSS class for the control in collapsed state.
	 * @type {String}
	 */
	collapsedClass: "ts-tabpanel-collapsed",

	/**
	 * Name of the column that is the source of the tab name.
	 * @type {String}
	 */
	defaultPrimaryColumnName: "Name",

	/**
	 * Name of the column that is the source of the tab title.
	 * @type {String}
	 */
	defaultPrimaryDisplayColumnName: "Caption",

	/**
	 * Name of column that is source for visible property.
	 * @type {String}
	 */
	defaultVisibleColumnName: "Visible",

	/**
	 * Name of the column representing source for image of tab.
	 * @type {String}
	 */
	defaultImageColumnName: "ImageSrc",

	/**
	 * Name of the column representing the align property of the tab.
	 * @type {String}
	 */
	defaultAlignColumnName: "Align",

	/**
	 * Name of the column that is the source of the tab marker.
	 * @type {String}
	 */
	defaultMarkerValueColumnName: "MarkerValue",

	/**
	 * Class name of the active tab.
	 * @type {String}
	 */
	activeTabClass: "ts-tabpanel-active-item",

	/**
	 * Name of the CSS class for tab with background image.
	 * @type {String}
	 */
	imageTabClass: "ts-tab-image",

	// endregion

	// region Methods: Private

	/**
	 * Shows or hidden tab by index.
	 * @private
	 * @deprecated
	 * @param {Boolean} isDisplayed Show or hidden tab.
	 * @param {Number} index Tab index.
	 */
	setTabDisplayedByIndex: Ext.emptyFn,

	/**
	 * Gets direction sign depending on the rtl mode.
	 * @private
	 * @param {String} direction Direction `left` or `right`.
	 * @return {Number} Direction sign depending on the rtl mode.
	 */
	_getDirectionSign: function(direction) {
		const directionSign = direction === "left" ? -1 : 1;
		return Terrasoft.getIsRtlMode() ? directionSign * -1 : directionSign;
	},

	/**
	 * Gets outer width of element.
	 * @private
	 * @param {Ext.dom.Element} el Element.
	 * @return {Number} Outer width of element.
	 */
	getOuterWidth: function(el) {
		const width = el.getWidth();
		return width + this.getTabMarginWidth(el);
	},

	/**
	 * Gets margin width of Element.
	 * @private
	 * @param {Ext.dom.Element} el Element.
	 * @return {*|Object|Number} Element margin width.
	 */
	getTabMarginWidth: function(el) {
		return el.getMargin("lr");
	},

	/**
	 * Gets tab position config.
	 * @private
	 * @param {Ext.dom.Element} el Tab li element.
	 * @return {Object} {leftOutside: Number, rightOutside: Number, width: Number, el: HTMLElement} Tab position config.
	 */
	getTabPositionConfig: function(el) {
		const visibleTabsWrap = this.getVisibleTabsWrap();
		const visibleTabsWrapBox = visibleTabsWrap.getBox();
		const elBox = el.getBox();
		return {
			leftOutside: elBox.left - visibleTabsWrapBox.left,
			rightOutside: visibleTabsWrapBox.right - elBox.right,
			width: this.getOuterWidth(el),
			domEl: el.dom
		};
	},

	/**
	 * Gets visible information of the tab.
	 * @private
	 * @param {Ext.dom.Element} tabEl Tab element.
	 * @return {Object} Visible information of the tab.
	 */
	_getTabVisibleInfo: function(tabEl) {
		const visibleTabs = this.getVisibleTabsPositionConfig();
		if (visibleTabs.length === 0) {
			return {};
		}
		const tabElIndex = this._getTabElIndex(tabEl);
		const firstVisibleTab = visibleTabs.shift();
		const lastVisibleTab = visibleTabs.pop();
		const firstVisibleTabIndex = this._getTabElIndex(firstVisibleTab.domEl);
		const lastVisibleTabIndex = lastVisibleTab && this._getTabElIndex(lastVisibleTab.domEl);
		return {
			isHiddenAtBegin: firstVisibleTabIndex > tabElIndex,
			isHiddenAtEnd: lastVisibleTabIndex < tabElIndex
		};
	},

	/**
	 * @private
	 * @return {Ext.dom.Element|undefined}
	 */
	_getFirstLeftHiddenTab: function() {
		const tabPositionConfig = this._getFirstLeftHiddenTabPositionConfig();
		if (tabPositionConfig) {
			const tabEl = Ext.get(tabPositionConfig.domEl);
			return tabEl;
		}
	},

	/**
	 * @private
	 * @return {Ext.dom.Element|undefined}
	 */
	_getFirstRightHiddenTab: function() {
		const tabPositionConfig = this._getFirstRightHiddenTabPositionConfig();
		if (tabPositionConfig) {
			const tabEl = Ext.get(tabPositionConfig.domEl);
			return tabEl;
		}
	},

	/**
	 * @private
	 * @return {Array|undefined}
	 */
	_getFirstLeftHiddenTabPositionConfig: function() {
		const tabsPostionConfigArray = this.getTabsPostionConfigArray();
		const leftHiddenTabs = tabsPostionConfigArray.filter(tab => tab.leftOutside < 0);
		return leftHiddenTabs.pop();
	},

	/**
	 * @private
	 * @return {Array|undefined}
	 */
	_getFirstRightHiddenTabPositionConfig: function() {
		const tabsPostionConfigArray = this.getTabsPostionConfigArray();
		const leftHiddenTabs = tabsPostionConfigArray.filter(tab => tab.rightOutside < 0);
		return leftHiddenTabs.shift();
	},

	/**
	 * Gets visible tabs position config.
	 * @private
	 * @return {Object[]} Visible tabs with position config.
	 */
	getVisibleTabsPositionConfig: function() {
		const tabsPostionConfigArray = this.getTabsPostionConfigArray();
		return tabsPostionConfigArray.filter(function(tabPositionConfig) {
			return tabPositionConfig.leftOutside >= 0 && tabPositionConfig.rightOutside >= 0;
		});
	},

	/**
	 * Gets tabs position array.
	 * @private
	 * @return {Object[]} Tabs position array.
	 */
	getTabsPostionConfigArray: function() {
		const tabPostionArray = [];
		const tabElements = this.getTabsElements();
		if (!tabElements) {
			return tabPostionArray;
		}
		tabElements.each(function(tabEl) {
			const tabPositionConfig = this.getTabPositionConfig(tabEl);
			tabPostionArray.push(tabPositionConfig);
		}, this);
		return tabPostionArray;
	},

	/**
	 * Gets max and min value of tab ul left position.
	 * @private
	 * @return {Object} Tabs left position config with max and min possible value.
	 */
	getLeftLimitPositionTabs: function() {
		const tabsWidth = this.getTabsWidth();
		const visibleTabWrap = this.getVisibleTabsWrap();
		const initialMarginLeft = this._initialMarginLeft;
		const maxOutOfMinimum = -(tabsWidth - initialMarginLeft - visibleTabWrap.getWidth(true));
		return {
			max: initialMarginLeft,
			min: Math.min(maxOutOfMinimum, initialMarginLeft)
		};
	},

	/**
	 * Sets left position tabs container.
	 * @private
	 * @param {Number} leftPortion Left portion.
	 */
	setLeftPositionTabs: function(leftPortion) {
		const tabsElementsLeft = this.getTabsElementsLeft();
		const leftLimitPositionTabs = this.getLeftLimitPositionTabs();
		let left = tabsElementsLeft + leftPortion + this._initialMarginLeft;
		left = Math.min(left, leftLimitPositionTabs.max);
		left = Math.max(left, leftLimitPositionTabs.min);
		this.setTabsElementsLeft(left);
	},

	/**
	 * Gets left position of first tab.
	 * @private
	 * @return {Number} First tab left position.
	 */
	getTabsElementsLeft: function() {
		const el = this.getFirstTabEl();
		return parseInt(el.getAttribute("left") || this._initialMarginLeft, 10);
	},

	/**
	 * Scroll tabs elements to left position.
	 * @private
	 * @param {Number} left Left position.
	 */
	setTabsElementsLeft: function(left) {
		const firstVisibleTabEl = this.getFirstVisibleTabEl();
		if (!firstVisibleTabEl) {
			return;
		}
		const leftPx = Ext.String.format("{0}px", left);
		const marginDirection = this._getMarginDirection();
		firstVisibleTabEl.setStyle(marginDirection, leftPx);
		firstVisibleTabEl.set({left: left});
	},

	/**
	 * Gets margin direction depending on the rtl mode.
	 * @private
	 * @return {String} Margin direction.
	 */
	_getMarginDirection: function() {
		return Terrasoft.getIsRtlMode() ? "margin-right" : "margin-left";
	},

	/**
	 * Scrolls to rightmost visible position.
	 * @private
	 * @param {Ext.dom.Element} tabEl Scrolling tab element.
	 */
	scrollToRight: function(tabEl) {
		const direction = Terrasoft.getIsRtlMode() ? "left" : "right";
		this.scrollTo(tabEl, direction);
	},

	/**
	 * Scrolls to leftmost visible position.
	 * @private
	 * @param {Ext.dom.Element} tabEl Scrolling tab element.
	 */
	scrollToLeft: function(tabEl) {
		const direction = Terrasoft.getIsRtlMode() ? "right" : "left";
		this.scrollTo(tabEl, direction);
	},

	/**
	 * Scrolls to leftmost or rightmost.
	 * @private
	 * @param {Ext.dom.Element} tabEl Scrolling tab element.
	 * @param {String} direction Direction `left` or `right`.
	 */
	scrollTo: function(tabEl, direction) {
		if (!tabEl) {
			return;
		}
		const tabPositionConfig = this.getTabPositionConfig(tabEl);
		const directionPosition = direction + "Outside";
		const directionSign = this._getDirectionSign(direction);
		const lengthValue = tabPositionConfig[directionPosition] * directionSign;
		this.setLeftPositionTabs(lengthValue);
		this.onAfterScroll(tabEl);
	},

	/**
	 * @private
	 */
	_destroyDomEvents: function() {
		if (this._itemsElResizeObserver) {
			this._itemsElResizeObserver.disconnect();
		}
		const wrapEl = this.getWrapEl();
		if (wrapEl) {
			wrapEl.un("click", this.onTabClick);
		}
		const scrolLeftEl = this.getScrollLeftEl();
		const scrollRightEl = this.getScrollRightEl();
		if (this.isScrollVisible && scrolLeftEl && scrollRightEl) {
			scrolLeftEl.un("click", this.onScrollLeftElementClick);
			scrollRightEl.un("click", this.onScrollRightElementClick);
		}
		if (this.isCollapseButtonVisible) {
			const collapseEl = this.collapseEl;
			if (collapseEl) {
				collapseEl.un("click", this.toggleCollapsed);
			}
		}
	},

	/**
	 * Generate tabpanel css rules.
	 * @private
	 */
	_generateCssRules: function() {
		const styleSheetId = Ext.String.format("{0}-stylesheet", this.id);
		if (this.styleSheetId) {
			this._clearStyleSheet();
		}
		const tabWrap = this.getVisibleTabsWrap();
		const maxWidth = tabWrap && tabWrap.getWidth();
		if (!maxWidth) {
			return;
		}
		const maxWidthRulePattern = "#{0}-wrap .ts-tabpanel-items li { max-width: {1}px; }";
		const maxWidthRule = Ext.String.format(maxWidthRulePattern, this.id, maxWidth * 0.8 - this._initialMarginLeft);
		Terrasoft.createStyleSheet(maxWidthRule, styleSheetId);
		this.styleSheetId = styleSheetId;
	},

	/**
	 * Clear stylesheets.
	 * @private
	 */
	_clearStyleSheet: function() {
		if (this.styleSheetId) {
			Terrasoft.removeStyleSheet(this.styleSheetId);
			this.styleSheetId = null;
		}
	},

	/**
	 * Gets tab index by tab element.
	 * @private
	 * @param {Ext.Element|Element} tabEl Tab element.
	 * @return {Mixed|Number} Tab element index.
	 */
	_getTabElIndex: function(tabEl) {
		return tabEl && parseInt(tabEl.getAttribute("data-item-index"), 10);
	},

	/**
	 * Returns the data model to which the tab is bound by the tab name.
	 * @private
	 * @param {String} name Tab name.
	 * @return {Terrasoft.BaseViewModel} Data model to which the tab is bound.
	 */
	getTabByName: function(name) {
		var self = this;
		var filteredTabs = this.tabs.filter(function(tab) {
			return self.getTabName(tab) === name;
		});
		return filteredTabs.first();
	},

	/**
	 * Gets tab dom element by index.
	 * @private
	 * @param {Number} index Index of the tab.
	 * @return {HTMLElement|null} Tab dom element.
	 */
	getTabDomElementByIndex: function(index) {
		var wrapEl = this.wrapEl;
		if (!wrapEl) {
			return null;
		}
		var selector = Ext.String.format(this.tabIndexElementSelector, index);
		var foundElements = wrapEl.query(selector);
		return foundElements[0];
	},

	/**
	 * Gets tab dom element by active tab.
	 * @private
	 * @return {HTMLElement|null} Tab dom element.
	 */
	getActiveTabDomElement: function() {
		var wrapEl = this.wrapEl;
		if (!wrapEl) {
			return null;
		}
		var selector = Ext.String.format(".{0}", this.activeTabClass);
		var foundElements = wrapEl.query(selector);
		return foundElements[0];
	},

	/**
	 * Returns the value of the model property that corresponds to the name of the tab.
	 * @private
	 * @param {Terrasoft.BaseViewModel} tab Data model to which the tab is bound.
	 * @return {String} Tab name.
	 */
	getTabName: function(tab) {
		var columnName = tab.primaryColumnName || this.defaultPrimaryColumnName;
		return tab.get(columnName);
	},

	/**
	 * Returns the value of the model property that corresponds to the tab header.
	 * @private
	 * @param {Terrasoft.BaseViewModel} tab Data model to which the tab is bound.
	 * @return {String} Tab title.
	 */
	getTabCaption: function(tab) {
		var columnName = tab.primaryDisplayColumnName || this.defaultPrimaryDisplayColumnName;
		return tab.get(columnName);
	},

	/**
	 * Returns the value of the model visibility property.
	 * @param {Terrasoft.BaseViewModel} tab Data model to which the tab is bound.
	 * @return {boolean} Tab visibility value.
	 * @private
	 */
	_getTabVisibility: function(tab) {
		const value = tab.get(this.defaultVisibleColumnName);
		return Ext.isEmpty(value) ? true : value;
	},

	/**
	 * Returns the value of the model property that corresponds to the tab marker.
	 * @private
	 * @param {Terrasoft.BaseViewModel} tab The data model to which the tab is bound.
	 * @return {String} The tab marker.
	 */
	getTabMarkerValue: function(tab) {
		var columnName = this.defaultMarkerValueColumnName;
		return tab.get(columnName);
	},

	/**
	 * Shows first right hidden tab in leftmost position.
	 * @private
	 */
	showNextTab: function() {
		const firstRightHiddenTab = this._getFirstRightHiddenTab();
		this.scrollToLeft(firstRightHiddenTab);
	},

	/**
	 * Shows first left hidden tab in rightmost position.
	 * @private
	 */
	showPreviousTab: function() {
		const firstLeftHiddenTab = this._getFirstLeftHiddenTab();
		this.scrollToRight(firstLeftHiddenTab);
	},
	// endregion

	// region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.controls.Component#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event activeTabChange
			 * Event of changing the new tab selection.
			 * Called when a new tab is clicked.
			 * @param {Terrasoft.BaseViewModel} tabModel Data model to which the tab is bound.
			 * @param {Number} tabIndex Tab model index.
			 * @param {Terrasoft.BaseViewModel[]} tabCollection Tab model collection.
			 */
			"activeTabChange",
			/**
			 * @event tabRender
			 * HTML of the tab generated.
			 * @param {Object} htmlConfig Object with the generated HTML markup({html:"<li>TabCaption</li>"}),
			 * which can be modified.
			 * @param {Terrasoft.BaseViewModel} tabModel Data model to which the tab is bound.
			 * @param {Number} tabIndex Tab model index.
			 * @param {Terrasoft.BaseViewModel[]} tabCollection Tab model collection.
			 */
			"tabRender",
			/**
			 * @event collapsedchanged
			 * Changed Boolean property.
			 * @param {collapsed} newValue New collapsed state of tabpanel.
			 */
			"collapsedchanged",

			/**
			 * @event scrollIndexChangedchanged
			 * Changed Boolean property.
			 * @param {Number} scrollIndex New scroll index of first left visible tab.
			 */
			"scrollIndexChanged"
		);
		this.selectors = {
			wrapEl: ""
		};
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#initDomEvents
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		const wrapEl = this.getWrapEl();
		const scrolLeftEl = this.getScrollLeftEl();
		const scrollRightEl = this.getScrollRightEl();
		wrapEl.on("click", this.onTabClick, this, {
			delegate: "li"
		});
		if (this.isScrollVisible) {
			scrolLeftEl.on("click", this.onScrollLeftElementClick, this);
			scrollRightEl.on("click", this.onScrollRightElementClick, this);
		}
		if (this.isCollapseButtonVisible) {
			const collapseEl = this.collapseEl;
			if (collapseEl) {
				collapseEl.on("click", this.toggleCollapsed, this);
			}
		}
		if (this.itemsEl) {
			this._itemsElResizeObserver = this._itemsElResizeObserver
				|| new window.ResizeObserver(this.onResizeItemsElContainer.bind(this));
			this._itemsElResizeObserver.observe(this.itemsEl.dom);
		}
	},

	/**
	 * Handler on resize items elements.
	 * @protected
	 */
	onResizeItemsElContainer: function() {
		Terrasoft.defer(this._generateCssRules, this);
	},

	/**
	 * Initialize maximum left position of the first tab.
	 * @protected
	 */
	initMaxLeftPosition: function() {
		const firstTabEl = this.getFirstTabEl();
		const marginLeft = firstTabEl && firstTabEl.getMargin("l");
		this._initialMarginLeft = marginLeft || 0;
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#getTplData
	 * @override
	 */
	getTplData: function() {
		const isScrollVisible = this.isScrollVisible;
		const isCollapseButtonVisible = this.isCollapseButtonVisible;
		let tplData = this.callParent(arguments);
		tplData.renderTabs = this.renderTabs;
		tplData.isScrollVisible = isScrollVisible;
		tplData.isCollapseButtonVisible = isCollapseButtonVisible;
		tplData.wrapClass = ["ts-tabpanel"];
		tplData.scrollLeftClass = this.scrollLeftClass;
		tplData.scrollAnimationClass = this.scrollAnimationClass;
		tplData.scrollRightClass = this.scrollRightClass;
		if (isScrollVisible) {
			tplData.wrapClass.push("ts-tabpanel-scroll-visible");
		}
		if (isCollapseButtonVisible) {
			tplData.wrapClass.push("ts-tabpanel-collapse-visible");
			if (this.collapsed) {
				tplData.wrapClass.push(this.collapsedClass);
			}
		}
		this.selectors.wrapEl = "#" + this.id + "-wrap";
		this.selectors.itemsWrapEl = "#" + this.id + "-items-wrap";
		this.selectors.toolsEl = "#" + this.id + "-tools";
		this.selectors.itemsEl = "#" + this.id + "-tabpanel-items";
		this.selectors.scrollLeftEl = "#" + this.id + "-scroll-left";
		this.selectors.scrollRightEl = "#" + this.id + "-scroll-right";
		this.selectors.collapseEl = "#" + this.id + "-collapse-button";
		this.selectors.visibleItemsWrapEl = "#" + this.id + "-tabpanel-items";
		return tplData;
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		const bindConfig = this.callParent(arguments);
		const tabPanelBindConfig = {
			tabs: {
				changeMethod: "onTabsCollectionDataChange"
			},
			activeTabName: {
				changeMethod: "onActiveTabNameChange",
				changeEvent: "activeTabChange"
			},
			isScrollVisible: {
				changeMethod: "onIsScrollVisibleChange"
			},
			collapsed: {
				changeEvent: "collapsedchanged",
				changeMethod: "setCollapsed"
			},
			scrollIndex: {
				changeEvent: "scrollIndexChanged",
				changeMethod: "setScrollIndex"
			}
		};
		Ext.apply(tabPanelBindConfig, bindConfig);
		return tabPanelBindConfig;
	},

	/**
	 * Rerendering tab panel.
	 * @protected
	 */
	reRenderPanel: function() {
		this.safeRerender();
	},

	/**
	 * Handler of click the left tab. Sets active tab class and scrolls to tab element.
	 * @protected
	 * @param  {Event} e Event of control element.
	 */
	onTabClick: function(e) {
		const element = e.target;
		const tabs = this.tabs;
		const tabIndex = element.getAttribute("data-item-index");
		const tab = tabs.getByIndex(tabIndex);
		const tabName = this.getTabName(tab);
		const tabEl = this.getTabElementByIndex(tabIndex);
		this.setActiveTab(tabName);
		this.scrollToEl(tabEl);
	},

	/**
	 * Handler of the click on left scroll element button.
	 * @protected
	 */
	onScrollLeftElementClick: function() {
		this.showPreviousTab();
	},

	/**
	 * Handler of click right scroll element.
	 * @protected
	 */
	onScrollRightElementClick: function() {
		this.showNextTab();
	},

	/**
	 * Handler of onTabsCollectionDataChange event.
	 * @protected
	 */
	onTabsCollectionDataChange: function() {
		this.reRenderPanel();
	},

	/**
	 * Gets ul wrap element.
	 * @protected
	 * @return {Ext.dom.Element} Ul wrap element.
	 */
	getVisibleTabsWrap: function() {
		return this.visibleItemsWrapEl;
	},

	/**
	 * Scrolls to leftmost or rightmost visible position.
	 * @protected
	 * @param {Ext.dom.Element} tabEl Scrolling tab element.
	 */
	scrollToEl: function(tabEl) {
		if (!tabEl) {
			return;
		}
		const tabVisibleInfo = this._getTabVisibleInfo(tabEl);
		if (tabVisibleInfo.isHiddenAtBegin) {
			this.scrollToLeft(tabEl);
		}
		if (tabVisibleInfo.isHiddenAtEnd) {
			this.scrollToRight(tabEl);
		}
	},

	/**
	 * Gets li elements.
	 * @protected
	 * @return {Ext.CompositeElement} Li elements of wrapper.
	 */
	getTabsElements: function() {
		return this.wrapEl && this.wrapEl.select(this.tabTagName);
	},

	/**
	 * Gets first li element.
	 * @protected
	 * @return {Ext.dom.Element} First li element.
	 */
	getFirstTabEl: function() {
		const tabElemetns = this.wrapEl && this.wrapEl.select(this.tabTagName + ":first-child");
		return tabElemetns && tabElemetns.first();
	},

	/**
	 * Gets first visible li element.
	 * @protected
	 * @return {Ext.dom.Element} First visible li element.
	 */
	getFirstVisibleTabEl: function() {
		const tabElemetns = this.wrapEl && this.wrapEl.select(this.tabTagName + ":visible");
		return tabElemetns && tabElemetns.first();
	},

	/**
	 * Gets last li element.
	 * @protected
	 * @return {Ext.dom.Element} Last li element.
	 */
	getLastTabEl: function() {
		return this.wrapEl && this.wrapEl.select(this.tabTagName + ":last-child").first();
	},

	/**
	 * Gets scroll left element.
	 * @protected
	 * @return {Ext.dom.Element} Scroll left element.
	 */
	getScrollLeftEl: function() {
		return this.scrollLeftEl;
	},

	/**
	 * Gets scroll right element.
	 * @protected
	 * @return {Ext.dom.Element} Scroll right element.
	 */
	getScrollRightEl: function() {
		return this.scrollRightEl;
	},

	/**
	 * Handler of onActiveTabNameChange event.
	 * @protected
	 * @param {String} name Name of the tab.
	 */
	onActiveTabNameChange: function(name) {
		this.setActiveTab(name);
	},

	/**
	 * Handler of onIsScrollVisibleChange event.
	 * @protected
	 * @param {Boolean} isScrollVisible True if scroll visible.
	 */
	onIsScrollVisibleChange: function(isScrollVisible) {
		this.isScrollVisible = isScrollVisible;
		if (this.rendered) {
			this.reRender();
		}
	},

	/**
	 * Handler of after scroll event.
	 * @protected
	 * @param {Ext.dom.Element} tabEl Tab element.
	 */
	onAfterScroll: function(tabEl) {
		const tabElIndex = this._getTabElIndex(tabEl);
		this.setScrollIndex(tabElIndex);
	},

	/**
	 * @inheritdoc Terrasoft.core.Component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.initMaxLeftPosition();
	},

	/**
	 * @inheritdoc Terrasoft.core.Component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.initMaxLeftPosition();
		const tabsCount = this.tabs.getCount();
		if (tabsCount === 0) {
			return;
		}
		const activeTabIndex = this.getActiveTabIndex();
		if (activeTabIndex > 0) {
			this.scrollToActiveTab();
		}
	},

	/**
	 * Scrolls to active tab.
	 * @protected
	 */
	scrollToActiveTab: function() {
		const activeTabIndex = this.getActiveTabIndex();
		const activeTabEl = this.getTabElementByIndex(activeTabIndex);
		this.scrollToLeft(activeTabEl);
	},

	/**
	 * Gets Index of the active tab.
	 * @protected
	 * @return {Number} Index of the active tab.
	 */
	getActiveTabIndex: function() {
		return this.getTabIndexByName(this.activeTabName);
	},

	/**
	 * Gets index of the searched tab.
	 * @protected
	 * @param {String} tabName Name of the searched tab.
	 * @return {Number} Index of the searched tab.
	 */
	getTabIndexByName: function(tabName) {
		const tabs = this.tabs;
		if (!tabName || !tabs) {
			return -1;
		}
		const activeTab = this.getTabByName(tabName);
		return tabs.indexOf(activeTab);
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
	 * @protected
	 */
	subscribeForCollectionEvents: function(binding, property, model) {
		this.callParent(arguments);
		var collection = model.get(binding.modelItem);
		collection.on("dataLoaded", this.onTabsCollectionDataChange, this);
		collection.on("add", this.onAddTab, this);
		collection.on("remove", this.onTabRemove, this);
		collection.on("clear", this.onTabsCollectionDataChange, this);
		collection.on("itemChanged", this.onTabChange, this);
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#unSubscribeForCollectionEvents
	 * @protected
	 */
	unSubscribeForCollectionEvents: function(binding, property, model) {
		this.callParent(arguments);
		var collection = model.get(binding.modelItem);
		collection.un("dataLoaded", this.onTabsCollectionDataChange, this);
		collection.un("add", this.onAddTab, this);
		collection.un("remove", this.onTabRemove, this);
		collection.un("clear", this.onTabsCollectionDataChange, this);
		collection.un("itemChanged", this.onTabChange, this);
	},

	/**
	 * Template default tabs render method.
	 * @param {String[]} buffer HTML generation buffer.
	 * @param {Object} renderData Template parameters object.
	 * @protected
	 */
	renderTabs: function(buffer, renderData) {
		var self = renderData.self;
		if (!self.tabs) {
			return;
		}
		var tabsTree = self.getTabsRenderTemplateTree();
		Ext.DomHelper.generateMarkup(tabsTree, buffer);
	},

	/**
	 * Method generates HTML-layout for tabs on default template render.
	 * @protected
	 * @return {String[]}
	 */
	getTabsRenderTemplateTree: function() {
		var tabs = this.tabs;
		var tabsTree = [];
		for (var i = 0, length = tabs.getCount(); i < length; i++) {
			var tab = tabs.getByIndex(i);
			var tabTplConfig = this.getTabTplConfig(tab, i);
			var config = {
				html: this.generateTabHtml(tabTplConfig),
				tab: tab,
				index: i,
				tabs: tabs
			};
			this.fireEvent("tabRender", config);
			tabsTree.push(config.html);
		}
		return tabsTree;
	},

	/**
	 * Create configuration for tab html layout generating.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} tab Tab binds to view model.
	 * @param {Number} index Tab index.
	 * @return {Object} Object that contains parameters for template generating.
	 */
	getTabTplConfig: function(tab, index) {
		var activeTabName = this.activeTabName;
		var imageSrc = Terrasoft.encodeHtml(this.getImage(tab));
		var alignClass = this.getAlignClass(tab);
		var wrapClass = [];
		var customItemStyle = null;
		if (imageSrc) {
			customItemStyle = Ext.String.format("background-image: url({0})", imageSrc);
			wrapClass.push(this.imageTabClass);
		}
		if (alignClass) {
			wrapClass.push(alignClass);
		}
		if (this.getTabName(tab) === activeTabName) {
			wrapClass.push(this.activeTabClass);
		}
		var caption = Terrasoft.encodeHtml(this.getTabCaption(tab)) || "&nbsp";
		var markerValue = Terrasoft.encodeHtml(this.getTabMarkerValue(tab));
		return {
			wrapClass: wrapClass.join(" "),
			caption: caption,
			visible: this._getTabVisibility(tab),
			markerValue: markerValue,
			index: index,
			imageSrc: imageSrc,
			customItemStyle: customItemStyle,
			direction: Terrasoft.getTextDirection(caption)
		};
	},

	/**
	 * Generates HTML markup for tab.
	 * @protected
	 * @param {Object} tplData Object with parameters for generating the tab HTML markup
	 */
	generateTabHtml: function(tplData) {
		const tpl = new Ext.XTemplate(this.tabTpl);
		return tpl.apply(tplData);
	},

	// endregion

	// region Methods: Public

	/**
	 * Changes collapsed property to reverse value.
	 */
	toggleCollapsed: function() {
		const collapsed = !this.collapsed;
		this.setCollapsed(collapsed);
	},

	/**
	 * Sets collapsed property to the new state.
	 * @param {Boolean} collapsed New collapsed state of tabpanel.
	 */
	setCollapsed: function(collapsed) {
		if (this.collapsed === collapsed) {
			return;
		}
		this.collapsed = collapsed;
		if (!this.rendered) {
			return;
		}
		if (collapsed) {
			this.wrapEl.addCls(this.collapsedClass);
		} else {
			this.wrapEl.removeCls(this.collapsedClass);
		}
		this.fireEvent("collapsedchanged", collapsed);
	},

	/**
	 * Gets tab element by index.
	 * @param {Number} index Tab index.
	 * @return {Ext.Element|null} Found element.
	 */
	getTabElementByIndex: function(index) {
		var wrapEl = this.wrapEl;
		if (!wrapEl) {
			return null;
		}
		var selector = Ext.String.format(this.tabIndexElementSelector, index);
		var foundElements = wrapEl.select(selector);
		return foundElements.first();
	},

	/**
	 * Sets scrollIndex and fire event.
	 * @param {Number} value New scrollIndex value.
	 * @return {Boolean} Is changed scrollIndex.
	 */
	setScrollIndex: function(value) {
		const isChanged = this.scrollIndex !== value;
		if (isChanged) {
			this.scrollIndex = value;
			this.fireEvent("scrollIndexChanged", value, this);
		}
		return isChanged;
	},

	/**
	 * Restores tab panel scroll position.
	 * @param {Number} value Count of hidden tabs.
	 */
	restoreTabPanelScroll: function(value) {
		var tabElement = this.getTabElementByIndex(value);
		this.scrollToLeft(tabElement);
	},

	/**
	 * Checks visibility of the tab by index.
	 * @param {Number} index Index of the tab.
	 * @return {Boolean} Is tab visible.
	 */
	tabDisplayed: function(index) {
		const tabElement = this.getTabElementByIndex(index);
		if (!tabElement) {
			return false;
		}
		const tabPositionConfig = this.getTabPositionConfig(tabElement);
		return tabPositionConfig.leftOutside >= 0 && tabPositionConfig.rightOutside >= 0;
	},

	/**
	 * Scrolls to the tab by index.
	 * @param {Number} index Tab index.
	 */
	scrollToTab: function(index) {
		index = index || 0;
		const tabElement = this.getTabElementByIndex(index);
		this.scrollToLeft(tabElement);
	},

	/**
	 * Handler on destroy the control.
	 */
	onDestroy: function() {
		this.callParent(arguments);
		this._destroyDomEvents();
		this._clearStyleSheet();
	},

	/**
	 * Handler of tab collection element adding event.
	 */
	onAddTab: function() {
		this.reRenderPanel();
	},

	/**
	 * Handler of tab collection element removing event.
	 */
	onTabRemove: function() {
		this.reRenderPanel();
	},

	/**
	 * Handler of tab collection element editing event.
	 */
	onTabChange: function() {
		this.reRenderPanel();
	},

	/**
	 * Returns the class name for tab align.
	 * @param {Terrasoft.BaseViewModel} tab The ViewModel of the tab.
	 * @return {String} Class name.
	 */
	getAlignClass: function(tab) {
		var align = tab.get(this.defaultAlignColumnName);
		if (align === Terrasoft.Align.LEFT) {
			return this.alignLeftClassName;
		}
		if (align === Terrasoft.Align.RIGHT) {
			return this.alignRightClassName;
		}
		return Terrasoft.emptyString;
	},

	/**
	 * Returns url of image of the tab.
	 * @param {Terrasoft.BaseViewModel} tab The ViewModel of the tab.
	 * @return {String} Url.
	 */
	getImage: function(tab) {
		return tab.get(this.defaultImageColumnName);
	},

	/**
	 * Sets the active tab by the tab name.
	 * @param {String} name Name of the tab.
	 */
	setActiveTab: function(name) {
		var oldActiveTabName = this.activeTabName;
		this.activeTabName = name;
		var tabs = this.tabs;
		var newActiveTab = this.getTabByName(name);
		if (!newActiveTab || oldActiveTabName === name) {
			return;
		}
		var oldActiveTab = this.getTabByName(oldActiveTabName);
		var oldActiveTabDomElement = this.getActiveTabDomElement();
		if (oldActiveTabDomElement) {
			this.toggleCssClasses(oldActiveTabDomElement, oldActiveTab, false);
		}
		var newActiveTabIndex = tabs.indexOf(newActiveTab);
		var newActiveTabDom = this.getTabDomElementByIndex(newActiveTabIndex);
		if (newActiveTabDom) {
			this.toggleCssClasses(newActiveTabDom, newActiveTab, true);
			this.fireEvent("activeTabChange", newActiveTab, newActiveTabIndex, tabs);
		}
	},

	/**
	 * Sets the css of active / inactive tabs.
	 * @param {Object} tabDomEl DOM element of the tab.
	 * @param {Terrasoft.BaseViewModel} tab The data model to which the tab is bound.
	 * @param {Boolean} isActive The mark that indicates whether the tab is active.
	 */
	toggleCssClasses: function(tabDomEl, tab, isActive) {
		var className = this.activeTabClass;
		var tabEl = Ext.fly(tabDomEl);
		if (isActive) {
			if (!tabEl.hasCls(className)) {
				tabEl.toggleCls(className);
			}
		} else if (tabEl.hasCls(className)) {
			tabEl.toggleCls(className);
		}
	},

	/**
	 * Returns a reference to the DOM element where the tool elements are displayed.
	 * @return {Ext.dom.Element} Reference to the DOM element where the tool elements are displayed.
	 */
	getRenderToEl: function() {
		return this.toolsEl;
	},

	/**
	 * Gets scroll index.
	 * @return {Number} Scroll index.
	 */
	getScrollIndex: function() {
		return this.scrollIndex;
	},

	/**
	 * Gets real outer width of all tabs.
	 * @return {Number} Tabs outer width.
	 */
	getTabsWidth: function() {
		let width = 0;
		const tabElements = this.getTabsElements();
		for (let i = 0; i < tabElements.getCount(); i++) {
			const tabEl = tabElements.item(i);
			width += this.getOuterWidth(tabEl);
		}
		return width - Math.abs(this.getTabsElementsLeft()) + this._initialMarginLeft || 0;
	}

	// endregion
});
