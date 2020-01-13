Terrasoft.configuration.Structures["SequenceFlowPropertiesPage"] = {innerHierarchyStack: ["SequenceFlowPropertiesPage"], structureParent: "BaseProcessSchemaElementPropertiesPage"};
define('SequenceFlowPropertiesPageStructure', ['SequenceFlowPropertiesPageResources'], function(resources) {return {schemaUId:'4bb13517-bffd-4f21-8ac3-a05ca406cd5e',schemaCaption: "SequenceFlow properties page", parentSchemaName: "BaseProcessSchemaElementPropertiesPage", schemaName:'SequenceFlowPropertiesPage',parentSchemaUId:'10a8efdc-8474-4a9a-b28f-ab96ec9bbe4a',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * SequenceFlowPropertiesPage edit page schema.
 * Parent: BaseProcessSchemaElementPropertiesPage.
 */
define("SequenceFlowPropertiesPage", function() {
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


