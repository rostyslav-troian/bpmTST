Terrasoft.configuration.Structures["MobileInvoiceDataCacheManager"] = {innerHierarchyStack: ["MobileInvoiceDataCacheManager"]};
/**
 * @class Terrasoft.configuration.InvoiceDataCacheManager
 * Implementation of cache manager of invoices.
 */
Ext.define("Terrasoft.configuration.InvoiceDataCacheManager", {
	extend: "Terrasoft.core.SynchronizableCacheManager",
	alternateClassName: "Terrasoft.InvoiceDataCacheManager",

	//region Properties: Protected

	/**
	 * @inheritdoc
	 * @property
	 * @protected
	 */
	importerClassName: "Terrasoft.InvoiceDataCacheImporter",

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getIsCached: function() {
		return new Promise(function(resolve) {
			Terrasoft.DataUtils.loadRecords({
				pageSize: 1,
				proxyType: Terrasoft.ProxyType.Offline,
				modelName: this.modelName,
				columns: ["Id"],
				success: function(loadedRecords) {
					resolve(loadedRecords.length > 0);
				},
				failure: function() {
					resolve(false);
				},
				scope: this
			});
		}.bind(this));
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getAutoExportModels: function() {
		var models = this.callParent(arguments);
		models.push("SocialLike");
		return models;
	}

	//endregion

});


