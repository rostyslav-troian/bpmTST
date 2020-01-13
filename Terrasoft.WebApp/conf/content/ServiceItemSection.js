Terrasoft.configuration.Structures["ServiceItemSection"] = {innerHierarchyStack: ["ServiceItemSection"], structureParent: "BaseSectionV2"};
define('ServiceItemSectionStructure', ['ServiceItemSectionResources'], function(resources) {return {schemaUId:'46be842d-ad07-493e-9e0d-47741bf05901',schemaCaption: "Page schema - \"Services\" section", parentSchemaName: "BaseSectionV2", schemaName:'ServiceItemSection',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ServiceItemSection", [],
function() {
	return {
		entitySchemaName: "ServiceItem",
		ContextHelpId: "1061",
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		messages: {},
		methods: {
			/**
			 * ############# ############# ########### #######.
			 * @protected
			 */
			initContextHelp: function() {
				this.set("ContextHelpId", 1061);
				this.callParent(arguments);
			}
		}
	};
});


