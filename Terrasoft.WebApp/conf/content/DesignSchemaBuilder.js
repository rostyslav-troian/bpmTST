Terrasoft.configuration.Structures["DesignSchemaBuilder"] = {innerHierarchyStack: ["DesignSchemaBuilder"]};
define("DesignSchemaBuilder", ["SectionDesignDataModule", "SchemaBuilderV2", "ext-base", "terrasoft",
	"DesignViewGeneratorV2"],
	function(SectionDesignDataModule) {
		var schemaBuilder = Ext.define("Terrasoft.configuration.DesignSchemaBuilder", {
			extend: "Terrasoft.SchemaBuilder",
			alternateClassName: "Terrasoft.DesignSchemaBuilder",

			/**
			 * ###### ## ###### ###### #########
			 * @private
			 * @type {Object}
			 */
			sectionDesignDataModule: SectionDesignDataModule,

			createViewGenerator: function() {
				return Ext.create("Terrasoft.DesignViewGenerator");
			},

			/**
			 * ########## ###### ########## #####
			 * @private
			 * @param {String} schemaName ### #####
			 * @param {Function} callback ####### ######### ######
			 */
			getDesignSchemaData: function(schemaName, callback, scope) {
				var callConfig = {
					name: schemaName,
					callback: function(schema) {
						callback.call(scope, schema);
					},
					scope: this
				};
				this.sectionDesignDataModule.getClientUnitSchemaByName(callConfig);
			},

			/**
			 * @inheritdoc Terrasoft.SchemaBuilder#requireSchema
			 * @protected
			 * @overridden
			 */
			requireSchema: function(callback, config) {
				var isParent = config.isParent;
				if (isParent) {
					this.callParent(arguments);
				} else {
					var schemaName = config.schemaName;
					this.getDesignSchemaData(schemaName, function(schemaDesignData) {
						config.schemaResponse = schemaDesignData.schema;
						callback(config);
					}, this);
				}
			},

			/**
			 * @inheritdoc Terrasoft.SchemaBuilder#initSchemaStructure
			 * @protected
			 * @overridden
			 */
			initSchemaStructure: function(callback, config) {
				var isParent = config.isParent;
				if (isParent) {
					this.callParent(arguments);
				} else {
					var schemaName = config.schemaName;
					this.getDesignSchemaData(schemaName, function(schemaDesignData) {
						config.schemaStructure = schemaDesignData.structure;
						callback(config);
					}, this);
				}
			},

			/**
			 * @inheritdoc Terrasoft.SchemaBuilder#initSchemaResources
			 * @protected
			 * @overridden
			 */
			initSchemaResources: function(callback, config, scope) {
				var isParent = config.isParent;
				scope = scope || this;
				if (isParent) {
					this.callParent(arguments);
				} else {
					var schemaName = config.schemaName;
					this.getDesignSchemaData(schemaName, function(schemaDesignData) {
						var schemaFieldName = Ext.isEmpty(config.schemaResponse) ? "schema" : "schemaResponse";
						config[schemaFieldName].resources = schemaDesignData.resources;
						callback.call(scope, config);
					}, this);
				}
			},

			/**
			 * @inheritdoc Terrasoft.SchemaBuilder#initSchemaParent
			 * @protected
			 * @overridden
			 */
			initSchemaParent: function(callback, config) {
				var profileKey = config.profileKey;
				var hierarchy = config.hierarchyStack;
				var parentSchemaName = config.schemaStructure.parentSchemaName;
				if (parentSchemaName) {
					var parentHierarcyConfig = {
						schemaName: parentSchemaName,
						profileKey: profileKey,
						hierarchyStack: hierarchy,
						isParent: true
					};
					this.requireAllSchemaHierarchy(parentHierarcyConfig, function() {
						callback(config);
					}, this);
				} else {
					callback(config);
				}
			},

			/**
			 * ########## ##### ####### ######### ###### entity #####
			 * @overriden
			 * @param {String} entitySchemaName ### entity #####
			 * @param {Function} callback ####### ######### ######
			 */
			getEntitySchema: function(entitySchemaName, callback, scope) {
				if (entitySchemaName) {
					var callConfig = {
						name: entitySchemaName,
						callback: function(schema) {
							callback.call(scope, schema);
						},
						scope: this
					};
					this.sectionDesignDataModule.getEntitySchemaByName(callConfig);
				} else {
					callback.call(scope, null);
				}
			},

			/**
			 * @inheritdoc Terrasoft.SchemaBuilder#requireAllSchemaHierarchy
			 * @overridden
			 * ##### ######## ######## ####.
			 */
			requireAllSchemaHierarchy: function(config, callback, scope) {
				this.callParent([config, function(schemaHierarchy) {
					this.schemaHierarchy = schemaHierarchy;
					callback.call(scope, schemaHierarchy);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.SchemaBuilder#generateViewConfig
			 * @overridden
			 * ##### ########## ############# ###### ### ### ####, ### ####### ######### ### ## ###########.
			 */
			generateViewConfig: function(schema) {
				if (Ext.isEmpty(schema.viewConfig)) {
					this.callParent(arguments);
				}
			},

			/**
			 * ############## ############# # ###### ############# ##### ## ########## #####. ### #########
			 * ############ ############## ######## ####.
			 * @param {Object} schema #####, ### ####### ########## ######### #############.
			 * @param {String} selectedItem ### ########## ######## #####.
			 * @param {Function} callback ####### ######### ######
			 * @param {Object} scope ######## ###### callback-#######
			 */
			reBuild: function(schema, selectedItem, callback, scope) {
				var schemaName = schema.schemaName;
				var schemaHierarchy = this.schemaHierarchy;
				schemaHierarchy.pop();
				schemaHierarchy.push(schema);
				Terrasoft.chain(
					function(next) {
						this.getSchemaResources(schemaName, function(resources) {
							schema.resources = resources;
							next();
						});
					},
					function(next) {
						var entitySchemaName = schema.entitySchemaName;
						this.getEntitySchema(entitySchemaName, function(entitySchema) {
							schema.entitySchema = entitySchema;
							next();
						});
					},
					function(next) {
						var generatorConfig = {
							schema: schema,
							schemaName: schemaName,
							hierarchy: schemaHierarchy,
							useCache: false,
							viewGeneratorConfig: {
								selectedItemName: selectedItem
							}
						};
						if (Ext.isEmpty(generatorConfig.schema.resources)) {
							this.initSchemaResources(next, generatorConfig, this);
						} else {
							next(generatorConfig);
						}
					},
					function(next, config) {
						this.buildSchema(config, callback, scope);
					},
					this
				);
			}

		});

		return Ext.create(schemaBuilder);
	}
);


