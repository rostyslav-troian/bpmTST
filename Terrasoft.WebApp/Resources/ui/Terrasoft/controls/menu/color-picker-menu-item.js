/**
 * Base class of color picker menu.
 */
Ext.define("Terrasoft.controls.ColorPickerMenuItem", {
	extend: "Terrasoft.controls.BaseMenuItem",
	alternateClassName: "Terrasoft.ColorPickerMenuItem",

	//region Properties: Private

	/**
	 * Default value.
	 * @private
	 * @type {String}
	 */
	defaultValue: "#ffffff",

	/**
	 * Color value.
	 * @private
	 * @type {String|Array}
	 */
	value: null,

	/**
	 * Hue value.
	 * @private
	 * @type {Number}
	 */
	hueValue: 0,

	/**
	 * Saturation value.
	 * @private
	 * @type {Number}
	 */
	saturationValue: 1,

	/**
	 * Brightness value.
	 * @private
	 * @type {Number}
	 */
	brightnessValue: 1,

	/**
	 * CSS wrap element class.
	 * @type {String}
	 * @private
	 */
	wrapClass: "ts-menu-color-picker-item",

	/**
	 * CSS container element class.
	 * @private
	 * @type {String}
	 */
	containerClass: "ts-menu-color-picker-container",

	/**
	 * CSS main color picker block.
	 * @private
	 * @type {String}
	 */
	colorPickerMainBlockClass: "ts-menu-color-picker-main-block",

	/**
	 * CSS color picker block.
	 * @private
	 * @type {String}
	 */
	colorPickerBlockClass: "ts-menu-color-picker-block",

	/**
	 * CSS color picker block circle.
	 * @private
	 * @type {String}
	 */
	colorPickerBlockCircleClass: "ts-menu-color-picker-block-circle",

	/**
	 * CSS color picker line block.
	 * @private
	 * @type {String}
	 */
	colorPickerLineClass: "ts-menu-color-picker-line",

	/**
	 * CSS color picker gradient line.
	 * @private
	 * @type {String}
	 */
	colorPickerHueLineClass: "ts-menu-color-picker-hue-line",

	/**
	 * CSS color picker preview block.
	 * @private
	 * @type {String}
	 */
	colorPickerPreviewBlockClass: "ts-menu-color-picker-preview-block",

	/**
	 * CSS color picker out color block.
	 * @private
	 * @type {String}
	 */
	colorPickerPreviewClass: "ts-menu-color-picker-preview",

	/**
	 * CSS color picker arrows.
	 * @private
	 * @type {String}
	 */
	colorPickerHuePointerClass: "ts-menu-color-picker-hue-pointer",

	/**
	 * CSS color picker values block.
	 * @private
	 * @type {String}
	 */
	colorPickerValuesBlockClass: "ts-menu-color-picker-values-block",

	/**
	 * CSS color picker hex block.
	 * @private
	 * @type {String}
	 */
	colorPickerHexBlockClass: "ts-menu-color-picker-hex-block",

	/**
	 * CSS color picker rgb block.
	 * @private
	 * @type {String}
	 */
	colorPickerRgbBlockClass: "ts-menu-color-picker-rgb-block",

	/**
	 * Color picker cover element class.
	 * @private
	 * @type {String}
	 */
	colorPickerCoverClass: "ts-menu-color-picker-cover",

	/**
	 * Buttons object.
	 * @type {Object}
	 */
	buttons: null,

	/**
	 * Color picker menu item marker.
	 * @private
	 * @type {String}
	 */
	markerValue: "color-picker-menu-item",

	/**
	 * @private
	 * @type {String[]}
	 * @inheritdoc Terrasoft.BaseMenuItem#tpl
	 */
	tpl: [
		"<li id=\"{id}-menu-color-picker-item\" class=\"{wrapClass}\" style=\"{wrapStyle}\"",
		"<tpl if=\"markerValue\">",
		" data-item-marker=\"{markerValue}\"",
		"</tpl>",
		">",
		"<div id=\"{id}-menu-color-picker-cover\" class=\"{colorPickerCoverClass}\"></div>",
		"<div id=\"{id}-menu-color-picker-container\" class=\"{containerClass}\">",
		"<div id=\"{id}-menu-picker-buttons-container\" class=\"ts-menu-color-picker-buttons\">",
		"</div>",
		"<div id=\"{id}-menu-color-picker-main-block\" class=\"{colorPickerMainBlockClass}\">",
		"<div id=\"{id}-menu-picker-block\" class=\"{colorPickerBlockClass}\">",
		"<div id=\"{id}-menu-picker-block-circle\" class=\"{colorPickerBlockCircleClass}\"></div>",
		"</div>",
		"<div id=\"{id}-menu-picker-line\" class=\"{colorPickerLineClass}\">",
		"<div id=\"{id}-menu-picker-hue-line\" class=\"{colorPickerHueLineClass}\">",
		"<div id=\"{id}-menu-picker-hue-pointer\" class=\"{colorPickerHuePointerClass}\">",
		"</div>",
		"</div>",
		"</div>",
		"<div id=\"{id}-menu-picker-preview-block\" class=\"{colorPickerPreviewBlockClass}\">",
		"<div id=\"{id}-menu-picker-preview\" class=\"{colorPickerPreviewClass}\">",
		"</div>",
		"<div id=\"{id}-menu-picker-values-block\" class=\"{colorPickerValuesBlockClass}\">",
		"<div id=\"{id}-menu-picker-hex-block\" class=\"{colorPickerHexBlockClass}\">",
		"<label>",
		"HEX",
		"</label>",
		"<input id=\"{id}-menu-picker-hex-field\" maxlength=\"7\" spellcheck=\"false\"/>",
		"</div>",
		"<div id=\"{id}-menu-picker-rgb-block\" class=\"{colorPickerRgbBlockClass}\">",
		"<div>",
		"<label>",
		"R",
		"</label>",
		"<input id=\"{id}-menu-picker-red-value\" maxlength=\"3\"/>",
		"</div>",
		"<div>",
		"<label>",
		"G",
		"</label>",
		"<input id=\"{id}-menu-picker-green-value\" maxlength=\"3\"/>",
		"</div>",
		"<div>",
		"<label>",
		"B",
		"</label>",
		"<input id=\"{id}-menu-picker-blue-value\" maxlength=\"3\"/>",
		"</div>",
		"</div>",
		"</div>",
		"</div>",
		"</div>",
		`<tpl if="recentColors && recentColors.length">
					<div class="recent-colors-container" >
						<label class="recent-colors-label">
							{recentColorLabel}
						</label>
						<div class="recent-colors">
							<tpl for="recentColors">
								<button class="recent-color" data-color="{.}" style="background-color: {.}"></button>
							</tpl>
						</div>
					</div>
				</tpl>`,
		"</div>",
		"</li>"
	],

	//endregion

	//region Properties: Protected

	/**
	 * Color encoding.
	 * @protected
	 * @type {Terrasoft.core.enums.ColorEncoding}
	 */
	colorEncoding: Terrasoft.ColorEncoding.HEX,

	//endregion

	//region Properties: Public

	/**
	 * Recent selected colors..
	 * @public
	 * @type {Array}
	 */
	recentColors: null,

	/**
	 * Use storage to load recent colors.
	 * @public
	 * @type {Boolean}
	 */
	useStore: true,

	/**
	 * Recent colors storage.
	 * @public
	 * @type {Object}
	 */
	recentColorStore: null,

	//endregion

	//region Methods: Private

	/**
	 * Sets background color for preview element.
	 * @private
	 * @param {String|Array} colorValue Color value (HEX, RGB).
	 */
	setPreviewColor: function(colorValue) {
		this.colorPickerPreviewEl.setStyle("background-color", colorValue);
	},

	/**
	 * Creates buttons.
	 * @private
	 */
	createButtons: function() {
		var buttonsContainer = Ext.get(this.id + "-menu-picker-buttons-container");
		this.buttons = this.buttons || {};
		this.buttons.buttonOk = Ext.create("Terrasoft.Button", {
			style: Terrasoft.controls.ButtonEnums.style.BLUE,
			caption: Terrasoft.Resources.Controls.Button.ButtonCaptionApply,
			renderTo: buttonsContainer,
			markerValue: "apply-color"
		});
		this.buttons.buttonOk.on("click", this.onApplyButtonClick, this);
		this.buttons.cancelButton = Ext.create("Terrasoft.Button", {
			style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
			caption: Terrasoft.Resources.Controls.Button.ButtonCaptionCancel,
			renderTo: buttonsContainer
		});
		this.buttons.cancelButton.on("click", this.onCancelButtonClick, this);
	},

	/**
	 * Update blick circle style.
	 * @private
	 */
	updateBlockCircleStyle: function() {
		var circle = this.colorPickerBlockCirclekEl;
		var block = this.colorPickerBlockEl;
		var circleHalfSize = circle.getWidth() / 2;
		var clearBlockWidth = block.getWidth() - circleHalfSize;
		var clearBlockHeight = block.getHeight() - circleHalfSize;
		var left = Math.ceil(clearBlockWidth * this.getSaturationValue());
		left = (left <= 0) ? 0 - circleHalfSize : left;
		var top = Math.ceil(Math.abs(this.getBrightnessValue() * clearBlockHeight - clearBlockHeight));
		top = (top <= 0) ? 0 - circleHalfSize : top;
		circle.setLeft(left);
		circle.setTop(top);
	},

	/**
	 * Sets default value according to color encoding.
	 * @private
	 */
	setDefValue: function() {
		var encoding = Terrasoft.ColorEncoding;
		switch (this.colorEncoding) {
			case encoding.HEX:
				this.setValue(this.defaultValue);
				break;
			case encoding.RGB:
				var rgb = Terrasoft.hex2rgb(this.defaultValue);
				var color = Ext.String.format("rgb({0})", rgb.join(", "));
				this.setValue(color);
				break;
			default:
				throw new Terrasoft.UnsupportedTypeException();
		}
	},

	/**
	 * Checks value according encoding.
	 * @private
	 * @param {String|Array} value Color value.
	 * @return {Boolean} Is value according encoding.
	 */
	checkValue: function(value) {
		return Terrasoft.checkIsColorByEncoding(value, this.colorEncoding);
	},

	/**
	 * Returns if click inside wrap element.
	 * @private
	 * @param {Ext.EventObjectImpl} event Object event.
	 * @return {Boolean} If click inside wrap element
	 */
	isClickInsideWrapEL: function(event) {
		var wrap = this.wrapEl;
		var pageX = event.getPageX();
		var pageY = event.getPageY();
		var wrapElX = wrap.getX();
		var wrapElY = wrap.getY();
		var inXPosition = pageX > wrapElX && pageX < wrapElX + wrap.getWidth();
		var inYPosition = pageY > wrapElY && pageY < wrapElY + wrap.getHeight();
		return inXPosition && inYPosition;
	},

	/**
	 * Initialize default recent colors storage.
	 * @private
	 */
	_initRecentColorStore: function() {
		if (this.useStore && !this.recentColorStore) {
			this.recentColorStore = new Terrasoft.LocalStore({
				storeName: "RecentColors",
				isCache: true
			});
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.Bindable#getBindConfig.
	 * @overridden
	 */
	getBindConfig: function() {
		const bindConfig = this.callParent(arguments);
		Ext.apply(bindConfig, {
			recentColors: {
				changeMethod: "setRecentColors",
				changeEvent: "recentColorsChanged"
			}
		});
		return bindConfig;
	},

	/**
	 * Sets recent selected colors.
	 * @param {Array} value Recent colors.
	 * @protected
	 */
	setRecentColors: function(value) {
		this.recentColors = value;
	},

	/**
	 * @protected
	 * @override
	 * @inheritdoc Terrasoft.Component#init
	 */
	init: function() {
		this.callParent(arguments);
		this.initRecentColors();
		if (!this.getValue()) {
			this.setDefValue();
		}
	},

	/**
	 * Initialize recent colors.
	 * @protected
	 */
	initRecentColors: function() {
		if (this.useStore) {
			this._initRecentColorStore();
			this.recentColors = (this.recentColorStore.getItem("recentColors") || []).slice(0, 17);
			this.fireEvent("recentColorsChanged");
		}
	},

	/**
	 * Recent color click handler.
	 * @protected
	 * @param {Object} event Event info.
	 * @param {Object} target Target dom element.
	 */
	onRecentColorClick: function(event, target) {
		let color = target.dataset.color;
		if (!this.checkValue(color)) {
			if (this.colorEncoding === Terrasoft.ColorEncoding.HEX) {
				color = Terrasoft.rgb2hex(color);
			} else {
				const rgb = Terrasoft.hex2rgb(color);
				color = Ext.String.format("rgb({0})", rgb.join(", "));
			}
		}
		this.setValue(color);
		this.onApplyButtonClick();
	},

	/**
	 * Apply button handler.
	 * @protected
	 */
	onApplyButtonClick: function() {
		this.fireEvent("colorselected", this, this.getValue());
		this.updateRecentColors();
		this.onItemClick();
	},

	/**
	 * Update stored recent colors.
	 * @protected
	 */
	updateRecentColors: function() {
		this.recentColors = this.recentColors || [];
		this.recentColors.unshift(this.getValue());
		this.recentColors = _.uniq(this.recentColors.map(color => color.toLowerCase()));
		this.fireEvent("recentColorsChanged");
		if (this.useStore) {
			this.recentColorStore.setItem("recentColors", this.recentColors);
		}
	},

	/**
	 * Cancel button handler.
	 * @protected
	 */
	onCancelButtonClick: function() {
		this.onItemClick();
	},

	/**
	 * @protected
	 * @override
	 * @inheritdoc Terrasoft.BaseMenuItem#getTplData
	 */
	getTplData: function() {
		var parentTplData = this.callParent(arguments);
		this.initRecentColors();
		var tplData = {
			id: this.id,
			self: this,
			containerClass: this.containerClass,
			colorPickerMainBlockClass: this.colorPickerMainBlockClass,
			colorPickerBlockClass: this.colorPickerBlockClass,
			colorPickerBlockCircleClass: this.colorPickerBlockCircleClass,
			colorPickerLineClass: this.colorPickerLineClass,
			colorPickerPreviewBlockClass: this.colorPickerPreviewBlockClass,
			colorPickerPreviewClass: this.colorPickerPreviewClass,
			colorPickerHueLineClass: this.colorPickerHueLineClass,
			colorPickerHuePointerClass: this.colorPickerHuePointerClass,
			colorPickerValuesBlockClass: this.colorPickerValuesBlockClass,
			colorPickerHexBlockClass: this.colorPickerHexBlockClass,
			colorPickerRgbBlockClass: this.colorPickerRgbBlockClass,
			colorPickerCoverClass: this.colorPickerCoverClass,
			markerValue: this.markerValue,
			recentColors: this.recentColors,
			recentColorLabel: Terrasoft.Resources.ColorPicker.RecentColorLabel
		};
		this.updateSelectors();
		tplData.wrapClass = [this.wrapClass];
		return Ext.apply(parentTplData, tplData);
	},

	/**
	 * @override
	 * @inheritdoc Terrasoft.BaseMenuItem#updateSelectors
	 */
	updateSelectors: function() {
		var selectors = this.selectors = {};
		selectors.wrapEl = "#" + this.id + "-menu-color-picker-item";
		selectors.containerEl = "#" + this.id + "-menu-color-picker-container";
		selectors.colorPickerBlockEl = "#" + this.id + "-menu-picker-block";
		selectors.colorPickerBlockCirclekEl = "#" + this.id + "-menu-picker-block-circle";
		selectors.colorPickerHueLineEl = "#" + this.id + "-menu-picker-hue-line";
		selectors.colorPickerPreviewBlockEl = "#" + this.id + "-menu-picker-preview-block";
		selectors.colorPickerPreviewEl = "#" + this.id + "-menu-picker-preview";
		selectors.colorPickerHuePointerEl = "#" + this.id + "-menu-picker-hue-pointer";
		selectors.colorPickerHexFieldEl = "#" + this.id + "-menu-picker-hex-field";
		selectors.colorPickerRgbFieldEl = "#" + this.id + "-menu-picker-rgb-block";
		selectors.colorPickerRedFieldEl = "#" + this.id + "-menu-picker-red-value";
		selectors.colorPickerGreenFieldEl = "#" + this.id + "-menu-picker-green-value";
		selectors.colorPickerBlueFieldEl = "#" + this.id + "-menu-picker-blue-value";
		selectors.colorPickerCover = "#" + this.id + "-menu-color-picker-cover";
		selectors.el = selectors.wrapEl;
		return selectors;
	},

	/**
	 * @override
	 * @inheritdoc Terrasoft.BaseMenuItem#initDomEvents
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		this.wrapEl.un("mouseover", this.onMouseOver, this);
		this.wrapEl.un("mouseout", this.onMouseOut, this);
		this.un("click", this.onItemClick, this);
		this.colorPickerBlockEl.on("mousedown", this.onBlockMouseEvent, this);
		this.colorPickerHueLineEl.on("mousedown", this.onHueLineMouseEvent, this);
		this.on("needChangeFieldsValue", this.updateFieldValues, this);
		this.colorPickerHexFieldEl.on("keyup", this.updateStateByHexFieldChanged, this);
		this.colorPickerRgbFieldEl.on("keyup", this.updateStateByRgbFieldChanged, this);
		this.colorPickerCover.on("mousedown", this.onCoverMouseDown, this);
		this.wrapEl.select(".recent-color").on("click", this.onRecentColorClick, this);
		Ext.EventManager.on(window, "mousemove", this.onDocumentMouseMove, this);
		Ext.EventManager.on(window, "mouseup", this.unselectElements, this);
		Ext.EventManager.on(window, "keyup", this.onKeyUpEventHandler, this);
	},

	/**
	 * @override
	 * @inheritdoc Terrasoft.BaseMenuItem#onHideMenu
	 */
	onHideMenu: function() {
		this.callParent(arguments);
		this.colorPickerBlockEl.un("mousedown", this.onBlockMouseEvent, this);
		this.colorPickerHueLineEl.un("mousedown", this.onHueLineMouseEvent, this);
		this.un("needChangeFieldsValue", this.updateFieldValues, this);
		this.colorPickerHexFieldEl.un("keyup", this.updateStateByHexFieldChanged, this);
		this.colorPickerRgbFieldEl.un("keyup", this.updateStateByRgbFieldChanged, this);
		this.colorPickerCover.un("mousedown", this.onCoverMouseDown, this);
		Ext.EventManager.un(window, "mousemove", this.onDocumentMouseMove, this);
		Ext.EventManager.un(window, "mouseup", this.unselectElements, this);
		Ext.EventManager.un(window, "keyup", this.onKeyUpEventHandler, this);
		this.wrapEl.select(".recent-color").un("click", this.onRecentColorClick, this);
	},

	/**
	 * Sets selected property into false.
	 * @protected
	 */
	unselectElements: function() {
		this.colorPickerBlockEl.selected = false;
		this.colorPickerHueLineEl.selected = false;
	},

	/**
	 * @protected
	 * @override
	 * @inheritdoc Terrasoft.BaseObject#onDestroy
	 */
	onDestroy: function() {
		Ext.EventManager.un(window, "mousemove", this.onDocumentMouseMove, this);
		Ext.EventManager.un(window, "mouseup", this.unselectElements, this);
		Ext.EventManager.un(window, "keyup", this.onKeyUpEventHandler, this);
		this.callParent(arguments);
	},

	/**
	 * @protected
	 * @override
	 * @inheritdoc Terrasoft.Component#onAfterRender
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.createButtons();
		this.updateState();
	},

	/**
	 * @protected
	 * @override
	 * @inheritdoc Terrasoft.Component#onAfterReRender
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.createButtons();
		this.updateState();
	},

	/**
	 * Updates state.
	 * @protected
	 */
	updateState: function() {
		this.updateHSVColorValues();
		this.updateHuePointerPosition();
		this.updateBlockCircleStyle();
		this.setPreviewColor(this.getValue());
		this.setBlockClearColor();
		this.updateFieldValues();
	},

	/**
	 * Updates color picker state on change hex field value.
	 * @protected
	 */
	updateStateByHexFieldChanged: function() {
		var hexValue = this.colorPickerHexFieldEl.dom.value;
		if (!Terrasoft.isHexValue(hexValue)) {
			return;
		}
		this.updateStateByHsvValue(Terrasoft.hex2hsv(hexValue));
		this.updateRgbFields(Terrasoft.hex2rgb(hexValue));
	},

	/**
	 * Updates color picker state on change rgb field value.
	 * @protected
	 */
	updateStateByRgbFieldChanged: function() {
		var rgb = this.getRgbFieldsValue();
		if (!Terrasoft.isRgbValue(rgb)) {
			return;
		}
		this.updateStateByHsvValue(Terrasoft.rgb2hsv(rgb));
		this.updateHexField(rgb);
	},

	/**
	 * Updates color picker pointers and values state by hsv value.
	 * @protected
	 * @param {Array} hsv Hsv value.
	 */
	updateStateByHsvValue: function(hsv) {
		var value = Terrasoft.getColorByEncoding(hsv, this.colorEncoding);
		this.setHueValue(hsv[0]);
		this.setSaturationValue(hsv[1]);
		this.setBrightnessValue(hsv[2]);
		this.setValue(value);
		this.updateHuePointerPosition();
		this.updateBlockCircleStyle();
		this.setPreviewColor(value);
		this.setBlockClearColor();
	},

	/**
	 * Returns rgb values from fields.
	 * @protected
	 * @return {Array} Rgb value.
	 */
	getRgbFieldsValue: function() {
		var red = this.colorPickerRedFieldEl.dom.value;
		var green = this.colorPickerGreenFieldEl.dom.value;
		var blue = this.colorPickerBlueFieldEl.dom.value;
		return [parseInt(red, 10), parseInt(green, 10), parseInt(blue, 10)];
	},

	/**
	 * Updates hex field value;
	 * @protected
	 */
	updateFieldValues: function() {
		var rgb = Terrasoft.hsv2rgb(this.getHueValue(), this.getSaturationValue(), this.getBrightnessValue());
		this.updateHexField(rgb);
		this.updateRgbFields(rgb);
	},

	/**
	 * Updates hex field.
	 * @protected
	 * @param {Array} rgb Rgb value.
	 */
	updateHexField: function(rgb) {
		this.colorPickerHexFieldEl.dom.value = Terrasoft.rgb2hex(rgb);
	},

	/**
	 * Updates rgb fields.
	 * @protected
	 * @param {Array} rgb Rgb value.
	 */
	updateRgbFields: function(rgb) {
		this.colorPickerRedFieldEl.dom.value = rgb[0];
		this.colorPickerGreenFieldEl.dom.value = rgb[1];
		this.colorPickerBlueFieldEl.dom.value = rgb[2];
	},

	/**
	 * Sets color without saturation and brightness for block.
	 * @protected
	 */
	setBlockClearColor: function() {
		var blockHexColor = Terrasoft.hsv2hex(this.getHueValue(), 1, 1);
		this.colorPickerBlockEl.setStyle("background-color", blockHexColor);
	},

	/**
	 * Update hsv color values.
	 * @protected
	 */
	updateHSVColorValues: function() {
		var hsv = Terrasoft.getHSVByEncoding(this.getValue(), this.colorEncoding);
		this.setHueValue(hsv[0]);
		this.setSaturationValue(hsv[1]);
		this.setBrightnessValue(hsv[2]);
	},

	/**
	 * Handler of document key up.
	 * @protected
	 * @param {Object} event Event object.
	 */
	onKeyUpEventHandler: function(event) {
		var key = event.getKey();
		if (key === event.ENTER) {
			this.onApplyButtonClick();
		} else if (key === event.ESC) {
			this.onCancelButtonClick();
		}
	},

	/**
	 * On cover element mouse down handler.
	 * @protected
	 * @param {Ext.EventObjectImpl} event Object event.
	 */
	onCoverMouseDown: function(event) {
		if (!this.isClickInsideWrapEL(event)) {
			this.onCancelButtonClick();
		}
	},

	/**
	 * Handler of document mouse move.
	 * @protected
	 * @param {Object} event Event object.
	 */
	onDocumentMouseMove: function(event) {
		var isBlockSelected = this.colorPickerBlockEl.selected;
		var isHueLineSelected = this.colorPickerHueLineEl.selected;
		if (isBlockSelected) {
			this.onBlockMouseEvent(event);
		} else if (isHueLineSelected) {
			this.onHueLineMouseEvent(event);
		}
	},

	/**
	 * Block mouse down/move handler.
	 * @protected
	 * @param {Ext.EventObjectImpl} event Object event.
	 */
	onBlockMouseEvent: function(event) {
		var blockEl = this.colorPickerBlockEl;
		var circle = this.colorPickerBlockCirclekEl;
		blockEl.selected = true;
		var circleHalfSize = circle.getWidth() / 2;
		this.updateCirclePositionByClick(event);
		this.setSaturationValue((circle.getLocalX() + circleHalfSize) / blockEl.getWidth());
		this.setBrightnessValue(Math.abs(((circle.getLocalY() + circleHalfSize) / blockEl.getHeight()) - 1));
		var hsv = [this.getHueValue(), this.getSaturationValue(), this.getBrightnessValue()];
		var color = Terrasoft.getColorByEncoding(hsv, this.colorEncoding);
		this.setPreviewColor(color);
		this.setValue(color);
		this.fireEvent("needChangeFieldsValue");
	},

	/**
	 * Update circle position by click.
	 * @protected
	 * @param {Ext.EventObjectImpl} event Object event.
	 */
	updateCirclePositionByClick: function(event) {
		var blockEl = this.colorPickerBlockEl;
		var circle = this.colorPickerBlockCirclekEl;
		var circleHalfSize = circle.getWidth() / 2;
		var left = event.getPageX() - blockEl.getX() - circleHalfSize;
		left = (left < 0 - circleHalfSize) ? 0 - circleHalfSize : left;
		left = (left > blockEl.getWidth() - circleHalfSize) ? blockEl.getWidth() - circleHalfSize : left;
		var top = event.getPageY() - blockEl.getY() - circleHalfSize;
		top = (top > blockEl.getHeight() - circleHalfSize) ? blockEl.getHeight() - circleHalfSize : top;
		top = (top < 0 - circleHalfSize) ? 0 - circleHalfSize : top;
		circle.setLeft(left);
		circle.setTop(top);
	},

	/**
	 * Hue line mouse down/move handler.
	 * @protected
	 * @param {Ext.EventObjectImpl} event Object event.
	 */
	onHueLineMouseEvent: function(event) {
		var hueLine = this.colorPickerHueLineEl;
		hueLine.selected = true;
		var hueValue = this.getConvertedHueValue(event);
		this.setHueValue(hueValue);
		var hsv = [hueValue, this.getSaturationValue(), this.getBrightnessValue()];
		var color = Terrasoft.getColorByEncoding(hsv, this.colorEncoding);
		this.updateHuePointerPosition();
		this.setPreviewColor(color);
		this.setBlockClearColor();
		this.setValue(color);
		this.fireEvent("needChangeFieldsValue");
	},

	/**
	 * Updates hue pointer potion.
	 * @protected
	 */
	updateHuePointerPosition: function() {
		var top = Math.ceil(this.getHueValue() / 2);
		var huePointerLine = this.colorPickerHuePointerEl;
		var hueLine = this.colorPickerHueLineEl;
		var maxTopValue = hueLine.getHeight() - huePointerLine.getHeight();
		top = (top > maxTopValue) ? maxTopValue : top;
		top = (top < 0) ? 0 : top;
		huePointerLine.setTop(top);
	},

	/**
	 * Returns converted hue value.
	 * @protected
	 * @param {Ext.EventObjectImpl} event Object event.
	 * @return {Number} Hue value.
	 */
	getConvertedHueValue: function(event) {
		var hueLine = this.colorPickerHueLineEl;
		var hueHeight = hueLine.getHeight();
		var cursorPositionY = event.getPageY() - hueLine.getTop();
		cursorPositionY = (cursorPositionY < 0) ? 0 : cursorPositionY;
		cursorPositionY = (cursorPositionY > hueHeight) ? hueHeight : cursorPositionY;
		var hueValue = cursorPositionY * 2;
		return (hueValue >= 360) ? 359 : hueValue;
	},

	/**
	 * Sets hue value.
	 * @protected
	 * @param {Number} value Hue value.
	 */
	setHueValue: function(value) {
		if (!Ext.isDefined(value) || value === this.hueValue) {
			return;
		}
		this.hueValue = value;
	},

	/**
	 * Sets saturation value.
	 * @protected
	 * @param {Number} value Saturation value.
	 */
	setSaturationValue: function(value) {
		if (!Ext.isDefined(value) || value === this.saturationValue) {
			return;
		}
		this.saturationValue = value;
	},

	/**
	 * Sets brightness value.
	 * @protected
	 * @param {Number} value Brightness value.
	 */
	setBrightnessValue: function(value) {
		if (!Ext.isDefined(value) || value === this.brightnessValue) {
			return;
		}
		this.brightnessValue = value;
	},

	/**
	 * Returns hue value.
	 * @protected
	 * @return {Number} Hue value.
	 */
	getHueValue: function() {
		return this.hueValue;
	},

	/**
	 * Returns saturation value.
	 * @protected
	 * @return {Number} Saturation value.
	 */
	getSaturationValue: function() {
		return this.saturationValue;
	},

	/**
	 * Returns brightness value.
	 * @protected
	 * @return {Number} Brightness value.
	 */
	getBrightnessValue: function() {
		return this.brightnessValue;
	},

	/**
	 * Returns value.
	 * @protected
	 * @return {String|Array} Value.
	 */
	getValue: function() {
		return this.value;
	},

	/**
	 * Sets value.
	 * @param {String} value Color value.
	 */
	setValue: function(value) {
		if (!Ext.isDefined(value) || value === this.value) {
			return;
		}
		this.value = value;
	},

	/**
	 * Sets button value when menu is prepared.
	 * @param {String|Array} value Color value.
	 */
	setButtonValue: function(value) {
		if (this.checkValue(value)) {
			this.value = value;
		} else {
			this.setDefValue();
		}
	}

	//endregion
});
