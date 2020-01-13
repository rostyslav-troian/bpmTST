Terrasoft.configuration.Structures["DetailProcessSettingsManagerItem"] = {innerHierarchyStack: ["DetailProcessSettingsManagerItem"]};
define('DetailProcessSettingsManagerItemStructure', ['DetailProcessSettingsManagerItemResources'], function(resources) {return {schemaUId:'4ddfbaa3-7bdd-40f1-ab6d-3a8080034a8b',schemaCaption: "DetailProcessSettingsManagerItem", parentSchemaName: "", schemaName:'DetailProcessSettingsManagerItem',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DetailProcessSettingsManagerItem", ["BaseProcessSettingsManagerItem"], function() {
	Ext.define("Terrasoft.DetailProcessSettingsManagerItem", {
		extend: "Terrasoft.BaseProcessSettingsManagerItem",
		alternateClassName: "Terrasoft.DetailProcessSettingsManagerItem",

		/**
		 * Section.
		 * @private
		 * @type {Object}
		 */
		detailId: null,

		/**
		 * @inheritdoc BaseProcessSettingsManagerItem#getProcessRunnerId
		 * @overridden
		 */
		getProcessRunnerId: function() {
			var result = this.getPropertyValue("detailId");
			if (Ext.isEmpty(result) && this.dataManagerItem) {
				var lookup = this.dataManagerItem.getColumnValue("SysDetail");
				result = lookup.value;
			}
			return result;
		},

		/**
		 * @inheritdoc BaseProcessSettingsManagerItem#setProcessRunnerId
		 * @overridden
		 */
		setProcessRunnerId: function(value) {
			this.setPropertyValue("detailId", value);
			this.dataManagerItem.setColumnValue("SysDetail", {
				value: value
			});
		}
	});
	return Terrasoft.DetailProcessSettingsManagerItem;
});


