Terrasoft.configuration.Structures["FileDetailReadOnly"] = {innerHierarchyStack: ["FileDetailReadOnly"], structureParent: "FileDetailV2"};
define('FileDetailReadOnlyStructure', ['FileDetailReadOnlyResources'], function(resources) {return {schemaUId:'356ae27e-fd01-4e65-bd91-3d4b82b28e42',schemaCaption: "FileDetailV2", parentSchemaName: "FileDetailV2", schemaName:'FileDetailReadOnly',parentSchemaUId:'0c43958a-a409-47bc-a3cb-9bc32451a45a',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FileDetailReadOnly", [],
		function() {
			return {
				diff:/**SCHEMA_DIFF*/[
					// Removes DragAndDrop container.
					{
						"operation": "remove",
						"name": "DragAndDrop Container"
					},
					// Removes "Add file" button.
					{
						"operation": "remove",
						"name": "AddRecordButton"
					},
					// Removes action button.
					{
						"operation": "remove",
						"name": "ActionsButton"
					},
					// Removes Tools button.
					{
						"operation": "remove",
						"name": "ToolsButton"
					}
				]/**SCHEMA_DIFF*/
			};
		}
);


