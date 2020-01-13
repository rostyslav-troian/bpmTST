Terrasoft.configuration.Structures["PortalPartnershipPage"] = {innerHierarchyStack: ["PortalPartnershipPage"], structureParent: "BaseSectionPage"};
define('PortalPartnershipPageStructure', ['PortalPartnershipPageResources'], function(resources) {return {schemaUId:'995f835b-b344-44f7-9e18-f66cc2f0e28d',schemaCaption: "Edit page: \"Partnership\"", parentSchemaName: "BaseSectionPage", schemaName:'PortalPartnershipPage',parentSchemaUId:'d7862464-6710-4c5c-b896-e8187803dd6e',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalPartnershipPage", ["PRMEnums", "css!PartnershipCommonCSS"], function() {
	return {
		entitySchemaName: "Partnership",
		attributes: {
			/**
			 * Partnership margin.
			 * @type {Float}
			 */
			"Margin": {
				"dataValueType": Terrasoft.DataValueType.FLOAT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"caption": {
					"bindTo": "Resources.Strings.MarginCaption"
				}
			},
			"MarketingActivities": {
				"dataValueType": Terrasoft.DataValueType.INTEGER,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"caption": {
					"bindTo": "Resources.Strings.MarketingActivitiesCaption"
				}
			},
			/**
			 * Partnership total sales.
			 * @type {Integer}
			 */
			"TotalSales": {
				"dataValueType": Terrasoft.DataValueType.FLOAT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"caption": {
					"bindTo": "Resources.Strings.TotalSalesCaption"
				}
			},
			/**
			 * Partnership certified employees.
			 * @type {Integer}
			 */
			"CertifiedEmployees": {
				"dataValueType": Terrasoft.DataValueType.INTEGER,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"caption": {
					"bindTo": "Resources.Strings.CertifiedEmployeesCaption"
				}
			},
			/**
			 * Partnership current score.
			 * @type {Integer}
			 */
			"CurrentScore": {
				"dataValueType": Terrasoft.DataValueType.INTEGER,
				"value": 0
			},
			/**
			 * Partnership max current score.
			 * @type {Integer}
			 */
			"MaxCurrentScore": {
				"dataValueType": Terrasoft.DataValueType.INTEGER,
				"value": 0
			},
			/**
			 * Partnership current level.
			 * @type {Integer}
			 */
			"CurrentLevel": {
				"dataValueType": Terrasoft.DataValueType.INTEGER,
				"value": 0
			},
			/**
			 * Partnership max current level.
			 * @type {Integer}
			 */
			"MaxCurrentLevel": {
				"dataValueType": Terrasoft.DataValueType.INTEGER,
				"value": 0
			},
			/**
			 * Partner level.
			 */
			"PartnerLevel": {
				"lookupListConfig": {
					"columns": ["Number", "TargetScore"]
				}
			},
			/**
			 * Partner level.
			 */
			"PartnerType": {
				"dependencies": [
					{
						"columns": ["PartnerType"],
						"methodName": "onPartnerTypeChange"
					}
				]
			},
			/**
			 * Partnership start date.
			 */
			"StartDate": {
				"dependencies": [
					{
						"columns": ["StartDate"],
						"methodName": "onStartDateChange"
					}
				]
			},
			/**
			 * @inheritDoc BaseDataView#UseTagModule
			 */
			"UseTagModule": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"EducationAndCertificate": {
				"schemaName": "EducationAndCertificateDetail",
				"filter": {
					"masterColumn": "Account",
					"detailColumn": "Contact.Account"
				}
			},
			"PartnershipLeadDetail": {
				"schemaName": "PartnershipLeadDetail",
				"entitySchemaName": "Lead",
				"filter": {
					"detailColumn": "Partner",
					"masterColumn": "Account"
				}
			},
			"PartnershipParameterDetail": {
				"schemaName": "PartnershipParameterDetail",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "Partnership"
				}
			},
			"PartnershipAttachmentsDetail": {
				"schemaName": "PartnershipAttachmentsDetail",
				"entitySchemaName": "PartnershipFile",
				"filter": {
					"detailColumn": "Partnership",
					"masterColumn": "Id"
				}
			},
			"PartnershipOpportunityDetail": {
				"schemaName": "PartnershipOpportunityDetail",
				"entitySchemaName": "Opportunity",
				"filter": {
					"detailColumn": "Partner",
					"masterColumn": "Account"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#getEntitySchemaQuery
			 * @overridden
			 */
			getEntitySchemaQuery: function() {
				var esq = this.callParent(arguments);
				this.addCurrentScoreColumn(esq);
				this.addMaxCurrentLevelColumn(esq);
				this.addMarginColumn(esq);
				this.addTotalSalesColumn(esq);
				this.addCertifiedEmployeesColumn(esq);
				this.addMarketingActivitiesColumn(esq);
				return esq;
			},

			/**
			 * Adds total Marketing Activities Column to esq.
			 * @protected
			 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
			 */
			addMarketingActivitiesColumn: function(esq) {
				var expressionConfig = {
					columnPath: "[PartnershipParameter:Partnership].IntValue",
					parentCollection: this
				};
				var column = Ext.create("Terrasoft.SubQueryExpression", expressionConfig);
				var marketingActivityFilter = Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "PartnerParamCategory",
					Terrasoft.PRMEnums.PartnerParamCategory.MarketingActivities);
				column.subFilters.addItem(marketingActivityFilter);
				var partnershipParameterTypeFilter = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					"PartnershipParameterType", Terrasoft.PRMEnums.PartnershipParamType.Current);
				column.subFilters.addItem(partnershipParameterTypeFilter);
				var parameterTypeFilter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"ParameterType", Terrasoft.PRMEnums.ParameterType.Obligation);
				column.subFilters.addItem(parameterTypeFilter);
				var esqColumn = esq.addColumn("MarketingActivities");
				esqColumn.expression = column;
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#setColumnValues
			 * @overridden
			 */
			setColumnValues: function(entity) {
				this.set("MaxCurrentScore", entity.get("PartnerLevel.TargetScore"));
				this.set("CurrentScore", entity.get("CurrentScore"));
				this.set("MaxCurrentLevel", entity.get("MaxCurrentLevel"));
				this.set("CurrentLevel", entity.get("PartnerLevel.Number"));
				this.set("Margin", entity.get("Margin"));
				this.set("TotalSales", entity.get("TotalSales"));
				this.set("CertifiedEmployees", entity.get("CertifiedEmployees"));
				this.set("MarketingActivities", entity.get("MarketingActivities"));
				this.callParent(arguments);
			},

			/**
			 * Returns current date.
			 * @protected
			 * @return {Date}
			 */
			getCurrentDate: function() {
				return this.Terrasoft.clearTime(new Date());
			},

			/**
			 * @inheritdoc Terrasoft.configuration.BaseSchemaViewModel#setDefaultValues
			 * @overridden
			 */
			setDefaultValues: function(callback, scope) {
				this.callParent([function() {
					var startDate = this.getCurrentDate();
					var currentDate = new Date();
					var currentYear = currentDate.getFullYear();
					var dueDate = new Date(currentYear + 1, 2, 31);
					this.set("DueDate", dueDate);
					this.set("StartDate", startDate);
					callback.call(scope);
				}, this]);
			},

			/**
			 * Adds max current level column to esq.
			 * @protected
			 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
			 */
			addMaxCurrentLevelColumn: function(esq) {
				esq.addAggregationSchemaColumn("[PartnerLevel:PartnerType:PartnerType].Number",
					Terrasoft.AggregationType.MAX, "MaxCurrentLevel");
			},

			/**
			 * Adds margin column to esq.
			 * @protected
			 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
			 */
			addMarginColumn: function(esq) {
				var expressionConfig = {
					columnPath: "[PartnershipParameter:Partnership].FloatValue",
					parentCollection: this
				};
				var column = Ext.create("Terrasoft.SubQueryExpression", expressionConfig);
				var marginFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"PartnerParamCategory", Terrasoft.PRMEnums.PartnerParamCategory.Margin);
				column.subFilters.addItem(marginFilter);
				var partnershipParameterTypeFilter = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					"PartnershipParameterType", Terrasoft.PRMEnums.PartnershipParamType.Current);
				column.subFilters.addItem(partnershipParameterTypeFilter);
				var parameterTypeFilter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"ParameterType", Terrasoft.PRMEnums.ParameterType.Benefit);
				column.subFilters.addItem(parameterTypeFilter);
				var esqColumn = esq.addColumn("Margin");
				esqColumn.expression = column;
			},

			/**
			 * Adds current score column to esq.
			 * @protected
			 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
			 */
			addCurrentScoreColumn: function(esq) {
				var expressionConfig = {
					columnPath: "[PartnershipParameter:Partnership].Score",
					parentCollection: this,
					aggregationType: Terrasoft.AggregationType.SUM
				};
				var column = Ext.create("Terrasoft.SubQueryExpression", expressionConfig);
				var partnershipParameterTypeFilter = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					"PartnershipParameterType", Terrasoft.PRMEnums.PartnershipParamType.Current);
				column.subFilters.addItem(partnershipParameterTypeFilter);
				var parameterTypeFilter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"ParameterType", Terrasoft.PRMEnums.ParameterType.Obligation);
				column.subFilters.addItem(parameterTypeFilter);
				var esqColumn = esq.addColumn("CurrentScore");
				esqColumn.expression = column;
			},

			/**
			 * Adds total sales column to esq.
			 * @protected
			 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
			 */
			addTotalSalesColumn: function(esq) {
				var expressionConfig = {
					columnPath: "[PartnershipParameter:Partnership].FloatValue",
					parentCollection: this
				};
				var column = Ext.create("Terrasoft.SubQueryExpression", expressionConfig);
				var totalSalesFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"PartnerParamCategory", Terrasoft.PRMEnums.PartnerParamCategory.TotalSales);
				column.subFilters.addItem(totalSalesFilter);
				var partnershipParameterTypeFilter = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					"PartnershipParameterType", Terrasoft.PRMEnums.PartnershipParamType.Current);
				column.subFilters.addItem(partnershipParameterTypeFilter);
				var esqColumn = esq.addColumn("TotalSales");
				esqColumn.expression = column;
			},

			/**
			 * Adds certified employees column to esq.
			 * @protected
			 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
			 */
			addCertifiedEmployeesColumn: function(esq) {
				var expressionConfig = {
					columnPath: "[PartnershipParameter:Partnership].IntValue",
					parentCollection: this
				};
				var column = Ext.create("Terrasoft.SubQueryExpression", expressionConfig);
				var certifiedEmployeesFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"PartnerParamCategory", Terrasoft.PRMEnums.PartnerParamCategory.CertifiedEmployees);
				column.subFilters.addItem(certifiedEmployeesFilter);
				var partnershipParameterTypeFilter = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					"PartnershipParameterType", Terrasoft.PRMEnums.PartnershipParamType.Current);
				column.subFilters.addItem(partnershipParameterTypeFilter);
				var parameterTypeFilter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"ParameterType", Terrasoft.PRMEnums.ParameterType.Obligation);
				column.subFilters.addItem(parameterTypeFilter);
				var esqColumn = esq.addColumn("CertifiedEmployees");
				esqColumn.expression = column;
			},

			/**
			 * Handles PartnerType change event.
			 * @protected
			 */
			onPartnerTypeChange: function() {
				var type = this.get("PartnerType");
				if (type && this.isNewMode()) {
					this.setDefaultLevelByType(type.value);
				}
			},

			/**
			 * Handles StartDateChange change event. Sets 'DueDate' attribute value to the last day of the year
			 * from 'StartDate' attribute value.
			 * @protected
			 */
			onStartDateChange: function() {
				var startDate = this.get("StartDate");
				if (this.isNotEmpty(startDate)) {
					var lastDay = this.Terrasoft.endOfYear(Terrasoft.clearTime(startDate));
					this.set("DueDate", lastDay);
				}
			},

			/**
			 * Sets default partnership level by type.
			 * @protected
			 * @param {String} typeValue Partnership type value.
			 */
			setDefaultLevelByType: function(typeValue) {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "PartnerLevel"
				});
				var numberColumn = esq.addColumn("Number");
				numberColumn.orderPosition = 0;
				numberColumn.orderDirection = Terrasoft.OrderDirection.ASC;
				var typeFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"PartnerType", typeValue);
				esq.filters.addItem(typeFilter);
				esq.getEntityCollection(function(response) {
					if (response && response.success) {
						var collection = response.collection;
						if (collection && collection.getCount() > 0) {
							var defaultLevel = collection.getByIndex(0);
							this.set("PartnerLevel", {
								value: defaultLevel.get("Id")
							});
						}
					}
				}, this);
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "MetricsContainer",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					},
					"itemType": 7,
					"classes": {
						"wrapClassName": [
							"ts-metrics-container"
						]
					},
					"items": []
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "CurrentLevelContainer",
				"values": {
					"items": [],
					"itemType": 7,
					"classes": {
						"wrapClassName": [
							"ts-metric-item",
							"ts-days-in-funnel-container"
						]
					}
				},
				"parentName": "MetricsContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "CurrentLevelValue",
				"values": {
					"generator": "ConfigurationRoundProgressBarGenerator.generateProgressBar",
					"controlConfig": {
						"captionSuffix": "",
						"value": {
							"bindTo": "CurrentLevel"
						},
						"maxValue": {
							"bindTo": "MaxCurrentLevel"
						},
						"size": 90,
						"clockwise": true,
						"borderWidth": 3,
						"classes": [
							"ts-font-light"
						]
					}
				},
				"parentName": "CurrentLevelContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "CurrentLevelCaption",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.CurrentLevelCaption"
					},
					"classes": {
						"labelClass": [
							"ts-metric-item-caption"
						]
					},
					"itemType": 6
				},
				"parentName": "CurrentLevelContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "CurrentScoreContainer",
				"values": {
					"items": [],
					"itemType": 7,
					"classes": {
						"wrapClassName": [
							"ts-metric-item",
							"ts-days-in-funnel-container"
						]
					}
				},
				"parentName": "MetricsContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "CurrentScoreValue",
				"values": {
					"generator": "ConfigurationRoundProgressBarGenerator.generateProgressBar",
					"controlConfig": {
						"captionSuffix": "",
						"value": {
							"bindTo": "CurrentScore"
						},
						"maxValue": {
							"bindTo": "MaxCurrentScore"
						},
						"size": 90,
						"clockwise": true,
						"borderWidth": 3,
						"classes": [
							"ts-font-light"
						]
					}
				},
				"parentName": "CurrentScoreContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "CurrentScoreCaption",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.CurrentPointCaption"
					},
					"classes": {
						"labelClass": [
							"ts-metric-item-caption"
						]
					},
					"itemType": 6
				},
				"parentName": "CurrentScoreContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Name",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "StartDate",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "DueDate",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "IsActive",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 6
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabCaption"
					},
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ContactGeneralInfoControlGroup",
				"values": {
					"itemType": 15,
					"items": []
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "PartnershipGeneralInfoBlock",
				"values": {
					"itemType": 0,
					"items": [],
					"collapseEmptyRow": true
				},
				"parentName": "ContactGeneralInfoControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TotalSales",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					},
					"enabled": false
				},
				"parentName": "PartnershipGeneralInfoBlock",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MarketingActivities",
				"values": {
					"layout": {
						"colSpan": 12,
						"column": 12,
						"row": 0
					},
					"enabled": false
				},
				"parentName": "PartnershipGeneralInfoBlock",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "Margin",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					},
					"enabled": false
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "EducationAndCertificate",
				"values": {
					"itemType": 2
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "OpportunityAndLeadTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.OpportunityAndLeadTabCaption"
					},
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "PartnershipLeadDetail",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "OpportunityAndLeadTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "PartnershipOpportunityDetail",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "OpportunityAndLeadTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "PartnershipParameterDetail",
				"values": {
					"itemType": 2
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "PartnershipAttachmentsTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.PartnershipAttachmentsTab"
					},
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "PartnershipAttachmentsDetail",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "PartnershipAttachmentsTab",
				"propertyName": "items",
				"index": 0
			}
		]/**SCHEMA_DIFF*/
	};
});


