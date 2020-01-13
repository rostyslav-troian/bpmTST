Terrasoft.configuration.Structures["CampaignTargetPageV2"] = {innerHierarchyStack: ["CampaignTargetPageV2"], structureParent: "BasePageV2"};
define('CampaignTargetPageV2Structure', ['CampaignTargetPageV2Resources'], function(resources) {return {schemaUId:'a50c518d-4edb-45a1-ae9b-8c66b10f9c8d',schemaCaption: "Card page - \"Campaigns\" responses", parentSchemaName: "BasePageV2", schemaName:'CampaignTargetPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignTargetPageV2", [], function() {
		return {
			entitySchemaName: "CampaignTarget",
			attributes: {
				"Campaign": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP
				},
				"Contact": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					lookupListConfig: {
						filters: [
							function() {
								var campaign = this.get("Campaign");
								var filterGroup = Ext.create("Terrasoft.FilterGroup");
								var existsSubFilters = this.Terrasoft.createFilterGroup();
								existsSubFilters.addItem(this.Terrasoft.createColumnFilterWithParameter(
									Terrasoft.ComparisonType.EQUAL, "Campaign", campaign.value));
								filterGroup.add("Exists",
									Terrasoft.createNotExistsFilter("[CampaignTarget:Contact].Id",
										existsSubFilters));
								return filterGroup;
							}
						]
					}
				}
			},
			details: /**SCHEMA_DETAILS*/{
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Campaign",
					"values": {
						"bindTo": "Campaign",
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12
						},
						"enabled": false
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Contact",
					"values": {
						"bindTo": "Contact",
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 12
						}
					}
				},
				{
					"operation": "remove",
					"name": "actions"
				}
			]/**SCHEMA_DIFF*/
		};
	});


