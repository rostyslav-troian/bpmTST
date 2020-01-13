Terrasoft.configuration.Structures["AttributeListItemDetailV2"] = {innerHierarchyStack: ["AttributeListItemDetailV2"], structureParent: "BaseGridDetailV2"};
define('AttributeListItemDetailV2Structure', ['AttributeListItemDetailV2Resources'], function(resources) {return {schemaUId:'f4cf16bb-3a7b-4a33-92b3-007f35d6fade',schemaCaption: "Attributes value list detail", parentSchemaName: "BaseGridDetailV2", schemaName:'AttributeListItemDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AttributeListItemDetailV2", [],
	function() {
		return {
			entitySchemaName: "SiteEventAttrListItem",
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
									"position": {"column": 0, "colSpan": 24}
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
									"position": {"row": 0, "column": 0, "colSpan": 12}
								}
							]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


