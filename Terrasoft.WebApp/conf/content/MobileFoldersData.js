Terrasoft.configuration.Structures["MobileFoldersData"] = {innerHierarchyStack: ["MobileFoldersData"]};
/* globals BaseFolder: false */
/**
 * @class Terrasoft.configuration.FoldersData
 */
Ext.define("Terrasoft.configuration.FoldersData", {
	extend: "Terrasoft.core.AbstractFoldersData",

	/**
	 * @protected
	 */
	foldersStoreClassName: "Terrasoft.configuration.FoldersStore",

	// region Methods: Private

	/**
	 * @private
	 */
	getStaticFolderFilter: function(folderId) {
		var inFolderModelName = this.modelName + "InFolder";
		var columnPath = Ext.String.format("[{0}:{1}:Id].Folder", inFolderModelName, this.modelName);
		return Ext.create("Terrasoft.QueryInFilter", {
			rightExpressions: [Ext.create("Terrasoft.ParameterExpression", {
				parameter: {
					dataValueType: Terrasoft.DataValueType.Guid,
					value: folderId
				}
			})],
			leftExpression: Ext.create("Terrasoft.ColumnExpression", {
				columnPath: columnPath
			})
		});
	},

	// endregion

	// region Methods: Public

	/**
	 * Returns folders model for specified section.
	 * @return {Terrasoft.model.BaseFolder} Instance of folders model.
	 */
	getFolderModel: function() {
		var folderModelName = this.modelName + "Folder";
		if (!Ext.ModelManager.getModel(folderModelName)) {
			Ext.define(folderModelName, {
				extend: "Terrasoft.model.BaseFolder",
				statics: {
					ColumnConfigs: new Ext.util.MixedCollection(),
					PrimaryColumnName: "Id",
					PrimaryDisplayColumnName: "Name",
					IsVirtual: true,
					UseRecordDeactivation: false,
					Caption: folderModelName
				}
			}, function() {
				BaseFolder.ColumnConfigs.eachKey(function(key, value) {
					this.ColumnConfigs.add(key, value);
				}, this);
				this.ColumnConfigs.add("Parent", {
					columnType: Terrasoft.ColumnTypes.lookup,
					modelName: folderModelName,
					defValue: null,
					isValueCloneable: true,
					isRequired: false,
					caption: "Parent"
				});
				this.initFields();
			});
		}
		return Ext.ModelManager.getModel(folderModelName);
	},

	/**
	 * Returns folder data store with filter.
	 * @param {Guid} parentId Id of parent folder record by which data will be filtered.
	 * @return {Terrasoft.store.BaseStore} Instance of store.
	 */
	getStore: function(parentId) {
		var folderModel = this.getFolderModel();
		return Ext.create(this.foldersStoreClassName, {
			folderModel: folderModel,
			parentId: parentId
		});
	},

	/**
	 * Returns filter by folder.
	 * @param {Object} config Configuration object:
	 * @param {Guid} config.folderId Id of folder.
	 * @param {Terrasoft.FolderType} config.folderType Type of folder.
	 * @param {Function} config.success Called on success.
	 * @param {Function} config.failure Called on failure.
	 * @param {Object} config.scope Value of `this` in the above functions.
	 * @param {String} config.cancellationId Cancellation id. If parameter is set, operation can be cancelled.
	 */
	getFilters: function(config) {
		if (config.folderType === Terrasoft.FolderTypeId.Static) {
			Ext.callback(config.success, config.scope, [this.getStaticFolderFilter(config.folderId)]);
		} else {
			var folderModel = this.getFolderModel();
			var queryConfig = Ext.create("Terrasoft.QueryConfig", {
				columns: ["SearchData"],
				modelName: folderModel.getName(),
				excludeBinaryColumns: false
			});
			folderModel.load(config.folderId, {
				proxyType: Terrasoft.ProxyType.Online,
				isCancelable: true,
				cancellationId: config.cancellationId,
				queryConfig: queryConfig,
				success: function(loadedRecord) {
					if (loadedRecord) {
						var filterData = loadedRecord.get("SearchData");
						filterData = Terrasoft.decode(filterData, true);
						var filter = Terrasoft.QueryFilterConverter.convertByConfig(filterData);
						Ext.callback(config.success, config.scope, [filter]);
					} else {
						var exception = Terrasoft.createException("Terrasoft.ItemNotFoundException");
						Ext.callback(config.failure, config.scope, [exception]);
					}
				},
				failure: function(record, operation) {
					Ext.callback(config.failure, config.scope, [operation.getError()]);
				},
				scope: this
			});
		}
	}

	// endregion

});

Terrasoft.core.constants.FoldersDataClassName = "Terrasoft.configuration.FoldersData";


