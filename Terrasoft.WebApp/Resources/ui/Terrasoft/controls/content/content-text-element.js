/**
 * Base class of the text element.
 */
Ext.define("Terrasoft.controls.ContentTextElement", {
	extend: "Terrasoft.controls.BaseContentElement",
	alternateClassName: "Terrasoft.ContentTextElement",

	//region Properties: Protected

	/**
	 * Text width.
	 * @protected
	 * @type {String}
	 */
	width: null,

	/**
	 * Text height.
	 * @protected
	 * @type {String}
	 */
	height: null,

	/**
	 * Text align.
	 * @protected
	 * @type {Terrasoft.core.enums.Align}
	 */
	align: null,

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		`<div id = "{id}-content-element" style="{alignStyle}" class="{wrapClassName}">
			<div style="{wrapStyle}"  class="text-element-wrap">
				{%this.renderItems(out, values)%}
				<tpl if="hasTools">
					<div id="{id}-content-element-tools" class="{toolsWrapClasses}">
						<tpl for="tools">
							{%this.renderTool(out, values)%}
						</tpl>
					</div>
				</tpl>
			</div>
		</div>`
	],

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.component#getTplData
	 * @override
	 */
	getTplData: function() {
		const tplData = this.callParent(arguments);
		let flexDirection = "flex-start";
		if (this.align === Terrasoft.core.enums.Align.RIGHT) {
			flexDirection = "flex-end";
		}
		if (this.align === Terrasoft.core.enums.Align.CENTER) {
			flexDirection = "center";
		}
		tplData.alignStyle = "display: flex;flex-direction: row;justify-content:" + flexDirection;
		return tplData;
	},

	//endregion

	//region Methods: Public

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 * @override
	 */
	getBindConfig: function() {
		const bindConfig = this.callParent(arguments);
		const elementConfig = {
			align: {
				changeMethod: "setAlign"
			}
		};
		Ext.apply(elementConfig, bindConfig);
		return elementConfig;
	},

	/**
	 * Sets text element align.
	 * @param {Terrasoft.core.enums.Align} value New height value.
	 */
	setAlign: function(value) {
		const supportedValues = [
			Terrasoft.core.enums.Align.LEFT, Terrasoft.core.enums.Align.CENTER,
			Terrasoft.core.enums.Align.RIGHT
		];
		value = value || Terrasoft.Align.LEFT;
		if (!Terrasoft.contains(supportedValues, value)) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		if (!Terrasoft.isEqual(this.align, value)) {
			this.align = value;
			this.safeRerender();
		}
	}

	//endregion

});
