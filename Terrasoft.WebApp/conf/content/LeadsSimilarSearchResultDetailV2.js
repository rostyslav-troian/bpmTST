Terrasoft.configuration.Structures["LeadsSimilarSearchResultDetailV2"] = {innerHierarchyStack: ["LeadsSimilarSearchResultDetailV2"], structureParent: "BaseGridDetailV2"};
define('LeadsSimilarSearchResultDetailV2Structure', ['LeadsSimilarSearchResultDetailV2Resources'], function(resources) {return {schemaUId:'62f7f0c1-9524-4ddd-b8ec-a85c836f75cf',schemaCaption: "Detail - Similar leads search result", parentSchemaName: "BaseGridDetailV2", schemaName:'LeadsSimilarSearchResultDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LeadsSimilarSearchResultDetailV2", ["ServiceHelper", "ControlGridModule", "BaseProgressBarModule",
		"css!BaseProgressBarModule"],
	function(ServiceHelper) {
		return {
			entitySchemaName: "Lead",
			attributes: {
				/**
				 * Display registry flag.
				 * @type {Boolean}
				 */
				CanShowDataGrid: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN
				}
			},
			methods: {

				/**
				 * Returns the Add button visibility.
				 * @overridden
				 */
				getAddRecordButtonVisible: function() {
					return false;
				},

				/**
				 * Return similar lead filter name.
				 * @return {string} Filter name.
				 */
				getSimilarLeadFilterName: function() {
					return "SimilarLeadRecordFilter";
				},

				/**
				 * Add custom filters.
				 * @param {Terrasoft.Collection} filters Filters list.
				 */
				addCustomFilters: function(filters) {
					var currentFilters = this.getFilters();
					var customFilters = currentFilters.find("CustomFilters");
					if (!Ext.isEmpty(customFilters)) {
						filters.add(customFilters);
					}
				},

				/**
				* Add similar lead filter.
				* @param {Terrasoft.Collection} filters Filters list.
				* @param {Array} ids Collection of entity identifiers.
				*/
				addSimilarFilter: function(filters, ids) {
					var filterName = this.getSimilarLeadFilterName();
					var similarFilter = this.Terrasoft.createColumnInFilterWithParameters(
						"Id", ids);
					similarFilter.Name = filterName;
					filters.add(filterName, similarFilter);
				},

				/**
				 * Analize service response and set similar lead filter for detail.
				 * @param {String} response Service response.
				 */
				setSimilarLeadFilter: function(response) {
					if (response) {
						var similarLeadResult = [];
						if (this.getIsFeatureEnabled("ESDeduplication")) {
							var duplicatesOnSaveResult = response.FindSimilarLeadsResult;
							var similarLeadCollection = JSON.parse(duplicatesOnSaveResult);
							if (!Ext.isEmpty(similarLeadCollection)) {
								similarLeadCollection.forEach(function(item) {
									similarLeadResult.push(item.Id);
								}.bind(this));
							}
						} else {
							similarLeadResult = response.FindRecordsSimilarLeadResult;
						}
						if (!Ext.isEmpty(similarLeadResult)) {
							var filterGroup = Terrasoft.createFilterGroup();
							this.addSimilarFilter(filterGroup, similarLeadResult);
							this.addCustomFilters(filterGroup);
							this.set("Filter", filterGroup);
							this.loadGridData();
						} else {
							var gridData = this.getGridData();
							gridData.clear();
							var emptyCollection = Ext.create("Terrasoft.Collection");
							this.set("CanShowDataGrid", false);
							this.initIsGridEmpty(emptyCollection);
						}
					}
				},

				/**
				 * Check if similar lead filter is set.
				 * @param {Object} filters Detail filters.
				 */
				isSimilarLeadFilterExists: function(filters) {
					var similarLeadFilterName = this.getSimilarLeadFilterName();
					if (Ext.isEmpty(filters)) {
						return false;
					}
					var masterRecordFilter = filters.find("masterRecordFilter");
					if (Ext.isEmpty(masterRecordFilter)) {
						return false;
					}
					var similarLeadFilter = masterRecordFilter.find && masterRecordFilter.find(similarLeadFilterName);
					return !Ext.isEmpty(similarLeadFilter);
				},

				/**
				 * Add filters and load grid data
				 * @protected
				 * @virtual
				 */
				loadGridData: function() {
					var filters = this.getFilters();
					if (this.isSimilarLeadFilterExists(filters)) {
						this.callParent(arguments);
						return;
					}
					var masterRecordId = this.get("MasterRecordId");
					var config = {
						"schemaName": "Lead",
						"leadId": masterRecordId
					};
					this.callDeduplicationLeadServiceMethod("FindRecordsSimilarLead",
						this.setSimilarLeadFilter, config);
				},

				/**
				 * Call method of deduplication lead service.
				 * @param {String} methodName Name of method.
				 * @param {Function} callback Callback function.
				 * @param {Object} config Additional parameters.
				 */
				callDeduplicationLeadServiceMethod: function(methodName, callback, config) {
					if (this.getIsFeatureEnabled("ESDeduplication")) {
						var data = this.getElasticDuplicatesServiceData();
						this.callService({
							data: data,
							serviceName: "DeduplicationServiceV2",
							methodName: "FindSimilarLeads",
							encodeData: false
						}, this.setSimilarLeadFilter.bind(this), this);
					} else {
						ServiceHelper.callService("LeadService", methodName, callback, config, this);
					}
				},

				/**
				 * @inheritdoc Terrasoft.DuplicatesSearchUtilitiesV2#getDeduplicationViewDataColumns
				 * @override
				 */
				getDeduplicationViewDataColumns: function() {
					return ["Id"];
				},

				/**
				 * @inheritdoc Terrasoft.DuplicatesSearchUtilitiesV2#getDuplicateSchemaName
				 * @override
				 */
				getDuplicateSchemaName: function() {
					return "Lead";
				},

				/**
				 * @inheritdoc Terrasoft.DuplicatesSearchUtilitiesV2#getDeduplicationSettings
				 * @override
				 */
				getDeduplicationSettings: function() {
					var deduplicationRules = Terrasoft.configuration.DeduplicationSettings[this.getDuplicateSchemaName()];
					var activeAtSaveRules = deduplicationRules ? deduplicationRules : [];
					return activeAtSaveRules.IsActive ? activeAtSaveRules.DeduplicationColumns : [];
				},

				/**
				 * @inheritdoc Terrasoft.DuplicatesSearchUtilitiesV2#getPrimaryColumnValue
				 * @override
				 */
				getPrimaryColumnValue: function() {
					var entitySchema = Terrasoft[this.getDuplicateSchemaName()];
					var parentPrimaryColumn = this._getParentColumn(entitySchema.primaryColumnName);
					return parentPrimaryColumn || null;
				},

				_getParentColumn: function(columnName) {
					var columnValues = this.sandbox.publish("GetColumnsValues", [columnName], [this.sandbox.id]);
					return columnValues[columnName];
				},

				/**
				 * @inheritdoc Terrasoft.DuplicatesSearchUtilitiesV2#getFilterValue
				 * @override
				 */
				getFilterValue: function(filter) {
					var parentColumn = this._getParentColumn(filter.columnName);
					return [parentColumn && parentColumn.value || parentColumn];
				},

				/**
				 * Apply QualifyStatus control config.
				 * @param {Object} control Object which contain control config.
				 * @overridden
				 */
				applyControlConfig: function(control) {
					control.config = {
						className: "Terrasoft.BaseProgressBar",
						value: {
							"bindTo": "QualifyStatus",
							"bindConfig": {"converter": "getQualifyStatusValue"}
						},
						width: "158px"
					};
				},

				/**
				 * Add method, which return link-config.
				 * @overridden
				 * @param {Terrasoft.BaseViewModel} item Registry item.
				 * @return {Object} URL.
				 */
				addColumnLink: function(item) {
					item.getQualifyStatusValue = function(qualifyStatus) {
						if (!qualifyStatus) {
							return null;
						} else {
							return {
								value: this.get("QualifyStatus.StageNumber"),
								displayValue: qualifyStatus.displayValue
							};
						}
					};
					return this.callParent(arguments);
				},

				/**
				 * Return columns which always return in response.
				 * @protected
				 * @overriden
				 * @return {Object} Array of colunm configuration items.
				 */
				getGridDataColumns: function() {
					var gridDataColumns = this.callParent(arguments);
					gridDataColumns["QualifyStatus.StageNumber"] =
						gridDataColumns["QualifyStatus.StageNumber"] || {path: "QualifyStatus.StageNumber"};
					return gridDataColumns;
				},

				getIsCanShowDataGrid: function(canShowDataGrid) {
					return !canShowDataGrid;
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilterDefaultColumnName
				 * @overridden
				 */
				getFilterDefaultColumnName: function() {
					return "LeadType";
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#addDetailWizardMenuItems
				 * @overridden
				 */
				addDetailWizardMenuItems: this.Terrasoft.emptyFn

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "DataGrid"
				},
				{
					"operation": "insert",
					"name": "DataGrid",
					"parentName": "Detail",
					"propertyName": "items",
					"index": 0,
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID,
						"listedZebra": true,
						"collection": {"bindTo": "Collection"},
						"activeRow": {"bindTo": "ActiveRow"},
						"primaryColumnName": "Id",
						"isEmpty": {"bindTo": "IsGridEmpty"},
						"isLoading": {"bindTo": "IsGridLoading"},
						"multiSelect": {"bindTo": "MultiSelect"},
						"selectedRows": {"bindTo": "SelectedRows"},
						"sortColumn": {"bindTo": "sortColumn"},
						"sortColumnDirection": {"bindTo": "GridSortDirection"},
						"sortColumnIndex": {"bindTo": "SortColumnIndex"},
						"linkClick": {"bindTo": "linkClicked"},
						"className": "Terrasoft.ControlGrid",
						"controlColumnName": "QualifyStatus",
						"applyControlConfig": {"bindTo": "applyControlConfig"},
						"controlWrapClass": "progress-bar-control-wrap"
					}
				},
				{
					"operation": "insert",
					"name": "EmptyEntityLabel",
					"parentName": "Detail",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"classes": {
							"labelClass": ["t-label ts-empty-entity-label"]
						},
						"caption": {"bindTo": "Resources.Strings.EmptyEntityLabel"},
						"visible": {
							"bindTo": "CanShowDataGrid",
							"bindConfig": {"converter": "getIsCanShowDataGrid"}
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


