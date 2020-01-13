/**
 * Class of the color editing control.
 */
Ext.define("Terrasoft.controls.ColorButton", {
	extend: "Terrasoft.Component",
	alternateClassName: "Terrasoft.ColorButton",

	/**
	 * Flag responsible for the mode of displaying the color palette. If the flag is set, the palette is displayed
	 * in a simple mode, in which there are 9 colors. If the flag is cleared - an expanded palette
	 * with 36 colors is displayed
	 * Actual for Terrasoft.MenuItemType.COLOR.
	 * @type {Boolean}
	 */
	simpleMode: false,

	/**
	 * Image config.
	 * @type {Object}
	 */
	imageConfig: null,

	/**
	 * Button id suffix.
	 * @type {String}
	 */
	buttonIdSuffix: "-button",

	/**
	 * Color button element viewer class name.
	 * @type {String}
	 */
	colorButtonViewerClass: "ts-color-button-viewer",

	/**
	 * Color button element viewer class name when button icon is not exist.
	 * @type {String}
	 */
	colorButtonViewerFullClass: "ts-color-button-viewer-full",

	/**
	 * Button for apply changed color and its open colorPicker menu.
	 * @type {Terrasoft.Button}
	 * @protected
	 */
	button: null,

	/**
	 * Color value.
	 * @type {String}
	 * @private
	 */
	value: null,

	/**
	 * Default color value.
	 * @type {String}
	 */
	defaultValue: "#000000",

	/**
	 * Color button template.
	 * @private
	 * @type {String[]}
	 */
	buttonTpl: [
		/* jshint white:false */
		/*jshint quotmark:false */
		//jscs: disable
		"<tpl if=\"hasWrapper\">",
			"<span id=\"{id}-wrapperEl\" class=\"{wrapperClass}\" style=\"{wrapperStyle}\" tabindex=\"{tabIndex}\"",
				" {extraComponentAttributes}>",
		"</tpl>",
			"<tpl if=\"hasInnerWrapper\">",
				"<span id=\"{id}-innerWrapperEl\" class=\"{innerWrapperClass}\" style=\"{innerWrapperStyle}\">",
			"</tpl>",
				"<tpl if=\"hasImage && !imageAfterText\">",
					"<span id=\"{id}-imageEl\" class=\"{imageClass}\" style=\"{imageStyle}\"></span>",
				"</tpl>",
				"<div id=\"{id}-viewerEl\" class=\"{colorButtonViewerClass}\" style=\"{colorValue}\"></div>",
					"<tpl if=\"text\">",
						"<span id=\"{id}-textEl\" class=\"{textClass}\" style=\"{textStyle}\"",
							"<tpl if=\"!hasWrapper\">",
							"tabindex=\"{tabIndex}\" {extraComponentAttributes}",
							"</tpl>",
							">",
							"{text}",
						"</span>",
					"</tpl>",
				"<tpl if=\"hasImage && imageAfterText\">",
					"<span id=\"{id}-imageEl\" class=\"{imageClass}\" style=\"{imageStyle}\"></span>",
				"</tpl>",
				"<tpl if=\"menu\">",
					"<span id=\"{id}-menuWrapEl\" class=\"{menuWrapClass}\">&nbsp;</span>",
					"<span id=\"{id}-menuEl\"\ class=\"{menuClass}\" style=\"{menuStyle}\" {menuAttribute}>",
					"<span id=\"{id}-markerEl\" class=\"{markerClass}\" style=\"{markerStyle}\"></span>",
					"</span>",
				"</tpl>",
			"<tpl if=\"hasInnerWrapper\"></span></tpl>",
		"<tpl if=\"hasWrapper\"></span></tpl>"
		//jscs: enable
		/* jshint white:true */
		/*jshint quotmark:true */
	],

	/**
	 * @private
	 * @type {String[]}
	 * @inheritdoc Terrasoft.Component#tpl
	 */
	tpl: [
		/* jshint white:false */
		/*jshint quotmark:false */
		//jscs: disable
		"<div id=\"{id}-color-button\" class=\"{wrapClasses}\" style=\"{wrapStyles}\">",
			"{%this.generateColorButton(out, values)%}",
		"</div>"
		//jscs: enable
		/* jshint white:true */
		/*jshint quotmark:true */
	],

	/**
	 * Menu item class name.
	 * @type {String}
	 */
	menuItemClassName: null,

	/**
	 * Color value encoding.
	 * @type {String}
	 */
	colorValueEncoding: null,

	/**
	 * Config for menu item.
	 * @type {Object}
	 */
	menuItemConfig: null,

	/**
	 * @protected
	 * @override
	 * @inheritdoc Terrasoft.Component#init
	 */
	init: function() {
		this.callParent(arguments);
		this.initButton();
		var colorButtonEl = this.button.menu.getItemByIndex(0);
		colorButtonEl.on("colorselected", this.onColorSelected, this);
		if (this.menuItemClassName === Terrasoft.MenuItemType.COLOR_PICKER) {
			this.button.on("prepareMenu", function() {
				colorButtonEl.setButtonValue(this.value);
			}, this);
		}
	},

	/**
	 * @override
	 * @inheritdoc Terrasoft.Component#constructor
	 */
	constructor: function(config) {
		this.menuItemClassName = config.menuItemClassName || Terrasoft.MenuItemType.COLOR;
		this.colorValueEncoding = config.colorValueEncoding || Terrasoft.ColorEncoding.HEX;
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event change
			 * Called when color button value is changed.
			 */
			"change"
		);
	},

	/**
	 * @override
	 * @inheritdoc Terrasoft.Component#destroy
	 */
	onDestroy: function() {
		this.button.destroy();
		this.callParent(arguments);
	},

	/**
	 * Initialize color button.
	 * @private
	 */
	initButton: function() {
		var buttonId = this.id + this.buttonIdSuffix;
		var colorButtonViewerFullClass = (this.imageConfig) ? "" : this.colorButtonViewerFullClass;
		var viewerColor = this.defaultValue;
		this.button = Ext.create("Terrasoft.Button", {
			id: buttonId,
			tpl: this.buttonTpl,
			iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
			imageConfig: this.imageConfig,
			selectors: {
				viewerEl: "#" + buttonId + "-viewerEl"
			},
			classes: {
				colorButtonViewerClass: [this.colorButtonViewerClass, colorButtonViewerFullClass]
			},
			styles: {
				colorValue: {
					backgroundColor: viewerColor
				}
			},
			menu: {
				items: [this.getMenuItemConfig()]
			}
		});
		this.button.added(this);
	},

	/**
	 * @inheritdoc Terrasoft.Component#bind
	 * @override
	 */
	bind: function() {
		this.callParent(arguments);
		this.button.bind.call(this.button, ...arguments);
	},

	/**
	 * Returns menu item config.
	 * @protected
	 * @return {Object} Menu item config.
	 */
	getMenuItemConfig: function() {
		var result = {
			className: this.menuItemClassName
		};
		if (this.menuItemClassName === Terrasoft.MenuItemType.COLOR_PICKER) {
			Ext.apply(result, {
				colorEncoding: this.colorValueEncoding
			});
		} else {
			Ext.apply(result, {
				simpleMode: this.simpleMode
			});
		}
		Ext.apply(result, this.menuItemConfig);
		return result;
	},

	/**
	 * @protected
	 * @override
	 * @inheritdoc Terrasoft.Component#getTplData
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		this.selectors = {
			wrapEl: "#" + this.id + "-color-button"
		};
		tplData.generateColorButton = this.generateColorButton;
		return tplData;
	},

	/**
	 * Generate button and append it to buffer.
	 * @param {String[]} buffer String array of general control template.
	 * @param {Object} data Data object according template.
	 * @private
	 */
	generateColorButton: function(buffer, data) {
		var button = data.self.button;
		var html = button.generateHtml();
		buffer.push(html);
	},

	/**
	 * Remove button.
	 * @private
	 */
	remove: function() {
		this.button = null;
	},

	/**
	 * Color selected handler.
	 * @param {Terrasoft.ColorMenuItem} colorMenu Class object Terrasoft.ColorMenuItem, which generated
	 * choose color event.
	 * @param {String} color Changed color.
	 * @private
	 */
	onColorSelected: function(colorMenu, color) {
		this.setValue(color);
		this.fireEvent("change", color, this);
	},

	/**
	 * @inheritdoc Terrasoft.Component#setEnabled
	 * @override
	 */
	setEnabled: function(enabled) {
		this.callParent(arguments);
		this.button.setEnabled(enabled);
	},

	/**
	 * Set color value.
	 * @param {String} color Color value.
	 */
	setValue: function(color) {
		if (!color) {
			color = this.defaultValue;
		}
		if (color === this.value) {
			return;
		}
		this.value = color;
		if (this.button) {
			this.button.styles.colorValue.backgroundColor = color;
			if (this.button.viewerEl) {
				this.button.viewerEl.setStyle("background-color", color);
			}
		}
	},

	/**
	 * Returns binding config. Implements the mixin interface {@link Terrasoft.Bindable}.
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var buttonBindConfig = {
			value: {
				changeMethod: "setValue",
				changeEvent: "change"
			}
		};
		Ext.apply(buttonBindConfig, bindConfig);
		return buttonBindConfig;
	}
});
