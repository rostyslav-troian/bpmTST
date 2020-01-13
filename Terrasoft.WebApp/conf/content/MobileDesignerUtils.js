Terrasoft.configuration.Structures["MobileDesignerUtils"] = {innerHierarchyStack: ["MobileDesignerUtils"]};
define("MobileDesignerUtils", ["sandbox", "MobileDesignerUtilsResources",
		"MobileDesignerEnums", "MobileDesignerApplicationManifest", "MobileDesignerConfigManager",
		"MobileDesignerMetadataToManifestConverter", "MobileDesignerSchemaManager", "MobileDesignerApplicationManifest",
		"EntityStructureHelperMixin"],
	function(sandbox) {

		/**
		 * @class Terrasoft.MobileDesignerUtils
		 * @public
		 * Mobile designer utilities.
		 */
		Ext.define("Terrasoft.MobileDesignerUtils", {

			mixins: {
				EntityStructureHelper: "Terrasoft.EntityStructureHelperMixin"
			},

			singleton: true,

			schemaManager: null,

			//region Properties: Private

			sandbox: Ext.create(sandbox),

			initialConfig: null,

			manifest: null,

			defaultWorkplaceCode: "DefaultWorkplace",

			//endregion

			//region Methods: Private

			/**
			 * @private
			 */
			initializeSchemaManager: function() {
				var config = this.initialConfig;
				var schemaManager = this.schemaManager = Ext.create("Terrasoft.MobileDesignerSchemaManager");
				schemaManager.self.initialize({
					packageUId: config.packageUId,
					workplaceCode: config.workplaceCode,
					callback: this.initializeManifest,
					scope: this
				});
			},
			
			/**
			 * @private
			 */
			addManifestByPackage: function(manifests, localizableStringsList, manifestSchemas, packageUId) {
				var schemaManager = this.schemaManager;
				var manifestSchema = Ext.Array.findBy(manifestSchemas, function(schema) {
					return schema.packageUId === packageUId;
				});
				if (manifestSchema) {
					manifests.push(schemaManager.self.getManifestBody(manifestSchema));
					localizableStringsList.push(schemaManager.self.getSchemaLocalizableStrings(manifestSchema));
				}
			},

			/**
			 * @private
			 */
			buildManifestByHierarchy: function(manifestSchemaInstance, baseManifestSchemaInstances) {
				Terrasoft.SchemaDesignerUtilities.buildPackageHierarchy({
					packageUId: manifestSchemaInstance.packageUId,
					useCache: true
				}, function(packageHierarchy) {
					Terrasoft.SchemaDesignerUtilities.getSchemaHierarchy(manifestSchemaInstance, function(manifestSchemaInstances) {
						var localizableStrings = [];
						var manifests = [];
						for (var i = packageHierarchy.length - 1; i >= 0; i--) {
							var packageUId = packageHierarchy[i];
							this.addManifestByPackage(manifests, localizableStrings, baseManifestSchemaInstances, packageUId);
							this.addManifestByPackage(manifests, localizableStrings, manifestSchemaInstances, packageUId);
						}
						this.manifest = Ext.create("Terrasoft.MobileDesignerApplicationManifest", {
							manifests: manifests,
							localizableStrings: localizableStrings
						});
						var config = this.initialConfig;
						Ext.callback(config.callback, config.scope);
					}, this);
				}, this);
			},

			/**
			 * @private
			 */
			initializeManifest: function() {
				var schemaManager = this.schemaManager;
				schemaManager.readManifestSchema({
					callback: function(manifestSchemaInstance) {
						schemaManager.readBaseManifestSchemaInstances({
							callback: function(baseManifestSchemaInstances) {
								this.buildManifestByHierarchy(manifestSchemaInstance, baseManifestSchemaInstances);
							},
							scope: this
						});
					},
					scope: this
				});
			},

			/**
			 * @private
			 */
			resolveColumnCaption: function(config) {
				var currentColumnIndex = config.currentColumnIndex;
				var columnNames = config.columnNames;
				var numberOfColumns = config.numberOfColumns;
				if (!Ext.isNumber(currentColumnIndex)) {
					columnNames = config.columnNames = config.columnName.split(".");
					currentColumnIndex = config.currentColumnIndex = 0;
					numberOfColumns = config.numberOfColumns = columnNames.length;
				}
				var currentModelName = config.modelName;
				var columnName = columnNames[currentColumnIndex];
				this.getEntitySchema(currentModelName, function(schema) {
					var columnMetadata = schema.getColumnByName(columnName);
					config.currentColumnIndex++;
					var newCaption = columnMetadata.caption;
					var oldCaption = config.caption;
					if (oldCaption) {
						newCaption = oldCaption + "." + newCaption;
					}
					config.caption = newCaption;
					var referenceSchemaName = columnMetadata.referenceSchemaName;
					if (config.currentColumnIndex === numberOfColumns || !referenceSchemaName) {
						Ext.callback(config.callback, this, [config.caption]);
					} else {
						config.modelName = referenceSchemaName;
						this.resolveColumnCaption(config);
					}
				}, this);
			},

			// endregion

			/**
			 * Initialize.
			 * @param {Object} config Config object.
			 * @param {String} config.packageUId UId of package.
			 * @param {Boolean} config.workplaceCode Code of work place.
			 * @param {Function} config.callback Callback function.
			 * @param {Object} config.scope Scope for callback function.
			 */
			initialize: function(config) {
				this.initialConfig = config;
				this.initializeSchemaManager();
			},

			/**
			 * Gets schema name and loads settings.
			 * @param {Object} config Config object.
			 * @param {String} config.entitySchemaName Name of object.
			 * @param {String} config.settingsType Setting type.
			 * @param {Function} config.callback Callback function.
			 * @param {Object} config.scope Scope for callback function.
			 */
			loadSettings: function(config) {
				this.schemaManager.readSettingsSchema({
					entitySchemaName: config.entitySchemaName,
					settingsType: config.settingsType,
					callback: function(schemaInstance) {
						var designConfigManager = Ext.create("Terrasoft.MobileDesignerConfigManager", {
							schemaInstance: schemaInstance
						});
						designConfigManager.buildDesignerConfig({
							callback: config.callback,
							scope: config.scope
						});
					},
					scope: this
				});
			},

			/**
			 * Loads columns name.
			 * @param {Object} config Config object.
			 * @param {String} config.modelName Name of parent object.
			 * @param {Array} config.items Array of columns.
			 * @param {Function} config.callback Callback function.
			 * @param {Object} config.scope Scope for callback function.
			 */
			setColumnsContentByPath: function(config) {
				this.loadedEntitySchemas = {};
				var chainArguments = [];
				var getColumnCaptionFn = function(item) {
					return function(next) {
						this.resolveColumnCaption({
							modelName: config.modelName,
							columnName: item.columnName,
							callback: function(content) {
								item.content = content;
								next();
							}
						});
					};
				};
				var items = config.items;
				for (var i = 0, ln = items.length; i < ln; i++) {
					chainArguments.push(getColumnCaptionFn(items[i]));
				}
				chainArguments.push(function(next) {
					Ext.callback(config.callback, config.scope);
					next();
				});
				chainArguments.push(this);
				Ext.callback(Terrasoft.chain, this, chainArguments);
			},

			/**
			 * Gets schema name and saves settings.
			 * @param {Object} config Config object.
			 * @param {String} config.entitySchemaName Name of object.
			 * @param {String} config.settingsType Setting type.
			 * @param {Object} config.settings Settings, that should be saved.
			 * @param {Function} config.callback Callback function.
			 * @param {Object} config.scope Scope for callback function.
			 */
			saveSettings: function(config) {
				var schemaManager = this.schemaManager;
				var entitySchemaName = config.entitySchemaName;
				var schemaInstance = schemaManager.getSettingsSchemaInstance(entitySchemaName, config.settingsType);
				var designConfigManager = Ext.create("Terrasoft.MobileDesignerConfigManager", {
					schemaInstance: schemaInstance
				});
				designConfigManager.applyDesignerConfig({
					designConfig: config.settings,
					callback: function(diff) {
						var converter = Ext.create("Terrasoft.MobileDesignerMetadataToManifestConverter");
						converter.applyMetadataToManifest({
							manifest: this.manifest,
							entitySchemaName: entitySchemaName,
							settingsSchemaName: schemaInstance.name,
							settingsType: config.settingsType,
							metadata: diff,
							designerConfig: config.settings
						});
						Ext.callback(config.callback, config.scope);
					},
					scope: this
				});
			},

			/**
			 * Gets schema name by workplace.
			 * @param {String} schemaName Name of schema.
			 * @param {String} workplaceName Name of work place.
			 */
			getSchemaNameByWorkplace: function(schemaName, workplaceName) {
				return schemaName + workplaceName;
			},

			/**
			 * Returns true, if shema from provided work place.
			 * @param {String} schemaName Name of schema.
			 * @param {String} workplaceName Name of work place.
			 * @return {Boolean} True, if shema belongs to work place.
			 */
			isSchemaFromWorkplace: function(schemaName, workplaceName) {
				return schemaName.endsWith(workplaceName);
			},

			/**
			 * Gets manifest name by package name.
			 * @param {String} packageName Name of package.
			 */
			getManifestNameByPackage: function(packageName) {
				return "MobileApplicationManifest" + packageName;
			},

			/**
			 * Opens designer page.
			 * @param {String} workplaceName Name of work place.
			 */
			openDesignerModule: function(workplaceName) {
				var url = Ext.String.format("{0}/Nui/ViewModule.aspx?vm=MobileDesignerModule#{1}",
					Terrasoft.workspaceBaseUrl, workplaceName);
				window.open(url);
			}

		});

		return Terrasoft.MobileDesignerUtils;

	});


