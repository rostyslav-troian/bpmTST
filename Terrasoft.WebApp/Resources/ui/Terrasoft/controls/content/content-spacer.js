/**
 * Class of content spacer element.
 */
Ext.define("Terrasoft.controls.ContentSpacerElement", {
	extend: "Terrasoft.controls.BaseContentElement",
	alternateClassName: "Terrasoft.ContentSpacerElement",

	
	/**
	 * Indicates that the item is selected.
	 * @type {Boolean}
	 */
	selected: false,

	/**
	 * A collection of style classes for the control container.
	 * @type {String[]}
	 */
	contentWrapClasses: ["content-spacer-element-wrap"],

	/**
	 * The style class of the selected item.
	 * @type {String}
	 */
	selectedClass: "t-content-focus",


	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		`<div id="{id}-content-spacer-element" style="{wrapStyle}" class="{wrapClassName}">
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
	 * @inheritdoc Terrasoft.BaseContentElement#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		Ext.apply(tplData, {
			wrapClassName: this.getWrapClasses()
		});
		return tplData;
	},


	/**
	 * The method returns the selectors of the control.
	 * @protected
	 * @return {Object} The selector object.
	 */
	getSelectors: function() {
		var selectors = {
			wrapEl: "#" + this.id + "-content-spacer-element"
		};
		return selectors;
	},

	/**
	 * Returns wrap element classes.
	 * @protected
	 * @return {Array} Wrap classes.
	 */
	getWrapClasses: function() {
		var wrapClassName = [];
		if (this.contentWrapClasses) {
			wrapClassName.push(this.contentWrapClasses);
		}
		if (this.selected) {
			wrapClassName.push(this.selectedClass);
		}
		return wrapClassName;
	}

});
