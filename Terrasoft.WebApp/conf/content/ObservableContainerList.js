Terrasoft.configuration.Structures["ObservableContainerList"] = {innerHierarchyStack: ["ObservableContainerList"]};
/**
 * Extention for ContainerList control with observable items functionality.
 */
define("ObservableContainerList", ["ContainerList"], function() {
	Ext.define("Terrasoft.controls.ObservableContainerList", {
		extend: "Terrasoft.ContainerList",
		alternateClassName: "Terrasoft.ObservableContainerList",

		/**
		 * Indicates selected or not default item on init.
		 * @type {Boolean}
		 */
		itemSelectedAlways: false,

		/**
		 * Property name to sort items collection on "sorted" event of source collection.
		 * @type {String}
		 */
		itemSortPropertyName: null,

		// #region Methods: Private

		/**
		 * Sets view selected for selected model item.
		 * @private
		 */
		_initSelectedItem: function() {
			var selectedItem = this.items.findBy(function(el) {
				return el.model.$Selected;
			});
			if (selectedItem && selectedItem.model && selectedItem.model.id) {
				this._unselectItems();
				this.setItemSelected(selectedItem.model.id);
			}
		},

		/**
		 * Decrement insert index for item if collection has models with Default items.
		 * @private
		 * @param {Number} index Current index for insert.
		 * @returns {Object} Shift config.
		 */
		_tryShiftIndex: function(index) {
			var defaultSegment = this.items.findBy(function(el) {
				return el.model && el.model.source && el.model.source.$IsDefault;
			});
			var result = Boolean(defaultSegment);
			return  {
				index: result ? index - 1 : index,
				withShift: result
			};
		},

		/**
		 * Unselect all selected views.
		 * @private
		 */
		_unselectItems: function() {
			var wrapEl = this.getWrapEl();
			if (!wrapEl) {
				return;
			}
			var selector = this.rowCssSelector + "." + this.selectedItemCssClass;
			var prevSelectedItemSelection = wrapEl.select(selector);
			if (prevSelectedItemSelection) {
				Terrasoft.each(prevSelectedItemSelection, function(el) {
					el.removeCls(this.selectedItemCssClass);
				}, this);
			}
		},

		// #endregion

		// #region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.AbstractContainer#init
		 * @override
		 */
		init: function() {
			this.callParent(arguments);
			this.addEvents(
				/**
				 * @event onSelectedItemChanged
				 * When current selected item view is changed.
				 */
				"onSelectedItemChanged"
			);
		},

		/**
		 * @inheritdoc Terrasoft.ContainerList#setItemSelected
		 * @override
		 */
		setItemSelected: function(itemId, animate, config) {
			this.callParent(arguments);
			if (config && config.silent) {
				return;
			}
			var idProperty = this.idProperty;
			var view = this.items.findBy(function(el) {
				return el.model.get(idProperty) === itemId;
			});
			this.fireEvent("onSelectedItemChanged", view.model);
		},

		/**
		 * @inheritdoc Terrasoft.ContainerList#onItemClick
		 * @override
		 */
		onItemClick: function(itemId) {
			this.callParent(arguments);
			if (!Ext.isEmpty(this.items)) {
				var idProperty = this.idProperty;
				var view = this.items.findBy(function(el) {
					return el.model.get(idProperty) === itemId;
				});
				if (view && view.model) {
					Terrasoft.each(this.items, function(el) {
						el.model.$Selected = false;
					}, this);
					view.model.$Selected = true;
				}
			}
		},

		/**
		 * @inheritdoc Terrasoft.ContainerList#getCustomItemConfig
		 * @override
		 */
		getCustomItemConfig: function(item) {
			if (Ext.isFunction(item.getViewConfig)) {
				return item.getViewConfig();
			}
			return null;
		},

		/**
		 * @inheritdoc Terrasoft.ContainerList#onAddItem
		 * @override
		 */
		onAddItem: function(item, index) {
			var idProperty = this.idProperty;
			var res = this._tryShiftIndex(index);
			if (res.withShift) {
				index = res.index;
				this._unselectItems();
			}
			this.callParent(arguments);
			item.setContainerList(this);
			item.$Selected = true;
			this.setItemSelected(item.get(idProperty));
		},

		/**
		 * @inheritdoc Terrasoft.ContainerList#onDeleteItem
		 * @override
		 */
		onDeleteItem: function(item) {
			this.callParent(arguments);
			if (this.items.getCount() > 0) {
				var idProperty = this.idProperty;
				var newSelectedItem = this.items.first();
				newSelectedItem.model.$Selected = true;
				this._unselectItems();
				this.setItemSelected(newSelectedItem.model.get(idProperty));
			} else {
				this.fireEvent("onSelectedItemChanged", undefined);
			}
		},

		/**
		 * @inheritdoc Terrasoft.ContainerList#onCollectionDataLoaded
		 * @override
		 */
		onCollectionDataLoaded: function() {
			this.callParent(arguments);
			Terrasoft.each(this.items, function(item) {
				item.model.setContainerList(this);
			}, this);
			if (this.itemSelectedAlways) {
				this._initSelectedItem();
			}
		},

		/**
		 * Removes model item from collection.
		 * @public
		 * @param {Terrasoft.BaseViewModel} item View model item.
		 */
		removeItem: function(item) {
			if (this.model) {
				var collection = this.model.get(this.bindings.collection.modelItem);
				collection.remove(item);
			}
		},

		/**
		 * @inheritdoc Terrasoft.ContainerList#getItemElementId
		 * @override
		 */
		getItemElementId: function(item) {
			var idProperty = this.idProperty;
			var listItem = this.items.findBy(function(el) {
				return el.model.get(idProperty) === item.get(idProperty);
			});
			if (listItem) {
				return listItem.id;
			}
			return null;
		},

		/**
		 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
		 * @override
		 */
		subscribeForCollectionEvents: function(binding, property, model) {
			this.callParent(arguments);
			var collection = model.get(binding.modelItem);
			collection.on("sorted", this.onCollectionSorted, this);
		},

		/**
		 * Handler on "sorted" source collection event.
		 * Sorts items by itemSortPropertyName if it is set.
		 * @protected
		 */
		onCollectionSorted: function() {
			if (!Ext.isEmpty(this.itemSortPropertyName)) {
				var propName = this.itemSortPropertyName;
				this.items.sortBy(function(item, otherItem) {
					var itemPropValue = item.model.get(propName);
					var otherItemPropValue = otherItem.model.get(propName);
					if (itemPropValue === otherItemPropValue) {
						return 0;
					}
					return (itemPropValue < otherItemPropValue) ? -1 : 1;
				});
				this.reRender();
				this._initSelectedItem();
			}
		},

		/**
		 * @inheritdoc Terrasoft.Bindable#unSubscribeForCollectionEvents
		 * @override
		 */
		unSubscribeForCollectionEvents: function(binding, property, model) {
			if (!model) {
				return;
			}
			var collection = model.get(binding.modelItem);
			collection.un("sorted", this.onCollectionSorted, this);
			this.callParent(arguments);
		}

		// #endregion

	});
	return Terrasoft.ObservableContainerList;
});


