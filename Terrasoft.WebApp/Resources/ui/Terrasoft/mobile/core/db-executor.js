/**
 * A class that implements the methods of working with the local SQLite database.
 */
Ext.define("Terrasoft.mobile.DBExecutor", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.DBExecutor",

	statics: {
		/**
   * The method of executing the SQL query.
   * @param {Object} config Configuration of query execution:
   * @param {String} config.sql The text of the SQL query.
   * @param {Function} config.success Callback function on successful execution of the method.
   * @param {Function} config.failure Callback function when the method fails.
   * @param {Object} config.scope The context of the callback functions.
   */
		executeSql: function(config) {
			Terrasoft.SqlitePlugin.executeSql({
				sql: config.sql,
				success: config.success,
				failure: config.failure,
				scope: config.scope
			});
		}
	}

});