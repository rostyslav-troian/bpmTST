Terrasoft.configuration.Structures["OpportunityCompetitorDetailV2"] = {innerHierarchyStack: ["OpportunityCompetitorDetailV2"], structureParent: "BaseGridDetailV2"};
define('OpportunityCompetitorDetailV2Structure', ['OpportunityCompetitorDetailV2Resources'], function(resources) {return {schemaUId:'9be40cc1-1fce-41a9-89df-680f08c4bff6',schemaCaption: "Detail - Competitors in opportunity", parentSchemaName: "BaseGridDetailV2", schemaName:'OpportunityCompetitorDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OpportunityCompetitorDetailV2", [],
	function() {
		return {
			entitySchemaName: "OpportunityCompetitor",
			methods: {
			getGridDataColumns: function() {
				return {
					"Id": {path: "Id"},
					"Strengths": {path:  "Strengths"},
					"Weakness": {path:  "Weakness"},
					"CompetitorProduct.Name": {path:  "CompetitorProduct.Name"},
					"Competitor.Name": {path:  "Competitor.Name"}
				};
			},
				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilterDefaultColumnName
				 * @overridden
				 */
				getFilterDefaultColumnName: function() {
					return "Competitor";
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"type": "listed",
						"primaryDisplayColumnName": "Competitor.Name",
						"listedConfig": {
							"name": "DataGridListedConfig",
							"items": [
								{
									"name": "CompetitorListedGridColumn",
									"bindTo": "Competitor",
									"position": {"column": 1, "colSpan": 6}
								},
								{
									"name": "CompetitorListedGridColumn",
									"bindTo": "CompetitorProduct",
									"position": {"column": 7, "colSpan": 6}
								},
								{
									"name": "CompetitorListedGridColumn",
									"bindTo": "Strengths",
									"position": {"column": 13, "colSpan": 6}
								},
								{
									"name": "CompetitorListedGridColumn",
									"bindTo": "Weakness",
									"position": {"column": 19, "colSpan": 6}
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
									"name": "CompetitorTiledGridColumn",
									"bindTo": "Competitor",
									"position": {"row": 1, "column": 1, "colSpan": 6}
								},
								{
									"name": "CompetitorTiledGridColumn",
									"bindTo": "CompetitorProduct",
									"position": {"row": 1, "column": 7, "colSpan": 6}
								},
								{
									"name": "CompetitorTiledGridColumn",
									"bindTo": "Strengths",
									"position": {"row": 1, "column": 13, "colSpan": 6}
								},
								{
									"name": "CompetitorTiledGridColumn",
									"bindTo": "Weakness",
									"position": {"row": 1, "column": 19, "colSpan": 6}
								}
							]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


