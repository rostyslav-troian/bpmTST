Terrasoft.configuration.Structures["IntermediateThrowMessagePropertiesPage"] = {innerHierarchyStack: ["IntermediateThrowMessagePropertiesPage"], structureParent: "BaseMessageEventPropertiesPage"};
define('IntermediateThrowMessagePropertiesPageStructure', ['IntermediateThrowMessagePropertiesPageResources'], function(resources) {return {schemaUId:'a894c0e3-a35c-48b0-803d-6a4e465c94f0',schemaCaption: "Card page - Intermediate throw message", parentSchemaName: "BaseMessageEventPropertiesPage", schemaName:'IntermediateThrowMessagePropertiesPage',parentSchemaUId:'c33d568f-a053-4949-a5bf-fda44dbb5992',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Event generation message edit page schema.
 * Parent: BaseMessageEventPropertiesPage
 */
define("IntermediateThrowMessagePropertiesPage", ["IntermediateThrowMessagePropertiesPageResources"],
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
			}, {
				"operation": "remove",
				"name": "useBackgroundMode"
			}] /**SCHEMA_DIFF*/
		};
	}
);


