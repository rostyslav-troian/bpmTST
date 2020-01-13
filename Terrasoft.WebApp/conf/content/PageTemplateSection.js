Terrasoft.configuration.Structures["PageTemplateSection"] = {innerHierarchyStack: ["PageTemplateSection"], structureParent: "BaseLookupSection"};
define('PageTemplateSectionStructure', ['PageTemplateSectionResources'], function(resources) {return {schemaUId:'58f66223-872f-49cc-9b54-ab12fc62871b',schemaCaption: "PageTemplateSection", parentSchemaName: "BaseLookupSection", schemaName:'PageTemplateSection',parentSchemaUId:'4fb1f740-60bd-4b87-b083-3d52b5054fb2',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseLookupSection
 */
define("PageTemplateSection", ["PageTemplate"], function(PageTemplate) {
	return {
		entitySchemaName: "VwPageTemplate",
		methods: {

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.GridUtilities#getEntitySchemaNameForDelete
			 * @override
			 */
			getEntitySchemaNameForDelete: function() {
				return "PageTemplate";
			},

			/**
			 * @inheritdoc Terrasoft.BaseLookupSection#getModuleCaption
			 * @override
			 */
			getModuleCaption: function() {
				return PageTemplate.caption;
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "DataGridActiveRowCopyAction"
			}
		]/**SCHEMA_DIFF*/
	};
});


