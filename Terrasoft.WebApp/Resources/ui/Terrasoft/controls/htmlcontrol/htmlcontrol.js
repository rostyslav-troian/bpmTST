/**
 * HtmlControl class for user layout creation.
 */
Ext.define("Terrasoft.controls.HtmlControl", {
	extend: "Terrasoft.Component",
	alternateClassName: "Terrasoft.HtmlControl",

	//region Properties: Private

	/**
	 * Shared template of control.
	 * @private
	 * @override
	 * @type {String[]}
	 */
	tpl: [
		/*jshint quotmark:true */
		'<div id="{id}">',
		'{htmlContent}',
		'</div>'
		/*jshint quotmark:false */
	],

	//endregion

	//region Properties: Public

	/**
	 * User's html layout.
	 * @type {String}
	 */
	htmlContent: null,

	//endregion

	//region Methods: Private

	/**
	 * Set new user html layout.
	 * @private
	 * @param {String} value.
	 */
	setHtmlContent: function(value) {
		if (this.htmlContent !== value) {
			this.htmlContent = value;
			this.safeRerender();
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * Initialize component.
	 * @protected
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		var selectors = this.selectors = this.selectors || {};
		var wrapSelector = selectors.wrapEl;
		var html = this.html;
		if (!wrapSelector && !html) {
			var id = this.id;
			selectors.wrapEl = "#" + id;
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#getBindConfig.
	 * @protected
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var htmlControlBindConfig = {
			htmlContent: {
				changeMethod: "setHtmlContent"
			}
		};
		Ext.apply(htmlControlBindConfig, bindConfig);
		return htmlControlBindConfig;
	},

	/**
	 * @inheritdoc Terrasoft.BaseContentElement#getTplData
	 * @protected
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		tplData.htmlContent = this.htmlContent;
		return tplData;
	}

	//endregion
});
