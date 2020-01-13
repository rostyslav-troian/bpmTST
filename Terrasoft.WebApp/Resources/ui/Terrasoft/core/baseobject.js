/**
 * Base class for all Terrasoft classes.
 * @abstract
 */
Ext.define("Terrasoft.core.BaseObject", {
	alternateClassName: "Terrasoft.BaseObject",

	mixins: {
		observable: "Ext.util.Observable"
	},

	listeners: null,

	/**
	 * Instance identifier.
	 * @type {String}
	 */
	instanceId: "",

	/**
	 * Flag which identify that instance is destroyed.
	 * @type {Boolean}
	 */
	destroyed: false,

	/**
	 * Instance of console object to write logs. By default is window.console.
	 * @type {Object}
	 */
	console: window.console,

	/**
	 * Creates object instance.
	 * @param {Object} config Instance configuration object.
	 */
	constructor: function(config) {
		this._validateConfig(config);
		this._applyMixins(config);
		var initialConfig = this.initialConfig = config || {};
		Ext.apply(this, initialConfig);
		this.callParent(arguments);
		this.instanceId = Terrasoft.generateGUID();
		this.mixins.observable.constructor.call(this);
		this.addEvents(
			/**
			 * @event destroyed
			 * Fires after object instance is destroyed.
			 * @param {Terrasoft.BaseObject} Destroyed object.
			 */
			"destroyed"
		);
	},

	/**
	 * Validate constructor config object.
	 * @private
	 * @param {Object} config Instance configuration object.
	 */
	_validateConfig: function(config) {
		for (var property in config) {
			if (this[property] === undefined) {
				var className = this.getTypeInfo().fullTypeName;
				var message = Ext.String.format("{0} {1} {2} {3}", Terrasoft.Resources.BaseObject.Property, property,
					Terrasoft.Resources.BaseObject.IsNotDefinedInClass, className);
				if (Terrasoft.isDebug) {
					throw new Terrasoft.ItemNotFoundException({
						message: message
					});
				} else {
					this.error(message);
				}
			}
		}
	},

	/**
	 * Apply mixins to class.
	 * @private
	 * @param {Object} config Instance configuration object.
	 * @param {Object} [config.mixins] Mixins that need to be mixed into a class.
	 */
	_applyMixins: function(config) {
		if (!config || !config.hasOwnProperty("mixins")) {
			return;
		}
		var mixins = config.mixins;
		for (var mixinName in mixins) {
			if (mixins.hasOwnProperty(mixinName)) {
				var mixin = mixins[mixinName];
				var mixinClass = Ext.isString(mixin)
					? Ext.ClassManager.get(mixin)
					: mixin;
				this.self.mixin(mixinName, mixinClass);
			}
		}
		delete config.mixins;
	},

	/**
	 * Writes message to console.
	 * @param {String|Object} message Message to log.
	 * @param {Terrasoft.LogMessageType} [type] Message log type, by default is console.log. For possible values
	 * see {@link Terrasoft.core.enums.LogMessageType}.
	 */
	log: function(message, type) {
		var console = this.console;
		if (console) {
			var logMethod;
			switch (type) {
				case Terrasoft.LogMessageType.INFORMATION:
					logMethod = console.info;
					break;
				case Terrasoft.LogMessageType.WARNING:
					logMethod = console.warn;
					break;
				case Terrasoft.LogMessageType.ERROR:
					logMethod = console.error;
					break;
				default:
					logMethod = console.log;
					break;
			}
			if (logMethod.call) {
				logMethod.call(console, message);
			} else {
				logMethod(message);
			}
		}
	},

	/**
	 * Writes error message to console.
	 * @param {String} message Message to log.
	 */
	error: function(message) {
		this.log(message, Terrasoft.LogMessageType.ERROR);
	},

	/**
	 * Writes warning message to console.
	 * @param {String} message Message to log.
	 */
	warning: function(message) {
		this.log(message, Terrasoft.LogMessageType.WARNING);
	},

	/**
	 * Returns information about element type.
	 * @return {Object}
	 * @return {String} return.fullTypeName Full element type name.
	 * @return {String} return.alternateClassName Alternate element type name.
	 * @return {String} return.typePath Element type path by namespaces.
	 * @return {String} return.typeName Element type name.
	 */
	getTypeInfo: function() {
		var fullTypeName = this.$className;
		var typePath = fullTypeName.split(".");
		return {
			fullTypeName: fullTypeName,
			alternateClassName: this.alternateClassName,
			typePath: Terrasoft.deepClone(typePath),
			typeName: typePath.pop()
		};
	},

	/**
	 * Returns reference to the parent class method. Works as {@link Ext.Base#callParent}, but doesn't invoke the
	 * method.
	 * @protected
	 * @param {Object} [scope] Parent class method execution scope.
	 * @param {Arguments} [args] Parent class method arguments object.
	 * @return {Function} Parent class method.
	 */
	getParentMethod: function(scope, args) {
		var method,
			superMethod = (method = this.getParentMethod.caller) && (method.$previous ||
				((method = method.$owner ? method : method.caller) && method.$owner.superclass[method.$name]));
		if (superMethod && arguments.length > 0) {
			var argsArray = Array.prototype.slice.call(args || []);
			superMethod = Function.prototype.bind.apply(superMethod, [scope].concat(argsArray));
		}
		return superMethod;
	},

	/**
	 * Generates a wrapper function of the transferred functions.
	 * @protected
	 * @param {Function} callback The callback function.
	 * @param {Object} [scope] The scope for the callback.
	 * @return {Function}
	 */
	getSafeCallback: function(callback, scope) {
		callback = Ext.isFunction(callback) ? callback : Terrasoft.emptyFn;
		if (scope) {
			return callback.bind(scope);
		} else {
			return callback;
		}
	},

	/**
	 * Destroy object instance. If instance is already destroyed, log error message in console.
	 * Calls virtual onDestroy method to override in subclasses.
	 */
	destroy: function() {
		if (this.destroyed === true && !this.singleton) {
			var messageTemplate = Terrasoft.Resources.Controls.BaseObject.ClassInstanceAlreadyDestroyed;
			var errorMessage = Terrasoft.getFormattedString(messageTemplate, this.alternateClassName);
			this.log(errorMessage, Terrasoft.LogMessageType.ERROR);
			return;
		}
		this.onDestroy();
	},

	/**
	 * Clears all event subscriptions, and destroys the object.
	 */
	onDestroy: function() {
		this.destroyed = true;
		this.fireEvent("destroyed");
		this.clearListeners();
	}
});
