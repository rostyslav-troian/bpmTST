Terrasoft.configuration.Structures["BulkEmailSubscriptionPageV2"] = {innerHierarchyStack: ["BulkEmailSubscriptionPageV2"], structureParent: "BasePageV2"};
define('BulkEmailSubscriptionPageV2Structure', ['BulkEmailSubscriptionPageV2Resources'], function(resources) {return {schemaUId:'00149ec3-1008-4e48-90fa-d39e093eb943',schemaCaption: "Edit page - Contact subscription", parentSchemaName: "BasePageV2", schemaName:'BulkEmailSubscriptionPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BulkEmailSubscriptionPageV2", ["terrasoft"], function(Terrasoft) {
	return {
		entitySchemaName: "BulkEmailSubscription",
		attributes: {
			BulkEmailType: {
				lookupListConfig: {
					filters: [
						function() {
							var contact = this.get("Contact");
							var filterGroup = Ext.create("Terrasoft.FilterGroup");
							filterGroup.add("IsSignable",
								Terrasoft.createColumnFilterWithParameter(
									Terrasoft.ComparisonType.EQUAL,
									"IsSignable",
									1));
							var existsSubFilters = this.Terrasoft.createFilterGroup();
							existsSubFilters.addItem(this.Terrasoft.createColumnFilterWithParameter(
									Terrasoft.ComparisonType.EQUAL, "Contact", contact.value));
							filterGroup.add("Exists",
								Terrasoft.createNotExistsFilter("[BulkEmailSubscription:BulkEmailType].Id",
								existsSubFilters));
							return filterGroup;
						}
					]
				}
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"propertyName": "items",
				"name": "BulkEmailSubscriptionContainer",
				"parentName": "CardContentContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "BulkEmailSubscriptionContainer",
				"propertyName": "items",
				"name": "Contact",
				"values": {
					"layout": {"column": 0, "row": 0},
					"enabled": false
				}
			},
			{
				"operation": "insert",
				"parentName": "BulkEmailSubscriptionContainer",
				"propertyName": "items",
				"name": "BulkEmailType",
				"values": {
					"layout": {"column": 0, "row": 1}
				}
			},
			{
				"operation": "insert",
				"parentName": "BulkEmailSubscriptionContainer",
				"propertyName": "items",
				"name": "BulkEmailSubsStatus",
				"values": {
					"contentType": Terrasoft.ContentType.ENUM,
					"layout": {"column": 0, "row": 2}
				}
			},
			{
				"operation": "remove",
				"name": "actions"
			}
		]/**SCHEMA_DIFF*/
	};
});


