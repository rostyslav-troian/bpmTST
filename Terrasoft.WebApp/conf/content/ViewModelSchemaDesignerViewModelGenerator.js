Terrasoft.configuration.Structures["ViewModelSchemaDesignerViewModelGenerator"] = {innerHierarchyStack: ["ViewModelSchemaDesignerViewModelGenerator"]};
define("ViewModelSchemaDesignerViewModelGenerator", ["ViewModelGeneratorV2", "GridLayoutEditItemModel"],
	function() {
		/**
		 * Class for view model generating in design time.
		 */
		Ext.define("Terrasoft.configuration.ViewModelSchemaDesignerViewModelGenerator", {
			extend: "Terrasoft.configuration.ViewModelGenerator",
			alternateClassName: "Terrasoft.ViewModelSchemaDesignerViewModelGenerator",

			//region Methods: Private

			/**
			 * @private
			 */
			_findPackageSchema: function() {
				const packageUId = this.generateConfig.packageUId;
				const schemaName = this.generateConfig.schemaName;
				const items = Terrasoft.ClientUnitSchemaManager.getItems();
				const item = items.filterByPath("name", schemaName)
					.findByPath("packageUId", packageUId);
				return item && item.instance;
			},

			/**
			 * @private
			 */
			_getParentSchema: function(currentSchema, designSchema) {
				let index = 2;
				const hierarchy = this.generateConfig.hierarchyStack;
				if (Terrasoft.Features.getIsDisabled("UseSectionWizardHierarchy")) {
					index = designSchema && currentSchema.schemaUId === designSchema.uId ? 2 : 1;
				}
				return hierarchy[hierarchy.length - index];
			},

			/**
			 * Sets default schema body only if package schema not present in hierarchy.
			 * @private
			 */
			_setDefaultSchemaBody: function(schema) {
				schema.businessRules = {};
				schema.attributes = {};
				schema.details = {};
				schema.modules = {};
				schema.methods = {};
				schema.rules = {};
				schema.messages = {};
				schema.mixins = {};
			},

			/**
			 * @private
			 */
			_getCurrentSchema: function(designSchema) {
				const hierarchy = this.generateConfig.hierarchyStack;
				const currentSchema = hierarchy.slice(-1)[0];
				if (Terrasoft.Features.getIsDisabled("UseSectionWizardHierarchy")) {
					if (designSchema && currentSchema.schemaUId !== designSchema.uId) {
						this._setDefaultSchemaBody(currentSchema);
					}
				}
				return currentSchema;
			},

			/**
			 * @private
			 * @param {Object} rules Current schema business rules.
			 * @param {string} schemaUId Unique identifier of processed schema.
			 */
			_fillSchemaUId: function(rules, schemaUId) {
				Terrasoft.each(rules, function(columnRules) {
					Terrasoft.each(columnRules, function(rule) {
						rule.schemaUId = schemaUId;
					}, this);
				}, this);
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.configuration.ViewModelGenerator#preprocessBusinessRules
			 * @override
			 */
			preprocessBusinessRules: function(schema) {
				this.callParent(arguments);
				this._fillSchemaUId(schema.rules, schema.schemaUId);
				this._fillSchemaUId(schema.businessRules, schema.schemaUId);
			},

			/**
			 * @inheritdoc Terrasoft.configuration.ViewModelGenerator#addViewItemColumns
			 * @override
			 */
			addViewItemColumns: function(columnsConfig, config) {
				this.callParent(arguments);
				if (config.itemType === Terrasoft.ViewItemType.DESIGN_VIEW) {
					this.applyDesignedViewColumn(columnsConfig, config);
				}
			},

			/**
			 * Adds virtual columns(needed for customizable view) to schema.
			 * @protected
			 * @virtual
			 * @param {Object[]} columnsConfig Array of schema columns.
			 * @param {Object} config Customizable view config.
			 */
			applyDesignedViewColumn: function(columnsConfig, config) {
				const designSchema = this._findPackageSchema();
				const currentSchema = this._getCurrentSchema(designSchema);
				const parentSchema = this._getParentSchema(currentSchema, designSchema);
				columnsConfig.Schema = {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: currentSchema
				};
				columnsConfig.ParentSchemaView = {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: Terrasoft.deepClone(parentSchema.viewConfig)
				};
				columnsConfig.SchemaView = {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: currentSchema.viewConfig
				};
				columnsConfig.SchemaViewContainer = {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: config.name
				};
				columnsConfig.TabScrollIndex = {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: 0
				};
			},

			/**
			 * @inheritdoc Terrasoft.ViewModelGenerator#getTabItem
			 * @overridden
			 */
			getTabItem: function(columnsConfig, tabItemConfig) {
				columnsConfig[tabItemConfig.name + "ReorderableIndex"] = {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					value: null
				};
				const tabItem = this.callParent(arguments);
				const items = tabItemConfig.items;
				const tabItemContentCollection = new Terrasoft.BaseViewModelCollection({
					entitySchema: new Terrasoft.BaseEntitySchema({
						columns: {},
						primaryColumnName: "Name"
					})
				});
				if (!Ext.isEmpty(items)) {
					const rawValues = [];
					Terrasoft.each(items, function(item) {
						rawValues.push({
							Name: item.name,
							ItemType: item.itemType
						});
					}, this);
					tabItemContentCollection.loadFromColumnValues(rawValues);
				}
				return Ext.apply(tabItem, {
					Content: tabItemContentCollection
				});
			}

			//endregion

		});

		return Ext.create("Terrasoft.ViewModelSchemaDesignerViewModelGenerator");
	});


