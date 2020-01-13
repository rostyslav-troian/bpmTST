/**
 * Class of content separator element.
 */
Ext.define("Terrasoft.controls.ContentSeparatorElement", {
	extend: "Terrasoft.controls.BaseContentElement",
	alternateClassName: "Terrasoft.ContentSeparatorElement",

	//region Properties: Protected

	separatorStyle: null,

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		`<div id="{id}-content-separator-element" style="{wrapStyle}" class="{wrapClassName}">
			<div class="content-separator" style="{separatorStyle}"></div>
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

	/**
	 * The method returns the selectors of the control.
	 * @protected
	 * @return {Object} The selector object.
	 */
	getSelectors: function() {
		var selectors = {
			wrapEl: "#" + this.id + "-content-separator-element"
		};
		return selectors;
	},

	/**
	 * Sets separator thickness.
	 * @param {String} value Separator thickness.
	 */
	setThickness: function(value) {
		this.separatorStyle["border-top-width"] = value;
		this.safeRerender();
	},

	/**
	 * Sets separator color.
	 * @param {String} value Separator color.
	 */
	setColor: function(value) {
		this.separatorStyle["border-top-color"] = value;
		this.safeRerender();
	},

	/**
	 * Sets separator style.
	 * @param {String} value Separator style.
	 */
	setStyle: function(value) {
		this.separatorStyle["border-top-style"] = value;
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
			thickness: {
				changeMethod: "setThickness"
			},
			style: {
				changeMethod: "setStyle"
			},
			color: {
				changeMethod: "setColor"
			}
		};
		Ext.apply(bindConfig, elementConfig);
		return bindConfig;
	},

	/**
	 * @inheritdoc Terrasoft.BaseContentElement#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		Ext.apply(tplData, {
			separatorStyle: this.separatorStyle
		});
		return tplData;
	},

	//endregion

	//region Methods: Public

	constructor: function() {
		this.callParent(arguments);
		this.separatorStyle = {};
	}

	//endregion

});
