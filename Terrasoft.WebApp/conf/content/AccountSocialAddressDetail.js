Terrasoft.configuration.Structures["AccountSocialAddressDetail"] = {innerHierarchyStack: ["AccountSocialAddressDetail"], structureParent: "SocialAddressDetail"};
define('AccountSocialAddressDetailStructure', ['AccountSocialAddressDetailResources'], function(resources) {return {schemaUId:'6ccebc5e-9607-4164-acf3-64a9baa5b550',schemaCaption: "Detail - Population of account addresses", parentSchemaName: "SocialAddressDetail", schemaName:'AccountSocialAddressDetail',parentSchemaUId:'04304807-0220-4b23-beac-ccf437ca3777',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AccountSocialAddressDetail", [], function() {
	return {
		entitySchemaName: "AccountAddress",
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		attributes: {
			/**
			 * Requires generating default entity profile if no profile was found.
			 */
			UseGeneratedProfile: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		}
	};
});


