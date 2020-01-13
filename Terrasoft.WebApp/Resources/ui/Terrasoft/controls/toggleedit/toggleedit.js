/**
 * Toggle control.
 * Extends CheckBox tpl for rendering.
 */
Ext.define("Terrasoft.controls.ToggleEdit", {
	extend: "Terrasoft.controls.CheckBoxEdit",
	alternateClassName: "Terrasoft.ToggleEdit",

	/**
	 * @inheritdoc Terrasoft.controls.CheckBoxEdit#defaultWrapClassName
	 * @override
	 */
	defaultWrapClassName: "toggle-wrap",

	/**
	 * @inheritdoc Terrasoft.controls.CheckBoxEdit#hiddenInputClassName
	 * @override
	 */
	hiddenInputClassName: "toggle-input",

	/**
	 * @inheritdoc Terrasoft.controls.CheckBoxEdit#tpl
	 * @override
	 */
	tpl: [
		"<span id=\"{id}-wrapEl\" class=\"{wrapClass}\" style=\"{wrapStyle}\">",
		"<input id=\"{id}-el\" value=\"{value}\" class=\"{hiddenInputClass}\" style=\"{hiddenInputStyle}\"",
		"type=\"{hiddenInputType}\" tabindex=\"{tabIndex}\"",
		"<tpl if=\"!enabled\">",
		" disabled=\"disabled\"",
		"</tpl>",
		">",
		"<span class=\"toggle-label\"></span>",
		"<span class=\"toggle-handle\"></span>",
		"</span>"
	]
});
