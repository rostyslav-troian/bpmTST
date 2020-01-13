/**
 * IframeControl class for user layout creation.
 */
Ext.define("Terrasoft.controls.IframeControl", {
	extend: "Terrasoft.Component",
	alternateClassName: "Terrasoft.IframeControl",

	mixins: {
		sanitizeHtml: "Terrasoft.SanitizeHtml"
	},

	//region Properties: Private

	/**
	 * Shared template of control.
	 * @private
	 * @override
	 * @type {String[]}
	 */
	tpl: [
		/*jshint quotmark:true */
		'<iframe id="{id}" src="{src}" class="{wrapClass}"></iframe>'
		/*jshint quotmark:false */
	],

	//endregion

	//region Properties: Public

	/**
	 * User's html layout.
	 * @type {String}
	 */
	iframeContent: null,

	/**
	 * Iframe id.
	 * @type {String}
	 */
	id: null,

	/**
	 * Iframe source.
	 * @type {String}
	 */
	src: "",

	/**
	 * Iframe css classes.
	 * @type {Array}
	 */
	wrapClass: ["t-iframe"],

	/**
	 * Set iframe height equal content height.
	 * @type {Boolean}
	 */
	fitHeightToContent: false,

	/**
	 * Iframe borders width (in pixels).
	 * @type {Integer}
	 */
	bordersWidth: 2,

	//endregion

	//region Methods: Private

	/**
	 * Set new user html layout.
	 * @private
	 * @param {String} value Iframe content value.
	 * @param {Boolean} force Force set iframe value flag.
	 */
	setIframeContent: function(value, force) {
		this.src = null;
		value = value || "";
		if (this.iframeContent !== value || force) {
			this.iframeContent = this.getSanitizedValue(value);
			this.safeRerender();
		}
	},

	/**
	 * Setup content by iframe.
	 * @private
	 */
	_loadIframeContent: function() {
		if (!this.src && this.iframeContent) {
			this.writeHTMLToIframe();
		}
	},

	/**
	 * Sets iframe height same as content height.
	 * @private
	 */
	_adjustIframeHeight: function() {
		if (!this.fitHeightToContent) {
			return;
		}
		var iframe = this.getWrapEl();
		var iframeBody = iframe.dom.contentWindow.document.body;
		var iframeHeight = Ext.get(iframeBody).getHeight();
		iframe.setHeight(iframeHeight + this.bordersWidth);
	},

	/**
	 * Subscribes to links in iframe click event.
	 * @private
	 * @param {Object} document Iframe document object.
	 */
	_subscribeLinksClick: function(document) {
		var links = document.querySelectorAll("a");
		Terrasoft.each(links, function(link) {
			link.addEventListener('click', this._onUrlClick.bind(this));
		}, this);
	},

	/**
	 * Iframe content link click.
	 * @private
	 * @param {Object} event Link click event.
	 */
	_onUrlClick: function(event) {
		event.preventDefault();
		event.stopPropagation();
		const target = event.target;
		const href = target && target.href;
		this.openUrl(href, "_blank");
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.Component#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		var selectors = this.selectors = this.selectors || {};
		selectors.wrapEl = selectors.wrapEl || "#" + this.id;
	},

	/**
	 * Writes html to iframe.
	 * @protected
	 */
	writeHTMLToIframe: function() {
		var iframe = this.getWrapEl();
		iframe.on("load", this.onIframeLoad, this, { single: true });
		var iframeDocument = iframe.dom.contentWindow.document;
		iframeDocument.open();
		iframeDocument.write(this.iframeContent);
		iframeDocument.close();
		this._subscribeLinksClick(iframeDocument);
	},

	/**
	 * Sets iframe src property.
	 * @param {String} value.
	 */
	setIframeSrc: function(value) {
		this.iframeContent = null;
		value = value || "";
		if (this.src !== value) {
			this.src = value;
			this.safeRerender();
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this._loadIframeContent();
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this._loadIframeContent();
	},

	/**
	 * @inheritdoc Terrasoft.Component#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var sanitizeHTMLBindConfig = this.getSanitizeHtmlBindConfig();
		return Ext.apply(bindConfig, {
			iframeContent: {
				changeMethod: "setIframeContent"
			},
			src: {
				changeMethod: "setIframeSrc"
			}
		}, sanitizeHTMLBindConfig);
	},

	/**
	 * @inheritdoc Terrasoft.BaseContentElement#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		return Ext.apply(tplData, {
			iframeContent: this.iframeContent,
			src: this.src,
			wrapClass: this.wrapClass
		});
	},

	/**
	 * Opens passed url.
	 * @protected
	 * @param {String} url Web resource url.
	 * @param {String} target Open target option.
	 */
	openUrl: function(url, target) {
		if (Ext.isEmpty(url)) {
			return;
		}
		window.open(url, target);
	},

	/**
	 * Handler for the iframe 'load' event.
	 * @protected
	 */
	onIframeLoad: function() {
		this._adjustIframeHeight();
	},

	/**
	 * @inheritdoc Terrasoft.SanitizeHtml#setSanitizeHtml
	 * @override
	 */
	setSanitizeHtml: function(value) {
		this.mixins.sanitizeHtml.setSanitizeHtml.call(this, value);
		this.setIframeContent(this.iframeContent, true);
	}

	//endregion
});
