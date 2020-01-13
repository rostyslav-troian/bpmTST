/**
 */
Ext.define("Terrasoft.mixins.ContentBlockMixin", {
	alternateClassName: "Terrasoft.ContentBlockMixin",

	//region Methods: Protected

	/**
	 * Returns tools element selectors.
	 * @protected
	 * @return {Object} Selectors object.
	 */
	getSelectors: function() {
		var selectors = {
			wrapEl: "#" + this.id + "-" + this.itemName
		};
		return selectors;
	},

	/**
	 * Applies template config styles.
	 * @protected
	 * @param {Object} tplData Object of rendering template settings.
	 */
	applyTplClasses: function(tplData) {
		Ext.Object.each(this.tplConfigClasses, function(property, value){
			var prop = tplData[property] || [];
			tplData[property] = prop.concat(value);
		});
	},

	/**
	 * Returns element configuration by the model.
	 * @protected
	 * @param {Terrasoft.model.BaseViewModel} itemModel Layout element model.
	 * @return {Object} Element configuration.
	 */
	getItemConfig: function(itemModel) {
		var itemConfig = null;
		if (Ext.isFunction(itemModel.getViewConfig)) {
			itemConfig = itemModel.getViewConfig();
			itemConfig.id = itemModel.$Id;
			if (Ext.isEmpty(itemConfig.id)) {
				this.log(Terrasoft.Resources.ContentBlock.PrimaryColumnIsEmpty, Terrasoft.LogMessageType.WARNING);
			}
		}
		return itemConfig;
	},

	/**
	 * The method prepares the elements before they are added to the container.
	 * If the item is not an instance of the component, the component is created by {@link #className}.
	 * @param {Object [] | Terrasoft.Component []} items - array of container elements.
	 * @return {Terrasoft.Component []}
	 * @protected
	 */
	prepareBlockItems: function(items) {
		if (!Ext.isArray(items)) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		for (var i = 0, length = items.length; i < length; i++) {
			var item = items[i];
			var newItemConfig = (Terrasoft.instanceOfClass(item, "Terrasoft.BaseModel"))
				? this.getItemConfig(item)
				: item.item;
			if (newItemConfig.isComponent === true) {
				items[i] = newItemConfig;
			} else {
				items[i] = Ext.create(newItemConfig.className || "Terrasoft.Component", newItemConfig);
				if (Terrasoft.instanceOfClass(item, "Terrasoft.BaseModel")) {
					items[i].bind(item);
				}
			}
		}
		return items;
	},

	/**
	 * Applies block bind config to component bind config.
	 * @protected
	 * @param {Object} bindConfig Component bind config.
	 */
	applyBlockBindConfig: function(bindConfig) {
		Ext.apply(bindConfig, {
			items: {
				changeMethod: "onCollectionDataLoaded"
			}
		});
	},

	/**
	 * Handler of collection 'add' event.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} itemModel Collection element.
	 */
	onAddItem: function(itemModel) {
		this.add(itemModel);
	},

	/**
	 * Handler of collection 'itemChanged' event.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} itemModel Changing element.
	 * @param {Object} config Event options.
	 */
	onUpdateItem: function(itemModel, config) {
		if (config.reRenderBlock && this.allowRerender()) {
			this.reRender();
		}
	},

	/**
	 * Handler of collection 'remove' event.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} itemModel Collection element.
	 */
	onDeleteItem: function(itemModel) {
		var id = itemModel.$Id;
		var item = this.items.get(id);
		this.remove(item);
		this.destroyItem(item);
	},

	/**
	 * Handler of collection 'clear' event.
	 * @protected
	 */
	clearItems: function() {
		this.items.each(function(item) {
			this.remove(item);
			this.destroyItem(item);
		}, this);
	},

	/**
	 * Handler of collection 'dataLoaded' event.
	 * @protected
	 * @param {Terrasoft.core.collections.Collection} collection Collection.
	 */
	onCollectionDataLoaded: function(collection) {
		this.clearItems();
		if (collection) {
			collection.each(function(itemModel) {
				this.addToCollection(itemModel, this.items);
			}, this);
		}
	},

	/**
	 * Subscribes to events for the element collection.
	 * @protected
	 * @param {Terrasoft.data.model.BaseViewModelCollection} collection Element collection.
	 */
	subscribeCollection: function(collection) {
		collection.on("dataLoaded", this.onCollectionDataLoaded, this);
		collection.on("itemChanged", this.onUpdateItem, this);
		collection.on("add", this.onAddItem, this);
		collection.on("remove", this.onDeleteItem, this);
		collection.on("clear", this.clearItems, this);
	},

	/**
	 * Unsubscribes from the collection events.
	 * @protected
	 * @param {Terrasoft.data.model.BaseViewModelCollection} collection Element collection.
	 */
	unSubscribeCollection: function(collection) {
		collection.un("dataLoaded", this.onCollectionDataLoaded, this);
		collection.un("itemChanged", this.onUpdateItem, this);
		collection.un("add", this.onAddItem, this);
		collection.un("remove", this.onDeleteItem, this);
		collection.un("clear", this.clearItems, this);
	}

	//endregion

});
