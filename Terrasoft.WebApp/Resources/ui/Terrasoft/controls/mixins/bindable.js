/**
 * ######, ########### ######## ####### ######### ########## ######## ### ###### ######.
 * ############ # {@link Terrasoft.Component}.
 */
Ext.define("Terrasoft.controls.mixins.Bindable", {
	alternateClassName: "Terrasoft.Bindable",

	statics: {

		/**
		 * Returns binding rule by $
		 * @param {String} bindingRule String containing $
		 * @param {Object} columnsConfig Columns config
		 * @return {Object|String} Binding rule
		 */
		getBindingRuleBy$: function(bindingRule, columnsConfig) {
			if (Ext.isString(bindingRule) && bindingRule.indexOf("$") === 0) {
				var bindTo = bindingRule.split("$")[1];
				if (!columnsConfig || (columnsConfig && columnsConfig[bindTo])) {
					return {bindTo: bindTo};
				}
			}
			return bindingRule;
		}

	},

	/**
	 * The view model for the binding
	 * @protected
	 * @type {Terrasoft.BaseViewModel}
	 */
	model: null,

	/**
	 * An object that describes the relationship of the properties of a control to the properties or methods of the
	 * model.
	 * @protected
	 * @type {Object}
	 */
	bindings: null,

	/**
	 * A flag that the selectors were bound to the model
	 * @protected
	 * @type {Boolean}
	 */
	selectorsWereBind: false,

	/**
	 * Collection event name
	 * @private
	 * @type {String}
	 */
	collectionLoadEventName: "dataLoaded",

	/**
	 * A flag of secure binding to the view model. If the flag is set to true and no binding method or property is found
	 * during the binding
	 * in the view model, an exception will not be generated.
	 * @type {Boolean}
	 */
	safeBind: false,

	/**
	 * Binding context.
	 * @type {String}
	 */
	bindingContext: null,

	// region Methods: Private

	/**
	 * Returns binding disabled state.
	 * @param {Object} binding Binding.
	 * @return {Boolean}
	 */
	_isDisabledBinding: function(binding) {
		return (binding && binding.config && binding.config.disabled === true);
	},

	/**
	 * @private
	 */
	_subscribeForCollectionChanged: function(binding, property, model) {
		var collection = model.get(binding.modelItem);
		collection.on("changed", this._onCollectionChanged.bind(this, binding, property, model), this);
		this._onCollectionChanged(binding, property, model);
	},

	/**
	 * @private
	 */
	_onCollectionChanged: function(binding, property, model) {
		var methodName = binding.config.changeMethod;
		if (methodName) {
			var changeMethod = this[methodName];
			var converter = binding.config.converter;
			var converterFn = Ext.isString(converter) ? model[converter] : converter;
			var collection = model.get(binding.modelItem);
			var value = this.callModelMethod(converterFn, model, [collection]);
			changeMethod.call(this, value);
		}
	},

	/**
	 * @private
	 */
	_isCollectionConverter: function(binding, model) {
		var result = false;
		var converter = binding.config.converter;
		if (converter) {
			var modelProperty = binding.modelItem;
			var value = this[modelProperty];
			if (value) {
				result = value instanceof Terrasoft.Collection;
			} else {
				var column = model.columns[modelProperty];
				result = column && column.dataValueType === Terrasoft.DataValueType.COLLECTION;
			}
		}
		return result;
	},

	// endregion

	// region Methods: Public

	/**
	 * Initializes the mixin
	 * @param {Object} config The configuration object for initializing the control
	 */
	constructor: function(config) {
		if (!config) {
			return;
		}
		this.initBindings(config);
	},

	/**
	 * Initializes the binding of the properties or events of the control based on the configuration object.
	 * @protected
	 * @param {Object} config The configuration object for initializing the control.
	 */
	initBindings: function(config) {
		var bindConfig = this.getBindConfig();
		var bindings = {};
		Terrasoft.each(config, function(bindingRule, property) {
			bindingRule = Terrasoft.Bindable.getBindingRuleBy$(bindingRule);
			if (Ext.isObject(bindingRule) && bindingRule.bindTo) {
				var binding = this.initBinding(property, bindingRule, bindConfig);
				if (binding) {
					bindings[property] = binding;
					delete config[property];
				}
			}
		}, this);
		this.bindings = bindings;
	},

	/**
	 * Initializes the binding of a control's property or events.
	 * @protected
	 * @param {String} configItem Bound property or a model event
	 * @param {Object} bindingRule Property binding rule
	 * @param {Object} bindConfig The configuration binding object
	 */
	initBinding: function(configItem, bindingRule, bindConfig) {
		var binding = {};
		binding.modelItem = bindingRule.bindTo;
		var config = bindingRule.bindConfig;
		var controlBindConfig = {};
		if (bindConfig) {
			controlBindConfig = bindConfig[configItem];
		}
		binding.config = Ext.apply(controlBindConfig, config);
		return binding;
	},

	/**
	 * Binds the control to the model. Initializes the property with the initial data and subscribes to changes to the
	 * corresponding properties or methods of the model.
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound.
	 * @param {Object []} bindings A collection of objects that describes the binding properties of the control's
	 * properties to the model.
	 */
	bind: function(model, bindings) {
		model = this.getBindingContext(model);
		if (!model) {
			return;
		}
		this.model = model;
		bindings = bindings || this.bindings;
		Terrasoft.each(bindings, function(binding, propertyName) {
			if (this._isDisabledBinding(binding)) {
				return;
			}
			var bindingType = this.getBindingType(propertyName, binding, model);
			binding.bindingType = bindingType;
			if (bindingType === Terrasoft.BindingType.EVENT) {
				this.subscribeForEvents(binding, propertyName, model);
			}
			if (bindingType === Terrasoft.BindingType.PROPERTY) {
				model.addBindMap({
					propertyName: propertyName,
					type: binding.bindingType,
					attributeName: binding.modelItem
				});
			}
		}, this);
		Terrasoft.each(bindings, function(binding, modelItem) {
			if (binding.bindingType !== Terrasoft.BindingType.EVENT && !this._isDisabledBinding(binding)) {
				this.setControlInitialValue(binding, model);
				this.subscribeForEvents(binding, modelItem, model);
			}
		}, this);
		this.bindSelectors();
	},

	/**
	 * Returns control binding context.
	 * @param {Terrasoft.BaseViewModel} model Model.
	 * @return {Terrasoft.BaseViewModel} Control binding context.
	 */
	getBindingContext: function(model) {
		if (this.bindingContext) {
			if (!Terrasoft.isInstanceOfClass(model, "Terrasoft.BaseViewModel")) {
				throw new Terrasoft.UnsupportedTypeException();
			}
			var bindingPath = this.bindingContext.split(".");
			for (var i = 0; i < bindingPath.length; i++) {
				model = model.get(bindingPath[i]);
				if (!Terrasoft.isInstanceOfClass(model, "Terrasoft.BaseViewModel")) {
					throw new Terrasoft.UnsupportedTypeException();
				}
			}
		}
		return model;
	},

	/**
	 * Binds DOM elements by selectors to model.
	 * @protected
	 */
	bindSelectors: function() {
		if (!this.model || this.selectorsWereBind) {
			return;
		}
		Terrasoft.each(this.selectors, function(selectorConfig, selectorName) {
			if (selectorName !== "wrapEl" && Ext.isObject(selectorConfig)) {
				this.bindSelector(selectorConfig);
			}
		}, this);
		this.selectorsWereBind = true;
	},

	/**
	 * Binds DOM elements by selector to model.
	 * @protected
	 * @param {Object} selectorConfig Selector binding configuration.
	 */
	bindSelector: function(selectorConfig) {
		var selector = selectorConfig.selector;
		var selectedNodes = Ext.DomQuery.select(selector);
		Terrasoft.each(selectedNodes, function(node) {
			var element = Ext.get(node);
			this.subscribeForElementDomEvents(element, selectorConfig);
		}, this);
	},

	/**
	 * Subscribes to DOM element events
	 * @protected
	 * @param {Ext.dom.Element} element The element which events the model is bound to
	 * @param {Object} selectorConfig Selector binding configuration
	 */
	subscribeForElementDomEvents: function(element, selectorConfig) {
		var model = this.model;
		Terrasoft.each(selectorConfig.events, function(eventConfig, eventName) {
			element.on(eventName, function() {
				var parameters = [];
				Terrasoft.each(selectorConfig.attributes, function(attributeName) {
					parameters.push(element.getAttribute(attributeName));
				}, this);
				var modelMethod = model[eventConfig.bindTo];
				this.callModelMethod(modelMethod, model, parameters);
			}, this);
		}, this);
	},

	/**
	 * Returns the original value of the control's property
	 * @protected
	 * @param {String} modelItem Name of the property, method, or property of the bound control
	 * @param {Object} binding An object that describes the binding parameters of the control's property to the model
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound
	 */
	getBindingType: function(modelItem, binding, model) {
		var bindingType;
		if (modelItem in this.events) {
			bindingType = Terrasoft.BindingType.EVENT;
		} else {
			var bindingModelItem = binding.modelItem;
			var modelItemProperty = model[bindingModelItem];
			if (Ext.isFunction(modelItemProperty)) {
				bindingType = Terrasoft.BindingType.METHOD;
			} else {
				var value = model.get(bindingModelItem);
				if (value instanceof Terrasoft.Collection) {
					bindingType = Terrasoft.BindingType.COLLECTION;
				} else {
					bindingType = Terrasoft.BindingType.PROPERTY;
				}
			}
		}
		return bindingType;
	},

	/**
	 * Sets the initial value of the control property.
	 * @private
	 * @param {Object} binding An object that describes the binding parameters of the control's property to the model.
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound.
	 */
	setControlInitialValue: function(binding, model) {
		var propertyValue = this.getBindingValue(binding, model);
		if (Ext.isDate(propertyValue)) {
			propertyValue = new Date(propertyValue);
		}
		this.setControlPropertyValue(binding, propertyValue, model);
	},

	/**
	 * Gets the value of the property of the control associated with the model
	 * @private
	 * @param {Object} binding An object that describes the binding parameters of the control's property to the model
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound
	 */
	getBindingValue: function(binding, model) {
		var propertyValue;
		var getValueFunction;
		var args = [];
		if (binding.bindingType === Terrasoft.BindingType.METHOD) {
			getValueFunction = model[binding.modelItem];
			var tag = this.tag;
			if (tag) {
				args.push(tag);
			}
		} else {
			getValueFunction = model.get;
			args.push(binding.modelItem);
		}
		propertyValue = this.callModelMethod(getValueFunction, model, args);
		return propertyValue;
	},

	/**
	 * Sets the control to the property value
	 * @protected
	 * @param {Object} binding An object that describes the binding parameters of the control's property to the model
	 * @param {Mixed} value Property Value
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound
	 */
	setControlPropertyValue: function(binding, value, model) {
		var changeMethodName = binding.config && binding.config.changeMethod;
		if (changeMethodName) {
			var changeMethod = this[changeMethodName];
			if (binding.bindingType !== Terrasoft.BindingType.METHOD) {
				var converter = binding.config.converter;
				var args = [];
				args.push(value);
				if (model) {
					if (model.getColumnDataType) {
						args.push(model.getColumnDataType(binding.modelItem));
					}
					var column = model.columns[binding.modelItem];
					if (column) {
						args.push(column);
					}
				}
				if (converter) {
					var converterFn = Ext.isString(converter) ? model[converter] : converter;
					value = this.callModelMethod(converterFn, model, args);
				}
			}
			if (value === undefined) {
				value = null;
			}
			changeMethod.call(this, value);
		}
	},

	/**
	 * Signs on the model events and, if necessary, subscribes to a change in the binding property of the control.
	 * @protected
	 * @param {Object} binding An object that describes the binding parameters of the control's property to the model.
	 * @param {String} property The name of the property of the control to be bound.
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound.
	 */
	subscribeForEvents: function(binding, property, model) {
		switch (binding.bindingType) {
			case Terrasoft.BindingType.COLLECTION:
				this.subscribeForCollectionEvents(binding, property, model);
				break;
			case Terrasoft.BindingType.EVENT:
				var modelMethod = model[binding.modelItem];
				this.subscribeForControlEvent(property, modelMethod, model);
				break;
			case Terrasoft.BindingType.PROPERTY:
				this.subscribeForPropertyChangeEvent(binding, property, model);
				break;
			case Terrasoft.BindingType.METHOD:
				this.subscribeForDependentPropertiesChangeEvents(binding, property, model);
				break;
		}
	},

	/**
	 * Signs on the model events and, if necessary, subscribes to the change of the binding property
	 * of the control for the EVENT type
	 * @private
	 * @param {String} eventName Control event
	 * @param {Function} modelMethod Model Method
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound
	 * @param {Object []} params Additional parameters that will be passed to the handler
	 */
	subscribeForControlEvent: function(eventName, modelMethod, model, params) {
		this.on(eventName, function(obj) {
			var args = [];
			var tag = this.tag || (obj ? obj.tag : null);
			Terrasoft.each(arguments, function(item) {
				if (!item || (item.isComponent !== true && !item.dom)) {
					args.push(item);
				}
			}, this);
			if (params) {
				args = args.concat(params);
			}
			if (!Ext.isEmpty(tag)) {
				args.push(tag);
			}
			return this.callModelMethod(modelMethod, model, args);
		});
	},

	/**
	 * Signs on model events and, if necessary, subscribes to a change in the binding property of the control for the
	 * COLLECTION type.
	 * @protected
	 * @param {Object} binding An object that describes the binding parameters of the control's property to the model
	 * @param {String} property The name of the property of the control to be bound
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound
	 */
	subscribeForCollectionEvents: function(binding, property, model) {
		var methodName = binding.config.changeMethod;
		if (methodName) {
			var changeMethod = this[methodName];
			var collection = model.get(binding.modelItem);
			if (binding.config.converter) {
				this._subscribeForCollectionChanged(binding, property, model);
			} else {
				this[property] = collection;
				collection.on(this.collectionLoadEventName, changeMethod, this);
			}
		}
	},

	/**
	 * Signs on the model events and, if necessary, subscribes to the change of the bound property of the control for
	 * the CALCULATED type.
	 * @private
	 * @param {Object} binding An object that describes the binding parameters of the control's property to the model.
	 * @param {String} property The name of the property of the control to be bound.
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound.
	 */
	subscribeForDependentPropertiesChangeEvents: function(binding, property, model) {
		var dependentProperties = binding.dependentProperties = this.getDependentProperties(binding, model);
		// The handler for changing the dependent properties of the model
		var handler = binding.handler = this.onModelDependentPropertiesChange = function() {
			var oldDependentProperties = binding.dependentProperties;
			var newDependentProperties = this.getDependentProperties(binding, model);
			if (!Terrasoft.areArraysEqual(newDependentProperties, oldDependentProperties)) {
				var propertiesToUnsubscribe = Ext.Array.difference(oldDependentProperties, newDependentProperties);
				var propertiesToSubscribe = Ext.Array.difference(newDependentProperties, oldDependentProperties);
				this.toggleSubscriptionForModelEvents(model, propertiesToUnsubscribe, propertiesToSubscribe,
					this.onModelDependentPropertiesChange, this);
				binding.dependentProperties = newDependentProperties;
			}
			var modelMethod = this.getModelMethod(binding, model);
			var args = [];
			var tag = this.tag;
			if (tag) {
				args.push(tag);
			}
			var propertyValue = this.callModelMethod(modelMethod, model, args);
			this.setControlPropertyValue(binding, propertyValue, model);
		};
		this.toggleSubscriptionForModelEvents(model, null, dependentProperties, handler, this);
	},

	/**
	 * Signs to model events and, if necessary, subscribes to a change in the property of the control to be bound for
	 * the Property type
	 * @protected
	 * @param {Object} binding An object that describes the binding parameters of the control's property to the model
	 * @param {String} property The name of the property of the control to be bound
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound
	 * @param {Boolean} useCalculatedValue (optional) Use the result of the method to get the data,
	 * instead of the value of the model attribute. In this case, the subscription to the model attribute is not
	 * performed
	 */
	subscribeForPropertyChangeEvent: function(binding, property, model, useCalculatedValue) {
		// Subscription to the value change event in the control
		var changeEvent = binding.config.changeEvent;
		var converter = binding.config.converter;
		var deprecatedChangeEvent = binding.config.deprecatedChangeEvent;
		var modelProperty = binding.modelItem;
		if (changeEvent && !this._isCollectionConverter(binding, model)) {
			var onControlPropertyChange = function() {
				var value = this[property];
				model.set(modelProperty, value, {changeEvent: changeEvent});
			};
			this.on(changeEvent, onControlPropertyChange);
		}
		if (deprecatedChangeEvent) {
			var onControlPropertyDeprecatedChange = function() {
				model.set(modelProperty, this[property], {changeEvent: deprecatedChangeEvent});
			};
			this.on(deprecatedChangeEvent, onControlPropertyDeprecatedChange);
		}
		if (useCalculatedValue) {
			return;
		}
		var dependentProperties = [modelProperty];
		// The handler for changing one property in the model

		var handler = function(viewModel, value) {
			if (converter && value instanceof Terrasoft.Collection) {
				this._subscribeForCollectionChanged(binding, property, model);
			} else {
				this.setControlPropertyValue(binding, value, model);
			}
		};
		this.on("destroy", function() {
			this.toggleSubscriptionForModelEvents(model, dependentProperties, null, handler, this);
		}, this);
		this.toggleSubscriptionForModelEvents(model, null, dependentProperties, handler, this);
	},

	/**
	 * Unsubscribes from old model properties and subscribes to new
	 * @private
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound
	 * @param {String []} oldDependentProperties (optional) Array of model properties that you want to unsubscribe from
	 * @param {String []} newDependentProperties (optional) Array of model properties to which you want to subscribe
	 * @param {Function} handler The event handler
	 * @param {Object} scope Context
	 */
	toggleSubscriptionForModelEvents: function(model, oldDependentProperties, newDependentProperties, handler, scope) {
		if (oldDependentProperties && oldDependentProperties.length > 0) {
			model.unsubscribeOnColumnChange(oldDependentProperties.join(" change:"), handler, scope);
		}
		if (newDependentProperties && newDependentProperties.length > 0) {
			model.subscribeOnColumnChange(newDependentProperties.join(" change:"), handler, scope);
		}
	},

	/**
	 * Returns a list of all the hanging properties when executing the calculated model method.
	 * @private
	 * @param {Object} binding An object that describes the binding parameters of the control's property to the model.
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound.
	 * @return {String []} Returns an array of dependent properties.
	 */
	getDependentProperties: function(binding, model) {
		model.setTrackingState(true);
		try {
			var calcFn = this.getModelMethod(binding, model);
			var args = this.tag ? [this.tag] : [];
			this.callModelMethod(calcFn, model, args);
		} finally {
			model.setTrackingState(false);
		}
		return Terrasoft.keys(model.dependentProperties);
	},

	/**
	 * Returns the model method from the binding parameter
	 * @protected
	 * @param {Object} binding An object that describes the binding parameters of the control's property to the model
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound
	 * @return {Function} Returns the method of the model
	 */
	getModelMethod: function(binding, model) {
		return model[binding.modelItem];
	},

	/**
	 * The method writes the control away from the model events and the model from the control event.
	 * @protected
	 */
	destroy: function() {
		Terrasoft.each(this.bindings, function(binding, property) {
			this.unSubscribeForEvents(binding, property, this.model);
		}, this);
		this.model = null;
	},

	/**
	 * The method is unsubscribed from all model events.
	 * @protected
	 * @param {Object} binding An object that describes the binding parameters of the control's property to the model
	 * @param {String} bindPropertyName Property name of the bound control
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound
	 */
	unSubscribeForEvents: function(binding, bindPropertyName, model) {
		switch (binding.bindingType) {
			case Terrasoft.BindingType.COLLECTION:
				this.unSubscribeForCollectionEvents(binding, bindPropertyName, model);
				break;
			case Terrasoft.BindingType.EVENT:
				break;
			case Terrasoft.BindingType.PROPERTY:
				break;
			case Terrasoft.BindingType.METHOD:
				this.unSubscribeForDependentPropertiesChangeEvents(binding, bindPropertyName, model);
				break;
		}
	},

	/**
	 * The method is unsubscribed from model events for a COLLECTION connection type
	 * @protected
	 * @param {Object} binding An object that describes the binding parameters of the control's property to the model
	 * @param {String} property The name of the property of the control to be bound
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound
	 */
	unSubscribeForCollectionEvents: function(binding, property, model) {
		if (!model) {
			return;
		}
		var collection = model.get(binding.modelItem);
		var methodName = binding.config.changeMethod;
		var dataLoadedHandler = this[methodName];
		this[property] = null;
		collection.un(this.collectionLoadEventName, dataLoadedHandler, this);
		collection.un("changed", this._onCollectionChanged.bind(this, binding, property, model), this);
	},

	/**
	 * The method is unsubscribed from the model events for the METHOD  connection type.
	 * @protected
	 * @param {Object} binding An object that describes the binding parameters of the control's property to the model.
	 * @param {String} property The name of the property of the control to be bound.
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound.
	 */
	unSubscribeForDependentPropertiesChangeEvents: function(binding, property, model) {
		if (!model) {
			return;
		}
		this.toggleSubscriptionForModelEvents(model, binding.dependentProperties, null, binding.handler, this);
	},

	/**
	 * Calls the passed method. If the {@link safeBind} flag is set, it is checked that the method is not null.
	 * @param {Function} method The method to be called.
	 * @param {Object} scope The context of the method call.
	 * @param {Object []} args Arguments of the called method.
	 * @return {Object} The result of executing the passed method.
	 */
	callModelMethod: function(method, scope, args) {
		var result;
		if (this.safeBind === true) {
			if (method) {
				result = method.apply(scope, args);
			}
		} else {
			result = method.apply(scope, args);
		}
		return result;
	}

	// endregion

});
