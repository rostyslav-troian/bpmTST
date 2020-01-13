Terrasoft.configuration.Structures["ContentItemStylesPage"] = {innerHierarchyStack: ["ContentItemStylesPage"], structureParent: "ContentItemPropertiesPage"};
define('ContentItemStylesPageStructure', ['ContentItemStylesPageResources'], function(resources) {return {schemaUId:'20026513-8343-4052-a6e0-3c0872fe59f2',schemaCaption: "ContentItemStylesPage", parentSchemaName: "ContentItemPropertiesPage", schemaName:'ContentItemStylesPage',parentSchemaUId:'fe424518-8ce5-46a4-a265-ea8ff4ecd12d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContentItemStylesPage", ["SourceCodeEdit", "SourceCodeEditGenerator"],
	function() {
		return {
			attributes: {

				/**
				 * Actual content item styles.
				 */
				Styles: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					onChange: "onStylesChanged"
				},

				// region Attributes: Background

				/**
				 * Flag indicates when background image change enabled.
				 */
				UseBackgroundImage: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: true
				},

				/**
				 * Flag indicates does background settings change enabled.
				 */
				CanChangeBackground: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					onChange: "_onCanChangeBackgroundChanged"
				},

				/**
				 * Background color.
				 */
				BackgroundColor: {
					onChange: "_onBackgroundColorChanged"
				},

				/**
				 * Background image.
				 */
				BackgroundImage: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					onChange: "_onBackgroundImageChanged"
				},

				/**
				 * Background image display value.
				 */
				BackgroundImageDisplayValue: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					onChange: "_onBackgroundImageDisplayValueChanged"
				},

				/**
				 * Allow use background mobile image.
				 */
				UseBackgroundMobileImage: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					onChange: "_onUseBackgroundMobileImage"
				},

				/**
				 * Background mobile image display value.
				 */
				BackgroundMobileDisplayValue: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					onChange: "_onBackgroundMobileDisplayValueChanged"
				},

				/**
				 * Background mobile image.
				 */
				BackgroundMobileImage: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					onChange: "_onBackgroundMobileImageChanged"
				},

				// endregion

				// region Attributes: Border

				/**
				 * Flag indicates does border settings enabled and visible for setup.
				 */
				IsBordersSettingsEnabled: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: true
				},

				/**
				 * Flag indicates does border settings change enabled.
				 */
				CanChangeBorders: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					onChange: "_onCanChangeBordersChanged"
				},

				/**
				 * Border width.
				 */
				BorderWidth: {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					onChange: "_onBorderChanged",
					value: 1
				},

				/**
				 * Border color,
				 */
				BorderColor: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					onChange: "_onBorderChanged"
				},

				/**
				 * Border style.
				 */
				BorderStyle: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					onChange: "_onBorderChanged"
				},

				/**
				 * Border styles list.
				 */
				BorderStyleList: {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					onChange: "_onBorderStyleLookupChanged"
				},

				/**
				 * Border Top enabled.
				 */
				UseBorderTop: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					onChange: "_onUseBorderTopChanged"
				},

				/**
				 * Border Bottom enabled.
				 */
				UseBorderBottom: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					onChange: "_onUseBorderBottomChanged"
				},

				/**
				 * Border Left enabled.
				 */
				UseBorderLeft: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					onChange: "_onUseBorderLeftChanged"
				},

				/**
				 * Border Right enabled.
				 */
				UseBorderRight: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					onChange: "_onUseBorderRightChanged"
				},

				/**
				 * Border radius,
				 */
				BorderRadius: {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					onChange: "_onBorderRadiusChanged",
					value: 0
				},

				// endregion

				/**
				 * Is styles editor focused.
				 */
				Focused: {
					onChange: "onFocusChanged"
				},

				/**
				 * Is styles valid.
				 */
				IsValid: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				},

				// region Attributes: Padding

				/**
				 * Padding left.
				 */
				PaddingLeft: {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					value: 0,
					onChange: "_onPaddingChanged"
				},

				/**
				 * Padding top.
				 */
				PaddingTop: {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					value: 0,
					onChange: "_onPaddingChanged"
				},

				/**
				 * Padding right.
				 */
				PaddingRight: {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					value: 0,
					onChange: "_onPaddingChanged"
				},

				/**
				 * Padding bottom.
				 */
				PaddingBottom: {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					value: 0,
					onChange: "_onPaddingChanged"
				}

				// endregion

			},
			properties: {

				/**
				 * @private
				 */
				_backgroundImageName: null,

				/**
				 * @private
				 */
				_mobileBackgroundImageName: null,

				/**
				 * @private
				 */
				_workProperties: ["Styles", "BackgroundImage", "UseBackgroundImage", "IsBordersSettingsEnabled"],

				workStyles: ["border-radius", "border-top", "border-right", "border-bottom", "border-left",
					"background-color", "background-image", "background-size", "background-repeat", "padding-top",
					"padding-right", "padding-bottom", "padding-left"]
			},
			methods: {

				// region Methods: Private

				// region Methods: Private Padding

				/**
				 * @private
				 */
				_onPaddingChanged: function() {
					const styles = Ext.JSON.decode(this.$Styles, true);
					Ext.apply(styles, {
						"padding-left": (this.$PaddingLeft || 0) + "px",
						"padding-top": (this.$PaddingTop || 0) + "px",
						"padding-right": (this.$PaddingRight || 0) + "px",
						"padding-bottom": (this.$PaddingBottom || 0) + "px"
					});
					this.$Styles = JSON.stringify(styles, null, "\t");
					this.save();
				},

				/**
				 * @private
				 */
				_preparePadding: function(styles) {
					if (!Ext.isEmpty(styles.padding)) {
						const parts = styles.padding.split(" ").map(function(item) {
							return parseFloat(item) || 0;
						});
						var paddingTop, paddingRight, paddingBottom, paddingLeft;
						if (parts.length === 1) {
							paddingTop = parts[0];
							paddingRight = parts[0];
							paddingBottom = parts[0];
							paddingLeft = parts[0];
						}
						if (parts.length === 2) {
							paddingTop = parts[0];
							paddingRight = parts[1];
							paddingBottom = parts[0];
							paddingLeft = parts[1];
						}
						if (parts.length === 3) {
							paddingTop = parts[0];
							paddingRight = parts[1];
							paddingBottom = parts[2];
							paddingLeft = parts[1];
						}
						if (parts.length === 4) {
							paddingTop = parts[0];
							paddingRight = parts[1];
							paddingBottom = parts[2];
							paddingLeft = parts[3];
						}
						styles["padding-top"] = paddingTop + "px";
						styles["padding-right"] = paddingRight + "px";
						styles["padding-bottom"] = paddingBottom + "px";
						styles["padding-left"] = paddingLeft + "px";
						delete styles.padding;
						Ext.apply(this.$Config, { Styles: styles });
						this.$Styles = JSON.stringify(styles, null, "\t");
					}
					return styles;
				},

				/**
				 * @private
				 */
				_initPadding: function(styles) {
					styles = this._preparePadding(styles);
					this.$PaddingLeft = parseFloat(styles["padding-left"]) || 0;
					this.$PaddingTop = parseFloat(styles["padding-top"]) || 0;
					this.$PaddingRight = parseFloat(styles["padding-right"]) || 0;
					this.$PaddingBottom = parseFloat(styles["padding-bottom"]) || 0;
				},

				// endregion

				// region Methods: Private Border

				/**
				 * @private
				 */
				_onCanChangeBordersChanged: function(model, value) {
					const styles = this.$Config.Styles;
					if (!value) {
						const borderProperties = this._getBorderProperties();
						Terrasoft.each(borderProperties, function(property, name) {
							delete styles["border-" + name.toLowerCase()];
						});
						this._clearBordersAttributes();
						this.$Styles = JSON.stringify(styles, null, "\t");
					}
					if (value && !this._hasBorderProperties(styles)) {
						this._initBorderAttributes();
						this.$UseBorderTop = this.$UseBorderBottom = this.$UseBorderLeft = this.$UseBorderRight = true;
					}
					this.save();
				},

				/**
				 * @private
				 */
				_initBorderAttributes: function() {
					this.$BorderWidth = 1;
					this.$BorderStyle = "Solid";
					this.$BorderColor = "#cccccc";
					this.$BorderStyleList = {
						value: "Solid",
						displayValue: "Solid"
					};
				},

				/**
				 * @private
				 */
				_initBorderRadius: function(styles) {
					if (styles.hasOwnProperty("border-radius")) {
						const radius = styles["border-radius"];
						if (radius.endsWith("px")) {
							this.$BorderRadius = parseInt(radius, 10);
						}
					} else {
						this.$BorderRadius = 0;
					}
				},

				/**
				 * @private
				 */
				_clearBordersAttributes: function() {
					this.$UseBorderTop = this.$UseBorderBottom = this.$UseBorderLeft = this.$UseBorderRight = false;
					this.$BorderColor = this.$BorderStyle = this.$BorderWidth = this.$BorderStyleList = null;
				},

				/**
				 * @private
				 */
				_prepareBorderStylesList: function(filter, list) {
					const result = this.Ext.create("Terrasoft.Collection");
					const stylesValues = [
						"Hidden",
						"Dotted",
						"Dashed",
						"Solid",
						"Double",
						"Groove",
						"Ridge",
						"Inset",
						"Outset"
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
				 * @private
				 */
				_onBorderStyleLookupChanged: function(model, lookupValue) {
					this.$BorderStyle = lookupValue && lookupValue.value;
				},

				/**
				 * @private
				 */
				_onBorderRadiusChanged: function(model, radius) {
					const styles = Ext.JSON.decode(this.$Styles, true);
					if (radius) {
						styles["border-radius"] = radius + "px";
					} else {
						delete styles["border-radius"];
					}
					this.$Styles = JSON.stringify(styles, null, "\t");
					this.save();
				},

				/**
				 * @private
				 */
				_onUseBorderTopChanged: function(model, value) {
					this._onUseBorderChanged(value, "border-top");
				},

				/**
				 * @private
				 */
				_onUseBorderBottomChanged: function(model, value) {
					this._onUseBorderChanged(value, "border-bottom");
				},

				/**
				 * @private
				 */
				_onUseBorderLeftChanged: function(model, value) {
					this._onUseBorderChanged(value, "border-left");
				},

				/**
				 * @private
				 */
				_onUseBorderRightChanged: function(model, value) {
					this._onUseBorderChanged(value, "border-right");
				},

				/**
				 * @private
				 */
				_onUseBorderChanged: function(value, borderSide) {
					const styles = Ext.JSON.decode(this.$Styles, true);
					const selectedSide = styles[borderSide];
					if (!Ext.isEmpty(this.$BorderStyle) && !Ext.isEmpty(selectedSide)) {
						const parts = selectedSide.split(" ");
						const style = value ? this.$BorderStyle : "None";
						if (parts[0].endsWith("px")) {
							const widthValuable = parseInt(parts[0], 10) > 0;
							parts[1] = widthValuable ? style : "None";
						} else {
							parts[0] = style;
						}
						styles[borderSide] = parts.join(" ");
						this.$Styles = JSON.stringify(styles, null, "\t");
						this.save();
					}
				},

				/**
				 * @private
				 */
				_canApplyBorder: function() {
					return !Ext.isEmpty(this.$BorderColor) && !Ext.isEmpty(this.$BorderStyle) &&
						this.$BorderWidth > 0;
				},

				/**
				 * @private
				 */
				_onBorderChanged: function() {
					if (this._canApplyBorder()) {
						const styles = Ext.JSON.decode(this.$Styles, true);
						Ext.apply(styles, this._buildBorderStyleJson());
						this.$Styles = JSON.stringify(styles, null, "\t");
						this.save();
					}
				},

				/**
				 * @private
				 */
				_buildBorderStyleJson: function() {
					const result = {};
					const borderProperties = this._getBorderProperties();
					Terrasoft.each(borderProperties, function(sideConf, side) {
						const useSideBorder = this.get(sideConf.useAttribute);
						const style = useSideBorder ? this.$BorderStyle : "None";
						const width = Ext.isEmpty(this.$BorderWidth) ? 0 : this.$BorderWidth;
						result["border-" + side.toLowerCase()] = width + "px " + style + " " + this.$BorderColor;
					}, this);
					return result;
				},

				/**
				 * @private
				 */
				_onBorderConfigChanged: function(config) {
					const borderConfig = Terrasoft.calculateBorderStyles(config);
					const borderProperties = this._getBorderProperties();
					const borderWidth = [];
					const borderStyles = [];
					const borderColor = [];
					Terrasoft.each(borderProperties, function(sideConf, side) {
						const conf = borderConfig[side.toLowerCase()];
						Ext.Array.include(borderWidth, conf.width);
						Ext.Array.include(borderStyles, conf.style);
						Ext.Array.include(borderColor, conf.color);
						const useBorder = conf.style.toLowerCase() !==
								"none" && parseInt(conf.width, 10) > 0;
						this.set("UseBorder" + side, useBorder);
					}, this);
					const borderStyle = borderStyles.find(function(style) {
						return style.toLowerCase() !== "none" && style.toLowerCase() !== "initial";
					});
					if (borderStyle) {
						this.$BorderStyle = Ext.util.Format.capitalize(borderStyle);
						this.$BorderStyleList = {
							displayValue: this.$BorderStyle,
							value: this.$BorderStyle
						};
					}
					if (borderColor.length === 1 && borderColor[0].toLowerCase() !== "initial") {
						const rgbColor = Terrasoft.rgbString2Array(borderColor[0]);
						this.$BorderColor = Terrasoft.rgb2hex(rgbColor);
					}
					if (borderWidth.length === 1 && borderWidth[0].toLowerCase() !== "initial") {
						this.$BorderWidth = parseInt(borderWidth[0], 10);
					}
				},

				/**
				 * @private
				 */
				_getBorderProperties: function() {
					return {
						"Top": {
							useAttribute: "UseBorderTop"
						},
						"Bottom": {
							useAttribute: "UseBorderBottom"
						},
						"Left": {
							useAttribute: "UseBorderLeft"
						},
						"Right": {
							useAttribute: "UseBorderRight"
						}
					};
				},

				// endregion

				// region Methods: Private Background

				/**
				 * @private
				 */
				_initBackground: function(styles) {
					this.$CanChangeBackground = styles.hasOwnProperty("background-image") ||
						styles.hasOwnProperty("background-color");
					if (styles.hasOwnProperty("background-color")) {
						this.$BackgroundColor = styles["background-color"];
					}
					if (styles.hasOwnProperty("background-image") && styles["background-image"].startsWith("url(")) {
						const backgroundImage = styles["background-image"];
						this._applyBackgroundImageStyle(backgroundImage.substring(4, backgroundImage.length - 1));
					}
				},

				/**
				 * @private
				 */
				_isImageEmbedded: function(image) {
					return image.startsWith("data:") || image.startsWith("../rest/FileService/");
				},

				/**
				 * @private
				 */
				_applyBackgroundImageStyle: function(image) {
					if (this._isImageEmbedded(image)) {
						this.$BackgroundImageDisplayValue = this.get("Resources.Strings.ImageEmbedded");
						this.$BackgroundImage = image;
					} else {
						this.$BackgroundImageDisplayValue = image;
					}
				},

				/**
				 * @private
				 */
				_onCanChangeBackgroundChanged: function(model, value) {
					if (value) {
						if (Ext.isEmpty(this.$BackgroundColor)) {
							this.$BackgroundColor = "#ffffff";
						} else {
							this._onBackgroundColorChanged();
						}
					} else {
						this._removeBackgroundAttributes();
					}
				},

				/**
				 * @private
				 */
				_removeBackgroundAttributes: function() {
					const styles = Ext.JSON.decode(this.$Styles, true);
					this.$BackgroundImageDisplayValue = "";
					delete styles["background-color"];
					delete styles["background-image"];
					delete styles["background-size"];
					delete styles["background-repeat"];
					this.$Styles = JSON.stringify(styles, null, "\t");
					this.save();
				},

				/**
				 * Handles background value change.
				 * @private
				 */
				_onBackgroundColorChanged: function() {
					const styles = Ext.JSON.decode(this.$Styles, true);
					Ext.apply(styles, {"background-color": this.$BackgroundColor});
					this.$Styles = JSON.stringify(styles, null, "\t");
					this.save();
				},

				/**
				 * Handles background value change.
				 * @private
				 */
				_onBackgroundImageChanged: function(model, image) {
					if (!Ext.isEmpty(image)) {
						const styles = Ext.JSON.decode(this.$Styles, true);
						const imageConf = {
							"background-repeat": "no-repeat",
							"background-size": "100%",
							"background-image": Ext.String.format("url({0})", image)
						};
						Ext.apply(styles, imageConf);
						Ext.apply(this.$Config.BackgroundImage, {
								image: image,
								name: this._backgroundImageName
							});
						this.$Styles = JSON.stringify(styles, null, "\t");
						this.save();
					} else {
						this.removeBackgroundImageAttributes();
					}
				},

				/**
				 * @private
				 */
				_onBackgroundImageDisplayValueChanged: function(model, value) {
					if (Ext.isEmpty(value)) {
						this.removeBackgroundImageAttributes();
					} else {
						if (value !== this.get("Resources.Strings.ImageEmbedded")) {
							this.$BackgroundImage = value;
						}
					}
				},

				/**
				 * @private
				 */
				_onUseBackgroundMobileImage: function(model, value) {
					if (!value) {
						this.$Config.BackgroundImage.mobile = null;
						this.$BackgroundMobileDisplayValue = null;
					}
				},

				/**
				 * @private
				 */
				_canChangeMobileBackground: function() {
					return Terrasoft.Features.getIsEnabled("EmailMobileBackgroundFeature") && this.$UseBackgroundImage;
				},

				/**
				 * @private
				 */
				_onBackgroundMobileImageChanged: function(model, image) {
					if (!Ext.isEmpty(image)) {
						Ext.apply(this.$Config.BackgroundImage, {
							mobile: image,
							mobileName: this._mobileBackgroundImageName
						});
					} else {
						this.$Config.BackgroundImage.mobile = null;
					}
					this.save();
				},

				/**
				 * @private
				 */
				_onBackgroundMobileDisplayValueChanged: function(model, value) {
					if (Ext.isEmpty(value)) {
						this.$Config.BackgroundImage.mobile = null;
					} else {
						if (value !== this.get("Resources.Strings.ImageEmbedded")) {
							this.$BackgroundMobileImage = value;
						}
					}
					this.save();
				},

				/**
				 * @private
				 */
				_initMobileBackground: function(image) {
					this.$UseBackgroundMobileImage = true;
					if (this._isImageEmbedded(image)) {
						this.$BackgroundMobileDisplayValue = this.get("Resources.Strings.ImageEmbedded");
						this.$BackgroundMobileImage = image;
					} else {
						this.$BackgroundMobileDisplayValue = image;
					}
				},

				/**
				 * @private
				 */
				_clearMobileBackground: function() {
					this.$UseBackgroundMobileImage = false;
					this.$BackgroundMobileImage = Terrasoft.emptyString;
					this.$BackgroundMobileDisplayValue = Terrasoft.emptyString;
				},

				/**
				 * @private
				 */
				_clearBackground: function() {
					this.$BackgroundImage = Terrasoft.emptyString;
					this.$BackgroundImageDisplayValue = Terrasoft.emptyString;
				},

				/**
				 * @private
				 */
				_canUploadBackground: function() {
					return Terrasoft.Features.getIsEnabled("ContentItemUploadBackgroundFeature") &&
						this.$CanChangeBackground && this.$UseBackgroundImage;
				},

				/**
				 * @private
				 */
				_hasBorderProperties: function(styles) {
					return styles.hasOwnProperty("border-top") && styles.hasOwnProperty("border-bottom") &&
							styles.hasOwnProperty("border-left") && styles.hasOwnProperty("border-right");
				},

				/**
				 * @private
				 */
				_updateAttributes: function() {
					const styles = this.$Config.Styles;
					this.$UseBackgroundImage = Ext.isDefined(this.$Config.UseBackgroundImage)
						? this.$Config.UseBackgroundImage
						: true;
					this.$IsBordersSettingsEnabled = Ext.isDefined(this.$Config.IsBordersSettingsEnabled)
						? this.$Config.IsBordersSettingsEnabled
						: true;
					if (Ext.isEmpty(this.$Config.BackgroundImage)) {
						this.$Config.BackgroundImage = {};
						this._clearMobileBackground();
					} else {
						if (!Ext.isEmpty(this.$Config.BackgroundImage.mobile)) {
							this._initMobileBackground(this.$Config.BackgroundImage.mobile);
						} else {
							this._clearMobileBackground();
						}
					}
					if (Ext.isEmpty(this.$Config.BackgroundImage.image)) {
						this._clearBackground();
					}
					if (styles) {
						this._initBackground(styles);
						this._initBorderRadius(styles);
						if (this._hasBorderProperties(styles)) {
							this._onBorderConfigChanged(styles);
							this.$CanChangeBorders = true;
						} else {
							this.$CanChangeBorders = false;
						}
						this._initPadding(styles);
					}
				},

				_setConfigProperties: function(config) {
					this.$Config = {};
					if (!config) {
						return;
					}
					Terrasoft.each(this._workProperties, function(parameterName) {
						if (config.hasOwnProperty(parameterName)) {
							this.$Config[parameterName] = config[parameterName];
						}
					}, this);
				},

				// endregion

				// region Methods: Protected

				/**
				 * Saves content item style.
				 * @protected
				 */
				onStylesChanged: function() {
					const styles = Ext.JSON.decode(this.$Styles, true);
					Ext.apply(this.$Config, { Styles: styles });
				},
				
				/**
				 * @inheritdoc ContentItemPropertiesPage#setConfig
				 * @overridden
				 */
				setConfig: function(config) {
					this._setConfigProperties(config);
				},

				/**
				 * @inheritdoc ContentItemPropertiesPage#onContentItemConfigChanged
				 * @overridden
				 */
				onContentItemConfigChanged: function(config) {
					if (config) {
						this.$Styles = JSON.stringify(config.Styles || {}, null, "\t");
						if (this.$Styles !== config.Styles) {
							this.onStylesChanged();
						}
						this.$IsValid = Terrasoft.isJsonObject(this.$Styles) || Ext.isEmpty(this.$Styles);
						this._updateAttributes();
					}
				},

				/**
				 * @inheritdoc ContentItemPropertiesPage#validate
				 * @overridden
				 */
				validateConfig: function(callback, scope) {
					this.$IsValid = Terrasoft.isJsonObject(this.$Styles) || Ext.isEmpty(this.$Styles);
					Ext.callback(callback, scope, [{ valid: this.$IsValid }]);
				},

				/**
				 * Handles complete styles edit.
				 * @protected
				 */
				onFocusChanged: function() {
					if (!this.$Focused) {
						const styles = this.$Config.Styles;
						if (styles) {
							this.$BackgroundColor = styles["background-color"];
						}
						this.save();
						this._updateAttributes();
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
				 * @overridden
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("PaddingTop", this.positiveNumberValidator);
					this.addColumnValidator("PaddingBottom", this.positiveNumberValidator);
					this.addColumnValidator("PaddingLeft", this.positiveNumberValidator);
					this.addColumnValidator("PaddingRight", this.positiveNumberValidator);
					this.addColumnValidator("BorderWidth", this.borderWidthValidator);
					this.addColumnValidator("BorderRadius", this.positiveNumberValidator);
				},

				/**
				 * Validates positive numbers.
				 * @param {Number} value Value.
				 * @return {Object} Validation info.
				 * @protected
				 */
				positiveNumberValidator: function(value) {
					return Terrasoft.validateNumberRange(0, Terrasoft.DataValueTypeRange.INTEGER.maxValue, value);
				},

				/**
				 * Validates border width.
				 * @param {Number} value Border width.
				 * @return {Object} Validation result.
				 */
				borderWidthValidator: function(value) {
					if (Ext.isNumber(value)) {
						return Terrasoft.validateNumberRange(1, Terrasoft.DataValueTypeRange.INTEGER.maxValue, value);
					} else {
						return {
							isValid: true
						};
					}
				},

				// endregion

				// region Methods: Public

				/**
				 * Is ContentItemCustomStylesFeature enabled.
				 * @return {Boolean} Feature state.
				 */
				isContentItemCustomStylesFeatureEnable: function() {
					return Terrasoft.Features.getIsEnabled("ContentItemCustomStylesFeature");
				},

				/**
				 * Clear icon handler for image url attribute.
				 * @public
				 */
				removeBackgroundImageAttributes: function() {
					const styles = Ext.JSON.decode(this.$Styles, true);
					delete styles["background-image"];
					delete styles["background-size"];
					delete styles["background-repeat"];
					this.$Styles = JSON.stringify(styles, null, "\t");
					this.$Config.BackgroundImage.image = null;
					this.save();
				},

				/**
				 * Clear icon handler for background mobile image url attribute.
				 * @public
				 */
				removeBackgroundMobileImage: function() {
					this.$BackgroundMobileDisplayValue = null;
				},

				/**
				 * Upload background image button handler.
				 * @param {Array} image array.
				 * @public
				 */
				onBackgroundImageSelected: function(image) {
					if (image || Ext.isArray(image)) {
						FileAPI.readAsDataURL(image[0], function (e) {
							this.$BackgroundImageDisplayValue = this.get("Resources.Strings.ImageEmbedded");
							this._backgroundImageName = e.target.name;
							if (this.$BackgroundImage === e.result) {
								this._onBackgroundImageChanged(null, e.result);
							} else {
								this.$BackgroundImage = e.result;
							}
						}.bind(this));
					}
				},

				/**
				 * Upload background mobile image button handler.
				 * @param {Array} image array.
				 * @public
				 */
				onBackgroundMobileImageSelected: function(image) {
					if (image || Ext.isArray(image)) {
						FileAPI.readAsDataURL(image[0], function(e) {
							this.$BackgroundMobileDisplayValue = this.get("Resources.Strings.ImageEmbedded");
							this._mobileBackgroundImageName = e.target.name;
							if (this.$BackgroundMobileImage === e.result) {
								this._onBackgroundMobileImageChanged(null, e.result);
							} else {
								this.$BackgroundMobileImage = e.result;
							}
						}.bind(this));
					}
				}

				// endregion

			},
			diff: [
				{
					"operation": "insert",
					"name": "ContentItemStylesEditorContainer",
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
					"parentName": "ContentItemStylesEditorContainer",
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

				// region Diff: Padding

				{
					"operation": "insert",
					"name": "PaddingGroup",
					"parentName": "PropertiesContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": "$Resources.Strings.PaddingCaption",
						"wrapClass": ["padding-control-group"]
					},
					"index": 0
				},
				{
					"operation": "insert",
					"parentName": "PaddingGroup",
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
						"wrapClass": ["style-input"],
						"markerValue": "PaddingRight",
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
				},

				// endregion

				// region Diff: Background

				{
					"operation": "insert",
					"name": "BackgroundLabelContainer",
					"parentName": "PropertiesContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["background-label-wrapper"]
					},
					"index": 2
				},
				{
					"operation": "insert",
					"parentName": "BackgroundLabelContainer",
					"name": "BackgroundLabel",
					"propertyName": "items",
					"values": {
						"classes": {"labelClass": ["background-label"]},
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.BackgroundLabelCaption"
					}
				},
				{
					"operation": "insert",
					"parentName": "BackgroundLabelContainer",
					"propertyName": "items",
					"name": "BackgroundInfoTip",
					"values": {
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": "$Resources.Strings.BackgroundInfo",
						"style": Terrasoft.TipStyle.GREEN,
						"behaviour": {
							"displayEvent": Terrasoft.TipDisplayEvent.HOVER
						},
						"controlConfig": {
							"visible": "$UseBackgroundImage"
						}
					}
				},
				{
					"operation": "insert",
					"name": "BackgroundGroup",
					"parentName": "PropertiesContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"isHeaderVisible": false,
						"items": [],
						"caption": "$Resources.Strings.BackgroundLabelCaption",
						"wrapClass": ["background-control-group"]
					}
				},
				{
					"operation": "insert",
					"parentName": "BackgroundGroup",
					"name": "BackgroundPropertiesContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["control-editor-wrapper", "disable-input-label"],
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
					"parentName": "BackgroundPropertiesContainer",
					"propertyName": "items",
					"name": "CanChangeBackground",
					"values": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"controlConfig": {
							"className": "Terrasoft.CheckBoxEdit",
							"checked": "$CanChangeBackground"
						},
						"caption": "CanChangeBackground",
						"markerValue": "CanChangeBackground",
						"wrapClass": ["style-input"]
					}
				},
				{
					"operation": "insert",
					"parentName": "BackgroundPropertiesContainer",
					"propertyName": "items",
					"name": "BackgroundColor",
					"values": {
						"itemType": Terrasoft.ViewItemType.COLOR_BUTTON,
						"value": {"bindTo": "BackgroundColor"},
						"markerValue": "BackgroundColor",
						"defaultValue": "#ffffff",
						"menuItemClassName": Terrasoft.MenuItemType.COLOR_PICKER,
						"enabled": "$CanChangeBackground"
					}
				},
				{
					"operation": "insert",
					"name": "UploadImageIcon",
					"parentName": "BackgroundPropertiesContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["icon-16x16 image-icon"],
						"visible": "$UseBackgroundImage"
					}
				},
				{
					"operation": "insert",
					"name": "BackgroundImage",
					"parentName": "BackgroundPropertiesContainer",
					"propertyName": "items",
					"values": {
						"caption": "BackgroundImage",
						"value": "$BackgroundImageDisplayValue",
						"markerValue": "BackgroundImageDisplayValue",
						"enabled": "$CanChangeBackground",
						"wrapClass": ["url-placeholder", "control-editor-wrapper", "hide-label"],
						"controlConfig": {
							"placeholder": "$Resources.Strings.BackgroundImageUrlPlaceholder",
							"hasClearIcon": true,
							"cleariconclick": "$removeBackgroundImageAttributes"
						},
						"visible": "$UseBackgroundImage",
						"classes": {
							"wrapClassName": ["show-placeholder"]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "BackgroundPropertiesContainer",
					"name": "UploadBackgroundImageButton",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"imageConfig": "$Resources.Images.UploadBackgroundImage",
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"visible": "$_canUploadBackground",
						"fileTypeFilter": ["image/*"],
						"fileUpload": true,
						"filesSelected": "$onBackgroundImageSelected",
						"fileUploadMultiSelect": false,
						"markerValue": "UploadBackgroundImageButton",
						"classes": {"wrapperClass": ["upload-icon-wrapper"]}
					}
				},
				{
					"operation": "insert",
					"name": "BackgroundMobileImageContainer",
					"parentName": "BackgroundGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["mobile-image-wrapper"],
						"visible": "$_canChangeMobileBackground"
					}
				},
				{
					"operation": "insert",
					"name": "BackgroundMobileImageCheckboxContainer",
					"parentName": "BackgroundMobileImageContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["control-editor-wrapper", "disable-input-label", "mobile-background-wrapper"]
					}
				},
				{
					"operation": "insert",
					"parentName": "BackgroundMobileImageCheckboxContainer",
					"propertyName": "items",
					"name": "UseBackgroundMobileImage",
					"values": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"enabled": "$CanChangeBackground",
						"controlConfig": {
							"className": "Terrasoft.CheckBoxEdit",
							"checked": "$UseBackgroundMobileImage"
						},
						"markerValue": "UseBackgroundMobileImage",
						"caption": "$Resources.Strings.UseBackgroundMobileImage",
						"wrapClass": ["style-input"]
					}
				},
				{
					"operation": "insert",
					"name": "BackgroundMobileImageLabel",
					"parentName": "BackgroundMobileImageCheckboxContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.UseBackgroundMobileImage",
						"classes": {
							"labelClass": ["mobile-background-label"]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "BackgroundMobileImageContainer",
					"name": "BackgroundMobileImageUploadGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["control-editor-wrapper", "mobile-background-wrapper"],
						"visible": "$UseBackgroundMobileImage"
					}
				},
				{
					"operation": "insert",
					"name": "BackgroundMobileDisplayValue",
					"parentName": "BackgroundMobileImageUploadGroup",
					"propertyName": "items",
					"values": {
						"value": "$BackgroundMobileDisplayValue",
						"markerValue": "MobileImage",
						"caption": "MobileImage",
						"enabled": "$CanChangeBackground",
						"wrapClass": ["url-placeholder", "control-editor-wrapper", "hide-label"],
						"controlConfig": {
							"placeholder": "$Resources.Strings.BackgroundImageUrlPlaceholder",
							"hasClearIcon": true,
							"cleariconclick": "$removeBackgroundMobileImage"
						},
						"classes": {
							"wrapClassName": ["show-placeholder"]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "BackgroundMobileImageUploadGroup",
					"name": "UploadBackgroundMobileImageButton",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"imageConfig": "$Resources.Images.UploadBackgroundImage",
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"visible": "$_canUploadBackground",
						"enabled": "$CanChangeBackground",
						"fileTypeFilter": ["image/*"],
						"fileUpload": true,
						"filesSelected": "$onBackgroundMobileImageSelected",
						"fileUploadMultiSelect": false,
						"markerValue": "UploadBackgroundMobileImageButton",
						"classes": {"wrapperClass": ["upload-image-icon-wrapper, upload-mobile-background-image-icon"]}
					}
				},

				// endregion

				// region Diff: Border

				{
					"operation": "insert",
					"parentName": "PropertiesContainer",
					"name": "BorderRadiusControlGroup",
					"propertyName": "items",
					"values": {
						"caption": "$Resources.Strings.BorderRadiusLabelCaption",
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"wrapClass": ["border-radius-control-group"],
						"controlConfig": {
							"visible" : "$IsBordersSettingsEnabled"
						}
					},
					"index": 1
				},
				{
					"operation": "insert",
					"parentName": "PropertiesContainer",
					"name": "BorderSettingsControlGroup",
					"propertyName": "items",
					"values": {
						"caption": "$Resources.Strings.BordersLabelCaption",
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"wrapClass": ["border-settings-control-group"],
						"controlConfig": {
							"visible" : "$IsBordersSettingsEnabled"
						}
					}
				},
				{
					"operation": "insert",
					"name": "BorderRadiusContainer",
					"parentName": "BorderRadiusControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["control-editor-wrapper", "collapse-input-label"]
					}
				},
				{
					"operation": "insert",
					"name": "BorderRadius",
					"parentName": "BorderRadiusContainer",
					"propertyName": "items",
					"values": {
						"markerValue": "BorderRadius",
						"itemType": Terrasoft.ViewItemType.TEXT,
						"caption": "$Resources.Strings.BorderRadiusLabelCaption"
					}
				},
				{
					"operation": "insert",
					"name": "BorderPropertiesContainer",
					"parentName": "BorderSettingsControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["control-editor-wrapper", "disable-input-label"]
					}
				},
				{
					"operation": "insert",
					"parentName": "BorderPropertiesContainer",
					"propertyName": "items",
					"name": "CanChangeBorders",
					"values": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"markerValue": "CanChangeBorders",
						"controlConfig": {
							"className": "Terrasoft.CheckBoxEdit",
							"checked": "$CanChangeBorders"
						},
						"labelConfig": {
							"visible": false
						},
						"caption": "CanChangeBorders",
						"wrapClass": ["style-input"]
					}
				},
				{
					"operation": "insert",
					"parentName": "BorderPropertiesContainer",
					"propertyName": "items",
					"name": "BorderColor",
					"values": {
						"itemType": Terrasoft.ViewItemType.COLOR_BUTTON,
						"value": "$BorderColor",
						"markerValue": "BorderColor",
						"defaultValue": "#cccccc",
						"menuItemClassName": Terrasoft.MenuItemType.COLOR_PICKER,
						"enabled": "$CanChangeBorders"
					}
				},
				{
					"operation": "insert",
					"name": "BorderWidthImage",
					"parentName": "BorderPropertiesContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["icon-16x16 stroke-width"]
					}
				},
				{
					"operation": "insert",
					"name": "BorderWidth",
					"parentName": "BorderPropertiesContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.TEXT,
						"caption": "BordersWidth",
						"markerValue": "BorderWidth",
						"wrapClass": ["style-input", "border-width-control"],
						"enabled": "$CanChangeBorders"
					}
				},
				{
					"operation": "insert",
					"name": "BorderUnitLabel",
					"parentName": "BorderPropertiesContainer",
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
					"name": "BorderStyleContainer",
					"parentName": "BorderSettingsControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["control-editor-wrapper", "disable-input-label"]
					}
				},
				{
					"operation": "insert",
					"parentName": "BorderStyleContainer",
					"propertyName": "items",
					"name": "BorderStyleList",
					"values": {
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"controlConfig": {
							"className": "Terrasoft.ComboBoxEdit",
							"prepareList": "$_prepareBorderStylesList"
						},
						"markerValue": "BorderStyleList",
						"wrapClass": ["style-input"],
						"enabled": "$CanChangeBorders",
						"caption": "BorderStyleList"
					}
				},
				{
					"operation": "insert",
					"name": "BorderVisibleContainer",
					"parentName": "BorderSettingsControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["control-editor-wrapper", "border-visible-container"]
					}
				},
				{
					"operation": "insert",
					"parentName": "BorderVisibleContainer",
					"propertyName": "items",
					"name": "UseBorderTop",
					"values": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"controlConfig": {
							"className": "Terrasoft.CheckBoxEdit",
							"checked": "$UseBorderTop"
						},
						"caption": "$Resources.Strings.BorderTopLabelCaption",
						"markerValue": "UseBorderTop",
						"wrapClass": ["style-input"],
						"enabled": "$CanChangeBorders"
					}
				},
				{
					"operation": "insert",
					"parentName": "BorderVisibleContainer",
					"propertyName": "items",
					"name": "UseBorderBottom",
					"values": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"controlConfig": {
							"className": "Terrasoft.CheckBoxEdit",
							"checked": "$UseBorderBottom"
						},
						"caption": "$Resources.Strings.BorderBottomLabelCaption",
						"markerValue": "UseBorderBottom",
						"wrapClass": ["style-input"],
						"enabled": "$CanChangeBorders"
					}
				},
				{
					"operation": "insert",
					"parentName": "BorderVisibleContainer",
					"propertyName": "items",
					"name": "UseBorderLeft",
					"values": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"controlConfig": {
							"className": "Terrasoft.CheckBoxEdit",
							"checked": "$UseBorderLeft"
						},
						"caption": "$Resources.Strings.BorderLeftLabelCaption",
						"markerValue": "UseBorderLeft",
						"wrapClass": ["style-input"],
						"enabled": "$CanChangeBorders"
					}
				},
				{
					"operation": "insert",
					"parentName": "BorderVisibleContainer",
					"propertyName": "items",
					"name": "UseBorderRight",
					"values": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"controlConfig": {
							"className": "Terrasoft.CheckBoxEdit",
							"checked": "$UseBorderRight"
						},
						"caption": "$Resources.Strings.BorderRightLabelCaption",
						"markerValue": "UseBorderRight",
						"wrapClass": ["style-input"],
						"enabled": "$CanChangeBorders"
					}
				},

				// endregion

				{
					"operation": "insert",
					"parentName": "PropertiesContainer",
					"name": "CustomStylesControlGroup",
					"propertyName": "items",
					"values": {
						"caption": "$Resources.Strings.CustomStylesLabelCaption",
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"wrapClass": ["custom-styles-editor-wrapper"],
						"visible": "$isContentItemCustomStylesFeatureEnable"
					}
				},
				{
					"operation": "insert",
					"name": "ErrorItemConfig",
					"parentName": "CustomStylesControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.InvalidStylesJson",
						"classes": {"labelClass": ["content-item-styles-invalid"]},
						"visible": {
							"bindTo": "IsValid",
							"bindConfig": {
								"converter": "invertBooleanValue"
							}
						}
					}
				},
				{
					"name": "Styles",
					"operation": "insert",
					"parentName": "CustomStylesControlGroup",
					"propertyName": "items",
					"values": {
						"contentType": Terrasoft.ContentType.RICH_TEXT,
						"generator": "SourceCodeEditGenerator.generate",
						"id": "ContentItemStylesEditor",
						"markerValue": "ContentItemStylesEditor",
						"value": "$Styles",
						"focused": "$Focused",
						"useWorker": false
					}
				},
				{
					"operation": "insert",
					"name": "EmptyItemConfig",
					"parentName": "ContentItemStylesEditorContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.SelectContentItem",
						"visible": {
							"bindTo": "Config",
							"bindConfig": {
								"converter": "invertBooleanValue"
							}
						}
					}
				}
			]
		};
	});


