Terrasoft.configuration.Structures["AccountSocialAnniversaryDetail"] = {innerHierarchyStack: ["AccountSocialAnniversaryDetail"], structureParent: "SocialAnniversaryDetail"};
define('AccountSocialAnniversaryDetailStructure', ['AccountSocialAnniversaryDetailResources'], function(resources) {return {schemaUId:'4784f7c0-ca0d-49da-a9ea-b86b72940001',schemaCaption: "Base detail - Population of account noteworthy events", parentSchemaName: "SocialAnniversaryDetail", schemaName:'AccountSocialAnniversaryDetail',parentSchemaUId:'a411344d-4e1a-4b57-9e48-f4d242b3ea73',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AccountSocialAnniversaryDetail", [], function() {
	return {
		entitySchemaName: "AccountAnniversary",
		methods: {

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilterDefaultColumnName
			 * @overridden
			 */
			getFilterDefaultColumnName: function() {
				return "AnniversaryType";
			}

		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


