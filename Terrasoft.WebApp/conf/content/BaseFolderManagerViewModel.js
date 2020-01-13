Terrasoft.configuration.Structures["BaseFolderManagerViewModel"] = {innerHierarchyStack: ["BaseFolderManagerViewModel"]};
define("BaseFolderManagerViewModel", [
	"BaseFolderManagerViewModelResources",
	"ResponseExceptionHelper",
	"ConfigurationConstants",
	"LookupUtilities",
	"ServiceHelper",
	"FolderFilterItemViewModel",
	"FolderGridRowViewModel"
], function(resources, ResponseExceptionHelper, ConfigurationConstants, LookupUtilities, ServiceHelper) {
	return Ext.define("Terrasoft.BaseFolderManagerViewModel", {
		extend: "Terrasoft.BaseViewModel",

		////TODO: Fix move folder

		_section: null,
		_sectionEntitySchema: null,
		_entityColumnNameInFolderEntity: null,
		_inFolderEntitySchemaName: null,
		sandbox: null,

		/**
		 * All folders root folder data.
		 * @protected
		 * @type {Object}
		 */
		allFoldersRecordItem: null,

		/**
		 * Favorites root folder data.
		 * @protected
		 * @type {Object}
		 */
		favoriteRootRecordItem: null,

		/**
		 * Folder filter item view model.
		 * @protected
		 * @type {Terrasoft.FolderFilterItemViewModel}
		 */
		currentEditElement: null,

		_activeFolderId: null,

		_translations: resources.localizableStrings,

		_getFolderTypeFilter: function() {
			var groupFilters = Ext.create("Terrasoft.FilterGroup");
			groupFilters.logicalOperation = Terrasoft.LogicalOperatorType.OR;
			var folderTypes = this.getRootFolderTypes();
			folderTypes.forEach(function(rootTypeId) {
				groupFilters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Id",
						rootTypeId));
			});
			return groupFilters;
		},

		/**
		 * Returns root folders array.
		 * @return {Array} Root folders array.
		 */
		getRootFolderTypes: function() {
			return [
				ConfigurationConstants.Folder.Type.General,
				ConfigurationConstants.Folder.Type.Favorite
			];
		},

		_removeRowActions: function(rowId) {
			var grid = Ext.getCmp("foldersGrid");
			grid.removeRowActions(rowId);
		},

		_findFolder: function(folder, searchId) {
			var result = null;
			if (folder.id === searchId) {
				result = folder;
			} else {
				var children = folder.children || [];
				Terrasoft.each(children, function(child) {
					result = result || this._findFolder(child, searchId);
					return Ext.isEmpty(result);
				}, this);
			}
			return result;
		},

		_addCustomFolder: function(items, parentId, child) {
			var childId = child.id || Terrasoft.generateGUID();
			var childItem = this.getGridRecordByItemValues(this.getChildFolderRowConfig(), {
				Id: childId,
				Name: child.caption,
				Parent: {value: parentId},
				FolderType: this.allFoldersRecordValues.FolderType
			});
			items[childId] = childItem;
			var childrens = child.children || [];
			childrens.forEach(function(children) {
				this._addCustomFolder(items, childId, children);
			}, this);
		},

		_modifyFolderFunc: Terrasoft.emptyFn,

		handleLoadBatchResult: Terrasoft.emptyFn,

		showCustomFolderInfo: Terrasoft.emptyFn,

		/**
		 * Returns the value of the schema localizable string.
		 * @param {String} key Localizable string key.
		 * @return {String} Localizable string value.
		 */
		getLocalizableString: function(key) {
			return this._translations[key] || "";
		},

		getCustomFoldersConfig: function() {
			return {};
		},

		getLoadQueryResult: function(queryResults, columns) {
			return Ext.Array.findBy(queryResults, function(queryResult) {
				return Ext.Array.every(columns, function(columnName) {
					return !Ext.isEmpty(queryResult.rowConfig[columnName]);
				}, this);
			}, this);
		},

		cancelButton: function() {
			this.cancelSelecting();
		},

		changeMultiSelectMode: function() {
			if (this.get("enableMultiSelect")) {
				var multiSelect = !this.get("multiSelect");
				this.set("activeRow", null);
				this.changeGridMode(multiSelect);
			}
		},

		clear: function() {
			this.set("activeRow", null);
			var collection = this.get("gridData");
			collection.clear();
			this.pageNumber = 0;
		},

		getGridData: function() {
			return this.get("gridData");
		},

		dblClickGrid: function(id) {
			if (!this.get("isGridDoubleClickAllowed")) {
				this.set("isGridDoubleClickAllowed", true);
				return;
			}
			if (id && this.getIsFolderSelected() && !this.get("multiSelect") && !this.isCustomFolder(id)) {
				this.set("activeRow", id);
				this.currentEditElement.loadEntity(id, function() {
					this.renameFolder();
				}, this);
			}
		},

		deleteButton: function() {
			var multiSelect = this.get("multiSelect");
			var selectedRows = this.get("selectedRows");
			var activeRow = this.get("activeRow");
			var isDeleteAllowed = multiSelect && selectedRows && selectedRows.length > 0;
			isDeleteAllowed = isDeleteAllowed || !multiSelect && activeRow;
			if (isDeleteAllowed) {
				this.showConfirmationDialog(this.getLocalizableString("OnDeleteWarning"), function(returnCode) {
					if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
						this.onDeleteAccept();
					}
				}, ["yes", "no"]);
			}
		},

		initAllFoldersSelect: function() {
			var select = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchema: this.entitySchema
			});
			select.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
			var column = select.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name");
			column.orderDirection = Terrasoft.OrderDirection.ASC;
			column.orderPosition = 0;
			select.addColumn("Parent");
			select.addColumn("FolderType");
			if (!this.get("useStaticFolders")) {
				select.filters.addItem(select.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL,
						"FolderType", ConfigurationConstants.Folder.Type.General));
			}
			select.filters.addItem(select.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL,
					"FolderType", ConfigurationConstants.Folder.Type.RootEmail));
			select.skipRowCount = this.pageNumber * this.pageRowsCount;
			select.rowCount = -1;
			return select;
		},

		initFavoriteFoldersSelect: function() {
			var select = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "FolderFavorite"
			});
			select.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
			select.addColumn("FolderId");
			var columnPath = Ext.String.format("[{0}:Id:FolderId].Name", this.entitySchema.name);
			var column = select.addColumn(columnPath, "Name");
			column.orderDirection = Terrasoft.OrderDirection.ASC;
			column.orderPosition = 0;
			var filters = Ext.create("Terrasoft.FilterGroup");
			filters.addItem(select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "SysAdminUnit",
					Terrasoft.SysValue.CURRENT_USER.value));
			filters.addItem(select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"FolderEntitySchemaUId", this.entitySchema.uId));
			select.filters = filters;
			return select;
		},

		initFolderTypesSelect: function() {
			var select = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "FolderType"
			});
			select.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
			select.addColumn("Name");
			select.addColumn("Image");
			var filters = Ext.create("Terrasoft.FilterGroup");
			filters.addItem(this._getFolderTypeFilter());
			select.filters = filters;
			return select;
		},

		initializeRootFolders: function(rows) {
			Terrasoft.each(rows, function(folderTypeItem) {
				var itemValues = {
					value: folderTypeItem.Id,
					displayValue: folderTypeItem.Name,
					primaryImageValue: folderTypeItem.Image.value
				};
				switch (folderTypeItem.Id) {
					case ConfigurationConstants.Folder.Type.General:
						this.allFoldersRecordValues = {
							Id: this.allFoldersRecordItem.value,
							Name: this.allFoldersRecordItem.displayValue,
							Parent: "",
							FolderType: itemValues
						};
						break;
					case ConfigurationConstants.Folder.Type.Favorite:
						this.favoriteRootRecordValues = {
							Id: this.favoriteRootRecordItem.value,
							Name: this.favoriteRootRecordItem.displayValue,
							Parent: "",
							FolderType: itemValues
						};
						break;
					default:
						break;
				}
			}, this);
		},

		initializeCustomFolders: function(foldersCollection, rowConfig) {
			Terrasoft.each(this.getCustomFoldersConfig(), function(item) {
				var rootFolder = {
					Id: item.id || Terrasoft.generateGUID(),
					Name: item.caption,
					Parent: "",
					Children: item.children || [],
					FolderType: {
						value: item.id,
						displayValue: "",
						primaryImageValue: item.imageId
					}
				};
				var rootFolderItem = this.getGridRecordByItemValues(rowConfig, rootFolder);
				var rootFolderId = rootFolderItem.get("Id");
				foldersCollection[rootFolderId] = rootFolderItem;
				this.set("expandHierarchyLevels", [rootFolderId]);
				rootFolder.Children.forEach(function(child) {
					this._addCustomFolder(foldersCollection, rootFolderId, child);
				}, this);
			}, this);
		},

		prepareAllFolders: function(rows, rowConfig, resultItems) {
			Terrasoft.each(rows, function(rowItem) {
				var gridItem = this.getGridRecordByItemValues(rowConfig, rowItem);
				var actualFolderId = gridItem.get("Id");
				var useStaticFolders = this.get("useStaticFolders");
				if (!gridItem.get("Parent")) {
					gridItem.set("Parent", this.allFoldersRecordItem);
				}
				gridItem.set("actualFolderId", actualFolderId);
				gridItem.set("isInFavorites", false);
				gridItem.set("useStaticFolders", useStaticFolders);
				gridItem.set("administratedByRecords", this.getIsAdministratedByRecordsVisible(gridItem));
				resultItems[actualFolderId] = gridItem;
			}, this);
		},

		/**
		 * Get is administratedByRecords property visible.
		 * @virtual
		 * @protected
		 * @param gridItem Row item.
		 * @returns {Boolean} Return true when administratedByRecords property visible.
		 */
		getIsAdministratedByRecordsVisible: function(gridItem) {
			return gridItem.entitySchema.administratedByRecords;
		},

		prepareFavoriteFolders: function(rows, rowConfig, resultItems) {
			Terrasoft.each(rows, function(rowItem) {
				var folderId = rowItem.FolderId;
				var folderItem = resultItems[folderId];
				if (!Ext.isEmpty(folderItem)) {
					var newId = Terrasoft.generateGUID();
					var newItem = this.getGridRecordByItemValues(rowConfig, folderItem.values);
					newItem.set("actualFolderId", folderId);
					newItem.set("isInFavorites", true);
					folderItem.set("isInFavorites", true);
					newItem.set("Id", newId);
					newItem.set("Parent", this.favoriteRootRecordItem);
					resultItems[newId] = newItem;
				}
			}, this);
		},

		/**
		 * Returns selected favorite folder.
		 * @private
		 * @param {Object} items Grid items.
		 * @return {String} Favorite folder identifier.
		 */
		_getSelectedFavoriteFolder: function(items) {
			var favoriteFolderId = null;
			Terrasoft.each(items, function(item) {
				if (item.get("isInFavorites") && this.currentEditElement.get("Id") === item.get("actualFolderId")) {
					favoriteFolderId = item.get("Id");
					return false;
				}
			}, this);
			return favoriteFolderId;
		},

		getLoadBatchQuery: function() {
			var batch = Ext.create("Terrasoft.BatchQuery");
			batch.add(this.initAllFoldersSelect());
			batch.add(this.initFavoriteFoldersSelect());
			batch.add(this.initFolderTypesSelect());
			return batch;
		},

		getChildFolderRowConfig: function() {
			return {
				"Id": {
					"dataValueType": 0
				},
				"Name": {
					"dataValueType": 1
				},
				"Parent": {
					"dataValueType": 10,
					"isLookup": true
				},
				"FolderType": {
					"dataValueType": 10,
					"isLookup": true,
					"referenceSchemaName": "FolderType",
					"primaryImageColumnName": "Image"
				}
			};
		},

		isCustomFolder: function(id) {
			return !Ext.isEmpty(this.findCustomFolderConfig(id));
		},

		findCustomFolderConfig: function(id) {
			var result = null;
			var customFolders = this.getCustomFoldersConfig();
			Terrasoft.each(customFolders, function(customFolder) {
				result = result || this._findFolder(customFolder, id);
				return Ext.isEmpty(result);
			}, this);
			return result;
		},

		/**
		 * Init view model.
		 */
		init: function(callback, scope) {
			this.currentEditElement =
					this.getFolderEditViewModel(ConfigurationConstants.Folder.Type.General);
			this.set("administratedButtonVisible", false);
			this.setActiveRow(this._activeFolderId);
			this.load(callback, scope);
		},

		/**
		 * Loads view model data.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		load: function(callback, scope) {
			this.pageNumber = this.pageNumber || 0;
			this.pageRowsCount = this.pageRowsCount || 15;
			var batch = this.getLoadBatchQuery();
			batch.execute(function(response) {
				if (response && response.success && response.queryResults) {
					var batchResult = response.queryResults;
					this.handleLoadBatchResult(batchResult);
					var items = {};
					this._loadGridItems(batchResult, items);
					this._expandRootFolders();
					var collection = this.get("gridData");
					collection.clear();
					this.set("activeRow", null);
					var activeRow = this._getSelectedFavoriteFolder(items) || this.get("activeRowToSet");
					if (activeRow) {
						this.expandToSelectedItems([activeRow], items);
					} else {
						collection.loadAll(items);
					}
				}
				Ext.callback(callback, scope || this);
			}, this);
		},

		/**
		 * Loads grid items.
		 * @private
		 * @param {Array} batchResult Query results.
		 * @param {Object} items Grid items.
		 */
		_loadGridItems: function(batchResult, items) {
			var allFolders = this.getLoadQueryResult(batchResult, ["Parent", "FolderType"]);
			var rootFolders = this.getLoadQueryResult(batchResult, ["Image"]);
			var favoriteFolders = this.getLoadQueryResult(batchResult, ["FolderId"]);
			var rowConfig = allFolders.rowConfig;
			this.initializeRootFolders(rootFolders.rows);
			this.prepareAllFolders(allFolders.rows, rowConfig, items);
			this.prepareFavoriteFolders(favoriteFolders.rows, rowConfig, items);
			var allFoldersItem = this.getGridRecordByItemValues(rowConfig, this.allFoldersRecordValues);
			var favoriteRootItem = this.getGridRecordByItemValues(rowConfig, this.favoriteRootRecordValues);
			this.initializeCustomFolders(items, rowConfig);
			items[favoriteRootItem.get("Id")] = favoriteRootItem;
			items[allFoldersItem.get("Id")] = allFoldersItem;
			this.allFoldersItem = allFoldersItem;
		},

		/**
		 * Expands root folders.
		 * @private
		 */
		_expandRootFolders: function() {
			this.set("expandHierarchyLevels", this.getExpandableRootFolders());
		},

		/**
		 * Returns identifiers for root folders which will be expanded after loading.
		 * @protected
		 * @return {Array} Expandable root folders array.
		 */
		getExpandableRootFolders: function() {
			return [this.favoriteRootRecordItem.value, this.allFoldersRecordItem.value];
		},

		loadNext: function() {
			this.pageNumber++;
			this.load();
		},

		moveFolder: function() {
			var activeRow = this.get("activeRow");
			if (activeRow) {
				activeRow = this.getActualFolderId(activeRow);
			}
			var selectedRows = this.get("selectedRows");
			if (activeRow || (selectedRows && selectedRows.length > 0)) {
				this.set("currentFolders", (selectedRows && selectedRows.length) ? selectedRows : [activeRow]);
				this.previousModeMultiSelect = this.get("multiSelect");
			}
			var folders = this.get("currentFolders") || [];
			this.processMoveFolders(folders, function() {
				this.load();
			});
		},

		onActiveRowChanged: function() {
			this.showFolderInfo.apply(this, arguments);
		},

		onDeleted: function() {
			this.set("activeRow", null);
			this.setActiveRow(this.allFoldersRecordValues.Id);
			this.set("selectedRows", []);
			this.load();
		},

		selectButton: function() {
			this.renameFolder();
		},

		_checkIsCustomFolder: function(rowId) {
			var result = false;
			if (this.isCustomFolder(rowId)) {
				this._removeRowActions(rowId);
				this.showCustomFolderInfo(rowId);
				result = true;
			}
			return result;
		},

		_getActiveRowId: function(rowId) {
			if (!rowId) {
				rowId = this.get("activeRow");
			}
			return rowId;
		},

		_setActiveRowIdDefValue: function(rowId) {
			if (rowId === this.favoriteRootRecordItem.value) {
				this.set("activeRow", null);
			}
		},

		_updateGridDoubleClickAllowed: function() {
			if (!this.get("isGridDoubleClickAllowed")) {
				this.set("isGridDoubleClickAllowed", true);
			}
		},

		_getParentRow: function(rowId) {
			var parentRow;
			if (!Ext.isEmpty(rowId)) {
				parentRow = this.getGridColumnValue(rowId, "Parent");
				this.set("isFavoriteSelected", parentRow === this.favoriteRootRecordItem);
				this._removeRowActions(rowId);
			}
			return parentRow;
		},

		_setAdministratedButtonVisibility: function(parentRow) {
			var administratedButtonVisibility = this.entitySchema.administratedByRecords && !Ext.isEmpty(parentRow) &&
					!this.get("multiSelect");
			this.set("administratedButtonVisible", administratedButtonVisibility);
		},

		_addGridRowAction: function(rowId) {
			if (rowId !== this.favoriteRootRecordItem.value && rowId !== this.allFoldersRecordItem.value) {
				var grid = Ext.getCmp("foldersGrid");
				grid.addRowActions(rowId);
			}
		},

		_setRenameAndSelectEnabledProperties: function(canRename, canSelectEnabled) {
			this.set("canRename", canRename);
			this.set("selectEnabled", canSelectEnabled);
		},

		_setCurrentEditElementDefValues: function() {
			this.currentEditElement.set("Id", null);
			this.currentEditElement.set("Name", null);
			this.currentEditElement.set("FolderType", null);
		},

		_initCurrentEditElementData: function(rowId) {
			var actualFolderId = this.getActualFolderId(rowId);
			if (actualFolderId) {
				this.currentEditElement.loadEntity(actualFolderId, function() {
					this.applyFolderFilters(this.currentEditElement.get("Id"), true);
				}, this);
			} else if (rowId === this.favoriteRootRecordItem.value ||
					rowId === this.allFoldersRecordItem.value) {
				this._setCurrentEditElementDefValues();
				this.applyFolderFilters(rowId, true);
			}
		},

		/**
		 * Applies filters to folders and sets row actions.
		 * @protected
		 * @param {String} rowId
		 */
		showFolderInfo: function(rowId) {
			if (this._checkIsCustomFolder(rowId)) {
				return;
			}
			rowId = this._getActiveRowId(rowId);
			this._setActiveRowIdDefValue(rowId);
			this._updateGridDoubleClickAllowed();
			var parentRow = this._getParentRow(rowId);
			this._setAdministratedButtonVisibility(parentRow);
			if (rowId && !this.get("multiSelect")) {
				if (this.currentEditElement) {
					this._initCurrentEditElementData(rowId);
				}
				this._addGridRowAction(rowId);
				this._setRenameAndSelectEnabledProperties(!Ext.isEmpty(parentRow), !Ext.isEmpty(parentRow));
			} else {
				this._setRenameAndSelectEnabledProperties(false, rowId && !Ext.isEmpty(parentRow));
			}
		},

		fillExpandedLevels: function(selectedRow, items, expandedLevels) {
			if (items.contains(selectedRow)) {
				var parent = items.get(selectedRow).get("Parent");
				if (parent && !Terrasoft.contains(expandedLevels, parent.value)) {
					expandedLevels.push(parent.value);
					this.fillExpandedLevels(parent.value, items, expandedLevels);
				}
			}
		},

		expandToSelectedItems: function(selectedRows, items) {
			var expandLevels = [];
			if (selectedRows && selectedRows.length > 0) {
				var itemsCollection = new Terrasoft.Collection();
				itemsCollection.loadAll(items);
				Terrasoft.each(selectedRows, function(selectedRow) {
					this.fillExpandedLevels(selectedRow, itemsCollection, expandLevels);
				}, this);
				this.set("expandHierarchyLevels", expandLevels);
				var collection = this.get("gridData");
				collection.loadAll(items);
				if (collection.contains(selectedRows[0])) {
					this.set("activeRow", selectedRows[0]);
				}
			} else {
				this.set("expandHierarchyLevels", expandLevels);
			}
		},

		onExpandHierarchyLevels: function() {
			this.set("isGridDoubleClickAllowed", false);
		},

		onActiveRowAction: function(tag) {
			switch (tag) {
				case "favorite":
					this.doFavoriteFolderAction();
					break;
				case "editFilter":
					this.editFolderFilters();
					break;
				case "moveFolder":
					this.moveFolder();
					break;
				case "renameFolder":
					this.renameFolder();
					break;
				case "deleteButton":
					this.deleteButton();
					break;
				case "editRights":
					this.editRights();
					break;
				case "copyFolder":
					this.copyFolder();
					break;
				case "convertFilter":
					this.convertFolder();
					break;
				default:
					this.error(Ext.create("Terrasoft.NotImplementedException"));
					break;
			}
		},

		setActiveRow: function(rowId) {
			this.set("activeRowToSet", rowId);
		},

		sendUpdateFavoritesMenu: function(folderEntitySchemaName, folderSchemaUId) {
			var quickFilterModuleId = this.sandbox.publish("GetSectionFilterModuleId");
			this.sandbox.publish("UpdateFavoritesMenu", {
				folderEntitySchemaName: folderEntitySchemaName,
				folderSchemaUId: folderSchemaUId
			}, [quickFilterModuleId]);
		},

		resultSelectedFolders: function(selectedFolders) {
			if (this._section) {
				this.loadSection(selectedFolders);
			} else {
				this.sandbox.publish("ResultSelectedFolders", {
					folders: selectedFolders
				}, [this.sandbox.id]);
				this.sandbox.publish("BackHistoryState");
			}
		},

		loadSection: function(selectedFolders) {
			var newState = {
				filterState: {
					folderFilterState: selectedFolders || []
				}
			};
			var url = "SectionModule/" + this._section + "/";
			this.sandbox.publish("PushHistoryState", {
				hash: url,
				stateObj: newState
			});
		},

		cancelSelecting: function() {
			if (this._section) {
				this.loadSection();
			} else {
				this.sandbox.publish("BackHistoryState");
			}
		},

		addGeneralFolderButton: function() {
			this.addFolder(ConfigurationConstants.Folder.Type.General);
		},

		/**
		 * Convert folder from dynamic to static
		 */
		convertFolder: function() {
			var currentEditElement = this.currentEditElement;
			if (Ext.isEmpty(currentEditElement)) {
				return;
			}
			this.addConvertFolderButton();
		},

		/**
		 * Create new static folder
		 */
		addConvertFolderButton: function() {
			var activeRow = this.getActiveRow();
			var parent = this.getBaseParentFolderIfRowFromCatalogue(activeRow);
			var folderGeneralType = ConfigurationConstants.Folder.Type.General;
			this.currentEditElement.createNewFolder(folderGeneralType, parent, this.renameConvertFolder, this);
		},

		addFolder: function(folderTypeId, callback, scope) {
			var parent = this.getNewFolderParentId();
			this.currentEditElement.createNewFolder(folderTypeId, parent, function() {
				this._renameFolder(this.nameInputBoxAddNewFolderHandler, this);
				Ext.callback(callback, scope);
			}, this);
		},

		/**
		 * Get column parent
		 * @param {string} rowId
		 * @returns {*}
		 */
		getBaseParentFolderIfRowFromCatalogue: function(rowId) {
			var result = rowId;
			var row = this.findGridRow(rowId);
			if (row) {
				if (row.get("IsInCatalogue") && this.allFoldersRecordItem) {
					result = this.allFoldersRecordItem.value;
				} else if (row.get("IsInFavorites")) {
					result = this.get("ActiveRowToSet");
				}
			}
			return result;
		},

		/**
		 * New folder name handler
		 * @param {string} returnCode code of clicked button.
		 * @param {Object} controlData control data.
		 */
		convertNameInputBoxHandler: function(returnCode, controlData) {
			if (this._isChosenOkButton(returnCode, controlData)) {
				this._saveNameInputButton(controlData, function() {
					var currentEditElement = this.currentEditElement;
					var entitySchemaName = this.entitySchema && this.entitySchema.name;
					if (!currentEditElement || !entitySchemaName) {
						return;
					}
					var newFolderId = currentEditElement.get("Id");
					var parentFolder = currentEditElement.get("Parent");
					var parentFolderId = parentFolder && parentFolder.value;
					if (!newFolderId || !parentFolderId) {
						return;
					}
					var serviceData = {
						newFolderId: newFolderId,
						parentFolderId: parentFolderId,
						entitySchemaName: entitySchemaName.replace("Folder", "")
					};
					this._callConverFolderService(serviceData);
				}, this);
			} else {
				this.currentEditElement.cancelButton();
			}
		},

		_callConverFolderService: function(data) {
			ServiceHelper.callService({
				serviceName: "FolderManagerService",
				methodName: "ConvertFolder",
				callback: function() {
					this.applyFolderFilters(data.newFolderId, true);
				},
				scope: this,
				data: data
			}, this);
		},

		/**
		 * Creates a copy of the current dynamic folder and makes it the new current folder.
		 */
		copyFolder: function() {
			var currentEditElement = this.currentEditElement;
			if (Ext.isEmpty(currentEditElement)) {
				return;
			}
			currentEditElement.createCopy(function() {
				this._renameFolder(this.nameInputBoxCopyHandler, this);
			}, this);
		},

		getNewFolderParentId: function() {
			var activeRow = this.get("activeRow");
			var parent = this.get("isFavoriteSelected")
					? this.get("activeRowToSet")
					: activeRow;
			return parent;
		},

		addSearchFolderButton: function() {
			this.addFolder(ConfigurationConstants.Folder.Type.Search);
		},

		getFolderViewModelConfig: function() {
			var viewModelConfig = {
				entitySchema: this.entitySchema,
				columns: Terrasoft.deepClone(this.entitySchema.columns),
				values: {
					editMode: false
				},
				mainViewModel: this
			};
			viewModelConfig.columns = Terrasoft.deepClone(this.entitySchema.columns);
			Terrasoft.each(viewModelConfig.columns, function(column) {
				column.columnPath = column.name;
				column.type = Terrasoft.ViewModelColumnType.ENTITY_COLUMN;
			});
			return viewModelConfig;
		},

		getFolderEditViewModel: function(folderType) {
			var viewModelConfig = this.getFolderViewModelConfig();
			var folderViewModel = Ext.create("Terrasoft.FolderFilterItemViewModel", viewModelConfig);
			var useStaticFolders = this.get("useStaticFolders");
			folderViewModel.set("FolderType", {value: folderType});
			folderViewModel.set("useStaticFolders", useStaticFolders);
			if (this._sectionEntitySchema) {
				folderViewModel.set("sectionEntitySchemaName", this._sectionEntitySchema.name);
			}
			return folderViewModel;
		},

		getFavoriteFolderActionCaption: function() {
			var parentRow = this.getActiveRowParent();
			var caption = (parentRow === this.favoriteRootRecordItem)
					? this.getLocalizableString("RemoveFromFavoriteMenuItemCaption")
					: this.getLocalizableString("AddToFavoriteMenuItemCaption");
			return caption;
		},

		getFavoriteActionVisible: function() {
			var parentRow = this.getActiveRowParent();
			return !Ext.isEmpty(parentRow);
		},

		getIsFolderSelected: function() {
			var parentRow = this.getActiveRowParent();
			return !Ext.isEmpty(parentRow) || this.get("multiSelect");
		},

		deleteFromFavorites: function(selectedId, keepActive) {
			var del = this.getDeleteFromFavoritesESQ(selectedId);
			del.execute(function(response) {
				if (response && response.success) {
					if (!keepActive) {
						this.set("activeRow", null);
					}
					this.clear();
					this.load();
					this.sendUpdateFavoritesMenu(this.entitySchema.name, this.entitySchema.uId);
				}
			}, this);
		},

		_createFavoriteFolderFilters: function(select, activeRow) {
			var filters = Ext.create("Terrasoft.FilterGroup");
			filters.add("SysAdminUnit", select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"SysAdminUnit", Terrasoft.SysValue.CURRENT_USER.value));
			filters.add("FolderEntitySchemaUId", select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"FolderEntitySchemaUId", this.entitySchema.uId));
			filters.add("FolderId", select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"FolderId", activeRow));
			return filters;
		},

		_removeFromFavoritesFolder: function(activeRow) {
			var selectedId = this.getActualFolderId(activeRow);
			var parentRow = this.getActiveRowParent();
			var keepActive = parentRow !== this.favoriteRootRecordItem;
			this.deleteFromFavorites(selectedId, keepActive);
		},

		_addToFavoriteFolder: function(activeRow) {
			var insert = Ext.create("Terrasoft.InsertQuery", {
				rootSchemaName: "FolderFavorite"
			});
			insert.setParameterValue("SysAdminUnit", Terrasoft.SysValue.CURRENT_USER.value,
					Terrasoft.DataValueType.GUID);
			insert.setParameterValue("FolderId", activeRow, Terrasoft.DataValueType.GUID);
			insert.setParameterValue("FolderEntitySchemaUId", this.entitySchema.uId, Terrasoft.DataValueType.GUID);
			insert.execute(function(response) {
				if (response && response.success) {
					this.clear();
					this.load();
					this.sendUpdateFavoritesMenu(this.entitySchema.name, this.entitySchema.uId);
				}
			}, this);
		},

		doFavoriteFolderAction: function() {
			var activeRow = this.getActiveRow();
			if (!activeRow) {
				return;
			}
			var isInFavorites = this.get("gridData").get(activeRow).get("isInFavorites");
			this.setActiveRow(this.getActualFolderId(activeRow));
			if (isInFavorites) {
				this._removeFromFavoritesFolder(activeRow);
			} else {
				var select = this.getSelectFavorite(activeRow);
				select.getEntityCollection(function(response) {
					if (response && response.success) {
						if (response.collection.getItems().length > 0) {
							return;
						}
						this._addToFavoriteFolder(activeRow);
					}
				}, this);
			}
		},

		/**
		 * @protected
		 * @return {Terrasoft.EntitySchemaQuery}
		 */
		getSelectFavorite: function(activeRow) {
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "FolderFavorite"
			});
			esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
			esq.filters = this._createFavoriteFolderFilters(esq, activeRow);
			return esq;
		},

		editFolderFilters: function() {
			var activeRow = this.getActiveRow();
			var sectionFilterModuleId = this.sandbox.publish("GetSectionFilterModuleId");
			if (!activeRow || !this.currentEditElement) {
				return;
			}
			var folder = this.currentEditElement;
			this.sandbox.publish("UpdateCustomFilterMenu", {
				"isExtendedModeHidden": false,
				"isFoldersHidden": true,
				"clearActiveFolder": true
			}, [sectionFilterModuleId]);
			this.sandbox.publish("CustomFilterExtendedMode", {
				folder: folder,
				filter: Terrasoft.deserialize(folder.get("SearchData"))
			}, [this.sandbox.id]);
		},

		editRights: function() {
			var recordInfo = {
				entitySchemaName: this.entitySchema.name,
				entitySchemaCaption: this.entitySchema.caption,
				primaryColumnValue: this.currentEditElement.get(this.entitySchema.primaryColumnName),
				primaryDisplayColumnValue:
						this.currentEditElement.get(this.entitySchema.primaryDisplayColumnName)
			};
			var id = this.sandbox.id + "_Rights";
			this.sandbox.subscribe("GetRecordInfo", function() {
				return recordInfo;
			}, [id]);
			var params = this.sandbox.publish("GetHistoryState");
			params.state.foldersManagerOpened = true;
			this.sandbox.publish("PushHistoryState", {
				stateObj: params.state,
				hash: params.hash.historyState,
				silent: true
			});
			this.sandbox.loadModule("Rights", {
				renderTo: "centerPanel",
				id: id,
				keepAlive: true
			});
		},

		changeGridMode: function(multiSelect, callback) {
			this.set("administratedButtonVisible", this.entitySchema.administratedByRecords && !multiSelect);
			this.set("multiSelect", multiSelect);
			this.set("selectEnabled", multiSelect);
			this.clear();
			this.load(callback);
			this.showFolderInfo();
		},

		processMoveFolders: function(folders, callback) {
			var filters = Ext.create("Terrasoft.FilterGroup");
			var primaryDisplayColumn = this.entitySchema.primaryDisplayColumn;
			var moveFilter = Terrasoft.createColumnInFilterWithParameters(this.entitySchema.primaryColumnName,
					folders);
			moveFilter.comparisonType = Terrasoft.ComparisonType.NOT_EQUAL;
			filters.addItem(moveFilter);

			var rootEmailFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL,
					"FolderType", ConfigurationConstants.Folder.Type.RootEmail);
			filters.addItem(rootEmailFilter);

			if (!this.get("useStaticFolders")) {
				var typeFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL,
						"FolderType", ConfigurationConstants.Folder.Type.General);
				filters.addItem(typeFilter);
			}
			var handler = function(args) {
				var collection = args.selectedRows.collection;
				var parentId = null;
				if (collection.length > 0) {
					var parent = collection.items[0];
					parentId = parent.value;
				}
				this.changeFolderParent(folders, parentId, callback);
			};
			var columnsConfig = [
				{
					cols: 24,
					key: [
						{
							name: {bindTo: "FolderType"},
							type: Terrasoft.GridKeyType.ICON16LISTED
						}, {
							name: {bindTo: "Name"}
						}
					]
				}
			];
			var captionsConfig = [
				{
					cols: 24,
					columnName: primaryDisplayColumn.name,
					name: primaryDisplayColumn.caption,
					sortColumnDirection: Terrasoft.core.enums.OrderDirection.ASC
				}
			];
			var config = {
				entitySchemaName: this.entitySchema.name,
				type: "listed",
				useListedLookupImages: true,
				multiSelect: false,
				columnName: this.entitySchema.primaryDisplayColumnName,
				searchValue: null,
				filters: filters,
				columns: ["Name", "FolderType", "Parent"],
				hierarchical: true,
				hierarchicalColumnName: "Parent",
				actionsButtonVisible: false,
				columnsConfig: [
					{
						cols: 24,
						key: [
							{
								name: {bindTo: "FolderType"},
								type: Terrasoft.GridKeyType.ICON16LISTED
							}, {
								name: {bindTo: "Name"}
							}
						]
					}
				],
				columnsSettingsProfile: {
					isTiled: false,
					listedColumnsConfig: Ext.encode(columnsConfig),
					captionsConfig: Ext.encode(captionsConfig)
				},
				virtualRootItem: this.allFoldersItem,
				virtualRootItemValues: this.allFoldersRecordItem
			};
			LookupUtilities.Open(this.sandbox, config, handler, this);
		},

		changeFolderParent: function(folders, parentId, callback) {
			var folderId = folders.pop();
			var allFoldersId = this.allFoldersRecordItem.value;
			var favoriteRootFolderId = this.favoriteRootRecordItem.value;
			if (folderId === parentId || !parentId || parentId.value === allFoldersId ||
					parentId.value === favoriteRootFolderId) {
				parentId = null;
			}
			var folderConfig = this.getFolderViewModelConfig();
			var folder = Ext.create(Terrasoft.FolderFilterItemViewModel, folderConfig);
			folder.loadEntity(folderId, function() {
				folder.set("Parent", {value: parentId});
				if (folders.length) {
					folder.saveEntity(function(result) {
						if (result.success) {
							this.changeFolderParent(folders, parentId, callback);
						} else {
							this.showInformationDialog(result.errorInfo.message);
						}
					}, this);
				} else {
					folder.saveEntity(function(result) {
						if (result.success) {
							this.set("activeRow", null);
							if (callback) {
								callback.call(this);
							}
						} else {
							this.showInformationDialog(result.errorInfo.message);
						}
					}, this);
				}
			}, this);
		},

		onDeleteAccept: function onDeleteAccept() {
			var activeRow = this.get("activeRow");
			var selectedRows = this.get("selectedRows") || [];
			if (selectedRows.length || activeRow) {
				var selectedValues = selectedRows.length ? selectedRows : [activeRow];
				var actualSelectedValues = [];
				Terrasoft.each(selectedValues, function(currentRecordId) {
					var actualFolderId = this.getActualFolderId(currentRecordId);
					actualSelectedValues.push(actualFolderId);
					this.deleteFromFavoritesSilent(actualFolderId);
				}, this);
				var query = Ext.create("Terrasoft.DeleteQuery", {
					rootSchema: this.entitySchema
				});
				var filter = query.createColumnInFilterWithParameters(this.entitySchema.primaryColumnName,
						actualSelectedValues);
				query.filters.addItem(filter);
				query.execute(function(response) {
					if (response.success) {
						this.onDeleted();
					} else {
						this.showInformationDialog(ResponseExceptionHelper.GetExceptionMessage(response.errorInfo));
					}
				}, this);
			}
		},

		getDeleteFromFavoritesESQ: function(selectedId) {
			var deleteESQ = Ext.create("Terrasoft.DeleteQuery", {
				rootSchemaName: "FolderFavorite"
			});
			var filters = Ext.create("Terrasoft.FilterGroup");
			filters.add("FolderId", deleteESQ.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "FolderId",
					selectedId));
			filters.add("FolderEntitySchemaUId", deleteESQ.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"FolderEntitySchemaUId", this.entitySchema.uId));
			deleteESQ.filters = filters;
			return deleteESQ;
		},

		deleteFromFavoritesSilent: function(selectedId) {
			var del = this.getDeleteFromFavoritesESQ(selectedId);
			del.execute(function(response) {
				if (response && response.success) {
					this.sendUpdateFavoritesMenu(this.entitySchema.name, this.entitySchema.uId);
				}
			}, this);
		},

		getGridRecordByItemValues: function(rowConfig, itemValues) {
			var gridRecord = Ext.create("Terrasoft.FolderGridRowViewModel", {
				entitySchema: this.entitySchema,
				rowConfig: rowConfig,
				values: itemValues,
				isNew: false,
				isDeleted: false,
				methods: {}
			});
			return gridRecord;
		},

		/**
		 * Prompts to rename current folder.
		 */
		renameFolder: function() {
			this._renameFolder(this.nameInputBoxHandler, this);
		},

		/**
		 * Prompts to rename current folder when convert to static.
		 */
		renameConvertFolder: function() {
			this._renameFolder(this.convertNameInputBoxHandler, this);
		},

		/**
		 * Rename current folder
		 * @param handler input box handler
		 * @param scope
		 * @private
		 */
		_renameFolder: function(handler, scope) {
			var caption = this.getRenameDialogCaption();
			var controls = this.getRenameDialogControls();
			Terrasoft.utils.inputBox(
					caption,
					handler.bind(scope),
					[Terrasoft.MessageBoxButtons.OK.returnCode, Terrasoft.MessageBoxButtons.CANCEL.returnCode],
					this,
					controls
			);
		},

		/**
		 * Returns folder renaming dialog caption depending on the type and the state of the folder.
		 * @return {String} Caption for folder renaming dialog.
		 */
		getRenameDialogCaption: function() {
			var folder = this.currentEditElement;
			var folderType = folder.get("FolderType").value;
			if (folder.isNew) {
				return (folderType === ConfigurationConstants.Folder.Type.Search)
						? this.getLocalizableString("NewSearchFolderInputBoxCaption")
						: this.getLocalizableString("NewGeneralFolderInputBoxCaption");
			} else {
				return (folderType === ConfigurationConstants.Folder.Type.Search)
						? this.getLocalizableString("SearchFolderInputBoxCaption")
						: this.getLocalizableString("GeneralFolderInputBoxCaption");
			}
		},

		/**
		 * Returns controls configuration object for folder renaming dialog.
		 * @return {Object} Configuration object with renaming dialog controls.
		 */
		getRenameDialogControls: function() {
			var controls = {
				name: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					caption: this.entitySchema.primaryDisplayColumn.caption,
					value: this.currentEditElement.get("Name"),
					customConfig: {
						focused: true
					}
				}
			};
			var modifyFolderFunc = this._modifyFolderFunc;
			if (Ext.isFunction(modifyFolderFunc) && modifyFolderFunc !== Terrasoft.emptyFn) {
				controls = modifyFolderFunc.call(this, "get");
			}
			return controls;
		},

		/**
		 * Handles user response to a renaming dialog.
		 * @param  {String} returnCode Code of the button chosen in the renaming dialog.
		 * @param  {Object} controlData Object containing user input.
		 */
		nameInputBoxHandler: function(returnCode, controlData) {
			if (this._isChosenOkButton(returnCode, controlData)) {
				this._saveNameInputButton(controlData);
			} else {
				this._cancelNameInputButton();
			}
		},

		/**
		 * @private
		 */
		_cancelNameInputButton: function() {
			var folder = this.currentEditElement;
			folder.isNew = false;
			folder.cancelButton();
		},

		/**
		 * Handles user response to a copy dialog.
		 * @param  {String} returnCode Code of the button chosen in the copy dialog.
		 * @param  {Object} controlData Object containing user input.
		 */
		nameInputBoxCopyHandler: function(returnCode, controlData) {
			if (this._isChosenOkButton(returnCode, controlData)) {
				this._saveNameInputButton(controlData);
			} else {
				var folder = this.currentEditElement;
				var folderId = folder.get("CopiedSourceId");
				folder.mainViewModel.showFolderInfo(folderId);
				folder.isNew = false;
				folder.isCopy = false;
				folder.cancelButton();
			}
		},

		/**
		 * Handles user response to a add new folder dialog.
		 * @param  {String} returnCode Code of the button chosen in the add new folder dialog.
		 * @param  {Object} controlData Object containing user input.
		 */
		nameInputBoxAddNewFolderHandler: function(returnCode, controlData) {
			if (this._isChosenOkButton(returnCode, controlData)) {
				this._saveNameInputButton(controlData);
			} else {
				this.currentEditElement.cancelButton();
			}
		},

		/**
		 * @private
		 */
		_isChosenOkButton: function(returnCode, controlData) {
			return returnCode === Terrasoft.MessageBoxButtons.OK.returnCode && controlData.name.value;
		},

		/**
		 * @private
		 */
		_saveNameInputButton: function(controlData, callback, scope) {
			this.currentEditElement.set(this.entitySchema.primaryDisplayColumnName,
					controlData.name.value);
			this.applyModifyFolderFunc(controlData);
			this.setActiveRow(this.currentEditElement.get(this.entitySchema.primaryColumnName));
			this.currentEditElement.saveButton(callback, scope);
		},

		/**
		 * Applies additional postprocessing function, if any, to the user input.
		 * @param  {Object} controlData Object containing user input.
		 */
		applyModifyFolderFunc: function(controlData) {
			var modifyFolderFunc = this._modifyFolderFunc;
			if (Ext.isFunction(modifyFolderFunc) && modifyFolderFunc !== Terrasoft.emptyFn) {
				var modifyColumn = this._modifyFolderFunc("set", controlData);
				if ((modifyColumn != null) && (modifyColumn.columnName != null)) {
					this.currentEditElement.set(modifyColumn.columnName, modifyColumn.columnValue);
				}
			}
		},

		closeFolderManager: function() {
			var sectionFilterModuleId = this.sandbox.publish("GetSectionFilterModuleId");
			if (!Ext.isEmpty(this.currentEditElement)) {
				this.applyFolderFilters(this.currentEditElement.get("Id"), true);
			}
			this.sandbox.publish("HideFolderTree", null, [sectionFilterModuleId]);
		},

		getGridColumnValue: function(rowId, columnName) {
			var result = null;
			var gridData = this.get("gridData");
			if (!Ext.isEmpty(gridData) && rowId) {
				var rowData = gridData.get(rowId);
				if (!Ext.isEmpty(rowData)) {
					result = rowData.get(columnName);
				}
			}
			return result;
		},

		/**
		 * Find grid row by row Id
		 * @protected
		 * @param {string} rowId
		 * @returns {*}
		 */
		findGridRow: function(rowId) {
			var gridData = this.get("gridData");
			return gridData.find(rowId);
		},

		getActualFolderId: function(rowId) {
			return this.getGridColumnValue(rowId, "actualFolderId");
		},

		getActiveRow: function() {
			return this.get("activeRow");
		},

		getActiveRowParent: function() {
			var activeRow = this.getActiveRow();
			return this.getGridColumnValue(activeRow, "Parent");
		},

		/**
		 * Applies folder filters.
		 * @protected
		 * @param {String} rowId
		 * @param {Boolean} addToQuickFilter
		 */
		applyFolderFilters: function(rowId, addToQuickFilter) {
			var currentItem = this.currentEditElement;
			if (Ext.isEmpty(currentItem) || Ext.isEmpty(rowId)) {
				return;
			}
			var currentItemType = currentItem.get("FolderType");
			var folderMenuItemConfig = null;
			if (this._isCurrentEditElementTypeIsSearch()) {
				folderMenuItemConfig = this._getFolderMenuItemConfig();
			}
			var sectionFilterModuleId = this.sandbox.publish("GetSectionFilterModuleId");
			this.sandbox.publish("UpdateCustomFilterMenu", folderMenuItemConfig, [sectionFilterModuleId]);
			if (addToQuickFilter) {
				var filtersGroup = this.getFolderFilters(rowId);
				var resultFiltersObject = null;
				if (filtersGroup.getCount() > 0) {
					var serializationInfo = filtersGroup.getDefSerializationInfo();
					serializationInfo.serializeFilterManagerInfo = true;
					resultFiltersObject = {
						value: currentItem.get("Id"),
						displayValue: currentItem.get("Name"),
						filter: filtersGroup.serialize(serializationInfo),
						folder: currentItem,
						folderType: currentItemType,
						sectionEntitySchemaName: this._sectionEntitySchema.name
					};
				}
				this.sandbox.publish("ResultFolderFilter", resultFiltersObject, [this.sandbox.id]);
			}
		},

		/**
		 * Returns folder filters.
		 * @protected
		 * @param {String} rowId Identifier of the row which filters should be returned.
		 * @return {Terrasoft.FilterGroup} Filters group.
		 */
		getFolderFilters: function(rowId) {
			var filtersGroup = Terrasoft.createFilterGroup();
			if (this._isRootFolder(rowId)) {
				return filtersGroup;
			}
			if (this._isCurrentEditElementTypeIsSearch()) {
				var searchData = this.currentEditElement.get("SearchData");
				if (!Ext.isEmpty(searchData)) {
					filtersGroup = Terrasoft.deserialize(searchData);
				}
			} else {
				var entityColumnName = this._entityColumnNameInFolderEntity;
				var inFolderSchemaName = this._inFolderEntitySchemaName;
				filtersGroup.add("filterStaticFolder", Terrasoft.createColumnInFilterWithParameters(
						Ext.String.format("[{0}:{1}:Id].Folder", inFolderSchemaName, entityColumnName),
						[rowId]));
			}
			return filtersGroup;
		},

		/**
		 * Returns true if current folder is root.
		 * @private
		 * @param {String} rowId Identifier of the row that is checked.
		 * @return {Boolean}
		 */
		_isRootFolder: function(rowId) {
			var allFoldersId = this.allFoldersRecordItem.value;
			var favoriteRootFolderId = this.favoriteRootRecordItem.value;
			return rowId === allFoldersId || rowId === favoriteRootFolderId;
		},

		/**
		 * Returns true if current edit element type is search.
		 * @private
		 * @return {Boolean}
		 */
		_isCurrentEditElementTypeIsSearch: function() {
			var currentItem = this.currentEditElement;
			var currentItemType = currentItem.get("FolderType");
			return currentItemType && currentItemType.value === ConfigurationConstants.Folder.Type.Search;
		},

		/**
		 * Returns folder menu item config.
		 * @private
		 * @return {Object} Folder menu item config.
		 */
		_getFolderMenuItemConfig: function() {
			return {
				value: this.currentEditElement.get("Id"),
				displayValue: this.currentEditElement.get("Name"),
				folderType: this.currentEditElement.get("FolderType"),
				folder: this.currentEditElement,
				filter: Terrasoft.deserialize(this.currentEditElement.get("SearchData")),
				sectionEntityScheamName: this._sectionEntitySchema.name
			};
		}
	});
});


