/**
 */
Ext.define("Terrasoft.manager.FormulaMacros", {
	alternateClassName: "Terrasoft.FormulaMacros",

	statics: {

		/**
		 * Creates entity column parameter value macros.
		 * @param {String} flowElementUId Process flow element uId.
		 * @param {String} parameterUId Flow element parameter uId.
		 * @param {String} columnUId Entity column uId.
		 * @returns {Terrasoft.FormulaMacros} Entity column parameter value macros.
		 */
		prepareEntityColumnParameterValue: function(flowElementUId, parameterUId, columnUId) {
			var constants = Terrasoft.process.constants;
			var macros = Ext.create("Terrasoft.FormulaMacros");
			macros.addParameter(constants.PARAMETER_IS_OWNER_SCHEMA);
			macros.addParameter(constants.PARAMETER_IS_SCHEMA);
			macros.addParameter(Ext.String.format(constants.PARAMETER_ELEMENT_TEMPLATE, flowElementUId));
			macros.addParameter(Ext.String.format(constants.PARAMETER_PARAMETER_TEMPLATE, parameterUId));
			macros.addParameter(Ext.String.format(constants.PARAMETER_ENTITY_COLUMN_TEMPLATE, columnUId));
			return macros;
		},

		/**
		 * Creates entity column parameter display value macros. (First item in collection property)
		 * @param {String} flowElementCaption Process flow element caption.
		 * @param {String} propertyCaption Flow element property caption.
		 * @param {String} parameterCaption Flow element parameter caption.
		 * @returns {Terrasoft.FormulaMacros} Entity column parameter display value macros.
		 */
		prepareEntityColumnParameterDisplayValue: function(flowElementCaption, propertyCaption, parameterCaption) {
			var macros = Ext.create("Terrasoft.FormulaMacros");
			macros.addParameter(flowElementCaption);
			macros.addParameter(propertyCaption);
			macros.addParameter(parameterCaption);
			return macros;
		},

		/**
		 * Create process parameter value macros.
		 * @param {String} parameterUId Process parameter uId.
		 * @returns {Terrasoft.FormulaMacros} Process parameter value macros.
		 */
		prepareProcessParameterValue: function(parameterUId) {
			var constants = Terrasoft.process.constants;
			var macros = Ext.create("Terrasoft.FormulaMacros");
			macros.addParameter(constants.PARAMETER_IS_OWNER_SCHEMA);
			macros.addParameter(constants.PARAMETER_IS_SCHEMA);
			macros.addParameter(Ext.String.format(constants.PARAMETER_PARAMETER_TEMPLATE, parameterUId));
			return macros;
		},

		/**
		 * Creates property value macros.
		 * @returns {Terrasoft.FormulaMacros} Macros value of the schema property.
		 */
		preparePropertyValue: function() {
			var constants = Terrasoft.process.constants;
			var macros = Ext.create("Terrasoft.FormulaMacros");
			macros.addParameter(constants.CAPTION_PROPERTY_VALUE_MACROS);
			return macros;
		},

		/**
		 * Creates display value of the macros.
		 * @param {String} displayValue Display value of the property.
		 * @returns {Terrasoft.FormulaMacros} Macros value of the property.
		 */
		preparePropertyDisplayValue: function(displayValue) {
			var macros = Ext.create("Terrasoft.FormulaMacros");
			macros.addParameter(displayValue);
			return macros;
		},

		/**
		 * Creates regular process element parameter value macros.
		 * @param {String} flowElementUId Process flow element uId.
		 * @param {String} parameterUId Flow element parameter uId.
		 * @returns {Terrasoft.FormulaMacros} Process element parameter value macros.
		 */
		prepareProcessElementParameterValue: function(flowElementUId, parameterUId) {
			var constants = Terrasoft.process.constants;
			var macros = Ext.create("Terrasoft.FormulaMacros");
			macros.addParameter(constants.PARAMETER_IS_OWNER_SCHEMA);
			macros.addParameter(constants.PARAMETER_IS_SCHEMA);
			macros.addParameter(Ext.String.format(constants.PARAMETER_ELEMENT_TEMPLATE, flowElementUId));
			macros.addParameter(Ext.String.format(constants.PARAMETER_PARAMETER_TEMPLATE, parameterUId));
			return macros;
		},

		/**
		 * Creates process element parameter display value macros.
		 * @param {String} flowElementCaption Process flow element caption.
		 * @param {String} parameterCaption Flow element parameter caption.
		 * @returns {Terrasoft.FormulaMacros} Process element parameter display value.
		 */
		prepareProcessElementParameterDisplayValue: function(flowElementCaption, parameterCaption) {
			var macros = Ext.create("Terrasoft.FormulaMacros");
			macros.addParameter(flowElementCaption);
			macros.addParameter(parameterCaption);
			return macros;
		},

		/**
		 * Creates sys setting value macros.
		 * @param {String} code System setting code.
		 * @param {String} type System setting type name.
		 * @returns {Terrasoft.FormulaMacros} System setting value macros.
		 */
		prepareSysSettingValue: function(code, type) {
			var constants = Terrasoft.process.constants;
			var macros = Ext.create("Terrasoft.FormulaMacros");
			macros.addParameter(constants.SYS_SETTINGS_PREFIX);
			macros.addParameter(Ext.String.format(constants.SYS_SETTING_VALUE_TEMPLATE, code, type));
			return macros;
		},

		/**
		 * Creates sys setting display value macros.
		 * @param {String} sysSettingName System setting name.
		 * @returns {Terrasoft.FormulaMacros} System setting display value macros.
		 */
		prepareSysSettingDisplayValue: function(sysSettingName) {
			var macros = Ext.create("Terrasoft.FormulaMacros");
			macros.addParameter(Terrasoft.Resources.ProcessSchemaDesigner.Functions.SysSettingsDisplayPrefix);
			macros.addParameter(sysSettingName);
			return macros;
		},

		/**
		 * Create lookup value macros.
		 * @param {String} entitySchemaUId Lookup entity schema uId.
		 * @param {String} lookupValue Lookup record uId.
		 * @returns {Terrasoft.FormulaMacros} Lookup value macros.
		 */
		prepareLookupValue: function(entitySchemaUId, lookupValue) {
			var macros = Ext.create("Terrasoft.FormulaMacros");
			macros.addParameter(Terrasoft.process.constants.LOOKUP_VALUE_PREFIX);
			macros.addParameter(entitySchemaUId);
			macros.addParameter(lookupValue);
			return macros;
		},

		/**
		 * Creates lookup display value macros.
		 * @param {String} schema Schema caption.
		 * @param {String} value Lookup value caption.
		 * @returns {Terrasoft.FormulaMacros} Lookup display value macros.
		 */
		prepareLookupDisplayValue: function(schema, value) {
			var macros = Ext.create("Terrasoft.FormulaMacros");
			macros.addParameter(Terrasoft.Resources.ProcessSchemaDesigner.Functions.LookupValueDisplayPrefix);
			macros.addParameter(schema);
			macros.addParameter(value);
			return macros;
		},

		/**
		 * Create main record value macros.
		 * @param {String} parametersChain String of guids separated by dots.
		 * @returns {Terrasoft.FormulaMacros} Main record value macros.
		 */
		prepareMainRecordValue: function(parametersChain) {
			var macros = Ext.create("Terrasoft.FormulaMacros");
			macros.addParameter(Terrasoft.process.constants.COLUMN_VALUE_PREFIX);
			macros.addParameter(parametersChain);
			return macros;
		},

		/**
		 * Create main record value macros from array of uIds.
		 * @param {Array} parameters Array of columns uIds.
		 * @returns {Terrasoft.FormulaMacros} Main record value macros.
		 */
		prepareMainRecordValueFromUIdArray: function(parameters) {
			parameters = parameters.map(function(uId) {
				return Ext.String.format("{{0}}", uId);
			}, this);
			parameters.unshift(Terrasoft.process.constants.COLUMN_VALUE_PREFIX);
			return Ext.create("Terrasoft.FormulaMacros", {
				parameters: parameters
			});
		},

		/**
		 * Create main record display value macros.
		 * @param {String} captionPath String of columns captions separated by dots.
		 * @returns {Terrasoft.FormulaMacros} Main record display value macros.
		 */
		prepareMainRecordDisplayValue: function(captionPath) {
			var macros = Ext.create("Terrasoft.FormulaMacros");
			macros.addParameter(Terrasoft.Resources.ProcessSchemaDesigner.Functions.MainRecordDisplayPrefix);
			macros.addParameter(captionPath);
			return macros;
		},

		/**
		 * Create boolean value macros.
		 * @param {String} value Boolean value.
		 * @returns {Terrasoft.FormulaMacros} Boolean value macros.
		 */
		prepareBooleanValue: function(value) {
			var macros = Ext.create("Terrasoft.FormulaMacros");
			macros.addParameter(Terrasoft.process.constants.BOOLEAN_MACROS_PREFIX);
			macros.addParameter(value);
			return macros;
		},

		/**
		 * Create boolean display value macros.
		 * @param {String} displayValue Boolean display value.
		 * @returns {Terrasoft.FormulaMacros} Boolean display value macros.
		 */
		prepareBooleanDisplayValue: function(displayValue) {
			var macros = Ext.create("Terrasoft.FormulaMacros");
			macros.addParameter(Terrasoft.Resources.ProcessSchemaDesigner.Functions.BooleanDisplayPrefix);
			macros.addParameter(displayValue);
			return macros;
		},

		/**
		 * Creates system variable value macros.
		 * @param {String} value System variable value.
		 * @returns {Terrasoft.FormulaMacros} System variable value macros.
		 */
		prepareSysVariableValue: function(value) {
			var macros = Ext.create("Terrasoft.FormulaMacros");
			macros.addParameter(Terrasoft.process.constants.SYS_VARIABLE_PREFIX);
			macros.addParameter(value);
			return macros;
		},

		/**
		 * Create system variable display value macros.
		 * @param {String} displayValue System variable display value.
		 * @returns {Terrasoft.FormulaMacros} System variable display value macros.
		 */
		prepareSysVariableDisplayValue: function(displayValue) {
			var macros = Ext.create("Terrasoft.FormulaMacros");
			macros.addParameter(Terrasoft.Resources.ProcessSchemaDesigner.Functions.SysVariableDisplayPrefix);
			macros.addParameter(displayValue);
			return macros;
		},
		
		/**
		 * Creates macros from macros string.
		 * @param {String|Terroaft.FormulaMacros} macros Macros string.
		 * @returns {Terrasoft.FormulaMacros} Macros.
		 */
		from: function(macros) {
			var parameters = [];
			if (macros instanceof Terrasoft.FormulaMacros) {
				macros = macros.toString();
			}
			if (Ext.isString(macros)) {
				var stringWithoutParameterMask = Terrasoft.ProcessSchemaDesignerUtilities.removeParameterMask(macros);
				parameters = stringWithoutParameterMask.split(Terrasoft.process.constants.MACROS_SEPARATOR);
			}
			return Ext.create("Terrasoft.FormulaMacros", {
				parameters: parameters
			});
		},
		
		/**
		 * Creates macros from macros string.
		 * @param {String|Terroaft.FormulaMacros} macros Macros string.
		 * @returns {Terrasoft.FormulaMacros} Macros.
		 * @deprecated 7.11.0 Use {@link Terrasoft.FormulaMacros#from} instead
		 */
		createFromString: function(string) {
			return Terrasoft.FormulaMacros.from(string);
		}
	},

	/**
	 * Array of macros parameters.
	 * @private
	 * @type {Array}
	 */
	parameters: null,

	/**
	 * Macros constructor.
	 * @protected
	 */
	constructor: function(config) {
		this.callParent(arguments);
		this.parameters = config && config.parameters ? config.parameters : [];
	},

	/**
	 * Returns parameter value meta path string. Means string without first and second parameter.
	 * @returns {String} Parameter value meta path.
	 */
	getMetaPath: function() {
		return this.getChain(2);
	},

	/**
	 * Returns true if macros have only one parameter.
	 * @returns {Boolean} True if macros have only one parameter.
	 */
	getHasOneParameter: function() {
		return this.parameters.length === 1;
	},

	/**
	 * Returns macros parameter after prefix parameter (second parameter).
	 * @returns {String} First non prefix parameter.
	 */
	getParameterAfterPrefix: function() {
		return this.parameters[1];
	},

	/**
	 * Returns system setting code from macros.
	 * @returns {String} Code of system setting.
	 */
	getSysSettingsCode: function() {
		return Terrasoft.first(this.getParameterAfterPrefix().split("<"));
	},
	
	/**
	 * Returns true if string is main record value macros.
	 * @param {String} string Macros string.
	 * @returns {Boolean} True if string is main record value macros.
	 */
	isMainRecordColumn: function() {
		return !Ext.isEmpty(this.parameters) && this.getPrefix() === Terrasoft.process.constants.COLUMN_VALUE_PREFIX;
	},
	
	/**
	 * Returns is macros empty or not.
	 * @returns {Boolean} True if macros is empty.
	 */
	isEmpty: function() {
		return Ext.isEmpty(this.parameters);
	},
	
	/**
	 * Returns parameter validity.
	 * @returns {Boolean} Parameter validity.
	 */
	isValid: function() {
		var isValid = !this.isEmpty();
		if (isValid) {
			isValid = Ext.Array.every(this.getParametersWithoutPrefix(), function(parameter) {
				return !Ext.isEmpty(parameter) && this._parameterNotFoundValidator(parameter);
			}, this);
		}
		return isValid;
	},
	
	/**
	 * Entity not found parameter validator.
	 * @private
	 * @param {String} parameter Macros parameter.
	 * @returns {Boolean} Returns true if parameter is not entity not found parameter.
	 */
	_parameterNotFoundValidator: function (parameter) {
		var messages = Terrasoft.Resources.ProcessSchemaDesigner.Messages;
		return parameter !== messages.EntityNotFoundMessage;
	},
	
	/**
	 * Returns string chain of macros parameters without prefix parameter.
	 * @returns {String} Macros chain string without prefix parameter.
	 */
	getChainWithoutPrefix: function() {
		return this.getChain(1);
	},

	/**
	 * Returns string chain of macros parameters
	 * @param {|Number} from Chain start index.
	 * @param {|Number} to Chain end index.
	 * @returns {String} Macros parameters chain.
	 */
	getChain: function(from, to) {
		to = to || this.parameters.length;
		from = from || 0;
		return this.parameters.slice(from, to).join(Terrasoft.process.constants.MACROS_SEPARATOR);
	},

	/**
	 * Returns macros parameters without prefix parameter.
	 * @returns {Array} Macros parameters without prefix parameter.
	 */
	getParametersWithoutPrefix: function() {
		return this.parameters.slice(1);
	},

	/**
	 * Returns all macros parameters.
	 * @returns {Array} Macros parameters.
	 */
	getParameters: function() {
		return this.parameters;
	},

	/**
	 * Adds macros parameter to macros.
	 * @param {String} parameter Macros parameter.
	 */
	addParameter: function(parameter) {
		this.parameters.push(parameter);
	},

	/**
	 * Returns macros prefix parameter.
	 * @returns {String} Macros prefix parameter.
	 */
	getPrefix: function() {
		return Terrasoft.first(this.parameters);
	},

	/**
	 * Returns whole parameters chain.
	 * @returns {String}
	 */
	getBody: function() {
		return this.getChain();
	},

	/**
	 * Returns true if passed string is macros prefix parameter.
	 * @param {String} prefix Parameter to check.
	 * @returns {Boolean} True if passed string is macros prefix.
	 */
	containsPrefix: function(prefix) {
		return this.getPrefix() === prefix;
	},

	/**
	 * Returns full macros string value including macros mask.
	 * @returns {String} Full macros string value.
	 */
	toString: function() {
		return Terrasoft.ProcessSchemaDesignerUtilities.addParameterMask(this.getBody());
	}

});
