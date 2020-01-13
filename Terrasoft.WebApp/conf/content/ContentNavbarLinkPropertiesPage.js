Terrasoft.configuration.Structures["ContentNavbarLinkPropertiesPage"] = {innerHierarchyStack: ["ContentNavbarLinkPropertiesPage"], structureParent: "ContentItemPropertiesPage"};
define('ContentNavbarLinkPropertiesPageStructure', ['ContentNavbarLinkPropertiesPageResources'], function(resources) {return {schemaUId:'9248228a-d127-4eec-8759-f0f6a86010b3',schemaCaption: "ContentNavbarLinkPropertiesPage", parentSchemaName: "ContentItemPropertiesPage", schemaName:'ContentNavbarLinkPropertiesPage',parentSchemaUId:'fe424518-8ce5-46a4-a265-ea8ff4ecd12d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 /**
 * @extends ContentItemPropertiesPage
 */
define("ContentNavbarLinkPropertiesPage", ["css!ContentNavbarLinkPropertiesPageCSS"],
		function() {
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
			}
		},
		attributes: {
			/**
			 * Navbar link url.
			 */
			Link: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onLinkChanged"
			}
		},
		methods: {
			
			/**
			 * @private
			 */
			_onLinkChanged: function(model, link) {
				this.$Config.Url = link;
				this.save();
			},

			/**
			 * @inheritdoc ContentItemPropertiesPage#onContentItemConfigChanged
			 * @overridden
			 */
			onContentItemConfigChanged: function(config) {
				this.callParent(arguments);
				if (config) {
					this.$Link = Ext.isEmpty(config.Url) ? null : config.Url;
				}
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "ContentNavbarLinkProperties",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["content-styles-editor-wrapper", "content-navbar-link-properties"]
				}
			},
			{
				"operation": "insert",
				"parentName": "ContentNavbarLinkProperties",
				"name": "LinkGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.LinkToOpen"
				}
			},
			{
				"operation": "insert",
				"parentName": "LinkGroup",
				"propertyName": "items",
				"name": "Link",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$Link",
					"markerValue": "Link",
					"wrapClass": ["style-input link"],
					"labelConfig": {"visible": false},
					"controlConfig": {"placeholder": ""}
				}
			},
			{
				"operation": "insert",
				"name": "FontGroup",
				"parentName": "ContentNavbarLinkProperties",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.FontCaption",
					"wrapClass": ["font-control-group"]
				}
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
				"name": "PaddingGroup",
				"parentName": "ContentNavbarLinkProperties",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.PaddingCaption",
					"wrapClass": ["padding-control-group"]
				}
			},
			{
				"operation": "insert",
				"name": "PaddingPropertyModulePage",
				"parentName": "PaddingGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE
				}
			}
		]
	};
});


