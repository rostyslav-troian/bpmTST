Terrasoft.configuration.Structures["LocalDuplicateSearchPageV2"] = {innerHierarchyStack: ["LocalDuplicateSearchPageV2"]};
define('LocalDuplicateSearchPageV2Structure', ['LocalDuplicateSearchPageV2Resources'], function(resources) {return {schemaUId:'6c7b9e06-0a26-4e80-b9c4-a779a5f93b7d',schemaCaption: "LocalDuplicateSearchPageV2", parentSchemaName: "", schemaName:'LocalDuplicateSearchPageV2',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LocalDuplicateSearchPageV2", ["LocalDuplicateSearchPageV2Resources", "DefaultProfileHelper",
		"GridUtilitiesV2", "css!LocalDuplicateSearchPageV2CSS", "DuplicatesSearchUtilitiesV2"],
		function(resources, DefaultProfileHelper) {
	return {
		entitySchemaName: null,
		mixins: {
			/**
			 * @class GridUtilities implements basic methods for working with grid.
			 */
			GridUtilities: "Terrasoft.GridUtilities",

			/**
			 * @class DuplicatesSearchUtilitiesV2 implements basic methods for working with duplicates.
			 */
			DuplicatesSearchUtilitiesV2: "Terrasoft.DuplicatesSearchUtilitiesV2"
		},
		messages: {

			/**
			 * @message GetDuplicateSearchConfig
			 * Sends parameters for duplicates search.
			 * @return {Object} Parameters for duplicates search.
			 */
			"GetDuplicateSearchConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message BackHistoryState
			 * Changes current history state to the previous state.
			 */

			"BackHistoryState": {
				"mode": Terrasoft.MessageMode.BROADCAST,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message ChangeHeaderCaption
			 * Sets header parameters.
			 */
			"ChangeHeaderCaption": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 *@message FindDuplicatesResult
			 * Handles search duplicates results.
			 * @param {Object} Search duplicates result.
			 */
			"FindDuplicatesResult": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {

			/**
			 * Duplicates collection.
			 */
			"GridData": {
				"dataValueType": Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * Active row unique identifier.
			 */
			"ActiveRow": {
				dataValueType: Terrasoft.DataValueType.GUID
			},

			/**
			 * Grid data page row count.
			 */
			"RowCount": {
				"dataValueType": Terrasoft.DataValueType.INTEGER,
				"value": 20
			},

			/**
			 * List of duplicate row unique identifiers.
			 */
			"FoundDuplicatedResult": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
				"value": null
			}
		},
		methods: {

			/**
			 * Checks and open mini page.
			 * @private
			 */
			_tryOpenMiniPage: function() {
				if (this.openMiniPageConfig) {
					this.openAddMiniPage(this.openMiniPageConfig);
				}
			},

			/**
			 * Sets duplicates description.
			 * @private
			 */
			_setDescription: function() {
				var fullCollection = this.get("FoundDuplicatedResult").length;
				var duplicateRecordsMessageTemplate = this.get("Resources.Strings.DuplicateRecordsMessageTemplate");
				var mainMessage = Ext.String.format(duplicateRecordsMessageTemplate, fullCollection);
				this.set("DescriptionCaption", mainMessage);
			},

			/**
			 * Returns entity configuration object.
			 * @returns {Object} Entity configuration object.
			 * @private
			 */
			_getEntityConfig: function() {
				return Terrasoft && Terrasoft[this.entitySchemaName] || {};
			},

			/**
			 * Returns grid data rows count.
			 * @returns {Number} Grid data rows count.
			 * @private
			 */
			_getGridCount: function() {
				var gridData = this.get("GridData");
				return (gridData && gridData.getCount()) || 0;
			},

			/**
			 * Returns duplicated ids to be loaded as next page of the grid.
			 * @return {Array} Ids duplicate.
			 * @private
			 */
			_getNextDuplicateRecordIds: function() {
				var arrayDuplicationId = this.get("FoundDuplicatedResult") || [];
				var startIndex = this._getGridCount();
				if (arrayDuplicationId.length) {
					return arrayDuplicationId.slice(startIndex, startIndex + this.get("RowCount"));
				}
				return arrayDuplicationId;
			},

			/**
			 * Prepares duplicate object values.
			 * @param {Object} duplicate Find elastic duplicates service response object item.
			 * @param {Object} entityColumns Entity columns.
			 * @returns {Object} Processed duplicate.
			 * @private
			 */
			_prepareResponseValues: function(duplicate, entityColumns) {
				if(this.Ext.isEmpty(entityColumns)) {
					return duplicate;
				}
				var viewDataColumnNames = this.getDeduplicationViewDataColumns();
				this.Terrasoft.each(viewDataColumnNames, function(columnName) {
					var column = entityColumns[columnName] || {};
					if (column.dataValueType === this.Terrasoft.DataValueType.LOOKUP) {
						duplicate[columnName] = { displayValue: duplicate[columnName] || "" };
					}
				}, this);
				return duplicate;
			},

			/**
			 * Initializes grid data collection.
			 * @protected
			 */
			initGridDataCollection: function() {
				this.set("GridData", Ext.create("Terrasoft.BaseViewModelCollection"));
			},

			/**
			 * Initializes duplicate search page state attributes.
			 * @protected
			 */
			initDuplicateSearchPageState: function() {
				var historyState = this.sandbox.publish("GetHistoryState");
				var config = this.sandbox.publish("GetDuplicateSearchConfig", null, [this.sandbox.id]);
				var state = config || (historyState && historyState.state);
				this.entitySchemaName = state.entitySchemaName;
				this.dataSend = state.dataSend;
				this.state = state;
				this.openMiniPageConfig = historyState && historyState.state && historyState.state.openMiniPageConfig;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.initGridDataCollection();
				this.initDuplicateSearchPageState();
				this.sandbox.publish("ChangeHeaderCaption", {
					caption: this.getPageHeader(),
					dataViews: Ext.create("Terrasoft.Collection"),
					hidePageCaption: true
				});
				this.callParent([function() {
					this.initDataGridProfile();
					this.loadDuplicateRowIdentifiers();
					Ext.callback(callback, scope || this);
				}, this]);
			},

			/**
			 * Returns default view columns configuration.
			 * @returns {Object[]} Columns configuration.
			 * @protected
			 */
			getDefaultGridDataColumns: function() {
				var gridColumnNames = this.getViewDataColumns();
				var entityConfig = this._getEntityConfig();
				var defProfileColumns = [];
				Terrasoft.each(gridColumnNames, function(columnName) {
					var column = entityConfig.columns && entityConfig.columns[columnName];
					if (column) {
						defProfileColumns.push(column);
					}
				}, this);
				return defProfileColumns;
			},

			/**
			 * Initialize data grid profile.
			 * @protected
			 */
			initDataGridProfile: function() {
				var defProfileColumns = this.getDefaultGridDataColumns();
				var gridProfile = DefaultProfileHelper.getEntityProfile(this.getProfileKey(),
					this.entitySchemaName, this.Terrasoft.GridType.TILED, defProfileColumns);
				this.set("Profile", gridProfile);
			},

			/**
			 * Returns grid data view column names.
			 * @returns {String[]} Grid data view column names.
			 * @protected
			 */
			getViewDataColumns: function() {
				if (this.getIsFeatureEnabled("ESDeduplication")) {
					return this.getDeduplicationViewDataColumns();
				}
				var entityConfig = this._getEntityConfig();
				var dataColumns = [
					entityConfig.primaryDisplayColumnName,
					"Owner"];
				return this.entitySchemaName === "Account" ?
					dataColumns.concat(["Phone", "AdditionalPhone", "Web"]) :
					dataColumns.concat(["MobilePhone", "HomePhone", "Email"]);
			},

			/**
			 * On active row grid action event handler.
			 * @param {String} tag Event tag.
			 * @protected
			 */
			onActiveRowAction: function(tag) {
				var isChecked = (tag === "IsNotDuplicate");
				var activeRow = this.get("ActiveRow");
				var gridData = this.get("GridData");
				if (activeRow && gridData) {
					var item = gridData.get(activeRow);
					item.set("isChecked", isChecked);
				}
			},

			/**
			 * Load next data grid page.
			 * @protected
			 */
			loadNext: function() {
				if (!this.get("CanLoadMoreData")) {
					return;
				}
				this.onDuplicatesIdentifiersLoad();
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#initCanLoadMoreData
			 * @overridden
			 */
			initCanLoadMoreData: function(dataCollection) {
				var loadedCount = dataCollection && dataCollection.getCount();
				var duplicates = this.get("FoundDuplicatedResult");
				var totalCount = duplicates && duplicates.length || 0;
				this.set("CanLoadMoreData", totalCount > loadedCount, {silent: true});
			},

			/**
			 * Load duplicates data rows.
			 * @protected
			 */
			loadDuplicateRowIdentifiers: function() {
				this.set("DescriptionCaption", "");
				if (Ext.isArray(this.state.list)) {
					this.set("FoundDuplicatedResult", this.state.list);
					this.onDuplicatesIdentifiersLoad();
				} else {
					this.callService({
						serviceName: "SearchDuplicatesService",
						methodName: Ext.String.format("Find{0}Duplicates", this.entitySchemaName),
						data: this.state.dataSend
					}, function(response) {
						this.set("FoundDuplicatedResult",
							response[Ext.String.format("Find{0}DuplicatesResult", this.entitySchemaName)]);
						this.onDuplicatesIdentifiersLoad();
					}, this);
				}
			},

			/**
			 * Loads elastic duplicates to grid data.
			 * @protected
			 * @param {Object[]} duplicates Find elastic duplicates service response object.
			 */
			loadElasticDuplicates: function(duplicates) {
				var gridData = this.get("GridData");
				var entityConfig = this._getEntityConfig();
				this.Terrasoft.each(duplicates, function(item) {
					var itemModel = this.Ext.create("Terrasoft.BaseViewModel", {
						columns: entityConfig.columns,
						values: this._prepareResponseValues(item, entityConfig.columns)
					});
					gridData.add(item[entityConfig.primaryColumnName], itemModel);
				}, this);
			},

			/**
			 * On duplicate identifiers load handler.
			 * @protected
			 */
			onDuplicatesIdentifiersLoad: function() {
				var duplicates = this.get("FoundDuplicatedResult");
				if (duplicates && !duplicates.length) {
					return;
				}
				if (this.getIsFeatureEnabled("ESDeduplication")) {
					this.loadElasticDuplicates(duplicates);
					this._setDescription();
					return;
				}
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: this.entitySchemaName});
				this.addColumns(esq);
				this.applyFilters(esq);
				esq.getEntityCollection(function(response) {
					if (response.success) {
						var availableItems = response.collection;
						var collection = this.get("GridData");
						collection.loadAll(availableItems);
						this._setDescription();
						this.initCanLoadMoreData(collection);
					}
				}, this);
			},

			/**
			 * Adds columns to load duplicate rows query.
			 * @param {Terrasoft.EntitySchemaQuery} esq Load duplicate rows query.
			 * @protected
			 */
			addColumns: function(esq) {
				var entityConfig = this._getEntityConfig();
				var primaryColumnName = entityConfig.primaryColumnName;
				esq.addColumn(primaryColumnName);
				Terrasoft.each(this.getViewDataColumns(), function(column) {
					esq.addColumn(column);
				}, this);
			},

			/**
			 * Applies filters to load duplicate rows query.
			 * @param {Terrasoft.EntitySchemaQuery} esq Load duplicate rows query.
			 * @protected
			 */
			applyFilters: function(esq) {
				var partCollection = this._getNextDuplicateRecordIds();
				esq.filters.addItem(Terrasoft.createColumnInFilterWithParameters("Id", partCollection));
			},

			/**
			 * Save button click event handler
			 * @protected
			 */
			saveBtnClick: function() {
				var collection = [];
				var gridData = this.get("GridData");
				Terrasoft.each(gridData.getItems(), function(item) {
					var isChecked = item.get("isChecked") || false;
					if (isChecked) {
						collection.push(item.get("Id"));
					}
				}, this);
				var isNotDuplicate = (collection.length > 0);
				if (Terrasoft.Features.getIsEnabled("FindDuplicatesOnSave") && isNotDuplicate) {
					collection = gridData.getKeys();
				}
				if (!this.openMiniPageConfig) {
					this.sandbox.publish("BackHistoryState");
				}
				this.sandbox.publish("FindDuplicatesResult", {
					isNotDuplicate: isNotDuplicate,
					collection: collection,
					config: this.dataSend,
					callback: this.onFindDuplicatesResultCallback,
					scope: this
				}, [this.state.cardSandBoxId]);
			},

			/**
			 * Find duplicates result callback function.
			 * @protected
			 */
			onFindDuplicatesResultCallback: function() {
				if (!this.openMiniPageConfig) {
					return;
				}
				this.sandbox.publish("BackHistoryState");
			},

			/**
			 * Cancel button click event handler
			 * @protected
			 */
			cancelBtnClick: function() {
				this._tryOpenMiniPage();
				this.sandbox.publish("BackHistoryState");
			},

			/**
			 * Returns page header.
			 * @returns {String} Page header.
			 */
			getPageHeader: function() {
				var moduleStructure = this.getModuleStructure(this.entitySchemaName);
				return Ext.String.format(this.get("Resources.Strings.PageHeaderMask"),
					moduleStructure && moduleStructure.moduleCaption);
			},

			/**
			 * Grid after render event handler.
			 * @protected
			 */
			onGridAfterrender: function() {
				this.reloadGridColumnsConfig(this.getIsFeatureEnabled("ESDeduplication"));
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "localDuplicateSearchContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"id": "localDuplicateSearchContainer",
					"selectors": {"wrapEl": "#localDuplicateSearchContainer"},
					"wrapClass": ["local-duplicate-search-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "buttonsContainer",
				"parentName": "localDuplicateSearchContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"id": "buttonsContainer",
					"selectors": {"wrapEl": "#buttonsContainer"},
					"wrapClass": ["local-duplicate-buttons-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "buttonsContainer",
				"propertyName": "items",
				"name": "acceptButton",
				"values": {
					"id": "acceptButton",
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"caption": {"bindTo": "Resources.Strings.OkButtonCaption"},
					"click": {"bindTo": "saveBtnClick"},
					"tag": "AcceptButton",
					"clickDebounceTimeout": 1000
				}
			},
			{
				"operation": "insert",
				"parentName": "buttonsContainer",
				"propertyName": "items",
				"name": "CancelButton",
				"values": {
					"id": "CancelButton",
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
					"click": {"bindTo": "cancelBtnClick"},
					"tag": "CancelButton",
					"clickDebounceTimeout": 1000
				}
			},
			{
				"operation": "insert",
				"name": "DescriptionContainer",
				"parentName": "localDuplicateSearchContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"id": "DescriptionContainer",
					"selectors": {"wrapEl": "#DescriptionContainer"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DescriptionLabel",
				"parentName": "DescriptionContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "DescriptionCaption"}
				}
			},
			{
				"operation": "insert",
				"name": "DataGrid",
				"parentName": "localDuplicateSearchContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID,
					"type": Terrasoft.GridType.TILED,
					"safeBind": true,
					"primaryColumnName": "Id",
					"activeRow": {"bindTo": "ActiveRow"},
					"listedZebra": true,
					"collection": {"bindTo": "GridData"},
					"activeRowAction": {bindTo: "onActiveRowAction"},
					"watchRowInViewport": 2,
					"watchedRowInViewport": {bindTo: "loadNext"},
					"afterrender": {
						"bindTo": "onGridAfterrender"
					},
					"activeRowActions": []
				}
			},
			{
				"operation": "insert",
				"name": "IsNotDuplicateAction",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions",
				"values": {
					"className": "Terrasoft.Button",
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"caption": resources.localizableStrings.IsNotDuplicateCaption,
					"tag": "IsNotDuplicate",
					"visible": {
						"bindTo": "isChecked",
						"bindConfig": {
							"converter": function(value) {
								var isChecked = value || false;
								return Terrasoft.Features.getIsDisabled("ESDeduplication") && !isChecked;
							}
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "IsDuplicateAction",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions",
				"values": {
					"className": "Terrasoft.Button",
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"caption": resources.localizableStrings.IsDuplicateCaption,
					"tag": "IsDuplicate",
					"visible": {
						"bindTo": "isChecked",
						"bindConfig": {
							"converter": function(value) {
								var isChecked = value || false;
								return Terrasoft.Features.getIsDisabled("ESDeduplication") && isChecked;
							}
						}
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


