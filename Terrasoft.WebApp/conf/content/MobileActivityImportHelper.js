Terrasoft.configuration.Structures["MobileActivityImportHelper"] = {innerHierarchyStack: ["MobileActivityImportHelper"]};
/* globals Activity: false */
/* globals ActivityParticipant: false */
/**
 * @class Terrasoft.configuration.ActivityImportHelper
 */
Ext.define("Terrasoft.configuration.ActivityImportHelper", {
	mixins: {
		observable: "Ext.mixin.Observable"
	},

	statics: {

		/**
		 * Maximum size of records in query for import operations.
		 */
		ImportPageSize: 50

	},

	//region Properties: Private

	/**
	 * @private
	 */
	additionalDays: 0,

	/**
	 * @private
	 */
	activityFilters: null,

	/**
	 * @private
	 */
	activeProcesses: 0,

	/**
	 * @private
	 */
	activeMainProcesses: 0,

	/**
	 * @private
	 */
	participantId: null,

	/**
	 * @private
	 */
	importedPeriodBitMask: null,

	//endregion

	//region Constructors: Public

	constructor: function(config) {
		this.participantId = config.participantId;
		this.activityFilters = config.activityFilters;
		if (Ext.isNumber(config.additionalDays)) {
			this.additionalDays = config.additionalDays;
		}
		this.initProperties();
	},

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	initProperties: function() {
		this.importedPeriodBitMask = {};
	},

	/**
	 * Calls iterator function for each date in interval.
	 * Iterator is called with 2 parameters: current date, index.
	 * @private
	 * @param {Date} startDate Start of interval.
	 * @param {Date} dueDate End of interval.
	 * @param {Function} iterator Iterator function.
	 * @param {Object} scope Scope.
	 */
	eachDate: function(startDate, dueDate, iterator, scope) {
		var diff = Terrasoft.Date.diff(startDate, dueDate, Ext.Date.DAY);
		var total = Math.abs(diff);
		var sign = Math.sign(diff);
		var currentDate = Ext.Date.clone(startDate);
		for (var i = 0; i <= total; i++) {
			if (iterator.call(scope || this, currentDate, i) === false) {
				return;
			}
			currentDate = Terrasoft.Date.add(currentDate, Ext.Date.DAY, sign);
		}
	},

	/**
	 * @private
	 */
	getDayBitMaskConfig: function(date) {
		var year = date.getFullYear();
		var month = date.getMonth();
		return {
			monthKey: Ext.String.format("{0}_{1}", year, month),
			dayMask: this.getDayBitMask(date)
		};
	},

	/**
	 * @private
	 */
	getDayBitMask: function(date) {
		var day = date.getDate();
		return Math.pow(2, day - 1);
	},

	/**
	 * @private
	 */
	markPeriodImported: function(startDate, dueDate, isImported) {
		var periodBitMask = this.getBitMaskByPeriod(startDate, dueDate);
		if (isImported !== false) {
			this.addPeriodBitMask(this.importedPeriodBitMask, periodBitMask);
		} else {
			this.removePeriodBitMask(this.importedPeriodBitMask, periodBitMask);
		}
	},

	/**
	 * @private
	 */
	addPeriodBitMask: function(sourceMask, mask) {
		Terrasoft.each(mask, function(monthMask, monthKey) {
			sourceMask[monthKey] = Terrasoft.BitMask.or(sourceMask[monthKey], monthMask);
		});
	},

	/**
	 * @private
	 */
	removePeriodBitMask: function(sourceMask, mask) {
		Terrasoft.each(mask, function(monthMask, monthKey) {
			sourceMask[monthKey] = Terrasoft.BitMask.xor(sourceMask[monthKey], monthMask);
		});
	},

	/**
	 * @private
	 */
	applyDiffBitMask: function(sourceMask, mask) {
		Terrasoft.each(sourceMask, function(monthMask, monthKey) {
			if (mask[monthKey]) {
				var tmpMask = Terrasoft.BitMask.and(sourceMask[monthKey], mask[monthKey]);
				sourceMask[monthKey] = Terrasoft.BitMask.xor(tmpMask, sourceMask[monthKey]);
			}
		});
	},

	/**
	 * @private
	 */
	getBitMaskByPeriod: function(startDate, dueDate) {
		var periodBitMask = {};
		this.eachDate(startDate, dueDate, function(currentDate) {
			var cacheKey = this.getDayBitMaskConfig(currentDate);
			var days = periodBitMask[cacheKey.monthKey] || 0;
			periodBitMask[cacheKey.monthKey] = Terrasoft.BitMask.add(days, cacheKey.dayMask);
		}, this);
		return periodBitMask;
	},

	/**
	 * @private
	 */
	getPeriodByBitMask: function(periodBitMask) {
		var startDate;
		var dueDate;
		Terrasoft.each(periodBitMask, function(mask, monthKey) {
			var dateParts = monthKey.split("_");
			var monthDate = new Date(dateParts[0], dateParts[1]);
			var tmpDate = new Date(monthDate);
			var daysInMonth = Ext.Date.getDaysInMonth(tmpDate);
			for (var i = 1; i <= daysInMonth; i++) {
				tmpDate.setDate(i);
				var tmpBitMask = this.getDayBitMask(tmpDate);
				if (Terrasoft.BitMask.isIntersected(tmpBitMask, mask)) {
					if (!startDate || startDate > tmpDate) {
						startDate = new Date(tmpDate);
					}
					if (!dueDate || dueDate < tmpDate) {
						dueDate = new Date(tmpDate);
					}
				}
			}
		}, this);
		if (!startDate || !dueDate) {
			return null;
		} else {
			return {
				startDate: startDate,
				dueDate: dueDate
			};
		}
	},

	/**
	 * @private
	 */
	calculateImportPeriod: function(startDate, dueDate) {
		startDate = Terrasoft.Date.add(startDate, Ext.Date.DAY, -this.additionalDays);
		dueDate = Terrasoft.Date.add(dueDate, Ext.Date.DAY, this.additionalDays);
		var periodBitMask = this.getBitMaskByPeriod(startDate, dueDate);
		this.applyDiffBitMask(periodBitMask, this.importedPeriodBitMask);
		return this.getPeriodByBitMask(periodBitMask);
	},

	/**
	 * @private
	 */
	getEmbeddedDetails: function() {
		if (!Ext.isArray(this.detailConfigs)) {
			this.detailConfigs = [];
			var columnSets = Terrasoft.sdk.RecordPage.getColumnSets("Activity");
			columnSets.each(function(columnSetConfig) {
				if (Terrasoft.sdk.RecordPage.getIsEmbeddedDetail(columnSetConfig)) {
					this.detailConfigs.push(columnSetConfig);
				}
			}, this);
		}
		return this.detailConfigs;
	},

	/**
	 * @private
	 */
	importDetails: function(activityIds) {
		var detailConfigs = this.getEmbeddedDetails();
		return this.importActivityDetails({
			activityIds: activityIds,
			detailConfigs: detailConfigs
		});
	},

	/**
	 * @private
	 */
	saveActivityImportLastSyncDate: function() {
		var importLastSyncDate = new Date();
		var profileValue = JSON.stringify(importLastSyncDate);
		Terrasoft.MobileProfileManager.saveData({
			key: "ActivityImportLastSyncDate",
			value: profileValue,
			failure: function(exception) {
				Terrasoft.MessageBox.showException(exception);
			},
			scope: this
		});
	},

	/**
	 * @private
	 */
	doImportByPeriod: function(config) {
		var startDate = config.startDate;
		var dueDate = config.dueDate;
		this.importActivity(config, function(activityIds) {
			this.saveActivityImportLastSyncDate();
			if (this.isDestroyed) {
				return;
			}
			if (activityIds.length > 0) {
				if (config.importDetails) {
					var scope = this;
					if (config.isMain) {
						this.createDefaultParticipants(activityIds, function() {
							this.activeMainProcesses--;
							this.fireEvent("imported", {
								isMain: true,
								isDataChanged: true
							});
							this.importDetails(activityIds).then(function() {
								scope.finish();
							}).catch(function(exception) {
								scope.callFailure(startDate, dueDate, exception);
							});
						});
					} else {
						this.importDetails(activityIds).then(function() {
							scope.fireEvent("imported", {
								isMain: false,
								isDataChanged: true
							});
							scope.finish();
						}).catch(function(exception) {
							scope.callFailure(startDate, dueDate, exception);
						});
					}
				} else {
					this.createDefaultParticipants(activityIds, function() {
						if (config.isMain) {
							this.activeMainProcesses--;
						}
						this.fireEvent("imported", {
							isMain: config.isMain,
							isDataChanged: true
						});
					});
				}
			} else {
				if (config.isMain) {
					this.activeMainProcesses--;
				}
				this.fireEvent("imported", {
					isMain: config.isMain,
					isDataChanged: false
				});
				this.finish();
			}
		}, function(exception) {
			if (config.isMain) {
				this.activeMainProcesses--;
			}
			this.callFailure(startDate, dueDate, exception);
		});
	},

	/**
	 * @private
	 */
	callFailure: function(startDate, dueDate, exception) {
		this.markPeriodImported(startDate, dueDate, false);
		this.finish(exception);
	},

	/**
	 * @private
	 */
	start: function() {
		this.fireEvent("start");
		this.activeProcesses++;
	},

	/**
	 * @private
	 */
	finish: function(exception) {
		this.activeProcesses--;
		this.fireEvent("finish", Ext.isEmpty(exception), exception);
	},

	/**
	 * @private
	 */
	importActivity: function(config, success, failure) {
		var activityFilters = this.getActivityFilters(config.startDate, config.dueDate);
		if (this.isDestroyed) {
			return;
		}
		var syncConfig = {
			trackAnalytics: config.isMain,
			ignoreModelLastSyncDate: true,
			ignoreModelFilters: true,
			shouldCollectRecords: true,
			modelNames: ["Activity"],
			modelColumns: config.modelColumns,
			pageSize: config.isMain ? Terrasoft.AllRecords : this.self.ImportPageSize,
			pagesPerLoad: 1,
			shouldCalculateTotal: false,
			specifiedFilters: {
				Activity: activityFilters
			},
			modelImported: function(modelName, loadedRecords) {
				if (this.isDestroyed) {
					return;
				}
				var activityIds = [];
				if (Ext.isArray(loadedRecords)) {
					for (var i = 0, ln = loadedRecords.length; i < ln; i++) {
						activityIds.push(loadedRecords[i].getId());
					}
				}
				this.deleteUnexistingActivities(activityIds, activityFilters, function() {
					Ext.callback(success, this, [activityIds]);
				});
			},
			failure: failure,
			scope: this
		};
		var operationConfig = {
			priority: config.isMain ? Terrasoft.SyncPriority.Normal : Terrasoft.SyncPriority.Minimum
		};
		if (!Terrasoft.Platform.isWebKit && Terrasoft.Features.getIsEnabled("UseMobileNativeImport")) {
			syncConfig.pageSize = Terrasoft.AllRecords;
			syncConfig.modelImported = function(modelName, activityIds) {
				if (this.isDestroyed) {
					return;
				}
				this.deleteUnexistingActivities(activityIds, activityFilters, function() {
					Ext.callback(success, this, [activityIds]);
				});
			};
			Terrasoft.SyncManager.runNativeImport(syncConfig, operationConfig);
		} else {
			Terrasoft.SyncManager.runImport(syncConfig, operationConfig);
		}
	},

	/**
	 * @private
	 */
	getActivityFilters: function(startDate, dueDate) {
		var filters = this.activityFilters.clone();
		startDate = Ext.Date.clone(startDate);
		startDate.setHours(0, 0, 0, 0);
		dueDate = Ext.Date.clone(dueDate);
		dueDate.setHours(23, 59, 59, 999);
		var startDateFilter = filters.findSubfilterByName("StartDateFilter").filter;
		var dueDateFilter = filters.findSubfilterByName("DueDateFilter").filter;
		startDateFilter.setValue(dueDate);
		dueDateFilter.setValue(startDate);
		var ownerFilter = filters.findSubfilterByName("ActivityByOwnerFilter").filter;
		ownerFilter.setValue(this.getParticipantId());
		return filters;
	},

	/**
	 * @private
	 */
	deleteUnexistingActivities: function(activityIds, activityFilters, callback) {
		if (activityIds.length > 0) {
			activityFilters.addFilter({
				property: "Id",
				funcType: Terrasoft.FilterFunctions.NotIn,
				funcArgs: activityIds
			});
		}
		activityFilters.addFilter({
			type: Terrasoft.FilterTypes.Group,
			isNot: true,
			subfilters: [
				{
					modelName: "SysMobileLog",
					operation: Terrasoft.FilterOperations.Any,
					assocProperty: "RecordId"
				}
			]
		});
		var sql = Terrasoft.Sql.DeleteBuilder.build({
			model: Activity,
			filter: activityFilters
		});
		Terrasoft.Sql.DBExecutor.executeSql({
			isCancelable: true,
			sqls: [sql],
			success: function() {
				Ext.callback(callback, this);
			},
			failure: function() {
				Ext.callback(callback, this);
			},
			scope: this
		});
	},

	/**
	 * @private
	 */
	importActivityDetails: function(config) {
		return new Promise(function(resolve, reject) {
			var modelNames = [];
			var expandLookups = {};
			var specifiedFilters = {};
			for (var i = 0, ln = config.detailConfigs.length; i < ln; i++) {
				var detailConfig = config.detailConfigs[i];
				var modelName = detailConfig.modelName;
				modelNames.push(modelName);
				specifiedFilters[modelName] = Ext.create("Terrasoft.Filter", {
					property: detailConfig.foreignKey,
					funcType: Terrasoft.FilterFunctions.In,
					funcArgs: config.activityIds
				});
				var columnsCollection = detailConfig.columns.getCollection();
				expandLookups[modelName] = columnsCollection.keys;
			}
			var syncConfig = {
				ignoreModelLastSyncDate: true,
				ignoreModelFilters: true,
				ignoreBinaryData: true,
				pageSize: this.self.ImportPageSize,
				pagesPerLoad: 1,
				shouldCalculateTotal: false,
				expandLookups: expandLookups,
				modelNames: modelNames,
				specifiedFilters: specifiedFilters,
				modelImported: function(importedModelName) {
					if (importedModelName === "ActivityParticipant") {
						this.deleteDefaultParticipants(config.activityIds);
					}
				}.bind(this),
				success: function() {
					resolve();
				},
				failure: function(exception) {
					reject(exception);
				}
			};
			var operationConfig = {
				priority: Terrasoft.SyncPriority.Normal
			};
			if (!Terrasoft.Platform.isWebKit && Terrasoft.Features.getIsEnabled("UseMobileNativeImport")) {
				syncConfig.pageSize = Terrasoft.AllRecords;
				Terrasoft.SyncManager.runNativeImport(syncConfig, operationConfig);
			} else {
				Terrasoft.SyncManager.runImport(syncConfig, operationConfig);
			}
		}.bind(this));
	},

	/**
	 * @private
	 */
	deleteDefaultParticipants: function(activityIds) {
		var deleteSql = Terrasoft.Sql.DeleteBuilder.build({
			filter: Ext.create("Terrasoft.Filter", {
				type: Terrasoft.FilterTypes.Group,
				subfilters: [
					{
						property: "Activity",
						funcType: Terrasoft.FilterFunctions.In,
						funcArgs: activityIds
					},
					{
						property: Terrasoft.SystemColumnName.ModifiedOn,
						compareType: Terrasoft.ComparisonTypes.Equal,
						value: null
					},
					{
						property: "Participant",
						value: this.participantId
					}
				]
			}),
			model: ActivityParticipant
		});
		Terrasoft.Sql.DBExecutor.executeSql({
			isCancelable: false,
			sqls: [deleteSql]
		});
	},

	/**
	 * @private
	 */
	createDefaultParticipants: function(loadedActivityIds, callback) {
		var sqls = [];
		var saveQueryConfig = Ext.create("Terrasoft.QueryConfig", {
			modelName: "ActivityParticipant",
			columns: ["Id", "Activity", "Participant"],
			isLogged: false,
			updateSysColumns: false
		});
		for (var i = 0, ln = loadedActivityIds.length; i < ln; i++) {
			var activityId = loadedActivityIds[i];
			var record = ActivityParticipant.create({
				Id: Terrasoft.util.genGuid(),
				Activity: activityId,
				Participant: this.participantId
			});
			var sql = Terrasoft.Sql.InsertBuilder.build({
				queryConfig: saveQueryConfig,
				model: record.self,
				record: record
			});
			sqls.push(sql);
		}
		Terrasoft.Sql.DBExecutor.executeSql({
			isCancelable: false,
			sqls: sqls,
			success: callback,
			failure: callback,
			scope: this
		});
	},

	//endregion

	//region Methods: Public

	/**
	 * Returns participant Id.
	 * @return {String} Participant Id.
	 */
	getParticipantId: function() {
		return this.participantId;
	},

	/**
	 * Runs import.
	 * @param {Object} config.
	 * @param {Date} config.startDate Start date.
	 * @param {Date} config.dueDate Due date.
	 * @param {Boolean} config.isMain If false, 'imported' event will not be fired
	 * and method hasActiveMainProcesses returns false.
	 * @param {Boolean} config.importDetails If false, details will not be imported.
	 * @param {Object} config.modelColumns List of columns to be imported.
	 * @param {Boolean} config.disablePeriodCache If true, The period cache will not be used.
	 */
	importByPeriod: function(config) {
		var isMain = config.isMain !== false;
		var period;
		if (config.disablePeriodCache) {
			period = {
				startDate: config.startDate,
				dueDate: config.dueDate
			};
		} else {
			period = this.calculateImportPeriod(config.startDate, config.dueDate);
			if (period) {
				this.markPeriodImported(period.startDate, period.dueDate);
			}
		}
		if (period) {
			this.start();
			if (isMain) {
				this.activeMainProcesses++;
			}
			this.doImportByPeriod({
				startDate: period.startDate,
				dueDate: period.dueDate,
				isMain: isMain,
				importDetails: config.importDetails !== false,
				modelColumns: config.modelColumns
			});
		}
	},

	/**
	 * Returns false, if there are no active processes.
	 * @return {Boolean} False, if there are no active processes.
	 */
	hasActiveProcesses: function() {
		return this.activeProcesses !== 0;
	},

	/**
	 * Returns false, if there are no active main processes.
	 * @return {Boolean} False, if there are no active main processes.
	 */
	hasActiveMainProcesses: function() {
		return this.activeMainProcesses !== 0;
	}

	//endregion

});


