Terrasoft.configuration.Structures["LookupPageViewModelGenerator"] = {innerHierarchyStack: ["LookupPageViewModelGenerator"]};
define("LookupPageViewModelGenerator", ["ext-base", "terrasoft", "LookupPageViewModelGeneratorResources",
		"GridUtilities", "GridProfileHelper", "ConfigurationEnums", "MaskHelper", "ProcessModuleUtilities",
		"RightUtilities", "ModuleUtils", "ColumnUtilities", "MiniPageUtilities", "GridUtilitiesV2",
		"GridProfileColumnsMixin", "QueryCancellationMixin"],
	function(Ext, Terrasoft, resources, gridUtils, GridProfileHelper, ConfigurationEnums, MaskHelper,
			 ProcessModuleUtilities, RightUtilities, moduleUtils) {
		var LookupModes = {
			EDIT_MODE: "editMode",
			PROCESS_MODE: "processMode"
		};
		var methods = {

			//region Methods: Private

			/**
			 * Sets focus to the search field.
			 * @private
			 */
			setSearchEditFocused: function() {
				var searchEdit = Ext.getCmp("searchEdit");
				searchEdit.setFocused(true);
			},

			/**
			 * Returns EntitySchemaQuery instance for Lookup entity.
			 * @private
			 * @param {String} lookupSchemaUid Current schema uId.
			 * @return {Terrasoft.EntitySchemaQuery}
			 */
			createLookupEsq: function(lookupSchemaUid) {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "Lookup"});
				esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "value");
				esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "displayValue");
				esq.filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"SysEntitySchemaUId", lookupSchemaUid));
				return esq;
			},

			_getGridInstance: function () {
				return Ext.getCmp("grid");
			},

			_restoreHierarchicalGridState: function() {
				var grid = this._getGridInstance();
				if (grid && grid.resetExpandHierarchyLevel) {
					grid.resetExpandHierarchyLevel();
				}
				this.set("expandedElements", {});
				this.set("expandHierarchyLevels", []);
			},

			//endregion

			//region Methods: Protected

			/**
			 * Loads view model.
			 * @protected
			 * @param {Object} profile Profile registry.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Scope for callback function.
			 */
			load: function(profile, callback, scope) {
				this.init();
				const lookupInfo = this.lookupInfo;
				const selectedValues = lookupInfo.selectedValues;
				if (selectedValues && selectedValues.length) {
					this.set("RestoreSelectedData", lookupInfo.selectedValues);
				}
				const hasListedColumnsConfig = profile && profile.captionsConfig && profile.listedColumnsConfig;
				const hasTiledColumnsConfig = profile && profile.tiledColumnsConfig;
				if (hasListedColumnsConfig || hasTiledColumnsConfig) {
					this.updateSortColumnsCaptions();
					this.loadData();
					Ext.callback(callback, scope);
				} else {
					this._setDefaultProfile(callback, scope);
				}
				if (this.lookupInfo.isQuickAdd) {
					const entityStructure = Terrasoft.configuration.EntityStructure;
					const schema = entityStructure && entityStructure[this.entitySchema.name];
					if (schema && schema.pages) {
						const cardInfo = this.getCurrentCardInfo();
						this.actionButtonClick("add/" + cardInfo.cardSchemaName);
					}
				}
			},

			/**
			 * @param {Function} callback
			 * @param {Object} scope
			 * @private
			 */
			_setDefaultProfile: function(callback, scope) {
				const newProfile = this.getDefaultProfile();
				Terrasoft.utils.saveUserProfile(newProfile.key, newProfile, true, function(response) {
					if (!response.success) {
						return;
					}
					this.lookupInfo.gridProfile = newProfile;
					this.set("gridProfile", newProfile);
					this.updateSortColumnsCaptions();
					this.loadData();
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * It refreshes the contents of the tab.
			 * @protected
			 * @param {Object} lookupInfo The configuration parameters of the object lookup.
			 * @param {String} lookupInfo.columnName lookup column name.
			 * @param {Object} lookupInfo.columnValue Configuration object of lookup column value.
			 * @param {String} lookupInfo.entitySchemaName Lookup entity schema name.
			 * @param {Object} lookupInfo.filters Lookup column filters.
			 * @param {String} lookupInfo.multiLookupColumnName MultiLookup column name.
			 * @param {Boolean} lookupInfo.multiSelect Is multiLookup tag.
			 * @param {String} lookupInfo.searchValue MultiLookup value of search.
			 */
			updateTabContent: function(lookupInfo) {
				var entitySchema = this.entitySchema;
				this.set("searchColumn", {
					value: entitySchema.primaryDisplayColumn.name,
					displayValue: entitySchema.primaryDisplayColumn.caption
				});
				var captionLookup = this.getLookupCaption(entitySchema, lookupInfo);
				this.set("captionLookup", captionLookup);
				this.set("lookupSchemaName", entitySchema.name);
				this.setSearchEditFocused();
			},

			/**
			 * Gets caption which displays at the header of the lookup modal box.
			 * @protected
			 * @param {Object} entitySchema EntitySchema object.
			 * @param {Object} lookupInfo The configuration parameters of the object lookup.
			 * @param {String} lookupInfo.captionLookup Lookup caption.
			 * @return {String} Lookup Caption.
			 */
			getLookupCaption: function(entitySchema, lookupInfo) {
				var localizableStrings = resources.localizableStrings;
				var prefix = localizableStrings.LookupPageCaptionPrefix || localizableStrings.CaptionLookupPage;
				return lookupInfo.captionLookup || prefix + entitySchema.caption;
			},

			//endregion

			//region Methods: Public

			isProcessMode: function() {
				return this.get("lookupMode") === LookupModes.PROCESS_MODE;
			},
			isEditMode: function() {
				return this.get("lookupMode") === LookupModes.EDIT_MODE;
			},

			/**
			 * Returns selected results select query.
			 * @private
			 * @return {Terrasoft.EntitySchemaQuery} Selected results select query.
			 */
			_getSelectedResultsSelectQuery: function() {
				var rootSchema = this.getCurrentSchema();
				var select = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchema: rootSchema
				});
				select.addColumn(rootSchema.primaryColumnName);
				select.addColumn(rootSchema.primaryDisplayColumnName);
				this.addSelectColumns(select);
				return select;
			},

			/**
			 * Applies selected results select query filters.
			 * @private
			 * @param {Object} args CardModuleResponse message arguments.
			 * @param {Terrasoft.EntitySchemaQuery} select Selected results select query.
			 */
			_applySelectedResultsSelectQueryFilters: function(args, select) {
				var recordId = args.uId || args.primaryColumnValue;
				select.filters.addItem(Terrasoft.createColumnInFilterWithParameters("Id", [recordId]));
				var lookupInfo = this.getLookupInfo();
				var filters = lookupInfo.filters;
				if (filters) {
					if (filters.filterType === Terrasoft.FilterType.FILTER_GROUP) {
						filters.each(function(filter) {
							select.filters.addItem(filter);
						});
					} else {
						select.filters.addItem(filters);
					}
				}
			},

			/**
			 * Returns lookup module id.
			 * @private
			 * @return {String} Lookup module id.
			 */
			_getModuleId: function() {
				var lookupInfo = this.getLookupInfo();
				return Ext.String.format("{0}_{1}_CardModule", this.sandbox.id, lookupInfo.columnName);
			},

			/**
			 * Subscribes on messages of the sandbox.
			 * @protected
			 */
			subscribeSandboxEvents: function() {
				this.sandbox.subscribe("HistoryStateChanged", function() {
					this.hide();
				}, this);
				this.sandbox.subscribe("CardModuleResponse", function(args) {
					if (args.success) {
						var select = this._getSelectedResultsSelectQuery();
						this._applySelectedResultsSelectQueryFilters(args, select);
						select.getEntityCollection(function(response) {
							var result = new Terrasoft.Collection();
							response.collection.each(function(item) {
								result.add(item.get("Id"), this.getResultItem(item));
							}, this);
							this.selectResult(result);
						}, this);
					}
				}, this, [this._getModuleId()]);
			},

			init: function() {
				this.subscribeSandboxEvents();
				this._subscribeOnSelectedRowsChange();
			},

			/**
			 * Subscribe to changes selectedRows.
			 * @private
			 */
			_subscribeOnSelectedRowsChange: function() {
				this.on("change:selectedRows", this.onSelectedRowsChange, this);
			},

			/**
			 * Handles selected rows change event.
			 */
			onSelectedRowsChange: function() {
				if (!this.isMultiSelect()) {
					return;
				}
				let selectedRowsCount = 0;
				if (this.get("SelectAllMode") && this.get("usingMultiAddMixin")) {
					var filteredRowsCount = this.get("filteredRowsCount");
					if (filteredRowsCount) {
						var unselectedItems = this.getUnselectedItems();
						selectedRowsCount = filteredRowsCount - unselectedItems.length;
					}
				} else {
					selectedRowsCount = this.getSelectedRecords().length;
				}
				this.set("selectedRowsCount", selectedRowsCount);
			},

			loadNext: function() {
				if (!this.get("CanLoadMoreData")) {
					return;
				}
				if (!this.destroyed) {
					this.pageNumber++;
					this.loadData();
				}
			},
			getCurrentSchema: function() {
				return this.entitySchema;
			},
			getLookupInfo: function() {
				return this.get("LookupInfo");
			},
			initLoadedColumns: function() {
				this.loadedColumns = [];
				Terrasoft.each(this.getLookupInfo().columns, function(column) {
					this.loadedColumns.push({
						columnPath: column
					});
				}, this);
				var entitySchema = this.getCurrentSchema();
				this.loadedColumns.push({
					columnPath: entitySchema.primaryColumnName
				}, {
					columnPath: entitySchema.primaryDisplayColumnName
				});
				var entityStructure = moduleUtils.getEntityStructureByName(entitySchema.name);
				if (entityStructure) {
					var typeColumnName = entityStructure.pages[0].typeColumnName;
					if ((entityStructure.pages.length > 1) && typeColumnName) {
						this.loadedColumns.push({
							columnPath: typeColumnName
						});
					}
				}
			},
			isGridTiled: function() {
				var columnsSettingsProfile = this.getColumnsProfile();
				return columnsSettingsProfile.isTiled;
			},
			getColumnsProfile: function() {
				var profile = this.get("gridProfile");
				if (profile.listedConfig) {
					var viewGenerator = Ext.create("Terrasoft.ViewGenerator");
					viewGenerator.viewModelClass = this;
					var newProfile = {
						listedConfig: Ext.decode(profile.listedConfig),
						tiledConfig: Ext.decode(profile.tiledConfig),
						isTiled: profile.type === "tiled",
						type: profile.type,
						key: profile.key
					};
					viewGenerator.actualizeGridConfig(newProfile);
					this.clearLinks(newProfile);
					this.set("gridProfile", {
						isTiled: newProfile.isTiled,
						key: newProfile.key,
						listedColumnsConfig: Ext.encode(newProfile.listedConfig.columnsConfig),
						captionsConfig: Ext.encode(newProfile.listedConfig.captionsConfig),
						tiledColumnsConfig: Ext.encode(newProfile.tiledConfig.columnsConfig),
						type: newProfile.type
					});
				}
				return this.get("gridProfile");
			},

			clearLinks: function(profile) {
				Terrasoft.each(profile.listedConfig.columnsConfig, function(item) {
					if (item.hasOwnProperty("link")) {
						delete item.link;
					}
				}, this);
				Terrasoft.each(profile.tiledConfig.columnsConfig, function(rowItem) {
					Terrasoft.each(rowItem, function(item) {
						if (item.hasOwnProperty("link")) {
							delete item.link;
						}
					}, this);
				}, this);
			},

			/**
			 * @param index
			 */
			sortColumn: function(index) {
				const isNewProfileColumnsFormat = this._isNewProfileColumnsFormat();
				if (isNewProfileColumnsFormat) {
					const profile = this.get("Profile");
					this.sortColumnByIndex(profile, index);
				}
				const columnsSettingsProfile = this.getColumnsProfile();
				GridProfileHelper.changeSorting.call(this, {
					index: index,
					columnsSettingsProfile: columnsSettingsProfile
				});
				this.isClearGridData = true;
				this.loadData();
			},

			/**
			 * @private
			 * @return {Boolean}
			 */
			_isNewProfileColumnsFormat: function() {
				if (Terrasoft.Features.getIsDisabled("LookupSafeSorting")) {
					return false;
				}
				const profile = this.get("Profile");
				return Boolean(profile.listedConfig);
			},

			/**
			 * @param tag
			 */
			sortGrid: function(tag) {
				const isNewProfileColumnsFormat = this._isNewProfileColumnsFormat();
				if (isNewProfileColumnsFormat) {
					const profile = this.get("Profile");
					this.sortColumnByTag(profile, tag);
				}
				const columnsSettingsProfile = this.getColumnsProfile();
				GridProfileHelper.changeSorting.call(this, {
					tag: tag,
					columnsSettingsProfile: columnsSettingsProfile
				});
				this.isClearGridData = true;
				this.loadData();
			},

			/**
			 * @param viewColumnsSettingsProfile
			 */
			setColumnsProfile: function(viewColumnsSettingsProfile) {
				this.set("gridProfile", viewColumnsSettingsProfile);
				this._saveUserProfile();
			},

			/**
			 * @private
			 */
			_saveUserProfile: function() {
				const isNewProfileColumnsFormat = this._isNewProfileColumnsFormat();
				const profileProperty = isNewProfileColumnsFormat ? "Profile" : "gridProfile";
				const profile = this.get(profileProperty);
				const profileKey = this.getProfileKey();
				Terrasoft.utils.saveUserProfile(profileKey, profile, false);
			},

			/**
			 * Get query operation type.
			 * @protected
			 * @return {String} Query class.
			 */
			getEsqOperationType:function () {
				return Terrasoft.Features.getIsEnabled("UseSeparatedSelectMethods") ?
					Terrasoft.QueryOperationType.LOOKUPSELECT : Terrasoft.QueryOperationType.SELECT;
			},

			getSelect: function() {
				var columnsSettingsProfile = this.getColumnsProfile();
				var select = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchema: this.getCurrentSchema(),
					useRecordDeactivation: this.get("useRecordDeactivation"),
					operationType: this.getEsqOperationType()
				});
				var profileSortedColumns = {};
				var parameters = [select, columnsSettingsProfile, profileSortedColumns];
				var initSelectActions = [
					this.getLoadedColumnsWithSortedColumnsInitialization,
					function(select) {
						if (!this.loadedColumns) {
							select = null;
						}
					},
					this.addSelectColumns,
					this.initSelectSorting,
					this.pushSelectFilters,
					this.initializePageable
				];
				Terrasoft.each(initSelectActions, function(action) {
					if (action && !Ext.isEmpty(this.parameters[0])) {
						action.apply(this.scope, this.parameters);
					}
				}, {scope: this, parameters: parameters});
				return select;
			},
			getLoadedColumnsWithSortedColumnsInitialization:
			GridProfileHelper.getLoadedColumnsWithSortedColumnsInitialization,
			addSelectColumns: function(select) {
				var columns = select.columns.collection;
				Terrasoft.each(this.loadedColumns, function(column, columnKey) {
					if (!columns.containsKey(columnKey)) {
						select.addColumn(column, columnKey);
					}
				});
			},
			initSelectSorting: function(select) {
				var lookupInfo = this.getLookupInfo();
				if (lookupInfo && lookupInfo.sortedColumns) {
					Terrasoft.each(lookupInfo.sortedColumns, function(item) {
						var column = null;
						if (select.columns.contains(item.name)) {
							column = select.columns.get(item.name);
						} else {
							column = select.addColumn(item.name);
						}
						column.orderPosition = item.orderPosition;
						column.orderDirection = item.orderDirection;
					}, this);
				}
				GridProfileHelper.initSelectSorting.apply(this, arguments);
			},
			pushSelectFilters: function(select) {
				var filters = select.filters;
				var lookupInfo = this.getLookupInfo();
				if (!lookupInfo.columnValue) {
					var searchColumn = this.get("searchColumn");
					var searchData = this.get("searchData");
					if (searchColumn && searchData) {
						var columnPath = searchColumn.value;
						var stringComparisonType = this.getStringColumnComparisonType();
						var filter = select.createColumnFilterWithParameter(stringComparisonType, columnPath,
							searchData);
						filters.add("searchDataFilter", filter);
					}
				} else {
					lookupInfo.columnValue = null;
				}
			},
			initializePageable: function(select) {
				if (!this.pageRowsCount) {
					this.pageRowsCount = this.isGridTiled() ? 15 : 30;
				}
				var config = {
					collection: this.getGridData(),
					primaryColumnName: this.entitySchema.primaryColumnName,
					schemaQueryColumns: select.columns,
					isPageable: !this.loadAll && (this.pageRowsCount > 0),
					rowCount: Terrasoft.useOffsetFetchPaging ? this.pageRowsCount : this.pageRowsCount + 1,
					select: select,
					isClearGridData: this.isClearGridData,
					lookupReferenceSchema: this.getCurrentSchema()
				};
				var lastRecord = this.get("lastRecord");
				if (!Ext.isEmpty(lastRecord)) {
					config.lastRecord = lastRecord;
				}
				gridUtils.initializePageableOptions(select, config);
			},
			loadData: function() {
				if (this.get("RestoreSelectedData")) {
					this.loadSelected();
				}
				var select = this.getSelect();
				var hierarchicalColumnName = this.getHierarchicalColumnName();
				if (!Ext.isEmpty(hierarchicalColumnName)) {
					this.putNestingColumn(select, hierarchicalColumnName);
				}
				this.set("advancedVisible", false);
				this.set("advancedSpinnerVisible", true);
				this.set("IsGridLoading", true);
				var lookupInfo = this.getLookupInfo();
				if (!Ext.isEmpty(lookupInfo.filterObjectPath)) {
					this.updateFilterByFilterObjectPath(select.filters, lookupInfo.filterObjectPath);
				}
				var filters = select.filters;
				if (!Ext.isEmpty(lookupInfo.filters)) {
					filters.add("searchFilter", lookupInfo.filters);
				}
				if (!Ext.isEmpty(hierarchicalColumnName)) {
					select.filters.add("hierarchicalParentFilter",
						this.getFirstLevelFilter(hierarchicalColumnName));
				}
				this.lookupInfo = Ext.apply(this.lookupInfo, {
					lookupFilters: filters
				});
				select.getEntityCollection(this.onLoadData, this);
				this.registerSentQuery("lookupPage_loadData", select);
			},
			getHierarchicalColumnName: function() {
				var lookupInfo = this.getLookupInfo();
				if (lookupInfo.hierarchical) {
					if (!Ext.isEmpty(lookupInfo.hierarchicalColumnName)) {
						return lookupInfo.hierarchicalColumnName;
					}
					return this.getCurrentSchema().hierarchicalColumnName;
				}
				return null;
			},
			loadNesting: function(parentId) {
				var select = this.getSelect();
				var lookupInfo = this.getLookupInfo();
				var hierarchicalColumnName = this.getCurrentSchema().hierarchicalColumnName;
				if (!Ext.isEmpty(lookupInfo.hierarchicalColumnName)) {
					hierarchicalColumnName = lookupInfo.hierarchicalColumnName;
				}
				if (!Ext.isEmpty(hierarchicalColumnName)) {
					select.addColumn(hierarchicalColumnName + "." + "Id", "parentId");
					this.putNestingColumn(select, hierarchicalColumnName);
				}
				select.rowCount = -1;
				select.isPageable = false;
				if (!Ext.isEmpty(lookupInfo.filterObjectPath)) {
					this.updateFilterByFilterObjectPath(select.filters, lookupInfo.filterObjectPath);
				}
				var filters = select.filters;
				if (!Ext.isEmpty(lookupInfo.filters)) {
					filters.add("searchFilter", lookupInfo.filters);
				}
				if (!Ext.isEmpty(hierarchicalColumnName)) {
					var virtualRootItem = lookupInfo.virtualRootItem;
					if (!Ext.isEmpty(virtualRootItem) && (parentId === virtualRootItem.get("Id"))) {
						select.filters.add("hierarchicalParentFilter",
							this.getFirstLevelFilter(hierarchicalColumnName));
					} else {
						select.filters.add("hierarchicalParentFilter",
							this.getChildFilter(hierarchicalColumnName, parentId));
					}
				}
				select.getEntityCollection(this.onLoadNesting, this);
			},
			afterRender: function() {
				this.setSearchEditFocused();
			},
			onLoadNesting: function(response) {
				var parentId = null;
				if (!Ext.isEmpty(response.collection.getByIndex(0))) {
					parentId = response.collection.getByIndex(0).get("parentId");
				}

				var resultCollection = response.collection;
				var lookupInfo = this.getLookupInfo();
				var virtualRootItem = lookupInfo.virtualRootItem;
				if (!Ext.isEmpty(virtualRootItem) && (!parentId)) {
					var virtualRootItemValues = lookupInfo.virtualRootItemValues;
					virtualRootItem.set("HasNesting", 1);
					var hierarchicalColumnName = this.getCurrentSchema().hierarchicalColumnName;
					if (!hierarchicalColumnName) {
						hierarchicalColumnName = lookupInfo.hierarchicalColumnName;
					}
					resultCollection = Ext.create("Terrasoft.Collection");
					resultCollection.add(0, virtualRootItem);
					response.collection.each(function(item) {
						if (!item.get(hierarchicalColumnName)) {
							item.set(hierarchicalColumnName, virtualRootItemValues);
							item.set("parentId", virtualRootItem.get("Id"));
						}
						resultCollection.add(response.collection.indexOf(item) + 1, item);
					}, this);
					parentId = virtualRootItem.get("Id");
					this.getGridData().clear();
				}
				this.getGridData().loadAll(resultCollection, {
					mode: "child",
					target: parentId
				});
			},
			/**
			 * Handles load data server response.
			 * @param {Object} response Read data response.
			 * @param {Object} options Options needed to insert records into specific grid spot.
			 */
			onLoadData: function(response, options) {
				this.set("IsGridLoading", false);
				var rowConfig = response.collection && response.collection.rowConfig;
				var dataCollection = response.collection || Ext.create("Terrasoft.Collection");
				this.initCanLoadMoreData(dataCollection);
				this.notFoundColumns = this.Terrasoft.ColumnUtilities.findNotFoundColumns(rowConfig);
				var gridProfile = this.get("gridProfile");
				if (gridProfile) {
					var grid = this._getGridInstance();
					var gridColumnConfig = gridProfile.isTiled
						? gridProfile.tiledColumnsConfig
						: gridProfile.listedColumnsConfig;
					if (gridColumnConfig) {
						grid.type = gridProfile.isTiled ? "tiled" : "listed";
						var columnsConfig = Ext.decode(gridColumnConfig);
						if (columnsConfig.length > 0) {
							grid.columnsConfig = columnsConfig;
							if (!gridProfile.isTiled) {
								grid.captionsConfig = Ext.decode(gridProfile.captionsConfig);
							}
						}
						grid.initBindings(grid);
					}
				}
				var gridCollection = this.getGridData();
				if (this.isClearGridData) {
					this.isClearGridData = false;
					gridCollection.clear();
				}
				var lookupInfo = this.getLookupInfo();
				var virtualRootItem = lookupInfo.virtualRootItem;
				if (!Ext.isEmpty(virtualRootItem)) {
					virtualRootItem.set("HasNesting", 1);
					if (gridCollection.isEmpty()) {
						this.loadNesting(virtualRootItem.get("Id"));
						this.set("expandHierarchyLevels", [virtualRootItem.get("Id")]);
					}
				} else {
					this.set("IsGridEmpty", gridCollection.isEmpty() && response.collection.isEmpty());
					var fixedCollection = this.prepareResponseCollection(response.collection);
					gridCollection.loadAll(fixedCollection, options);
				}
				if (!gridCollection.isEmpty()) {
					var lastRecord = gridCollection.getByIndex(gridCollection.getCount() - 1);
					this.set("lastRecord", lastRecord);
				}
				this.set("advancedSpinnerVisible", false);
				if (this.getGridData().getCount() < this.pageRowsCount) {
					this.set("advancedVisible", false);
				} else {
					this.set("advancedVisible", (response.collection.getCount() > 0));
				}
				if (this.get("SelectAllMode") && this.get("usingMultiAddMixin")) {
					this._internalSelectAllRecords(gridCollection);
				}
			},

			/**
			 * Returns grid data.
			 * @protected
			 * @return {Terrasoft.Collection} Grid data.
			 */
			getGridData: function() {
				return this.get("gridData");
			},

			/**
			 * Returns multi selection flag.
			 * @protected
			 * @return {Boolean} Multi selection flag.
			 */
			isMultiSelect: function() {
				return this.get("multiSelect");
			},

			/**
			 * @inheritDoc Terrasoft.GridUtilities#getRowCount
			 * @override
			 */
			getRowCount: function() {
				return this.pageRowsCount;
			},
			prepareResponseCollection: function(dataCollection) {
				var gridCollection = this.getGridData();
				var fixedCollection = Ext.create("Terrasoft.Collection");
				dataCollection.each(function(item) {
					var itemKey = item.get(item.primaryColumnName);
					if (!gridCollection.contains(itemKey) && !fixedCollection.contains(itemKey)) {
						fixedCollection.add(itemKey, item);
					}
				});
				return fixedCollection;
			},
			loadSelected: function() {
				var restoredIds = this.get("RestoreSelectedData");
				this.set("RestoreSelectedData", null);
				var columnsSettingsProfile = this.getColumnsProfile();
				var select = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchema: this.getCurrentSchema()
				});
				var profileSortedColumns = {};
				var parameters = [select, columnsSettingsProfile, profileSortedColumns];
				var initSelectActions = [
					this.getLoadedColumnsWithSortedColumnsInitialization,
					function(select) {
						if (!this.loadedColumns) {
							select = null;
						}
					},
					this.addSelectColumns,
					this.initSelectSorting
				];
				Terrasoft.each(initSelectActions, function(action) {
					if (action && !Ext.isEmpty(this.parameters[0])) {
						action.apply(this.scope, this.parameters);
					}
				}, {scope: this, parameters: parameters});
				var filters = select.filters;
				filters.add("selectedIdsFilter", Terrasoft.createColumnInFilterWithParameters("Id", restoredIds));
				this.set("advancedVisible", false);
				this.set("advancedSpinnerVisible", true);
				this.set("IsGridLoading", true);
				select.getEntityCollection(function(response) {
					this.onLoadData(response, {mode: "top"});
					this.setSelectedRecords(restoredIds);
				}, this);
			},

			updateFilterByFilterObjectPath: function(filters, objectPath) {
				if (!Ext.isEmpty(filters.leftExpression)) {
					filters.leftExpression.columnPath =
						objectPath + "." + filters.leftExpression.columnPath;
				} else {
					Terrasoft.each(filters.getItems(), function(item) {
						this.updateFilterByFilterObjectPath(item, objectPath);
					}, this);
				}
			},
			getFirstLevelFilter: function(hierarchicalColumnName) {
				return Terrasoft.createColumnIsNullFilter(hierarchicalColumnName);
			},
			getChildFilter: function(hierarchicalColumnName, parentId) {
				return Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					hierarchicalColumnName,
					parentId);
			},
			putNestingColumn: function(select, parentColumnName) {
				var serializationInfo = select.filters.getDefSerializationInfo();
				serializationInfo.serializeFilterManagerInfo = true;
				var filters = Terrasoft.deserialize(select.filters.serialize(serializationInfo));
				var lookupInfo = this.getLookupInfo();
				if (!Ext.isEmpty(lookupInfo.filterObjectPath)) {
					this.updateFilterByFilterObjectPath(filters, lookupInfo.filterObjectPath);
				}
				if (!Ext.isEmpty(lookupInfo.filters)) {
					filters.add("searchFilter", lookupInfo.filters);
				}
				var aggregationColumnName = Ext.String.format("[{0}:{1}].Id",
					select.rootSchemaName || select.rootSchema.name, parentColumnName);
				var agrigationColumn = Ext.create("Terrasoft.AggregationQueryColumn", {
					aggregationType: Terrasoft.AggregationType.COUNT,
					columnPath: aggregationColumnName,
					subFilters: filters
				});
				select.addColumn(agrigationColumn, "HasNesting");
			},
			onSearchButtonClick: function() {
				if (this._isConditionChanged()) {
					this.set("previousSearchData", this.get("searchData"));
					this.set("previousSearchColumn", this.get("searchColumn"));
					this.set("activeRow", null);
					this.clear();
					this.loadData();
					this.emptyGridRowHistory();
				}
			},
			/**
			 * Returns true if lookup filter condition change.
			 * @private
			 * @return {Boolean} True if lookup filter condition change.
			 */
			_isConditionChanged: function() {
				var searchColumn = this.get("searchColumn");
				var previousSearchColumn = this.get("previousSearchColumn");
				var searchColumnValue = searchColumn && searchColumn.value;
				var previousSearchColumnValue = previousSearchColumn && previousSearchColumn.value;
				var isChanged = (this.get("searchData") !== this.get("previousSearchData")) ||
					(searchColumnValue !== previousSearchColumnValue);
				return isChanged;
			},
			onExpandHierarchyLevels: function(parentId, isExpanded) {
				var expandedElements = this.get("expandedElements");
				if (isExpanded && !expandedElements.hasOwnProperty(parentId)) {
					expandedElements[parentId] = {
						page: 0
					};
					this.loadNesting(parentId);
				}
			},
			getSelectedRecords: function() {
				var isMultiSelect = this.isMultiSelect();
				var activeRow = this.get("activeRow");
				var selectedRows = this.get("selectedRows");
				return isMultiSelect ? selectedRows : (activeRow && [activeRow]);
			},
			setSelectedRecords: function(rowIds) {
				var isMultiSelect = this.isMultiSelect();
				if (!isMultiSelect) {
					return;
				}
				this.set("selectedRows", rowIds);
			},
			clearSelection: function() {
				this.set("activeRow", null);
				this.set("selectedRows", []);
				this.set("SelectAllMode", false);
				this.set("selectedRowsCount", 0);
			},

			_setSelectedRowCount: function() {
				const isMultiSelect = this.isMultiSelect();
				if (isMultiSelect && this.get("usingMultiAddMixin")) {
					this.getCountItemsByFilters(function(response) {
						if (response.success) {
							const selectResult = response.collection.getByIndex(0);
							const rowsCount = selectResult.get("Count");
							this.set("filteredRowsCount", rowsCount);
							this.set("selectedRowsCount", rowsCount);
						}
					}, this);
				} else {
					const selectedRows = this.get("selectedRows");
					this.set("selectedRowsCount", selectedRows && selectedRows.length);
				}
			},

			_internalSelectAllRecords: function(gridData) {
				const data = gridData || this.getGridData();
				if (data) {
					this._selectGridDataRows(data);
					this._setSelectedRowCount();
				}
			},

			/**
			 * Selects all grid items.
			 */
			selectAllRecords: function() {
				this.set("SelectAllMode", true);
				this._internalSelectAllRecords();
			},

			/**
			 * Selects grid data rows.
			 * @private
			 * @param {Terrasoft.Collection} gridData Grid data.
			 */
			_selectGridDataRows: function(gridData) {
				const rowKeys = gridData && gridData.getKeys() || [];
				const selectedRows = this.get("selectedRows") || [];
				this.set("selectedRows", this.Ext.Array.merge(selectedRows, rowKeys));
			},

			/**
			 * Initializes count esq filters.
			 * @protected
			 * @override
			 */
			getFilters: function() {
				return this.get("LookupInfo").lookupFilters;
			},

			/**
			 * Generates current filters config for SelectAllMode.
			 * @param {Terrasoft.FilterGroup} Filters.
			 * @return {String} Serialized filters.
			 * @private
			 */
			getSelectAllFiltersConfig: function(filters) {
				var lookupFilters = filters || this.lookupInfo.lookupFilters;
				var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
				filterGroup.addItem(lookupFilters);
				var unselectedItems = this.getUnselectedItems();
				var entitySchema = this.getCurrentSchema();
				if (unselectedItems.length) {
					var notInFilter = this.Terrasoft.createColumnInFilterWithParameters(
						entitySchema.primaryColumnName, unselectedItems);
					notInFilter.comparisonType = Terrasoft.ComparisonType.NOT_EQUAL;
					filterGroup.addItem(notInFilter);
				}
				var filtersConfig = filterGroup.serialize(filterGroup.getDefSerializationInfo());
				return filtersConfig;
			},
			/**
			 * Returns unselected grid rows identifiers.
			 * @return {Array} Unselected grid rows identifiers.
			 */
			getUnselectedItems: function() {
				var result = [];
				var rows = this.getGridData();
				var rowKeys = rows ? rows.getKeys() : [];
				var selectedRows = this.get("selectedRows") || [];
				result = this.Ext.Array.difference(rowKeys, selectedRows);
				return result;
			},
			/**
			 * Returns true is selected one item.
			 * @return {Boolean} Is selected only one item.
			 */
			isSingleSelected: function() {
				var selectedRows = this.getSelectedRecords();
				return selectedRows && (selectedRows.length === 1);
			},
			/**
			 *  Returns true is selected one or many item.
			 * @return {Boolean} Is selected one or many item.
			 */
			isAnySelected: function() {
				var selectedRows = this.getSelectedRecords();
				return selectedRows && (selectedRows.length > 0);
			},
			isUnSelectAllMenuVisible: function() {
				return (this.isMultiSelect() === true);
			},
			isSelectAllMenuVisible: function() {
				return this.isMultiSelect() === true;
			},
			getResultItem: function(item) {
				var primaryColumnName = item.primaryColumnName;
				var primaryDisplayColumnName = item.primaryDisplayColumnName;
				item.values.value = item.values[primaryColumnName];
				item.values.displayValue = item.values[primaryDisplayColumnName];
				var lookupInfo = this.getLookupInfo();
				var multiLookupColumnName = lookupInfo.multiLookupColumnName;
				if (!Ext.isEmpty(multiLookupColumnName)) {
					item.values.column = multiLookupColumnName;
				}
				return item.values;
			},
			selectButton: function() {
				var collection = this.getGridData();
				var result = new Terrasoft.Collection();
				var notLoadedItems = [];
				var records = this.getSelectedRecords();
				if (!Ext.isEmpty(records)) {
					records.forEach(function(recordId) {
						if (collection.contains(recordId)) {
							result.add(recordId, this.getResultItem(collection.get(recordId)));
						} else {
							notLoadedItems.push(recordId);
						}
					}, this);
				}
				if (Ext.isEmpty(notLoadedItems)) {
					this.selectResult(result);
				} else {
					var rootSchema = this.getCurrentSchema();
					var select = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchema: rootSchema
					});
					select.addColumn(rootSchema.primaryColumnName);
					select.addColumn(rootSchema.primaryDisplayColumnName);
					this.addSelectColumns(select);
					select.filters.add("IdFilter", Terrasoft.createColumnInFilterWithParameters("Id", notLoadedItems));
					select.getEntityCollection(function(response) {
						response.collection.each(function(item) {
							result.add(item.get("Id"), this.getResultItem(item));
						}, this);
						this.selectResult(result);
					}, this);
				}
			},
			selectResult: function(result) {
				var filters = this.get("SelectAllMode")
					? this.getSelectAllFiltersConfig(this.getFilters())
					: null;
				this.sandbox.publish("ResultSelectedRows", {
					selectedRows: result,
					columnName: this.getLookupInfo().columnName,
					filters: filters
				}, [this.sandbox.id]);
			},
			cancelButton: function() {
				if (this.isProcessMode()) {
					this.sandbox.publish("BackHistoryState");
					return;
				}
				this.close();
			},
			showProcessLogButton: function() {
				this.sandbox.publish("PushHistoryState", {hash: "SectionModule/SysProcessLogSection"});
			},
			updateSortColumnsCaptions: function() {
				var columnsSettingsProfile = this.getColumnsProfile();
				GridProfileHelper.setSortMenu.call(this, columnsSettingsProfile);
				GridProfileHelper.updateSortColumnsCaptions.call(this, columnsSettingsProfile);
			},
			hide: function() {
				Terrasoft.LookupUtilities.HideModalBox();
			},
			close: function() {
				Terrasoft.LookupUtilities.CloseModalBox();
			},
			getCurrentCardInfo: function() {
				var entitySchema = this.getCurrentSchema();
				var entityStructure = moduleUtils.getEntityStructureByName(entitySchema.name);
				var selectedRecords = this.getSelectedRecords();
				var gridData = this.getGridData();
				var editPagesInfo = entityStructure.pages;
				var cardSchemaName = editPagesInfo[0].cardSchema;
				var configAttribute = editPagesInfo[0].typeColumnName;
				var result = {cardSchemaName: cardSchemaName};
				if (Ext.isEmpty(selectedRecords) ||
					gridData.isEmpty() ||
					Ext.isEmpty(configAttribute)) {
					return result;
				}
				var filteredRow = gridData.get(selectedRecords[0]);
				if (Ext.isEmpty(filteredRow)) {
					return result;
				}
				var pageTypeId = filteredRow.get(configAttribute).value;
				var pageObjects = editPagesInfo.filter(function(item) {
					return (item.UId === pageTypeId);
				});
				if (Ext.isEmpty(pageObjects)) {
					return result;
				}
				var pageObject = pageObjects[0];
				var pageObjectCardSchema = pageObject.cardSchema;
				result.cardSchemaName = pageObjectCardSchema ||  cardSchemaName;
				result.typeUId = pageTypeId;
				result.typeColumnName = configAttribute;
				return result;
			},

			onDelete: function() {
				var items = this.getSelectedRecords();
				if (!items || !items.length) {
					return;
				}
				var checkCanDeleteCallback = function(result) {
					if (result) {
						this.showInformationDialog(resources.localizableStrings[result], function() {}, {
							style: Terrasoft.MessageBoxStyles.BLUE
						});
					} else {
						this.showConfirmationDialog(resources.localizableStrings.OnDeleteWarning, function(returnCode) {
							if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
								this.onDeleteAccept();
							}
						}, [Terrasoft.MessageBoxButtons.NO.returnCode, Terrasoft.MessageBoxButtons.YES.returnCode]);
					}
				};

				if (items.length === 1) {
					RightUtilities.checkCanDelete({
						schemaName: this.entitySchema.name,
						primaryColumnValue: items[0]
					}, checkCanDeleteCallback, this);
				} else {
					RightUtilities.checkMultiCanDelete({
						schemaName: this.entitySchema.name,
						primaryColumnValues: items
					}, checkCanDeleteCallback, this);
				}
			},

			onDeleteAccept: function() {
				gridUtils.deleteSelectedRecords(this);
			},

			getActionConfig: function(tag) {
				var tags = tag.split("/");
				var currentCardInfo = this.getCurrentCardInfo();
				var cardSchemaName = currentCardInfo.cardSchemaName && !tags[1]
					? currentCardInfo.cardSchemaName
					: tags[1];
				return {
					action: tags[0],
					cardSchemaName: cardSchemaName,
					typeUId: tags[2],
					typeColumnName: tags[3]
				};
			},

			defaultModeActionButtonClick: function(tag) {
				var actionConfig = this.getActionConfig(tag);
				var entitySchema = this.getCurrentSchema();
				var activeRows = this.getSelectedRecords();
				var activeRow = activeRows && (activeRows.length > 0) ? activeRows[0] : null;
				var lookupInfo = this.getLookupInfo();
				if ((actionConfig.action !== ConfigurationEnums.CardState.Add) && !activeRow) {
					return;
				}
				var entityStructure = moduleUtils.getEntityStructureByName(entitySchema.name);
				if (entityStructure) {
					if ((actionConfig.action === ConfigurationEnums.CardState.Edit) ||
						(actionConfig.action === ConfigurationEnums.CardState.Copy)) {
						Ext.apply(actionConfig, this.getCurrentCardInfo(actionConfig));
					}
					if (this.updateAddCardModuleEntityInfo) {
						this.updateAddCardModuleEntityInfo(actionConfig, activeRow);
					}
					if (lookupInfo.valuePairs) {
						actionConfig.valuePairs = lookupInfo.valuePairs;
					}
					var lookupPageId = this.sandbox.id + "_" + lookupInfo.columnName + "_CardModule";
					this.sandbox.subscribe("getCardInfo", function() {
						var cardInfo = {
							valuePairs: actionConfig.valuePairs || []
						};
						if (actionConfig.typeColumnName) {
							cardInfo.typeColumnName = actionConfig.typeColumnName;
							cardInfo.typeUId = actionConfig.typeUId;
						}
						return cardInfo;
					}, this, [lookupPageId]);
					var params = this.sandbox.publish("GetHistoryState");
					this.sandbox.publish("PushHistoryState", {
						hash: params.hash.historyState,
						stateObj: {
							isSeparateMode: true,
							schemaName: actionConfig.cardSchemaName,
							operation: actionConfig.action,
							primaryColumnValue: activeRow,
							valuePairs: actionConfig.valuePairs,
							isInChain: true
						}
					});
					MaskHelper.ShowBodyMask();
					Terrasoft.LookupUtilities.HideModalBox();
					if (this.needOpenMiniPage(entitySchema.name)) {
						this.openMiniPageForQuickAdd({
							entitySchemaName: entitySchema.name,
							moduleId: lookupPageId,
							valuePairs: actionConfig.valuePairs
						});
					} else {
						this.sandbox.loadModule("CardModuleV2", {
							renderTo: "centerPanel",
							id: lookupPageId,
							keepAlive: true
						});
					}
				} else {
					var lookupEditPageId = this.sandbox.id + "_NUIBaseLookupEditPage";
					var captionLookup = this.get("captionLookup").replace(
						resources.localizableStrings.CaptionLookupPage, "");
					this.sandbox.subscribe("CardModuleEntityInfo", function() {
						var entityInfo = {};
						entityInfo.action = actionConfig.action;
						entityInfo.entitySchemaName = entitySchema.name;
						entityInfo.activeRow = activeRow;
						entityInfo.lookupCaption = captionLookup;
						entityInfo.lookupInfo = lookupInfo;
						return entityInfo;
					}, [lookupEditPageId]);
					var lookupEditPageParams = this.sandbox.publish("GetHistoryState");
					this.sandbox.publish("PushHistoryState", {
						hash: lookupEditPageParams.hash.historyState
					});
					MaskHelper.ShowBodyMask();
					Terrasoft.LookupUtilities.HideModalBox();
					this.sandbox.loadModule("NUIBaseLookupEditPage", {
						renderTo: "centerPanel",
						id: lookupEditPageId,
						keepAlive: true
					});
				}
			},

			/**
			 * Checks has entity mini page on quick creation.
			 * @param {String} entitySchemaName Entity schema name.
			 * @return {Boolean}
			 */
			needOpenMiniPage: function(entitySchemaName) {
				var notUseSilentCreation = !Terrasoft.Features.getIsEnabled("UseSilentCreation");
				var entityStructure = moduleUtils.getEntityStructureByName(entitySchemaName);
				var editPages = entityStructure.pages;
				var hasAddMiniPage = editPages[0].hasAddMiniPage;
				return notUseSilentCreation && this.lookupInfo.isQuickAdd && !Ext.isEmpty(hasAddMiniPage);
			},

			/**
			 * Opens mini page.
			 * @param {Object} config Mini page configuration information.
			 */
			openMiniPageForQuickAdd: function(config) {
				var miniPageUtility = Ext.create(this.Terrasoft.MiniPageUtilities);
				miniPageUtility.openAddMiniPage(config);
			},

			/**
			 * Sends "OpenCard" message.
			 * @param {Object} openCardConfig Configuration object to be passed with "OpenCard" message.
			 */
			openCard: function(openCardConfig) {
				this.sandbox.publish("OpenCard", openCardConfig, [this.sandbox.id]);
			},

			/* jshint unused : false */
			processModeActionButtonClick: function(tag) {

				var activeItems = this.getSelectedRecords();
				if ((tag === "executeProcess") && !Ext.isEmpty(activeItems)) {
					ProcessModuleUtilities.executeProcess({
						sysProcessId: activeItems[0]
					});
				}
			},
			generateCardPath: function(cardConfig, action) {
				var url = [];
				if (cardConfig.cardModule) {
					url.push(cardConfig.cardModule);
				}
				if (cardConfig.cardSchema) {
					url.push(cardConfig.cardSchema, action);
				}
				if (action !== ConfigurationEnums.CardState.Add) {
					var activeRows = this.getSelectedRecords();
					var activeRow = activeRows[0];
					url.push(activeRow);
				}
				return url.join("/");
			},
			editModeActionButtonClick: function(tag) {
				var cardModule, cardSchema;
				var entitySchema = this.getCurrentSchema();
				var module = moduleUtils.getModuleStructureByName(entitySchema.name);
				if (module) {
					cardModule = module.cardModule;
					cardSchema = module.cardSchema;
				}
				var cardConfig = {
					cardModule: cardModule,
					cardSchema: cardSchema
				};
				if (this.getLookupInfo().cardCustomConfig) {
					Ext.apply(cardConfig, this.getLookupInfo().cardCustomConfig);
				}
				if (!cardConfig.cardSchema) {
					return;
				}
				var url = this.generateCardPath(cardConfig, tag);
				if (url) {
					this.sandbox.publish("PushHistoryState", {hash: url});
					Terrasoft.LookupUtilities.HideModalBox();
				}
			},
			actionButtonClick: function(tag) {
				this.getLookupInfo().searchValue = "";
				if (!tag) {
					tag = arguments[3];
				}
				if (this.isEditMode()) {
					this.editModeActionButtonClick(tag);
					return;
				}
				if (this.isProcessMode()) {
					this.processModeActionButtonClick(tag);
					return;
				}
				this.defaultModeActionButtonClick(tag);
			},
			onDeleted:  function(records) {
				if (!records) {
					records = this.getSelectedRecords();
				}
				if (records && (records.length > 0)) {
					var gridData = this.getGridData();
					records.forEach(function(record) {
						gridData.removeByKey(record);
					});
					this.set("IsGridEmpty", gridData.isEmpty());
					this.clearSelection();
					var lookupInfo = this.getLookupInfo();
					if (lookupInfo.methods && lookupInfo.methods.onDeleted) {
						lookupInfo.methods.onDeleted.call(this);
					}
				}
			},
			dblClickGrid: function(id) {
				if (this.isEditMode()) {
					this.set("activeRow", id);
					this.actionButtonClick("edit");
					return;
				} else if (this.isProcessMode()) {
					this.actionButtonClick("executeProcess");
					return;
				}
				this.set("activeRow", id);
				this.setSelectedRecords([id]);
				this.selectButton();
			},
			clear: function() {
				this.getGridData().clear();
				this._restoreHierarchicalGridState();
				this.pageNumber = 0;
			},
			openGridSettingPage: function() {
				var sandboxId = this.sandbox.id;
				var gridSettingsId = "GridSettings_" + sandboxId;
				var entitySchemaName = this.getCurrentSchema().name;
				var viewModel = this;
				var renderTo = Ext.get("centerPanel");
				this.sandbox.subscribe("GetGridSettingsInfo", this.getGridSettingsInfo, this, [gridSettingsId]);
				var params = this.sandbox.publish("GetHistoryState");
				this.sandbox.publish("PushHistoryState", {hash: params.hash.historyState});
				MaskHelper.ShowBodyMask();
				this.sandbox.loadModule("GridSettingsV2", {
					renderTo: renderTo,
					id: gridSettingsId,
					keepAlive: true
				});
				this.sandbox.subscribe("GridSettingsChanged", function(args) {
					if (args && args.newProfileData) {
						viewModel.set("gridProfile", args.newProfileData);
					}
					viewModel.isObsolete = true;
					viewModel.close();
				}, this, [gridSettingsId]);
				viewModel.hide();
			},

			/**
			 * Return gridSettings info
			 * @protected
			 * @return {Object} {{entitySchemaName: String, baseGridType: String, profileKey: String,
			 * notFoundColumns: String[]}} Grid settings info.
			 */
			getGridSettingsInfo: function() {
				return {
					entitySchemaName: this.getCurrentSchema().name,
					baseGridType: ConfigurationEnums.GridType.LISTED,
					profileKey: this.getProfileKey(),
					notFoundColumns: this.notFoundColumns
				};
			},

			/**
			 * Initialize "hasActions" value into view model.
			 */
			initHasActions: function() {
				var lookupInfo = this.getLookupInfo();
				var actionsButtonVisible = lookupInfo.actionsButtonVisible;
				if (!this.Ext.isBoolean(actionsButtonVisible) || actionsButtonVisible) {
					var schemaName = this.entitySchema.name;
					RightUtilities.getSchemaOperationRightLevel(schemaName, function(rightLevel) {
						this.initCanDelete(rightLevel);
						this.initCanAdd(rightLevel);
						this.initCanEdit(rightLevel, schemaName);
						this.set("hasActions", this.get("canEdit") || this.get("canDelete") ||
							this.get("canAdd"));
						if (lookupInfo.hideActions) {
							this.set("hasActions", false);
						}
					}, this);
				} else {
					this.set("hasActions", false);
				}
			},
			/**
			 * Initialize "canDelete" value into view model.
			 * @protected
			 * @param {Number} rightLevel Access level.
			 */
			initCanDelete: function(rightLevel) {
				if (RightUtilities.canDeleteSchemaData(rightLevel)) {
					this.set("canDelete", true);
				} else {
					this.set("canDelete", false);
				}
			},
			/**
			 * Initialize "canAdd" value into view model.
			 * @protected
			 * @param {Number} rightLevel Access level.
			 */
			initCanAdd: function(rightLevel) {
				if (RightUtilities.canAppendSchemaData(rightLevel)) {
					this.set("canAdd", true);
				} else {
					this.set("canAdd", false);
				}
			},
			/**
			 * Initialize "canEdit" value into view model.
			 * @protected
			 * @param {Number} rightLevel Access level.
			 * @param {String} schemaName Schema name.
			 */
			initCanEdit: function(rightLevel, schemaName) {
				var entityStructure = moduleUtils.getEntityStructureByName(schemaName);
				var hasEditPage = this.Ext.isEmpty(entityStructure);
				if (!RightUtilities.canEditSchemaData(rightLevel) || hasEditPage) {
					this.set("canEdit", false);
				} else {
					this.set("canEdit", true);
				}
			},
			isValidColumnDataValueType: function(column) {
				return (column.dataValueType === Terrasoft.DataValueType.TEXT ||
					column.dataValueType === Terrasoft.DataValueType.LOOKUP);
			},
			getSchemaColumns: function() {
				var entitySchema = this.getCurrentSchema();
				var schemaColumns = this.get("schemaColumns");
				schemaColumns.clear();
				var columns = Ext.create("Terrasoft.Collection");
				if (!this.get("primaryColumnFilterEnabled")) {
					Terrasoft.each(entitySchema.columns, function(entitySchemaColumn) {
						if (this.isValidColumnDataValueType(entitySchemaColumn) &&
							entitySchemaColumn.name !== entitySchema.primaryDisplayColumnName &&
							entitySchemaColumn.usageType !== ConfigurationEnums.EntitySchemaColumnUsageType.None) {
							var columnPath = entitySchemaColumn.name;
							if (entitySchemaColumn.isLookup) {
								columnPath += "." + entitySchemaColumn.referenceSchema.primaryDisplayColumnName;
							}
							var column = {
								value: columnPath,
								displayValue: entitySchemaColumn.caption
							};
							columns.add(column.name, column);
						}
					}, this);
					columns.sort(0, Terrasoft.OrderDirection.ASC, function(a, b) {
						if (a.displayValue < b.displayValue) {
							return -1;
						} else if (a.displayValue > b.displayValue) {
							return 1;
						} else {
							return 0;
						}
					});
				}
				columns.add(entitySchema.primaryDisplayColumn.name, {
					value: entitySchema.primaryDisplayColumn.name,
					displayValue: entitySchema.primaryDisplayColumn.caption
				}, 0);
				schemaColumns.loadAll(columns);
			},

			/**
			 * Prepares and sets caption text for modal window.
			 * @protected
			 */
			initCaptionLookup: function() {
				var lookupSchema = this.getCurrentSchema();
				this.set("lookupSchemaName", lookupSchema.name);
				var lookupInfo = this.getLookupInfo();
				if (!Ext.isEmpty(lookupInfo.captionLookup)) {
					this.set("captionLookup", lookupInfo.captionLookup);
					return;
				}
				var select = this.createLookupEsq(lookupSchema.uId);
				select.getEntityCollection(function(response) {
					var prefix = "";
					if (!lookupInfo.mode) {
						prefix = resources.localizableStrings.CaptionLookupPage;
					}
					if (response.collection.getCount() > 0) {
						var lookupName = response.collection.getByIndex(0).get("displayValue");
						this.set("captionLookup", prefix + lookupName);
					} else {
						this.set("captionLookup", prefix + lookupSchema.caption);
					}
				}, this);
			},

			emptyGridRowHistory: function() {
				var grid = this._getGridInstance();
				if (grid.watchRowHistory) {
					grid.watchRowHistory = [];
				}
			},
			getProfileKey: function() {
				var lookupInfo = this.getLookupInfo();
				var postfix = lookupInfo.lookupPostfix;
				var profileKey = "GridSettings_" + this.entitySchema.name;
				if (!this.Ext.isEmpty(postfix)) {
					profileKey += postfix;
				}
				return profileKey;
			},
			getDefaultProfile: function() {
				var primaryDisplayColumn = this.entitySchema.primaryDisplayColumn;
				var lookupInfo = this.getLookupInfo();
				var tiledColumnsConfig = null;
				var listedColumnsConfig = null;
				var captionsConfig = null;
				if (lookupInfo && !this.Ext.isEmpty(lookupInfo.sortedColumns)) {
					tiledColumnsConfig = [[{
						cols: 24,
						key: [{
							caption: primaryDisplayColumn.caption,
							name: {bindTo: primaryDisplayColumn.name},
							type: Terrasoft.GridKeyType.TITLE
						}],
						metaPath: primaryDisplayColumn.name,
						orderPosition: 0
					}]];
					listedColumnsConfig = [{
						cols: 24,
						key: [{
							name: {bindTo: primaryDisplayColumn.name}
						}],
						metaPath: primaryDisplayColumn.name,
						orderPosition: 0
					}];
					captionsConfig = [{
						cols: 24,
						columnName: primaryDisplayColumn.name,
						name: primaryDisplayColumn.caption
					}];
				} else {
					tiledColumnsConfig = [[{
						cols: 24,
						key: [{
							caption: primaryDisplayColumn.caption,
							name: {bindTo: primaryDisplayColumn.name},
							type: Terrasoft.GridKeyType.TITLE
						}],
						metaPath: primaryDisplayColumn.name,
						orderDirection: Terrasoft.OrderDirection.ASC,
						orderPosition: 0
					}]];
					listedColumnsConfig = [{
						cols: 24,
						key: [{
							name: {bindTo: primaryDisplayColumn.name}
						}],
						metaPath: primaryDisplayColumn.name,
						orderDirection: Terrasoft.OrderDirection.ASC,
						orderPosition: 0
					}];
					captionsConfig = [{
						cols: 24,
						columnName: primaryDisplayColumn.name,
						name: primaryDisplayColumn.caption,
						sortColumnDirection: Terrasoft.core.enums.OrderDirection.ASC
					}];
				}
				var key = this.getProfileKey();
				return {
					key: key,
					isTiled: false,
					listedColumnsConfig: Ext.encode(listedColumnsConfig),
					tiledColumnsConfig: Ext.encode(tiledColumnsConfig),
					captionsConfig: Ext.encode(captionsConfig)
				};
			}

			//endregion
		};

		/**
		 * Returns lookup view model values.
		 * @private
		 * @param {Object} lookupInfo The configuration parameters of the object lookup.
		 * @returns {Object} Lookup view model values.
		 */
		function _getViewModelValues(lookupInfo) {
			var activeRow = Ext.isEmpty(lookupInfo.selectedRows) ? null : lookupInfo.selectedRows[0];
			var values = {
				searchData: "",
				searchColumn: lookupInfo.searchColumn,
				previousSearchColumn: lookupInfo.searchColumn,
				schemaColumns: new Terrasoft.Collection(),
				gridProfile: lookupInfo.gridProfile,
				selectedRowsCount: 0,
				filteredRowsCount: 0,
				Caption: "",
				captionLookup: "",
				canEdit: true,
				canAdd: true,
				canDelete: true,
				hasActions: true,
				expandedElements: {},
				expandHierarchyLevels: null,
				gridData: new Terrasoft.Collection(),
				LookupInfo: lookupInfo,
				lookupMode: lookupInfo.mode,
				multiSelect: lookupInfo.multiSelect,
				usingMultiAddMixin: lookupInfo.usingMultiAddMixin,
				selectedRows: lookupInfo.selectedRows || null,
				activeRow: activeRow,
				isColumnSettingsHidden: lookupInfo.isColumnSettingsHidden,
				primaryColumnFilterEnabled: lookupInfo.primaryColumnFilterEnabled,
				useRecordDeactivation: lookupInfo.useRecordDeactivation
			};
			return values;
		}

		function generateViewModel(lookupInfo) {
			var values = _getViewModelValues(lookupInfo);
			var config = {
				name: "LookupPageModule",
				entitySchema: lookupInfo.entitySchema,
				columns: {},
				primaryColumnName: "",
				primaryDisplayColumnName: "",
				values: values,
				methods: methods,
				mixins: {
					QueryCancellationMixin: "Terrasoft.QueryCancellationMixin",
					GridUtilities: "Terrasoft.GridUtilities",
					GridProfileColumns: "Terrasoft.GridProfileColumnsMixin"
				}
			};
			return config;
		}
		return {
			generate: generateViewModel
		};
	});


