/**
 * Implementing an abstract container class.
 */
Ext.define("Terrasoft.controls.Container", {
	extend: "Terrasoft.controls.AbstractContainer",
	alternateClassName: "Terrasoft.Container",

	//region Properties: Private

	/**
  * Instance of the view {@link Terrasoft.utils.ScrollView scrolling}.
  * @private
  * @type {Terrasoft.utils.ScrollView}
  */
	scrollView: null,

	//endregion

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 */
	/* jshint ignore:start */
	defaultRenderTpl: [
		'<div id="{id}" style="{wrapStyles}" class="{wrapClassName}">',
		'<tpl if="scrollable">',
		'<div id="{id}-scroll-view"><div><div>',
		'</tpl>',
		'{%this.renderItems(out, values)%}',
		'<tpl if="scrollable">',
		'</div></div></div>',
		'</tpl>',
		'</div>'
	],
	/* jshint ignore:end */

	//endregion

	//region Properties: Public

	/**
  * A flag whether to add scrolling
  * @type {Boolean}
  */
	scrollable: false,

	//endregion

	//region Methods: Private

	/**
  * Initializes views  {@link Terrasoft.utils.ScrollView scroll}.
  * @private
  */
	initScrollView: function() {
		if (!this.scrollable) {
			return;
		}
		this.scrollView = Ext.create("Terrasoft.utils.ScrollView", {
			element: this.scrollViewEl
		});
	},

	/**
  * Removes views {@link Terrasoft.utils.ScrollView scroll}.
  * @private
  */
	destroyScrollView: function() {
		if (this.scrollView) {
			this.scrollView.destroy();
			this.scrollView = null;
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#getDefaultRenderTemplate
	 * @protected
	 * @override
	 * @return {String[]}
	 */
	getDefaultRenderTemplate: function() {
		if (this.scrollable) {
			var selectors = this.selectors = this.selectors || {};
			selectors.scrollViewEl = "#" + this.id + "-scroll-view";
		}
		return this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#getTplData
	 * @protected
	 * @override
	 * @return {Object}
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		if (this.scrollable) {
			tplData.scrollable = this.scrollable;
			tplData.wrapClassName = ["scroll-wrap"];
		}
		return tplData;
	},

	/**
	 * @inheritdoc Terrasoft.Component#onBeforeReRender
	 * @protected
	 * @override
	 */
	onBeforeReRender: function() {
		this.destroyScrollView();
	},

	/**
	 * @inheritdoc Terrasoft.Component#onBeforeReRender
	 * @protected
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.initScrollView();
	},

	/**
	 * @inheritdoc Terrasoft.Component#onBeforeReRender
	 * @protected
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.initScrollView();
	},

	//endregion

	//region Methods: Public

	/**
  * Returns the view instance {@link Terrasoft.utils.ScrollView scroll}.
  * @return {Terrasoft.utils.ScrollView}
  */
	getScrollView: function() {
		return this.scrollView;
	},

	/**
  * Adds/deletes the {@link Terrasoft.utils.ScrollView scroll}.
  * @param {Boolean} scrollable A flag whether to add scrolling
  */
	setScrollable: function(scrollable) {
		if (scrollable === this.scrollable) {
			return;
		}
		this.scrollable = scrollable;
		this.safeRerender();
	},

	/**
	 * @inheritdoc Terrasoft.Component#getWrapEl
	 * @override
	 */
	getWrapEl: function() {
		if (this.scrollView) {
			var scroller = this.scrollView.getScroller();
			return scroller.getElement();
		}
		return this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.destroyScrollView();
		this.callParent(arguments);
	}

	//endregion

});