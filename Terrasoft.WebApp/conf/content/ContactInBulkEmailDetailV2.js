Terrasoft.configuration.Structures["ContactInBulkEmailDetailV2"] = {innerHierarchyStack: ["ContactInBulkEmailDetailV2"], structureParent: "BaseGridDetailV2"};
define('ContactInBulkEmailDetailV2Structure', ['ContactInBulkEmailDetailV2Resources'], function(resources) {return {schemaUId:'b3b23ca2-ce5a-4515-8648-2612950d72cd',schemaCaption: "Section detail schema - \"Email\" section in contact card", parentSchemaName: "BaseGridDetailV2", schemaName:'ContactInBulkEmailDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContactInBulkEmailDetailV2", function() {
		return {
			entitySchemaName: "BulkEmailTarget",
			attributes: {},
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
									"bindTo": "BulkEmail",
									"type": "text",
									"position": {
										"column": 0,
										"colSpan": 24
									}
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
									"bindTo": "BulkEmail",
									"type": "text",
									"position": {
										"row": 1,
										"column": 0,
										"colSpan": 24
									},
									"captionConfig": {
										"visible": false
									}
								}
							]
						}
					}
				}
			]/**SCHEMA_DIFF*/,
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getDeleteRecordMenuItem
				 * @overridden
				 */
				getDeleteRecordMenuItem: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
				 * @overridden
				 */
				getCopyRecordMenuItem: Terrasoft.emptyFn,

				/**
				 * ########## ######### ###### ########## ######.
				 * @protected
				 * @return {Boolean} ######### ###### ########## ######.
				 */
				getAddRecordButtonVisible: function() {
					return false;
				},

				/**
				 * ########## ######### ###### # #### ########## ######.
				 * @protected
				 * @return {Boolean} ######### ###### # #### ########## ######.
				 */
				getAddTypedRecordButtonVisible: function() {
					return false;
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getSwitchGridModeMenuItem
				 * @overridden
				 */
				getSwitchGridModeMenuItem: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
				 * @overridden
				 */
				getEditRecordMenuItem: Terrasoft.emptyFn
			}
		};
	});


