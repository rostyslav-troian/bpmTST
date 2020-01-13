Terrasoft.configuration.Structures["SspEntitySchemaAccessListEditPage"] = {innerHierarchyStack: ["SspEntitySchemaAccessListEditPage"], structureParent: "BaseLookupPage"};
define('SspEntitySchemaAccessListEditPageStructure', ['SspEntitySchemaAccessListEditPageResources'], function(resources) {return {schemaUId:'38c44e51-7354-4588-b1c2-820a22dbd86b',schemaCaption: "SspEntitySchemaAccessListEditPage", parentSchemaName: "BaseLookupPage", schemaName:'SspEntitySchemaAccessListEditPage',parentSchemaUId:'0a254ad1-c2fb-43ae-ac4d-63932be0835b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SspEntitySchemaAccessListEditPage", [],
	function() {
		return {
			entitySchemaName: "VwSysSSPEntitySchemaAccessList",
			attributes: {
				"SysSchema": {
					lookupListConfig: {
						filter: function() {
							return this.getSysSchemaFilter();
						}
					}
				},
				"Name": {
					isRequired: false
				}
			},
			methods: {

				/**
				 * Returns filter for SysSchema column.
				 * @returns {Terrasoft.FilterGroup} SysSchema column filter.
				 */
				getSysSchemaFilter: function () {
					const filters = this.Ext.create("Terrasoft.FilterGroup");
					filters.add("notExtendParent", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL,
						"ExtendParent",
						0
					));
					filters.add("entitySchemaManager", Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL,
						"ManagerName",
						"EntitySchemaManager"
					));
					filters.add("notExistingSysSchemaFilter",
						this.Terrasoft.createColumnIsNullFilter(
							">[VwSysSSPEntitySchemaAccessList:EntitySchemaUId:UId].EntitySchemaUId"));
					return filters;
				}
			},
			diff: []
		};
	});


