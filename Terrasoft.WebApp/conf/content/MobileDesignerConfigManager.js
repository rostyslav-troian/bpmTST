Terrasoft.configuration.Structures["MobileDesignerConfigManager"] = {innerHierarchyStack: ["MobileDesignerConfigManager"]};
define("MobileDesignerConfigManager", ["EntityStructureHelperMixin"],
	function() {

		Ext.define("Terrasoft.configuration.MobileDesignerConfigManager", {
			alternateClassName: "Terrasoft.MobileDesignerConfigManager",

			mixins: {
				EntityStructureHelper: "Terrasoft.EntityStructureHelperMixin"
			},

			config: {

				schemaInstance: null

			},

			//region Methods: Private

			/**
			 * @private
			 */
			getParentDesignerConfig: function(diffs) {
				var parentConfig = [];
				for (var i = 0, ln = diffs.length; i < ln; i++) {
					parentConfig = Terrasoft.JsonApplier.applyDiff(parentConfig, diffs[i]);
				}
				return parentConfig;
			},

			/**
			 * @private
			 */
			getSchemaDiff: function(config) {
				var parentConfig = this.getParentDesignerConfig(config.diffs);
				var schemaSettings = JSON.parse(this.getSchemaInstance().body);
				var designerConfig = Terrasoft.JsonApplier.applyDiff(parentConfig, schemaSettings);
				designerConfig = (designerConfig && designerConfig.length === 0) ? null : designerConfig[0];
				var localizableStrings = config.localizableStrings;
				if (localizableStrings) {
					designerConfig.localizableStrings = localizableStrings;
				}
				return designerConfig;
			},

			/**
			 * @private
			 */
			formatMetadata: function(metadata) {
				return JSON.stringify(metadata, null, "\t");
			},

			/**
			 * @private
			 */
			processDesignerConfig: function(config) {
				var items = (!Ext.isArray(config)) ? [config] : config;
				Terrasoft.each(items, function(item) {
					Terrasoft.each(item, function(itemProperty) {
						if (Ext.isArray(itemProperty)) {
							this.processDesignerConfig(itemProperty);
						}
					}, this);
					item.operation = "insert";
				}, this);
				return config;
			},

			/**
			 * @private
			 */
			getSchemaDiffs: function(config) {
				var schemaInstance = this.getSchemaInstance();
				var schemaPackageUId = schemaInstance.packageUId;
				Terrasoft.SchemaDesignerUtilities.getSchemaHierarchy(schemaInstance, function(schemas) {
					var diffs = [];
					var localizableStrings = {};
					for (var i = 0, ln = schemas.length; i < ln; i++) {
						var schema = schemas[i];
						var schemaLocalizableStrings =
							Terrasoft.MobileDesignerSchemaManager.getSchemaLocalizableStrings(schema);
						localizableStrings = Ext.merge(localizableStrings, schemaLocalizableStrings);
						if (!schema || schema.packageUId === schemaPackageUId) {
							continue;
						}
						var diff = JSON.parse(schema.body);
						if (diff) {
							diffs.push(diff);
						}
					}
					Ext.callback(config.callback, config.scope, [diffs, localizableStrings]);
				}, this);
			},

			//#endregion

			//region Methods: Public

			constructor: function(config) {
				this.initConfig(config);
			},

			/**
			 * ###### ########## ####### ######## ## ###### ####### ########, ###### ## ###### #######.
			 * @param {Object} config ################ ###### # ########### ###### ######:
			 * @param {Object} config.schemaInstance ######### #####.
			 * @param {Function} config.callback ####### ######### ######.
			 * @param {Object} config.scope ######## ####### ######### ######.
			 */
			buildDesignerConfig: function(config) {
				this.getSchemaDiffs({
					callback: function(diffs, localizableStrings) {
						var schemaDiff = this.getSchemaDiff({
							diffs: diffs,
							localizableStrings: localizableStrings
						});
						Ext.callback(config.callback, config.scope, [schemaDiff]);
					},
					scope: this
				});
			},

			applyDesignerConfig: function(config) {
				var schemaInstance = this.getSchemaInstance();
				var designerConfig = this.processDesignerConfig(config.designConfig);
				this.getSchemaDiffs({
					callback: function(diffs) {
						var parentConfig = this.getParentDesignerConfig(diffs);
						designerConfig.name = "settings";
						var diff = Terrasoft.JsonDiffer.getJsonDiff(parentConfig, designerConfig);
						var body = this.formatMetadata(diff);
						schemaInstance.setPropertyValue("body", body);
						var localizableStrings = config.designConfig.localizableStrings;
						for (var name in localizableStrings) {
							if (localizableStrings.hasOwnProperty(name)) {
								var value = localizableStrings[name];
								Terrasoft.MobileDesignerSchemaManager.addLocalizableString(schemaInstance, name, value);
							}
						}
						Ext.callback(config.callback, config.scope, [diff]);
					},
					scope: this
				});
			}

			//#endregion

		});

		return Terrasoft.MobileDesignerConfigManager;
	}
);


