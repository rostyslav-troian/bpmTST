Terrasoft.configuration.Structures["CampaignUpdateObjectPage"] = {innerHierarchyStack: ["CampaignUpdateObjectPage"], structureParent: "CampaignBaseCrudObjectPage"};
define('CampaignUpdateObjectPageStructure', ['CampaignUpdateObjectPageResources'], function(resources) {return {schemaUId:'baef4373-947e-4265-92bb-194a0d275a95',schemaCaption: "Campaign update object page", parentSchemaName: "CampaignBaseCrudObjectPage", schemaName:'CampaignUpdateObjectPage',parentSchemaUId:'79082aef-7c22-4089-ba3e-9ac18b396240',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignUpdateObjectPage", ["CampaignUpdateObjectPageResources"], function() {
	return {
		methods: {
			/**
			 * @inheritdoc CampaignBaseCrudObjectPage#getEntitySchemaLookupName
			 * @override
			 */
			getEntitySchemaLookupName: function() {
				return "CmpgnUpdObjElEntity";
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


