Ext.ns("Terrasoft.utils.common.json");

/**
 * @singleton
 */

/**
 * Convert a value to a JSON string
 * @param {Mixed} value The value to convert to a JSON string
 * @return {String} JSON-string
 */
Terrasoft.utils.common.json.encode = function(value) {
	try {
		return Ext.encode(value);
	} catch (e) {
		throw new Terrasoft.UnknownException({
			message: Terrasoft.Resources.Json.EncodeExceptionMessage
		});
	}
};

/**
 * short notation for {@link Terrasoft.utils.common.json#encode}
 * @member Terrasoft
 * @method encode
 * @inheritdoc Terrasoft.utils.common.json#encode
 */
Terrasoft.encode = Terrasoft.utils.common.json.encode;

/**
 * Convert a DateTime value to a JSON string
 * @param {Date} value The value to convert to a JSON string
 * @return {String} JSON-string
 */
Terrasoft.utils.common.json.encodeDate = function(value) {
	if (!Ext.isDate(value)) {
		throw new Terrasoft.UnknownException({
			message: Terrasoft.Resources.Json.EncodeExceptionMessage
		});
	}
	try {
		return "\"" + Terrasoft.pad(value.getFullYear(), 4) + "-" +
			Terrasoft.pad(value.getMonth() + 1, 2) + "-" +
			Terrasoft.pad(value.getDate(), 2) + "T" +
			Terrasoft.pad(value.getHours(), 2) + ":" +
			Terrasoft.pad(value.getMinutes(), 2) + ":" +
			Terrasoft.pad(value.getSeconds(), 2) + "." +
			Terrasoft.pad(value.getMilliseconds(), 3) + "\"";
	} catch (e) {
		throw new Terrasoft.UnknownException({
			message: Terrasoft.Resources.Json.EncodeExceptionMessage
		});
	}
};

/**
 * short notation for {@link Terrasoft.utils.common.json#encodeDate}
 * @member Terrasoft
 * @method encodeDate
 * @inheritdoc Terrasoft.utils.common.json#encodeDate
 */
Terrasoft.encodeDate = Terrasoft.utils.common.json.encodeDate;

/**
 * Restore the value from the JSON string
 * @param {String} value JSON-string
 * @return {Mixed} The restored value
 */
Terrasoft.utils.common.json.decode = function(value) {
	// TODO: CR 206639
	if (!Ext.isString(value)) {
		return value;
	}
	try {
		return Ext.decode(value);
	} catch (e) {
		throw new Terrasoft.UnknownException({
			message: Terrasoft.Resources.Json.DecodeExceptionMessage
		});
	}
};

/**
 * short notation for {@link Terrasoft.utils.common.json#decode}
 * @member Terrasoft
 * @method decode
 * @inheritdoc Terrasoft.utils.common.json#decode
 */
Terrasoft.decode = Terrasoft.utils.common.json.decode;

/**
 * Decodes a JSON string into a LocalizableString object
 * @param {Object} cultureValues The localized value object
 * @return {Terrasoft.LocalizableString} The object of the LocalizableString class
 */
Terrasoft.utils.common.json.decodeLocalizableString = function(cultureValues) {
	var localizableString = Ext.create("Terrasoft.LocalizableString");
	Terrasoft.each(cultureValues, function(value, culture) {
		localizableString.setCultureValue(culture, value);
	}, this);
	return localizableString;
};

/**
 * short notation for {@link Terrasoft.utils.common.json#decodeLocalizableString}
 * @member Terrasoft
 * @method decodeLocalizableString
 * @inheritdoc Terrasoft.utils.common.json#decodeLocalizableString
 */
Terrasoft.decodeLocalizableString = Terrasoft.utils.common.json.decodeLocalizableString;

/**
 * Deserialize an object from the JSON object configuration. It is executed recursively.
 * @private
 * @param {Object} jsonConfig JSON object configuration object
 * @return {Object} Deserialized object
 */
Terrasoft.utils.common.json.deserializeObject = function(jsonConfig) {
	var resultObject = {};
	Terrasoft.each(jsonConfig, function(itemConfig, propertyName) {
		var property = itemConfig;
		if (Ext.isObject(itemConfig)) {
			var deserializedConfig = Terrasoft.utils.common.json.deserializeObject(itemConfig);
			property = Terrasoft.getItemByConfig(deserializedConfig);
		} else if (Ext.isArray(itemConfig)) {
			property = [];
			Terrasoft.each(itemConfig, function(item, index) {
				var deserializedConfig = Terrasoft.utils.common.json.deserializeObject(item);
				property[index] = Terrasoft.getItemByConfig(deserializedConfig);
			});
		} else if (propertyName === "dateValue") {
			property = Terrasoft.parseDate(property);
			propertyName = "value";
			delete jsonConfig.value;
		}
		resultObject[propertyName] = property;
	});
	return resultObject;
};

/**
 * Performs the deserialization of the object from the JSON string.
 * Unlike {@link Terrasoft.utils.common.json # decode} creates client instances of classes based on the property
 * className
 * @param {String} value JSON-string
 * @return {Object} Dieserialized object
 */
Terrasoft.utils.common.json.deserialize = function(value) {
	var jsonConfig = Ext.isString(value) ? Terrasoft.decode(value) : value;
	var deserializedObject = Terrasoft.utils.common.json.deserializeObject({result: jsonConfig});
	return deserializedObject.result;
};

/**
 * AShort notationfor {@link Terrasoft.utils.common.json#deserialize}
 * @member Terrasoft
 * @method deserialize
 * @inheritdoc Terrasoft.utils.common.json#deserialize
 */
Terrasoft.deserialize = Terrasoft.utils.common.json.deserialize;

/**
 * Checks whether the object is an element of the schema view
 * @param {Object} config Configuring the schema view item
 * @return {Boolean} Returns true if the object is a schema representation element of false in the opposite case
 */
Terrasoft.utils.common.json.isItemConfig = function(config) {
	return (Ext.isObject(config) && !Ext.isEmpty(config.name));
};

/**
 * short notation for {@link Terrasoft.utils.common.json#isItemConfig}
 * @member Terrasoft
 * @method isItemConfig
 * @inheritdoc Terrasoft.utils.common.json#isItemConfig
 */
Terrasoft.isItemConfig = Terrasoft.utils.common.json.isItemConfig;

/**
 * Executes an iterator function for each child of the configuration search element of the view schema
 * @param {Object} config Configuring the schema view item
 * @param {Function} iterator Iterator function
 * @param {Object} scope Context
 * @return {Boolean} Returns true if all elements have been processed
 * false otherwise
 */
Terrasoft.iterateChildItems = function(config, iterator, scope) {
	var result = true;
	Terrasoft.each(config, function(property, propertyName) {
		if (Ext.isArray(property) || Ext.isObject(property)) {
			var items = Ext.isArray(property) ? property : [property];
			Terrasoft.each(items, function(childItem) {
				if (!this.isItemConfig(items[0])) {
					return false;
				}
				var childIterationResult = (Terrasoft.iterateChildItems(childItem, iterator, scope) !== false);
				var iterationConfig = {
					item: childItem,
					propertyName: propertyName,
					parent: config,
					childIterationResult: childIterationResult
				};
				return (result = ((iterator.call(scope, iterationConfig) !== false) && childIterationResult));
			}, this);
		}
		return result;
	}, this);
	return result;
};

/**
 * short notation for {@link Terrasoft.#iterateChildItems}
 * @member Terrasoft
 * @method iterateChildItems
 * @inheritdoc Terrasoft#iterateChildItems
 */
Terrasoft.utils.common.json.iterateChildItems = Terrasoft.iterateChildItems;
