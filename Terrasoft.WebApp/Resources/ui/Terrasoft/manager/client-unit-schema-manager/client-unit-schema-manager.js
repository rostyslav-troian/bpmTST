/**
 */
Ext.define("Terrasoft.manager.ClientUnitSchemaManager", {
	extend: "Terrasoft.manager.BaseSchemaManager",
	alternateClassName: "Terrasoft.ClientUnitSchemaManager",

	singleton: true,

	// region Properties: Protected

	/**
	 * Name of the manager item class.
	 * @protected
	 * @property {String} itemClassName
	 */
	itemClassName: "Terrasoft.ClientUnitSchemaManagerItem",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#managerName
	 * @protected
	 * @override
	 */
	managerName: "ClientUnitSchemaManager",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#outdatedEventName
	 * @override
	 */
	outdatedEventName: "ClientUnitSchema_Outdated",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#useNotification
	 * @override
	 */
	useNotification: true,

	// endregion

	// region Methods: Private

	/**
	 * @private
	 */
	_assignParentSchemaParameters: function(schema, callback, scope) {
		var parentSchemaUId = schema && schema.parentSchemaUId;
		if (Terrasoft.isEmpty(parentSchemaUId)) {
			callback.call(scope);
			return;
		}
		Terrasoft.ClientUnitSchemaManager.getSchemaInstance(parentSchemaUId, function(parentSchema) {
			parentSchema.parameters.each(function(item) {
				var parameter = item.clone();
				parameter.uId = item.uId;
				parameter.parentSchema = schema;
				schema.parameters.add(parameter.uId, parameter);
			}, this);
			callback.call(scope);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchemaManager#initItems
	 * @override
	 */
	initItems: function(items) {
		if (Terrasoft.Features.getIsEnabled("CRM-39598")) {
			this.initServiceItems(items);
			return;
		}
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchemaManager#queryItems
	 * @override
	 */
	queryItems: function(callback, scope) {
		if (Terrasoft.Features.getIsEnabled("CRM-39598")) {
			var request = new Terrasoft.BaseRequest({
				contractName: "ClientUnitSchemaManagerRequest"
			});
			return request.execute(callback, scope);
		}
		this.callParent(arguments);
	},

	// endregion

	// region Methods: Public

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchemaManager#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		Ext.apply(this.propertyColumnNames, {
			parentSchemaUId: "Parent.UId"
		});
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#getDesignSchemaRequestParameters.
	 * @protected
	 * @override
	 */
	getDesignSchemaRequestParameters: function() {
		return {
			contractName: "DesignClientUnitSchemaRequest",
			responseClassName: "Terrasoft.ClientUnitSchemaResponse"
		};
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#createSchemaInstance.
	 * @protected
	 * @override
	 */
	createSchemaInstance: function(config, callback, scope) {
		this.callParent([config,
			function(schema, managerItem, errorMessage) {
				this._assignParentSchemaParameters(schema, function() {
					callback.call(scope, schema, managerItem, errorMessage);
				}, this);
			},
			this]);
	},

	/**
	 * Finds client unit schema parameter by UId.
	 * @param {Object} config
	 * @param {String} config.schemaUId Schema UId.
	 * @param {String} config.parameterUId Parameter UId.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 * @return {Terrasoft.ClientUnitSchemaParameter}
	 */
	findParameterByUId: function(config, callback, scope) {
		this.getInstanceByUId(config.schemaUId, function(schema) {
			var parameter = schema.parameters.find(config.parameterUId);
			callback.call(scope, parameter);
		}, this);
	},

	/**
	 * Finds client unit schema parameter by name.
	 * @param {Object} config
	 * @param {String} config.schemaUId Schema UId.
	 * @param {String} config.parameterName Parameter UId.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 * @return {Terrasoft.ClientUnitSchemaParameter}
	 */
	findParameterByName: function(config, callback, scope) {
		this.getInstanceByUId(config.schemaUId, function(schema) {
			var parameter = schema.parameters.findByPath("name", config.parameterName);
			callback.call(scope, parameter);
		}, this);
	},

	/**
	 * Returns schema of current package by schema UId.
	 * @param {String} schemaUId Parent schema UId.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	getCurrentPackageSchemaByUId: function(schemaUId, callback, scope) {
		Terrasoft.PackageManager.getCurrentPackageUId(function(packageUId) {
			const config = {
				packageUId: packageUId,
				schemaUId: schemaUId
			};
			this.forceGetPackageSchema(config, callback, scope);
		}, this);
	},

	/**
	 * Prepares client unit schema for page designer.
	 * @param {Terrasoft.manager.ClientUnitSchema} schema Client unit schema instance.
	 * @param {String} entitySchemaName Entity schema name.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Context.
	 */
	prepareDesignPageSchema: function(schema, entitySchemaName, callback, scope) {
		if (this.contains(schema.uId)) {
			callback.call(scope, schema);
			return;
		}
		const schemaType = Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA;
		schema.setDefaultSchemaBody(schemaType, {"entitySchemaName": entitySchemaName});
		this.addSchema(schema);
		if (Terrasoft.Features.getIsEnabled("UseSectionWizardHierarchy")) {
			return schema.define(function() {
				return Ext.callback(callback, scope, [schema]);
			}, this);
		}
		const utilities = Terrasoft.SchemaDesignerUtilities;
		utilities.getCurrentPackageUId(function(currentPackageUId) {
			utilities.forceGetPackageHierarchy(currentPackageUId, function(hierarchy, order) {
				if (order.slice(-1)[0] === currentPackageUId) {
					return Ext.callback(callback, scope, [schema]);
				} else {
					schema.define(function() {
						return Ext.callback(callback, scope, [schema]);
					}, this);
				}
			}, this);
		}, this);
	},

	/**
	 * Prepares page schema for design.
	 * @param {Object} config
	 * @param {String} config.schemaUId Page schema UId.
	 * @param {String} config.packageUId Current package UId.
	 * @param {String} config.entityName Page schema entity schema name.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	designPageSchema: function(config, callback, scope) {
		let schema;
		Terrasoft.chain(
			function(next) {
				this.forceGetPackageSchema({
					schemaUId: config.schemaUId,
					packageUId: config.packageUId
				}, next, this);
			},
			function(next, instance) {
				schema = instance;
				this.prepareDesignPageSchema(schema, config.entityName || "", next, this);
			},
			function() {
				callback.call(scope, schema);
			}, this
		);
	},

	/**
	 * Returns extended item of schema in package.
	 * @param {String} schemaUId Schema UId.
	 * @param {String} packageUId Package UId.
	 * @return {Terrasoft.manager.ClientUnitSchemaManagerItem | null}
	 */
	findExtendedItem: function(schemaUId, packageUId) {
		return this.findByFn(function(item) {
			return item.extendParent && item.parentSchemaUId === schemaUId && item.packageUId === packageUId;
		}, this);
	}

	// endregion

});
