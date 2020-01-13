/**
 * Base class of spinner.
 */
Ext.define("Terrasoft.controls.BaseSpinner", {
	alternateClassName: "Terrasoft.BaseSpinner",
	extend: "Terrasoft.Component",

	/**
	 * @inheritDoc Terrasoft.Component#tpl
	 * @override
	 */
	tpl: [
		/*jshint white:false */
		'<div id="{spinnerId}" class="',
		'{extraComponentClasses}">',
		'<tpl if="componentStyle">style="{componentStyle}"</tpl>',
		'</div>'
		/*jshint white:true */
	],

	/**
	 * The name of the additional CSS class that will be applied to the outer element.
	 * @type {String}
	 */
	extraComponentClasses: "",

	/**
	 * Inline value of width in the house of the outer element.
	 * Example: "30px"
	 * @type {String}
	 */
	width: "",

	/**
	 * Get the style of an external element or null if the style is not needed.
	 * @protected
	 * @throws {Terrasoft.UnsupportedTypeException} If width value is incorrect.
	 * @return {String}
	 */
	getComponentStyle: function() {
		var width = this.width;
		if (!Ext.isEmpty(width)) {
			if (!Ext.isString(width)) {
				throw new Terrasoft.UnsupportedTypeException({
					message: Terrasoft.Resources.Controls.BaseSpinner.SpinnersWidthPropertyShouldBeAString
				});
			}
			return "font-size: " + width + ";";
		}
		return "";
	},

	/**
	 * @inheritDoc Terrasoft.Component#getTplData
	 * @override
	 */
	getTplData: function() {
		const tplData = this.callParent(arguments);
		tplData.extraComponentClasses = this.extraComponentClasses;
		tplData.spinnerId = this.getSpinnerId();
		tplData.selectors = this.updateSelectors();
		var componentStyle = this.getComponentStyle();
		if (!Ext.isEmpty(componentStyle)) {
			tplData.componentStyle = componentStyle;
		}
		this.tplData = tplData;
		return tplData;
	},

	/**
	 * Return spinner identifier.
	 * @return {String} Identifier.
	 * @protected
	 */
	getSpinnerId: function() {
		return this.id + "-spinner";
	},

	/**
	 * Update selectors
	 * @protected
	 */
	updateSelectors: function() {
		var selectors = this.selectors;
		if (!selectors) {
			selectors = this.selectors = {};
		}
		selectors.el = selectors.wrapEl = ("#" + this.getSpinnerId());
		return selectors;
	},

	/**
	 * @inheritDoc Terrasoft.Component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.show();
	},

	/**
	 * @inheritDoc Terrasoft.Component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.show();
	},

	/**
	 * Show spinner.
	 * @abstract
	 */
	show: Terrasoft.emptyFn

});
