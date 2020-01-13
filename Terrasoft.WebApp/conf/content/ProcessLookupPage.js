Terrasoft.configuration.Structures["ProcessLookupPage"] = {innerHierarchyStack: ["ProcessLookupPage"], structureParent: "EntityColumnLookupPage"};
define('ProcessLookupPageStructure', ['ProcessLookupPageResources'], function(resources) {return {schemaUId:'52c265b2-3ee8-4529-995a-55efd84b02bc',schemaCaption: "ProcessLookupPage", parentSchemaName: "EntityColumnLookupPage", schemaName:'ProcessLookupPage',parentSchemaUId:'57b64d4c-7853-49a8-807b-12eb5a9ee60c',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProcessLookupPage", [
	"ProcessLookupPageResources", "ModalBox", "GridUtilitiesV2", "css!ProcessLookupPageCSS"
], function() {
	return {
		attributes: {
		},
		messages: {
			/**
			 * @message SetParametersInfo
			 * Specifies parameter values.
			 */
			"SetParametersInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {
			/**
			 * @inheritdoc EntityColumnLookupPage@getColumnsConfig
			 * @protected
			 * @override
			 */
			getColumnsConfig: function() {
				return {
					"Id": {
						"columnPath": "Id",
						"dataValueType": Terrasoft.DataValueType.GUID,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					"Caption": {
						"columnPath": "Caption",
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					}
				};
			},
			/**
			 * @inheritdoc EntityColumnLookupPage#getRowViewModelItemConfig
			 * @protected
			 * @override
			 */
			getRowViewModelItemConfig: function(dataItem) {
				return {
					Id: dataItem.id,
					Caption: dataItem.caption
				};
			},
			/**
			 * @inheritdoc EntityColumnLookupPage#getLookupMessage
			 * @protected
			 * @override
			 */
			getLookupMessage: function() {
				return "SetParametersInfo";
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "fixed-area-container",
				"values": {
					"wrapClass": ["modal-page-container", "modal-page-fixed-container", "process-lookup-page"]
				}
			},
			{
				"operation": "merge",
				"name": "utils-area-editPage",
				"values": {
					"wrapClass": ["process-lookup-page-controls-container"]
				}
			},
			{
				"operation": "merge",
				"name": "right-container",
				"values": {
					"wrapClass": ["process-lookup-page-right-container"]
				}
			},
			{
				"operation": "merge",
				"name": "options-container",
				"values": {
					"wrapClass": ["process-lookup-page-options-container"]
				}
			},
			{
				"operation": "merge",
				"name": "TotalItemsCaption",
				"values": {
					"classes": {"labelClass": ["process-lookup-page-label-edit"]}
				}
			},
			{
				"operation": "merge",
				"name": "TotalItemsCounter",
				"values": {
					"classes": {"labelClass": ["process-lookup-page-selected-rows-count-label"]}
				}
			},
			{
				"operation": "merge",
				"name": "filtering-container",
				"values": {
					"wrapClass": ["process-lookup-page-filtering-container"]
				}
			},
			{
				"operation": "merge",
				"name": "center-area-editPage",
				"values": {
					"wrapClass": ["process-lookup-page-controls-container"]
				}
			},
			{
				"operation": "merge",
				"name": "center-area-grid-container",
				"values": {
					"wrapClass": ["center-area-grid-container-process-lookup-page"]
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


