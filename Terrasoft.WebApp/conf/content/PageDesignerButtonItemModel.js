Terrasoft.configuration.Structures["PageDesignerButtonItemModel"] = {innerHierarchyStack: ["PageDesignerButtonItemModel"]};
define("PageDesignerButtonItemModel", ["PageDesignerButtonItemModelResources", "MaskHelper", "DesignTimeItemModel"
], function(resources) {

	Ext.define("Terrasoft.PageDesignerButtonItemModel", {
		extend: "Terrasoft.DesignTimeItemModel",

		// region Properties: Public

		/**
		 * @inheritdoc Terrasoft.BaseModel#columns
		 * @override
		 */
		columns: {
			"Id": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				autoBind: true
			},
			"Name": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				autoBind: true
			},
			"Caption": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				autoBind: true
			},
			"PerformClosePage": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				autoBind: true
			},
			"PerformSaveData": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				autoBind: true
			},
			"GenerateSignal": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				autoBind: true
			},
			"Tag": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				autoBind: true
			},
			"Style": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				autoBind: true
			},
			"Enabled": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				autoBind: true
			},
			"ReorderableModel": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			"Selected": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false,
				autoBind: true
			}
		},

		/**
		 * Init button config.
		 * @type {Object}
		 */
		itemConfig: null,

		// endregion

		// region Methods: Private

		/**
		 * @private
		 */
		_generateName: function() {
			return this.itemConfig.name + "-" + Terrasoft.generateGUID("N");
		},

		/**
		 * @private
		 */
		_generateTag: function(items) {
			var values = items.mapArray(function(button) {
				return button.get("Tag");
			}, this);
			return Terrasoft.getUniqueValue(values, this.itemConfig.name);
		},

		/**
		 * @private
		 */
		_generateCaption: function(items) {
			var captions = items.mapArray(function(button) {
				return button.get("Caption");
			}, this);
			return Terrasoft.getUniqueValue(captions, this.itemConfig.caption + " ");
		},

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.DesignTimeItemModel#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initResourcesValues(resources);
			this.initCaption();
		},

		/**
		 * @inheritdoc Terrasoft.DesignTimeItemModel#createDesignItem
		 * @override
		 */
		createDesignItem: function(designSchema) {
			var buttons = designSchema.get("ProcessActionButtons");
			var values = {
				"Id": Terrasoft.generateGUID(),
				"Name": this._generateName(),
				"Caption": this._generateCaption(buttons),
				"Tag": this._generateTag(buttons),
				"Style": Terrasoft.controls.ButtonEnums.style.GREEN,
				"PerformClosePage": true,
				"PerformSaveData": true,
				"GenerateSignal": "",
				"Enabled": true
			};
			var designItem = new this.self({
				values: values,
				designSchema: designSchema
			});
			return designItem;
		},

		/**
		 * @inheritdoc Terrasoft.DesignTimeItemModel#getImageConfig
		 * @override
		 */
		getImageConfig: function() {
			return resources.localizableImages.ButtonImage;
		},

		/**
		 * @inheritdoc Terrasoft.DesignTimeItemModel#getDragActionCode
		 * @override
		 */
		getDragActionCode: function() {
			return Terrasoft.DragAction.MOVE;
		},

		/**
		 * @inheritdoc Terrasoft.DesignTimeItemModel#getCaption
		 * @override
		 */
		getCaption: function() {
			return this.$Caption || this.itemConfig && this.itemConfig.caption;
		},

		/**
		 * @inheritdoc Terrasoft.Reorderable#getReorderableIndex
		 * @override
		 */
		getReorderableIndex: function() {
			return this.designSchema.$ButtonReorderableIndex;
		},

		/**
		 * @inheritdoc Terrasoft.Reorderable#setReorderableIndex
		 * @override
		 */
		setReorderableIndex: function(value) {
			this.designSchema.$ButtonReorderableIndex = value;
		},

		/**
		 * Update reorder index after DragEnter event fire.
		 * @protected
		 * @param {String} crossedItemId Crossed element Id.
		 */
		onDragEnter: function(crossedItemId) {
			var indexOf = this.parentCollection.getKeys().indexOf(crossedItemId);
			this.setReorderableIndex(indexOf);
		},

		/**
		 * Clear reorder index after DragOut event fire.
		 * @protected
		 */
		onDragOut: function() {
			this.setReorderableIndex(null);
		},

		/**
		 * Reordering tab collection.
		 * @protected
		 * @return {Boolean}
		 */
		onDragDrop: function() {
			var reorderableIndex = this.getReorderableIndex();
			this.setReorderableIndex(null);
			var items = this.parentCollection;
			var itemIndex = items.getKeys().indexOf(this.$Name);
			if (Ext.isEmpty(reorderableIndex)) {
				return false;
			}
			if (reorderableIndex < itemIndex) {
				reorderableIndex += 1;
			}
			items.move(itemIndex, reorderableIndex);
			return true;
		}

		// endregion

	});

	return Terrasoft.PageDesignerButtonItemModel;

});


