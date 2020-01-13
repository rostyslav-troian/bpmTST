/**
 * @alias Terrasoft.Mask
 * The mask class is used to lock the interface for long asynchronous operations.
 * In order to put a mask on the container, you need to call the show method and pass the configuration object
 * in which the selector property specifies the selector on which the DOM element will be found.
 * If the selector is not specified, the mask will be applied to the Viewport.
 * For example, to display a mask in a container with id = "maskContainer", run the following code:
 *
 *  var maskId = Terrasoft.Mask.show({
 *   selector: "#maskContainer"
 *  });
 *
 * To hide the mask, call:
 *  Terrasoft.Mask.hide(maskId);
 *
 * The remaining parameters are optional and assume the default values.
 */
Ext.define("Terrasoft.controls.Mask", {
	alternateClassName: "Terrasoft.Mask",
	extend: "Terrasoft.BaseObject",
	singleton: true,

	/**
	 * Mask delay time
	 * @type {Number}
	 * @private
	 */
	defaultTimeout: 500,

	/**
	 * Transparency of the mask in the range from 0 to 1
	 * @type {Float}
	 * @private
	 */
	defaultOpacity: 0.6,

	/**
	 * The background color of the mask
	 * @type {String}
	 * @private
	 */
	defaultBackgroundColor: "#ffffff",

	/**
	 * The name of the mask container class
	 * @type {String}
	 * @private
	 */
	maskOpacityClass: "ts-mask-opacity",

	/**
	 * Object for storing masks by identifier.
	 * @type {Object}
	 * @private
	 */
	storage: {},

	/**
	 * The string displayed at startup.
	 * @type {String}
	 * @private
	 */
	defaultCaption: Terrasoft.Resources.Controls.Mask.Caption,

	/**
	 * Adds the stylized display of the container where the spinner and header are located.
	 * @type {Boolean}
	 * @private
	 */
	defaultFrameVisible: true,

	/**
	 * @private
	 */
	_defaultShowSpinner: true,

	/**
	 * Template for the mask element.
	 * Specifies the frame of the control, to which the content is  displayed afterwards.
	 * @type {Array}
	 * @private
	 */
	tpl: [
		"<div class=\"ts-mask-container\"",
		"<tpl if=\"position\">",
		"style=\"{position}\"",
		"</tpl> >",
		"<div class=\"{maskOpacityClass}\" style=\"{opacityStyle}\"></div>",
		"<tpl if=\"showSpinnerEl\">",
		"<div class=\"{maskSpinnerClass}\">",
		"<div class=\"ts-mask-frame\">",
		"<div class=\"ts-mask-spinner\">",
		"{progressSpinnerHtml}",
		"</div>",
		"<div class=\"ts-mask-spinner-caption\">",
		"<tpl>{caption}</tpl>",
		"</div>",
		"</div>",
		"</div>",
		"</tpl>",
		"</div>"
	],

	/**
	 * The method displays a mask and returns the mask identifier.
	 * @param {Object|String} [config] Mask options or mask selector.
	 * @param {String} [config.selector] Selector to find the DOM element on which the mask will be applied.
	 * If the selector is not specified, the mask is superimposed on the Viewport.
	 * @param {Number} [config.timeout] Delay before displaying the mask.
	 * @param {Number} [config.showHidden] Show a transparent mask before the timeout occurs.
	 * @param {Number} [config.opacity] The degree of transparency of the mask in the range from 0 to 1.
	 * @param {String} [config.backgroundColor] The background color of the mask fill.
	 * @param {String} [config.clearMasks] Clear old masks if exist.
	 * @param {String} [config.showSpinner] Show spinner.
	 * @param {String} [config.showSpinnerEl] Show spinner element.
	 * @param {String} [config.frameVisible] Spinner element frame visible.
	 * @return {String} The mask identifier.
	 */
	show: function(config) {
		if (Ext.isString(config)) {
			config = {selector: config};
		}
		const self = this;
		config = config || {};
		let selector = config.selector;
		if (!selector) {
			selector = config.selector = "body";
		}
		if (config.clearMasks) {
			this.clearMasks(selector);
		} else if (this.isMaskExist(selector)) {
			return null;
		}
		const mask = this.createMask(config);
		mask.containerEl.set({"maskState": "visible"});
		if (config.showHidden) {
			const showOpacity = mask.opacity;
			mask.opacity = 0;
			this.renderMask(mask.id);
			const maskOpacityEl = mask.el.child("div." + this.maskOpacityClass);
			mask.timeoutId = setTimeout(function() {
				maskOpacityEl.setOpacity(showOpacity);
			}, mask.timeout);
		} else if (mask.timeout) {
			mask.timeoutId = setTimeout(function() {
				self.renderMask(mask.id);
			}, mask.timeout);
		} else {
			self.renderMask(mask.id);
		}
		return mask.id;
	},

	/**
	 * The method deletes the mask by its identifier.
	 * @param {String} maskId
	 */
	hide: function(maskId) {
		const mask = this.storage[maskId];
		if (mask == null) {
			return;
		}
		const containerEl = mask.containerEl;
		containerEl.set({"maskState": "none"});
		if (!mask.rendered || mask.showHidden) {
			clearTimeout(mask.timeoutId);
		}
		if (mask.progressSpinner && !mask.progressSpinner.destroyed) {
			mask.progressSpinner.destroy();
		}
		if (mask.rendered) {
			mask.el.destroy();
			const parentStylePosition = mask.parentStylePosition;
			if (parentStylePosition !== "absolute" && parentStylePosition !== "relative" &&
				parentStylePosition !== "fixed") {
				containerEl.setStyle("position", "");
			}
		}
		delete this.storage[maskId];
	},

	/**
	 * Clear old masks if exist.
	 * @param {String} selector Selector container element.
	 */
	clearMasks: function(selector) {
		Terrasoft.each(this.storage, function(mask) {
			if (mask.containerEl.is(selector)) {
				this.hide(mask.id);
			}
		}, this);
	},

	/**
	 * Clears all masks.
	 */
	clearAllMasks: function() {
		Terrasoft.each(this.storage, function(mask) {
			this.hide(mask.id);
		}, this);
	},

	/**
	 * The method creates a mask and returns its configuration.
	 * @throws {Terrasoft.UnknownException}
	 * Throws an exception if more than one container is found.
	 * @throws {Terrasoft.NullOrEmptyException}
	 * throws an exception if no containers are found.
	 * @param {Object} config is passed from the show method {Terrasoft.controls.Mask.show}
	 * @return {Object} the configuration of the created mask.
	 * @private
	 */
	createMask: function(config) {
		const defaultMaskConfig = {
			timeout: this.defaultTimeout,
			opacity: this.defaultOpacity,
			backgroundColor: this.defaultBackgroundColor,
			caption: this.defaultCaption,
			frameVisible: this.defaultFrameVisible,
			showSpinner: this._defaultShowSpinner
		};
		const maskConfig = Ext.applyIf(config, defaultMaskConfig);
		const maskId = Ext.id(null);
		const elements = Ext.select(maskConfig.selector);
		if (elements.getCount() > 1) {
			throw new Terrasoft.UnknownException({
				message: Terrasoft.Resources.Controls.Mask.DuplicateContainerException
			});
		}
		const containerEl = elements.item(0);
		if (!containerEl) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.Exception.NullOrEmptyException
			});
		}
		const mask = Ext.apply({
			containerEl: containerEl,
			id: maskId
		}, maskConfig);
		if (config.showSpinner) {
			var spinnerClassName;
			if (config.caption) {
				spinnerClassName = "Terrasoft.CircleSpinner"
			}
			mask.progressSpinner = mask.progressSpinner ||
					Terrasoft.getSpinner("ts-mask-spinner", spinnerClassName);
		} else {
			this._destroyProgressSpinner(mask);
		}
		this.storage[maskId] = mask;
		return mask;
	},

	/**
	 * @private
	 */
	_destroyProgressSpinner: function(mask) {
		if (mask.progressSpinner) {
			mask.progressSpinner.destroy();
		}
	},

	/**
	 * The method checks whether the mask is superimposed on the element by the selector being passed.
	 * @param {String} selector
	 * @return {Boolean}
	 * @private
	 */
	isMaskExist: function(selector) {
		let isMaskExist = false;
		Terrasoft.each(this.storage, function(mask) {
			if (mask.containerEl.is(selector)) {
				isMaskExist = true;
				return false;
			}
		}, this);
		return isMaskExist;
	},

	/**
	 * The method displays the mask by the transmitted identifier.
	 * @param {String} maskId mask identifier.
	 * @private
	 */
	renderMask: function(maskId) {
		const mask = this.storage[maskId];
		const containerEl = mask.containerEl;
		const parentStylePosition = mask.parentStylePosition = containerEl.getStyle("position");
		if (parentStylePosition !== "absolute" && parentStylePosition !== "relative" &&
			parentStylePosition !== "fixed") {
			containerEl.setStyle("position", "relative");
		}
		const tpl = mask.tpl = new Ext.XTemplate(this.tpl.join(""), {});
		const opacity = mask.opacity;
		const styleConfig = {
			"opacity": opacity,
			"backgroundColor": mask.backgroundColor
		};
		let maskSpinnerClass = "ts-mask-spinner-wrap";
		if (mask.frameVisible) {
			maskSpinnerClass += " ts-mask-spinner-frame-visible";
		}
		const opacityStyle = Ext.DomHelper.generateStyles(styleConfig);
		const position = (containerEl.dom.nodeName === "BODY") ? "position: fixed" : "";
		const progressSpinnerHtml = mask.progressSpinner && mask.progressSpinner.generateHtml();
		const showSpinnerEl = mask.showSpinnerEl !== false;
		const maskEl = mask.el = tpl.append(containerEl, {
			opacityStyle: opacityStyle,
			progressSpinnerHtml: progressSpinnerHtml,
			caption: mask.caption,
			position: position,
			showSpinnerEl: showSpinnerEl,
			maskSpinnerClass: maskSpinnerClass,
			maskOpacityClass: this.maskOpacityClass
		}, true);
		if (mask.showSpinner) {
			mask.progressSpinner.show();
		}
		maskEl.on("click", this.onMaskElClick);
		mask.rendered = true;
	},

	/**
	 * Updates mask caption.
	 * @param {String} maskId Mask identifier.
	 * @param {String} caption New mask caption.
	 */
	updateCaption: function(maskId, caption) {
		const mask = this.storage[maskId];
		mask.caption = caption;
		if (mask.rendered) {
			const captionSelector = ".ts-mask-spinner-caption";
			const captionDiv = mask.el.query(captionSelector)[0];
			if (captionDiv) {
				captionDiv.innerText = caption;
			} else {
				throw new Terrasoft.exceptions.ItemNotFoundException({
					message: "Element with selector '" + captionSelector + "' not found"
				});
			}
		}
	},

	/**
	 * The method intercepts the click handler by mask and stops the event propagation.
	 * @param {Object} e Event
	 * @private
	 */
	onMaskElClick: function(e) {
		e.stopPropagation();
	}
});
