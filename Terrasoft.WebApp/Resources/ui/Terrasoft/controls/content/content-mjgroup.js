/**
 * Class of content builder block section.
 */
Ext.define("Terrasoft.controls.ContentMjGroup", {
	extend: "Terrasoft.controls.AbstractContainer",
	alternateClassName: "Terrasoft.ContentMjGroup",

	mixins: {
		contentBlock: "Terrasoft.mixins.ContentBlockMixin"
	},

	/**
	 * Content item name.
	 * @protected
	 * @type {String}
	 */
	itemName: "content-mjgroup",

	/**
	 * A collection of toolbar items.
	 * @protected
	 * @type {Ext.util.MixedCollection}
	 */
	tools: null,

	/**
	 * Width style of current column (%).
	 * @protected
	 * @type {Number}
	 */
	width: null,

	/**
	 * A collection of style classes for the tool container.
	 * @protected
	 * @type {String[]}
	 */
	toolsWrapClasses: ["mjgroup-grouping-control"],

	/**
	 * Template classes.
	 * @protected
	 * @type {Object}
	 */
	tplConfigClasses: {
		wrapClassName: ["content-mjgroup-wrap"],
		groupClassName: ["content-mjgroup"]
	},

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		`<div id="{id}-content-mjgroup" class="{wrapClassName}" style="{wrapStyle}">
			<div id="{id}-inner-container" class="{groupClassName}">` +
				`{%this.renderItems(out, values)%}` +
			`</div>
			<tpl if="hasTools">
				<div id="{id}-content-mjgroup-tools" class="{toolsWrapClasses}">
					<tpl for="tools">
						{%this.renderTool(out, values)%}
					</tpl>
				</div>
			</tpl>
		</div>`
	],

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.initTools();
	},

	/**
	 * Adds specific mjgroup styles before rendering.
	 * @protected
	 */
	extendWrapStyles: function() {
		this.styles.wrapStyle = Ext.apply(this.styles.wrapStyle || {}, {
			"direction": "ltr"
		});
	},

	/**
	 * @inheritdoc Terrasoft.component#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		this.selectors = this.getSelectors();
		this.extendWrapStyles(tplData);
		this.applyTplClasses(tplData);
		this.applyToolsTplData(tplData);
		this.applyGroupWidth();
		return tplData;
	},

	/**
	 * Adds tools data to element template data.
	 * @protected
	 * @param {Object} tplData Element template data.
	 */
	applyToolsTplData: function(tplData) {
        Ext.apply(tplData, {
			toolsWrapClasses: this.toolsWrapClasses,
			hasTools:  this.tools && this.tools.getCount()
		});
	},

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#getRenderToEl
	 * @protected
	 * @override
	 */
	getRenderToEl: function() {
		return this.innerContainerEl;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#getSelectors
	 * @override
	 */
	getSelectors: function() {
		var selectors = {
			wrapEl: "#" + this.id + "-" + this.itemName,
			toolsEl: "#" + this.id + "-content-mjgroup-tools",
			innerContainerEl: Ext.String.format("#{0}-inner-container", this.id),
		};
		return selectors;
	},

	/**
	 * Applies width style property to component styles.
	 * @protected
	 */
	applyGroupWidth: function() {
		this.styles.wrapStyle = Ext.apply(this.styles.wrapStyle || {}, {
			"width": this.width + "%"
		});
	},

	/**
	 * Applies selected config to component bind config.
	 * @protected
	 * @param {Object} bindConfig Component bind config.
	 */
	applyWidthBindConfig: function(bindConfig) {
		Ext.apply(bindConfig, {
			width: {
				changeEvent: "changed",
				changeMethod: "setWidth"
			}
		});
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
	 * @inheritdoc Terrasoft.AbstractContainer#initRenderData
	 * @override
	 */
	initRenderData: function(renderData) {
		this.callParent(arguments);
		this.addToolsToRenderData(renderData);
	},

	/**
	 * Sets width property to component.
	 * @protected
	 * @param {Number} width Column width (%).
	 */
	setWidth: function(width) {
		this.width = width;
		this.safeRerender();
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#prepareItems
	 * @override
	 */
	prepareItems: function(items) {
		return this.mixins.contentBlock.prepareBlockItems.call(this, items);
	},

	/**
	 * Handler of collection 'remove' event.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} itemModel Collection element.
	 */
	onDeleteItem: function(itemModel) {
		this.mixins.contentBlock.onDeleteItem.apply(this, [itemModel]);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#onItemAdd
	 * @override
	 */
	onAddItem: function(itemModel, index, id) {
		var items = this.prepareItems([itemModel]);
		this.items.insert(index, id, items[0]);
	},

	/**
	 * Handler of collection 'clear' event.
	 * @protected
	 */
	clearItems: function() {
		this.mixins.contentBlock.clearItems.apply(this);
	},

	/**
	 * Handler of collection 'dataLoaded' event.
	 * @protected
	 * @param {Terrasoft.Collection} collection Collection.
	 */
	onCollectionDataLoaded: function(collection) {
		this.mixins.contentBlock.onCollectionDataLoaded.apply(this, [collection]);
	},

	/**
	 * Handler of collection 'itemChanged' event.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} itemModel Changing element.
	 * @param {Object} config Event options.
	 */
	onUpdateItem: function(itemModel, config) {
		this.mixins.contentBlock.onUpdateItem.apply(this, [itemModel, config]);
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

	/**
	 * @inheritdoc Terrasoft.Component#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		this.applyBlockBindConfig(bindConfig);
		this.applyWidthBindConfig(bindConfig);
		return bindConfig;
	},

	/**
	 * Destroys tools, unsubscribes from the DOM events, cleans DOM from the elements,
	 * cleans tool collection {@link #tools}.
	 * @protected
	 */
	destroyTools: function() {
		this.destroyItemsCollection(this.tools);
		this.tools = null;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.destroyTools();
		this.callParent(arguments);
	},

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
	 * @inheritdoc Terrasoft.AbstractContainer#bind
	 * @override
	 */
	bind: function() {
		this.mixins.bindable.bind.apply(this, arguments);
		this.bindTools();
		
	}
});
