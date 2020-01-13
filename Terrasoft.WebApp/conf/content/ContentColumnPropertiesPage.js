Terrasoft.configuration.Structures["ContentColumnPropertiesPage"] = {innerHierarchyStack: ["ContentColumnPropertiesPage"], structureParent: "ContentItemPropertiesPage"};
define('ContentColumnPropertiesPageStructure', ['ContentColumnPropertiesPageResources'], function(resources) {return {schemaUId:'775b8da9-9042-4d73-9b69-d3be826f4803',schemaCaption: "ContentColumnPropertiesPage", parentSchemaName: "ContentItemPropertiesPage", schemaName:'ContentColumnPropertiesPage',parentSchemaUId:'fe424518-8ce5-46a4-a265-ea8ff4ecd12d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContentColumnPropertiesPage", [],
	function() {
		return {
			modules: {
				VerticalAlignPropertyModulePage: {
					moduleId: "VerticalAlignPropertyModulePage",
					moduleName: "ConfigurationModuleV2",
					config: {
						schemaName: "VerticalAlignPropertyModule",
						isSchemaConfigInitialized: true,
						useHistoryState: false,
						parameters: {
							viewModelConfig: {
								Config: {
									attributeValue: "Config"
								},
								PropertyName: "WrapperStyles"
							}
						}
					}
				}
			},
			attributes: {},
			methods: {},
			diff: [
				{
					"operation": "insert",
					"name": "ContentColumnPropertiesContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["content-block-structure-wrapper"]
					}
				},
				{
					"operation": "insert",
					"name": "ColumnStylesContainer",
					"propertyName": "items",
					"parentName": "ContentColumnPropertiesContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["content-styles-container"]
					}
				},
				{
					"operation": "insert",
					"name": "VerticalAlignLabelContainer",
					"parentName": "ColumnStylesContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["align-label-wrapper"]
					},
					"index": 2
				},
				{
					"operation": "insert",
					"parentName": "VerticalAlignLabelContainer",
					"name": "VerticalAlignLabel",
					"propertyName": "items",
					"values": {
						"classes": {"labelClass": ["align-label"]},
						"itemType": Terrasoft.ViewItemType.LABEL,
						"markerValue": "VerticalAlignLabel",
						"caption": "$Resources.Strings.VerticalAlign"
					}
				},
				{
					"operation": "insert",
					"name": "VerticalAlignInfoTip",
					"parentName": "VerticalAlignLabelContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": "$Resources.Strings.VerticalAlignInfo",
						"style": Terrasoft.TipStyle.GREEN,
						"behaviour": {
							"displayEvent": Terrasoft.TipDisplayEvent.HOVER
						}
					}
				},
				{
					"operation": "insert",
					"name": "VerticalAlignContainer",
					"parentName": "ColumnStylesContainer",
					"propertyName": "items",
					"values": {
						"markerValue": "VerticalAlignContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["content-builder-align-container"],
						"items": []
					},
					"index": 3
				},
				{
					"operation": "insert",
					"name": "VerticalAlignPropertyModulePage",
					"parentName": "VerticalAlignContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE
					}
				}
			]
		};
	});


