Terrasoft.configuration.Structures["ContactInternalRateDetailV2"] = {innerHierarchyStack: ["ContactInternalRateDetailV2"], structureParent: "BaseGridDetailV2"};
define('ContactInternalRateDetailV2Structure', ['ContactInternalRateDetailV2Resources'], function(resources) {return {schemaUId:'84bd4f28-b9e4-462c-b0d7-312b51f222cb',schemaCaption: "ContactInternalRateDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'ContactInternalRateDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContactInternalRateDetailV2", ["terrasoft"],
	function(Terrasoft) {
		return {
			entitySchemaName: "ContactInternalRate",
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


