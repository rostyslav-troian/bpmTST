Terrasoft.configuration.Structures["TranslationSection"] = {innerHierarchyStack: ["TranslationSection"], structureParent: "BaseSectionV2"};
define('TranslationSectionStructure', ['TranslationSectionResources'], function(resources) {return {schemaUId:'4c58cb1b-b98e-4b2d-b856-9b1413b5326b',schemaCaption: "TranslationSection", parentSchemaName: "BaseSectionV2", schemaName:'TranslationSection',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("TranslationSection", ["terrasoft", "ConfigurationGrid", "ConfigurationGridGenerator",
	"ConfigurationGridUtilities", "css!TranslationCSS", "UntranslatedFilterViewModel",
	"ConfigurationServiceRequest"], function(Terrasoft) {
	return {
		entitySchemaName: "SysTranslation",
		messages: {
			/**
			 * @message GetModuleInfo
			 * Used to provide information for Terrasoft.ModalBoxSchemaModule about modal window.
			 */
			"GetModuleInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetOrderedGridColumns
			 * Returns paths of visible in section grid columns in their display order.
			 */
			"GetOrderedGridColumns": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message UpdateRecordInfo
			 * Updates active translation row after changes had been made through translation modal window.
			 */
			"UpdateRecordInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetRowPositionDetails
			 * Sends previous and next objects ids and canLoadMore flag to be used for navigation in modal window.
			 */
			"GetRowPositionDetails": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message ModalBoxClosing
			 * Fires when modal box is closing.
			 */
			"ModalBoxClosing": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GridDataUpdated
			 * Fires after loading more data to the grid.
			 */
			"GridDataUpdated": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			GetPredefinedFilters: {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetExtendedFilterConfig
			 * Extended filters settings message.
			 */
			"GetExtendedFilterConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		properties: {
			languageColumnName: "Language",
			languageColumnSuffix: "Short"
		},
		attributes: {
			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#IsEditable
			 * @overridden
			 */
			IsEditable: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},

			/**
			 * ViewButton visibility attribute.
			 */
			ViewOptionsButtonTipVisible: {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Contains primary column value of selected translation row.
			 */
			ModalBoxActiveRow: {
				dataValueType: Terrasoft.DataValueType.GUID,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#SecurityOperationName
			 * @overridden
			 */
			SecurityOperationName: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				value: "CanManageTranslationSection"
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#UseFolderFilter
			 * @overridden
			 */
			UseFolderFilter: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: true
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#UseStaticFolders
			 * @overridden
			 */
			"UseStaticFolders": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: true
			},

			/**
			 * Translation actualized.
			 */
			TranslationActualized: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Translation actualization is in progress.
			 */
			ActualizationInProgress: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		},
		mixins: {
			ConfigurationGridUtilities: "Terrasoft.ConfigurationGridUtilities"
		},
		methods: {

			//region Methods: Private

			/**
			 * @private
			 */
			_getFilterLanguageShortColumnPath: function(filter) {
				var languageColumns = this.getTranslationColumns();
				var entityColumns = this.entitySchema.columns;
				var columnPath = filter.leftExpression.columnPath;
				if (this.isNotEmpty(languageColumns[columnPath])) {
					var shortColumnPath = columnPath + this.languageColumnSuffix;
					return entityColumns.hasOwnProperty(shortColumnPath) ? shortColumnPath : columnPath;
				} else {
					return columnPath;
				}
			},

			/**
			 * @private
			 */
			_processLanguageFilter: function(filter) {
				var filterType = filter.filterType;
				if (filterType === Terrasoft.FilterType.FILTER_GROUP) {
					filter.each(function(item) {
						this._processLanguageFilter(item);
					}, this);
				} else if (filterType === Terrasoft.FilterType.COMPARE || filterType === Terrasoft.FilterType.IS_NULL) {
					filter.leftExpression.columnPath = this._getFilterLanguageShortColumnPath(filter);
				} else {
					this.log("Not implemented");
				}
			},

			/**
			 * @private
			 */
			_processFolderFilters: function(filters) {
				var folderFilters = filters.find("FolderFilters");
				if (folderFilters) {
					this._processLanguageFilter(folderFilters);
				}
			},

			/**
			 * @private
			 */
			_processCustomFilters: function(filters) {
				var customFilters = filters.find("CustomFilters");
				if (customFilters) {
					this._processLanguageFilter(customFilters);
				}
			},

			/**
			 * Returns page configuration.
			 * @private
			 * @return {Object} Configuration object.
			 * @return {String} return.schemaName Schema name.
			 * @return {String} return.recordId Modal box active row id.
			 * @return {Object} return.modalBoxConfig Modal window configuration object.
			 * @return {String} return.modalBoxConfig.minWidth Minimal initial window width (percentage).
			 * @return {Array} return.modalBoxConfig.boxClasses CSS classes to be attached to the modal window.
			 */
			getPageConfig: function() {
				var activeRowId = this.get("ModalBoxActiveRow");
				if (activeRowId) {
					return {
						schemaName: "TranslationPage",
						recordId: activeRowId,
						modalBoxConfig: {
							minWidth: "45",
							boxClasses: ["translation-modal-box"]
						}
					};
				}
			},

			/**
			 * Returns an index counted from the end of grid array which points to the row that will trigger
			 * more data loading (if set as active).
			 * Should be any reasonable value between zero(including) and expected grid data array length.
			 * @private
			 * @return {Number}
			 */
			getPreloadOffset: function() {
				return 3;
			},

			/**
			 * Returns visible in grid columns sorted by its display order.
			 * @private
			 * @return {Array}
			 */
			getOrderedGridColumns: function() {
				var columns = this.getProfileColumns();
				var columnPaths = [];
				this.Terrasoft.each(columns, function(column) {
					columnPaths.push(column.path);
				}, this);
				return columnPaths;
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#onGetFiltersCollection
			 * @override
			 */
			onGetFiltersCollection: function() {
				var result = this.mixins.GridUtilities.onGetFiltersCollection.call(this);
				this.processLanguageColumnFilters(result);
				return result;
			},

			/**
			 * Refreshes record edited in modal window.
			 * @param {Object} updates Object containing data to find and update edited row.
			 * @param {Object} updates.recordId Id of the row that has to be updated.
			 * @param {Object} updates.changedColumnValues Columns to be replaced.
			 * @private
			 */
			onRecordChanged: function(updates) {
				updates = updates || {};
				if (!updates.recordId) {
					throw new Terrasoft.exceptions.ItemNotFoundException();
				}
				var rowId = updates.recordId;
				var gridData = this.getGridData();
				var row = gridData.get(rowId);
				this.Terrasoft.each(updates.changedColumnValues, function(value, columnName) {
					row.set(columnName, value);
				});
				row.changedValues = null;
			},

			/**
			 * Moves focus to the row last shown in the modal box (Makes it active).
			 * @param {Object} closingParameters Object, containing parameters set on modalbox closing.
			 * @param {String} closingParameters.recordId Id of the row last edited in modalbox (to set active).
			 * @private
			 */
			onModalBoxClosing: function(closingParameters) {
				closingParameters = closingParameters || {};
				if (closingParameters.recordId) {
					this.setActiveRow(closingParameters.recordId);
				}
			},

			/**
			 * Constructs an object for GetRowPositionDetails message, calls tryLoadGridData method.
			 * @param {String} rowId Id of the row to create details object for.
			 * @return {Object} Object containing information about surrounding rows and grid status.
			 * @return {String} return.previousId Id of the previous row in the grid.
			 * @return {String} return.nextId Id of the next row in the grid.
			 * @return {Boolean} return.canLoadMore Flag showing if more data could be loaded to the grid.
			 * @private
			 */
			getRowPositionDetails: function(rowId) {
				var keysArray = this.getGridData().getKeys();
				var currentRowIndex = keysArray.indexOf(rowId);
				var canLoadMoreData = this.get("CanLoadMoreData");
				this.tryLoadGridData(currentRowIndex, keysArray.length, canLoadMoreData);
				var rowPositionDetails = {
					previousId: keysArray[currentRowIndex - 1],
					nextId: keysArray[currentRowIndex + 1],
					canLoadMore: canLoadMoreData
				};
				return rowPositionDetails;
			},

			/**
			 * If the row has specific index in the grid array defined to trigger loading more data to the grid
			 * and more data can be loaded, calls a method to load more data. Will not start loading if previous
			 * request is still in progress.
			 * @param {Number} currentRowIndex Position of the current row in the grid.
			 * @param {Number} arrayLength Number of elements that are now in the grid.
			 * @param {Boolean} canLoadMore Flag showing if more data could be loaded to the grid.
			 * @private
			 */
			tryLoadGridData: function(currentRowIndex, arrayLength, canLoadMore) {
				var preloadOffset = this.getPreloadOffset();
				var isGridLoading = this.get("IsGridLoading");
				var needToLoad = (currentRowIndex + 1 + preloadOffset) === arrayLength;
				if (needToLoad && canLoadMore && !isGridLoading) {
					this.loadGridData();
				}
			},

			/**
			 * Activates column.
			 * @private
			 * @param {Object} column Column.
			 */
			activateColumn: function(column) {
				column.usageType = this.Terrasoft.EntitySchemaColumnUsageType.General;
			},

			/**
			 * Changes "SysTranslation" schema columns properties.
			 * @private
			 * @param {Object} cultures Existing cultures.
			 */
			changeSysTranslationColumnsProperties: function(cultures) {
				cultures.each(function(culture) {
					this.setSysTranslationColumnsProperties(culture);
				}, this);
			},

			/**
			 * Returns language columns by language index.
			 * @private
			 * @param {Number} index Language index.
			 * @return {Object} Language columns.
			 * @return {Object} return.language Language column.
			 * @return {Object} return.verified Verified column.
			 */
			getLanguageColumnsByIndex: function(index) {
				var entitySchema = this.entitySchema;
				var columns = entitySchema.columns;
				var languageColumn = columns[this.getLanguageColumnName(index)];
				var verifiedColumn = columns[this.getVerifiedColumnName(index)];
				if (!languageColumn || !verifiedColumn) {
					throw new Terrasoft.UnknownException();
				}
				return {
					language: languageColumn,
					verified: verifiedColumn
				};
			},

			/**
			 * Returns cultures.
			 * @private
			 * @param {Function} callback Callback.
			 * @param {Object} scope Callback execution scope.
			 */
			getCultures: function(callback, scope) {
				var esq = this.getSysCultureQuery();
				this.initSysCultureQueryColumns(esq);
				esq.getEntityCollection(function(response) {
					callback.call(scope, response.collection);
				}, this);
			},

			/**
			 * Returns "Language" column name.
			 * @private
			 * @param {Number} index Language index.
			 * @return {String} Language column name.
			 */
			getLanguageColumnName: function(index) {
				var languageColumnName = this.languageColumnName;
				return languageColumnName + index;
			},

			/**
			 * Returns "SysCulture" entitySchemaQuery.
			 * @private
			 * @return {Terrasoft.EntitySchemaQuery} "SysCulture" entitySchemaQuery.
			 */
			getSysCultureQuery: function() {
				return this.Ext.create(Terrasoft.EntitySchemaQuery, {
					rootSchemaName: "SysCulture"
				});
			},

			/**
			 * Returns "Verified" column name.
			 * @private
			 * @param {Number} index Language index.
			 * @return {String} Language column name.
			 */
			getVerifiedColumnName: function(index) {
				var verifiedColumnName = "IsVerified";
				return verifiedColumnName + index;
			},

			/**
			 * Gets culture info.
			 * @private
			 * @param {String} cultureId Culture identifier.
			 * @param {Function} callback Callback.
			 * @param {Object} scope Callback execution scope.
			 */
			getCultureInfo: function(cultureId, callback, scope) {
				var esq = this.getSysCultureQuery();
				this.initSysCultureQueryColumns(esq);
				this.initSysCulturePrimaryColumnFilter(esq, cultureId);
				esq.getEntityCollection(function(response) {
					var culture = this.onCultureInfoLoaded(response);
					callback.call(scope, culture);
				}, this);
			},

			/**
			 * Initializes "SysTranslation" schema columns properties.
			 * @private
			 * @param {Function} callback Callback.
			 * @param {Object} scope Callback execution scope.
			 */
			initSysTranslationColumnsProperties: function(callback, scope) {
				this.initPrimaryCulture(function() {
					this.getCultures(function(cultures) {
						this.changeSysTranslationColumnsProperties(cultures);
						callback.call(scope);
					}, this);
				}, this);
			},

			/**
			 * Initializes primary culture.
			 * @private
			 * @param {Function} callback Callback.
			 * @param {Object} scope Callback execution scope.
			 */
			initPrimaryCulture: function(callback, scope) {
				this.Terrasoft.SysSettings.querySysSettingsItem("PrimaryCulture", function(primaryCulture) {
					this.getCultureInfo(primaryCulture.value, function(cultureInfo) {
						this.set("PrimaryCulture", cultureInfo);
						callback.call(scope);
					}, this);
				}, this);
			},

			/**
			 * Sets "SysTranslation" schema columns properties.
			 * @private
			 * @param {Object} culture Culture.
			 */
			setSysTranslationColumnsProperties: function(culture) {
				var index = culture.get("Index");
				var code = culture.get("Name");
				var language = culture.get("Language");
				var languageName = language && language.displayValue;
				var primaryCulture = this.get("PrimaryCulture");
				var columns = this.getLanguageColumnsByIndex(index);
				var languageColumn = columns.language;
				languageColumn.caption = languageName;
				this.activateColumn(languageColumn);
				if (primaryCulture.get("Index") === index) {
					languageColumn.caption = languageName + " - " + this.get("Resources.Strings.DefaultCaption");
					this.set("DefaultLanguageColumnName", languageColumn.columnPath);
				}
				var verifiedColumn = columns.verified;
				var verifiedColumnCaptionTpl = "{0} ({1})";
				this.activateColumn(verifiedColumn);
				var verifiedColumnCaption = this.get("Resources.Strings.VerifiedColumnCaption");
				verifiedColumn.caption = this.Ext.String.format(verifiedColumnCaptionTpl, verifiedColumnCaption, code);
			},

			/**
			 * Loads translation edit modal window.
			 * @param {String} primaryColumnValue Active row primary column value.
			 * @private
			 */
			openTranslationWindow: function(primaryColumnValue) {
				this.set("ModalBoxActiveRow", primaryColumnValue);
				this.sandbox.loadModule("ModalBoxSchemaModule", {
					id: this.getModalBoxWindowId()
				});
			},

			/**
			 * Exports translation.
			 * @private
			 */
			exportTranslation: function() {
				// TODO: CRM-18829
			},

			/**
			 * Imports translation.
			 * @private
			 */
			importTranslation: function() {
				// TODO: CRM-19404
			},

			/**
			 * Gets predefined filters module identifier.
			 * @private
			 * @return {String}
			 */
			getPredefinedFiltersModuleId: function() {
				return this.sandbox.id + "_PredefinedFiltersModule";
			},

			/**
			 * Get predefined filters.
			 * @private
			 * @return {Object}
			 */
			getPredefinedFilters: function() {
				return [
					{
						className: "Terrasoft.UntranslatedFilter",
						key: "Untranslated",
						caption: this.get("Resources.Strings.UntranslatedRecordsFilter"),
						imageConfig: this.get("Resources.Images.UntranslatedRecordsFilterImage"),
						columns: this.getTranslationColumns(),
						comparisonType: Terrasoft.ComparisonType.IS_NULL,
						primaryColumnPath: this.get("DefaultLanguageColumnName")
					}
				];
			},

			/**
			 * Gets translation columns.
			 * @private
			 * @return {Object}
			 */
			getTranslationColumns: function() {
				var translationColumns = {};
				this.Terrasoft.each(this.entitySchema.columns, function(column) {
					var columnName = column.name;
					var isTranslationColumn = (columnName.indexOf(this.languageColumnName) === 0);
					var isGeneralUsageTypeColumn = (column.usageType === Terrasoft.EntitySchemaColumnUsageType.General);
					if (isTranslationColumn && isGeneralUsageTypeColumn) {
						translationColumns[columnName] = column;
					}
				}, this);
				return translationColumns;
			},

			/**
			 * Checks if translations can be applied.
			 * @private
			 * @param {Function} [callback] Callback.
			 * @param {Object} [scope] Callback execution scope.
			 */
			checkTranslation: function(callback, scope) {
				var request = this.createTranslationServiceRequest("CheckTranslation");
				request.execute(function(response) {
					if (callback) {
						callback.call(scope || this, response);
					}
				}, this);
			},

			/**
			 * Creates translation service request.
			 * @private
			 * @param {String} contractName Contract name.
			 * @return {Terrasoft.ConfigurationServiceRequest}
			 */
			createTranslationServiceRequest: function(contractName) {
				return this.Ext.create(Terrasoft.ConfigurationServiceRequest, {
					serviceName: "TranslationService",
					contractName: contractName
				});
			},

			/**
			 * Applies translations.
			 * @private
			 * @param {Function} [callback] Callback.
			 * @param {Object} [scope] Callback execution scope.
			 */
			applyTranslation: function(callback, scope) {
				var translationApplyingMessage = this.get("Resources.Strings.TranslationApplying");
				this.showBodyMask({caption: translationApplyingMessage});
				var request = this.createTranslationServiceRequest("ApplyTranslation");
				request.execute(function(translationApplyingResponse) {
					var applyingResult = this.processTranslationServiceResponse(translationApplyingResponse);
					if (!applyingResult) {
						this.hideBodyMask();
						return;
					}
					this.checkTranslation(function() {
						this.hideBodyMask();
						this.processTranslationApplyingLog(translationApplyingResponse.operationLog);
						Ext.callback(callback, scope || this, [translationApplyingResponse]);
					}, this);
				}, this);
			},

			/**
			 * Processes translation service response.
			 * @private
			 * @param {Terrasoft.core.BaseResponse} response Response.
			 * @return {Boolean}
			 */
			processTranslationServiceResponse: function(response) {
				if (!response.success) {
					this.showInformationDialog(response.errorInfo.message);
				}
				return response.success;
			},

			/**
			 * Processes translation applying log.
			 * @private
			 * @param {Array} operationLog Log elements.
			 */
			processTranslationApplyingLog: function(operationLog) {
				if (!operationLog.length) {
					var successMessage = this.get("Resources.Strings.TranslationApplyingSuccess");
					this.showInformationDialog(successMessage);
					return;
				}
				var errorMessage = this.get("Resources.Strings.TranslationApplyingError");
				this.showInformationDialog(errorMessage);
				operationLog.forEach(function(logItem) {
					this.log(logItem);
				}, this);
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#getGridRowViewModelClassName
			 * @overridden
			 * @protected
			 */
			getGridRowViewModelClassName: function() {
				return this.mixins.GridUtilities.getGridRowViewModelClassName.apply(this, arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#getModuleCaption
			 * @overridden
			 * @protected
			 */
			getModuleCaption: function() {
				return this.get("Resources.Strings.SectionCaption");
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#getSectionActions
			 * @protected
			 * @overridden
			 */
			getSectionActions: function() {
				var actionMenuItems = this.Ext.create(Terrasoft.BaseViewModelCollection);
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Click": {"bindTo": "actualizeTranslation"},
					"Caption": {"bindTo": "Resources.Strings.ActualizeTranslation"}
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": {"bindTo": "Resources.Strings.SelectMultipleRecordsButtonCaption"},
					"Click": {"bindTo": "setMultiSelect"},
					"Visible": {"bindTo": "isMultiSelectVisible"}
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": {"bindTo": "Resources.Strings.SelectOneRecordButtonCaption"},
					"Click": {"bindTo": "unSetMultiSelect"},
					"Visible": {"bindTo": "isSingleSelectVisible"},
					"IsEnabledForSelectedAll": true
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": {"bindTo": "Resources.Strings.IncludeInFolderButtonCaption"},
					"Click": {"bindTo": "openStaticGroupLookup"},
					"Enabled": {"bindTo": "isAnySelected"},
					"Visible": {"bindTo": "UseStaticFolders"}
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": {"bindTo": "Resources.Strings.ExcludeFromFolderButtonCaption"},
					"Click": {"bindTo": "excludeFromFolder"},
					"Enabled": {"bindTo": "isAnySelected"},
					"Visible": {"bindTo": "UseStaticFolders"}
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Click": {"bindTo": "exportTranslation"},
					"Caption": {"bindTo": "Resources.Strings.ExportCaption"},
					"Tag": "Export",
					"Visible": false
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Click": {"bindTo": "importTranslation"},
					"Caption": {"bindTo": "Resources.Strings.ImportCaption"},
					"Tag": "Import",
					"Visible": false
				}));
				var exportToFileMenuItem = this.getExportToFileMenuItem();
				actionMenuItems.addItem(exportToFileMenuItem);
				var exportToExcelMenuItem = this.getExportToExcelFileMenuItem();
				actionMenuItems.addItem(exportToExcelMenuItem);
				return actionMenuItems;
			},

			/**
			 * Initializes entity schema query columns.
			 * @protected
			 * @virtual
			 * @param {Object} esq Entity schema query
			 */
			initSysCultureQueryColumns: function(esq) {
				esq.addColumn("Name");
				esq.addColumn("Active");
				esq.addColumn("Index");
				esq.addColumn("Language");
			},

			/**
			 * Initializes entity schema query filters.
			 * @protected
			 * @virtual
			 * @param {Object} esq Entity schema query
			 * @param {String} cultureId Culture identifier.
			 */
			initSysCulturePrimaryColumnFilter: function(esq, cultureId) {
				esq.filters.add("primaryColumnFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Id", cultureId));
			},

			/**
			 * @inheritdoc Terrasoft.ConfigurationGridUtilities#initActiveRowKeyMap
			 * @overridden
			 * @protected
			 */
			initActiveRowKeyMap: function(keyMap) {
				this.mixins.ConfigurationGridUtilities.initActiveRowKeyMap.apply(this, arguments);
				keyMap.push({
					key: Ext.EventObject.S,
					ctrl: true,
					defaultEventAction: "preventDefault",
					fn: this.onCtrlSKeyPressed,
					scope: this
				});
			},

			/**
			 * Handles Ctrl + S combination press.
			 * @protected
			 * @virtual
			 * @param {Number} keyCode Key code.
			 * @param {Object} event Event.
			 */
			onCtrlSKeyPressed: function(keyCode, event) {
				event.preventDefault();
				this.onCtrlEnterKeyPressed();
			},

			/**
			 * Returns culture.
			 * @protected
			 * @param {Object} response Server response.
			 * @return {Object} Culture info.
			 */
			onCultureInfoLoaded: function(response) {
				var cultures = response.collection;
				return cultures.getByIndex(0);
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#loadGridData
			 * @override
			 */
			loadGridData: function() {
				if (this.get("TranslationActualized") && !this.get("ActualizationInProgress")) {
					this.callParent(arguments);
				} else {
					this.set("TranslationActualized", false);
					this.actualizeTranslation(function() {
						this.set("TranslationActualized", true);
						this.loadGridData();
					}, this);
				}
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#initQueryFilters
			 * @override
			 */
			initQueryFilters: function(esq) {
				this.callParent(arguments);
				var filters = esq.filters.first();
				if (!filters) {
					return;
				}
				this.processLanguageColumnFilters(filters);
			},

			/**
			 * @protected
			 * @param {Terrasoft.FilterGroup} filters Group of filters to be processed.
			 */
			processLanguageColumnFilters: function(filters) {
				this._processFolderFilters(filters);
				this._processCustomFilters(filters);
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilters
			 * @override
			 */
			getFilters: function() {
				var createFilter = Terrasoft.createColumnFilterWithParameter;
				var notEndWith = Terrasoft.ComparisonType.NOT_END_WITH;
				var endWith = Terrasoft.ComparisonType.END_WITH;
				var notContain = Terrasoft.ComparisonType.NOT_CONTAIN;
				var key = "Key";
				var filters = this.callParent(arguments);
				filters.addItem(createFilter(notEndWith, key, ".EntityFilters.Value"));
				filters.addItem(createFilter(notEndWith, key, ".DataSourceFilters.Value"));
				var baseElementFilter = this.Ext.create("Terrasoft.FilterGroup");
				baseElementFilter.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
				baseElementFilter.addItem(createFilter(notContain, key, "BaseElements."));
				baseElementFilter.addItem(createFilter(endWith, key, ".Caption"));
				baseElementFilter.addItem(createFilter(endWith, key, ".Recommendation.Value"));
				baseElementFilter.addItem(createFilter(endWith, key, ".Parameters.%.Value"));
				filters.addItem(baseElementFilter);
				var processSchemaFilter = this.Ext.create("Terrasoft.FilterGroup");
				processSchemaFilter.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
				processSchemaFilter.addItem(createFilter(notEndWith, key, ".Caption"));
				var processSchemaSubFilter = this.Ext.create("Terrasoft.FilterGroup");
				processSchemaSubFilter.addItem(createFilter(notContain, key, "EventsProcessSchema.BaseElements."));
				processSchemaSubFilter.addItem(createFilter(notContain, key, "EventsProcessSchema.Parameters."));
				processSchemaSubFilter.addItem(createFilter(notContain, key, "EventsProcessSchema.LaneSets."));
				processSchemaSubFilter.addItem(createFilter(notContain, key, "EventsProcessSchema.Methods."));
				processSchemaFilter.addItem(processSchemaSubFilter);
				filters.addItem(processSchemaFilter);
				filters.addItem(createFilter(notEndWith, key, ".Parameters.EntityColumnMetaPathes.Value"));
				filters.addItem(createFilter(notEndWith, key, ".Parameters.%.DisplayValue"));
				return filters;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#loadFiltersModule
			 * @override
			 */
			loadFiltersModule: function() {
				this.callParent(arguments);
				this.sandbox.loadModule("PredefinedFiltersModule", {
					renderTo: "PredefinedFiltersContainer",
					id: this.getPredefinedFiltersModuleId()
				});
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilterModulesIds
			 * @override
			 */
			getFilterModulesIds: function() {
				var ids = this.callParent(arguments);
				ids.push(this.getPredefinedFiltersModuleId());
				return ids;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#subscribeFilterGetConfigMessages
			 * @override
			 */
			subscribeFilterGetConfigMessages: function() {
				this.callParent(arguments);
				var predefinedFiltersModuleId = this.getPredefinedFiltersModuleId();
				this.sandbox.subscribe("GetPredefinedFilters", this.getPredefinedFilters, this,
						[predefinedFiltersModuleId]);
			},

			/**
			 * Gets extended filter configuration.
			 * @protected
			 */
			onGetExtendedFilterConfig: function() {
				return {
					isFoldersHidden: true,
					hasExtendedMode: true
				};
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#subscribeSandboxEvents
			 * @override
			 */
			subscribeSandboxEvents: function() {
				this.callParent(arguments);
				var quickFilterModuleId = this.getQuickFilterModuleId();
				this.sandbox.subscribe("GetExtendedFilterConfig", this.onGetExtendedFilterConfig,
						this, [quickFilterModuleId]);
				this.subscribeModalBoxEvents();
			},

			/**
			 * Returns sandbox id for modal window.
			 * @protected
			 * @return {String} Sandbox id for modal window.
			 */
			getModalBoxWindowId: function() {
				return this.sandbox.id + "_TranslationEditModalBox";
			},

			/**
			 * Initializes subscription on messages used to communicate with modal window.
			 * @protected
			 */
			subscribeModalBoxEvents: function() {
				this.sandbox.subscribe("GetModuleInfo", this.getPageConfig, this, [this.getModalBoxWindowId()]);
				this.sandbox.subscribe("GetOrderedGridColumns", this.getOrderedGridColumns, this,
						[this.getModalBoxWindowId()]);
				this.sandbox.subscribe("UpdateRecordInfo", this.onRecordChanged, this,
						[this.getModalBoxWindowId()]);
				this.sandbox.subscribe("GetRowPositionDetails", this.getRowPositionDetails, this,
						[this.getModalBoxWindowId()]);
				this.sandbox.subscribe("ModalBoxClosing", this.onModalBoxClosing, this,
						[this.getModalBoxWindowId()]);
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#afterLoadGridData
			 * @protected
			 * @override
			 */
			afterLoadGridData: function() {
				this.callParent(arguments);
				this.showViewButtonHint();
				this.sandbox.publish("GridDataUpdated", null, [this.getModalBoxWindowId()]);
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.initSysTranslationColumnsProperties(callback, scope);
				}, this]);
				Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, this.handleServerChannelMessage, this);
			},

			/**
			 * Channel message event handler.
			 * @param {Object} channel Channel.
			 * @param {Object} message Channel message.
			 */
			handleServerChannelMessage: function(channel, message) {
				var messageSenderName = message && Terrasoft.ServerChannel.getSenderName(message);
				if (messageSenderName === "ActualizeTranslationError") {
					var actualizedErrorMessage = this.get("Resources.Strings.ActualizedErrorMessage");
					var errorMessage = Ext.String.format("{0}\n{1}", actualizedErrorMessage, message.Body);
					this.showInformationDialog(errorMessage);
				}
			},
			/**
			 * Handles "Close" button click.
			 */
			onCloseButtonClick: function() {
				this.sandbox.publish("BackHistoryState");
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#onActiveRowAction
			 * @override
			 */
			onActiveRowAction: function(tag, primaryColumnValue) {
				if (tag === "card") {
					this.openTranslationWindow(primaryColumnValue);
				} else {
					this.mixins.ConfigurationGridUtilities.onActiveRowAction.apply(this, arguments);
					this.callParent(arguments);
				}
			},

			/**
			 * Shows view options button hint if translation section is visited for the first time.
			 */
			showViewButtonHint: function() {
				var profile = this.getProfile();
				var key = this.getProfileKey();
				if (profile && key) {
					var isViewButtonTipShown = profile.isViewButtonTipShown;
					if (!isViewButtonTipShown) {
						this.set("ViewOptionsButtonTipVisible", true);
						profile.isViewButtonTipShown = true;
						this.Terrasoft.utils.saveUserProfile(key, profile, false);
					}
				}
			},

			/**
			 * Actualizes translation.
			 * @param {Function} [callback] Callback function.
			 * @param {Object} [scope] Callback execution scope.
			 */
			actualizeTranslation: function(callback, scope) {
				this.log("Translation actualization start");
				var translationActualizationMessage = this.get("Resources.Strings.TranslationActualization");
				this.showBodyMask({caption: translationActualizationMessage});
				var request = this.createTranslationServiceRequest("ActualizeTranslation");
				this.set("ActualizationInProgress", true);
				request.execute(function(response) {
					this.log("Translation actualization end");
					this.set("ActualizationInProgress", false);
					this.hideBodyMask();
					Ext.callback(callback, scope || this, [response]);
				}, this);
			},

			/**
			 * Applies translations.
			 */
			onApplyTranslationsButtonClick: function() {
				this.applyTranslation(function() {
					this.reloadGridData();
				});
			},

			/**
			 * Gets "ApplyTranslationsButton" visibility.
			 * @return {Boolean}
			 */
			getIsApplyTranslationsButtonVisible: function() {
				//TODO CRM-21787
				return true;
			},

			/**
			 * Gets section wrapper markerValue.
			 * @return {string}
			 */
			getSectionWrapperMarkerValue: function() {
				return this.get("TranslationActualized") ? "TranslationActualized" : "";
			}

			//endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "SectionWrapContainer",
				"values": {
					"markerValue": {"bindTo": "getSectionWrapperMarkerValue"}
				}
			},
			{
				"operation": "remove",
				"name": "SeparateModeAddRecordButton"
			},
			{
				"operation": "merge",
				"name": "SeparateModeViewOptionsButton",
				"values": {
					"tips": []
				}
			},
			{
				"operation": "insert",
				"parentName": "FiltersContainer",
				"propertyName": "items",
				"name": "PredefinedFiltersContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"id": "PredefinedFiltersContainer",
					"selectors": {wrapEl: "#PredefinedFiltersContainer"},
					"wrapClass": ["predefined-filters-container-wrapClass"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "SeparateModeViewOptionsButton",
				"propertyName": "tips",
				"name": "TranslateViewOptionsButtonTip",
				"values": {
					"content": {"bindTo": "Resources.Strings.ViewButtonHint"},
					"visible": {"bindTo": "ViewOptionsButtonTipVisible"},
					"behaviour": {
						"displayEvent": this.Terrasoft.TipDisplayEvent.NONE
					}
				}
			},
			{
				"operation": "insert",
				"index": 0,
				"name": "CloseButton",
				"parentName": "SeparateModeActionButtonsLeftContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"style": this.Terrasoft.controls.ButtonEnums.style.BLUE,
					"caption": {"bindTo": "Resources.Strings.CloseButtonCaption"},
					"click": {"bindTo": "onCloseButtonClick"},
					"classes": {
						"textClass": ["actions-button-margin-right"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "ApplyTranslationButton",
				"parentName": "SeparateModeActionButtonsLeftContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"style": this.Terrasoft.controls.ButtonEnums.style.GREEN,
					"caption": {"bindTo": "Resources.Strings.ApplyTranslationsButtonCaption"},
					"click": {"bindTo": "onApplyTranslationsButtonClick"},
					"visible": {"bindTo": "getIsApplyTranslationsButtonVisible"},
					"classes": {
						"textClass": ["actions-button-margin-right"]
					}
				}
			},
			{
				"operation": "remove",
				"name": "DataGridActiveRowOpenAction"
			},
			{
				"operation": "remove",
				"name": "DataGridActiveRowCopyAction"
			},
			{
				"operation": "remove",
				"name": "DataGridActiveRowDeleteAction"
			},
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"className": "Terrasoft.ConfigurationGrid",
					"generator": "ConfigurationGridGenerator.generatePartial",
					"type": "listed",
					"generateControlsConfig": {"bindTo": "generateActiveRowControlsConfig"},
					"changeRow": {"bindTo": "changeRow"},
					"unSelectRow": {"bindTo": "unSelectRow"},
					"onGridClick": {"bindTo": "onGridClick"},
					"listedZebra": true,
					"initActiveRowKeyMap": {"bindTo": "initActiveRowKeyMap"},
					"activeRowAction": {"bindTo": "onActiveRowAction"},
					"rowDataItemMarkerColumnName": "Key",
					"allowScrollToActiveRow": "true"
				}
			},
			{
				"operation": "insert",
				"name": "activeRowActionCard",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions",
				"values": {
					"className": "Terrasoft.Button",
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"tag": "card",
					"markerValue": "card",
					"imageConfig": {"bindTo": "Resources.Images.CardIcon"}
				}
			},
			{
				"operation": "insert",
				"name": "activeRowActionSave",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions",
				"values": {
					"className": "Terrasoft.Button",
					"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"tag": "save",
					"markerValue": "save",
					"imageConfig": {"bindTo": "Resources.Images.SaveIcon"}
				}
			},
			{
				"operation": "insert",
				"name": "activeRowActionCancel",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions",
				"values": {
					"className": "Terrasoft.Button",
					"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"tag": "cancel",
					"markerValue": "cancel",
					"imageConfig": {"bindTo": "Resources.Images.CancelIcon"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


