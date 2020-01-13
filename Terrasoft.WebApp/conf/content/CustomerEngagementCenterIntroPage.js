Terrasoft.configuration.Structures["CustomerEngagementCenterIntroPage"] = {innerHierarchyStack: ["CustomerEngagementCenterIntroPage"], structureParent: "SimpleIntro"};
define('CustomerEngagementCenterIntroPageStructure', ['CustomerEngagementCenterIntroPageResources'], function(resources) {return {schemaUId:'b3a59262-0c2c-4af9-b042-bee228ad159c',schemaCaption: "Main page schema - Customer Engagement Center", parentSchemaName: "SimpleIntro", schemaName:'CustomerEngagementCenterIntroPage',parentSchemaUId:'bb057159-e980-45c5-9e98-e93dc287e20a',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CustomerEngagementCenterIntroPage", ["CustomerEngagementCenterIntroPageResources", "css!IntroPageCSS"],
	function(resources) {
		return {
			attributes: {},
			methods: {},
			diff: [
				{
					"operation": "remove",
					"name": "MobileAppLinksPanel"
				},
				{
					"operation": "insert",
					"name": "ServiceTile",
					"propertyName": "items",
					"parentName": "LeftContainer",
					"index": 1,
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"generator": "MainMenuTileGenerator.generateMainMenuTile",
						"caption": {"bindTo": "Resources.Strings.ServiceCaption"},
						"cls": "service-tile customer-engagement-center-tile",
						"icon": resources.localizableImages.ServiceIcon,
						"items": []
					}
				},
				{
					"operation": "insert",
					"propertyName": "items",
					"parentName": "ServiceTile",
					"name": "OperatorSingleWindowModule",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LINK,
						"caption": {"bindTo": "Resources.Strings.OperatorSingleWindowModuleCaption"},
						"tag": "OperatorSingleWindowModule/",
						"click": {"bindTo": "onNavigateTo"}
					}
				},
				{
					"operation": "insert",
					"propertyName": "items",
					"parentName": "ServiceTile",
					"name": "QueueItemSection",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LINK,
						"caption": {"bindTo": "Resources.Strings.QueuesSectionCaption"},
						"tag": "SectionModuleV2/QueueItemSection/",
						"click": {"bindTo": "onNavigateTo"}
					}
				},
				{
					"operation": "insert",
					"propertyName": "items",
					"parentName": "ServiceTile",
					"name": "CaseSection",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LINK,
						"caption": {"bindTo": "Resources.Strings.CaseSectionCaption"},
						"tag": "SectionModuleV2/CaseSection/",
						"click": {"bindTo": "onNavigateTo"}
					}
				},
				{
					"operation": "insert",
					"propertyName": "items",
					"parentName": "ServiceTile",
					"name": "ServiceItemSection",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LINK,
						"caption": {"bindTo": "Resources.Strings.ServiceSectionCaption"},
						"tag": "SectionModuleV2/ServiceItemSection/",
						"click": {"bindTo": "onNavigateTo"}
					}
				}
			]
		};
	}
);


