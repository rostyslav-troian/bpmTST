Terrasoft.configuration.Structures["EventSubProcessPropertiesPage"] = {innerHierarchyStack: ["EventSubProcessPropertiesPage"], structureParent: "BaseProcessSchemaElementPropertiesPage"};
define('EventSubProcessPropertiesPageStructure', ['EventSubProcessPropertiesPageResources'], function(resources) {return {schemaUId:'d0ce2cab-699f-4362-8627-5fafc9a7732f',schemaCaption: "Event sub-process element properties page", parentSchemaName: "BaseProcessSchemaElementPropertiesPage", schemaName:'EventSubProcessPropertiesPage',parentSchemaUId:'10a8efdc-8474-4a9a-b28f-ab96ec9bbe4a',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseProcessSchemaElementPropertiesPage
 */
define("EventSubProcessPropertiesPage", [],
	function() {
		return {
			messages: {},
			mixins: {},
			attributes: {},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseProcessSchemaElementPropertiesPage#getIsEditPageDefault
				 * @overridden
				 */
				getIsEditPageDefault: function() {
					return true;
				}
			},
			diff: /**SCHEMA_DIFF*/[
			]/**SCHEMA_DIFF*/
		};
	}
);


