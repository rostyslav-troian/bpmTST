Terrasoft.configuration.Structures["IntermediateThrowSignalPropertiesPage"] = {innerHierarchyStack: ["IntermediateThrowSignalPropertiesPage"], structureParent: "ProcessBaseEventPropertiesPage"};
define('IntermediateThrowSignalPropertiesPageStructure', ['IntermediateThrowSignalPropertiesPageResources'], function(resources) {return {schemaUId:'35d3fa69-0f40-40d3-af48-a0c1167434d0',schemaCaption: "IntermediateThrowSignalPropertiesPage", parentSchemaName: "ProcessBaseEventPropertiesPage", schemaName:'IntermediateThrowSignalPropertiesPage',parentSchemaUId:'88673ae5-a4ec-4f99-9804-da51b9878832',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Edit page schema of process element "intermediate throw signal".
 * Parent: ProcessBaseEventPropertiesPage
 */
define("IntermediateThrowSignalPropertiesPage", ["IntermediateThrowSignalPropertiesPageResources"],
	function() {
		return {
			attributes: {
				/**
				 * Property of process element.
				 * @private
				 * @type {String}
				 */
				"Message": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true
				}
			},
			methods: {

				/**
				 * @inheritDoc ProcessSchemaElementEditable#onElementDataLoad
				 * @overridden
				 */
				onElementDataLoad: function(element, callback, scope) {
					this.callParent([element, function() {
						var message = element.getPropertyValue("message");
						if (!this.Ext.isEmpty(message) && message !== "null") {
							this.set("Message", message);
						}
						callback.call(scope);
					}, this]);
				},

				/**
				 * @inheritDoc BaseProcessSchemaElementPropertiesPage#saveValues
				 * @overridden
				 */
				saveValues: function() {
					var element = this.get("ProcessElement");
					element.setPropertyValue("message", this.get("Message"));
					this.callParent(arguments);
				},

				/**
				 * @inheritDoc ProcessFlowElementPropertiesPage#canUseBackgroundProcessMode
				 * @overridden
				 */
				canUseBackgroundProcessMode: function() {
					return false;
				}
			},
			diff: /**SCHEMA_DIFF*/ [{
				"operation": "insert",
				"name": "ControlGroup",
				"parentName": "EditorsContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			}, {
				"operation": "insert",
				"name": "RecommendationLabel",
				"parentName": "ControlGroup",
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
					}
				}
			}, {
				"operation": "insert",
				"name": "Message",
				"parentName": "ControlGroup",
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
					"markerValue": "MessageValue",
					"wrapClass": ["no-caption-control"]
				}
			}, {
				"operation": "insert",
				"name": "useBackgroundMode",
				"parentName": "ControlGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 24
					},
					"visible": {
						"bindTo": "canUseBackgroundProcessMode"
					},
					"wrapClass": ["t-checkbox-control"]
				}
			}] /**SCHEMA_DIFF*/
		};
	}
);


