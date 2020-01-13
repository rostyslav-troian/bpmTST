Terrasoft.configuration.Structures["ContentMjButtonPropertiesPage"] = {innerHierarchyStack: ["ContentMjButtonPropertiesPage"], structureParent: "ContentButtonPropertiesPage"};
define('ContentMjButtonPropertiesPageStructure', ['ContentMjButtonPropertiesPageResources'], function(resources) {return {schemaUId:'6bda9165-7973-4a22-8be6-6a97daed871c',schemaCaption: "Edit page for mjml button content element", parentSchemaName: "ContentButtonPropertiesPage", schemaName:'ContentMjButtonPropertiesPage',parentSchemaUId:'47606d53-316a-4020-84f9-eded4ec28c57',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContentMjButtonPropertiesPage", ["css!ContentMjButtonPropertiesPageCSS"], function() {
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
							PropertyName: "Styles"
						}
					}
				}
			},
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
							PropertyName: "Styles"
						}
					}
				}
			},
			MarginPropertyModulePage: {
				moduleId: "MarginPropertyModulePage",
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
							PropertyName: "WrapperStyles"
						}
					}
				}
			}
		},
		attributes: {},
		methods: {
			/**
			 * @inheritdoc Terrasoft.ContentButtonPropertiesPage#initButton
			 * @override
			 */
			onWidthChanged: function() {
				var width = this.$Width === null ? "auto" : this.$Width + "px";
				Ext.apply(this.$Config.WrapperStyles, {
					"width": width
				});
				this.save(["width"], "WrapperStyles");
			},

			/**
			 * @inheritdoc Terrasoft.ContentButtonPropertiesPage#initWidth
			 * @override
			 */
			initWidth: function() {
				var wrapStyles = this.$Config.WrapperStyles;
				const width = this.getSizeFromStyle("width", wrapStyles);
				this.$Width = width !== "auto" && parseInt(width, 10) >= 0 ? parseInt(width, 10) : null;
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "FontGroup",
				"parentName": "ButtonContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.FontCaption",
					"wrapClass": ["font-control-group"]
				},
				"index": 1
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
				"name": "VerticalAlignGroup",
				"parentName": "AlignWrapContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"wrapClass": ["group-sub-caption"],
					"items": [],
					"caption": "$Resources.Strings.VerticalAlign"
				}
			},
			{
				"operation": "insert",
				"name": "VerticalAlignContainer",
				"parentName": "VerticalAlignGroup",
				"propertyName": "items",
				"values": {
					"markerValue": "VerticalAlignContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["content-builder-align-container"],
					"items": []
				}
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


