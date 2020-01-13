Terrasoft.configuration.Structures["IntermediateCatchMessagePropertiesPage"] = {innerHierarchyStack: ["IntermediateCatchMessagePropertiesPage"], structureParent: "BaseMessageEventPropertiesPage"};
define('IntermediateCatchMessagePropertiesPageStructure', ['IntermediateCatchMessagePropertiesPageResources'], function(resources) {return {schemaUId:'07d81f23-859b-44fe-ab03-130dc87c2802',schemaCaption: "IntermediateCatchMessagePropertiesPage", parentSchemaName: "BaseMessageEventPropertiesPage", schemaName:'IntermediateCatchMessagePropertiesPage',parentSchemaUId:'c33d568f-a053-4949-a5bf-fda44dbb5992',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Process intermediate catch message properties edit page schema.
 * Parent: BaseProcessElementMessagePropertiesPage
 */
define("IntermediateCatchMessagePropertiesPage", ["IntermediateCatchMessagePropertiesPageResources"],
	function() {
		return {
			methods: {},
			diff: /**SCHEMA_DIFF*/ [{
				"operation": "merge",
				"name": "RecommendationLabel",
				"values": {
					"styles": {
						"labelStyle": {
							"color": "#F79552"
						}
					}
				}
			}] /**SCHEMA_DIFF*/
		};
	});


