Terrasoft.configuration.Structures["DcmEmailTemplateUserTaskPropertiesPage"] = {innerHierarchyStack: ["DcmEmailTemplateUserTaskPropertiesPage"], structureParent: "EmailTemplateUserTaskPropertiesPage"};
define('DcmEmailTemplateUserTaskPropertiesPageStructure', ['DcmEmailTemplateUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'e2798191-2960-4650-b387-efda1b07d965',schemaCaption: "DcmEmailTemplateUserTaskPropertiesPage", parentSchemaName: "EmailTemplateUserTaskPropertiesPage", schemaName:'DcmEmailTemplateUserTaskPropertiesPage',parentSchemaUId:'562c3d08-766b-4c9c-8112-177d266d63e7',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 /**
 * Parent: EmailTemplateUserTaskPropertiesPage => BaseActivityUserTaskPropertiesPage => BaseUserTaskPropertiesPage
 * => RootUserTaskPropertiesPage => ProcessFlowElementPropertiesPage => BaseProcessSchemaElementPropertiesPage
 */
define("DcmEmailTemplateUserTaskPropertiesPage", [],
	function() {
		return {

			/**
			 * Use base DCM schema.
			 * @type {Boolean}
			 */
			useBaseDcmSchema: true,
			
			methods: {
				
				/**
				 * @inheritdoc Terrasoft.MenuItemsMappingMixin#getMainRecordMappingConfig
				 * @override
				 */
				getMainRecordMappingConfig: function() {
					var mappingTag = this.tag;
					var disabledMappings = ["Sender"];
					var disabledIcons = ["EmailRecipientItem"];
					return {
						enabled: !Ext.Array.contains(disabledMappings, mappingTag),
						hideIcon: Ext.Array.contains(disabledIcons, mappingTag)
					};
				}
			},
			
			diff: /**SCHEMA_DIFF*/[
			]/**SCHEMA_DIFF*/
		};
	}
);


