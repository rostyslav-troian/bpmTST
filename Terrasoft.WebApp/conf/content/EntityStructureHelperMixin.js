Terrasoft.configuration.Structures["EntityStructureHelperMixin"] = {innerHierarchyStack: ["EntityStructureHelperMixin"]};
define("EntityStructureHelperMixin", ["ext-base", "terrasoft", "ConfigurationEnums",
	"EntityStructureHelperMixinResources", "ServiceHelper", "ViewGeneratorV2"
], function(Ext, Terrasoft, ConfigurationEnums, resources, ServiceHelper) {

	/**
	 * ######, ########### ###### # ########## #######.
	 */
	Ext.define("Terrasoft.configuration.mixins.EntityStructureHelperMixin", {
		alternateClassName: "Terrasoft.EntityStructureHelperMixin",

		/**
		 * ########## ### ###### ##### ####### ## ##### ##### #######.
		 * @param {String} entitySchemaName ### ##### ######.
		 * @return {string} ########## ### ###### ##### #######.
		 */
		getEntitySchemaClassName: function(entitySchemaName) {
			return "Terrasoft." + entitySchemaName;
		},

		/**
		 * ########## ##### ####### ## #####.
		 * @param {String} entitySchemaName ### ##### #######.
		 * @param {Function} callback #######, ####### ##### ####### ## ##########.
		 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
		 */
		getEntitySchema: function(entitySchemaName, callback, scope) {
			var entitySchemaClassName = this.getEntitySchemaClassName(entitySchemaName);
			var entitySchema = Ext.ClassManager.get(entitySchemaClassName);
			if (entitySchema) {
				callback.call(scope, entitySchema);
				return;
			}
			this.sandbox.requireModuleDescriptors([entitySchemaName], function() {
				Terrasoft.require([entitySchemaName], callback, scope);
			}, scope);
		},

		/**
		 * ########## ######### ##### ####### ## #####.
		 * @param {String} entitySchemaName ### ##### #######.
		 * @param {Function} callback #######, ####### ##### ####### ## ##########.
		 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
		 */
		getEntitySchemaCaption: function(entitySchemaName, callback, scope) {
			this.getEntitySchema(entitySchemaName, function(entitySchema) {
				callback.call(scope, entitySchema.caption);
			}, scope);
		},

		/**
		 * ########### ########### ### #### ########## ####### #######.
		 * @param {Terrasoft.BaseEntitySchema} entity C#### #######.
		 * @param {Function} callback #######, ####### ##### ####### ## ##########.
		 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
		 */
		getEntityDescriptorsForLookupColumns: function(entity, callback, scope) {
			var entityNames = [];
			Terrasoft.each(entity.columns, function(column) {
				if (Terrasoft.isLookupDataValueType(column.dataValueType)) {
					var schemaName = column.referenceSchemaName;
					if (!Ext.Array.contains(entityNames, schemaName)) {
						entityNames.push(schemaName);
					}
				}
			}, this);
			this.sandbox.requireModuleDescriptors(entityNames, callback, scope);
		},

		/**
		 * ########## ########## ####### ####### ## ##### #######.
		 * @param {Terrasoft.BaseEntitySchema} entitySchemaName ### ##### #######.
		 * @param {Function} callback #######, ####### ##### ####### ## ##########.
		 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
		 */
		getLookupColumns: function(entitySchemaName, callback, scope) {
			var config = {
				lookupsColumnsOnly: true,
				entitySchemaName: entitySchemaName
			};
			this.getColumns(config, callback, scope);
		},

		/**
		 * ############ ####### ######## ##### ### ####### ## ##### #######.
		 * @param {Terrasoft.BaseEntitySchema} entitySchemaName ### ##### #######.
		 * @param {Function} callback #######, ####### ##### ####### ## ##########.
		 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
		 */
		getBackwardColumns: function(entitySchemaName, callback, scope) {
			var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "SysEntitySchemaReference",
				rowCount: -1,
				isDistinct: true
			});

			select.addColumn("ColumnCaption", "ColumnCaption");
			select.addColumn("ColumnName", "ColumnName");
			select.addColumn("SysSchema.Name", "Name");
			select.addColumn("SysSchema.Caption", "Caption");

			select.filters.addItem(select.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL,
				"[SysSchema:Id:ReferenceSchema].Name",
				entitySchemaName));
			select.filters.addItem(select.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL,
				"SysSchema.SysPackage.SysWorkspace",
				Terrasoft.SysValue.CURRENT_WORKSPACE.value));
			select.filters.addItem(select.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.NOT_START_WITH,
				"SysSchema.Name",
				"VwSys"));
			select.filters.addItem(select.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.NOT_START_WITH,
				"SysSchema.Name",
				"Sys"));
			select.filters.addItem(select.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL,
				"UsageType",
				0));
			select.getEntityCollection(callback, scope);
		},

		/**
		 * #########, ##### ## #### ########## # ####### #### ###### ###### ####### ##########.
		 * @param {Terrasoft.core.enums.DataValueType} dataValueType ### ######.
		 * @param {Terrasoft.core.enums.AggregationType} aggregationType ####### ##########.
		 * @return {Boolean} ########## true #### # ####### #### ###### ##### #### ##########
		 * ###### ####### ##########, false # ######## ######.
		 */
		isAggregateFunctionCanBeUsed: function(dataValueType, aggregationType) {
			if (dataValueType === Terrasoft.DataValueType.BLOB) {
				return false;
			}
			switch (aggregationType) {
				case Terrasoft.AggregationType.COUNT:
					return true;
				case Terrasoft.AggregationType.MAX:
				case Terrasoft.AggregationType.MIN:
					return Terrasoft.isDateDataValueType(dataValueType) || Terrasoft.isNumberDataValueType(dataValueType);
				case Terrasoft.AggregationType.AVG:
				case Terrasoft.AggregationType.SUM:
					return Terrasoft.isNumberDataValueType(dataValueType);
				default:
					return false;
			}
		},

		/**
		 * #########, ##### ## #### ########## ########## # #### ######.
		 * @param {Terrasoft.core.enums.DataValueType} dataValueType ### ######.
		 * @return {Boolean} ########## true #### # ####### #### ###### ##### #### ##########
		 * ##########, false # ######## ######.
		 */
		isAggregateDataValueType: function(dataValueType) {
			return Terrasoft.isDateDataValueType(dataValueType) || Terrasoft.isNumberDataValueType(dataValueType);
		},

		/**
		 * ####### ############# ####### ### ########### ######.
		 * @param {Object} column ####### #######.
		 * @return {Object} ########## ############# ####### ### ########### ######.
		 */
		createItem: function(column) {
			return {
				value: column.uId,
				displayValue: column.caption,
				columnName: column.name,
				referenceSchemaName: column.referenceSchemaName || "",
				dataValueType: column.dataValueType,
				isLookup: column.isLookup || false,
				order: 2
			};
		},

		/**
		 * ####### ############# ######## ####### ####### ### ########### ######.
		 * @param {Object} column ####### #######.
		 * @return {Object} ########## ############# ####### ### ########### ######.
		 */
		createChild: function(column) {
			return Ext.apply(this.createItem(column), {
				isBackward: false
			});
		},

		/**
		 * ####### ############# ####### ######## ##### ### ########### ######.
		 * @param {Object} column ####### ######## #####.
		 * @return {Object} ########## ############# ####### ######## ##### ### ########### ######.
		 */
		createBackwardChild: function(column) {
			return {
				value: column.UId,
				displayValue:
					resources.localizableStrings.BackwardCaptionTemplate
						.replace("#EntityName#", column.Caption)
						.replace("#ColumnName#", column.ColumnCaption),
				columnName: "[" + column.Name + ":" + column.ColumnName + "]",
				referenceSchemaName: column.Name,
				isBackward: true,
				order: 2
			};
		},

		/**
		 * ####### ############# ####### "##########" ### ########### ######.
		 * @return {Object} ########## ############# ####### "##########" ### ########### ######.
		 */
		createCountColumn: function() {
			return {
				value: "count",
				displayValue: resources.localizableStrings.CountItemCaption,
				columnName: "count",
				dataValueType: Terrasoft.DataValueType.INTEGER,
				order: 1,
				isAggregative: true,
				aggregationFunction: ConfigurationEnums.AggregationFunction.COUNT
			};
		},

		/**
		 * ####### ############# ####### "##########" ### ########### ######.
		 * @return {Object} ########## ############# ####### "##########" ### ########### ######.
		 */
		createExistsColumn: function() {
			return {
				value: "exists",
				displayValue: resources.localizableStrings.ExistsItemCaption,
				columnName: "exists",
				order: 0,
				isAggregative: true,
				aggregationFunction: ConfigurationEnums.AggregationFunction.EXISTS
			};
		},

		/**
		 * #########, ###### ## ##### # ###### ########### ####.
		 * @param {Object} config ###### ############.
		 * @param {String} entitySchemaName ### #####.
		 * @return {Boolean} ########## true #### ##### ###### # ###### ########### ### ###### ######,
		 * false # ######## ######.
		 */
		isReferenceSchemasAllowed: function(config, entitySchemaName) {
			return (Ext.isEmpty(config.allowedReferenceSchemas) ||
				Ext.Array.contains(config.allowedReferenceSchemas, entitySchemaName));
		},

		/**
		 * Filter for entity schema columns.
		 * @private
		 * @param {Object} column Column item.
		 * @param {Object} config Filtration config.
		 * @return {Boolean}
		 */
		_entitySchemaColumnFiltration: function(column, config) {
			var primaryColumnName = config.schema.primaryColumnName;
			var entitySchemaName = config.schema.name;
			return (config.displayId &&
				(column.name === primaryColumnName) && this.isReferenceSchemasAllowed(config, entitySchemaName)) ||

				((column.name !== primaryColumnName) &&

					(column.usageType !== ConfigurationEnums.EntitySchemaColumnUsageType.None) &&

					(Ext.isEmpty(config.excludeDataValueTypes) ||
						!Terrasoft.contains(config.excludeDataValueTypes, column.dataValueType)) &&

					(Ext.isEmpty(config.allowedDataValueTypes) ||
						Terrasoft.contains(config.allowedDataValueTypes, column.dataValueType)) &&

					(!config.aggregationType ||
						this.isAggregateFunctionCanBeUsed(column.dataValueType, config.aggregationType)) &&

					(!config.lookupsColumnsOnly ||
						(column.isLookup &&
							this.isReferenceSchemasAllowed(config, column.referenceSchemaName))) &&

					((!config.hasBackwardElemnts && !config.summaryColumnsOnly) ||
						this.isAggregateDataValueType(column.dataValueType)));
		},

		/**
		 * ######### ####### ####### # ########### ## ##########.
		 * @param {Object} config ######### ###### ####### #######.
		 * @param {Function} callback #######, ####### ##### ####### ## ##########.
		 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
		 */
		getColumns: function(config, callback, scope) {
			config = Ext.apply({}, config, {
				excludeDataValueTypes: [],
				lookupsColumnsOnly: false
			});
			config.excludeDataValueTypes.push(Terrasoft.DataValueType.BLOB);
			var entitySchemaName = config.entitySchemaName;
			if (!entitySchemaName) {
				callback.call(scope, null);
				return;
			}
			this.getEntitySchema(entitySchemaName, function(entitySchema) {
				var entitySchemaColumns = Terrasoft.deepClone(entitySchema.columns);
				var columns = {};
				var filterFn = this._entitySchemaColumnFiltration.bind(this);
				if (Ext.isFunction(config.columnsFiltrationMethod)) {
					filterFn = config.columnsFiltrationMethod;
				}
				config.schema = entitySchema;
				Terrasoft.each(entitySchemaColumns, function(column) {
					if (filterFn(column, config) !== false) {
						columns[column.uId] = this.createItem(column);
					}
				}, this);
				if (config.hasBackwardElemnts) {
					Ext.apply(columns, {
						functionCount: this.createCountColumn()
					});
					if (config.UseExists) {
						Ext.apply(columns, {
							functionExists: this.createExistsColumn()
						});
					}
				}
				callback.call(scope, columns);
			}, this);
		},

		/**
		 * ########## ### ####### ## ####### ####.
		 * @param {Object[]} dataSend ###### ######## ############ ####### ### #########.
		 * @param {String} dataSend.schemaName ### #####.
		 * @param {String} dataSend.columnPath ###### #### #######.
		 * @param {String} dataSend.key ####, ### ########### #######.
		 * @param {Function} callback #######, ####### ##### ####### ## ##########.
		 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
		 */
		getColumnPathCaption: function(dataSend, callback, scope) {
			var data = {configJSON: dataSend};
			ServiceHelper.callService({
				serviceName: "StructureExplorerService",
				methodName: "GetColumnPathCaption",
				data: data,
				callback: function(response) {
					callback.call(this, response.GetColumnPathCaptionResult);
				},
				scope: scope
			});
		},

		/**
		 * #########, #### ## # ##### #######, # ####### ##### #### ########## ####### ##########.
		 * @param {String} schemaName ### #####.
		 * @param {Terrasoft.core.enums.AggregationType} aggregationType ####### ##########.
		 * @param {Function} callback #######, ####### ##### ####### ## ##########.
		 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
		 */
		hasAggregationColumns: function(schemaName, aggregationType, callback, scope) {
			var data = {
				schemaName: schemaName,
				aggregationType: aggregationType
			};
			ServiceHelper.callService({
				serviceName: "StructureExplorerService",
				methodName: "HasAggregationColumns",
				data: data,
				callback: function(response) {
					callback.call(this, response.HasAggregationColumnsResult);
				},
				scope: scope
			});
		}
	});

});


