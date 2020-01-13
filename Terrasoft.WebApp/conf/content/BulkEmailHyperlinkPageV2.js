Terrasoft.configuration.Structures["BulkEmailHyperlinkPageV2"] = {innerHierarchyStack: ["BulkEmailHyperlinkPageV2"], structureParent: "BasePageV2"};
define('BulkEmailHyperlinkPageV2Structure', ['BulkEmailHyperlinkPageV2Resources'], function(resources) {return {schemaUId:'260f141e-ca94-4a00-9176-6dc4dc3bfd24',schemaCaption: "Card page - Links in email", parentSchemaName: "BasePageV2", schemaName:'BulkEmailHyperlinkPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BulkEmailHyperlinkPageV2", [],
		function() {
			return {
				entitySchemaName: "BulkEmailHyperlink",
				attributes: {
					"Caption": {
						type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
						name: "Caption",
						columnPath: "Caption",
						dataValueType: Terrasoft.DataValueType.TEXT
					}
				},
				details: /**SCHEMA_DETAILS*/{
				}/**SCHEMA_DETAILS*/,
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "remove",
						"name": "actions"
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "Caption",
						"values": {
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
						"name": "Url",
						"values": {
							"layout": {
								"column": 0,
								"row": 1,
								"colSpan": 12
							},
							"enabled": false
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "ClicksCount",
						"values": {
							"layout": {
								"column": 0,
								"row": 2,
								"colSpan": 12
							},
							"enabled": false
						}
					}
				]/**SCHEMA_DIFF*/
			};
		}
);


