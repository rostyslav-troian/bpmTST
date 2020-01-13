Terrasoft.configuration.Structures["AuthInfoUsernameValuePage"] = {innerHierarchyStack: ["AuthInfoUsernameValuePage"], structureParent: "AuthInfoParameterValuePage"};
define('AuthInfoUsernameValuePageStructure', ['AuthInfoUsernameValuePageResources'], function(resources) {return {schemaUId:'44ad135e-4354-4507-a7f6-c0663fe916d1',schemaCaption: "AuthInfoUsernameValuePage", parentSchemaName: "AuthInfoParameterValuePage", schemaName:'AuthInfoUsernameValuePage',parentSchemaUId:'14c99d52-3f74-4839-9720-fb520db4ba10',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AuthInfoUsernameValuePage", [], function() {
	return {
			attributes: {

				/**
				 * Name of property in auth info.
				 */
				AuthInfoPropertyName: {
					value: "username"
				}
			}
	};
});


