Terrasoft.configuration.Structures["InlineParameterTextEdit"] = {innerHierarchyStack: ["InlineParameterTextEdit"]};
define("InlineParameterTextEdit", ["InlineCodeTextEdit"], function() {

	/**
	 * Class for InlineParameterTextEdit.
	 */
	Ext.define("Terrasoft.controls.InlineParameterTextEdit", {
		extend: "Terrasoft.controls.InlineCodeTextEdit",
		alternateClassName: "Terrasoft.InlineParameterTextEdit",

		/**
		 * Sandbox instance.
		 * @private
		 * @type {Object}
		 */
		sandbox: null,

		/**
		 * @inheritdoc Terrasoft.InlineTextEdit#hasMacrosButton
		 * @override
		 */
		hasMacrosButton: false,

		/**
		 * @inheritdoc Terrasoft.InlineCodeTextEdit#init
		 * @override
		 */
		init: function() {
			this.callParent(arguments);
			this.addEvents("parameterclick");
		},

		/**
		 * @inheritdoc Terrasoft.InlineCodeTextEdit#initInlineEditor
		 * @override
		 */
		initInlineEditor: function() {
			this.callParent(arguments);
			this.editor.on("doubleclick", this.onImageDoubleClick, null, null, 0);
		},

		/**
		 * On image double click event handler.
		 * @private
		 * @param {Object} event Event.
		 */
		onImageDoubleClick: function(event) {
			var element = event.data.element;
			var elementDataType = element.getAttribute("data-type");
			var isHtmlProcessParameter = elementDataType === "ProcessParameter";
			var isImage = element.is("img");
			var isNotRealElement = !element.data("cke-realelement");
			var isNotReadonly = !element.isReadOnly();
			if (isImage && isHtmlProcessParameter && isNotRealElement && isNotReadonly) {
				event.data.dialog = "";
				event.stop();
			}
		},

		/**
		 * @inheritdoc Terrasoft.InlineCodeTextEdit#initExtraPluginsToolbar
		 * @override
		 */
		initExtraPluginsToolbar: function() {
			this.callParent(arguments);
			this.createButton("bpmonlineparameter", this.onParameterButtonClick);
		},

		/**
		 * Parameter button click handler.
		 * @private
		 */
		onParameterButtonClick: function() {
			this.setFocused(false);
			this.fireEvent("parameterclick");
		},

		/**
		 * @inheritdoc Terrasoft.InlineTextEdit#insertContent
		 * @override
		 */
		insertContent: function(value) {
			if (this.isHtmlValid(value)) {
				this.editor.insertHtml(value, "text");
			} else {
				this.callParent(arguments);
			}
		},

		/**
		 * Validates html text.
		 * @private
		 * @param {String} html Html text.
		 * @returns {boolean} Is html text valid.
		 */
		isHtmlValid: function(html) {
			return /<[a-z][\s\S]*>/i.test(html);
		}
	});
});


