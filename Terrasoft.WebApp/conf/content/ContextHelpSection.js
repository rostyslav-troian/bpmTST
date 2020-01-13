Terrasoft.configuration.Structures["ContextHelpSection"] = {innerHierarchyStack: ["ContextHelpSection"], structureParent: "BaseSectionV2"};
define('ContextHelpSectionStructure', ['ContextHelpSectionResources'], function(resources) {return {schemaUId:'469eee2c-aabe-41df-adfe-cd7c8b4e1075',schemaCaption: "Web help section", parentSchemaName: "BaseSectionV2", schemaName:'ContextHelpSection',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContextHelpSection", [], function() {
	return {
		entitySchemaName: "ContextHelp",
		methods: {
			/**
			 * @inheritDoc Terrasoft.BaseSchemaViewModel#getEntityStructure
			 * @overridden
			 */
			getEntityStructure: function() {
				var entityStructure = this.callParent(arguments);
				if (this.Ext.isEmpty(entityStructure)) {
					entityStructure = {
						ObjectentitySchemaName: "ContextHelp",
						pages: [
							{
								caption: this.get("Resources.Strings.AddRecordButtonCaption"),
								captionLcz: this.get("Resources.Strings.HeaderCaption"),
								cardSchema: "ContextHelpPage"
							}
						]
					};
				}
				return entityStructure;
			},

			/**
			 * @inheritDoc Terrasoft.BaseSchemaViewModel#getModuleStructure
			 * @overridden
			 */
			getModuleStructure: function() {
				var moduleStructure = this.callParent(arguments);
				if (this.Ext.isEmpty(moduleStructure)) {
					moduleStructure = {
						cardSchema: "ContextHelpPage",
						entitySchemaName: "ContextHelp",
						moduleCaption: this.get("Resources.Strings.HeaderCaption"),
						moduleHeader: this.get("Resources.Strings.SchemaCaption"),
						sectionSchema: "ContextHelpSection"
					};
				}
				return moduleStructure;
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


