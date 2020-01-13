Terrasoft.configuration.Structures["ProjectSectionV2"] = {innerHierarchyStack: ["ProjectSectionV2"], structureParent: "BaseSectionV2"};
define('ProjectSectionV2Structure', ['ProjectSectionV2Resources'], function(resources) {return {schemaUId:'7e6d3506-603b-480a-b90a-9ff75f64c249',schemaCaption: "ProjectSectionV2", parentSchemaName: "BaseSectionV2", schemaName:'ProjectSectionV2',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProjectSectionV2", ["BaseFiltersGenerateModule", "ProjectGridRowViewModel", "ProjectUtilities"],
function(BaseFiltersGenerateModule) {
	return {
		entitySchemaName: "Project",
		mixins: {
			/**
			 * Contains method for project values calculations.
			 */
			ProjectUtilities: "Terrasoft.ProjectUtilities"
		},
		methods: {

			/**
			 * @inheritDoc Terrasoft.BaseSectionV2#init
			 * @overridden
			 */
			init: function() {
				this.mixins.ProjectUtilities.init.call(this);
				this.callParent(arguments);
			},

			/**
			 * @inheritDoc Terrasoft.BaseSectionV2#getSectionActions
			 * @overridden
			 */
			getSectionActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Type": "Terrasoft.MenuSeparator",
					"Caption": ""
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": { "bindTo": "Resources.Strings.CalculateFinanceCaption" },
					"Click": { "bindTo": "CalculateProjectCollectionFinance" },
					"Enabled": {"bindTo": "isAnySelected"}
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Type": "Terrasoft.MenuSeparator",
					"Caption": { "bindTo": "Resources.Strings.ManpowerGroupCaption" }
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": { "bindTo": "Resources.Strings.CountManpowerCaption" },
					"Click": { "bindTo": "CalculateProjectCollectionActualWork" },
					"Enabled": {"bindTo": "isAnySelected"}
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": { "bindTo": "Resources.Strings.CalculatePlanManpowerCaption" },
					"Click": { "bindTo": "CalculateProjectCollectionLaborPlan" },
					"Enabled": {"bindTo": "isAnySelected"}
				}));
				return actionMenuItems;
			},

			/**
			 * Forms fixed filters for section data.
			 * @param {Object} filterInfo - Filter data.
			 * @param {Object} filterInfo.startDate Project start date.
			 * @param {Object} filterInfo.dueDate Project due data.
			 * @return {Terrasoft.FilterGroup} Formed filters.
			 */
			getFixedFilters:  function(filterInfo) {
				var startDate = filterInfo.startDate.value;
				var dueDate = filterInfo.dueDate.value;
				if (!startDate && !dueDate) {
					return null;
				}
				var startDateColumnName = filterInfo.startDate.columnName;
				var dueDateColumnName = filterInfo.dueDate.columnName;
				var filter = this.Ext.create("Terrasoft.FilterGroup");
				var periodFilterCollection = this.Ext.create("Terrasoft.FilterGroup");
				periodFilterCollection.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
				if (startDate) {
					filter.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
					var endPeriodFilterCollection = this.Ext.create("Terrasoft.FilterGroup");
					endPeriodFilterCollection.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
					endPeriodFilterCollection.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.GREATER_OR_EQUAL, dueDateColumnName,
						this.Terrasoft.startOfDay(startDate))
					);
					endPeriodFilterCollection.addItem(this.Terrasoft.createColumnIsNotNullFilter(startDateColumnName));

					filter.addItem(endPeriodFilterCollection);

					var nullEndPeriodFilterCollection = Ext.create("Terrasoft.FilterGroup");
					nullEndPeriodFilterCollection.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
					nullEndPeriodFilterCollection.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.GREATER_OR_EQUAL, startDateColumnName,
						this.Terrasoft.startOfDay(startDate)));
					nullEndPeriodFilterCollection.addItem(this.Terrasoft.createColumnIsNullFilter(dueDateColumnName));

					filter.addItem(nullEndPeriodFilterCollection);

					periodFilterCollection.add(dueDateColumnName, filter);
				}
				if (dueDate) {
					filter = this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.LESS_OR_EQUAL, startDateColumnName,
						this.Terrasoft.endOfDay(dueDate));
					periodFilterCollection.addItem(filter);
				}
				if (startDate && dueDate) {
					filter = periodFilterCollection;
				}
				var finalFilter = this.Ext.create("Terrasoft.FilterGroup");
				finalFilter.add("fixedProjectFilters", filter);

				return finalFilter;
			},

			/**
			 * @inheritDoc Terrasoft.BaseSectionV2#initFixedFiltersConfig
			 * @overridden
			 */
			initFixedFiltersConfig: function() {
				var fixedFilterConfig = {
					entitySchema: this.entitySchema,
					filters: [
						{
							name: "PeriodFilter",
							caption: this.get("Resources.Strings.PeriodFilterCaption"),
							dataValueType: this.Terrasoft.DataValueType.DATE,
							columnName: "StartDate",
							startDate: {
								columnName: "StartDate"
							},
							dueDate: {
								columnName: "EndDate"
							},
							getFilter: this.getFixedFilters.bind(this)
						},
						{
							name: "Owner",
							caption: this.get("Resources.Strings.OwnerFilterCaption"),
							dataValueType: this.Terrasoft.DataValueType.LOOKUP,
							filter: BaseFiltersGenerateModule.OwnerFilter,
							columnName: "Owner"
						}
					]
				};
				this.set("FixedFilterConfig", fixedFilterConfig);
			},

			/**
			 * @inheritDoc Terrasoft.BaseSectionV2#getGridRowViewModelClassName
			 * @overridden
			 */
			getGridRowViewModelClassName: function() {
				return "Terrasoft.ProjectGridRowViewModel";
			},

			/**
			 * @inheritDoc Terrasoft.BaseSectionV2#onActiveRowAction
			 * @overridden
			 */
			onActiveRowAction: function(buttonTag, primaryColumnValue) {
				this.callParent(arguments);
				switch (buttonTag) {
					case "CalculateProjectFinance":
						this.CalculateProjectCollectionFinance([primaryColumnValue]);
						break;
					case "CalculateProjectActualWork":
						this.CalculateProjectCollectionActualWork([primaryColumnValue]);
						break;
					case "CalculateProjectLaborPlan":
						this.CalculateProjectCollectionLaborPlan([primaryColumnValue]);
						break;
				}
			},

			/**
			 * Removes sub project edit page.
			 * @overridden
			 */
			initEditPages: function() {
				this.callParent(arguments);
				var editPages = this.get("EditPages");
				var pages = editPages.clone();
				editPages.clear();
				pages.each(function(editPage) {
					var editPageSchemaName = editPage.get("SchemaName");
					if (editPageSchemaName !== "WorkPageV2") {
						var projectEditPageKey = editPage.get("Id");
						editPages.add(projectEditPageKey, editPage);
					}
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.BaseSectionV2#addRecord
			 * @overridden
			 */
			addRecord: function(typeColumnValue) {
				if (!typeColumnValue) {
					var editPages = this.get("EditPages");
					typeColumnValue = editPages.getByIndex(0).get("Tag");
					this.callParent([typeColumnValue]);
				} else {
					this.callParent(arguments);
				}
			},

			/**
			 * @inheritDoc Terrasoft.BaseSectionV2#getFilters
			 * @overridden
			 */
			getFilters: function() {
				var filters = this.callParent(arguments);
				filters.add("FirstProjectFilter",
					this.Terrasoft.createColumnIsNullFilter(this.entitySchema.hierarchicalColumnName));
				return filters;
			},

			/**
			 * Initializes context help information.
			 * @overridden
			 * @protected
			 */
			initContextHelp: function() {
				this.set("ContextHelpId", 1021);
				this.callParent(arguments);
			},

			/**
			 * Reloads grid data by array of project identifiers.
			 * @protected
			 * @virtual
			 * @param {String[]} projects Array of projects identifiers.
			 */
			reloadItems: function(keys) {
				this.Terrasoft.each(keys, function(key) {
					this.loadGridDataRecord(key);
				}, this);
			},

			/**
			 * Performs calculation of project finances.
			 * @protected
			 * @virtual
			 * @param {String[]} projects Array of projects identifiers.
			 */
			CalculateProjectCollectionFinance: function(projects) {
				projects = projects || this.getSelectedItems();
				if (!Ext.isEmpty(projects)) {
					this.CalculateProjectFinance(projects, function() {
						this.reloadItems(projects);
					}, this);
				}
			},

			/**
			 * Performs calculation of labor plan.
			 * @protected
			 * @virtual
			 * @param {String[]} projects Array of projects identifiers.
			 */
			CalculateProjectCollectionLaborPlan: function(projects) {
				projects = projects || this.getSelectedItems();
				if (!Ext.isEmpty(projects)) {
					this.CalculateProjectLaborPlan(projects, function() {
						this.reloadItems(projects);
					}, this);
				}
			},

			/**
			 * Performs calculation on actual work.
			 * @protected
			 * @virtual
			 * @param {String[]} projects Array of projects identifiers.
			 */
			CalculateProjectCollectionActualWork: function(projects) {
				projects = projects || this.getSelectedItems();
				if (!Ext.isEmpty(projects)) {
					this.CalculateProjectActualWork(projects, function() {
						this.reloadItems(projects);
					}, this);
				}
			},

			/**
			 * @inheritDoc Terrasoft.BaseSectionV2#copyRecord
			 * @override
			 */
			copyRecord: function(primaryColumnValue, ignoreConfirmation) {
				if (ignoreConfirmation === true) {
					this.callParent(arguments);
				} else {
					this.showConfirmationDialog(
						this.get("Resources.Strings.CopyProjectStructure"),
						this.handleCopyWithStructureConfirmationResult.bind(this, primaryColumnValue),
						[this.Terrasoft.MessageBoxButtons.YES, this.Terrasoft.MessageBoxButtons.NO]
					);
				}
			},

			/**
			 * Handles confirmation result on copy action.
			 * @protected
			 * @param primaryColumnValue - record id.
			 * @param result - confirmation result.
			 */
			handleCopyWithStructureConfirmationResult: function(primaryColumnValue, result) {
				if (result === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
					this.copyProject(primaryColumnValue);
				} else {
					this.copyRecord(primaryColumnValue, true);
				}
			},

			/**
			 * Copy project with hierarchy.
			 * @protected
			 * @param projectId - project identifier.
			 */
			copyProject: function(projectId) {
				var callServiceConfig = {
					serviceName: "ProjectUtilitiesService",
					methodName: "CopyProjectWithStructure",
					data: {
						"projectId": projectId
					}
				};
				this.callService(callServiceConfig, this.handleServiceCopyResponse, this);
			},

			/**
			 * Opens edit page after project copying.
			 * @protected
			 * @param response - service response.
			 */
			handleServiceCopyResponse: function(response) {
				if (!response.success || response.success !== true) {
					this.log(response.errorInfo, Terrasoft.LogMessageType.ERROR);
					return;
				}
				var recordId = response.CreatedProjectId;
				if (this.Terrasoft.isGUID(recordId) && !this.Terrasoft.isEmptyGUID(recordId)) {
					this.editRecord(recordId);
				}
			}
		},
		diff: /**SCHEMA_DIFF*/[
			//				DataGridActiveRowCopyAction
			{
				"operation": "insert",
				"name": "DataGridActiveRowActionsAction",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions",
				"values": {
					"className": "Terrasoft.Button",
					"style": Terrasoft.controls.ButtonEnums.style.GREY,
					"caption": { "bindTo": "Resources.Strings.ActionsButtonCaption" },
					"menu": {
						"items": [{
							"tag": "CalculateProjectFinance",
							"caption": { "bindTo": "Resources.Strings.CalculateFinanceCaption" }
						}, {
							"tag": "CalculateProjectActualWork",
							"caption": { "bindTo": "Resources.Strings.CountManpowerCaption" }
						}, {
							"tag": "CalculateProjectLaborPlan",
							"caption": { "bindTo": "Resources.Strings.CalculatePlanManpowerCaption" }
						}]
					}
				}
			}
		]/**SCHEMA_DIFF*/,
		userCode: {}
	};
});


