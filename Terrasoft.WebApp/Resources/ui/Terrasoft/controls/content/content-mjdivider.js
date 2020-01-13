/**
 * Class of content mjml divider element.
 */
Ext.define("Terrasoft.controls.ContentMjDivider", {
	extend: "Terrasoft.controls.ContentSeparatorElement",
	alternateClassName: "Terrasoft.ContentMjDivider",

	/**
	 * A collection of style classes for the control container.
	 * @protected
	 * @type {String[]}
	 */
	contentWrapClasses: ["content-mjdivider-wrap content-element-wrap"],

	/**
	 * Sets divider width.
	 * @param {String} value Divider width.
	 */
	setWidth: function(value) {
		if (!Ext.isEmpty(value)) {
			this.separatorStyle["width"] = value;
		} else {
			delete this.separatorStyle["width"];
		}
		this.safeRerender();
	},

	//endregion

	//region Methods: Public

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var elementConfig = {
			width: {
				changeMethod: "setWidth"
			}
		};
		Ext.apply(bindConfig, elementConfig);
		return bindConfig;
	}
});
