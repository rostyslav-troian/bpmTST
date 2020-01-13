Terrasoft.configuration.Structures["DayOffsDetailEditPage"] = {innerHierarchyStack: ["DayOffsDetailEditPage"], structureParent: "BaseModulePageV2"};
define('DayOffsDetailEditPageStructure', ['DayOffsDetailEditPageResources'], function(resources) {return {schemaUId:'9ac45cde-3453-47d7-bc8b-8dcc5a865101',schemaCaption: "DayOffsDetailEditPage", parentSchemaName: "BaseModulePageV2", schemaName:'DayOffsDetailEditPage',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DayOffsDetailEditPage", ["DayOffsDetailEditPageResources"],
		function(resources) {
			return {
				entitySchemaName: "DayOff",
				attributes: {
					"Date": {
						"columnPath": "Date",
						"dataValueType": this.Terrasoft.DataValueType.DATE,
						"caption": resources.localizableStrings.DateCaption,
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
				methods: {
					/**
					 * Sets attribute DayType.NonWorking when DayType changes
					 * @private
					 */
					onDayTypeChanged: function() {
						if(this.get("DayType")) {
							var nonWorking = this.get("DayType").NonWorking;
							this.set("DayType.NonWorking", nonWorking);
						}
					}
				}
			};
		});


