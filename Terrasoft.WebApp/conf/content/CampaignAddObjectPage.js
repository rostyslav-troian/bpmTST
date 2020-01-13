Terrasoft.configuration.Structures["CampaignAddObjectPage"] = {innerHierarchyStack: ["CampaignAddObjectPage"], structureParent: "CampaignBaseCrudObjectPage"};
define('CampaignAddObjectPageStructure', ['CampaignAddObjectPageResources'], function(resources) {return {schemaUId:'753b445f-ce22-4b12-8449-d71f44f5b36f',schemaCaption: "Campaign add object page", parentSchemaName: "CampaignBaseCrudObjectPage", schemaName:'CampaignAddObjectPage',parentSchemaUId:'79082aef-7c22-4089-ba3e-9ac18b396240',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 define("CampaignAddObjectPage", ["CampaignAddObjectPageResources"], function() {
	return {
		methods: {
			/**
			 * @inheritdoc CampaignBaseCrudObjectPage#getEntitySchemaLookupName
			 * @override
			 */
			getEntitySchemaLookupName: function() {
				return "CmpgnAddObjElEntity";
			}

		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


