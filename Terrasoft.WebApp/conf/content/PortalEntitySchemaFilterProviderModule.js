Terrasoft.configuration.Structures["PortalEntitySchemaFilterProviderModule"] = {innerHierarchyStack: ["PortalEntitySchemaFilterProviderModule"]};
define("PortalEntitySchemaFilterProviderModule", ["terrasoft", "EntitySchemaFilterProviderModule"],
	function (Terrasoft) {
		/**
		 * @class Terrasoft.data.filters.PortalEntitySchemaFilterProvider
		 * Portal entity schema start filters provider.
		 */
		Ext.define("Terrasoft.data.filters.PortalEntitySchemaFilterProvider", {
			extend: "Terrasoft.EntitySchemaFilterProvider",
			alternateClassName: "Terrasoft.PortalEntitySchemaFilterProvider",


			//region Methods: Private

			/**
			 * Get allowed column uids for current portal user.
			 * @private
			 * @returns {Array} Array of allowed column uids for current portal user
			 */
			_getAllowedColumns: function() {
				var schemaAccessList = Terrasoft.configuration.PortalSchemaAccessList;
				var rootSchemaName = this.rootSchemaName;
				return schemaAccessList.hasOwnProperty(rootSchemaName)
					? schemaAccessList[rootSchemaName].explorerAllowedColumns
					: [];
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.data.filters.EntitySchemaFilterProvider#getLeftExpressionConfig
			 * @overriden
			 */
			getLeftExpressionConfig: function () {
				var parentConfig = this.callParent(arguments);
				if (!Terrasoft.Features.getIsEnabled("PortalColumnConfig")){
					return parentConfig;
				}
				parentConfig.allowedColumns = this._getAllowedColumns();
				parentConfig.firstColumnsOnly = true;
				parentConfig.useBackwards = false;
				return parentConfig;
			},

			/**
			 * @inheritdoc Terrasoft.data.filters.EntitySchemaFilterProvider#getLookupFilterConfig
			 * @overriden
			 */
			getLookupFilterConfig: function() {
				var config = this.callParent(arguments);
				config.settingsButtonVisible = false;
				return config;
			}

			//endregion

		});
		return Terrasoft.PortalEntitySchemaFilterProvider;
	}
);


