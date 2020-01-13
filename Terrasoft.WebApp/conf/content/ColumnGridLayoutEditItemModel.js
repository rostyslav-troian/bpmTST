Terrasoft.configuration.Structures["ColumnGridLayoutEditItemModel"] = {innerHierarchyStack: ["ColumnGridLayoutEditItemModel"]};
define("ColumnGridLayoutEditItemModel", ["GridLayoutEditItemModel"], function() {

	/**
	 * Class of ColumnGridLayoutEditItemModel
	 */
	Ext.define("Terrasoft.configuration.ColumnGridLayoutEditItemModel", {
		extend: "Terrasoft.GridLayoutEditItemModel",
		alternateClassName: "Terrasoft.ColumnGridLayoutEditItemModel",

		/**
		 * @type {Terrasoft.EntitySchemaColumn}
		 */
		column: null,

		/**
		 * @type {Terrasoft.ViewModelColumnType}
		 */
		itemColumnType: null,

		/**
		 * @type {Terrasoft.BaseViewModel}
		 */
		parentViewModel: null,

		/**
		 * @type {String}
		 */
		schemaModelItemDesignerName: null,

		/**
		 * @type {Boolean}
		 */
		isUsed: false,

		/**
		 * Returns item valid value.
		 * @private
		 * @return {Boolean}
		 */
		isValidItem: function() {
			const itemType = this.itemConfig && this.itemConfig.itemType;
			const isValidViewModelColumnType = Terrasoft.contains(Terrasoft.ViewModelColumnType, this.itemColumnType);
			const hasType = Ext.isNumeric(itemType) || isValidViewModelColumnType;
			return !Ext.isEmpty(this.column) || hasType;
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItemModel#getImageConfig
		 * @overridden
		 */
		getImageConfig: function() {
			const dataValueType = this.get("DataValueType");
			const resourceName = this.getResourceNameForDataValueType(dataValueType);
			return this.get(resourceName);
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItemModel#getDragActionCode
		 * @overridden
		 */
		getDragActionCode: function() {
			const dataValueType = this.get("DataValueType");
			const contentType = this.itemConfig.contentType;
			if (dataValueType === Terrasoft.DataValueType.TEXT && contentType === Terrasoft.ContentType.LONG_TEXT) {
				return this.callParent(arguments);
			} else {
				return Terrasoft.DragAction.MOVE | Terrasoft.DragAction.RESIZE_LEFT | Terrasoft.DragAction.RESIZE_RIGHT;
			}
		},

		/**
		 * Returns the localizable resource name depending on the transmitted data type.
		 * @protected
		 * @virtual
		 * @param {Terrasoft.DataValueType} dataValueType Data type.
		 * @return {string} Localizable resource name.
		 */
		getResourceNameForDataValueType: function(dataValueType) {
			switch (dataValueType) {
				case Terrasoft.DataValueType.TEXT:
					return "Resources.Images.TextEditImage";
				case Terrasoft.DataValueType.INTEGER:
					return "Resources.Images.IntegerEditImage";
				case Terrasoft.DataValueType.FLOAT:
				case Terrasoft.DataValueType.MONEY:
					return "Resources.Images.FloatEditImage";
				case Terrasoft.DataValueType.DATE_TIME:
				case Terrasoft.DataValueType.DATE:
				case Terrasoft.DataValueType.TIME:
					return "Resources.Images.DateTimeEditImage";
				case Terrasoft.DataValueType.LOOKUP:
					return "Resources.Images.LookupEditImage";
				case Terrasoft.DataValueType.ENUM:
					return "Resources.Images.ComboBoxEditImage";
				case Terrasoft.DataValueType.BOOLEAN:
					return "Resources.Images.CheckBoxImage";
				default:
					return "";
			}
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItemModel#getCaption
		 * @overridden
		 */
		getCaption: function() {
			if (this.column) {
				let caption = (this.column.caption || this.column.name).toString();
				if (this.isUsed && (!this.parentViewModel.$IsPrimary ||
						this.parentViewModel.$Name === "Parameters")) {
					caption += " (" + this.parentViewModel.get("Caption") + ")";
				}
				return caption;
			}
			let result = this.itemConfig.bindTo || this.itemConfig.name;
			if (!this.isValidItem()) {
				result += " " + this.get("Resources.Strings.RemovedInvalidColumnCaption");
			}
			return result;
		},

		/**
		 * Initializes data value type.
		 * @protected
		 * @virtual
		 */
		initDataValueType: function() {
			const column = this.column;
			if (column) {
				this.set("DataValueType", column.dataValueType);
			}
		},

		/**
		 * Returns array of classes for current item.
		 * @protected
		 * @virtual
		 * @return {String[]} Array of CSS classes.
		 */
		getItemClasses: function() {
			const column = this.column;
			const wrapClasses = [];
			if (column && column.isRequired) {
				wrapClasses.push("is-required");
			}
			return wrapClasses;
		},

		/**
		 * Initializes IsRequired attribute.
		 * @protected
		 * @virtual
		 */
		initIsRequired: function() {
			const column = this.column || {};
			const itemConfig = this.itemConfig || {};
			const isRequired = column.isRequired || itemConfig.isRequired;
			this.set("IsRequired", isRequired);
		},

		/**
		 * Column changes event handler.
		 * @protected
		 * @virtual
		 */
		onContentChange: function() {
			this.initIsRequired();
			this.initDataValueType();
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			if (this.column) {
				this.column.on("changed", this.onContentChange, this);
			}
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItemModel#getConfigurationButtonVisible
		 * @overridden
		 */
		getConfigurationButtonVisible: function() {
			return this.column && !this.itemConfig.generator;
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#destroy
		 * @overridden
		 */
		destroy: function() {
			if (this.column) {
				this.column.un("changed", this.onContentChange, this);
			}
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.Component#getDomAttributes
		 * @overridden
		 */
		getDomAttributes: function() {
			return {
				"data-valid-column": this.isValidItem(),
				"data-required": this.get("IsRequired")
			};
		},

		/**
		 * Returns entity schema column for design item.
		 * @protected
		 * @return {Terrasoft.EntitySchemaColumn} Entity schema column for design item.
		 */
		getDesignEntitySchemaColumn: function() {
			return this.column;
		},

		/**
		 * Returns item config for design item.
		 * @protected
		 * @param {Terrasoft.ViewModelSchemaDesignerSchema} designSchema Design schema.
		 * @param {String} layoutName Layout name.
		 * @return {Object} Item config for design item.
		 */
		getDesignItemConfig: function(designSchema, layoutName) {
			const currentSelection = designSchema.get(layoutName + "Selection");
			const itemConfig = Terrasoft.deepClone(this.itemConfig);
			Ext.apply(itemConfig.layout, currentSelection);
			itemConfig.bindTo = this.parentViewModel.getColumnPath(itemConfig.name);
			itemConfig.name += Terrasoft.generateGUID();
			return itemConfig;
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItemModel#createDesignItem
		 * @overridden
		 */
		createDesignItem: function(designSchema, config) {
			if (this.schemaModelItemDesignerName === null) {
				throw new Terrasoft.NullOrEmptyException();
			}
			return Ext.create(Ext.getClassName(this), {
				designSchema: designSchema,
				parentViewModel: this.parentViewModel,
				itemConfig: this.getDesignItemConfig(designSchema, config.layoutName),
				column: this.getDesignEntitySchemaColumn(designSchema),
				schemaModelItemDesignerName: this.schemaModelItemDesignerName,
				isUsed: true
			});
		},

		/**
		 * Adds design item to design schema collection.
		 * @protected
		 * @virtual
		 * @param {String} layoutName Collection of grid elements.
		 */
		addItemToDesignSchemaCollection: function(layoutName) {
			const designSchema = this.designSchema;
			const collection = designSchema.getGridLayoutEditCollection(layoutName);
			const itemConfig = this.itemConfig;
			collection.add(itemConfig.name, this);
			const usedColumns = designSchema.get("UsedColumns");
			if (Ext.isEmpty(usedColumns[itemConfig.bindTo])) {
				usedColumns[itemConfig.bindTo] = 0;
			}
			usedColumns[itemConfig.bindTo]++;
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItemModel#getMessages
		 * @overridden
		 */
		getMessages: function() {
			const designerModuleId = this.getDesignerModuleId();
			return [{
				ownerId: this.instanceId,
				messageName: "GetModuleInfo",
				moduleId: designerModuleId,
				handler: this.getConfigureModelItemModuleConfig
			}, {
				ownerId: this.instanceId,
				messageName: "GetColumnConfig",
				moduleId: designerModuleId,
				handler: this.getConfigureModelItemColumnConfig
			}, {
				ownerId: this.instanceId,
				messageName: "GetSchemaColumnsNames",
				moduleId: designerModuleId,
				handler: this.getSchemaColumnsNames
			}, {
				ownerId: this.instanceId,
				messageName: "GetDesignerDisplayConfig",
				moduleId: designerModuleId,
				handler: this.getDesignerDisplayConfig
			}, {
				ownerId: this.instanceId,
				messageName: "OnDesignerSaved",
				moduleId: designerModuleId,
				handler: this.onDesignerSave
			}, {
				ownerId: this.instanceId,
				messageName: "GetNewLookupPackageUId",
				moduleId: designerModuleId,
				handler: this.getPackageUId
			}];
		},

		/**
		 * Generates designer module id.
		 * @protected
		 * @virtual
		 * @return {String} Designer module id.
		 */
		getDesignerModuleId: function() {
			return this.designSchema.sandbox.id + "_ModelItemConfigModule";
		},

		/**
		 * Returns designer module schema name.
		 * @protected
		 * @virtual
		 * @return {Object} Designer module schema name.
		 */
		getConfigureModelItemModuleConfig: function() {
			if (this.schemaModelItemDesignerName === null) {
				throw new Terrasoft.NullOrEmptyException();
			}
			return {schemaName: this.schemaModelItemDesignerName};
		},

		/**
		 * Returns designer module item.
		 * @protected
		 * @virtual
		 * @return {Object} Designer module item.
		 */
		getConfigureModelItemColumnConfig: function() {
			return this;
		},

		/**
		 * Generates the array of column for current item.
		 * @protected
		 * @virtual
		 * @return {String[]} Array of column for current item.
		 */
		getSchemaColumnsNames: function() {
			return this.parentViewModel.get("Schema").columns.mapArrayByPath("name");
		},

		/**
		 * Generates designer display configuration.
		 * @protected
		 * @virtual
		 * @return {Object} Designer display item configuration.
		 */
		getDesignerDisplayConfig: function() {
			return {isNewColumn: this.designSchema.get("ActionLayoutCreate")};
		},

		/**
		 * Returns identifier of current package.
		 * @protected
		 * @virtual
		 * @return {String} Identifier of current package.
		 */
		getPackageUId: function() {
			return this.designSchema.getPackageUId();
		},

		/**
		 * Adds column to data model.
		 * @protected
		 */
		addColumnToEntitySchema: function() {
			const dataModelSchema = this.parentViewModel.get("Schema");
			dataModelSchema.addColumn(this.column);
		},

		/**
		 * Adds new schema design tool to design schema.
		 * @protected
		 */
		addSchemaDesignToolItemToDesignSchema: function() {
			const collection = Ext.create("Terrasoft.Collection");
			collection.add(this.column.uId, this.column);
			const existingModelDraggableItems = this.parentViewModel.get("ExistingModelDraggableItems");
			this.designSchema.loadColumnsCollection(existingModelDraggableItems, collection,
				"Terrasoft.ExistingColumnGridLayoutEditItemModel", this.parentViewModel);
		},

		/**
		 * Updates schema design tool from entity schema column information.
		 * @protected
		 */
		updateSchemaDesignToolItem: function() {
			const draggableItemsCollection = this.parentViewModel.get("ExistingModelDraggableItems");
			const item = draggableItemsCollection.get(this.column.uId);
			const column = this.column;
			item.set("IsRequired", column.isRequired);
			item.set("content", column.caption.getValue());
		},

		/**
		 * Designer save event handler.
		 * @protected
		 */
		onDesignerSave: function() {
			const designSchema = this.designSchema;
			if (designSchema.get("ActionLayoutCreate")) {
				const layoutName = designSchema.get("ActionLayoutName");
				this.addItemToDesignSchemaCollection(layoutName);
				this.addColumnToEntitySchema();
				this.addSchemaDesignToolItemToDesignSchema();
			}
			this.updateSchemaDesignToolItem();
		},

		/**
		 * Opens designer.
		 * @protected
		 */
		openDesigner: function() {
			this.designSchema.showBodyMask();
			this.designSchema.sandbox.loadModule("ModalBoxSchemaModule", {id: this.getDesignerModuleId()});
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItemModel#edit
		 * @overridden
		 */
		edit: function(config) {
			if (this.column && !this.itemConfig.generator) {
				const designSchema = this.designSchema;
				designSchema.set("ActionLayoutName", config.layoutName);
				designSchema.set("ActionLayoutItem", this);
				designSchema.set("ActionLayoutCreate", false);
				this.openDesigner();
			}
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItemModel#removeFromDesignSchema
		 * @overridden
		 */
		removeFromDesignSchema: function() {
			const designSchema = this.designSchema;
			const itemConfig = this.itemConfig;
			const bindTo = itemConfig.bindTo || itemConfig.name;
			const usedColumns = designSchema.get("UsedColumns");
			if (usedColumns[bindTo]) {
				usedColumns[bindTo]--;
			}
			if (!usedColumns[bindTo]) {
				const itemType = itemConfig.itemType;
				const viewItemType = Terrasoft.ViewItemType;
				if (itemType !== viewItemType.CONTAINER && itemType !== viewItemType.GRID_LAYOUT && this.column) {
					const existingModelDraggableItems = this.parentViewModel.get("ExistingModelDraggableItems");
					const columnUId = this.column.getPropertyValue("uId");
					const existingModelDraggableItem = existingModelDraggableItems.get(columnUId);
					existingModelDraggableItem.set("IsUsed", false);
				}
			}
			this.callParent(arguments);
		}
	});

	return Terrasoft.ColumnGridLayoutEditItemModel;
});


