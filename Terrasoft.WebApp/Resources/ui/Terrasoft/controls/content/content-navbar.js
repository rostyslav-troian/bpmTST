Ext.define("Terrasoft.controls.ContentNavbarElement", {
	extend: "Terrasoft.controls.BaseContentElement",
	alternateClassName: "Terrasoft.ContentNavbarElement",

	mixins: {
		contentBlock: "Terrasoft.mixins.ContentBlockMixin"
	},

	/**
	 * Content block name.
	 * @protected
	 * @type {String}
	 */
	itemName: "content-navbar-element",

	/**
	 * Navbar classes.
	 * @protected
	 * @type {Object}
	 */
	contentWrapClasses: ["content-navbar-element-wrap"],

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		`<div id="{id}-content-navbar-element" class="{wrapClassName}" style="{wrapStyle}">` +
			`{%this.renderItems(out, values)%}`,
			`<tpl if="hasTools">`,
				`<div id="{id}-content-element-tools" class="{toolsWrapClasses}">
					<tpl for="tools">
						{%this.renderTool(out, values)%}
					</tpl>
				</div>`,
			`</tpl>`,
		`</div>`
	],

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents("elementSelectedChange");
	},

	/**
	 * Initialize DOM events.
	 * @protected
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		this.subscribeItemsEvents();
	},

	/**
	 * @inheritdoc Terrasoft.Component#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		this.applyBlockBindConfig(bindConfig);
		return bindConfig;
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
	 * @inheritdoc Terrasoft.AbstractContainer#getSelectors
	 * @override
	 */
	getSelectors: function() {
		var selectors = {};
		Ext.apply(selectors, {
			wrapEl: Ext.String.format("#{0}-{1}", this.id, this.itemName)
		});
		return selectors;
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
	 * Handler of collection 'add' event.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} itemModel Collection element.
	 */
	onAddItem: function(itemModel, index) {
		this.insert(itemModel, index);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#onItemAdd
	 * @override
	 */
	onItemAdd: function(index, item) {
		this.callParent(arguments);
		item.on("selectedChanged", this.onSelectedChanged, this);
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
		if (model && property === "items") {
			var collection = model.get(binding.modelItem);
			this.mixins.contentBlock.subscribeCollection.call(this, collection);
		}
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
	 * @override
	 */
	unSubscribeForCollectionEvents: function(binding, property, model) {
		if (model && property === "items") {
			var collection = model.get(binding.modelItem);
			this.mixins.contentBlock.unSubscribeCollection.call(this, collection);
		}
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#prepareItems
	 * @override
	 */
	prepareItems: function(items) {
		return this.mixins.contentBlock.prepareBlockItems.call(this, items);
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.unSubscribeItemsEvents();
		this.callParent(arguments);
	}

});
