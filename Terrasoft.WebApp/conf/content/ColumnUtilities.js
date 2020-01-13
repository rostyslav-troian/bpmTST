Terrasoft.configuration.Structures["ColumnUtilities"] = {innerHierarchyStack: ["ColumnUtilities"]};
define("ColumnUtilities", ["terrasoft", "ColumnUtilitiesResources"],
		function(Terrasoft, resources) {
			Ext.define("Terrasoft.configuration.ColumnUtilities", {
				extend: "Terrasoft.BaseObject",
				alternateClassName: "Terrasoft.ColumnUtilities",
				statics: {

					//region Methods: Private

					/**
					 * Processing profile config.
					 * @private
					 * @param {Object} config Configuration information.
					 * @param {Object} config.columnConfig Grid column configuration.
					 * @param {String} config.profileCultureId Profile system culture identifier.
					 * @param {Array} config.notFoundColumns Array of not found columns.
					 * @param {Array} config.entityColumns Entity schema columns.
					 * @return {Object} Processed profile grid config.
					 */
					updateProfileColumnConfig: function(config) {
						var columnsConfig = config.columnsConfig;
						var gridColumnsConfig = {
							columnsConfig: columnsConfig.listedConfig,
							notFoundColumns: config.notFoundColumns,
							profileCultureId: config.profileCultureId,
							entityColumns: config.entityColumns
						};
						columnsConfig.listedConfig = this.processColumnsConfig(gridColumnsConfig);
						gridColumnsConfig.columnsConfig = columnsConfig.tiledConfig;
						columnsConfig.tiledConfig = this.processColumnsConfig(gridColumnsConfig);
						return columnsConfig;
					},

					//endregion

					//region Methods: Public

					/**
					 * Updates profile columns config.
					 * @param {Object} config Configuration information.
					 * @param {Object} config.profile Profile columns config.
					 * @param {Object} [config.profile.DataGrid] Profile data grid columns config.
					 * @param {Object} [config.profile.DataGridVerticalProfile] Profile vertical data grid columns config.
					 * @param {Array} [config.notFoundColumns] Array of not found columns.
					 * @param {Array} [config.entityColumns] Entity schema columns.
					 * @return {Object} Processed profile.
					 */
					updateProfileColumnCaptions: function(config) {
						var profile = config.profile;
						var profileConfig = {
							columnsConfig: profile.DataGrid,
							profileCultureId: profile.profileCultureId,
							notFoundColumns: config.notFoundColumns,
							entityColumns: config.entityColumns
						};
						if (!Terrasoft.isEmptyObject(profile.DataGrid)) {
							profile.DataGrid = this.updateProfileColumnConfig(profileConfig);
						}
						if (!Terrasoft.isEmptyObject(profile.DataGridVerticalProfile)) {
							profileConfig.columnsConfig = profile.DataGridVerticalProfile;
							profile.DataGridVerticalProfile = this.updateProfileColumnConfig(profileConfig);
						}
						if (Ext.isDefined(profile.listedConfig) && Ext.isDefined(profile.tiledConfig)) {
							profileConfig.columnsConfig = profile;
							profile = this.updateProfileColumnConfig(profileConfig);
						}
						return profile;
					},

					/**
					 * Processes column configuration.
					 * @param {Object} config Columns configuration object.
					 * @param {String} config.columnsConfig Columns configuration information JSON.
					 * @param {Array} config.notFoundColumns Array of not found columns.
					 * @param {String} config.profileCultureId Profile system culture identifier.
					 * @param {Array} config.entityColumns Entity schema columns.
					 * @return {String} Processed columns.
					 */
					processColumnsConfig: function(config) {
						var columnsJson = config.columnsConfig;
						if (!columnsJson) {
							return columnsJson;
						}
						var columnsConfig = Ext.decode(columnsJson);
						if (!columnsConfig || !columnsConfig.items) {
							return columnsJson;
						}
						var needUseEntityColumnCaption = !this.isProfileCultureEqualsUserCulture({
							profileCultureId: config.profileCultureId
						});
						Terrasoft.each(columnsConfig.items, function(item) {
							if (needUseEntityColumnCaption) {
								item.caption = this.getEntityColumnCaption(item, config.entityColumns);
							}
							this.processNotFoundColumns(item, config.notFoundColumns);
						}, this);
						return Ext.JSON.encode(columnsConfig);
					},

					/**
					 * Processes not found columns.
					 * @param {Object} column Custom or profile column object.
					 * @param {Object[]} notFoundColumns Not found column array.
					 */
					processNotFoundColumns: function(column, notFoundColumns) {
						if (Ext.isEmpty(notFoundColumns)) {
							return;
						}
						var notFoundString = resources.localizableStrings.NotFound;
						notFoundColumns.forEach(function(item) {
							if (!column.isNotFound && column.path === item) {
								if (column.caption.indexOf(notFoundString) !== -1) {
									return;
								}
								Ext.apply(column, {
									caption: Ext.String.format("{0} {1}", column.caption, notFoundString),
									isNotFound: true
								});
							}
						}, this);
					},

					/**
					 * Returns entity column caption.
					 * @param {Object} column Custom or profile column object.
					 * @param {Object[]} entityColumns Entity column collection.
					 * @return {String}
					 */
					getEntityColumnCaption: function(column, entityColumns) {
						var columnPath = column.path || column.bindTo;
						if (entityColumns && entityColumns.hasOwnProperty(columnPath)) {
							return entityColumns[columnPath].caption || column.caption;
						}
						return column.caption;
					},

					/**
					 * Returns true if need to load custom column caption.
					 * @param {Object} profile Profile.
					 * @return {Boolean}
					 */
					isProfileCultureEqualsUserCulture: function(profile) {
						if (Ext.isEmpty(profile)) {
							return true;
						}
						var profileCultureId = profile.profileCultureId;
						if (!profileCultureId) {
							return true;
						}
						var userCultureId = Terrasoft.SysValue.CURRENT_USER_CULTURE.value;
						return profileCultureId.toLowerCase() === userCultureId.toLowerCase();
					},

					/**
					 * Returns array of not found columns.
					 * @param {Object} rowConfig Columns configuration object.
					 * @return {String[]} Array of not found columns.
					 */
					findNotFoundColumns: function(rowConfig) {
						var notFoundColumns = [];
						if (Terrasoft.isEmptyObject(rowConfig)) {
							return notFoundColumns;
						}
						var keys = Terrasoft.keys(rowConfig);
						keys.forEach(function(key) {
							var row = rowConfig[key];
							if (row.hasOwnProperty("isNotFound") &&
									notFoundColumns.indexOf(row.columnPath) === -1) {
								notFoundColumns.push(row.columnPath);
							}
						}, this);
						return notFoundColumns;
					}
					//endregion

				}
			});
		});


