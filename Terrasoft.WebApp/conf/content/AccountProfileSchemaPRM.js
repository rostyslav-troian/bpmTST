Terrasoft.configuration.Structures["AccountProfileSchemaPRM"] = {innerHierarchyStack: ["AccountProfileSchemaPRM"], structureParent: "BaseProfileSchema"};
define('AccountProfileSchemaPRMStructure', ['AccountProfileSchemaPRMResources'], function(resources) {return {schemaUId:'da527b89-22ad-40bb-814f-ace38781c410',schemaCaption: "Account profile (PRM)", parentSchemaName: "BaseProfileSchema", schemaName:'AccountProfileSchemaPRM',parentSchemaUId:'8b8587c7-3fb2-4104-917e-1da5cbea22b1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Account profile class.
 * @class Terrasoft.AccountProfileSchemaPRM
 */
define("AccountProfileSchemaPRM", ["ConfigurationConstants"],
	function(ConfigurationConstants) {
		return {
			entitySchemaName: "Account",
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseProfileSchema#getLookupConfig
				 * @overridden
				 */
				getLookupConfig: function() {
					var config = this.callParent(arguments);
					var filter = this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Type", ConfigurationConstants.AccountType.Partner);
					if (this.isEmpty(config.filters)) {
						var filters = this.Terrasoft.createFilterGroup();
						config.filters = filters;
					}
					config.filters.add("AccountTypeFilter", filter);
					return config;
				}
			}
		};
	}
);


