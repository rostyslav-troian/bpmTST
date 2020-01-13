Terrasoft.configuration.Structures["CommunicationTypePageV2"] = {innerHierarchyStack: ["CommunicationTypePageV2"], structureParent: "BasePageV2"};
define('CommunicationTypePageV2Structure', ['CommunicationTypePageV2Resources'], function(resources) {return {schemaUId:'b093690f-6771-45db-aabf-508f476bddbc',schemaCaption: "CommunicationTypePageV2", parentSchemaName: "BasePageV2", schemaName:'CommunicationTypePageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 define("CommunicationTypePageV2", [],
	function() {
		return {
			entitySchemaName: "CommunicationType",
			methods: {
			},
			details: /**SCHEMA_DETAILS*/{
				CommunicationTypeByCommunicationDetail: {
					schemaName: "CommunicationTypeByCommunicationDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "CommunicationType"
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
					"name": "Description",
					"values": {
						"bindTo": "Description",
						"contentType": Terrasoft.ContentType.LONG_TEXT,
						"layout": {"column": 0, "row": 1, "colSpan": 18}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "UseforContacts",
					"values": {
						"layout": {"column": 0, "row": 2, "colSpan": 9}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "UseforAccounts",
					"values": {
						"layout": {"column": 9, "row": 2, "colSpan": 9}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "CommunicationTypeByCommunicationDetail",
					"values": {
						"layout": {"column": 0, "row": 4, "colSpan": 24},
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


