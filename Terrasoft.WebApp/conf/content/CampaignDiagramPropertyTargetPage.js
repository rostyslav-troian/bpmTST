Terrasoft.configuration.Structures["CampaignDiagramPropertyTargetPage"] = {innerHierarchyStack: ["CampaignDiagramPropertyTargetPage"], structureParent: "CampaignDiagramPropertyEntityPage"};
define('CampaignDiagramPropertyTargetPageStructure', ['CampaignDiagramPropertyTargetPageResources'], function(resources) {return {schemaUId:'1f2986c4-370c-4891-b3ed-5975f75f59db',schemaCaption: "CampaignDiagramPropertyTargetPage", parentSchemaName: "CampaignDiagramPropertyEntityPage", schemaName:'CampaignDiagramPropertyTargetPage',parentSchemaUId:'3c811c21-97f5-46b9-bc3c-8c4b9bd6741b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignDiagramPropertyTargetPage", ["terrasoft", "CampaignDiagramPropertyTargetPage",
		"MarketingEnums", "CampaignDiagramPropertyEnums", "css!CampaignDiagramPropertyConnectorPageCSS"],
	function(Terrasoft, resources, MarketingEnums, CampaignDiagramPropertyEnums) {
		return {
			entitySchemaName: "ContactFolder",
			methods: {
				/**
				 * Returns a collection of fields used in the entity.
				 * @protected
				 * @overridden
				 * @return {Array} Collection fields.
				 */
				getUsedColumns: function() {
					return [
						"Id",
						"Name"
					];
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "CampaignDiagramPropertyDescriptionContainer"
				},
				{
					"operation": "remove",
					"name": "DiagramElementLookup"
				},
				{
					"operation": "insert",
					"name": "InfoContainer",
					"parentName": "CampaignDiagramPropertyEntityMainContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "InfoLayout",
					"parentName": "InfoContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "InfoLayout",
					"propertyName": "items",
					"name": "InformationTooltipButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"imageConfig": {"bindTo": "InfoButtonImageConfig"},
						"classes": {
							"wrapperClass": ["no-padding", "info-button"],
							"imageClass": ["info-button-image", "size-24px"]
						},
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 1,
							"rowSpan": 1
						},
						"showTooltip": false
					}
				},
				{
					"operation": "insert",
					"parentName": "InfoLayout",
					"propertyName": "items",
					"name": "InformationLabel",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.InfoCaption"},
						"classes": {
							"labelClass": [
								"description-label", "color-gray"
							],
							"wrapClass": [
								"description-wrap"
							]
						},
						"layout": {
							"column": 3,
							"row": 0,
							"colSpan": 21,
							"rowSpan": 2
						}
					}
				},
				{
					"operation": "insert",
					"name": "DiagramElementLookup",
					"parentName": "CampaignDiagramPropertyEntityMainContainer",
					"propertyName": "items",
					"values": {
						"bindTo": "DiagramElementLookup",
						"dataValueType": Terrasoft.DataValueType.LOOKUP,
						"caption": CampaignDiagramPropertyEnums.CampaignPropertyLabelCaption.CONTACT_FOLDER,
						"controlConfig": {
							"loadVocabulary": {"bindTo": "loadDiagramElementSchemaLookup"},
							"tag": "DiagramElementLookup"
						},
						"visible": {
							"bindTo": "IsExtendedMode"
						},
						"enabled": {
							"bindTo": "IsStatusEnabled"
						},
						"markerValue": {"bindTo": "DiagramElementPageTypeCaption"}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


