Terrasoft.configuration.Structures["FolderFilterItemViewModel"] = {innerHierarchyStack: ["FolderFilterItemViewModel"]};
define("FolderFilterItemViewModel", ["FolderFilterItemViewModelResources", "ConfigurationConstants",
	"RightUtilities"], function(resources, ConfigurationConstants, RightUtilities) {
	/**
	 * @class Terrasoft.configuration.FolderFilterItemViewModel
	 * Folder filter item viewModel.
	 */
	Ext.define("Terrasoft.configuration.FolderFilterItemViewModel", {
		extend: "Terrasoft.BaseViewModel",
		alternateClassName: "Terrasoft.FolderFilterItemViewModel",

		//region Properties: Private

		/**
		 * Folder manager view model.
		 * @private
		 * @type {Object}
		 */
		mainViewModel: null,

		//endregion

		//region Methods: Private

		/**
		 * Initializes columns.
		 * @private
		 */
		initColumns: function() {
			var entitySchema = this.entitySchema;
			if (!entitySchema) {
				return;
			}
			this.initEntitySchemaProperties();
			Terrasoft.each(this.columns, function(column, columnName) {
				column.columnPath = column.name || columnName;
				column.type = Terrasoft.ViewModelColumnType.ENTITY_COLUMN;
			});
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#getSaveQuery
		 * @override
		 */
		getSaveQuery: function() {
			var query = this.callParent(arguments);
			if (!this.isNew) {
				query.enablePrimaryColumnFilter(this.get("FolderId") || this.get(this.primaryColumnName));
			}
			return query;
		},

		/**
		 * Resets columns values.
		 * @private
		 */
		resetColumnsValues: function() {
			Terrasoft.each(this.columns, function(column) {
				this.set(column.name, null);
			}, this);
		},

		/**
		 * Expands hierarchy levels.
		 * @private
		 */
		expandHierarchyLevels: function() {
			var parent = this.get("Parent");
			if (parent && parent.value) {
				var mainViewModel = this.mainViewModel;
				var levels = mainViewModel.get("expandHierarchyLevels");
				var expandedLevels = levels.slice(0);
				if (!Terrasoft.contains(expandedLevels, parent.value)) {
					expandedLevels.push(parent.value);
				}
				mainViewModel.set("expandHierarchyLevels", expandedLevels);
			}
		},

		/**
		 * Sets search data.
		 * @private
		 * @param {String} serializedFilters Serialized filters.
		 */
		setSearchData: function(serializedFilters) {
			var folderType = this.get("FolderType");
			if (folderType && folderType.value === ConfigurationConstants.Folder.Type.Search) {
				this.set("SearchData", serializedFilters);
			}
		},

		/**
		 * Creates serialized filters group.
		 * @private
		 * @return {String}
		 */
		createSerializedFiltersGroup: function() {
			var filters = Ext.create("Terrasoft.FilterGroup");
			var serializationInfo = filters.getDefSerializationInfo();
			serializationInfo.serializeFilterManagerInfo = true;
			return filters.serialize(serializationInfo);
		},

		/**
		 * @private
		 */
		_findGridDataItemByName: function(name) {
			var gridData = this.mainViewModel.getGridData();
			var parent = this.get("Parent");
			var parentId = parent && parent.value || Terrasoft.GUID_EMPTY;
			return gridData.findByFn(function(item) {
				var itemParent = item.get("Parent");
				var itemParentId = itemParent && itemParent.value;
				return item.get(this.primaryDisplayColumnName) === name && itemParentId === parentId;
			}, this);
		},

		/**
		 * @private
		 */
		_getCopyFolderName: function(name) {
			var copyNameTpl = this.mainViewModel.getLocalizableString("CopyFolderNameTpl");
			name = Ext.String.format(copyNameTpl, name);
			var existingItem = this._findGridDataItemByName(name);
			if (existingItem) {
				name = this._getCopyFolderName(name);
			}
			return name;
		},

		/**
		 * Returns model value by specified name.
		 * @param  {String} columnName Name of the column which value should be returned.
		 * @return {Object|Null} Value of the specified column.
		 * @private
		 */
		_getActiveRowColumnValue: function(columnName) {
			if (!this.mainViewModel) {
				return null;
			}
			var gridData = this.mainViewModel.getGridData();
			var activeRow = this.mainViewModel.getActiveRow();
			var sourceItem = gridData && gridData.get(activeRow);
			var columnValue = sourceItem && sourceItem.get(columnName);
			return columnValue;
		},

		//endregion

		//region Methods: Public

		/**
		 * @inheritdoc
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initColumns();
		},

		/**
		 * Creates new folder.
		 * @param {String} folderTypeId Folder type identifier.
		 * @param {String} parentFolderId Parent folder identifier.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope Execution context of the callback function.
		 */
		createNewFolder: function(folderTypeId, parentFolderId, callback, scope) {
			this.isNew = true;
			var validationConfig = this.validationConfig;
			this.validationConfig = null;
			this.resetColumnsValues();
			var mainViewModel = this.mainViewModel;
			if ((parentFolderId === mainViewModel.allFoldersRecordItem.value) ||
					(parentFolderId === mainViewModel.favoriteRootRecordItem.value)) {
				parentFolderId = null;
			}
			this.validationConfig = validationConfig;
			this.setDefaultValues(function() {
				this.set("Parent", {value: parentFolderId});
				this.set("FolderType", {value: folderTypeId});
				this.set("editMode", true);
				Ext.callback(callback, scope);
			}, this);
		},

		/**
		 * Discards changes.
		 */
		cancelButton: function() {
			if (this.isNew) {
				var parent = this.get("Parent");
				var mainViewModel = this.mainViewModel;
				var rowId = (parent && parent.value) ? parent.value : mainViewModel.allFoldersRecordItem.value;
				mainViewModel.showFolderInfo(rowId);
				this.isNew = false;
			} else {
				this.set("editMode", false);
			}
		},

		/**
		 * Turns on edit mode.
		 */
		goToEditMode: function() {
			this.set("editMode", true);
		},

		/**
		 * Returns active row.
		 * @return {Object} Active row.
		 */
		getActiveRow: function() {
			return this.get("activeRow");
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#copyEntity
		 * @override
		 */
		copyEntity: function() {
			this.resetColumnsValues();
			this.callParent(arguments);
		},
		/**
		 * Returns a string that should be used as a default folder name value in the renaming dialog.
		 * @return {String} Current or proposed folder name.
		 */
		getNewFolderName: function() {
			var name = this.get(this.primaryDisplayColumnName);
			if (this.isCopy && this.mainViewModel) {
				name = this._getCopyFolderName(name);
			}
			return name;
		},

		/**
		 * Makes copy of current entity.
		 * @param {Function} callback A callback method to be invoked after copying is done.
		 * @param {Object} scope Callback execution context.
		 */
		createCopy: function(callback, scope) {
			this.isCopy = true;
			this.isNew = true;
			var sourceId = this.get(this.primaryColumnName);
			this.set("CopiedSourceId", sourceId);
			this.copyEntity(sourceId, function(result) {
				this.set(this.primaryDisplayColumnName, this.getNewFolderName());
				Ext.callback(callback, scope || this, [result]);
			}, this);
		},

		/**
		 * Handler for entity saving operation.
		 * @param {Object} result Save entity result.
		 */
		onEntitySaved: function(result) {
			if (this.isCopy && this.entitySchema.administratedByRecords === true) {
				this.promptToCopySourceFolderRights(function() {
					this.isCopy = false;
					this.set("CopiedSourceId", null);
					this.updateCurrentSelectedElement(result);
				}, this);
			} else {
				this.updateCurrentSelectedElement(result);
			}
		},

		/**
		 * Saves folder.
		 * @param {Function} callback Callback.
		 * @param {Object} scope Callback execution scope.
		 * @public
		 */
		saveButton: function(callback, scope) {
			if (this.isNew) {
				var folderType = this.get("FolderType");
				this.wasNew = folderType && folderType.value === ConfigurationConstants.Folder.Type.Search;
				this.expandHierarchyLevels();
				if (!this.isCopy) {
					this.setSearchData(this.createSerializedFiltersGroup());
				}
			}
			this.saveEntity(function(arg) {
				this.onEntitySaved(arg);
				Ext.callback(callback, scope || this);
			}, this);
		},

		/**
		 * Prompts user to copy rights from the source folder to this copy of the folder.
		 * @param {Function} callback Callback.
		 * @param {Object} scope Callback execution scope.
		 * @protected
		 */
		promptToCopySourceFolderRights: function(callback, scope) {
			var copiedSourceId = this.get("CopiedSourceId");
			if (Ext.isEmpty(copiedSourceId)) {
				return;
			}
			var caption = this.getPromptToCopySourceFolderRightsDialogCaption();
			this.showConfirmationDialog(caption, function(returnCode) {
				if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
					this.copySourceFolderRights(copiedSourceId);
				}
				Ext.callback(callback, scope);
			}, [Terrasoft.MessageBoxButtons.YES.returnCode, Terrasoft.MessageBoxButtons.NO.returnCode]);
		},

		getPromptToCopySourceFolderRightsDialogCaption: function() {
			var sourceName = this._getActiveRowColumnValue(this.primaryDisplayColumnName);
			var tpl = resources.localizableStrings.PromptToCopySourceFolderRightsTpl;
			var caption = Ext.String.format(tpl, sourceName);
			return caption;
		},

		copySourceFolderRights: function(copiedSourceId) {
			if (copiedSourceId === this.id || Ext.isEmpty(copiedSourceId)) {
				return;
			}
			var schemaName = this.entitySchemaName || this.entitySchema && this.entitySchema.name;
			RightUtilities.copyRights({
				schemaName: schemaName,
				sourceId: copiedSourceId,
				targetId: this.get(this.primaryColumnName)
			}, Terrasoft.emptyFn, this);
		},

		/**
		 * Saves lookup folder.
		 * @param {String} serializedFilters Serialized folder filters.
		 * @param {Function} callback Callback.
		 * @param {Object} scope Callback execution scope.
		 */
		saveLookupFolder: function(serializedFilters, callback, scope) {
			if (this.isNew) {
				this.wasNew = true;
				this.expandHierarchyLevels();
			}
			this.setSearchData(serializedFilters);
			this.saveEntity(callback, scope || this);
		},

		/**
		 * Updates current selected element.
		 * @param {Object} result Result configuration.
		 * @param {Boolean} result.success Result success.
		 */
		updateCurrentSelectedElement: function(result) {
			if (result.success) {
				this.mainViewModel.load(function() {
					if (this.wasNew) {
						this.mainViewModel.set("activeRow", this.get(this.primaryColumnName));
					}
					this.mainViewModel.showFolderInfo();
				}, this);
				this.set("editMode", false);
			} else {
				this.showInformationDialog(result.errorInfo.message);
			}
		}

		//endregion

	});
	return Terrasoft.FolderFilterItemViewModel;
});


