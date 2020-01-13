Terrasoft.configuration.Structures["PaddingPropertyModule"] = {innerHierarchyStack: ["PaddingPropertyModule"], structureParent: "BaseStylePropertyModule"};
define('PaddingPropertyModuleStructure', ['PaddingPropertyModuleResources'], function(resources) {return {schemaUId:'4e455d1d-d982-4516-b166-751f389d66ff',schemaCaption: "PaddingPropertyModule", parentSchemaName: "BaseStylePropertyModule", schemaName:'PaddingPropertyModule',parentSchemaUId:'a3de87c1-5288-435f-b570-3211402a5eea',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PaddingPropertyModule", function() {
	return {
		attributes: {
			/**
			 * Padding left.
			 */
			PaddingLeft: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				value: 0,
				onChange: "save"
			},

			/**
			 * Padding top.
			 */
			PaddingTop: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				value: 0,
				onChange: "save"
			},

			/**
			 * Padding right.
			 */
			PaddingRight: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				value: 0,
				onChange: "save"
			},

			/**
			 * Padding bottom.
			 */
			PaddingBottom: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				value: 0,
				onChange: "save"
			}
		},
		properties: {
			/**
			 * Array of applicable style attributes.
			 */
			workStyles: ["padding-top","padding-bottom","padding-left","padding-right"]
		},
		methods: {
			/**
			 * @private
			 */
			_initPadding: function() {
				var styles = this.$Config[this.$PropertyName];
				this.$PaddingLeft = parseFloat(styles["padding-left"]) || 0;
				this.$PaddingTop = parseFloat(styles["padding-top"]) || 0;
				this.$PaddingRight = parseFloat(styles["padding-right"]) || 0;
				this.$PaddingBottom = parseFloat(styles["padding-bottom"]) || 0;
			},

			/**
			 * @inheritdoc BaseStylePropertyModule#getPropertyValue
			 * @override
			 */
			getPropertyValue: function() {
				return {
					"padding-left": (this.$PaddingLeft || 0) + "px",
					"padding-top": (this.$PaddingTop || 0) + "px",
					"padding-right": (this.$PaddingRight || 0) + "px",
					"padding-bottom": (this.$PaddingBottom || 0) + "px"
				};
			},

			/**
			 * @inheritdoc BaseStylePropertyModule#init
			 * @override
			 */
			initProperty: function() {
				this.callParent();
				this._initPadding();
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "PaddingPropertiesLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper", "padding-properties-layout"]
				}
			},
			{
				"operation": "insert",
				"parentName": "PaddingPropertiesLayout",
				"propertyName": "items",
				"name": "PaddingTop",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$PaddingTop",
					"markerValue": "PaddingTop",
					"wrapClass": ["style-input"],
					"labelConfig": {
						"caption": "$Resources.Strings.PaddingTopCaption"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "PaddingPropertiesLayout",
				"propertyName": "items",
				"name": "PaddingRight",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$PaddingRight",
					"markerValue": "PaddingRight",
					"wrapClass": ["style-input"],
					"labelConfig": {
						"caption": "$Resources.Strings.PaddingRightCaption"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "PaddingPropertiesLayout",
				"propertyName": "items",
				"name": "PaddingBottom",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$PaddingBottom",
					"markerValue": "PaddingBottom",
					"wrapClass": ["style-input"],
					"labelConfig": {
						"caption": "$Resources.Strings.PaddingBottomCaption"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "PaddingPropertiesLayout",
				"propertyName": "items",
				"name": "PaddingLeft",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$PaddingLeft",
					"markerValue": "PaddingLeft",
					"wrapClass": ["style-input"],
					"labelConfig": {
						"caption": "$Resources.Strings.PaddingLeftCaption"
					}
				}
			}
		]
	};
});


