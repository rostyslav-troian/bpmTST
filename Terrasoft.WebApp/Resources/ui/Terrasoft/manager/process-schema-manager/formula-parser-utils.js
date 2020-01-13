/**
 */
Ext.define("Terrasoft.utils.FormulaParserUtils", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.FormulaParserUtils",
	singleton: true,

	//region Methods: Private

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.validatePrefixResources();
	},

	/**
	 * Replaces function code to display value.
	 * @private
	 * @param {String} value The expression of formula.
	 * @return {String} The expression of formula with replaced function macros.
	 */
	replaceFunctionsValueToDisplayValue: function(value) {
		var displayValue = value;
		Terrasoft.each(Terrasoft.process.constants.FUNCTIONS, function(func) {
			var valuePrefix = func.value + "(";
			var displayValuePrefix = func.displayValue;
			var index = displayValuePrefix.indexOf("{0}");
			displayValuePrefix = displayValuePrefix.substring(0, index);
			displayValue = displayValue.split(valuePrefix).join(displayValuePrefix);
		});
		return displayValue;
	},

	/**
	 * Replaces function display value to code.
	 * @private
	 * @param {String} displayValue The display expression of formula.
	 * @return {String} The expression of formula with replaced function display value.
	 */
	replaceFunctionsDisplayValueToValue: function(displayValue) {
		var value = displayValue;
		Terrasoft.each(Terrasoft.process.constants.FUNCTIONS, function(func) {
			var valuePrefix = func.value + "(";
			var displayValuePrefix = func.displayValue;
			var index = displayValuePrefix.indexOf("(");
			displayValuePrefix = displayValuePrefix.substring(0, index + 1);
			value = value.split(displayValuePrefix).join(valuePrefix);
		});
		return value;
	},

	/**
	 * Returns format config for time, date, dateTime.
	 * @param {Terrasoft.DataValueType} dataValueType The data value type.
	 * @return {Object}
	 */
	getDateTimeValueFormatConfig: function(dataValueType) {
		var resources = Terrasoft.Resources.ProcessSchemaDesigner.Functions;
		var constants = Terrasoft.process.constants;
		var exceptions = Terrasoft.Resources.ProcessSchemaDesigner.Exceptions;
		switch (dataValueType) {
			case Terrasoft.DataValueType.DATE:
				return {
					valuePrefix: constants.DATE_VALUE_PREFIX + constants.MACROS_SEPARATOR,
					valueFormat: constants.DATE_VALUE_FORMAT,
					displayPrefix: this.prepareDisplayPrefix(resources.DateValueDisplayPrefix),
					displayFormat: Terrasoft.Resources.CultureSettings.dateFormat,
					invalidMessageTemplate: exceptions.InvalidDateMessage,
					dateValueTypeInCamelCase: constants.DATE_TIME_VALUE_TYPE_NAME_IN_CAMEL_CASE.DATE
				};
			case Terrasoft.DataValueType.TIME:
				return {
					valuePrefix: constants.TIME_VALUE_PREFIX + constants.MACROS_SEPARATOR,
					valueFormat: constants.TIME_VALUE_FORMAT,
					displayPrefix: this.prepareDisplayPrefix(resources.TimeValueDisplayPrefix),
					displayFormat: Terrasoft.Resources.CultureSettings.timeFormat,
					invalidMessageTemplate: exceptions.InvalidTimeMessage,
					dateValueTypeInCamelCase: constants.DATE_TIME_VALUE_TYPE_NAME_IN_CAMEL_CASE.TIME
				};
			case Terrasoft.DataValueType.DATE_TIME:
				return {
					valuePrefix: constants.DATE_TIME_VALUE_PREFIX + constants.MACROS_SEPARATOR,
					valueFormat: constants.DATE_TIME_VALUE_FORMAT,
					displayPrefix: this.prepareDisplayPrefix(resources.DateTimeValueDisplayPrefix),
					displayFormat: this.getDateTimeDisplayFormat(),
					invalidMessageTemplate: exceptions.InvalidDateTimeMessage,
					dateValueTypeInCamelCase: constants.DATE_TIME_VALUE_TYPE_NAME_IN_CAMEL_CASE.DATE_TIME
				};
			default:
				throw new Terrasoft.exceptions.NotImplementedException({
					message: Ext.String.format("DataValueType \"{0}\" is not implemented", dataValueType)
				});
		}
	},

	/**
	 * Returns display format for dateTime.
	 * @return {String}
	 */
	getDateTimeDisplayFormat: function() {
		return Ext.String.format("{0} {1}",
			Terrasoft.Resources.CultureSettings.dateFormat,
			Terrasoft.Resources.CultureSettings.timeFormat);
	},

	/**
	 * Loads entity schema display value by Id.
	 * @private
	 * @param {Terrasoft.EntitySchema} entitySchema The entity schema.
	 * @param {String} recordId The unique identifier of record in schema.
	 * @param {Function} callback The callback function.
	 */
	loadLookupDisplayValue: function(entitySchema, recordId, callback) {
		var displayValue;
		var idColumnAlias = "Id";
		var displayColumnAlias = "displayValue";
		var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
			rootSchema: entitySchema
		});
		esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, idColumnAlias);
		esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, displayColumnAlias);
		esq.filters.addItem(esq.createColumnFilterWithParameter(
			Terrasoft.ComparisonType.EQUAL, idColumnAlias, recordId));
		esq.getEntityCollection(function(response) {
			var collection = response.collection;
			if (response.success && collection && !collection.isEmpty()) {
				var item = collection.getByIndex(0);
				displayValue = item.get(displayColumnAlias);
			} else {
				if (response.errorInfo) {
					var errorMessage = response.errorInfo.message;
					this.log(errorMessage);
				}
				var messages = Terrasoft.Resources.ProcessSchemaDesigner.Messages;
				displayValue = messages.RecordNotFoundMessage;
			}
			callback(displayValue);
		}, this);
	},

	/**
	 * Returns parameter macros display value prefix.
	 * @private
	 * @param {Object} mappingInfo The info of mapping.
	 * @param {Terrasoft.ProcessSchemaParameter} parameter The parameter of process schema.
	 * @param {Terrasoft.ProcessSchema} processSchema The instance of process schema.
	 * @return {String}
	 */
	getParameterDisplayValuePrefix: function(mappingInfo, parameter, processSchema) {
		var utils = Terrasoft.ProcessSchemaDesignerUtilities;
		var schemaElementUId = mappingInfo.schemaElementUId;
		var flowElement = schemaElementUId ? processSchema.findItemByUId(schemaElementUId) : null;
		const caption = (Terrasoft.Features.getIsEnabled("ProcessParameterCollections") || Terrasoft.isDebug)
			? parameter.getFullCaption()
			: utils.getElementCaption(parameter);
		var displayValue = flowElement
			? Ext.String.format("{0}{1}{2}", utils.getElementCaption(flowElement),
				Terrasoft.process.constants.MACROS_SEPARATOR, caption)
			: caption;
		return displayValue;
	},

	/**
	 * Returns macros display value.
	 * @param {String} macrosBody Value macros body string.
	 * @param {Object} processSchema Process schema of macros.
	 * @param {Function} callback Result callback.
	 * @param {String} callback.displayValue Macros display value.
	 * @param {Array} callback.unrecognizedMacroses Unrecognized macroses.
	 * @param {Object} scope Result callback scope.
	 */
	getMacrosDisplayValue: function(macrosBody, processSchema, callback, scope) {
		var valueMacros = Terrasoft.ProcessSchemaDesignerUtilities.addParameterMask(macrosBody);
		var macrosValueParser = Ext.create("Terrasoft.FormulaValueParser", {
			formula: valueMacros,
			schema: processSchema
		});
		macrosValueParser.parse(function(macroses, unrecognizedMacroses) {
			var isValid = Ext.isEmpty(unrecognizedMacroses);
			var displayValue = valueMacros;
			if (isValid) {
				var displayValueMacros = macroses.get(valueMacros);
				displayValue = Terrasoft.ProcessSchemaDesignerUtilities.removeParameterMask(displayValueMacros);
			}
			Ext.callback(callback, scope, [displayValue, unrecognizedMacroses]);
		});
	},

	/**
	 * Replace macros display value by formulaParameter collection.
	 * @private
	 * @param {String} displayValue The display value of formula.
	 * @param {Terrasoft.Collection} formulaParameters The collection of formula parameters.
	 * @return {String} The value of formula.
	 */
	getFormulaValueByCollection: function(displayValue, formulaParameters) {
		var value = displayValue;
		formulaParameters.eachKey(function(displayMacros, macros) {
			value = value.split(displayMacros).join(macros);
		}, this);
		return value;
	},

	/**
	 * Replaces macros value by parameters of the formula collection.
	 * @private
	 * @param {String} value The value of formula.
	 * @param {Terrasoft.Collection} formulaParameters The collection of formula parameters.
	 * @return {String} The display value of formula.
	 */
	getFormulaDisplayValueByCollection: function(value, formulaParameters) {
		var displayValue = value;
		formulaParameters.eachKey(function(macros, displayMacros) {
			displayValue = displayValue.split(macros).join(displayMacros);
		});
		return displayValue;
	},

	/**
	 * Validates the formula value on the server side.
	 * @private
	 * @param {Object} config Validation config.
	 * @param {ProcessSchema} config.schema The process schema.
	 * @param {String} config.formulaValue The formula value.
	 * @param {Terrasoft.core.enums.DataValueType} [config.resultDataValueType] The result dataValueType.
	 * @param {String} config.parameterName The parameter name.
	 * @param {String} [config.elementName] The element, that the parameter belongs to.
	 * @param {Function} callback The callback function.
	 * @param {Object} [scope] The callback function scope.
	 */
	validateServerFormulaValue: function(config, callback, scope) {
		var resultDataValueType = config.resultDataValueType;
		if (Ext.isEmpty(resultDataValueType)) {
			callback.call(scope, {isValid: true});
			return;
		}
		var schema = config.schema;
		var resources = {};
		schema.getLocalizableValues(resources);
		var resultDataValueTypeUId = Terrasoft.convertToServerDataValueType(config.resultDataValueType);
		var data = {
			formulaValue: config.formulaValue,
			resultDataValueTypeUId: resultDataValueTypeUId,
			parameterName: config.parameterName,
			elementName: config.elementName,
			metaData: schema.serialize(),
			resources: resources,
			uId: schema.uId,
			changedItems: schema.changedItems
		};
		var serverMethodName = schema.getValidateFormulaServerMethodName();
		Terrasoft.ServiceProvider.execute({
			serverMethod: serverMethodName,
			data: data
		}, callback, scope);
	},

	/**
	 * Handles response for the server validation request.
	 * @private
	 * @param {Object} serverValidationInfo The server validation result info.
	 * @param {Boolean} serverValidationInfo.isValid Indicates that formula was validated successfully.
	 * @param {String} [serverValidationInfo.errorMessage] Error message for validation.
	 * @param {Object} validationResult Summary validation result.
	 * @param {Function} callback The callback function.
	 * @param {Object} callback.validationResult The summary validation result.
	 * @param {Object} scope The The callback function context.
	 */
	handleServerValidationResponse: function(serverValidationInfo, validationResult, callback, scope) {
		if (serverValidationInfo.isValid) {
			callback.call(scope, validationResult);
			return;
		}
		validationResult.isValid = false;
		validationResult.errorMessage = serverValidationInfo.errorMessage;
		callback.call(scope, validationResult);
	},

	//endregion

	//region Methods: Public

	/**
	 * Returns formula display value by the formula value in callback function.
	 * @param {String} value The value parameter.
	 * @param {Terrasoft.ProcessSchema} schema The instance of process schema.
	 * @param {Function} callback The callback function.
	 * @param {Function} callback.displayValue The display value of formula.
	 * @param {Object} scope The scope of callback function.
	 */
	getFormulaDisplayValue: function(value, schema, callback, scope) {
		if (Ext.isEmpty(value)) {
			callback.call(scope, value);
			return;
		}
		value = value.split(Terrasoft.process.constants.TERRASOFT_COMMON_NAMESPACE).join("");
		value = this.replaceFunctionsValueToDisplayValue(value);
		var valueParser = Ext.create("Terrasoft.FormulaValueParser", {
			formula: value,
			schema: schema
		});
		valueParser.parse(function(formulaParameters, unrecognizedMacroses) {
			value = this.getFormulaDisplayValueByCollection(value, formulaParameters);
			callback.call(scope, value, formulaParameters, unrecognizedMacroses);
		}, this);
	},

	/**
	 * Returns meta path macros display value.
	 * @param {String} macrosBody The text of expression macros.
	 * @param {Terrasoft.ProcessSchema} processSchema The instance of process schema.
	 * @param {Function} callback The callback function.
	 * @param {String} callback.displayValue The display value of parameter.
	 * @param {Object} scope The scope of callback function.
	 */
	getMetaPathDisplayValue: function(macrosBody, processSchema, callback, scope) {
		var mappingInfo = this.getMetaPathMappingInfo(macrosBody);
		this.getParameterDisplayValue(mappingInfo, processSchema, callback, scope);
	},

	/**
	 * Checks if macros is lookup.
	 * @param {String} macrosBody Macros.
	 * @return {Boolean}
	 */
	getIsLookupMappingValue: function(macrosBody) {
		var consts = Terrasoft.process.constants;
		return Ext.String.startsWith(macrosBody, consts.LOOKUP_VALUE_PREFIX + consts.MACROS_SEPARATOR);
	},

	/**
	 * Checks if macros is lookup.
	 * @param {String} macros Macros.
	 * @return {Boolean}
	 */
	getIsLookupMappingMacros: function(macros) {
		var consts = Terrasoft.process.constants;
		return Ext.String.startsWith(macros, consts.LEFT_MACROS_BRACKET + consts.LOOKUP_VALUE_PREFIX +
			consts.MACROS_SEPARATOR);
	},

	/**
	 * Checks if macros is lookup.
	 * @param {String} macrosBody Macros.
	 * @return {Boolean}
	 */
	getLookupValue: function(macrosBody) {
		var constants = Terrasoft.process.constants;
		return macrosBody.slice(macrosBody.lastIndexOf(".") + 1, macrosBody.indexOf(constants.RIGHT_MACROS_BRACKET));
	},

	/**
	 * Returns the value of the parameter data mapping.
	 * @param {String} value The value of parameter .
	 * @return {{schemaElementUId: string, parameterUId: string}}
	 */
	getParameterMappingInfo: function(value) {
		var regexp = Terrasoft.process.constants.PARAMETER_MAPPING_REGEX;
		var parameterMappingInfo = {};
		var result = regexp.exec(value);
		while (result !== null) {
			var groupName = result[1];
			var groupValue = result[2];
			switch (groupName) {
				case "Element":
					parameterMappingInfo.schemaElementUId = groupValue;
					break;
				case "Parameter":
					parameterMappingInfo.parameterUId = groupValue;
					break;
				case "EntityColumn":
					parameterMappingInfo.entityColumnUId = groupValue;
					break;
				default:
					break;
			}
			result = regexp.exec(value);
		}
		return parameterMappingInfo;
	},

	/**
	 * Returns array of mapping data parameters.
	 * @param {String} value The value of parameter.
	 * @return {Array}
	 */
	getFormulaParameters: function(value, schema, callback, scope) {
		if (Ext.isEmpty(value)) {
			callback.call(scope, value);
			return;
		}
		const valueParser = Ext.create("Terrasoft.FormulaValueParser", {
			formula: value,
			schema: schema
		});
		valueParser.parse(function(formulaParameters) {
			callback.call(scope, formulaParameters.getKeys());
		}, this);
	},

	/**
	 * Returns the value of the meta path data mapping.
	 * @param {String} value The value of meta path .
	 * @return {{schemaElementUId: string, parameterUId: string}}
	 */
	getMetaPathMappingInfo: function(value) {
		var metaPathInfo = {};
		if (!Ext.isEmpty(value)) {
			var valueArray = value.split(Terrasoft.process.constants.MACROS_SEPARATOR);
			if (valueArray.length === 1) {
				metaPathInfo.parameterUId = valueArray[0];
			} else {
				metaPathInfo.schemaElementUId = valueArray[0];
				metaPathInfo.parameterUId = valueArray[1];
			}
		}
		return metaPathInfo;
	},

	/**
	 * Returns formula value by the formula display value in callback function.
	 * @param {String} displayValue The display value of parameter.
	 * @param {Terrasoft.ProcessSchema} schema The instance of process schema.
	 * @param {Terrasoft.Collection} formulaParameters The collection of formula parameters.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	getFormulaValue: function(displayValue, schema, formulaParameters, callback, scope) {
		this.validateValue({
			displayValue: displayValue,
			schema: schema
		}, function(result) {
			callback.call(scope, result.value);
		}, scope);
	},

	/**
	 * Returns parameter by mapping info.
	 * @deprecated Use {@link Terrasoft.FormulaParserUtils#findMappingParameter}
	 * @param {Object} mappingInfo The info of mapping.
	 * @param {Terrasoft.BaseProcessSchema} parentSchema The instance of parent schema.
	 * @return {Terrasoft.manager.ProcessSchemaParameter|null}
	 */
	getMappingParameter: function(mappingInfo, parentSchema) {
		return this.findMappingParameter(mappingInfo, parentSchema);
	},

	/**
	 * Find parameter by mapping info.
	 * @param {Object} mappingInfo The info of mapping.
	 * @param {Terrasoft.BaseProcessSchema} parentSchema The instance of parent schema.
	 * @return {Terrasoft.manager.ProcessSchemaParameter|null}
	 */
	findMappingParameter: function(mappingInfo, parentSchema) {
		var parameterUId = mappingInfo.parameterUId;
		if (parameterUId) {
			var schemaElementUId = mappingInfo.schemaElementUId;
			var element = schemaElementUId ? parentSchema.findItemByUId(schemaElementUId) : parentSchema;
			if (element) {
				return element.parameters.find(parameterUId);
			}
		}
		return null;
	},

	/**
	 * Returns parameter macros display value by mapping info.
	 * @param {Object} mappingInfo The info of mapping.
	 * @param {Terrasoft.ProcessSchema} schema The instance of process schema.
	 * @param {Function} callback The callback function.
	 * @param {String} callback.displayValue The display value of parameter.
	 * @param {Object} scope The scope of callback function.
	 */
	getParameterDisplayValue: function(mappingInfo, schema, callback, scope) {
		var parameter = this.getMappingParameter(mappingInfo, schema);
		if (!parameter) {
			callback.call(scope, "");
			return;
		}
		var displayValue = this.getParameterDisplayValuePrefix(mappingInfo, parameter, schema);
		var entityColumnUId = mappingInfo.entityColumnUId;
		var schemaUId = parameter.referenceSchemaUId;
		if (!entityColumnUId || !schemaUId) {
			callback.call(scope, displayValue);
			return;
		}
		var config = {
			schemaUId: parameter.referenceSchemaUId,
			packageUId: schema.getPackageUId()
		};
		Terrasoft.EntitySchemaManager.findBundleSchemaInstance(config, function(entitySchema) {
			displayValue += Terrasoft.process.constants.MACROS_SEPARATOR;
			if (entitySchema) {
				var column = entitySchema.findColumnByUId(entityColumnUId);
				if (column) {
					displayValue += Terrasoft.ProcessSchemaDesignerUtilities.getElementCaption(column);
					callback.call(scope, displayValue);
					return;
				}
			}
			displayValue += Terrasoft.Resources.ProcessSchemaDesigner.Messages.EntityNotFoundMessage;
			callback.call(scope, displayValue);
		}, this);
	},

	/**
	 * Parses formula value by the formula display value.
	 * @param {Object} config The validation config.
	 * @param {String} config.displayValue The display value of the parameter.
	 * @param {Terrasoft.BaseProcessSchema} config.schema The instance of process schema.Type.
	 * @param {Function} callback The callback function.
	 * @param {Object} callback.parseResult Result object of parse formula.
	 * @param {String} callback.parseResult.value Formula value.
	 * @param {Object} scope The scope of callback function.
	 */
	parseFormulaValue: function(config, callback, scope) {
		var displayValue = config.displayValue;
		if (Ext.isEmpty(displayValue)) {
			this.emptyResult(callback, scope);
			return;
		}
		var value = displayValue;
		value = value.split(Terrasoft.process.constants.TERRASOFT_COMMON_NAMESPACE).join("");
		value = this.replaceFunctionsDisplayValueToValue(value);
		var displayValueParser = Ext.create("Terrasoft.FormulaDisplayValueParser", {
			formula: value,
			schema: config.schema
		});
		displayValueParser.parse(function(formulaParameters, unrecognizedMacros) {
			value = this.getFormulaValueByCollection(value, formulaParameters);
			var isValid = (unrecognizedMacros.length === 0);
			var parseResult = {
				displayValue: displayValue,
				value: value,
				isValid: isValid,
				unrecognized: unrecognizedMacros
			};
			callback.call(scope, parseResult);
		}, this);
	},

	/**
	 * Validates and returns formula value by the formula display value in callback function.
	 * @param {Object} config The validation config.
	 * @param {String} config.displayValue The display value of the parameter.
	 * @param {Terrasoft.ProcessSchema} config.schema The instance of process schema.
	 * @param {Terrasoft.core.enums.DataValueType} [dataValueType] The result dataValueType.
	 * @param {String} [parameterName] The parameter name.
	 * @param {String} [elementName] The element, that the parameter belongs to.
	 * @param {Terrasoft.core.enums.DataValueType} config.dataValueType The result dataValueType.
	 * @param {Function} callback The callback function.
	 * @param {Object} callback.validationResult The summary validation result.
	 * @param {Object} scope The scope of callback function.
	 */
	validateValue: function(config, callback, scope) {
		if (Ext.isEmpty(config.displayValue)) {
			this.emptyResult(callback, scope);
			return;
		}
		this.parseFormulaValue(config, function(parseResult) {
			if (!parseResult.isValid) {
				callback.call(scope, parseResult);
				return;
			}
			if (Terrasoft.Features.getIsEnabled("UseProcessFormulaServerValidation")) {
				var validationConfig = this.getServerValidationConfig(parseResult.value, config);
				this.validateServerFormulaValue(validationConfig, function(response) {
					this.handleServerValidationResponse(response, parseResult, function(validationResult) {
						callback.call(scope, validationResult);
					}, this);
				}, this);
			} else {
				callback.call(scope, parseResult);
			}
		}, this);
	},

	/**
	 * Returns empty parse value result in callback.
	 * @param {Function} callback The callback function.
	 * @param {Object} callback.emptyResult Result object with empty value.
	 * @param {Object} scope The scope of callback function.
	 */
	emptyResult: function(callback, scope) {
		callback.call(scope, {
			displayValue: "",
			isValid: true,
			value: "",
			unrecognized: []
		});
	},

	/**
	 * Returns config prepared for validateServerFormulaValue.
	 * @param {String} value The value of the parameter.
	 * @param {Object} config The validation config.
	 * @return {Object}
	 */
	getServerValidationConfig: function(value, config) {
		var validationConfig = {
			formulaValue: value,
			resultDataValueType: config.dataValueType,
			schema: config.schema,
			parameterName: config.parameterName,
			elementName: config.elementName
		};
		return validationConfig;
	},

	/**
	 * Returns lookup display value.
	 * @param {String} macrosBody The text of macros expression.
	 * @param {String} packageUId Package identifier.
	 * @param {Function} callback The callback function.
	 * @param {String} callback.prefix The lookup value display prefix.
	 * @param {String} callback.schemaDisplayValue The Schema caption.
	 * @param {String} callback.value The display value.
	 * @param {Object} scope Environment object callback function.
	 */
	getLookupDisplayValue: function(macrosBody, packageUId, callback, scope) {
		var macrosParams = macrosBody.split(Terrasoft.process.constants.MACROS_SEPARATOR);
		var schemaUId = macrosParams[1];
		var config = {
			schemaUId: schemaUId,
			packageUId: packageUId
		};
		Terrasoft.EntitySchemaManager.findBundleSchemaInstance(config, function(entitySchema) {
			var resources = Terrasoft.Resources.ProcessSchemaDesigner;
			var prefix = this.prepareDisplayPrefix(resources.Functions.LookupValueDisplayPrefix);
			if (entitySchema) {
				var schemaCaption = entitySchema.caption && entitySchema.caption.getValue();
				var schemaDisplayValue = schemaCaption || entitySchema.name;
				var lookupUId = macrosParams[2];
				this.loadLookupDisplayValue(entitySchema, lookupUId, function(value) {
					callback.call(scope, {
						prefix: prefix,
						schemaDisplayValue: schemaDisplayValue,
						value: value
					});
				});
			} else {
				callback.call(scope, {
					errorMessage: Ext.String.format("{0}{1}", prefix, resources.Messages.EntityNotFoundMessage)
				});
			}
		}, this);
	},

	/**
	 * Returns display prefix prepared for concatenation.
	 * @param {String} prefix The value of the prefix.
	 * @return {String}
	 */
	prepareDisplayPrefix: function(prefix) {
		return Ext.String.format("{0}{1}", prefix, Terrasoft.process.constants.MACROS_SEPARATOR);
	},

	/**
	 * Validates prefix resources.
	 * @private
	 */
	validatePrefixResources: function() {
		var coreResources = Terrasoft.Resources.ProcessSchemaDesigner.Functions;
		Terrasoft.each(coreResources, function(resource, key) {
			if (key.indexOf("Prefix") > -1 && resource.indexOf(".") === (resource.length - 1)) {
				coreResources[key] = resource.slice(0, -1);
				var errorMessage = "Resource value by Terrasoft.Resources.ProcessSchemaDesigner.Functions." +
					key + " - is not valid please remove \".\" at the end";
				this.log(errorMessage);
			}
		}, this);
	}

	//endregion

});
