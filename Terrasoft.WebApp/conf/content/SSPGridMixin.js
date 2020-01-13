Terrasoft.configuration.Structures["SSPGridMixin"] = {innerHierarchyStack: ["SSPGridMixin"]};
define("SSPGridMixin", ["GridUtilitiesV2"], function() {
	/**
	 * SSPGridMixin mixin class.
	 * Provides methods for grid handling in ssp sections.
	 * @class Terrasoft.FileImportMixin
	 */
	Ext.define("Terrasoft.SSPGridMixin", {
		alternateClassName: "Terrasoft.configuration.mixins.SSPGridMixin",

		// region Methods: Protected

		/**
		 * Decorates gridSettingsInfo by portal config.
		 * @protected
		 * @param {Object} gridSettingsInfo Portal grid settings config object.
		 */
		applyPortalGridSettingsInfo: function(gridSettingsInfo) {
			gridSettingsInfo.firstColumnsOnly = true;
			gridSettingsInfo.useBackwards = false;
			const schemaAccessList = this.Terrasoft.configuration.PortalSchemaAccessList;
			const primaryColumnName = gridSettingsInfo.entitySchema.primaryColumnName;
			if (schemaAccessList.hasOwnProperty(gridSettingsInfo.entitySchemaName)) {
				const entityColumns = gridSettingsInfo.entitySchema.columns;
				for (var column in entityColumns) {
					if ((column !== primaryColumnName) && this.Ext.isEmpty(this.Terrasoft.findWhere(
						schemaAccessList[gridSettingsInfo.entitySchemaName].explorerAllowedColumns,
						{uId: entityColumns[column].uId}))) {
						delete gridSettingsInfo.entitySchema.columns[column];
					}
				}
			} else {
				const columns = gridSettingsInfo.entitySchema.columns;
				for (var columnName in columns) {
					if(columns.hasOwnProperty(columnName)){
						const primaryDisplayColumnName = gridSettingsInfo.entitySchema.primaryDisplayColumnName;
						if (columnName !== primaryColumnName && columnName !== primaryDisplayColumnName) {
							delete gridSettingsInfo.entitySchema.columns[columnName];
						}
					}
				}
			}
		},

		// endregion

		// region Methods: Public

		/**
		 * Gets allowed column uids for current portal user.
		 * @public
		 * @param {string} entitySchemaName Object entity schema name.
		 * @return {Array|null} Array of allowed column uids for current portal user.
		 */
		getAllowedColumns: function(entitySchemaName) {
			if (Terrasoft.isCurrentUserSsp() && Terrasoft.Features.getIsEnabled("PortalColumnConfig")) {
				const schemaAccessList = Terrasoft.configuration.PortalSchemaAccessList;
				if (!schemaAccessList.hasOwnProperty(entitySchemaName)) {
					return [];
				}
				const currentSchemaAccessList = schemaAccessList[entitySchemaName];
				return currentSchemaAccessList.explorerAllowedColumns;
			}
			return null;
		}

		// endregion


	});
});


