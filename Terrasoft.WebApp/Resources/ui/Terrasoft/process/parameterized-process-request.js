/**
 * Base class that represents parameterized process request.
 */
Ext.define("Terrasoft.process.ParameterizedProcessRequest", {
	extend: "Terrasoft.BaseProcessRequest",
	alternateClassName: "Terrasoft.ParameterizedProcessRequest",

	//endregion

	//region Properties: Public

	/**
	 * Parameter values.
	 * @protected
	 * @type {Terrasoft.ObjectCollection}
	 */
	parameterValues: null,

	/**
	 * Parameter values.
	 * @private
	 * @type {Array}
	 */
	_parameterValues: null,

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	_getSerializableObjectOld: function(serializableObject) {
		const parameterValuesData = this.getSerializableProperty(this.parameterValues);
		const values = serializableObject.parameterValues = [];
		Terrasoft.each(parameterValuesData.items, function(value, name) {
			values.push({
				"name": name,
				"value": value
			});
		}, this);
		if (Ext.isEmpty(this._parameterValues)) {
			return serializableObject;
		}
		Terrasoft.each(this._parameterValues, function(keyPair) {
			const foundItem = Terrasoft.findItem(values, {
				"name": keyPair.name
			});
			if (!foundItem) {
				values.push({
					"name": keyPair.name,
					"value": keyPair.value
				});
			}
		}, this);
		return serializableObject;
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseRequest#constructor
	 * @override
	 */
	constructor: function(config) {
		this.callParent(arguments);
		this.parameterValues = Ext.create("Terrasoft.ObjectCollection");
		this._parameterValues = [];
		if (config && config.parameterValues) {
			Terrasoft.each(config.parameterValues, function(value, name) {
				this.addParameterValue(name, value);
			}, this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableObject.
	 * @protected
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		if (!this.parameterValues.isEmpty()) {
			return this._getSerializableObjectOld(serializableObject);
		}
		if (!Ext.isEmpty(this._parameterValues)) {
			serializableObject.parameterValues = this._parameterValues;
		}
		return serializableObject;
	},

	//endregion

	//region Methods: Public

	/**
	 * Specifies initial value for process parameter.
	 * @param {String} name Parameter name.
	 * @param {String|Number|Date} value Parameter value.
	 */
	addParameterValue: function(name, value) {
		this._parameterValues.push({
			"name": name,
			"value": value
		});
	}

	//endregion

});
