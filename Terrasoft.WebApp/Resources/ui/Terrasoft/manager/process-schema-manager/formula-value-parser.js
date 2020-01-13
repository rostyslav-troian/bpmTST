/**
 */
Ext.define("Terrasoft.manager.FormulaValueParser", {
	extend: "Terrasoft.FormulaParser",
	alternateClassName: "Terrasoft.FormulaValueParser",

	/**
	 * @inheritdoc Terrasoft.FormulaParser#getMacrosHandlers
	 * @protected
	 * @override
	 */
	getMacrosHandlers: function() {
		var handlers = Ext.create("Terrasoft.Collection");
		handlers.add(this.constants.SYS_SETTINGS_PREFIX, this.sysSettingsMacrosHandler);
		handlers.add(this.constants.LOOKUP_VALUE_PREFIX, this.lookupMacrosHandler);
		handlers.add(this.constants.COLUMN_VALUE_PREFIX, this.mainRecordMacrosHandler);
		handlers.add(this.constants.BOOLEAN_MACROS_PREFIX, this.booleanMacrosHandler);
		handlers.add(this.constants.CAPTION_PROPERTY_VALUE_MACROS, this.propertyValueMacrosHandler);
		handlers.add(this.constants.SYS_VARIABLE_PREFIX, this.sysVariableMacrosHandler);
		handlers.add(this.constants.DATE_VALUE_PREFIX, this.dateMacrosHandler);
		handlers.add(this.constants.TIME_VALUE_PREFIX, this.timeMacrosHandler);
		handlers.add(this.constants.DATE_TIME_VALUE_PREFIX, this.dateTimeMacrosHandler);
		return handlers;
	},

	/**
	 * @inheritdoc Terrasoft.FormulaParser#defaultMacrosHandler
	 * @protected
	 * @override
	 */
	defaultMacrosHandler: function(macros) {
		var mappingInfo = Terrasoft.FormulaParserUtils.getParameterMappingInfo(macros.getBody());
		Terrasoft.FormulaParserUtils.getParameterDisplayValue(mappingInfo, this.schema, function(displayValue) {
			var resultMacros = Ext.create("Terrasoft.FormulaMacros");
			if (displayValue) {
				resultMacros.addParameter(displayValue);
				this.endHandler(resultMacros);
			} else {
				this.endHandlerWithError(this.exceptions.InvalidParameterMessage, macros.getPrefix());
			}
		}, this);
	},

	/**
	 * System settings macros handler.
	 * @private
	 * @param macros {Terrasoft.FormulaMacros} Parsing macros.
	 */
	sysSettingsMacrosHandler: function(macros) {
		var service = Terrasoft.ServiceProvider;
		var sysSettingCode = macros.getSysSettingsCode();
		var config = {
			sysSettingsNameCollection: [sysSettingCode]
		};
		service.executeRequest(Terrasoft.SysSettings.querySettingsMethodName, config, function(result) {
			var sysSetting = result.values[sysSettingCode];
			if (!sysSetting) {
				var msgTemplate = this.resources.Messages.SysSettingValueNotFoundMessage;
				var msg = Ext.String.format(msgTemplate, sysSettingCode);
				this.log(msg, Terrasoft.LogMessageType.WARNING);
			}
			var sysSettingName = sysSetting ? sysSetting.name : "";
			var resultMacros = Terrasoft.FormulaMacros.prepareSysSettingDisplayValue(sysSettingName);
			this.endHandler(resultMacros);
		}, this);
	},

	/**
	 * Lookup macros handler.
	 * @private
	 * @param macros {Terrasoft.FormulaMacros} Parsing macros.
	 */
	lookupMacrosHandler: function(macros) {
		var packageUId = this.schema.getPackageUId();
		Terrasoft.FormulaParserUtils.getLookupDisplayValue(macros.getBody(), packageUId, function(result) {
			var resultMacros;
			if (result.errorMessage) {
				resultMacros = Ext.create("Terrasoft.FormulaMacros");
				resultMacros.addParameter(result.errorMessage);
			} else {
				resultMacros = Terrasoft.FormulaMacros.prepareLookupDisplayValue(result.schemaDisplayValue,
					result.value);
			}
			this.endHandler(resultMacros);
		}, this);
	},

	/**
	 * Main record macros handler.
	 * @private
	 * @param macros {Terrasoft.FormulaMacros} Parsing macros.
	 */
	mainRecordMacrosHandler: function(macros) {
		var entitySchema = this.schema.entitySchema;
		entitySchema.getColumnCaptionPathByMetaPath(macros.getChainWithoutPrefix(), function(captionPath) {
			var resultMacros = Terrasoft.FormulaMacros.prepareMainRecordDisplayValue(captionPath);
			this.endHandler(resultMacros);
		}, this);
	},

	/**
	 * Boolean macros handler.
	 * @private
	 * @param macros {Terrasoft.FormulaMacros} Parsing macros.
	 */
	booleanMacrosHandler: function(macros) {
		var booleanValue;
		switch(macros.getParameterAfterPrefix()) {
			case this.constants.BOOLEAN_MACROS_TRUE_VALUE:
				booleanValue = this.functions.BooleanDisplayTrueValue;
				break;
			case this.constants.BOOLEAN_MACROS_FALSE_VALUE:
				booleanValue = this.functions.BooleanDisplayFalseValue;
				break;
			default:
				this.endHandlerWithError(Terrasoft.Resources.Exception.NotImplementedException);
				return;
		}
		var resultMacros = Terrasoft.FormulaMacros.prepareBooleanDisplayValue(booleanValue);
		this.endHandler(resultMacros);
	},

	/**
	 * Property value macros handler.
	 * @private
	 * @param macros {Terrasoft.FormulaMacros} Parsing macros.
	 */
	propertyValueMacrosHandler: function(macros) {
		var propertyName;
		switch(macros.getPrefix()) {
			case this.constants.CAPTION_PROPERTY_VALUE_MACROS:
				propertyName = this.functions.CaptionPropertyValueDisplayPrefix;
				break;
			default:
				this.endHandlerWithError(Terrasoft.Resources.Exception.NotImplementedException);
				return;
		}
		var resultMacros = Terrasoft.FormulaMacros.preparePropertyDisplayValue(propertyName);
		this.endHandler(resultMacros);
	},

	/**
	 * System variable macros handler.
	 * @private
	 * @param macros {Terrasoft.FormulaMacros} Parsing macros.
	 */
	sysVariableMacrosHandler: function(macros) {
		var value = macros.getParameterAfterPrefix();
		var displayValue = "";
		this.constants.SYS_VARIABLES.some(function(sysVariable) {
			if (sysVariable.value === value) {
				displayValue = sysVariable.displayValue;
				return true;
			}
		});
		var resultMacros = Terrasoft.FormulaMacros.prepareSysVariableDisplayValue(displayValue);
		this.endHandler(resultMacros);
	},

	/**
	 * Date macros handler.
	 * @private
	 * @param macros {Terrasoft.FormulaMacros} Parsing macros.
	 */
	dateMacrosHandler: function(macros) {
		this.baseDateTimeMacrosHandler(Terrasoft.DataValueType.DATE, macros);
	},

	/**
	 * Time macros handler.
	 * @private
	 * @param macros {Terrasoft.FormulaMacros} Parsing macros.
	 */
	timeMacrosHandler: function(macros) {
		this.baseDateTimeMacrosHandler(Terrasoft.DataValueType.TIME, macros);
	},

	/**
	 * Date time macros handler.
	 * @private
	 * @param macros {Terrasoft.FormulaMacros} Parsing macros.
	 */
	dateTimeMacrosHandler: function(macros) {
		this.baseDateTimeMacrosHandler(Terrasoft.DataValueType.DATE_TIME, macros);
	},

	/**
	 * Base date time macros handler.
	 * @param {Terrasoft.DataValueType} dataValueType Date time data value type.
	 * @param {Terrasoft.FormulaMacros} macros Parsing macros.
	 */
	baseDateTimeMacrosHandler: function(dataValueType, macros){
		var value = macros.getChainWithoutPrefix();
		var config = Terrasoft.FormulaParserUtils.getDateTimeValueFormatConfig(dataValueType);
		var date = Ext.Date.parse(value, config.valueFormat) || Ext.Date.parse(value, config.displayFormat);
		var displayValue = Ext.Date.format(date, config.displayFormat);
		var prefixWithoutDot = config.displayPrefix.slice(0, -1);
		var resultMacros = Ext.create("Terrasoft.FormulaMacros");
		resultMacros.addParameter(prefixWithoutDot);
		resultMacros.addParameter(displayValue);
		this.endHandler(resultMacros);
	}
});
