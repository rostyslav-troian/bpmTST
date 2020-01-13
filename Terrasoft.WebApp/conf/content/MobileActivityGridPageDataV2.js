Terrasoft.configuration.Structures["MobileActivityGridPageDataV2"] = {innerHierarchyStack: ["MobileActivityGridPageDataV2"]};
Ext.define("Terrasoft.configuration.ActivityGridCachedOperation", {
	alternateClassName: "Terrasoft.configuration.ActivityGridPage.CachedOperation",

	statics: {

		/**
		 * @private
		 */
		cache: {},

		/**
		 * @private
		 */
		cachedOwnerId: null,

		/**
		 * @private
		 */
		defaultCacheSizeInOneDirection: 1,

		getRecords: function() {
			if (!this.cachedOwnerId) {
				return null;
			}
			return this.cache[this.cachedOwnerId].records;
		},

		setRecords: function(records) {
			if (!this.cachedOwnerId) {
				return;
			}
			this.cache[this.cachedOwnerId].records = records;
		},

		add: function(records) {
			var cachedRecords = this.getRecords();
			if (!Ext.isArray(cachedRecords)) {
				return;
			}
			cachedRecords = cachedRecords.concat(records);
			this.setRecords(cachedRecords);
		},

		remove: function(records) {
			var cachedRecords = this.getRecords();
			if (!Ext.isArray(cachedRecords)) {
				return;
			}
			cachedRecords = Ext.Array.difference(cachedRecords, records);
			this.setRecords(cachedRecords);
		},

		clearCache: function() {
			this.cachedOwnerId = null;
			this.cache = {};
		}

	},

	config: {

		operation: null

	},

	//region Methods: Private

	/**
	 * @private
	 */
	initialFilters: null,

	/**
	 * @private
	 */
	initialOwnerFilter: null,

	/**
	 * @private
	 */
	initialStartDateFilter: null,

	/**
	 * @private
	 */
	initialDueDateFilter: null,

	/**
	 * @private
	 */
	ownerId: null,

	/**
	 * @private
	 */
	initialFilterStartDate: null,

	/**
	 * @private
	 */
	initialFilterDueDate: null,

	/**
	 * @private
	 */
	adjustedStartDate: null,

	/**
	 * @private
	 */
	adjustedDueDate: null,

	//endregion

	/**
	 * @private
	 */
	isDateWithinInterval: function(startDate, dueDate, intervalStartDate, intervalDueDate) {
		return (startDate <= intervalStartDate) && (dueDate >= intervalDueDate);
	},

	constructor: function(config) {
		this.initConfig(config);
		var operation = this.getOperation();
		operation.cachedOperation = this;
		var initialFilters = this.initialFilters = operation.getFilters();
		var ownerFilter = this.initialOwnerFilter = initialFilters.findSubfilterByName("ActivityByOwnerFilter").filter;
		var startDateFilter = this.initialStartDateFilter = initialFilters.findSubfilterByName("StartDateFilter").filter;
		var dueDateFilter = this.initialDueDateFilter = initialFilters.findSubfilterByName("DueDateFilter").filter;
		this.ownerId = ownerFilter.getValue();
		var startDate = this.initialFilterStartDate = startDateFilter.getValue();
		var dueDate = this.initialFilterDueDate = dueDateFilter.getValue();
		var cacheSizeInOneDirection = Math.max(operation.minCacheSizeInOneDirection || 0, 7);
		this.adjustedStartDate = Terrasoft.Date.add(startDate, Ext.Date.DAY, cacheSizeInOneDirection);
		this.adjustedDueDate = Terrasoft.Date.add(dueDate, Ext.Date.DAY, -cacheSizeInOneDirection);
	},

	isCached: function() {
		var ownerCache = this.self.cache[this.ownerId];
		if (!ownerCache) {
			return false;
		}
		return this.isDateWithinInterval(this.adjustedStartDate, this.adjustedDueDate, ownerCache.startDate,
				ownerCache.dueDate);
	},

	adjustOperation: function() {
		this.initialStartDateFilter.setValue(this.adjustedStartDate);
		this.initialDueDateFilter.setValue(this.adjustedDueDate);
	},

	getCache: function() {
		return this.self.cache[this.ownerId].records;
	},

	saveCache: function() {
		var operation = this.getOperation();
		var cachedOwnerId = this.self.cachedOwnerId;
		if (cachedOwnerId && cachedOwnerId !== this.ownerId) {
			delete this.self.cache[cachedOwnerId];
		}
		this.self.cache[this.ownerId] = {
			startDate: this.adjustedStartDate,
			dueDate: this.adjustedDueDate,
			records: operation.getRecords(),
			createdOn: new Date()
		};
		this.self.cachedOwnerId = this.ownerId;
	}

});

Ext.define("Terrasoft.configuration.ActivityGridPageProxy", {
	alternateClassName: "Terrasoft.configuration.ActivityGridPage.Proxy",
	extend: "Terrasoft.Proxy.BaseProxy",
	alias: "proxy.tsactivitycacheproxy",

	read: function(operation, callback, scope) {
		operation.setSuccessful();
		operation.setCompleted();
		var cachedOperation = operation.cachedOperation;
		var cache = cachedOperation.getCache();
		operation.setRecords(cache);
		var resultSet = new Ext.data.ResultSet({
			records: cache,
			success: true
		});
		resultSet.setSuccess(true);
		resultSet.setTotal(cache.length);
		resultSet.setCount(cache.length);
		operation.setResultSet(resultSet);
		Ext.callback(callback, scope, [operation]);
	},

	/**
	 * Calculates total count.
	 * @param {Ext.data.Operation} operation The {@link Ext.data.Operation Operation}
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Value of 'this' in the above function.
	 */
	getTotalCount: function(operation, callback, scope) {
		operation.setSuccessful();
		operation.setCompleted();
		var cachedOperation = operation.cachedOperation;
		var cache = cachedOperation.getCache();
		operation.setRecords([]);
		var resultSet = new Ext.data.ResultSet({
			records: [],
			success: true
		});
		resultSet.setSuccess(true);
		resultSet.setTotal(cache.length);
		resultSet.setCount(cache.length);
		operation.setResultSet(resultSet);
		Ext.callback(callback, scope, [operation]);
	}

});

Ext.define("Terrasoft.configuration.store.ActivityGridPage", {
	alternateClassName: "ActivityGridPage.Store",
	extend: "Terrasoft.store.BaseStore",

	config: {

		model: "Activity",

		controller: "Terrasoft.configuration.controller.ActivityGridPage",

		proxy: "tsactivitycacheproxy",

		destroyRemovedRecords: false

	},

	constructor: function() {
		this.callParent(arguments);
		this.onAfter("beforeload", this.beforeLoadStore);
		this.onBefore("addrecords", this.onBeforeAddRecords);
		this.onBefore("removerecords", this.onBeforeRemoveRecords);
	},

	/**
	 * @private
	 */
	beforeLoadStore: function(store, operation) {
		var queryConfig = operation.config.queryConfig;
		if (operation.forceRefresh) {
			Terrasoft.configuration.ActivityGridCachedOperation.clearCache();
		}
		if (!operation.useCache) {
			this.setProxyByOnlineMode(queryConfig);
			return;
		}
		var cachedOperation = Ext.create("Terrasoft.configuration.ActivityGridCachedOperation", {
			operation: operation
		});
		if (!operation.forceRefresh && cachedOperation.isCached()) {
			this.setProxy("tsactivitycacheproxy");
		} else {
			cachedOperation.adjustOperation();
			this.setProxyByOnlineMode(queryConfig);
		}
	},

	/**
	 * @private
	 */
	onBeforeAddRecords: function(store, records) {
		Terrasoft.configuration.ActivityGridCachedOperation.add(records);
	},

	/**
	 * @private
	 */
	onBeforeRemoveRecords: function(store, records) {
		Terrasoft.configuration.ActivityGridCachedOperation.remove(records);
	},

	onProxyLoad: function(operation) {
		if (operation.useCache && operation.wasSuccessful()) {
			var cachedOperation = operation.cachedOperation;
			if (!cachedOperation.isCached()) {
				cachedOperation.saveCache();
			}
			var records = cachedOperation.getCache();
			var resultSet = new Ext.data.ResultSet({
				records: records,
				success: true
			});
			resultSet.setSuccess(true);
			resultSet.setTotal(records.length);
			resultSet.setCount(records.length);
			operation.setResultSet(resultSet);
			operation.setRecords(records);
		}
		this.callParent(arguments);
	},

	load: function(config) {
		config.setProxyByOnlineMode = false;
		this.callParent(arguments);
	},

	loadPage: function(page, config) {
		config.setProxyByOnlineMode = false;
		this.callParent(arguments);
	}

});


