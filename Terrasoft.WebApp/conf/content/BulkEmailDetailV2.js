Terrasoft.configuration.Structures["BulkEmailDetailV2"] = {innerHierarchyStack: ["BulkEmailDetailV2"], structureParent: "BaseGridDetailV2"};
define('BulkEmailDetailV2Structure', ['BulkEmailDetailV2Resources'], function(resources) {return {schemaUId:'49bca31c-530a-4283-a7aa-47a2c685f21b',schemaCaption: "Detail schema - Email section", parentSchemaName: "BaseGridDetailV2", schemaName:'BulkEmailDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BulkEmailDetailV2", [],
function() {
	return {
		entitySchemaName: "BulkEmail",
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
								"bindTo": "Name",
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
								"bindTo": "Name",
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
			getSwitchGridModeMenuItem: Terrasoft.emptyFn
		}
	};
});


