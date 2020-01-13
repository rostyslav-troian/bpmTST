Terrasoft.configuration.Structures["MobileSysAdminUnitCacheManager"] = {innerHierarchyStack: ["MobileSysAdminUnitCacheManager"]};
/* globals Contact: false */
/**
 * @class Terrasoft.configuration.SysAdminUnitCacheManager
 * Implementation of cache manager for SysAdminUnit object.
 */
Ext.define("Terrasoft.configuration.SysAdminUnitCacheManager", {
	extend: "Terrasoft.core.BaseModelCacheManager",

	//region Methods: Private

	/**
	 * @private
	 */
	getUserRecords: function(recordId) {
		return new Promise(function(resolve) {
			var userFilter = Ext.create("Terrasoft.Filter", {
				property: "Contact",
				value: recordId
			});
			Terrasoft.DataUtils.loadRecords({
				proxyType: Terrasoft.ProxyType.Online,
				modelName: "SysAdminUnit",
				columns: ["Name", "Contact", "Active"],
				filters: userFilter,
				success: function(loadedUsers) {
					resolve(loadedUsers);
				},
				failure: function() {
					resolve([]);
				},
				scope: this
			});
		});
	},

	/**
	 * @private
	 */
	cacheRecord: function(record) {
		return new Promise(function(resolve, reject) {
			var sqls = [];
			var sql = Terrasoft.Sql.InsertBuilder.buildCachingSql(record, true);
			if (sql) {
				sqls.push(sql);
			}
			var lookupSqls = Terrasoft.DataUtils.getLookupCachingSqls(record, false, false, true);
			sqls = sqls.concat(lookupSqls);
			if (sqls.length > 0) {
				Terrasoft.Sql.DBExecutor.executeSql({
					isCancelable: false,
					sqls: sqls,
					success: function() {
						resolve();
					},
					failure: function() {
						reject();
					}
				});
			} else {
				resolve();
			}
		});
	},

	/**
	 * @private
	 */
	cacheUserRecord: function(contactId) {
		return this.getUserRecords(contactId).then(function(loadedUsers) {
			var promises = [];
			loadedUsers.forEach(function(userRecord) {
				promises.push(this.cacheRecord(userRecord));
			}.bind(this));
			return Promise.all(promises);
		}.bind(this));
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc
	 * @overridden
	 */
	putRecord: function(record) {
		var promises = [];
		var contactId;
		if (record instanceof Contact) {
			contactId = record.getPrimaryColumnValue();
			promises.push(this.cacheRecord(record));
		} else {
			contactId = record.get("Contact.Id");
		}
		promises.push(this.cacheUserRecord(contactId));
		return Promise.all(promises);
	}

	//endregion

});


