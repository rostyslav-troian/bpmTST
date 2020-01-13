Terrasoft.configuration.Structures["PortalLeadSectionActionsDashboard"] = {innerHierarchyStack: ["PortalLeadSectionActionsDashboard"], structureParent: "LeadSectionActionsDashboard"};
define('PortalLeadSectionActionsDashboardStructure', ['PortalLeadSectionActionsDashboardResources'], function(resources) {return {schemaUId:'af26c57a-9942-42a2-8577-9d439ea89e68',schemaCaption: "PortalLeadSectionActionsDashboard", parentSchemaName: "LeadSectionActionsDashboard", schemaName:'PortalLeadSectionActionsDashboard',parentSchemaUId:'9f460c87-c98d-4993-a55a-4d6ad75091a0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalLeadSectionActionsDashboard", ["LeadSectionActionsDashboard",
		"PortalLeadSectionActionsDashboardResources"],
	function() {
		return {
			attributes: {},
			messages: {},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "CallMessageTab"
				},
				{
					"operation": "remove",
					"name": "EmailMessageTab"
				},
				{
					"operation": "remove",
					"name": "TaskMessageTab"
				},
				{
					"operation": "remove",
					"name": "SocialMessageTab"
				},
				{
					"operation": "remove",
					"name": "DashboardTab"
				}
			],/**SCHEMA_DIFF*/
			methods: {}
		};
	}
);


