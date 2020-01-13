Terrasoft.configuration.Structures["ContactSocialAnniversaryDetail"] = {innerHierarchyStack: ["ContactSocialAnniversaryDetail"], structureParent: "SocialAnniversaryDetail"};
define('ContactSocialAnniversaryDetailStructure', ['ContactSocialAnniversaryDetailResources'], function(resources) {return {schemaUId:'d90e1bc0-a81b-4a54-913b-3d0bca527297',schemaCaption: "Detail - Population of contact noteworthy events", parentSchemaName: "SocialAnniversaryDetail", schemaName:'ContactSocialAnniversaryDetail',parentSchemaUId:'a411344d-4e1a-4b57-9e48-f4d242b3ea73',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContactSocialAnniversaryDetail", [], function() {
	return {
		entitySchemaName: "ContactAnniversary",
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


