/**
 */
Ext.define("Terrasoft.utils.builder.ObjectBuilder", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.ObjectBuilder",

	//region Properties: private

	/**
	 * Tokens chains.
	 * @private
	 * @type {Array}
	 */
	tokensChain: null,

	/**
	 * First created builder section.
	 * @private
	 * @type {Object}
	 */
	result: null,

	/**
	 * Stack for context tokens.
	 * @private
	 * @type {Array}
	 */
	contextStack: null,

	/**
	 * Types array from which processing rules matrix will be created.
	 * @private
	 * @type {Array}
	 */
	types: null,

	/**
	 * Section types.
	 * @private
	 * @type {Array}
	 */
	contextTypes: null,

	/**
	 * Actions array from which actions will be taken while processing.
	 * @private
	 * @type {Array}
	 */
	handlers: null,

	/**
	 * Processing rules matrix.
	 * @private
	 * @type {Array}
	 */
	processingRules: null,

	/**
	 * Object for chain call after user called start().
	 * @private
	 * @type {Object}
	 */
	startChainCallObject: null,

	//endregion

	//region Methods: private

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.baseInit();
		this.initTokensChainAndContext();
		this.setInitialBuilderState();
		this.initStartChainCallObject();
		this.initTypes();
		this.processingRules = this.getMatrixFromTypes();
		this.initHandlers();
		this.initRules();
		this.callParent(arguments);
		this.postInit();
	},

	/**
	 * Returns start token type.
	 * @protected
	 * @returns {string} Start token type.
	 */
	getStartSymbol: function() {
		return "e";
	},

	/**
	 * Base init function.
	 * @private
	 */
	baseInit: function() {
		this.handlers = [];
		this.types = [];
		this.contextTypes = [];
		this.types.push(this.getStartSymbol());
	},

	/**
	 * Initializes tokens chain and context stack.
	 * @private
	 */
	initTokensChainAndContext: function() {
		this.tokensChain = [];
		this.contextStack = [];
	},

	/**
	 * Sets intial builder state.
	 * @private
	 */
	setInitialBuilderState: function() {
		this.enterContext({
			type: this.getStartSymbol()
		});
	},

	/**
	 * Builds matrix from array.
	 * @private
	 * @returns {Array} Matrix with same columns and rows.
	 */
	getMatrixFromTypes: function() {
		var result = [];
		this.types.forEach(function(xItem) {
			result[xItem] = [];
			this.contextTypes.forEach(function(yItem) {
				result[xItem][yItem] = 0;
			}, this);
		}, this);
		return result;
	},

	/**
	 * Process tokens chain into sections and nodes.
	 * @private
	 */
	processTokens: function() {
		var chain = this.tokensChain;
		chain = this.removeIgnoredTokens(chain);
		chain.forEach(function(token) {
			this.processTokenByRules(token);
		}, this);
	},

	/**
	 * Removes tokens with ignore flags from chain.
	 * @private
	 * @param {Array} chain Tokens chain.
	 * @returns {Array} Filtered tokens chain.
	 */
	removeIgnoredTokens: function(chain) {
		var ignoreDepth = 0;
		return chain.filter(function(token) {
			var isSection = this.getIsTokenContext(token);
			var isBreakpoint = this.getIsTokenBreakpoint(token);
			if (ignoreDepth > 0) {
				if (isBreakpoint) {
					ignoreDepth--;
				} else if (isSection) {
					ignoreDepth ++;
				}
				return false;
			}
			var isIgnored = token.condition;
			if (isIgnored) {
				if (isSection) {
					ignoreDepth++;
				}
				return false;
			}
			return true;
		}, this);
	},

	/**
	 * Processes token in accordance to given rules.
	 * @private
	 * @param {Object} token Given token.
	 */
	processTokenByRules: function(token) {
		if (this.contextStack.length === 0) {
			return;
		}
		var currentContext = this.peekContext();
		var tokenKey = token.type;
		var contextKey = currentContext.type;
		var actionNumber = this.processingRules[tokenKey][contextKey] || 0;
		var action = this.handlers[actionNumber];
		action.call(this, token, currentContext);
	},

	/**
	 * Starts builder with empty object.
	 * @private
	 * @param {Object} token Token invoker.
	 */
	setResultToNewObject: function(token) {
		var newObject = {};
		this.result = newObject;
		token.value = newObject;
		this.enterContext(token);
	},

	/**
	 * Start builder with empty array.
	 * @private
	 * @param {Object} token Token invoker.
	 */
	setResultToNewArray: function(token) {
		var newArray = [];
		this.result = newArray;
		token.value = newArray;
		this.enterContext(token);
	},

	/**
	 * Throws error.
	 * @private
	 * @param {Object} token Token invoker.
	 * @param {Object} context Current context.
	 */
	throwError: function(token, context) {
		throw Ext.String.format("Error. Token: {0}. Context: {1}.", token.type, context.type);
	},

	/**
	 * Inserts object inside othe object.
	 * @private
	 * @param {Object} token Token invoker.
	 * @param {Object} context Current context.
	 */
	insertObjectToObject: function(token, context) {
		var name = token.args[0];
		var newObject = {};
		token.value  = newObject;
		context.value[name] = newObject;
		this.enterContext(token);
	},

	/**
	 * Inserts object to array.
	 * @private
	 * @param {Object} token Token invoker.
	 * @param {Object} context Current context.
	 */
	insertObjectToArray: function(token, context) {
		var contextValue = context.value;
		var tokenValue = {};
		token.value = tokenValue;
		contextValue.push(tokenValue);
		this.enterContext(token);
	},

	/**
	 * Insertes array to object.
	 * @private
	 * @param {Object} token Token invoker.
	 * @param {Object} context Current context.
	 */
	insertArrayToObject: function(token, context) {
		var contextValue = context.value;
		var tokenValue = [];
		var name = token.args[0];
		token.value = tokenValue;
		contextValue[name] = tokenValue;
		this.enterContext(token);
	},

	/**
	 * Inserts array to array.
	 * @private
	 * @param {Object} token Token invoker.
	 * @param {Object} context Current context.
	 */
	insertArrayToArray: function(token, context) {
		var contextValue = context.value;
		var tokenValue = [];
		token.value = tokenValue;
		contextValue.push(tokenValue);
		this.enterContext(token);
	},

	/**
	 * Inserts node to object.
	 * @private
	 * @param {Object} token Token invoker.
	 * @param {Object} context Current context.
	 */
	insertNodeToObject: function(token, context) {
		var key = token.args[0];
		var value = token.args[1];
		var contextValue = context.value;
		contextValue[key] = value;
	},

	/**
	 * Inserts node to array.
	 * @private
	 * @param {Object} token Token invoker.
	 * @param {Object} context Current context.
	 */
	insertNodeToArray: function(token, context) {
		var value = token.args[0];
		var contextValue = context.value;
		contextValue.push(value);
	},

	//endregion

	//region Methods: protected

	/**
	 * Initializes start chain call object.
	 * @private
	 */
	initStartChainCallObject: function() {
		var conf = this.getStartChainCallConfig();
		this.setStartChainCallObject(conf);
	},

	/**
	 * Initializes start chain call object.
	 * @protected
	 * @returns {Object} Start chain call object.
	 */
	getStartChainCallConfig: function() {
		return {
			object: this.object,
			array: this.array,
			add: this.add,
			end: this.end
		};
	},

	/**
	 * Initializes types array.
	 * @protected
	 */
	initTypes: function() {
		this.registerTokenType("node");
		this.registerTokenType("end");
		this.registerTokenType("object");
		this.registerTokenType("array");
		this.registerTokenType("custom");
		this.registerContextType("object");
		this.registerContextType("array");
	},

	/**
	 * Initialized actions array.
	 * @protected
	 */
	initHandlers: function() {
		this.registerHandler(this.throwError, 0);
		this.registerHandler(this.setResultToNewObject, 1);
		this.registerHandler(this.setResultToNewArray, 2);
		this.registerHandler(this.insertObjectToObject, 3);
		this.registerHandler(this.insertObjectToArray, 4);
		this.registerHandler(this.insertArrayToObject, 5);
		this.registerHandler(this.insertArrayToArray, 6);
		this.registerHandler(this.exitContext, 7);
		this.registerHandler(this.insertNodeToObject, 8);
		this.registerHandler(this.insertNodeToArray, 9);
	},

	/**
	 * Initialize processing rules matrix with action numbers rom actions array.
	 * @protected
	 */
	initRules: function() {
		var initialState = this.getStartSymbol();
		this.registerRule("object", "object", 3);
		this.registerRule("object", "array", 4);
		this.registerRule("object", initialState, 1);
		this.registerRule("array", "object", 5);
		this.registerRule("array", "array", 6);
		this.registerRule("array", initialState, 2);
		this.registerRule("end", "object", 7);
		this.registerRule("end", "array", 7);
		this.registerRule("node", "object", 8);
		this.registerRule("node", "array", 9);
	},

	/**
	 * Returns if token have section type.
	 * @protected
	 * @param {Object} token Token to check.
	 * @returns {Boolean} Is token a section.
	 */
	getIsTokenContext: function(token) {
		var tokenType = token.type;
		return Terrasoft.contains(this.contextTypes, tokenType);
	},

	/**
	 * Returns if token have breakpoint type.
	 * @protected
	 * @param {Object} token Token to check.
	 * @returns {Boolean} Is token a breakpoint.
	 */
	getIsTokenBreakpoint: function(token) {
		return token.type === "end";
	},

	/**
	 * Returns section on the top of the stack without removing it.
	 * @protected
	 * @returns {Object} Section on the top of the stack
	 */
	peekContext: function() {
		return Terrasoft.last(this.contextStack);
	},

	/**
	 * Sets given context as current.
	 * @protected
	 * @param {Object} context Section tha will become current.
	 */
	enterContext: function(context) {
		this.contextStack.push(context);
	},

	/**
	 * Removes current context.
	 * @protected
	 */
	exitContext: function() {
		this.contextStack.pop();
	},

	/**
	 * Sets start chain call object.
	 * @protected
	 * @param {Object} object Object with methods that user can call after start() method.
	 */
	setStartChainCallObject: function(object) {
		object.tokensChain = this.tokensChain;
		object.addToken = this.addToken;
		this.startChainCallObject = object;
	},

	/**
	 * Adds token to tokens chain.
	 * @protected
	 * @param {String} type Token type.
	 * @param {Array} args Arguments array.
	 */
	addToken: function(type, args) {
		this.tokensChain.push({
			type: type,
			args: args,
			condition: this.condition
		});
	},

	/**
	 * Registers token type in builder.
	 * @protected
	 * @param {String} type Token type.
	 */
	registerTokenType: function(type) {
		this.types.push(type);
	},

	/**
	 * Registers token type in builder that can become context.
	 * @protected
	 * @param {String} type Token type.
	 */
	registerContextType: function(type) {
		this.contextTypes.push(type);
	},

	/**
	 * Register handler action of token.
	 * @protected
	 */
	registerHandler: function(handler, index) {
		this.handlers[index] = handler;
	},

	/**
	 * Registers rule for specific interaction.
	 * @protected
	 * @param {String} token Token type.
	 * @param {String} context Context type.
	 * @param {Number} handlerIndex Index of handler method.
	 */
	registerRule: function(token, context, handlerIndex) {
		this.processingRules[token][context] = handlerIndex;
	},

	/**
	 * Post init function.
	 * @protected
	 */
	postInit: Terrasoft.emptyFn,

	//endregion

	//region Methods: public

	/**
	 * Starts build of the section of condition.
	 * @param {Boolean} condition Condition for this block execution.
	 * @returns {Object} Chain call object.
	 */
	start: function(condition) {
		if (!Ext.isEmpty(condition)) {
			this.startChainCallObject.condition = !condition;
		} else {
			this.startChainCallObject.condition = false;
		}
		return this.startChainCallObject;
	},

	/**
	 * Creates object section.
	 */
	object: function() {
		this.addToken("object", arguments);
		return this;
	},

	/**
	 * Creates array section.
	 */
	array: function() {
		this.addToken("array", arguments);
		return this;
	},

	/**
	 * Add raw element inside current section.
	 */
	add: function() {
		this.addToken("node", arguments);
		return this;
	},

	/**
	 * Ends current section.
	 * @returns {Terrasoft.utils.builder.TrueBuilder} Object for chain call.
	 */
	end: function() {
		this.addToken("end", arguments);
		this.condition = false;
		return this;
	},

	/**
	 * Processes tokens chain and returns root section.
	 * @returns {Object} Root section.
	 */
	getResult: function() {
		this.processTokens();
		return this.result;
	}

	//endregion

});
