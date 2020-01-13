Terrasoft.configuration.Structures["MobileFoldersStore"] = {innerHierarchyStack: ["MobileFoldersStore"]};
/**
 * @class Terrasoft.configuration.FoldersStore
 */
Ext.define("Terrasoft.configuration.FoldersStore", {
	extend: "Terrasoft.store.AbstractFoldersStore",

	config: {

		/**
		 * @inheritdoc
		 */
		autoSetProxy: false,

		/**
		 * @inheritdoc
		 */
		proxy: {
			type: Terrasoft.Proxies.Query
		},

		/**
		 * @cfg {String} parentId Parent Id.
		 */
		parentId: null

	},

	// region Methods: Private

	/**
	 * @private
	 */
	createParentQueryFilter: function() {
		var leftExpression = Ext.create("Terrasoft.ColumnExpression", {
			columnPath: "Parent"
		});
		var parentId = this.getParentId();
		if (Ext.isEmpty(parentId)) {
			return Ext.create("Terrasoft.QueryIsNullFilter", {
				leftExpression: leftExpression
			});
		} else {
			return Ext.create("Terrasoft.QueryCompareFilter", {
				leftExpression: leftExpression,
				rightExpression: Ext.create("Terrasoft.ParameterExpression", {
					parameter: {
						dataValueType: Terrasoft.DataValueType.Guid,
						value: parentId
					}
				})
			});
		}
	},

	/**
	 * @private
	 */
	createFolderTypeQueryFilter: function(folderTypeId) {
		return Ext.create("Terrasoft.QueryCompareFilter", {
			leftExpression: Ext.create("Terrasoft.ColumnExpression", {
				columnPath: "FolderType"
			}),
			rightExpression: Ext.create("Terrasoft.ParameterExpression", {
				parameter: {
					dataValueType: Terrasoft.DataValueType.Guid,
					value: folderTypeId
				}
			})
		});
	},

	/**
	 * @private
	 */
	createSelectQuery: function() {
		var folderModel = this.getFolderModel();
		var folderModelName = folderModel.getName();
		var nameColumn = Ext.create("Terrasoft.EntityQueryColumn", {
			columnPath: "Name",
			orderDirection: Terrasoft.OrderDirection.Asc,
			orderPosition: 0
		});
		var childrenCountColumn = this.getChildrenCountQueryColumn();
		return Ext.create("Terrasoft.SelectQuery", {
			rootSchemaName: folderModelName,
			columns: ["Id", nameColumn, "Parent.Id", "FolderType.Id", childrenCountColumn],
			filters: this.createQueryFilters()
		});
	},

	/**
	 * @private
	 */
	convertToRecord: function(row) {
		var folderModel = this.getFolderModel();
		return this.createRecord({
			Id: Terrasoft.util.genGuid(),
			FolderType: this.getFolderType(row["FolderType.Id"]),
			Name: row.Name,
			HasChildren: row.ChildrenCount > 0,
			Group: 1,
			Folder: Ext.create(folderModel, {
				Id: row.Id,
				Parent: row["Parent.Id"],
				FolderType: row["FolderType.Id"]
			})
		});
	},

	/**
	 * @private
	 */
	convertFolderFavoriteRecords: function(data) {
		var folderModel = this.getFolderModel();
		var records = [];
		for (var i = 0, ln = data.rows.length; i < ln; i++) {
			var row = data.rows[i];
			records.push(this.createRecord({
				Id: Terrasoft.util.genGuid(),
				FolderType: Terrasoft.FolderType.Favorite,
				Name: row.Name,
				HasChildren: false,
				Group: 0,
				Folder: Ext.create(folderModel, {
					Id: row.FolderId,
					FolderType: row.FolderTypeId
				})
			}));
		}
		return records;
	},

	/**
	 * @private
	 */
	getFolderType: function(folderTypeId) {
		switch (folderTypeId) {
			case Terrasoft.FolderTypeId.Static:
				return Terrasoft.FolderType.Static;
			case Terrasoft.FolderTypeId.Dynamic:
				return Terrasoft.FolderType.Dynamic;
			default:
				return null;
		}
	},

	/**
	 * @private
	 */
	getChildrenCountQueryColumn: function() {
		var folderModel = this.getFolderModel();
		var folderModelName = folderModel.getName();
		return Ext.create("Terrasoft.SubQueryColumn", {
			columnPath: "[" + folderModelName + ":Parent].Parent",
			aggregationType: Terrasoft.QueryAggregationType.Count,
			alias: "ChildrenCount"
		});
	},

	// endregion

	// region Methods: Protected

	/**
	 * @cfg-applier
	 * @protected
	 * @virtual
	 */
	applyProxy: function(config, oldConfig) {
		var selectQuery = this.createSelectQuery();
		config = Ext.mergeIf(config, {
			query: selectQuery,
			createRecordFn: function(row) {
				return this.convertToRecord(row);
			}.bind(this)});
		return this.callParent([config, oldConfig]);
	},

	/**
	 * Gets store filters by type.
	 * @protected
	 * @virtual
	 * @return {Terrasoft.QueryFilterGroup} Instance of filters group.
	 */
	createFolderTypeQueryFilters: function() {
		var dynamicTypeFilter = this.createFolderTypeQueryFilter(Terrasoft.FolderTypeId.Dynamic);
		var staticTypeFilter = this.createFolderTypeQueryFilter(Terrasoft.FolderTypeId.Static);
		return Ext.create("Terrasoft.QueryFilterGroup", {
			logicalOperation: Terrasoft.QueryLogicalOperatorType.Or,
			items: {
				dynamic: dynamicTypeFilter,
				static: staticTypeFilter
			}
		});
	},

	/**
	 * Gets store filters.
	 * @protected
	 * @virtual
	 * @return {Terrasoft.QueryFilterGroup} Instance of filters group.
	 */
	createQueryFilters: function() {
		return Ext.create("Terrasoft.QueryFilterGroup", {
			items: {
				parent: this.createParentQueryFilter(),
				type: this.createFolderTypeQueryFilters()
			}
		});
	},

	/**
	 * Gets store filters.
	 * @protected
	 * @virtual
	 * @return {Terrasoft.QueryFilterGroup} Instance of filters group.
	 */
	createFavoritesFilters: function(schemaUId) {
		var schemaFilter = Ext.create("Terrasoft.QueryCompareFilter", {
			leftExpression: Ext.create("Terrasoft.ColumnExpression", {
				columnPath: "FolderEntitySchemaUId"
			}),
			rightExpression: Ext.create("Terrasoft.ParameterExpression", {
				parameter: {
					dataValueType: Terrasoft.DataValueType.Guid,
					value: schemaUId
				}
			})
		});
		var userFilter = Ext.create("Terrasoft.QueryCompareFilter", {
			leftExpression: Ext.create("Terrasoft.ColumnExpression", {
				columnPath: "SysAdminUnit"
			}),
			rightExpression: Ext.create("Terrasoft.FunctionExpression", {
				functionType: Terrasoft.QueryFunctionType.Macros,
				macrosType: Terrasoft.QueryMacrosType.CurrentUser
			})
		});
		return Ext.create("Terrasoft.QueryFilterGroup", {
			items: {
				schemaUId: schemaFilter,
				user: userFilter
			}
		});
	},

	/**
	 * Gets select query for favorites.
	 * @protected
	 * @virtual
	 * @return {Terrasoft.SelectQuery} Select query.
	 */
	getFavoritesSelectQuery: function(schemaUId) {
		var folderModel = this.getFolderModel();
		var folderModelName = folderModel.getName();
		var folderNameColumn = Ext.create("Terrasoft.EntityQueryColumn", {
			alias: "Name",
			columnPath: "[" + folderModelName + ":Id:FolderId].Name",
			orderDirection: Terrasoft.OrderDirection.Asc,
			orderPosition: 0
		});
		var folderFolderTypeColumn = Ext.create("Terrasoft.EntityQueryColumn", {
			alias: "FolderTypeId",
			columnPath: "[" + folderModelName + ":Id:FolderId].FolderType.Id"
		});
		return Ext.create("Terrasoft.SelectQuery", {
			rootSchemaName: "FolderFavorite",
			columns: ["Id", "FolderId", folderNameColumn, folderFolderTypeColumn],
			filters: this.createFavoritesFilters(schemaUId)
		});
	},

	// endregion

	// region Methods: Public

	/**
	 * @inheritdoc
	 */
	loadFavorites: function(config, scope) {
		var folderModel = this.getFolderModel();
		Terrasoft.CFUtils.loadSysSchemaUIdByName({
			modelName: folderModel.getName(),
			cancellationId: config.cancellationId,
			success: function(schemaUId) {
				var selectQuery = this.getFavoritesSelectQuery(schemaUId);
				Terrasoft.QueryExecutor.executeSelect({
					query: selectQuery,
					isCancelable: config.isCancelable,
					cancellationId: config.cancellationId,
					success: function(data) {
						var records = this.convertFolderFavoriteRecords(data);
						Ext.callback(config.callback, scope, [records]);
					},
					failure: function(exception) {
						Ext.callback(config.callback, scope, [[], exception]);
					},
					scope: this
				});
			},
			failure: function(exception) {
				Ext.callback(config.callback, scope, [[], exception]);
			},
			scope: this
		});
	}

	// endregion

});


