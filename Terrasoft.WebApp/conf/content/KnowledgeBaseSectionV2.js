Terrasoft.configuration.Structures["KnowledgeBaseSectionV2"] = {innerHierarchyStack: ["KnowledgeBaseSectionV2"], structureParent: "BaseSectionV2"};
define('KnowledgeBaseSectionV2Structure', ['KnowledgeBaseSectionV2Resources'], function(resources) {return {schemaUId:'4d21db49-2ab4-4dff-8790-9b4741b7bf0f',schemaCaption: "KnowledgeBaseSectionV2", parentSchemaName: "BaseSectionV2", schemaName:'KnowledgeBaseSectionV2',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("KnowledgeBaseSectionV2", [],
function() {
	return {
		entitySchemaName: "KnowledgeBase",
		methods: {
			initContextHelp: function() {
				this.set("ContextHelpId", 1006);
				this.callParent(arguments);
			},

			/**
			 * ############### #### # ######### ###### #### ##### ######## ## #######.
			 * @protected
			 * @overridden
			 */
			initTags: function() {
				this.tagSchemaName = this.entitySchemaName + "TagV2";
				this.inTagSchemaName = this.entitySchemaName + "InTagV2";
				this.callParent(arguments);
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


