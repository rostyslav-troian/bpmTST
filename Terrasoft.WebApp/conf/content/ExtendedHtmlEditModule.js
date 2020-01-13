Terrasoft.configuration.Structures["ExtendedHtmlEditModule"] = {innerHierarchyStack: ["ExtendedHtmlEditModule"]};
define("ExtendedHtmlEditModule", ["ext-base", "terrasoft", "ExtendedHtmlEditModuleResources", "HtmlEditModule"
], function(Ext, Terrasoft, resources) {

	/* global CKEDITOR */
	/**
	 * Class of ExtendedHtmlEdit.
	 */
	Ext.define("Terrasoft.controls.ExtendedHtmlEdit", {
		extend: "Terrasoft.HtmlEdit",
		alternateClassName: "Terrasoft.ExtendedHtmlEdit",

		mixins: {
			expandableList: "Terrasoft.ExpandableList"
		},

		//region Properties: Private

		/**
		 * Template without toolbar.
		 * @type {Array}
		 * @private
		 */
		tplWithOutToolbar: [
			"<div id=\"{id}-html-edit\" class=\"{htmlEditClass}\" style=\"{htmlEditStyle}\">",
			"<div id=\"{id}-html-edit-htmltext\" class=\"{htmlEditTextareaClass}\">",
			"<textarea id=\"{id}-html-edit-textarea\"></textarea>",
			"</div>",
			"<span id=\"{id}-validation\" class=\"{validationClass}\" style=\"{validationStyle}\">{validationText}" +
			"</span>",
			"</div>"
		],

		/**
		 * Template with toolbar.
		 * @type {Array}
		 * @private
		 */
		tplWithToolbar: [
			"<div id=\"{id}-html-edit\" class=\"{htmlEditClass}\" style=\"{htmlEditStyle}\">",
			"<div style=\"display: table-row;\">",
			"<div id=\"{id}-html-edit-toolbar\" class=\"{htmlEditToolbarClass}\">",
			"<div id=\"html-edit-toolbar-undo\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'undo' || tag == 'redo'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-font-family\" class=\"{htmlEditToolbarButtonGroupClass}\" style=\"{htmlEditFo" +
			"ntFamilyStyle}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'fontFamily'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-font-size\" class=\"{htmlEditToolbarButtonGroupClass}\" style=\"{htmlEditFont" +
			"SizeStyle}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'fontSize'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-font-style\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'fontStyleBold' || tag == 'fontStyleItalic' || tag == 'fontStyleUnderline'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-font-color\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'fontColor'\">",
			"	<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-highlight\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'hightlightColor'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-list\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'numberedList' || tag == 'bulletedList'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-justify\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'justifyLeft' || tag == 'justifyCenter' || tag == 'justifyRight'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-indent\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'outdentList' || tag == 'indentList'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-image\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'image'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-link\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'link'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-justify\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'htmlMode' || tag == 'plainMode'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-tools\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'maximized'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"{id}-html-edit-toolbar-table\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'table'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-addTemplate\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'addTemplate'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-addMacros\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'addMacros'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"</div>",
			"</div>",
			"<div style=\"display: table-row;\">",
			"<div id=\"{id}-html-edit-htmltext\" class=\"{htmlEditTextareaClass}\">",
			"<textarea id=\"{id}-html-edit-textarea\" style=\"border: none\"></textarea>",
			"</div>",
			"<div id=\"{id}-html-edit-plaintext\" class=\"{htmlEditTextareaClass}\" style=\"margin-bottom: 24px;\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'plainText'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"</div>",
			"<span id=\"{id}-validation\" class=\"{validationClass}\" style=\"{validationStyle}\">" +
			"{validationText}</span>",
			"</div>"
		],

		/**
		 * Default text, when input area is empty.
		 * @type {String}
		 * @private
		 */
		placeholder: "",

		/**
		 * Is tracking char started.
		 * @type {Boolean}
		 * @private
		 */
		tracking: false,

		/**
		 * Chars to start tracking.
		 * @type {Array}
		 * @private
		 */
		trackingStartChars: ["/"],

		/**
		 * Toolbar visible attribute.
		 * @type {Boolean}
		 * @private
		 */
		toolbarVisible: true,

		//endregion

		//region Properties: protected

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#tpl
		 * @override
		 */
		tpl: [
			"<div id=\"{id}-html-edit\" class=\"{htmlEditClass}\" style=\"{htmlEditStyle}\">",
			"<div style=\"display: table-row;\">",
			"<div id=\"{id}-html-edit-toolbar\" class=\"{htmlEditToolbarClass}\">",
			"<div id=\"html-edit-toolbar-font-family\" class=\"{htmlEditToolbarButtonGroupClass}\" style=\"{htmlEditFo" +
			"ntFamilyStyle}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'fontFamily'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-font-size\" class=\"{htmlEditToolbarButtonGroupClass}\" style=\"{htmlEditFont" +
			"SizeStyle}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'fontSize'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-font-style\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'fontStyleBold' || tag == 'fontStyleItalic' || tag == 'fontStyleUnderline'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-font-color\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'fontColor'\">",
			"	<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-highlight\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'hightlightColor'\">",
			"	<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-list\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'numberedList' || tag == 'bulletedList'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-justify\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'justifyLeft' || tag == 'justifyCenter' || tag == 'justifyRight'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-indent\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'outdentList' || tag == 'indentList'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-image\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'image'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-link\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'link'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-justify\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'htmlMode' || tag == 'plainMode'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-undo\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'undo' || tag == 'redo'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-tools\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'maximized'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-addTemplate\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'addTemplate'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-addMacros\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'addMacros'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"</div>",
			"</div>",
			"<div style=\"display: table-row;\">",
			"<div id=\"{id}-html-edit-htmltext\" class=\"{htmlEditTextareaClass}\">",
			"<textarea id=\"{id}-html-edit-textarea\" style=\"border: none\"></textarea>",
			"</div>",
			"<div id=\"{id}-html-edit-plaintext\" class=\"{htmlEditTextareaClass}\" style=\"margin-bottom: 24px;\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'plainText'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"</div>",
			"<span id=\"{id}-validation\" class=\"{validationClass}\" style=\"{validationStyle}\">" +
			"{validationText}</span>",
			"</div>"
		],

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#onImagesLoaded
		 * @override
		 */
		onImagesLoaded: Terrasoft.emptyFn,

		/**
		 * Minimal chars count for search.
		 * @protected
		 * @type {Number}
		 */
		minSearchCharsCount: 1,

		/**
		 * Selected text.
		 * @protected
		 * @override
		 * @type {String[]}
		 */
		selectedText: null,

		/**
		 * @type {String} placeholderClass Placeholder style.
		 */
		placeholderClass: ".placeholder { color: #999999; margin-top: 13px }",
		/**
		 * @inheritdoc Terrasoft.HtmlEdit#subscribeForEvents
		 * @override
		 */
		trackingStartPosition: 0,

		/**
		 * Last pressed key.
		 * @protected
		 * @type {String} Last pressed key value.
		 */
		lastKeySymbol: "",

		/**
		 * @inheritdoc Terrasoft.ExpandableList#maskDelay
		 * @override
		 */
		maskDelay: 500,

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#setValueDelay
		 * @override
		 */
		setValueDelay: 50,

		//endregion

		//region Constructors: Public

		constructor: function() {
			this.callParent(arguments);
			this.insertEmailTemplateDebounce = new Ext.util.DelayedTask(Terrasoft.emptyFn, this);
		},

		//endregion

		//region Methods: Private

		/**
		 * Set bind config params.
		 * @private
		 * @param {Object} bindConfig Base bind config.
		 * @return {Object} Bind config.
		 */
		setBindConfigParams: function(bindConfig) {
			var expandableBindConfig = this.mixins.expandableList.getBindConfig();
			var placeholderConfig = {
				placeholder: {
					changeMethod: "setPlaceholder"
				}
			};
			var toolbarVisibleConfig = {
				toolbarVisible: {
					changeMethod: "setToolbarVisible"
				}
			};
			Ext.apply(bindConfig, expandableBindConfig);
			Ext.apply(bindConfig, placeholderConfig);
			Ext.apply(bindConfig, toolbarVisibleConfig);
			return bindConfig;
		},

		/**
		 * Set init config params.
		 * @private
		 */
		setInitConfig: function() {
			this.initTemplate();
			this.initEvents();
			this.initItemsConfig();
		},

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#getBindConfig
		 * @override
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			Ext.apply(bindConfig, {
				selectedText: {
					changeEvent: "selectedtextchanged",
					deprecatedChangeEvent: "selectedtextсhanged",
					changeMethod: "setSelectedText"
				}
			});
			return this.setBindConfigParams(bindConfig);
		},

		/**
		 * Obtaining values.
		 * @private
		 * @return {String}
		 */
		getValue: function() {
			return this.value;
		},

		/**
		 * Event hendler beforeCommandExec of ckeditor element.
		 * @private
		 * @param {Object} e event Object.
		 */
		onBeforeCommandExec: Terrasoft.emptyFn,


		/**
		 * On key up event handler.
		 * @private
		 * @param {Object} e Event config.
		 */
		onKeyUp: function(e) {
			if (!this.enabled) {
				this.lastKeySymbol = "";
				return;
			}
			var typedValue;
			var key = e.getKey();
			if (key === e.DELETE || key === e.BACKSPACE) {
				typedValue = this.getTypedValue();
				if (typedValue === "") {
					this.collapseList();
				}
				var trackingValue = this.getTrackingValue();
				if (trackingValue === "") {
					this.stopTracking();
				}
			}
			if (!e.isNavKeyPress() && this.tracking) {
				typedValue = this.getTypedValue();
				if ((typedValue.length >= this.minSearchCharsCount) && typedValue !== "") {
					this.typedValue = typedValue;
					this.expandList(typedValue);
				}
			}
			if (!this.isListElementSelected) {
				this.fireEvent("keyUp", e, this);
			}
			this.lastKeySymbol = "";
		},

		/**
		 * On key ckeditor event handler.
		 * @private
		 * @param {Object} e Event config.
		 */
		onKey: function(e) {
			var data = e.data;
			var keyCode = data.keyCode;
			var listView = this.listView;
			if (this.tracking && (listView !== null) && listView.visible) {
				if (keyCode === 13) {
					e.cancel();
					listView.fireEvent("listPressEnter");
				} else if (keyCode >= 37 && keyCode <= 40) {
					e.cancel();
					if (keyCode === 38) {
						listView.fireEvent("listPressUp");
					} else if (keyCode === 40) {
						listView.fireEvent("listPressDown");
					}
				}
			}
		},

		/**
		 * Sets that tracking is started.
		 * @private
		 * @param {Boolean} value
		 */
		setTracking: function(value) {
			if (this.tracking === value) {
				return;
			}
			this.tracking = value;
		},

		/**
		 * Sets tracking start position.
		 * @private
		 */
		setTrackingStartPosition: function() {
			var range = this.getSelectedRange();
			this.trackingStartPosition = range.startOffset;
		},

		/**
		 * Starts tracking.
		 * @private
		 */
		startTracking: function() {
			this.setTracking(true);
			this.setTrackingStartPosition();
			this.setListAlignOffset();
		},

		/**
		 * Stops tracking.
		 * @private
		 */
		stopTracking: function() {
			this.setTracking(false);
			this.trackingStartPosition = 0;
		},


		/**
		 * Initialize placeholder.
		 * @private
		 * @param {Object} editor
		 */
		initPlaceholder: function(editor) {
			editor.on("mode", function(ev) {
				ev.editor.focusManager.hasFocus = false;
			});
			var placeholder = this.placeholder;
			if (!placeholder) {
				return;
			}
			if (editor.addCss) {
				editor.addCss(this.getPlaceholderCss());
			}
			var node = this.editor.document.getHead().append("style");
			node.setAttribute("type", "text/css");
			var content = this.placeholderClass;
			if (CKEDITOR.env.ie && CKEDITOR.env.version < 11) {
				node.$.styleSheet.cssText = content;
			} else {
				node.$.innerHTML = content;
			}
			editor.on("getData", function(ev) {
				var editor = ev.editor;
				var root = this.getRoot(editor);
				if (!root) {
					return;
				}
				if (root && root.hasClass("placeholder")) {
					ev.data.dataValue = "";
				}
			}, this);
			editor.on("setData", function(ev) {
				if (CKEDITOR.dialog._.currentTop) {
					return;
				}
				var editor = ev.editor;
				var root = this.getRoot(editor);
				if (!root) {
					return;
				}
				if (this.dataIsEmpty(ev.data.dataValue)) {
					this.addPlaceholder(ev);
				} else if (root.hasClass("placeholder")) {
					root.removeClass("placeholder");
				}
			}, this);
			editor.on("blur", this.addPlaceholder, this, placeholder);
			editor.on("mode", this.addPlaceholder, this, placeholder);
			editor.on("contentDom", this.addPlaceholder, this, placeholder);
			editor.on("focus", this.removePlaceholder, this);
			editor.on("beforeModeUnload", this.removePlaceholder, this);
		},

		/**
		 * Returns root element of CKEDITOR.
		 * @private
		 * @return {Object} Root element of CKEDITOR.
		 */
		getRoot: function(editor) {
			var root;
			if (editor.editable) {
				root = editor.editable();
			} else if (editor.mode === "wysiwyg") {
				if (editor.document) {
					root = editor.document.getBody();
				} else {
					root = editor.textarea;
				}
			}
			return root;
		},

		/**
		 * Adds placeholder.
		 * @private
		 * @param {Object} ev Element config.
		 */
		addPlaceholder: function(ev) {
			var editor = ev.editor;
			var root = this.getRoot(editor);
			if (!root) {
				return;
			}
			if (editor.mode !== "wysiwyg") {
				return;
			}
			if (this.focused) {
				return;
			}
			if (CKEDITOR.dialog._.currentTop) {
				return;
			}
			if (!root) {
				return;
			}
			if (this.dataIsEmpty(this.getEditorValue())) {
				var placeholder = ev.listenerData;
				root.setHtml(placeholder);
				root.addClass("placeholder");
			}
		},

		/**
		 * Removes placeholder.
		 * @private
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
				var html = root.getHtml();
				root.setHtml(html.replace(this.placeholder, ""));
			} else {
				root.setHtml(" ");
			}
		},

		/**
		 * Checks that the data is empty.
		 * @private
		 * @param {String} data Data for checking.
		 * @return {Boolean} Is empty data flag.
		 */
		dataIsEmpty: function(data) {
			if (!data) {
				return true;
			}
			var plainValue = this.removeHtmlTags(data);
			return (plainValue.length === 0);
		},

		/**
		 * Insert email template to top of the email body.
		 * @private
		 * @param {String} template HTML email template.
		 */
		_insertEmailTemplateToTopBody: function(template) {
			const editor = this.editor;
			const editorData = editor.getData();
			this.setEditorValue(template + editorData);
		},

		/**
		 * Insert email template to cursor position.
		 * @private
		 * @param {String} configValue Control config value.
		 * @param {CKEDITOR.dom.selection} range Current selection.
		 * @param {CKEDITOR.dom.element} linkNode The element instance.
		 */
		_insertEmailTemplateToCursorPosition: function(configValue, range, linkNode) {
			const attributes = {
				"data-value": configValue
			};
			linkNode.setAttributes(attributes);
			this.clearTrackingNode(range);
			this.removePlaceholder();
			range.insertNode(linkNode);
		},

		//endregion

		//region Methods: Protected

		setToolbarVisible: function(value) {
			this.toolbarVisible = value;
			this.initTemplate();
			this.reRender();
		},

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#subscribeForEvents
		 * @override
		 */
		subscribeForEvents: function(binding, property, model) {
			this.callParent(arguments);
			this.mixins.expandableList.subscribeForEvents.call(this, binding, property, model);
		},

		/**
		 * @inheritdoc
		 * @override
		 */
		initBinding: function(configItem, bindingRule, bindConfig) {
			var binding = this.callParent(arguments);
			var comboBoxBinding = this.mixins.expandableList.initBinding.call(this, configItem, bindingRule, bindConfig);
			return Ext.apply(binding, comboBoxBinding);
		},

		/**
		 * @inheritdoc Terrasoft.AbstractContainer#onDestroy
		 * @override
		 */
		onDestroy: function() {
			this.mixins.expandableList.destroy.call(this);
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#destroy
		 * @override
		 */
		destroy: function() {
			var editor = this.editor;
			if (editor) {
				editor.removeListener("key", this.onKey, this);
				editor.removeListener("beforeCommandExec", this.onBeforeCommandExec, this);
				var editorDocument = this.editor.document;
				if (editorDocument) {
					var el = editorDocument.$;
					Ext.EventManager.removeListener(el, "keyup", this.onKeyUp, this);
					Ext.EventManager.removeListener(el, "keydown", this.onKeyDown, this);
					Ext.EventManager.removeListener(el, "keypress", this.onKeyPress, this);
				}
			}
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.Component#clearDomListeners
		 * @override
		 */
		clearDomListeners: function() {
			var doc = Ext.getDoc();
			doc.un("mousedown", this.onMouseDownCollapse, this);
			this.callParent(arguments);
		},

		/**
		 * Returns selected text range.
		 * @protected
		 * @return {Ext.Element}
		 */
		getSelectedRange: function() {
			var ranges = this.getSelectedRanges();
			return ranges[0];
		},

		/**
		 * Retrieves the CKEDITOR.dom.range instances that represent the current selection.
		 * @protected
		 * @return {Array} Range instances that represent the current selection.
		 */
		getSelectedRanges: function() {
			var editor = this.editor;
			var selection = editor.getSelection();
			return selection.getRanges();
		},

		/**
		 * Returns tracking value.
		 * @protected
		 * @return {String}
		 */
		getTrackingValue: function() {
			if (!this.tracking) {
				return "";
			}
			var range = this.getSelectedRange();
			var value = range.startContainer.getText();
			var start = this.trackingStartPosition;
			var stop = range.endOffset;
			return value.substring(start, stop);
		},

		/**
		 * Returns dom element value.
		 * @protected
		 * @return {String}
		 */
		getTypedValue: function() {
			if (this.rendered) {
				if (this.tracking) {
					var trackingValue = this.getTrackingValue().substring(1);
					return trackingValue.match(/^\s/) ? "" : trackingValue;
				} else {
					return this.editor.getData();
				}
			} else {
				return null;
			}
		},

		/**
		 * Set tracking value.
		 * @protected
		 * @param {Object} item Config
		 * @param {Function} callback Callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		setTrackingValue: function(item, callback, scope) {
			const linkConfig = {
				body: item.body,
				value: item.value
			};
			const args = [linkConfig, item.isFromButton, callback, scope];
			this.insertEmailTemplateDebounce.delay(this.setValueDelay, this.insertEmailTemplate, this, args);
		},

		/**
		 * Returns body value.
		 * @protected
		 * @returns {String} body value.
		 */
		getBodyValue: function() {
			return this.editor.getData();
		},

		/**
		 * Add e-mail template with macros.
		 * @protected
		 * @param {Object} config Control config.
		 * @param {Boolean} isFromButton Insert template from button mark.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		insertEmailTemplate: function(config, isFromButton, callback, scope) {
			const editor = this.editor;
			const ranges = this.getSelectedRanges();
			const template = Ext.String.format("<div>{0}</div>", config.body);
			const linkNode = this.createCkeditorDomElement(template);
			ranges.length
				? this._insertEmailTemplateToCursorPosition(config.value, ranges[0], linkNode)
				: this._insertEmailTemplateToTopBody(template);
			if (!isFromButton) {
				const selection = editor.getSelection();
				this.fixCursorPosition(linkNode, selection, ranges, ranges[0]);
				this.stopTracking();
			}
			Ext.callback(callback, scope || this, [this.getBodyValue()]);
		},

		/**
		 * Task allowed to make debounce when using a insertEmailTemplate function.
		 * @protected
		 */
		insertEmailTemplateDebounce: null,

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#init
		 * @override
		 */
		init: function() {
			this.mixins.expandableList.init.call(this);
			this.setInitConfig();
			this.callParent(arguments);
		},

		/**
		 * Initialize control template.
		 * @protected
		 */
		initTemplate: function() {
			this.tpl = this.toolbarVisible ? this.tplWithToolbar : this.tplWithOutToolbar;
		},

		/**
		 * Initialize control config.
		 * @protected
		 */
		initItemsConfig: function() {
			var tag = "addTemplate";
			this.itemsConfig.forEach(function(item, index) {
				if (item.tag === tag) {
					this.itemsConfig.splice(index, 1);
				}
			}, this);
			var self = this;
			var item = {
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAKlBMVEX///+Vp7+Vp" +
					"7+Vp7+Vp7+Vp7+Vp7+Vp7+Vp7+Vp7+Vp7+Vp7+Vp7+Vp79p/X0QAAAADXRSTlMAESJEVWZ3iJm7zN3uO80K8QAAAEVJR" +
					"EFUeNqtjTEOwCAMAx0gCQHy/+8yoE71UKnceDrZuIXr20mwsH0NjchJnLFw/A01DWOhZ32uBbBsWIGY5Th1tii4ygbGH" +
					"gEnYh6Y6AAAAABJRU5ErkJggg=="
				},
				handler: function handler() {
					self.fireEvent("openEmailTemplate", {control: self});
				},
				tag: tag
			};
			this.itemsConfig.push(item);
			if (Terrasoft.Features.getIsEnabled("MailboxSyncSettingsMacrosesEnabled")) {
				this.addMacrosButtonConfig();
			}
		},

		/**
		 * Adds macros button config to items config.
		 * @protected
		 */
		addMacrosButtonConfig: function() {
			var tag = "addMacros";
			this.itemsConfig.forEach(function(item, index) {
				if (item.tag === tag) {
					this.itemsConfig.splice(index, 1);
				}
			}, this);
			if (this.useMacroses) {
				var self = this;
				var macrosButtonConfig = {
					className: "Terrasoft.Button",
					classes: {
						imageClass: ["add-macros-button-image"]
					},
					imageConfig: resources.localizableImages.MacrosesIcon,
					handler: function handler() {
						self.fireEvent("openMacrosPage", {control: self});
					},
					tag: tag,
					markerValue: "addMacrosButton"
				};
				this.itemsConfig.push(macrosButtonConfig);
			}
		},

		/**
		 * Initialize control events.
		 * @protected
		 */
		initEvents: function() {
			this.addEvents("openEmailTemplate", "changeValue", "keyup", "keypress", "keydown", "listViewItemRender",
				"openMacrosPage", "selectedtextсhanged");
		},

		/**
		 * Sets value of selected text.
		 * @param {String} value Selected text.
		 */
		setSelectedText: function(value) {
			if ((value !== this.selectedText) && this.editor) {
				var editor = this.editor;
				var selection = editor.getSelection();
				var selectedText = selection && selection.getSelectedText();
				if (!Ext.isEmpty(selectedText)) {
					var range = selection.getRanges()[0];
					range.deleteContents();
				}
				this.insertContent(value);
				var editorData = this.editor.getData();
				this.updateValue(editorData);
			}
		},

		/**
		 * Inserts value to content.
		 * @protected
		 * @param {String} value Inserting value.
		 */
		insertContent: function(value) {
			this.editor.insertText(value);
		},

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#initDomEvents
		 * @override
		 */
		initDomEvents: function() {
			this.callParent(arguments);
			var doc = Ext.getDoc();
			doc.on("mousedown", this.onMouseDownCollapse, this);
		},

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#onContentDom
		 * @override
		 */
		onContentDom: function() {
			this.callParent(arguments);
			var editor = this.editor;
			var el = editor.document;
			editor.on("key", this.onKey, this);
			Ext.EventManager.on(el.$, "keyup", this.onKeyUp, this);
			Ext.EventManager.on(el.$, "keydown", this.onKeyDown, this);
			Ext.EventManager.on(el.$, "keypress", this.onKeyPress, this);
			this.initPlaceholder(editor);
			return editor;
		},

		/**
		 * On key down event handler.
		 * @param {Object} e Event config.
		 * @protected
		 */
		onKeyDown: function(e) {
			if (!this.enabled || this.readonly) {
				return;
			}
			var isListElementSelected = false;
			var key = e.getKey();
			var listView = this.listView;
			switch (key) {
				case e.DOWN:
					if (listView !== null && listView.visible) {
						this.listView.fireEvent("listPressDown");
					}
					break;
				case e.UP:
					if (listView !== null && listView.visible) {
						listView.fireEvent("listPressUp");
					}
					break;
				case e.ENTER:
					this.onEnterKeyPressed(e);
					if (listView !== null && listView.visible) {
						isListElementSelected = listView.fireEvent("listPressEnter");
					}
					break;
				case e.ESC:
					if (listView !== null && listView.visible) {
						listView.hide();
					}
					break;
				default:
					break;
			}
			this.isListElementSelected = isListElementSelected;
			if (!isListElementSelected) {
				this.fireEvent("keyDown", e, this);
			}
		},

		/**
		 * On enter key press handler.
		 * @protected
		 * @param {Object} e Event object.
		 */
		onEnterKeyPressed: function(e) {
			this.stopTracking();
			var typedValue = this.getTypedValue();
			var hasChanges = this.changeValue(typedValue);
			this.fireEvent("enterkeypressed", e, this);
			if (!hasChanges) {
				this.fireEvent("editenterkeypressed", e, this);
			}
		},

		/**
		 * Changes value if it was changed.
		 * @protected
		 * @param {String} value
		 * @return {Boolean}
		 */
		changeValue: function(value) {
			var isChanged = (value !== this.getValue());
			if (isChanged) {
				this.setValue(value);
			}
			return isChanged;
		},

		/**
		 * On key press event handler.
		 * @param {Object} e Event config.
		 * @protected
		 */
		onKeyPress: function(e) {
			if (!this.enabled || this.readonly) {
				return;
			}
			this.lastKeySymbol = String.fromCharCode(e.getCharCode());
			if (!e.isNavKeyPress()) {
				var tracking = this.tracking;
				if (!tracking && this.isTrackingStartChar()) {
					this.startTracking();
				}
			}
		},

		/**
		 * On list element selected event handler.
		 * @protected
		 * @param {Object} item Selected element property.
		 */
		onListElementSelected: function(item) {
			if (!Ext.isEmpty(item)) {
				this.setTrackingValue(item);
				this.listView.hide();
			}
		},

		/**
		 * Return if tracking is started.
		 * @protected
		 * @return {Boolean}
		 */
		isTrackingStartChar: function() {
			var result = false;
			Terrasoft.each(this.trackingStartChars, function(trackingStartCharCode) {
				result = result || (trackingStartCharCode === this.lastKeySymbol);
			}, this);
			return result;
		},

		/**
		 * Returns document node.
		 * @return {Ext.Element}
		 */
		getEl: function() {
			return this.editor.document;
		},

		/**
		 * Removes input value.
		 * @protected
		 * @param {Object} range Selected range.
		 */
		clearTrackingNode: function(range) {
			var trackingValue = this.getTrackingValue();
			var trackingNode = range.getPreviousNode();
			if (!trackingNode) {
				return;
			}
			if (trackingNode.type === 3 && trackingNode.getLength() > 0) {
				trackingNode.split(this.trackingStartPosition);
				trackingNode = range.getNextNode();
				trackingNode.split(trackingValue.length);
				trackingNode = range.getNextNode();
				trackingNode.setText("");
			}
		},

		/**
		 * Sets cursor position after text insert.
		 * @protected
		 * @param {Object} node Current node.
		 * @param {Object} selection Selection in node.
		 * @param {Object} ranges Selection ranges.
		 * @param {Object} range Current range.
		 */
		fixCursorPosition: function(node, selection, ranges, range) {
			if (Ext.isGecko) {
				var fakeNode = new CKEDITOR.dom.element("span", this.editor.document);
				fakeNode.setText(" ");
				fakeNode.insertAfter(node);
				range.selectNodeContents(fakeNode);
			}
			var cursorNode = range.getNextNode();
			range.selectNodeContents(cursorNode);
			selection.selectRanges(ranges);
		},

		/**
		 * Hide menu on mouse down click in not list area.
		 * @protected
		 * @param {Object} e Event config.
		 */
		onMouseDownCollapse: function(e) {
			var isInWrap = e.within(this.getWrapEl());
			var listView = this.listView;
			var isInListView = (listView === null) || e.within(listView.getWrapEl());
			if (!isInWrap && !isInListView) {
				listView.hide();
				this.stopTracking();
			}
		},


		/**
		 * Sets list offset.
		 * @protected
		 */
		setListAlignOffset: function() {
			var pos = {
				left: 0,
				top: 0
			};
			var editor = this.editor;
			var selection = editor.getSelection();
			var nativeSelection = selection.getNative();
			var range = nativeSelection.getRangeAt(0);
			var subRange = range.cloneRange();
			var subRangeContainer = subRange.startContainer;
			var offset = subRange.startOffset;
			var defaultOffsetTop = editor.container.getClientRect().height;
			if (offset) {
				subRange.setStart(subRangeContainer, offset - 1);
				if (Ext.isEmpty(subRange)) {
					this.listOffset = [pos.left, pos.top];
					return;
				}
				if (subRange.endOffset === 0) {
					pos.left = subRangeContainer.offsetLeft;
					pos.top = subRangeContainer.offsetTop;
				} else {
					var node = editor.element.$;
					var nodeLeft = (node) ? node.offsetLeft : 0;
					var nodeTop = (node) ? node.offsetTop : 0;
					var rect = subRange.getBoundingClientRect();
					pos.left = rect.left - nodeLeft + rect.width;
					pos.top = rect.top - nodeTop + rect.height;
				}
				var editorContainer = editor.container;
				if (editorContainer) {
					pos.top -= editorContainer.getClientRect().height;
				}
			} else {
				pos.left = subRangeContainer.offsetLeft;
				pos.top = subRangeContainer.offsetTop + subRangeContainer.offsetHeight - defaultOffsetTop;
			}
			this.listOffset = [pos.left, pos.top];
		},

		/**
		 * Sets placeholder value.
		 * @param {String} value Placeholder value.
		 */
		setPlaceholder: function(value) {
			if (this.placeholder === value) {
				return;
			}
			this.placeholder = value;
		},

		/**
		 * @inheritdoc Terrasoft.controls.HtmlEdit#setStyle
		 * @override
		 */
		setStyle: function() {
			this.callParent(arguments);
		},

		/**
		 * Updates control value from editr value.
		 * @protected
		 */
		updateValue: function(ignoreFocused) {
			if (this.plainTextMode || (!this.focused && !ignoreFocused)) {
				return;
			}
			this.setValue(this.getEditorValue());
		},

		/**
		 * @inheritdoc Terrasoft.controls.HtmlEdit#onFontFamilyChange
		 * @override
		 */
		onFontFamilyChange: function(fontFamilyValue) {
			if (fontFamilyValue && this.enabled) {
				this.callParent(arguments);
				this.updateValue(true);
			}
		},

		/**
		 * @inheritdoc Terrasoft.controls.HtmlEdit#onFontSizeChange
		 * @override
		 */
		onFontSizeChange: function(fontSizeValue) {
			if (fontSizeValue && this.enabled) {
				this.callParent(arguments);
				this.updateValue(true);
			}
		}

		//endregion

	});
});


