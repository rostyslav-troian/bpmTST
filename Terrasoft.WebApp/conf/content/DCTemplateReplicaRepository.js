Terrasoft.configuration.Structures["DCTemplateReplicaRepository"] = {innerHierarchyStack: ["DCTemplateReplicaRepository"]};
define("DCTemplateReplicaRepository", ["ServiceHelper"], function(ServiceHelper) {
	/**
	 * @class Terrasoft.configuration.DCTemplateReplicaRepository
	 */
	Ext.define("Terrasoft.configuration.DCTemplateReplicaRepository", {
		alternateClassName: "Terrasoft.DCTemplateReplicaRepository",

		// region Fields: Private

		/**
		 * Email identifier.
		 * @type {Guid}
		 */
		bulkEmailId: null,

		/**
		 * Request data object with state and request results.
		 * @type {Object}
		 */
		requestData: {},

		/**
		 * Bulk email service name.
		 * @type {Object}
		 */
		bulkEmailServiceName: "BulkEmailTemplateService",

		/**
		 * Service method name for retrieving all replicas.
		 * @type {Object}
		 */
		allReplicaMethodName: "GetDcReplicas",

		/**
		 * Service method name for retrieving sent replica identifiers.
		 * @type {Object}
		 */
		sentReplicaMethodName: "GetSentDcReplicaIds",

		// endregion

		// region Methods: Private

		/**
		 * Returns request data by request name.
		 * @private
		 * @param {String} requestName Request name.
		 * @return {Object} Request data.
		 */
		_getRequestDataByName: function(requestName) {
			var requestData = this.requestData[requestName];
			if (!requestData) {
				requestData = {
					results: null,
					callbacks: [],
					isLoading: false
				};
				this.requestData[requestName] = requestData;
			}
			return requestData;
		},

		/**
		 * Executes callback function with results and clear callbacks array.
		 * @private
		 * @param {Object} callbackObjects Object with callback function and execution context.
		 * @param {Object} results Results for callback function.
		 */
		_executeCallbacks: function(callbackObjects, results) {
			if (!this.destroyed && callbackObjects.length > 0) {
				var reverseCallbackObjects = callbackObjects.reverse();
				reverseCallbackObjects.forEach(function(callbackObject) {
					Ext.callback(callbackObject.callback, callbackObject.scope,	[results]);
				}, this);
				callbackObjects = [];
			}
		},

		// endregion

		// region Methods: Protected

		/**
		 * Returns sent replicas request data.
		 * @protected
		 * @return {Object} Sent replicas request data.
		 */
		getSentReplicasRequestData: function() {
			return this._getRequestDataByName(this.sentReplicaMethodName);
		},

		/**
		 * Returns all replicas request data.
		 * @protected
		 * @return {Object} All replicas request data.
		 */
		getAllReplicasRequestData: function() {
			return this._getRequestDataByName(this.allReplicaMethodName);
		},

		/**
		 * Prepares response data from BulkEmailTemplateService and calls callback functions.
		 * @protected
		 * @param {Object} response Response from BulkEmailTemplateService.
		 */
		processLoadSentIdsResponse: function(response) {
			var allDcReplicasRequestData = this.getAllReplicasRequestData();
			var sentDcReplicasIdsRequestData = this.getSentReplicasRequestData();
			var sentIds = response && response.replicas && response.replicas.map(function(replica) {
				return replica.Id;
			});
			var sentReplicas = (sentIds && sentIds.length > 0)
				? allDcReplicasRequestData.results.filter(function(replica) {
					return sentIds.indexOf(replica.Id) !== -1;
				}, this)
				: [];
			sentDcReplicasIdsRequestData.results = sentReplicas;
			sentDcReplicasIdsRequestData.isLoading = false;
			this._executeCallbacks(sentDcReplicasIdsRequestData.callbacks, sentDcReplicasIdsRequestData.results.slice());
		},

		/**
		 * Calls GetSentDcReplicaIds service method when all replica was loaded.
		 * @protected
		 */
		innerLoadSent: function() {
			var sentDcReplicasIdsRequestData = this.getSentReplicasRequestData();
			sentDcReplicasIdsRequestData.isLoading = true;
			var allDcReplicasRequestData = this.getAllReplicasRequestData();
			if (!allDcReplicasRequestData.results) {
				allDcReplicasRequestData.callbacks.push({
					callback: this.innerLoadSent,
					scope: this
				});
				if (!allDcReplicasRequestData.isLoading) {
					this.innerLoadAll();
				}
			} else {
				ServiceHelper.callService({
					serviceName: this.bulkEmailServiceName,
					methodName: this.sentReplicaMethodName,
					callback: this.processLoadSentIdsResponse,
					scope: this,
					data: {bulkEmailId: this.bulkEmailId}
				});
			}
		},

		/**
		 * Prepares response data from BulkEmailTemplateService and calls callback functions.
		 * @protected
		 * @param {Object} response Response from BulkEmailTemplateService.
		 */
		processLoadAllResponse: function(response) {
			var allDcReplicasRequestData = this.getAllReplicasRequestData();
			allDcReplicasRequestData.results = response.replicas || [];
			allDcReplicasRequestData.isLoading = false;
			this._executeCallbacks(allDcReplicasRequestData.callbacks, allDcReplicasRequestData.results.slice());
		},

		/**
		 * Calls GetDcReplicas service method.
		 * @protected
		 */
		innerLoadAll: function() {
			var allDcReplicasRequestData = this.getAllReplicasRequestData();
			allDcReplicasRequestData.isLoading = true;
			ServiceHelper.callService({
				serviceName: this.bulkEmailServiceName,
				methodName: this.allReplicaMethodName,
				callback: this.processLoadAllResponse,
				scope: this,
				data: {bulkEmailId: this.bulkEmailId}
			});
		},

		// endregion

		// region Methods: Public

		/**
		 * Initializes repository.
		 * @param {String} bulkEmailId Email identifier.
		 */
		init: function(bulkEmailId) {
			this.bulkEmailId = bulkEmailId;
			this.requestData = {};
		},

		/**
		 * Destroyes repository instance.
		 */
		destroy: function() {
			this.destroyed = true;
			Terrasoft.each(this.requestData, function(requestObject) {
				requestObject.callbacks = [];
				requestObject.results = null;
			}, this);
			this.callParent();
		},

		/**
		 * Loads data of all email replicas.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback execution context.
		 */
		loadAll: function(callback, scope) {
			var allDcReplicasRequestData = this.getAllReplicasRequestData();
			if (allDcReplicasRequestData.results) {
				Ext.callback(callback, scope, [allDcReplicasRequestData.results.slice()]);
				return;
			}
			allDcReplicasRequestData.callbacks.push({
				callback: callback,
				scope: scope
			});
			if (!allDcReplicasRequestData.isLoading) {
				this.innerLoadAll();
			}
		},

		/**
		 * Loads data of sent email replicas.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback execution context.
		 */
		loadSent: function(callback, scope) {
			var sentDcReplicasIdsRequestData = this.getSentReplicasRequestData();
			if (sentDcReplicasIdsRequestData.results) {
				Ext.callback(callback, scope, [sentDcReplicasIdsRequestData.results.slice()]);
				return;
			}
			sentDcReplicasIdsRequestData.callbacks.push({
				callback: callback,
				scope: scope
			});
			if (!sentDcReplicasIdsRequestData.isLoading) {
				this.innerLoadSent();
			}
		}

		// endregion

	});
});


