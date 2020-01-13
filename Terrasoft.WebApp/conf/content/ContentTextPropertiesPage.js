Terrasoft.configuration.Structures["ContentTextPropertiesPage"] = {innerHierarchyStack: ["ContentTextPropertiesPage"], structureParent: "ContentItemPropertiesPage"};
define('ContentTextPropertiesPageStructure', ['ContentTextPropertiesPageResources'], function(resources) {return {schemaUId:'a3334c94-40c9-4a64-b75f-67dcfd1e205a',schemaCaption: "ContentTextPropertiesPage", parentSchemaName: "ContentItemPropertiesPage", schemaName:'ContentTextPropertiesPage',parentSchemaUId:'fe424518-8ce5-46a4-a265-ea8ff4ecd12d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContentTextPropertiesPage", ["css!ContentItemStylesPageCSS"], function() {
	return {
		attributes: {

			/**
			 * Text line height.
			 */
			LineHeight: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onLineHeightChanged"
			},

			/**
			 * Text element width.
			 */
			Width: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onTextWidthChanged"
			},

			/**
			 * Text element height.
			 */
			Height: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onTextHeightChanged"
			},

			/**
			 * Text element align in block.
			 */
			Align: {
				dataValueType: Terrasoft.core.enums.DataValueType.STRING,
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				value: Terrasoft.Align.LEFT,
				onChange: "_onAlignChanged"
			}

		},
		properties: {
			workStyles: ["height", "width", "line-height"]
		},
		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			_onLineHeightChanged: function(model, lineHeight) {
				if (this.isChanged(this.$Config.Styles["line-height"] + "px", this.$LineHeight)) {
					if (lineHeight) {
						Ext.apply(this.$Config.Styles, {
							"line-height": lineHeight + "px"
						});
					} else {
						delete this.$Config.Styles["line-height"];
					}
					this.save();
				}
			},

			/**
			 * @private
			 */
			_onTextWidthChanged: function(model, width) {
				if (this.isChanged(this.$Config.Styles.width + "px", this.$Width)) {
					if (!Ext.isEmpty(width)) {
						Ext.apply(this.$Config.Styles, {
							"width": width + "px"
						});
					} else {
						delete this.$Config.Styles.width;
					}
					this.save();
				}
			},

			/**
			 * @private
			 */
			_onTextHeightChanged: function(model, height) {
				if (this.isChanged(this.$Config.Styles.height + "px", this.$Height)) {
					if (!Ext.isEmpty(height)) {
						Ext.apply(this.$Config.Styles, {
							"height": height + "px"
						});
					} else {
						delete this.$Config.Styles.height;
					}
					this.save();
				}
			},

			/**
			 * @private
			 */
			_onAlignChanged: function(model, align) {
				this.$Config.Align = align;
				this.save();
			},

			//endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
			 * @override
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("LineHeight", this.positiveNumberValidator);
				this.addColumnValidator("Width", this.positiveNumberValidator);
				this.addColumnValidator("Height", this.positiveNumberValidator);
			},

			/**
			 * @inheritdoc ContentItemPropertiesPage#onContentItemConfigChanged
			 * @overridden
			 */
			onContentItemConfigChanged: function(config) {
				if (config) {
					config.Styles = config.Styles || {};
					this.$LineHeight = config.Styles["line-height"]
						? parseFloat(config.Styles["line-height"])
						: Terrasoft.emptyString;
					this.$Width = config.Styles.width ? parseFloat(config.Styles.width) : Terrasoft.emptyString;
					this.$Height = config.Styles.height ? parseFloat(config.Styles.height) : Terrasoft.emptyString;
					this.$Align = this.$Config.Align;
				}
			}

			//endregion

		},
		diff: [
			{
				"operation": "insert",
				"name": "ContentTextPropertiesContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["content-styles-editor-wrapper"]
				}
			},
			{
				"operation": "insert",
				"name": "TextSizeGroup",
				"parentName": "ContentTextPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.TextOptionsCaption"
				},
				"index": 1
			},
			{
				"operation": "insert",
				"parentName": "TextSizeGroup",
				"name": "LineHeightGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper"]
				}
			},
			{
				"operation": "insert",
				"parentName": "LineHeightGroup",
				"propertyName": "items",
				"name": "LineHeight",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$LineHeight",
					"wrapClass": ["style-input", "line-height-input"],
					"controlConfig": {"placeholder": "$Resources.Strings.PlaceholderAutoText"},
					"labelConfig": {
						"caption": "$Resources.Strings.LineHeightCaption"
					},
					"classes": {"wrapClassName": ["show-placeholder"]},
					"markerValue": "LineHeight"
				}
			},
			{
				"operation": "insert",
				"parentName": "TextSizeGroup",
				"name": "TextSizeGroupContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper"]
				}
			},
			{
				"operation": "insert",
				"parentName": "TextSizeGroupContainer",
				"propertyName": "items",
				"name": "Width",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"wrapClass": ["style-input"],
					"controlConfig": {"placeholder": "$Resources.Strings.PlaceholderAutoText"},
					"labelConfig": {
						"caption": "$Resources.Strings.TextElementWidth"
					},
					"classes": {"wrapClassName": ["show-placeholder"]},
					"markerValue": "TextWidth"
				}
			},
			{
				"operation": "insert",
				"parentName": "TextSizeGroupContainer",
				"propertyName": "items",
				"name": "Height",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"wrapClass": ["style-input"],
					"controlConfig": {"placeholder": "$Resources.Strings.PlaceholderAutoText"},
					"labelConfig": {
						"caption": "$Resources.Strings.TextElementHeight"
					},
					"classes": {"wrapClassName": ["show-placeholder"]},
					"markerValue": "TextHeight"
				}
			},
			{
				"operation": "insert",
				"name": "AlignGroup",
				"parentName": "ContentTextPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.TextElementAlign"
				}
			},
			{
				"operation": "insert",
				"name": "AlignContainer",
				"parentName": "AlignGroup",
				"propertyName": "items",
				"values": {
					"markerValue": "AlignContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["content-builder-align-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Align",
				"parentName": "AlignContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
					"wrapClass": ["sheet-position-control-group-container"],
					"items": [],
					"value": "$Align"
				}
			},
			{
				"operation": "insert",
				"name": "LeftAlign",
				"parentName": "Align",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"markerValue": "Left",
					"value": Terrasoft.Align.LEFT,
					"classes": {
						"wrapClass": ["sheet-align-left"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "CenterAlign",
				"parentName": "Align",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"markerValue": "Center",
					"value": Terrasoft.Align.CENTER,
					"classes": {
						"wrapClass": ["sheet-align-center"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "RightAlign",
				"parentName": "Align",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"markerValue": "Right",
					"value": Terrasoft.Align.RIGHT,
					"classes": {
						"wrapClass": ["sheet-align-right"]
					}
				}
			}
		]
	};
});


