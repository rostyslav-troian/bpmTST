Terrasoft.configuration.Structures["PackageSchemaBuilder"] = {innerHierarchyStack: ["PackageSchemaBuilder"]};
define("PackageSchemaBuilder", [
	"SchemaBuilderV2"
], function() {
	/**
	 * @class Terrasoft.configuration.PackageSchemaBuilder
	 * Class, which generates the view and view model for the designer module of client schema.
	 */
	const schemaGenerator = Ext.define("Terrasoft.configuration.PackageSchemaBuilder", {
		extend: "Terrasoft.SchemaBuilder",
		alternateClassName: "Terrasoft.PackageSchemaBuilder",

		// region Methods: Private

		/**
		 * Returns schema group.
		 * @private
		 * @param {Array} groups Schema groups.
		 * @param {Object} schema Schema.
		 * @param {Terrasoft.Collection} managerItems Client unit schema manager items.
		 * @return {Array} Schema groups.
		 */
		_getSchemaGroup: function(groups, schema, managerItems) {
			const item = managerItems.get(schema.schemaUId);
			let schemaGroup = groups.filter(function(group) {
				return group.schemaName === item.name;
			})[0];
			if (!schemaGroup) {
				schemaGroup = {
					schemaName: item.name,
					schemas: []
				};
				groups.push(schemaGroup);
			}
			schemaGroup.schemas.push(schema);
			return groups;
		},

		/**
		 * Groups hierarchy by schema name.
		 * @private
		 * @param {Array} hierarchy Schema hierarchy.
		 * @return {Array} Grouped hierarchy.
		 */
		_groupHierarchyBySchemaName: function(hierarchy) {
			const items = Terrasoft.ClientUnitSchemaManager.getItems();
			return Terrasoft.reduce(hierarchy, function(groups, schema) {
				return this._getSchemaGroup(groups, schema, items);
			}, [], this);
		},

		/**
		 * Filters grouped hierarchy.
		 * @private
		 * @param {Array} groups Schema groups.
		 * @param {Array} packageUIds Package UIds.
		 * @return {Object} Filtered schema groups.
		 */
		_filterHierarchyGroupsByPackageUIds: function(groups, packageUIds) {
			const items = Terrasoft.ClientUnitSchemaManager.getItems();
			return groups.map(function(group) {
				const schemas = group.schemas;
				const lastSchema = schemas[schemas.length - 1];
				const filteredSchemas = schemas.filter(function(schema) {
					const item = items.get(schema.schemaUId);
					return packageUIds.indexOf(item.packageUId) >= 0;
				});
				if (filteredSchemas.length > 0) {
					const newLastSchema = filteredSchemas[filteredSchemas.length - 1];
					newLastSchema.resources = lastSchema.resources;
					newLastSchema.schemaName = lastSchema.schemaName;
				}
				return filteredSchemas;
			});
		},

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.SchemaBuilder#onSchemaHierarchyBuilt
		 * @override
		 */
		onSchemaHierarchyBuilt: function(initialHierarchy, initialConfig, callback, scope) {
			if (!initialConfig.packageUId) {
				this.callParent(arguments);
			} else {
				this.callParent([initialHierarchy, initialConfig, function(hierarchy, config) {
					const getSchemaHierarchyByPackageUIdConfig = {
						hierarchy: config.hierarchyStack,
						packageUId: config.packageUId
					};
					this.getSchemaHierarchyByPackageUId(getSchemaHierarchyByPackageUIdConfig, function(designHierarchy) {
						config.hierarchyStack = designHierarchy;
						Ext.callback(callback, scope, [designHierarchy, config]);
					}, this);
				}, this]);
			}
		},

		/**
		 * Cuts schema hierarchy to the current package.
		 * @protected
		 * @param {Object} config Configuration object.
		 * @param {Array} config.hierarchy Cutting hierarchy.
		 * @param {String} config.packageUId Current package UId.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		getSchemaHierarchyByPackageUId: function(config, callback, scope) {
			let packageUIds;
			Terrasoft.chain(
				function(next) {
					Terrasoft.ClientUnitSchemaManager.initialize(next, this);
				},
				function(next) {
					const packageHierarchyRequest = {
						packageUId: config.packageUId,
						useCache: true
					};
					Terrasoft.SchemaDesignerUtilities.buildPackageHierarchy(packageHierarchyRequest, function(result) {
						packageUIds = result;
						next();
					}, this);
				},
				function() {
					const hierarchyGroups = this._groupHierarchyBySchemaName(config.hierarchy);
					const filteredHierarchyGroups = this._filterHierarchyGroupsByPackageUIds(hierarchyGroups, packageUIds);
					callback.call(scope, filteredHierarchyGroups.reduce(function(result, schemas) {
						return result.concat(schemas);
					}, []));
				},
				this
			);
		}

		// endregion

	});

	return Ext.create(schemaGenerator);
});


