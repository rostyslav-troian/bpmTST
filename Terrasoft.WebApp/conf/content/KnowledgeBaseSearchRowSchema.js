Terrasoft.configuration.Structures["KnowledgeBaseSearchRowSchema"] = {innerHierarchyStack: ["KnowledgeBaseSearchRowSchema"], structureParent: "BaseSearchRowSchema"};
define('KnowledgeBaseSearchRowSchemaStructure', ['KnowledgeBaseSearchRowSchemaResources'], function(resources) {return {schemaUId:'9862a5e4-f876-49ef-b8f3-e96021769e1e',schemaCaption: "KnowledgeBaseSearchRowSchema", parentSchemaName: "BaseSearchRowSchema", schemaName:'KnowledgeBaseSearchRowSchema',parentSchemaUId:'254c5d91-bad1-44be-a75e-1d511f816dc0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("KnowledgeBaseSearchRowSchema", [], function() {
	return {
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "EntitySchemaCaption"
			},
			{
				"operation": "merge",
				"name": "PrimaryColumnContainer",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "merge",
				"name": "FoundColumnsContainerList",
				"values": {
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "DataContainer",
				"propertyName": "items",
				"name": "Type",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 18
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "DataContainer",
				"propertyName": "items",
				"name": "CreatedBy",
				"values": {
					"layout": {
						"column": 18,
						"row": 1,
						"colSpan": 6
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


