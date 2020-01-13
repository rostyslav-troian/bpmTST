Terrasoft.configuration.Structures["CustomFilterViewModelV2"] = {innerHierarchyStack: ["CustomFilterViewModelV2"]};
define("CustomFilterViewModelV2", ["ext-base", "terrasoft", "CustomFilterViewModelV2Resources", "ConfigurationEnums",
		"CustomFilterViewV2", "QuickFilterViewV2Resources", "ConfigurationConstants", "SearchableTextEdit",
		"FolderFilterItemViewModel"],
	function(Ext, Terrasoft, resources, ConfigurationEnums, CustomFilterView, quickFilterViewResources,
		ConfigurationConstants) {

		var customFilterPrefix = "customFilter";

		function generate(config) {
			var values = {
				Ext: config.Ext,
				sandbox: config.sandbox,
				containerId: "QuickFilterModuleContainer",
				primaryDisplayColumnConfig: null,
				primaryDisplayColumnFilterTag: null,
				quickFilterKey: config.quickFilterKey,
				filters: new Terrasoft.Collection(),
				filtersViews: new Terrasoft.Collection(),
				currentFilterName: null,
				simpleFilterColumnList: new Terrasoft.Collection(),
				booleanValueColumnList: new Terrasoft.Collection(),
				lookupValueColumnList: new Terrasoft.Collection(),
				buttonCaption: resources.localizableStrings.FiltersCaption,
				columnEditVisible: true,
				isExtendedModeHidden: Ext.isEmpty(config.isExtendedModeHidden) ? true : config.isExtendedModeHidden,
				isFoldersHidden: Ext.isEmpty(config.isFoldersHidden) ? true : config.isFoldersHidden,
				hasExtendedMode: Ext.isEmpty(config.hasExtendedMode) ? true : config.hasExtendedMode,
				hasFolders: Ext.isEmpty(config.hasFolders) ? true : config.hasFolders,
				ActiveFolder: null,
				ActionsMenu: Ext.create("Terrasoft.BaseViewModelCollection"),
				IsSeparateMode: true,
				customFilterContainerName: config.customFilterContainerName,
				simpleFilterEditContainerName: config.simpleFilterEditContainerName,
				StringColumnSearchComparisonType: config.StringColumnSearchComparisonType,
				isShortFilterVisible: Ext.isEmpty(config.isShortFilterVisible) ? false : config.isShortFilterVisible,
				allowedColumns: config && config.allowedColumns || null,
				filterIcon: config && config.filterIcon || resources.localizableImages.ImageFilter,
				showSelectedColumnCaption: true,
				useSingleColumnFilter: false
			};
			if (config.values) {
				Ext.apply(values, config.values);
			}
			values.userButtonCaption = values.buttonCaption;
			var viewModelConfig = {
				entitySchema: config.entitySchema,
				folderEntitySchema: config.folderEntitySchema,
				columns: {
					buttonCaption: {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						name: "buttonCaption"
					},
					simpleFilterColumn: {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						name: "simpleFilterColumn"
					},
					booleanValueColumnList: {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						name: "booleanValueColumnList",
						isCollection: true
					},
					lookupValueColumnList: {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						name: "lookupValueColumnList",
						isCollection: true
					},
					simpleFilterColumnList: {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						name: "simpleFilterColumnList",
						isCollection: true
					},
					simpleFilterValueColumn: {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						name: "simpleFilterValueColumn"
					},
					filterIcon: {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						name: "filterIcon"
					}
				},
				values: values,
				methods: {
					getFilters: getFilters,
					clearConditions: clearConditions,
					subscribeForCollectionEvent: subscribeForCollectionEvent,
					initFiltersContainer: initFiltersContainer,
					init: init,
					initialize: initialize,
					updateButtonCaption: updateButtonCaption,
					loadFilterViews: loadFilterViews,
					addFilterView: addFilterView,
					removeFilterView: removeFilterView,
					clear: clear,
					clearFilterViews: clearFilterViews,
					getSimpleFilterColumnList: getSimpleFilterColumnList,
					simpleFilterColumnChange: simpleFilterColumnChange,
					cancelSimpleFilter: clearSimpleFilterProperties,
					isColumnDeprecated: isColumnDeprecated,

					/**
					 * Creates active folder filter.
					 * @private
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Execution context.
					 */
					createActiveFolderFilter: function(callback, scope) {
						var folderFilter = this.getFolderFilter();
						if (Ext.isEmpty(folderFilter)) {
							Ext.callback(callback, scope);
						} else {
							this.requireFolderSchema(folderFilter.sectionEntityScheamName, function(entityFolderSchema) {
								var activeFolder = Ext.create("Terrasoft.FolderFilterItemViewModel", {
									entitySchema: entityFolderSchema,
									columns: Terrasoft.deepClone(entityFolderSchema.columns),
									isNew: false
								});
								activeFolder.set(entityFolderSchema.primaryColumnName, Terrasoft.generateGUID());
								activeFolder.set("Id", folderFilter.value);
								activeFolder.set("Name", folderFilter.displayValue);
								activeFolder.set("FolderType", folderFilter.folderType);
								activeFolder.set("SearchData", folderFilter.filter);
								Ext.callback(callback, scope, [{
									folder: activeFolder,
									filter: Terrasoft.deserialize(folderFilter.filter)
								}]);
							}, this);
						}
					},

					/**
					 * Sends message to close page.
					 * @private
					 */
					closeCard: function() {
						var sandbox = this.getSandbox();
						sandbox.publish("CloseCard", null, [sandbox.id]);
					},

					/**
					 * Requires folder schema.
					 * @private
					 * @param {String} rootSchemaName Root schema name.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Execution context.
					 */
					requireFolderSchema: function(rootSchemaName, callback, scope) {
						var folderSchemaName = Ext.String.format("{0}Folder", rootSchemaName);
						Terrasoft.require([folderSchemaName], function(entityFolderSchema) {
							Ext.callback(callback, scope, [entityFolderSchema]);
						}, this);
					},

					/**
					 * Applies simple filter.
					 * @protected
					 */
					applySimpleFilter: function() {
						var simpleFilterColumn = this.get("simpleFilterColumn");
						var simpleFilterValue = this.get("simpleFilterValueColumn");
						if (simpleFilterColumn && !Ext.isEmpty(simpleFilterValue)) {
							this.addSimpleFilterValue(simpleFilterColumn, simpleFilterValue);
							this.destroySimpleFilterAddingContainer();
						}
					},

					/**
					 * @private
					 */
					_getFilterConfig: function() {
						var filterConfig = this.generateFilterViewModelConfig();
						filterConfig.methods.editFilter = function(tag) {
							this.editSimpleFilter(tag);
						}.bind(this);
						filterConfig.methods.getFilter = this.getSimpleFilter;
						return filterConfig;
					},

					/**
					 * @private
					 */
					_getSimpleFilter: function(filterColumn, filterValue) {
						var dataValueType = filterColumn.dataValueType;
						var filterName = this._getFilterName(filterColumn.value);
						var filterConfig = this._getFilterConfig();
						var filterDisplayValue = this.getFilterDisplayValue(filterColumn, filterValue);
						var simpleFilter = this.getFilterViewModel(filterName, filterConfig);
						simpleFilter.set("filterName", filterName);
						simpleFilter.set("columnName", filterColumn.value);
						simpleFilter.set("columnCaption", filterColumn.displayValue);
						simpleFilter.set("dataValueType", dataValueType);
						simpleFilter.set("displayValue", filterDisplayValue);
						return simpleFilter;
					},

					/**
					 * @private
					 */
					_getFilterName: function(filterColumnValue) {
						var filterName = customFilterPrefix + filterColumnValue + this.get("quickFilterKey");
						return filterName;
					},

					/**
					 * @private
					 */
					_setFilterValue: function(simpleFilter, filterValue, useValidate, dataValueType) {
						var useNewLookupComparison = Terrasoft.Features.getIsEnabled("UseNewLookupComparison");
						var newFilterValue = filterValue;
						if (useNewLookupComparison) {
							newFilterValue = filterValue && filterValue.value || filterValue;
						}
						if (useValidate) {
							newFilterValue = this.validateFilterValue(dataValueType, newFilterValue);
						}
						simpleFilter.set("value", newFilterValue);
					},

					_setFilterReferenceSchema: function(simpleFilter, filterColumn) {
						simpleFilter.set("referenceSchemaName", filterColumn.referenceSchemaName);
						if (filterColumn.primaryDisplayColumnName) {
							simpleFilter.set("referenceSchemaPrimaryDisplayColumnName",
									filterColumn.primaryDisplayColumnName);
							this.filterChanged();
						} else {
							var self = this;
							require([filterColumn.referenceSchemaName], function(schema) {
								simpleFilter.set("referenceSchemaPrimaryDisplayColumnName",
										schema.primaryDisplayColumnName);
								self.filterChanged();
							}, this);
						}
					},

					/**
					 * Adds filter to filters collection.
					 * @protected
					 * @param {Object} filterColumn Filter column.
					 * @param {String|Object} filterValue Filter value.
					 */
					addSimpleFilterValue: function(filterColumn, filterValue) {
						var filters = this.get("filters");
						var oldFilterName = this.get("currentFilterName");
						var filterName = this._getFilterName(filterColumn.value);
						if (oldFilterName && filterName !== oldFilterName) {
							filters.removeByKey(oldFilterName);
						}
						var simpleFilter = filters.find(filterName);
						if (!simpleFilter) {
							var dataValueType = filterColumn.dataValueType;
							simpleFilter = this._getSimpleFilter(filterColumn, filterValue);
							this._setFilterValue(simpleFilter, filterValue, true, dataValueType);
							filters.add(filterName, simpleFilter);
							if (filterColumn.referenceSchemaName) {
								this._setFilterReferenceSchema(simpleFilter, filterColumn);
							} else {
								this.filterChanged();
							}
						} else {
							var filterDisplayValue = this.getFilterDisplayValue(filterColumn, filterValue);
							this._setFilterValue(simpleFilter, filterValue, false);
							simpleFilter.set("displayValue", filterDisplayValue);
							this.filterChanged();
						}
					},

					/**
					 * Gets filter display value.
					 * @private
					 * @param {Object} filterColumn Filter column.
					 * @param {String|Object} filterValue Filter value.
					 * @return {String}
					 */
					getFilterDisplayValue: function(filterColumn, filterValue) {
						var displayValue;
						var dataValueType = filterColumn.dataValueType;
						switch (dataValueType) {
							case Terrasoft.DataValueType.ENUM:
							case Terrasoft.DataValueType.LOOKUP:
								displayValue = this._getLookupColumnDisplayValue(filterValue);
								break;
							case Terrasoft.DataValueType.DATE_TIME:
							case Terrasoft.DataValueType.DATE:
								displayValue = this._getDateColumnDisplayValue(filterValue);
								break;
							case Terrasoft.DataValueType.BOOLEAN:
								displayValue = filterValue.displayValue;
								break;
							default:
								displayValue = Terrasoft.getTypedStringValue(
									filterValue.displayValue ? filterValue.displayValue : filterValue, dataValueType);
								break;
						}
						return displayValue;
					},

					/**
					 * Set display value for enum or lookup column.
					 * @private
					 */
					_getLookupColumnDisplayValue: function(filterValue) {
						var displayValue;
						if (Terrasoft.Features.getIsEnabled("UseNewLookupComparison")) {
							displayValue = filterValue && filterValue.displayValue || filterValue;
						} else {
							displayValue = filterValue;
						}
						return displayValue;
					},

					/**
					 * Set display value for date column.
					 * @private
					 */
					_getDateColumnDisplayValue: function(filterValue) {
						var displayValue;
						var date = filterValue;
						if (Ext.isString(date)) {
							date = new Date(date);
						}
						displayValue = Terrasoft.getTypedStringValue(date, Terrasoft.DataValueType.DATE);
						return displayValue;
					},

					/**
					 * Returns valid filter value.
					 * @private
					 * @param {Terrasoft.core.enums.DataValueType} dataValueType Data value type.
					 * @param {Object} filterValue Filter value.
					 * @return {Object}
					 */
					validateFilterValue: function(dataValueType, filterValue) {
						var value;
						switch (dataValueType) {
							case Terrasoft.DataValueType.DATE_TIME:
							case Terrasoft.DataValueType.DATE:
								value = new Date(filterValue);
								if (!Ext.isString(filterValue) || !Ext.isDate(value)) {
									value = filterValue;
								}
								break;
							default:
								value = filterValue;
								break;
						}
						return value;
					},
					addExtendFilterValue: addExtendFilterValue,
					clearSimpleFilterProperties: clearSimpleFilterProperties,
					generateFilterViewModelConfig: generateFilterViewModelConfig,

					/**
					 * Gets query filter.
					 * @protected
					 * @return {Object}
					 */
					getSimpleFilter: function() {
						var filter;
						var dataValueType = this.get("dataValueType");
						var value = this.get("value");
						var columnName = this.get("columnName");
						var equalComparisonType = Terrasoft.ComparisonType.EQUAL;
						var createFilter = Terrasoft.createColumnFilterWithParameter;
						var stringComparisonType = this.getStringColumnComparisonType();
						switch (dataValueType) {
							case Terrasoft.DataValueType.LOOKUP:
							case Terrasoft.DataValueType.ENUM:
								if (Terrasoft.Features.getIsEnabled("UseNewLookupComparison")) {
									var columnPath = Terrasoft.isGUID(value) ? columnName : columnName + "." +
										this.get("referenceSchemaPrimaryDisplayColumnName");
									var comparisonType = Terrasoft.isGUID(value) ? equalComparisonType :
										stringComparisonType;
									if (Terrasoft.isGUID(value)) {
										filter = createFilter(comparisonType, columnPath, value,
											Terrasoft.DataValueType.LOOKUP);
									} else {
										filter = createFilter(comparisonType, columnPath, value);
									}
								} else {
									filter = createFilter(stringComparisonType,
										columnName + "." + this.get("referenceSchemaPrimaryDisplayColumnName"), value);
								}
								break;
							case Terrasoft.DataValueType.TEXT:
								filter = createFilter(stringComparisonType, columnName, value);
								break;
							case Terrasoft.DataValueType.DATE:
								filter = createFilter(equalComparisonType, columnName, value, dataValueType);
								filter.trimDateTimeParameterToDate = true;
								break;
							case Terrasoft.DataValueType.DATE_TIME:
								filter = createFilter(equalComparisonType, columnName, value, dataValueType);
								filter.trimDateTimeParameterToDate = true;
								break;
							case Terrasoft.DataValueType.BOOLEAN:
								if (Terrasoft.Features.getIsEnabled("UseNewLookupComparison")) {
									filter = createFilter(equalComparisonType, columnName, value, dataValueType);
								} else {
									filter = createFilter(equalComparisonType, columnName, value.value, dataValueType);
								}
								break;
							default:
								filter = createFilter(equalComparisonType, columnName, value);
								break;
						}
						filter.leftExpressionCaption = this.get("columnCaption");
						return filter;
					},
					getExtendFilter: getExtendFilter,
					addSimpleFilter: addSimpleFilter,
					setCustomFilters: setCustomFilters,

					/**
					 * Changes filter to edit mode.
					 * @protected
					 * @param {String} editedFilterName Edited filter name.
					 */
					editSimpleFilter: function(editedFilterName) {
						if (editedFilterName === this.get("currentFilterName")) {
							return;
						}
						var filters = this.get("filters");
						var editedFilter = filters.find(editedFilterName);
						if (editedFilter) {
							var renderIndex = filters.indexOf(editedFilter);
							var currentDataValueType = editedFilter.get("dataValueType");
							var columnValue = {
								value: editedFilter.get("columnName"),
								displayValue: editedFilter.get("columnCaption"),
								dataValueType: currentDataValueType,
								referenceSchemaName: editedFilter.get("referenceSchemaName")
							};
							this.set("currentFilterName", editedFilterName);
							this.set("simpleFilterColumn", columnValue);
							var value;
							if (Terrasoft.Features.getIsEnabled("UseNewLookupComparison")) {
								value = editedFilter.get("displayValue");
							} else {
								value = editedFilter.get("value");
							}
							if (currentDataValueType === Terrasoft.DataValueType.BOOLEAN) {
								this.set("simpleFilterValueColumn",
									{value: editedFilter.get("value"), displayValue: editedFilter.get("displayValue")});
							} else {
								this.set("simpleFilterValueColumn", value.value ? value.value : value);
							}
							var valueEditConfig = this.getValueEditControlConfig(columnValue.dataValueType);
							editedFilter.set("viewVisible", false);
							this.showSimpleFilterEdit(valueEditConfig, function() {
								editedFilter.set("viewVisible", true);
							}, renderIndex);
						}
					},
					editExtendFilter: editExtendFilter,

					/**
					 * Gets edit control configuration.
					 * @private
					 * @param {Number} dataValueType
					 * @return {Object}
					 */
					getValueEditControlConfig: function(dataValueType) {
						var controlConfig;
						switch (dataValueType) {
							case Terrasoft.DataValueType.INTEGER:
								controlConfig = {
									className: "Terrasoft.IntegerEdit"
								};
								break;
							case Terrasoft.DataValueType.FLOAT:
								controlConfig = {
									className: "Terrasoft.FloatEdit"
								};
								break;
							case Terrasoft.DataValueType.MONEY:
								controlConfig = {
									className: "Terrasoft.FloatEdit",
									decimalPrecision: 2
								};
								break;
							case Terrasoft.DataValueType.DATE:
							case Terrasoft.DataValueType.DATE_TIME:
								controlConfig = {
									className: "Terrasoft.DateEdit"
								};
								break;
							case Terrasoft.DataValueType.BOOLEAN:
								controlConfig = {
									className: "Terrasoft.ComboBoxEdit",
									list: {
										bindTo: "booleanValueColumnList"
									},
									prepareList: {
										bindTo: "getBooleanValueColumnList"
									}
								};
								break;
							case Terrasoft.DataValueType.LOOKUP:
							case Terrasoft.DataValueType.ENUM:
								controlConfig = {
									className: "Terrasoft.SearchableTextEdit",
									list: {
										bindTo: "lookupValueColumnList"
									},
									prepareList: {
										bindTo: "getLookupValueColumnList"
									},
									itemSelected: {
										bindTo: "lookupChanged"
									},
									markerValue: "searchComboBox"
								};
								break;
							default:
								controlConfig = {
									className: "Terrasoft.TextEdit"
								};
								break;
						}
						return controlConfig;
					},
					getBooleanValueColumnList: getBooleanValueColumnList,

					/**
					 * Loads lookup data for selected column using filters.
					 * @protected
					 * @param {String} filters Text value for filtration.
					 * @param {Object} list List of lookup data.
					 * @param {Function} [callback] Callback-function.
					 * @param {Object} [scope] Execution context.
					 */
					getLookupValueColumnList: function(filters, list, callback, scope) {
						var column = this.get("simpleFilterColumn");
						if (Ext.isEmpty(column) === true) {
							var customFilter = this.get("filters");
							if (customFilter && !customFilter.find(this.get("primaryDisplayColumnFilterTag"))) {
								column = this.get("primaryDisplayColumnConfig");
								this.set("simpleFilterColumn", column);
							}
						}
						if (this.$filterProposedColumnValue) {
							list.clear();
							list.loadAll(this.$filterProposedColumnValue);
							Ext.callback(callback, scope);
							return;
						}
						var queryConfig = this.getLookupQueryConfig(column);
						var esq = Ext.create(Terrasoft.EntitySchemaQuery, queryConfig);
						if (Terrasoft.Features.getIsEnabled("UseNewLookupComparison")) {
							this.addPrimaryValueColumn(esq);
						}
						this.addPrimaryDisplayColumn(esq);
						this.addLookupQueryFilter(esq, filters);
						esq.isDistinct = true;
						esq.getEntityCollection(function(response) {
							list.clear();
							var objects = {};
							var viewModelCollection = response.collection;
							viewModelCollection.each(function(item) {
								var id = Terrasoft.generateGUID();
								if (Terrasoft.Features.getIsEnabled("UseNewLookupComparison")) {
									objects[id] = {
										value: item.get("value"),
										displayValue: item.get("displayValue")
									};
								} else {
									objects[id] = {
										value: id,
										displayValue: item.get("displayValue")
									};
								}
							});
							list.loadAll(objects);
							Ext.callback(callback, scope);
						}, this);
					},

					getFilterValue: getFilterValue,

					/**
					 * Adds column filter to view.
					 * @protected
					 * @param {String} filteredColumnName Filtered column name.
					 * @param {Object} filterValue Filter value.
					 */
					addFilterValue: function(filteredColumnName, filterValue) {
						var column = this.entitySchema.columns[filteredColumnName];
						if (column) {
							var columnConfig = {
								value: column.name,
								displayValue: column.caption,
								dataValueType: column.dataValueType,
								referenceSchemaName: column.referenceSchemaName,
								primaryDisplayColumnName: filterValue.primaryDisplayColumnName
							};
							var value;
							value = filterValue.value;
							if (column.dataValueType === Terrasoft.DataValueType.LOOKUP ||
									column.dataValueType === Terrasoft.DataValueType.BOOLEAN) {
								if (Terrasoft.Features.getIsEnabled("UseNewLookupComparison")) {
									value = filterValue;
								} else {
									value = filterValue.displayValue || value;
								}
							}
							this.addSimpleFilterValue(columnConfig, value);
						} else {
							this.addExtendFilterValue(filterValue, true);
						}
					},
					showFolders: showFolders,
					showFoldersClick: showFoldersClick,
					updateFiltersByObjectPath: config.updateFiltersByObjectPath,

					/**
					 * Determines if folder visible.
					 * @protected
					 * @return {Boolean}
					 */
					isFolderItemVisible: function() {
						return this.get("ActiveFolder") !== null;
					},

					/**
					 * Gets active folder menu item name.
					 * @protected
					 * @return {String}
					 */
					getActiveFolderMenuItemName: function() {
						var activeFolder = this.get("ActiveFolder");
						var menuItemTemplate = resources.localizableStrings.EditFolderFiltersMenuItem;
						return activeFolder ? Ext.String.format(menuItemTemplate, activeFolder.displayValue) : "";
					},
					initActionsMenu: initActionsMenu,
					initFavouriteFolders: initFavouriteFolders,
					areFoldersVisible: areFoldersVisible,
					isSimpleFilterVisible: isSimpleFilterVisible,
					isExtendModeVisible: isExtendModeVisible,
					updateFiltersOnReturn: updateFiltersOnReturn,
					filterChanged: filterChanged,
					showSimpleFilterEdit: showSimpleFilterEdit,
					getFilterViewModel: getFilterViewModel,
					getFilterView: getFilterView,
					generateFilterViewConfig: generateFilterViewConfig,
					goToExtendedMode: goToExtendedMode,
					goToExtendedModeClick: goToExtendedModeClick,
					goToSearchFolderEditMode: goToSearchFolderEditMode,
					getFolderFilter: getFolderFilter,
					showFolderManager: showFolderManager,
					onFavoriteFolderSelect: onFavoriteFolderSelect,
					showSimpleFilter: showSimpleFilter,
					selectFavoriteFolders: selectFavoriteFolders,

					/**
					 * Lookup value change handler.
					 * @protected
					 * @param {Object} lookupValue Lookup lookupValue.
					 */
					lookupChanged: function(lookupValue) {
						if (Terrasoft.Features.getIsEnabled("UseNewLookupComparison")) {
							this.set("simpleFilterValueColumn", lookupValue);
						} else {
							this.set("simpleFilterValueColumn", lookupValue.displayValue);
						}
						this.applySimpleFilter();
					},

					getExt: function() {
						return this.get("Ext");
					},

					getSandbox: function() {
						return this.get("sandbox");
					},

					/**
					 * Gets custom filter identifier.
					 * @protected
					 */
					getCustomFilterId: function() {
						var sandbox = this.getSandbox();
						return "customFilter" + sandbox.id;
					}
				}
			};

			var defaultColumn = null;
			var displayColumnName = null;
			if (!Ext.isEmpty(config.filterDefaultColumnName)) {
				defaultColumn = config.entitySchema.getColumnByName(config.filterDefaultColumnName);
				displayColumnName = config.filterDefaultColumnName;
			} else {
				if (config.entitySchema.primaryDisplayColumnName) {
					defaultColumn = config.entitySchema.primaryDisplayColumn;
					displayColumnName = config.entitySchema.primaryDisplayColumnName;
				}
			}
			if (!Ext.isEmpty(defaultColumn)) {
				viewModelConfig.values.primaryDisplayColumnFilterTag = customFilterPrefix +
					displayColumnName + config.quickFilterKey;
				viewModelConfig.values.primaryDisplayColumnConfig = {
					value: displayColumnName,
					displayValue: defaultColumn.caption,
					dataValueType: defaultColumn.dataValueType,
					referenceSchemaName: defaultColumn.referenceSchemaName
				};
			}
			return viewModelConfig;
		}

		function generateFilterViewModelConfig() {
			return {
				columns: {
					columnCaption: {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						name: "columnCaption"
					},
					displayValue: {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						name: "displayValue"
					},
					filterName: {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						name: "filterName"
					}
				},
				values: {
					columnCaption: "",
					columnName: null,
					value: null,
					dataValueType: null,
					referenceSchemaName: null,
					referenceSchemaPrimaryDisplayColumnName: null,
					view: null,
					viewVisible: true
				},
				methods: {}
			};
		}

		/**
		 * Initializes custom filter ViewModel.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Execution context.
		 */
		function init(callback, scope) {
			this.subscribeForCollectionEvent();
			this.suspendUpdate = true;
			this.initActionsMenu();
			this.initFavouriteFolders();
			this.suspendUpdate = false;
			callback.call(scope);
			this.initFiltersContainer();
		}

		function initialize() {
			this.suspendUpdate = true;
			var filterState = this.getFilterState("Custom");
			if (filterState) {
				for (var key in filterState) {
					this.addFilterValue(key, filterState[key]);
				}
			}
			this.suspendUpdate = false;
		}

		function updateFiltersOnReturn() {
			this.clearFilterViews();
			if (this.get("filters") !== null) {
				var filters = this.get("filters");
				var filtersViews = this.get("filtersViews");
				var filterNames = Terrasoft.deepClone(filters.getKeys());
				var scope = this;
				Terrasoft.each(filterNames, function(filterName) {
					var filter = filters.collection.getByKey(filterName);
					var config = scope.generateFilterViewModelConfig();
					config.methods.editFilter = function(tag) {
						scope.editSimpleFilter(tag);
					};
					config.methods.getFilter = scope.getSimpleFilter;
					var simpleFilterView = scope.getFilterView(filter, filterName);
					filtersViews.add(filterName, simpleFilterView);
				});
			}
		}

		function areFoldersVisible() {
			return this.get("isFoldersHidden") && this.get("hasFolders");
		}

		function isSimpleFilterVisible() {
			return this.get("isExtendedModeHidden");
		}

		function isExtendModeVisible() {
			return this.get("isExtendedModeHidden") && this.get("hasExtendedMode");
		}

		/**
		 * Initializes favourite folders.
		 */
		function initFavouriteFolders() {
			if (!this.folderEntitySchema) {
				this.set("hasFolders", false);
				return;
			}
			var folderEntitySchemaName = this.folderEntitySchema.name;
			var folderSchemaUId = this.folderEntitySchema.uId;
			var select = this.selectFavoriteFolders(folderEntitySchemaName, folderSchemaUId);
			var collection = this.get("ActionsMenu");
			this.initActionsMenu();
			select.execute(function(response) {
				if (response && response.success) {
					response.collection.each(function(folderItem) {
						var folderId = folderItem.get("FolderId");
						if (Ext.isEmpty(folderId)) {
							return;
						}
						folderItem.entitySchema = this.folderEntitySchema;
						folderItem.initColumns();
						var itemConfig = {
							values: {
								Caption: folderItem.get("FolderName"),
								Click: {bindTo: "onFavoriteFolderSelect"},
								Tag: folderItem,
								Visible: {
									bindTo: "areFoldersVisible"
								}
							}
						};
						var menuItem = Ext.create("Terrasoft.BaseViewModel", itemConfig);
						if (collection.indexOf(menuItem) < 0) {
							collection.addItem(menuItem);
						}
					}, this);
				}
			}, this);
		}

		/**
		 * Initializes filters containers.
		 * @private
		 */
		function initFiltersContainer() {
			if (this.get("isFoldersContainerExpanded")) {
				this.showFolders(true);
			}
			if (!this.get("isExtendedFiltersContainerExpanded")) {
				return;
			}
			if (this.get("isExtendedFolderContainerExpanded")) {
				this.createActiveFolderFilter(function(activeFolder) {
					this.set("ActiveFolder", activeFolder);
					this.goToSearchFolderEditMode({
						initialization: true
					});
				}, this);
			} else {
				this.editExtendFilter();
			}
		}

		function selectFavoriteFolders(folderEntitySchemaName, folderSchemaUId) {
			var select = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "FolderFavorite",
				rowViewModelClassName: "Terrasoft.FolderFilterItemViewModel"
			});
			select.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
			select.addColumn("[" + folderEntitySchemaName + ":Id:FolderId].Id", "FolderId");
			var nameColumn = select.addColumn("[" + folderEntitySchemaName + ":Id:FolderId].Name", "FolderName");
			select.addColumn("[" + folderEntitySchemaName + ":Id:FolderId].FolderType", "FolderType");
			select.addColumn("[" + folderEntitySchemaName + ":Id:FolderId].SearchData", "SearchData");
			var filters = Ext.create("Terrasoft.FilterGroup");
			filters.addItem(select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "SysAdminUnit",
				Terrasoft.SysValue.CURRENT_USER.value));
			filters.addItem(select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
				"FolderEntitySchemaUId", folderSchemaUId));
			select.filters = filters;
			nameColumn.orderDirection = Terrasoft.OrderDirection.ASC;
			nameColumn.orderPosition = 0;
			return select;
		}

		function initActionsMenu() {
			var collection = this.get("ActionsMenu");
			collection.clear();
			var isShortFilterVisible = this.get("isShortFilterVisible");
			if (!isShortFilterVisible) {
				var filterMenuItems = [
					{
						Id: Terrasoft.generateGUID(),
						Caption: {bindTo: "getActiveFolderMenuItemName"},
						Click: {bindTo: "goToSearchFolderEditMode"},
						Visible: {bindTo: "isFolderItemVisible"}
					},
					{
						Id: Terrasoft.generateGUID(),
						Caption: "",
						Type: Terrasoft.MenuItemType.SEPARATOR
					},
					{
						Id: Terrasoft.generateGUID(),
						Caption: resources.localizableStrings.AddConditionMenuItemCaption,
						Click: {bindTo: "addSimpleFilter"},
						Visible: {bindTo: "isExtendedModeHidden"},
						MarkerValue: resources.localizableStrings.AddConditionMenuItemCaption,
						ImageConfig: resources.localizableImages.AddConditionIcon
					},
					{
						Id: Terrasoft.generateGUID(),
						Caption: resources.localizableStrings.ShowFoldersMenuItemCaption,
						Click: {bindTo: "showFoldersClick"},
						canExecute: {bindTo: "canBeDestroyed"},
						Visible: {bindTo: "areFoldersVisible"},
						ImageConfig: resources.localizableImages.ShowFoldersIcon
					},
					{
						Id: Terrasoft.generateGUID(),
						Caption: resources.localizableStrings.ExtendedModeMenuItemCaption,
						Click: {bindTo: "goToExtendedModeClick"},
						canExecute: {bindTo: "canBeDestroyed"},
						Visible: {bindTo: "isExtendModeVisible"},
						MarkerValue: resources.localizableStrings.ExtendedModeMenuItemCaption,
						ImageConfig: resources.localizableImages.ExtendedModeMenuIcon
					},
					{
						Id: Terrasoft.generateGUID(),
						Type: Terrasoft.MenuItemType.SEPARATOR,
						Caption: resources.localizableStrings.FavoriteFoldersMenuItemCaption
					}
				];
				Terrasoft.each(filterMenuItems, function(items) {
					var itemConfig = {
						values: items
					};
					var menuItem = Ext.create("Terrasoft.BaseViewModel", itemConfig);
					collection.addItem(menuItem);
				}, this);
			}
		}

		function addExtendFilterValue(extendFilterValue, clear) {
			var filters = this.get("filters");
			var oldFilterName = this.get("currentFilterName");
			if (!this.extendFilterIndex) {
				this.extendFilterIndex = 0;
			}
			var filterName = "customExtendFilter" + this.get("quickFilterKey") + this.extendFilterIndex++;
			if (oldFilterName) {
				filters.removeByKey(oldFilterName);
			}
			var config = this.generateFilterViewModelConfig();
			config.methods.editFilter = function() {
				this.editExtendFilter();
			}.bind(this);
			config.methods.getFilter = this.getExtendFilter;
			if (clear) {
				var filtersForRemove = filters.filterByFn(function(filter) {
					return filter.get("value") === extendFilterValue.value;
				});
				if (filtersForRemove.isEmpty()) {
					filters.clear();
				}
				filtersForRemove.each(function(filter) {
					filters.remove(filter);
				});
			}
			if (extendFilterValue.displayValue !== "") {
				var extendFilter = this.getFilterViewModel(filterName, config);
				extendFilter.set("filterName", filterName);
				extendFilter.set("value", extendFilterValue.value);
				var extendFilterDisplayValue = extendFilterValue.displayValue;
				extendFilter.set("displayValue", extendFilterDisplayValue.length > 20
					? extendFilterDisplayValue.substring(0, 20) + "..."
					: extendFilterDisplayValue);
				filters.insert(0, filterName, extendFilter);
			}
			this.filterChanged();
		}

		function setCustomFilters(filtersConfig) {
			var filters = this.get("filters");
			filters.clear();
			Terrasoft.each(filtersConfig, function(filterConfig) {
				this.addSimpleFilterValue(filterConfig.column, filterConfig.value);
			}, this);
		}

		function clearSimpleFilterProperties() {
			this.set("simpleFilterColumn", null);
			this.set("simpleFilterValueColumn", null);
			this.set("currentFilterName", null);
		}

		function simpleFilterColumnChange(value) {
			if (value == null) {
				return;
			}
			var dataValueType = value ? value.dataValueType : "";
			this.set("simpleFilterColumn", value);
			var className = this.getValueEditControlConfig(dataValueType);
			this.changeSimpleFilterValueEdit(className);
			this.set("simpleFilterValueColumn", null);
		}

		/**
		 * Check  if column deprecated.
		 * @param {Object} column Column wich will be checked.
		 * @return {Boolean} Result of checking
		 */
		function isColumnDeprecated(column) {
			var allowedColumns = this.get("allowedColumns");
			if (allowedColumns && column && column.uId) {
				var isColumnNotInAllowedColumns = Ext.isEmpty(
					Terrasoft.findWhere(allowedColumns, {uId: column.uId}));
				if (isColumnNotInAllowedColumns) {
					return true;
				}
			}
			return false;
		}

		function getSimpleFilterColumnList(filters, list) {
			list.clear();
			var columnList = {};
			var columnNames = [];
			var columns = this.entitySchema.columns;
			Terrasoft.each(columns, function(column) {
				if (column.dataValueType !== Terrasoft.DataValueType.GUID &&
					column.dataValueType !== Terrasoft.DataValueType.TIME &&
					column.dataValueType !== Terrasoft.DataValueType.BLOB &&
					column.dataValueType !== Terrasoft.DataValueType.IMAGELOOKUP &&
					column.usageType !== ConfigurationEnums.EntitySchemaColumnUsageType.None) {
					if (this.isColumnDeprecated(column)) {
						return;
					}
					columnNames.push({
						name: column.name,
						caption: column.caption
					});
				}
			}, this);
			var sortedColumnNames = columnNames.sort(function(a, b) {
				if (a.caption === b.caption) {
					return 0;
				} else {
					return a.caption > b.caption ? 1 : -1;
				}
			});
			Terrasoft.each(sortedColumnNames, function(item) {
				var column = columns[item.name];
				columnList[column.name] = {
					value: column.name,
					displayValue: column.caption,
					dataValueType: column.dataValueType,
					referenceSchemaName: column.referenceSchemaName
				};
			});
			list.loadAll(columnList);
		}

		function getBooleanValueColumnList(filters, list) {
			list.clear();
			var columnList = {};
			columnList.TRUE = {
				value: "true",
				displayValue: Terrasoft.getTypedStringValue(true, Terrasoft.DataValueType.BOOLEAN)
			};
			columnList.FALSE = {
				value: "false",
				displayValue: Terrasoft.getTypedStringValue(false, Terrasoft.DataValueType.BOOLEAN)
			};
			list.loadAll(columnList);
		}

		function subscribeForCollectionEvent() {
			var filters = this.get("filters");
			filters.on("dataLoaded", this.loadFilterViews, this);
			filters.on("add", this.addFilterView, this);
			filters.on("remove", this.removeFilterView, this);
			filters.on("clear", this.clearFilterViews, this);
		}

		function loadFilterViews() {
			var filtersViews = this.get("filtersViews");
			var filters = this.get("filters");
			filters.each(function(filterViewModel) {
				filtersViews.add(filterViewModel.get("filterName"), filterViewModel.get("view"));
			});
			this.updateButtonCaption();
		}

		function addFilterView(filterViewModel) {
			var filtersViews = this.get("filtersViews");
			filtersViews.add(filterViewModel.get("filterName"), filterViewModel.get("view"));
			this.updateButtonCaption();
		}

		function removeFilterView(filterViewModel) {
			var filtersViews = this.get("filtersViews");
			var view = filtersViews.removeByKey(filterViewModel.get("filterName"));
			if (view) {
				view.destroy();
			}
			this.updateButtonCaption();
		}

		function clearFilterViews() {
			var filtersViews = this.get("filtersViews");
			filtersViews.each(function(view) {
				view.destroy();
			});
			filtersViews.clear();
			this.updateButtonCaption();
		}

		function clear(filter) {
			this.addExtendFilterValue(filter, true);
		}

		function getExtendFilter() {
			return Terrasoft.deserialize(this.get("value"));
		}

		function getFilters(extendedMode) {
			var filters = this.get("filters");
			var filterCollection = null;
			if (filters.collection.length === 1) {
				var filter = filters.getByIndex(0);
				if (!filter.get("columnName")) {
					filterCollection = filter.getFilter();
					if (!extendedMode && this.updateFiltersByObjectPath) {
						this.updateFiltersByObjectPath(filterCollection, filterCollection.rootSchemaName,
							this.updateFiltersByObjectPath);
					}
					return filterCollection;
				}
			}
			filterCollection = Terrasoft.createFilterGroup();
			filters.each(function(filterInfo) {
				var filter = filterInfo.getFilter();
				if (filter) {
					if (this.updateFiltersByObjectPath) {
						this.updateFiltersByObjectPath(filter, filter.rootSchemaName,
							this.updateFiltersByObjectPath);
					}
					filterCollection.add(filterInfo.get("filterName"), filter);
				}
			}, this);
			return filterCollection;
		}

		function clearConditions() {
			var filters = this.get("filters");
			if (filters.collection.length > 0) {
				filters.clear();
				this.filterChanged();
			}
		}

		function updateButtonCaption() {
			var filters = this.get("filters");
			if (filters.collection.length > 0 && this.get("IsSeparateMode")) {
				this.set("buttonCaption", "");
			} else {
				this.set("buttonCaption", this.$userButtonCaption);
			}
		}

		function addSimpleFilter() {
			var filters = this.get("filters");
			if (this.$useSingleColumnFilter && filters.getCount() > 0) {
				return;
			}
			var defFilter = null;
			if (!filters.find(this.get("primaryDisplayColumnFilterTag"))) {
				defFilter = this.get("primaryDisplayColumnConfig");
			}
			this.applySimpleFilter();
			this.set("simpleFilterColumn", defFilter);
			this.set("simpleFilterValueColumn", null);
			this.set("currentFilterName", null);
			if (defFilter) {
				var valueEditConfig = this.getValueEditControlConfig(defFilter.dataValueType);
				this.showSimpleFilterEdit(valueEditConfig);
			} else {
				this.showSimpleFilterEdit();
			}
		}

		function editExtendFilter() {
			this.goToExtendedMode();
		}

		/**
		 * Handles ExtendedModeMenuItem click.
		 */
		function goToExtendedModeClick() {
			if (!Ext.isEmpty(this.get("simpleFilterColumn"))) {
				if (!Ext.isEmpty(this.get("simpleFilterValueColumn"))) {
					this.applySimpleFilter();
				}
				this.destroySimpleFilterAddingContainer();
			}
			this.goToExtendedMode();
			this.closeCard();
		}

		/**
		 * Handles ShowFoldersMenuItem click.
		 */
		function showFoldersClick() {
			this.showFolders();
			this.closeCard();
		}

		function showFolders(isInitialization) {
			this.showFolderManager({
				initialization: isInitialization
			});
		}

		/**
		 * Returns filter value.
		 * @param {String} filterName Filter name.
		 * @return {Object}
		 */
		function getFilterValue(filterName) {
			var result = {};
			var filters = this.get("filters");
			filters.each(function(filterInfo) {
				var filterValue;
				var currentFilterName = filterInfo.get("columnName");
				if (!filterName || currentFilterName === filterName) {
					filterValue = {
						displayValue: filterInfo.get("displayValue")
					};
					if (filterInfo.get("datavalueType") === Terrasoft.DataValueType.BOOLEAN) {
						filterValue.value = filterInfo.get("value").value;
					} else if (filterInfo.get("dataValueType") === Terrasoft.DataValueType.DATE ||
						filterInfo.get("dataValueType") === Terrasoft.DataValueType.DATE_TIME) {
						filterValue.value = new Date(filterInfo.get("value"));
					} else {
						filterValue.value = filterInfo.get("value");
					}
					var referenceSchemaPrimaryDisplayColumnName =
						filterInfo.get("referenceSchemaPrimaryDisplayColumnName");
					if (referenceSchemaPrimaryDisplayColumnName) {
						filterValue.primaryDisplayColumnName = referenceSchemaPrimaryDisplayColumnName;
					}
				}
				if (filterName) {
					result = filterValue;
				} else {
					result[currentFilterName] = filterValue;
				}
			});
			return result;
		}

		function filterChanged() {
			this.fireEvent("filterChanged", "CustomFilters", this.suspendUpdate);
		}

		function showSimpleFilterEdit(valueEditConfig, afterDestroy, renderIndex) {
			var Ext = this.getExt();
			var customFilterId = this.getCustomFilterId();
			var simpleFilterEditContainerName = this.get("simpleFilterEditContainerName");
			var customFilterContainer = Ext.get(this.get("customFilterContainerName"));
			var addConditionView = Ext.getCmp(simpleFilterEditContainerName);
			if (addConditionView) {
				addConditionView.destroy();
			}
			var addConditionViewConfig = CustomFilterView.generateAddSimpleFilterConfig(valueEditConfig,
				simpleFilterEditContainerName, customFilterId);
			addConditionView = Ext.create("Terrasoft.Container", addConditionViewConfig);
			this.destroySimpleFilterAddingContainer = function() {
				addConditionView.destroy();
			};
			this.changeSimpleFilterValueEdit = function(controlConfig) {
				if (!addConditionView.rendered) {
					return;
				}
				var config = CustomFilterView.getSimpleFilterValueEditConfig(controlConfig);
				config.id = this.getCustomFilterId();
				this.set("simpleFilterValueColumn", null);
				var oldControl = addConditionView.items.getByKey(config.id);
				if (oldControl) {
					addConditionView.remove(oldControl);
					oldControl.destroy();
				}
				var newControl = Ext.create(config.className, config);
				addConditionView.insert(newControl, 1);
				newControl.bind(this);
				addConditionView.reRender();
				var controlIndex = this.$columnEditVisible ? 0 : 1;
				var columnControl = addConditionView.items.getAt(controlIndex).getEl();
				if (!columnControl.getValue()) {
					columnControl.focus();
				} else {
					newControl.getEl().focus();
				}
			};
			var simpleFilterValueColumn = this.get("simpleFilterValueColumn");
			addConditionView.bind(this);
			if (renderIndex !== undefined) {
				addConditionView.render(customFilterContainer, renderIndex + 1);
			} else {
				addConditionView.render(customFilterContainer);
			}
			addConditionView.items.getAt(valueEditConfig ? 1 : 0).getEl().focus();
			addConditionView.on("destroy", function() {
				if (this.afterDestroy) {
					this.afterDestroy();
				}
			}, this);
			this.set("simpleFilterValueColumn", simpleFilterValueColumn);
			this.afterDestroy = afterDestroy;
		}

		function getFilterViewModel(filterName, config) {
			var Ext = this.getExt();
			var filterViewModel = Ext.create("Terrasoft.BaseViewModel", config);
			var customFiltersViewsContainer = Ext.get(this.get("customFilterContainerName"));
			filterViewModel.removeFilter = function(a1, a2, a3, tag) {
				var filters = this.get("filters");
				filters.removeByKey(tag);
				this.filterChanged();
			}.bind(this);
			var filterView = Ext.create("Terrasoft.Container", this.generateFilterViewConfig(filterName));
			filterView.bind(filterViewModel);
			filterView.render(customFiltersViewsContainer);
			filterViewModel.set("view", filterView);
			var stringColumnSearchComparisonType = this.get("StringColumnSearchComparisonType");
			filterViewModel.set("StringColumnSearchComparisonType", stringColumnSearchComparisonType);
			return filterViewModel;
		}

		/**
		 * Displays filter edit fields if they are not displayed.
		 * @protected
		 */
		function showSimpleFilter() {
			this.addSimpleFilter();
		}

		function generateFilterViewConfig(filterName, folderType) {
			var viewConfig = {
				id: filterName + "View",
				selectors: {
					el: "#" + filterName + "View",
					wrapEl: "#" + filterName + "View"
				},
				classes: {
					wrapClassName: "filter-inner-container filter-element-container-wrap"
				},
				markerValue: {bindTo: "columnCaption"},
				visible: {
					bindTo: "viewVisible",
					bindConfig: {
						converter: function(x) {
							return x !== false;
						}
					}
				},
				items: [
					{
						className: "Terrasoft.Container",
						id: filterName + "ViewContainer",
						selectors: {
							el: "#" + filterName + "ViewContainer",
							wrapEl: "#" + filterName + "ViewContainer"
						},
						classes: {
							wrapClassName: "filter-caption-value-container"
						},
						items: [
							{
								className: "Terrasoft.Label",
								classes: {
									labelClass: ["filter-caption-label", "filter-element-with-right-space"]
								},
								caption: {
									bindTo: "columnCaption",
									bindConfig: {
										converter: function(x) {
											return x;
										}
									}
								},
								visible: this.$showSelectedColumnCaption ? {
									bindTo: "columnCaption",
									bindConfig: {
										converter: function(x) {
											return !(x !== "" && !x);
										}
									}
								} : false
							},
							{
								className: "Terrasoft.Label",
								classes: {
									labelClass: ["filter-caption-label", "filter-element-with-right-space"]
								},
								caption: {
									bindTo: "value",
									bindConfig: {
										converter: function(x) {
											if (x && Terrasoft.Features.getIsEnabled("UseNewLookupComparison")) {
												if (Terrasoft.isGUID(x)) {
													return resources.localizableStrings.EqualComparisonLabel;
												} else if (Terrasoft.isJsonObject(x)) {
													return "";
												} else {
													var comparisonType = Terrasoft.SysSettings
														.getCachedSysSetting("StringColumnSearchComparisonType");
													if (comparisonType === 1) {
														return resources.localizableStrings.ContainComparisonLabel;
													} else {
														return resources.localizableStrings.StartWithComparisonLabel;
													}
												}
											}
											return ":";
										}
									}
								},
								visible: this.$showSelectedColumnCaption,
								click: {
									bindTo: "editFilter"
								},
								tag: filterName
							},
							{
								className: "Terrasoft.Label",
								classes: {
									labelClass: ["filter-value-label", "filter-element-with-right-space"]
								},
								caption: {
									bindTo: "displayValue"
								},
								click: {
									bindTo: "editFilter"
								},
								tag: filterName
							}
						]
					},
					{
						className: "Terrasoft.Button",
						classes: {
							wrapperClass: "filter-remove-button"
						},
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						hint: quickFilterViewResources.localizableStrings.RemoveButtonHint,
						imageConfig: quickFilterViewResources.localizableImages.RemoveButtonImage,
						click: {
							bindTo: "removeFilter"
						},
						tag: filterName
					}
				]
			};
			if (folderType) {
				var menu = [
					{
						className: "Terrasoft.MenuItem",
						caption: quickFilterViewResources.localizableStrings.SelectAnotherFolder,
						click: {bindTo: "openFoldersTree"}
					}
				];
				if (folderType.value === ConfigurationConstants.Folder.Type.Search) {
					menu.push({
						className: "Terrasoft.MenuItem",
						caption: quickFilterViewResources.localizableStrings.EditFilterGroup,
						click: {bindTo: "openEditFolderItem"},
						tag: filterName
					});
				}
				var folderIcon = {
					className: "Terrasoft.Button",
					classes: {
						wrapperClass: "folder-icon-button"
					},
					caption: {
						bindTo: "displayValue"
					},
					menu: {
						items: menu
					},
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					imageConfig: folderType.value === ConfigurationConstants.Folder.Type.General
						? quickFilterViewResources.localizableImages.GeneralFolderImage
						: quickFilterViewResources.localizableImages.SearchFolderImage,
					tag: filterName
				};
				viewConfig.classes = {
					wrapClassName: "folder-filter-inner-container filter-element-container-wrap"
				};
				var itemsContainer = viewConfig.items[0];
				itemsContainer.items = [folderIcon];
			}

			return viewConfig;
		}

		function getFilterView(filterViewModel, filterName) {
			var Ext = this.getExt();
			var customFiltersViewsContainer = Ext.get(this.get("customFilterContainerName"));
			var filterView = Ext.create("Terrasoft.Container",
				this.generateFilterViewConfig(filterName));
			filterView.bind(filterViewModel);
			filterView.render(customFiltersViewsContainer);
			return filterView;
		}

		function goToExtendedMode() {
			var sandbox = this.getSandbox();
			this.set("isExtendedModeHidden", false);
			this.set("isFoldersHidden", true);
			this.set("ActiveFolder", null);
			sandbox.publish("CustomFilterExtendedMode", null, [sandbox.id]);
		}

		function goToSearchFolderEditMode(cfg) {
			var sandbox = this.getSandbox();
			var activeFolder = this.get("ActiveFolder");
			this.set("ActiveFolder", null);
			Ext.apply(activeFolder, cfg || {});
			sandbox.publish("CustomFilterExtendedMode", activeFolder, [sandbox.id]);
		}

		/**
		 * Returns folder filter.
		 * @private
		 * @return {Object}
		 */
		function getFolderFilter() {
			var outResult = {};
			this.fireEvent("getFilterValue", "FolderFilters", "", outResult);
			var folderFilters = outResult.filters;
			return folderFilters ? folderFilters[0] : null;
		}

		function showFolderManager(cfg) {
			var sandbox = this.getSandbox();
			this.set("isExtendedModeHidden", true);
			this.set("isFoldersHidden", false);
			var config = null;
			var activeFolder = this.getFolderFilter();
			this.set("activeFolder", activeFolder);
			if (activeFolder) {
				config = {activeFolderId: activeFolder.value};
				this.set("activeFolder", null);
			}
			config = Ext.apply(config || {}, cfg || {});
			sandbox.publish("ShowFolderTree", config, [sandbox.id]);
		}

		function onFavoriteFolderSelect(tag) {
			var folderMenuItemConfig = {
				value: tag.get("FolderId"),
				displayValue: tag.get("FolderName"),
				folderType: tag.get("FolderType"),
				folder: tag,
				filter: tag.get("SearchData")
			};
			this.fireEvent("clearFilterValue", "FolderFilters", folderMenuItemConfig);
		}

		return {
			generate: generate
		};
	});


