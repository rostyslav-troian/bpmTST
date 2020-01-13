Terrasoft.configuration.Structures["ColumnEditMixin"] = {innerHierarchyStack: ["ColumnEditMixin"]};
define("ColumnEditMixin", ["ext-base", "ColumnEditMixinResources", "EntityStructureHelperMixin"],
	function(Ext) {


		Ext.define("Terrasoft.configuration.mixins.ColumnEditMixin", {
			alternateClassName: "Terrasoft.ColumnEditMixin",

			mixins: {
				EntityStructureHelper: "Terrasoft.EntityStructureHelperMixin"
			},

			getColumnsFiltrationMethod: Terrasoft.emptyFn,

			/**
			 * ######## ##### ###### ## #######.
			 * @param {String} filterValue ###### ### primaryDisplayColumn
			 * @param {Terrasoft.Collection} list #########, # ####### ##### ######### ######.
			 * @param {String} columnName ### ####### ViewModel.
			 * @param {Boolean} isLookup ####### ########## #######.
			 */
			loadColumnsData: function(filterValue, list, columnName) {
				var entityStructureConfig = this.getEntityStructureConfig(columnName);
				if (!entityStructureConfig) {
					return;
				}
				this.getColumns(entityStructureConfig, function(columns) {
					list.clear();
					var columnsCollection = this.Ext.create("Terrasoft.Collection");
					var objects = {};
					Terrasoft.each(columns, function(column) {
						var columnConfig = {
							value: column.columnName,
							dataValueType: column.dataValueType,
							displayValue: column.displayValue,
							referenceSchemaName: column.referenceSchemaName
						};
						objects[columnConfig.value] = columnConfig;
					}, this);
					columnsCollection.loadAll(objects);
					columnsCollection = columnsCollection.filter(
						"displayValue",
						filterValue,
						Terrasoft.StringFilterType.START_WITH
					);
					if (!columnsCollection.isEmpty()) {
						list.loadAll(columnsCollection);
					}
				}, this);
			},

			/**
			 * ########## ############ ### ###### ###### ####### ## ##### #######.
			 * @param {String} columnName ### #######.
			 * @return {Object|null} ########## ############ ### ###### ###### #######.
			 */
			getEntityStructureConfig: function(columnName) {
				var entityStructureConfig = this.columns[columnName].entityStructureConfig;
				if (!entityStructureConfig) {
					return;
				}
				entityStructureConfig = Terrasoft.deepClone(entityStructureConfig);
				var sourceToValueDecoupling = [{
					sourceName: "schemaColumnName",
					valueName: "schemaName",
					parameterName: "Name"
				}, {
					sourceName: "aggregationTypeParameterName",
					valueName: "aggregationType",
					parameterName: "value"
				}];
				Terrasoft.each(sourceToValueDecoupling, function(decoupling) {
					var sourceValue = entityStructureConfig[decoupling.sourceName];
					if (!sourceValue) {
						return;
					}
					var value = this.get(sourceValue);
					var itemConfig = {};
					itemConfig[decoupling.valueName] = value && value[decoupling.parameterName];
					Ext.apply(entityStructureConfig, itemConfig);
				}, this);
				if (!entityStructureConfig.schemaName) {
					return;
				}
				entityStructureConfig.entitySchemaName = entityStructureConfig.schemaName;
				this._applyAllowedReferenceSchemasConfig(entityStructureConfig);
				Ext.apply(entityStructureConfig, {
					tag: columnName
				});
				this._applyCustomColumnFilter(columnName, entityStructureConfig);
				return entityStructureConfig;
			},

			/**
			 * Applies custom filter for columns.
			 * @private
			 * @param {Object} columnName Column name.
			 * @param {Object} entityStructureConfig Entity structure config.
			 */
			_applyCustomColumnFilter: function(columnName, entityStructureConfig) {
				var filterMethod = this.getColumnsFiltrationMethod(columnName);
				if (Ext.isFunction(filterMethod)) {
					entityStructureConfig.columnsFiltrationMethod = filterMethod.bind(this);
				}
			},

			/**
			 * Applies allowed reference schemas.
			 * @private
			 * @param {Object} config Entity structure config.
			 */
			_applyAllowedReferenceSchemasConfig: function(entityStructureConfig) {
				var allowedReferenceSchemas = entityStructureConfig.allowedReferenceSchemas;
				if (Ext.isString(allowedReferenceSchemas)) {
					if (Ext.isFunction(this[allowedReferenceSchemas])) {
						entityStructureConfig.allowedReferenceSchemas = this[allowedReferenceSchemas]();
					} else {
						entityStructureConfig.allowedReferenceSchemas = [allowedReferenceSchemas];
					}
				}
			},

			/**
			 * ######### ######## ###### #######.
			 * @protected
			 * @virtual
			 * @param {Object} config ############ ######## ########.
			 * @param {String} columnName ######## ####### ### ####### ########### ########.
			 */
			loadColumn: function(config, columnName) {
				var entityStructureConfig = this.getEntityStructureConfig(columnName);
				if (!entityStructureConfig) {
					return;
				}
				Terrasoft.StructureExplorerUtilities.open({
					scope: this,
					handlerMethod: this.onColumnLoaded,
					moduleConfig: entityStructureConfig
				});
			},

			/**
			 * ######### ######### ####### # ###### #############.
			 * @protected
			 * @virtual
			 * @param {Object} selectedColumnInfo ###### # ########### # ######### #######.
			 */
			onColumnLoaded: function(selectedColumnInfo) {
				var structureExplorerConfig = this.structureExplorerConfig;
				var selectedObject = {
					value: selectedColumnInfo.leftExpressionColumnPath,
					dataValueType: selectedColumnInfo.dataValueType,
					displayValue: selectedColumnInfo.leftExpressionCaption,
					referenceSchemaName: selectedColumnInfo.referenceSchemaName
				};
				this.set(structureExplorerConfig.tag, selectedObject);
			},

			/**
			 * ############## #######.
			 * @param {Function} callback #######, ####### ##### ####### ## ##########.
			 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
			 */
			init: function(callback, scope) {
				this.initColumnsLists();
				this.initColumnDisplayValue(callback, scope);
			},

			/**
			 * ############## ###### ########### ### ########## ####### ########## ###### #######.
			 * @virtual
			 * @protected
			 */
			initColumnsLists: function() {
				Terrasoft.each(this.columns, function(columnConfig, columnName) {
					var entityStructureConfig = this.getEntityStructureConfig(columnName);
					if (entityStructureConfig && entityStructureConfig.entitySchemaName) {
						this.set(columnName + "List", this.Ext.create("Terrasoft.Collection"));
					}
				}, this);
			},

			/**
			 * ######### ######### # #### ### ######## #######, ########## ####### ########.
			 * @protected
			 * @virtual
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ####### ######### ######.
			 */
			initColumnDisplayValue: function(callback, scope) {
				var serviceData = [];
				Terrasoft.each(this.columns, function(columnConfig, columnName) {
					var entityStructureConfig = this.getEntityStructureConfig(columnName);
					if (!entityStructureConfig || !entityStructureConfig.entitySchemaName) {
						return;
					}
					var columnPath = this.get(columnName);
					columnPath = (columnPath && columnPath.value) || columnPath;
					if (columnPath) {
						serviceData.push({
							schemaName: entityStructureConfig.entitySchemaName,
							columnPath: columnPath,
							key: columnName
						});
					}
				}, this);
				if (Ext.isEmpty(serviceData)) {
					callback.call(scope);
					return;
				}
				this.getColumnPathCaption(this.Ext.JSON.encode(serviceData), function(response) {
					response.forEach(function(columnInfo) {
						var selectedObject = {
							value: this.get(columnInfo.key),
							dataValueType: columnInfo.dataValueType,
							displayValue: columnInfo.columnCaption,
							referenceSchemaName: columnInfo.referenceSchemaName
						};
						this.set(columnInfo.key, selectedObject);
					}, this);
					callback.call(scope);
				}, this);
			}
		});

	});


