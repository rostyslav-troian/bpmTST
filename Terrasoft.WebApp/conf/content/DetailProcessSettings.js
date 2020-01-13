Terrasoft.configuration.Structures["DetailProcessSettings"] = {innerHierarchyStack: ["DetailProcessSettings"], structureParent: "BaseProcessSettings"};
define('DetailProcessSettingsStructure', ['DetailProcessSettingsResources'], function(resources) {return {schemaUId:'078e4245-6926-4ce2-8852-6c1bfa10c6a3',schemaCaption: "DetailProcessSettings", parentSchemaName: "BaseProcessSettings", schemaName:'DetailProcessSettings',parentSchemaUId:'e2b9f294-c7da-4fb5-a3de-bb53179e38e9',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DetailProcessSettings", ["DetailProcessExecutingDetail"], function() {
	return {
		entitySchemaName: "ProcessInDetails",

		attributes: {
			/**
			 * SysModuleEntityId.
			 */
			"SysDetailEntityId": {
				dataValueType: Terrasoft.DataValueType.GUID,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseProcessSettings#onGetModuleConfigResult
			 * @overridden
			 */
			onGetModuleConfigResult: function(config) {
				var applicationStructureItem = config.applicationStructureItem;
				this.set("SysDetailEntityId", applicationStructureItem.id);
				this.callParent(arguments);
			}
		},
		details: {
			"ProcessExecutingDetail": {
				schemaName: "DetailProcessExecutingDetail",
				entitySchemaName: "ProcessInDetails",
				filter: {
					masterColumn: "SysDetailEntityId",
					detailColumn: "SysDetail"
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


