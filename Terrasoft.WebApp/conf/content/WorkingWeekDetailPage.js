Terrasoft.configuration.Structures["WorkingWeekDetailPage"] = {innerHierarchyStack: ["WorkingWeekDetailPage"], structureParent: "BaseModulePageV2"};
define('WorkingWeekDetailPageStructure', ['WorkingWeekDetailPageResources'], function(resources) {return {schemaUId:'16e9ca6c-3bee-4a03-b4fb-e39d85f72df0',schemaCaption: "WorkingWeekDetailPage", parentSchemaName: "BaseModulePageV2", schemaName:'WorkingWeekDetailPage',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("WorkingWeekDetailPage", ["WorkingWeekDetailPageResources"],
		function(resources) {
			return {
				entitySchemaName: "DayInCalendar",
				mixins: {},
				attributes: {
					"DayOfWeek": {
						"columnPath": "DayOfWeek",
						"dataValueType": this.Terrasoft.DataValueType.LOOKUP.GUID,
						"caption": resources.localizableStrings.DayOfWeekCaption,
						"isRequired": true,
						"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN
					},
					"DayType": {
						"columnPath": "DayType",
						"dataValueType": this.Terrasoft.DataValueType.LOOKUP.GUID,
						"caption": resources.localizableStrings.DayTypeCaption,
						"isRequired": true,
						"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
						"lookupListConfig": {
							"columns": ["NonWorking"]
						},
						"dependencies": [
							{
								"columns": ["DayType"],
								"methodName": "onDayTypeChanged"
							}
						]
					},
					"WorkingIntervals": {
						"dataValueType": this.Terrasoft.DataValueType.TEXT,
						"caption": resources.localizableStrings.WorkingIntervalsCaption,
						"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					"DayType.NonWorking": {
						"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
						"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					}
				},
				diff: [],
				methods: {
					/**
					 * Sets attribute DayType.NonWorking when DayType changes
					 * @private
					 */
					onDayTypeChanged: function() {
						var nonWorking = this.get("DayType").NonWorking;
						this.set("DayType.NonWorking", nonWorking);
					}
				}
			};
		});


