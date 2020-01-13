Terrasoft.configuration.Structures["BaseAjaxTimelineDataProvider"] = {innerHierarchyStack: ["BaseAjaxTimelineDataProvider"]};
define("BaseAjaxTimelineDataProvider", ["BaseTimelineDataProvider"], function() {
	/**
	 * Base timeline data provider that uses AJAX requests for data load.
	 */
	Ext.define("Terrasoft.configuration.BaseAjaxTimelineDataProvider", {
		extend: "Terrasoft.BaseTimelineDataProvider",
		alternateClassName: "Terrasoft.BaseAjaxTimelineDataProvider",

		// region Properties: Protected

		/**
		 * Current request unique identifier.
		 * @protected
		 * @type {String}
		 */
		requestId: null,

		// endregion

		// region Methods: Protected

		/**
		 * Performs AJAX request to load timeline data and passes the result to the callback function.
		 * @param {*} searchProviderResult Result received from search provider execution.
		 * @param {Object} config Data loading config.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 * @return {String} Unique identifier of the created AJAX request object.
		 */
		performLoadDataRequest: function(searchProviderResult, config, callback, scope) {
			throw new Terrasoft.NotImplementedException();
		},

		/**
		 * Processes AJAX response before passing it away as a result.
		 * @protected
		 * @param {Object} response Data loading response.
		 * @param {Object} config Data loading config.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		onDataLoaded: function(response, config, callback, scope) {
			Ext.callback(callback, scope, [response]);
		},

		/**
		 * @inheritdoc Terrasoft.BaseTimelineDataProvider#loadDataBySearchResult
		 * @override
		 */
		loadDataBySearchResult: function(searchProviderResult, config, callback, scope) {
			this.requestId = this.performLoadDataRequest(searchProviderResult, config, function(response) {
				this.requestId = null;
				this.onDataLoaded(response, config, callback, scope);
			}, this);
		},

		/**
		 * Cancels execution of the AJAX request that currently loads the data.
		 * @protected
		 */
		abortRequest: function() {
			var requestId = this.requestId;
			if (requestId) {
				Terrasoft.AjaxProvider.abortRequestByInstanceId(requestId);
			}
			this.requestId = null;
		},

		// endregion

		// region Methods: Public

		/**
		 * @inheritdoc Terrasoft.BaseTimelineDataProvider#abort
		 * @override
		 */
		abort: function() {
			this.abortRequest();
		}

		// endregion

	});
});


