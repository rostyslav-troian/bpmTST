Terrasoft.configuration.Structures["IntermediateCatchTimerPropertiesPage"] = {innerHierarchyStack: ["IntermediateCatchTimerPropertiesPage"], structureParent: "ProcessFlowElementPropertiesPage"};
define('IntermediateCatchTimerPropertiesPageStructure', ['IntermediateCatchTimerPropertiesPageResources'], function(resources) {return {schemaUId:'e3ff11ae-7705-4625-843d-4f87e7b9c47a',schemaCaption: "IntermediateCatchTimerPropertiesPage", parentSchemaName: "ProcessFlowElementPropertiesPage", schemaName:'IntermediateCatchTimerPropertiesPage',parentSchemaUId:'0f347363-31e5-4222-a82e-dcfeda34cbb6',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: ProcessFlowElementPropertiesPage
 */
define("IntermediateCatchTimerPropertiesPage", ["terrasoft", "IntermediateCatchTimerPropertiesPageResources"],
	function(Terrasoft) {
		return {
			messages: {},
			mixins: {},
			attributes: {
				/**
				 * Start offset parameter.
				 */
				"StartOffset": {
					"dataValueType": this.Terrasoft.DataValueType.MAPPING,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true,
					"doAutoSave": true,
					"initMethod": "initProperty"
				}
			},
			methods: {},
			diff: /**SCHEMA_DIFF*/ [{
				"operation": "insert",
				"name": "UserTaskContainer",
				"propertyName": "items",
				"parentName": "EditorsContainer",
				"className": "Terrasoft.GridLayoutEdit",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			}, {
				"operation": "insert",
				"name": "TitleTaskContainer",
				"propertyName": "items",
				"parentName": "UserTaskContainer",
				"className": "Terrasoft.GridLayoutEdit",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			}, {
				"operation": "insert",
				"name": "RecommendationLabel",
				"parentName": "TitleTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Resources.Strings.RecommendationCaption"
					},
					"classes": {
						"labelClass": ["t-title-label-proc"]
					},
					"styles": {
						"labelStyle": {
							"color": "#F79552"
						}
					}
				}
			}, {
				"operation": "insert",
				"name": "StartOffset",
				"parentName": "TitleTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"wrapClass": ["no-caption-control"]
				}
			}, {
				"operation": "merge",
				"name": "useBackgroundMode",
				"values": {
					"enabled": false
				}
			}] /**SCHEMA_DIFF*/
		};
	}
);


