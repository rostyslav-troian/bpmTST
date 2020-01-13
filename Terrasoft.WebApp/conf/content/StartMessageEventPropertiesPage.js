Terrasoft.configuration.Structures["StartMessageEventPropertiesPage"] = {innerHierarchyStack: ["StartMessageEventPropertiesPage"], structureParent: "BaseMessageEventPropertiesPage"};
define('StartMessageEventPropertiesPageStructure', ['StartMessageEventPropertiesPageResources'], function(resources) {return {schemaUId:'1379e1d0-2a05-4273-b10c-398157f89d96',schemaCaption: "StartMessageEventPropertiesPage", parentSchemaName: "BaseMessageEventPropertiesPage", schemaName:'StartMessageEventPropertiesPage',parentSchemaUId:'c33d568f-a053-4949-a5bf-fda44dbb5992',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Edit page schema of process element Start messaage.
 * Parent: BaseMessageEventPropertiesPage
 */
define("StartMessageEventPropertiesPage", ["StartMessageEventPropertiesPageResources"],
	function() {
		return {
			methods: {},
			diff: /**SCHEMA_DIFF*/ [{
				"operation": "merge",
				"name": "RecommendationLabel",
				"values": {
					"styles": {
						"labelStyle": {
							"color": "#8ECB60"
						}
					}
				}
			}] /**SCHEMA_DIFF*/
		};
	}
);


