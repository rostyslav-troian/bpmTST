Terrasoft.configuration.Structures["SectionProcessSettingsManager"] = {innerHierarchyStack: ["SectionProcessSettingsManager"]};
define('SectionProcessSettingsManagerStructure', ['SectionProcessSettingsManagerResources'], function(resources) {return {schemaUId:'435ec4e8-6289-4cda-a0b1-c7970853fa20',schemaCaption: "SectionProcessSettingsManager", parentSchemaName: "", schemaName:'SectionProcessSettingsManager',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SectionProcessSettingsManager", ["BaseProcessSettingsManager", "SectionProcessSettingsManagerItem"],
		function() {
	Ext.define("Terrasoft.SectionProcessSettingsManager", {
		extend: "Terrasoft.BaseProcessSettingsManager",
		alternateClassName: "Terrasoft.SectionProcessSettingsManager",
		singleton: true,

		/**
		 * @inheritdoc Terrasoft.BaseProcessSettingsManager#itemClassName
		 * @overridden
		 */
		itemClassName: "Terrasoft.SectionProcessSettingsManagerItem",

		/**
		 * @inheritdoc Terrasoft.BaseProcessSettingsManager#entitySchemaName
		 * @overridden
		 */
		entitySchemaName: "ProcessInModules",

		/**
		 * @inheritdoc Terrasoft.BaseProcessSettingsManager#additionalColumnNames
		 * @overridden
		 */
		additionalColumnNames : {
			moduleId: "SysModuleId"
		},

		/**
		 * @inheritdoc Terrasoft.BaseProcessSettingsManager#getSchemaDataName
		 * @overridden
		 */
		getSchemaDataName: function() {
			return "RunProcessFromSections";
		}
	});
	return Terrasoft.SectionProcessSettingsManager;
});


