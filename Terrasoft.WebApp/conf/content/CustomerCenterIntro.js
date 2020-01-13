Terrasoft.configuration.Structures["CustomerCenterIntro"] = {innerHierarchyStack: ["CustomerCenterIntro"], structureParent: "SimpleIntro"};
define('CustomerCenterIntroStructure', ['CustomerCenterIntroResources'], function(resources) {return {schemaUId:'bfbf5a50-6c23-4362-8b30-e05a0ff3eb95',schemaCaption: "Main page schema - Customer Center", parentSchemaName: "SimpleIntro", schemaName:'CustomerCenterIntro',parentSchemaUId:'bb057159-e980-45c5-9e98-e93dc287e20a',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CustomerCenterIntro", ["CustomerCenterIntroResources", "css!IntroPageCSS"],
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


