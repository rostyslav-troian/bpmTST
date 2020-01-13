/**
 */
Ext.define("Terrasoft.model.EntityDataModel", {
	extend: "Terrasoft.DataModel",
	alternateClassName: "Terrasoft.EntityDataModel",

	//region Properties: Private

	/**
	 * Delete query instance.
	 * @private
	 * @type {Terrasoft.DeleteQuery}
	 */
	_deleteQuery: null,

	/**
	 * Insert query instance.
	 * @private
	 * @type {Terrasoft.InsertQuery}
	 */
	_insertQuery: null,

	/**
	 * Update query instance.
	 * @private
	 * @type {Terrasoft.UpdateQuery}
	 */
	_updateQuery: null,

	/**
	 * @private
	 */
	_globalNamespace: "Terrasoft",

	//endregion

	//region Properties: Public

	/**
	 * Base schema reference.
	 * @type {Terrasoft.BaseObject}
	 */
	schema: null,

	/**
	 * Primary column value config or constant value.
	 * @type {Object | String}
	 */
	primaryColumnValueConfig: null,

	/**
	 * Flag that indicates data model is primary.
	 * @type {Boolean}
	 */
	isPrimary: false,

	/**
	 * Indicates a new record that has not yet been stored on the server
	 * @type {Boolean}
	 */
	isNew: true,

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	_isEntityColumn: function(column) {
		return column && this._isCheckModelName(column) && !Ext.isEmpty(column.columnPath) &&
			column.type === Terrasoft.ViewModelColumnType.ENTITY_COLUMN;
	},

	/**
	 * @private
	 */
	_isColumnExists: function(column) {
		return column && this.schema.isColumnExist(column.columnPath);
	},

	/**
	 * @private
	 */
	_isCheckModelName: function(column) {
		return !column.modelName || column.modelName && column.modelName === this.name;
	},

	/**
	 * @private
	 */
	_getColumnDataType: function(column) {
		var dataValueType;
		if (column && !Ext.isEmpty(column.dataValueType)) {
			dataValueType = column.dataValueType;
		} else {
			var entityColumn = this.schema.getColumnByName(column.columnPath);
			dataValueType = entityColumn.dataValueType;
		}
		return dataValueType;
	},

	/**
	 * @private
	 */
	_getEntitySchema: function(entitySchemaName) {
		if (Ext.isEmpty(entitySchemaName)) {
			return;
		}
		var entitySchemaClassName = this._globalNamespace + "." + entitySchemaName;
		return Ext.ClassManager.get(entitySchemaClassName);
	},

	/**
	 * @returns {string}
	 */
	_getRelatedColumnName: function(entityColumn, relatedColumn) {
		return entityColumn + "." + relatedColumn;
	},

	//endregion

	//region Methods: Public
	/**
	 * Creates model instance.
	 * @param {Object} config Configuration object.
	 * @param {String} [config.schemaName] Schema name.
	 * @param {Terrasoft.BaseEntitySchema} [config.schema] Entity schema.
	 * @param {String} [config.name] Data model name.
	 */
	constructor: function(config) {
		this.callParent(arguments);
		if (config) {
			var schemaName = config.schemaName;
			var schema = this.schema = config.schema || this._getEntitySchema(schemaName);
			this.name = config.name || schemaName;
			this.schemaName = schema && schema.name;
		}
	},

	/**
	 * Return primary column name.
	 * @return {String}
	 */
	getPrimaryColumnName: function() {
		const name = this.schema.primaryColumnName;
		return this.getAttributeName(name);
	},

	/**
	 * Find primary column name.
	 * @return {String}
	 */
	findPrimaryDisplayColumnName: function() {
		const name = this.schema.primaryDisplayColumnName;
		return name && this.getAttributeName(name) || null;
	},

	/**
	 * Load data.
	 * @param {Object} config Configuration object.
	 * @param {String} config.primaryColumnValue Primary column value.
	 * @param {Terrasoft.EntitySchemaQuery} [config.entitySchemaQuery] Entity schema query.
	 * @param {Object} [config.columns] Columns.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope for the callback.
	 */
	load: function(config, callback, scope) {
		if (Ext.isEmpty(config.primaryColumnValue)) {
			Ext.callback(callback, scope || this);
			return;
		}
		const entitySchemaQuery = config.entitySchemaQuery || this.getEntitySchemaQuery(config.columns);
		entitySchemaQuery.getEntity(config.primaryColumnValue, function(result) {
			this.isNew = false;
			const entity = result.entity;
			Ext.callback(callback, scope || this, [entity]);
		}, this);
	},

	/**
	 * Copy entity.
	 * @param {Object} config Configuration object.
	 * @param {String} config.primaryColumnValue Primary column value.
	 * @param {Terrasoft.EntitySchemaQuery} [config.entitySchemaQuery] Entity schema query.
	 * @param {Object} [config.columns] Columns.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope for the callback.
	 */
	copy: function(config, callback, scope) {
		var entitySchemaQuery = config.entitySchemaQuery || this.getEntitySchemaQuery(config.columns);
		entitySchemaQuery.getEntity(config.primaryColumnValue, function(result) {
			var entity = result.entity;
			if (!entity) {
				throw new Terrasoft.ItemNotFoundException();
			}
			Ext.callback(callback, scope || this, [entity]);
		}, this);
	},

	/**
	 * Delete entity.
	 * @param {Object} config Configuration object.
	 * @param {String} config.primaryColumnValue Primary column value.
	 * @param {Terrasoft.EntitySchemaQuery} config.deleteQuery Delete query.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope for the callback.
	 */
	deleteEntity: function(config, callback, scope) {
		if (this.schema === null) {
			callback.call(scope || this);
			return;
		}
		var deleteQuery = config.deleteQuery || this.getDeleteQuery();
		try {
			deleteQuery.enablePrimaryColumnFilter(config.primaryColumnValue);
			deleteQuery.execute(function(result) {
				callback.call(scope || this, result);
			}, this);
		} finally {
			deleteQuery.disablePrimaryColumnFilter();
		}
	},

	/**
	 * Returns save query.
	 * @param {Object} config Configuration object.
	 * @param {String} config.primaryColumnValue Primary column value.
	 * @param {Object} config.columns Columns.
	 * @param {Object} config.changedValues Changed values.
	 * @param {Terrasoft.BaseQuery} [config.saveQuery] Save query.
	 * @param {Boolean} [config.isForceUpdate] Flag indicating whether need forced save data.
	 * @param {Boolean} [config.isNew] Flag indicating whether need insert data.
	 * @return  {Terrasoft.BaseQuery}
	 */
	getSaveQuery: function(config) {
		if (this.schema === null) {
			throw new Terrasoft.exceptions.ArgumentNullOrEmptyException({argumentName: "schema"});
		}
		let query = config.saveQuery;
		if (!query) {
			const isNew = Ext.isDefined(config.isNew) ? config.isNew : this.isNew;
			if (isNew) {
				query = this.getInsertQuery();
			} else {
				query = this.getUpdateQuery(config.isForceUpdate);
				query.enablePrimaryColumnFilter(config.primaryColumnValue);
			}
		}
		const columnValues = query.columnValues;
		columnValues.clear();
		const columns = config.columns;
		const changedValues = config.changedValues;
		Terrasoft.each(changedValues, function(changedValue, columnName) {
			const column = columns[columnName];
			if (this._isEntityColumn(column) && this._isColumnExists(column)) {
				if (column.isLookup) {
					changedValue = changedValue ? changedValue.value : null;
				}
				const columnPath = column.columnPath;
				columnValues.setParameterValue(columnPath, changedValue, this._getColumnDataType(column));
			}
		}, this);
		return query;
	},

	/**
	 * Save entity.
	 * @param {Object} config Configuration object.
	 * @param {String} [config.primaryColumnValue] Primary column value.
	 * @param {Object} [config.columns] Columns.
	 * @param {Object} [config.changedValues] Changed values.
	 * @param {Boolean} [config.isForceUpdate] Flag indicating whether need forced save data.
	 * @param {Terrasoft.BaseQuery} [config.saveQuery] Save query.
	 * @param {Function} callback The function that will be called when a response from the server is received
	 * @param {Object} scope The context in which the callback function is called
	 */
	save: function(config, callback, scope) {
		const query = config.saveQuery || this.getSaveQuery(config);
		query.execute(function(result) {
			if (result.success) {
				this.isNew = false;
			}
			Ext.callback(callback, scope || this, [result]);
		}, this);
	},

	/**
	 * Returns entity schema query.
	 * @param {Object} columns Columns.
	 * @return {Terrasoft.EntitySchemaQuery}
	 */
	getEntitySchemaQuery: function(columns) {
		const entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
			rootSchema: this.schema
		});
		Terrasoft.each(columns, function(column, columnName) {
			if (this._isEntityColumn(column)) {
				entitySchemaQuery.addColumn(column.columnPath, columnName);
			}
		}, this);
		this.addRelatedEntityColumns(entitySchemaQuery, columns);
		return entitySchemaQuery;
	},

	/**
	 * Returns entity primary image column name.
	 * @return {String}
	 */
	getEntityPrimaryImageColumnName: function() {
		return this.schema ? this.schema.primaryImageColumnName : null;
	},

	/**
	 * Creates and initializes insert query {@link #insertQuery}
	 * @return {Terrasoft.InsertQuery}
	 */
	getInsertQuery: function() {
		var insertQuery = this._insertQuery = this._insertQuery || Ext.create("Terrasoft.InsertQuery", {
			rootSchema: this.schema
		});
		return insertQuery;
	},

	/**
	 * Creates and initializes update query {@link #updateQuery}
	 * @param {Boolean} isForceUpdate Flag indicating whether need forced save data.
	 * @return {Terrasoft.UpdateQuery}
	 */
	getUpdateQuery: function(isForceUpdate) {
		var updateQuery = this._updateQuery = this._updateQuery || Ext.create("Terrasoft.UpdateQuery", {
			rootSchema: this.schema,
			isForceUpdate: isForceUpdate || false
		});
		return updateQuery;
	},

	/**
	 * Creates and initializes delete query {@link #_deleteQuery}
	 * @return {Terrasoft.DeleteQuery}
	 */
	getDeleteQuery: function() {
		var deleteQuery = this._deleteQuery = this._deleteQuery || Ext.create("Terrasoft.DeleteQuery", {
			rootSchema: this.schema
		});
		return deleteQuery;
	},

	/**
	 * @inheritdoc DataModel#getAttributesConfig
	 * @override
	 */
	getAttributesConfig: function() {
		const columns = {};
		Terrasoft.each(this.schema.columns, function(column, name) {
			const config = Ext.apply({
				modelName: this.name
			}, column);
			const key = this.getAttributeName(name);
			columns[key] = config;
		}, this);
		return columns;
	},

	/**
	 * Adds related columns to entity schema query.
	 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
	 * @param {Object} columns Columns.
	 */
	addRelatedEntityColumns: function(esq, columns) {
		Terrasoft.each(columns, function(column) {
			const lookupListConfig = column.lookupListConfig;
			const lookupListColumns = lookupListConfig && lookupListConfig.columns;
			if (lookupListColumns && this._isEntityColumn(column)) {
				Terrasoft.each(lookupListColumns, function(lookupColumnName) {
					const columnName = this._getRelatedColumnName(column.name, lookupColumnName);
					if (!esq.columns.contains(columnName)) {
						const columnPath = this._getRelatedColumnName(column.columnPath, lookupColumnName);
						esq.addColumn(columnPath, columnName);
					}
				}, this);
			}
		}, this);
	},


	/**
	 * Returns attribute name
	 * @param {String} columnName Column name.
	 * @returns {string}
	 */
	getAttributeName: function(columnName) {
		return this.isPrimary ? columnName : this.name + "." + columnName;
	}

	//endregion

});
