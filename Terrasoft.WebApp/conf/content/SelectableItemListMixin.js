Terrasoft.configuration.Structures["SelectableItemListMixin"] = {innerHierarchyStack: ["SelectableItemListMixin"]};
Ext.define("Terrasoft.configuration.mixins.SelectableItemListMixin", {
	alternateClassName: "Terrasoft.SelectableItemListMixin",

	/**
	 * Finds selected item.
	 * @private
	 * @param {string} collectionName Name of binded collection
	 * @return {Terrasoft.BaseViewModel} Selected item.
	 */
	_findSelectedItem: function(collectionName) {
		var collection = this.get(collectionName);
		if (!Ext.isEmpty(collection)) {
			var checkedItems = collection.filter(function(item) {
				return item.get("Value");
			});
			return checkedItems.first();
		}
		return null;
	},

	/**
	 * The handler of the "change" event of the item.
	 * @private
	 * @param {string} collectionName Name of binded collection
	 * @param {Terrasoft.BaseViewModel} changedItem Changed item
	 */
	_onItemChanged: function(collectionName, changedItem) {
		changedItem = changedItem || this._findSelectedItem(collectionName);
		if (changedItem && changedItem.get("Value")) {
			this._resetItems(collectionName, changedItem);
		}
	},

	/**
	 * Resets all items except changed one.
	 * @private
	 * @param {string} collectionName Name of binded collection
	 * @param {Terrasoft.BaseViewModel} changedItem Changed item
	 */
	_resetItems: function(collectionName, changedItem) {
		var collection = this.get(collectionName);
		collection.each(function(item) {
			if (item !== changedItem)  {
				item.set("Value", false);
			}
		});
	},

	/**
	 * Subscribes on events.
	 * @private
	 */
	_subscribeCollectionEvents: function(collectionName, collection) {
		collection.on("itemChanged", this._onItemChanged.bind(this, collectionName), this);
	},

	/**
	 * Initializes items collection with selected values
	 * @param {string} collectionName name of binded collection
	 * @param {array} items array of items from lookup
	 * @param {array} selectedItems array of selected items
	 * @param {boolean} allowMultiselect Allow to select multiple items sign
	 * @protected
	 * @return {collection} inited collection of items
	 */
	initItemsCollection: function(collectionName, items, selectedItems, allowMultiselect) {
		var viewModelCollection = Ext.create("Terrasoft.BaseViewModelCollection");
		this.Terrasoft.each(items, function(item) {
			var value;
			if (allowMultiselect) {
				value = selectedItems.indexOf(item.value) > -1;
			} else {
				value = selectedItems === item.value;
			}
			var viewModelItem = this.Ext.create("Terrasoft.BaseViewModel", {
				values: {
					Title: item.name,
					Id: item.value,
					Value: value
				}
			});
			viewModelItem.sandbox = this.sandbox;
			viewModelCollection.add(item.value, viewModelItem);
		}, this);
		if (!allowMultiselect) {
			this._subscribeCollectionEvents(collectionName, viewModelCollection);
		}
		this.set(collectionName, viewModelCollection);
	},

	/**
	 * Returns view configuration for items.
	 * @param {Object} itemConfig Item configuration.
	 * @protected
	 */
	getItemViewConfig: function(itemConfig) {
		var radioButtonId = Terrasoft.Component.generateId();
		var config = {
			className: "Terrasoft.Container",
			classes: {
				wrapClassName: ["radio-button-container"]
			},
			items: [
				{
					id: radioButtonId,
					className: "Terrasoft.RadioButton",
					tag: true,
					checked: {bindTo: "Value"}
				},
				{
					inputId: radioButtonId,
					className: "Terrasoft.Label",
					caption: {bindTo: "Title"}
				}
			]
		};
		itemConfig.config =  config;
	},

	/**
	 * Returns view configuration for multiselect items.
	 * @param {Object} itemConfig Item configuration.
	 * @protected
	 */
	getMultiselectItemViewConfig: function(itemConfig) {
		var config = {
			className: "Terrasoft.Container",
			classes: {
				wrapClassName: ["responses-grid-row"]
			},
			items: [
				{
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["response-control-wrap"]
					},
					items: [
						{
							className: "Terrasoft.CheckBoxEdit",
							classes: {wrapClass: ["t-checkbox-control"]},
							checked: {bindTo: "Value"}
						}
					]
				},
				{
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["response-label-wrap"]
					},
					items: [
						{
							className: "Terrasoft.Label",
							caption: {bindTo: "Title"}
						}
					]
				}
			]
		};
		itemConfig.config =  config;
	},

	/**
	 * Returns array of values of selected items
	 * @param {string} collectionName Name of binded collection
	 * @protected
	 * @return {array} array of values of the selected items
	 */
	getSelectedOptions: function(collectionName) {
		var items = [];
		var collection = this.get(collectionName);
		if (!Ext.isEmpty(collection)) {
			items = collection
					.filter(function(item) {
						return item.get("Value");
					})
					.getItems()
					.map(function(item) {
						return item.values.Id;
					});
		}
		return items;
	}
});


