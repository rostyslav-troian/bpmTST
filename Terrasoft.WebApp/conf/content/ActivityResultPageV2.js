Terrasoft.configuration.Structures["ActivityResultPageV2"] = {innerHierarchyStack: ["ActivityResultPageV2"], structureParent: "BasePageV2"};
define('ActivityResultPageV2Structure', ['ActivityResultPageV2Resources'], function(resources) {return {schemaUId:'22e3bf00-8cec-4212-b74d-cd89c7ebe990',schemaCaption: "ActivityResultPageV2", parentSchemaName: "BasePageV2", schemaName:'ActivityResultPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 define("ActivityResultPageV2", [],
	function() {
		return {
			entitySchemaName: "ActivityResult",
			methods: {
			},
			details: /**SCHEMA_DETAILS*/{
				ActivityCategoryResultEntryDetail: {
					schemaName: "ActivityCategoryResultEntryDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "ActivityResult"
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
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
					"name": "Name",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 18}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Category",
					"values": {
						"bindTo": "Category",
						"layout": {"column": 0, "row": 1, "colSpan": 9},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "BusinessProcessOnly",
					"values": {
						"layout": {"column": 9, "row": 1, "colSpan": 9}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Description",
					"values": {
						"bindTo": "Description",
						"contentType": Terrasoft.ContentType.LONG_TEXT,
						"layout": {"column": 0, "row": 2, "colSpan": 18}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "ActivityCategoryResultEntryDetail",
					"values": {
						"layout": {"column": 0, "row": 4, "colSpan": 24},
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


