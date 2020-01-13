Terrasoft.configuration.Structures["DcmSubProcessPropertiesPage"] = {innerHierarchyStack: ["DcmSubProcessPropertiesPage"], structureParent: "SubProcessPropertiesPage"};
define('DcmSubProcessPropertiesPageStructure', ['DcmSubProcessPropertiesPageResources'], function(resources) {return {schemaUId:'ec79f2cb-9f45-45c3-aa23-f06c051a8d8f',schemaCaption: "DcmSubProcessPropertiesPage", parentSchemaName: "SubProcessPropertiesPage", schemaName:'DcmSubProcessPropertiesPage',parentSchemaUId:'9815bf5c-4a99-43a4-a5ca-60a6a2fb98ee',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: SubProcessPropertiesPage => ProcessFlowElementPropertiesPage => BaseProcessSchemaElementPropertiesPage
 */
define("DcmSubProcessPropertiesPage", [],
	function() {
		return {

			/**
			 * Use base DCM schema.
			 * @type {Boolean}
			 */
			useBaseDcmSchema: true,

			attributes: {
				/**
				 * @inheritdoc Terrasoft.BaseDcmSchemaElementPropertiesPage#UseConditions
				 * @override
				 */
				"UseConditions": {
					"value": true
				},

				/**
				 * @inheritdoc Terrasoft.BaseDcmSchemaElementPropertiesPage#UseFormulaConditions
				 * @override
				 */
				"UseFormulaConditions": {
					"value": true
				}
			},

			methods: {

				// region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @override
				 */
				init: function() {
					var parentInit = this.getParentMethod();
					var parentArguments = arguments;
					Terrasoft.ProcessFlowElementSchemaManager.initialize(function() {
						parentInit.apply(this, parentArguments);
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.SubProcessPropertiesPage#setElementCaptionBySchema
				 * @override
				 */
				setElementCaptionBySchema: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.SubProcessPropertiesPage#synchronizeParameters
				 * @override
				 */
				synchronizeParameters: function(element, schema) {
					this.callParent(arguments);
					if (schema !== null) {
						var parentSchema = element.parentSchema;
						parentSchema.setEntityConnectionParameterDefaultValue(element);
					}
				},

				/**
				 * @inheritdoc Terrasoft.SubProcessPropertiesPage#getCanRemoveElement
				 * @override
				 */
				getCanRemoveElement: function(callback, scope) {
					var element = this.get("DcmElement");
					Terrasoft.ProcessSchemaDesignerUtilities.validateElementRemoval(
						element.parentSchema, [element.name], callback, scope);
				},

				/**
				 * @inheritdoc Terrasoft.SubProcessPropertiesPage#findLinksToElements
				 * @override
				 */
				findLinksToElements: function(element) {
					return element.parentSchema.findLinksToElements([this.$DcmElement.name]);
				}

				// endregion

			},

			diff: /**SCHEMA_DIFF*/[
			]/**SCHEMA_DIFF*/
		};
	}
);


