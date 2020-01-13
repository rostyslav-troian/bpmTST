/**
 * Implementing an abstract container class.
 */
Ext.define("Terrasoft.controls.Container", {
	extend: "Terrasoft.controls.AbstractContainer",
	alternateClassName: "Terrasoft.Container",

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		"<div id=\"{id}\" style=\"{wrapStyles}\" class=\"{wrapClassName}\">",
		"{%this.renderItems(out, values)%}",
		"</div>"
	]

	// endregion

});
