/**
 * Mixin, which add ability for serialize any object.
 * Used in {@link Terrasoft.BaseQuery}, {@link Terrasoft.ObjectCollection} etc.
 * For correct working you must implement method getSerializableObject(), where will be specified all
 * necessary properties for serialize. By default serialize all properties.
 */
Ext.define("Terrasoft.core.mixins.Serializable", {
	alternateClassName: "Terrasoft.Serializable",

	/**
	 * Returns serialized property value.
	 * @protected
	 * @param {Object} value Source value.
	 * @return {Object}
	 */
	getSerializableProperty: function(value) {
		if (!Ext.isObject(value) && !Ext.isArray(value)) {
			return value;
		}
		if (Ext.isFunction(value.getSerializableObject)) {
			var serializableObject = {};
			value.serializationInfo = this.serializationInfo;
			value.getSerializableObject(serializableObject, this.serializationInfo);
			delete value.serializationInfo;
			return serializableObject;
		}
		var result = (Ext.isArray(value)) ? [] : {};
		Terrasoft.each(value, function(element, index) {
			var scope = (!Ext.isEmpty(element) && Ext.isFunction(element.getSerializableObject)) ? element : this;
			result[index] = scope.getSerializableProperty(element);
		}, this);
		return result;
	},

	/**
	 * Copies object properties for serialize to serializable object.
	 * Must be implemented in classes, which use this mixin.
	 * @protected
	 * @abstract
	 * @param {Object} obj Object in which serializable property collected.
	 * @param {Object} [serializationInfo] Additional info for serializing.
	 */
	getSerializableObject: Terrasoft.abstractFn,

	/**
	 * Serializes object to JSON.
	 * @param {String} serializationInfo Result JSON.
	 */
	serialize: function(serializationInfo) {
		var serializableObject = {};
		this.serializationInfo = serializationInfo || this.serializationInfo || {};
		this.getSerializableObject(serializableObject, this.serializationInfo);
		delete this.serializationInfo;
		return Terrasoft.encode(serializableObject);
	},

	/**
	 * Returns object with additional info for serializing.
	 * @return {Object}
	 */
	getDefSerializationInfo: function() {
		return { serializeFilterManagerInfo: false };
	},

	/**
	 * Set object serializableObject propertyName with value of current object, if it is not empty or function.
	 * @param {Object} serializableObject Serializable object.
	 * @param {String} propertyName Property name.
	 */
	setSerializableProperty: function(serializableObject, propertyName) {
		var propertyValue = this[propertyName];
		if (!Ext.isEmpty(propertyValue) && !Ext.isFunction(propertyValue)) {
			serializableObject[propertyName] = this.getSerializableProperty(propertyValue);
		}
	}

});
