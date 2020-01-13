Terrasoft.configuration.Structures["VerticalAlignPropertyModule"] = {innerHierarchyStack: ["VerticalAlignPropertyModule"], structureParent: "BaseStylePropertyModule"};
define('VerticalAlignPropertyModuleStructure', ['VerticalAlignPropertyModuleResources'], function(resources) {return {schemaUId:'210b4d58-54de-472f-824e-5c190b8ace4a',schemaCaption: "VerticalAlignPropertyModule", parentSchemaName: "BaseStylePropertyModule", schemaName:'VerticalAlignPropertyModule',parentSchemaUId:'a3de87c1-5288-435f-b570-3211402a5eea',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 define("VerticalAlignPropertyModule", function() {
	return {
		attributes: {
			/**
			 * Vertical align value.
			 */
			VerticalAlign: {
				dataValueType: Terrasoft.core.enums.DataValueType.STRING,
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "save"
			}
		},
		properties: {
			/**
			 * Array of applicable style attributes.
			 */
			workStyles: ["vertical-align"]
		},
		methods: {
			/**
			 * @private
			 */
			_initVerticalAlign: function() {
				var propertyValue = this.$Config[this.$PropertyName];
				var value = Ext.isObject(propertyValue) ? propertyValue["vertical-align"] : propertyValue;
				this.$VerticalAlign = value || Terrasoft.Valign.TOP;
			},

			/**
			 * @inheritdoc BaseStylePropertyModule#getPropertyValue
			 * @override
			 */
			getPropertyValue: function() {
				return Ext.isObject(this.$Config[this.$PropertyName])
					? { "vertical-align": this.$VerticalAlign }
					: this.$VerticalAlign;
			},

			/**
			 * @inheritdoc BaseStylePropertyModule#init
			 * @override
			 */
			initProperty: function() {
				this.callParent();
				this._initVerticalAlign();
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "VerticalAlign",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
					"value": "$VerticalAlign",
					"wrapClass": ["sheet-position-control-group-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "TopAlign",
				"parentName": "VerticalAlign",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"labelConfig": {"visible": false},
					"markerValue": "TopAlign",
					"value": Terrasoft.Valign.TOP,
					"classes": {
						"wrapClass": ["block-valign block-valign-top"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "MiddleAlign",
				"parentName": "VerticalAlign",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"labelConfig": {"visible": false},
					"markerValue": "MiddleAlign",
					"value": Terrasoft.Valign.MIDDLE,
					"classes": {
						"wrapClass": ["block-valign block-valign-middle"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "BottomAlign",
				"parentName": "VerticalAlign",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"labelConfig": {"visible": false},
					"markerValue": "BottomAlign",
					"value": Terrasoft.Valign.BOTTOM,
					"classes": {
						"wrapClass": ["block-valign block-valign-bottom"]
					}
				}
			}
		]
	};
});


