Terrasoft.configuration.Structures["SspSysAdminUnitPage"] = {innerHierarchyStack: ["SspSysAdminUnitPage"], structureParent: "SysAdminUnitPageV2"};
define('SspSysAdminUnitPageStructure', ['SspSysAdminUnitPageResources'], function(resources) {return {schemaUId:'d25a945f-6714-4b71-8ba5-7ab7a3fad425',schemaCaption: "Section edit page schema - Organizational roles on portal", parentSchemaName: "SysAdminUnitPageV2", schemaName:'SspSysAdminUnitPage',parentSchemaUId:'e05db6f4-f0f0-4ab8-942a-030694d8669d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SspSysAdminUnitPage", [],
	function() {
		return {
			entitySchemaName: "VwSysAdminUnit",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "IPRangeTab"
				}
			]/**SCHEMA_DIFF*/,
			attributes: {
				"SecurityOperationName": {
					"dataValueType": this.Terrasoft.DataValueType.STRING,
					"value": "CanAdministratePortalUsers"
				}
			},
			methods: {}
		};
	});


