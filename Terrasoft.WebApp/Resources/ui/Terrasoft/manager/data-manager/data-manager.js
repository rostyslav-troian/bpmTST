/**
 * @abstract
 * Class of the data manager.
 */
Ext.define("Terrasoft.manager.DataManager", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.DataManager",
	singleton: true,

	//region Properties: Private

	/**
	 * A collection of entity schema data.
	 * @private
	 * @property {Object} dataStore
	 */
	dataStore: {},

	/**
	 * Name of the manager item class.
	 * @private
	 * @property {String} itemClassName
	 */
	itemClassName: "Terrasoft.DataManagerItem",

	// endregion

	//region Methods: Private

	/**
	 * Checks the filling of the specified properties.
	 * @private
	 * @throws {Terrasoft.ArgumentNullOrEmptyException}
	 * throws an exception {@link Terrasoft.ArgumentNullOrEmptyException} if the value of the rendered property is empty.
	 * @param {Object} properties The property value object.
	 * @param {String []} propertyNames The object of the names of the properties to be checked.
	 */
	checkAreEmpty: function(properties, propertyNames) {
		Terrasoft.each(propertyNames, function(propertyName) {
			if (Ext.isEmpty(properties[propertyName])) {
				throw new Terrasoft.ArgumentNullOrEmptyException({
					argumentName: propertyName
				});
			}
		}, this);
	},

	/**
	 * Creates data manager item.
	 * @private
	 * @param {Object} config Configuration object.
	 * @return {Terrasoft.DataManagerItem} Data manager item.
	 */
	createManagerItem: function(config) {
		return Ext.create(this.itemClassName, config);
	},

	/**
	 * Loads item form database.
	 * @private
	 * @throws {Terrasoft.ItemNotFoundException}
	 * Throws exception {@link Terrasoft.ItemNotFoundException} if item with id not found.
	 * @param {String} entitySchemaName Entity schema name.
	 * @param {String} primaryColumnValue Primary column value.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	loadItem: function(entitySchemaName, primaryColumnValue, callback, scope) {
		var self = this;
		var item = self.findItem(entitySchemaName, primaryColumnValue);
		if (item) {
			callback.call(scope, item);
		} else {
			require([entitySchemaName], function(entitySchema) {
				var viewModelColumns = self.getViewModelColumns(entitySchema.columns);
				var viewModel = Ext.create("Terrasoft.BaseViewModel", {
					entitySchema: entitySchema,
					columns: viewModelColumns
				});
				var loadEntityCallback = function() {
					if (!viewModel.get("Id")) {
						throw new Terrasoft.ItemNotFoundException();
					}
					item = self.createManagerItem({
						viewModel: viewModel
					});
					callback.call(scope, item);
				};
				viewModel.loadEntity(primaryColumnValue, loadEntityCallback, this);
			});
		}
	},

	/**
	 * Returns data store.
	 * @private
	 * @return {Object} Data store.
	 */
	getDataStore: function() {
		return this.dataStore;
	},

	/**
	 * Returns data for the entity schema.
	 * @param {String} entitySchemaName Entity schema name.
	 * @return {Mixed} Entity schema data.
	 */
	getEntitySchemaData: function(entitySchemaName) {
		var dataStore = this.getDataStore();
		return dataStore[entitySchemaName];
	},

	/**
	 * Returns columns for view model.
	 * @private
	 * @param {Object} columns Column object of entity schema query.
	 * @return {Object} Column object for view model.
	 */
	getViewModelColumns: function(columns) {
		var viewModelColumns = Terrasoft.deepClone(columns);
		Terrasoft.each(viewModelColumns, function(column, columnName) {
			column.type = Terrasoft.ViewModelColumnType.ENTITY_COLUMN;
			column.columnPath = columnName;
		}, this);
		return viewModelColumns;
	},

	/**
	 * Loads entity schema data.
	 * @private
	 * @param {Object} config Additional query parameters.
	 * @param {String} config.entitySchemaName Entity schema name.
	 * @param {Terrasoft.FilterGroup} config.filters Query filters.
	 * @param {Array} config.additionColumns Additional query columns.
	 * @param {Array} config.lazyLoadingColumns Lazy loading columns.
	 * @param {Boolean} config.addToStore If true adds columns to data store.
	 * @param {Boolean} config.allColumns If true adds all entity schema columns to esq.
	 * @param {Boolean} config.ignoreDisplayValues Determines when to load lookup display values.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	_loadEntitySchemaData: function(config, callback, scope) {
		var entitySchemaName = config.entitySchemaName;
		Terrasoft.chain(
			function(next) {
				Terrasoft.require([entitySchemaName], next, this);
			},
			function(next, entitySchema) {
				config._entitySchema = entitySchema;
				this._getEntitySchemaData(config, next, this);
			},
			function(next, response) {
				if (response.success) {
					var collection = new Terrasoft.Collection();
					if (config.addToStore) {
						this.initEntitySchemaDataCollection(entitySchemaName, collection);
					}
					response.collection.each(function(viewModel) {
						viewModel.columns = this.getViewModelColumns(viewModel.columns);
						var dataManagerItem = this.createManagerItem({
							viewModel: viewModel
						});
						collection.add(dataManagerItem.getId(), dataManagerItem);
					}, this);
					callback.call(scope, collection);
				}
			},
			this
		);
	},

	/**
	 * @private
	 */
	_getEntitySchemaData: function(config, next, scope) {
		var filters = config.filters || null;
		const entitySchema = config._entitySchema;
		var esq = new Terrasoft.EntitySchemaQuery({
			rootSchema: entitySchema,
			ignoreDisplayValues: config.ignoreDisplayValues
		});
		this._prepareEntitySchemaQueryColumns(esq, {
			entitySchemaColumns: Ext.Object.getKeys(entitySchema.columns),
			columnsInfo: config.columnsInfo,
			lazyLoadingColumns: config.lazyLoadingColumns,
			allColumns: Ext.isDefined(config.allColumns) ? config.allColumns : true
		});
		if (filters) {
			esq.filters.addItem(filters);
		}
		esq.getEntityCollection(next, scope);
	},

	/**
	 * Prepares entity colums for entity schema query.
	 * @private
	 * @param entitySchemaQuery {Object} Entity schema query.
	 * @param {Object} config Columns config.
	 * @param {Array} config.columnsInfo Array of additional columns configs.
	 * @param {Array} config.entitySchemaColumns Array of entity schema columns.
	 * @param {Array} config.lazyLoadingColumns Array of lazy loading columns.
	 * @param {Array} config.allColumns If true adds all entity schema columns to esq.
	 */
	_prepareEntitySchemaQueryColumns: function(entitySchemaQuery, config) {
		var entitySchemaColumns = config.entitySchemaColumns;
		var columnsInfo = config.columnsInfo || [];
		var lazyLoadingColumns = config.lazyLoadingColumns || [];
		var columns = columnsInfo.map(function(item) {
			return item.columnName;
		}, this);
		if (config.allColumns) {
			columns = Ext.Array.merge(entitySchemaColumns, columns);
		}
		Terrasoft.each(columns, function(columnName) {
			var baseColumnConfig = {columnName: columnName};
			var columnConfig = Terrasoft.findWhere(columnsInfo, baseColumnConfig) || baseColumnConfig;
			var column = this._addColumn(entitySchemaQuery, columnConfig);
			if (Terrasoft.contains(lazyLoadingColumns, columnName)) {
				column.isVisible = false;
			}
		}, this);
	},

	/**
	 * Adds column to entity schema query.
	 * @private
	 * @param entitySchemaQuery {Object} Entity schema query.
	 * @param columnConfig {Object} Column config. Could be string or object.
	 * @returns {Object} Entity schema query column.
	 */
	_addColumn: function(entitySchemaQuery, columnConfig) {
		var columnName = columnConfig.columnName;
		var columnPath = columnConfig.columnPath;
		return Ext.isEmpty(columnPath)
			? entitySchemaQuery.addColumn(columnName)
			: entitySchemaQuery.addColumn(columnPath, columnName);
	},

	// endregion

	//region Methods: Public

	/**
	 * Sets the data for the specified schema.
	 * @param {String} entitySchemaName The name of the schema.
	 * @param {Terrasoft.Collection} entitySchemaDataCollection Schema name.
	 * @return {Terrasoft.Collection} A collection of schema data.
	 */
	initEntitySchemaDataCollection: function(entitySchemaName, entitySchemaDataCollection) {
		var dataStore = this.getDataStore();
		dataStore[entitySchemaName] = entitySchemaDataCollection || new Terrasoft.Collection();
		return dataStore[entitySchemaName];
	},

	/**
	 * Searches for items by ID.
	 * @param {String} entitySchemaName The name of the column.
	 * @param {String} id The identifier of the element.
	 * @return {Terrasoft.DataManagerItem} Element.
	 */
	findItem: function(entitySchemaName, id) {
		var item;
		var entitySchemaDataCollection = this.getEntitySchemaData(entitySchemaName);
		if (entitySchemaDataCollection) {
			item = entitySchemaDataCollection.find(id);
		}
		return item;
	},

	/**
	 * Fetches data from the specified schema, according to the specified condition.
	 * @throws {Terrasoft.ArgumentNullOrEmptyException}
	 * throws an exception {@link Terrasoft.ArgumentNullOrEmptyException} If an element with such an identifier
	 * is not found.
	 * @param {Object} config Additional query parameters.
	 * @param {String} config.entitySchemaName Schema name.
	 * @param {Terrasoft.FilterGroup?} config.filters Sample conditions.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope The context for executing the callback function.
	 * @return {Terrasoft.Collection}
	 */
	select: function(config, callback, scope) {
		this.checkAreEmpty(config, ["entitySchemaName"]);
		scope = scope || this;
		var entitySchemaName = config.entitySchemaName;
		var entitySchemaData = this.getEntitySchemaData(entitySchemaName);
		if (entitySchemaData) {
			callback.call(scope, entitySchemaData);
		} else {
			var innerCallback = function(entitySchemaDataCollection) {
				callback.call(scope, entitySchemaDataCollection);
			};
			this._loadEntitySchemaData(config, innerCallback, scope);
		}
	},

	/**
	 * Adds a record to the schema data collection.
	 * @param {Object} config Additional parameters.
	 * @param {String} config.entitySchemaName Schema name.
	 * @param {Object} config.columnValues The values of the record columns.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope The context for executing the callback function.
	 * @return {Terrasoft.DataManagerItem} Added entry.
	 */
	createItem: function(config, callback, scope) {
		this.checkAreEmpty(config, ["entitySchemaName"]);
		var entitySchemaName = config.entitySchemaName;
		Terrasoft.require([entitySchemaName], function(entitySchema) {
			var viewModelColumns = this.getViewModelColumns(entitySchema.columns);
			var allColumns = Ext.Object.merge(viewModelColumns, config.columns);
			var viewModel = Ext.create("Terrasoft.BaseViewModel", {
				entitySchema: entitySchema,
				columns: allColumns
			});
			viewModel.setDefaultValues(function() {
				var dataManagerItem = this.createManagerItem({
					viewModel: viewModel
				});
				var columnValues = config.columnValues || {};
				Terrasoft.each(columnValues, function(columnValue, columnName) {
					dataManagerItem.setColumnValue(columnName, columnValue);
				}, this);
				callback.call(scope, dataManagerItem);
			}, this);
		}, this);
	},

	/**
	 * Adds an element to the schema data collection.
	 * @param {Terrasoft.DataManagerItem} item The identifier of the element.
	 * @return {Terrasoft.DataManagerItem} Element.
	 */
	addItem: function(item) {
		var entitySchemaName = item.getEntitySchemaName();
		var entitySchemaData = this.initEntitySchemaDataCollection(entitySchemaName,
			this.getEntitySchemaData(entitySchemaName));
		return entitySchemaData.add(item.getId(), item);
	},

	/**
	 * Deletes the data.
	 * @param {Object} config Additional parameters.
	 * @param {String} config.entitySchemaName Schema name.
	 * @param {String} config.primaryColumnValue The value of the primary column.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope The context for executing the callback function.
	 * @return {Terrasoft.DataManagerItem} The updated object.
	 */
	remove: function(config, callback, scope) {
		var self = this;
		this.checkAreEmpty(config, ["entitySchemaName", "primaryColumnValue"]);
		var entitySchemaName = config.entitySchemaName;
		var primaryColumnValue = config.primaryColumnValue;
		var loadItemCallback = function(dataManagerItem) {
			dataManagerItem.remove();
			callback.call(scope, dataManagerItem);
		};
		self.loadItem(entitySchemaName, primaryColumnValue, loadItemCallback, this);
	},

	/**
	 * Deletes an item from the data manager collection.
	 * @param {Terrasoft.DataManagerItem} item Element.
	 */
	removeItem: function(item) {
		var entitySchemaName = item.getEntitySchemaName();
		var entitySchemaData = this.getEntitySchemaData(entitySchemaName);
		if (entitySchemaData) {
			entitySchemaData.remove(item);
			item.destroy();
			item = null;
		}
	},

	/**
	 * Updates the data.
	 * @param {Object} config Additional parameters.
	 * @param {String} config.entitySchemaName Schema name.
	 * @param {String} config.primaryColumnValue The value of the primary column.
	 * @param {Mixed} config.columnValues Column values.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope The context for executing the callback function.
	 * @return {Terrasoft.DataManagerItem} The updated object.
	 */
	update: function(config, callback, scope) {
		var self = this;
		this.checkAreEmpty(config, ["entitySchemaName", "primaryColumnValue", "columnValues"]);
		var entitySchemaName = config.entitySchemaName;
		var primaryColumnValue = config.primaryColumnValue;
		var columnValues = config.columnValues;
		var loadItemCallback = function(dataManagerItem) {
			Terrasoft.each(columnValues, function(columnValue, columnName) {
				dataManagerItem.setColumnValue(columnName, columnValue);
			}, self);
			callback.call(scope, dataManagerItem);
		};
		self.loadItem(entitySchemaName, primaryColumnValue, loadItemCallback, self);
	},

	/**
	 * Cancels the item's changes.
	 * @param {Terrasoft.DataManagerItem} item Data manager element.
	 * @return {Terrasoft.DataManagerItem} The data manager element.
	 */
	discardItem: function(item) {
		if (item.getIsNew()) {
			this.removeItem(item);
		} else {
			item.discard();
		}
		return item;
	},

	/**
	 * Executed update package schema data request.
	 * @private
	 * @param {Object} config configuration object.
	 * @param {String} config.entitySchemaName schema name.
	 * @param {UId[]} config.recordList modified items ids.
	 * @param {UId} config.packageUId identifier of package.
	 * @param {String} config.packageSchemaDataName package schema data name.
	 * @param {Function} callback Execute callback function.
	 * @param {Object} scope Execution context.
	 */
	executeUpdatePackageSchemaDataRequest: function(config, callback, scope) {
		var request = Ext.create("Terrasoft.UpdatePackageSchemaDataRequest", config);
		request.execute(function(response) {
			callback.call(scope, response);
		}, this);
	},

	/**
	 * Returned summary response.
	 * @private
	 * @param {Object} packageSchemaSaveResponses all save responses.
	 * @return {Object} summary response.
	 */
	getSummaryUpdatePackageSchemaDataResponse: function(packageSchemaSaveResponses) {
		var response = {
			success: true
		};
		Terrasoft.each(packageSchemaSaveResponses, function(saveResponse) {
			if (saveResponse && !saveResponse.success) {
				response.success = false;
				response.message = saveResponse.errorInfo.toString();
			}
		});
		return response;
	},

	/**
	 * Updated package schema data.
	 * @private
	 * @param {Object} schemaPackageDataInfo all new and changed dataManager items.
	 * @param {Object} config configuration object.
	 * @param {String[]} config.entitySchemaNames schema names.
	 * if config.entitySchemaNames unset save all changed in dataManager schemas.
	 * @param {String} config.packageUId  identifier of package.
	 * @param {String} config.packageSchemaDataNameTemplate package schema data name template
	 * Example:
	 * "{0}_Data" => "EntitySchemaName_Data": "ContactType_Data"
	 * @param {Function} callback Execute callback function.
	 * @param {Object} scope Execution context.
	 */
	updatePackageSchemaData: function(schemaPackageDataInfo, config, callback, scope) {
		var chainArguments = [];
		var packageSchemaDataNameTemplate = config.packageSchemaDataNameTemplate || "{0}_Data";
		var packageSchemaSaveResponses = [];
		Terrasoft.each(schemaPackageDataInfo, function(entitySchemaModifiedItems, entitySchemaName) {
			if (entitySchemaModifiedItems.getCount()) {
				var savePackageSchemaDataChainItem = function(next, response) {
					if (response) {
						packageSchemaSaveResponses.push(response);
					}
					var requestConfig = {
						entitySchemaName: entitySchemaName,
						recordList: entitySchemaModifiedItems.getKeys(),
						packageUId: config.packageUId,
						packageSchemaDataName: Ext.String.format(packageSchemaDataNameTemplate, entitySchemaName)
					};
					this.executeUpdatePackageSchemaDataRequest(requestConfig, next, this);
				};
				chainArguments.push(savePackageSchemaDataChainItem);
			}
		}, this);
		chainArguments.push(function(next, response) {
			if (response) {
				packageSchemaSaveResponses.push(response);
			}
			var generalResponse = this.getSummaryUpdatePackageSchemaDataResponse(packageSchemaSaveResponses);
			callback.call(scope, generalResponse);
		});
		chainArguments.push(this);
		Terrasoft.chain.apply(this, chainArguments);
	},

	/**
	 * Returned all new and changed dataManager items.
	 * @private
	 * @param {Array} entitySchemaNames schema names.
	 * @param {String} updateAll load all dataManagerItem data to package schema.
	 * @return {Object} Object where key entitySchemaName and value dataManager items.
	 */
	getSchemaPackageDataInfo: function(entitySchemaNames, updateAll) {
		var result = {};
		var saveAll = Ext.isEmpty(entitySchemaNames);
		var dataStore = this.getDataStore();
		Terrasoft.each(dataStore, function(entitySchemaDataCollection, entitySchemaName) {
			if (saveAll || Terrasoft.contains(entitySchemaNames, entitySchemaName)) {
				if (updateAll) {
					result[entitySchemaName] = entitySchemaDataCollection;
				} else {
					result[entitySchemaName] = entitySchemaDataCollection.filterByFn(function(item) {
						return item.getIsChanged() || item.getIsNew();
					}, this);
				}
			}
		}, this);
		return result;
	},

	/**
	 * Saves changed data and update package schema.
	 * @param {Object} config configuration object.
	 * @param {String[]} [config.entitySchemaNames] schema names.
	 * if config.entitySchemaNames unset save all changed in dataManager schemas.
	 * @param {String} [config.packageUId] identifier of package.
	 * @param {String} [config.updateAll] load all dataManagerItem data to package schema.
	 * @param {String} [config.packageSchemaDataNameTemplate] package schema data  name template
	 * Example:
	 * "{0}_Data" => "EntitySchemaName_Data": "ContactType_Data"
	 * @param {Function} callback Execute callback function.
	 * @param {Object} scope Execution context.
	 */
	saveAndUpdatePackageSchemaData: function(config, callback, scope) {
		config = config || {};
		var schemaPackageDataInfo = this.getSchemaPackageDataInfo(config.entitySchemaNames, config.updateAll);
		Terrasoft.chain(
			function(next) {
				this.save(config, next, this);
			},
			function(next, response) {
				if (response.success) {
					this.updatePackageSchemaData(schemaPackageDataInfo, config, next, this);
				} else {
					next(response);
				}
			},
			function(next, response) {
				callback.call(scope, response);
			},
			this
		);
	},

	/**
	 * Saves all changed data and update package schema.
	 * @param {String} packageUId Package unique identifier.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	saveAndUpdateSchemaData: function(packageUId, callback, scope) {
		var config = {
			packageUId: packageUId
		};
		this.saveAndUpdatePackageSchemaData(config, callback, scope);
	},

	/**
	 * Saves the changes to the data.
	 * @param {Object} config Additional parameters.
	 * @param {String []} config.entitySchemaNames The name of the schemas for which you want to save.
	 * If the property is not set, saving is performed for all schemas.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope The context for executing the callback function.
	 * @return {Object} The server response object.
	 */
	save: function(config, callback, scope) {
		var saveQuery = new Terrasoft.BatchQuery();
		const dataStore = this.getDataStore();
		const removedItems = [];
		const changedItems = [];
		const entitySchemaNames = config && config.entitySchemaNames;
		const saveAll = Ext.isEmpty(entitySchemaNames);
		Terrasoft.each(dataStore, function(entitySchemaDataCollection, entitySchemaName) {
			if (saveAll || Terrasoft.contains(entitySchemaNames, entitySchemaName)) {
				const changedDataManagerItems = entitySchemaDataCollection.filterByFn(function(item) {
					const isChanged = item.getIsChanged();
					const isDeleted = item.getIsDeleted();
					if (isDeleted) {
						removedItems.push(item);
					} else if (isChanged) {
						changedItems.push(item);
					}
					return isChanged || isDeleted;
				});
				changedDataManagerItems.each(function(item) {
					const dataManagerItemSaveQuery = item.getSaveQuery();
					if (dataManagerItemSaveQuery) {
						saveQuery.add(dataManagerItemSaveQuery);
					}
				}, this);
			}
		}, this);
		saveQuery.execute(function(response) {
			if (response.success) {
				if (!response.ResponseStatus) {
					Terrasoft.each(removedItems, function(removedItem) {
						this.removeItem(removedItem);
					}, this);
					Terrasoft.each(changedItems, function(changedItem) {
						changedItem.setIsSaved();
					}, this);
				}
			}
			callback.call(scope, response);
		}, this);
	}

	//endregion

});
