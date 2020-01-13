Terrasoft.configuration.Structures["MessageHistorySelectionHandler"] = {innerHierarchyStack: ["MessageHistorySelectionHandler"]};
/**
 * @enum {string} Terrasoft.controls.opacityMode
 * Enumeration of opacity modes.
 */
Terrasoft.controls.opacityMode = {

	/** Not transparent.*/
	Opaque: "1",

	/** Translucent.*/
	Translucent: "0.5"
};

define("MessageHistorySelectionHandler", ["MessageHistorySelectionHandlerResources",
		"MessageHistoryMultilineLabel", "css!MessageHistorySelectionHandler"],
	function(resources) {
		/**
		 * Terrasoft.controls.MessageHistorySelectionHandler
		 * MessageHistorySelectionHandler class. Extend multiline label and provide opportunity for handling selected
		 * text in control.
		 */
		Ext.define("Terrasoft.MessageHistorySelectionHandler", {
			extend: "Terrasoft.MessageHistoryMultilineLabel",
			alternateClassName: "Terrasoft.controls.MessageHistorySelectionHandler",

			/*
			 * Text, highlighted by mouse left button click.
			 * @type {String}
			 */
			highlightedText: null,

			/**
			 * Delay for selectedTextChanged event handler.
			 * @type {Number}
			 */
			selectionChangeDelay: 200,

			/**
			 * Flag, indicated necessity of selected text button showing.
			 * @type {Boolean}
			 */
			showFloatButton: false,

			/*
			 * Content opacity.
			 * @type {String}
			 */
			opacity: Terrasoft.controls.opacityMode.Opaque,

			/**
			 * @inheritdoc Terrasoft.Component#initDomEvents
			 * @override
			 */
			initDomEvents: function() {
				this.callParent(arguments);
				if (this.isHtmlBody) {
					var selectionChangeHandler =
						Terrasoft.debounce(this._onSelectionChange, this.selectionChangeDelay).bind(this);
					if (Ext.isGecko) {
						Terrasoft.delay(this._geckoSelectionChangeSubscribe, this, this.selectionChangeDelay,
							[selectionChangeHandler]);
					} else {
						this.iframeEl.dom.contentDocument.onselectionchange = selectionChangeHandler;
					}
				} else {
					this.wrapEl.on("mousedown", this._onMouseDown, this);
				}
			},

			/**
			 * Sets subscriber for selectionchange event in iframe for mozilla firefox.
			 * @param {Function} handler Handler for selectionchange event.
			 * @private
			 */
			_geckoSelectionChangeSubscribe: function(handler) {
				this.iframeEl.dom.contentDocument.addEventListener("selectionchange", handler);
			},

			/**
			 * Handler for mouse down event.
			 * @private
			 */
			_onMouseDown: function() {
				this.wrapEl.on("mouseup", this._onMouseUp, this);
				this.wrapEl.on("mouseleave", this._onMouseLeave, this);
			},

			/**
			 * Handler for mouse leave event.
			 * @private
			 */
			_onMouseLeave: function() {
				this._clearMouseEvents();
				this._onSelectionChange();
			},

			/**
			 * Handler for mouse leave event.
			 * @private
			 */
			_onMouseUp: function() {
				this._clearMouseEvents();
				this._onSelectionChange();
			},

			/*
			 * Clear mouse events.
			 * @private
			 */
			_clearMouseEvents: function() {
				this.wrapEl.un("mouseup", this._onMouseUp, this);
				this.wrapEl.un("mouseleave", this._onMouseLeave, this);
			},

			/**
			* Provides items part of object for selected text handler button.
			* @return {Object} Items configuration.
			* @private
			*/
			_getHandlerButtonItems: function() {
				return [
					{
						className: "Terrasoft.Container",
						classes: {
							wrapClassName: ["selected-text-handler-container"]
						},
						items: [
							{
								className: "Terrasoft.Button",
								style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
								imageConfig: resources.localizableImages.SelectionHandlerButtonImage,
								"classes": {
									"imageClass": ["selected-text-handler-button-image"]
								},
								click: {
									bindTo: "_onSelectedTextHandlerButtonClick"
								}
							}
						]
					}
				];
			},

			/**
			 * Provides configuration object for selected text handler button.
			 * @param {Number} x Offset relative to the X axis.
			 * @param {Number} y Offset relative to the Y axis.
			 * @param {Object} aligneToEl Element to which the container is attached.
			 * @return {Object} Configuration object.
			 * @private
			 */
			_getButtonHandlerConfig: function(x, y, aligneToEl) {
				var config = {
					classes: {
						wrapClass: ["selected-text-handler-button"]
					},
					displayMode: Terrasoft.controls.TipEnums.displayMode.WIDE,
					getAlignData: function() {
						var parentOffset = this.mixins.alignable.getAlignData.apply(this, arguments);
						parentOffset.offset.y = y;
						parentOffset.offset.x = x - this.alignToEl.dom.clientWidth / 2;
						return parentOffset;
					},
					hide: function() {
						this.destroy();
					},
					getSizes: function() {
						var parentSizes = this.mixins.alignable.getSizes.apply(this, arguments);
						parentSizes.availableSpaceBox.top = parentSizes.availableSpaceBox.top + 1;
						parentSizes.availableSpaceBox.bottom = parentSizes.availableSpaceBox.bottom + 1;
						if (parentSizes.availableSpaceBox.top < 0) {
							parentSizes.availableSpaceBox.top = parentSizes.wrapElBox["width"] + 1;
							parentSizes.availableSpaceBox.bottom = parentSizes.wrapElBox["width"] + 1;
						}
						return parentSizes;
					},
					initialAlignType: Terrasoft.AlignType.TOP,
					alignToEl: aligneToEl,
					items: this._getHandlerButtonItems()
				};
				return config;
			},

			/**
			 * Creates selected text handler button in specified position (right top corner).
			 * @param {Number} x Offset relative to the X axis.
			 * @param {Number} y Offset relative to the Y axis.
			 * @param {Object} aligneToEl Element to which the container is attached.
			 * @private
			 */
			_createSelectedTextHandlerButton: function(x, y, aligneToEl) {
				if (this.showFloatButton) {
					var config = this._getButtonHandlerConfig(x, y, aligneToEl);
					this._generateHandlerButton(config);
				}
			},

			/**
			 * Handler for selected text handler button click.
			 * @private
			 */
			_onSelectedTextHandlerButtonClick: function() {
				this.fireEvent("selectedTextHandlerButtonClick");
				this._destroyHandlerButtonIfExists();
			},

			/**
			 * Destroy selected text handler button if it exist.
			 * @private
			 */
			_destroyHandlerButtonIfExists: function() {
				if (this.handlerButton && !this.handlerButton.destroyed) {
					this.handlerButton.destroy();
					delete this.handlerButton;
				}
			},

			/**
			 * Generates button, that handles selected text.
			 * Button wrapped by tip.
			 * @param {Object} config Configuration object for tip.
			 * @private
			 */
			_generateHandlerButton: function(config) {
				this._destroyHandlerButtonIfExists();
				this.handlerButton = Ext.create("Terrasoft.Tip", config);
				this.handlerButton.bind(this);
				this.handlerButton.show();
			},

			/*
			 * Compare current highlighted text with previous highlighted text.
			 * @param {String} text Current highlighted text.
			 * @private
			 * @return {Boolean} True if texts is equal.
			 */
			_isSelectedTextChanged: function(text) {
				return text !== this.highlightedText;
			},

			/**
			 * Get Selection object and element,
			 * to which the button should be attached.
			 * @param {Event} event Selection change event.
			 * @return {Object} Object, contains Selection object and alignable element.
			 * @private
			 */
			_getDataForFloatButton: function(event) {
				var selection;
				var aligneToEl;
				if (event) {
					aligneToEl = this.iframeEl;
					selection = event.target.getSelection();
				} else {
					aligneToEl = Ext.getBody();
					selection = this.wrapEl.dom.ownerDocument.getSelection();
				}
				return {
					selection: selection,
					aligneToEl: aligneToEl
				};
			},
			/**
			 * Handler for text selection event.
			 * @private
			 */
			_onSelectionChange: function(event) {
				var dataForFloatButton = this._getDataForFloatButton(event);
				var selection = dataForFloatButton.selection;
				var aligneToEl = dataForFloatButton.aligneToEl;
				var selectedText = selection.toString();
				if (this._isSelectedTextChanged(selectedText)) {
					if (selectedText) {
						this.highlightedText = selectedText;
						var selectionRectangle = selection.getRangeAt(0);
						var coordinates = selectionRectangle.getBoundingClientRect();
						if (coordinates.bottom < 0) {
							return;
						}
						if (coordinates.top < 0) {
							var selectedRectangles = selectionRectangle.getClientRects();
							var lastRectangle = selectedRectangles[selectedRectangles.length - 1];
							this._createSelectedTextHandlerButton(lastRectangle.right, lastRectangle.top, aligneToEl);
						} else {
							this._createSelectedTextHandlerButton(coordinates.right, coordinates.top, aligneToEl);
						}
						this.fireEvent("selectedTextChanged", selectedText);
					} else {
						this._destroyHandlerButtonIfExists();
					}
				}
			},

			/**
			 * Set float button visibility flag.
			 * @param {Boolean} floatButtonVisibility Float button visibility flag.
			 */
			setShowFloatButton: function(floatButtonVisibility) {
				this.showFloatButton = floatButtonVisibility;
			},

			/**
			 * Changes opacity for content.
			 * @param {Number} opacityMode Opacity mode for content.
			 * text.
			 */
			changeOpacity: function(opacityMode) {
				if (opacityMode) {
					this.opacity = opacityMode;
				}
				if (this.rendered) {
					this.isHtmlBody === true ? this.getIframeBody().setStyle({"opacity": this.opacity})
						: this.contentEl.setStyle("opacity", this.opacity);
				}
			},

			/**
			 * @inheritdoc Terrasoft.Component#getBindConfig
			 * @override
			 */
			getBindConfig: function() {
				var bindConfig = this.callParent(arguments);
				var config = {
					selectedTextChanged: {
						changeEvent: "selectedTextChanged"
					},
					selectedTextHandlerButtonClick: {
						changeEvent: "selectedTextHandlerButtonClick"
					},
					showFloatButton: {
						changeMethod: "setShowFloatButton"
					},
					changeOpacity: {
						changeMethod: "changeOpacity"
					}
				};
				Ext.apply(bindConfig, config);
				return bindConfig;
			},

			/**
			 * @inheritdoc Terrasoft.MultilineLabel#prepareOnRender
			 * @override
			 */
			prepareOnRender: function() {
				this.callParent(arguments);
				if (this.isHtmlBody) {
					var body = this.getIframeBody();
					if (!body) {
						return;
					}
					body.setStyle({"opacity": this.opacity});
				} else {
					this.contentEl.setStyle("opacity", this.opacity);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#constructor
			 * @override
			 */
			constructor: function() {
				this.callParent(arguments);
				this.addEvents(
					/**
					 * @event selectedTextChanged
					 * Fires when text in control is selected.
					 */
					"selectedTextChanged",
					/**
					 * @event selectedTextHandlerButtonClick
					 * Eveent for selectedTextHandlerButton click.
					 */
					"selectedTextHandlerButtonClick"
				);
			}
		});
		return Terrasoft.MessageHistorySelectionHandler;
	}
);


