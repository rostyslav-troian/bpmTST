Terrasoft.configuration.Structures["BaseOpportunityContactPage"] = {innerHierarchyStack: ["BaseOpportunityContactPage"], structureParent: "BasePageV2"};
define('BaseOpportunityContactPageStructure', ['BaseOpportunityContactPageResources'], function(resources) {return {schemaUId:'c4a13af6-0c5b-41d5-9c4a-c0863c186cfb',schemaCaption: "BaseOpportunityContactPage", parentSchemaName: "BasePageV2", schemaName:'BaseOpportunityContactPage',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseOpportunityContactPage", [], function() {
	return {
		entitySchemaName: "OpportunityContact",
		attributes: {
			"ContactLoyality": {
				lookupListConfig: {
					orders: [{columnPath: "Position"}]
				}
			},
			"Opportunity": {
				lookupListConfig: {
					columns: ["Account"]
				}
			},
			"Contact": {
				lookupListConfig: {
					filter: function() {
						var opportunity = this.get("Opportunity");
						if (opportunity && opportunity.Account) {
							return this.getFilterByRelationColumn(opportunity.Account);
						}
					}
				}
			}
		},
		methods: {
			/**
			 * @inheritdoc Terrasoft.BasePageV2#getUpdateDetailOnSavedConfig
			 * @overridden
			 */
			getUpdateDetailOnSavedConfig: function() {
				var updateConfig = {};
				if (this.get("IsMainContact")) {
					updateConfig.reloadAll = true;
				} else {
					updateConfig.primaryColumnValue = this.get(this.primaryColumnName);
				}
				return updateConfig;
			},

			/**
			 * Gets filter by relation column.
			 * @private
			 * @param {Object} column Column-lookup.
			 * @return {Object}
			 */
			getFilterByRelationColumn: function(column) {
				if (column) {
					return this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL, "Account",
						column.value);
				}
				return null;
			}
		},
		details: /**SCHEMA_DETAILS*/{
			OppContactMotivator: {
				schemaName: "OppContactMotivatorsDetailV2",
				filter: {
					masterColumn: "Id",
					detailColumn: "OpportunityContact"
				}
			}
		}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Opportunity",
				"values": {
					"bindTo": "Opportunity",
					"layout": {"column": 0, "row": 0, "colSpan": 24},
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
				"name": "Contact",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 18}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "IsMainContact",
				"values": {
					"layout": {"column": 19, "row": 1, "colSpan": 6}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Role",
				"values": {
					"layout": {"column": 0, "row": 2, "colSpan": 24},
					"contentType": Terrasoft.ContentType.ENUM
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Influence",
				"values": {
					"layout": {"column": 0, "row": 3, "colSpan": 24},
					"contentType": Terrasoft.ContentType.ENUM
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "ContactLoyality",
				"values": {
					"layout": {"column": 0, "row": 4, "colSpan": 24},
					"contentType": Terrasoft.ContentType.ENUM
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Description",
				"values": {
					"layout": {"column": 0, "row": 5, "colSpan": 24},
					"contentType": Terrasoft.ContentType.LONG_TEXT
				}
			},
			{
				"operation": "insert",
				"parentName": "CardContentContainer",
				"propertyName": "items",
				"name": "OppContactMotivator",
				"values": {
					itemType: Terrasoft.ViewItemType.DETAIL,
					"layout": {"column": 0, "row": 6, "colSpan": 24}
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
		]/**SCHEMA_DIFF*/
	};
});


