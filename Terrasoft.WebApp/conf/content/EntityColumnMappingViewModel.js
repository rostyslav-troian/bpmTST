Terrasoft.configuration.Structures["EntityColumnMappingViewModel"] = {innerHierarchyStack: ["EntityColumnMappingViewModel"]};
define("EntityColumnMappingViewModel", ["terrasoft", "EntityColumnMappingViewModelResources",
		"MenuItemsMappingMixin", "MappingEditMixin"],
	function(Terrasoft, resources) {
		/**
		 * @class Terrasoft.EntityColumnMappingViewModel
		 * Class for entity column mapping view model.
		 */
		Ext.define("Terrasoft.model.EntityColumnMappingViewModel", {
			extend: "Terrasoft.model.BaseModel",
			alternateClassName: "Terrasoft.EntityColumnMappingViewModel",
			mixins: {
				mappingEditMixin: "Terrasoft.MappingEditMixin",
				menuItemsMappingMixin: "Terrasoft.MenuItemsMappingMixin"
			},
			attributes: {
				/**
				 * Tool button image.
				 */
				"ToolButtonImage": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Invoker Uid.
				 */
				"InvokerUId": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			columns: {
				/**
				 * Related column identifier.
				 */
				Id: {dataValueType: Terrasoft.DataValueType.TEXT},
				ProcessElement: {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
				},
				/**
				 * Related schema column.
				 */
				SchemaColumn: {dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT},
				/**
				 * Mapping edit caption.
				 */
				Caption: {dataValueType: Terrasoft.DataValueType.TEXT},
				/**
				 * Mapping edit value.
				 */
				Value: {dataValueType: Terrasoft.DataValueType.MAPPING},
				/**
				 * Identifier of the related localizable parameter value list item.
				 */
				LocalizableParameterValueId: {dataValueType: Terrasoft.DataValueType.TEXT},
				/**
				 * Tool button menu collection.
				 */
				ToolButtonMenu: {dataValueType: Terrasoft.DataValueType.COLLECTION},
				/**
				 * Collection of source schema columns that fit current mapping by their types.
				 */
				SourceColumns: {dataValueType: Terrasoft.DataValueType.COLLECTION},
				/**
				 * Menu items view model collection.
				 */
				MenuItems: {dataValueType: Terrasoft.DataValueType.COLLECTION}
			},

			/**
			 * Sandbox object.
			 * @private
			 */
			sandbox: null,

			//region Methods: Private

			/**
			 * @inheritdoc Terrasoft.model.BaseModel#constructor
			 */
			constructor: function() {
				this.callParent(arguments);
				this.addEvents("itemRemoved");
				this.on("itemRemoved", this.onItemRemoved);
				this.initMappingEntitySchema(this.initDesignerType, this);
			},

			/**
			 * Initialize view model. Actualize mapping display value.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function call context.
			 */
			init: function(callback, scope) {
				var mapping = this.get("Value");
				var mappingValue = mapping.value;
				if (mapping.source === Terrasoft.ProcessSchemaParameterValueSource.ConstValue ||
					mapping.source === Terrasoft.ProcessSchemaParameterValueSource.None) {
					callback.call(scope);
					return;
				}
				if (mapping.source === Terrasoft.ProcessSchemaParameterValueSource.EntityMapping) {
					var sourceColumn = this.findSourceColumn(mappingValue);
					var displayValue = this.getMappingDisplayValue(sourceColumn);
					mapping.displayValue = displayValue;
					this.set("Value", mapping);
					callback.call(scope);
					return;
				}
				var processElement = this.get("ProcessElement");
				var schema = processElement.parentSchema;
				Terrasoft.FormulaParserUtils.getFormulaDisplayValue(mappingValue, schema, function(displayValue) {
					mapping.displayValue = displayValue;
					this.set("Value", mapping);
					callback.call(scope);
				}, this);
			},

			/**
			 * On item removed method.
			 * @virtual
			 */
			onItemRemoved: Terrasoft.emptyFn,

			/**
			 * Returns invoker uid of the view model.
			 * @return {String} Invoker uid of the view model.
			 */
			getInvokerUId: function() {
				return this.get("InvokerUId");
			},

			/**
			 * Indicates that lookup columns are compatible by their types.
			 * @private
			 * @param {Terrasoft.manager.EntitySchemaColumn} sourceColumn Source column.
			 * @param {Terrasoft.manager.EntitySchemaColumn} targetColumn Target column.
			 * @return {Boolean} True, if value from source column can be set to the target column. Otherwise, false.
			 */
			getAreCompatibleLookupColumnTypes: function(sourceColumn, targetColumn) {
				var sourceType = sourceColumn.getPropertyValue("dataValueType");
				var targetType = targetColumn.getPropertyValue("dataValueType");
				if ((sourceType === Terrasoft.DataValueType.GUID) && (targetType === Terrasoft.DataValueType.GUID)) {
					return true;
				}
				if (Terrasoft.isLookupDataValueType(sourceType) && (targetType === Terrasoft.DataValueType.GUID)) {
					return true;
				}
				if (Terrasoft.isLookupDataValueType(targetType) && (sourceType === Terrasoft.DataValueType.GUID)) {
					return true;
				}
				if (Terrasoft.isLookupDataValueType(sourceType) && Terrasoft.isLookupDataValueType(targetType)) {
					return sourceColumn.getPropertyValue("referenceSchemaUId") ===
						targetColumn.getPropertyValue("referenceSchemaUId");
				}
				return false;
			},

			/**
			 * Indicates that schema columns are compatible by their types.
			 * @private
			 * @param {Terrasoft.manager.EntitySchemaColumn} sourceColumn Source column.
			 * @param {Terrasoft.manager.EntitySchemaColumn} targetColumn Target column.
			 * @return {Boolean} True, if value from source column can be set to the target column. Otherwise, false.
			 */
			getAreCompatibleColumnTypes: function(sourceColumn, targetColumn) {
				var sourceType = sourceColumn.getPropertyValue("dataValueType");
				var targetType = targetColumn.getPropertyValue("dataValueType");
				if (Terrasoft.utils.dataValueType.isTextDataValueType(sourceType) &&
						Terrasoft.utils.dataValueType.isTextDataValueType(targetType)) {
					return true;
				}
				if (Terrasoft.utils.dataValueType.isDateDataValueType(sourceType) &&
						Terrasoft.utils.dataValueType.isDateDataValueType(targetType)) {
					return true;
				}
				if (Terrasoft.utils.dataValueType.isNumberDataValueType(sourceType) &&
						Terrasoft.utils.dataValueType.isNumberDataValueType(targetType)) {
					return true;
				}
				if (sourceType === Terrasoft.DataValueType.INTEGER &&
						Terrasoft.utils.dataValueType.isNumberDataValueType(targetType)) {
					return true;
				}
				if (Terrasoft.isLookupDataValueType(sourceType) || (sourceType === Terrasoft.DataValueType.GUID)) {
					return this.getAreCompatibleLookupColumnTypes(sourceColumn, targetColumn);
				}
				if (sourceType === targetType) {
					return true;
				}
			},

			/**
			 * Returns the collection of columns, that fit the target column by their types.
			 * @private
			 * @param {Terrasoft.manager.EntitySchemaColumn} targetSchemaColumn Target column.
			 * @param {Terrasoft.Collection} sourceSchemaColumns The collection of source column.
			 * @return {Terrasoft.Collection} Objects with id and caption of columns, that fit target column by their
			 * types.
			 */
			filterSourceSchemaColumns: function(targetSchemaColumn, sourceSchemaColumns) {
				var filteredColumns = Ext.create("Terrasoft.Collection");
				if (sourceSchemaColumns && !sourceSchemaColumns.isEmpty()) {
					sourceSchemaColumns.each(function(sourceSchemaColumn) {
						if (!this.getAreCompatibleColumnTypes(sourceSchemaColumn, targetSchemaColumn)) {
							return;
						}
						var id = sourceSchemaColumn.uId;
						filteredColumns.add(id, {
							id: sourceSchemaColumn.uId,
							caption: sourceSchemaColumn.caption.getValue()
						});
					}, this);
				}
				return filteredColumns;
			},

			/**
			 * Handles 'Delete' menu item click.
			 * @private
			 */
			onDeleteClick: function() {
				this.parentCollection.remove(this);
				var id = this.get("Id");
				this.fireEventArgs("itemRemoved", [id]);
				this.destroy();
			},

			/**
			 * Handles 'Column from this selection' menu items click.
			 * @private
			 * @param {String} columnId Schema column identifier.
			 */
			onSourceColumnMenuItemClick: function(columnId) {
				var sourceColumn = this.findSourceColumn(columnId);
				if (sourceColumn) {
					this.setValueBySourceColumn(sourceColumn);
				}
			},

			/**
			 * Returns source entity schema column by uId.
			 * @private
			 * @param {String} columnId Column unique identifier.
			 * @return {Terrasoft.EntitySchemaColumn/Null}
			 */
			findSourceColumn: function(columnId) {
				var sourceColumns = this.get("SourceColumns");
				if (!sourceColumns) {
					return null;
				}
				return sourceColumns.find(columnId);
			},

			/**
			 * Returns display value for mapping.
			 * @param {Terrasoft.EntitySchemaColumn} sourceColumn Entity schema column.
			 * @return {String}
			 */
			getMappingDisplayValue: function(sourceColumn) {
				if (!sourceColumn) {
					return "";
				}
				var displayValueFormat = resources.localizableStrings.SourceColumnDisplayValueFormat;
				return displayValueFormat.replace("{columnCaption}", sourceColumn.caption || "");
			},

			/**
			 * Clears value, when source schema columns list changed.
			 * @private
			 * @param {Terrasoft.Collection} sourceSchemaColumns Source schema columns.
			 */
			clearValueAfterSourceSchemaColumnsChanged: function(sourceSchemaColumns) {
				var value = this.get("Value");
				if (!value || (value.source !== Terrasoft.ProcessSchemaParameterValueSource.EntityMapping)) {
					return;
				}
				var columnId = value.value;
				if (sourceSchemaColumns && sourceSchemaColumns.find(columnId)) {
					return;
				}
				this.setValueBySourceColumn();
			},

			/**
			 * Sets mapping value based on the source column.
			 * @private
			 * @param {{id: String, caption: String}} [sourceColumn] Source column config.
			 */
			setValueBySourceColumn: function(sourceColumn) {
				var parameterSources = Terrasoft.process.enums.ProcessSchemaParameterValueSource;
				var source = (sourceColumn) ? parameterSources.EntityMapping : parameterSources.None;
				var displayValue = this.getMappingDisplayValue(sourceColumn);
				var columnId = (sourceColumn) ? sourceColumn.id : null;
				var sourceValue = {
					value: columnId,
					displayValue: displayValue,
					source: source,
					metaPath: columnId
				};
				this.setMappingEditValue("Value", sourceValue);
			},

			/**
			 * Generates marker value for current item component.
			 * @private
			 * @param {String} [suffix] Component name suffix.
			 * @return {String}
			 */
			getMarkerValue: function(suffix) {
				var schemaColumn = this.get("SchemaColumn");
				var columnName = (schemaColumn) ? schemaColumn.name : this.get("Caption");
				return "entityColumnMapping" + suffix + "-" + columnName;
			},

			/**
			 * Generates marker value for current item tools button.
			 * @private
			 * @return {String}
			 */
			getToolsButtonContainerMarkerValue: function() {
				return this.getMarkerValue("ToolsButton");
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.core.BaseObject#onDestroy.
			 * @overridden
			 */
			onDestroy: function() {
				var menuItems = this.get("MenuItems");
				if (menuItems) {
					menuItems.destroy();
				}
				var sourceColumns = this.get("SourceColumns");
				if (sourceColumns) {
					sourceColumns.destroy();
				}
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.MenuItemsMappingMixin#getParameterReferenceSchemaUId
			 * @override
			 */
			getParameterReferenceSchemaUId: function() {
				var schemaColumn = this.get("SchemaColumn");
				return schemaColumn ? schemaColumn.referenceSchemaUId : null;
			},
			//endregion

			//region Methods: Public

			/**
			 * Updates source columns.
			 * @param {Terrasoft.Collection} sourceSchemaColumns Source schema columns.
			 */
			updateSourceColumns: function(sourceSchemaColumns) {
				var schemaColumn = this.get("SchemaColumn");
				this.set("DataValueType", schemaColumn.dataValueType);
				this.clearValueAfterSourceSchemaColumnsChanged(sourceSchemaColumns);
				if (!schemaColumn) {
					this.set("SourceColumns", null);
					return;
				}
				var sourceColumns = this.filterSourceSchemaColumns(schemaColumn, sourceSchemaColumns);
				var isSourceColumnsEmpty = sourceColumns.isEmpty();
				this.set("SourceColumns", isSourceColumnsEmpty ? null : sourceColumns);
			}

			//endregion

		});
	}
);


