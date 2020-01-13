Terrasoft.configuration.Structures["EntityRelatedColumnsMixin"] = {innerHierarchyStack: ["EntityRelatedColumnsMixin"]};
define("EntityRelatedColumnsMixin", ["ext-base"],
	function(Ext) {
		/**
		 * Entity related columns mixin.
		 */
		Ext.define("Terrasoft.configuration.mixins.EntityRelatedColumnsMixin", {
			alternateClassName: "Terrasoft.EntityRelatedColumnsMixin",

			//region Methods: Private

			/**
			 * Initializes lookup column lookupListConfig.
			 * @private
			 * @param {Object} column Column.
			 * @param {Object} column.lookupListConfig Column lookupListConfig.
			 */
			initLookupListConfig: function(column) {
				var typeColumn = this.findTypeColumn(column.referenceSchemaName);
				if (typeColumn) {
					var lookupListConfig = column.lookupListConfig = column.lookupListConfig || {};
					var columns = lookupListConfig.columns = lookupListConfig.columns || [];
					var path = typeColumn.path;
					if (!this.Terrasoft.contains(columns, path)) {
						columns.push(path);
					}
				}
			},

			/**
			 * Load additional columns in attributes.
			 * @private
			 * @param {Terrasoft.BaseViewModel} entity Entity instance.
			 */
			setLookupColumnValues: function(entity) {
				this.Terrasoft.each(this.columns, function(column) {
					var lookupListConfig = column.lookupListConfig;
					if (column.type === Terrasoft.ViewModelColumnType.ENTITY_COLUMN && lookupListConfig &&
						lookupListConfig.columns) {
						var columnName = column.name;
						var lookupValue = entity.get(columnName);
						if (!Ext.isEmpty(lookupValue)) {
							this.Terrasoft.each(lookupListConfig.columns, function(lookupColumnName) {
								var relatedColumnName = this.getRelatedColumnName(columnName, lookupColumnName);
								lookupValue[lookupColumnName] = entity.get(relatedColumnName);
							}, this);
						}
					}
				}, this);
			},

			/**
			 * Returns related column full name.
			 * @private
			 * @param {String} entityColumn Entity column.
			 * @param {String} relatedColumn Entity related column.
			 * @return {String} Related column name.
			 */
			getRelatedColumnName: function(entityColumn, relatedColumn) {
				return entityColumn + "." + relatedColumn;
			},

			/**
			 * @private
			 */
			_addDefaultLookupColumnValues: function(entityColumns, columnName, values) {
				const column= entityColumns[columnName];
				const lookupListConfig = column.lookupListConfig;
				const columnValue = column.value;
				this.Terrasoft.each(lookupListConfig.columns, function(lookupColumnName) {
					columnValue[lookupColumnName] = values[lookupColumnName];
				}, this);
			},

			/**
			 * @private
			 */
			_getRelatedColumnBatchQuery: function(columns) {
				var batch = Ext.create("Terrasoft.BatchQuery");
				this.Terrasoft.each(columns, function(column, columnName) {
					if (this._canGetRelatedColumnValue(column)) {
						const primaryColumnValue = this._getColumnValue(column);
						if (!Ext.isEmpty(primaryColumnValue)) {
							const esq = this._getRelatedColumnEsq(column, primaryColumnValue);
							batch.addNamedQuery(esq, columnName, Terrasoft.emptyFn, this);
						}
					}
				}, this);
				return batch;
			},

			/**
			 * @private
			 */
			_getRelatedColumnEsq: function(column, value) {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: column.referenceSchemaName
				});
				esq.enablePrimaryColumnFilter(value);
				var lookupListConfig = column.lookupListConfig;
				this.Terrasoft.each(lookupListConfig.columns, function(lookupColumnName) {
					esq.addColumn(lookupColumnName, lookupColumnName);
				}, this);
				return esq;
			},

			/**
			 * @private
			 */
			_canGetRelatedColumnValue: function(column) {
				var lookupListConfig = column.lookupListConfig;
				var defaultValue = column.defaultValue;
				var hasDefaultValue = defaultValue && defaultValue.value;
				return lookupListConfig && lookupListConfig.columns && hasDefaultValue;
			},

			/**
			 * @private
			 */
			_getColumnValue: function(column) {
				const value = column.value;
				return !Ext.isEmpty(value) && column.dataValueType === Terrasoft.DataValueType.LOOKUP
					? value.value
					: value;
			},

			//endregion

			/**
			 * Adds type column to lookup query.
			 * @protected
			 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
			 * @param {String} columnName Lookup column name.
			 */
			addRelatedColumnsToLookupQuery: function(esq, columnName) {
				var lookupColumn = this.getColumnByName(columnName);
				var lookupListConfig = lookupColumn.lookupListConfig;
				if (lookupListConfig) {
					this.Terrasoft.each(lookupListConfig.columns, function(column) {
						if (!esq.columns.contains(column)) {
							esq.addColumn(column);
						}
					}, this);
				}
			},

			/**
			 * Initializes columns lookupListConfig.
			 * @protected
			 */
			initColumnsLookupListConfig: function() {
				this.Terrasoft.each(this.columns, function(column) {
					this.initLookupListConfig(column);
				}, this);
			},

			/**
			 * Finds type column by schema name.
			 * @protected
			 * @param {String} schemaName Schema name.
			 * @return {Object} Type column.
			 * @return {String} return.path Type column path.
			 */
			findTypeColumn: function(schemaName) {
				var schemaConfig = this.Terrasoft.configuration.EntityStructure[schemaName];
				var typeColumnName = schemaConfig && schemaConfig.attribute || null;
				return typeColumnName ? {path: typeColumnName} : null;
			},

			/**
			 * Adds additional columns in attribute initialized with the default value.
			 * @param {Object} entityColumns Columns of the entity.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Scope of callback function.
			 */
			addDefaultLookupColumnsValues: function(entityColumns, callback, scope) {
				var batch = this._getRelatedColumnBatchQuery(entityColumns);
				if (Ext.isEmpty(batch.queries)) {
					Ext.callback(callback, scope, [entityColumns]);
				} else {
					batch.execute(function(response) {
						if (response && response.success) {
							Terrasoft.each(batch.queriesMap, function(esqIndex, columnName) {
								var result = response.queryResults[esqIndex];
								var values = result.rows[0];
								if (values) {
									this._addDefaultLookupColumnValues(entityColumns, columnName, values);
								}
							}, this);
						}
						Ext.callback(callback, scope, [entityColumns]);
					}, this);
				}
			}
		});
	});


