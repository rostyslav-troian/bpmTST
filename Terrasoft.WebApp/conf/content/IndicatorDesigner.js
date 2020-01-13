Terrasoft.configuration.Structures["IndicatorDesigner"] = {innerHierarchyStack: ["IndicatorDesigner"], structureParent: "BaseAggregationWidgetDesigner"};
define('IndicatorDesignerStructure', ['IndicatorDesignerResources'], function(resources) {return {schemaUId:'f8a522bf-4c2f-4c42-9808-fabf7e5dd788',schemaCaption: "Metric designer", parentSchemaName: "BaseAggregationWidgetDesigner", schemaName:'IndicatorDesigner',parentSchemaUId:'546df09a-8caa-4348-8b0d-ecbbc99f3e1e',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("IndicatorDesigner", ["terrasoft", "IndicatorDesignerResources"],
	function(Terrasoft, resources) {
		var localizableStrings = resources.localizableStrings;
		return {
			messages: {

				/**
				 * ######## ## ######### ### ######### ########## ############# ###### ##########.
				 */
				"GetIndicatorConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * ########## ######### ### ######### ##########.
				 */
				"GenerateIndicator": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}

			},
			attributes: {
				/**
				 * ######### #######.
				 */
				caption: {
					value: localizableStrings.NewWidget
				},

				/**
				 * ##### ##########.
				 */
				style: {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					value: Terrasoft.DashboardEnums.WidgetColor["widget-blue"]
				},

				/**
				 * ##### ##########.
				 */
				fontStyle: {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					value: {
						value: "default-indicator-font-size",
						displayValue: localizableStrings.FontStyleDefault
					}
				},

				/**
				 * ###### ##########.
				 */
				format: {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: false,
					value: {
						"textDecorator": "{0}",
						"thousandSeparator": Terrasoft.Resources.CultureSettings.thousandSeparator,
						"type": Terrasoft.DataValueType.FLOAT,
						"dateFormat": Terrasoft.Resources.CultureSettings.dateFormat
					}
				},

				/**
				 * ######### #######.
				 */
				formatCaption: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}

			},
			methods: {

				/**
				 * ########## ######## ######### ######### ######## ###### #######.
				 * @protected
				 * @virtual
				 * @return {String} ########## ######## ######### ######### ######## ###### #######.
				 */
				getWidgetConfigMessage: function() {
					return "GetIndicatorConfig";
				},

				/**
				 * ########## ######## ######### ########## #######.
				 * @protected
				 * @virtual
				 * @return {String} ########## ######## ######### ########## #######.
				 */
				getWidgetRefreshMessage: function() {
					return "GenerateIndicator";
				},

				/**
				 * ########## ###### ########### ####### ###### ####### # ###### ######### #######.
				 * @protected
				 * @virtual
				 * @return {Object} ########## ###### ########### ####### ###### ####### # ###### ######### #######.
				 */
				getWidgetModulePropertiesTranslator: function() {
					var widgetModulePropertiesTranslator = {
						aggregationColumn: "columnName",
						style: "style",
						fontStyle: "fontStyle",
						format: "format"
					};
					return Ext.apply(this.callParent(arguments), widgetModulePropertiesTranslator);
				},

				/**
				 * ########## ######## ###### #######.
				 * @protected
				 * @virtual
				 * @return {String} ########## ######## ###### #######.
				 */
				getWidgetModuleName: function() {
					return "IndicatorModule";
				},

				/**
				 * @inheritdoc Terrasoft.BaseWidgetDesigner#setAttributeDisplayValue
				 * ############ ######## ### ####### #####.
				 * @protected
				 * @overridden
				 */
				setAttributeDisplayValue: function(propertyName, propertyValue) {
					switch (propertyName) {
						case "style":
							propertyValue = this.getStyleLookupValue(propertyValue);
							break;
						case "fontStyle":
							propertyValue = this.getFontStyleLookupValue(propertyValue);
							break;
						default:
							this.callParent(arguments);
							return;
					}
					this.set(propertyName, propertyValue);
				},

				/**
				 * ########## ###### ######## #####.
				 * @protected
				 * @virtual
				 * @param {String} styleValue ######## #####.
				 * @return {Object} ########## ###### ######## #####.
				 */
				getStyleLookupValue: function(styleValue) {
					var styleDefaultConfig = this.getStyleDefaultConfig();
					return styleDefaultConfig[styleValue];
				},

				/**
				 * ########## ###### ######## ##### #######.
				 * @protected
				 * @virtual
				 * @param {String} fontStyleValue ######## ##### #######.
				 * @return {Object} ########## ###### ######## ##### #######.
				 */
				getFontStyleLookupValue: function(fontStyleValue) {
					var fontStyleDefaultConfig = this.getFontStyleDefaultConfig();
					return fontStyleDefaultConfig[fontStyleValue];
				},

				/**
				 * ########## ###### ######.
				 * @protected
				 * @virtual
				 * @return {Object} ########## ###### ######.
				 */
				getStyleDefaultConfig: function() {
					return Terrasoft.DashboardEnums.WidgetColor;
				},

				/**
				 * ######### ######### ######.
				 * @protected
				 * @virtual
				 * @param {String} filter ###### ##########.
				 * @param {Terrasoft.Collection} list ######.
				 */
				prepareStyleList: function(filter, list) {
					if (list === null) {
						return;
					}
					list.clear();
					list.loadAll(this.getStyleDefaultConfig());
				},

				/**
				 * ########## ###### ###### ########.
				 * @protected
				 * @virtual
				 * @return {Object} ########## ###### ###### ########.
				 */
				getFontStyleDefaultConfig: function() {
					var fontStyleDefaultConfig = {
						"default-indicator-font-size": {
							value: "default-indicator-font-size",
							displayValue: this.get("Resources.Strings.FontStyleDefault")
						},
						"big-indicator-font-size": {
							value: "big-indicator-font-size",
							displayValue: this.get("Resources.Strings.FontStyleBig")
						}
					};
					return fontStyleDefaultConfig;
				},

				/**
				 * ######### ######### ###### ########.
				 * @protected
				 * @virtual
				 * @param {String} filter ###### ##########.
				 * @param {Terrasoft.Collection} list ######.
				 */
				prepareFontStyleList: function(filter, list) {
					if (list === null) {
						return;
					}
					list.clear();
					list.loadAll(this.getFontStyleDefaultConfig());
				},

				/**
				 * ########## ### ###### ######## ##########.
				 * @protected
				 * @virtual
				 * @return {Terrasoft.DataValueType} ########## ### ###### ######## ##########.
				 */
				getValueDataValueType: function() {
					var result = Terrasoft.DataValueType.TEXT;
					var aggregationType = this.get("aggregationType");
					var columnDataValueType = this.get("aggregationColumn");
					if (aggregationType && (aggregationType.value === Terrasoft.AggregationType.COUNT)) {
						result = Terrasoft.DataValueType.INTEGER;
					} else if (!this.Ext.isEmpty(columnDataValueType)) {
						result = columnDataValueType.dataValueType;
					}
					return result;
				},

				/**
				 * ########## ###### ######## ### ########## ##############.
				 * @protected
				 * @virtual
				 * @return {String} ########## ###### ######## ### ########## ##############.
				 */
				getFormatValueTemplate: function() {
					var result;
					var format = this.get("format");
					var dataValueType = this.getValueDataValueType();
					switch (dataValueType) {
						case Terrasoft.DataValueType.INTEGER:
						case Terrasoft.DataValueType.FLOAT:
						case Terrasoft.DataValueType.MONEY:
							var numberTemplate = 1000000.00;
							result = Terrasoft.getFormattedNumberValue(numberTemplate, format);
							break;
						case Terrasoft.DataValueType.TIME:
						case Terrasoft.DataValueType.DATE_TIME:
						case Terrasoft.DataValueType.DATE:
							var dateTemplate = new Date();
							var dateFormat = format.dateFormat || Terrasoft.Resources.CultureSettings.dateFormat;
							result = this.Ext.Date.format(dateTemplate, dateFormat);
							break;
					}
					return result;
				},

				/**
				 * ########## ###### ######### ########### #### ######### #######.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.DataValueType} dataValueType ### ###### ##########.
				 * @return {Object} ########## ###### ######### ########### #### ######### #######.
				 */
				getFormatSettingsConfig: function(dataValueType) {
					var format = this.get("format");
					var config = {
						textDecorator: {
							dataValueType: Terrasoft.DataValueType.TEXT,
							caption: this.get("Resources.Strings.FormatTextLabel"),
							value: format.textDecorator,
							description: this.get("Resources.Strings.FormatTextDescription")
						}
					};
					var decimalPrecision = (this.Ext.isDefined(format.decimalPrecision)) ? format.decimalPrecision :
						(format.type === Terrasoft.DataValueType.FLOAT && 2 || 0);
					switch (dataValueType) {
						case Terrasoft.DataValueType.INTEGER:
						case Terrasoft.DataValueType.FLOAT:
						case Terrasoft.DataValueType.MONEY:
							var numberFormatConfig = {
								decimalPrecision: {
									dataValueType: Terrasoft.DataValueType.INTEGER,
									caption: this.get("Resources.Strings.FormatDecimalPrecision"),
									value: decimalPrecision,
									description: this.get("Resources.Strings.FormatDecimalPrecisionDescription")
								}
							};
							this.Ext.apply(config, numberFormatConfig);
							break;
						case Terrasoft.DataValueType.TIME:
						case Terrasoft.DataValueType.DATE_TIME:
						case Terrasoft.DataValueType.DATE:
							var dateFormat = format.dateFormat;
							var dateFormatConfig = {
								dateFormatWithTime: {
									dataValueType: Terrasoft.DataValueType.BOOLEAN,
									caption: this.get("Resources.Strings.FormatDateTime"),
									value: dateFormat && (dateFormat !== Terrasoft.Resources.CultureSettings.dateFormat),
									description: this.get("Resources.Strings.FormatDateTimeDescription")

								}
							};
							this.Ext.apply(config, dateFormatConfig);
							break;
					}
					return config;
				},

				/**
				 * ##### ######### ######## ########### #### ######### #######.
				 * @protected
				 * @virtual
				 * @param {String} returnCode ### ######## ####.
				 * @param {Object} controlData ###### ######### ######### ##########.
				 */
				onFormatSettingsClose: function(returnCode, controlData) {
					if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
						var format = {};
						Terrasoft.each(controlData, function(property, propertyName) {
							var propertyValue = property.value;
							if (propertyName === "textDecorator") {
								format[propertyName] = propertyValue || "{0}";
							} else if (propertyName === "dateFormatWithTime") {
								var dateFormatPropertyName = "dateFormat";
								if (propertyValue) {
									var dateFormat = this.Ext.String.format(
										"{0} {1}",
										Terrasoft.Resources.CultureSettings.dateFormat,
										Terrasoft.Resources.CultureSettings.timeFormat
									);
									format[dateFormatPropertyName] = dateFormat;
								} else {
									format[dateFormatPropertyName] = Terrasoft.Resources.CultureSettings.dateFormat;
								}
							} else if (propertyName === "decimalPrecision") {
								var dataValueTypePropertyName = "type";
								format[dataValueTypePropertyName] = (propertyValue)
									? Terrasoft.DataValueType.FLOAT
									: Terrasoft.DataValueType.INTEGER;
								format[propertyName] = propertyValue;
							} else {
								format[propertyName] = propertyValue;
							}
						}, this);
						this.set("format", format);
					}
				},

				/**
				 * ##### ######## ########### #### ######### #######.
				 * @protected
				 * @virtual
				 */
				openFormatSettings: function() {
					var dataValueType = this.getValueDataValueType();
					var formatSettingConfig = this.getFormatSettingsConfig(dataValueType);
					Terrasoft.utils.inputBox(
						this.get("Resources.Strings.FormatLabel"),
						this.onFormatSettingsClose,
						["yes", "cancel"],
						this,
						formatSettingConfig,
						{ defaultButton: 0 }
					);
				}
			},
			diff: [
				{
					"operation": "insert",
					"name": "Style",
					"parentName": "FormatProperties",
					"propertyName": "items",
					"values": {
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"bindTo": "style",
						"labelConfig": {
							"visible": true,
							"caption": {
								"bindTo": "Resources.Strings.StyleLabel"
							}
						},
						"controlConfig": {
							"className": "Terrasoft.ComboBoxEdit",
							"prepareList": {
								"bindTo": "prepareStyleList"
							},
							"list": {
								"bindTo": "styleList"
							}
						}
					}
				},
				{
					"operation": "insert",
					"name": "FontStyle",
					"parentName": "FormatProperties",
					"propertyName": "items",
					"values": {
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"bindTo": "fontStyle",
						"labelConfig": {
							"visible": true,
							"caption": {
								"bindTo": "Resources.Strings.FontStyleLabel"
							}
						},
						"controlConfig": {
							"className": "Terrasoft.ComboBoxEdit",
							"prepareList": {
								"bindTo": "prepareFontStyleList"
							},
							"list": {
								"bindTo": "fontStyleList"
							}
						}
					}
				},
				{
					"operation": "insert",
					"name": "FormatValue",
					"parentName": "FormatProperties",
					"propertyName": "items",
					"values": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"bindTo": "getFormatValueTemplate",
						"labelConfig": {
							"visible": true,
							"caption": {
								"bindTo": "Resources.Strings.FormatLabel"
							}
						},
						"classes": { "wrapClass": ["lookup-only-editable"] },
						"controlConfig": {
							"className": "Terrasoft.TextEdit",
							"readonly": true,
							"rightIconClick": {
								"bindTo": "openFormatSettings"
							},
							"rightIconClasses": ["lookup-edit-right-icon"]
						}
					}
				}
			]
		};
	});


