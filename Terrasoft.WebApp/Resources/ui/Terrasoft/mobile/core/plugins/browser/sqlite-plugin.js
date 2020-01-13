/**
 * The plugin for working with SQLite-database
 */
Ext.define("Terrasoft.mobile.SqlitePlugin", {
	extend: "Terrasoft.BaseBrowserPlugin",
	alternateClassName: "Terrasoft.SqlitePlugin",

	statics: {

		//region Properties: Private

		/**
		 * @private
		 */
		defaultDatabaseParams: {
			name: "bpmonlinedb740",
			description: "bpm'online database",
			version: "1.0",
			size: 1024 * 1024 * 1024
		},

		db: null,

		//endregion

		//region Methods: Private

		/**
		 * @private
		 */
		openDatabase: function() {
			if (!this.db) {
				this.db = window.openDatabase(this.defaultDatabaseParams.name, this.defaultDatabaseParams.version,
					this.defaultDatabaseParams.description, this.defaultDatabaseParams.size);
			}
			return this.db;
		},

		//endregion

		//region Methods: Public

		executeSql: function(config) {
			this.openDatabase();
			this.db.transaction(function(transactionContext) {
				transactionContext.executeSql(config.sql, null, function(transaction, result) {
					Ext.callback(config.success, config.scope, [result]);
				}, function(error) {
					Ext.callback(config.failure, config.scope, [error]);
				});
			});
		}

		//endregion

	}

});