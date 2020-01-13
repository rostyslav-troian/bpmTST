Terrasoft.configuration.Structures["BaseAnniversaryPageV2"] = {innerHierarchyStack: ["BaseAnniversaryPageV2"], structureParent: "BasePageV2"};
define('BaseAnniversaryPageV2Structure', ['BaseAnniversaryPageV2Resources'], function(resources) {return {schemaUId:'200b6193-7c8d-4b19-adcb-095515a2caab',schemaCaption: "Base noteworthy event page", parentSchemaName: "BasePageV2", schemaName:'BaseAnniversaryPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseAnniversaryPageV2", [], function() {
	return {
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "actions",
				"values": {
					"visible": false
				}
			},
			{
				"operation": "merge",
				"name": "Tabs",
				"values": {
					"visible": false
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "AnniversaryType",
				"values": {
					"contentType": Terrasoft.ContentType.ENUM,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Date",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 12
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


