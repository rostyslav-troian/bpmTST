Terrasoft.configuration.Structures["ProductCatalogueFolderManagerViewModel"] = {innerHierarchyStack: ["ProductCatalogueFolderManagerViewModel"]};
define('ProductCatalogueFolderManagerViewModelStructure', ['ProductCatalogueFolderManagerViewModelResources'], function(resources) {return {schemaUId:'1191d9b1-884c-4a89-9e84-0adb9a183b08',schemaCaption: "Product catalogue FolderManager view model", parentSchemaName: "", schemaName:'ProductCatalogueFolderManagerViewModel',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProductCatalogueFolderManagerViewModel", ["ProductCatalogueFolderManagerViewModelResources",
	"ProductManagementDistributionConstants", "ProductCatalogueUtilities", "BaseFolderManagerViewModel"
], function(resources, DistributionConstants, ProductCatalogueUtilities) {
	Ext.define("Terrasoft.configuration.ProductCatalogueFolderManagerViewModel", {
		extend: "Terrasoft.BaseFolderManagerViewModel",
		alternateClassName: "Terrasoft.ProductCatalogueFolderManagerViewModel",

		/**
		 * Catalogue root folder data.
		 * @private
		 * @type {Object}
		 */
		_catalogueRootRecordItem: {
			value: DistributionConstants.ProductFolder.RootCatalogueFolder.RootId,
			displayValue: resources.localizableStrings.ProductCatalogueRootCaption
		},

		/**
		 * Product catalogue levels.
		 * @private
		 * @type {Terrasoft.Collection}
		 */
		_catalogueFolderLevels: null,

		/**
		 * Product catalogue first level data.
		 * @private
		 * @type {Array}
		 */
		_catalogueFolderFirstLevelItems: null,

		/**
		 * Max catalogue folder level.
		 * @private
		 * @type {Number}
		 */
		_catalogueFolderMaxLevel: 0,


		/**
		 * @inheritdoc Terrasoft.BaseFolderManagerViewModel#getRootFolderTypes
		 * @override
		 */
		getRootFolderTypes: function() {
			var folderTypes = this.callParent(arguments);
			folderTypes.push(this._catalogueRootRecordItem.value);
			return folderTypes;
		},

		/**
		 * @inheritdoc Terrasoft.BaseFolderManagerViewModel#load
		 * @override
		 */
		load: function() {
			var parentMethod = this.getParentMethod();
			var parentArguments = arguments;
			this.loadCatalogueFolders(parentMethod, parentArguments);
		},

		/**
		 * @inheritdoc Terrasoft.BaseFolderManagerViewModel#getLoadBatchQuery
		 * @override
		 */
		getLoadBatchQuery: function() {
			var batch = this.callParent(arguments);
			var rowItem = this._catalogueFolderLevels ? this._catalogueFolderLevels.first() : null;
			if (!Ext.isEmpty(rowItem)) {
				var select = this.getCatalogueLevelItemsSelect(rowItem, null);
				batch.add(select);
			}
			return batch;
		},

		/**
		 * @inheritdoc Terrasoft.BaseFolderManagerViewModel#handleLoadBatchResult
		 * @override
		 */
		handleLoadBatchResult: function(queryResults) {
			var queryResult = this.getLoadQueryResult(queryResults, ["ColumnPathValueId", "ColumnPathValueName",
				"ParentId", "ParentName", "Position", "ReferenceSchemaName"]);
			if (!Ext.isEmpty(queryResult)) {
				this._catalogueFolderFirstLevelItems = queryResult.rows;
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseFolderManagerViewModel#initializeRootFolders
		 * @override
		 */
		initializeRootFolders: function(rows) {
			Terrasoft.each(rows, function(folderTypeItem) {
				if (folderTypeItem.Id === this._catalogueRootRecordItem.value) {
					var itemValues = {
						value: folderTypeItem.Id,
						displayValue: folderTypeItem.Name,
						primaryImageValue: folderTypeItem.Image.value
					};
					this.catalogueRootRecordValues = {
						Id: this._catalogueRootRecordItem.value,
						Name: this._catalogueRootRecordItem.displayValue,
						Parent: "",
						FolderType: itemValues
					};
				}
			}, this);
			this.callParent(arguments);
		},

		/**
		 * Loads catalogue folders.
		 * @protected
		 */
		loadCatalogueFolders: function(callback, callbackArgs) {
			var esq = this.getCatalogueFolderSelect();
			esq.execute(function(response) {
				this._catalogueFolderLevels = response.collection;
				this._catalogueFolderMaxLevel = this._getMaxPosition();
				this.set("TypeCatalogueLevelPosition", this._getTypeCatalogueLevelPosition());
				ProductCatalogueUtilities.loadReferenceDisplayColumnNames(this._catalogueFolderLevels, function() {
					Ext.callback(callback, this, callbackArgs);
				}, this);
			}, this);
		},

		/**
		 * Returns the position of the catalog item that represents the type of product.
		 * @private
		 * @return {Number} The position of the top element representing the product type in the catalogue structure.
		 */
		_getTypeCatalogueLevelPosition: function() {
			var typeLevelPos = -1;
			this._catalogueFolderLevels.each(function(item) {
				if (item.get("ColumnPath") === "Type") {
					typeLevelPos = item.get("Position");
					return false;
				}
			});
			return typeLevelPos;
		},

		/**
		 * @inheritdoc Terrasoft.BaseFolderManagerViewModel#initializeCustomFolders
		 * @override
		 */
		initializeCustomFolders: function(foldersCollection, rowConfig) {
			this.callParent(arguments);
			if (this._catalogueFolderLevels && this._catalogueFolderLevels.getCount() > 0) {
				this.prepareCatalogueFolders(this._catalogueFolderFirstLevelItems, rowConfig, foldersCollection);
				var catalogueRootItem = this.getGridRecordByItemValues(rowConfig,
					this.catalogueRootRecordValues);
				foldersCollection[catalogueRootItem.get("Id")] = catalogueRootItem;
			}
		},

		/**
		 * Returns the maximum position of the catalogue group.
		 * @private
		 * @return {Number}
		 */
		_getMaxPosition: function() {
			var max = 0;
			this._catalogueFolderLevels.each(function(item) {
				max = Math.max(item.get("Position"), max);
			});
			return max;
		},

		/**
		 * @inheritdoc Terrasoft.BaseFolderManagerViewModel#dblClickGrid
		 * @override
		 */
		dblClickGrid: function(id) {
			if (this.getGridColumnValue(id, "IsInCatalogue")) {
				return;
			}
			this.callParent(arguments);
		},

		/**
		 * Returns query for select catalog levels.
		 * @protected
		 * @param {Object} nextRow
		 * @param {Object} currentRow
		 * @return {EntitySchemaQuery|*}
		 */
		getCatalogueLevelItemsSelect: function(nextRow, currentRow) {
			var columnPath = nextRow.get("ColumnPath");
			var select = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: nextRow.get("ReferenceSchemaName")
			});
			select.addColumn("Id", "ColumnPathValueId");
			let referenceDisplayColumnName = nextRow.get("ReferenceDisplayColumnName");
			var column = select.addColumn(referenceDisplayColumnName, "ColumnPathValueName");
			column.orderDirection = Terrasoft.OrderDirection.ASC;
			column.orderPosition = 0;
			select.addParameterColumn(columnPath, Terrasoft.DataValueType.TEXT, "ColumnPath");
			select.addParameterColumn(nextRow.get("Id"), Terrasoft.DataValueType.GUID, "ParentId");
			select.addParameterColumn(nextRow.get("Name"), Terrasoft.DataValueType.TEXT, "ParentName");
			select.addParameterColumn(nextRow.get("Position"), Terrasoft.DataValueType.INTEGER, "Position");
			select.addParameterColumn(nextRow.get("ReferenceSchemaName"), Terrasoft.DataValueType.TEXT,
				"ReferenceSchemaName");
			select.rowCount = -1;
			select.filters.addItem(
				Terrasoft.createColumnIsNotNullFilter(
					Ext.String.format("[Product:{0}:Id].{0}.Id", columnPath)
				)
			);
			if (currentRow) {
				select.filters.addItem(this.getParentRowsFilters(currentRow, nextRow));
			}
			var filterConfigs = this.getCatalogAdditionalFilterConfigs();
			if (filterConfigs.length > 0) {
				select.filters.addItem(this.getCatalogueAdditionalFilters(nextRow, filterConfigs));
			}
			return select;
		},

		/**
		 * Returns filters for product selection query.
		 * @protected
		 * @return {FilterGroup} Filter group.
		 */
		getParentRowsFilters: function(currentRow, nextRow) {
			var filtersGroup = Terrasoft.createFilterGroup();
			var parentRowId = currentRow.get("Parent");
			var parentRow = this.getGridColumn(parentRowId);
			var actualFolderId = currentRow.get("ActualCatalogueFolderId");
			var column = Ext.String.format("[Product:{0}:Id].{1}.Id", nextRow.get("ColumnPath"), currentRow.get("ColumnPath"));
			filtersGroup.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
				column, actualFolderId));
			if (!Ext.isEmpty(parentRow)) {
				filtersGroup.addItem(this.getParentRowsFilters.call(this, parentRow, nextRow));
			}
			return filtersGroup;
		},

		/**
		 * Returns catalog additional filter config array.
		 * @protected
		 * @return {Array} Filter configs array.
		 */
		getCatalogAdditionalFilterConfigs: function() {
			return [{
				columnPath: "IsArchive",
				value: false
			}];
		},

		/**
		 *
		 * @protected
		 * @param {Object} rowItem
		 * @param {Array} filterConfigs
		 * @return {Terrasoft.data.filters.FilterGroup} Filters group.
		 */
		getCatalogueAdditionalFilters: function(rowItem, filterConfigs) {
			var columnPath = rowItem.get("ColumnPath");
			var filterGroup = Terrasoft.createFilterGroup();
			Terrasoft.each(filterConfigs, function(filterItem) {
				var column = Ext.String.format("[Product:{0}:Id].{1}", columnPath, filterItem.columnPath);
				var filter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					column, filterItem.value);
				filterGroup.addItem(filter);
			}, this);
			return filterGroup;
		},

		/**
		 * Prepares selection of catalog groups.
		 * @protected
		 * @param {Array} catalogueFolderValues
		 * @param {Object} rowConfig
		 * @param {Object} scope
		 * @param {Object} resultItems
		 */
		prepareCatalogueFolders: function(catalogueFolderValues, rowConfig, resultItems) {
			var parent = this._catalogueRootRecordItem;
			Terrasoft.each(catalogueFolderValues, function(item) {
				this.addCatalogItem(item, rowConfig, parent.value, resultItems);
			}, this);
		},

		/**
		 * Adds catalog level item.
		 * @protected
		 * @param {Object} item
		 * @param {Object} rowConfig
		 * @param {String} parent
		 * @param {Object} resultItems
		 * @param {Object} scope
		 */
		addCatalogItem: function(item, rowConfig, parent, resultItems) {
			var gridItem = this.getGridRecordByItemValues(rowConfig, item);
			gridItem.set("FolderType", this.catalogueRootRecordValues.FolderType);
			var actualFolderId = gridItem.get("ColumnPathValueId");
			gridItem.set("Name", gridItem.get("ColumnPathValueName"));
			var compositeKey = actualFolderId + "_" + parent;
			if (!gridItem.get("Parent")) {
				gridItem.set("Parent", parent);
			}
			gridItem.set("HasNesting", item.Position === this._catalogueFolderMaxLevel ? 0 : 1);
			gridItem.set("Id", compositeKey);
			gridItem.set("FolderId", compositeKey);
			gridItem.set("ActualCatalogueFolderId", actualFolderId);
			gridItem.set("IsInFavorites", false);
			gridItem.set("IsInCatalogue", true);
			gridItem.set("IsOpenFilterButtonVisible", this.getIsOpenFilterButtonVisible(item));
			if (!resultItems[compositeKey]) {
				resultItems[compositeKey] = gridItem;
			}
		},

		/**
		 * Flag of ability to configure filters for a catalogue item.
		 * @protected
		 * @param {Object} item Catalog item.
		 * @returns {boolean} Returns true if the filter setting is available.
		 */
		getIsOpenFilterButtonVisible: function(item) {
			var currentItemPos = item.Position;
			var typeLevelPos = this.get("TypeCatalogueLevelPosition");
			if (Ext.isEmpty(typeLevelPos) || typeLevelPos === -1) {
				return false;
			}
			return (currentItemPos >= typeLevelPos);
		},

		/**
		 * @inheritdoc Terrasoft.BaseFolderManagerViewModel#getIsAdministratedByRecordsVisible
		 * @override
		 */
		getIsAdministratedByRecordsVisible: function() {
			if (Terrasoft.isCurrentUserSsp()) {
				return false;
			}
			return this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.BaseFolderManagerViewModel#showFolderInfo
		 * @override
		 */
		showFolderInfo: function(rowId) {
			if (this.currentEditElement) {
				var actualCatalogueFolderId = this.getGridColumnValue(rowId, "ActualCatalogueFolderId");
				this.currentEditElement.set("IsInCatalogue", false);
				if (actualCatalogueFolderId || rowId === this._catalogueRootRecordItem.value) {
					this.currentEditElement.set("IsInCatalogue", true);
					this.currentEditElement.set("Id", null);
					this.applyCatalogueFilters(rowId, true);
				} else {
					this.callParent(arguments);
				}
			} else {
				this.callParent(arguments);
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseFolderManagerViewModel#onExpandHierarchyLevels
		 * @override
		 */
		onExpandHierarchyLevels: function(itemKey, expanded) {
			this.callParent(arguments);
			var gridData = this.get("gridData");
			if (!expanded || !gridData.contains(itemKey)) {
				return;
			}
			var currentRow = gridData.get(itemKey);
			var isInCatalogue = currentRow.get("IsInCatalogue");
			if (isInCatalogue) {
				var currentRowPosition = currentRow.get("Position");
				var nextRow = this._getNextLevelItem(currentRowPosition);
				if (!Ext.isEmpty(nextRow)) {
					var select = this.getCatalogueLevelItemsSelect(nextRow, currentRow);
					select.execute(function(response) {
						this.handleCatalogueItemsSelect(response, itemKey);
					}, this);
				}
			}
		},

		/**
		 * Handles select of catalogue items.
		 * @protected
		 * @param {Terrasoft.BaseViewModelCollection} response Catalogue items select result.
		 * @param {String} itemKey Expanded item key.
		 */
		handleCatalogueItemsSelect: function(response, itemKey) {
			var items = {};
			var gridData = this.get("gridData");
			var row = gridData.get(itemKey);
			var itemsCollection = new Terrasoft.Collection();
			response.collection.each(function(item) {
				var currentId = item.get("ColumnPathValueId");
				var compositeKey = currentId + "_" + itemKey;
				if (!gridData.contains(compositeKey)) {
					this.addCatalogItem(item.values, row.rowConfig, itemKey, items);
				}
			}, this);
			itemsCollection.loadAll(items);
			if (itemsCollection.getCount() > 0) {
				gridData.loadAll(itemsCollection, {mode: "child", target: itemKey});
			} else {
				this._handleEmptyNestedItemsResult(itemKey);
			}
		},

		/**
		 * Handles empty nested items result, removing expand button from parent item.
		 * @param {String} itemKey Expanded item key.
		 * @private
		 */
		_handleEmptyNestedItemsResult: function(itemKey) {
			var grid = Ext.getCmp("foldersGrid");
			var childrens = [];
			grid.getAllItemChilds(childrens, itemKey);
			if (childrens.length === 0) {
				var toggle = Ext.get(grid.id + grid.hierarchicalTogglePrefix + itemKey);
				toggle.removeCls(grid.hierarchicalMinusCss);
				toggle.removeCls(grid.hierarchicalPlusCss);
			}
		},

		/**
		 * Returns next item of catalogue.
		 * @param {Number} currentPosition Current position in catalogue.
		 * @return {Object} Item of catalogue.
		 * @private
		 */
		_getNextLevelItem: function(currentPosition) {
			var nextItem = this._catalogueFolderLevels.findByFn(function(item) {
				var position = item.get("Position");
				return position === currentPosition + 1;
			}, this);
			return nextItem;
		},

		/**
		 * @inheritdoc Terrasoft.BaseFolderManagerViewModel#onActiveRowAction
		 * @override
		 */
		onActiveRowAction: function(tag) {
			if (tag === "extendFilter") {
				this.showExtendCatalogueFilter();
			} else {
				this.callParent(arguments);
			}
		},

		/**
		 * Returns a query to select the levels of the catalog groups.
		 * @protected
		 * @return {EntitySchemaQuery|*}
		 */
		getCatalogueFolderSelect: function() {
			var select = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "ProductCatalogueLevel"
			});
			select.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
			select.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name");
			select.addColumn("ColumnCaption");
			select.addColumn("ColumnPath");
			select.addColumn("ReferenceSchemaName");
			var column = select.addColumn("Position");
			column.orderDirection = Terrasoft.OrderDirection.ASC;
			column.orderPosition = 0;
			select.skipRowCount = this.pageNumber * this.pageRowsCount;
			select.rowCount = -1;
			return select;
		},

		/**
		 * @inheritdoc Terrasoft.BaseFolderManagerViewModel#getNewFolderParentId
		 * @override
		 */
		getNewFolderParentId: function() {
			var activeRow = this.get("activeRow");
			var row = this.getGridColumn(activeRow);
			return row.get("IsInCatalogue")
				? this.allFoldersRecordItem.value
				: this.callParent(arguments);
		},

		/**
		 * Returns full path of catalog filter.
		 * @protected
		 * @param {Object} activeRow
		 * @return {String}
		 */
		getCatalogueFilterFullName: function(activeRow) {
			var names = this.getCatalogueFilterFullNameParts(activeRow);
			names.reverse();
			return names.join(" / ");
		},

		/**
		 * Returns an array of catalogue paths.
		 * @protected
		 * @param {String} itemKey
		 * @return {Array}
		 */
		getCatalogueFilterFullNameParts: function(itemKey) {
			var folderNames = [];
			var gridData = this.get("gridData");
			var row = gridData.get(itemKey);
			var parentKey = row.get("Parent");
			if (Ext.isEmpty(parentKey)) {
				return folderNames;
			}
			folderNames.push(row.get("Name"));
			return Ext.Array.merge(folderNames, this.getCatalogueFilterFullNameParts(parentKey));
		},

		/**
		 * Handles click on extended filter icon in product catalogue.
		 * @protected
		 */
		showExtendCatalogueFilter: function() {
			var activeRow = this.getActiveRow();
			var moduleId = this.sandbox.id + "_SpecificationFilterModule";
			this.set("SpecificationFilterModuleId", moduleId);
			this.set("IsFoldersContainerVisible", false);
			this.set("IsExtendCatalogueFilterContainerVisible", true);
			this.subscribeFilterEvents(moduleId, activeRow);
		},

		/**
		 * Subscribes for filter events.
		 * @protected
		 * @virtual
		 * @param {String} moduleId
		 * @param {String} activeRow
		 */
		subscribeFilterEvents: function(moduleId, activeRow) {
			this.sandbox.subscribe("CloseExtendCatalogueFilter", function() {
				this.resetFolderView();
				this.sandbox.unloadModule(moduleId);
			}, this, [moduleId]);
			this.sandbox.subscribe("GetExtendCatalogueFilterInfo", function() {
				var name = this.getCatalogueFilterFullName(activeRow);
				var productTypeId = this._extractProductTypeIdFromComposite(activeRow);
				return {
					activeRow: activeRow,
					displayValue: name,
					productType: productTypeId
				};
			}, this, [moduleId]);
			this.sandbox.subscribe("UpdateExtendCatalogueFilter", function(args) {
				this.set("ExtendedCatalogueFilters", args.filters);
				this.applyCatalogueFilters(args.rowId, true);
			}, this, [moduleId]);
			this.sandbox.loadModule("SpecificationFilterModule", {
				renderTo: "extendCatalogueFilterContainer_" + this.sandbox.id,
				id: moduleId
			});
		},

		/**
		 * Gets product type identifier from composite identifier of product catalogue element.
		 * @private
		 * @param {Object} compositeId identifier of product catalogue element.
		 * @return {String|null} Product type identifier or null.
		 */
		_extractProductTypeIdFromComposite: function(compositeId) {
			var typeLevelPos = this.get("TypeCatalogueLevelPosition");
			if (Ext.isEmpty(typeLevelPos) || typeLevelPos === -1 || Ext.isEmpty(compositeId)) {
				return null;
			}
			var ids = compositeId.split("_").reverse();
			var productTypeId = ids[typeLevelPos + 1];
			return productTypeId;
		},

		/**
		 * @inheritdoc Terrasoft.BaseObject#onDestroy
		 * @override
		 */
		onDestroy: function() {
			this.sandbox.unloadModule(this.get("SpecificationFilterModuleId"));
			this.callParent(arguments);
		},

		/**
		 * Restores modules visible state.
		 * @protected
		 */
		resetFolderView: function() {
			this.set("IsFoldersContainerVisible", true);
			this.set("IsExtendCatalogueFilterContainerVisible", false);
		},

		/**
		 * @inheritdoc Terrasoft.BaseFolderManagerViewModel#closeFolderManager
		 * @override
		 */
		closeFolderManager: function() {
			var sectionFilterModuleId = this.sandbox.publish("GetSectionFilterModuleId");
			if (!Ext.isEmpty(this.currentEditElement)) {
				if (this.currentEditElement.get("IsInCatalogue")) {
					this.applyCatalogueFilters(this.get("activeRow"), true);
				} else {
					this.applyFolderFilters(this.currentEditElement.get("Id"), true);
				}
			}
			this.sandbox.publish("HideFolderTree", null, [sectionFilterModuleId]);
		},

		/**
		 * Returns grid column.
		 * @protected
		 * @param {String} rowId
		 * @return {String|null}
		 */
		getGridColumn: function(rowId) {
			var gridData = this.get("gridData");
			if (!Ext.isEmpty(gridData) && rowId && gridData.contains(rowId)) {
				return gridData.get(rowId);
			}
			return null;
		},

		/**
		 * Applies group catalogue filters.
		 * @protected
		 * @param {String} rowId
		 */
		applyCatalogueFilters: function(rowId, addToQuickFilter) {
			if (Ext.isEmpty(rowId)) {
				return;
			}
			var row = this.getGridColumn(rowId);
			if (Ext.isEmpty(row)) {
				return;
			}
			var filtersGroup = Terrasoft.createFilterGroup();
			var extendedCatalogueFilters = this.get("ExtendedCatalogueFilters");
			if (extendedCatalogueFilters) {
				filtersGroup.add("ExtendedCatalogueFilters", extendedCatalogueFilters);
			}
			if (this.get("IsProductSelectMode")) {
				var filtersGroupResult = Terrasoft.createFilterGroup();
				if (rowId !== this._catalogueRootRecordItem.value) {
					filtersGroup.add("CatalogueFilters", this._getCatalogFolderFilters(row));
				}
				filtersGroupResult.add("FolderFilters", filtersGroup);
				var filterItem = {
					filters: filtersGroupResult
				};
				this.sandbox.publish("UpdateCatalogueFilter", filterItem);
			}
			if (addToQuickFilter) {
				var resultFiltersObject = this._getResultFiltersObject(row, filtersGroup);
				this.sandbox.publish("ResultFolderFilter", resultFiltersObject, [this.sandbox.id]);
			}
		},

		/**
		 * Returns catalog folder filters.
		 * @private
		 * @param {Object} row
		 */
		_getCatalogFolderFilters: function(row) {
			var filtersGroup = Terrasoft.createFilterGroup();
			var actualFolderId = row.get("ActualCatalogueFolderId");
			filtersGroup.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
				row.get("ColumnPath"), actualFolderId));
			var parentRowId = row.get("Parent");
			if (!Ext.isEmpty(parentRowId)) {
				var parentRow = this.getGridColumn(parentRowId);
				if (!Ext.isEmpty(parentRow)) {
					filtersGroup.addItem(this._getCatalogFolderFilters(parentRow));
				}
			}
			return filtersGroup;
		},

		/**
		 * Returns catalog folder filter object.
		 * @private
		 * @param {Object} row
		 * @param {Terrasoft.FilterGroup} filtersGroup Catalog folder filter object.
		 */
		_getResultFiltersObject: function(row, filtersGroup) {
			var serializationInfo = filtersGroup.getDefSerializationInfo();
			serializationInfo.serializeFilterManagerInfo = true;
			return {
				value: row.get("ActualCatalogueFolderId"),
				displayValue: this.getCatalogueFilterFullName(row.get("Id")),
				filter: filtersGroup.serialize(serializationInfo),
				folder: row,
				folderType: row.get("FolderType"),
				sectionEntitySchemaName: this.entitySchema.name
			};
		},

		/**
		 * @inheritdoc Terrasoft.BaseFolderManagerViewModel#applyFolderFilters
		 * @override
		 */
		applyFolderFilters: function(rowId) {
			if (this.get("IsProductSelectMode")) {
				var filtersGroupResult = Terrasoft.createFilterGroup();
				var filtersGroup = this.getFolderFilters(rowId);
				filtersGroupResult.add("FolderFilters", filtersGroup);
				var filterItem = {
					filters: filtersGroupResult
				};
				this.sandbox.publish("UpdateCatalogueFilter", filterItem);
			} else {
				this.callParent(arguments);
			}
		}
	});

	return Terrasoft.ProductCatalogueFolderManagerViewModel;
});


