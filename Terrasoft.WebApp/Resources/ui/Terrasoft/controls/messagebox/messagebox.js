Ext.ns("Terrasoft.controls.MessageBoxEnums");

/**
 * @enum {string} Terrasoft.controls.MessageBoxEnums.Buttons
 * A collection of pre-configured buttons.
 */
Terrasoft.MessageBoxButtons = {
	/**
	 * YES button
	 * @type {Object}
	 */
	YES: {
		className: "Terrasoft.Button",
		caption: Terrasoft.Resources.Controls.MessageBox.ButtonCaptionYes,
		markerValue: Terrasoft.Resources.Controls.MessageBox.ButtonCaptionYes,
		returnCode: "yes"
	},
	/**
	 * NO button
	 * @type {Object}
	 */
	NO: {
		className: "Terrasoft.Button",
		caption: Terrasoft.Resources.Controls.MessageBox.ButtonCaptionNo,
		markerValue: Terrasoft.Resources.Controls.MessageBox.ButtonCaptionNo,
		returnCode: "no"
	},
	/**
	 * CANCEL button
	 * @type {Object}
	 */
	CANCEL: {
		className: "Terrasoft.Button",
		caption: Terrasoft.Resources.Controls.MessageBox.ButtonCaptionCancel,
		markerValue: Terrasoft.Resources.Controls.MessageBox.ButtonCaptionCancel,
		returnCode: "cancel"
	},
	/**
	 * CLOSE button
	 * @type {Object}
	 */
	CLOSE: {
		className: "Terrasoft.Button",
		caption: Terrasoft.Resources.Controls.MessageBox.ButtonCaptionClose,
		markerValue: Terrasoft.Resources.Controls.MessageBox.ButtonCaptionClose,
		returnCode: "close"
	},
	/**
	 * OK button
	 * @type {Object}
	 */
	OK: {
		className: "Terrasoft.Button",
		caption: Terrasoft.Resources.Controls.MessageBox.ButtonCaptionOk,
		markerValue: Terrasoft.Resources.Controls.MessageBox.ButtonCaptionOk,
		returnCode: "ok"
	},
	/**
	 * Save button
	 * @type {Object}
	 */
	SAVE: {
		className: "Terrasoft.Button",
		caption: Terrasoft.Resources.Controls.MessageBox.ButtonCaptionSave,
		markerValue: Terrasoft.Resources.Controls.MessageBox.ButtonCaptionSave,
		returnCode: "save"
	}
};

/**
 * Alias for {@link Terrasoft.MessageBoxButtons}
 * @inheritdoc Terrasoft.MessageBoxButtons
 */
Terrasoft.controls.MessageBoxEnums.Buttons = Terrasoft.MessageBoxButtons;

/**
 * @enum {Object} Terrasoft.controls.MessageBoxEnums.Styles
 * Preconfigured styles of dialog boxes.
 */
Terrasoft.MessageBoxStyles = {
	RED: {
		borderStyle: "ts-messagebox-border-style-red",
		buttonStyle: "red"
	},
	BLUE: {
		borderStyle: "ts-messagebox-border-style-blue",
		buttonStyle: "blue"
	}
};

/**
 * Shortening for {@link Terrasoft.controls.MessageBoxEnums#Styles}
 * @member Terrasoft.controls.MessageBoxEnums
 * @enum Styles
 * @inheritdoc Terrasoft.controls.MessageBoxEnums#Styles
 */
Terrasoft.controls.MessageBoxEnums.Styles = Terrasoft.MessageBoxStyles;

/**
 * ##### ### ###### # ########## #####.
 *
 *    Ext.create("Terrasoft.MessageBox", {
 *		buttons: ["yes", "no", {
 *			className: "Terrasoft.Button",
 *			returnCode: "customButton",
 *			style: "green",
 *			caption: "myButton"
 *		}],
 *		defaultButton: 0,
 *		caption: "###### # ##### ######## ## ######### # ##### ############# #######"
 *	});
 */
Ext.define("Terrasoft.controls.MessageBox", {
	extend: "Terrasoft.controls.Container",
	alternateClassName: "Terrasoft.MessageBox",

	singleton: true,

	/**
	 * The place where the control will be displayed
	 * @type {Object}
	 */
	renderTo: null,

	/**
	 * The default configuration used when updating the control.
	 * @protected
	 * @type {Object}
	 */
	defaultConfig: {
		caption: "",
		buttons: null,
		defaultButton: null,
		callback: null,
		scope: null,
		style: Terrasoft.MessageBoxStyles.BLUE,
		visible: false,
		controlConfig: null,
		customWrapClass: null,
		handler: null
	},

	/**
	 * Configuration classes for the control template.
	 * @protected
	 * @type {Object}
	 */
	configClasses: {
		leftPositionClass: "ts-messagebox-center-left-position",
		centralPositionClass: "ts-messagebox-center-position",
		defaultButtonStyle: "t-btn-style-default",
		buttonFocus: "t-btn-focus"
	},

	/**
	 * The method is called when the button or ESC key is pressed.
	 * @protected
	 * @param {String} returnCode The code of the pressed button
	 */
	handler: null,

	/**
	 * The context in which the {@link #handler handler} is executed.
	 * @protected
	 */
	scope: null,

	/**
	 * @inheritdoc Terrasoft.Component#visible
	 * @override
	 */
	visible: false,

	/**
	 * The title that will be shown in the control.
	 * @type {String}
	 */
	caption: "",

	/**
	 * The default button number from the {@link Terrasoft.AbstractContainer.items items} array.
	 * Numbering starts from zero.
	 * @type {Number}
	 */
	defaultButton: null,

	/**
	 * The array of buttons for the control. For an example, see {@link Terrasoft.MessageBoxButtons}
	 * @type {Array}
	 */
	buttons: null,

	/**
	 * Control Style
	 * @type {Terrasoft.controls.MessageBoxEnums.Styles}
	 */
	style: Terrasoft.MessageBoxStyles.BLUE,

	/**
	 * Configuring custom controls
	 * @type {Object}
	 * Example:
	 *
	 * {
	 *  link: {
	 *   dataValueType: Terrasoft.DataValueType.TEXT,
	 *   caption: "Text",
	 *   value: "Text",
	 *   renderTo: "custom-container"
	 *  },
	 *  checkbox: {
	 *   dataValueType: Terrasoft.DataValueType.BOOLEAN,
	 *   caption: "Logical",
	 *   value: true,
	 *   renderTo: "custom-container"
	 *  },
	 *  date: {
	 *   dataValueType: Terrasoft.DataValueType.DATE,
	 *   caption: "Date",
	 *   value: new Date(Date.now()),
	 *   renderTo: "custom-container"
	 *  },
	 *  memo: {
	 *   dataValueType: Terrasoft.DataValueType.TEXT,
	 *   caption: "Text",
	 *   value: "Text",
	 *   renderTo: "custom-container",
	 *   customConfig: {
	 *   	className: "Terrasoft.MemoEdit"
	 *   }
	 *  }
	 * }
	 *
	 */
	controlConfig: null,

	/**
	 * An array of custom controls
	 * @type {Array}
	 */
	controlArray: null,

	/**
	 * Name of the container of custom controls.
	 * @type {String}
	 */
	controlContainer: "-custom-control",

	/**
	 * Name of custom wrap class.
	 * @type {String}
	 */
	customWrapClass: null,

	/**
	 * Use Html content flag.
	 * @type {Boolean}
	 */
	useHtmlContent: false,

	/**
	 * @inheritdoc Terrasoft.Component#init
	 * @protected
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event
			 * Event of changing the status of the dialog box.
			 * Called when the button is pressed inside the control or the ESC key.
			 * @param {String} returnCode keystroke code.
			 * @param {Terrasoft.MessageBox} self link to the current control.
			 * @param {Terrasoft.Button} this link to the button control.
			 */
			"stateChanged"
		);
		this.on("stateChanged", this.onStateChanged, this);
	},

	/**
	 * The {@link #stateChanged stateChanged} event handler. If {@link #handler handler} is specified, it calls it.
	 * @protected
	 * @param  {String} returnCode The code of the pressed button
	 */
	onStateChanged: function(returnCode) {
		var handler = this.handler;
		var scope = this.scope || this;
		this.updateCustomControl();
		if (handler) {
			var controlState = Terrasoft.deepClone(this.controlConfig);
			if (this.controlConfig) {
				this.controlConfig = null;
			}
			handler.call(scope, returnCode, controlState);
		}
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#initItems
	 * @override
	 */
	initItems: function() {
		this.items = this.getMessageBoxItems();
		this.callParent(arguments);
		this.attachButtonsHandlers();
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#add
	 * Adds handlers to buttons.
	 * @override
	 */
	add: function() {
		this.callParent(arguments);
		this.attachButtonsHandlers();
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#getTpl
	 * @override
	 */
	getTpl: function() {
		return [
			"<div id=\"{id}-cover\" class=\"{coverClass}\"></div>",
			"<div id=\"{id}-wrap\" class=\"{boxClass}\">",
			"<tpl if=\"!inputbox\">",
			"<div id=\"{id}-caption\" class=\"{captionClass}\"" +
			"<tpl if=\"direction\"> dir=\"{direction}\"</tpl>",
			">",
			"{caption}",
			"</div>",
			"</tpl>",
			"<tpl if=\"inputbox\">",
			"<tpl if=\"caption\">",
			"<div id=\"{id}-caption\" class=\"{inputboxCaptionClass}\"" +
			"<tpl if=\"direction\"> dir=\"{direction}\"</tpl>",
			">",
			"{caption}",
			"</div>",
			"</tpl>",
			"<tpl if=\"!caption\">",
			"<div id=\"{id}-caption\" class=\"{inputboxNoCaptionClass}\">",
			"</div>",
			"</tpl>",
			"<div id=\"{id}-inputbox\">",
			"<div id=\"{id}-custom-control\" class=\"{customControl}\">",
			"</div>",
			"</div>",
			"</tpl>",
			"<tpl for=\"items\">",
			"<@item>",
			"</tpl>",
			"</div>"
		];
	},

	/**
	 * Returns an array of buttons.
	 * If the string is encountered in the {@link Terrasoft.AbstractContainer # items items} array,
	 * the string method looks for the button by name in the default settings.
	 * Adds the default style for the button.
	 * @protected
	 * @return {Array}
	 */
	getMessageBoxItems: function() {
		var items = this.buttons;
		if (!items) {
			items = [Terrasoft.MessageBoxButtons.CLOSE];
		}
		var messageBoxItems = [];
		var button;
		for (var i = 0, length = items.length; i < length; i++) {
			var item = items[i];
			if (Ext.isString(item)) {
				item = item.toUpperCase();
				button = Terrasoft.MessageBoxButtons[item];
				if (button !== undefined) {
					messageBoxItems.push(Ext.apply({}, button));
				}
			}
			if (Ext.isObject(item)) {
				messageBoxItems.push(item);
			}
		}
		var defaultButton = this.defaultButton;
		if (defaultButton !== null) {
			button = messageBoxItems[defaultButton];
			if (button !== undefined) {
				button.style = this.style.buttonStyle;
			}
		}
		var messageBoxItemsWithDefaultStyle = messageBoxItems.filter(function(value) {
			return !value.style || value.style === Terrasoft.controls.ButtonEnums.style.DEFAULT;
		});
		if (messageBoxItems.length > 0 && messageBoxItemsWithDefaultStyle.length === messageBoxItems.length) {
			messageBoxItems[0].style = Terrasoft.controls.ButtonEnums.style.BLUE;
		}
		if (this.defaultButton === null) {
			var itemWithNotDefaultStyle = Terrasoft.findItem(messageBoxItems, function(value) {
				return value.style && value.style !== Terrasoft.controls.ButtonEnums.style.DEFAULT;
			});
			if (itemWithNotDefaultStyle) {
				this.defaultButton = itemWithNotDefaultStyle.index;
			}
		}
		return messageBoxItems;
	},

	/**
	 * Initializes user controls
	 * @protected
	 */
	initCustomControl: function() {
		this.destroyCustomControl();
		this.wrapEl.on("click", this._onWrapElClick, this);
		var controlsConfig = Terrasoft.deepClone(this.controlConfig);
		if (!controlsConfig) {
			return null;
		}
		this.controlArray = [];
		Terrasoft.each(controlsConfig, this._initCustomControlItem, this);
	},

	/**
	 * @private
	 */
	_onWrapElClick: function(event) {
		if (!this._linkClick(event)) {
			event.stopEvent();
		}
	},

	/**
	 * @private
	 */
	_linkClick: function(event) {
		return event.target.tagName === "A" && this.useHtmlContent;
	},

	/**
	 * @private
	 */
	_initCustomControlItem: function(controlConfigItem, key) {
		var controlLabel = {
			className: "Terrasoft.Label",
			caption: controlConfigItem.caption || "",
			classes: {
				labelClass: ["controlCaption"]
			},
			isRequired: Boolean(controlConfigItem.isRequired)
		};
		var descriptionLabel = {
			className: "Terrasoft.Label",
			caption: controlConfigItem.description || "",
			classes: {
				labelClass: ["controlDescription"]
			},
			visible: Boolean(controlConfigItem.description)
		};
		var controlConfig = Terrasoft.getControlConfigByDataValueType(controlConfigItem.dataValueType);
		controlConfig.markerValue = controlConfigItem.caption || "";
		if (controlConfigItem.customConfig) {
			Ext.apply(controlConfig, controlConfigItem.customConfig);
		}
		if (controlConfigItem.dataValueType === Terrasoft.DataValueType.BOOLEAN) {
			controlConfig.checked = controlConfigItem.value;
		} else {
			controlConfig.value = controlConfigItem.value;
		}
		var renderTo = Ext.get(this.id + this.controlContainer);
		controlLabel.renderTo = controlConfig.renderTo = descriptionLabel.renderTo = renderTo;
		var item = {
			name: key,
			label: Ext.create(controlLabel.className, controlLabel),
			control: Ext.create(controlConfig.className, controlConfig),
			description: Ext.create(descriptionLabel.className, descriptionLabel)
		};
		var controlArray = this.controlArray;
		controlArray.push(item);
	},

	/**
	 * @inheritdoc Terrasoft.Component#initDomEvents
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		var document = Ext.getDoc();
		document.on("keydown", this.onKeyDown, this);
	},

	/**
	 * Key press event handler.
	 * @protected
	 * @param  {Event} e DOM event
	 */
	onKeyDown: function(e) {
		if (this.visible) {
			var key = e.getKey();
			if (key === e.ESC) {
				this.setVisible(false);
				var returnCode = Terrasoft.MessageBoxButtons.CANCEL.returnCode;
				this.fireEvent("stateChanged", returnCode, this);
			}
		}
	},

	/**
	 * Adds the event handler {@link #onButtonClick onButtonClick} to the buttons in the control.
	 * @protected
	 */
	attachButtonsHandlers: function() {
		var items = this.items.items;
		for (var i = 0, length = items.length; i < length; i++) {
			items[i].on("click", this.onButtonClick(this));
		}
	},

	/**
	 * The event handler {@link Terrasoft.Button # click click}.
	 * Hides the control, calls the {@link #stateChanged stateChanged} event.
	 * @protected
	 * @param {Object} self link to the control {@link Terrasoft.MessageBox # dialog box}
	 */
	onButtonClick: function(self) {
		return function() {
			var returnCode = this.returnCode;
			self.setVisible(false);
			self.fireEvent("stateChanged", returnCode, self, this);
		};
	},

	/**
	 * Performs a re-initialization of buttons in the control
	 */
	reConfigurateButtonItems: function() {
		var items = this.items;
		items.each(function(item) {
			item.destroy();
		}, this);
		items.clear();
		var buttons = this.getMessageBoxItems(this.buttons);
		this.add(buttons);
	},

	/**
	 * Applies the configuration to the {@link #defaultConfig} control by default.
	 */
	applyDefaultConfig: function() {
		Ext.apply(this, this.defaultConfig);
	},

	/**
	 * @inheritdoc Terrasoft.Component#reRender
	 * @override
	 */
	reRender: function() {
		this.renderTo = Ext.getBody();
		this._removeCoverEl();
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.initCustomControl();
		this.applyAfterRenderClasses();
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.initCustomControl();
		this.applyAfterRenderClasses();
	},

	/**
	 * Sets the css class to the control and passes the focus to the default button.
	 * @protected
	 */
	applyAfterRenderClasses: function() {
		var wrapEl = this.wrapEl;
		var height = wrapEl.getHeight();
		var configClasses = this.configClasses;
		wrapEl.setHeight(height);
		wrapEl.removeCls(configClasses.leftPositionClass);
		wrapEl.addCls(configClasses.centralPositionClass);
		var defaultButton = this.defaultButton;
		if (defaultButton !== null) {
			var item = this.items.items[defaultButton];
			if (item) {
				var defaultButtonWrapEl = item.selectors.wrapEl;
				var domWrapEl = Ext.query(defaultButtonWrapEl)[0];
				var buttonWrapEl = Ext.get(domWrapEl);
				buttonWrapEl.addCls(this.configClasses.buttonFocus);
				buttonWrapEl.focus();
			}
		}
	},

	/**
	 * The method returns the parameter object of the control's rendering template.
	 * @protected
	 * @override
	 * @return {Object}
	 */
	getTplData: function() {
		const tplData = this.callParent(arguments);
		const messageCaption = this.getMessageCaption();
		const messageBoxTplData = {
			caption: messageCaption,
			direction: Terrasoft.getTextDirection(messageCaption)
		};
		this.selectors = this.getSelectors();
		Ext.apply(tplData, this.getClasses());
		tplData.inputbox = Boolean(this.controlConfig);
		tplData.caption = Boolean(this.caption);
		return Ext.apply(tplData, messageBoxTplData, {});
	},

	/**
	 * Gets message caption.
	 * @protected
	 * @return {Object}
	 */
	getMessageCaption: function() {
		return this.useHtmlContent ? this.caption : Terrasoft.encodeHtml(this.caption);
	},

	/**
	 * Returns an array containing the css classes for the control template.
	 * @protected
	 * @return {Array}
	 */
	getClasses: function() {
		var classes = {
			coverClass: ["ts-messagebox-cover"],
			captionClass: ["ts-messagebox-caption"],
			inputboxCaptionClass: ["ts-inputbox-caption"],
			inputboxNoCaptionClass: ["ts-inputbox-nocaption"],
			customControl: ["ts-inpupbox-control"]
		};
		var boxClass = classes.boxClass = ["ts-messagebox-box", "ts-messagebox-center-left-position"];
		boxClass.push(this.style.borderStyle);
		if (this.customWrapClass) {
			boxClass.push(this.customWrapClass);
		}
		return classes;
	},

	/**
	 * Returns the selector object of the control.
	 * @protected
	 * @return {Object}
	 */
	getSelectors: function() {
		return {
			wrapEl: "#" + this.id + "-wrap",
			captionEl: "#" + this.id + "-caption"
		};
	},

	/**
	 * Sets the information label of the control
	 * @param {String} caption new caption
	 */
	setCaption: function(caption) {
		if (this.caption === caption) {
			return;
		}
		this.caption = caption;
		this.safeRerender();
	},

	/**
	 * @inheritdoc Terrasoft.Component#setVisible
	 * @override
	 */
	setVisible: function(visible) {
		if (this.visible === visible) {
			return;
		}
		if (!this.renderTo) {
			this.renderTo = Ext.getBody();
		}
		this.callParent(arguments);
		if (visible === true) {
			this._initCoverEl();
		}
		if (visible === false) {
			this._hideCoverEl();
		}
	},

	/**
	 * Updates the configuration values of user controls.
	 * @protected
	 */
	updateCustomControl: function() {
		if (!this.controlConfig) {
			return null;
		}
		var controlConfig = this.controlConfig;
		var controlArray = this.controlArray;
		for (var i = 0; i < controlArray.length; i++) {
			var key = controlArray[i].name;
			var objectItemConfig = controlConfig[key];
			var control = controlArray[i].control;
			objectItemConfig.value = Ext.isFunction(control.getValue) ? control.getValue() : control.value;
		}
	},

	/**
	 * Deletes user controls
	 * @protected
	 */
	destroyCustomControl: function() {
		var controlArray = this.controlArray;
		if (controlArray) {
			for (var i = 0; i < controlArray.length; i++) {
				var customControlItemLabel = controlArray[i].label;
				customControlItemLabel.destroy();
				var customControlItem = controlArray[i].control;
				customControlItem.destroy();
				var customControlItemDescription = controlArray[i].description;
				customControlItemDescription.destroy();
			}
		}
		this.controlArray = null;
		this.wrapEl.un("click", function(event) {
			event.stopEvent();
		});
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#destroy
	 * @override
	 */
	onDestroy: function() {
		this.destroyCustomControl();
		this.callParent(arguments);
	},

	/**
	 * Init message box cover element.
	 * @private
	 */
	_initCoverEl: function() {
		this.coverEl = Ext.get(this.id + "-cover");
		this.coverEl.on("wheel", function(event) {
			event.preventDefault();
		});
		this.coverEl.on("click", function(event) {
			event.stopEvent();
		});
		this.coverEl.dom.style.opacity = "0.3";
	},

	/**
	 * Hides message box cover element.
	 * @private
	 */
	_hideCoverEl: function() {
		this.coverEl.dom.style.display = "none";
	},

	/**
	 * Safe removes message box cover element.
	 * @private
	 */
	_removeCoverEl: function() {
		if (this.coverEl) {
			this.coverEl.destroy();
			this.coverEl = null;
		}
	},

	//region Methods: Public

	/**
	 * Prepares message box to show.
	 */
	prepare: function(config) {
		this.applyDefaultConfig();
		Ext.apply(this, config);
		this.reConfigurateButtonItems();
	},

	/**
	 * Shows message box.
	 */
	show: function() {
		this.setVisible(true);
	}

	//endregion

});
