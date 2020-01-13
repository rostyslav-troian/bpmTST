Terrasoft.configuration.Structures["PartnershipPage"] = {innerHierarchyStack: ["PartnershipPagePRMBase", "PartnershipPage"], structureParent: "BaseModulePageV2"};
define('PartnershipPagePRMBaseStructure', ['PartnershipPagePRMBaseResources'], function(resources) {return {schemaUId:'eccfef6b-387f-4cce-bd96-1e45f8883742',schemaCaption: "Card schema: \"Partnership\"", parentSchemaName: "BaseModulePageV2", schemaName:'PartnershipPagePRMBase',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('PartnershipPageStructure', ['PartnershipPageResources'], function(resources) {return {schemaUId:'1c94715f-4142-4649-bef9-03e97816a1a9',schemaCaption: "Card schema: \"Partnership\"", parentSchemaName: "PartnershipPagePRMBase", schemaName:'PartnershipPage',parentSchemaUId:'eccfef6b-387f-4cce-bd96-1e45f8883742',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"PartnershipPagePRMBase",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('PartnershipPagePRMBaseResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("PartnershipPagePRMBase", ["PRMEnums", "css!PartnershipCommonCSS"], function() {
	return {
		entitySchemaName: "Partnership",
		details: /**SCHEMA_DETAILS*/{
			"EducationAndCertificate": {
				"schemaName": "EducationAndCertificateDetail",
				"filter": {
					"masterColumn": "Account",
					"detailColumn": "Contact.Account"
				},
				"defaultValues": {
					"Account": {
						"masterColumn": "Account"
					}
				}
			},
			"PartnershipParameterDetail": {
				"schemaName": "PartnershipParameterDetail",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "Partnership"
				}
			},
			"PartnerParamHistoryDetail": {
				"schemaName": "PartnerParamHistoryDetail",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "Partnership"
				}
			},
			"PartnershipAttachmentsDetail5baefcfd": {
				"schemaName": "PartnershipAttachmentsDetail",
				"entitySchemaName": "PartnershipFile",
				"filter": {
					"detailColumn": "Partnership",
					"masterColumn": "Id"
				}
			},
			"PartnershipLeadDetailf426acf7": {
				"schemaName": "PartnershipLeadDetail",
				"entitySchemaName": "Lead",
				"filter": {
					"detailColumn": "Partner",
					"masterColumn": "Account"
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
			 * Partnership name.
			 */
			"Name": {
				"isRequired": true
			}
		},
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
				return esq;
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
			 * Handles Account change event.
			 * @protected
			 */
			onAccountChange: function() {
				this.updateDetail({detail: "EducationAndCertificate"});
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
		modules: /**SCHEMA_MODULES*/{
			"AccountProfile": {
				"config": {
					"schemaName": "AccountProfileSchemaPRM",
					"isSchemaConfigInitialized": true,
					"useHistoryState": false,
					"parameters": {
						"viewModelConfig": {
							"masterColumnName": "Account"
						}
					}
				}
			}
		}/**SCHEMA_MODULES*/,
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
				"name": "PartnerType",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2
					},
					"contentType": 3,
					"enabled": {
						"bindTo": "isNewMode"
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
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
				"name": "AccountProfile",
				"values": {
					"itemType": 4
				},
				"parentName": "LeftModulesContainer",
				"propertyName": "items",
				"index": 1
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
				"name": "CertifiedEmployees",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					},
					"enabled": false
				},
				"parentName": "PartnershipGeneralInfoBlock",
				"propertyName": "items",
				"index": 1
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
				"name": "HistoryTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.HistoryTabCaption"
					},
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "PartnerParamHistoryDetail",
				"values": {
					"itemType": 2
				},
				"parentName": "HistoryTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tab9c516372TabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab9c516372TabLabel"
					},
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "PartnershipAttachmentsDetail5baefcfd",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tab9c516372TabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "OpportunityAndLeadTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.OpportunityAndLeadTabCaption"
					},
					"items": [],

				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "PartnershipLeadDetailf426acf7",
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
			}
		]/**SCHEMA_DIFF*/,
		rules: {}
	};
});

define("PartnershipPage", ["ConfigurationConstants", "PRMEnums", "css!PartnershipCommonCSS"],
	function(ConfigurationConstants) {
		return {
			entitySchemaName: "Partnership",
			methods: {

				/**
				 * Adds filters for invoice detail
				 * @private
				 */
				invoiceDetailFilter: function() {
					var generalFilterGroup = new this.Terrasoft.createFilterGroup();
					generalFilterGroup.name = "generalFilterGroup";
					generalFilterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
					var invoiceFilterGroup = new this.Terrasoft.createFilterGroup();
					invoiceFilterGroup.name = "invoiceFilterGroup";
					var accountFilterGroup = new this.Terrasoft.createFilterGroup();
					accountFilterGroup.name = "accountFilterGroup";
					var partnerAccountFilterGroup = new this.Terrasoft.createFilterGroup();
					partnerAccountFilterGroup.name = "partnerAccountFilterGroup";
					partnerAccountFilterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
					var account = this.get("Account");
					var startDate = this.get("StartDate");
					var dueDate = this.get("DueDate");
					if (!this.Ext.isEmpty(account) && !this.Ext.isEmpty(startDate) && !this.Ext.isEmpty(dueDate)) {
						accountFilterGroup.add("AccountFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Account", account.value));
						invoiceFilterGroup.add("OpportunityFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "[Opportunity:Id:Opportunity].Partner", account.value));
						invoiceFilterGroup.add("OpportunityTypeFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL,
							"[Opportunity:Id:Opportunity].Type", ConfigurationConstants.Opportunity.Type.PartnerSale));
						partnerAccountFilterGroup.add("accountFilterGroup", accountFilterGroup);
						partnerAccountFilterGroup.add("invoiceFilterGroup", invoiceFilterGroup);
						generalFilterGroup.add("partnerAccountFilterGroup", partnerAccountFilterGroup);
						generalFilterGroup.add("StartDateFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.GREATER_OR_EQUAL, "StartDate", startDate));
						generalFilterGroup.add("DueDateFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.LESS_OR_EQUAL, "DueDate", dueDate));
					}
					else {
						generalFilterGroup.add("InvoiceIdIsNullFilter", this.Terrasoft.createColumnIsNullFilter("Id"));
					}
					return generalFilterGroup;
				}
			},
			diff: /**SCHEMA_DIFF*/[
			]/**SCHEMA_DIFF*/
		};
	});


