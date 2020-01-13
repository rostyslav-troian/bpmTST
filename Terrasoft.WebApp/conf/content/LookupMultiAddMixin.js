Terrasoft.configuration.Structures["LookupMultiAddMixin"] = {innerHierarchyStack: ["LookupMultiAddMixin"]};
define("LookupMultiAddMixin", ["LookupMultiAddMixinResources", "ConfigurationEnums", "RightUtilities"],
		function(Resources, ConfigurationEnums, RightUtilities) {
			Ext.define("Terrasoft.configuration.mixins.LookupMultiAddMixin", {
				alternateClassName: "Terrasoft.LookupMultiAddMixin",

				/**
				 * Name of multiple operation service.
				 * @type {String}
				 */
				multiOperationServiceName: "MultiOperationService",

				/**
				 * Name of method multiple link.
				 * @type {String}
				 */
				multiOperationServiceMethod: "MultiLinkEntity",

				/**
				 * Returns config of multiselect lookup.
				 * @protected
				 * @abstract
				 */
				getMultiSelectLookupConfig: this.Terrasoft.emptyFn,

				/**
				 * @private
				 * @type {Boolean}
				 */
				isCreateViewModel: false,

				/**
				 * Initialize mixin.
				 * @protected
				 */
				init: function() {
					this.initMultiSelectLookupConfig();
					this.isCreateViewModel = Terrasoft.Features.getIsEnabled("CreateViewModelLookupMultiAddMixin");
				},

				/**
				 * Initialize configuration of mixin.
				 * @protected
				 */
				initMultiSelectLookupConfig: function() {
					var config = this.getMultiSelectLookupConfig();
					if (this.Ext.isEmpty(config)) {
						throw new Terrasoft.NotImplementedException();
					}
					this.set("LookupRootEntitySchemaName", config.rootEntitySchemaName);
					this.set("LookupRootColumnName", config.rootColumnName);
					this.set("LookupRelatedEntitySchemaName", config.relatedEntitySchemaName);
					this.set("LookupRelatedColumnName", config.relatedColumnName);
				},

				/**
				 * Saves card if it is new.
				 * @protected
				 * @return {Boolean} Sign of new record.
				 */
				saveCard: function() {
					var masterCardState = this.sandbox.publish("GetCardState", null, [this.sandbox.id]);
					var isNewRecord = (masterCardState.state === ConfigurationEnums.CardStateV2.ADD ||
					masterCardState.state === ConfigurationEnums.CardStateV2.COPY);
					if (isNewRecord === true) {
						var args = {
							isSilent: true,
							messageTags: [this.sandbox.id]
						};
						this.sandbox.publish("SaveRecord", args, [this.sandbox.id]);
					}
					return isNewRecord;
				},

				/**
				 * Opens lookup.
				 * @param {Boolean} isNeedCheckOfNew Sign of need to check whether a new record.
				 * @private
				 */
				openLookupWithMultiSelect: function(isNeedCheckOfNew) {
					if (isNeedCheckOfNew) {
						var isNewRecord = this.saveCard();
						if (isNewRecord) {
							return;
						}
					}
					if (this.Ext.isEmpty(this.get("MasterRecordId"))) {
						return;
					}
					RightUtilities.getSchemaEditRights({
						schemaName: this.entitySchemaName
					}, function(result) {
						if (this.Ext.isEmpty(result)) {
							const config = this.getLookupConfig();
							const filtersConfig = this._createAlreadyAddedRecordsFilter();
							config.filters = this.getAllLookupFilters(filtersConfig);
							this.set("LookupFilters", config.filters);
							this.openLookup(config, this.addSelectedItems, this);
						} else {
							this.showInformationDialog(Resources.localizableStrings.DontHaveRightsToAdd);
						}
					}, this);
				},

				/**
				 * Loads related records.
				 * @param {Function} callback Function calls after load records.
				 * @param {Object} scope Scope of callback function.
				 * @private
				 * @deprecated
				 */
				loadNotExistingRecords: function(callback, scope) {
					var esq = this.getRelatedRecordsEsq();
					esq.getEntityCollection(function(response) {
						var config = this.getLookupConfig();
						var filtersConfig = this.getNotExistingFilter(response);
						this.Ext.apply(config, filtersConfig);
						callback.call(scope, config);
					}, this);
				},

				/**
				 * Returns filters.
				 * @param {Object} response Filter by existing records.
				 * @private
				 * @return {Object} Filters.
				 */
				getAllLookupFilters: function(notExistingFilter) {
					var filters = this.Terrasoft.createFilterGroup();
					var additionalFilters = this.getAdditionalLookupFilters();
					if (!this.Ext.isEmpty(notExistingFilter)) {
						filters.add("NotExistsFilter", notExistingFilter);
					}
					if (!this.Ext.isEmpty(additionalFilters)) {
						filters.add("AdditionalFilters", additionalFilters);
					}
					return filters;
				},

				/**
				 * Returns config with filter.
				 * @param {Object} response Response of selected records.
				 * @private
				 * @return {Object} Config with filters.
				 */
				getNotExistingFilter: function(response) {
					var existsCollection = [];
					var config = {};
					if (response.success) {
						response.collection.each(function(item) {
							existsCollection.push(item.get(this.getRelatedIdColumn()));
						}, this);
					}
					if (existsCollection.length > 0) {
						var existsFilter = this.createNotExistingFilter(existsCollection);
						config.filters = existsFilter;
					}
					return config;
				},

				/**
				 * Returns additional filters for lookup.
				 * @protected
				 * @return {Terrasoft.FilterGroup} Filters.
				 */
				getAdditionalLookupFilters: this.Terrasoft.emptyFn,

				/**
				 * Returns related to lookup schema root column path.
				 * @return {String} - column path.
				 * @private
				 */
				_getRootColumnPath: function() {
					return this.Ext.String.format("[{0}:{1}:{2}].{3}",
						this.entitySchemaName,
						this.get("LookupRelatedColumnName"), "Id",
						this.get("LookupRootColumnName"));
				},

				/**
				 * Returns created not existing filters.
				 * @param {Terrasoft.BaseViewModelCollection} existsCollection Items which need exclude.
				 * @protected
				 * @return {Terrasoft.FilterGroup} Filter excluded exists records.
				 * @deprecated
				 */
				createNotExistingFilter: function(existsCollection) {
					var existsFilter = this.Terrasoft.createColumnInFilterWithParameters("Id",
						existsCollection);
					existsFilter.comparisonType = this.Terrasoft.ComparisonType.NOT_EQUAL;
					existsFilter.Name = "existsFilter";
					return existsFilter;
				},

				/**
				 * Returns created not existing filters.
				 * @private
				 * @return {Terrasoft.FilterGroup} Filter excluded exists records.
				 */
				_createAlreadyAddedRecordsFilter: function() {
					const columnPath = this._getRootColumnPath();
					var existsFilterGroup = this.Terrasoft.createFilterGroup();
					existsFilterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, columnPath, this.get("MasterRecordId")));
					return this.Terrasoft.createNotExistsFilter("Id", existsFilterGroup);
				},

				/**
				 * Returns entity schema query for select records related with master record.
				 * @protected
				 * @return {Terrasoft.EntitySchemaQuery} Query of select.
				 */
				getRelatedRecordsEsq: function() {
					var relatedColumn = this.getRelatedIdColumn();
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this.entitySchemaName
					});
					esq.addColumn("Id");
					esq.addColumn(relatedColumn);
					esq.filters.add("filterRoot", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, this.get("LookupRootColumnName"), this.get("MasterRecordId")));
					return esq;
				},

				/**
				 * Returns config of lookup.
				 * @return {Object} Config of lookup.
				 */
				getLookupConfig: function() {
					return {
						entitySchemaName: this.getRelatedSchemaName(),
						multiSelect: true,
						columns: this.getLookupColumns(),
						usingMultiAddMixin: true
					};
				},

				/**
				 * Returns related primary column path.
				 * @return {String} Column path.
				 */
				getRelatedIdColumn: function() {
					return this.get("LookupRelatedColumnName") + ".Id";
				},

				/**
				 * Returns array of column names.
				 * @return {Array} Array of column names.
				 */
				getLookupColumns: function() {
					return ["Name"];
				},

				/**
				 * Returns root schema name.
				 * @return {String} Root schema name.
				 */
				getRootSchemaName: function() {
					return this.get("LookupRootEntitySchemaName");
				},

				/**
				 * Returns related schema name.
				 * @return {String} Related schema name.
				 */
				getRelatedSchemaName: function() {
					return this.get("LookupRelatedEntitySchemaName");
				},

				/**
				 * Returns insert query for add new records.
				 * @param {Object} config Values for field.
				 * @param {Guid} config.rootId Id of root entity.
				 * @param {Guid} config.relatedId Id of related entity.
				 * @protected
				 * @return {Terrasoft.InsertQuery} Query.
				 */
				getInsertQueryForSelectedItems: function(config) {
					var insert = Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: this.entitySchemaName
					});
					insert.setParameterValue(this.get("LookupRootColumnName"),
							config.rootId, this.Terrasoft.DataValueType.GUID);
					insert.setParameterValue(this.get("LookupRelatedColumnName"),
							config.relatedId, this.Terrasoft.DataValueType.GUID);
					return insert;
				},

				/**
				 * Adds selected items.
				 * @private
				 */
				addSelectedItems: function(selectedConfig) {
					this.selectedRows = selectedConfig.selectedRows.getItems();
					if (this.isNotEmpty(selectedConfig.filters)) {
						this.set("LookupFilters", selectedConfig.filters);
						this.multiAddRecords();
					} else {
						var batchQuery = this.createBatchQueryForAddNewSelectedItems();
						if (batchQuery && batchQuery.queries.length) {
							this.showBodyMask();
							batchQuery.execute(this.handleAfterInserted, this);
						}
					}
				},

				/**
				 * Multiple adds records.
				 * @private
				 */
				multiAddRecords: function() {
					this.showBodyMask();
					var serviceConfig = this.getMultiAddRecordsConfig();
					this.callService({
						serviceName: this.multiOperationServiceName,
						methodName: this.multiOperationServiceMethod,
						data: serviceConfig
					}, this.handleMultiAddRecordsResponse, this);
				},

				/**
				 * Service config.
				 * @typedef ServiceConfig
				 * @type {Object}
				 * @property {Array} recordsId List of records.
				 * @property {String} entityName Entity schema name.
				 * @property {String} parameters Additional parameters for strategy.
				 * @property {String} filtersConfig Filters config.
				 */
				/**
				 * Returns service config.
				 * @return {ServiceConfig} Service config.
				 * @protected
				 * @virtual
				 */
				getMultiAddRecordsConfig: function() {
					var filters = this.get("LookupFilters") || this.getAllLookupFilters();
					var filtersConfig = filters;
					if (!this.Ext.isString(filters)) {
						filtersConfig = filters.serialize(filters.getDefSerializationInfo());
					}
					var rootSchemaId = this.get("MasterRecordId");
					var params = {
						LinkedEntityName: this.entitySchemaName,
						LinkedColumnName: this.get("LookupRootColumnName") + "Id",
						LinkedRecordId: rootSchemaId,
						ColumnName: this.get("LookupRelatedColumnName") + "Id"
					};
					var paramsJSON = this.Ext.JSON.encode(params);
					var result = {
						recordsId: [],
						entityName: this.getRelatedSchemaName(),
						parameters: paramsJSON,
						filtersConfig: filtersConfig
					};
					return result;
				},

				/**
				 * Handles after multiple adds records.
				 * @param {Object} response Response from server.
				 * @protected
				 * @virtual
				 */
				handleMultiAddRecordsResponse: function(response) {
					var methodResult = this.multiOperationServiceMethod + "Result";
					this.hideBodyMask();
					if (response && response[methodResult]) {
						var result = response[methodResult] || {};
						if (result.success) {
							this.reloadGridData();
						} else {
							if (result.errorInfo) {
								this.showInformationDialog(result.errorInfo.message);
							}
						}
					}
				},

				/**
				 * Creates and return batch.
				 * @private
				 * @return {Terrasoft.BatchQuery} Batch query.
				 */
				createBatchQueryForAddNewSelectedItems: function() {
					var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
					var rootSchemaId = this.get("MasterRecordId");
					this.selectedRows.forEach(function(item) {
						var id = item.value;
						var config = {
							rootId: rootSchemaId,
							relatedId: id
						};
						var insertQuery = this.getInsertQueryForSelectedItems(config);
						batchQuery.add(insertQuery);
					}, this);
					return batchQuery;
				},

				/**
				 * Handles after inserted records.
				 * @param {Object} response Response from server.
				 * @protected
				 */
				handleAfterInserted: function(response) {
					if (this.Ext.isEmpty(response) || !response.success) {
						this.hideBodyMask();
						return;
					}
					this.hideBodyMask();
					this.beforeLoadGridData();
					var filterCollection = [];
					response.queryResults.forEach(function(item) {
						filterCollection.push(item.id);
					});
					var esq = this.getSelectForNewAddedRows(filterCollection);
					if (this.isCreateViewModel) {
						esq.on("createviewmodel", this.createViewModel, this);
					}
					esq.getEntityCollection(function(selectResponse) {
						if (this.isCreateViewModel) {
							esq.un("createviewmodel", this.createViewModel, this);
						}
						this.afterLoadGridData();
						if (selectResponse.success) {
							var responseCollection = selectResponse.collection;
							this.loadAddedRecords(responseCollection);
						}
					}, this);
				},

				/**
				 * Loads added records into grid.
				 * @param {Terrasoft.Collection} collection List of records.
				 * @protected
				 */
				loadAddedRecords: function(collection) {
					if (!this.Ext.isEmpty(collection)) {
						this.prepareResponseCollection(collection);
						var gridData = this.getGridData();
						gridData.loadAll(collection);
					}
				},

				/**
				 * Returns query for select added records.
				 * @param {Array} recordIds Identifiers of added records.
				 * @protected
				 * @return {Terrasoft.EntitySchemaQuery} Select query.
				 */
				getSelectForNewAddedRows: function(recordIds) {
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this.entitySchemaName
					});
					this.initQueryColumns(esq);
					esq.filters.add("recordId", this.Terrasoft.createColumnInFilterWithParameters("Id", recordIds));
					return esq;
				}
			});
		});


