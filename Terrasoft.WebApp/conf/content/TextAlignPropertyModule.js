Terrasoft.configuration.Structures["TextAlignPropertyModule"] = {innerHierarchyStack: ["TextAlignPropertyModule"], structureParent: "BaseStylePropertyModule"};
define('TextAlignPropertyModuleStructure', ['TextAlignPropertyModuleResources'], function(resources) {return {schemaUId:'ebeaa0f2-1fd4-4fdd-b317-e23346264c01',schemaCaption: "TextAlignPropertyModule", parentSchemaName: "BaseStylePropertyModule", schemaName:'TextAlignPropertyModule',parentSchemaUId:'a3de87c1-5288-435f-b570-3211402a5eea',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("TextAlignPropertyModule", ["ContentBuilderConstants"], function() {
	return {
		attributes: {
			/**
			 * Align property value.
			 */
			Align: {
				dataValueType: Terrasoft.core.enums.DataValueType.STRING,
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "save"
			}
		},
		properties: {
			/**
			 * Array of applicable style attributes.
			 */
			workStyles: ["text-align"]
		},
		methods: {
			/**
			 * @private
			 */
			_initAlign: function() {
				var propertyValue = this.$Config[this.$PropertyName];
				var value = Ext.isObject(propertyValue) ? propertyValue["text-align"] : propertyValue;
				this.$Align = value || Terrasoft.TextAlign.LEFT;
			},

			/**
			 * @inheritdoc BaseStylePropertyModule#getPropertyValue
			 * @override
			 */
			getPropertyValue: function() {
				return Ext.isObject(this.$Config[this.$PropertyName])
					? { "text-align": this.$Align }
					: this.$Align;
			},

			/**
			 * @inheritdoc BaseStylePropertyModule#init
			 * @override
			 */
			initProperty: function() {
				this.callParent();
				this._initAlign();
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "Align",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
					"value": "$Align",
					"markerValue": "Align",
					"wrapClass": ["sheet-position-control-group-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "LeftAlign",
				"parentName": "Align",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"labelConfig": {"visible": false},
					"markerValue": "Left",
					"value": Terrasoft.TextAlign.LEFT,
					"classes": {
						"wrapClass": ["text-align-left"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "CenterAlign",
				"parentName": "Align",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"labelConfig": {"visible": false},
					"markerValue": "Center",
					"value": Terrasoft.TextAlign.CENTER,
					"classes": {
						"wrapClass": ["text-align-center"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "RightAlign",
				"parentName": "Align",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"labelConfig": {"visible": false},
					"markerValue": "Right",
					"value": Terrasoft.TextAlign.RIGHT,
					"classes": {
						"wrapClass": ["text-align-right"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "JustifyAlign",
				"parentName": "Align",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"labelConfig": {"visible": false},
					"markerValue": "Justify",
					"value": Terrasoft.TextAlign.JUSTIFY,
					"classes": {
						"wrapClass": ["text-align-justify"]
					}
				}
			}
		]
	};
});


