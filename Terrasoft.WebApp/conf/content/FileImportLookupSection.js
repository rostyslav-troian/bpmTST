Terrasoft.configuration.Structures["FileImportLookupSection"] = {innerHierarchyStack: ["FileImportLookupSection"], structureParent: "BaseLookupConfigurationSection"};
define('FileImportLookupSectionStructure', ['FileImportLookupSectionResources'], function(resources) {return {schemaUId:'4aaa1bc8-cb96-47e7-8084-c6618c81bc1d',schemaCaption: "File import lookup section", parentSchemaName: "BaseLookupConfigurationSection", schemaName:'FileImportLookupSection',parentSchemaUId:'c8c39e3b-de05-4d01-814a-45c7981e139f',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FileImportLookupSection", [], function() {
	return {
		attributes: {
			IsGridSettingsMenuVisible: {
				value: false
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


