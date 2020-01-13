/**
 * Formula edit class.
 */
Ext.define("Terrasoft.controls.FormulaInlineTextEdit", {
	extend: "Terrasoft.controls.MemoEdit",
	alternateClassName: "Terrasoft.FormulaInlineTextEdit",

	/**
	 * Current selection.
	 * @override
	 * @type {String}
	 */
	selectedText: null,

	/**
	 * @inheritdoc Terrasoft.MemoEdit#initDomEvents
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		var el = this.getEl();
		el.on("select", this.onSelectionChange, this);
	},

	/**
	 * @inheritdoc Terrasoft.MemoEdit#clearDomListeners
	 * @override
	 */
	clearDomListeners: function() {
		this.callParent(arguments);
		var el = this.getEl();
		el.un("select", this.onSelectionChange, this);
	},

	/**
	 * @inheritdoc Terrasoft.MemoEdit#onInput
	 * @override
	 */
	onInput: function() {
		this.onSelectionChange();
	},

	/**
	 * Text selection change event handler.
	 * @protected
	 */
	onSelectionChange: function() {
		var selectedText = this.getSelectedText();
		this.updateSelectedText(selectedText);
	},

	/**
	 * Returns selected text.
	 * @return {String} Selected text.
	 */
	getSelectedText: function() {
		var el = this.getEl();
		var inputNode = el.dom;
		var value = this.getTypedValue();
		return value.slice(inputNode.selectionStart, inputNode.selectionEnd);
	},

	/**
	 * Updates selectedText property. If current selection not equals selected text,
	 * fires selectedtextchanged event.
	 * @protected
	 * @param {String} selectedText Selected text.
	 */
	updateSelectedText: function(selectedText) {
		if (selectedText !== this.selectedText) {
			this.selectedText = selectedText;
			this.fireEvent("selectedtextchanged", this.selectedText, this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.MemoEdit#getBindConfig
	 * Adds binding to selectedText property.
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		Ext.apply(bindConfig, {
			selectedText: {
				changeEvent: "selectedtextchanged",
				changeMethod: "setSelectedText"
			}
		});
		return bindConfig;
	},

	/**
	 * Sets selected text to control. If current selection not equals selected text, removes current selection
	 * and sets text passed via arguments into control. In this case selection is reset and cursor position sets
	 * to the end of inserted text.
	 * @param {String} selectedText Text to select.
	 */
	setSelectedText: function(selectedText) {
		if ((selectedText !== this.selectedText) && this.rendered) {
			var value = this.getTypedValue();
			var el = this.getEl();
			var inputNode = el.dom;
			inputNode.focus();
			var selectionStart = inputNode.selectionStart;
			var selectionEnd = inputNode.selectionEnd;
			var newValue = [value.slice(0, selectionStart), selectedText, value.slice(selectionEnd)].join("");
			this.setValue(newValue);
			inputNode.selectionStart = selectionStart + selectedText.length;
			inputNode.selectionEnd = selectionStart + selectedText.length;
			this.updateSelectedText(selectedText);
		}
	},

	/**
	 * @inheritdoc Terrasoft.MemoEdit#updateScrollHeight
	 * Hides base implementation.
	 * @override
	 */
	updateScrollHeight: Terrasoft.emptyFn

});
