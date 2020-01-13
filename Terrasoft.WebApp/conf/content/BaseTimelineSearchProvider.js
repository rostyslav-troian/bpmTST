Terrasoft.configuration.Structures["BaseTimelineSearchProvider"] = {innerHierarchyStack: ["BaseTimelineSearchProvider"]};
define("BaseTimelineSearchProvider", [], function() {
	/**
	 * Base abstract timeline search provider class.
	 */
	Ext.define("Terrasoft.configuration.BaseTimelineSearchProvider", {
		alternateClassName: "Terrasoft.BaseTimelineSearchProvider",

		// region Methods: Protected

		/**
		 * Checks that search should be applied.
		 * @protected
		 * @param {Object} options Search options that were passed with search request.
		 */
		checkForSearchApply: function(options) {
			if (!Ext.isObject(options)) {
				return false;
			}
			var isEntitiesConfigDefined = Ext.isArray(options.entitiesConfig) && options.entitiesConfig.length !== 0;
			var isSearchKeyDefined = Ext.isString(options.searchKey) && options.searchKey.trim() !== "";
			return isEntitiesConfigDefined && isSearchKeyDefined;
		},

		/**
		 * Performs search logics for timeline items. Will be called only if search is applied.
		 * @abstract
		 * @param {Object} options Search options that were passed with search request.
		 */
		performSearch: Terrasoft.abstractFn,

		// endregion

		// region Methods: Public

		/**
		 * Searches some text in specific columns of timeline items and calls callback function passing
		 * result to it. If search has not applied 'null' will be passed as search result.
		 * @param {Object} options Search options.
		 * @param {String} options.searchKey String to search.
		 * @param {Object[]} options.entitiesConfig Timeline entities config.
		 * @param {Function} options.callback Callback function that will be called with search result as first
		 * argument and with passed args after it.
		 * @param {Object} options.scope Callback function execution context.
		 * @param {Array} options.args Callback function arguments. WIll be passed after search result object.
		 */
		search: function(options) {
			if (!this.checkForSearchApply(options)) {
				var args = Ext.isArray(options.args) ? options.args : [];
				Ext.callback(options.callback, options.scope, [null].concat(args));
				return;
			}
			this.performSearch(options);
		}

		// endregion

	});
});


