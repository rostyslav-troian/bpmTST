Terrasoft.configuration.Structures["ProcessBaseGatewayPropertiesPage"] = {innerHierarchyStack: ["ProcessBaseGatewayPropertiesPage"], structureParent: "BaseProcessSchemaElementPropertiesPage"};
define('ProcessBaseGatewayPropertiesPageStructure', ['ProcessBaseGatewayPropertiesPageResources'], function(resources) {return {schemaUId:'9164034c-bdf6-4a65-9471-4d188bb66c17',schemaCaption: "Process base gateway properties page schema", parentSchemaName: "BaseProcessSchemaElementPropertiesPage", schemaName:'ProcessBaseGatewayPropertiesPage',parentSchemaUId:'10a8efdc-8474-4a9a-b28f-ab96ec9bbe4a',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * ProcessBaseGatewayPropertiesPage edit page schema.
 * Parent: BaseProcessSchemaElementPropertiesPage.
 */
define("ProcessBaseGatewayPropertiesPage", function() {
	return {
		messages: {},
		attributes: {},
		methods: {
			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#getIsSerializeToDBVisible
			 * @overridden
			 */
			getIsSerializeToDBVisible: function() {
				return false;
			},
			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#getIsLoggingVisible
			 * @overridden
			 */
			getIsLoggingVisible: function() {
				return false;
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


