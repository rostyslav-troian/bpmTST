Terrasoft.configuration.Structures["ESNHtmlEditModule"] = {innerHierarchyStack: ["ESNHtmlEditModule"]};
define("ESNHtmlEditModule", ["ext-base", "terrasoft", "ExtendedHtmlEditModule"], function(Ext, Terrasoft) {
	/* global CKEDITOR */
	Ext.define("Terrasoft.controls.ESNHtmlEdit", {
		extend: "Terrasoft.ExtendedHtmlEdit",
		alternateClassName: "Terrasoft.ESNHtmlEdit",

		//region Properties: Private

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#trackingStartChars
		 * @overridden
		 */
		trackingStartChars: ["@"],

		//endregion

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.ExtendedHtmlEdit#tpl
		 * @overridden
		 */
		tpl: [
			//jscs:disable
			/*jshint quotmark: false */
			'<div id="{id}-html-edit" class="{htmlEditClass}" style="{htmlEditStyle}">',
			'<div id="{id}-html-edit-htmltext" class="{htmlEditTextareaClass}">',
			'<textarea id="{id}-html-edit-textarea"></textarea>',
			'</div>',
			'<span id="{id}-validation" class="{validationClass}" style="{validationStyle}">{validationText}' +
			'</span>',
			'</div>'
			/*jshint quotmark: true */
			//jscs:enable
		],

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#tplData
		 * @overridden
		 */
		tplData: {
			"classes": {
				"htmlEditClass": ["html-editor"],
				"htmlEditToolbarClass": ["html-edit-toolbar"],
				"htmlEditToolbarTopClass": ["html-edit-toolbar-top"],
				"htmlEditToolbarButtonGroupClass": ["html-edit-toolbar-buttongroup"],
				"htmlEditTextareaClass": ["html-edit-textarea", "onhtml-edit-textarea"]
			},
			"styles": {
				"htmlEditStyle": {
					"width": this.width,
					"height": this.height
				},
				"htmlEditFontFamilyStyle": {
					"vertical-align": "top",
					"width": "165px"
				},
				"htmlEditFontSizeStyle": {
					"vertical-align": "top",
					"width": "68px"
				}
			}
		},

		/**
		 * @inheritDoc Terrasoft.HtmlEdit#initFonts
		 * @overridden
		 */
		initFonts: Terrasoft.emptyFn,

		/**
		 * @inheritDoc Terrasoft.HtmlEdit#setupBodyDrop
		 * @overridden
		 */
		setupBodyDrop: Terrasoft.emptyFn,

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#margin
		 * @overridden
		 */
		margin: "",

		//endregion

		//region Properties: Public

		/**
		 * @inheritdoc Terrasoft.ExtendedHtmlEdit#placeholderClass
		 * @overridden
		 */
		placeholderClass: ".placeholder { color: #999999; margin: 5px 10px 3px }",

		/**
		 * True, if you want to change the height of the control , depending on the typed text.
		 * @type {Boolean}
		 */
		autoGrow: false,

		/**
		 * The min height for an element autogrow.
		 * @type {Number}
		 */
		autoGrowMinHeight: 0,

		/**
		 * The max height for an element autogrow.
		 * @type {Number}
		 */
		autoGrowMaxHeight: 200,

		/**
		 * Possibility autogrow element during creation.
		 * @type {Boolean}
		 */
		autoGrowOnStartup: true,

		/**
		 * Indent in pixels from the bottom border.
		 * @type {Number}
		 */
		autoGrowBottomSpace: 0,

		/**
		 * The current height of the element.
		 * @type {Number}
		 */
		lastHeight: 0,

		/**
		 * True, if the data is to be inserted as plain text.
		 * @type {Boolean}
		 */
		forcePasteAsPlainText: true,

		/**
		 * Custom attribute mapping for items.
		 * @type {Object}
		 */
		customItemAttributes: null,

		/**
		 * Default value for offset top.
		 * @type {Number}
		 */
		defaultOffsetTop: -9,

		/**
		 * Default value for offset left.
		 * @type {Number}
		 */
		defaultOffsetLeft: 20,

		//endregion

		//region Constructors: Public

		constructor: function() {
			this.callParent(arguments);
			this.customItemAttributes = {};
		},

		//endregion

		//region Methods: Private

		/**
		 * @inheritdoc Terrasoft.controls.ExtendedHtmlEdit#setTrackingValue
		 * @overridden
		 */
		setTrackingValue: function(item, callback, scope) {
			var linkConfig = {
				href: item.link,
				title: item.displayValue,
				value: item.value
			};
			Terrasoft.each(this.customItemAttributes, function(value) {
				var propertyName = value.property;
				linkConfig[propertyName] = item[propertyName];
			}, this);
			this.insertHyperLink(linkConfig);
			Ext.callback(callback, scope || this);
		},

		/**
		 * @inheritdoc Terrasoft.controls.ExtendedHtmlEdit#onKeyDown
		 * @override
		 * @param {object} keyboardEvent
		 */
		onKeyDown: function(keyboardEvent) {
			if (this._isStartSymbolNotTag() || this._isEscapePressed(keyboardEvent)) {
				this.collapseList();
				this.stopTracking();
			}
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.controls.ExtendedHtmlEdit#onKeyUp
		 * @overridden
		 */
		onKeyUp: function(keyboardEvent) {
			if (!this.enabled) {
				this.lastKeySymbol = "";
				return;
			}
			var typedValue = this.getTypedValue();
			if (this._isBackspaceOrDelete(keyboardEvent)) {
				if (typedValue === "") {
					this.collapseList();
				}
				var trackingValue = this.getTrackingValue();
				if (trackingValue === "") {
					this.stopTracking();
				}
			}
			if (this._isBackspaceOrDelete(keyboardEvent) || !keyboardEvent.isSpecialKey()) {
				if (this.tracking) {
					if ((typedValue.length >= this.minSearchCharsCount) && typedValue !== "") {
						this.typedValue = typedValue;
						this.expandList(typedValue);
					}
				}
			}
			if (!this.isListElementSelected) {
				this.fireEvent("keyUp", keyboardEvent, this);
			}
			this.lastKeySymbol = "";
		},

		/**
		 * @private
		 */
		_isEscapePressed: function(keyboardEvent) {
			var key = keyboardEvent.getKey();
			return (key === keyboardEvent.ESC);
		},

		/**
		 * Checks if pressed key is an editing key - [Backspace] or [Delete].
		 * @private
		 * @param {KeyboardEvent} keyboardEvent An event containing information about the key pressed.
		 * @return {Boolean} True if key pressed is an editing key, false for any other key.
		 */
		_isBackspaceOrDelete: function(keyboardEvent) {
			var key = keyboardEvent.getKey();
			return (key === keyboardEvent.BACKSPACE || key === keyboardEvent.DELETE);
		},


		/**
		 * @inheritdoc Terrasoft.controls.ExtendedHtmlEdit#isTrackingStartChar
		 * @overridden
		 * @private
		 * @param {String} itemChar Char for check.
		 */
		isTrackingStartChar: function(itemChar) {
			return this.trackingStartChars.some(function(trackingStartChar) {
				return (trackingStartChar === itemChar);
			});
		},

		/**
		 * @inheritdoc Terrasoft.controls.ExtendedHtmlEdit#setBindConfigParams
		 * @overridden
		 */
		setBindConfigParams: function(bindConfig) {
			var expandableBindConfig = this.mixins.expandableList.getBindConfig();
			var placeholderConfig = {
				placeholder: {
					changeMethod: "setPlaceholder"
				}
			};
			Ext.apply(bindConfig, expandableBindConfig);
			Ext.apply(bindConfig, placeholderConfig);
			return bindConfig;
		},

		/**
		 * Returns attributes for inserting link.
		 * @private
		 * @param {Object} config Link parameters.
		 * @return {Object} Link attributes.
		 */
		getHyperLinkAttributes: function(config) {
			var result = {
				"data-value": config.value
			};
			Terrasoft.each(this.customItemAttributes, function(value) {
				result[value.attribute] = config[value.property];
			}, this);
			return result;
		},

		/**
		 * @inheritdoc Terrasoft.controls.ExtendedHtmlEdit#clearTrackingNode
		 * @overridden
		 */
		clearTrackingNode: function(range) {
			var trackingValue = this.getTrackingValue();
			var trackingNode = range.getPreviousNode();
			if (!trackingNode) {
				return;
			}
			trackingNode.split(this.trackingStartPosition);
			trackingNode = range.getNextNode();
			trackingNode.split(trackingValue.length);
			trackingNode = range.getNextNode();
			trackingNode.setText("");
		},

		/**
		 * @inheritdoc Terrasoft.controls.ExtendedHtmlEdit#removePlaceholder
		 * @overridden
		 */
		removePlaceholder: function() {
			var editor = this.editor;
			var root = this.getRoot(editor);
			if (!root) {
				return;
			}
			if (!root.hasClass("placeholder")) {
				return;
			}
			root.removeClass("placeholder");
			if (CKEDITOR.dtd[root.getName()].p) {
				root.setHtml("<p><br/></p>");
				var range = new CKEDITOR.dom.range(editor.document);
				range.moveToElementEditablePosition(root.getFirst(), true);
				editor.getSelection().selectRanges([range]);
			} else {
				root.setHtml(" ");
			}
		},

		/**
		 * Event handler for control click event.
		 * @protected
		 * @param {Object} event Event object.
		 */
		onClick: function(event) {
			var eventData = event.data;
			var $event = event.data.$;
			var target = eventData.getTarget();
			var targetPath = new CKEDITOR.dom.elementPath(target, this.editor);
			var link = targetPath.contains("a");
			if (Terrasoft.Features.getIsEnabled("UseNavigationServiceRedirect") &&
					Terrasoft.isCurrentUserSsp() &&
					link && link.getAttribute("data-link") === "mention") {
				$event.preventDefault();
				event.stop();
				return;
			}
			this.callParent(arguments);
		},

		/**
		 * Initializes opportunity autogrow element.
		 * @param {Object} editor HtmlEdit.
		 * @private
		 */
		initAutogrow: function(editor) {
			if (!this.autoGrow) {
				return;
			}
			editor.on("instanceReady", function() {
				var editable = editor.editable();
				if (editable.isInline()) {
					editor.ui.space("contents").setStyle("height", "auto");
				} else {
					editor.addCommand("autogrow", {
						exec: function(editor) {
							this.lastHeight = this.resizeEditor(editor, this.lastHeight);
						}.bind(this),
						modes: {wysiwyg: 1},
						readOnly: 1,
						canUndo: false,
						editorFocus: false
					});
					var eventsList = {contentDom: 1, key: 1, selectionChange: 1, insertElement: 1, mode: 1};
					for (var eventName in eventsList) {
						if (!eventsList.hasOwnProperty(eventName)) {
							continue;
						}
						editor.on(eventName, this.autoGrowEventHandler, this);
					}
					editor.on("afterCommandExec", function(evt) {
						if (evt.data.name === "maximize" && evt.editor.mode === "wysiwyg") {
							if (evt.data.command.state === CKEDITOR.TRISTATE_ON) {
								var scrollable = this.getScrollable(editor);
								scrollable.removeStyle("overflow");
							} else {
								this.lastHeight = this.resizeEditor(editor, this.lastHeight);
							}
						}
					}, this);
					if (this.autoGrowOnStartup) {
						editor.execCommand("autogrow");
					}
				}
			}, this);
		},

		/**
		 * Event handler (contentDom, key, selectionChange, insertElement, mode), in which the needs resampler control.
		 * @private
		 * @param {Object} evt
		 */
		autoGrowEventHandler: function(evt) {
			if (evt.editor.mode === "wysiwyg") {
				setTimeout(function() {
					this.lastHeight = this.resizeEditor(evt.editor, this.lastHeight);
					this.lastHeight = this.resizeEditor(evt.editor, this.lastHeight);
				}.bind(this), 100);
			}
		},

		/**
		 * @inheritdoc Terrasoft.controls.ExtendedHtmlEdit#setListAlignOffset
		 * @overridden
		 */
		setListAlignOffset: function() {
			var pos = {left: 0, top: 0};
			var editor = this.editor;
			var selection = editor.getSelection();
			var nativeSelection = selection.getNative();
			var range = nativeSelection.getRangeAt(0);
			if (Ext.isEmpty(range)) {
				this.listOffset = [pos.left, pos.top];
				return;
			}
			var subRange = range.cloneRange();
			var subRangeContainer = subRange.startContainer;
			var offset = subRange.startOffset;
			if (!offset) {
				pos.left = subRangeContainer.offsetLeft || this.defaultOffsetLeft;
				pos.top = this.defaultOffsetTop;
			} else {
				subRange.setStart(subRangeContainer, offset - 1);
				if (subRange.endOffset !== 0) {
					var node = editor.element.$;
					var nodeLeft = (node) ? node.offsetLeft : 0;
					var nodeTop = (node) ? node.offsetTop : 0;
					var rect = subRange.getBoundingClientRect();
					pos.left = rect.left - nodeLeft + rect.width;
					pos.top = rect.top - nodeTop + rect.height;
				} else {
					pos.left = subRangeContainer.offsetLeft;
					pos.top = subRangeContainer.offsetTop;
				}
				var editorContainer = editor.container;
				if (editorContainer) {
					pos.top -= editorContainer.getClientRect().height;
				}
			}
			this.listOffset = [pos.left, pos.top];
		},

		/**
		 * Initializes the ability to insert data only as plain text.
		 * @private
		 */
		initPasteAsPlainText: function() {
			if (this.forcePasteAsPlainText) {
				var editor = this.editor;
				editor.on("beforePaste", function(evt) {
					evt.data.type = "text";
				});
				editor.on("afterPaste", function() {
					this.stopTracking();
				}, this);
			}
		},

		/**
		 * @inheritdoc Terrasoft.controls.ExtendedHtmlEdit#setInitConfig
		 * @overridden
		 */
		setInitConfig: function() {
			this.addEvents("changeValue", "keyup", "keypress", "keydown", "listViewItemRender", "enterkeypressed");
		},

		/**
		 * @private
		 */
		_isStartSymbolNotTag: function() {
			var range = this.getSelectedRange();
			var value = range.startContainer.getText();
			return value.length === 1 && !this.isTrackingStartChar(value.substring(0, 1));
		},

		//endregion

		//region Methods: Protected

		/**
		 * Gets the method for model parameter binding.
		 * @protected
		 * @virtual
		 * @param {Object} binding An object that describes the binding properties of the control
		 * parameters to the model.
		 * @param {Terrasoft.BaseViewModel} model The data model which is linked to the control.
		 * @return {Function} Model method.
		 */
		getModelMethod: function(binding, model) {
			return this.mixins.expandableList.getModelMethod.call(this, binding, model);
		},

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#onFocus
		 * @overridden
		 */
		onFocus: function() {
			this.callParent(arguments);
			this.applyHighlight();
		},

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#onBlur
		 * @overridden
		 */
		onBlur: function() {
			this.callParent(arguments);
			this.removeHighlight();
		},

		/**
		 * @inheritdoc Terrasoft.ExtendedHtmlEdit#onContentDom
		 * @overridden
		 */
		onContentDom: function() {
			var editor = this.callParent(arguments);
			editor.on("beforeCommandExec", this.onBeforeCommandExec, this);
			this.initAutogrow(editor);
			this.initPasteAsPlainText();
		},

		/**
		 * @inheritdoc Terrasoft.ExtendedHtmlEdit#onEnterKeyPressed
		 * @overridden
		 */
		onEnterKeyPressed: function() {
			this.stopTracking();
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.ExtendedHtmlEdit#onKeyPress
		 * @overridden
		 */
		onKeyPress: function(e) {
			if (!this.enabled || this.readonly) {
				return;
			}
			var charCode = e.getCharCode();
			this.lastKeySymbol = String.fromCharCode(charCode);
			if (!e.isNavKeyPress()) {
				if (this.isTrackingStartChar(this.lastKeySymbol)) {
					this.stopTracking();
					this.startTracking();
				}
			}
		},

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#initToolbarItems
		 * @overridden
		 */
		initToolbarItems: Terrasoft.emptyFn,

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#getEditorConfig
		 * @overridden
		 */
		getEditorConfig: function() {
			return this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#getKeyStrokes
		 * @overridden
		 */
		getKeyStrokes: function() {
			return [
				[0x110000 + 66, null], // CTRL + B
				[0x110000 + 73, null], // CTRL + I
				[0x110000 + 85, null] // CTRL + U
			];
		},

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#insertHyperLink
		 * @overridden
		 */
		insertHyperLink: function(config) {
			var editor = this.editor;
			var selection = editor.getSelection();
			var ranges = selection.getRanges();
			var range = ranges[0];
			this.clearTrackingNode(range);
			var href = config.href;
			var title = config.title || href;
			var linkHtmlTemplate = "<a target=\"_self\" href=\"{0}\" title=\"{1}\" data-link=\"mention\">{2}</a>";
			var linkHtml = Ext.String.format(linkHtmlTemplate, href, title, title);
			var linkNode = CKEDITOR.dom.element.createFromHtml(linkHtml);
			var attributes = this.getHyperLinkAttributes(config);
			linkNode.setAttributes(attributes);
			range.insertNode(linkNode);
			this.fixCursorPosition(linkNode, selection, ranges, range);
			this.stopTracking();
		},

		/**
		 * Applies a CSS class for lighting control.
		 * @protected
		 */
		applyHighlight: function() {
			var wrapEl = this.getWrapEl();
			wrapEl.addCls("html-edit-focus");
		},

		/**
		 * Remove a CSS class for lighting control.
		 * @protected
		 */
		removeHighlight: function() {
			var wrapEl = this.getWrapEl();
			wrapEl.removeCls("html-edit-focus");
		},

		//endregion

		//region Methods: Public

		/**
		 * The height of the content.
		 * @param {Object} scrollable Object with content parameters.
		 * @return {Number} Content height.
		 */
		contentHeight: function(scrollable) {
			var overflowY = scrollable.getStyle("overflow-y");
			var doc = scrollable.getDocument();
			var html = "<span style=\"margin:0;padding:0;border:0;clear:both;width:1px;height:1px;display:block;\">" +
				(CKEDITOR.env.webkit ? ("&" + "nbsp;") : "") + "</span>";
			var marker = CKEDITOR.dom.element.createFromHtml(html, doc);
			var isIe = CKEDITOR.env.ie ? "getBody" : "getDocumentElement";
			doc[isIe]().append(marker);
			var height = marker.getDocumentPosition(doc).y + marker.$.offsetHeight;
			marker.remove();
			scrollable.setStyle("overflow-y", overflowY);
			return height;
		},

		/**
		 * Gets scrollable element.
		 * @param {Object} editor HtmlEdit.
		 * @return {CKEDITOR.dom.element|*}
		 */
		getScrollable: function(editor) {
			var doc = editor.document;
			var body = doc.getBody();
			var htmlElement = doc.getDocumentElement();
			return (doc.$.compatMode === "BackCompat") ? body : htmlElement;
		},

		/**
		 * Specifies the height of the element.
		 * @param {Object} editor HtmlEdit.
		 * @param {Number} lastHeight Element height.
		 * @return {Number} New element height.
		 */
		resizeEditor: function(editor, lastHeight) {
			if (!editor.window) {
				return;
			}
			var maximize = editor.getCommand("maximize");
			if (maximize && maximize.state === CKEDITOR.TRISTATE_ON) {
				return;
			}
			var scrollable = this.getScrollable(editor);
			var currentHeight = editor.window.getViewPaneSize().height;
			var newHeight = this.contentHeight(scrollable);
			newHeight += (this.autoGrowBottomSpace || 0);
			var min = (this.autoGrowMinHeight !== undefined) ? this.autoGrowMinHeight : 200;
			var max = this.autoGrowMaxHeight || Infinity;
			newHeight = Math.max(newHeight, min);
			newHeight = Math.min(newHeight, max);
			if (newHeight !== currentHeight) {
				newHeight = editor.fire("autoGrow", {currentHeight: currentHeight, newHeight: newHeight}).newHeight;
				editor.resize(editor.container.getStyle("width"), newHeight, true);
				lastHeight = newHeight;
			}
			if (scrollable.$.scrollHeight > scrollable.$.clientHeight && newHeight < max) {
				scrollable.setStyle("overflow-y", "hidden");
			} else {
				scrollable.removeStyle("overflow-y");
			}
			return lastHeight;
		}

		//endregion

	});
});


