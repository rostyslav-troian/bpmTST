/**
 */
Ext.define("Terrasoft.controls.BaseViewport", {
	extend: "Terrasoft.Container",
	alternateClassName: "Terrasoft.BaseViewport",

	/**
	 * @private
	 * @type {String}
	 */
	portrait: "portrait",

	/**
	 * @private
	 * @type {String}
	 */
	landscape: "landscape",

	/**
	 * @private
	 * @type {String}
	 */
	orientation: null,

	/**
	 * @private
	 * @type {Number}
	 */
	windowWidth: null,

	/**
	 * @private
	 * @type {Number}
	 */
	windowHeight: null,

	/**
	 * @private
	 * @type {Number}
	 */
	windowOuterHeight: null,

	/**
	 */
	constructor: function() {
		this.callParent(arguments);
		this.orientation = this.determineOrientation();
		this.windowWidth = this.getWindowWidth();
		this.windowHeight = this.getWindowHeight();
		this.windowOuterHeight = this.getWindowOuterHeight();
		if (!Ext.os.is.Android) {
			if (this.supportsOrientation()) {
				this.addWindowListener("orientationchange", Ext.bind(this.onOrientationChange, this));
			}
			else {
				this.addWindowListener("resize", Ext.bind(this.onResize, this));
			}
		}
	},

	/**
	 * @private
	 * @return {Number}
	 */
	getWindowWidth: function() {
		return window.innerWidth;
	},

	/**
	 * @private
	 * @return {Number}
	 */
	getWindowHeight: function() {
		return window.innerHeight;
	},

	/**
	 * @private
	 * @return {Number}
	 */
	getWindowOuterHeight: function() {
		return window.outerHeight;
	},

	/**
	 * @private
	 * @return {String}
	 */
	getWindowOrientation: function() {
		return window.orientation;
	},

	/**
	 * @private
	 * @return {String}
	 */
	determineOrientation: function() {
		var portrait = this.portrait;
		var landscape = this.landscape;
		if (!Ext.os.is.Android && this.supportsOrientation()) {
			if (this.getWindowOrientation() % 180 === 0) {
				return portrait;
			}
			return landscape;
		}
		else {
			if (this.getWindowHeight() >= this.getWindowWidth()) {
				return portrait;
			}
			return landscape;
		}
	},

	/**
	 * @private
	 * @return {Boolean}
	 */
	supportsOrientation: function() {
		return Ext.feature.has.Orientation;
	},

	/**
	 * @private
	 * @param {String} eventName
	 * @param {Function} fn
	 * @param {Object} capturing
	 */
	addWindowListener: function(eventName, fn, capturing) {
		window.addEventListener(eventName, fn, Boolean(capturing));
	},

	/**
	 * @private
	 * @param {String} eventName
	 * @param {Function} fn
	 * @param {Object} capturing
	 */
	removeWindowListener: function(eventName, fn, capturing) {
		window.removeEventListener(eventName, fn, Boolean(capturing));
	},

	/**
	 * @private
	 */
	onResize: function() {
		var oldWidth = this.windowWidth;
		var oldHeight = this.windowHeight;
		var width = this.getWindowWidth();
		var height = this.getWindowHeight();
		var currentOrientation = this.getOrientation();
		var newOrientation = this.determineOrientation();
		if ((oldWidth !== width && oldHeight !== height) && currentOrientation !== newOrientation) {
			this.fireOrientationChangeEvent(newOrientation, currentOrientation);
		}
	},

	/**
	 * @private
	 */
	onOrientationChange: function() {
		var currentOrientation = this.getOrientation();
		var newOrientation = this.determineOrientation();
		if (newOrientation !== currentOrientation) {
			this.fireOrientationChangeEvent(newOrientation, currentOrientation);
		}
	},

	/**
	 * @private
	 * @param {String} newOrientation
	 */
	fireOrientationChangeEvent: function(newOrientation) {
		this.orientation = newOrientation;
		this.updateSize();
		this.fireEvent("orientationchange", this, newOrientation, this.windowWidth, this.windowHeight);
	},

	/**
	 * @private
	 * @param {Number} width
	 * @param {Number} height
	 */
	updateSize: function(width, height) {
		this.windowWidth = width !== undefined ? width : this.getWindowWidth();
		this.windowHeight = height !== undefined ? height : this.getWindowHeight();
	},

	/**
	 * @return {String}
	 */
	getOrientation: function() {
		return this.orientation;
	}

});
