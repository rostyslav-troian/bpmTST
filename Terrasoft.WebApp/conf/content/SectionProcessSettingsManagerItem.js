Terrasoft.configuration.Structures["SectionProcessSettingsManagerItem"] = {innerHierarchyStack: ["SectionProcessSettingsManagerItem"]};
define('SectionProcessSettingsManagerItemStructure', ['SectionProcessSettingsManagerItemResources'], function(resources) {return {schemaUId:'45f34a55-a7d1-4ca1-85b9-124f9f906f4e',schemaCaption: "SectionProcessSettingsManagerItem", parentSchemaName: "", schemaName:'SectionProcessSettingsManagerItem',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SectionProcessSettingsManagerItem", ["BaseProcessSettingsManagerItem"], function() {
	Ext.define("Terrasoft.SectionProcessSettingsManagerItem", {
		extend: "Terrasoft.BaseProcessSettingsManagerItem",
		alternateClassName: "Terrasoft.SectionProcessSettingsManagerItem",

		/**
		 * Section.
		 * @private
		 * @type {Object}
		 */
		moduleId: null,

		/**
		 * @inheritdoc BaseProcessSettingsManagerItem#getProcessRunnerId
		 * @overridden
		 */
		getProcessRunnerId: function() {
			var result = this.getPropertyValue("moduleId");
			if (Ext.isEmpty(result) && this.dataManagerItem) {
				var lookup = this.dataManagerItem.getColumnValue("SysModule");
				result = lookup.value;
			}
			return result;
		},

		/**
		 * @inheritdoc BaseProcessSettingsManagerItem#setProcessRunnerId
		 * @overridden
		 */
		setProcessRunnerId: function(value) {
			this.setPropertyValue("moduleId", value);
			this.dataManagerItem.setColumnValue("SysModule", {
				value: value
			});
		}
	});
	return Terrasoft.SectionProcessSettingsManagerItem;
});


