Terrasoft.configuration.Structures["SspSysAdminUnitFuncRolePage"] = {innerHierarchyStack: ["SspSysAdminUnitFuncRolePage"], structureParent: "SysAdminUnitFuncRolePageV2"};
define('SspSysAdminUnitFuncRolePageStructure', ['SspSysAdminUnitFuncRolePageResources'], function(resources) {return {schemaUId:'7df42bbd-68c5-4e4d-a922-84e0f05c4c72',schemaCaption: "Section edit page schema - \"Functional roles on portal\"", parentSchemaName: "SysAdminUnitFuncRolePageV2", schemaName:'SspSysAdminUnitFuncRolePage',parentSchemaUId:'21fcfcc2-669a-49ce-b1cd-d0c90ff05afb',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SspSysAdminUnitFuncRolePage", [],
	function() {
		return {
			entitySchemaName: "VwSysAdminUnit",
			attributes: {
				"SecurityOperationName": {
					"dataValueType": this.Terrasoft.DataValueType.STRING,
					"value": "CanAdministratePortalUsers"
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "IPRangeTab"
				}
			]/**SCHEMA_DIFF*/,
			methods: {}
		};
	});


