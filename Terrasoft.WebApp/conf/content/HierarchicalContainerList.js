Terrasoft.configuration.Structures["HierarchicalContainerList"] = {innerHierarchyStack: ["HierarchicalContainerList"]};
define("HierarchicalContainerList", ["ContainerList"], function() {

	/**
	 * Implements view of the collection of items by container config with hierarchical feature.
	 */
	Ext.define("Terrasoft.controls.HierarchicalContainerList", {
		extend: "Terrasoft.ContainerList",
		alternateClassName: "Terrasoft.HierarchicalContainerList",

		// region Properties: Public

		/**
		 * Name of hierarchical property.
		 */
		nestedItemsAttributeName: null,

		/**
		 * Id of nested items container.
		 */
		nestedItemsContainerId: null,

		// endregion

		// region Methods: Private

		/**
		 * Has parameter nested parameters.
		 * @private
		 */
		_hasNested: function(item) {
			return !Ext.isEmpty(this.nestedItemsAttributeName) && item.get(this.nestedItemsAttributeName) &&
				item.get(this.nestedItemsAttributeName).getCount() > 0;
		},

		/**
		 * Creates nested items control config.
		 * @private
		 */
		_generateNestedContainerListConfig: function(item) {
			const containerUId = item.sandbox.id;
			const wrapEl = this.initialConfig.selectors && this.initialConfig.selectors.wrapEl;
			const containerListConfig = Ext.merge(Ext.clone(this.initialConfig), {
				id: this.initialConfig.id + containerUId,
				collection: {
					bindTo: this.nestedItemsAttributeName
				}
			});
			if (wrapEl) {
				containerListConfig.selectors = {
					wrapEl: wrapEl + containerUId
				};
			}
			return {
				items: [containerListConfig]
			};
		},

		/**
		 * Adds nested hierarchical container list to current container.
		 * @private
		 */
		_addNestedToContainer: function(container, item) {
			if (container && container.items) {
				var viewConfig = this._generateNestedContainerListConfig(item);
				var itemView = Ext.create("Terrasoft.Container", Ext.merge(viewConfig, {
					id: item.sandbox.id + "NestedItemsContainer"
				}));
				container.items.push(itemView);
			}
		},

		/**
		 * Searches for element in view configuration by id.
		 * @param {Object[]} viewConfig Configuration of the view.
		 * @param {String} itemId Item id.
		 * @return {Object} Searched item.
		 */
		_findViewConfigItem: function(viewConfig, itemId) {
			var result = null;
			if (viewConfig && Ext.isArray(viewConfig.items)) {
				Terrasoft.each(viewConfig.items, function(item) {
					if ((item && item.id) === itemId) {
						result = item;
						return false;
					} else {
						result = this._findViewConfigItem(item, itemId);
						if (result) {
							return false;
						}
					}
				}, this);
			}
			return result;
		},

		// endregion

		// region Methods: Protected

		/**
		 * @inheritDoc Terrasoft.Terrasoft.ContainerList#getItemView
		 */
		getItemView: function(item) {
			var prefix = this.itemPrefix || item.sandbox.id;
			var id = item.get(this.idProperty);
			var itemConfig = this.getItemViewConfig(item);
			itemConfig.classes.wrapClassName.push("hierarchical-container-list-item");
			var targetForNested = this._findViewConfigItem(itemConfig, this.nestedItemsContainerId);
			this.decorateView([itemConfig], id, prefix);
			var className = itemConfig && itemConfig.className ? itemConfig.className : "Terrasoft.Container";
			if (this._hasNested(item)) {
				this._addNestedToContainer(targetForNested, item);
			}
			return Ext.create(className, itemConfig);
		}

		// endregion

	});

});


