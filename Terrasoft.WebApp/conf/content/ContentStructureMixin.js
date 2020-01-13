Terrasoft.configuration.Structures["ContentStructureMixin"] = {innerHierarchyStack: ["ContentStructureMixin"]};
define("ContentStructureMixin", ["ContentStructureMixinResources", "BaseContentStructureItemViewModel"],
	function(resources) {
		Ext.define("Terrasoft.configuration.mixins.ContentStructureMixin", {
			alternateClassName: "Terrasoft.ContentStructureMixin",

			/**
			 * Subscribes on page attribute events.
			 * @private
			 */
			_subscribeOnEvents: function() {
				this.on("removestructureitem", this.onStructureItemRemove, this);
				this.on("selectstructureitem", this.onStructureItemSelect, this);
				this.get("StructureItems").on("changed", this.onStructureItemCollectionChanged, this);
			},

			/**
			 * Subscribes on page attribute events.
			 * @private
			 */
			_unsubscribeOnEvents: function() {
				this.un("removestructureitem", this.onStructureItemRemove, this);
				this.un("selectstructureitem", this.onStructureItemSelect, this);
				this.get("StructureItems").un("changed", this.onStructureItemCollectionChanged, this);
			},

			/**
			 * Finds all unique item types recursively.
			 * @private
			 */
			_fillAllItemTypes: function(parent, itemTypes) {
				Terrasoft.each(parent.$StructureItems, function(structureItem) {
					var itemType = structureItem.$Config.ItemType;
					if (!itemTypes[itemType]) {
						itemTypes[itemType] = 1;
					}
					if (!Terrasoft.isEmpty(structureItem.$StructureItems)) {
						this._fillAllItemTypes(structureItem, itemTypes);
					}
				}, this);
			},

			/**
			 * Inits structure list collection.
			 * @protected
			 * @param {Boolean} isReverse Flag to indicate reverse structure items' order.
			 */
			initStructureItems: function(isReverse) {
				if (!this.get("StructureItems")) {
					this.set("StructureItems", new Terrasoft.BaseViewModelCollection());
				}
				var collection = new Terrasoft.BaseViewModelCollection();
				Terrasoft.each(this.$Config.Items, function(item) {
					var vm = this.createStructureItemViewModel(item);
					collection.add(item.Id, vm);
				}, this);
				if (isReverse) {
					var maxIndex = collection.getCount() - 1;
					for (var i = 0; i < maxIndex; i++) {
						collection.move(maxIndex, i);
					}
				}
				this.get("StructureItems").reloadAll(collection);
			},

			/**
			 * Returns list item view model for structure item config.
			 * @protected
			 * @param {Object} item Structure item config.
			 * @returns {Terrasoft.BaseContentStructureItemViewModel} Structure item view model.
			 */
			createStructureItemViewModel: function(item) {
				var values = this.prepareItemValues(item);
				var vm = Ext.create(this.itemViewModelNames[item.ItemType], {
					values: values,
					parentViewModel: this
				});
				return vm;
			},

			/**
			 * Returns item values config for view model.
			 * @protected
			 * @param {Object} item Structure item config.
			 * @returns {Object} Structure item view model values config.
			 */
			prepareItemValues: function(item) {
				return {
					Id: item.Id,
					Config: item,
					Name: item.ItemType,
					IsRemovable: true
				};
			},

			/**
			 * Generates configuration view of the element.
			 * @protected
			 * @param {Object} itemConfig Link to configuration of element in ContainerList.
			 * @param {Terrasoft.BaseContentStructureItemViewModel} item Structure list item.
			 * @returns {Object} Configuration of structure item in ContainerList.
			 */
			getStructureItemViewConfig: function(itemConfig, item) {
				if (Ext.isFunction(item.getViewConfig)) {
					itemConfig.config = item.getViewConfig();
				}
				return itemConfig;
			},

			/**
			 * Sets captions for structure items for every item type.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} parent Item view model with structure items.
			 * @param {Object} counters ItemType counters.
			 */
			setStructureItemCaptions: function(parent, counters) {
				Terrasoft.each(parent.$StructureItems, function(structureItem) {
					var itemType = structureItem.$Config.ItemType;
					structureItem.setCaption(counters[itemType]);
					counters[itemType]++;
					if (!Terrasoft.isEmpty(structureItem.$StructureItems)) {
						this.setStructureItemCaptions(structureItem, counters);
					}
				}, this);
			},

			/**
			 * Actualizes structure list item captions.
			 * @protected
			 */
			refreshStructureItemCaptions: function() {
				var counters = {};
				this._fillAllItemTypes(this, counters);
				this.setStructureItemCaptions(this, counters);
			},

			/**
			 * Initializes structure items' events.
			 * @protected
			 */
			initEvents: function() {
				this.addEvents(
					/**
					 * @event removestructureitem
					 * Event for remove structure item click.
					 */
					"removestructureitem",
					/**
					 * @event selectstructureitem
					 * Event for select structure item click.
					 */
					"selectstructureitem"
				);
				this._subscribeOnEvents();
			},

			/**
			 * Provide logic on item destroy.
			 * @protected
			 */
			onDestroy: function() {
				this._unsubscribeOnEvents();
			},

			/**
			 * Returns default config for the structure item.
			 * @protected
			 * @returns {Object} Default config for the structure item.
			 */
			getDefaultStructureItemConfig: function (itemType) {
				return {
					ItemType: itemType,
					Id: Terrasoft.generateGUID()
				};
			},

			/**
			 * Prepares an array of structure items configs.
			 * @protected
			 * @returns {Array} Structure items configs.
			 */
			getStructureItems: function () {
				var structureItems = this.$StructureItems.mapArray(function(item) {
					return item.getStructureItemConfig();
				}, this);
				return structureItems;
			}	
		});
	});


