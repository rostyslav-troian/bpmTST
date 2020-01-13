/**
 * The plugin for working with SQLite-database
 */
Ext.define("Terrasoft.mobile.SqlitePlugin", {
	extend: "Terrasoft.BaseNativePlugin",
	alternateClassName: "Terrasoft.SqlitePlugin",

	statics: {
		/**
		 * The method of converting data to the format described by W3C (see http://www.w3.org/TR/webdatabase/#sqlresultset)
		 * @param {String} data Data represented as a string representation of a json object
		 * @private
		 */
		convertData: function(data) {
			if (!data) {
				return data;
			}
			var rows = JSON.parse(data) || [];
			var convertedData = {
				rows: {
					item: function(i) {
						return rows[i];
					},
					length: rows.length
				},
				rowsAffected: 0,
				insertId: 0
			};
			return convertedData;
		},

		/**
		 * The method of executing the SQL query.
		 * @param {Object} config Configuration of query execution:
		 * @param {String} config.sql The text of the SQL query.
		 * @param {Function} config.success Callback function on successful execution of the method.
		 * @param {Function} config.failure Callback function when the method fails.
		 * @param {Object} config.scope The context of the callback functions.
		 */
		executeSql: function(config) {
			var self = this;
			this.executeInternal({
				plugin: "SqlPlugin",
				action: "ExecuteSql",
				args: {
					SqlText: config.sql
				},
				success: function(data) {
					Ext.callback(config.success, config.scope, [self.convertData(data)]);
				},
				failure: config.failure,
				scope: config.scope
			});
		}
	}

});