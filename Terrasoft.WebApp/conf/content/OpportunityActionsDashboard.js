Terrasoft.configuration.Structures["OpportunityActionsDashboard"] = {innerHierarchyStack: ["OpportunityActionsDashboardOpportunity", "OpportunityActionsDashboard"], structureParent: "SectionActionsDashboard"};
define('OpportunityActionsDashboardOpportunityStructure', ['OpportunityActionsDashboardOpportunityResources'], function(resources) {return {schemaUId:'ff21ce44-069a-49c8-89b0-83d2f3472ce3',schemaCaption: "OpportunityActionsDashboard", parentSchemaName: "SectionActionsDashboard", schemaName:'OpportunityActionsDashboardOpportunity',parentSchemaUId:'d2bb0841-0efc-4750-92b4-9dca1072e886',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityActionsDashboardStructure', ['OpportunityActionsDashboardResources'], function(resources) {return {schemaUId:'c4f2ceed-4134-4002-a82e-db63e4842d48',schemaCaption: "OpportunityActionsDashboard", parentSchemaName: "OpportunityActionsDashboardOpportunity", schemaName:'OpportunityActionsDashboard',parentSchemaUId:'ff21ce44-069a-49c8-89b0-83d2f3472ce3',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OpportunityActionsDashboardOpportunity",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityActionsDashboardOpportunityResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OpportunityActionsDashboardOpportunity", [], function() {
	return {
		methods: {
			/**
			 * @inheritdoc Terrasoft.SectionActionsDashboard#isMenuItem
			 * @overridden
			 */
			isMenuItem: function(item, previousItem) {
				if (this.get("DcmSchema")) {
					return this.callParent(arguments);
				} else {
					var itemInnerOrder = item.get("InnerOrder");
					var prevItemInnerOrder = previousItem && previousItem.get("InnerOrder");
					return Boolean(itemInnerOrder) && Boolean(prevItemInnerOrder);
				}
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});

define("OpportunityActionsDashboard", [], function() {
	return {
		methods: {

			/**
			 * @inheritdoc Terrasoft.SectionActionsDashboard#onReloadDashboardItems
			 * @overridden
			 */
			onReloadDashboardItems: function() {
				var isMasterEntityUsedInProcess = this.getMasterEntityParameterValue("ByProcess");
				if (isMasterEntityUsedInProcess) {
					this.reloadMasterEntityCard();
				} else {
					this.callParent(arguments);
				}
			}

		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


