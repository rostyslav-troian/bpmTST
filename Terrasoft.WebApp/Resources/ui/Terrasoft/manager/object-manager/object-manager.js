/**
 * @abstract
 */
Ext.define("Terrasoft.manager.ObjectManager", {
	extend: "Terrasoft.manager.BaseManager",
	alternateClassName: "Terrasoft.ObjectManager",

	// region Properties: Private

	/**
	 * Entity schema name.
	 * @private
	 * @property {String} entitySchemaName
	 */
	entitySchemaName: null,

	/**
	 * Entity schema.
	 * @private
	 * @property {Terrasoft.BaseEntitySchema} entitySchema
	 */
	entitySchema: null,

	/**
	 * Manager item class name.
	 * @private
	 * @property {String} itemClassName
	 */
	itemClassName: "Terrasoft.ObjectManagerItem",

	/**
	 * Properties to columns mapping.
	 * @private
	 * @property {Object} propertyColumnNames
	 */
	propertyColumnNames: null,

	/**
	 * Properties to columns mapping config.
	 * @private
	 * @property {Object} propertyColumnConfig
	 */
	propertyColumnConfig: null,

	/**
	 * Initialization property.
	 * @private
	 * @property {Boolean} initialized
	 */
	initialized: false,

	/**
	 * Indicates whether manager is in initialization process.
	 * @private
	 * @property {Boolean} _initializing
	 */
	_initializing: false,

	/**
	 * Properties to columns default mapping.
	 * @private
	 * @property {Object} defaultPropertyColumnNames
	 */
	defaultPropertyColumnNames: {
		id: "Id"
	},

	// endregion

	// region Properties: Protected

	/**
	 * Lazy loading property names.
	 * @protected
	 * @property {Array} lazyLoadingProperties
	 *
	 */
	lazyLoadingProperties: null,

	/**
	 * Lazy loading property names.
	 * @protected
	 * @property {Array} lazyLoadingProperties
	 *
	 */
	allColumns: false,

	/**
	 * Determines when to load lookup display values.
	 * @protected
	 * @type {Boolean}
	 */
	ignoreDisplayValues: true,

	// endregion

	// region Constructor: Public

	/**
	 * Creates object instance.
	 * @constructor
	 * @param {Object} config Configuration object.
	 */
	constructor: function(config) {
		this.callParent([config]);
		this.propertyColumnNames = Ext.apply(this.propertyColumnNames || {}, this.defaultPropertyColumnNames);
		this.lazyLoadingProperties = this.lazyLoadingProperties || [];
		Terrasoft.appendIf(this.lazyLoadingProperties, ["ModifiedBy", "CreatedBy"]);
	},

	// endregion

	// region Methods: Private

	/**
	 * Returns changed manager items.
	 * @private
	 * @return {Terrasoft.core.collections.Collection} Changed items.
	 */
	_getChangedItems: function() {
		return this.items.filterByFn(function(item) {
			return (item.getIsNew() || item.getIsChanged()) && !item.getIsDeleted();
		}, this);
	},

	/**
	 * Returns delete manager items.
	 * @private
	 * @return {Terrasoft.core.collections.Collection} Deleted items.
	 */
	_getDeletedItems: function() {
		return this.items.filterByFn(function(item) {
			return !item.getIsNew() && item.getIsDeleted();
		});
	},

	/**
	 * Executes action over columns config.
	 * @private
	 * @param {Function} action Action to execute.
	 * @param {Object} scope Action scope;
	 */
	_forEachColumn: function(action, scope) {
		const config = this.propertyColumnConfig || {};
		Terrasoft.each(this.propertyColumnNames, function(name, key) {
			const columnConfig = config[key];
			action.call(scope, name, key, columnConfig);
		}, this);
	},

	/**
	 * Returns columns info collection.
	 * @private
	 * @return {Array} Columns info.
	 */
	_getColumnsInfo: function() {
		const result = [];
		this._forEachColumn(function(name, key, config) {
			const columnInfo = Ext.apply({}, config);
			columnInfo.columnName = name;
			columnInfo.columnKey = key;
			result.push(columnInfo);
		}, this);
		return result;
	},

	/**
	 * Returns columns config.
	 * @private
	 * @return {Object} Columns config.
	 */
	_getEntityColumnsConfig: function() {
		let result = null;
		this._forEachColumn(function(name, key, config) {
			if (!Ext.isEmpty(config)) {
				result = result || {};
				result[name] = {
					dataValueType: config.columnDataValueType
				};
			}
		}, this);
		return result;
	},

	/**
	 * Returns columns by properties.
	 * @private
	 * @param {Array} properties Properties.
	 * @return {Array} Data manager columns.
	 */
	getColumnsByProperties: function(properties) {
		if (Ext.isEmpty(properties)) {
			return null;
		}
		return properties.map((propertyName) => this.propertyColumnNames[propertyName] || propertyName);
	},

	/**
	 * Init manager items.
	 * @private
	 * @param {Terrasoft.core.collections.Collection} dataManagerItemCollection Manager items collection.
	 */
	initManagerItems: function(dataManagerItemCollection) {
		dataManagerItemCollection.each(function(dataManagerItem) {
			const itemId = dataManagerItem.getId();
			const item = this.createManagerItem({
				id: itemId,
				dataManagerItem: dataManagerItem
			});
			this.addItem(item);
		}, this);
	},

	/**
	 * Subscribes on managerInitialized event.
	 * @private
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	_subscribeOnInitializedEvent: function(callback, scope) {
		this.on("managerInitialized", function() {
			Ext.callback(callback, scope);
		}, this, {
			single: true
		});
	},

	//endregion

	// region Methods: Protected

	/**
	 * Initialize manager.
	 * @protected
	 * @param {Object} config Configuration object.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	initializeManager: function(config, callback, scope) {
		config = Ext.apply({
			entitySchemaName: this.entitySchemaName,
			lazyLoadingColumns: this.getColumnsByProperties(this.lazyLoadingProperties),
			columnsInfo: this._getColumnsInfo(),
			allColumns: this.allColumns || (config && config.allColumns),
			ignoreDisplayValues: this.ignoreDisplayValues || (config && config.ignoreDisplayValues)
		}, config);
		Terrasoft.chain(
			function(next) {
				this.initializeEntitySchema(next, this);
			},
			function(next) {
				Terrasoft.DataManager.select(config, next, this);
			},
			function(next, dataManagerItemCollection) {
				this.initManagerItems(dataManagerItemCollection);
				this.initialized = true;
				this.isOutdated = false;
				Ext.callback(callback, scope || this);
			},
			this
		);
	},

	/**
	 * Init entity schema of manager.
	 * @protected
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	initializeEntitySchema: function(callback, scope) {
		Terrasoft.require([this.entitySchemaName], function(entitySchema) {
			this.entitySchema = entitySchema;
			callback.call(scope);
		}, this);
	},

	/**
	 * Checks is manager initialized or not.
	 * @protected
	 * @throws {Terrasoft.InvalidObjectState}
	 */
	checkIsInitialized: function() {
		if (!this.initialized) {
			throw new Terrasoft.InvalidObjectState({
				message: Terrasoft.Resources.Managers.Exceptions.ManagerIsNotInitialized
			});
		}
	},

	/**
	 * Creates config object.
	 * @protected
	 * @param {Object} config Config object.
	 * @return {Object} Resulted config object.
	 */
	getInitConfig: function(config) {
		return config;
	},

	/**
	 * Returns name for package schema data for item.
	 * @protected
	 * @param {Terrasoft.manager.ObjectManagerItem} item Object manager item.
	 * @return {String}
	 */
	getPackageSchemaDataName: function(item) {
		const itemId = item.getPropertyValue("id");
		const className = this.alternateClassName.replace("Terrasoft.", "");
		return Ext.String.format("{0}_{1}_{2}", this.entitySchemaName, className, itemId.replace(/-/g, ""));
	},

	/**
	 * Updates schema data in package.
	 * @protected
	 * @param {String} packageUId Package UId.
	 * @param {Terrasoft.core.collections.Collection} items Manager items.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function scope.
	 */
	updatePackageSchemaData: function(packageUId, items, callback, scope) {
		const updatePackageSchemaDataChain = [];
		items.each(function(item) {
			const itemId = item.getPropertyValue("id");
			updatePackageSchemaDataChain.push(function(next) {
				const config = {
					entitySchemaName: this.entitySchemaName,
					recordList: [itemId],
					packageUId: packageUId,
					packageSchemaDataName: this.getPackageSchemaDataName(item),
					entitySchema: Terrasoft[this.entitySchemaName],
					forceUpdateColumns: item.forceUpdateColumns
				};
				const request = Ext.create("Terrasoft.UpdatePackageSchemaDataRequest", config);
				request.execute(function(response) {
					if (response && response.success) {
						next();
					} else {
						throw new Terrasoft.InvalidOperationException({
							message: response.errorInfo.toString()
						});
					}
				}, this);
			});
		}, this);
		updatePackageSchemaDataChain.push(function() {
			callback.call(scope);
		});
		updatePackageSchemaDataChain.push(this);
		Terrasoft.chain.apply(this, updatePackageSchemaDataChain);
	},

	/**
	 * Removes package schema data.
	 * @protected
	 * @param {Terrasoft.core.collections.Collection} items Manager items.
	 * @param {String} packageUId Package UId.
	 * @return {Promise} Delete package schema data promise object.
	 */
	deletePackageSchemaData: function(items, packageUId) {
		const promiseChain = items.mapArray(function(item) {
			const packageSchemaDataName = this.getPackageSchemaDataName(item);
			return new Promise(function(resolve, reject) {
				const request = Ext.create("Terrasoft.DeletePackageSchemaDataRequest", {
					packageSchemaDataName: packageSchemaDataName,
					packageUId: packageUId
				});
				request.execute(function(response) {
					if (response && response.success) {
						resolve();
					} else {
						reject(response && response.errorInfo);
					}
				}, this);
			});
		}, this);
		return Promise.all(promiseChain).catch(function(errorInfo) {
			throw new Terrasoft.InvalidOperationException({message: errorInfo && errorInfo.toString()});
		});
	},

	/**
	 * Unsubscribes from events for all manager items.
	 * @protected
	 */
	unsubscribeEvents: function() {
		this.items.each(function(item) {
			item.un("remove", this.onRemoveManagerItem, this);
		}, this);
	},

	// endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.manager.BaseManager#createManagerItem
	 * @override
	 */
	createManagerItem: function(config) {
		if (this.propertyColumnNames) {
			Ext.apply(config, {
				propertyColumnNames: this.propertyColumnNames,
				lazyLoadingProperties: this.lazyLoadingProperties
			});
		}
		return this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseManager#findItem
	 * @override
	 */
	findItem: function() {
		this.checkIsInitialized();
		return this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseManager#getItem
	 * @override
	 */
	getItem: function() {
		this.checkIsInitialized();
		return this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseManager#remove
	 * @override
	 */
	remove: function() {
		this.checkIsInitialized();
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseManager#getItems
	 * @override
	 */
	getItems: function() {
		this.checkIsInitialized();
		return this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseManager#clear
	 * @override
	 */
	clear: function() {
		const dataStore = Terrasoft.DataManager.getDataStore();
		delete dataStore[this.entitySchemaName];
		this.callParent(arguments);
		this.initialized = false;
	},

	/**
	 * @inheritdoc Terrasoft.core.BaseObject#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.unsubscribeEvents();
		this.callParent(arguments);
	},

	/**
	 * Generates object with parameters for manager element properties.
	 * @return {Object}
	 */
	getPropertiesAttributes: function() {
		if (!this.entitySchema) {
			return null;
		}
		const entitySchemaColumns = this.entitySchema.columns;
		const properties = {};
		Terrasoft.each(this.propertyColumnNames, function(columnName, propertyName) {
			properties[propertyName] = Terrasoft.deepClone(entitySchemaColumns[columnName]);
			Ext.apply(properties[propertyName], {
				columnPath: propertyName,
				name: propertyName
			});
		}, this);
		return properties;
	},

	/**
	 * Init manager items.
	 * @param {Object} [config] Config object.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	initialize: function(config, callback, scope) {
		if (Ext.isFunction(config)) {
			scope = callback || this;
			callback = config;
			config = null;
		}
		scope = scope || this;
		if (this.initialized) {
			if (this.isOutdated) {
				this.reInitialize(config, callback, scope);
			} else {
				callback.call(scope);
			}
			return;
		}
		this._subscribeOnInitializedEvent(callback, scope);
		if (this._initializing) {
			return;
		}
		this._initializing = true;
		const initConfig = this.getInitConfig(config);
		this.initializeManager(initConfig, function() {
			this._initializing = false;
			this.fireEvent("managerInitialized");
		}, this);
	},

	/**
	 * Add item method.
	 * @param {Terrasoft.BaseManagerItem} item Element.
	 * @return {Terrasoft.BaseManagerItem} Added item.
	 */
	addItem: function(item) {
		const resultItem = this.callParent([item]);
		const dataManagerItem = resultItem.getDataManagerItem();
		Terrasoft.DataManager.addItem(dataManagerItem);
		return resultItem;
	},

	/**
	 * Discard item changes.
	 * @param {Terrasoft.manager.DataManagerItem} item Data manager element.
	 * @return {Terrasoft.manager.DataManagerItem} Data manager element.
	 */
	discardItem: function(item) {
		if (item.getIsNew()) {
			if (item.dataManagerItem) {
				const dataManagerItem = item.dataManagerItem;
				Terrasoft.DataManager.discardItem(dataManagerItem);
			}
			this.items.remove(item);
		} else {
			item.discard();
		}
		return item;
	},

	/**
	 * Save changes of manager elements.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	save: function(callback, scope) {
		this.callParent(arguments);
		Terrasoft.DataManager.save({
			entitySchemaNames: [this.entitySchemaName]
		}, callback, scope);
	},

	/**
	 * Save changes of manager elements.
	 * @param {String} packageUId Package identifier.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	saveAndUpdateSchemaData: function(packageUId, callback, scope) {
		const changedItems = this._getChangedItems();
		const deletedItems = this._getDeletedItems();
		Terrasoft.chain(
			function(next) {
				this.save(next, this);
			},
			function(next) {
				this.updatePackageSchemaData(packageUId, changedItems, next, this);
			},
			function(next) {
				this.deletePackageSchemaData(deletedItems, packageUId).then(next);
			},
			function() {
				this.notify(this.outdatedEventName);
				callback.call(scope);
			},
			this
		);
	},

	/**
	 * Discard manager items changes.
	 */
	discard: Terrasoft.abstractFn,

	/**
	 * Create manager item.
	 * @param {Object} [config] Config object.
	 * @param {Terrasoft.DataManagerItem} [config.dataManagerItem] Optional DataManagerItem, uses for new manager item.
	 * @param {Object} [config.propertyValues] Uses for create item when dataManagerItem not defined.
	 * @param {Function} callback The callback function.
	 * @param {Terrasoft.ObjectManagerItem} callback.objectManagerItem Created object manager item.
	 * @param {Object} scope The scope of callback function.
	 */
	createItem: function(config, callback, scope) {
		if (arguments.length === 2 && Ext.isFunction(config)) {
			scope = callback;
			callback = config;
			config = null;
		}
		scope = scope || this;
		let objectManagerItem;
		if (config && config.dataManagerItem) {
			objectManagerItem = this.createManagerItem(config);
			callback.call(scope, objectManagerItem);
		} else {
			const createConfig = {
				entitySchemaName: this.entitySchemaName
			};
			const columnsConfig = this._getEntityColumnsConfig();
			if (columnsConfig) {
				createConfig.columns = columnsConfig;
			}
			Terrasoft.DataManager.createItem(createConfig, function(dataManagerItem) {
				objectManagerItem = this.createManagerItem({dataManagerItem: dataManagerItem});
				const propertyValues = config && config.propertyValues;
				Terrasoft.each(propertyValues, function(propertyValue, propertyName) {
					objectManagerItem.setPropertyValue(propertyName, propertyValue);
				}, this);
				callback.call(scope, objectManagerItem);
			}, this);
		}
	},

	/**
	 * Resets and initializes manager.
	 * @param {Object} [config] Optional, configuration object.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope for the callback.
	 */
	reInitialize: function(config, callback, scope) {
		if (arguments.length === 2 && Ext.isFunction(config)) {
			scope = callback;
			callback = config;
			config = null;
		}
		this.clear();
		this.initialize(config, callback, scope);
	},

	/**
	 * Async loads lazy properties data for items.
	 * @param {String[]} managerItemIds Array of manager items IDs.
	 * @return {Promise} Promise object.
	 * @return {Terrasoft.core.collections.Collection} return.items Loaded items.
	 */
	loadLazyPropertiesDataForItems: function(managerItemIds) {
		const items = managerItemIds.map(function(id) {
			return this.items.get(id);
		}, this);
		const promiseChain = items.map(function(item) {
			return new Promise(function(resolve) {
				item.loadLazyPropertiesData(function() {
					resolve(item);
				}, this);
			});
		}, this);
		return Promise.all(promiseChain);
	}

	// endregion

});
