Terrasoft.configuration.Structures["SchemaBuilderV2"] = {innerHierarchyStack: ["SchemaBuilderV2"]};
define("SchemaBuilderV2", ["performancecountermanager", "ViewModelGeneratorV2", "ViewGeneratorV2",
	"ext-base", "terrasoft", "sandbox", "ProfileUtilities", "ViewConfigBuilderMixin", "AdditionalDiffUtilities"],
		function() {

	/**
	 * Schema builder.
	 */
	Ext.define("Terrasoft.configuration.SchemaBuilder", {
		extend: "Terrasoft.core.BaseObject",
		alternateClassName: "Terrasoft.SchemaBuilder",

		mixins: {
			ViewConfigBuilderMixin: "Terrasoft.ViewConfigBuilderMixin",
			AdditionalDiffUtilities: "Terrasoft.AdditionalDiffUtilities"
		},

		/**
		 * View generator class name.
		 * @protected
		 * @type {String}
		 */
		viewGeneratorClassName: "Terrasoft.ViewGenerator",

		/**
		 * ViewModel generator class name.
		 * @protected
		 * @type {String}
		 */
		viewModelGeneratorClassName: "Terrasoft.ViewModelGenerator",

		/**
		 * Indicates for parallel building.
		 * @protected
		 * @type {Boolean}
		 */
		useParallelSchemaBuilding: Terrasoft.useParallelSchemaBuilding,

		/**
		 * Profile key prefix.
		 * @private
		 * @type {String}
		 */
		profilePrefix: "profile!",

		/**
		 * Structure schema module suffix.
		 * @private
		 * @type {String}
		 */
		structureSuffix: "Structure",

		/**
		 * Resource schema module suffix.
		 * @private
		 * @type {String}
		 */
		resourcesSuffix: "Resources",

		/**
		 * Instance {Terrasoft.ViewModelGenerator} for generate view model.
		 * @private
		 * @type {Terrasoft.ViewModelGenerator}
		 */
		viewModelGenerator: null,

		/**
		 * Instance {Terrasoft.ViewGenerator} for generate view.
		 * @private
		 * @type {Terrasoft.ViewGenerator}
		 */
		viewGenerator: null,

		/**
		 * Generates the configuration diagram.
		 * @param {Object} schema The scheme, which generated the idea.
		 * @param {String[]} hierarchy The hierarchy of schemas.
		 * @param {Object[]} customDiff Package difference. Is an array of modification operations to the parent schema.
		 */
		generateViewConfig: function(schema, hierarchy, customDiff) {
			const viewConfigBuilderMixin = this.mixins.ViewConfigBuilderMixin;
			viewConfigBuilderMixin.addViewConfigs(hierarchy);
			schema.viewConfig = hierarchy[hierarchy.length - 1].viewConfig;
			this.applyCustomDiff(schema, customDiff);
			const propertyNames = viewConfigBuilderMixin.collectPropertyNames(hierarchy);
			viewConfigBuilderMixin.removeDuplicates(schema.viewConfig, propertyNames);
		},

		/**
		 * Applies the package differences on the view of the parent schema.
		 * @protected
		 * @param {Object[]} parentView Configuration parent view of the scheme.
		 * @param {Object[]} diff Package difference. Is an array of modification operations to the parent schema.
		 * @return {Object[]} Returns a structure with the applied package difference.
		 */
		applyViewDiff: function(parentView, diff) {
			return Terrasoft.JsonApplier.applyDiff(parentView, diff);
		},

		/**
		 * Applies the package differences that is configured in the element of BP, on the view of the parent schema.
		 * @param {Object} schema Schema.
		 * @param {Object[]} customDiff Package difference. Is an array of modification operations to the parent schema.
		 */
		applyCustomDiff: function(schema, customDiff) {
			if (!customDiff) {
				return;
			}
			schema.viewConfig = Terrasoft.JsonApplier.applyDiff(schema.viewConfig, customDiff);
		},

		/**
		 * Returns through a callback scheme.
		 * @static
		 * @param {String} schemaName The name of the schema.
		 * @param {Function} callback
		 * @param {Object} scope
		 */
		getSchema: function(schemaName, callback, scope) {
			Terrasoft.require([schemaName], callback, scope);
		},

		/**
		 * Returns via the callback function structure scheme.
		 * @static
		 * @param {String} schemaName The name of the schema.
		 * @param {Function} callback
		 * @param {Object} scope
		 */
		getSchemaStructure: function(schemaName, callback, scope) {
			Terrasoft.require([schemaName + this.structureSuffix], callback, scope);
		},

		/**
		 * Returns via the callback resources of the scheme.
		 * @static
		 * @param {String} schemaName The name of the schema.
		 * @param {Function} callback
		 * @param {Object} scope
		 */
		getSchemaResources: function(schemaName, callback, scope) {
			Terrasoft.require([schemaName + this.resourcesSuffix], callback, scope);
		},

		/**
		 * Returns via the callback function entity scheme.
		 * @static
		 * @param {String} entitySchemaName The name of the entity schema.
		 * @param {Function} callback
		 * @param {Object} scope
		 */
		getEntitySchema: function(entitySchemaName, callback, scope) {
			Terrasoft.require([entitySchemaName], callback, scope);
		},

		/**
		 * @member Terrasoft
		 * @method getProfile
		 * Returns profile through the callback function.
		 * @deprecated 7.8 Use {@link Terrasoft.ProfileUtilities#getProfile} instead.
		 */
		getProfile: function(profileKey, callback, scope) {
			var obsoleteMessage = Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage;
			this.log(Ext.String.format(obsoleteMessage, "getProfile", "ProfileUtilities.getProfile"));
			Terrasoft.require([this.profilePrefix + profileKey], callback, scope);
		},

		/**
		 * Initialise scheme in the chain of preparation of a scheme hierarchy.
		 * @protected
		 * @param {Function} callback
		 * @param {Object} config The configuration of the chain.
		 * @param {String} config.schemaName The name of the scheme.
		 * @param {Object} config.schemaResponse Scheme of the page.
		 * @param {Object} config.hierarchyStack The inheritance hierarchy of the schemas.
		 */
		requireSchema: function(callback, config) {
			var schemaName = config.schemaName;
			if (config.schemaResponse) {
				callback(config);
				return;
			}
			this.getSchema(schemaName, function(schemaResponse) {
				config.schemaResponse = Ext.merge({}, schemaResponse);
				callback(config);
			}, this);
		},

		/**
		 * Initialise additional parameters in the chain of preparation of a scheme hierarchy.
		 * @protected
		 * @param {Function} callback
		 * @param {Object} config The configuration of the chain.
		 * @param {String} config.schemaName The name of the scheme.
		 * @param {Object} config.schemaResponse Scheme of the page.
		 * @param {Object} config.hierarchyStackThe inheritance hierarchy of the schemas.
		 * @param {Object} config.customAttributes Additional schema options.
		 * @param {String} config.entitySchemaName The name of the schema entity.
		 * @param {String} config.profileKey The key profile data.
		 */
		initSchemaCustomAttributes: function(callback, config) {
			var schemaResponse = config.schemaResponse;
			var customAttributes = config.customAttributes;
			var entitySchemaName = config.entitySchemaName;
			if (customAttributes) {
				if (!schemaResponse.initialAttributes) {
					schemaResponse.initialAttributes = Ext.apply({}, schemaResponse.attributes);
				}
				schemaResponse.attributes = Ext.merge({}, customAttributes, schemaResponse.initialAttributes);
			}
			if (entitySchemaName) {
				schemaResponse.entitySchemaName = entitySchemaName;
			}
			if (schemaResponse && schemaResponse.hasOwnProperty("profileKey")) {
				config.profileKey = schemaResponse.profileKey;
			}
			callback(config);
		},

		/**
		 * Initialise scheme resources in the chain of preparation of a scheme hierarchy.
		 * @protected
		 * @param {Function} callback
		 * @param {Object} config The configuration of the chain.
		 * @param {String} config.schemaName The name of the scheme.
		 * @param {Object} config.schemaResponse Scheme of the page.
		 * @param {Object} config.hierarchyStack The inheritance hierarchy of the schemas.
		 * @param {Object} config.customAttributes Additional schema options.
		 * @param {String} config.entitySchemaName The name of the schema entity.
		 */
		initSchemaResources: function(callback, config) {
			var schemaName = config.schemaName;
			this.getSchemaResources(schemaName, function(resources) {
				config.schemaResponse.resources = resources;
				callback(config);
			}, this);
		},

		/**
		 * Gets last child in hierarchy.
		 * @protected
		 * @param {Array} hierarchy Schema inheritance hierarchy.
		 * @param {Array} hierarchyStack Schema inheritance hierarchy excluding design time hierarchy.
		 * @return {Object} Last child in hierarchy.
		 */
		getLastChildInHierarchy: function(hierarchy, hierarchyStack) {
			return hierarchy[hierarchyStack.length - 1];
		},

		/**
		 * Initialise entity schema schema page in the chain of preparation of a scheme hierarchy.
		 * @protected
		 * @param {Function} callback
		 * @param {Object} config The configuration of the chain.
		 * @param {String} config.schemaName The name of the scheme.
		 * @param {Object} config.schemaResponse Scheme of the page.
		 * @param {Object} config.hierarchyStack The inheritance hierarchy of the schemas.
		 * @param {Object} config.customAttributes Additional schema options.
		 * @param {String} config.entitySchemaName The name of the schema entity.
		 */
		initSchemaEntitySchema: function(callback, config) {
			var entitySchemaName = config.schemaResponse.entitySchemaName;
			//TODO CRM-35171
			if (!entitySchemaName) {
				callback(config);
				return;
			}
			this.getEntitySchema(entitySchemaName, function(entitySchema) {
				config.schemaResponse.entitySchema = entitySchema;
				callback(config);
			}, this);
		},

		/**
		 * Initializes data models.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} config Configuration object.
		 */
		initDataModels: function(callback, config) {
			var modelsConfig = config.schemaResponse.dataModels;
			var initChain = [];
			Terrasoft.each(modelsConfig, function(modelConfig) {
				var entitySchemaName = modelConfig.entitySchemaName;
				if (entitySchemaName) {
					initChain.push(function(next) {
						this.getEntitySchema(entitySchemaName, next, this);
					});
				}
			}, this);
			initChain.push(function() {
				callback(config);
			});
			Terrasoft.chain.apply(this, initChain);
		},

		/**
		 * Initializes profile of schema into the chain of prepare hierarchy of schemas
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} config Configuration of the chain.
		 * @param {String} config.schemaName Schema name.
		 * @param {Object} config.schemaResponse Schema of the page.
		 * @param {Object} config.hierarchyStack Hierarchy stack.
		 * @param {Object} config.customAttributes Additional parameters.
		 * @param {String} config.entitySchemaName Entity schema name.
		 */
		initSchemaProfile: function(callback, config) {
			if (!config.profileKey) {
				callback(config);
				return;
			}
			Terrasoft.ProfileUtilities.getProfile(config, function(profile) {
				config.schemaResponse.profile = profile;
				callback(config);
			}, this);
		},

		/**
		 * Initialise the structure of the schema in the chain of preparation of a scheme hierarchy.
		 * @protected
		 * @param {Function} callback
		 * @param {Object} config The configuration of the chain.
		 * @param {String} config.schemaName The name of the scheme.
		 * @param {Object} config.schemaResponse Scheme of the page.
		 * @param {Object} config.hierarchyStack The inheritance hierarchy of the schemas.
		 * @param {Object} config.customAttributes Additional schema options.
		 * @param {String} config.entitySchemaName The name of the schema entity.
		 * @param {String} config.schemaStructure The structure of the schema.
		 */
		initSchemaStructure: function(callback, config) {
			var schemaName = config.schemaName;
			this.getSchemaStructure(schemaName, function(structure) {
				config.schemaStructure = structure;
				callback(config);
			}, this);
		},

		/**
		 * The scheme complements the data from the schema structure in the chain of preparation of a scheme hierarchy.
		 * @protected
		 * @param {Function} callback
		 * @param {Object} config The configuration of the chain.
		 * @param {String} config.schemaName The name of the scheme.
		 * @param {Object} config.schemaResponse Scheme of the page.
		 * @param {Object} config.hierarchyStack The inheritance hierarchy of the schemas.
		 * @param {Object} config.customAttributes Additional schema options.
		 * @param {String} config.entitySchemaName The name of the schema entity.
		 * @param {String} config.schemaStructure The structure of the schema.
		 */
		extendSchemaWithStructure: function(callback, config) {
			var structure = config.schemaStructure;
			Ext.apply(config.schemaResponse, {
				extendParent: structure.extendParent,
				parentSchemaUId: structure.parentSchemaUId,
				schemaName: structure.schemaName,
				schemaCaption: structure.schemaCaption,
				schemaUId: structure.schemaUId,
				type: structure.type
			});
			callback(config);
		},

		/**
		 * Adds a schema into a hierarchy of schemes in the chain of preparation of a scheme hierarchy.
		 * @protected
		 * @param {Function} callback
		 * @param {Object} config The configuration of the chain.
		 * @param {String} config.schemaName The name of the scheme.
		 * @param {Object} config.schemaResponse Scheme of the page.
		 * @param {Object} config.hierarchyStack The inheritance hierarchy of the schemas.
		 * @param {Object} config.customAttributes Additional schema options.
		 * @param {String} config.entitySchemaName The name of the schema entity.
		 * @param {String} config.schemaStructure The structure of the schema.
		 */
		addSchemaToHierarchy: function(callback, config) {
			config.hierarchyStack = config.hierarchyStack || [];
			config.hierarchyStack.unshift(config.schemaResponse);
			callback(config);
		},

		/**
		 * Initialise parents scheme in the chain of preparation of a scheme hierarchy.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} config The configuration of the chain.
		 * @param {String} config.schemaName The name of the scheme.
		 * @param {Object} config.schemaResponse Scheme of the page.
		 * @param {String} config.profileKey The key profile data.
		 * @param {Object} config.hierarchyStack The inheritance hierarchy of the schemas.
		 * @param {Object} config.customAttributes Additional schema options.
		 * @param {String} config.entitySchemaName The name of the schema entity.
		 * @param {String} config.schemaStructure The structure of the schema.
		 */
		initSchemaParent: function(callback, config) {
			var hierarchy = config.hierarchyStack;
			var parentSchemaName = config.schemaStructure.parentSchemaName;
			if (parentSchemaName) {
				var parentHierarcyConfig = {
					schemaName: parentSchemaName,
					hierarchyStack: hierarchy
				};
				this.requireAllSchemaHierarchy(parentHierarcyConfig, function() {
					callback(config);
				}, this);
			} else {
				callback(config);
			}
		},

		/**
		 * Gets all data for schema.
		 * @protected
		 * @param {Object} initialConfig Schema build configuration.
		 * @param {String} initialConfig.schemaName The name of the scheme.
		 * @param {Object} initialConfig.schemaResponse Scheme of the page.
		 * @param {String} initialConfig.profileKey The key profile data.
		 * @param {Object} initialConfig.hierarchyStack The inheritance hierarchy of the schemas.
		 * @param {Object} initialConfig.customAttributes Additional schema options.
		 * @param {String} initialConfig.entitySchemaName The name of the schema entity.
		 * @param {String} initialConfig.schemaStructure The structure of the schema.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback execution context.
		 */
		requireAllSchema: function(initialConfig, callback, scope) {
			Terrasoft.chain(
				function(next) {
					next(initialConfig);
				},
				this.requireSchema,
				this.initSchemaCustomAttributes,
				function(next, config) {
					Terrasoft.eachAsyncAll([
						this.initSchemaResources,
						this.initSchemaEntitySchema,
						this.initDataModels,
						this.initSchemaProfile,
						this.initSchemaStructure
					], function() {
						next(config);
					}, this, [config]);
				},
				this.extendSchemaWithStructure,
				function(next, config) {
					callback.call(scope, config);
				},
				this
			);
		},

		/**
		 * Gets all the derived schemes.
		 * @protected
		 * @param {Object} initialConfig Schema build configuration.
		 * @param {String} initialConfig.schemaName The name of the scheme.
		 * @param {Object} initialConfig.hierarchyStack The inheritance hierarchy of the schemas.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback execution context.
		 */
		requireAllSchemaHierarchy: function(initialConfig, callback, scope) {
			Terrasoft.chain(
				function(next) {
					this.requireAllSchema(initialConfig, next, this);
				},
				this.addSchemaToHierarchy,
				this.initSchemaParent,
				function(next, config) {
					callback.call(scope, config.hierarchyStack);
				},
				this
			);
		},

		/**
		 * Generates the schema view.
		 * @protected
		 * @param {Object} config
		 * @param {Function} callback
		 * @param {Object} scope
		 */
		generateView: function(config, callback, scope) {
			this.viewGenerator.generate(config, function(viewConfig) {
				callback.call(scope, viewConfig);
			});
		},

		/**
		 * Generates a model representation of the scheme.
		 * @protected
		 * @param {Object} config
		 * @param {Function} callback
		 * @param {Object} scope
		 */
		generateViewModel: function(config, callback, scope) {
			this.viewModelGenerator.generate(config, function(viewModelClass) {
				callback.call(scope, viewModelClass);
			});
		},

		/**
		 * Creates an instance of the class Terrasoft.ViewGenerator.
		 * @return {Terrasoft.ViewGenerator}
		 */
		createViewGenerator: function() {
			return Ext.create(this.viewGeneratorClassName);
		},

		/**
		 * Creates an instance of the class Terrasoft.ViewModelGenerator.
		 * @return {Terrasoft.ViewModelGenerator}
		 */
		createViewModelGenerator: function() {
			return Ext.create(this.viewModelGeneratorClassName);
		},

		/**
		 * Generates the schema structure. In the case where the configuration data requested is in the cache,
		 * return the cached result. Use a cache page level.
		 * @param {Object} config
		 * @param {Function} callback
		 * @param {Object} scope
		 */
		build: function(config, callback, scope) {
			var performanceManagerLabel;
			if (scope && scope.hasOwnProperty("sandbox")) {
				performanceManagerLabel = scope.sandbox.id;
			} else if (this && this.hasOwnProperty("sandbox")) {
				performanceManagerLabel = this.sandbox.id;
			} else {
				performanceManagerLabel = "";
			}
			performanceManager.start(performanceManagerLabel + "_Build");
			var generatorConfig = Terrasoft.deepClone(config);
			generatorConfig.performanceManagerLabel = performanceManagerLabel;
			performanceManager.start(performanceManagerLabel + "_Build_requireAllSchemaHierarchy");
			if (config.useCache !== false) {
				if (generatorConfig.entitySchemaName) {
					if (!this.tryReturnCache(generatorConfig, callback, scope)) {
						this.buildSchemaHierarchy(generatorConfig, callback, scope);
					}
				} else {
					this.getSchema(config.schemaName, function(schemaResponse) {
						generatorConfig.entitySchemaName = schemaResponse.entitySchemaName || config.entitySchemaName;
						generatorConfig.schemaResponse = schemaResponse;
						if (!this.tryReturnCache(generatorConfig, callback, scope)) {
							this.buildSchemaHierarchy(generatorConfig, callback, scope);
						}
					}, this);
				}
			} else {
				this.buildSchemaHierarchy(generatorConfig, callback, scope);
			}
		},

		/**
		 * Looking for saved data in the cache. If data is found, terminates the Schema Builder,
		 * calls the callback function with data found and returns true. If the data is not found, returns false.
		 * @param {Object} config
		 * @param {Function} callback
		 * @param {Object} scope
		 * @returns {Boolean} The search result data in the cache.
		 */
		tryReturnCache: function(config, callback, scope) {
			var result = false;
			var cacheItem = this.getCachedItem(config);
			if (cacheItem) {
				result = true;
				var performanceManagerLabel = config.performanceManagerLabel;
				performanceManager.stop(performanceManagerLabel + "_Build_requireAllSchemaHierarchy");
				performanceManager.start(performanceManagerLabel + "_Build_buildSchema");
				performanceManager.start(performanceManagerLabel + "_Build_buildSchema_generateViewModel");
				performanceManager.stop(performanceManagerLabel + "_Build_buildSchema_generateViewModel");
				performanceManager.start(performanceManagerLabel + "_Build_buildSchema_generateView");
				performanceManager.stop(performanceManagerLabel + "_Build_buildSchema_generateView");
				performanceManager.stop(performanceManagerLabel + "_Build_buildSchema");
				performanceManager.stop(performanceManagerLabel + "_Build");
				callback.call(scope, cacheItem.viewModelClass, cacheItem.view, cacheItem.schema);
			}
			return result;
		},

		/**
		 * Handler when schema hierarchy built.
		 * @protected
		 * @param {Object} hierarchy Schema hierarchy.
		 * @param {Object} config Schema build configuration.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback execution context.
		 */
		onSchemaHierarchyBuilt: function(hierarchy, config, callback, scope) {
			Ext.callback(callback, scope, [hierarchy, config]);
		},

		/**
		 * Prepares config when all schemas for building were required.
		 * @protected
		 * @param {Object} initialHierarchy Schema hierarchy.
		 * @param {Object} initialConfig Schema build configuration.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback execution context.
		 */
		afterRequireAllSchemaHierarchy: function(initialHierarchy, initialConfig, callback, scope) {
			this.onSchemaHierarchyBuilt(initialHierarchy, initialConfig, function(hierarchy, config) {
				var schema = hierarchy[hierarchy.length - 1];
				Ext.apply(config, {
					hierarchy: hierarchy,
					schema: schema
				});
				performanceManager.stop(config.performanceManagerLabel + "_Build_requireAllSchemaHierarchy");
				performanceManager.start(config.performanceManagerLabel + "_Build_buildSchema");
				this.buildSchema(config, callback, scope);
			}, this);
		},

		/**
		 * Executes the query of the entire chain of inheritance schema and starts the process of building a circuit
		 * (see {@link #build Schema}).
		 * @param {Object} config Schema build configuration.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback execution context.
		 */
		buildSchemaHierarchy: function(config, callback, scope) {
			var handler = function(hierarchy) {
				this.afterRequireAllSchemaHierarchy(hierarchy, config, callback, scope);
			};
			if (this.useParallelSchemaBuilding) {
				this.getHierarchyStackArray(config, function(hierarchyStackArray) {
					if (hierarchyStackArray) {
						this.parallelBuildSchemaHierarchy(hierarchyStackArray, config, handler, this);
					} else {
						this.requireAllSchemaHierarchy(config, handler, this);
					}
				}, this);
			} else {
				this.requireAllSchemaHierarchy(config, handler, this);
			}
		},

		/**
		 * Builds schema hierarchy in parallel.
		 * @protected
		 * @param {Array} hierarchyStackArray Hierarchy stack array.
		 * @param {Object} config Schema build configuration.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback execution context.
		 */
		parallelBuildSchemaHierarchy: function(hierarchyStackArray, config, callback, scope) {
			var schemaName = config.schemaName;
			Terrasoft.eachAsyncAll(hierarchyStackArray, function(moduleName, nextFn) {
				var requiredSchemaConfig = {
					schemaName: moduleName
				};
				if (schemaName === moduleName) {
					requiredSchemaConfig = config;
				}
				this.requireAllSchema(requiredSchemaConfig, nextFn, this);
			}, function(hierarchy) {
				Terrasoft.each(hierarchy, function(property, index) {
					hierarchy[index] = property.schemaResponse;
				}, this);
				config.hierarchyStack = hierarchy;
				Ext.callback(callback, scope, [hierarchy]);
			}, this, [config]);
		},

		/**
		 * Returns schema hierarchy stack array.
		 * @protected
		 * @param {Object} config Schema build configuration.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback execution context.
		 */
		getHierarchyStackArray: function(config, callback, scope) {
			var schemaName = config.schemaName;
			this.getSchema(schemaName, function() {
				var schemaStructure = Terrasoft.configuration.Structures[schemaName] || {};
				var innerHierarchyStack = schemaStructure.innerHierarchyStack;
				if (innerHierarchyStack) {
					var structureParent = schemaStructure.structureParent;
					if (!structureParent) {
						Ext.callback(callback, scope, [innerHierarchyStack]);
					} else {
						this.getHierarchyStackArray({
							schemaName: structureParent
						}, function(parentInnerHierarchyStack) {
							if (!Ext.isEmpty(parentInnerHierarchyStack)) {
								innerHierarchyStack = Ext.Array.union(parentInnerHierarchyStack, innerHierarchyStack);
								Ext.callback(callback, scope, [innerHierarchyStack]);
							} else {
								Ext.callback(callback, scope);
							}
						}, this);
					}
				} else {
					Ext.callback(callback, scope);
				}
			}, this);
		},

		/**
		 * According to a scheme config query returns the cache key.
		 * @param {Object} config Schema build configuration.
		 * @returns {String} Cache key.
		 */
		getCacheItemKey: function(config) {
			var keyPrefix = config.elementsPrefix
				? [config.elementsPrefix, config.schemaName].join("_")
				: config.schemaName;
			return [keyPrefix, config.entitySchemaName, config.profileKey].join("_");
		},

		/**
		 * Returns a cached version of the scheme, view and scheme view model. The cache is not stored
		 * View model class, instead of class name is stored. When receiving cached data, class manager checks
		 * For class. If the class is found, it is returned, otherwise the cache is cleared
		 * And returns a null result.
		 * @param {Object} config Schema build configuration.
		 * @return {Object} Cache object.
		 */
		getCachedItem: function(config) {
			var cache = this.getCache();
			if (!cache) {
				return null;
			}
			var cacheKey = this.getCacheItemKey(config);
			var cacheItem = cache.getItem(cacheKey);
			if (cacheItem) {
				var item = Terrasoft.deepClone(cacheItem);
				var viewModelClass = Ext.ClassManager.get(item.viewModelClassName);
				if (viewModelClass) {
					item.viewModelClass = viewModelClass;
					return item;
				}
				cache.removeItem(cacheKey);
			}
			return null;
		},

		/**
		 * Saves schema to cache, view and name of schema view model class.
		 * @param {Object} config Schema build configuration.
		 * @param {Object} item Cache item.
		 */
		addToCache: function(config, item) {
			var cache = this.getCache();
			if (cache) {
				var cacheKey = this.getCacheItemKey(config);
				cache.setItem(cacheKey, item);
			}
		},

		/**
		 * Returns page-level cache (MemoryCache).
		 * @returns {Terrasoft.MemoryStore}
		 */
		getCache: function() {
			return Terrasoft.ClientPageSessionCache;
		},

		/**
		 * Checks whether apply the additional tab diff with orders.
		 * @param {Object[]} hierarchy The hierarchy of schemas.
		 * @return {Boolean} Returns whether apply the additional tab diff with orders.
 		 */
		canGetAdditionalDiffWithTabOrderPosition: function(hierarchy) {
			if (!Terrasoft.Features.getIsEnabled("UseTabOrderProperty")) {
				return false;
			}
			const tabNames = [];
			const tabsRelatedDiff = [];
			hierarchy.forEach(function(schema) {
				if (schema.diff) {
					const currentSchemaFilteredDiff = [];
					schema.diff.forEach(function(diffItem) {
						if (diffItem.name === "Tabs") {
							currentSchemaFilteredDiff.push(diffItem);
						}
						if (diffItem.parentName === "Tabs") {
							if (!Terrasoft.contains(tabNames, diffItem.name)) {
								tabNames.push(diffItem.name);
							}
							currentSchemaFilteredDiff.push(diffItem);
						} else if (Terrasoft.contains(tabNames, diffItem.name)) {
							currentSchemaFilteredDiff.push(diffItem);
						}
					});
					if (!Terrasoft.isEmpty(currentSchemaFilteredDiff)) {
						tabsRelatedDiff.push(currentSchemaFilteredDiff);
					}
				}
			});
			const self = this;
			const viewConfig = tabsRelatedDiff.reduce(function(currentViewConfig, schemaDiff) {
				return self.applyViewDiff(currentViewConfig, schemaDiff);
			}, []);
			const tabs = viewConfig[0] && viewConfig[0].tabs;
			const result = !_.every(tabs, function(tab) {
				return _.isNumber(tab.order) && tab.order >= 0;
			});
			return result;
		},

		/**
		 * Applies additional difference package, configured in the schema module, to schema diff.
		 * @param {Array} hierarchy Schema inheritance hierarchy.
		 * @param {Object} config Scheme build configuration.
		 * @param {Array} config.hierarchyStack Schema inheritance hierarchy excluding design time hierarchy.
		 * @param {Array} config.additionalDiff Object of additional diffs.
		 */
		applyAdditionalDiff: function(hierarchy, config) {
			const lastChild = this.getLastChildInHierarchy(hierarchy, config.hierarchyStack);
			let additionalDiff = config.additionalDiff || [];
			if (this.canGetAdditionalDiffWithTabOrderPosition(hierarchy)) {
				const additionalDiffWithTabOrderPosition =
					this.mixins.AdditionalDiffUtilities.getAdditionalDiffWithTabOrderPosition(lastChild.diff);
				additionalDiff = additionalDiff.concat(additionalDiffWithTabOrderPosition);
			}
			if (!Terrasoft.isEmpty(additionalDiff)) {
				Terrasoft.each(lastChild.diff, function(item) {
					additionalDiff = Ext.Array.filter(additionalDiff, function(additionalItem) {
						return !(item.name === additionalItem.name && item.operation === additionalItem.operation);
					});
				}, this);
				lastChild.diff = lastChild.diff || [];
				lastChild.diff = lastChild.diff.concat(additionalDiff);
			}
		},

		/**
		 * Build scheme on scheme inheritance hierarchy.
		 * @param {Object} config Scheme build configuration.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		buildSchema: function(config, callback, scope) {
			var schema = config.schema;
			var hierarchy = config.hierarchy;
			this.viewModelGenerator = this.createViewModelGenerator();
			performanceManager.start(config.performanceManagerLabel + "_Build_buildSchema_generateViewModel");
			this.applyAdditionalDiff(hierarchy, config);
			this.generateViewConfig(config.schema, hierarchy, config.customDiff);
			this.generateViewModel(config, function(viewModelClass) {
				var viewGeneratorConfig = {
					schema: schema,
					viewModelClass: viewModelClass,
					elementsPrefix: config.elementsPrefix
				};
				if (config.viewGeneratorConfig) {
					Ext.apply(viewGeneratorConfig, config.viewGeneratorConfig);
				}
				this.viewGenerator = this.createViewGenerator();
				performanceManager.stop(config.performanceManagerLabel + "_Build_buildSchema_generateViewModel");
				performanceManager.start(config.performanceManagerLabel + "_Build_buildSchema_generateView");
				this.generateView(viewGeneratorConfig, function(viewConfig) {
					this.viewModelGenerator = null;
					this.viewGenerator = null;
					performanceManager.stop(config.performanceManagerLabel + "_Build_buildSchema_generateView");
					performanceManager.stop(config.performanceManagerLabel + "_Build_buildSchema");
					performanceManager.stop(config.performanceManagerLabel + "_Build");
					this.addToCache(config, {
						view: Terrasoft.deepClone(viewConfig),
						viewModelClassName: viewModelClass.$className
					});
					callback.call(scope, viewModelClass, viewConfig, schema);
				}, this);
			}, this);
		}

	});

	return Ext.create("Terrasoft.SchemaBuilder");
});


