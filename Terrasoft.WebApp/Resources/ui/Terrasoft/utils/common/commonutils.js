Ext.ns("Terrasoft.utils.common");

/**
 * @singleton
 */

/**
 * Template for empty abstract method.
 * If method is not defined in child class, exception, which contains method name,
 * interface name and child class name, will be thrown.
 * @throws {@link Terrasoft.NotImplementedException}
 */
Terrasoft.abstractFn = function() {
	var fn = arguments.callee;
	var fnName = fn.$name;
	var interfaceClassName = fn.$owner.$className;
	var instanceClassName = this.$className;
	throw new Terrasoft.NotImplementedException({
		message: Ext.String.format(
			Terrasoft.Resources.CommonUtils.InterfaceMemberNotImplementedInClass,
			interfaceClassName, fnName, instanceClassName)
	});
};

/**
 * Adds objects additionalItems into parent array of source object
 * @param {Object[]} container Object array to start search.
 * @param {String} namePropertyValue value of property 'name' of object to search.
 * @param {Array} additionalItems items to add.
 */
Terrasoft.utils.common.addSchemaItems = function(container, namePropertyValue, additionalItems) {
	var result = Terrasoft.findItem(container, {name: namePropertyValue});
	if (Ext.isEmpty(result)) {
		return null;
	}
	return Ext.Array.push(result.parent, additionalItems);
};

/**
 * Alias for {@link Terrasoft.utils.common#addSchemaItems}
 * @member Terrasoft
 * @method addSchemaItems
 * @inheritdoc Terrasoft.utils.common#addSchemaItems
 */
Terrasoft.addSchemaItems = Terrasoft.utils.common.addSchemaItems;

/**
 * Adds attributes into source object.
 * @param {Object[]} container Object array to start search.
 * @param {String} namePropertyValue value of attribute 'name' of object to search.
 * @param {Object} additionalObjectProperties object attributes to add
 */
Terrasoft.utils.common.applySchemaItemProperties = function(container, namePropertyValue, additionalObjectProperties) {
	var result = Terrasoft.findItem(container, {name: namePropertyValue});
	if (Ext.isEmpty(result)) {
		return null;
	}
	return Ext.apply(result.item, additionalObjectProperties);
};

/**
 * Alias for {@link Terrasoft.utils.common#applySchemaItemProperties}
 * @member Terrasoft
 * @method applySchemaItemProperties
 * @inheritdoc Terrasoft.utils.common#applySchemaItemProperties
 */
Terrasoft.applySchemaItemProperties = Terrasoft.utils.common.applySchemaItemProperties;

/**
 * Custom implementation of call chain. Next step starts after previous step calls next().
 */
Terrasoft.chain = function() {
	const _tryExecuteObsolete = (executionArgs) => {
		const isObsolete = Ext.isObject(executionArgs[0]) && Ext.isArray(executionArgs[1]);
		if (isObsolete) {
			Terrasoft.utils.common.obsoleteChain(executionArgs[0], executionArgs[1]);
			const warningMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.MethodFormatObsolete,
				"Terrasoft.chain", "Object, Function[]", "Function, ..., Function [, Object]");
			window.console.log(warningMessage);
		}
		return isObsolete;
	};
	const _getContext = (chainArgs) => {
		const lastArg = chainArgs[chainArgs.length - 1];
		let context = this;
		if (Ext.isObject(lastArg)) {
			context = lastArg;
			Array.prototype.pop.call(chainArgs);
		} else if (!Ext.isFunction(lastArg)) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		return context;
	};
	function* _generateIterator(fns) {
		const context = _getContext(fns);
		for (let fn of fns) {
			if (!Ext.isFunction(fn)) {
				throw new Terrasoft.UnsupportedTypeException();
			}
			yield fn.bind(context);
		}
	}
	function _obsoleteChainExecute(args) {
		const fns = arguments, lastArgIndex = fns.length - 1;
		let context = _getContext(arguments);
		let fnIndex = -1;
		const nextFn = function() {
			fnIndex++;
			const fn = fns[fnIndex];
			if (fnIndex < lastArgIndex) {
				if (!Ext.isFunction(fn)) {
					throw new Terrasoft.UnsupportedTypeException();
				}
			}
			if (fnIndex < fns.length) {
				const fnArgs = Array.prototype.slice.call(arguments);
				fnArgs.unshift(nextFn);
				fn.apply(context, fnArgs);
			}
		};
		nextFn();
	}
	if (!_tryExecuteObsolete(arguments)) {
		if (Ext.isIE || Ext.isSafari) {
			_obsoleteChainExecute(...arguments);
		} else {
			const iterator = _generateIterator(arguments);
			(function nextFn() {
				const item = iterator.next();
				!item.done && item.value(nextFn, ...arguments);
			})();
		}
	}
};

/**
 * Alias for {@link Terrasoft#chain}
 * @member Terrasoft.utils.common
 * @method chain
 * @inheritdoc Terrasoft#chain
 */
Terrasoft.utils.common.chain = Terrasoft.chain;

/**
 * Dynamically generates chain steps for array or collection items, using generator function.
 * Also allows to set finally callback function after all steps will be executed.
 *
 * Usage:<pre><code>
 Terrasoft.chainForArray(states, function(item, i, list) {
   return [
     this.asyncFunction,
     function(next) {
       console.log(i); (some operations)
       next();
   }];
}, function() {
     Ext.callback(callback, scope || this);
}, this);
 </code></pre>
 * @param {Mixed} list Array or collection of items.
 * @param {Function} generator Function which generates chain steps for each item of collection.
 * @param {Function} callback Finally callback function.
 * @param {Object} scope Chain executing context.
 */
Terrasoft.utils.common.chainForArray = function(list, generator, callback, scope) {
	if (Ext.isEmpty(list) || !Ext.isFunction(generator)) {
		throw new Terrasoft.UnsupportedTypeException();
	}
	var me = this;
	var steps = [];
	Terrasoft.each(list, function(item, index, collection) {
		var res = generator.call(me, item, index, collection);
		if (Ext.isArray(res)) {
			steps.push.apply(steps, res);
		} else if (!Ext.isEmpty(res)) {
			steps.push(res);
		}
	}, this);
	if (Ext.isFunction(callback) || (Ext.isObject(callback) && Ext.isEmpty(scope))) {
		steps.push(callback);
	}
	if (Ext.isObject(scope)) {
		steps.push(scope);
	}
	Terrasoft.utils.common.chain.apply(me, steps);
};

/**
 * Alias for {@link Terrasoft.utils.common#chainForArray}
 * @member Terrasoft
 * @method chainForArray
 * @inheritdoc Terrasoft.utils.common#chainForArray
 */
Terrasoft.chainForArray = Terrasoft.utils.common.chainForArray;

/**
 * Creates a copy of sourceCollection, that doesn't contains elements from collectionToCompare.
 * @param {Terrasoft.Collection} sourceCollection Collection of elements, the elements which are added to the
 * the resulting collection.
 * @param {Terrasoft.Collection} collectionToCompare Collection of elements for comparison.
 * @param {Function} comparator Comparison function for sourceCollection and collectionToCompare.
 * Returns true, if the elements are the same.
 * @param {Object} scope Scope of the comparator.
 * @return {Terrasoft.Collection} The resulting collection of elements.
 */
Terrasoft.utils.common.collectionDifference = function(sourceCollection, collectionToCompare, comparator, scope) {
	var result = sourceCollection.clone();
	sourceCollection.each(function(sourceItem) {
		collectionToCompare.each(function(itemToCompare) {
			if (comparator.call(scope || this, sourceItem, itemToCompare)) {
				result.remove(sourceItem);
			}
		});
	});
	return result;
};

/**
 * Alias for {@link Terrasoft.utils.common#collectionDifference}
 * @member Terrasoft
 * @method collectionDifference
 * @inheritdoc Terrasoft.utils.common#collectionDifference
 */
Terrasoft.collectionDifference = Terrasoft.utils.common.collectionDifference;

/**
 * Combines arguments into string. Delimiter "/".
 * Example:
 *  Terrasoft.utils.common.combinePath("SectionModule", "ContactSection");
 * Result:
 *  "SectionModule/ContactSection"
 * @return {String}
 */
Terrasoft.utils.common.combinePath = function() {
	return Array.prototype.slice.call(arguments).join("/");
};

/**
 * Alias for {@link Terrasoft.utils.common#combinePath}
 * @member Terrasoft
 * @method combinePath
 * @inheritdoc Terrasoft.utils.common#combinePath
 */
Terrasoft.combinePath = Terrasoft.utils.common.combinePath;

/**
 * Transforms string into BLOB array.
 * @param {String} str Source string.
 * @return {Array} Array with bytecodes of each symbol.
 */
Terrasoft.convertStringToBlobArray = function(str) {
	var out = [];
	var position = 0;
	for (var i = 0; i < str.length; i++) {
		var code = str.charCodeAt(i);
		/*jshint bitwise:false */
		if (code < 128) {
			out[position++] = String.fromCharCode(code);
		} else if (code < 2048) {
			out[position++] = String.fromCharCode((code >> 6) | 192);
			out[position++] = String.fromCharCode((code & 63) | 128);
		} else {
			out[position++] = String.fromCharCode((code >> 12) | 224);
			out[position++] = String.fromCharCode(((code >> 6) & 63) | 128);
			out[position++] = String.fromCharCode((code & 63) | 128);
		}
		/*jshint bitwise:true */
	}
	return out;
};

/**
 * Returns version of function, which starts not earlier, than wait timespan elapses, after its last call.
 * Useful for logic, which depends on user actions.
 * E.g. it's better to check user's spelling after the end of input, it's better to dynamically recalculate
 * markup after user finishes to resize the window.
 * @param {Function} fn Callback function.
 * @param {Number} wait Wait timespan from last call.
 * @param {Boolean} immediate Indicates whether callback should be performed in the beginning of pause.
 */
Terrasoft.utils.common.debounce = function(fn, wait, immediate) {
	return _.debounce(fn, wait, immediate);
};

/**
 * Alias for {@link Terrasoft.utils.common#debounce}
 * @member Terrasoft
 * @method debounce
 * @inheritdoc Terrasoft.utils.common#debounce
 */
Terrasoft.debounce = Terrasoft.utils.common.debounce;

/**
 * Defers invoking the function until the current call stack has cleared, similar to using setTimeout with a delay of 0.
 * @param {Function} fn Function.
 * @param {Function} scope Function context.
 * @returns {Number} Deferred function handle.
 */
Terrasoft.utils.common.defer = function(fn, scope) {
	return _.defer(function() {
		fn.call(scope || this);
	});
};

/**
 * Alias for {@link Terrasoft.utils.common#defer}
 * @member Terrasoft
 * @method defer
 * @inheritdoc Terrasoft.utils.common#defer
 */
Terrasoft.defer = Terrasoft.utils.common.defer;

/**
 * Cancels deferred function.
 * @param {Number} handle Deferred function handle returned by {@link Terrasoft.utils.common#defer} method.
 */
Terrasoft.utils.common.cancelDeferred = function(handle) {
	clearTimeout(handle);
};

/**
 * Alias for {@link Terrasoft.utils.common#cancelDeferred}
 * @member Terrasoft
 * @method cancelDeferred
 * @inheritdoc Terrasoft.utils.common#cancelDeferred
 */
Terrasoft.cancelDeferred = Terrasoft.utils.common.cancelDeferred;

/**
 * Invoke function with a specified delay.
 * @param {Function} fn Function.
 * @param {Object} scope Function context.
 * @param {Number} timeout Function call timeout.
 * @param {Object[]} [args] Function arguments.
 */
Terrasoft.delay = function(fn, scope, timeout, args) {
	Ext.callback(fn, scope, args, timeout || 1);
};

/**
 * Alias for {@link Terrasoft#delay}
 * @member Terrasoft
 * @method delay
 * @inheritdoc Terrasoft#delay
 */
Terrasoft.utils.common.delay = Terrasoft.delay;

/**
 * Empty function template.
 */
Terrasoft.emptyFn = Ext.emptyFn;

/**
 * Generates unique key for filter.
 * @return {String} Unique key.
 */
Terrasoft.generateFilterKey = function() {
	return Terrasoft.generateGUID();
};

/**
 * Returns object by configuration. If object has property className, instance of required class will be created.
 * otherwise config will be returned.
 * @param {Object} config Item Configuration.
 * @return {Object} Initialized config.
 */
Terrasoft.utils.common.getItemByConfig = function(config) {
	var result = config;
	var className = config.className;
	if (className) {
		delete config.className;
		result = Ext.create(className, config);
	}
	return result;
};

/**
 * Alias for {@link Terrasoft.utils.common#getItemByConfig}
 * @member Terrasoft
 * @method getItemByConfig
 * @inheritdoc Terrasoft.utils.common#getItemByConfig
 */
Terrasoft.getItemByConfig = Terrasoft.utils.common.getItemByConfig;

/**
 * Retuns mouse button by passed event.
 * @param {Ext.EventObject|MouseEvent} event Mouse click event.
 * @return {Terrasoft.MouseButton} Mouse button.
 */
Terrasoft.utils.common.getMouseButton = function(event) {
	var browserEvent = event.browserEvent || event;
	var which = browserEvent.which;
	if (!which && browserEvent.button) {
		var ieValue = browserEvent.button;
		/*jshint bitwise: false*/
		if (ieValue & 1) {
			which = 1;
		} else if (ieValue & 4) {
			which = 2;
		} else if (ieValue & 2) {
			which = 3;
		}
		/*jshint bitwise: true*/
	}
	var buttonMap = {
		1: Terrasoft.MouseButton.LEFT,
		2: Terrasoft.MouseButton.MIDDLE,
		3: Terrasoft.MouseButton.RIGHT
	};
	return buttonMap[which];
};

/**
 * Alias for {@link Terrasoft.utils.common#getMouseButton}
 * @member Terrasoft
 * @method getMouseButton
 * @inheritdoc Terrasoft.utils.common#getMouseButton
 */
Terrasoft.getMouseButton = Terrasoft.utils.common.getMouseButton;

/**
 * Shows input window.
 * @param  {String} caption Window caption.
 * @param  {Function} handler Buttons handler and ESC key press handler.
 * @param  {Array} buttons Control buttons array.
 * Example:
 * buttons: ['yes', 'no', {
 *	className: 'Terrasoft.Button',
 *	returnCode: 'customButton',
 *	style: 'green',
 *	caption: 'myButton'
 * }]
 * @param  {Object} scope Context of handler execution.
 * @param  {Object} controls Custom control elements configuration
 * Example:
 {
	link: {
		dataValueType: Terrasoft.DataValueType.TEXT,
		caption: 'Text',
		value: 'Text',
		renderTo: 'custom-container'
	},
	checkbox: {
		dataValueType: Terrasoft.DataValueType.BOOLEAN,
		caption: 'Boolean',
		value: true,
		renderTo: 'custom-container'
	},
	date: {
		dataValueType: Terrasoft.DataValueType.DATE,
		caption: 'Date',
		value: new Date(Date.now()),
		renderTo: 'custom-container'
	}
}
 * @param  {Object} cfg {@link Terrasoft.utils#showMessageBox cfg}
 */
Terrasoft.utils.inputBox = function(caption, handler, buttons, scope, controls, cfg) {
	var messageBox = Terrasoft.MessageBox;
	var config = {
		caption: caption || "",
		handler: handler,
		buttons: buttons,
		scope: scope,
		controlConfig: controls,
		style: Terrasoft.MessageBoxStyles.BLUE
	};
	Ext.apply(config, cfg);
	messageBox.prepare(config);
	messageBox.show();
};

/**
 * Alias for {@link Terrasoft.utils#inputBox}
 * @member Terrasoft
 * @method inputBox
 * @inheritdoc Terrasoft.utils#inputBox
 */
Terrasoft.showInputBox = Terrasoft.utils.inputBox;

/**
 * Add items into array after object with attribute namePropertyValue.
 * @param {Object[]} container Object array to start search.
 * @param {String} namePropertyValue value of property 'name' of object to search.
 * @param {Array} additionalItems Items to add.
 */
Terrasoft.utils.common.insertSchemaItemsAfter = function(container, namePropertyValue, additionalItems) {
	var result = Terrasoft.findItem(container, {name: namePropertyValue});
	if (Ext.isEmpty(result)) {
		return null;
	}
	result.index += 1;
	return Ext.Array.insert(result.parent, result.index, additionalItems);
};

/**
 * Alias for {@link Terrasoft.utils.common#insertSchemaItemsAfter}
 * @member Terrasoft
 * @method insertSchemaItemsAfter
 * @inheritdoc Terrasoft.utils.common#insertSchemaItemsAfter
 */
Terrasoft.insertSchemaItemsAfter = Terrasoft.utils.common.insertSchemaItemsAfter;

/**
 * Performs null check.
 * @param {Mixed} value Value to check.
 * @return {Boolean} Returns true if value is null.
 */
Terrasoft.utils.common.isNull = function(value) {
	return _.isNull(value);
};

/**
 * Alias for {@link Terrasoft.utils.common#isNull}
 * @member Terrasoft
 * @method isNull
 * @inheritdoc Terrasoft.utils.common#isNull
 */
Terrasoft.isNull = Terrasoft.utils.common.isNull;

/**
 * Performs undefined check.
 * @param {Mixed} value Value to check.
 * @return {Boolean} Returns true if value is undefined.
 */
Terrasoft.utils.common.isUndefined = function(value) {
	return _.isUndefined(value);
};

/**
 * Implements call chain with functions in parameter steps. Next step starts in execution after previous step
 * calls next().
 * @throws {Terrasoft.UnsupportedTypeException}
 * Throws when steps chain parameter is not array.
 * @param {Object} context Chain execution context. Is used to exclude closures. All data necessary for steps work
 * should be provided here. Link to object is passed in every step, hence every step has possibility to modify
 * this dara. Also before execution of every step link to next() added here.
 * @param {Function[]} steps Array of chain steps.
 */
Terrasoft.utils.common.obsoleteChain = function(context, steps) {
	if (steps && !(steps instanceof Array)) {
		throw new Terrasoft.UnsupportedTypeException({
			message: Terrasoft.Resources.chain.StepsArgumentUnsupportedTypeMessage
		});
	}
	var stepIndex = -1;

	function nextStep() {
		stepIndex++;
		if (stepIndex === steps.length) {
			return;
		}
		context.next = nextStep;
		var step = steps[stepIndex];
		step(context);
	}

	nextStep();
};

/**
 * Loads required modules.
 * Only string can serve as an argument to load module.
 * @param {Array|String} deps Modules to load.
 * @param {Function} callback Execution callback.
 * @param {Object} scope Scope of callback execution.
 * @param {Function} [errorCallback] Execution callback if error.
 */
Terrasoft.require = function(deps, callback, scope, errorCallback) {
	require(deps, function() {
		callback.apply(scope, arguments);
	}, errorCallback);
};

/**
 * Alias for {@link Terrasoft#require}
 * @member Terrasoft.utils.common
 * @method require
 * @inheritdoc Terrasoft#require
 */
Terrasoft.utils.common.require = Terrasoft.require;

/**
 * Rounds value to precision.
 * @param {Number} value Value to round.
 * @param {Number} precision Required precision (number of digits after comma).
 * @return {Number} Rounded value.
 */
Terrasoft.utils.common.round = function(value, precision) {
	return Ext.util.Format.round(value, precision);
};

/**
 * Saves user profile.
 * @param {String} key Profile key.
 * @param {Object} profile User profile.
 * @param {Boolean} isDefault (optional) Shows whether to save default profile of profile of current user.
 * @param {Function} callback Execution callback.
 * @param {Object} scope Scope of callback execution.
 */
Terrasoft.utils.saveUserProfile = function(key, profile, isDefault, callback, scope) {
	if (require.defined("profile")) {
		var profileApi = require("profile");
		profileApi.addKey(key);
	}
	var jsonData = Terrasoft.encode({
		key: key,
		data: profile ? Terrasoft.encode(profile) : "",
		isDef: isDefault
	});
	requirejs.undef("profile!" + key);
	Terrasoft.ServiceProvider.executeRequest("UserProfile", jsonData, callback, scope);
};

/**
 * Alias for {@link Terrasoft.utils#saveUserProfile}
 * @member Terrasoft
 * @method saveUserProfile
 * @inheritdoc Terrasoft.utils#saveUserProfile
 */
Terrasoft.saveUserProfile = Terrasoft.utils.saveUserProfile;

/**
 * Returns button config.
 * @param {String} caption Button caption.
 * @param {String} returnCode Button return code.
 * @param {String} [markerValue] Button marker value. If empty caption used instead.
 * @return {Object}
 */
Terrasoft.getButtonConfig = function(returnCode, caption, markerValue) {
	Terrasoft.checkArguments(arguments, ["returnCode", "caption"]);
	return {
		className: "Terrasoft.Button",
		caption: caption,
		markerValue: markerValue || caption,
		returnCode: returnCode
	};
};

/**
 * @inheritdoc Terrasoft.utils#getButtonConfig
 * Returns button config with BLUE style.
 */
Terrasoft.getBlueButtonConfig = function(returnCode, caption, markerValue) {
	var config = Terrasoft.getButtonConfig(returnCode, caption, markerValue);
	config.style = Terrasoft.controls.ButtonEnums.style.BLUE;
	return config;
};

/**
 * Shows confirmation window.
 * @param  {String} caption Window caption.
 * @param  {Function} handler Buttons handler and ESC key press handler.
 * @param  {Array} buttons Control buttons array.
 * Example:
 * buttons: ['yes', 'no', {
 *	className: 'Terrasoft.Button',
 *	returnCode: 'customButton',
 *	style: 'green',
 *	caption: 'myButton'
 * }]
 * @param  {Object} scope Handler execution context.
 * @param  {Object} cfg {@link Terrasoft.utils#showMessageBox cfg}
 */
Terrasoft.utils.showConfirmation = function(caption, handler, buttons, scope, cfg) {
	var messageBox = Terrasoft.MessageBox;
	var config = {
		caption: caption || "",
		handler: handler,
		buttons: buttons,
		scope: scope,
		style: Terrasoft.MessageBoxStyles.BLUE
	};
	Ext.apply(config, cfg);
	messageBox.prepare(config);
	messageBox.show();
};

/**
 * Alias for {@link Terrasoft.utils#showConfirmation}
 * @member Terrasoft
 * @method showConfirmation
 * @inheritdoc Terrasoft.utils#showConfirmation
 */
Terrasoft.showConfirmation = Terrasoft.utils.showConfirmation;

/**
 * Shows information window.
 * @param  {String} caption Window caption.
 * @param  {Function} [handler] Buttons handler and ESC key press handler.
 * @param  {Object} [scope] Handler execution context.
 * @param  {Object} [cfg] {@link Terrasoft.utils#showMessage cfg}
 */
Terrasoft.showInformation = function(caption, handler, scope, cfg) {
	var messageBox = Terrasoft.MessageBox;
	var defaultConfig = {
		buttons: ["ok"],
		style: Terrasoft.MessageBoxStyles.BLUE,
		defaultButton: 0
	};
	var config = {
		caption: caption || "",
		handler: handler,
		scope: scope
	};
	Ext.apply(config, cfg, defaultConfig);
	messageBox.prepare(config);
	messageBox.show();
};

/**
 * Alias for {@link Terrasoft#showInformation}
 * @member Terrasoft.utils
 * @method showInformation
 * @inheritdoc Terrasoft#showInformation
 */
Terrasoft.utils.showInformation = Terrasoft.showInformation;

Terrasoft.showErrorMessage = function(message, handler, scope) {
	Terrasoft.showInformation(message, handler, scope, {
		style: Terrasoft.MessageBoxStyles.RED
	});
};

/**
 * Shows dialog window.
 * @param  {Object} cfg Configuration object
 * @param  {String} cfg.caption Window caption.
 * @param  {Array} cfg.buttons Control buttons array, {@link Terrasoft.MessageBox#buttons}.
 * Example:
 *
 * buttons: ['yes', 'no', {
 *	className: 'Terrasoft.Button',
 *	returnCode: 'customButton',
 *	style: 'green',
 *	caption: 'myButton'
 * }]
 *
 * @param  {Number} cfg.buttons Buttons array index for default button. Numeration starts from zero.
 * @param  {Function} cfg.handler Buttons handler and ESC key press handler.
 * @param  {Object} cfg.scope Handler execution context.
 * @param  {Terrasoft.controls.MessageBoxEnums.Styles} cfg.style Control element style.
 * Example
 *
 * showMessage({
 *  caption: "Message",
 *  buttons: ["ok"],
 *  style: "green"
 * });
 *
 * showMessage("Message");
 *
 */
Terrasoft.showMessage = function(cfg) {
	if (Ext.isString(cfg)) {
		cfg = {caption: cfg};
	}
	var messageBox = Terrasoft.MessageBox;
	messageBox.applyDefaultConfig();
	Ext.apply(messageBox, cfg);
	messageBox.reConfigurateButtonItems();
	messageBox.setVisible(true);
};

/**
 * Alias for {@link Terrasoft#showMessage}
 * @inheritdoc Terrasoft#showMessage
 */
Terrasoft.utils.showMessage = Terrasoft.showMessage;

/**
 * Returns function version, which if called repeatedly is executed at least at wait timespan.
 * Useful for events, which occur to frequently.
 * @param {Function} fn Callback function.
 * @param {Integer} wait Timespan when event grouping is performed.
 * @param {Object} options Options.
 * @return {Object}
 */
Terrasoft.utils.common.throttle = function(fn, wait, options) {
	return _.throttle(fn, wait, options);
};

/**
 * Alias for {@link Terrasoft.utils.common#throttle}
 * @member Terrasoft
 * @method throttle
 * @inheritdoc Terrasoft.utils.common#throttle
 */
Terrasoft.throttle = Terrasoft.utils.common.throttle;

/**
 * Returns mark of the right to left mode.
 * @return {Boolean} Mark of the right to left mode.
 */
Terrasoft.utils.common.getIsRtlMode = function() {
	var resources = Terrasoft.Resources;
	var cultureSettings = resources && resources.CultureSettings;
	var isRtlMode = cultureSettings && cultureSettings.isRightToLeft;
	return Boolean(isRtlMode);
};

/**
 * Alias for {@link Terrasoft.utils.common#getIsRtlMode}
 * @member Terrasoft
 * @method getIsRtlMode
 * @inheritdoc Terrasoft.utils.common#getIsRtlMode
 */
Terrasoft.getIsRtlMode = Terrasoft.utils.common.getIsRtlMode;

/**
 * Returns entity column name in data model.
 * @param {Object} entityColumn Column configuration information.
 * @return {String} Entity column name in data model.
 */
Terrasoft.utils.common.getEntityColumnValueName = function(entityColumn) {
	if (Ext.isEmpty(entityColumn)) {
		return "";
	}
	return (entityColumn.isLookup && entityColumn.referenceSchema)
		? Ext.String.format("{0}{1}", entityColumn.name, entityColumn.referenceSchema.primaryColumnName)
		: entityColumn.name;
};

/**
 * Alias for {@link Terrasoft.utils.common#getEntityColumnValueName}
 * @member Terrasoft
 * @method getEntityColumnValueName
 * @inheritdoc Terrasoft.utils.common#getEntityColumnValueName
 */
Terrasoft.getEntityColumnValueName = Terrasoft.utils.common.getEntityColumnValueName;

/**
 * Returns entity column predictable state.
 * @param {String} entitySchemaName Entity schema name.
 * @param {Object} entityColumn Column configuration information.
 * @return {Boolean} Entity column predictable state.
 */
Terrasoft.utils.common.getIsPredictableColumn = function(entitySchemaName, entityColumn) {
	if (Ext.isEmpty(entitySchemaName)) {
		return false;
	}
	var columnValueName = Terrasoft.getEntityColumnValueName(entityColumn);
	var predictableEntity = Terrasoft.configuration && Terrasoft.configuration.PredictableEntities &&
		Terrasoft.configuration.PredictableEntities[entitySchemaName];
	var predictableEntityModels = predictableEntity && predictableEntity.Models || {};
	var modelValues = Ext.Object.getValues(predictableEntityModels);
	var predictableModel = Ext.Array.findBy(modelValues, function(item) {
		return item.output && (item.output.name === columnValueName);
	});
	return !Ext.isEmpty(predictableModel);
};

/**
 * Alias for {@link Terrasoft.utils.common#getIsPredictableColumn}
 * @member Terrasoft
 * @method getIsPredictableColumn
 * @inheritdoc Terrasoft.utils.common#getIsPredictableColumn
 */
Terrasoft.getIsPredictableColumn = Terrasoft.utils.common.getIsPredictableColumn;

/**
 * Returns predictable columns.
 * @param {String} entitySchemaName Entity schema name.
 * @param {Object} entityColumns Entity columns configuration information.
 * @return {Object[]} Predictable entity columns.
 */
Terrasoft.utils.common.getPredictableColumns = function(entitySchemaName, entityColumns) {
	var columnsArray = Ext.Object.getValues(entityColumns);
	return Ext.Array.filter(columnsArray, function(column) {
		return Terrasoft.getIsPredictableColumn(entitySchemaName, column);
	});
};

/**
 * Alias for {@link Terrasoft.utils.common#getPredictableColumns}
 * @member Terrasoft
 * @method getPredictableColumns
 * @inheritdoc Terrasoft.utils.common#getPredictableColumns
 */
Terrasoft.getPredictableColumns = Terrasoft.utils.common.getPredictableColumns;

/**
 * Checks whether string is empty, empty guid or empty state of object when strict.
 * @param {Mixed} value Value to check.
 * @param {Boolean} [strict] If true checks internal empty state for complex objects.
 * @return {Boolean}
 * Examples:
 *
 *  Terrasoft.isEmpty(null); // return true
 *
 *  Terrasoft.isEmpty(""); // return true
 *
 *  Terrasoft.isEmpty([]); // return true
 *
 *  Terrasoft.isEmpty([1, 2, 3]); // return false
 *
 *  Terrasoft.isEmpty("test"); // return false
 *
 *  var collection = new Terrasoft.Collection();
 *  Terrasoft.isEmpty(collection; // return false
 *
 *  var collection = new Terrasoft.Collection();
 *  Terrasoft.isEmpty(collection, true); // return true
 *
 *  var collection = new Terrasoft.Collection();
 *  collection.add(1, {});
 *  Terrasoft.isEmpty(collection, true); // return false
 *
 */
Terrasoft.isEmpty = function(value, strict) {
	let result = Ext.isEmpty(value) || Terrasoft.isEmptyGUID(value);
	if (!result && strict) {
		if (value instanceof Terrasoft.Collection) {
			result = value.isEmpty();
		}
	}
	return result;
};

/**
 * Alias for {@link Terrasoft#isEmpty}
 * @member Terrasoft
 * @method isEmpty
 * @inheritdoc Terrasoft#isEmpty
 */
Terrasoft.utils.common.isEmpty = Terrasoft.isEmpty;

/**
 * Destroy object if it is not destroyed already.
 * @param {Terrasoft.core.BaseObject...} objects Objects to destroy.
 * Example:
 *
 * Terrasoft.utils.common.safeDestroy(object1, object2, object3);
 */
Terrasoft.safeDestroy = function() {
	var args = Array.prototype.slice.call(arguments);
	args.forEach(function(object) {
		if (object && !object.destroyed && Ext.isFunction(object.destroy)) {
			object.destroy();
		}
	});
};

/**
 * Alias for {@link Terrasoft#safeDestroy}
 * @member Terrasoft
 * @method safeDestroy
 * @inheritdoc Terrasoft#safeDestroy
 */
Terrasoft.utils.common.safeDestroy = Terrasoft.safeDestroy;

/**
 * Safe destroy object property {@link Terrasoft.safeDestroy} and set null.
 * @param {Object} object Object.
 * @param {String} property Property name of object.
 */
Terrasoft.clearProperty = function(object, property) {
	Terrasoft.safeDestroy(object[property]);
	object[property] = null;
};

/**
 * Alias for {@link Terrasoft#clearProperty}
 * @member Terrasoft
 * @method clearProperty
 * @inheritdoc Terrasoft#clearProperty
 */
Terrasoft.utils.common.clearProperty = Terrasoft.clearProperty;

/**
 * Check if arguments are undefined or null.
 * @param {Array} args Arguments array for check.
 * @param {String[]|String} names Names of arguments in order to appears or name of first argument.
 * @param {Boolean} [allowEmptyString] true to allow empty strings (defaults to false).
 */
Terrasoft.checkArguments = function(args, names, allowEmptyString) {
	if (!_.isArray(names)) {
		names = [names];
	}
	var count = names.length;
	for (var i = 0; i < count; i++) {
		var value = args[i];
		if (Ext.isEmpty(value, allowEmptyString)) {
			throw new Terrasoft.ArgumentNullOrEmptyException({argumentName: names[i]});
		}
	}
};

/**
 * Alias for {@link Terrasoft#checkArguments}
 * @member Terrasoft
 * @method checkArguments
 * @inheritdoc Terrasoft#checkArguments
 */
Terrasoft.utils.common.checkArguments = Terrasoft.checkArguments;

/**
 * Check if arguments are defined.
 * @param {Array} args Arguments array for check.
 * @param {String[]|String} names Names of arguments in order to appears or name of first argument.
 */
Terrasoft.checkArgumentsDefined = function(args, names) {
	if (!_.isArray(names)) {
		names = [names];
	}
	var count = names.length;
	for (var i = 0; i < count; i++) {
		var value = args[i];
		if (!Ext.isDefined(value)) {
			throw new Terrasoft.ArgumentNullOrEmptyException({argumentName: names[i]});
		}
	}
};

/**
 * Alias for {@link Terrasoft#checkArgumentsDefined}
 * @member Terrasoft
 * @method checkArgumentsDefined
 * @inheritdoc Terrasoft#checkArgumentsDefined
 */
Terrasoft.utils.common.checkArgumentsDefined = Terrasoft.checkArgumentsDefined;

//region obsolete

//region ArrayUtils

/**
 * @member Terrasoft.utils.common
 * @method areArraysEqual
 * @inheritdoc Terrasoft.utils.array#areArraysEqual
 * @deprecated Use Terrasoft.utils.array.areArraysEqual instead
 */
/*global console:false */
Terrasoft.utils.common.areArraysEqual = function(array1, array2) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.areArraysEqual", "Terrasoft.utils.array.areArraysEqual");
	console.log(obsoleteMessage);
	return Terrasoft.utils.array.areArraysEqual(array1, array2);
};

/**
 * @member Terrasoft.utils.common
 * @method compact
 * @inheritdoc Terrasoft.utils.array#compact
 * @deprecated Use Terrasoft.utils.array.compact instead
 */
Terrasoft.utils.common.compact = function(array) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.compact", "Terrasoft.utils.array.compact");
	console.log(obsoleteMessage);
	return Terrasoft.utils.array.compact(array);
};

/**
 * @member Terrasoft.utils.common
 * @method contains
 * @inheritdoc Terrasoft.utils.array#contains
 * @deprecated Use Terrasoft.utils.array.contains instead
 */
Terrasoft.utils.common.contains = function(list, value) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.contains", "Terrasoft.utils.array.contains");
	console.log(obsoleteMessage);
	return Terrasoft.utils.array.contains(list, value);
};

/**
 * @member Terrasoft.utils.common
 * @method difference
 * @inheritdoc Terrasoft.utils.array#difference
 * @deprecated Use Terrasoft.utils.array.difference instead
 */
Terrasoft.utils.common.difference = function(array, others) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.difference", "Terrasoft.utils.array.difference");
	console.log(obsoleteMessage);
	return Terrasoft.utils.array.difference(array, others);
};

/**
 * @member Terrasoft.utils.common
 * @method each
 * @inheritdoc Terrasoft.utils.array#each
 * @deprecated Use Terrasoft.utils.array.each instead
 */
Terrasoft.utils.common.each = function(list, iterator, context) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.each", "Terrasoft.utils.array.each");
	console.log(obsoleteMessage);
	return Terrasoft.utils.array.each(list, iterator, context);
};

/**
 * @member Terrasoft.utils.common
 * @method findItem
 * @inheritdoc Terrasoft.utils.array#findItem
 * @deprecated Use Terrasoft.utils.array.findItem instead
 */
Terrasoft.utils.common.findItem = function(container, filter) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.findItem", "Terrasoft.utils.array.findItem");
	console.log(obsoleteMessage);
	return Terrasoft.utils.array.findItem(container, filter);
};

/**
 * @member Terrasoft.utils.common
 * @method findWhere
 * @inheritdoc Terrasoft.utils.array#findWhere
 * @deprecated Use Terrasoft.utils.array.findWhere instead
 */
Terrasoft.utils.common.findWhere = function(list, properties) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.findWhere", "Terrasoft.utils.array.findWhere");
	console.log(obsoleteMessage);
	return Terrasoft.utils.array.findWhere(list, properties);
};

/**
 * @member Terrasoft.utils.common
 * @method rotateArray
 * @inheritdoc Terrasoft.utils.array#rotateArray
 * @deprecated Use Terrasoft.utils.array.rotateArray instead
 */
Terrasoft.utils.common.rotateArray = function(array, rotationCount) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.rotateArray", "Terrasoft.utils.array.rotateArray");
	console.log(obsoleteMessage);
	return Terrasoft.utils.array.rotateArray(array, rotationCount);
};

/**
 * @member Terrasoft.utils.common
 * @method some
 * @inheritdoc Terrasoft.utils.array#some
 * @deprecated Use Terrasoft.utils.array.some instead
 */
Terrasoft.utils.common.some = function(list, iterator, context) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.some", "Terrasoft.utils.array.some instead");
	console.log(obsoleteMessage);
	return Terrasoft.utils.array.some(list, iterator, context);
};

/**
 * @member Terrasoft.utils.common
 * @method sortedIndex
 * @inheritdoc Terrasoft.utils.array#sortedIndex
 * @deprecated Use Terrasoft.utils.array.sortedIndex instead
 */
Terrasoft.utils.common.sortedIndex = function(list, value, iterator, context) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.sortedIndex", "Terrasoft.utils.array.sortedIndex instead");
	console.log(obsoleteMessage);
	return Terrasoft.utils.array.sortedIndex(list, value, iterator, context);
};

/**
 * @member Terrasoft.utils.common
 * @method where
 * @inheritdoc Terrasoft.utils.array#where
 * @deprecated Use Terrasoft.utils.array.where instead
 */
Terrasoft.utils.common.where = function(list, properties) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.where", "Terrasoft.utils.array.where");
	console.log(obsoleteMessage);
	return Terrasoft.utils.array.where(list, properties);
};

/**
 * @member Terrasoft.utils.common
 * @method without
 * @inheritdoc Terrasoft.utils.array#without
 * @deprecated Use Terrasoft.utils.array.without instead
 */
Terrasoft.utils.common.without = function(array, values) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.without", "Terrasoft.utils.array.without");
	console.log(obsoleteMessage);
	return Terrasoft.utils.array.without(array, values);
};
//endregion

//region DataValueTypeUtils

/**
 * @member Terrasoft.utils.common
 * @method convertToClientDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#convertToClientDataValueType
 * @deprecated
 */
Terrasoft.utils.common.convertToClientDataValueType = function(dataValueType) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.convertToClientDataValueType",
		"Terrasoft.utils.dataValueType.convertToClientDataValueType");
	console.log(obsoleteMessage);
	return Terrasoft.utils.dataValueType.convertToClientDataValueType(dataValueType);
};

/**
 * @member Terrasoft.utils.common
 * @method convertToServerDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#convertToServerDataValueType
 * @deprecated
 */
Terrasoft.utils.common.convertToServerDataValueType = function(dataValueType) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.convertToServerDataValueType",
		"Terrasoft.utils.dataValueType.convertToServerDataValueType");
	console.log(obsoleteMessage);
	return Terrasoft.utils.dataValueType.convertToServerDataValueType(dataValueType);
};

/**
 * @member Terrasoft.utils.common
 * @method getImageNameByDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#getImageNameByDataValueType
 * @deprecated
 */
Terrasoft.utils.common.getImageNameByDataValueType = function(dataValueType) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.getImageNameByDataValueType",
		"Terrasoft.utils.dataValueType.getImageNameByDataValueType");
	console.log(obsoleteMessage);
	return Terrasoft.utils.dataValueType.getImageNameByDataValueType(dataValueType);
};

/**
 * @member Terrasoft.utils.common
 * @method instanceOfClass
 * @inheritdoc Terrasoft.utils.dataValueType#isInstanceOfClass
 * @deprecated
 */
Terrasoft.utils.common.instanceOfClass = function(instance, className) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.instanceOfClass",
		"Terrasoft.utils.dataValueType.isInstanceOfClass");
	console.log(obsoleteMessage);
	return Terrasoft.utils.dataValueType.isInstanceOfClass(instance, className);
};

/**
 * @member Terrasoft
 * @method instanceOfClass
 * @inheritdoc Terrasoft#isInstanceOfClass
 * @deprecated
 */
Terrasoft.instanceOfClass = Terrasoft.isInstanceOfClass;

/**
 * @member Terrasoft.utils.common
 * @method isDateDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#isDateDataValueType
 * @deprecated
 */
Terrasoft.utils.common.isDateDataValueType = function(dataValueType) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.isDateDataValueType", "Terrasoft.utils.dataValueType.isDateDataValueType");
	console.log(obsoleteMessage);
	return Terrasoft.utils.dataValueType.isDateDataValueType(dataValueType);
};

/**
 * @member Terrasoft.utils.common
 * @method isLookupDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#isLookupDataValueType
 * @deprecated
 */
Terrasoft.utils.common.isLookupDataValueType = function(dataValueType) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.isLookupDataValueType", "Terrasoft.utils.dataValueType.isLookupDataValueType");
	console.log(obsoleteMessage);
	return Terrasoft.utils.dataValueType.isLookupDataValueType(dataValueType);
};

/**
 * @member Terrasoft.utils.common
 * @method isNumberDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#isNumberDataValueType
 * @deprecated
 */
Terrasoft.utils.common.isNumberDataValueType = function(dataValueType) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.isNumberDataValueType", "Terrasoft.utils.dataValueType.isNumberDataValueType");
	console.log(obsoleteMessage);
	return Terrasoft.utils.dataValueType.isNumberDataValueType(dataValueType);
};

/**
 * @member Terrasoft.utils.common
 * @method validateObjectClass
 * @inheritdoc Terrasoft.utils.dataValueType#validateObjectClass
 * @deprecated
 */
Terrasoft.utils.common.validateObjectClass = function(object, className) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.validateObjectClass", "Terrasoft.utils.dataValueType.validateObjectClass");
	console.log(obsoleteMessage);
	return Terrasoft.utils.dataValueType.validateObjectClass(object, className);
};
//endregion

//region DateUtils

/**
 * @member Terrasoft.utils.common
 * @method addDays
 * @inheritdoc Terrasoft.utils.date#addDays
 * @deprecated Use Terrasoft.utils.date.addDays instead
 */
Terrasoft.utils.common.addDays = function(date, days) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.addDays", "Terrasoft.utils.date.addDays");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.addDays(date, days);
};

/**
 * @member Terrasoft.utils.common
 * @method addMinutes
 * @inheritdoc Terrasoft.utils.date#addMinutes
 * @deprecated Use Terrasoft.utils.date.addMinutes instead
 */
Terrasoft.utils.common.addMinutes = function(date, minutes) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.addMinutes", "Terrasoft.utils.date.addMinutes");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.addMinutes(date, minutes);
};

/**
 * @member Terrasoft.utils.common
 * @method clearSeconds
 * @inheritdoc Terrasoft.utils.date#clearSeconds
 * @deprecated Use Terrasoft.utils.date.clearSeconds instead
 */
Terrasoft.utils.common.clearSeconds = function(dateValue) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.clearSeconds", "Terrasoft.utils.date.clearSeconds");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.clearSeconds(dateValue);
};

/**
 * @member Terrasoft.utils.common
 * @method clearTime
 * @inheritdoc Terrasoft.utils.date#clearTime
 * @deprecated Use Terrasoft.utils.date.clearTime instead
 */
Terrasoft.utils.common.clearTime = function(dateValue) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.clearTime", "Terrasoft.utils.date.clearTime");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.clearTime(dateValue);
};

/**
 * @member Terrasoft.utils.common
 * @method endOfDay
 * @inheritdoc Terrasoft.utils.date#endOfDay
 * @deprecated Use Terrasoft.utils.date.endOfDay instead
 */
Terrasoft.utils.common.endOfDay = function(dateValue) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.endOfDay", "Terrasoft.utils.date.endOfDay");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.endOfDay(dateValue);
};

/**
 * @member Terrasoft.utils.common
 * @method endOfMonth
 * @inheritdoc Terrasoft.utils.date#endOfMonth
 * @deprecated Use Terrasoft.utils.date.endOfMonth instead
 */
Terrasoft.utils.common.endOfMonth = function(dateValue) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.endOfMonth", "Terrasoft.utils.date.endOfMonth");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.endOfMonth(dateValue);
};

/**
 * @member Terrasoft.utils.common
 * @method endOfQuarter
 * @inheritdoc Terrasoft.utils.date#endOfQuarter
 * @deprecated Use Terrasoft.utils.date.endOfQuarter instead
 */
Terrasoft.utils.common.endOfQuarter = function(dateValue) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.endOfQuarter", "Terrasoft.utils.date.endOfQuarter");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.endOfQuarter(dateValue);
};

/**
 * @member Terrasoft.utils.common
 * @method endOfWeek
 * @inheritdoc Terrasoft.utils.date#endOfWeek
 * @deprecated Use Terrasoft.utils.date.endOfWeek instead
 */
Terrasoft.utils.common.endOfWeek = function(dateValue) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.endOfWeek", "Terrasoft.utils.date.endOfWeek");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.endOfWeek(dateValue);
};

/**
 * @member Terrasoft.utils.common
 * @method endOfYear
 * @inheritdoc Terrasoft.utils.date#endOfYear
 * @deprecated Use Terrasoft.utils.date.endOfYear instead
 */
Terrasoft.utils.common.endOfYear = function(dateValue) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.endOfYear", "Terrasoft.utils.date.endOfYear");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.endOfYear(dateValue);
};

/**
 * @member Terrasoft.utils.common
 * @method getMinutesFromMidnight
 * @inheritdoc Terrasoft.utils.date#getMinutesFromMidnight
 * @deprecated Use Terrasoft.utils.date.getMinutesFromMidnight instead
 */
Terrasoft.utils.common.getMinutesFromMidnight = function(date) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.getMinutesFromMidnight", "Terrasoft.utils.date.getMinutesFromMidnight");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.getMinutesFromMidnight(date);
};

/**
 * @member Terrasoft.utils.common
 * @method isDateEquals
 * @inheritdoc Terrasoft.utils.date#areDatesEqual
 * @deprecated Use Terrasoft.utils.date.areDatesEqual instead
 */
Terrasoft.utils.common.isDateEquals = function(date1, date2) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.isDateEquals", "Terrasoft.utils.date.areDatesEqual");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.areDatesEqual(date1, date2);
};

/**
 * @member Terrasoft.utils.common
 * @method isDateEquals
 * @inheritdoc Terrasoft#areDatesEqual
 * @deprecated Use Terrasoft.areDatesEqual instead
 */
Terrasoft.isDateEquals = function(date1, date2) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.isDateEquals", "Terrasoft.areDatesEqual");
	console.log(obsoleteMessage);
	return Terrasoft.areDatesEqual(date1, date2);
};

/**
 * @member Terrasoft.utils.common
 * @method isMidnight
 * @inheritdoc Terrasoft.utils.date#isMidnight
 * @deprecated Use Terrasoft.utils.date.isMidnight instead
 */
Terrasoft.utils.common.isMidnight = function(date) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.isMidnight", "Terrasoft.utils.date.isMidnight");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.isMidnight(date);
};

/**
 * @member Terrasoft.utils.common
 * @method parseDate
 * @inheritdoc Terrasoft.utils.date#parseDate
 * @deprecated Use Terrasoft.utils.date.parseDate instead
 */
Terrasoft.utils.common.parseDate = function(value) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.parseDate", "Terrasoft.utils.date.parseDate");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.parseDate(value);
};

/**
 * @member Terrasoft.utils.common
 * @method startOfDay
 * @inheritdoc Terrasoft.utils.date#startOfDay
 * @deprecated Use Terrasoft.utils.date.startOfDay instead
 */
Terrasoft.utils.common.startOfDay = function(dateValue) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.startOfDay", "Terrasoft.utils.date.startOfDay");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.startOfDay(dateValue);
};

/**
 * @member Terrasoft.utils.common
 * @method startOfMonth
 * @inheritdoc Terrasoft.utils.date#startOfMonth
 * @deprecated Use Terrasoft.utils.date.startOfMonth instead
 */
Terrasoft.utils.common.startOfMonth = function(dateValue) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.startOfMonth", "Terrasoft.utils.date.startOfMonth");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.startOfMonth(dateValue);
};

/**
 * @member Terrasoft.utils.common
 * @method startOfQuarter
 * @inheritdoc Terrasoft.utils.date#startOfQuarter
 * @deprecated Use Terrasoft.utils.date.startOfQuarter instead
 */
Terrasoft.utils.common.startOfQuarter = function(dateValue) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.startOfQuarter", "Terrasoft.utils.date.startOfQuarter");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.startOfQuarter(dateValue);
};

/**
 * @member Terrasoft.utils.common
 * @method startOfWeek
 * @inheritdoc Terrasoft.utils.date#startOfWeek
 * @deprecated Use Terrasoft.utils.date.startOfWeek instead
 */
Terrasoft.utils.common.startOfWeek = function(dateValue) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.startOfWeek", "Terrasoft.utils.date.startOfWeek");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.startOfWeek(dateValue);
};

/**
 * @member Terrasoft.utils.common
 * @method startOfYear
 * @inheritdoc Terrasoft.utils.date#startOfYear
 * @deprecated Use Terrasoft.utils.date.startOfYear instead
 */
Terrasoft.utils.common.startOfYear = function(dateValue) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.startOfYear", "Terrasoft.utils.date.startOfYear");
	console.log(obsoleteMessage);
	return Terrasoft.utils.date.startOfYear(dateValue);
};
//endregion

//region GuidUtils

/**
 * @member Terrasoft.utils
 * @method generateGUID
 * @inheritdoc Terrasoft.utils.guid#generateGUID
 * @deprecated Use Terrasoft.utils.guid.generateGUID instead
 */
Terrasoft.utils.generateGUID = function() {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.generateGUID", "Terrasoft.utils.guid.generateGUID");
	console.log(obsoleteMessage);
	return Terrasoft.utils.guid.generateGUID();
};

/**
 * @member Terrasoft.utils
 * @method isEmptyGUID
 * @inheritdoc Terrasoft.utils.guid#isEmptyGUID
 * @deprecated Use Terrasoft.utils.guid.isEmptyGUID instead
 */
Terrasoft.utils.isEmptyGUID = function(value) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.isEmptyGUID", "Terrasoft.utils.guid.isEmptyGUID");
	console.log(obsoleteMessage);
	return Terrasoft.utils.guid.isEmptyGUID(value);
};

/**
 * @member Terrasoft.utils
 * @method isGUID
 * @inheritdoc Terrasoft.utils.guid#isGUID
 * @deprecated Use Terrasoft.utils.guid.isGUID instead
 */
Terrasoft.utils.isGUID = function(value) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.isGUID", "Terrasoft.utils.guid.isGUID");
	console.log(obsoleteMessage);
	return Terrasoft.utils.guid.isGUID(value);
};
//endregion

//region ObjectUtils

/**
 * @member Terrasoft.utils.common
 * @method deepClone
 * @inheritdoc Terrasoft.utils.object#deepClone
 * @deprecated Use Terrasoft.utils.object.deepClone instead
 */
Terrasoft.utils.common.deepClone = function(source) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.deepClone", "Terrasoft.utils.object.deepClone");
	console.log(obsoleteMessage);
	return Terrasoft.utils.object.deepClone(source);
};

/**
 * @member Terrasoft.utils.common
 * @method deleteEmptyItems
 * @inheritdoc Terrasoft.utils.object#deleteEmptyItems
 * @deprecated Use Terrasoft.utils.object.deleteEmptyItems instead
 */
Terrasoft.utils.common.deleteEmptyItems = function(items) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.deleteEmptyItems", "Terrasoft.utils.object.deleteEmptyItems");
	console.log(obsoleteMessage);
	return Terrasoft.utils.object.deleteEmptyItems(items);
};

/**
 * @member Terrasoft.utils.common
 * @method getPropertyValuesArray
 * @inheritdoc Terrasoft.utils.object#getPropertyValuesArray
 * @deprecated Use Terrasoft.utils.object.getPropertyValuesArray instead
 */
Terrasoft.utils.common.getPropertyValuesArray = function(propertyNames, object) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.getPropertyValuesArray", "Terrasoft.utils.object.getPropertyValuesArray");
	console.log(obsoleteMessage);
	return Terrasoft.utils.object.getPropertyValuesArray(propertyNames, object);
};

/**
 * @member Terrasoft.utils.common
 * @method invert
 * @inheritdoc Terrasoft.utils.object#invert
 * @deprecated Use Terrasoft.utils.object.invert instead
 */
Terrasoft.utils.common.invert = function(object) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.invert", "Terrasoft.utils.object.invert");
	console.log(obsoleteMessage);
	return Terrasoft.utils.object.invert(object);
};

/**
 * @member Terrasoft.utils.common
 * @method isEmptyObject
 * @inheritdoc Terrasoft.utils.object#isEmptyObject
 * @deprecated Use Terrasoft.utils.object.isEmptyObject instead
 */
Terrasoft.utils.common.isEmptyObject = function(object) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.isEmptyObject", "Terrasoft.utils.object.isEmptyObject");
	console.log(obsoleteMessage);
	return Terrasoft.utils.object.isEmptyObject(object);
};

/**
 * @member Terrasoft.utils.common
 * @method keys
 * @inheritdoc Terrasoft.utils.object#keys
 * @deprecated Use Terrasoft.utils.object.keys instead
 */
Terrasoft.utils.common.keys = function(object) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.keys", "Terrasoft.utils.object.keys");
	console.log(obsoleteMessage);
	return Terrasoft.utils.object.keys(object);
};

/**
 * @member Terrasoft.utils.common
 * @method mapObjectToCollection
 * @inheritdoc Terrasoft.utils.object#mapObjectToCollection
 * @deprecated Use Terrasoft.utils.object.mapObjectToCollection instead
 */
Terrasoft.utils.common.mapObjectToCollection = function(object) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.mapObjectToCollection", "Terrasoft.utils.object.mapObjectToCollection");
	console.log(obsoleteMessage);
	return Terrasoft.utils.object.mapObjectToCollection(object);
};

/**
 * @member Terrasoft.utils.common
 * @method serialzieObject
 * @inheritdoc Terrasoft.utils.object#serialzieObject
 * @deprecated Use Terrasoft.utils.object.serializeObject instead
 */
Terrasoft.utils.common.serialzieObject = function(config) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.serialzieObject", "Terrasoft.utils.object.serializeObject");
	console.log(obsoleteMessage);
	return Terrasoft.utils.object.serializeObject(config);
};
//endregion

//region StringUtils

/**
 * @member Terrasoft.utils.common
 * @method decodeHtml
 * @inheritdoc Terrasoft.utils.string#decodeHtml
 * @deprecated Use Terrasoft.utils.string.decodeHtml instead
 */
Terrasoft.utils.common.decodeHtml = function(value) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.decodeHtml", "Terrasoft.utils.object.serialzieObject");
	console.log(obsoleteMessage);
	return Terrasoft.utils.html.decodeHtml(value);
};

/**
 * @member Terrasoft.utils.common
 * @method encodeHtml
 * @inheritdoc Terrasoft.utils.string#encodeHtml
 * @deprecated Use Terrasoft.utils.string.encodeHtml instead
 */
Terrasoft.utils.common.encodeHtml = function(value) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.encodeHtml", "Terrasoft.utils.html.encodeHtml");
	console.log(obsoleteMessage);
	return Terrasoft.utils.html.encodeHtml(value);
};

/**
 * @member Terrasoft.utils
 * @method getTypedStringValue
 * @inheritdoc Terrasoft.utils.string#getTypedStringValue
 * @deprecated Use Terrasoft.utils.string.getTypedStringValue instead
 */
Terrasoft.utils.getTypedStringValue = function(value, type) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.getTypedStringValue", "Terrasoft.utils.string.getTypedStringValue");
	console.log(obsoleteMessage);
	return Terrasoft.utils.string.getTypedStringValue(value, type);
};

/**
 * @member Terrasoft.utils.common
 * @method getUniformString
 * @inheritdoc Terrasoft.utils.string#getUniformString
 * @deprecated Use Terrasoft.utils.string.getUniformString instead
 */
Terrasoft.utils.common.getUniformString = function(length, symbol) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.getUniformString", "Terrasoft.utils.string.getUniformString");
	console.log(obsoleteMessage);
	return Terrasoft.utils.string.getUniformString(length, symbol);
};

/**
 * @member Terrasoft.utils
 * @method isUrl
 * @inheritdoc Terrasoft.utils.string#isUrl
 * @deprecated Use Terrasoft.utils.string.isUrl instead
 */
Terrasoft.utils.isUrl = function(value) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.isUrl", "Terrasoft.utils.uri.isUrl");
	console.log(obsoleteMessage);
	return Terrasoft.utils.uri.isUrl(value);
};

/**
 * @member Terrasoft.utils
 * @method pad
 * @inheritdoc Terrasoft.utils.string#pad
 * @deprecated Use Terrasoft.utils.string.pad instead
 */
Terrasoft.utils.pad = function(value, length, symbol) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.pad", "Terrasoft.utils.string.pad");
	console.log(obsoleteMessage);
	return Terrasoft.utils.string.pad(value, length, symbol);
};

/**
 * @member Terrasoft.utils.common
 * @method reverseStr
 * @inheritdoc Terrasoft.utils.string#reverseStr
 * @deprecated Use Terrasoft.utils.string.reverseStr instead
 */
Terrasoft.utils.common.reverseStr = function(str) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.reverseStr", "Terrasoft.utils.string.reverseStr");
	console.log(obsoleteMessage);
	return Terrasoft.utils.string.reverseStr(str);
};

/**
 * @member Terrasoft.utils.common
 * @method toLowerCamelCase
 * @inheritdoc Terrasoft.utils.string#toLowerCamelCase
 * @deprecated Use Terrasoft.utils.string.toLowerCamelCase instead
 */
Terrasoft.utils.common.toLowerCamelCase = function(value) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.common.toLowerCamelCase", "Terrasoft.utils.string.toLowerCamelCase");
	console.log(obsoleteMessage);
	return Terrasoft.utils.string.toLowerCamelCase(value);
};

/**
 * Checks if current user is Ssp user.
 * @return {Boolean} True if type of current user is ssp, otherwise - false.
 */
Terrasoft.isCurrentUserSsp = function() {
	return Terrasoft.CurrentUser.userType === Terrasoft.UserType.SSP;
};

/**
 * Alias for {@link Terrasoft#isCurrentUserSsp}
 * @member Terrasoft
 * @method isCurrentUserSsp
 * @inheritdoc Terrasoft#isCurrentUserSsp
 */
Terrasoft.utils.common.isCurrentUserSsp = Terrasoft.isCurrentUserSsp;

/*global console:true */

//endregion

//endregion
