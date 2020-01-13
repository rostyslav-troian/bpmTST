Terrasoft.configuration.Structures["QueueSortUtilities"] = {innerHierarchyStack: ["QueueSortUtilities"]};
define("QueueSortUtilities", ["terrasoft"], function(Terrasoft) {

	/**
	 * Mixin for queue sort utilities.
	 */
	Ext.define("Terrasoft.configuration.mixins.QueueSortUtilities", {
		alternateClassName: "Terrasoft.QueueSortUtilities",

		// region Properties: Private

		/**
		 * Returns the order direction.
		 * @private
		 * @param {String} code The code of order direction.
		 * @return {Terrasoft.OrderDirection}
		 */
		getOrderDirection: function(code) {
			switch (code) {
				case "Ascending":
					return Terrasoft.OrderDirection.ASC;
				case "Descending":
					return Terrasoft.OrderDirection.DESC;
				default:
					return Terrasoft.OrderDirection.NONE;
			}
		},

		// endregion

		// region Methods: Protected

		/**
		 * Initializes queue columns sort config.
		 * @protected
		 * @return {Object[]} The queue columns sort config.
		 */
		getInitialQueueSortConfig: function() {
			return [
				{
					"name": "NextProcessingDateOrder",
					"orderPosition": 1,
					"orderDirection": Terrasoft.OrderDirection.ASC
				},
				{
					"name": "Queue.Priority.Value",
					"orderPosition": 2,
					"orderDirection": Terrasoft.OrderDirection.ASC
				},
				{
					"name": "PostponesCount",
					"orderPosition": 3,
					"orderDirection": Terrasoft.OrderDirection.ASC
				}
			];
		},

		/**
		 * Queries queues columns sort config.
		 * @param {Object} config Config object.
		 * @param {String} [config.entitySchemaUId] The uid of queue's entity.
		 * @param {Function} config.callback The callback function to call when operation has completed.
		 * @param {Object[]} config.callback.sortConfig The queue columns sort config.
		 */
		queryColumnsSortConfig: function(config) {
			this.queryQueueObjectColumnsData({
				entitySchemaUId: config.entitySchemaUId,
				callback: function(result) {
					var sortConfig = this.getInitialQueueSortConfig();
					if (result.success) {
						this.addQueueObjectColumnsToSortConfig(result.collection, sortConfig);
					}
					config.callback(sortConfig);
				}.bind(this)
			});
		},

		/**
		 * Queries for queue object columns sort config.
		 * @param {Object} config Config object.
		 * @param {String} [config.entitySchemaUId] The uid of queue's entity.
		 * @param {Function} config.callback The callback function to call when operation has completed.
		 * @param {Object} config.callback.response The response from the server request.
		 */
		queryQueueObjectColumnsData: function(config) {
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "QueueObjectColumn",
				serverESQCacheParameters: {
					cacheLevel: Terrasoft.ESQServerCacheLevels.SESSION,
					cacheGroup: "OperatorSingleWindow",
					cacheItemName: "QueueObjectColumns" + (config.entitySchemaUId || "")
				}
			});
			esq.addColumn("Name");
			var entitySchemaNameColumn =
				esq.addColumn("QueueObject.[VwQueueSysSchema:Id:EntitySchemaUId].Name", "EntitySchemaName");
			entitySchemaNameColumn.orderDirection = Terrasoft.OrderDirection.ASC;
			entitySchemaNameColumn.orderPosistion = 0;
			var positionColumn = esq.addColumn("Position");
			positionColumn.orderDirection = Terrasoft.OrderDirection.ASC;
			positionColumn.orderPosistion = 1;
			esq.addColumn("OrderDirection.Code", "OrderCode");
			if (config.entitySchemaUId) {
				esq.filters.add("entitySchemaUId", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "QueueObject.EntitySchemaUId", config.entitySchemaUId));
			}
			esq.getEntityCollection(config.callback);
		},

		/**
		 * Adds the QueueObjectColumn data to the queue columns sort config.
		 * @protected
		 * @param {Terrasoft.Collection} collection The collection of QueueObjectColumn entities.
		 * @param {Object[]} sortConfig The queue columns sort config.
		 */
		addQueueObjectColumnsToSortConfig: function(collection, sortConfig) {
			collection.each(function(item) {
				var columnName = this.getQueueEntityColumnPath(item.get("EntitySchemaName"), item.get("Name"));
				var orderPosition = sortConfig.length + 1;
				var orderCode = this.getOrderDirection(item.get("OrderCode"));
				sortConfig.push({
					"name": columnName,
					"orderPosition": orderPosition,
					"orderDirection": orderCode
				});
			}, this);
		},

		/**
		 * Returns the path of queue entity column.
		 * @protected
		 * @param {String} entitySchemaName The name of queue entity.
		 * @param {String} columnName The column name.
		 * @return {String}
		 */
		getQueueEntityColumnPath: function(entitySchemaName, columnName) {
			return Ext.String.format("{0}.{1}", entitySchemaName, columnName);
		},

		/**
		 * Adds the queue entity schema query columns needed for sorting.
		 * @protected
		 * @param {Terrasoft.EntitySchemaQuery} esq The queue entity schema query.
		 * @param {Object[]} sortConfig The queue columns sort config.
		 */
		addQueueSortColumns: function(esq, sortConfig) {
			Terrasoft.each(sortConfig, function(config) {
				if (esq.columns.contains(config.name)) {
					return;
				}
				esq.addColumn(config.name);
			});
		},

		/**
		 * Initializes the queue query sorting.
		 * @protected
		 * @param {Terrasoft.EntitySchemaQuery} esq The query object.
		 * @param {Object[]} sortConfig The queue columns sort config.
		 */
		initQueueQuerySorting: function(esq, sortConfig) {
			var queryColumns = esq.columns;
			queryColumns.each(function(queueColumn) {
				queueColumn.orderDirection = Terrasoft.OrderDirection.NONE;
				queueColumn.orderPosition = -1;
			});
			Terrasoft.each(sortConfig, function(config) {
				var queueColumn = queryColumns.get(config.name);
				if (Ext.isEmpty(queueColumn)) {
					return;
				}
				queueColumn.orderDirection = config.orderDirection;
				queueColumn.orderPosition = config.orderPosition;
				return true;
			});
		}

		// endregion

	});
	return Ext.create("Terrasoft.configuration.mixins.QueueSortUtilities");
});


