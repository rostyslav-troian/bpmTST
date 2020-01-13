Terrasoft.configuration.Structures["MobileInvoiceDataCacheImporter"] = {innerHierarchyStack: ["MobileInvoiceDataCacheImporter"]};
/**
 * @class Terrasoft.configuration.InvoiceDataCacheImporter
 * Imports invoices.
 */
Ext.define("Terrasoft.configuration.InvoiceDataCacheImporter", {
	extend: "Terrasoft.core.BaseModelCacheImporter",
	alternateClassName: "Terrasoft.InvoiceDataCacheImporter",

	statics: {

		/**
		 * Maximum size of records in query for import operations.
		 */
		ImportPageSize: 50,

		/**
		 * Maximum count of queries for import operations.
		 */
		ImportPagesPerLoad: 1

	},

	/**
	 * @private
	 */
	periodColumnName: "DueDate",

	//region Methods: Private

	/**
	 * @private
	 */
	getSyncKey: function() {
		var now = new Date();
		return "Invoices" + now.getFullYear() + now.getMonth();
	},

	/**
	 * @private
	 */
	getAssociatedModelParentFiltersByInvoices: function(records, associationConfig) {
		var ids = [];
		records.forEach(function(record) {
			Terrasoft.Array.pushUnique(ids, record.get(associationConfig.masterColumnName));
		});
		if (Ext.isEmpty(ids)) {
			return false;
		} else {
			var parentFilter = Ext.create("Terrasoft.Filter", {
				property: associationConfig.parentColumnName,
				funcType: Terrasoft.FilterFunctions.In,
				funcArgs: ids
			});
			if (associationConfig.modelName === "SocialMessage") {
				var existFilter = Ext.create("Terrasoft.Filter", {
					operation: Terrasoft.FilterOperations.Any,
					modelName: "SocialMessage",
					assocProperty: "Id",
					masterColumnName: "Parent",
					property: associationConfig.parentColumnName,
					funcType: Terrasoft.FilterFunctions.In,
					funcArgs: ids
				});
				return Ext.create("Terrasoft.Filter", {
					type: Terrasoft.FilterTypes.Group,
					logicalOperation: Terrasoft.FilterLogicalOperations.Or,
					subfilters: [existFilter, parentFilter]
				});
			} else {
				return parentFilter;
			}
		}
	},

	/**
	 * @private
	 */
	importSocialLikes: function(importConfig, socialMesssageIds, cancellationId) {
		return new Promise(function(resolve, reject) {
			importConfig = this.getSocialLikeImportConfig(importConfig, socialMesssageIds);
			Ext.apply(importConfig, {
				success: function() {
					resolve();
				},
				failure: function(exception) {
					reject(exception);
				},
				scope: this
			});
			var operationConfig = {
				cancellationId: cancellationId,
				priority: Terrasoft.SyncPriority.Normal
			};
			if (!Terrasoft.Platform.isWebKit && Terrasoft.Features.getIsEnabled("UseMobileNativeImport")) {
				Terrasoft.SyncManager.runNativeImport(importConfig, operationConfig);
			} else {
				Terrasoft.SyncManager.runImport(importConfig, operationConfig);
			}
		}.bind(this));
	},

	/**
	 * @private
	 */
	syncDeletedSocialLikes: function(socialMesssageIds, cancellationId) {
		var socialMessageIncludeFilter = this.getSocialLikeParentFilters(socialMesssageIds);
		var syncDeletedConfig = [{
			modelName: "SocialLike",
			filters: socialMessageIncludeFilter
		}];
		return this.syncDeletedRecords(syncDeletedConfig, cancellationId);
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getMainModelImportFilters: function() {
		var groupFilter = Ext.create("Terrasoft.Filter", {
			type: Terrasoft.FilterTypes.Group
		});
		var startPeriod = new Date();
		startPeriod.setDate(1);
		startPeriod.setHours(0, 0, 0, 0);
		groupFilter.addFilter(Ext.create("Terrasoft.Filter", {
			compareType: Terrasoft.ComparisonTypes.GreaterOrEqual,
			property: this.periodColumnName,
			value: startPeriod
		}));
		var endPeriod = Terrasoft.Date.add(startPeriod, Ext.Date.MONTH, 1);
		groupFilter.addFilter(Ext.create("Terrasoft.Filter", {
			compareType: Terrasoft.ComparisonTypes.Less,
			property: this.periodColumnName,
			value: endPeriod
		}));
		groupFilter.addFilter(Ext.create("Terrasoft.Filter", {
			compareType: Terrasoft.ComparisonTypes.Less,
			property: "PaymentStatus",
			funcType: Terrasoft.FilterFunctions.In,
			funcArgs: [
				Terrasoft.InvoicePaymentStatusId.PartiallyPaid,
				Terrasoft.InvoicePaymentStatusId.Paid,
				Terrasoft.InvoicePaymentStatusId.Unpaid,
				Terrasoft.InvoicePaymentStatusId.Set
			]
		}));
		return Promise.resolve(groupFilter);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getAssociatedModelParentFilters: function(associationConfig) {
		return this.getMainModelImportFilters().then(function(mainModelFilters) {
			return new Promise(function(resolve) {
				Terrasoft.DataUtils.loadRecords({
					proxyType: Terrasoft.ProxyType.Offline,
					modelName: "Invoice",
					filters: mainModelFilters,
					columns: ["Id"],
					success: function(loadedRecords) {
						var parentFilter =
							this.getAssociatedModelParentFiltersByInvoices(loadedRecords, associationConfig);
						resolve(parentFilter);
					},
					failure: function() {
						resolve(false);
					},
					scope: this
				});
			}.bind(this));
		}.bind(this));
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getDefaultImportConfig: function() {
		return Ext.merge(this.callParent(arguments), {
			ignoreModelLastSyncDate: false,
			ignoreModelFilters: false,
			shouldCollectRecords: true
		});
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getMainModelImportConfig: function(filters) {
		var importConfig = this.callParent(arguments);
		importConfig.pagesPerLoad = 1;
		importConfig.lastSyncDateKey = this.getSyncKey();
		Terrasoft.Array.pushUnique(importConfig.modelColumns.Invoice, this.periodColumnName);
		return importConfig;
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getAssociationsImportConfig: function() {
		return Ext.merge(this.callParent(arguments), {
			ignoreBinaryData: true,
			pageSize: this.self.ImportPageSize,
			pagesPerLoad: this.self.ImportPagesPerLoad,
			lastSyncDateKey: this.modelName + this.getSyncKey()
		});
	},

	/**
	 * Returns filter for "likes".
	 * @protected
	 * @virtual
	 * @param {String[]} socialMesssageIds Ids of social messages.
	 * @return {Terrasoft.Filter} Filter.
	 */
	getSocialLikeParentFilters: function(socialMesssageIds) {
		return Ext.create("Terrasoft.Filter", {
			property: "SocialMessage",
			funcType: Terrasoft.FilterFunctions.In,
			funcArgs: socialMesssageIds
		});
	},

	/**
	 * Returns import config for "likes".
	 * @protected
	 * @virtual
	 * @param {Object} importConfig Import config.
	 * @param {String[]} socialMesssageIds Ids of social messages.
	 * @return {Terrasoft.Filter} Filter.
	 */
	getSocialLikeImportConfig: function(importConfig, socialMesssageIds) {
		var socialMessageIncludeFilter = this.getSocialLikeParentFilters(socialMesssageIds);
		Ext.apply(importConfig, {
			modelNames: ["SocialLike"],
			modelColumns: {
				SocialLike: ["SocialMessage", "User"]
			},
			specifiedFilters: {
				SocialLike: socialMessageIncludeFilter
			},
			ignoreModelLastSyncDate: true
		});
		return importConfig;
	},
	
	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	onAssociatedModelRecordsImported: function(config) {
		var importConfig = Ext.clone(config.importConfig);
		return this.callParent(arguments).then(function() {
			return new Promise(function(resolve, reject) {
				var ids = [];
				config.importResult.modified.SocialMessage.forEach(function(record) {
					Terrasoft.Array.pushUnique(ids, record.getPrimaryColumnValue());
				});
				if (Ext.isEmpty(ids)) {
					resolve(config.importResult);
					return;
				}
				this.importSocialLikes(importConfig, ids, config.cancellationId).then(function() {
					return this.syncDeletedSocialLikes(ids, config.cancellationId);
				}.bind(this)).then(function() {
					resolve(config.importResult);
				}).catch(function(exception) {
					reject(exception);
				});
			}.bind(this));
		}.bind(this));
	}

	//endregion

});


