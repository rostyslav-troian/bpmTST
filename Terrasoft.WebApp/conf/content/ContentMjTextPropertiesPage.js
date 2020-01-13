Terrasoft.configuration.Structures["ContentMjTextPropertiesPage"] = {innerHierarchyStack: ["ContentMjTextPropertiesPage"], structureParent: "ContentItemPropertiesPage"};
define('ContentMjTextPropertiesPageStructure', ['ContentMjTextPropertiesPageResources'], function(resources) {return {schemaUId:'f353542f-f744-4806-9b2a-01fd1343554a',schemaCaption: "ContentMjTextPropertiesPage", parentSchemaName: "ContentItemPropertiesPage", schemaName:'ContentMjTextPropertiesPage',parentSchemaUId:'fe424518-8ce5-46a4-a265-ea8ff4ecd12d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
  define("ContentMjTextPropertiesPage", ["css!ContentItemStylesPageCSS"], function() {
	return {
		modules: {
			FontFamilyPropertyModulePage: {
				moduleId: "FontFamilyPropertyModulePage",
				moduleName: "ConfigurationModuleV2",
				config: {
					schemaName: "FontFamilyPropertyModule",
					isSchemaConfigInitialized: true,
					useHistoryState: false,
					parameters: {
						viewModelConfig: {
							Config: {
								attributeValue: "Config"
							},
							PropertyName: "Styles",
							UseLetterSpacing: true
						}
					}
				}
			},
			FontPropertyModulePage: {
				moduleId: "FontPropertyModulePage",
				moduleName: "ConfigurationModuleV2",
				config: {
					schemaName: "FontPropertyModule",
					isSchemaConfigInitialized: true,
					useHistoryState: false,
					parameters: {
						viewModelConfig: {
							Config: {
								attributeValue: "Config"
							},
							PropertyName: "Styles",
							UseLetterSpacing: true
						}
					}
				}
			},
			TextAlignPropertyModulePage: {
				moduleId: "TextAlignPropertyModulePage",
				moduleName: "ConfigurationModuleV2",
				config: {
					schemaName: "TextAlignPropertyModule",
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
			},
			PaddingPropertyModulePage: {
				moduleId: "PaddingPropertyModulePage",
				moduleName: "ConfigurationModuleV2",
				config: {
					schemaName: "PaddingPropertyModule",
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
			},
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
							PropertyName: "Styles",
							UseImage: false
						}
					}
				}
			}
		},
		attributes: {
			/**
			 * Text element height.
			 */
			Height: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onTextHeightChanged"
			}
		},
		properties: {
			workStyles: ["height"]
		},
		methods: {

			/**
			 * @private
			 */
			_onTextHeightChanged: function(model, height) {
				if (this.isChanged(this.$Config.Styles.height + "px", this.$Height)) {
					if (!Ext.isEmpty(height)) {
						Ext.apply(this.$Config.Styles, {
							"height": height + "px"
						});
					} else {
						delete this.$Config.Styles.height;
					}
					this.save();
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
			 * @override
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("Height", this.positiveNumberValidator);
			},

			/**
			 * @inheritdoc ContentItemPropertiesPage#onContentItemConfigChanged
			 * @overridden
			 */
			onContentItemConfigChanged: function(config) {
				if (config) {
					config.Styles = config.Styles || {};
					this.$Height = config.Styles.height ? parseFloat(config.Styles.height) : Terrasoft.emptyString;
				}
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "ContentTextPropertiesContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["content-styles-editor-wrapper"]
				}
			},
			{
				"operation": "insert",
				"name": "FontGroup",
				"parentName": "ContentTextPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.FontCaption",
					"wrapClass": ["font-control-group"]
				},
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FontFamilyPropertyModulePage",
				"parentName": "FontGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE
				}
			},
			{
				"operation": "insert",
				"name": "FontPropertyModulePage",
				"parentName": "FontGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE
				}
			},
			{
				"operation": "insert",
				"name": "TextAlignGroup",
				"parentName": "ContentTextPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.TextAlignCaption"
				},
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TextAlignContainer",
				"parentName": "TextAlignGroup",
				"propertyName": "items",
				"values": {
					"markerValue": "AlignContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["content-builder-align-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "TextAlignPropertyModulePage",
				"parentName": "TextAlignContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE
				}
			},
			{
				"operation": "insert",
				"name": "TextSizeGroup",
				"parentName": "ContentTextPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.TextElementHeight"
				},
				"index": 2
			},
			{
				"operation": "insert",
				"parentName": "TextSizeGroup",
				"name": "TextSizeGroupContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper"]
				}
			},
			{
				"operation": "insert",
				"parentName": "TextSizeGroupContainer",
				"propertyName": "items",
				"name": "Height",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"wrapClass": ["style-input"],
					"controlConfig": {"placeholder": "$Resources.Strings.PlaceholderAutoText"},
					"classes": {"wrapClassName": ["show-placeholder width-50"]},
					"markerValue": "TextHeight",
					"labelConfig": {
						"visible": false
					}
				}
			},
			{
				"operation": "insert",
				"name": "PaddingGroup",
				"parentName": "ContentTextPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.PaddingCaption",
					"wrapClass": ["padding-control-group"]
				},
				"index": 3
			},
			{
				"operation": "insert",
				"name": "PaddingPropertyModulePage",
				"parentName": "PaddingGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE
				}
			},
			{
				"operation": "insert",
				"name": "BackgroundGroup",
				"parentName": "ContentTextPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.BackgroundLabelCaption",
					"wrapClass": ["background-control-group"]
				},
				"index": 4
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


