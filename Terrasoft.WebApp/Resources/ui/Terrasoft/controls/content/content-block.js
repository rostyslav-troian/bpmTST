/**
 * Class of content builder block.
 */
Ext.define("Terrasoft.controls.ContentBlock", {
	extend: "Terrasoft.controls.GridLayout",
	alternateClassName: "Terrasoft.ContentBlock",

	mixins: {
		draggable: "Terrasoft.mixins.DraggableContentBlock",
		selectable: "Terrasoft.mixins.SelectableContentBlock",
		contentBlock: "Terrasoft.mixins.ContentBlockMixin"
	},

	//region Properties: Protected

	itemName: "content-block",

	/**
	 * Object matching model parameters and control elements values.
	 * @protected
	 * @type {Object}
	 */
	defaultModelNames: {
		primaryColumn: "Id",
		column: "Column",
		row: "Row",
		colSpan: "ColSpan",
		rowSpan: "RowSpan"
	},

	/**
	 * Template classes.
	 * @protected
	 * @type {Object}
	 */
	tplConfigClasses: {
		wrapClassName: ["content-block-wrap"],
		captionLabelClasses: ["content-block-label"],
		selectButtonClasses: ["content-block-select-button"]
	},

	/**
	 * @inheritdoc Terrasoft.controls.GridLayout#spacerCssClass
	 * @override
	 */
	spacerCssClass: "content-block-spacer",

	/**
	 * @inheritdoc Terrasoft.controls.GridLayout#rowClassTemplate
	 * @override
	 */
	rowClassTemplate: "content-block-row ts-box-sizing {rowClassName}",

	/**
	 * @inheritdoc Terrasoft.controls.GridLayout#columnClassTemplate
	 * @override
	 */
	columnClassTemplate: "content-block-column ts-box-sizing {columnClassName}",

	/**
	 * Select button title (hint on hover).
	 * @protected
	 * @type {String}
	 */
	selectButtonTitle: Terrasoft.Resources.ContentBlock.SelectBlockButtonTitle,

	/**
	 * Block caption.
	 * @protected
	 * @type {String}
	 */
	caption: null,

	/**
	 * Block group menu.
	 * @protected
	 * @type {Terrasoft.Button}
	 */
	groupMenu: null,

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		`<div id="{id}-content-block" class="{wrapClassName}">
			<tpl if="caption">
				{%this.renderGroupMenu(out, values)%}
				<span id="{id}-content-block-label" class="{captionLabelClasses}">{caption}</span>
			</tpl>
			<div id="{id}-content-block-body" style="{wrapStyle}">
				<div id="{id}-content-block-select" class="{selectButtonClasses}" title="{selectButtonTitle}"></div>
				{%this.renderItems(out, values)%}
				<tpl if="hasTools">
					<div id="{id}-content-block-tools" class="{toolsWrapClasses}">
						<tpl for="tools">
							{%this.renderTool(out, values)%}
						</tpl>
					</div>
				</tpl>
			</div>
		</div>`
	],

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.initTools();
		this.initGroupMenu();
		this.addEvents("elementSelectedChange");
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#initRenderData
	 * @override
	 */
	initRenderData: function(renderData) {
		this.callParent(arguments);
		this.addToolsToRenderData(renderData);
		renderData.groupMenu = this.groupMenu;
		renderData.renderGroupMenu = this.renderGroupMenu;
	},

	/**
	 * @inheritdoc Terrasoft.component#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		this.selectors = this.getSelectors();
		this.applyToolsSelector(this.selectors);
		this.applyTplClasses(tplData);
		this.applyToolsTplData(tplData);
		this.addSelectedClass(tplData);
		tplData.selectButtonTitle = this.selectButtonTitle;
		return tplData;
	},

	/**
	 * Initialize DOM events.
	 * @protected
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		this.mixins.selectable.subscribeForDomEvents.apply(this);
		this.subscribeItemsEvents();
	},

	/**
	 * Returns layout item configuration.
	 * @protected
	 * @param {Terrasoft.BaseViewModel|Object} item Collection element or configuration of elements.
	 * @return {Object} Configuration object of layout element.
	 */
	getLayoutItemConfig: function(item) {
		var layoutItem = {};
		var multiplier = this.columnsMultiplier;
		if (Terrasoft.instanceOfClass(item, "Terrasoft.BaseModel")) {
			layoutItem = {
				itemId: item.get(this.defaultModelNames.primaryColumn),
				row: item.get(this.defaultModelNames.row),
				rowSpan: item.get(this.defaultModelNames.rowSpan) || 1,
				column: multiplier * item.get(this.defaultModelNames.column),
				colSpan: multiplier * (item.get(this.defaultModelNames.colSpan) || 1)
			};
		} else {
			layoutItem = {
				itemId: item.item.id,
				row: item.row,
				rowSpan: item.rowSpan || 1,
				column: multiplier * item.column,
				colSpan: multiplier * (item.colSpan || 1)
			};
		}
		return layoutItem;
	},

	/**
	 * Separates layout configuration from control configuration.
	 * @protected
	 * @param {Object} config Array of container elements.
	 */
	fillLayoutItems: function(config) {
		Terrasoft.each(config, function(item) {
			var layoutItem = this.getLayoutItemConfig(item);
			this.addLayoutItem(layoutItem);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#getRenderToEl
	 * @override
	 */
	getRenderToEl: function(item) {
		if (this.tools.indexOf(item) !== -1) {
			return this.toolsEl;
		}
		return this.callParent(arguments);
	},

	/**
	 * Returns layout template of empty row.
	 * @protected
	 * @return {String} Layout template.
	 */
	getSpacerHtmlConfig: function() {
		return "<div class=\"content-block-columns " + this.spacerCssClass + " {spacerClassName}\" style=\"width:100%;\"></div>";
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#prepareItems
	 * @override
	 */
	prepareItems: function(items) {
		if (!Ext.isArray(items)) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		this.columnsMultiplier = this.maxColumnsCount / this.equalColumnsCount;
		this.fillLayoutItems(items);
		this.maxRowsCount = this.getRowsCount();
		return this.mixins.contentBlock.prepareBlockItems.call(this, items);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#add
	 * @override
	 */
	add: function() {
		this.callParent(arguments);
		this.checkCellsIntersection();
	},

	/**
	 * Removes element from layout.
	 * @protected
	 * @param {String} itemId Unique element id.
	 */
	removeItemFromLayout: function(itemId) {
		var layoutItems = this.layoutItems;
		Terrasoft.each(layoutItems, function(row) {
			Terrasoft.each(row, function(rowItem, rowName) {
				if (rowItem.itemId === itemId) {
					delete row[rowName];
				}
			}, this);
		}, this);
	},

	/**
	 * Handler of collection 'remove' event.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} itemModel Collection element.
	 */
	onDeleteItem: function(itemModel) {
		var id = itemModel.get(this.defaultModelNames.primaryColumn);
		this.mixins.contentBlock.onDeleteItem.apply(this, [itemModel]);
		this.removeItemFromLayout(id);
	},

	/**
	 * Handler of collection 'clear' event.
	 * @protected
	 */
	clearItems: function() {
		this.mixins.contentBlock.clearItems.apply(this);
		this.layoutItems = {};
	},

	/**
	 * Block group menu initialization. Executes after container initialization.
	 * @protected
	 */
	initGroupMenu: function() {
		var groupMenu = this.groupMenu;
		var className = groupMenu && groupMenu.className;
		this.groupMenu = Ext.create(className || "Terrasoft.Component", groupMenu);
		this.groupMenu.added(this);
	},

	/**
	 * Generates HTML-markup for block group menu and stores it in a buffer.
	 * @protected
	 * @virtual
	 */
	renderGroupMenu: Terrasoft.emptyFn,

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
	 * Handler of collection 'dataLoaded' event.
	 * @protected
	 * @param {Terrasoft.Collection} collection Collection.
	 */
	onCollectionDataLoaded: function(collection) {
		this.mixins.contentBlock.onCollectionDataLoaded.apply(this, [collection]);
		if (collection) {
			this.checkCellsIntersection();
		}
	},

	/**
	 * Handler of collection 'itemChanged' event.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} itemModel Changing element.
	 * @param {Object} config Event options.
	 */
	onUpdateItem: function(itemModel, config) {
		var id = itemModel.get(this.defaultModelNames.primaryColumn);
		this.removeItemFromLayout(id);
		this.fillLayoutItems({item: itemModel});
		this.checkCellsIntersection();
		this.mixins.contentBlock.onUpdateItem.apply(this, [itemModel, config]);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#onItemAdd
	 * @override
	 */
	onItemAdd: function() {
		this.callParent(arguments);
		this.safeRerender();
	},

	/**
	 * Handles child element select.
	 * @protected
	 */
	onSelectedChanged: function(selected, item) {
		if (selected) {
			this.fireEvent("elementSelectedChange", item.id);
		}
	},

	/**
	 * Subscribes for child items events.
	 * @protected
	 */
	subscribeItemsEvents: function() {
		this.items.each(function(item) {
			item.on("selectedChanged", this.onSelectedChanged, this);
		}, this);
	},

	/**
	 * Unsubscribes from child items events.
	 * @protected
	 */
	unSubscribeItemsEvents: function() {
		this.items.each(function(item) {
			item.un("selectedChanged", this.onSelectedChanged, this);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
	 * @override
	 */
	subscribeForCollectionEvents: function(binding, property, model) {
		var collection = model.get(binding.modelItem);
		this.subscribeCollection(collection);
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
	 * @override
	 */
	unSubscribeForCollectionEvents: function(binding, property, model) {
		if (model) {
			var collection = model.get(binding.modelItem);
			this.unSubscribeCollection(collection);
		}
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.mixins.draggable.addDraggableEvents.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.Component#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		this.applyBlockBindConfig(bindConfig);
		this.applySelectedBindConfig(bindConfig);
		return bindConfig;
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
		this.mixins.bindable.bind.apply(this, arguments);
		this.mixins.selectable.bindTools.apply(this);
		if (this.groupMenu) {
			this.groupMenu.bind(this.model);
		}
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.mixins.selectable.destroyTools.apply(this);
		this.mixins.draggable.onDestroy.apply(this, arguments);
		this.unSubscribeItemsEvents();
		this.callParent(arguments);
	}

	//endregion

});
