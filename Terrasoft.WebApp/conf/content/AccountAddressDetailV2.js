Terrasoft.configuration.Structures["AccountAddressDetailV2"] = {innerHierarchyStack: ["AccountAddressDetailV2UIv2", "AccountAddressDetailV2"], structureParent: "BaseAddressDetailV2"};
define('AccountAddressDetailV2UIv2Structure', ['AccountAddressDetailV2UIv2Resources'], function(resources) {return {schemaUId:'752c4a52-80fa-4662-ab4b-0c16a379a10e',schemaCaption: "Account addresses detail", parentSchemaName: "BaseAddressDetailV2", schemaName:'AccountAddressDetailV2UIv2',parentSchemaUId:'b0400a53-ef49-4480-9be2-796edee255d1',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountAddressDetailV2Structure', ['AccountAddressDetailV2Resources'], function(resources) {return {schemaUId:'477c6a25-3f04-4039-8da7-4d412d18f684',schemaCaption: "Account addresses detail", parentSchemaName: "AccountAddressDetailV2UIv2", schemaName:'AccountAddressDetailV2',parentSchemaUId:'752c4a52-80fa-4662-ab4b-0c16a379a10e',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountAddressDetailV2UIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountAddressDetailV2UIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountAddressDetailV2UIv2", [], function() {
	return {
		entitySchemaName: "AccountAddress",
		diff: /**SCHEMA_DIFF*/ [] /**SCHEMA_DIFF*/,
		methods: {}
	};
});

define("AccountAddressDetailV2", [], function() {
	return {
		entitySchemaName: "AccountAddress",
		diff: /**SCHEMA_DIFF*/ [] /**SCHEMA_DIFF*/,
		methods: {

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#addGridDataColumns
			 * @overridden
			 */
			addGridDataColumns: function(esq) {
				this.callParent(arguments);
				esq.addColumn("GPSN");
				esq.addColumn("GPSE");
			}
		}
	};
});


