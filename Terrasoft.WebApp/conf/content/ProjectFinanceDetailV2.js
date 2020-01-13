Terrasoft.configuration.Structures["ProjectFinanceDetailV2"] = {innerHierarchyStack: ["ProjectFinanceDetailV2"], structureParent: "BaseGridDetailV2"};
define('ProjectFinanceDetailV2Structure', ['ProjectFinanceDetailV2Resources'], function(resources) {return {schemaUId:'b688400b-db09-447a-bfed-7edeb1a9ab1d',schemaCaption: "ProjectFinanceDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'ProjectFinanceDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProjectFinanceDetailV2", ["ProjectFinanceDetailV2Resources", "terrasoft", "ProjectUtilities"],
	function(resources, Terrasoft) {
		return {
			entitySchemaName: "Project",
			mixins: {
				/**
				 * ######## ######## ######## ###### ## #######
				 */
				"ProjectUtilities": "Terrasoft.ProjectUtilities"
			},
			attributes: {
				/**
				 * ####### ######### ##########
				 */
				"Significative": {
					"caption": resources.localizableStrings.SignificativeCaption,
					"dataValueType": Terrasoft.DataValueType.TEXT
				},
				/**
				 * ####### ######### ##########
				 */
				"Plan": {
					"caption": resources.localizableStrings.PlanCaption,
					"dataValueType": Terrasoft.DataValueType.FLOAT
				},
				/**
				 * ####### ############ ##########
				 */
				"Fact": {
					"caption": resources.localizableStrings.FactCaption,
					"dataValueType": Terrasoft.DataValueType.FLOAT
				},
				/**
				 * ####### ########## ##########
				 */
				"Deviation": {
					"caption": resources.localizableStrings.DeviationCaption,
					"dataValueType": Terrasoft.DataValueType.FLOAT
				},
				/**
				 * ####### ########## ########## # %
				 */
				"DeviationProc": {
					"caption": resources.localizableStrings.DeviationProcCaption,
					"dataValueType": Terrasoft.DataValueType.FLOAT
				}
			},
			methods: {

				/**
				 * ############### #######
				 * @protected
				 * @overridden
				 */
				init: function() {
					this.mixins.ProjectUtilities.init.call(this);
					this.callParent(arguments);
				},

				/**
				 * ########## ###### ####### ########, ####### ######## ########, # ## ### #######
				 * @protected
				 * @virtual
				 * @returns {String[]} ########## ###### ####### ########, ####### ######## ########, # ## ### #######
				 */
				getDecouplingValueColumns: function() {
					return ["Significative"];
				},

				/**
				 * ########## ######-######## #### ####### # #######
				 * @protected
				 * @virtual
				 * @returns {Object} ########## ######-######## #### ####### # #######
				 */
				getGridValuesDecoupling: function() {
					return {
						Significative: [
							this.get("Resources.Strings.IncomeCaption"),
							this.get("Resources.Strings.ExternalCostCaption"),
							this.get("Resources.Strings.ExpenseCaption"),
							this.get("Resources.Strings.InternalCostCaption"),
							this.get("Resources.Strings.MarginCaption"),
							this.get("Resources.Strings.MarginPercCaption")
						],
						Plan: ["PlanIncome", "PlanExpense", "PlanExternalCost",
							"PlanInternalCost", "PlanMargin", "PlanMarginPerc"],
						Fact: ["FactIncome", "FactExpense", "FactExternalCost",
							"FactInternalCost", "FactMargin", "FactMarginPerc"],
						Deviation: ["IncomeDev", "ExpenseDev", "ExternalCostDev",
							"InternalCostDev", "MarginDev", ""],
						DeviationProc: ["IncomeDevPerc", "ExpenseDevPerc", "PlanExternalDevPerc",
							"PlanInternalDevPerc", "MarginDevPerc", ""]
					};
				},

				/**
				 * ######### ####### ########## ########### # ######
				 * @protected
				 * @overridden
				 * @param {Terrasoft.EntitySchemaQuery} esq ######, # ####### ##### ################### #######
				 */
				initQueryColumns: function(esq) {
					var decoupling = this.getGridValuesDecoupling();
					var decouplingValueColumns = this.getDecouplingValueColumns();
					Terrasoft.each(decoupling, function(columnDecoupling, decouplingName) {
						if (decouplingValueColumns.indexOf(decouplingName) !== -1) {
							return;
						}
						Terrasoft.each(columnDecoupling, function(columnName) {
							if (columnName && !esq.columns.contains(columnName)) {
								esq.addColumn(columnName);
							}
						}, this);
					}, this);
				},

				/**
				 * ######## ##########
				 * @protected
				 * @overridden
				 */
				initQuerySorting: Terrasoft.emptyFn,

				/**
				 * ######## ##############, #############
				 * @protected
				 * @overridden
				 */
				initQueryOptions: Terrasoft.emptyFn,

				/**
				 * ############ ########### ######. ######### # ###### ############## ######### ########## ###########
				 * # ###### ########### ########.
				 * @protected
				 * @overridden
				 */
				onGridDataLoaded: function(response) {
					this.afterLoadGridData();
					if (!response.success) {
						return;
					}
					var dataCollection = response.collection;
					if (dataCollection.isEmpty()) {
						return;
					}
					var currentProject = dataCollection.getByIndex(0);
					var columnValues = this.prepareGridCollection(currentProject);
					columnValues.each(function(item) {
						Terrasoft.each(item.columns, function(column) {
							column.columnPath = column.caption;
							this.addColumnLink(item, column);
						}, this);
					}, this);
					var gridData = this.getGridData();
					gridData.clear();
					gridData.loadAll(columnValues);
				},

				/**
				 * ######### ######### #########
				 * @protected
				 * @virtual
				 * @param {Terrasoft.BaseViewModel} project ######### #######
				 */
				prepareGridCollection: function(project) {
					var decoupling = this.getGridValuesDecoupling();
					var result = Terrasoft.mapObjectToCollection(decoupling);
					var decouplingValueColumns = this.getDecouplingValueColumns();
					var collection = this.Ext.create("Terrasoft.Collection");
					Terrasoft.each(result, function(columnValues) {
						Terrasoft.each(columnValues, function(columnValue, columnName) {
							if (decouplingValueColumns.indexOf(columnName) !== -1) {
								return;
							}
							columnValues[columnName] = columnValue && (project.get(columnValue) || 0);
						}, this);
						collection.add(Terrasoft.generateGUID(), this.createFinanceItem(columnValues));
					}, this);

					return collection;
				},

				/**
				 * ####### ###### ######
				 * @param {Object} values ###### ######## ######
				 * @returns {Terrasoft.BaseViewModel} ########## ###### ######
				 */
				createFinanceItem: function(values) {
					return this.Ext.create("Terrasoft.BaseViewModel", {
						name: "FinanceItem",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Significative",
						columns: {
							Id: {dataValueType: Terrasoft.DataValueType.GUID},
							Significative: {caption: "Significative", dataValueType: Terrasoft.DataValueType.TEXT},
							Plan: {caption: "Plan", dataValueType: Terrasoft.DataValueType.FLOAT},
							Fact: {caption: "Fact", dataValueType: Terrasoft.DataValueType.FLOAT},
							Deviation: {caption: "Deviation", dataValueType: Terrasoft.DataValueType.FLOAT},
							DeviationProc: {caption: "DeviationProc", dataValueType: Terrasoft.DataValueType.FLOAT}
						},
						values: values
					});
				},

				/**
				 * ######### ####### ########## ###########
				 * @protected
				 * @virtual
				 */
				calculateProjectCollectionFinance: function() {
					var masterRecordId = this.get("MasterRecordId");
					this.CalculateProjectFinance([masterRecordId], function() {
						this.loadGridData();
					}, this);
				}

			},
			diff: /**SCHEMA_DIFF*/[
				{
					operation: "remove",
					name: "ToolsButton"
				},
				{
					"operation": "insert",
					"name": "AddTypedRecordButton",
					"parentName": "Detail",
					"propertyName": "tools",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": {
							"bindTo": "Resources.Images.Calculate"
						},
						"click": {"bindTo": "calculateProjectCollectionFinance"},
						"visible": {"bindTo": "getToolsVisible"},
						"hint": {"bindTo": "Resources.Strings.ReCalcButtonCaption"}
					}
				},
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"type": "listed",
						"listedConfig": {
							"name": "DataGridListedConfig",
							"items": [
								{
									"name": "SignificativeListedGridColumn",
									"bindTo": "Significative",
									"position": {
										"column": 1,
										"colSpan": 8
									}
								},
								{
									"name": "PlanListedGridColumn",
									"bindTo": "Plan",
									"position": {
										"column": 9,
										"colSpan": 4
									}
								},
								{
									"name": "FactListedGridColumn",
									"bindTo": "Fact",
									"position": {
										"column": 13,
										"colSpan": 4
									}
								},
								{
									"name": "DeviationListedGridColumn",
									"bindTo": "Deviation",
									"position": {
										"column": 17,
										"colSpan": 4
									}
								},
								{
									"name": "DeviationProcListedGridColumn",
									"bindTo": "DeviationProc",
									"position": {
										"column": 21,
										"colSpan": 4
									}
								}
							]
						},
						"tiledConfig": {
							"name": "DataGridTiledConfig",
							"grid": {
								"columns": 24,
								"rows": 3
							},
							"items": [
								{
									"name": "SignificativeTiledGridColumn",
									"bindTo": "Significative",
									"position": {
										"row": 1,
										"column": 1,
										"colSpan": 8
									}
								},
								{
									"name": "PlanTiledGridColumn",
									"bindTo": "Plan",
									"position": {
										"row": 1,
										"column": 9,
										"colSpan": 4
									}
								},
								{
									"name": "FactTiledGridColumn",
									"bindTo": "Fact",
									"position": {
										"row": 1,
										"column": 13,
										"colSpan": 4
									}
								},
								{
									"name": "DeviationTiledGridColumn",
									"bindTo": "Deviation",
									"position": {
										"row": 1,
										"column": 17,
										"colSpan": 4
									}
								},
								{
									"name": "DeviationProcTiledGridColumn",
									"bindTo": "DeviationProc",
									"position": {
										"row": 1,
										"column": 21,
										"colSpan": 4
									}
								}
							]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


