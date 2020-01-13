Terrasoft.configuration.Structures["CompetitorProductPage"] = {innerHierarchyStack: ["CompetitorProductPage"], structureParent: "BasePageV2"};
define('CompetitorProductPageStructure', ['CompetitorProductPageResources'], function(resources) {return {schemaUId:'bde53928-efff-4342-94f3-a0b6376d65b0',schemaCaption: "Edit page - Competitor product", parentSchemaName: "BasePageV2", schemaName:'CompetitorProductPage',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CompetitorProductPage", [],
		function() {
			return {
				entitySchemaName: "CompetitorProduct",
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"name": "CompetitorProductPageGeneralTabContainer",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "CompetitorProductPageGeneralTabContainer",
						"propertyName": "items",
						"name": "CompetitorProductPageGeneralBlock",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "Competitor",
						"values": {

							"bindTo": "Competitor",
							"layout": { "column": 0, "row": 1, "colSpan": 12 }
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "Name",
						"values": {
							"bindTo": "Name",
							"layout": { "column": 0, "row": 0, "colSpan": 12 }
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "Weakness",
						"values": {
							"bindTo": "Weakness",
							"layout": { "column": 0, "row": 2, "colSpan": 12 },
							"contentType": Terrasoft.ContentType.LONG_TEXT
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "Strengths",
						"values": {
							"bindTo": "Strengths",
							"layout": { "column": 0, "row": 3, "colSpan": 12 },
							"contentType": Terrasoft.ContentType.LONG_TEXT
						}
					},
					{
						"operation": "merge",
						"name": "Tabs",
						"parentName": "CardContentContainer",
						"propertyName": "items",
						"values": {
							"visible": false
						}
					}
				]/**SCHEMA_DIFF*/
			};
		});


