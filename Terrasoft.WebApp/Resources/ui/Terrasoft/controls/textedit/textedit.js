/**
 * The class of the text input control in a single-line field.
 */
Ext.define("Terrasoft.controls.TextEdit", {
	extend: "Terrasoft.BaseEdit",
	alternateClassName: "Terrasoft.TextEdit",

	mixins: {
		/**
		 * The rendering object of the left icon.
		 */
		leftIcon: "Terrasoft.LeftIcon",

		/**
		 * The rendering object of the right icon.
		 */
		rightIcon: "Terrasoft.RightIcon"
	},

	/**
	 * Parameter indicating that it is necessary to use the left icon.
	 * @protected
	 * @property {Boolean} enableLeftIcon
	 */
	enableLeftIcon: true,

	/**
	 * Parameter indicating that you need to use the right icon.
	 * @protected
	 * @property {Boolean} enableRightIcon
	 */
	enableRightIcon: true,

	/**
	 * @inheritdoc Terrasoft.BaseEdit#value
	 * @type {String}
	 * @override
	 */
	value: "",

	/**
	 * Parameter of protected work mode.
	 * @protected
	 * @property {Boolean} protect
	 */
	protect: false,

	/**
	 * Value to insert depending on cursor position.
	 * @type {String}
	 */
	injectionValue: "",

	/**
	 * @inheritdoc Terrasoft.baseedit#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.mixins.rightIcon.init.apply(this, arguments);
	},

	/**
	 * Expanding the data set taking protected mode into account.
	 * @protected
	 * @override
	 * @return {Object}
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		tplData.inputType = this.getInputType();
		return tplData;
	},

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var textEditBindConfig = {
			injectionValue: {
				changeMethod: "setInjectionValue"
			}
		};
		Ext.apply(bindConfig, textEditBindConfig);
		var rightIconConfig = this.mixins.rightIcon.getBindConfig();
		Ext.apply(bindConfig, rightIconConfig);
		return bindConfig;
	},

	/**
	 * Gets parameter for DOM input depending on the parameter.
	 * @protected
	 * @return {String}
	 */
	getInputType: function() {
		return (this.protect) ? "password" : "text";
	},

	/**
	 * Sets value for input depending on cursor position.
	 * @protected
	 * @param {String}
	 */
	setInjectionValue: function(value) {
		if (!Ext.isString(value)) {
			return;
		}
		var startPosition = this.getEl().dom.selectionStart;
		var endPosition = this.getEl().dom.selectionEnd;
		var newValue = this.value.slice(0, startPosition) + value + this.value.slice(endPosition);
		this.setValue(newValue);
	}
});