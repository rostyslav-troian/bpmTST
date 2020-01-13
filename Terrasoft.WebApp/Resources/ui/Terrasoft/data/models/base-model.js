Ext.ns("Terrasoft.model");

/**
 * Base class of the model
 */
Ext.define("Terrasoft.model.BaseModel", {
	extend: "Terrasoft.core.BaseObject",
	alternateClassName: "Terrasoft.BaseModel",

	mixins: {
		ValueConverter: "Terrasoft.ValueConverter"
	},

	/**
	 * Link to the composite model object
	 * @private
	 * @type {Object}
	 */
	model: null,

	/**
	 * Values passed to the configuration object during initialization
	 * @protected
	 * @type {Object}
	 */
	values: null,

	/**
	 * Methods added to the model instance during initialization. Transmitted as a configuration object
	 * @protected
	 * @type {Object}
	 */
	methods: null,

	/**
	 * Collection of the model bindings.
	 * @private
	 * @type {Terrasoft.Collection}
	 */
	bindMap: null,

	/**
	 * A sign that the model is in a dependency search state. In this mode, all the properties of the model,
	 * the value of which is requested for reading is written to the array {@link #dependentProperties}.
	 * @private
	 * @type {Boolean}
	 */
	isTracking: false,

	/**
	 * Columns of the model, which may include fields from the root schema, linked schemas, as well as calculated fields
	 * @type {Object}
	 */
	columns: null,

	/**
	 * Array of Modified Model Fields
	 * @type {Object}
	 */
	changedValues: null,

	/**
	 * An object of dependent properties, which is populated when the observation of dependency search is enabled
	 * {@link #setTrackingState}.
	 * @type {Object}
	 */
	dependentProperties: null,

	/**
	 * A sign that the model supports validation
	 * @type {Boolean}
	 */
	canValidate: false,

	/**
	 * The prefix for the modification of the presentation model attribute.
	 * @private
	 * @type {String}
	 */
	columnChangeEventPrefix: "change:",

	/**
	 * Returns change event name for Backbone event subscription.
	 * @private
	 * @param {String} columnName Column to create event name for.
	 * @return {String} Change event name.
	 */
	_getChangeEventName: function(columnName) {
		return `${this.columnChangeEventPrefix}${columnName}`;
	},

	/**
	 * @private
	 */
	_canDefineAttributeProperty: function(propertyName) {
		return !Terrasoft.contains(propertyName, ".") && !this.hasOwnProperty(propertyName);
	},

	/**
	 * @private
	 */
	_getDefinePropertyName: function(attributeName) {
		return "$" + attributeName;
	},

	/**
	 * @private
	 */
	_getDefineAttributes: function(attributeName) {
		let attributes = {};
		if (Ext.isObject(attributeName)) {
			attributes = attributeName;
		} else {
			attributes[attributeName] = {};
		}
		return attributes;
	},

	/**
	 * @private
	 */
	_defineAttributeProperty: function(attributeName) {
		const attributes = this._getDefineAttributes(attributeName);
		_.keys(attributes).forEach(function(key) {
			const propertyName = this._getDefinePropertyName(key);
			if (!this._canDefineAttributeProperty(propertyName)) {
				return;
			}
			Object.defineProperty(this, propertyName, {
				get: function() {
					return this.get(key);
				},
				set: function(value) {
					this.set(key, value, {});
				}
			});
		}, this);
	},

	/**
	 * @private
	 */
	_defineAttributesProperties: function() {
		_.keys(this.columns).forEach(this._defineAttributeProperty, this);
	},

	/**
	 * @private
	 */
	_addColumnValidationEvents: function() {
		const events = _.keys(this.columns).map((columnName) => "validate:" + columnName);
		this.addEvents.apply(this, events);
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function(config) {
		this.callParent(arguments);
		this.model = new Backbone.Model();
		this.initModelColumns();
		this.setInitialValue();
		if (config) {
			this.loadFromColumnValues(config.values, config.rowConfig);
			Ext.apply(this, config.methods);
		}
		this.model.on("change", this.onDataChange, this);
		this.addEvents("change");
		this._defineAttributesProperties();
		this._addColumnValidationEvents();
	},

	/**
	 * Initialize model columns.
	 * @protected
	 */
	initModelColumns: function() {
		const columns = this.getModelColumns();
		this.columns = columns;
	},

	/**
	 * Loads data from columns, where each property is a column with a value
	 * @protected
	 */
	setInitialValue: function() {
		const columns = this.columns;
		Terrasoft.each(columns, function(column, columnName) {
			if (column.value !== undefined) {
				this.set(columnName, column.value, null);
			}
		}, this);
	},

	/**
	 * Returns model columns. If columns property is null, returns empty object.
	 * @return {Object} Model columns.
	 */
	getModelColumns: function() {
		return _.clone(this.columns) || {};
	},

	/**
	 * Initializes the configuration of the columns and loads data from the object, where each property represents
	 * column with value
	 * @param {Object} values Object of Values
	 */
	loadFromColumnValues: function(values) {
		if (values) {
			Terrasoft.each(values, function(column, columnName) {
				this.set(columnName, column, {
					silent: true
				});
			}, this);
		}
	},

	/**
	 * Subscribe to the model event. You can subscribe both to changes in all properties of the model, and to change
	 * of one or several properties.
	 * @override
	 * @param {String} event Event name
	 * @param {Function} handler Handlers
	 * @param {Object} scope Context
	 */
	on: function(event, handler, scope) {
		if (!this.events[event]) {
			this.model.on(event, handler, scope);
		} else {
			this.callParent(arguments);
		}
	},

	/**
	 * Unsubscribe from the model event
	 * @override
	 * @param {String} event Event name
	 * @param {Function} handler Handlers
	 * @param {Object} scope Context
	 */
	un: function(event, handler, scope) {
		if (!this.events[event]) {
			this.model.off(event, handler, scope);
		} else {
			this.callParent(arguments);
		}
	},

	/**
	 * Model data change handler
	 * @protected
	 * @param {Object} obj Object with changed data
	 * @param {Object} options The object of additional parameters with which the data modification method was called
	 */
	onDataChange: function(obj, options) {
		const changedObject = obj && obj.changed;
		const changedValues = this.changedValues = this.changedValues || {};
		for (const key in changedObject) {
			if (changedObject.hasOwnProperty(key)) {
				changedValues[key] = changedObject[key];
			}
		}
		this.fireEvent("change", this, options, changedObject);
	},

	/**
	 * Reverts changes for specified attribute.
	 * @param {String} key Name of the attribute.
	 */
	revertAttributeChanges: function(key) {
		const changedValues = this.changedValues;
		if (changedValues.hasOwnProperty(key)) {
			const previousValue = this.model.previous(key);
			this.set(key, previousValue);
			delete this.changedValues[key];
		}
	},

	/**
	 * Clear changed values.
	 * @protected
	 */
	clearChangedValues: function() {
		this.changedValues = {};
	},

	/**
	 * Subscribes to changes to the presentation model attribute.
	 * @protected
	 * @param {String} columnName The name of the attribute of the view model.
	 * @param {Function} handler An event handler for the modification of the presentation model attribute.
	 * @param {Object} [scope] Context.
	 */
	subscribeOnColumnChange: function(columnName, handler, scope) {
		const eventName = this._getChangeEventName(columnName);
		this.on(eventName, handler, scope || this);
	},

	/**
	 * Performs an undefined event for changes to the attribute of the view model.
	 * @protected
	 * @param {String} columnName The name of the attribute of the view model.
	 * @param {Function} handler An event handler for the modification of the presentation model attribute.
	 * @param {Object} [scope] Context.
	 */
	unsubscribeOnColumnChange: function(columnName, handler, scope) {
		const eventName = this._getChangeEventName(columnName);
		this.un(eventName, handler, scope || this);
	},

	/**
	 * Get the value of the field by name
	 * For reference types, it returns a copy, it is necessary for correct work of tracking the change of model values
	 * @param {String} key Field name
	 * @return {String/Number/Date/Boolean/Object} Field Value
	 */
	get: function(key) {
		if (this.isTracking) {
			this.dependentProperties[key] = true;
		}
		return this.model.get(key);
	},

	/**
	 * Gets previous attribute value by key.
	 * @param {String} key Attribute key.
	 * @return {String|Number|Date|Boolean|Object} Attribute value.
	 */
	getPrevious: function(key) {
		return this.model.previous(key);
	},

	/**
	 * Returns value of lookup.
	 * @throws {Terrasoft.exceptions.UnsupportedTypeException}
	 * Throws exception UnsupportedTypeException if argument is not lookup and safe is false.
	 * @param {String} columnName Name of lookup column.
	 * @param {Boolean} safe Enable safe mode.
	 * @return {String/Number/Date/Boolean/Object} Lookup value.
	 */
	getLookupValue: function(columnName, safe) {
		const column = this.columns[columnName];
		if (column && (column.isLookup || safe)) {
			const columnValue = this.get(columnName);
			return columnValue && columnValue.value;
		}
		throw new Terrasoft.UnsupportedTypeException();
	},

	/**
	 * Set a hash of attributes (one or many) on the model. If any of the attributes change the model's state, a
	 * "change" event will be triggered on the model. Change events for specific attributes are also triggered, and
	 * you can bind to those as well, for example: change:title, and change:content.
	 * You may also pass individual keys and values.
	 * @param {Object} key Name of the field or multiple attributes.
	 * @param {String/Number/Date/Boolean/Object} value Value of the field.
	 * @param {Object} [options] Options.
	 */
	set: function(key, value, options) {
		if (this.isTracking) {
			return;
		}
		this._defineAttributeProperty(key);
		this.model.set(key, value, options);
	},

	/**
	 * Trigger one or many events, firing all bound callbacks.
	 * @param {String} event Event name.
	 * @param {String/Number/Date/Boolean/Object} value Value of the field.
	 */
	trigger: function(event, value) {
		this.model.trigger(event, this, value);
	},

	/**
	 * Returns the model column by name.
	 * @param {String} columnName Name of the column.
	 * @return {Object} Column.
	 */
	getColumnByName: function(columnName) {
		return this.columns[columnName];
	},

	/**
	 * Determines whether the model was changed on the client
	 * @return {Boolean} Returns true if the model data has been changed
	 */
	getIsChanged: function() {
		const changedValues = this.changedValues = this.changedValues || {};
		return !Terrasoft.isEmptyObject(changedValues);
	},

	/**
	 * Indicates if attribute was changed
	 * @param attribute
	 * @returns {boolean}
	 */
	isAttributeChanged: function(attribute) {
		return !Ext.isEmpty(this.changedValues && this.changedValues[attribute]);
	},

	/**
	 * Enables \ disables the dependency search mode. After power-on, the {@link #isTracking} state is set,
	 * and all requested model attributes are written to an array {@link #dependentProperties}
	 * @param {Boolean} isTracking You must pass true to enable search mode or false to disable
	 */
	setTrackingState: function(isTracking) {
		if (this.isTracking === isTracking) {
			return;
		}
		this.isTracking = isTracking;
		if (isTracking) {
			this.dependentProperties = {};
		}
	},

	/**
	 * Returns collection of the model bindings.
	 * @return {Terrasoft.Collection} Collection of the bindings.
	 */
	getBindMap: function() {
		return this.bindMap;
	},

	/**
	 * Inserts binding to the binding map collection.
	 * @protected
	 * @param {Object} binding Binding object.
	 * @param {String} binding.attributeName Name of the model attribute to bind.
	 * @param {Terrasoft.core.enums.BindingType} binding.type Type of the binding.
	 * @param {String} binding.propertyName Property which were bound to the model attribute.
	 */
	addBindMap: function(binding) {
		if (!Ext.isObject(binding)) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		const attributeName = binding.attributeName;
		const propertyName = binding.propertyName;
		if (Ext.isEmpty(attributeName) || Ext.isEmpty(propertyName)) {
			return;
		}
		const bindMap = this.bindMap || (this.bindMap = new Terrasoft.Collection());
		const existingBindMapItem = bindMap.find(attributeName);
		const bindMapItem = existingBindMapItem || {
			type: binding.type
		};
		bindMapItem[propertyName] = attributeName;
		if (!existingBindMapItem) {
			bindMap.add(attributeName, bindMapItem);
		}
	},

	/**
	 * Returns model initial attribute value.
	 * @param {String} name Attribute name.
	 * @return {Object}
	 */
	getInitialValue: function(name) {
		const values = this.values || {};
		let initialValue = values[name];
		if (!initialValue) {
			const column = this.getColumnByName(name);
			if (column) {
				initialValue = column.value;
			}
		}
		return initialValue;
	},

	/**
	 * Check if model has attribute.
	 * @param {String} attributeName Attribute name.
	 * @return {Boolean}
	 */
	hasAttribute: function(attributeName) {
		return this.model.has(attributeName);
	},

	/**
	 * Base implementation of prepareList event handler.
	 * @param {String} filter Filter.
	 * @param {Terrasoft.Collection} list Drop-down List.
	 */
	onPrepareList: function(filter, list) {
		list.fireEvent("dataloaded", list);
	},

	/**
	 * Returns model attributes json string.
	 */
	getJSON: function() {
		return this.model.toJSON();
	}

});
