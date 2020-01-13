Terrasoft.configuration.Structures["ProcessBaseEventPropertiesPage"] = {innerHierarchyStack: ["ProcessBaseEventPropertiesPage"], structureParent: "ProcessFlowElementPropertiesPage"};
define('ProcessBaseEventPropertiesPageStructure', ['ProcessBaseEventPropertiesPageResources'], function(resources) {return {schemaUId:'88673ae5-a4ec-4f99-9804-da51b9878832',schemaCaption: "Process base event properties page schema", parentSchemaName: "ProcessFlowElementPropertiesPage", schemaName:'ProcessBaseEventPropertiesPage',parentSchemaUId:'0f347363-31e5-4222-a82e-dcfeda34cbb6',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * ProcessBaseEventPropertiesPage edit page schema.
 * Parent: ProcessFlowElementPropertiesPage => BaseProcessSchemaElementPropertiesPage
 */
define("ProcessBaseEventPropertiesPage", function() {
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


