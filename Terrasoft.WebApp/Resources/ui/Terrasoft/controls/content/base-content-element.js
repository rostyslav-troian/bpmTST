/**
 */
Ext.define("Terrasoft.controls.BaseContentElement", {
	extend: "Terrasoft.controls.AbstractContainer",
	alternateClassName: "Terrasoft.BaseContentElement",

	mixins: {
		draggable: "Terrasoft.mixins.DraggableContentElement"
	},

	//region Properties: Private

	/**
	 * Indicates that the item is selected.
	 * @private
	 * @type {Boolean}
	 */
	selected: false,

	//endregion

	//region Properties: Protected

	/**
	 * Identifier of column containing current element.
	 * @protected
	 * @type {String}
	 */
	columnId: null,

	/**
	 * Reference to the target container.
	 * @protected
	 * @type {Terrasoft.ReorderableContainer}
	 */
	container: null,

	/**
	 * A collection of toolbar items.
	 * @protected
	 * @type {Ext.util.MixedCollection}
	 */
	tools: null,

	/**
	 * A collection of style classes for the tool container.
	 * @protected
	 * @type {String[]}
	 */
	toolsWrapClasses: ["content-element-tools-wrap"],

	/**
	 * A collection of style classes for the control container.
	 * @protected
	 * @type {String[]}
	 */
	contentWrapClasses: ["content-element-wrap"],

	/**
	 * The style class of the selected item.
	 * @protected
	 * @type {String}
	 */
	selectedClass: "t-content-focus",

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		"<div id=\"{id}-content-element\" style=\"{wrapStyle}\" class=\"{wrapClassName}\">",
			"{%this.renderItems(out, values)%}",
			"<tpl if=\"hasTools\">",
				"<div id=\"{id}-content-element-tools\" class=\"{toolsWrapClasses}\">",
					"<tpl for=\"tools\">",
						"{%this.renderTool(out, values)%}",
					"</tpl>",
				"</div>",
			"</tpl>",
		"</div>"
	],

	//endregion

	//region Methods: Private

	/**
	 * The method initializes the elements of the toolbar. It is called after the container is initialized.
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
	 * The method implements getting the HTML markup of the transferred toolbar item and writes it to the buffer.
	 * @private
	 * @param {String []} buffer The buffer for writing HTML.
	 * @param {Terrasoft.Component} item Toolbar item.
	 */
	renderTool: function(buffer, item) {
		var html = item.generateHtml();
		buffer.push(html);
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#initRenderData
	 * @override
	 */
	initRenderData: function(renderData) {
		this.callParent(arguments);
		renderData.tools = this.tools;
		renderData.renderTool = this.renderTool;
	},

	/**
	 * Handles the mouse click.
	 * @protected
	 * @param {Ext.EventObjectImpl} event The event object.
	 */
	onClick: function(event) {
		this.setSelected(true);
		event.stopPropagation();
	},

	/**
	 * Initializes DOM events.
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
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
	 * @inheritdoc Terrasoft.component#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		this.selectors = this.getSelectors();
		Ext.apply(tplData, {
			wrapClassName: this.getWrapClasses()
		});
		Ext.apply(tplData, {
			toolsWrapClasses: this.toolsWrapClasses,
			hasTools: this.tools && this.tools.getCount()
		});
		return tplData;
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
	},

	/**
	 * The method returns the selectors of the control.
	 * @protected
	 * @return {Object} The selector object.
	 */
	getSelectors: function() {
		var selectors = {
			toolsEl: "#" + this.id + "-content-element-tools",
			wrapEl: "#" + this.id + "-content-element"
		};
		return selectors;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.initTools();
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#getRenderToEl
	 * @override
	 */
	getRenderToEl: function(component) {
		if (this.tools.indexOf(component) !== -1) {
			return this.toolsEl;
		}
		return this.getWrapEl();
	},

	/**
	 * @inheritdoc Terrasoft.component#added
	 * @override
	 */
	added: function(ownerCt) {
		this.ownerCt = ownerCt;
		this.fireEvent("added", this, ownerCt);
		this.ownerCtListeners = ownerCt.on({
			beforererender: this.onOwnerCtBeforeRerender,
			afterrender: {
				fn: this.onOwnerCtAfterRenderOrAfterRerender.bind(this, "afterrender"),
				scope: this,
				single: true
			},
			afterrerender: this.onOwnerCtAfterRenderOrAfterRerender.bind(this, "afterrerender"),
			scope: this,
			destroyable: true
		});
		if (ownerCt.rendered === true) {
			var index = ownerCt.indexOf(this) + 1;
			var renderEl = ownerCt.getRenderToEl(this);
			if (renderEl) {
				this.render(renderEl, index);
			}
		}
	},

	/**
	 * Destroys toolbar items, unsubscribes from DOM events, clears DOM from items.
	 * Clears the collection {@link #tools}
	 * @protected
	 */
	destroyTools: function() {
		this.destroyItemsCollection(this.tools);
		this.tools = null;
	},

	/**
	 * Get the item position in the toolbar.
	 * @protected
	 * @param {Terrasoft.Component} item Control.
	 * @return {Number} position of the item in the toolbar.
	 */
	indexOfToolItem: function(item) {
		return this.indexOfCollection(item, this.tools);
	},

	/**
	 * The event handler for adding an item to the collection {@link #tools}
	 * @protected
	 * @param {Number} index The index of the added element
	 * @param {Terrasoft.Component} item The added element
	 */
	onToolAdd: function(index, item) {
		item.added(this);
	},

	/**
	 * The event handler for removing the control from the collection {@link #tools}
	 * @protected
	 */
	onToolRemove: Terrasoft.emptyFn,

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.mixins.draggable.addDraggableEvents.apply(this);
	},

	/**
	 * @inheritdoc Terrasoft.mixins.Draggable#getDraggableConfig
	 * @override
	 */
	getDraggableConfig: function() {
		var draggableConfig = {};
		draggableConfig[Terrasoft.DragAction.MOVE] = {
			autoGenerateDraggableElement: false,
			elementId: this.id + "-dragg-el-wrapperEl",
			handlers: {
				b4StartDrag: "b4StartDrag",
				onDragEnter: "onDragEnter",
				onDragOver: "onDragOver",
				onDragOut: "onDragOut",
				onDragDrop: "onDragDrop",
				onInvalidDrop: "onInvalidDrop"
			}
		};
		return draggableConfig;
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Draggable#getDraggableElementDefaultConfig
	 * @override
	 */
	getDraggableElementDefaultConfig: function() {
		return {
			isTarget: false,
			instance: this,
			tag: this.tag,
			columnId: this.columnId
		};
	},

	/**
	 * @inheritdoc Terrasoft.Draggable#initDraggable
	 * @override
	 */
	initDraggable: function() {
		this.mixins.draggable.initDraggable.apply(this, arguments);
		var dropZoneEl = this.getWrapEl();
		dropZoneEl.initDDTarget(this.getGroupName(), {
			columnId: this.columnId,
			itemType: "element",
			id: this.id
		}, {});
	},

	/**
	 * Sets the selection flag for the item.
	 * @param {Boolean} selected Indicates that the item is selected.
	 */
	setSelected: function(selected) {
		if (this.selected === selected) {
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
		this.fireEvent("selectedChanged", selected, this);
	},

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var elementConfig = {
			selected: {
				changeEvent: "selectedChanged",
				changeMethod: "setSelected"
			}
		};
		Ext.apply(elementConfig, bindConfig);
		return elementConfig;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#indexOf
	 * @override
	 */
	indexOf: function(item) {
		var itemIndex = this.callParent(arguments);
		if (itemIndex === -1) {
			itemIndex = this.indexOfToolItem(item);
		}
		return itemIndex;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#bind
	 * @override
	 */
	bind: function() {
		this.callParent(arguments);
		this.tools.each(function(item) {
			item.bind(this.model);
		}, this);
	},

	/**
	 * The method adds the transferred component (an array of components) to a collection of toolbar items.
	 * @param {Object | Object [] | Terrasoft.Component | Terrasoft.Component []} tool The element to add.
	 */
	addToolItem: function(tool) {
		this.addToCollection(tool, this.tools);
	},

	/**
	 * The method adds the transferred component (an array of components) to the toolbar items collection, starting
	 * at the specified position.
	 * @param {Object | Object [] | Terrasoft.Component | Terrasoft.Component []} item The item to add.
	 * @param {Number} index Item position.
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
	 * @inheritdoc Terrasoft.component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.mixins.draggable.onAfterRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.mixins.draggable.onAfterReRender.apply(this, arguments);
	},

	/**
	 * Delete the menu and release all resources.
	 * @inheritdoc Terrasoft.AbstractContainer#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.destroyTools();
		this.mixins.draggable.onDestroy.apply(this, arguments);
		this.callParent(arguments);
	}

	//endregion

});
