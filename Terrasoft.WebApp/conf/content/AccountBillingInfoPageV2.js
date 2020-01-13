Terrasoft.configuration.Structures["AccountBillingInfoPageV2"] = {innerHierarchyStack: ["AccountBillingInfoPageV2"], structureParent: "BasePageV2"};
define('AccountBillingInfoPageV2Structure', ['AccountBillingInfoPageV2Resources'], function(resources) {return {schemaUId:'625e1d4c-bc26-4872-b76e-267c473ecdcc',schemaCaption: "AccountBillingInfoPageV2", parentSchemaName: "BasePageV2", schemaName:'AccountBillingInfoPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AccountBillingInfoPageV2", ["BusinessRuleModule"],
	function(BusinessRuleModule) {
		return {
			entitySchemaName: "AccountBillingInfo",
			attributes: {
				"Country": {
					lookupListConfig: {
						columns: ["Name", "BillingInfo"]
					}
				},
				"BillingInfo": {
					name: "BillingInfo",
					dataValueType: Terrasoft.DataValueType.TEXT,
					dependencies: [
						{
							columns: ["Country"],
							methodName: "CountryOnChange"
						}
					]
				}
			},
			details: /**SCHEMA_DETAILS*/{
			}/**SCHEMA_DETAILS*/,
			methods: {
				/**
				 * ### ######## ########## ############# ######### "########### ####".
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					if (this.isNewMode()) {
						var account = this.get("Account");
						this.set("LegalUnit", account && account.displayValue);
					}
				},

				/*
				* ### ######### ###### ########## ########## #### # ######## # ######### ##########
				* #### #### "######### #########" ## ######, ##### ######### #########.
				* */
				CountryOnChange: function() {
					var buttonsConfig = {
						buttons: [this.Terrasoft.MessageBoxButtons.YES.returnCode,
							this.Terrasoft.MessageBoxButtons.NO.returnCode],
						defaultButton: 0
					};
					var billingInfo = this.get("BillingInfo");
					var country = this.get("Country");
					if (!this.Ext.isEmpty(country)) {
						if (billingInfo) {
							this.showInformationDialog(this.get("Resources.Strings.CountryIsChange"),
								this.CountryIsChangeDialogCallback, buttonsConfig);
						} else {
							this.set("BillingInfo", country.BillingInfo);
						}
					}
				},

				/*
				* ############# ######### # ###### ############### ###### # ########## ####
				* */
				CountryIsChangeDialogCallback: function(returnCode) {
					if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
						var country = this.get("Country");
						this.set("BillingInfo", country.BillingInfo);
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"name": "Account",
						"bindTo": "Account",
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12
						},
						enabled: false
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"name": "BillingInfo",
						"bindTo": "BillingInfo",
						"layout": {
							"column": 12,
							"colSpan": 12,
							"row": 0,
							"rowSpan": 5
						},
						controlConfig: {
							"height": "160px"
						},
						"contentType": Terrasoft.ContentType.LONG_TEXT
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"name": "Name",
						"bindTo": "Name",
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 12
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"name": "AccountManager",
						"bindTo": "AccountManager",
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 12
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"name": "ChiefAccountant",
						"bindTo": "ChiefAccountant",
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 12
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"name": "Country",
						"bindTo": "Country",
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 12
						}
					}
				},
				{
					"operation": "insert",
					"name": "LegalUnit",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 5, "colSpan": 24}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"name": "Description",
						"bindTo": "Description",
						"layout": {"column": 0, "row": 6, "colSpan": 24},
						"contentType": Terrasoft.ContentType.LONG_TEXT
					}
				},
				{
					"operation": "merge",
					"name": "Tabs",
					"parentName": "CardContentContainer",
					"propertyName": "items",
					"values": {
						itemType: Terrasoft.ViewItemType.TAB_PANEL,
						activeTabChange: {bindTo: "activeTabChange"},
						activeTabName: {bindTo: "ActiveTabName"},
						classes: {wrapClass: ["tab-panel-margin-bottom"]},
						tabs: [],
						visible: false
					}
				}
			]/**SCHEMA_DIFF*/,
			rules: {
				"AccountManager": {
					"FiltrationContactByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "[ContactCareer:Contact].Account",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					}
				},
				"ChiefAccountant": {
					"FiltrationContactByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"baseAttributePatch": "[ContactCareer:Contact].Account",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					}
				}
			},
			userCode: {}
		};
	}
);


