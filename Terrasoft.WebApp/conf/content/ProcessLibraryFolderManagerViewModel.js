Terrasoft.configuration.Structures["ProcessLibraryFolderManagerViewModel"] = {innerHierarchyStack: ["ProcessLibraryFolderManagerViewModel"]};
define("ProcessLibraryFolderManagerViewModel", ["ProcessLibraryFolderManagerViewModelResources",
	"BaseFolderManagerViewModel"
],
function(resources) {
	return Ext.define("Terrasoft.ProcessLibraryFolderManagerViewModel", {
		extend: "Terrasoft.BaseFolderManagerViewModel",

		/**
		 * @private
		 */
		_customFoldersConfig: null,

		/**
		 * @private
		 */
		_getProcessStartEventFilter: function(config) {
			var schemaUId = config.schemaUId;
			var modificationCode = config.modificationCode;
			var filterGroup = Terrasoft.createFilterGroup();
			filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
			if (Ext.isEmpty(schemaUId)) {
				filterGroup.addItem(
					Terrasoft.createExistsFilter("[SysEntityPrcStartEvent:ProcessSchema:SysSchemaId].Id"));
			} else {
				filterGroup.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"[SysEntityPrcStartEvent:ProcessSchema:SysSchemaId].EntitySchemaUId", schemaUId));
			}
			if (!Ext.isEmpty(modificationCode)) {
				filterGroup.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"[SysEntityPrcStartEvent:ProcessSchema:SysSchemaId].RecordChangeType", modificationCode));
			}
			return filterGroup;
		},

		/**
		 * @private
		 */
		_getProcessStartTimerFilter: function(config) {
			var expressionType = config.expressionType;
			var filterGroup = Terrasoft.createFilterGroup();
			filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
			filterGroup.addItem(
				Terrasoft.createExistsFilter("[SysStartTimerInProcess:ProcessUId:UId].Id"));
			if (!Ext.isEmpty(expressionType)) {
				filterGroup.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"[SysStartTimerInProcess:ProcessUId:UId].ExpressionType", expressionType));
			}
			return filterGroup;
		},

		/**
		 * @private
		 */
		_getStartEventFolderImageId: function() {
			return "47453438-417b-41dd-8ccd-3be3709f14be";
		},

		/**
		 * @private
		 */
		_getStartTimerFolderImageId: function() {
			return "b1a056e3-4935-4bae-a944-6bc21b3f9763";
		},

		/**
		 * @private
		 */
		_initProcessStartEventGroups: function (children) {
			var processStartEventRootFolder = {
				id: Terrasoft.generateGUID(),
				imageId: this._getStartEventFolderImageId(),
				caption: resources.localizableStrings.ProcessStartEventFolderCaption,
				filter: "ProcessStartEventFilter",
				children: []
			};
			children.forEach(function(child) {
				var subChildren = [];
				processStartEventRootFolder.children.push({
					id: Terrasoft.generateGUID(),
					caption: child.Name,
					schemaUId: child.SchemaUId,
					filter: "ProcessStartEventFilter",
					children: subChildren
				});
				child.ModificationTypes.forEach(function(changeGroup) {
					subChildren.push({
						id: Terrasoft.generateGUID(),
						schemaUId: child.SchemaUId,
						caption: changeGroup.caption,
						filter: "ProcessStartEventFilter",
						modificationCode: changeGroup.modificationCode
					});
				}, this);
			});
			this._customFoldersConfig.processStartEventRootFolder = processStartEventRootFolder;
		},

		/**
		 * @private
		 */
		_getLoadProcessStartEventGroupsQuery: function() {
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "SysEntityPrcStartEvent",
				isDistinct: true
			});
			esq.addColumn("[SysSchema:UId:EntitySchemaUId].UId", "SchemaUId");
			esq.addColumn("[SysSchema:UId:EntitySchemaUId].Caption", "SchemaCaption");
			esq.addColumn("[SysEntityChangeType:EnumCode:RecordChangeType].Name", "ChangeTypeCaption");
			esq.addColumn("[SysEntityChangeType:EnumCode:RecordChangeType].EnumCode", "ChangeTypeCode");
			var filterGroup = Terrasoft.createFilterGroup();
			filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
			filterGroup.add(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
				"[VwProcessLib:SysSchemaId:ProcessSchemaId].IsActiveVersion", 1));
			esq.filters = filterGroup;
			return esq;
		},

		/**
		 * @private
		 */
		_getLoadTimerStartEventGroupsQuery: function() {
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "SysStartTimerInProcess",
				isDistinct: true
			});
			esq.addColumn("[SysStartTimerType:Code:ExpressionType].Name", "ExpressionTypeCaption");
			esq.addColumn("[SysStartTimerType:Code:ExpressionType].Code", "ExpressionTypeCode");
			var filterGroup = Terrasoft.createFilterGroup();
			filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
			filterGroup.add(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
				"[VwProcessLib:UId:ProcessUId].IsActiveVersion", 1));
			esq.filters = filterGroup;
			return esq;
		},

		/**
		 * @private
		 */
		_handleProcessStartEventGroupsResult: function(queryResults) {
			var queryResult = this.getLoadQueryResult(queryResults, ["SchemaUId", "SchemaCaption", "ChangeTypeCaption",
				"ChangeTypeCode"]);
			var rows = queryResult.rows;
			var result = rows.filter(function(row) {
				return !Ext.isEmpty(row.SchemaCaption);
			}, this);
			result = _.sortBy(result, function(i) {
				return i.SchemaCaption;
			}, this);
			result = result.map(function(item) {
				return {
					Name: item.SchemaCaption,
					SchemaUId: item.SchemaUId,
					ModificationTypes: [{
						caption: item.ChangeTypeCaption,
						modificationCode: item.ChangeTypeCode
					}]
				};
			});
			result = Terrasoft.mergeSame(result,
				function(firstItem, secondItem) {
					return firstItem.SchemaUId === secondItem.SchemaUId;
				},
				function (firstItem, secondItem) {
					var group = Terrasoft.first(secondItem.ModificationTypes);
					firstItem.ModificationTypes.push({
						caption: group.caption,
						modificationCode: group.modificationCode
					});
				},
				this
			);
			this._initProcessStartEventGroups(result);
		},

		/**
		 * @private
		 */
		_handleProcessStartTimerGroupsResult: function(queryResults) {
			var queryResult = this.getLoadQueryResult(queryResults, ["ExpressionTypeCaption", "ExpressionTypeCode"]);
			var rows = queryResult.rows;
			var processStartTimerRootFolder = {
				id: Terrasoft.generateGUID(),
				imageId: this._getStartTimerFolderImageId(),
				caption: resources.localizableStrings.ProcessStartTimerFolderCaption,
				filter: "ProcessStartTimerFilter",
				children: []
			};
			rows.forEach(function(child) {
				processStartTimerRootFolder.children.push({
					id: Terrasoft.generateGUID(),
					caption: child.ExpressionTypeCaption,
					filter: "ProcessStartTimerFilter",
					expressionType: parseInt(child.ExpressionTypeCode, 10)
				});
			});
			processStartTimerRootFolder.children = _.sortBy(processStartTimerRootFolder.children, function(i) {
				return i.expressionType;
			}, this);
			this._customFoldersConfig.processStartTimerRootFolder = processStartTimerRootFolder;
		},

		/**
		 * @private
		 */
		_isExistingId: function(rowId) {
			var gridData = this.get("gridData");
			return gridData.contains(rowId);
		},

		/**
		 * @private
		 */
		_getFilterConfig: function(folderConfig) {
			var result;
			switch (folderConfig.filter) {
				case "ProcessStartEventFilter":
					result = this._getProcessStartEventFilter(folderConfig);
					break;
				case "ProcessStartTimerFilter":
					result = this._getProcessStartTimerFilter(folderConfig);
					break;
				default:
					result = Terrasoft.createFilterGroup();
					break;
			}
			return result;
		},

		/**
		 * Shows selected folder info.
		 * @protected
		 * @override
		 * @param {String} rowId Selected folder.
		 */
		showFolderInfo: function(rowId) {
			if (this._isExistingId(rowId)) {
				this.callParent(arguments);
			}
		},

		/**
		 * Returns new folder parent id.
		 * @protected
		 * @override
		 * @returns {String} New folder parent id.
		 */
		getNewFolderParentId: function() {
			var result = null;
			var activeRow = this.get("activeRow");
			if (this._isExistingId(activeRow) && !this.isCustomFolder(activeRow)) {
				result = this.callParent(arguments);
			}
			return result;
		},

		/**
		 * Shows custom folder info.
		 * @override
		 * @protected
		 * @param {String} rowId Row id.
		 */
		showCustomFolderInfo: function(rowId) {
			var folderConfig = this.findCustomFolderConfig(rowId);
			var filtersGroup = this._getFilterConfig(folderConfig);
			var serializationInfo = filtersGroup.getDefSerializationInfo();
			serializationInfo.serializeFilterManagerInfo = true;
			var folderViewModel = this.get("gridData").get(rowId);
			var resultFiltersObject = {
				value: folderViewModel.get("Id"),
				displayValue: folderViewModel.get("Name"),
				filter: filtersGroup.serialize(serializationInfo),
				folder: folderViewModel,
				folderType: folderViewModel.get("FolderType"),
				sectionEntitySchemaName: this._sectionEntitySchema.name
			};
			this.sandbox.publish("ResultFolderFilter", resultFiltersObject, [this.sandbox.id]);
		},

		closeFolderManager: function() {
			var rowId = this.getActiveRow();
			this.callParent(arguments);
			if (this.isCustomFolder(rowId)) {
				this.showCustomFolderInfo(rowId);
			}
		},

		/**
		 * Shows custom folder info.
		 * @override
		 * @protected
		 * @param {String} queryResults Load batch query result.
		 */
		handleLoadBatchResult: function(queryResults) {
			this._customFoldersConfig = {};
			this._handleProcessStartEventGroupsResult(queryResults);
			this._handleProcessStartTimerGroupsResult(queryResults);
		},

		/**
		 * Returns batch query for loading folder manager content.
		 * @override
		 * @protected
		 * @returns {Terrasoft.BatchQuery} Folder manager view model load batch query.
		 */
		getLoadBatchQuery: function() {
			var batch = this.callParent(arguments);
			batch.add(this._getLoadProcessStartEventGroupsQuery());
			batch.add(this._getLoadTimerStartEventGroupsQuery());
			return batch;
		},

		/**
		 * Returns config for custom folders.
		 * @override
		 * @protected
		 * @param {Object} Custom folders config.
		 */
		getCustomFoldersConfig: function() {
			return this._customFoldersConfig;
		}
	});
});


