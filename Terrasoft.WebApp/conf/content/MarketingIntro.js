Terrasoft.configuration.Structures["MarketingIntro"] = {innerHierarchyStack: ["MarketingIntro"], structureParent: "SimpleIntro"};
define('MarketingIntroStructure', ['MarketingIntroResources'], function(resources) {return {schemaUId:'5935217f-a732-4541-9121-306140419a61',schemaCaption: "Marketing main page", parentSchemaName: "SimpleIntro", schemaName:'MarketingIntro',parentSchemaUId:'bb057159-e980-45c5-9e98-e93dc287e20a',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MarketingIntro", ["MarketingIntroResources"], function(resources) {
	return {
		attributes: {},
		methods: {},
		diff: [
			{
				"operation": "insert",
				"name": "MarketingTile",
				"propertyName": "items",
				"parentName": "LeftContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generator": "MainMenuTileGenerator.generateMainMenuTile",
					"caption": {"bindTo": "Resources.Strings.MarketingCaption"},
					"cls": "marketing",
					"icon": resources.localizableImages.CampaignsIcon,
					"items": []
				},
				"index": 1
			},
			{
				"operation": "remove",
				"name": "ContactSectionV2"
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "MarketingTile",
				"name": "ContactSectionV2",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.ContactSectionCaption"},
					"tag": "SectionModuleV2/ContactSectionV2/",
					"click": {"bindTo": "onNavigateTo"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "MarketingTile",
				"name": "CampaignSectionV2",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.CampaignSectionCaption"},
					"tag": "SectionModuleV2/CampaignSectionV2/",
					"click": {"bindTo": "onNavigateTo"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "MarketingTile",
				"name": "BulkEmailSectionV2",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.BulkEmailSectionCaption"},
					"tag": "SectionModuleV2/BulkEmailSectionV2/",
					"click": {"bindTo": "onNavigateTo"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "MarketingTile",
				"name": "CampaignPlannerSection",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.CampaignPlannerSectionCaption"},
					"tag": "SectionModuleV2/CampaignPlannerSection/",
					"click": {"bindTo": "onNavigateTo"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "MarketingTile",
				"name": "GeneratedWebFormSectionV2",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.GeneratedWebFormSectionCaption"},
					"tag": "SectionModuleV2/GeneratedWebFormSectionV2/",
					"click": {"bindTo": "onNavigateTo"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "MarketingTile",
				"name": "EventSectionV2",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.EventSectionCaption"},
					"tag": "SectionModuleV2/EventSectionV2/",
					"click": {"bindTo": "onNavigateTo"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "MarketingTile",
				"name": "LeadSectionV2",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.LeadSectionCaption"},
					"tag": "SectionModuleV2/LeadSectionV2/",
					"click": {"bindTo": "onNavigateTo"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "BasicTile",
				"name": "ProductSectionV2",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.ProductSectionCaption"},
					"tag": "SectionModuleV2/ProductSectionV2/",
					"click": {"bindTo": "onNavigateTo"}
				},
				"index": 1
			},
			{
				"operation": "remove",
				"name": "MobileAppLinksPanel"
			}
		]
	};
});


