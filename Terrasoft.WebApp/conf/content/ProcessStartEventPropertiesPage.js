Terrasoft.configuration.Structures["ProcessStartEventPropertiesPage"] = {innerHierarchyStack: ["ProcessStartEventPropertiesPage"], structureParent: "ProcessBaseEventPropertiesPage"};
define('ProcessStartEventPropertiesPageStructure', ['ProcessStartEventPropertiesPageResources'], function(resources) {return {schemaUId:'94a06f89-f518-4f8c-9bd7-c4c3de0d421d',schemaCaption: "The page for editing the properties of the start event", parentSchemaName: "ProcessBaseEventPropertiesPage", schemaName:'ProcessStartEventPropertiesPage',parentSchemaUId:'88673ae5-a4ec-4f99-9804-da51b9878832',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * ProcessBaseEventPropertiesPage edit page schema.
 * Parent: ProcessBaseEventPropertiesPage => ProcessFlowElementPropertiesPage.
 */
define("ProcessStartEventPropertiesPage", ["ProcessStartEventPropertiesPageResources"], function(resources) {
	return {
			messages: {},
			attributes: {},
			methods: {},
			diff: /**SCHEMA_DIFF*/[{
				"operation": "insert",
				"name": "BackgroundProcessModeControlGroup",
				"parentName": "EditorsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "BackgroundProcessModeControlGroup",
				"propertyName": "items",
				"name": "useBackgroundMode",
				"values": {
					"hint": resources.localizableStrings.StartEventUseBackgroundModeHint,
					"wrapClass": ["t-checkbox-control"],
					"visible": {
						"bindTo": "canUseBackgroundProcessMode"
					},
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					}
				}
			}]/**SCHEMA_DIFF*/
	};
});


