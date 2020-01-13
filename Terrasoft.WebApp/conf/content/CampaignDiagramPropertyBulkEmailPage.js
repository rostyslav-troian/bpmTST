Terrasoft.configuration.Structures["CampaignDiagramPropertyBulkEmailPage"] = {innerHierarchyStack: ["CampaignDiagramPropertyBulkEmailPage"], structureParent: "CampaignDiagramPropertyEntityPage"};
define('CampaignDiagramPropertyBulkEmailPageStructure', ['CampaignDiagramPropertyBulkEmailPageResources'], function(resources) {return {schemaUId:'162b8aa0-c795-4abf-8c4d-3b2f2d0516f5',schemaCaption: "CampaignDiagramPropertyBulkEmailPage", parentSchemaName: "CampaignDiagramPropertyEntityPage", schemaName:'CampaignDiagramPropertyBulkEmailPage',parentSchemaUId:'3c811c21-97f5-46b9-bc3c-8c4b9bd6741b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignDiagramPropertyBulkEmailPage", ["terrasoft", "CampaignDiagramPropertyBulkEmailPageResources",
			"MarketingEnums"],
		function(Terrasoft, resources, MarketingEnums) {
			return {
				entitySchemaName: "BulkEmail",
				methods: {
					/**
					 * Returns a collection of fields used in the entity.
					 * @protected
					 * @overridden
					 * @return {Array} Collection fields.
					 */
					getUsedColumns: function() {
						return [
								"Id",
								"Name",
								"StartDate",
								"TemplateSubject",
								"SenderName",
								"SenderEmail",
								"Category"
							];
					},

					/**
					 * @inheritdoc Terrasoft.BaseViewModel#CampaignDiagramPropertyEntityPage
					 */
					formLookupConfig: function(entity) {
						var config = this.callParent(arguments);
						return this.Ext.apply(config, {
							Category: entity.get("Category")
						});
					},

					/**
					 * Returns a filter collection lookup field Entity.
					 * @protected
					 * @overriden
					 * @return {Terrasoft.FiltersGroup} Collection fields.
					 */
					getCustomLookupFilters: function() {
						var filters = Terrasoft.createFilterGroup();
						filters.logicalOperation = Terrasoft.LogicalOperatorType.AND;
						filters.addItem(Terrasoft.createColumnIsNullFilter("Campaign"));
						filters.addItem(Terrasoft.createColumnIsNullFilter("SplitTest"));
						filters.addItem(Terrasoft.createColumnInFilterWithParameters(
							"Status", [
								MarketingEnums.BulkEmailStatus.ACTIVE,
								MarketingEnums.BulkEmailStatus.PLANNED,
								MarketingEnums.BulkEmailStatus.START_SCHEDULED,
								MarketingEnums.BulkEmailStatus.STOPPED
							]));
						filters.addItem(Terrasoft.createColumnInFilterWithParameters(
							"LaunchOption", [
								MarketingEnums.BulkEmailLaunchOption.MASS_MAILING_SCHEDULED,
								MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_SHEDULED,
								MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_IMMEDIATE,
								MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_HOURLY
							]));
						filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"RecipientCount", 0));
						return filters;
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "remove",
						"name": "CampaignDiagramPropertyDescriptionContainer"
					},
					{
						"operation": "merge",
						"name": "CampaignDiagramPropertyEntityMainContainer",
						"values": {
							"wrapClass": ["main", "fields-container"]
						}
					},
					{
						"operation": "insert",
						"name": "StartDate",
						"parentName": "CampaignDiagramPropertyEntityMainContainer",
						"propertyName": "items",
						"values":  {
							"controlConfig": {
								"enabled": false
							}
						}
					},
					{
						"operation": "insert",
						"name": "TemplateSubject",
						"parentName": "CampaignDiagramPropertyEntityMainContainer",
						"propertyName": "items",
						"values":  {
							"controlConfig": {
								"enabled": false,
								"setValidationInfo": Terrasoft.emptyFn
							},
							"isRequired": false
						}
					},
					{
						"operation": "insert",
						"name": "SenderName",
						"parentName": "CampaignDiagramPropertyEntityMainContainer",
						"propertyName": "items",
						"values":  {
							"controlConfig": {
								"enabled": false,
								"setValidationInfo": Terrasoft.emptyFn
							},
							"isRequired": false
						}
					},
					{
						"operation": "insert",
						"name": "SenderEmail",
						"parentName": "CampaignDiagramPropertyEntityMainContainer",
						"propertyName": "items",
						"values":  {
							"controlConfig": {
								"enabled": false,
								"setValidationInfo": Terrasoft.emptyFn
							},
							"isRequired": false
						}
					}
				]/**SCHEMA_DIFF*/
			};
		});


