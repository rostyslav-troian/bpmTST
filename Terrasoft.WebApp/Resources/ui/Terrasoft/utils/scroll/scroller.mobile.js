Ext.ns("Terrasoft.utils.scroll");

/**
 * Directions for scrolling
 * @enum
 */
Terrasoft.utils.scroll.ScrollerDirection = {
	Both: 0,
	Vertical: 1,
	Horizontal: 2,
	Auto: 3
};

/**
 * short notation for {@link Terrasoft.utils.scroll.ScrollerDirection}
 * @member Terrasoft
 * @inheritdoc Terrasoft.utils.scroll.ScrollerDirectione
 */
Terrasoft.utils.ScrollerDirection = Terrasoft.utils.scroll.ScrollerDirection;

Ext.define("Terrasoft.utils.scroll.Scroller", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.utils.Scroller",

	//region Properties: Private

	/**
	 * Coordinates of the minimum position
	 * @private
	 * @type {Object}
	 */
	minPosition: null,

	/**
	 * Coordinates of the initial position
	 * @private
	 * @type {Object}
	 */
	startPosition: null,

	/**
	 * Coordinates of the current position
	 * @private
	 * @type {Object}
	 */
	position: null,

	/**
	 * Scrolling speed along axes
	 * @private
	 * @type {Object}
	 */
	velocity: null,

	/**
	 * Scroll axes enabled
	 * @private
	 * @type {Object}
	 */
	isAxisEnabledFlags: null,

	/**
	 * @private
	 * @type {Object}
	 */
	flickStartPosition: null,

	/**
	 * @private
	 * @type {Object}
	 */
	flickStartTime: null,

	/**
	 * Coordinates of the last position
	 * @private
	 * @type {Object}
	 */
	lastDragPosition: null,

	/**
	 * Axis direction when dragging
	 * @private
	 * @type {Object}
	 */
	dragDirection: null,

	/**
	 * The flag specifies whether the element is dragged
	 * @private
	 * @type {Boolean}
	 */
	isDragging: null,

	/**
	 * The flag determines whether a touch is made to an element
	 * @private
	 * @type {Boolean}
	 */
	isTouching: null,

	/**
	 * Time of start dragging
	 * @private
	 * @type {Number}
	 */
	dragStartTime: 0,

	/**
	 * Time of ending the dragging
	 * @private
	 * @type {Number}
	 */
	dragEndTime: 0,

	/**
	 * Instance of class {@link Ext.util.Translatable}
	 * @private
	 * @type {Ext.util.Translatable}
	 */
	translatable: null,

	/**
	 * Instances of the class{@link Ext.fx.easing.EaseOut} by axes
	 * @private
	 * @type {Object}
	 */
	bounceEasing: null,

	/**
	 * The size of the item's container
	 * @private
	 * @type {Object}
	 */
	containerSize: null,

	/**
	 * Element size
	 * @private
	 * @type {Object}
	 */
	size: null,

	/**
	 * Instance of class {@link Ext.util.SizeMonitor} for element container
	 * @private
	 * @type {Ext.util.SizeMonitor}
	 */
	elementContainerSizeMonitor: null,

	/**
	 * Instance of class {@link Ext.util.SizeMonitor} for element
	 * @private
	 * @type {Ext.util.SizeMonitor}
	 */
	elementSizeMonitor: null,

	/**
	 * Css-class of the container element
	 * @private
	 * @type {String}
	 */
	containerCls: "scroll-container",

	/**
	 * Css-class of the scrolling element
	 * @private
	 * @type {String}
	 */
	scrollerCls: "scroll-scroller",

	/**
	 * Css-class element with vertical scrolling
	 * @private
	 * @type {String}
	 */
	verticalCls: "scroller-vertical",

	/**
	 * Css-class element with horizontal scrolling
	 * @private
	 * @type {String}
	 */
	horizontalCls: "scroller-horizontal",

	/**
	 * Scrolling Element
	 * @private
	 * @type {Object}
	 */
	element: null,

	/**
	 * Scrolling element container
	 * @private
	 * @type {Object}
	 */
	container: null,

	//endregion

	//region Properties: Public

	/**
	 * Is the direction of the scrolling blocked?
	 * @type {Boolean}
	 */
	directionLock: false,

	/**
	 * Limit coefficient of the limit beyond the borders
	 * @type {Number}
	 */
	outOfBoundRestrictFactor: 0.5,

	/**
	 * Initial reset time
	 * @type {Number}
	 */
	startMomentumResetTime: 300,

	/**
	 * Max. Speed
	 * @type {Number}
	 */
	maxAbsoluteVelocity: 6,

	/**
	 * Direction of scrolling
	 * @type {Terrasoft.utils.ScrollerDirection}
	 */
	direction: Terrasoft.utils.ScrollerDirection.Vertical,

	//endregion

	//region Methods: Private

	/**
	 * Initializes scrolling based on the element.
	 * @private
	 * @param {Object} element The DOM element.
	 */
	setElement: function(element) {
		if (!element) {
			return;
		}
		this.element = Ext.get(element);
		this.initialize();
	},

	/**
	 * Initializes scrolling.
	 * @private
	 */
	initialize: function() {
		this.initElement();
		this.initElementContainer();
		this.initDirection();
		this.initTranslatable();
		this.initBounceEasing();
		this.initMomentumEasing();
	},

	/**
	 * Initializes an element
	 * @private
	 */
	initElement: function() {
		var element = this.element;
		element.addCls(this.scrollerCls);
		this.elementSizeMonitor = new Ext.util.SizeMonitor({
			element: element,
			callback: this.onElementResize,
			scope: this,
			args: [element]
		});
		this.attachElementListeners(true);
	},

	/**
	 * Initializes the container element
	 * @private
	 */
	initElementContainer: function() {
		var element = this.element;
		var container = this.container = element.getParent();
		container.addCls(this.containerCls);
		this.elementContainerSizeMonitor = new Ext.util.SizeMonitor({
			element: container,
			callback: this.onContainerElementResize,
			scope: this,
			args: [container]
		});
		this.attachContainerListeners(true);
	},

	/**
	 * Subscribes/unsubscribes events for an item
	 * @private
	 * @param {Boolean} isAttach If true - subscribe
	 */
	attachElementListeners: function(isAttach) {
		var listeners = {
			painted: "onElementPainted",
			scope: this
		};
		if (isAttach) {
			this.element.on(listeners);
		} else {
			this.element.un(listeners);
		}
	},

	/**
	 * Subscribes/unsubscribes container container events
	 * @private
	 * @param {Boolean} isAttach If true - subscribe
	 */
	attachContainerListeners: function(isAttach) {
		var listeners = {
			touchstart: "onTouchStart",
			touchend: "onTouchEnd",
			dragstart: "onDragStart",
			drag: "onDrag",
			dragend: "onDragEnd",
			painted: "onContainerElementPainted",
			scope: this
		};
		if (isAttach) {
			this.container.on(listeners);
		} else {
			this.container.un(listeners);
		}
	},

	/**
	 * Initializes the direction of scrolling
	 * @private
	 */
	initDirection: function() {
		var element = this.element;
		var direction = this.direction;
		var isAxisEnabledFlags = this.isAxisEnabledFlags;
		isAxisEnabledFlags.x = this.isAxisEnabledFlags.y = false;
		if (direction === Terrasoft.utils.ScrollerDirection.Both ||
			direction === Terrasoft.utils.ScrollerDirection.Horizontal) {
			isAxisEnabledFlags.x = true;
			element.addCls(this.horizontalCls);
		}
		if (direction === Terrasoft.utils.ScrollerDirection.Both ||
			direction === Terrasoft.utils.ScrollerDirection.Vertical) {
			isAxisEnabledFlags.y = true;
			element.addCls(this.verticalCls);
		}
	},

	/**
	 * Creates the {@link Ext.util.Translatable} class
	 * @private
	 */
	initTranslatable: function() {
		this.translatable = Ext.create("Ext.util.Translatable", {
			element: this.element,
			translationMethod: "auto",
			useWrapper: false,
			listeners: {
				animationframe: "onAnimationFrame",
				animationend: "onAnimationEnd",
				scope: this
			}
		});
	},

	/**
	 * Creates the {@link Ext.fx.easing.EaseOut}  classes by axis
	 * @private
	 */
	initBounceEasing: function() {
		var defaultClass = Ext.fx.easing.EaseOut;
		var bounceEasingConfig = {
			duration: 400
		};
		var bounceEasing = this.bounceEasing = {
			x: Ext.create(defaultClass, bounceEasingConfig),
			y: Ext.create(defaultClass, bounceEasingConfig)
		};
		this.translatable.setEasingX(bounceEasing.x).setEasingY(bounceEasing.y);
	},

	/**
	 * Creates classes {@link Ext.fx.easing.BoundMomentum} by axis
	 * @private
	 */
	initMomentumEasing: function() {
		var defaultClass = Ext.fx.easing.BoundMomentum;
		var momentumEasingConfig = {
			momentum: {
				acceleration: 30,
				friction: 0.5
			},
			bounce: {
				acceleration: 30,
				springTension: 0.3
			},
			minVelocity: 1
		};
		this.momentumEasing = {
			x: Ext.create(defaultClass, momentumEasingConfig),
			y: Ext.create(defaultClass, momentumEasingConfig)
		};
	},

	/**
	 * The "painted" event handler
	 * @private
	 */
	onElementPainted: function() {
		this.elementSizeMonitor.forceRefresh();
	},

	/**
	 * The "resize" event handler
	 * @private
	 * @param {Object} element
	 * @param {Object} info
	 */
	onElementResize: function(element, info) {
		this.size = {
			x: info.width,
			y: info.height
		};
		this.refresh();
	},

	/**
	 * The "painted" element container's event handler
	 * @private
	 */
	onContainerElementPainted: function() {
		this.elementContainerSizeMonitor.forceRefresh();
	},

	/**
	 * The container event handler for the "resize" element
	 * @private
	 * @param {Object} container
	 * @param {Object} info
	 */
	onContainerElementResize: function(container, info) {
		this.containerSize = {
			x: info.width,
			y: info.height
		};
		this.refresh();
	},

	/**
	 * The "touchstart" event handler
	 * @private
	 */
	onTouchStart: function() {
		this.isTouching = true;
		this.stopAnimation();
	},

	/**
	 * The "touchend" event handler
	 * @private
	 */
	onTouchEnd: function() {
		this.isTouching = false;
		if (!this.isDragging) {
			var position = this.position;
			this.fireEvent("scrollstart", this, position.x, position.y);
		}
	},

	/**
	 * The "dragstart" event handler
	 * @private
	 * @param {Object} e
	 */
	onDragStart: function(e) {
		var direction = this.direction;
		var absDeltaX = e.absDeltaX;
		var absDeltaY = e.absDeltaY;
		var startPosition = this.startPosition;
		var flickStartPosition = this.flickStartPosition;
		var flickStartTime = this.flickStartTime;
		var lastDragPosition = this.lastDragPosition;
		var currentPosition = this.position;
		var dragDirection = this.dragDirection;
		this.isDragging = true;
		var scrollDirection = Terrasoft.utils.ScrollerDirection;
		if (this.directionLock && direction !== scrollDirection.Both) {
			if ((direction === scrollDirection.Horizontal && absDeltaX > absDeltaY) ||
				(direction === scrollDirection.Vertical && absDeltaY > absDeltaX)) {
				e.stopPropagation();
			} else {
				this.isDragging = false;
				return;
			}
		}
		var x = lastDragPosition.x = startPosition.x = flickStartPosition.x = currentPosition.x;
		var y = lastDragPosition.y = startPosition.y = flickStartPosition.y = currentPosition.y;
		flickStartTime.x = flickStartTime.y = this.dragStartTime = Ext.Date.now();
		dragDirection.x = dragDirection.y = 0;
		this.isDragging = true;
		this.fireEvent("scrollstart", this, x, y);
	},

	/**
	 * The "dragstart" event handler
	 * @private
	 * @param {Object} e
	 */
	onDrag: function(e) {
		if (!this.isDragging) {
			return;
		}
		var lastDragPosition = this.lastDragPosition;
		this.onAxisDrag("x", e.deltaX);
		this.onAxisDrag("y", e.deltaY);
		this.scrollTo(lastDragPosition.x, lastDragPosition.y);
	},

	/**
	 * The "dragstart" event handler
	 * @private
	 * @param {String} axis
	 * @param {Number} delta
	 */
	onAxisDrag: function(axis, delta) {
		if (!this.isAxisEnabled(axis)) {
			return;
		}
		var dragDirection = this.dragDirection;
		var oldPosition = this.position[axis];
		var minPosition = this.getMinPosition()[axis];
		var maxPosition = this.getMaxPosition()[axis];
		var startPosition = this.startPosition[axis];
		var lastDragPosition = this.lastDragPosition[axis];
		var currentPosition = startPosition - delta;
		var lastDirection = dragDirection[axis];
		var restrictFactor = this.outOfBoundRestrictFactor;
		var startMomentumResetTime = this.startMomentumResetTime;
		var flickStartTime = this.flickStartTime;
		var now = Ext.Date.now();
		var distance;
		if (currentPosition < minPosition) {
			currentPosition *= restrictFactor;
		}
		else if (currentPosition > maxPosition) {
			distance = currentPosition - maxPosition;
			currentPosition = maxPosition + distance * restrictFactor;
		}
		if (currentPosition > lastDragPosition) {
			dragDirection[axis] = 1;
		}
		else if (currentPosition < lastDragPosition) {
			dragDirection[axis] = -1;
		}
		if ((lastDirection !== 0 && (dragDirection[axis] !== lastDirection)) ||
			(now - flickStartTime[axis]) > startMomentumResetTime) {
			this.flickStartPosition[axis] = oldPosition;
			flickStartTime[axis] = now;
		}
		this.lastDragPosition[axis] = currentPosition;
	},

	/**
	 * The "dragend" event handler
	 * @private
	 * @param {Object} e
	 */
	onDragEnd: function(e) {
		if (!this.isDragging) {
			return;
		}
		this.dragEndTime = Ext.Date.now();
		this.onDrag(e);
		this.isDragging = false;
		var easingX = this.getAnimationEasing("x", e);
		var easingY = this.getAnimationEasing("y", e);
		if (easingX || easingY) {
			this.translatable.animate(easingX, easingY);
		} else {
			this.onScrollEnd();
		}
	},

	/**
	 * The "scrollend" event handler
	 * @private
	 */
	onScrollEnd: function() {
		if (this.isTouching) {
			var position = this.position;
			this.fireEvent("scrollend", this, position.x, position.y);
		}
	},

	/**
	 * The "animationframe" event handler
	 * @private
	 * @param {Object} translatable
	 * @param {Number} x
	 * @param {Number} y
	 */
	onAnimationFrame: function(translatable, x, y) {
		var position = this.position;
		position.x = -x;
		position.y = -y;
		this.fireEvent("scroll", this, position.x, position.y);
	},

	/**
	 * The "animationend" event handler
	 * @private
	 */
	onAnimationEnd: function() {
		this.snapToBoundary();
		this.onScrollEnd();
	},

	/**
	 * Stops the animation
	 * @private
	 */
	stopAnimation: function() {
		this.translatable.stopAnimation();
	},

	/**
	 * gets the #bounceEasing value by axis
	 * @private
	 * @param {String} axis
	 * @param {Object} e
	 * @return {Ext.fx.easing.EaseOut}
	 */
	getAnimationEasing: function(axis, e) {
		if (!this.isAxisEnabled(axis)) {
			return null;
		}
		var currentPosition = this.position[axis];
		var minPosition = this.getMinPosition()[axis];
		var maxPosition = this.getMaxPosition()[axis];
		var maxAbsoluteVelocity = this.maxAbsoluteVelocity;
		var boundValue = null;
		var dragEndTime = this.dragEndTime;
		var velocity = e.flick.velocity[axis];
		if (currentPosition < minPosition) {
			boundValue = minPosition;
		} else if (currentPosition > maxPosition) {
			boundValue = maxPosition;
		}
		var easing;
		if (boundValue !== null) {
			easing = this.bounceEasing[axis];
			easing.setConfig({
				startTime: dragEndTime,
				startValue: -currentPosition,
				endValue: -boundValue
			});
			return easing;
		}
		if (velocity === 0) {
			return null;
		}
		if (velocity < -maxAbsoluteVelocity) {
			velocity = -maxAbsoluteVelocity;
		} else if (velocity > maxAbsoluteVelocity) {
			velocity = maxAbsoluteVelocity;
		}
		if (Ext.browser.is.IE) {
			velocity *= 2;
		}
		easing = this.momentumEasing[axis];
		easing.setConfig({
			startTime: dragEndTime,
			startValue: -currentPosition,
			startVelocity: velocity * 1.5,
			minMomentumValue: -maxPosition,
			maxMomentumValue: 0
		});
		return easing;
	},

	/**
	 * Gets #minPosition
	 * @private
	 * @return {Object}
	 */
	getMinPosition: function() {
		var minPosition = this.minPosition;
		if (!minPosition) {
			this.minPosition = minPosition = {
				x: 0,
				y: 0
			};
			this.fireEvent("minpositionchange", this, minPosition);
		}
		return minPosition;
	},

	/**
	 * Gets #maxPosition
	 * @private
	 * @return {Object}
	 */
	getMaxPosition: function() {
		var maxPosition = this.maxPosition;
		if (!maxPosition) {
			var size = this.getSize();
			var containerSize = this.getContainerSize();
			this.maxPosition = maxPosition = {
				x: Math.max(0, size.x - containerSize.x),
				y: Math.max(0, size.y - containerSize.y)
			};
			this.fireEvent("maxpositionchange", this, maxPosition);
		}
		return maxPosition;
	},

	/**
	 * Gets #containerSize
	 * @private
	 * @return {Object}
	 */
	getContainerSize: function() {
		var containerSize = this.containerSize;
		var containerDom = this.container.dom;
		if (!containerSize && containerDom) {
			containerSize = this.containerSize = {
				x: containerDom.offsetWidth,
				y: containerDom.offsetHeight
			};
		}
		return containerSize;
	},

	/**
	 * Gets #size
	 * @private
	 * @return {Object}
	 */
	getSize: function() {
		var size = this.size;
		var dom = this.element.dom;
		if (!size && dom) {
			size = this.size = {
				x: dom.offsetWidth,
				y: dom.offsetHeight
			};
		}
		return size;
	},

	/**
	 * Scrolls to the border
	 * @private
	 */
	snapToBoundary: function() {
		var position = this.position;
		var x = Math.round(position.x);
		var y = Math.round(position.y);
		var minPosition = this.getMinPosition();
		var maxPosition = this.getMaxPosition();
		var minX = minPosition.x;
		var minY = minPosition.y;
		var maxX = maxPosition.x;
		var maxY = maxPosition.y;
		if (x < minX) {
			x = minX;
		} else if (x > maxX) {
			x = maxX;
		}
		if (y < minY) {
			y = minY;
		} else if (y > maxY) {
			y = maxY;
		}
		this.scrollTo(x, y);
	},

	/**
	 * Checks if the specified axis is turned on
	 * @private
	 * @return {Boolean}
	 */
	isAxisEnabled: function(axis) {
		return this.isAxisEnabledFlags[axis];
	},

	/**
	 * Updates the maximum scrolling position
	 * @private
	 */
	refreshMaxPosition: function() {
		this.maxPosition = null;
		this.getMaxPosition();
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @protected
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.minPosition = {x: 0, y: 0};
		this.startPosition = {x: 0, y: 0};
		this.position = {x: 0, y: 0};
		this.velocity = {x: 0, y: 0};
		this.isAxisEnabledFlags = {x: false, y: false};
		this.flickStartPosition = {x: 0, y: 0};
		this.flickStartTime = {x: 0, y: 0};
		this.lastDragPosition = {x: 0, y: 0};
		this.dragDirection = {x: 0, y: 0};
		this.on("maxpositionchange", "snapToBoundary");
		this.on("minpositionchange", "snapToBoundary");
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#onDestroy
	 * @override
	 */
	onDestroy: function() {
		var element = this.element;
		if (element && !element.isDestroyed) {
			element.removeCls([this.scrollerCls, this.verticalCls, this.horizontalCls]);
			this.attachElementListeners(false);
			var container = this.container;
			if (container && !container.isDestroyed) {
				container.removeCls(this.containerCls);
				this.attachContainerListeners(false);
			}
		}
		Ext.destroy(this.elementSizeMonitor);
		Ext.destroy(this.elementContainerSizeMonitor);
		Ext.destroy(this.translatable);
		this.callParent(arguments);
	},

	//endregion

	//region Methods: Public

	/**
	 * Scrolls the element through the specified coordinates
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Object} animation
	 */
	scrollTo: function(x, y, animation) {
		if (this.destroyed) {
			return this;
		}
		var translatable = this.translatable;
		var position = this.position;
		var positionChanged = false;
		var translationX;
		var translationY;
		if (this.isAxisEnabled("x")) {
			if (isNaN(x) || typeof x !== "number") {
				x = position.x;
			} else {
				if (position.x !== x) {
					position.x = x;
					positionChanged = true;
				}
			}
			translationX = -x;
		}
		if (this.isAxisEnabled("y")) {
			if (isNaN(y) || typeof y !== "number") {
				y = position.y;
			} else {
				if (position.y !== y) {
					position.y = y;
					positionChanged = true;
				}
			}
			translationY = -y;
		}
		if (positionChanged) {
			if (animation !== undefined && animation !== false) {
				translatable.translateAnimated(translationX, translationY, animation);
			} else {
				this.fireEvent("scroll", this, position.x, position.y);
				translatable.translate(translationX, translationY);
			}
		}
		return this;
	},

	/**
	 * Returns a reference to the scroll element
	 * @return {Object}
	 */
	getElement: function() {
		return this.element;
	},

	/**
	 * Updates the scrolling parameters
	 */
	refresh: function() {
		this.stopAnimation();
		this.translatable.refresh();
		this.refreshMaxPosition();
		this.fireEvent("refresh", this);
	}

	//endregion

});
