Terrasoft.configuration.Structures["OpportunityTeamDetailV2New"] = {innerHierarchyStack: ["OpportunityTeamDetailV2New"], structureParent: "BaseGridDetailV2"};
define('OpportunityTeamDetailV2NewStructure', ['OpportunityTeamDetailV2NewResources'], function(resources) {return {schemaUId:'80e6bd5e-416b-4452-a770-eb0af24ac981',schemaCaption: "OpportunityTeamDetailV2New", parentSchemaName: "BaseGridDetailV2", schemaName:'OpportunityTeamDetailV2New',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OpportunityTeamDetailV2New", [], function() {
	return {
		entitySchemaName: "OpportunityParticipant",
		methods: {
			getGridDataColumns: function() {
				return {
					"Id": {path: "Id"},
					"Contact": {path:  "Contact"},
					"Role": {path:  "Role"},
					"Account": {path:  "Account"},
					"Contact.Phone": {path:  "Contact.Phone"},
					"Contact.Email": {path:  "Contact.Email"},
					"Contact.Name": {path:  "Contact.Name"}
				};
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilterDefaultColumnName
			 * @overridden
			 */
			getFilterDefaultColumnName: function() {
				return "Contact";
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"type": "listed",
					"primaryDisplayColumnName": "Contact.Name",
					"listedConfig": {
						"name": "DataGridListedConfig",
						"items": [
							{
								"name": "ContactListedGridColumn",
								"bindTo": "Contact",
								"position": {
									"column": 1,
									"colSpan": 12
								},
								"type": Terrasoft.GridCellType.TITLE
							},
							{
								"name": "RoleListedGridColumn",
								"bindTo": "Role",
								"position": {
									"column": 13,
									"colSpan": 12
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
								"name": "ContactTiledGridColumn",
								"bindTo": "Contact",
								"position": {
									"row": 1,
									"column": 1,
									"colSpan": 12
								},
								"type": Terrasoft.GridCellType.TITLE
							},
							{
								"name": "AccountTiledGridColumn",
								"bindTo": "Account",
								"position": {
									"row": 1,
									"column": 13,
									"colSpan": 12
								}
							},
							{
								"name": "RoleTiledGridColumn",
								"bindTo": "role",
								"position": {
									"row": 2,
									"rowSpan": 2,
									"column": 1,
									"colSpan": 8
								},
								"type": Terrasoft.GridCellType.TITLE
							},
							{
								"name": "PhoneTiledGridColumn",
								"bindTo": "Contact.Phone",
								"position": {
									"row": 2,
									"rowSpan": 2,
									"column": 9,
									"colSpan": 8
								}
							},
							{
								"name": "EmailTiledGridColumn",
								"bindTo": "Contact.Email",
								"position": {
									"row": 2,
									"rowSpan": 2,
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
});


