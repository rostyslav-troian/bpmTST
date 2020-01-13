Terrasoft.configuration.Structures["ContentElementPanel"] = {innerHierarchyStack: ["ContentElementPanel"], structureParent: "ContentItemPanel"};
define('ContentElementPanelStructure', ['ContentElementPanelResources'], function(resources) {return {schemaUId:'dfb834c9-541a-4ee6-acf0-9ecf83a8ad25',schemaCaption: "ContentElementPanel", parentSchemaName: "ContentItemPanel", schemaName:'ContentElementPanel',parentSchemaUId:'6afe96ba-21f6-4518-a354-c0a1aa7b1151',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContentElementPanel", [], function() {
	return {
		methods: {

			// region Methods: Protected

			/**
			 * @inheritdoc ContentItemPanel#initPanelAttributes
			 * @overridden
			 */
			initPanelAttributes: function() {
				this.callParent(arguments);
				if (this.$ElementInfo) {
					const elementSettings = this.$ElementInfo.Settings;
					const caption = this.$ElementInfo.DesignTimeConfig && this.$ElementInfo.DesignTimeConfig.Caption;
					if (caption) {
						this.$ElementCaption = this.$ElementInfo.DesignTimeConfig.Caption;
					}
					const icon = elementSettings && elementSettings.panelIcon;
					if (icon) {
						this.$ElementIcon = icon;
					}
					const contextHelpText = elementSettings && elementSettings.contextHelpText;
					if (contextHelpText) {
						this.$ElementContextHelp = contextHelpText;
					}
					this.$IsStylesVisible = elementSettings && elementSettings.isStylesVisible;
				}
			},

			/**
			 * @inheritdoc ContentItemPanel#initActiveTab
			 * @overridden
			 */
			initActiveTab: Terrasoft.emptyFn,

			/**
			 * @inheritdoc BasePageV2#onRender
			 * @overridden
			 */
			onRender: function() {
				this.callParent(arguments);
				const elementSettings = this.$ElementInfo && this.$ElementInfo.Settings;
				if (elementSettings) {
					const schemaName = elementSettings.schemaName;
					if (schemaName && !elementSettings.notImplemented) {
						this.sandbox.loadModule("ConfigurationModuleV2", {
							renderTo: "ContentElementAttributesContainer",
							moduleId: this.sandbox.id + schemaName,
							instanceConfig: {
								useHistoryState: false,
								schemaName: schemaName,
								isSchemaConfigInitialized: true,
								parameters: {
									viewModelConfig: {
										Config: this.$Config
									}
								}
							}
						});
					}
				}
			}

			// endregion

		},
		diff: [
			{
				"operation": "insert",
				"name": "ContentElementAttributesContainer",
				"parentName": "PropertiesContent",
				"propertyName": "items",
				"values": {
					"id": "ContentElementAttributesContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				},
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ContentElementStylesContainer",
				"parentName": "PropertiesContent",
				"propertyName": "items",
				"values": {
					"id": "ContentElementStylesContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"visible": "$IsStylesVisible"
				},
				"index": 1
			},
			{
				"operation": "move",
				"name": "ContentItemStylesPageModule",
				"parentName": "ContentElementStylesContainer",
				"propertyName": "items"
			},
			{
				"operation": "merge",
				"name": "PropertiesTabPanel",
				"values": {
					"visible": false
				}
			},
			{
				"operation": "remove",
				"name": "ContentBlockPropertiesPageModule"
			}
		]
	};
});


