Terrasoft.configuration.Structures["LeadSimilarEntitiesUtilities"] = {innerHierarchyStack: ["LeadSimilarEntitiesUtilities"]};
define("LeadSimilarEntitiesUtilities",["LeadSimilarEntitiesUtilitiesResources", "ServiceHelper"],
	function(resources, ServiceHelper) {
		Ext.define("Terrasoft.configuration.mixins.LeadSimilarEntitiesUtilities", {
			alternateClassName: "Terrasoft.LeadSimilarEntitiesUtilities",

			/**
			 * Template of the name of the Enabled attribute.
			 */
			enabledAttributeNameTemplate: "Similar{0}Enabled",

			/**
			 * Template of the name of the SimilarCollection attribute.
			 */
			similarCollectionNameTemplate: "Similar{0}Collection",

			/**
			 * Returns lookup unique profile key.
			 * @protected
			 * @return {String} Key.
			 */
			getSimilarRecordsLookupProfileKey: function(schemaName) {
				return this.Ext.String.format("Similar{0}Lookup_LeadPageV2", schemaName);
			},

			/**
			 * Returns unique identifier of the Lead.
			 * @private
			 * @return {Guid} Unique identifier.
			 */
			getLeadId: function() {
				var columnsValues = this.sandbox.publish("GetColumnsValues", ["Id"], [this.sandbox.id]);
				return columnsValues.Id;
			},

			/**
			 * Opens lookup of the similar records.
			 * @protected
			 * @param {String} schemaName Name of the entity schema.
			 * @param {String} masterColumnName Name of the master entity column.
			 */
			openSimilarRecordsLookup: function(schemaName, masterColumnName) {
				var config = {
					entitySchemaName: schemaName,
					columnName: masterColumnName,
					lookupPostfix: this.getSimilarRecordsLookupProfileKey(schemaName),
					multiSelect: false,
					columns: ["Id"]
				};
				var similarRecordsFilter = Terrasoft.createColumnInFilterWithParameters("Id",
					this.getSimilarCollection());
				similarRecordsFilter.comparisonType = Terrasoft.ComparisonType.EQUAL;
				config.filters = similarRecordsFilter;
				this.openLookup(config, this.onLookupResult, this);
			},

			/**
			 * Returns name of the SimilarCollection parameter.
			 * @private
			 * @return {String} Name.
			 */
			getSimilarCollectionName: function() {
				return this.Ext.String.format(this.similarCollectionNameTemplate, this.entitySchemaName);
			},

			/**
			 * Returns name of the Enabled parameter.
			 * @private
			 * @return {String} Name.
			 */
			getEnabledAttributeName : function() {
				return this.Ext.String.format(this.enabledAttributeNameTemplate, this.entitySchemaName);
			},

			/**
			 * Sets value of the Enabled parameter.
			 * @protected
			 * @param {Boolean} value Value.
			 */
			setEnabledAttribute: function(value) {
				var name = this.getEnabledAttributeName();
				this.set(name, value);
			},

			/**
			 * Sets value of the SimilarCollection parameter.
			 * @protected
			 * @param {Array} value Value.
			 */
			setSimilarCollection: function(value) {
				var name = this.getSimilarCollectionName();
				this.set(name, value);
			},

			/**
			 * Returns value of the SimilarCollection parameter.
			 * @protected
			 * @return {Array} Value.
			 */
			getSimilarCollection: function() {
				var name = this.getSimilarCollectionName();
				return this.get(name);
			},

			/**
			 * Initializes similar records collection by the web service method.
			 * @protected
			 * @param {String} schemaName Name of entity schema.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execition context.
			 */
			initSimilarEntityRecordsCollection: function(schemaName, callback, scope) {
				var primaryColumnValue = this.getLeadId();
				var config = {
					"schemaName": schemaName,
					"leadId": primaryColumnValue
				};
				scope = scope || this;
				this.callDeduplicationLeadServiceMethod("FindRecordsSimilarLead", function(response) {
					this.initSimilarEntityRecordsCollectionCallback(response);
					Ext.callback(callback, this);
				}, config, scope);
			},

			/**
			 * Processes response of the deduplication service call.
			 * @private
			 * @param {Object} response object.
			 * @return {Array} Ids collection.
			 */
			_processSimilarRecordsCollection: function(response) {
				if (response) {
					var collectionJson = Terrasoft.decode(response);
					return _.pluck(collectionJson, "Id");
				}
				return [];
			},

			/**
			 * Default callback of the initSimilarEntityRecordsCollection method.
			 * @private
			 * @param {Object} response Response of the service.
			 **/
			initSimilarEntityRecordsCollectionCallback: function(response) {
				var similarCollection = null;
				if (response) {
					var responseResult = this.getIsFeatureEnabled("ESDeduplication")
						? this._processSimilarRecordsCollection(response.FindSimilarRecordsFromStoredResult)
						: response.FindRecordsSimilarLeadResult;
					if (!Ext.isEmpty(responseResult)) {
						similarCollection = responseResult;
						this.setEnabledAttribute(true);
					} else {
						similarCollection = [];
					}
				}
				this.setSimilarCollection(similarCollection);
			},

			/**
			 * Calls method of the deduplication lead service.
			 * @param {String} methodName Name of method.
			 * @param {Function} callback Callback function.
			 * @param {Object} config Additional parameters.
			 * @param {Object} scope Execution context.
			 */
			callDeduplicationLeadServiceMethod: function(methodName, callback, config, scope) {
				const isESDeduplicationEnabled = this.getIsFeatureEnabled("ESDeduplication");
				const isDeduplicationEnabled = isESDeduplicationEnabled || this.getIsFeatureEnabled("Deduplication");
				if (!isDeduplicationEnabled) {
					return;
				}
				if (isESDeduplicationEnabled) {
					var data = {
						sourceId: config.leadId,
						sourceSchemaName: "Lead",
						schemaName: config.schemaName
					};
					this.callService({
						data: data,
						serviceName: "DeduplicationServiceV2",
						methodName: "FindSimilarRecordsFromStored",
						encodeData: false
					}, callback, scope);
				} else {
					ServiceHelper.callService("LeadService", methodName, callback, config, scope);
				}
			}
		});

		return Terrasoft.LeadSimilarEntitiesUtilities;
	});


