Terrasoft.configuration.Structures["DuplicatesSearchUtilitiesV2"] = {innerHierarchyStack: ["DuplicatesSearchUtilitiesV2"]};
define("DuplicatesSearchUtilitiesV2", ["StorageUtilities", "ConfigurationConstants", "RightUtilities",
		"DuplicatesSearchUtilitiesV2Resources"],
	function(storageUtilities, ConfigurationConstants, RightUtilities) {
		Ext.define("Terrasoft.configuration.mixins.DuplicatesSearchUtilitiesV2", {
			alternateClassName: "Terrasoft.DuplicatesSearchUtilitiesV2",

			/**
			 * #### ###### # ####### ####
			 * @protected
			 * @type {String}
			 */
			storageKey: "DuplicateStorage",

			/**
			 * Detail duplicate attribute template.
			 * @private
			 * @type {String}
			 */
			_detailDuplicateAttributeTpl: "DetailRuleValues_{0}",

			/**
			 * Communications schema names.
			 * @private
			 * @type {String[]}
			 */
			_communicationSchemaNames: ["ContactCommunication", "AccountCommunication"],

			/**
			 * Returns default deduplication results view columns.
			 * @returns {String[]} Default deduplication results view columns.
			 * @private
			 */
			_getDefaultDeduplicationViewColumns: function() {
				var entity = this.entitySchema || Terrasoft[this.getDuplicateSchemaName()] || {};
				var columnNames = [];
				if (entity.primaryDisplayColumnName) {
					columnNames.push(entity.primaryDisplayColumnName);
				}
				var ownerColumn = entity.columns && entity.columns.Owner;
				if (ownerColumn) {
					columnNames.push(ownerColumn.name);
				}
				return columnNames;
			},

			/**
			 * Calls iterator function for all rules filters.
			 * @param {Function} iterator Iterator function for all rules filters.
			 * @private
			 */
			_iterateAllDeduplicationColumns: function(iterator) {
				var rules = this.getDeduplicationSettings();
				this.Terrasoft.each(rules, iterator, this);
			},

			/**
			 * Append root entity column values to duplicate rule filter values.
			 * @private
			 * @param {String[]} rootSchemaColumns Root schema column names.
			 * @param {String[]} filterValues Duplicate rule filter values.
			 */
			_appendRootEntityValues: function(rootSchemaColumns, filterValues) {
				this.Terrasoft.each(rootSchemaColumns, function(columnName) {
					var rootEntityValue = this.get(columnName);
					if (!this.Ext.isEmpty(rootEntityValue)) {
						filterValues.push(rootEntityValue.displayValue || rootEntityValue);
					}
				}, this);
			},

			/**
			 * @private
			 */
			_getCommunicationFilterValues: function(filter) {
				var communicationValues = this.getCommunications();
				var filterCommunications = this.Terrasoft.filter(communicationValues, function(communication) {
					return communication.CommunicationId === filter.type;
				}, this);
				var communicationFilterValues = this.Terrasoft.map(filterCommunications, function(item) {
					return item.Number;
				}, this);
				this._appendRootEntityValues(filter.rootSchemaColumns, communicationFilterValues);
				return this.Ext.Array.unique(communicationFilterValues);
			},

			/**
			 * @private
			 */
			_getDetailFilterValues: function(filter) {
				var detailModelAttribute = this.getDetailDuplicateAttributeName(filter.schemaName);
				var cardModelValue = this.get(filter.columnName) || null;
				cardModelValue = cardModelValue && cardModelValue.displayValue || cardModelValue;
				var cardModelDetailValues = this.get(detailModelAttribute) || {};
				var cardModelDetailColumnValues = cardModelDetailValues[filter.columnName] || [];
				if (cardModelValue) {
					cardModelDetailColumnValues.push(cardModelValue);
				}
				this._appendRootEntityValues(filter.rootSchemaColumns, cardModelDetailColumnValues);
				return this.Ext.Array.unique(cardModelDetailColumnValues);
			},

			/**
			 * @private
			 */
			_getDuplicateRuleDetailColumns: function(detailEntitySchemaName) {
				var duplicateDetailColumns = [];
				this._iterateAllDeduplicationColumns(function(filter) {
					if (filter.schemaName === detailEntitySchemaName) {
						duplicateDetailColumns.push(filter.columnName);
					}
				});
				return duplicateDetailColumns;
			},

			/**
			 * Returns detail duplicate card attribute name.
			 * @protected
			 * @param {String} entitySchemaName
			 * @returns {String} Detail duplicate card attribute name.
			 */
			getDetailDuplicateAttributeName: function(entitySchemaName) {
				return this.Ext.String.format(this._detailDuplicateAttributeTpl, entitySchemaName);
			},

			/**
			 * ########## #### #### ############# ########### ##### ######
			 * @protected
			 * @virtual
			 * @return {string} ########## #### #### ############# ########### ##### ######
			 */
			getPerformSearchOnSaveKey: function() {
				return this.entitySchema.name + "PerformSearchOnSave";
			},

			/**
			 * ########## ############# ###### ###### ######
			 * @protected
			 * @virtual
			 * @return {string} ########## ############# ###### ###### ######
			 */
			getDuplicateSearchPageId: function() {
				return this.sandbox.id + "_LocalDuplicateSearchPage";
			},

			/**
			 * ########## ### ########## ###### ### ###### ######
			 * @protected
			 * @virtual
			 * @return {string} ########## ### ########## ###### ### ###### ######
			 */
			getFindDuplicatesMethodName: Terrasoft.abstractFn,

			/**
			 * ########## ### ########## ###### ########## ########## ###### # #######
			 * @protected
			 * @virtual
			 * @return {string} ########## ### ########## ###### ########## ########## ###### # #######
			 */
			getSetDuplicatesMethodName: Terrasoft.abstractFn,

			/**
			 * Initialize available find duplicate on save.
			 * @protected
			 */
			initPerformSearchOnSave: function() {
				if (this.getIsFeatureEnabled("ESDeduplication")) {
					this.set("PerformSearchOnSave", true);
				} else {
					var performSearchOnSave = storageUtilities.getItem(this.storageKey,
						this.getPerformSearchOnSaveKey());
					if (!this.Ext.isEmpty(performSearchOnSave)) {
						this.set("PerformSearchOnSave", performSearchOnSave);
					} else {
						var serviceMethodName = "Get" + this.getPerformSearchOnSaveKey();
						Terrasoft.delay(this.callService, this, 1000, [{
							serviceName: "SearchDuplicatesService",
							methodName: serviceMethodName,
							encodeData: false
						}, function(response) {
							performSearchOnSave = response[serviceMethodName + "Result"];
							storageUtilities.setItem(performSearchOnSave, this.storageKey,
								this.getPerformSearchOnSaveKey());
							this.set("PerformSearchOnSave", performSearchOnSave);
						}, this]);
					}
				}
			},

			/**
			 * ############## ######### #######, ############# ## ########### #########
			 * @protected
			 * @virtual
			 */
			init: function() {
				if (this.getIsEntityDeduplicationEnabled()) {
					this.initPerformSearchOnSave();
					this.sandbox.subscribe("GetDuplicateSearchConfig", function() {
						return {
							entitySchemaName: this.entitySchema.name,
							cardSandBoxId: this.sandbox.id, //TODO: ### ## ######## ######?
							list: this.get("FindDuplicatesResult"),
							dataSend: this.get("DuplicatesDataSend") // TODO: Нужно подумать,
							// ###### LocalDuplicateSearchPage # #### ###### ## ###############
						};
					}, this, [this.getDuplicateSearchPageId()]);
					this.sandbox.subscribe("FindDuplicatesResult", function(result) {
						var dataSend = {
							notDuplicateList: result.collection,
							request: result.config.request
						};
						this.set("DuplicateResponse", dataSend);
						this.save(function() {
							Ext.callback(result.callback, result.scope);
							this.sandbox.unloadModule(this.getDuplicateSearchPageId(), "centerPanel");
						}, this);
					}, this, [this.sandbox.id]);
				}
			},

			/**
			 * Finds duplicates on save. If there is a matching / similar records, these records show.
			 * Else, calls callback function.
			 * @protected
			 * @virtual
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			findOnSave: function(callback, scope) {
				if (this.getIsEntityDeduplicationEnabled()) {
					if (this.get("DuplicateResponse")) {
						var resultObject = {success: true};
						callback.call(scope, resultObject);
					} else {
						this.findDuplicates(callback, scope);
					}
				} else {
					this.Ext.callback(callback, scope || this);
				}
			},

			/**
			 * Calls service for find duplicates.
			 * @protected
			 * @virtual
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			findDuplicates: function(callback, scope) {
				if (this.getIsFeatureEnabled("ESDeduplication")) {
					this.findElasticDuplicates(callback, scope);
					return;
				}
				var data = this.getDataForFindDuplicatesService();
				var serviceName = this.getDuplicatesServiceName();
				var methodName = this.getFindDuplicatesServiceMethodName();
				this.set("DuplicatesDataSend", data);
				this.set("FindDuplicatesMethodName", methodName);
				this.callService({
					data: data,
					serviceName: serviceName,
					methodName: methodName,
					encodeData: false
				}, this.handleResponseFindDuplicatesService.bind(this, callback, scope), this);
			},

			/**
			 * Calls service for find elastic duplicates.
			 * @protected
			 * @virtual
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			findElasticDuplicates: function(callback, scope) {
				var data = this.getElasticDuplicatesServiceData();
				this.set("DuplicatesDataSend", data);
				this.callService({
					data: data,
					serviceName: "DeduplicationServiceV2",
					methodName: "FindDuplicatesOnSave",
					encodeData: false
				}, this.handleResponseFindDuplicatesService.bind(this, callback, scope), this);
			},

			_getEntitySchema: function() {
				return this.entitySchema || Terrasoft[this.getDuplicateSchemaName()] || {};
			},

			/**
			 * Returns primary column value for exclude from duplication search result.
			 * @protected
			 * @return {string} Primary column value.
			 */
			getPrimaryColumnValue: function() {
				var entity = this._getEntitySchema();
				return this.get(entity.primaryColumnName) || null;
			},

			/**
			 * Returns data for elastic duplicates service.
			 * @protected
			 * @return {Object} Data for elastic duplicates service.
			 */
			getElasticDuplicatesServiceData: function() {
				var columns = this.getDeduplicationViewDataColumns();
				var entity = this._getEntitySchema();
				if (entity.primaryColumnName && !this.Terrasoft.contains(columns, entity.primaryColumnName)) {
					columns.push(entity.primaryColumnName);
				}
				var data = {
					"schemaName": this.getDuplicateSchemaName(),
					"primaryColumnValue": this.getPrimaryColumnValue() || null,
					"model": this.getDeduplicationModel(),
					"columns": columns
				};
				return data;
			},

			/**
			 * Returns name of find duplicates service method.
			 * @protected
			 * @virtual
			 * @return {String} Name of service method.
			 */
			getFindDuplicatesServiceMethodName: function() {
				return this.getFindDuplicatesMethodName();
			},

			/**
			 * Returns name of find duplicates service method.
			 * @protected
			 * @virtual
			 * @return {String} Name of service.
			 */
			getDuplicatesServiceName: function() {
				return "SearchDuplicatesService";
			},

			/**
			 * Returns data for service.
			 * @protected
			 * @virtual
			 * @return {Object} Prepared data for service.
			 */
			getDataForFindDuplicatesService: function() {
				var communication = this.getCommunications() || [];
				var email = this.get("Email");
				if (!this.Ext.isEmpty(email)) {
					communication.push({
						"Number": email,
						"CommunicationTypeId": ConfigurationConstants.CommunicationTypes.Email
					});
				}
				var data = {
					schemaName: this.getDuplicateSchemaName(),
					request: {
						Id: this.get("Id"),
						Name: this.get("Name"),
						AlternativeName: this.get("AlternativeName"),
						Communication: communication
					}
				};
				return data;
			},

			/**
			 * Handles response from service.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 * @param {Object} response Response present a result of find duplicates.
			 */
			handleResponseFindDuplicatesService: function(callback, scope, response) {
				var result = response[this.get("FindDuplicatesMethodName") + "Result"];
				if (this.getIsFeatureEnabled("ESDeduplication")) {
					result = JSON.parse(response && response.FindDuplicatesOnSaveResult || false) || [];
				}
				if (result && result.length > 0) {
					this.set("FindDuplicatesResult", result);
					this.loadLocalDuplicateSearchPage();
					this.hideBodyMask();
				} else {
					var resultObject = {success: true};
					callback.call(scope, resultObject);
				}
			},

			/**
			 * Saves result of work with duplicates.
			 * @protected
			 * @virtual
			 * @param {Function} callback Callback function.
			 */
			setDuplicates: function(callback) {
				if (this.getIsEntityDeduplicationEnabled()) {
					if (this.get("PerformSearchOnSave") && !this.Ext.isEmpty(this.get("DuplicateResponse"))) {
						var data = this.get("DuplicateResponse");
						var methodName = this.getSetDuplicatesServiceMethodName();
						var serviceName = this.getDuplicatesServiceName();
						data.schemaName = this.getDuplicateSchemaName();
						this.callService({
							data: data,
							serviceName: serviceName,
							methodName: methodName,
							encodeData: false
						}, function() {
							if (callback) {
								callback.call(this);
							}
						}, this);
					} else {
						if (callback) {
							callback.call(this);
						}
					}
				} else {
					this.Ext.callback(callback, this);
				}
			},

			/**
			 * Returns deduplication results view data columns.
			 * @returns {String[]} Deduplication results view data columns.
			 * @protected
			 */
			getDeduplicationViewDataColumns: function() {
				var columnNames = this._getDefaultDeduplicationViewColumns();
				var deduplicationColumns = this.getDeduplicationSettings();
				this.Terrasoft.each(deduplicationColumns, function(column) {
					if (column.schemaName === this.getDuplicateSchemaName()) {
						columnNames.push(column.columnName);
					}
				}, this);
				return this.Ext.Array.unique(columnNames);
			},

			/**
			 * Returns name of set duplicates service method.
			 * @protected
			 * @virtual
			 * @return {String} Name of service method.
			 */
			getSetDuplicatesServiceMethodName: function() {
				return this.getSetDuplicatesMethodName();
			},

			/**
			 * Returns duplicate search page config.
			 * @returns {Object} Duplicate search page config.
			 */
			getDuplicateSearchPageConfig: function() {
				var params = this.sandbox.publish("GetHistoryState") || {};
				return {
					hash: params.hash && params.hash.historyState,
					stateObj: {
						cardSandBoxId: this.sandbox.id
					}
				};
			},

			/**
			 * Loads deduplication module.
			 * @protected
			 * @virtual
			 */
			loadLocalDuplicateSearchPage: function() {
				var moduleId = this.getDuplicateSearchPageId();
				this.sandbox.publish("PushHistoryState", this.getDuplicateSearchPageConfig());
				var moduleName = "BaseSchemaModuleV2";
				var loadModuleConfig = {
					renderTo: "centerPanel",
					id: moduleId,
					keepAlive: true
				};
				Ext.apply(loadModuleConfig, {
					instanceConfig: {
						generateViewContainerId: false,
						useHistoryState: false,
						schemaName: "LocalDuplicateSearchPageV2",
						isSchemaConfigInitialized: true
					}
				});
				this.sandbox.loadModule(moduleName, loadModuleConfig);
			},

			/**
			 * Returns communication option array.
			 * @virtual
			 * @return {Array} Communication option array.
			 */
			getCommunications: function() {
				try {
					var communicationDetailName = this.get("CommunicationDetailName");
					var detailId = this.getDetailId(communicationDetailName);
					var communications = this.sandbox.publish("GetCommunicationsList", null,
						[detailId]);
					return this.Terrasoft.map(communications, function(item) {
						var type = item.CommunicationType;
						var communicationType = type && type.value || type;
						return {
							"Id": item.Id,
							"Number": item.Number,
							"CommunicationTypeId": communicationType,
							"CommunicationId": type && type.communicationValue
						};
					});
				} catch (e) {
					this.log("DuplicateSearchUtilities. getCommunications failed",
						this.Terrasoft.LogMessageType.INFORMATION);
					return [];
				}
			},

			/**
			 * Returns active duplicates rules.
			 * @returns {Object[]} Active duplicates rules on save.
			 */
			getDeduplicationSettings: function() {
				const activeAtSaveRules = this._getEntityDeduplicationRules();
				return activeAtSaveRules.UseAtSave ? activeAtSaveRules.DeduplicationColumns : [];
			},

			/**
			 * Returns rule filters with value.
			 * @protected
			 * @returns {Object[]} Rule filters with value.
			 */
			getDeduplicationModel: function() {
				var modelColumns = [];
				var deduplicationColumns = this.getDeduplicationSettings();
				Terrasoft.each(deduplicationColumns, function(column) {
					var modelColumn = this.Terrasoft.deepClone(column);
					modelColumn.value = this.getFilterValue(column);
					delete modelColumn.rootSchemaColumns;
					modelColumns.push(modelColumn);
				}, this);
				return modelColumns;
			},

			/**
			 * Returns duplicate rule filter value.
			 * @protected
			 * @param {Object} filter Duplicate rule filter config.
			 * @returns {String[]} Duplicate rule filter value.
			 */
			getFilterValue: function(filter) {
				if (this.Ext.Array.contains(this._communicationSchemaNames, filter.schemaName)) {
					return this._getCommunicationFilterValues(filter);
				}
				if (this.getDuplicateSchemaName() !== filter.schemaName) {
					return this._getDetailFilterValues(filter);
				}
				var value = this.get(filter.columnName) || null;
				return [value && value.value || value];
			},

			/**
			 * Returns root search duplicate schema name.
			 * @returns {String} Root search duplicate schema name.
			 * @protected
			 */
			getDuplicateSchemaName: function() {
				return this.entitySchemaName;
			},

			/**
			 * Method to define is deduplication is enabled on entity save.
			 * Returns true if there is at least one active rule on entity schema save.
			 * @virtual
			 */
			getIsEntityDeduplicationEnabled: function() {
				var activeRules = this.getDeduplicationSettings();
				return !Ext.isEmpty(activeRules);
			},

			/**
			 * Returns detail duplicate rule values.
			 * @param {Terrasoft.BaseViewModelCollection} detailGridData Detail grid data.
			 * @param {String} detailEntitySchemaName Detail entity schema name.
			 * @returns {Object} Detail duplicate rule values.
			 */
			getDuplicateDetailRuleValues: function(detailGridData, detailEntitySchemaName) {
				if (!this.getIsFeatureEnabled("ESDeduplication")) {
					return null;
				}
				const duplicateDetailColumns = this._getDuplicateRuleDetailColumns(detailEntitySchemaName);
				if (this.Ext.isEmpty(duplicateDetailColumns)) {
					return null;
				}
				const duplicateDetailRuleValues = {};
				this.Terrasoft.each(this.Ext.Array.unique(duplicateDetailColumns), function(column) {
					duplicateDetailRuleValues[column] = [];
					this.Terrasoft.each(detailGridData, function(item) {
						let value = item.get(column);
						value = value && value.displayValue || value;
						if (value && !this.Ext.Array.contains(duplicateDetailRuleValues[column], value)) {
							duplicateDetailRuleValues[column].push(value);
						}
					}, this);
				}, this);
				return duplicateDetailRuleValues;
			},

			/**
			 * Gets deduplication rules.
			 * @private
			 * @return {{IsActive: Boolean, DeduplicationColumns: Array, UseAtSave: Boolean, SchemaName: String} | {}}
			 */
			_getEntityDeduplicationRules: function() {
				const deduplicationSettings = Terrasoft.configuration.DeduplicationSettings || {};
				const deduplicationRules = deduplicationSettings[this.getDuplicateSchemaName()];
				return deduplicationRules || {};
			},

			/**
			 * Fetch user permission of the 'CanSearchDuplicates' operation.
			 * @protected
			 * @return {Promise<Boolean>} True if user has 'CanSearchDuplicates' operation permission.
			 */
			fetchCanDeduplicationOperationPermission: function() {
				return new Promise(function(resolve) {
					const featuresEnabled = this.getIsDeduplicationEnable();
					if (!featuresEnabled) {
						return resolve(false);
					}
					RightUtilities.checkCanExecuteOperation({operation: "CanSearchDuplicates"}, resolve, this);
				}.bind(this));
			},

			/**
			 * Returns true if feature 'Deduplication' is enabled.
			 * @protected
			 * @returns {Boolean} True if feature 'Deduplication' is enabled.
			 */
			getIsDeduplicationEnable: function() {
				return this.Terrasoft.Features.getIsEnabled("Deduplication");
			},

			/**
			 * Returns true if features 'BulkESDeduplication', 'Deduplication' is enabled and
			 * section has active search rules and user has permission.
			 * @protected
			 * @returns {Boolean} True if bulk deduplication is enabled.
			 */
			getIsBulkDeduplicationEnabled: function() {
				const deduplicationEnable = this.getIsDeduplicationEnable();
				const deduplicationRules = this._getEntityDeduplicationRules();
				const bulkEnabled = Boolean(deduplicationRules.IsActive)
					&& Terrasoft.Features.getIsEnabled("BulkESDeduplication")
					&& Terrasoft.Features.getIsEnabled("GlobalSearch_V2");
				return deduplicationEnable && bulkEnabled;
			}
		});
		return Ext.create("Terrasoft.DuplicatesSearchUtilitiesV2");
	});


