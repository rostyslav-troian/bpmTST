Terrasoft.configuration.Structures["EnterpriseIntro"] = {innerHierarchyStack: ["EnterpriseIntro"], structureParent: "SimpleIntro"};
define('EnterpriseIntroStructure', ['EnterpriseIntroResources'], function(resources) {return {schemaUId:'749717c3-4dcb-469c-99af-5165abe878e9',schemaCaption: "Enterprise - Product main page schema", parentSchemaName: "SimpleIntro", schemaName:'EnterpriseIntro',parentSchemaUId:'bb057159-e980-45c5-9e98-e93dc287e20a',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EnterpriseIntro", ["EnterpriseIntroResources"], function(resources) {
	return {
		attributes: {},
		methods: {},
		diff: [
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "BasicTile",
				"name": "LeadSectionV2",
				"index": 1,
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"moduleName": "Lead",
					"click": {"bindTo": "onNavigateTo"}
				}
			},
			{
				"operation": "insert",
				"name": "SalesTile",
				"propertyName": "items",
				"parentName": "LeftContainer",
				"index": 1,
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generator": "MainMenuTileGenerator.generateMainMenuTile",
					"caption": {"bindTo": "Resources.Strings.SalesCaption"},
					"cls": "sales-tile",
					"icon": resources.localizableImages.SalesIcon,
					"items": []
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SalesTile",
				"name": "OpportunitySectionV2",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"moduleName": "Opportunity",
					"click": {"bindTo": "onNavigateTo"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SalesTile",
				"name": "OrderSectionV2",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"moduleName": "Order",
					"click": {"bindTo": "onNavigateTo"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SalesTile",
				"name": "ContractSectionV2",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"moduleName": "Contract",
					"click": {"bindTo": "onNavigateTo"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SalesTile",
				"name": "DocumentSectionV2",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"moduleName": "Document",
					"click": {"bindTo": "onNavigateTo"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SalesTile",
				"name": "InvoiceSectionV2",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"moduleName": "Invoice",
					"click": {"bindTo": "onNavigateTo"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SalesTile",
				"name": "ProductSectionV2",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"moduleName": "Product",
					"click": {"bindTo": "onNavigateTo"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SalesTile",
				"name": "ProjectSectionV2",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"moduleName": "Project",
					"click": {"bindTo": "onNavigateTo"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SalesTile",
				"name": "ForecastsModule",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"moduleName": "Forecast",
					"click": {"bindTo": "onNavigateTo"}
				}
			}
		]
	};
});


