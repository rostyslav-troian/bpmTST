Terrasoft.configuration.Structures["BaseHistoryDetailV2"] = {innerHierarchyStack: ["BaseHistoryDetailV2"], structureParent: "BaseGridDetailV2"};
define('BaseHistoryDetailV2Structure', ['BaseHistoryDetailV2Resources'], function(resources) {return {schemaUId:'7bd68aad-5aad-4d2a-a542-9f6421edf208',schemaCaption: "Base history detail", parentSchemaName: "BaseGridDetailV2", schemaName:'BaseHistoryDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseHistoryDetailV2", [],
	function() {
		return {
			methods: {
				/**
				 * ######### # ######### ####### ########### ## #### ## #########
				 */
				getGridDataColumns: function() {
					var gridDataColumns = this.callParent(arguments);
					gridDataColumns.StartDate = {
						path: "StartDate",
						orderPosition: 0,
						orderDirection: this.Terrasoft.OrderDirection.DESC
					};
					return gridDataColumns;
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#addRecordOperationsMenuItems
				 * @overridden
				 */
				addRecordOperationsMenuItems: Terrasoft.emptyFn

			},
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
									"name": "TitleListedGridColumn",
									"bindTo": "Title",
									"position": {
										"column": 1,
										"colSpan": 14
									},
									"type": Terrasoft.GridCellType.TITLE
								},
								{
									"name": "SysEntityListedGridColumn",
									"bindTo": "SysEntity",
									"position": {
										"column": 15,
										"colSpan": 5
									}
								},
								{
									"name": "StartDateListedGridColumn",
									"bindTo": "StartDate",
									"position": {
										"column": 20,
										"colSpan": 5
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
									"name": "TitleTiledGridColumn",
									"bindTo": "Title",
									"position": {
										"row": 1,
										"column": 1,
										"colSpan": 14
									},
									"type": Terrasoft.GridCellType.TITLE
								},
								{
									"name": "SysEntityTiledGridColumn",
									"bindTo": "SysEntity",
									"position": {
										"row": 1,
										"column": 15,
										"colSpan": 5
									}
								},
								{
									"name": "StartDateTiledGridColumn",
									"bindTo": "StartDate",
									"position": {
										"row": 1,
										"column": 20,
										"colSpan": 5
									}
								}
							]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


