Terrasoft.configuration.Structures["ProcessTerminateEventPropertiesPage"] = {innerHierarchyStack: ["ProcessTerminateEventPropertiesPage"], structureParent: "ProcessBaseEventPropertiesPage"};
define('ProcessTerminateEventPropertiesPageStructure', ['ProcessTerminateEventPropertiesPageResources'], function(resources) {return {schemaUId:'f26df50f-9689-4d0b-bc57-aa037804c60c',schemaCaption: "The page for editing the properties of the terminate event", parentSchemaName: "ProcessBaseEventPropertiesPage", schemaName:'ProcessTerminateEventPropertiesPage',parentSchemaUId:'88673ae5-a4ec-4f99-9804-da51b9878832',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 /**
 * ProcessBaseEventPropertiesPage edit page schema.
 * Parent: ProcessBaseEventPropertiesPage => ProcessFlowElementPropertiesPage
 */
define("ProcessTerminateEventPropertiesPage", function() {
	return {
		messages: {},
		attributes: {},
		methods: {
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "useBackgroundMode"
			}
		]/**SCHEMA_DIFF*/
	};
});


