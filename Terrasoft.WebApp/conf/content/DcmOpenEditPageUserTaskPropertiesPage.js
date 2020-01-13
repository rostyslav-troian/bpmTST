Terrasoft.configuration.Structures["DcmOpenEditPageUserTaskPropertiesPage"] = {innerHierarchyStack: ["DcmOpenEditPageUserTaskPropertiesPage"], structureParent: "OpenEditPageUserTaskPropertiesPage"};
define('DcmOpenEditPageUserTaskPropertiesPageStructure', ['DcmOpenEditPageUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'409e066f-7f00-4ffa-ba31-c29cd19bde6a',schemaCaption: "DcmOpenEditPageUserTaskPropertiesPage", parentSchemaName: "OpenEditPageUserTaskPropertiesPage", schemaName:'DcmOpenEditPageUserTaskPropertiesPage',parentSchemaUId:'a1cc99f2-4831-40c3-b891-64712e652679',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 /**
 * Parent: OpenEditPageUserTaskPropertiesPage => BaseUserTaskPropertiesPage => RootUserTaskPropertiesPage
 * => ProcessFlowElementPropertiesPage => BaseProcessSchemaElementPropertiesPage
 */
define("DcmOpenEditPageUserTaskPropertiesPage", [],
	function() {
		return {

			/**
			 * Use base DCM schema.
			 * @type {Boolean}
			 */
			useBaseDcmSchema: true,

			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "GenerateDecisionsFromColumnContainer"
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


