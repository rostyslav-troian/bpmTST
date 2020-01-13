Terrasoft.configuration.Structures["MessageHistoryMultilineLabel"] = {innerHierarchyStack: ["MessageHistoryMultilineLabel"]};
define("MessageHistoryMultilineLabel", ["MessageHistoryMultilineLabelResources", "MultilineLabel",
		"css!MessageHistoryMultilineLabel"],
	function(resources) {

		Ext.define("Terrasoft.MessageHistoryMultilineLabel", {
			extend: "Terrasoft.MultilineLabel",
			alternateClassName: "Terrasoft.controls.MessageHistoryMultilineLabel",

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
				"<div class=\"read-buttons-container\">",
					"<div id=\"{id}_readMore\" class=\"{readMoreClass}\">",
						"<div class=\"collapse-history-message-image-container\">",
							"<img class=\"collapse-history-message\" src={readMoreButtonImage} />",
						"</div>",
						"<label class=\"read-button-label\">{readMoreCaption}</label>",
					"</div>",
					"<div id=\"{id}_readLess\" class=\"{readLessClass}\">",
						"<div class=\"collapse-history-message-image-container\">",
							"<img class=\"collapse-history-message\" src={readLessButtonImage} />",
						"</div>",
						"<label class=\"read-button-label\">{readLessCaption}</label>",
					"</div>",
				"</div>",
				"</div>"
			],

			/**
			 * @inheritdoc Terrasoft.MultilineLabel#frameMinHeight
			 * @override
			 */
			frameMinHeight: 400,

			/**
			 * Stores height for the element.
			 */
			currentElementHeight: 400,

			/**
			 * Stores a value on which the element height will be increased.
			 */
			elementNextHeightStep: 400,

			/**
			 * "Read less" button visibility.
			 */
			readLessVisible: false,

			/**
			 * "Read more" button visibility.
			 */
			readMoreVisible: false,

			/**
			 * "Expanded mode" in which full content shows always.
			*/
			isExpandedMode: false,

			/**
			 * Attribute indicates that iFrame resizing is in progress.
			 */
			isResizing: false,

			/**
			 * @inheritdoc Terrasoft.Component#getTplData
			 * @override
			 */
			getTplData: function() {
				var labelTplData = this.callParent(arguments);
				var readLessButtonCaption = resources.localizableStrings.readLessButtonCaption;
				var readMoreButtonCaption = resources.localizableStrings.readMoreButtonCaption;
				var readLessButtonImage = resources.localizableImages.readLessButtonImage;
				var readMoreButtonImage = resources.localizableImages.readMoreButtonImage;
				Ext.apply(labelTplData, {
					readLessCaption: Terrasoft.encodeHtml(readLessButtonCaption),
					readMoreCaption: Terrasoft.encodeHtml(readMoreButtonCaption),
					readLessClass: ["read-less"],
					readLessButtonImage: Terrasoft.ImageUrlBuilder.getUrl(readLessButtonImage),
					readMoreButtonImage: Terrasoft.ImageUrlBuilder.getUrl(readMoreButtonImage)
				});
				return labelTplData;
			},

			/**
			 * @inheritdoc Terrasoft.MultilineLabel#resizeIframe
			 * @override
			 */
			resizeIframe: function() {
				var body = this.getIframeBody();
				if (!body) {
					return;
				}
				this.setReadMoreButtonVisible();
				var calculatedHeight = this.getCalculatedHeight();
				var height = calculatedHeight + "px";
				if (calculatedHeight !== body.dom.scrollHeight && this.isExpandedMode) {
					this.isExpandedMode = false;
					this.iframeEl.setStyle("height", height);
					return;
				}
				this.iframeEl.setStyle("height", height);
				if (calculatedHeight === body.dom.scrollHeight && !this.isExpandedMode) {
					this.isExpandedMode = true;
				}
			},

			/**
			 * Fit iframe size based on it's content.
			 * @protected
			 */
			fitIframeHeight: function () {
				if (!this.iframeEl || this.iframeEl.getHeight() === this.frameMinHeight) {
					return;
				}
				if (this.iframeEl.getHeight() > 150) {
					this.iframeEl.setStyle("height", "100%");
				}
				var expandedHeight = this.iframeEl.dom.contentDocument.body.scrollHeight;
				if (parseInt(this.iframeEl.getStyle("height"), 10) !== expandedHeight) {
					this.iframeEl.setStyle("height", expandedHeight + "px");
				}
			},

			/**
			 * Window resize event handler.
			 */
			onResize: function() {
				if (this.isResizing || !this.isExpandedMode) {
					return;
				}
				this.isResizing = true;
				this.fitIframeHeight();
				Terrasoft.delay(function() {
					this.isResizing = false;
				}, this, 500);
			},

			/**
			 * Subscribe iframe on "resize" event.
			 */
			subscribeResizeListener: function() {
				if (this.iframeEl) {
					Ext.EventManager.addListener(this.iframeEl.dom.contentWindow, "resize", this.onResize, this);
				}
			},

			/**
			 * @inheritdoc Terrasoft.Component#getSelectors
			 * @override
			 */
			getSelectors: function() {
				var selectors = this.callParent(arguments);
				selectors.readLessButtonEl = "#" + this.id + "_readLess";
				return selectors;
			},

			/**
			 * @inheritdoc Terrasoft.Component#initDomEvents
			 * @override
			 */
			initDomEvents: function() {
				this.callParent(arguments);
				this.readLessButtonEl.on("click", this.onReadLessButtonClick, this);
				this.subscribeResizeListener();
			},

			/**
			 * @inheritdoc Terrasoft.Component#clearDomListeners
			 * @override
			 */
			clearDomListeners: function() {
				this.callParent(arguments);
				if (this.rendered) {
					this.readLessButtonEl.un("click", this.onReadLessButtonClick, this);
				}
			},

			/**
			 * Shows "Read more" button.
			 * @protected
			 * @virtual
			 */
			showReadMoreButton: function () {
				var labelElHeight = this.getLabelElementHeight();
				var wrapEl = this.getWrapEl();
				if (labelElHeight > this.currentElementHeight) {
					wrapEl.addCls("read-more-button-visible");
					this.readMoreVisible = true;
				}
			},

			/**
			 * Hides "Read more" button.
			 * @protected
			 * @virtual
			 */
			hideReadMoreButton: function() {
				var labelElHeight = this.getLabelElementHeight();
				var wrapEl = this.getWrapEl();
				if (labelElHeight <= this.currentElementHeight) {
					wrapEl.removeCls("read-more-button-visible");
					this.readMoreVisible = false;
				}
			},

			/**
			 * Shows "Read less" button.
			 * @protected
			 * @virtual
			 */
			showReadLessButton: function () {
				var wrapEl = this.getWrapEl();
				if (this.currentElementHeight > this.frameMinHeight) {
					wrapEl.addCls("read-less-button-visible");
					this.readLessVisible = true;
				}
			},

			/**
			 * Hides "Read less" button.
			 * @protected
			 * @virtual
			 */
			hideReadLessButton: function () {
				var wrapEl = this.getWrapEl();
				if (this.currentElementHeight <= this.frameMinHeight) {
					wrapEl.removeCls("read-less-button-visible");
					this.readLessVisible = false;
				}
			},

			/**
			 * @inheritdoc Terrasoft.MultilineLabel#setReadMoreButtonVisible
			 * @override
			 */
			setReadMoreButtonVisible: function () {
				this.showReadMoreButton();
				this.showReadLessButton();
				this._applyReadMoreLessContainerVisibility();
				var body = this.getIframeBody();
				if (!body) {
					return;
				}
				var calculatedHeight = this.getCalculatedHeight();
				if (calculatedHeight === body.dom.scrollHeight && !this.isExpandedMode) {
					this.isExpandedMode = true;
				}
			},

			/**
			 * Gets height of the element.
			 * @returns {Number} Element height.
			 */
			getLabelElementHeight: function () {
				return this.isHtmlBody ? this.getContentHeight() : this.labelEl.getHeight();
			},

			/**
			 * Gets height of the element or minimum permissible height.
			 * @returns {number}
			 */
			getLabelElementDefaultHeight: function () {
				return Math.min(this.getLabelElementHeight(), this.frameMinHeight);
			},

			/**
			 * Increments content height for the element.
			 * @protected
			 * @virtual
			 */
			incrementContentElementHeight: function() {
				this.setContentVisibleClass();
				if (this.isHtmlBody) {
					this.resizeIframe();
				} else {
					this.currentElementHeight = this.getCalculatedHeight();
					this.setContentElementHeight();
				}
			},

			/**
			 * Decrements content height for the element.
			 * @protected
			 * @virtual
			 */
			decrementContentElementHeight: function () {
				this.setContentVisibleClass();
				if (this.isHtmlBody) {
					this.resizeIframe();
				} else {
					this.currentElementHeight = (this.currentElementHeight < this.frameMinHeight)
						? this.frameMinHeight
						: this.currentElementHeight;
					this.setContentElementHeight();
				}
			},

			/**
			 * @inheritdoc Terrasoft.MultilineLabel#prepareOnRender
			 * @override
			 */
			prepareOnRender: function () {
				this.callParent(arguments);
				this.setContentVisibleClass();
				if (!this.isHtmlBody) {
					this.currentElementHeight = this.getLabelElementDefaultHeight();
					this.setContentElementHeight();
				} else {
					var bodyEl = this.getIframeBody();
					bodyEl.setStyle("width", "100%");
					bodyEl.setStyle("word-wrap", "break-word");
					Terrasoft.delay(this.fitIframeHeight, this, 500);
				}
			},

			/**
			 * Sets height for the element.
			 * @protected
			 * @virtual
			 */
			setContentElementHeight: function () {
				this.contentEl.setStyle("height", this.currentElementHeight >= this.getLabelElementHeight()
					? "100%" : this.currentElementHeight + "px");
			},

			/**
			 * Calculates height for the element.
			 * @returns {Number} Calculated element height. When new calculated height bigger than element height,
			 * returns calculated remains height.
			 */
			getCalculatedHeight: function () {
				var remainsHeight = this.getLabelElementHeight() - this.currentElementHeight + this.frameMinHeight;
				if (remainsHeight <= this.elementNextHeightStep) {
					return this.currentElementHeight - this.elementNextHeightStep + remainsHeight;
				}
				return this.currentElementHeight;
			},

			/**
			 * @inheritdoc Terrasoft.MultilineLabel#onReadMoreButtonClick
			 * @override
			 */
			onReadMoreButtonClick: function() {
				this.currentElementHeight += this.elementNextHeightStep;
				this.incrementContentElementHeight();
				this.hideReadMoreButton();
				this.showReadLessButton();
			},

			/**
			 * "Read less" button handler. Roll ups text.
			 * @protected
			 * @virtual
			 */
			onReadLessButtonClick: function() {
				this.currentElementHeight -= this.elementNextHeightStep;
				this.decrementContentElementHeight();
				this.hideReadLessButton();
				this.showReadMoreButton();
			},

			_applyReadMoreLessContainerVisibility: function() {
				var wrapEl = this.getWrapEl();
				if (!this.readMoreVisible && !this.readLessVisible) {
					wrapEl.addCls("read-buttons-container-hidden");
				} else {
					wrapEl.removeCls("read-buttons-container-hidden");
				}
			}
		});

		return Terrasoft.MessageHistoryMultilineLabel;
	}
);


