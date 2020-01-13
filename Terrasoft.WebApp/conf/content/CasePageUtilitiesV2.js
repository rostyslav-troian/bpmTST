Terrasoft.configuration.Structures["CasePageUtilitiesV2"] = {innerHierarchyStack: ["CasePageUtilitiesV2"]};
define("CasePageUtilitiesV2", ["StorageUtilities"],
	function(StorageUtilities) {
		/**
		 * @class Terrasoft.configuration.mixins.CasePageUtilitiesV2
		 * Mixin, implemented quickly saving case card with the selected case status.
		 */
		Ext.define("Terrasoft.configuration.mixins.CasePageUtilitiesV2", {
			alternateClassName: "Terrasoft.CasePageUtilitiesV2",

			/**
			 * Case next status collection cache.
			 * Stores all status and next steps.
			 */
			caseStatusCache: null,

			/**
			 * Case status collection cache.
			 * Stores all statuses.
			 */
			caseStatuses: null,
			/**
			 * Stores all distinct statuses as one-dimensional array. Lazy initialization.
			 */
			flatCaseStatusCache: null,

			/**
			 * Current case record Id.
			 */
			caseRecordId: "",

			/**
			 * Current resolved buttons menuItems collection.
			 */
			resolvedButtonMenuItems: null,

			/**
			 * @obsolete
			 */
			generateResolvedButtonMenuItems: function() {
				this.log(this.Ext.String.format(this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
					"generateResolvedButtonMenuItems", "initResolvedButtonCollection"), Terrasoft.LogMessageType.WARNING);
			},

			/**
			 * @obsolete
			 */
			getResolvedButtonMenu: function() {
				this.log(this.Ext.String.format(this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
					"getResolvedButtonMenu", "initResolvedButtonCollection"), Terrasoft.LogMessageType.WARNING);
			},

			/**
			 * Initialize resolved button.
			 * @param {String} recordId Case record Id
			 */
			initResolvedButtonCollection: function(recordId) {
				this.caseRecordId = recordId;
				this.initCollection();
				this.initCache();
				this.setCollectionValue();
			},

			/**
			 * Initialize resolved button menu items collection.
			 */
			initCollection: function() {
				if (!this.get("ResolvedButtonMenuItems")) {
					this.set("ResolvedButtonMenuItems", this.Ext.create("Terrasoft.BaseViewModelCollection"));
				}
				this.resolvedButtonMenuItems = this.get("ResolvedButtonMenuItems");
			},

			/**
			 * Initialize case status cache.
			 */
			initCache: function() {
				this.caseStatusCache = StorageUtilities.getItem("CaseStatusCache");
				this.caseStatuses = StorageUtilities.getItem("CaseStatuses");
				if (!this.caseStatusCache) {
					this.set("ResolvedButtonMenuVisible", false);
					this.initCaseStatusCache();
				}
			},

			/**
			 * Initialize case status cache using DCM and CaseStatus or CaseStatusNext.
			 * @protected
			 */
			initCaseStatusCache: function() {
				if(this.getIsFeatureEnabled("CaseStagesFromDCM")) {
					this.initCaseStatusCacheFromDcm();
				} else {
					this.getCaseNextStatuses();
				}
			},

			/**
			 * Initialize case status cache using DCM and CaseStatus.
			 * @protected
			 */
			initCaseStatusCacheFromDcm: function() {
				var caseStatusEsq = this._createCaseStatusEsq();
				caseStatusEsq.getEntityCollection(this.handleCaseStatusRequest, this);
			},

			/**
			 * Match DCM data and CaseStatus.
			 * @protected
			 * @param {Object} result Response from query.
			 */
			handleCaseStatusRequest: function(result) {
				if (!result.success) {
					return;
				}
				this.initializeCaseStatuses(result.collection);
				this.matchDcmCaseStatus(result.collection);
			},

			/**
			 * Create CaseStatus cache collection and store it.
			 * @protected
			 * @param {Terrasoft.Collection} caseStatuses Response collection from query.
			 */
			initializeCaseStatuses: function(caseStatuses) {
				this.caseStatuses = {};
				var caseStatusCollection = caseStatuses.getItems();
				Terrasoft.each(caseStatusCollection, function(currentStatus) {
					var element = {
						"value": currentStatus.get("Status"),
						"IsFinal": currentStatus.get("IsFinal"),
						"IsResolved": currentStatus.get("IsResolved"),
						"IsPaused": currentStatus.get("IsPaused"),
						"ClosureCode": currentStatus.get("ClosureCode"),
						"Caption": currentStatus.get("Caption"),
						"IsCloseOnSave": currentStatus.get("IsCloseOnSave"),
						"displayValue": currentStatus.get("Name")
					};
					this.caseStatuses[element.value] = element;
				}, this);
				StorageUtilities.setItem(this.caseStatuses, "CaseStatuses");
			},

			/**
			 * Match DCM data and CaseStatusCollection.
			 * @protected
			 * @param {Terrasoft.Collection} caseStatuses Response collection from query.
			 */
			matchDcmCaseStatus: function(caseStatuses) {
				var dcmSchema = this.get("DcmSchema");
				if(dcmSchema && dcmSchema.stages) {
					var stages = dcmSchema.stages;
					this.caseStatusCache = {};
					stages.each(function (item) {
						var sourceStageUId = item.uId;
						var caseStatusCollection = caseStatuses.getItems();
						var outgoingConnections = dcmSchema.stageConnections.getOutgoingConnections(sourceStageUId);
						var availableStages = outgoingConnections.map(function (connection) {
							var referenceStage = dcmSchema.stages.get(connection.target);
							return referenceStage.stageRecordId;
						});
						this.caseStatusCache[item.stageRecordId] = this.createCaseNextStatus(availableStages,
								caseStatusCollection);
					}, this);
					StorageUtilities.setItem(this.caseStatusCache, "CaseStatusCache");
				}
			},

			/**
			 * Match DCM data and CaseStatus data into CaseNextStatusElement.
			 * @protected
			 * @param {Terrasoft.Collection} availableStages Available stages from Dcm.
			 * @param {Terrasoft.Collection} caseStatusCollection Response from query to CaseStatus.
			 * @return {Object} CaseNextStatusElementCollection.
			 */
			createCaseNextStatus: function(availableStages, caseStatusCollection) {
				var result = {};
				Terrasoft.each(availableStages, function(currentStage) {
					var currentStageData = caseStatusCollection.find(function(entity){
						return entity.get("Status") === currentStage;});
					if(currentStageData) {
						var element = {
							"value": currentStage,
							"IsFinal": currentStageData.get("IsFinal"),
							"IsResolved": currentStageData.get("IsResolved"),
							"IsPaused": currentStageData.get("IsPaused"),
							"ClosureCode": currentStageData.get("ClosureCode"),
							"Caption": currentStageData.get("Caption"),
							"IsCloseOnSave": currentStageData.get("IsCloseOnSave"),
							"displayValue": currentStageData.get("Name")
						};
						result[currentStage] = element;
					}
					}, this);
				return result;
			},

			/**
			 * Creates esq to case status.
			 * @private
			 * @return {Terrasoft.EntitySchemaQuery} Esq to case statuses.
			 */
			_createCaseStatusEsq: function() {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "CaseStatus"
				});
				esq.addColumn("Id", "Status");
				esq.addColumn("Name");
				esq.addColumn("ButtonCaption", "Caption");
				esq.addColumn("ClosureCode");
				esq.addColumn("IsFinal");
				esq.addColumn("IsResolved");
				esq.addColumn("IsPaused");
				esq.addColumn("IsCloseOnSave");
				return esq;
			},

			/**
			 * Creates query to receive case next statuses.
			 */
			getCaseNextStatuses: function() {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "CaseNextStatus"
				});
				esq.addColumn("NextStatus", "NextStatus");
				esq.addColumn("NextStatus.ButtonCaption", "Caption");
				esq.addColumn("NextStatus.ClosureCode", "ClosureCode");
				esq.addColumn("NextStatus.IsFinal", "IsFinal");
				esq.addColumn("NextStatus.IsResolved", "IsResolved");
				esq.addColumn("NextStatus.IsPaused", "IsPaused");
				esq.addColumn("NextStatus.IsCloseOnSave", "IsCloseOnSave");
				var sortById = esq.addColumn("Status");
				sortById.orderPosition = 0;
				sortById.orderDirection = this.Terrasoft.OrderDirection.ASC;
				var sortByCreatedOn = esq.addColumn("CreatedOn");
				sortByCreatedOn.orderPosition = 1;
				sortByCreatedOn.orderDirection = this.Terrasoft.OrderDirection.ASC;
				esq.getEntityCollection(this.updateCaseStatusCache, this);
			},

			/**
			 * Update case next statuses cache.
			 * @param {Object} result Response from query
			 */
			updateCaseStatusCache: function(result) {
				this.caseStatusCache = {};
				if (!result.success) {
					StorageUtilities.setItem(this.caseStatusCache, "CaseStatusCache");
					return;
				}
				var currentItem, nextStatuses;
				result.collection.each(function(item) {
					if (currentItem !== item.get("Status").value) {
						if (typeof nextStatuses !== "undefined") {
							this.caseStatusCache[currentItem] = nextStatuses;
						}
						currentItem = item.get("Status").value;
						nextStatuses = {};
					}
					var statusProperties = {
						"IsFinal": item.get("IsFinal"),
						"IsResolved": item.get("IsResolved"),
						"IsPaused": item.get("IsPaused"),
						"ClosureCode": item.get("ClosureCode"),
						"Caption": item.get("Caption"),
						"IsCloseOnSave": item.get("IsCloseOnSave")
					};
					var nextStatus = item.get("NextStatus");
					Ext.apply(nextStatus, statusProperties);
					nextStatuses[nextStatus.value] = nextStatus;
				}, this);

				this.caseStatusCache[currentItem] = nextStatuses;
				StorageUtilities.setItem(this.caseStatusCache, "CaseStatusCache");
				this.setCollectionValue();
			},

			/**
			 * Sets resolved button menu collection.
			 */
			setCollectionValue: function() {
				if (!this.caseStatusCache) {
					this.initNotEmptyCollection();
					return;
				}
				var defaultStatus = this.get("StatusDefSysSettingsValue");
				var isCopyMode = this.values && this.values.Operation === "copy" && !this.get("Status");
				if (!this.caseRecordId) {
					this.caseRecordId = this.values.PrimaryColumnValue;
				}
				if (this.caseRecordId && !isCopyMode) {
					this.getCaseStatus();
				} else if (defaultStatus) {
					this.getNextStatusesFromCache(defaultStatus.value);
				}
			},

			/**
			 * Initialize collection if there are not cache stored.
			 */
			initNotEmptyCollection: function() {
				var collection = this.get("ResolvedButtonMenuItems");
				collection.addItem(this.getButtonMenuItem({
					"Visible": true
				}, this));
			},

			/**
			 * Queries case status by case record id.
			 */
			getCaseStatus: function() {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "Case"
				});
				esq.addColumn("Status", "CaseStatus");
				esq.filters.add("caseFilter", this.Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Id", this.caseRecordId));
				esq.getEntityCollection(this.onGetCaseRecord, this);
			},

			/**
			 * On get case status handler.
			 * @param {Object} result Response from query
			 */
			onGetCaseRecord: function(result) {
				if (!result.success) {
					return;
				}
				var record = result.collection.getByIndex(0);
				if (record) {
					var status = record.get("CaseStatus");
					this.getNextStatusesFromCache(status.value);
				}
			},

			/**
			 * Gets case next status config from cache.
			 * @param {String} statusId Current status id
			 */
			getNextStatusesFromCache: function(statusId) {
				var nextStatuses = Object.create(null);
				if (statusId) {
					nextStatuses = this.caseStatusCache[statusId];
				}
				this.generateButtonMenuItems(nextStatuses);
				this.updateButtonCaption();
			},

			/**
			 * Returns caseStatusCache as flat array with distinct values.
			 * @return {Array} flatCaseStatusCache Flat array of case statuses.
			 */
			getFlatCaseStatusCache: function() {
				this.flatCaseStatusCache = [];
				this.Terrasoft.each(this.caseStatusCache, function(outerObj) {
					this.Terrasoft.each(outerObj, function(innerObj, index) {
						if (this.Ext.isEmpty(this.flatCaseStatusCache[index])) {
							this.flatCaseStatusCache[index] = innerObj;
						}
					}, this);
				}, this);
				return this.flatCaseStatusCache;
			},

			/**
			 * Returns Status with status properties.
			 * @return {Object} status with it`s properties.
			 */
			getCaseStatusFromStatusCache: function(status) {
				return this.Ext.isEmpty(this.caseStatuses && this.caseStatuses[status.value]) ?
					status : this.caseStatuses[status.value];
			},

			/**
			 * Generates resolved button menu items collection for current status.
			 * @param {object} nextStatuses Next status config
			 */
			generateButtonMenuItems: function(nextStatuses) {
				this.resolvedButtonMenuItems.clear();
				for (var statusId in nextStatuses) {
					var status = nextStatuses[statusId];
					var tag = {
						"Status": status
					};
					this.resolvedButtonMenuItems.addItem(this.getButtonMenuItem({
						"Caption": status.Caption,
						"Tag": tag,
						"Visible": true,
						"Click": {"bindTo": "onResolvedButtonMenuClick"}
					}, this));
				}
			},

			/**
			 * Updates resolved button caption.
			 */
			updateButtonCaption: function() {
				if (this.resolvedButtonMenuItems.getCount() &&
						!this.getIsFeatureEnabled("ResolvedButtonMenuIsNotVisible")) {
					this.set("ResolvedButtonMenuCaption", this.resolvedButtonMenuItems.getByIndex(0).get("Caption"));
					this.set("ResolvedButtonMenuVisible", true);
				} else {
					this.set("ResolvedButtonMenuVisible", false);
				}
			}
		});
	});


