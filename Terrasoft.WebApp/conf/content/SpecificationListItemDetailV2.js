Terrasoft.configuration.Structures["SpecificationListItemDetailV2"] = {innerHierarchyStack: ["SpecificationListItemDetailV2"], structureParent: "BaseGridDetailV2"};
define('SpecificationListItemDetailV2Structure', ['SpecificationListItemDetailV2Resources'], function(resources) {return {schemaUId:'752c2a30-d15c-401e-96aa-c7500fb0e32c',schemaCaption: "Feature list item detail", parentSchemaName: "BaseGridDetailV2", schemaName:'SpecificationListItemDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
// D9 Team
define("SpecificationListItemDetailV2", [],
	function() {
		return {
			entitySchemaName: "SpecificationListItem",
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"type": "listed",
						"listedConfig": {
							"name": "DataGridListedConfig",
							"items": [
								{
									"name": "NameListedGridColumn",
									"bindTo": "Name",
									"position": { "column": 0, "colSpan": 24 }
								}
							]
						},
						"tiledConfig": {
							"name": "DataGridTiledConfig",
							"grid": {
								"columns": 24,
								"rows": 1
							},
							"items": [
								{
									"name": "NameTiledGridColumn",
									"bindTo": "Name",
									"position": { "row": 0, "column": 0, "colSpan": 12 }
								}
							]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


