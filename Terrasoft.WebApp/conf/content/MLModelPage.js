Terrasoft.configuration.Structures["MLModelPage"] = {innerHierarchyStack: ["MLModelPage"], structureParent: "BaseModulePageV2"};
define('MLModelPageStructure', ['MLModelPageResources'], function(resources) {return {schemaUId:'e198e03f-20ef-49bf-9167-0faa7be3f977',schemaCaption: "MLModelPage", parentSchemaName: "BaseModulePageV2", schemaName:'MLModelPage',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MLModelPage", ["MLConfigurationConsts", "GoogleTagManagerUtilities", "ConfigurationEnums",
		"DesktopPopupNotification", "ColumnSettingsUtilities", "MLModelPageResources", "SourceCodeEditGenerator",
		"SourceCodeEdit", "css!MLModelPageCSS", "TooltipUtilities", "CardWidgetModule", "EntityColumnLookupMixin",
		"MLModelStateProgressBarUtils", "css!MLModelStateProgressBarUtils", "RootSchemaLookupMixin",
		"StructureExplorerUtilities", "EntityStructureHelperMixin", "MLModelColumnViewModel", "MLPredictionPageMixin",
		"ImageCustomGeneratorV2", "MLModelPageFiltersMixin", "AcademyUtilities"],
	function(MLConfigurationConsts, GoogleTagManagerUtilities, ConfigurationEnums, DesktopPopupNotification,
			ColumnSettingsUtilities) {
		return {
			entitySchemaName: "MLModel",
			mixins: {
				TooltipUtilities: "Terrasoft.TooltipUtilities",
				EntityColumnLookupMixin: "Terrasoft.EntityColumnLookupMixin",
				RootSchemaLookupMixin: "Terrasoft.RootSchemaLookupMixin",
				EntityStructureHelper: "Terrasoft.EntityStructureHelperMixin",
				MLPredictionPageMixin: "Terrasoft.MLPredictionPageMixin",
				MLModelPageFiltersMixin: "Terrasoft.MLModelPageFiltersMixin"
			},
			messages: {
				/**
				 * @message SetFilterModuleConfig
				 * Applies settings for the filter unit.
				 */
				"SetFilterModuleConfig": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetFilterModuleConfig
				 * Returns settings for the filter unit.
				 */
				"GetFilterModuleConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message OnFiltersChanged
				 * Subscription for the filter unit modification event.
				 */
				"OnFiltersChanged": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message GetColumnsLookupInfo
				 * Puts parameters info to columns lookup page.
				 */
				"GetColumnsLookupInfo": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message SetColumnsLookupInfo
				 * Gets selected columns from lookup page.
				 */
				"SetColumnsLookupInfo": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message TrainButtonConfigUpdated
				 * Publishes information about current Train button's configuration.
				 */
				"TrainButtonConfigUpdated": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message ColumnSettingsInfo
				 * Subscription for the column settings info.
				 */
				"ColumnSettingsInfo": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message ColumnSetuped
				 * Subscription for the column setup.
				 */
				"ColumnSetuped": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * Returns entity data for ml prediction & explanation.
				 * @message GetMLExplanationConfig
				 */
				"GetMLExplanationConfig": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * Trigger to reload ml explanation data.
				 * @message ReloadMLExplanationsModule
				 */
				"ReloadMLExplanationsModule": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * Hides ML explanations module container.
				 * @message HideMLExplanationsModule
				 */
				"HideMLExplanationsModule": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			properties: {
				/**
				 * Timer task, that continues updating model state until training finish or model page close.
				 * @private
				 * @type {Object}
				 */
				updateStateTask: null,
				/**
				 * Timeout for re-query training status in seconds.
				 * @private
				 * @type {Number}
				 */
				trainingStatusAutoRefreshTimeout: 0,
				/**
				 * Default re-train frequency in days.
				 * @private
				 * @type {Number}
				 */
				defaultTrainFrequency: 30,

				/**
				 * Array of the model designed columns' identifiers before all modifications.
				 * @type {Array}
				 */
				initialColumnCollectionIdentifiers: null
			},
			attributes: {
				/**
				 * Root schema lookup value.
				 */
				"RootSchema": {
					"dataValueType": Terrasoft.DataValueType.LOOKUP,
					"isLookup": true,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true,
					"caption": {"bindTo": "getRootSchemaCaption"}
				},

				/**
				 * Aggregated localizable (MetadataLcz) and not localizable parts of Metadata.
				 */
				"MetadataWithLcz": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"caption": {"bindTo": "getMetadataColumnCaption"}
				},

				/**
				 * Uid of the root schema.
				 */
				"RootSchemaUId": {
					"dependencies": [
						{
							"columns": ["RootSchema"],
							"methodName": "onRootSchemaChanged"
						}
					]
				},

				/**
				 * Root schema columns suitable for target column of the model.
				 */
				"RootSchemaColumns": {
					"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Target column for model.
				 */
				"TargetColumn": {
					"dataValueType": Terrasoft.DataValueType.LOOKUP,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": false,
					"onChange": "onTargetColumnChanged"
				},

				/**
				 * Root object's column that stores predicted result.
				 */
				"PredictedResultColumn": {
					"dataValueType": Terrasoft.DataValueType.LOOKUP,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": false,
					"onChange": "onPredictedResultColumnChanged"
				},

				/**
				 * Collection of the model designed columns.
				 */
				"ColumnCollection": {
					"dataValueType": Terrasoft.DataValueType.COLLECTION
				},

				/**
				 * Indicates that ColumnCollection was modified by user.
				 */
				"IsColumnCollectionChanged": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},

				/**
				 * Indicates that ColumnCollection is empty.
				 */
				"IsColumnCollectionEmpty": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": true
				},

				/**
				 * Indicates that batch prediction should start automatically.
				 */
				"UseAutomaticBatchPrediction": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": true
				},

				/**
				 * Train button's caption.
				 */
				"TrainButtonCaption": {
					"dataValueType": Terrasoft.DataValueType.TEXT
				},

				/**
				 * Indicates that train button is enabled.
				 */
				"IsTrainButtonEnabled": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN
				},

				/**
				 * Indicates that Automatic re-train enabled.
				 */
				"IsAutomaticRetrainEnabled": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false,
					"onChange": "onIsAutomaticRetrainEnabledChanged"
				},

				/**
				 * Indicates possible existence of the explanation info for the trained model.
				 * @type {Boolean}
				 */
				"IsTrainingExplanationInfoCanBeFound": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					value: true
				}
			},
			details: /**SCHEMA_DETAILS*/{
				Files: {
					schemaName: "FileDetailV2",
					entitySchemaName: "MLModelFile",
					filter: {
						masterColumn: "Id",
						detailColumn: "MLModel"
					}
				},
				TrainSessions: {
					schemaName: "MLModelTrainSessionDetailV2",
					entitySchemaName: "MLTrainSession",
					filter: {
						masterColumn: "Id",
						detailColumn: "MLModel"
					}
				}
			}/**SCHEMA_DETAILS*/,
			methods: {

				//region Methods: Private

				/**
				 * Sends Google tag manager data.
				 * Note. This approach is slightly different from the standard one, because:
				 *  - Terrasoft.BasePageV2#sendGoogleTagManagerData is overridden as empty function;
				 *  - This approach does not require synthetic property for custom action tag.
				 * @param {String} modelActionTag Custom action tag.
				 * @private
				 */
				_sendGoogleTagManagerDataMLModelPage: function(modelActionTag) {
					const isGoogleTagManagerEnabled = this.get("IsGoogleTagManagerEnabled");
					if (!isGoogleTagManagerEnabled) {
						return;
					}
					const data = this.getGoogleTagManagerData();
					this.Ext.apply(data, {
						action: modelActionTag,
						primaryColumnValue: this.getPrimaryColumnValue()
					});
					Terrasoft.GoogleTagManagerUtilities.actionModule(data);
				},

				/**
				 * Utility function for post-processing of automatically generated metadata.
				 * @param {String} key The key to be replaced.
				 * @param {Object} value The value to be replaced.
				 * @private
				 */
				_metadataReplacer: function(key, value) {
					return (value == null || key === "isRequired") ? undefined : value;
				},

				/**
				 * Gets metric indicator visibility flag.
				 * @return {Boolean} Indicator visibility value.
				 * @private
				 */
				_getIsMetricIndicatorVisible: function() {
					return !this.isNewMode();
				},

				/**
				 * Converts arguments to lookup item.
				 * @private
				 * @param {Object} value Value of lookup.
				 * @param {String} displayValue DisplayValue of lookup.
				 * @return {Object} Lookup item.
				 */
				_getListValue: function(value, displayValue) {
					return {
						value: value,
						displayValue: displayValue
					};
				},

				/**
				 * Initializes TargetColumn, PredictedResultColumn properties.
				 * @private
				 */
				_initializeTargetColumns: function() {
					this.set("TargetColumn", null);
					this.set("PredictedResultColumn", null);
					const targetObjectColumns = this.get("TargetObjectColumns");
					if (!targetObjectColumns) {
						return;
					}
					const targetColumn = targetObjectColumns[this.$TargetColumnUId];
					this.set("TargetColumn", targetColumn);
					const predictedResultColumn = targetObjectColumns[this.$PredictedResultColumnUId];
					this.set("PredictedResultColumn", predictedResultColumn);
				},

				/**
				 * Sets list of numeric columns into TargetObjectColumns property.
				 * @private
				 * @param {Array} columns Array of columns.
				 */
				_onRootSchemaColumnsLoaded: function(columns) {
					const items = {};
					Terrasoft.each(columns, function(column) {
						if (this.filterTargetColumns(column)) {
							items[column.uId] = this._getListValue(column.uId, column.caption);
						}
					}, this);
					this.set("TargetObjectColumns", items);
				},

				/**
				 * Loads columns of target object and executes callback function.
				 * @private
				 * @param {String} schemaName Name of entity schema.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution context of callback function.
				 */
				_loadRootSchemaColumns: function(schemaName, callback, scope) {
					Terrasoft.require([schemaName], function(entitySchema) {
						const columns = entitySchema && entitySchema.columns;
						this.set("RootSchemaColumns", columns);
						this._onRootSchemaColumnsLoaded(columns);
						this.Ext.callback(callback, scope || this);
					}, this);
				},

				/**
				 * Initializes TargetObjectColumns property.
				 * @private
				 * @param {Function} [callback] Callback function.
				 * @param {Object} [scope] Execution context of callback function.
				 */
				_initializeRootSchemaColumns: function(callback, scope) {
					this.set("RootSchemaColumns", null);
					const schema = this.get("RootSchema");
					if (Terrasoft.isEmpty(schema)) {
						callback.call(scope);
						return;
					}
					this._loadRootSchemaColumns(schema.name, callback, scope);
				},

				/**
				 * @private
				 */
				_initCollections: function() {
					this.set("ColumnCollection", this.Ext.create("Terrasoft.BaseViewModelCollection"));
				},

				/**
				 * @param {Terrasoft.BaseViewModelCollection} entities Collection of MLModelColumn.
				 * @param {Array} extendedInfoArray Array of linked column info (caption, data value types, etc.)
				 * @private
				 */
				_getColumnsConfig: function(entities, extendedInfoArray) {
					return entities.mapArray(function(entity) {
						const extendedInfo = Terrasoft.findItem(extendedInfoArray, {
							key: entity.$ColumnPath
						});
						let columnConfig;
						const id = !this.isCopyMode() ? entity.$Id : Terrasoft.generateGUID();
						if (extendedInfo) {
							const itemInfo = extendedInfo.item;
							const isBackward = entity.$AggregationType !== Terrasoft.AggregationType.NONE;
							columnConfig = {
								Id: id,
								ColumnPath: entity.$ColumnPath,
								AggregationType: entity.$AggregationType,
								SubFilters: entity.$SubFilters,
								Name: entity.$ColumnPath,
								SchemaCaption: itemInfo.columnCaption,
								Caption: entity.$Caption || itemInfo.columnCaption,
								ReferenceSchemaName: itemInfo.referenceSchemaName || itemInfo.parentSchemaName,
								IsBackward: isBackward,
								DataValueType: itemInfo.dataValueType
							};
							if (entity.$AggregationType === Terrasoft.AggregationType.COUNT) {
								columnConfig.DataValueType = Terrasoft.DataValueType.INTEGER;
							}
						} else {
							columnConfig = {
								Id: id,
								UId: entity.$ColumnUId,
								ColumnPath: entity.$ColumnPath,
								Caption: entity.$Caption
							};
						}
						return columnConfig;
					}, this);
				},

				/**
				 * @param {Terrasoft.BaseViewModelCollection} entities The collection of MLModel columns.
				 * @param {Function} callback The handler for columnsConfig created by entities.
				 * @param {Object} scope The callback scope.
				 * @private
				 */
				_getExtendedColumnsInfoByPath: function(entities, callback, scope) {
					const serviceParameters = [];
					if (Ext.isEmpty(this.$RootSchema)) {
						callback.call(scope, []);
						return;
					}
					const schemaName = this.$RootSchema.name;
					let columnsConfig;
					entities.each(function(entity) {
						const isSchemaColumn = !Ext.isEmpty(this._tryGetRootSchemaColumn({
							UId: entity.$UId,
							ColumnPath: entity.$ColumnPath
						}));
						if (!entity.$ColumnPath || isSchemaColumn) {
							return true;
						}
						serviceParameters.push({
							schemaName: schemaName,
							columnPath: entity.$ColumnPath,
							key: entity.$ColumnPath
						});
					}, this);
					if (serviceParameters.length === 0) {
						columnsConfig = this._getColumnsConfig(entities, []);
						callback.call(scope, columnsConfig);
						return;
					}
					this.getColumnPathCaption(this.Ext.JSON.encode(serviceParameters), function(extendedInfoArray) {
						columnsConfig = this._getColumnsConfig(entities, extendedInfoArray);
						callback.call(scope, columnsConfig);
					}, this);
				},

				/**
				 * @private
				 * @param {String} modelId Identifier of the model, columns of which should be loaded.
				 */
				_queryModelColumns: function(modelId) {
					const esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "MLModelColumn"
					});
					esq.addColumn("Id");
					esq.addColumn("ColumnUId");
					esq.addColumn("ColumnPath");
					esq.addColumn("AggregationType");
					esq.addColumn("SubFilters");
					esq.addColumn("Caption");
					esq.filters.addItem(Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "MLModel", modelId));
					esq.getEntityCollection(function(response) {
						this._getExtendedColumnsInfoByPath(response.collection, this._loadColumnCollection, this);
					}, this);
				},

				/**
				 * @private
				 */
				_startWatchingForColumnCollectionChanged: function() {
					const collection = this.$ColumnCollection;
					if (!collection) {
						return;
					}
					collection.on("add", this._onColumnCollectionChanged, this);
					collection.on("remove", this._onColumnCollectionChanged, this);
					collection.on("clear", this._onColumnCollectionChanged, this);
				},

				/**
				 * @private
				 */
				_stopWatchingForColumnCollectionChanged: function() {
					const collection = this.$ColumnCollection;
					if (!collection) {
						return;
					}
					collection.un("add", this._onColumnCollectionChanged, this);
					collection.un("remove", this._onColumnCollectionChanged, this);
					collection.un("clear", this._onColumnCollectionChanged, this);
				},

				/**
				 * @private
				 */
				_onColumnCollectionChanged: function() {
					this.$IsColumnCollectionChanged = true;
					this.$IsColumnCollectionEmpty = !this.$ColumnCollection || this.$ColumnCollection.isEmpty();
				},

				/**
				 * @private
				 */
				_loadColumnCollection: function(columnsConfig) {
					const columnCollection = this.$ColumnCollection;
					this._stopWatchingForColumnCollectionChanged();
					columnCollection.clear();
					columnsConfig.forEach(this._addModelColumn, this);
					this.set("IsColumnCollectionChanged", this.isCopyMode());
					this._startWatchingForColumnCollectionChanged();
					this.$IsColumnCollectionEmpty = columnCollection.isEmpty();
					if (this.isCopyMode()) {
						this.initialColumnCollectionIdentifiers = [];
					} else {
						this._updateInitialColumnCollectionIdentifiers(columnCollection);
					}
				},

				/**
				 * @param {Object} columnConfig Column info descriptor.
				 * @param {Guid} columnConfig.UId Column unique Id.
				 * @param {String} columnConfig.ColumnPath Root schema column name.
				 * @private
				 */
				_tryGetRootSchemaColumn: function(columnConfig) {
					let column;
					const columnUId = columnConfig.UId;
					if (columnUId) {
						column = Terrasoft.findWhere(this.$RootSchemaColumns, {"uId": columnUId});
					} else {
						column = Terrasoft.findWhere(this.$RootSchemaColumns, {"name": columnConfig.ColumnPath});
					}
					return column;
				},

				/**
				 * @param {Object} columnConfig Column info descriptor.
				 * @param {Guid} [columnConfig.UId] Entity schema column unique Id.
				 * @param {Guid} [columnConfig.Id] MLModelColumn unique Id.
				 * @param {String} [columnConfig.ColumnPath] Column path relative to Root schema.
				 * @param {String} [columnConfig.Caption] Custom caption for column.
				 * @private
				 */
				_addModelColumn: function(columnConfig) {
					let targetColumnConfig = columnConfig;
					const column = this._tryGetRootSchemaColumn(columnConfig);
					if (column) {
						targetColumnConfig = {
							UId: column.uId,
							ColumnPath: column.name,
							SchemaCaption: column.caption,
							Caption: columnConfig.Caption || column.caption,
							DataValueType: column.dataValueType,
							IsBackward: false
						};
					}
					targetColumnConfig.Id = columnConfig.Id || Terrasoft.generateGUID();
					targetColumnConfig.Caption = targetColumnConfig.Caption || targetColumnConfig.SchemaCaption;
					const columnViewModel = this._createMLModelColumnViewModel(targetColumnConfig);
					this.$ColumnCollection.add(targetColumnConfig.Id, columnViewModel);
				},

				/**
				 * @private
				 */
				_createMLModelColumnViewModel: function(column) {
					const columnViewModel = this.Ext.create("Terrasoft.MLModelColumnViewModel", {
						sandbox: this.sandbox,
						Ext: this.Ext,
						Terrasoft: this.Terrasoft,
						values: column
					});
					const pageViewModel = this;
					columnViewModel.model.on("change", function() {
						columnViewModel.set("IsChanged", true);
						pageViewModel.$IsColumnCollectionChanged = true;
					}, this);
					return columnViewModel;
				},

				/**
				 * @private
				 */
				_saveColumnCollection: function(callback, scope) {
					const batchQuery = this.Ext.create("Terrasoft.BatchQuery");
					this._addDeleteColumnsQuery(batchQuery);
					this._addInsertNewColumnsQuery(batchQuery);
					this._addUpdateChangedColumnsQuery(batchQuery);
					const uniqueMaskId = "ml-model-page-save-columns";
					if (this.isEditMode()) {
						this.showBodyMask({
							uniqueMaskId: uniqueMaskId,
							timeout: 0
						});
					}
					batchQuery.execute(function() {
						this._updateInitialColumnCollectionIdentifiers(this.$ColumnCollection);
						this.set("IsColumnCollectionChanged", false);
						this.hideBodyMask({
							uniqueMaskId: uniqueMaskId
						});
						Ext.callback(callback, scope);
					}, this);
				},

				/**
				 * @private
				 */
				_addDeleteColumnsQuery: function(batchQuery) {
					const removedColumnIds = this._getRemovedColumnIds();
					if (removedColumnIds.length === 0) {
						return;
					}
					const deleteQuery = this.Ext.create("Terrasoft.DeleteQuery", {
						rootSchemaName: "MLModelColumn"
					});
					const filters = deleteQuery.filters;
					filters.addItem(Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "MLModel", this.$Id));
					filters.addItem(Terrasoft.createColumnInFilterWithParameters("Id", removedColumnIds));
					batchQuery.add(deleteQuery);
				},

				/**
				 * @private
				 */
				_addInsertNewColumnsQuery: function(batchQuery) {
					const newColumnIds = this._getNewColumnIds();
					if (newColumnIds.length === 0) {
						return;
					}
					Terrasoft.each(newColumnIds, function(columnId) {
						const column = this.$ColumnCollection.get(columnId);
						const insertQuery = this.Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: "MLModelColumn"
						});
						insertQuery.setParameterValue("MLModel", this.$Id, Terrasoft.DataValueType.GUID);
						insertQuery.setParameterValue("Id", column.$Id, Terrasoft.DataValueType.GUID);
						if (column.$UId) {
							insertQuery.setParameterValue("ColumnUId", column.$UId, Terrasoft.DataValueType.GUID);
						}
						insertQuery.setParameterValue("ColumnPath", column.$ColumnPath, Terrasoft.DataValueType.TEXT);
						if (column.$Caption !== column.$SchemaCaption) {
							insertQuery.setParameterValue("Caption", column.$Caption,
								Terrasoft.DataValueType.TEXT);
						}
						insertQuery.setParameterValue("AggregationType", column.$AggregationType,
							Terrasoft.DataValueType.INTEGER);
						insertQuery.setParameterValue("SubFilters", column.$SubFilters,
							Terrasoft.DataValueType.TEXT);
						batchQuery.add(insertQuery);
					}, this);
				},

				/**
				 * @private
				 */
				_addUpdateChangedColumnsQuery: function(batchQuery) {
					const changedColumnIds = this._getChangedColumnIds();
					if (changedColumnIds.length === 0) {
						return;
					}
					Terrasoft.each(changedColumnIds, function(columnId) {
						const column = this.$ColumnCollection.get(columnId);
						const caption = column.$Caption !== column.$SchemaCaption ? column.$Caption : null;
						const updateQuery = this.Ext.create("Terrasoft.UpdateQuery", {
							rootSchemaName: "MLModelColumn"
						});
						updateQuery.filters.addItem(Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "MLModel", this.$Id));
						updateQuery.filters.addItem(Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "Id", columnId));
						updateQuery.setParameterValue("Caption", caption, Terrasoft.DataValueType.TEXT);
						updateQuery.setParameterValue("AggregationType", column.$AggregationType,
							Terrasoft.DataValueType.INTEGER);
						updateQuery.setParameterValue("SubFilters", column.$SubFilters,
							Terrasoft.DataValueType.TEXT);
						batchQuery.add(updateQuery);
					}, this);
				},

				/**
				 * @private
				 */
				_subscribeOnEvents: function() {
					this.subscribeOnColumnChange("ModelInstanceUId", function() {
							this.updateMLExplanationModule();
							this._updateTrainButtonConfig();
						}, this);
					this.subscribeOnColumnChange("State", this._updateTrainButtonConfig, this);
				},

				/**
				 * Returns 'Remove column' icon.
				 * @return {String} 'Remove column' icon.
				 * @private
				 */
				_getRemoveColumnIcon: function() {
					const resourceImage = this.get("Resources.Images.ClearIcon");
					return Terrasoft.ImageUrlBuilder.getUrl(resourceImage);
				},

				/**
				 * Returns root schema column collection, excluding already appended to model column list.
				 * @private
				 */
				_getAvailableRootSchemaColumnCollection: function() {
					const entityColumns = this.Ext.create("Terrasoft.Collection");
					Terrasoft.each(this.$RootSchemaColumns, function(column) {
						const modelColumn = this.$ColumnCollection.findByFn(function(item) {
							return item.$UId === column.uId || item.$ColumnPath === column.name;
						}, this);
						if (!modelColumn) {
							entityColumns.add(column.uId, {
								"id": column.uId,
								"caption": column.caption,
								"icon": this.getColumnTypeIcon(column.dataValueType)
							});
						}
					}, this);
					return entityColumns;
				},

				/**
				 * Updates value for such root entity related attributes like TargetColumn, PredictedResultColumn.
				 * @private
				 */
				_setRootEntityColumnAttributeValue: function(attribute) {
					const item = this.get(attribute);
					if (!this.Ext.isEmpty(item) && !this.Ext.isEmpty(item.value)) {
						this.set(attribute + "UId", item.value);
					}
				},

				/**
				 * @private
				 */
				_initUseAutomaticBatchPrediction: function() {
					const value = this.getLookupValue("BatchPredictionStartMethod");
					this.$UseAutomaticBatchPrediction =
						value === MLConfigurationConsts.MLTaskStartMethods.Automatically;
				},

				/**
				 * Stops the task for updating model state.
				 * @private
				 */
				_stopUpdateStateTask: function() {
					const task = this.updateStateTask;
					if (!this.Ext.isEmpty(task)) {
						task.destroy();
					}
				},

				/**
				 * Shows the notification about training finish.
				 * @private
				 */
				_showTrainingNotification: function(resultCode) {
					const config = DesktopPopupNotification.createConfig();
					const image = this.get("Resources.Images.MLIcon");
					const title = this.get("Resources.Strings.TrainingStatusNotificationTitle");
					const body = resultCode === MLConfigurationConsts.ModelStates.Done.code
						? this.Ext.String.format(this.get("Resources.Strings.TrainModelActionSucceedMessage"),
							resultCode)
						: this.get("Resources.Strings.TrainModelActionFailedMessage");
					DesktopPopupNotification.show(this.Ext.apply(config, {
						onClick: this.Ext.global.focus,
						title: title,
						body: body,
						icon: Terrasoft.ImageUrlBuilder.getUrl(image)
					}));
				},

				/**
				 * Handler of update state task tick.
				 * @private
				 */
				_updateStateTaskHandler: function() {
					this.callService({
						serviceName: "MLTrainerService",
						methodName: "QueryLastTrainingState",
						data: {
							"modelId": this.get("Id")
						}
					}, function(responseResult) {
						const sessionStateCode = Terrasoft.findValueByPath(responseResult, "trainSessionState.value");
						const modelStates = MLConfigurationConsts.ModelStates;
						this._updateModelStateByCode(sessionStateCode);
						if (!sessionStateCode) {
							this._stopUpdateStateTask();
							return;
						}
						if (sessionStateCode === modelStates.Done.code) {
							if (!this.$IsChanged) {
								this.reloadEntity();
							}
						} else {
							this.updateDetail({detail: "TrainSessions"});
						}
						if (this._isFiniteStateCode(sessionStateCode)) {
							this._stopUpdateStateTask();
							this._showTrainingNotification(sessionStateCode);
						}
					}, this);
				},

				/**
				 * Updates State attribute by the current training state code.
				 * @param {String} stateCode Current training state code.
				 * @private
				 */
				_updateModelStateByCode: function(stateCode) {
					const states = MLConfigurationConsts.ModelStates;
					const state = Terrasoft.findWhere(states, {code: stateCode});
					if (state) {
						this.set("State", {
							value: state.id,
							displayValue: stateCode
						}, {silent: true});
					}
					this._updateTrainButtonConfig();
				},

				/**
				 * Sends training button config message.
				 * @private
				 */
				_updateTrainButtonConfig: function() {
					this.$TrainButtonCaption = this.getTrainButtonCaption();
					this.$IsTrainButtonEnabled = this.getIsTrainButtonEnabled();
					this.sandbox.publish("TrainButtonConfigUpdated", {
						caption: this.$TrainButtonCaption,
						enabled: this.$IsTrainButtonEnabled
					}, [this.sandbox.id]);
				},

				/**
				 * Checks if the given state is finite (by code).
				 * @param {String} stateCode Code of the state to check.
				 * @private
				 */
				_isFiniteStateCode: function(stateCode) {
					return Terrasoft.findWhere(MLConfigurationConsts.FiniteModelStates, {code: stateCode});
				},

				/**
				 * Checks if the give state is finite (by id).
				 * @param {String} stateId Id of the state to check.
				 * @return {Boolean}
				 * @private
				 */
				_isFiniteStateId: function(stateId) {
					return !!Terrasoft.findWhere(MLConfigurationConsts.FiniteModelStates, {id: stateId});
				},

				/**
				 * @return {Array} Identifiers of model columns that were removed.
				 * @private
				 */
				_getRemovedColumnIds: function() {
					return Terrasoft.difference(this.initialColumnCollectionIdentifiers,
						this.$ColumnCollection.getKeys());
				},

				/**
				 * @return {Array} Identifiers of model columns that were added.
				 * @private
				 */
				_getNewColumnIds: function() {
					return Terrasoft.difference(this.$ColumnCollection.getKeys(),
						this.initialColumnCollectionIdentifiers);
				},

				/**
				 * @return {Array} Identifiers of model columns that were modified.
				 * @private
				 */
				_getChangedColumnIds: function() {
					const changedColumns = this.$ColumnCollection.filter(function(column) {
						return column.$IsChanged;
					});
					return Terrasoft.intersect(changedColumns.getKeys(), this.initialColumnCollectionIdentifiers);
				},

				/**
				 * Updates columns's collection identifiers.
				 * @param {Terrasoft.Collection} columnCollection Model columns collection.
				 * @private
				 */
				_updateInitialColumnCollectionIdentifiers: function(columnCollection) {
					if (!columnCollection) {
						this.initialColumnCollectionIdentifiers = [];
						return;
					}
					this.initialColumnCollectionIdentifiers = columnCollection.mapArrayByAttr("Id");
				},

				_addModelColumnByLinkedColumnSettings: function(linkedColumnInfo, schemaCaption, caption) {
					const columnConfig = {
						ColumnPath: linkedColumnInfo.leftExpressionColumnPath,
						Name: linkedColumnInfo.leftExpressionColumnPath,
						SchemaCaption: schemaCaption,
						Caption: caption,
						DataValueType: linkedColumnInfo.dataValueType,
						AggregationType: linkedColumnInfo.aggregationType || Terrasoft.AggregationType.NONE,
						IsBackward: linkedColumnInfo.isBackward,
						SubFilters: linkedColumnInfo.serializedFilter || "",
						ReferenceSchemaName: linkedColumnInfo.referenceSchemaName
					};
					this._addModelColumn(columnConfig);
				},

				/**
				 * Handles selection of column.
				 * @private
				 * @param {Object} columnInfo Selected column information.
				 */
				_onColumnSelected: function(columnInfo) {
					if (columnInfo.isBackward) {
						columnInfo.hideFilter = false;
						ColumnSettingsUtilities.Open(this.sandbox, columnInfo, function(newConfig) {
							this._addModelColumnByLinkedColumnSettings(newConfig, columnInfo.leftExpressionCaption,
								newConfig.title);
						}.bind(this), "centerPanel", this);
					} else {
						this._addModelColumnByLinkedColumnSettings(columnInfo, columnInfo.leftExpressionCaption);
					}
				},

				/**
				 * @param {Object} column Entity schema column config.
				 * @param {Object} config Structure explorer config.
				 * @private
				 */
				_columnsFiltrationMethod: function(column, config) {
					const aggregatedDataValueTypes = [
						Terrasoft.DataValueType.DATE_TIME,
						Terrasoft.DataValueType.DATE,
						Terrasoft.DataValueType.TIME,
						Terrasoft.DataValueType.INTEGER,
						Terrasoft.DataValueType.MONEY,
						Terrasoft.DataValueType.FLOAT
					];
					if (config.schema.name !== this.$RootSchema.name) {
						if (config.hasBackwardElements) {
							return (Terrasoft.contains(aggregatedDataValueTypes, column.dataValueType));
						}
						return true;
					}
					const existingItem = this.$ColumnCollection.findByFn(function(item) {
						return item.$UId === column.uId || item.$ColumnPath === column.name;
					}, this);
					return Ext.isEmpty(existingItem);
				},

				/**
				 * @private
				 */
				_initializeMetadata: function() {
					const metadata = this._tryDeserializeMetadata(this.$MetaData);
					if (!metadata) {
						this.$MetadataWithLcz = this.$MetaData;
						return;
					}
					const metadataLcz = this._tryDeserializeMetadata(this.$MetaDataLcz);
					if (!metadataLcz) {
						this.$MetadataWithLcz = this.$MetaData;
						return;
					}
					if (metadata.output) {
						metadata.output.caption = metadataLcz.output && metadataLcz.output.caption || "";
					}
					if (!metadata.inputs || !metadataLcz) {
						this.$MetadataWithLcz = this.$MetaData;
						return;
					}
					Terrasoft.each(metadata.inputs, function(input) {
						const inputLcz = Terrasoft.findWhere(metadataLcz.inputs, {
							name: input.name
						});
						input.caption = inputLcz && inputLcz.caption || "";
					}, this);
					this.$MetadataWithLcz = JSON.stringify(metadata, null, "\t");
				},

				/**
				 * @private
				 */
				_separateMetadata: function() {
					const metadataWithLcz = this._tryDeserializeMetadata(this.$MetadataWithLcz);
					if (!metadataWithLcz) {
						this.$MetaData = this.$MetadataWithLcz;
						this.$MetaDataLcz = "";
						return;
					}
					const inputsLcz = [];
					const inputs = metadataWithLcz.inputs || [];
					Terrasoft.each(inputs, function(input) {
						if (!input.caption) {
							return true;
						}
						inputsLcz.push({
							name: input.name,
							caption: input.caption
						});
						delete input.caption;
					}, this);
					const metadataLcz = {
						inputs: inputsLcz
					};
					if (metadataWithLcz.output) {
						metadataLcz.output = {
							name: metadataWithLcz.output.name,
							caption: metadataWithLcz.output.caption
						};
						delete metadataWithLcz.output.caption;
					}
					this.$MetaDataLcz = JSON.stringify(metadataLcz, null, "\t");
					this.$MetaData = JSON.stringify(metadataWithLcz, null, "\t");
				},

				/**
				 * @return {Boolean|Object} Deserialized metadata. False if it can't be deserialized or it's empty.
				 * @private
				 */
				_tryDeserializeMetadata: function(serializedMetadata) {
					if (!serializedMetadata) {
						return false;
					}
					let metadata;
					try {
						metadata = JSON.parse(serializedMetadata) || {};
					} catch (e) {
						this.error(e);
						return false;
					}
					if (!metadata.inputs && !metadata.output) {
						return false;
					}
					return metadata;
				},

				/**
				 * @return {Boolean} True if model has trained session.
				 * @private
				 */
				_getIsModelHasTrainingExplanations: function() {
					return !Ext.isEmpty(this.$TrainSessionId) && !Ext.isEmpty(this.$ModelInstanceUId) &&
						this.$IsTrainingExplanationInfoCanBeFound;
				},

				/**
				 * @return {Boolean} True if model has no trained session.
				 * @private
				 */
				_getIsModelHasNoTrainingExplanations: function() {
					return !this._getIsModelHasTrainingExplanations();
				},

				/**
				 * @private
				 */
				_getTrainingHeaderCaption: function() {
					const formattedDateTime = Terrasoft.toCultureDateTime(this.$TrainedOn);
					return Ext.String.format(this.get("Resources.Strings.TopFeaturesCaption"), formattedDateTime);
				},

				/**
				 * @private
				 */
				_subscribeOnMLExplanationModuleMessages: function() {
					this.$IsTrainingExplanationInfoCanBeFound = true;
					const moduleId = this.modules.MLExplanationModule.moduleId;
					this.sandbox.subscribe("GetMLExplanationConfig", function() {
						if (!this._getIsModelHasTrainingExplanations()) {
							return null;
						}
						return {
							operation: "getModelExplanation",
							recordDescription: this._getTrainingHeaderCaption(),
							trainSessionId: this.$TrainSessionId
						};
					}.bind(this), this, [moduleId]);
					this.sandbox.subscribe("HideMLExplanationsModule", function() {
						this.$IsTrainingExplanationInfoCanBeFound = false;
					}, this, [moduleId]);
				},

				//endregion

				//region Methods: Public

				/**
				 * Reloads ml explanation data.
				 * @protected
				 */
				updateMLExplanationModule: function() {
					this.sandbox.publish("ReloadMLExplanationsModule");
				},
				/**
				 * Open entity structure explorer module for select column macros.
				 * @protected
				 * @virtual
				 */
				openStructureExplorer: function() {
					const schemaName = this.$RootSchema.name;
					Terrasoft.StructureExplorerUtilities.open({
						scope: this,
						handlerMethod: this._onColumnSelected,
						moduleConfig: {
							useBackwards: true,
							schemaName: schemaName,
							columnsFiltrationMethod: this._columnsFiltrationMethod.bind(this),
							firstColumnsOnly: false
						}
					});
				},

				/**
				 * Handles changing target entity schema and sets appropriate schema UId.
				 */
				onRootSchemaChanged: function() {
					this.mixins.RootSchemaLookupMixin.onRootSchemaChanged.call(this);
					if (!this.get("RootSchemaInitialized")) {
						return;
					}
					this.set("TargetColumnUId", null);
					this.set("TargetColumn", null);
					this.set("PredictedResultColumnUId", null);
					this.set("PredictedResultColumn", null);
					this._initializeRootSchemaColumns(function() {
						this._queryModelColumns(this.$Id);
						this.updateTrainingFilterModule();
						this.updateTrainingOutputFilterModule();
						this.updateBatchPredictionFilterUnitModule();
					}, this);
				},

				/**
				 * Processes key press in metadata text box.
				 * Requests service to automatically generate metadata when 'Ctrl+Alt+G' is pressed.
				 * @param {Object} event Keyboard event.
				 */
				metaDataOnKeyDown: function(event) {
					if (event && event.keyCode === Ext.EventObject.G && event.ctrlKey && event.altKey) {
						this.callService({
							serviceName: "MLUtilityService",
							methodName: "GenerateMetadata",
							data: {
								"selectText": this.get("TrainingSetQuery")
							}
						}, function(responseResult) {
							const disclaimer =
								"This metadata was generated automatically and should be verified manually!\n\n";
							const metadataString = JSON.stringify(responseResult.metadata, this._metadataReplacer, 4);
							this.set("MetaData", disclaimer + metadataString);
						}, this);
					}
				},

				/**
				 * Handles click on FAQ buttons to open Academy urls.
				 * @param {Object} btnArgA Reserved system argument.
				 * @param {Object} btnArgB Reserved system argument.
				 * @param {Object} btnArgC Reserved system argument.
				 * @param {Array} tag Attributes to create context help link.
				 */
				onFaqClick: function(btnArgA, btnArgB, btnArgC, tag) {
					if (tag.contextHelpId) {
						Terrasoft.AcademyUtilities.getUrl({
							contextHelpId: tag.contextHelpId,
							callback: function(url) {
								Ext.global.open(url);
							}
						});
						return;
					}
					const faqLink = this.get(tag.link);
					Ext.global.open(faqLink);
				},

				/**
				 * Returns FAQ photo image url.
				 * @return {String} Photo image url.
				 */
				getFaqIcon: function() {
					const resourceImage = this.get("Resources.Images.FAQIcon");
					return Terrasoft.ImageUrlBuilder.getUrl(resourceImage);
				},

				/**
				 * Returns column caption for entity column.
				 * @param {String} columnName Entity column name.
				 * @return {String} Caption for entity column.
				 */
				getEntityColumnCaption: function(columnName) {
					return this.entitySchema.getColumnByName(columnName).caption;
				},

				/**
				 * Returns Metadata column caption.
				 * @return {String} Metadata column caption.
				 */
				getMetadataColumnCaption: function() {
					return this.getEntityColumnCaption("MetaData");
				},

				/**
				 * @return {Boolean} True if model is not of a classification problem type.
				 */
				getIsNotClassification: function() {
					return this.getLookupValue("MLProblemType") !== MLConfigurationConsts.ProblemTypes.Classification;
				},

				/**
				 * @return {Boolean} True if model is of a classification problem type.
				 */
				getIsClassification: function() {
					return this.getLookupValue("MLProblemType") === MLConfigurationConsts.ProblemTypes.Classification;
				},

				/**
				 * @return {Boolean} True if model is of a scoring problem type.
				 */
				getIsScoring: function() {
					return this.getLookupValue("MLProblemType") === MLConfigurationConsts.ProblemTypes.Scoring;
				},

				/**
				 * @return {Boolean} True if model is of a numeric regression problem type.
				 */
				getIsRegression: function() {
					return this.getLookupValue("MLProblemType") === MLConfigurationConsts.ProblemTypes.Regression;
				},

				/**
				 * @return {Boolean} True if model is not of a scoring problem type.
				 */
				getIsNotScoring: function() {
					return !this.getIsScoring();
				},

				/**
				 * @return {Boolean} True if RootSchema is not set.
				 */
				getIsRootSchemaNotSet: function() {
					return this.Ext.isEmpty(this.$RootSchema);
				},

				/**
				 * @return {Boolean} True if RootSchema is not set and ProblemType is scoring.
				 */
				getIsScoringAndRootSchemaNotSet: function() {
					return this.getIsScoring() && this.getIsRootSchemaNotSet();
				},

				/**
				 * Prepare model for machine learning training.
				 */
				queryModelTraining: function() {
					if (!this.$IsChanged) {
						this.trainModel();
						return;
					}
					this.showConfirmationDialog(this.get("Resources.Strings.SavePageConfirmation"), function(result) {
						if (result === Terrasoft.MessageBoxButtons.YES.returnCode) {
							const config = {
								isSilent: true,
								callback: this.trainModel,
								scope: this
							};
							this.save(config);
						}
					}, ["yes", "no"]);
				},

				/**
				 * Executes machine learning training job.
				 */
				trainModel: function() {
					this._sendGoogleTagManagerDataMLModelPage("MLModelTrain");
					this.callService({
						serviceName: "MLTrainerService",
						methodName: "TrainModel",
						data: {
							"modelId": this.get("Id")
						}
					}, function(responseResult, response) {
						let message;
						const sessionState = responseResult.trainSessionState;
						this.setActiveTab("TrainingTab");
						this.runModelStateListener();
						if (!sessionState) {
							message = response.timedout
								? this.get("Resources.Strings.TrainModelActionTimedOutMessage")
								: this.get("Resources.Strings.TrainModelActionFailedMessage");
							this.warning(message);
							return;
						}
						const sessionStateValue = sessionState.value;
						if (!sessionStateValue) {
							message = sessionState.exceptionType === "IncorrectConfigurationException"
								? this.get("Resources.Strings.TrainModelActionWrongConfigMessage")
								: this.get("Resources.Strings.TrainModelActionFailedMessage");
							this.showInformationDialog(message);
							return;
						}
						this._updateModelStateByCode(sessionStateValue);
					}, this);
				},

				/**
				 * Handles TargetColumn change.
				 */
				onTargetColumnChanged: function() {
					this._setRootEntityColumnAttributeValue("TargetColumn");
					if (!this.get("RootSchemaInitialized")) {
						return;
					}
					const targetColumn = this.$TargetColumn;
					const predictedResultColumn = this.$PredictedResultColumn;
					if (!this.Ext.isEmpty(targetColumn) && !this.Ext.isEmpty(targetColumn.value) &&
							(this.Ext.isEmpty(predictedResultColumn) || this.Ext.isEmpty(targetColumn.value))) {
						this.$PredictedResultColumn = targetColumn;
					}
				},

				/**
				 * Handles PredictedResultColumn change.
				 */
				onPredictedResultColumnChanged: function() {
					this._setRootEntityColumnAttributeValue("PredictedResultColumn");
				},

				/**
				 * Loads values into combobox of column related to root entity.
				 * @param {String} filterValue ComboboxEdit value.
				 * @param {Terrasoft.core.collections.Collection} list List of comboboxEdit values.
				 */
				prepareRootEntityColumnList: function(filterValue, list) {
					if (this.Ext.isEmpty(list)) {
						return;
					}
					const targetObjectColumns = this.get("TargetObjectColumns");
					list.reloadAll(targetObjectColumns);
				},

				/**
				 * Returns column type icon.
				 * @param {Terrasoft.DataValueType} dataValueType Column data value type.
				 * @return {String} Column type icon.
				 */
				getColumnTypeIcon: function(dataValueType) {
					const imageName = Terrasoft.getImageNameByDataValueType(dataValueType);
					return Terrasoft.ImageUrlBuilder.getUrl({
						source: Terrasoft.ImageSources.RESOURCE_MANAGER,
						params: {
							resourceManagerName: "Terrasoft.Nui",
							resourceItemName: Ext.String.format("{0}{1}", "ProcessSchemaDesigner.", imageName)
						}
					});
				},

				/**
				 * Handler of the configuration row of the columns container list.
				 * @param {Object} itemConfig Config of the item.
				 * @param {Terrasoft.BaseViewModel} item ViewModel.
				 */
				onGetColumnItemConfig: function(itemConfig, item) {
					itemConfig.config = {
						"id": "MLColumn",
						"className": "Terrasoft.Container",
						"classes": {
							"wrapClassName": ["column-item-container"]
						},
						"markerValue": item.$ColumnPath + "-column",
						"items": [
							{
								"className": "Terrasoft.ImageView",
								"imageSrc": this.getColumnTypeIcon(item.$DataValueType),
								"classes": {"wrapClass": ["column-type-icon"]},
								"markerValue": item.$DataValueType + "-icon"
							},
							{
								"className": "Terrasoft.Hyperlink",
								"caption": {"bindTo": "Caption"},
								"classes": {
									"hyperlinkClass": ["column-link"]
								},
								"click": {"bindTo": "onColumnHyperlinkClick"},
								"markerValue": item.$ColumnPath + "-link"
							},
							{
								"className": "Terrasoft.Button",
								"click": {"bindTo": "onRemoveColumnClick"},
								"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
								"classes": {"wrapperClass": ["remove-column-icon"]},
								"styles": {
									"wrapperStyle": {
										"background":
											Ext.String.format("url({0}) 50% 50% no-repeat", this._getRemoveColumnIcon())
									}
								},
								"markerValue": item.$ColumnPath + "-clear"
							}
						]
					};
				},

				/**
				 * Creates menu items for 'Add columns' button.
				 * @return {Terrasoft.BaseViewModelCollection} Menu with actions for adding columns.
				 */
				getAddColumnMenuItems: function() {
					const items = this.Ext.create("Terrasoft.BaseViewModelCollection");
					const addRootSchemaColumnsMenuItem = this.getButtonMenuItem({
						"Caption": "$Resources.Strings.AddRootSchemaMenuItemCaption",
						"Click": {"bindTo": "onAddRootSchemaColumnsClick"}
					});
					const addRootSchemaLinkedColumnMenuItem = this.getButtonMenuItem({
						"Caption": "$Resources.Strings.AddRootSchemaLinkedColumnCaption",
						"Click": {"bindTo": "openStructureExplorer"}
					});
					items.addItem(addRootSchemaColumnsMenuItem);
					items.addItem(addRootSchemaLinkedColumnMenuItem);
					return items;
				},

				/**
				 * Handles click on 'Add root object columns' menu action.
				 */
				onAddRootSchemaColumnsClick: function() {
					const schemaName = "EntityColumnLookupPage";
					const pageId = this.sandbox.id + schemaName;
					this.sandbox.subscribe("SetColumnsLookupInfo", function(lookupInfo) {
						if (lookupInfo) {
							Terrasoft.each(lookupInfo.selectedRows, function(item) {
								this._addModelColumn({UId: item});
							}, this);
						}
						this.closeSchemaColumnSelectPage();
					}, this, [pageId]);
					const entityColumns = this._getAvailableRootSchemaColumnCollection();
					this.showEntitySchemaColumnSelectPage(entityColumns, {
						rootSchema: this.$RootSchema,
						isMultiSelect: true
					});
				},

				/**
				 * @inheritdoc Terrasoft.MLModelStateProgressBarUtils#getStateProgressBarValue
				 */
				getStateProgressBarValue: function(stateConfig) {
					return Terrasoft.MLModelStateProgressBarUtils.getStateProgressBarValue(stateConfig);
				},

				//endregion

				//region Methods: Protected override

				/**
				 * @inheritdoc BasePageV2#init
				 * @protected
				 * @override
				 */
				init: function(callback, scope) {
					const parentInit = this.getParentMethod();
					this._subscribeOnEvents();
					Terrasoft.EntitySchemaManager.initialize(function() {
						this._initCollections();
						parentInit.call(this, function() {
							callback.call(scope);
						}, this);
					}, this);
				},

				/**
				 * @inheritdoc BasePageV2#onEntityInitialized
				 * @protected
				 * @override
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					this._initUseAutomaticBatchPrediction();
					this.set("RootSchemaInitialized", false);
					this.initializeRootSchema();
					this.$IsAutomaticRetrainEnabled = (this.$TrainFrequency > 0);
					Terrasoft.SysSettings.querySysSettingsItem("MLModelTrainingAutoRefreshSeconds",
							function(value) {
						this.trainingStatusAutoRefreshTimeout = value;
					}, this);
					this._updateTrainButtonConfig();
					this._initializeMetadata();
					this._initializeRootSchemaColumns(function() {
						this._initializeTargetColumns();
						const modelId = this.isCopyMode() ? this.$SourceEntityPrimaryColumnValue : this.$Id;
						this._queryModelColumns(modelId);
						this.updateTrainingFilterModule();
						this.updateTrainingOutputFilterModule();
						this.updateBatchPredictionFilterUnitModule();
						this.set("RootSchemaInitialized", true);
						const currentStateId =
							this.getLookupValue("State") || MLConfigurationConsts.ModelStates.NotStarted.id;
						if (!this._isFiniteStateId(currentStateId)) {
							this.runModelStateListener();
						}
						this._subscribeOnMLExplanationModuleMessages();
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#save
				 * @override
				 */
				save: function() {
					if (!this.$IsAutomaticRetrainEnabled) {
						this.$TrainFrequency = 0;
					}
					this._separateMetadata();
					this.callParent(arguments);
					this._sendGoogleTagManagerDataMLModelPage("Save");
				},

				/**
				 * @inheritdoc BaseObject#onDestroy
				 * @override
				 */
				onDestroy: function() {
					this._stopUpdateStateTask();
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#saveEntityInChain
				 * @override
				 */
				saveEntityInChain: function(callback, scope) {
					if (this.$IsColumnCollectionChanged) {
						const columnSaver = this._saveColumnCollection.bind(this, callback, scope);
						this.callParent([columnSaver, scope]);
					} else {
						this.callParent(arguments);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#isChanged
				 * @override
				 */
				isChanged: function() {
					const isChanged = this.callParent(arguments);
					return isChanged || this.$IsColumnCollectionChanged;
				},

				/**
				 * Returns Target expression group caption.
				 * @return {String}
				 */
				getTargetColumnGroupCaption: function() {
					if (this.getIsNotScoring()) {
						return this.get("Resources.Strings.TargetColumnGroupCaption");
					}
					return this.get("Resources.Strings.TargetColumnGroup_Filters_Caption");
				},

				/**
				 * Returns Target expression group tip content.
				 * @return {String}
				 */
				getTargetColumnGroupInfoButtonContent: function() {
					if (this.getIsNotScoring()) {
						return this.get("Resources.Strings.TargetColumnGroupInfoButtonContent");
					}
					return this.get("Resources.Strings.TargetColumnGroupInfoButton_Filters_Content");
				},

				/**
				 * Handles 'UseAutomaticBatchPrediction' toggled edit value changed.
				 * @param {Boolean} checked New value.
				 */
				onUseAutomaticBatchPredictionChanged: function(checked) {
					if (!this.$IsEntityInitialized) {
						return;
					}
					const value = (checked)
						? MLConfigurationConsts.MLTaskStartMethods.Automatically
						: MLConfigurationConsts.MLTaskStartMethods.Manually;
					if (this.getLookupValue("BatchPredictionStartMethod") !== value) {
						this.$BatchPredictionStartMethod = {
							value: value,
							displayValue: ""
						};
					}
				},

				/**
				 * Handles 'IsAutomaticRetrainEnabled' value changed.
				 */
				onIsAutomaticRetrainEnabledChanged: function() {
					if (!this.$IsEntityInitialized) {
						return;
					}
					if (this.$IsAutomaticRetrainEnabled && this.$TrainFrequency <= 0) {
						this.$TrainFrequency = this.defaultTrainFrequency;
					}
				},

				/**
				 * Returns Train button's caption.
				 * @return {String}
				 */
				getTrainButtonCaption: function() {
					const modelStates = MLConfigurationConsts.ModelStates;
					const currentStateId = this.getLookupValue("State") || modelStates.NotStarted.id;
					let resourceName;
					if (!this._isFiniteStateId(currentStateId)) {
						resourceName = "TrainModelButtonCaption_InProgress";
					} else if (this.$ModelInstanceUId) {
						resourceName = "TrainModelButtonCaption_Finished";
					} else {
						resourceName = "TrainModelButtonCaption_NotStarted";
					}
					return this.get("Resources.Strings." + resourceName);
				},

				/**
				 * Indicates that Train button is enabled.
				 * @return {Boolean}
				 */
				getIsTrainButtonEnabled: function() {
					const modelStates = MLConfigurationConsts.ModelStates;
					const currentStateId = this.getLookupValue("State") || modelStates.NotStarted.id;
					return this._isFiniteStateId(currentStateId);
				},

				//endregion

				//region Methods: Protected virtual

				/**
				 * Runs task for updating model state.
				 * @protected
				 */
				runModelStateListener: function() {
					this._stopUpdateStateTask();
					if (this.trainingStatusAutoRefreshTimeout <= 0) {
						return;
					}
					const task = this.Ext.TaskManager.newTask({
						run: this._updateStateTaskHandler,
						scope: this,
						fireOnStart: true,
						interval: this.trainingStatusAutoRefreshTimeout * 1000
					});
					this.updateStateTask = task;
					this.Ext.TaskManager.start(task);
				},
				/**
				 * Filters target object columns for displaying in list.
				 * @protected
				 * @virtual
				 * @param {Object} column Target object's column.
				 * @return {boolean|Boolean} True if column is suitable.
				 */
				filterTargetColumns: function(column) {
					if (column.usageType !== ConfigurationEnums.EntitySchemaColumnUsageType.General) {
						return false;
					}
					const problemType = this.getLookupValue("MLProblemType");
					if (problemType === MLConfigurationConsts.ProblemTypes.Classification) {
						return Terrasoft.isLookupDataValueType(column.dataValueType);
					} else {
						return Terrasoft.isNumberDataValueType(column.dataValueType);
					}
				},

				/**
				 * @protected
				 * @return {String} Image url fro empty ml explanation data.
				 */
				getEmptyInfoImage: function() {
					const resourceImage = this.get("Resources.Images.EmptyInfoImage");
					return Terrasoft.ImageUrlBuilder.getUrl(resourceImage);
				}

				//endregion

			},
			modules: /**SCHEMA_MODULES*/{
				"MetricIndicator": {
					"moduleId": "c54af51c-0947-4958-adb9-796c42da1cd0",
					"moduleName": "CardWidgetModule",
					"config": {
						"parameters": {
							"viewModelConfig": {
								"widgetKey": "MLModelPageMetricIndicator",
								"recordId": "dc755ef4-81e9-4ccb-b72a-831d1d6fcb84"
							}
						}
					}
				},
				"MLExplanationModule": {
					"moduleId": "cd8f28c4-a95c-4127-b067-5b067000f089",
					"config": {
						"schemaName": "MLPredictionExplanation",
						"isSchemaConfigInitialized": true,
						"useHistoryState": false,
						"parameters": {
							"viewModelConfig": {
								"IsModalBoxMode": false
							}
						}
					}
				}
			}/**SCHEMA_MODULES*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"name": "TrainButton",
					"parentName": "LeftContainer",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"caption": {"bindTo": "TrainButtonCaption"},
						"click": {"bindTo": "queryModelTraining"},
						"enabled": {"bindTo": "IsTrainButtonEnabled"},
						"markerValue": "TrainButton"
					}
				},

				// Left
				{
					"name": "Name",
					"parentName": "ProfileContainer",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						}
					}
				},
				{
					"name": "MLProblemType",
					"parentName": "ProfileContainer",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						},
						"enabled": false
					}
				},
				{
					"name": "RootSchema",
					"parentName": "ProfileContainer",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24
						},
						"contentType": Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"prepareList": {
								"bindTo": "prepareRootSchemaList"
							}
						},
						"enabled": {"bindTo": "isNewMode"},
						"tip": {
							"content": "$Resources.Strings.ChooseObjectStepTipCaption"
						}
					}
				},
				{
					"name": "StateProgressBar",
					"parentName": "ProfileContainer",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 24
						},
						"itemType": Terrasoft.ViewItemType.COMPONENT,
						"className": "Terrasoft.BaseProgressBar",
						"maxValue": 5,
						"value": {
							"bindTo": "State",
							"bindConfig": {"converter": "getStateProgressBarValue"}
						}
					}
				},
				{
					"name": "PredictionEnabled",
					"parentName": "ProfileContainer",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 24
						},
						"tip": {
							"content": {"bindTo": "Resources.Strings.PedictionEnabledTip"}
						}
					}
				},
				{
					"name": "MetricIndicator",
					"parentName": "ProfileContainer",
					"operation": "insert",
					"index": 4,
					"propertyName": "items",
					"values": {
						"layout": {
							"colSpan": 24,
							"rowSpan": 3,
							"column": 0,
							"row": 5,
							"layoutName": "ProfileContainer",
							"useFixedColumnHeight": false
						},
						"itemType": Terrasoft.ViewItemType.MODULE,
						"classes": {
							"wrapClassName": [
								"card-widget-grid-layout-item"
							]
						},
						"visible": {"bindTo": "_getIsMetricIndicatorVisible"}
					}
				},
				{
					"name": "FaqContainer",
					"parentName": "LeftModulesContainer",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": [],
						"markerValue": "FaqContainer"
					}
				},
				{
					"name": "FaqIcon",
					"parentName": "FaqContainer",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"getSrcMethod": "getFaqIcon",
						"readonly": true,
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"classes": {
							"wrapClass": ["profile-icon"]
						},
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 4
						}
					}
				},
				{
					"name": "FaqUrls",
					"parentName": "FaqContainer",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"markerValue": "FaqUrls",
						"layout": {
							"column": 4,
							"row": 0,
							"colSpan": 20
						}
					}
				},
				{
					"name": "FaqHeaderCaption",
					"parentName": "FaqUrls",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.FAQContainerCaption"
						},
						"classes": {
							"labelClass": ["faq-header", "label-green-color"]
						}
					}
				},
				{
					"name": "PredictiveAnalysisAcademyUrl",
					"parentName": "FaqUrls",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"classes": {
							"textClass": ["faq-button", "base-edit-link"]
						},
						"click": {"bindTo": "onFaqClick"},
						"caption": "$Resources.Strings.PredictiveAnalysisAcademyCaption",
						"tag": {"contextHelpId": 1825}
					}
				},
					{
						"name": "ClassificationAcademyUrl",
						"operation": "insert",
						"parentName": "FaqUrls",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"classes": {
								"textClass": ["faq-button", "base-edit-link"]
							},
							"click": {"bindTo": "onFaqClick"},
							"caption": "$Resources.Strings.ClassificationAcademyCaption",
							"tag": {"contextHelpId": 1940},
							"visible": {
								"bindTo": "getIsClassification"
							}
						}
					},
					{
						"name": "ScoringAcademyUrl",
						"operation": "insert",
						"parentName": "FaqUrls",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"classes": {
								"textClass": ["faq-button", "base-edit-link"]
							},
							"click": {"bindTo": "onFaqClick"},
							"caption": "$Resources.Strings.ScoringAcademyCaption",
							"tag": {"contextHelpId": 1942},
							"visible": {
								"bindTo": "getIsScoring"
							}
						}
					},
					{
						"name": "RegressionAcademyUrl",
						"operation": "insert",
						"parentName": "FaqUrls",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"classes": {
								"textClass": ["faq-button", "base-edit-link"]
							},
							"click": {"bindTo": "onFaqClick"},
							"caption": "$Resources.Strings.RegressionAcademyCaption",
							"tag": {"contextHelpId": 1941},
							"visible": {
								"bindTo": "getIsRegression"
							}
						}
					},
				{
					"name": "BusinessProcessAcademyUrl",
					"parentName": "FaqUrls",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"classes": {
							"textClass": ["faq-button", "base-edit-link"]
						},
						"click": {"bindTo": "onFaqClick"},
						"caption": "$Resources.Strings.BusinessProcessAcademyCaption",
						"tag": {"contextHelpId": 1950}
					}
				},
				{
					"name": "MLServiceAcademyUrl",
					"parentName": "FaqUrls",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"classes": {
							"textClass": ["faq-button", "base-edit-link"]
						},
						"click": {"bindTo": "onFaqClick"},
						"caption": "$Resources.Strings.MLServiceAcademyCaption",
						"tag": {"link": "Resources.Strings.MLServiceAcademyUrl"}
					}
				},

				// Right
				{
					"name": "ModelSettingsTab",
					"parentName": "Tabs",
					"operation": "insert",
					"index": 0,
					"propertyName": "tabs",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.ModelSettingsTabCaption"
						},
						"items": []
					}
				},
				{
					"name": "TrainingTab",
					"parentName": "Tabs",
					"operation": "insert",
					"index": 1,
					"propertyName": "tabs",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.TrainingTabCaption"
						},
						"items": []
					}
				},
				{
					"name": "MLExplanationContainer",
					"parentName": "TrainingTab",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["ml-explanation-widget"],
						"items": []
					}
				},
				{
					"name": "EmptyExplanationMessage",
					"parentName": "MLExplanationContainer",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"wrapClass": ["empty-training-data-message"],
						"visible": {"bindTo": "_getIsModelHasNoTrainingExplanations"},
						"markerValue": "EmptyExplanationMessage",
						"items": [
							{
								"name": "EmptyExplanationImage",
								"classes": {
									wrapClass: ["image-container"]
								},
								"getSrcMethod": "getEmptyInfoImage",
								"onPhotoChange": Terrasoft.emptyFn,
								"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage"
							},
							{
								"name": "MLExplanationsNoDataLabel",
								"itemType": Terrasoft.ViewItemType.LABEL,
								"caption": "$Resources.Strings.NoTrainingData",
								"labelConfig": {
									"classes": ["placeholder-label"]
								}
							}
						]
					}
				},
				{
					"name": "MLExplanationModule",
					"parentName": "MLExplanationContainer",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE,
						"visible": {"bindTo": "_getIsModelHasTrainingExplanations"}
					}
				},
				{
					"name": "TrainSessions",
					"parentName": "TrainingTab",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"name": "NotesTab",
					"parentName": "Tabs",
					"operation": "insert",
					"index": 2,
					"propertyName": "tabs",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.NotesTabCaption"
						},
						"items": []
					}
				},
				{
					"name": "Files",
					"parentName": "NotesTab",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"name": "NotesControlGroup",
					"parentName": "NotesTab",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": {"bindTo": "Resources.Strings.NotesGroupCaption"},
						"controlConfig": {"collapsed": false}
					}
				},
				{
					"name": "Notes",
					"parentName": "NotesControlGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"contentType": Terrasoft.ContentType.RICH_TEXT,
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"labelConfig": {"visible": false},
						"controlConfig": {
							"imageLoaded": {"bindTo": "insertImagesToNotes"},
							"images": {"bindTo": "NotesImagesCollection"}
						}
					}
				},

				{
					"name": "TargetColumnGroup",
					"parentName": "ModelSettingsTab",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {"bindTo": "getTargetColumnGroupCaption"},
						"tools": [],
						"items": [],
						"controlConfig": {
							"classes": ["target-column-control-group"]
						}
					}
				},
				{
					"name": "TargetColumnGroupInfoButton",
					"parentName": "TargetColumnGroup",
					"operation": "insert",
					"index": 1,
					"propertyName": "tools",
					"values": {
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": {"bindTo": "getTargetColumnGroupInfoButtonContent"},
						"behaviour": {
							"displayEvent": Terrasoft.TipDisplayEvent.HOVER
						},
						"controlConfig": {
							"classes": {
								"wrapperClass": "rootentity-info-button-control-group"
							}
						}
					}
				},
				{
					"name": "TargetColumnGroupGrid",
					"parentName": "TargetColumnGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"visible": {
							"bindTo": "getIsNotScoring"
						},
						"items": []
					}
				},
				{
					"name": "TargetColumn",
					"parentName": "TargetColumnGroupGrid",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12
						},
						"bindTo": "TargetColumn",
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"labelConfig": {"visible": false},
						"controlConfig": {
							"className": "Terrasoft.ComboBoxEdit",
							"classes": ["target-column"],
							"prepareList": {
								"bindTo": "prepareRootEntityColumnList"
							}
						},
						"visible": {
							"bindTo": "getIsNotScoring"
						}
					}
				},
				{
					"name": "TargetColumnGroupEmptyRootSchemaLabel",
					"parentName": "TargetColumnGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.RootSchemaNotSet",
						"visible": {
							"bindTo": "getIsScoringAndRootSchemaNotSet"
						},
						"labelConfig": {
							"classes": ["placeholder-label"]
						}
					}
				},
				{
					"name": "TrainingOutputFilterDataContainer",
					"parentName": "TargetColumnGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"id": "TrainingOutputFilterDataContainer",
						"selectors": {"wrapEl": "#TrainingOutputFilterDataContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["training-filters-container"],
						"beforererender": {"bindTo": "unloadTrainingOutputFilterUnitModule"},
						"afterrender": {"bindTo": "updateTrainingOutputFilterModule"},
						"afterrerender": {"bindTo": "updateTrainingOutputFilterModule"},
						"visible": {
							"bindTo": "getIsScoring"
						}
					}
				},

				{
					"name": "TrainingQueryFieldsGroup",
					"parentName": "ModelSettingsTab",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": "$Resources.Strings.TrainingQueryFieldsGroupCaption",
						"classes": {
							"wrapContainerClass": ["training-query-designer"]
						},
						"controlConfig": {
							"classes": ["training-query-fields-group"]
						},
						"tools": [],
						"items": []
					}
				},
				{
					"name": "AddColumnMenuButton",
					"parentName": "TrainingQueryFieldsGroup",
					"operation": "insert",
					"index": 1,
					"propertyName": "tools",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"menu": {
							"items": {"bindTo": "getAddColumnMenuItems"}
						},
						"imageConfig": {"bindTo": "Resources.Images.AddColumnMenuIcon"},
						"classes": {
							"wrapperClass": "add-columns-menu-button"
						}
					}
				},
				{
					"name": "TrainingQueryDesignerGroupInfoButton",
					"parentName": "TrainingQueryFieldsGroup",
					"operation": "insert",
					"index": 1,
					"propertyName": "tools",
					"values": {
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": "$Resources.Strings.TrainingQueryFieldsGroupInfoButtonContent",
						"behaviour": {
							"displayEvent": Terrasoft.TipDisplayEvent.HOVER
						},
						"controlConfig": {
							"classes": {
								"wrapperClass": "rootentity-info-button-control-group"
							}
						}
					}
				},
				{
					"name": "TrainingQueryFieldsGroupNoDataLabel",
					"parentName": "TrainingQueryFieldsGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.NoData",
						"visible": {
							"bindTo": "IsColumnCollectionEmpty"
						},
						"labelConfig": {
							"classes": ["placeholder-label"]
						}
					}
				},
				{
					"name": "ColumnContainerList",
					"parentName": "TrainingQueryFieldsGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"className": "Terrasoft.ContainerList",
						"id": "ColumnContainerList",
						"collection": {
							"bindTo": "ColumnCollection"
						},
						"idProperty": "Id",
						"itemPrefix": "MLColumnContainerList",
						"wrapClass": ["columns-container-list"],
						"onGetItemConfig": {
							"bindTo": "onGetColumnItemConfig"
						}
					}
				},
				{
					"name": "AdvancedQuerySettingsGroup",
					"parentName": "ModelSettingsTab",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": "$Resources.Strings.AdvancedQuerySettingsGroupCaption",
						"tools": [],
						"items": [],
						"controlConfig": {
							"classes": ["advanced-query-control-group"],
							"collapsed": true
						}
					}
				},
				{
					"name": "AdvancedQuerySettingsGroupInfoButton",
					"parentName": "AdvancedQuerySettingsGroup",
					"operation": "insert",
					"index": 1,
					"propertyName": "tools",
					"values": {
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": "$Resources.Strings.AdvancedQuerySettingsGroupInfoButtonContent",
						"behaviour": {
							"displayEvent": Terrasoft.TipDisplayEvent.HOVER
						},
						"controlConfig": {
							"classes": {
								"wrapperClass": "rootentity-info-button-control-group",
								"imageClass": "rootentity-info-button-image"
							}
						}
					}
				},
				{
					"name": "TrainingSetQueryLabel",
					"parentName": "AdvancedQuerySettingsGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getEntityColumnCaption"
						},
						"tag": "TrainingSetQuery",
						"labelConfig": {
							"classes": ["memo-label"]
						}
					}
				},
				{
					"name": "TrainingSetQuery",
					"parentName": "AdvancedQuerySettingsGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.RICH_TEXT,
						"generator": "SourceCodeEditGenerator.generate",
						"id": "TrainingSetQuery",
						"markerValue": "TrainingSetQuery"
					}
				},
				{
					"name": "MetaDataLabel",
					"parentName": "AdvancedQuerySettingsGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getEntityColumnCaption"
						},
						"tag": "MetaData",
						"labelConfig": {
							"classes": ["memo-label"]
						}
					}
				},
				{
					"name": "MetaData",
					"parentName": "AdvancedQuerySettingsGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"value": {"bindTo": "MetadataWithLcz"},
						"contentType": this.Terrasoft.ContentType.RICH_TEXT,
						"generator": "SourceCodeEditGenerator.generate",
						"showLineNumbers": false,
						"id": "MetaData",
						"markerValue": "MetaData",
						"keydown": {"bindTo": "metaDataOnKeyDown"}
					}
				},
				{
					"name": "BatchPredictionQueryLabel",
					"parentName": "AdvancedQuerySettingsGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getEntityColumnCaption"
						},
						"tag": "BatchPredictionQuery",
						"labelConfig": {
							"classes": ["memo-label"]
						},
						"visible": {
							"bindTo": "getIsNotClassification"
						}
					}
				},
				{
					"name": "BatchPredictionQuery",
					"parentName": "AdvancedQuerySettingsGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.RICH_TEXT,
						"generator": "SourceCodeEditGenerator.generate",
						"id": "BatchPredictionQuery",
						"markerValue": "BatchPredictionQuery",
						"visible": {
							"bindTo": "getIsNotClassification"
						}
					}
				},

				{
					"name": "FilterForTrainingGroup",
					"parentName": "ModelSettingsTab",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": "$Resources.Strings.FilterForTrainingGroupCaption",
						"tools": [],
						"items": [],
						"controlConfig": {
							"classes": ["training-filter-control-group"]
						}
					}
				},
				{
					"name": "TrainingFilterDataContainer",
					"parentName": "FilterForTrainingGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"id": "TrainingFilterDataContainer",
						"selectors": {"wrapEl": "#TrainingFilterDataContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["training-filters-container"],
						"beforererender": {bindTo: "unloadTrainingFilterUnitModule"},
						"afterrender": {bindTo: "updateTrainingFilterModule"},
						"afterrerender": {bindTo: "updateTrainingFilterModule"}
					}
				},
				{
					"name": "FilterForTrainingGroupEmptyRootSchemaLabel",
					"parentName": "FilterForTrainingGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.RootSchemaNotSet",
						"visible": {
							"bindTo": "getIsRootSchemaNotSet"
						},
						"labelConfig": {
							"classes": ["placeholder-label"]
						}
					}
				},

				{
					"name": "PredictedResultColumnGroup",
					"parentName": "ModelSettingsTab",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": "$Resources.Strings.PredictedResultColumnGroupCaption",
						"tools": [],
						"items": [],
						"controlConfig": {
							"classes": ["predicted-result-control-group"]
						}
					}
				},
				{
					"name": "PredictedResultColumnGroupGrid",
					"parentName": "PredictedResultColumnGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"name": "PredictedResultColumnGroupInfoButton",
					"parentName": "PredictedResultColumnGroup",
					"operation": "insert",
					"index": 1,
					"propertyName": "tools",
					"values": {
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": "$Resources.Strings.PredictedResultColumnGroupInfoButtonContent",
						"behaviour": {
							"displayEvent": Terrasoft.TipDisplayEvent.HOVER
						},
						"controlConfig": {
							"classes": {
								"wrapperClass": "rootentity-info-button-control-group"
							}
						}
					}
				},
				{
					"name": "PredictedResultColumn",
					"parentName": "PredictedResultColumnGroupGrid",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12
						},
						"bindTo": "PredictedResultColumn",
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"labelConfig": {"visible": false},
						"controlConfig": {
							"className": "Terrasoft.ComboBoxEdit",
							"classes": ["predicted-result-column"],
							"prepareList": {
								"bindTo": "prepareRootEntityColumnList"
							}
						},
						"tip": {
							"content": "$Resources.Strings.PredictedResultColumnTip"
						}
					}
				},

				{
					"name": "TrainingSettingsGroup",
					"parentName": "ModelSettingsTab",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": "$Resources.Strings.TrainingSettingsGroupCaption",
						"tools": [],
						"items": [],
						"controlConfig": {
							"classes": ["training-settings-control-group"]
						}
					}
				},
				{
					"name": "AutomaticRetrainToggleEdit",
					"parentName": "TrainingSettingsGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"bindTo": "IsAutomaticRetrainEnabled",
						"labelConfig": {
							"visible": false
						},
						"controlConfig": {
							"className": "Terrasoft.ToggleEdit"
						},
						"wrapClass": ["toggle-edit"]
					}
				},
				{
					"name": "AutomaticRetrainToggleEditLabel",
					"parentName": "TrainingSettingsGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.AutomaticRetrainToggleEditCaption",
						"labelConfig": {
							"classes": ["toggle-edit-label"]
						}
					}
				},
				{
					"name": "TrainingSettingsGroupGrid",
					"parentName": "TrainingSettingsGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"name": "TrainingSettingsInfoButton",
					"parentName": "TrainingSettingsGroup",
					"operation": "insert",
					"index": 1,
					"propertyName": "tools",
					"values": {
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": "$Resources.Strings.TrainingSettingsInfoButtonCaption",
						"behaviour": {
							"displayEvent": Terrasoft.TipDisplayEvent.HOVER
						},
						"controlConfig": {
							"classes": {
								"wrapperClass": "rootentity-info-button-control-group",
								"imageClass": "rootentity-info-button-image"
							}
						}
					}
				},
				{
					"name": "TrainFrequency",
					"parentName": "TrainingSettingsGroupGrid",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"caption": "$Resources.Strings.RetrainLabelCaption",
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12
						},
						"tip": {
							"content": {"bindTo": "Resources.Strings.RetrainTip"}
						}
					}
				},
				{
					"name": "MetricThreshold",
					"parentName": "TrainingSettingsGroupGrid",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 12,
							"row": 0,
							"colSpan": 12
						},
						"tip": {
							"content": {"bindTo": "Resources.Strings.LowerMetricTip"}
						}
					}
				},

				{
					"name": "BatchPredictionSettingsGroup",
					"parentName": "ModelSettingsTab",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": "$Resources.Strings.BatchPredictionSettingsGroupCaption",
						"tools": [],
						"items": [],
						"controlConfig": {
							"classes": ["batch-prediction-settings-control-group"],
							"visible": {"bindTo": "getIsNotClassification"}
						}
					}
				},
				{
					"name": "BatchPredictionStartMethodToggleEdit",
					"parentName": "BatchPredictionSettingsGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"bindTo": "UseAutomaticBatchPrediction",
						"labelConfig": {
							"visible": false
						},
						"controlConfig": {
							"className": "Terrasoft.ToggleEdit",
							"checked": {
								"bindTo": "UseAutomaticBatchPrediction"
							},
							"checkedchanged": {
								"bindTo": "onUseAutomaticBatchPredictionChanged"
							}
						},
						"wrapClass": ["toggle-edit"]
					}
				},
				{
					"name": "BatchPredictionStartMethodToggleEditLabel",
					"parentName": "BatchPredictionSettingsGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.BatchPredictionStartMethodToggleEditCaption",
						"labelConfig": {
							"classes": ["toggle-edit-label"]
						}
					}
				},
				{
					"name": "BatchPredictionFilterDataLabel",
					"parentName": "BatchPredictionSettingsGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.BatchPredictionFilterLabelCaption",
						"labelConfig": {
							"classes": ["batch-prediction-filters-label"]
						},
						"visible": {
							"bindTo": "UseAutomaticBatchPrediction"
						}
					}
				},
				{
					"name": "BatchPredictionFilterDataContainer",
					"parentName": "BatchPredictionSettingsGroup",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"id": "BatchPredictionFilterDataContainer",
						"selectors": {"wrapEl": "#BatchPredictionFilterDataContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["batch-prediction-filters-container"],
						"beforererender": {"bindTo": "unloadBatchPredictionFilterUnitModule"},
						"afterrender": {"bindTo": "updateBatchPredictionFilterUnitModule"},
						"afterrerender": {"bindTo": "updateBatchPredictionFilterUnitModule"},
						"visible": {
							"bindTo": "UseAutomaticBatchPrediction"
						}
					}
				}
			]/**SCHEMA_DIFF*/,
			userCode: {}
		};
	});


