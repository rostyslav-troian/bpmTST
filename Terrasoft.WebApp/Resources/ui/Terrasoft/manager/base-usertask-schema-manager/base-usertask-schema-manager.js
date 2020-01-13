/**
 * @abstract
 */
Ext.define("Terrasoft.manager.BaseUserTaskSchemaManager", {

	extend: "Terrasoft.BaseSchemaManager",

	alternateClassName: "Terrasoft.BaseUserTaskSchemaManager",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseManager#itemClassName
	 * @override
	 */
	itemClassName: "Terrasoft.ProcessUserTaskSchemaManagerItem",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#managerName
	 * @override
	 */
	managerName: "ProcessUserTaskSchemaManager",

	/**
	 * Class name for request metadata user task schema.
	 * @protected
	 * @type {String}
	 */
	requestClassName: "Terrasoft.ProcessUserTaskSchemaRequest",

	/**
	 * Class name for reset specified items request.
	 * @protected
	 * @type {String}
	 */
	resetRequestClassName: "Terrasoft.ProcessUserTaskSchemaResetRequest",

	/**
	 * Class name for reset all items request.
	 * @protected
	 * @type {String}
	 */
	resetAllRequestClassName: "Terrasoft.ProcessUserTaskSchemaResetAllRequest",

	/**
	 * Class name for the user task schema.
	 * @protected
	 * @type {String}
	 */
	schemaClassName: null,

	//endregion

	//region Methods: Private

	/**
	 * Returns schemas query.
	 * @private
	 * @param {Array} itemsData Schema Schemas UId list.
	 * @return {Terrasoft.ProcessUserTaskSchemaRequest} schemas request instance.
	 */
	getSchemasQuery: function(itemsData) {
		var query = Ext.create(this.requestClassName, {
			itemsData: itemsData
		});
		return query;
	},

	/**
	 * Returns reset request items data  if manager is initialized.
	 * @private
	 * @returns {Array}
	 */
	getResetQueryItemsData: function () {
		var itemsData = [];
		if (this.isInitialized) {
			this.items.each(function(item) {
				itemsData.push({
					uId: item.uId
				});
			}, this);
		}
		return itemsData;
	},

	/**
	 * Returns reset schemas query.
	 * @private
	 * @returns {Terrasoft.ProcessUserTaskSchemaResetRequest}
	 */
	getResetQuery: function() {
		if (!this.isInitialized) {
			return Ext.create(this.resetAllRequestClassName);
		}
		var itemsData = this.getResetQueryItemsData();
		var query = Ext.create(this.resetRequestClassName, {
			itemsData: itemsData
		});
		return query;
	},

	/**
	 * Initializes manager items.
	 * @private
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The context of the callback function.
	 */
	initializeItems: function(callback, scope) {
		var itemsData = [];
		var items = this.items;
		items.each(function(item) {
			itemsData.push({
				uId: item.uId
			});
		}, this);
		var query = this.getSchemasQuery(itemsData);
		query.execute(function(response) {
			response.schemas.forEach(function(itemMetaData) {
				var item = items.get(itemMetaData.uId);
				this.createInstance(item, itemMetaData);
			}, this);
			callback.call(scope);
		}, this);
	},

	//endregion

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#initialize
	 * @override
	 */
	initialize: function(callback, scope) {
		var isInitialized = this.isInitialized;
		this.callParent([function() {
			if (!isInitialized) {
				this.initializeItems(function() {
					callback.call(scope);
				}, this);
			} else {
				callback.call(scope);
			}
		}, this]);
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#forceGetInstanceByUId
	 * Queries new schema instance by UId, not need manager initialization.
	 * @override
	 * @param {String} schemaUId Schema identifier.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Execution context.
	 */
	forceGetInstanceByUId: function(schemaUId, callback, scope) {
		var item = this.items.find(schemaUId);
		if (!item) {
			item = this.createManagerItem({uId: schemaUId});
			this.addItem(item);
		}
		item.forceGetInstance(function(itemMetaData) {
			var instance = itemMetaData && this.createInstance(item, itemMetaData);
			callback.call(scope, instance && instance.schema);
		}, this, {
			itemsData: [{uId: schemaUId}]
		});
	},

	/**
	 * Creates manager item instance.
	 * @param {Terrasoft.ProcessUserTaskSchemaManagerItem} item Manager item.
	 * @param {Object} itemMetaData Manager item metadata.
	 */
	createInstance: function(item, itemMetaData) {
		var schema = Terrasoft.SchemaDesignerUtilities.createInstanceByMetaData({
			metaData: itemMetaData.metaData,
			schemaClassName: this.schemaClassName,
			resources: itemMetaData.resources
		});
		var instance = item.createInstance();
		instance.setSchema(schema);
		item.setInstance(instance);
		return instance;
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#clear
	 * @override
	 */
	clear: function() {
		this.callParent(arguments);
		this.isInitialized = false;
	},

	/**
	 * Removes user tasks meta data contracts from cache.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	reset: function(callback, scope) {
		var isInitialized = this.isInitialized;
		var query = this.getResetQuery();
		var safeCallback = this.getSafeCallback(callback, scope);
		query.execute(function(response) {
			if (response && response.success) {
				if (isInitialized) {
					this.clear();
					this.initialize(safeCallback);
				} else {
					safeCallback();
				}
			} else {
				throw new Terrasoft.InvalidOperationException({
					message: response.errorInfo.toString()
				});
			}
		}, this);
	}

});
