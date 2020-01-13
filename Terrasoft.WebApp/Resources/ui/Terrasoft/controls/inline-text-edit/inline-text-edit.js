/**
 * Class for InlineTextEdit.
 */
Ext.define("Terrasoft.controls.InlineTextEdit", {
	extend: "Terrasoft.controls.BaseEdit",
	alternateClassName: "Terrasoft.InlineTextEdit",

	mixins: {
		sanitizeHtml: "Terrasoft.SanitizeHtml"
	},

	//region Properties: Protected

	/**
	 * CKEditor instance.
	 * @protected
	 * @type {CKEDITOR.editor}
	 */
	editor: null,

	/**
	 * Css-class for control when validation is failed.
	 * @protected
	 * @type {String}
	 */
	errorClass: "inline-text-edit-error",

	/**
	 * Name of css-class for placeholder.
	 * @protected
	 * @type {String}
	 */
	placeholderClassName: "inline-text-edit-placeholder",

	/**
	 * @inheritdoc Terrasoft.controls.component#styles
	 * @override
	 */
	styles: {
		wrapStyles: null,
		elStyles: null,
		validationStyle: null
	},

	/**
	 * @inheritdoc Terrasoft.controls.component#classes
	 * @override
	 */
	classes: {
		wrapClasses: ["inline-text-edit-wrap"],
		elClasses: ["inline-text-edit-el"],
		validationClasses: ["inline-text-edit-validation"]
	},

	/**
	 * Template of control.
	 * @protected
	 * @override
	 * @type {String[]}
	 */
	tpl: [
		"<div id=\"{id}-inline-text-edit-wrap\" style=\"{wrapStyles}\" class=\"{wrapClasses}\"" +
		" data-placeholder=\"{placeholder}\">",
		"<div tabindex=\"0\" id=\"{id}-inline-text-edit-el\" style=\"{elStyles}\" class=\"{elClasses}\" " +
		"contenteditable = \"{canEdit}\">",
		"{value}",
		"</div>",
		"<span id=\"{id}-validation\" class=\"{validationClasses}\" style=\"{validationStyle}\">",
		"{validationText}",
		"</span>",
		"</div>"
	],

	/**
	 * Selected text.
	 * @protected
	 * @override
	 * @type {String[]}
	 */
	selectedText: null,

	/**
	 * CKEditor config that enables all features (data will not be filtered).
	 * @protected
	 * @type {Object}
	 */
	ckeditorDefaultConfig: {
		allowedContent: true,
		keystrokes: [
			[0x110000 + 75, "link"] // CTRL + K
		]
	},

	/**
	 * Link color button instance.
	 * @protected
	 * @type {Terrasoft.ColorButton}
	 */
	colorBtn: null,

	/**
	 * Link styles text field dom identifier.
	 * @protected
	 * @type {String}
	 */
	styleEditDomId: null,

	/**
	 * Color css style regular expression.
	 * @protected
	 * @type {RegExp}
	 */
	colorRegExp: null,

	/**
	 * Editor has full screen mode flag.
	 * @protected
	 * @type {Boolean}
	 */
	hasFullScreen: false,

	/**
	 * Editor has table edit options flag.
	 * @protected
	 * @type {Boolean}
	 */
	hasTableEdit: false,

	/**
	 * Editor has macros button.
	 * @protected
	 * @type {Boolean}
	 */
	hasMacrosButton: true,

	/**
	 * Sign that editor has email template link button.
	 * @protected
	 * @type {Boolean}
	 */
	showEmailTemplateLinkButton: false,

	/**
	 * Indicates whether to cancel enter key pressing.
	 * @protected
	 * @type {Boolean}
	 */
	preventEnterPress: false,

	//endregion

	//region Methods: Private

	/**
	 * Sets ckeditor readonly mode depending on enabled property value.
	 * @private
	 */
	_initReadOnlyMode: function() {
		if (!this.editor.readOnly !== this.enabled) {
			this.setEnabled(this.enabled);
		}
	},

	/**
	 * Prepares link edit popup.
	 * @private
	 * @param {object} event Dialog definition event.
	 */
	_onDialogDefinition: function(event) {
		var dialogName = event.data.name;
		var dialogDefinition = event.data.definition;
		if (dialogName === "link") {
			var scope = this;
			dialogDefinition.onFocus = function() {
				var colorEdit = this.getContentElement("info", "linkType");
				var wrapEl = Ext.get(colorEdit.domId);
				scope.createColorButton(wrapEl, this);
			};
		}
	},

	/**
	 * Returns styles edit instance.
	 * @private
	 * @param {Object} [dialogContext] Dialog context.
	 * @return {Object} Styles edit instance.
	 */
	_getStylesEdit: function(dialogContext) {
		if (!Ext.isEmpty(dialogContext)) {
			var styleEdit = dialogContext.getContentElement("advanced", "advStyles");
			this.styleEditDomId = styleEdit.domId;
		}
		var wrapEl = Ext.get(this.styleEditDomId);
		var input = wrapEl.select("input").first();
		return input;
	},

	/**
	 * @private
	 */
	_getSelectedTextColor: function() {
		var editor = this.editor;
		var selection = editor.getSelection();
		var block = selection && selection.getStartElement();
		var path = editor.elementPath(block);
		if (!path) {
			return;
		}
		var color = "";
		var range = selection && selection.getRanges()[0];
		if (range) {
			var walker = new CKEDITOR.dom.walker(range);
			var element = range.collapsed ? range.startContainer : walker.next();
			while (element && !color) {
				if (element.type !== CKEDITOR.NODE_ELEMENT) {
					element = element.getParent();
				}
				color = CKEDITOR.tools.convertRgbToHex(element.getComputedStyle("color") || "");
				element = walker.next();
			}
		}
		return color;
	},

	/**
	 * @private
	 */
	_preventEnterButtonPressed: function(event) {
		var enterKeyCode = 13;
		var eventKeyCode = event.data.keyCode;
		if (eventKeyCode === enterKeyCode || eventKeyCode === CKEDITOR.SHIFT + enterKeyCode) {
			event.cancel();
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseEdit#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.colorRegExp = new RegExp(/color(\s?):(\s?)#(?:[0-9a-fA-F]{2}){2,4}/);
		this.addEvents(
			/**
			 * @event macrobuttonclicked
			 * Calls when macros button is clicked.
			 */
			"macrobuttonclicked",
			/**
			 * @event emailtemplatelinkclicked
			 * Calls when email template link button is clicked.
			 */
			"emailtemplatelinkclicked",
			/**
			 * @event selectedtextchanged
			 * Calls when selected text is changed.
			 */
			"selectedtextchanged",
			/**
			 * @event selectedtextchanged
			 * @deprecated Deprecated event because event name contains Cyrillic character.
			 * Calls when selected text is changed.
			 */
			"selectedtextсhanged",
			/**
			 * @event instanceReady
			 * Calls when Ckeditor is ready.
			 */
			"editorInstanceReady"
		);
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#onEnterKeyPressed
	 * @override
	 */
	onEnterKeyPressed: Terrasoft.emptyFn,

	/**
	 * Handles selected text change.
	 * @protected
	 */
	onSelectionChange: function() {
		var selection = this.editor.getSelection();
		if (Ext.isEmpty(selection)) {
			return;
		}
		var selectedText = selection.getSelectedText();
		this.updateSelectedText(selectedText);
	},

	/**
	 * Ckeditor contentDom event handler. Subscribes editor click and keyup events.
	 * @protected
	 */
	onContentDom: function() {
		var el = this.el;
		el.on("click", this.onSelectionChange, this);
		el.on("keyup", this.onSelectionChange, this);
	},

	/**
	 * Handles macros button click.
	 * @protected
	 * @param {Object} event Event info object.
	 */
	onMacroButtonClicked: function(event) {
		this.fireEvent("macrobuttonclicked", this, event.data);
	},

	/**
	 * Handles email template link button click.
	 * @protected
	 * @param {Object} event Event info object.
	 */
	onEmailTemplateLinkClicked: function(event) {
		this.fireEvent("emailtemplatelinkclicked", this, event.data);
	},

	/**
	 * Updates selected text.
	 * @protected
	 * @param {String} selectedText Selected text.
	 */
	updateSelectedText: function(selectedText) {
		if (selectedText !== this.selectedText) {
			this.selectedText = selectedText;
			this.fireEvent("selectedtextсhanged", this.selectedText, this);
			this.fireEvent("selectedtextchanged", this.selectedText, this);
		}
	},

	/**
	 * Ckeditor instanceReady event handler.
	 * @protected
	 */
	onInstanceReady: function() {
		this._initReadOnlyMode();
		this.fireEvent("editorInstanceReady", this);
	},

	/**
	 * Returns current link color value.
	 * @protected
	 * @param {Object} dialogContext Link dialog popup context.
	 * @return {String} Current link color value.
	 */
	getLinkColor: function(dialogContext) {
		var input = this._getStylesEdit(dialogContext);
		var matches = input.dom.value.match(this.colorRegExp);
		var defColor = "#0000EE";
		if (matches && matches.length > 0) {
			var rawColor = matches[0];
			defColor = rawColor.replace(new RegExp(/color(\s?):(\s?)/), "");
		}
		return defColor;
	},

	/**
	 * Creates color button element.
	 * @protected
	 * @param {Ext.Element} renderTo Render to container.
	 * @param {Object} dialogContext Link dialog popup context.
	 */
	createColorButton: function(renderTo, dialogContext) {
		if (this.colorBtn) {
			this.colorBtn.destroy();
		}
		var defaultColor = this.getLinkColor(dialogContext);
		var container = Ext.create("Terrasoft.Container", {
			classes: {
				wrapClassName: ["link-color-button-wrap"]
			},
			items: []
		});
		var colorBtn = Ext.create("Terrasoft.ColorButton", {
			markerValue: "LinkColorButton",
			menuItemClassName: Terrasoft.MenuItemType.COLOR_PICKER,
			defaultValue: defaultColor
		});
		colorBtn.on("change", this.onColorSelected, this);
		var caption = Terrasoft.Resources.ExternalLibraries.CKEditor.ColorButtonCaption || "Link color";
		container.add(Ext.create("Terrasoft.Label", {
			markerValue: "LinkColorLabel",
			caption: caption
		}));
		container.add(colorBtn);
		this.colorBtn = container;
		container.render(renderTo);
	},

	/**
	 * Color button color selected event handler.
	 * @protected
	 * @param {String} selectedColor Selected color.
	 */
	onColorSelected: function(selectedColor) {
		var input = this._getStylesEdit();
		var colorTpl = "{0}color: {1}{2}";
		var newValue = input.dom.value;
		if (this.colorRegExp.test(newValue)) {
			newValue = newValue.replace(this.colorRegExp, Ext.String.format(colorTpl, "", selectedColor, ""));
		} else if (Ext.isEmpty(newValue)) {
			newValue = Ext.String.format(colorTpl, "", selectedColor, ";");
		} else {
			newValue = newValue.replace(new RegExp(";$"), "") + Ext.String.format(colorTpl, ";", selectedColor, ";");
		}
		input.dom.value = newValue;
	},

	/**
	 * Initializes an instance of CKEditor.
	 * @protected
	 */
	initInlineEditor: function() {
		if (this.el) {
			let ckeditorDefaultConfig = this.ckeditorDefaultConfig;
			ckeditorDefaultConfig.showEmailTemplateLinkButton = this.showEmailTemplateLinkButton;
			if (this.showEmailTemplateLinkButton) {
				this.ckeditorDefaultConfig.removeButtons += ",Link";
			}
			var editor = this.editor = CKEDITOR.inline(this.el.id, ckeditorDefaultConfig);
			this.subscribeEditorEvents();
			this.initEditor();
			this.initExtraPluginsToolbar();
		}
	},

	/**
	 * Subscribes current instance on editor events.
	 * @protected
	 */
	subscribeEditorEvents: function() {
		this.editor.on("contentDom", this.onContentDom, this);
		this.editor.on("instanceReady", this.onInstanceReady, this);
		this.editor.on("key", this.onKey, this);
		CKEDITOR.on("dialogDefinition", this._onDialogDefinition, this);
	},

	/**
	 * Init extra plugin toolbar items.
	 * @protected
	 */
	initExtraPluginsToolbar: function() {
		if (this.showEmailTemplateLinkButton) {
			this.createButton("bpmonlineemailtemplatelink", this.onEmailTemplateLinkClicked);
		}
		if (this.hasMacrosButton) {
			this.createButton("bpmonlinemacros", this.onMacroButtonClicked);
		}
		if (this.hasTableEdit) {
			this.createButton("bpmonlinetable", Terrasoft.emptyFn);
		}
		if (this.hasFullScreen) {
			this.createButton("maximaze", this.toggleMaximize);
		}
		this.editor.on("BpmonlineTextColorClick", this.onBpmonlineTextColorClick, this);
	},

	/**
	 * Handler for BpmonlineTextColorClick event.
	 * @protected
	 * @param {Object} event Event info object.
	 */
	onBpmonlineTextColorClick: function(event) {
		var menu = new Terrasoft.Menu({
			items: [{
				className: Terrasoft.MenuItemType.COLOR_PICKER,
				defaultValue: this._getSelectedTextColor() || "#444444"
			}]
		});
		var colorPicker = menu.items.first();
		colorPicker.on("colorSelected", this.onTextColorSelected, this);
		const menuItemId = event.data;
		var textColorMenuItem = Ext.get(menuItemId);
		menu.show(null, null, textColorMenuItem);
	},

	/**
	 * Handler for colorSelected event.
	 * @param {Object} control Source control.
	 * @param {String} color New text color.
	 */
	onTextColorSelected: function(control, color) {
		Terrasoft.defer(function() {
			var editor = this.editor;
			editor.fire("saveSnapshot");
			editor.removeStyle(new CKEDITOR.style(editor.config.colorButton_foreStyle, {color: "inherit"}));
			if (color) {
				var colorStyle = editor.config.colorButton_foreStyle;
				colorStyle.childRule = (element) => {
					return !(element.is("a") ||
						element.getElementsByTag("a").count()) ||
						(element.getAttribute("contentEditable") === "false") ||
						element.getAttribute("data-nostyle");
				};
				editor.applyStyle(new CKEDITOR.style(colorStyle, {color: color}));
			}
			editor.fire("saveSnapshot");
		}, this);
	},

	/**
	 * Returns fullscreen container element.
	 * @protected
	 * @return {Ext.Element} fullscreen contatiner element.
	 */
	getFullscreenContainer: function() {
		var wrapEl = this.getWrapEl();
		return wrapEl.parent().parent();
	},

	/**
	 * Changes editor fulscreen state to opposite.
	 * @protected
	 */
	toggleMaximize: function() {
		var container = this.getFullscreenContainer();
			container.toggleCls("maximized");
		var manager = this.editor.focusManager;
		manager.blur();
		manager.focus();
		this.editor.fire("toggle_maximized");
	},

		/**
		 * Creates additional button for ckeditor.
		 * @protected
		 * @param {String} pluginName Ckeditor plugin name.
		 * @param {Function} onClick New button click event handler.
		 * @param {Array} [items=null] Ckeditor items.
		 */
		createButton: function(pluginName, onClick, items) {
			var clickEvent = pluginName + "click";
			items = items || [pluginName];
			this.editor.on(clickEvent, onClick, this);
			var config = this.editor.config;
			config.toolbar.push({
				name: pluginName,
				items: items
			});
			config.toolbarGroups.push({
				name: pluginName
			});
			config.extraPlugins += "," + pluginName;
	},

	/**
	 * Init ckeditor.
	 * @private
	 */
	initEditor: function() {
		var editorConfig = this.editor.config;
		editorConfig.toolbar = [];
		editorConfig.toolbarGroups = [];
		editorConfig.extraPlugins = "";
	},

	/**
	 * Destroys an instance of CKEditor.
	 * @protected
	 */
	destroyInlineEditor: function() {
		if (this.editor) {
			if (this.editor.loaded) {
				this.editor.destroy();
			} else {
				var editor = CKEDITOR.instances[this.editor.name];
				editor.on("loaded", function() {
					this.destroy();
				}, editor);
			}
			if (this.colorBtn) {
				this.colorBtn.destroy();
			}
			this.editor = null;
		}
	},

	/**
	 * Handles 'key' event of editor.
	 * @param event Event data.
	 */
	onKey: function(event) {
		if (this.preventEnterPress) {
			this._preventEnterButtonPressed(event);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		var placeholder = Terrasoft.encodeHtml(this.placeholder);
		Ext.apply(tplData, {
			canEdit: !this.readonly,
			value: this.value,
			placeholder: placeholder
		});
		if (Ext.isEmpty(this.value)) {
			tplData.wrapClasses = [this.placeholderClassName];
		}
		if (!this.validationInfo.isValid) {
			tplData.wrapClasses.push(this.errorClass);
		}
		return tplData;
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#combineClasses
	 * @override
	 */
	combineClasses: function() {
		var result = this.callParent(arguments);
		return Ext.apply(result, this.classes);
	},
	/**
	 * @inheritdoc Terrasoft.BaseEdit#combineSelectors
	 * @override
	 */
	combineSelectors: function() {
		return {
			wrapEl: "#" + this.id + "-inline-text-edit-wrap",
			el: "#" + this.id + "-inline-text-edit-el",
			validationEl: "#" + this.id + "-validation"
		};
	},

	/**
	 * Initializes a subscription to the DOM events.
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		if (this.el) {
			this.el.on({
				"focus": {
					fn: this.onFocus,
					scope: this
				},
				"blur": {
					fn: this.onBlur,
					scope: this
				}
			});
		}
		var validationInfo = this.validationInfo;
		if (!validationInfo.isValid) {
			this.showValidationMessage(validationInfo.invalidMessage);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#clearDomListeners
	 * @override
	 */
	clearDomListeners: function() {
		this.callParent(arguments);
		if (this.el) {
			this.el.un("click", this.onSelectionChange, this);
			this.el.un("keyup", this.onSelectionChange, this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#getBindConfig
	 * @protected
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var sanitizeHTMLBindConfig = this.getSanitizeHtmlBindConfig();
		Ext.apply(bindConfig, {
			selectedText: {
				changeEvent: "selectedtextchanged",
				deprecatedChangeEvent: "selectedtextсhanged",
				changeMethod: "setSelectedText"
			}
		}, sanitizeHTMLBindConfig);
		return bindConfig;
	},

	/**
	 * Adds CSS class for control depending on isValid flag. If isValid is set to true, class is added,
	 * otherwise class is removed.
	 * @protected
	 */
	setMarkOut: function() {
		if (this.rendered && this.validationEl) {
			var validationMessage = "";
			if (!this.validationInfo.isValid) {
				this.wrapEl.addCls(this.errorClass);
				validationMessage = this.validationInfo.invalidMessage;
				this.validationEl.setStyle("width", "");
				var wrapWidth = this.wrapEl.getWidth();
				var validationElWidth = this.validationEl.getWidth();
				if (validationElWidth > wrapWidth) {
					this.validationEl.setWidth(wrapWidth);
				}
			} else {
				this.wrapEl.removeCls(this.errorClass);
			}
			this.showValidationMessage(validationMessage);
			this.validationEl.setVisible(!this.validationInfo.isValid);
		}
	},

	/**
	 * Updates control's value.
	 * @protected
	 * @param {String} value Value of control.
	 */
	updateValue: function(value) {
		var result = false;
		if (this.value !== value) {
			this.value = value;
			this.fireEvent("change", this);
			result = true;
		}
		return result;
	},

	/**
	 * Checks if editor content is empty.
	 * @protected
	 * @return {Boolean} If editor content is empty returns true, otherwise false.
	 */
	isEditorDataEmpty: function() {
		var editorData = this.editor.getData();
		return Ext.isEmpty(editorData);
	},

	/**
	 * Sets placeholder visibility.
	 * @protected
	 * @param {Boolean } visible Indicates whether placeholder is visible.
	 */
	setPlaceholderVisible: function(visible) {
		if (visible) {
			this.wrapEl.addCls(this.placeholderClassName);
		} else {
			this.wrapEl.removeCls(this.placeholderClassName);
		}
	},

	/**
	 * Handles focus control event.
	 * @protected
	 */
	onFocus: function() {
		if (this.rendered && !this.focused) {
			if (this.isEditorDataEmpty()) {
				this.setPlaceholderVisible(false);
			}
			this.focused = true;
		}
	},

	/**
	 * Handles blur control event.
	 * When handles blur event updates control's value and sets placeholder visibility.
	 * @protected
	 */
	onBlur: function() {
		if (this.rendered) {
			this.focused = false;
			if (this.isEditorDataEmpty()) {
				this.setPlaceholderVisible(true);
			}
			var editorData = this.editor.getData();
			this.updateValue(editorData);
			this.fireEvent("blur", this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.destroyInlineEditor();
		this.initInlineEditor();
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.destroyInlineEditor();
		this.initInlineEditor();
	},

	/**
	 * @inheritdoc Terrasoft.Component#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.destroyInlineEditor();
		this.callParent(arguments);
	},

	//endregion

	//region Methods: Public

	/**
	 * Sets control's value.
	 * If control is rendered calls reRender.
	 * @param {String} value
	 */
	setValue: function(value) {
		if (this.value !== value) {
			if (this.editor) {
				const editorValue = this.getSanitizedValue(value);
				this.editor.setData(editorValue);
			}
			this.updateValue(value);
		}
	},

	/**
	 * Sets readonly-mode.
	 * @param {Boolean} readonly If readonly is set to true, turns on readonly-mode, otherwise turns it off.
	 */
	setReadonly: function(readonly) {
		if (this.readonly !== readonly) {
			this.readonly = readonly;
			if (this.rendered) {
				this.reRender();
			}
		}
	},

	/**
	 * Sets placeholder's value.
	 * @param {String} placeholder Text that is visible when editor content is empty.
	 */
	setPlaceholder: function(placeholder) {
		if (this.placeholder !== placeholder) {
			this.placeholder = placeholder;
			if (this.rendered) {
				this.reRender();
			}
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
	 * Sets value of selected text.
	 * @param {String} value Selected text.
	 */
	setSelectedText: function(value) {
		if (value && (value !== this.selectedText) && this.editor) {
			const htmlNode = CKEDITOR.dom.element.createFromHtml(value);
			if (Ext.isFunction(htmlNode.getChildCount) && htmlNode.getChildCount() > 0) {
				this.setHtmlText(value);
			} else {
				this.setText(value);
			}
		}
	},

	/**
	 * Sets value of plain text.
	 * @param {String} value Plain text.
	 */
	setText: function(value) {
		const editor = this.editor;
		const selection = editor.getSelection();
		const selectedText = selection && selection.getSelectedText();
		if (!Ext.isEmpty(selectedText)) {
			var ranges = selection.getRanges();
			if (!Ext.isEmpty(ranges) && ranges.length > 0) {
				var range = ranges[0];
				if (!Ext.isEmpty(range)) {
					range.deleteContents();
				}
			}
		}
		this.insertContent(value);
		this.updateSelectedText(value);
		const editorData = editor.getData();
		this.updateValue(editorData);
		var isDataEmpty = this.isEditorDataEmpty();
		this.setPlaceholderVisible(isDataEmpty);
	},

	/**
	 * Sets value of html text.
	 * @param {String} value Html text.
	 */
	setHtmlText: function(value) {
		const editor = this.editor;
		let selection = editor.getSelection();
		let ranges = selection.getRanges(true);
		if (ranges.length === 1) {
			const linkNode = CKEDITOR.dom.element.createFromHtml(value);
			let range = ranges[0];
			if (!range.collapsed) {
				range.deleteContents();
			}
			range.insertNode(linkNode);
			range.selectNodeContents(linkNode);
			selection.selectRanges(ranges);
		}
		editor.updateElement();
		editor.focus();
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#setEnabled
	 * @override
	 */
	setEnabled: function(value) {
		this.callParent(arguments);
		var editor = this.editor;
		if (editor && editor.instanceReady) {
			editor.setReadOnly(!value);
		}
	}

	//endregion

});
