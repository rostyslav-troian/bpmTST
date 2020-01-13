Terrasoft.configuration.Structures["OpportunityProductPageV2"] = {innerHierarchyStack: ["OpportunityProductPageV2"], structureParent: "BasePageV2"};
define('OpportunityProductPageV2Structure', ['OpportunityProductPageV2Resources'], function(resources) {return {schemaUId:'c65f205e-fb4a-4fbd-a33a-72037105d152',schemaCaption: "OpportunityProductPageV2", parentSchemaName: "BasePageV2", schemaName:'OpportunityProductPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OpportunityProductPageV2", ["MoneyModule"],
		function(MoneyModule) {
			return {
				entitySchemaName: "OpportunityProductInterest",
				attributes: {
					/**
					 * Product
					 */
					"Product": {
						lookupListConfig: {
							columns: ["Price", "Currency", "Currency.Division"]
						},
						dependencies: [
							{
								columns: ["Product"],
								methodName: "calculatePrice"
							}
						]
					},
					/**
					 * Amount
					 */
					"Amount": {
						dependencies: [
							{
								columns: ["Price", "Quantity"],
								methodName: "recalculateAmount"
							}
						]
					}
				},
				details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
				methods: {
					/**
					 * Validates fields of the card.
					 * @override
					 * @return {Boolean}
					 */
					validate: function() {
						var isValid = this.callParent(arguments);
						if (!isValid) {
							return false;
						}
						var quantity = this.get("Quantity");
						if (quantity < 0) {
							this.showInformationDialog(this.get("Resources.Strings.FieldMustBeGreaterOrEqualZeroMessage"));
							return false;
						}
						return true;
					},

					/**
					 * Recalculates products amount in opportunity.
					 * @private
					 */
					recalculateAmount: function() {
						var price = this.get("Price");
						var quantity = this.get("Quantity");
						if (price && quantity) {
							this.set("Amount", price * quantity);
						}
					},

					/**
					 * Recalculates product price.
					 * @private
					 */
					calculatePrice: function() {
						var product = this.get("Product");
						if (this.Ext.isEmpty(product) || this.Ext.isEmpty(product.Currency)) {
							return;
						}
						MoneyModule.onLoadCurrencyRate.call(this, product.Currency.value, null, function(item) {
							var price = (product.Price * item.Division) / (item.Rate);
							this.set("Price", price);
						});
					},

					/**
					 * Returns action list in page.
					 * @override
					 * @return {Terrasoft.BaseViewModelCollection}
					 */
					getActions: function() {
						var actionMenuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
						return actionMenuItems;
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
							"layout": {"column": 0, "row": 0, "colSpan": 12},
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
						"name": "Product",
						"values": {
							"bindTo": "Product",
							"layout": {"column": 0, "row": 1, "colSpan": 12}
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "Price",
						"values": {
							"bindTo": "Price",
							"layout": {"column": 0, "row": 2, "colSpan": 12}
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "Quantity",
						"values": {
							"bindTo": "Quantity",
							"layout": {"column": 0, "row": 3, "colSpan": 12}
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "Amount",
						"values": {
							"bindTo": "Amount",
							"layout": {"column": 0, "row": 4, "colSpan": 12}
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "OfferDate",
						"values": {
							"bindTo": "OfferDate",
							"layout": {"column": 0, "row": 5, "colSpan": 12}
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "OfferResult",
						"values": {
							"bindTo": "OfferResult",
							"layout": {"column": 0, "row": 6, "colSpan": 12},
							"contentType": Terrasoft.ContentType.ENUM
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "Comment",
						"values": {
							"bindTo": "Comment",
							"layout": {"column": 0, "row": 7, "colSpan": 12}
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
					},
					{
						"operation": "insert",
						"name": "OpportunityProductPageGeneralTabContainer",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"alias": {"name": "GeneralInfoTab"},
						"values": {
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "OpportunityProductPageGeneralTabContainer",
						"propertyName": "items",
						"name": "OpportunityProductPageGeneralBlock",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": []
						}
					}
				]/**SCHEMA_DIFF*/
			};
		});


