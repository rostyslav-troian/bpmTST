/**
 */
Ext.define("Terrasoft.mixins.SelectableContentBlock", {
	alternateClassName: "Terrasoft.SelectableContentBlock",
    extend: "Terrasoft.BaseObject",
    
	//region Properties: Protected

	/**
	 * True when block can be selected.
	 * @protected
	 * @type {Boolean}
	 */
	isSelectable: false,

	/**
	 * Indicates that the item is selected
	 * @protected
	 * @type {Boolean}
	 */
	selected: false,

	/**
	 * Selected block style class.
	 * @protected
	 * @type {String}
	 */
	selectedClass: "t-content-block-focus",

	/**
	 * Toolbar items collection.
	 * @protected
	 * @type {Ext.util.MixedCollection}
	 */
    tools: null,
    
    toolsWrapClasses: ["content-block-tools-wrap"],

	//endregion

	/**
	 * Adds selected class to component classes.
	 * @protected
	 * @param {Object} tplData Object of rendering template settings.
	 */
	addSelectedClass: function(tplData) {
		if (this.selected) {
			tplData.wrapClassName.push(this.selectedClass);
		}
	},

	/**
	 * Applies selected config to component bind config.
	 * @protected
	 * @param {Object} bindConfig Component bind config.
	 */
	applySelectedBindConfig: function(bindConfig) {
		Ext.apply(bindConfig, {
			selected: {
				changeEvent: "selectedChanged",
				changeMethod: "setSelected"
			}
		});
	},

	/**
	 * Sets the indicator that the block is selected.
	 * @param {Boolean} selected The indicator that the block is selected.
	 */
	setSelected: function(selected) {
		if (this.selected === selected || !this.isSelectable) {
			return;
		}
		this.selected = selected;
		var selectedClass = this.selectedClass;
		var wrapEl = this.getWrapEl();
		if (wrapEl && selectedClass && this.rendered) {
			if (selected) {
				wrapEl.addCls(selectedClass);
			} else {
				wrapEl.removeCls(selectedClass);
			}
		}
	},

	/**
	 * Handles mouse click.
	 * @protected
	 */
	onClick: function() {
		this.setSelected(true);
		this.fireEvent("selectedChanged", true, this);
	},

	/**
	 * Subscribes for DOM events.
	 * @protected
	 */
	subscribeForDomEvents: function() {
		var wrapEl = this.getWrapEl();
		if (wrapEl) {
			wrapEl.on({
				click: {
					fn: this.onClick,
					scope: this
				}
			});
		}
	},

	/**
	 * Binds tools to component model.
	 * @protected
	 */
	bindTools: function() {
		this.tools.each(function(item) {
			item.bind(this.model);
		}, this);
	},

	/**
	 * Container tools initialization. Execute after container initialization.
	 * @protected
	 */
	initTools: function() {
		var tools = this.tools;
		var collection = this.tools = new Ext.util.MixedCollection(false, this.getComponentId);
		collection.on("add", this.onToolAdd, this);
		collection.on("remove", this.onToolRemove, this);
		this.addToolItem(tools);
	},

	/**
	 * Generates HTML-markup for input tools element and stores it in a buffer.
	 * @protected
	 * @param {String[]} buffer Recording buffer for HTML.
	 * @param {Terrasoft.Component} item Tools item.
	 */
	renderTool: function(buffer, item) {
		var html = item.generateHtml();
		buffer.push(html);
	},

	/**
	 * Adds tools to rendering object.
	 * @protected
	 * @param {Object} renderData Rendering object.
	 */
	addToolsToRenderData: function(renderData) {
		renderData.tools = this.tools;
		renderData.renderTool = this.renderTool;
	},

	/**
	 * Adds tools data to element template data.
	 * @protected
	 * @param {Object} tplData Element template data.
	 */
	applyToolsTplData: function(tplData) {
        if (this.isSelectable) {
            Ext.apply(tplData, {
                toolsWrapClasses: this.toolsWrapClasses,
                hasTools:  this.tools && this.tools.getCount()
            });
        }
	},

	/**
	 * Adds tools selector to element selectors.
	 * @protected
	 * @param {Object} selectors Element selectors.
	 */
	applyToolsSelector: function(selectors) {
		Ext.apply(selectors, {
			toolsEl: "#" + this.id + "-content-block-tools"
		});
	},

	/**
	 * Handler of adding item to the collection {@link #tools}.
	 * @protected
	 * @param {Number} index Added item index.
	 * @param {Terrasoft.Component} item Added item.
	 */
	onToolAdd: function(index, item) {
		item.added(this);
	},

	/**
	 * Handler of removing tools item {@link #tools}.
	 * @protected
	 */
	onToolRemove: Terrasoft.emptyFn,

	/**
	 * Adds component or component array to tool panel.
	 * @param {Object|Object[]|Terrasoft.Component|Terrasoft.Component[]} item Adding tool item.
	 */
	addToolItem: function(item) {
		if (!item) {
			return;
		}
		var collection = this.tools;
		var items = Ext.isArray(item) ? item : [item];
		this.fireEvent("beforeadd", this, items, collection);
		for (var j = 0, toolsLength = items.length; j < toolsLength; j++) {
			var itemToAdd = items[j];
			if (itemToAdd.isComponent !== true) {
				itemToAdd = items[j] = Ext.create(itemToAdd.className || "Terrasoft.Component", itemToAdd);
			}
			collection.add(itemToAdd);
		}
		this.fireEvent("add", this, items, collection);
	},

	/**
	 * Returns item position in tool panel.
	 * @param {Object|Object[]|Terrasoft.Component|Terrasoft.Component[]} item Tool item.
	 * @return {Number} Tool item position.
	 */
	indexOfToolItem: function(item) {
		return this.indexOfCollection(item, this.tools);
	},

	/**
	 * Destroys tools, unsubscribes from the DOM events, cleans DOM from the elements,
	 * cleans tool collection {@link #tools}.
	 * @protected
	 */
	destroyTools: function() {
		this.destroyItemsCollection(this.tools);
		this.tools = null;
	}

});
