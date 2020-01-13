Terrasoft.configuration.Structures["FolderManagerViewModel"] = {innerHierarchyStack: ["FolderManagerViewModel"]};
define("FolderManagerViewModel", ["FolderManagerViewModelResources",
		"ConfigurationConstants", "LookupUtilities", "ResponseExceptionHelper", "MaskHelper",
		"ServiceHelper", "ProductCatalogueUtilities", "FolderGridRowViewModel"],
	function(resources, ConfigurationConstants, LookupUtilities, ResponseExceptionHelper, MaskHelper, ServiceHelper,
			 ProductCatalogueUtilities) {

		/**
		 * ########## ############ ###### ############# ######### #####
		 * @returns {Object}
		 */
		function generate(parentSandbox, config) {
			var sandbox = parentSandbox;
			var viewModelConfig = {
				entitySchema: config.entitySchema,
				columns: {
					/**
					 * ####, ######## ############# ##### # #######
					 * @type {BOOLEAN}
					 */
					EnableMultiSelect: {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						name: "EnableMultiSelect"
					},

					/**
					 * ############# ##### # #######
					 * @type {BOOLEAN}
					 */
					MultiSelect: {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						name: "MultiSelect"
					},

					/**
					 * ############# ######## ######### ######
					 */
					ActualFolderId: {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						name: "ActualFolderId"
					}
				},
				values: {
					/**
					 * ######### ######### #######
					 * @type {Terrasoft.BaseViewModelCollection}
					 */
					GridData: new Terrasoft.BaseViewModelCollection(),

					/**
					 * ############# ##### # #######
					 * @type {Boolean}
					 */
					MultiSelect: config.multiSelect,

					/**
					 * ####### ######
					 * @type {Terrasoft.BaseFilter}
					 */
					CurrentFilter: config.currentFilter,

					/**
					 * ####, ######## ############# ##### # #######
					 * @type {Boolean}
					 */
					EnableMultiSelect: config.enableMultiSelect,

					/**
					 * ###### ######### #########
					 * @type {Array}
					 */
					SelectedRows: config.selectedFolders,

					/**
					 * ############# ########## ######## # #######
					 * @type {GUID}
					 */
					ActiveRow: config.currentFilter,

					/**
					 * ############# ###### "#########"
					 * @type {GUID}
					 */
					FavoriteGeneratedId: config.favoriteGeneratedId,

					/**
					 * ####, ##### ## ############### ######
					 * @type {Boolean}
					 */
					CanRename: !Ext.isEmpty(config.currentFilter),

					/**
					 * ####, #### ## ######### ######
					 * @type {Boolean}
					 */
					SelectEnabled: (config.currentFilter || config.multiSelect),

					/**
					 * ###### ######### #########
					 * @type {Array}
					 */
					expandHierarchyLevels: [],

					/**
					 * ####, ########## ## ###### #########
					 * @type {Boolean}
					 */
					AdministratedButtonVisible: config.entitySchema.administratedByRecords && !config.multiSelect,

					/**
					 * ##### #######
					 * @type {Object}
					 */
					SectionModule: config.sectionEntitySchema,

					/**
					 * ####, ######### ## ######### ######## ####### ## ###### #######
					 * @type {Boolean}
					 */
					IsGridDoubleClickAllowed: true,

					/**
					 * ####, ####### ## ###### #########
					 * @type {Boolean}
					 */
					IsFavoriteSelected: false,

					/**
					 * ############ ####### # ########
					 * @type {Integer}
					 */
					MaxPosition: 0,

					/**
					 * ####, ##### ## ###### ########
					 * @type {Boolean}
					 */
					CloseVisible: true,

					/**
					 * ####, ##### ## ###### #####
					 * @type {Boolean}
					 */
					IsFoldersContainerVisible: true,

					/**
					 * ####, ##### ## ###### ########### ##########
					 * @type {Boolean}
					 */
					IsExtendCatalogueFilterContainerVisible: false,

					/**
					 * ####, ############ ## ########### ######
					 * @type {Boolean}
					 */
					UseStaticFolders: false
				},
				methods: {
					/**
					 * Folder manager initialization.
					 * @param {object} folderConfig
					 */
					init: function(folderConfig) {
						MaskHelper.ShowBodyMask();
						var sectionFilterModuleId = sandbox.publish("GetSectionFilterModuleId");
						sandbox.publish("UpdateCustomFilterMenu", {
							"isExtendedModeHidden": true,
							"isFoldersHidden": false,
							"clearActiveFolder": true
						}, [sectionFilterModuleId]);
						this.set("IsFoldersContainerVisible", true);
						this.set("IsExtendCatalogueFilterContainerVisible", false);
						if (folderConfig.hasOwnProperty("useStaticFolders")) {
							this.set("UseStaticFolders", folderConfig.useStaticFolders);
						}
						this.on("change:expandHierarchyLevels", this.onExpandHierarchyLevels, this);
						this.allFoldersRecordItem = folderConfig.allFoldersRecordItem;
						this.favoriteRootRecordItem = folderConfig.favoriteRootRecordItem;
						this.currentEditElement =
							this.getFolderEditViewModel(ConfigurationConstants.Folder.Type.General);
						this.renderTo = this.container;
						this.set("AdministratedButtonVisible", false);
						if (folderConfig.hasOwnProperty("closeVisible")) {
							this.set("CloseVisible", folderConfig.closeVisible);
						}
						if (folderConfig.catalogueRootRecordItem) {
							this.catalogueRootRecordItem = folderConfig.catalogueRootRecordItem;
							this.isProductSelectMode = folderConfig.isProductSelectMode;
							if (folderConfig.catalogAdditionalFiltersValues) {
								this.catalogAdditionalFiltersValues = folderConfig.catalogAdditionalFiltersValues;
							}
							var esq = this.getCatalogueFolderSelect();
							esq.execute(function(response) {
								this.catalogueFolders = response.collection;
								this.set("TypeCatalogueLevelPosition",
									this.getTypeCatalogueLevelPosition(this.catalogueFolders));
								ProductCatalogueUtilities
									.loadReferenceDisplayColumnNames(this.catalogueFolders, function() {
										this.load(true);
									}, this);
							}, this);
						} else {
							this.load(true);
						}
					},

					/**
					 * ########## ####### ######## ########, ####### ############ ### ########.
					 * @param {Terrasoft.Collection} catalogueFolders ###### ####### ########.
					 * @returns {Number} ####### ######## ######## ############### ### ######## # ########## ########
					 * ### null, #### ####### ## ### ######.
					 */
					getTypeCatalogueLevelPosition: function(catalogueFolders) {
						var count = catalogueFolders.getCount();
						if (!count) {
							return null;
						}
						for (var i = 0; i < count; i++) {
							var folder = catalogueFolders.getByIndex(i);
							if (folder.get("ColumnPath") === "Type") {
								return i;
							}
						}
						return null;
					},

					/**
					 * Handles cancel button click.
					 * @protected
					 */
					cancelButton: function() {
						this.cancelSelecting();
					},

					/**
					 * ######## ########### ############## ###### # #######
					 * @protected
					 */
					changeMultiSelectMode: function() {
						if (this.get("EnableMultiSelect")) {
							var multiSelect = !this.get("MultiSelect");
							this.set("ActiveRow", null);
							this.changeGridMode(multiSelect);
						}
					},

					/**
					 * ####### ######### ######### ######### #####
					 * @protected
					 */
					clear: function() {
						this.set("ActiveRow", null);
						var collection = this.get("GridData");
						collection.clear();
						this.pageNumber = 0;
					},

					/**
					 * ############# ####### ####### ## ####### #######
					 * @protected
					 * @param {string} id
					 */
					dblClickGrid: function(id) {
						if (!this.get("IsGridDoubleClickAllowed")) {
							this.set("IsGridDoubleClickAllowed", true);
							return;
						}
						if (this.getGridColumnValue(id, "IsInCatalogue")) {
							return;
						}
						if (id && this.getIsFolderSelected() && !this.get("MultiSelect")) {
							this.set("ActiveRow", id);
							this.currentEditElement.loadEntity(id, function() {
								this.renameFolder();
							}, this);
						}
					},

					/**
					 * ############ ####### ## ###### #######
					 * @protected
					 */
					deleteButton: function() {
						var multiSelect = this.get("MultiSelect");
						var selectedRows = this.get("SelectedRows");
						var activeRow = this.get("ActiveRow");
						var isDeleteApprove = multiSelect && selectedRows && selectedRows.length > 0;
						isDeleteApprove = isDeleteApprove || !multiSelect && activeRow;
						if (isDeleteApprove) {
							this.showConfirmationDialog(resources.localizableStrings.OnDeleteWarningV2, function(returnCode) {
								if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
									this.onDeleteAccept();
								}
							}, ["yes", "no"]);
						}
					},

					/**
					 * ############## ####### ######### ###### ###
					 * @protected
					 * @param {object} scope
					 * @returns {EntitySchemaQuery|*}
					 */
					initAllFoldersSelect: function(scope) {
						var select = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchema: scope.entitySchema
						});
						select.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
						var column = select.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name");
						column.orderDirection = Terrasoft.OrderDirection.ASC;
						column.orderPosition = 0;
						select.addColumn("Parent");
						select.addColumn("FolderType");
						if (!scope.get("UseStaticFolders")) {
							select.filters.addItem(select.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.NOT_EQUAL, "FolderType",
								ConfigurationConstants.Folder.Type.General));
						}
						select.filters.addItem(select.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.NOT_EQUAL, "FolderType",
							ConfigurationConstants.Folder.Type.RootEmail));

						select.skipRowCount = scope.pageNumber * scope.pageRowsCount;
						select.rowCount = -1;
						return select;
					},

					/**
					 * ############## ####### ######### ###### #########
					 * @protected
					 * @param {object} scope
					 * @returns {EntitySchemaQuery|*}
					 */
					initFavoriteFoldersSelect: function(scope) {
						var select = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "FolderFavorite"
						});
						select.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
						select.addColumn("FolderId");
						var columnPath = Ext.String.format("[{0}:Id:FolderId].Name", scope.entitySchema.name);
						var column = select.addColumn(columnPath, "Name");
						column.orderDirection = Terrasoft.OrderDirection.ASC;
						column.orderPosition = 0;
						var filters = Ext.create("Terrasoft.FilterGroup");
						filters.addItem(select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "SysAdminUnit",
							Terrasoft.SysValue.CURRENT_USER.value));
						filters.addItem(select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"FolderEntitySchemaUId", scope.entitySchema.uId));
						select.filters = filters;
						return select;
					},

					/**
					 * ############## ####### ##### #####
					 * @protected
					 * @param {object} scope
					 * @returns {EntitySchemaQuery|*}
					 */
					initFolderTypesSelect: function(scope) {
						var select = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "FolderType"
						});
						select.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
						select.addColumn("Name");
						select.addColumn("Image");
						var filters = Ext.create("Terrasoft.FilterGroup");
						filters.logicalOperation = Terrasoft.LogicalOperatorType.OR;
						filters.addItem(select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"Id", ConfigurationConstants.Folder.Type.General));
						filters.addItem(select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"Id", ConfigurationConstants.Folder.Type.Favorite));
						if (scope.catalogueRootRecordItem) {
							filters.addItem(select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
								"Id", scope.catalogueRootRecordItem.value));
						}
						select.filters.addItem(filters);
						return select;
					},

					/**
					 * ######### ###### ## ####### ######### ########
					 * @protected
					 * @param {Terrasoft.BatchQuery} batch
					 * @param {object} scope
					 */
					addCatalogueFolderValuesSelect: function(batch, scope) {
						var rowItem = scope.catalogueFolders.getByIndex(0);
						if (rowItem) {
							batch.add(this.getCatalogueLevelItemsSelect(rowItem));
						}
					},

					/**
					 * ######## ########## ######### ###### ########
					 * @protected
					 * @param {object} row
					 * @returns {createFilterGroup|*}
					 */
					getParentRowsFilters: function(row, rowItem) {
						var filtersGroup = Terrasoft.createFilterGroup();
						var position = row.get("Position");
						var parentData = this.getGridColumn(row.get("Parent"));
						var currentID = row.get("ActualCatalogueFolderId");
						var columnPath = rowItem.get("ColumnPath");
						filtersGroup.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"[Product:" + columnPath + ":Id]." + row.get("ColumnPath") + ".Id", currentID));
						if (parentData) {
							for (var i = position - 1; i >= 0; i--) {
								var catalogueFolder = this.catalogueFolders.getByIndex(i);
								if (catalogueFolder) {
									var currentParentID = parentData.get("ActualCatalogueFolderId");
									filtersGroup.addItem(Terrasoft.createColumnFilterWithParameter(
										Terrasoft.ComparisonType.EQUAL,
										"[Product:" + columnPath + ":Id]." + catalogueFolder.get("ColumnPath") + ".Id",
										currentParentID));
									parentData = this.getGridColumn(parentData.get("Parent"));
								}
							}
						}
						return filtersGroup;
					},

					/**
					 * ########## ###### ## ####### ####### ########
					 * @protected
					 * @param {object} rowItem
					 * @param {object} subRow
					 * @returns {EntitySchemaQuery|*}
					 */
					getCatalogueLevelItemsSelect: function(rowItem, subRow) {
						var select = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: rowItem.get("ReferenceSchemaName")
						});
						select.addColumn("Id", "ColumnPathValueId");
						let referenceDisplayColumnName = rowItem.get("ReferenceDisplayColumnName");
						var column = select.addColumn(referenceDisplayColumnName, "ColumnPathValueName");
						column.orderDirection = Terrasoft.OrderDirection.ASC;
						column.orderPosition = 0;
						var columnPath = rowItem.get("ColumnPath");
						select.addParameterColumn(columnPath, Terrasoft.DataValueType.TEXT, "ColumnPath");
						select.addParameterColumn(rowItem.get("Id"), Terrasoft.DataValueType.GUID, "ParentId");
						select.addParameterColumn(rowItem.get("Name"), Terrasoft.DataValueType.TEXT, "ParentName");
						select.addParameterColumn(rowItem.get("Position"), Terrasoft.DataValueType.INTEGER, "Position");
						select.addParameterColumn(rowItem.get("ReferenceSchemaName"), Terrasoft.DataValueType.TEXT,
							"ReferenceSchemaName");
						select.rowCount = -1;
						select.filters.addItem(
							Terrasoft.createColumnIsNotNullFilter(
								"[Product:" + columnPath + ":Id]." + columnPath + ".Id"
							)
						);
						if (subRow) {
							select.filters.addItem(this.getParentRowsFilters(subRow, rowItem));
						}
						if (this.catalogAdditionalFiltersValues) {
							var filterGroup = Terrasoft.createFilterGroup();
							if (subRow && subRow.get("ColumnPath") === "Type") {
								var typeFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"[Product:" + columnPath + ":Id].Type.Id", subRow.get("ColumnPathValueId"));
								filterGroup.addItem(typeFilter);
							}
							Terrasoft.each(this.catalogAdditionalFiltersValues, function(filterValue) {
								var filter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"[Product:" + columnPath + ":Id]." + filterValue.columnPath, filterValue.value);
								filterGroup.addItem(filter);
							}, this);
							select.filters.addItem(filterGroup);
						}
						return select;
					},

					/**
					 * ############## ####### ##### ########
					 * @protected
					 * @param {Terrasoft.Collection} catalogueFolderValues
					 * @param {object} rowConfig
					 * @param {object} scope
					 * @param {Terrasoft.Collection} resultItems
					 */
					prepareCatalogueFoldersAndGetSelected: function(catalogueFolderValues, rowConfig, scope, resultItems) {
						var parent = scope.catalogueRootRecordItem;
						if (catalogueFolderValues.length) {
							Terrasoft.each(catalogueFolderValues[0].rows, function(item) {
								this.addCatalogItem(item, rowConfig, parent.value, resultItems, scope);
							}, scope);
						}
					},

					/**
					 * ######### ####### ########
					 * @protected
					 * @param {object} item
					 * @param {object} rowConfig
					 * @param {string} parent
					 * @param {Terrasoft.Collection} resultItems
					 * @param {object} scope
					 */
					addCatalogItem: function(item, rowConfig, parent, resultItems, scope) {
						var gridItem = scope.getGridRecordByItemValues(rowConfig, item);
						gridItem.set("FolderType", scope.catalogueRootRecordValues.FolderType);
						var actualFolderId = gridItem.get("ColumnPathValueId");
						gridItem.set("Name", gridItem.get("ColumnPathValueName"));
						var compositeKey = actualFolderId + "_" + parent;
						if (!gridItem.get("Parent")) {
							gridItem.set("Parent", parent);
						}
						gridItem.set("HasNesting", item.Position === this.MaxPosition ? 0 : 1);
						gridItem.set("Id", compositeKey);
						gridItem.set("FolderId", compositeKey);
						gridItem.set("ActualCatalogueFolderId", actualFolderId);
						gridItem.set("IsInFavorites", false);
						gridItem.set("IsInCatalogue", true);
						gridItem.set("IsOpenFilterButtonVisible",
							this.getIsOpenFilterButtonVisible(item));
						if (!resultItems.contains(compositeKey)) {
							resultItems.add(compositeKey, gridItem);
						}
					},

					/**
					 * ########## ########### ######### ######## ### ######## ########
					 * @param {object} item ####### ########
					 * @returns {boolean} ########## true, #### ######## ######### #######
					 */
					getIsOpenFilterButtonVisible: function(item) {
						var catalogueLevelPos = item.Position;
						var typeLevelPos = this.get("TypeCatalogueLevelPosition");
						typeLevelPos = Ext.isEmpty(typeLevelPos) ? Number.MAX_VALUE : typeLevelPos;
						return (catalogueLevelPos >= typeLevelPos);
					},

					/**
					 * ######## ############ ####### ###### ########
					 * @protected
					 * @returns {*}
					 */
					getMaxPosition: function() {
						var positions = [];
						this.catalogueFolders.each(function(item) {
							positions.push(item.get("Position"));
						}, this);
						var maxPosition = positions.sort(function(a, b) {
							return b - a;
						})[0];
						return maxPosition;
					},

					/**
					 * ############## ######## ######
					 * @protected
					 * @param {Terrasoft.Collection} rows
					 * @param {Terrasoft.BaseViewModel} viewModel
					 */
					initializeRootFolders: function(rows, viewModel) {
						Terrasoft.each(rows, function(folderTypeItem) {
							var itemValues = {
								value: folderTypeItem.Id,
								displayValue: folderTypeItem.Name,
								primaryImageValue: folderTypeItem.Image.value
							};
							if (folderTypeItem.Id === ConfigurationConstants.Folder.Type.General) {
								viewModel.allFoldersRecordValues = {
									Id: viewModel.allFoldersRecordItem.value,
									Name: viewModel.allFoldersRecordItem.displayValue,
									Parent: "",
									FolderType: itemValues
								};
							} else if (viewModel.catalogueRootRecordItem &&
								folderTypeItem.Id === viewModel.catalogueRootRecordItem.value) {
								viewModel.catalogueRootRecordValues = {
									Id: viewModel.catalogueRootRecordItem.value,
									Name: viewModel.catalogueRootRecordItem.displayValue,
									Parent: "",
									FolderType: itemValues
								};
							} else {
								viewModel.favoriteRootRecordValues = {
									Id: viewModel.favoriteRootRecordItem.value,
									Name: viewModel.favoriteRootRecordItem.displayValue,
									Parent: "",
									FolderType: itemValues
								};
							}
						}, this);
					},

					/**
					 * ############## ####### ######### ###### ###
					 * @protected
					 * @param {Terrasoft.Collection} rows
					 * @param {object} rowConfig
					 * @param {object} scope
					 * @param {Terrasoft.Collection} resultItems
					 */
					prepareAllFolders: function(rows, rowConfig, scope, resultItems) {
						Terrasoft.each(rows, function(rowItem) {
							var gridItem = scope.getGridRecordByItemValues(rowConfig, rowItem);
							var actualFolderId = gridItem.get("Id");
							var useStaticFolders = this.get("UseStaticFolders");
							if (!gridItem.get("Parent")) {
								gridItem.set("Parent", scope.allFoldersRecordItem);
							}
							gridItem.set("ActualFolderId", actualFolderId);
							gridItem.set("IsInFavorites", false);
							gridItem.set("useStaticFolders", useStaticFolders);
							gridItem.set("administratedByRecords", scope.getIsAdministratedByRecordsVisible(gridItem));
							resultItems.add(actualFolderId, gridItem);
						}, scope);
					},

					/**
					 * Get is administratedByRecords property visible.
					 * @virtual
					 * @protected
					 * @param gridItem Row item.
					 * @returns {Boolean} Return true when administratedByRecords property visible.
					 */
					getIsAdministratedByRecordsVisible: function(gridItem) {
						if (Terrasoft.isCurrentUserSsp()) {
							return false;
						}
						return gridItem.entitySchema.administratedByRecords;
					},

					/**
					 * ############## ####### ######### ###### #########
					 * @protected
					 * @param {Terrasoft.Collection} rows
					 * @param {object} rowConfig
					 * @param {object} scope
					 * @param {Terrasoft.Collection} resultItems
					 * @returns {*}
					 */
					prepareFavoriteFoldersAndGetSelected: function(rows, rowConfig, scope, resultItems) {
						var currentFavoriteRecordId = null;
						Terrasoft.each(rows, function(rowItem) {
							var folderId = rowItem.FolderId;
							if (resultItems.contains(folderId)) {
								var folderItem = resultItems.get(folderId);
								var newId = Terrasoft.generateGUID();
								var newItem = scope.getGridRecordByItemValues(rowConfig, folderItem.values);
								newItem.set("ActualFolderId", folderId);
								newItem.set("IsInFavorites", true);
								folderItem.set("IsInFavorites", true);
								newItem.set("Id", newId);
								newItem.set("Parent", scope.favoriteRootRecordItem);
								resultItems.add(newId, newItem);
								if ((scope.currentEditElement.get("Id") === folderId) && scope.get("IsFavoriteSelected")) {
									scope.set("ActiveRow", null);
									currentFavoriteRecordId = newId;
								}
							}
						}, scope);
						return currentFavoriteRecordId;
					},

					/**
					 * ######### ######
					 * @protected
					 * @param {Boolean} setExpandedLevels
					 * @param {Function} callback
					 * @param {object} scope
					 */
					load: function(setExpandedLevels, callback, scope) {
						MaskHelper.ShowBodyMask();
						if (!this.pageNumber) {
							this.pageNumber = 0;
						}
						if (!this.pageRowsCount) {
							this.pageRowsCount = 15;
						}
						scope = scope || this;
						var batch = Ext.create("Terrasoft.BatchQuery");
						var mainSelect = this.initAllFoldersSelect(this);
						batch.add(mainSelect);
						var favoritesSelect = this.initFavoriteFoldersSelect(this);
						batch.add(favoritesSelect);
						if (this.catalogueRootRecordItem) {
							this.addCatalogueFolderValuesSelect(batch, this);
						}
						if (!this.allFoldersRecordValues || !this.favoriteRootRecordValues ||
							(!this.catalogueRootRecordValues && this.catalogueRootRecordItem)) {
							var folderTypesSelect = this.initFolderTypesSelect(this);
							batch.add(folderTypesSelect);
						}
						batch.execute(function(response) {
							if (response && response.success) {
								var items = new Terrasoft.Collection();
								var allFolders = null;
								var rowConfig = null;
								var favoriteFolders = null;
								var catalogueFolderValues = [];
								if (!response.queryResults) {
									return;
								}
								Terrasoft.each(response.queryResults, function(item) {
									if (!Ext.isEmpty(item.rowConfig.FolderId)) {
										favoriteFolders = item;
									} else if (!Ext.isEmpty(item.rowConfig.ColumnPath)) {
										catalogueFolderValues.push(item);
									} else if (!Ext.isEmpty(item.rowConfig.Image)) {
										this.initializeRootFolders(item.rows, this);
									} else {
										allFolders = item;
										rowConfig = item.rowConfig;
									}
								}, this);
								this.prepareAllFolders(allFolders.rows, rowConfig, this, items);
								var currentFavoriteRecordId =
									this.prepareFavoriteFoldersAndGetSelected(favoriteFolders.rows, rowConfig,
										this, items);
								if (this.catalogueFolders) {
									this.MaxPosition = this.getMaxPosition();
									this.prepareCatalogueFoldersAndGetSelected(catalogueFolderValues, rowConfig,
										this, items);
									this.catalogueRootRecordValues.IsInCatalogue = true;
									var catalogueRootItem = this.getGridRecordByItemValues(rowConfig,
										this.catalogueRootRecordValues);
									if (catalogueFolderValues && catalogueFolderValues.length) {
										items.add(catalogueRootItem.get("Id"), catalogueRootItem);
									}
								}
								var allFoldersItem = this.getGridRecordByItemValues(rowConfig,
									this.allFoldersRecordValues);
								var favoriteRootItem = this.getGridRecordByItemValues(rowConfig,
									this.favoriteRootRecordValues);
								this.allFoldersItem = allFoldersItem;
								items.add(favoriteRootItem.get("Id"), favoriteRootItem);
								items.add(allFoldersItem.get("Id"), allFoldersItem);
								this.set("expandHierarchyLevels", [favoriteRootItem.get("Id")]);
								this.set("expandHierarchyLevels", [allFoldersItem.get("Id")]);
								if (setExpandedLevels) {
									var selectedRows = this.get("currentFolders");
									if (Ext.isEmpty(selectedRows)) {
										var currentFilter = this.get("ActiveRow");
										selectedRows = currentFilter ? [currentFilter] : this.get("SelectedRows");
									}
								}
								this.set("ActiveRow", null);
								var collection = this.get("GridData");
								collection.clear();
								var activeRow = currentFavoriteRecordId || this.get("ActiveRowToSet");
								var expLevels = null;
								if (activeRow) {
									var itemsCollection = new Terrasoft.Collection();
									itemsCollection.loadAll(items);
									expLevels = this.expandToSelectedItems([activeRow], itemsCollection);
								}
								collection.loadAll(items);
								this.restoreExpandedCatalogueAsync(expLevels, function() {
									var gridData = this.get("GridData");
									if (gridData.contains(activeRow)) {
										this.set("ActiveRow", activeRow);
									}
								});
								if (collection.contains(activeRow)) {
									this.set("ActiveRow", activeRow);
								}
								if (Ext.isFunction(callback)) {
									callback.call(scope);
								}
								MaskHelper.HideBodyMask();
							}
						}, this);
					},

					/**
					 * ######### ######### ###### #####
					 * @protected
					 */
					loadNext: function() {
						this.pageNumber++;
						this.load();
					},

					/**
					 * ############ ########### ######
					 * @protected
					 */
					moveFolder: function() {
						var activeRow = this.get("ActiveRow");
						if (activeRow) {
							activeRow = this.getActualFolderId(activeRow);
						}
						var selectedRows = this.get("SelectedRows");
						if (activeRow || (selectedRows && selectedRows.length > 0)) {
							this.set("currentFolders",
								(selectedRows && selectedRows.length) ? selectedRows : [activeRow]);
							this.previousModeMultiSelect = this.get("MultiSelect");
						}
						var folders = this.get("currentFolders") || [];
						this.processMoveFolders(folders, function() {
							this.load(false);
						});
					},

					/**
					 * ############ ######### ######## ######
					 * @protected
					 * @param {string} rowId
					 */
					onActiveRowChanged: function(rowId) {
						this.showFolderInfo(rowId);
					},

					/**
					 * ########## ######## #########
					 * @protected
					 */
					onDeleted: function() {
						this.setActiveRow(this.allFoldersRecordValues.Id);
						this.set("SelectedRows", []);
						this.clear();
						this.load(true);
						this.showFolderInfo();
					},

					/**
					 * ############ ##### ########
					 * @protected
					 */
					selectButton: function() {
						this.renameFolder();
					},

					_getActiveRowId: function(rowId) {
						if (!rowId) {
							rowId = this.get("ActiveRow");
						}
						return rowId;
					},

					_setActiveRowIdDefValue: function(rowId) {
						if (rowId === this.favoriteRootRecordItem.value) {
							this.set("ActiveRow", null);
						}
					},

					_updateGridDoubleClickAllowed: function() {
						if (!this.get("IsGridDoubleClickAllowed")) {
							this.set("IsGridDoubleClickAllowed", true);
						}
					},

					_getParentRow: function(rowId) {
						var parentRow;
						if (!Ext.isEmpty(rowId)) {
							parentRow = this.getGridColumnValue(rowId, "Parent");
							this.set("IsFavoriteSelected", (parentRow === this.favoriteRootRecordItem));
							if (this.catalogueRootRecordItem) {
								this.set("IsCatalogueSelected", (parentRow === this.catalogueRootRecordItem.value));
							}
						}
						return parentRow;
					},

					_setAdministratedButtonVisibility: function(parentRow) {
						var administratedButtonVisibility = this.entitySchema.administratedByRecords &&
							!Ext.isEmpty(parentRow) && !this.get("MultiSelect");
						this.set("AdministratedButtonVisible", administratedButtonVisibility);
					},

					_setCurrentEditElementDefValues: function() {
						this.currentEditElement.set("Id", null);
						this.currentEditElement.set("Name", null);
						this.currentEditElement.set("FolderType", null);
					},

					_setRenameAndSelectEnabledProperties: function(canRename, canSelectEnabled) {
						this.set("canRename", canRename);
						this.set("selectEnabled", canSelectEnabled);
					},

					_initCurrentEditElementData: function(rowId) {
						var actualFolderId = this.getActualFolderId(rowId);
						var actualCatalogueFolderId = this.getActualCatalogueFolderId(rowId);
						this.currentEditElement.set("IsInCatalogue", false);
						if (actualFolderId) {
							this.currentEditElement.loadEntity(actualFolderId, function() {
								var isInFavorites = this.getGridColumnValue(rowId, "IsInFavorites");
								this.currentEditElement.set("isInFavorites", isInFavorites);
								this.applyFolderFilters(this.currentEditElement.get("Id"), true);
							}, this);
						} else if (actualCatalogueFolderId ||
							(this.catalogueRootRecordItem && rowId === this.catalogueRootRecordItem.value)) {
							this.currentEditElement.set("IsInCatalogue", true);
							this.currentEditElement.set("Id", null);
							this.applyCatalogueFilters(rowId, true);
						} else if ((rowId === this.favoriteRootRecordItem.value) ||
							(rowId === this.allFoldersRecordItem.value)) {
							this._setCurrentEditElementDefValues();
							this.applyFolderFilters(rowId, true);
						}
					},

					/**
					 * ############ ######### ########### ####### ######### #####
					 * @protected
					 * @param {string} rowId
					 */
					showFolderInfo: function(rowId) {
						rowId = this._getActiveRowId(rowId);
						this._setActiveRowIdDefValue(rowId);
						this._updateGridDoubleClickAllowed();
						var parentRow = this._getParentRow(rowId);
						this._setAdministratedButtonVisibility(parentRow);
						if (rowId && !this.get("MultiSelect")) {
							if (this.currentEditElement) {
								this._initCurrentEditElementData(rowId);
							}
							this._setRenameAndSelectEnabledProperties(!Ext.isEmpty(parentRow), !Ext.isEmpty(parentRow));
						} else {
							this._setRenameAndSelectEnabledProperties(false, rowId && !Ext.isEmpty(parentRow));
						}
					},

					/**
					 * ######### ######### ######### #####
					 * @protected
					 * @param {object} selectedRow
					 * @param {Terrasoft.Collection} items
					 * @param {Array} expandedLevels
					 */
					fillExpandedLevels: function(selectedRow, items, expandedLevels) {
						if (items.contains(selectedRow)) {
							var parent = items.get(selectedRow).get("Parent");
							if (parent && !Terrasoft.contains(expandedLevels, parent.value)) {
								expandedLevels.push(parent.value);
								this.fillExpandedLevels(parent.value, items, expandedLevels);
							}
						}
					},

					/**
					 * ######### ############# ###### ## ############# ########
					 * @protected
					 * @param {Array} selectedRows
					 * @param {Terrasoft.Collection} items
					 * @returns {Array}
					 */
					expandToSelectedItems: function(selectedRows, items) {
						MaskHelper.ShowBodyMask();
						var expandLevels = [];
						if (!items) {
							items = this.get("GridData");
						}
						if (selectedRows.length === 1 && selectedRows[0].indexOf("_") > 0) {
							expandLevels = this.restoreExpandedLevels(selectedRows[0]);

						} else if (selectedRows) {
							Terrasoft.each(selectedRows, function(selectedRow) {
								this.fillExpandedLevels(selectedRow, items, expandLevels);
							}, this);
						}
						this.set("expandHierarchyLevels", expandLevels);
						MaskHelper.HideBodyMask();
						return expandLevels;
					},

					/**
					 * ############### ########### ###### ## ######## ##############
					 * @param {string} folderId
					 * @returns {Array}
					 */
					restoreExpandedLevels: function(folderId) {
						var expandLevels = [];
						var idCollection = folderId.split("_");
						var nId = "";
						for (var i = idCollection.length - 1; i > 0; i--) {
							var z = idCollection[i];
							if (!Ext.isEmpty(nId)) {
								nId = z + "_" + nId;
							} else {
								nId = z;
							}
							expandLevels.push(nId);
						}
						return expandLevels;
					},

					/**
					 * Handles opening hierarchical group.
					 * @protected
					 * @param {String} itemKey
					 * @param {Boolean} expanded
					 * @param {Function} callback
					 */
					onExpandHierarchyLevels: function(itemKey, expanded, callback) {
						this.set("IsGridDoubleClickAllowed", false);
						var waitSelect = false;
						var gridData = this.get("GridData");
						if (gridData.contains(itemKey)) {
							var row = gridData.get(itemKey);
							var parent = row.get("Parent");
							var isInCatalogue = row.get("IsInCatalogue");
							if (!Ext.isEmpty(parent) && isInCatalogue) {
								if (expanded) {
									var rowItem = this.getNextLevelItem(row.get("Position"));
									if (rowItem) {
										waitSelect = true;
										MaskHelper.ShowBodyMask();
										var select = this.getCatalogueLevelItemsSelect(rowItem, row);
										select.execute(function(response) {
											var items = new Terrasoft.Collection();
											var grid = Ext.getCmp("foldersGrid");
											response.collection.each(function(item) {
												var currentId = item.get("ColumnPathValueId");
												var compositeKey = currentId + "_" + itemKey;
												if (!gridData.contains(compositeKey)) {
													this.addCatalogItem(item.values, row.rowConfig, itemKey, items, this);
												}
											}, this);
											if (items.getCount() > 0) {
												gridData.loadAll(items, {mode: "child", target: itemKey});
											} else {
												var childrens = [];
												grid.getAllItemChilds(childrens, itemKey);
												if (childrens.length === 0) {
													var toggle = Ext.get(grid.id + grid.hierarchicalTogglePrefix + itemKey);
													toggle.removeCls(grid.hierarchicalMinusCss);
													toggle.removeCls(grid.hierarchicalPlusCss);
												}
											}
											MaskHelper.HideBodyMask();
											if (callback && Ext.isFunction(callback)) {
												callback.call(this);
											}
										}, this);
									}
								}
							}
						}
						if (callback && Ext.isFunction(callback) && !waitSelect) {
							callback.call(this);
						}
					},

					getGridData: function() {
						return this.get("GridData");
					},

					/**
					 * Returns next item of catalogue.
					 * @param {Number} currentPosition Current position in catalogue.
					 * @return {Object} Item of catalogue.
					 */
					getNextLevelItem: function(currentPosition) {
						var itemIndex = 0;
						var result = null;
						var collection = this.catalogueFolders.collection;
						collection.each(function(item, index) {
							var itemPosition = item.get("Position");
							if (itemPosition && itemPosition === currentPosition + 1) {
								itemIndex = index;
							}
						}, this);
						if (itemIndex > 0) {
							result = this.catalogueFolders.getByIndex(itemIndex);
						}
						return result;
					},

					/**
					 * ############ ######## ######### #####
					 * @protected
					 * @param {string} tag
					 */
					onActiveRowAction: function(tag) {
						switch (tag) {
							case "extendFilter":
								this.showExtendCatalogueFilter();
								break;
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
						}
					},

					/**
					 * ############# ######## ######
					 * @protected
					 * @param {string} rowId
					 */
					setActiveRow: function(rowId) {
						this.set("ActiveRowToSet", rowId);
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

					/**
					 * ######## ###### ## ####### ####### ##### ########
					 * @protected
					 * @returns {EntitySchemaQuery|*}
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
					 * ######## ######### ######## #### #########
					 * @protected
					 * @param {string} folderEntitySchemaName
					 * @param {string} folderSchemaUId
					 * @constructor
					 */
					sendUpdateFavoritesMenu: function(folderEntitySchemaName, folderSchemaUId) {
						var sectionFilterModuleId = sandbox.publish("GetSectionFilterModuleId");
						sandbox.publish("UpdateFavoritesMenu", {
							folderEntitySchemaName: folderEntitySchemaName,
							folderSchemaUId: folderSchemaUId
						}, [sectionFilterModuleId]);
					},

					/**
					 * ######### ######
					 * @protected
					 * @param {Array} selectedFolders
					 */
					loadSection: function(selectedFolders) {
						var newState = {
							filterState: {
								folderFilterState: selectedFolders || []
							}
						};
						var url = "SectionModule/" + config.loadSection + "/";
						sandbox.publish("PushHistoryState", {hash: url, stateObj: newState});
					},

					/**
					 * ######### ####### #####
					 * @protected
					 * @param {array} selectedFolders
					 */
					resultSelectedFolders: function(selectedFolders) {
						if (config.loadSection) {
							this.loadSection(selectedFolders);
						} else {
							sandbox.publish("ResultSelectedFolders", {
								folders: selectedFolders
							}, [sandbox.id]);
							sandbox.publish("BackHistoryState");
						}
					},

					/**
					 * ######## ##### ###### ######
					 * @protected
					 */
					cancelSelecting: function() {
						if (config.loadSection) {
							this.loadSection();
						} else {
							sandbox.publish("BackHistoryState");
						}
					},

					/**
					 * ######## ######## #######
					 * @param {string} rowId
					 * @returns {*}
					 */
					getBaseParentFolderIfRowFromCatalogue: function(rowId) {
						if (rowId) {
							var row = this.getGridColumn(rowId);
							if (row.get("IsInCatalogue")) {
								return this.allFoldersRecordItem.value;
							} else if (row.get("IsInFavorites")) {
								return this.get("ActiveRowToSet");
							} else {
								return rowId;
							}
						}
						return rowId;
					},

					/**
					 * Adds folder with specified type.
					 * @param {String} folderTypeId Folder type identifier.
					 * @param {Function} callback The callback function.
					 * @param {Object} scope Context of the callback function.
					 */
					addFolder: function(folderTypeId, callback, scope) {
						var parent = this.getBaseParentFolderIfRowFromCatalogue(this.getActiveRow());
						this.currentEditElement.createNewFolder(folderTypeId, parent, function() {
							this._renameFolder(this.nameInputBoxAddNewFolderHandler, this);
							Ext.callback(callback, scope);
						}, this);
					},

					/**
					 * ######### ######
					 * @protected
					 */
					addGeneralFolderButton: function() {
						this.addFolder(ConfigurationConstants.Folder.Type.General);
					},

					/**
					 * ######### ######
					 * @protected
					 */
					addSearchFolderButton: function() {
						this.addFolder(ConfigurationConstants.Folder.Type.Search);
					},

					/**
					 * ######## ###### ############# ######## ############## ######
					 * @protected
					 * @param {string} folderType
					 * @returns {BaseViewModel|*}
					 */
					getFolderEditViewModel: function(folderType) {
						var viewModelConfig = getFolderViewModelConfig(this.entitySchema, this);
						viewModelConfig.mainViewModel = this;
						viewModelConfig.methods.getActiveRow = this.getActiveRow();
						var folderViewModel = Ext.create("Terrasoft.FolderFilterItemViewModel", viewModelConfig);
						var useStaticFolders = this.get("UseStaticFolders");
						folderViewModel.set("FolderType", {value: folderType});
						folderViewModel.set("useStaticFolders", useStaticFolders);
						if (config && config.sectionEntitySchema) {
							folderViewModel.set("sectionEntitySchemaName", config.sectionEntitySchema.name);
						}
						return folderViewModel;
					},

					/**
					 * ########## ######### ######## ######### # #########
					 * @protected
					 * @returns {*}
					 */
					getFavoriteFolderActionCaption: function() {
						var parentRow = this.getActiveRowParent();
						var caption = (parentRow === config.favoriteRootRecordItem)
							? resources.localizableStrings.RemoveFromFavoriteMenuItemCaptionV2
							: resources.localizableStrings.AddToFavoriteMenuItemCaptionV2;
						return caption;
					},

					/**
					 * ########## ####### ######### ######## ######### # #########
					 * @protected
					 * @returns {boolean}
					 */
					getFavoriteActionVisible: function() {
						var parentRow = this.getActiveRowParent();
						return !Ext.isEmpty(parentRow);
					},

					/**
					 * ########## #######, ### ####### #####-#### ######
					 * @protected
					 * @returns {boolean}
					 */
					getIsFolderSelected: function() {
						var parentRow = this.getActiveRowParent();
						return !Ext.isEmpty(parentRow) || this.get("MultiSelect");
					},

					/**
					 * Folders Id for deleted
					 * @protected
					 * @param {Array|string} selectedIds
					 * @returns {Array} Folders Id for deleted.
					 */
					getVerifiedSelectedIds: function(selectedIds) {
						if (selectedIds && selectedIds.length) {
							return Ext.isArray(selectedIds) ? selectedIds : [selectedIds];
						} else {
							return null;
						}
					},

					/**
					 * Deletes folder from favorite.
					 * @protected
					 * @param {Array|string} selectedIds
					 * @param {object} scope
					 * @param {boolean} keepActive
					 */
					deleteFromFavorites: function(selectedIds, scope, keepActive) {
						var idsForDelete = this.getVerifiedSelectedIds(selectedIds);
						if (!idsForDelete) {
							return;
						}
						var del = Ext.create("Terrasoft.DeleteQuery", {
							rootSchemaName: "FolderFavorite"
						});
						var filters = Ext.create("Terrasoft.FilterGroup");
						filters.addItem(del.createColumnInFilterWithParameters("FolderId", idsForDelete));
						filters.addItem(del.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"FolderEntitySchemaUId", scope.entitySchema.uId));
						del.filters = filters;
						del.execute(function(response) {
							if (response && response.success) {
								if (!keepActive) {
									scope.set("ActiveRow", null);
								}
								scope.clear();
								scope.load(true);
								scope.sendUpdateFavoritesMenu(scope.entitySchema.name, scope.entitySchema.uId);
							}
						}, this);
					},

					/**
					 * Deletes folders.
					 * @param {Array|string} selectedIds
					 * @protected
					 */
					deleteFolders: function(selectedIds) {
						var idsForDelete = this.getVerifiedSelectedIds(selectedIds);
						if (!idsForDelete) {
							return;
						}
						var query = Ext.create("Terrasoft.DeleteQuery", {
							rootSchema: this.entitySchema
						});
						var filter = query.createColumnInFilterWithParameters(this.entitySchema.primaryColumnName,
							idsForDelete);
						query.filters.addItem(filter);
						query.execute(function(response) {
							if (response.success) {
								this.onDeleted();
							} else {
								this.showInformationDialog(ResponseExceptionHelper.GetExceptionMessage(response.errorInfo));
							}
						}, this);
					},

					/**
					 * ############### ######### ######## ######## # ######## # ##
					 * @protected
					 * @param {Array} expandHierarchyLevels
					 * @param {Function} callback
					 */
					restoreExpandedCatalogueAsync: function(expandHierarchyLevels, callback) {
						var expandedLevels = expandHierarchyLevels;
						if (expandedLevels && expandedLevels.length) {
							var me = this;
							var recursionCallback = function() {
								expandedLevels = expandedLevels.slice(1);
								if (expandedLevels.length) {
									me.onExpandHierarchyLevels.call(me, expandedLevels[0], true, recursionCallback);
								} else {
									Ext.callback(callback, this);
								}
							};
							this.onExpandHierarchyLevels.call(this, expandedLevels[0], true, recursionCallback);
						} else {
							Ext.callback(callback, this);
						}
					},
					/**
					 * ######## ###### ######## #### #########
					 * @protected
					 * @param {string} itemKey
					 * @param {Array} nameArray
					 * @returns {*}
					 */
					getCatalogueFilterFullNameParts: function(itemKey, nameArray) {
						if (!nameArray) {
							nameArray = [];
						}
						var gridData = this.get("GridData");
						var row = gridData.get(itemKey);
						var parentKey = row.get("Parent");
						if (Ext.isEmpty(parentKey)) {
							return nameArray;
						}
						nameArray.push(row.get("Name"));
						this.getCatalogueFilterFullNameParts(parentKey, nameArray);
					},

					/**
					 * ######## ###### ######## #### ########
					 * @protected
					 * @param {object} activeRow
					 * @returns {string}
					 */
					getCatalogueFilterFullName: function(activeRow) {
						var names = [];
						this.getCatalogueFilterFullNameParts(activeRow, names);
						names.reverse();
						return names.join(" / ");
					},

					/**
					 * Gets product type identifier from composite identifier of product catalogue element.
					 * @param {Object} compositeId identifier of product catalogue element.
					 * @return {String|null} Product type identifier or null.
					 * if TypeCatalogueLevelPosition is undefined.
					 */
					extractProductTypeIdFromComposite: function(compositeId) {
						var typeCatalogueLevelPos = this.get("TypeCatalogueLevelPosition");
						if (Ext.isEmpty(typeCatalogueLevelPos) || Ext.isEmpty(compositeId)) {
							return null;
						}
						var ids = compositeId.split("_").reverse();
						var productTypeId = ids[typeCatalogueLevelPos + 1];
						return productTypeId;
					},

					/**
					 * Handles click on extended filter icon in product catalogue.
					 * @protected
					 */
					showExtendCatalogueFilter: function() {
						var activeRow = this.getActiveRow();
						var productTypeId = this.extractProductTypeIdFromComposite(activeRow);
						var idModule = sandbox.id + "_SpecificationFilterModule";
						this.set("ExtFilterId", idModule);
						sandbox.subscribe("CloseExtendCatalogueFilter", function() {
							this.resetFolderView();
							sandbox.unloadModule(idModule);
						}, this, [idModule]);
						sandbox.subscribe("GetExtendCatalogueFilterInfo", function() {
							var name = this.getCatalogueFilterFullName(activeRow);
							return {
								activeRow: activeRow,
								displayValue: name,
								productType: productTypeId
							};
						}, this, [idModule]);

						sandbox.subscribe("UpdateExtendCatalogueFilter", function(args) {
							this.set("ExtendedCatalogueFilters", args.filters);
							this.applyCatalogueFilters(args.rowId, true);
						}, this, [idModule]);
						this.set("OldActiveRow", activeRow);
						this.set("ActiveRow", null);
						this.set("IsFoldersContainerVisible", false);
						this.set("IsExtendCatalogueFilterContainerVisible", true);
						sandbox.loadModule("SpecificationFilterModule", {
							renderTo: "extendCatalogueFilterContainer_" + sandbox.id,
							id: idModule
						});
					},

					/**
					 * @inheritdoc Terrasoft.BaseObject#onDestroy
					 * @overridden
					 */
					onDestroy: function() {
						sandbox.unloadModule(this.get("ExtFilterId"));
						this.callParent(arguments);
					},

					/**
					 * Restores modules visible state.
					 * @protected
					 */
					resetFolderView: function() {
						var oldActiveRow = this.get("OldActiveRow");
						this.set("IsFoldersContainerVisible", true);
						this.set("IsExtendCatalogueFilterContainerVisible", false);
						var activeRow = oldActiveRow || this.get("ActiveRow") || null;
						this.setActiveRow(activeRow);
						this.set("SelectedRows", []);
						this.set("OldActiveRow", null);
						this.load(true);
					},

					/**
					 * Handles on favorite folder add.
					 * @protected
					 */
					doFavoriteFolderAction: function() {
						var activeRow = this.getActiveRow();
						if (!activeRow) {
							return;
						}
						var isInFavorites = this.get("GridData").get(activeRow).get("IsInFavorites");
						this.setActiveRow(this.getActualFolderId(activeRow));
						var filters;
						if (isInFavorites) {
							var selectedId = this.getActualFolderId(activeRow);
							var parentRow = this.getActiveRowParent();
							var keepActive = parentRow !== config.favoriteRootRecordItem;
							this.deleteFromFavorites(selectedId, this, keepActive);
						} else {
							var select = Ext.create("Terrasoft.EntitySchemaQuery", {
								rootSchemaName: "FolderFavorite"
							});
							select.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
							filters = Ext.create("Terrasoft.FilterGroup");
							filters.addItem(select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
								"SysAdminUnit", Terrasoft.SysValue.CURRENT_USER.value));
							filters.addItem(select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
								"FolderEntitySchemaUId", this.entitySchema.uId));
							filters.addItem(select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
								"FolderId", activeRow));
							select.filters = filters;
							select.getEntityCollection(function(response) {
								if (response && response.success) {
									if (response.collection.getItems().length > 0) {
										return;
									}
									var insert = Ext.create("Terrasoft.InsertQuery", {
										rootSchemaName: "FolderFavorite"
									});
									insert.setParameterValue("SysAdminUnit", Terrasoft.SysValue.CURRENT_USER.value,
										Terrasoft.DataValueType.GUID);
									insert.setParameterValue("FolderId", activeRow, Terrasoft.DataValueType.GUID);
									insert.setParameterValue("FolderEntitySchemaUId", config.entitySchema.uId,
										Terrasoft.DataValueType.GUID);
									insert.execute(function(response) {
										if (response && response.success) {
											this.clear();
											this.load(true);
											this.sendUpdateFavoritesMenu(config.entitySchema.name,
												config.entitySchema.uId);
										}
									}, this);
								}
							}, this);
						}
					},

					/**
					 * ######## ####### #####
					 * @protected
					 */
					editFolderFilters: function() {
						var activeRow = this.getActiveRow();
						if (!activeRow || !this.currentEditElement) {
							return;
						}
						var sectionFilterModuleId = sandbox.publish("GetSectionFilterModuleId");
						var folder = this.currentEditElement;
						var searchData = folder.get("SearchData");
						var deserializeData = null;
						if (Ext.isEmpty(searchData)) {
							deserializeData = Terrasoft.createFilterGroup();
						} else {
							deserializeData = Terrasoft.deserialize(searchData);
						}

						sandbox.publish("UpdateCustomFilterMenu", {
							"isExtendedModeHidden": false,
							"isFoldersHidden": true,
							"clearActiveFolder": true
						}, [sectionFilterModuleId]);
						sandbox.publish("CustomFilterExtendedMode", {
							folder: folder,
							filter: deserializeData
						}, [sandbox.id]);
					},

					/**
					 * ############ ############## #### ## ######
					 * @protected
					 */
					editRights: function() {
						var recordInfo = {
							entitySchemaName: this.entitySchema.name,
							entitySchemaCaption: this.entitySchema.caption,
							primaryColumnValue: this.currentEditElement.get(this.entitySchema.primaryColumnName),
							primaryDisplayColumnValue: this.currentEditElement.get(this.entitySchema.primaryDisplayColumnName)
						};
						var id = sandbox.id + "_Rights";
						sandbox.subscribe("GetRecordInfo", function() {
							return recordInfo;
						}, this, [id]);
						var params = sandbox.publish("GetHistoryState");
						params.state.foldersManagerOpened = true;
						sandbox.publish("PushHistoryState", {
							stateObj: params.state,
							hash: params.hash.historyState,
							silent: true
						});
						sandbox.loadModule("Rights", {
							renderTo: "centerPanel",
							id: id,
							keepAlive: true
						});
					},

					/**
					 * ######## ### #######
					 * @protected
					 * @param {boolean} multiSelect
					 * @param {function} callback
					 */
					changeGridMode: function(multiSelect, callback) {
						this.set("AdministratedButtonVisible", this.entitySchema.administratedByRecords && !multiSelect);
						this.set("MultiSelect", multiSelect);
						this.set("SelectEnabled", multiSelect);
						this.clear();
						this.load(true, callback);
						this.showFolderInfo();
					},

					/**
					 * ############ ########### ######
					 * @protected
					 * @param {Array} folders
					 * @param {Function} callback
					 */
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

						if (!this.get("UseStaticFolders")) {
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
						var columnsConfig = [{
							cols: 24,
							key: [{
								name: {bindTo: "FolderType"},
								type: Terrasoft.GridKeyType.ICON16LISTED
							}, {
								name: {bindTo: "Name"}
							}]
						}];
						var captionsConfig = [{
							cols: 24,
							columnName: primaryDisplayColumn.name,
							name: primaryDisplayColumn.caption,
							sortColumnDirection: Terrasoft.core.enums.OrderDirection.ASC
						}];
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
							columnsConfig: [{
								cols: 24,
								key: [{
									name: {bindTo: "FolderType"},
									type: Terrasoft.GridKeyType.ICON16LISTED
								}, {
									name: {bindTo: "Name"}
								}]
							}],
							columnsSettingsProfile: {
								isTiled: false,
								listedColumnsConfig: Ext.encode(columnsConfig),
								captionsConfig: Ext.encode(captionsConfig)
							},
							virtualRootItem: this.allFoldersItem,
							virtualRootItemValues: this.allFoldersRecordItem
						};
						LookupUtilities.Open(sandbox, config, handler, this);
					},

					/**
					 * ######## ######## ######
					 * @protected
					 * @param {Array} folders
					 * @param {string} parentId
					 * @param {Function} callback
					 */
					changeFolderParent: function(folders, parentId, callback) {
						var mainViewModel = this;
						var folderId = folders.pop();
						var allFoldersId = config.allFoldersRecordItem.value;
						var favoriteRootFolderId = config.favoriteRootRecordItem.value;
						if (folderId === parentId || !parentId || parentId.value === allFoldersId ||
							parentId.value === favoriteRootFolderId) {
							parentId = null;
						}
						var folder = Ext.create("Terrasoft.FolderFilterItemViewModel", getFolderViewModelConfig(this.entitySchema));
						folder.loadEntity(folderId, function() {
							this.set("Parent", {value: parentId});
							if (folders.length) {
								this.saveEntity(function(result) {
									if (result.success) {
										this.changeFolderParent(folders, parentId, callback);
									} else {
										this.showInformationDialog(result.errorInfo.message);
									}
								}, mainViewModel);
							} else {
								this.saveEntity(function(result) {
									if (result.success) {
										this.set("ActiveRow", null);
										if (callback) {
											callback.call(mainViewModel);
										}
									} else {
										this.showInformationDialog(result.errorInfo.message);
									}
								}, mainViewModel);
							}
						});
					},

					/**
					 * ######### ######## #######
					 * @protected
					 */
					onDeleteAccept: function onDeleteAccept() {
						var activeRow = this.get("ActiveRow");
						var selectedRows = this.get("SelectedRows") || [];
						if (selectedRows.length || activeRow) {
							var selectedValues = selectedRows.length ? selectedRows : [activeRow];
							var actualSelectedValues = [];
							Terrasoft.each(selectedValues, function(currentRecordId) {
								var actualFolderId = this.getActualFolderId(currentRecordId);
								var folderIdsForDelete = [actualFolderId];
								this._setChildrenFoldersIds(folderIdsForDelete, actualFolderId);
								actualSelectedValues = actualSelectedValues.concat(folderIdsForDelete);
							}, this);
							this.deleteFromFavorites(actualSelectedValues, this);
							this.deleteFolders(actualSelectedValues);
						}
					},

					/*
					 @private
					 */
					_setChildrenFoldersIds: function(foldersIds, parentId) {
						var children = this._getChildrenFolders(parentId);
						Terrasoft.each(children, function(item) {
							var childId = item.get("Id");
							foldersIds.push(childId);
							this._setChildrenFoldersIds(foldersIds, childId);
						}, this);
					},

					/**
					 * @param parentId
					 * @private
					 */
					_getChildrenFolders: function(parentId) {
						var gridData = this.get("GridData");
						var children = gridData.getItems().filter(function(item) {
							var parent = item.get("Parent");
							return parent && parent.value === parentId;
						});
						return children;
					},

					/**
					 * ######## ########### ############ ###### #######
					 * @protected
					 * @param {object} rowConfig
					 * @param {Terrasoft.Collection} itemValues
					 * @returns {BaseViewModel|*}
					 */
					getGridRecordByItemValues: function(rowConfig, itemValues) {
						var gridRecord = Ext.create("Terrasoft.FolderGridRowViewModel", {
							entitySchema: config.entitySchema,
							rowConfig: rowConfig,
							values: itemValues,
							isNew: false,
							isDeleted: false,
							methods: {}
						});
						return gridRecord;
					},

					applyModifyFolderFunc: function(controlData) {
						var modifyFolderFunc = config.modifyFolderFunc;
						if (modifyFolderFunc != null && typeof (modifyFolderFunc) === "function") {
							var modifyColumn = config.modifyFolderFunc.call(viewModelConfig, "set", controlData);
							if ((modifyColumn != null) && (modifyColumn.columnName != null)) {
								this.currentEditElement.set(modifyColumn.columnName, modifyColumn.columnValue);
							}
						}
					},

					/**
					 * ########## ####### ############
					 * @protected
					 * @param {string} returnCode
					 * @param {object} controlData
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
					 * Prompts to rename current folder when convert to static.
					 */
					renameConvertFolder: function() {
						this._renameFolder(this.convertNameInputBoxHandler, this);
					},

					/**
					 * Prompts to rename current folder.
					 */
					renameFolder: function() {
						this._renameFolder(this.nameInputBoxHandler, this);
					},

					/**
					 * ############### ######
					 * @protected
					 */
					_renameFolder: function(handler) {
						var caption = null;
						var modifyFolderFunc = config.modifyFolderFunc;
						var oldName = this.currentEditElement.get(this.entitySchema.primaryDisplayColumnName);
						var newName = oldName;
						var controls = {
							name: {
								dataValueType: Terrasoft.DataValueType.TEXT,
								caption: this.entitySchema.primaryDisplayColumn.caption,
								value: newName,
								customConfig: {
									focused: true
								}
							}
						};
						if (Ext.isFunction(modifyFolderFunc)) {
							controls = modifyFolderFunc.call(this, "get");
						}
						caption = this.getRenameDialogCaption();
						Terrasoft.utils.inputBox(
							caption,
							handler,
							["ok", "cancel"],
							this,
							controls
						);
					},

					getRenameDialogCaption: function() {
						var caption;
						var currentEditElement = this.currentEditElement;
						if (currentEditElement.isNew) {
							caption = (currentEditElement.get("FolderType").value ===
								ConfigurationConstants.Folder.Type.Search)
								? resources.localizableStrings.NewSearchFolderInputBoxCaptionV2
								: resources.localizableStrings.NewGeneralFolderInputBoxCaptionV2;
						} else {
							caption = (currentEditElement.get("FolderType").value ===
								ConfigurationConstants.Folder.Type.Search)
								? resources.localizableStrings.SearchFolderInputBoxCaptionV2
								: resources.localizableStrings.GeneralFolderInputBoxCaptionV2;
						}
						return caption;
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
					 * Creates a copy of the selected dynamic folder.
					 * @protected
					 */

					/**
					 * ######### ######## #####.
					 * @protected
					 */
					closeFolderManager: function() {
						if (!Ext.isEmpty(this.currentEditElement)) {
							if (this.currentEditElement.get("IsInCatalogue")) {
								this.applyCatalogueFilters(this.get("ActiveRow"), true);
							} else {
								this.applyFolderFilters(this.currentEditElement.get("Id"), true);
							}
						}
						var sectionFilterModuleId = sandbox.publish("GetSectionFilterModuleId");
						var activeRow = this.get("ActiveRow");
						this.set("OldActiveRow", activeRow);
						this.set("ActiveRow", null);
						sandbox.publish("HideFolderTree", null, [sectionFilterModuleId]);
					},

					/**
					 * ######## ####### #######
					 * @protected
					 * @param {string} rowId
					 * @returns {*}
					 */
					getGridColumn: function(rowId) {
						var gridData = this.get("GridData");
						if (!Ext.isEmpty(gridData) && rowId && gridData.contains(rowId)) {
							return gridData.get(rowId);
						}
						return null;
					},

					/**
					 * ######## ######## ####### #######
					 * @protected
					 * @param {string} rowId
					 * @param {string} columnName
					 * @returns {*}
					 */
					getGridColumnValue: function(rowId, columnName) {
						var result = null;
						var rowData = this.getGridColumn(rowId);
						if (!Ext.isEmpty(rowData)) {
							result = rowData.get(columnName);
						}
						return result;
					},

					/**
					 * ######## ######## ############# ######
					 * @protected
					 * @param {string} rowId
					 * @returns {*}
					 */
					getActualFolderId: function(rowId) {
						return this.getGridColumnValue(rowId, "ActualFolderId");
					},

					/**
					 * ######## ######## ############# ###### ########
					 * @protected
					 * @param {string} rowId
					 * @returns {*}
					 */
					getActualCatalogueFolderId: function(rowId) {
						return this.getGridColumnValue(rowId, "ActualCatalogueFolderId");
					},

					/**
					 * ######## ######## ######
					 * @protected
					 * @returns {Mixed|String|Number|Date|Boolean|Object|*|get|get|get}
					 */
					getActiveRow: function() {
						return this.get("ActiveRow");
					},

					/**
					 * ######## ######## ######## ######
					 * @protected
					 * @returns {*}
					 */
					getActiveRowParent: function() {
						var activeRow = this.getActiveRow();
						return this.getGridColumnValue(activeRow, "Parent");
					},

					/**
					 * ######### ####### ###### ########
					 * @protected
					 * @param {string} rowId
					 */
					applyCatalogueFilters: function(rowId, addToQuickFilter) {
						var filtersGroup = Terrasoft.createFilterGroup();
						var extendedCatalogueFilters = this.get("ExtendedCatalogueFilters");
						if (extendedCatalogueFilters) {
							filtersGroup.addItem(extendedCatalogueFilters);
						}
						var filtersGroupResult = Terrasoft.createFilterGroup();
						var resultFiltersObject = null;
						if (rowId && rowId !== this.catalogueRootRecordItem.value) {
							var rowData = this.getGridColumn(rowId);
							var position = rowData.get("Position");
							var parentData = this.getGridColumn(rowData.get("Parent"));
							var currentID = rowData.get("ActualCatalogueFolderId");
							filtersGroup.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
								rowData.get("ColumnPath"), currentID));
							for (var i = position - 1; i >= 0; i--) {
								var rowItem = this.catalogueFolders.getByIndex(i);
								if (rowItem) {
									var currentParentID = parentData.get("ActualCatalogueFolderId");
									filtersGroup.addItem(Terrasoft.createColumnFilterWithParameter(
										Terrasoft.ComparisonType.EQUAL, rowItem.get("ColumnPath"), currentParentID));
									parentData = this.getGridColumn(parentData.get("Parent"));
								}
							}
							var serializationInfo = filtersGroup.getDefSerializationInfo();
							serializationInfo.serializeFilterManagerInfo = true;
							resultFiltersObject = {
								value: rowData.get("ActualCatalogueFolderId"),
								displayValue: this.getCatalogueFilterFullName(rowData.get("Id")),
								filter: filtersGroup.serialize(serializationInfo),
								folder: rowData,
								folderType: rowData.get("FolderType"),
								sectionEntitySchemaName: config.sectionEntitySchema.name
							};
						}

						filtersGroupResult.add("FolderFilters", filtersGroup);

						var filterItem = {
							filters: filtersGroupResult
						};

						if (this.isProductSelectMode) {
							sandbox.publish("UpdateCatalogueFilter", filterItem);
							return;
						}
						if (addToQuickFilter) {
							sandbox.publish("ResultFolderFilter", resultFiltersObject, [sandbox.id]);
						}

					},

					/**
					 * Applies folder filters.
					 * @protected
					 * @param {String} rowId Row identifier.
					 * @param {Boolean} addToQuickFilter Adds to quick filter.
					 */
					applyFolderFilters: function(rowId, addToQuickFilter) {
						var currentItem = this.currentEditElement;
						if (Ext.isEmpty(currentItem) || Ext.isEmpty(rowId)) {
							return;
						}
						var allFoldersId = config.allFoldersRecordItem.value;
						var favoriteRootFolderId = config.favoriteRootRecordItem.value;
						var filtersGroup = Terrasoft.createFilterGroup();
						var sectionFilterModuleId = sandbox.publish("GetSectionFilterModuleId");
						var currentItemType = currentItem.get("FolderType");
						var resultFiltersObject = null;
						var searchData = currentItem.get("SearchData");
						var isRootFolder = (rowId === allFoldersId) || (rowId === favoriteRootFolderId);
						if (!isRootFolder) {
							var folderTypeId = currentItemType.value;
							var isGeneralFolder = (folderTypeId === ConfigurationConstants.Folder.Type.General);
							var isMailBoxFolder = (folderTypeId === ConfigurationConstants.Folder.Type.MailBox);
							var isSubEmailFolder = (folderTypeId === ConfigurationConstants.Folder.Type.SubEmail);
							if (isGeneralFolder || isMailBoxFolder || isSubEmailFolder) {
								var sectionSchemaName = config.entityColumnNameInFolderEntity;
								var inFolderSchemaName = config.inFolderEntitySchemaName;
								filtersGroup.add("filterStaticFolder", Terrasoft.createColumnInFilterWithParameters(
									Ext.String.format("[{0}:{1}:Id].Folder", inFolderSchemaName, sectionSchemaName),
									[rowId]));
							} else if (!Ext.isEmpty(searchData)) {
								filtersGroup = Terrasoft.deserialize(searchData);
							} else {
								this.log(resources.localizableStrings.EmptyFiltersGroupData, Terrasoft.LogMessageType.WARNING);
							}
							var serializationInfo = filtersGroup.getDefSerializationInfo();
							serializationInfo.serializeFilterManagerInfo = true;
							resultFiltersObject = {
								value: currentItem.get("Id"),
								displayValue: currentItem.get("Name"),
								filter: filtersGroup.serialize(serializationInfo),
								folder: currentItem,
								folderType: currentItemType,
								sectionEntitySchemaName: config.sectionEntitySchema.name
							};
						}
						var folderMenuItemConfig = null;
						if (currentItemType && currentItemType.value === ConfigurationConstants.Folder.Type.Search) {
							folderMenuItemConfig = {
								value: currentItem.get("Id"),
								displayValue: currentItem.get("Name"),
								folderType: currentItemType,
								folder: currentItem,
								filter: !Ext.isEmpty(searchData)
									? Terrasoft.deserialize(searchData)
									: null,
								sectionEntityScheamName: config.sectionEntitySchema.name
							};
						}
						if (this.isProductSelectMode) {
							var filtersGroupResult = Terrasoft.createFilterGroup();
							filtersGroupResult.add("FolderFilters", filtersGroup);
							var filterItem = {
								filters: filtersGroupResult
							};
							sandbox.publish("UpdateCatalogueFilter", filterItem);
							return;
						}
						sandbox.publish("UpdateCustomFilterMenu", folderMenuItemConfig, [sectionFilterModuleId]);
						if (addToQuickFilter) {
							sandbox.publish("ResultFolderFilter", resultFiltersObject, [sandbox.id]);
						}
					}
				}
			};
			return viewModelConfig;
		}

		/**
		 * ######## ############ ############# ###### ######
		 * @param {object} entitySchema
		 * @param {object} mainViewModel
		 * @returns {Object}
		 */
		function getFolderViewModelConfig(entitySchema, mainViewModel) {
			var viewModelConfig = {
				entitySchema: entitySchema,
				values: {
					/**
					 * ####, ######## ############## ######
					 * @type {Bollean}
					 */
					editMode: false,

					/**
					 * Favorite folder flag.
					 * @type {Boolean}
					 */
					isInFavorites: false
				},
				methods: {
					resetColumnsValues: function() {
						Terrasoft.each(this.columns, function(column) {
							this.set(column.name, null);
						}, this);
					},
					/**
					 * Creates new folder.
					 * @param {String} folderType Folder type identifier.
					 * @param {String} parent Parent folder identifier.
					 * @param {Function} callback The callback function.
					 * @param {Object} scope Context of the callback function.S
					 */
					createNewFolder: function(folderType, parent, callback, scope) {
						this.isNew = true;
						var validationConfig = this.validationConfig;
						this.validationConfig = null;
						Terrasoft.each(this.columns, function(column) {
							this.set(column.name, null);
						}, this);
						if ((parent === mainViewModel.allFoldersRecordItem.value) ||
							(parent === mainViewModel.favoriteRootRecordItem.value)) {
							parent = null;
						}
						this.validationConfig = validationConfig;
						this.setDefaultValues(function() {
							this.set("Parent", {value: parent});
							this.set("FolderType", {value: folderType});
							this.set("editMode", true);
							Ext.callback(callback, scope);
						}, this);
					},

					/**
					 * ######### ####### ######### #######
					 * @protected
					 * @private
					 * @param {object} result
					 */
					updateCurrentSelectedElement: function(result) {
						if (result.success) {
							mainViewModel.load(false, function() {
								if (this.wasNew) {
									mainViewModel.set("ActiveRow", this.get(this.primaryColumnName));
								}
								mainViewModel.showFolderInfo();
							}, this);
							this.set("editMode", false);
						} else {
							this.showInformationDialog(result.errorInfo.message);
						}
					},

					addDefaultSearchData: function() {
						var folderType = this.get("FolderType");
						if (folderType && folderType.value === ConfigurationConstants.Folder.Type.Search) {
							var filters = Ext.create("Terrasoft.FilterGroup");
							var serializationInfo = filters.getDefSerializationInfo();
							serializationInfo.serializeFilterManagerInfo = true;
							this.set("SearchData", filters.serialize(serializationInfo));
						}
					},

					/**
					 * ######### ######### ###### # ########## ## ###
					 * @protected
					 * @private
					 * @param {object} serializedFilters
					 * @param {Function} callback Callback method.
					 * @param {Object} scope Callback method context.
					 */
					saveLookupFolder: function(serializedFilters, callback, scope) {
						if (this.isNew) {
							this.wasNew = true;
							var parent = this.get("Parent");
							if (parent && parent.value) {
								var expandedLevels = mainViewModel.get("expandHierarchyLevels").slice(0);
								if (!Terrasoft.contains(expandedLevels, parent.value)) {
									expandedLevels.push(parent.value);
								}
								mainViewModel.set("expandHierarchyLevels", expandedLevels);
							}
						}
						var folderType = this.get("FolderType");
						if (folderType && folderType.value === ConfigurationConstants.Folder.Type.Search) {
							this.set("SearchData", serializedFilters);
						}
						this.saveEntity(function(result) {
							if (!result.success) {
								this.showInformationDialog(result.errorInfo.message);
							}
							Ext.callback(callback, scope);
						});
					},

					/**
					 * ############ ####### ## ###### ######, ######### ##### #############
					 * @protected
					 * @private
					 */
					cancelButton: function() {
						if (this.isNew) {
							var parent = this.get("Parent");
							if (parent && parent.value) {
								mainViewModel.showFolderInfo(parent.value);
							}
						} else {
							this.set("editMode", false);
						}
					},

					/**
					 * ######## ##### #############
					 * @protected
					 * @private
					 */
					goToEditMode: function() {
						this.set("editMode", true);
					}
				}
			};
			viewModelConfig.columns = Terrasoft.deepClone(entitySchema.columns);
			Terrasoft.each(viewModelConfig.columns, function(column) {
				column.columnPath = column.name;
				column.type = Terrasoft.ViewModelColumnType.ENTITY_COLUMN;
			}, this);
			return viewModelConfig;
		}

		return {
			generate: generate,
			getFolderViewModelConfig: getFolderViewModelConfig
		};
	});


