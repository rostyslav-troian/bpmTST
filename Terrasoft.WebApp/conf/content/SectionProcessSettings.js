Terrasoft.configuration.Structures["SectionProcessSettings"] = {innerHierarchyStack: ["SectionProcessSettings"], structureParent: "BaseProcessSettings"};
define('SectionProcessSettingsStructure', ['SectionProcessSettingsResources'], function(resources) {return {schemaUId:'1589ab0c-5cb8-47a9-ab94-15b27bd5e0ef',schemaCaption: "SectionProcessSettings", parentSchemaName: "BaseProcessSettings", schemaName:'SectionProcessSettings',parentSchemaUId:'e2b9f294-c7da-4fb5-a3de-bb53179e38e9',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseProcessSettings
 */
define("SectionProcessSettings", ["SectionProcessExecutingDetail"], function() {
	return {
		entitySchemaName: "ProcessInModules",
		attributes: {
			"SysModuleEntityId": {
				dataValueType: Terrasoft.DataValueType.GUID,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseProcessSettings#onGetModuleConfigResult
			 * @override
			 */
			onGetModuleConfigResult: function(config) {
				var applicationStructureItem = config.applicationStructureItem;
				this.set("SysModuleEntityId", applicationStructureItem.id);
				this.callParent(arguments);
			}
		},
		details: {
			"ProcessExecutingDetail": {
				schemaName: "SectionProcessExecutingDetail",
				entitySchemaName: "ProcessInModules",
				filter: {
					masterColumn: "SysModuleEntityId",
					detailColumn: "SysModule"
				}
			}
		},
		diff: [
			{
				"operation": "insert",
				"parentName": "BusinessProcessSettings",
				"propertyName": "items",
				"name": "ProcessExecutingDetail",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL
				}
			}
		]
	};
});


