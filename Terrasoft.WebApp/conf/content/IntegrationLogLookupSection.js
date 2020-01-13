Terrasoft.configuration.Structures["IntegrationLogLookupSection"] = {innerHierarchyStack: ["IntegrationLogLookupSection"], structureParent: "BaseLookupConfigurationSection"};
define('IntegrationLogLookupSectionStructure', ['IntegrationLogLookupSectionResources'], function(resources) {return {schemaUId:'9669f980-9585-4b2b-915d-0d83cfc17e35',schemaCaption: "Base lookup configuration section", parentSchemaName: "BaseLookupConfigurationSection", schemaName:'IntegrationLogLookupSection',parentSchemaUId:'c8c39e3b-de05-4d01-814a-45c7981e139f',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("IntegrationLogLookupSection", [], function() {
	return {
		attributes: {
			IsGridSettingsMenuVisible: {
				value: false
			}
		},
		methods: {

			getProfileKey: function() {
				return "IntegrationLogLookupSectionIntegrationLogGridSettingsGridDataView";
			}

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "SeparateModeAddRecordButton"
			},
			{
				"operation": "remove",
				"name": "CombinedModeAddRecordButton"
			},
			{
				"operation": "remove",
				"name": "DataGrid"
			},
			{
				"operation": "insert",
				"name": "DataGrid",
				"parentName": "DataGridContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID,
					"listedZebra": true,
					"activeRow": {"bindTo": "ActiveRow"},
					"collection": {"bindTo": "GridData"},
					"isEmpty": {"bindTo": "IsGridEmpty"},
					"isLoading": {"bindTo": "IsGridLoading"},
					"primaryColumnName": "Id",
					"sortColumn": {"bindTo": "sortColumn"},
					"sortColumnDirection": {"bindTo": "GridSortDirection"},
					"sortColumnIndex": {"bindTo": "SortColumnIndex"},
					"needLoadData": {"bindTo": "needLoadData"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

