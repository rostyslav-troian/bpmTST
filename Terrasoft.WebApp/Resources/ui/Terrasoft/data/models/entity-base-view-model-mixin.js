Ext.define("Terrasoft.core.mixins.EntityBaseViewModelMixin", {
	extend: "Terrasoft.core.BaseObject",
	alternateClassName: "Terrasoft.EntityBaseViewModelMixin",

	/**
	 * Base entity schema reference.
	 * @type {Terrasoft.BaseEntitySchema}
	 */
	entitySchema: null,

	/**
	 * Unique identifier column name.
	 * @type {String}
	 */
	primaryColumnName: "",

	/**
	 * Primary image column name.
	 * @type {String}
	 */
	primaryImageColumnName: "",

	/**
	 * Display value column name.
	 * @type {String}
	 */
	primaryDisplayColumnName: "",

	/**
	 * Delete query instance.
	 * @private
	 * @type {Terrasoft.DeleteQuery}
	 */
	deleteQuery: null,

	/**
	 * Insert query instance.
	 * @private
	 * @type {Terrasoft.InsertQuery}
	 */
	insertQuery: null,

	/**
	 * Update query instance.
	 * @private
	 * @type {Terrasoft.UpdateQuery}
	 */
	updateQuery: null,

	/**
	 * Indicates whether view model entities is loading.
	 * @private
	 * @type {Boolean}
	 */
	_isLoading: false,

	//region Methods: Private

	/**
	 * @private
	 */
	_findPrimaryDataModel: function() {
		return this.dataModelCollection && this.dataModelCollection.findPrimary();
	},

	/**
	 * Creates and initializes delete query {@link #deleteQuery}
	 * @private
	 * @return {Terrasoft.DeleteQuery}
	 */
	getDeleteQuery: function() {
		return this._findPrimaryDataModel().getDeleteQuery();
	},

	/**
	 * Creates and initializes insert query {@link #insertQuery}
	 * @private
	 * @return {Terrasoft.InsertQuery}
	 */
	getInsertQuery: function() {
		return this._findPrimaryDataModel().getInsertQuery();
	},

	/**
	 * Creates and initializes update query {@link #updateQuery}
	 * @private
	 * @return {Terrasoft.UpdateQuery}
	 */
	getUpdateQuery: function() {
		return this._findPrimaryDataModel().getUpdateQuery(this.get("IsProcessMode"));
	},

	/**
	 * Sets the column values from the entity.
	 * @private
	 * @param {Terrasoft.BaseViewModel} entity An instance of an entity.
	 * @param {Object} options
	 */
	setColumnValues: function(entity, options) {
		Terrasoft.each(this.columns, function(column, columnName) {
			if (entity.columns[columnName] && (column.type === Terrasoft.ViewModelColumnType.ENTITY_COLUMN) &&
				(column.isCollection !== true)) {
				this.setColumnValue(columnName, entity.get(columnName), options);
			}
		}, this);
	},

	/**
	 * Gets the entitySchema column corresponding to the model column.
	 * @private
	 * @deprecated
	 * @param {String} modelColumnName Name of the view model column.
	 * @return {Object} column The entitySchema column.
	 */
	getSafeEntityColumn: function(modelColumnName) {
		window.console.warn(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
			"getSafeEntityColumn", "findEntityColumn"));
		return this.findEntityColumn(modelColumnName);
	},

	/**
	 * Handles result of lookup query.
	 * @private
	 * @param {Object} config Request config.
	 * @param {Object} response Response from lookup query.
	 */
	getLookupDataCallback: function(config, response) {
		this.removeLookupDataRequestInstanceId(config && config.columnName);
		this.isListFullyLoaded = !response.collection.getCount();
		var objects = {};
		var viewModelCollection = response.collection;
		var params = {
			collection: viewModelCollection,
			columnName: config.columnName,
			filterValue: config.filterValue,
			isLookupEdit: config.isLookupEdit,
			objects: objects
		};
		this.onLookupDataLoaded(params);
		config.list.loadAll(objects);
		Ext.callback(config.callback, config.scope || this);
	},

	/**
	 * Returns display values for default values of entitySchema lookup columns.
	 * @private
	 * @param {Object} entityColumns Columns of the entity with default values.
	 * @param {Function} callback Callback-function.
	 * @param {Object} scope Callback execution scope.
	 */
	_getLookupColumnsDefaultDisplayValues: function(entityColumns, callback, scope) {
		if (!Terrasoft.useStaticFileContent) {
			Ext.callback(callback, scope || this, [entityColumns]);
			return;
		}
		var batch = this._getLookupDisplayValueByPrimaryColumnBatchQuery(entityColumns);
		if (Ext.isEmpty(batch.queries)) {
			callback.call(scope, entityColumns);
			return;
		}
		batch.execute(function(response) {
			if (response && response.success) {
				Terrasoft.each(batch.queriesMap, function(esqIndex, columnName) {
					var entityColumn = this.findEntityColumn(columnName);
					var displayValueResult = response.queryResults[esqIndex] &&
						response.queryResults[esqIndex].rows[0] && response.queryResults[esqIndex].rows[0].displayValue;
					if (displayValueResult) {
						entityColumn.defaultValue.value.displayValue = displayValueResult;
					} else {
						entityColumn.defaultValue.value.displayValue = Terrasoft.emptyString;
					}
				}, this);
			}
			callback.call(scope, entityColumns);
		}, this);
	},

	/**
	 * Gets entitySchema columns which have default values.
	 * @param {String|null} modelName Data model name.
	 * @private
	 * @return {Object} entitySchema columns which have default values.
	 */
	_getEntityColumnsWithDefaultValues: function(modelName) {
		const entityColumns = {};
		Terrasoft.each(this.columns, function(column, columnName) {
			if (column.type !== Terrasoft.ViewModelColumnType.ENTITY_COLUMN) {
				return;
			}
			if (Terrasoft.contains(this.ignoredSystemColumns, column.columnPath)) {
				return;
			}
			if (modelName && column.modelName !== modelName) {
				return;
			}
			const entityColumn = this.findEntityColumn(columnName);
			if (entityColumn && entityColumn.defaultValue) {
				entityColumns[columnName] = entityColumn;
			}
		}, this);
		return entityColumns;
	},

	/**
	 * Gets BatchQuery instance for load primary display column value by primary column value.
	 * @param {Object} entityColumns entitySchema columns which have default values.
	 * @return {Terrasoft.BatchQuery} BatchQuery instance for load primary display column value
	 * by primary column value.
	 */
	_getLookupDisplayValueByPrimaryColumnBatchQuery: function(entityColumns) {
		var batch = Ext.create("Terrasoft.BatchQuery");
		Terrasoft.each(entityColumns, function(column, columnName) {
			var isLookup = Terrasoft.isLookupDataValueType(column.dataValueType) || column.isLookup;
			var defaultValue = column.defaultValue;
			var hasDefaultValue = defaultValue && defaultValue.value && defaultValue.value.value;
			if (hasDefaultValue && isLookup &&
				defaultValue.source === Terrasoft.EntitySchemaColumnDefSource.CONST &&
				!defaultValue.value.displayValue) {
				var esq = this._getLookupDisplayValueByPrimaryColumnQuery(defaultValue.value.value,
					column.referenceSchemaName);
				batch.addNamedQuery(esq, columnName, Terrasoft.emptyFn, this);
			}
		}, this);
		return batch;
	},

	/**
	 * Gets EntitySchemaQuery instance for load primary display column value by primary column value.
	 * @private
	 * @param {String} primaryColumnValue Primary column value.
	 * @param {String} schemaName Root schema name.
	 * @return {Terrasoft.EntitySchemaQuery} EntitySchemaQuery instance for load primary display column value
	 * by primary column value.
	 */
	_getLookupDisplayValueByPrimaryColumnQuery: function(primaryColumnValue, schemaName) {
		var entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
			rootSchemaName: schemaName
		});
		entitySchemaQuery.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "displayValue");
		entitySchemaQuery.enablePrimaryColumnFilter(primaryColumnValue);
		return entitySchemaQuery;
	},

	/**
	 * Sets primary entity model name for user defined entity columns with column path.
	 * @private
	 */
	_setColumnsDataModelName: function() {
		var model = this._findPrimaryDataModel();
		if (model) {
			Terrasoft.each(this.columns, function(column) {
				if (column.type === Terrasoft.ViewModelColumnType.ENTITY_COLUMN &&
					Ext.isEmpty(column.modelName) && !Ext.isEmpty(column.columnPath)) {
					column.modelName = model.name;
				}
			}, this);
		}
	},

	/**
	 * @private
	 */
	_getSaveEntitiesBatchQuery: function() {
		const batch = Ext.create("Terrasoft.BatchQuery");
		const count = this.dataModelCollection.getCount();
		for (let i = count - 1; i > -1; i--) {
			const dataModel = this.dataModelCollection.getByIndex(i);
			const query = this._getSaveEntityQuery(dataModel);
			batch.addNamedQuery(query, dataModel.name, Terrasoft.EmptyFn, this);
		}
		return batch;
	},

	/**
	 * @private
	 */
	_getSaveEntityQuery: function(dataModel) {
		const primaryColumnName = dataModel.getPrimaryColumnName();
		const query = dataModel.getSaveQuery({
			primaryColumnValue: this.get(primaryColumnName),
			changedValues: this.changedValues,
			columns: this.columns,
			isForceUpdate: this.get("IsProcessMode")
		});
		return query;
	},

	/**
	 * @private
	 */
	_loadDataModelEntity: function(dataModel, callback, scope) {
		const primaryColumnValue = this._getDataModelPrimaryColumnValue(dataModel);
		if (Terrasoft.isGUID(primaryColumnValue)) {
			const config = {
				primaryColumnValue: primaryColumnValue,
				columns: this.columns
			};
			dataModel.load(config, function(entity) {
				if (entity) {
					this.setColumnValues(entity, {preventValidation: true});
					this._clearChangedValues(dataModel.name);
				}
				Ext.callback(callback, scope, [entity]);
			}, this);
		} else {
			const modelName = dataModel.name;
			if (!dataModel.isNew) {
				dataModel.isNew = true;
				this._clearAttribute(modelName);
			}
			this._setDefaultValuesForDataModel(modelName, callback, scope);
		}
	},

	/**
	 * @private
	 */
	_getDataModelPrimaryColumnValue: function(dataModel) {
		let primaryColumnValue = null;
		const primaryColumnValueConfig = dataModel.primaryColumnValueConfig;
		if (!primaryColumnValueConfig) {
			return null;
		}
		if (Terrasoft.isGUID(primaryColumnValueConfig)) {
			primaryColumnValue = primaryColumnValueConfig;
		} else {
			const bindTo = primaryColumnValueConfig.bindTo;
			if (Terrasoft.isEmpty(bindTo)) {
				throw new Terrasoft.NotImplementedException({message: "Property \"bindTo\" is not defined"});
			} else {
				const isAttribute = this.columns[bindTo];
				if (isAttribute) {
					const attributeValue = this.get(bindTo);
					primaryColumnValue = Ext.isObject(attributeValue)
						? attributeValue && attributeValue.value
						: attributeValue;
				} else if (Ext.isFunction(this[bindTo])) {
					primaryColumnValue = this[bindTo]();
				} else {
					throw new Terrasoft.ItemNotFoundException({
						message: Ext.String.format(
							Terrasoft.Resources.EntityBaseViewModelMixin.AttributeOrFunctionNotFound, bindTo)
					});
				}
			}
		}
		return primaryColumnValue;
	},

	/**
	 * @private
	 */
	_setLookupValueForParentEntity: function(dataModel) {
		const primaryColumn = this._getDataModelPrimaryColumn(dataModel);
		if (primaryColumn) {
			const primaryAttribute = dataModel.getPrimaryColumnName();
			const displayValueAttribute = dataModel.findPrimaryDisplayColumnName();
			const lookupValue = {
				value: this.get(primaryAttribute),
				displayValue: this.get(displayValueAttribute)
			};
			this.set(primaryColumn.name, lookupValue);
		}
	},

	/**
	 * @private
	 */
	_setLookupValueForParentEntities: function() {
		const count = this.dataModelCollection.getCount();
		for (let i = count - 1; i > -1; i--) {
			const dataModel = this.dataModelCollection.getByIndex(i);
			if (dataModel.isNew) {
				this._setLookupValueForParentEntity(dataModel);
			}
		}
	},

	/**
	 * @private
	 */
	_findDependentDataModels: function(dataModelName) {
		const dataModelCollection = new Terrasoft.Collection();
		this.dataModelCollection.each(function(dataModel) {
			const primaryColumn = this._getDataModelPrimaryColumn(dataModel);
			if (primaryColumn && primaryColumn.modelName === dataModelName) {
				dataModelCollection.add(dataModel.name, dataModel);
				const collection = this._findDependentDataModels(dataModel.name);
				dataModelCollection.loadAll(collection);
			}
		}, this);
		return dataModelCollection;
	},

	/**
	 * @private
	 */
	_getDataModelPrimaryColumn: function(dependentDataModel) {
		const config = dependentDataModel.primaryColumnValueConfig;
		const bindTo = config && config.bindTo;
		const primaryColumn = this.columns[bindTo];
		return primaryColumn && primaryColumn.dataValueType === Terrasoft.DataValueType.LOOKUP
			? primaryColumn
			: null;
	},

	/**
	 * @private
	 */
	_clearAttribute: function(modelName) {
		const columnsWithDefaultValues = this._getEntityColumnsWithDefaultValues(modelName);
		Terrasoft.each(this.columns, function(column, columnName) {
			if (column.modelName === modelName && !columnsWithDefaultValues[columnName]) {
				this.set(columnName, null);
			}
		}, this);
	},

	/**
	 * @private
	 */
	_saveDataModelEntities: function(callback, scope) {
		this._setLookupValueForParentEntities();
		const batch = this._getSaveEntitiesBatchQuery();
		batch.execute(function(response) {
			if (response && response.success) {
				Terrasoft.each(batch.queriesMap, function(esqIndex, name) {
					const dataModel = this.dataModelCollection.get(name);
					dataModel.isNew = false;
				}, this);
				this.changedValues = {};
			}
			Ext.callback(callback, scope || this, [response]);
		}, this);
	},

	/**
	 * @private
	 */
	_loadDataModelEntities: function(config, callback, scope) {
		const entities = [];
		this._isLoading = true;
		const dataModelCollection = config.dataModelCollection || this.dataModelCollection;
		dataModelCollection.eachAsync(function(dataModel, next) {
			this._loadDataModelEntity(dataModel, function(entity) {
				if (entity) {
					entities.push(entity);
				}
				next.call(this);
			}, this);
		}, function() {
			this._isLoading = false;
			Ext.callback(callback, scope, [this]);
		}, this);
	},

	/**
	 * @private
	 */
	_clearChangedValues: function(dataModelName) {
		Terrasoft.each(this.changedValues, function(value, key) {
			const column = this.columns[key];
			if (column && column.modelName === dataModelName) {
				delete this.changedValues[key];
			}
		}, this);
	},

	/**
	 * @private
	 */
	_setDefaultValuesForDataModel: function(modelName, callback, scope) {
		let columnsWithDefaultValues = this._getEntityColumnsWithDefaultValues(modelName);
		columnsWithDefaultValues = this._addLookupListConfig(columnsWithDefaultValues);
		this._getLookupColumnsDefaultDisplayValues(columnsWithDefaultValues, function(entityColumns) {
			this.getDefaultColumnValues(entityColumns, function(columns) {
				Terrasoft.each(columns, function(column, columnName) {
					this.setColumnValue(columnName, column.value);
				}, this);
				Ext.callback(callback, scope, [this]);
			}, this);
		}, this);
	},

	/**
	 * @private
	 */
	_addLookupListConfig: function(columns) {
		Terrasoft.each(columns, function(column) {
			const viewModelColumn = this.columns[column.name];
			if (viewModelColumn && viewModelColumn.lookupListConfig) {
				column.lookupListConfig = viewModelColumn.lookupListConfig;
			}
		}, this);
		return columns;
	},

	/**
	 * @private
	 */
	_getDefaultValuesFromSysSettings: function(entityColumns, sysSettingsToQuery, columnToSettingMap, callback, scope) {
		if (sysSettingsToQuery.length === 0) {
			Ext.callback(callback, scope, [entityColumns]);
			return;
		}
		Terrasoft.SysSettings.querySysSettings(sysSettingsToQuery, function(settings) {
			Terrasoft.each(columnToSettingMap, function(settingName, columnName) {
				if (entityColumns[columnName]) {
					entityColumns[columnName].value = settings[settingName];
				}
			}, this);
			Ext.callback(callback, scope, [entityColumns]);
		}, this);
	},

	/**
	 * @private
	 */
	_onChangedAttributes: function(dataModel) {
		if (!this._isLoading) {
			const dataModelCollection = new Terrasoft.Collection();
			dataModelCollection.add(dataModel.name, dataModel);
			const collection = this._findDependentDataModels(dataModel.name);
			dataModelCollection.loadAll(collection);
			Terrasoft.delay(this._loadDataModelEntities.bind(this, {
				dataModelCollection: dataModelCollection
			}), this, 0);
		}
	},

	/**
	 * @private
	 */
	_findEntitySchemaByModelName: function(modelName) {
		const dataModel = this.dataModelCollection && this.dataModelCollection.find(modelName);
		return dataModel && dataModel.schema;
	},

	/**
	 * @private
	 */
	_getDataModelPrimaryColumnsConfig: function() {
		const config = [];
		if (this.dataModelCollection) {
			this.dataModelCollection.each(function(dataModel) {
				const primaryColumn = this._getDataModelPrimaryColumn(dataModel);
				if (primaryColumn) {
					config.push({
						name: primaryColumn.name,
						dataModel: dataModel
					});
				}
			}, this);
		}
		return config;
	},

	//endregion

	//region Methods: Public

	/**
	 * Initializes primaryColumnName, primaryDisplayColumnName, primaryImageColumnName fields from entity schema,
	 * when it is set to {@link #entitySchema}.
	 */
	initEntitySchemaProperties: function() {
		if (this.entitySchema) {
			this.primaryColumnName = this.entitySchema.primaryColumnName;
			this.primaryDisplayColumnName = this.entitySchema.primaryDisplayColumnName;
			this.primaryImageColumnName = this.entitySchema.primaryImageColumnName;
		}
	},

	/**
	 * Gets the entitySchema column corresponding to the model column.
	 * @param {String} modelColumnName Name of the view model column.
	 * @return {Object} column The entitySchema column.
	 */
	findEntityColumn: function(modelColumnName) {
		var result = null;
		var modelColumn = this.getColumnByName(modelColumnName);
		var columnPath = modelColumn ? modelColumn.columnPath : modelColumnName;
		var modelEntitySchema = modelColumn && this._findEntitySchemaByModelName(modelColumn.modelName);
		var entitySchema = modelEntitySchema || this.entitySchema;
		if (entitySchema && entitySchema.isColumnExist(columnPath)) {
			result = entitySchema.getColumnByName(columnPath);
		}
		return result;
	},

	/**
	 * Sets default values for entitySchema.
	 * @param {Function} callback Callback-function called after default values initialization.
	 * @param {Object} scope Callback execution scope.
	 */
	setDefaultValues: function(callback, scope) {
		scope = scope || this;
		if (Ext.isEmpty(this.dataModelCollection) || this.dataModelCollection.isEmpty()) {
			Ext.callback(callback, scope, [this]);
			return;
		}
		this.dataModelCollection.eachAsync(function(dataModel, next) {
			this._setDefaultValuesForDataModel(dataModel.name, next, this);
		}, function() {
			Ext.callback(callback, scope);
		}, this);
	},

	/**
	 * Adds a macros column that represents primary value column.
	 * @protected
	 * @param {Terrasoft.EntitySchemaQuery} entitySchemaQuery A query to which the column will be added.
	 */
	addPrimaryValueColumn: function(entitySchemaQuery) {
		entitySchemaQuery.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "value");
	},

	/**
	 * Adds a macros column that represents primary display column.
	 * @protected
	 * @param {Terrasoft.EntitySchemaQuery} entitySchemaQuery A query to which the column will be added.
	 */
	addPrimaryDisplayColumn: function(entitySchemaQuery) {
		var primaryDisplayColumn = entitySchemaQuery.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN,
			"displayValue");
		primaryDisplayColumn.orderPosition = 1;
		primaryDisplayColumn.orderDirection = Terrasoft.OrderDirection.ASC;
	},

	/**
	 * Adds columns from lookup list config by a specified column name to a specified entity schema query.
	 * @protected
	 * @param {Terrasoft.EntitySchemaQuery} entitySchemaQuery A query to which the column will be added.
	 * @param {String} columnName ViewModel column name.
	 */
	addListConfigColumns: function(entitySchemaQuery, columnName) {
		const column = this.getColumnByName(columnName);
		const lookupListConfig = column && column.lookupListConfig || {};
		Terrasoft.each(lookupListConfig.columns, function(columnName) {
			if (!entitySchemaQuery.columns.contains(columnName)) {
				entitySchemaQuery.addColumn(columnName);
			}
		});
	},

	/**
	 * Adds a filter for primary display value column.
	 * @protected
	 * @param {Terrasoft.EntitySchemaQuery} entitySchemaQuery A query to be filtered.
	 * @param {String} filterValue A search value to be used in the filter.
	 */
	addLookupQueryFilter: function(entitySchemaQuery, filterValue) {
		var comparisonType = this.getLookupComparisonType();
		var lookupFilter = entitySchemaQuery.createPrimaryDisplayColumnFilterWithParameter(
			comparisonType, filterValue, Terrasoft.DataValueType.TEXT);
		entitySchemaQuery.filters.add("LookupFilter", lookupFilter);
		lookupFilter.isEnabled = Boolean(filterValue);
	},

	/**
	 * Adds columns to a specified entity schema query.
	 * @protected
	 * @param {Terrasoft.EntitySchemaQuery} entitySchemaQuery A query to which the column will be added.
	 * @param {String} columnName ViewModel column name.
	 */
	addLookupQueryColumns: function (entitySchemaQuery, columnName) {
		this.addPrimaryValueColumn(entitySchemaQuery);
		this.addPrimaryDisplayColumn(entitySchemaQuery);
		this.addListConfigColumns(entitySchemaQuery, columnName);
	},

	/**
	 * Checks if column has a proper lookup dataValueType.
	 * @protected
	 * @param {Terrasoft.EntitySchemaColumn} column A column to be checked.
	 * @throws {Terrasoft.UnsupportedTypeException} Will throw if column dataValueType is incorrect.
	 */
	checkColumnLookupType: function(column) {
		var isLookup = (Terrasoft.isLookupDataValueType(column.dataValueType) || column.isLookup);
		if (!isLookup) {
			throw new Terrasoft.UnsupportedTypeException({
				message: Terrasoft.Resources.BaseViewModel.columnUnsupportedTypeException
			});
		}
	},

	/**
	 * Returns a configuration object to be used for creation of the query to a lookup.
	 * @protected
	 * @param {Terrasoft.EntitySchemaColumn} column A lookup column that refers to the schema that will be be used
	 * in the query.
	 * @return {Object} A configuration object for creation of a query to the lookup.
	 */
	getLookupQueryConfig: function(column) {
		if (!column) {
			throw new Terrasoft.ItemNotFoundException();
		}
		this.checkColumnLookupType(column);
		var config = {
			rootSchemaName: column.referenceSchemaName,
			rowCount: Terrasoft.SysSettings.lookupRowCount,
			isPageable: true,
			useRecordDeactivation: true
		};
		return config;
	},

	/**
	 * Returns {@link Terrasoft.EntitySchemaQuery query instance} for load lookup column data.
	 * @param {String} filterValue Filter for primaryDisplayColumn.
	 * @param {String} columnName ViewModel column name.
	 * @return {Terrasoft.EntitySchemaQuery}
	 * @throws {Terrasoft.ItemNotFoundException} Will throw if schema does not contain column with name columnName.
	 * @throws {Terrasoft.UnsupportedTypeException} Will throw if column with name columnName is not lookup.
	 */
	getLookupQuery: function(filterValue, columnName) {
		this.abortLoadLookupDataRequest(columnName);
		const column = this.getColumnByName(columnName);
		const queryConfig = this.getLookupQueryConfig(column);
		const entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", queryConfig);
		this.addLookupQueryColumns(entitySchemaQuery, columnName);
		this.addLookupQueryFilter(entitySchemaQuery, filterValue);
		let pagingParams = this.pagingParams;
		if (pagingParams) {
			this.addPagingParameters(entitySchemaQuery, pagingParams);
			pagingParams = null;
		} else if (Terrasoft.useOffsetFetchPaging) {
			entitySchemaQuery.rowsOffset = 0;
		}
		this.saveLookupDataRequestInstanceId(columnName, entitySchemaQuery.instanceId);
		return entitySchemaQuery;
	},

	/**
	 * Adds params to ESQ to simulate paging.
	 * @protected
	 * @param {Terrasoft.EntitySchemaQuery} entitySchemaQuery The Query to EntitySchema.
	 * @param {Object} config Request parameters.
	 */
	addPagingParameters: function(entitySchemaQuery, config) {
		var hasItems = config && config.list && config.list.getCount();
		if (Terrasoft.useOffsetFetchPaging && hasItems) {
			entitySchemaQuery.rowsOffset = this._getListLength(config.list);
		} else {
			var conditionalValues = entitySchemaQuery.conditionalValues = Ext.create("Terrasoft.ColumnValues");
			if (hasItems) {
				var lastRecord = this.getLastRecord(config.list);
				var primaryColumnDisplayValue = lastRecord.displayValue;
				var primaryColumnValue = lastRecord.value;
				conditionalValues.setParameterValue("displayValue", primaryColumnDisplayValue, Terrasoft.DataValueType.TEXT);
				conditionalValues.setParameterValue("value", primaryColumnValue, Terrasoft.DataValueType.GUID);
			}
		}
	},

	/**
	 * Loads data for lookup column.
	 * @param {String} filterValue Filter for primaryDisplayColumn.
	 * @param {Terrasoft.Collection} list Collection for loaded data.
	 * @param {String} columnName ViewModel column name.
	 * @param {Boolean} isLookupEdit True if lookup, false if combo-box.
	 * @param {Function} [callback] Callback-function.
	 * @param {Object} [scope] Callback execution scope.
	 */
	loadLookupData: function(filterValue, list, columnName, isLookupEdit, callback, scope) {
		if (list) {
			list.clear();
		}
		this.pagingParams = null;
		var config = {
			callback: callback,
			columnName: columnName,
			filterValue: filterValue,
			isLookupEdit: isLookupEdit,
			list: list,
			scope: scope
		};
		var lookupQuery = this.getLookupQuery(filterValue, columnName);
		lookupQuery.getEntityCollection(
			this.getLookupDataCallback.bind(this, config)
		);
	},

	/**
	 * Returns EntitySchemaQuery instance for load predictable lookup column data.
	 * @param {String} filterValue Filter for primaryDisplayColumn.
	 * @param {String} columnName ViewModel column name.
	 * @return {Terrasoft.EntitySchemaQuery} EntitySchemaQuery instance for load predictable lookup column data.
	 */
	getPredictableLookupQuery: function(filterValue, columnName) {
		var esq = this.getLookupQuery(filterValue, columnName);
		this.appendPredictableQueryColumns(esq);
		this.appendPredictableQueryConditions(esq, columnName);
		return esq;
	},

	/**
	 * Loads predictable data for lookup column.
	 * @param {String} filterValue Filter for primaryDisplayColumn.
	 * @param {Terrasoft.Collection} list Collection for loaded data.
	 * @param {String} columnName ViewModel column name.
	 * @param {Boolean} isLookupEdit True if lookup, false if combo-box.
	 * @param {Function} [callback] Callback-function.
	 * @param {Object} [scope] Callback execution scope.
	 */
	loadPredictableData: function(filterValue, list, columnName, isLookupEdit, callback, scope) {
		if (list) {
			list.clear();
		}
		var lookupQuery = this.getPredictableLookupQuery(filterValue, columnName);
		lookupQuery.getEntityCollection(
			this.getLookupDataCallback.bind(this, {
				callback: callback,
				columnName: columnName,
				filterValue: filterValue,
				isLookupEdit: isLookupEdit,
				list: list,
				scope: scope
			})
		);
	},

	/**
	 * Loads data for lookup column with params.
	 * @param {Object} params Query params.
	 * @param {String} columnName ViewModel column name.
	 * @param {Boolean} isLookupEdit True if lookup, false if combo-box.
	 * @param {Function} [callback] Callback-function.
	 * @param {Object} [scope] Callback execution scope.
	 */
	loadLookupDataWithParams: function(params, columnName, isLookupEdit, callback, scope) {
		if (this.isListFullyLoaded) {
			return;
		}
		if (params) {
			var filterValue = params.filterValue || "";
			var list = params.list || {};
			var listView = params.listView || {};
			var config = {
				callback: callback,
				columnName: columnName,
				filterValue: filterValue,
				isLookupEdit: isLookupEdit,
				list: list,
				scope: scope,
				listView: listView
			};
			this.pagingParams = params;
			var lookupQuery = this.getLookupQuery(filterValue, columnName);
			lookupQuery.getEntityCollection(
				this.getLookupDataCallback.bind(this, config)
			);
		}
	},

	/**
	 * Gets the url for the image
	 * @return {String|null} url of the requested image
	 */
	getSchemaImageUrl: function() {
		var imageColumnName, primaryImageColumnValue, imageConfig;
		var entityDataModel = this._findPrimaryDataModel();
		imageColumnName = this.primaryImageColumnName || entityDataModel.getEntityPrimaryImageColumnName();
		primaryImageColumnValue = this.get(imageColumnName);
		if (!primaryImageColumnValue) {
			return null;
		}
		imageConfig = {
			source: Terrasoft.ImageSources.SYS_IMAGE,
			params: {
				primaryColumnValue: primaryImageColumnValue.value
			}
		};
		return Terrasoft.ImageUrlBuilder.getUrl(imageConfig);
	},

	/**
	 * Forms a request to save the entity.
	 * @return  {Terrasoft.BaseQuery|null} Request to save the entity
	 */
	getSaveQuery: function() {
		var query = null;
		if (!this.validate()) {
			return null;
		}
		if (this.isDeleted) {
			throw new Terrasoft.InvalidObjectState();
		}
		var entityDataModel = this._findPrimaryDataModel();
		if (this.isNew) {
			query = this.getInsertQuery();
		} else {
			query = this.getUpdateQuery();
			var primaryColumnValue = this.get(this.primaryColumnName);
			query.enablePrimaryColumnFilter(primaryColumnValue);
		}
		return entityDataModel.getSaveQuery({
			primaryColumnValue: this.get(this.primaryColumnName),
			changedValues: this.changedValues,
			columns: this.columns,
			saveQuery: query,
			isForceUpdate: this.get("IsProcessMode"),
			isNew: this.isNew
		});
	},

	/**
	 * Saves the entity on the server. If the entity already exists, the data will be updated,
	 * otherwise a new entity is added.
	 * @param {Function} callback The function that will be called when a response is received from the server
	 * @param {Object} scope The context in which the callback function is called
	 */
	saveEntity: function(callback, scope) {
		var config = {
			saveQuery: this.getSaveQuery()
		};
		var entityDataModel = this._findPrimaryDataModel();
		entityDataModel.save(config, function(result) {
			if (result.success) {
				this.isNew = false;
				this.changedValues = null;
			}
			Ext.callback(callback, scope || this, [result]);
		}, this);
	},

	/**
	 * Removes the current entity on the server
	 * @param {Function} callback The function that will be called when a response is received from the server
	 * @param {Object} scope The context in which the callback function is called
	 */
	deleteEntity: function(callback, scope) {
		if (this.isNew || this.isDeleted) {
			throw new Terrasoft.InvalidObjectState();
		}
		var entityDataModel = this._findPrimaryDataModel();
		var config = {
			deleteQuery: this.getDeleteQuery(),
			primaryColumnValue: this.get(this.primaryColumnName)
		};
		entityDataModel.deleteEntity(config, function(result) {
			if (result.success) {
				this.isDeleted = true;
			}
			callback.call(scope || this, result);
		}, this);
	},

	/**
	 * Generates an entity select query
	 * @return {Terrasoft.EntitySchemaQuery}
	 */
	getEntitySchemaQuery: function() {
		var model = this._findPrimaryDataModel();
		return model.getEntitySchemaQuery(this.columns);
	},

	/**
	 * Loads data into the model
	 * @param {String} primaryColumnValue Primary key value
	 * @param {Function} callback The function that will be called when a response is received from the server
	 * @param {Object} scope The context in which the callback function is called
	 */
	loadEntity: function(primaryColumnValue, callback, scope) {
		const config = {
			primaryColumnValue: primaryColumnValue,
			entitySchemaQuery: this.getEntitySchemaQuery(),
			columns: this.columns
		};
		const entityDataModel = this._findPrimaryDataModel();
		entityDataModel.load(config, function(entity) {
			if (entity) {
				this.isNew = false;
				this.setColumnValues(entity, {preventValidation: true});
				this.changedValues = {};
			}
			Ext.callback(callback, scope || this, [this]);
		}, this);
	},

	/**
	 * Adds related columns to entity schema query.
	 * @protected
	 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
	 */
	addRelatedEntityColumns: function(esq) {
		const dataModel = this._findPrimaryDataModel();
		if (dataModel) {
			dataModel.addRelatedEntityColumns(esq, this.columns);
		}
	},

	/**
	 * Copies data to the model
	 * @param {String} primaryColumnValue Primary key value
	 * @param {Function} callback The function that will be called when a response is received from the server
	 * @param {Object} scope The context in which the callback function is called
	 */
	copyEntity: function(primaryColumnValue, callback, scope) {
		var config = {
			primaryColumnValue: primaryColumnValue,
			entitySchemaQuery: this.getEntitySchemaQuery()
		};
		var entityDataModel = this._findPrimaryDataModel();
		entityDataModel.copy(config, function(entity) {
			this.setDefaultValues(function() {
				this.setCopyColumnValues(entity);
				Ext.callback(callback, scope || this, [this]);
			}, this);
		}, this);
	},

	/**
	 * Returns entity schema.
	 * @return {Terrasoft.BaseEntitySchema|null}
	 */
	getEntityViewModelEntitySchema: function() {
		var model = this._findPrimaryDataModel();
		var modelSchema = model && model.schema;
		return modelSchema || null;
	},

	/**
	 * Sets entity schema.
	 * @param {Terrasoft.BaseEntitySchema} entitySchema Entity schema.
	 */
	setEntityViewModelEntitySchema: function(entitySchema) {
		if (entitySchema) {
			const entityDataModel = this._findPrimaryDataModel();
			if (entityDataModel && entityDataModel.schema.instanceId === entitySchema.instanceId) {
				return;
			}
			const dataModelName = entitySchema.name || "dataEntityModelKey";
			const dataModelCollection = this.dataModelCollection = Ext.create("Terrasoft.DataModelCollection");
			const config = {};
			config[dataModelName] = {
				entitySchema: entitySchema,
				isPrimary: true
			};
			dataModelCollection.init(config);
			this.initEntitySchemaProperties();
		} else if (this.dataModelCollection && this.dataModelCollection.getCount() > 0) {
			this.dataModelCollection.removeByIndex(0);
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * Saves lookup data request instance id in requesting list by key.
	 * @protected
	 * @param {String} key Request key.
	 * @param {String} instanceId Request instance id.
	 */
	saveLookupDataRequestInstanceId: function(key, instanceId) {
		this.lookupDataRequestInstanceId[key] = instanceId;
	},

	/**
	 * Removes lookup data request instance id from requesting list by key.
	 * @protected
	 * @param {String} key Request key.
	 */
	removeLookupDataRequestInstanceId: function(key) {
		delete this.lookupDataRequestInstanceId[key];
	},

	/**
	 * Aborts lookup data request by requesting item key.
	 * @protected
	 * @param {String} key Requesting item key.
	 */
	abortLoadLookupDataRequest: function(key) {
		var requestId = this.lookupDataRequestInstanceId[key];
		if (requestId) {
			Terrasoft.AjaxProvider.abortRequestByInstanceId(requestId);
			this.removeLookupDataRequestInstanceId(key);
		}
	},

	/**
	 * Appends predictable columns to predictable lookup query.
	 * @protected
	 * @param {Terrasoft.EntitySchemaQuery} esq Predictable lookup query.
	 */
	appendPredictableQueryColumns: Terrasoft.emptyFn,

	/**
	 * Appends predictable query conditions to predictable lookup query.
	 * @protected
	 * @param {Terrasoft.EntitySchemaQuery} esq Predictable lookup query.
	 * @param {String} columnName Column's name, which contains predicted value.
	 */
	appendPredictableQueryConditions: Terrasoft.emptyFn,

	/**
	 * Initializes data models status.
	 * @protected
	 */
	initDataModelsStatus: function() {
		if (this.dataModelCollection) {
			this.dataModelCollection.each(function(dataModel) {
				dataModel.isNew = true;
			}, this);
		}
	},

	/**
	 * Subscribes to change primary column.
	 * @protected
	 */
	subscribeOnChangePrimaryColumn: function() {
		const columnsConfig = this._getDataModelPrimaryColumnsConfig();
		columnsConfig.forEach(function(config) {
			this.on("change:" + config.name, this._onChangedAttributes.bind(this, config.dataModel), this);
		}, this);
	},

	/**
	 * Unsubscribes to change primary column.
	 * @protected
	 */
	unsubscribeOnChangePrimaryColumn: function() {
		const columnsConfig = this._getDataModelPrimaryColumnsConfig();
		columnsConfig.forEach(function(config) {
			this.un("change:" + config.name, this._onChangedAttributes.bind(this, config.dataModel), this);
		}, this);
	},

	/**
	 * Used to load lookup column values considering its business rules.
	 * @protected
	 * @param {Object} columnsToLoad Name and primary column values of columns to load.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback.
	 */
	loadLookupColumnValues: function(columnsToLoad, callback, scope) {
		var batch = Ext.create("Terrasoft.BatchQuery");
		Terrasoft.each(columnsToLoad, function(primaryColumnValue, columnName) {
			var query = this.getLookupQuery(null, columnName);
			query.enablePrimaryColumnFilter(primaryColumnValue);
			batch.addNamedQuery(query, columnName, Terrasoft.emptyFn, this);
		}, this);
		batch.execute(function(response) {
			var results = {};
			if (response && response.success) {
				Terrasoft.each(batch.queriesMap, function(esqIndex, columnName) {
					var queryResults = response.queryResults[esqIndex];
					results[columnName] = queryResults ? queryResults.rows[0] : null;
				}, this);
			}
			Ext.callback(callback, scope || this, [results]);
		}, this);
	},

	/**
	 * @protected
	 * Adds additional properties to entity columns.
	 * @param {Object} entityColumns Columns of the entity.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Scope of callback function.
	 */
	getDefaultColumnValues: function(entityColumns, callback, scope) {
		const sysSettingsToQuery = [];
		const columnValues = Terrasoft.deepClone(entityColumns);
		const columnToSettingMap = {};
		let settingName = "";
		Terrasoft.each(entityColumns, function(column, columnName) {
			const defaultValue = column.defaultValue;
			switch (defaultValue.source) {
				case Terrasoft.EntitySchemaColumnDefSource.CONST:
					columnValues[columnName].value = defaultValue.value;
					break;
				case Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE:
					columnValues[columnName].value = this.getSysDefaultValue(defaultValue.value);
					break;
				case Terrasoft.EntitySchemaColumnDefSource.SETTINGS:
					settingName = defaultValue.value;
					if (!Ext.Array.contains(sysSettingsToQuery, settingName)) {
						sysSettingsToQuery.push(settingName);
					}
					columnToSettingMap[columnName] = settingName;
					break;
				default:
					break;
			}
		}, this);
		this._getDefaultValuesFromSysSettings(columnValues, sysSettingsToQuery, columnToSettingMap,
			function(columnsWithSysSettingsValues) {
				Ext.callback(callback, scope, [columnsWithSysSettingsValues]);
			},
		this);
	}

	//endregion

});
