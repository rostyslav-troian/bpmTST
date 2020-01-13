Terrasoft.configuration.Structures["ExtendedFilterEditModelV2"] = {innerHierarchyStack: ["ExtendedFilterEditModelV2"]};
define("ExtendedFilterEditModelV2", ["ext-base", "terrasoft", "ExtendedFilterEditModelV2Resources",
	"ConfigurationConstants", "FolderFilterItemViewModel"],
	function(Ext, Terrasoft, resources, ConfigurationConstants) {

		function generateModel(sandbox, renderTo) {
			var model = {
				values: {
					FilterManager: null,
					SelectedFilters: null,
					EntitySchemaName: null,
					groupButtonVisible: false,
					unGroupButtonVisible: false,
					moveUpButtonVisible: false,
					moveDownButtonVisible: false,
					isHeaderVisible: true,
					currentFolderName: "",
					sandbox: sandbox,
					renderTo: renderTo,
					activeFolder: null,
					folderEntityName: null
				},
				methods: {
					initActionFired: function() {
						var me = this;
						sandbox.subscribe("FilterActionsFired", function(key) {
							switch (key) {
								case "group":
									me.groupItems();
									break;
								case "ungroup":
									me.unGroupItems();
									break;
								case "up":
									me.moveUp();
									break;
								case "down":
									me.moveDown();
									break;
							}
						});
						this._subscribeFilterManagerEvent();
					},
					/**
					 * Subscribes filter manager events.
					 * @private
					 */
					_subscribeFilterManagerEvent: function() {
						var filterManager = this.get("FilterManager");
						if (!filterManager) {
							return;
						}
						filterManager.on("addFilter", this.onFiltersChanged, this);
						filterManager.on("removeFilter", this.onFiltersChanged, this);
						filterManager.on("changeFilter", this.onFiltersChanged, this);
					},
					/**
					 * Unsubscribes filter manager events.
					 * @private
					 */
					_unSubscribeFilterManagerEvent: function() {
						var filterManager = this.get("FilterManager");
						if (!filterManager) {
							return;
						}
						filterManager.un("addFilter", this.onFiltersChanged, this);
						filterManager.un("removeFilter", this.onFiltersChanged, this);
						filterManager.un("changeFilter", this.onFiltersChanged, this);
					},
					/**
					 * Filter change handler.
					 * @protected
					 */
					onFiltersChanged: function() {
						var activeFolder = this.get("activeFolder");
						if (!activeFolder) {
							return;
						}
						activeFolder.set("OptimizationType", Terrasoft.Folder.OptimizationType.TryOptimize);
					},
					getFiltersArray: function() {
						var selectedItems = this.get("SelectedFilters");
						var filtersArray = [];
						Terrasoft.each(selectedItems, function(item) {
							filtersArray.push(item);
						});
						return filtersArray;
					},
					getFilter: function() {
						var selectedItems = this.get("SelectedFilters");
						var filtersArray = [];
						Terrasoft.each(selectedItems, function(item) {
							filtersArray.push(item);
						});
						return (filtersArray.length > 0) ? filtersArray[0] : null;
					},
					groupItems: function() {
						var filterManager = this.get("FilterManager");
						filterManager.groupFilters(this.getFiltersArray());
						this.onSelectedFilterChange();
					},
					unGroupItems: function() {
						var filterManager = this.get("FilterManager");
						filterManager.unGroupFilters(this.getFilter());
						this.onSelectedFilterChange();
					},
					moveUp: function() {
						var filterManager = this.get("FilterManager");
						filterManager.moveUp(this.getFilter());
						this.onSelectedFilterChange();
					},
					moveDown: function() {
						var filterManager = this.get("FilterManager");
						filterManager.moveDown(this.getFilter());
						this.onSelectedFilterChange();
					},
					onGoBackToFolders: function() {
						var sandbox = this.get("sandbox");
						sandbox.publish("ShowFolderTree", null, [sandbox.id]);
					},

					/**
					 * Creates folder.
					 * @private
					 * @param {Object} entityFolderSchema Entity folder schema.
					 * @param {String} folderName Folder name.
					 * @param {String} parentId Parent folder identifier.
					 * @return {Terrasoft.FolderFilterItemViewModel} Created folder.
					 */
					createFolder: function(entityFolderSchema, folderName, parentId) {
						var filterManager = this.get("FilterManager");
						var folder = Ext.create(Terrasoft.FolderFilterItemViewModel, {
							entitySchema: entityFolderSchema,
							columns: Terrasoft.deepClone(entityFolderSchema.columns)
						});
						Terrasoft.each(folder.columns, function(column) {
							column.columnPath = column.name;
							column.type = Terrasoft.ViewModelColumnType.ENTITY_COLUMN;
						});
						folder.set(entityFolderSchema.primaryColumnName, Terrasoft.generateGUID());
						folder.set("Name", folderName);
						folder.set("FolderType", {value: ConfigurationConstants.Folder.Type.Search});
						folder.set("SearchData", filterManager.serializeFilters());
						folder.set("Parent", {value: parentId});
						return folder;
					},

					/**
					 * Gets folder entity schema name.
					 * @private
					 * @return {String}
					 */
					getFolderEntitySchemaName: function() {
						var filterManager = this.get("FilterManager");
						return this.$folderEntityName || Ext.String.format("{0}Folder", filterManager.rootSchemaName);
					},

					/**
					 * Requires folder schema.
					 * @private
					 * @param {Function} callback Callback-function.
					 * @param {Object} scope Execution context.
					 */
					requireFolderSchema: function(callback, scope) {
						var folderSchemaName = this.getFolderEntitySchemaName();
						Terrasoft.require([folderSchemaName], function(entityFolderSchema) {
							callback.call(scope, entityFolderSchema);
						}, this);
					},

					/**
					 * Gets parent folder identifier.
					 * @private
					 * @return {String}
					 */
					getParentFolderId: function() {
						var sandbox = this.get("sandbox");
						var sectionFilters = sandbox.publish("GetSectionFiltersInfo", null, [sandbox.id]);
						var folderFilters = sectionFilters.find("FolderFilters");
						var selectedFolder = folderFilters && folderFilters[0];
						return selectedFolder && selectedFolder.value;
					},

					/**
					 * Input box closed state handler.
					 * @protected
					 * @virtual
					 * @param {String} pressedButtonCode Pressed button code.
					 * @param {Object} inputBoxControls Input box controls.
					 */
					onInputBoxClosed: function(pressedButtonCode, inputBoxControls) {
						if (pressedButtonCode === Terrasoft.MessageBoxButtons.OK.returnCode &&
							inputBoxControls.name.value) {
							this.requireFolderSchema(function(entityFolderSchema) {
								var parentFolderId = this.getParentFolderId();
								var folder = this.createFolder(entityFolderSchema, inputBoxControls.name.value,
									parentFolderId);
								folder.saveEntity(function() {
									this.onFolderSaved(folder);
								}, this);
							}, this);
						}
					},

					/**
					 * Clears filters.
					 * @protected
					 */
					clearFilters: function() {
						var filterManager = this.get("FilterManager");
						filterManager.filters.clear();
						this.applyButton();
					},

					/**
					 * Folder saved event handler.
					 * @protected
					 * @virtual
					 * @param {Object} folder Saved folder.
					 */
					onFolderSaved: function(folder) {
						this.clearFilters();
						var sandbox = this.get("sandbox");
						sandbox.publish("ShowFolderTree", {
							activeFolderId: folder.get(folder.entitySchema.primaryColumnName)
						}, [sandbox.id]);
					},

					/**
					 * Opens input box.
					 * @private
					 */
					openInputBox: function() {
						var messageBoxButtons = Terrasoft.MessageBoxButtons;
						Terrasoft.utils.inputBox(resources.localizableStrings.InputBoxCaption, this.onInputBoxClosed,
							[messageBoxButtons.OK.returnCode, messageBoxButtons.CANCEL.returnCode], this,
							{
								name: {
									dataValueType: Terrasoft.DataValueType.TEXT,
									caption: resources.localizableStrings.NameFieldCaption,
									customConfig: {
										focused: true,
										markerValue: "Name"
									}
								}
							}
						);
					},

					/**
					 * Save button click handler.
					 */
					saveButton: function() {
						if (this.isFolderEditMode()) {
							this.applyButton(true);
						} else {
							this.openInputBox();
						}
					},

					/**
					 * Apply button click handler.
					 */
					applyButton: function(needSaveFolder) {
						var filterManager = this.get("FilterManager");
						var sandbox = this.get("sandbox");
						if (needSaveFolder) {
							this.saveFolder();
						} else {
							sandbox.publish("ApplyResultExtendedFilter", {
								folderEditMode: this.isFolderEditMode(),
								filter: filterManager.filters,
								serializedFilter: filterManager.serializeFilters()
							}, [sandbox.id]);
						}
					},

					/**
					 * Save folder.
					 * @protected
					 */
					saveFolder: function() {
						var filterManager = this.get("FilterManager");
						var folder = this.get("activeFolder");
						var sandbox = this.get("sandbox");
						if (folder && filterManager) {
							folder.saveLookupFolder(filterManager.serializeFilters(), function() {
								sandbox.publish("ShowFolderTree", {
									activeFolderId: folder.get("FolderId")
								}, [sandbox.id]);
								var entitySchema = folder.entitySchema;
								if (folder.get("isInFavorites") && entitySchema) {
									this.sendUpdateFavoritesMenu(entitySchema.name, entitySchema.uId);
								}
							}, this);
						}
					},

					/**
					 * Send update favorites menu.
					 * @protected
					 * @param {String} entitySchemaName Entity schema name.
					 * @param {Guid} entitySchemaUId Entity schema uniqueidentifier.
					 */
					sendUpdateFavoritesMenu: function(entitySchemaName, entitySchemaUId) {
						var sectionFilterModuleId = sandbox.publish("GetSectionFilterModuleId");
						sandbox.publish("UpdateFavoritesMenu", {
							folderEntitySchemaName: entitySchemaName,
							folderSchemaUId: entitySchemaUId
						}, [sectionFilterModuleId]);
					},

					actionsButtonVisible: function() {
						return this.get("groupButtonVisible") || this.get("unGroupButtonVisible") ||
							this.get("moveUpButtonVisible") || this.get("moveDownButtonVisible");
					},
					onSelectedFilterChange: function() {
						var filter = this.getFilter();
						var rootFilter = this.get("FilterManager").filters;
						var notRootFilter = !Ext.isEmpty(filter) && (filter !== rootFilter);
						var notFirstFilter = rootFilter.indexOf(filter) !== 0;
						var notLastFilter = rootFilter.indexOf(filter) !== (rootFilter.getCount() - 1);
						this.set("groupButtonVisible", notRootFilter);
						this.set("unGroupButtonVisible", notRootFilter &&
							(filter.$className === "Terrasoft.data.filters.FilterGroup"));
						this.set("moveUpButtonVisible", notRootFilter && notFirstFilter);
						this.set("moveDownButtonVisible", notRootFilter && notLastFilter);
						this.fireEnableChanged();
					},
					fireEnableChanged: function() {
						var enableConfig = {
							groupBtnState: this.get("groupButtonVisible"),
							unGroupBtnState: this.get("unGroupButtonVisible"),
							moveUpBtnState: this.get("moveUpButtonVisible"),
							moveDownBtnState: this.get("moveDownButtonVisible")
						};
						sandbox.publish("FilterActionsEnabledChanged", enableConfig);
					},

					/**
					 * Closes extended filter.
					 */
					closeExtendedFilter: function() {
						var folderConfig = null;
						if (this.isFolderEditMode()) {
							var folder = this.get("activeFolder");
							folderConfig = {
								value: folder.get("Id"),
								displayValue: folder.get("Name") || folder.get("FolderName"),
								filter: folder.get("SearchData"),
								folder: folder,
								folderType: folder.get("FolderType")
							};
						}
						var sectionFilterModuleId = sandbox.publish("GetSectionFilterModuleId");
						sandbox.publish("CustomFilterExtendedModeClose", folderConfig, [sectionFilterModuleId]);
					},

					getExtendedFilterCaption: function() {
						return this.get("currentFolderName") ||
							resources.localizableStrings.ExtendedFilterModeCaption;
					},

					/**
					 * Returns active folder caption.
					 * @return {String}
					 */
					getExtendedFolderCaption: function() {
						var folder = this.get("activeFolder");
						return folder ? folder.get("Name") || folder.get("FolderName") : "";
					},

					isFolderEditMode: function() {
						return this.get("activeFolder") != null;
					},

					/**
					 * Gets Save button caption.
					 * @protected
					 * @return {String}
					 */
					getSaveButtonCaption: function() {
						var strings = resources.localizableStrings;
						return this.isFolderEditMode() ? strings.SaveButtonCaption : strings.SaveAsButtonCaption;
					},

					/**
					 * Gets Save button visibility.
					 * @protected
					 * @virtual
					 * @return {Boolean}
					 */
					getSaveButtonVisibility: function() {
						return true;
					},

					/**
					 * @inheritdoc Terrasoft.BaseViewModel#destroy
					 * @override
					 */
					onDestroy: function() {
						this._unSubscribeFilterManagerEvent();
						this.callParent(arguments);
					}
				}
			};
			return model;
		}

		return {
			generateModel: generateModel
		};
	});


