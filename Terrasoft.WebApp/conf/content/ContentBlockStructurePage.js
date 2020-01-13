Terrasoft.configuration.Structures["ContentBlockStructurePage"] = {innerHierarchyStack: ["ContentBlockStructurePage"], structureParent: "BaseContentItemStructurePage"};
define('ContentBlockStructurePageStructure', ['ContentBlockStructurePageResources'], function(resources) {return {schemaUId:'febd1c95-6d6a-43e0-ba5c-425664a4fccc',schemaCaption: "ContentBlockStructurePage", parentSchemaName: "BaseContentItemStructurePage", schemaName:'ContentBlockStructurePage',parentSchemaUId:'3a9c94fb-df94-4c89-bdff-d5f4d7a35844',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContentBlockStructurePage", ["ContentSectionItemViewModel", "ContentMjHeroItemViewModel"],
	function() {
		return {
			modules: {
				BackgroundPropertyModulePage: {
					moduleId: "BackgroundPropertyModulePage",
					moduleName: "ConfigurationModuleV2",
					config: {
						schemaName: "BackgroundPropertyModule",
						isSchemaConfigInitialized: true,
						useHistoryState: false,
						parameters: {
							viewModelConfig: {
								Config: {
									attributeValue: "Config"
								},
								PropertyName: "Styles"
							}
						}
					}
				}
			},
			properties: {
				/**
				 * @inheritdoc BaseContentItemStructurePage#itemViewModelNames
				 * @override
				 */
				itemViewModelNames: {
					section: "Terrasoft.ContentSectionItemViewModel",
					mjhero: "Terrasoft.ContentMjHeroItemViewModel"
				},
				/**
				 * @inheritdoc BaseContentItemStructurePage#sandboxId
				 * @override
				 */
				sandboxId: "ContentBlockStructurePage"
			},
			methods: {

				/**
				 * Handler for add section item action.
				 * @protected
				 */
				onAddSectionItemClick: function() {
					this.addStructureItem("section");
				},

				/**
				 * Handler for add hero item action.
				 * @protected
				 */
				onAddHeroItemClick: function() {
					this.addStructureItem("mjhero");
				}
			},
			diff: [
				{
					"operation": "insert",
					"name": "AddSectionItemButton",
					"parentName": "ActionsStructureContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12,
							"rowSpan": 1
						},
						"imageConfig": "$Resources.Images.AddButtonIcon",
						"caption": "$Resources.Strings.AddStructureItemBtnCaption",
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"click": "$onAddSectionItemClick",
						"enabled": "$CanAddStructureItem",
						"classes": {
							wrapperClass: ["structure-button-control"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "AddHeroItemButton",
					"parentName": "ActionsStructureContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"layout": {
							"column": 12,
							"row": 0,
							"colSpan": 12,
							"rowSpan": 1
						},
						"imageConfig": "$Resources.Images.AddButtonIcon",
						"caption": "$Resources.Strings.AddHeroButtonCaption",
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"click": "$onAddHeroItemClick",
						"enabled": "$CanAddStructureItem",
						"classes": {
							wrapperClass: ["structure-button-control"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "BackgroundGroup",
					"parentName": "BlockStylesContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": "$Resources.Strings.BackgroundLabelCaption",
						"wrapClass": ["background-control-group"]
					}
				},
				{
					"operation": "insert",
					"name": "BackgroundPropertyModulePage",
					"parentName": "BackgroundGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE
					}
				}
			]
		};
	});


