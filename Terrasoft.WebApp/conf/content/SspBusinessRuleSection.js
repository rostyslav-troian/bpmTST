Terrasoft.configuration.Structures["SspBusinessRuleSection"] = {innerHierarchyStack: ["SspBusinessRuleSection"], structureParent: "BusinessRuleSection"};
define('SspBusinessRuleSectionStructure', ['SspBusinessRuleSectionResources'], function(resources) {return {schemaUId:'fb42b20c-50f1-42e6-bcec-9a97c352bf1d',schemaCaption: "SspBusinessRuleSection", parentSchemaName: "BusinessRuleSection", schemaName:'SspBusinessRuleSection',parentSchemaUId:'7c6ea2d4-c6a9-492d-ab9d-1fea8bf38606',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 define("SspBusinessRuleSection", ["BusinessRuleSection"], function() {
	return {
		attributes: {},
		methods: {

			/**
			 * @inheritDoc Terrasoft.BusinessRuleSection#getModuleDesignerConfig
			 * @override
			 */
			getModuleDesignerConfig: function () {
				let config = this.callParent(arguments);
				config["entitySchemaUId"] = this.getBusinessRuleEntitySchemaUId();
				return config;
			},

			/**
			 * Returns entity schema UId for business rules.
			 * @protected
			 * @returns {Guid} UId of business rule entity schema.
			 */
			getBusinessRuleEntitySchemaUId: function () {
				const config = Terrasoft.BusinessRuleSchemaManager.getDataSourcesConfig();
				const values = _.values(config);
				if (this.Ext.isEmpty(values)) {
					return;
				}
				const schemaName = values[0].entitySchemaName;
				return Terrasoft.EntitySchemaManager.findItemByName(schemaName).uId;
			}
		},

		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


