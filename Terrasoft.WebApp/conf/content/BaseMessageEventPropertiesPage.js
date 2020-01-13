Terrasoft.configuration.Structures["BaseMessageEventPropertiesPage"] = {innerHierarchyStack: ["BaseMessageEventPropertiesPage"], structureParent: "ProcessBaseEventPropertiesPage"};
define('BaseMessageEventPropertiesPageStructure', ['BaseMessageEventPropertiesPageResources'], function(resources) {return {schemaUId:'c33d568f-a053-4949-a5bf-fda44dbb5992',schemaCaption: "BaseMessageEventPropertiesPage", parentSchemaName: "ProcessBaseEventPropertiesPage", schemaName:'BaseMessageEventPropertiesPage',parentSchemaUId:'88673ae5-a4ec-4f99-9804-da51b9878832',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Base edit page schema of process element "message".
 * Parent: ProcessBaseEventPropertiesPage
 */
define("BaseMessageEventPropertiesPage", ["BaseMessageEventPropertiesPageResources"],
	function() {
		return {
			messages: {},
			attributes: {
				/**
				 * Property of process element.
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
				}
			},
			diff: /**SCHEMA_DIFF*/ [{
				"operation": "insert",
				"name": "ControlGroup",
				"parentName": "EditorsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
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
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": { "bindTo": "Resources.Strings.RecommendationCaption" },
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
				"name": "BackgroundProcessModeControlGroup",
				"parentName": "EditorsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			}, {
				"operation": "insert",
				"parentName": "BackgroundProcessModeControlGroup",
				"propertyName": "items",
				"name": "useBackgroundMode",
				"values": {
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
			}] /**SCHEMA_DIFF*/
		};
	}
);


