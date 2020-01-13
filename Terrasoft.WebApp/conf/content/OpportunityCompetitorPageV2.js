Terrasoft.configuration.Structures["OpportunityCompetitorPageV2"] = {innerHierarchyStack: ["OpportunityCompetitorPageV2Opportunity", "OpportunityCompetitorPageV2"], structureParent: "BasePageV2"};
define('OpportunityCompetitorPageV2OpportunityStructure', ['OpportunityCompetitorPageV2OpportunityResources'], function(resources) {return {schemaUId:'14323e11-243b-4a87-9e6a-0e38b6a2f4eb',schemaCaption: "Edit page - Competitor", parentSchemaName: "BasePageV2", schemaName:'OpportunityCompetitorPageV2Opportunity',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityCompetitorPageV2Structure', ['OpportunityCompetitorPageV2Resources'], function(resources) {return {schemaUId:'c27145ec-5c3c-4445-a54e-d0f60a34f782',schemaCaption: "Edit page - Competitor", parentSchemaName: "OpportunityCompetitorPageV2Opportunity", schemaName:'OpportunityCompetitorPageV2',parentSchemaUId:'14323e11-243b-4a87-9e6a-0e38b6a2f4eb',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OpportunityCompetitorPageV2Opportunity",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityCompetitorPageV2OpportunityResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OpportunityCompetitorPageV2Opportunity", ["BusinessRuleModule", "ConfigurationConstants"],
	function(BusinessRuleModule, ConfigurationConstants) {
		return {
			entitySchemaName: "OpportunityCompetitor",
			attributes: {
				"CompetitorProduct": {
					lookupListConfig: {
						columns: ["Weakness", "Strengths"]
					}
				},
				"Weakness": {
					dependencies: [
						{
							columns: ["CompetitorProduct"],
							methodName: "onCompetitorProductSelect"
						}
					]
				},
				"Strengths": {
					dependencies: [
						{
							columns: ["Competitor"],
							methodName: "onCompetitorSelect"
						}
					]
				}
			},
			details: /**SCHEMA_DETAILS*/{
			}/**SCHEMA_DETAILS*/,
			methods: {
				/**
				 * ######### ############ ########## ##### ########
				 * @overriden
				 * @returns {boolean}
				 */
				validate: function() {
					if (!this.callParent(arguments)) {
						return false;
					}
					if (!this.get("Supplier") && !this.get("CompetitorProduct")) {
						var message = Ext.String.format(
							this.get("Resources.Strings.SupplierOrProductRequiredMessage"));
						this.showInformationDialog(message);
						return false;
					}
					return true;
				},

				/**
				 * ##### ########## ###### Weakness # Strengths ### ##### CompetitorProduct
				 * @private
				 */
				onCompetitorProductSelect: function() {
					var competitorProduct = this.get("CompetitorProduct");
					if (!competitorProduct) {
						this.set("Weakness", null);
						this.set("Strengths", null);
					} else {
						this.set("Weakness", competitorProduct.Weakness);
						this.set("Strengths", competitorProduct.Strengths);
					}
				},

				/**
				 * ####### CompetitorProduct ### ##### Competitor
				 * @private
				 */
				onCompetitorSelect: function() {
					var competitor = this.get("Competitor");
					if (this.Ext.isEmpty(competitor)) {
						this.set("CompetitorProduct", null);
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Opportunity",
					"values": {
						"bindTo": "Opportunity",
						"layout": { "column": 0, "row": 0, "colSpan": 12 },
						"enabled": false,
						"controlConfig": {
							"enableRightIcon": false
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Supplier",
					"values": {
						"bindTo": "Supplier",
						"layout": { "column": 12, "row": 0, "colSpan": 12 }
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Competitor",
					"values": {
						"bindTo": "Competitor",
						"layout": { "column": 0, "row": 1, "colSpan": 12 }
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "CompetitorProduct",
					"values": {
						"bindTo": "CompetitorProduct",
						"layout": { "column": 12, "row": 1, "colSpan": 12 }
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Weakness",
					"values": {
						"bindTo": "Weakness",
						"layout": { "column": 0, "row": 2, "colSpan": 12 },
						"contentType": Terrasoft.ContentType.LONG_TEXT
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Strengths",
					"values": {
						"bindTo": "Strengths",
						"layout": { "column": 12, "row": 2, "colSpan": 12 },
						"contentType": Terrasoft.ContentType.LONG_TEXT
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "IsWinner",
					"values": {
						"bindTo": "IsWinner",
						"layout": { "column": 0, "row": 3, "colSpan": 12 }
					}
				},
				{
					"operation": "merge",
					"name": "Tabs",
					"parentName": "CardContentContainer",
					"propertyName": "items",
					"values": {
						"visible": false
					}
				}
			]/**SCHEMA_DIFF*/,
			rules: {
				"CompetitorProduct": {
					"FiltrationCompetitorProductByCompetitor": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"baseAttributePatch": "Competitor",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Competitor"
					}
				},
				"Supplier": {
					"FiltrationSupplierByCompetitorType": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"baseAttributePatch": "Type",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.CONSTANT,
						"value": ConfigurationConstants.AccountType.Competitor
					}
				}
			}
		};
	});

define("OpportunityCompetitorPageV2", ["ConfigurationConstants", "AccountLookupMiniPageMixin"],
	function(ConfigurationConstants) {
		function updateViewModel() {
			if (!this.Terrasoft.isCurrentUserSsp()) {
				return;
			}
			const lookupInfo = this.getLookupInfo();
			lookupInfo.bindAccountMiniPage(lookupInfo, this);
		}
		return {
			entitySchemaName: "OpportunityCompetitor",
			attributes: {
				"Supplier": {
					"lookupListConfig": {
						hideActions: true,
						updateViewModel: updateViewModel
					}
				},
				"Competitor": {
					"lookupListConfig": {
						hideActions: true,
						updateViewModel: updateViewModel
					}
				}
			},
			mixins: {
				AccountLookupMiniPageMixin: "Terrasoft.AccountLookupMiniPageMixin"
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.LookupQuickAddMixin#getLookupPageConfig
				 * @overriden
				 */
				getLookupPageConfig: function() {
					const config = this.callParent(arguments);
					if (Terrasoft.isCurrentUserSsp() && this.isAccountLookupColumn(config.columnName)) {
						this.applyAccountMiniPageDefValues(config);
						this.applyLookupCustomConfig(config);
						return config;
					}
					return config;
				},

				/**
				 * Applies default values to the column from lookup config.
				 * @param {Object} config Lookup config.
				 */
				applyAccountMiniPageDefValues: function (config) {
					const defValues = this.getAccountMiniPageDefValues();
					this.Ext.apply(config, {miniPageDefValues: defValues[config.columnName] || []});
				},

				/**
				 * Returns default mini page values for all account columns.
				 * @returns {Object} Default values.
				 */
				getAccountMiniPageDefValues: function () {
					return {
						"Supplier": [{
							"name": "Type",
							"value": ConfigurationConstants.AccountType.Competitor
						}]
					}
				},

				/**
				 * @inheritdoc Terrasoft.LookupQuickAddMixin#getPreventQuickAddSchemaNames
				 * @overridden
				 */
				getPreventQuickAddSchemaNames: function () {
					const schemas = this.callParent(arguments);
					schemas.push("Account");
					return schemas;
				}
			},
			diff: /**SCHEMA_DIFF*/[
			]/**SCHEMA_DIFF*/
		};
	});


