/**
 * Class of content builder sheet.
 */
Ext.define("Terrasoft.controls.ContentSheet", {
	extend: "Terrasoft.controls.DroppableContainer",
	alternateClassName: "Terrasoft.ContentSheet",

	mixins: {
		reorderable: "Terrasoft.core.mixins.Reorderable"
	},

	//region Properties: Protected

	/**
	 * Toolbar items collection.
	 * @protected
	 * @type {Ext.util.MixedCollection}
	 */
	tools: null,

	/**
	 * @inheritdoc Terrasoft.Reorderable#reorderableElTpl
	 * @override
	 */
	reorderableElTpl: "<div id=\"{0}\" class=\"{1}\"><div class=\"reorderable-arrow\"></div></div>",

	/**
	 * Sheet width.
	 * @protected
	 * @type {Number}
	 */
	width: null,

	/**
	 * Sheet horizontal alignment.
	 * @protected
	 * @type {String}
	 */
	align: null,

	/**
	 * Sheet width units of measurement.
	 * @protected
	 * @type {String}
	 */
	widthUnit: "px",

	/**
	 * Sheet background color.
	 * @protected
	 * @type {String}
	 */
	backgroundColor: null,

	/**
	 * Template classes.
	 * @protected
	 * @type {Object}
	 */
	tplConfigClasses: {
		contentSheetWrap: ["content-sheet-wrap"],
		contentSheetItems: ["content-sheet-items"],
		contentSheetPlaceholder: ["content-sheet-placeholder"],
		toolsWrapClasses: ["content-sheet-tools-wrap"]
	},

	/**
	 * Template styles.
	 * @protected
	 * @type {Object}
	 */
	tplConfigStyles: null,

	/**
	 * Sheet alignment config object.
	 * @protected
	 * @type {Object}
	 */
	alignSheetConfig: {
		left: {
			"margin-left": "0",
			"margin-right": "auto"
		},
		center: {
			"margin-left": "auto",
			"margin-right": "auto"
		},
		right: {
			"margin-left": "auto",
			"margin-right": "20px"
		}
	},

	/**
	 * @inheritdoc Terrasoft.component#tpl
	 * @override
	 */
	tpl: [
		"<div id=\"{id}-content-sheet\" class=\"{contentSheetWrap}\" style=\"{contentSheetStyle}\">",
		"<div id=\"{id}-content-sheet-placeholder\" class=\"{contentSheetPlaceholder}\">",
		"{placeholder}",
		"</div>",
		"<div id=\"{id}-content-sheet-items\" class=\"{contentSheetItems}\">",
		"{%this.renderItems(out, values)%}",
		"</div>",
		"<div id=\"{id}-content-sheet-tools\" class=\"{toolsWrapClasses}\">",
		"<tpl for=\"tools\">",
		"{%this.renderTool(out, values)%}",
		"</tpl>",
		"</div>",
		"</div>"
	],

	/**
	 * The styles class of the selected item.
	 * @protected
	 * @type {String}
	 */
	selectedClass: "content-sheet-selected",

	/**
	 * Sign of the highlighted item.
	 * @protected
	 * @type {Boolean}
	 */
	selected: null,

	/**
	 * The text that will be displayed in the absence of elements.
	 * @protected
	 * @type {String}
	 */
	placeholder: null,

	//endregion

	//region Methods: Private

	/**
	 * Sets alignSheetConfig by direction.
	 * @private
	 */
	_setAlignSheetConfig: function() {
		if (Terrasoft.getIsRtlMode()) {
			this.alignSheetConfig.right["margin-right"] = "0";
			this.alignSheetConfig.left["margin-left"] = "20px";
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * The method returns a reference to the DOM element where items will be displayed.
	 * @override
	 * @return {Ext.dom.Element}
	 */
	getRenderToEl: function(component) {
		if (this.tools.indexOf(component) !== -1) {
			return this.toolsEl;
		}
		return this.itemsEl;
	},

	/**
	 * Applies template config properties.
	 * @protected
	 * @param {Object} tplData Object of rendering template settings.
	 * @param {String} tplConfig template config object.
	 */
	applyTplConfigProperties: function(tplData, tplConfig) {
		Terrasoft.each(tplConfig, function(propertyValue, propertyName) {
			tplData[propertyName] = Terrasoft.deepClone(propertyValue);
		}, this);
	},

	/**
	 * Applies template config styles.
	 * @protected
	 * @param {Object} tplData Object of rendering template settings.
	 */
	applyTplClasses: function(tplData) {
		this.applyTplConfigProperties(tplData, this.tplConfigClasses);
	},

	/**
	 * Initializes the elements of the toolbar. It called after the container is initialized.
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
	 * Adds the transferred component (components array) in the collection toolbar items.
	 * @param {Object|Object[]|Terrasoft.Component|Terrasoft.Component[]} tool The element to add.
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
	 * Removes item from toolbar items collection.
	 * @param {Object|Terrasoft.Component} item Removing item.
	 */
	removeToolItem: function(item) {
		this.removeFromCollection(item, this.tools);
	},

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
	 * Implements receiving of transferred toolbar item HTML-markup and stores it in a buffer.
	 * @protected
	 * @param {String[]} buffer Buffer for storing HTML.
	 * @param {Terrasoft.Component} item Toolbar item.
	 */
	renderTool: function(buffer, item) {
		var html = item.generateHtml();
		buffer.push(html);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#bind
	 * @override
	 */
	bind: function() {
		this.mixins.bindable.bind.apply(this, arguments);
		this.tools.each(function(item) {
			item.bind(this.model);
		}, this);
	},

	/**
	 * Applies control template styles
	 * @protected
	 * @param {Object} tplData The object of render control template parameters.
	 */
	applyTplStyles: function(tplData) {
		var style = {};
		if (this.width) {
			style.width = this.width + this.widthUnit;
		}
		if (this.align) {
			Ext.apply(style, this.alignSheetConfig[this.align]);
		}
		if (this.backgroundColor) {
			style["background-color"] = this.backgroundColor;
		}
		tplData.contentSheetStyle = Ext.apply(this.tplConfigStyles, style);
		this.applyTplConfigProperties(tplData, this.tplConfigStyles);
	},

	/**
	 * @inheritdoc Terrasoft.Component#getTplData
	 * @override
	 */
	getTplData: function() {
		var selectors = this.selectors;
		selectors.wrapEl = Ext.String.format("#{0}-content-sheet", this.id);
		selectors.itemsEl = Ext.String.format("#{0}-content-sheet-items", this.id);
		selectors.toolsEl = Ext.String.format("#{0}-content-sheet-tools", this.id);
		selectors.placeholderEl = Ext.String.format("#{0}-content-sheet-placeholder", this.id);
		var tplData = this.callParent(arguments);
		Ext.apply(tplData, {
			toolsWrapClasses: Terrasoft.deepClone(this.toolsWrapClasses),
			hasTools: this.tools && this.tools.getCount()
		});
		this.applyTplClasses(tplData);
		this.applyTplStyles(tplData);
		if (this.selected) {
			tplData.contentSheetWrap.push(this.selectedClass);
		}
		if (!this.items || this.items.getCount() === 0) {
			tplData.contentSheetPlaceholder.push("content-sheet-placeholder-visible");
		}
		tplData.placeholder = this.placeholder;
		return tplData;
	},

	/**
	 * Sets placeholders visibility.
	 * @param {Boolean} visible Visibility value.
	 */
	setPlaceholderVisible: function(visible) {
		var placeholderEl = this.placeholderEl;
		if (placeholderEl) {
			if (visible) {
				this.placeholderEl.addCls("content-sheet-placeholder-visible");
			} else {
				this.placeholderEl.removeCls("content-sheet-placeholder-visible");
			}
		}
	},

	/**
	 * The event handler changes the collection of sheet elements.
	 * @protected
	 */
	onItemsChange: function() {
		this.setPlaceholderVisible(!this.items || this.items.getCount() === 0);
	},

	/**
	 * @inheritdoc Terrasoft.Component#constructor
	 * @override
	 */
	constructor: function() {
		this.tplConfigStyles = {};
		this._setAlignSheetConfig();
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.Component#init
	 * @override
	 */
	init: function() {
		this.selectors = {wrapEl: ""};
		this.callParent(arguments);
		this.tag = this.id;
		this.initTools();
		this.addEvents(
			/**
			 * @event selectedChanged
			 * Change event of the status of element selection
			 */
			"selectedChanged"
		);
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		var reorderableBindConfig = this.mixins.reorderable.getBindConfig.apply(this, arguments);
		var parentBindConfig = Ext.apply(reorderableBindConfig, this.callParent(arguments));
		return Ext.apply(parentBindConfig, {
			selected: {
				changeEvent: "selectedChanged",
				changeMethod: "setSelected"
			},
			placeholder: {
				changeMethod: "setPlaceholder"
			},
			width: {
				changeMethod: "setWidth"
			},
			backgroundColor: {
				changeMethod: "setBackgroundColor"
			},
			sheetAlign: {
				changeMethod: "setAlign"
			}
		});
	},

	/**
	 * Destroys toolbar items, unsubscribes from DOM events, removes elements from DOM.
	 * Clears collection {@link #tools}
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

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
	 * @protected
	 */
	subscribeForCollectionEvents: function() {
		this.mixins.reorderable.subscribeForCollectionEvents.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
	 * @protected
	 */
	unSubscribeForCollectionEvents: function(binding, property, model) {
		if (model) {
			this.mixins.reorderable.unSubscribeForCollectionEvents.apply(this, arguments);
		}
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#onItemAdd
	 * @override
	 */
	onItemAdd: function() {
		this.callParent(arguments);
		this.onItemsChange();
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#onItemRemove
	 * @override
	 */
	onItemRemove: function(item, key) {
		item.removed(this);
		this.unSubscribeItemMappedEvents(item);
		this.onItemsChange();
	},

	//endregion

	//region Methods: Public

	/**
	 * Sets the 'selected' value for the control.
	 * @param {Boolean} value Value.
	 */
	setSelected: function(value) {
		if (this.selected !== value) {
			this.selected = value;
			this.fireEvent("selectedChanged", this.selected, this);
			if (this.rendered) {
				if (value) {
					this.wrapEl.addCls(this.selectedClass);
				} else {
					this.wrapEl.removeCls(this.selectedClass);
				}
			}
		}
	},

	/**
	 * Sets the placeholder value for the control.
	 * @param {String} placeholder The text that is displayed when the input field is empty.
	 */
	setPlaceholder: function(placeholder) {
		if (this.placeholder !== placeholder) {
			this.placeholder = placeholder;
		}
	},

	/**
	 * Sets the width value for the control.
	 * @param {Number} width Canvas width.
	 */
	setWidth: function(width) {
		if (this.width !== width) {
			this.width = width;
			if (this.rendered) {
				var wrapEl = this.getWrapEl();
				wrapEl.setWidth(width);
			}
		}
	},

	/**
	 * Sets align value for control element.
	 * @param {String} align Sheet alignment.
	 */
	setAlign: function(align) {
		align = this._getAlignByPageDirection(align);
		if (this.align !== align) {
			this.align = align;
			if (this.rendered) {
				var wrapEl = this.getWrapEl();
				wrapEl.setStyle(this.alignSheetConfig[align]);
			}
		}
	},

	/**
	 * Returns sheet alignment by page direction.
	 * @private
	 * @param {String} align Sheet alignment.
	 * @return {String} Sheet alignment.
	 */
	_getAlignByPageDirection: function(align) {
		var alignByDirection = align;
		if (!Terrasoft.getIsRtlMode()) {
			return alignByDirection;
		}
		switch (align) {
			case "left":
				alignByDirection = "right";
				break;
			case "right":
				alignByDirection = "left";
				break;
			default:
				break;
		}
		return alignByDirection;
	},

	/**
	 * Sets the backgroundColor value of the control.
	 * @param {String} color The background color of the canvas.
	 */
	setBackgroundColor: function(color) {
		if (this.backgroundColor !== color) {
			this.backgroundColor = color;
			if (this.rendered) {
				var wrapEl = this.getWrapEl();
				wrapEl.setStyle("background-color", color);
			}
		}
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Droppable#getDropZoneInitDefaultConfig
	 * @override
	 */
	getDropZoneInitDefaultConfig: function() {
		return {
			itemType: "sheet"
		};
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Reorderable#createZeroElement
	 * @override
	 */
	createZeroElement: function() {
		this.mixins.reorderable.createZeroElement.apply(this, arguments);
		var zeroElementId = this.getZeroElementId();
		var zeroElement = Ext.get(zeroElementId);
		zeroElement.initDDTarget(this.getGroupName(), {
			id: this.id,
			itemType: "block",
			isZero: true
		}, {});
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Droppable#clearDropZones
	 * @override
	 */
	clearDropZones: function() {
		var ddIds = Ext.dd.DragDropManager.ids;
		var groupName = this.getGroupName();
		var groupElements = groupName && ddIds[groupName];
		if (groupElements) {
			Ext.Object.each(groupElements, function(property, value){
				if (value.config && value.config.itemType === "block") {
					delete groupElements[property];
					var group = ddIds[property];
					group && delete ddIds[property];
				}
			}, this);
			delete ddIds[groupName];
		}
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.mixins.reorderable.onAfterRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.mixins.reorderable.onAfterReRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.component#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.mixins.reorderable.onDestroy.apply(this, arguments);
		this.destroyTools();
		this.callParent(arguments);
	}

	//endregion

});
