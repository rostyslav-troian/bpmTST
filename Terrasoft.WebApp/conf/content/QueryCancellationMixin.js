Terrasoft.configuration.Structures["QueryCancellationMixin"] = {innerHierarchyStack: ["QueryCancellationMixin"]};
define("QueryCancellationMixin", [], function() {
	/**
	 * @class Terrasoft.configuration.mixins.QueryCancellationMixin
	 * Helps to cancel running queries.
	 */
	Ext.define("Terrasoft.configuration.mixins.QueryCancellationMixin", {
		alternateClassName: "Terrasoft.QueryCancellationMixin",

		/**
		 * Module-wide {Object} that stores last sent queries by their keys.
		 * @private
		 * @type {Object}
		 **/
		_sentQueries: null,

		/**
		* Returns a module-wide {Object} that stores last sent queries by their keys.
		* @private
		* @return {Object} An object with sent queries.
		**/
		_getSentQueries: function() {
			return this._sentQueries || (this._sentQueries = {});
		},

		/**
		 * Registers sent queries in a module-wide obect by thier keys.
		 * Cancels previously sent query with the same key.
		 * @param {String} key A string to uniquely identify the query.
		 * @param {Terrasoft.BaseQuery} query A Query to be registered.
		 **/
		registerSentQuery: function(key, query) {
			if (key && query) {
				var sentQueries = this._getSentQueries();
				var previousQuery = sentQueries[key];
				if (previousQuery && previousQuery.abortQuery) {
					previousQuery.abortQuery();
				}
				sentQueries[key] = query;
			}
		}

	});
	return Ext.create("Terrasoft.QueryCancellationMixin");
});


