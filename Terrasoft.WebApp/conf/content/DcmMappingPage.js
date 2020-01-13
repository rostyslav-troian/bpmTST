Terrasoft.configuration.Structures["DcmMappingPage"] = {innerHierarchyStack: ["DcmMappingPage"], structureParent: "ProcessMappingPage"};
define('DcmMappingPageStructure', ['DcmMappingPageResources'], function(resources) {return {schemaUId:'4e92795a-5e46-43eb-9cfa-6b8591c181f6',schemaCaption: "DcmMappingPage", parentSchemaName: "ProcessMappingPage", schemaName:'DcmMappingPage',parentSchemaUId:'04752e37-8cdc-40a6-8f73-0efec22738e1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: ProcessMappingPage
 */
define("DcmMappingPage", ["terrasoft", "DcmMappingPageResources"], function() {

	return {
		methods: {
			/**
			 * @inheritdoc Terrasoft.MappingPageTabUtilities#getAllTabsConfig
			 * @overridden
			 */
			getAllTabsConfig: function() {
				var tabsConfig = this.mixins.mappingPageTabUtilities.getAllTabsConfig();
				var mappingTypeEnum = Terrasoft.MappingEnums.MappingType;
				delete tabsConfig[mappingTypeEnum.PROCESS_PARAMETERS];
				return tabsConfig;
			}
		}
	};

});


