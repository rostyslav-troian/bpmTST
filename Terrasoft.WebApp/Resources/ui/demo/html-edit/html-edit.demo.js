
define(["ext-base", "terrasoft", "ckeditor"], function(Ext, Terrasoft) {
	Ext.ns('Terrasoft.controls.HtmlEdit');
	/**
  * Class of text editor control
  */
	Ext.define('Terrasoft.controls.HtmlEdit', {
		extend: 'Terrasoft.Container',
		alternateClassName: 'Terrasoft.HtmlEdit',

		/**
   * default font
   * @type {String}
   */
		defaultFontFamily: 'Times New Roman',

		/**
   * Fonts
   * @type {String}
   */
		fontFamily: 'Verdana,Geneva,Georgia,Times New Roman,Times,Courier New,Courier,Arial,Helvetica,Tahoma,Geneva,' +
				'Trebuchet MS,Arial Black,Gadget,Palatino Linotype,Book Antiqua,Palatino,Lucida Sans Unicode,Lucida ' +
				'Grande,MS Serif,New York,Lucida Console,Monaco,Comic Sans MS',

		/**
   * default font size
   * @type {String}
   */
		defaultFontSize: '14px',

		/**
   * font sizes
   * @type {String}
   */
		fontSize: '8,9,10,11,12,13,14,16,18,20,22,24,26,28,36,48,72',

		/**
   * default font color
   * @type {String}
   */
		defaultFontColor: '#000000',

		/**
   * default background color
   * @type {String}
   */
		defaultBackground: '#ffffff',

		/**
   * default background color
   * @type {String}
   */
		defaultHighlight: '#ffffff',

		/**
   * the default button style
   * @type {Terrasoft control.controls. ButtonEnums. style}
   */
		defaultButtonStyle: Terrasoft.controls.ButtonEnums.style.DEFAULT,

		/**
   * Value
   * @type {String}
   */
		value: '',

		/**
   * Editor link
   * @type {Object}
   */
		editor: null,

		/**
   * plain text mode
   * @type {Boolean}
   */
		plainTextMode: false,

		/**
   * #ontrol width
   * @type {Number}
   */
		width: '100%',

		/**
   * #ontrol height
   * @type {Number}
   */
		height: '350px',

		/**
   * Control activity
   * @type {Boolean}
   */
		enabled: true,

		/**
   * Images
   * @type {Terrasoft.Collection}
   */
		images: null,

		/**
   * CKEDITOR Settings by default
   * @type {Object}
   */
		editorConfig: {
			customConfig: '',
			skin: 'TerrasoftSkin',
			theme: 'TerrasoftTheme',
			plugins: 'basicstyles,bidi,button,clipboard,elementspath,enterkey,entities,htmldataprocessor,indent,' +
					'justify,keystrokes,list,pastefromword,removeformat,resize,sourcearea,tab,undo,wysiwygarea',
			toolbarGroups: [],
			defaultLanguage: 'ru',
			language: 'ru',
			contentsCss:
					"body {" +
							"font-family: " + this.defaultFontFamily + ";" +
							"font-size: " + this.defaultFontSize + ";" +
							"color: " + this.defaultFontColor + ";" +
							"background-color: " + this.defaultBackground + ";" +
							"height:100%" +
							"}\n" +
							".terrasoft-htmledit-invalid { background-color: #FEEEEB; }\n" +
							".terrasoft-htmledit-disabled { background-color: #EBEFF5; }\n" +
							"ol,ul,dl { padding-right:40px; }\n" +
							"p {margin: 0px 0px 0px 0px !important;}\n",
			coreStyles_bold: {
				element: 'strong',
				overrides: 'b'
			},
			coreStyles_italic: {
				element: 'em',
				overrides: 'i'
			},
			coreStyles_underline: {
				element: 'u'
			},
			coreStyles_strike: {
				element: 'strike'
			},
			coreStyles_subscript: {
				element: 'sub'
			},
			coreStyles_superscript: {
				element: 'sup'
			}
		},

		/**
   * Control configuration
   * @private
   * @static
   * @type {Object}
   */
		tplData: {
			classes: {
				htmlEditClass: ['html-editor'],
				htmlEditToolbarClass: ['html-edit-toolbar'],
				htmlEditToolbarTopClass: ['html-edit-toolbar-top'],
				htmlEditToolbarButtonGroupClass: ['html-edit-toolbar-buttongroup'],
				htmlEditTextareaClass: ['html-edit-textarea']
			},
			styles: {
				htmlEditStyle: {
					width: this.width,
					height: this.height
				},
				htmlEditFontFamilyStyle: {
					'vertical-align': 'top',
					width: '165px'
				},
				htmlEditFontSizeStyle: {
					'vertical-align': 'top',
					width: '68px'
				}
			}
		},

		/**
   * Control Panel of the control
   * @private
   * @static
   * @type {Object}
   */
		toolbar: null,

		/**
   * Text control
   * @private
   * @static
   * @type {Object}
   */
		memo: null,

		/**
   * Common control template, contains element markup and method for rendering the content
   * @overridden
   * @type {Array}
   */
		tpl: [
			'<div id="{id}-html-edit" class="{htmlEditClass}" style="{htmlEditStyle}">',
			'<div style="display: table-row;">',
			'<div class="{htmlEditToolbarClass}">',
			'<div id="html-edit-toolbar-font-family" class="{htmlEditToolbarButtonGroupClass}" ' +
				'style="{htmlEditFontFamilyStyle}">',
			'<tpl for="items">',
			'<tpl if="tag == \'fontFamily\'">',
			'<@item>',
			'</tpl>',
			'</tpl>',
			'</div>',
			'<div id="html-edit-toolbar-font-size" class="{htmlEditToolbarButtonGroupClass}" ' +
				'style="{htmlEditFontSizeStyle}">',
			'<tpl for="items">',
			'<tpl if="tag == \'fontSize\'">',
			'<@item>',
			'</tpl>',
			'</tpl>',
			'</div>',
			'<div id="html-edit-toolbar-font-style" class="{htmlEditToolbarButtonGroupClass}">',
			'<tpl for="items">',
			'<tpl if="tag == \'fontStyleBold\' || tag == \'fontStyleItalic\' || tag == \'fontStyleUnderline\'">',
			'<@item>',
			'</tpl>',
			'</tpl>',
			'</div>',
			'<div id="html-edit-toolbar-font-color" class="{htmlEditToolbarButtonGroupClass}">',
			'<tpl for="items">',
			'<tpl if="tag == \'fontColor\'">',
			'	<@item>',
			'</tpl>',
			'</tpl>',
			'</div>',
			'<div id="html-edit-toolbar-highlight" class="{htmlEditToolbarButtonGroupClass}">',
			'<tpl for="items">',
			'<tpl if="tag == \'hightlightColor\'">',
			'	<@item>',
			'</tpl>',
			'</tpl>',
			'</div>',
			'<div id="html-edit-toolbar-list" class="{htmlEditToolbarButtonGroupClass}">',
			'<tpl for="items">',
			'<tpl if="tag == \'numberedList\' || tag == \'bulletedList\'">',
			'<@item>',
			'</tpl>',
			'</tpl>',
			'</div>',
			'<div id="html-edit-toolbar-justify" class="{htmlEditToolbarButtonGroupClass}">',
			'<tpl for="items">',
			'<tpl if="tag == \'justifyLeft\' || tag == \'justifyCenter\' || tag == \'justifyRigth\'">',
			'<@item>',
			'</tpl>',
			'</tpl>',
			'</div>',
			'<div id="html-edit-toolbar-image" class="{htmlEditToolbarButtonGroupClass}">',
			'<tpl for="items">',
			'<tpl if="tag == \'image\'">',
			'<@item>',
			'</tpl>',
			'</tpl>',
			'</div>',
			'<div id="html-edit-toolbar-link" class="{htmlEditToolbarButtonGroupClass}">',
			'<tpl for="items">',
			'<tpl if="tag == \'link\'">',
			'<@item>',
			'</tpl>',
			'</tpl>',
			'</div>',
			'<div id="html-edit-toolbar-justify" class="{htmlEditToolbarButtonGroupClass}">',
			'<tpl for="items">',
			'<tpl if="tag == \'htmlMode\' || tag == \'plainMode\'">',
			'<@item>',
			'</tpl>',
			'</tpl>',
			'</div>',
			'</div>',
			'</div>',
			'<div style="display: table-row;">',
			'<div id="html-edit-htmltext" class="{htmlEditTextareaClass}">',
			'<textarea id="html-edit-textarea"></textarea>',
			'</div>',
			'<div id="html-edit-plaintext" class="{htmlEditTextareaClass}" style="border: none; margin-bottom: 0px;">',
			'<tpl for="items">',
			'<tpl if="tag == \'plainText\'">',
			'<@item>',
			'</tpl>',
			'</tpl>',
			'</div>',
			'</div>',
			'</div>'
		],

		/**
   * Array of control elements of control
   * @overridden
   * @type {Array}
   */
		items: null,

		/**
   * controls configuration
   * @overridden
   * @type {Array}
   */
		itemsConfig: [
			{
				className: 'Terrasoft.ComboBoxEdit',
				tag: 'fontFamily'
			},
			{
				className: 'Terrasoft.ComboBoxEdit',
				tag: 'fontSize'
			},
			{
				className: 'Terrasoft.Button',
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZ" +
						"G9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/I" +
						"iBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iI" +
						"Hg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgI" +
						"CAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjI" +
						"j4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xL" +
						"jAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6L" +
						"y9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvd" +
						"G9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUUyMkFDMkY5MDlDMTFFMkI3MDU5Q" +
						"TIzNkQwM0IyNUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUUyMkFDMzA5MDlDMTFFMkI3MDU5QTIzNkQwM0IyN" +
						"UUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxRTIyQUMyRDkwOUMxMUUyQjcwN" +
						"TlBMjM2RDAzQjI1RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxRTIyQUMyRTkwOUMxMUUyQjcwNTlBMjM2RDAzQ" +
						"jI1RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/P" +
						"vb0WzQAAAB4SURBVHjaYvz//z8DJYBx8BmQl5dXDqQ6sKitAOLOSZMmoQgykWAZyNBydEF8BpwFuRCIhYD4HlTMmBQDs" +
						"IHV6AIseBSDbIMF0HsgTsdmALEuEATimUCcRk4YgPAspICkKAwYyA0DGNhDiQs6gThsCOQFUgFAgAEA6lsmpZrdg90AA" +
						"AAASUVORK5CYII="
				},
				handler: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand('bold');
					}
				},
				tag: 'fontStyleBold'
			},
			{
				className: 'Terrasoft.Button',
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBB" +
						"ZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u" +
						"/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS" +
						"8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgI" +
						"CAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgt" +
						"bnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3h" +
						"hcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Im" +
						"h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvY" +
						"mUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjREQzU3NjE5MDlDMTFF" +
						"Mjg3NjdFMTJCRDUxQjVFRjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjREQzU3NjI5MDlDMTFFMjg3NjdFMTJ" +
						"CRDUxQjVFRjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNERDNTc1RjkwOU" +
						"MxMUUyODc2N0UxMkJENTFCNUVGMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyNERDNTc2MDkwOUMxMUUyODc2N" +
						"0UxMkJENTFCNUVGMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0" +
						"IGVuZD0iciI/Pou8qywAAAB6SURBVHjaYvz//z8DJYBx8BmQl5eHzC0H4jQoe9akSZM60Q1gImDBeyAWBOLVUIwBWIg" +
						"wAAQ6kdgkucAYiO/h0kyMAaG4nE6MASDblYB4D7kGuECdf5ZcAwg6H58BxlB8lhwDQInnDJTdQcgAbOlgFpLT3w/+zA" +
						"QQYABagCf8oBPPXwAAAABJRU5ErkJggg=="
				},
				handler: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand('italic');
					}
				},
				tag: 'fontStyleItalic'
			},
			{
				className: 'Terrasoft.Button',
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBB" +
						"ZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u" +
						"/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS" +
						"8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgI" +
						"CAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgt" +
						"bnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3h" +
						"hcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Im" +
						"h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvY" +
						"mUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzA4QTRCN0E5MDlDMTFF" +
						"MkI1MTRFMzcxRUVCM0U3RjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzA4QTRCN0I5MDlDMTFFMkI1MTRFMzc" +
						"xRUVCM0U3RjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMDhBNEI3ODkwOU" +
						"MxMUUyQjUxNEUzNzFFRUIzRTdGNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMDhBNEI3OTkwOUMxMUUyQjUxN" +
						"EUzNzFFRUIzRTdGNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0" +
						"IGVuZD0iciI/PuosCNQAAABzSURBVHjaYvz//z8DJYBxcBmQl5cHosqBuAMkh6bWBYh3g8QnTZoEF2RioBCMGkAjA+5" +
						"BaWM0cRD/LDEG7IEaMhOIlZDSACh9zCLGgPdAHAZl3wViUEpbBcSd2AxgweE1kFNN6BKI6C5IgGJCwAHGAAgwADMLHb" +
						"9RAqpSAAAAAElFTkSuQmCC"
				},
				handler: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand('underline');
					}
				},
				tag: 'fontStyleUnderline'
			},
			{
				className: 'Terrasoft.ColorButton',
				simpleMode: false,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgklEQVR42u2SPQrA' +
						'IAyFPbCjq6t7J1dXR8/gETxQylewtCD+QbcGHoboe0lMlPrSjDECtsg554ustRb8ZQHvvYQQhBMsC9TMAH+JnFJ' +
						'69Y5PbFrAOScxxptAK8SmyKWUg5Jb4G4oQGZrrbRG+qyqO/vWQ2LDnag/3iq1tra1E7/17QRe1HY6DA0erQAAAA' +
						'BJRU5ErkJggg=='
				},
				tag: 'fontColor'
			},
			{
				className: 'Terrasoft.ColorButton',
				simpleMode: true,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHUlEQVR42mPY++L3f' +
						'0owA9UNaOqd9L+lrf3/03cf4WLltfX/t+3a8//i62/4Ddh0/cX/opLS/6Wlpf8vXb32//jLn6QZMH3djv/902b9n' +
						'zR95v+FK1b/v/HmK9yAeQsW/i8GGpyTk/O/v7///6O3nzANqGnt/L/38NH/aw+c/F8MdMmb9x/gBrQCvXX36Yv/W' +
						'68/B7ty5+7dYBfBDVh7/h5YAqapsKTs/6kzZ/+fevUDbMC6jZv/X3kNcVH71Dn/Zy1Y9P/2my8IAyYtWw92HjJes' +
						'GABWBF6GIAMgHkRbgDIxoOHj/w/9+o7mL/8+FWwix4/e47ihfVAl4IMP3PmDNh1YAMW7T+N4mf06KusrfvfCww4d' +
						'JdRJyGNAsoBAPPZRpvh9VREAAAAAElFTkSuQmCC'
				},
				tag: 'hightlightColor'
			},
			{
				className: 'Terrasoft.Button',

				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQB" +
						"BZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i7" +
						"7u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV" +
						"0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowM" +
						"SAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW5" +
						"0YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY" +
						"29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3R" +
						"SZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vb" +
						"D0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTEwN0RDODY" +
						"5MDlDMTFFMkIzOTc4OUMwNkIxRDEzRUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTEwN0RDODc5MDlDMTFFM" +
						"kIzOTc4OUMwNkIxRDEzRUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MTA" +
						"3REM4NDkwOUMxMUUyQjM5Nzg5QzA2QjFEMTNFQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MTA3REM4NTkwO" +
						"UMxMUUyQjM5Nzg5QzA2QjFEMTNFQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4" +
						"gPD94cGFja2V0IGVuZD0iciI/PlEf/lMAAACTSURBVHjaYszNzWUAggIgDgBih0mTJjGQApigtAADmYAFSjcA8QF0y" +
						"by8vP/EGoALMBLrBRBwoMQLWAExAQpygQIQX4BiBVJdADLgAzQKHwCxATleABkwAUpvIDUWQC5IQHKBA5ZYwItBLlg" +
						"AxQwDHgsPKIkFWCCS5QUBqO2wQFxAal4QgLqAAeoV5DAgmBcAAgwAG7UkpS8YIAMAAAAASUVORK5CYII="
				},
				handler: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand('numberedlist');
					}
				},
				tag: 'numberedList'
			},
			{
				className: 'Terrasoft.Button',
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQB" +
						"BZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i7" +
						"7u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV" +
						"0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowM" +
						"SAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW5" +
						"0YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY" +
						"29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3R" +
						"SZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vb" +
						"D0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUY3QjFENDc" +
						"5MDlDMTFFMkIyQjZEMDAwRDEzMDRFNjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUY3QjFENDg5MDlDMTFFM" +
						"kIyQjZEMDAwRDEzMDRFNjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5Rjd" +
						"CMUQ0NTkwOUMxMUUyQjJCNkQwMDBEMTMwNEU2NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RjdCMUQ0NjkwO" +
						"UMxMUUyQjJCNkQwMDBEMTMwNEU2NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4" +
						"gPD94cGFja2V0IGVuZD0iciI/PhfrCd8AAABFSURBVHjaYvz//z8DJYARZEBeXh7MFMZJkyaRZAALNkEkA/ECoGWMM" +
						"AMY0V1GrAuYGCgEjFQJxNFYGI0FSmOBYi8ABBgAsR0zC1Ifrk0AAAAASUVORK5CYII="
				},
				handler: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand('bulletedlist');
					}
				},
				tag: 'bulletedList'
			},
			{
				className: 'Terrasoft.Button',
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBB" +
						"ZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u" +
						"/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS" +
						"8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgI" +
						"CAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgt" +
						"bnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3h" +
						"hcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Im" +
						"h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvY" +
						"mUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTlBRDNEMTc5MDlDMTFF" +
						"MjkxNTdDRjFFRkQ3QTgxOEUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTlBRDNEMTg5MDlDMTFFMjkxNTdDRjF" +
						"FRkQ3QTgxOEUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBOUFEM0QxNTkwOU" +
						"MxMUUyOTE1N0NGMUVGRDdBODE4RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBOUFEM0QxNjkwOUMxMUUyOTE1N" +
						"0NGMUVGRDdBODE4RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0" +
						"IGVuZD0iciI/Pq9NSeIAAABHSURBVHjaYvz//z8DJYCRKgbk5eWRZcqkSZMYWUAMWVlZRnJdwMRAIQC74PHjx0R5AeT" +
						"S0tJSTAMG1AujsTAsYoHi3AgQYACNoyozyMv+kwAAAABJRU5ErkJggg=="
				},
				handler: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand('justifyleft');
					}
				},
				tag: 'justifyLeft'
			},
			{
				className: 'Terrasoft.Button',
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBB" +
						"ZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u" +
						"/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS" +
						"8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgI" +
						"CAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgt" +
						"bnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3h" +
						"hcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Im" +
						"h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvY" +
						"mUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjNFM0EyQzM5MDlDMTFF" +
						"MjhFRjVBQ0U5RjU1OEIzQkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjNFM0EyQzQ5MDlDMTFFMjhFRjVBQ0U" +
						"5RjU1OEIzQkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCM0UzQTJDMTkwOU" +
						"MxMUUyOEVGNUFDRTlGNTU4QjNCRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCM0UzQTJDMjkwOUMxMUUyOEVGN" +
						"UFDRTlGNTU4QjNCRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0" +
						"IGVuZD0iciI/PrcK9twAAABTSURBVHjaYvz//z8DJYCRKgbk5eWRZcqkSZMYWUAMWVlZRnJdwMRAIUAJA2K9AnI6jA3" +
						"2Qnd3NwO5XqGOF0Z4LIANgMUCMaC0tHSQxQLFuREgwABgSzSs1jl5JgAAAABJRU5ErkJggg=="
				},
				handler: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand('justifycenter');
					}
				},
				tag: 'justifyCenter'
			},
			{
				className: 'Terrasoft.Button',
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBB" +
						"ZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u" +
						"/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS" +
						"8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgI" +
						"CAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgt" +
						"bnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3h" +
						"hcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Im" +
						"h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvY" +
						"mUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzBBMTg3MzI5MDlDMTFF" +
						"MkEwMTU5RjhGM0FEMEI4QUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzBBMTg3MzM5MDlDMTFFMkEwMTU5Rjh" +
						"GM0FEMEI4QUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDMEExODczMDkwOU" +
						"MxMUUyQTAxNTlGOEYzQUQwQjhBRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDMEExODczMTkwOUMxMUUyQTAxN" +
						"TlGOEYzQUQwQjhBRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0" +
						"IGVuZD0iciI/PlDMaHUAAABRSURBVHjaYvz//z8DJYCRKgbk5eWRZcqkSZMYWUAMWVlZRnJdwMRAIcAIg+7ubobHjx/" +
						"/J8kL6IAUL1HsBbALyI0FUBCMxsJgiAWKcyNAgAEASngqCR1xadsAAAAASUVORK5CYII="
				},
				handler: function() {
					var container = this.ownerCt;
					var editor = container.editor;
					if (editor) {
						editor.execCommand('justifyright');
					}
				},
				tag: 'justifyRigth'
			},
			{
				className: 'Terrasoft.Button',
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZ" +
						"G9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/I" +
						"iBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iI" +
						"Hg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgI" +
						"CAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjI" +
						"j4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xL" +
						"jAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6L" +
						"y9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvd" +
						"G9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzdDODRFREY5MDlDMTFFMkJEMDRGM" +
						"kY1QTYwNTYwNzQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzdDODRFRTA5MDlDMTFFMkJEMDRGMkY1QTYwNTYwN" +
						"zQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDN0M4NEVERDkwOUMxMUUyQkQwN" +
						"EYyRjVBNjA1NjA3NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDN0M4NEVERTkwOUMxMUUyQkQwNEYyRjVBNjA1N" +
						"jA3NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/P" +
						"gMDb18AAAC+SURBVHjaYpw9ezYDKYCJgURAsgYWPHLR0dGcnJz79u65d/8BYRucnZ2AqoEMJ2cXopz04f0HKOPDB3xOA" +
						"hqgoKR47979s+fOAbnsHOzHjh3HpyE8PJybl1dQ4BxQA0QPvlAKCAgAqgYyDI2MpKUkgAwtLU0rK0vsNnh6eoqIiCC4X" +
						"j7Hjh21srIGsn/++Am3jQkWJs5SUlJotkNUQyxUUlJE0aCoqMjIyIgnTuzs7FGcNGfOnEGTlkjWABBgAESFMSI5ChAqA" +
						"AAAAElFTkSuQmCC"
				},
				fileUpload: true,
				tag: 'image'
			},
			{
				className: 'Terrasoft.Button',
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQB" +
						"BZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i7" +
						"7u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV" +
						"0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowM" +
						"SAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW5" +
						"0YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY" +
						"29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3R" +
						"SZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vb" +
						"D0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDFEOTc4NTc" +
						"5MDlDMTFFMkI3MDJCNDA4RTBFN0M3MkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDFEOTc4NTg5MDlDMTFFM" +
						"kI3MDJCNDA4RTBFN0M3MkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEMUQ" +
						"5Nzg1NTkwOUMxMUUyQjcwMkI0MDhFMEU3QzcyQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEMUQ5Nzg1NjkwO" +
						"UMxMUUyQjcwMkI0MDhFMEU3QzcyQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4" +
						"gPD94cGFja2V0IGVuZD0iciI/Po4DONkAAAFaSURBVHjahFO9boMwEL4ixIZUiQW2dICJId2YUCrxArxB+gTpq3Rma" +
						"PIEoTNLxcREM8ACS5iYQB1YYKoP2chYTvJJJ7B9P9+dPz9FUQQC9sQOxLbC/g+xE7Ejv6lw/xjwS+xLEozY0TP02bB" +
						"NlQs+h2G40TQNhmFYRWZZBl3XiYVeiV0ZgzMuyrKEvu/BsqzF6rqeg3Vd53M+05i5hQ9KaVdVFSRJAtM0LZ6e54HjO" +
						"EDYiUmQyV6hA1uBowvYku/789e2bdH1oPADYWjbdrVGRsgsz3PRdatKpg1FUYDrujCOIzRNMyfErwzSBKwi9oxzuQf" +
						"11gFWZa3gIA3DEK9zEdIFHgDbwSsNgkA8ijHB56MEjAm2hLfB4Vuh2r7LAsXEFMlpBN/GkSnxndjfrQSmac7DxNuhQ" +
						"N+Qf0wXqm0pE5R4mqZ85RdWkH+NV5oE2cQSZcb07I1n+y/AAMBAh+gKYFCSAAAAAElFTkSuQmCC"
				},
				handler: function() {
					var container = this.ownerCt;
					if (container) {
						container.showLinkInputBox();
					}
				},
				tag: 'link'
			},
			{
				className: 'Terrasoft.Button',
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQ" +
						"BBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0" +
						"i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6" +
						"bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1N" +
						"zowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi" +
						"1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWR" +
						"vYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1s" +
						"bnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhd" +
						"G9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Qj" +
						"MwNkMyOUI5MTZCMTFFMjgyQ0JCRTA4Mjk0QTEyODkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjMwNkMyOUM" +
						"5MTZCMTFFMjgyQ0JCRTA4Mjk0QTEyODkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1w" +
						"LmlpZDpCMzA2QzI5OTkxNkIxMUUyODJDQkJFMDgyOTRBMTI4OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCM" +
						"zA2QzI5QTkxNkIxMUUyODJDQkJFMDgyOTRBMTI4OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3" +
						"g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pvt7gXwAAAEdSURBVHjaxFOhjgIxEO02aBIEEgQrwZVgMavPgTu" +
						"7YFag+AXQa+74BOqwXHL+Ag594uwlNOEHljfklTQ1JEDCJC9tZ+bNvJnNJlVVqUdMq2dbURQLoHGXAhAzHHMgu3eE" +
						"PDpvWhJ0F9lbwAEGSMuydGFy7+MnZ+wXWB2mA6ej7pZoxCpA3nE0y3MbjzACvpjg+Pbkju+Mrj7HiF9TvmFXQ6JIN" +
						"FyqAkneKbAEKQuXrIPuexYwvKtQBe+7KK4SLk8C/XBp8ItPpKff3XfpuAbGUGO5zE+JaS853niwzBG7Ko6mWPiq4M" +
						"i7LGciheDL+RWE6P7r7c2hNXxj3p6FLmPXRLqvFqiwLHix5ulP/DOSrHx/jLEUJcnL/8azAAMA90ppEQp9yE4AAAA" +
						"ASUVORK5CYII="
				},
				handler: function() {
					var container = this.ownerCt;
					if (container) {
						container.changeEditorMode(false);
					}
				},
				tag: 'htmlMode'
			},
			{
				className: 'Terrasoft.Button',
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBB" +
						"ZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u" +
						"/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS" +
						"8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgI" +
						"CAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgt" +
						"bnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3h" +
						"hcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Im" +
						"h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvY" +
						"mUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzZEQkFBMUI5MTZCMTFF" +
						"MjkyOTJCREE1NDg0MzEwNzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzZEQkFBMUM5MTZCMTFFMjkyOTJCREE" +
						"1NDg0MzEwNzciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDNkRCQUExOTkxNk" +
						"IxMUUyOTI5MkJEQTU0ODQzMTA3NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDNkRCQUExQTkxNkIxMUUyOTI5M" +
						"kJEQTU0ODQzMTA3NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0" +
						"IGVuZD0iciI/PvMTT+oAAABiSURBVHjaYvz//z8DJYBxcBiQl5eHLg4ylZGQ5kmTJjEwYRGHaSbKaUwMFAIWEtUju4o" +
						"RmwuQ/Y7NG4xI+D/VvfAfizPRXfWfUBgw4vE3etRS1wv4Eg4jvrTBOPQzE0CAAQBhVikKBa4ILAAAAABJRU5ErkJggg=="
				},
				handler: function() {
					var container = this.ownerCt;
					if (container) {
						container.changeEditorMode(true);
					}
				},
				tag: 'plainMode'
			},
			{
				className: 'Terrasoft.MemoEdit',
				width: '100%',
				height: '100%',
				tag: 'plainText'
			}
		],

		/**
   * control initialization
   * @protected
   * @override
   */
		init: function() {
			this.items = Terrasoft.deepClone(this.itemsConfig);
			this.callParent(arguments);
			this.selectors = {
				wrapEl: ''
			};
			this.images = Ext.create('Terrasoft.Collection');
			this.addEvents(
					/*
					 * @event changeTypedValue
					 */
					'imageLoaded'
			);
		},

		/**
   * Initializes the subscription to the DOM events of the control
   * @overridden
   * @protected
   */
		initDomEvents: function() {
			this.callParent(arguments);
			var applyColorStyles = function(color, self, isForBackground) {
				var useFor = (isForBackground) ? 'defaultHighlight' : 'defaultFontColor';
				var container = self.ownerCt;
				if (container) {
					if (color) {
						container[useFor] = color;
						container.applyFontStyle();
						container.setValue(container.getEditorValue());
					} else {
						container.applyFontStyle();
					}
				}
			};
			var fontColorButton = this.items.items[5];
			var backgroundColorButton = this.items.items[6];
			fontColorButton.on('change', function(color) {
				applyColorStyles(color, this);
			}, fontColorButton);
			fontColorButton.button.on('click', function(color) {
				applyColorStyles(null, this);
			}, fontColorButton);
			backgroundColorButton.on('change', function(color) {
				applyColorStyles(color, this, true);
			}, backgroundColorButton);
			backgroundColorButton.button.on('click', function(color) {
				applyColorStyles(null, this, true);
			}, backgroundColorButton);
		},

		/**
   * Deleting the control
   * @protected
   * @override
   */
		onDestroy: function() {
			var editor = this.editor;
			if (editor) {
				editor.destroy();
			}
			var memo = this.memo;
			memo.un('blur', function(value) {
				this.setValue(memo.getValue());
			}, this);
			this.callParent(arguments);
		},

		/**
   * Calculates the data for the template
   * @protected
   * @overridden
   * throws {Terrasoft.ItemNotFoundException}
   * If a suitable configuration is not found among the configurations, then
   * an error will be generated that will be processed in the XTemplate.
   * Look in the logs to detect this  error.
   */
		getTplData: function() {
			var tplData = this.callParent(arguments);
			this.selectors.wrapEl = '#' + this.id + '-html-edit';
			var controlTplData = this.tplData;
			var classes = controlTplData.classes;
			var styles = controlTplData.styles;
			var htmlEditStyle = styles.htmlEditStyle;
			htmlEditStyle['height'] = this.height;
			htmlEditStyle['width'] = this.width;
			tplData.htmlEditClass = classes.htmlEditClass;
			tplData.htmlEditToolbarClass = classes.htmlEditToolbarClass;
			tplData.htmlEditToolbarTopClass = classes.htmlEditToolbarTopClass;
			tplData.htmlEditToolbarButtonGroupClass = classes.htmlEditToolbarButtonGroupClass;
			tplData.htmlEditTextareaClass = classes.htmlEditTextareaClass;
			tplData.htmlEditStyle = styles.htmlEditStyle;
			tplData.htmlEditFontFamilyStyle = styles.htmlEditFontFamilyStyle;
			tplData.htmlEditFontSizeStyle = styles.htmlEditFontSizeStyle;
			return tplData;
		},

		/**
   * The "afterrender" event handler
   * @protected
   * @overridden
   * @param  {Terrasoft.Menu} component menu component
   * @param  {HTMLElement} containerEl  DOM container element
   */
		onAfterRender: function(index) {
			this.callParent(arguments);
			this.initCKEDITOR();
		},

		/**
   * The "afterrerender" event handler
   * @protected
   * @overridden
   * @param  {Terrasoft.Menu} component menu component
   * @param  {HTMLElement} containerEl  DOM container element
   */
		onAfterReRender: function(index) {
			this.callParent(arguments);
			this.initCKEDITOR();
		},

		/**
   * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
   * @protected
   * @overridden
   */
		getBindConfig: function(model) {
			var bindConfig = this.callParent(arguments);
			var editorBindConfig = {
				value: {
					changeMethod: 'onChangeValue',
					changeEvent: 'changeValue'
				},
				plainTextMode: {
					changeMethod: 'onChangePlainTextMode',
					changeEvent: 'changePlainTextMode'
				},
				enabled: {
					changeMethod: 'onChangeEnabled',
					changeEvent: 'changeEnabled'
				},
				images: {
					changeMethod: 'onImagesLoaded'
				}
			};
			Ext.apply(editorBindConfig, bindConfig);
			return editorBindConfig;
		},

		/**
   * The 'onChangeValue' event handler
   * @protected
   * @param value {String}
   */
		onChangeValue: function(value) {
			this.setValue(value);
		},

		/**
   * The 'onChangePlainTextMode' event handler
   * @protected
   * @param value {String}
   */
		onChangeEnabled: function(value) {
			this.setEnabled(value);
		},

		/**
   * The 'onChangePlainTextMode' event handler
   * @protected
   * @param value {String}
   */
		onChangePlainTextMode: function(value) {
			this.changeEditorMode(value);
		},

		/**
   * Sets the value of the Value parameter
   * private
   * @param value {String}
   */
		setValue: function(value) {
			var memo = this.memo;
			var editor = this.editor;
			if (editor && memo) {
				if (this.plainTextMode) {
					memo.setValue(value);
				} else {
					var editorData = '';
					try {
						editorData = editor.getData();
					}
					catch (e) {
						var editorDocument = editor.document;
						var editorDocumentBody = editorDocument.getBody();
						editorData = editorDocumentBody.$.innerHTML;
					}
					if (value !== editorData) {
						editor.setData(value);
					}
				}
			}
			if (this.value !== value) {
				this.value = value;
				this.fireEvent('changeValue', this.value, this);
			}
		},

		/**
   * Sets the value of the Value parameter
   * private
   * @param value {String}
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
   * Opens the link insertion dialog
   * @protected
   */
		showLinkInputBox: function() {
			var me = this;
			Terrasoft.utils.inputBox(
					resources.localizableStrings.HyperlinkDialogCaption,
					me.insertHyperLink,
					['ok', 'cancel'],
					this,
					{
						link: {
							dataValueType: Terrasoft.DataValueType.TEXT,
							caption: resources.localizableStrings.HyperlinkAddress
						},
						linkText: {
							dataValueType: Terrasoft.DataValueType.TEXT,
							caption: resources.localizableStrings.HyperlinkText
						}
					},
					{
						defaultButton: 0
					}
			);
		},

		/**
   * Closing handler
   * @protected
   */
		insertHyperLink: function(returnCode, controlData) {
			if (returnCode === 'ok') {
				var link = controlData['link'].value;
				var linkText = controlData['linkText'].value;
				var editor = this.editor;
				if (link && link !== 'http:/' + '/') {
					var attributes = {};
					attributes.href = link;
					attributes['data-cke-saved-href'] = linkText ? linkText : link;
					var editorDocument = editor.document;
					var selection = editor.getSelection();
					var element = selection.getStartElement();
					if (element.$.tagName === 'A') {
						element.setAttributes(attributes);
					} else {
						var ranges = selection.getRanges(true);
						if (ranges.length === 1 && ranges[0].collapsed) {
							var text = new CKEDITOR.dom.text(attributes['data-cke-saved-href'], editorDocument);
							ranges[0].insertNode(text);
							ranges[0].selectNodeContents(text);
							selection.selectRanges(ranges);
						}
						var style = new CKEDITOR.style({
							element: 'a',
							attributes: attributes
						});
						style.type = CKEDITOR.STYLE_INLINE;
						style.apply(editorDocument);
					}
				}
				editor.updateElement();
				editor.focus();
			}
		},

		/**
   *  CKEDITOR initialization
   * @private
   */
		initCKEDITOR: function() {
			var textArea = Ext.get("html-edit-textarea");
			CKEDITOR.replace(textArea.dom, this.editorConfig);
			this.editor = CKEDITOR.instances["html-edit-textarea"];
			this.editor.setMode('wysiwyg');
			this.applyFontStyle();
			this.editor.on('blur', function(htmlEdit) {
				this.setValue(this.getEditorValue());
			}, this);
			this.editor.on('instanceReady', function() {
				this.initControls();
				this.updateToolbar();
				if (this.value) {
					this.setValue(this.value);
				}
			}, this);
		},

		/**
		 * @inheritDoc Terrasoft.Bindable#subscribeForCollectionEvents
		 * @protected
		 */
		subscribeForCollectionEvents: function(binding, property, model) {
			this.callParent(arguments);
			var collection = model.get(binding.modelItem);
			collection.on('dataLoaded', this.onImagesLoaded, this);
			collection.on('add', this.onAddImage, this);
		},

		/**
   * The 'dataLoaded' event handler for the Terrasoft.Collection
   * @protected
   * @param collection {Terrasoft.Collection}
   */
		onImagesLoaded: function(collection) {
			this.images = collection;
			this.images.eachKey(function(key, item, index, length) {
				this.onAddImage(item, index, key, true);
			}, this);
		},

		/**
   * The 'add' event handler for the Terrasoft.Collection
   * @protected
   * @param item {Terrasoft.BaseViewModel}
   */
		onAddImage: function(item, index, key, cancelPositionProcess) {
			var imageElement = this.editor.document.createElement('img');
			imageElement.setAttribute('alt', item.get('fileName'));
			imageElement.setAttribute('src', item.get('url'));
			this.editor.insertElement(imageElement);
		},

		/**
   * Initialization of the controls
   * @private
   */
		initControls: function() {
			var self = this;
			var toolbar = new Object();
			var memo = null;
			var items = this.items;
			if (items) {
				items.each(function(item) {
					if (item.tag === 'plainText') {
						memo = item;
					} else {
						toolbar[item.tag] = item;
					}
				});
			}
			memo.on('blur', function(value) {
				self.setValue(memo.getValue());
			}, self);
			var image = toolbar['image'];
			image.on('filesSelected', function(files) {
				var imageFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
				var invalidFilesType = false;
				for (var i = 0; i < files.length; i++) {
					if (!imageFilter.test(files[i].type)) {
						invalidFilesType = true;
					}
				}
				if (!invalidFilesType) {
					self.fireEvent('imageLoaded', files);
				} else {
					throw new Terrasoft.UnsupportedTypeException({
						message: resources.localizableStrings.InvalidFileTypeMessage
					});
				}
			});
			self.toolbar = toolbar;
			self.memo = memo;
			self.initFonts();
		},

		/**
   * Changing the control mode
   * @private
   * @param plainTextMode {Boolean} Normal text mode
   */
		changeEditorMode: function(plainTextMode) {
			if (this.plainTextMode === plainTextMode) {
				return;
			} else {
				this.plainTextMode = !!plainTextMode;
				this.updateToolbar();
				var toolbar = this.toolbar;
				var memo = this.memo;
				var value;
				if (plainTextMode) {
					value = this.getEditorValue();
					this.setValue(value);
				} else {
					value = memo.getValue();
					if (value) {
						value = '<p>' + value.replace(/\n*$/, '').replace(/\n/g, '</p><p>') + '</p>';
					}
					this.setValue(value);
				}
				this.fireEvent('changePlainTextMode', this.value, this);
			}
		},

		/**
   * Update the accessibility of controls
   * @private
   */
		updateToolbar: function() {
			var toolbar = this.toolbar;
			var memo = this.memo;
			if (!toolbar || !memo) {
				return;
			}
			var plainTextMode = this.plainTextMode;
			var enabled = this.enabled;
			toolbar['fontFamily'].setEnabled(!plainTextMode && enabled);
			toolbar['fontSize'].setEnabled(!plainTextMode && enabled);
			toolbar['fontStyleBold'].setEnabled(!plainTextMode && enabled);
			toolbar['fontStyleItalic'].setEnabled(!plainTextMode  && enabled);
			toolbar['fontStyleUnderline'].setEnabled(!plainTextMode && enabled);
			toolbar['fontColor'].setEnabled(!plainTextMode && enabled);
			toolbar['hightlightColor'].setEnabled(!plainTextMode && enabled);
			toolbar['numberedList'].setEnabled(!plainTextMode && enabled);
			toolbar['bulletedList'].setEnabled(!plainTextMode && enabled);
			toolbar['justifyLeft'].setEnabled(!plainTextMode && enabled);
			toolbar['justifyCenter'].setEnabled(!plainTextMode && enabled);
			toolbar['justifyRigth'].setEnabled(!plainTextMode && enabled);
			toolbar['image'].setEnabled(!plainTextMode && enabled);
			toolbar['link'].setEnabled(!plainTextMode && enabled);
			toolbar['htmlMode'].setEnabled(plainTextMode && enabled);
			toolbar['plainMode'].setEnabled(!plainTextMode && enabled);
			memo.setReadonly(!enabled);
			Ext.get('html-edit-htmltext').dom.style.display = plainTextMode ? 'none' : 'table-cell';
			Ext.get('html-edit-plaintext').dom.style.display = !plainTextMode ? 'none' : 'table-cell';
			if (this.editor) {
				this.editor.setReadOnly(!enabled);
				Ext.get('html-edit-htmltext').dom.style.backgroundColor = enabled ? '#ffffff' : '#f9f9f9';
			}
		},

		/**
   * Changing the activity property of the control
   * @protected
   * @overridden
   * @param  {Boolean} enabled Active
   */
		setEnabled: function(enabled) {
			if (enabled !== this.enabled) {
				this.enabled = enabled;
				this.fireEvent('changeEnabled', enabled, this);
				this.updateToolbar();
			}
		},

		/**
   * Removes html tags from the string
   * @private
   * @param {String} value String with html tags
   * @return {String} String without html tags
   */
		removeHtmlTags: function(value) {
			value = value.replace(/\t/gi, '');
			value = value.replace(/>\s+</gi, '><');
			if (Ext.isWebKit) {
				value = value.replace(/<div>(<div>)+/gi, '<div>');
				value = value.replace(/<\/div>(<\/div>)+/gi, '<\/div>');
			}
			value = value.replace(/<div>\n <\/div>/gi, '\n');
			value = value.replace(/<p>\n/gi, '');
			value = value.replace(/<div>\n/gi, '');
			value = value.replace(/<div><br[\s\/]*>/gi, '');
			value = value.replace(/<br[\s\/]*>\n?|<\/p>|<\/div>/gi, '\n');
			value = value.replace(/<[^>]+>|<\/\w+>/gi, '');
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
			value = value.replace(/⁄/gi, "/");
			value = value.replace(/</gi, "<");
			value = value.replace(/>/gi, ">");
			value = value.replace(/©/gi, "(c)");
			value = value.replace(/®/gi, "(r)");
			value = value.replace(/\n*$/, '');
			value = value.replace(/(\n)( )+/, '\n');
			value = value.replace(/(\n){1,}$/, '');
			return value;
		},

		/**
   * Initializes fonts
   * @private
   */
		initFonts: function() {
			var fontFamilies = this.fontFamily;
			var fontFamiliesArr = [];
			fontFamiliesArr = fontFamilies.split(',');
			var fontFamiliesColl = Ext.create('Terrasoft.Collection');
			for (var i = 0; i < fontFamiliesArr.length; i++) {
				fontFamiliesColl.add(i, {value: fontFamiliesArr[i], displayValue: fontFamiliesArr[i]});
			}
			fontFamiliesColl.sortByFn(function(elA, elB) {
				var valueA = elA.value;
				var valueB = elB.value;
				if (valueA === valueB) {
					return 0;
				}
				return (valueA < valueB) ? -1 : 1;
			});
			var toolbar = this.toolbar;
			toolbar['fontFamily'].on('prepareList', function() {
				toolbar['fontFamily'].loadList(fontFamiliesColl);
			});
			toolbar['fontFamily'].on('change', function() {
				var fontFamilyValue = toolbar['fontFamily'].getValue();
				if (fontFamilyValue) {
					this.defaultFontFamily = fontFamilyValue.value;
					this.applyFontStyle();
				}
			}, this);
			var fontSizes = this.fontSize;
			var fontSizesArr = [];
			fontSizesArr = fontSizes.split(',');
			var fontSizesColl = Ext.create('Terrasoft.Collection');
			for (var i = 0; i < fontSizesArr.length; i++) {
				fontSizesColl.add(i, {value: fontSizesArr[i] + 'px', displayValue: fontSizesArr[i]});
			}
			toolbar['fontSize'].on('prepareList', function() {
				toolbar['fontSize'].loadList(fontSizesColl);
			});
			toolbar['fontSize'].on('change', function() {
				var fontSizeValue = toolbar['fontSize'].getValue();
				if (fontSizeValue) {
					this.defaultFontSize = fontSizeValue.value;
					this.applyFontStyle();
				}
			}, this);
		},

		/**
   * Refreshes font styles
   * @private
   */
		applyFontStyle: function() {
			var StyleConstructor = CKEDITOR.style;
			var ckEditorConfig = CKEDITOR.config;
			this.setStyle(new StyleConstructor({
				element: 'span',
				styles: {
					'font-family': '#(family)'
				},
				overrides: [{
					element: 'font',
					attributes: {
						face: null
					}
				}]
			}, {family: this.defaultFontFamily}));
			this.setStyle(new StyleConstructor({
				element: 'span',
				styles: {
					'font-size': '#(size)'
				},
				overrides: [{
					element: 'font',
					attributes: {
						size: null
					}
				}]
			}, {size: this.defaultFontSize}));
			this.setStyle(new StyleConstructor({
				element: 'span',
				styles: {
					color: '#(color)'
				},
				overrides: [{
					element: 'font',
					attributes: {
						color: null
					}
				}]
			}, {color: this.defaultFontColor}));
			this.setStyle(new StyleConstructor({
				element : 'span',
				styles : { 'background' : '#(color)' },
				overrides : [
					{
						element : 'font',
						attributes : { 'background' : null }
					}
				]
			}, {color: this.defaultHighlight}));
		},

		/**
   * Sets the style of the editor
   * @private
   * @param {object} style String with html tags
   */
		setStyle: function(style) {
			var editor = this.editor;
			if (!editor.document || !editor.document.getSelection()) {
				return;
			}
			editor.fire('saveSnapshot');
			style.apply(editor.document);
			editor.fire('saveSnapshot');
		}
	});

	return {
		render: function(renderTo) {
			Ext.define("Terrasoft.ViewModel", {
				extend: 'Terrasoft.BaseViewModel',
				columns: {
					htmlEditValue: {
						type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
						caption: 'ComboboxSelectionText',
						dataValueType: Terrasoft.core.enums.DataValueType.TEXT
					},
					plainTextMode: {
						type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
						caption: 'ComboboxSelectionText',
						dataValueType: Terrasoft.core.enums.DataValueType.BOOLEAN
					},
					enabled: {
						type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
						caption: 'ComboboxSelectionText',
						dataValueType: Terrasoft.core.enums.DataValueType.BOOLEAN
					}
				}
			});
			model = Ext.create("Terrasoft.ViewModel", {
				values: {
					htmlEditValue: '',
					plainTextMode: false,
					enabled: true,
					images: new Terrasoft.BaseViewModelCollection()
				},
				methods: {
					imageLoaded: function(files, fileArr) {
						var images = this.get('images');
						images.clear();
						for (var i = 0; i < files.length; i++) {
							var freader = new FileReader();
							freader.file = files[i];
							freader.onload = function(result) {
								var target = result.target;
								var file = target.file;
								var image = Ext.create("Terrasoft.BaseViewModel", {
									values: {
										fileName: file.name,
										url: target.result
									}
								});
								images.add(images.getUniqueKey(), image);
							};
							freader.readAsDataURL(freader.file);
						}
					}
				}
			});

			var label = Ext.create('Terrasoft.Label', {
				caption: 'Some Top Label',
				renderTo: renderTo
			});

			var htmlEdit = Ext.create('Terrasoft.HtmlEdit', {
				renderTo: renderTo,
				value: {
					bindTo: 'htmlEditValue'
				},
				plainTextMode: {
					bindTo: 'plainTextMode'
				},
				enabled: {
					bindTo: 'enabled'
				},
				imageLoaded: {
					bindTo: 'imageLoaded'
				},
				images: {
					bindTo: 'images'
				}
			});
			htmlEdit.bind(model);
		}
	}
});