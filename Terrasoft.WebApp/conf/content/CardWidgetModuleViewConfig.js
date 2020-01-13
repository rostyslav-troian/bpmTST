Terrasoft.configuration.Structures["CardWidgetModuleViewConfig"] = {innerHierarchyStack: ["CardWidgetModuleViewConfig"]};
define('CardWidgetModuleViewConfigStructure', ['CardWidgetModuleViewConfigResources'], function(resources) {return {schemaUId:'65d3b7f7-d523-41fa-8604-d51793bbd661',schemaCaption: "CardWidgetModuleViewConfig", parentSchemaName: "", schemaName:'CardWidgetModuleViewConfig',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * @class Terrasoft.configuration.CardWidgetModuleViewConfig
 */
Ext.define("Terrasoft.configuration.CardWidgetModuleViewConfig", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.CardWidgetModuleViewConfig",

	/**
	 * Generates view config.
	 * @param {String} id Root element id.
	 * @returns {Object} View config.
	 */
	generate: function(id) {
		var viewConfig = [];
		var diff = [
			{
				"operation": "insert",
				"name": "CardWidgetContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"id": id,
					"selectors": {"wrapEl": "#" + id},
					"items": []
				}
			}
		];
		return Terrasoft.JsonApplier.applyDiff(viewConfig, diff);
	}

});

