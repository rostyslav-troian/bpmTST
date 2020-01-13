Terrasoft.configuration.Structures["FontPropertyModule"] = {innerHierarchyStack: ["FontPropertyModule"], structureParent: "BaseStylePropertyModule"};
define('FontPropertyModuleStructure', ['FontPropertyModuleResources'], function(resources) {return {schemaUId:'e1df9300-512d-4034-862e-7a112477fbce',schemaCaption: "FontPropertyModule", parentSchemaName: "BaseStylePropertyModule", schemaName:'FontPropertyModule',parentSchemaUId:'a3de87c1-5288-435f-b570-3211402a5eea',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 define("FontPropertyModule", function() {
	return {
		attributes: {
			/**
			 * Font size.
			 */
			FontSize: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				value: 13,
				onChange: "_onFontSizeChanged"
			},
			/**
			 * Color value.
			 */
			Color: {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "save"
			},
			/**
			 * Line height.
			 */
			LineHeight: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				value: 22,
				onChange: "save"
			},
			/**
			 * Flag indicates does line height available.
			 */
			UseLineHeight: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},
			/**
			 * Letter spacing.
			 */
			LetterSpacing: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				value: 0,
				onChange: "save"
			},
			/**
			 * Flag indicates does letter spacing available.
			 */
			UseLetterSpacing: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			}
		},
		properties: {
			/**
			 * Array of applicable style attributes.
			 */
			workStyles: ["font-size","color","line-height","letter-spacing"]
		},
		methods: {
			/**
			 * @private
			 */
			_initFont: function() {
				var styles = this.$Config[this.$PropertyName];
				this.$Color = styles.color || "#000000";
				this.$FontSize = parseFloat(styles["font-size"]) || 13;
				if (this.$UseLineHeight) {
					this.$LineHeight = parseFloat(styles["line-height"]) || 22;
				}
				if (this.$UseLetterSpacing) {
					this.$LetterSpacing = parseFloat(styles["letter-spacing"]) || 0;
				}
			},

			/**
			 * @private
			 */
			_onFontSizeChanged: function() {
				this.$LineHeight = this.$FontSize && this.$LineHeight < this.$FontSize
					? this.$FontSize
					: this.$LineHeight;
				this.save();
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
			 * @override
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("FontSize", this.fontSizeValidator);
				this.addColumnValidator("LineHeight", this.lineHeightValidator);
				this.addColumnValidator("LetterSpacing", this.letterSpacingValidator);
			},

			/**
			 * Validates font size.
			 * @protected
			 */
			fontSizeValidator: function(value) {
				return Terrasoft.validateNumberRange(7, 200, value);
			},

			/**
			 * Validates line height.
			 * @protected
			 */
			lineHeightValidator: function(value) {
				var minValue = Math.max(this.$FontSize, 7);
				return !this.$UseLineHeight
					? { isValid: true }
					: Terrasoft.validateNumberRange(minValue, 250, value);
			},

			/**
			 * Validates letter spacing.
			 * @protected
			 */
			letterSpacingValidator: function(value) {
				return Ext.isEmpty(value) || !this.$UseLetterSpacing
					? { isValid: true }
					: Terrasoft.validateNumberRange(0, 30, value);
			},

			/**
			 * @inheritdoc BaseStylePropertyModule#validateConfigValues
			 * @override
			 */
			validateConfigValues: function(callback, scope) {
				var isValid = this.fontSizeValidator(this.$FontSize).isValid
					&& this.lineHeightValidator(this.$LineHeight).isValid
					&& this.letterSpacingValidator(this.$LetterSpacing).isValid;
				Ext.callback(callback, scope, [{valid: isValid}]);
			},

			/**
			 * @inheritdoc BaseStylePropertyModule#getPropertyValue
			 * @override
			 */
			getPropertyValue: function() {
				var result = {
					"font-size": this.$FontSize + "px",
					"color": this.$Color
				};
				if (this.$UseLineHeight) {
					result["line-height"] = this.$LineHeight + "px";
				}
				if (this.$UseLetterSpacing) {
					result["letter-spacing"] = (this.$LetterSpacing || 0) + "px";
				}
				return result;

			},

			/**
			 * @inheritdoc BaseStylePropertyModule#init
			 * @override
			 */
			initProperty: function() {
				this.callParent();
				this._initFont();
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "FontSizePropertiesLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper", "font-properties-layout"]
				}
			},
			{
				"operation": "insert",
				"name": "FontSize",
				"parentName": "FontSizePropertiesLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$FontSize",
					"markerValue": "FontSize",
					"wrapClass": ["style-input"],
					"labelConfig": {
						"caption": "$Resources.Strings.FontSizeCaption"
					}
				}
			},
			{
				"operation": "insert",
				"name": "FontColorPropertiesContainer",
				"parentName": "FontSizePropertiesLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["style-input", "control-width-15"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ColorLabel",
				"parentName": "FontColorPropertiesContainer",
				"propertyName": "items",
				"values": {
					"classes": {
						"labelClass": ["color-label"]
					},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"markerValue": "ColorLabel",
					"caption": "$Resources.Strings.ColorLabelCaption"
				}
			},
			{
				"operation": "insert",
				"name": "Color",
				"parentName": "FontColorPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.COLOR_BUTTON,
					"value": "$Color",
					"defaultValue": "#000001",
					"menuItemClassName": Terrasoft.MenuItemType.COLOR_PICKER
				}
			},
			{
				"operation": "insert",
				"name": "LineHeightPropertiesLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper", "font-properties-layout"]
				}
			},
			{
				"operation": "insert",
				"name": "LineHeight",
				"parentName": "LineHeightPropertiesLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$LineHeight",
					"markerValue": "LineHeight",
					"wrapClass": ["style-input"],
					"visible": "$UseLineHeight",
					"labelConfig": {
						"caption": "$Resources.Strings.LineHeightCaption"
					}
				}
			},
			{
				"operation": "insert",
				"name": "LetterSpacing",
				"parentName": "LineHeightPropertiesLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$LetterSpacing",
					"markerValue": "LetterSpacing",
					"wrapClass": ["style-input"],
					"visible": "$UseLetterSpacing",
					"labelConfig": {
						"caption": "$Resources.Strings.LetterSpacingCaption"
					}
				}
			}]
	};
});


