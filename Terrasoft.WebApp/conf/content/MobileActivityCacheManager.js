Terrasoft.configuration.Structures["MobileActivityCacheManager"] = {innerHierarchyStack: ["MobileActivityCacheManager"]};
Ext.define("Terrasoft.configuration.ActivityCacheManager", {
	extend: "Terrasoft.core.SynchronizableCacheManager",

	/**
	 * @inheritdoc
	 * @overridden
	 */
	getIsCached: function() {
		return Promise.resolve(true);
	},

	/**
	 * @inheritdoc
	 * @overridden
	 */
	getIsCachedWithFilters: function() {
		return Promise.resolve(true);
	},

	/**
	 * @inheritdoc
	 * @overridden
	 */
	synchronizeFromCache: function() {
		return Promise.resolve();
	},

	/**
	 * @inheritdoc
	 * @overridden
	 */
	synchronizeToCache: function() {
		return Promise.resolve();
	},

	/**
	 * @inheritdoc
	 * @overridden
	 */
	getAdditionalCachingRecords: function(record) {
		var ownerId = record.get("Owner.Id");
		if (!record.dirty || !record.modified.hasOwnProperty("Owner") || !ownerId) {
			return Promise.resolve([]);
		}
		return new Promise(function(resolve) {
			var ownerFilter = Ext.create("Terrasoft.Filter", {
				property: "Contact",
				value: ownerId
			});
			Terrasoft.DataUtils.loadRecords({
				proxyType: Terrasoft.ProxyType.Online,
				modelName: "SysAdminUnit",
				columns: ["Name", "Contact", "Active"],
				filters: ownerFilter,
				success: function(loadedUsers) {
					resolve(loadedUsers);
				},
				failure: function() {
					resolve([]);
				},
				scope: this
			});
		});
	}

});

Terrasoft.ModelCache.registerManagerClassName("Activity", "Terrasoft.configuration.ActivityCacheManager");


