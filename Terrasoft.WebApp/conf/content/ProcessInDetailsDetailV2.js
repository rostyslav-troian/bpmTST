Terrasoft.configuration.Structures["ProcessInDetailsDetailV2"] = {innerHierarchyStack: ["ProcessInDetailsDetailV2"], structureParent: "BaseProcessSettingDetailV2"};
define('ProcessInDetailsDetailV2Structure', ['ProcessInDetailsDetailV2Resources'], function(resources) {return {schemaUId:'39af7395-09ba-44d8-9997-42bd7681f497',schemaCaption: "Base schema - Detail with list for process library", parentSchemaName: "BaseProcessSettingDetailV2", schemaName:'ProcessInDetailsDetailV2',parentSchemaUId:'550e7a82-2e5e-442a-90d2-0008616e822e',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProcessInDetailsDetailV2", function() {
	return {
		/**
		 * Entity schema name.
		 * @type {String}
		 */
		entitySchemaName: "ProcessInDetails",
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"rowDataItemMarkerColumnName": "SysDetail",
					"type": "listed",
					"listedConfig": {
						"name": "DataGridListedConfig",
						"items": [
							{
								"name": "CaptionListedGridColumn",
								"bindTo": "Caption",
								"type": Terrasoft.GridCellType.TEXT,
								"position": {
									"column": 1,
									"colSpan": 24
								}
							}
						]
					},
					"tiledConfig": {
						"name": "DataGridTiledConfig",
						"grid": {
							"columns": 24,
							"rows": 3
						},
						"items": [
							{
								"name": "CaptionTiledGridColumn",
								"bindTo": "Caption",
								"type": Terrasoft.GridCellType.TEXT,
								"position": {
									"row": 1,
									"column": 1,
									"colSpan": 24
								},
								"captionConfig": {
									"visible": true
								}
							}
						]
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


