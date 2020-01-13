/**
 * @abstract
 * Abstract container class. This is a class for any component that can contain other components
 * (except the menu). The container implements the basic logic for working with its elements: adding, deleting, moving.
 * Also the container manages the timely rendering of its elements.
 *
 * If the container is not specified {@link #tpl template} rendering, the default template will be taken:
 *  [
 *   '<div id="{id}" style="{wrapStyles}" class="{wrapClassName}">',
 *    '{%this.renderItems(out, values)%}',
 *   '</div>'
 *  ]
 *
 * Sometimes when rendering a container, each element of it must be wrapped in a separate DOM element, for example,
 * if input fields are displayed vertically, additional indentation between them i needed.
 * This can be done with the help of the
 * {@link #itemRenderTplName od container element template}:
 *  Ext.create("Terrasoft.Container", {
 *   id: "mainContainer",
 *   tpl: [
 *    '<div id="{id}" style="{wrapStyles}">',
 *     '<tpl for="items">',
 *      '<div style="padding-bottom: 5px;">',
 *       '<@item>',
 *      '</div>',
 *     '</tpl>',
 *    '</div>'
 *   ],
 *   styles: {
 *    wrapStyles: {
 *     'background-color': 'red'
 *    }
 *   },
 *   selectors: {
 *   wrapEl: "#mainContainer",
 *    el: "#mainContainer",
 *   },
 *   renderTo: Ext.getBody(),
 *   items: [item1, item2, item3, ...]
 *  });
 */
Ext.define("Terrasoft.controls.AbstractContainer", {
	extend: "Terrasoft.controls.Component",
	alternateClassName: "Terrasoft.AbstractContainer",

	mixins: {
		resizable: "Terrasoft.Resizable"
	},

	detail: null,

	/**
	 * The rendering template for the container element. Applies to the case where each element of the container is
	 * wrapped in an additional DOM element.
	 * This template can only be used within the {@link Ext.XTemplate} <tpl> class structure. Those. for the template:
	 *  '<tpl for="items">',
	 *   '<div style="padding-bottom:5px;">',
	 *    '<@item>',
	 *   '</div>',
	 *  '</tpl>',
	 *
	 * when the tpl cycle passes through all the elements of the container, instead of the string '<@item>',
	 * the {@link #renderItem} method cal will be substituted.
	 * @private
	 * @type {String}
	 */
	itemRenderTplName: "<@item>",

	/**
	 * A string-template that performs the basic rendering function.
	 * @protected
	 * @override
	 * @type {String}
	 */
	renderTpl: "{%this.renderContainer(out, values)%}",

	/**
	 * Collection of container elements
	 * @type {Ext.util.MixedCollection}
	 */
	items: null,

	/**
	 * @inheritdoc Terrasoft.controls.Component#selectors
	 */
	selectors: null,

	/**
	 * {@link Ext.XTemplate Template} HTML markup of the container by default.
	 * @protected
	 * @type {String[]}
	 */
	defaultRenderTpl: null,

	/**
	 * Fill color.
	 * @type {String}
	 */
	backgroundColor: null,

	/**
	 * Array of the View config items.
	 * @protected
	 * @type {Object[]}
	 */
	viewConfigItems: null,

	/**
	 * Item event handlers.
	 * @private
	 * @type {Object}
	 */
	itemEventHandlers: null,

	/**
	 * Items event map.
	 * @private
	 * @type {Object}
	 * Example
	 *
	 *      {
	 * 		    childEventName1: containerEventName1,
	 * 		    childEventName2: containerEventName2
	 * 	    }
	 *
	 */
	itemsEventMap: null,

	/**
	 * Item event handler.
	 * @protected
	 * @param {String} eventName Event to fire name.
	 * @param {Object} itemEventArguments Arguments of item's event.
	 */
	onMappedItemEventFired: function(eventName, itemEventArguments) {
		var eventArguments = [eventName];
		for (var i = 0; i < itemEventArguments.length; i++) {
			eventArguments.push(itemEventArguments[i]);
		}
		eventArguments.push(this);
		this.fireEvent.apply(this, eventArguments);
	},

	/**
	 * Subscribes on item mapped events.
	 * @private
	 * @param {Terrasoft.Component} item Item instance.
	 */
	subscribeItemMappedEvents: function(item) {
		Terrasoft.each(this.itemsEventMap, function(eventName, itemEventName) {
			if (item.events[itemEventName]) {
				var handlerId = item.id + itemEventName;
				this.itemEventHandlers[handlerId] = function() {
					this.onMappedItemEventFired(eventName, arguments);
				}.bind(this);
				item.on(itemEventName, this.itemEventHandlers[handlerId], this);
			}
		}, this);
	},

	/**
	 * Subscribes on item mapped events.
	 * @private
	 * @param {Terrasoft.Component} item Item instance.
	 */
	unSubscribeItemMappedEvents: function(item) {
		Terrasoft.each(this.itemsEventMap, function(eventName, itemEventName) {
			var handlerId = item.id + itemEventName;
			if (this.itemEventHandlers[handlerId]) {
				item.un(itemEventName, this.itemEventHandlers[handlerId], this);
				delete this.itemEventHandlers[handlerId];
			}
		}, this);
	},

	/**
	 * The method initializes the elements of the container. It called after the container is initialized.
	 * @protected
	 */
	initItems: function() {
		this.viewConfigItems = this.items;
		this.initItemsCollection();
		this.addViewConfigItems();
	},

	/**
	 * Added view config items to items collection.
	 * @protected
	 */
	addViewConfigItems: function() {
		this.add(this.viewConfigItems);
	},

	/**
	 * Initialize child items collection.
	 * @private
	 */
	initItemsCollection: function() {
		var collection = this.items = new Ext.util.MixedCollection(false, this.getComponentId);
		collection.on("add", this.onItemAdd, this);
		collection.on("remove", this.onItemRemove, this);
	},

	/**
	 * The event handler for adding an item to the {@link #items} collection
	 * @private
	 * @param {Number} index The index of the added item.
	 * @param {Object | Terrasoft.Component} item The added element.
	 */
	onItemAdd: function(index, item) {
		item.added(this);
		this.subscribeItemMappedEvents(item);
	},

	/**
	 * The event handler for removing the control from the collection {@link #items}
	 * @private
	 * @param {Object | Terrasoft.Component} item The control to be removed.
	 */
	onItemRemove: function(item) {
		item.removed(this);
		this.unSubscribeItemMappedEvents(item);
		this.safeRerender();
	},

	/**
	 * The method prepares the elements before they are added to the container.
	 * If the item is not an instance of the component, the component is created by {@link #className}.
	 * @param {Object [] | Terrasoft.Component []} items - array of container elements.
	 * @return {Terrasoft.Component []}
	 * @protected
	 */
	prepareItems: function(items) {
		if (!Ext.isArray(items)) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		for (var i = 0, length = items.length; i < length; i++) {
			items[i] = this.prepareItem(items[i]);
		}
		return items;
	},

	/**
	 * Prepares item before add to container.
	 * @param {Object|Terrasoft.Component} item Item.
	 * @return {Terrasoft.Component} Container element.
	 * @protected
	 */
	prepareItem: function(item) {
		if (item.isComponent === true) {
			return item;
		}
		return Ext.create(item.className || "Terrasoft.Component", item);
	},

	/**
	 * Method for obtaining hash keys for a collection of container elements.
	 * @param {Terrasoft.Component} item Container element.
	 * @return {String}
	 * @private
	 */
	getComponentId: function(item) {
		return item.id;
	},

	/**
	 * The method implements the receipt of the HTML markup of the transferred container element and
	 * writes it to the buffer.
	 * @param {String []} buffer The buffer for writing HTML.
	 * @param {Terrasoft.Component} item Container element.
	 * @private
	 */
	renderItem: function(buffer, item) {
		var html = item.generateHtml();
		buffer.push(html);
	},

	/**
	 * The main method of rendering the container. If {@link #html html} parameter was specified in the container
	 * configuration object, the specified HTML markup is inserted into the DOM.
	 * Otherwise, the {@link #getTpl, parametrized template} of the HTML markup is collected,
	 * the  (see {@link #getTplData, getTplData ()}) parameters are prepared,
	 * the (see {@link #processTemplate, processTemplate () }) template is preprocessed.
	 * After that, the template is assembled into HTML-code and added to the transferred buffer.
	 * Because the method is executed in the context of {@link Ext.XTemplate Ext.XTemplate},
	 * then to get a reference to the container, you must use renderData.self.
	 * @param {String []} buffer Buffer for generating HTML
	 * @param {Object} renderData Parameters passed to the template {@link #renderTpl renderTpl}.
	 * @private
	 */
	renderContainer: function(buffer, renderData) {
		var self = renderData.self;
		if (self.html) {
			Ext.DomHelper.generateMarkup(self.html, buffer);
			return;
		}
		var tpl = self.getTpl();
		var tplData = self.getTplData();
		self.applyViewItemsPropertiesElSelector(self.selectors);
		self.initRenderData(tplData);
		tpl = self.processTemplate(tpl, tplData);
		tpl = new Ext.XTemplate(tpl);
		self.prepareTpl(tpl, tplData);
		tpl.applyOut(tplData, buffer);
	},

	/**
	 * The method preprocesses the control's rendering template.
	 * Implemented for parameterizing {@link #styles inline-styles} and {@link #classes CSS-classes} of the component.
	 * The container replaces the {@link #itemRenderTplName template} by rendering the element to call the
	 * rendering function.
	 * @return {String}
	 * @protected
	 * @override
	 */
	processTemplate: function() {
		var template = this.callParent(arguments);
		var itemRegex = new RegExp(this.itemRenderTplName, "gim");
		template = template.replace(itemRegex, "{%this.renderItem(out, values, xindex - 1)%}");
		template = this.processViewItemsPropertiesItemTemplate(template);
		return template;
	},

	/**
	 * Initialize container. After the core logic components are initialized container elements.
	 * When overridden sure to call the base method.
	 * @inheritdoc Terrasoft.controls.Component#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.initContainerEvents();
		this.initItems();
		this.initViewItemsProperties();
		this.initResizeEvents();
	},

	/**
	 * Returns list of view properties list names.
	 * @protected
	 * @return {Array} List of view properties list names.
	 */
	getViewItemsPropertyNames: function() {
		return [];
	},

	/**
	 * Initialize view items properties
	 * @param {String} propertyName View property name.
	 * @protected
	 */
	initViewItemsProperties: function() {
		Terrasoft.each(this.getViewItemsPropertyNames(), function(propertyName) {
			this.initViewItemsProperty(propertyName);
		}, this);
	},

	/**
	 * Initialize view items property
	 * @param {String} propertyName View items property name.
	 * @protected
	 */
	initViewItemsProperty: function(propertyName) {
		var source = this[propertyName];
		var collection = this[propertyName] = new Ext.util.MixedCollection(false, this.getComponentId);
		collection.on("add", function(index, viewItemsPropertyItem) {
			this.onViewItemsPropertyAdd(propertyName, index, viewItemsPropertyItem);
		}, this);
		collection.on("remove", function(viewItemsPropertyItem) {
			this.onViewItemsPropertyRemove(viewItemsPropertyItem);
		}, this);
		this.addViewItemsPropertyItem(propertyName, source);
	},

	/**
	 * Handler of adding item to the collection.
	 * @protected
	 * @param {String} propertyName View property name.
	 * @param {Number} index Added item index.
	 * @param {Terrasoft.Component} viewItemsPropertyItem Added item.
	 */
	onViewItemsPropertyAdd: function(propertyName, index, viewItemsPropertyItem) {
		var renderTo = this.getViewItemsPropertyRenderToEl(propertyName);
		viewItemsPropertyItem.added(this, renderTo, index);
	},

	/**
	 * Handler of removing view property item.
	 * @protected
	 * @param {Terrasoft.Component} viewItemsPropertyItem Remove item.
	 */
	onViewItemsPropertyRemove: function(viewItemsPropertyItem) {
		viewItemsPropertyItem.removed(this);
		this.safeRerender();
	},

	/**
	 * Applies view items properties selectors.
	 * @protected
	 * @param {Object} selectors Selectors.
	 */
	applyViewItemsPropertiesElSelector: function(selectors) {
		Terrasoft.each(this.getViewItemsPropertyNames(), function(propertyName) {
			this.applyViewItemsPropertyElSelector(selectors, propertyName);
		}, this);
	},

	/**
	 * Applies view items property selector.
	 * @protected
	 * @param {Object} selectors Selectors.
	 * @param {String} propertyName View property name.
	 */
	applyViewItemsPropertyElSelector: function(selectors, propertyName) {
		selectors[this.getViewItemsPropertyElName(propertyName)] = Ext.String.format("#{0}-{1}", this.id, propertyName);
	},

	/**
	 * Returns view property selector name.
	 * @private
	 * @param {String} propertyName View property name.
	 */
	getViewItemsPropertyElName: function(propertyName) {
		return Ext.String.format("{0}El", propertyName);
	},

	/**
	 * Returns a reference to the DOM-element which items will be displayed.
	 * @protected
	 * @param {String} propertyName View property name.
	 * @return {Ext.dom.Element}
	 */
	getViewItemsPropertyRenderToEl: function(propertyName) {
		return this[this.getViewItemsPropertyElName(propertyName)];
	},

	/**
	 * The method performs preprocessing template rendering control view items properties.
	 * @protected
	 * @param {String} template Template.
	 * @return {String}
	 */
	processViewItemsPropertiesItemTemplate: function(template) {
		Terrasoft.each(this.getViewItemsPropertyNames(), function(propertyName) {
			template = this.processViewItemsPropertyItemTemplate(template, propertyName);
		}, this);
		return template;
	},

	/**
	 * The method performs preprocessing template rendering control.
	 * @protected
	 * @param {String} template Template.
	 * @param {String} propertyName View property name.
	 * @return {String}
	 */
	processViewItemsPropertyItemTemplate: function(template, propertyName) {
		var toolRegex = new RegExp(this.getViewItemsPropertyRenderTplName(propertyName), "gim");
		return template.replace(toolRegex,
			"{%this.renderViewItemsPropertyItem(out, values, '" + propertyName + "', xindex - 1)%}");
	},

	/**
	 * Returns view items property template name.
	 * @private
	 * @param {String} propertyName View property name.
	 */
	getViewItemsPropertyRenderTplName: function(propertyName) {
		return Ext.String.format("<@{0}-view-property-item>", propertyName);
	},

	/**
	 * The method prepares the parameter object for rendering control.
	 * @param {Object} renderData Template parameters object.
	 * @protected
	 * @override
	 */
	initRenderViewItemsPropertiesData: function(renderData) {
		renderData.renderViewItemsProperty = this.renderViewItemsProperty;
		renderData.renderViewItemsPropertyItem = this.renderViewItemsPropertyItem;
		Terrasoft.each(this.getViewItemsPropertyNames(), function(propertyName) {
			renderData[propertyName] = this[propertyName];
		}, this);
	},

	/**
	 * Returns view items property rendet template tree.
	 * @protected
	 * @param {String} propertyName View property name.
	 */
	getViewItemsPropertyRenderTemplateTree: function(propertyName) {
		var viewItemsPropertyTree = [];
		var viewItemsProperty = this[propertyName];
		if (!viewItemsProperty) {
			return viewItemsPropertyTree;
		}
		for (var i = 0, length = viewItemsProperty.length; i < length; i++) {
			var item = viewItemsProperty.getAt(i);
			var html = item.generateHtml();
			viewItemsPropertyTree.push(html);
		}
		return viewItemsPropertyTree;
	},

	/**
	 * Renders view property.
	 * @protected
	 * @param {String[]} buffer Recording buffer for HTML.
	 * @param {Object} renderData Template parameters object.
	 * @param {String} propertyName View items property name.
	 */
	renderViewItemsProperty: function(buffer, renderData, propertyName) {
		var self = renderData.self;
		var viewItemsPropertyTree = self.getViewItemsPropertyRenderTemplateTree(propertyName);
		Ext.DomHelper.generateMarkup(viewItemsPropertyTree, buffer);
	},

	/**
	 * Generates HTML-markup for input tools element and stores it in a buffer.
	 * @protected
	 * @param {String[]} buffer Recording buffer for HTML.
	 * @param {Terrasoft.Component} item Tools item.
	 */
	renderViewItemsPropertyItem: function(buffer, item) {
		var html = item.generateHtml();
		buffer.push(html);
	},

	/**
	 * Destroys view items properties, unsubscribes from the DOM events, cleans DOM from the elements,
	 * cleans view propeties collection.
	 * @protected
	 */
	destroyViewItemsProperty: function() {
		Terrasoft.each(this.getViewItemsPropertyNames(), function(propertyName) {
			this.destroyItemsCollection(this[propertyName]);
			this[propertyName] = null;
		}, this);
	},

	/**
	 * Bind view item property items of the model
	 * @param {Terrasoft.data.modules.BaseViewModel} model Data model
	 * @param {String} propertyName View items property name.
	 */
	bindViewItemsProperties: function(model) {
		Terrasoft.each(this.getViewItemsPropertyNames(), function(propertyName) {
			this.bindViewItemsProperty(model, propertyName);
		}, this);
	},

	/**
	 * Bind view items property item of the model
	 * @param {Terrasoft.data.modules.BaseViewModel} model Data model
	 * @param {String} propertyName View items property name.
	 */
	bindViewItemsProperty: function(model, propertyName) {
		var viewItemsProperty = this[propertyName];
		if (!Ext.isEmpty(viewItemsProperty)) {
			viewItemsProperty.each(function(item) {
				item.bind(model);
			});
		}
	},

	/**
	 * Adds component or component array to tool panel.
	 * @param {String} propertyName View items property name.
	 * @param {Object|Terrasoft.Component} viewItemsPropertyItem View items property item.
	 */
	addViewItemsPropertyItem: function(propertyName, viewItemsPropertyItem) {
		this.addToCollection(viewItemsPropertyItem, this[propertyName], propertyName);
	},

	/**
	 * The method adds the component (array components) in the collection of toolbox items from
	 * a specified position.
	 * @protected
	 * @param {String} name View items property name.
	 * @param {Object|Terrasoft.Component} item Insert item.
	 * @param {Number} index Index.
	 */
	insertViewItemsPropertyItem: function(propertyName, item, index) {
		this.insertIntoCollection(item, index, this[propertyName]);
	},

	/**
	 * Removes item from toolbar items collection.
	 * @param {String} name View property name.
	 * @param {Object|Terrasoft.Component} item Removing item.
	 */
	removeViewItemsPropertyItem: function(propertyName, item) {
		this.removeFromCollection(item, this[propertyName]);
	},

	/**
	 * Returns item position in view property.
	 * @param {Object|Terrasoft.Component} item View property item.
	 * @return {Number} Tool item position.
	 */
	indexOfViewItemsPropertyItem: function(propertyName, item) {
		return this.indexOfCollection(item, this[propertyName]);
	},

	/**
	 * Initialize container events.
	 * @protected
	 */
	initContainerEvents: function() {
		this.itemEventHandlers = this.itemEventHandlers || {};
		this.addEvents(
			"beforeadd",
			"add",
			"removed",
			"beforeinsert",
			"insert"
		);
	},

	/**
	 * The method prepares a rendering template. Creates references for inline methods.
	 * @param {Ext.XTemplate} tpl Template for processing.
	 * @protected
	 * @override
	 */
	initRenderTemplate: function(tpl) {
		this.callParent(arguments);
		tpl.renderContainer = this.renderContainer;
	},

	/**
	 * The method prepares a parameter object for rendering the control. A link to the container is installed.
	 * @param {Object} renderData A parameter object for processing.
	 * @protected
	 * @override
	 */
	initRenderData: function(renderData) {
		this.callParent(arguments);
		renderData.items = this.items;
		renderData.renderItems = this.renderItems;
		renderData.renderItem = this.renderItem;
		this.initRenderViewItemsPropertiesData(renderData);
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.initResizer();
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.initResizer();
	},

	/**
	 * Gets rendering template for control. Base implementation returns
	 * {@link #getDefaultRenderTemplate default template}. Inherited classes must implement their own template to
	 * change template.
	 * @return {String[]}
	 * @protected
	 * @override
	 */
	getTpl: function() {
		var tpl = this.callParent(arguments);
		if (!tpl) {
			tpl = this.getDefaultRenderTemplate();
		}
		return tpl;
	},

	/**
	 * Gets default rendering template.
	 *        [
	 *            '<div id="{id}" style="{wrapStyles}" class="{wrapClassName}">',
	 *                '{%this.renderItems(out, values)%}',
	 *            '</div>'
	 *        ]
	 *
	 * @return {String[]}
	 * @protected
	 */
	getDefaultRenderTemplate: function() {
		var selectors = this.selectors = this.selectors || {};
		if (!selectors.wrapEl) {
			selectors.wrapEl = "#" + this.id;
		}
		return this.defaultRenderTpl;
	},

	/**
	 * Gets HTML-marking for all container element for default rendering template.
	 * @return {String[]}
	 * @return {String[]} HTML-marking.
	 * @protected
	 */
	getItemsRenderTemplateTree: function() {
		var itemsTree = [];
		var items = this.items;
		if (!items) {
			return itemsTree;
		}
		for (var i = 0, length = items.length; i < length; i++) {
			var item = items.getAt(i);
			var html = item.generateHtml();
			itemsTree.push(html);
		}
		return itemsTree;
	},

	/**
	 * The method is used in the default template when rendering container elements.
	 * @param {String []} buffer Buffer for generating HTML
	 * @param {Object} renderData A parameter object for the template.
	 * @protected
	 */
	renderItems: function(buffer, renderData) {
		var self = renderData.self;
		var itemsTree = self.getItemsRenderTemplateTree();
		Ext.DomHelper.generateMarkup(itemsTree, buffer);
	},

	/**
	 * The method adds the transferred component (an array of components) to the collection of elements.
	 * @param {Object | Object [] | Terrasoft.Component | Terrasoft.Component []} item
	 * @param {Terrasoft.Collection} collection A collection of items.
	 * @param {String} propertyName View items property name.
	 * @protected
	 */
	addToCollection: function(item, collection, propertyName) {
		if (!item) {
			return;
		}
		var items = Ext.isArray(item) ? item : [item];
		items = this.prepareItems(items, propertyName);
		this.fireEvent("beforeadd", this, items, collection);
		for (var i = 0, length = items.length; i < length; i++) {
			var itemToAdd = items[i];
			if (!Ext.isEmpty(propertyName)) {
				itemToAdd.setOwnerCtViewItemsPropertyName(propertyName);
			}
			collection.add(itemToAdd);
		}
		this.fireEvent("add", this, items, collection);
	},

	/**
	 * The method adds the transferred component (an array of components) to the collection of items starting
	 * at the specified position.
	 * @param {Object | Object [] | Terrasoft.Component | Terrasoft.Component []} item
	 * @param {Number} index
	 * @param {Terrasoft.Collection} collection A collection of items.
	 * @protected
	 */
	insertIntoCollection: function(item, index, collection) {
		if (!Ext.isNumber(index)) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		var items = Ext.isArray(item) ? item : [item];
		items = this.prepareItems(items);
		this.fireEvent("beforeinsert", this, items, index, collection);
		for (var i = 0, length = items.length; i < length; i++) {
			var itemToAdd = items[i];
			collection.insert(index + i, itemToAdd);
		}
		this.fireEvent("insert", this, items, index, collection);
	},

	/**
	 * The method deletes the component from the collection.
	 * @param {Object | Terrasoft.Component} item The item to be removed
	 * @param {Terrasoft.Collection} collection A collection of items.
	 * protected
	 */
	removeFromCollection: function(item, collection) {
		collection.remove(item);
		this.fireEvent("removed", this, item, collection);
	},

	/**
	 * Get the position of the item in the collection.
	 * @param {Terrasoft.Component} item
	 * @param {Terrasoft.Collection} collection A collection of items.
	 * @return {Number} position of the item in the collection.
	 * @protected
	 */
	indexOfCollection: function(item, collection) {
		var visibleItemsFilter = new Ext.util.Filter({
			filterFn: function(currentItem) {
				return currentItem.visible === true || currentItem.rendered === true;
			}
		});
		var visibleItems = collection.filter(visibleItemsFilter);
		return visibleItems.indexOfKey(item.id);
	},

	/**
	 * Destroys the elements of the suspicious, unsubscribes from the DOM events, clears the DOM from the elements.
	 * Clears the collection
	 * @protected
	 */
	destroyItemsCollection: function(collection) {
		collection.un("add", this.onItemAdd, this);
		collection.un("remove", this.onItemRemove, this);
		this.clearItemsCollection(collection);
		collection.destroy();
	},

	/**
	 * Destroys item.
	 * @protected
	 * @param  {Terrasoft.Component} item Item.
	 */
	destroyItem: function(item) {
		this.unSubscribeItemMappedEvents(item);
		item.destroy();
	},

	/**
	 * Clear collection.
	 * @param  {Terrasoft.Collection} collection Collection of items.
	 */
	clearItemsCollection: function(collection) {
		collection.each(function(item) {
			this.destroyItem(item);
		}, this);
		collection.clear();
	},

	/**
	 * The method destroys the control. The component is removed from the component manager,
	 * all subscribers are deleted, both for the component and for the DOM elements. All DOM elements are deleted.
	 * @override
	 */
	onDestroy: function() {
		this.destroyViewItemsProperty();
		this.destroyItems();
		this.callParent(arguments);
	},

	/**
	 * Destroys the elements of the fillers, unsubscribes from the DOM events, clears the DOM from the elements.
	 * Clears the collection {@link #items}
	 */
	destroyItems: function() {
		this.destroyItemsCollection(this.items);
		this.items = null;
	},

	/**
	 * The method adds the transferred component (an array of components) to the collection of container elements.
	 * @param {Object|Object[]|Terrasoft.Component|Terrasoft.Component[]} item
	 */
	add: function(item) {
		this.addToCollection(item, this.items);
	},

	/**
	 * The method adds the transferred component (an array of components) to the collection of container elements
	 * starting at the specified position.
	 * @param {Object|Object[]|Terrasoft.Component|Terrasoft.Component[]} item
	 * @param {Number} index
	 */
	insert: function(item, index) {
		this.insertIntoCollection(item, index, this.items);
	},

	/**
	 * The method deletes the component from the container's container collection.
	 * @param {Object | Terrasoft.Component} item The item to be removed
	 * @param {Boolean} cancelReRender Flag to cancel container repainting (default is false)
	 */
	remove: function(item) {
		var propertyName = this.getItemViewItemsPropertyName(item);
		if (Ext.isEmpty(propertyName)) {
			this.removeFromCollection(item, this.items);
		} else {
			this.removeViewItemsPropertyItem(propertyName, item);
		}
	},

	/**
	 * Bind all the elements of the model
	 * @param {Terrasoft.data.modules.BaseViewModel} model Data model
	 */
	bind: function() {
		this.callParent(arguments);
		this.bindItems(this.model);
		this.bindViewItemsProperties(this.model);
	},

	/**
	 * Bind nested the elements of the model
	 * @param {Terrasoft.data.modules.BaseViewModel} model Data model
	 */
	bindItems: function(model) {
		this.items.each(function(item) {
			item.bind(model);
		});
	},

	/**
	 * Get the item position in the container.
	 * @param {Terrasoft.Component} item
	 * @return {Number} of the item position in the container.
	 */
	indexOf: function(item) {
		var propertyName = this.getItemViewItemsPropertyName(item);
		var index = (Ext.isEmpty(propertyName))
			? this.indexOfCollection(item, this.items)
			: this.indexOfViewItemsPropertyItem(propertyName, item);
		return index;
	},

	getItemViewItemsPropertyName: function(item) {
		return (!Ext.isEmpty(item) && Ext.isFunction(item.getOwnerCtViewItemsPropertyName))
			? item.getOwnerCtViewItemsPropertyName()
			: null;
	},

	/**
	 * Returns a reference to the DOM-element which items will be displayed.
	 * @param {Terrasoft.Component} item
	 * @return {Ext.dom.Element}
	 */
	getRenderToEl: function(item) {
		var propertyName = this.getItemViewItemsPropertyName(item);
		return Ext.isEmpty(propertyName) ? this.wrapEl : this.getViewItemsPropertyRenderToEl(propertyName);
	},

	/**
	 * The method overrides the base implementation {@link Terrasoft.Component # getMaskConfig getMaskConfig}.
	 * Creates a configuration mask object and does not pass the Caption parameter,
	 * and therefore uses the default header defined in {@link Terrasoft.Mask # show show}
	 * @protected
	 * @override
	 */
	getMaskConfig: function() {
		var maskEl = this.getMaskEl();
		return {
			selector: "#" + maskEl.id
		};
	},

	/**
	 * @inheritdoc Terrasoft.component#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		var parentBindConfig = this.callParent(arguments);
		var bindConfig = {
			backgroundColor: {
				changeMethod: "setBackgroundColor"
			}
		};
		Ext.apply(bindConfig, parentBindConfig);
		return bindConfig;
	},

	/**
	 * Sets the background color.
	 * @param {String} backgroundColor The background color.
	 */
	setBackgroundColor: function(backgroundColor) {
		if (this.backgroundColor !== backgroundColor) {
			this.backgroundColor = backgroundColor;
			this.styles = Ext.Object.merge(this.styles || {}, {
				wrapStyles: {
					"background-color": backgroundColor
				}
			});
			this.safeRerender();
		}
	},

	/**
	 * @inheritdoc Terrasoft.controls.component#isEventWithin.
	 * @override
	 */
	isEventWithin: function(event) {
		var isWithin = this.callParent(arguments);
		if (!isWithin && this.items) {
			this.items.each(function(item) {
				isWithin = item.isEventWithin(event);
				if (isWithin) {
					return false;
				}
			}, this);
		}
		return isWithin;
	}

});
