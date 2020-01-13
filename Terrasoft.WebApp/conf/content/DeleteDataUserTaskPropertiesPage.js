Terrasoft.configuration.Structures["DeleteDataUserTaskPropertiesPage"] = {innerHierarchyStack: ["DeleteDataUserTaskPropertiesPage"], structureParent: "BaseDataModificationUserTaskPropertiesPage"};
define('DeleteDataUserTaskPropertiesPageStructure', ['DeleteDataUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'ce14ea36-c284-46c4-9489-42ae21e2ac85',schemaCaption: "DeleteDataUserTaskPropertiesPage", parentSchemaName: "BaseDataModificationUserTaskPropertiesPage", schemaName:'DeleteDataUserTaskPropertiesPage',parentSchemaUId:'e8f0a1bf-7dcf-497c-bc81-53f264cc1bdb',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseDataModificationUserTaskPropertiesPage
 */
define("DeleteDataUserTaskPropertiesPage", [],
		function() {
			return {
				methods: {

					/**
					 * @inheritdoc BaseDataModificationUserTaskPropertiesPage#getReferenceSchemaUIdParameterName
					 * @overridden
					 */
					getReferenceSchemaUIdParameterName: function() {
						return "EntitySchemaId";
					}
				}
			};
		}
);


