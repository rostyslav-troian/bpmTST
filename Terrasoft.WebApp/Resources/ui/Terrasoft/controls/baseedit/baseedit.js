/**
 * The base class of the single-line text box control.
 */
Ext.define("Terrasoft.controls.BaseEdit", {
	extend: "Terrasoft.controls.Component",
	alternateClassName: "Terrasoft.BaseEdit",

	mixins: {
		/**
		 * The object of rendering text cleanup icons.
		 */
		clearIcon: "Terrasoft.ClearIcon",

		/**
		 * Predictable icon. Used for predictable columns.
		 */
		predictableIcon: "Terrasoft.PredictableIcon"
	},

	//region Properties: Private

	/**
	 * A reference to the main component DOM element.
	 * @private
	 * @type {Ext.dom.Element}
	 */
	el: null,

	/**
	 * The indication of the display as a hyperlink.
	 * @type {Boolean}
	 * @private
	 */
	isLinkMode: false,

	/**
	 * The indication of disable input drop event.
	 * @type {Boolean}
	 * @protected
	 */
	disableInputDrop: false,

	/**
	 * @private
	 */
	_validationEventName: null,

	//endregion

	//region Properties: Protected

	/**
	 * DOM input attribute
	 * @protected
	 * @type {String}
	 */
	inputType: "text",

	/**
	 * An object that contains information about the validity of the value in the control.
	 * @protected
	 * @type {Object}
	 */
	validationInfo: null,

	/**
	 * Control template.
	 * @protected
	 * @override
	 * @type {String[]}
	 */
	tpl: [
		"<div id=\"{id}-wrap\" class=\"{wrapClass}\" style=\"{wrapStyle}\">",
		"{%this.renderLeftIcon(out, values)%}",
		"<tpl if=\"showValueAsLink\">",
		"<div id=\"{id}-link-wrap\" class=\"{linkWrapClass}\" >",
		"<a id=\"{id}-link-el\" class=\"{linkClass}\" href=\"{href}\" style=\"{linkStyle}\"",
		"<tpl if=\"direction\"> dir=\"{direction}\"</tpl>",
		" >{value}</a>",
		"</div>",
		"</tpl>",
		"<input id=\"{id}-el\" class=\"{editInputClass}\" type=\"{inputType}\" placeholder=\"{placeholder}\" {disabled}",
		"<tpl if=\"direction\"> dir=\"{direction}\"</tpl>",
		" {readonly} value=\"{value}\" style=\"{inputStyle}\" tabindex=\"{tabIndex}\" autocomplete=\"{autocomplete}\">",
		"<tpl if=\"hasClearIcon\">",
		"{%this.renderClearIcon(out, values)%}",
		"</tpl>",
		"<div id=\"{id}-disabled-el-icon\" class=\"{disabledElIconClass}\"></div>",
		"{%this.renderRightIcon(out, values)%}",
		"<span id=\"{id}-validation\" class=\"{validationClass}\" style=\"{validationStyle}\">" +
		"{validationText}</span>",
		"</div>",
		"{%this.renderPredictableIcon(out, values)%}"
	],

	//endregion

	//region Properties: Public

	/**
	 * Autocomplete attribute value for control.
	 * @type {String}
	 */
	autocomplete: "off",

	/**
	 * The value of the control.
	 * @type {String}
	 */
	value: "",

	/**
	 * The width of the control.
	 * @type {String}
	 */
	width: "",

	/**
	 * The height of the control.
	 * @type {String}
	 */
	height: "",

	/**
	 * Text that is displayed when the input field is empty.
	 * @type {String}
	 */
	placeholder: "",

	/**
	 * The font size of the control.
	 * @type {String}
	 */
	fontSize: "",

	/**
	 * The font family of the control.
	 * @type {String}
	 */
	fontFamily: "",

	/**
	 * A flag of the read-only mode for the control.
	 * @type {Boolean}
	 */
	readonly: false,

	/**
	 * The CSS class of the style of the "disabled" control.
	 * @type {String}
	 */
	disabledClass: "base-edit-disabled",

	/**
	 * A CSS style class in read-only mode.
	 * @type {String}
	 */
	readonlyClass: "base-edit-readonly",

	/**
	 * The Css class for the control when it failed.
	 * @type {String}
	 */
	errorClass: "base-edit-error",

	/**
	 * * Css-class for control, when it focused.
	 * @type {String}
	 */
	focusClass: "base-edit-focus",

	/**
	 * A flag of setting a large style to display the control.
	 * @type {Boolean}
	 */
	bigSize: false,

	/**
	 * The flag of required input field. The default value is false.
	 * @type {Boolean}
	 */
	isRequired: false,

	/**
	 * Flag that the focus is received by the element, if the focus is lost, it is reset to false.
	 * @property {Boolean} focused
	 */
	focused: false,

	/**
	 * Parameter containing the link.
	 * @type {String}
	 */
	href: "",

	/**
	 * A parameter indicating whether the control has the ability to print a hyperlink.
	 * @type {Boolean}
	 */
	showValueAsLink: false,

	/**
	 * Parameter indicating whether the control has a cleaning icon.
	 * @type {Boolean}
	 */
	hasClearIcon: false,

	/**
	 * Enable or disabled predictable icon.
	 * @protected
	 * @type {Boolean}
	 */
	enablePredictableIcon: false,

	/**
	 * Css class for the wrapper element of the control's hyperlink.
	 * @type {String}
	 */
	linkWrapClass: "base-edit-link-wrap",

	/**
	 * Css class for the control when it is not visible.
	 * @type {String}
	 */
	notVisibleClass: "base-edit-input-not-visible",

	//endregion

	//region Methods: Private

	/**
	 * Sets the focus for the DOM element.
	 * @private
	 * @param {Boolean} focused New value
	 */
	internalSetFocused: function(focused) {
		if (this.rendered) {
			if (focused) {
				this.setCaretToLastPosition();
			} else {
				var el = this.getEl();
				el.blur();
			}
		}
	},

	/**
	 * @private
	 */
	_setColumnRequiredIfVisible: function(column) {
		column.isRequiredOnPage = Boolean(this.isRequired && this.isVisible());
	},

	/**
	 * @private
	 */
	_setTooltipValidationMessage: function(message) {
		const validationElementDom = this.validationEl.dom;
		if (validationElementDom) {
			validationElementDom.setAttribute("title", message);
		}
	},

	/**
	 * @private
	 */
	_subscribeOnValueColumnChange(binding, property, model) {
		const validationMethodName = binding.config.validationMethod;
		if (validationMethodName) {
			var validationMethod = this[validationMethodName];
			model.validationInfo.on("change:" + binding.modelItem, function(collection, value) {
				validationMethod.call(this, value);
			}, this);
			var startValidationInfo = model.validationInfo.get(binding.modelItem);
			if (startValidationInfo) {
				validationMethod.call(this, startValidationInfo);
			}
		}
	},

	/**
	 * @private
	 */
	_unsubscribeOnColumnValidation: function() {
		if (this.model && this._validationEventName) {
			this.model.un(this._validationEventName, this._setColumnRequiredIfVisible, this);
		}
	},

	/**
	 * @private
	 */
	_subscribeOnColumnValidation(binding, property, model) {
		const modelColumns = model.columns || [];
		const columnName = binding.modelItem;
		const column = modelColumns[columnName];
		if (column) {
			this._validationEventName = "validate:" + columnName;
			model.on(this._validationEventName, this._setColumnRequiredIfVisible.bind(this, column), this);
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * Initialize the control.
	 * @protected
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		if (!this.validationInfo) {
			this.validationInfo = {
				isValid: true,
				invalidMessage: ""
			};
		}
		this.addEvents(
			/**
			 * @event keypress
			 * Triggers when a keystroke occurs.
			 */
			"keypress",
			/**
			 * @event keydown
			 * Triggers when a keystroke occurs.
			 */
			"keydown",
			/**
			 * @event keyup
			 * Triggers when it occurs when the key is released.
			 */
			"keyup",
			/**
			 * @event focus
			 * Triggers when the element receives focus.
			 */
			"focus",
			/**
			 * @event blur
			 * Triggers when the element loses focus.
			 */
			"blur",
			/**
			 * @event change
			 * Called when the value of the control is changed.
			 */
			"change",
			/**
			 * @event enterkeypressed
			 * Called when the Enter key is pressed
			 */
			"enterkeypressed",
			/**
			 * @event editenterkeypressed
			 * "Pop-up" event. Called when the Enter key is pressed and the value has not changed.
			 */
			"editenterkeypressed",
			/**
			 * @event linkmodechange
			 * Triggers when the control needs to change the value editing mode.
			 */
			"linkmodechange",
			/**
			 * @event linkclick
			 * Triggers when a link is clicked.
			 */
			"linkclick",
			/**
			 * @event linkMouseOver
			 * Triggers when the mouse pointer is pointing to a link.
			 */
			"linkmouseover"
		);
		this.enableBubble("editenterkeypressed");
		this.on({
			"focus": {
				fn: this.applyHighlight,
				scope: this
			},
			"blur": {
				fn: this.onWrapBlur,
				scope: this
			},
			"linkmodechange": {
				fn: this.onLinkModeChange,
				scope: this
			}
		});
		if (this.hasClearIcon) {
			this.mixins.clearIcon.init.call(this);
		}
		if (this.enablePredictableIcon) {
			this.mixins.predictableIcon.init.call(this);
		}
	},

	/**
	 * The method returns the parameter object of the control's rendering template.
	 * @protected
	 * @return {Object}
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		const initValue = this.getInitValue();
		tplData.renderLeftIcon = this.renderLeftIcon || Ext.emptyFn;
		tplData.renderRightIcon = this.renderRightIcon || Ext.emptyFn;
		tplData.renderClearIcon = this.renderClearIcon || Ext.emptyFn;
		tplData.renderPredictableIcon = this.renderPredictableIcon;
		tplData.direction = Terrasoft.getTextDirection(initValue);
		var baseEditTplData = {
			inputType: this.inputType,
			disabled: this.getDisabled(),
			readonly: this.getReadonly(),
			placeholder: Terrasoft.encodeHtml(this.placeholder),
			value: initValue,
			hasClearIcon: this.hasClearIcon,
			showValueAsLink: this.showValueAsLink,
			href: this.href,
			autocomplete: this.autocomplete
		};
		Ext.apply(baseEditTplData, tplData, {});
		Ext.apply(baseEditTplData, this.combineClasses(), {});
		this.styles = this.combineStyles();
		this.selectors = this.combineSelectors();
		return baseEditTplData;
	},

	/**
	 * Counts the styles for the control based on the configuration.
	 * @protected
	 * @return {String}A string containing a list of CSS classes.
	 */
	combineClasses: function() {
		var classes = {
			wrapClass: ["base-edit", "ts-box-sizing"],
			validationClass: ["base-edit-validation"],
			disabledElIconClass: ["base-edit-disabled-el-icon"],
			editInputClass: ["base-edit-input", "ts-box-sizing"]
		};
		var wrapClass = classes.wrapClass;
		if (!this.validationInfo.isValid) {
			wrapClass.push("base-edit-error");
		}
		if (this.bigSize) {
			wrapClass.push("base-edit-big");
		}
		if (this.useLeftIcon && this.useLeftIcon()) {
			wrapClass.push(this.editWithLeftIconClass);
		}
		if (this.useRightIcon && this.useRightIcon()) {
			wrapClass.push("base-edit-with-right-icon");
		}
		if (this.enablePredictableIcon && this.predictableState &&
			this.predictableState.state !== Terrasoft.PredictableState.INPROGRESS) {
			wrapClass.push(this.predictableWrapClass);
		}
		if (this.hasClearIcon) {
			this.combineWrapClasses(classes);
		}
		if (!this.enabled) {
			wrapClass.push(this.disabledClass);
		}
		if (this.readonly) {
			wrapClass.push(this.readonlyClass);
		}
		return this.combineLinkClasses(classes);
	},

	/**
	 * Add classes to display hyperlinks in the control.
	 * @protected
	 * @param {Object} classes An object with the classes of the control.
	 * @return {Object} An extended object with the classes of the control.
	 */
	combineLinkClasses: function(classes) {
		if (this.showValueAsLink) {
			var linkWrapClass = classes.linkWrapClass = [];
			linkWrapClass.push(this.linkWrapClass);
			var editInputClass = classes.editInputClass;
			var linkClass = classes.linkClass = [];
			linkClass.push("base-edit-link");
			if (this.hasLinkValue()) {
				editInputClass.push(this.notVisibleClass);
			} else {
				linkWrapClass.push(this.notVisibleClass);
			}
		}
		return classes;
	},

	/**
	 * The method initializes styles for the control template.
	 * @protected
	 * @return {Object} The object that contains the styles.
	 */
	combineStyles: function() {
		var styles = {
			wrapStyle: {},
			inputStyle: {},
			validationStyle: {}
		};
		var width = this.width ? this.width : "";
		var height = this.height ? this.height : "";
		var fontSize = this.fontSize;
		var fontFamily = this.fontFamily;
		var wrapStyle = styles.wrapStyle;
		var inputStyle = styles.inputStyle;
		var validationStyle = styles.validationStyle;
		if (width) {
			wrapStyle.width = width;
		}
		if (height) {
			wrapStyle.height = height;
		}
		if (fontSize) {
			inputStyle.fontSize = fontSize;
		}
		if (fontFamily) {
			inputStyle.fontFamily = fontFamily;
		}
		if (!this.validationInfo.isValid) {
			validationStyle.display = "block";
		}
		return styles;
	},

	/**
	 * The method returns the selectors of the control.
	 * @protected
	 * @return {Object} The selector object.
	 */
	combineSelectors: function() {
		var id = this.id;
		var selectors = {
			wrapEl: "#" + id + "-wrap",
			el: "#" + id + "-el",
			validationEl: "#" + id + "-validation",
			disabledElIconEl: "#" + id + "-disabled-el-icon"
		};
		if (this.useLeftIcon && this.useLeftIcon()) {
			selectors.leftIconEl = "#" + id + "-left-icon";
		}
		if (this.hasClearIcon) {
			this.mixins.clearIcon.combineSelectors.call(this, selectors);
		}
		if (this.useRightIcon && this.useRightIcon()) {
			selectors.rightIconEl = "#" + id + "-right-icon";
			selectors.rightIconWrapperEl = "#" + id + "-right-icon-wrapper";
		}
		if (this.showValueAsLink) {
			selectors.linkEl = "#" + id + "-link-el";
			selectors.linkWrapEl = "#" + id + "-link-wrap";
		}
		return selectors;
	},

	/**
	 * Initializes the subscription to the DOM event of the control.
	 * @override
	 * @protected
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		var validationInfo = this.validationInfo;
		var el = this.getEl();
		el.on({
			"focus": {
				fn: this.onFocus,
				scope: this
			},
			"blur": {
				fn: this.onBlur,
				scope: this
			},
			"keydown": {
				fn: this.onKeyDown,
				scope: this
			},
			"keypress": {
				fn: this.onKeyPress,
				scope: this
			},
			"keyup": {
				fn: this.onKeyUp,
				scope: this
			}
		});
		if (this.disableInputDrop) {
			el.on("dragover", this.onDragOver, this);
			el.on("drop", this.onDrop, this);
		}
		if (!Ext.supports.Placeholder) {
			this.emulatePlaceholder();
		}
		if (this.useLeftIcon && this.useLeftIcon()) {
			this.initLeftIconEvents();
		}
		if (this.useRightIcon && this.useRightIcon()) {
			this.initRightIconEvents();
		}
		if (this.enablePredictableIcon) {
			this.mixins.predictableIcon.initDomEvents.call(this);
		}
		this.mixins.clearIcon.initDomEvents.call(this);
		if (!validationInfo.isValid) {
			this.showValidationMessage(validationInfo.invalidMessage);
		}
		this.subscribeLinkEvent();
	},

	/**
	 * On drop event handler.
	 * @param {Ext.EventObject} e Event object.
	 * @returns {Boolean} Is enabled drop.
	 */
	onDrop: function (e) {
		e.preventDefault();
		return false;
	},

	/**
	 * On drag over event handler.
	 * @param {Ext.EventObject} e Event object.
	 */
	onDragOver: function (e) {
		e.preventDefault();
		var dataTransfer = e.browserEvent && e.browserEvent.dataTransfer;
		if (dataTransfer) {
			dataTransfer.dropEffect = "none";
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterRender
	 * @protected
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.setClearIconVisibility();
		this.internalSetFocused(this.focused);
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterReRender
	 * @protected
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.setClearIconVisibility();
	},

	/**
	 * Signs on events to display the hyperlink in the control.
	 * @protected
	 */
	subscribeLinkEvent: function() {
		if (this.showValueAsLink) {
			var wrapEl = this.getWrapEl();
			wrapEl.on("click", this.onClick, this);
			var linkEl = this.getLinkEl();
			linkEl.on("click", this.onLinkClick, this);
			linkEl.on("mouseover", this.onLinkMouseOver, this);
		}
	},

	/**
	 * Mouse over event handler.
	 * @param {Object} event Event.
	 * @param {Object} target Target element.
	 */
	onLinkMouseOver: function(event, target) {
		this.fireEvent("linkmouseover", {targetId: target.id});
	},

	/**
	 * The handler for clicking on the hyperlink of the control.
	 * @protected
	 * @param {Event} e
	 */
	onLinkClick: function(e) {
		if (this.fireEvent("linkclick", this, this.href) === false) {
			e.stopEvent();
		}
	},

	/**
	 * The handler for changing the edit mode of the control.
	 * @protected
	 * @param {Object} sender
	 * @param {Boolean} linkMode
	 */
	onLinkModeChange: function(sender, linkMode) {
		if (this.isLinkMode && this.readonly) {
			return;
		}
		var el = this.getEl();
		var linkWrapEl = this.getLinkWrapEl();
		if (linkMode) {
			linkWrapEl.removeCls(this.notVisibleClass);
			el.addCls(this.notVisibleClass);
		} else {
			linkWrapEl.addCls(this.notVisibleClass);
			el.removeCls(this.notVisibleClass);
		}
	},

	/**
	 * Sets the information about the result of the validation for the control.
	 * @protected
	 */
	setValidationInfo: function(info) {
		if (this.validationInfo === info) {
			return;
		}
		this.validationInfo = info;
		if (!this.rendered) {
			return;
		}
		this.setMarkOut();
	},

	/**
	 * Sets the hyperlink value.
	 * @protected
	 * @param {Object} config
	 * config.caption {String} Displayed value.
	 * config.href {String} The value of the hyperlink.
	 */
	setLinkValue: function(config) {
		if (!config || this.href === config.url) {
			return;
		}
		var linkCaption = Terrasoft.encodeHtml(config.caption) || "";
		this.href = config.url || "";
		if (this.rendered && this.showValueAsLink) {
			var linkEl = this.getLinkEl();
			linkEl.set({"href": this.href});
			linkEl.setHTML(linkCaption);
			this.setLinkMode(!Ext.isEmpty(this.href) && !Ext.isEmpty(linkCaption));
		}
	},

	/**
	 * Sets the use of the hyperlink in the control.
	 * @protected
	 * @param {Boolean} showValueAsLink
	 */
	setShowValueAsLink: function(showValueAsLink) {
		if (this.showValueAsLink !== showValueAsLink) {
			this.showValueAsLink = showValueAsLink;
			this.safeRerender();
		}
	},

	/**
	 * Overrides the base class method {@link Terrasoft.Component}. The method checks the presence of the selector el.
	 * False if the selector is not found.  As a result, the
	 * {@link Terrasoft.Component # applySelectors applySelectors ()} method will throw an exception.
	 * @override
	 * @protected
	 * @return {Boolean}
	 */
	verifySelectors: function() {
		var result = this.callParent(arguments);
		result = this.selectors.el ? result : false;
		return result;
	},

	/**
	 * Gets the values of the input field of the control that was saved in the class.
	 * @protected
	 * @return {String}
	 */
	getInitValue: function() {
		return Terrasoft.encodeHtml(this.value || "");
	},

	/**
	 * Creates the HTML disabled attribute of the control.
	 * @protected
	 * @return {String}
	 */
	getDisabled: function() {
		return this.enabled ? "" : "readonly = 'readonly'";
	},

	/**
	 * Creates an HTML readonly attribute for the control.
	 * @protected
	 * @return {String}
	 */
	getReadonly: function() {
		return this.readonly ? "readonly = 'readonly'" : "";
	},

	/**
	 * Applies the CSS backlight class for the control.
	 * @protected
	 */
	applyHighlight: function() {
		var wrapEl = this.getWrapEl();
		wrapEl.addCls(this.focusClass);
	},

	/**
	 * Cancels the CSS backlight class for the control.
	 * @protected
	 */
	removeHighlight: function() {
		var wrapEl = this.getWrapEl();
		wrapEl.removeCls(this.focusClass);
	},

	/**
	 * Sets the editing mode for the control.
	 * @protected
	 * @param {Boolean} linkMode
	 */
	setLinkMode: function(linkMode) {
		if (this.showValueAsLink) {
			this.isLinkMode = linkMode;
			this.fireEvent("linkmodechange", this, linkMode);
		}
	},

	/**
	 * The event handler for the focus loss by the control.
	 * If the focus is lost, the highlighting around the control is removed and the display mode
	 * of the input field is changed.
	 * @protected
	 */
	onWrapBlur: function() {
		this.removeHighlight();
		this.setLinkMode(!Ext.isEmpty(this.href));
		this.setFocused(false);
	},

	/**
	 * The handler of the focus acquisition control event.
	 * @protected
	 */
	onFocus: function() {
		if (!this.enabled || !this.rendered) {
			return;
		}
		this.focused = true;
		this.fireEvent("focus", this);
		this.fireEvent("focusChanged", this);
	},

	/**
	 * The event handler for the focus loss event by the control.
	 * If the focus is lost, the control is checked and the value in the input field is checked.
	 * @protected
	 */
	onBlur: function() {
		if (!this.enabled || !this.rendered) {
			return;
		}
		var value = this.getTypedValue();
		this.changeValue(value);
		this.focused = false;
		this.fireEvent("blur", this);
		this.fireEvent("focusChanged", this);
	},

	/**
	 * Change the mode if the click occurred outside of the hyperlink of the control.
	 * @param {Event} e The mousedown event.
	 * @protected
	 */
	onClick: function(e) {
		if (!this.enabled || this.readonly) {
			return;
		}
		var linkEl = this.getLinkEl();
		if (linkEl && !e.within(linkEl.el)) {
			this.setLinkMode(false);
			if (!this.focused) {
				this.setFocused(true);
			}
		}
	},

	/**
	 * Adds a CSS class to the control, depending on the isValid flag.
	 * If isValid is set to true, the class that signals the error is removed,
	 * if isValid is set to false, the class that signals the error is added.
	 * @protected
	 */
	setMarkOut: function() {
		if (!this.rendered) {
			return;
		}
		var validationEl = this.getValidationEl();
		if (!validationEl) {
			return;
		}
		var wrap = this.getWrapEl();
		var errorClass = this.errorClass;
		var validationInfo = this.validationInfo;
		validationEl.setStyle("width", "");
		if (validationInfo.isValid) {
			wrap.removeCls(errorClass);
			this.showValidationMessage("");
		} else {
			wrap.addCls(errorClass);
			this.showValidationMessage(validationInfo.invalidMessage);
		}
		var wrapWidth = wrap.getWidth();
		var validationElWidth = validationEl.getWidth();
		if (validationElWidth > wrapWidth) {
			validationEl.setWidth(wrapWidth);
		}
		validationEl.setVisible(!validationInfo.isValid);
	},

	/**
	 * The handler of the keystroke event in the input field of the control.
	 * @protected
	 */
	onKeyDown: function(e) {
		if (!this.enabled) {
			return;
		}
		var key = e.getKey();
		if (key === e.ENTER) {
			this.onEnterKeyPressed();
		}
		this.fireEvent("keydown", this, e);
	},

	/**
	 * The "key pressed" event handler in the input field of the control.
	 * @protected
	 */
	onKeyPress: function(e) {
		if (this.enabled) {
			this.fireEvent("keypress", this, e);
		}
	},

	/**
	 * The "key released" event handler in the input field of the control.
	 * @protected
	 */
	onKeyUp: function(event) {
		if (!this.enabled) {
			return;
		}
		this.fireEvent("keyup", this, event);
	},

	/**
	 * Emulates the values of the input field of the control when its value is empty.
	 * @protected
	 */
	emulatePlaceholder: function() {
		var self = this;
		var input = this.getEl();
		var placeholder = input.getAttribute("placeholder");
		var value = this.getValue();
		if (!value && placeholder) {
			input.dom.value = placeholder;
			input.addCls("base-edit-placeholder");
		}
		var onFocus = function() {
			var input = self.getEl();
			var value = self.getValue();
			if (input.hasCls("base-edit-placeholder")) {
				if (value === placeholder) {
					input.dom.value = "";
				}
				input.removeCls("base-edit-placeholder");
			}
		};
		var onBlur = function() {
			var input = self.getEl();
			var value = self.getValue();
			if (!value && placeholder) {
				input.dom.value = placeholder;
				input.addCls("base-edit-placeholder");
			}
		};
		this.on("focus", onFocus, this);
		this.on("blur", onBlur, this);
	},

	/**
	 * The event handler for pressing the "ENTER" key in the input field of the control.
	 * @protected
	 */
	onEnterKeyPressed: function() {
		var value = this.getTypedValue();
		var hasChanges = this.changeValue(value);
		this.fireEvent("enterkeypressed", this);
		if (!hasChanges) {
			this.fireEvent("editenterkeypressed", this);
		}
	},

	/**
	 * Compares the value of the value parameter and the value of the control,
	 * if they are not equal, the "change" event is called and a new value is set.
	 * @protected
	 * @param {String} value
	 * @return {Boolean} true - if the value has changed, otherwise it is false.
	 */
	changeValue: function(value) {
		var isChanged = (value !== this.getValue());
		if (isChanged) {
			this.value = value;
			this.fireEvent("change", value, this);
			this.setClearIconVisibility();
		}
		return isChanged;
	},

	/**
	 * Sets the value in the DOM.
	 * @param {String} value
	 * @protected
	 */
	setDomValue: function(value) {
		var el = this.getEl();
		if (Ext.isEmpty(el)) {
			return;
		}
		el.dom.value = value;
	},

	/**
	 * Deletes the subscription to keystroke events in the input field of the control.
	 * @protected
	 */
	onDestroy: function() {
		this.mixins.clearIcon.destroy.call(this);
		this.mixins.predictableIcon.destroy.call(this);
		this._unsubscribeOnColumnValidation();
		this.callParent(arguments);
	},

	/**
	 * Extends the binding mechanism of {@link Terrasoft.Bindable} mixin events
	 * by working with a column of the type directory.
	 * @protected
	 * @override
	 */
	subscribeForEvents: function(binding, property, model) {
		this.callParent(arguments);
		if (property === "value" && model.canValidate) {
			this._subscribeOnValueColumnChange(binding, property, model);
			this._subscribeOnColumnValidation(binding, property, model);
		}
	},

	//endregion

	//region Methods: Public

	/**
	 * Checks whether the value of the hyperlink is there.
	 * @return {Boolean}
	 */
	hasLinkValue: function() {
		if (!Ext.isEmpty(this.href) && !Ext.isEmpty(this.getInitValue())) {
			return true;
		} else {
			return false;
		}
	},

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var baseEditBindConfig = {
			value: {
				changeEvent: "change",
				changeMethod: "setValue",
				validationMethod: "setValidationInfo"
			},
			isRequired: {
				changeMethod: "setRequired"
			},
			readonly: {
				changeMethod: "setReadonly"
			},
			focused: {
				changeEvent: "focusChanged",
				changeMethod: "setFocused"
			},
			placeholder: {
				changeMethod: "setPlaceholder"
			},
			showValueAsLink: {
				changeMethod: "setShowValueAsLink"
			},
			href: {
				changeMethod: "setLinkValue"
			}
		};
		Ext.apply(bindConfig, baseEditBindConfig);
		Ext.apply(bindConfig, this.mixins.predictableIcon.getBindConfig());
		return bindConfig;
	},

	/**
	 * Returns a reference to the main DOM element of the component (see {@link #el el}).
	 * @return {Ext.dom.Element}
	 */
	getEl: function() {
		return this.el;
	},

	/**
	 * Returns a reference to the DOM element of the component's hyperlink (see {@link #el el}).
	 * @return {Ext.dom.Element}
	 */
	getLinkEl: function() {
		return this.linkEl;
	},

	/**
	 * Returns a reference to the DOM element wrapping the component's hyperlink (see {@link # el el}).
	 * @return {Ext.dom.Element}
	 */
	getLinkWrapEl: function() {
		return this.linkWrapEl;
	},

	/**
	 * Returns a reference to the text DOM element of the component's validation (see {@link #el el}).
	 * @return {Ext.dom.Element}
	 */
	getValidationEl: function() {
		return this.validationEl;
	},

	/**
	 * Inserts the validation text into the component's DOM element (see {@link # el el}).
	 * @return {Ext.dom.Element}
	 */
	showValidationMessage: function(message) {
		this.validationEl.update(message);
		this._setTooltipValidationMessage(message);
	},

	/**
	 * Sets the values of the control. Checks for correctness.
	 * If the displayed value control is set to the input field.
	 * @param {String} value
	 * @return {Boolean} isChanged True if the passed value does not match the current value.
	 */
	setValue: function(value) {
		var isChanged = this.changeValue(value);
		if (this.rendered && isChanged) {
			value = (value) ? value : "";
			this.setDomValue(value);
			this.setElementDirection(this.getEl(), this.value);
			this.setElementDirection(this.getLinkEl(), this.value);
		}
		return isChanged;
	},

	/**
	 * Sets direction to dom element by display value.
	 * @protected
	 * @param {Ext.dom.Element} el Element for set direction.
	 * @param {String} value Control display value.
	 */
	setElementDirection: function(el, value) {
		if (el && el.dom) {
			const direction = Terrasoft.getTextDirection(value);
			if (direction) {
				el.dom.setAttribute("dir", direction);
			}
		}
	},

	/**
	 * Returns the value of the control.
	 * @return {String}
	 */
	getValue: function() {
		return this.value;
	},

	/**
	 * Returns the DOM value of the control input field.
	 * @return {String}
	 */
	getTypedValue: function() {
		if (this.rendered) {
			var el = this.getEl();
			return el.dom.value;
		} else {
			return null;
		}
	},

	/**
	 * Returns the DOM element of the left icon.
	 * @return {Object}
	 */
	getLeftIconEl: function() {
		if (this.useLeftIcon && this.useLeftIcon()) {
			return this.leftIconEl;
		}
	},

	/**
	 * Returns the DOM element of the right icon.
	 * @return {Object}
	 */
	getRightIconEl: function() {
		if (this.useRightIcon && this.useRightIcon()) {
			return this.rightIconEl;
		}
	},

	/**
	 * Displays the left icon in the control.
	 * @param {Boolean} show If the value is set to true - the icon is shown if the icon is hidden in the false.
	 */
	showLeftIcon: function(show) {
		if (this.useLeftIcon && this.useLeftIcon()) {
			if (this.enableLeftIcon !== show) {
				this.enableLeftIcon = show;
				this.safeRerender();
			}
		}
	},

	/**
	 * Displays the right icon in the control.
	 * @param {Boolean} show If the value is set to true - the icon is shown if the icon is hidden in the false.
	 */
	showRightIcon: function(show) {
		if (this.useRightIcon && this.useRightIcon()) {
			if (this.enableRightIcon !== show) {
				this.enableRightIcon = show;
				this.safeRerender();
			}
		}
	},

	/**
	 * Sets the value of the binding of the control.
	 * @param {Boolean} required
	 */
	setRequired: function(required) {
		if (this.isRequired !== required) {
			this.isRequired = required;
		}
	},

	/**
	 * Configures the read-only mode of the control.
	 * @param {Boolean} readonly If the value is set to true - the control becomes read-only,
	 * if false, it is usually displayed.
	 */
	setReadonly: function(readonly) {
		this.readonly = readonly;
		if (!this.rendered) {
			return;
		}
		var el = this.getEl();
		var wrapEl = this.getWrapEl();
		if (readonly) {
			wrapEl.addCls(this.readonlyClass);
			el.set({readonly: "readonly"});
		} else {
			wrapEl.removeCls(this.readonlyClass);
			el.set({readonly: undefined});
		}
	},

	/**
	 * Configures the lock of the control.
	 * @param {Boolean} enabled If the value is set to true - the control becomes locked,
	 * if it is false, it is displayed normally.
	 */
	setEnabled: function(enabled) {
		this.callParent(arguments);
		this.enabled = enabled;
		if (!this.rendered) {
			return;
		}
		var el = this.getEl();
		var wrapEl = this.getWrapEl();
		if (Ext.isEmpty(wrapEl)) {
			return;
		}
		if (enabled) {
			wrapEl.removeCls(this.disabledClass);
			el.dom.removeAttribute("readonly");
		} else {
			wrapEl.addCls(this.disabledClass);
			el.set({readonly: "readonly"});
		}
	},

	/**
	 * Sets the width of the control.
	 * @param {String} width New width, the string containing the css value for the width.
	 */
	setWidth: function(width) {
		if (this.width !== width) {
			this.width = width;
			if (this.rendered) {
				var el = this.getWrapEl();
				el.setWidth(width);
			}
		}
	},

	/**
	 * Returns the width of the control.
	 * @return {String} A string containing the css value for the width.
	 */
	getWidth: function() {
		if (!this.rendered) {
			return this.width;
		}
		var wrapEl = this.getWrapEl();
		return wrapEl.getWidth();
	},

	/**
	 * Sets the height of the control.
	 * @param {Number} height New height, the string containing the css value for the height.
	 */
	setHeight: function(height) {
		if (this.height !== height) {
			this.height = height;
			if (this.rendered) {
				var el = this.getWrapEl();
				el.setHeight(height);
			}
		}
	},

	/**
	 * Returns the height of the control.
	 * @return {String} A string containing the css value for the height.
	 */
	getHeight: function() {
		if (!this.rendered) {
			return this.height;
		}
		var wrapEl = this.getWrapEl();
		return wrapEl.getHeight();
	},

	/**
	 * Clear the subscription to DOM events
	 * @inheritdoc Terrasoft.controls.Component#clearDomListeners
	 * @override
	 */
	clearDomListeners: function() {
		this.callParent(arguments);
		var el = this.getEl();
		// todo: Delete check after solution CRM-7868
		if (el) {
			el.un("keydown", this.onKeyDown, this);
			el.un("keypress", this.onKeyPress, this);
			el.un("keyup", this.onKeyUp, this);
			el.un("blur", this.onBlur, this);
			el.un("focus", this.onFocus, this);
			if (this.disableInputDrop) {
				el.un("dragover", this.onDragOver, this);
				el.un("drop", this.onDrop, this);
			}
		}
		var wrapEl = this.getWrapEl();
		// todo: Delete check after solution CRM-7868
		if (wrapEl) {
			wrapEl.un("click", this.onClick, this);
		}
		var linkEl = this.getLinkEl();
		if (linkEl) {
			linkEl.un("click", this.onLinkClick, this);
			linkEl.un("linkmouseover", this.onLinkMouseOver, this);
		}
		this.mixins.clearIcon.clearDomListeners.call(this);
		if (this.enablePredictableIcon) {
			this.mixins.predictableIcon.clearDomListeners.call(this);
		}
	},

	/**
	 * Sets the focus for the control and the DOM element.
	 * @param {Boolean} focused New value.
	 */
	setFocused: function(focused) {
		if ((this.focused === focused) || !Ext.isBoolean(focused)) {
			return;
		}
		this.focused = focused;
		this.internalSetFocused(focused);
	},

	/**
	 * Sets the cursor to the end of the value of the control.
	 * @protected
	 */
	setCaretToLastPosition: function() {
		var el = this.getEl();
		var value = el.getValue();
		var position = 0;
		if (value.length > 0) {
			position = value.length;
		}
		Terrasoft.utils.dom.setCaretPosition(el.dom, position);
	},

	/**
	 * Sets the placeholder value for the control.
	 * @param {String} placeholder The text that is displayed when the input field is empty.
	 */
	setPlaceholder: function(placeholder) {
		if (this.placeholder === placeholder) {
			return;
		}
		this.placeholder = placeholder;
		if (!this.rendered) {
			return;
		}
		var el = this.getEl();
		if (Ext.supports.Placeholder) {
			el.set({placeholder: this.placeholder || undefined});
		} else if (el.hasCls("base-edit-placeholder")) {
			el.dom.value = this.placeholder || "";
		}
	}

	//endregion

});
