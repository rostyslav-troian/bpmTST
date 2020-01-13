Terrasoft.configuration.Structures["AlignableContainer"] = {innerHierarchyStack: ["AlignableContainer"]};
define("AlignableContainer", ["css!AlignableContainer"], function() {

	/**
	 */
	Ext.define("Terrasoft.controls.AlignableContainer", {
		extend: "Terrasoft.controls.Container",
		alternateClassName: "Terrasoft.AlignableContainer",

		mixins: {
			alignable: "Terrasoft.Alignable"
		},

		messages: {
			"AdjustMiniPagePosition": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},

		/**
		 * Hide container on document events flag.
		 * @protected
		 * @type {Boolean}
		 */
		hideOnDocEvents: false,

		/**
		 * Default align type option.
		 * @protected
		 * @type {String[]}
		 */
		alignOrder: null,

		/**
		 * @inheritdoc Terrasoft.controls.Container#defaultRenderTpl
		 * @override
		 */
		defaultRenderTpl: [
			"<div>",
			"<div id=\"{id}\" style=\"{wrapStyles}\" class=\"{wrapClassName}\">",
			"{%this.renderItems(out, values)%}",
			"<span id=\"{id}-anchor\" class=\"alignable-container-anchor\"></span>",
			"</div>",
			"<div id=\"{id}-overlay\" class=\"alignable-container-overlay\" />",
			"</div>"
		],

		/**
		 * Displays container overlay.
		 * @type {Boolean}
		 * @private
		 */
		showOverlay: false,

		/**
		 * Determines wether alignable container allowed for adjusting its position.
		 */
		deferPositioningAllowed: false,

		/**
		 * Determines wether alignable container make positioning with defer by attribute value.
		 */
		useDeferredPositioning: false,

		/**
		 * Css class used for disable document scroll.
		 * @private
		 * @type {Boolean}
		 */
		disableDocScrollClass: "alignable-container-opened",

		/**
		 * Offsets for container.
		 */
		containerOffsets: {
			"top": {"y": 6},
			"bottom": {"y": -3}
		},

		/**
		 * Auto adjust size by parent container.
		 *
		 * Example:
		 *
		 * 1. Auto adjust size by width.
		 * {
		 *		width: true
		 * }
		 *
		 * 2. Auto adjust size by height.
		 * {
		 *		height: true
		 * }
		 *
		 * 3. Auto adjust size by width and height.
		 * {
		 *		width: true,
		 *		height: true
		 * }
		 * @private
		 * @type {Object}
		 */
		autoAdjustSize: null,

		/**
		 * @inheritdoc Terrasoft.Component#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initEvents();
		},

		/**
		 * Initialize events.
		 * @protected
		 */
		initEvents: function() {
			this.addEvents(
				"adjustposition",
				/**
				 * @event
				 * Triggers on hide container.
				 */
				"onHideContainer",
				/**
				 * @event
				 * Event handler for document keydown event.
				 */
				"onKeyDown"
			);
		},

		/**
		 * @inheritdoc Terrasoft.Component#init
		 * @override
		 */
		init: function() {
			this.callParent(arguments);
			this.on("adjustposition", this.adjustContainerPosition, this);
		},

		/**
		 * @inheritdoc Terrasoft.controls.Component#initDomEvents
		 * @override
		 */
		initDomEvents: function() {
			this.callParent(arguments);
			var doc = Ext.getDoc();
			doc.on("mousedown", this.hideContainer, this);
			doc.on("keydown", this.onKeyDown, this);
			var body = Ext.getBody();
			body.on("wheel", this.hideContainer, this);
		},

		/**
		 * @inheritdoc Terrasoft.controls.Component#clearDomListeners
		 * @override
		 */
		clearDomListeners: function() {
			this.callParent(arguments);
			var doc = Ext.getDoc();
			doc.un("mousedown", this.hideContainer, this);
			doc.un("keydown", this.onKeyDown, this);
			var body = Ext.getBody();
			body.un("wheel", this.hideContainer, this);
		},

		/**
		 * Event handler for document keydown event.
		 * @param {Ext.EventObjectImpl} event Event object.
		 */
		onKeyDown: function(event) {
			this.fireEvent("onKeyDown", this, event);
		},

		/**
		 * Hides alignable container.
		 * @param {Ext.EventObjectImpl} event Event object.
		 */
		hideContainer: function(event) {
			if (this.isEventWithin(event) || !this.visible) {
				return;
			}
			this.fireEvent("onHideContainer", this);
			if (this.hideOnDocEvents) {
				this.setVisible(false);
			}
		},

		/**
		 * @inheritdoc Terrasoft.controls.Component#setVisible
		 * @override
		 */
		setVisible: function(value) {
			this.callParent(arguments);
			if (!this.hideOnDocEvents) {
				return;
			}
			var bodyEl = Ext.getBody();
			if (value) {
				bodyEl.addCls(this.disableDocScrollClass);
			} else {
				bodyEl.removeCls(this.disableDocScrollClass);
			}
		},

		/**
		 * @inheritdoc Terrasoft.alignable#getAlignOrder
		 * @override
		 */
		getAlignOrder: function() {
			var orderedTypes = this.alignOrder || [
				Terrasoft.AlignType.BOTTOM,
				Terrasoft.AlignType.TOP,
				Terrasoft.AlignType.RIGHT,
				Terrasoft.AlignType.LEFT
			];
			return orderedTypes;
		},

		/**
		 * @private
		 */
		_getDeferredPositioningAllowed: function() {
			if (this.useDeferredPositioning) {
				return this.deferPositioningAllowed;
			} else {
				return true;
			}
		},

		/**
		 * @inheritdoc Terrasoft.alignable#applyAlignConfig
		 * @override
		 */
		applyAlignConfig: function(wrapEl, alignToEl, alignConfig) {
			if (!this._getDeferredPositioningAllowed()) {
				return;
			}
			this.setContainerOffset(alignConfig);
			if (this.alignConfig && Ext.isDefined(this.alignConfig.className)) {
				alignConfig.alignConfig = this.alignConfig.alignConfig;
				alignConfig.className = this.alignConfig.className;
				alignConfig.alignType = this.alignConfig.alignType;
				alignConfig.offset = this.alignConfig.offset;
			} else {
				wrapEl.addCls(alignConfig.className);
			}
			this.alignConfig = alignConfig;
			if (alignToEl && alignConfig) {
				wrapEl.alignTo(alignToEl, alignConfig.alignType, [alignConfig.offset.x, alignConfig.offset.y], false);
			}
		},

		/**
		 * Applies positioning to the element.
		 * @protected
		 * @param {Object} config Configuration object.
		 * @param {Object} [config.hasVerticalCenterPosition] Set container position to center of document height if true.
		 * @param {Object} [config.hasCenterPosition] Set container position to center if true.
		 */
		adjustContainerPosition: function(config) {
			if (!this._getDeferredPositioningAllowed()) {
				return;
			}
			if (!this.alignToEl || (config && config.hasCenterPosition)) {
				var wrapEl = this.getWrapEl();
				if (wrapEl) {
					wrapEl.center();
				}
			} else if (config && config.hasVerticalCenterPosition) {
				this.setVerticalCenterPosition();
			} else {
				this.adjustPosition();
			}
		},

		/**
		 * Applies width to the element.
		 * @protected
		 */
		adjustContainerSize: function() {
			if (this.alignToEl && this.autoAdjustSize) {
				if (this.autoAdjustSize.width) {
					this._adjustContainerWidth();
				}
				if (this.autoAdjustSize.height) {
					this._adjustContainerHeight();
				}
			}
		},

		/**
		 * Method set to align config offset for AlignableContainer.
		 * @param {Object} config Configuration object.
		 * @param {Object} config.offset Value for offset along X and Y axis in px.
		 * @param {String} config.alignType Container align type.
		 */
		setContainerOffset: function(config) {
			var alignConfig = config.alignConfig;
			if (alignConfig && alignConfig.alignType) {
				var alignType = this._getAlignTypeByPageDirection(alignConfig.alignType);
				var offset = this.containerOffsets[alignType];
				if (offset) {
					config.offset.y = offset.y ? offset.y : 0;
					config.offset.x = offset.x ? (Terrasoft.getIsRtlMode() ? -offset.x : offset.x) : 0;
				}
			}
		},

		/**
		 * @inheritdoc Terrasoft.Component#getTplData
		 * @override
		 */
		getTplData: function() {
			var tplData = this.callParent(arguments);
			var classes = tplData.self.classes || {wrapClassName: []};
			var wrapClasses = classes.wrapClassName || [];
			wrapClasses.push("alignable-container");
			if (this.showOverlay) {
				wrapClasses.push("show-overlay");
			}
			return Ext.apply(tplData, classes);
		},

		/**
		 * @inheritdoc Terrasoft.Component#onAfterRender
		 * @override
		 */
		onAfterRender: function() {
			this.callParent(arguments);
			this.adjustContainerPosition();
			this.adjustContainerSize();
		},

		/**
		 * @inheritdoc Terrasoft.Component#onAfterReRender
		 * @override
		 */
		onAfterReRender: function() {
			this.callParent(arguments);
			this.adjustContainerPosition();
			this.adjustContainerSize();
		},

		/**
		 * Method sets align of wrapEl to alignEl.
		 * @param {String} alignToElId Id of element to align.
		 */
		setAlignToEl: function(alignToElId) {
			var alignEl = Ext.get(alignToElId);
			this.alignToEl = alignEl;
			if (this.allowRerender()) {
				this.adjustContainerPosition();
			}
		},

		/**
		 * Sets hideOnDocEvents property value.
		 * @param {Boolean} value Value.
		 */
		setHideOnDocEvents: function(value) {
			this.hideOnDocEvents = value;
		},

		/**
		 * Show or hide element overlay.
		 * @protected
		 * @param {Boolean} visible Whether the element overlay is visible.
		 */
		setOverlayVisibility: function(visible) {
			var wrapEl = this.getWrapEl();
			if (wrapEl) {
				if (visible) {
					wrapEl.addCls("show-overlay");
				} else {
					wrapEl.removeCls("show-overlay");
				}
			}
			this.showOverlay = visible;
		},

		/**
		 * Sets deferPositioningAllowed property value.
		 * @param {Boolean} allow Value of the property.
		 */
		setDeferredPositioningAllowed: function(allow) {
			if (!this.useDeferredPositioning) {
				return;
			}
			if (this.deferPositioningAllowed === allow) {
				return;
			}
			var wrapEl = this.getWrapEl();
			this.deferPositioningAllowed = allow;
			if (wrapEl) {
				this.adjustContainerPosition();
				this.adjustContainerSize();
			}
		},

		/**
		 * Returns binding configuration. Implements interface of {@link Terrasoft.Bindable} mixin.
		 * @override
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var config = {
				hideOnDocEvents: {
					changeMethod: "setHideOnDocEvents"
				},
				alignToEl: {
					changeMethod: "setAlignToEl"
				},
				showOverlay: {
					changeMethod: "setOverlayVisibility"
				},
				deferPositioningAllowed: {
					changeMethod: "setDeferredPositioningAllowed"
				}
			};
			Ext.apply(bindConfig, config);
			return bindConfig;
		},

		// region Methods: Private

		/**
		 * Applies width to the element.
		 * @private
		 */
		_adjustContainerWidth: function() {
			var width = this.alignToEl.getWidth();
			var wrapEl = this.getWrapEl();
			wrapEl.applyStyles({
				"width": width + "px"
			});
		},

		/**
		 * Applies height to the element.
		 * @private
		 */
		_adjustContainerHeight: function() {
			var height = this.alignToEl.getHeight();
			var wrapEl = this.getWrapEl();
			wrapEl.applyStyles({
				"height": height + "px"
			});
		},

		/**
		 * Returns container align type by page direction
		 * @private
		 * @param {String} alignType Container align type.
		 * @return {String} Container align type by page direction.
		 */
		_getAlignTypeByPageDirection: function(alignType) {
			if (!Terrasoft.getIsRtlMode()) {
				return alignType;
			}
			switch (alignType) {
				case Terrasoft.AlignType.LEFT: {
					return Terrasoft.AlignType.RIGHT;
				}
				case Terrasoft.AlignType.RIGHT: {
					return Terrasoft.AlignType.LEFT;
				}
				default: {
					return alignType;
				}
			}
		},

		/**
		 * Sets container position in center of document height.
		 * @private
		 */
		setVerticalCenterPosition: function() {
			var documentWidth = document.body.clientWidth;
			var container = this.getWrapEl();
			var offset = container.getLeft() - documentWidth / 2 + container.getWidth() / 2;
			container.alignTo(document, "c-c", [offset, 0]);
		}

		// endregion
	});
});


