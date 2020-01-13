Terrasoft.configuration.Structures["DateTimeMappingPage"] = {innerHierarchyStack: ["DateTimeMappingPage"]};
define('DateTimeMappingPageStructure', ['DateTimeMappingPageResources'], function(resources) {return {schemaUId:'eb2d8050-e02c-4c03-a031-17b0324fe22a',schemaCaption: "DateTimeMappingPage", parentSchemaName: "", schemaName:'DateTimeMappingPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DateTimeMappingPage", [
	"DateTimeMappingPageResources", "ModalBox", "GridUtilitiesV2"
], function(resources, ModalBox) {
	return {
		attributes: {
			/**
			 * Caption of the modalBox.
			 */
			"DateTimeModalBoxCaption": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Caption of the DateTimeEdit.
			 */
			"DateTimeEditCaption": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Date and time.
			 */
			"DateTime": {
				dataValueType: this.Terrasoft.DataValueType.DATE_TIME,
				"isRequired": true
			},

			/**
			 * Date.
			 */
			"Date": {
				dataValueType: this.Terrasoft.DataValueType.DATE,
				"isRequired": true
			},

			/**
			 * Time.
			 */
			"Time": {
				dataValueType: this.Terrasoft.DataValueType.TIME,
				"isRequired": true
			},

			/**
			 * Date and time element is enabled and visible.
			 */
			"IsDateTimeEnabled": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},

			/**
			 * Date element is enabled and visible.
			 */
			"IsDateEnabled": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},

			/**
			 * Time element is enabled and visible.
			 */
			"IsTimeEnabled": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			/**
			 * Current visible attribute name.
			 */
			"CurrentVisibleAttributeName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Current display prefix name.
			 */
			"CurrentDisplayPrefix": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Current culture format.
			 */
			"CurrentCultureFormat": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Process schema instance.
			 */
			"ProcessSchema": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		messages: {
			/**
			 * @message SetParametersInfo
			 * Specifies parameter values.
			 */
			"SetParametersInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message GetProcessSchema
			 * Returns process schema instance.
			 */
			"GetProcessSchema": {
				direction: Terrasoft.MessageDirectionType.PUBLISH,
				mode: Terrasoft.MessageMode.PTP
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {
			/**
			 * Initializes model.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @overridden
			 */
			init: function(callback) {
				this.callParent([
					function() {
						this.initAttributes();
						this.initValue();
						this.initProcessSchema();
						callback.call(this);
					}, this
				]);
			},

			/**
			 * Closes modal box.
			 * @private
			 */
			close: function() {
				ModalBox.close();
			},

			/**
			 * Initialize ProcessSchema attribute.
			 * @private
			 */
			initProcessSchema: function() {
				var schema = this.sandbox.publish("GetProcessSchema");
				this.set("ProcessSchema", schema);
			},

			/**
			 * Initializes control values.
			 * @private
			 */
			initValue: function() {
				var currentElement = this.get("CurrentVisibleAttributeName");
				var presentDateValue = this.getPresentDate();
				var dateValue = presentDateValue ? presentDateValue : new Date();
				this.set(currentElement, dateValue);
			},

			/**
			 * Initializes page attributes.
			 * @private
			 */
			initAttributes: function() {
				var pageConfig = this.get("PageConfig");
				this.set("DataValueType", pageConfig.DataValueType);
				var itemDataValueType = pageConfig.itemDataValueType;
				var formatConfig = Terrasoft.FormulaParserUtils.getDateTimeValueFormatConfig(itemDataValueType);
				var isVisibleAttributeName = Ext.String.format("Is{0}Enabled", formatConfig.dateValueTypeInCamelCase);
				var baseCaption = this.get("Resources.Strings.SelectionBaseCaption");
				var caption = this.getCaption(formatConfig.dateValueTypeInCamelCase);
				var modalBoxCaption = Ext.String.format("{0} {1}", baseCaption, caption);
				this.set(isVisibleAttributeName, true);
				this.set("CurrentVisibleAttributeName", formatConfig.dateValueTypeInCamelCase);
				this.set("DateTimeModalBoxCaption", modalBoxCaption);
				this.set("DateTimeEditCaption", caption);
				this.set("CurrentCultureFormat", formatConfig.displayFormat);
				this.set("CurrentDisplayPrefix", formatConfig.displayPrefix);
			},

			/**
			 * Returns caption.
			 * @private
			 * [@return] {String} Caption value;
			 */
			getCaption: function(attributeName) {
				var captionResourceName = Ext.String.format("Resources.Strings.Selection{0}Caption", attributeName);
				return this.get(captionResourceName);
			},

			/**
			 * Returns parameter value.
			 * @private
			 * [@return] {String} parameter value;
			 */
			getParameterValues: function() {
				var dateTimeKind = this.get("CurrentVisibleAttributeName");
				var value = this.get(dateTimeKind);
				if (!value) {
					return null;
				}
				var currentCultureFormat = this.get("CurrentCultureFormat");
				var valueDisplayPrefix = this.get("CurrentDisplayPrefix");
				var dateDisplayValue = Ext.Date.format(value, currentCultureFormat);
				return Ext.String.format("{0}{1}", valueDisplayPrefix, dateDisplayValue);
			},

			/**
			 * @inheritdoc Terrasoft.ProcessMappingPage#getPreparedFormulaResult
			 * @overridden
			 * @param {String} displayValue display value.
			 * @param {String} value The formula source value.
			 * @return {Object} Selected data.
			 * @return {String} return.value Resulted value.
			 * @return {String} return.displayValue Resulted display value.
			 * @return {Number} return.source Resulted parameter value source.
			 * @return {GUID} return.referenceSchemaUId Resulted reference schema identifier.
			 */
			getPreparedFormulaResult: function(displayValue, value) {
				var result = {
					value: value,
					displayValue: displayValue,
					source: Ext.isEmpty(value)
							? Terrasoft.ProcessSchemaParameterValueSource.None
							: Terrasoft.ProcessSchemaParameterValueSource.Script,
					dataValueType: this.get("DataValueType")
				};
				return result;
			},

			/**
			 * @inheritdoc Terrasoft.ProcessMappingPage#getFormulaValue
			 * @overridden
			 * @param {String} displayValue display value.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			getFormulaValue: function(displayValue, callback, scope) {
				var config = {
					displayValue: displayValue,
					schema: this.get("ProcessSchema"),
					dataValueType: this.get("DataValueType"),
					parameterName: this.get("ParameterName"),
					elementName: this.get("ElementName")
				};
				Terrasoft.FormulaParserUtils.validateValue(config, callback, scope);
			},

			/**
			 * Returns present date.
			 * @private
			 * @return {Date | null} Present Date .
			 */
			getPresentDate: function() {
				var value = null;
				var checkResult = this.getPresentDateValidationConfig();
				if (!checkResult.valid) {
					return value;
				}
				var displayMacrosBody = checkResult.match[1];
				var displayMacrosParams = displayMacrosBody.split(Terrasoft.process.constants.MACROS_SEPARATOR);
				var displayPrefix =  displayMacrosParams.shift();
				var dataValueType = this.convertDisplayPrefixToDataValueType(displayPrefix);
				if (Terrasoft.isDateDataValueType(dataValueType)) {
					var formatConfig = Terrasoft.FormulaParserUtils.getDateTimeValueFormatConfig(dataValueType);
					value = Ext.Date.parse(displayMacrosParams, formatConfig.displayFormat);
				}
				return value;
			},

			/**
			 * Returns data value type.
			 * @private
			 * @param {String} displayPrefix Date display prefix.
			 * @return {Terrasoft.DataValueType | null}
			 */
			convertDisplayPrefixToDataValueType: function(displayPrefix) {
				var dateValueType;
				var resources = Terrasoft.Resources.ProcessSchemaDesigner.Functions;
				switch (displayPrefix) {
					case resources.DateValueDisplayPrefix:
						dateValueType = Terrasoft.DataValueType.DATE;
						break;
					case resources.TimeValueDisplayPrefix:
						dateValueType = Terrasoft.DataValueType.TIME;
						break;
					case resources.DateTimeValueDisplayPrefix:
						dateValueType = Terrasoft.DataValueType.DATE_TIME;
						break;
					default:
						dateValueType = null;
						break;
				}
				return dateValueType;
			},

			/**
			 * Returns present date.
			 * @private
			 * @return {Object} validation config.
			 * @return {Array} return.match Resulted displayMacros.
			 * @return {Boolean} return.valid Validation value.
			 */
			getPresentDateValidationConfig: function() {
				var pageConfig = this.get("PageConfig");
				var config = {
					valid: false,
					match: null
				};
				var displayValue = pageConfig.presentDisplayValue;
				if (displayValue) {
					var parameterRegex = Ext.clone(Terrasoft.process.constants.PARAMETER_REGEX);
					var match = parameterRegex.exec(displayValue);
					parameterRegex.lastIndex = 0;
					if (match) {
						config = {
							valid: true,
							match: match
						};
					}
				}
				return config;
			},

			/**
			 * Handles a click on the "Save" button.
			 * @private
			 */
			onSaveClick: function() {
				var sandbox = this.sandbox;
				var parameterDisplayValue = this.getParameterValues();
				var displayValue = Terrasoft.ProcessSchemaDesignerUtilities.addParameterMask(parameterDisplayValue);
				this.getFormulaValue(displayValue, function(result) {
					if (result.isValid) {
						var parameterInfo = this.getPreparedFormulaResult(displayValue, result.value);
						sandbox.publish("SetParametersInfo", parameterInfo, [sandbox.id]);
					}
				}, this);
			}
		},

		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "fixed-area-container",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["modal-page-fixed-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "fixed-area-container",
				"propertyName": "items",
				"name": "headContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["header"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "headContainer",
				"propertyName": "items",
				"name": "header-name-container",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["header-name-container", "header-name-container-full"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "header-name-container",
				"propertyName": "items",
				"name": "ModalBoxCaption",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "DateTimeModalBoxCaption"}
				}
			},
			{
				"operation": "insert",
				"parentName": "fixed-area-container",
				"propertyName": "items",
				"name": "close-icon",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {"bindTo": "Resources.Images.CloseIcon"},
					"classes": {"wrapperClass": ["close-btn-user-class"]},
					"click": {"bindTo": "close"}
				}
			}, {
				"operation": "insert",
				"parentName": "fixed-area-container",
				"propertyName": "items",
				"name": "utils-area-editPage",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["utils-container-modal-page"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "utils-area-editPage",
				"propertyName": "items",
				"name": "SaveButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
					"click": {"bindTo": "onSaveClick"},
					"classes": {"textClass": ["utils-buttons"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "center-area-editPage",
				"name": "FormulaEdit",
				"propertyName": "items",
				"values": {
					"id": "ProcessMappingPageFormulaEditTextEdit",
					"className": "Terrasoft.FormulaInlineTextEdit",
					"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"labelConfig": {
						"visible": false
					},
					"visible": {
						bindTo: "FormulaTextEditVisible"
					},
					"selectedText": {bindTo: "SelectedText"},
					"value": {bindTo: "FormulaText"},
					"placeholder": {"bindTo": "Resources.Strings.PlaceholderCaption"},
					"wrapClass": ["formula-edit-control"]
				}
			},
			{
				"operation": "insert",
				"parentName": "utils-area-editPage",
				"propertyName": "items",
				"name": "CancelButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
					"click": {"bindTo": "close"},
					"classes": {"textClass": ["utils-buttons"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "fixed-area-container",
				"propertyName": "items",
				"name": "CenterArea",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["controls-container-modal-page"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DateTimeContainer",
				"parentName": "CenterArea",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["date-time-container-modal-page"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "CenterArea",
				"propertyName": "items",
				"name": "DateTime",
				"values": {
					"bindTo": "DateTime",
					"name": "DateTime",
					"visible": {"bindTo": "IsDateTimeEnabled"},
					"caption": {"bindTo": "DateTimeEditCaption"}
				}
			},
			{
				"operation": "insert",
				"parentName": "DateTimeContainer",
				"propertyName": "items",
				"name": "Date",
				"values": {
					"bindTo": "Date",
					"name": "Date",
					"visible": {"bindTo": "IsDateEnabled"},
					"caption": {"bindTo": "DateTimeEditCaption"}
				}
			},
			{
				"operation": "insert",
				"parentName": "DateTimeContainer",
				"propertyName": "items",
				"name": "Time",
				"values": {
					"bindTo": "Time",
					"name": "Time",
					"visible": {"bindTo": "IsTimeEnabled"},
					"caption": {"bindTo": "DateTimeEditCaption"}
				}
			}

		]/**SCHEMA_DIFF*/
	};
});


