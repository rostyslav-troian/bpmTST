/**
 */
Ext.define("Terrasoft.manager.BaseProcessSchemaManager", {
	extend: "Terrasoft.manager.BaseSchemaManager",
	alternateClassName: "Terrasoft.BaseProcessSchemaManager",

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#managerName
	 * @protected
	 * @override
	 */
	managerName: "BaseProcessSchemaManager",

	// endregion

	// region Methods: Private

	/**
	 * Sets new schema version name.
	 * @private
	 * @param {Terrasoft.ProcessSchema} schema Process schema.
	 * @param {Object} versionInfo Version info.
	 * @param {String} packageName Package name.
	 */
	setNewSchemaVersionName: function(schema, versionInfo, packageName) {
		packageName = packageName.replace(/\W/g, "");
		schema.name = versionInfo.parentSchemaName + packageName + schema.version;
		if (this.schemaNamePrefix && this.schemaNamePrefix.length > 0 &&
			!Ext.String.startsWith(versionInfo.parentSchemaName, this.schemaNamePrefix)) {
			schema.name = this.schemaNamePrefix + schema.name;
		}
	},

	_getActualVersionUId: function(schemaUId, callback, scope) {
		let schemaVersionUId = schemaUId;
		const item = this.items.find(schemaUId);
		if (!Ext.isEmpty(item) && item.status === Terrasoft.ModificationStatus.NEW) {
			const parentUId = item.getParentUId();
			if (!this.getIsSetParentSchemaUId(parentUId)) {
				Ext.callback(callback, scope, [{actualVersionSchemaUId: schemaUId}]);
				return;
			}
			schemaVersionUId = parentUId;
		}
		const request = Ext.create("Terrasoft.BaseSchemaManagerRequest", {
			serviceName: this.schemaManagerServiceName,
			methodName: "GetActualVersionUId",
			urlParameters: {
				schemaUId: schemaVersionUId
			}
		});
		request.execute(callback, scope);
	},

	// endregion

	// region Methods: Protected

	/**
	 * Determines whether the UId of the parent schema is set.
	 * @protected
	 * @param {String} parentSchemaUId UId of the parent schema.
	 * @return {Boolean} True, if the UId of the parent schema is set; otherwise - False.
	 */
	getIsSetParentSchemaUId: function(parentSchemaUId) {
		return parentSchemaUId && !Terrasoft.isEmptyGUID(parentSchemaUId) && parentSchemaUId !== this.defSchemaUId;
	},

	/**
	 * Returns a new schema version.
	 * @protected
	 * @param {Object} config Data is needed for new version schema.
	 * @param {Terrasoft.manager.BaseProcessSchema} config.sourceSchema Source schema instance.
	 * @return {Terrasoft.manager.BaseSchemaManagerItem}
	 */
	createNewSchemaVersion: function(config) {
		const sourceSchema = config.sourceSchema;
		const managerItem = this.copySchema(sourceSchema);
		const schema = managerItem.instance;
		const sourceParentUId = sourceSchema.parentSchemaUId;
		schema.parentSchemaUId = this.getIsSetParentSchemaUId(sourceParentUId) ? sourceParentUId : sourceSchema.uId;
		schema.setPropertyValue("isActiveVersion", false);
		schema.setPropertyValue("isDelivered", false);
		managerItem.parentUId = schema.parentSchemaUId;
		return managerItem;
	},

	/**
	 * Gets schema version information.
	 * @protected
	 * @param {Object} config Service call info.
	 * @param {String} config.parentSchemaUId UId of the parent schema.
	 * @param {String} config.packageUId UId of the package.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope Execution context.
	 */
	getSchemaVersionInfo: function(config, callback, scope) {
		const request = Ext.create("Terrasoft.BaseSchemaManagerRequest", {
			serviceName: this.schemaManagerServiceName,
			methodName: "GetSchemaVersionInfo",
			urlParameters: config
		});
		request.execute(callback, scope);
	},

	//endregion

	// region Methods: Public

	/**
	 * Creates a new schema version.
	 * @param {Object} config Data is needed for new version schema.
	 * @param {Terrasoft.manager.BaseProcessSchema} config.sourceSchema Source schema instance.
	 * @param {Boolean} config.canEditPackageSchema Indicates whether the current schema can be saved in specified package.
	 * @param {Object} config.sysPackage Package info.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope Execution context.
	 */
	getNewSchemaVersion: function(config, callback, scope) {
		if (!this.getCanUseProcessVersions()) {
			throw new Terrasoft.InvalidOperationException();
		}
		const managerItem = this.createNewSchemaVersion(config);
		const schema = managerItem.instance;
		let packageName = Terrasoft.PackageManager.CUSTOM_PACKAGE_NAME;
		const sysPackage = config.sysPackage;
		Terrasoft.chain(
			function(next) {
				if (sysPackage && config.canEditPackageSchema) {
					schema.packageUId = sysPackage.get("UId");
					packageName = sysPackage.get("Name");
					next();
				} else {
					Terrasoft.PackageManager.getCurrentPackageUId(function(packageUId) {
						schema.packageUId = packageUId;
						next();
					}, this);
				}
			},
			this.initializeSchemaNamePrefix.bind(this),
			function() {
				const versionInfoConfig = {
					parentSchemaUId: schema.parentSchemaUId,
					packageUId: schema.packageUId
				};
				this.getSchemaVersionInfo(versionInfoConfig, function(versionInfo, errorMessage) {
					if (errorMessage) {
						callback.call(scope, managerItem, errorMessage);
						return;
					}
					schema.version = versionInfo.maxVersionInPackage + 1;
					this.setNewSchemaVersionName(schema, versionInfo, packageName);
					callback.call(scope, managerItem);
				}, this);
			},
			this
		);
	},

	/**
	 * Sets schema version actual by UId.
	 * @param {String} schemaUId Schema identifier.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	setIsActualVersionByUId: function(schemaUId, callback, scope) {
		if (!this.getCanUseProcessVersions()) {
			Ext.callback(callback, scope, [{success: true}]);
			return;
		}
		const request = Ext.create("Terrasoft.BaseSchemaManagerRequest", {
			serviceName: this.schemaManagerServiceName,
			methodName: "SetIsActualVersion",
			urlParameters: {
				schemaUId: schemaUId
			}
		});
		request.execute(callback, scope);
	},

	/**
	 * Gets unique identifier of process schema's actual version.
	 * @param {String} schemaUId Schema identifier.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	getActualVersionUId: function(schemaUId, callback, scope) {
		if (Terrasoft.isEmpty(schemaUId)) {
			Ext.callback(callback, scope, [null]);
			return;
		}
		if (!this.getCanUseProcessVersions()) {
			Ext.callback(callback, scope, [{actualVersionSchemaUId: schemaUId}]);
			return;
		}
		this._getActualVersionUId(schemaUId, callback, scope);
	},

	/**
	 * Gets whether the provided schema is active version.
	 * @param {Terrasoft.BaseProcessSchema} schema Base process schema.
	 * @param callback {Function} Callback.
	 * @param scope {Object} Scope.
	 */
	getIsActualVersion: function(schema, callback, scope) {
		if (!schema || !schema.uId) {
			throw new Terrasoft.ArgumentNullOrEmptyException({
				argumentName: schema ? "schema.uId" : "schema"
			});
		}
		this.getActualVersionUId(schema.uId, function(actualVersionInfo) {
			const isActualVersion = schema.uId === actualVersionInfo.actualVersionSchemaUId;
			Ext.callback(callback, scope, [isActualVersion]);
		}, this);
	},

	/**
	 * Determines whether the functionality of the versioning schema is enabled.
	 * @return {Boolean} False.
	 */
	getCanUseProcessVersions: function() {
		return false;
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#createSchema
	 * @override
	 */
	createSchema: function() {
		var schema = this.callParent(arguments);
		schema.useSystemSecurityContext = Terrasoft.Features.getIsEnabled("DisableAdminRightsInScriptTask");
		return schema;
	}

	//endregion

});
