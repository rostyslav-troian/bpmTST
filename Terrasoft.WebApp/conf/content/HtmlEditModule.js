Terrasoft.configuration.Structures["HtmlEditModule"] = {innerHierarchyStack: ["HtmlEditModule"]};
define("HtmlEditModule", ["ext-base", "EmailImageMixin", "terrasoft", "HtmlEditModuleResources", "ckeditor-base",
	"jQuery"], function(Ext, EmailImageMixin, Terrasoft, resources) {
	Ext.ns("Terrasoft.controls.HtmlEdit");

	/**
	 * Html editor control class.
	 */
	Ext.define("Terrasoft.controls.HtmlEdit", {
		extend: "Terrasoft.Container",
		alternateClassName: "Terrasoft.HtmlEdit",

		mixins: {

			/**
			 * @class Terrasoft.EmailImageMixin
			 * Mixin for inserting email images.
			 */
			EmailImageMixin: "Terrasoft.EmailImageMixin"
		},

		//region Properties: Private

		/**
		 * Control settings.
		 * @private
		 * @static
		 * @type {Object}
		 */
		tplData: {
			classes: {
				htmlEditClass: ["html-editor"],
				htmlEditToolbarClass: ["html-edit-toolbar"],
				htmlEditToolbarTopClass: ["html-edit-toolbar-top"],
				htmlEditToolbarButtonGroupClass: ["html-edit-toolbar-buttongroup"],
				htmlEditTextareaClass: ["html-edit-textarea", "onhtml-edit-textarea"]
			},
			styles: {
				htmlEditStyle: {
					width: this.width,
					height: this.height,
					margin: this.margin
				},
				htmlEditFontFamilyStyle: {
					"vertical-align": "top",
					width: "165px"
				},
				htmlEditFontSizeStyle: {
					"vertical-align": "top",
					width: "68px"
				}
			}
		},

		/**
		 * Control toolbar element.
		 * @private
		 * @static
		 * @type {Object}
		 */
		toolbar: null,

		/**
		 * Toolbar wrapper element.
		 * @private
		 * @type {Ext.Element}
		 */
		toolbarEl: null,

		/**
		 * Memo edit control.
		 * @private
		 * @static
		 * @type {Object}
		 */
		memo: null,

		/**
		 * Font sizes collection.
		 * @private
		 * @type {Terrasoft.Collection}
		 */
		fontSizesCollection: null,

		/**
		 * Font family collection.
		 * @private
		 * @type {Terrasoft.Collection}
		 */
		fontFamilyCollection: null,

		//endregion

		//region Properties: Protected

		/**
		 * Object that contains information about control validation.
		 * @protected
		 * @type {Object}
		 */
		validationInfo: null,

		/**
		 * Set value timeout. Delay in miliseconds, between user input and control value update.
		 * @protected
		 * @type {Number}
		 */
		setValueDelay: 250,

		//endregion

		//region Properties: Public

		/**
		 * CKeditor resize enabled flag.
		 * @type {Boolean}
		 */
		resizeEnabled: false,

		/**
		 * CKeditor macroses using flag.
		 * @type {Boolean}
		 */
		useMacroses: false,

		/**
		 * Resizable CKeditor initial height.
		 * @type {Integer}
		 */
		initialHeight: 50,

		/**
		 * Default font family.
		 * @type {String}
		 */
		defaultFontFamily: "Bpmonline Open Sans",

		/**
		 * Determines if the value is required.
		 * @type {Boolean}
		 */
		isRequired: false,

		/**
		 * Css-class for control when he doesn't pass validation.
		 * @type {String}
		 */
		errorClass: "base-edit-error",

		/**
		 * Font families.
		 * @type {String}
		 */
		fontFamily: "Verdana,Times New Roman,Courier New,Arial,Tahoma,Arial Black,Comic Sans MS,Bpmonline Open Sans",

		/**
		 * Default font size.
		 * @type {String}
		 */
		defaultFontSize: "14",

		/**
		 * Font size.
		 * @type {String}
		 */
		fontSize: "8,9,10,11,12,13,14,16,18,20,22,24,26,28,36,48,72",

		/**
		 * Default font color.
		 * @type {String}
		 */
		defaultFontColor: "#000000",

		/**
		 * Default background.
		 * @type {String}
		 */
		defaultBackground: "#ffffff",

		/**
		 * Default highlight.
		 * @type {String}
		 */
		defaultHighlight: "#ffffff",

		/**
		 * Default button style.
		 * @type {Terrasoft.controls.ButtonEnums.style}
		 */
		defaultButtonStyle: Terrasoft.controls.ButtonEnums.style.DEFAULT,

		/**
		 * Value.
		 * @type {String}
		 */
		value: "",

		/**
		 * Plain text value without html tags.
		 * @type {String}
		 */
		plainTextValue: "",

		/**
		 * Editor object.
		 * @type {Object}
		 */
		editor: null,

		/**
		 * Prefix for control element.
		 * @type {String}
		 */
		controlElementPrefix: "html-edit",

		/**
		 * Plain text mode.
		 * @type {Boolean}
		 */
		plainTextMode: false,

		/**
		 * Confirm plain text mode enable flag.
		 * @type {Boolean}
		 */
		showChangeModeConfirmation: true,

		/**
		 * Edit mode buttons visibility.
		 * @type {Boolean}
		 */
		hideModeButtons: false,

		/**
		 * Control width.
		 * @type {String}
		 */
		width: "100%",

		/**
		 * Control height.
		 * @type {String}
		 */
		height: "350px",

		/**
		 * Control margins.
		 * @type {String}
		 */
		margin: "0",

		/**
		 * Control enable state.
		 * @type {Boolean}
		 */
		enabled: true,

		/**
		 * Images collection.
		 * @type {Terrasoft.Collection}
		 */
		images: null,

		/**
		 * Name of the CSS class for show the toolbar control.
		 * @type {String}
		 */
		visibleToolbarClass: "html-edit-toolbar-show",

		/**
		 * Control render template.
		 * @overridden
		 * @type {Array}
		 */
		tpl: [
			//jscs:disable
			/*jshint quotmark: false */
			/*jshint maxlen:140 */
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
			"<div id=\"html-edit-toolbar-font-family\" class=\"{htmlEditToolbarButtonGroupClass}\" style=\"{htmlEditFontFamilyStyle}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'fontFamily'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"<div id=\"html-edit-toolbar-font-size\" class=\"{htmlEditToolbarButtonGroupClass}\" style=\"{htmlEditFontSizeStyle}\">",
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
			"<@item>",
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
			"<tpl if=\"tag == 'numberedList' || tag == 'bulletedList' || tag == 'indentList' || tag == 'outdentList'\">",
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
			"<div id=\"html-edit-toolbar-justify\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'justifyLeft' || tag == 'justifyCenter' || tag == 'justifyRight'\">",
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
			"<div id=\"{id}-html-edit-toolbar-table\" class=\"{htmlEditToolbarButtonGroupClass}\">",
			"<tpl for=\"items\">",
			"<tpl if=\"tag == 'table'\">",
			"<@item>",
			"</tpl>",
			"</tpl>",
			"</div>",
			"</div>",
			"</div>",
			"<div style=\"display: table-row;\">",
			"<div id=\"{id}-html-edit-htmltext\" class=\"{htmlEditTextareaClass}\"  style=\"display: none\">",
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
			/*jshint maxlen:120 */
			/*jshint quotmark: true */
			//jscs:enable
		],

		/**
		 * Editor elements.
		 * @overridden
		 * @type {Array}
		 */
		items: null,

		/**
		 * Editor menu elements.
		 * @type {Array}
		 */
		menuItems: null,

		/**
		 * Editor elements config.
		 * @overridden
		 * @type {Array}
		 */
		itemsConfig: [
			{
				className: "Terrasoft.ComboBoxEdit",
				tag: "fontFamily"
			},
			{
				className: "Terrasoft.ComboBoxEdit",
				tag: "fontSize"
			},
			{
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxwYXRoIGQ9Im00IDNoMy41YzEuNSA" +
					"wIDIuNS4yIDMuMi42czEgMSAxIDEuOWMwIC42LS4yIDEuMS0uNSAxLjUtLjMuNC0uOC42LTEuNC43di4xYy44LjEgMS4z" +
					"LjQgMS43LjguNC40LjUuOS41IDEuNiAwIC45LS4zIDEuNi0xIDIuMS0uNy40LTEuNi43LTIuOC43aC00LjJ2LTEwbTIgN" +
					"C4xaDEuOGMuNyAwIDEuMi0uMSAxLjYtLjNzLjUtLjYuNS0xLjFjMC0uNS0uMi0uOC0uNS0xcy0xLS4zLTEuOC0uM2gtMS" +
					"42djIuN20wIDEuNHYzLjJoMS45Yy43IDAgMS4zLS4xIDEuNy0uNHMuNi0uNy42LTEuMmMwLS41LS4yLS45LS42LTEuMi0" +
					"uNC0uMy0xLS40LTEuNy0uNGgtMS45IiBmaWxsPSIjNjY2Ii8+PC9zdmc+"
				},
				onClick: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand("bold");
					}
				},
				tag: "fontStyleBold"
			},
			{
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM2NjYiPjxwYXRoIGQ" +
					"9Im02IDNoNXYxaC01eiIvPjxwYXRoIGQ9Im00IDEyaDV2MWgtNXoiLz48L2c+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tl" +
					"PSIjNjY2IiBzdHJva2Utd2lkdGg9IjEuNyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJtNi41IDEyLjVsMi05Ii8+P" +
					"C9zdmc+"
				},
				onClick: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand("italic");
					}
				},
				tag: "fontStyleItalic"
			},
			{
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM2NjYiPjxwYXRoIGQ" +
					"9Im0xMSAyYy0uMSAxLjctLjEgMy41LS4xIDUuMnYuNmMwIDAgMCAuNiAwIC43LS4xLjYtLjIgMS4xLS41IDEuNi0uNSAx" +
					"LTEuNiAxLjctMi44IDEuNy0xLjIgMC0yLjMtLjYtMi44LTEuNi0uMy0uNS0uNS0xLjEtLjUtMS43IDAtLjUtLjEtMS4yL" +
					"S4xLTEuMy0uMS0xLjctLjEtMy41LS4yLTUuMmgyYy0uMSAxLjctLjEgMy41LS4xIDUuMiAwIDAgMCAxIDAgMS4yIDAgLj" +
					"MuMS42LjIuOS4yLjUuOC45IDEuNC45LjUgMCAxLjEtLjMgMS40LS45LjEtLjMuMi0uNi4yLS45czAtMS4yIDAtMS4yYzA" +
					"tMS43IDAtMy41LS4xLTUuMmgyIi8+PHBhdGggZD0ibTMgMTNoOXYxaC05eiIvPjwvZz48L3N2Zz4="
				},
				onClick: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand("underline");
					}
				},
				tag: "fontStyleUnderline"
			},
			{
				className: "Terrasoft.ColorButton",
				simpleMode: false,
				defaultValue: "#000000",
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxwYXRoIGZpbGw9IiM0NDQiIGQ9Im0" +
					"wIDEzaDE2djNoLTE2eiIvPjxwYXRoIGQ9Ik0xMS4zLDExSDEzTDguNywxSDcuM0wzLDExaDEuOGwxLTNoNC41TDExLjMs" +
					"MTF6IE02LjIsN0w4LDNsMS44LDRINi4yeiIgZmlsbD0iIzY2NiIvPjwvc3ZnPg=="
				},
				tag: "fontColor"
			},
			{
				className: "Terrasoft.ColorButton",
				simpleMode: true,
				defaultValue: "#ffffff",
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxwYXRoIGZpbGw9IiNjMmU4ZmMiIGQ" +
					"9Im0wIDFoMTZ2MTRoLTE2eiIvPjxnIGZpbGw9IiM2NjYiPjxwYXRoIGQ9Ik03LjcsMTJIOUw2LDRINWwtMyw4aDEuM2ww" +
					"LjgtMmgyLjlMNy43LDEyeiBNNC40LDlsMS4xLTIuOEw2LjYsOUg0LjR6Ii8+PHBhdGggZD0ibTEyLjUgN2gtMS44Yy0uM" +
					"iAwLS4zIDAtLjUuMXYtMy4xaC0xLjJ2NC41IDEuMy43YzAgLjguNyAxLjUgMS41IDEuNWgyYy44IDAgMS41LS43IDEuNS" +
					"0xLjV2LTJjMC0uOC0uNy0xLjUtMS41LTEuNW0uNSAzLjVjMCAuMy0uMi41LS41LjVoLTJjLS4zIDAtLjMtLjItLjMtLjV" +
					"2LS43LTEuM2MwLS4zLjItLjUuNS0uNWgxLjhjLjMgMCAuNS4yLjUuNXYyIi8+PC9nPjwvc3ZnPg=="
				},
				tag: "hightlightColor"
			},
			{
				className: "Terrasoft.Button",

				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM1ODZkODkiPjxwYXR" +
					"oIGQ9Im0zIDR2LTNoLTF2MWgtMXYxaDF2MWgtMXYxaDEgMSAxdi0xeiIvPjxwYXRoIGQ9Im00IDdsLTEtMWgtMnYxaDJ2" +
					"MWgxeiIvPjxwYXRoIGQ9Im0yIDh2MWgtMXYxaDN2LTFoLTF2LTF6Ii8+PHBhdGggZD0ibTQgMTJ2LTFoLTN2MWgxdjFoM" +
					"XYtMXoiLz48cGF0aCBkPSJtMSAxNHYxaDJsMS0xdi0xaC0xdjF6Ii8+PC9nPjxnIGZpbGw9IiM3NTc1NzUiPjxwYXRoIG" +
					"Q9Im02IDJoOXYxaC05eiIvPjxwYXRoIGQ9Im02IDdoOXYxaC05eiIvPjxwYXRoIGQ9Im02IDEyaDl2MWgtOXoiLz48L2c" +
					"+PC9zdmc+"
				},
				onClick: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand("numberedlist");
					}
				},
				tag: "numberedList"
			},
			{
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM3NTc1NzUiPjxwYXR" +
					"oIGQ9Im02IDJoOXYxaC05eiIvPjxwYXRoIGQ9Im02IDdoOXYxaC05eiIvPjxwYXRoIGQ9Im02IDEyaDl2MWgtOXoiLz48" +
					"L2c+PGcgZmlsbD0iIzU4NmQ4OSI+PGNpcmNsZSBjeD0iMi41IiBjeT0iMi41IiByPSIxLjUiLz48Y2lyY2xlIGN4PSIyL" +
					"jUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgY3g9IjIuNSIgY3k9IjEyLjUiIHI9IjEuNSIvPjwvZz48L3N2Zz4="
				},
				onClick: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand("bulletedlist");
					}
				},
				tag: "bulletedList"
			},
			{
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM3NTc1NzUiPjxwYXR" +
					"oIGQ9Im0xIDNoMTR2MWgtMTR6Ii8+PHBhdGggZD0ibTEgNmgxMHYxaC0xMHoiLz48cGF0aCBkPSJtMSA5aDE0djFoLTE0" +
					"eiIvPjxwYXRoIGQ9Im0xIDEyaDEwdjFoLTEweiIvPjwvZz48L3N2Zz4="
				},
				onClick: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand("justifyleft");
					}
				},
				tag: "justifyLeft"
			},
			{
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM3NTc1NzUiPjxwYXR" +
					"oIGQ9Im0xIDNoMTR2MWgtMTR6Ii8+PHBhdGggZD0ibTMgNmgxMHYxaC0xMHoiLz48cGF0aCBkPSJtMSA5aDE0djFoLTE0" +
					"eiIvPjxwYXRoIGQ9Im0zIDEyaDEwdjFoLTEweiIvPjwvZz48L3N2Zz4="
				},
				onClick: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand("justifycenter");
					}
				},
				tag: "justifyCenter"
			},
			{
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM3NTc1NzUiPjxwYXR" +
					"oIGQ9Im0xIDNoMTR2MWgtMTR6Ii8+PHBhdGggZD0ibTUgNmgxMHYxaC0xMHoiLz48cGF0aCBkPSJtMSA5aDE0djFoLTE0" +
					"eiIvPjxwYXRoIGQ9Im01IDEyaDEwdjFoLTEweiIvPjwvZz48L3N2Zz4="
				},
				onClick: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand("justifyright");
					}
				},
				tag: "justifyRight"
			},
			{
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM3NTc1NzUiPjxwYXR" +
					"oIGQ9Im04IDNoN3YxaC03eiIvPjxwYXRoIGQ9Im04IDZoN3YxaC03eiIvPjxwYXRoIGQ9Im0xIDloMTR2MWgtMTR6Ii8+" +
					"PHBhdGggZD0ibTEgMTJoMTR2MWgtMTR6Ii8+PC9nPjxnIGZpbGw9IiM2Yjc4ODkiPjxwYXRoIHRyYW5zZm9ybT0ibWF0c" +
					"ml4KC0xIDAgMC0xIDExIDExKSIgZD0ibTQgNWgzdjFoLTN6Ii8+PHBhdGggZD0ibTQgOHYtNWwtMyAyLjV6Ii8+PC9nPj" +
					"wvc3ZnPg=="
				},
				onClick: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand("outdent");
					}
				},
				tag: "outdentList",
				markerValue: "outdent"
			},
			{
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM3NTc1NzUiPjxwYXR" +
					"oIGQ9Im04IDNoN3YxaC03eiIvPjxwYXRoIGQ9Im04IDZoN3YxaC03eiIvPjxwYXRoIGQ9Im0xIDloMTR2MWgtMTR6Ii8+" +
					"PHBhdGggZD0ibTEgMTJoMTR2MWgtMTR6Ii8+PC9nPjxnIGZpbGw9IiM2Yjc4ODkiPjxwYXRoIGQ9Im0xIDVoM3YxaC0ze" +
					"iIvPjxwYXRoIGQ9Im00IDh2LTVsMyAyLjV6Ii8+PC9nPjwvc3ZnPg=="
				},
				onClick: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand("indent");
					}
				},
				tag: "indentList",
				markerValue: "indent"
			},
			{
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM3NTc1NzUiPjxwYXR" +
					"oIGQ9Ik0xNSwydjExSDFWMkgxNSBNMTYsMUgwdjEzaDE2VjFMMTYsMXoiLz48Y2lyY2xlIGN4PSIxMS41IiBjeT0iNS41" +
					"IiByPSIxLjUiLz48cGF0aCBkPSJtMSAxMWw0LTYgNyA4aC0xMXoiLz48cGF0aCBkPSJtMTMgMTNsLTItMyAyLTEgMiAyd" +
					"jJ6Ii8+PC9nPjwvc3ZnPg=="
				},
				fileUpload: true,
				tag: "image"
			},
			{
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0" +
					"iIzcyNzI3MiIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0ibTguOSA2LjNs" +
					"LjcuN2MuOC44LjggMiAwIDIuOGwtMy41IDMuNWMtLjguOC0yIC44LTIuOCAwbC0uNy0uN2MtLjgtLjgtLjgtMiAwLTIuO" +
					"GwxLjgtMS44Ii8+PHBhdGggZD0ibTcuNSA5LjJsLS43LS43Yy0uOC0uOC0uOC0yLjEgMC0yLjlsMy41LTMuNWMuOC0uOC" +
					"AyLS44IDIuOCAwbC43LjdjLjguOC44IDIgMCAyLjhsLTEuOCAxLjgiLz48L2c+PC9zdmc+"
				},
				onClick: function() {
					var container = this.ownerCt;
					if (container) {
						container.showLinkInputBox();
					}
				},
				tag: "link"
			},
			{
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxwYXRoIGQ9Im01LjYgM2wzLjEgOC4" +
					"2Yy4xLjMuMi41LjMuNy4xLjEuMi4yLjQuM2wuNi4ydi4zYy0uNiAwLTEuMiAwLTEuNyAwLS41IDAtMS4xIDAtMS44IDB2" +
					"LS4zbC43LS4yYy4xIDAgLjItLjEuMi0uMXMuMS0uMS4xLS4yYzAtLjEgMC0uMi0uMS0uNCAwLS4yLS4xLS40LS4yLS42b" +
					"C0uOC0yaC0zLjNsLS43IDEuOWMtLjEuMy0uMi41LS4yLjYtLjEuMi0uMS4zLS4xLjQgMCAuMSAwIC4xLjEuMiAwIDAgLj" +
					"EuMS4yLjFsLjYuMnYuM2MtLjcgMC0xLjIgMC0xLjYgMHMtLjkgMC0xLjQgMHYtLjNsLjctLjJjLjItLjEuMy0uMS40LS4" +
					"zcy4yLS4zLjMtLjVsMy41LTguNi43LS4xbS0yLjIgNS43aDIuOGwtMS4zLTMuOS0xLjUgMy45IiBmaWxsPSIjNjY2Ii8+" +
					"PHBhdGggZD0ibTEwLjUgNi42Yy45LS40IDEuNy0uNiAyLjMtLjYuNyAwIDEuMi4yIDEuNi42LjUuNC43LjkuNiAxLjZ2M" +
					"2MwIC4yIDAgLjQgMCAuNiAwIC4xLjEuMy4xLjMuMS4xLjIuMS4zLjIuMSAwIC4zIDAgLjUuMXYuM2MtLjIuMS0uNC4yLS" +
					"43LjItLjIuMS0uNC4xLS41LjEtLjQgMC0uNy0uMi0uOS0uNy0uNi41LTEuMi43LTEuOC43LS42IDAtMS4xLS4yLTEuNS0" +
					"uNS0uNC0uMy0uNi0uOC0uNi0xLjQgMC0uNy4zLTEuMy45LTEuNnMxLjctLjUgMy0uNXYtLjZjMC0uNS0uMS0uOS0uNC0x" +
					"LjItLjMtLjMtLjctLjQtMS4yLS40LS40IDAtLjkuMS0xLjUuMmwtLjItLjRtMy4zIDNjLS45IDAtMS42LjEtMS45LjMtL" +
					"jMuMi0uNS42LS41IDEgMCAuNS4xLjguMyAxIC4yLjIuNS4zLjkuMy40IDAgLjgtLjEgMS4yLS4zdi0yLjMiIGZpbGw9Ii" +
					"MwMDkxZWEiLz48L3N2Zz4="
				},
				onClick: function() {
					var container = this.ownerCt;
					if (container) {
						container.changeEditorMode(false);
					}
				},
				tag: "htmlMode",
				markerValue: "htmlMode",
				disabledClass: ""
			},
			{
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM2NjYiPjxwYXRoIGQ" +
					"9Ik03LjcsMTNMNi40LDkuOGgtNEwxLjIsMTNIMEw0LDNoMWwzLjksMTBINy43eiBNNiw4LjhMNC45LDUuN0M0LjcsNS4z" +
					"LDQuNiw0LjgsNC40LDQuMkM0LjMsNC43LDQuMiw1LjIsNCw1LjcNCglMMi44LDguOEg2eiIvPjxwYXRoIGQ9Im0xNC4yI" +
					"DEyLjlsLS4yLTFoLS4xYy0uNC40LS43LjctMS4xLjktLjQuMi0uOC4yLTEuNC4yLS43IDAtMS4zLS4yLTEuNy0uNXMtLj" +
					"ctLjktLjctMS41YzAtMS40IDEuMi0yLjEgMy42LTIuMWgxLjN2LS41YzAtLjUtLjEtLjktLjQtMS4yLS4zLS4zLS43LS4" +
					"0LTEuMi0uNC0uNiAwLTEuMy4yLTIuMS41bC0uNC0uN2MuNC0uMi44LS4zIDEuMi0uNC41LS4xLjktLjIgMS40LS4yLjkg" +
					"MCAxLjYuMiAyIC41LjQuNC42IDEgLjYgMS44djQuNmgtLjhtLTIuNi0uN2MuNyAwIDEuMy0uMiAxLjctLjVzLjYtLjguN" +
					"i0xLjV2LS43aC0xLjFjLS45IDAtMS42LjItMS45LjQtLjQuMi0uNi42LS42IDFzLjEuNS4yLjhjLjIuMi43LjUgMS4xLj" +
					"UiLz48L2c+PC9zdmc+"
				},
				onClick: function() {
					var container = this.ownerCt;
					if (container) {
						if (!container.showChangeModeConfirmation) {
							container.changeEditorMode(true);
						} else {
							Terrasoft.utils.showConfirmation(resources.localizableStrings.ConfirmPlainTextMode,
									function(returnCode) {
										if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
											container.changeEditorMode(true);
										}
									},
									["yes", "no"], this
							);
						}
					}
				},
				tag: "plainMode",
				markerValue: "plainMode",
				disabledClass: ""
			},
			{
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxwYXRoIGQ9Im0xMy42IDYuM2MtLjU" +
					"tLjQtMS41LTEuMS0zLjMtMS4xLTEuMSAwLTQuMy0uMS00LjMtLjF2LTIuMWwtNSAzIDUgM3YtMi4xYzAgMCAzLjEtLjIg" +
					"NC4yLS4yIDEuNCAwIDIuMi4zIDIuNi42LjcuNSAxLjEgMS42IDEuMiAyLjUgMCAuOC0uMiAxLjUtLjcgMi0uNi41LTEuN" +
					"C44LTIuMy45di43YzEgMCAyLjEtLjQgMi45LTEuMS42LS42IDEuMS0xLjUgMS4xLTIuMyAwLTItLjQtMi44LTEuNC0zLj" +
					"ciIGZpbGw9IiM3NTc1NzUiLz48L3N2Zz4="
				},
				onClick: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand("undo");
					}
				},
				tag: "undo",
				markerValue: "undo"
			},
			{
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxwYXRoIGQ9Im0yLjQgNi4zYy41LS4" +
					"0IDEuNS0xLjEgMy4zLTEuMSAxLjEgMCA0LjMtLjEgNC4zLS4xdi0yLjFsNSAzLTUgM3YtMi4xYzAgMC0zLjEtLjItNC4y" +
					"LS4yLTEuNCAwLTIuMi4zLTIuNi42LS43LjUtMS4xIDEuNi0xLjIgMi41IDAgLjguMiAxLjUuNyAyIC42LjUgMS40LjggM" +
					"i4zLjl2LjdjLTEgMC0yLjEtLjQtMi45LTEuMS0uNy0uNS0xLjEtMS41LTEuMS0yLjMgMC0yIC40LTIuOCAxLjQtMy43Ii" +
					"BmaWxsPSIjNzU3NTc1Ii8+PC9zdmc+"
				},
				onClick: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand("redo");
					}
				},
				tag: "redo",
				markerValue: "redo"
			},
			{
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0" +
					"iIzc1NzU3NSIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0ibTEwIDEwbDQg" +
					"NCIvPjxwYXRoIGQ9Im0yIDJsNCA0Ii8+PC9nPjxnIGZpbGw9IiM3NTc1NzUiPjxwYXRoIGQ9Im0xIDUuNXYtNC41aDQuN" +
					"XoiLz48cGF0aCBkPSJtMTUgMTAuNXY0LjVoLTQuNXoiLz48L2c+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNzU3NTc1Ii" +
					"BzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJtNiAxMGwtNCA0Ii8+PHBhdGg" +
					"gZD0ibTE0IDJsLTQgNCIvPjwvZz48ZyBmaWxsPSIjNzU3NTc1Ij48cGF0aCBkPSJtMTAuNSAxaDQuNXY0LjV6Ii8+PHBh" +
					"dGggZD0ibTUuNSAxNWgtNC41di00LjV6Ii8+PC9nPjwvc3ZnPg=="
				},
				onClick: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						container.toggleFullScreanMode();
					}
				},
				tag: "maximized",
				markerValue: "maximize"
			},
			{
				className: "Terrasoft.Button",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3" +
					"g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM5OTkiPjxwYXRoIGQ" +
					"9Im0xNSA2aC0xNHYxaDE0di0xIi8+PHBhdGggZD0ibTYgM2gtMXYxMWgxdi0xMSIvPjxwYXRoIGQ9Im0xMSAzaC0xdjEx" +
					"aDF2LTExIi8+PC9nPjxwYXRoIGQ9Im0xNiAxaC0xNnYxNGgxNnYtMTRtLTE1IDEzdi0xMWgxNHYxMWgtMTQiIGZpbGw9I" +
					"iM3NTc1NzUiLz48cGF0aCBmaWxsPSIjOTk5IiBkPSJtMTUgMTBoLTE0djFoMTR2LTEiLz48L3N2Zz4="
				},
				visible: Terrasoft.Features.getIsEnabled("CKeditorTableEdit"),
				menu: {
					className: "Terrasoft.Menu",
					items: [{
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIH" +
							"ZpZXdCb3g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM" +
							"5OTkiPjxwYXRoIGQ9Im0xNSA2aC0xNHYxaDE0di0xIi8+PHBhdGggZD0ibTYgM2gtMXYxMWgxdi0xMSIvPjxw" +
							"YXRoIGQ9Im0xMSAzaC0xdjZoMXYtNiIvPjwvZz48cGF0aCBmaWxsPSIjNzU3NTc1IiBkPSJtMTYgMWgtMTZ2M" +
							"TRoMTB2LTFoLTl2LTExaDE0djZoMXYtOCIvPjxwYXRoIGZpbGw9IiM5OTkiIGQ9Im05IDEwaC04djFoOHYtMS" +
							"IvPjxnIGZpbGw9IiM2Yjc4ODkiPjxwYXRoIGQ9Im0xMiA5aDJ2NmgtMnoiLz48cGF0aCBkPSJtMTAgMTFoNnY" +
							"yaC02eiIvPjwvZz48L3N2Zz4="
						},
						handler: function(menu, menuItem) {
							var editor = menuItem.getEditor();
							if (editor) {
								editor.execCommand("table");
							}
						}.bind(this),
						caption: resources.localizableStrings.CreateTable,
						markerValue: "create_table"
					}, {
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIH" +
							"ZpZXdCb3g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM" +
							"5OTkiPjxwYXRoIGQ9Im0xNSA2aC0xNHYxaDE0di0xIi8+PHBhdGggZD0ibTYgM2gtMXYxMWgxdi0xMSIvPjxw" +
							"YXRoIGQ9Im0xMSAzaC0xdjRoMXYtNCIvPjwvZz48cGF0aCBkPSJtMTYgMWgtMTZ2MTRoMTZ2LTE0bS0xNSAxM" +
							"3YtMTFoMTR2MTFoLTE0IiBmaWxsPSIjNzU3NTc1Ii8+PHBhdGggZmlsbD0iIzk5OSIgZD0ibTYgMTBoLTV2MW" +
							"g1di0xIi8+PC9zdmc+"
						},
						handler: function(menu, menuItem) {
							var editor = menuItem.getEditor();
							if (editor) {
								editor.execCommand("selectedCellMerge");
							}
						}.bind(this),
						caption: resources.localizableStrings.MergeCells,
						markerValue: "merge_cells"
					}, {
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIH" +
							"ZpZXdCb3g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM" +
							"5OTkiPjxwYXRoIGQ9Im0xNSA2aC0xNHYxaDE0di0xIi8+PHBhdGggZD0ibTYgM2gtMXYxMWgxdi0xMSIvPjxw" +
							"YXRoIGQ9Im0xMSAzaC0xdjRoMXYtNCIvPjwvZz48cGF0aCBkPSJtMTYgMWgtMTZ2MTRoMTZ2LTE0bS0xNSAxM" +
							"3YtMTFoMTR2MTFoLTE0IiBmaWxsPSIjNzU3NTc1Ii8+PHBhdGggZmlsbD0iIzk5OSIgZD0ibTYgMTBoLTV2MW" +
							"g1di0xIi8+PGcgZmlsbD0iIzZiNzg4OSI+PHBhdGggZD0ibTEwIDhoMXYxaC0xeiIvPjxwYXRoIGQ9Im0xMCA" +
							"xMGgxdjFoLTF6Ii8+PHBhdGggZD0ibTEwIDEyaDF2MWgtMXoiLz48cGF0aCBkPSJtNiAxMGgxdjFoLTF6Ii8+" +
							"PHBhdGggZD0ibTggMTBoMXYxaC0xeiIvPjxwYXRoIGQ9Im0xMiAxMGgxdjFoLTF6Ii8+PHBhdGggZD0ibTE0I" +
							"DEwaDF2MWgtMXoiLz48L2c+PC9zdmc+"
						},
						handler: function(menu, menuItem) {
							var editor = menuItem.getEditor();
							if (editor) {
								editor.execCommand("cellHorizontalSplit");
							}
						}.bind(this),
						caption: resources.localizableStrings.SplitHorizontally,
						markerValue: "split_horizontally"
					},{
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIH" +
							"ZpZXdCb3g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM" +
							"5OTkiPjxwYXRoIGQ9Im0xNSA2aC0xNHYxaDE0di0xIi8+PHBhdGggZD0ibTYgM2gtMXYxMWgxdi0xMSIvPjxw" +
							"YXRoIGQ9Im0xMSAzaC0xdjRoMXYtNCIvPjwvZz48cGF0aCBkPSJtMTYgMWgtMTZ2MTRoMTZ2LTE0bS0xNSAxM" +
							"3YtMTFoMTR2MTFoLTE0IiBmaWxsPSIjNzU3NTc1Ii8+PHBhdGggZmlsbD0iIzk5OSIgZD0ibTYgMTBoLTV2MW" +
							"g1di0xIi8+PGcgZmlsbD0iIzZiNzg4OSI+PHBhdGggZD0ibTEwIDhoMXYxaC0xeiIvPjxwYXRoIGQ9Im0xMCA" +
							"xMGgxdjFoLTF6Ii8+PHBhdGggZD0ibTEwIDEyaDF2MWgtMXoiLz48cGF0aCBkPSJtNiAxMGgxdjFoLTF6Ii8+" +
							"PHBhdGggZD0ibTggMTBoMXYxaC0xeiIvPjxwYXRoIGQ9Im0xMiAxMGgxdjFoLTF6Ii8+PHBhdGggZD0ibTE0I" +
							"DEwaDF2MWgtMXoiLz48L2c+PC9zdmc+"
						},
						handler: function(menu, menuItem) {
							var editor = menuItem.getEditor();
							if (editor) {
								editor.execCommand("cellVerticalSplit");
							}
						}.bind(this),
						caption: resources.localizableStrings.SplitVertically,
						markerValue: "split_vertically"
					}, {
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIH" +
							"ZpZXdCb3g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM" +
							"2Yjc4ODkiPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMC0xIDE5IDI3KSIgZD0ibTkgMTNoMXYxaC0x" +
							"eiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMC0xIDE1IDI3KSIgZD0ibTcgMTNoMXYxaC0xeiIvP" +
							"jxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMC0xIDcgMjcpIiBkPSJtMyAxM2gxdjFoLTF6Ii8+PHBhdG" +
							"ggdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwLTEgNyAyMykiIGQ9Im0zIDExaDF2MWgtMXoiLz48cGF0aCB0cmF" +
							"uc2Zvcm09Im1hdHJpeCgtMSAwIDAtMSA3IDE5KSIgZD0ibTMgOWgxdjFoLTF6Ii8+PHBhdGggdHJhbnNmb3Jt" +
							"PSJtYXRyaXgoLTEgMCAwLTEgNyA3KSIgZD0ibTMgM2gxdjFoLTF6Ii8+PHBhdGggdHJhbnNmb3JtPSJtYXRya" +
							"XgoLTEgMCAwLTEgNyAxMSkiIGQ9Im0zIDVoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC0xID" +
							"AgMC0xIDExIDI3KSIgZD0ibTUgMTNoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMC0" +
							"xIDIzIDI3KSIgZD0ibTExIDEzaDF2MWgtMXoiLz48cGF0aCBkPSJtMCA3aDh2MWgtOHoiLz48cGF0aCBkPSJt" +
							"OCA0djdsNS0zLjV6Ii8+PHBhdGggZD0ibTEzIDEzaDF2MWgtMXoiLz48cGF0aCB0cmFuc2Zvcm09Im1hdHJpe" +
							"CgtMSAwIDAtMSA3IDMpIiBkPSJtMyAxaDF2MWgtMXoiLz48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwID" +
							"\AtMSAxNSAzKSIgZD0ibTcgMWgxdjFoLTF6Ii8+PHBhdGggdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwLTEgMT" +
							"EgMykiIGQ9Im01IDFoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMC0xIDE5IDMpIiB" +
							"kPSJtOSAxaDF2MWgtMXoiLz48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAtMSAyMyAzKSIgZD0ibTEx" +
							"IDFoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMC0xIDI3IDMpIiBkPSJtMTMgMWgxd" +
							"jFoLTF6Ii8+PHBhdGggdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwLTEgMzEgMykiIGQ9Im0xNSAxaDF2MWgtMX" +
							"oiLz48cGF0aCBkPSJtMTUgMTNoMXYxaC0xeiIvPjxwYXRoIGQ9Im0xNSA5aDF2MWgtMXoiLz48cGF0aCBkPSJ" +
							"tMTUgN2gxdjFoLTF6Ii8+PHBhdGggZD0ibTE1IDVoMXYxaC0xeiIvPjxwYXRoIGQ9Im0xNSAzaDF2MWgtMXoi" +
							"Lz48cGF0aCBkPSJtMTUgMTFoMXYxaC0xeiIvPjwvZz48L3N2Zz4="
						},
						menu: {
							className: "Terrasoft.Menu",
							items: [{
								imageConfig: {
									source: Terrasoft.ImageSources.URL,
									url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC" +
									"9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTY" +
									"iPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzc1NzU3NSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEw" +
									"IiBkPSJtMTQuNSA5djUuNWgtMTR2LTUuNSIvPjxnIGZpbGw9IiM5OTkiPjxwYXRoIGQ9Im01IDloL" +
									"TF2NWgxdi01Ii8+PHBhdGggZD0ibTExIDloLTF2NWgxdi01Ii8+PC9nPjxwYXRoIGZpbGw9IiM3NT" +
									"c1NzUiIGQ9Im0xNSAxaC0xNXYyaDE1di0yIi8+PHBhdGggZmlsbD0iIzk5OSIgZD0ibTE1IDExaC0" +
									"xNHYxaDE0di0xIi8+PGcgZmlsbD0iIzZiNzg4OSI+PHBhdGggdHJhbnNmb3JtPSJtYXRyaXgoLTEg" +
									"MCAwLTEgMSAxMykiIGQ9Im0wIDZoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC0xI" +
									"DAgMC0xIDEgMTcpIiBkPSJtMCA4aDF2MWgtMXoiLz48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgtMS" +
									"AwIDAtMSA1IDE3KSIgZD0ibTIgOGgxdjFoLTF6Ii8+PHBhdGggdHJhbnNmb3JtPSJtYXRyaXgoLTE" +
									"gMCAwLTEgOSAxNykiIGQ9Im00IDhoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC0x" +
									"IDAgMC0xIDIxIDE3KSIgZD0ibTEwIDhoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4K" +
									"C0xIDAgMC0xIDI1IDE3KSIgZD0ibTEyIDhoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF0cm" +
									"l4KC0xIDAgMC0xIDI5IDE3KSIgZD0ibTE0IDhoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF" +
									"0cml4KC0xIDAgMC0xIDI5IDEzKSIgZD0ibTE0IDZoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0i" +
									"bWF0cml4KC0xIDAgMC0xIDEgOSkiIGQ9Im0wIDRoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ib" +
									"WF0cml4KC0xIDAgMC0xIDI5IDkpIiBkPSJtMTQgNGgxdjFoLTF6Ii8+PHBhdGggdHJhbnNmb3JtPS" +
									"JtYXRyaXgoMC0xIDEgMCAwIDE1KSIgZD0ibTYgN2gzdjFoLTN6Ii8+PHBhdGggZD0ibTUgNmg1bC0" +
									"yLjUtM3oiLz48L2c+PC9zdmc+"
								},
								handler: function(menu, menuItem) {
									var editor = menuItem.getEditor();
									if (editor) {
										editor.execCommand("rowInsertBefore");
									}
								}.bind(this),
								caption: resources.localizableStrings.InsertRowBefore,
								markerValue: "table_insert_row_before"
							},{
								imageConfig: {
									source: Terrasoft.ImageSources.URL,
									url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC" +
									"9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTY" +
									"iPjxnIGZpbGw9IiM5OTkiPjxwYXRoIGQ9Im0xNCA1aC0xM3YxaDEzdi0xIi8+PHBhdGggZD0ibTUg" +
									"M2gtMXY2aDF2LTYiLz48cGF0aCBkPSJtMTEgM2gtMXY2aDF2LTYiLz48L2c+PHBhdGggZmlsbD0iI" +
									"zc1NzU3NSIgZD0ibTE1IDFoLTE1djhoMXYtNmgxM3Y2aDF2LTgiLz48ZyBmaWxsPSIjOTk5Ij48cG" +
									"F0aCBkPSJtNiA4aC01djFoNXYtMSIvPjxwYXRoIGQ9Im0xNCA4aC01djFoNXYtMSIvPjwvZz48ZyB" +
									"maWxsPSIjNmI3ODg5Ij48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAtMSAxIDI1KSIgZD0i" +
									"bTAgMTJoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMC0xIDEgMjkpIiBkP" +
									"SJtMCAxNGgxdjFoLTF6Ii8+PHBhdGggdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwLTEgNSAyOSkiIG" +
									"Q9Im0yIDE0aDF2MWgtMXoiLz48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAtMSA5IDI5KSI" +
									"gZD0ibTQgMTRoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMC0xIDEzIDI5" +
									"KSIgZD0ibTYgMTRoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMC0xIDIxI" +
									"DI5KSIgZD0ibTEwIDE0aDF2MWgtMXoiLz48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAtMS" +
									"AxNyAyOSkiIGQ9Im04IDE0aDF2MWgtMXoiLz48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDA" +
									"tMSAyNSAyOSkiIGQ9Im0xMiAxNGgxdjFoLTF6Ii8+PHBhdGggdHJhbnNmb3JtPSJtYXRyaXgoLTEg" +
									"MCAwLTEgMjkgMjkpIiBkPSJtMTQgMTRoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4K" +
									"C0xIDAgMC0xIDI5IDI1KSIgZD0ibTE0IDEyaDF2MWgtMXoiLz48cGF0aCB0cmFuc2Zvcm09Im1hdH" +
									"JpeCgtMSAwIDAtMSAxIDIxKSIgZD0ibTAgMTBoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF" +
									"0cml4KC0xIDAgMC0xIDI5IDIxKSIgZD0ibTE0IDEwaDF2MWgtMXoiLz48cGF0aCB0cmFuc2Zvcm09" +
									"Im1hdHJpeCgwIDEtMSAwIDE3IDIpIiBkPSJtNiA5aDN2MWgtM3oiLz48cGF0aCBkPSJtMTAgMTFoL" +
									"TVsMi41IDN6Ii8+PC9nPjwvc3ZnPg=="
								},
								handler: function(menu, menuItem) {
									var editor = menuItem.getEditor();
									if (editor) {
										editor.execCommand("rowInsertAfter");
									}
								}.bind(this),
								caption: resources.localizableStrings.InsertRowAfter,
								markerValue: "table_insert_row_after"
							},{
								imageConfig: {
									source: Terrasoft.ImageSources.URL,
									url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC" +
									"9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTY" +
									"iPjxnIGZpbGw9IiM5OTkiPjxwYXRoIGQ9Im0xNSA2aC04djFoOHYtMSIvPjxwYXRoIGQ9Im0xMiAz" +
									"aC0xdjExaDF2LTExIi8+PHBhdGggZD0ibTggM2gtMXY0aDF2LTQiLz48cGF0aCBkPSJtOCAxMGgtM" +
									"XY0aDF2LTQiLz48L2c+PHBhdGggZmlsbD0iIzc1NzU3NSIgZD0ibTE2IDFoLTl2MSAxaDh2MTFoLT" +
									"h2MWg5di0xNCIvPjxwYXRoIGZpbGw9IiM5OTkiIGQ9Im0xNSAxMGgtOHYxaDh2LTEiLz48ZyBmaWx" +
									"sPSIjNmI3ODg5Ij48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAtMSA5IDI5KSIgZD0ibTQg" +
									"MTRoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMC0xIDUgMjkpIiBkPSJtM" +
									"iAxNGgxdjFoLTF6Ii8+PHBhdGggdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwLTEgMSAyOSkiIGQ9Im" +
									"0wIDE0aDF2MWgtMXoiLz48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAtMSAxIDI1KSIgZD0" +
									"ibTAgMTJoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMC0xIDEgMjEpIiBk" +
									"PSJtMCAxMGgxdjFoLTF6Ii8+PHBhdGggdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwLTEgMSAxMykiI" +
									"GQ9Im0wIDZoMXYxaC0xeiIvPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMC0xIDEgMTcpIi" +
									"BkPSJtMCA4aDF2MWgtMXoiLz48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAtMSAxIDkpIiB" +
									"kPSJtMCA0aDF2MWgtMXoiLz48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAtMSAxIDQpIiBk" +
									"PSJtMCAxaDF2MmgtMXoiLz48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAtMSA1IDQpIiBkP" +
									"SJtMiAxaDF2MmgtMXoiLz48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAtMSA5IDQpIiBkPS" +
									"JtNCAxaDF2MmgtMXoiLz48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAtMSAxMyAyOSkiIGQ" +
									"9Im02IDE0aDF2MWgtMXoiLz48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAtMSAxMyA0KSIg" +
									"ZD0ibTYgMWgxdjJoLTF6Ii8+PHBhdGggdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwLTEgMTMgMTcpI" +
									"iBkPSJtNSA4aDN2MWgtM3oiLz48cGF0aCBkPSJtNSAxMXYtNWwtMyAyLjV6Ii8+PC9nPjwvc3ZnPg" +
									"=="
								},
								handler: function(menu, menuItem) {
									var editor = menuItem.getEditor();
									if (editor) {
										editor.execCommand("columnInsertBefore");
									}
								}.bind(this),
								caption: resources.localizableStrings.InsertColumnBefore,
								markerValue: "table_insert_column_before"
							},{
								imageConfig: {
									source: Terrasoft.ImageSources.URL,
									url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC" +
									"9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTY" +
									"iPjxnIGZpbGw9IiM5OTkiPjxwYXRoIGQ9Im05IDZoLTh2MWg4di0xIi8+PHBhdGggZD0ibTUgM2gt" +
									"MXYxMWgxdi0xMSIvPjxwYXRoIGQ9Im05IDNoLTF2NGgxdi00Ii8+PHBhdGggZD0ibTkgMTBoLTF2N" +
									"Ggxdi00Ii8+PC9nPjxwYXRoIGZpbGw9IiM3NTc1NzUiIGQ9Im05IDFoLTl2MTRoOXYtMWgtOHYtMT" +
									"FoOHYtMS0xIi8+PHBhdGggZmlsbD0iIzk5OSIgZD0ibTkgMTBoLTh2MWg4di0xIi8+PGcgZmlsbD0" +
									"iIzZiNzg4OSI+PHBhdGggZD0ibTExIDE0aDF2MWgtMXoiLz48cGF0aCBkPSJtMTMgMTRoMXYxaC0x" +
									"eiIvPjxwYXRoIGQ9Im0xNSAxNGgxdjFoLTF6Ii8+PHBhdGggZD0ibTE1IDEyaDF2MWgtMXoiLz48c" +
									"GF0aCBkPSJtMTUgMTBoMXYxaC0xeiIvPjxwYXRoIGQ9Im0xNSA2aDF2MWgtMXoiLz48cGF0aCBkPS" +
									"JtMTUgOGgxdjFoLTF6Ii8+PHBhdGggZD0ibTE1IDRoMXYxaC0xeiIvPjxwYXRoIGQ9Im0xNSAxaDF" +
									"2MmgtMXoiLz48cGF0aCBkPSJtMTMgMWgxdjJoLTF6Ii8+PHBhdGggZD0ibTExIDFoMXYyaC0xeiIv" +
									"PjxwYXRoIGQ9Im05IDE0aDF2MWgtMXoiLz48cGF0aCBkPSJtOSAxaDF2MmgtMXoiLz48cGF0aCBkP" +
									"SJtOCA4aDN2MWgtM3oiLz48cGF0aCBkPSJtMTEgMTF2LTVsMyAyLjV6Ii8+PC9nPjwvc3ZnPg=="
								},
								handler: function(menu, menuItem) {
									var editor = menuItem.getEditor();
									if (editor) {
										editor.execCommand("columnInsertAfter");
									}
								}.bind(this),
								caption: resources.localizableStrings.InsertColumnAfter,
								markerValue: "table_insert_column_after"
							}]
						},
						caption: resources.localizableStrings.Insert,
						markerValue: "table_insert"
					}, {
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIH" +
							"ZpZXdCb3g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9Im5" +
							"vbmUiIHN0cm9rZT0iIzc1NzU3NSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJtMy41IDEzLjVs" +
							"MTAtMTAiLz48cGF0aCBkPSJtMy41IDMuNWwxMCAxMCIvPjwvZz48L3N2Zz4="
						},
						menu: {
							className: "Terrasoft.Menu",
							items: [{
								imageConfig: {
									source: Terrasoft.ImageSources.URL,
									url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC" +
									"9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTY" +
									"iPjxwYXRoIGZpbGw9IiM3NTc1NzUiIGQ9Im0xNiAxNWgtMTZ2LTJoMXYxaDE0di0xMmgtMTR2Mmgt" +
									"MXYtM2gxNnoiLz48ZyBmaWxsPSIjOTk5Ij48cGF0aCBkPSJtMTUgNmgtOHYxaDh2LTEiLz48cGF0a" +
									"CBkPSJtOCAzaC0xdjNoMXYtMyIvPjxwYXRoIGQ9Im04IDExaC0xdjNoMXYtMyIvPjxwYXRoIGQ9Im" +
									"0xMiAzaC0xdjExaDF2LTExIi8+PC9nPjxwYXRoIGZpbGw9IiM3NTc1NzUiIGQ9Im0xNSAyaC0xNHY" +
									"xaDE0di0xIi8+PHBhdGggZmlsbD0iIzk5OSIgZD0ibTE1IDEwaC04djFoOHYtMSIvPjxwYXRoIGZp" +
									"bGw9IiNjY2MiIGQ9Im03IDdoOHYzaC04eiIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmNzA0M" +
									"yIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0ibS44ID" +
									"EwLjhsNC40LTQuNSIvPjxwYXRoIGQ9Im0uOCA2LjNsNC41IDQuNSIvPjwvZz48L3N2Zz4="
								},
								handler: function(menu, menuItem) {
									var editor = menuItem.getEditor();
									if (editor) {
										editor.execCommand("columnDelete");
									}
								}.bind(this),
								caption: resources.localizableStrings.DeleteColumn,
								markerValue: "table_delete_column"
							}, {
								imageConfig: {
									source: Terrasoft.ImageSources.URL,
									url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC" +
									"9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTY" +
									"iPjxnIGZpbGw9IiM5OTkiPjxwYXRoIGQ9Im0xNSA1aC0xNHYxaDE0di0xIi8+PHBhdGggZD0ibTE1" +
									"IDhoLTE0djFoMTR2LTEiLz48cGF0aCBkPSJtNiAzaC0xdjZoMXYtNiIvPjxwYXRoIGQ9Im0xMSAza" +
									"C0xdjZoMXYtNiIvPjwvZz48cGF0aCBmaWxsPSIjNzU3NTc1IiBkPSJtMTUgMmgtMTR2MWgxNHYtMS" +
									"IvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PGcgc3Ryb2tlPSIjZmY3MDQ" +
									"zIiBzdHJva2Utd2lkdGg9IjEuNSI+PHBhdGggZD0ibTUuOCAxNC41bDQuNC00LjUiLz48cGF0aCBk" +
									"PSJtNS44IDEwbDQuNSA0LjUiLz48L2c+PHBhdGggc3Ryb2tlPSIjNzU3NTc1IiBkPSJtNCAxNC41a" +
									"C0zLjV2LTEzaDE1djEzaC0zLjUiLz48L2c+PHBhdGggZmlsbD0iI2NjYyIgZD0ibTYgM2g0djZoLT" +
									"R6Ii8+PC9zdmc+"
								},
								handler: function(menu, menuItem) {
									var editor = menuItem.getEditor();
									if (editor) {
										editor.execCommand("rowDelete");
									}
								}.bind(this),
								caption: resources.localizableStrings.DeleteRow,
								markerValue: "table_delete_row"
							},{
								imageConfig: {
									source: Terrasoft.ImageSources.URL,
									url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTYgMTYiPjxnIGZpbGw9IiM5OTkiPjxwYXRoIGQ9Im0xNSA2aC0xNHYxaDE0di0xIi8+PHBhdGggZD0ibTYgM2gtMXYxMWgxdi0xMSIvPjxwYXRoIGQ9Im0xMSAzaC0xdjZoMXYtNiIvPjwvZz48cGF0aCBmaWxsPSIjNzU3NTc1IiBkPSJtMTYgMWgtMTZ2MTRoOXYtMWgtOHYtMTFoMTR2Nmgxdi04Ii8+PHBhdGggZmlsbD0iIzk5OSIgZD0ibTkgMTBoLTh2MWg4di0xIi8+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmY3MDQzIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJtMTEgMTQuNWw0LjUtNC41Ii8+PHBhdGggZD0ibTExIDEwbDQuNSA0LjUiLz48L2c+PC9zdmc+"
								},
								handler: function(menu, menuItem) {
									var editor = menuItem.getEditor();
									if (editor) {
										editor.execCommand("tableDelete");
									}
								}.bind(this),
								caption: resources.localizableStrings.DeleteTable,
								markerValue: "table_delete"
							}]
						},
						caption: resources.localizableStrings.Delete,
						markerValue: "table_delete_menu"
					}]
				},
				tag: "table",
				markerValue: "table"
			},
			{
				className: "Terrasoft.MemoEdit",
				width: "100%",
				height: "100%",
				tag: "plainText"
			}
		],

		/**
		 * CKeditor fit content enabled flag.
		 * @type {Boolean}
		 */
		fitContent: false,

		/**
		 * Timeout before editor size will be changed to fit content (in miliseconds).
		 * @type {Integer}
		 */
		fitContentDelay: 400,

		/**
		 * Editor size.
		 * @type {Integer}
		 */
		editorHeight: 0,

		//endregion

		//region Constructors: Public

		constructor: function() {
			this.callParent(arguments);
			this.setValueDebounce = new Ext.util.DelayedTask(Terrasoft.emptyFn, this);

		},

		//endregion

		//region Methods: Private

		/**
		 * Sets cursor position at the begining of document.
		 * @private
		 */
		fixCursorInitPosition: function() {
			if (this.value) {
				return;
			}
			var editor = this.editor;
			var editorDocument = editor.document;
			var target = editorDocument.getBody().$;
			var range = new CKEDITOR.dom.range(editorDocument);
			range.setStart(new CKEDITOR.dom.node(target), 0);
			range.collapse();
			var selection = editor.getSelection();
			selection.selectRanges([range]);
			editor.focus();
		},

		/**
		 * Sets Value parameter.
		 * @private
		 * @param {String} value Paramter value.
		 */
		setValue: function(value) {
			const memo = this.memo;
			const editor = this.editor;
			if (editor && memo) {
				if (this.plainTextMode) {
					this.setValueDebounce.delay(this.setValueDelay, this._setMemoValue, this, [value]);
				} else if (value !== this._getEditorValue(editor) || !this.initialValueSet) {
					this.setValueDebounce.delay(this.setValueDelay, this.setEditorValue, this, [value]);
				}
			}
			if (this.value !== value) {
				this.value = value;
				this.fireEvent("changeValue", this.value, this);
				this.plainTextValue = this.value && this.removeHtmlTags(this.value);
				this.fireEvent("changePlainTextValue", this.plainTextValue, this);
			}
			this._updateEditorHeight();
		},

		/**
		 * Gets editor data.
		 * @private
		 * @param editor Editor object.
		 * @return {String} editor data.
		 */
		_getEditorValue: function(editor) {
			let editorData;
			try {
				editorData = editor.getData();
			} catch (e) {
				const editorDocument = editor.document;
				const editorDocumentBody = editorDocument.getBody();
				const dollar = editorDocumentBody.$;
				editorData = dollar && dollar.innerHTML;
			}
			return editorData;
		},

		/**
		 * Sets value to memo.
		 * @private
		 * @param {Object} memo Action.
		 * @param {Object} value Action.
		 */
		_setMemoValue: function(value) {
			const memo = this.memo;
			memo.setValue(value);
			memo.updateScrollHeight();
		},

		/**
		 * Event handler for control mouseDown event.
		 * @private
		 */
		onDocumentMouseDown: function(e) {
			var wrapEl = this.getWrapEl();
			var isInControl = e.within(wrapEl.dom);
			if (!isInControl) {
				this.hideToolbar();
			}
			if (this.plainTextMode || isInControl || !this.focused) {
				return;
			}
			this.setValue(this.getEditorValue());
		},

		/**
		 * CKEDITOR initialization.
		 * @private
		 */
		initCKEDITOR: function() {
			var id = this.id + "-";
			var textArea = Ext.get(id + this.controlElementPrefix + "-textarea");
			var editor = this.editor = CKEDITOR.replace(textArea.dom, this.getEditorConfig());
			editor.setMode("wysiwyg");
			editor.on("selectionChange", this.onSelectionChange, this);
			editor.on("focus", this.onFocus, this);
			editor.on("blur", this.onBlur, this);
			editor.on("instanceReady", this.onInstanceReady, this);
			editor.on("contentDom", this.onContentDom, this);
			editor.on("doubleclick", this.onDoubleClick, this);
			editor.on("openlinkmodalwindow", this.showLinkInputBox, this);
			if (this.plainTextMode) {
				this.changeEditorMode(true);
				if (this.value) {
					this.setValue(this.value);
				}
			}
		},

		/**
		 * Updates controls state by text style.
		 * @private
		 * @param {Object} controlState Control configuration.
		 */
		updateControlsStateByTextStyle: function(controlState) {
			var controls = this.toolbar;
			Terrasoft.each(controls, function(control) {
				var controlClassName = control.className;
				var controlStateValue = controlState[control.tag];
				if (controlClassName === "Terrasoft.Button") {
					this.updateButtonState(control, controlStateValue);
				} else if (controlClassName === "Terrasoft.ComboBoxEdit") {
					this.updateComboBoxState(control, controlStateValue);
				} else if (controlClassName === "Terrasoft.ColorButton") {
					this.updateColorButtonState(control, controlStateValue);
				}
			}, this);
		},

		/**
		 * Updates button state.
		 * @private
		 * @param {Object} control Control.
		 * @param {Object} state Control configuration.
		 */
		updateButtonState: function(control, state) {
			var controlTag = control.tag;
			if (controlTag !== "htmlMode" && controlTag !== "plainMode") {
				control.setPressed(state);
			}
		},

		/**
		 * Updates color button state.
		 * @private
		 * @param {Object} control Control.
		 * @param {Object} state Control configuration.
		 */
		updateColorButtonState: function(control, state) {
			var controlTag = control.tag;
			if (controlTag === "fontColor" || controlTag === "hightlightColor") {
				control.setValue(state);
			}
		},

		/**
		 * Updates combobox state.
		 * @private
		 * @param {Object} control Control.
		 * @param {Object} state Control configuration.
		 */
		updateComboBoxState: function(control, state) {
			var firstLetter = new RegExp("[a-z][A-Z]+", "ig");
			var replaceSymbol = new RegExp("\'", "ig");
			var replaceQuotSymbol = new RegExp("\"", "ig");
			state = state.replace(replaceSymbol, "");
			state = state.replace(replaceQuotSymbol, "");
			var displayValue = state.replace(firstLetter, function(match) {
				return (match[0].toUpperCase() + match.slice(1));
			});
			var itemValue = control.getValue();
			var newItemValue = {
				value: state.toLowerCase(),
				displayValue: displayValue
			};
			if (!Ext.Object.equals(itemValue, newItemValue)) {
				control.setValue(newItemValue);
			}
		},

		/**
		 * Gets controls state by selected text style.
		 * @private
		 * @param {Object[]} elements Selected text elements.
		 * @return {Object} controlState Controls state.
		 */
		getControlsStateByTextStyle: function(elements) {
			var controlState = {
				fontFamily: "",
				fontSize: "",
				fontStyleBold: false,
				fontStyleItalic: false,
				fontStyleUnderline: false,
				numberedList: false,
				bulletedList: false,
				indentList: false,
				outdentList: false,
				maximized: false,
				justifyLeft: true,
				justifyCenter: false,
				justifyRight: false
			};
			elements.forEach(function(element) {
				var elementName = element.getName();
				var elementStyle = element.$.style;
				if (elementStyle) {
					if (!controlState.fontFamily) {
						controlState.fontFamily = elementStyle.fontFamily;
					}
					if (!controlState.fontSize) {
						controlState.fontSize = elementStyle.fontSize.replace("px", "");
					}
					if (!controlState.fontColor) {
						controlState.fontColor = elementStyle.color;
					}
					if (!controlState.hightlightColor) {
						controlState.hightlightColor = elementStyle.background;
					}
					if (!controlState.bulletColor) {
						controlState.bulletColor = elementStyle.background;
					}
					if (!Ext.isEmpty(elementStyle.textAlign)) {
						if (!controlState.justifyCenter && !controlState.justifyRight) {
							controlState.justifyLeft = (elementStyle.textAlign === "left");
							controlState.justifyCenter = (elementStyle.textAlign === "center");
							controlState.justifyRight = (elementStyle.textAlign === "right");
						}
					}
				}
				if (!controlState.bulletedList) {
					controlState.bulletedList = (elementName === "ul");
				}
				if (!controlState.numberedList) {
					controlState.numberedList = (elementName === "ol");
				}
				if (!controlState.fontStyleBold) {
					controlState.fontStyleBold = (elementName === "strong");
				}
				if (!controlState.fontStyleItalic) {
					controlState.fontStyleItalic = (elementName === "em");
				}
				if (!controlState.fontStyleUnderline) {
					controlState.fontStyleUnderline = (elementName === "u");
				}
			}, this);
			if (!controlState.fontFamily) {
				controlState.fontFamily = "Bpmonline Open Sans";
			}
			if (!controlState.fontSize) {
				controlState.fontSize = "14";
			}
			if(this.toolbar && this.toolbar.maximized) {
				controlState.maximized = this.toolbar.maximized.pressed;
			}
			return controlState;
		},

		/**
		 * Ckeditor contentDom event handler.
		 * Subscribes editor on contextmenu, click and keydows events.
		 * @private
		 */
		onContentDom: function() {
			var editor = this.editor;
			var editable = editor.editable();
			editable.on("contextmenu", function(event) {
				event.stop();
			}, this);
			editable.on("click", this.onClick, this);
			editable.on("keydown", this.onHtmlEditKeyDown, this);
			editable.on("keyup", this.onHtmlEditKeyUp, this);
			var editableElement = editable || editor.document;
			editableElement.on("paste", this.onPaste.bind(this), null, {editor: editor});
			this.setupBodyDrop();
		},

		/**
		 * Sets body drop.
		 * @private
		 */
		setupBodyDrop: function() {
			var iframeContentDocument = this.editor.document.$;
			var iframeHtml = iframeContentDocument.querySelector("html");
			if (!this.resizeEnabled) {
				iframeHtml.style.height = "100%";
			}
			iframeHtml.style.width = "100%";
			iframeHtml.style.overflowX = this.fitContent ? "auto" : "hidden";
			var iframeBody = iframeHtml.querySelector("body");
			iframeBody.ondrop = this.onBodyDrop.bind(this);
			if (!this.resizeEnabled) {
				iframeBody.style.height = "100%";
			}
			iframeBody.style.margin = "0";
		},

		/**
		 * Ckeditor instanceReady event handler.
		 * @private
		 */
		onInstanceReady: function() {
			this.initialValueSet = !Ext.isEmpty(this.value)
			this.setValue(this.value || "");
			this.updateToolbar();
			this.applyFontStyle();
			this.setInstanceReadyMarkOut();
			this._updateEditorHeight();
		},

		/**
		 * Drop image on email body.
		 * @param {Object} e Ckeditor drag event.
		 * @private
		 */
		onBodyDrop: function(e) {
			e.preventDefault();
			this.onFilesSelected(e.dataTransfer.files);
		},

		/**
		 * Sets wrap element classes which indicate that ckeditor is initialized.
		 * @private
		 */
		setInstanceReadyMarkOut: function() {
			var wrapEl = this.getWrapEl();
			if (!wrapEl) {
				return;
			}
			wrapEl.addCls("instance-ready");
		},

		/**
		 * Initializes toolbar controls.
		 * @private
		 */
		initControls: function() {
			var toolbar = {};
			var memo = null;
			var items = this.items;
			if (items) {
				items.each(function(item) {
					if (item.tag === "plainText") {
						memo = item;
					} else {
						toolbar[item.tag] = item;
					}
				});
			}
			this.initToolbarItems(toolbar);
			this.initMemo(memo);
			this.initFonts();
		},

		/**
		 * Memo blur event handler.
		 * @private
		 */
		onMemoBlur: function() {
			this.setValue(this.memo.getValue());
		},

		/**
		 * Changes editor text edit mode.
		 * @private
		 * @param {Boolean} plainTextMode Use plain text mode flag.
		 */
		changeEditorMode: function(plainTextMode) {
			if (this.plainTextMode === plainTextMode) {
				return;
			}
			this.plainTextMode = Boolean(plainTextMode);
			this.updateToolbar();
			var memo = this.memo;
			var value;
			if (plainTextMode) {
				value = this.getEditorValue();
			} else {
				value = memo ? memo.getValue() : "";
				if (value) {
					value = "<p>" + value.replace(/\n*$/, "").replace(/\n/g, "</p><p>") + "</p>";
				}
			}
			this.setValue(value);
			this.fireEvent("changePlainTextMode", this.value, this);
		},

		/**
		 * Sets toolbar controls enabled.
		 * @private
		 */
		updateToolbar: function() {
			var id = this.id;
			var toolbar = this.toolbar;
			var memo = this.memo;
			if (!toolbar || !memo) {
				return;
			}
			var plainTextMode = this.plainTextMode;
			var enabled = this.enabled;
			var enabledInRichTextMode = !plainTextMode && enabled;
			var enabledInPlainTextMode = plainTextMode && enabled;
			var hideModeButtons = this.hideModeButtons;
			toolbar.fontFamily.setEnabled(enabledInRichTextMode);
			toolbar.fontSize.setEnabled(enabledInRichTextMode);
			toolbar.fontStyleBold.setEnabled(enabledInRichTextMode);
			toolbar.fontStyleItalic.setEnabled(enabledInRichTextMode);
			toolbar.fontStyleUnderline.setEnabled(enabledInRichTextMode);
			toolbar.fontColor.setEnabled(enabledInRichTextMode);
			toolbar.hightlightColor.setEnabled(enabledInRichTextMode);
			toolbar.numberedList.setEnabled(enabledInRichTextMode);
			toolbar.bulletedList.setEnabled(enabledInRichTextMode);
			toolbar.maximized.setEnabled(enabledInRichTextMode);
			toolbar.indentList.setEnabled(enabledInRichTextMode);
			toolbar.outdentList.setEnabled(enabledInRichTextMode);
			toolbar.justifyLeft.setEnabled(enabledInRichTextMode);
			toolbar.justifyCenter.setEnabled(enabledInRichTextMode);
			toolbar.justifyRight.setEnabled(enabledInRichTextMode);
			toolbar.image.setEnabled(enabledInRichTextMode);
			toolbar.link.setEnabled(enabledInRichTextMode);
			toolbar.htmlMode.setEnabled(enabledInPlainTextMode);
			toolbar.plainMode.setEnabled(enabledInRichTextMode);
			toolbar.htmlMode.setPressed(enabledInRichTextMode);
			toolbar.plainMode.setPressed(enabledInPlainTextMode);
			toolbar.htmlMode.setVisible(!hideModeButtons);
			toolbar.plainMode.setVisible(!hideModeButtons);
			memo.setReadonly(!enabled);
			var extToolbar = Ext.get(id + "-" + this.controlElementPrefix + "-toolbar");
			if (extToolbar) {
				extToolbar.dom.style.display = !enabled ? "none" : "table-cell";
			}
			var extHtmlEdit = Ext.get(id + "-" + this.controlElementPrefix + "-htmltext");
			if (extHtmlEdit) {
				extHtmlEdit.dom.style.display = plainTextMode ? "none" : "table-cell";
			}
			var extPlainText = Ext.get(id + "-" + this.controlElementPrefix + "-plaintext");
			if (extPlainText) {
				extPlainText.dom.style.display = !plainTextMode ? "none" : "table-cell";
			}
			var editor = this.editor;
			if (editor) {
				// TODO: 200083
				try {
					editor.setReadOnly(!enabled);
				} catch (e) {
					if (editor.document) {
						editor.document.getBody().$.contentEditable = enabled;
					}
				}
				if (extHtmlEdit) {
					extHtmlEdit.dom.style.backgroundColor = enabled ? "#ffffff" : "#f9f9f9";
				}
			}
		},

		/**
		 * Removes html tags from string.
		 * @private
		 * @param {String} value Html text.
		 * @return {String} Plain text string.
		 */
		removeHtmlTags: function(value) {
			/*jshint nonbsp: false*/
			value = value.replace(/\t/gi, "");
			value = value.replace(/>\s+</gi, "><");
			if (Ext.isWebKit) {
				value = value.replace(/<div>(<div>)+/gi, "<div>");
				value = value.replace(/<\/div>(<\/div>)+/gi, "<\/div>");
			}
			value = value.replace(/<div>\n <\/div>/gi, "\n");
			value = value.replace(/<p>\n/gi, "");
			value = value.replace(/<div>\n/gi, "");
			value = value.replace(/<div><br[\s\/]*>/gi, "");
			value = value.replace(/<br[\s\/]*>\n?|<\/p>|<\/div>/gi, "\n");
			value = value.replace(/<[^>]+>|<\/\w+>/gi, "");
			value = value.replace(/ /gi, " ");
			value = value.replace(/&/gi, "&");
			value = value.replace(/•/gi, " * ");
			value = value.replace(/–/gi, "-");
			value = value.replace(/"/gi, "\"");
			value = value.replace(/«/gi, "\"");
			value = value.replace(/»/gi, "\"");
			value = value.replace(/‹/gi, "<");
			value = value.replace(/›/gi, ">");
			value = value.replace(/™/gi, "(tm)");
			value = value.replace(/</gi, "<");
			value = value.replace(/>/gi, ">");
			value = value.replace(/©/gi, "(c)");
			value = value.replace(/®/gi, "(r)");
			value = value.replace(/\n*$/, "");
			value = value.replace(/(\n)( )+/, "\n");
			value = value.replace(/(\n)+$/, "");
			return value;
			/*jshint nonbsp: true*/
		},

		/**
		 * Initializes fonts.
		 * @private
		 */
		initFonts: function() {
			var toolbar = this.toolbar;
			var fontFamilyList = toolbar.fontFamily;
			var fontSizeList = toolbar.fontSize;
			fontFamilyList.on("prepareList", this.onFontFamilyPrepareList, this);
			fontFamilyList.on("change", this.onFontFamilyChange, this);
			fontSizeList.on("prepareList", this.onFontSizePrepareList, this);
			fontSizeList.on("change", this.onFontSizeChange, this);
		},

		/**
		 * Creates font family expandable list collection.
		 * @private
		 * @return {Terrasoft.Collection} Font family expandable list collection.
		 */
		createFontSizesList: function() {
			if (!Ext.isEmpty(this.fontSizesCollection)) {
				return this.fontSizesCollection;
			}
			var fontSizes = this.fontSize;
			var fontSizesArr = fontSizes.split(",");
			var fontSizesColl = this.fontSizesCollection = Ext.create("Terrasoft.Collection");
			for (var i = 0; i < fontSizesArr.length; i++) {
				var fontSize = fontSizesArr[i];
				fontSizesColl.add(i, {
					value: fontSize + "px",
					displayValue: fontSize
				});
			}
			return fontSizesColl;
		},

		/**
		 * Creates font size expandable list collection.
		 * @private
		 * @return {Terrasoft.Collection} Font size expandable list collection.
		 */
		createFontFamiliesList: function() {
			if (!Ext.isEmpty(this.fontFamilyCollection)) {
				return this.fontFamilyCollection;
			}
			var fontFamilies = this.fontFamily;
			var fontFamiliesArr = fontFamilies.split(",");
			var fontFamiliesColl = this.fontFamilyCollection = Ext.create("Terrasoft.Collection");
			for (var i = 0; i < fontFamiliesArr.length; i++) {
				var fontFamily = fontFamiliesArr[i];
				fontFamiliesColl.add(i, {
					value: fontFamily,
					displayValue: fontFamily
				});
			}
			fontFamiliesColl.sortByFn(function(elA, elB) {
				var valueA = elA.value;
				var valueB = elB.value;
				if (valueA === valueB) {
					return 0;
				}
				return (valueA < valueB) ? -1 : 1;
			});
			return fontFamiliesColl;
		},

		/**
		 * Fills font family expandable list.
		 * @private
		 */
		onFontFamilyPrepareList: function() {
			var toolbar = this.toolbar;
			var fontFamilyList = toolbar.fontFamily;
			var fontFamiliesColl = this.createFontFamiliesList();
			fontFamilyList.loadList(fontFamiliesColl);
		},

		/**
		 * Fills font size expandable list.
		 * @private
		 */
		onFontSizePrepareList: function() {
			var toolbar = this.toolbar;
			var fontSizeList = toolbar.fontSize;
			var fontSizesColl = this.createFontSizesList();
			fontSizeList.loadList(fontSizesColl);
		},

		/**
		 * Applies selected font family to editor value.
		 * @private
		 * @param {Object} fontFamilyValue Selected font family.
		 */
		onFontFamilyChange: function(fontFamilyValue) {
			if (fontFamilyValue && this.enabled) {
				this.defaultFontFamily = fontFamilyValue.value;
				this.applyFontStyleFamily();
			}
		},

		/**
		 * Applies selected font size to editor value.
		 * @private
		 * @param {Object} fontSizeValue Selected font size.
		 */
		onFontSizeChange: function(fontSizeValue) {
			if (fontSizeValue && this.enabled) {
				this.defaultFontSize = fontSizeValue.value.replace("px", "");
				this.applyFontStyleSize();
			}
		},

		/**
		 * Applies font styles.
		 * @private
		 */
		applyFontStyle: function() {
			this.applyFontStyleFamily();
			this.applyFontStyleSize();
			this.applyFontStyleColor();
			this.applyFontStyleBackgroundColor();
		},

		/**
		 * Applies font family.
		 * @private
		 */
		applyFontStyleFamily: function() {
			var StyleConstructor = CKEDITOR.style;
			this.setStyle(new StyleConstructor({
				element: "span",
				styles: {
					"font-family": "#(family)"
				},
				overrides: [
					{
						element: "font",
						attributes: {
							face: null
						}
					}
				]
			}, {family: this.defaultFontFamily}));
		},

		/**
		 * Applies font size.
		 * @private
		 */
		applyFontStyleSize: function() {
			var StyleConstructor = CKEDITOR.style;
			this.setStyle(new StyleConstructor({
				element: "span",
				styles: {
					"font-size": "#(size)"
				},
				overrides: [
					{
						element: "font",
						attributes: {
							size: null
						}
					}
				]
			}, {size: this.defaultFontSize + "px"}));
		},

		/**
		 * Applies font color.
		 * @private
		 * @param {Boolean} [needFocus] Is need focus flag.
		 */
		applyFontStyleColor: function(needFocus) {
			var StyleConstructor = CKEDITOR.style;
			this.setStyle(new StyleConstructor({
				element: "span",
				styles: {
					color: "#(color)"
				},
				overrides: [
					{
						element: "font",
						attributes: {
							color: null
						}
					}
				]
			}, {color: this.defaultFontColor}), needFocus);
		},

		/**
		 * Applies font background color.
		 * @private
		 * @param {Boolean} [needFocus] Is need focus flag.
		 */
		applyFontStyleBackgroundColor: function(needFocus) {
			var StyleConstructor = CKEDITOR.style;
			this.setStyle(new StyleConstructor({
				element: "span",
				styles: {"background-color": "#(color)"},
				overrides: [
					{
						element: "font",
						attributes: {"background": null}
					}
				]
			}, {color: this.defaultHighlight}), needFocus);
		},

		/**
		 * Applies color styles.
		 * @private
		 * @param {String} color Color.
		 * @param {Boolean} [isForBackground] If true, used for background color, otherwise - for font color.
		 */
		applyColorStyles: function(color, isForBackground) {
			var useFor = (isForBackground) ? "defaultHighlight" : "defaultFontColor";
			if (color) {
				this[useFor] = color;
			}
			var needFocus = true;
			if (isForBackground) {
				this.applyFontStyleBackgroundColor(needFocus);
			} else {
				this.applyFontStyleColor(needFocus);
			}
		},

		/**
		 * Sets editor style.
		 * @private
		 * @param {Object} style Style.
		 * @param {Boolean} [needFocus] Is need focus flag.
		 */
		setStyle: function(style, needFocus) {
			var editor = this.editor;
			if (!editor.document) {
				return;
			}
			if (needFocus) {
				editor.focus();
			}
			editor.fire("saveSnapshot");
			editor.applyStyle(style);
			style.apply(editor.document);
			editor.fire("saveSnapshot");
		},

		/**
		 * Returns CKEDITOR default settings.
		 * @private
		 * @return {Object} CKEDITOR default settings.
		 */
		getEditorConfig: function() {
			/*jshint camelcase: false*/
			return {
				blockedKeystrokes: [
					0x110000 + 66, // CTRL + B
					0x110000 + 73, // CTRL + I
					0x110000 + 85 // CTRL + U
				],
				keystrokes: this.getKeyStrokes(),
				linkShowAdvancedTab: true,
				linkShowTargetTab: true,
				width: "100%",
				height: this.resizeEnabled ? this.initialHeight : "100%",
				resize_enabled: this.resizeEnabled,
				removePlugins: "magicline,elementspath,link,unlink,liststyle,scayt",
				allowedContent: true,
				pasteFromWordRemoveFontStyles: false,
				pasteFromWordRemoveStyles: false,
				enterMode: 3,
				forceEnterMode: true,
				autoUpdateElement: true,
				fillEmptyBlocks: true,
				resize_minHeight: 30,
				resize_maxHeight: 500,
				toolbar: []
			};
			/*jshint camelcase: true*/
		},

		/**
		 * Changes toolbar visibility.
		 * @private
		 * @param {Boolean} show If true, shows toolbar else hides.
		 */
		changeToolbarVisibility: function(show) {
			if (!this.rendered || !this.toolbarEl) {
				return;
			}
			var wrapElClassList = this.toolbarEl.dom.classList;
			if (show) {
				wrapElClassList.add(this.visibleToolbarClass);
			} else {
				wrapElClassList.remove(this.visibleToolbarClass);
			}
		},

		/**
		 * Checks visibility toolbar.
		 * @private
		 * @return {Boolean} Returns true, if toolbar visible.
		 */
		getVisibleToolbar: function() {
			if (this.toolbarEl) {
				var wrapElClassList = this.toolbarEl.dom.classList;
				return wrapElClassList.contains(this.visibleToolbarClass);
			} else {
				return false;
			}
		},

		/**
		 * Checks whether toolbar has expanded elements.
		 * @private
		 * @return {Boolean} Returns true, if toolbar has expanded elements.
		 */
		isToolbarHasExpandedElements: function() {
			if (!this.rendered) {
				return false;
			}
			var fontFamily = this.toolbar.fontFamily;
			var isFontFamilyVisible = fontFamily.listView ? fontFamily.listView.isVisible() : false;
			var fontSize = this.toolbar.fontSize;
			var isFontSizeVisible = fontSize.listView ? fontSize.listView.isVisible() : false;
			var fontColor = this.toolbar.fontColor;
			var isFontColorVisible = fontColor.button.menu ? fontColor.button.menu.isVisible() : false;
			var highlightColor = this.toolbar.hightlightColor;
			var isHighlightColorVisible = highlightColor.button.menu ?
					highlightColor.button.menu.isVisible() : false;
			return (isFontFamilyVisible || isFontSizeVisible || isFontColorVisible || isHighlightColorVisible);
		},

		/**
		 * Updates editor size to fit content size.
		 * @private
		 */
		_updateEditorHeight: function() {
			var maximized = this.toolbar && this.toolbar.maximized;
			if (this.editor && this.fitContent && !(maximized && maximized.pressed) && !this.destroyed) {
				var updateSizeTask = new Ext.util.DelayedTask(function() {
					var editor = this.editor;
					var memo = this.memo;
					var element = this.plainTextMode ? memo.getEl() : editor && editor.editable();
					if (!element) {
						this._updateEditorHeight();
						return;
					}
					var scrollHeight = this.plainTextMode ? element.dom.scrollHeight : element.$.scrollHeight;
					if (scrollHeight > 0 && scrollHeight > this.editorHeight) {
						this.editorHeight = scrollHeight;
						editor.resize("100%", scrollHeight);
					}
				}.bind(this));
				updateSizeTask.delay(this.fitContentDelay);
			}
		},

		//endregion

		//region Methods: Protected

		/**
		 * Sets value to editor.
		 * @protected
		 * @param {Object} editor Editor object.
		 * @param {Object} value Editor Value value.
		 */
		setEditorValue: function(value) {
			const editor = this.editor;
			const editorValue = this.sanitizeValue(value);
			editor.setData(editorValue);
			this.initialValueSet = true;
			const textarea = Ext.get(editor.name);
			if (textarea) {
				textarea.set({"dataset": "true"});
			}
		},

		/**
		 * Sanitizes passed html value.
		 * @protected
		 * @param {String} value Raw html value.
		 * @return {String} Sanitized html value.
		 */
		sanitizeValue: function(value) {
			const needSanitizeHtml = Terrasoft.Features.getIsEnabled("SanitizeHtmlInHtmlEdit");
			return needSanitizeHtml ? Terrasoft.sanitizeHTML(value) : value;
		},

		/**
		 * Creates an instance of the CKEDITOR.dom.element class based on the HTML representation of an element.
		 * @protected
		 * @param {String} html The element HTML. It should define only one element in the "root" level.
		 * The "root" element can have child nodes, but not siblings.
		 * @return {CKEDITOR.dom.element} The element instance.
		 */
		createCkeditorDomElement: function(html) {
			const htmlValue = this.sanitizeValue(html);
			return CKEDITOR.dom.element.createFromHtml(htmlValue);
		},

		/**
		 * Task allowed to make debounce when using a setValue function.
		 * @protected
		 */
		setValueDebounce: null,

		/**
		 * Sets getEditor function into menu items.
		 * @protected
		 * @param {Terrasoft.Menu} menu Menu instance.
		 */
		setGetEditorFunction: function(menu) {
			menu.items.each(function(menuitem) {
				menuitem.getEditor = this.getEditor.bind(this);
				if (menuitem.menu) {
					this.setGetEditorFunction(menuitem.menu);
				}
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.controls.AbstractContainer#prepareItem
		 * @protected
		 * @overridden
		 */
		prepareItem: function(item) {
			var itemEl = this.callParent(arguments);
			if (itemEl && itemEl.menu) {
				this.setGetEditorFunction(itemEl.menu);
				this.menuItems.push(itemEl.menu);
			}
			return itemEl;
		},

		/**
		 * Returns current control ckeditor instance.
		 * @protected
		 * @return {Object} Ckeditor instance.
		 */
		getEditor: function() {
			return this.editor;
		},

		/**
		 * @inheritdoc Terrasoft.controls.Component#init
		 * @protected
		 * @overridden
		 */
		init: function() {
			this.menuItems = [];
			if (!this.validationInfo) {
				this.validationInfo = {
					isValid: true,
					invalidMessage: ""
				};
			}
			this.items = Terrasoft.deepClone(this.itemsConfig);
			this.callParent(arguments);
			this.selectors = {
				wrapEl: ""
			};
			this.images = Ext.create("Terrasoft.Collection");
			this.addEvents(
					/*
					 * @event imageLoaded
					 * Handles loading image.
					 * @param {Object} fileNames Loading file names.
					 */
					"imageLoaded",

					/*
					 * @event imagePasted
					 * Handles pasting image from buffer.
					 * @param {Object} item Pasted image.
					 */
					"imagePasted",

					/**
					 * @event focus
					 */
					"focus",
					/**
					 * @event blur
					 */
					"blur"
			);
		},

		/**
		 * @inheritdoc Terrasoft.controls.Component#initDomEvents
		 * @protected
		 * @overridden
		 */
		initDomEvents: function() {
			this.callParent(arguments);
			var items = this.items.items;
			var fontColorButton = items[5];
			var backgroundColorButton = items[6];
			var htmlEditor = this;
			fontColorButton.on("change", function(color) {
				htmlEditor.applyColorStyles(color);
			});
			fontColorButton.button.on("click", function() {
				htmlEditor.applyColorStyles(null);
			});
			backgroundColorButton.on("change", function(color) {
				htmlEditor.applyColorStyles(color, true);
			});
			backgroundColorButton.button.on("click", function() {
				htmlEditor.applyColorStyles(null, true);
			});
			var validationInfo = this.validationInfo;
			if (!validationInfo.isValid) {
				this.showValidationMessage(validationInfo.invalidMessage);
			}
			var doc = Ext.getDoc();
			doc.on("mousedown", this.onDocumentMouseDown, this);
		},

		/**
		 * Event handler for control keyDown event.
		 * @protected
		 * @param {Object} event Event keyDown.
		 */
		onHtmlEditKeyDown: function(event) {
			var data = event.data;
			if (data && data.getKey() === Ext.EventObject.TAB) {
				this.hideToolbar();
			}
		},

		/**
		 * Event handler for html edit keyUp event.
		 * @protected
		 */
		onHtmlEditKeyUp: function() {
			this._updateEditorHeight();
		},

		/**
		 * Event handler for control keyDown event.
		 * @protected
		 * @param {Terrasoft.MemoEdit} control MemoEdit.
		 * @param {Ext.EventObjectImpl} event Event keyDown.
		 */
		onMemoEditKeyDown: function(control, event) {
			if (event.getKey() === event.TAB) {
				this.hideToolbar();
			}
		},

		/**
		 * Event handler for memoedit keyUp event.
		 * @protected
		 */
		onMemoEditKeyUp: function() {
			this._updateEditorHeight();
		},

		/**
		 * Hides toolbar.
		 * @protected
		 */
		hideToolbar: function() {
			if (!this.getVisibleToolbar()) {
				return;
			}
			var isExpandedElements = this.isToolbarHasExpandedElements();
			if (!isExpandedElements) {
				this.changeToolbarVisibility(false);
			}
		},

		/**
		 * Creates combined control classes.
		 * @protected
		 * @return {Object} Combined control CSS classes.
		 */
		combineClasses: function() {
			var classes = {
				wrapClass: [],
				validationClass: ["html-edit-validation"]
			};
			var wrapClass = classes.wrapClass;
			if (!this.validationInfo.isValid) {
				wrapClass.push("html-edit-error");
			}
			return classes;
		},

		/**
		 * Creates combined control styles.
		 * @protected
		 * @return {Object} Combined control styles object.
		 */
		combineStyles: function() {
			var styles = {
				wrapStyle: {},
				inputStyle: {},
				validationStyle: {}
			};
			var validationStyle = styles.validationStyle;
			if (!this.validationInfo.isValid) {
				validationStyle.display = "block";
			}
			return styles;
		},

		/**
		 * Returns control selectors.
		 * @protected
		 * @return {Object} ###### ##########.
		 */
		combineSelectors: function() {
			var id = "#" + this.id + "-";
			return {
				wrapEl: id + this.controlElementPrefix,
				el: id + this.controlElementPrefix + "-el",
				toolbarEl: id + this.controlElementPrefix + "-toolbar",
				validationEl: id + "validation"
			};
		},

		/**
		 * ######### CSS ##### ######## ########## # ########### ## ##### isValid:
		 * #### isValid ########## # true, ## ######### ##### ############### # ######,
		 * #### isValid ########## # false, ## ########### ##### ############### # ######.
		 * @protected
		 */
		setMarkOut: function() {
			if (!this.rendered) {
				return;
			}
			var validationEl = this.getValidationEl();
			if (!validationEl) {
				return;
			}
			var wrap = this.getWrapEl();
			var errorClass = this.errorClass;
			var validationInfo = this.validationInfo;
			validationEl.setStyle("width", "");
			if (!validationInfo.isValid) {
				wrap.addCls(errorClass);
				this.showValidationMessage(validationInfo.invalidMessage);
			} else {
				wrap.removeCls(errorClass);
				this.showValidationMessage("");
			}
			var wrapWidth = wrap.getWidth();
			var wrapHeight = wrap.getHeight();
			var validationElWidth = validationEl.getWidth();
			if (validationElWidth > wrapWidth) {
				validationEl.setWidth(wrapWidth);
			}
			validationEl.setTop(wrapHeight);
			validationEl.setVisible(!validationInfo.isValid);
		},

		/**
		 * Sets validation information for control.
		 * @protected
		 * @virtual
		 */
		setValidationInfo: function(info) {
			if (this.validationInfo === info) {
				return;
			}
			this.validationInfo = info;
			this.setMarkOut();
		},

		/**
		 * Control destroy event handler.
		 * @protected
		 * @overridden
		 */
		destroy: function() {
			if (this.editor) {
				//TODO refactor try - catch block. Task - http://tscore-task/browse/SD-2747
				try {
					this.editor.destroy();
				} catch (e) {
					delete CKEDITOR.instances[this.editor.name];
					delete this.editor;
				}
			}
			if (this.images) {
				this.images.un("dataLoaded", this.onImagesLoaded, this);
				this.images.un("add", this.onAddImage, this);
			}
			if (this.memo) {
				this.memo.un("blur", this.onMemoBlur, this);
				this.memo.un("focus", this.onFocus, this);
				this.memo.un("keydown", this.onMemoEditKeyDown, this);
				this.memo.un("keyup", this.onMemoEditKeyUp, this);
				delete this.demo;
			}
			if (this.toolbar) {
				delete this.toolbar;
			}
			this.callParent(arguments);
		},

		/**
		 * ############ ###### ### #########.
		 * @protected
		 * @overridden
		 * throws {Terrasoft.ItemNotFoundException}
		 * ### #######, #### ##### ############ ## ##### ####### ########## ############, ##
		 * ##### ############# ######, ####### ##### ########## # XTemplate, ####### ########### ###### ##########
		 * ### ###### - ########## # #####.
		 */
		getTplData: function() {
			var tplData = this.callParent(arguments);
			var controlTplData = this.tplData;
			var classes = controlTplData.classes;
			var styles = controlTplData.styles;
			var htmlEditStyle = styles.htmlEditStyle;
			if (this.height) {
				htmlEditStyle.height = this.height;
			}
			if (this.resizeEnabled) {
				delete htmlEditStyle.height;
			}
			if (this.width) {
				htmlEditStyle.width = this.width;
			}
			if (this.margin) {
				htmlEditStyle.margin = this.margin;
			}
			tplData.htmlEditClass = classes.htmlEditClass;
			tplData.htmlEditToolbarClass = classes.htmlEditToolbarClass;
			tplData.htmlEditToolbarTopClass = classes.htmlEditToolbarTopClass;
			tplData.htmlEditToolbarButtonGroupClass = classes.htmlEditToolbarButtonGroupClass;
			tplData.htmlEditTextareaClass = classes.htmlEditTextareaClass;
			tplData.htmlEditStyle = styles.htmlEditStyle;
			tplData.htmlEditFontFamilyStyle = styles.htmlEditFontFamilyStyle;
			tplData.htmlEditFontSizeStyle = styles.htmlEditFontSizeStyle;
			Ext.apply(tplData, this.combineClasses(), {});
			this.styles = this.combineStyles();
			this.selectors = this.combineSelectors();
			return tplData;
		},

		/**
		 * Event handler "afterrender".
		 * @protected
		 * @overridden
		 */
		onAfterRender: function() {
			this.callParent(arguments);
			this.initControls();
			this.initCKEDITOR();
		},

		/**
		 * Event handler "afterrerender".
		 * @protected
		 * @overridden
		 */
		onAfterReRender: function() {
			this.callParent(arguments);
			this.initControls();
			this.initCKEDITOR();
		},

		/**
		 * ########## ############ ######## # ######. ######### ######### ####### {@link Terrasoft.Bindable}.
		 * @protected
		 * @overridden
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var editorBindConfig = {
				value: {
					changeMethod: "onChangeValue",
					changeEvent: "changeValue",
					validationMethod: "setValidationInfo"
				},
				plainTextValue: {
					changeEvent: "changePlainTextValue"
				},
				plainTextMode: {
					changeMethod: "onChangePlainTextMode",
					changeEvent: "changePlainTextMode"
				},
				enabled: {
					changeMethod: "onChangeEnabled",
					changeEvent: "changeEnabled"
				},
				focused: {
					changeEvent: "focusChanged"
				},
				initialHeight: {
					changeMethod: "onGetInitialHeight"
				},
				images: {
					changeMethod: "onImagesLoaded"
				}
			};
			Ext.apply(editorBindConfig, bindConfig);
			return editorBindConfig;
		},

		/**
		 * ########## ####### "onChangeValue".
		 * @protected
		 * @param {String} value ############### ########.
		 */
		onChangeValue: function(value) {
			this.setValue(value);
		},

		/**
		 * ########## ####### "onChangePlainTextMode".
		 * @protected
		 * @param {Boolean} value ############### ########.
		 */
		onChangeEnabled: function(value) {
			this.setEnabled(value);
		},

		/**
		 * "initialHeight" property change event handler.
		 * @protected
		 * @param {Boolean} value New property value.
		 */
		onGetInitialHeight: function(value) {
			this.initialHeight = value;
		},

		/**
		 * ########## ####### "onChangePlainTextMode".
		 * @protected
		 * @param {Boolean} value ############### ########.
		 */
		onChangePlainTextMode: function(value) {
			this.changeEditorMode(value);
		},

		/**
		 * ######## ######## ######## ##########.
		 * @protected
		 */
		getEditorValue: function() {
			var editor = this.editor;
			if (!this.editor) {
				return this.value;
			}
			if (this.plainTextMode) {
				var plainText = editor.getData();
				return this.removeHtmlTags(plainText);
			} else {
				return editor.getData();
			}
		},

		/**
		 * Open modal window for insert link.
		 * @protected
		 */
		showLinkInputBox: function() {
			var me = this;
			var editor = this.editor;
			var selection = editor.getSelection();
			var inputBoxConfig = {
				link: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					caption: resources.localizableStrings.HyperlinkAddress
				}
			};
			var selectedElement = selection.getSelectedElement();
			var isImageElement = selectedElement && selectedElement.$ && selectedElement.$.nodeName === "IMG";
			if (!isImageElement) {
				var selectedText = selection.getSelectedText() || "";
				Ext.apply(inputBoxConfig, {
					linkText: {
						dataValueType: Terrasoft.DataValueType.TEXT,
						caption: resources.localizableStrings.HyperlinkText,
						value: selectedText,
						customConfig: {
							markerValue: "linktextedit"
						}
					},
					linkColor: {
						dataValueType: Terrasoft.DataValueType.COLOR,
						caption: resources.localizableStrings.HyperlinkColor,
						customConfig: {
							className: "Terrasoft.ColorButton",
							markerValue: "linkcoloredit",
							menuItemClassName: Terrasoft.MenuItemType.COLOR_PICKER,
							defaultValue: "#0000EE"
						}
					}
				});
			}
			Terrasoft.utils.inputBox(
					resources.localizableStrings.HyperlinkDialogCaption,
					me.insertHyperLink,
					["ok", "cancel"],
					this,
					inputBoxConfig,
					{
						defaultButton: 0,
						customWrapClass: isImageElement ? "" : "html-link-popup"
					}
			);
		},

		/**
		 * Maximaze CKEditor to full screen mode.
		 * @protected
		 */
		toggleFullScreanMode: function() {
			var editor = this.editor;
			if (!editor) {
				return;
			}
			editor.execCommand("maximize");
			var body = editor.editable();
			var bodyDom = body.$;
			var document = editor.document;
			var head = document.getHead();
			var toolbarEl = this.toolbarEl;
			var hasCls = toolbarEl.hasCls("html-edit-toolbar-maximized");
			if (hasCls) {
				toolbarEl.removeCls("html-edit-toolbar-maximized");
				body.removeClass("cke_editable_maximized");
			} else {
				toolbarEl.addCls("html-edit-toolbar-maximized");
				body.addClass("cke_editable_maximized");
				toolbarEl.setWidth(bodyDom.clientWidth);
				var styleTpl = "body.cke_editable_maximized { top: {0}px; max-height: {1}px;}";
				var toolbarHeight = toolbarEl.getHeight();
				var style = head.append("style");
				style.appendText(Ext.String.format(styleTpl, toolbarHeight, bodyDom.parentElement.clientHeight - toolbarHeight));
			}
			this.toolbar.maximized.setPressed(!hasCls);
		},

		/**
		 * Inserts hyperlink in editor.
		 * @protected
		 */
		insertHyperLink: function(returnCode, controlData) {
			if (returnCode === "ok") {
				var link = controlData.link.value;
				var linkText = controlData.linkText && controlData.linkText.value || link;
				var linkColor = controlData.linkColor && controlData.linkColor.value || "#0000EE";
				var editor = this.editor;
				this.fixCursorInitPosition();
				if (link) {
					var attributes = {};
					link = Terrasoft.addProtocolPrefix(link);
					attributes.href = link;
					attributes.title = link;
					attributes.target = "_blank";
					attributes["data-cke-saved-href"] = linkText ? linkText : link;
					var selection = editor.getSelection();
					var element = selection.getStartElement();
					if (element.$.tagName === "A") {
						element.setAttributes(attributes);
					} else {
						var ranges = selection.getRanges(true);
						if (ranges.length === 1) {
							var selectedElement = selection.getSelectedElement() && selection.getSelectedElement().$;
							var isImageElement = selectedElement && selectedElement.nodeName === "IMG";
							var linkHtmlTpl = isImageElement
								? "<a target=\"_blank\" href=\"{0}\" title=\"{1}\">{2}</a>"
								: "<a target=\"_blank\" href=\"{0}\" title=\"{1}\" style=\"color: {3}\"><span>{2}</span></a>";
							if (isImageElement) {
								linkText = selectedElement.outerHTML;
							}
							var linkHtml = Ext.String.format(linkHtmlTpl, link, link, linkText, linkColor);
							var linkNode = this.createCkeditorDomElement(linkHtml);
							var range = ranges[0];
							if (!range.collapsed) {
								range.deleteContents();
							}
							range.insertNode(linkNode);
							range.selectNodeContents(linkNode);
							selection.selectRanges(ranges);
						}
					}
					editor.updateElement();
					editor.focus();
				}
			}
		},

		/**
		 * Event handler for control selectionchange event.
		 * @protected
		 * @param {Object} event Event object.
		 */
		onSelectionChange: function(event) {
			var elementPath = event.data.path;
			var elements = elementPath.elements;
			var selectionStyles = this.getControlsStateByTextStyle(elements);
			this.updateControlsStateByTextStyle(selectionStyles);
		},

		/**
		 * Event handler for control focus event.
		 * @protected
		 */
		onFocus: function() {
			if (!this.enabled || !this.rendered) {
				return;
			}
			this.focused = true;
			this.fireEvent("focus", this);
			this.fireEvent("focusChanged", this);
			this.changeToolbarVisibility(true);
			Terrasoft.each(this.menuItems, function(menu) {
				menu.hide();
			});
		},

		/**
		 * Event handler for control blur event.
		 * @protected
		 */
		onBlur: function() {
			if (!this.enabled || !this.rendered) {
				return;
			}
			this.focused = false;
			this.fireEvent("blur", this);
			this.fireEvent("focusChanged", this);
			this.setValue(this.getEditorValue());
		},

		/**
		 * Event handler for control click event.
		 * @protected
		 * @param {Object} event Event object.
		 */
		onClick: function(event) {
			var eventData = event.data;
			var target = eventData.getTarget();
			var targetPath = new CKEDITOR.dom.elementPath(target, this.editor);
			var link = targetPath.contains("a");
			if (eventData.$.ctrlKey && link && link.hasAttribute("href")) {
				eventData.preventDefault();
				var href = link.getAttribute("href");
				window.open(href, "_blank");
			}
		},

		/**
		 * Event handler for control doubleclick event.
		 * @protected
		 * @param {Object} event Event object.
		 */
		onDoubleClick: function(event) {
			var eventData = event.data;
			var target = eventData.element;
			var targetPath = new CKEDITOR.dom.elementPath(target, this.editor);
			var link = targetPath.contains("a");
			if (link && link.hasAttribute("href")) {
				event.cancel();
			}
		},

		/**
		 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
		 * @overridden
		 */
		subscribeForCollectionEvents: function(binding, property, model) {
			this.callParent(arguments);
			var collection = model.get(binding.modelItem);
			collection.on("dataLoaded", this.onImagesLoaded, this);
			collection.on("add", this.onAddImage, this);
		},

		/**
		 * ######### ######## ######## ####### ####### {@link Terrasoft.Bindable} ####### # ######## ####
		 * ##########.
		 * @protected
		 * @overridden
		 */
		subscribeForEvents: function(binding, property, model) {
			this.callParent(arguments);
			if (property !== "value") {
				return;
			}
			var validationMethodName = binding.config.validationMethod;
			if (validationMethodName) {
				var validationMethod = this[validationMethodName];
				model.validationInfo.on("change:" + binding.modelItem,
						function(collection, value) {
							validationMethod.call(this, value);
						},
						this
				);
			}
		},

		/**
		 * Initializes toolbar panel tools.
		 * @protected
		 * @virtual
		 * @param {Object} toolbar Toolbar panel tools.
		 */
		initToolbarItems: function(toolbar) {
			var image = toolbar.image;
			if (!Terrasoft.isEmptyObject(image)) {
				image.un("filesSelected", this.onFilesSelected);
				image.on("filesSelected", this.onFilesSelected, this);
			}
			this.toolbar = toolbar;
		},

		/**
		 * Initialize memo edit instance.
		 * @protected
		 * @virtual
		 * @param {Object} memo Memo edit instance.
		 */
		initMemo: function(memo) {
			memo.height = this.fitContent ? undefined : memo.height;
			memo.on("blur", this.onMemoBlur, this);
			memo.on("focus", this.onFocus, this);
			memo.on("keydown", this.onMemoEditKeyDown, this);
			memo.on("keyup", this.onMemoEditKeyUp, this);
			this.memo = memo;
		},

		/**
		 * ######### ######## ########## ######## ##########.
		 * @protected
		 * @overridden
		 * @param {Boolean} enabled #######.
		 */
		setEnabled: function(enabled) {
			if (enabled !== this.enabled) {
				this.enabled = enabled;
				this.fireEvent("changeEnabled", enabled, this);
				var editor = this.editor;
				if (editor && editor.loaded) {
					this.updateToolbar();
				}
			}
		},

		/**
		 * ########## ########## ###### ### CKEDITOR.
		 * @protected
		 * @return {Array} ########## ###### ### CKEDITOR.
		 */
		getKeyStrokes: function() {
			return [
				[CKEDITOR.CTRL + 75, "openlinkmodalwindow"] // CTRL + K
			];
		},

		/**
		 * @inheritdoc Terrasoft.Component#clearDomListeners
		 * @overridden
		 */
		clearDomListeners: function() {
			this.callParent(arguments);
			var doc = Ext.getDoc();
			doc.un("mousedown", this.onDocumentMouseDown, this);
		},

		/**
		 * Updates  editor size after image pasted.
		 * @protected
		 */
		afterImageInserted: function() {
			this._updateEditorHeight();
		},

		//endregion

		//region Methods: Public

		/**
		 * ##### ########## ###### ## ######### DOM-####### ######### ########## (##. {@link #el el}).
		 * @return {Ext.Element}
		 */
		getValidationEl: function() {
			return this.validationEl;
		},

		/**
		 * Inserts validation text into validation DOM-element {@link #el}.
		 * @param message Validation text.
		 * @return {Ext.Element}
		 */
		showValidationMessage: function(message) {
			this.validationEl.dom.innerHTML = message;
		},

		/**
		 * Loads images to html edit.
		 * @param {Array} files Files array.
		 */
		onFilesSelected: function(files) {
			var invalidFilesType = false;
			for (var i = 0; i < files.length; i++) {
				if (!this.imageRegexPattern.test(files[i].type)) {
					invalidFilesType = true;
				}
			}
			if (!invalidFilesType) {
				this.fireEvent("imageLoaded", files);
			} else {
				Terrasoft.showInformation(resources.localizableStrings.InvalidFileTypeMessage);
			}
		}

		//endregion

	});

	return Terrasoft.HtmlEdit;
});


