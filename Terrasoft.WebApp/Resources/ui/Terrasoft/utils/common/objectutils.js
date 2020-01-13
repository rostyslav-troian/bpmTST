Ext.ns("Terrasoft.utils.object");

/**
 * @singleton
 */

/**
 * Performs deep clone of object. Doesn't check for cyclic dependencies.
 * @param {object} source Source object.
 * @return {object} Object copy.
 */
Terrasoft.deepClone = function(source) {
	if (!source || typeof source !== "object") {
		return source;
	}
	if (source.constructor === Date) {
		var cloneDate = new Date();
		cloneDate.setTime(source.getTime());
		return cloneDate;
	}
	var isArray = (source.constructor === Array);
	var clone = isArray ? [] : {};
	for (var propertyName in source) {
		if (isArray && !source.hasOwnProperty(propertyName)) {
			continue;
		}
		var sourceProperty = source[propertyName];
		clone[propertyName] = Terrasoft.utils.object.deepClone(sourceProperty);
	}
	return clone;
};

/**
 * Alias for {@link Terrasoft.utils.object#deepClone}
 * @member Terrasoft
 * @method deepClone
 * @inheritdoc Terrasoft.utils.object#deepClone
 */
Terrasoft.utils.object.deepClone = Terrasoft.deepClone;

/**
 * Removes empty elements for object or array.
 * @param {Array/Object} items Source object or array.
 * @return {Array/Object} Object or array without empty elements.
 */
Terrasoft.utils.object.deleteEmptyItems = function(items) {
	if (Ext.isArray(items) || Ext.isObject(items)) {
		var isArray = Ext.isArray(items);
		var innerItems = Terrasoft.deepClone(items);
		Terrasoft.each(innerItems, function(item, key) {
			if (Ext.isEmpty(item)) {
				if (isArray) {
					innerItems.splice(key, 1);
				} else {
					delete innerItems[key];
				}
			}
		}, this);
		return innerItems;
	} else {
		throw new Terrasoft.UnsupportedTypeException();
	}
};

/**
 * Alias for {@link Terrasoft.utils.object#deleteEmptyItems}
 * @member Terrasoft
 * @method deleteEmptyItems
 * @inheritdoc Terrasoft.utils.object#deleteEmptyItems
 */
Terrasoft.deleteEmptyItems = Terrasoft.utils.object.deleteEmptyItems;

/**
 * Retuns array of property values for object.
 * @param {Array} propertyNames Array of property names.
 * @param {Object} object source object.
 * @return {Array} Array of property values.
 */
Terrasoft.utils.object.getPropertyValuesArray = function(propertyNames, object) {
	if (Ext.isArray(propertyNames) && Ext.isObject(object)) {
		var values = [];
		Terrasoft.each(propertyNames, function(property) {
			if (object.hasOwnProperty(property)) {
				values.push(object[property]);
			}
		}, this);
		return values;
	} else {
		throw new Terrasoft.UnsupportedTypeException();
	}
};

/**
 * Alias for {@link Terrasoft.utils.object#getPropertyValuesArray}
 * @member Terrasoft
 * @method getPropertyValuesArray
 * @inheritdoc Terrasoft.utils.object#getPropertyValuesArray
 */
Terrasoft.getPropertyValuesArray = Terrasoft.utils.object.getPropertyValuesArray;

/**
 * Returns object copy with keys and values inverted.
 * In order for function to work values should be uniqie and strings serializavle.
 *      Example
 *      Terrasoft.utils.object.invert({Moe: "Moses", Larry: "Louis", Curly: "Jerome"});
 *
 *      Result
 *      {Moses: "Moe", Louis: "Larry", Jerome: "Curly"};
 * @param {Object} object Source object.
 * @return {Object} Object with keys and values inverted.
 */
Terrasoft.utils.object.invert = function(object) {
	return _.invert(object);
};

/**
 * Alias for {@link Terrasoft.utils.object#invert}
 * @member Terrasoft
 * @method invert
 * @inheritdoc Terrasoft.utils.object#invert
 */
Terrasoft.invert = Terrasoft.utils.object.invert;

/**
 * Return a copy of the object only containing the whitelisted properties.
 *      Example
 *      Terrasoft.pick({Moe: "Moses", Larry: "Louis", Curly: "Jerome"}, "Larry");
 *
 *      Result
 *      {Larry: "Louis"}
 * @param {Object} object Entire object.
 * @param {String...} properties White listed keys.
 * @return {Object} Object containing the whitelisted properties.
 */
Terrasoft.utils.object.pick = function() {
	return _.pick.apply(this, arguments);
};

/**
 * Alias for {@link Terrasoft.utils.object#pick}.
 * @member Terrasoft
 * @method pick
 * @inheritdoc Terrasoft.utils.object#pick
 */
Terrasoft.pick = Terrasoft.utils.object.pick;

/**
 * Checks whether object contains own properties and methods.
 * @param {Object} object Source object.
 * @return {Boolean} Returns true if object does not contain own properties and methods.
 */
Terrasoft.utils.object.isEmptyObject = function(object) {
	if (!object) {
		return true;
	}
	var keys = Terrasoft.utils.object.keys(object);
	return (keys.length === 0);
};

/**
 * Alias for {@link Terrasoft.utils.object#isEmptyObject}
 * @member Terrasoft
 * @method isEmptyObject
 * @inheritdoc Terrasoft.utils.object#isEmptyObject
 */
Terrasoft.isEmptyObject = Terrasoft.utils.object.isEmptyObject;

/**
 * Returns array of object property names (keys).
 *
 *     Terrasoft.utils.object.keys({one : 1, two : 2, three : 3});
 *     => ["one", "two", "three"]
 *
 * @param {Object} object Source object.
 * @return {String[]} Array of keys.
 */
Terrasoft.utils.object.keys = function(object) {
	return _.keys(object);
};

/**
 * Alias for {@link Terrasoft.utils.object#keys}
 * @member Terrasoft
 * @method keys
 * @inheritdoc Terrasoft.utils.object#keys
 */
Terrasoft.keys = Terrasoft.utils.object.keys;

/**
 * Transforms object with array parameters in object array, which contains values of source object.
 * @param {Object} object Source object.
 * @return {Array} Result array.
 */
Terrasoft.utils.object.mapObjectToCollection = function(object) {
	var result = [];
	Terrasoft.each(object, function(element, name) {
		Terrasoft.each(element, function(item, index) {
			var modItem = result[index] ? result[index] : (result[index] = {});
			modItem[name] = item;
		});
	});
	return result;
};

/**
 * Alias for {@link Terrasoft.utils.object#mapObjectToCollection}
 * @member Terrasoft
 * @method mapObjectToCollection
 * @inheritdoc Terrasoft.utils.object#mapObjectToCollection
 */
Terrasoft.mapObjectToCollection = Terrasoft.utils.object.mapObjectToCollection;

/**
 * Returns string representation of object with given formatting.
 * Example:
 *        serializeObject({
 *			source: {
 *				x: 5,
 *				y: 40,
 *				z: 10
 *			},
 *			properties: ["x", "y"],
 *			format: "X={x}; Y={y}",
 *			valueConverter: function(propertyValue, propertyName) {
 *				if (propertyName === "y") {
 *					return propertyValue / 2;
 *				}
 *				return propertyValue * 2;
 *			}
 *		});
 * Result: "X=10; Y=20"
 * @param {Object} config Serialization config.
 * @param {Object} config.source Object to serialize.
 * @param {String[]} config.properties Array of property names. If not specified,
 * all properties are serialized (Object.keys()).
 * @param {String} config.format Serialization format. Each property passed in curly braces.
 * Example: "{width};{height}". If not specified, properties will be serialized in order of forEach loop.
 * @param {Function} config.valueConverter Function of value transformation. If not specified,
 * toString() method will be called
 * @param {Object} config.valueConverter.propertyValue Property value.
 * @param {String} config.valueConverter.propertyName Property name.
 * @return {String} Serialized object.
 */
Terrasoft.utils.object.serializeObject = function(config) {
	var source = config.source;
	var properties = config.properties || Object.keys(source);
	var valueConverter = config.valueConverter;
	var formattedString = config.format;
	if (formattedString == null) {
		formattedString = properties.reduce(function(prevValue, name) {
			if (prevValue !== "") {
				prevValue += ";";
			}
			return prevValue + "{" + name + "}";
		}, "");
	}
	properties.forEach(function(propertyName) {
		var re = new RegExp("\\{" + propertyName + "\\}", "gi");
		var propertyValue = source[propertyName];
		if (typeof valueConverter === "function") {
			propertyValue = valueConverter(propertyValue, propertyName);
		} else {
			propertyValue = propertyValue.toString();
		}
		formattedString = formattedString.replace(re, propertyValue);
	}, this);
	return formattedString;
};

/**
 * Alias for {@link Terrasoft.utils.object#serializeObject
 * @member Terrasoft
 * @method serializeObject
 * @inheritdoc Terrasoft.utils.object#serializeObject
 */
Terrasoft.serializeObject = Terrasoft.utils.object.serializeObject;

/**
 * Returns new object with same properties mapped by fn function.
 * Example:
 *        var object = {
 *			prop1: 11,
 *			prop2: 22,
 *			prop3: 33
 *		};
 *        mapObject(object, function(prop, name) {
 *			return prop * 2;
 *		}, this);
 * Result:
 *        {
 *			prop1: 22,
 *			prop2: 44,
 *			prop3: 99
 *		}
 * @param {Object} object Source object.
 * @param {Function} fn Iteration function.
 * @param {Object} scope Iteration function scope.
 * @return {Object}
 */
Terrasoft.mapObject = function(object, fn, scope) {
	return _.mapObject(object, fn, scope);
};

/**
 * @member Terrasoft.utils.object
 * @method serialzieObject
 * @inheritdoc Terrasoft.utils.object#serializeObject
 * @deprecated Use Terrasoft.utils.object.serializeObject instead
 */
Terrasoft.utils.object.serialzieObject = function(config) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.utils.object.serialzieObject", "Terrasoft.utils.object.serializeObject");
	console.log(obsoleteMessage);
	return Terrasoft.utils.object.serializeObject(config);
};

/**
 * Alias for {@link Terrasoft.utils.object#serialzieObject
 * @member Terrasoft
 * @method serialzieObject
 * @inheritdoc Terrasoft.utils.object#serialzieObject
 * @deprecated Use Terrasoft.serializeObject instead
 */
Terrasoft.serialzieObject = Terrasoft.utils.object.serialzieObject;

/**
 * Returns true if objects are equal.
 * @param {Object} object1 First object.
 * @param {Object} object2 Second object.
 * @return {Boolean} True if objects are equal.
 */
Terrasoft.utils.object.isEqual = function(object1, object2) {
	return _.isEqual(object1, object2);
};

/**
 * Alias for {@link Terrasoft.utils.object#isEqual}
 * @member Terrasoft
 * @method isEqual
 * @inheritdoc Terrasoft.utils.object#isEqual
 */
Terrasoft.isEqual = Terrasoft.utils.object.isEqual;

/**
 * Removes properties from object.
 * @param {Object} object.
 * @param {String[]} properties.
 */
Terrasoft.utils.object.removeProperties = function(object, properties) {
	if (Ext.isObject(object) && Ext.isArray(properties)) {
		Terrasoft.each(properties, function(propertyName) {
			delete object[propertyName];
		});
	}
};

/**
 * Alias for {@link Terrasoft.utils.object#removeProperties}
 * @member Terrasoft
 * @method removeProperties
 * @inheritdoc Terrasoft.utils.object#removeProperties
 */
Terrasoft.removeProperties = Terrasoft.utils.object.removeProperties;

/**
 * Finds value from object by path.
 * @param {Object} object The object to query.
 * @param {String} path The path of the property to get splitted by ".".
 * @return {*} Return found value, otherwise return undefined.
 * Example:
 *
 *		findValueByPath({
 *			key1: {
 *				key2: {
 *					key3: {
 *						d1: "Value 1",
 *						d2: "Value 2"
 *					}
 *				}
 *			}
 *		}, "key1.key2.key3");
 * // => {d1: "Value 1", d2: "Value 2"};
 *
 */
Terrasoft.findValueByPath = function(object, path) {
	if (!(Ext.isObject(object) && Ext.isString(path))) {
		throw new Terrasoft.UnsupportedTypeException();
	}
	const propertiesTree = path.split(".");
	let property = object;
	for (let i = 0; i < propertiesTree.length; i++) {
		if (!Ext.isObject(property) && !Ext.isArray(property)) {
			return undefined;
		}
		const propertyName = propertiesTree[i];
		property = property[propertyName];
		if (!Ext.isDefined(property)) {
			break;
		}
	}
	return property;
};

/**
 * Alias for {@link Terrasoft.utils.object#findValueByPath}
 * @member Terrasoft
 * @method findValueByPath
 * @inheritdoc Terrasoft#findValueByPath
 */
Terrasoft.utils.object.findValueByPath = Terrasoft.findValueByPath;

/**
 * Alias for {@link Terrasoft#get}
 * @member Terrasoft
 * @method get
 * @inheritdoc Terrasoft#findValueByPath
 */
Terrasoft.get = Terrasoft.findValueByPath;

/**
 * Returns object with properties matched to filter.
 * Example:
 *        filterObject({
 *			"Field1": {
 * 				prop1: true,
 *				prop2: 2
 *			},
 *			"Field2": {
 *				prop1: false,
 *				prop2: 5
 *			},
 *			"Field3": {
 *				prop2: 5,
 *				prop3: 10
 *			}
 *		}, {prop2: 5});
 * Result: {
 *			"Field2": {
 *				prop1: false,
 *				prop2: 5
 *			},
 *			"Field3": {
 *				prop2: 5
 *				prop3: 10
 *			}
 *		}
 * @param {Object} object Source object.
 * @param {Object} filter Key-value pairs to filter.
 * @return {Object}
 */
Terrasoft.utils.object.filterObject = function(object, filter) {
	var result = {};
	Terrasoft.each(object, function(property, propertyName) {
		var isMatched = _.every(filter, function(filterValue, filterName) {
			return _.has(property, filterName) && property[filterName] === filterValue;
		});
		if (isMatched) {
			result[propertyName] = property;
		}
	});
	return result;
};

/**
 * Alias for {@link Terrasoft.utils.object#filterObject}
 * @member Terrasoft
 * @method filterObject
 * @inheritdoc Terrasoft.utils.object#filterObject
 */
Terrasoft.filterObject = Terrasoft.utils.object.filterObject;

/**
 * Return the object whose property values are html encode.
 * @param {Object} object The object to be encode.
 * @return {Object} Object whose property values are html encode.
 */
Terrasoft.utils.object.encodeHtmlObjectValues = function(object) {
	Terrasoft.each(object, function(value, key) {
		object[key] = Terrasoft.encodeHtml(value);
	}, this);
	return object;
};

/**
 * Alias for {@link Terrasoft.utils.object#encodeHtmlObjectValues}
 * @member Terrasoft
 * @method encodeHtmlObjectValues
 * @inheritdoc Terrasoft.utils.object#encodeHtmlObjectValues
 */
Terrasoft.encodeHtmlObjectValues = Terrasoft.utils.object.encodeHtmlObjectValues;

/**
 * Return all the elements that pass a truth test.
 * @param {Object} list List.
 * @param {Function} iterator Iterator function.
 * @param {Object} context Context.
 * @return {Object}
 */
Terrasoft.filterObjectList = function(list, iterator, context) {
	var result = {};
	for (var property in list) {
		if (list.hasOwnProperty(property) && iterator.call(context || list, list[property], property, list)) {
			result[property] = list[property];
		}
	}
	return result;
};

/**
 * Sort object by property name or function.
 * @param {Object} object Object to sort.
 * @param {Object|Function} [property] Property name of object or iterator function.
 * @return {Object}
 */
Terrasoft.sortObj = function(object, property) {
	let arr = [];
	Terrasoft.each(object, (item, key) => {
		arr.push({key, item});
	}, this);
	let sortFn = property;
	if (property && !Ext.isFunction(property)) {
		sortFn = (pair) => pair.item && pair.item[property];
	} else if (!property) {
		sortFn = (pair) => pair.item;
	}
	arr = _.sortBy(arr, sortFn);
	const result = {};
	arr.forEach((el) => {
		result[el.key] = el.item;
	});
	return result;
};

/**
 * Return a copy of the object, filtered to omit the blacklisted keys (or array of keys).
 * @param {Object} object Object.
 * @param {Array} keys Blacklisted keys (or array of keys).
 * @return {Object}
 */
Terrasoft.utils.object.omit = function(object, keys) {
	return _.omit(object, keys);
};

/**
 * Alias for {@link Terrasoft.utils.object#omit}
 * @member Terrasoft
 * @method omit
 * @inheritdoc Terrasoft.utils.object#omit
 */
Terrasoft.omit = Terrasoft.utils.object.omit;
