Terrasoft.configuration.Structures["ContactCareerDetailV2"] = {innerHierarchyStack: ["ContactCareerDetailV2"], structureParent: "BaseGridDetailV2"};
define('ContactCareerDetailV2Structure', ['ContactCareerDetailV2Resources'], function(resources) {return {schemaUId:'af342d1e-290f-43c1-af10-18141c05ad95',schemaCaption: "ContactCareerDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'ContactCareerDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContactCareerDetailV2", ["terrasoft"],
	function(Terrasoft) {
		return {
			entitySchemaName: "ContactCareer",
			attributes: {},
			methods: {

				/**
				 * ########## ### ####### ### ########## ## #########.
				 * @overridden
				 * @return {String} ### #######.
				 */
				getFilterDefaultColumnName: function() {
					return "Account";
				}
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
									"name": "AccountListedGridColumn",
									"bindTo": "Account",
									"position": {
										"column": 1,
										"colSpan": 8
									},
									"type": Terrasoft.GridCellType.TITLE
								},
								{
									"name": "JobListedGridColumn",
									"bindTo": "Job",
									"type": Terrasoft.GridCellType.TEXT,
									"position": {
										"column": 9,
										"colSpan": 8
									}
								},
								{
									"name": "CurrentListedGridColumn",
									"bindTo": "Current",
									"type": Terrasoft.GridCellType.TEXT,
									"position": {
										"column": 17,
										"colSpan": 4
									}
								},
								{
									"name": "PrimaryListedGridColumn",
									"bindTo": "Primary",
									"type": Terrasoft.GridCellType.TEXT,
									"position": {
										"column": 21,
										"colSpan": 4
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
									"name": "AccountTiledGridColumn",
									"bindTo": "Account",
									"position": {
										"row": 1,
										"column": 1,
										"colSpan": 24
									},
									"type": Terrasoft.GridCellType.TITLE
								},
								{
									"name": "JobTiledGridColumn",
									"bindTo": "Job",
									"type": Terrasoft.GridCellType.TEXT,
									"position": {
										"row": 2,
										"column": 1,
										"colSpan": 12
									}
								},
								{
									"name": "CurrentTiledGridColumn",
									"bindTo": "Current",
									"type": Terrasoft.GridCellType.TEXT,
									"position": {
										"row": 2,
										"column": 13,
										"colSpan": 6
									}
								},
								{
									"name": "PrimaryTiledGridColumn",
									"bindTo": "Primary",
									"type": Terrasoft.GridCellType.TEXT,
									"position": {
										"row": 2,
										"column": 19,
										"colSpan": 6
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


