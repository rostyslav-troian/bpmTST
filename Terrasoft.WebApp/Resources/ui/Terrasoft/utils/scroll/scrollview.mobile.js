/**
 * Scroll View Implementation Class
 */
Ext.define("Terrasoft.utils.scroll.View", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.utils.ScrollView",

	//region Properties: Private

	/**
  * Class instance "Terrasoft.utils.Scroller"
  * @private
  * @type {Terrasoft.utils.Scroller}
  */
	scroller: null,

	/**
  * Scrolling Css class
  * @private
  * @type {String}
  */
	scrollCls: "scroll-view",

	//endregion

	//region Properties: Public

	/**
  * scroll element
  * @type {Object}
  */
	element: null,

	//endregion

	//region Methods: Private

	/**
  * Initializes an element
  * @private
  */
	initElement: function() {
		var element = Ext.get(this.element);
		if (!element) {
			return;
		}
		var scroller = this.scroller;
		var scrollerElement = element.getFirstChild().getFirstChild();
		element.addCls(this.scrollCls);
		scroller.setElement(scrollerElement);
		return this;
	},

	/**
  * Creates the {@link Terrasoft.utils.Scroller} class instance
  * @private
  */
	initScroller: function() {
		this.scroller = Ext.create("Terrasoft.utils.Scroller");
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @protected
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.initScroller();
		this.initElement();
	},

	//endregion

	//region Methods: Public

	/**
  * Gets the "Terrasoft.utils.Scroller" class instance
  * @return {Terrasoft.utils.Scroller}
  */
	getScroller: function() {
		return this.scroller;
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.callParent(arguments);
		this.element.removeCls(this.scrollCls);
		this.element = null;
		this.scroller.destroy();
		this.scroller = null;
	}

	//endregion

});
