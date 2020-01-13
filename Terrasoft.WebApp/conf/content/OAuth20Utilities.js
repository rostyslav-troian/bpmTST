Terrasoft.configuration.Structures["OAuth20Utilities"] = {innerHierarchyStack: ["OAuth20Utilities"]};
define("OAuth20Utilities", [], function() {
	Ext.define("Terrasoft.OAuth20Utilities", {
		singleton: true,

		// region Methods: Public

		/**
		 * Adds filters to show only created in section applications
		 * @param {Collection} filters Filters collection.
		 * @public
		 */
		addCustomApplicationFilters: function(filters) {
			filters.addItem(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.IS_NULL,
					"AppClassName",
					Terrasoft.DataValueType.TEXT));
			filters.addItem(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.IS_NULL,
					"ClientClassName",
					Terrasoft.DataValueType.TEXT));
		},

		/**
		 * Checks if user can login in specific OAuth application.
		 * @param {String} userId User id.
		 * @param {String} appId OAuth application id.
		 * @param {Function} callback Callback.
		 * @param {Object} scope Scope.
		 * @public
		 */
		canLoginOAuthUser: function(userId, appId, callback, scope) {
			var userExistsQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "VwOAuthAppUser"
			});
			userExistsQuery.addAggregationSchemaColumn("Id", Terrasoft.AggregationType.COUNT, "IdCOUNT");
			userExistsQuery.filters.addItem(
				Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "SysUser", userId));
			userExistsQuery.filters.addItem(
				Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "OAuthApp", appId));
			userExistsQuery.getEntityCollection(function(response) {
				if (response.success) {
					var result = response.collection.getByIndex(0);
					Ext.callback(callback, scope, [result.get("IdCOUNT") === 0]);
				}
			}, this);
		}

		// endregion

	});

	return Terrasoft.OAuth20Utilities;

});


