/**
 */
Ext.define("Terrasoft.data.filters.Parameter", {
	extend: "Terrasoft.ObjectCollectionItem",
	alternateClassName: "Terrasoft.Parameter",

	/**
  * Parameter Data Type
  * @type {Terrasoft.DataValueType}
  */
	dataValueType: Terrasoft.DataValueType.TEXT,

	/**
  * Parameter value
  * @private
  * @type {Mixed}
  */
	value: null,

	/**
  * Used to deserialize dates, which would uniquely determine the type of the field
  * @private
  * @type {Date}
  */
	dateValue: null,

	/**
  * Used when serializing arrays and BLOB data
  * @private
  * @type {Array}
  */
	arrayValue: null,

	/**
  * Creates an instance of a parameter
  * @param {Object} config Configuration object
  * @return {Terrasoft.Parameter} Returns the generated instance of the parameter
  */
	constructor: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
    * @event change
    * Is triggered when the value or type of the parameter data changes
    * @param {Terrasoft.BaseFilter} filter Modified filter element
    */
			"change"
		);
		this.setDataValueType(this.dataValueType);
		this.setValue(this.value);
	},

	/**
  * Copies the properties for serialization to the serialized object. Implements the mixin interface
  * {@link Terrasoft.Serializable}
  * @protected
  * @override
  * @param {Object} serializableObject Serialized object
  * @param {Object} serializationInfo Serialization Options
  */
	getSerializableObject: function(serializableObject, serializationInfo) {
		this.callParent(arguments);
		serializableObject.dataValueType = this.dataValueType;
		var value = this.value;
		if (((this.dataValueType === Terrasoft.DataValueType.LOOKUP) ||
			(this.dataValueType === Terrasoft.DataValueType.IMAGELOOKUP)) &&
				!serializationInfo.serializeFilterManagerInfo) {
			value = (Ext.isObject(value)) ? value.value : value;
		}
		if (serializationInfo.serializeFilterManagerInfo && this.dateValue) {
			serializableObject.dateValue = this.dateValue;
			serializableObject.value = Terrasoft.encodeDate(this.dateValue);
		} else {
			if (this.dataValueType === Terrasoft.DataValueType.BLOB ||
					this.dataValueType === Terrasoft.DataValueType.IMAGE) {
				if (Ext.isArray(value)) {
					serializableObject.arrayValue = value;
				} else {
					serializableObject.arrayValue = Ext.isEmpty(value) ? [] : Terrasoft.convertStringToBlobArray(value);
				}
			} else {
				if (Ext.isDate(value)) {
					value = Terrasoft.encodeDate(value);
				}
				serializableObject.value = value;
			}
		}
	},

	/**
  * Sets the type of these parameter values
  * @param {Terrasoft.DataValueType} dataValueType Data type of the parameter value
  */
	setDataValueType: function(dataValueType) {
		if (this.dataValueType === dataValueType) {
			return;
		}
		this.dataValueType = dataValueType;
		this.fireEvent("change", this, this);
	},

	/**
  * Sets the value of the parameter
  * @param {String/Number/Date/Boolean} value
  */
	setValue: function(value) {
		if (Ext.isDate(value)) {
			this.dateValue = value;
		}
		if (this.value === value) {
			return;
		}
		this.value = value;
		this.fireEvent("change", this, this);
	},

	/**
  * Returns the value of the parameter
  * @return {String/Number/Date/Boolean} Parameter value
  */
	getValue: function() {
		return this.value;
	}

});