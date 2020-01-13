/**
 * Class for the MJML button element.
 */
Ext.define("Terrasoft.controls.ContentMjButtonElement", {
	extend: "Terrasoft.controls.ContentButtonElement",
	alternateClassName: "Terrasoft.ContentMjButtonElement",

	/**
	 * Styles of button element.
	 * @type {Object}
	 */
	buttonStyle: null,

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		`<div id="{id}-content-button-align-wrap" align="{align}" class="{wrapClassName}">
			<div id="{id}-content-button-padding-wrap" class="content-button-container" style="{wrapStyle}">
				<div id="{id}-content-button" align="center" class="mjml-content-button" style="{buttonStyle}">
					{%this.renderItems(out, values)%}
				</div>
			</div>
			<tpl if="hasTools">
				<div id="{id}-content-element-tools" class="{toolsWrapClasses}">
					<tpl for="tools">
						{%this.renderTool(out, values)%}
					</tpl>
				</div>
			</tpl>
		</div>`
	],

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var elementConfig = {
			buttonStyle: {changeMethod: "setButtonStyle"}
		};
		Ext.apply(elementConfig, bindConfig);
		return elementConfig;
	},

	/**
	 * Sets inline styles to button.
	 * @param {Object} styles Style attributes.
	 */
	setButtonStyle: function(styles) {
		if (Ext.isObject(styles)) {
			this.styles = Ext.apply(this.styles || {}, {
				buttonStyle: styles
			});
			this.safeRerender();
		}
	}

});
