/**
 * Base class of the button element.
 */
Ext.define("Terrasoft.controls.ContentButtonElement", {
	extend: "Terrasoft.controls.BaseContentElement",
	alternateClassName: "Terrasoft.ContentButtonElement",

	//region Properties: Public

	/**
	 * Button align.
	 * @type {Terrasoft.core.enums.Align}
	 */
	align: null,

	/**
	 * Padding.
	 * @type {Object}
	 */
	padding: null,

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		`<div id="{id}-content-button-align-wrap" align="{align}" class="{wrapClassName}">
			<div id="{id}-content-button-padding-wrap" style="display:inline-block;{padding}">
				<div id="{id}-content-button" align="center" class="content-button" style="{wrapStyle}">
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

	//endregion

	//region Methods: Protected

	getTpl: function() {
		const tpl = this.callParent(arguments);
		tpl[0].replace("{align}", this.align);
		return tpl;
	},

	/**
	 * The method returns the selectors of the control.
	 * @protected
	 * @return {Object} The selector object.
	 */
	getSelectors: function() {
		return {wrapEl: "#" + this.id + "-content-button-align-wrap"};
	},

	/**
	 * @inheritdoc Terrasoft.BaseContentElement#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		Ext.apply(tplData, {
			align: this.align,
			padding: Ext.DomHelper.generateStyles(this.padding)
		});
		tplData.wrapClassName.push("content-button-align-wrap");
		return tplData;
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
			align: {changeMethod: "setAlign"},
			padding: {changeMethod: "setPadding"}
		};
		Ext.apply(elementConfig, bindConfig);
		return elementConfig;
	},

	/**
	 * Sets button align.
	 * @param {Terrasoft.core.enums.Align} value New height value.
	 */
	setAlign: function(value) {
		if (!_.isEqual(this.align, value)) {
			this.align = value;
			this.safeRerender();
		}
	},

	/**
	 * Sets padding.
	 * @param {Object} value
	 */
	setPadding: function(value) {
		if (!_.isEqual(this.padding, value)) {
			this.padding = value;
			this.safeRerender();
		}
	}

	//endregion

});
