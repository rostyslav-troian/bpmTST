Ext.ns("Terrasoft.controls.mixins.enums");

/**
 * @enum {string} Terrasoft.controls.mixins.enums.ResizeAction
 * Resize action enumerations.
 */
Terrasoft.controls.mixins.enums.ResizeAction = {
	/** Resize the top side. */
	RESIZE_TOP: {
		code: 1,
		value: "n"
	},
	/** Resize the top right side. */
	RESIZE_TOP_RIGHT: {
		code: 2,
		value: "ne"
	},
	/** Resize the right side. */
	RESIZE_RIGHT: {
		code: 4,
		value: "e"
	},
	/** Resize the bottom right side. */
	RESIZE_BOTTOM_RIGHT: {
		code: 8,
		value: "se"
	},
	/** Resize the bottom side. */
	RESIZE_BOTTOM: {
		code: 16,
		value: "s"
	},
	/** Resize the bottom left side. */
	RESIZE_BOTTOM_LEFT: {
		code: 32,
		value: "sw"
	},
	/** Resize the left side. */
	RESIZE_LEFT: {
		code: 64,
		value: "w"
	},
	/** Resize the top left side. */
	RESIZE_TOP_LEFT: {
		code: 128,
		value: "nw"
	},
	/** Resize all allowed sides. */
	ALL: {
		code: 255,
		value: "all"
	}
};

/**
 * Acronym for {@link Terrasoft.controls.mixins.enums.ResizeAction}
 * @member Terrasoft
 * @inheritdoc Terrasoft.controls.mixins.enums.ResizeAction
 */
Terrasoft.ResizeAction = Terrasoft.controls.mixins.enums.ResizeAction;

/**
 * Mixin that allows resize the element.
 * Example how to mixed this to arbitrary element.
 * <pre><code>
 * 		Ext.create("Terrasoft.MyElement", {
 * 			mixins: {
 * 				resizable: "Terrasoft.Resizable"
 * 			},
 * 			...
 *		});
 * </code></pre>
 */
Ext.define("Terrasoft.controls.mixins.Resizable", {
	alternateClassName: "Terrasoft.Resizable",
	extend: "Terrasoft.BaseObject",

	//region Fields: Private

	/**
	 * Element resizer.
	 * @private
	 * @type {Object}
	 */
	resizer: null,

	/**
	 * {@link Ext.resizer.Resizer} options.
	 * @private
	 * @type {Object}
	 */
	resizerConfig: null,

	//endregion

	//region Fields: Protected

	/**
	 * <pre>
	 * Code to resize actions.
	 * Range 2^8 (8 - actions count).
	 * Determination of available actions is performed on the principle of imposing a bitmask.
	 * Operations order:
	 * - Resize top - 0,
	 * - Resize top right - 1,
	 * - Resize right - 2,
	 * - Resize bottom right - 3,
	 * - Resize bottom - 4,
	 * - Resize bottom left - 5,
	 * - Resize left - 6,
	 * - Resize top left - 7.
	 *
	 * Example:
	 * 1. Need resize vertical sides of the element.
	 * Decision:
	 * Bit mask of our actions:
	 * |7|6|5|4|3|2|1|0|
	 * |0|0|0|1|0|0|0|1|
	 * 00010001 = 17
	 * Or Terrasoft.ResizeAction.TOP.code | Terrasoft.ResizeAction.BOTTOM.code = 1 + 16 = 17
	 * </pre>
	 * @protected
	 * @type {Number}
	 */
	resizeActionsCode: 255,

	//endregion

	//region Fields: Public

	/**
	 * Indicates that item is resizable.
	 * @type {Boolean}
	 */
	resizable: false,

	//endregion

	//region Methods: Private

	/**
	 * Returns resize actions.
	 * @private
	 * @return {String}
	 */
	getResizeActions: function() {
		/*jshint bitwise:false */
		var actions = Ext.emptyString;
		Terrasoft.each(Terrasoft.ResizeAction, function(resizeAction) {
			if ((this.resizeActionsCode & resizeAction.code) === resizeAction.code) {
				actions += Ext.String.format("{0} ", resizeAction.value);
			}
		}, this);
		return actions.trim();
		/*jshint bitwise:true */
	},

	/**
	 * Initializes element resizer events.
	 * @private
	 */
	initElementResizerEvents: function() {
		this.resizer.on("resize", this.onResize, this);
		this.resizer.on("resizedrag", this.onResizeDrag, this);
	},

	/**
	 * Initializes resizable element start size.
	 * @private
	 */
	initElementStartSize: function() {
		var resizer = this.resizer;
		var initialSize = {
			width: resizer.width,
			height: resizer.height
		};
		this.fireEvent("onsizeinit", initialSize, this);
		this.setSize(initialSize);
	},

	/**
	 * Creates element resizer.
	 * @private
	 * @return {Object} Element resizer.
	 */
	createResizer: function() {
		return Ext.create("Ext.resizer.Resizer", this.getResizerConfig());
	},

	//endregion

	//region Methods: Protected

	/**
	 * Returns resizable configuration information.
	 * @protected
	 * @return {Object}
	 */
	getResizerConfig: function() {
		var handles = this.getResizeActions();
		var resizerConfig = {
			target: this.id,
			handles: handles
		};
		Ext.apply(resizerConfig, this.resizerConfig);
		return resizerConfig;
	},

	/**
	 * Handles resize event.
	 * @protected
	 * @param {Object} resizer Resizer.
	 * @param {Number} width Width.
	 * @param {Number} height Height.
	 */
	onResize: function(resizer, width, height) {
		this.fireEvent("onsizechanged", {
			width: width,
			height: height
		}, this);
	},

	/**
	 * Handles resize drag event.
	 * @protected
	 * @param {Object} resizer Resizer.
	 * @param {Number} width Width.
	 * @param {Number} height Height.
	 */
	onResizeDrag: function(resizer, width, height) {
		this.fireEvent("onresizedrag", {
			width: width,
			height: height
		}, this);
	},

	/**
	 * Initializes resize events.
	 * @protected
	 */
	initResizeEvents: function() {
		this.addEvents(
			/**
			 * @event onsizechanged
			 * Occurs when element size was changed by resizer.
			 */
			"onsizechanged",
			/**
			 * @event onresizedrag
			 * Occurs when element size changing by resizer.
			 */
			"onresizedrag",
			/**
			 * @event onsizeinit
			 * Occurs when resizer initializes element start size.
			 */
			"onsizeinit"
		);
	},

	//endregion

	//region Methods: Public

	/**
	 * Initializes resizable properties to the element.
	 */
	initResizer: function() {
		if (!this.resizable) {
			return;
		}
		this.resizer = this.createResizer();
		this.initElementResizerEvents();
		this.initElementStartSize();
	},

	/**
	 * Sets element size.
	 * @param {Object} size Size.
	 * @param {Number} size.width Width.
	 * @param {Number} size.height Height.
	 */
	setSize: function(size) {
		this.resizer.resizeTo(size.width, size.height);
	},

	/**
	 * Gets element size.
	 * @return {Object} Element size.
	 */
	getSize: function() {
		return this.resizer.target.getSize();
	}

	//endregion

});
