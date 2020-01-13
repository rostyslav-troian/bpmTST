Terrasoft.configuration.Structures["QueueFillingUtilities"] = {innerHierarchyStack: ["QueueFillingUtilities"]};
define("QueueFillingUtilities", ["terrasoft", "LookupUtilities", "ConfigurationEnums", "ConfigurationConstants",
		"ServiceHelper"],
	function(Terrasoft, LookupUtilities,  ConfigurationEnums, ConfigurationConstants, ServiceHelper) {
	/**
	 * @class Terrasoft.configuration.mixins.QueueFillingUtilities
	 * ###### ########## ########.
	 */
	Ext.define("Terrasoft.configuration.mixins.QueueFillingUtilities", {
		alternateClassName: "Terrasoft.QueueFillingUtilities",

		//region Methods: Private

		/**
		 * ######### ###### # #######.
		 * @private
		 * @param {String[]} primaryColumnValues ############## #######.
		 */
		addEntityRecords: function(primaryColumnValues) {
			var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
			Terrasoft.each(primaryColumnValues, function(primaryColumnValue) {
				var insert = this.getQueueItemInsertQuery(primaryColumnValue);
				batchQuery.add(insert);
			}.bind(this));
			if (batchQuery.queries.length) {
				batchQuery.execute(this.onAddEntitiesResponse, this);
			}
		},

		/**
		 * ######### ###### ##### # #######.
		 * @private
		 * @param {String[]} folderIds ############## ####### #####.
		 */
		addEntityFolders: function(folderIds) {
			this.showBodyMask();
			ServiceHelper.callService({
				serviceName: "QueuesService",
				methodName: "AddFoldersQueueItems",
				data: {
					folderIds: folderIds,
					entitySchemaName: this.get("EntitySchemaName"),
					queueId: this.get("QueueId")
				},
				callback: this.onAddEntityFoldersResponse,
				scope: this
			});
		},

		/**
		 * ######### ######## ###### ####### #######.
		 * @private
		 * @param {Object} cardResponse ######### ########## ########## ########.
		 */
		openEntitiesLookup: function(cardResponse) {
			if (!cardResponse.success) {
				return;
			}
			var config = {
				entitySchemaName: this.get("EntitySchemaName"),
				multiSelect: true,
				columns: [this.get("EntitySchemaPrimaryDisplayColumnName")]
			};
			var filterGroup = this.getNotExistsQueueItemFilter();
			config.filters = filterGroup;
			LookupUtilities.Open(this.sandbox, config, this.onEntityRecordsSelected, this, null, false, false);
		},

		/**
		 * ######### ######## ###### ####### ##### #######.
		 * @private
		 * @param {Object} cardResponse ######### ########## ########## ########.
		 */
		openEntityFoldersLookup: function(cardResponse) {
			if (!cardResponse.success) {
				return;
			}
			var config = {
				entitySchemaName: this.get("EntitySchemaName") + "Folder",
				multiSelect: true,
				columns: ["Name"]
			};
			var folderTypesFilter = Terrasoft.createColumnInFilterWithParameters("FolderType",
				[ConfigurationConstants.Folder.Type.General, ConfigurationConstants.Folder.Type.Search]);
			folderTypesFilter.comparisonType = Terrasoft.ComparisonType.EQUAL;
			config.filters = folderTypesFilter;
			LookupUtilities.Open(this.sandbox, config, this.onEntityFoldersSelected, this, null, false, false);
		},

		/**
		 * ########## ###### ## ########## ###### ######## #######.
		 * @private
		 * @param {String} primaryColumnValue ############# ###### ####### #######.
		 * @return {Terrasoft.InsertQuery} ###### ## ########## ###### ######## #######.
		 */
		getQueueItemInsertQuery: function(primaryColumnValue) {
			var insert = this.Ext.create("Terrasoft.InsertQuery", {
				rootSchemaName: "QueueItem"
			});
			insert.setParameterValue("EntityRecordId", primaryColumnValue, this.Terrasoft.DataValueType.GUID);
			insert.setParameterValue("Queue", this.get("QueueId"), this.Terrasoft.DataValueType.GUID);
			return insert;
		},

		/**
		 * ########## ###### ######## ############## ####### # ########## #######.
		 * @private
		 * @return {Terrasoft.FilterGroup} ###### ######## ############## ####### # ########## #######.
		 */
		getNotExistsQueueItemFilter: function() {
			var filterGroup = Ext.create("Terrasoft.FilterGroup");
			var subFilterGroup = Ext.create("Terrasoft.FilterGroup");
			var queueColumnFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
				"Queue", this.get("QueueId"));
			subFilterGroup.addItem(queueColumnFilter);
			var existsFilter = Terrasoft.createNotExistsFilter("[QueueItem:EntityRecordId:Id].Queue",
				subFilterGroup);
			filterGroup.addItem(existsFilter);
			return filterGroup;
		},

		/**
		 * ######### ######## ######### # ### ############# ########## ######## ########.
		 * @protected
		 * @param {Function} callback ####### ######### ######.
		 */
		checkIsSavedCard: function(callback) {
			var sandbox = this.sandbox;
			var sandboxId = sandbox.id;
			var masterCardState = sandbox.publish("GetCardState", null, [sandboxId]);
			var state = masterCardState.state;
			var isNewRecord = (state === ConfigurationEnums.CardStateV2.ADD ||
				state === ConfigurationEnums.CardStateV2.COPY);
			if (!isNewRecord) {
				callback.call(this, {success: true});
			} else {
				var args = {
					isSilent: true,
					callBaseSilentSavedActions: true,
					messageTags: [sandboxId],
					scope: this,
					callback: callback
				};
				sandbox.publish("SaveRecord", args, [sandboxId]);
			}
		},

		/**
		 * ############ ########## ####### ######### #######.
		 * ########## ######### # ########## ########### ####### # ######### ###### ###### ##########.
		 * @private
		 * @param {Number} addedEntitiesCount ########## ##### #######.
		 */
		onQueueItemsAdded: function(addedEntitiesCount) {
			var addedEntitiesMessage = this.Ext.String.format(this.get("Resources.Strings.AddedEntitiesMessage"),
				addedEntitiesCount);
			this.showInformationDialog(addedEntitiesMessage);
			if (addedEntitiesCount > 0) {
				this.set("ActiveRow", null);
				this.reloadGridData();
			}
		},

		/**
		 * ########## ########## ###### ####### ########## ######### ####### ## ######### ####### #######.
		 * @private
		 * @param {Object} response ###### ###### #######.
		 */
		onAddEntitiesResponse: function(response) {
			if (!response.success) {
				return;
			}
			var queryResults = response.queryResults;
			if (!queryResults || (queryResults.length === 0)) {
				return;
			}
			var addedEntitiesCount = 0;
			Terrasoft.each(queryResults, function(queryResult) {
				addedEntitiesCount = addedEntitiesCount + queryResult.rowsAffected;
			});
			this.onQueueItemsAdded(addedEntitiesCount);
		},

		/**
		 * ########## ########## ###### ####### ########## ######### ####### ## ######### ####### #######.
		 * @private
		 * @param {Object} response ###### ###### #######.
		 * @param {Boolean} success ####### ######### ########## #######.
		 */
		onAddEntityFoldersResponse: function(response, success) {
			this.hideBodyMask();
			if (!success) {
				return;
			}
			var responseData = Terrasoft.decode(response);
			if (Ext.isEmpty(responseData)) {
				return;
			}
			var errorMessages = responseData.errorMessages;
			if (!Ext.isEmpty(errorMessages)) {
				this.error(errorMessages);
			}
			this.onQueueItemsAdded(responseData.addedEntitiesCount);
		},

		//endregion

		//region Methods: Protected

		/**
		 * ########## ####### ###### ###### #### ###### "########" ###### "########## #######".
		 * @protected
		 */
		onAddEntityRecordClick: function() {
			this.checkIsSavedCard(this.openEntitiesLookup);
		},

		/**
		 * ########## ####### ###### ###### #### ###### "######## ######" ###### "########## #######".
		 * @protected
		 */
		onAddEntityFolderRecordClick: function() {
			this.checkIsSavedCard(this.openEntityFoldersLookup);
		},

		/**
		 * ########## ####### ###### ####### ### ##########.
		 * @protected
		 * @param {Object} entityRecords ######### ######.
		 */
		onEntityRecordsSelected: function(entityRecords) {
			if (!entityRecords.selectedRows.isEmpty()) {
				var entityRecordsKeys = entityRecords.selectedRows.getKeys();
				this.addEntityRecords(entityRecordsKeys);
			}
		},

		/**
		 * ########## ####### ###### ##### ### ##########.
		 * @protected
		 * @param {Object} entityFolders ######### ######.
		 */
		onEntityFoldersSelected: function(entityFolders) {
			if (!entityFolders.selectedRows.isEmpty()) {
				var entityFoldersKeys = entityFolders.selectedRows.getKeys();
				this.addEntityFolders(entityFoldersKeys);
			}
		}

		//endregion

	});
});


