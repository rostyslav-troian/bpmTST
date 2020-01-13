Terrasoft.configuration.Structures["BackgroundPropertyModule"] = {innerHierarchyStack: ["BackgroundPropertyModule"], structureParent: "BaseStylePropertyModule"};
define('BackgroundPropertyModuleStructure', ['BackgroundPropertyModuleResources'], function(resources) {return {schemaUId:'59644336-341a-4786-921a-8893d75cb98e',schemaCaption: "BackgroundPropertyModule", parentSchemaName: "BaseStylePropertyModule", schemaName:'BackgroundPropertyModule',parentSchemaUId:'a3de87c1-5288-435f-b570-3211402a5eea',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BackgroundPropertyModule", function() {
	return {
		attributes: {
			/**
			 * Image value.
			 */
			Image: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "save"
			},

			/**
			 * Image display value.
			 */
			ImageDisplayValue: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onImageDisplayValueChanged"
			},

			/**
			 * Color value.
			 */
			Color: {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "save"
			},

			/**
			 * Image vertical position value.
			 */
			ImageVerticalPosition: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "save"
			},

			/**
			 * Image horizontal position value.
			 */
			ImageHorizontalPosition: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "save"
			},

			/**
			 * Flag indicates does image change enabled.
			 */
			Enabled: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onEnabledChanged"
			},

			/**
			 * Flag indicates does image for background allowed.
			 */
			UseImage: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},

			/**
			 * Flag indicates does position of background image controllable.
			 */
			UseImagePosition: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},

			/**
			 * Flag indicates does uploaded image for background allowed.
			 */
			UseEmbeddedImage: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			}
		},
		properties: {
			/**
			 * Array of applicable style attributes.
			 */
			workStyles: ["background-color","background-image"]
		},
		methods: {
			/**
			 * @private
			 */
			_onEnabledChanged: function(model, value) {
				if (value && Ext.isEmpty(this.$Color)) {
					this.$Color = "#ffffff";
				}
				this.save();
			},

			/**
			 * @private
			 */
			_onImageDisplayValueChanged: function(model, value) {
				if (!Ext.isEmpty(value) && value !== this.get("Resources.Strings.ImageEmbedded")) {
					this.$Image = value;
				}
				if (Ext.isEmpty(value)) {
					this.$Image = null;
				}
			},

			/**
			 * @private
			 */
			_initImagePosition: function() {
				var styleIndex = this.workStyles.indexOf("background-position");
				if (styleIndex !== -1) {
					this.workStyles.splice(styleIndex, 1);
				}
				if (!this.$UseImagePosition) {
					return;
				}
				this.workStyles.push("background-position");
				var propertyValue = this.$Config[this.$PropertyName];
				if (propertyValue.hasOwnProperty("background-position")) {
					var positions = propertyValue["background-position"].split(" ");
					this.$ImageHorizontalPosition = positions[0];
					this.$ImageVerticalPosition = positions[1];
				} else {
					this.$ImageHorizontalPosition = this.$ImageVerticalPosition = Terrasoft.Align.CENTER;
				}
			},

			/**
			 * @private
			 */
			_initBackground: function() {
				var propertyValue = this.$Config[this.$PropertyName];
				this.$Enabled = propertyValue.hasOwnProperty("background-image") ||
					propertyValue.hasOwnProperty("background-color");
				if (propertyValue.hasOwnProperty("background-color")) {
					this.$Color = propertyValue["background-color"];
				}
				if (this.$UseImage && propertyValue.hasOwnProperty("background-image")
						&& propertyValue["background-image"].startsWith("url(")) {
					var image = propertyValue["background-image"];
					this._applyImageValue(image.substring(4, image.length - 1));
				}
			},

			/**
			 * @private
			 */
			_applyImageValue: function(image) {
				if (this._isImageEmbedded(image)) {
					this.$ImageDisplayValue = this.get("Resources.Strings.ImageEmbedded");
					this.$Image = image;
				} else {
					this.$ImageDisplayValue = image;
				}
			},

			/**
			 * @private
			 */
			_isImageEmbedded: function(image) {
				return image.startsWith("data:") || image.startsWith("../rest/FileService/");
			},

			/**
			 * Upload background image button handler.
			 * @param {Array} image array.
			 * @public
			 */
			onImageSelected: function(image) {
				if (image || Ext.isArray(image)) {
					FileAPI.readAsDataURL(image[0], function (e) {
						this.$ImageDisplayValue = this.get("Resources.Strings.ImageEmbedded");
						if (this.$Image !== e.result) {
							this.$Image = e.result;
						}
					}.bind(this));
				}
			},

			/**
			 * Clear icon handler for image url attribute.
			 * @public
			 */
			clearImage: function() {
				this.$Image = null;
			},

			/**
			 * @inheritdoc BaseStylePropertyModule#getPropertyValue
			 * @override
			 */
			getPropertyValue: function() {
				var value = {};
				if (!this.$Enabled) {
					return value;
				}
				if (!Ext.isEmpty(this.$Image)) {
					value["background-image"] = Ext.String.format("url({0})", this.$Image);
				} else {
					value["background-color"] = this.$Color;
				}
				if (this.$UseImagePosition) {
					var horizontalPosition = this.$ImageHorizontalPosition || Terrasoft.Align.CENTER;
					var verticalPosition = this.$ImageVerticalPosition || Terrasoft.Align.CENTER;
					value["background-position"] = horizontalPosition + " " + verticalPosition;
				}
				return value;
			},

			/**
			 * @inheritdoc BaseStylePropertyModule#init
			 * @override
			 */
			initProperty: function() {
				this.callParent();
				this._initBackground();
				this._initImagePosition();
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "BackgroundPropertiesGrid",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": [],
					"classes": {
						"wrapClassName": ["background-properties-grid"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "BackgroundPropertiesContainer",
				"parentName": "BackgroundPropertiesGrid",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24,
						"rowSpan": 1
					},
					"wrapClass": ["control-editor-wrapper", "disable-input-label"]
				}
			},
			{
				"operation": "insert",
				"name": "Enabled",
				"parentName": "BackgroundPropertiesContainer",
				"propertyName": "items",
				"values": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"controlConfig": {
						"className": "Terrasoft.CheckBoxEdit",
						"checked": "$Enabled"
					},
					"caption": "CanChangeBackground",
					"markerValue": "CanChangeBackground",
					"wrapClass": ["style-input"]
				}
			},
			{
				"operation": "insert",
				"name": "BackgroundColor",
				"parentName": "BackgroundPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.COLOR_BUTTON,
					"value": "$Color",
					"defaultValue": "#ffffff",
					"menuItemClassName": Terrasoft.MenuItemType.COLOR_PICKER,
					"enabled": "$Enabled"
				}
			},
			{
				"operation": "insert",
				"name": "BackgroundImageContainer",
				"parentName": "BackgroundPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"visible": "$UseImage",
					"wrapClass": ["control-editor-wrapper", "disable-input-label"]
				}
			},
			{
				"operation": "insert",
				"name": "UploadImageIcon",
				"parentName": "BackgroundImageContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["icon-16x16 image-icon"]
				}
			},
			{
				"operation": "insert",
				"name": "Image",
				"parentName": "BackgroundImageContainer",
				"propertyName": "items",
				"values": {
					"caption": "BackgroundImage",
					"markerValue": "BackgroundImage",
					"value": "$ImageDisplayValue",
					"enabled": "$Enabled",
					"wrapClass": ["url-placeholder", "control-editor-wrapper", "hide-label"],
					"controlConfig": {
						"placeholder": "$Resources.Strings.BackgroundImageUrlPlaceholder",
						"hasClearIcon": true,
						"cleariconclick": "$clearImage"
					},
					"classes": {
						"wrapClassName": ["show-placeholder"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "UploadBackgroundImageButton",
				"parentName": "BackgroundImageContainer",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"imageConfig": "$Resources.Images.UploadBackgroundImage",
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"fileTypeFilter": ["image/*"],
					"fileUpload": true,
					"filesSelected": "$onImageSelected",
					"fileUploadMultiSelect": false,
					"markerValue": "UploadBackgroundImageButton",
					"enabled": "$Enabled",
					"visible": "$UseEmbeddedImage",
					"classes": {
						"wrapperClass": ["upload-icon-wrapper"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "VerticalAlignLabel",
				"parentName": "BackgroundPropertiesGrid",
				"propertyName": "items",
				"values": {
					"classes": {
						"labelClass": ["align-label"]
					},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"markerValue": "VerticalAlignLabel",
					"visible": "$UseImagePosition",
					"caption": "$Resources.Strings.BackgroundVerticalAlign",
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 12,
						"rowSpan": 1
					}
				}
			},
			{
				"operation": "insert",
				"name": "BackgroundVerticalAlignContainer",
				"parentName": "BackgroundPropertiesGrid",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"visible": "$UseImagePosition",
					"wrapClass": ["content-builder-align-container"],
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 12,
						"rowSpan": 1
					}
				}
			},
			{
				"operation": "insert",
				"name": "ImageVerticalPosition",
				"parentName": "BackgroundVerticalAlignContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
					"wrapClass": ["sheet-position-control-group-container"],
					"items": [],
					"value": "$ImageVerticalPosition"
				}
			},
			{
				"operation": "insert",
				"name": "BackgroundTopAlign",
				"parentName": "ImageVerticalPosition",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"markerValue": "BackgroundTop",
					"enabled": "$Enabled",
					"value": Terrasoft.Valign.TOP,
					"classes": {
						"wrapClass": ["block-valign block-valign-top"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "BackgroundMiddleAlign",
				"parentName": "ImageVerticalPosition",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"markerValue": "BackgroundMiddle",
					"enabled": "$Enabled",
					"value": Terrasoft.Align.CENTER,
					"classes": {
						"wrapClass": ["block-valign block-valign-middle"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "BackgroundBottomAlign",
				"parentName": "ImageVerticalPosition",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"markerValue": "BackgroundBottom",
					"enabled": "$Enabled",
					"value": Terrasoft.Valign.BOTTOM,
					"classes": {
						"wrapClass": ["block-valign block-valign-bottom"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "HorizontalAlignLabel",
				"parentName": "BackgroundPropertiesGrid",
				"propertyName": "items",
				"values": {
					"classes": {
						"labelClass": ["align-label"]
					},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"markerValue": "HorizontalAlignLabel",
					"visible": "$UseImagePosition",
					"caption": "$Resources.Strings.BackgroundHorizontalAlign",
					"layout": {
						"column": 12,
						"row": 1,
						"colSpan": 12,
						"rowSpan": 1
					}
				}
			},
			{
				"operation": "insert",
				"name": "BackgroundHorizontalAlignContainer",
				"parentName": "BackgroundPropertiesGrid",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"visible": "$UseImagePosition",
					"wrapClass": ["content-builder-align-container"],
					"layout": {
						"column": 12,
						"row": 2,
						"colSpan": 12,
						"rowSpan": 1
					}
				}
			},
			{
				"operation": "insert",
				"name": "ImageHorizontalPosition",
				"parentName": "BackgroundHorizontalAlignContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
					"wrapClass": ["sheet-position-control-group-container"],
					"items": [],
					"value": "$ImageHorizontalPosition"
				}
			},
			{
				"operation": "insert",
				"name": "BackgroundLeftAlign",
				"parentName": "ImageHorizontalPosition",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"markerValue": "BackgroundLeft",
					"enabled": "$Enabled",
					"value": Terrasoft.Align.LEFT,
					"classes": {
						"wrapClass": ["sheet-align-left"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "BackgroundCenterAlign",
				"parentName": "ImageHorizontalPosition",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"markerValue": "BackgroundCenter",
					"enabled": "$Enabled",
					"value": Terrasoft.Align.CENTER,
					"classes": {
						"wrapClass": ["sheet-align-center"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "BackgroundRightAlign",
				"parentName": "ImageHorizontalPosition",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"markerValue": "BackgroundRight",
					"enabled": "$Enabled",
					"value": Terrasoft.Align.RIGHT,
					"classes": {
						"wrapClass": ["sheet-align-right"]
					}
				}
			}
		]
	};
});


