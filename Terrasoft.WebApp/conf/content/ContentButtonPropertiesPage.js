Terrasoft.configuration.Structures["ContentButtonPropertiesPage"] = {innerHierarchyStack: ["ContentButtonPropertiesPage"], structureParent: "ContentItemPropertiesPage"};
define('ContentButtonPropertiesPageStructure', ['ContentButtonPropertiesPageResources'], function(resources) {return {schemaUId:'47606d53-316a-4020-84f9-eded4ec28c57',schemaCaption: "ContentButtonPropertiesPage", parentSchemaName: "ContentItemPropertiesPage", schemaName:'ContentButtonPropertiesPage',parentSchemaUId:'fe424518-8ce5-46a4-a265-ea8ff4ecd12d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: ContentItemPropertiesPage
 */
define("ContentButtonPropertiesPage", ["css!ContentItemStylesPageCSS",
		"InlineTextEditViewGenerator"], function() {
	return {
		modules: {
			AlignPropertyModulePage: {
				moduleId: "AlignPropertyModulePage",
				moduleName: "ConfigurationModuleV2",
				config: {
					schemaName: "AlignPropertyModule",
					isSchemaConfigInitialized: true,
					useHistoryState: false,
					parameters: {
						viewModelConfig: {
							Config: {
								attributeValue: "Config"
							},
							PropertyName: "Align"
						}
					}
				}
			},
			MarginPropertyModulePage: {
				moduleId: "MarginPropertyModulePage",
				moduleName: "ConfigurationModuleV2",
				config: {
					schemaName: "PaddingPropertyModule",
					isSchemaConfigInitialized: true,
					useHistoryState: false,
					parameters: {
						viewModelConfig: {
							Config: {
								attributeValue: "Config"
							},
							PropertyName: "Padding"
						}
					}
				}
			}
		},
		attributes: {
			Link: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onLinkChanged"
			},

			Width: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "onWidthChanged"
			},

			Height: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onHeightChanged"
			}
		},
		properties: {
			workStyles: ["height", "width"]
		},
		methods: {

			/**
			 * @private
			 */
			_onLinkChanged: function(model, link) {
				this.$Config.Link = link;
				this.save(null, "Link");
			},

			/**
			 * @private
			 */
			_onHeightChanged: function(model, height) {
				var styles = this.$Config.Styles;
				this.onSizeChanged("height", height, styles, "Styles");
			},

			/**
			 * @private
			 */
			_positiveNumberValidator: function(value) {
				return Terrasoft.validateNumberRange(0, Terrasoft.DataValueTypeRange.INTEGER.maxValue, value);
			},

			/**
			 * Initializes button properties.
			 * @protected
			 * @param {Object} styles Styles object.
			 */
			initButton: function(styles) {
				this.initWidth(styles);
				this.initHeight(styles);
			},

			/**
			 * @inheritdoc ContentItemPropertiesPage#onContentItemConfigChanged
			 * @overridden
			 */
			onContentItemConfigChanged: function(config) {
				this.callParent(arguments);
				if (config) {
					this.$Styles = JSON.stringify(config.Styles || {}, null, "\t");
					this.$Link = Ext.isEmpty(this.$Config.Link) ? null : this.$Config.Link;
					this.initButton(this.$Config.Styles);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
			 * @overridden
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("Width", this._positiveNumberValidator);
				this.addColumnValidator("Height", this._positiveNumberValidator);
			},

			/**
			 * Handler for margin property changed event.
			 * @protected
			 * @param {String} param Name of property to change.
			 * @param {Number} value New size param value.
			 * @param {Object} styles Styles object.
			 * @param {String} stylesAttr New width value.
			 */
			onSizeChanged: function(param, value, styles, stylesAttr) {
				styles[param] = value === null ? "auto" : value + "px";
				this.set(stylesAttr, JSON.stringify(styles, null, "\t"));
				this.save(null, stylesAttr);
			},

			/**
			 * Handler for margin property changed event.
			 * @protected
			 * @param {Object} model Changed view model.
			 * @param {Number} width New width value.
			 */
			onWidthChanged: function(model, width) {
				var styles = this.$Config.Styles;
				this.onSizeChanged("width", width, styles, "Styles");
			},

			/**
			 * Initializes width property for button.
			 * @protected
			 * @param {Object} styles Styles object.
			 */
			initWidth: function(styles) {
				var width = this.getSizeFromStyle("width", styles);
				this.$Width = width !== "auto" && parseInt(width, 10) >= 0 ? parseInt(width, 10) : null;
			},

			/**
			 * Initializes height property for button.
			 * @protected
			 * @param {Object} styles Styles object.
			 */
			initHeight: function(styles) {
				var height = this.getSizeFromStyle("height", styles);
				this.$Height = height !== "auto" && parseInt(height, 10) >= 0 ? parseInt(height, 10) : null;
			},

			/**
			 * Gets value for size parameter from styles object.
			 * @param {Object} param Parameter name.
			 * @param {Object} styles Styles object.
			 */
			getSizeFromStyle: function(param, styles) {
				const value = styles.hasOwnProperty(param) ? styles[param] : "auto";
				if (styles[param] !== value) {
					styles[param] = value;
				}
				return value;
			}
		},
		diff: [

			// region Diff: Common

			{
				"operation": "insert",
				"name": "ContentButtonPropertiesContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["content-styles-editor-wrapper", "content-button-properties-page"]
				}
			},
			{
				"operation": "insert",
				"name": "ButtonGroup",
				"parentName": "ContentButtonPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": []
				},
				"index": 0
			},
			{
				"operation": "insert",
				"parentName": "ButtonGroup",
				"name": "ButtonContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["image-properties-wrapper"],
					"visible": {
						"bindTo": "Config",
						"bindConfig": {
							"converter": "toBoolean"
						}
					}
				}
			},

			//endregion

			// region Diff: Link

			{
				"operation": "insert",
				"parentName": "ButtonContainer",
				"name": "ImageLinkGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.LinkToOpen"
				}
			},
			{
				"operation": "insert",
				"parentName": "ImageLinkGroup",
				"propertyName": "items",
				"name": "Link",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$Link",
					"markerValue": "Link",
					"wrapClass": ["style-input link"],
					"labelConfig": {"visible": false},
					"controlConfig": {"placeholder": ""}
				}
			},

			//endregion

			// region Diff: Size

			{
				"operation": "insert",
				"parentName": "ButtonContainer",
				"name": "ImageSizeGroupWrap",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["title-group-caption-container"]
				}
			},
			{
				"operation": "insert",
				"parentName": "ImageSizeGroupWrap",
				"name": "ImageSizeGroupTitleWrap",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["title-group-caption-wrap"]
				}
			},
			{
				"operation": "insert",
				"name": "ButtonSizeLabel",
				"parentName": "ImageSizeGroupTitleWrap",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": "$Resources.Strings.SizeLabel",
					"classes": {
						"labelClass": ["ts-controlgroup-caption-wrap", "title-group-caption"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ImageSizeGroupWrap",
				"name": "ImageSizeGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper", "image-size-group"]
				}
			},
			{
				"operation": "insert",
				"parentName": "ImageSizeGroup",
				"propertyName": "items",
				"name": "Width",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$Width",
					"markerValue": "Width",
					"wrapClass": ["style-input"],
					"controlConfig": {"placeholder": "$Resources.Strings.PlaceholderAutoText"},
					"labelConfig": {
						"caption": "$Resources.Strings.Width"
					},
					"classes": {"wrapClassName": ["show-placeholder"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "ImageSizeGroup",
				"propertyName": "items",
				"name": "Height",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$Height",
					"markerValue": "Height",
					"wrapClass": ["style-input"],
					"controlConfig": {"placeholder": "$Resources.Strings.PlaceholderAutoText"},
					"labelConfig": {
						"caption": "$Resources.Strings.Height"
					},
					"classes": {"wrapClassName": ["show-placeholder"]}
				}
			},

			//endregion

			// region Diff: Align

			{
				"operation": "insert",
				"parentName": "ButtonContainer",
				"name": "AlignGroupWrap",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["title-group-caption-container"]
				}
			},
			{
				"operation": "insert",
				"parentName": "AlignGroupWrap",
				"name": "AlignGroupTitleWrap",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["title-group-caption-wrap"]
				}
			},
			{
				"operation": "insert",
				"name": "AlignWrapLabel",
				"parentName": "AlignGroupTitleWrap",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": "$Resources.Strings.Align",
					"classes": {
						"labelClass": ["ts-controlgroup-caption-wrap", "title-group-caption"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "AlignGroupWrap",
				"name": "AlignWrapContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper"]
				}
			},
			{
				"operation": "insert",
				"name": "AlignGroup",
				"parentName": "AlignWrapContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"wrapClass": ["group-sub-caption"],
					"items": [],
					"caption": "$Resources.Strings.HorizontalAlign"
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
				"name": "AlignPropertyModulePage",
				"parentName": "AlignContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE
				}
			},

			//endregion

			// region Diff: Margin

			{
				"operation": "insert",
				"name": "OuterPaddingGroup",
				"parentName": "ButtonContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.Margin",
					"wrapClass": ["padding-control-group"]
				}
			},
			{
				"operation": "insert",
				"name": "MarginPropertyModulePage",
				"parentName": "OuterPaddingGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE,
					"markerValue": "OuterPadding"
				}
			}

			// endregion
		]
	};
});


