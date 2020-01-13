Terrasoft.configuration.Structures["ContentMjGroupViewModel"] = {innerHierarchyStack: ["ContentMjGroupViewModel"]};
define("ContentMjGroupViewModel", ["ContentMjGroupViewModelResources", "BaseContentBlockViewModel",
		"ContentMjColumnViewModel"],
	function(resources) {

		/**
		 * Class for ContentMjGroupViewModel.
		 */
		Ext.define("Terrasoft.controls.ContentMjGroupViewModel", {
			extend: "Terrasoft.controls.BaseContentBlockViewModel",
			alternateClassName: "Terrasoft.ContentMjGroupViewModel",

			/**
			 * Name of the view class.
			 * @protected
			 * @type {String}
			 */
			className: "Terrasoft.ContentMjGroup",

			/**
			 * @inheritdoc BaseContentSerializableViewModelMixin#serializableSlicePropertiesCollection
			 * @override
			 */
			serializableSlicePropertiesCollection: ["ItemType", "Styles"],

			/**
			 * @inheritdoc BaseContentSerializableViewModelMixin#serializableChildrenCollectionSource
			 * @override
			 */
			serializableChildrenCollectionSource: "Items",

			/**
			 * @inheritdoc BaseContentSerializableViewModelMixin#childItemTypes
			 */
			childItemTypes: {
				column: "Terrasoft.ContentMjColumnViewModel"
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#constructor
			 * @override
			 */
			constructor: function() {
				this.callParent(arguments);
				this._initGroupWidth();
				this._initColumns();
				this.initResourcesValues(resources);
				this.subscribeOnCollectionEvents();
			},

			/**
			 * @private
			 */
			_initGroupWidth: function() {
				var groupWidth = !Terrasoft.isEmpty(this.$Items) && this.$Items.getCount() > 0
					? this.$Items
						.mapArray(function (el) {
							return el.$Width;
						})
						.reduce(function (a, b) {
							return a + b;
						})
					: 0;
				this.set("Width", groupWidth);
			},

			/**
			 * @private
			 */
			_initColumns: function() {
				Terrasoft.each(this.$Items, function(column) {
					column.set("GroupId", this.$Id);
					if (column.$RelativeWidth === column.$Width) {
						column.set("RelativeWidth", Math.floor(10000 * column.$Width * 100 / this.$Width) / 10000);
					}
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#onDestroy
			 * @override
			 */
			onDestroy: function() {
				this.$Items.un("add", this.onItemsCollectionChanged, this);
				this.$Items.un("remove", this.onItemsCollectionChanged, this);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseContentBlockViewModel#getViewConfig
			 * @override
			 */
			getViewConfig: function() {
				var config = this.callParent(arguments);
				Ext.apply(config, {
					"width": "$Width",
					"tools": this.getToolsConfig()
				});
				return config;
			},

			/**
			 * Returns config object of mjgroup item edit.
			 * @protected
			 * @virtual
			 * @returns {Object} Section item edit config.
			 */
			getItemEditConfig: function(item) {
				return {
					Id: item.$Id,
					ItemType: item.$ItemType,
					Width: item.$Width
				};
			},

			/**
			 * Actualizes children state.
			 * @protected
			 */
			actualizeChildren: function() {
				var groupWidth = !this.$Items.isEmpty()
					? this.$Items
						.mapArray(function(col) {
							return col.$Width;
						})
						.reduce(function(a, b) {
							return a + b;
						})
					: 0;
				Terrasoft.each(this.$Items, function(column) {
					var relativeWidth = 100 * column.$Width / groupWidth;
					column.$RelativeWidth = Math.floor(10000 * relativeWidth) / 10000;
					column.$GroupId = this.$Id;
				}, this);
				this.$Width = groupWidth;
			},

			/**
			 * Subscription on items collection events.
			 * @protected
			 */
			subscribeOnCollectionEvents: function() {
				this.$Items.on("add", this.onItemsCollectionChanged, this);
				this.$Items.on("remove", this.onItemsCollectionChanged, this);
			},

			/**
			 * Handler on items collection changed event.
			 * @protected
			 */
			onItemsCollectionChanged: function() {
				this.actualizeChildren();
			},

			/**
			 * Handler of event 'itemChanged' of Terrasoft.Collection.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} item Changed collection item.
			 * @param {Object} config Event parameters.
			 */
			onItemChanged: function(item, config) {
				if (config && config.event === "ungroupcolumns") {
					this.fireEvent("change", this, {
						event: "ungroupcolumns",
						arguments: config.arguments
					});
				} else {
					this.callParent(arguments);
				}
			},

			/**
			 * Handles events on grouping column action.
			 * @protected
			 */
			onGroupingColumns: function() {
				this.fireEvent("change", this, {
					event: "groupcolumns",
					arguments: {
						id: this.$Id
					}
				});
			},

			/**
			 * Generates configuration object of element tools.
			 * @protected
			 * @return {Array} Configuration object of element tools.
			 */
			getToolsConfig: function() {
				return [
					{
						className: "Terrasoft.Button",
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						markerValue: "group-column-button",
						imageConfig: "$Resources.Images.ContentGroupDefault",
						classes: {wrapperClass: "column-group-button"},
						click: "$onGroupingColumns"
					}
				];
			}
		});
	}
);


