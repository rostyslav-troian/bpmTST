Terrasoft.configuration.Structures["FontFamilyPropertyModule"] = {innerHierarchyStack: ["FontFamilyPropertyModule"], structureParent: "BaseStylePropertyModule"};
define('FontFamilyPropertyModuleStructure', ['FontFamilyPropertyModuleResources'], function(resources) {return {schemaUId:'4b35ec66-4012-4fcc-b028-98402d0ddae8',schemaCaption: "FontFamilyPropertyModule", parentSchemaName: "BaseStylePropertyModule", schemaName:'FontFamilyPropertyModule',parentSchemaUId:'a3de87c1-5288-435f-b570-3211402a5eea',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FontFamilyPropertyModule", ["LookupUtilities"], function(LookupUtilities) {
	return {
		attributes: {
			/**
			 * Font family.
			 */
			FontFamily: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "save"
			}
		},
		properties: {
			/**
			 * Array of applicable style attributes.
			 */
			workStyles: ["font-family"]
		},
		methods: {
			/**
			 * @private
			 */
			_initFontFamily: function() {
				var styles = this.$Config[this.$PropertyName];
				this.$FontFamily = styles["font-family"];
			},

			/**
			 * Gets ContactFolder lookup config
			 * @protected
			 * @return {object}
			 */
			getFontLookupConfig: function() {
				var config = {
					entitySchemaName: "ContentBuilderFontSet",
					columns: ["Name", "Fonts"],
					hideActions: true,
					settingsButtonVisible: false,
					multiSelect: false
				};
				return config;
			},

			onSelectFontClick: function() {
				var config = this.getFontLookupConfig();
				LookupUtilities.Open(this.sandbox, config, function(args) {
					var collection = args.selectedRows;
					if (collection.getCount() > 0) {
						var selectedItem = collection.getItems()[0];
						this.$FontFamily = selectedItem.Fonts;
					}
				}, this, null, false, false);
			},

			/**
			 * @inheritdoc BaseStylePropertyModule#getPropertyValue
			 * @override
			 */
			getPropertyValue: function() {
				var result = {};
				if (this.$FontFamily) {
					result["font-family"] = this.$FontFamily;
				}
				return result;

			},

			/**
			 * @inheritdoc BaseStylePropertyModule#init
			 * @override
			 */
			initProperty: function() {
				this.callParent();
				this._initFontFamily();
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "FontFamilyPropertiesLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper"]
				}
			},
			{
				"operation": "insert",
				"name": "FontFamily",
				"parentName": "FontFamilyPropertiesLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.STRING,
					"markerValue": "FontFamily",
					"value": "$FontFamily",
					"labelConfig": {
						"visible": false
					},
					"enabled": false,
					"wrapClass": ["font-input", "style-input", "control-width-15"]
				}
			},
			{
				"operation": "insert",
				"name": "FontFamilyButton",
				"parentName": "FontFamilyPropertiesLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"imageConfig": "$Resources.Images.LookupIcon",
					"click": "$onSelectFontClick",
					"classes": {
						"wrapperClass": ["lookup-button"],
						"imageClass": ["lookup-image"]
					}

				}
			}
		]
	};
});


