Terrasoft.configuration.Structures["DashboardGridViewConfig"] = {innerHierarchyStack: ["DashboardGridViewConfig"]};
define("DashboardGridViewConfig", [], function() {
	/**
	 * @class Terrasoft.configuration.DashboardGridViewConfig
	 * Class of view of dashboard grid module.
	 */
	Ext.define("Terrasoft.configuration.DashboardGridViewConfig", {
		extend: "Terrasoft.BaseModel",
		alternateClassName: "Terrasoft.DashboardGridViewConfig",

		/**
		 * Returns collection of grid item view config by grid config.
		 * @protected
		 * @virtual
		 * @param {Object} config Configuration object.
		 * @param {Terrasoft.BaseEntitySchema} config.entitySchema Entity schema.
		 * @param {Object} config.gridConfig Configuration object of columns.
		 * @return {Object[]} Collection of grid item view config by grid config.
		 */
		getColumnsConfig: function(config) {
			var gridConfig = config.gridConfig;
			if (!gridConfig) {
				return null;
			}
			var entitySchema = config.entitySchema;
			var result = [];
			Terrasoft.each(gridConfig.items, function(item) {
				if (item.position.row) {
					item.position.row--;
				}
				var columnConfig = this.getColumnConfig(item, entitySchema);
				result.push(columnConfig);
			}, this);
			return result;
		},

		/**
		 * Returns view configuration of grid item.
		 * @protected
		 * @virtual
		 * @param {Object} gridConfigItem Configuration of grid item.
		 * @param {Terrasoft.BaseEntitySchema} entitySchema Enity schema.
		 * @return {Object} columnConfig Configuration of grid item.
		 */
		getColumnConfig: function(gridConfigItem, entitySchema) {
			var labelClass = [];
			var columnConfig = {};
			var itemType = Terrasoft.ViewItemType.LABEL;
			var column = entitySchema.getColumnByName(gridConfigItem.bindTo);
			var columnDataValueType = gridConfigItem.dataValueType || (column && column.dataValueType);
			if (Terrasoft.isNumberDataValueType(columnDataValueType)) {
				labelClass.push("grid-number");
			}
			if (Terrasoft.isDateDataValueType(columnDataValueType)) {
				labelClass.push("grid-date");
			}
			if (this.isLink(gridConfigItem, entitySchema)) {
				itemType = Terrasoft.ViewItemType.HYPERLINK;
				columnConfig.tag = gridConfigItem.bindTo;
				columnConfig.click = {bindTo: "onLinkClick"};
				columnConfig.target = Terrasoft.controls.HyperlinkEnums.target.SELF;
				columnConfig.linkMouseOver = {bindTo: "linkMouseOver"};
			}
			if (gridConfigItem.type === Terrasoft.GridCellType.TITLE) {
				labelClass.push("grid-header");
			}
			Ext.apply(columnConfig, {
				"name": Terrasoft.Component.generateId(),
				"itemType": itemType,
				"classes": itemType === Terrasoft.ViewItemType.HYPERLINK ?
						{"hyperlinkClass": labelClass} :
						{"labelClass": labelClass},
				"caption": {
					bindTo: gridConfigItem.bindTo,
					bindConfig: {converter: "valueConverter"}
				},
				"layout": gridConfigItem.position
			});
			return columnConfig;
		},

		/**
		 * Gets isLink flag
		 * @private
		 * @param {Object} item Configuration of grid item.
		 * @param {Terrasoft.BaseEntitySchema} entitySchema Enity schema.
		 * @return {Boolean} Return true - if grid item is link, false - otherwise.
		 */
		isLink: function(item, entitySchema) {
			var column = entitySchema.getColumnByName(item.bindTo);
			var linkType = item.type === Terrasoft.GridCellType.LINK;
			if (!column || !column.dataValueType) {
				return false;
			}
			var isLookup = Terrasoft.isLookupDataValueType(column.dataValueType);
			var isLinkedColumn = isLookup && this.isColumnSchemaModule(column);
			var isPrimaryDisplayColumn;
			if (entitySchema.primaryDisplayColumn) {
				var isEntitySchemaModule = Terrasoft.ModuleUtils.getModuleStructureByName(entitySchema.name);
				isPrimaryDisplayColumn = (column.name === entitySchema.primaryDisplayColumn.name) &&
					isEntitySchemaModule;
			}
			return linkType || isLinkedColumn || isPrimaryDisplayColumn;
		},

		/**
		 * Returns if column has schema module.
		 * @private
		 * @param {Object} column Entity schema column.
		 * @return {Boolean} Is column has schema module.
		 */
		isColumnSchemaModule: function(column) {
			if (!column) {
				return false;
			}
			var columnReferenceSchema = column.referenceSchema;
			return columnReferenceSchema &&
				Terrasoft.ModuleUtils.getModuleStructureByName(columnReferenceSchema.name);
		},

		/**
		 * Generates configuration of module grid item.
		 * @protected
		 * @virtual
		 * @param {Object} config Configuration of grid item.
		 * @param {Terrasoft.BaseEntitySchema} config.entitySchema Enity schema.
		 * @param {String} config.style Display style.
		 * @return {Object[]} Configuration of module grid item.
		 */
		generate: function(config) {
			var columnsConfig = this.getColumnsConfig(config) || [];
			var entitySchema = config.entitySchema;
			var primaryColumnName = (entitySchema) ? entitySchema.primaryColumnName : "Id";
			var moduleId = Terrasoft.Component.generateId();
			return {
				"name": "gridContainer" + moduleId,
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {wrapClassName: ["dashboard-grid-container", config.style]},
				"items": [{
					"name": "gridCaptionContainer" + moduleId,
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["default-widget-header", config.style]},
					"items": [{
						"name": "dashboard-grid-caption" + moduleId,
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "caption"},
						"labelClass": "default-widget-header-label"
					}]
				}, {
					"name": "DataGrid" + moduleId,
					"idProperty": primaryColumnName,
					"collection": {"bindTo": "GridData"},
					"classes": {wrapClassName: ["dashboard-grid-list"]},
					"generator": "ContainerListGenerator.generatePartial",
					"itemType": Terrasoft.ViewItemType.GRID,
					"itemConfig": [{
						itemType: Terrasoft.ViewItemType.GRID_LAYOUT,
						name: "itemGridLayout",
						items: columnsConfig
					}]
				}]
			};
		}
	});
	return {};
});


