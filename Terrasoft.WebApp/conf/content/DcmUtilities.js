Terrasoft.configuration.Structures["DcmUtilities"] = {innerHierarchyStack: ["DcmUtilities"]};
define("DcmUtilities", ["RightUtilities", "SectionManager", "DcmSchemaManager", "SysDcmSettingsManager"
], function(rightUtilities) {
	Ext.define("Terrasoft.configuration.DcmUtilities", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.DcmUtilities",
		singleton: true,

		//region Methods: Private

		/**
		 * Returns SysDcmSettings manager item.
		 * @private
		 * @param {Terrasoft.configuration.BaseSchemaViewModel} viewModel Page view model.
		 * @return {Terrasoft.manager.SysDcmSettingsManagerItem/null}
		 */
		findSysDcmSettingsItem: function(viewModel) {
			var moduleStructure = viewModel.getModuleStructure();
			if (!moduleStructure) {
				return null;
			}
			var sectionManagerItem = Terrasoft.SectionManager.findItem(moduleStructure.moduleId);
			if (!sectionManagerItem) {
				return null;
			}
			var sysModuleEntityId = sectionManagerItem.getSysModuleEntityId();
			var sysDcmSettingsItem = Terrasoft.SysDcmSettingsManager.findBySysModuleEntityId(sysModuleEntityId);
			return sysDcmSettingsItem;
		},

		/**
		 * Returns entity schema query for running dcm processes.
		 * @private
		 * @param {String} recordId Current record identifier.
		 * @param {String} entitySchemaUId Entity schema identifier.
		 * @return {Terrasoft.EntitySchemaQuery}
		 */
		getRunningProcessesEsq: function(recordId, entitySchemaUId) {
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "SysEntityCommonPrcEl",
				rowCount: 1
			});
			esq.addColumn("ProcessElement.SysProcess.SysSchema.UId", "UId");
			esq.addColumn("ProcessElement.SysProcess.SysSchema.Name", "Name");
			esq.filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
				"RecordId", recordId, Terrasoft.DataValueType.GUID));
			esq.filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
				"EntitySchemaUId", entitySchemaUId, Terrasoft.DataValueType.GUID));
			esq.filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
				"ProcessElement.SysProcess.SysSchema.ManagerName", "DcmSchemaManager"));
			return esq;
		},

		/**
		 * Returns running dcm process instances identifiers for current record.
		 * @private
		 * @param {String} recordId Current record identifier.
		 * @param {String} entitySchemaUId Entity schema identifier.
		 * @param {Function} callback The callback function.
		 * @param {Terrasoft.DcmSchemaManagerItem} callback.item Dcm schema manager item.
		 * @param {Object} scope The scope of callback function.
		 */
		_getRunningProcesses: function(recordId, entitySchemaUId, callback, scope) {
			if (!Terrasoft.Features.getIsEnabled('UseDcmServerEndPoint')) {
				const esq = this.getRunningProcessesEsq(recordId, entitySchemaUId);
				esq.getEntityCollection(function(result) {
					let managerItem = null;
					result.collection.each(function(record) {
						const uId = record.get('UId');
						const item = Terrasoft.DcmSchemaManager.findItem(uId);
						const itemEntitySchemaUId = item.getEntitySchemaUId();
						if (entitySchemaUId === itemEntitySchemaUId) {
							managerItem = item;
							return false;
						}
					}, this);
					callback.call(scope, managerItem);
				}, this);
			} else {
				const request = new Terrasoft.ParametrizedRequest({
					contractName: 'DcmRunningProcessRequest',
					config: {
						recordId: recordId,
						entitySchemaUId: entitySchemaUId
					}
				});
				request.execute(function(result) {
					let managerItem = null;
					if (result.rowsAffected === 1) {
						const uId = result.UId;
						const item = Terrasoft.DcmSchemaManager.findItem(uId);
						const itemEntitySchemaUId = item.getEntitySchemaUId();
						if (entitySchemaUId === itemEntitySchemaUId) {
							managerItem = item;
						}
					}
					callback.call(scope, managerItem);
				}, scope);
			}
		},

		/**
		 * Returns running dcm schema manager item for existing entity record.
		 * @private
		 * @param {Terrasoft.configuration.BaseSchemaViewModel} viewModel Page view model.
		 * @param {Function} callback The callback function.
		 * @param {Terrasoft.manager.DcmSchemaManagerItem} callback.item Actual DcmSchemaManager item.
		 * @param {Object} scope The scope of callback function.
		 */
		findRunningDcmSchemaManagerItem: function(viewModel, callback, scope) {
			const sysDcmSettingsItem = this.findSysDcmSettingsItem(viewModel);
			const recordId = viewModel.get("Id");
			if (sysDcmSettingsItem && recordId) {
				const entitySchemaUId = sysDcmSettingsItem.getEntitySchemaUId();
				this._getRunningProcesses(recordId, entitySchemaUId, callback, scope);
			} else {
				callback.call(scope, null);
			}
		},

		/**
		 * Returns collection of active dcm schema manager items for section.
		 * @private
		 * @param {string} sectionEntitySchemaUId Section entity schema uId.
		 * @return {Terrasoft.Collection}
		 */
		getSectionDcmSchemaManagerItems: function(sectionEntitySchemaUId) {
			return Terrasoft.DcmSchemaManager.filterByFn(function(dcmSchemaManagerItem) {
				var isSchemaActive = dcmSchemaManagerItem.getIsActive();
				var dcmEntitySchemaUId = dcmSchemaManagerItem.getEntitySchemaUId();
				return isSchemaActive && dcmEntitySchemaUId === sectionEntitySchemaUId;
			}, this);
		},

		/**
		 * Returns flag that indicates whether the viewModel match dcm schema filters.
		 * @private
		 * @param {Terrasoft.manager.DcmSchemaManagerItem} dcmSchemaManagerItem Dcm schema manager item.
		 * @param {Terrasoft.configuration.BaseSchemaViewModel} viewModel Page view model.
		 * @return {Boolean}
		 */
		getIsViewModelMatchDcmSchemaFilters: function(dcmSchemaManagerItem, viewModel) {
			var dcmSchemaFiltersGroup = dcmSchemaManagerItem.getFilterGroup();
			if (!dcmSchemaFiltersGroup || dcmSchemaFiltersGroup.isEmpty()) {
				return true;
			}
			var dcmSchemaFilters = dcmSchemaFiltersGroup.getItems();
			return _.every(dcmSchemaFilters, function(filterItem) {
				return this.checkFilter(filterItem, viewModel);
			}, this);
		},

		/**
		 * Returns flag that indicates whether the viewModel match filter item.
		 * @private
		 * @param {Terrasoft.data.filters.BaseFilter} filterItem Filter item.
		 * @param {Terrasoft.configuration.BaseSchemaViewModel} viewModel Page view model.
		 * @return {Boolean}
		 */
		checkFilter: function(filterItem, viewModel) {
			if (filterItem.isEnabled !== true) {
				return false;
			}
			switch (filterItem.filterType) {
				case Terrasoft.FilterType.IN:
					return this.checkInFilter(filterItem, viewModel);
				case Terrasoft.FilterType.IS_NULL:
					return this.checkIsNullFilter(filterItem, viewModel);
				default:
					return false;
			}
		},

		/**
		 * Returns view model column by filter left expression column path.
		 * @private
		 * @param {Terrasoft.configuration.BaseSchemaViewModel} viewModel Page view model.
		 * @param {Terrasoft.data.filters.BaseFilter} filterItem Filter item.
		 * @return {Object}
		 */
		getViewModelColumnByFilterItem: function(viewModel, filterItem) {
			var columnPath = filterItem.leftExpression.columnPath;
			var foundColumn = this.getViewModelColumnByPath(viewModel, columnPath);
			return foundColumn;
		},

		/**
		 * Returns view model column by column path.
		 * @param {Terrasoft.configuration.BaseSchemaViewModel} viewModel Page view model.
		 * @param {string} columnPath Column path.
		 * @return {Object}
		 */
		getViewModelColumnByPath: function(viewModel, columnPath) {
			var foundColumn = null;
			Terrasoft.each(viewModel.columns, function(column) {
				if (column.columnPath === columnPath) {
					foundColumn = column;
				}
				return foundColumn == null;
			});
			return foundColumn;
		},

		/**
		 * Returns flag that indicates whether the viewModel match InFilter.
		 * @private
		 * @param {Terrasoft.data.filters.InFilter} filterItem Filter item.
		 * @param {Terrasoft.configuration.BaseSchemaViewModel} viewModel Page view model.
		 * @return {Boolean}
		 */
		checkInFilter: function(filterItem, viewModel) {
			var column = this.getViewModelColumnByFilterItem(viewModel, filterItem);
			if (!column) {
				return false;
			}
			var columnDataValueType = column.dataValueType;
			var columnValue = viewModel.get(column.name);
			var viewModelColumnValue = this.getPrimitiveValue(columnDataValueType, columnValue);
			var isViewModelMatchFilter = Terrasoft.some(filterItem.rightExpressions, function(rightExpression) {
				var filterParameter = rightExpression.parameter;
				if (filterParameter.dataValueType !== columnDataValueType) {
					return false;
				}
				return this.compareFilterParameterValue(viewModelColumnValue, filterParameter);
			}, this);
			return isViewModelMatchFilter;
		},

		/**
		 * Returns flag that indicates whether the viewModel match IsNullFilter.
		 * @private
		 * @param {Terrasoft.data.filters.IsNullFilter} filterItem Filter item.
		 * @param {Terrasoft.configuration.BaseSchemaViewModel} viewModel Page view model.
		 * @return {Boolean}
		 */
		checkIsNullFilter: function(filterItem, viewModel) {
			var column = this.getViewModelColumnByFilterItem(viewModel, filterItem);
			if (!column) {
				return false;
			}
			var columnValue = viewModel.get(column.name);
			var viewModelColumnValue = this.getPrimitiveValue(column.dataValueType, columnValue);
			return viewModelColumnValue == null;
		},

		/**
		 * Compare filter parameter value with passed value.
		 * @private
		 * @param {Object} value Value to compare with filter.
		 * @param {Terrasoft.data.filters.Parameter} filterParameter Filter parameter.
		 * @return {Boolean}
		 */
		compareFilterParameterValue: function(value, filterParameter) {
			var filterValue = filterParameter.getValue();
			var filterParameterValue = this.getPrimitiveValue(filterParameter.dataValueType, filterValue);
			return filterParameterValue === value;
		},

		/**
		 * Returns primitive value by data value type.
		 * @private
		 * @param {Terrasoft.core.enums.DataValueType} dataValueType Data value type.
		 * @param {Object} value Value.
		 * @return {Object|null}
		 */
		getPrimitiveValue: function(dataValueType, value) {
			if (!value) {
				return null;
			}
			var isLookup = Terrasoft.isLookupDataValueType(dataValueType);
			return isLookup ? value.value : value;
		},

		/**
		 * Initialize managers.
		 * @private
		 * @param {Function} callback callback function.
		 */
		initializeManagers: function(callback) {
			const managers = [
				Terrasoft.SectionManager,
				Terrasoft.SysModuleEntityManager,
				Terrasoft.DcmSchemaManager,
				Terrasoft.SysDcmSettingsManager
			];
			Terrasoft.eachAsyncAll(managers, function(manager, next) {
				manager.initialize(next, this);
			}, callback, this);
		},

		/**
		 * Returns flag that indicates if section has any enabled dcm schema.
		 * @private
		 * @param {Terrasoft.configuration.BaseSchemaViewModel} viewModel Section or page view model.
		 */
		getHasAnyDcmSchema: function(viewModel) {
			var result = false;
			var sysDcmSettingsItem = this.findSysDcmSettingsItem(viewModel);
			if (sysDcmSettingsItem) {
				var entitySchemaUId = sysDcmSettingsItem.getEntitySchemaUId();
				result = !this.getSectionDcmSchemaManagerItems(entitySchemaUId).isEmpty();
			}
			return result;
		},

		//endregion

		//region Methods: Public

		/**
		 * Check rights for operation CanManageDcm.
		 * @param {Function} callback Callback method.
		 * @param {Boolean} callback.canManageDcm Flag that indicates whether the user has
		 * appropriate rights to manage dcm.
		 * @param {Object} scope Callback method context.
		 */
		checkCanManageDcmRights: function(callback, scope) {
			rightUtilities.checkCanExecuteOperation({"operation": "CanManageDcm"}, callback, scope);
		},

		/**
		 * Returns actual dcm schema uId for section or page view model.
		 * @param {Terrasoft.configuration.BaseSchemaViewModel} viewModel Section or page view model.
		 * @param {Function} callback Callback function.
		 * @param {string} callback.dcmSchemaUId Actual dcm schema uId.
		 * @param {Boolean} callback.hasAnyDcmSchema Flag that indicates if section has any enabled dcm schema.
		 * @param {Object} scope Callback function call context.
		 */
		getActualDcmSchemaUId: function(viewModel, callback, scope) {
			Terrasoft.chain(
				this.initializeManagers,
				function() {
					var dcmSchemaManagerItem = this.findActualDcmSchemaManagerItem(viewModel);
					var dcmSchemaUId = dcmSchemaManagerItem ? dcmSchemaManagerItem.getUId() : null;
					if (dcmSchemaUId) {
						callback.call(scope, dcmSchemaUId, true);
					} else {
						callback.call(scope, dcmSchemaUId, this.getHasAnyDcmSchema(viewModel));
					}
				},
				this
			);
		},

		/**
		 * Returns an array of column names by which SysDcmSettings filters were built.
		 * @param {Terrasoft.configuration.BaseSchemaViewModel} viewModel Section or page view model.
		 * @param {Function} callback Callback function.
		 * @param {string[]} callback.dcmSchemaUId Array of column names.
		 * @param {Object} scope Callback function call context.
		 */
		getFilteredColumns: function(viewModel, callback, scope) {
			var entitySchema = viewModel.entitySchema;
			if (!entitySchema) {
				callback.call(scope, []);
				return;
			}
			Terrasoft.chain(
				this.initializeManagers,
				function() {
					var sysDcmSettingsItem = this.findSysDcmSettingsItem(viewModel);
					var filteredColumns = [];
					if (sysDcmSettingsItem) {
						var filters = sysDcmSettingsItem.getFilters();
						filters.forEach(function(filter) {
							var entitySchemaColumn = entitySchema.findColumnByUId(filter.columnUId);
							if (!entitySchemaColumn) {
								return;
							}
							var viewModelColumn = this.getViewModelColumnByPath(viewModel, entitySchemaColumn.name);
							filteredColumns.push(viewModelColumn.name);
						}, this);
					}
					callback.call(scope, filteredColumns);
				},
				this
			);
		},

		/**
		 * @deprecated
		 */
		getIsDcmDesignerAvailable: function(viewModel, callback, scope) {
			if (!viewModel.entitySchema) {
				callback.call(scope, false);
				return;
			}
			this.checkCanManageDcmRights(callback, scope);
		},

		/**
		 * Returns running dcm schema identifier for existing entity record.
		 * @param {Terrasoft.configuration.BaseSchemaViewModel} viewModel Page view model.
		 * @param {Function} callback The callback function.
		 * @param {Terrasoft.manager.DcmSchemaManagerItem} callback.schemaUId Running dcm schema identifier.
		 * @param {Boolean} callback.isActive Flag that indicates dcm schema active state.
		 * @param {Object} scope The scope of callback function.
		 */
		findRunningDcmSchemaUId: function(viewModel, callback, scope) {
			if (viewModel.isNewMode()) {
				callback.call(scope, null);
				return;
			}
			Terrasoft.chain(
				this.initializeManagers,
				function(next) {
					this.findRunningDcmSchemaManagerItem(viewModel, next, this);
				},
				function(next, item) {
					var isActive = false;
					var schemaUId = null;
					if (item) {
						schemaUId = item.getUId();
						isActive = item.getIsActive();
					}
					callback.call(scope, schemaUId, isActive);
				},
				this
			);
		},

		/**
		 * Returns actual dcmSchemaManager item for page view model.
		 * If section has no SysDcmSettings records, returns null.
		 * @param {Terrasoft.configuration.BaseSchemaViewModel} viewModel Page view model.
		 * @return {Terrasoft.manager.DcmSchemaManagerItem/null}
		 */
		findActualDcmSchemaManagerItem: function(viewModel) {
			var sysDcmSettingsItem = this.findSysDcmSettingsItem(viewModel);
			if (!sysDcmSettingsItem) {
				return null;
			}
			var entitySchemaUId = sysDcmSettingsItem.getEntitySchemaUId();
			var dcmSchemaManagerItems = this.getSectionDcmSchemaManagerItems(entitySchemaUId).getItems();
			var actualManagerItem = _.find(dcmSchemaManagerItems, function(dcmSchemaManagerItem) {
				return this.getIsViewModelMatchDcmSchemaFilters(dcmSchemaManagerItem, viewModel);
			}, this);
			return actualManagerItem;
		},

		/**
		 * Returns whether view model has dcm schema.
		 * @param {Terrasoft.configuration.BaseSchemaViewModel} viewModel Page view model.
		 * @param {Function} callback The callback function.
		 * @param {Boolean} callback.result Flag that indicates whether view model has dcm schema or not.
		 * @param {Object} scope The scope of callback function.
		 */
		hasAnyDcmSchema: function(viewModel, callback, scope) {
			var enitySctructure = viewModel.entitySchema && viewModel.getEntityStructure();
			var entitySchemaUId = enitySctructure && enitySctructure.entitySchemaUId;
			if (!entitySchemaUId) {
				return callback.call(scope, false);
			}
			Terrasoft.chain(
				function(next) {
					Terrasoft.DcmSchemaManager.initialize(next, this);
				},
				function() {
					var dcmItem = Terrasoft.DcmSchemaManager.findByFn(function(item) {
						return item.getIsActive() && item.getEntitySchemaUId() === entitySchemaUId;
					}, this);
					var result = viewModel.isNotEmpty(dcmItem);
					callback.call(scope, result);
				}, this
			);
		}

		//endregion

	});
});


