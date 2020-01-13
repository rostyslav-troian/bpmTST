Terrasoft.configuration.Structures["GridDesignerEnums"] = {innerHierarchyStack: ["GridDesignerEnums"]};
define('GridDesignerEnumsStructure', ['GridDesignerEnumsResources'], function(resources) {return {schemaUId:'a43d9002-0530-411e-869e-1c144f11270f',schemaCaption: "List designer enumerations", parentSchemaName: "", schemaName:'GridDesignerEnums',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("GridDesignerEnums", ["GridDesignerEnumsResources"], function() {

	Ext.ns("Terrasoft.GridDesignerEnums");

	/**
	 * Enumeration of list types.
	 * @enum
	 */
	Terrasoft.GridDesignerEnums.GridType = {
		Vertical: 0,
		Listed: 1,
		Tiled: 2,
		Mobile: 3
	};

	/**
	 * Default list settings that depend on the list type.
	 * @enum
	 */
	Terrasoft.GridDesignerEnums.DefaultGridSettings = {};
	Terrasoft.GridDesignerEnums.DefaultGridSettings[Terrasoft.GridDesignerEnums.GridType.Vertical] = {
		columns: 1,
		rows: 1
	};
	Terrasoft.GridDesignerEnums.DefaultGridSettings[Terrasoft.GridDesignerEnums.GridType.Listed] = {
		columns: 24,
		rows: 1
	};
	Terrasoft.GridDesignerEnums.DefaultGridSettings[Terrasoft.GridDesignerEnums.GridType.Tiled] = {
		columns: 24,
		rows: 1
	};
	Terrasoft.GridDesignerEnums.DefaultGridSettings[Terrasoft.GridDesignerEnums.GridType.Mobile] = {
		columns: 1,
		rows: 1
	};

});


