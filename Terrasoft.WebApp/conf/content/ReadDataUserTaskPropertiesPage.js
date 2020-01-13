Terrasoft.configuration.Structures["ReadDataUserTaskPropertiesPage"] = {innerHierarchyStack: ["ReadDataUserTaskPropertiesPage"], structureParent: "BaseDataModificationUserTaskPropertiesPage"};
define('ReadDataUserTaskPropertiesPageStructure', ['ReadDataUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'5e64f089-f6db-4cfe-92dd-33246ca806e5',schemaCaption: "ReadDataUserTaskPropertiesPage", parentSchemaName: "BaseDataModificationUserTaskPropertiesPage", schemaName:'ReadDataUserTaskPropertiesPage',parentSchemaUId:'e8f0a1bf-7dcf-497c-bc81-53f264cc1bdb',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseDataModificationUserTaskPropertiesPage
 */
define("ReadDataUserTaskPropertiesPage", ["terrasoft", "ProcessUserTaskConstants",
		"ReadDataUserTaskPropertiesPageResources", "BusinessRuleModule", "ConfigurationItemGenerator"],
		function(Terrasoft, ProcessUserTaskConstants, resources, businessRuleModule) {
	return {
		messages: {},
		mixins: {},
		attributes: {

			/**
			 * Data read modes.
			 * @protected
			 * @type {Object}
			 */
			"DataReadModeEnum": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: {
					FirstRecordFromTheSample: "0",
					ConsiderTheFunction: "1",
					CalculateTheNumberOfRecords: "2",
					ReadCollection: "3"
				}
			},

			/**
			 * Aggregate functions.
			 * @protected
			 * @type {Object}
			 */
			"AggregateFunctionEnum": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: {
					Count: Terrasoft.convertToServerAggregationType(Terrasoft.AggregationType.COUNT),
					Sum: Terrasoft.convertToServerAggregationType(Terrasoft.AggregationType.SUM),
					Average: Terrasoft.convertToServerAggregationType(Terrasoft.AggregationType.AVG),
					Minimum: Terrasoft.convertToServerAggregationType(Terrasoft.AggregationType.MIN),
					Maximum: Terrasoft.convertToServerAggregationType(Terrasoft.AggregationType.MAX)
				}
			},

			/**
			 * Column select modes.
			 * @protected
			 * @type {Object}
			 */
			"ColumnSelectModeEnum": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: {
					ReadAllColumns: 0,
					ReadOnlySelectedColumns: 1
				}
			},

			/**
			 * List of the sorting order.
			 * @protected
			 * @type {Object}
			 */
			"OrderDirectionEnum": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: {
					None: Terrasoft.OrderDirection.NONE.toString(),
					Ascending: Terrasoft.OrderDirection.ASC.toString(),
					Descending: Terrasoft.OrderDirection.DESC.toString()
				}
			},

			/**
			 * Data read mode.
			 * @protected
			 * @type {Object}
			 */
			"DataReadMode": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true
			},

			/**
			 * Aggregate function.
			 * @protected
			 * @type {Object}
			 */
			"AggregateFunction": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Aggregate column.
			 * @protected
			 * @type {Object}
			 */
			"AggregateColumn": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Column select mode.
			 * @protected
			 * @type {Object}
			 */
			"ColumnSelectMode": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true
			},

			/**
			 * The primary display entity schema column.
			 * @protected
			 * @type {Object}
			 */
			"PrimaryDisplayEntitySchemaColumn": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Number of rows to be in result.
			 */
			"NumberOfRecords": {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Collection of the sorting order.
			 * @protected
			 * @type {Terrasoft.ObjectCollection}
			 */
			"SortingOrderDirections": {
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isCollection: true
			},

			/**
			 * Sorting order view config.
			 * @protected
			 * @type {Object}
			 */
			"SortingOrderViewConfig": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * View models of sorting orders.
			 * @protected
			 * @type {Terrasoft.ObjectCollection}
			 */
			"SortingOrderControls": {
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isCollection: true,
				value: this.Ext.create("Terrasoft.ObjectCollection")
			},

			/**
			 * Indicates if the sorting order container is visible.
			 * @protected
			 * @type {Boolean}
			 */
			"IsOrderDirectionContainerVisible": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Indicates if the entity schema columns container is visible.
			 * @protected
			 * @type {Boolean}
			 */
			"IsEntitySchemaColumnsContainerVisible": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Indicates if the column select mode is visible.
			 * @protected
			 * @type {Boolean}
			 */
			"IsColumnSelectModeVisible": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Indicates if select controls for aggregate functions are visible.
			 * @protected
			 * @type {Boolean}
			 */
			"IsSelectAggregateFunctionContainerVisible": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Flag that indicates whether filters are required.
			 * @protected
			 * @type {Boolean}
			 */
			"IsFiltersRequired": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},

			/**
			 * Flag that indicates whether read collection mode enabled.
			 */
			"IsReadCollectionModeVisible": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			}
		},
		rules: {
			"AggregateFunction": {
				"BindAggregateFunctionRequiredToDataReadMode": {
					"ruleType": businessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": businessRuleModule.enums.Property.REQUIRED,
					"conditions": [{
						"leftExpression": {
							"type": businessRuleModule.enums.ValueType.ATTRIBUTE,
							"attribute": "DataReadMode"
						},
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"rightExpression": {
							"type": businessRuleModule.enums.ValueType.CONSTANT,
							"value": "1"
						}
					}]
				}
			},
			"AggregateColumn": {
				"BindAggregateColumnRequiredToDataReadMode": {
					"ruleType": businessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": businessRuleModule.enums.Property.REQUIRED,
					"conditions": [{
						"leftExpression": {
							"type": businessRuleModule.enums.ValueType.ATTRIBUTE,
							"attribute": "DataReadMode"
						},
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"rightExpression": {
							"type": businessRuleModule.enums.ValueType.CONSTANT,
							"value": "1"
						}
					}]
				}
			}
		},
		properties: {
			_defaultNumberOfRecords: 20
		},
		methods: {

			//region Methods: Private

			/**
			 * @private
			 */
			_isReadCollectionMode: function() {
				const dataReadModeValue = this.$DataReadMode && this.$DataReadMode.value;
				return dataReadModeValue === this.$DataReadModeEnum.ReadCollection;
			},

			/**
			 * @private
			 */
			_actualizeSelectedEntitySchemaColumns: function() {
				const mappedElements = this._findLinksToMappedElements();
				const columns = this._isReadCollectionMode()
					? this._getSourceParameterTags(mappedElements)
					: this._getColumnsByDependentParametersSourceValue(mappedElements);
				if (!Ext.isEmpty(columns)) {
					this.initSelectedEntitySchemaColumns(columns, Terrasoft.emptyFn, this);
				}
			},

			/**
			 * @private
			 */
			_getSourceParameterTags: function(mappedElements) {
				const filteredElements = mappedElements.filter(function(item) {
					return item.sourceParameter && item.sourceParameter.tag;
				});
				return filteredElements.map(function(item) {
					return item.sourceParameter.tag;
				});
			},

			/**
			 * @private
			 */
			_getColumnsByDependentParametersSourceValue: function(mappedElements) {
				const filteredElements = mappedElements.filter(function(item) {
					return item.dependentParameter && item.dependentParameter.sourceValue &&
						item.dependentParameter.sourceValue.value;
				});
				return filteredElements.map(function(item) {
					return this._getColumnBySourceValue(item.dependentParameter.sourceValue.value);
				}, this);
			},

			/**
			 * @private
			 */
			_findLinksToMappedElements: function() {
				const element = this.$ProcessElement;
				const process = element.parentSchema;
				return process.findLinksToElements([element.name]);
			},

			/**
			 * @private
			 */
			_getColumnBySourceValue: function(value) {
				var regex = /EntityColumn:{(.*?)}/i;
				var result = regex.exec(value);
				return result[1];
			},

			/**
			 * @private
			 */
			_canRemoveElementValidator: function() {
				const validationResult = { isValid: true };
				const element = this.$ProcessElement;
				const process = element.parentSchema;
				const checkResult = process.canRemoveElements([element.name]);
				validationResult.isValid = checkResult.canRemove;
				validationResult.validationInfo = checkResult.validationInfo;
				return validationResult;
			},

			/**
			 * @private
			 */
			_elementChangeValidationHandler: function(validationResult, validHandler, invalidHandler, scope) {
				if (validationResult.isValid) {
					validHandler.call(scope);
				} else {
					Terrasoft.ProcessSchemaDesignerUtilities.showProcessMessageBox({
						caption: this.get("Resources.Strings.InvalidEntitySchemaChange"),
						message: validationResult.validationInfo
					});
					Terrasoft.defer(invalidHandler, scope);
				}
			},

			/**
			 * @private
			 */
			_onEntitySchemaColumnsControlsSelectRemove: function(removedItem, columnUId) {
				const validate = this.$DataReadMode && this.$DataReadMode.value ===
					this.$DataReadModeEnum.ReadCollection;
				const validationResult = { isValid: true };
				if (validate) {
					const element = this.$ProcessElement;
					const process = element.parentSchema;
					const parameter = element.parameters.findByPath("tag", columnUId);
					const checkResult = process.canRemoveParameter(parameter);
					validationResult.isValid = checkResult.canRemove;
					validationResult.validationInfo = checkResult.validationInfo;
				}
				this._elementChangeValidationHandler(
					validationResult,
					this._syncronizeResultCompositeObjectList,
					function() {
						this.$EntitySchemaColumnsSelect.find(columnUId).selected = true;
						this.$EntitySchemaColumnsControlsSelect.add(columnUId, removedItem);
					},
					this
				);
			},

			/**
			 * @private
			 */
			_syncronizeResultCompositeObjectList: function() {
				const element = this.$ProcessElement;
				const resultCompositeObjectListParameter =
					element.findParameterByName("ResultCompositeObjectList");
				if (resultCompositeObjectListParameter) {
					const columnParameters = resultCompositeObjectListParameter.itemProperties;
					if (this.$EntitySchema && this.$DataReadMode &&
						this.$DataReadMode.value === this.$DataReadModeEnum.ReadCollection) {
						let entityColumns = this.$EntitySchema.columns;
						const entityColumnMetaPathes = this.$EntitySchemaColumnsControlsSelect.getKeys();
						const readOnlySelectedRows = this.$ColumnSelectMode.value ===
							this.$ColumnSelectModeEnum.ReadOnlySelectedColumns;
						if (readOnlySelectedRows && !Ext.isEmpty(entityColumnMetaPathes)) {
							entityColumns = entityColumns.filterByFn(function(column) {
								return Terrasoft.contains(entityColumnMetaPathes, column.uId);
							});
						}
						this._updateExistingColumnParameters(entityColumns, columnParameters);
						this._addNewColumnParameters(entityColumns, columnParameters);
					} else {
						columnParameters.clear();
					}
				}
			},

			/**
			 * @private
			 */
			_updateExistingColumnParameters: function(entityColumns, parameters) {
				const updatedParameters = {};
				parameters.each(function(parameter) {
					const sourceColumn = entityColumns.find(parameter.tag);
					if (sourceColumn) {
						parameter.setPropertyValue("caption", sourceColumn.caption.clone());
						parameter.setPropertyValue("name", sourceColumn.name);
						parameter.setPropertyValue("dataValueType", sourceColumn.dataValueType);
						updatedParameters[parameter.uId] = parameter;
					}
				}, this);
				parameters.reloadAll(updatedParameters);
			},

			/**
			 * @private
			 */
			_addNewColumnParameters: function(entityColumns, parameters) {
				const dataValueTypes = Terrasoft.DataValueType;
				const exceptedDataValueTypes = [dataValueTypes.BLOB];
				const existingColumnParameters = parameters.map(function(parameter) {
					return parameter.tag;
				}, this);
				const columnsToAdd = entityColumns.filterByFn(function(entityColumn) {
					return !Terrasoft.contains(existingColumnParameters.getItems(), entityColumn.uId) &&
						!Terrasoft.contains(exceptedDataValueTypes, entityColumn.dataValueType);
				}, this);
				columnsToAdd.each(function(columnToAdd) {
					const parameter = this._createColumnParameter(columnToAdd);
					parameters.add(parameter.uId, parameter);
				}, this);
			},

			/**
			 * @private
			 * @param column
			 * @return {Terrasoft.ProcessSchemaParameter}
			 */
			_createColumnParameter: function(column) {
				return Ext.create("Terrasoft.ProcessSchemaParameter", {
					name: column.name,
					caption: column.caption.clone(),
					dataValueType: column.dataValueType,
					tag: column.uId,
					direction: Terrasoft.process.enums.ProcessSchemaParameterDirection.OUT,
					containerUId: this.$ProcessElement.uId,
					processFlowElementSchema: this.$ProcessElement.parentSchema
				});
			},

			/**
			 * @private
			 */
			_subscribeOnEntitySchemaColumnsControlsSelectEvents: function() {
				this.$EntitySchemaColumnsControlsSelect.on("dataLoaded", this._syncronizeResultCompositeObjectList, this);
				this.$EntitySchemaColumnsControlsSelect.on("remove", this._onEntitySchemaColumnsControlsSelectRemove,
					this);
			},

			/**
			 * @private
			 */
			_initDefaultNumberOfRecords: function(callback, scope) {
				Terrasoft.SysSettings.querySysSettings(["ReadDataChunkSize"], function(sysSettings) {
					if (!Ext.isEmpty(sysSettings.ReadDataChunkSize)) {
						this._defaultNumberOfRecords = sysSettings.ReadDataChunkSize;
					}
					callback.call(scope || this);
				}, this);
			},

			/**
			 * @private
			 */
			_initNumberOfRecords: function(element) {
				const parameter = element.findParameterByName("NumberOfRecords");
				if (parameter) {
					const rowsCount = parameter.getValue();
					if (Ext.isEmpty(rowsCount)) {
						this.$NumberOfRecords = this._defaultNumberOfRecords;
					} else {
						this.$NumberOfRecords = rowsCount !== "0" ? Number(rowsCount) : null;
					}
				}
			},

			/**
			 * Validates if row count is in range.
			 * @private
			 * @param {Number} value to validate.
			 * @return {Object} Validation result.
			 */
			_rowsCountRangeValidator: function(value) {
				let invalidMessage;
				const minMessage = Terrasoft.Resources.BaseViewModel.columnIncorrectMinNumberValidationMessage;
				const maxMessage = Terrasoft.Resources.BaseViewModel.columnIncorrectMaxNumberValidationMessage;
				const minValue = 1;
				const maxValue = 5000;
				if (value > maxValue) {
					invalidMessage = Ext.String.format(maxMessage, maxValue);
				} else if (value < minValue) {
					invalidMessage = Ext.String.format(minMessage, minValue);
				} else {
					invalidMessage = "";
				}
				return {
					fullInvalidMessage: invalidMessage,
					invalidMessage: invalidMessage
				};
			},

			/**
			 * Returns entity column metaPaths.
			 * @private
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 * @return {String[]} The array of column metaPaths.
			 */
			getEntityColumnMetapaths: function(element) {
				var parameter = element.findParameterByName("EntityColumnMetaPathes");
				var value = parameter.getValue();
				var columnMetaPaths = [];
				if (!this.Ext.isEmpty(value)) {
					columnMetaPaths = value.split(";");
				}
				return columnMetaPaths;
			},

			/**
			 * Initializes the primary display column.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} [scope] Callback scope.
			 */
			initPrimaryDisplayColumn: function(callback, scope) {
				this.set("PrimaryDisplayEntitySchemaColumn", null);
				var referenceSchemaUId = this.get("ReferenceSchemaUId");
				if (this.Ext.isEmpty(referenceSchemaUId)) {
					callback.call(scope || this);
					return;
				}
				var packageUId = this.get("packageUId");
				var config = {
					schemaUId: referenceSchemaUId,
					packageUId: packageUId
				};
				this.Terrasoft.EntitySchemaManager.findBundleSchemaInstance(config, function(entitySchema) {
					if (entitySchema) {
						this.set("EntitySchema", entitySchema);
						var primaryDisplayColumn = entitySchema.primaryDisplayColumn;
						if (primaryDisplayColumn) {
							primaryDisplayColumn = this.getEntitySchemaColumnSelect(primaryDisplayColumn);
							this.set("PrimaryDisplayEntitySchemaColumn", primaryDisplayColumn);
						}
					}
					callback.call(scope || this);
				}, this);
			},

			/**
			 * Initializes data read mode.
			 * @private
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 */
			initDataReadMode: function(element) {
				var parameter = element.findParameterByName("ResultType");
				var value = parameter.getValue();
				let dataReadMode;
				switch (value) {
					case ProcessUserTaskConstants.READ_DATA_RESULT_TYPE.FUNCTION:
						parameter = element.findParameterByName("FunctionType");
						value = parameter.getValue();
						dataReadMode = value === this.$AggregateFunctionEnum.Count
							? this.$DataReadModeEnum.CalculateTheNumberOfRecords
							: this.$DataReadModeEnum.ConsiderTheFunction;
						break;
					case ProcessUserTaskConstants.READ_DATA_RESULT_TYPE.ENTITY_COLLECTION:
						dataReadMode = this.$DataReadModeEnum.ReadCollection;
						break;
					default:
						dataReadMode = this.$DataReadModeEnum.FirstRecordFromTheSample;
						break;
				}
				var dataReadModes = this.getDataReadModes();
				this.$DataReadMode = dataReadModes[dataReadMode];
				this.on("change:DataReadMode", this.onDataReadModeChanged, this);
			},

			/**
			 * Initializes aggregate function.
			 * @private
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 */
			initAggregateFunction: function(element) {
				var parameter = element.findParameterByName("FunctionType");
				var value = parameter.getValue();
				if (!value) {
					return;
				}
				var aggregateFunctions = this.getAggregateFunctions();
				this.set("AggregateFunction", aggregateFunctions[value]);
				this.on("change:AggregateFunction", this.onAggregateFunctionChanged, this);
			},

			/**
			 * Initializes aggregate column.
			 * @private
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 */
			initAggregateColumn: function(element) {
				var parameter = element.findParameterByName("AggregationColumnName");
				var columnName = parameter.getValue();
				if (!columnName) {
					return;
				}
				var aggregateColumn = null;
				var columns = this.get("EntitySchemaColumnsSelect");
				columns.each(function(column) {
					if (column.name === columnName) {
						aggregateColumn = column;
						return false;
					}
				}, this);
				this.set("AggregateColumn", aggregateColumn);
			},

			/**
			 * Initializes column selection mode.
			 * @private
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 */
			initColumnSelectMode: function(element) {
				var parameter = element.findParameterByName("EntityColumnMetaPathes");
				var value = parameter.getValue();
				var columnSelectModeEnum = this.get("ColumnSelectModeEnum");
				var columnSelectMode = this.Ext.isEmpty(value)
					? columnSelectModeEnum.ReadAllColumns
					: columnSelectModeEnum.ReadOnlySelectedColumns;
				var columnSelectModes = this.getColumnSelectModes();
				this.set("ColumnSelectMode", columnSelectModes[columnSelectMode]);
				this.on("change:ColumnSelectMode", this.onColumnSelectModeChanged, this);
			},

			/**
			 * Returns aggregate functions.
			 * @private
			 * @return {Object}
			 */
			getAggregateFunctions: function() {
				var aggregateFunctions = {};
				var aggregateFunctionEnum = this.get("AggregateFunctionEnum");
				var localizableStrings = resources.localizableStrings;
				this.Terrasoft.each(aggregateFunctionEnum, function(aggregateFunction) {
					if (aggregateFunction === aggregateFunctionEnum.Count) {
						return true;
					}
					var functionCaption = "AggregateFunction" + aggregateFunction + "Caption";
					aggregateFunctions[aggregateFunction] = {
						value: aggregateFunction,
						displayValue: localizableStrings[functionCaption]
					};
				}, this);
				return aggregateFunctions;
			},

			/**
			 * Fills out the drop down list of data read modes.
			 * @private
			 * @param {String} filter Filter value.
			 * @param {Terrasoft.Collection} list The drop down list.
			 */
			prepareDataReadModes: function(filter, list) {
				if (list === null) {
					return;
				}
				var dataReadModes = this.getDataReadModes();
				list.clear();
				list.loadAll(dataReadModes);
			},

			/**
			 * Fills out the drop down list of aggregate functions.
			 * @private
			 * @param {String} filter Filter value.
			 * @param {Terrasoft.Collection} list The drop down list.
			 */
			prepareAggregateFunctionList: function(filter, list) {
				if (list === null) {
					return;
				}
				var aggregateFunctions = this.getAggregateFunctions();
				list.clear();
				list.loadAll(aggregateFunctions);
			},

			/**
			 * Fills out the drop down list of aggregate column names.
			 * @private
			 * @param {String} filter Filter value.
			 * @param {Terrasoft.Collection} list The drop down list.
			 */
			prepareAggregateColumnList: function(filter, list) {
				if (list === null) {
					return;
				}
				var columns = this.get("EntitySchemaColumnsSelect");
				var aggregateFunctionEnum = this.get("AggregateFunctionEnum");
				var aggregateFunction = this.get("AggregateFunction");
				aggregateFunction = aggregateFunction.value;
				var aggregateColumns = {};
				columns.each(function(column) {
					var dataValueType = column.dataValueType;
					if (!this.Terrasoft.isNumberDataValueType(dataValueType) &&
						!this.Terrasoft.isDateDataValueType(dataValueType)) {
						return true;
					}
					if ((aggregateFunction === aggregateFunctionEnum.Average ||
							aggregateFunction === aggregateFunctionEnum.Sum) &&
						!this.Terrasoft.isNumberDataValueType(dataValueType)) {
						return true;
					}
					aggregateColumns[column.name] = column;
				}, this);
				list.clear();
				list.loadAll(aggregateColumns);
			},

			/**
			 * Returns sorting order.
			 * @private
			 * @return {Object}
			 */
			getSortingOrderDirections: function() {
				var sortingOrders = this.get("SortingOrderDirections");
				if (!sortingOrders) {
					var orderDirectionEnum = this.get("OrderDirectionEnum");
					var localizableStrings = resources.localizableStrings;
					sortingOrders = this.Ext.create("Terrasoft.Collection");
					this.Terrasoft.each(orderDirectionEnum, function(sortingOrder) {
						var sortingOrderCaption = "SortingOrder" + sortingOrder + "Caption";
						sortingOrders.add(sortingOrder, {
							value: sortingOrder,
							displayValue: localizableStrings[sortingOrderCaption]
						});
					}, this);
					this.set("SortingOrderDirections", sortingOrders);
				}
				return sortingOrders;
			},

			/**
			 * Returns column select modes.
			 * @private
			 * @return {Object}
			 */
			getColumnSelectModes: function() {
				var columnSelectModes = {};
				var columnSelectModeEnum = this.get("ColumnSelectModeEnum");
				var localizableStrings = resources.localizableStrings;
				columnSelectModes[columnSelectModeEnum.ReadAllColumns] = {
					value: columnSelectModeEnum.ReadAllColumns,
					displayValue: localizableStrings.ReadAllColumnsCaption
				};
				columnSelectModes[columnSelectModeEnum.ReadOnlySelectedColumns] = {
					value: columnSelectModeEnum.ReadOnlySelectedColumns,
					displayValue: localizableStrings.ReadOnlySelectedColumnsCaption
				};
				return columnSelectModes;
			},

			/**
			 * Fills out the drop down list of column select modes.
			 * @private
			 * @param {String} filter Filter value.
			 * @param {Terrasoft.Collection} list The drop down list.
			 */
			prepareColumnSelectModes: function(filter, list) {
				if (list === null) {
					return;
				}
				var columnSelectModes = this.getColumnSelectModes();
				list.clear();
				list.loadAll(columnSelectModes);
			},

			/**
			 * Returns view model settings of the element.
			 * @private
			 * @param {Object} config Settings.
			 * @return {Object}.
			 */
			getSortingOrderViewModelConfig: function(config) {
				var viewModel = this.Ext.create("Terrasoft.BaseModel", {
					columns: {
						Id: {dataValueType: this.Terrasoft.DataValueType.TEXT},
						EntitySchemaColumn: {
							type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
							dataValueType: this.Terrasoft.DataValueType.ENUM,
							isLookup: true,
							isRequired: true
						},
						OrderDirection: {
							type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
							dataValueType: this.Terrasoft.DataValueType.ENUM,
							isLookup: true,
							isRequired: true
						},
						EntitySchemaColumns: {
							dataValueType: this.Terrasoft.DataValueType.COLLECTION,
							type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
							isCollection: true
						},
						OrderDirections: {
							dataValueType: this.Terrasoft.DataValueType.COLLECTION,
							type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
							isCollection: true
						},
						Position: {
							type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
							dataValueType: this.Terrasoft.DataValueType.INTEGER
						},
						PropertiesPageViewModel: {
							dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
							type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
						}
					},
					values: {
						Id: config.id,
						PropertiesPageViewModel: config.propertiesPageViewModel,
						EntitySchemaColumn: config.entitySchemaColumn,
						EntitySchemaColumns: config.entitySchemaColumns
							? config.entitySchemaColumns
							: this.Ext.create("Terrasoft.Collection"),
						OrderDirection: config.orderDirection,
						OrderDirections: this.Ext.create("Terrasoft.Collection"),
						Position: config.position
					},
					methods: {
						onPrepareEntitySchemaColumns: function(filter, list) {
							var entitySchemaColumns = this.get("EntitySchemaColumnsSelect");
							list.loadAll(entitySchemaColumns);
						},
						onPrepareOrderDirections: function(filter, list) {
							var propertiesPageViewModel = this.get("PropertiesPageViewModel");
							var orderDirections = propertiesPageViewModel
								.getSortingOrderDirections(propertiesPageViewModel);
							list.clear();
							list.loadAll(orderDirections);
						},
						onDeleteSortingOrderButtonClick: function() {
							var propertiesPageViewModel = this.get("PropertiesPageViewModel");
							var sortingOrderControls = propertiesPageViewModel.get("SortingOrderControls");
							var id = this.get("Id");
							sortingOrderControls.removeByKey(id);
						}
					}
				});
				viewModel.sandbox = this.sandbox;
				return viewModel;
			},

			/**
			 * Returns view settings of the sorting order element.
			 * @private
			 * @return {Object}.
			 */
			getSortingOrderViewConfig: function() {
				return [{
					id: "EntitySchemaColumns",
					className: "Terrasoft.ComboBoxEdit",
					value: {
						bindTo: "EntitySchemaColumn"
					},
					list: {
						bindTo: "EntitySchemaColumns"
					},
					prepareList: {
						bindTo: "onPrepareEntitySchemaColumns"
					},
					classes: {
						wrapClass: ["sorting-order-item-container"]
					},
					"markerValue": {
						bindTo: "Position",
						bindConfig: {
							converter: function(position) {
								var markerValue = "SortByColumn";
								if (position) {
									markerValue = markerValue + "_" + position;
								}
								return markerValue;
							}
						}
					}
				},
					{
						id: "OrderDirections",
						className: "Terrasoft.ComboBoxEdit",
						value: {
							bindTo: "OrderDirection"
						},
						list: {
							bindTo: "OrderDirections"
						},
						prepareList: {
							bindTo: "onPrepareOrderDirections"
						},
						classes: {
							wrapClass: ["sorting-order-item-container"]
						},
						"markerValue": {
							bindTo: "Position",
							bindConfig: {
								converter: function(position) {
									var markerValue = "SortingOrderDirection";
									if (position) {
										markerValue = markerValue + "_" + position;
									}
									return markerValue;
								}
							}
						}
					},
					{
						className: "Terrasoft.Container",
						id: "DeleteSortingOrderButtonContainer",
						selectors: {
							wrapEl: "#DeleteSortingOrderButtonContainer"
						},
						classes: {
							wrapClassName: ["sorting-order-edit-button-container"]
						},
						items: [{
							className: "Terrasoft.Button",
							imageConfig: resources.localizableImages.CloseButton,
							style: this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							classes: {
								wrapperClass: [".sorting-order-edit-button"]
							},
							markerValue: "DeleteSortingOrder",
							click: {
								bindTo: "onDeleteSortingOrderButtonClick"
							}
						}]
					}];
			},

			/**
			 * Returns a list of the entity schema columns.
			 * @private
			 * @param {Terrasoft.Collection} entitySchemaColumns Process element.
			 * @param {String} columnName Name of the column.
			 * @return {Object} Found column.
			 */
			findEntitySchemaColumnByName: function(entitySchemaColumns, columnName) {
				var column = null;
				entitySchemaColumns.each(function(schemaColumn) {
					if (schemaColumn.name === columnName) {
						column = schemaColumn;
						return false;
					}
				}, this);
				return column;
			},

			/**
			 * Initializes collection of the sorting order control with values from the OrderInfo parameter.
			 * @private
			 * @param {Terrasoft.ProcessUserTaskSchema} element Process element.
			 */
			initSortingOrderControls: function(element) {
				var controls = this.get("SortingOrderControls");
				if (controls) {
					controls.clear();
				}
				var sortingOrderStatements = this.Ext.create("Terrasoft.Collection");
				var parameter = element.findParameterByName("OrderInfo");
				var sortingOrder = parameter.getValue();
				if (!sortingOrder) {
					return;
				}
				var columns = this.get("EntitySchemaColumnsSelect");
				var firstSortingOrderStatement = null;
				var sortingOrderColumns = sortingOrder.split(",");
				this.Terrasoft.each(sortingOrderColumns, function(sortingOrderColumn) {
					var sortingOrderColumnParts = sortingOrderColumn.split(":");
					if (this.Ext.isEmpty(sortingOrderColumnParts) || sortingOrderColumnParts.length < 3) {
						return true;
					}
					var columnName = sortingOrderColumnParts[0];
					if (this.Ext.Array.contains(sortingOrderStatements, columnName)) {
						return true;
					}
					var column = this.findEntitySchemaColumnByName(columns, columnName);
					if (!column) {
						return true;
					}
					var orderDirection = sortingOrderColumnParts[1];
					var orderPosition = sortingOrderColumnParts[2];
					var config = this.getExistingSortingOrderConfig(columns, column, orderDirection);
					if (orderPosition === "1") {
						firstSortingOrderStatement = config;
						return true;
					}
					sortingOrderStatements.add(columnName, config);
				}, this);
				if (firstSortingOrderStatement) {
					this.addSortingOrderControl(firstSortingOrderStatement);
				}
				sortingOrderStatements.each(function(sortingOrderStatement) {
					this.addSortingOrderControl(sortingOrderStatement);
				}, this);
			},

			/**
			 * Returns config of the sorting order control for a new statement.
			 * @private
			 */
			getNewSortingOrderConfig: function() {
				var orderDirections = this.getSortingOrderDirections();
				var orderDirectionEnum = this.get("OrderDirectionEnum");
				var orderDirection = orderDirections.get(orderDirectionEnum.Ascending);
				var config = {
					id: Terrasoft.generateGUID(),
					propertiesPageViewModel: this,
					orderDirection: orderDirection,
					entitySchemaColumns: this.get("EntitySchemaColumnsSelect")
				};
				var controls = this.get("SortingOrderControls");
				var entitySchemaColumn = this.get("PrimaryDisplayEntitySchemaColumn");
				if (controls.getCount() === 0 && entitySchemaColumn) {
					config.entitySchemaColumn = entitySchemaColumn;
				}
				return config;
			},

			/**
			 * Returns config of the sorting order control for existing statement.
			 * @private
			 * @param {Terrasoft.Collection} entitySchemaColumns A list of the entity schema columns.
			 * @param {Object} sortingByColumn Entity schema column.
			 * @param {String} sortingOrder Sorting order.
			 * @return {Object} Settings for the sorting order.
			 */
			getExistingSortingOrderConfig: function(entitySchemaColumns, sortingByColumn, sortingOrder) {
				var orderDirections = this.getSortingOrderDirections();
				return {
					propertiesPageViewModel: this,
					orderDirection: orderDirections.get(sortingOrder),
					orderDirections: orderDirections,
					entitySchemaColumns: entitySchemaColumns,
					id: sortingByColumn.id,
					entitySchemaColumn: {
						id: sortingByColumn.id,
						name: sortingByColumn.name,
						displayValue: sortingByColumn.caption
					}
				};
			},

			/**
			 * Adds sorting order control.
			 * @private
			 * @param {Object} config Settings.
			 */
			addSortingOrderControl: function(config) {
				var controls = this.get("SortingOrderControls");
				var position = controls.getCount() + 1;
				config.position = position;
				var viewModel = this.getSortingOrderViewModelConfig(config);
				controls.add(config.id, viewModel);
			},

			/**
			 * AddSortingOrderButton button click handler.
			 * @private
			 */
			onAddSortingOrderButtonClick: function() {
				var config = this.getNewSortingOrderConfig();
				this.addSortingOrderControl(config);
			},

			/**
			 * Adds sorting order statement.
			 * @private
			 */
			addSortingOrderStatement: function() {
				if (!this.get("PrimaryDisplayEntitySchemaColumn")) {
					return;
				}
				var config = this.getNewSortingOrderConfig();
				this.addSortingOrderControl(config);
			},

			/**
			 * Saves entity column meta paths.
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 * @private
			 */
			saveEntityColumnMetaPaths: function(element) {
				var columnMetaPaths = null;
				var entitySchemaColumnControls = this.get("EntitySchemaColumnsControlsSelect");
				if (entitySchemaColumnControls && !entitySchemaColumnControls.isEmpty()) {
					entitySchemaColumnControls.each(function(entitySchemaColumnControl) {
						var id = entitySchemaColumnControl.get("Id");
						columnMetaPaths = !columnMetaPaths ? id : columnMetaPaths + ";" + id;
					}, this);
				}
				var parameter = element.findParameterByName("EntityColumnMetaPathes");
				var parameterValue = {
					source: !columnMetaPaths
						? this.Terrasoft.ProcessSchemaParameterValueSource.None
						: this.Terrasoft.ProcessSchemaParameterValueSource.ConstValue,
					value: columnMetaPaths
				};
				parameter.setMappingValue(parameterValue);
			},

			/**
			 * Saves sorting order info.
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 * @private
			 */
			saveSortingOrderInfo: function(element) {
				var sortingOrderInfo = null;
				var sortingOrderControls = this.get("SortingOrderControls");
				if (sortingOrderControls && !sortingOrderControls.isEmpty()) {
					sortingOrderControls.each(function(sortingOrderControl) {
						var entitySchemaColumn = sortingOrderControl.get("EntitySchemaColumn");
						if (!entitySchemaColumn) {
							return true;
						}
						var orderDirection = sortingOrderControl.get("OrderDirection");
						if (!orderDirection) {
							return true;
						}
						var sortingOrder = entitySchemaColumn.name + ":" + orderDirection.value + ":";
						sortingOrderInfo = !sortingOrderInfo
							? sortingOrder + "1"
							: sortingOrderInfo + "," + sortingOrder + "0";
					}, this);
				}
				var parameter = element.findParameterByName("OrderInfo");
				var parameterValue = {
					source: !sortingOrderInfo
						? this.Terrasoft.ProcessSchemaParameterValueSource.None
						: this.Terrasoft.ProcessSchemaParameterValueSource.ConstValue,
					value: sortingOrderInfo
				};
				parameter.setMappingValue(parameterValue);
			},

			/**
			 * Saves the type of reading result.
			 * @private
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 */
			saveResultType: function(element) {
				if (!this.isAttributeChanged("DataReadMode")) {
					return;
				}
				let resultType;
				if (this.$DataReadMode) {
					switch (this.$DataReadMode.value) {
						case this.$DataReadModeEnum.FirstRecordFromTheSample:
							resultType = ProcessUserTaskConstants.READ_DATA_RESULT_TYPE.ENTITY;
							break;
						case this.$DataReadModeEnum.CalculateTheNumberOfRecords:
						case this.$DataReadModeEnum.ConsiderTheFunction:
							resultType = ProcessUserTaskConstants.READ_DATA_RESULT_TYPE.FUNCTION;
							break;
						case this.$DataReadModeEnum.ReadCollection:
							resultType = ProcessUserTaskConstants.READ_DATA_RESULT_TYPE.ENTITY_COLLECTION;
							break;
						default:
							resultType = ProcessUserTaskConstants.READ_DATA_RESULT_TYPE.ENTITY;
							break;
					}
				}
				const parameter = element.findParameterByName("ResultType");
				const sourceValue = {
					value: resultType,
					source: Terrasoft.ProcessSchemaParameterValueSource.ConstValue
				};
				parameter.setMappingValue(sourceValue);
			},

			/**
			 * Saves type of the aggregate function.
			 * @private
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 */
			saveAggregateFunctionType: function(element) {
				var aggregateFunction = this.get("AggregateFunction");
				var aggregateFunctionEnum = this.get("AggregateFunctionEnum");
				aggregateFunction = aggregateFunction ? aggregateFunction.value : aggregateFunctionEnum.Count;
				var parameter = element.findParameterByName("FunctionType");
				var sourceValue = {
					value: aggregateFunction,
					source: Terrasoft.ProcessSchemaParameterValueSource.ConstValue
				};
				parameter.setMappingValue(sourceValue);
			},

			/**
			 * Saves aggregate column name.
			 * @private
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 */
			saveAggregateColumnName: function(element) {
				var aggregateColumn = this.get("AggregateColumn");
				var source = this.Terrasoft.ProcessSchemaParameterValueSource.None;
				var aggregateColumnName = null;
				if (aggregateColumn) {
					source = this.Terrasoft.ProcessSchemaParameterValueSource.ConstValue;
					aggregateColumnName = aggregateColumn.name;
				}
				var parameter = element.findParameterByName("AggregationColumnName");
				var sourceValue = {
					value: aggregateColumnName,
					source: source
				};
				parameter.setMappingValue(sourceValue);
			},

			/**
			 * @private
			 */
			saveNumberOfRecords: function(element) {
				const rowsCount = this.$NumberOfRecords && this.$NumberOfRecords.toString();
				let parameter = element.findParameterByName("NumberOfRecords");
				parameter.setMappingValue({
					value: rowsCount,
					source: Terrasoft.ProcessSchemaParameterValueSource.ConstValue
				});
				parameter = element.findParameterByName("ReadSomeTopRecords");
				parameter.setMappingValue({
					value: rowsCount !== 0,
					source: Terrasoft.ProcessSchemaParameterValueSource.ConstValue
				});
			},

			/**
			 * Initializes collection of the entity schema column.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			initEntitySchemaColumns: function(callback, scope) {
				this.getEntitySchemaColumnsSelect(callback, scope);
			},

			/**
			 * Initializes collection of selected entity schema column.
			 * @private
			 * @param {Array} columnMetaPaths List of the column meta path.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			initSelectedEntitySchemaColumns: function(columnMetaPaths, callback, scope) {
				this.initEntitySchemaColumnsSelect(columnMetaPaths, callback, scope);
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc ProcessSchemaElementEditable#onElementDataLoad
			 * @overridden
			 */
			onElementDataLoad: function(element, callback, scope) {
				this.callParent([element, function() {
					this.$ProcessSchema = element.parentSchema;
					this.initDataReadMode(element);
					this.initColumnSelectMode(element);
					this.initAggregateFunction(element);
					this.Terrasoft.chain(
						function(next) {
							var columnMetaPaths = this.getEntityColumnMetapaths(element);
							if (!this.Ext.isEmpty(columnMetaPaths)) {
								this.initSelectedEntitySchemaColumns(columnMetaPaths, next, this);
							} else {
								this.initEntitySchemaColumns(next, this);
							}
						},
						function(next) {
							this.initPrimaryDisplayColumn(next, this);
						},
						this._initDefaultNumberOfRecords,
						function() {
							this._initNumberOfRecords(element);
							this.initAggregateColumn(element);
							this.initSortingOrderControls(element);
							this.updateContainersVisibility();
							this._subscribeOnEntitySchemaColumnsControlsSelectEvents();
							callback.call(scope || this);
						},
						this);
				}, this]);
			},

			/**
			 * Generates configuration view of the sorting order element.
			 * @private
			 * @param {Object} itemConfig Link to configuration of element in ContainerList.
			 */
			getSelectedSortingOrderViewConfig: function(itemConfig) {
				var defaultViewConfig = this.get("SortingOrderViewConfig");
				if (defaultViewConfig) {
					itemConfig.config = defaultViewConfig;
					return;
				}
				var sortingOrderItemsConfig = this.getSortingOrderViewConfig();
				var item = this.getContainerConfig("default-value-container", ["sorting-order-container"],
					sortingOrderItemsConfig);
				var wrapClassNames = ["top-caption-control", "control-width-15"];
				itemConfig.config = this.getContainerConfig("item-view", wrapClassNames, [item]);
				this.set("SortingOrderViewConfig", itemConfig.config);
			},

			/**
			 * @inheritdoc FilterModuleMixin#initReferenceSchemaUId
			 * @overridden
			 */
			initReferenceSchemaUId: function(element) {
				var parameter = element.findParameterByName("ResultEntity");
				var value = parameter.referenceSchemaUId;
				this.set("ReferenceSchemaUId", value);
			},

			/**
			 * @inheritdoc BaseDataModificationUserTaskPropertiesPage#updateReferenceSchema
			 * @overridden
			 */
			onUpdatedEntitySchema: function() {
				this.callParent(arguments);
				var value = this.get("EntitySchemaColumnsSelect");
				if (value) {
					value.clear();
				}
				this.getEntitySchemaColumnsSelect(function() {
					this.initPrimaryDisplayColumn(function() {
						this.clearAndSetDefValues();
						this.updateContainersVisibility();
						this._syncronizeResultCompositeObjectList();
					}, this);
				}, this);
			},

			/**
			 * @inheritdoc EntitySchemaSelectMixin#getEntitySchemaColumnSelect
			 * @overridden
			 */
			getEntitySchemaColumnSelect: function(config) {
				var columnDescriptor = this.callParent(arguments);
				columnDescriptor.dataValueType = config.dataValueType;
				return columnDescriptor;
			},

			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#saveValues
			 * @overridden
			 */
			saveValues: function() {
				var element = this.get("ProcessElement");
				this.saveResultType(element);
				this.saveAggregateFunctionType(element);
				this.saveAggregateColumnName(element);
				this.saveEntityColumnMetaPaths(element);
				this.saveSortingOrderInfo(element);
				this.saveNumberOfRecords(element);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc FilterModuleMixin#saveReferenceSchemaUId
			 * @overridden
			 */
			saveReferenceSchemaUId: function(element) {
				if (!this.isAttributeChanged("ReferenceSchemaUId")) {
					return;
				}
				var referenceSchemaUId = this.get("ReferenceSchemaUId");
				var parameter = element.findParameterByName("ResultEntity");
				var dataReadMode = this.get("DataReadMode");
				var dataReadModeEnum = this.get("DataReadModeEnum");
				parameter.isResult = dataReadMode.value === dataReadModeEnum.FirstRecordFromTheSample;
				var parameterValue = {
					source: Terrasoft.ProcessSchemaParameterValueSource.ConstValue,
					referenceSchemaUId: referenceSchemaUId
				};
				parameter.setMappingValue(parameterValue);
			},

			/**
			 * Updates visibility of containers.
			 * @protected
			 */
			updateContainersVisibility: function() {
				let isVisible = Boolean(this.$EntitySchemaSelect);
				let dataReadMode = this.$DataReadMode;
				dataReadMode = dataReadMode
					? dataReadMode.value
					: this.$DataReadModeEnum.FirstRecordFromTheSample;
				this.$IsSelectAggregateFunctionContainerVisible =
					isVisible && dataReadMode === this.$DataReadModeEnum.ConsiderTheFunction;
				isVisible = isVisible && (dataReadMode === this.$DataReadModeEnum.FirstRecordFromTheSample ||
					dataReadMode === this.$DataReadModeEnum.ReadCollection);
				this.$IsReadCollectionModeVisible =
					isVisible && dataReadMode === this.$DataReadModeEnum.ReadCollection;
				this.$IsOrderDirectionContainerVisible = isVisible;
				this.$IsColumnSelectModeVisible = isVisible;
				isVisible = isVisible && this.$ColumnSelectMode &&
					this.$ColumnSelectMode.value === this.$ColumnSelectModeEnum.ReadOnlySelectedColumns;
				this.$IsEntitySchemaColumnsContainerVisible = isVisible;
			},

			/**
			 * Handles modification event of the column selection mode.
			 * @protected
			 */
			onColumnSelectModeChanged: function() {
				const previous = this.getPrevious("ColumnSelectMode");
				const previousValue = previous && previous.value;
				if (previousValue === this.$ColumnSelectModeEnum.ReadAllColumns) {
					this._actualizeSelectedEntitySchemaColumns();
				} else {
					var value = this.get("EntitySchemaColumnsControlsSelect");
					if (value) {
						value.clear();
					}
					var columns = this.get("EntitySchemaColumnsSelect");
					if (columns) {
						columns.each(function (column) {
							column.selected = false;
						}, this);
					}
				}
				this.updateContainersVisibility();
				this._syncronizeResultCompositeObjectList();
			},

			/**
			 * Handles modification event of the aggregate function.
			 * @protected
			 */
			onAggregateFunctionChanged: function() {
				this.set("AggregateColumn", null);
			},

			/**
			 * Handles modification event of the data read mode.
			 * @protected
			 */
			onDataReadModeChanged: function(model, value, options) {
				if (options && options.ignoreHandling) {
					return;
				}
				const previousValue = this.getPrevious("DataReadMode");
				const validate = previousValue && previousValue.value === this.$DataReadModeEnum.ReadCollection;
				const validationResult = validate ? this._canRemoveElementValidator() : { isValid: true };
				this._elementChangeValidationHandler(
					validationResult,
					function() {
						this._syncronizeResultCompositeObjectList();
						if (this.$DataReadMode) {
							this.clearAndSetDefValues();
							this.updateContainersVisibility();
						}
					},
					function() {
						this.set("DataReadMode", previousValue, {
							ignoreHandling: true
						});
					},
					this
				);
			},

			/**
			 * Clears attribute values.
			 * @protected
			 */
			clearValues: function() {
				var value = this.get("EntitySchemaColumnsControlsSelect");
				if (value) {
					value.clear();
				}
				value = this.get("SortingOrderControls");
				if (value) {
					value.clear();
				}
			},

			/**
			 * Clears and determines default values.
			 * @protected
			 */
			clearAndSetDefValues: function() {
				this.clearValues();
				const aggregateFunctionList = this.getAggregateFunctions();
				const columnSelectModes = this.getColumnSelectModes();
				this.$AggregateFunction = aggregateFunctionList[this.$AggregateFunctionEnum.Count];
				this.$ColumnSelectMode = columnSelectModes[this.$ColumnSelectModeEnum.ReadAllColumns];
				switch (this.$DataReadMode.value) {
					case this.$DataReadModeEnum.FirstRecordFromTheSample:
						this.addSortingOrderStatement();
						break;
					case this.$DataReadModeEnum.ConsiderTheFunction:
						this.$AggregateFunction = aggregateFunctionList[this.$AggregateFunctionEnum.Sum];
						this.setValidationInfo("AggregateFunction", true, null);
						break;
					default:
						break;
				}
				this.$AggregateColumn = null;
				this.setValidationInfo("AggregateColumn", true, null);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
			 * @overridden
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("NumberOfRecords", this._rowsCountRangeValidator);
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @overridden
			 */
			onDestroy: function() {
				this.$EntitySchemaColumnsControlsSelect.destroy();
				this.callParent(arguments);
			},

			//endregion

			//region Methods: Public

			/**
			 * Returns data read modes.
			 * @public
			 * @return {Object}
			 */
			getDataReadModes: function() {
				var dataReadModeEnum = this.get("DataReadModeEnum");
				var localizableStrings = resources.localizableStrings;
				var dataReadModes = {};
				dataReadModes[dataReadModeEnum.FirstRecordFromTheSample] = {
					value: dataReadModeEnum.FirstRecordFromTheSample,
					displayValue: localizableStrings.FirstRecordFromTheSampleCaption
				};
				dataReadModes[dataReadModeEnum.ConsiderTheFunction] = {
					value: dataReadModeEnum.ConsiderTheFunction,
					displayValue: localizableStrings.ConsiderTheFunctionCaption
				};
				dataReadModes[dataReadModeEnum.CalculateTheNumberOfRecords] = {
					value: dataReadModeEnum.CalculateTheNumberOfRecords,
					displayValue: localizableStrings.CalculateTheNumberOfRecordsCaption
				};
				if (!this.isProcessSchemaCompiled() &&
					(Terrasoft.isDebug || this.getIsFeatureEnabled("ProcessParameterCollections"))) {
					dataReadModes[dataReadModeEnum.ReadCollection] = {
						value: dataReadModeEnum.ReadCollection,
						displayValue: localizableStrings.ReadCollectionCaption
					};
				}
				return dataReadModes;
			}

			//endregion

		},
		diff: [
			{
				"operation": "insert",
				"name": "DataReadModeLabelContainer",
				"parentName": "BaseDataModificationLayout",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"classes": {
						"wrapClassName": ["not-compile", "label-container"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "DataReadModeLabel",
				"parentName": "DataReadModeLabelContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Resources.Strings.DataReadModeCaption"
					},
					"classes": {
						"labelClass": ["t-title-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "DataReadModeLabelContainer",
				"propertyName": "items",
				"name": "DataReadModeLabelInfoButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": Terrasoft.Resources.ProcessSchemaDesigner.Messages.CollectionInCompileProcessInfoText,
					"controlConfig": {
						"visible": "$isProcessSchemaCompiled"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "BaseDataModificationLayout",
				"propertyName": "items",
				"name": "DataReadMode",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"prepareList": {
							"bindTo": "prepareDataReadModes"
						}
					},
					"labelConfig": {
						"visible": false
					},
					"wrapClass": ["no-caption-control"]
				}
			},
			{
				"operation": "merge",
				"name": "RecommendationLabel",
				"values": {
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "merge",
				"name": "EntitySchemaSelect",
				"values": {
					"layout": {
						"column": 0,
						"row": 3,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"name": "SelectAggregateFunctionLabel",
				"parentName": "BaseDataModificationLayout",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 4,
						"colSpan": 24
					},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Resources.Strings.SelectAggregateFunctionCaption"
					},
					"classes": {
						"labelClass": ["t-title-label-proc"]
					},
					"visible": {
						"bindTo": "IsSelectAggregateFunctionContainerVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "BaseDataModificationLayout",
				"propertyName": "items",
				"name": "AggregateFunction",
				"values": {
					"layout": {
						"column": 0,
						"row": 5,
						"colSpan": 24
					},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"prepareList": {"bindTo": "prepareAggregateFunctionList"}
					},
					"labelConfig": {
						"visible": false
					},
					"wrapClass": ["no-caption-control"],
					"visible": {
						"bindTo": "IsSelectAggregateFunctionContainerVisible"
					}
				}
			},
			{
				"operation": "insert",
				"name": "SelectAggregateColumnLabel",
				"parentName": "BaseDataModificationLayout",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 6,
						"colSpan": 24
					},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Resources.Strings.SelectAggregateColumnCaption"
					},
					"classes": {
						"labelClass": ["t-title-label-proc"]
					},
					"visible": {
						"bindTo": "IsSelectAggregateFunctionContainerVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "BaseDataModificationLayout",
				"propertyName": "items",
				"name": "AggregateColumn",
				"values": {
					"layout": {
						"column": 0,
						"row": 7,
						"colSpan": 24
					},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"prepareList": {
							"bindTo": "prepareAggregateColumnList"
						}
					},
					"labelConfig": {
						"visible": false
					},
					"wrapClass": ["no-caption-control"],
					"visible": {
						"bindTo": "IsSelectAggregateFunctionContainerVisible"
					},
					"enabled": {
						"bindTo": "AggregateFunction",
						"bindConfig": {
							"converter": function(aggregateFunction) {
								var aggregateFunctionEnum = this.get("AggregateFunctionEnum");
								return aggregateFunction &&
									aggregateFunction.value !== aggregateFunctionEnum.Count;
							}
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "FilterUnitLabel",
				"values": {
					"layout": {
						"column": 0,
						"row": 8,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "merge",
				"name": "ExtendedFiltersContainer",
				"values": {
					"layout": {
						"column": 0,
						"row": 9,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "BaseDataModificationLayout",
				"propertyName": "items",
				"name": "RowCountContainer",
				"values": {
					"layout": {
						"column": 0,
						"row": 10,
						"colSpan": 24
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["row-count-container"],
					"visible": {"bindTo": "IsReadCollectionModeVisible"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "RowCountContainer",
				"propertyName": "items",
				"name": "NumberOfRecords",
				"values": {
					"bindTo": "NumberOfRecords",
					"dataValueType": Terrasoft.DataValueType.INTEGER,
					"caption": "$Resources.Strings.ReadOnlyCaption"
				}
			},
			{
				"operation": "insert",
				"name": "MoreLabel",
				"parentName": "RowCountContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": "$Resources.Strings.RecordsCaption"
				}
			},
			{
				"operation": "insert",
				"name": "OrderDirectionLabel",
				"parentName": "BaseDataModificationLayout",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 11,
						"colSpan": 24
					},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Resources.Strings.OrderDirectionCaption"
					},
					"classes": {
						"labelClass": ["t-title-label-proc"]
					},
					"visible": {
						"bindTo": "IsOrderDirectionContainerVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "BaseDataModificationLayout",
				"propertyName": "items",
				"name": "SortingOrderContainer",
				"values": {
					"layout": {
						"column": 0,
						"row": 12,
						"colSpan": 24
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"visible": {
						"bindTo": "IsOrderDirectionContainerVisible"
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "SortingOrderContainer",
				"propertyName": "items",
				"name": "SelectedSortingOrderContainer",
				"values": {
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "Id",
					"collection": "SortingOrderControls",
					"onGetItemConfig": "getSelectedSortingOrderViewConfig",
					"classes": {
						"wrapClassName": ["record-column-values-container", "grid-layout"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "SortingOrderContainer",
				"propertyName": "items",
				"name": "AddSortingOrderButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {
						"bindTo": "Resources.Strings.AddSortingOrderButtonCaption"
					},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {
						"bindTo": "Resources.Images.AddButtonImage"
					},
					"classes": {
						"wrapperClass": ["add-record-column-values-button"]
					},
					"click": {
						"bindTo": "onAddSortingOrderButtonClick"
					}
				}
			},
			{
				"operation": "insert",
				"name": "ColumnSelectModeLabel",
				"parentName": "BaseDataModificationLayout",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 13,
						"colSpan": 24
					},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Resources.Strings.ColumnSelectModeCaption"
					},
					"classes": {
						"labelClass": ["t-title-label-proc"]
					},
					"visible": {
						"bindTo": "IsColumnSelectModeVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "BaseDataModificationLayout",
				"propertyName": "items",
				"name": "ColumnSelectMode",
				"values": {
					"layout": {
						"column": 0,
						"row": 14,
						"colSpan": 24
					},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"prepareList": {
							"bindTo": "prepareColumnSelectModes"
						}
					},
					"labelConfig": {
						"visible": false
					},
					"wrapClass": ["no-caption-control"],
					"visible": {
						"bindTo": "IsColumnSelectModeVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "EditorsContainer",
				"propertyName": "items",
				"name": "EntityColumnsContainer",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"layout": {
						"column": 0,
						"row": 15,
						"colSpan": 24
					},
					"items": [],
					"visible": {
						"bindTo": "IsEntitySchemaColumnsContainerVisible"
					},
					"wrapClass": ["entity-columns-container", "no-caption-control"]
				}
			},
			{
				"operation": "insert",
				"parentName": "EntityColumnsContainer",
				"propertyName": "items",
				"name": "RecordColumnValuesContainer",
				"values": {
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "Id",
					"collection": "EntitySchemaColumnsControlsSelect",
					"onGetItemConfig": "getEntitySchemaColumnsControlsSelectViewConfig",
					"itemPrefix": "Id",
					"classes": {
						"wrapClassName": ["record-column-values-container", "grid-layout"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "EntityColumnsContainer",
				"propertyName": "items",
				"name": "AddRecordColumnValuesButton",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {
						"bindTo": "Resources.Images.AddButtonImage"
					},
					"caption": {
						"bindTo": "Resources.Strings.AddEntitySchemaColumnButtonCaption"
					},
					"classes": {
						"wrapperClass": ["add-record-column-values-button"]
					},
					"click": {
						"bindTo": "onAddEntitySchemaColumnControlSelect"
					}
				}
			}
		]
	};
});


