Terrasoft.configuration.Structures["DetailProcessSettingsManager"] = {innerHierarchyStack: ["DetailProcessSettingsManager"]};
define('DetailProcessSettingsManagerStructure', ['DetailProcessSettingsManagerResources'], function(resources) {return {schemaUId:'4b53f432-42c4-4511-94c1-b7ed2c3b00a9',schemaCaption: "DetailProcessSettingsManager", parentSchemaName: "", schemaName:'DetailProcessSettingsManager',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DetailProcessSettingsManager", ["BaseProcessSettingsManager", "DetailProcessSettingsManagerItem"],
		function() {
	Ext.define("Terrasoft.DetailProcessSettingsManager", {
		extend: "Terrasoft.BaseProcessSettingsManager",
		alternateClassName: "Terrasoft.DetailProcessSettingsManager",
		singleton: true,

		/**
		 * @inheritdoc Terrasoft.BaseProcessSettingsManager#itemClassName
		 * @overridden
		 */
		itemClassName: "Terrasoft.DetailProcessSettingsManagerItem",

		/**
		 * @inheritdoc Terrasoft.BaseProcessSettingsManager#entitySchemaName
		 * @overridden
		 */
		entitySchemaName: "ProcessInDetails",

		/**
		 * @inheritdoc Terrasoft.BaseProcessSettingsManager#additionalColumnNames
		 * @overridden
		 */
		additionalColumnNames : {
			detailId: "SysDetailId"
		},

		/**
		 * @inheritdoc Terrasoft.BaseProcessSettingsManager#getSchemaDataName
		 * @overridden
		 */
		getSchemaDataName: function() {
			return "RunProcessFromDetails";
		}
	});
	return Terrasoft.DetailProcessSettingsManager;
});


