Terrasoft.configuration.Structures["ContactExternalRateDetailV2"] = {innerHierarchyStack: ["ContactExternalRateDetailV2"], structureParent: "BaseGridDetailV2"};
define('ContactExternalRateDetailV2Structure', ['ContactExternalRateDetailV2Resources'], function(resources) {return {schemaUId:'cc974333-8c53-4ebe-92e6-fbc6bcff8c0f',schemaCaption: "ContactExternalRateDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'ContactExternalRateDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContactExternalRateDetailV2", ["terrasoft"],
	function(Terrasoft) {
		return {
			entitySchemaName: "ContactExternalRate",
			attributes: {},
			methods: {},
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
									"name": "StartDateListedGridColumn",
									"bindTo": "StartDate",
									"position": {
										"column": 1,
										"colSpan": 8
									}
								},
								{
									"name": "DueDateListedGridColumn",
									"bindTo": "DueDate",
									"position": {
										"column": 9,
										"colSpan": 8
									}
								},
								{
									"name": "RateListedGridColumn",
									"bindTo": "Rate",
									"position": {
										"column": 17,
										"colSpan": 8
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
									"name": "StartDateTiledGridColumn",
									"bindTo": "StartDate",
									"position": {
										"row": 1,
										"column": 1,
										"colSpan": 8
									}
								},
								{
									"name": "DueDateTiledGridColumn",
									"bindTo": "DueDate",
									"position": {
										"row": 1,
										"column": 9,
										"colSpan": 8
									}
								},
								{
									"name": "RateTiledGridColumn",
									"bindTo": "Rate",
									"position": {
										"row": 1,
										"column": 17,
										"colSpan": 8
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


