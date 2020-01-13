/**
 */
Ext.define("Terrasoft.core.mixins.Reorderable", {
	alternateClassName: "Terrasoft.Reorderable",

	//region Properties: Protected

	/**
	 * The name of the element's class indicating the item's move position.
	 * @protected
	 * @type {String}
	 */
	reorderableElCls: "reorderable",

	/**
	 * An HTML element template that indicates the item's move position.
	 * @protected
	 * @type {String}
	 */
	reorderableElTpl: "<div id=\"{0}\" class=\"{1}\"></div>",

	/**
	 * The index of the displacement of the element.
	 * @protected
	 * @type {Number}
	 */
	reorderableIndex: null,

	/**
	 * The class name of the zero element of the container.
	 * @protected
	 * @type {String}
	 */
	zeroElClassName: "reorderable-zero-element",

	/**
	 * HTML template of the zero element of the container.
	 * @protected
	 * @type {String}
	 */
	zeroElTpl: "<div id=\"{0}\" class=\"{1}\"></div>",

	/**
	 * A collection of view model elements for customization in a grid
	 * @protected
	 * @type {Terrasoft.BaseViewModelCollection}
	 */
	viewModelItems: null,

	//endregion

	//region Methods: Protected

	/**
	 * Returns the default item configuration object.
	 * @protected
	 * @param {String} itemClassName The name of the item class.
	 * @return {Object} The default item configuration object.
	 */
	getDefaultItemConfig: function(itemClassName) {
		var itemClass = Ext.ClassManager.get(itemClassName);
		var itemClassPrototype = itemClass.prototype;
		var itemBindConfig = itemClassPrototype.getBindConfig();
		var result = {};
		Terrasoft.each(Object.keys(itemBindConfig), function(propertyName) {
			result[propertyName] = {
				bindTo: propertyName
			};
		}, this);
		return result;
	},

	/**
	 * Gets the item's configuration object.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} itemModel The item model.
	 * @return {Object} The default item configuration object.
	 */
	getItemConfig: function(itemModel) {
		var itemConfig = null;
		if (Ext.isFunction(itemModel.getViewConfig)) {
			itemConfig = itemModel.getViewConfig();
		}
		return itemConfig;
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
	 * @protected
	 */
	subscribeForCollectionEvents: function(binding, property, model) {
		var collection = model.get(binding.modelItem);
		if (property === "viewModelItems") {
			collection.on("dataLoaded", this.onViewModelItemsLoad, this);
			collection.on("add", this.onViewModelItemAdd, this);
			collection.on("remove", this.onViewModelItemRemove, this);
			collection.on("clear", this.onViewModelItemsClear, this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#unSubscribeForCollectionEvents
	 * @protected
	 */
	unSubscribeForCollectionEvents: function(binding, property, model) {
		var collection = model.get(binding.modelItem);
		if (property === "viewModelItems") {
			collection.un("dataLoaded", this.onViewModelItemsLoad, this);
			collection.un("add", this.onViewModelItemAdd, this);
			collection.un("remove", this.onViewModelItemRemove, this);
			collection.un("clear", this.onViewModelItemsClear, this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#getBindConfig
	 * @protected
	 */
	getBindConfig: function() {
		return {
			viewModelItems: {
				changeMethod: "onViewModelItemsLoad"
			},
			reorderableIndex: {
				changeMethod: "setReorderableIndex"
			}
		};
	},

	/**
	 * The "dataLoaded" event handler for the Terrasoft.BaseViewModelCollection collection.
	 * @protected
	 * @param {Terrasoft.BaseViewModelCollection} collection
	 */
	onViewModelItemsLoad: function(collection) {
		collection.eachKey(function(key, item, index) {
			this.onViewModelItemAdd(item, index, key);
		}, this);
	},

	/**
	 * The "add" event handler for the Terrasoft.BaseViewModelCollection collection.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} viewModelItem Collection item.
	 * @param {Number} index Collection item index.
	 */
	onViewModelItemAdd: function(viewModelItem, index) {
		var itemConfig = this.getItemConfig(viewModelItem);
		var itemClassName = itemConfig.className;
		if (Ext.isEmpty(itemClassName)) {
			throw new Terrasoft.NullOrEmptyException();
		}
		delete itemConfig.className;
		var viewItem = Ext.create(itemClassName, itemConfig);
		viewItem.bind(viewModelItem);
		this.insert(viewItem, index);
	},

	/**
	 * The "clear" event handler for the Terrasoft.BaseViewModelCollection collection.
	 * @protected
	 */
	onViewModelItemsClear: function() {
		this.items.each(function(item) {
			item.destroy();
		}, this);
		this.items.clear();
	},

	/**
	 * The "remove" event handler for the Terrasoft.BaseViewModelCollection collection.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} item Element of the collection.
	 * @param {String} key The key of the item in the collection.
	 */
	onViewModelItemRemove: function(item, key) {
		var viewItem = this.items.get(key);
		this.remove(viewItem);
		viewItem.destroy();
	},

	/**
	 * Returns the identifier of the element indicating the item's move position.
	 * @protected
	 * @return {String} The item Id of the item indicating the item's move position.
	 */
	getReorderableId: function() {
		return this.id + "-reorderable";
	},

	/**
	 * Removes from the dom'a an element indicating the position of moving the element.
	 * @protected
	 */
	removeReorderable: function() {
		var reorderableId = this.getReorderableId();
		var reorderableEl = Ext.get(reorderableId);
		if (reorderableEl) {
			reorderableEl.remove();
		}
	},

	/**
	 * Creates dom element indicating the position of the moving element.
	 * @protected
	 */
	showReorderable: function() {
		this.removeReorderable();
		var reorderableIndex = this.reorderableIndex;
		if (!Ext.isEmpty(reorderableIndex)) {
			var insertPosition;
			if (reorderableIndex === -1) {
				insertPosition = "beforeBegin";
				reorderableIndex = 0;
			} else {
				insertPosition = "afterEnd";
			}
			var reorderableId = this.getReorderableId();
			var reorderableElHtml = Ext.String.format(this.reorderableElTpl, reorderableId, this.reorderableElCls);
			var itemByIndex = this.getItemByIndex(reorderableIndex);
			if (itemByIndex) {
				var itemByIndexWrapEl = itemByIndex.getWrapEl();
				itemByIndexWrapEl.insertHtml(insertPosition, reorderableElHtml);
			} else {
				var innerContainerEl = this.getRenderToEl();
				innerContainerEl.insertHtml("afterBegin", reorderableElHtml);
			}
		}
	},

	/**
	 * Returns item by index.
	 * @protected
	 * @param {Number} index ItemIndex.
	 * @return {Terrasoft.Component}
	 */
	getItemByIndex: function(index) {
		return this.items.getAt(index);
	},

	/**
	 * Returns the identifier of the zero element.
	 * @protected
	 * @param {String} groupName Group name
	 */
	getZeroElementId: function() {
		var id = Ext.String.format("{0}-zero-element", this.wrapEl.id);
		return id;
	},

	/**
	 * Creates the zero element of the container in the dom.
	 * @protected
	 */
	createZeroElement: function() {
		var zeroElementId = this.getZeroElementId();
		var zeroElementHtml = Ext.String.format(this.zeroElTpl, this.getZeroElementId(), this.zeroElClassName);
		this.insertZeroElement("afterBegin", zeroElementHtml);
		var zeroElement = Ext.get(zeroElementId);
		var zeroDDElement = zeroElement.initDD(zeroElementId, {isTarget: true, instance: this, tag: zeroElementId}, {});
		if (Ext.isFunction(this.getGroupName)) {
			var groups = this.getGroupName();
			if (Ext.isArray(groups)) {
				Terrasoft.each(groups, function(group) {
					zeroDDElement.addToGroup(group);
				}, this);
			} else {
				zeroDDElement.addToGroup(groups);
			}
		}
	},

	/**
	 * Inserts zero element into container.
	 * @protected
	 * @param {String} where Where to insert the html in relation to this element - beforeBegin, afterBegin, beforeEnd,
	 *  afterEnd. See Ext.DomHelper.insertHtml for details.
	 * @param {String} zeroElementHtml The HTML fragment.
	 */
	insertZeroElement: function(where, zeroElementHtml) {
		this.wrapEl.insertHtml(where, zeroElementHtml);
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.createZeroElement();
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.createZeroElement();
	},

	/**
	 * @inheritdoc Terrasoft.component#onDestroy
	 * @override
	 */
	onDestroy: function() {
		if (Ext.isFunction(this.getGroupName) && this.rendered) {
			var zeroElementId = this.getZeroElementId();
			var ddIds = Ext.dd.DragDropManager.ids;
			var groups = this.getGroupName();
			delete ddIds[zeroElementId];
			if (Ext.isArray(groups)) {
				Terrasoft.each(groups, function(group) {
					delete ddIds[group][zeroElementId];
				}, this);
			} else {
				if (ddIds[groups]) {
					delete ddIds[groups][zeroElementId];
				}
			}

		}
	},

	//endregion

	//region Methods: Public

	/**
	 * Sets the index for moving the item.
	 * @protected
	 * @param {Number} value
	 */
	setReorderableIndex: function(value) {
		if (this.reorderableIndex !== value) {
			this.reorderableIndex = value;
			Terrasoft.throttle(this.showReorderable(), 500);
		}
	}

	//endregion

});
