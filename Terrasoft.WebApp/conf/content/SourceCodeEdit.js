Terrasoft.configuration.Structures["SourceCodeEdit"] = {innerHierarchyStack: ["SourceCodeEdit"]};
/* global ace:false */
define("SourceCodeEdit", ["ext-base", "SourceCodeEditEnums", "AceEdit", "css!SourceCodeEdit"
], function(Ext, sourceCodeEditEnums) {
	/**
	 * @class Terrasoft.configuration.SourceCodeEdit
	 * Class for editing source codes.
	 */
	Ext.define("Terrasoft.configuration.SourceCodeEdit", {
		extend: "Terrasoft.BaseEdit",
		alternateClassName: "Terrasoft.SourceCodeEdit",

		/**
		 * Flag that indicates whether ace editor is initialized.
		 * @type {Boolean}
		 * @private
		 */
		isAceInitialized: false,

		/**
		 * Flag that indicates whether whitespaces in source code editor is visible.
		 * @type {Boolean}
		 */
		showWhitespaces: false,

		/**
		 * Flag that controls IntelliSense.
		 */
		enableLiveAutocompletion: true,

		/**
		 * Ace editor mode.
		 * @type {String}
		 * @private
		 */
		editorMode: "ace/mode/javascript",

		/**
		 * Language for syntax highlighting.
		 * @type {String}
		 */
		language: sourceCodeEditEnums.Language.JAVASCRIPT,

		/**
		 * worker default value
		 */
		useWorker: true,

		/**
		 * Ace editor theme.
		 * @type {String}
		 */
		theme: sourceCodeEditEnums.Theme.CRIMSON_EDITOR,

		/**
		 * Ace editor instance.
		 * @type {Object}
		 * @private
		 */
		aceEdit: null,

		/**
		 * Flag that indicates whether line numbers in gutter is visible.
		 * @type {Boolean}
		 */
		showLineNumbers: true,

		/**
		 * Flag that indicates whether gutter is visible.
		 * @type {Boolean}
		 */
		showGutter: true,

		/**
		 * Flag that indicates whether active line is highlighted.
		 * @type {Boolean}
		 */
		highlightActiveLine: true,

		/**
		 * Flag that indicates whether active line in gutter is highlighted.
		 * @type {Boolean}
		 */
		highlightGutterLine: true,

		/**
		 * Shows vertical line in specified column.
		 * @type {Number}
		 */
		printMargin: 120,

		/**
		 * Size of source code edit wrap element.
		 * @type {Object}
		 * @private
		 */
		wrapElSize: null,

		/**
		 * Timer interval to check source code edit wrap element resize.
		 * @type {Number}
		 */
		checkResizeInterval: 500,

		/**
		 * Interval id of created timer to check source code edit wrap element resize.
		 * @type {Number}
		 * @private
		 */
		checkResizeIntervalId: null,

		/**
		 * @inheritdoc Terrasoft.Component#tpl
		 * @protected
		 * @overridden
		 */
		tpl: [
			"<div id=\"{id}-wrap\" class=\"{wrapClass}\" style=\"{wrapStyle}\">",
			"<div id=\"{id}-edit-el\" class=\"{editInputClass}\" style=\"{inputStyle}\">",
			"</div>",
			"<span id=\"{id}-validation\" class=\"{validationClass}\" style=\"{validationStyle}\">" +
			"{validationText}</span>",
			"</div>"
		],

		/**
		 * @inheritdoc Terrasoft.Component#getTplData
		 * @protected
		 * @overridden
		 */
		getTplData: function() {
			var tplData = this.callParent(arguments);
			this.selectors = {
				wrapEl: "#" + this.id + "-wrap",
				el: "#" + this.id + "-edit-el",
				validationEl: "#" + this.id + "-validation"
			};
			return tplData;
		},

		/**
		 * @inheritdoc Terrasoft.BaseEdit#combineClasses
		 * @protected
		 * @overridden
		 */
		combineClasses: function() {
			var classes = this.callParent(arguments);
			classes.wrapClass.push("source-code-edit");
			classes.editInputClass.push("ace-edit");
			return classes;
		},

		/**
		 * @inheritdoc Terrasoft.BaseEdit#setShowValueAsLink
		 * Hides base implementation.
		 * @protected
		 * @overridden
		 */
		setShowValueAsLink: Terrasoft.emptyFn,

		/**
		 * @inheritdoc Terrasoft.BaseEdit#setLinkValue
		 * Hides base implementation.
		 * @protected
		 * @overridden
		 */
		setLinkValue: Terrasoft.emptyFn,

		/**
		 * @inheritdoc Terrasoft.BaseEdit#setPlaceholder
		 * Hides base implementation.
		 * @protected
		 * @overridden
		 */
		setPlaceholder: Terrasoft.emptyFn,

		/**
		 * @inheritdoc Terrasoft.Component#onAfterRender
		 * Initialize ace editor.
		 * @protected
		 * @overridden
		 */
		onAfterRender: function() {
			this.callParent(arguments);
			this.initAceEdit(ace);
		},

		/**
		 * @inheritdoc Terrasoft.Component#onAfterReRender
		 * Initialize ace editor.
		 * @protected
		 * @overridden
		 */
		onAfterReRender: function() {
			this.callParent(arguments);
			this.initAceEdit(ace);
		},

		/**
		 * @inheritdoc Terrasoft.Component#init
		 * @override
		 */
		init: function() {
			this.callParent(arguments);
			this.addEvents(
				"expandEditor"
			);
		},

		/**
		 * Initialize ace editor.
		 * @param {Object} ace Reference to ace global object.
		 * @private
		 */
		initAceEdit: function(ace) {
			var aceEdit = this.aceEdit = ace.edit(this.id + "-edit-el");
			aceEdit.$blockScrolling = Infinity;
			var settingsMenu = ace.require("ace/ext/settings_menu");
			settingsMenu.init(aceEdit);
			var aceEditSession = aceEdit.getSession();
			aceEditSession.$useWorker = this.useWorker;
			aceEdit.setOptions({
				theme: this.getThemePath(this.theme),
				mode: this.getEditorMode(this.language),
				enableBasicAutocompletion: true,
				enableSnippets: true,
				enableLiveAutocompletion: this.enableLiveAutocompletion,
				printMargin: this.printMargin,
				useSoftTabs: false,
				showInvisibles: this.showWhitespaces,
				readOnly: this.readonly,
				showLineNumbers: this.showLineNumbers,
				showGutter: this.showGutter,
				highlightActiveLine: this.highlightActiveLine,
				highlightGutterLine: this.highlightGutterLine
			});
			aceEditSession.setValue(this.value || "");
			this.intiAceEditEvents();
			this.isAceInitialized = true;
			this.setEnabled(this.enabled);
			var wrapEl = this.getWrapEl();
			this.wrapElSize = wrapEl.getSize();
			this.createResizeTimer();
			this._initFocused();
			this.fireEvent("aceinitialized");
		},

		/**
		 * Creates timer to check source code edit wrap element resize. If timer already created
		 * (check checkResizeIntervalId property), new timer doesn't created. Every timer tick,
		 * calls {@link #checkResize} method to check wrap element resize.
		 */
		createResizeTimer: function() {
			if (!this.checkResizeIntervalId) {
				this.checkResizeIntervalId = setInterval(this.checkResize.bind(this), this.checkResizeInterval);
			}
		},

		/**
		 * Checks for source code edit wrap element resize. Method called on every timer tick
		 * (see {@link #createResizeTimer}). On ace editor initialization wrap element size cached on
		 * {@link #wrapElSize} property. If wrap element size changed, calls resize method on ace editor instance and
		 * scrolls view to active row.
		 */
		checkResize: function() {
			if (!this.isAceInitialized) {
				return;
			}
			var wrapEl = this.getWrapEl();
			var newSize = wrapEl.getSize();
			var wrapElSize = this.wrapElSize;
			if (wrapElSize.width !== newSize.width || wrapElSize.height !== newSize.height) {
				this.wrapElSize = newSize;
				var aceEdit = this.aceEdit;
				aceEdit.resize(true);
				var cursorPosition = aceEdit.getCursorPosition();
				aceEdit.scrollToRow(cursorPosition.row);
			}
		},

		/**
		 * Subscribes on ace editor events.
		 * @protected
		 * @virtual
		 */
		intiAceEditEvents: function() {
			var aceEdit = this.aceEdit;
			aceEdit.on("blur", this.onAceBlur.bind(this));
			aceEdit.on("focus", this.onAceFocus.bind(this));
			aceEdit.on("changeSelection", this.onAceSelectionChange.bind(this));
			aceEdit.commands.addCommand({
				name: "expandEditor",
				bindKey: {win: "F2", mac: "F2"},
				exec: this.onExpandEditor.bind(this)
			});
		},

		/**
		 * Event handler for expand editor by press F2 key.
		 */
		onExpandEditor: function() {
			this.fireEvent("expandEditor", this);
		},

		/**
		 * Ace editor blur event handler. Calls base blur event handler.
		 * @private
		 */
		onAceBlur: function() {
			this.onBlur();
		},

		/**
		 * Ace editor focus event handler. Calls base focus event handler.
		 * @private
		 */
		onAceFocus: function() {
			this.onFocus();
		},

		/**
		 * @private
		 */
		_initFocused: function() {
			if (this.aceEdit) {
				if (this.focused) {
					this.aceEdit.focus();
				} else {
					this.aceEdit.blur();
				}
			}
		},

		/**
		 * @inheritdoc Terrasoft.Component#getBindConfig
		 * Adds binding config for 'language', 'searchVisible' and 'showWhitespaces' properties. Note, that
		 * SourceCodeEditor hasn't searchVisible property. Is virtual property for search box manipulation.
		 * @protected
		 * @overridden
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			Ext.apply(bindConfig, {
				language: {
					changeMethod: "setLanguage"
				},
				searchVisible: {
					changeMethod: "setSearchVisible"
				},
				showWhitespaces: {
					changeMethod: "setShowWhitespaces"
				},
				theme: {
					changeMethod: "setTheme"
				}
			});
			return bindConfig;
		},

		/**
		 * Shows or hides ace editor search box. If ace editor isn't initialized, invocation has no effect.
		 * @param {Boolean} searchVisible Search box state.
		 */
		setSearchVisible: function(searchVisible) {
			if (!this.isAceInitialized) {
				return;
			}
			var aceEdit = this.aceEdit;
			if (searchVisible) {
				aceEdit.execCommand("find");
			}
			if (!aceEdit.searchBox) {
				return;
			}
			if (searchVisible) {
				aceEdit.searchBox.searchInput.focus();
			} else {
				aceEdit.searchBox.hide();
			}
		},

		/**
		 * Shows or hides whitespace characters in ace editor. If ace editor isn't initialized,
		 * invocation has no effect.
		 * @param {Boolean} whitespacesVisible Whitespaces visibility.
		 * @obsolete
		 */
		setWhitespacesVisible: function(whitespacesVisible) {
			this.log(this.Ext.String.format(this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"setWhitespacesVisible", "setShowWhitespaces"), Terrasoft.LogMessageType.WARNING);
			this.setShowWhitespaces(whitespacesVisible);
		},

		/**
		 * Shows or hides whitespace characters in ace editor. If ace editor isn't initialized,
		 * invocation has no effect.
		 * @param {Boolean} showWhitespaces Whitespaces visibility.
		 */
		setShowWhitespaces: function(showWhitespaces) {
			this.showWhitespaces = showWhitespaces;
			if (this.isAceInitialized) {
				this.aceEdit.setShowInvisibles(showWhitespaces);
			}
		},

		/**
		 * Ace editor selection chane event handler. If SourceCodeEditor is disabled({@link #enabled} sets to false),
		 * reset selection.
		 * @protected
		 * @virtual
		 */
		onAceSelectionChange: function() {
			if (this.enabled === false) {
				this.aceEdit.selection.setSelectionRange({
					start: {
						row: 0,
						column: 0
					},
					end: {
						row: 0,
						column: 0
					}
				});
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseEdit#setDomValue
		 * @protected
		 * @overridden
		 */
		setDomValue: function(value) {
			if (this.isAceInitialized) {
				var aceEditSession = this.aceEdit.getSession();
				aceEditSession.setValue(value);
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseEdit#setDomValue
		 * @protected
		 * @overridden
		 */
		getTypedValue: function() {
			if (this.isAceInitialized) {
				var aceEditSession = this.aceEdit.getSession();
				return aceEditSession.getValue();
			} else {
				return null;
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseEdit#setReadonly
		 * @protected
		 * @overridden
		 */
		setReadonly: function(readonly) {
			this.readonly = readonly;
			if (!this.isAceInitialized) {
				return;
			}
			var wrapEl = this.getWrapEl();
			if (readonly) {
				wrapEl.addCls(this.readonlyClass);
			} else {
				wrapEl.removeCls(this.readonlyClass);
			}
			this.aceEdit.setReadOnly(readonly);
		},

		/**
		 * @inheritdoc Terrasoft.BaseEdit#setEnabled
		 * @protected
		 * @overridden
		 */
		setEnabled: function(enabled) {
			this.callParent(arguments);
			if (!this.isAceInitialized) {
				return;
			}
			var aceEdit = this.aceEdit;
			if (enabled) {
				var enableOptions = {
					readOnly: this.readonly,
					highlightActiveLine: this.highlightActiveLine,
					highlightGutterLine: this.highlightGutterLine
				};
				aceEdit.setOptions(enableOptions);
				aceEdit.textInput.getElement().disabled = false;
				aceEdit.renderer.$cursorLayer.element.style.display = "";
			} else {
				aceEdit.setOptions({
					readOnly: true,
					highlightActiveLine: false,
					highlightGutterLine: false
				});
				aceEdit.textInput.getElement().disabled = true;
				aceEdit.renderer.$cursorLayer.element.style.display = "none";
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseEdit#setFocused
		 * @protected
		 * @overridden
		 */
		setFocused: function(focused) {
			if ((this.focused === focused) || !Ext.isBoolean(focused)) {
				return;
			}
			this.focused = focused;
			this._initFocused();
		},

		/**
		 * Sets language for syntax highlighting in ace editor.
		 * @param {String} language language to set. Possible values see in SourceCodeEditEnums module.
		 */
		setLanguage: function(language) {
			this.language = language;
			this.editorMode = this.getEditorMode(language);
			if (this.isAceInitialized) {
				var aceEditSession = this.aceEdit.getSession();
				aceEditSession.setMode(this.editorMode);
			}
		},

		/**
		 * Returns ace editor mode for syntax highlighting.
		 * @param {String} language Language for which you want syntax highlighting. See SourceCodeEditEnums module
		 * for possible values.
		 * @protected
		 * @virtual
		 * @return {String} Ace editor mode
		 */
		getEditorMode: function(language) {
			var editorMode;
			var sourceCodeEditLanguages = sourceCodeEditEnums.Language;
			switch (language) {
				case sourceCodeEditLanguages.JAVASCRIPT:
					editorMode = "ace/mode/javascript";
					break;
				case sourceCodeEditLanguages.CSHARP:
					editorMode = "ace/mode/csharp";
					break;
				case sourceCodeEditLanguages.LESS:
					editorMode = "ace/mode/less";
					break;
				case sourceCodeEditLanguages.CSS:
					editorMode = "ace/mode/css";
					break;
				case sourceCodeEditLanguages.SQL:
					editorMode = "ace/mode/sql";
					break;
				case sourceCodeEditLanguages.SQLSERVER:
					editorMode = "ace/mode/sqlserver";
					break;
				case sourceCodeEditLanguages.HTML:
					editorMode = "ace/mode/html";
					break;
			}
			return editorMode;
		},

		/**
		 * Sets ace editor theme.
		 * @param {String} theme Theme name. Possible values see in SourceCodeEditEnums module.
		 */
		setTheme: function(theme) {
			this.theme = theme;
			if (this.isAceInitialized) {
				var themePath = this.getThemePath(theme);
				this.aceEdit.setTheme(themePath);
			}
		},

		/**
		 * Returns theme path by name.
		 * @param {String} theme Theme name. See SourceCodeEditEnums module for possible values.
		 * @protected
		 * @virtual
		 * @return {String} Ace editor theme path.
		 */
		getThemePath: function(theme) {
			var themePath;
			var sourceCodeEditThemes = sourceCodeEditEnums.Theme;
			switch (theme) {
				case sourceCodeEditThemes.SQLSERVER:
					themePath = "ace/theme/sqlserver";
					break;
				default:
					themePath = "ace/theme/crimson_editor";
			}
			return themePath;
		},

		/**
		 * @inheritdoc Terrasoft.BaseEdit#setCaretToLastPosition
		 * @protected
		 * @overridden
		 */
		setCaretToLastPosition: function() {
			if (this.isAceInitialized) {
				this.aceEdit.clearSelection();
				this.aceEdit.navigateFileEnd();
			}
		},

		/**
		 * @inheritdoc Terrasoft.Component#clearDomListeners
		 * Destroy ace editor instance and check wrap element resize timer (see {@link #createResizeTimer}).
		 * @protected
		 * @overridden
		 */
		clearDomListeners: function() {
			this.callParent(arguments);
			if (this.isAceInitialized) {
				if (this.checkResizeIntervalId) {
					clearInterval(this.checkResizeIntervalId);
					this.checkResizeIntervalId = null;
				}
				var aceEdit = this.aceEdit;
				aceEdit.off("blur", this.onAceBlur);
				aceEdit.off("focus", this.onAceFocus);
				aceEdit.destroy();
				this.isAceInitialized = false;
			}
		}

	});

	return Ext.create("Terrasoft.SourceCodeEdit");
});

