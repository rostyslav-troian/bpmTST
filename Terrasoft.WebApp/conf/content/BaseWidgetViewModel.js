Terrasoft.configuration.Structures["BaseWidgetViewModel"] = {innerHierarchyStack: ["BaseWidgetViewModel"]};
define("BaseWidgetViewModel", ["terrasoft", "ext-base", "BaseWidgetViewModelResources", "QueryCancellationMixin",
	"DetailManager"], function(Terrasoft, Ext, resources) {

		Ext.define("Terrasoft.configuration.BaseWidgetViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.configuration.BaseWidgetViewModel",

			/**
			 * Ext framework.
			 * @type {Object}.
			 */
			Ext: null,

			/**
			 * Sandbox.
			 * @type {Object}.
			 */
			sandbox: null,

			/**
			 * Terrasoft framework.
			 * @type {Object}.
			 */
			Terrasoft: null,

			mixins: {
				QueryCancellationMixin: "Terrasoft.QueryCancellationMixin"
			},

			// region Properties: Protected

			/**
			 * Column is used for adding aggregation column to select query
			 * @protected
			 * @type {String}.
			 */
			aggregationColumnName: "aggregationColumn",

			// endregion

			// region Methods: private

			/**
			 * @private
			 */
			_getExcludedEntitySchemaNames: function() {
				return ["Dashboard", "OperatorSingleWindow"];
			},

			/**
			 * @private
			 */
			_getEntitySchemaNameByApplicationStructureItemId: function(config, callback, scope) {
				const id = config.applicationStructureItemId.toLowerCase();
				const modules = Ext.Object.getValues(Terrasoft.configuration.ModuleStructure);
				const module = modules.find(function(item) {
					return (item.moduleId && item.moduleId.toLowerCase()) === id;
				}, this);
				if (module) {
					callback.call(scope, module.entitySchemaName);
				} else {
					Terrasoft.DetailManager.initialize(function() {
						const detailManagerItems = Terrasoft.DetailManager.getItems();
						const detailManagerItem = detailManagerItems.firstOrDefault(function(item) {
							return item.getId().toLowerCase() === id;
						}, this);
						if (detailManagerItem) {
							callback.call(scope, detailManagerItem.getEntitySchemaName());
						} else {
							callback.call(scope, null);
						}
					}, this);
				}
			},

			/**
			 * @private
			 */
			_requireSectionEntitySchema: function(callback, scope) {
				const id = this.get("sectionId");
				if (id) {
					this._getEntitySchemaNameByApplicationStructureItemId({applicationStructureItemId: id}, function(entitySchemaName) {
						const excludedEntitySchemaNames = this._getExcludedEntitySchemaNames();
						if (entitySchemaName && !Terrasoft.contains(excludedEntitySchemaNames, entitySchemaName)) {
							this.set("sectionEntitySchemaName", entitySchemaName);
							Terrasoft.require([entitySchemaName], function(entitySchema) {
								Terrasoft[entitySchemaName] = entitySchema;
								callback.call(scope);
							}, this);
						} else {
							callback.call(scope);
						}
					}, this);
				} else {
					callback.call(scope);
				}
			},

			/**
			 * @private
			 */
			_getSectionSchemaBoundColumnPath: function(sectionBindingColumnPath, columnPath) {
				const sectionEntitySchema = Terrasoft[this.get("sectionEntitySchemaName")];
				const columnPathArray = sectionBindingColumnPath.split(".");
				const columnPathTpl = columnPathArray.length > 1 ? "{4}.[{0}:{1}:{2}].{3}" : "[{0}:{1}:{2}].{3}";
				const lastSectionBindingColumnPathElement = columnPathArray.pop();
				return Ext.String.format(columnPathTpl,
					sectionEntitySchema.name,
					sectionEntitySchema.primaryColumnName,
					lastSectionBindingColumnPathElement,
					columnPath,
					columnPathArray.join("."));
			},

			//endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseModel#getModelColumns
			 * @override
			 */
			getModelColumns: function() {
				const baseColumns = this.callParent(arguments);
				return this.Ext.apply(baseColumns, {
					caption: {
						type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
						dataValueType: Terrasoft.DataValueType.Text,
						value: null
					},
					value: {
						type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
						dataValueType: Terrasoft.DataValueType.Text,
						value: null
					}
				});
			},


			/**
			 * Does actions that required after page had been rendered.
			 * @protected
			 */
			onRender: this.Terrasoft.emptyFn,

			/**
			 * Initializes the initial values of the model.
			 * @protected
			 * @param {Function} callback The function that will be called upon completion.
			 * @param {Object} scope The context in which the callback function will be called.
			 */
			init: function(callback, scope) {
				this.prepareWidget(callback, scope);
			},

			/**
			 * Initializes the resource model with values from the object resources.
			 * @protected
			 * @param {Object} resourcesObj Resource object.
			 */
			initResourcesValues: function(resourcesObj) {
				const resourcesSuffix = "Resources";
				Terrasoft.each(resourcesObj, function(resourceGroup, resourceGroupName) {
					resourceGroupName = resourceGroupName.replace("localizable", "");
					Terrasoft.each(resourceGroup, function(resourceValue, resourceName) {
						const viewModelResourceName = [resourcesSuffix, resourceGroupName, resourceName].join(".");
						this.set(viewModelResourceName, resourceValue);
					}, this);
				}, this);
			},

			/**
			 * Prepares indicator parameters
			 * @protected
			 * @param {Function} callback The function that will be called upon completion.
			 * @param {Object} scope The context in which the callback function will be called.
			 */
			prepareWidget: function(callback, scope) {
				if (this.get("entitySchemaName")) {
					Terrasoft.chain(
						function(next) {
							this._requireSectionEntitySchema(next, this);
						},
						function(next) {
							const select = this.createSelect();
							select.getEntityCollection(next, this);
							const key = this.sandbox.id;
							this.mixins.QueryCancellationMixin.registerSentQuery.call(this, key, select);
						},
						function(next, response) {
							if (!response.success || this.destroyed) {
								return;
							}
							const resultEntity = response.collection.getByIndex(0);
							this.set("value", resultEntity.get("value"));
							callback.call(scope);
						},
						this
					);
				} else {
					callback.call(scope);
				}
			},

			/**
			 * Updates module filters by module configuration.
			 * @protected
			 * @param {Terrasoft.FilterGroup} quickFilter Filter.
			 * @param {String} sectionBindingColumnPath Column connection with section.
			 */
			updateModuleFilter: function(quickFilter, sectionBindingColumnPath) {
				const leftExpression = quickFilter.leftExpression;
				if (!Ext.isEmpty(leftExpression)) {
					if (leftExpression.columnPath) {
						leftExpression.columnPath = this._getSectionSchemaBoundColumnPath(
							sectionBindingColumnPath, leftExpression.columnPath);
					}
					const leftExpressionFunctionArgument = leftExpression.functionArgument;
					if (leftExpression.expressionType === Terrasoft.ExpressionType.FUNCTION && leftExpressionFunctionArgument) {
						leftExpressionFunctionArgument.columnPath = this._getSectionSchemaBoundColumnPath(
							sectionBindingColumnPath, leftExpressionFunctionArgument.columnPath);
					}
				} else {
					quickFilter.each(function(item) {
						this.updateModuleFilter(item, sectionBindingColumnPath);
					}, this);
				}
			},

			/**
			 * Performs data selection.
			 * @protected
			 * @return {Terrasoft.EntitySchemaQuery} select Contains selected and filtered data.
			 */
			createSelect: function(selectParameters) {
				const select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: this.get("entitySchemaName"),
					isBatchable: Terrasoft.Features.getIsEnabled("BatchableDashboardQueryFeature")
				});
				Terrasoft.each(Object.keys(selectParameters || {}), function(parameter) {
					select[parameter] = selectParameters[parameter];
				});
				this.addAggregationColumn(select);
				const filterData = this.get("filterData");
				const filters = Ext.isString(filterData) ? Terrasoft.deserialize(filterData) : Ext.create("Terrasoft.FilterGroup");
				select.filters.addItem(filters);
				const quickFilters = this.getQuickFilters();
				if (!Ext.isEmpty(quickFilters)) {
					select.filters.addItem(quickFilters);
				}
				return select;
			},

			/**
			 * Adds an aggregation column based on the aggregation type from the config.
			 * @protected
			 * @param {Object} select Data selection.
			 */
			addAggregationColumn: function(select) {
				const aggregationType = this.get("aggregationType");
				const aggregationColumnName = this.get(this.aggregationColumnName) || "Id";
				select.addAggregationSchemaColumn(aggregationColumnName, aggregationType, "value");
			},

			// endregion

			// region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#constructor
			 * @override
			 */
			constructor: function() {
				this.callParent(arguments);
				this.initResourcesValues(resources);
			},

			/**
			 * Method for subscribe by default for afterrender and afterrerender.
			 */
			loadModule: this.Terrasoft.emptyFn,

			/**
			 * Returns filters based on section filters.
			 * @return {Object} Filters based on section filters.
			 */
			getQuickFilters: function() {
				const sectionBindingColumn = this.get("sectionBindingColumn");
				if (Ext.isEmpty(this.get("sectionId")) || Ext.isEmpty(sectionBindingColumn)) {
					return this.Ext.create("Terrasoft.FilterGroup");
				}
				if (this.get("primaryColumnValue")) {
					const filter = this.Ext.create("Terrasoft.FilterGroup");
					filter.addItem(Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "Id", this.get("primaryColumnValue")));
					this.updateModuleFilter(filter, sectionBindingColumn);
					return filter;
				}
				const quickFilter = this.sandbox.publish("GetFiltersCollection", null);
				if (quickFilter) {
					const sectionEntitySchema = Terrasoft[this.get("sectionEntitySchemaName")];
					const primaryColumnName = sectionEntitySchema && sectionEntitySchema.primaryColumnName;
					if (!quickFilter.getIsEnabled() && primaryColumnName) {
						quickFilter.addItem(Terrasoft.createColumnIsNotNullFilter(primaryColumnName));
					}
					if (sectionEntitySchema && sectionEntitySchema.name) {
						this.updateModuleFilter(quickFilter, sectionBindingColumn);
					}
				}
				return quickFilter;
			}

			// endregion

		});
	});


