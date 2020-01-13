/**
 */
Ext.define("Terrasoft.manager.FormulaParser", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.FormulaParser",

	/**
	 * Process designer resources alias.
	 * @private
	 */
	resources: Terrasoft.Resources.ProcessSchemaDesigner,

	/**
	 * Process designer functions alias.
	 * @private
	 */
	functions: Terrasoft.Resources.ProcessSchemaDesigner.Functions,

	/**
	 * Process designer exceptions alias.
	 * @private
	 */
	exceptions: Terrasoft.Resources.ProcessSchemaDesigner.Exceptions,

	/**
	 * Process designer constants alias.
	 * @private
	 */
	constants: Terrasoft.process.constants,

	/**
	 * Process schema in which formula created.
	 * @private
	 * @type {Terrasoft.ProcessSchema}
	 */
	schema: null,

	/**
	 * Input formula to parse.
	 * @private
	 * @type {String}
	 */
	formula: null,

	/**
	 * Formula parameters - result collection where keys - inputted macros and values - parsed macros.
	 * @private
	 * @type {Terrasoft.Collection} Parsed macros collection.
	 */
	formulaParameters: null,

	/**
	 * Unrecognized macros array.
	 * @private
	 * @type {Array}
	 */
	unrecognizedMacroses: null,

	/**
	 * Current parsing macros from formula.
	 * @private
	 * @type {Terrasoft.FormulaMacros}
	 */
	currentMacros: null,

	/**
	 * Next iterator`s macros parsing function.
	 * @private
	 * @type {Function}
	 */
	nextIteration: null,

	/**
	 * Returns prefix macros handlers.
	 * @protected
	 * @abstract
	 */
	getMacrosHandlers: Terrasoft.emptyFn,

	/**
	 * Default macros handler function. It will be called if no prefix handler was found for macros.
	 * @protected
	 * @abstract
	 */
	defaultMacrosHandler: Terrasoft.emptyFn,

	/**
	 * Parser constructor.
	 * @protected
	 * @param {Object} config Config object.
	 * @param {String} config.formula Parsing formula.
	 * @param {String} config.schema Schema where formula is parsed.
	 */
	constructor: function(config) {
		this.callParent(arguments);
		this.formula = config.formula;
		this.schema = config.schema;
		this.formulaParameters = Ext.create("Terrasoft.Collection");
		this.unrecognizedMacroses = [];
	},

	/**
	 * Parses formula and returns parsed and unrecognized macros in callback.
	 * @param {Function} callback Result callback.
	 * @param {Object} scope Result callback scope.
	 */
	parse: function(callback, scope) {
		Terrasoft.eachAsync(this.getMacrosesArray(),
			function(match, next) {
				var matchValue = match[0];
				var isMacrosAlreadyParsed = this.formulaParameters.find(matchValue);
				var isMacrosInsideAnotherMacros = match.length !== 2;
				if (!isMacrosInsideAnotherMacros && !isMacrosAlreadyParsed) {
					this.currentMacros = Terrasoft.FormulaMacros.from(matchValue);
					this.nextIteration = next;
					this.startHandler();
				} else {
					next();
				}
			},
			function() {
				callback.call(scope, this.formulaParameters, this.unrecognizedMacroses);
			},
			this
		);
	},

	/**
	 * Returns all macros matches from formula.
	 * @private
	 * @returns {Array} Macros from formula.
	 */
	getMacrosesArray: function() {
		var result = [];
		var match;
		do {
			match = Terrasoft.process.constants.PARAMETER_REGEX.exec(this.formula);
			if (match) {
				result.push(match);
			}
		} while (match);
		return result;
	},

	/**
	 * Starts macros handle.
	 * @private
	 */
	startHandler: function() {
		var handlers = this.getMacrosHandlers();
		var suitableMacrosHandler = handlers.find(this.currentMacros.getPrefix());
		if (!suitableMacrosHandler) {
			suitableMacrosHandler = this.defaultMacrosHandler;
		}
		suitableMacrosHandler.call(this, this.currentMacros);
	},

	/**
	 * Ends macros handle with success.
	 * @protected
	 * @param {Terasoft.FormulaMacros} resultMacros Resulted macros.
	 */
	endHandler: function(resultMacros) {
		var body = resultMacros.getBody();
		if (!Ext.isEmpty(body)) {
			var key = this.currentMacros.toString();
			if (!this.formulaParameters.find(key)) {
				this.formulaParameters.add(key, resultMacros.toString());
			}
		}
		this.nextIteration.call(this);
	},

	/**
	 * Ends macros handle with error.
	 * @protected
	 */
	endHandlerWithError: function() {
		var error = Ext.String.format.apply(this, arguments);
		var value = this.currentMacros.getBody();
		this.logFormulaError(value, error);
		this.unrecognizedMacroses.push({
			unrecognizedMacros: value,
			message: error
		});
		this.nextIteration.call(this);
	},

	/**
	 * Logs formula error result.
	 * @private
	 * @param {String} macros Error macros.
	 * @param {String} errorMessage Error mesaage.
	 */
	logFormulaError: function(macros, errorMessage) {
		var template = Terrasoft.Resources.ProcessSchemaDesigner.Messages.InvalidFormulaMessage;
		var message = Ext.String.format(template, macros, errorMessage);
		this.log(message, Terrasoft.LogMessageType.WARNING);
	}
});
