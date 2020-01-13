Terrasoft.configuration.Structures["ClientUnitSchemaModelItemDesigner"] = {innerHierarchyStack: ["ClientUnitSchemaModelItemDesigner"], structureParent: "SchemaModelItemDesigner"};
define('ClientUnitSchemaModelItemDesignerStructure', ['ClientUnitSchemaModelItemDesignerResources'], function(resources) {return {schemaUId:'5d19a0e4-ca3b-4e22-9e32-661e1fb1070f',schemaCaption: "ClientUnitSchemaModelItemDesigner", parentSchemaName: "SchemaModelItemDesigner", schemaName:'ClientUnitSchemaModelItemDesigner',parentSchemaUId:'52f23ebc-4ed7-496a-847e-3b33ecb3fb4a',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: SchemaModelItemDesigner.
 */
define("ClientUnitSchemaModelItemDesigner", [], function() {
	return {
		diff: [
			{
				"operation": "remove",
				"name": "IsValueCloneable"
			},
			{
				"operation": "remove",
				"name": "LabelCaption"
			},
			{
				"operation": "remove",
				"name": "IsCascade"
			}
		]
	};
});


