Terrasoft.configuration.Structures["OpportunityPageV2"] = {innerHierarchyStack: ["OpportunityPageV2Opportunity", "OpportunityPageV2Project", "OpportunityPageV2PRMBase", "OpportunityPageV2OrderInSales", "OpportunityPageV2OpportunityInvoice", "OpportunityPageV2MLOpportunityScoring", "OpportunityPageV2DocumentInOpportunity", "OpportunityPageV2CoreLeadOpportunity", "OpportunityPageV2"], structureParent: "BaseOpportunityPage"};
define('OpportunityPageV2OpportunityStructure', ['OpportunityPageV2OpportunityResources'], function(resources) {return {schemaUId:'df249c13-df7a-48d2-b128-85183c4a0e10',schemaCaption: "Opportunity edit page ", parentSchemaName: "BaseOpportunityPage", schemaName:'OpportunityPageV2Opportunity',parentSchemaUId:'2f227a1c-1a21-4b67-ae9f-52152d7f903c',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityPageV2ProjectStructure', ['OpportunityPageV2ProjectResources'], function(resources) {return {schemaUId:'46876564-fa17-462c-bd01-a102f97a69f4',schemaCaption: "Opportunity edit page ", parentSchemaName: "OpportunityPageV2Opportunity", schemaName:'OpportunityPageV2Project',parentSchemaUId:'df249c13-df7a-48d2-b128-85183c4a0e10',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OpportunityPageV2Opportunity",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityPageV2PRMBaseStructure', ['OpportunityPageV2PRMBaseResources'], function(resources) {return {schemaUId:'3621e616-2c35-4d01-bfcd-d0b24dcf5e79',schemaCaption: "Opportunity edit page ", parentSchemaName: "OpportunityPageV2Project", schemaName:'OpportunityPageV2PRMBase',parentSchemaUId:'46876564-fa17-462c-bd01-a102f97a69f4',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OpportunityPageV2Project",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityPageV2OrderInSalesStructure', ['OpportunityPageV2OrderInSalesResources'], function(resources) {return {schemaUId:'8a2aee31-b341-427e-bd53-4aa013058d62',schemaCaption: "Opportunity edit page ", parentSchemaName: "OpportunityPageV2PRMBase", schemaName:'OpportunityPageV2OrderInSales',parentSchemaUId:'3621e616-2c35-4d01-bfcd-d0b24dcf5e79',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OpportunityPageV2PRMBase",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityPageV2OpportunityInvoiceStructure', ['OpportunityPageV2OpportunityInvoiceResources'], function(resources) {return {schemaUId:'cca0bd7b-992a-4f83-a8de-f2885138a876',schemaCaption: "Opportunity edit page ", parentSchemaName: "OpportunityPageV2OrderInSales", schemaName:'OpportunityPageV2OpportunityInvoice',parentSchemaUId:'8a2aee31-b341-427e-bd53-4aa013058d62',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OpportunityPageV2OrderInSales",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityPageV2MLOpportunityScoringStructure', ['OpportunityPageV2MLOpportunityScoringResources'], function(resources) {return {schemaUId:'d70efd92-4821-4caa-b15c-955ae97e2a6e',schemaCaption: "Opportunity edit page ", parentSchemaName: "OpportunityPageV2OpportunityInvoice", schemaName:'OpportunityPageV2MLOpportunityScoring',parentSchemaUId:'cca0bd7b-992a-4f83-a8de-f2885138a876',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OpportunityPageV2OpportunityInvoice",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityPageV2DocumentInOpportunityStructure', ['OpportunityPageV2DocumentInOpportunityResources'], function(resources) {return {schemaUId:'2fc00cec-467e-4f40-abd5-a314234244c1',schemaCaption: "Opportunity edit page ", parentSchemaName: "OpportunityPageV2MLOpportunityScoring", schemaName:'OpportunityPageV2DocumentInOpportunity',parentSchemaUId:'d70efd92-4821-4caa-b15c-955ae97e2a6e',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OpportunityPageV2MLOpportunityScoring",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityPageV2CoreLeadOpportunityStructure', ['OpportunityPageV2CoreLeadOpportunityResources'], function(resources) {return {schemaUId:'e57a362a-33e5-4bc4-8d9a-98bb7565fed0',schemaCaption: "Opportunity edit page ", parentSchemaName: "OpportunityPageV2DocumentInOpportunity", schemaName:'OpportunityPageV2CoreLeadOpportunity',parentSchemaUId:'2fc00cec-467e-4f40-abd5-a314234244c1',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OpportunityPageV2DocumentInOpportunity",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityPageV2Structure', ['OpportunityPageV2Resources'], function(resources) {return {schemaUId:'9ce2e3a6-8a69-40a2-a169-a83abe27281d',schemaCaption: "Opportunity edit page ", parentSchemaName: "OpportunityPageV2CoreLeadOpportunity", schemaName:'OpportunityPageV2',parentSchemaUId:'e57a362a-33e5-4bc4-8d9a-98bb7565fed0',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OpportunityPageV2CoreLeadOpportunity",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityPageV2OpportunityResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OpportunityPageV2Opportunity", ["ConfigurationConstants"],
	function(ConfigurationConstants) {
		return {
			entitySchemaName: "Opportunity",
			messages: {},
			attributes: {},
			mixins: {},
			modules: /**SCHEMA_MODULES*/{
				"ClientProfile": {
					"config": {
						"isSchemaConfigInitialized": true,
						"useHistoryState": false,
						"schemaName": "ClientProfileSchema",
						"parameters": {
							"viewModelConfig": {
								"masterColumnName": "Client"
							}
						}
					}
				}
			}/**SCHEMA_MODULES*/,
			details: /**SCHEMA_DETAILS*/{
				Activities: {
					schemaName: "OpportunityHistoryActivityDetail",
					filter: {
						masterColumn: "Id",
						detailColumn: "Opportunity"
					},
					defaultValues: {
						Account: {masterColumn: "Account"},
						Contact: {masterColumn: "Contact"}
					}
				},
				Calls: {
					schemaName: "CallDetail",
					filter: {
						masterColumn: "Id",
						detailColumn: "Opportunity"
					}
				},
				EmailDetailV2: {
					schemaName: "EmailDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Opportunity"
					},
					filterMethod: "emailDetailFilter"
				},
				OpportunityTeam: {
					schemaName: "OpportunityTeamDetailV2New",
					filter: {
						masterColumn: "Id",
						detailColumn: "Opportunity"
					},
					defaultValues: {
						Campaign: {
							masterColumn: "Id"
						}
					}
				}
			}/**SCHEMA_DETAILS*/,
			methods: {

				/**
				 * Creates filter for detail Email.
				 * @protected
				 * @return {Terrasoft.FilterGroup} Group filters.
				 */
				emailDetailFilter: function() {
					var recordId = this.get("Id");
					var filterGroup = new this.Terrasoft.createFilterGroup();
					filterGroup.add("OpportunityNotNull", this.Terrasoft.createColumnIsNotNullFilter("Opportunity"));
					filterGroup.add("OpportunityConnection", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Opportunity", recordId));
					filterGroup.add("ActivityType", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Type", ConfigurationConstants.Activity.Type.Email));
					return filterGroup;
				},

				/**
				 * Checks show Contact details.
				 * @return {Boolean} True if show.
				 */
				isShowContactsDetail: function() {
					var client = this.get("Client");
					if (!this.Ext.isEmpty(client) && client.column === "Contact") {
						return true;
					}
					return false;
				},

				/**
				 * Checks show Account details.
				 * @return {Boolean} True if show.
				 */
				isShowAccountsDetail: function() {
					var client = this.get("Client");
					if (!this.Ext.isEmpty(client) && client.column !== "Account") {
						return false;
					}
					return true;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "GeneralInfoTab",
					"propertyName": "items",
					"name": "OpportunityTeam",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					},
					"index": 3
				},
				{
					"operation": "insert",
					"parentName": "OpportunityPageGeneralBlock",
					"propertyName": "items",
					"name": "Type",
					"values": {
						"layout": {"column": 0, "row": 6, "colSpan": 12},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "OpportunityPageGeneralBlock",
					"propertyName": "items",
					"name": "ResponsibleDepartment",
					"values": {
						"layout": {"column": 12, "row": 3, "colSpan": 12},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "OpportunityPageGeneralBlock",
					"name": "IsPrimary",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.RADIO_GROUP,
						"value": {"bindTo": "IsPrimary"},
						"items": [],
						"layout": {"column": 0, "row": 0, "colSpan": 12, "rowSpan": 2}
					}
				},
				{
					"operation": "insert",
					"parentName": "IsPrimary",
					"propertyName": "items",
					"name": "FirstOpportunity",
					"values": {
						"caption": {"bindTo": "Resources.Strings.FirstOpportunityCaption"},
						"value": true
					}
				},
				{
					"operation": "insert",
					"parentName": "IsPrimary",
					"propertyName": "items",
					"name": "SecondOpportunity",
					"values": {
						"caption": {"bindTo": "Resources.Strings.SecondOpportunityCaption"},
						"value": false
					}
				},
				{
					"operation": "insert",
					"name": "HistoryAccountTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.HistoryCustomerTabCaption"},
						"items": []
					},
					"index": 6
				},
				{
					"operation": "insert",
					"parentName": "HistoryAccountTab",
					"name": "OpportunityHistoryAccountTabContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "HistoryAccountTab",
					"propertyName": "items",
					"name": "ContactsAccount",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL,
						"visible": {"bindTo": "isShowAccountsDetail"}
					}
				},
				{
					"operation": "insert",
					"parentName": "HistoryAccountTab",
					"propertyName": "items",
					"name": "OpportunityAccount",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL,
						"visible": {"bindTo": "isShowAccountsDetail"}
					}
				},
				{
					"operation": "insert",
					"parentName": "HistoryAccountTab",
					"propertyName": "items",
					"name": "ActivitiesAccount",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL,
						"visible": {"bindTo": "isShowAccountsDetail"}
					}
				},
				{
					"operation": "insert",
					"parentName": "HistoryAccountTab",
					"propertyName": "items",
					"name": "FilesAccount",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL,
						"visible": {"bindTo": "isShowAccountsDetail"}
					}
				},
				{
					"operation": "insert",
					"parentName": "HistoryAccountTab",
					"propertyName": "items",
					"name": "OpportunityContact",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL,
						"visible": {"bindTo": "isShowContactsDetail"}
					}
				},
				{
					"operation": "insert",
					"parentName": "HistoryAccountTab",
					"propertyName": "items",
					"name": "ActivitiesContact",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL,
						"visible": {"bindTo": "isShowContactsDetail"}
					}
				},
				{
					"operation": "insert",
					"parentName": "HistoryAccountTab",
					"propertyName": "items",
					"name": "FilesContact",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL,
						"visible": {"bindTo": "isShowContactsDetail"}
					}
				},
				{
					"operation": "insert",
					"parentName": "HistoryTab",
					"propertyName": "items",
					"name": "Activities",
					"values": {"itemType": Terrasoft.ViewItemType.DETAIL}
				},
				{
					"operation": "insert",
					"parentName": "HistoryTab",
					"propertyName": "items",
					"name": "Calls",
					"values": {"itemType": Terrasoft.ViewItemType.DETAIL}
				},
				{
					"operation": "insert",
					"parentName": "HistoryTab",
					"propertyName": "items",
					"name": "EmailDetailV2",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/,
			rules: {}
		};
	});

define('OpportunityPageV2ProjectResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OpportunityPageV2Project", function() {
	return {
		entitySchemaName: "Opportunity",
		details: /**SCHEMA_DETAILS*/{
			/**
			 * ###### #######
			 */
			Project: {
				schemaName: "ProjectDetailV2",
				filter: {
					masterColumn: "Id",
					detailColumn: "Opportunity"
				},
				defaultValues: {
					Account: {masterColumn: "Account"},
					Contact: {masterColumn: "Contact"}
				}
			}
		}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "HistoryTab",
				"propertyName": "items",
				"name": "Project",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define('OpportunityPageV2PRMBaseResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OpportunityPageV2PRMBase", ["BusinessRuleModule", "ConfigurationConstants"],
		function(BusinessRuleModule, ConfigurationConstants) {
			return {
				entitySchemaName: "Opportunity",
				attributes: {
					"PartnerAccountType": {
						"dataValueType": Terrasoft.DataValueType.GUID,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": ConfigurationConstants.AccountType.Partner
					},
					"Partner": {
						dependencies: [
							{
								columns: ["Type"],
								methodName: "onTypeChanged"
							},
							{
								columns: ["Owner"],
								methodName: "onOwnerChanged"
							}
						],
						onChange: "autoCompleteOwner",
						lookupListConfig: {
							columns: [
								"[VwSystemUsers:Contact:PrimaryContact].Contact"
							]
						}
					},
					"Owner": {
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						lookupListConfig: {
							filter: function () {
								return this.getOwnerFilter("Type");
							},
							columns: [
								"Account.Type"
							]
						},
						dependencies: [
							{
								columns: ["ResponsibleDepartment"],
								methodName: "setOpportunityByResponsibleDepartment"
							}
						]
					}
				},
				details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
				diff: /**SCHEMA_DIFF*/[],
				methods: {

					/**
					 * Clear partner if type change.
					 */
					onTypeChanged: function () {
						this.clearPartnerIfColumnChange("Type");
					},
					/**
					 * Handle Owner column change.
					 */
					onOwnerChanged: function() {
						this.clearPartnerIfColumnChange("Type");
						this.fillPartnerByOwner();
					}
				},
				rules: {
					"Partner": {
						"FiltrationPartnerByAccountType": {
							"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
							"autocomplete": true,
							"baseAttributePatch": "Type",
							"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
							"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							"attribute": "PartnerAccountType"
						}
					},
					"Owner": {
						"FiltrationContactByPartner": {
							"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
							"autocomplete": false,
							"baseAttributePatch": "Account",
							"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
							"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							"attribute": "Partner"
						}
					}
				}
		};
	});

define('OpportunityPageV2OrderInSalesResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OpportunityPageV2OrderInSales", ["OpportunityOrderUtilities"],
	function() {
		return {
			entitySchemaName: "Opportunity",
			details: /**SCHEMA_DETAILS*/{
				/**
				 * Order Detail
				 */
				Order: {
					schemaName: "OrderDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Opportunity"
					},
					defaultValues: {
						Account: {masterColumn: "Account"},
						Contact: {masterColumn: "Contact"}
					}
				}
			}/**SCHEMA_DETAILS*/,
			mixins: {
				/**
				 * Order utilities mixin.
				 */
				OpportunityOrderUtilities: "Terrasoft.OpportunityOrderUtilities"
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.OpportunityOrderUtilities#getCurrentOpportunityId
				 * @protected
				 * @overridden
				 */
				getCurrentOpportunityId: function() {
					return this.get("Id");
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onCardAction
				 * @protected
				 * @overridden
				 */
				onCardAction: function(config) {
					if (this.Ext.isObject(config)) {
						var method = this[config.methodName];
						return method.apply(config.scope || this, config.args);
					} else {
						return this.callParent(arguments);
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "HistoryTab",
					"propertyName": "items",
					"name": "Order",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"name": "CreateOrderFromOpportunityButton",
					"parentName": "LeftContainer",
					"propertyName": "items",
					"index": 4,
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"caption": {"bindTo": "getButtonCaption"},
						"click": {"bindTo": "CreateOrderFromOpportunity"},
						"enabled": {"bindTo": "canEntityBeOperated"},
						"classes": {
							"textClass": ["actions-button-margin-right"]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('OpportunityPageV2OpportunityInvoiceResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OpportunityPageV2OpportunityInvoice", [], function() {
		return {
			entitySchemaName: "Opportunity",
			details: /**SCHEMA_DETAILS*/{
				Invoice: {
					schemaName: "InvoiceDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Opportunity"
					},
					defaultValues: {
						Account: {masterColumn: "Account"},
						Contact: {masterColumn: "Contact"}
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "HistoryTab",
					"propertyName": "items",
					"name": "Invoice",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('OpportunityPageV2MLOpportunityScoringResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OpportunityPageV2MLOpportunityScoring", ["MLConfigurationConsts", "MLPredictionPageMixin"],
	function(MLConfigurationConsts) {
		return {
			entitySchemaName: "Opportunity",
			mixins: ["Terrasoft.MLPredictionPageMixin"],
			attributes: {
				"TrainedScoreModelExists": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			details: /**SCHEMA_DETAILS*/ {} /**SCHEMA_DETAILS*/,
			methods: {

				/**
				 * @inheritdoc BasePageV2#onEntityInitialized
				 * @override
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					this.queryWasAnyModelTrained("PredictiveProbability", MLConfigurationConsts.ProblemTypes.Scoring);
				},

				getProbabilityMetricValue: function() {
					if (!this.$TrainedScoreModelExists) {
						return this.callParent(arguments);
					}
					return this.get("PredictiveProbability");
				},

				getProbabilityMetricCaption: function() {
					if (!this.$TrainedScoreModelExists) {
						return this.callParent(arguments);
					}
					return this.get("Resources.Strings.PredictiveProbabilityCaption");
				},

				getProbabilityMetricHint: function() {
					if (!this.$TrainedScoreModelExists) {
						return this.callParent(arguments);
					}
					return this.get("Resources.Strings.PredictiveProbabilityMetricHint");
				}
			},
			diff: /**SCHEMA_DIFF*/ [] /**SCHEMA_DIFF*/
		};
	});

define('OpportunityPageV2DocumentInOpportunityResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OpportunityPageV2DocumentInOpportunity", [],
		function() {
			return {
				entitySchemaName: "Opportunity",
				details: /**SCHEMA_DETAILS*/{
					Document: {
						schemaName: "DocumentDetailV2",
						entitySchemaName: "Document",
						filter: {
							masterColumn: "Id",
							detailColumn: "Opportunity"
						},
						defaultValues: {
							Account: { masterColumn: "Account" },
							Contact: { masterColumn: "Contact" }
						}
					}
				}/**SCHEMA_DETAILS*/,
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"parentName": "HistoryTab",
						"propertyName": "items",
						"name": "Document",
						"values": { "itemType": Terrasoft.ViewItemType.DETAIL }
					}
				]/**SCHEMA_DIFF*/
			};
		});

define('OpportunityPageV2CoreLeadOpportunityResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OpportunityPageV2CoreLeadOpportunity", ["LeadConfigurationConst", "OpportunityPageV2Resources",
		"CreateLeadForEntityUtilities"],
	function(LeadConfigurationConst) {
		return {
			entitySchemaName: "Opportunity",
			details: /**SCHEMA_DETAILS*/ {
				"Lead": {
					"schemaName": "LeadDetailV2",
					"entitySchemaName": "Lead",
					"filter": {
						"detailColumn": "Opportunity",
						"masterColumn": "Id"
					},
					defaultValues: {
						QualifiedAccount: {
							masterColumn: "Account"
						},
						Budget: {
							masterColumn: "Budget"
						},
						SalesOwner: {
							masterColumn: "Owner"
						},
						OpportunityDepartment: {},
						LeadType: {
							masterColumn: "LeadType"
						}
					}
				}
			} /**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/ [
				{
					"operation": "insert",
					"name": "LeadTab",
					"values": {
						"items": [],
						"caption": {
							"bindTo": "Resources.Strings.OpportunityPageV28TabCaption"
						}
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 3
				},
				{
					"operation": "insert",
					"name": "Lead",
					"values": {
						"itemType": 2
					},
					"parentName": "LeadTab",
					"propertyName": "items",
					"index": 0
				}
			] /**SCHEMA_DIFF*/,
			mixins: {
				CreateLeadForEntityUtilities: "Terrasoft.CreateLeadForEntityUtilities"
			},
			messages: {
				"GetCurrentOpportunityInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			methods: {

				/**
				 * @inheritDoc Terrasoft.BaseSchemaModule#init
				 * @overridden
				 */
				init: function() {
					this.mixins.CreateLeadForEntityUtilities.init.call(this);
					this.callParent(arguments);
				},

				/**
				 * @inheritDoc Terrasoft.CreateLeadForEntityUtilities#addQueryColumns
				 * @overridden
				 */
				addQueryColumns: function(insert) {
					var account = this.get("Account");
					if (account) {
						var accountId = account.value;
						insert.setParameterValue("QualifiedAccount",
							accountId, Terrasoft.DataValueType.GUID);
					}
					var contact = this.get("Contact");
					if (contact) {
						var contactId = contact.value;
						insert.setParameterValue("QualifiedContact",
							contactId, Terrasoft.DataValueType.GUID);
					}
					var leadType = this.get("LeadType");
					if (leadType && leadType.value !== Terrasoft.GUID_EMPTY) {
						insert.setParameterValue("LeadType", leadType.value,
							Terrasoft.DataValueType.GUID);
					}
					insert.setParameterValue("QualifyStatus",
						LeadConfigurationConst.LeadConst.QualifyStatus.WaitingForSale,
						Terrasoft.DataValueType.GUID);
				},

				/**
				 * @inheritDoc Terrasoft.BasePageV2#saveEntityInChain
				 * @overridden
				 */
				saveEntityInChain: function(next) {
					var callback = this.createLeadAfterSave.bind(this, next);
					this.callParent([callback]);
				},

				/**
				 * Setting message subscription.
				 * @override
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					var sandboxId = this.getSaveRecordMessagePublishers();
					this.sandbox.subscribe("GetCurrentOpportunityInfo", function(config) {
						return this.getCurrentOpportunityInfo(config);
					}, this, sandboxId);
				},

				/**
				 * Returns opportunity data array.
				 * @param {Object} config Objects array. Example : {columnPath: ""}
				 * @return {Array} Opportunity data array. Example : {columnPath: "name_Field", value: "value_Field"}
				 */
				getCurrentOpportunityInfo: function(config) {
					config.map(function(item) {
						item.value = this.get(item.columnPath);
					}.bind(this));
					return config;
				}
			},
			rules: {},
			userCode: {}
		};
	});

define("OpportunityPageV2", ["ProcessModuleUtilities", "OppManagementMigrationUtils"],
		function(ProcessModuleUtilities) {
	return {
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		mixins: {
			"OppManagementMigrationUtils": "Terrasoft.OppManagementMigrationUtils"
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.OpportunityPageV2#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.initOldProcessUsageState(callback, scope);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.OpportunityPageV2#getActions
			 * @overridden
			 */
			getActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": {"bindTo": "Resources.Strings.OpportunityManagementItemCaption"},
					"Enabled": {"bindTo": "canEntityBeOperated"},
					"Tag": "runOpportunityManagementProcess"
				}));
				return actionMenuItems;
			},

			/**
			 * @obsolete
			 * @protected
			 */
			OpportunityManagement: function() {
				this.log(this.Ext.String.format(this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
					"OpportunityManagement", "runOpportunityManagementProcess"));
				this.runOpportunityManagementProcess.apply(this, arguments);
			},

			/**
			 * Runs the business-process OpportunityManagement.
			 * @protected
			 */
			runOpportunityManagementProcess: function() {
				var sysSettingName = "OpportunityManagementProcess";
				var currentOpportunityId = this.get("Id");
				if (!currentOpportunityId) {
					var invalidMessage = this.get("Resources.Strings.CurrentOpportunityNotFound");
					this.Terrasoft.showInformation(invalidMessage);
					return;
				}
				var useOldProcess = this.isOldProcessEnabled();
				if (useOldProcess) {
					Terrasoft.SysSettings.querySysSettings([sysSettingName],
						function(result) {
							var processId = result[sysSettingName];
							this.runOldOpportunityManagementProcess(currentOpportunityId, processId,
								this.Ext.emptyFn, this);
						}, this);
				} else {
					this.runOpportunityManagement78Process(this.Ext.emptyFn, this);
				}
			},

			/**
			 * Returns true if there is ability to start sales process.
			 * @private
			 * @return {Boolean}
			 */
			canStartOpportunityManagementProcess: function() {
				var processListenersCount = this.get("ProcessListeners");
				if (Number(processListenersCount) === 0) {
					return true;
				}
				var byProcess = this.get("ByProcess");
				return !Boolean(byProcess);
			},

			/**
			 * Starts new opportunity management process.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			runOpportunityManagement78Process: function(callback, scope) {
				if (this.canStartOpportunityManagementProcess()) {
					this.set("ByProcess", true);
					this.save({
						scope: this,
						isSilent: true,
						callback: this.onOpportunityManagementProcessStarted.bind(this, callback, scope)
					});
				} else {
					var message = this.get("Resources.Strings.ProcessAlreadyRunning");
					this.Terrasoft.showInformation(message);
				}
			},

			/**
			 * Reloads record after opportunity management process was started.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			onOpportunityManagementProcessStarted: function(callback, scope) {
				this.reloadEntity(function() {
					this.reloadActionsDashboardItems(callback, scope);
				}, this);
			},

			/**
			 * Returns {@link Terrasoft.EntitySchemaQuery} for active process.
			 * @private
			 * @param {String} processIdValue Id column.
			 * @return {Terrasoft.EntitySchemaQuery}
			 */
			getActiveProcessCountEsq: function(processIdValue) {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "SysProcessEntity"
				});
				esq.addAggregationSchemaColumn("Id", this.Terrasoft.AggregationType.COUNT, "Count");
				esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "EntityId", this.get("Id")));
				esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "[SysProcessData:Id:SysProcess].SysSchema.UId", processIdValue));
				return esq;
			},

			/**
			 * Returns {@link Terrasoft.ProcessModuleUtilities} class.
			 * @private
			 * @return {Terrasoft.ProcessModuleUtilities}.
			 */
			getProcessModuleUtils: function() {
				return ProcessModuleUtilities;
			},

			/**
			 * Starts Opportunity management process with record id parameter.
			 * @private
			 * @param {String} processIdValue Id of process.
			 * @param {String} currentOpportunityId Current record id.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			runOpportunityManagementProcessById: function(processIdValue, currentOpportunityId, callback, scope) {
				var processModuleUtilities = this.getProcessModuleUtils();
				processModuleUtilities.executeProcess({
					sysProcessId: processIdValue,
					parameters: {
						CurrentOpportunity: currentOpportunityId
					},
					callback: function() {
						this.reloadActionsDashboardItems();
						this.Ext.callback(callback, scope);
					},
					scope: this
				});
			},

			/**
			 * Starts old opportunity management process.
			 * @private
			 * @param {String} currentOpportunityId Current record id column value.
			 * @param {String} processId Old process schema id.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			runOldOpportunityManagementProcess: function(currentOpportunityId, processId, callback, scope) {
				if (this.Ext.isEmpty(processId)) {
					var invalidMessage = this.get("Resources.Strings.ProcessNotFound");
					this.Terrasoft.showInformation(invalidMessage);
					return;
				}
				var processIdValue = this.Ext.isObject(processId) ? processId.value : processId;
				var esq = this.getActiveProcessCountEsq(processIdValue);
				esq.getEntityCollection(function(response) {
					var allowExecuteProcess = false;
					if (response.success) {
						var collection = response.collection;
						if (collection && collection.getCount() > 0) {
							if (collection.getByIndex(0).get("Count") === 0) {
								allowExecuteProcess = true;
							}
						}
					}
					if (allowExecuteProcess === true) {
						this.runOpportunityManagementProcessById(processIdValue, currentOpportunityId,
							callback, scope);
					} else {
						var message = this.get("Resources.Strings.ProcessAlreadyRunning");
						this.Terrasoft.showInformation(message);
						this.Ext.callback(callback, scope);
					}
				}, this);
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


