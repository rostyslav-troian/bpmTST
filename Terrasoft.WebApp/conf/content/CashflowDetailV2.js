Terrasoft.configuration.Structures["CashflowDetailV2"] = {innerHierarchyStack: ["CashflowDetailV2"], structureParent: "BaseGridDetailV2"};
define('CashflowDetailV2Structure', ['CashflowDetailV2Resources'], function(resources) {return {schemaUId:'cadaac4c-4c05-47cf-8f20-53552ace0cc7',schemaCaption: "CashflowDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'CashflowDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CashflowDetailV2", ["terrasoft"],
	function() {
		return {
			entitySchemaName: "Cashflow",
			attributes: {},
			methods: {
				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilterDefaultColumnName
				 * @overridden
				 */
				getFilterDefaultColumnName: function() {
					return "Details";
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
									"name": "TypeListedGridColumn",
									"bindTo": "Type",
									"position": {
										"column": 1,
										"colSpan": 4
									}
								},
								{
									"name": "DateListedGridColumn",
									"bindTo": "Date",
									"position": {
										"column": 5,
										"colSpan": 6
									}
								},
								{
									"name": "DetailsListedGridColumn",
									"bindTo": "Details",
									"position": {
										"column": 11,
										"colSpan": 8
									}
								},
								{
									"name": "PrimaryAmountListedGridColumn",
									"bindTo": "PrimaryAmount",
									"position": {
										"column": 19,
										"colSpan": 6
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
									"name": "TypeTiledGridColumn",
									"bindTo": "Type",
									"position": {
										"row": 1,
										"column": 1,
										"colSpan": 4
									}
								},
								{
									"name": "DateTiledGridColumn",
									"bindTo": "Date",
									"position": {
										"row": 1,
										"column": 5,
										"colSpan": 6
									}
								},
								{
									"name": "DetailsTiledGridColumn",
									"bindTo": "Details",
									"position": {
										"row": 1,
										"column": 11,
										"colSpan": 8
									}
								},
								{
									"name": "PrimaryAmountTiledGridColumn",
									"bindTo": "PrimaryAmount",
									"position": {
										"row": 1,
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


