Terrasoft.configuration.Structures["AccountBillingInfoDetailV2"] = {innerHierarchyStack: ["AccountBillingInfoDetailV2"], structureParent: "BaseGridDetailV2"};
define('AccountBillingInfoDetailV2Structure', ['AccountBillingInfoDetailV2Resources'], function(resources) {return {schemaUId:'5f9dbed6-c3be-4005-981f-4bbd872f931d',schemaCaption: "AccountBillingInfoDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'AccountBillingInfoDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AccountBillingInfoDetailV2", [],
	function() {
		return {
			entitySchemaName: "AccountBillingInfo",
			attributes: {},
			methods: {

				/**
				 * ########## ### ####### ### ########## ## #########.
				 * @overridden
				 * @return {String} ### #######.
				 */
				getFilterDefaultColumnName: function() {
					return "Name";
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
									"name": "NameListedGridColumn",
									"bindTo": "Name",
									"position": {
										"column": 1,
										"colSpan": 8
									},
									"type": Terrasoft.GridCellType.TITLE
								},
								{
									"name": "BillingInfoListedGridColumn",
									"bindTo": "BillingInfo",
									"position": {
										"column": 9,
										"colSpan": 16
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
									"name": "NameTiledGridColumn",
									"bindTo": "Name",
									"position": {
										"row": 1,
										"column": 1,
										"colSpan": 8
									},
									"type": Terrasoft.GridCellType.TITLE
								},
								{
									"name": "BillingInfoTiledGridColumn",
									"bindTo": "BillingInfo",
									"position": {
										"row": 1,
										"column": 9,
										"colSpan": 16
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


