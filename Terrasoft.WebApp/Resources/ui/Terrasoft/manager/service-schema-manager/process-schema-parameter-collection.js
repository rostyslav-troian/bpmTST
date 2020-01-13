Ext.define("Terrasoft.service.ProcessSchemaParameterCollection", {
	extend: "Terrasoft.Collection",
	alternateClassName: "Terrasoft.ProcessSchemaParameterCollection",

	// region Properties: Private

	/**
	 * Parameters.
	 * @private
	 * @type {Terrasoft.Collection}
	 */
	_parameters: null,

	// endregion

	// region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.Collection#constructor
	 * @override
	 */
	constructor: function(config) {
		this.callParent();
		this._parameters = Ext.create("Terrasoft.Collection", config);
		this._parameters.on("add", this.onParameterAdd, this);
		this._parameters.on("remove", this.onParameterRemove, this);
		this._parameters.on("dataLoaded", this.onParametersLoaded, this);
		this._parameters.on("clear", this.onParametersCleared, this);
		this._parameters.each(function(parameter) {
			this._addNestedParameters(parameter);
		}, this);
	},

	// endregion

	// region Methods: Private

	/**
	 * Adds nested parameters of handled parameter.
	 * @private
	 */
	_addNestedParameters: function(parameter) {
		var nestedParameters = parameter.itemProperties;
		nestedParameters.on("add", this.onParameterAdd, this);
		nestedParameters.on("remove", this.onParameterRemove, this);
		nestedParameters.on("clear", this.onParametersCleared, this);
		nestedParameters.on("dataLoaded", this.onParametersLoaded, this);
		nestedParameters.each(function(nestedItem) {
			this.onParameterAdd(nestedItem);
		}, this);
	},

	// endregion

	// region Methods: Protected

	/**
	 * Parameters loaded handler.
	 * @protected
	 */
	onParametersLoaded: function(scope, loadedItems) {
		loadedItems.each(function(parameter) {
			this.onParameterAdd(parameter);
		}, this);
	},

	/**
	 * Parameters cleared handler.
	 * @protected
	 */
	onParametersCleared: function(scope, clearedItems) {
		clearedItems.each(function(parameter) {
			this.onParameterRemove(parameter);
		}, this);
	},

	/**
	 * Parameter add handler, adds parameter and nested parameters recusevly to collection.
	 * @protected
	 * @param {Object} parameter Parameter to add.
	 * @param {Object} index Index to unsert.
	 * @param {Object} key Parameter key.
	 */
	onParameterAdd: function(parameter, index, key) {
		key = key || parameter.uId;
		this.collection.add(key, parameter);
		var nestedParameters = parameter.itemProperties;
		nestedParameters.on("add", this.onParameterAdd, this);
		nestedParameters.on("remove", this.onParameterRemove, this);
		nestedParameters.on("clear", this.onParametersCleared, this);
		nestedParameters.on("dataLoaded", this.onParametersLoaded, this);
		nestedParameters.each(function(nestedItem) {
			this.onParameterAdd(nestedItem);
		}, this);
	},

	/**
	 * Parameter remove handler, removes parameter and nested parameters recusevly from collection.
	 * @protected
	 * @param {Object} parameter Parameter to remove.
	 */
	onParameterRemove: function(parameter) {
		this.collection.remove(parameter);
		var nestedParameters = parameter.itemProperties;
		nestedParameters.un("add", this.onParameterAdd, this);
		nestedParameters.un("remove", this.onParameterRemove, this);
		nestedParameters.un("clear", this.onParametersCleared);
		nestedParameters.un("dataLoaded", this.onParametersLoaded, this);
		nestedParameters.each(function(nestedItem) {
			this.onParameterRemove(nestedItem);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.Collection#onDestroy
	 * @protected
	 * @override
	 */
	onDestroy: function() {
		this.callParent();
		this._parameters.un("add", this.onParameterAdd, this);
		this._parameters.un("remove", this.onParameterRemove, this);
		this._parameters.un("clear", this.onParametersCleared, this);
		this._parameters.un("dataLoaded", this.onParametersLoaded, this);
	},

	// endregion

	// region Methods: Public

	/**
	 * Gets collection of root parameters.
	 * @public
	 * @return {Terrasoft.Collection} Collection of root parameters.
	 */
	getRoots: function() {
		return this._parameters;
	},

	/**
	 * Adds an item to the parameters.
	 * @inheritdoc Terrasoft.Collection#add
	 * @override
	 */
	add: function(key, item, index) {
		return this._parameters.add(key, item, index);
	},

	/**
	 * Removes an item from the parameters.
	 * @inheritdoc Terrasoft.Collection#remove
	 * @override
	 */
	remove: function(item) {
		var parent = item.getParent();
		if (parent) {
			return parent.itemProperties.remove(item);
		} else {
			return this._parameters.remove(item);
		}
	},

	/**
	 * @inheritdoc Terrasoft.Collection#clone
	 * @override
	 */
	clone: function() {
		var result = Ext.create("Terrasoft.ProcessSchemaParameterCollection");
		result.loadAll(this._parameters);
		return result;
	},

	/**
	 * Adds collection to existing parameters.
	 * @inheritdoc Terrasoft.Collection#loadAll
	 * @override
	 */
	loadAll: function() {
		this._parameters.loadAll.apply(this._parameters, arguments);
	},

	/**
	 * Clears parameters.
	 * @inheritdoc Terrasoft.Collection#clear
	 * @override
	 */
	clear: function() {
		this._parameters.clear.apply(this._parameters, arguments);
	},

	/**
	 * Deletes an item by key.
	 * @override
	 */
	removeByKey: function(key) {
		return this._parameters.removeByIndex(this._parameters.indexOfKey(key));
	},

	/**
	 * Deletes an item by index.
	 * @override
	 */
	removeByIndex: function(index) {
		return this._parameters.removeByIndex(index);
	},

	/**
	 * Returns the index of an item.
	 * @override
	 */
	indexOf: function(obj) {
		return this._parameters.indexOf(obj);
	},

	/**
	 * Returns the index of an item by key.
	 * @override
	 */
	indexOfKey: function(key) {
		return this._parameters.indexOfKey(key);
	}

	// endregion

});
