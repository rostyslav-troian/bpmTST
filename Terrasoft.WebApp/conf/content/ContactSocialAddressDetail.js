Terrasoft.configuration.Structures["ContactSocialAddressDetail"] = {innerHierarchyStack: ["ContactSocialAddressDetail"], structureParent: "SocialAddressDetail"};
define('ContactSocialAddressDetailStructure', ['ContactSocialAddressDetailResources'], function(resources) {return {schemaUId:'7b52803d-f192-47bf-9dd5-213b7909268c',schemaCaption: "Detail - Population of contact addresses update", parentSchemaName: "SocialAddressDetail", schemaName:'ContactSocialAddressDetail',parentSchemaUId:'04304807-0220-4b23-beac-ccf437ca3777',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContactSocialAddressDetail", [], function() {
	return {
		entitySchemaName: "ContactAddress",
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

