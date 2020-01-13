Ext.ns("Terrasoft.controls.TipEnums");

/**
 * @enum {string} Terrasoft.controls.TipEnums.style
 * Tip style enumerations.
 */
Terrasoft.controls.TipEnums.style = {

	/** Green. */
	GREEN: "green",

	/** Red. */
	RED: "red",

	/** Blue. */
	BLUE: "blue",

	/** White. */
	WHITE: "white",

	/** Yellow. */
	YELLOW: "yellow"
};

/**
 * Alias for {@link Terrasoft.controls.TipEnums.style}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.controls.TipEnums.style
 */
Terrasoft.TipStyle = Terrasoft.controls.TipEnums.style;

/**
 * Class "Tip"
 */
Ext.define("Terrasoft.controls.Tip", {
	extend: "Terrasoft.controls.AbstractContainer",
	alternateClassName: "Terrasoft.Tip",

	mixins: {
		alignable: "Terrasoft.Alignable"
	},

	//region Properties: Private

	/**
	 * Indicates that the tip must be hidden on mouseleave event of wrapEl.
	 * @private
	 * @type {Boolean}
	 */
	closeOnMouseLeave: false,

	/**
	 * Width of the padding of tip wrapEl in em.
	 * @private
	 * @type {Number}
	 */
	wrapElPadding: 1,

	/**
	 * Size of tip side in em.
	 * @private
	 * @type {Number}
	 */
	tipSize: 0.6,

	//endregion

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.Component#disabledClass
	 * @override
	 */
	disabledClass: "tip-disabled",

	/**
	 * Collection style classes to the container tools.
	 * @protected
	 * @type {String[]}
	 */
	toolsWrapClass: "tip-tools-wrap",

	/**
	 * @inheritdoc Terrasoft.Component#tpl
	 * @protected
	 * @override
	 * @type {String[]}
	 */
	defaultRenderTpl: [
		"<div id=\"{id}-wrapEl\" class=\"{wrapClass}\" style=\"{wrapStyle}\">",
		"<span class=\"tip-anchor\"></span>",
		"<div class=\"tip-border\">",
		"<div id=\"{id}\" class=\"tip-panel\">",
		"<tpl if=\"displayTools\">",
		"<div id=\"{id}-tip-tools\" class=\"{toolsWrapClasses}\">",
		"<tpl for=\"tools\">",
		"{%this.renderTool(out, values)%}",
		"</tpl>",
		"</div>",
		"</tpl>",
		"<div id=\"{id}-content\" class=\"tip-content\"<tpl if=\"direction\"> dir=\"{direction}\"</tpl>>",
		"{content}</div>",
		"<tpl if=\"self.items.length\">",
		"<div id=\"{id}-items\" class=\"tip-items\" style=\"{itemsWrapStyles}\">",
		"{%this.renderItems(out, values)%}",
		"</div>",
		"</tpl>",
		"</div>",
		"</div>",
		"</div>"
	],

	/**
	 * @inheritdoc Terrasoft.Component#visible
	 * @protected
	 * @override
	 */
	visible: false,

	/**
	 * Id of the timer for delay before show.
	 * @protected
	 * @type {String} showTimerId
	 */
	showTimerId: null,

	/**
	 * Id of the timer for delay before show.
	 * @protected
	 * @type {String} hideTimerId
	 */
	hideTimerId: null,

	//endregion

	//region Properties: Public

	/**
	 * Display mode of tip.
	 * @type {ENUM}
	 */
	displayMode: null,

	/**
	 * Style of tip.
	 * @type {ENUM}
	 */
	style: null,

	/**
	 * Array of the toolbar items.
	 * @type {Array}
	 */
	tools: null,

	/**
	 * Content of tip.
	 * @type {String} content
	 */
	content: null,

	/**
	 * Time interval before displaying tip. Used when tip is showed in delayed mode.
	 * @type {Number}
	 */
	showDelay: 1000,

	/**
	 * Time interval before hide tip. Used when hide tip in delayed mode.
	 * @type {Number}
	 */
	hideDelay: 200,

	/**
	 * Priority align.
	 * @type {Terrasoft.AlignType}
	 */
	initialAlignType: Terrasoft.AlignType.BOTTOM,

	/**
	 * Indicates that the tip must be hidden for scroll event on body.
	 * @type {Boolean}
	 */
	hideOnScroll: true,

	//endregion

	//region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.Component#constructor
	 * @protected
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.renderTo = Ext.getBody();
		this.addEvents(
			/**
			 * @event linkClicked
			 * Fires when tip handles click event on any <a/> element inside tip content.
			 * @param {Object} Link attributes value.
			 */
			"linkClicked",

			/**
			 * @event beforeVisibilityChange
			 * Fires when tip is trying to change its visibility.
			 * @param {Terrasoft.controls.Tip} Current tip instance.
			 * @param {Terrasoft.controls.TipEnums.visibilityChangeEvent} Event type.
			 * @param {Ext.dom.Event} DOM event that lead to visibility change.
			 */
			"beforeVisibilityChange"
		);
	},

	//endregion

	//region Methods: Private

	/**
	 * The method initializes the elements of the toolbar. It called after the initialization container.
	 * @private
	 */
	initTools: function() {
		this.tools = this.prepareItems(this.tools || []);
		Terrasoft.each(this.tools, function(tool) {
			tool.added(this);
		}, this);
	},

	/**
	 * The method implements receiving HTML-markup for toolbox item and storing it in a buffer.
	 * @private
	 * @param {String[]} buffer The buffer for HTML recording.
	 * @param {Terrasoft.Component} item Element toolbar.
	 */
	renderTool: function(buffer, item) {
		var html = item.generateHtml();
		buffer.push(html);
	},

	/**
	 * Called when show delay timeout expired.
	 * @private
	 */
	delayedShow: function() {
		this.clearTimer("showTimerId");
		this.setVisible(true);
	},

	/**
	 * Called when hide delay timeout expired.
	 * @private
	 */
	delayedHide: function() {
		this.clearTimer("hideTimerId");
		this.setVisible(false);
	},

	/**
	 * Clear timer by it's name.
	 * @param {String} timerName Name of the timer.
	 * @return {Boolean} True, if timer was active.
	 */
	clearTimer: function(timerName) {
		var timerId = this[timerName];
		if (timerId) {
			clearTimeout(timerId);
			this[timerName] = null;
		}
		return Boolean(timerId);
	},

	/**
	 * Handler for mouse enter event on tip element.
	 * @private
	 */
	onMouseEnter: function() {
		this.closeOnMouseLeave = this.clearTimer("hideTimerId");
	},

	/**
	 * Handler for mouse enter event on tip element.
	 * @private
	 */
	onMouseLeave: function() {
		if (this.closeOnMouseLeave) {
			this.closeOnMouseLeave = false;
			this.hide();
		}
	},

	/**
	 * Handler for mouse click event on tip content element.
	 * @param {Ext.dom.Event} event
	 */
	onContentClick: function(event) {
		var target = Ext.get(event.target);
		if (!Ext.DomQuery.is(target.dom, "a")) {
			var contentEl = this.contentEl;
			target = target.findParentNode("a", contentEl, true);
		}
		if (!target) {
			return;
		}
		var attributes = {};
		Terrasoft.each(target.dom.attributes, function(item) {
			attributes[item.name] = item.value;
		}, this);
		if (this.fireEvent("linkClicked", attributes) === false) {
			event.stopEvent();
		}
	},

	/**
	 * Updates styles of the {@link #tipEl tipEl} element.
	 * @private
	 * @param {Object} alignConfig Align options returned by {@link Terrasoft.Alignable#getAlignConfig}.
	 */
	applyTipStyles: function(alignConfig) {
		var stylesConfig = {
			"left": null,
			"top": null
		};
		var tipEl = this.getTipEl();
		if (alignConfig && alignConfig.offset && (alignConfig.offset.x || alignConfig.offset.y)) {
			var offset = alignConfig.offset;
			var alignEl = this.getAlignToEl();
			var wrapEl = this.getWrapEl();
			var wrapElSize = wrapEl.getSize();
			var alignRegion = this.getCenterRegion(alignEl, 2);
			var alignXY = tipEl.getConstrainVector(alignRegion);
			var tipAnchorOffset = Terrasoft.convertEmToPx(this.tipSize) / 2;
			var alignElXOffset = Ext.isNumber(alignXY[0]) ? alignXY[0] : 0;
			var alignElYOffset = Ext.isNumber(alignXY[1]) ? alignXY[1] : 0;
			var leftOffset = alignElXOffset + (wrapElSize.width / 2) - tipAnchorOffset;
			var topOffset = alignElYOffset + (wrapElSize.height / 2) - tipAnchorOffset;
			var tipElSize = tipEl.getSize();
			stylesConfig = {
				left: offset.x ? this.getTipOffsetValue(wrapElSize.width, leftOffset, tipElSize.width) : null,
				top: offset.y ? this.getTipOffsetValue(wrapElSize.height, topOffset, tipElSize.height) : null
			};
		}
		tipEl.applyStyles(stylesConfig);
	},

	/**
	 * Returns square region with custom side size centered within passed element.
	 * @private
	 * @param {Ext.dom.Element} el Element to center region within.
	 * @param {Number} regionSize The size of the square.
	 * @return {Ext.util.Region}
	 */
	getCenterRegion: function(el, regionSize) {
		var sideSize = regionSize / 2;
		var box = el.getBox(true);
		var semiHeight = box.height / 2;
		var semiWidth = box.width / 2;
		var resultRegion = new Ext.util.Region(
			box.top + semiHeight - sideSize,
			box.right - semiWidth + sideSize,
			box.bottom - semiHeight + sideSize,
			box.left + semiWidth - sideSize
		);
		return resultRegion;
	},

	/**
	 * Returns offset for the tip element.
	 * @private
	 * @param {Number} wrapElSideSize Size of side relative to which will be applied tip offset.
	 * @param {Number} offset of tip.
	 * @param {Number} tipAnchorSize Size of tip anchor.
	 * @return {String} Css value for tip offset.
	 */
	getTipOffsetValue: function(wrapElSideSize, offset, tipAnchorSize) {
		var paddingSize = Terrasoft.convertEmToPx(this.wrapElPadding);
		var tipAnchorSideSize = tipAnchorSize / 2;
		var minValue = Math.min(offset, wrapElSideSize - paddingSize - tipAnchorSideSize);
		var value = Math.max(paddingSize + tipAnchorSideSize, minValue);
		return Ext.String.format("{0}px", value);
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#init
	 * @protected
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.initTools();
		this.updateDirection(this.content);
	},

	/**
	 * @inheritdoc Terrasoft.Component#initDomEvents
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		var wrapEl = this.getWrapEl();
		wrapEl.on("mouseenter", this.onMouseEnter, this);
		wrapEl.on("mouseleave", this.onMouseLeave, this);
		var contentEl = this.contentEl;
		contentEl.on("click", this.onContentClick, this);
		Ext.EventManager.onWindowResize(this.onWindowResize, this);
		var doc = Ext.getDoc();
		doc.on("mousedown", this.onDocMouseDown, this);
		var body = Ext.getBody();
		body.on("wheel", this.onBodyMouseWheel, this);
	},

	/**
	 * @inheritdoc Terrasoft.Component#clearDomListeners
	 * @override
	 */
	clearDomListeners: function() {
		this.callParent(arguments);
		var wrapEl = this.getWrapEl();
		wrapEl.un("mouseenter", this.onMouseEnter, this);
		wrapEl.un("mouseleave", this.onMouseLeave, this);
		var contentEl = this.contentEl;
		contentEl.un("click", this.onContentClick, this);
		Ext.EventManager.removeResizeListener(this.onWindowResize, this);
		var doc = Ext.getDoc();
		doc.un("mousedown", this.onDocMouseDown, this);
		var body = Ext.getBody();
		body.un("wheel", this.onBodyMouseWheel, this);
	},

	/**
	 * Handler for scroll event on body. Hides tip.
	 * @protected
	 * @param {Ext.EventObjectImpl} event Event object.
	 */
	onBodyMouseWheel: function(event) {
		if (!this.isEventWithin(event) && this.hideOnScroll) {
			this.hide();
		}
	},

	/**
	 * Handler for resize event on body. Hides tip.
	 * @protected
	 */
	onWindowResize: function() {
		this.hide();
	},

	/**
	 * Hides tips which do not contain target of event within.
	 * @protected
	 * @param {Ext.EventObjectImpl} event Event object.
	 */
	onDocMouseDown: function(event) {
		var eventResult = this.fireEvent("beforeVisibilityChange", this,
			Terrasoft.controls.TipEnums.visibilityChangeEvent.HIDE_ON_DOCUMENT_MOUSE_DOWN, event);
		if (eventResult === false) {
			return;
		}
		if (!this.isEventWithin(event)) {
			this.hide();
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterRender
	 * @protected
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.adjustPosition();
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterReRender
	 * @protected
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.adjustPosition();
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#initRenderData
	 * @protected
	 * @override
	 */
	initRenderData: function(renderData) {
		this.callParent(arguments);
		renderData.tools = this.tools;
		renderData.renderTool = this.renderTool;
	},

	/**
	 * @inheritdoc Terrasoft.Component#getTplData
	 * @protected
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		var displayTools = (this.tools && this.tools.length > 0);
		var tipTplData = {
			content: this.content,
			wrapClass: this.getCombinedCssClasses(),
			toolsWrapClasses: [this.toolsWrapClass],
			displayTools: displayTools
		};
		tplData = Ext.apply(tplData, tipTplData);
		this.updateSelectors();
		return tplData;
	},

	/**
	 * Returns the CSS classes for the template.
	 * @protected
	 * @return {Array}
	 */
	getCombinedCssClasses: function() {
		var wrapClasses = ["tip"];
		wrapClasses.push(this.getModeClass());
		wrapClasses.push(this.getStyleClass());
		return wrapClasses;
	},

	/**
	 * Returns css class for mode based on current state.
	 * @protected
	 * @return {String} CSS class for current display mode.
	 */
	getModeClass: function() {
		var mode = this.displayMode || Terrasoft.controls.TipEnums.displayMode.WIDE;
		return "tip-display-mode-" + mode.toLowerCase();
	},

	/**
	 * Returns css class for style based on current state.
	 * @protected
	 * @return {String} css class for current style.
	 */
	getStyleClass: function() {
		var style = this.style || Terrasoft.controls.TipEnums.style.GREEN;
		return "tip-" + style.toLowerCase();
	},

	/**
	 * Implementing interface of Terrasoft.Component class. Updating selectors.
	 * @protected
	 * @return {Object} Selectors object.
	 */
	updateSelectors: function() {
		var id = "#" + this.id;
		this.selectors = {
			wrapEl: id + "-wrapEl",
			tipEl: id + "-wrapEl .tip-anchor",
			contentEl: id + "-content"
		};
	},

	/**
	 * Returns tip element.
	 * @protected
	 * @return {Ext.dom.Element}
	 */
	getTipEl: function() {
		return this.tipEl;
	},

	/**
	 * @inheritdoc Terrasoft.Alignable#applyAlignConfig
	 * @override
	 */
	applyAlignConfig: function(wrapEl, alignEl, alignConfig) {
		this.mixins.alignable.applyAlignConfig.apply(this, arguments);
		this.applyTipStyles(alignConfig);
	},

	/**
	 * Returns true if there is no content to display.
	 * @protected
	 * @return {Boolean}
	 */
	isContentEmpty: function() {
		return Ext.isEmpty(this.content) && this.items.getCount() === 0;
	},

	/**
	 * @inheritdoc Terrasoft.Component#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.clearTimer("showTimerId");
		this.clearTimer("hideTimerId");
		this.callParent(arguments);
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#bind
	 * @override
	 */
	bind: function() {
		this.callParent(arguments);
		Terrasoft.each(this.tools, function(tool) {
			tool.bind(this.model);
		}, this);
	},

	/**
	 * Set new value for content field and render component if need.
	 * @param {String} value Content of the visible tooltip text.
	 */
	setContent: function(value) {
		if (value !== this.content) {
			this.content = value;
			this.updateDirection(this.content);
			this.safeRerender();
		}
	},

	/**
	 * Set new value for style field and render component if need.
	 * @param {ENUM} value
	 */
	setStyle: function(value) {
		if (value !== this.style) {
			this.style = value;
			this.safeRerender();
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#setVisible
	 * @override
	 */
	setVisible: function(value) {
		if (value) {
			var alignEl = this.getAlignToEl();
			if (Ext.isEmpty(alignEl) || !alignEl.isVisible(true)) {
				return;
			}
			if (!this.enabled || this.isContentEmpty()) {
				return;
			}
		}
		this.callParent(arguments);
	},

	/**
	 * Set new value for showDelay field.
	 * @param {Number} value
	 */
	setShowDelay: function(value) {
		if (value !== this.showDelay) {
			this.showDelay = value;
		}
	},

	/**
	 * Returns binding configuration. Implements interface of {@link Terrasoft.Bindable} mixin.
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var tipBindConfig = {
			visible: {
				changeEvent: "visiblechanged",
				changeMethod: "setVisible"
			},
			content: {
				changeMethod: "setContent"
			},
			style: {
				changeMethod: "setStyle"
			},
			showDelay: {
				changeMethod: "setShowDelay"
			}
		};
		Ext.apply(bindConfig, tipBindConfig);
		return bindConfig;
	},

	/**
	 * Shows the tip.
	 * @param {Object} [config] Options.
	 * @param {Boolean} config.delayed If defined as true, tip will showed with delay
	 * defined in {@link #showDelay showDelay}.
	 */
	show: function(config) {
		this.clearTimer("hideTimerId");
		if (config && config.delayed) {
			this.showTimerId = Ext.defer(this.delayedShow, this.showDelay, this);
		} else {
			this.delayedShow();
		}
	},

	/**
	 * Hides the tip. If there is an active timeout it will be canceled.
	 * @param {Object} [config] Options.
	 * @param {Boolean} config.delayed  If defined as true, tip will hide when mouse leave wrapEl
	 * or after {@link #hideDelay hideDelay}.
	 */
	hide: function(config) {
		this.fireEvent("beforeVisibilityChange", this,
			Terrasoft.controls.TipEnums.visibilityChangeEvent.HIDE, null);
		this.clearTimer("showTimerId");
		if (config && config.delayed) {
			this.hideTimerId = Ext.defer(this.delayedHide, this.hideDelay, this);
		} else {
			this.delayedHide();
		}
	}

	//endregion
});
