Ext.ns("Terrasoft.controls.ButtonEnums");

/**
 * @enum {string} Terrasoft.controls.ButtonEnums.iconAlign
 * Enumeration of button alignment.
 */
Terrasoft.controls.ButtonEnums.iconAlign = {

	/** Align the icon to the button on the left. */
	LEFT: "left",

	/** Align the icon at the button to the right. */
	RIGHT: "right",

	/** Align the button icon at the top. */
	TOP: "top",

	/** Align the icon with the default button - on the left. */
	DEFAULT: "left"
};

/**
 * @enum {string} Terrasoft.controls.ButtonEnums.style
 * Enumeration of button styles.
 */
Terrasoft.controls.ButtonEnums.style = {

	/** Button style - default. */
	DEFAULT: "default",

	/** Button style - green. */
	GREEN: "green",

	/** Button style - red. */
	RED: "red",

	/** Button style - blue. */
	BLUE: "blue",

	/** Button style - gray. */
	GREY: "grey",

	/** Button style - transparent. */
	TRANSPARENT: "transparent"
};

/**
 */
Ext.define("Terrasoft.controls.Button", {
	extend: "Terrasoft.controls.Component",
	alternateClassName: "Terrasoft.Button",
	mixins: {
		groupable: "Terrasoft.Groupable",
		fileUpload: "Terrasoft.FileUpload",
		tooltip: "Terrasoft.Tooltip",
		menuMixin: "Terrasoft.MenuMixin"
	},

	/**
	 * Contains the function of the mouse click on the control.
	 * @private
	 * @deprecated
	 * @type {Function}
	 */
	handler: null,

	/**
	 * Title.
	 * @type {String}
	 */
	caption: null,

	/**
	 * Button code
	 * @type {String}
	 */
	returnCode: null,

	/**
	 * Button name.
	 * @type {String}
	 */
	name: null,

	/**
	 * Prefix for button identifiers.
	 * @type {String}
	 */
	prefix: "t-btn",

	/**
	 * The inactive CSS class of the button.
	 * @type {String}
	 */
	disabledClass: "t-btn-disabled",

	/**
	 * A pressed CSS class of the button.
	 * @type {String}
	 */
	pressedClass: "t-btn-pressed",

	/**
	 * Pressed CSS class of the button.
	 * @type {String}
	 */
	downClass: "t-btn-down",

	/**
	 * The focused CSS class of the button.
	 * @type {String}
	 */
	focusClass: "t-btn-focus",

	/**
	 * Loading flag state.
	 * @type {Boolean}
	 */
	loading: false,

	/**
	 * CSS class of loading button state.
	 * @type {String}
	 */
	loadingClass: "t-btn-loading",

	/**
	 * Common control template.
	 * @private
	 * @override
	 * @type {String[]}
	 */
	tpl: [
		"<tpl if=\"hasWrapper\">",
		"<span id=\"{id}-wrapperEl\" class=\"{wrapperClass}\" style=\"{wrapperStyle}\" tabindex=\"{tabIndex}\" title=\"{hint}\"",
		" {extraComponentAttributes}>",
		"</tpl>",
		"<tpl if=\"hasInnerWrapper\">",
		"<span id=\"{id}-innerWrapperEl\" class=\"{innerWrapperClass}\" style=\"{innerWrapperStyle}\">",
		"</tpl>",
		"<tpl if=\"hasImage && !imageAfterText\">",
		"<span id=\"{id}-imageEl\" class=\"{imageClass}\" style=\"{imageStyle}\"></span>",
		"</tpl>",
		"<tpl if=\"text\">",
		"<span id=\"{id}-textEl\" class=\"{textClass}\" style=\"{textStyle}\"",
		"<tpl if=\"!hasWrapper\">",
		"tabindex=\"{tabIndex}\" {extraComponentAttributes}",
		"</tpl>",
		">",
		"{text}",
		"<tpl if=\"loading\">",
		"<div class=\"ts-mask-spinner\">{progressSpinnerHtml}</div>",
		"</tpl>",
		"</span>",
		"</tpl>",
		"<tpl if=\"hasImage && imageAfterText\">",
		"<span id=\"{id}-imageEl\" class=\"{imageClass}\" style=\"{imageStyle}\"></span>",
		"</tpl>",
		"<tpl if=\"menu\">",
		"<span id=\"{id}-menuWrapEl\" class=\"{menuWrapClass}\">&nbsp;</span>",
		"<span id=\"{id}-menuEl\" class=\"{menuClass}\" style=\"{menuStyle}\" {menuAttribute}>",
		"<span id=\"{id}-markerEl\" class=\"{markerClass}\" style=\"{markerStyle}\"></span>",
		"</span>",
		"</tpl>",
		"<tpl if=\"hasInnerWrapper\"></span></tpl>",
		"<tpl if=\"hasWrapper\"></span></tpl>"
	],

	/**
	 * Click debounce timeout.
	 * @private
	 * @type {Number}
	 */
	clickDebounceTimeout: 0,

	/**
	 * @inheritdoc Terrasoft.Component#onAfterRender
	 * @protected
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		if (this.fileUpload) {
			this.mixins.fileUpload.addInputFile.call(this);
		}
		if (this.loading) {
			this.progressSpinner.show();
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterReRender
	 * @protected
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		if (this.fileUpload) {
			this.mixins.fileUpload.addInputFile.call(this);
		}
		if (this.loading) {
			this.progressSpinner.show();
		}
	},

	/**
	 * Generate an error if the control is in an incorrect state.
	 * @protected
	 * throws {Terrasoft.ItemNotFoundException}
	 * If the button is in a state for which there is no configuration in the configuration list, then
	 * an error is generated.
	 */
	checkButtonState: function() {
		var key = this.getTemplateConfigKey();
		if (!Terrasoft.Button.templateConfigs[key]) {
			throw new Terrasoft.ItemNotFoundException({
				message: (Terrasoft.Resources.Controls.Button.ButtonHasNoTemplateFor + " " + key)
			});
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#reRender
	 * @override
	 */
	reRender: function() {
		this.checkButtonState();
		if (this.allowRerender()) {
			this.callParent(arguments);
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		var key = this.getTemplateConfigKey();
		var templateConfig = Terrasoft.Button.templateConfigs[key];
		if (!templateConfig) {
			throw new Terrasoft.ItemNotFoundException({
				message: (Terrasoft.Resources.Controls.Button.ButtonHasNoTemplateFor + " " + key)
			});
		}
		tplData = Ext.apply(tplData, templateConfig, Terrasoft.Button.templateConfigDefaults);
		var extraClasses = [this.getStyleClass(), this.getEnabledClass(), this.getPressedClass(),
			this.getTooltipClass(), this.getLoadingClass()
		].join(" ");
		tplData.extraComponentAttributes += this.getContextHelpAttribute() + this.getTagAttribute() +
			this.getTooltipTextAttribute();
		var width = this.width;
		if (width) {
			width = isNaN(width) ? width : width + "px";
			var styleString = "width: " + width;
			if (tplData.hasWrapper) {
				tplData.wrapperStyle += styleString;
			} else {
				tplData.textStyle += styleString;
			}
		}
		var image;
		if (this.imageConfig) {
			image = Terrasoft.ImageUrlBuilder.getUrl(this.imageConfig);
		}
		tplData.hasImage = image && (this.canUseRightAlignImageWithMenu ||
			!(this.menu && this.iconAlign === Terrasoft.controls.ButtonEnums.iconAlign.RIGHT));
		tplData.imageStyle = image ? "background-image: url(" + image + ");" : null;
		if (tplData.hasExtraComponentClasses) {
			if (tplData.hasWrapper) {
				tplData.wrapperClass += " " + extraClasses;
				tplData.wrapperStyle = String(tplData.wrapperStyle);
			} else {
				tplData.textClass += " " + extraClasses;
			}
		}
		tplData.extraComponentStyle = this.getExtraComponentStyle() || "";
		var regExp = /t-btn-image-[lefttopright]/;
		if (!regExp.test(tplData.imageClass)) {
			tplData.imageClass += (" " + (tplData.iconAlignClass || this.getIconAlignClass()));
		}
		tplData.prefix = this.prefix;
		var isMenuNotEmpty = this.hasMenu();
		tplData.menu = isMenuNotEmpty ? this.menu : null;
		tplData.text = Terrasoft.encodeHtml(this.caption);
		tplData.loading = this.loading;
		if (this.loading) {
			tplData.progressSpinnerHtml = this.progressSpinner.generateHtml();
		}
		this.updateSelectors(tplData);
		return tplData;
	},

	/**
	 * Button style.
	 * @type {Terrasoft.controls.ButtonEnums.style}
	 */
	style: Terrasoft.controls.ButtonEnums.style.DEFAULT,

	/**
	 * Align the button icon.
	 * @type {Terrasoft.controls.ButtonEnums.iconAlign}
	 */
	iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.DEFAULT,

	/**
	 * The configuration of the button image.
	 * @type {Object}
	 */
	imageConfig: null,

	/**
	 * A line of inline indent style for the external button element.
	 * Example: "10px"
	 * @type {String}
	 */
	margin: null,

	/**
	 * The width of the button. If not set, then the width of the content.
	 * @type {Number}
	 */
	width: null,

	/**
	 * Additional data for the outer tree element.
	 * @type {String}
	 */
	tag: null,

	/**
	 * Text style object.
	 * Example: { fontSize: "20px", fontFamily: "Tahoma" }
	 * @type {Object}
	 */
	fontStyle: null,

	/**
	 * Context Help ID.
	 * @type {String}
	 */
	contextHelpId: null,

	/**
	 * If the button in a group is pressed.
	 * @type {Boolean}
	 */
	pressed: false,

	canUseRightAlignImageWithMenu: false,

	statics: {

		/**
		 * The default values for the button configurations.
		 * @private
		 * @static
		 * @type {Object}
		 */
		templateConfigDefaults: {
			width: null,
			extraComponentStyle: "",
			extraComponentClasses: "",
			extraComponentAttributes: "",
			hasExtraComponentClasses: true,
			wrapperClass: "t-btn-wrapper",
			wrapperStyle: "",
			hasWrapper: true,
			hasInnerWrapper: false,
			innerWrapperClass: "t-btn-innerWrapper",
			innerWrapperStyle: "",
			imageAfterText: false,
			imageStyle: "",
			imageClass: "t-btn-image",
			textClass: "t-btn-text t-btn-left",
			textStyle: "",
			isTextElWrapper: false,
			menuClass: "t-btn-menu",
			menuStyle: "",
			markerClass: "t-btn-marker",
			markerStyle: "",
			menuWrapClass: "t-btn-menuWrap"
		},

		/**
		 * Button configurations.
		 * Each property of this object represents the possible option of the button - the configuration.
		 * For example: "menu" - a button with a menu, without text and icons,
		 * "textMenu" - a button with a menu and text,
		 * "" - a button without text, without a menu, without an icon.
		 * @private
		 * @static
		 * @type {Object}
		 */
		templateConfigs: {
			"textMenurightIcon": "textMenu",
			"textMenurightIconWidth": "TextMenuWidth",
			"rightIcon": "leftIcon",
			"topIcon": {
				iconAlignClass: "t-btn-image-left",
				imageClass: "t-btn-image margin-right-0px",
				wrapperClass: "t-btn-wrapper t-btn-no-text-padding"
			},
			"NoTextNoIconNoMenu": {
				hasWrapper: true,
				hasInnerWrapper: false,
				hasImage: false,
				text: false,
				menu: false,
				wrapperClass: "",
				hasExtraComponentClasses: false
			},
			leftIconCustomImageSize: {},
			leftIcon: {
				imageClass: "t-btn-image margin-right-0px",
				wrapperClass: "t-btn-wrapper t-btn-no-text-padding"
			},
			text: {
				hasWrapper: false,
				isTextElWrapper: true,
				textClass: "t-btn-wrapper t-btn-text"
			},
			menu: {
				menuClass: "t-btn-menu margin-left-0px",
				wrapperClass: "t-btn-wrapper t-btn-no-text-padding"
			},
			textMenu: {
				wrapperClass: "t-btn-wrapper wrapper-with-centered-right-menu"
			},
			menuleftIcon: {
				wrapperClass: "t-btn-wrapper wrapper-with-centered-right-menu t-btn-no-text-padding",
				imageClass: "t-btn-image margin-right-0px"
			},
			menutopIcon: {
				wrapperClass: "t-btn-wrapper wrapper-with-centered-right-menu t-btn-no-text-padding",
				imageClass: "t-btn-image margin-right-0px t-btn-image-left"
			},
			textleftIcon: {
				wrapperClass: "t-btn-wrapper absolute-vertical-centered padding-left-34px",
				imageClass: "t-btn-image left-12px"
			},
			texttopIcon: {},
			textrightIcon: {
				wrapperClass: "t-btn-wrapper wrapper-with-centered-right-image"
			},
			textMenuleftIcon: {
				wrapperClass: "t-btn-wrapper wrapper-with-centered-right-menu t-btn-no-text-padding"
			},
			textMenutopIcon: {
				wrapperClass: "t-btn-wrapper wrapper-with-centered-right-menu"
			},
			textWidth: {
				hasWrapper: false,
				isTextElWrapper: true,
				textClass: "t-btn-wrapper t-btn-text"
			},
			menuWidth: {
				wrapperClass: "t-btn-wrapper t-btn-wrap-width-fix",
				hasInnerWrapper: true,
				menuClass: "t-btn-menu margin-left-0px"
			},
			textMenuWidth: {
				wrapperClass: "t-btn-wrapper t-btn-wrap-width-fix",
				hasInnerWrapper: true,
				innerWrapperClass: "t-btn-innerWrapper wrapper-with-centered-right-menu padding-right-14px",
				menuClass: "right-0px"
			},
			leftIconWidth: {
				imageClass: "t-btn-image t-btn-image-left-width",
				wrapperClass: "t-btn-wrapper t-btn-no-text-padding"
			},
			menuleftIconWidth: {
				wrapperClass: "t-btn-wrapper t-btn-wrap-width-fix",
				hasInnerWrapper: true,
				menuClass: "t-btn-menu margin-left-0px"
			},
			textleftIconWidth: {
				wrapperClass: "t-btn-wrapper t-btn-wrap-width-fix",
				hasInnerWrapper: true,
				innerWrapperClass: "t-btn-innerWrapper wrapper-with-centered-left-image"
			},
			texttopIconWidth: {
				hasInnerWrapper: true
			},
			textrightIconWidth: {
				wrapperClass: "t-btn-wrapper t-btn-wrap-width-fix",
				hasInnerWrapper: true,
				innerWrapperClass: "t-btn-innerWrapper absolute-vertical-centered padding-right-22px",
				imageClass: "t-btn-image right-0px"
			},
			textMenuleftIconWidth: {
				wrapperClass: "t-btn-wrapper t-btn-wrap-width-fix",
				hasInnerWrapper: true,
				innerWrapperClass: "t-btn-innerWrapper absolute-vertical-centered padding-right-14px " +
					"wrapper-with-centered-left-image",
				menuClass: "right-0px"
			},
			textMenutopIconWidth: {
				hasInnerWrapper: true,
				wrapperClass: "t-btn-wrapper",
				innerWrapperClass: "t-btn-innerWrapper wrapper-with-centered-right-menu padding-right-12px",
				menuClass: "right-12px",
				innerWrapperStyle: "padding-right: 12px;"
			}
		},

		/**
		 * Returns style caption.
		 * @param {Terrasoft.controls.ButtonEnums.style} style Button style.
		 * @return {String}
		 */
		getStyleCaption: function(style) {
			var resourceName = "ButtonStyle" + Ext.String.capitalize(style);
			return Terrasoft.Resources.Controls.Button[resourceName];
		}

	},

	/**
	 * Initializes the component.
	 * @protected
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * Button click event
			 * @param {Terrasoft.Button} this
			 */
			"click",
			/**
			 * Click event on the image in the button
			 * @param {Terrasoft.Button} this
			 */
			"imageClick"
		);
		this.mixins.fileUpload.constructor.call(this);
		this.mixins.groupable.constructor.call(this);
		this.mixins.menuMixin.init.call(this);
	},

	/**
	 * Gets the inline style for the item to be broken.
	 * @protected
	 * @return {String} Inline style line.
	 */
	getExtraComponentStyle: function() {
		var margin = this.margin;
		if (margin) {
			return "margin: " + margin + ";";
		}
		return null;
	},

	/**
	 * Initializes DOM events.
	 * @protected
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		var wrapEl = this.getWrapEl();
		if (wrapEl) {
			wrapEl.on({
				click: {
					fn: this.onClick,
					scope: this
				},
				focus: {
					fn: this.onFocus,
					scope: this
				},
				blur: {
					fn: this.onBlur,
					scope: this
				},
				keydown: {
					fn: this.onKeyDown,
					scope: this
				},
				mousedown: {
					fn: this.onMouseDown,
					scope: this
				},
				mouseup: {
					fn: this.onMouseUp,
					scope: this
				}
			});
		}
		var menuWrapEl = this.menuWrapEl;
		if (menuWrapEl) {
			menuWrapEl.on("click", this.onMenuClick, this);
		}
		var imageWrapEl = this.imageEl;
		if (imageWrapEl) {
			imageWrapEl.on("click", this.onImageClick, this);
		}
	},

	/**
	 * Processes a click on the image.
	 * @protected
	 * @param {Ext.EventObjectImpl} e The event object.
	 */
	onImageClick: function(e) {
		if (this.hasListener("imageClick")) {
			e.stopEvent();
			if (!this.enabled) {
				return;
			}
			this.fireEvent("imageClick", this);
		}
	},

	/**
	 * Updates the selectors based on the data generated to create the markup.
	 * @param {Object} tplData  a data object for the template on which the markup will be built.
	 * @protected
	 */
	updateSelectors: function(tplData) {
		this.updateSelector(tplData.text, "text");
		this.updateSelector(tplData.hasWrapper, "wrapper");
		this.updateSelector(tplData.hasInnerWrapper, "innerWrapper");
		this.updateSelector(tplData.hasImage, "image");
		this.updateSelector(tplData.menu, "menu");
		this.updateSelector(tplData.menu, "marker");
		this.updateSelector(tplData.menu, "menuWrap");
		var selectors = this.selectors;
		if (tplData.hasWrapper) {
			selectors.wrapEl = selectors.wrapperEl;
		} else {
			selectors.wrapEl = selectors.textEl;
		}
		selectors.el = selectors.wrapEl;
		return selectors;
	},

	/**
	 * Updates one selector.
	 * @param {Boolean} hasSelector Whether this selector is required..
	 * @param {String} suffix Selector suffix.
	 * @protected
	 */
	updateSelector: function(hasSelector, suffix) {
		var selectors = this.selectors;
		if (!selectors) {
			selectors = this.selectors = {};
		}
		if (hasSelector) {
			selectors[suffix + "El"] = "#" + this.id + "-" + suffix + "El";
		} else {
			delete selectors[suffix + "El"];
		}
	},

	/**
	 * Retrieves the template key based on the current state of the control.
	 * @protected
	 * @return {String} The template key.
	 */
	getTemplateConfigKey: function() {
		var key = "";
		if (this.caption) {
			key += "Text";
		}
		if (this.hasMenu()) {
			key += "Menu";
		}
		if (this.imageConfig) {
			key += (this.iconAlign + "Icon");
		}
		if (this.width) {
			key += "Width";
		}
		if (key.length > 0) {
			key = key[0].toLowerCase() + key.substring(1);
		}
		return (key === "" ? "NoTextNoIconNoMenu" : key);
	},

	/**
	 * Gets the CSS class for aligning the icon based on the current state of the control.
	 * @protected
	 * @return {String} The CSS class for aligning the image.
	 */
	getIconAlignClass: function() {
		var iconAlign = this.iconAlign || Terrasoft.controls.ButtonEnums.iconAlign.DEFAULT;
		return this.prefix + "-image-" + iconAlign.toLowerCase();
	},

	/**
	 * Gets the CSS style class based on the current state of the control.
	 * @protected
	 * @return {String} CSS style class.
	 */
	getStyleClass: function() {
		var style = this.style;
		return this.prefix + "-style-" + (style ? style.toLowerCase() : Terrasoft.controls.ButtonEnums.style.DEFAULT);
	},

	/**
	 * Gets the CSS activity class of the button based on the current state of the control.
	 * @protected
	 * @return {String} The CSS class of the button activity.
	 */
	getEnabledClass: function() {
		return this.enabled ? "" : this.disabledClass;
	},

	/**
	 * Gets the CSS class of the pressed button based on the current state of the control.
	 * @protected
	 * @return {String} CSS class of pressed button.
	 */
	getPressedClass: function() {
		return (this.pressed ? this.pressedClass : "");
	},

	/**
	 * Gets the markup of the context help attribute.
	 * @protected
	 * @return {String} Markup of the context help attribute.
	 */
	getContextHelpAttribute: function() {
		var contextHelpId = this.contextHelpId;
		return contextHelpId ? (" data-contexthelpid = '" + contextHelpId.toString() + "' ") : "";
	},

	/**
	 * Gets the markup of the additional information attribute.
	 * @protected
	 * @return {String} The markup of the additional information attribute.
	 */
	getTagAttribute: function() {
		var tag = this.tag;
		return tag ? (" data-tag = '" + tag.toString() + "' ") : "";
	},

	/**
	 * Mouse click handler
	 * @protected
	 */
	onMouseDown: function() {
		if (!this.enabled || this.loading) {
			return;
		}
		var wrapEl = this.getWrapEl();
		wrapEl.addCls(this.downClass);
	},

	/**
	 * Processes the mouse button.
	 * @protected
	 */
	onMouseUp: function() {
		if (!this.enabled || this.loading) {
			return;
		}
		var wrapEl = this.getWrapEl();
		wrapEl.removeCls(this.downClass);
	},

	/**
	 * Processes input from the keyboard.
	 * @protected
	 * @param {Ext.EventObjectImpl} e The event object.
	 */
	onKeyDown: function(e) {
		if (!this.enabled || this.loading) {
			return;
		}
		var keyCode = e.keyCode;
		if ((keyCode === e.ENTER) || (keyCode === e.SPACE)) {
			this.onClick(e);
		}
	},

	/**
	 * Handles the focus setting on the button.
	 * @protected
	 */
	onFocus: function() {
		var el = this.getWrapEl();
		el.addCls(this.focusClass);
		this.focused = true;
	},

	/**
	 * Handles the removal of the focus from the button.
	 * @protected
	 */
	onBlur: function() {
		var el = this.getWrapEl();
		el.removeCls(this.focusClass);
		this.focused = false;
	},

	/**
	 * Click event handler.
	 * @param {Ext.EventObjectImpl} e Event object.
	 * @protected
	 */
	onClick: function(e) {
		e.stopEvent();
		if (!this.enabled || this.loading) {
			return;
		}
		var canExecute = this.canExecute({
			method: this.onClick,
			args: arguments
		});
		if (canExecute === false) {
			return;
		}
		if (this.clickDebounceTimeout) {
			this.setEnabled(false);
			setTimeout(function() {
				this.setEnabled(true);
			}.bind(this), this.clickDebounceTimeout);
		}
		var showMenu = this.hasMenu();
		if (this.handler || this.hasListener("click")) {
			if (this.handler) {
				var obsoleteMessage = Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage;
				this.log(Ext.String.format(obsoleteMessage, "handler", "click event"));
				this.handler();
			}
			showMenu = (this.fireEvent("click", this, null, null, null) === false) && showMenu;
		}
		if (showMenu) {
			this.showMenu();
		}
	},

	/**
	 * Processes a mouse click on the menu.
	 * @protected
	 * @param {Ext.EventObjectImpl} e The event object.
	 */
	onMenuClick: function(e) {
		e.stopEvent();
		if (!this.enabled || this.loading) {
			return;
		}
		this.showMenu();
	},

	/**
	 * Sets the new header.
	 * @param {String} newCaption New header.
	 */
	setCaption: function(newCaption) {
		if (this.caption === newCaption) {
			return;
		}
		if (newCaption === "") {
			this.removeCaption();
			return;
		}
		var textEl = this.textEl;
		this.caption = newCaption;
		if (textEl) {
			textEl.dom.innerHTML = newCaption;
		} else {
			this.reRender(null);
		}
	},

	/**
	 * Sets the button to be pressed
	 * @param {Boolean} isPressed A sign of pressed.
	 */
	setPressed: function(isPressed) {
		if (this.pressed === isPressed) {
			return;
		}
		this.pressed = isPressed;
		var wrapEl = this.getWrapEl();
		if (!wrapEl) {
			return;
		}
		if (isPressed === true) {
			wrapEl.addCls(this.pressedClass);
		} else {
			wrapEl.removeCls(this.pressedClass);
		}
	},

	/**
	 * Deletes the header.
	 */
	removeCaption: function() {
		if (!this.caption) {
			return;
		}
		this.caption = null;
		this.reRender(null);
	},

	/**
	 * Sets new image configuration.
	 * @param {Object} imageConfig Image configuration.
	 * @param {Terrasoft.controls.ButtonEnums.iconAlign} [iconAlign] Image align type.
	 */
	setImage: function(imageConfig, iconAlign) {
		if (this.imageConfig === imageConfig) {
			return;
		}
		this.imageConfig = imageConfig;
		if (iconAlign || Ext.isEmpty(this.iconAlign)) {
			this.iconAlign = iconAlign || Terrasoft.controls.ButtonEnums.iconAlign.DEFAULT;
		}
		this.reRender(null);
	},

	/**
	 * Deletes the picture.
	 */
	removeImage: function() {
		if (!this.imageConfig) {
			return;
		}
		this.imageConfig = null;
		this.reRender(null);
	},

	/**
	 * Sets the picture.
	 * @param {Terrasoft.controls.ButtonEnums.iconAlign} iconAlign Aligns the picture. If not specified, then aligned left.
	 */
	setIconAlign: function(iconAlign) {
		if (this.iconAlign === iconAlign) {
			return;
		}
		if (this.imageConfig) {
			this.iconAlign = iconAlign || Terrasoft.controls.ButtonEnums.iconAlign.DEFAULT;
			this.reRender(null);
		}
	},

	/**
	 * Sets the width and auto-alignment.
	 * @param {Number} width Width in pixels.
	 */
	setWidth: function(width) {
		if (this.width === width) {
			return;
		}
		this.width = width;
		this.reRender(null);
	},

	/**
	 * Specifies the style of the button.
	 * @param {Terrasoft.controls.ButtonEnums.style} buttonStyle Button Style.
	 */
	setStyle: function(buttonStyle) {
		if (this.style === buttonStyle) {
			return;
		}
		var oldStyleClass = this.getStyleClass();
		this.style = buttonStyle;
		if (!this.rendered) {
			return;
		}
		var el = this.getWrapEl();
		if (!el) {
			return;
		}
		el.removeCls(oldStyleClass);
		el.addCls(this.getStyleClass());
	},

	/**
	 * Specifies the font style.
	 * @param {Object} fontStyleObject An object containing font styles.
	 */
	setFontStyle: function(fontStyleObject) {
		var textEl = this.textEl;
		if (textEl) {
			textEl.applyStyles(fontStyleObject);
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#clearDomListeners
	 * @override
	 */
	clearDomListeners: function() {
		this.callParent(arguments);
		this.unsubscribeWindowScroll();
	},

	/**
	 * Gets the width of the button.
	 * @return {Number} Width.
	 */
	getWidth: function() {
		return this.width;
	},

	/**
	 * Removes a button and releases all resources.
	 * @override
	 */
	onDestroy: function() {
		this.removeMenu(true);
		if (this.fileUpload) {
			this.mixins.fileUpload.destroy.call(this);
		}
		if (this.progressSpinner) {
			this.progressSpinner.destroy();
		}
		this.callParent(arguments);
	},

	/**
	 * Sets the focus on the button.
	 */
	focus: function() {
		this.getWrapEl().dom.focus();
	},

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var buttonBindConfig = {
			caption: {
				changeMethod: "setCaption"
			},
			pressed: {
				changeMethod: "setPressed"
			},
			imageConfig: {
				changeMethod: "setImage"
			},
			style: {
				changeMethod: "setStyle"
			},
			loading: {
				changeMethod: "setLoading"
			}
		};
		this.mixins.fileUpload.addFileUploadBindConfig.call(this, buttonBindConfig);
		this.mixins.tooltip.addTooltipBindConfig.call(this, buttonBindConfig);
		Ext.apply(buttonBindConfig, bindConfig);
		return buttonBindConfig;
	},

	/**
	 * @inheritdoc Terrasoft.Component#bind
	 * @override
	 */
	bind: function() {
		this.callParent(arguments);
		this.mixins.menuMixin.bindMenu.call(this, this.model);
	},

	/**
	 * Indicates whether button has menu with items or not.
	 * @private
	 * @return {Boolean}
	 */
	hasMenu: function() {
		return this.menu && this.menu.items && this.menu.items.getCount() > 0;
	},

	/**
	 * Sets the button to be loading.
	 * @param {Boolean} loading A sign of loading.
	 */
	setLoading: function(loading) {
		loading = Boolean(loading);
		if (this.loading === loading) {
			return;
		}
		this.loading = loading;
		if (!this.rendered) {
			return;
		}
		if (this.loading) {
			this.createProgressSpinner();
			this.pressed = true;
		} else {
			this.pressed = false;
		}
		this.safeRerender();
	},

	/**
	 * Creates button progress spinner.
	 * @protected
	 */
	createProgressSpinner: function() {
		if (!this.progressSpinner) {
			this.progressSpinner = Terrasoft.getSpinner("ts-mask-spinner");
		}
	},

	/**
	 * Gets the CSS class of the loading button based on the current state of the control.
	 * @protected
	 * @return {String} The CSS class of loading button.
	 */
	getLoadingClass: function() {
		return this.loading ? this.loadingClass : "";
	}

});
