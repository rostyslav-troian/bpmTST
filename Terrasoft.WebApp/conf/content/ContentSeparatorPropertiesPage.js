Terrasoft.configuration.Structures["ContentSeparatorPropertiesPage"] = {innerHierarchyStack: ["ContentSeparatorPropertiesPage"], structureParent: "ContentItemPropertiesPage"};
define('ContentSeparatorPropertiesPageStructure', ['ContentSeparatorPropertiesPageResources'], function(resources) {return {schemaUId:'9287bfee-0680-4de6-8701-f2471f48f945',schemaCaption: "ContentSeparatorPropertiesPage", parentSchemaName: "ContentItemPropertiesPage", schemaName:'ContentSeparatorPropertiesPage',parentSchemaUId:'fe424518-8ce5-46a4-a265-ea8ff4ecd12d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContentSeparatorPropertiesPage", [], function() {
	return {
		attributes: {

			/**
			 * Separator thickness.
			 */
			Thickness: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onSeparatorPropertyChange"
			},

			/**
			 * Separator style.
			 */
			Style: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onSeparatorPropertyChange"
			},

			/**
			 * Separator color.
			 */
			Color: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onSeparatorPropertyChange"
			},

			/**
			 * Separator styles list.
			 */
			SeparatorStyleList: {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onSeparatorStyleLookupChanged"
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			_onSeparatorStyleLookupChanged: function(model, lookupValue) {
				this.$Style = lookupValue && lookupValue.value;
			},

			/**
			 * @private
			 */
			_onSeparatorPropertyChange: function() {
				Ext.apply(this.$Config, {
					Color: this.$Color,
					Style: this.$Style,
					Thickness: (this.$Thickness || 0) + "px"
				});
				this.save();
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc ContentItemPropertiesPage#onContentItemConfigChanged
			 * @override
			 */
			onContentItemConfigChanged: function(config) {
				config = Terrasoft.deepClone(config);
				if (Ext.isObject(config)) {
					this.$Thickness = parseFloat(config.Thickness) || 0;
					this.$Color = config.Color || "";
					const style = Ext.String.capitalize(config.Style || "");
					this.$SeparatorStyleList = {
						value: style,
						displayValue: style
					};
				}
			},

			/**
			 * Creates list of supported separator styles.
			 * @protected
			 */
			prepareSeparatorStylesList: function(filter, list) {
				const result = this.Ext.create("Terrasoft.Collection");
				const stylesValues = [
					"Dotted",
					"Dashed",
					"Solid",
					"Double",
					"Groove",
					"Ridge"
				];
				stylesValues.forEach(function(style) {
					result.add(style, {
						value: style,
						displayValue: style
					});
				});
				list.reloadAll(result);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
			 * @override
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("Thickness", Terrasoft.validateNumberRange.bind(this, 0,
					Terrasoft.DataValueTypeRange.INTEGER.maxValue));
			}

			// endregion

		},
		diff: [
			{
				"operation": "insert",
				"name": "ContentSeparatorEditorContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["content-styles-editor-wrapper"]
				}
			},
			{
				"operation": "insert",
				"name": "PropertiesContainer",
				"propertyName": "items",
				"parentName": "ContentSeparatorEditorContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"visible": {
						"bindTo": "Config",
						"bindConfig": {
							"converter": "toBoolean"
						}
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "PropertiesContainer",
				"name": "SeparatorSettingsControlGroup",
				"propertyName": "items",
				"values": {
					"caption": "$Resources.Strings.SeparatorControlGroupLabel",
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"wrapClass": ["separator-settings-control-group"]
				}
			},
			{
				"operation": "insert",
				"name": "SeparatorPropertiesContainer",
				"parentName": "SeparatorSettingsControlGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper", "disable-input-label"]
				}
			},
			{
				"operation": "insert",
				"parentName": "SeparatorPropertiesContainer",
				"propertyName": "items",
				"name": "SeparatorColor",
				"values": {
					"itemType": Terrasoft.ViewItemType.COLOR_BUTTON,
					"value": "$Color",
					"markerValue": "Color",
					"defaultValue": "#cccccc",
					"menuItemClassName": Terrasoft.MenuItemType.COLOR_PICKER,
					"classes": {
						"wrapClasses": ["separator-color-editor"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "SeparatorThicknessImage",
				"parentName": "SeparatorPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["icon-16x16 stroke-width"]
				}
			},
			{
				"operation": "insert",
				"name": "Thickness",
				"parentName": "SeparatorPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"caption": "Thickness",
					"markerValue": "Thickness",
					"wrapClass": ["style-input", "separator-thickness-control"]
				}
			},
			{
				"operation": "insert",
				"name": "SeparatorUnitLabel",
				"parentName": "SeparatorPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": "px",
					"classes": {
						"labelClass": ["visible-label", "width-unit-label"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "SeparatorPropertiesContainer",
				"propertyName": "items",
				"name": "SeparatorStyleList",
				"values": {
					"dataValueType": Terrasoft.DataValueType.ENUM,
					"controlConfig": {
						"className": "Terrasoft.ComboBoxEdit",
						"prepareList": "$prepareSeparatorStylesList"
					},
					"markerValue": "SeparatorStyleList",
					"wrapClass": ["style-input"],
					"caption": "SeparatorStyleList"
				}
			}
		]
	};
});


