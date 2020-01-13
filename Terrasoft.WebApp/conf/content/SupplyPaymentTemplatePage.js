Terrasoft.configuration.Structures["SupplyPaymentTemplatePage"] = {innerHierarchyStack: ["SupplyPaymentTemplatePage"], structureParent: "BasePageV2"};
define('SupplyPaymentTemplatePageStructure', ['SupplyPaymentTemplatePageResources'], function(resources) {return {schemaUId:'13a644e9-064d-4f60-aa79-76c2010eb5bb',schemaCaption: "Section edit page schema - Installment plan template", parentSchemaName: "BasePageV2", schemaName:'SupplyPaymentTemplatePage',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SupplyPaymentTemplatePage", ["SupplyPaymentTemplatePageResources", "GeneralDetails"],
	function() {
		return {
			entitySchemaName: "SupplyPaymentTemplate",
			details: /**SCHEMA_DETAILS*/{
				SupplyPaymentTemplate: {
					schemaName: "SupplyPaymentTemplateItemDetailV2",
					entitySchemaName: "SupplyPaymentTemplateItem",
					filter: {
						masterColumn: "Id",
						detailColumn: "SupplyPaymentTemplate"
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Name",
					"values": {"layout": {"column": 0, "row": 0, "colSpan": 24}}
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
					"name": "SupplyPaymentTemplatePageGeneralTabContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "SupplyPaymentTemplatePageGeneralTabContainer",
					"propertyName": "items",
					"name": "SupplyPaymentTemplate",
					"values": {"itemType": Terrasoft.ViewItemType.DETAIL}
				}
			]/**SCHEMA_DIFF*/,
			attributes: {},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BasePageV2#initActionButtonMenu
				 * @overridden
				 */
				initActionButtonMenu: this.Terrasoft.emptyFn
			}
		};
	});


