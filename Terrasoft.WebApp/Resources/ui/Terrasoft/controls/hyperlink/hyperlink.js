Ext.ns("Terrasoft.controls.HyperlinkEnums");

/**
 * @enum {string} Terrasoft.controls.HyperlinkEnums.target
 * Link target values enum.
 */
Terrasoft.controls.HyperlinkEnums.target = {

	/** Loads the page into a new browser window; */
	BLANK: "_blank",

	/** Loads the page into the current window */
	SELF: "_self",

	/** Loads the page into the parent frame */
	PARENT: "_parent",

	/**  Cancels all frames and loads the page in full browser window */
	TOP: "_top"
};

/**
 * Hyperlink control class.
 */
Ext.define("Terrasoft.controls.Hyperlink", {
	extend: "Terrasoft.Label",
	alternateClassName: "Terrasoft.Hyperlink",

	/**
  * Control Template.
  * @private
  * @override
  * @type {Array}
  */
	tpl: [
		/*jshint white:false */
		/*jshint quotmark:true */
		//jscs:disable
		'<a id={id} name="{name}" href="{href}" ',
		'target="{target}" class="{hyperlinkClass}" style="{hyperlinkStyle}" title="{hint}" type="{type}"',
		'<tpl if="direction"> dir="{direction}"</tpl>>{caption}',
		'</a>'
		//jscs:enable
		/*jshint quotmark:false */
		/*jshint white:true */
	],

	/**
  * The base css class for the control.
  * @protected
  * @type {String}
  */
	hyperlinkClass: "label-link",

	/**
  * The name of the anchor.
  * @type {String}
  */
	name: "",

	/**
  * Element reference.
  * @type {String}
  */
	href: "",

	/**
  * The method of passing by a link.
  * @type {String}
  */
	target: "",

	/**
  * MIME type of document.
  * @type {String}
  */
	type: "",

	/**
	 * @inheritdoc Terrasoft.Label#init
	 * @override
	 * @protected
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event
			 * Event hover over a link.
			 */
			"linkMouseOver"
		);
		this.updateDirection(this.name);
	},

	/**
	 * @inheritdoc Terrasoft.Label#initDomEvents
	 * @override
	 * @protected
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		var el = this.getWrapEl();
		el.on("mouseover", this.onLinkMouseOver, this);
	},

	/**
	 * Mouse over event handler.
	 * @protected
	 * @param {Ext.event.Event} event Event.
	 * @param {HTMLElement} target Target element.
	 */
	onLinkMouseOver: function(event, target) {
		this.fireEvent("linkmouseover", {targetId: this.getTargetId(target)});
	},

	/**
	 * Returns target id.
	 * @private
	 * @param {HTMLElement} target Target element.
	 * @return {String} Target id.
	 */
	getTargetId: function(target) {
		return target.id || Ext.get(target).id;
	},

	/**
  * Initializes the data for the template and updates the selectors.
  * @protected
  * @override
  * @return {Object}
  */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		var encodeHtml = Terrasoft.encodeHtml;
		var hyperlinkTplData = {
			name: encodeHtml(this.name),
			hint: encodeHtml(this.hint),
			href: this.href,
			target: this.target || "_blank",
			type: this.type,
			hyperlinkClass: this.getHyperlinkClass(),
			hyperlinkStyle: this.getHyperlinkStyle()
		};
		Ext.apply(tplData, hyperlinkTplData);
		return tplData;
	},

	/**
  * Returns a string from the css classes based on the configuration of the control.
  * @protected
  * @return {String} Returns a string that contains a list of css classes.
  */
	getHyperlinkClass: function() {
		var hyperlinkClass = [];
		var lableClass = this.getLabelClass();
		hyperlinkClass.push(this.hyperlinkClass);
		return lableClass + " " + hyperlinkClass.join(" ");
	},

	/**
	 * Overrides base event handler.
	 * @protected
	 * @override
	 */
	onClick: function(e) {
		var canExecute = this.canExecute({
			method: this.onClick,
			args: arguments
		});
		if (canExecute === false) {
			return;
		}
		var browserEvent = e.browserEvent;
		if (this.fireEvent("click", this, e) === false) {
			Ext.EventManager.preventDefault(browserEvent);
		}
	},

	/**
  * Returns a string of css styles based on the configuration of the control.
  * @protected
  * @return {String} Returns a string that contains a list of css classes.
  */
	getHyperlinkStyle: function() {
		var hyperlinkStyle = {};
		var font = this.font;
		var width = this.width;
		if (font) {
			hyperlinkStyle.font = font;
		}
		if (width) {
			hyperlinkStyle.width = width;
		}
		return hyperlinkStyle;
	},

	/**
	 * @inheritdoc Terrasoft.controls.component#clearDomListeners
	 * @override
	 */
	clearDomListeners: function() {
		this.callParent(arguments);
		var el = this.getWrapEl();
		if (el) {
			el.un("click", this.onClick, this);
			el.un("mouseover", this.onLinkMouseOver, this);
		}
	},

	/**
  * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
  * @override
  */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var hyperlinkBindConfig = {
			name: {
				changeMethod: "setName"
			},
			href: {
				changeMethod: "setHref"
			},
			target: {
				changeMethod: "setTarget"
			},
			type: {
				changeMethod: "setType"
			}
		};
		Ext.apply(hyperlinkBindConfig, bindConfig);
		return hyperlinkBindConfig;
	},

	/**
  * Sets the name of the anchor.
  * @param {String} name The name of the anchor.
  */
	setName: function(name) {
		if (this.name === name) {
			return;
		}
		this.name = name;
		this.updateDirection(this.name);
		this.safeRerender();
	},

	/**
	 * Sets hyperlink value.
	 * @param {String|Object} href Hyperlink value.
	 */
	setHref: function(href) {
		if (this.href === href) {
			return;
		}
		this.href = Ext.isObject(href) ? href.url : href;
		this.safeRerender();
	},

	/**
  * Sets the method of passing by a link.
  * @param {String} target Transition method.
  */
	setTarget: function(target) {
		if (this.target === target) {
			return;
		}
		this.target = target;
		this.safeRerender();
	},

	/**
  * Sets the MIME type of the document.
  * @param {String} type The MIME type of the document.
  */
	setType: function(type) {
		if (this.type === type || Ext.isEmpty(this.href)) {
			return;
		}
		this.type = type;
		this.safeRerender();
	},

	/**
  * Sets attributes from the configuration.
  * @param {Object} config Configures the attributes.
  */
	setAttributes: function(config) {
		if (!config) {
			return;
		}
		if (config.name) {
			this.name = config.name;
		}
		if (config.href) {
			this.href = config.href;
		}
		if (config.target) {
			this.target = config.target;
		}
		if (config.type) {
			this.type = config.type;
		}
		this.safeRerender();
	}
});
