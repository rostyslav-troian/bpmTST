Terrasoft.configuration.Structures["DcmParameterSelectionPage"] = {innerHierarchyStack: ["DcmParameterSelectionPage"], structureParent: "ProcessParameterSelectionPage"};
define('DcmParameterSelectionPageStructure', ['DcmParameterSelectionPageResources'], function(resources) {return {schemaUId:'3a11b56f-6cb2-4de9-a8d4-c0b2df8183c2',schemaCaption: "DcmParameterSelectionPage", parentSchemaName: "ProcessParameterSelectionPage", schemaName:'DcmParameterSelectionPage',parentSchemaUId:'b8040a33-ad4a-4d41-b557-661d32347255',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DcmParameterSelectionPage", ["DcmParameterSelectionPageResources"],
        function() {

		return {
			methods: {
				/**
				 * @inheritdoc Terrasoft.MappingPageTabUtilities#getAllTabsConfig
				 * @overridden
				 */
				getAllTabsConfig: function() {
					var mappingType = this.get("MappingType");
					var tabsConfig = this.mixins.mappingPageTabUtilities.getAllTabsConfig();
					if (mappingType && mappingType === Terrasoft.MappingEnums.MappingType.PROCESS_ELEMENT_PARAMETERS) {
						return this.getElementParametersTabConfig(tabsConfig);
					}
					return this.getTabsConfig(tabsConfig);
				},

				/**
				 * Extracts and returns element parameters property with changed module name from all tabs config.
				 * @private
				 * @return {Object} Element parameters tab config.
				 */
				getElementParametersTabConfig: function(tabsConfig) {
					var config = {};
					var elementParametersProperty =
						tabsConfig[Terrasoft.MappingEnums.MappingType.PROCESS_ELEMENT_PARAMETERS];
					elementParametersProperty.ModuleName = "DcmElementParametersMappingModule";
					config[Terrasoft.MappingEnums.MappingType.PROCESS_ELEMENT_PARAMETERS] = elementParametersProperty;
					return config;
				},

				/**
				 * Returns tabs config for Dcm designer mapping window.
				 * @private
				 * @return {Object} Dcm designer tabs config.
				 */
				getTabsConfig: function(tabsConfig) {
					delete tabsConfig[Terrasoft.MappingEnums.MappingType.PROCESS_PARAMETERS];
					return tabsConfig;
				},

				/**
				 * @inheritdoc Terrasoft.ProcessMappingPage#isSingleTab
				 * @overridden
				 */
				isSingleTab: function() {
					return true;
				}
			}
		};

	});


