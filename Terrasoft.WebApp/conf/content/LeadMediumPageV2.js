Terrasoft.configuration.Structures["LeadMediumPageV2"] = {innerHierarchyStack: ["LeadMediumPageV2"], structureParent: "BaseModulePageV2"};
define('LeadMediumPageV2Structure', ['LeadMediumPageV2Resources'], function(resources) {return {schemaUId:'bef0c6a3-5576-4b7b-bec7-2dbe804ca9b3',schemaCaption: "Schema card: \"Lead channel\"", parentSchemaName: "BaseModulePageV2", schemaName:'LeadMediumPageV2',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LeadMediumPageV2", function() {
	return {
		entitySchemaName: "LeadMedium",
		details: /**SCHEMA_DETAILS*/{
			LeadMediumCode: {
				schemaName: "LeadMediumCodeDetailV2",
				entitySchemaName: "LeadMediumCode",
				filter: {
					masterColumn: "Id",
					detailColumn: "LeadMedium"
				}
			}
		}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "ESNTab"
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Name",
				"values": {"layout": {"column": 0, "row": 0, "colSpan": 24}}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Description",
				"values": {"layout": {"column": 0, "row": 1, "colSpan": 24}}
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0,
				"values": {
					"caption": {"bindTo": "Resources.Strings.GeneralInfoTabCaption"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "GeneralInfoTab",
				"name": "LeadMediumCodeTabContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadMediumCodeTabContainer",
				"propertyName": "items",
				"name": "LeadMediumCode",
				"values": {"itemType": Terrasoft.ViewItemType.DETAIL}
			},
			{
				"operation": "remove",
				"name": "actions"
			}
		]/**SCHEMA_DIFF*/,
		methods: {},
		rules: {}
	};
});


