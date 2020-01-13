/**
 * Utility class for manage schemas and packages.
 */
Ext.define("Terrasoft.manager.SchemaDesignerUtilities", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.SchemaDesignerUtilities",
	singleton: true,

	/**
	 * Name of server object-contract.
	 * @type {String}
	 */
	contractName: "SchemaDesignerRequest",

	/**
	 * Class transport layer to retrieve data.
	 */
	dataProvider: Terrasoft.SchemaManagerDataProvider,

	/**
	 * Default timeout.
	 * @type {String}
	 */
	defaultTimeout: 60000000,

	/**
	 * Data value type info.
	 * @private
	 * @type {Array}
	 */
	dataValueTypeInfo: null,

	/**
	 * Cached package hierarchy.
	 * @private
	 * @type {Object}
	 */
	cachedPackageHierarchy: null,

	/**
	 * Cached available packages.
	 * @private
	 * @type {Object}
	 */
	_cachedAvailablePackages: null,

	/**
	 * Cached all packages hierarchy.
	 * @private
	 * @type {Object}
	 */
	_allPackageHierarchy: null,

	/**
	 * Cached package opological order.
	 * @private
	 * @type {Object}
	 */
	_packageTopologicalOrder: null,

	/**
	 * Sorts package UIds by topology.
	 * @param {Array} unorderedPackageHierarchy Unordered package hierarchy.
	 * @param {Array} packageTopologicalOrder Package topological order.
	 * @private
	 */
	orderByTopology: function(unorderedPackageHierarchy, packageTopologicalOrder) {
		Ext.Array.sort(unorderedPackageHierarchy, function(x, y) {
			return packageTopologicalOrder.indexOf(y) - packageTopologicalOrder.indexOf(x);
		});
	},

	/**
	 * Blocks the schemas.
	 * @param {String[]} uIds Schema UIds.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	lockPackageElements: function(uIds, callback, scope) {
		this.execute({
			lockPackageElements: uIds
		}, callback, scope);
	},

	/**
	 * @obsolete
	 */
	updateClienUnitSchemasFileContent: function(uIds, callback, scope) {
		var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
			"updateClienUnitSchemasFileContent", "updateClientUnitSchemasFileContent");
		console.warn(obsoleteMessage);
		this.updateClientUnitSchemasFileContent(uIds, callback, scope);
	},

	/**
	 * Updates client modules when working with file system.
	 * @param {String[]} uIds Schema UIds.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	updateClientUnitSchemasFileContent: function(uIds, callback, scope) {
		this.execute({
			updateClienUnitSchemasFileContent: uIds
		}, callback, scope);
	},

	/**
	 * Updates table structure for the transmitted schema UIds.
	 * @param {String[]} uIds Schema UIds.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	saveSchemaDBStructure: function(uIds, callback, scope) {
		this.execute({saveSchemaDBStructure: uIds}, callback, scope);
	},

	/**
	 * Compiles current workspace.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	buildWorkspace: function(callback, scope) {
		this.execute({
			buildWorkspace: true
		}, callback, scope);
	},

	/**
	 * HACK: Compiles current workspace with 'forceBuildWorkspace' parameter.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	forceBuildWorkspace: function(callback, scope) {
		this.execute({
			forceBuildWorkspace: true
		}, callback, scope);
	},

	/**
	 * Refreshes items in ClientUnitSchemaManager at server side.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	refreshClientUnitSchemaItems: function(callback, scope) {
		this.execute({
			refreshClientUnitSchemaItems: true
		}, callback, scope);
	},

	/**
	 * Builds changed items in configuration.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback context.
	 */
	buildChangedConfiguration: function(callback, scope) {
		this.execute({
			buildChangedConfiguration: true
		}, callback, scope);
	},

	/**
	 * Builds all items in configuration.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback context.
	 */
	buildAllConfiguration: function(callback, scope) {
		this.execute({
			buildAllConfiguration: true
		}, callback, scope);
	},

	/**
	 * Returns package hierarchy.
	 * @protected
	 * @param {String} packageUId Package UId.
	 * @param {Object} packagesHierarchy Package hierarchy.
	 * @param {Array} result Resulted package hierarchy.
	 */
	getPackageHierarchy: function(packageUId, packagesHierarchy, result) {
		result = result || [];
		var cachedPackages = this.getPackageHierarchyFromCache(packageUId);
		if (cachedPackages) {
			Terrasoft.appendIf(result, cachedPackages);
		} else {
			var innerResult = [packageUId];
			var packageInfo = packagesHierarchy[packageUId];
			Terrasoft.each(packageInfo, function(dependOnPackageUId) {
				this.getPackageHierarchy(dependOnPackageUId, packagesHierarchy, innerResult);
			}, this);
			Terrasoft.appendIf(result, innerResult);
			this.savePackageHierarchyInCache(Terrasoft.deepClone(innerResult));
		}
		return result;
	},

	/**
	 * Builds package hierarchy.
	 * @protected
	 * @throws {Terrasoft.NullOrEmptyException}
	 * Throws exception {@link Terrasoft.NullOrEmptyException} if package UId is empty.
	 * @throws {Terrasoft.InvalidOperationException}
	 * Throws exception {@link Terrasoft.InvalidOperationException} if response is not success.
	 * @param {String} packageUId Package UId.
	 * @param {Function} callback Callback function.
	 * @param {Array} callback.packageHierarchy Package hierarchy.
	 * @param {Array} callback.packageTopologicalOrder Package order.
	 * @param {Object} scope Callback function context.
	 */
	forceGetPackageHierarchy: function(packageUId, callback, scope) {
		if (this._allPackageHierarchy && this._packageTopologicalOrder) {
			const packageHierarchy = this.getPackageHierarchy(packageUId, this._allPackageHierarchy);
			this.orderByTopology(packageHierarchy, this._packageTopologicalOrder);
			return Ext.callback(callback, scope, [
				packageHierarchy,
				Ext.clone(this._packageTopologicalOrder)
			]);
		}
		const request = Ext.create("Terrasoft.BuildPackageHierarchyRequest");
		return request.execute(function(response) {
			if (response && response.success) {
				this._allPackageHierarchy = response.packageHierarchy;
				this._packageTopologicalOrder = response.packageTopologicalOrder;
				if (packageUId) {
					const packageHierarchy = this.getPackageHierarchy(packageUId, response.packageHierarchy);
					this.orderByTopology(packageHierarchy, response.packageTopologicalOrder);
					Ext.callback(callback, scope, [
						packageHierarchy,
						Ext.clone(this._packageTopologicalOrder)
					]);
				} else {
					throw new Terrasoft.NullOrEmptyException();
				}
			} else {
				throw new Terrasoft.InvalidOperationException({
					message: response.errorInfo.toString()
				});
			}
		}, this);
	},

	/**
	 * Returns package hierarchy from cache.
	 * @protected
	 * @param {String} packageUId Package UId.
	 * @return {Array} Package hierarchy.
	 */
	getPackageHierarchyFromCache: function(packageUId) {
		return this.cachedPackageHierarchy && this.cachedPackageHierarchy[packageUId];
	},

	/**
	 * Saves package hierarchy in cache.
	 * @protected
	 * @param {Array} packageHierarchy Package hierarchy.
	 * @param {Array} packageTopologicalOrder All packages hierarchy order
	 */
	savePackageHierarchyInCache: function(packageHierarchy) {
		if (Ext.isEmpty(this.cachedPackageHierarchy)) {
			this.cachedPackageHierarchy = {};
		}
		var clonedPackageHierarchy = Terrasoft.deepClone(packageHierarchy);
		this.cachedPackageHierarchy[clonedPackageHierarchy[0]] = clonedPackageHierarchy;
	},

	/**
	 * Builds package hierarchy. If hierarchy is contained in cache, returns from cache.
	 * @throws {Terrasoft.ArgumentNullOrEmptyException}
	 * Throws exception {@link Terrasoft.ArgumentNullOrEmptyException} if config is not object or string.
	 * @param {Object} config Configuration object.
	 * @param {String} config.packageUId Package UId.
	 * @param {Boolean} config.useCache Using cache.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 * @deprecated Use Object config instead.
	 */
	buildPackageHierarchy: function(config, callback, scope) {
		var packageUId = null;
		var useCache = false;
		if (Ext.isString(config)) {
			packageUId = config;
			const format = Terrasoft.Resources.ObsoleteMessages.ArgumentTypeObsoleteMessage;
			var obsoleteMessage = Ext.String.format(format, "String", "config", "Object");
			window.console.log(obsoleteMessage);
		} else if (Ext.isObject(config)) {
			packageUId = config.packageUId;
			useCache = config.useCache;
		} else {
			throw new Terrasoft.ArgumentNullOrEmptyException();
		}
		var cachedPackageHierarchy = useCache ? this.getPackageHierarchyFromCache(packageUId) : null;
		if (Ext.isEmpty(cachedPackageHierarchy)) {
			this.forceGetPackageHierarchy(packageUId, function(packageHierarchy) {
				this.savePackageHierarchyInCache(packageHierarchy);
				callback.call(scope, packageHierarchy);
			}, this);
		} else {
			callback.call(scope, cachedPackageHierarchy);
		}
	},

	/**
	 * Returns information about data types.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	getDataValueTypeInfo: function(callback, scope) {
		if (this.dataValueTypeInfo) {
			callback.call(scope, this.dataValueTypeInfo);
		} else {
			this.execute({
				getDataValueTypeInfo: true
			}, function(result) {
				var dataValueTypeInfo = result.dataValueTypeInfo;
				this.dataValueTypeInfo = dataValueTypeInfo;
				callback.call(scope, dataValueTypeInfo);
			}, this);
		}
	},

	/**
	 * Returns hierarchy for schema.
	 * @param {Terrasoft.ClientUnitSchema} schema Schema.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	getSchemaHierarchy: function(schema, callback, scope) {
		var packageHierarchy;
		Terrasoft.chain(
			function(next) {
				this.buildPackageHierarchy({
					packageUId: schema.packageUId,
					useCache: false
				}, next, this);
			},
			function(next, buildPackageHierarchyResult) {
				packageHierarchy = buildPackageHierarchyResult;
				next();
			},
			function() {
				var packageUId = packageHierarchy.pop();
				var schemaName = schema.name;
				var schemaManagerItems = [];
				while (packageUId) {
					var items = Terrasoft.ClientUnitSchemaManager.getItems();
					const schemasInPackage = items
						.filterByPath("name", schemaName)
						.filterByPath("packageUId", packageUId);
					var schemaInPackage = schemasInPackage.first();
					if (schemaInPackage) {
						schemaManagerItems.push(schemaInPackage);
					}
					packageUId = packageHierarchy.pop();
				}
				Terrasoft.ClientUnitSchemaManager.getInstances(schemaManagerItems, callback, scope);
			},
			this
		);
	},

	/**
	 * Returns the object of the hierarchical relationships of the schema.
	 * @param {Terrasoft.ClientUnitSchema} schema schema.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope The context for executing the callback function.
	 * @return {Object} The object of the hierarchical relationships of the schema.
	 * @param {Terrasoft.ClientUnitSchema} parent The parent schema.
	 * @param {Terrasoft.ClientUnitSchema} current The current schema.
	 */
	getSchemaRelatives: function(schema, callback, scope) {
		var schemaUId = schema.getPropertyValue("uId");
		var cacheStore = Terrasoft.ClientCoreCache;
		var schemaRelativesCache = cacheStore.getItem(schemaUId);
		if (schemaRelativesCache) {
			callback.call(scope, schemaRelativesCache);
		} else {
			schemaRelativesCache = {
				parent: null,
				current: schema
			};
			if (schema.extendParent) {
				this.getSchemaHierarchy(schema, function(schemaHierarchy) {
					var current = schemaHierarchy.pop();
					var parent = schemaHierarchy.pop();
					schemaRelativesCache.parent = parent;
					schemaRelativesCache.current = current;
					cacheStore.setItem(schemaUId, schemaRelativesCache);
					callback.call(scope, schemaRelativesCache);
				}, this);
			} else {
				var parentSchemaUId = schema.getPropertyValue("parentSchemaUId");
				if (parentSchemaUId) {
					Terrasoft.ClientUnitSchemaManager.getInstanceByUId(parentSchemaUId, function(parent) {
						schemaRelativesCache.parent = parent;
						cacheStore.setItem(schemaUId, schemaRelativesCache);
						callback.call(scope, schemaRelativesCache);
					}, this);
				} else {
					cacheStore.setItem(schemaUId, schemaRelativesCache);
					callback.call(scope, schemaRelativesCache);
				}
			}
		}
	},

	/**
	 * Returns the maximum allowed length of the schema name of the object.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope The context for executing the callback function.
	 * @return {Number} The maximum allowed length for the schema name of the object.
	 */
	getMaxEntitySchemaNameLength: function(callback, scope) {
		this.execute({
			getMaxEntitySchemaNameLength: true
		}, function(response) {
			if (response && response.success) {
				callback.call(scope, response.maxEntitySchemaNameLength);
			}
		}, this);
	},

	/**
	 * Returns the hierarchy of the schema along with the package IDs.
	 * @param {String} schemaName The name of the schema.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope The context for executing the callback function.
	 * @return {Number} The maximum allowed length for the schema name of the object.
	 */
	getSchemaPackageHierarchy: function(schemaName, callback, scope) {
		this.execute({
			getSchemaHierarchy: schemaName
		}, function(response) {
			if (response && response.success) {
				callback.call(scope, response.schemaHierarchy);
			}
		}, this);
	},

	/**
	 * Returns avaliable packages.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope The context for executing the callback function.
	 */
	getAvailablePackages: function(callback, scope) {
		if (this._cachedAvailablePackages) {
			callback.call(scope, Terrasoft.deepClone(this._cachedAvailablePackages));
		} else {
			var request = Ext.create("Terrasoft.GetAvailablePackagesRequest");
			request.execute(function(response) {
				if (response && response.success) {
					this._cachedAvailablePackages = response.availablePackages;
					callback.call(scope, Terrasoft.deepClone(this._cachedAvailablePackages));
				} else {
					throw new Terrasoft.InvalidOperationException({
						message: response.errorInfo.toString()
					});
				}
			}, this);
		}
	},

	/**
	 * Updates the data binding in the package.
	 * @param {Object} config The object for setting up the function call.
	 * @param {String} config.entitySchemaName The name of the schema of the object.
	 * @param {Array} config.recordList List of record identifiers.
	 * @param {String} config.packageUId Package ID.
	 * @param {String} config.packageSchemaDataName The name of the data binding in the package.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope The context for executing the callback function.
	 */
	updatePackageSchemaData: function(config, callback, scope) {
		var updatePackageSchemaDataRequest = Ext.create("Terrasoft.UpdatePackageSchemaDataRequest", config);
		updatePackageSchemaDataRequest.execute(callback, scope);
	},

	/**
	 * Returns the value of the system configuration with the CurrentPackageId code.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope The context for executing the callback function.
	 * @return {String} The value of the system configuration with the code CurrentPackageId.
	 */
	getCurrentPackageUId: function(callback, scope) {
		this.execute({
			getCurrentPackageUId: true
		}, function(response) {
			if (response && response.success) {
				callback.call(scope, response.currentPackageUId);
			} else {
				throw new Terrasoft.InvalidOperationException({
					message: response.errorInfo.toString()
				});
			}
		}, this);
	},

	/**
	 * Returns schemas with foreign lock.
	 * @param {String} packageUId Package UId.
	 * @param {Array} schemas Schema names.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function scope.
	 */
	getSchemasWithForeignLock: function(packageUId, schemas, callback, scope) {
		if (schemas && schemas.length > 0) {
			var request = Ext.create("Terrasoft.ParametrizedRequest", {
				contractName: "GetSchemasWithForeignLockRequest",
				config: {
					packageUId: packageUId,
					schemas: schemas
				}
			});
			request.execute(function(response) {
				if (response && response.success) {
					callback.call(scope, response.lockedSchemas);
				} else {
					throw new Terrasoft.InvalidOperationException({
						message: response && response.errorInfo && response.errorInfo.toString()
					});
				}
			}, this);
		} else {
			callback.call(scope);
		}
	},

	/**
	 * Query to the server with the necessary actions.
	 * @protected
	 * @param {Object} config Configures the actions to be performed on the server.
	 * @param {Function} callback A function that will be called when a response from the server is received.
	 * @param {Object} scope The context in which the callback function will be called.
	 */
	execute: function(config, callback, scope) {
		var query = Ext.apply({}, config, {
			contractName: this.contractName,
			requestTimeout: this.defaultTimeout,
			responseClassName: "Terrasoft.BaseResponse"
		});
		this.dataProvider.execute(query, callback, scope);
	},

	/**
	 * Returns a hierarchical resource object using the resourceItemName dictionary: resourceValue
	 * @param {Object} resources A resource dictionary. Where the property name is the resource
	 * path separated by a period, and the value property is the resource itself.
	 * @private
	 * @return {Object}
	 */
	getSchemaResources: function(resources) {
		var schemaResources = {};
		Terrasoft.each(resources, function(resourceItem, resourceItemName) {
			var resourcePath = resourceItemName.split(".");
			this.setSchemaResource(schemaResources, resourcePath, resourceItem);
		}, this);
		return schemaResources;
	},

	/**
	 * Adds a resource to the hierarchical resource object.
	 * @param {Object} resourceObject Hierarchical resource object
	 * @param {String []} resourcePath An array of the resource path.
	 * @param {Object} resourceItem The value of the resource.
	 * @private
	 */
	setSchemaResource: function(resourceObject, resourcePath, resourceItem) {
		var resourceName = resourcePath.shift();
		var resourceProperty = resourceObject[resourceName] = resourceObject[resourceName] || {};
		if (resourcePath.length > 0) {
			this.setSchemaResource(resourceProperty, resourcePath, resourceItem);
		} else {
			resourceObject[resourceName] = resourceItem;
		}
	},

	/**
	 * Creates instance of schema by metadata.
	 * @param {Object} data Data object with schema config.
	 * @param {String} data.metaData Metadata of schema instance.
	 * @param {String} data.schemaClassName Class name of schema instance.
	 * @param {Array} data.lazyProperties properties supporting lazy load.
	 * @param {Object} [data.resources] Resources of schema instance.
	 * @return {Terrasoft.BaseSchema}
	 */
	createInstanceByMetaData: function(data) {
		var metaData = Terrasoft.decode(data.metaData);
		var schemaConfig = metaData.metaData.schema;
		schemaConfig.metaData = data.metaData;
		var instance = Ext.create(data.schemaClassName, schemaConfig);
		var resources = data.resources;
		if (resources) {
			var schemaResources = this.getSchemaResources(resources);
			instance.loadLocalizableValues(schemaResources);
		}
		return instance;
	},

	/**
	 * Returns caption path from given meta path.
	 * @param {String} path Meta path.
	 * @param {Function} callback Callback.
	 * @param {Object} scope Callback scope.
	 */
	getColumnCaptionPathByMetaPath: function(path, callback, scope) {
		var requestConfig = {
			getColumnCaptionPathByMetaPath: path
		};
		this.execute(requestConfig, function(response) {
			callback.call(scope, response.columnCaptionPath, response);
		}, scope);
	},

	/**
	 * Returns meta path from given caption path.
	 * @param {String} path Caption path.
	 * @param {Function} callback Callback.
	 * @param {Object} scope Callback scope.
	 */
	getColumnMetaPathByCaptionPath: function(path, callback, scope) {
		var requestConfig = {
			getColumnMetaPathByCaptionPath: path
		};
		this.execute(requestConfig, function(response) {
			callback.call(scope, response.columnMetaPath, response);
		}, scope);
	},

	/**
	 * Returns entity schema column path by metaPath.
	 * @private
	 * @param {Object} config Request config.
	 * @param {String} config.entitySchemaUId Entity schema UId.
	 * @param {String} config.schemaColumnMetaPath Entity schema column metaPath.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function scope.
	 */
	getEntitySchemaColumnPathByMetaPath: function(config, callback, scope) {
		var request = {
			getSchemaColumnInformation: config
		};
		this.execute(request, function(response) {
			var schemaColumnInformation = response && response.getSchemaColumnInformationResponse;
			if (Ext.isEmpty(schemaColumnInformation)) {
				throw new Terrasoft.InvalidOperationException();
			}
			callback.call(scope, schemaColumnInformation);
		}, this);
	},

	/**
	 * Returns entity schema column information by path.
	 * @private
	 * @param {Object} config Request config.
	 * @param {String} config.entitySchemaUId Entity schema UId.
	 * @param {Object} [config.schemaColumnPath] Optional column caption path.
	 * @param {Object} [config.SchemaColumnMetaPath] Optional column meta path.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function scope.
	 */
	getEntitySchemaColumnInformationByPath: function(config, callback, scope) {
		var request = {
			getSchemaColumnInformation: config
		};
		this.execute(request, function(response) {
			var schemaColumnInformation = response && response.getSchemaColumnInformationResponse;
			if (Ext.isEmpty(schemaColumnInformation)) {
				throw new Terrasoft.InvalidOperationException();
			}
			callback.call(scope, {
				columnMetaPath: schemaColumnInformation.columnMetaPath,
				dataValueType: Terrasoft.ServerDataValueType[schemaColumnInformation.columnDataValueTypeUId]
			});
		}, this);
	},

	/**
	 * Clears cached package hierarchy.
	 */
	clearCachedPackageHierarchy: function() {
		this.cachedPackageHierarchy = null;
		this._packageTopologicalOrder = null;
		this._allPackageHierarchy = null;
	}
});
