Terrasoft.configuration.Structures["PortalOrderPage"] = {innerHierarchyStack: ["PortalOrderPage"], structureParent: "BaseOrderPage"};
define('PortalOrderPageStructure', ['PortalOrderPageResources'], function(resources) {return {schemaUId:'98fcafed-457b-419a-a347-82a4c55232a0',schemaCaption: "Portal order page", parentSchemaName: "BaseOrderPage", schemaName:'PortalOrderPage',parentSchemaUId:'041fd481-1807-46f4-ac35-6c99c34ae552',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalOrderPage", [],
	function() {
		return {
			entitySchemaName: "Order",
			methods: {},
			details: /**SCHEMA_DETAILS*/{
				"PortalSupplyPaymentDetail": {
					"schemaName": "PortalSupplyPaymentDetailV2",
					"entitySchemaName": "SupplyPaymentElement",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "Order"
					},
					"defaultValues": {
						"Currency": {
							"masterColumn": "Currency"
						},
						"CurrencyRate": {
							"masterColumn": "CurrencyRate"
						}
					},
					"subscriber": {"methodName": "refreshAmount"}
				},
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "OrderPassportTab",
					"propertyName": "items",
					"name": "PortalSupplyPaymentDetail",
					"values": {"itemType": Terrasoft.ViewItemType.DETAIL}
				},
				{
					"operation": "remove",
					"name": "SupplyPayment"
				}
			]/**SCHEMA_DIFF*/
		};
	});


