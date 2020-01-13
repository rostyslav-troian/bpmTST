Terrasoft.configuration.Structures["MultilineLabel"] = {innerHierarchyStack: ["MultilineLabel"]};
define("MultilineLabel", ["ext-base", "terrasoft", "MultilineLabelResources", "css!MultilineLabel"],
		function(Ext, Terrasoft, resources) {
	/**
	 * Multiline label class. By default, displays only 8 text lines and also displays the "Read more" button.
	 * Number of output lines configurable with lineHeight and maxHeight styles.
	 */
	return Ext.define("Terrasoft.controls.MultilineLabel", {
		extend: "Terrasoft.Label",
		alternateClassName: "Terrasoft.MultilineLabel",

		/**
		 * Content visible property css class.
		 * @type {String}
		 */
		contentVisibleClass: "content-visble",

		/**
		 * @inheritdoc Terrasoft.Component#tpl
		 * @override
		 */
		tpl: [
			"<div id=\"{id}\" class=\"{multilineLabelClass}\">",
			"<div id=\"{id}_content\" class=\"{labelContentContainer}\">",
			"<div id=\"{id}_label\" class=\"{labelClass}\">",
			"<tpl if=\"isHtmlBody\">",
			"<iframe id=\"{id}_iframe\">",
			"</tpl>",
			"{%this.renderContent(out, values)%}",
			"<tpl if=\"isHtmlBody\">",
			"</iframe>",
			"</tpl>",
			"</div>",
			"</div>",
			"<span id=\"{id}_readMore\" class=\"{readMoreClass}\">{readMoreCaption}</span>",
			"</div>"
		],

		/**
		 * A sign that the text of the control is deployed.
		 * @type {Boolean}
		 * @private
		 */
		contentVisible: false,

		/**
		 * Is html body.
		 * @type {Boolean}
		 */
		isHtmlBody: false,

		/**
		 * A sign that the web and email addresses in the text of the control will be displayed as links.
		 * @type {Boolean}
		 */
		showLinks: false,

		/**
		 * The maximum size of the window in which the message is displayed.
		 * @type {Number}
		 */
		frameMaxHeight: 650,

		/**
		 * The minimum size of the window in which the message is displayed.
		 * @type {Number}
		 */
		frameMinHeight: 250,

		/**
		 * Frame body style.
		 * @type {Object}
		 */
		frameBodyStyle: {
			"overflow": "auto"
		},

		/**
		 * Show read more button.
		 * @type {Boolean}
		 */
		showReadMoreButton: true,

		/**
		 * Returns iframe body.
		 * @protected
		 * @return {Object} iframe body.
		 */
		getIframeBody: function() {
			var iframe = this.iframeEl;
			if (iframe && iframe.dom && iframe.dom.contentDocument && iframe.dom.contentDocument.body) {
				return Ext.get(iframe.dom.contentDocument.body);
			}
		},

		/**
		 * Resize iframe body element.
		 * @protected
		 */
		resizeIframe: function() {
			var body = this.getIframeBody();
			if (!body) {
				return;
			}
			var height = Math.min(body.dom.scrollHeight, this.frameMaxHeight) + "px";
			this.iframeEl.setStyle("height", height);
		},

		/**
		 * Prepares iframe content on init.
		 * @protected
		 */
		prepareIframe: function() {
			var body = this.getIframeBody();
			if (!body) {
				return;
			}
			var caption = this.caption;
			if (this.showLinks && caption) {
				caption = this.addLinks(caption);
			}
			body.setHTML(caption);
			body.setStyle(this.frameBodyStyle);
			this.setReadMoreButtonVisible();
			if (this.contentVisible) {
				this.resizeIframe();
			} else {
				var height = Math.min(body.dom.scrollHeight, this.frameMinHeight) + "px";
				this.iframeEl.setStyle("height", height);
			}
		},

		/**
		 * Returns iframe body height.
		 * @protected
		 * @return {Number} iframe body height.
		 */
		getContentHeight: function() {
			var body = this.getIframeBody();
			return body && body.dom ? body.dom.scrollHeight : 0;
		},

		/**
		 * @inheritdoc Terrasoft.Component#getSelectors
		 * @override
		 */
		getSelectors: function() {
			return {
				wrapEl: "#" + this.id,
				contentEl: "#" + this.id + "_content",
				labelEl: "#" + this.id + "_label",
				readMoreButtonEl: "#" + this.id + "_readMore",
				iframeEl: "#" + this.id + "_iframe"
			};
		},

		/**
		 * @inheritdoc Terrasoft.Component#init
		 * @override
		 */
		init: function() {
			this.callParent(arguments);
			this.selectors = this.getSelectors();
		},

		/**
		 * @inheritdoc Terrasoft.Component#getTplData
		 * @override
		 */
		getTplData: function() {
			var labelTplData = this.callParent(arguments);
			var readMoreButtonCaption = resources.localizableStrings.readMoreButtonCpation;
			Ext.apply(labelTplData, {
				readMoreCaption: Terrasoft.encodeHtml(readMoreButtonCaption),
				multilineLabelClass: ["multiline-label-wrap"],
				lineElapsisClass: ["line-elapsis"],
				readMoreClass: ["read-more"],
				labelClass: ["multiline-label"],
				labelContentContainer: ["label-content-container"],
				isHtmlBody: this.isHtmlBody
			});
			if (this.contentVisible) {
				labelTplData.multilineLabelClass.push(this.contentVisibleClass);
				labelTplData.labelContentContainer.push(this.contentVisibleClass);
			}
			labelTplData.renderContent = this.renderContent;
			return labelTplData;
		},

		/**
		 * Method implements receiving HTML-markup for multiline label control and storing it in a buffer.
		 * @param {Array} buffer Buffer for HTML elements.
		 * @param {Object} renderData Template parameters.
		 * @protected
		 * @virtual
		 */
		renderContent: function(buffer, renderData) {
			var self = renderData.self;
			if (!self.isHtmlBody) {
				var caption = self.validateContent(self.caption);
				if (self.showLinks && caption) {
					caption = self.addLinks(caption);
				}
				buffer.push(caption);
			}
		},

		/**
		 * Validates content.
		 * @protected
		 * @param {String} content Source string.
		 * @return {String} Modified string.
		 */
		validateContent: function(content) {
			if (content && Ext.isString(content)) {
				var result = content.replace(/<base.*>/gi, "");
				result = result.replace(/<style.*?>.*?<\/style\s*?>/gi, "");
				return result;
			}
			return content;
		},

		/**
		 * Prepare content on render.
		 * @protected
		 */
		prepareOnRender: function() {
			if (this.isHtmlBody) {
				if (Ext.isGecko) {
					var iframeDoc = this.iframeEl.dom.contentDocument;
					iframeDoc.open();
					iframeDoc.close();
				}
				this.prepareIframe();
			} else {
				this.setReadMoreButtonVisible();
			}
		},

		/**
		 * Sets ReadMore button visible.
		 * @protected
		 */
		setReadMoreButtonVisible: function() {
			if (this.contentVisible || !this.showReadMoreButton) {
				return;
			}
			var contentElHeight = this.contentEl.getHeight();
			var labelElHeight = this.isHtmlBody ? this.getContentHeight() : this.labelEl.getHeight();
			if (contentElHeight < labelElHeight) {
				var wrapEl = this.getWrapEl();
				wrapEl.addCls("read-more-button-visible");
			}
		},

		/**
		 * @inheritdoc Terrasoft.Component#onAfterRender
		 * @override
		 */
		onAfterRender: function() {
			this.callParent(arguments);
			this.prepareOnRender();
		},

		/**
		 * @inheritdoc Terrasoft.Component#onAfterReRender
		 * @override
		 */
		onAfterReRender: function() {
			this.callParent(arguments);
			this.prepareOnRender();
		},

		/**
		 * @inheritdoc Terrasoft.Component#initDomEvents
		 * @override
		 */
		initDomEvents: function() {
			this.callParent(arguments);
			this.readMoreButtonEl.on("click", this.onReadMoreButtonClick, this);
		},

		/**
		 * @inheritdoc Terrasoft.Component#clearDomListeners
		 * @override
		 */
		clearDomListeners: function() {
			this.callParent(arguments);
			if (this.rendered) {
				this.readMoreButtonEl.un("click", this.onReadMoreButtonClick, this);
			}
		},

		/**
		 * "Read more" button handler. Expands text to be visible completely.
		 * @private
		 */
		onReadMoreButtonClick: function() {
			this.setContentVisible(true);
			var wrapEl = this.getWrapEl();
			wrapEl.removeCls("read-more-button-visible");
			if (this.isHtmlBody) {
				this.resizeIframe();
			}
		},

		/**
		 * Adds links in string, that contains html-markup.
		 * @private
		 * @param {String} text Source string.
		 * @return {String} Modified string.
		 */
		addLinks: function(text) {
			var htmlDocument = this.getHtmlDocumentFromString(text);
			this.processHtmlDocument(htmlDocument, this.processNode, this);
			return this.getStringFromHtmlDocument(htmlDocument);
		},

		/**
		 * Processes html-document.
		 * @private
		 * @param {Node} node Dom-element.
		 * @param {Function} task Function for processing elements without child nodes.
		 * @param {Object} scope Execution context.
		 */
		processHtmlDocument: function(node, task, scope) {
			if(task.call(scope, node)){
				return;
			}
			var childNodes = node.childNodes;
			for (var i = 0; i < childNodes.length; i++) {
				this.processHtmlDocument(childNodes[i], task, scope);
			}
		},

		/**
		 * Processes dom-element. If it is a text, replace text to links.
		 * @private
		 * @param {Node} node Dom-element.
		 * @return {boolean} true if need process nested html elements, else false.
		 */
		processNode: function(node) {
			if(this._getIsNodeLink(node)){
				this._addTargetByLink(node);
				return true;
			}
			if (node.nodeType === document.TEXT_NODE) {
				var data = CKEDITOR.tools.htmlEncode(node.data);
				if (data && data.trim()) {
					var tempNode = document.createElement("div");
					tempNode.innerHTML = this.getStringWithLinks(data);
					while (tempNode.firstChild) {
						node.parentNode.insertBefore(tempNode.firstChild, node);
					}
					node.parentNode.removeChild(node);
				}
			}
			return false;
		},

		/**
		 * Get is html element link.
		 * @param htmlElement
		 * @return {boolean} true if the link html element, else false.
		 * @private
		 */
		_getIsNodeLink: function(htmlElement) {
			return htmlElement.tagName === "A";
		},

		/**
		 * If an item is a link then add a target.
		 * @private
		 * @param {Object} htmlElement html-element.
		 */
		_addTargetByLink: function(htmlElement) {
			if (Ext.isEmpty(htmlElement.target)) {
				htmlElement.target = "_blank";
			}
		},

		/**
		 * Returns a html-document received from a string representation.
		 * @private
		 * @param {String} htmlString Html string.
		 * @return {HTMLDocument} Html-document.
		 */
		getHtmlDocumentFromString: function(htmlString) {
			var domParser = new DOMParser();
			return domParser.parseFromString(htmlString, "text/html");
		},

		/**
		 * Returns a string representation of html-document.
		 * @private
		 * @param {HTMLDocument} htmlDocument Html-document.
		 * @return {String} String.
		 */
		getStringFromHtmlDocument: function(htmlDocument) {
			return htmlDocument.body.innerHTML;
		},

		/**
		 * Replaces all web and e-mail occurrences to links.
		 * @private
		 * @param {String} text Source string.
		 * @return {String} Modified string.
		 */
		getStringWithLinks: function(text) {
			var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/igm;
			if (urlPattern.test(text)) {
				text = text.replace(urlPattern, "<a target=\"_blank\" href=\"$&\">$&</a>");
			} else if (text.indexOf("@") > -1) {
				var emailAddressPattern = /[\w\.]+@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6})+/gim;
				text = text.replace(emailAddressPattern, "<a href=\"mailto:$&\">$&</a>");
			} else {
				var pseudoUrlPattern = /(^|[^\/\S])(www\.[\S]+(\b|$))/gim;
				text = text.replace(pseudoUrlPattern, "$1<a target=\"_blank\" href=\"http://$2\">$2</a>");
			}
			return text;
		},

		/**
		 * @inheritdoc Terrasoft.Label#setCaption
		 * @override
		 */
		setCaption: function(caption) {
			if (this.caption === caption) {
				return;
			}
			this.caption = this._sanitizeValue(caption);
			var wrapEl = this.getWrapEl();
			if (!wrapEl) {
				return;
			}
			this.safeRerender();
		},

		/**
		 * Sanitizes passed html value.
		 * @private
		 * @param {String} value Raw html value.
		 * @return {String} Sanitized html value.
		 */
		_sanitizeValue: function(value) {
			const needSanitizeHtml = Terrasoft.Features.getIsDisabled("DoNotSanitizeHtmlInMultilineLabel");
			return needSanitizeHtml ? Terrasoft.sanitizeHTML(value) : value;
		},

		/**
		 * Sets content visible property.
		 * @param {Boolean} contentVisible Content visible property new value.
		 */
		setContentVisible: function(contentVisible) {
			if (this.contentVisible === contentVisible) {
				return;
			}
			this.contentVisible = contentVisible;
			if (!this.rendered) {
				return;
			}
			if (contentVisible) {
				this.setContentVisibleClass();
				if (this.isHtmlBody && !this.showReadMoreButton) {
					this.resizeIframe();
				}
			} else {
				this.removeContentVisibleClass();
				this.setReadMoreButtonVisible();
			}
			this.fireEvent("contentVisiblechanged", contentVisible);
		},

		/**
		 * Adds ContentVisible class to the element.
		 * @protected
		 * @virtual
		 */
		setContentVisibleClass: function() {
			this.wrapEl.addCls(this.contentVisibleClass);
			this.contentEl.addCls(this.contentVisibleClass);
		},

		/**
		 * Removes ContentVisible class to the element.
		 * @protected
		 * @virtual
		 */
		removeContentVisibleClass: function() {
			this.wrapEl.removeCls(this.contentVisibleClass);
			this.contentEl.removeCls(this.contentVisibleClass);
		},

		/**
		 * @inheritdoc Terrasoft.Component#getBindConfig
		 * @override
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var config = {
				contentVisible: {
					changeEvent: "contentVisiblechanged",
					changeMethod: "setContentVisible"
				}
			};
			Ext.apply(bindConfig, config);
			return bindConfig;
		}
	});
});


