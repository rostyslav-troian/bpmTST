Terrasoft.configuration.Structures["GeneratedWebFormSectionV2"] = {innerHierarchyStack: ["GeneratedWebFormSectionV2"], structureParent: "BaseSectionV2"};
define('GeneratedWebFormSectionV2Structure', ['GeneratedWebFormSectionV2Resources'], function(resources) {return {schemaUId:'44c6ea6f-e551-4fe6-9dbf-5c162aad471c',schemaCaption: "List - Landing pages for external resources", parentSchemaName: "BaseSectionV2", schemaName:'GeneratedWebFormSectionV2',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("GeneratedWebFormSectionV2", function() {
		return {
			entitySchemaName: "GeneratedWebForm",
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "CombinedModeViewOptionsButton",
					"values": {
						"visible": {"bindTo": "IsSectionVisible"}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


