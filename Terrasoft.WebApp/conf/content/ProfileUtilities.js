Terrasoft.configuration.Structures["ProfileUtilities"] = {innerHierarchyStack: ["ProfileUtilities"]};
define("ProfileUtilities", ["terrasoft"],
		function(Terrasoft) {

			Ext.define("Terrasoft.configuration.ProfileUtilities", {
				extend: "Terrasoft.BaseObject",
				alternateClassName: "Terrasoft.ProfileUtilities",
				singleton: true,

				//region Properties: Private

				/**
				 * Default profile key template.
				 * @private
				 * @type {String}
				 */
				defaultProfileKeyTpl:  "{0}GridSettingsGridDataView",

				/**
				 * Prefix of profile key.
				 * @private
				 * @type {String}
				 */
				profilePrefix: "profile!",

				//endregion

				//region Methods: Private

				/**
				 * Returns profile through the callback function.
				 * @private
				 * @param {String} profileKey Profile key.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback scope.
				 */
				requireProfile: function(profileKey, callback, scope) {
					Terrasoft.require([this.profilePrefix + profileKey], callback, scope);
				},
				
				/**
				 * @private
				 */
				_getSectionEntitySchemaName: function(config) {
					var configSchemaName = config.entitySchemaName || config.schemaResponse.entitySchemaName;
					if (configSchemaName) {
						return configSchemaName;
					}
					var modulesBySectionSchema = Terrasoft.filterObject(Terrasoft.configuration.ModuleStructure, {
						sectionSchema: config.schemaName
					});
					var modulesValues = _.values(modulesBySectionSchema);
					return modulesValues.length > 0
							? Terrasoft.first(modulesValues).entitySchemaName
							: Terrasoft.emptyString;
				},

				//endregion

				//region Methods: Protected

				/**
				 * Returns default grid settings.
				 * @protected
				 * @param {Object} config Configuration.
				 * @param {String} config.profileKey Profile key.
				 * @param {Object} config.primaryDisplayColumn Primary display column.
				 * @return {Object} Default grid settings.
				 */
				getDefaultGridSettings: function(config) {
					var profileKey = config.profileKey;
					var columnName = config.primaryDisplayColumn.name;
					var caption = config.primaryDisplayColumn.caption;
					var result = {
						"tiledColumnsConfig": "{}",
						"listedColumnsConfig": "{}",
						"DataGrid": {
							"tiledConfig": "{\"grid\":{\"rows\":1,\"columns\":24},\"items\":[{\"bindTo\":\"" +
							"" + columnName + "\",\"caption\":\"" + caption + "\",\"position\":{\"column\":0," +
							"\"colSpan\":24,\"row\":1},\"dataValueType\":1,\"metaPath\":\"" + columnName + "\"," +
							"\"path\":\"" + columnName + "\",\"captionConfig\":{\"visible\":false}}]}",
							"listedConfig": "{\"items\":[{\"bindTo\":\"" + columnName + "\",\"caption\":\"" +
							"" + caption + "\",\"position\":{\"column\":0,\"colSpan\":24,\"row\":1}," +
							"\"dataValueType\":1,\"metaPath\":\"" + columnName + "\",\"path\":\"" +
							"" + columnName + "\"}]}",
							"key": profileKey,
							"isTiled": false,
							"type": "listed"
						},
						"key": profileKey,
						"DataGridVerticalProfile": {
							"tiledConfig": "{\"grid\":{\"rows\":2,\"columns\":24},\"items\":[{\"bindTo\":\"" +
							"" + columnName + "\",\"caption\":\"" + caption + "\",\"position\":{\"column\":0," +
							"\"colSpan\":24,\"row\":1},\"dataValueType\":1,\"captionConfig\":{\"visible\":false}}," +
							"{\"bindTo\":\"" + columnName + "\",\"caption\":\"" + caption + "\",\"position\":{" +
							"\"column\":0,\"colSpan\":24,\"row\":2},\"captionConfig\":{\"visible\":true}}]}",
							"listedConfig": "{\"items\":[{\"bindTo\":\"" + columnName + "\",\"caption\":\"" +
							"" + caption + "\",\"position\":{\"column\":0,\"colSpan\":16,\"row\":1}," +
							"\"dataValueType\":1},{\"bindTo\":\"" + columnName + "\",\"caption\":\"" + caption + "\"," +
							"\"position\":{\"column\":16,\"colSpan\":8,\"row\":1}}]}",
							"key": profileKey,
							"isTiled": true,
							"type": "tiled"
						}
					};
					return result;
				},

				/**
				 * Returns section profile key.
				 * @protected
				 * @param {String} sectionSchemaName Section schema name.
				 * @return {String} Section profile key.
				 */
				getSectionProfileKey: function(sectionSchemaName) {
					return Ext.String.format(this.defaultProfileKeyTpl, sectionSchemaName);
				},

				/**
				 * Returns grid settings through the callback function.
				 * @protected
				 * @param {Object} config Configuration.
				 * @param {String} config.entitySchemaName Entity schema name.
				 * @param {String} config.profileKey Profile key.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback scope.
				 */
				getSectionDefaultGridSettings: function(config, callback, scope) {
					Terrasoft.chain(
							function(next) {
								Terrasoft.require([config.entitySchemaName], next, scope);
							},
							function(next, entitySchema) {
								var gridSettings = this.getDefaultGridSettings({
									primaryDisplayColumn: entitySchema.primaryDisplayColumn,
									profileKey: config.profileKey
								});
								callback.call(scope, gridSettings);
							},
							this
					);
				},

				/**
				 * Init section profile.
				 * @protected
				 * @param {String} profileKey Profile key.
				 * @param {Object} gridSettingsConfig Grid settings.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback scope.
				 */
				initSectionProfile: function(profileKey, gridSettingsConfig, callback, scope) {
					this.getSectionDefaultGridSettings(gridSettingsConfig, function(gridSettings) {
						callback.call(scope, gridSettings);
					}, this);
				},

				//endregion

				//region Methods: Public

				/**
				 * Returns profile through the callback function.
				 * @param {Object} config Configuration.
				 * @param {String} config.entitySchemaName Entity schema name.
				 * @param {String} config.schemaName Section schema name.
				 * @param {String} config.profileKey Profile key.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback scope.
				 */
				getProfile: function(config, callback, scope) {
					var profileKey = config && config.profileKey;
					this.requireProfile(profileKey, function(profile) {
						if (Terrasoft.isEmptyObject(profile)) {
							switch (profileKey) {
								case Terrasoft.ProfileUtilities.getSectionProfileKey(config.schemaName):
									var profileConfig = {
										entitySchemaName: this._getSectionEntitySchemaName(config),
										profileKey: profileKey
									};
									this.initSectionProfile(profileKey, profileConfig, callback, scope);
									break;
								default:
									callback.call(scope, profile);
									break;
							}
						} else {
							callback.call(scope, profile);
						}
					}, this);
				}

				//endregion
			});
		});


