Terrasoft.configuration.Structures["SysAdminUnitFuncRolePageV2"] = {innerHierarchyStack: ["SysAdminUnitFuncRolePageV2"], structureParent: "SysAdminUnitRoleBasePageV2"};
define('SysAdminUnitFuncRolePageV2Structure', ['SysAdminUnitFuncRolePageV2Resources'], function(resources) {return {schemaUId:'21fcfcc2-669a-49ce-b1cd-d0c90ff05afb',schemaCaption: "Section edit page schema - \"Functional roles\"", parentSchemaName: "SysAdminUnitRoleBasePageV2", schemaName:'SysAdminUnitFuncRolePageV2',parentSchemaUId:'c98b8faa-d678-4c2c-a043-efe41d5e1ddf',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysAdminUnitFuncRolePageV2", ["SysAdminUnitFuncRolePageV2Resources"],
	function(resources) {
		return {
			details: /**SCHEMA_DETAILS*/{
				SysFuncRoleInOrgRoleDetailV2: {
					filter: {
						detailColumn: "FuncRole"
					},
					captionName: "SysFuncRoleInOrgRoleDetailCaption"
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 0,
					"name": "OrgRolesTab",
					"values": {
						"caption": { "bindTo": "Resources.Strings.RolesTabCaption" },
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 1,
					"name": "UsersTab",
					"values": {
						"caption": { "bindTo": "Resources.Strings.UsersTabCaption" },
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "UsersTab",
					"propertyName": "items",
					"name": "UsersDetailV2",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 2,
					"name": "IPRangeTab",
					"values": {
						"caption": {"bindTo": "Resources.Strings.IPRangeTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "OrgRolesTab",
					"propertyName": "items",
					"name": "SysFuncRoleInOrgRoleDetailV2",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "IPRangeTab",
					"propertyName": "items",
					"name": "SysAdminUnitIPRangeDetailV2",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/,
			methods: {
				/**
				 * ########## ######### ########
				 * @protected
				 * @virtual
				 */
				getHeader: function() {
					return this.get("Resources.Strings.HeaderCaption");
				}
			}
		};
	});


