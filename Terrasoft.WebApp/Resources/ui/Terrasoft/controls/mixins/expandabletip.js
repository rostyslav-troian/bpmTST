Ext.ns("Terrasoft.controls.TipEnums");
/**
 * @enum {string} Terrasoft.controls.TipEnums.displayEvent
 * Event to display tip.
 */
Terrasoft.controls.TipEnums.displayEvent = {

	/** Click. */
	CLICK: 2,

	/** Hover. */
	HOVER: 1,

	/** None. */
	NONE: -1
};

/**
 * Alias for {@link Terrasoft.controls.TipEnums.displayEvent}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.controls.TipEnums.displayEvent
 */
Terrasoft.TipDisplayEvent = Terrasoft.controls.TipEnums.displayEvent;

Ext.define("Terrasoft.controls.mixins.ExpandableTip", {
	alternateClassName: "Terrasoft.ExpandableTip",
	extend: "Terrasoft.BaseObject",

	//region Properties: Protected

	/**
	 * Collection of tips.
	 * @protected
	 * @type {Ext.util.MixedCollection}
	 */
	tips: null,

	/**
	 * Default class name for tip instance.
	 * @protected
	 */
	tipClassName: "Terrasoft.Tip",

	// endregion

	//region Properties: Public

	/**
	 * Content of hint.
	 * @type {String}
	 */
	hint: null,

	/**
	 * Additional tips settings.
	 * @type {Object}
	 */
	tipsConfig: null,

	//endregion

	//region Methods: Private

	/**
	 * Returns configuration object for DOM events subscription, based on passed displayEvent.
	 * @private
	 * @param {Terrasoft.Tip} tip Tip component.
	 * @param {ENUM} displayEvent Type of events which determine tip visibility. Terrasoft.TipDisplayEvent.HOVER used
	 * by default.
	 * @return {Object}
	 */
	getEventsConfig: function(tip, displayEvent) {
		if ((displayEvent & Terrasoft.TipDisplayEvent.NONE) === Terrasoft.TipDisplayEvent.NONE) {
			return null;
		}
		var eventsConfig;
		if ((displayEvent & Terrasoft.TipDisplayEvent.CLICK) === Terrasoft.TipDisplayEvent.CLICK) {
			eventsConfig = {
				click: {
					fn: this.onAlignToElClick.bind(this, tip)
				}
			};
		}
		if (Ext.isEmpty(displayEvent) ||
			(displayEvent & Terrasoft.TipDisplayEvent.HOVER) === Terrasoft.TipDisplayEvent.HOVER) {
			eventsConfig = Ext.merge(eventsConfig || {}, {
				mouseenter: {
					fn: this.onAlignToElMouseEnter.bind(this, tip)
				},
				mouseleave: {
					fn: this.onAlignToElMouseLeave.bind(this, tip)
				},
				mousedown: {
					fn: this.onAlignToElMouseDown.bind(this, tip),
					scope: this
				}
			});
		}
		return eventsConfig;
	},

	/**
	 * Handler for mousedown event on {@link #alignToEl}. Hides tooltip and prevents tip show while cursor is not moved.
	 * @param {Terrasoft.Tip} tip Tooltip instance.
	 * @param {Ext.EventObjectImpl} event Event object.
	 */
	onAlignToElMouseDown: function(tip, event) {
		this.lastMouseDownEventXY = event.getXY();
		if (this.getTipDisplaySourceEvent(tip) === Terrasoft.TipDisplayEvent.HOVER && this.isHideOnMouseDown(tip)) {
			tip.hide();
		}
	},

	/**
	 * Handler for beforeVisibilityChange event of tip instance.
	 * @private
	 * @param {Terrasoft.Tip} tip Tip instance.
	 * @param {Terrasoft.controls.TipEnums.visibilityChangeEvent} eventType Event type.
	 * @param {Ext.dom.Event} event DOM event thats lead to tip visibility change.
	 * @return {Boolean} false if tip must not change it's visibility state, otherwise returns undefined.
	 */
	onBeforeTipVisibilityChange: function(tip, eventType, event) {
		if (eventType === Terrasoft.controls.TipEnums.visibilityChangeEvent.HIDE_ON_DOCUMENT_MOUSE_DOWN &&
				this.getTipDisplaySourceEvent(tip) !== Terrasoft.TipDisplayEvent.CLICK &&
				!this.isHideOnMouseDown(tip) && event && this.isEventWithin(event)) {
			return false;
		} else if (eventType === Terrasoft.controls.TipEnums.visibilityChangeEvent.HIDE) {
			this.setTipDisplaySourceEvent(tip, null);
		}
	},

	/**
	 * Returns {@link Terrasoft.TipDisplayEvent} which was the reason for displaying tip.
	 * @private
	 * @param {Terrasoft.Tip} tip Tip instance.
	 * @return {Terrasoft.TipDisplayEvent}
	 */
	getTipDisplaySourceEvent: function(tip) {
		var tipConfig = this.tipsConfig[tip.id] || {};
		return tipConfig.displaySourceEvent;
	},

	/**
	 * Saves {@link Terrasoft.TipDisplayEvent} which was the reason for displaying tip.
	 * @private
	 * @param {Terrasoft.Tip} tip Tip instance.
	 * @param {Terrasoft.controls.TipEnums.displayEvent} displaySourceEvent Reason for displaying tip.
	 */
	setTipDisplaySourceEvent: function(tip, displaySourceEvent) {
		var tipConfig = this.tipsConfig[tip.id];
		tipConfig.displaySourceEvent = displaySourceEvent;
	},

	/**
	 * Returns true if tip need to be hidden when mousedown event is fired.
	 * @private
	 * @param {Terrasoft.Tip} tip Tip instance.
	 * @return {Boolean}
	 */
	isHideOnMouseDown: function(tip) {
		var result = true;
		var tipConfig = this.tipsConfig[tip.id] || {};
		if (Ext.isDefined(tipConfig.hideOnMouseDown)) {
			result = Boolean(tipConfig.hideOnMouseDown);
		}
		return result;
	},

	/**
	 * Handler for click event on {@link #alignToEl}. Shows tooltip.
	 * @param {Terrasoft.Tip} tip Tooltip instance.
	 */
	onAlignToElClick: function(tip) {
		this.setTipDisplaySourceEvent(tip, Terrasoft.TipDisplayEvent.CLICK);
		tip.show();
	},

	/**
	 * Handler for mouseenter event on {@link #alignToEl}. Shows tooltip if mouse moved after last mousedown event.
	 * @param {Terrasoft.Tip} tip Tooltip instance.
	 * @param {Ext.EventObjectImpl} event Event object.
	 */
	onAlignToElMouseEnter: function(tip, event) {
		var currentXY = event.getXY();
		var lastMouseDownXY = this.lastMouseDownEventXY;
		if (lastMouseDownXY && (currentXY[0] === lastMouseDownXY[0] && currentXY[1] === lastMouseDownXY[1])) {
			return;
		}
		this.setTipDisplaySourceEvent(tip, Terrasoft.TipDisplayEvent.HOVER);
		tip.show({delayed: true});
	},

	/**
	 * Handler for mouseleave event on {@link #alignToEl}. Hides tooltip.
	 * @param {Terrasoft.Tip} tip Tooltip instance.
	 */
	onAlignToElMouseLeave: function(tip) {
		if (this.getTipDisplaySourceEvent(tip) === Terrasoft.TipDisplayEvent.HOVER) {
			tip.hide({delayed: true});
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * Returns configuration of tip based on passed content value.
	 * @protected
	 * @param {Object} config Configuration for current component.
	 * @return {Object}
	 */
	getHintConfig: function(config) {
		return {
			tip: {
				className: this.tipClassName,
				displayMode: Terrasoft.TipDisplayMode.NARROW,
				content: config.hint,
				tag: config.tag,
				markerValue: config.hint
			},
			settings: {
				displayEvent: Terrasoft.TipDisplayEvent.HOVER
			}
		};
	},

	/**
	 * Initializes tip instance by passed configuration.
	 * @protected
	 * @throws {Terrasoft.ArgumentNullOrEmptyException}
	 * If tipConfig.settings is not defined.
	 * @param {Object} tipConfig Configuration of tip.
	 * @param {Object} tipConfig.tip Configuration of tip instance.
	 * @param {Object} [tipConfig.settings] Additional settings for tip.
	 */
	initTip: function(tipConfig) {
		var item = tipConfig.tip;
		if (!item) {
			throw new Terrasoft.ArgumentNullOrEmptyException({argumentName: "tipConfig.tip"});
		}
		var tip = (item.isComponent === true) ? item : Ext.create(item.className || this.tipClassName, item);
		var tipSettings = tipConfig.settings || {};
		tipSettings.eventsConfig = this.getEventsConfig(tip, tipSettings.displayEvent);
		this.tipsConfig[tip.id] = tipSettings;
		this.tips.add(tip);
		tip.on("beforeVisibilityChange", this.onBeforeTipVisibilityChange, this);
	},

	/**
	 * Method initializes events for current tips.
	 * @protected
	 */
	initDomEvents: function() {
		if (this.tips.getCount() === 0) {
			return;
		}
		this.tips.each(this.initTipEvents, this);
	},

	/**
	 * Performs unsubscribe DOM event listeners.
	 * @protected
	 */
	clearDomListeners: function() {
		if (this.tips.getCount() === 0) {
			return;
		}
		this.tips.each(function(tip) {
			var tipConfig = this.tipsConfig[tip.id];
			var alignEl = tip.alignToEl;
			if (alignEl && tipConfig.eventsConfig) {
				tip.alignToEl.un(tipConfig.eventsConfig);
			}
		}, this);
	},

	/**
	 * Returns align element for tip based on alignElMember which may be one of {@Link #selectors selectors} or method
	 * returns Ext.Element.
	 * @param tip {Terrasoft.Tip} Tip instance.
	 * @param alignElMember Name of the member that returns align element.
	 * @return {Ext.dom.Element}
	 */
	getAlignEl: function(tip, alignElMember) {
		var alignEl;
		if (alignElMember) {
			alignEl = this[alignElMember];
			if (Ext.isFunction(alignEl)) {
				alignEl = alignEl.call(this, tip.tag);
			}
		} else {
			alignEl = this.getWrapEl();
		}
		return alignEl;
	},

	/**
	 * Initialises DOM events for tip.
	 * @protected
	 * @param {Terrasoft.Tip} tip Tip component.
	 */
	initTipEvents: function(tip) {
		var tipConfig = this.tipsConfig[tip.id];
		var alignEl = this.getAlignEl(tip, tipConfig.alignEl);
		tip.alignToEl = alignEl;
		if (alignEl && tipConfig.eventsConfig) {
			alignEl.on(tipConfig.eventsConfig);
		}
	},

	/**
	 * Initializes tips.
	 * @protected
	 * @param {Object} config Configuration for current component.
	 */
	initTips: function(config) {
		var tips = config.tips || [];
		this.initHint(config, tips);
		delete config.tips;
		Terrasoft.each(tips, this.initTip, this);
	},

	/**
	 * Add configuration for tip that display config.hint as content.
	 * @param {Object} config Configuration for current component.
	 * @param {Object} [config.hint] Hint content.
	 * @param {Object} tipsConfig
	 */
	initHint: function(config, tipsConfig) {
		if (config.hint) {
			var hintConfig = this.getHintConfig(config);
			tipsConfig.push(hintConfig);
			delete config.hint;
		}
	},

	/**
	 * Method initializes tips for current component.
	 * Configuration for current component.
	 */
	constructor: function(config) {
		this.tips = new Ext.util.MixedCollection();
		this.tipsConfig = {};
		if (Ext.isEmpty(config)) {
			return;
		}
		this.initTips(config);
	},

	/**
	 * Binds the tip items to the model.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} model View model.
	 */
	bind: function(model) {
		this.tips.each(function(tip) {
			tip.bind(model);
		}, this);
	},

	/**
	 * Destroys tips.
	 * @protected
	 */
	destroy: function() {
		this.tips.each(function(tip) {
			tip.destroy();
		}, this);
	}

	//endregion

});
