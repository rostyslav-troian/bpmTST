Terrasoft.configuration.Structures["DashboardGridViewModel"] = {innerHierarchyStack: ["DashboardGridViewModel"]};
define("DashboardGridViewModel", [
	"MaskHelper", "ProcessModuleUtilities", "GridUtilitiesV2", "DetailManager"
], function(MaskHelper, ProcessModuleUtilities) {
	/**
	 * @class Terrasoft.configuration.DashboardGridViewModel
	 * Class of view model of dashboard grid module.
	 */
	Ext.define("Terrasoft.configuration.DashboardGridViewModel", {
		extend: "Terrasoft.BaseViewModel",
		alternateClassName: "Terrasoft.DashboardGridViewModel",

		/**
		 * Ext framework.
		 * @type {Object}.
		 */
		Ext: null,

		/**
		 * Sandbox.
		 * @type {Object}.
		 */
		sandbox: null,

		/**
		 * Terrasoft framework.
		 * @type {Object}.
		 */
		Terrasoft: null,

		/**
		 * List of classes to mix into this class.
		 * @type {Object}.
		 */
		mixins: {
			/**
			 * @class GridUtilities.
			 */
			GridUtilities: "Terrasoft.GridUtilities",

			/**
			 * @class MiniPageUtilities
			 */
			MiniPageUtilitiesMixin: "Terrasoft.MiniPageUtilities"
		},

		/**
		 * List of messages to register into this module.
		 * @type {Object}.
		 */
		messages: {
			/**
			 * @message ProcessExecDataChanged
			 * Notification that the current process item was executed.
			 */
			"ProcessExecDataChanged": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message CallCustomer
			 * Make a call for customer.
			 */
			"CallCustomer": {
				"mode": Terrasoft.MessageMode.PTP,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			}
		},

		/**
		 * Localized resources.
		 * @type {Object}
		 */
		resources: null,

		// region Methods: Private

		/**
		 * @private
		 */
		_getExcludedEntitySchemaNames: function() {
			return ["Dashboard", "OperatorSingleWindow"];
		},

		/**
		 * @private
		 */
		_getEntitySchemaNameByApplicationStructureItemId: function(config, callback, scope) {
			const id = config.applicationStructureItemId.toLowerCase();
			const modules = Ext.Object.getValues(Terrasoft.configuration.ModuleStructure);
			const module = modules.find(function(item) {
				return (item.moduleId && item.moduleId.toLowerCase()) === id;
			}, this);
			if (module) {
				callback.call(scope, module.entitySchemaName);
			} else {
				Terrasoft.DetailManager.initialize(function() {
					const detailManagerItems = Terrasoft.DetailManager.getItems();
					const detailManagerItem = detailManagerItems.firstOrDefault(function(item) {
						return item.getId().toLowerCase() === id;
					}, this);
					if (detailManagerItem) {
						callback.call(scope, detailManagerItem.getEntitySchemaName());
					} else {
						callback.call(scope, null);
					}
				}, this);
			}
		},

		/**
		 * @private
		 */
		_requireSectionEntitySchema: function(callback, scope) {
			const id = this.get("sectionId");
			if (id) {
				this._getEntitySchemaNameByApplicationStructureItemId({applicationStructureItemId: id}, function(entitySchemaName) {
					const excludedEntitySchemaNames = this._getExcludedEntitySchemaNames();
					if (entitySchemaName && !Terrasoft.contains(excludedEntitySchemaNames, entitySchemaName)) {
						this.set("sectionEntitySchemaName", entitySchemaName);
						Terrasoft.require([entitySchemaName], function(entitySchema) {
							Terrasoft[entitySchemaName] = entitySchema;
							callback.call(scope);
						}, this);
					} else {
						callback.call(scope);
					}
				}, this);
			} else {
				callback.call(scope);
			}
		},

		/**
		 * @private
		 */
		_getSectionSchemaBoundColumnPath: function(sectionBindingColumnPath, columnPath) {
			const sectionEntitySchema = Terrasoft[this.get("sectionEntitySchemaName")];
			const columnPathArray = sectionBindingColumnPath.split(".");
			const columnPathTpl = columnPathArray.length > 1 ? "{4}.[{0}:{1}:{2}].{3}" : "[{0}:{1}:{2}].{3}";
			const lastSectionBindingColumnPathElement = columnPathArray.pop();
			return Ext.String.format(columnPathTpl,
				sectionEntitySchema.name,
				sectionEntitySchema.primaryColumnName,
				lastSectionBindingColumnPathElement,
				columnPath,
				columnPathArray.join("."));
		},

		/**
		 * Adds process element column to grid data select.
		 * @private
		 * @param {Object} columns List of grid data columns.
		 */
		addProcessElementColumn: function(columns) {
			if (!columns || columns.ProcessElementId || !this.entitySchema) {
				return;
			}
			const processElementIdColumn = this.entitySchema.getColumnByName("ProcessElementId");
			if (!processElementIdColumn) {
				return;
			}
			columns.ProcessElementId = {
				path: "ProcessElementId",
				dataValueType: Terrasoft.DataValueType.GUID
			};
		},

		/**
		 * Tries to execute process step for entity item.
		 * @private
		 * @param {String} primaryColumnValue Record identifier.
		 * @return {Boolean} Returns true if process step was executed. Else - false.
		 */
		tryExecuteProcessStep: function(primaryColumnValue) {
			const processElementId = this.get("ProcessElementId");
			if (!processElementId) {
				return false;
			}
			return ProcessModuleUtilities.tryShowProcessCard.call(this, processElementId, primaryColumnValue);
		},

		/**
		 * Applies row columns to dashboard view model.
		 * @private
		 * @param {Object} columns View model columns configuration.
		 */
		_applyViewModelColumns: function(columns) {
			if (Terrasoft.isEmptyObject(this.columns)) {
				this.columns = {};
				this.Ext.apply(this.columns, columns);
			}
		},

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc GridUtilitiesV2#getGridDataColumns
		 * @override
		 */
		getGridDataColumns: function() {
			const columns = this.mixins.GridUtilities.getGridDataColumns.apply(this, arguments);
			this.addProcessElementColumn(columns);
			return columns;
		},

		/**
		 * Initializes model by resource object.
		 * @protected
		 * @param {Object} resourcesObj Resource object.
		 */
		initResourcesValues: function(resourcesObj) {
			const resourcesSuffix = "Resources";
			Terrasoft.each(resourcesObj, function(resourceGroup, resourceGroupName) {
				resourceGroupName = resourceGroupName.replace("localizable", "");
				Terrasoft.each(resourceGroup, function(resourceValue, resourceName) {
					const viewModelResourceName = [resourcesSuffix, resourceGroupName, resourceName].join(".");
					this.set(viewModelResourceName, resourceValue);
				}, this);
			}, this);
		},

		/**
		 * Initializes model data.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 */
		init: function(callback, scope) {
			this.initGridData();
			this.mixins.GridUtilities.init.call(this);
			if (this.get("entitySchemaName")) {
				this._requireSectionEntitySchema(function() {
					this.loadGridData();
					Ext.callback(callback, scope);
				}, this);
			}
		},

		/**
		 * Returns section filters.
		 * @protected
		 * @return {Terrasoft.FilterGroup} Filters.
		 */
		getFilters: function() {
			const filters = this.Ext.create("Terrasoft.FilterGroup");
			const filterData = this.get("filterData");
			if (Ext.isString(filterData)) {
				filters.addItem(Terrasoft.deserialize(filterData));
			}
			const sectionBindingColumn = this.get("sectionBindingColumn");
			if (this.get("primaryColumnValue")) {
				filters.addItem(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Id", this.get("primaryColumnValue")));
				if (!Ext.isEmpty(sectionBindingColumn)) {
					this.updateModuleFilter(filters, sectionBindingColumn);
				}
				return filters;
			}
			if (!Ext.isEmpty(this.get("sectionId")) && !Ext.isEmpty(sectionBindingColumn)) {
				const quickFilter = this.sandbox.publish("GetFiltersCollection", null);
				if (quickFilter) {
					const sectionEntitySchema = Terrasoft[this.get("sectionEntitySchemaName")];
					if (!quickFilter.getIsEnabled()) {
						const primaryColumnName = sectionEntitySchema && sectionEntitySchema.primaryColumnName;
						if (primaryColumnName) {
							quickFilter.addItem(Terrasoft.createColumnIsNotNullFilter(primaryColumnName));
						}
					}
					if (!Ext.isEmpty(sectionBindingColumn) && sectionEntitySchema && sectionEntitySchema.name) {
						this.updateModuleFilter(quickFilter, sectionBindingColumn);
					}
					filters.addItem(quickFilter);
				}
			}
			return filters;
		},

		/**
		 * Returns columns from profile.
		 * @protected
		 * @override
		 * @return {Object} Columns from profile.
		 */
		getProfileColumns: function() {
			const profileColumns = {};
			const profile = this.get("gridConfig");
			this.convertProfileColumns(profileColumns, profile);
			return profileColumns;
		},

		/**
		 * Converts columns configuration into profile columns configuration.
		 * @protected
		 * @override
		 * @param {Object} profileColumns Profile columns configuration.
		 * @param {Object} columnsConfig Columns configuration.
		 */
		convertProfileColumns: function(profileColumns, columnsConfig) {
			Terrasoft.each(columnsConfig.items, function(item) {
				const metaPath = item.bindTo;
				if (metaPath && !profileColumns[metaPath]) {
					profileColumns[metaPath] = {
						aggregationType: item.aggregationType,
						caption: item.caption,
						dataValueType: item.dataValueType,
						path: item.path || item.metaPath || metaPath,
						subFilters: Terrasoft.deserialize(item.serializedFilter),
						type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN
					};
				}
			}, this);
		},

		/**
		 * Initializes sorted columns.
		 * @protected
		 * @override
		 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query for sort.
		 */
		initQuerySorting: function(esq) {
			const columnsConfig = this.get("gridConfig");
			Terrasoft.each(columnsConfig.items, function(cell) {
				const columnPath = cell.bindTo;
				if (cell.orderDirection && cell.orderDirection !== "") {
					const sortedColumn = esq.columns.collection.get(columnPath);
					sortedColumn.orderPosition = cell.orderPosition;
					sortedColumn.orderDirection = cell.orderDirection;
				}
			}, this);
			const gridDataColumns = this.getGridDataColumns();
			Terrasoft.each(gridDataColumns, function(column) {
				if (!this.Ext.isEmpty(column.orderPosition)) {
					const sortedColumn = esq.columns.collection.get(column.path);
					sortedColumn.orderPosition = column.orderPosition;
					sortedColumn.orderDirection = column.orderDirection;
				}
			}, this);
		},

		/**
		 * Adds subquery that calculates the number of active access points on the process.
		 * Need for mixin GridUtilities.
		 * @protected
		 */
		addProcessEntryPointColumn: Terrasoft.emptyFn,

		/**
		 * Adds handler method for link click event.
		 * @protected
		 * @override
		 * @param {Terrasoft.BaseViewModel} item Grid item view model.
		 * @param {Object} column Grid item column.
		 */
		addColumnLink: Terrasoft.emptyFn,

		/**
		 * Handler method for link click. Execute in grid item view model context.
		 * @protected
		 * @param {Object} target Dom-element.
		 * @param {String} columnPath Column name.
		 * @return {Boolean} Return true - if click is processed, false - otherwise.
		 */
		onLinkClick: function(target, columnPath) {
			if (this.isDesigned) {
				return false;
			}
			let entitySchemaName;
			let columnName;
			let columnValue;
			const column = this.getColumnByName(columnPath);
			if (column.isLookup) {
				entitySchemaName = column.referenceSchemaName;
				columnName = this.get(columnPath);
				columnValue = columnName.value;
				if (!columnValue) {
					return false;
				}
			} else if (column.columnPath === this.primaryDisplayColumnName) {
				entitySchemaName = this.entitySchema.name;
				columnName = this.primaryColumnName;
				columnValue = this.get(columnName);
				if (this.tryExecuteProcessStep(columnValue)) {
					return false;
				}
			}
			const entitySchemaConfig = Terrasoft.ModuleUtils.getModuleStructureByName(entitySchemaName);
			if (entitySchemaConfig) {
				let cardSchema = entitySchemaConfig.cardSchema;
				if (entitySchemaConfig.attribute) {
					const typeId = this.get(columnPath + "." + entitySchemaConfig.attribute) ||
						this.get(entitySchemaConfig.attribute);
					Terrasoft.each(entitySchemaConfig.pages, function(item) {
						if (typeId && item.UId === typeId.value && item.cardSchema) {
							cardSchema = item.cardSchema;
						}
					}, this);
				}
				MaskHelper.ShowBodyMask();
				const cardModule = entitySchemaConfig.cardModule || Terrasoft.ModuleUtils.getDefaultCardModule();
				const hash = Terrasoft.combinePath(cardModule, cardSchema, "edit", columnValue);
				this.sandbox.publish("PushHistoryState", {hash: hash});
			}
			return false;
		},

		/**
		 * Returns count of loaded rows.
		 * @protected
		 * @override
		 * @return {Number} Count of loaded rows.
		 */
		getRowCount: function() {
			return this.get("rowCount");
		},

		/**
		 * Prepares data collection before load to grid.
		 * @protected
		 * @override
		 * @param {Terrasoft.Collection} collection Grid items collection.
		 */
		prepareResponseCollection: function(collection) {
			this.mixins.GridUtilities.prepareResponseCollection.apply(this, arguments);
			if (collection && collection.getCount() > 0) {
				const firstItem = collection.first();
				this._applyViewModelColumns(firstItem.columns);
			}
			collection.each(function(item) {
				item.executionScope = this;
				item.sandbox = this.sandbox;
				item.valueConverter = this.valueConverter;
				item.onLinkClick = this.onLinkClick;
				item.tryExecuteProcessStep = this.tryExecuteProcessStep;
				Ext.apply(item, this.mixins.MiniPageUtilitiesMixin);
				item.isDesigned = this.get("isDesigned");
			}, this);
		},

		/**
		 * Converts value to string.
		 * @protected
		 * @param {Object|String|Number} value Value
		 * @param {Terrasoft.DataValueType} dataValueType Data type.
		 * @param {Object} column Value column to get precision.
		 * @return {String} Stringified value.
		 */
		valueConverter: function(value, dataValueType, column) {
			const precision = column && column.precision;
			const config = precision ? {
				decimalPrecision: precision
			} : {};
			return Terrasoft.getTypedStringValue(value, dataValueType, config);
		},

		/**
		 * Returns collection of grid items.
		 * @protected
		 * @return {Terrasoft.Collection} Collection of grid items.
		 */
		getGridData: function() {
			return this.get("GridData");
		},

		/**
		 * Initialize collection of grid items.
		 * @protected
		 */
		initGridData: function() {
			this.set("IsPageable", false);
			this.set("IsGridEmpty", false);
			this.set("isLoading", false);
			this.set("GridData", this.Ext.create("Terrasoft.BaseViewModelCollection"));
		},

		/**
		 * Does actions that required after page had been rendered.
		 * @protected
		 */
		onRender: Ext.emptyFn,

		/**
		 * Updates module filters by module configuration.
		 * @protected
		 * @param {Terrasoft.FilterGroup} quickFilter Filter.
		 * @param {Terrasoft.BaseExpression} quickFilter.leftExpression Left part of the filter.
		 * @param {String} sectionBindingColumnPath Column connection with section.
		 */
		updateModuleFilter: function(quickFilter, sectionBindingColumnPath) {
			const leftExpression = quickFilter.leftExpression;
			if (!Ext.isEmpty(leftExpression)) {
				if (leftExpression.columnPath) {
					leftExpression.columnPath = this._getSectionSchemaBoundColumnPath(
						sectionBindingColumnPath, leftExpression.columnPath);
				}
				const leftExpressionFunctionArgument = leftExpression.functionArgument;
				if (leftExpression.expressionType ===
					Terrasoft.ExpressionType.FUNCTION && leftExpressionFunctionArgument) {
						leftExpressionFunctionArgument.columnPath = this._getSectionSchemaBoundColumnPath(
							sectionBindingColumnPath, leftExpressionFunctionArgument.columnPath);
				}
			} else {
				quickFilter.each(function(item) {
					this.updateModuleFilter(item, sectionBindingColumnPath);
				}, this);
			}
		},

		// endregion

		// region Methods: Public

		/**
		 * @inheritDoc Terrasoft.BaseViewModel#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initResourcesValues(this.resources);
		}

		// endregion

	});
	return {};
});


