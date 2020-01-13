/**
 */
Ext.define("Terrasoft.controls.ControlGroup", {
	extend: "Terrasoft.Container",
	alternateClassName: "Terrasoft.ControlGroup",

	/**
  * The name of the CSS class for the control group element when there is no header
  * {@link #caption caption}.
  * @protected
  * @type {String}
  */
	emptyCaptionClass: "ts-controlgroup-empty-caption",

	/**
  * The name of the CSS class for the control group element when it is in the minimized state.
  * @protected
  * @type {String}
  */
	collapsedClass: "ts-controlgroup-collapsed",

	/**
  * The name of the CSS class for the wrapper element of the control.
  * @property {String} wrapClass
  */
	wrapClass: null,

	/**
  * The name of the CSS class when the group of controls does not contain the bottom line.
  * @protected
  * @type {String}
  */
	noLineClass: "no-line",

	/**
  * Control title
  * @type {String}
  */
	caption: "",

	/**
  * The width of the control. With an empty value, the width is set to the full width of the
  * parent control group.
  * @type {String}
  */
	width: "",

	/**
  * A flag that indicates in what state the list is initially collapsed/expanded.
  * The value true corresponds to the collapsed initial state, false - to the expanded state.
  * @type {Boolean}
  */
	collapsed: true,

	/**
 t * A flag that indicates whether the control has a lower horizontal line.
 t * true if there is a line.
  * @type {Boolean}
  */
	bottomLine: false,

	/**
  * A flag that the header is in uppercase.
  * @type {Boolean}
  */
	captionInUppercase: false,

	/**
  * A flag of the visibility of the header.
  * @type {Boolean}
  */
	isHeaderVisible: true,

	/**
  * A collection of toolbar items
  * @type {Ext.util.MixedCollection}
  */
	tools: null,

	/**
  * The method returns a rendering template for the control.
  * @protected
  * @override
  * @return {String[]}
  */
	getTpl: function() {
		var suffix = "";
		if (Ext.isIE) {
			suffix = "-ie"
		}
		return [
			/*jshint white:false */
			/*jshint quotmark:true */
			'<div id="{id}-wrap" class="{wrapClass}" style="{wrapStyle}">',
			'<tpl if="isHeaderVisible">',
			'<div class="ts-controlgroup-caption-wrap">',
			'<div id="{id}-wrap-marker" class="ts-controlgroup-marker-wrap">',
			Ext.String.format('<div id="{id}-marker" class="ts-controlgroup-marker{0}">', suffix),
			'</div>',
			'</div>',
			'<span id="{id}-caption"' +
			'<tpl if="direction"> dir="{direction}"</tpl>' +
			'>',
			'{caption}',
			'</span>',
			'<div id="{id}-tools" class="ts-controlgroup-tools ts-box-sizing">',
			'<tpl for="tools">',
			'</span>{%this.renderTool(out, values)%}',
			'</tpl>',
			'</div>',
			'</div>',
			'</tpl>',
			'<div id="{id}" class="{wrapContainerClass}">',
			'<tpl for="items">',
			'<@item>',
			'</tpl>',
			'</div>',
			'</div>'
			/*jshint quotmark:double */
			/*jshint white:true */
		];
	},

	/**
  * The method initializes the elements of the container. It is called after the container is initialized.
  * @private
  */
	initTools: function() {
		var tools = this.tools;
		var collection = this.tools = new Ext.util.MixedCollection(false, this.getComponentId);
		collection.on("add", this.onToolAdd, this);
		collection.on("remove", this.onToolRemove, this);
		this.addToolItem(tools);
	},

	/**
  * The event handler for adding an item to the collection {@link #tools}
  * @private
  * @param index The index of the added element
  * @param item The item added
  */
	onToolAdd: function(index, item) {
		item.added(this);
	},

	/**
  * The event handler for removing the control from the collection {@link #tools}
  * @private
  */
	onToolRemove: function() {
	},

	/**
  * The method returns the parameter object of the control's rendering template.
  * @protected
  * @return {Object}
  */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		var controlGroupTplData = {
			itemsLength: this.items.length
		};
		controlGroupTplData.wrapContainerClass = this.getContainerClass();
		var wrapClasses = ["ts-controlgroup"];
		if (this.wrapClass) {
			wrapClasses.push(this.wrapClass);
		}
		if (this.collapsed) {
			wrapClasses.push(this.collapsedClass);
		}
		controlGroupTplData.wrapClass = wrapClasses;
		var caption = this.caption;
		if (caption && this.captionInUppercase) {
			caption = caption.toUpperCase();
		}
		controlGroupTplData.caption = caption ? Terrasoft.encodeHtml(caption) : "";
		tplData.direction = Terrasoft.getTextDirection(controlGroupTplData.caption);
		controlGroupTplData.isHeaderVisible = (this.isHeaderVisible === false)
			? this.isHeaderVisible
			: (!Ext.isEmpty(caption) || this.tools.length > 0);
		Ext.apply(controlGroupTplData, tplData, {});
		this.styles = this.getStyles();
		this.selectors = this.getSelectors();
		return controlGroupTplData;
	},

	/**
	 * @protected
	 * @override
	 * @inheritdoc Terrasoft.AbstractContainer#initRenderData
	 */
	initRenderData: function(renderData) {
		this.callParent(arguments);
		renderData.tools = this.tools;
		renderData.renderTool = this.renderTool;
	},

	/**
  * The method implements the receipt of the HTML markup of the transferred item in the toolbar and writes it to the buffer.
  * @param {String []} buffer The buffer for writing HTML.
  * @param {Terrasoft.Component} item Toolbar item.
  * @private
  */
	renderTool: function(buffer, item) {
		var html = item.generateHtml();
		buffer.push(html);
	},

	/**
  * The method returns css container classes.
  * @return {String[]}
  * @return {String} css classes.
  * @protected
  */
	getContainerClass: function() {
		var classes = [];
		classes.push("ts-controlgroup-container");
		if (!this.caption) {
			classes.push(this.emptyCaptionClass);
		}
		if (!this.bottomLine) {
			classes.push(this.noLineClass);
		}
		return classes.join(" ");
	},

	/**
  * The method returns the selectors of the control.
  * @protected
  * @return {Object} The selector object
  */
	getSelectors: function() {
		var selectors = {
			el: "#" + this.id,
			toolsEl: "#" + this.id + "-tools",
			wrapEl: "#" + this.id + "-wrap",
			markerEl: "#" + this.id + "-marker",
			markerWrapEl: "#" + this.id + "-wrap-marker",
			captionEl: "#" + this.id + "-caption"
		};
		return selectors;
	},

	/**
  * The method initializes styles for the control template.
  * @protected
  * @return {Object} The object that contains the styles.
  */
	getStyles: function() {
		var styles = {};
		if (this.width !== "") {
			styles.wrapStyle = {};
			styles.wrapStyle.width = this.width;
		}
		return styles;
	},

	/**
  * Initializing a component a group of fields
  * @protected
  * @override
  */
	init: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
    * @event collapsedchanged
    * The logical property has changed
    * @param {collapsed} newValue the new value of the 'collapsed' property
    */
			"collapsedchanged"
		);
		this.initTools();
	},

	/**
  * Initializes the subscription to the DOM event of the control.
  * @override
  * @protected
  */
	initDomEvents: function() {
		this.callParent(arguments);
		var markerWrapEl = this.markerWrapEl;
		if (markerWrapEl) {
			markerWrapEl.on("click", this.toggleCollapsed, this);
		}
		var captionEl = this.captionEl;
		if (captionEl) {
			captionEl.on("click", this.toggleCollapsed, this);
		}
	},

	/**
  * Changes the 'collapsed' property when you click on the group header.
  */
	toggleCollapsed: function() {
		var collapsed = !this.collapsed;
		this.setCollapsed(collapsed);
	},

	/**
  * Collapses/expands a group of controls with controls.
  * @param {Boolean} collapsed The new minimized state.
  */
	setCollapsed: function(collapsed) {
		if (this.collapsed === collapsed) {
			return;
		}
		this.collapsed = collapsed;
		if (!this.rendered) {
			return;
		}
		if (collapsed) {
			this.wrapEl.addCls(this.collapsedClass);
		} else {
			this.wrapEl.removeCls(this.collapsedClass);
		}
		this.fireEvent("collapsedchanged", collapsed);
	},

	/**
  * Sets the width of the control.
  * @param {String} width New width.
  */
	setWidth: function(width) {
		if (this.width === width) {
			return;
		}
		this.width = width;
		if (this.rendered) {
			this.wrapEl.setWidth(width);
		}
	},

	/**
  * Sets the title of the control.
  * @param {String} caption New header.
  */
	setCaption: function(caption) {
		if (caption && this.captionInUppercase) {
			caption = caption.toUpperCase();
		}
		if (this.caption === caption) {
			return;
		}
		var oldCaption = this.caption;
		this.caption = caption;
		if (caption && oldCaption && this.rendered) {
			this.captionEl.dom.innerHTML = Terrasoft.encodeHtml(caption);
		} else {
			this.safeRerender();
		}
	},

	/**
  * Sets the visibility of header.
  * @param {Boolean} isHeaderVisible Show or hide header.
  */
	setIsHeaderVisible: function(isHeaderVisible) {
		if (this.isHeaderVisible === isHeaderVisible) {
			return;
		}
		this.isHeaderVisible = isHeaderVisible;
		this.safeRerender();
	},

	/**
  * The method returns a reference to the DOM element where the elements will be displayed.
  * @override
  * @return {Ext.dom.Element}
  */
	getRenderToEl: function(component) {
		if (this.tools.indexOf(component) !== -1) {
			return this.toolsEl;
		}
		return this.el;
	},

	/**
  * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
  * @override
  */
	getBindConfig: function() {
		var parentBindConfig = this.callParent(arguments);
		var bindConfig = {
			collapsed: {
				changeEvent: "collapsedchanged",
				changeMethod: "setCollapsed"
			},
			caption: {
				changeMethod: "setCaption"
			},
			isHeaderVisible: {
				changeMethod: "setIsHeaderVisible"
			}
		};
		Ext.apply(bindConfig, parentBindConfig);
		return bindConfig;
	},

	/**
	 * @protected
	 * @override
	 * @inheritdoc Terrasoft.Component#getMaskEl
	 */
	getMaskEl: function() {
		return this.el;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#onDestroy
	 */
	onDestroy: function() {
		this.destroyTools();
		this.callParent(arguments);
	},

	/**
  * Destroys the filler elements, unsubscribes from the DOM events, clears the DOM from the elements.
  * Clears the {@link #tools} collection
  */
	destroyTools: function() {
		this.destroyItemsCollection(this.tools);
		this.tools = null;
	},

	/**
	 * @override
	 * @inheritdoc Terrasoft.AbstractContainer#indexOf
	 */
	indexOf: function(item) {
		var itemIndex = this.callParent(arguments);
		if (itemIndex === -1) {
			itemIndex = this.indexOfToolItem(item);
		}
		return itemIndex;
	},

	/**
	 * @override
	 * @inheritdoc Terrasoft.AbstractContainer#bind
	 */
	bind: function() {
		this.callParent(arguments);
		this.tools.each(function(item) {
			item.bind(this.model);
		}, this);
	},

	/**
  * The method adds the transferred component (an array of components) to a collection of toolbar items.
  * @param {Object|Object[]|Terrasoft.Component|Terrasoft.Component[]} tool
  */
	addToolItem: function(tool) {
		this.addToCollection(tool, this.tools);
	},

	/**
  * The method adds the transferred component (an array of components) to the toolbar items collection, starting
  * at the specified position.
  * @param {Object|Object[]|Terrasoft.Component|Terrasoft.Component[]} item
  * @param {Number} index
  */
	insertToolItem: function(item, index) {
		this.insertIntoCollection(item, index, this.tools);
	},

	/**
  * The method removes the component from the toolbar's collection.
  * @param {Object | Terrasoft.Component} item The item to be removed
  */
	removeToolItem: function(item) {
		this.removeFromCollection(item, this.tools);
	},

	/**
  * Get the item position in the toolbar.
  * @param {Terrasoft.Component} item
  * @return {Number} position of the item in the toolbar.
  */
	indexOfToolItem: function(item) {
		return this.indexOfCollection(item, this.tools);
	}

});