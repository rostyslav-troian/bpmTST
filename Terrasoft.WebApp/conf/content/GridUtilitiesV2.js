Terrasoft.configuration.Structures["GridUtilitiesV2"] = {innerHierarchyStack: ["GridUtilitiesV2"]};
define("GridUtilitiesV2", [
	"GridUtilitiesV2Resources", "DataUtilities", "RightUtilities",
	"ConfigurationConstants", "ConfigurationEnums", "LookupUtilities", "LinkColumnHelper", "BusinessRulesApplierV2",
	"performancecountermanager", "DefaultProfileHelper", "MaskHelper", "BaseGridRowViewModel", "ColumnUtilities",
	"QueryCancellationMixin"
], function(resources, DataUtilities, RightUtilities, ConfigurationConstants, ConfigurationEnums, LookupUtilities,
		LinkColumnHelper, BusinessRulesApplier, performanceManager, DefaultProfileHelper) {

	/**
	 * Mixin for grid utilities.
	 */
	Ext.define("Terrasoft.configuration.mixins.GridUtilities", {
		alternateClassName: "Terrasoft.GridUtilities",

		mixins: {
			QueryCancellationMixin: "Terrasoft.QueryCancellationMixin",
			RelatedEntityColumnsMixin: "Terrasoft.RelatedEntityColumns"
		},

		/**
		 * Folder column name.
		 * @private
		 * @type {String}
		 */
		folderColumnName: "Folder",

		/**
		 * Folder column type name.
		 * @private
		 * @type {String}
		 */
		folderTypeColumnName: "FolderType",

		/**
		 * ####### ######## ####### ######## ##### # #########.
		 * @private
		 * @type {String}
		 */
		folderTypeSchemaSuffix: "InFolder",

		/**
		 * ######## ###### ####### ###### #####.
		 * @protected
		 * @type {String}
		 */
		queryClassName: "Terrasoft.EntitySchemaQuery",

		/**
		 * Section records count column name.
		 * @protected
		 * @type {String}
		 */
		sectionRecordsCountColumnName: "SectionRecordsCount",

		/**
		 * Id ####### ######## ##### ####### ###### afterFiltersUpdated.
		 * @protected
		 * @type {String}
		 */
		filtersUpdateTimeoutId: null,

		/**
		 * ######## ##### ###########.
		 * ########## ###########, ####### ###### ###### ##### #### ### ######## ######### # ######### #######
		 * # ####### ###### afterFiltersUpdated.
		 * @type {Number}
		 */
		filtersUpdateDelay: 0,

		/**
		 * ########### ######## ######### ####### ######### ######.
		 * @private
		 * @type {GUID}
		 */
		cachedActiveRow: null,

		/**
		 * Array of not found column paths.
		 * @protected
		 * @type {String[]}
		 */
		notFoundColumns: null,

		/**
		 * Right utilities instance.
		 * @private
		 * @type {Terrasoft.RightUtilities}
		 */
		rightUtilitiesInstance: null,

		/**
		 * Type of operation with data
		 * @type {Terrasoft.QueryOperationType}
		 */
		queryOperationType: Terrasoft.QueryOperationType.SELECT,

		/**
		 * ############## ########## ###### # #######.
		 */
		onAfterReRender: function() {
			if (this.getUseCachedActiveRow() && !this.get("MultiSelect")) {
				const gridData = this.getGridData();
				if (gridData && gridData.contains(this.cachedActiveRow)) {
					this.set("ActiveRow", this.cachedActiveRow);
				}
			}
		},

		/**
		 * Get query operation type.
		 * @protected
		 * @return {String} Query class.
		 */
		getEsqOperationType: function () {
			return Terrasoft.Features.getIsEnabled("UseSeparatedSelectMethods")
				? this.queryOperationType
				: Terrasoft.QueryOperationType.SELECT;
		},

		/**
		 * Subscribe messages.
		 * @protected
		 * @virtual
		 */
		init: function() {
			const gridData = this.getGridData();
			gridData.on("dataLoaded", this.onGridLoaded, this);
			this.registerMultiDeleteMessages();
		},

		/**
		 * ####### ######## ## ####### ######### GridData.
		 */
		destroy: function() {
			const gridData = this.getGridData();
			if (gridData) {
				gridData.un("dataLoaded", this.onGridLoaded, this);
				gridData.un("clear", this.onGridClear, this);
				gridData.un("afterrerender", this.onAfterReRender, this);
			}
			this.un("change:ActiveRow", this.onActiveRowChange, this);
			this.callParent(arguments);
		},

		/**
		 * Returns grid entity schema.
		 * @public
		 * @return {Terrasoft.EntitySchema} Grid entity schema.
		 */
		getGridEntitySchema: function() {
			return this.entitySchema;
		},

		/**
		 * Returns name of grid entity schema.
		 * @public
		 * @return {String} Name of grid entity schema.
		 */
		getGridEntitySchemaName: function() {
			const entitySchema = this.getGridEntitySchema();
			return entitySchema && entitySchema.name;
		},

		/**
		 * ############# ###### (###### ########) # ###### ######### ############ ####### #######.
		 * @protected
		 */
		onGridLoaded: function() {
			if (this.get("GridSettingsChanged")) {
				this.reloadGridColumnsConfig(false);
				this.set("GridSettingsChanged", false);
			}
		},

		/**
		 * ####### ######### # ####### ### ####### ######### GridData.
		 */
		onGridClear: function() {
			this.deselectRows();
		},

		/**
		 * ######## ## ####### ####### ##### ########## ###### Render.
		 */
		subscribeGridEvents: function() {
			const gridData = this.getGridData();
			gridData.on("clear", this.onGridClear, this);
			this.on("change:ActiveRow", this.onActiveRowChange, this);
			const grid = this.getCurrentGrid();
			if (grid) {
				grid.on("afterrerender", this.onAfterReRender, this);
			}
		},

		/**
		 * ####### ## ######### ######## ActiveRow.
		 */
		onActiveRowChange: function() {
			if (!this.disableCachedActiveRow) {
				this.cachedActiveRow = this.get("ActiveRow") || this.cachedActiveRow;
			}
		},

		/**
		 * Loads grid data view.
		 */
		loadGridData: function() {
			const performanceManagerLabel = this.sandbox.id + "_loadGridData";
			performanceManager.start(performanceManagerLabel);
			this.beforeLoadGridData();
			const esq = this.getGridDataInitializedEsq();
			this.initQueryEvents(esq);
			esq.getEntityCollection(function(response) {
				this.destroyQueryEvents(esq);
				performanceManager.stop(performanceManagerLabel);
				this.updateLoadedGridData(response, this.onGridDataLoaded, this);
				this.checkNotFoundColumns(response);
			}, this);
			const key = "loadGridData";
			this.registerSentQuery(key, esq);
		},

		/**
		 * Gets initialized entity schema query of the grid data.
		 * @param {Boolean} [isReportEsq = false] If true initialize esq without custom parameters.
		 * @return {Terrasoft.data.queries.EntitySchemaQuery} Initialized entity schema query.
		 */
		getGridDataInitializedEsq: function(isReportEsq) {
			const esq = this.getGridDataESQ();
			if (isReportEsq) {
				this.addReportDataColumns(esq);
			} else {
				this.initQueryColumns(esq);
			}
			this.initQuerySorting(esq);
			this.initQueryFilters(esq);
			if (!isReportEsq) {
				this.initQueryOptions(esq);
			}
			return esq;
		},

		/**
		 * Adds columns to report esq from profile.
		 * If profile is empty adds primary display column.
		 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq Report entity schema query.
		 */
		addReportDataColumns: function(esq) {
			this.addProfileColumns(esq);
			if (!esq.columns.isEmpty()) {
				return;
			}
			const entitySchema = this.getGridEntitySchema();
			const primaryDisplayColumnName = entitySchema && entitySchema.primaryDisplayColumnName;
			if (primaryDisplayColumnName) {
				esq.addColumn(primaryDisplayColumnName);
			}
		},

		/**
		 * Registers sent queries in a module-wide object by their keys.
		 * Cancels previously sent query with the same key.
		 * @protected
		 * @param {String} key A string to uniquely identify the query.
		 * @param {Terrasoft.BaseQuery} esq A Query to be registered.
		 **/
		registerSentQuery: function(key, esq) {
			this.mixins.QueryCancellationMixin.registerSentQuery.call(this, key, esq);
		},

		/**
		 * Updates profile columns captions
		 * @protected
		 * @param {Object} response Server response.
		 * @param {Object} response.collection Response settings object.
		 * @param {Object} response.collection.rowConfig Columns configuration object.
		 */
		checkNotFoundColumns: function(response) {
			const rowConfig = response.collection && response.collection.rowConfig;
			this.notFoundColumns = this.Terrasoft.ColumnUtilities.findNotFoundColumns(rowConfig);
		},

		/**
		 * Returns use cached active row
		 * @private
		 * @return {Boolean}
		 */
		getUseCachedActiveRow: function() {
			return !this.disableCachedActiveRow && this.Ext.isDefined(this.cachedActiveRow);
		},

		/**
		 * Add command for include records over service
		 * @param commandChain
		 * @param folderName
		 * @private
		 */
		_addServiceCommands: function(commandChain, folderName) {
			commandChain.push(
				function(next, foldersIds) {
					const selectedRecordsConfig = this.getSelectedRecordsConfig();
					const entitySchema = this.getGridEntitySchema();
					const filtersConfig = this._getSelectedRecordsFilter(entitySchema, selectedRecordsConfig);
					const callback = function(response) {
						this._processIncludeInFoldersBatchResponse(response, folderName, response.rowsAffected, next);
					};
					this.callService({
						"serviceName": "FolderManagerService",
						"methodName": "IncludeEntitiesInFolder",
						"data": {
							"sourceSchemaName": this.getGridEntitySchemaName(),
							"destinationSchemaName": this.getInFolderEntityName(),
							"folderId": foldersIds[0],
							"filtersConfig": filtersConfig,
							"entityColumnNameInFolderEntity": this.getEntityColumnNameInFolderEntity()
						}
					}, callback, this);
				});
		},

		_getSelectedRecordsFilter: function(entitySchema, selectedRecordsConfig) {
			let filtersConfig = selectedRecordsConfig.filtersConfig;
			if (filtersConfig) {
				return filtersConfig;
			}
			const filters = this.getFilters();
			const inFilter = this.Terrasoft.createColumnInFilterWithParameters(
				entitySchema.primaryColumnName, selectedRecordsConfig.selectedItems);
			filters.addItem(inFilter);
			filtersConfig = filters.serialize(filters.getDefSerializationInfo());
			return filtersConfig;
		},

		/**
		 * Add command for include records
		 * @param commandChain
		 * @param folderName
		 * @private
		 */
		_addClientCommands: function(commandChain, folderName) {
			commandChain.push(
				function(next, folders) {
					this.getIncludeInFolderRecords(function(records) {
						next(folders, records);
					}, this);
				});
			commandChain.push(
				function(next, folders, records) {
					this.getNotExistingsRecordsInFolders(folders, records, next, this);
				});
			commandChain.push(
				function(next, notExistingRecords) {
					const bq = this._getNotExistingRecordsBatch(notExistingRecords);
					next(bq);
				});
			commandChain.push(
				function(next, batchQuery) {
					if (Ext.isEmpty(batchQuery.queries)) {
						this.showIncludedFoldersMessage(folderName);
						next();
					} else {
						const batchQueriesCount = batchQuery.queries.length;
						batchQuery.execute(function(response) {
							this._processIncludeInFoldersBatchResponse(response, folderName, batchQueriesCount, next);
						}, this);
					}
				});
		},

		/**
		 * Returns instance of BusinessRulesApplier class.
		 * @private
		 * @return {Terrasoft.BusinessRulesApplier} Instance of BusinessRulesApplier.
		 */
		getBusinessRulesApplier: function() {
			return this.Ext.create("Terrasoft.BusinessRulesApplier");
		},

		/**
		 * Initializes ViewModel instance by query result.
		 * @param {Object} config Object with configuration settings.
		 * @param {Object} config.rawData Column values.
		 * @param {Object} config.rowConfig Column types.
		 * @param {Object} config.viewModel View model.
		 */
		createViewModel: function(config) {
			const gridRowViewModelClassName = this.getGridRowViewModelClassName(config);
			const gridRowViewModelConfig = this.getGridRowViewModelConfig(config);
			const viewModel = this.Ext.create(gridRowViewModelClassName, gridRowViewModelConfig);
			if (this.getIsEditable()) {
				const isGridEnabled = this.get("IsEnabled");
				if (!Ext.isEmpty(isGridEnabled)) {
					viewModel.set("IsModelItemsEnabled", isGridEnabled);
				}
				const businessRulesApplier = this.getBusinessRulesApplier();
				businessRulesApplier.applyDependencies(viewModel);
			}
			config.viewModel = viewModel;
			return viewModel;
		},

		/**
		 * ####### ######### ###### Terrasoft.EntitySchemaQuery.
		 * ############## ### ########## rootSchema, rowViewModelClassName.
		 * @private
		 * @return {Terrasoft.data.queries.EntitySchemaQuery} ########## ######### ###### Terrasoft.EntitySchemaQuery
		 */
		getGridDataESQ: function() {
			return this.Ext.create(this.queryClassName, {
				rootSchema: this.getGridEntitySchema(),
				rowViewModelClassName: this.getGridRowViewModelClassName(),
				operationType: this.getEsqOperationType()
			});
		},

		/**
		 * ############ ######### ###### ## #### ######, ### ######### # ######.
		 * @protected
		 * @virtual
		 * @param {String} primaryColumnValue ########## ############# ######.
		 * @param {Function} [callback] ####### ######### ######.
		 * @param {Object} [scope] ######## ###### ####### ######### ######.
		 */
		loadGridDataRecord: function(primaryColumnValue, callback, scope) {
			let performanceManagerLabel = "loadGridDataRecord";
			if (scope && scope.hasOwnProperty("sandbox")) {
				performanceManagerLabel = scope.sandbox.id + "_" + performanceManagerLabel;
			} else if (this && this.hasOwnProperty("sandbox")) {
				performanceManagerLabel = this.sandbox.id + "_" + performanceManagerLabel;
			}
			performanceManager.start(performanceManagerLabel);
			const esq = this.getGridDataESQ();
			this.initQueryColumns(esq);
			this.initQueryEvents(esq);
			const gridData = this.getGridData();
			if (gridData.contains(primaryColumnValue)) {
				const activeRow = gridData.get(primaryColumnValue);
				esq.getEntity(primaryColumnValue, function(response) {
					this.destroyQueryEvents(esq);
					if (!response.success) {
						performanceManager.stop(performanceManagerLabel);
						return;
					}
					const entity = response.entity;
					const activeRowColumns = activeRow.columns;
					Terrasoft.each(entity.columns, function(column, columnName) {
						if (activeRowColumns.hasOwnProperty(columnName)) {
							this.setGridRowValueFromEntity(activeRow, entity, columnName);
						}
					}, this);
					if (this.Ext.isFunction(callback)) {
						performanceManager.stop(performanceManagerLabel);
						callback.call(scope || this);
					}
					this.onDataChanged();
				}, this);
				performanceManager.stop(performanceManagerLabel);
			} else {
				this.beforeLoadGridDataRecord();
				esq.enablePrimaryColumnFilter(primaryColumnValue);
				esq.getEntityCollection(function(response) {
					this.destroyQueryEvents(esq);
					this.afterLoadGridDataRecord();
					if (!response.success) {
						performanceManager.stop(performanceManagerLabel);
						return;
					}
					const responseCollection = response.collection;
					this.prepareResponseCollection(responseCollection);
					this.initIsGridEmpty(responseCollection);
					this.addItemsToGridData(responseCollection, this.getAddRowsOptions());
					if (this.get("IsGridDataLoaded") !== true || this.get("IsGridLoading") === true) {
						this.set("PreloadedGridDataRecords", responseCollection.getKeys());
					}
					this.afterLoadGridDataUserFunction(primaryColumnValue);
					this.onDataChanged();
					if (this.Ext.isFunction(callback)) {
						performanceManager.stop(performanceManagerLabel);
						callback.call(scope || this);
					}
					performanceManager.stop(performanceManagerLabel);
				}, this);
				performanceManager.stop(performanceManagerLabel);
			}
		},

		/**
		 * Set value to grid row from loaded entity.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} row - grid row.
		 * @param {Terrasoft.BaseViewModel} entity - loaded entity.
		 * @param {String} columnName - column name.
		 */
		setGridRowValueFromEntity: function(row, entity, columnName) {
			row.set(columnName, entity.get(columnName));
		},

		/**
		 * ############## ###### ############# ##### ######### ######.
		 * @protected
		 * @virtual
		 */
		beforeLoadGridData: function() {
			if (this.get("IsGridDataLoaded") === true) {
				this.set("PreloadedGridDataRecords", []);
			}
			this.set("IsGridDataLoaded", false);
			this.set("IsGridLoading", true);
			this.set("IsGridEmpty", false);
		},

		/**
		 * ############## ###### ############# ##### ######## ######.
		 * @protected
		 * @virtual
		 */
		afterLoadGridData: function() {
			this.set("IsGridLoading", false);
			this.set("IsGridDataLoaded", true);
			this.onDataChanged();
		},

		/**
		 * ##### ########## ##### ############## ###### ## #### ######, ### ########### # ######.
		 * @protected
		 * @virtual
		 */
		beforeLoadGridDataRecord: this.Terrasoft.emptyFn,

		/**
		 * ##### ########## ##### ############# ###### ## #### ######, ### ########## # ######.
		 * @protected
		 * @virtual
		 */
		afterLoadGridDataRecord: this.Terrasoft.emptyFn,

		/**
		 * ######### ######### ################ ######## ##### ######## ######.
		 * @protected
		 * @virtual
		 */
		afterLoadGridDataUserFunction: this.Terrasoft.emptyFn,

		/**
		 * ######### ######## ### ##### ########## ###### ######.
		 * @protected
		 * @virtual
		 */
		onDataChanged: this.Terrasoft.emptyFn,

		/**
		 * ######### ########## ######## CanLoadMoreData, ####### ######### ###### ####### (########## ###
		 * ########## ##############).
		 * @protected
		 * @virtual
		 * @param {Terrasoft.BaseViewModelCollection} responseCollection
		 */
		initCanLoadMoreData: function(responseCollection) {
			const collectionCount = responseCollection.getCount();
			const offsetFetchPaging = this.Terrasoft.useOffsetFetchPaging;
			const rowCount = this.getRowCount();
			const canLoadMoreData = offsetFetchPaging ? collectionCount >= rowCount : collectionCount > rowCount;
			this.set("CanLoadMoreData", canLoadMoreData);
			if (canLoadMoreData && !offsetFetchPaging) {
				responseCollection.removeByIndex(collectionCount - 1);
			}
			if (collectionCount) {
				this.set("LastRecord", responseCollection.getByIndex(collectionCount - 1));
			}
		},

		/**
		 * ######### ########## ######## IsGridEmpty.
		 * @protected
		 * @virtual
		 */
		initIsGridEmpty: function(responseCollection) {
			const gridData = this.getGridData();
			const isGridEmpty = (responseCollection.isEmpty() && gridData.isEmpty());
			this.set("IsGridEmpty", isGridEmpty);
			if (isGridEmpty) {
				this.set("LastRecord", null);
			}
		},

		/**
		 * ####### ######## ######, ########### ##### ###### ########## ######.
		 * @protected
		 * @virtual
		 */
		onGridDataLoaded: function(response) {
			const dataCollection = response.collection || Ext.create("Terrasoft.Collection");
			const preloadRowKeys = this.get("PreloadedGridDataRecords") || [];
			const gridData = this.getGridData();
			const preloadGridData = gridData.filter(function(item, key) {
				return preloadRowKeys.indexOf(key) >= 0;
			});
			const isClearGridData = this.get("IsClearGridData");
			if (isClearGridData) {
				if (!gridData.isEmpty() && (response.success || preloadGridData.isEmpty())) {
					gridData.clear();
				}
				this.set("IsClearGridData", false);
			}
			const performanceManagerLabel = this.sandbox.id + "_onGridDataLoaded";
			performanceManager.start(performanceManagerLabel);
			this.afterLoadGridData();
			const isContinueExecution = this.Terrasoft.findValueByPath(response, "errorInfo.response.timedout") &&
					this.getIsFeatureEnabled("UseQueryOptimize") && this.isNotEmpty(this.$CurrentFolder);
			if (!response.success && !isContinueExecution) {
				performanceManager.stop(performanceManagerLabel);
				return;
			}
			this.initCanLoadMoreData(dataCollection);
			this.prepareResponseCollection(dataCollection);
			this.initIsGridEmpty(dataCollection);
			this.addItemsToGridData(dataCollection);
			this.addSelectedRecords(dataCollection);
			this._setRecordsCount(dataCollection);
			if (!preloadGridData.isEmpty()) {
				this.addItemsToGridData(preloadGridData, this.getAddRowsOptions());
				this.addSelectedRecords(preloadGridData);
			}
			this.onDataChanged();
			performanceManager.stop(performanceManagerLabel);
		},

		/**
		 * Sets section record count value.
		 * @param {Terrasoft.core.collections.Collection} dataCollection Grid data.
		 * @private
		 */
		_setRecordsCount: function(dataCollection) {
			const dataItem = dataCollection.first();
			const count = (dataItem && dataItem.get(this.sectionRecordsCountColumnName)) || 0;
			this.set("RecordsCount", count);
		},

		/**
		 * ########## ######### ########## ####### # ######.
		 * @protected
		 * @virtual
		 * @return {Object} ######### ##########
		 */
		getAddRowsOptions: function() {
			return {mode: "top"};
		},

		/**
		 * ######### ######### ##### ######### # ######### #######.
		 * @protected
		 * @virtual
		 * @param {Object} dataCollection ######### ##### #########.
		 * @param {Object} options ######### ##########.
		 */
		addItemsToGridData: function(dataCollection, options) {
			const gridData = this.getGridData();
			dataCollection = this.clearLoadedRecords(dataCollection);
			if (this.getIsCurrentGridRendered() || !options || options.mode !== "top") {
				gridData.loadAll(dataCollection, options);
			} else {
				dataCollection.eachKey(function(key, item) {
					gridData.insert(0, key, item);
				});
			}
		},

		/**
		 * ########## ##### ######### ####### ######### ## ############# # ####### ####### ############ #########.
		 * @protected
		 * @virtual
		 * @param {Object} dataCollection ########### ######### #######.
		 * @return {Object} ##### ############### ######### #######.
		 */
		clearLoadedRecords: function(dataCollection) {
			const keys = this.getGridData().getKeys() || [];
			const filteredCollection = dataCollection.filter(function(item, key) {
				return keys.indexOf(key) < 0;
			});
			//TODO Delete condition after task CRM-37388 done.
			if (filteredCollection.isEmpty()) {
				this.initCanLoadMoreData(filteredCollection);
			}
			return filteredCollection;
		},

		/**
		 * ########## ########## ########### ##### ### ####### ############# #######.
		 * @return {Number} ########## ########### ##### ####### ### ####### #############.
		 */
		getRowCount: function() {
			let profile = this.get("Profile");
			const propertyName = this.getDataGridName();
			profile = propertyName ? profile[propertyName] : profile;
			if (profile && profile.isTiled !== undefined) {
				return profile.isTiled ? this.get("RowCount") : 2 * this.get("RowCount");
			}
			return this.get("RowCount");
		},

		/**
		 * Initializes options of the query.
		 * @protected
		 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq A query to initialize.
		 */
		initQueryOptions: function(esq) {
			const rowCount = this.getRowCount();
			if (rowCount) {
				esq.rowCount = rowCount;
				if (!Terrasoft.useOffsetFetchPaging) {
					esq.rowCount++;
				}
			}
			const isPageable = this.get("IsPageable");
			if (isPageable) {
				this.initPageableQueryOption(esq);
			}
			//TODO ########### ######### ############# ########## #######
			//const isHierarchical = this.get("IsHierarchical");
			//if (isHierarchical) {
			//
			//}
		},

		/**
		 * @private
		 */
		_initPrimaryConditionValue: function(lastRecord, esq) {
			const columns = lastRecord.columns;
			const primaryColumnName = lastRecord.primaryColumnName;
			if (esq.conditionalValues && !esq.conditionalValues.contains(primaryColumnName)) {
				const primaryColumnValue = lastRecord.get(primaryColumnName);
				const primaryColumnType = columns[primaryColumnName].dataValueType;
				esq.conditionalValues.setParameterValue(primaryColumnName, primaryColumnValue, primaryColumnType);
			}
		},

		/**
		 * @private
		 */
		_initOrderColumnConditionValue: function(lastRecord, esq) {
			const columns = lastRecord.columns;
			esq.columns.each(function(column) {
				if (this.Terrasoft.OrderDirection.ASC === column.orderDirection ||
					this.Terrasoft.OrderDirection.DESC === column.orderDirection) {
					const columnName = column.columnPath;
					const columnKey = _.findKey(columns, {columnPath: column.columnPath});
					let columnValue = lastRecord.get(columnName) || lastRecord.get(columnKey);
					const lastRecordColumn = columns[columnName] || columns[columnKey];
					let columnType = lastRecordColumn && lastRecordColumn.dataValueType;
					if (columnType === Terrasoft.DataValueType.LOOKUP) {
						columnValue = columnValue.displayValue;
						columnType = Terrasoft.DataValueType.TEXT;
					}
					esq.conditionalValues.setParameterValue(columnName, columnValue, columnType);
				}
			}, this);
		},

		/**
		 * @private
		 */
		_initPageableConditionValues: function(esq) {
			const gridData = this.getGridData();
			const lastRecord = this.get("LastRecord") || gridData.last();
			esq.conditionalValues = this.Ext.create("Terrasoft.ColumnValues");
			this._initOrderColumnConditionValue(lastRecord, esq);
			this._initPrimaryConditionValue(lastRecord, esq);
		},

		/**
		 * Initializes pageability of the query instance.
		 * @protected
		 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq The query instance to initialize.
		 */
		initPageableQueryOption: function(esq) {
			const gridData = this.getGridData();
			const recordsCount = gridData.getCount();
			const isClearGridData = this.get("IsClearGridData");
			esq.isPageable = true;
			if (Terrasoft.useOffsetFetchPaging) {
				esq.rowsOffset = isClearGridData ? 0 : recordsCount;
				return;
			}
			if (recordsCount && !isClearGridData) {
				this._initPageableConditionValues(esq);
			}
		},

		/**
		 * Initializes columns of the query instance.
		 * @protected
		 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq The query in which columns will be initialized.
		 */
		initQueryColumns: function(esq) {
			this.addGridDataColumns(esq);
			this.addProfileColumns(esq);
			this.addTypeColumns(esq);
			this.addProcessEntryPointColumn(esq);
			if (this.getIsEditable()) {
				this.addAllColumns(esq);
				this.mixins.RelatedEntityColumnsMixin.addRelatedEsqColumns.call(this, esq, this.columns);
			}
		},

		/**
		 * Adds count over column to query.
		 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq Entity schema query.
		 * @protected
		 */
		addCountOverColumn: function(esq) {
			const functionConfig = {
				functionType: Terrasoft.FunctionType.AGGREGATION,
				columnPath: "Id",
				aggregationType: Terrasoft.AggregationType.COUNT
			};
			esq.addWindowFunctionColumn(functionConfig, null, null, this.sectionRecordsCountColumnName);
		},

		/**
		 * Checks whether the column is a link.
		 * @param {Object} entitySchema Object of the schema.
		 * @param {Object} column Column.
		 * @return {Boolean} A mark is whether the column is a reference.
		 */
		getIsLinkColumn: function(entitySchema, column) {
			if (entitySchema.primaryDisplayColumnName === column.columnPath) {
				return true;
			}
			if (column.isLookup || column.referenceSchemaName) {
				const entitySchemaColumn = entitySchema.getColumnByName(column.columnPath);
				const referenceSchemaName = !this.Ext.isEmpty(entitySchemaColumn)
						? entitySchemaColumn.referenceSchemaName
						: column.referenceSchemaName;
				const moduleStructure = this.getModuleStructure(referenceSchemaName);
				if (moduleStructure) {
					return true;
				}
			}
			return LinkColumnHelper.getIsLinkColumn(entitySchema.name, column.columnPath);
		},

		/**
		 * Add's all columns into entity schema query instance {@link Terrasoft.EntitySchemaQuery}.
		 * @protected
		 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq Entity schema query in which we will add all column.
		 */
		addAllColumns: function(esq) {
			Terrasoft.each(this.columns, function(column, columnName) {
				if (column.type === Terrasoft.ViewModelColumnType.ENTITY_COLUMN) {
					if (!esq.columns.contains(columnName)) {
						esq.addColumn(columnName);
					}
				}
			}, esq);
		},

		/**
		 * Add's default columns into entity schema query instance {@link Terrasoft.EntitySchemaQuery}.
		 * @protected
		 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq Entity schema query in which we will add default column.
		 */
		addGridDataColumns: function(esq) {
			const gridDataColumns = this.getGridDataColumns();
			Terrasoft.each(gridDataColumns, function(column, columnName) {
				if (!esq.columns.contains(columnName)) {
					esq.addColumn(columnName);
				}
			}, this);
		},

		/**
		 * Returns column config for {@link Terrasoft.EntitySchemaQuery}.
		 * @protected
		 * @param {Object} column Column, the configuration of which we create.
		 * @return {Object} Object which contains column path and column caption.
		 */
		getColumnConfig: function(column) {
			const columnConfig = {
				columnPath: this._clearColumnPathSuffix(column.path),
				caption: column.caption || ""
			};
			return columnConfig;
		},

		/**
		 * Gets column path without suffix.
		 * @private
		 * @param {String} columnPath Column path with suffix.
		 * @return {String} Column path without suffix.
		 */
		_clearColumnPathSuffix: function(columnPath) {
			const values = columnPath.split(ConfigurationConstants.EntitySchemaQuery.ColumnKeySplitter);
			return values.shift();
		},

		/**
		 * Add column from user profile into entity schema query instance {@link Terrasoft.EntitySchemaQuery}.
		 * @protected
		 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq Entity schema query in which we will add new column.
		 */
		addProfileColumns: function(esq) {
			const profileColumns = this.getProfileColumns();
			Terrasoft.each(profileColumns, function(column, columnName) {
				this.addColumnToEsq(esq, column, columnName);
			}, this);
		},

		/**
		 * Adds column to entity schema query.
		 * @protected
		 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq Entity schema query.
		 * @param {Object} column Entity column.
		 * @param {String} columnName Entity column name.
		 */
		addColumnToEsq: function(esq, column, columnName) {
			if (!esq.columns.contains(columnName) && !this.Ext.isEmpty(column)) {
				if (this.isAggregationColumn(column)) {
					this.addProfileAggregationColumn(esq, column, columnName);
				} else {
					const columnConfig = this.getColumnConfig(column);
					const newColumn = Ext.create("Terrasoft.EntityQueryColumn", columnConfig);
					esq.addColumn(newColumn, columnName);
				}
			}
		},

		/**
		 * Returns true if column is a aggregation.
		 * @protected
		 * @param {Object} column Checking column.
		 * @param {Mixed} column.aggregationType Type of the checking column.
		 * @return {Boolean} True if column is a aggregation.
		 */
		isAggregationColumn: function(column) {
			const aggregationType = parseInt(column.aggregationType, 10);
			return Ext.isNumber(aggregationType) && aggregationType !== Terrasoft.AggregationType.NONE;
		},

		/**
		 * Add's aggregated column from user profile into entity schema query
		 * instance {@link Terrasoft.EntitySchemaQuery}.
		 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq Entity schema query in which we will add new column.
		 * @param {Object} column Column from which we will create new instance of aggregation query column.
		 * @param {String} columnName Column name.
		 */
		addProfileAggregationColumn: function(esq, column, columnName) {
			const columnConfig = this._getAggregationColumnConfig(column);
			const newColumn = this.Ext.create("Terrasoft.AggregationQueryColumn", columnConfig);
			const aggregationColumn = esq.addColumn(newColumn, columnName);
			if (column.subFilters) {
				const filters = column.subFilters;
				const serializationInfo = filters.getDefSerializationInfo();
				serializationInfo.serializeFilterManagerInfo = true;
				aggregationColumn.expression.subFilters =
						Terrasoft.deserialize(filters.serialize(serializationInfo));
			}
		},

		/**
		 * Returns column config for {@link Terrasoft.AggregationQueryColumn}.
		 * @private
		 * @param {Object} column Column, the configuration of which we create.
		 * @return {Object} Object which contains aggregation type and base column config data.
		 */
		_getAggregationColumnConfig: function(column) {
			let columnConfig = this.getColumnConfig(column);
			columnConfig = Ext.apply(columnConfig, {
				aggregationType: column.aggregationType
			});
			return columnConfig;
		},

		/**
		 * Adds current and columns' reference schemas "Type" columns.
		 * @protected
		 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq Query, to add columns to.
		 */
		addTypeColumns: function(esq) {
			const esqColumns = esq.columns;
			const typeColumn = this.getTypeColumn(this.getGridEntitySchemaName());
			if (typeColumn && !esqColumns.contains(typeColumn.path)) {
				esq.addColumn(typeColumn.path);
			}
			esqColumns.each(function(column) {
				const entityColumn = this.getColumnByPath(column.columnPath);
				if (entityColumn && entityColumn.isLookup && !this.isAggregationColumn(column)) {
					const typeColumn = this.getTypeColumn(entityColumn.referenceSchemaName);
					if (typeColumn) {
						const typeColumnPath = Ext.String.format("{0}.{1}", column.columnPath, typeColumn.path);
						if (!esqColumns.contains(typeColumnPath)) {
							esq.addColumn(typeColumnPath);
						}
					}
				}
			}, this);
		},

		/**
		 * Returns the object schema column object by path
		 * @protected
		 * @param {String} columnPath Column path
		 * @return {Object} Column object
		 */
		getColumnByPath: function(columnPath) {
			const entitySchema = this.getGridEntitySchema();
			const entityColumn = entitySchema && entitySchema.getColumnByName(columnPath);
			if (entityColumn) {
				return entityColumn;
			}
			const paths = (columnPath && columnPath.split(".")) || [];
			const columnName = paths.pop();
			const entityName = paths.pop();
			const entity = Terrasoft[entityName];
			return entity && entity.columns && entity.columns[columnName];
		},

		/**
		 * ########## #######, ####### ###### ########## ########.
		 * @protected
		 * @virtual
		 * @return {Object} ########## ###### ########-############ #######.
		 */
		getGridDataColumns: function() {
			const defColumnsConfig = {};
			const entitySchema = this.getGridEntitySchema();
			if (entitySchema) {
				const primaryColumnName = entitySchema.primaryColumnName;
				const primaryDisplayColumnName = entitySchema.primaryDisplayColumnName;
				entitySchema.primaryImageColumnName = entitySchema.primaryImageColumnName || this.get("primaryImageColumnName");
				const primaryImageColumnName = entitySchema.primaryImageColumnName;
				defColumnsConfig[primaryColumnName] = {
					path: primaryColumnName
				};
				if (primaryDisplayColumnName) {
					defColumnsConfig[primaryDisplayColumnName] = {
						path: primaryDisplayColumnName
					};
				}
				if (primaryImageColumnName) {
					defColumnsConfig[primaryImageColumnName] = {
						path: primaryImageColumnName
					};
				}
			}
			return defColumnsConfig;
		},

		/**
		 * ######## ######### ####### ## ####### ### ######## # ###### #######.
		 * @protected
		 * @return {Object} ###### ####### #######.
		 */
		getProfileColumns: function() {
			const profileColumns = {};
			let profile = this.get("Profile");
			const propertyName = this.getDataGridName();
			profile = propertyName ? profile[propertyName] : profile;
			this.convertProfileColumns(profileColumns, profile);
			return profileColumns;
		},

		/**
		 * ######### ######### ####### ## #######.
		 * @protected
		 * @param {Object} profileColumns ####### ## #######.
		 * @param {Object} profile ###### #######.
		 */
		convertProfileColumns: function(profileColumns, profile) {
			if (profile && profile.isTiled !== undefined) {
				const isTiled = profile.isTiled;
				const gridsColumnsConfig = isTiled ? profile.tiledConfig : profile.listedConfig;
				if (gridsColumnsConfig) {
					const columnsConfig = this.Ext.decode(gridsColumnsConfig);
					this.Terrasoft.each(columnsConfig.items, function(item) {
						const metaPath = item.bindTo;
						const path = item.path;
						if (metaPath && !profileColumns[metaPath]) {
							profileColumns[metaPath] = {
								aggregationType: item.aggregationType,
								caption: item.caption,
								dataValueType: item.dataValueType,
								path: path || metaPath,
								subFilters: this.Terrasoft.deserialize(item.serializedFilter),
								type: item.type || this.Terrasoft.GridCellType.TEXT,
								colSpan: item.position && item.position.colSpan
							};
						}
					}, this);
				}
			}
		},

		/**
		 * Returns schema "Type" column.
		 * @protected
		 * @param {String} schemaName Schema name.
		 * @return {Object} Schema "Type" column.
		 */
		getTypeColumn: function(schemaName) {
			const schemaConfig = this.Terrasoft.configuration.EntityStructure[schemaName];
			const typeColumnName = (schemaConfig && schemaConfig.attribute) || null;
			return typeColumnName ? {path: typeColumnName} : null;
		},

		/**
		 * ############## ####### ##########.
		 * @protected
		 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq ######, # ####### ##### ################ ##### ##########.
		 */
		initQuerySorting: function(esq) {
			let profile = this.get("Profile");
			const propertyName = this.getDataGridName("normal");
			profile = propertyName ? profile[propertyName] : profile;
			if (profile && profile.isTiled !== undefined) {
				const isTiled = profile.isTiled;
				const gridsColumnsConfig = isTiled ? profile.tiledConfig : profile.listedConfig;
				if (gridsColumnsConfig) {
					const columnsConfig = this.Ext.decode(gridsColumnsConfig);
					for (let i = 0; i < columnsConfig.items.length; i++) {
						const cell = columnsConfig.items[i];
						const columnPath = cell.bindTo;
						if (cell.orderDirection && cell.orderDirection !== "" &&
								esq.columns.contains(columnPath)) {
							this.applyEsqSortingByCell(cell, esq);
						}
					}
				}
			}
			const gridDataColumns = this.getGridDataColumns();
			this.Terrasoft.each(gridDataColumns, function(column) {
				const columnPath = column.path;
				if (!this.Ext.isEmpty(column.orderPosition) && esq.columns.contains(columnPath)) {
					const gridDataSortedColumn = esq.columns.collection.get(columnPath);
					gridDataSortedColumn.orderPosition = column.orderPosition;
					gridDataSortedColumn.orderDirection = column.orderDirection;
				}
			}, this);
		},

		/**
		 * Applies sorting settings to grid's entity schema query.
		 * @protected
		 * @virtual
		 * @param {Object} cell Currently selected grid's column with enabled sorting.
		 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq Grid's esq.
		 */
		applyEsqSortingByCell: function(cell, esq) {
			const columnPath = cell.bindTo;
			const esqColumn = esq.columns.collection.get(columnPath);
			esqColumn.orderPosition = cell.orderPosition;
			esqColumn.orderDirection = cell.orderDirection;
		},

		/**
		 * ########### ###### ############# ## ####### ########## #######.
		 * @private
		 */
		initQueryEvents: function(esq) {
			esq.on("createviewmodel", this.createViewModel, this);
		},

		/**
		 * ########## ###### ############# ## ####### ########## #######.
		 * @private
		 */
		destroyQueryEvents: function(esq) {
			esq.un("createviewmodel", this.createViewModel, this);
		},

		/**
		 * ########### ######### ###### ##### ######### # ######.
		 * @protected
		 * @param {Object} collection ######### ######### #######.
		 */
		prepareResponseCollection: function(collection) {
			collection.each(this.prepareResponseCollectionItem, this);
		},

		/**
		 * ############ ###### ###### ##### ######### # ######.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} item ####### #######.
		 */
		prepareResponseCollectionItem: function(item) {
			this.Terrasoft.each(item.columns, function(column) {
				this.addColumnLink(item, column);
				this.applyColumnDefaults(column);
			}, this);
		},

		/**
		 * Adds link to the grid cell.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} item The row to process the cell from.
		 * @param {Object} column The column of the cell.
		 */
		addColumnLink: function(item, column) {
			this.tryAddColumnLink(item, column);
			if (!this.getHasColumnLinkClickHandler(item, column)) {
				this.addColumnLinkClickHandler(item, column, function() {
					return (item.getLinkColumnConfig ? item.getLinkColumnConfig(column) : null);
				});
			}
		},

		/**
		 * Adds link to the grid cell if column is a lookup or the primary display column.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} item The row to process the cell from.
		 * @param {Object} column The column of the cell.
		 */
		tryAddColumnLink: function(item, column) {
			if (!this.shouldAddLink(column)) {
				return;
			}
			if (column.isLookup) {
				this.addLookupColumnLink(item, column);
			} else {
				this.addPrimaryColumnLink(item, column);
			}
		},


		/**
		 * Returns whether the column should have a link.
		 * @protected
		 * @param {Object} column The column to check.
		 * @return {Boolean} Whether the column should have a link.
		 */
		shouldAddLink: function(column) {
			const profileColumns = this.getProfileColumns();
			const profileColumn = profileColumns[column.columnPath];
			const isProfiledLinkColumn =
				profileColumn && (profileColumn.type === this.Terrasoft.GridCellType.LINK);
			const isLinkColumn = this.getIsLinkColumn(this.getGridEntitySchema(), column);
			return (isProfiledLinkColumn || isLinkColumn) && !this.getIsEditable();
		},

		/**
		 * Adds link to a lookup column.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} item The row to process the cell from.
		 * @param {Object} column The column of the cell.
		 */
		addLookupColumnLink: function(item, column) {
			const referenceSchemaName = column.referenceSchemaName;
			const schemaConfig = Terrasoft.configuration.ModuleStructure[referenceSchemaName];
			if (!schemaConfig) {
				return;
			}
			const columnPath = column.columnPath;
			const scope = this;
			this.addColumnLinkClickHandler(item, column, function() {
				const record = item.get(columnPath);
				if (!record) {
					return "";
				}
				const recordId = record.value;
				if (!recordId) {
					return "";
				}
				return scope.createLink.call(item, referenceSchemaName, columnPath, record.displayValue, recordId);
			});
		},

		/**
		 * Adds link to the non-lookup column.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} item The row to process the cell from.
		 * @param {Object} column The column of the cell.
		 */
		addPrimaryColumnLink: function(item, column) {
			const entitySchemaName = this.getGridEntitySchemaName();
			const entitySchemaConfig = Terrasoft.configuration.ModuleStructure[entitySchemaName];
			if (!entitySchemaConfig) {
				return;
			}
			const columnPath = column.columnPath;
			const columnIdName = item.primaryColumnName;
			const scope = this;
			this.addColumnLinkClickHandler(item, column, function() {
				const recordId = item.get(columnIdName);
				if (!recordId) {
					return "";
				}
				const displayValue = item.get(columnPath);
				if (Ext.isEmpty(displayValue)) {
					return "";
				}
				const link = LinkColumnHelper.createLink(entitySchemaName, columnPath, displayValue, recordId);
				return link || scope.createLink.call(item, entitySchemaName, columnPath,
					displayValue, recordId);
			});
		},

		/**
		 * Attaches the specified handler to the column of the row.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} item The row to process the cell from.
		 * @param {Object} column The column of the cell.
		 * @param {Function} handler The handler to attach.
		 */
		addColumnLinkClickHandler: function(item, column, handler) {
			const onColumnLinkClickName = this.getColumnLinkClickMethodName(column);
			item[onColumnLinkClickName] = handler;
		},


		/**
		 * Returns the name of the handler for column link click.
		 * @protected
		 * @param {Object} column The column of the cell.
		 */
		getColumnLinkClickMethodName: function(column) {
			return Ext.String.format("on{0}LinkClick", column.columnPath);
		},

		/**
		 * Returns whether column has a link click handler attached.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} item The row to process the cell from.
		 * @param {Object} column The column of the cell.
		 */
		getHasColumnLinkClickHandler: function(item, column) {
			const onColumnLinkClickName = this.getColumnLinkClickMethodName(column);
			const handler = item[onColumnLinkClickName];
			return !Ext.isEmpty(handler);
		},

		/**
		 * ####### URL ######.
		 * @private
		 * @param {String} entitySchemaName ### #####.
		 * @param {String} columnPath ### #######.
		 * @param {String} displayValue ############ ########.
		 * @param {String} recordId ############# ######.
		 * @return {Object} ############ ######.
		 */
		createLink: function(entitySchemaName, columnPath, displayValue, recordId) {
			const moduleStructure = Terrasoft.configuration.ModuleStructure[entitySchemaName];
			const entityStructure = Terrasoft.configuration.EntityStructure[entitySchemaName];
			const attribute = entityStructure.attribute;
			const pages = entityStructure.pages;
			let cardSchema = "";
			if (pages && pages.length > 1 && attribute) {
				const type = this.get(columnPath + "." + attribute) || this.get(attribute);
				const typeId = type ? type.value : type;
				Terrasoft.each(pages, function(page) {
					if (page.UId === typeId) {
						cardSchema = page.cardSchema;
					}
				}, this);
			}
			if (Ext.isEmpty(cardSchema) && pages && pages.length > 0) {
				cardSchema = pages[0].cardSchema;
			}
			const URL = [moduleStructure.cardModule, cardSchema, "edit", recordId];
			const link = Terrasoft.workspaceBaseUrl + "/Nui/ViewModule.aspx#" + URL.join("/");
			return {
				caption: displayValue,
				target: "_self",
				title: displayValue,
				url: link
			};
		},

		/**
		 * ############ ####### ## ###### # #######.
		 * @protected
		 * @virtual
		 */
		linkClicked: Terrasoft.emptyFn,

		/**
		 * ########## ########### # ###### ##### #######. ################ # ###########.
		 * @virtual
		 * @return {Terrasoft.FilterGroup} ########### # ###### ##### #######.
		 */
		getFilters: function() {
			return this.Ext.create("Terrasoft.FilterGroup");
		},

		/**
		 * Applies default column properties.
		 * @private
		 * @param {Object} column Entity column.
		 */
		applyColumnDefaults: function(column) {
			if (Ext.isNumber(column.type)) {
				return;
			}
			column.type = Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN;
			if (!column.columnPath) {
				return;
			}
			const viewModelColumn = this.getColumnByName(column.columnPath);
			if (viewModelColumn) {
				column.type = viewModelColumn.type;
				if (column.dataValueType === Terrasoft.DataValueType.FLOAT) {
					column.precision = viewModelColumn.precision;
				}
			}
		},

		/**
		 * ########### ## ####### ######### ######### ########### ########.
		 * @protected
		 */
		initGetFiltersMessage: function() {
			this.sandbox.subscribe("GetFiltersCollection", this.onGetFiltersCollection, this);
		},

		/**
		 * Handler for GetFiltersCollection message.
		 * @protected
		 * @return {Terrasoft.FilterGroup} Current grid filters.
		 */
		onGetFiltersCollection: function() {
			return this.getFilters();
		},

		/**
		 * ############ ########## ####### # ####.
		 * @protected
		 */
		exportToFile: function() {
			const gridESQ = this.getGridDataESQ();
			this.addProfileColumns(gridESQ);
			this.initQueryFilters(gridESQ);
			this.initQuerySorting(gridESQ);
			const exportConfig = {
				esq: gridESQ,
				scope: this
			};
			DataUtilities.exportToCsvFile(exportConfig);
		},

		/**
		 * Returns export to excel entity schema query.
		 * @protected
		 * @return {Terrasoft.data.queries.EntitySchemaQuery} Export to excel entity schema query.
		 */
		getExportToExcelEsq: function() {
			const esq = this.getGridDataInitializedEsq(true);
			const selectedRows = this.getSelectedItems();
			const selectAllModeEnabled = this.$SelectAllMode;
			if ((!this.Ext.isEmpty(selectedRows) && this.$MultiSelect) || selectAllModeEnabled) {
				esq.filters.clear();
				esq.filters.addItem(selectAllModeEnabled
						? this._getSelectAllModeFilters()
						: this.Terrasoft.createColumnInFilterWithParameters(this.primaryColumnName, selectedRows));
			}
			return esq;
		},

		/**
		 * Handler of the export to excel.
		 * @param {Object} config Config object.
		 * @param {String} [config.downloadFileName]
		 * @param {Function} [config.callback] Callback function. Calls after started download excel file.
		 * @param {Object} [config.scope] Scope of the callback.
		 */
		exportToExcel: function(config) {
			config = config || {};
			config.downloadFileName = config.downloadFileName ||
					this.getDownloadFileName(this.getGridEntitySchemaName());
			const esq = this.getExportToExcelEsq();
			Terrasoft.MaskHelper.showBodyMask({timeout: 0});
			const exportConfig = {
				esq: esq,
				callback: function() {
					Terrasoft.MaskHelper.hideBodyMask();
					Ext.callback(config.callback, config.scope);
				},
				downloadFileName: config.downloadFileName,
				analyticsConfig: {
					source: this.name || "Dashboard"
				},
				scope: this
			};
			DataUtilities.exportToExcelFile(exportConfig);
		},

		/**
		 * Gets downloading file name.
		 * @param {String} filePrefix Prefix of the downloading file.
		 * @return {String} Name of the downloading file.
		 */
		getDownloadFileName: function(filePrefix) {
			const suffix = this._getDownloadFileNameSuffix();
			const downloadFileName = Ext.String.format("{0}_{1}", filePrefix, suffix);
			return downloadFileName;
		},

		/**
		 * Gets suffix of the downloading file.
		 * @private
		 * @return {String} Suffix of the downloading file.
		 */
		_getDownloadFileNameSuffix: function() {
			return Terrasoft.toCultureDateTime(new Date());
		},

		/**
		 * ########## ######## #### ######## ####### # ######## ######## ####### # ########.
		 * @protected
		 * @virtual
		 * @return {String} ######## #######.
		 */
		getEntityColumnNameInFolderEntity: function() {
			return this.getGridEntitySchemaName();
		},

		/**
		 * ########## ### ##### ##### ### ####### ########.
		 * @protected
		 * @virtual
		 * @return {String} ### ##### #####.
		 */
		getFolderEntityName: function() {
			return this.getGridEntitySchemaName() + this.folderColumnName;
		},

		/**
		 * ########## ### ##### ######## ########### ##### ### ####### ########.
		 * @protected
		 * @virtual
		 * @return {String} ### ##### ######## ########### #####.
		 */
		getInFolderEntityName: function() {
			const entitySchemaName = this.getGridEntitySchemaName();
			return entitySchemaName + this.folderTypeSchemaSuffix;
		},

		/**
		 * Return LookupUtilities.
		 * @private
		 * @virtual
		 * @return {Object} LookupUtilities.
		 */
		getLookupUtilities: function() {
			return LookupUtilities;
		},

		/**
		 * ######### ########## ########### #####.
		 * @protected
		 */
		openStaticGroupLookup: function() {
			const records = this.getSelectedItems();
			if (records && records.length) {
				const config = {
					entitySchemaName: this.getFolderEntityName(),
					enableMultiSelect: false,
					filters: this.Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							this.folderTypeColumnName, ConfigurationConstants.Folder.Type.General)
				};
				const lookupUtilities = this.getLookupUtilities();
				lookupUtilities.Open(this.sandbox, config, this.includeEntitiesInFolder, this, null, false, false);
			}
		},

		/**
		 * ########## ###### ## ####### ######### ####### # ######.
		 * @protected
		 * @virtual
		 * @param {String[]} folders ###### ########## ############### #####.
		 * @param {String[]} records ###### ########## ############### #######.
		 * @return {Terrasoft.data.queries.EntitySchemaQuery} ###### ## ####### ######### ####### # ######.
		 */
		createRecordsInFoldersSelectQuery: function(folders, records) {
			const select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: this.getInFolderEntityName()
			});
			const entityColumnNameInFolderEntity = this.getEntityColumnNameInFolderEntity();
			const folderId = select.addColumn(this.folderColumnName, "Folder");
			const recordId = select.addColumn(entityColumnNameInFolderEntity, "Entity");
			select.filters.add("recordsFilter", this.Terrasoft.createColumnInFilterWithParameters(
					recordId.columnPath, records));
			select.filters.add("foldersFilter", this.Terrasoft.createColumnInFilterWithParameters(
					folderId.columnPath, folders));
			return select;
		},

		/**
		 * ####### ######### ######### # ######. # ####### ######### ###### ############### ######,
		 * ######### ## ############### ##### ### #####, # ###### ######## # ### ####### ### ########.
		 * @protected
		 * @virtual
		 * @param {String[]} folders ###### ########## ############### #####.
		 * @param {String[]} records ###### ########## ############### #######.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ###### ######### ####### ######### ######.
		 */
		getExistingsRecordsInFolders: function(folders, records, callback, scope) {
			const select = this.createRecordsInFoldersSelectQuery(folders, records);
			select.getEntityCollection(function(result) {
				if (!result.success) {
					this.showInformationDialog(resources.localizableStrings.AddRecordsToStaticFolderErrorMessage);
					return;
				}
				const resultCollection = result.collection;
				const entityInFolders = {};
				resultCollection.each(function(item) {
					let folder = item.get("Folder");
					folder = (folder && folder.value) || folder;
					let entity = item.get("Entity");
					entity = (entity && entity.value) || entity;
					const folderEntities = (entityInFolders[folder] || (entityInFolders[folder] = []));
					folderEntities.push(entity);
				}, this);
				callback.call(scope, entityInFolders);
			}, this);
		},

		/**
		 * ####### ########, ####### ## ###### # ######### ######. # ####### ######### ###### ###############
		 * ######, ######### ## ############### ##### ### #####, # ###### ## ######## # ### ####### ### ########.
		 * @protected
		 * @virtual
		 * @param {String[]} folders ###### ########## ############### #####.
		 * @param {String[]} records ###### ########## ############### #######.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ###### ######### ####### ######### ######.
		 */
		getNotExistingsRecordsInFolders: function(folders, records, callback, scope) {
			this.getExistingsRecordsInFolders(folders, records, function(existingEntities) {
				const notExistingEntitiesInFolder = {};
				Terrasoft.each(folders, function(folderId) {
					const folderEntities = existingEntities[folderId];
					let notExistingEntities = records;
					if (!Ext.isEmpty(folderEntities)) {
						notExistingEntities = records.filter(function(record) {
							return !Ext.Array.contains(folderEntities, record);
						}, this);
					}
					if (!Ext.isEmpty(notExistingEntities)) {
						notExistingEntitiesInFolder[folderId] = notExistingEntities;
					}
				}, this);
				callback.call(scope, notExistingEntitiesInFolder);
			}, this);
		},

		_getLookupSelectedRowsIds: function(selectedRows) {
			selectedRows = (selectedRows && selectedRows.getItems()) || [];
			return selectedRows.map(function(folder) {
				return folder.value;
			}, this);
		},

		/**
		 * @private
		 */
		_getIncludeInFolderSelectAllQuery: function() {
			const esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: this.getGridEntitySchemaName()
			});
			esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, this.primaryColumnName);
			const selectedRows = this.getSelectedItems();
			if ((!Ext.isEmpty(selectedRows) && this.$MultiSelect) || this.$SelectAllMode) {
				esq.filters.addItem(this.$SelectAllMode
						? this._getSelectAllModeFilters()
						: Terrasoft.createColumnInFilterWithParameters(this.primaryColumnName, selectedRows));
			}
			return esq;
		},

		/**
		 * @private
		 */
		_getNotExistingRecordsBatch: function(notExistingRecords) {
			const bq = Ext.create("Terrasoft.BatchQuery");
			Terrasoft.each(notExistingRecords, function(records, folder) {
				Terrasoft.each(records, function(record) {
					bq.add(this.includeEntityInFolder(record, folder));
				}, this);
			}, this);
			return bq;
		},

		/**
		 * Gets records for include in folder operation.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback execution context.
		 */
		getIncludeInFolderRecords: function(callback, scope) {
			let records = [];
			if (this.$SelectAllMode) {
				const selectAllQuery = this._getIncludeInFolderSelectAllQuery();
				selectAllQuery.getEntityCollection(function(response) {
					if (response.success) {
						records = response.collection.getKeys();
					}
					Ext.callback(callback, scope || this, [records]);
				}, this);
			} else {
				records = this.getSelectedItems();
				Ext.callback(callback, scope || this, [records]);
			}
		},

		/**
		 * @private
		 */
		_processIncludeInFoldersBatchResponse: function(response, folderName, batchQueriesCount, callback) {
			if (response.success) {
				this.showIncludedFoldersMessage(folderName, batchQueriesCount);
			} else {
				this.showInformationDialog(
						resources.localizableStrings.AddRecordsToStaticFolderErrorMessage);
			}
			Ext.callback(callback, this);
		},

		/**
		 * Shows included in folder records count message.
		 * @param {String} folderName Name of the folder.
		 * @param {Number} recordsCount Count of included records.
		 */
		showIncludedFoldersMessage: function(folderName, recordsCount) {
			const message = Ext.String.format(
					resources.localizableStrings.RecordsAddedToStaticFolder,
					folderName, recordsCount || 0);
			this.showInformationDialog(message);
		},

		/**
		 * Adds selected grid records to the selected folder.
		 * Handler for folders selection lookup.
		 * @param {Object} args Lookup selection result.
		 */
		includeEntitiesInFolder: function(args, callback, scope) {
			const commandChain = [];
			const selectedRows = args.selectedRows.getItems() || [];
			const folderName = selectedRows[0].displayValue;
			commandChain.push(
				function(next) {
				const foldersIds = this._getLookupSelectedRowsIds(args.selectedRows);
				next(foldersIds);
			});
			if (this.getIsFeatureEnabled("UseServiceForIncludeEntitiesInFolder")) {
				this._addServiceCommands(commandChain, folderName);
			} else {
				this._addClientCommands(commandChain, folderName);
			}
			commandChain.push(
				function() {
				this.deselectRows();
				Ext.callback(callback, scope || this);
			});
			Terrasoft.chain.apply(this, commandChain);
		},

		/**
		 * Returns {@link Terrasoft.FilterGroup IN} filter for provided record ids array.
		 * @protected
		 * @param {Array} records Record Ids.
		 * @param {Terrasoft.ComparisonType} [comparisonType] Filter comparison type.
		 * @return {Terrasoft.FilterGroup}
		 */
		getFolderRecordsInFilter: function(records, comparisonType) {
			const entityColumnNameInFolderEntity = this.getEntityColumnNameInFolderEntity();
			const filter = Terrasoft.createColumnInFilterWithParameters(entityColumnNameInFolderEntity, records);
			filter.comparisonType = this.isEmpty(comparisonType) ? Terrasoft.ComparisonType.EQUAL : comparisonType;
			return filter;
		},

		/**
		 * Remove all records from active folder except unselected items.
		 * @protected
		 */
		excludeAllFromFolder: function() {
			const records = this.getUnselectedItems();
			const currentFolder = this.get("CurrentFolder");
			let filter = null;
			if (records.length) {
				filter = this.getFolderRecordsInFilter(records, Terrasoft.ComparisonType.NOT_EQUAL);
			}
			this._excludeAllItemsFromFolder(filter, currentFolder, this.onExcludeRecordsFromFolderResponse, this);
		},

		/**
		 * Remove selected records from active folder.
		 * @protected
		 */
		excludeSelectedRecordsFromFolder: function() {
			const records = this.getSelectedItems();
			const currentFolder = this.get("CurrentFolder");
			if (currentFolder && records && records.length &&
					currentFolder.folderType.value === ConfigurationConstants.Folder.Type.General) {
				this.excludeRecordsFromFolder(records, currentFolder,
						this.onExcludeRecordsFromFolderResponse, this);
			}
		},

		/**
		 * Remove records from active folder.
		 * Removes from folder all records if grid is in SelectAllMode, otherwise removes only selected.
		 * @protected
		 */
		excludeFromFolder: function() {
			if (this.get("SelectAllMode")) {
				this.excludeAllFromFolder();
			} else {
				this.excludeSelectedRecordsFromFolder();
			}
		},

		/**
		 * Remove records from folder.
		 * @protected
		 * @param {Array} records Record Ids.
		 * @param {Object} folder Active folder.
		 * @param {Function} callback Callback method.
		 * @param {Object} scope Callback method scope.
		 */
		excludeRecordsFromFolder: function(records, folder, callback, scope) {
			const query = this.getDeleteFromFolderQuery(folder.value);
			const entityColumnNameInFolderEntity = this.getEntityColumnNameInFolderEntity();
			query.filters.add("recordFilter", Terrasoft.createColumnInFilterWithParameters(
					entityColumnNameInFolderEntity, records));
			query.execute(callback, scope);
		},

		/**
		 * Elaborate response for exclude records from folder require.
		 * @protected
		 * @param {Object} response Response.
		 * @param {Boolean} response.success Successful response flag.
		 */
		onExcludeRecordsFromFolderResponse: function(response) {
			if (response && response.success) {
				Terrasoft.MaskHelper.hideBodyMask();
				this.set("IsClearGridData", true);
				this.deselectRows();
				this.setActiveView(this.getActiveViewName());
				this.loadGridData();
			}
		},

		/**
		 * Gets insert query for the adding new record to the selected folder.
		 * @private
		 * @param {String} record Record identifier.
		 * @param {String} folder Selected folder.
		 * @return {Terrasoft.InsertQuery} Insert query for record in folder.
		 */
		includeEntityInFolder: function(record, folder) {
			const insert = this.Ext.create("Terrasoft.InsertQuery", {
				rootSchemaName: this.getInFolderEntityName()
			});
			insert.setParameterValue(this.folderColumnName, folder, Terrasoft.DataValueType.GUID);
			const entityColumnNameInFolderEntity = this.getEntityColumnNameInFolderEntity();
			insert.setParameterValue(entityColumnNameInFolderEntity, record, Terrasoft.DataValueType.GUID);
			return insert;
		},

		/**
		 * ######### ####### ####### # ####### ########.
		 * @private
		 * @param {Object[]} array ###### ########.
		 * @param {Object} object ######.
		 */
		isObjectInArray: function(array, object) {
			if (!Ext.isArray(array)) {
				return false;
			}
			for (let i = 0; i < array.length; i++) {
				const element = array[i];
				let isEqual = true;
				// eslint-disable-next-line prefer-const
				for (let propertyName in element) {
					if (element[propertyName] !== object[propertyName]) {
						isEqual = false;
						break;
					}
				}
				if (isEqual) {
					return true;
				}
			}
			return false;
		},

		/**
		 * ############## ####### ########## #######.
		 * @protected
		 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq ######, # ####### ##### ############ #######.
		 */
		initQueryFilters: function(esq) {
			esq.filters.addItem(this.getFilters());
		},

		/**
		 * ######### ########## # #######.
		 * @protected
		 * @param {String} tag ####, ########### ##### ####### ############### ######.
		 */
		sortGrid: function(tag) {
			const columnsSettingsProfile = this.get("Profile");
			this.changeSorting({
				tag: tag,
				columnsSettingsProfile: columnsSettingsProfile
			});
			this.set("IsClearGridData", true);
			this.deselectRows();
			this.loadGridData();
		},

		/**
		 * ######### ########## ####### ### ####### ## ######### ####### # ######### ######.
		 * @protected
		 * @param {Number} index ###### ####### # #######.
		 */
		sortColumn: function(index) {
			const columnsSettingsProfile = this.get("Profile");
			this.changeSorting({
				index: index,
				columnsSettingsProfile: columnsSettingsProfile
			});
			this.set("IsClearGridData", true);
			this.deselectRows();
			this.loadGridData();
		},

		/**
		 * ########## ######## ######### #######.
		 * @protected
		 * @virtual
		 */
		deleteRecords: function() {
			const activeRow = this.getActiveRow();
			if (activeRow && activeRow.isNew) {
				this.removeGridRecords([activeRow.get("Id")]);
			} else {
				const items = this.getSelectedItems();
				if (!items || !items.length) {
					return;
				}
				this.checkCanDelete(items, this.checkCanDeleteCallback, this);
			}
		},

		/**
		 * Returns right utilities instance.
		 * @private
		 * @return {Terrasoft.RightUtilities} Right utilities instance.
		 */
		getRightUtilities: function() {
			return this.rightUtilitiesInstance ||
					(this.rightUtilitiesInstance = this.Ext.create("Terrasoft.RightUtilities"));
		},

		/**
		 * Checks can delete selected records.
		 * @param {Array} items The identifiers of selected records.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope Environment object callback function.
		 */
		checkCanDelete: function(items, callback, scope) {
			const config = {schemaName: this.getGridEntitySchemaName()};
			const rightUtilities = this.getRightUtilities();
			rightUtilities.getSchemaDeleteRights(config, callback, scope);
		},

		/**
		 * ############ ######### ######## ########### ######## ######### #######.
		 * @param {Object} result ######### ######## ########### ######## ######### #######.
		 */
		checkCanDeleteCallback: function(result) {
			if (result) {
				this.showInformationDialog(resources.localizableStrings[result]);
				return;
			}
			const items = this.getSelectedItems();
			const count = items.length;
			const message = (count > 1)
					? this.get("Resources.Strings.MultiDeleteConfirmationMessage")
					: this.get("Resources.Strings.DeleteConfirmationMessage");
			this.showConfirmationDialog(message,
					function(returnCode) {
						this.onDelete(returnCode);
					},
					[this.Terrasoft.MessageBoxButtons.NO.returnCode, this.Terrasoft.MessageBoxButtons.YES.returnCode],
					null);
		},

		/**
		 * Handles answer the user to delete data.
		 * @param {String} returnCode Answer the user to delete data.
		 */
		onDelete: function(returnCode) {
			if (returnCode !== this.Terrasoft.MessageBoxButtons.YES.returnCode) {
				return;
			}
			if (this.get("MultiSelect")) {
				this.onMultiDeleteAccept();
			} else {
				this.onDeleteAccept();
			}
		},

		/**
		 * Performs deleting after confirmation.
		 * @protected
		 */
		onDeleteAccept: function() {
			this.onMultiDeleteAccept();
		},

		/**
		 * @private
		 */
		_getSelectAllModeFilters: function() {
			const filters = this.getFilters();
			const unselectedItems = this.getUnselectedItems();
			const entitySchema = this.getGridEntitySchema();
			if (unselectedItems.length) {
				const notInFilter = this.Terrasoft.createColumnInFilterWithParameters(
						entitySchema.primaryColumnName, unselectedItems);
				notInFilter.comparisonType = Terrasoft.ComparisonType.NOT_EQUAL;
				filters.addItem(notInFilter);
			}
			return filters;
		},

		/**
		 * Generates current filters config for SelectAllMode.
		 * @return {String} Serialized filters.
		 * @private
		 */
		getSelectAllFiltersConfig: function() {
			const filters = this._getSelectAllModeFilters();
			const filtersConfig = filters.serialize(filters.getDefSerializationInfo());
			return filtersConfig;
		},

		/**
		 * Generates current selection config.
		 * @return {{selectedItems: Array, filtersConfig: String, selectAllMode: Boolean}}
		 */
		getSelectedRecordsConfig: function() {
			const config = {
				selectAllMode: this.get("SelectAllMode"),
				selectedItems: [],
				unselectedItems: this.getUnselectedItems(),
				filtersConfig: null
			};
			if (config.selectAllMode) {
				config.filtersConfig = this.getSelectAllFiltersConfig();
			} else {
				config.selectedItems = this.getSelectedItems();
			}
			return config;
		},

		/**
		 * Call service for delete a few records.
		 * @protected
		 */
		onMultiDeleteAccept: function() {
			const operationKey = this.Terrasoft.generateGUID();
			const params = {
				operationKey: operationKey
			};
			const selectedRecordsConfig = this.getSelectedRecordsConfig();
			const primaryColumnValues = selectedRecordsConfig.selectedItems;
			const filtersConfig = selectedRecordsConfig.filtersConfig;
			const entitySchemaName = this.getEntitySchemaNameForDelete();
			this.handlerBeforeMultiDelete(operationKey);
			const paramsJSON = this.Ext.JSON.encode(params);
			this.callService({
				serviceName: "GridUtilitiesService",
				methodName: "DeleteRecordsAsync",
				data: {
					primaryColumnValues: primaryColumnValues,
					rootSchema: entitySchemaName,
					parameters: paramsJSON,
					filtersConfig: filtersConfig
				}
			}, this.handlerAfterMultiDelete, this);
		},

		/**
		 * Returns grid entity schema name.
		 * @return {String}
		 */
		getEntitySchemaNameForDelete: function() {
			const entitySchema = this.getGridEntitySchema();
			return entitySchema.name;
		},

		/**
		 * Handles before multi delete.
		 * @param {String} operationKey Operation key.
		 * @private
		 */
		handlerBeforeMultiDelete: function(operationKey) {
			localStorage.setItem(ConfigurationConstants.MultiDelete.MultiDeleteLocalStorageKey,
					operationKey);
			this.sandbox.subscribe("MultiDeleteFinished", this.handleAfterDelete, this);
			this.sandbox.publish("MultiDeleteStart", {operationKey: operationKey});
		},

		/**
		 * Handles result of service response.
		 * @param {Object} responseObject Response of service.
		 * @private
		 */
		handlerAfterMultiDelete: function(responseObject) {
			if (!responseObject || !responseObject.DeleteRecordsAsyncResult) {
				this.hideBodyMask();
				throw new Terrasoft.UnknownException();
			}
			const result = this.Terrasoft.decode(responseObject.DeleteRecordsAsyncResult);
			const success = result.Success;
			if (!success) {
				this.hideBodyMask();
				this.showDeleteExceptionMessage(result);
			}
		},

		/**
		 * Get delete query for items from current folder.
		 * @protected
		 * @param {String} folderId Current folder ID.
		 * @return {Terrasoft.DeleteQuery} Delete query.
		 */
		getDeleteFromFolderQuery: function(folderId) {
			const query = Ext.create("Terrasoft.DeleteQuery", {rootSchemaName: this.getInFolderEntityName()});
			query.filters.add("folderFilter",
					Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Folder", folderId));
			return query;
		},

		/**
		 * Converts listed config into new column configuration.
		 * @private
		 * @param {Object} listedConfig Listed config.
		 * @param {Object} viewGenerator View generator.
		 * @return {Object} Column configuration.
		 */
		_getConvertedListedConfig: function(listedConfig, viewGenerator) {
			const columnConfig = {};
			const gridType = Terrasoft.GridType.LISTED;
			const gridConfig = {
				listedConfig: listedConfig,
				type: gridType
			};
			this.actualizeListedGridConfig(viewGenerator, gridConfig);
			listedConfig = gridConfig.listedConfig;
			Ext.apply(columnConfig, {
				captionsConfig: listedConfig.captionsConfig,
				columnsConfig: listedConfig.columnsConfig,
				listedConfig: listedConfig,
				type: gridType
			});
			return columnConfig;
		},

		_excludeAllItemsFromFolder: function(filter, folder, callback, scope) {
			const query = this.getDeleteFromFolderQuery(folder.value);
			if (this.isNotEmpty(filter)) {
				query.filters.add("recordFilter", filter);
			}
			if (!query.filters.contains("folderFilter")) {
				throw new Terrasoft.ArgumentNullOrEmptyException("folderFilter");
			}
			query.execute(callback, scope);
		},

		/**
		 * Converts tiled config into new column configuration.
		 * @private
		 * @param {Object} tiledConfig Tiled config.
		 * @param {Object} viewGenerator View generator.
		 * @param {Object} propertyName Vertical profile property name.
		 * @return {Object} Column configuration.
		 */
		_getConvertedTiledConfig: function(tiledConfig, viewGenerator, propertyName) {
			const columnConfig = {};
			const gridType = Terrasoft.GridType.TILED;
			const gridConfig = {
				tiledConfig: tiledConfig,
				type: gridType
			};
			const isVertical = propertyName.indexOf("VerticalProfile") > -1;
			gridConfig.isVertical = isVertical;
			this.actualizeTiledGridConfig(viewGenerator, gridConfig);
			tiledConfig = gridConfig.tiledConfig;
			Ext.apply(columnConfig, {
				isEmptyRowVisible: !isVertical,
				isVertical: isVertical,
				columnsConfig: tiledConfig.columnsConfig,
				tiledConfig: tiledConfig,
				type: gridType
			});
			return columnConfig;
		},

		/**
		 * Handle after delete finish.
		 * @protected
		 */
		handleAfterDelete: function() {
			this.sandbox.unRegisterMessages(["MultiDeleteFinished"]);
			this.registerMultiDeleteMessages();
			this.reloadGridData();
			this.onDeleted({
				Success: true
			});
			this.onDataChanged();
		},

		/**
		 * Register messages for multidelete.
		 * @private
		 */
		registerMultiDeleteMessages: function() {
			const messages = {
				"MultiDeleteStart": {
					"mode": this.Terrasoft.MessageMode.BROADCAST,
					"direction": this.Terrasoft.MessageDirectionType.PUBLISH
				},
				"MultiDeleteFinished": {
					"mode": this.Terrasoft.MessageMode.BROADCAST,
					"direction": this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			};
			this.sandbox.registerMessages(messages);
		},

		/**
		 * ########, ####### ##### ######### ##### ########.
		 * @virtual
		 */
		onDeleted: this.Terrasoft.emptyFn,

		/**
		 * Shows delete error message.
		 * @protected
		 * @param {Object} result Server response.
		 */
		showDeleteExceptionMessage: function(result) {
			const message = this.getDeleteExceptionMessage(result);
			this.showInformationDialog(message);
		},

		/**
		 * Gets delete exception message.
		 * @protected
		 * @virtual
		 * @param {Object} result Server response.
		 * @param {Boolean} result.IsDbOperationException If it is db operation exception.
		 * @param {Boolean} result.IsSecurityException If it is security exception.
		 * @param {String} result.ExceptionMessage Exception message.
		 * @return {String} Delete exception message.
		 */
		getDeleteExceptionMessage: function(result) {
			let message;
			if (result.IsDbOperationException) {
				message = this.getRecordDependencyWarningMessage();
			} else if (result.IsSecurityException) {
				message = resources.localizableStrings.RightLevelWarningMessage;
			} else {
				message = this.getDefaultDeleteExceptionMessage(result);
			}
			return message;
		},

		/**
		 * Gets record dependency warning message.
		 * @protected
		 * @virtual
		 * @return {String} Record dependency warning message.
		 */
		getRecordDependencyWarningMessage: function() {
			return resources.localizableStrings.DependencyWarningMessage;
		},

		/**
		 * Gets default delete exception message.
		 * @protected
		 * @virtual
		 * @param {Object} result Server response.
		 * @param {String} result.ExceptionMessage Exception message.
		 * @return {String} Default delete exception message.
		 */
		getDefaultDeleteExceptionMessage: function(result) {
			return result.ExceptionMessage;
		},

		/**
		 * Returns selected grid row/rows identifiers.
		 * @protected
		 * @return {Array|null} Selected grid rows identifiers.
		 */
		getSelectedItems: function() {
			const isMultiSelect = this.get("MultiSelect");
			const activeRow = this.get("ActiveRow");
			let result = null;
			if (isMultiSelect) {
				result = this.get("SelectedRows");
			} else if (activeRow) {
				result = [activeRow];
			}
			return result;
		},

		/**
		 * Initializes count esq filters.
		 * @protected
		 * @param {Terrasoft.data.queries.EntitySchemaQuery} select Entity schema query.
		 */
		initCountESQFilters: function(select) {
			const filters = this.getFilters();
			if (filters && (filters.collection && filters.collection.length > 0)) {
				select.filters.add("filter", filters);
			}
		},

		/**
		 * Returns entity schema query with count column.
		 * @private
		 * @return {Terrasoft.data.queries.EntitySchemaQuery} Entity schema query.
		 */
		getCountESQ: function() {
			const entitySchema = this.getGridEntitySchema();
			const select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: entitySchema.name
			});
			select.addAggregationSchemaColumn(entitySchema.primaryColumnName,
					this.Terrasoft.AggregationType.COUNT, "Count");
			return select;
		},

		/**
		 * Gets count of records by filters.
		 * @param {Function} callback Callback.
		 * @param {Object} scope Scope.
		 */
		getCountItemsByFilters: function(callback, scope) {
			const select = this.getCountESQ();
			this.initCountESQFilters(select);
			select.getEntityCollection(callback, scope);
		},

		/**
		 * Handler for multiSelectChanged event.
		 */
		onMultiSelectChanged: function(newState) {
			if (this.get("MultiSelect") !== newState) {
				if (newState) {
					this.setMultiSelect();
				} else {
					this.unSetMultiSelect();
				}
			}
		},

		/**
		 * Turns on MultiSelect mode.
		 * @protected
		 */
		setMultiSelect: function() {
			this.set("ActiveRow", null);
			this.set("MultiSelect", true);
		},

		/**
		 * Turns off MultiSelect mode.
		 * @protected
		 */
		unSetMultiSelect: function() {
			this.set("MultiSelect", false);
			this.deselectRows();
		},

		/**
		 * Turns on SelectAll mode.
		 * @protected
		 */
		setSelectAllMode: function() {
			this.setMultiSelect();
			this.set("SelectAllMode", true);
			this.addSelectedRecords(this.getGridData());
		},

		/**
		 * Turns off SelectAll mode.
		 * @protected
		 */
		unSetSelectAllMode: function() {
			this.set("SelectAllMode", false);
			this.set("FilteredRowsCount", null);
		},

		/**
		 * @deprecated 7.8.4 Use {@link Terrasoft.GridUtilities#deselectRows deselectRows} instead.
		 * @protected
		 */
		unSelectRecords: function() {
			this.deselectRows();
		},

		/**
		 * Returns unselected grid rows identifiers.
		 * @return {Array} Unselected grid rows identifiers.
		 */

		getUnselectedItems: function() {
			let result = [];
			const isMultiSelect = this.get("MultiSelect");
			if (isMultiSelect) {
				const rows = this.getGridData();
				const rowKeys = rows ? rows.getKeys() : [];
				const selectedRows = this.getSelectedItems() || [];
				result = this.Ext.Array.difference(rowKeys, selectedRows);
			}
			return result;
		},

		/**
		 * Selects all grid items.
		 * @protected
		 * @param {Terrasoft.core.collections.Collection} gridData Grid data for selected.
		 */
		addSelectedRecords: function(gridData) {
			if (this.get("SelectAllMode") && gridData) {
				const rowKeys = gridData.getKeys();
				const selectedRows = this.get("SelectedRows") || [];
				this.set("SelectedRows", Ext.Array.merge(selectedRows, rowKeys));
			}
		},

		/**
		 * ######### ######### / ######## ###### # #######.
		 * @protected
		 * @return {Boolean} ######### ######## ######.
		 */
		isAnySelected: function() {
			const selectedRows = this.getSelectedItems();
			return !Ext.isEmpty(selectedRows);
		},

		/**
		 * ######### ######### / ######## ###### # #######.
		 * @protected
		 * @return {Boolean} ######### ########.
		 */
		isSingleSelected: function() {
			const selectedRows = this.getSelectedItems();
			return !Ext.isEmpty(selectedRows) && selectedRows.length === 1;
		},

		/**
		 * #########, ###### ## ###### ######### ## ###### # #### ###### ########.
		 * @protected
		 * @return {Boolean} ######### ########.
		 */
		isExcludeFromFolderButtonVisible: function() {
			const currentFolder = this.get("CurrentFolder");
			return currentFolder && currentFolder.folderType
					? (currentFolder.folderType.value === ConfigurationConstants.Folder.Type.General)
					: false;
		},

		/**
		 * ####### ## ####### ######### ######.
		 * @protected
		 * @param {Array} records ######### ######.
		 */
		removeGridRecords: function(records) {
			if (records && records.length) {
				const gridData = this.getGridData();
				const activeRow = this.getActiveRow();
				const activeRowId = !this.Ext.isEmpty(activeRow) ? activeRow.get("Id") : null;
				records.forEach(function(record) {
					gridData.removeByKey(record);
					if (activeRowId === record) {
						this.setActiveRow(null);
					}
				}, this);
				this.set("IsGridEmpty", !gridData.getCount());
			}
		},

		/**
		 * @private
		 */
		_initSortColumnsCollection: function () {
			const sortColumns = this.get("SortColumns");
			if (!sortColumns) {
				this.set("SortColumns", Ext.create("Terrasoft.BaseViewModelCollection"));
			}
		},

		/**
		 * Fill detail sort menu.
		 * @protected
		 */
		initSortActionItems: function() {
			this._initSortColumnsCollection();
			const sortColumns = this.get("SortColumns");
			sortColumns.clear();
			const gridColumns = this.mixins.GridUtilities.getProfileColumns.call(this);
			this.Terrasoft.each(gridColumns, function(column, columnName) {
				sortColumns.addItem(this.getButtonMenuItem({
					Caption: {bindTo: this.name + columnName + "_SortedColumnCaption"},
					Tag: columnName,
					Click: {bindTo: "sortGrid"}
				}));
			}, this);
			this.updateSortColumnsCaptions(this.get("Profile"));
		},

		/**
		 * ############# ########## ####### # #######.
		 * @protected
		 * @param {Object} columnsSettingsProfile ####### #######.
		 */
		updateSortColumnsCaptions: function(columnsSettingsProfile) {
			const propertyName = this.getDataGridName();
			columnsSettingsProfile = propertyName ? columnsSettingsProfile[propertyName] : columnsSettingsProfile;
			columnsSettingsProfile = columnsSettingsProfile || {};
			const gridsColumnsConfig = columnsSettingsProfile.isTiled
					? columnsSettingsProfile.tiledConfig
					: columnsSettingsProfile.listedConfig;
			if (gridsColumnsConfig) {
				const columnsConfig = this.Ext.decode(gridsColumnsConfig);
				for (let i = 0; i < columnsConfig.items.length; i++) {
					const cell = columnsConfig.items[i];
					const columnKey = cell.bindTo;
					let caption = this.getProfileColumnCaption(cell);
					caption = this.getColumnCaption(
							caption, cell.orderDirection
					);
					if (!Ext.isEmpty(cell.orderDirection)) {
						this.set("SortColumnIndex", i);
						this.set("GridSortDirection", cell.orderDirection);
					}
					this.set(this.name + columnKey + "_SortedColumnCaption", caption);
				}
			}
		},

		/**
		 * Returns column caption.
		 * @protected
		 * @param {Object} config Column configuration information.
		 * @return {String}
		 */
		getProfileColumnCaption: function(config) {
			const profile = this.get("Profile");
			if (this.Terrasoft.ColumnUtilities.isProfileCultureEqualsUserCulture(profile)) {
				return config.caption;
			}
			const viewModelColumn = this.getColumnByName(config.bindTo || config.name);
			const defaultCaption = config.caption || Terrasoft.emptyString;
			return viewModelColumn ? viewModelColumn.caption : defaultCaption;
		},

		/**
		 * Return grid utilities resource.
		 * @private
		 * @return {Object} Grid utilities resource.
		 */
		getGridUtilitiesResources: function() {
			return resources;
		},

		/**
		 * ######## ######### ####### # ############ ########## ### ######### ######## #### ##########.
		 * @protected
		 * @param {String} caption #########.
		 * @param {Terrasoft.OrderDirection} orderDirection ########### ##########.
		 * @return {String} ######### #######.
		 */
		getColumnCaption: function(caption, orderDirection) {
			const resources = this.getGridUtilitiesResources();
			if (!orderDirection || orderDirection === "") {
				return caption;
			}
			if (orderDirection === Terrasoft.OrderDirection.ASC) {
				caption += " (" + resources.localizableStrings.AscendingDirectionCaption + ")";
			} else {
				caption += " (" + resources.localizableStrings.DescendingDirectionCaption + ")";
			}
			return caption;
		},

		/**
		 * Saves the registry columns profile.
		 * @protected
		 * @param {Object} viewColumnsSettingsProfile Profile with customized columns.
		 * @param {Object} notSaveToProfile The flag for saving the profile in the database.
		 */
		setColumnsProfile: function(viewColumnsSettingsProfile, notSaveToProfile) {
			const profile = this.get("Profile");
			if (notSaveToProfile !== true) {
				const gridName = this.getDataGridName();
				if (profile[gridName]) {
					const profileKey = profile[gridName].key;
					Terrasoft.utils.saveUserProfile(profileKey, viewColumnsSettingsProfile, false);
				}
			}
			this.set("Profile", viewColumnsSettingsProfile);
		},

		/**
		 * Modifies the sort in the registry profile.
		 * @protected
		 * @param {Object} config An object containing a tag, a column index, a profile.
		 */
		changeSorting: function(config) {
			let tag = config.tag;
			const index = config.index;
			const fullSettingsProfile = config.columnsSettingsProfile;
			const propertyName = this.getDataGridName();
			const entitySchema = this.getGridEntitySchema();
			const columnsSettingsProfile = propertyName ? fullSettingsProfile[propertyName] : fullSettingsProfile;
			if (Ext.isEmpty(tag)) {
				tag = this.getSortColumnByIndex(index, columnsSettingsProfile);
			}
			let column = entitySchema.columns[tag];
			if (!column) {
				column = this.Ext.create("Terrasoft.EntityQueryColumn", {
					columnPath: tag
				});
				column.name = tag;
			}
			if (columnsSettingsProfile) {
				let gridsColumnsConfig = columnsSettingsProfile.isTiled
						? columnsSettingsProfile.tiledConfig
						: columnsSettingsProfile.listedConfig;
				if (gridsColumnsConfig) {
					const columnsConfig = this.Ext.decode(gridsColumnsConfig);
					for (let i = 0; i < columnsConfig.items.length; i++) {
						const cell = columnsConfig.items[i];
						const columnKey = cell.bindTo;
						if (columnKey === column.name) {
							cell.orderDirection = this.getColumnSortDirection(
									cell.orderDirection, column.dataValueType
							);
							cell.orderPosition = 1;
							this.set("SortColumnIndex", i);
							this.set("GridSortDirection", cell.orderDirection);
						} else {
							cell.orderDirection = "";
							cell.orderPosition = "";
						}
						let caption = this.getProfileColumnCaption(cell);
						caption = this.getColumnCaption(
								caption, cell.orderDirection
						);
						this.set(this.name + columnKey + "_SortedColumnCaption", caption);
					}
					gridsColumnsConfig = this.Ext.encode(columnsConfig);
					if (columnsSettingsProfile.isTiled) {
						columnsSettingsProfile.tiledConfig = gridsColumnsConfig;
					} else {
						columnsSettingsProfile.listedConfig = gridsColumnsConfig;
					}
				}
			}
			this.setColumnsProfile(fullSettingsProfile);
		},

		/**
		 * ######## ####### ## #######.
		 * @protected
		 * @param {Number} index ###### #######.
		 * @param {Object} columnsSettingsProfile #######.
		 * @return {String} ### #######.
		 */
		getSortColumnByIndex: function(index, columnsSettingsProfile) {
			let column;
			let columnName;
			const columnsConfig = columnsSettingsProfile && columnsSettingsProfile.listedConfig;
			if (!Ext.isEmpty(columnsConfig)) {
				const columns = this.Ext.decode(columnsConfig);
				column = columns.items[index];
				columnName = column.bindTo;
			}
			return columnName;
		},

		/**
		 * ######## ########### ########## # ########### ## ####.
		 * @protected
		 * @param {Terrasoft.core.enums.OrderDirection} orderDirection ########### ##########.
		 * @param {Terrasoft.DataValueType} dataValueType ### ###### #######.
		 * @return {Terrasoft.OrderDirection} ########### ##########.
		 */
		getColumnSortDirection: function(orderDirection, dataValueType) {
			if (orderDirection && orderDirection !== "") {
				orderDirection = (orderDirection === Terrasoft.OrderDirection.ASC)
						? Terrasoft.OrderDirection.DESC
						: Terrasoft.OrderDirection.ASC;
			} else if (dataValueType === Terrasoft.DataValueType.TEXT ||
						dataValueType === Terrasoft.DataValueType.LOOKUP) {
					orderDirection = Terrasoft.OrderDirection.ASC;
				} else if (dataValueType === Terrasoft.DataValueType.INTEGER ||
						dataValueType === Terrasoft.DataValueType.FLOAT ||
						dataValueType === Terrasoft.DataValueType.MONEY ||
						dataValueType === Terrasoft.DataValueType.DATE_TIME ||
						dataValueType === Terrasoft.DataValueType.DATE ||
						dataValueType === Terrasoft.DataValueType.TIME ||
						dataValueType === Terrasoft.DataValueType.BOOLEAN) {
					orderDirection = Terrasoft.OrderDirection.DESC;
				} else {
					orderDirection = Terrasoft.OrderDirection.ASC;
				}
			return orderDirection;
		},

		/**
		 * ########## #### #######.
		 * @protected
		 * @virtual
		 * @return {String} ####.
		 */
		getProfileKey: this.Ext.emptyFn,

		/**
		 * ########## ### ####### #######, ############ ### #### ### ######### ######## ## #######.
		 * @protected
		 * @return {String} ### ####### #######.
		 */
		getDataGridName: function() {
			return "DataGrid";
		},

		/**
		 * ########## ###### #######.
		 * @protected
		 * @return {*|Component} ###### #######.
		 */
		getCurrentGrid: function() {
			return this.Ext.getCmp(this.name + "DataGridGrid");
		},

		/**
		 * #########, ######### ###### ### ###.
		 * @protected
		 * @return {Boolean}
		 */
		getIsCurrentGridRendered: function() {
			const currentGrid = this.getCurrentGrid();
			return currentGrid && currentGrid.rendered;
		},

		/**
		 * Applies default profile config by property name.
		 * @protected
		 * @returns {Object} Default profile config by profile property name.
		 */
		applyDefaultGridProfile: Terrasoft.emptyFn,

		/**
		 * Resets grid column bindings.
		 * @param {Terrasoft.controls.Grid} grid Grid item instance.
		 * @private
		 */
		_resetGridColumnBindings: function(grid) {
			if (!grid || !Ext.isFunction(grid.resetColumnBindings)) {
				return;
			}
			const profile = this.get("Profile");
			const propertyName = this.getDataGridName();
			const gridProfile = (propertyName ? profile[propertyName] : profile) ||
				this.applyDefaultGridProfile();
			if (!Terrasoft.isEmptyObject(gridProfile)) {
				const viewGenerator = Ext.create("Terrasoft.ViewGenerator", {schemaProfile: profile});
				viewGenerator.viewModelClass = this;
				const columnConfig = gridProfile.type === Terrasoft.GridType.LISTED
					? this._getConvertedListedConfig(Terrasoft.decode(gridProfile.listedConfig), viewGenerator)
					: this._getConvertedTiledConfig(Terrasoft.decode(gridProfile.tiledConfig), viewGenerator,
						propertyName);
				Ext.apply(grid, columnConfig);
				grid.resetColumnBindings(columnConfig && columnConfig.columnsConfig);
			}
		},

		/**
		 * Converts register view to column configuration.
		 * @protected
		 * @param {Boolean} doReRender Is rerender required.
		 */
		reloadGridColumnsConfig: function(doReRender) {
			const performanceManagerLabel = this.sandbox.id + "_reloadGridColumnsConfig";
			performanceManager.start(performanceManagerLabel);
			try {
				const grid = this.getCurrentGrid();
				if (!grid) {
					return;
				}
				this._resetGridColumnBindings(grid);
				if (doReRender) {
					grid.clear();
					grid.prepareCollectionData();
					if (grid.rendered) {
						grid.reRender();
					}
				}
			} finally {
				performanceManager.stop(performanceManagerLabel);
			}
		},

		/**
		 * Returns default entity profile.
		 * @return {Object} Entity profile.
		 */
		generateEntityProfile: function() {
			const entitySchema = this.getGridEntitySchema();
			if (entitySchema) {
				return DefaultProfileHelper.getEntityProfile(this.getProfileKey(),
						entitySchema.name, this.Terrasoft.GridType.LISTED);
			} else {
				return {};
			}
		},

		/**
		 * ######## ##### actualizeListedGridConfig # viewGenerator.
		 * @param {Terrasoft.configuration.ViewGenerator} viewGenerator ######### #############.
		 * @param {Object} gridConfig ############ #######.
		 */
		actualizeListedGridConfig: function(viewGenerator, gridConfig) {
			viewGenerator.actualizeListedGridConfig(gridConfig);
		},

		/**
		 * ######## ##### actualizeTiledGridConfig # viewGenerator.
		 * @param {Terrasoft.configuration.ViewGenerator} viewGenerator ######### #############.
		 * @param {Object} gridConfig ############ #######.
		 */
		actualizeTiledGridConfig: function(viewGenerator, gridConfig) {
			viewGenerator.actualizeTiledGridConfig(gridConfig);
		},

		/**
		 * ######### ###### ######## ###### ### ######## ########.
		 * @protected
		 */
		switchActiveRowActions: function() {
			const grid = this.getCurrentGrid();
			if (!grid) {
				return;
			}
			const activeRowActions = grid.activeRowActions;
			if (activeRowActions) {
				const schemaActiveRowActions = this.get("ActiveRowActions");
				if (!schemaActiveRowActions) {
					this.set("ActiveRowActions", activeRowActions);
				}
			}
			if (this.get("IsCardVisible") === true) {
				grid.activeRowActions = [];
			} else {
				grid.activeRowActions = this.get("ActiveRowActions");
			}
		},

		/**
		 * ############ ######, ##### #### ##### ######## ######.
		 * @protected
		 */
		ensureActiveRowVisible: function() {
			const grid = this.getCurrentGrid();
			const activeRow = this.get("ActiveRow");
			if (grid && activeRow) {
				const activeRowDom = grid.getDomRow(activeRow);
				const el = activeRowDom && activeRowDom.dom;
				if (el) {
					Terrasoft.scrollIntoView(el, false);
				}
			}
		},

		/**
		 * Opens grid columns settings module.
		 * @protected
		 */
		openGridSettings: function() {
			const gridSettingsId = this.sandbox.id + "_CardModuleV2_GridSettingsPage";
			this.sandbox.subscribe("GetGridSettingsInfo", this.getGridSettingsInfo, this, [gridSettingsId]);
			const params = this.sandbox.publish("GetHistoryState");
			this.sandbox.publish("PushHistoryState", {
				hash: params.hash.historyState,
				silent: true
			});
			this.sandbox.loadModule("CardModuleV2", this.getGridSettingsModuleConfig(gridSettingsId));
			this.sandbox.subscribe("GridSettingsChanged", function(args) {
				const gridData = this.getGridData();
				gridData.clear();
				if (args && args.newProfileData) {
					this.setColumnsProfile(args.newProfileData, true);
				}
				this.set("GridSettingsChanged", true);
				this.initSortActionItems();
			}, this, [gridSettingsId]);
		},

		/**
		 * Gets config of the grid settings module.
		 * @protected
		 * @param {String} gridSettingsId Id of the grid settings page.
		 * @return {Object} Config of the grid settings module.
		 */
		getGridSettingsModuleConfig: function(gridSettingsId) {
			return {
				renderTo: "centerPanel",
				id: gridSettingsId,
				keepAlive: true,
				instanceConfig: {
					schemaName: "GridSettingsPage",
					isSchemaConfigInitialized: true
				}
			};
		},

		/**
		 * Returns params of opening page grid settings.
		 * @protected
		 * @return {Object} Params of opening page grid settings.
		 */
		getGridSettingsInfo: function() {
			const moduleName = this.sandbox.moduleName;
			const workAreaMode = this.getHistoryStateInfo().workAreaMode;
			const isEditable = this.getIsEditable();
			const entitySchema = this.getGridEntitySchema();
			const isSingleTypeMode =
					((moduleName !== "DetailModuleV2" && workAreaMode === ConfigurationEnums.WorkAreaMode.COMBINED) ||
							isEditable);
			return {
				baseGridType: isEditable ? this.Terrasoft.GridType.LISTED : this.Terrasoft.GridType.TILED,
				isSingleTypeMode: isSingleTypeMode,
				entitySchemaName: entitySchema.name,
				entitySchema: entitySchema,
				profileKey: this.getProfileKey(),
				propertyName: this.getDataGridName(),
				notFoundColumns: this.notFoundColumns,
				entityColumns: entitySchema.columns
			};
		},

		/**
		 * ########## ######## ###### ###### ############# ############# ####### ## ########### #######.
		 * @protected
		 * @return {String} ######## ###### ###### #############.
		 */
		getGridRowViewModelClassName: function(config) {
			if (this.getIsEditable()) {
				return this.getEditableGridRowViewModelClassName(config);
			} else {
				return "Terrasoft.BaseGridRowViewModel";
			}
		},

		/**
		 * ########## ######## ##### ### ###### ############ ######## ############# #######.
		 * @protected
		 * @return {String} ######## ##### ###### #############.
		 */
		getDefaultConfigurationGridItemSchemaName: function() {
			return "Page" + this.getGridEntitySchemaName();
		},

		/**
		 * ########## ######## ###### ###### ############# ############# ####### ## ########### #######.
		 * @protected
		 * @return {String} ######## ###### ###### #############.
		 */
		getEditableGridRowViewModelClassName: function(config) {
			if (!config) {
				return null;
			}
			let className = "Terrasoft.BaseConfigurationGridRowViewModel";
			const entitySchemaName = this.getGridEntitySchemaName();
			const entityStructure = Terrasoft.configuration.EntityStructure[entitySchemaName];
			const rawData = config.rawData;
			const typeColumn = this.getTypeColumn(entitySchemaName);
			let schemaName = null;
			let pages = [];
			if (entityStructure) {
				pages = entityStructure.pages;
			} else {
				pages.push({cardSchema: this.getDefaultConfigurationGridItemSchemaName()});
			}
			this.Terrasoft.each(pages, function(page) {
				if (typeColumn) {
					const path = typeColumn.path;
					if (rawData.hasOwnProperty(path)) {
						const typeColumnValue = rawData[path].value;
						if (page.UId === typeColumnValue) {
							schemaName = page.cardSchema;
						}
					}
				} else {
					schemaName = page.cardSchema;
				}
			}, this);
			if (schemaName) {
				className = "Terrasoft." + schemaName + "ConfigurationGridRow" + entitySchemaName + "ViewModel";
			}
			return className;
		},

		/**
		 * ########## ######## ###### ###### ############# ############# ####### ## ########### #######.
		 * @protected
		 * @param {Object} config
		 * @param {Object} config.rawData ######## #######.
		 * @param {Object} config.rowConfig #### #######.
		 * @return {Object} ######## ###### ###### #############.
		 */
		getGridRowViewModelConfig: function(config) {
			const gridRowViewModelConfig = {
				entitySchema: this.getGridEntitySchema(),
				rowConfig: config.rowConfig,
				values: config.rawData,
				isNew: false,
				isDeleted: false
			};
			if (this.getIsEditable()) {
				this.Ext.apply(gridRowViewModelConfig, {
					Ext: this.Ext,
					Terrasoft: this.Terrasoft,
					sandbox: this.sandbox
				});
				this.Ext.apply(gridRowViewModelConfig.values, {
					IsEntityInitialized: true
				});
			}
			return gridRowViewModelConfig;
		},

		/**
		 * ######## ######## ########## ######## ######.
		 * @protected
		 */
		hideActiveRowActions: function() {
			const grid = this.getCurrentGrid();
			if (!grid) {
				return;
			}
			const activeRowActions = grid.activeRowActions;
			if (activeRowActions) {
				const schemaActiveRowActions = this.get("ActiveRowActions");
				if (!schemaActiveRowActions) {
					this.set("ActiveRowActions", activeRowActions);
				}
			}
			grid.activeRowActions = [];
		},

		/**
		 * ########## ######## ########## ######## ######.
		 * @protected
		 */
		showActiveRowActions: function() {
			const grid = this.getCurrentGrid();
			if (!grid) {
				return;
			}
			grid.activeRowActions = this.get("ActiveRowActions");
		},

		/**
		 * ########## ######## ######.
		 * @protected
		 * @return {Terrasoft.BaseViewModel} ######## ######.
		 */
		findActiveRow: function() {
			const selectedItems = this.getSelectedItems();
			if (this.Ext.isEmpty(selectedItems)) {
				return null;
			}
			const primaryColumnValue = selectedItems[0];
			if (primaryColumnValue) {
				const gridData = this.getGridData();
				if (gridData.contains(primaryColumnValue)) {
					return gridData.get(primaryColumnValue);
				}
			}
		},

		/**
		 * ########## True, #### ###### #############.
		 * @protected
		 * @return {Boolean} True, #### ###### #############.
		 */
		getIsEditable: function() {
			return (this.get("IsEditable") === true);
		},

		/**
		 * ############# ######## ########, ############# ## ##, ### ###### #############.
		 * @param {Boolean} value ######## ########.
		 */
		setIsEditable: function(value) {
			this.set("IsEditable", value);
		},

		/**
		 * ############## ###### ######### ######### #######.
		 * @protected
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ###### ######### ####### ######### ######.
		 */
		initGridRowViewModel: function(callback, scope) {
			if (this.getIsEditable()) {
				this.initEditableGridRowViewModel(callback, scope);
			} else {
				callback.call(scope);
			}
		},

		/**
		 * ############# ######## ######.
		 * @protected
		 */
		setActiveRow: function(value) {
			this.set("ActiveRow", value);
		},

		/**
		 * ######### ############ ### ################# ######### # ###### #######.
		 * @protected
		 */
		prepareEmptyGridMessageConfig: Terrasoft.emptyFn,

		/**
		 * Deselects rows.
		 * @protected
		 */
		deselectRows: function() {
			this.unSetSelectAllMode();
			this.set("ActiveRow", null);
			this.set("SelectedRows", []);
		},

		/**
		 * ########### ## ####### ######### ######## ### ########## ########.
		 */
		subscribeFiltersChanged: function() {
			const filterModulesIds = this.getFilterModulesIds();
			this.sandbox.subscribe("UpdateFilter", function(filterItem) {
				this.onFilterUpdate(filterItem.key, filterItem.filters, filterItem.filtersValue);
			}, this, filterModulesIds);
		},

		/**
		 * ########### ## ########## # ######## # ####### ######## ######.
		 */
		subscribeGetModuleSchema: function() {
			const quickFilterModuleId = this.getQuickFilterModuleId();
			this.sandbox.subscribe("GetModuleSchema", function() {
				const filterDefaultColumnName = this.getFilterDefaultColumnName();
				const isShortFilterVisible = this.getShortFilterVisible();
				if (!Ext.isEmpty(filterDefaultColumnName) || isShortFilterVisible) {
					return {
						entitySchema: this.getGridEntitySchema(),
						filterDefaultColumnName: filterDefaultColumnName,
						isShortFilterVisible: isShortFilterVisible
					};
				} else {
					return this.getGridEntitySchema();
				}
			}, this, [quickFilterModuleId]);
		},

		/**
		 * ######### ####### ############# ######### ########.
		 * @obsolete
		 * @return {Boolean} #######, ############ ######### ######## ### ###.
		 */
		ignoreFilters: function() {
			return false;
		},

		/**
		 * ########## ####### ####### # ######.
		 */
		onFilterUpdate: function(filterKey, filterItem, filtersValue) {
			if (this.ignoreFilters()) {
				return;
			}
			this.set("IsClearGridData", true);
			this.deselectRows();
			this.setFilter(filterKey, filterItem, filtersValue);
			this.setAfterFiltersUpdateTimeout();
		},

		/**
		 * ############# ######## ##### ########### ########.
		 * @private
		 */
		setAfterFiltersUpdateTimeout: function() {
			if (this.filtersUpdateTimeoutId) {
				clearTimeout(this.filtersUpdateTimeoutId);
				this.filtersUpdateTimeoutId = null;
			}
			this.filtersUpdateTimeoutId = this.Ext.defer(this.afterFiltersUpdated, this.filtersUpdateDelay, this);
		},

		/**
		 * #######, ####### ########## ##### ######### ########.
		 * @virtual
		 */
		afterFiltersUpdated: this.Terrasoft.emptyFn,

		/**
		 * ########## ############# ###### ####### ##########.
		 * @protected
		 * @return {String} ############# ######.
		 */
		getQuickFilterModuleId: function() {
			return this.sandbox.id + "_QuickFilterModuleV2";
		},

		/**
		 * Gets filter modules identifiers.
		 * @protected
		 * @virtual
		 * @return {Array}
		 */
		getFilterModulesIds: function() {
			return [this.getQuickFilterModuleId()];
		},

		/**
		 * ########## ### ####### ### ########## ## #########.
		 * @virtual
		 * @return {String} ### #######.
		 */
		getFilterDefaultColumnName: function() {
			let primaryDisplayColumnName = null;
			const entitySchema = this.getGridEntitySchema();
			if (!Ext.isEmpty(entitySchema)) {
				primaryDisplayColumnName = entitySchema.primaryDisplayColumnName;
			}
			return primaryDisplayColumnName;
		},

		/**
		 * ########## ####### ########### ####### ### ########### ####.
		 * @virtual
		 * @return {Boolean} ####### ########### ####### ### ########### ####.
		 */
		getShortFilterVisible: function() {
			return false;
		},

		/**
		 * Update loaded data before loading in grid.
		 * @protected
		 * @virtual
		 * @param {Object} response Result of loading data ESQ execution.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		updateLoadedGridData: function(response, callback, scope) {
			callback.call(scope, response);
		},

		/**
		 * Closes mini page.
		 * @protected
		 */
		closeMiniPage: function() {
			if (Terrasoft.MiniPageListener) {
				Terrasoft.MiniPageListener.close();
			}
		},

		// region Methods: Pubic

		/**
		 * ######### ############ ############# ######.
		 * @public
		 */
		reloadGridData: function() {
			const activeRow = this.get("ActiveRow");
			this.set("ActiveRowBeforeReload", activeRow);
			this.set("IsClearGridData", true);
			this.loadGridData();
		}

		// endregion

	});

	return Ext.create("Terrasoft.configuration.mixins.GridUtilities");
});


